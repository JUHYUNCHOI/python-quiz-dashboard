#!/usr/bin/env python3
"""quest 의 **학생용 글**(narr·question·explain 같은 `t(E, ...)` 문장)이 C++ 토글에서도
파이썬 전용 문법·낱말을 그대로 말하나 (판정 아님 — 볼 자리 표시).

왜 생겼나 (2026-09-23, `cowsignal` 3차 재검증):
  `check-unused-lang-param.py` 는 **코드를 그리는 컴포넌트**가 `lang` 을 받는지만 본다.
  그런데 `cowsignal` Ch2 4/7 은 코드 컴포넌트가 아니라 **퀴즈 설명 글** 자체가
  "In Python, repeating a character is easy: 'X' * 3 = 'XXX'" 라고 파이썬 문법을
  말하고 있었다 — Ch1/Ch2 는 애초에 `lang`(codeLang) 을 안 받는 "개념 챕터" 라
  C++ 로 토글해도 이 글은 그대로였다. 코드 컴포넌트 검사기로는 이 층이 안 보인다.

무엇을 보나 — `quest-problems/*/chapters.jsx` 의 `t(E, 영어, 한국어)` 호출마다,
  두 문자열 중 하나에 **파이썬 전용 문법·낱말**이 있는지 본다:
    · `input()` · `print(` · `.append(` · `range(`
    · 문자열×숫자 되풀이 문법 (`'X' * 3` 류)
    · "파이썬" / "Python" (단, 같은 문장에 "C++" 도 있으면 — 둘 다 언급하는
      의도적 안내문일 수 있으니 — 뺀다. 예: "Toggle Python ↔ C++ in header.")

  그리고 그 `t(E,` 호출이 속한 **스텝 객체가 시작하는 자리(`{ type: "quiz"` 등)
  부터** `lang === "cpp"` 또는 `codeLang === "cpp"` 가드가 있으면 — 이미
  언어별로 갈라 쓰는 정상 패턴이니(예: 3-3·3-6 퀴즈, 또는 `...(lang === "cpp"
  ? [] : [{ type: "quiz", ... }])` 처럼 스텝 자체를 통째로 빼는 패턴) 뺀다.

  MCC(토글 자체 없음)·pythonOnly quest 는 애초에 안전하니 뺀다.

⚠️ 이 검사기의 한계 — **0건이 결백은 아니다**:
  - 가드 판정이 "스텝 객체 시작 지점" 이라는 어림값이다(`re.finditer` 로 가장
    가까운 `{ type: "..." }` 를 찾는다). 함수 인자로 `lang` 을 넘겨받아 함수
    안에서 분기하는 것처럼 더 먼 곳에서 가드하면 놓칠 수 있다 —
    **찾은 자리는 눈으로 다시 봐라.**
  - `t(E, ...)` 로 안 감싼 일반 JSX 텍스트(직접 박아 넣은 `<div>파이썬은...</div>`)는
    ①(check-unused-lang-param.py 의 두 번째 검사)이 코드 블록 모양일 때만 잡는다.
    순수 설명 문단이면 **둘 다 못 잡는다.**
  - 마커 목록은 4개 + "파이썬/Python" 뿐이다. `list()`, `dict()`, `f"..."` 같은
    다른 파이썬 문법은 못 잡는다.

  python3 scripts/check-prose-lang-agnostic.py              # 전체
  python3 scripts/check-prose-lang-agnostic.py cowsignal     # quest 골라서
"""
import io
import glob
import re
import sys

HANGUL = re.compile(r"[가-힣]")

PY_MARKERS = [
    (re.compile(r"\binput\(\)"), "input()"),
    (re.compile(r"\bprint\("), "print("),
    (re.compile(r"\.append\("), ".append("),
    (re.compile(r"\brange\("), "range("),
    (re.compile(r"['\"][^'\"]{0,20}['\"]\s*\*\s*[A-Za-z0-9]"), "문자열 * 숫자 (string-repeat)"),
    (re.compile(r"파이썬|\bPython\b"), "파이썬/Python 언급"),
]


