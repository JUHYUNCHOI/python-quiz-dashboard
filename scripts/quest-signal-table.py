#!/usr/bin/env python3
"""quest 를 **사람이 붙기 전에** 기계로 훑어 신호 표를 만든다.

왜 (2026-09-21): 선생님 *"다른 quest도 이런식으로 검토 수정 진행해"*.
그런데 `makedistinct` 한 개에 **검토자 넷 + 재검증 학생 + PM 3라운드**가 들어갔다.
그 밀도로 108개(2015~2022)는 못 끝낸다. project-lead 판정 —

  **1단계(전부, 기계만)**: 이 스크립트. 사람 없음, 비용 거의 0.
  **2단계(신호 있는 것만, 사람)**: 0건인 quest 는 묶음 리뷰로,
    신호가 있는 quest 만 makedistinct 급 전체 절차(넷 + 학생 + PM).

⚠️ **이 표로 사람을 빼는 대가를 적어 둔다.**
   `makedistinct` 의 제일 큰 구멍("쉬운 첫 코드 → 한계" 사다리가 통째로 없음)은
   **어떤 검사기도 못 잡았다.** pedagogy 가 읽고 판단한 것이다.
   0건인 quest 에도 그런 결함은 남아 있을 수 있다 — 속도와 맞바꾸는 것이고,
   **학생이 먼저 찾을 위험을 안고 가는 것**이다. 숨기지 않는다.

⚠️ **과목마다 점수를 3점에서 자른다.** 처음엔 안 잘랐더니 순위가 뒤집혔다 —
   `mcc21glass` 가 35점으로 1위였는데 **34점이 전부 '기호'** 였다.
   같은 미정의 기호가 34번 **반복된 한 가지 결함**이, 서로 다른 결함 셋이 걸린 quest 를 이겼다.
   전면 검토(넷+학생)가 필요한 건 **여러 층에 동시에 걸린 quest** 다 — `makedistinct` 가 그랬다.
   한 종류가 여러 번인 건 보통 **정의 한 줄을 넣으면 한꺼번에 풀린다**(moohunt 의 `2^N` 이 그랬다).
   project-lead 판정(2026-09-21).

  python3 scripts/quest-signal-table.py                 # 전부
  python3 scripts/quest-signal-table.py --years 2015-2022
  python3 scripts/quest-signal-table.py --free          # 동결 아닌 것만
"""
import glob
import io
import os
import re
import subprocess
import sys

FROZEN = {"hps", "cowphotos", "rounding", "cheese", "moo", "mooin3", "checkups"}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run(cmd):
    return subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True).stdout


def catalog():
    """카탈로그에서 (id, 연도) — 손으로 세지 않는다."""
    src = io.open(os.path.join(ROOT, "app/quest/[problemId]/data.ts"),
                  encoding="utf-8", errors="replace").read()
    out = []
    for qid, sub in re.findall(r'\{id:"([^"]+)".*?sub:"([^"]*)"', src):
        m = re.search(r"(19|20)\d\d", sub)
        out.append((qid, m.group(0) if m else "?"))
    return out


def lock_of(q):
    if q in FROZEN:
        return "🔒동결"
    f = os.path.join(ROOT, f"quest-problems/{q}/components.jsx")
    if os.path.exists(f):
        head = io.open(f, encoding="utf-8", errors="replace").read()[:600]
        if "USACO_VERIFIED" in head:
            return "🔒검증"
    return ""


