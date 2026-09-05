#!/usr/bin/env python3
"""레슨 능동 스텝 비율 측정.

■ 왜 있나
2026-09-04 검토에서 CLAUDE.md 의 실측 표가 **레슨마다 다른 잣대로** 세어져 있던 게 드러났다.
이전 도구는 /tmp/audit2.py 였고 재부팅에 사라져서 아무도 다시 잴 수 없었다.

■ 왜 두 번 고쳤나 (2026-09-04, /decide 3라운드)
첫 판은 스텝의 `type` 만 보고 `interactive` 를 전부 수동으로 셌다. 그런데 `interactive` 는
"무엇을 렌더할지 모르는 빈 껍데기" 이고, 실제 학생 행동은 `component` 마다 다르다.
  · typeAlong  — <textarea> 에 코드를 글자 단위로 직접 친다
  · fillInBlank — 빈칸을 채워야 하고, 전부 정답이어야 통과
  · parameterStructure·returnStructure — onClick 이 파일 전체에 **0개**. 정지 그림이다
lesson-content-reviewer·pedagogy-reviewer·student-python 셋에게 각각 물었고 셋 다
"컴포넌트 단위로 나눠 세라" 로 모였다. 기준 문서의 정의 자체가
**"학생이 직접 입력/선택해야 진행되는 스텝"** — 필드 이름이 아니라 행동 조건이다.

■ ⚠️ 숫자를 목표로 삼지 마라
이 잣대로 바꾸면 32·33·37·38·39·40·41 일곱 레슨이 "50% 미만" 목록에서 **한 번에 사라진다.**
내용은 한 글자도 안 고쳤는데. 비율이 좋아도 배치가 나쁠 수 있다 —
레슨 32 ch1 은 관람 스텝 5개가 연달아 나온 뒤 능동이 하나 붙는 모양이고,
그건 % 로는 절대 안 잡힌다. 챕터를 직접 열어봐야 한다.

  python3 scripts/check-active-ratio.py           # 전체
  python3 scripts/check-active-ratio.py 32 37     # 특정 레슨
"""
import glob, os, re, sys

ACTIVE_TYPES = {"tryit", "practice", "mission", "quiz", "predict", "fillblank"}

# type 이 interactive/explain 이어도 이 컴포넌트면 능동 — 학생이 입력·선택해야 진행된다
ACTIVE_COMPONENTS = {
    "typeAlong",            # textarea 에 글자 단위로 직접 친다
    "fillInBlank",          # 빈칸을 채워야 하고 전부 정답이어야 통과
    "pyAndOrNotMatcher",    # 3지선다 10문항 + 점수 — 진짜 퀴즈
    "gameCrashDemo",        # 입력 선택에 따라 크래시/득점이 실제로 갈린다
}

# 확정 수동 — 클릭해도 미리 정해진 슬라이드만 넘어가거나, 아예 누를 게 없다
# 확정 수동 — 클릭해도 미리 정해진 것만 보여준다. **정답 개념 자체가 없다.**
# ⚠️ 자유롭게 클릭·타이핑할 수 있어도 "맞았다/틀렸다" 가 없으면 수동이다
#    (`pyStringIndexVisualizer` 처럼 입력은 되는데 채점이 없는 샌드박스 포함).
KNOWN_PASSIVE = {
    "repetitiveTyping", "patternDiscovery", "functionBuilder", "pyFunctionBuilder",
    "parameterStructure", "returnStructure", "functionStructure",
    # syntax-builder.tsx 기반 — onClick 이 전부 setCurrentStep 뿐, 분기 없음
    "pyVariableBuilder", "pyPrintBuilder", "pyInputBuilder", "pyIfBuilder", "pyForBuilder", "pyWhileBuilder",
    "pyListBuilder", "pyDictBuilder", "pyClassBuilder", "pyTryExceptBuilder",
    # code-trace 기반 — 실행 추적 재생. 예측을 먼저 시키지 않는다
    "codeTracePyIfElse", "codeTracePyIfElseLow", "codeTracePyNestedIf",
    "codeTracePyNestedIfFalse", "codeTracePyForSum", "codeTracePyForString",
    "codeTracePyForIf", "codeTracePyWhile",
    # 시뮬레이터·샌드박스·정보 카드
    "pyRangeTrack", "variableUpdateVisualizer", "pyAndOrCircuit",
    "pyStringIndexVisualizer", "pyPrintOptionsVisualizer", "pyFstringVisualizer",
    "typeConversionVisualizer", "inputVisualizer", "stackVisualizer", "mapFactory",
    "defaultValueVisualizer", "multipleReturnVisualizer", "keywordArgVisualizer",
    "tryExceptFlow", "multiExceptFlow", "errorTypesCards",
    "memoryVsFile", "fileModeSimulator", "readMethodDemo", "classBoonguh",
}

# 지도·다리 레슨 — 일부러 짧다. 45% 잣대를 들이대면 안 된다.
# 레슨 15 는 2026-08-23 에 "학생이 아직 안 배운 것을 풀어야 해서" 미션·퀴즈를 일부러 걷어냈다
# (`data/lesson15.ts` 헤더 주석, 커리큘럼도 duration 5분 · hasQuiz false).
MAP_LESSONS = {15}

STEP = re.compile(r'\bid:\s*"([^"]+)"')
FIELD = re.compile(r'\b(type|component):\s*"([a-zA-Z]+)"')


