#!/usr/bin/env python3
"""quest 의 **알고리즘 배지**가 🔒 최종 코드와 맞나 — 토픽 20개 전수.

  python3 scripts/check-algo-badge-vs-code.py [quest-id ...]

배지는 `lib/quest-algo.ts` 의 `QUEST_ALGO` 에 있고, 학생이 그 배지를 눌러
`/algo/<topic>` 으로 간다. **배지가 틀리면 엉뚱한 토픽을 배우러 간다.**

─────────────────────────────────────────────────────────────────────────
왜 생겼나 (2026-09-29)

2026-09-26 에 배지 감사를 한 번 했는데 **`graph` 토픽만** 봤다(`6769cec4`).
`quest-auditor` 가 「남은 일 정비」 중에 다른 토픽도 훑어 **확정 오류 넷**을 찾았다 —
  `triangles`   = hashtable 인데 코드에 dict/set/map **0회** (순수 O(N²) 이중 for)
  `palindrome`  = dp 인데 `dp[`·`memo` 없이 `if S[-1]=='0'` 한 줄 (게임이론/관찰)
  `milkorder`   = topologicalsort 인데 in-degree·큐 없이 「다음 빈 자리」 순차 탐색
  `mcc19rect`   = sorting 인데 `.sort()` **0회** (주석으로 「이미 정렬돼 있다」 가정만)
사람이 토픽 하나씩 손으로 훑는 한 **다음 토픽도 또 놓친다.** 그래서 전수로 돌린다.

⚠️ **판정이 아니라 볼 자리 표시다.** 신호가 없다고 곧 틀린 배지는 아니다 —
   그 토픽의 *생각*을 가르치면서 코드엔 자료구조가 안 나올 수 있다
   (예: `greedy` 는 「정렬 후 앞에서부터」라 코드에 특징적 이름이 없다).
   ⭐ 그래서 **신호가 뚜렷한 토픽만** 본다. 나머지는 `못 봄` 으로 따로 센다.
⚠️ 0건이 결백이 아니다 — 반대 방향(배지가 없는데 그 알고리즘을 쓰는 것)은 안 본다.
─────────────────────────────────────────────────────────────────────────
"""
import io, json, re, subprocess, sys, glob, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 코드에 **반드시 흔적이 남는** 토픽만. 흔적이 안 남는 토픽은 일부러 뺐다.
SIGNS = {
    # ⚠️ 2026-09-29: 처음 만든 정규식이 **너무 좁아서 헛경보가 절반이었다.**
    #    손으로 여덟을 다 열어 보니 대부분 「그 토픽이 맞는데 내가 찾던 낱말만 안 쓴」 것이었다.
    #    ⭐ 잣대를 **낱말이 아니라 모양**으로 넓힌다.
    "hashtable":       [r"\bdict\b", r"\bset\(", r"\bmap<", r"unordered_map", r"defaultdict",
                        r"Counter", r"=\s*\{",        # ← `adj = {…}` 딕셔너리 리터럴 (mcc22grammar)
                        r"\{[^}]*:[^}]*\}", r"\.get\("],
    "dp":              [r"\bdp\s*[\[=]", r"\bmemo\b", r"lru_cache",
                        r"=\s*\[\s*\[",              # ← 2차원 표를 만들면 이름이 dp 가 아니어도 DP다
                        r"\[\s*0\s*\]\s*\*",       # ← `[0] * (K+1)` 표 초기화 (mcc20zigzag 의 up/dn)
                        r"\brank\s*=\s*\{", r"\bMOD\b"],
    "sorting":         [r"\.sort\(", r"\bsorted\(", r"sort\(.*begin", r"std::sort"],
    "binarysearch":    [r"\bbisect", r"lower_bound", r"upper_bound", r"while\s+lo\s*<", r"while\s+left\s*<"],
    # ⭐ **누적 합의 짝은 「차분 배열」이다** — 같은 토픽인데 코드 모양이 정반대다.
    #    실측 오탐 넷(aircond1·bacteria·bucketlist·mcc21marbles)이 전부 이 모양이었다:
    #      `d = [p[i]-c[i] …]` · `diff(diff(a))` · `events.append((e+1, -b))` · `carry += A[i]-B[i]`
    "prefixsum":       [r"\bprefix", r"\bpre\w*sum", r"\bcum\w*", r"accumulate",
                        r"\bdiff\b", r"\bcarry\b", r"\[i\s*-\s*1\]", r",\s*-\w+\)",
                        r"\brunning\b", r"\btotal\s*\+="],
    "unionfind":       [r"\bfind\s*\(", r"\bunion\b", r"\bparent\s*\[", r"\bdsu\b"],
    "graph":           [r"\badj\b", r"\bdeque\b", r"popleft", r"\bqueue\b", r"\bdfs\b", r"\bbfs\b", r"visited"],
    "topologicalsort": [r"indegree", r"in_degree", r"\btopo", r"popleft"],
    "priorityqueue":   [r"heapq", r"heappush", r"priority_queue", r"\bheap\b"],
    "stackqueue":      [r"\bstack\b", r"\.pop\(\)", r"\bdeque\b", r"popleft"],
    "trie":            [r"\btrie\b", r"children\s*\[", r"\bnode\b.*\bchild"],
    "bitmanipulation": [r"<<", r">>", r"\&\s*1\b", r"\bxor\b", r"\^"],
    "shortestpath":    [r"dijkstra", r"heapq", r"\bdist\s*\[", r"bellman"],
    "tree":            [r"\bleft\b.*\bright\b", r"\broot\b", r"\bchild"],
    "recursion":       [r"def\s+(\w+)\([^)]*\):(?:.|\n)*?\1\("],
    "backtracking":    [r"backtrack", r"\.pop\(\)\s*$", r"permutations", r"itertools"],
}

