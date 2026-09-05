import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getExplodingArrowSections } from "./components";

const A = "#f97316";      // orange accent
const P = "#7c3aed";      // purple secondary
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ================================================================
   SOLUTION CODE  (fast: binary-search X, O(N) feasibility)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from math import isqrt",
  "",
  "def solve(N, M, K, a):",
  "    # X 가 커질수록 쉬워짐 → 정답 X 를 이분 탐색",
  "    hi = 1",
  "    for j in range(N):",
  "        need = (a[j] + j*j + M - 1) // M   # j 를 혼자 없앨 최소 X",
  "        if need > hi:",
  "            hi = need",
  "    lo = 1",
  "",
  "    def feasible(X):                       # 화살 K 개로 X 가 될까?",
  "        MX = M * X",
  "        L = isqrt(MX - 1)                  # 데미지가 닿는 최대 거리 (dd < MX)",
  "        if L > N - 1:",
  "            L = N - 1",
  "        VAL = [0](N+1); D1 = [0](N+1); D2 = [0]*(N+1)",
  "        val = 0; slope = 0; accel = 0; used = 0",
  "        for x in range(N):",
  "            if x > 0:",
  "                val += slope; slope += accel",
  "            val += VAL[x]; slope += D1[x]; accel += D2[x]",
  "            deficit = a[x] - val           # 아직 남은 체력",
  "            if deficit > 0:",
  "                c = (deficit + MX - 1) // MX   # 여기서 쏠 화살 수",
  "                used += c",
  "                if used > K:",
  "                    return False",
  "                val += cMX; slope += -c; accel += -2c",
  "                p = x + L + 1              # 이 포물선이 끝나는 위치",
  "                if p <= N - 1:",
  "                    VAL[p] += c((L+1)(L+1) - MX)",
  "                    D1[p]  += c*(2*L + 3)",
  "                    D2[p]  += 2*c",
  "        return True",
  "",
  "    while lo < hi:                         # 이분 탐색: 가능한 가장 작은 X",
  "        mid = (lo + hi) // 2",
  "        if feasible(mid):",
  "            hi = mid",
  "        else:",
  "            lo = mid + 1",
  "    return lo",
  "",
  "data = sys.stdin.read().split()",
  "N, M, K = int(data[0]), int(data[1]), int(data[2])",
  "a = [int(x) for x in data[3:3+N]]",
  "print(solve(N, M, K, a))",
];


/* ═══════════════════════════════════════════════════════════════
   Concept sim: binary search on the answer X.
   Sample data (matches the official example): N=4, M=1, K=2,
   hp = [3,3,2,4] → the minimum feasible X is 5.
   The student picks X and sees (1) the arrow's splash damage,
   (2) whether every target dies with ≤ K arrows, and (3) that
   feasibility flips exactly once as X grows → binary-searchable.
   ═══════════════════════════════════════════════════════════════ */
const SIM_M = 1, SIM_K = 2, SIM_A = [3, 3, 2, 4];

function greedyFire(X) {
  const N = SIM_A.length, MX = SIM_M * X;
  const dmg = new Array(N).fill(0);
  const fireCount = new Array(N).fill(0);
  let used = 0;
  for (let x = 0; x < N; x++) {
    const deficit = SIM_A[x] - dmg[x];
    if (deficit > 0) {
      const c = Math.ceil(deficit / MX);
      fireCount[x] = c;
      used += c;
      for (let j = x; j < N; j++) {
        const d = j - x, per = MX - d * d;
        if (per <= 0) break;
        dmg[j] += c * per;
      }
    }
  }
  return { dmg, fireCount, used, ok: used <= SIM_K };
}

// splash values of ONE arrow at power X, by distance (only positive ones)
function splash(X) {
  const MX = SIM_M * X, out = [];
  for (let d = 0; ; d++) {
    const v = MX - d * d;
    if (v <= 0) break;
    out.push(v);
  }
  return out;
}