def main():
    args = sys.argv[1:]
    lo, hi = 0, 9999
    if "--years" in args:
        a, b = args[args.index("--years") + 1].split("-")
        lo, hi = int(a), int(b)
    only_free = "--free" in args

    rows = []
    for q, y in catalog():
        if not os.path.isdir(os.path.join(ROOT, f"quest-problems/{q}")):
            continue
        if y != "?" and not (lo <= int(y) <= hi):
            continue
        lk = lock_of(q)
        if only_free and lk:
            continue
        rows.append((q, y, lk))

    print(f"기계 패스 — quest {len(rows)}개 "
          f"({'연도 ' + str(lo) + '~' + str(hi) if lo else '전체'}"
          f"{' · 동결 제외' if only_free else ''})\n")

    # 검사기를 quest 이름을 넘겨 한 번에 돌린다 (하나씩 돌리면 몇 분이 걸린다)
    names = " ".join(q for q, _, _ in rows)
    sig = {q: {} for q, _, _ in rows}

    def count(out, pat, key):
        for m in re.finditer(pat, out):
            q = m.group(1)
            if q in sig:
                sig[q][key] = sig[q].get(key, 0) + int(m.group(2))

    count(run(f"python3 scripts/check-undefined-symbol.py {names}"),
          r"■ (\S+) — (\d+)건", "기호")
    count(run(f"python3 scripts/check-narr-length.py {names}"),
          r"🚨 (\S+)\s+(\d+)곳", "내레이션")
    count(run(f"python3 scripts/check-code-one-statement.py {names}"),
          r"[🔒 ]\s*(\S+?)(?:\(\w+\))?\s+(\d+)줄", "한줄")
    count(run(f"python3 scripts/check-stepper-first-step.py {names}"),
          r"🚨 (\S+).*?(\d+)", "스테퍼")
    count(run(f"python3 scripts/check-code-names-in-prose.py {names}"),
          r"■ (\S+) — (\d+)", "코드이름")
    count(run(f"python3 scripts/check-codewalk-thinking-order.py {names}"),
          r"■ (\S+)\D+(\d+)", "생각순서")

    # 어려운 말·번역 티 — 출력 모양이 달라서 처음엔 뺐는데, project-lead 가
    # **근거가 약하다**고 했다. 이 검사기는 다른 다섯과 **안 겹치는 층**을 본다
    # (MCC 12개에서 기호 검사기와 완전히 갈렸던 전례). 빼면 "말이 어려운데
    # 기호·내레이션엔 안 걸리는 quest" 가 통째로 0점이 된다. 그래서 파서를 붙였다.
    cur = None
    for line in run(f"python3 scripts/check-word-difficulty.py {names}").splitlines():
        m = re.match(r"^  (\S+)$", line)
        if m:
            cur = m.group(1)
            continue
        if cur and cur in sig and re.match(r"^\s+(🔀|📖|🗣️)", line):
            m2 = re.search(r"(\d+)건", line)
            sig[cur]["말"] = sig[cur].get("말", 0) + (int(m2.group(1)) if m2 else 1)

    for q, _, _ in rows:
        f = os.path.join(ROOT, f"quest-problems/{q}")
        src = "".join(io.open(x, encoding="utf-8", errors="replace").read()
                      for x in glob.glob(f + "/*.jsx"))
        if "beats:" not in src:
            sig[q]["말풍선없음"] = 1

    KEYS = ["기호", "내레이션", "한줄", "스테퍼", "코드이름", "생각순서", "말", "말풍선없음"]

    CAP = 3   # 과목당 최대 점수 — 위 머리말 참고

    def score(q):
        return sum(min(v, CAP) for v in sig[q].values())

    rows.sort(key=lambda r: (-score(r[0]), r[0]))
    print(f"{'quest':<18}{'연도':>5}{'점수':>4}  " + " ".join(f"{k:>4}" for k in KEYS) + "   잠금")
    print(f"{'':<18}{'':>5}{'':>4}  (점수는 과목당 {CAP}점에서 자른 합 · 아래 숫자는 실제 건수)")
    print("-" * 86)
    zero = 0
    for q, y, lk in rows:
        tot = score(q)
        if tot == 0:
            zero += 1
            continue
        print(f"{q:<18}{y:>5}{tot:>4}  " +
              " ".join(f"{sig[q].get(k, 0):>4}" for k in KEYS) + f"   {lk}")
    print(f"\n신호 0건 — {zero}개 (묶음 리뷰로)")
    print("⚠️ **0건은 결백이 아니다.** makedistinct 의 제일 큰 구멍(사다리 첫 칸 없음)은")
    print("   어떤 검사기도 못 잡았다. 0건 quest 도 사람이 한 번은 봐야 한다 — 묶음으로.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
