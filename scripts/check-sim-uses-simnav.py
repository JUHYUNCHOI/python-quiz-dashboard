#!/usr/bin/env python3
"""시뮬의 ◀▶ 를 **손으로 만들었나**, 공용 `SimNav` 를 썼나.

  python3 scripts/check-sim-uses-simnav.py           # 전수
  python3 scripts/check-sim-uses-simnav.py mcc20citytour lc3
  python3 scripts/check-sim-uses-simnav.py --all      # 6개 넘어도 다 보여준다

──────────────────────────────────────────────────────────────────────────
왜 생겼나 (2026-09-27)

선생님이 `mcc20citytour` 시뮬을 보시고:
  *"버튼 순서나 처음부터 시작하는 버튼도 없어. 디자이너? 뭐지?
    너 마음대로 다른 디자인이랑 다르잖아"*

**맞는 지적이었고, 규칙은 이미 있었다.** `memory/feedback_sim_style_consistency.md`
(2026-06-30)가 *"`@/components/quest` 의 `useTraceStep`/`SimNav` 를 쓴다"* ·
*"시뮬 만들기 전에 기존 sims.jsx 를 먼저 읽어 패턴을 맞춘다"* 라고 적혀 있다.
`memory/quest_season_shape_consistency.md` 의 제목은 아예 **「발명 금지」** 다.

그런데 **검사 항목이 아니어서** 그날 내가 버튼을 새로 만들었고, 셋이 한꺼번에 틀어졌다:
  ① **「처음부터」(⏮) 가 없다** — 20걸음 끝에서 되돌아갈 길이 ◀ 를 19번 누르는 것뿐.
     걸음이 localStorage 에 남으니 **다시 와도 끝에 있다.** 더 나빴다.
  ② **카운터 자리가 다르다** — 공용은 버튼 **사이**, 손수 만든 건 버튼 **위**.
  ③ **형제 시뮬과 모양이 다르다.**
게다가 그 전날엔 **localStorage 저장까지 손으로 짰는데 `useTraceStep` 에 이미 있었다.**
같은 것을 두 번 만든 것이다.

전수 실측 — **버튼 43개 · quest 24개**가 손으로 만든 것이다(공용을 쓰는 파일은 39개).
선생님이 그중 하나를 밟으신 것뿐이다. 표본으로 `tricks`(「▶ 다음 쌍」·「▶ 다음 공개」)와
`lc3`(「◀ 이전」·「다음 ▶」)을 손으로 열어 확인했다 — **둘 다 진짜 걸음 네비였다.**

⚠️ **이건 판정이 아니라 「볼 자리 표시」다.** 정당한 자리가 있다 —
   `▶ 실행`(코드 돌리기) · `▶▶ 끝까지`(지름길) 처럼 **걸음 네비가 아닌** 버튼,
   그리고 `SimNav` 로 감당 안 되는 특수한 시뮬. 그래서 **라벨을 같이 찍는다** —
   사람이 읽고 정해라.
⚠️ **0건이 결백이 아니다** — `<button>` 이 아니라 `<div onClick>` 으로 만든 자리,
   화살표 대신 「이전/다음」 글자만 쓴 자리는 못 본다.
──────────────────────────────────────────────────────────────────────────
"""
import argparse
import glob
import io
import os
import re
import sys

# 걸음 네비로 **보이는** 버튼만. `▶ 실행`·`▶▶ 끝까지` 같은 건 아래에서 걸러낸다.
BTN_RE = re.compile(r"<button\b(?:[^<]|<(?!/button>))*?</button>", re.S)
ARROW_RE = re.compile(r"[◀▶⏮⏭]")
# 네비가 **아닌** 것 — 지름길·실행·재생
NOT_NAV = re.compile(
    r"끝까지|Skip to the end|실행|Run\b|재생|Play\b|처음으로 돌아|"
    r"다음 쪽|다음 단계로 넘어|Next page", re.I)


