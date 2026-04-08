import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "cows = ['Bessie','Buttercup','Belinda','Beatrice',",
  "        'Bella','Blue','Betsy','Sue']",
  "cows.sort()",
  "",
  "N = int(input())",
  "adj = {c: [] for c in cows}",
  "",
  "for _ in range(N):",
  "    line = input().split()",
  "    # 'X must be milked beside Y'",
  "    a, b = line[0], line[-1]",
  "    adj[a].append(b)",
  "    adj[b].append(a)",
  "",
  "# Build chains (each cow has degree ≤ 2)",
  "used = set()",
  "result = []",
  "",
  "for c in cows:  # alphabetical order",
  "    if c not in used:",
  "        # Find start of chain (degree 0 or 1)",
  "        if len(adj[c]) <= 1:",
  "            chain = []",
  "            cur = c",
  "            prev = None",
  "            while cur:",
  "                chain.append(cur)",
  "                used.add(cur)",
  "                nxt = None",
  "                for nb in adj[cur]:",
  "                    if nb != prev:",
  "                        nxt = nb",
  "                        break",
  "                prev = cur",
  "                cur = nxt",
  "            result.extend(chain)",
  "",
  "for c in result:",
  "    print(c)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "8 cows with N adjacency constraints (\"X must be beside Y\"). Find the lexicographically smallest valid ordering. Model as a graph: constraints form chains since max degree is 2.",
        "8마리 소에 N개 인접 조건 (\"X는 Y 옆에 있어야 함\"). 사전순 최소 유효 순서를 구해. 그래프로 모델링: 최대 차수가 2이므로 체인을 형성."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🐄"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Livestock Lineup</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Each constraint is an edge. Max degree 2 means the graph forms chains. Traverse chains in alphabetical order, inserting unconstrained cows alphabetically between chains.",
              "핵심: 각 조건은 간선. 최대 차수 2이므로 그래프는 체인을 형성. 체인을 알파벳 순서로 탐색하고, 제약 없는 소는 체인 사이에 알파벳순으로 삽입.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there are 0 constraints, all 8 cows are free. The lexicographically smallest ordering is simply alphabetical order!",
        "조건이 0개이면 8마리 소 모두 자유야. 사전순 최소 순서는 단순히 알파벳 순서!"),
      question: t(E,
        "0 constraints, 8 cows. How many cows in the lineup?",
        "조건 0개, 소 8마리. 줄에 소가 몇 마리?"),
      options: [
        t(E, "6", "6"),
        t(E, "7", "7"),
        t(E, "8", "8"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! All 8 cows must appear in the lineup regardless of constraints.",
        "정답! 조건과 상관없이 모든 8마리 소가 줄에 나와야 해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With 0 constraints, the answer is just alphabetical order. How many cows are there in total?",
        "조건 0개이면 답은 알파벳 순서. 총 소는 몇 마리?"),
      question: t(E,
        "How many cows total in Livestock Lineup?",
        "Livestock Lineup에서 총 소는 몇 마리?"),
      hint: t(E,
        "The problem always has exactly 8 cows.",
        "이 문제는 항상 정확히 8마리 소가 있어."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Only 8 cows! Build adjacency graph, find chain endpoints, traverse chains. O(N) where N is small.",
        "소가 8마리뿐! 인접 그래프를 만들고, 체인 끝점을 찾고, 체인을 탐색. N이 작으므로 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort cows alphabetically. Iterate in order: if a cow is unvisited and is a chain start (degree ≤ 1), traverse the chain. This greedily produces the lex-smallest ordering.",
              "소를 알파벳순 정렬. 순서대로 반복: 소가 미방문이고 체인 시작(차수 ≤ 1)이면 체인 탐색. 이 그리디가 사전순 최소 순서를 생성.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full graph + greedy solution!",
        "그래프 + 그리디 전체 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
