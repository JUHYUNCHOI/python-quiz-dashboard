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
        "Cows are added one by one to a 2D grid.\nA cow is 'comfortable' if it has exactly 3 neighbors (up/down/left/right).\nAfter each addition, count comfortable cows!", "소들이 2D 격자에 하나씩 추가돼. 소가 정확히 3개의 이웃(상하좌우)이 있으면 '편안'해. 각 추가 후 편안한 소의 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Comfortable Cows</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: When adding a cow, only the new cow and its 4 neighbors can change comfort status. Use a set for O(1) lookups.",
              "핵심: 소를 추가할 때 새 소와 4개의 이웃만 편안함 상태가 바뀔 수 있어. O(1) 조회를 위해 집합 사용.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A cow at (1,1) has neighbors at (0,1), (2,1), (1,0).\nThat's 3 neighbors.\nIs it comfortable?", "소가 (1,1)에 있고 이웃이 (0,1), (2,1), (1,0)에 있어. 이웃이 3마리야. 편안할까?"),
      question: t(E,
        "Cow at (1,1) with 3 neighbors. Comfortable?",
        "(1,1)의 소, 이웃 3마리. 편안해?"),
      options: [
        t(E, "Yes, exactly 3 neighbors", "네, 정확히 이웃 3마리"),
        t(E, "No, needs 4 neighbors", "아니요, 이웃 4마리 필요"),
      ],
      correct: 0,
      explain: t(E,
        "A cow is comfortable with exactly 3 neighbors. (1,1) has 3 occupied neighbors, so it's comfortable!",
        "소는 정확히 이웃 3마리면 편안해. (1,1)은 점유된 이웃이 3개이므로 편안해!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A cow with exactly 3 neighbors is comfortable.\nEnter 1 for yes, 0 for no: is it comfortable?", "이웃이 정확히 3마리인 소는 편안해. 편안하면 1, 아니면 0 입력:"),
      question: t(E,
        "Cow with exactly 3 neighbors: comfortable? (1=yes, 0=no)",
        "이웃 3마리인 소: 편안? (1=예, 0=아니오)"),
      hint: t(E,
        "The definition says exactly 3 neighbors makes a cow comfortable.",
        "정의상 정확히 이웃 3마리면 소가 편안해."),
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
        "Use a hash set for cow positions.\nWhen adding a cow, update comfort for it and its 4 neighbors.\nO(N) total!", "소 위치에 해시 집합 사용. 소를 추가할 때 그 소와 4개 이웃의 편안함 갱신. 총 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Each cow addition triggers at most 5 comfort checks (itself + 4 neighbors). Total work is O(5N) = O(N).",
              "각 소 추가는 최대 5번의 편안함 확인 (자신 + 이웃 4). 총 작업량은 O(5N) = O(N).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getComfyCowsSections(E),
    },
  ];
}
