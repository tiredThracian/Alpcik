"""Verify English clips by transcribing them in chunks and comparing with the expected sentences.
Writes the ids of clips that look wrong to /tmp-like file english-only/audio/en/_bad.txt (deleted by --delete)."""
import json, os, re, subprocess, sys, tempfile
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; A = ROOT/"english-only"/"audio"/"en"
CLI = Path(os.environ["LOCALAPPDATA"])/"Programs"/"gemini-api"/"gemini-api.exe"
NODE = "const fs=require('fs');const r=new Function(fs.readFileSync('english-only/questions.js','utf8')+';return quizSets;')();const seen={};r.flatMap(q=>q.questions).forEach(q=>{seen[q.id]=q.sentence.replace(/<[^>]*>/g,'').replace('_____',q.answer)});process.stdout.write(JSON.stringify(seen))"
items = json.loads(subprocess.check_output(["node","-e",NODE],cwd=ROOT,text=True,encoding="utf-8"))
norm = lambda s: re.sub(r"[^a-z ]","",s.lower().replace("-"," ")).split()
ids = [i for i in items if (A/f"{i}.mp3").exists()]
bad = []
for n in range(0, len(ids), 20):
    chunk = ids[n:n+20]
    with tempfile.TemporaryDirectory() as t:
        lst = Path(t)/"l.txt"
        sil = Path(t)/"s.mp3"; subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i","anullsrc=r=24000:cl=mono","-t","1.5","-b:a","48k",str(sil)])
        lines = []
        for i in chunk: lines += [f"file '{(A/f'{i}.mp3').as_posix()}'", f"file '{sil.as_posix()}'"]
        lst.write_text("\n".join(lines))
        out = Path(t)/"c.mp3"
        subprocess.run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",str(lst),"-codec:a","libmp3lame","-b:a","48k",str(out)])
        prompt = f"Transcribe this audio. It has exactly {len(chunk)} separate English sentences separated by pauses. Output exactly {len(chunk)} lines, one sentence per line, no numbering, nothing else."
        r = subprocess.run([str(CLI),"analyze",prompt,"-i",str(out),"--user-project",""],capture_output=True,text=True,encoding="utf-8",errors="replace")
        got = [l.strip() for l in r.stdout.strip().splitlines() if l.strip()]
    if len(got) != len(chunk):
        print(f"chunk {n}: got {len(got)} lines, expected {len(chunk)}", r.stderr[:200]); bad += chunk; continue
    for i, g in zip(chunk, got):
        a, b = norm(items[i]), norm(g)
        # tolerate small ASR diffs (names): accept if >=80% of words match in order-insensitive way
        ok = len(a) and len(set(a) & set(b)) / len(set(a)) >= 0.8 and abs(len(a)-len(b)) <= 2
        if not ok: bad.append(i); print("BAD", i, "|", items[i], "|", g)
    print(f"{min(n+20,len(ids))}/{len(ids)} checked", flush=True)
print(len(bad), "bad:", " ".join(bad))
if "--delete" in sys.argv:
    for i in bad: (A/f"{i}.mp3").unlink(missing_ok=True)
