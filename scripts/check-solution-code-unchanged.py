#!/usr/bin/env python3
"""quest 의 **정답 코드 배열**이 이번 변경에서 바뀌었나 — sha256 으로 증명한다.

## 왜 이게 생겼나 (2026-09-25)

오늘 quest **30개**를 CodeWalk 으로 옮기면서, 묶음마다 내가 **손으로** 이 대조를 돌렸다
(보호 변수 60개 전부 동일 확인). 손으로 돌리는 검사는 **잊는 날 조용히 뚫린다** —
이 저장소는 그걸 이미 여러 번 겪었다(`check-frozen.py` 가 자문 도구였던 동안
동결 quest 의 검증 코드를 건드린 커밋이 나갔다가 되돌려졌다).

### ⚠️ `check-frozen.py` 와 **다른 층이다. 합치지 마라**
`check-frozen.py` 는 **헤더에 `// 🔒 USACO_VERIFIED` 가 있는 파일**의 보호 변수만 막는다.
그런데 2026-09-25 실측 — **`USACO_VERIFICATION.md` 는 통과라고 적어 놨는데 파일에
배지가 없는 quest 가 24개**다(`abcs` 10/10 · `daisychains` 10/10 · `socialdist1` 15/15 ·
`swapity` 13/13 · `triangles` · `uddered` · `yearcow` · `mcc15*` 넷 · 2023·2024 묶음 등).
**그 24개의 정답 코드는 아무 걸쇠도 안 지킨다.**
이 검사기는 **배지와 무관하게** 「정답 코드 배열이 바뀌었나」만 본다.

⛔ **바뀌었다고 곧 잘못이 아니다.** 선생님이 코드 수정을 지시한 경우가 있다.
   이건 **판정이 아니라 「눈으로 읽어라」는 신호**다 — 알고리즘이 깨졌는지는 사람이 본다.
   CLAUDE.md: *"채점기 통과한 코드를 「더 깔끔하게」 수정하면 알고리즘 깨질 위험 큼."*

## 무엇을 보나

`quest-problems/*/*.jsx|tsx` 에서 이름이 아래에 맞는 **배열 리터럴**을 뽑아
`git show <ref>:<파일>` 의 같은 이름과 sha256 을 대조한다.

  `SOLUTION_CODE` · `*_PY` · `*_CPP` · `FULL_*`
  (⛔ `*KEYWORD*` 는 뺀다 — 문법 강조용 낱말 목록이고 코드가 아니다)

```bash
python3 scripts/check-solution-code-unchanged.py              # 워킹트리 vs HEAD
python3 scripts/check-solution-code-unchanged.py --staged     # 인덱스 vs HEAD
python3 scripts/check-solution-code-unchanged.py --ref <sha>  # 그 커밋과 대조
python3 scripts/check-solution-code-unchanged.py moohunt      # 한 quest 만
```

## 이 검사기가 **못 보는 것** (0건이 결백이 아니다)

- **배열 리터럴만 본다.** 코드가 문자열 하나(`` `...` ``)나 함수 안에서 만들어지면 못 본다.
- **이름 규칙에 맞는 것만 본다.** `M3_MAP_CPP` 처럼 접두어가 붙어도 `_CPP` 로 끝나면
  잡히지만, 아예 다른 이름(`ANSWER`·`CODE1`)이면 **안 걸린다.**
- **뜻이 바뀌었나는 안 본다.** 공백 하나만 달라도 «바뀌었다» 고 한다.
  줄만 폈는지 뜻이 바뀌었는지는 `scripts/prove-same-program.py` 가 **증명한다** —
  이 검사기가 걸리면 **그걸 이어서 돌려라.** 둘은 순서대로 쓰는 도구다.
- **새로 생긴 배열·지워진 배열도 찍는다** — 파일을 나누는 정당한 작업일 수 있다.
"""
import glob
import hashlib
import io
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# ⚠️ 2026-09-25 넓힘 — 처음엔 **대문자 이름만** 봤다. 그런데 감사 담당이
#   `simplegame` 의 정답 코드가 `const fullPy = (E) => [...]`(소문자 카멜)이라
#   **`check-frozen.py` 의 `PROTECTED_NAME_RE`(`.*_(PY|CPP)$`)도, 이 검사기도 못 잡는다**
#   고 보고했다. 전수로 재니 그런 이름은 **quest 2개**뿐이었다 —
#   `simplegame`(`fullPy`, **진짜 최종 코드**)과 `mooin2`(`brute*Py/Cpp`, 브루트 시연 조각).
#   ⭐ 화살표 함수 뒤에 배열이 오는 모양(`= (E) => [`)도 같이 받는다.
NAME = re.compile(
    r'\b((?:SOLUTION_CODE|FULL_[A-Z0-9_]+|[A-Z0-9_]*_(?:PY|CPP)'
    r'|[a-z][A-Za-z0-9]*(?:Py|Cpp|Code)))\s*=\s*(?:\([^)]*\)\s*=>\s*)?\[')


