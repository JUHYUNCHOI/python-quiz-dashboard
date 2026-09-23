#!/usr/bin/env python3
"""화면이 **코드로 가르친** 함수를 🔒 최종 코드가 실제로 쓰나.

왜 (2026-09-23): `billboard` 를 손으로 셌다.

  🔒 FULL_PY / FULL_CPP 안의 max( · min(  →  0번
  chapters.jsx 안의       max( · min(  →  33번

`chapters.jsx` 3장 "⚡ 코드 빌드" 가 학생에게 이 코드를 **그대로 보여준다** —

    def rect_area(x1, y1, x2, y2):
        return max(0, x2-x1) * max(0, y2-y1)

narr 는 "Let's build the code step by step!" 다. 그런데 진짜 최종 코드
(`FULL_PY`/`FULL_CPP`)는 `if w < 0: w = 0` 처럼 **if/else 로 짜여 있고
`max(`/`min(` 이 하나도 없다.** 학생은 `max`/`min` 으로 코드 만드는 법을
보고, 마지막 🔒 코드에서 `if`/`else` 를 만난다 — 아무도 그 차이를 설명 안 한다.

`check-boasted-function.py` 는 이 층을 못 본다 — 그건 *"…덕분에 짧아요"*
같은 **자랑 문장**만 본다. 여기는 자랑이 아니라 **명시적으로 코드를 보여주고
안 쓰는** 모양이다.

무엇을 보나 — "가르친 코드" 는 **두 모양**으로 나타난다.

  ① JSX 안에 **모노스페이스로 스타일된 `<div>`** 로 코드 글자가 그대로 있는 경우
     (fontFamily: 'JetBrains Mono' 류) — `mono_blocks()`.
  ② `<CodeBlock lines={[...]}/>` · `<CodeSnippet lines={[...]}/>` 처럼
     **자체 코드 래퍼 컴포넌트에 `lines=` 프롭으로 문자열 배열을 넘기는** 경우
     — `lines_prop_blocks()`. 이 저장소 quest 168개가 공유 `CodeBlock`
     (`components/quest/shared.tsx`)을, 12개가 자체 `CodeSnippet` 을 쓴다.
     ⚠️ **2026-09-23 에 이 ②를 처음 찾았다.** `mono_blocks()` 는 래퍼
     컴포넌트의 **정의부**(`{lines.map(...)}` 처럼 다 `{}` 안이라
     `strip_js_braces` 가 통째로 지운다)만 보고, 코드 글자가 실제로 있는
     **호출부**(`lines={[...]}`)는 안 봐서 `cowgym` 같은 quest 를
     "가르친 코드 0개" 로 잘못 읽었다. `lines={NAME}` 처럼 상수를
     참조하면 같은 quest 폴더 안의 `const NAME = [...]` 를 찾아 풀고,
     `lines={pick(A, B)}` 면 A·B 둘 다 푼다.
서술문(narr)에서 "max() 를 쓰면" 처럼 스치는 언급은 **일부러 뺐다** —
그건 코드가 아니라 설명이라 오탐이 크다(아래 "오탐 실측" 참고).

그 블록 안에서 WATCH 이름이 `이름(` 꼴로 쓰였으면 "가르쳤다" 로 세고,
🔒 `FULL_PY`+`FULL_CPP`(+`SEC*_PY`+`SEC*_CPP`) 를 합친 글 안에 그 이름이
`이름(` 꼴로 한 번도 없으면 판다.

⚠️ **판정이 아니라 볼 자리 표시다.** 가르친 방법을 일부러 버리고 더 나은
   방법으로 최종 코드를 짠 경우(예: 브루트에서 O(N²) 로 세다가 최종엔
   누적합으로 바꾼 경우)는 정상이다 — 그런 자리는 다리 문장 하나로 잇거나
   "이렇게도 되지만 이번엔 이 방법을 씁니다" 를 설명하면 된다.
   사람이 열어서 판단해라.

⚠️ **이 검사기가 못 보는 것 (2026-09-23 실측):**
   - **반대 방향** — 🔒 최종 코드가 쓰는데 화면 어디서도 안 가르친 것은
     **원리상** 못 본다(그 쪽이 훨씬 판정이 어렵다 — import·입출력
     상용구·변수 초기화처럼 "최종 코드에만 있는 게 정상" 인 경우가
     압도적으로 많다). `mcc20kitty` 검토에서 실제로 이 반대 방향
     결함(코드가 화면에 없는 `while` 조건·분기)이 나왔다 — 사람이
     읽어야 잡힌다.
   - `lines={someFn(...)}` 처럼 **`pick(A,B)` 가 아닌 다른 함수 호출**로
     넘기는 경우는 못 푼다(상수 참조가 아니면 통과).
   - narr·"왜" 박스·퀴즈 설명문 속의 코드 언급은 일부러 안 본다
     (설명문은 오탐이 커서 처음부터 범위 밖).
   - **0건이 결백은 아니다.** 이 파일이 아는 두 모양(모노 div·`lines=`
     프롭) 밖의 세 번째 모양이 있다면 여전히 못 본다.

  python3 scripts/check-taught-vs-final-code.py              # 전체
  python3 scripts/check-taught-vs-final-code.py billboard     # quest 골라서
"""
import glob
import io
import json
import re
import sys

