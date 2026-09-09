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

# 사람이 보고 "이건 설정이지 답이 아니다" 라고 판정한 자리. 이유를 꼭 적어라.
# 계속 울리는 헛경보를 두면 아무도 이 검사기를 안 본다.
ALLOW = {
    # narr: "조약돌이 1번에 있고, 1번과 3번을 교환. 어디로 가?" / 정답 "3번"
    # → 3 은 **문제 설정**(어느 컵과 바꾸는지)이지 답을 말한 게 아니다. 2026-09-09 판정.
    ("shellgame", "3번"),
}

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
        if (f.split("/")[1], o[i].strip()) in ALLOW: continue
        if len(core) >= 2 and core in narr:
            hits.append((f.split("/")[1], o[i][:44], n.group(1)[:60]))
            continue
        # 정답이 "3" 처럼 짧으면 위 규칙이 못 잡는다 (2026-09-08 mcc19elim 에서 놓쳤다:
        # narr 이 두 경우를 다 계산하고 "최선 = 3" 까지 적어놨는데 정답 보기가 "3" 이었다).
        # 짧은 답은 **결론 자리**("= 3", "최선 3", "정답 3", "답은 3")에 있을 때만 신고한다.
        # 그냥 숫자가 스쳐 지나가는 건 문제 설정일 수 있어서다.
        if len(ans) <= 3 and re.search(r"(?:=|최선|정답|답은)\s*" + re.escape(ans) + r"(?![0-9])", narr):
            hits.append((f.split("/")[1], o[i][:44], n.group(1)[:60]))
            continue
        # 정답 보기 안의 "= 숫자" 가 내레이션에도 그대로 있나.
        # 2026-09-09 에 추가 — lifeguards 를 놓쳤다:
        #   보기 "첫째 해고 (커버리지 = 5)" / narr "첫째를 **해고하면** 커버리지 = 3~8 = 5"
        #   조사 하나 차이로 substring 매칭이 빗나갔다. 숫자는 조사가 안 붙는다.
        eq = re.findall(r"=\s*(-?\d+)", o[i])
        if eq and all(re.search(r"=\s*" + re.escape(v) + r"(?![0-9])", narr) for v in eq):
            hits.append((f.split("/")[1], o[i][:44], n.group(1)[:60]))

print(f"퀴즈 내레이션이 정답 보기를 그대로 담은 곳: {len(hits)}건")
print("  (판정이 아니다 — 각 자리를 눈으로 보고 '설정' 인지 '답' 인지 사람이 정해라)\n")
for q, a, nr in hits:
    print(f"  🚨 {q}\n     정답: {a}\n     narr: {nr}…")

# ── 두 번째 검사: 정답 보기만 유독 길다 ──────────────────────────────
# 2026-09-09 에 추가. 스포일러 8건을 고치며 눈에 띄었다 —
# 여러 퀴즈에서 **정답만 설명형으로 길고 나머지는 짧다.**
# 그러면 모르고도 제일 긴 걸 고르면 맞는다. 스포일러와 같은 병이다:
# 학생이 생각하지 않고도 답을 안다.
long_ans = []
for f in sorted(glob.glob("quest-problems/*/chapters.jsx")):
    s2 = io.open(f, encoding="utf-8").read()
    for blk in QUIZ.findall(s2):
        o = re.search(r"options:\s*\[(.*?)\]", blk, re.S)
        c = re.search(r"correct:\s*(\d+)", blk)
        if not (o and c):
            continue
        opts = ko(o.group(1))
        i = int(c.group(1))
        if i >= len(opts) or len(opts) < 3:
            continue
        others = [len(x) for k, x in enumerate(opts) if k != i]
        # 2배 넘게 길고, 그 자체도 짧지 않을 때만 (2026-09-09 기준 17건)
        if others and len(opts[i]) > 2.0 * max(others) and len(opts[i]) >= 16:
            long_ans.append((f.split("/")[1], opts[i][:52]))

print(f"\n정답 보기만 다른 보기의 2배 넘게 긴 퀴즈: {len(long_ans)}건")
print("  (모르고도 제일 긴 걸 고르면 맞는다. 보기 길이를 비슷하게 맞춰라.)")
for q, a in long_ans:
    print(f"  ⚠️ {q:<16} {a}…")

# ── 세 번째 검사: **바로 앞 쪽**이 정답을 미리 말한다 ────────────────
# 2026-09-09 에 추가. 위 두 검사가 mcc15equation 을 0건으로 통과시켰는데,
# 수업 담당이 눈으로 스포일러를 찾아냈다. 원인은 검사기가 **퀴즈 자기 narr 만**
# 봤다는 것이다. 정답 "8가지" 는 퀴즈 앞 쪽(시뮬 쪽) narr 의
#   "빈칸 2개를 채우는 방법은 8가지뿐이에요"
# 에 있었다. 쪽을 넘기면 앞 쪽은 사라지지만, 학생은 **방금 읽고 왔다.**
# 검사기가 한 쪽 안만 보면 쪽과 쪽 사이는 영영 안 걸린다
# (memory/feedback_reviewers_see_pages_teacher_sees_story.md 와 같은 병이다).
STEP_SPLIT = re.compile(r'\n\s*\{\s*\n?\s*type:\s*"')

def steps(src):
    """chapters.jsx 를 스텝 조각으로 자른다.
    split 이 여는 따옴표를 먹으므로 도로 붙인다 — 안 붙이면 따옴표 짝이
    한 칸씩 밀려서 본문이 통째로 빈 문자열로 나온다 (처음에 여기서 틀렸다)."""
    parts = ['"' + x for x in STEP_SPLIT.split(src)]
    parts[0] = parts[0][1:]
    return parts

prev_hits = []
for f in sorted(glob.glob("quest-problems/*/chapters.jsx")):
    s3 = io.open(f, encoding="utf-8").read()
    parts = steps(s3)
    for i, p in enumerate(parts):
        if not p.startswith('"quiz"') or i == 0:
            continue
        o = re.search(r"options:\s*\[(.*?)\]", p, re.S)
        c = re.search(r"correct:\s*(\d+)", p)
        if not (o and c):
            continue
        opts = ko(o.group(1))
        k = int(c.group(1))
        if k >= len(opts):
            continue
        ans = opts[k].strip()
        if (f.split("/")[1], ans) in ALLOW:
            continue
        core = max(re.split(r"[→=]", norm(ans)), key=len)
        prev_text = norm(" ".join(re.findall(r'"((?:[^"\\]|\\.)*)"', parts[i - 1])))
        if len(core) >= 2 and core in prev_text:
            prev_hits.append((f.split("/")[1], ans[:44]))

print(f"\n**앞 쪽**이 퀴즈 정답을 미리 말하는 곳: {len(prev_hits)}건")
print("  (퀴즈 자기 narr 은 깨끗한데 바로 앞 쪽에서 답을 말해버린 자리다.)")
for q, a in prev_hits:
    print(f"  🚨 {q:<16} 정답: {a}…")


sys.exit(1 if (hits or long_ans or prev_hits) else 0)
