#!/usr/bin/env python3
"""quest 가 **자체 코드 컴포넌트에 lang 을 못 받아서** Py/C++ 토글이 안 먹나
(판정 아님 — 볼 자리 표시).

왜 생겼나 (2026-09-23): 학생이 `Py`/`C++` 토글을 눌렀는데 **버튼만 바뀌고
코드는 계속 파이썬 그대로**였다. 원인: 토글은 `app/quest/[problemId]/client.tsx`
한 곳에서 quest 180개 공용으로 그리는데, 숨기는 조건이 `section !== "MCC"`
뿐이라 — **그 quest 가 진짜 lang 을 받아 코드를 바꿀 수 있는지는 안 봤다.**

실제로 걸린 7개(`cowcollege`·`cowgym`·`daisychains`·`mixmilk`·`shellgame`·
`whereami`·`wordproc`) 는 전부 같은 모양이었다 — `chapters.jsx` 안에
**자체 `const CodeSnippet = ({ lines, ... }) => ...` 를 새로 정의**해서
파이썬 코드를 문자열 배열로 박아 넣었고, 이 컴포넌트는 `lang` 을
props 로 받지도 않는다. `@/components/quest/CodeWalk`·`ProgressiveCodeStepper`
같은 **공용 컴포넌트**(둘 다 lang 을 받아 py/cpp 를 실제로 바꾼다)를
안 쓴 quest 가 이 구멍에 빠진다.

⚠️ 처음엔 "`lang` 파라미터를 받고 함수 본문에서 안 쓴다" 로 잡으려 했는데
   **137개·quest 137개** 가 걸려서 못 썼다 — 대부분은 `make*Ch2(E, lang="py")`
   처럼 파라미터는 받되, 실제 lang 전달은 **렌더링 쪽(`<XxxProgressiveCode
   lang={codeLang} .../>`)에서 따로** 하는 정상 패턴이었다(예: `abcs`).
   그래서 **"함수가 lang 을 쓰나" 가 아니라 "코드를 그리는 컴포넌트 자체가
   lang 을 받을 수 있나"** 로 기준을 바꿨다.

무엇을 보나 — `quest-problems/*/chapters.jsx` 에서 최상위
`const 이름 = ({ 구조분해 props }) => ...` 형태로 **직접 정의된** 코드
컴포넌트(`CodeSnippet`·`CodeBlock`·`CodeBox`)를 찾아, 그 props 목록에
`lang` 이 있는지 본다. 없으면 그 컴포넌트로 그리는 화면은 **토글을 눌러도
안 바뀐다.**

⚠️ 이 검사기의 한계 — **0건이 결백은 아니다**:
  - 컴포넌트 **이름**을 셋만 안다(`CodeSnippet`·`CodeBlock`·`CodeBox`).
    다른 이름으로 지으면 못 본다.
  - `lang` 을 props 로 **받기만** 하고 본문에서 실제로 `cpp` 분기를 안 타도
    통과시킨다 — "받나" 만 보지 "제대로 쓰나" 는 사람이 봐야 한다.
  - `components.jsx`·`sims.jsx` 에 정의된 코드 컴포넌트는 안 본다
    (실측: 이 패턴은 전부 `chapters.jsx` 에 있었다).
  - section === "MCC" 인 quest 는 애초에 화면에서 토글 자체가 없으니
    **이미 안전**하다 — 별도로 표시만 하고 "고쳐야 할 것"에선 뺀다.

──────────────────────────────────────────────────────────────────────────
2번째 구멍 (2026-09-23, `cowsignal` 학생 검증) — **컴포넌트 자체가 없는 경우**.

`cowsignal` 은 위 검사기가 0건이라고 했는데, 학생은 "코드 들여쓰기가 다
사라졌다", "C++ 토글을 눌러도 계속 파이썬" 을 둘 다 보고했다. 원인은
`LOCAL_COMPONENT` 가 못 보는 세 번째 모양이었다 — `chapters.jsx` 가
**컴포넌트를 정의하지도 않고**, `<div>`/`<span>` 을 스텝 하나하나마다
**손으로 색칠해 쌓았다.** JSX 는 텍스트 노드 앞 공백을 지우므로 들여쓰기가
사라지고, `lang` 을 받을 자리 자체가 없으니 토글도 안 먹는다.

무엇을 보나 (아래 `find_raw_code_blocks`) — 파일 단위로:
  ① `JetBrains Mono`/`monospace` 가 있고 (코드처럼 보이려고 스타일을 줬다)
  ② `<span style={{ color: "#…"` 또는 `<div style={{ color: "#…"` 손칠한
     줄이 **6개 이상** (하나 색칠하는 건 강조지, 코드 하이라이팅이 아니다)
  ③ 실제 코드 문법(`range(`·`cin >>`·`cout <<`·`#include`·`for (`·`def `·
     `print(`·`while (`·`return` …)이 **2개 이상**
     (②만 보면 X/. 격자 같은 **데이터 시각화**를 코드로 오인한다 —
     실측으로 뺀 예: `mcc20kitty`·`mco15secret`·`magicorbs` 는 spans 는
     많지만 코드 문법이 0개였다. 그림이지 코드가 아니었다.)
  ④ 파일 어디에도 `CodeBlock`/`CodeWalk`/`ProgressiveCodeStepper`/
     `CodeSnippet`/`CodeBox` 를 안 쓴다 — 하나라도 쓰면 **그 파일 전체를
     거른다**(부분적으로만 고쳐진 파일은 이 검사기가 못 가른다. 아래 참고).

⚠️ 이 두 번째 검사기의 한계 — **더 크다, 눈으로 반드시 확인해라**:
  - **파일 단위**라 스텝 단위가 아니다. 한 파일에 손칠한 코드와 정상
    `CodeBlock` 사용이 **섞여 있으면 전체가 안전한 것으로 빠진다**
    (④의 "하나라도 쓰면 전체를 거른다" 때문). `cowsignal` 을 고친 지금이
    그 예다 — 새로 CodeBlock 을 쓰니 이 파일 자체는 이제 안 걸린다.
  - **색칠한 코드가 실제로는 "언어 비교용으로 나란히 보여주는 것"** 일 수도
    있다(예: `moo` 는 `cout`/`print` 두 언어를 한 화면에 같이 보여주는
    설명 패널일 수 있다) — 이건 버그가 아닐 수 있다. **숫자만 보고 고치지
    말고, 실제로 열어서 "토글이 있는데 안 먹는지" 눈으로 봐라.**
  - 임계값(spans≥6, 코드문법≥2)은 cowsignal 실측(spans 다수·문법 4+)에
    맞춘 것이라, 더 작은 코드 조각은 못 잡는다.

  python3 scripts/check-unused-lang-param.py              # 전체 (두 검사 다)
  python3 scripts/check-unused-lang-param.py cowgym       # quest 골라서
"""
import glob
import io
import re
import sys

