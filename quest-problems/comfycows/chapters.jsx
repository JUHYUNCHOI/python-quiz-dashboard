import { C, t } from "@/components/quest/theme";
import { getComfyCowsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "cows = set()",
  "comfortable = set()",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "def count_neighbors(x, y):",
  "    return sum(1 for dx,dy in dirs if (x+dx,y+dy) in cows)",
  "",
  "def update_comfort(x, y):",
  "    n = count_neighbors(x, y)",
  "    if n == 3:",
  "        comfortable.add((x,y))",
  "    else:",
  "        comfortable.discard((x,y))",
  "",
  "results = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    cows.add((x, y))",
  "    # Update comfort for new cow and its neighbors",
  "    update_comfort(x, y)",
  "    for dx, dy in dirs:",
  "        nx, ny = x+dx, y+dy",
  "        if (nx, ny) in cows:",
  "            update_comfort(nx, ny)",
  "    results.append(len(comfortable))",
  "",
  "for r in results:",
  "    print(r)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeComfyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ adds N cows to an infinite 2D grid one at a time, each at a distinct cell.\nA cow is COMFORTABLE if it currently has exactly 3 of the 4 up/down/left/right neighbor cells occupied.\nAfter each addition, print the total number of comfortable cows on the grid.",
        "FJ가 무한한 2D 격자에 N마리 소를 한 마리씩 서로 다른 칸에 추가해요.\n어떤 소가 상하좌우 이웃 칸 4개 중 정확히 3개가 채워져 있으면 그 소는 '편안'해요.\n각 추가 직후, 격자 위 편안한 소의 총 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Comfortable Cows</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ adds ", "FJ가 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows one at a time", "N마리 소를 한 마리씩")}</b>
                  {t(E, " to an infinite 2D grid, each at a distinct cell.",
                        " 무한 2D 격자의 서로 다른 칸에 추가해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A cow is ", "어떤 소가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "COMFORTABLE", "편안 (COMFORTABLE)")}</b>
                  {t(E, " if exactly 3 of its 4 up/down/left/right neighbor cells are currently occupied.",
                        "하려면 상하좌우 4개의 이웃 칸 중 정확히 3개가 그 시점에 차 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "After each addition, print the ", "각 추가 직후 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "current count of comfortable cows", "현재 편안한 소의 개수")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "A cow at (1,1) has neighbors at (0,1), (2,1), (1,0).\nThat's 3 neighbors.\nIs it comfortable?", "소가 (1,1)에 있고 이웃이 (0,1), (2,1), (1,0)에 있어요. 이웃이 3마리예요. 편안할까?"),
      question: t(E,
        "Cow at (1,1) with 3 neighbors. Comfortable?",
        "(1,1)의 소, 이웃 3마리. 편안해요?"),
      options: [
        t(E, "Yes, exactly 3 neighbors", "네, 정확히 이웃 3마리"),
        t(E, "No, needs 4 neighbors", "아니요, 이웃 4마리 필요"),
      ],
      correct: 0,
      explain: t(E,
        "A cow is comfortable with exactly 3 neighbors. (1,1) has 3 occupied neighbors, so it's comfortable!",
        "소는 정확히 이웃 3마리면 편안해요. (1,1)은 점유된 이웃이 3개이므로 편안해요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A cow with exactly 3 neighbors is comfortable.\nEnter 1 for yes, 0 for no: is it comfortable?", "이웃이 정확히 3마리인 소는 편안해요. 편안하면 1, 아니면 0 입력:"),
      question: t(E,
        "Cow with exactly 3 neighbors: comfortable? (1=yes, 0=no)",
        "이웃 3마리인 소: 편안? (1=예, 0=아니오)"),
      hint: t(E,
        "The definition says exactly 3 neighbors makes a cow comfortable.",
        "정의상 정확히 이웃 3마리면 소가 편안해요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeComfyCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Maintain a SET of cow positions and a current comfort count. When a new cow is added, only the new cow + her 4 neighbors can change comfort status — recheck just those 5 cells.",
        "소 위치 집합 (SET) 과 현재 편안한 소의 수를 유지. 새 소가 추가되면 그 소 + 4 이웃 만이 편안 상태가 바뀔 수 있으니 그 5 칸만 재확인."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getComfyCowsSections(E),
    },
  ];
}
