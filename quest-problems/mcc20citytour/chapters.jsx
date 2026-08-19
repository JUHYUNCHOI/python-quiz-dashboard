import { C, t } from "@/components/quest/theme";
import { getMcc20CityTourSections, Mcc20CityTourBfsSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (flood-fill / BFS with the |Δheight| < D edge rule)
   Input format:  line 1 = "M N",  then M lines of N heights,  last = "D".
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import deque",
  "",
  "M, N = map(int, input().split())",
  "H = []",
  "for _ in range(M):",
  "    H.append(list(map(int, input().split())))",
  "D = int(input())",
  "",
  "visited = [[False]*N for _ in range(M)]",
  "visited[0][0] = True          # start at (1,1) = index (0,0)",
  "q = deque([(0, 0)])",
  "count = 1",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<M and 0<=nc<N and not visited[nr][nc] \\",
  "                and abs(H[nr][nc]-H[r][c]) < D:",
  "            visited[nr][nc] = True",
  "            q.append((nr, nc))",
  "            count += 1",
  "",
  "print(count)",
];

export function makeMcc20CityTourCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "The city is a grid of building HEIGHTS. Fluffy starts at the top-left (1,1) and hops to an adjacent cell only when the two heights differ by less than D.\nPrint how many cells Fluffy can reach (counting the start).",
        "도시는 건물 높이 격자예요. Fluffy 는 왼쪽 위 (1,1) 에서 시작해 이웃 칸과 높이 차이가 D 보다 작을 때만 건너가요.\nFluffy 가 도달할 수 있는 칸의 수 (시작 포함) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🏙️"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#d97706" }}>City Tour</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Count the cells Fluffy can reach from (1,1), hopping only where |height difference| < D.",
                "높이 차이 < D 인 곳으로만 건너면서, (1,1) 에서 Fluffy 가 도달할 수 있는 칸의 수를 세요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The city is an M×N grid where each cell holds a ", "도시는 M×N 격자이고 각 칸에는 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "building height H(i,j)", "건물 높이 H(i,j)")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Fluffy starts at ", "Fluffy 는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "(1,1)", "(1,1)")}</b>
                  {t(E, " and may jump to an adjacent cell (up/down/left/right) only if ", " 에서 시작하고, 인접 칸 (상하좌우) 으로는 ")}
                  <b style={{ color: "#dc2626", whiteSpace: "nowrap" }}>{t(E, "|H(here) − H(there)| < D", "|H(현재) − H(이웃)| < D")}</b>
                  {t(E, ".", " 일 때만 건너가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of cells reachable from the start (including the start)", "시작에서 도달 가능한 칸의 수 (시작 포함)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The heights come as an M×N grid, and D is a single number read last.",
        "입력 형식과 공식 예제를 봐요. 높이는 M×N 격자로 들어오고, D 는 맨 마지막에 한 숫자로 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Line 1: ", "1번째 줄: ")}<b style={{ whiteSpace: "nowrap" }}>M N</b> — {t(E, "rows and columns", "행 수와 열 수")}</div>
              <div>• {t(E, "Next M lines: ", "다음 M 줄: ")}<b>{t(E, "N heights each", "각 줄에 N 개의 높이")}</b></div>
              <div>• {t(E, "Last line: ", "마지막 줄: ")}<b>D</b> — {t(E, "the jump threshold", "점프 기준값")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ M, N; M×N ≤ 100000; 1 ≤ D ≤ 100000; −10^6 ≤ H ≤ 10^6.", "제약: 1 ≤ M, N; M×N ≤ 100000; 1 ≤ D ≤ 100000; −10^6 ≤ H ≤ 10^6.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>4 5</div>
              <div>1 3 7 9 16</div>
              <div>6 2 4 1 8</div>
              <div>8 9 10 12 14</div>
              <div>7 5 1 4 11</div>
              <div>5</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>18</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "With D = 5, every cell is reachable except (1,5)=16 and (2,5)=8 — both are cut off by too-big height gaps to their neighbors. That leaves 18 of the 20 cells.",
              "D = 5 일 때 (1,5)=16 과 (2,5)=8 만 빼고 모든 칸에 갈 수 있어요 — 둘 다 이웃과의 높이 차가 너무 커서 막혀요. 그래서 20 칸 중 18 칸이에요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the rule. Slide D up and down and watch the reachable region flood-fill out from Fluffy's start.",
        "규칙을 직접 느껴봐요. D 를 올리고 내리면서 Fluffy 시작점에서 갈 수 있는 영역이 번져 나가는 걸 봐요."),
      content: <Mcc20CityTourBfsSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "The edge rule is strict: the height gap must be LESS than D, not equal. A gap exactly equal to D is blocked.",
        "간선 규칙은 엄격해요: 높이 차가 D 보다 '작아야' 해요, 같으면 안 돼요. 차이가 정확히 D 면 막혀요."),
      question: t(E,
        "Fluffy is on a building of height 10 with D = 3. Which neighbor can Fluffy hop to?",
        "Fluffy 가 높이 10 인 건물에 있고 D = 3 이에요. 어느 이웃으로 건너갈 수 있을까요?"),
      options: [
        t(E, "height 12  (gap 2)", "높이 12  (차이 2)"),
        t(E, "height 7  (gap 3)", "높이 7  (차이 3)"),
        t(E, "height 15  (gap 5)", "높이 15  (차이 5)"),
      ],
      correct: 0,
      explain: t(E,
        "|10 − 12| = 2 < 3, so yes. |10 − 7| = 3 is NOT less than 3 (the rule is strict), and |10 − 15| = 5 is too big. Only height 12 works.",
        "|10 − 12| = 2 < 3 이라 가능해요. |10 − 7| = 3 은 3 보다 작지 않아서 (규칙이 엄격) 안 되고, |10 − 15| = 5 는 너무 커요. 높이 12 만 가능해요."),
    },
  ];
}

