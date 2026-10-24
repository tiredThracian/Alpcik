"""Create static German MP3 clips with the locally configured Gemini API CLI.

Run from the repository root: python scripts/generate-german-audio.py
Existing MP3 files are skipped, so interrupted runs can resume.
"""

import hashlib
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "audio" / "de"
CLI = Path(os.environ["LOCALAPPDATA"]) / "Programs" / "gemini-api" / "gemini-api.exe"
NODE_SCRIPT = "const fs=require('fs'),vm=require('vm');const s={window:{}};vm.runInNewContext(fs.readFileSync('german-data.js','utf8'),s);process.stdout.write(JSON.stringify(s.window.germanTopics));"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--model', default='gemini-3.8-flash-tts', help='Gemini TTS model for newly created clips')
    args = parser.parse_args()
    topics = json.loads(subprocess.check_output(["node", "-e", NODE_SCRIPT], cwd=ROOT, text=True, encoding="utf-8"))
    items = [(topic["id"], *item) for topic in topics for item in topic["items"]]
    OUTPUT.mkdir(parents=True, exist_ok=True)
    counts = {"Kore": 0, "Aoede": 0}
    made = 0

    with tempfile.TemporaryDirectory(prefix="alpcik-german-audio-") as temp:
        for index, (topic, item_id, german, _turkish) in enumerate(items, start=1):
            voice = ["Kore", "Aoede"][hashlib.sha256(f"{topic}/{item_id}".encode()).digest()[0] % 2]
            counts[voice] += 1
            target = OUTPUT / f"{topic}-{item_id}.mp3"
            if target.exists() and target.stat().st_size > 0:
                continue
            wav = Path(temp) / "speech.wav"
            if wav.exists():
                wav.unlink()
            for attempt in range(4):
                result = subprocess.run(
                    [str(CLI), "tts", german, "--language", "de-DE", "--voice", voice, "--model", args.model, "--out", str(wav)],
                    capture_output=True, text=True, encoding="utf-8", errors="replace",
                )
                if result.returncode == 0 and wav.exists():
                    break
                if attempt == 3 or not any(code in result.stderr for code in ("429", "RESOURCE_EXHAUSTED", "rate_limit")):
                    print(f"Stopped at {topic}/{item_id}: {result.stderr.strip()}", file=sys.stderr, flush=True)
                    return 1
                time.sleep(15 * (attempt + 1))

            conversion = subprocess.run(
                ["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-b:a", "48k", str(target)],
                capture_output=True, text=True, encoding="utf-8", errors="replace",
            )
            if conversion.returncode != 0:
                print(f"MP3 conversion failed for {target.name}: {conversion.stderr}", file=sys.stderr, flush=True)
                return 1
            made += 1
            if made % 10 == 0 or index == len(items):
                print(f"{index}/{len(items)} clips ready ({made} created this run)", flush=True)

    print(f"Finished. Voice assignment: Kore {counts['Kore']}, Aoede {counts['Aoede']}.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
