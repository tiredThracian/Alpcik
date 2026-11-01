"""Generate Unit 2 MP3s with Gemini speech metadata, never spoken instructions.

--sample generates 3 words and 3 sentences; the default generates all 80 clips.
A manifest allows resuming and replaces clips produced with obsolete settings.
"""
import argparse
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import time
import wave

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'english-only' / 'audio' / 'en' / 'celebrations'
CLI = Path(os.environ['LOCALAPPDATA']) / 'Programs' / 'gemini-api' / 'gemini-api.exe'
NODE = "const fs=require('fs'),vm=require('vm');const s={window:{}};vm.runInNewContext(fs.readFileSync('english-only/celebrations-data.js','utf8'),s);process.stdout.write(JSON.stringify(s.window.celebrationsWords));"
STYLE = ('Calm, natural, neutral delivery. Clear American English pronunciation at a slightly slower '
         'conversational pace for a child learning English. Gentle ordinary intonation, '
         'without dramatic emphasis, exaggerated pitch, sing-song delivery or stretched syllables.')
VERSION = 'speech-metadata-v2'


def run(command):
    return subprocess.run(command, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=240)


def sanitized(message):
    message = re.sub(r'AIza[\w-]+|ya29\.[\w.-]+', '[redacted]', message)
    return re.sub(r'(?i)(Bearer\s+|api[_-]?key[\s=:]+)\S+', r'\1[redacted]', message)[:1200]


def audio_blocks(value):
    if isinstance(value, dict):
        if value.get('type') == 'audio' and value.get('data'):
            yield value
        else:
            for child in value.values():
                yield from audio_blocks(child)
    elif isinstance(value, list):
        for child in value:
            yield from audio_blocks(child)


def generate(job, args, folder):
    request = {
        'model': args.model,
        'input': [{'type': 'user_input', 'content': [{
            'type': 'text', 'text': job['text'],
            'annotations': [{'type': 'speech_metadata', 'style': STYLE}]
        }]}],
        'response_format': {'type': 'audio'},
        'generation_config': {'speech_config': [{'voice': args.voice}]},
        'store': False
    }
    body = Path(folder) / 'request.json'
    body.write_text(json.dumps(request, ensure_ascii=False), encoding='utf-8')
    command = [str(CLI), 'agent', 'run', '--body', '@' + str(body), '--stream=false',
               '--output-format', 'json', '--user-project', '', '--no-interactive']
    for attempt in range(4):
        result = run(command)
        if not result.returncode or not any(marker in result.stderr for marker in ['429', 'rate_limit_error', 'too_many_requests']):
            break
        if attempt == 3:
            break
        retry = re.search(r'retry in (\d+)s', result.stderr, re.IGNORECASE)
        delay = min(60, max(20, int(retry[1]) + 2 if retry else 30))
        print(f'Rate limit; waiting {delay}s before retrying {job["file"]}', flush=True)
        time.sleep(delay)
    if result.returncode:
        raise RuntimeError(f'Gemini failed (exit {result.returncode}): {sanitized(result.stderr)}')
    response = json.loads(result.stdout)
    blocks = list(audio_blocks(response))
    if not blocks:
        raise RuntimeError(f'No audio in Gemini response. Top-level fields: {list(response)}')
    if len(blocks) != 1:
        raise RuntimeError(f'Expected one audio block, got {len(blocks)}; clip was not saved.')
    block = blocks[0]
    data = base64.b64decode(block['data'], validate=True)
    mime = block.get('mime_type', 'audio/wav')
    if not data.startswith(b'RIFF') and ('l16' in mime or 'pcm' in mime):
        output = io.BytesIO()
        with wave.open(output, 'wb') as stream:
            stream.setnchannels(1)
            stream.setsampwidth(2)
            stream.setframerate(24000)
            stream.writeframes(data)
        data = output.getvalue()
    wav = Path(folder) / 'speech.wav'
    wav.write_bytes(data)
    with wave.open(str(wav), 'rb') as stream:
        duration = stream.getnframes() / stream.getframerate()
        # A word should not contain a long preamble; refuse suspicious results.
        maximum = 8 if job['file'].startswith('words/') else max(10, len(job['text'].split()) * 1.2)
        if duration < 0.15 or duration > maximum:
            raise RuntimeError(f'Unexpected audio duration for {job["file"]}: {duration:.1f}s; not saved.')
    mp3 = Path(folder) / 'speech.mp3'
    result = run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-codec:a', 'libmp3lame', '-b:a', '64k', str(mp3)])
    if result.returncode:
        raise RuntimeError('MP3 conversion failed.')
    target = OUT / job['file']
    target.parent.mkdir(parents=True, exist_ok=True)
    staging = target.with_suffix('.mp3.part')
    staging.write_bytes(mp3.read_bytes())
    staging.replace(target)
    return round(duration, 3)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sample', action='store_true')
    parser.add_argument('--model', default='gemini-3.8-flash-lite-tts')
    parser.add_argument('--voice', default='Kore')
    args = parser.parse_args()
    words = json.loads(subprocess.check_output(['node', '-e', NODE], cwd=ROOT, text=True, encoding='utf-8'))
    jobs = []
    for word in words:
        if args.sample and word['word'] not in ['celebrate', 'statue', 'jewelry']:
            continue
        jobs.append({'file': f"words/{word['word']}.mp3", 'text': word['word'] + '.'})
        jobs.extend({'file': f"{word['word']}-{variant}.mp3", 'text': sentence.replace('_____', word['word'])}
                    for variant, sentence in enumerate(word['sentences']) if not args.sample or variant == 0)
    OUT.mkdir(parents=True, exist_ok=True)
    manifest_path = OUT / 'manifest.json'
    try:
        manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    except (FileNotFoundError, ValueError):
        manifest = {'clips': {}}
    if args.sample:
        (OUT / 'sample-manifest.json').write_text(json.dumps({
            'model': args.model, 'voice': args.voice, 'style': STYLE, 'clips': jobs
        }, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'{len(jobs)} clips requested; {args.model}, {args.voice}; style via metadata', flush=True)
    with tempfile.TemporaryDirectory(prefix='alpcik-unit2-') as folder:
        for number, job in enumerate(jobs, 1):
            fingerprint = hashlib.sha256(json.dumps([VERSION, job['text'], STYLE, args.model, args.voice]).encode()).hexdigest()
            target = OUT / job['file']
            saved = manifest['clips'].get(job['file'], {})
            if saved.get('fingerprint') == fingerprint and target.exists() and target.stat().st_size:
                print(f'{number}/{len(jobs)} already ready: {job["file"]}', flush=True)
                continue
            started = time.monotonic()
            duration = generate(job, args, folder)
            manifest['clips'][job['file']] = {**job, 'fingerprint': fingerprint, 'seconds': duration}
            manifest.update({'version': VERSION, 'model': args.model, 'voice': args.voice, 'style': STYLE})
            staging = manifest_path.with_suffix('.json.part')
            staging.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
            staging.replace(manifest_path)
            print(f'{number}/{len(jobs)} saved: {job["file"]} ({duration}s)', flush=True)
            # The configured model currently allows 10 requests/minute.
            time.sleep(max(0, 7 - (time.monotonic() - started)))
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (RuntimeError, subprocess.TimeoutExpired) as error:
        raise SystemExit(str(error))
