#!/usr/bin/env python3
"""화면 글자에 **마크다운 굵게**(`**`)를 썼나 — JSX 는 그걸 **해석하지 않는다.**

  python3 scripts/check-jsx-markdown.py            # 전수
  python3 scripts/check-jsx-markdown.py strangefn balanced

──────────────────────────────────────────────────────────────────────────
왜 생겼나 (2026-09-28)

`swaptowin` 재검증 학생(초6)이 잡았다:
  *"화면에 실제로 이렇게 보인다 — 「두 줄끼리는 **같은 번호 칸끼리만** 바꿀 수 있으니」.
    굵게 처리가 안 되고 **별표 두 개가 그대로 글자로** 나온다.
    처음 보는 기호라 「이게 뭐지?」 했다."*

내가 바로 그 문장을 **그날 새로 쓰면서** 넣은 것이다. 그리고 훑어보니
**같은 실수를 세 군데**(`swaptowin`·`balanced`·`makedistinct`) 했다 —
전부 그날 새로 쓴 글이다.

⚠️ **이건 그날 이미 한 번 배운 것이다.** 세션 앞부분에서도 같은 사고가 났고
「`<b>` 로 고쳤다」고 적어 뒀는데, **검사 항목이 아니어서** 몇 시간 뒤 또 했다.
`feedback_fix_all_at_once_not_one_by_one` 의 그 모양 — **규칙은 있었고 검사기가 없었다.**

⚠️ **빌드도 타입 검사도 `see-screen` 도 못 잡는다** — 문법은 정상이고 글자가 겹치지도
   넘치지도 않는다. **뜻만 틀렸다.** `check-jsx-raw-escape.py` 와 같은 층이다.

고치는 법 — 굵게 하고 싶으면 **JSX 태그**를 쓴다:
    ❌ t(E, "...", "두 줄끼리는 **같은 칸**끼리만…")
    ⭕ <b>같은 칸</b> 으로 쪼개거나, 강조가 꼭 필요 없으면 「낫표」로
⚠️ **0건이 결백이 아니다** — `*기울임*`·`__밑줄__`·백틱은 안 본다(오탐이 커서 뺐다).
──────────────────────────────────────────────────────────────────────────
"""
import glob
import io
import re
import sys

# 파이썬 거듭제곱(`10**9`)·곱셈은 코드라 정상이다
CODEY = re.compile(r"\d\s*\*\*\s*\d|\*\*kwargs|\*\*\{")
BOLD = re.compile(r"\*\*[^*\n]{1,60}\*\*")
STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
# ⚠️ 2026-09-29: **백틱 템플릿 문자열을 원리상 못 보고 있었다.**
#   `mcc20knight` 시뮬을 만들며 `` `… **줄에 넣지 않아요.** …` `` 라고 썼는데
#   이 검사기가 **0건**으로 통과시켰다(큰따옴표만 봤다). 시뮬 말풍선은 좌표·숫자를
#   끼워 넣느라 **템플릿 문자열을 많이 쓴다** — 그 층이 통째로 사각지대였다.
#   ⚠️ `${...}` 안은 **코드**라 `a ** b`(거듭제곱)가 정상이다. 그 자리는 지운 뒤 본다.
def _strings(src):
    """큰따옴표 **와** 백틱 문자열을 모두 돌려준다.
    백틱 안의 `${...}` 는 코드라 지우고 본다(`10 ** 9` 같은 거듭제곱이 정상이다)."""
    for mm in STR.finditer(src):
        yield mm
    for mm in TMPL.finditer(src):
        body = re.sub(r"\$\{[^}]*\}", " ", mm.group(1))
        yield _Fake(body, mm.start())


class _Fake:
    def __init__(self, text, pos):
        self._t, self._p = text, pos
    def group(self, n=0):
        return self._t
    def start(self):
        return self._p


TMPL = re.compile(r"`((?:[^`\\]|\\.)*)`", re.S)


def main():
    want = set(a for arg in sys.argv[1:] for a in arg.split()) or None
    hits = {}
    for f in sorted(glob.glob("quest-problems/*/*.jsx") + glob.glob("components/quest/*.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        in_block = False
        for i, line in enumerate(io.open(f, encoding="utf-8", errors="replace").read().split("\n"), 1):
            t = line.strip()
            # 여기서 한 번 조용히 틀렸다 — 주석 «첫 줄» 만 보고 걸렀더니
            #    여러 줄 주석의 «가운데 줄»(`*` 로 안 시작하는 줄)이 통과해
            #    전수 30곳 중 태반이 오탐이었다. 상태로 따라간다.
            if in_block:
                if "*/" in line:
                    in_block = False
                continue
            if (t.startswith("/*") or t.startswith("{/*")) and "*/" not in t:
                in_block = True
                continue
            # 우리끼리 보는 주석은 뺀다 — 거긴 마크다운을 써도 된다
            if t.startswith(("//", "*", "/*", "{/*")):
                continue
            for m in _strings(line):
                body = m.group(1)
                if CODEY.search(body) or not BOLD.search(body):
                    continue
                hits.setdefault(quest, []).append((f.split("/")[-1], i, BOLD.search(body).group(0)[:40]))

    n = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"화면 글자에 마크다운 `**` — {n}곳 · quest {len(hits)}개{scope}")
    print("   JSX 는 `**` 를 **해석하지 않는다** — 별표가 글자 그대로 화면에 찍힌다.\n")
    for q in sorted(hits, key=lambda x: (-len(hits[x]), x)):
        print(f"  ■ {q}")
        for fn, ln, frag in hits[q][:4]:
            print(f"      {fn}:{ln}  «{frag}»")
        if len(hits[q]) > 4:
            print(f"      … {len(hits[q]) - 4}곳 더")

    print("""
고치는 법 — 굵게 하려면 **JSX 태그**를 써라:
    ❌ t(E, "...", "두 줄끼리는 **같은 칸**끼리만…")
    ⭕ <b>같은 칸</b> 으로 쪼개거나, 꼭 강조가 필요 없으면 「낫표」로

⚠️ **빌드도 타입 검사도 `see-screen` 도 못 잡는다** — 문법은 정상이고 글자도 안 깨진다.
   **뜻만 틀렸다.** `check-jsx-raw-escape.py` 와 같은 층이다.
⚠️ 0건이 결백이 아니다 — `*기울임*`·`__밑줄__` 은 안 본다(오탐이 커서 뺐다).
근거: 2026-09-28 `swaptowin` 재검증 학생이 찾았다. 같은 날 세 군데에 같은 실수를 했다.""")
    sys.exit(1 if n else 0)


if __name__ == "__main__":
    main()