export function makeMcc20CityTourCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow sweep vs fast flood-fill
    {
      type: "reveal",
      narr: t(E,
        "A naive idea: sweep the whole grid over and over, each pass marking any cell reachable from an already-reachable neighbor, until nothing new appears — up to M×N passes over M×N cells, (10^5)² = 10^10. Flood-fill (BFS) instead visits each cell just once: pop it, check its 4 neighbors, push the new ones. About 4×M×N ≈ 4×10^5.",
        "단순한 생각: 격자 전체를 몇 번이고 훑으면서, 이미 갈 수 있는 이웃 옆의 칸을 표시하고, 더 안 생길 때까지 반복 — 최대 M×N 번 훑기 × M×N 칸, (10^5)² = 10^10. 대신 플러드필 (BFS) 은 각 칸을 딱 한 번만 봐요: 꺼내고, 4 이웃 확인하고, 새 칸만 넣기. 약 4×M×N ≈ 4×10^5."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: sweep the whole grid until nothing changes", "느림: 변화가 없을 때까지 격자 전체를 반복해서 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Up to (M×N) passes × (M×N) cells = (10^5)² = 10^10 operations. Times out.", "최대 (M×N) 번 × (M×N) 칸 = (10^5)² = 10^10 연산. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: flood-fill (BFS) — visit each cell once", "빠름: 플러드필 (BFS) — 각 칸을 한 번만 방문")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Each cell enters the queue once; we check its 4 neighbors once. Total ≈ 4×M×N ≈ 4×10^5.", "각 칸은 큐에 한 번 들어가고, 4 이웃을 한 번 확인. 합계 ≈ 4×M×N ≈ 4×10^5.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "The edge rule stays the same: step to a neighbor only if |Δheight| < D.", "간선 규칙은 그대로: 이웃과 높이 차 |Δheight| < D 일 때만 건너기.")}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc20CityTourSections(E),
    },
  ];
}
