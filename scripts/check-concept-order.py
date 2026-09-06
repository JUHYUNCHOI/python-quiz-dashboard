#!/usr/bin/env python3
"""안 가르치고 쓰는 문법을 잡는다.

왜 있나 — 2026-09-06:
학생 에이전트가 레슨50·52 에서 `'O' if self.alive else 'X'` 를 보고 멈췄다.
"이거 순서가 왜 이래? if 가 왜 중간에 있지?" 하고 거꾸로 읽었다고 했다.
grep 해보니 **한 줄 if 를 설명하는 곳이 52개 레슨 어디에도 없었다.**
`[item for item in ...]`(리스트 컴프리헨션)도 레슨51 에서 설명 없이 나온다.

즉 "능동 비율" 이나 "채점 스텝" 을 아무리 고쳐도 이 구멍은 안 메워진다.
학생이 **처음 보는 문법**을 만나면 거기서 멈추기 때문이다.

무엇을 보나
  각 문법에 대해 (a) 처음 **가르치는** 레슨 (b) 처음 **쓰는** 레슨 을 찾아
  (b) < (a) 이거나 (a) 가 아예 없으면 문제로 본다.

⚠️ 가르치는 곳은 `explain` 본문에서 찾는다. 코드에만 나오는 건 "쓴 것" 이지
   "가르친 것" 이 아니다 — 그게 이 검사의 요점이다.
"""
import glob, io, json, os, re, sys

DATA = "data"

# (이름, 코드에서 찾는 정규식, explain 본문에서 "가르쳤다" 로 볼 정규식)
CONCEPTS = [
    ("한 줄 if (조건부 표현식)",
     re.compile(r"^(?!\s*(?:#|if\b|elif\b)).*\S\s+if\s+.+\s+else\s+.+$", re.M),
     re.compile(r"한 줄로 (?:쓰는|줄인)|삼항|조건부 표현식|값1 if|one-line if|ternary|conditional expression")),
    ("리스트 컴프리헨션",
     re.compile(r"\[[^\[\]\n]*\bfor\b[^\[\]\n]*\bin\b[^\[\]\n]*\]"),
     re.compile(r"컴프리헨션|comprehension|한 줄로 리스트")),
    # 2026-09-06 2차: 학생 에이전트가 레슨1~14 를 처음부터 따라가며 두 개를 더 찾았다.
    # 검사기가 못 잡던 것들이다 — 3종만 넣어두고 "다 잡았다" 고 여긴 게 내 실수였다.
    ("리스트 리터럴 `[1, 2, 3]`",
     re.compile(r"=\s*\[\s*(?:\d|['\"])[^\]\n]*\]"),
     re.compile(r"리스트(?:란|는|를)|리스트 만들|\[\] 로 만들|list(?:s are| is)|make a list")),
    # ⚠️ 빈칸(`___`)이 들어간 스텝은 "쓰는 곳" 으로 안 잡힌다 — 코드에 그 이름이
    #    없기 때문이다. 그래서 hint2 도 코드 취급해 같이 본다(load_steps 참고).
    ("`.reverse()` 메서드",
     re.compile(r"\.reverse\s*\(|(?<![\w=])\breverse\b(?!\s*=)"),
     # 개념 **이름을 정확히** 대야 "가르쳤다" 로 본다.
     # 처음엔 "뒤집기" 도 넣었다가 레슨4 가 다른 뜻으로 그 말을 써서 오탐이 났다.
     re.compile(r"reverse\(\)|reverses the list")),
    ("함수를 값으로 저장했다 호출",
     re.compile(r"self\.\w*(?:fn|func|callback)\w*\s*\(|\bself\.\w+_fn\b"),
     re.compile(r"함수를 (?:값|변수)(?:으로|로)|함수 자체를 (?:담|저장|넘)|함수를 담아|store a function|function as a value")),
]


# "지금은 몰라도 된다" 고 **예고한** 자리는 실패로 보지 않는다.
# 안내는 가르침이 아니지만, 학생이 "이거 안 배웠는데?" 하고 멈추는 건 막는다.
# 2026-09-06: 학생이 레슨14 미션에서 리스트를 처음 보고 멈췄다 —
#   "다음 레슨에서 배워요" 한 줄이 없어서였다.
HEADS_UP = re.compile(r"다음 레슨에서 배|나중에 배|아직 안 배운|"
                      r"coming up next lesson|you will learn .* later")


def lesson_no(path):
    m = re.search(r"lesson(\d+)", path)
    return int(m.group(1)) if m else None


