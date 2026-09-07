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


def run(code, cwd, stdin="", hashseed=None):
    env = None
    if hashseed is not None:
        env = dict(os.environ, PYTHONHASHSEED=str(hashseed))
    try:
        r = subprocess.run(
            [sys.executable, "-c", code], input=stdin, cwd=cwd,
            capture_output=True, text=True, timeout=TIMEOUT, env=env,
        )
        return r.stdout, r.stderr
    except subprocess.TimeoutExpired:
        return None, "TIMEOUT"


def is_unstable(code, cwd, stdin=""):
    """집합·딕셔너리를 그냥 print 해서 실행할 때마다 순서가 달라지는 코드인가.

    2026-09-04: 검사기 자신이 이걸 못 잡아서 lesson21·26 이 돌릴 때마다
    나타났다 사라졌다 했다. PYTHONHASHSEED 를 고정하면 조용해지지만 그건 **버그를 숨기는 것**이다
    — 학생 브라우저(Pyodide)는 또 다른 순서로 보여주니까. 그래서 고정하는 대신
    서로 다른 seed 두 개로 돌려서 **결과가 갈리는지**를 본다. 갈리면 그게 확정된 버그다.

    실패한 스텝에서만 부른다 (전체를 두 번 돌리면 느려진다).

    ⚠️ seed 두 개로는 모자란다 — {'철수','영희'} 는 seed 1·2·3 에서 같은 순서가 나오고
    7·11 에서만 뒤집힌다. 실제로 seed 1·2 만 보다가 lesson26 을 놓쳤다.
    원소가 적을수록 우연히 같아지기 쉬우니 여러 개를 본다.
    """
    seeds = [1, 2, 3, 7, 11, 23]
    first = None
    for sd in seeds:
        out, _ = run(code, cwd, stdin, hashseed=sd)
        if out is None:
            return False
        if first is None:
            first = out
        elif out != first:
            return True
    return False


def last_error_line(stderr):
    lines = [l for l in (stderr or "").strip().split("\n") if l.strip()]
    return lines[-1] if lines else ""


# initialCode 안에 "여기에 써봐" 류 안내 주석이 있으면 학생이 채우는 자리 → 실행 대조 대상 아님
# "바꿔" 추가 (2026-09-04): "3과 5를 10과 7로 바꿔보세요!" 처럼 값을 고쳐야 하는 스캐폴드가
# 이 리스트에 없어서 "출력 불일치" 오탐으로 잡혔음 (lesson32 ch4-3).
# ⚠️ task 필드까지 이 정규식으로 걸러내면 안 된다 — "실행해보세요/확인해보세요" 류 정상적인
# 지시문에도 흔히 붙는 말이라 130개 넘는 정상 스텝이 통째로 검사 대상에서 빠진다(실측 확인함).
# 반드시 initialCode(코드) 본문에만 적용할 것.
# 영어 판정어 추가 (2026-09-04): 한국어 원본은 "바꿔" 로 걸러졌는데 같은 스텝의 -en 파일은
# "change 3 and 5 to 10 and 7!" 이라 안 걸려서, mission 스텝의 미완성 코드를 실행하고
# "17 이 나와야 하는데 8 이 나왔다" 고 오탐했다. 한국어 판정어마다 영어 짝을 붙인다.
PLACEHOLDER = re.compile(
    r"여기에|여기다|TODO|write your|your code|작성하|채워|넣어|\bhere\b|put an|한 줄 써|바꿔"
    r"|fill in|\breplace\b|change [^\n]{0,40}\bto\b|\bmodify\b", re.I)

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
                    kind = "UNSTABLE" if is_unstable(code, workdir) else "MISMATCH"
                    problems.append((name, ty, label, kind, got, want.rstrip("\n")))
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
                    kind = "UNSTABLE" if is_unstable(code, workdir, stdin) else "MISMATCH"
                    problems.append((name, "tryit", sid, kind, out.rstrip("\n"), want.rstrip("\n")))
    return checked, problems