def args_of(s, i):
    """t(E, 뒤에서 두 인자를 대충 떼어낸다. 실패하면 None — 억지로 추측하지 않는다.
    (scripts/check-quest-lang.py 와 같은 파서 — 검증된 패턴을 재사용한다.)"""
    depth, j, n, quote = 0, i, len(s), None
    parts, start = [], i
    while j < n and len(parts) < 2:
        c = s[j]
        if quote:
            if c == "\\":
                j += 2
                continue
            if c == quote:
                quote = None
        elif c in "\"'`":
            quote = c
        elif c in "([{":
            depth += 1
        elif c in ")]}":
            if depth == 0 and c == ")":
                parts.append(s[start:j])
                break
            depth -= 1
        elif c == "," and depth == 0:
            parts.append(s[start:j])
            start = j + 1
        j += 1
    return parts if len(parts) == 2 else None


def load_meta():
    """id -> {section, pythonOnly} — app/quest/[problemId]/data.ts 에서."""
    path = "app/quest/[problemId]/data.ts"
    src = io.open(path, encoding="utf-8").read()
    meta = {}
    for m in re.finditer(r"\{id:\"([^\"]+)\"[^}]*\}", src):
        row = m.group(0)
        qid = m.group(1)
        section_m = re.search(r'section:"([^"]*)"', row)
        meta[qid] = {
            "section": section_m.group(1) if section_m else None,
            "pythonOnly": "pythonOnly:true" in row.replace(" ", ""),
        }
    return meta


def main():
    want = set(a for a in sys.argv[1:] if not a.startswith("-")) or None
    meta = load_meta()

    hits = []
    for f in sorted(glob.glob("quest-problems/*/chapters.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        info = meta.get(quest, {})
        if info.get("section") == "MCC" or info.get("pythonOnly"):
            continue

        src = io.open(f, encoding="utf-8", errors="replace").read()
        for m in re.finditer(r"\bt\(\s*E\s*,", src):
            args = args_of(src, m.end())
            if not args:
                continue
            en, ko = " ".join(args[0].split()), " ".join(args[1].split())
            combined = en + " " + ko
            if "C++" in combined:
                continue  # Python 과 C++ 을 둘 다 언급하는 의도적 안내문
            found = [name for rx, name in PY_MARKERS if rx.search(combined)]
            if not found:
                continue

            # 가드 검사 범위: "바로 앞 200자" 가 아니라 **이 스텝 객체가 시작하는
            # 자리부터** 본다. 2026-09-23 재검증: `...(lang === "cpp" ? [] : [{
            # type: "quiz", narr: ..., question: t(E, ...)` 처럼 narr 이 길면
            # question 의 200자 창이 가드를 못 보고 지나쳤다(moo 5-2, 실측 235자).
            step_starts = list(re.finditer(r'\{\s*type:\s*"(?:quiz|reveal|progressive|code|input)"', src[:m.start()]))
            step_start = step_starts[-1].start() if step_starts else max(0, m.start() - 200)
            before = src[max(0, step_start - 150):m.start()]
            if "lang === \"cpp\"" in before or 'codeLang === "cpp"' in before or "lang===\"cpp\"" in before:
                continue  # 이미 언어별로 갈라 쓰는 정상 패턴

            line = src[:m.start()].count("\n") + 1
            hits.append((quest, f, line, found, (en or ko)[:80]))

    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"C++ 토글에서도 파이썬 말을 그대로 하는 학생용 문장 {len(hits)}건{scope}")
    print("  (판정 아님 — 볼 자리 표시. 20건쯤 손으로 열어 진짜 비율을 확인할 것)\n")
    for quest, f, line, found, snippet in hits:
        print(f"  ■ {f}:{line}  [{', '.join(found)}]")
        print(f"      {snippet}…")


if __name__ == "__main__":
    main()