# check-boasted-function.py 의 WATCH 를 그대로 쓴다 — list·dict·set 를 뺀 이유가
# 거기 적혀 있다("파이썬은 [...]·{...} 리터럴로 쓰기 때문에 호출이 없어도 쓰는
# 게 맞다"). 같은 이유로 여기서도 뺀다. len 도 뺐다 — 거의 모든 코드가 쓴다.
WATCH = ("sorted", "map", "filter", "zip", "enumerate", "reversed",
         "sum", "min", "max", "any", "all")

# 모노스페이스 코드 블록의 여는 태그. 'JetBrains Mono' 가 이 저장소의 표준이지만
# 혹시 다른 스펠링을 쓸까봐 mono 전체를 본다(대소문자 무시).
MONO_OPEN = re.compile(r"<div\b[^>]*fontFamily[^>]*mono[^>]*>", re.I)

# 진짜 "코드" 인지 거르는 신호 — 표/격자처럼 숫자만 mono 로 보여주는 블록은
# 뺀다(예: astral 격자 칸). 이 토큰이 하나도 없으면 코드 블록으로 안 본다.
CODE_HINT = re.compile(
    r"\bdef\b|\breturn\b|\bfor\b|\bif\b|\belse\b|\bwhile\b|\bimport\b|"
    r"\bint\b|\blong\b|\bvoid\b|\bclass\b|\bstruct\b|cin\s*>>|cout\s*<<|"
    r"#include|;\s*$", re.M)

TAG = re.compile(r"<[^>]+>")
STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
FINAL_ARRAY = re.compile(r"^const (\w+_PY|\w+_CPP) = \[\n(.*?)\n\];",
                          re.M | re.S)

# ② `lines={...}` 프롭으로 코드를 넘기는 래퍼 호출(CodeBlock·CodeSnippet…) 을 찾는다.
CONST_ARRAY = re.compile(r"^const (\w+) = \[\n(.*?)\n\];", re.M | re.S)
TAG_START = re.compile(r"<(\w+)\b")
LINES_PROP = re.compile(r"\blines\s*=\s*\{")
IDENT = re.compile(r"\b([A-Za-z_][A-Za-z0-9_]*)\b")


def mono_blocks(src):
    """모노스페이스로 스타일된 <div> 블록의 텍스트(태그 벗긴 것)를 모은다."""
    out = []
    for m in MONO_OPEN.finditer(src):
        i = m.end()
        depth = 1
        n = len(src)
        while i < n:
            o = src.find("<div", i)
            c = src.find("</div>", i)
            if c == -1:
                break
            if o != -1 and o < c:
                depth += 1
                i = o + 4
            else:
                depth -= 1
                i = c + 6
                if depth == 0:
                    out.append(src[m.end():c])
                    break
    return out


