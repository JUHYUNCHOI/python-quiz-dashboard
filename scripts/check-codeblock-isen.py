#!/usr/bin/env python3
"""`<CodeBlock lines={...} />` 호출부가 `isEn` 을 안 넘기나 — 영어 화면에서
한국어 코드 주석이 그대로 새는 자리.

왜 생겼나 (2026-09-24, project-lead 실측): `components/quest/shared.tsx` 의
`CodeBlock` 이 `isEn` prop 을 받아 `localizeCode()` 로 코드 안 한국어 주석을
영어로 바꿔 그린다. 그런데 quest 마다 흔히 쓰는 템플릿

    if (step.type === "code") return <div style={{ padding: 14 }}>
      <CodeBlock lines={step.code} /></div>;

가 `isEn` 을 **안 넘긴다** (기본값 `false`). 같은 파일 안에서 `NumInput` 에는
이미 `E={E}` 를 넘기고 있는데 — **CodeBlock 자리만 빠졌다.**
실측(2026-09-24): "MCC" 섹션으로 태그된 quest 48개 중 43개(`mcc*` 접두 30개
+ `subseqmedian`·`cornercover`·`gifts`·`magicorbs`·`simplegame`·
`explodingarrow`·`xorstring`·`collatz`·`mobilegame`·`innovation`·`tichu`·
`rectangles`·`sumk` 13개)에서 86 곳을 찾아 고쳤다(`isEn={E}` — quest 마다
이미 있는 `const E = lang === "en"` 을 그대로 재사용).

⚠️ **고친 자리가 지금 당장 화면에 안 보일 수 있다** — 위 43개 quest 는
전부 `type: "code"` 스텝을 실제로는 안 쓰고(코드는 전부 "progressive" 타입,
곧 `ProgressiveCodeStepper` 가 그린다) 이 분기가 현재는 죽은 코드다.
그래도 고쳐야 하는 이유: ①템플릿이 복사되며 같은 구멍이 계속 퍼진다
②`type: "code"` 를 실제로 쓰는 quest(`fences`·`lc303`·`lc1480`·`lc974`
등)가 이미 있다 — 그 template 을 그대로 복사하면 바로 산다.

무엇을 보나 — `quest-problems/*/*.jsx` 에서 `<CodeBlock` 여는 태그부터
`/>`(또는 `>`) 까지를 (여러 줄 걸쳐도) 통째로 읽어 그 안에 `isEn` 문자열이
있는지만 본다. `CodeReveal`(내부에서 `<CodeBlock lines={lines} />` 를
`isEn` 없이 부른다)은 `components/quest/shared.tsx` 안의 정의이지 quest
호출부가 아니라서 이 검사기가 못 본다 — 그건 컴포넌트 인프라 쪽 수정이 필요하다.

⚠️ 이 검사기의 한계 — **0건이 결백이 아니다**:
  - `<CodeBlock` 문자열만 본다. 다른 이름의 로컬 래퍼(`CodeSnippet`·`CodeBox`)는
    `check-unused-lang-param.py` 가 다른 이유로 이미 본다 — 겹치지 않게
    이 검사기는 `CodeBlock` 하나만 본다.
  - `isEn` 이 **있기만** 하면 통과시킨다 — `isEn={false}` 처럼 값이 틀려도
    못 잡는다(실측으로는 아직 그런 자리가 없었다).
  - `components/quest/` 안에서 `CodeBlock` 을 부르는 다른 공용 컴포넌트
    (예: `CodeReveal`)는 안 본다 — quest 쪽 호출부만 본다.
  - MCC 는 파이썬만 학생 화면에 뜬다(`feedback_mcc_is_python_only.md`) —
    C++ 조각의 isEn 누락은 학생이 볼 일이 없다. 이 검사기는 언어를 안
    가리고 다 세니, MCC quest 를 고칠 땐 실제로 파이썬 화면을 열어 봐라.

사용:
  python3 scripts/check-codeblock-isen.py            # 전체
  python3 scripts/check-codeblock-isen.py mcc21simplemath  # quest 골라서
"""
import glob
import io
import re
import sys

CODEBLOCK_CALL = re.compile(r"<CodeBlock\b(.*?)/?>", re.S)


def find_missing(files, want):
    hits = []
    for f in files:
        parts = f.split("/")
        if len(parts) < 2:
            continue
        quest = parts[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in CODEBLOCK_CALL.finditer(src):
            attrs = m.group(1)
            if "isEn" not in attrs:
                line_no = src[: m.start()].count("\n") + 1
                hits.append((f, line_no))
    return hits


def main():
    want = set(sys.argv[1:])
    files = sorted(glob.glob("quest-problems/*/*.jsx"))
    hits = find_missing(files, want)

    if not hits:
        print("0건. (검사기 한계는 파일 상단 docstring 참고 — 0건이 결백은 아니다)")
        return 0

    print(f"{len(hits)}곳 — <CodeBlock> 호출부에 isEn 이 없다:\n")
    by_quest = {}
    for f, ln in hits:
        by_quest.setdefault(f.split("/")[1], []).append((f, ln))
    for quest in sorted(by_quest):
        print(f"  {quest}")
        for f, ln in by_quest[quest]:
            print(f"    {f}:{ln}")
    print(f"\n총 {len(hits)}곳 · quest {len(by_quest)}개")
    return 1


if __name__ == "__main__":
    sys.exit(main())