# ── 규칙 2 (2026-09-27): `accent` 가 **그 quest 고유색과 다른가** ────────────
# 선생님: *"USACO에서 우리가 해왔던 디자인? UX랑 너무 다른데?"*
# 형제는 각자 **한 색**만 쓴다 — knight `#2563eb` · kitty `#dc2626` · rect `#059669`.
# citytour 만 셋이 섞여 있었고, 그중 `#0e7490` 은 **CLAUDE.md 의 SimNav 사용 예시에
# 적힌 색**이었다. **예시를 복붙하고 quest 색으로 안 바꾼 것**이다.
# 한 번 나온 실수가 아니라 **복붙이 원인**이라 다른 quest 에도 있다 — 실측 35건·quest 11개.
#
# ⚠️ **판정이 아니다.** 일부러 다른 색을 쓰는 자리가 있다 — 예: `hps` 는 한 줄 차이로
#    `#dc2626`(틀린 쪽)과 `#16a34a`(맞는 쪽)를 나란히 쓴다. 그건 **의미가 있는 대비**다.
#    그래서 **「여러 quest 에 똑같이 나타나는 남의 색」을 따로 세운다** — 그게 복붙 신호다.
A_RE = re.compile(r'const A = "(#[0-9a-fA-F]{3,8})"')
ACCENT_RE = re.compile(r'(?:accent|accentColor)=\{?"(#[0-9a-fA-F]{3,8})"\}?')


def accent_mismatches(want):
    """quest -> [(파일, 줄, 색)] — 그 quest 의 `const A` 와 다른 accent."""
    own, bad = {}, {}
    files = sorted(glob.glob("quest-problems/*/*.jsx"))
    for f in files:
        q = f.split("/")[1]
        if want and q not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in A_RE.finditer(src):
            own.setdefault(q, set()).add(m.group(1).lower())
    for f in files:
        q = f.split("/")[1]
        if want and q not in want:
            continue
        if not own.get(q):
            continue          # 고유색을 안 정한 quest 는 비교할 기준이 없다
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in ACCENT_RE.finditer(src):
            col = m.group(1).lower()
            if col not in own[q]:
                bad.setdefault(q, []).append(
                    (os.path.basename(f), src[:m.start()].count("\n") + 1, col))
    return own, bad


def open_tag_end(btn: str) -> int:
    """`<button ...>` 여는 태그가 **끝나는** 자리. 중괄호 깊이를 세야 한다 —
    `onClick={() => setStep(...)}` 안의 `=>` 때문에 첫 `>` 를 쓰면 틀린다
    (2026-09-27 에 실제로 그렇게 틀려서 라벨에 코드가 새어 나왔다)."""
    depth = 0
    for i, ch in enumerate(btn):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        elif ch == ">" and depth == 0:
            return i
    return btn.index(">")


