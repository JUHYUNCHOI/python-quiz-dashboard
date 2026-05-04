import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import heapq",
  "",
  "N, M = map(int, input().split())",
  "adj = [[] for _ in range(N+1)]",
  "edges = []",
  "for i in range(M):",
  "    x, y, w = map(int, input().split())",
  "    edges.append((x,y,w))",
  "    adj[x].append((y,w,i))",
  "    adj[y].append((x,w,i))",
  "",
  "S = int(input())",
  "damaged = set()",
  "if S > 0:",
  "    damaged = set(",
  "        int(x)-1 for x in input().split())",
  "",
  "Q = int(input())",
  "queries = []",
  "for qi in range(Q):",
  "    K = int(input())",
  "    queries.append((K, qi))",
  "",
  "# Dijkstra with K constraint",
  "def solve(K):",
  "    dist = [float('inf')]*(N+1)",
  "    dist[1] = 0",
  "    pq = [(0, 1)]",
  "    while pq:",
  "        d, u = heapq.heappop(pq)",
  "        if d > dist[u]: continue",
  "        for v, w, eidx in adj[u]:",
  "            arrive = d + w",
  "            if eidx in damaged:",
  "                if not(d < K and arrive <= K):",
  "                    continue",
  "            if arrive < dist[v]:",
  "                dist[v] = arrive",
  "                heapq.heappush(pq,(arrive,v))",
  "    return sum(1 for i in range(1,N+1)",
  "               if dist[i] < float('inf'))",
  "",
  "for K, qi in sorted(queries):",
  "    print(solve(K))",
];

