#!/usr/bin/env python3
"""학생에게 **말을 거는 글**이 「까만 터미널 상자」에 들어 있나.

  python3 scripts/check-bubble-not-terminal.py            # 전수
  python3 scripts/check-bubble-not-terminal.py walkhome mcc20cipher
  python3 scripts/check-bubble-not-terminal.py --all      # 6개 넘어도 전부

──────────────────────────────────────────────────────────────────────────
왜 생겼나 (2026-09-27)

선생님이 `mcc20citytour` 시뮬을 보시고: *"**말풍선이 잘 안보여. 디자인?
넌 괜찮은것 같지? 전체 기획에 맞춰서?**"*

**안 괜찮았다.** 그날 나는 말풍선을 격자 위로 **자리만 옮기고 생김새는 그대로 뒀다** —
`#0f172a` 까만 바탕 · 흰 글씨 · **12px 고정폭(JetBrains Mono)**.
크림색(`#fffbeb`) 카드 안에서 혼자 터미널이었고, **한국어 문장을 12px 고정폭으로**
읽게 하고 있었다. 그건 말풍선이 아니라 **코드 출력 상자**다.

참고 구현(`quest-problems/mexes/sims.jsx:56-63`)은 이렇게 생겼다:
  · **밝은 바탕** + 1.5px 강조 테두리 + **강조색 글씨**(카드와 같은 계열)
  · **13px · fontWeight 600 · 고정폭 아님** · `lineHeight 1.6` · `keep-all`
  · 앞에 **💬** · 부드러운 그림자
  · ⭐ **걸음 종류에 따라 색이 바뀐다** — 글을 읽기 전에 무슨 일이 났는지 보인다

`memory/feedback_sim_style_consistency.md`(2026-07-02, **반복 지적**
*"그건 내가 원하는게 아니라니까"*)가 이미 *"시뮬은 SimNav 단계 + **말풍선**"* 이라고
적어 뒀는데, **「말풍선이 어떻게 생겨야 하나」는 검사 항목이 아니었다.**

⚠️ **어두운 바탕 + 고정폭 자체는 잘못이 아니다** — **코드**에는 그게 맞다.
   전수로 재니 158곳 중 **148곳이 진짜 코드 블록**이었다. 문제는 그 옷을 입은
   **말**이다. 그래서 이 검사기는 둘을 가른다.

⚠️ **판정이 아니라 볼 자리 표시다.** 「값을 보여주는 상자」(예: `mcc20kitty` 의
   *"지금까지 3의 배수: 7 ← ✓ 개수"*)는 숫자 표시라 어두운 바탕이 정당할 수 있다.
   **라벨을 읽고 사람이 정해라.**
⚠️ **0건이 결백이 아니다** — 다른 어두운 색값, `<div>` 아닌 태그, 스타일을 상수로
   빼 둔 자리는 못 본다.
──────────────────────────────────────────────────────────────────────────
"""
import argparse
import glob
import io
import os
import re
import sys

DARK = re.compile(r'background:\s*"(#0f172a|#1e293b|#111827|#0b1220|#1f2937)"')
MONO = re.compile(r"JetBrains Mono")
# 코드 블록 신호 — 배열을 줄줄이 그리는 자리
CODEY = re.compile(r"lines\s*\.map|\{lines|code=|\.map\(\(l|highlight")
# 말 거는 신호 — 문장 단위 줄바꿈 + (한국어 문장 또는 msg/bubble 변수)
PRELINE = re.compile(r'whiteSpace:\s*"pre-line"')
SPEECH = re.compile(r"\{[\w.]*(msg|bubble|narr|caption)[\w.]*\}|[가-힣]{4,}")


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("quests", nargs="*")
    ap.add_argument("--all", action="store_true")
    a = ap.parse_args()
    want = set(x for arg in a.quests for x in arg.split()) or None

    hits, codeblocks = {}, 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in DARK.finditer(src):
            seg = src[m.start(): m.start() + 700]
            if not MONO.search(seg) and not PRELINE.search(seg):
                continue
            if CODEY.search(seg):
                codeblocks += 1
                continue
            if PRELINE.search(seg) and SPEECH.search(seg):
                line = src[:m.start()].count("\n") + 1
                snippet = re.sub(r"\s+", " ", seg[:260])
                say = re.search(r"[가-힣][^\"']{4,40}", snippet)
                hits.setdefault(quest, []).append(
                    (os.path.basename(f), line, say.group(0)[:38] if say else "(글 못 뽑음)"))
            else:
                codeblocks += 1

    n = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"학생에게 **말을 거는 글**인데 까만 터미널 상자 — {n}곳 · quest {len(hits)}개{scope}")
    print(f"   (코드 블록으로 보고 뺀 것 {codeblocks}곳 — 거긴 어두운 바탕이 맞다)\n")

    shown = sorted(hits, key=lambda q: (-len(hits[q]), q))
    if not a.all and not want:
        shown = shown[:8]
    for q in shown:
        print(f"  ■ {q}")
        for fn, ln, say in hits[q][:3]:
            print(f"      {fn}:{ln}  «{say}»")
        if len(hits[q]) > 3:
            print(f"      … {len(hits[q]) - 3}곳 더")
    if len(hits) > len(shown):
        print(f"\n  … quest {len(hits) - len(shown)}개 더 (--all)")

    print("""
고치는 법 — `quest-problems/mexes/sims.jsx:56-63` 을 그대로 따른다 (발명 금지):
    background: <밝은 바탕>, border: "1.5px solid <강조>", color: <강조 글씨>,
    borderRadius: 12, padding: "11px 14px", fontSize: 13, fontWeight: 600,
    lineHeight: 1.6, whiteSpace: "pre-line", wordBreak: "keep-all",
    boxShadow: "0 4px 14px rgba(0,0,0,.08)"          → 앞에 💬
  ⭐ **걸음 종류에 따라 색을 바꿔라** — 통과 초록 · 막힘 빨강 · 그 밖 quest 색.
     글을 읽기 전에 무슨 일이 났는지 보인다.

⚠️ 판정이 아니라 **볼 자리 표시**다. 「값을 보여주는 상자」는 어두운 바탕이 정당할 수 있다
   (`mcc20kitty` 의 "지금까지 3의 배수: 7 ← ✓ 개수" 같은 것). **라벨을 읽고 사람이 정해라.**
⚠️ 0건이 결백이 아니다 — 다른 색값·다른 태그·상수로 뺀 스타일은 못 본다.
근거: memory/feedback_sim_style_consistency.md · memory/feedback_fix_all_at_once_not_one_by_one.md""")
    sys.exit(1 if n else 0)


if __name__ == "__main__":
    main()
