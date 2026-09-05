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
ACTIVE_COMPONENTS = {"typeAlong", "fillInBlank"}

# 확정 수동 — 클릭해도 미리 정해진 슬라이드만 넘어가거나, 아예 누를 게 없다
KNOWN_PASSIVE = {
    "repetitiveTyping", "patternDiscovery", "functionBuilder", "pyFunctionBuilder",
    "parameterStructure", "returnStructure", "functionStructure",
}

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
            out.append((f["type"], f.get("component")))
    return out


def measure(n):
    files = lesson_files(n)
    if not files:
        return None
    steps = [st for f in files for st in steps_of(f)]
    if not steps:
        return None
    act = sum(1 for t, c in steps if t in ACTIVE_TYPES or (c in ACTIVE_COMPONENTS))
    unknown = {c for t, c in steps if c and c not in ACTIVE_COMPONENTS and c not in KNOWN_PASSIVE}
    return act, len(steps), steps, unknown


def main():
    args = sys.argv[1:]
    nums = [int(a) for a in args] if args else range(1, 53)
    rows, unknown_all = [], set()
    for n in nums:
        r = measure(n)
        if r:
            act, total, steps, unk = r
            rows.append((100.0 * act / total, n, act, total, steps))
            unknown_all |= unk
    if not rows:
        print("측정할 레슨을 못 찾음"); return 1

    rows.sort()
    print(f"{'레슨':>4} {'능동%':>7} {'능동/전체':>10}  구성")
    print("-" * 78)
    for pct, n, act, total, steps in rows:
        mark = "❌" if pct < 45 else ("⚠️ " if pct < 50 else "  ")
        cnt = {}
        for t, c in steps:
            k = c if (c in ACTIVE_COMPONENTS) else t
            cnt[k] = cnt.get(k, 0) + 1
        comp = " ".join(f"{k}{v}" for k, v in sorted(cnt.items(), key=lambda x: -x[1]))
        print(f"{n:>4} {pct:>6.1f}% {act:>4}/{total:<5} {mark} {comp}")

    bad = [r for r in rows if r[0] < 50]
    print("-" * 78)
    print(f"측정 {len(rows)}개 · 50% 미만 {len(bad)}개 · 45% 미만 {sum(1 for r in rows if r[0] < 45)}개")
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
