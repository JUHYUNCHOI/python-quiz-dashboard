import { C, t } from "@/components/quest/theme";
import { getFjFarmsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1     # number of test cases",
  "",
  "# t[i] = how many plants should be STRICTLY taller than plant i in the",
  "# final ordering.  Find the smallest day x such that after x days of",
  "# growth, this ordering matches.  -1 if no such x exists.",
  "# Editorial fact: under the given bounds, if any x works it's ≤ 1000.",
  "",
  "def solve(N, h, a, t):",
  "    for x in range(1101):",
  "        heights = [h[i] + a[i] * x for i in range(N)]",
  "        # tcomp[i] = number of plants strictly taller than plant i",
  "        tcomp = [sum(1 for j in range(N) if heights[j] > heights[i]) for i in range(N)]",
  "        if tcomp == t:",
  "            return x",
  "    return -1",
  "",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx]); idx += 1",
  "    h = [int(data[idx + i]) for i in range(N)]; idx += N",
  "    a = [int(data[idx + i]) for i in range(N)]; idx += N",
  "    t = [int(data[idx + i]) for i in range(N)]; idx += N",
  "    out.append(str(solve(N, h, a, t)))",
  "",
  "print(chr(10).join(out))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N plants — plant i starts at height h[i] and grows by a[i] per day.  We're given target counts t[i] meaning 'after some day x, plant i should have exactly t[i] OTHER plants strictly taller than it'.  Find the smallest x ≥ 0 that makes ALL counts match — or -1.",
        "FJ 의 N 개 식물 — i 번 식물은 h[i] 에서 시작해 하루 a[i] 씩 자라요. 목표 t[i] 는 '어떤 날 x 후에 i 번 식물보다 키가 큰 식물이 정확히 t[i] 개' 라는 뜻. 모든 i 의 카운트가 맞는 가장 작은 x ≥ 0 을 찾아요. 없으면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🌱</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>FJ Actually Farms</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N plants", "N개 식물")}</b>
                  {t(E, " with initial heights ", "이 있어요. 초기 키 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i]</code>
                  {t(E, " and growth rates ", " 와 성장률 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, ".", "이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On day d, plant i has height ", "d일에 i번 식물의 키는 ")}
                  <b style={{ color: "#0891b2" }}><code style={{ background: "#cffafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i] + a[i] · d</code></b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Target t[i]", "목표 t[i]")}</b>
                  {t(E, " is the number of OTHER plants we want to be strictly taller than plant i on the answer day.  (Same heights don't count as 'taller'.)",
                        " 는 정답 날에 i 번 식물보다 키가 큰 다른 식물의 수예요. (키가 같으면 '큼' 으로 안 침.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest day x ≥ 0", "가장 작은 x ≥ 0")}</b>
                  {t(E, " on which every t[i] matches, or -1 if it can never happen.",
                        " 를 출력해요. 모든 t[i] 가 맞는 첫 날, 절대 안 되면 -1.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Mini-visual — what does t[] mean
    {
      type: "reveal",
      narr: t(E,
        "Walk through one example: plants 0 and 1 grow at different rates; on day 5 plant 1 finally overtakes plant 0.",
        "예시 따라가기: 식물 0 과 1 이 다른 속도로 자람. 5 일째 식물 1 이 식물 0 을 추월."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", textAlign: "center", marginBottom: 10 }}>
            {t(E, "h = [7, 3], a = [8, 9], target t = [1, 0]",
                  "h = [7, 3], a = [8, 9], 목표 t = [1, 0]")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {[
              { d: 0, h0: 7,  h1: 3,  t0: 0, t1: 1 },
              { d: 1, h0: 15, h1: 12, t0: 0, t1: 1 },
              { d: 4, h0: 39, h1: 39, t0: 0, t1: 0 },  // tie
              { d: 5, h0: 47, h1: 48, t0: 1, t1: 0 },  // matches!
            ].map((row, i) => {
              const matches = row.t0 === 1 && row.t1 === 0;
              return (
                <div key={i} style={{
                  background: matches ? "#dcfce7" : "#fff",
                  border: `2px solid ${matches ? "#16a34a" : "#a7f3d0"}`,
                  borderRadius: 10, padding: 8, textAlign: "center",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: matches ? "#15803d" : "#065f46", marginBottom: 4 }}>{t(E, "Day", "Day")} {row.d}</div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#065f46" }}>
                    h = [{row.h0}, {row.h1}]
                  </div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: matches ? "#15803d" : "#065f46", fontWeight: matches ? 800 : 500, marginTop: 2 }}>
                    t = [{row.t0}, {row.t1}]
                  </div>
                  {matches && (<div style={{ fontSize: 10, color: "#15803d", fontWeight: 800, marginTop: 4 }}>✓ {t(E, "match", "일치")}</div>)}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: C.text, lineHeight: 1.7, textAlign: "center" }}>
            {t(E, "On day 4 the plants tie, so neither is 'strictly taller' → both t = 0.  On day 5 plant 1 has overtaken → answer = 5.",
                  "4 일에 키가 같음 → '큰' 으로 안 침 → 둘 다 t=0. 5 일에 식물 1 이 추월 → 답 = 5.")}
          </div>
        </div>),
    },
    // 1-3: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: T cases.  Each case: N, then N heights, N growth rates, N targets — each on its own line.",
        "입력: T 케이스. 각 케이스: N, 그 다음 N 개 키, N 개 성장률, N 개 목표 — 각자 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#065f46", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#065f46", whiteSpace: "pre" }}>
{`6
1
10
1
0
2
7 3
8 10
1 0
2
3 6
10 8
0 1
2
7 3
8 9
1 0
2
7 7
8 8
0 1
2
7 3
8 8
1 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
3
2
5
-1
-1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 10, padding: 12, fontSize: 11.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#065f46", marginBottom: 6 }}>
              🔍 {t(E, "Why -1 cases?", "왜 -1?")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "Case 5: a = [8, 8] — equal growth rates, plants never change relative order; t = [0, 1] needs plant 1 strictly taller, impossible.",
                    "5 번: a = [8, 8] — 성장률 같음, 상대 순서 영원히 안 바뀜; t = [0, 1] 은 식물 1 이 더 커야 하는데 불가능.")}
              <br/>
              {t(E, "Case 6: a = [8, 8] same; t = [1, 0] needs plant 0 strictly taller, but h[0]=7 < h[1]=8 wait... initial h=[7, 3].  Same growth → plant 0 stays 4 ahead → t = [0, 1] forever.  t = [1, 0] never reached.",
                    "6 번: a = [8, 8] 같음; h=[7, 3] 으로 시작해 식물 0 이 영원히 4 앞섬 → t = [0, 1] 만 가능. t = [1, 0] 영원히 안 됨.")}
            </div>
          </div>
        </div>),
    },
    // 1-4: Quiz — height calculation
    {
      type: "quiz",
      narr: t(E,
        "Each plant's height on day d is h[i] + a[i] · d.",
        "d 일에 식물 i 의 키 = h[i] + a[i] · d."),
      question: t(E,
        "Plant: h=2, a=3.  After 2 days, height = 2 + 3 × 2 = ?",
        "식물: h=2, a=3. 2 일 후 키 = 2 + 3 × 2 = ?"),
      options: [
        t(E, "6", "6"),
        t(E, "8", "8"),
        t(E, "12", "12"),
      ],
      correct: 1,
      explain: t(E,
        "2 + 3 × 2 = 2 + 6 = 8.  The plant grows 3 units per day for 2 days.",
        "2 + 3 × 2 = 2 + 6 = 8. 식물이 하루에 3 씩 2 일 동안 자라."),
    },
    // 1-5: Input — confirm understanding
    {
      type: "input",
      narr: t(E,
        "Now compute count: at d=0, h = [7, 3].  How many plants are strictly TALLER than plant 0?",
        "이제 카운트: d=0 일 때 h = [7, 3]. 식물 0 보다 키가 큰 식물 수?"),
      question: t(E,
        "h = [7, 3] at d = 0.  Number of plants strictly taller than plant 0?",
        "h = [7, 3], d = 0. 식물 0 보다 큰 식물 수?"),
      hint: t(E,
        "Plant 0 has height 7, plant 1 has height 3.  Plant 1 < plant 0 — so 0 plants are taller than plant 0.",
        "식물 0 = 7, 식물 1 = 3. 식물 1 < 식물 0 — 식물 0 보다 큰 식물 0 개."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFjFarmsCh2(E, lang = "py") {
  return [
    // 2-1: Brute plan — try each day
    {
      type: "reveal",
      narr: t(E,
        "Plan: try each day x = 0, 1, 2, ...  At each x, compute heights and the count of strictly-taller plants per i.  If counts match t → return x.  Cap at 1100 (per editorial, that's enough under bounds).",
        "계획: x = 0, 1, 2, ... 매 x 시도. 각 x 에서 키를 계산하고 i 마다 더 큰 식물 수를 셈. 카운트가 t 와 같으면 → x 반환. 1100 까지 시도 (editorial 에 따라 그 이내에 답이 있음)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read T cases",                   "T 케이스 읽기"),       code: "T = int(input())",                                          color: "#059669" },
              { n: 2, label: t(E, "Per case: read N, h, a, t",       "케이스마다: N,h,a,t 읽기"), code: "h, a, t each have N entries",                              color: "#0891b2" },
              { n: 3, label: t(E, "Try each day x in [0, 1100]",     "x 를 [0, 1100] 시도"), code: "heights[i] = h[i] + a[i] * x",                              color: "#7c3aed" },
              { n: 4, label: t(E, "Count strictly-taller per i",    "i 마다 더 큰 식물 수"), code: "tcomp[i] = sum(heights[j] > heights[i] for j in range(N))", color: "#dc2626" },
              { n: 5, label: t(E, "If tcomp == t → return x",        "tcomp == t → x 반환"), code: "return x  (or -1 after cap)",                              color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            ⚠️ {t(E, "Why NOT binary-search on x?  The 'correct ordering' is NOT monotonic in x — two plants can swap places more than once as x grows (e.g. start ahead, get caught, fall behind, then catch up by another plant).  So we can't binary-search; brute O(N² · 1100) per case is fine for Bronze bounds.",
                       "왜 이분탐색 안 됨? '맞는 순위' 가 x 에 대해 단조롭지 않아요 — 두 식물이 여러 번 자리 바뀔 수 있음. 그래서 이분탐색 X. 케이스당 O(N² · 1100) 브루트로 충분 (Bronze 제약).")}
          </div>
        </div>),
    },
    // 2-2: Full code reveal
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getFjFarmsSections(E),
    },
  ];
}
