#!/usr/bin/env python3
"""학생이 내려받는 코드가 **그대로 돌아가는 프로그램**인가.

왜 (2026-09-21): `moohunt` 의 📄 PDF 가 주는 C++ 이 `int N, K;` 로 시작했다.
`#include` 도 `using namespace std;` 도 `int main() {` 도 없다.
**학생이 내려받아 붙이면 컴파일 에러다.** quest-auditor 가 찾았다.

`get*Sections` 의 `py:` / `cpp:` 조각은 두 군데로 간다 —
화면의 코드 스테퍼와 **PDF 내려받기**(`download*PDF`). PDF 는 감싸는 코드를 안 붙인다.
그러니 조각을 다 이으면 **그 자체로 도는 프로그램**이어야 한다.

  python3 scripts/check-section-code-complete.py
  python3 scripts/check-section-code-complete.py moohunt printseq

⚠️ 조각을 `FULL_PY.slice(a, b)` 로 자른 quest 는 **원본을 그대로 쓰므로 안전**하다.
   위험한 건 **코드를 손으로 다시 타이핑한** 조각이다 — 원본과 갈라지고, 머리가 빠진다.
   (그래서 쪼갤 때는 `.slice()` 를 쓴다 — `scripts/prove-sections-cover-code.py` 참고.)

왜 넓혔나 (2026-09-23): `permutation` 의 파이썬 코드가 위 검사(=`import sys`
있나만)는 통과했는데, 학생이 그대로 베끼면 **아무 출력도 안 난다.**

    def search(p, used, idx, N, h):
        ...
        return False        ← 함수가 여기서 끝난다(들여쓰기 그대로 이어짐)

        p = [0] * N              ← 4칸 들여쓰기라 여전히 search() "안"
        used = [False] * (N + 1)
        if not search(p, used, 0, N, h):
            print(-1)

`search` 를 부르는 줄이 `search` 자기 몸통 안에 갇힌 **죽은 코드**라, 최상위
어디에서도 `search` 를 안 부른다. AST 로 보면 top-level 에 `Assign`·`For`
(입력 읽기)도 있어서 "top-level 에 함수 정의만 있나" 정도로는 못 잡는다 —
**"정의된 함수가 실행되는 경로(top-level → 그 함수 → 그 함수가 부르는 함수…)에서
한 번도 안 불린다"** 를 봐야 잡힌다. 그래서 아래 `unreachable_py_funcs()` 는
top-level 실행문에서 시작해 호출 그래프를 타고 내려가며 **닿지 않는 top-level
함수**를 찾는다. (top-level 실행문이 아예 없으면 모든 함수가 자동으로 "안 닿음"
이 되므로 이전에 걱정한 "함수 정의만 있는 섹션" 케이스도 이 하나로 같이 잡힌다.)

C++ 은 AST 가 없어 무리하지 않는다 — 중괄호 깊이로 함수 몸통을 떼어내고,
그 함수 이름이 **자기 몸통 밖**에서 `이름(` 꼴로 한 번도 안 나오면 신고한다
(재귀 호출은 몸통 안이라 안 걸림). `main` 은 실행 진입점이라 항상 제외.

⚠️ 이 검사는 **섹션을 순서대로 이어붙인 전체**를 본다 — 기존 C++ #include
검사와 같은 원칙("조각을 다 이으면 그 자체로 도는 프로그램이어야 한다").
섹션 하나만 보면 "① 함수만 만드는 섹션" 이 정상으로 오탐 날 수 있지만,
**전체를 이으면 그 함수가 반드시 불려야** 완결된 프로그램이다.

⚠️ 이 검사가 못 보는 것 — 함수가 **불리기는 하는데 인자가 틀렸다** ·
**호출은 되는데 로직이 틀렸다** · 클래스 메서드(`self.foo()`) ·
문자열로 이름을 만들어 `globals()[name]()` 처럼 동적으로 부르는 경우는
"안 불린다" 로 오판할 수 있다 (이 저장소엔 아직 없어 보였다 — 20건 손으로 확인).
그리고 C++ 쪽은 정규식 기반이라 **함수 포인터로 넘기는 경우**(`sort(v, cmp)`)는
이름이 텍스트에 있으니 "불렸다" 로 통과시킨다(관대한 쪽으로 치우침).
"""
import ast
import glob
import io
import json
import re
import sys