# ──────────────────────────────────────────────────────────────
# hint2 검사 — "학생이 정답을 써도 오답 처리" 를 잡는다
#
# 왜 있나 (2026-09-06): check_learn() 은 `initialCode` 만 돌린다. 그래서
#   ① "처음부터 쓰기"(본문이 주석뿐) 스텝은 위 279행에서 **아예 건너뛰고**
#   ② `hint2`(= 정답 코드) 는 어디서도 실행해보지 않는다
# 그날 lesson6-en `try-count-scratch` 가 딱 이 사각지대에 있었다 —
#   "This is fun and this is hard...".count("is") 는 6인데 적힌 값은 3.
#   ("This"·"this" 안의 is 까지 센다)
# tryit 일 땐 requireCorrect=false 라 아무도 안 걸렸는데, mission 으로 올리자마자
# **학생이 hint2 의 정답을 그대로 써도 막히는** 상태가 됐다.
# python-qa 가 손으로 찾았다. 다음엔 기계가 잡는다.
# ──────────────────────────────────────────────────────────────

def normalize_app(s):
    """앱의 채점 정규화와 같은 규칙 (python-runner.tsx / blank-code-runner.tsx).
    줄 구조는 보존하고 줄 안의 공백만 뭉친다."""
    s = s.replace("\r\n", "\n").strip().lower()
    return "\n".join(re.sub(r"[ \t]+", " ", l).strip() for l in s.split("\n"))


def solved_candidates(blk):
    """학생이 '정답' 을 냈을 때 나올 수 있는 코드 후보들.

    `hint2` 관례가 하나가 아니다:
      · 프로그램 전체를 적은 것
      · **추가할 줄만** 적은 것 (설정 코드는 initialCode 에 이미 있다)
    그래서 둘 다 만들어 보고 **어느 쪽으로도 안 맞을 때만** 문제로 본다.

    ⚠️ **빈칸 있는 스텝은 일부러 안 본다.** 거기선 hint2 가 빈칸 조각(`max_hp`)
       이기도 하고 줄 전체(`if hp == 0:`)이기도 해서 기계가 못 고른다.
       억지로 채우면 헛 경보가 수백 개 난다 (2026-09-06 에 304개 나왔다).

    보는 것은 **빈칸 없는 "손으로 처음부터" 스텝**뿐이다. 하필 `check_learn()`
    이 건너뛰는 바로 그 구간이라 사각지대였다 —
    lesson6-en `try-count-scratch`("정답인데 오답") 가 여기 있었다."""
    code = field(blk, "initialCode")
    hint2 = field(blk, "hint2")
    if code is None or not hint2 or "___" in code:
        return []
    # ⚠️ check_learn 의 skip 조건을 **문자로 흉내 내면 안 된다.**
    #    2026-09-06 에 그렇게 했다가 lesson6-en `try-count-scratch` 를 놓쳤다 —
    #    주석에 "Write a print line here" 라고 써 있어서 `"print" in code` 가 참이 됐고,
    #    "check_learn 이 본다" 고 착각했다. 정작 check_learn 은 **출력이 비면 건너뛴다.**
    #    둘 다 안 보는 틈이 생겼다.
    #    → 조건을 흉내 내지 말고, **실제로 돌려서** 판단한다. 호출부에서 처리.
    body_lines = [l for l in code.split("\n") if l.strip() and not l.strip().startswith("#")]
    # hint2 가 **들여쓰기로 시작**하면 "이 자리에 끼워 넣어라" 는 조각이다
    # (예: 클래스 안에 들어갈 메서드 본문). 뒤에 붙이면 문법이 깨지므로,
    # 어디에 넣어야 하는지 기계가 알 수 없다 → 검사하지 않는다.
    # 헛 경보가 하나라도 남으면 검사기를 아무도 안 본다.
    if hint2.split("\n")[0][:1] in (" ", "\t"):
        return []
    out = [hint2]
    if body_lines:                 # initialCode 에 설정 코드가 있으면 붙여서도 본다
        out.append(code.rstrip() + "\n" + hint2)
    return out