LOCAL_COMPONENT = re.compile(
    r"^const\s+(CodeSnippet|CodeBlock|CodeBox)\s*=\s*\(\s*\{\s*([^}]*)\}",
    re.MULTILINE,
)

KNOWN_CODE_COMPONENTS = re.compile(
    r"\b(CodeBlock|CodeWalk|ProgressiveCodeStepper|CodeSnippet|CodeBox)\b"
)
MONO_MARK = re.compile(r"JetBrains Mono|monospace")
HAND_COLORED_LINE = re.compile(r'<(?:span|div)\s+style=\{\{\s*color:\s*"#')
RAW_CODE_SYNTAX = re.compile(
    r"\brange\(|cin\s*>>|cout\s*<<|#include|int\s+main|for\s*\(|for \w+ in |"
    r"for _ in |\bdef \w+\(|\bprint\(|\bwhile\s*\(|with open\("
    # ⚠️ 2026-09-23: `\breturn\b` 을 여기서 뺐다 — JS 컴포넌트 본문의 `return (<div>...)`
    # 까지 "코드 문법" 으로 세서 오탐의 절반 이상을 만들었다(hps17·oddphotos·
    # bovgenomics·acowdemia3·outofplace 등). def/print/range/for-in/cin/cout 같은
    # 더 구체적인 신호로도 실제 코드 블록은 충분히 잡힌다.
    # `with open(` 을 대신 추가했다 — USACO 파일 I/O quest(sqpasture·billboard)의
    # 실제 버그는 `return` 없이 이 토큰 하나로만 코드 문법 2개 문턱을 넘겼었다.
    # `with open(` 을 빼버리면 그 두 quest 의 수정 전 버전조차 안 걸린다(실측 확인).
)