function BinarySearchXSim({ E }) {
  const [X, setX] = useState(3);
  const MX = SIM_M * X;
  const res = greedyFire(X);
  const strip = [];
  for (let x = 1; x <= 8; x++) strip.push({ x, ok: greedyFire(x).ok });
  const minFeasible = strip.find((s) => s.ok)?.x;
  const maxHp = Math.max(...SIM_A);

  const xBtn = {
    width: 30, height: 30, borderRadius: 7, border: "1px solid #fdba74",
    background: "#fff", color: "#9a3412", fontSize: 18, fontWeight: 800,
    cursor: "pointer", lineHeight: 1,
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
          🎯 {t(E, "Guess the arrow power X", "화살의 힘 X 를 정해봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "4 targets in a row with hp [3, 3, 2, 4]. You have K = 2 arrows (M = 1). An arrow of power X fired at target i deals max(0, M·X − d²) to the target d steps to its right. Pick X, place arrows greedily, and see if everyone dies.",
            "일렬의 표적 4개, 체력 [3, 3, 2, 4]. 화살은 K = 2개 (M = 1). 힘 X 짜리 화살을 표적 i 에 쏘면, 오른쪽으로 d 칸 떨어진 표적에게 max(0, M·X − d²) 데미지를 줘요. X 를 골라 화살을 놓고, 다 쓰러지는지 봐요.")}
        </div>

        {/* X control */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: "#9a3412", fontWeight: 700 }}>X =</span>
          <button onClick={() => setX(Math.max(1, X - 1))} style={xBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: A, minWidth: 22, textAlign: "center" }}>{X}</span>
          <button onClick={() => setX(Math.min(8, X + 1))} style={xBtn}>+</button>
          <span style={{ ...NW, fontSize: 12, color: C.dim, marginLeft: 4 }}>
            {t(E, "so M·X = ", "그래서 M·X = ")}<b style={{ color: A }}>{MX}</b>
          </span>
        </div>

        {/* splash profile */}
        <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "one arrow's splash (by distance)", "화살 한 발의 퍼짐 (거리별)")}
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {splash(X).map((v, d) => (
            <span key={d} style={{ ...NW, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 10, color: C.dim }}>d={d}</span>
              <span style={{
                minWidth: 26, textAlign: "center", padding: "3px 6px", borderRadius: 6,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800,
                background: "#fde68a", color: "#92400e", border: "1px solid #f59e0b",
              }}>{v}</span>
            </span>
          ))}
          <span style={{ fontSize: 11, color: C.dim, alignSelf: "flex-end", paddingBottom: 4 }}>
            {t(E, "→ farther = weaker, then 0", "→ 멀수록 약해지다 0")}
          </span>
        </div>

        {/* targets */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: "center", marginBottom: 6, minHeight: 120 }}>
          {SIM_A.map((hp, j) => {
            const remaining = hp - res.dmg[j];
            const dead = remaining <= 0;
            const barH = 22 * maxHp;
            const fillFrac = Math.max(0, remaining) / hp;
            return (
              <div key={j} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {/* fired arrows on top of this position */}
                <div style={{ height: 18, fontSize: 12, fontWeight: 800, color: A }}>
                  {res.fireCount[j] > 0 ? `↓×${res.fireCount[j]}` : ""}
                </div>
                <div style={{ position: "relative", width: 28, height: barH, background: "#f1f5f9", borderRadius: 5, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: `${fillFrac * 100}%`,
                    background: dead ? "#86efac" : "#fb923c",
                    transition: "height .15s",
                  }} />
                  {dead && <div style={{ position: "absolute", top: 2, left: 0, right: 0, textAlign: "center", fontSize: 12 }}>✅</div>}
                </div>
                <div style={{ fontSize: 10, color: C.dim }}>t{j}</div>
                <div style={{ ...NW, fontSize: 10.5, color: dead ? "#15803d" : "#9a3412", fontWeight: 700 }}>
                  {dead ? t(E, "dead", "제거") : `hp ${remaining}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* verdict */}
        <div style={{
          marginTop: 8, padding: "10px 12px", borderRadius: 8, ...KA,
          background: res.ok ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${res.ok ? "#6ee7b7" : "#fca5a5"}`,
        }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: res.ok ? "#065f46" : "#b91c1c" }}>
            {res.ok
              ? t(E, `✓ Feasible — used ${res.used} of ${SIM_K} arrows`, `✓ 가능 — 화살 ${res.used}/${SIM_K}개 사용`)
              : t(E, `✗ Not enough — this greedy needed ${res.used} arrows, but K = ${SIM_K}`, `✗ 부족 — 이 그리디로 ${res.used}개 필요, 하지만 K = ${SIM_K}`)}
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 3 }}>
            {res.ok
              ? t(E, "Every target reached hp ≤ 0 within the arrow budget.", "예산 안에서 모든 표적이 체력 ≤ 0 에 도달했어요.")
              : t(E, "The splash is too weak, so it takes too many arrows. Raise X.", "퍼짐이 약해서 화살이 너무 많이 들어요. X 를 올려봐요.")}
          </div>
        </div>

        {/* monotonicity strip */}
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 5 }}>
            {t(E, "feasible? across X — watch it flip ONCE", "X 별 가능 여부 — 딱 한 번 뒤집혀요")}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {strip.map((s) => (
              <button key={s.x} onClick={() => setX(s.x)} style={{
                ...NW, cursor: "pointer",
                display: "inline-flex", flexDirection: "column", alignItems: "center",
                width: 34, padding: "4px 0", borderRadius: 6,
                border: s.x === X ? `2px solid ${A}` : "1px solid #e2e8f0",
                background: s.ok ? "#ecfdf5" : "#fef2f2",
              }}>
                <span style={{ fontSize: 10, color: C.dim }}>X={s.x}</span>
                <span style={{ fontSize: 13 }}>{s.ok ? "✓" : "✗"}</span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, ...KA }}>
            {t(E,
              `✗ ✗ ✗ ✗ then ✓ ✓ ✓ ✓ — never back to ✗. The smallest feasible X is ${minFeasible}. Because it flips only once, binary search jumps straight to that boundary instead of trying every X.`,
              `✗ ✗ ✗ ✗ 이후 ✓ ✓ ✓ ✓ — 다시 ✗ 로 안 돌아가요. 가능한 가장 작은 X 는 ${minFeasible}. 한 번만 뒤집히니, 모든 X 를 시험하지 않고 이분 탐색이 그 경계로 바로 뛰어요.`)}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExplodingArrowCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "N targets stand in a row with health a[0..N-1]. You have K arrows. Firing an arrow of power X at target i drops the health of every target j ≥ i by max(0, M·X − (j−i)²) — strong up close, fading with distance, then nothing.\nFind the SMALLEST power X so that, placing arrows optimally, every target reaches health ≤ 0.",
        "표적 N개가 일렬로 서 있고 체력은 a[0..N-1]. 화살은 K개. 힘 X 짜리 화살을 표적 i 에 쏘면, i 오른쪽의 모든 표적 j 의 체력이 max(0, M·X − (j−i)²) 만큼 줄어요 — 가까울수록 세고, 멀수록 약해지다 0.\n화살을 잘 배치해서 모든 표적을 체력 ≤ 0 으로 만드는 가장 작은 힘 X 를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"💥"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Exploding Arrow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P5</div>
            <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3, fontWeight: 700 }}>
              {t(E, "Very hard (Division 1) — take it slow.", "아주 어려움 (디비전 1) — 천천히 가요.")}
            </div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum arrow power X that clears every target within K arrows.",
                "화살 K개로 모든 표적을 없앨 수 있는 최소 힘 X 를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "표적 ")}<b style={{ color: A }}>N</b>
                  {t(E, " targets in a line with health ", " 개가 일렬로 있고 체력은 ")}
                  <b style={{ color: A }}>a[0], a[1], …, a[N−1]</b>{t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An arrow of power ", "힘 ")}<b style={{ color: A }}>X</b>
                  {t(E, " fired at target ", " 짜리 화살을 표적 ")}<b style={{ color: A }}>i</b>
                  {t(E, " reduces every target ", " 에 쏘면, ")}<b style={{ color: A }}>j ≥ i</b>
                  {t(E, "'s health by ", " 인 모든 표적의 체력을 ")}
                  <b style={{ color: P }}>max(0, M·X − (j−i)²)</b>{t(E, ".", " 만큼 줄여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You have ", "화살은 ")}<b style={{ color: A }}>K</b>
                  {t(E, " arrows and place them wherever you like.", " 개이고 어디든 원하는 곳에 놓을 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest X", "가장 작은 X")}</b>
                  {t(E, " that makes every target's health ≤ 0.", " — 모든 표적의 체력을 ≤ 0 으로 만드는 값 — 를 출력해요.")}
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
        "How does the data arrive?\nLine 1: N M K. Line 2: the N health values.\nOutput: one integer — the minimum power X.",
        "데이터는 어떻게 들어올까요?\n1번 줄: N M K. 2번 줄: 체력 N개.\n출력: 정수 하나 — 최소 힘 X."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75 }}>
              <div><b>N M K</b> — {t(E, "targets, damage scale, arrows", "표적 수, 데미지 배율, 화살 수")}</div>
              <div><b>a[0] … a[N−1]</b> — {t(E, "each target's health", "각 표적의 체력")}</div>
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fde68a" }}>
              {t(E, "Limits: N ≤ 2·10^5; M, K, a[i] ≤ 10^9. Everything is big — use 64-bit integers.",
                  "제약: N ≤ 2·10^5; M, K, a[i] ≤ 10^9. 값이 커요 — 64비트 정수 사용.")}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#f8fafc" }}>
                <div>4 1 2</div>
                <div>3 3 2 4</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 15, lineHeight: 1.7, color: "#86efac", fontWeight: 800 }}>
                <div>5</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 10, lineHeight: 1.6, ...KA }}>
            {t(E,
              "N=4 targets with hp [3,3,2,4], M=1, K=2 arrows. With X=5 (so M·X=5) one arrow at target 0 and one at target 2 clears everyone. No smaller X works — the answer is 5.",
              "표적 4개, 체력 [3,3,2,4], M=1, 화살 K=2개. X=5 (M·X=5) 이면 표적 0 에 한 발, 표적 2 에 한 발로 전부 제거돼요. 더 작은 X 는 안 되니 정답은 5.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Play with the answer directly. Pick a power X, watch the arrow's splash and whether K arrows finish everyone — then notice the feasibility flips exactly once.",
        "정답을 직접 만져봐요. 힘 X 를 골라 화살의 퍼짐과 K개로 다 끝나는지 보고 — 가능 여부가 딱 한 번 뒤집히는 걸 확인해요."),
      content: <BinarySearchXSim E={E} />,
    },

    // 1-4: understanding check (monotonicity = why binary search works)
    {
      type: "quiz",
      narr: t(E,
        "Stronger arrows can only help: any target a weak arrow kills, a stronger one kills too. So once some X works, every larger X works.",
        "더 센 화살은 손해가 없어요: 약한 화살이 없앤 표적은 센 화살도 없애요. 그러니 어떤 X 가 되면, 더 큰 X 는 모두 돼요."),
      question: t(E,
        "Suppose X = 5 clears every target within K arrows. What can we say about X = 6?",
        "X = 5 로 K개 안에 모든 표적을 없앨 수 있다고 해요. X = 6 은 어떨까요?"),
      options: [
        t(E, "X = 6 also works — bigger power is never worse", "X = 6 도 돼요 — 더 큰 힘은 절대 손해가 아니에요"),
        t(E, "X = 6 might fail — too much damage wastes arrows", "X = 6 은 실패할 수 있어요 — 데미지가 너무 커서 화살 낭비"),
        t(E, "We can't tell without recomputing", "다시 계산하지 않으면 알 수 없어요"),
      ],
      correct: 0,
      explain: t(E,
        "Feasibility is monotonic: works at 5 ⇒ works at 6, 7, 8, … It flips from ✗ to ✓ exactly once. That single flip is what lets binary search find the smallest working X in log steps.",
        "가능 여부는 단조로워요: 5 에서 되면 6, 7, 8, … 에서도 돼요. ✗ 에서 ✓ 로 딱 한 번 뒤집혀요. 이 한 번의 전환 덕분에 이분 탐색이 log 번 만에 가장 작은 X 를 찾아요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExplodingArrowCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "Trying every X and re-simulating every arrow is far too slow. Instead: binary-search the answer X (each guess is a yes/no), and answer each yes/no in O(N) with a greedy sweep that stamps parabola-shaped damage using a difference array.",
        "모든 X 를 시도하며 화살을 매번 다시 시뮬레이션하면 너무 느려요. 대신: 정답 X 를 이분 탐색하고 (각 추측은 예/아니오), 각 예/아니오를 그리디 훑기 + 차분 배열로 O(N) 에 답해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try each X, re-place arrows from scratch", "느림: X 마다 화살을 처음부터 다시 배치")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "X can be up to ~10^9 and each check touches N ≤ 2·10^5 targets with a parabola each. Way past the time limit.",
                  "X 는 최대 ~10^9, 매 검사가 표적 N ≤ 2·10^5 개에 포물선을 하나씩 그려요. 시간 제한을 한참 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: binary-search X, O(N) feasibility check", "빠름: X 이분 탐색 + O(N) 가능성 검사")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Because feasibility flips only once, ~log(10^9) ≈ 30 guesses suffice. Each guess is an O(N) greedy sweep. Total ≈ 30 × N.",
                  "가능 여부가 한 번만 뒤집히니 ~log(10^9) ≈ 30번 추측이면 충분해요. 각 추측은 O(N) 그리디 훑기. 합계 ≈ 30 × N.")}
              </div>
            </div>
            <div style={{ background: "#faf5ff", border: "1px solid #d8b4fe", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12, color: "#6b21a8", lineHeight: 1.55, ...KA }}>
                {t(E,
                  "The two hard ideas: (1) binary-search the ANSWER, not the damage; (2) add a whole parabola of damage to a range in O(1) with a 2nd-order difference array. Honest heads-up: this is a Division-1 problem — read each note twice.",
                  "어려운 두 아이디어: (1) 데미지가 아니라 정답을 이분 탐색; (2) 2차 차분 배열로 포물선 데미지를 구간에 O(1) 로 더하기. 솔직히 말하면 디비전 1 문제예요 — 각 노트를 두 번씩 읽어요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getExplodingArrowSections(E),
    },
  ];
}
