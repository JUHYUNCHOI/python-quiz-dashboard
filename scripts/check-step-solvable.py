#!/usr/bin/env python3
"""수업 스텝이 **학생이 실제로 풀 수 있는 모양인가** — 빈칸이 코드에 있나, 입력은 주나.

왜 생겼나 (2026-10-07)
---------------------
학생이 보호자를 통해 *"졸업미션에서 문제가 있었다"* 고 알려왔다. 찾다가
`python-qa` 가 실행 채점 스텝 **942개를 전부 돌려** 두 자리를 잡았다:

  `data/lessons/lesson39/ch5.ts` 🏆 **최종 미션** — 빈칸 `___` 가 **주석 안에만** 있고
    부르는 `회복()` 함수가 템플릿에 **정의가 없다.** 무엇을 써 넣어도 `NameError`.
  `data/lesson19.ts` 실습 — 빈칸이 **주석 안에만** 있고 실제 `print()` 가 없다.
    **항상 빈 출력** → `expectedOutput` 과 영원히 불일치.

뿌리가 같다. `components/learn/tryit-step.tsx:32` 의

    const hasBlanks = !!(step.initialCode && step.initialCode.includes('___'))

는 **주석인지 코드인지 안 가린다.** 그래서 「함수를 통째로 짜는 자유 작성 미션」이
**빈칸 모드로 잘못 들어가고**, 학생이 채운 글자는 주석이라 **실행에 아무 영향이 없다.**
학생 눈에는 「채웠는데 계속 틀렸다」로 보인다.

⛔ **왜 아무도 못 잡았나**
  - 빌드·타입 검사는 당연히 통과한다. **문법은 멀쩡하고 런타임·의미만 틀렸다.**
  - 내(메인 세션) 1차 집계는 `data/lesson*.ts` 만 훑어 **레슨 27~31 · 41~52 를 통째로
    빠뜨렸다** — 그것들은 `data/lessons/lessonNN/ch*.ts` 로 쪼개져 있다(84개 파일).
    **그래서 이 검사기는 두 자리를 모두 본다.**

잣대 — 실행 채점 스텝(`tryit` · `mission`) 중
----------------------------------------------
🚨 **A. 빈칸이 주석 안에만 있다** — 채워도 실행에 영향이 없다. **영영 못 푼다.**
⚠️ **B. 주석에도 빈칸이 있다**(코드에도 있음) — 쓸모없는 입력칸이 하나 더 뜬다. 막히진 않는다.
⚠️ **C. `input()` 을 쓰는데 `stdin` 이 없다** — 빈칸형이면 `EOFError`,
     자유형이면 학생이 `input()` 을 지워야 통과해 **가르치려는 걸 검증 못 한다.**

⚠️ 못 보는 것
  - **정답 코드가 `expectedOutput` 과 맞는지는 안 본다.** 그건 실제로 돌려야 안다
    (`python-qa` 의 몫 — 942개를 손으로 돌린 적이 있다). 이건 **1초짜리 그물**이다.
  - 주석 판별은 파이썬 `#` 만 본다. 문자열 안의 `#` 은 주석으로 **잘못 볼 수 있다.**
  - `interactive` · `fillblank` 등 다른 타입은 안 본다.
⭐ `--selftest` 로 **잣대가 사는지 먼저** 봐라.
"""
import re
import sys
import glob
import os

FILES = sorted(glob.glob("data/lesson*.ts")) + sorted(glob.glob("data/lessons/*/ch*.ts"))
# ⚠️ `initialCode` 는 **두 모양**으로 쓰인다 — 큰따옴표와 **백틱**.
#   처음엔 큰따옴표만 봤다가 `data/lessons/lesson37/ch6.ts` 를 **조용히 놓쳤다.**
#   「0건」이 검사기가 안 돌아서 나온 0 이었다. 둘 다 본다.
CODE_FIELD = re.compile(r'initialCode:\s*("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)', re.S)


def unquote(lit: str) -> str:
    if lit.startswith("`"):
        return lit[1:-1]            # 백틱은 줄바꿈이 **글자 그대로** 들어 있다
    try:
        import json
        return json.loads(lit)
    except Exception:
        return lit[1:-1].replace("\\n", "\n")


def code_only(code: str) -> str:
    """파이썬 `#` 주석을 **같은 길이의 공백으로** 지운다 — 자리를 안 밀리게.

    ⚠️ **따옴표 안의 `#` 은 주석이 아니다.** 처음엔 `ln.find("#")` 로 잘랐다가
       `print(f"#{___}: {name}")` · `'#' * filled` 같은 자리를 **전부 주석으로 오판**해
       B 가 10곳 중 5곳이 오탐이었다. 그래서 따옴표를 따라가며 센다.
    """
    out = []
    for ln in code.split("\n"):
        q = None          # 지금 열려 있는 따옴표
        cut = len(ln)
        i = 0
        while i < len(ln):
            c = ln[i]
            if q:
                if c == "\\":
                    i += 2
                    continue
                if c == q:
                    q = None
            elif c in "\"'":
                q = c
            elif c == "#":
                cut = i
                break
            i += 1
        out.append(ln[:cut] + " " * (len(ln) - cut))
    return "\n".join(out)


