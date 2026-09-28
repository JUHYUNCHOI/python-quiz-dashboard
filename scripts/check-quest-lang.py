#!/usr/bin/env python3
"""quest 의 `t(E, 영어, 한국어)` 에서 영어 자리가 실제로 한국어인 곳을 찾는다.

왜 있나 (2026-09-07):
  student-algorithm 이 moohunt 를 영어로 풀다가 "마지막 단계만 갑자기 한국어" 라고 했다.
  열어보니 `t(E, ...)` 의 두 인자가 **글자까지 똑같은 한국어**였다 — 복붙 사고다.
  두 줄이 나란히 있으면 눈으로는 안 보인다.

⚠️ 왜 이렇게 좁게 보나:
  처음엔 "첫 인자에 한글이 있으면 잡기" 로 만들었는데 60곳이 나왔고 대부분 헛 경보였다.
  JSX 안의 `<` `>` 때문에 인자 경계가 밀려서 한국어 쪽까지 같이 잡힌 것이다.
  **헛 경보가 남으면 아무도 이 검사기를 안 본다.** 그래서 확실한 신호 둘만 본다:
    ① 두 인자가 글자까지 동일 (복붙)
    ② 영어 자리에 알파벳이 하나도 없고 한글만 있음
  이 둘은 오탐이 날 수 없다.
"""
import re, io, glob, sys

HANGUL = re.compile(r"[가-힣]")
ALPHA  = re.compile(r"[A-Za-z]")

def args_of(s, i):
    """t(E, 뒤에서 두 인자를 대충 떼어낸다. 실패하면 None — 억지로 추측하지 않는다."""
    depth, j, n, quote = 0, i, len(s), None
    parts, start = [], i
    while j < n and len(parts) < 2:
        c = s[j]
        if quote:
            if c == "\\": j += 2; continue
            if c == quote: quote = None
        elif c in "\"'`": quote = c
        elif c in "([{": depth += 1
        elif c in ")]}":
            if depth == 0 and c == ")":
                parts.append(s[start:j]); break
            depth -= 1
        elif c == "," and depth == 0:
            parts.append(s[start:j]); start = j + 1
        j += 1
    return parts if len(parts) == 2 else None

BLOCK_COMMENT = re.compile(r"/\*.*?\*/", re.S)


def blank_block_comments(src):
    """`/* … */` 를 **같은 길이의 공백**으로 바꾼다 — 줄 번호가 안 밀리게.

    ⚠️ 2026-09-28: 이걸 안 해서 **4건이 전부 헛경보**였다.
       `t(E,` 바로 뒤에 설명 주석을 다는 게 이 저장소의 손버릇이다 —
           narr: t(E,
             /* 2026-09-17: 원래 여기 다섯 줄이 문제 설명 전부를 미리 말했다. */
             "Deal the cards so player 1 beats player 2 …",
       인자 파서가 그 주석을 **영어 자리의 값**으로 읽어서
       「영어 자리에 알파벳이 없다」고 신고했다. 실제 영어는 멀쩡하다.
    ⚠️ `//` 줄 주석은 **일부러 안 지운다** — 문자열 안의 `http://` 를 잘라
       멀쩡한 값을 망가뜨릴 수 있다. 여기서 난 4건은 전부 블록 주석이었다.
    """
    return BLOCK_COMMENT.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), src)


bad = []
for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    s = blank_block_comments(io.open(f, encoding="utf-8").read())
    for m in re.finditer(r"\bt\(\s*E\s*,", s):
        a = args_of(s, m.end())
        if not a: continue
        en, ko = " ".join(a[0].split()), " ".join(a[1].split())
        line = s[:m.start()].count("\n") + 1
        if en and en == ko and HANGUL.search(en):
            bad.append((f, line, "두 자리가 글자까지 같다 (복붙)", en[:70]))
        elif HANGUL.search(en) and not ALPHA.search(en):
            bad.append((f, line, "영어 자리에 알파벳이 없다", en[:70]))
        elif HANGUL.match(en.lstrip("\"'`")[:1] or "x"):
            # 2026-09-08 에 추가. 위 두 규칙을 **둘 다 빠져나간** 사고가 있었다:
            #   t(E, "앞에서처럼 a+b 가 큰 쌍부터 …", "앞에서처럼 …")
            # 한국어 문장에 "a+b" 가 들어 있어서 ALPHA 검사를 통과했고,
            # 한국어 쪽과 글자가 완전히 같지도 않아서 복붙 검사도 통과했다.
            # 그래서 "영어 자리가 **한글로 시작**하면" 을 따로 본다.
            # ⚠️ "en 에 한글이 섞였으면" 으로 넓히면 저장소 전체에서 41건이 뜨는데
            #    거의 전부 JSX 안의 `<` `>` 때문에 인자 경계가 밀린 헛경보다.
            #    헛경보 41줄이면 아무도 이 검사기를 안 본다. 좁게 잡는다 (지금 0건).
            bad.append((f, line, "영어 자리가 한글로 시작한다", en[:70]))

for f, ln, why, t in bad:
    print(f"🚨 {f}:{ln}  — {why}\n     {t}…")
print(f"\n영어 자리가 한국어인 곳: {len(bad)}곳")
sys.exit(1 if bad else 0)