def sh(args):
    return subprocess.run(args, cwd=ROOT, capture_output=True, text=True).stdout


def arrays(src):
    """이름 -> 배열 리터럴의 sha256(앞 12자)."""
    out = {}
    for m in NAME.finditer(src):
        name = m.group(1)
        if "KEYWORD" in name:
            continue
        depth, i = 0, m.end() - 1
        while i < len(src):
            if src[i] == "[":
                depth += 1
            elif src[i] == "]":
                depth -= 1
                if depth == 0:
                    i += 1
                    break
            i += 1
        out[name] = hashlib.sha256(src[m.end():i].encode()).hexdigest()[:12]
    return out


def main():
    argv = sys.argv[1:]
    ref = "HEAD"
    if "--ref" in argv:
        k = argv.index("--ref")
        ref = argv[k + 1]
        argv = argv[:k] + argv[k + 2:]
    staged = "--staged" in argv
    only = [a for a in argv if not a.startswith("-")]

    files = sorted(glob.glob(os.path.join(ROOT, "quest-problems/*/*.jsx"))
                   + glob.glob(os.path.join(ROOT, "quest-problems/*/*.tsx")))
    changed, added, removed = [], [], []
    seen_q = set()
    n_vars = 0
    for f in files:
        rel = os.path.relpath(f, ROOT)
        q = rel.split("/")[1]
        if only and q not in only:
            continue
        old_src = sh(["git", "show", f"{ref}:{rel}"])
        if not old_src:
            continue                    # 새 파일 — 대조할 옛 판이 없다
        new_src = (sh(["git", "show", ":" + rel]) if staged
                   else io.open(f, encoding="utf-8", errors="replace").read())
        if not new_src:
            continue
        a, b = arrays(old_src), arrays(new_src)
        n_vars += len(b)
        seen_q.add(q)
        badge = "USACO_VERIFIED" in new_src[:4000]
        for k in sorted(set(a) | set(b)):
            if k not in b:
                removed.append((q, rel, k, badge))
            elif k not in a:
                added.append((q, rel, k, badge))
            elif a[k] != b[k]:
                changed.append((q, rel, k, badge, a[k], b[k]))

    where = "인덱스(staged)" if staged else "워킹트리"
    print(f"정답 코드 배열 대조 — {where} vs `{ref}` "
          f"· 변수 {n_vars}개 · quest {len(seen_q)}개\n")
    if not (changed or added or removed):
        print("  ✅ 바뀐 것 없음.")
    for q, rel, k, badge, oldh, newh in changed:
        mark = "🔒" if badge else "⚠️ 배지없음"
        print(f"  🚨 {q:<16} {k:<18} {oldh} → {newh}   {mark}")
        print(f"       {rel}")
    for q, rel, k, badge in added:
        print(f"  ➕ {q:<16} {k:<18} 새로 생겼다   {'🔒' if badge else '⚠️ 배지없음'}")
    for q, rel, k, badge in removed:
        print(f"  ➖ {q:<16} {k:<18} 없어졌다     {'🔒' if badge else '⚠️ 배지없음'}")

    if changed:
        print("\n⛔ **바뀌었다고 곧 잘못이 아니다.** 선생님이 코드 수정을 지시한 경우가 있다.")
        print("   다만 **눈으로 읽어라** — 「더 깔끔하게」 고치다 알고리즘이 깨지는 사고가")
        print("   이 저장소의 가장 비싼 회귀다(CLAUDE.md 🔒 절).")
        print("⭐ 다음으로 이걸 돌려라 — **줄만 폈나, 뜻이 바뀌었나를 증명한다**:")
        print("     python3 scripts/prove-same-program.py 옛.py 새.py")
        print("   (파이썬은 AST, C++ 은 어셈블리로 대조한다. 이 검사기는 공백 하나도")
        print("    「바뀌었다」고 하므로, 뜻이 같은지는 그쪽이 답한다.)")
        print("⚠️ 바뀐 파일에 `USACO_VERIFIED` 배지가 있으면 **재제출이 필요하다** —")
        print("   그건 선생님 로그인 몫이다. 배지가 없어도 `USACO_VERIFICATION.md` 를 봐라.")
    print("\n⚠️ `check-frozen.py` 와 **다른 층이다** — 그건 **배지가 있는 파일**만 막는다.")
    print("   2026-09-25 실측: 문서는 통과라는데 **배지가 없는 quest 가 24개**다.")
    print("   그 24개는 그쪽 걸쇠가 안 지킨다 — 이 검사기는 **배지와 무관하게** 본다.")
    print("⚠️ **0건이 결백이 아니다** — 배열 리터럴·이름 규칙에 맞는 것만 본다.")
    return 1 if changed else 0


if __name__ == "__main__":
    sys.exit(main())
