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

  python3 scripts/check-unused-lang-param.py              # 전체
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


if __name__ == "__main__":
    main()
