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
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeReachCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Reachability Queries!\nA dragon starts in city 1.\nSome roads are weak — they all collapse at minute K.\nFor each K, how many cities can the dragon reach?\n🐉", "도달할 수 있는지 묻는 문제! 용이 도시 1에서 출발해요. 일부 다리는 약해서 K분에 전부 무너져요. 각 K마다 용이 갈 수 있는 도시는 몇 개일까요? 🐉"),
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
                "Some roads are weak — they all collapse at minute K. For each query K, output how many cities the dragon can reach from city 1.",
                "일부 다리는 약해서 K분에 전부 무너져요. 쿼리 K 마다 — 용이 도시 1 에서 갈 수 있는 도시가 몇 개인지 출력.")}
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N cities,\nM roads → some roads are weak → at minute K all weak roads collapse → how many cities reachable from city 1?",
              "도시 N개,\n다리 M개 → 일부 다리는 약함 → K분에 약한 다리 전부 무너짐 → 도시 1에서 몇 개 도시에 갈 수 있어요?")}
          </div>
        </div>),
    },
    // 1-2: Break rules — damaged roads break at time K (규칙을 시뮬보다 먼저!)
    {
      type: "reveal",
      narr: t(E,
        "The rules: weak roads all collapse at minute K.\nYou can't start one at K or later, and you must finish crossing by K — arriving exactly at K is fine.", "규칙을 알아보자! 약한 다리는 K분에 전부 무너져요. K 이후엔 출발 못 하고, K 안에 다 건너야 해요 — 딱 K에 도착하는 건 괜찮아!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "When Roads Collapse", "다리가 무너지는 규칙")}
          </div>
          <div style={{
            background: "#f5f3ff", borderRadius: 12, padding: 14,
            border: "1px solid #c4b5fd", fontSize: 13, lineHeight: 2, color: C.text, wordBreak: "keep-all",
          }}>
            <div>🟢 {t(E,
              "Safe roads: never collapse — usable anytime",
              "안전한 다리: 안 무너져요 — 언제든 사용 가능")}</div>
            <div>🔴 {t(E,
              "Weak roads: usable now, but ALL collapse at minute K — start before K AND finish by K",
              "약한 다리: 지금은 OK, 하지만 K분에 전부 무너짐 — 출발은 K 전, 도착은 K 이하일 때만")}</div>
            <div>❌ {t(E,
              "From minute K on, weak roads are gone",
              "K분부터 약한 다리는 사라진 상태")}</div>
          </div>
          {/* 왜 도착=K 는 되고 출발=K 는 안 되나 — 이 비대칭이 이 문제의 핵심 함정 */}
          <div style={{
            marginTop: 10, background: "#eff6ff", borderRadius: 8, padding: "8px 12px",
            border: "1.5px solid #93c5fd", fontSize: 12, color: "#1e3a8a",
            lineHeight: 1.6, wordBreak: "keep-all",
          }}>
            🤔 {t(E,
              "Why is arrive = K okay, but start = K not?  Arriving exactly at K means you finished crossing the instant it collapses → safe.  Starting at K means the road is already collapsing → you can't get on.",
              "왜 도착 = K 는 되고 출발 = K 는 안 될까?  딱 K 에 도착 = 무너지는 바로 그 순간 다 건넜다 → 세이프.  K 에 출발 = 다리가 이미 무너지는 중 → 올라탈 수 없어.")}
          </div>
        </div>),
    },
    // 1-4b: 입출력 형식 + 제약 (MCC 2025 P5 원문 그대로)
    // 규칙까지 잡은 직후 "그래서 데이터가 어떻게 들어오는데?" 를 못박아 준다.
    // 입력 순서는 SOLUTION_CODE 의 read 순서와 일치: N M → M줄 x y w → S → 손상번호 → Q → K들
    {
      type: "reveal",
      narr: t(E,
        "So how does the data arrive?\nThe graph, then which roads are weak, then the K queries. Start is always city 1.",
        "그럼 데이터는 어떻게 들어올까?\n그래프 → 어떤 다리가 약한지 → K 쿼리 순서. 출발은 언제나 도시 1이에요."),
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
              <div style={{ marginTop: 6 }}><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of weak roads", "— 약한 다리 개수")}</span></div>
              <div style={{ paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>d<sub>1</sub> … d<sub>S</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— numbers of the weak roads", "— 약한 다리의 번호들")}</span></div>
              </div>
              <div style={{ marginTop: 6 }}><span style={{ color: "#92400e", fontWeight: 800 }}>Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of queries", "— 쿼리 개수")}</span></div>
              <div style={{ paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the time the roads break, for this query", "— 이 쿼리에서 도로가 부서지는 시각")}</span></div>
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
            {t(E, "Roads 1, 3, 4, 6 are weak. For K = 6, 11, 12 the dragon reaches 2, 4, 5 cities.",
                "약한 다리는 1, 3, 4, 6번. K = 6, 11, 12일 때 용이 각각 2, 4, 5개 도시에 도달해요.")}
          </div>
        </div>),
    },
    // 1-4: Graph-building sim — 형식을 봤으니, 실제 샘플 입력을 한 줄씩 읽어 그래프로.
    {
      type: "graphBuild",
      narr: t(E,
        "Now read the REAL sample input, line by line, and watch the graph appear: 5 cities → each road → which are weak → the K queries.",
        "이제 실제 샘플 입력을 한 줄씩 읽으면서 그래프가 만들어지는 걸 봐요: 도시 5개 → 도로 하나씩 → 어떤 다리가 약한지 → K 쿼리."),
    },
    // 1-5: Step-sim — pick K, watch each city get reached (or blocked) one by one.
    {
      type: "reachSpread",
      narr: t(E,
        "Play out each query: pick K = 6, 11, or 12, then ▶ to watch each city get reached — or blocked — and see the answers land on 2, 4, 5.",
        "쿼리를 직접 돌려봐요: K = 6, 11, 12 중 골라 ▶ 를 누르면 도시가 하나씩 도달(또는 차단)돼요. 답이 2, 4, 5 로 떨어지는 걸 확인!"),
    },
    // 1-6: Answer for K=11 (concrete example)
    {
      type: "input",
      narr: t(E,
        "K=11: City 4 needs time 12 via 1→2→4 (7+5=12 > 11).\nIs there another path?\nEvery road into city 4 is weak.\nSo how many cities are reachable?", "K=11: 도시 4까지 1→2→4 경로가 7+5=12분인데 12 > 11이라 불가! 도시 4로 가는 다리는 다 약한 다리예요. 도달 가능한 도시는 몇 개?"),
      question: t(E,
        "K=11: How many cities reachable? (city 4 needs 12 min)",
        "K=11일 때 도달 가능한 도시 수는?\n(도시 4는 최소 12분 걸림)"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🧭 접근 — 다익스트라 (7 steps)

   스캐폴딩 순서 (feedback_first_concept_scaffolding):
     1. "그럼 어떻게 풀까? 생각해보자" — 필요한 것 = 가장 빠른 도착 시각
     2. 새 생각법: 확실한 것부터 확정 — 실제 숫자로
     3. 예제에서 끝까지 (trace 시뮬)
     4. 이름은 나중에: 다익스트라 + 왜 BFS는 안 되나
     5. 이 문제에 적용 — 빨간 다리 조건 하나만 추가
     6. 확인 퀴즈
   (K 슬라이더는 Ch1 의 reachSpread 와 중복이라 제거 — 2026-07-28 재정비)
   ═══════════════════════════════════════════════════════════════ */
export function makeReachCh2(E) {
  const mono = "'JetBrains Mono',monospace";
  return [
    // 2-1: 그럼 어떻게 풀까? — 필요한 건 '가장 빠른 도착 시각'
    {
      type: "reveal",
      narr: t(E,
        "So how do we solve it? Let's think.\nFor each city, ONE number decides everything: the EARLIEST time we can finish crossing the red roads on the way there.",
        "그럼 어떻게 해결하면 될까? 생각해보자.\n도시마다 숫자 하나가 모든 걸 결정해요: 그 도시로 가는 길의 빨간 다리를 '가장 빨리' 다 건너는 시각."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "What do we actually need?", "우리한테 진짜 필요한 건 뭘까?")}
          </div>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, lineHeight: 1.75, color: C.text, marginBottom: 10 }}>
            {t(E,
              <>Page 1's sim showed the rule: a city is reachable when the red roads on the way are crossed <b>by minute K</b>.  So per city we just need one number — <b>the earliest possible arrival time</b>.  Compare it with K → done.</>,
              <>1장 시뮬에서 봤듯, 도시에 갈 수 있냐는 결국 길에 있는 빨간 다리를 <b>K분 안에</b> 다 건너느냐예요.  그러니 도시마다 딱 숫자 하나 — <b>가장 빨리 도착할 수 있는 시각</b> — 만 알면 돼요.  그걸 K 랑 비교하면 끝.</>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "8px 10px", fontSize: 12, lineHeight: 1.6, color: "#14532d" }}>
              {t(E, <><b>Fastest way arrives in time</b> → reachable ✓</>,
                    <><b>가장 빠른 길이 시간 안</b> → 도달 ✓</>)}
            </div>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "8px 10px", fontSize: 12, lineHeight: 1.6, color: "#7f1d1d" }}>
              {t(E, <><b>Even the fastest way is late</b> → no path works ✗</>,
                    <><b>가장 빠른 길도 늦으면</b> → 어떤 길도 안 됨 ✗</>)}
            </div>
          </div>
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, fontWeight: 700, color: "#92400e", textAlign: "center" }}>
            {t(E, "New goal: for every city, find the fastest arrival time from city 1. How?",
                  "새 목표: 모든 도시까지 '도시 1에서 가장 빨리 도착하는 시각' 구하기. 어떻게?")}
          </div>
        </div>),
    },
    // 2-3: 새 생각법 — 확실한 것부터 확정 (실제 숫자로)
    {
      type: "reveal",
      narr: t(E,
        "Idea: start from what's 100% CERTAIN, and lock in one city at a time.",
        "아이디어: 100% 확실한 것부터, 도시를 하나씩 '확정'해 나가요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Lock in the certain one first", "확실한 것부터 확정하기")}
          </div>
          {/* 단계 1: 확실한 출발점 */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: C.text, marginBottom: 8 }}>
            ① {t(E, <>What do we know for sure right now?  <b>City 1 = minute 0.</b>  That's it — lock it in.</>,
                   <>지금 100% 확실한 건?  <b>도시 1 = 0분.</b>  이것뿐이에요 — 확정!</>)}
          </div>
          {/* 단계 2: 후보 */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: C.text, marginBottom: 8 }}>
            ② {t(E, <>From city 1, two candidates open up:  city 2 = <b style={{ fontFamily: mono }}>7 min</b>,  city 5 = <b style={{ fontFamily: mono }}>18 min</b>.  Candidates — not certain yet.</>,
                   <>도시 1에서 후보 두 개가 생겨요:  도시 2 = <b style={{ fontFamily: mono }}>7분</b>,  도시 5 = <b style={{ fontFamily: mono }}>18분</b>.  아직 '후보'일 뿐, 확정은 아님.</>)}
          </div>
          {/* 단계 3: 제일 이른 후보 확정 + why */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: "#14532d", marginBottom: 8 }}>
            ③ {t(E, <>The <b>earliest</b> candidate — city 2 at 7 min — can be locked in as certain.</>,
                   <>후보 중 <b>제일 이른</b> 것 — 도시 2, 7분 — 은 확정해도 돼요.</>)}
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 12 }}>
              🤔 <b>{t(E, "Why is 7 certain?", "왜 7분이 확실하지?")}</b>{" "}
              {t(E,
                "Any other route to city 2 must START with some other road — and every other road out of city 1 already takes longer than 7. It can't beat 7.",
                "도시 2로 가는 다른 길은 어차피 다른 다리로 시작해야 하는데, 도시 1에서 나가는 다른 다리(18분…)는 시작부터 이미 7분보다 늦어요. 7분을 이길 수 없어요.")}
            </div>
          </div>
          {/* 단계 4: 반복 */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, lineHeight: 1.7, color: "#92400e" }}>
            ④ {t(E, <>City 2 (7 min) locked → new candidates through it:  city 3 = 7+10 = <b style={{ fontFamily: mono }}>17</b>,  city 4 = 7+5 = <b style={{ fontFamily: mono }}>12</b>.  Repeat: “lock the earliest candidate” until every city is done!</>,
                   <>도시 2(7분) 확정 → 2를 거치는 새 후보:  도시 3 = 7+10 = <b style={{ fontFamily: mono }}>17분</b>,  도시 4 = 7+5 = <b style={{ fontFamily: mono }}>12분</b>.  이제 “제일 이른 후보 확정”을 모든 도시가 끝날 때까지 반복!</>)}
          </div>
          <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, textAlign: "center" }}>
            {t(E, "Watch it run to the end on our sample 👇", "예제에서 끝까지 돌아가는 걸 봐요 👇")}
          </div>
        </div>),
    },
    // 2-4: 예제로 끝까지 — trace 시뮬
    {
      type: "dijkstraTrace",
      narr: t(E,
        "Run 'lock the earliest candidate' to the end on our graph (all roads usable for now). ▶ each step: which city gets locked, which candidates update.",
        "'제일 이른 후보 확정'을 예제 그래프에서 끝까지 돌려봐요 (일단 모든 다리 사용 가능). ▶ 마다: 어느 도시가 확정되고, 어떤 후보가 갱신되는지."),
    },
    // 2-5: 이름 공개 — 다익스트라 + 왜 BFS 는 안 되나
    {
      type: "reveal",
      narr: t(E,
        "This method has a name: Dijkstra's algorithm — THE standard tool for shortest times on weighted graphs.",
        "방금 그 방법의 이름 = 다익스트라(Dijkstra) 알고리즘. 시간이 각각 다른 그래프에서 최단 시간을 구하는 표준 도구예요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ display: "inline-block", background: "#f5f3ff", border: `2px solid ${A}`, borderRadius: 10, padding: "8px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6" }}>
                🏷️ {t(E, "Dijkstra's algorithm", "다익스트라 (Dijkstra) 알고리즘")}
              </div>
              <div style={{ fontSize: 11.5, color: "#5b21b6", marginTop: 2 }}>
                {t(E, "= “lock in the earliest candidate, one at a time”", "= “제일 이른 후보를 하나씩 확정”")}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "8px 10px", fontSize: 12, lineHeight: 1.6, color: "#7f1d1d" }}>
              <div style={{ fontWeight: 800, marginBottom: 2 }}>❌ BFS</div>
              {t(E, "Counts roads (1 hop each), ignores times. 1→2 direct (7 min) and 1→5 direct (18 min) look the same: “1 road”. Wrong tool here.",
                    "다리 '개수'만 세요. 1→2 (7분)도 1→5 (18분)도 똑같이 “다리 1개”로 보여요. 시간이 다른 이 문제엔 안 맞아요.")}
            </div>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "8px 10px", fontSize: 12, lineHeight: 1.6, color: "#14532d" }}>
              <div style={{ fontWeight: 800, marginBottom: 2 }}>✅ {t(E, "Dijkstra", "다익스트라")}</div>
              {t(E, "Uses real times → the earliest arrival to every city. Exactly the number we need.",
                    "실제 시간을 써요 → 각 도시의 '가장 빠른 도착 시각'. 우리가 필요한 바로 그 숫자.")}
            </div>
          </div>
          <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#1e3a8a", lineHeight: 1.65 }}>
            📌 {t(E,
              <><b>When to reach for Dijkstra:</b> roads (edges) have different costs/times, and the question is “fastest / shortest / cheapest way from a start”.</>,
              <><b>다익스트라를 꺼내는 순간:</b> 다리(간선)마다 시간/비용이 다르고, “출발점에서 가장 빨리/짧게/싸게”를 물을 때.</>)}
          </div>
        </div>),
    },
    // 2-6: 이 문제에 적용 — 빨간 다리 조건 하나만 추가
    {
      type: "reveal",
      narr: t(E,
        "Back to OUR problem: plain Dijkstra + ONE extra check on red roads. That's the whole solution.",
        "이제 우리 문제로: 그냥 다익스트라에 빨간 다리 검사 딱 하나만 추가하면 — 그게 풀이 전부예요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 8, textAlign: "center" }}>
            {t(E, "Dijkstra + the red-road check", "다익스트라 + 빨간 다리 검사")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: "#14532d" }}>
              🟢 {t(E, <>Green road → use it exactly like normal Dijkstra. No change.</>,
                     <>초록 다리 → 그냥 평소 다익스트라처럼 사용. 바꿀 것 없음.</>)}
            </div>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: "#7f1d1d" }}>
              🔴 {t(E, <>Red road → allowed only if you <b>start before K</b> and <b>finish by K</b> (finish time = current clock + road time). Otherwise skip that road.</>,
                     <>빨간 다리 → <b>출발이 K 전</b>이고 <b>다 건넌 시각 ≤ K</b> 일 때만 사용 (건넌 시각 = 지금 시계 + 다리 시간). 아니면 그 다리는 건너뛰기.</>)}
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.7, color: C.text }}>
              🔁 {t(E, <>Each query K = run this once and count the cities that got a time (not ∞). Q queries → Q runs.</>,
                     <>쿼리 K 하나 = 이걸 한 번 돌리고, 시각이 매겨진(∞ 아닌) 도시 수를 세면 답. 쿼리 Q개 → Q번 실행.</>)}
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: "#92400e", textAlign: "center" }}>
            {t(E, "Next chapter: this exact plan, as code 👉", "다음 챕터: 이 계획 그대로 코드로 👉")}
          </div>
        </div>),
    },
    // 2-7: 확인 퀴즈
    {
      type: "input",
      narr: t(E,
        "Check: with the sample, our plan gives K=6 → 2, K=11 → 4, K=12 → 5.\nWhat's the sum of the three answers?",
        "확인해봐요: 예제에서 이 계획대로면 K=6 → 2, K=11 → 4, K=12 → 5.\n세 답의 합은?"),
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
        "Time to turn the plan into code — exactly the 3 pieces from last chapter: read input → Dijkstra with the red-road check → count per query.\nFirst: read the input.",
        "앞 챕터 계획을 그대로 코드로 옮겨요 — 입력 읽기 → 빨간 다리 검사 붙인 다익스트라 → 쿼리마다 세기, 딱 3조각.\n먼저: 입력 읽기."),
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
        "Next, read which roads are weak (the damaged set) and the Q queries (values of K).", "다음으로 약한 다리 목록(damaged)과 쿼리(K 값들)를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, marginBottom: 6 }}>
            {t(E, "Step 2: Weak roads & queries", "2단계: 약한 다리 & 쿼리")}
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
        "The core: Dijkstra with the weak-road check.\nSafe roads always usable.\nWeak roads only if start_time < K and arrive_time ≤ K.", "핵심 부분! 다익스트라인데, 약한 다리에 검사를 하나 걸어요. 안전한 다리는 항상 OK, 약한 다리는 출발 < K, 도착 ≤ K 일 때만!"),
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
              "Key: weak-road check at lines 10-12",
              "핵심: 10-12번 줄의 약한 다리 검사")}
          </div>
        </div>),
    },
    // 3-3b: Deep audit — step the modified Dijkstra edge by edge under K
    {
      type: "dijkstraKAudit",
      narr: t(E,
        "Deep audit time! Pick K=6, 11, or 12, then click Next to walk through every edge the algorithm checks.\nWatch which damaged edges get blocked by `not(d < K and arrive <= K)` and which slip through.\nThis is exactly what the inner loop does — line by line.",
        "심층 점검 시간! K = 6, 11, 12 중 골라요. 다음 버튼을 누를 때마다 알고리즘이 검사하는 도로 하나씩 따라가. 약한 다리 중 어떤 것이 `not(d < K and arrive <= K)` 검사에 걸려 차단되고 어떤 것이 통과하는지 봐. 코드의 안쪽 루프가 그대로 한 줄씩 펼쳐지는 거야!"),
    },
    // 3-4: Why it works
    {
      type: "reveal",
      narr: t(E,
        "Why does this work?\nDijkstra always locks in the earliest city first.\nSo when a city gets its time, it IS the fastest arrival.\nFor weak roads, we just add the K check.", "왜 이게 맞을까? 다익스트라는 항상 제일 이른 도시부터 확정해요. 그래서 시각이 매겨지면 그게 가장 빠른 도착이에요. 약한 다리는 K 검사만 추가하면 끝!"),
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
              "약한 다리 검사: 시간이 안 맞으면 그냥 건너뛰기")}</div>
            <div>✅ {t(E,
              "Monotonic: larger K → more roads usable → more cities",
              "단조 증가: K가 클수록 도로를 더 쓸 수 있어 → 도시 더 많이 도달")}</div>
          </div>
          <div style={{
            marginTop: 10, background: "#fff7ed", borderRadius: 8, padding: "8px 12px",
            border: "1.5px solid #fdba74", fontSize: 12, color: "#9a3412",
            lineHeight: 1.6, wordBreak: "keep-all",
          }}>
            ⚠️ {t(E,
              "Heads up: this runs a full Dijkstra PER query = O(Q · M log N).  Clear to read, but too slow for the biggest inputs (Q, M up to hundreds of thousands) — it would TLE.",
              "짚고 가기: 이 코드는 쿼리마다 다익스트라를 처음부터 = O(Q · M log N).  읽기엔 명확하지만 큰 입력(Q, M 수십만)엔 너무 느려요 — 시간초과(TLE).")}
            <div style={{ marginTop: 4, fontWeight: 700 }}>
              💡 {t(E,
                "Full score: sort queries by K and add roads incrementally (offline), so you don't recompute from scratch each time.",
                "만점 풀이: 쿼리를 K 로 정렬해 도로를 점점 추가(오프라인)하면 매번 처음부터 다시 계산 안 해도 돼요.")}
            </div>
          </div>
        </div>),
    },
    // 3-5: Full code (clear, understand-first version — TLEs on huge inputs; see 3-4 badge)
    {
      type: "code",
      narr: t(E,
        "The clear, understand-first version: read → Dijkstra per query → count reachable.  It's correct; for full score on the biggest inputs, use the sort-by-K offline trick from the last slide. 🐉",
        "이해 우선의 명확한 버전이에요: 입력 읽기 → 쿼리마다 다익스트라 → 도달 가능 수 세기.  정답은 맞고, 큰 입력 만점은 앞 슬라이드의 'K 정렬 오프라인' 방법으로. 🐉"),
      code: SOLUTION_CODE,
      label: t(E, "Show the clear version", "명확한 버전 코드 보기"),
    },
  ];
}