def find_raw_code_blocks(files, want):
    """컴포넌트 없이 손으로 쌓은, lang 을 받을 자리 자체가 없는 코드 블록."""
    hits = []
    for f in files:
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        if KNOWN_CODE_COMPONENTS.search(src):
            continue  # 하나라도 쓰면 전체를 거른다 (위 한계 참고)
        mono_n = len(MONO_MARK.findall(src))
        span_n = len(HAND_COLORED_LINE.findall(src))
        code_n = len(RAW_CODE_SYNTAX.findall(src))
        if mono_n >= 1 and span_n >= 6 and code_n >= 2:
            hits.append((quest, span_n, code_n))
    return hits


def load_meta():
    """id -> {section, pythonOnly} — app/quest/[problemId]/data.ts 에서."""
    path = "app/quest/[problemId]/data.ts"
    src = io.open(path, encoding="utf-8").read()
    meta = {}
    for m in re.finditer(r"\{id:\"([^\"]+)\"[^}]*\}", src):
        row = m.group(0)
        qid = m.group(1)
        section_m = re.search(r'section:"([^"]*)"', row)
        meta[qid] = {
            "section": section_m.group(1) if section_m else None,
            "pythonOnly": "pythonOnly:true" in row.replace(" ", ""),
        }
    return meta


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    args = [x for a in raw for x in a.split()]
    want = set(args) if args else None

    meta = load_meta()
    files = sorted(glob.glob("quest-problems/*/chapters.jsx"))
    hits = []  # (quest, 컴포넌트명, props)
    for f in files:
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in LOCAL_COMPONENT.finditer(src):
            name, props = m.group(1), m.group(2)
            prop_names = [p.strip().split(":")[0].strip() for p in props.split(",")]
            if "lang" in prop_names:
                continue
            hits.append((quest, name, props.strip()))

    still_exposed = []  # 토글이 아직 안 숨겨진 것 (진짜 문제)
    already_safe = []   # MCC 라 애초에 토글이 없거나, pythonOnly 로 이미 숨김
    for quest, name, props in hits:
        info = meta.get(quest, {})
        if info.get("section") == "MCC" or info.get("pythonOnly"):
            already_safe.append((quest, name, props, info))
        else:
            still_exposed.append((quest, name, props, info))

    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"lang 을 못 받는 자체 코드 컴포넌트 {len(hits)}개{scope}")
    print(f"  → 토글이 아직 노출된 것: {len(still_exposed)}개")
    print(f"  → 이미 안전(MCC 숨김·pythonOnly): {len(already_safe)}개\n")

    if still_exposed:
        print("  ⚠️ 아래는 토글을 눌러도 코드가 안 바뀐다. data.ts 에")
        print("     pythonOnly:true 를 붙이거나(임시) 진짜 lang 지원을 추가하세요.\n")
        for quest, name, props, info in sorted(still_exposed):
            print(f"  ■ {quest}  ({name} props: {props})  section={info.get('section')}")
        print()

    if already_safe and (want or "--all" in sys.argv):
        print("  ── 이미 안전(참고용):")
        for quest, name, props, info in sorted(already_safe):
            why = "MCC(토글 자체 없음)" if info.get("section") == "MCC" else "pythonOnly"
            print(f"  · {quest}  ({why})")

    raw_hits = find_raw_code_blocks(files, want)
    print(f"\n컴포넌트 없이 손으로 쌓은 코드 블록(lang 받을 자리 자체가 없음) {len(raw_hits)}개{scope}")
    print("  (판정 아님 — 눈으로 열어서 진짜 토글 없이 방치된 코드인지 확인해라)\n")
    for quest, span_n, code_n in sorted(raw_hits):
        info = meta.get(quest, {})
        safe = info.get("section") == "MCC" or info.get("pythonOnly")
        tag = "  (이미 안전: MCC·pythonOnly)" if safe else ""
        print(f"  ■ {quest}  (색칠한 줄 {span_n}개, 코드 문법 {code_n}개){tag}")


if __name__ == "__main__":
    main()
