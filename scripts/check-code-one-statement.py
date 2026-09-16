#!/usr/bin/env python3
"""학생이 읽을 코드에 **한 줄에 문장이 여러 개** 있는 자리를 찾는다.

왜 있나 — 선생님(2026-09-08) "코드 보기 좋게 해줘 한줄에 여러개 쓰지 말고",
그리고 (2026-09-15, 두 번째) "코드는 한줄에 여러개가 있고 보기 않좋아서 읽기 싫던데."
두 번째 지적이 나온 이유는 **아무도 이걸 검사 항목으로 안 봤기** 때문이다.
검토자는 내가 물은 것만 본다. 그러니 사람 말고 기계가 매번 보게 만든다.

왜 중요한가 — CodeWalk 는 말풍선을 **줄 단위**로 붙인다. 한 줄에 두 문장이 있으면
그 줄에 붙는 말풍선은 둘 중 무엇을 가리키는지 말할 수가 없다. 도구를 못 쓰게 만든다.

쓰는 법
    python3 scripts/check-code-one-statement.py            # quest 전체 요약
    python3 scripts/check-code-one-statement.py buymilk    # 한 quest 만, 줄까지
    python3 scripts/check-code-one-statement.py --all      # 전부 줄까지

⚠️ 이 검사기는 **아는 모양만** 찾는다. "0건" 은 결백의 증거가 아니다
   (memory/feedback_checkers_can_be_silently_wrong.md). 눈으로도 한 번 봐라.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEST_DIR = ROOT / "quest-problems"

# 코드 배열로 쓰이는 변수 이름 (뒤에 오는 [ ... ] 안이 코드 줄들이다)
# ⚠️ 2026-09-16 담당자가 잡았다 — `export const` 를 못 보고 있었다.
#    `swaptowin` 의 `FULL_CPP` 가 `export const` 라서 **같은 위반인데 안 걸렸다.**
#    저장소 전체로 세니 그런 배열이 **70개**다. 그만큼 덜 보고 "0줄" 이라고 해온 것이다.
CODE_VAR = re.compile(
    r"^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*(?:PY|CPP|CODE|_py|_cpp))\s*=\s*\[\s*$"
)
STR_LINE = re.compile(r'^\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$')


def strip_noise(line, lang):
    """주석과 문자열 리터럴을 지운다 — 그 안의 ; 는 문장 구분이 아니다."""
    out, i, n = [], 0, len(line)
    while i < n:
        ch = line[i]
        if lang == "cpp" and line.startswith("//", i):
            break
        if lang == "py" and ch == "#":
            break
        if ch in "\"'":
            quote = ch
            i += 1
            while i < n:
                if line[i] == "\\":
                    i += 2
                    continue
                if line[i] == quote:
                    i += 1
                    break
                i += 1
            out.append("S")          # 문자열 하나를 기호 하나로 남긴다
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def split_top_level(code):
    """괄호 밖에 있는 ; 로만 자른다 (for 헤더 안의 ; 는 문장 구분이 아니다)."""
    parts, depth, cur = [], 0, []
    for ch in code:
        if ch in "([{":
            depth += 1
        elif ch in ")]}":
            depth -= 1
        if ch == ";" and depth == 0:
            parts.append("".join(cur))
            cur = []
            continue
        cur.append(ch)
    parts.append("".join(cur))
    return parts


def header_end(code, kw):
    """`for (` / `if (` 의 닫는 괄호 바로 뒤 위치. 못 찾으면 -1."""
    start = code.find(kw)
    if start < 0:
        return -1
    p = code.find("(", start)
    if p < 0:
        return -1
    depth = 0
    for i in range(p, len(code)):
        if code[i] == "(":
            depth += 1
        elif code[i] == ")":
            depth -= 1
            if depth == 0:
                return i + 1
    return -1


def findings_for(raw, lang):
    """이 한 줄의 문제들을 [(종류, 설명)] 로."""
    code = strip_noise(raw, lang).rstrip()
    body = code.strip()
    if not body:
        return []
    hits = []

    if lang == "cpp":
        for kw in ("for", "while", "if"):
            if re.match(rf"^\s*(\}}\s*else\s+)?{kw}\s*\(", code):
                e = header_end(code, kw)
                if e > 0:
                    rest = code[e:].strip()
                    if rest and rest not in ("{", "{}"):
                        hits.append(("제어문 본문이 헤더와 같은 줄", f"{kw} (...) {rest}"))
                break
        stmts = [s.strip() for s in split_top_level(code) if s.strip()]
        real = [s for s in stmts if s not in ("{", "}", "};")]
        if len(real) >= 2 and not hits:
            hits.append(("문장 두 개가 한 줄", " ; ".join(real[:3])))
        # ll a = 1, b = 2;  — 선언 여러 개
        # ⚠️ 2026-09-16 A-4 담당자가 오탐을 잡았다. `walkfence` 의
        #    `if (px == qx && min(py,qy) <= y && y <= max(py,qy)) {` 를 "선언 여러 개" 로 봤다.
        #    `==` · `<=` · `>=` · `!=` 의 `=` 가 대입으로 세어진 것이다.
        #    → **비교 연산자를 먼저 지우고** 센다.
        cmp_gone = re.sub(r"[=!<>+\-*/%&|^]=|=[=]", "@", code)
        if (cmp_gone.count("=") >= 2
                and re.search(r"=[^=;]+,[^;]*=", cmp_gone)
                and "for" not in code):
            hits.append(("선언·대입 여러 개가 한 줄", body))
    else:
        stmts = [s.strip() for s in split_top_level(code) if s.strip()]
        if len(stmts) >= 2:
            hits.append(("문장 두 개가 한 줄", " ; ".join(stmts[:3])))
        # ⚠️ 콜론을 단순히 `[^:]*:` 로 찾으면 **슬라이스**에 걸린다.
        #    2026-09-16 A-3 담당자가 잡았다 — `if doubled[i:i+N] == b:` 를
        #    "본문이 헤더에 붙었다" 로 오탐했다. `[i:i+N]` 의 콜론이 먼저 걸린 것이다.
        #    제어문의 콜론은 **괄호 밖(깊이 0)에 있는 마지막 콜론**이다.
        kw = re.match(r"^\s*(if|elif|for|while|else|with|try|except|finally)\b", code)
        if kw:
            depth, colon = 0, -1
            for i, ch in enumerate(code):
                if ch in "([{":
                    depth += 1
                elif ch in ")]}":
                    depth -= 1
                elif ch == ":" and depth == 0:
                    colon = i
            if colon >= 0:
                rest = code[colon + 1:].strip()
                if rest:
                    hits.append(("제어문 본문이 헤더와 같은 줄", body))

    if re.search(r"\?[^?:]+:", code) and lang == "cpp" and "://" not in code:
        hits.append(("삼항 연산자", body))
    if lang == "py" and re.search(r"\S\s+if\s+.+\s+else\s+\S", code):
        hits.append(("삼항 연산자", body))
    return hits


def scan_file(path):
    """{변수이름: [(줄번호(1부터), 원문, [(종류, 설명)])]}"""
    text = path.read_text(encoding="utf-8", errors="replace").split("\n")
    out, i = {}, 0
    while i < len(text):
        m = CODE_VAR.match(text[i])
        if not m:
            i += 1
            continue
        name = m.group(1)
        lang = "cpp" if re.search(r"CPP|_cpp", name) else "py"
        i += 1
        lineno, rows = 0, []
        while i < len(text) and not re.match(r"^\s*\];", text[i]):
            sm = STR_LINE.match(text[i])
            if sm:
                lineno += 1
                raw = sm.group(1).replace('\\"', '"').replace("\\\\", "\\")
                f = findings_for(raw, lang)
                if f:
                    rows.append((lineno, raw, f))
            i += 1
        if rows:
            out[name] = rows
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    show_all = "--all" in sys.argv
    # ⚠️ 2026-09-16 감사 지적: 전에는 `*/components.jsx` 만 봤다.
    #    그런데 코드 배열이 `chapters.jsx` 에도 **사본**으로 있는 quest 가 있다
    #    (comfycows 가 그렇다 — 물리적으로 두 곳에 따로 있다).
    #    한쪽만 고치면 **화면 두 곳이 서로 다른 코드를 보여준다.**
    #    오늘 mcc20zigzag·mcc21simplemath 에서 실제로 겪었다.
    files = sorted(QUEST_DIR.glob("*/*.jsx"))
    if args:
        files = [f for f in files if f.parent.name in args]   # 폴더 이름으로 고른다
        if not files:
            print(f"그런 quest 가 없다: {', '.join(args)}")
            return 1
        show_all = True

    total_lines = total_quests = 0
    rows = []
    for f in files:
        res = scan_file(f)
        if not res:
            continue
        n = sum(len(v) for v in res.values())
        total_lines += n
        total_quests += 1
        label = f.parent.name if f.name == "components.jsx" else f"{f.parent.name}({f.stem})"
        rows.append((n, label, res))

    rows.sort(reverse=True)
    print(f"한 줄에 문장이 여러 개 — {total_lines}줄 · quest {total_quests}개\n")

    for n, quest, res in rows:
        qdir = quest.split("(")[0]
        comp = QUEST_DIR / qdir / "components.jsx"
        locked = "🔒 " if comp.exists() and "USACO_VERIFIED" in comp.read_text(
            encoding="utf-8", errors="replace")[:600] else "   "
        print(f"{locked}{quest:<22} {n}줄")
        if not show_all:
            continue
        for name, items in res.items():
            print(f"     [{name}]")
            for lineno, raw, finds in items:
                kinds = " · ".join(sorted({k for k, _ in finds}))
                print(f"       {lineno:>3}: {raw.strip()[:88]}")
                print(f"            → {kinds}")
        print()

    if not show_all and rows:
        print("\n  줄까지 보려면: python3 scripts/check-code-one-statement.py <quest 이름>")
    print("\n⚠️ 아는 모양만 찾는다. 0건이어도 눈으로 한 번 봐라.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