def array_literal(src, start):
    """`src[start]` 가 `[` 라고 가정하고, 그 배열 리터럴의 문자열 원소들을 뽑는다.
    ⚠️ 2026-09-23: 원래(이 함수를 뽑기 전) 코드는 문자열 **안의** `[`·`]` 도 그냥 셌다.
       파이썬 코드 줄엔 `"divs = [[] for _ in range(N+1)]"` 처럼 대괄호가 흔해서,
       `printseq` 에서 배열이 **엉뚱한 자리에서 일찍 닫히고 py/cpp 경계가 섞였다**
       (cpp 섹션에 파이썬 코드가 들어와 보였다 — 20건 표본 검증 중 발견).
       그래서 문자열 안인지 추적하며(`in_str`) 그 안의 대괄호는 세지 않는다."""
    j, d, in_str, esc = start, 0, False, False
    while j < len(src):
        c = src[j]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c == "[":
                d += 1
            elif c == "]":
                d -= 1
                if d == 0:
                    break
        j += 1
    out = []
    for x in src[start + 1:j].strip().split("\n"):
        x = x.strip().rstrip(",")
        if x.startswith('"'):
            try:
                out.append(json.loads(x))
            except Exception:
                pass
    return out, j


def resolve_ref(src, expr):
    """`py:`/`cpp:` 뒤에 온 값이 배열 리터럴이 아닐 때 — `NAME` 또는
    `NAME.slice(a, b)` 형태를 풀어서 원래 상수를 찾아 돌려준다.
    (2026-09-23: 예전엔 이런 경우를 전부 "안전" 으로 치고 건너뛰었는데,
    `permutation` 처럼 **타이핑된 상수를 변수로만 참조하는** quest 를 통째로
    놓쳤다. 이제 정의를 실제로 찾아서 푼다. 못 찾으면(동적 표현식 등) None.)"""
    m = re.match(r"([A-Za-z_]\w*)(\.slice\(([^)]*)\))?", expr)
    if not m:
        return None
    name, sliced, args_s = m.group(1), m.group(2), m.group(3)
    dm = re.search(r"\bconst\s+%s\s*=\s*\[" % re.escape(name), src)
    if not dm:
        return None
    arr, _ = array_literal(src, dm.end() - 1)
    if sliced:
        args = [a.strip() for a in args_s.split(",")] if args_s.strip() else []
        try:
            if len(args) == 1:
                arr = arr[int(args[0]):]
            elif len(args) == 2:
                arr = arr[int(args[0]):int(args[1])]
        except ValueError:
            pass  # 못 풀면 전체(arr) 그대로 — 더 넓게 보는 쪽이 덜 위험하다
    return arr


def sections(src, key):
    """`get*Sections` 안의 `py:` / `cpp:` 를 순서대로 풀어서 문자열 리스트로."""
    m = re.search(r"export function get\w*Sections\s*\(", src)
    if not m:
        return None
    # ⚠️ 2026-09-23: 여기도 문자열 안의 `{`/`}` 를 세면 안 된다 — cpp 코드 줄엔
    #    `"int main() {"` 처럼 중괄호가 흔해서, 그걸 세면 함수 몸통이 **너무 일찍
    #    닫혀서 뒤 섹션이 통째로 잘린다.** (array_literal 과 같은 이유로 같은 처방.)
    i, depth, started, in_str, esc = m.end(), 0, False, False, False
    while i < len(src):
        c = src[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c == "{":
                depth += 1
                started = True
            elif c == "}":
                depth -= 1
                if started and depth == 0:
                    break
        i += 1
    body = src[m.end():i]
    out, typed = [], False
    for km in re.finditer(r"\b%s:\s*" % key, body):
        rest = body[km.end():].lstrip()
        if rest.startswith("["):
            typed = True
            arr, _ = array_literal(rest, 0)
            out.extend(arr)
            continue
        resolved = resolve_ref(src, rest)
        if resolved is None:
            # 정말 못 푸는 동적 표현식(삼항·함수 호출 결과 등) — 이전처럼 보수적으로 건너뜀
            return None
        typed = True
        out.extend(resolved)
    return out if typed else None


def unreachable_py_funcs(text):
    """top-level 함수 중 top-level 실행문에서 (직접/간접) 안 불리는 것.
    반환: (파싱실패메시지 or None, [함수이름, ...])"""
    try:
        tree = ast.parse(text)
    except SyntaxError as e:
        return (str(e), [])

    def names_used(node_list):
        used = set()
        for stmt in node_list:
            for n in ast.walk(stmt):
                if isinstance(n, ast.Name):
                    used.add(n.id)
                elif isinstance(n, ast.Attribute):
                    # obj.method() 류는 이름만으론 추적 불가 — 관대하게 쓴 것으로 침
                    used.add(n.attr)
        return used

    defs = {n.name: n for n in tree.body
            if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))}
    if not defs:
        return (None, [])

    non_def_top = [n for n in tree.body
                   if not isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef,
                                          ast.Import, ast.ImportFrom, ast.ClassDef))]
    frontier = names_used(non_def_top) & defs.keys()
    reached = set()
    while frontier:
        reached |= frontier
        nxt = set()
        for name in frontier:
            nxt |= names_used(defs[name].body) & defs.keys()
        frontier = nxt - reached

    return (None, sorted(defs.keys() - reached))


