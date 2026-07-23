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
  "for _ in range(Q):",
  "    queries.append(int(input()))",
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
  "for K in queries:",
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
        "Reachability Queries!\nA dragon starts in city 1.\nSome roads are damaged and will break at time K.\nFor each K, how many cities can the dragon reach?\n🐉", "도달할 수 있는지 묻는 문제! 용이 도시 1에서 출발해요. 일부 도로가 손상되어 있어서 시간 K에 파괴돼요. 각 K마다 용이 갈 수 있는 도시는 몇 개일까요? 🐉"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🐉</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: A }}>Reachability Queries</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P5</div>

          {/* 🎯 Mission box */}
          <div style={{ marginTop: 12, background: "#f5f3ff", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "For each query K, output how many cities the dragon can reach from city 1 before the apocalypse hits at time K.",
                "쿼리 K 마다 — 시간 K 의 아포칼립스가 오기 전에 용이 도시 1 에서 갈 수 있는 도시가 몇 개인지 출력.")}
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N cities,\nM roads → some roads are damaged → apocalypse at time K destroys damaged roads → how many cities reachable from city 1?",
              "도시 N개,\n도로 M개 → 일부 도로 손상 → 시간 K에 아포칼립스 발생,\n손상 도로 파괴 → 도시 1에서 몇 개 도시에 갈 수 있어요?")}
          </div>
        </div>),
    },
    // 1-2: Graph + damaged roads concept
    {
      type: "reveal",
      narr: t(E,
        "Here's our sample: 5 cities, 6 roads.\nRed dashed lines are damaged roads.\nThey work for now, but will break at time K!", "예제를 보자! 도시 5개, 도로 6개예요. 빨간 점선이 손상된 도로예요. 지금은 쓸 수 있지만 시간 K가 되면 부서져!"),
      content: (() => (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
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
        "Here's the graph visually.\nCity 1 is the starting point (purple).\nThe numbers on roads are their lengths (travel time in minutes).", "그래프를 눈으로 보자! 도시 1이 출발점(보라색)이에요. 도로 위의 숫자는 길이(이동 시간, 분 단위)야."),
    },
    // 1-4: Apocalypse rules
    {
      type: "reveal",
      narr: t(E,
        "The rules: Damaged roads break at time K.\nYou CAN'T start a damaged road at time K or later.\nAnd if you're on a damaged road when the apocalypse hits, you can't use it — UNLESS you arrive exactly at time K.", "규칙을 알아보자! 손상 도로는 시간 K에 부서져. K 이후에는 못 써요. 이동 중에 K가 되면 안 되지만, 딱 K에 도착하면 괜찮아!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Apocalypse Rules", "아포칼립스 규칙")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "1px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text,
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
    // 1-4b: 입출력 형식 + 제약 (MCC 2025 P5 원문 그대로)
    // 규칙까지 잡은 직후 "그래서 데이터가 어떻게 들어오는데?" 를 못박아 준다.
    // 입력 순서는 SOLUTION_CODE 의 read 순서와 일치: N M → M줄 x y w → S → 손상번호 → Q → K들
    {
      type: "reveal",
      narr: t(E,
        "So how does the data arrive?\nThe graph, then which roads are damaged, then the K queries. Start is always city 1.",
        "그럼 데이터는 어떻게 들어올까?\n그래프 → 손상 도로 → K 쿼리 순서. 출발은 언제나 도시 1이에요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — cities, roads", "(첫 줄) — 도시 수, 도로 수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>x y w</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— road: city x ↔ y, length w", "— 도로: 도시 x ↔ y, 길이 w")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats M times (road i = i-th line)", "↑ 이 줄이 M 번 반복 (i번째 줄 = i번 도로)")}</div>
              </div>
              <div style={{ marginTop: 6 }}><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of damaged roads", "— 손상된 도로 개수")}</span></div>
              <div style={{ paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>d<sub>1</sub> … d<sub>S</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— indices of the damaged roads", "— 손상된 도로의 번호들")}</span></div>
              </div>
              <div style={{ marginTop: 6 }}><span style={{ color: "#92400e", fontWeight: 800 }}>Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of queries", "— 쿼리 개수")}</span></div>
              <div style={{ paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— apocalypse time for this query", "— 이 쿼리의 아포칼립스 시각")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ one K per line, Q times", "↑ 한 줄에 K 하나씩, Q 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "Q lines — for query i, how many cities are reachable from city 1.",
                  "Q 줄 — 각 쿼리마다 도시 1에서 도달 가능한 도시 개수.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N, M ≤ 300,000 (= 3 × 10⁵)</div>
              <div>1 ≤ x, y ≤ N, x ≠ y</div>
              <div>1 ≤ w ≤ 100,000 (= 10⁵)</div>
              <div>0 ≤ S ≤ N</div>
              <div>1 ≤ Q ≤ 100,000 (= 10⁵)</div>
              <div>0 ≤ K ≤ 1,000,000,000 (= 10⁹)</div>
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>5 6</div>
                <div>1 2 7</div><div>2 3 10</div><div>4 3 8</div>
                <div>4 2 5</div><div>1 5 18</div><div>3 5 20</div>
                <div>4</div>
                <div>1 3 4 6</div>
                <div>3</div>
                <div>6</div><div>11</div><div>12</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>2</div><div>4</div><div>5</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "Roads 1, 3, 4, 6 are damaged. For K = 6, 11, 12 the dragon reaches 2, 4, 5 cities.",
                "손상 도로는 1, 3, 4, 6번. K = 6, 11, 12일 때 용이 각각 2, 4, 5개 도시에 도달해요.")}
          </div>
        </div>),
    },
    // 1-5: Answer for K=11 (concrete example)
    {
      type: "input",
      narr: t(E,
        "K=11: City 4 needs time 12 via 1→2→4 (7+5=12 > 11).\nIs there another path?\nAll roads to city 4 are damaged.\nSo how many cities are reachable?", "K=11: 도시 4까지 1→2→4 경로가 7+5=12분인데 12 > 11이라 불가! 도시 4로 가는 도로는 다 손상이에요. 도달 가능한 도시는 몇 개?"),
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
        "Move the K slider! Green = reachable, red = not. Notice: bigger K only ever adds more green (more time = more damaged roads usable).", "K 슬라이더를 움직여봐요! 초록 = 도달 가능, 빨강 = 불가. K를 키우면 초록이 늘기만 해요 (시간이 많을수록 손상 도로를 더 쓸 수 있으니까)."),
    },
    // 2-2: Dijkstra concept (intro card lives in Ch3)
    // 2-4: Dijkstra trace
    {
      type: "dijkstraTrace",
      narr: t(E,
        "Let's trace Dijkstra on the full graph (all roads usable). Watch how distances update!", "전체 그래프에서 다익스트라를 따라가보자! (모든 도로 사용 가능) 거리가 어떻게 갱신되는지 봐요!"),
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
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 6 }}>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 6 }}>
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
              "for _ in range(Q):",
              "    queries.append(int(input()))",
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
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 6 }}>
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
    // 3-3b: Deep audit — step the modified Dijkstra edge by edge under K
    {
      type: "dijkstraKAudit",
      narr: t(E,
        "Deep audit time! Pick K=6, 11, or 12, then click Next to walk through every edge the algorithm checks.\nWatch which damaged edges get blocked by `not(d < K and arrive <= K)` and which slip through.\nThis is exactly what the inner loop does — line by line.",
        "심층 점검 시간! K = 6, 11, 12 중 골라요. 다음 버튼을 누를 때마다 알고리즘이 검사하는 도로 하나씩 따라가. 손상 도로 중 어떤 것이 `not(d < K and arrive <= K)` 조건에 걸려 차단되고 어떤 것이 통과하는지 봐. 코드의 안쪽 루프가 그대로 한 줄씩 펼쳐지는 거야!"),
    },
    // 3-4: Why it works
    {
      type: "reveal",
      narr: t(E,
        "Why does this work?\nDijkstra always processes the smallest distance first.\nSo when we reach a node, it's via the shortest path.\nFor damaged roads, we just add the time constraint.", "왜 이게 맞을까? 다익스트라는 항상 가장 짧은 거리부터 처리해요. 그래서 노드에 도착하면 최단 경로로 온 거예요. 손상 도로는 시간 제한만 추가하면 끝!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Why It Works", "왜 맞는가")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "1px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text,
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
    // 3-5: Full code
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read → Dijkstra per query → count reachable. 🐉", "전체 풀이 코드예요! 순서: 입력 읽기 → 쿼리마다 다익스트라 → 도달 가능 수 세기. 🐉"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