def lesson_files(n):
    sub = sorted(glob.glob(f"data/lessons/lesson{n}/ch*.ts"))
    if sub:
        return sub
    top = f"data/lesson{n}.ts"
    if os.path.exists(top) and len(open(top, encoding="utf-8").read().splitlines()) > 10:
        return [top]
    return []


def steps_of(path):
    """스텝 블록 단위로 잘라 (type, component) 를 짝지어 낸다.

    ⚠️ 예전처럼 파일 전체에서 type 만 긁으면 어느 스텝의 component 인지 모른다 —
    그래서 컴포넌트별 판정 자체가 불가능했다."""
    s = open(path, encoding="utf-8").read()
    marks = [m.start() for m in STEP.finditer(s)] + [len(s)]
    out = []
    for i in range(len(marks) - 1):
        blk = s[marks[i]:marks[i + 1]]
        f = dict(FIELD.findall(blk))
        if "type" in f:
            # 빈칸(___)이 블록 안에 있나 — tryit 의 채점 여부가 여기서 갈린다
            out.append((f["type"], f.get("component"), "___" in blk))
    return out


def is_active(t, c, has_blank):
    """이 스텝은 학생이 **뭔가 하지 않으면 못 넘어가는가?**

    ⚠️ 빈칸(___) 없는 `tryit` 은 능동이 아니다.
       components/learn/tryit-step.tsx:90 이 `requireCorrect={step.type === "mission"}` 라
       tryit 은 **실행 버튼만 눌러도** — 코드를 한 글자도 안 고쳐도 — 완료 처리된다.
       빈칸이 있어야 BlankCodeRunner 로 가서 실제로 채점된다 (같은 파일 21행).
       2026-09-05 선생님이 수업에서 잡아내신 것: 레슨 35 는 73.1% 인데 tryit 10개가
       전부 빈칸 없음 → "충분히 연습도 안되고". 숫자가 착시였다."""
    if t == "tryit":
        return has_blank
    return t in ACTIVE_TYPES or c in ACTIVE_COMPONENTS


def measure(n):
    files = lesson_files(n)
    if not files:
        return None
    steps = [st for f in files for st in steps_of(f)]
    if not steps:
        return None
    act = sum(1 for t, c, b in steps if is_active(t, c, b))
    unknown = {c for t, c, b in steps if c and c not in ACTIVE_COMPONENTS and c not in KNOWN_PASSIVE}
    naked = sum(1 for t, c, b in steps if t == "tryit" and not b)
    return act, len(steps), steps, unknown, naked


def main():
    args = sys.argv[1:]
    nums = [int(a) for a in args] if args else range(1, 53)
    rows, unknown_all = [], set()
    for n in nums:
        r = measure(n)
        if r:
            act, total, steps, unk, naked = r
            rows.append((100.0 * act / total, n, act, total, steps, naked))
            unknown_all |= unk
    if not rows:
        print("측정할 레슨을 못 찾음"); return 1

    rows.sort()
    print(f"{'레슨':>4} {'능동%':>7} {'능동/전체':>10}  구성")
    print("-" * 78)
    for pct, n, act, total, steps, naked in rows:
        mark = "🗺️ " if n in MAP_LESSONS else ("❌" if pct < 45 else ("⚠️ " if pct < 50 else "  "))
        cnt = {}
        for t, c, b in steps:
            k = ("tryit(빈칸없음)" if t == "tryit" and not b
                 else c if c in ACTIVE_COMPONENTS else t)
            cnt[k] = cnt.get(k, 0) + 1
        comp = " ".join(f"{k}{v}" for k, v in sorted(cnt.items(), key=lambda x: -x[1]))
        print(f"{n:>4} {pct:>6.1f}% {act:>4}/{total:<5} {mark} {comp}")

    bad = [r for r in rows if r[0] < 50 and r[1] not in MAP_LESSONS]
    print("-" * 78)
    print(f"측정 {len(rows)}개 · 50% 미만 {len(bad)}개 · 45% 미만 {sum(1 for r in rows if r[0] < 45 and r[1] not in MAP_LESSONS)}개")
    nk = [(n, naked) for _, n, _, _, _, naked in rows if naked]
    if nk:
        print(f"\n⚠️  빈칸 없는 `tryit` 이 있는 레슨 {len(nk)}개 — **실행 버튼만 눌러도 통과**한다:")
        print("      " + "  ".join(f"레슨{n}:{c}개" for n, c in sorted(nk, key=lambda x: -x[1])))
        print("    고치는 법: initialCode 에 ___ 를 넣어 빈칸으로 만들거나, mission 으로 올려라.")
        print("    (읽히는 게 목적인 시범 코드라면 그냥 explain 이 맞다 — tryit 로 위장하지 마라.)")
    if unknown_all:
        print(f"\n⚠️  미분류 컴포넌트 {len(unknown_all)}개 — 지금은 **수동으로** 세고 있다. 분류가 필요하다:")
        for c in sorted(unknown_all):
            print(f"      {c}")
        print("    판정 기준: 학생이 입력·선택을 안 하면 스텝이 앞으로 안 가는가?")
        print("    맞으면 ACTIVE_COMPONENTS, 아니면 KNOWN_PASSIVE 에 넣어라.")
    print("\n⚠️  비율이 좋아도 배치가 나쁠 수 있다 — 관람 스텝이 여러 개 연달아 나온 뒤")
    print("    능동이 하나만 붙는 챕터는 % 로 안 잡힌다. 챕터를 직접 열어봐라.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