def check_hints():
    checked, problems = 0, []
    for path in sorted(glob.glob(os.path.join(LEARN_DIR, "**", "*.ts"), recursive=True)):
        name = os.path.relpath(path, LEARN_DIR)
        if "backup" in name:        # 라이브 콘텐츠가 아니다
            continue
        src = open(path, encoding="utf-8").read()
        ids = [(m.start(), m.group(1))
               for m in re.finditer(r'\n\s+id: "([^"]+)",?\n\s+type: "\w+"', src)]
        with tempfile.TemporaryDirectory() as workdir:
            for k, (pos, sid) in enumerate(ids):
                end = ids[k + 1][0] if k + 1 < len(ids) else len(src)
                blk = src[pos:end]
                if field(blk, "type") not in ("tryit", "mission", "coding"):
                    continue
                want = field(blk, "expectedOutput")
                if want is None:
                    continue
                raw = field(blk, "initialCode") or field(blk, "codeTemplate") or ""
                hint2 = field(blk, "hint2")

                # ① 고칠 게 없는 미션 — initialCode 를 **그대로** 돌렸더니
                #    이미 expectedOutput 과 같다. 학생은 실행만 누르면 통과한다.
                #    2026-09-06: pedagogy·lesson-content 가 독립적으로 짚었다
                #    (`data/lesson34.ts` `ch3-4`). `mission` 이라 능동 비율에도
                #    "완전한 연습" 으로 잡혀서 숫자로는 안 보였다.
                base0 = field(blk, "initialCode")
                if (field(blk, "type") in ("mission", "coding")
                        and base0 and "___" not in base0
                        and not is_placeholder_code(base0)):
                    o0, e0 = run(base0, workdir, field(blk, "stdin") or "")
                    if (o0 is not None and not (e0 and "Traceback" in e0)
                            and o0.strip()
                            and normalize_app(o0.rstrip("\n")) == normalize_app(want)):
                        checked += 1
                        problems.append((name, "hint2", sid,
                                         "고칠 게 없는 미션 (실행만 해도 통과)",
                                         o0.rstrip("\n"), want))
                        continue

                cands = solved_candidates(blk)
                if not cands:
                    continue
                # initialCode 를 그대로 돌려 **출력이 나오면** check_learn 이 이미 검증한다.
                # 비어 있으면(= 학생이 처음부터 쓰는 자리) 여기서 hint2 를 본다.
                base = field(blk, "initialCode")
                b_out, b_err = run(base, workdir, "")
                if b_out is not None and b_out.strip() and not (b_err and "Traceback" in b_err):
                    continue
                stdin = field(blk, "stdin") or ""
                if any("input(" in c for c in cands) and not stdin:
                    m = re.search(r"\(입력:\s*([^)]*)\)|\(input:\s*([^)]*)\)", field(blk, "task") or "")
                    if not m:
                        continue
                    stdin = (m.group(1) or m.group(2)).strip()
                if stdin and not stdin.endswith("\n"):
                    stdin += "\n"

                checked += 1
                # 후보 중 **정상 실행된 것**만 본다.
                # 전부 에러면 우리가 코드를 잘못 재구성한 것이다 — hint2 가
                # "이 자리에 끼워 넣어라" 는 조각(함수 안 return, 클래스 안 메서드 등)
                # 이면 붙여서 돌릴 방법이 없다. 그건 **콘텐츠 문제가 아니므로 조용히 넘긴다.**
                # 헛 경보가 남으면 검사기를 아무도 안 본다.
                mismatch = None
                for c in cands:
                    run_code = c
                    if "input(" in c:
                        # 앱은 input() 프롬프트를 stdout 에 안 찍는다
                        # (`public/pyodide.worker.js:61-67` 에서 builtins.input 을 래핑)
                        run_code = ("import builtins as _b\n_o = _b.input\n"
                                    "_b.input = lambda *a, **k: _o()\n") + c
                    out, err = run(run_code, workdir, stdin)
                    if out is None or err:
                        continue                      # 재구성 실패 — 판단하지 않는다
                    if not out.strip() and want.strip():
                        continue                      # 출력이 아예 없음 = 조각만 돌린 것.
                                                      # check_learn 도 같은 규칙을 쓴다(위쪽 295행).
                    if normalize_app(out.rstrip("\n")) == normalize_app(want):
                        mismatch = None
                        break                          # 맞는 길이 있으면 통과
                    mismatch = out.rstrip("\n")
                if mismatch is not None:
                    kind = "UNSTABLE" if is_unstable(cands[-1], workdir, stdin) else "정답인데 오답 처리"
                    problems.append((name, "hint2", sid, kind, mismatch, want))
    return checked, problems


