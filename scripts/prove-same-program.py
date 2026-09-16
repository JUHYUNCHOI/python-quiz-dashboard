#!/usr/bin/env python3
"""두 코드가 **같은 프로그램**인지 기계로 증명한다 (줄만 폈을 때 쓰는 것).

왜 있나 — 🔒 USACO_VERIFIED quest 91개에 "한 줄에 문장 여러 개" 가 541줄 있다.
줄을 펴려면 규칙상 **USACO 재제출**이 필요한데, 91번 재제출은 선생님께 큰 부담이다.
그래서 "안 바뀌었다" 를 **말이 아니라 증명으로** 대신한다.

  · 파이썬 — `ast.dump(ast.parse(...))` 가 같으면 **같은 프로그램**이다 (줄 번호만 다름)
  · C++   — 어셈블리(`-S`)를 정규화해 비교한다. 같으면 **같은 실행파일**이다

⚠️ **이 증명이 커버하지 못하는 것** (2026-09-16 감사 지적):
   **CodeWalk 의 `hi` 말풍선 번호는 증명 밖이다.** 줄을 펴면 코드는 똑같이 돌면서
   말풍선만 엉뚱한 줄을 가리킬 수 있는데, AST 도 어셈블리도 그걸 못 잡는다.
   `hi` 가 있는 quest 는 **브라우저에서 눈으로 확인**해야 한다. 이 도구로 갈음하지 마라.

⚠️ C++ 성립 조건 넷 (2026-09-16 cpp-qa 가 반례를 찾아 밝힌 것):
   ① **같은 파일 이름**으로 컴파일해야 한다 — `<iostream>` 을 쓰면
      `__GLOBAL__sub_I_<파일명>` 심볼이 생겨서, 내용이 같아도 이름이 다르면 다르게 나온다.
   ② **`-g` 를 쓰지 마라** — DWARF 가 선언 줄 번호를 raw 바이트로 박아서 정규화로 못 지운다.
   ③ **진짜 GNU g++ 로 해라.** macOS 의 `g++` 는 **Apple clang 의 별명**이다(실측).
      이 도구는 GNU g++ 를 찾아서 쓰고, 없으면 그렇다고 말한다.
   ④ **`cout << (삼항) << ...` 은 분기마다 통째로 복제하지 마라.**
      `if(c){cout<<a<<"\\n";}else{cout<<b<<"\\n";}` 로 펴면 **어셈블리가 달라진다**
      (GCC 가 중복된 `operator<<` 호출을 합치지 않는다). 출력은 같은데 증명이 깨진다.
      대신 **임시 변수 + 호출 한 번**으로: `int out; if(c){out=a;}else{out=b;} cout<<out<<"\\n";`
      → 그러면 다시 완전히 같아진다 (astral 실물로 확인).

쓰는 법
    python3 scripts/prove-same-program.py 옛.py 새.py
    python3 scripts/prove-same-program.py 옛.cpp 새.cpp
"""
import ast
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# 줄 번호·파일 이름에서 나오는 것들만 지운다. 더 지우면 진짜 차이를 놓친다.
DROP = re.compile(r"^\s*\.(file|loc|cfi_\w+|ident|size|type|addrsig\w*)\b")
LABEL = re.compile(r"\b(LBB|Ltmp|LCPI|\.LBB|\.LC|\.L)\d+[\d_]*")


def gnu_gxx():
    """진짜 GNU g++ 를 찾는다. macOS 의 `g++` 는 Apple clang 이다."""
    for name in ("g++-15", "g++-14", "g++-13", "g++-12", "g++"):
        p = shutil.which(name)
        if not p:
            continue
        try:
            v = subprocess.run([p, "--version"], capture_output=True, text=True, timeout=20).stdout
        except Exception:
            continue
        if "clang" not in v.lower():
            return p, v.splitlines()[0]
    return None, None


def norm_asm(text):
    out = []
    for line in text.split("\n"):
        if DROP.match(line):
            continue
        out.append(LABEL.sub("L", line).rstrip())
    return "\n".join(l for l in out if l.strip())


def prove_py(a, b):
    try:
        da = ast.dump(ast.parse(Path(a).read_text()), include_attributes=False)
        db = ast.dump(ast.parse(Path(b).read_text()), include_attributes=False)
    except SyntaxError as e:
        return None, f"파싱 실패: {e}"
    return da == db, "AST 비교 (줄 번호 제외)"


def prove_cpp(a, b):
    gxx, ver = gnu_gxx()
    if not gxx:
        return None, ("진짜 GNU g++ 를 못 찾았다. 이 기계의 `g++` 는 Apple clang 이라\n"
                      "     채점기(GNU GCC)와 다른 걸 재게 된다. `brew install gcc` 후 다시.")
    results = []
    for opt in ("-O1", "-O2", "-O3"):     # -O0 은 채점기가 안 쓴다
        with tempfile.TemporaryDirectory() as d:
            asm = []
            for src in (a, b):
                # ⚠️ 조건① — 두 쪽을 **같은 파일 이름**으로 컴파일한다
                same = Path(d) / "prog.cpp"
                same.write_text(Path(src).read_text())
                r = subprocess.run([gxx, "-std=c++17", opt, "-S", "-o", "-", str(same)],
                                   capture_output=True, text=True, cwd=d)   # ⚠️ 조건② -g 없음
                if r.returncode:
                    return None, f"{opt} 컴파일 실패: {r.stderr.strip()[:200]}"
                asm.append(norm_asm(r.stdout))
            results.append((opt, asm[0] == asm[1]))
    ok = all(v for _, v in results)
    detail = f"{ver} · " + " ".join(f"{o}{'✅' if v else '❌'}" for o, v in results)
    if not ok:
        detail += ("\n     ⚠️ `cout << (삼항) << ...` 을 분기마다 통째로 복제해서 폈나?\n"
                   "        그러면 출력은 같아도 어셈블리가 달라진다.\n"
                   "        임시 변수 + 호출 한 번으로 바꿔라 — 그러면 다시 같아진다.")
    return ok, detail


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    a, b = sys.argv[1], sys.argv[2]
    for f in (a, b):
        if not os.path.exists(f):
            print(f"없는 파일: {f}")
            return 2
    ext = Path(a).suffix.lower()
    if ext == ".py":
        same, how = prove_py(a, b)
    elif ext in (".cpp", ".cc", ".cxx"):
        same, how = prove_cpp(a, b)
    else:
        print(f"파이썬(.py)과 C++(.cpp)만 된다: {ext}")
        return 2

    print(f"  방법: {how}")
    if same is None:
        print("  판정 못 함 ⚠️ — 위 내용을 보고 고쳐서 다시 돌려라")
        return 2
    if same:
        print("  ✅ **같은 프로그램이다.** 줄만 편 것이므로 USACO 재제출이 필요 없다.")
        print("     ⚠️ 단 CodeWalk `hi` 가 있으면 말풍선 번호는 이 증명 밖이다 — 화면으로 봐라.")
        return 0
    print("  ❌ **다르다.** 줄만 편 게 아니다. diff 를 눈으로 읽어라.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