def strip_js_braces(text):
    """`{...}` 로 감싼 자리는 **화면 글자가 아니라 실행되는 JS** 다.

    `{lines.map((l, i) => ...)}` 는 코드 줄을 *그리는* React 식이지
    학생에게 보여주는 코드 글자가 아니다. 이걸 안 지우면 "이 quest 가
    map() 을 가르친다" 로 거짓 판정한다(실측: mixmilk·shellgame·whereami·
    uddered·palindrome·socialdist1/2·mco15badminton·mcc22grammar·mooin2·
    moolang 11개가 전부 이 모양으로 떴다 — 진짜 map( 을 하나도 안 가르친다).
    중첩 `{}` 도 통째로 지운다(문자열 안 중괄호는 못 가른다 — 이 repo
    JSX 스타일엔 드물다).
    """
    out = []
    depth = 0
    for ch in text:
        if ch == "{":
            depth += 1
            continue
        if ch == "}":
            if depth > 0:
                depth -= 1
            continue
        if depth == 0:
            out.append(ch)
    return "".join(out)


def const_arrays(src):
    """이 파일 안 top-level `const NAME = [ ... ];` 배열의 문자열 내용을 전부 모은다.

    `lines={SOLUTION_CODE}` 처럼 **이름으로 참조하는** 코드 배열을 풀려고 있다.
    `_PY`/`_CPP` 로 안 끝나도(예: `SOLUTION_CODE`, `BF_INPUT`) 잡는다 — 참조하는
    쪽에서 실제로 코드로 쓰이는지는 `lines_prop_blocks` 가 판단한다.
    """
    out = {}
    for m in CONST_ARRAY.finditer(src):
        name = m.group(1)
        texts = []
        for sm in STR.finditer(m.group(2)):
            try:
                texts.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                pass
        if texts:
            out[name] = "\n".join(texts)
    return out