def steps(src: str):
    """`type: "tryit"|"mission"` 을 가진 객체를 (줄, 타입, 본문) 으로."""
    out = []
    for m in re.finditer(r'type:\s*"(tryit|mission)"', src):
        i = m.start()
        d = 0
        while i > 0:
            if src[i] == "}":
                d += 1
            elif src[i] == "{":
                if d == 0:
                    break
                d -= 1
            i -= 1
        j, d, n = i + 1, 1, len(src)
        while j < n and d:
            if src[j] == "{":
                d += 1
            elif src[j] == "}":
                d -= 1
            j += 1
        out.append((src[:i].count("\n") + 1, m.group(1), src[i:j]))
    return out


def scan(path):
    src = open(path, encoding="utf-8").read()
    hits = []
    for line, typ, body in steps(src):
        m = CODE_FIELD.search(body)
        if not m:
            continue
        code = unquote(m.group(1))
        bare = code_only(code)
        n_all, n_code = code.count("___"), bare.count("___")
        title = re.search(r'title:\s*"(.*?)"', body, re.S)
        tag = (title.group(1)[:40] if title else "?")
        if n_all > 0 and n_code == 0:
            hits.append(("A", line, typ, tag, "빈칸이 **주석 안에만** 있다 — 채워도 실행에 영향이 없다"))
        elif n_all > n_code:
            hits.append(("B", line, typ, tag, f"주석에도 빈칸 {n_all - n_code}개 — 쓸모없는 입력칸이 더 뜬다"))
        if "input(" in bare and not re.search(r'\bstdin\s*:', body):
            hits.append(("C", line, typ, tag, "`input()` 을 쓰는데 `stdin` 이 없다"))
    return hits


SELFTEST = '''
const L = [
  { type: "mission", title: "A — 걸려야 한다",
    initialCode: "x = 1\\n# 여기에 ___ 를 채우세요\\nf()" },
  { type: "tryit", title: "B — 걸려야 한다",
    initialCode: "# 예: print(___)\\nprint(___)" },
  { type: "tryit", title: "C — 걸려야 한다",
    initialCode: "name = input()\\nprint(name)", expectedOutput: "x" },
  { type: "tryit", title: "안 걸려야 한다",
    initialCode: "print(___)", stdin: "1" },
  { type: "tryit", title: "안 걸려야 한다 2",
    initialCode: "name = input()\\nprint(name)", stdin: "\\ud638\\ub450" },
]
'''


def selftest():
    import tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".ts", delete=False, encoding="utf-8") as f:
        f.write(SELFTEST)
        p = f.name
    got = scan(p)
    os.unlink(p)
    kinds = sorted(k for k, *_ in got)
    for k, ln, typ, tag, why in got:
        print(f"   [{k}] 줄 {ln} {tag}")
    ok = kinds == ["A", "B", "C"]
    print("✅ 잣대가 살아 있다 — A·B·C 하나씩, 멀쩡한 둘은 안 걸린다" if ok
          else f"🚨 **잣대가 죽었다.** 기대 ['A','B','C'] · 실제 {kinds}")
    return 0 if ok else 1


def main():
    argv = sys.argv[1:]
    if "--selftest" in argv:
        sys.exit(selftest())
    only = {a for a in argv if not a.startswith("-")}

    buckets = {"A": [], "B": [], "C": []}
    seen = 0
    for f in FILES:
        if only and not any(o in f for o in only):
            continue
        seen += 1
        for k, line, typ, tag, why in scan(f):
            buckets[k].append((f, line, typ, tag, why))

    head = {
        "A": "🚨 **빈칸이 주석 안에만 있다 — 영영 못 푼다**",
        "B": "⚠️ 주석에도 빈칸이 있다 — 쓸모없는 입력칸(막히진 않는다)",
        "C": "⚠️ `input()` 을 쓰는데 `stdin` 이 없다",
    }
    for k in ("A", "B", "C"):
        if not buckets[k]:
            continue
        print(f"\n{head[k]} — {len(buckets[k])}곳")
        for f, line, typ, tag, why in buckets[k]:
            print(f"   {f}:{line}  [{typ}] {tag}")

    tot = sum(len(v) for v in buckets.values())
    print(f"\n파일 {seen}개를 봤다 — 🚨 A {len(buckets['A'])} · ⚠️ B {len(buckets['B'])} · ⚠️ C {len(buckets['C'])}")
    print("""
⛔ **A 는 「에러가 난다」가 아니라 「못 푼다」다.** 학생이 채운 글자가 주석이라
   실행에 아무 영향이 없고, 무엇을 써도 틀렸다고 나온다.
   고치는 길은 둘 — **빈칸을 진짜 코드 줄로 옮기거나**, `___` 를 빼서 **자유 작성**으로 돌린다.
   (함수를 통째로 짜는 미션은 빈칸 하나에 안 담긴다 — 후자가 맞다.)
⚠️ **정답이 `expectedOutput` 과 맞는지는 이 검사기가 안 본다** — 돌려야 안다(`python-qa`).
⭐ `--selftest` 로 잣대가 사는지 먼저 봐라.
근거: 2026-10-07 학생 제보 · `components/learn/tryit-step.tsx:32` 의 `hasBlanks`""")
    sys.exit(1 if buckets["A"] else 0)


if __name__ == "__main__":
    main()