/* Simple Python syntax highlighter */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","list","dict","set","enumerate","zip","abs","round","type","isinstance","open","get","float","heapq"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    } else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    } else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    } else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    } else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    } else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => {
      const isHl = hl && hl.includes(i);
      const baseColor = isHl ? "#93c5fd" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(139,92,246,.15)" : "transparent",
          borderRadius: 4, padding: "0 4px",
        }}>
          <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
          <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {tokens.map((tk, j) => (
              <span key={j} style={{ color: tk.color }}>{tk.text}</span>
            ))}
          </span>
        </div>
      );
    })}
  </div>
);

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeReachCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Reachability Queries!\nA dragon starts in city 1.\nSome roads are damaged and will break at time K.\nFor each K, how many cities can the dragon reach?\n🐉", "도달 가능성 문제! 용이 도시 1에서 출발해. 일부 도로가 손상되어 있어서 시간 K에 파괴돼. 각 K마다 용이 도달할 수 있는 도시는 몇 개일까? 🐉"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐉</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: A }}>Reachability Queries</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P5</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N cities,\nM roads → some roads are damaged → apocalypse at time K destroys damaged roads → how many cities reachable from city 1?",
              "도시 N개,\n도로 M개 → 일부 도로 손상 → 시간 K에 아포칼립스 발생,\n손상 도로 파괴 → 도시 1에서 몇 개 도시에 갈 수 있어?")}
          </div>
        </div>),
    },
    // 1-2: Graph + damaged roads concept
    {
      type: "reveal",
      narr: t(E,
        "Here's our sample: 5 cities, 6 roads.\nRed dashed lines are damaged roads.\nThey work for now, but will break at time K!", "예제를 보자! 도시 5개, 도로 6개야. 빨간 점선이 손상된 도로야. 지금은 쓸 수 있지만 시간 K가 되면 부서져!"),
      content: (() => (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Sample Graph", "예제 그래프")}
          </div>
          <div style={{
            background: "#f8fafc", borderRadius: 10, padding: "6px 0",
            border: "1.5px solid #e2e8f0", fontSize: 12, lineHeight: 2,
            fontFamily: "'JetBrains Mono',monospace", textAlign: "center",
          }}>
            <div>{t(E, "Roads:", "도로:")}</div>
            <div style={{ color: "#ef4444" }}>1↔2 (7) · 4↔3 (8) · 4↔2 (5) · 3↔5 (20) <span style={{ fontSize: 10 }}>{t(E, "damaged", "손상")}</span></div>
            <div style={{ color: "#059669" }}>2↔3 (10) · 1↔5 (18) <span style={{ fontSize: 10 }}>{t(E, "safe", "안전")}</span></div>
          </div>
        </div>
      ))(),
    },
    // 1-3: Graph visualization
    {
      type: "graphViz",
      narr: t(E,
        "Here's the graph visually.\nCity 1 is the starting point (purple).\nThe numbers on roads are their lengths (travel time in minutes).", "그래프를 눈으로 보자! 도시 1이 출발점(보라색)이야. 도로 위의 숫자는 길이(이동 시간, 분 단위)야."),
    },
    // 1-4: Apocalypse rules
    {
      type: "reveal",
      narr: t(E,
        "The rules: Damaged roads break at time K.\nYou CAN'T start a damaged road at time K or later.\nAnd if you're on a damaged road when the apocalypse hits, you can't use it — UNLESS you arrive exactly at time K.", "규칙을 알아보자! 손상 도로는 시간 K에 부서져. K 이후에는 못 써. 이동 중에 K가 되면 안 되지만, 딱 K에 도착하면 괜찮아!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Apocalypse Rules", "아포칼립스 규칙")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "2px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text,
          }}>
            <div>✅ {t(E,
              "Safe roads: usable anytime (before or after K)",
              "안전한 도로: 언제든 사용 가능 (K 전이든 후든)")}</div>
            <div>⚠️ {t(E,
              "Damaged roads: only if you START before K AND arrive ≤ K",
              "손상 도로: 출발 시각 < K 이고 도착 시각 ≤ K일 때만 사용")}</div>
            <div>❌ {t(E,
              "Can't use damaged roads starting at time K",
              "시간 K 이후에는 손상 도로 사용 불가")}</div>
          </div>
          <div style={{
            marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
            border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
            fontWeight: 700, textAlign: "center",
          }}>
            💡 {t(E,
              "After apocalypse, only safe roads remain!",
              "아포칼립스 후에는 안전한 도로만 남아!")}
          </div>
        </div>),
    },
    // 1-5: Quiz — K=6 example
    {
      type: "quiz",
      narr: t(E,
        "K=6: The dragon is in city 1.\nRoad 1→2 is damaged (length 7).\nCan the dragon reach city 2 when K=6?", "K=6일 때: 용이 도시 1에 있어. 도로 1→2는 손상 도로(길이 7)야. K=6이면 도시 2에 갈 수 있을까?"),
      question: t(E,
        "K=6: Road 1→2 (damaged, length 7). Start=0, arrive=7. Can dragon use it?",
        "K=6: 도로 1→2 (손상, 길이 7). 출발=0, 도착=7.\n도착 시각 7 > K=6이니까..."),
      options: [
        t(E, "Yes (arrive before apocalypse)", "Yes (아포칼립스 전에 도착)"),
        t(E, "No (arrive after apocalypse)", "No (도착이 K=6보다 늦어서 불가)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Arrive time 7 > K=6, so the damaged road can't be used. Only city 1 and city 5 (via safe road, length 18) are reachable.",
        "정답! 도착 시각 7 > K=6이라 손상 도로를 못 써. 안전한 도로로 갈 수 있는 도시 1, 5만 도달 가능해 (답: 2개)."),
    },
    // 1-6: Quiz — K=12
    {
      type: "quiz",
      narr: t(E,
        "Now K=12: Road 1→2 (damaged, length 7).\nIf you start at time 0 and arrive at time 7, that's ≤ 12.\nThen from city 2, road 2→4 (damaged, length 5) — arrive at 12.\nExactly K!\nIs that allowed?", "K=12일 때: 도로 1→2 (손상, 길이 7) — 시각 0에 출발해서 7에 도착하면 ≤ 12니까 OK!\n그 다음 도시 2에서 도로 2→4 (손상, 길이 5) — 시각 7에 출발, 12에 도착.\n딱 K야!\n가능할까?"),
      question: t(E,
        "K=12: From city 2 (arrive time 7), take damaged road 2→4 (length 5). Arrive at 12 = K. Allowed?",
        "K=12: 도시 2(시각 7)에서 손상 도로 2→4(길이 5) 이용.\n도착 시각 = 12 = K. 가능할까?"),
      options: [
        t(E, "Yes! Arriving exactly at K is allowed", "가능! 딱 K에 도착하는 건 허용"),
        t(E, "No, K means it's too late", "불가, K가 되면 이미 늦음"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Arriving exactly at K is allowed. So all 5 cities are reachable when K=12.",
        "정답! 딱 K에 도착하는 건 괜찮아. K=12면 5개 도시 모두 도달 가능!"),
    },
    // 1-7: Answer for K=11
    {
      type: "input",
      narr: t(E,
        "K=11: City 4 needs time 12 via 1→2→4 (7+5=12 > 11).\nIs there another path?\nAll roads to city 4 are damaged.\nSo how many cities are reachable?", "K=11: 도시 4까지 1→2→4 경로가 7+5=12분인데 12 > 11이라 불가! 도시 4로 가는 도로는 다 손상이야. 도달 가능한 도시는 몇 개?"),
      question: t(E,
        "K=11: How many cities reachable? (city 4 needs 12 min)",
        "K=11일 때 도달 가능한 도시 수는?\n(도시 4는 최소 12분 걸림)"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 📝 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeReachCh2(E) {
  return [
    // 2-1: Reachability simulator
    {
      type: "reachSim",
      narr: t(E,
        "Move the K slider and watch which cities become reachable!\nGreen = reachable, red = unreachable.\nSee how it changes!", "K 슬라이더를 움직여봐! 초록 = 도달 가능, 빨강 = 불가. K가 바뀌면 도달 가능한 도시가 어떻게 변하는지 보자!"),
    },
    // 2-2: Quiz — Key insight
    {
      type: "quiz",
      narr: t(E,
        "Notice something? As K increases, you can reach MORE cities (or stay the same). Why?", "눈치챘어? K가 커지면 갈 수 있는 도시가 늘어나거나 같아! 왜 그럴까?"),
      question: t(E,
        "Why does increasing K never decrease reachable cities?",
        "K가 커지면 도달 가능한 도시 수가 줄어들 수 있을까?"),
      options: [
        t(E, "No! More time = more damaged roads usable", "없어! 시간이 많을수록 손상 도로를 더 쓸 수 있으니까"),
        t(E, "Yes, it could decrease", "있어, 줄어들 수도 있어"),
      ],
      correct: 0,
      explain: t(E,
        "Right! Larger K means more time before apocalypse → can use damaged roads for longer → can only reach MORE cities.",
        "정답! K가 클수록 아포칼립스 전 시간이 많아 → 손상 도로를 더 오래 쓸 수 있어 → 도달 가능 도시는 늘어나기만 해!"),
    },
    // 2-3: Dijkstra concept
    {
      type: "reveal",
      narr: t(E,
        "The key algorithm is Dijkstra!\nIt finds shortest paths from city 1.\nThen for each damaged road, check if we can use it within time K.", "핵심 알고리즘은 다익스트라야! 도시 1에서 각 도시까지 최단 거리를 구해. 손상 도로는 출발 시각 < K, 도착 시각 ≤ K인 경우만 사용!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Modified Dijkstra", "변형 다익스트라")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "2px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text,
          }}>
            <div>1️⃣ {t(E,
              "Use priority queue (min-heap) for shortest paths",
              "우선순위 큐(최소 힙)로 최단 경로 탐색")}</div>
            <div>2️⃣ {t(E,
              "For each edge: if safe → always use. If damaged → check time constraint",
              "각 도로: 안전하면 항상 사용. 손상이면 시간 조건 확인")}</div>
            <div>3️⃣ {t(E,
              "Damaged road usable only if: start_time < K AND arrive_time ≤ K",
              "손상 도로 사용 조건: 출발 시각 < K 그리고 도착 시각 ≤ K")}</div>
          </div>
        </div>),
    },
    // 2-4: Dijkstra trace
    {
      type: "dijkstraTrace",
      narr: t(E,
        "Let's trace Dijkstra on the full graph (all roads usable). Watch how distances update!", "전체 그래프에서 다익스트라를 따라가보자! (모든 도로 사용 가능) 거리가 어떻게 갱신되는지 봐!"),
    },
    // 2-5: Input — verify sample answer
    {
      type: "input",
      narr: t(E,
        "In the sample, K=6 → answer is 2, K=11 → 4, K=12 → 5.\nWhat's the sum of all three answers?", "예제에서 K=6 → 답 2, K=11 → 답 4, K=12 → 답 5야. 세 답의 합은?"),
      question: t(E,
        "Sum of answers: 2 + 4 + 5 = ?",
        "세 쿼리의 답의 합: 2 + 4 + 5 = ?"),
      answer: 11,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeReachCh3(E) {
  return [
    // 3-1: Input reading
    {
      type: "reveal",
      narr: t(E,
        "Let's code it!\nFirst read the graph: N cities, M roads, which roads are damaged, and Q queries.", "코드를 짜보자! 먼저 그래프를 읽어: 도시 N개, 도로 M개, 손상 도로 목록, 쿼리 Q개."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "import heapq",
              "",
              "N, M = map(int, input().split())",
              "adj = [[] for _ in range(N+1)]",
              "edges = []",
              "for i in range(M):",
              "    x, y, w = map(int, input().split())",
              "    edges.append((x,y,w))",
              "    adj[x].append((y,w,i))",
              "    adj[y].append((x,w,i))",
            ]}
            highlight={[3, 8, 9]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E,
              "Adjacency list: for each city, store (neighbor, weight, edge_index)",
              "인접 리스트: 각 도시마다 (이웃, 거리, 도로번호) 저장")}
          </div>
        </div>),
    },
    // 3-2: Read damaged roads & queries
    {
      type: "reveal",
      narr: t(E,
        "Next, read which roads are damaged and the Q queries (values of K).", "다음으로 손상 도로 목록과 쿼리(K 값들)를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 6 }}>
            {t(E, "Step 2: Damaged roads & queries", "2단계: 손상 도로 & 쿼리")}
          </div>
          <CodeSnippet
            lines={[
              "S = int(input())",
              "damaged = set()",
              "if S > 0:",
              "    damaged = set(",
              "        int(x)-1 for x in input().split())",
              "",
              "Q = int(input())",
              "queries = []",
              "for qi in range(Q):",
              "    K = int(input())",
              "    queries.append((K, qi))",
            ]}
            highlight={[3, 4]}
          />
          <div style={{
            marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
            border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
            fontWeight: 700, textAlign: "center",
          }}>
            💡 {t(E,
              "Store edge indices as 0-indexed (subtract 1)!",
              "도로 번호는 0부터 시작하게 -1 해서 저장!")}
          </div>
        </div>),
    },
    // 3-3: Modified Dijkstra
    {
      type: "reveal",
      narr: t(E,
        "The core: Dijkstra with a constraint on damaged edges.\nSafe roads always usable.\nDamaged roads only if start_time < K and arrive_time ≤ K.", "핵심 부분! 다익스트라인데, 손상 도로에 조건을 걸어. 안전한 도로는 항상 OK, 손상 도로는 출발 < K, 도착 ≤ K만!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 6 }}>
            {t(E, "Step 3: Modified Dijkstra", "3단계: 변형 다익스트라")}
          </div>
          <CodeSnippet
            lines={[
              "def solve(K):",
              "    dist = [float('inf')]*(N+1)",
              "    dist[1] = 0",
              "    pq = [(0, 1)]",
              "    while pq:",
              "        d, u = heapq.heappop(pq)",
              "        if d > dist[u]: continue",
              "        for v, w, eidx in adj[u]:",
              "            arrive = d + w",
              "            if eidx in damaged:",
              "                if not(d < K and arrive <= K):",
              "                    continue",
              "            if arrive < dist[v]:",
              "                dist[v] = arrive",
              "                heapq.heappush(pq,(arrive,v))",
              "    return sum(1 for i in range(1,N+1)",
              "               if dist[i] < float('inf'))",
            ]}
            highlight={[9, 10, 11]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E,
              "Key: damaged edge check at lines 10-12",
              "핵심: 10-12번 줄의 손상 도로 조건 확인")}
          </div>
        </div>),
    },
    // 3-4: Why it works
    {
      type: "reveal",
      narr: t(E,
        "Why does this work?\nDijkstra always processes the smallest distance first.\nSo when we reach a node, it's via the shortest path.\nFor damaged roads, we just add the time constraint.", "왜 이게 맞을까? 다익스트라는 항상 가장 짧은 거리부터 처리해. 그래서 노드에 도착하면 최단 경로로 온 거야. 손상 도로는 시간 제한만 추가하면 끝!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Why It Works", "왜 맞는가")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "2px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text,
          }}>
            <div>✅ {t(E,
              "Dijkstra finds shortest paths = earliest arrival times",
              "다익스트라 = 최단 거리 = 가장 빠른 도착 시각")}</div>
            <div>✅ {t(E,
              "Damaged road constraint: just skip if time doesn't allow",
              "손상 도로 제한: 시간이 안 맞으면 그냥 건너뛰기")}</div>
            <div>✅ {t(E,
              "Monotonic: larger K → more roads usable → more cities",
              "단조 증가: K가 클수록 도로를 더 쓸 수 있어 → 도시 더 많이 도달")}</div>
          </div>
          <div style={{
            marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
            border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
            fontWeight: 700, textAlign: "center",
          }}>
            💡 {t(E,
              "Optimization: sort queries by K, reuse computation!",
              "최적화: K 기준으로 쿼리 정렬하면 계산 재활용 가능!")}
          </div>
        </div>),
    },
    // 3-5: Time complexity
    {
      type: "quiz",
      narr: t(E,
        "What's the time complexity of this simple approach? We run Dijkstra once per query.", "이 단순한 방법의 시간복잡도는? 쿼리마다 다익스트라를 한 번 돌려."),
      question: t(E,
        "Dijkstra: O((N+M)logN) per query, Q queries total. What's the total?",
        "다익스트라: 쿼리 당 O((N+M)logN). 쿼리 Q개면 총 시간복잡도는?"),
      options: [
        t(E, "O(Q(N+M)logN)", "O(Q(N+M)logN)"),
        t(E, "O(NM)", "O(NM)"),
        t(E, "O(N²)", "O(N²)"),
      ],
      correct: 0,
      explain: t(E,
        "Right! Each query runs a full Dijkstra. For full marks, you'd need to optimize using offline processing.",
        "정답! 각 쿼리마다 다익스트라를 돌려. 만점을 받으려면 오프라인 처리로 최적화해야 해!"),
    },
    // 3-6: Full code
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read → Dijkstra per query → count reachable. 🐉", "전체 풀이 코드야! 순서: 입력 읽기 → 쿼리마다 다익스트라 → 도달 가능 수 세기. 🐉"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