def _tag_end(src, i):
    """`<Name` 다음 위치 i 에서, `{}` 깊이를 세며 태그를 닫는 `>` 뒤 위치를 찾는다.

    `{}` 로 감싸인 프롭 값(예: `lines={[...]}`) 안에 `>` 가 나와도(코드 비교
    연산자 등) 태그가 안 끝난 걸로 본다 — 문자열 인용부호는 안 본다(이 저장소
    JSX 스타일엔 태그 프롭 안에 따옴표 문자열 속 `>` 가 거의 없다).
    """
    depth = 0
    n = len(src)
    while i < n:
        ch = src[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        elif ch == ">" and depth <= 0:
            return i + 1
        i += 1
    return n


def _prop_value_span(src, i):
    """i 는 `lines={` 의 여는 `{` 바로 다음. 짝 맞는 `}` 앞까지 글을 돌려준다."""
    depth = 1
    start = i
    n = len(src)
    while i < n and depth > 0:
        ch = src[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        i += 1
    return src[start:i - 1]


def lines_prop_blocks(src, consts):
    """`<컴포넌트 ... lines={...} ...>` 호출에서 코드 글을 뽑는다.

    `lines={[...]}` 면 그 배열의 문자열을 바로 쓰고, `lines={NAME}` 이나
    `lines={pick(A, B)}` 처럼 **이름으로 참조**하면 `consts` 에서 그 이름의
    배열 글을 찾아 쓴다(`pick` 은 A·B 둘 다 — 언어 토글로 어느 쪽이든
    학생이 볼 수 있어서 둘 다 "가르친 것"으로 본다).
    """
    out = []
    for m in TAG_START.finditer(src):
        tag = src[m.end():_tag_end(src, m.end())]
        pm = LINES_PROP.search(tag)
        if not pm:
            continue
        expr = _prop_value_span(tag, pm.end()).strip()
        if expr.startswith("["):
            texts = []
            for sm in STR.finditer(expr):
                try:
                    texts.append(json.loads('"%s"' % sm.group(1)))
                except Exception:
                    pass
            if texts:
                out.append("\n".join(texts))
        else:
            for name in IDENT.findall(expr):
                if name in consts:
                    out.append(consts[name])
    return out


def code_calls(plain):
    """WATCH 이름이 '이름(' 꼴로 쓰였는지 — plain 은 이미 태그·중괄호를 벗긴 글."""
    found = set()
    for w in WATCH:
        if re.search(r"\b" + w + r"\s*\(", plain):
            found.add(w)
    return found


def final_code_text(src):
    """FULL_PY/FULL_CPP/SEC*_PY/SEC*_CPP 배열 안의 글만 모은다."""
    out = []
    for m in FINAL_ARRAY.finditer(src):
        body = m.group(2)
        for sm in STR.finditer(body):
            try:
                out.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                pass
    return "\n".join(out)


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in raw for x in a.split()) or None

    hits = {}          # quest -> {name: [(file, snippet), ...]}
    quests_with_final = 0
    quests_scanned = 0

    for d in sorted(glob.glob("quest-problems/*/")):
        quest = d.strip("/").split("/")[-1]
        if want and quest not in want:
            continue

        files = sorted(glob.glob(d + "*.jsx"))
        final_text = ""
        for f in files:
            final_text += final_code_text(
                io.open(f, encoding="utf-8", errors="replace").read())
        if not final_text:
            continue  # 최종 코드 배열이 없는 quest — 이 검사기가 못 본다
        quests_with_final += 1

        srcs = {f: io.open(f, encoding="utf-8", errors="replace").read()
                for f in files}

        # `lines={NAME}` 처럼 이름으로 참조하는 자리를 풀려면, quest 폴더 안
        # 모든 파일의 const 배열을 먼저 다 모아 둬야 한다(정의와 호출이
        # chapters.jsx/components.jsx 로 나뉘어 있는 경우가 있다).
        consts = {}
        for src in srcs.values():
            consts.update(const_arrays(src))

        taught = {}  # name -> (file, snippet)
        for f, src in srcs.items():
            blocks = list(mono_blocks(src))
            for block in blocks:
                plain = TAG.sub(" ", strip_js_braces(block))
                if not CODE_HINT.search(plain):
                    continue  # 코드처럼 안 생겼다 — 표/격자 등
                for name in code_calls(plain):
                    if name not in taught:
                        snippet = re.sub(r"\s+", " ", plain).strip()[:90]
                        taught[name] = (f.split("/")[-1], snippet)

            # ② `lines={...}` 프롭으로 넘기는 CodeBlock/CodeSnippet 호출부 —
            # 컴포넌트 정의부(mono_blocks)만 보면 `{lines.map(...)}` 가 다
            # `{}` 안이라 지워져서 놓친다(2026-09-23, cowgym 사고).
            for text in lines_prop_blocks(src, consts):
                if not CODE_HINT.search(text):
                    continue
                for name in code_calls(text):
                    if name not in taught:
                        snippet = re.sub(r"\s+", " ", text).strip()[:90]
                        taught[name] = (f.split("/")[-1], snippet)

        if not taught:
            continue
        quests_scanned += 1

        missing = {}
        for name, (fname, snippet) in taught.items():
            if not re.search(r"\b" + name + r"\s*\(", final_text):
                missing[name] = (fname, snippet)
        if missing:
            hits[quest] = missing

    total = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"화면 코드 블록이 **가르치는데** 🔒 최종 코드가 **안 쓰는** 이름 — "
          f"{total}건 · quest {len(hits)}개{scope}")
    print(f"(최종 코드 배열 있는 quest {quests_with_final}개 중, "
          f"코드 블록으로 뭔가 가르치는 quest {quests_scanned}개를 봤다)\n")

    for quest in sorted(hits):
        for name, (fname, snippet) in sorted(hits[quest].items()):
            print(f"  ■ {quest}/{fname} — 안 쓰는 이름: {name}(")
            print(f"      \"{snippet}\"\n")

    if total:
        print("  ⚠️ 판정이 아니다 — 일부러 더 나은 방법으로 갈아탄 자리일 수 있다.")
        print("  사람이 열어서: 진짜 안 이어지면 다리 문장 하나, 아니면 그냥 둔다.")
    print("\n⚠️ 모노스페이스 코드 블록 + `lines=` 프롭 호출만 본다. narr·설명문의 "
          "스치는 언급은 안 본다. 반대 방향(코드에만 있고 화면엔 없는 것)은 못 본다.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
