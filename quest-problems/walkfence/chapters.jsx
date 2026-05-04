import { C, t } from "@/components/quest/theme";
import { getWalkFenceSections } from "./components";

export const SOLUTION_CODE = [
  "N, P = map(int, input().split())",
  "posts = []",
  "for _ in range(P):",
  "    x, y = map(int, input().split())",
  "    posts.append((x, y))",
  "",
  "# Compute perimeter distances from post 0",
  "# Each segment between consecutive posts",
  "perimeter = 0",
  "seg_dist = []  # cumulative distance at each post",
  "cum = [0]",
  "for i in range(P):",
  "    j = (i + 1) % P",
  "    d = abs(posts[j][0]-posts[i][0]) + abs(posts[j][1]-posts[i][1])",
  "    seg_dist.append(d)",
  "    perimeter += d",
  "    cum.append(perimeter)",
  "",
  "def find_pos(x, y):",
  "    # Find which segment (x,y) lies on",
  "    for i in range(P):",
  "        j = (i + 1) % P",
  "        px, py = posts[i]",
  "        qx, qy = posts[j]",
  "        # Check if point is on segment (px,py)-(qx,qy)",
  "        if px == qx == x:  # vertical",
  "            if min(py,qy) <= y <= max(py,qy):",
  "                return cum[i] + abs(y - py)",
  "        elif py == qy == y:  # horizontal",
  "            if min(px,qx) <= x <= max(px,qx):",
  "                return cum[i] + abs(x - px)",
  "    return -1",
  "",
  "for _ in range(N):",
  "    x1,y1,x2,y2 = map(int, input().split())",
  "    d1 = find_pos(x1, y1)",
  "    d2 = find_pos(x2, y2)",
  "    diff = abs(d1 - d2)",
  "    print(min(diff, perimeter - diff))",
];

export function makeWalkCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Cows walk along a fence (polygon).\nEach takes the shorter route between start and end.\nFind distances!\n🚶", "소들이 울타리(다각형)를 따라 걸어. 각자 시작점에서 끝점까지 짧은 경로로! 거리를 구해! 🚶"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🚶</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Walking Along a Fence</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Rectilinear polygon fence. Each cow walks the shorter way around. Compute distance for each cow!",
              "직각 다각형 울타리. 각 소는 더 짧은 방향으로 걸어. 각 소의 거리를 계산!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "On a closed loop of perimeter L, the shorter distance between two points is min(d, L-d) where d is the distance going one way.", "둘레 L인 폐곡선에서 두 점 사이 짧은 거리는 min(d, L-d). d는 한쪽 방향 거리."),
      question: t(E,
        "Perimeter = 8. Distance one way = 3. Shorter route?",
        "둘레 = 8. 한쪽 거리 = 3. 더 짧은 경로?"),
      options: ["3", "5", "4"],
      correct: 0,
      explain: t(E, "min(3, 8-3) = min(3, 5) = 3!", "min(3, 8-3) = min(3, 5) = 3!"),
    },
    {
      type: "input",
      narr: t(E,
        "Square fence: (0,0)→(2,0)→(2,2)→(0,2).\nPerimeter=8.\nCow walks from (0,0) to (0,2).\nOne way=2 (up), other=6 (around).\nAnswer?", "정사각 울타리: (0,0)→(2,0)→(2,2)→(0,2). 둘레=8. 소가 (0,0)에서 (0,2)로. 한쪽=2(위로), 다른쪽=6(돌아서). 답?"),
      question: t(E, "Shorter distance?", "더 짧은 거리?"),
      answer: 2,
    },
    {
      type: "sim",
      narr: t(E,
        "3 fence shapes, 2 stages each: see total perimeter, then cow points + shorter side.", "3가지 울타리 모양, 각 2단계: 총 둘레, 소 위치 + 짧은 쪽."),
    },
  ];
}

export function makeWalkCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "4 steps: cumulative perimeter, find each point's distance from post 0, take the shorter side.",
        "4단계: 둘레 누적 거리 → 각 점의 코너 0 거리 찾기 → 짧은 쪽 선택."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read posts", "코너 읽기"), code: "posts = [(x0,y0), (x1,y1), ...]", color: "#16a34a" },
              { n: 2, label: t(E, "Cumulative perimeter", "누적 둘레"), code: "cum[i] = distance from post 0 to post i", color: "#0891b2" },
              { n: 3, label: t(E, "Find each cow's position", "소 위치 찾기"), code: "find_pos(x, y) → distance along perimeter", color: "#8b5cf6" },
              { n: 4, label: t(E, "Pick shorter side", "짧은 쪽"), code: "answer = min(|d1 − d2|, perimeter − |d1 − d2|)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>O(N · P)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N cows × P posts to scan per query", "소 N마리 × 쿼리당 코너 P개 스캔")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the perimeter walker step by step.", "둘레 거리 계산기를 단계별로 만들자."),
      sections: getWalkFenceSections(E),
    },
  ];
}
