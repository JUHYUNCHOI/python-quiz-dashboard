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
"""
import glob
import io
import json
import re
import sys


def sections(src, key):
    """`get*Sections` 안의 `py:` / `cpp:` 를 순서대로. 문자열 배열만 (slice 는 안전)."""
    m = re.search(r"export function get\w*Sections\s*\(", src)
    if not m:
        return None
    i, depth, started = m.end(), 0, False
    while i < len(src):
        if src[i] == "{":
            depth += 1
            started = True
        elif src[i] == "}":
            depth -= 1
            if started and depth == 0:
                break
        i += 1
    body = src[m.end():i]
    out, typed = [], False
    for km in re.finditer(r"\b%s:\s*" % key, body):
        rest = body[km.end():].lstrip()
        if not rest.startswith("["):
            # ⚠️ 2026-09-21: 하나라도 변수·slice 로 넘긴 게 있으면 **진짜 코드가 거기 있다.**
            #    타이핑된 조각은 곁다리 메모다(hps·reflection 이 그랬다 — 오탐이었다).
            #    그런 quest 는 통째로 안전으로 본다.
            return None
        typed = True
        j, d = 0, 0
        while j < len(rest):
            if rest[j] == "[":
                d += 1
            elif rest[j] == "]":
                d -= 1
                if d == 0:
                    break
            j += 1
        for x in rest[1:j].strip().split("\n"):
            x = x.strip().rstrip(",")
            if x.startswith('"'):
                try:
                    out.append(json.loads(x))
                except Exception:
                    pass
    return out if typed else None


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

    py = sections(src, "py")
    if py:
        text = "\n".join(py)
        # 파이썬은 머리가 덜 중요하지만, input()/sys 를 쓰면서 import sys 가 없으면 깨진다
        if re.search(r"\bsys\.", text) and "import sys" not in text:
            problems.append(("py", "빠진 것: import sys", py[0] if py else ""))
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
