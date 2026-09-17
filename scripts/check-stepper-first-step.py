#!/usr/bin/env python3
"""코드 스테퍼의 **첫 걸음**이 화면에 없는 이름을 쓰나.

왜 (2026-09-17): `mcc21simplemath` 에 브루트 코드 쪽을 새로 만들면서
첫 걸음을 `for x in a:` 로 시작했다. **`a` 도 `P` 도 `MOD` 도 그 화면에 없었다.**
`ProgressiveCodeStepper` 는 한 번에 **그 걸음의 코드만** 보여준다 — 앞 걸음 코드가 안 남는다.
학생이 앞 쪽에서 `N = 3, P = 1, A = [1,2,3]` 을 **글로는** 봤지만,
쪽을 넘기면 앞 쪽은 사라진다(`memory/feedback_screen_must_not_rely_on_memory.md`).

project-lead 가 브라우저로 걸음을 하나씩 눌러 보고 잡았다. 파일에서 읽으면
조각이 이어져 보여서 **안 보인다.** 그래서 기계가 매번 보게 만든다.

무엇을 보나 — `py: X, cpp: Y` 로 짝지어진 **섹션 배열의 첫 번째**만 본다.
  둘째 걸음부터는 앞 걸음 위에 쌓는 게 정상이다(그게 스테퍼의 뜻이다).
  **첫 걸음은 기댈 앞이 없다.**

  python3 scripts/check-stepper-first-step.py              # 전체
  python3 scripts/check-stepper-first-step.py mcc21simplemath

나가는 값: 걸린 게 있으면 1.
"""
import ast
import builtins
import glob
import io
import json
import re
import sys

BUILTIN = set(dir(builtins)) | {
    "sys", "math", "collections", "itertools", "heapq", "bisect", "deque",
    "input", "self", "__name__",
}


def sections_first_py(src):
    """`py: NAME` 으로 쓰인 섹션 배열들의 **첫 번째** 이름을 함수별로 모은다."""
    out = []
    for m in re.finditer(r"export function (get\w*Sections?\w*)\s*\(", src):
        fn = m.group(1)
        # 이 함수 본문 안의 첫 `py: X` 를 찾는다
        tail = src[m.end():]
        stop = tail.find("\nexport function ")
        body = tail[:stop] if stop > 0 else tail
        pm = re.search(r"\bpy:\s*([A-Za-z_$][\w$]*)", body)
        if pm:
            out.append((fn, pm.group(1)))
    return out


def array_lines(src, name):
    m = re.search(r"const %s = \[\n(.*?)\n\];" % re.escape(name), src, re.S)
    if not m:
        return None
    lines = []
    for l in m.group(1).split("\n"):
        l = l.strip().rstrip(",")
        if l.startswith('"'):
            try:
                lines.append(json.loads(l))
            except Exception:
                return None
    return lines


def free_names(code):
    """이 코드 조각에서 **정의하기 전에 쓰는** 이름들."""
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return None                      # 조각이라 못 파싱하면 판정하지 않는다
    bound, used = set(), []

    class V(ast.NodeVisitor):
        def visit_Name(self, node):
            if isinstance(node.ctx, (ast.Store,)):
                bound.add(node.id)
            elif node.id not in bound and node.id not in BUILTIN:
                used.append(node.id)
            self.generic_visit(node)

        def visit_FunctionDef(self, node):
            bound.add(node.name)
            for a in node.args.args:
                bound.add(a.arg)
            self.generic_visit(node)

        def visit_Import(self, node):
            for a in node.names:
                bound.add((a.asname or a.name).split(".")[0])

        def visit_ImportFrom(self, node):
            for a in node.names:
                bound.add(a.asname or a.name)

        def visit_For(self, node):
            # 대상은 먼저 묶인다
            for n in ast.walk(node.target):
                if isinstance(n, ast.Name):
                    bound.add(n.id)
            self.generic_visit(node)

    V().visit(tree)
    seen, out = set(), []
    for n in used:
        if n not in seen and n not in bound:
            seen.add(n)
            out.append(n)
    return out


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in raw for x in a.split()) or None

    bad, checked, skipped = [], 0, 0
    for f in sorted(glob.glob("quest-problems/*/components.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for fn, arr_name in sections_first_py(src):
            lines = array_lines(src, arr_name)
            if lines is None:
                skipped += 1
                continue
            free = free_names("\n".join(lines))
            if free is None:
                skipped += 1
                continue
            checked += 1
            # ⚠️ 코드가 **스스로 가리키는** 이름은 빼라.
            #    explodingarrow 의 첫 걸음은 `# ... feasible(X) 는 아래 ② 에서 ...` 라고
            #    적어 두고 `feasible(mid)` 를 쓴다. 이건 화면이 학생에게
            #    "이건 다음 걸음에 나온다" 고 말하고 있는 것이다 — 구멍이 아니다.
            comments = "\n".join(
                l.split("#", 1)[1] for l in lines if "#" in l)
            free = [n for n in free if n not in comments]
            if free:
                bad.append((quest, fn, arr_name, free))

    print(f"첫 걸음에 화면 밖 이름을 쓰는 스테퍼 — {len(bad)}건 "
          f"(검사한 스테퍼 {checked}개 · 못 읽어 건너뛴 것 {skipped}개)\n")
    for quest, fn, arr_name, free in bad:
        print(f"  ❌ {quest}  {fn}() 의 첫 걸음 `{arr_name}`")
        print(f"      화면에 없는 이름: {', '.join(free)}")
        print("      → 값을 정하는 걸음 하나를 **앞에** 넣어라 (형제 스테퍼의 SETUP 을 그대로 써도 된다)\n")

    # 걸음 번호가 점 번호와 맞나 — project-lead 가 2026-09-17 에 잡은 것.
    # `ProgressiveCodeStepper.tsx` 의 점은 `{i+1}` 로 **1 부터** 매긴다.
    # 라벨을 "0." 으로 시작하면 점 "1" 안에 "0." 이 떠서 하나씩 어긋난다.
    off = []
    for f in sorted(glob.glob("quest-problems/*/components.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in re.finditer(r'label:\s*t\(E,\s*"[^"]*?\b0\.\s', src):
            off.append((quest, src[m.start():m.start() + 70].replace("\n", " ")))
    if off:
        print(f"  ── 따로: 걸음 번호가 **0 부터** 시작하는 라벨 {len(off)}건")
        print("     점은 1 부터 매긴다(ProgressiveCodeStepper `{i+1}`). 하나씩 어긋난다.\n")
        for q, frag in off:
            print(f"     {q}  {frag[:64]}")
        print()

    print("⚠️ **둘째 걸음부터는 안 본다.** 앞 걸음 위에 쌓는 게 스테퍼의 뜻이다.")
    print("   첫 걸음만 기댈 앞이 없다 — 학생은 그 화면 하나만 본다.")
    print("⚠️ 파이썬 조각만 본다. C++ 은 파서가 없어 못 본다 — 눈으로 봐라.")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
