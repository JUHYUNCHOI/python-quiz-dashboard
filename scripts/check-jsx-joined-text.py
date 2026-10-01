#!/usr/bin/env python3
"""JSX 조각을 **이어 붙여** 읽는다 — 한 조각만 보면 전부 멀쩡한 결함.

왜 (2026-10-01): 하루에 **같은 뿌리의 결함이 둘** 났고 **둘 다 어느 검사기도 못 봤다.**

  ① `mcc20missing` 1쪽 — 화면에 **「모든 수에 상수 K K 를 더해요」**
     소스는 조각 **셋**이다:
         {t(E, "Add a constant ", "모든 수에 상수 ")}
         <b style={{...}}>K</b>
         {t(E, " to EVERY number…", " K 를 더해요…")}       ← 여기 K 가 **또** 있다
     **조각 하나하나는 전부 멀쩡하다.** 이어 붙여야 `K` 가 두 번인 게 보인다.
     학생(초6)이 화면을 읽고 찾았다 — *"어? K가 왜 두 번이지? 하고 **멈칫했다.**"*
  ② `makedistinct` 2쪽 — `K ≠ 0` 의 뜻을 **옆 조각**에 붙였는데
     `check-undefined-symbol` 이 **조각 단위로 봐서** 계속 「뜻 없음」으로 신고했다.

**어느 검사기도 이 층을 안 본다.** 전부 `t(E, …)` 문자열 **하나**를 단위로 본다 —
`check-bilingual-drift` 는 숫자만 세고, 나머지도 조각 안에서만 본다.
**화면에 이어 붙은 글**을 읽어야 보인다(`feedback_new_text_needs_a_reader`).

무엇을 보나 — JSX 안에서 **공백만 사이에 둔 채 줄줄이 붙은** 조각들을 이어 붙이고,
경계를 넘어 **같은 짧은 토막이 곧바로 되풀이되는지**만 본다(`K K` 모양).

⚠️ **아주 좁게 본다.** 일부러 되풀이하는 글(「하나, 하나」)과 섞이지 않게,
   토막이 **1~3글자이고 한글이 아닐 때**만 신고한다 — 변수 이름(`K`·`N`·`dx`)이 그 모양이다.
⚠️ **0건이 결백이 아니다.** 이어 붙이기는 「공백만 사이에 둔」 이웃만 본다 —
   `{cond && <X/>}` 처럼 조건이 끼면 못 잇는다. 그리고 **「빠진 글자」는 원리상 못 본다**
   (되풀이만 본다). 화면도 눈으로 봐라.
"""
import glob
import io
import os
import re
import sys

# `{t(E, "영어", "한국어")}` — 따옴표 안의 이스케이프까지 받는다
T_CALL = re.compile(
    r'\{\s*t\(\s*E\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)\s*\}'
)
# `<b …>글자</b>` · `<span …>글자</span>` — 안에 태그가 더 없는 것만
TAG_TEXT = re.compile(r'<(b|span|code|strong)\b[^>]*>([^<>{}]*)</\1>')
# `<b …>{t(E,"a","b")}</b>`
TAG_T = re.compile(
    r'<(b|span|code|strong)\b[^>]*>\s*\{\s*t\(\s*E\s*,\s*"((?:[^"\\]|\\.)*)"\s*,'
    r'\s*"((?:[^"\\]|\\.)*)"\s*\)\s*\}\s*</\1>'
)


def pieces(src):
    """(시작위치, 끝위치, 영어, 한국어) 를 **소스에 나온 순서대로**."""
    out = []
    for m in TAG_T.finditer(src):
        out.append((m.start(), m.end(), m.group(2), m.group(3)))
    for m in TAG_TEXT.finditer(src):
        if any(a <= m.start() < b for a, b, _, _ in out):
            continue
        out.append((m.start(), m.end(), m.group(2), m.group(2)))
    for m in T_CALL.finditer(src):
        if any(a <= m.start() < b for a, b, _, _ in out):
            continue
        out.append((m.start(), m.end(), m.group(1), m.group(2)))
    out.sort()
    return out


