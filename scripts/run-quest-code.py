#!/usr/bin/env python3
"""quest 의 🔒 정답 코드를 **그 자리에서 실제로 돌려 본다.**

  python3 scripts/run-quest-code.py <quest-id> [--cpp] [--show] < 입력
  echo "..." | python3 scripts/run-quest-code.py feedcows
  python3 scripts/run-quest-code.py photoshoot --show        # 코드만 보고 안 돌림

──────────────────────────────────────────────────────────────────────────
왜 이게 생겼나 (2026-09-26)

「과정 시뮬」을 세 개 만들면서 **만들기 전에 예제를 🔒 코드로 돌려 검증**했다.
그때마다 `components.jsx` 에서 `FULL_PY` 배열을 정규식으로 뜯어 파일로 쓰고
`subprocess` 로 돌리는 **같은 보일러플레이트를 세 번** 손으로 다시 썼다.

그 검증이 값을 했다 — 셋 중 **하나가 떨어졌다**:
  · `feedcows`   예제 `GHHGGH`/K=1 → `4` · `.GH.GH`  ✅ 설계안과 일치
  · `photoshoot` 공식 샘플 N=14     → `1`            ✅ 일치
  · `swaptowin`  화면 손풀이는 **3번**인데 코드는 **1번**(`1 1 1 3`) ❌ **불일치**
    → 화면이 「같은 줄 안에서 먼저 찾는다」는 코드의 순서를 어기고 있었고,
      그대로 시뮬을 만들었으면 **틀린 길을 가르치며 완성**됐을 것이다.
      (`photoshoot` 이 정확히 그 사고의 잔해였다 — 이름이 비슷한 **다른 문제**의
       알고리즘을 애니메이션하다 시뮬째로 버려졌다.)

**손으로 기억해서 돌리는 절차는 잊는 날 뚫린다.** 그래서 도구로 만든다.

⚠️ **이건 판정 도구가 아니다.** 「화면이 말하는 답」을 기계가 알 수는 없다 —
   그건 사람이 화면을 읽어야 한다. 이 스크립트는 **비교의 한쪽(코드의 답)을
   손쉽게 얻게** 해 줄 뿐이다. 나머지 반은 여전히 사람 몫이다.

⚠️ 못 보는 것
   ① 배열 이름이 `FULL_PY`/`FULL_CPP`/`SOLUTION_CODE` 모양이 아닌 quest.
   ② 여러 파일에 코드가 나뉜 quest.
   ③ 입력 형식 — 그건 원문(`public/problems/<id>.pdf`)을 봐야 안다.
      형식을 틀리면 이 스크립트는 그냥 파이썬 에러를 보여준다(그것도 정보다).
──────────────────────────────────────────────────────────────────────────
"""
import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUESTS = ROOT / "quest-problems"

# `check-solution-code-unchanged.py` 와 **같은 이름 규칙**을 쓴다 — 거기서 소문자
# 카멜(`fullPy`)까지 넓힌 적이 있어서(simplegame) 그 교훈을 그대로 가져온다.
NAME_RE = {
    "py": re.compile(r"\b(FULL_PY|SOLUTION_CODE|[A-Z0-9_]*_PY|[a-z][A-Za-z0-9]*Py)\s*=\s*\["),
    "cpp": re.compile(r"\b(FULL_CPP|[A-Z0-9_]*_CPP|[a-z][A-Za-z0-9]*Cpp)\s*=\s*\["),
}


