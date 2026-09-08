#!/usr/bin/env python3
"""퀴즈 내레이션(narr)이 정답을 미리 말하고 있나.

왜 (2026-09-08): mcc19candy 1-4 퀴즈의 파란 바에
  "'odd' 는 홀수 자리(자리1)를 없애서 자리2 가 살아남아요"
라고 적혀 있고, 바로 아래 질문의 정답이 '자리 2' 였다.
narr 은 질문과 무관하게 항상 먼저 렌더된다 — 안 풀어도 읽고 클릭만 하면 된다.
"화면이 답을 미리 말한다" 는 이 시리즈에서 세 번째로 나온 사고다
(P1 미션 · P2 시뮬 · P3 퀴즈 내레이션).

보정 (아는 참으로 맞췄다):
  처음엔 정답 조각을 4글자 이상으로 잡았더니 **candy 를 못 잡았다** — 정답이 "자리 2",
  공백을 빼면 3글자였기 때문이다. 2글자로 낮추니 candy 가 잡혔고 6건이 더 나왔다.
  그중 shellgame 은 헛경보로 보인다 — "1번과 3번을 교환" 이라는 **문제 설정**에 3번이
  들어 있을 뿐이다. 숫자가 답과 겹치는 건 어쩔 수 없다.
  **이 검사기는 '여기를 눈으로 봐라' 는 표시다. 판정이 아니다.**
"""
import glob, io, re, sys

QUIZ = re.compile(r"\{\s*(?:/\*.*?\*/\s*)?type:\s*\"quiz\"(.*?)\n    \},", re.S)
def ko(m):
    """t(E, "영어", "한국어") 에서 한국어만."""
    out = []
    for a, b in re.findall(r't\(E,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"', m):
        out.append(b)
    return out

def norm(s):
    return re.sub(r"[\s\(\)\[\]'\",.·—–\-!?]+", "", s)

hits = []
for f in sorted(glob.glob("quest-problems/*/chapters.jsx")):
    s = io.open(f, encoding="utf-8").read()
    for blk in QUIZ.findall(s):
        n = re.search(r'narr: t\(E,\s*"(?:[^"\\]|\\.)*"\s*,\s*"((?:[^"\\]|\\.)*)"', blk)
        if not n: continue
        narr = norm(n.group(1))
        opts = re.search(r"options:\s*\[(.*?)\]", blk, re.S)
        cor = re.search(r"correct:\s*(\d+)", blk)
        if not (opts and cor): continue
        o = ko(opts.group(1))
        i = int(cor.group(1))
        if i >= len(o): continue
        ans = norm(o[i])
        if not ans: continue
        # 정답 보기의 핵심 조각이 narr 안에 통째로 들어 있나
        core = max(re.split(r"[→=]", ans), key=len)
        if len(core) >= 2 and core in narr:
            hits.append((f.split("/")[1], o[i][:44], n.group(1)[:60]))
            continue
        # 정답이 "3" 처럼 짧으면 위 규칙이 못 잡는다 (2026-09-08 mcc19elim 에서 놓쳤다:
        # narr 이 두 경우를 다 계산하고 "최선 = 3" 까지 적어놨는데 정답 보기가 "3" 이었다).
        # 짧은 답은 **결론 자리**("= 3", "최선 3", "정답 3", "답은 3")에 있을 때만 신고한다.
        # 그냥 숫자가 스쳐 지나가는 건 문제 설정일 수 있어서다.
        if len(ans) <= 3 and re.search(r"(?:=|최선|정답|답은)\s*" + re.escape(ans) + r"(?![0-9])", narr):
            hits.append((f.split("/")[1], o[i][:44], n.group(1)[:60]))

print(f"퀴즈 내레이션이 정답 보기를 그대로 담은 곳: {len(hits)}건")
print("  (판정이 아니다 — 각 자리를 눈으로 보고 '설정' 인지 '답' 인지 사람이 정해라)\n")
for q, a, nr in hits:
    print(f"  🚨 {q}\n     정답: {a}\n     narr: {nr}…")

sys.exit(1 if hits else 0)
