"""Create static English MP3 clips for the irregular-verb practice with few API requests.

Many lines are synthesized in ONE request (separated by long pauses), then the WAV is split
on silence into one MP3 per line. Existing MP3 files are skipped, so runs can resume.
Run from the repository root: python scripts/generate-english-audio.py [--batch 25]
Output: english-only/audio/en/<question-id>.mp3 and english-only/audio/en/words/<word>.mp3
"""
import argparse, json, os, re, subprocess, sys, tempfile, time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "english-only" / "audio" / "en"
CLI = Path(os.environ["LOCALAPPDATA"]) / "Programs" / "gemini-api" / "gemini-api.exe"
NODE = ("const fs=require('fs');const r=new Function(fs.readFileSync('english-only/questions.js','utf8')+"
        "';return {quizSets,answerForms};')();const qs=r.quizSets.flatMap(q=>q.questions);"
        "process.stdout.write(JSON.stringify({questions:qs.map(q=>({id:q.id,verb:q.verb,answer:q.answer,"
        "text:q.sentence.replace(/<[^>]*>/g,'').replace('_____',q.answer)})),forms:r.answerForms}));")
PREFIX = "Read each line below slowly and clearly in a friendly voice for a child learning English. Do not read this instruction. Pause for two full seconds of silence after every line.\n\n"


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")


def segments(wav):
    r = run(["ffmpeg", "-v", "info", "-i", str(wav), "-af", "silencedetect=noise=-35dB:d=0.9", "-f", "null", "-"])
    total = float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr).expand(r"\1:\2:\3").split(":")[0]) * 0
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr)
    total = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    segs, pos = [], 0.0
    for s, e in zip(starts, ends):
        if s - pos > 0.15:
            segs.append((pos, s))
        pos = e
    if total - pos > 0.3:
        segs.append((pos, total))
    return segs


def synth_batch(lines, model, voice, temp):
    wav = Path(temp) / "batch.wav"
    for attempt in range(4):
        wav.unlink(missing_ok=True)
        text = PREFIX + "\n\n".join(lines)
        r = run([str(CLI), "tts", text, "--language", "en-US", "--voice", voice, "--model", model, "--user-project", "", "--out", str(wav)])
        if r.returncode == 0 and wav.exists():
            segs = segments(wav)
            if len(segs) == len(lines) + 1:  # the model read the instruction aloud; drop it
                segs = segs[1:]
            if len(segs) == len(lines):
                return wav, segs
            print(f"  segment mismatch {len(segs)} != {len(lines)}, retry", flush=True)
        elif "429" in r.stderr or "rate_limit" in r.stderr:
            print("Rate limited:", r.stderr.strip()[:300], file=sys.stderr, flush=True)
            sys.exit(1)
        time.sleep(5)
    return None, None


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--batch", type=int, default=25)
    p.add_argument("--model", default="gemini-3.1-flash-tts-preview")
    p.add_argument("--voice", default="Kore")
    a = p.parse_args()
    data = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT, text=True, encoding="utf-8"))
    (OUT / "words").mkdir(parents=True, exist_ok=True)
    verbs = sorted({q["verb"] for q in data["questions"]})
    words = sorted(set(data["forms"]) | set(verbs))
    by_text = {}
    for q in data["questions"]:
        by_text.setdefault(q["text"], []).append(q["id"])
    jobs = [(t, [OUT / f"{i}.mp3" for i in ids]) for t, ids in by_text.items()]
    jobs += [(w[0].upper() + w[1:] + ".", [OUT / "words" / f"{w}.mp3"]) for w in words]
    jobs = [(t, targets) for t, targets in jobs if not all(x.exists() and x.stat().st_size > 0 for x in targets)]
    print(f"{len(jobs)} clips to make in {-(-len(jobs) // a.batch)} requests", flush=True)
    with tempfile.TemporaryDirectory(prefix="alpcik-en-audio-") as temp:
        for n in range(0, len(jobs), a.batch):
            chunk = jobs[n:n + a.batch]
            wav, segs = synth_batch([t for t, _ in chunk], a.model, a.voice, temp)
            if not wav:
                print(f"Batch starting at {n} failed", file=sys.stderr)
                return 1
            for (text, targets), (s, e) in zip(chunk, segs):
                first = targets[0]
                c = run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(s - 0.08, 0):.3f}", "-to", f"{e + 0.12:.3f}", "-i", str(wav),
                         "-codec:a", "libmp3lame", "-b:a", "48k", str(first)])
                if c.returncode:
                    print(c.stderr, file=sys.stderr); return 1
                for t in targets[1:]:
                    t.write_bytes(first.read_bytes())
            print(f"{min(n + a.batch, len(jobs))}/{len(jobs)} done", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
