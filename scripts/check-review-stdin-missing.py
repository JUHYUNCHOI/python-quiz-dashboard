#!/usr/bin/env python3
"""복습 스텝이 **입력을 받는 코드인데 입력을 안 주는** 자리를 찾는다.

왜 생겼나 (2026-10-07)
---------------------
학생이 보호자를 통해 알려왔다:

  *"코더린이 문제를 풀어도 계속 에러가 나길래 가르쳐주다가 발견했는데,
    **인풋이 안 들어와서 모든 문제가 푸는 게 불가능해요.**"*

**사실이었다.** 복습 10(= `input()` 레슨)의 연습 **7개 전부**가
`EOFError: EOF when reading a line` 로 죽고 있었다 — 그 레슨 새 연습의 **100%** 다.

원인은 `app/review/[lessonId]/ReviewStepRenderer.tsx` 가 `runPythonReal(...)` 을
**stdin 없이** 부른 것이다. 받을 자리는 `utils/pyodideRun.ts` 에 **원래 있었고**,
`content.stdin` 은 **C++ 경로에서는 이미 읽고 있었다** — 파이썬 쪽만 안 읽어서
**데이터에 넣어도 안 닿는 죽은 필드**였다.

⚠️ **조용히 안 끝난다.** 실행이 깨지면 `isAnswerCorrect()` **글자 완전일치**로
   폴백한다. 그래서 학생이 논리적으로 맞게 짜도 변수명·프롬프트 문구가 다르면
   오답이고, 에러 문구까지 같이 본다. 「푸는 게 불가능」이 맞는 말이었다.

⛔ **왜 아무도 못 잡았나** — 담당은 `python-qa`(「코드가 진짜 도는지 실행해서 확인」)인데
   **레슨(`/learn`)만 보고 복습(`/review`)은 한 번도 실행해 본 적이 없었다.**
   빌드·타입 검사는 당연히 통과한다 — 문법은 멀쩡하고 **런타임에만** 터진다.

잣대
----
복습 스텝 중 **아래 셋을 다 만족**하면 신고한다:
  ① 코드(`answer` 또는 `template`)에 `input(` 이 있다
  ② `expect` 가 **비어 있지 않다** → 렌더러가 **실제로 실행해서** 출력을 대조한다
     (`expect: ""` 는 JS 에서 falsy 라 실행 채점이 **안 돈다** — 그건 안전하다)
  ③ `stdin` 이 **없다**

⚠️ 못 보는 것
  - `expect` 가 있는데 **stdin 을 줘도 못 고치는** 경우는 못 가른다.
    실측 예: 복습 37 연습4 는 `while True` 메뉴라 어떤 입력을 줘도 `expect` 와 안 맞는다.
    **이 검사기는 「입력이 없다」까지만 말한다. 고치는 법은 사람이 정해라.**
  - C++(`lessonCpp*`)은 Piston 경로라 규칙이 다르다 — 일부러 안 본다.
  - 렌더링 안 되는 스텝 타입(`project` 등)도 구분 못 한다.
⭐ `--selftest` 로 **잣대가 사는지 먼저** 봐라.
"""
import re
import sys
import glob
import os

ROOT = os.path.join("app", "review", "[lessonId]", "data", "lessons")


def blocks(src: str):
    """`content: {` … 짝 맞는 `}` 까지를 한 덩이로 끊어 (시작줄, 본문) 으로 준다."""
    out = []
    for m in re.finditer(r"content:\s*\{", src):
        i = m.end()
        depth, n = 1, len(src)
        while i < n and depth:
            c = src[i]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            i += 1
        out.append((src[:m.start()].count("\n") + 1, src[m.end():i]))
    return out


def expect_is_live(body: str) -> bool:
    """`expect` 가 **비어 있지 않은가** — 빈 문자열이면 실행 채점이 안 돈다."""
    m = re.search(r'expect:\s*(".*?"|\'.*?\'|`.*?`)', body, re.S)
    if not m:
        return False
    return len(m.group(1)) > 2          # "" · '' 는 길이 2


