"""Regenerate German clips with explicit native German speech metadata.

Defaults to all vocabulary. --topic months limits regeneration to one topic.
Clips are synthesized in short batches; silence boundaries must match exactly.
A manifest makes the command resumable without redoing completed clips.
"""
import argparse
import base64
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import time

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('unit_audio_engine', ROOT / 'scripts/generate-celebrations-audio.py')
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
OUT = ROOT / 'audio' / 'de'
NODE = "const fs=require('fs'),vm=require('vm');const s={window:{}};vm.runInNewContext(fs.readFileSync('german-data.js','utf8'),s);process.stdout.write(JSON.stringify(s.window.germanTopics));"
STYLE = ('Muttersprache Deutsch aus Deutschland (de-DE). Klare, korrekte hochdeutsche Aussprache '
         'aller deutschen Woerter, Monatsnamen und Zahlen; kein englischer Akzent, keine englischen '
         'Aussprachen. Ruhige, natuerliche, freundliche Stimme fuer ein Kind, das Deutsch lernt. '
         'Etwas langsamer sprechen, aber nicht uebertrieben betonen. '
         'Lange stille Pausen an den Pausenmarkierungen.')
VERSION = 'de-native-metadata-v2'
last_request = 0.0


def request(jobs, args, folder):
    global last_request
    spacing = 21 if args.model == 'gemini-3.8-flash-tts' else 10
    time.sleep(max(0, spacing - (time.monotonic() - last_request)))
    body = Path(folder) / 'request.json'
    text = ' <long pause>\n\n'.join(job['text'] if job['text'].endswith(('.', '!', '?')) else job['text'] + '.' for job in jobs)
    body.write_text(json.dumps({
        'model': args.model,
        'input': [{'type': 'user_input', 'content': [{'type': 'text', 'text': text,
                  'annotations': [{'type': 'speech_metadata', 'style': STYLE}]}]}],
        'response_format': {'type': 'audio'},
        'generation_config': {'speech_config': [{'voice': jobs[0]['voice']}]},
        'store': False
    }, ensure_ascii=False), encoding='utf-8')
    legacy = args.model == 'gemini-3.1-flash-tts-preview'
    if legacy:
        # The earlier model rejects speech_metadata and uses a separate legacy
        # prompting convention; the CLI also wraps its PCM output as WAV.
        prompt = Path(folder) / 'legacy-prompt.txt'
        prompt.write_text(STYLE + '\nLies nur die folgende Wortliste vor, nicht diese Anweisungen. '
                          'Drei Sekunden Stille zwischen den Eintraegen.\n\n' +
                          '\n\n'.join(job['text'] for job in jobs), encoding='utf-8')
        wav = Path(folder) / 'legacy.wav'
        wav.unlink(missing_ok=True)
        command = [str(engine.CLI), 'tts', '--file', str(prompt), '--model', args.model,
                   '--voice', jobs[0]['voice'], '--language', 'de-DE', '--user-project', '', '--out', str(wav)]
    else:
        command = [str(engine.CLI), 'agent', 'run', '--body', '@' + str(body), '--stream=false',
                   '--output-format', 'json', '--user-project', '', '--no-interactive']
    for attempt in range(4):
        last_request = time.monotonic()
        result = engine.run(command)
        if result.returncode and 'per day' in result.stderr:
            raise RuntimeError('Daily model quota exhausted: ' + engine.sanitized(result.stderr))
        if not result.returncode or not any(code in result.stderr for code in ['429', 'rate_limit_error', 'too_many_requests']):
            break
        if attempt == 3:
            break
        retry = re.search(r'retry in (\d+)s', result.stderr, re.IGNORECASE)
        delay = min(60, max(20, int(retry[1]) + 2 if retry else 30))
        print(f'Rate limit; waiting {delay}s: {engine.sanitized(result.stderr)[:450]}', flush=True)
        time.sleep(delay)
    if result.returncode:
        raise RuntimeError(f'Gemini failed: {engine.sanitized(result.stderr)}')
    if legacy:
        if not wav.exists():
            raise RuntimeError('No WAV returned by the legacy TTS model.')
        return wav
    blocks = list(engine.audio_blocks(json.loads(result.stdout)))
    if len(blocks) != 1:
        raise RuntimeError(f'Expected one WAV block, got {len(blocks)}')
    wav = Path(folder) / 'speech.wav'
    wav.write_bytes(base64.b64decode(blocks[0]['data'], validate=True))
    return wav


def boundaries(wav, expected):
    # Pause length varies slightly. Only accept a threshold with exactly one
    # span per input and no implausibly tiny word fragment.
    for minimum in [0.8, 0.65, 0.5]:
        spans = detect_boundaries(wav, minimum)
        if len(spans) == expected and all(end - start >= 0.3 for start, end in spans):
            return spans
    return spans


