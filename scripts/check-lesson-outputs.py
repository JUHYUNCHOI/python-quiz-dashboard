#!/usr/bin/env python3
"""
레슨·복습 문제의 '정답 코드' 를 실제로 파이썬으로 실행해서,
화면에 적힌 출력(expect / result / expectedOutput)과 글자 단위로 대조한다.

왜 필요한가 (2026-08-29 수업 중 발견해서 만듦):
  - 집합을 그냥 print 하면 실행할 때마다 원소 순서가 달라지는데,
    한 번 돌려본 순서를 정답으로 박아둔 문제가 여럿 있었다 → 학생 화면과 늘 어긋남.
  - 아무도 만들지 않는 파일을 읽는 문제가 있었다 → 학생은 무조건 에러.
  - save→load 처럼 두 줄이 나오는데 expect 에 한 줄만 적혀 있었다.
  - random.seed(5) 결과값이 실제와 달랐다.
  눈으로는 절대 못 잡는 것들이라 전수 실행이 유일한 방법.

실행:  npm run check-outputs
       python3 scripts/check-lesson-outputs.py --verbose

한 레슨의 스텝들은 **같은 임시 폴더에서 순서대로** 실행한다.
학생 실행기(public/pyodide.worker.js)가 Pyodide 인스턴스를 재사용해서
가상 파일시스템이 세션 내내 유지되기 때문 — 그 동작을 그대로 흉내낸 것.

⚠️ check_learn() 의 사각지대 주의 (2026-09-04 에 발견해서 고침):
  레슨 27~52 중 23개는 파일이 통짜(`data/lessonNN.ts`)가 아니라
  `data/lessons/lessonNN/ch1.ts, ch2.ts, ...` 로 챕터별 서브폴더에 쪼개져 있다.
  최상위 `data/lessonNN.ts` 는 (있다면) `export { lessonNNData } from './lessons/lessonNN'`
  한 줄짜리 재수출 스텁일 뿐이고, 아예 최상위 파일이 없는 레슨도 있다
  (`data/index.ts` 가 `./lessons/lessonNN` 을 바로 import 하는 경우 — 27~31, 41~52 등).
  **이 서브폴더를 훑는 코드를 빼먹으면 검사 대상 목록에서 그 레슨 전체가 조용히 사라진다**
  (에러 없이 그냥 0건 검사됨). 나중에 또 레슨 파일 구조가 바뀌면
  (예: 서브폴더를 더 쪼갠다거나, 확장자/디렉터리명이 바뀐다거나) 같은 사각지대가
  재발할 수 있다 — `_learn_files()` 가 실제로 몇 개 파일을 찾았는지 항상 눈으로 확인할 것.
"""

import glob
import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REVIEW_DIR = os.path.join(ROOT, "app", "review", "[lessonId]", "data", "lessons")
LEARN_DIR = os.path.join(ROOT, "data")
TIMEOUT = 15

VERBOSE = "--verbose" in sys.argv


def unesc(s):
    try:
        return json.loads('"' + s + '"')
    except Exception:
        return None


def strip_en(blk):
    """en: { ... } 서브블록 제거 — 한국어 필드만 남긴다 (중괄호 균형으로 잘라냄)."""
    out, i = [], 0
    while True:
        j = blk.find("en: {", i)
        if j < 0:
            out.append(blk[i:])
            break
        out.append(blk[i:j])
        depth, k = 0, blk.index("{", j)
        while k < len(blk):
            if blk[k] == "{":
                depth += 1
            elif blk[k] == "}":
                depth -= 1
                if depth == 0:
                    break
            k += 1
        i = k + 1
    return "".join(out)


_JS_ESC = {"n": "\n", "t": "\t", "r": "\r", "\\": "\\", "`": "`", "$": "$", "'": "'", '"': '"'}


def unesc_backtick(s):
    """JS 템플릿 리터럴 이스케이프를 왼쪽부터 한 번만 푼다.
    순차 replace 로 하면 \\\\n (백슬래시+n 두 글자) 까지 줄바꿈으로 바꿔버려서
    파이썬 문자열 안의 \\n 이 사라진다 — 실제로 그 버그를 겪어서 이렇게 씀."""
    out, i = [], 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            out.append(_JS_ESC.get(s[i + 1], "\\" + s[i + 1]))
            i += 2
        else:
            out.append(s[i])
            i += 1
    return "".join(out)


def field(blk, name):
    b = strip_en(blk)
    m = re.search(r"\b" + name + r': "((?:[^"\\]|\\.)*)"', b)
    if m:
        return unesc(m.group(1))
    # 백틱 템플릿 리터럴로 쓴 code 필드도 있음 (lesson39/40/51/52)
    m = re.search(r"\b" + name + r": `([^`]*)`", b)
    if m:
        return unesc_backtick(m.group(1))
    return None