def unreachable_cpp_funcs(text):
    """top-level 함수(main 제외) 중 자기 몸통 밖에서 `이름(` 꼴로 한 번도 안 불리는 것."""
    sig_re = re.compile(
        r"(?:^|\n)[ \t]*(?:[A-Za-z_][\w:<>,\*&\s]*?)\s+([A-Za-z_]\w*)\s*\([^;{}]*\)\s*\{"
    )
    funcs = []  # (name, body_start, body_end)
    for m in sig_re.finditer(text):
        name = m.group(1)
        if name in ("if", "for", "while", "switch", "return", "main"):
            if name != "main":
                continue
        sig_start = m.start()
        brace = text.index("{", m.end() - 1)
        i, depth = brace, 0
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        # ⚠️ 시그니처 줄 자체에도 `이름(` 이 있다 (`bool search(int idx) {`).
        #    "밖에서 불렸나" 를 볼 때 **시그니처부터 몸통 끝까지 통째로** 빼야
        #    자기 선언을 자기 호출로 착각하지 않는다 (처음엔 몸통만 뺐다가
        #    모든 함수가 "불렸다" 로 나오는 거짓음성을 만들었다 — 20건 표본 확인 중 발견).
        funcs.append((name, sig_start, i))

    unreached = []
    for name, sig_start, body_end in funcs:
        if name == "main":
            continue
        # ⚠️ 호출(`name(`) 뿐 아니라 **값으로 넘기는 것도 쓴 것으로 친다**
        #    (`sort(v.begin(), v.end(), byTime)` 처럼 함수 이름만 쓰고 `(` 가 안 붙는
        #    경우가 실제로 있었다 — `cowntrace` 의 `byTime` 비교자. 20건 표본 확인 중
        #    거짓양성으로 잡혀서, "부르거나 값으로 쓰거나" 로 관대하게 넓혔다.)
        ref_re = re.compile(r"\b%s\b" % re.escape(name))
        outside = ref_re.search(text, 0, sig_start) or ref_re.search(text, body_end)
        if not outside:
            unreached.append(name)
    return unreached


def check(quest):
    f = "quest-problems/%s/components.jsx" % quest
    try:
        src = io.open(f, encoding="utf-8", errors="replace").read()
    except OSError:
        return []
    problems = []

    cpp = sections(src, "cpp")
    if cpp:
        text = "\n".join(cpp)
        miss = []
        if "#include" not in text:
            miss.append("#include")
        if "int main" not in text:
            miss.append("int main")
        if "using namespace" not in text and "std::" not in text:
            miss.append("using namespace std / std::")
        if miss:
            problems.append(("cpp", "빠진 것: " + " · ".join(miss),
                             cpp[0] if cpp else "(빈 조각)"))
        if "int main" in text:  # main 없으면 함수 위치 판단이 의미 없다
            unreached = unreachable_cpp_funcs(text)
            if unreached:
                problems.append(("cpp",
                                 "정의됐지만 안 불리는 함수: " + " · ".join(unreached),
                                 cpp[0] if cpp else ""))

    py = sections(src, "py")
    if py:
        text = "\n".join(py)
        # 파이썬은 머리가 덜 중요하지만, input()/sys 를 쓰면서 import sys 가 없으면 깨진다
        if re.search(r"\bsys\.", text) and "import sys" not in text:
            problems.append(("py", "빠진 것: import sys", py[0] if py else ""))
        parse_err, unreached = unreachable_py_funcs(text)
        if parse_err:
            problems.append(("py", "파싱 못 함: " + parse_err, py[0] if py else ""))
        elif unreached:
            problems.append(("py",
                             "정의됐지만 (직접/간접으로) top-level 에서 안 불리는 함수: "
                             + " · ".join(unreached),
                             py[0] if py else ""))
    return problems


def main():
    want = [a for a in sys.argv[1:] if not a.startswith("-")]
    quests = want or sorted(p.split("/")[1] for p in glob.glob("quest-problems/*/components.jsx"))
    hits = {}
    looked = 0
    for q in quests:
        if sections(io.open("quest-problems/%s/components.jsx" % q,
                            encoding="utf-8", errors="replace").read(), "cpp") is not None:
            looked += 1
        p = check(q)
        if p:
            hits[q] = p

    n = sum(len(v) for v in hits.values())
    print(f"학생이 내려받으면 안 도는 코드 — {n}곳 · quest {len(hits)}개")
    print(f"(코드를 손으로 타이핑한 조각을 가진 quest {looked}개만 본다 — "
          f"`.slice()` 로 자른 것은 원본 그대로라 안전하다)\n")
    for q in sorted(hits):
        for lang, why, head in hits[q]:
            print(f"  🚨 {q} [{lang}] {why}")
            print(f"       첫 줄: {head!r}")
    if not hits:
        print("  0곳.\n")
    print("\n고치는 법 — 조각을 `FULL_PY.slice(a, b)` 로 자르면 이 문제가 **구조적으로** 안 생긴다.")
    print("   원본이 한 벌로 남으니 머리가 빠질 수가 없다. `prove-sections-cover-code.py` 로 증명해라.")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
