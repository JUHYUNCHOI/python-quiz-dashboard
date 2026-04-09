import { C, t } from "@/components/quest/theme";

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
        "Cows walk along a fence (polygon). Each takes the shorter route between start and end. Find distances! 🚶",
        "소들이 울타리(다각형)를 따라 걸어. 각자 시작점에서 끝점까지 짧은 경로로! 거리를 구해! 🚶"),
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
        "On a closed loop of perimeter L, the shorter distance between two points is min(d, L-d) where d is the distance going one way.",
        "둘레 L인 폐곡선에서 두 점 사이 짧은 거리는 min(d, L-d). d는 한쪽 방향 거리."),
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
        "Square fence: (0,0)→(2,0)→(2,2)→(0,2). Perimeter=8. Cow walks from (0,0) to (0,2). One way=2 (up), other=6 (around). Answer?",
        "정사각 울타리: (0,0)→(2,0)→(2,2)→(0,2). 둘레=8. 소가 (0,0)에서 (0,2)로. 한쪽=2(위로), 다른쪽=6(돌아서). 답?"),
      question: t(E, "Shorter distance?", "더 짧은 거리?"),
      answer: 2,
    },
  ];
}

export function makeWalkCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E, "Find each point's position on the perimeter, compute distance, take min with complement.", "각 점의 둘레 위 위치를 찾고, 거리 계산, 보완값과 min."),
      content: (<div style={{ padding: 16, textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(NP)</div></div>),
    },
    {
      type: "code",
      narr: t(E, "Find position on perimeter, compute shortest path!", "둘레 위 위치 찾고 최단 경로 계산!"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
