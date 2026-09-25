#!/usr/bin/env python3
"""CodeWalk 말풍선(`bubble:`) 이 몇 줄인가 — **한 beat = 한 말풍선**인데 문장이 몇 개나 쌓였나.

왜 이 검사기가 생겼나 (2026-09-25): 선생님이 moohunt 에서 말풍선 하나에 **다섯 문장**을
발견하셨다(커밋 d2ac176b 로 세 걸음으로 갈랐다). `narr` 은 이미 55자 한 문장 기준이
있는데(`check-narr-length.py`), **`bubble` 에는 아무 기준이 없었다** — CodeWalk 은
quest 95개가 쓰는데 그중 누구도 "말풍선 하나가 몇 줄까지 괜찮은가" 를 재지 않았다.

⚠️ **기준 줄 수(N)는 이 스크립트가 정하지 않는다** — 교육·화면 담당이 판정 중이다.
   `--min` 인자로 받는다. 기본값은 넉넉하게 6으로 뒀다(실측 분포 참고, 아래).

  python3 scripts/check-codewalk-bubble-length.py             # 기본 6줄 이상
  python3 scripts/check-codewalk-bubble-length.py --min 4     # 4줄 이상
  python3 scripts/check-codewalk-bubble-length.py --min 4 moohunt   # 한 quest 만, 내용까지
  python3 scripts/check-codewalk-bubble-length.py --min 4 --all     # 전부, 내용까지

## 무엇을 재나

`bubble: t(E, "영어…", "한국어…")` 짝을 찾아서 **한국어 문자열 안 `\n` 개수 + 1** 을
"줄 수" 로 센다 (화면에서 `whiteSpace: pre-line` 으로 그 줄바꿈이 그대로 렌더링되므로 —
`components/quest/CodeWalk.jsx:198`). 글쓴이가 넣은 `\n` 이 실제로 몇 줄을 만드는지를
재는 것이지, 문장 부호로 문장 수를 추정하지 않는다(narr 와 다른 점 — narr 은 아직
줄바꿈이 없는 한 문장 원칙이라 문장부호로 셌지만, bubble 은 이미 여러 줄을 전제로
설계돼 있다. `CodeWalk.jsx:20-21` 주석 참고).

⚠️ 실측 분포(2026-09-25, quest 95개 · beat 1,128개) — 참고용, 기준이 아니다:
   1줄 419 · 2줄 385 · 3줄 200 · 4줄 76 · 5줄 19 · 6줄 11 · 7줄 8 ·
   8줄 4 · 9줄 2 · 11줄 4

## 이 검사기가 못 보는 것 (0건이 결백이 아니다)

- **영어 쪽 길이는 안 잰다.** `check-narr-length.py` 는 언어별로 다른 기준을 쓰는데
  (한국어 55자 / 영어 150자+2문장), bubble 은 아직 그 판정이 없어서 안 짰다.
  ⚠️ 2026-09-25 `reverseeng` 사례처럼 **한쪽 언어에서만** 결함이 나는 자리가 있을 수
  있다 — 기준이 정해지면 영어 쪽도 반드시 넣어라.
- **한 줄이 길어서 실제로는 두 줄로 보이는 경우**는 안 잰다(`\n` 개수만 본다).
  `textWrap: balance` 가 있어 화면에서 자동으로 접히는 건 이 스크립트가 알 수 없다.
- `sims.jsx`·`brute.jsx`·`fast.jsx` 안의 `bubble:` 도 같이 본다(CodeWalk 을 쓰는
  자리라면 파일 이름과 무관하게 걸린다) — 단 **CodeWalk 이 아닌 다른 컴포넌트**가
  우연히 `bubble:` 이라는 키를 쓰면 오탐이다(이 저장소에서 실측했을 땐 전부 CodeWalk
  beats 였다. 새 컴포넌트가 같은 키 이름을 쓰기 시작하면 다시 확인해라).

⚠️ **0건이 결백이 아니다.** 이 스크립트는 "줄 수" 하나만 잰다. 학생에게 좋은가는
   사람이 읽어서 판정한다.
"""
import glob
import io
import json
import re
import sys

PAT = re.compile(
    r'bubble:\s*t\(E,\s*("(?:[^"\\]|\\.)*")\s*,\s*("(?:[^"\\]|\\.)*")', re.S)


def scan(path):
    src = io.open(path, encoding="utf-8", errors="replace").read()
    out = []
    for m in PAT.finditer(src):
        try:
            en = json.loads(m.group(1))
            ko = json.loads(m.group(2))
        except ValueError:
            continue
        line_no = src[:m.start()].count("\n") + 1
        out.append((en, ko, line_no))
    return out


def main():
    argv = sys.argv[1:]
    min_lines = 6
    if "--min" in argv:
        i = argv.index("--min")
        min_lines = int(argv[i + 1])
        argv = argv[:i] + argv[i + 2:]
    args = [a for a in argv if not a.startswith("-")]
    detail = bool(args) or "--all" in argv

    hits = {}
    total = 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if args and quest not in args:
            continue
        for en, ko, line_no in scan(f):
            total += 1
            n = len(ko.split("\n"))
            if n >= min_lines:
                hits.setdefault(quest, []).append(
                    (n, f, line_no, ko.splitlines()[0][:50]))

    n_hits = sum(len(v) for v in hits.values())
    print(f"CodeWalk 말풍선 — **{min_lines}줄 이상 {n_hits}곳 · quest {len(hits)}개** "
          f"(전체 bubble {total}개)\n")
    for q in sorted(hits, key=lambda x: (-len(hits[x]), x)):
        print(f"  🚨 {q:<20} {len(hits[q])}곳")
        if detail:
            for n, f, line_no, snippet in sorted(hits[q], key=lambda x: -x[0]):
                print(f"       {f}:{line_no}  {n}줄  {snippet}")
    if not hits:
        print("  0곳.")
    if not detail and hits:
        print("\n  줄까지 보려면: python3 scripts/check-codewalk-bubble-length.py --min "
              f"{min_lines} <quest 이름>")
    print(f"\n잣대: 한국어 `bubble` 문자열 안 `\\n` 개수 + 1 이 {min_lines}줄 이상이면 걸린다.")
    print("   기준 줄 수는 이 스크립트가 정한 게 아니다 — --min 으로 바꿔서 판정해라.")
    print("⚠️ 영어 쪽은 아직 안 잰다. 0건이 결백은 아니다 — 근거는 파일 머리 주석.")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