def run(code, cwd, stdin=""):
    try:
        r = subprocess.run(
            [sys.executable, "-c", code], input=stdin, cwd=cwd,
            capture_output=True, text=True, timeout=TIMEOUT,
        )
        return r.stdout, r.stderr
    except subprocess.TimeoutExpired:
        return None, "TIMEOUT"


def last_error_line(stderr):
    lines = [l for l in (stderr or "").strip().split("\n") if l.strip()]
    return lines[-1] if lines else ""


# initialCode 안에 "여기에 써봐" 류 안내 주석이 있으면 학생이 채우는 자리 → 실행 대조 대상 아님
# "바꿔" 추가 (2026-09-04): "3과 5를 10과 7로 바꿔보세요!" 처럼 값을 고쳐야 하는 스캐폴드가
# 이 리스트에 없어서 "출력 불일치" 오탐으로 잡혔음 (lesson32 ch4-3).
# ⚠️ task 필드까지 이 정규식으로 걸러내면 안 된다 — "실행해보세요/확인해보세요" 류 정상적인
# 지시문에도 흔히 붙는 말이라 130개 넘는 정상 스텝이 통째로 검사 대상에서 빠진다(실측 확인함).
# 반드시 initialCode(코드) 본문에만 적용할 것.
PLACEHOLDER = re.compile(
    r"여기에|여기다|TODO|write your|your code|작성하|채워|넣어|\bhere\b|put an|한 줄 써|바꿔", re.I)

# 함수 본문이 "설명 주석만 적어놓고 실제 코드 없이" 끝나는 미완성 스캐폴드.
# 예: "# 합계와 평균을 한 번에 return하세요!" 라고만 적혀 있고 실제 return 문은 없음
#     (lesson33 ch3-7, lesson34 ch4-4). 들여쓰기된 주석 한 줄이 블록의 마지막 줄이고
# (빈 줄 뒤에 들여쓰기 없는 다음 문장이 오거나 코드가 거기서 끝나면) 미완성으로 본다.
TRAILING_COMMENT_BODY = re.compile(r"\n( +)#[^\n]*\n\n+(?=[^ \t\n]|\Z)")

# 함수 본문이 주석 몇 줄 + 맨 `pass` 뿐인 미완성 스캐폴드 (lesson38 ch6-3 등)
FUNC_STUB = re.compile(r"def \w+\([^)]*\):\n(?:[ \t]*#[^\n]*\n)*[ \t]*pass\b")


def is_placeholder_code(code):
    return bool(
        PLACEHOLDER.search(code)
        or TRAILING_COMMENT_BODY.search(code)
        or FUNC_STUB.search(code)
    )


def check_review():
    """복습 문제 — practice/interleaving 의 answer, explain 의 code 를 실행."""
    problems = []
    checked = 0
    files = sorted(
        n for n in os.listdir(REVIEW_DIR)
        if n.startswith("lesson") and n.endswith(".ts") and "Cpp" not in n
    )
    for name in files:
        path = os.path.join(REVIEW_DIR, name)
        src = open(path, encoding="utf-8").read()
        marks = [(m.start(), m.group(1)) for m in re.finditer(r'\n      type: "(\w+)"', src)]
        # 한 레슨 = 한 폴더. 앞 스텝이 만든 파일을 뒤 스텝이 읽을 수 있게(Pyodide FS 흉내)
        with tempfile.TemporaryDirectory() as workdir:
            for k, (pos, ty) in enumerate(marks):
                end = marks[k + 1][0] if k + 1 < len(marks) else len(src)
                blk = src[pos:end]
                if ty in ("practice", "interleaving"):
                    code, want = field(blk, "answer"), field(blk, "expect")
                    tpl = field(blk, "template")
                    # 빈칸 1개짜리는 answer 가 코드 조각 → template 에 끼워넣어 완성본을 만든다.
                    # (이렇게 해야 '파일을 만드는' 스텝도 실제로 돌아서, 뒤 스텝이 그 파일을 읽을 수 있음)
                    if tpl is not None and tpl.count("___") == 1 and code and "\n" not in code:
                        code = tpl.replace("___", code)
                elif ty == "explain":
                    code, want = field(blk, "code"), field(blk, "result")
                else:
                    continue
                if not code or want is None or "print" not in code:
                    continue
                if "input(" in code:
                    continue
                out, err = run(code, workdir)
                checked += 1
                label = (field(blk, "task") or field(blk, "note") or "")[:40].replace("\n", " ")
                if out is None:
                    problems.append((name, ty, label, "TIMEOUT", "", want))
                    continue
                got = out.rstrip("\n")
                if err and "Traceback" in err:
                    # 에러를 가르치는 스텝: 화면에 적힌 결과가 (출력 + 에러 한 줄) 인 경우도 있음
                    combined = (got + "\n" if got.strip() else "") + last_error_line(err)
                    if combined.strip() == want.strip() or last_error_line(err).strip() == want.strip():
                        continue
                    problems.append((name, ty, label, "ERROR", combined, want))
                elif got != want.rstrip("\n"):
                    problems.append((name, ty, label, "MISMATCH", got, want.rstrip("\n")))
    return checked, problems


