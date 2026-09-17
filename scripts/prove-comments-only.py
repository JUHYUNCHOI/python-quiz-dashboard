#!/usr/bin/env python3
"""코드 배열에서 **주석만** 바뀌었나를 증명한다 (코드 줄은 글자까지 같아야 한다).

왜 (2026-09-17): 선생님 *"주석이 한국어인데 영어로 나와있어"* — quest 코드 안 주석
562줄이 영어였다. 이걸 여러 명이 나눠 고치는데, 실수로 **코드 줄**을 건드리면
알고리즘이 조용히 깨진다. 🔒 quest 는 USACO 재제출까지 필요해진다.

`prove-same-program.py` 는 파일 두 개를 AST·어셈블리로 대조한다. 이건 다르다 —
`git` 의 HEAD 판과 지금 판을 놓고 **배열의 줄 수 · 코드 줄 · 꼬리 주석 앞의 코드**가
모두 같은지 본다. 화면에 안 뜨는 것까지 본다는 뜻이다.

  python3 scripts/prove-comments-only.py                    # 지금 바뀐 quest 전부
  python3 scripts/prove-comments-only.py mcc19palindrome    # 하나만
  python3 scripts/prove-comments-only.py --base HEAD~3      # 다른 기준과 비교

나가는 값: 코드가 한 글자라도 다르면 1, 전부 주석만 바뀌었으면 0.
"""
import io
import json
import re
import subprocess
import sys

STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
CODE_ARRAY = re.compile(r"\[\s*\n((?:[ \t]*\"(?:[^\"\\]|\\.)*\",[ \t]*\n)+)[ \t]*\]")
CPP_SIGN = re.compile(r"^\s*(#include|using namespace|int main|template\s*<)")


def arrays(src):
    """[(배열 시작 오프셋, [줄들])] — 코드 배열만."""
    out = []
    for m in CODE_ARRAY.finditer(src):
        vals = []
        for sm in STR.finditer(m.group(1)):
            try:
                vals.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                return []          # 못 읽으면 이 파일은 통째로 포기한다 (조용히 통과시키지 않는다)
        if vals:
            out.append((m.start(), vals))
    return out


def code_part(line, cpp):
    """주석을 떼고 **코드만** 남긴다. 파이썬은 `#`, C++ 는 `//` 만 주석이다.
    ⚠️ 파이썬의 `//` 는 나눗셈이다 — 언어를 안 보면 코드를 잘라 버린다."""
    mark = "//" if cpp else "#"
    q = None
    i = 0
    while i < len(line):
        c = line[i]
        if q:
            if c == "\\":
                i += 2
                continue
            if c == q:
                q = None
            i += 1
            continue
        if c in "\"'":
            q = c
            i += 1
            continue
        if line.startswith(mark, i):
            return line[:i].rstrip()
        i += 1
    return line.rstrip()


def show(rev, path):
    r = subprocess.run(["git", "show", f"{rev}:{path}"],
                       capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def uses_codewalk(path):
    """이 quest 가 CodeWalk `hi` 를 쓰나. 안 쓰면 줄이 늘어도 말풍선이 안 밀린다."""
    import glob as _g
    quest = path.split("/")[1]
    for f in _g.glob(f"quest-problems/{quest}/*.jsx"):
        if re.search(r"\bhi:\s*\[", io.open(f, encoding="utf-8", errors="replace").read()):
            return True
    return False


def changed_files(base):
    r = subprocess.run(["git", "diff", "--name-only", base, "--", "quest-problems"],
                       capture_output=True, text=True)
    return [x for x in r.stdout.split("\n") if x.endswith(".jsx")]


def main():
    argv = sys.argv[1:]
    base = "HEAD"
    if "--base" in argv:
        i = argv.index("--base")
        base = argv[i + 1]
        del argv[i:i + 2]          # ⚠️ 값까지 빼야 한다 — 안 그러면 quest 이름으로 오해한다
    args = [a for a in argv if not a.startswith("--")]

    files = changed_files(base)
    if args:
        files = [f for f in files if f.split("/")[1] in set(args)]

    if not files:
        print(f"{base} 대비 바뀐 quest 파일이 없다.")
        return 0

    bad, checked, comment_lines = [], 0, 0
    for path in files:
        old_src = show(base, path)
        if old_src is None:
            print(f"  … {path} — {base} 에 없는 새 파일, 건너뜀")
            continue
        new_src = io.open(path, encoding="utf-8", errors="replace").read()
        old_a, new_a = arrays(old_src), arrays(new_src)

        if len(old_a) != len(new_a):
            bad.append((path, f"코드 배열 개수가 {len(old_a)} → {len(new_a)} 로 바뀌었다"))
            continue

        for idx, ((_, o), (_, n)) in enumerate(zip(old_a, new_a)):
            if len(o) != len(n):
                tail = ("— CodeWalk `hi` 가 전부 밀린다. 다시 매겼나?"
                        if uses_codewalk(path)
                        else "— 이 quest 는 `hi` 를 안 쓰니 말풍선은 안 밀린다. "
                             "그래도 **주석만 고치는 작업이 아니다**")
                bad.append((path, f"{idx + 1}번째 배열의 줄 수가 {len(o)} → {len(n)} {tail}"))
                continue
            cpp = any(CPP_SIGN.match(x) for x in n)
            for ln, (a, b) in enumerate(zip(o, n), 1):
                ca, cb = code_part(a, cpp), code_part(b, cpp)
                if ca != cb:
                    bad.append((path, f"{idx + 1}번째 배열 {ln}번 줄의 **코드**가 바뀌었다\n"
                                      f"        옛: {ca}\n        새: {cb}"))
                elif a != b:
                    comment_lines += 1
            checked += 1

    print(f"{base} 대비 — 코드 배열 {checked}개 · 주석만 바뀐 줄 {comment_lines}개")
    if bad:
        print(f"\n🚨 코드가 바뀐 자리 {len(bad)}건 — 되돌려라\n")
        for path, why in bad:
            print(f"  ❌ {path}\n      {why}")
        return 1
    print("✅ 코드 줄은 글자까지 그대로다. 바뀐 것은 주석뿐이다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