def report(title, checked, problems):
    print(f"\n{title} — {checked}개 실행, 문제 {len(problems)}개")
    for name, ty, label, kind, got, want in problems:
        print(f"\n  ● {name} [{ty}] 「{label}」 {kind}")
        print(f"      나온 것  : {got!r}")
        print(f"      적힌 것  : {want!r}")
        if kind == "UNSTABLE":
            print("      ⚠️ 이 코드는 돌릴 때마다 결과가 달라진다 (집합·딕셔너리를 그냥 print).")
            print("         학생 화면과도 늘 어긋난다 → sorted() 로 감싸라. 숫자만 고치면 안 된다.")


# ─────────────────────────────────────────────────────────────
# 왜 있나 (2026-09-07): 빈칸(`___`) 있는 스텝은 check_learn() 도 check_hints() 도
# 일부러 건너뛴다. 그런데 2026-09-07 에 레슨 22·23·25·45·46·47·49·50 에
# 빈칸 스텝을 25개 새로 만들었다 — 그 25개를 지켜주는 기계가 하나도 없었다.
#
# 빈칸 스텝이 깨지는 방식은 둘이고, 둘 다 눈으로는 안 보인다:
#   ① 빈칸 개수 ≠ hint2 항목 개수 → 자동채움이 조용히 꺼진다
#      (`components/python/blank-code-runner.tsx:80` `parseAnswers`)
#   ② hint2 의 정답을 채워 넣어도 expectedOutput 이 안 나온다
#      → 학생이 정답을 맞혀도 오답 처리된다
# 그래서 정답을 실제로 채워 넣고 **돌려서** 대조한다.
NO_PROMPT_SHIM = (
    "import builtins as _b\n"
    "_o = _b.input\n"
    "_b.input = lambda *a: _o()\n"
)