def _learn_files():
    """수업 레슨 파일 목록. 두 갈래를 다 훑어야 한다:
      1) data/lessonNN.ts — 옛 구조(챕터가 파일 하나에 다 있음), 또는
         data/lessons/lessonNN/ 로 옮긴 뒤 남은 재수출 스텁(내용 없음 → 자연히 0건).
      2) data/lessons/lessonNN/chM.ts — 레슨 27~52 중 23개가 챕터별로 쪼개진 실제 파일
         (2026-09 기준 84개 파일). 최상위엔 스텁조차 없는 레슨도 있어서
         (`data/index.ts` 가 './lessons/lessonNN' 을 바로 import) 여길 안 훑으면
         그 레슨 전체가 검사 대상에서 조용히 빠진다.
    """
    top = sorted(glob.glob(os.path.join(LEARN_DIR, "lesson*.ts")))
    split = sorted(glob.glob(os.path.join(LEARN_DIR, "lessons", "lesson*", "ch*.ts")))
    return top + split


def check_learn():
    """수업 레슨 — 빈칸이 없는 tryit/mission/coding 의 initialCode 를 실행."""
    problems = []
    checked = 0
    for path in _learn_files():
        name = os.path.relpath(path, LEARN_DIR)
        src = open(path, encoding="utf-8").read()
        # id 뒤에 곧바로 type 이 오는 자리만 스텝 경계로 본다 (챕터 객체 자체의
        # id: "ch1" 같은 건 뒤에 title 이 오지 type 이 안 오므로 자동으로 걸러짐).
        # 옛 구조(10칸 들여쓰기)와 새 서브폴더 구조(6칸 들여쓰기) 둘 다 맞아야 해서
        # 들여쓰기 칸수를 고정하지 않고 \s+ 로 둔다.
        ids = [
            (m.start(), m.group(1))
            for m in re.finditer(r'\n\s+id: "([^"]+)",?\n\s+type: "\w+"', src)
        ]
        with tempfile.TemporaryDirectory() as workdir:
            for k, (pos, sid) in enumerate(ids):
                end = ids[k + 1][0] if k + 1 < len(ids) else len(src)
                blk = src[pos:end]
                if field(blk, "type") not in ("tryit", "mission", "coding"):
                    continue
                code, want = field(blk, "initialCode"), field(blk, "expectedOutput")
                if code is None or want is None or "___" in code:
                    continue
                if is_placeholder_code(code):        # 학생이 채우는/고치는 자리가 있는 스텝
                    continue
                body = [l for l in code.split("\n") if l.strip() and not l.strip().startswith("#")]
                if not body or "print" not in code:  # 처음부터 쓰기
                    continue
                stdin = ""
                if "input(" in code:
                    m = re.search(r"\(입력:\s*([^)]*)\)|\(input:\s*([^)]*)\)", field(blk, "task") or "")
                    if not m:
                        continue
                    stdin = (m.group(1) or m.group(2)).strip() + "\n"
                out, err = run(code, workdir, stdin)
                checked += 1
                if out is None:
                    problems.append((name, "tryit", sid, "TIMEOUT", "", want))
                elif err and "Traceback" in err:
                    combined = (out.rstrip("\n") + "\n" if out.strip() else "") + last_error_line(err)
                    if combined.strip() == want.strip() or last_error_line(err).strip() == want.strip():
                        continue
                    problems.append((name, "tryit", sid, "ERROR", combined, want))
                elif out.strip() == "" and want.strip() != "":
                    continue        # 출력 자체가 없음 = 학생이 처음부터 쓰는 스텝
                elif out.rstrip("\n") != want.rstrip("\n"):
                    problems.append((name, "tryit", sid, "MISMATCH", out.rstrip("\n"), want.rstrip("\n")))
    return checked, problems


def report(title, checked, problems):
    print(f"\n{title} — {checked}개 실행, 문제 {len(problems)}개")
    for name, ty, label, kind, got, want in problems:
        print(f"\n  ● {name} [{ty}] 「{label}」 {kind}")
        print(f"      나온 것  : {got!r}")
        print(f"      적힌 것  : {want!r}")


def main():
    rc, rp = check_review()
    lc, lp = check_learn()
    report("📘 복습 문제 (app/review)", rc, rp)
    report("📗 수업 레슨 (data)", lc, lp)
    total = len(rp) + len(lp)
    if total == 0:
        print("\n✅ 적힌 출력과 실제 실행 결과가 전부 일치합니다.")
        return 0
    print(f"\n❌ 총 {total}개가 실제 실행 결과와 다릅니다. 위 목록을 확인하세요.")
    print("   (집합/딕셔너리를 그냥 print 하면 순서가 매번 달라집니다 → sorted() 로 감싸세요.)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