def detect_boundaries(wav, minimum):
    result = engine.run(['ffmpeg', '-hide_banner', '-i', str(wav), '-af',
                         f'silencedetect=noise=-38dB:d={minimum}', '-f', 'null', '-'])
    match = re.search(r'Duration: (\d+):(\d+):([\d.]+)', result.stderr)
    if not match or result.returncode:
        raise RuntimeError('Could not read the generated audio.')
    total = int(match[1]) * 3600 + int(match[2]) * 60 + float(match[3])
    spans, position = [], 0.0
    for kind, value in re.findall(r'silence_(start|end): ([\d.]+)', result.stderr):
        value = float(value)
        if kind == 'start':
            if value - position > 0.2:
                spans.append((position, value))
            position = total
        else:
            position = value
    if total - position > 0.2:
        spans.append((position, total))
    return spans


def synthesize(jobs, args, folder, manifest, manifest_path):
    wav = request(jobs, args, folder)
    spans = [(0, None)] if len(jobs) == 1 else boundaries(wav, len(jobs))
    if len(spans) != len(jobs):
        print(f'Batch boundaries {len(spans)}/{len(jobs)}; splitting this batch into smaller requests.', flush=True)
        middle = len(jobs) // 2
        synthesize(jobs[:middle], args, folder, manifest, manifest_path)
        synthesize(jobs[middle:], args, folder, manifest, manifest_path)
        return
    # Convert every clip first; then replace the existing files and record them.
    prepared = []
    for index, (job, (start, end)) in enumerate(zip(jobs, spans)):
        clip = Path(folder) / f'clip-{index}.mp3'
        trim = ['-ss', f'{max(0, start - 0.06):.3f}']
        if end is not None:
            trim += ['-to', f'{end + 0.08:.3f}']
        result = engine.run(['ffmpeg', '-v', 'error', '-y', *trim, '-i', str(wav),
                             '-codec:a', 'libmp3lame', '-b:a', '64k', str(clip)])
        if result.returncode:
            raise RuntimeError(f'Conversion failed: {job["file"]}')
        prepared.append((job, clip.read_bytes()))
    for job, data in prepared:
        target = OUT / job['file']
        staging = target.with_suffix('.mp3.part')
        staging.write_bytes(data)
        staging.replace(target)
        manifest['clips'][job['file']] = job
        print(f'{len(manifest["clips"])}/162 ready: {job["file"]}', flush=True)
    staging = manifest_path.with_suffix('.json.part')
    staging.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    staging.replace(manifest_path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--model', default='gemini-3.8-flash-lite-tts')
    parser.add_argument('--topic', action='append', default=[])
    parser.add_argument('--batch', type=int, default=8)
    parser.add_argument('--keep-ready', action='store_true', help='Keep completed native-German clips when changing model')
    args = parser.parse_args()
    if args.batch < 1:
        parser.error('--batch must be positive')
    topics = json.loads(subprocess.check_output(['node', '-e', NODE], cwd=ROOT, text=True, encoding='utf-8'))
    valid_topics = {topic['id'] for topic in topics}
    if set(args.topic) - valid_topics:
        parser.error('Unknown topic: ' + ', '.join(set(args.topic) - valid_topics))
    OUT.mkdir(parents=True, exist_ok=True)
    manifest_path = OUT / 'manifest.json'
    try:
        manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    except (FileNotFoundError, ValueError):
        manifest = {'clips': {}}
    compatible_manifest = manifest.get('version') == VERSION and manifest.get('style') == STYLE
    manifest.update({'version': VERSION, 'language': 'de-DE', 'style': STYLE})
    jobs = []
    for topic in topics:
        if args.topic and topic['id'] not in args.topic:
            continue
        for item_id, text, meaning in topic['items']:
            voice = ['Kore', 'Aoede'][hashlib.sha256(f'{topic["id"]}/{item_id}'.encode()).digest()[0] % 2]
            fingerprint = hashlib.sha256(json.dumps([VERSION, args.model, voice, text, STYLE]).encode()).hexdigest()
            job = {'file': f'{topic["id"]}-{item_id}.mp3', 'text': text, 'voice': voice,
                   'model': args.model, 'fingerprint': fingerprint}
            saved = manifest['clips'].get(job['file'], {})
            target = OUT / job['file']
            compatible = args.keep_ready and compatible_manifest and saved.get('text') == text and saved.get('voice') == voice
            if (saved.get('fingerprint') == fingerprint or compatible) and target.exists() and target.stat().st_size:
                continue
            jobs.append(job)
    print(f'{len(jobs)} German clips to regenerate with native German style metadata.', flush=True)
    with tempfile.TemporaryDirectory(prefix='alpcik-de-native-') as folder:
        for voice in ['Kore', 'Aoede']:
            group = [job for job in jobs if job['voice'] == voice]
            for start in range(0, len(group), args.batch):
                synthesize(group[start:start + args.batch], args, folder, manifest, manifest_path)
    print('German audio generation completed.', flush=True)
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (RuntimeError, subprocess.TimeoutExpired) as error:
        raise SystemExit(str(error))