def check_blanks():
    """빈칸 스텝 — hint2 정답을 채워 실제 실행하고 expectedOutput 과 대조."""
    problems = []
    checked = 0
    for path in _learn_files():
        name = os.path.relpath(path, LEARN_DIR)
        src = open(path, encoding="utf-8").read()
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
                code, want, hint2 = (field(blk, "initialCode"), field(blk, "expectedOutput"),
                                     field(blk, "hint2"))
                if code is None or want is None or "___" not in code or not hint2:
                    continue
                nb = code.count("___")
                answers = [a.strip() for a in hint2.split(" / ")]
                # hint2 가 정답 목록이 아니라 완성 코드/설명 한 덩어리인 경우가 있다.
                # 그건 자동채움을 안 쓰는 정상 케이스라 여기서 볼 대상이 아니다.
                if len(answers) != nb:
                    continue
                filled = code
                for a in answers:
                    filled = filled.replace("___", a, 1)
                # hint2 가 정답 목록이 아니라 설명문인 경우가 많다
                # (예: 레슨22 try1 의 "끝 숫자는 포함 안 됨! / nums[1:4]" — 항목 수가
                #  우연히 빈칸 수와 같다). 채워 넣었더니 파이썬 문법조차 안 되면
                # 그건 정답 목록이 아니니 이 검사의 대상이 아니다.
                # ⚠️ 이 걸러내기를 빼면 옛 스텝 100여 개가 한꺼번에 빨간불이 되고,
                #    그러면 아무도 이 검사기를 안 보게 된다.
                try:
                    compile(filled, "<check>", "exec")
                except SyntaxError:
                    continue
                stdin = ""
                if "input(" in filled:
                    m = re.search(r"\(입력:\s*([^)]*)\)|\(input:\s*([^)]*)\)", field(blk, "task") or "")
                    if not m:
                        continue
                    stdin = (m.group(1) or m.group(2)).strip() + "\n"
                # 학생 실행기는 input() 의 프롬프트를 화면에 안 찍는다
                # (`public/pyodide.worker.js:61-67` 가 builtins.input 을 감싼다).
                # 그대로 CPython 으로 돌리면 프롬프트가 stdout 에 섞여 헛 경보가 난다.
                out, err = run(NO_PROMPT_SHIM + filled if "input(" in filled else filled,
                               workdir, stdin)
                checked += 1
                if out is None:
                    problems.append((name, "blank", sid, "TIMEOUT", "", want))
                elif err and "Traceback" in err:
                    problems.append((name, "blank", sid, "ERROR", last_error_line(err), want))
                elif out.rstrip("\n") != want.rstrip("\n"):
                    kind = "UNSTABLE" if is_unstable(filled, workdir, stdin) else "MISMATCH"
                    problems.append((name, "blank", sid, kind, out.rstrip("\n"), want.rstrip("\n")))
    return checked, problems


def main():
    rc, rp = check_review()
    lc, lp = check_learn()
    hc, hp = check_hints()
    bc, bp = check_blanks()
    # 옛 스텝 81곳은 hint2 가 정답 목록이 아니라 완성 코드 조각이다
    # (예: `fruits[___]` 에 hint2 "fruits[1]" → 채우면 `fruits[fruits[1]]`).
    # 이미 푼 스텝을 다시 열 때만 자동채움되므로 학생을 막지는 않지만,
    # 그때 "정답" 이라며 깨진 코드를 보여준다. 81곳을 한 번에 고치는 건 별건이라
    # 기준선으로 잡아두고 **늘어나면** 빨간불이 되게 한다.
    # ⚠️ 고칠 때마다 이 숫자를 같이 내려라. 안 내리면 기준선이 방패가 된다.
    KNOWN_BLANK_ISSUES = 81
    legacy = min(len(bp), KNOWN_BLANK_ISSUES)
    report("📘 복습 문제 (app/review)", rc, rp)
    report("📗 수업 레슨 (data)", lc, lp)
    report("🔑 정답(hint2) 검사 — 학생이 맞게 써도 막히나", hc, hp)
    if len(bp) > KNOWN_BLANK_ISSUES:
        report("🕳️  빈칸 검사 — 정답을 채우면 적힌 출력이 나오나", bc, bp)
    else:
        print(f"\n🕳️  빈칸 검사 — 정답을 채우면 적힌 출력이 나오나 — {bc}개 실행, "
              f"알려진 옛 결함 {len(bp)}개 (기준선 {KNOWN_BLANK_ISSUES}, 새 breakage 0)")
    total = len(rp) + len(lp) + len(hp) + max(0, len(bp) - legacy)
    if total == 0:
        print("\n✅ 적힌 출력과 실제 실행 결과가 전부 일치합니다.")
        return 0
    print(f"\n❌ 총 {total}개가 실제 실행 결과와 다릅니다. 위 목록을 확인하세요.")
    print("   (집합/딕셔너리를 그냥 print 하면 순서가 매번 달라집니다 → sorted() 로 감싸세요.)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