def label_of(btn: str) -> str:
    """버튼 안의 **사람이 읽는 글자**만 뽑는다 (속성·스타일 객체는 버린다)."""
    body = btn[open_tag_end(btn) + 1:btn.rindex("</button>")]
    body = re.sub(r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}", " ", body)   # {t(E,...)} 같은 식은 통째로
    txt = re.sub(r"<[^>]+>", " ", body)
    return re.sub(r"\s+", " ", txt).strip()[:46]


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("quests", nargs="*")
    ap.add_argument("--all", action="store_true", help="6개 넘어도 전부 보여준다")
    a = ap.parse_args()
    want = set(x for arg in a.quests for x in arg.split()) or None

    hand, good = {}, 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        if "SimNav" in src:
            good += 1
            continue
        for btn in BTN_RE.findall(src):
            lab = label_of(btn)
            # 화살표는 **버튼 글자** 안에 있어야 한다 — 속성 안의 것은 안 센다
            if not ARROW_RE.search(lab):
                continue
            if NOT_NAV.search(lab) or NOT_NAV.search(btn[:400]):
                continue
            hand.setdefault(quest, []).append((os.path.basename(f), lab or "(글자 못 뽑음)"))

    n = sum(len(v) for v in hand.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"손으로 만든 걸음 버튼 {n}건 · quest {len(hand)}개{scope}"
          f"   |   공용 SimNav 쓰는 파일 {good}개\n")

    shown = sorted(hand, key=lambda q: (-len(hand[q]), q))
    if not a.all and not want:
        shown = shown[:6]
    for quest in shown:
        print(f"  ■ {quest}")
        for fn, lab in hand[quest][:4]:
            print(f"      {fn}  «{lab}»")
        if len(hand[quest]) > 4:
            print(f"      … {len(hand[quest]) - 4}건 더")
    if len(hand) > len(shown):
        print(f"\n  … quest {len(hand) - len(shown)}개 더 (--all 로 전부)")

    print("""
고치는 법 — `components/quest/TraceStepper.tsx` 의 공용 것을 쓴다:
    import { SimNav, useTraceStep } from "@/components/quest/TraceStepper";
    <SimNav idx={idx} total={총걸음} onIdx={setIdx} accent={A} showLabels isEn={E} />
  ⛔ `accent` 에 **색을 직접 쓰지 마라. 그 quest 의 `const A` 를 넘겨라.**
     예시에 박힌 색(`#0e7490`·`#0891b2`)이 그대로 복붙돼 quest 11개에 남아 있다 — 이 예시가 감염원이었다.
  ⏮ 처음부터 · ◀ 이전 · **[걸음 칩]** · ▶ 다음 이 한 줄로 나온다(카운터가 버튼 **사이**).
  `useTraceStep(total, key)` 는 **localStorage 저장까지 이미 해 준다** — 손으로 짜지 마라.

⚠️ 판정이 아니라 **볼 자리 표시**다. `▶ 실행`·`▶▶ 끝까지` 같은 건 걸러냈지만
   그 밖에도 정당한 자리가 있을 수 있다 — **라벨을 읽고 사람이 정해라.**
⚠️ 0건이 결백이 아니다 — `<div onClick>` 으로 만든 자리, 화살표 없이 글자만 쓴 자리는 못 본다.
근거: memory/feedback_sim_style_consistency.md · memory/quest_season_shape_consistency.md""")

    # ── 규칙 2 — accent 색 ────────────────────────────────────────────────
    own, bad = accent_mismatches(want)
    n2 = sum(len(v) for v in bad.values())
    from collections import Counter
    spread = Counter(c for v in bad.values() for _, _, c in v)
    # 서로 다른 quest 2개 이상에 같은 «남의 색» 이 나오면 복붙 신호다
    by_q = {}
    for q, v in bad.items():
        for _, _, c in v:
            by_q.setdefault(c, set()).add(q)
    copypaste = {c: qs for c, qs in by_q.items() if len(qs) >= 2}

    print(f"\n── 따로: **accent 가 quest 고유색과 다른 자리** {n2}건 · quest {len(bad)}개")
    if copypaste:
        print("   🚩 **여러 quest 에 똑같이 나타나는 남의 색** — 복붙 자국일 가능성이 높다:")
        for c, qs in sorted(copypaste.items(), key=lambda kv: -len(kv[1])):
            print(f"      {c}  ← quest {len(qs)}개: {', '.join(sorted(qs))}")
    for q in sorted(bad, key=lambda x: (-len(bad[x]), x))[:6 if not want else 99]:
        print(f"   ■ {q}  (A = {', '.join(sorted(own[q]))})")
        for fn, ln, col in bad[q][:3]:
            print(f"       {fn}:{ln}  accent={col}")
        if len(bad[q]) > 3:
            print(f"       … {len(bad[q]) - 3}건 더")
    print("""   ⚠️ **판정이 아니다.** 일부러 다른 색을 쓰는 자리가 있다 — `hps` 는 한 줄 차이로
      `#dc2626`(틀린 쪽)·`#16a34a`(맞는 쪽)를 나란히 쓴다. 그건 **의미 있는 대비**다.
      위 🚩 목록부터 봐라 — 서로 무관한 quest 에 같은 색이 반복되면 그건 의미가 아니라 복붙이다.""")

    sys.exit(1 if (n or n2) else 0)


if __name__ == "__main__":
    main()