def final_code(qid):
    """🔒 최종 코드를 가져온다.

    ⚠️ **처음엔 정규식으로 코드 배열을 직접 찾다가 조용히 틀렸다(2026-09-29).**
       `FULL|SOLUTION|FAST|OPT|M3` 로 변수 이름을 짐작했는데, 그 밖의 이름을 쓰는
       quest 에서 **엉뚱한 배열을 읽거나 아예 못 읽었다** — 실측: `walkhome` 이
       실제로는 `dp = [[[[0]...` 를 쓰는데 「dp 흔적 없음」으로 신고됐고, 코드가
       10줄이라고 나왔다(실제는 훨씬 길다).
    ⭐ **이미 있는 걸 쓴다.** `scripts/run-quest-code.py --show` 가 quest 의 정답
       코드를 찾는 **검증된 추출기**다. 두 번째 추출기를 만들지 않는다
       (`feedback_fix_all_at_once_not_one_by_one` — 있는 걸 확인 안 하고 새로 만들기).
    """
    try:
        r = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "run-quest-code.py"),
                            qid, "--show"], capture_output=True, text=True, timeout=30)
        code = r.stdout
    except Exception:
        return ""
    # 코드 줄의 주석은 떼어낸다 — 「# BFS 로 푼다」 가 신호로 잡히면 안 된다
    return "\n".join(re.sub(r"(#|//).*$", "", ln) for ln in code.split("\n"))

def main():
    ts = io.open(os.path.join(ROOT, "lib", "quest-algo.ts"), encoding="utf-8").read()
    ts = re.sub(r"//.*$", "", ts, flags=re.M)
    badges = dict(re.findall(r'(\w+)\s*:\s*"([a-z]+)"', ts))
    want = set(sys.argv[1:]) - {"--all"}
    # ── 사람이 코드를 열어 «맞는 배지다» 로 닫은 자리는 빼고 센다 ──────────────
    # ⛔ fail-open 금지 — 목록을 못 읽으면 **하나도 빼지 않는다.**
    accepted = set()
    try:
        with io.open(os.path.join(ROOT, "scripts", "algo-badge-accepted.json"), encoding="utf-8") as fh:
            for row in json.load(fh).get("accepted", []):
                accepted.add((row["quest"], row["badge"]))
    except Exception as e:
        print(f"⚠️ 승인 목록을 못 읽었다({e}) — 하나도 빼지 않는다.\n")

    hits, seen, skipped = [], 0, 0
    for qid, topic in sorted(badges.items()):
        if (qid, topic) in accepted:
            continue
        if want and qid not in want: continue
        if topic not in SIGNS:
            skipped += 1; continue
        code = final_code(qid)
        # ⚠️ 추출이 몇 줄 안 되면 **「흔적 없음」이 아니라 「못 읽음」** 이다.
        #    실측: `lc3`·`lc303`·`interview` 등이 2줄로 나왔는데, 코드가 없는 게 아니라
        #    추출기가 그 quest 모양을 못 읽은 것이다. 이걸 신고로 세면 **헛경보가 절반**이다.
        if len([l for l in code.split("\n") if l.strip()]) < 5:
            skipped += 1; continue
        seen += 1
        if not any(re.search(p, code, re.I | re.M) for p in SIGNS[topic]):
            hits.append((qid, topic, len(code.split("\n"))))
    print(f"배지가 가리키는 알고리즘의 **흔적이 코드에 없는** quest — {len(hits)}개 "
          f"(신호가 뚜렷한 토픽으로 {seen}개를 봤다 · {skipped}개는 못 봄)\n")
    for qid, topic, n in hits:
        print(f"  ■ {qid:<16} 배지 «{topic}» — 코드 {n}줄에 그 흔적이 없다")
    print("\n⚠️ **판정이 아니라 볼 자리 표시다.** 그 토픽의 *생각*을 가르치면서 코드엔")
    print("   자료구조가 안 나올 수 있다. **코드를 열어 사람이 정해라.**")
    print("⚠️ 0건이 결백이 아니다 — 반대 방향(배지 없는데 그 알고리즘을 쓰는 것)은 안 본다.")
    print("⚠️ 신호가 안 남는 토픽(greedy·array·string·divideconquer 등)은 **일부러 뺐다.**")
    return 1 if hits else 0

if __name__ == "__main__":
    sys.exit(main())