def load_steps():
    """AST 없이도 되게 — explain content 와 code 필드만 거칠게 뽑는다."""
    out = []
    for p in sorted(glob.glob(os.path.join(DATA, "lesson*.ts")) +
                    glob.glob(os.path.join(DATA, "lessons", "lesson*", "*.ts"))):
        if p.endswith("-en.ts"):
            continue
        n = lesson_no(p)
        if n is None:
            continue
        s = io.open(p, encoding="utf-8").read()
        # 코드가 들어가는 필드
        code = "\n".join(m.group(1) for m in re.finditer(
            r"(?:initialCode|codeTemplate|targetCode|hint2):\s*`([^`]*)`", s))
        code += "\n" + "\n".join(m.group(1) for m in re.finditer(
            r'(?:initialCode|codeTemplate|targetCode|hint2):\s*"((?:[^"\\]|\\.)*)"', s)).replace("\\n", "\n")
        # explain 본문 + **제목·설명**. 2026-09-06: 처음엔 content 만 봤다가
        # 레슨16 의 "✨ 리스트 컴프리헨션 — 한 줄로 만드는 마법" 을 놓쳤다.
        # 제목에만 개념 이름이 있고 본문은 코드블록뿐인 스텝이 있다.
        # (```python 블록 안은 '가르친 것' 이 아니라 '쓴 것' 이라 아래서 뺀다)
        # ⚠️ `[^`]*` 로 잡으면 **첫 백틱에서 잘린다** — 레슨 본문은 TS 템플릿 안이라
        #    코드블록이 `\\`\\`\\`` (이스케이프된 백틱)로 들어있다. 2026-09-06 에
        #    이것 때문에 레슨16 에 넣은 reverse() 설명을 검사기가 못 봤다.
        prose = "\n".join(m.group(1) for m in re.finditer(r"content:\s*`((?:[^`\\]|\\.)*)`", s))
        prose += "\n" + "\n".join(m.group(1) for m in re.finditer(
            r'(?:title|description):\s*"((?:[^"\\]|\\.)*)"', s))
        # task 는 "예고" 를 담는 자리다 — 아래에서 따로 본다
        task = "\n".join(m.group(1) for m in re.finditer(
            r'task:\s*"((?:[^"\\\\]|\\\\.)*)"', s)).replace("\\\\n", "\n")
        prose_unesc = prose.replace("\\`", "`")
        prose_no_code = re.sub(r"```[\s\S]*?```", "", prose_unesc)
        code += "\n" + "\n".join(re.findall(r"```python\n([\s\S]*?)```", prose_unesc))
        out.append((n, p, code, prose_no_code, task))
    return out


def main():
    steps = load_steps()
    bad = 0
    for name, use_re, teach_re in CONCEPTS:
        taught = sorted({n for n, p, c, prose, tk in steps if teach_re.search(prose)})
        used = sorted({n for n, p, c, prose, tk in steps if use_re.search(c)})
        announced = {n for n, p, c, prose, tk in steps if use_re.search(c) and HEADS_UP.search(tk)}
        first_teach = taught[0] if taught else None
        early = [n for n in used if (first_teach is None or n < first_teach) and n not in announced]
        heads = sorted(announced & {n for n in used if first_teach is None or n < first_teach})
        ok = not early
        mark = "✅" if ok else "❌"
        print(f"\n{mark} {name}")
        print(f"    처음 가르치는 곳 : {'레슨 ' + str(first_teach) if first_teach else '없음 (어디에서도 안 가르친다)'}")
        print(f"    쓰는 곳          : {', '.join('레슨'+str(n) for n in used) if used else '없음'}")
        if heads:
            print(f"    📣 예고만 하고 쓰는 곳 : {', '.join('레슨'+str(n) for n in heads)}"
                  f"  (\"다음 레슨에서 배워요\" 안내가 있어 실패로 안 본다)")
        if not ok:
            bad += 1
            print(f"    ⚠️  안 배운 채로 만나는 레슨: {', '.join('레슨'+str(n) for n in early)}")
            for n, p, c, prose, tk in steps:
                if n not in early:
                    continue
                m = use_re.search(c)
                if m:
                    print(f"        {p}  →  {m.group(0).strip()[:70]}")
                    break
    print()
    if bad:
        print(f"❌ {bad}개 문법이 배우기 전에 나온다.")
        print("   고치는 법: (a) 처음 쓰는 곳 앞에 짧은 explain 을 넣거나")
        print("              (b) 그 코드를 이미 배운 문법으로 다시 쓴다.")
        return 1
    print("✅ 모든 문법이 배운 뒤에 나온다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