def extract(qid: str, lang: str):
    """quest 폴더에서 정답 코드 배열을 찾아 실제 소스 문자열로 돌려준다."""
    found = []
    for f in sorted(QUESTS.joinpath(qid).glob("*.jsx")):
        src = f.read_text(encoding="utf-8")
        for m in NAME_RE[lang].finditer(src):
            start = src.index("[", m.end() - 1)
            # 배열 끝을 대괄호 depth 로 찾는다 (문자열 안의 괄호는 안 센다)
            depth, i, in_str, quote = 0, start, False, ""
            while i < len(src):
                ch = src[i]
                if in_str:
                    if ch == "\\":
                        i += 2
                        continue
                    if ch == quote:
                        in_str = False
                elif ch in "\"'`":
                    in_str, quote = True, ch
                elif ch == "[":
                    depth += 1
                elif ch == "]":
                    depth -= 1
                    if depth == 0:
                        break
                i += 1
            body = src[start + 1:i]
            lines = []
            for raw in body.split("\n"):
                raw = raw.strip().rstrip(",")
                if not raw or raw.startswith("//"):
                    continue
                try:
                    lines.append(eval(raw))          # JS 문자열 리터럴 == 파이썬 리터럴
                except Exception:
                    return None, f"{f.name} 의 {m.group(1)} 안에 문자열이 아닌 줄이 있다: {raw[:60]}"
            found.append((f.name, m.group(1), "\n".join(lines)))
    if not found:
        return None, f"`{qid}` 에서 {lang} 정답 코드 배열을 못 찾았다 (이름 규칙 밖일 수 있다 — 맹점 ①)"
    if len(found) > 1:
        names = ", ".join(f"{f}:{n}" for f, n, _ in found)
        print(f"⚠️ 후보가 여럿이다 — 첫 번째를 쓴다: {names}", file=sys.stderr)
    return found[0], None


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("quest")
    ap.add_argument("--cpp", action="store_true", help="파이썬 대신 C++ 을 돌린다")
    ap.add_argument("--show", action="store_true", help="코드만 보여주고 안 돌린다")
    a = ap.parse_args()

    if not QUESTS.joinpath(a.quest).is_dir():
        print(f"⛔ `{a.quest}` 폴더가 없다.")
        sys.exit(2)

    lang = "cpp" if a.cpp else "py"
    got, err = extract(a.quest, lang)
    if err:
        print("⛔ " + err)
        sys.exit(2)
    fname, varname, code = got
    print(f"📄 {a.quest} · {fname} · {varname} ({len(code.splitlines())}줄)", file=sys.stderr)

    if a.show:
        print(code)
        return

    stdin = sys.stdin.read() if not sys.stdin.isatty() else ""
    if not stdin:
        print("⚠️ 입력이 비었다 — 표준입력으로 넣어라. 예:", file=sys.stderr)
        print(f"   printf '1\\n6 1\\nGHHGGH\\n' | python3 scripts/run-quest-code.py {a.quest}",
              file=sys.stderr)

    with tempfile.TemporaryDirectory() as d:
        d = Path(d)
        if lang == "py":
            src = d / "sol.py"
            src.write_text(code, encoding="utf-8")
            cmd = ["python3", str(src)]
        else:
            src = d / "sol.cpp"
            src.write_text(code, encoding="utf-8")
            exe = d / "sol"
            cp = subprocess.run(["c++", "-O2", "-std=c++17", "-o", str(exe), str(src)],
                                capture_output=True, text=True)
            if cp.returncode:
                print("⛔ 컴파일 실패:\n" + cp.stderr[:2000])
                sys.exit(1)
            cmd = [str(exe)]
        r = subprocess.run(cmd, input=stdin, capture_output=True, text=True, timeout=30)

    print("── 코드가 내놓은 답 " + "─" * 46)
    print(r.stdout.rstrip() or "(출력 없음)")
    if r.stderr.strip():
        print("── 에러 " + "─" * 58)
        print(r.stderr.rstrip()[:2000])
        print("\n⚠️ 입력 형식이 틀렸을 수 있다 — 원문(`public/problems/" + a.quest + ".pdf`)을 봐라.")
    print("─" * 66)
    print("⚠️ **이건 판정이 아니다.** 「화면이 말하는 답」과 같은지는 **사람이 화면을 읽어** 대조해라.")
    print("   2026-09-26 에 `swaptowin` 이 정확히 여기서 걸렸다 — 화면은 3번, 코드는 1번이었다.")


if __name__ == "__main__":
    main()
