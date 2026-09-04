#!/usr/bin/env python3
"""CLAUDE.md 와 에이전트 파일이 가리키는 경로가 실제로 있는지 검사.

왜 있나 — 2026-09-04 검토에서 CLAUDE.md 가 "에이전트 4 개" 라고 가리키는데
실제로는 14 개였다. 없는 걸 가리키는 목차는 틀린 본문보다 나쁘다 — 열어봐야 없으니까.
목차 방식으로 바꾼 이상 이 검사는 기계가 해야 한다.
"""
import os, re, sys

HOME = os.path.expanduser("~")
PAT = re.compile(r"`((?:\.claude/|scripts/|data/|app/|lib/|components/|hooks/|~?/?Users/[^`]*memory/)[^`\s]+?\.(?:md|py|ts|tsx|mjs|jsx))`")

def scan(path):
    bad = []
    txt = open(path, encoding="utf-8").read()
    for m in PAT.finditer(txt):
        ref = m.group(1)
        if "*" in ref or "<" in ref:      # glob·자리표시자는 건너뛴다
            continue
        p = ref.replace("~", HOME)
        if not os.path.exists(p if p.startswith("/") else p):
            bad.append((txt[:m.start()].count("\n") + 1, ref))
    return bad

def main():
    targets = ["CLAUDE.md"]
    for d in (".claude/agents", ".claude/docs", ".claude/skills"):
        for root, _, files in os.walk(d):
            targets += [os.path.join(root, f) for f in files if f.endswith(".md")]

    total = 0
    for t in sorted(targets):
        bad = scan(t)
        if bad:
            total += len(bad)
            print(f"\n❌ {t}")
            for line, ref in bad:
                print(f"   {line:>4}줄  {ref}")
    print(f"\n검사 {len(targets)}개 파일 · 깨진 참조 {total}건")
    return 1 if total else 0

if __name__ == "__main__":
    sys.exit(main())