def scan(path):
    src = open(path, encoding="utf-8").read()
    hits = []
    for line, body in blocks(src):
        code = " ".join(re.findall(r'(?:answer|template):\s*(".*?"|`.*?`)', body, re.S))
        if "input(" not in code:
            continue
        if not expect_is_live(body):
            continue
        if re.search(r"\bstdin:", body):
            continue
        task = re.search(r'task:\s*"(.*?)"', body, re.S)
        hits.append((line, (task.group(1)[:48].replace("\\n", " ") if task else "?")))
    return hits


SELFTEST = '''
const L = { steps: [
  { type: "practice", content: {
      task: "걸려야 한다 — input 있고 expect 있고 stdin 없음",
      template: null, answer: "x = input()\\nprint(x)", expect: "7" } },
  { type: "practice", content: {
      task: "안 걸려야 한다 — stdin 이 있다",
      template: null, answer: "x = input()\\nprint(x)", expect: "7", stdin: "7" } },
  { type: "practice", content: {
      task: "안 걸려야 한다 — expect 가 비어 실행 채점이 안 돈다",
      template: null, answer: "x = input()\\nprint(x)", expect: "" } },
  { type: "practice", content: {
      task: "안 걸려야 한다 — input 이 없다",
      template: null, answer: "print(7)", expect: "7" } },
] }
'''


def selftest():
    import tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".ts", delete=False, encoding="utf-8") as f:
        f.write(SELFTEST)
        p = f.name
    got = scan(p)
    os.unlink(p)
    for ln, t in got:
        print(f"   줄 {ln}: {t}")
    ok = len(got) == 1 and "걸려야 한다" in got[0][1]
    if ok:
        print("✅ 잣대가 살아 있다 — 1건만 걸린다 (stdin 있음·expect 빈값·input 없음은 안 걸린다)")
        return 0
    print("🚨 **잣대가 죽었다.** 이 검사기의 「0건」을 믿지 마라.")
    print(f"   기대: 1건. 실제: {len(got)}건")
    return 1


def main():
    argv = sys.argv[1:]
    if "--selftest" in argv:
        sys.exit(selftest())
    ids = [a for a in argv if not a.startswith("-")]
    files = ([os.path.join(ROOT, f"lesson{q}.ts") for q in ids] if ids
             else sorted(f for f in glob.glob(os.path.join(ROOT, "lesson*.ts"))
                         if "Cpp" not in f))

    total, bad = 0, 0
    for f in files:
        if not os.path.exists(f):
            print(f"⚠️ 그런 파일이 없다: {f}")
            continue
        hits = scan(f)
        if not hits:
            continue
        bad += 1
        print(f"\n  📄 {f}")
        for ln, task in hits:
            total += 1
            print(f"     {ln:>5}  {task}")

    print(f"\n복습에서 **입력을 받는데 입력을 안 주는** 스텝 — {total}곳 · 레슨 {bad}개")
    if not total:
        print("   ⚠️ 0건이 결백이 아니다 — C++·렌더 안 되는 타입은 안 본다.")
    print("""
⛔ **이건 「에러가 난다」가 아니라 「못 푼다」다.** 실행이 깨지면 채점이 **글자
   완전일치**로 폴백해서, 논리가 맞아도 변수명이 다르면 오답이 된다.
⚠️ **입력을 넣어도 못 고치는 자리가 있다** — 실측 예: 복습 37 연습4 는 `while True`
   메뉴라 어떤 입력을 줘도 `expect` 와 안 맞는다. 이 검사기는 **「입력이 없다」까지만**
   말한다. 고치는 법은 코드를 돌려 보고 사람이 정해라.
⭐ `--selftest` 로 잣대가 사는지 먼저 봐라.
근거: 2026-10-07 학생 제보 — *"인풋이 안 들어와서 모든 문제가 푸는 게 불가능해요."*""")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
