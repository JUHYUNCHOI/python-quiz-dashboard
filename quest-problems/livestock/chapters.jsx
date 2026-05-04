import { C, t } from "@/components/quest/theme";
import { getLivestockSections } from "./components";

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
        "FJ has 8 named cows (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue). He wants to line them up with N constraints — each constraint says \"cow X must be ADJACENT to cow Y\".\nPrint the LEXICOGRAPHICALLY SMALLEST valid lineup, or 'IMPOSSIBLE'.",
        "FJ 에게 이름이 정해진 8마리 소 (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue) 가 있어요. N개의 제약 — 각각 \"X 와 Y 는 옆에 있어야 함\" — 을 모두 만족하는 한 줄 배열을 만들어요.\n사전순으로 가장 작은 유효 배열을 출력해요. 불가능하면 'IMPOSSIBLE'."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"🐄"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Livestock Lineup</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Line up FJ's ", "FJ 의 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "8 named cows", "이름 있는 8마리 소")}</b>
                  {t(E, " (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue) in a single row.",
                        " 를 한 줄로 세워요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N constraints", "N 개의 제약")}</b>
                  {t(E, " of the form \"cow X must be adjacent to cow Y\".",
                        " 이 있어요 — 각각 \"X 와 Y 는 옆에 있어야 함\".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest valid lineup", "사전순으로 가장 작은 유효 배열")}</b>
                  {t(E, ", or 'IMPOSSIBLE' if none exists.", " 을 출력해요. 불가능하면 'IMPOSSIBLE'.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there are 0 constraints, all 8 cows are free.\nThe lexicographically smallest ordering is simply alphabetical order!", "조건이 0개이면 8마리 소 모두 자유예요. 사전순 최소 순서는 단순히 알파벳 순서!"),
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
        "정답! 조건과 상관없이 모든 8마리 소가 줄에 나와야 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With 0 constraints, the answer is just alphabetical order.\nHow many cows are there in total?", "조건 0개이면 답은 알파벳 순서. 총 소는 몇 마리?"),
      question: t(E,
        "How many cows total in Livestock Lineup?",
        "Livestock Lineup에서 총 소는 몇 마리?"),
      hint: t(E,
        "The problem always has exactly 8 cows.",
        "이 문제는 항상 정확히 8마리 소가 있어요."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Only 8 cows!\nBuild adjacency graph, find chain endpoints, traverse chains.\nO(N) where N is small.", "소가 8마리뿐! 인접 그래프를 만들고, 체인 끝점을 찾고, 체인을 탐색. N이 작으므로 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort cows alphabetically.\nIterate in order: if a cow is unvisited and is a chain start (degree ≤ 1), traverse the chain. This greedily produces the lex-smallest ordering.",
              "소를 알파벳순 정렬.\n순서대로 반복: 소가 미방문이고 체인 시작(차수 ≤ 1)이면 체인 탐색.\n이 그리디가 사전순 최소 순서를 생성.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getLivestockSections(E),
    },
  ];
}
