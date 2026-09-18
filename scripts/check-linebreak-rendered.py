#!/usr/bin/env python3
"""글쓴이가 넣은 줄바꿈이 **화면에 실제로 나오나.**

왜 (2026-09-18): quest 108개의 코드 설명을 절 단위로 접어 놨는데,
**그 줄바꿈이 두 컴포넌트에서는 하나도 안 나오고 있었다.** 세 문장이 한 문단으로
뭉쳐 보였다 — 선생님이 말씀하신 *"글밥이 너무 많아서 읽기 힘들어"* 의 원인 하나다.

⚠️ **같은 버그를 2026-09-17 에 한 번 고쳤다.** 그때 `ProgressiveCodeStepper` 의
   `why` 줄만 고치고 **같은 모양이 어디 더 있는지 안 물었다.** 그래서 세 자리가
   남았다 — `CodeSectionView` 의 why·전용 노트, 스테퍼의 전용 노트.
   오늘 검사기에서 겪은 것과 똑같은 실패다 (`beats:` 만 보고 `why:` 를 못 봤다).

   **고칠 때마다 물어라 — 같은 일을 하는 자리가 이 저장소에 하나 더 있나.**
   그 질문을 기계로 만든 것이 이 파일이다.

무엇을 보나 — quest 화면 컴포넌트에서 **사람 글 한 줄을 그리는 자리**를 찾아,
그 자리에 `pre-line`(또는 `pre-wrap`)이 걸려 있나 본다. 없으면 `\n` 은 공백이 된다.

  python3 scripts/check-linebreak-rendered.py

⚠️ 판정이 아니라 **볼 자리 표시**다. 값·코드를 그리는 자리는 `pre-line` 이 없어도 된다.
   걸린 자리가 **사람이 읽는 글**인지 눈으로 확인해라.
"""
import glob
import io
import os
import re
import sys

# 사람 글이 담기는 이름들 — 이 배열을 map 으로 펼쳐 그리는 자리를 본다
# ⚠️ 이름을 넓게 잡으면 **코드 줄을 그리는 자리**까지 걸린다
#    (`codeLines` · `CODE_LINES` · `previewLines`). 그건 `pre-line` 이 없어도 맞다.
#    그래서 사람 글만 담는 이름으로 좁혔다.
PROSE = ("why", "bubble", "narr", "explain", "hint",
         "langSpecific", "pyOnly", "cppOnly")

ELEM = re.compile(
    r'<(span|div|p)\b([^>]*?)>\s*\{\s*([A-Za-z_$][\w$]*)\s*\}\s*</\1>', re.S)
HAS_BREAK = re.compile(r'pre-line|pre-wrap|whiteSpace')


def main():
    roots = sys.argv[1:] or ["components/quest"]
    files = []
    for r in roots:
        files += glob.glob(os.path.join(r, "**", "*.tsx"), recursive=True)
        files += glob.glob(os.path.join(r, "**", "*.jsx"), recursive=True)

    hits = []
    for f in sorted(set(files)):
        src = io.open(f, encoding="utf-8", errors="replace").read()
        # JSX 주석 안의 예시 코드가 걸리지 않게 지운다 — 내 주석이 스스로 걸렸다
        src = re.sub(r"\{\s*/\*.*?\*/\s*\}", lambda m: " " * len(m.group(0)), src, flags=re.S)
        for m in ELEM.finditer(src):
            attrs, var = m.group(2), m.group(3)
            if HAS_BREAK.search(attrs):
                continue
            head = src[max(0, m.start() - 900):m.start()]
            # 이 변수가 어떤 배열을 map 으로 펼친 것인가
            src_arrays = re.findall(
                r'\{?\s*([A-Za-z_$][\w$]*)\s*\.map\(\s*\(?\s*%s\b' % re.escape(var), head)
            if not src_arrays:
                continue
            arr = src_arrays[-1]
            if not any(p.lower() in arr.lower() for p in PROSE):
                continue
            ln = src.count("\n", 0, m.start()) + 1
            hits.append((f, ln, arr, var))

    print(f"줄바꿈이 화면에 안 나올 수 있는 자리 — {len(hits)}곳\n")
    for f, ln, arr, var in hits:
        print(f"  {f}:{ln}   {arr}.map(({var}) => …)  ← `pre-line` 이 없다")
    if not hits:
        print("  0곳.\n")
    print("\n⚠️ 판정이 아니라 **볼 자리 표시**다. 값·코드를 그리는 자리는 없어도 된다.")
    print("   고치는 법: 그 <span> 에 다음을 얹는다 —")
    print('   style={{ whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}')
    print("   근거: memory/feedback_korean_linebreak.md")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
