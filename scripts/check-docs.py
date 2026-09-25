#!/usr/bin/env python3
"""CLAUDE.md 와 에이전트 파일이 가리키는 경로가 실제로 있는지 검사.

왜 있나 — 2026-09-04 검토에서 CLAUDE.md 가 "에이전트 4 개" 라고 가리키는데
실제로는 14 개였다. 없는 걸 가리키는 목차는 틀린 본문보다 나쁘다 — 열어봐야 없으니까.
목차 방식으로 바꾼 이상 이 검사는 기계가 해야 한다.
"""
import os, re, sys

HOME = os.path.expanduser("~")
# ⚠️ 2026-09-25 넓힘 — `memory/xxx.md` 처럼 **짧게** 쓴 참조를 못 보고 있었다.
#   `CLAUDE.md:224` 가 `memory/feedback_plain_korean.md` 를 가리키는데 **그 파일이 없었고**,
#   이 검사기는 **0건**이라고 했다. 담당 하나가 그 파일을 찾다 시간을 썼다.
#   패턴이 `~/Users/...memory/` 같은 **긴 형태만** 봤기 때문이다 —
#   그런데 CLAUDE.md 본문은 거의 다 `memory/...` 로 짧게 쓴다. 정확히 못 보는 쪽만 골라 봤다.
#   "없는 걸 가리키는 목차는 틀린 본문보다 나쁘다" 가 이 검사기가 생긴 이유인데
#   **그 이유에 제일 잘 맞는 모양을 놓치고 있었다.**
PAT = re.compile(r"`((?:\.claude/|scripts/|data/|app/|lib/|components/|hooks/|memory/|~?/?Users/[^`]*memory/)[^`\s]+?\.(?:md|py|ts|tsx|mjs|jsx))`")

def scan(path):
    bad = []
    txt = open(path, encoding="utf-8").read()
    for m in PAT.finditer(txt):
        ref = m.group(1)
        if "*" in ref or "<" in ref:      # glob·자리표시자는 건너뛴다
            continue
        p = ref.replace("~", HOME)
        # `memory/...` 는 저장소 밖(홈 아래 프로젝트 메모리 폴더)에 산다.
        if p.startswith("memory/"):
            p = os.path.join(HOME, ".claude", "projects",
                             "-Users-juhyunchoi-Coding-python-quiz-dashboard", p)
        if not os.path.exists(p):
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