def runs(src):
    """사이에 **공백·줄바꿈만** 있는 조각들을 한 묶음으로."""
    ps, cur, out = pieces(src), [], []
    for p in ps:
        if cur and src[cur[-1][1]:p[0]].strip() == "":
            cur.append(p)
        else:
            if len(cur) > 1:
                out.append(cur)
            cur = [p]
    if len(cur) > 1:
        out.append(cur)
    return out


# 「K K」 — **글자로 시작하는** 1~3글자 토막이 곧바로 되풀이된 자리
# ⛔ **숫자는 뺐다.** 넣고 전수로 재니 10곳이 나왔는데 **10곳 전부 오탐**이었다 —
#   `1 1 1 3`(swaptowin 출력 예시) · `3 3`(sumk 배열) · `2 1 1`(permutation 힌트)
#   처럼 **샘플 입출력의 숫자가 되풀이되는 건 정상**이다.
#   오탐이 많은 검사기는 사람이 안 읽게 되므로 없는 것보다 나쁘다.
DUP = re.compile(r'(?<![0-9A-Za-z_])([A-Za-z][A-Za-z0-9_]{0,2})\s+\1(?![0-9A-Za-z_])')


def line_of(src, pos):
    return src.count("\n", 0, pos) + 1


SELFTEST = '''
                <div>
                  {t(E, "Add a constant ", "모든 수에 상수 ")}
                  <b style={{ color: "#dc2626" }}>K</b>
                  {t(E, " to EVERY number.", " K 를 더해요.")}
                </div>
'''


def selftest():
    """⭐ **잣대가 살아 있나부터 봐라.** 여기서 🚨 가 안 나오면 검사기가 죽은 것이다.

    실제로 만들면서 **한 번 속았다** — 전수 0건을 보고 「깨끗하다」고 할 뻔했는데,
    고치기 **전** 커밋으로 돌려 보니 그때는 제대로 1건을 잡았다. 전수 0건이 맞았던 것이다.
    그 확인이 없었으면 **죽은 잣대를 들고 0건을 자랑**할 뻔했다."""
    found = []
    for run in runs(SELFTEST):
        joined = "".join(p[3] for p in run)
        found += [m.group(0) for m in DUP.finditer(joined)]
    ok = "K K" in found
    print("⭐ 자가시험 — 일부러 겹치게 만든 글을 넣는다")
    print(f"   이어 붙인 결과에서 찾은 것: {found or '없음'}")
    print("   " + ("✅ 잣대가 살아 있다." if ok else "🚨 **잣대가 죽었다** — 고치기 전엔 결과를 믿지 마라."))
    return 0 if ok else 1


def main(argv):
    if "--selftest" in argv:
        return selftest()
    args = [x for a in argv[1:] if not a.startswith("-") for x in a.split()]
    want = set(args) if args else None
    files = sorted(glob.glob("quest-problems/*/*.jsx"))
    hits = {}
    for f in files:
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for run in runs(src):
            for lang, idx in (("한국어", 3), ("영어", 2)):
                joined = "".join(p[idx] for p in run)
                for m in DUP.finditer(joined):
                    hits.setdefault(quest, []).append(
                        (os.path.basename(f), line_of(src, run[0][0]), lang,
                         m.group(1), joined.strip()[:90])
                    )
    total = sum(len(v) for v in hits.values())
    print(f"이어 붙이면 낱말이 겹치는 자리 — {total}곳 · quest {len(hits)}개"
          + (f" (quest={' '.join(sorted(want))})" if want else ""))
    for q in sorted(hits):
        print(f"\n  ■ {q}")
        for fn, ln, lang, tok, text in hits[q]:
            print(f"      {fn}:{ln}  [{lang}] 「{tok}」 가 두 번 — {text}")
    print("""
⚠️ **판정이 아니라 볼 자리 표시다.** 일부러 되풀이하는 글이 있을 수 있다 — 화면을 열어 봐라.
⚠️ **0건이 결백이 아니다** — 「공백만 사이에 둔」 이웃만 잇는다(`{cond && …}` 가 끼면 못 잇는다).
   그리고 **「빠진 글자」는 원리상 못 본다** — 되풀이만 본다.
근거: 2026-10-01 `mcc20missing` 의 「상수 **K K** 를 더해요」 — **학생이 화면을 읽고 찾았다.**
      그날 같은 뿌리로 `makedistinct` 의 `K ≠ 0` 뜻풀이도 샜다.""")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
