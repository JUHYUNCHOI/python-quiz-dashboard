import { C, t } from "@/components/quest/theme";
import { getBacteriaSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
  "",
  "# Editorial trick (Rohin Garg, USACO Jan 2024 Bronze #3):",
  "# A type-1 spray (h, +1+2+3+... triangle) increments a suffix of diff(a)",
  "# by 1 — and a type-2 spray decrements one.  At the SECOND difference",
  "# level diff(diff(a)), each spray only changes ONE position by +/-1.",
  "# So the minimum number of sprays to make a all-zero =",
  "#     sum of |diff(diff(a))_i|",
  "",
  "def diff(arr):",
  "    # First-order difference: [a0, a1-a0, a2-a1, ...]",
  "    return [arr[0]] + [arr[i] - arr[i - 1] for i in range(1, len(arr))]",
  "",
  "dd = diff(diff(a))",
  "ans = sum(abs(x) for x in dd)",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N patches in a row with deviation values a[1..N].  A type-1 walk starting at h adds the linear ramp 1, 2, 3, ... to a[h], a[h+1], ..., a[N].  A type-2 walk subtracts the same ramp.  Each walk = 1 operation.  Find the minimum number of walks to zero out every a[i].",
        "FJ 의 N 개 패치, 편차 a[1..N]. 타입 1 워크 (시작 h): a[h] += 1, a[h+1] += 2, ..., a[N] += (N-h+1) 의 선형 ramp 추가. 타입 2 워크: 같은 ramp 를 빼기. 워크 한 번 = 1 회. 모든 a[i] 가 0 이 되는 최소 워크 수."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udda0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Balancing Bacteria</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #3</div>
          </div>

          {/* Mini-visual: linear ramp added to a[h..N] */}
          <div style={{ background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", textAlign: "center", marginBottom: 10 }}>
              {t(E, "What ONE walk does — type-1 starting at h=2 on a 5-patch row:",
                    "워크 한 번이 하는 일 — 5 칸 패치, 타입 1, h=2:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginBottom: 8 }}>
              {[
                { i: 1, before: 0, add: 0, color: "#9ca3af" },
                { i: 2, before: 0, add: 1, color: "#16a34a" },
                { i: 3, before: 0, add: 2, color: "#16a34a" },
                { i: 4, before: 0, add: 3, color: "#16a34a" },
                { i: 5, before: 0, add: 4, color: "#16a34a" },
              ].map((c) => (
                <div key={c.i} style={{ background: "#fff", border: `2px solid ${c.color}`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>a[{c.i}]</div>
                  <div style={{ fontSize: 10, color: c.add > 0 ? "#16a34a" : "#9ca3af", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>
                    {c.add > 0 ? `+${c.add}` : "—"}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#065f46", fontFamily: "'JetBrains Mono',monospace" }}>{c.before + c.add}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6, textAlign: "center" }}>
              {t(E, "Linear ramp 1, 2, 3, 4 added to a[2..5].  Position 1 unchanged.",
                    "1, 2, 3, 4 의 선형 ramp 가 a[2..5] 에 더해짐. 위치 1 은 그대로.")}
              <br/>
              <b style={{ color: "#059669" }}>{t(E, "Type-2 walk = same ramp, but subtracted.",
                                                       "타입 2 워크 = 같은 ramp 를 빼기.")}</b>
            </div>
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
                  <b style={{ color: "#059669" }}>{t(E, "N patches in a row", "한 줄로 늘어선 N개의 패치")}</b>
                  {t(E, " with deviation values ", "가 있어요. 각 패치의 편차값 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[1..N]</code>
                  {t(E, " (positive or negative).", " (양수 또는 음수)이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Type-1 walk starting at h", "타입 1 워크 (시작 h)")}</b>
                  {t(E, ": adds the ramp ", ": ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>1, 2, 3, …, N − h + 1</code>
                  {t(E, " to positions ", " 만큼을 위치 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h, h+1, …, N</code>
                  {t(E, ".", " 에 더해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Type-2 walk", "타입 2 워크")}</b>
                  {t(E, " is the same ramp but ", " 도 같은 ramp 인데 ")}
                  <b>{t(E, "subtracted", "빼기")}</b>
                  {t(E, ". Each walk counts as ONE operation, regardless of how long the ramp is.",
                        ". 워크 한 번은 ramp 길이와 관계없이 1번으로 계산해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of walks", "필요한 워크의 최소 횟수")}</b>
                  {t(E, " to make every a[i] equal 0.", "를 출력해요. 모든 a[i] 가 0 이 되도록.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: N on line 1, then N values on line 2.  Output: minimum walks.",
        "입력: 1 줄에 N, 2 줄에 N 개 값. 출력: 최소 워크 수."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#065f46", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#065f46", whiteSpace: "pre" }}>
{`2
-1 3`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`6`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#065f46", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "a = [-1, 3]. To zero out a[1]=-1, do 1 type-1 walk starting at h=1: it adds (1, 2) → a = [0, 5].",
                    "a = [-1, 3]. a[1]=-1 을 지우려면 h=1 에서 타입 1 워크 1 회: (1, 2) 더함 → a = [0, 5].")}
              <br/>
              {t(E, "Now a[2]=5. A type-2 walk at h=2 subtracts (1) from a[2] only.  Need 5 such walks.",
                    "a[2]=5. h=2 에서 타입 2 워크는 a[2] 에서 (1) 만 빼요. 5 회 필요.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Total walks: 1 + 5 = 6.", "총 워크 수: 1 + 5 = 6.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — single-position walk
    {
      type: "quiz",
      narr: t(E,
        "A walk starting at h=N only touches a[N] (it's a 1-element ramp).",
        "h=N 에서 시작하는 워크는 a[N] 한 칸만 건드려요 (길이 1 ramp)."),
      question: t(E,
        "If a = [0, 5] (N=2), how many type-2 walks at h=2 do we need to make a[2] = 0?",
        "a = [0, 5] (N=2) 이면, h=2 에서 타입 2 워크 몇 번 해야 a[2] = 0?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "5", "5"),
      ],
      correct: 2,
      explain: t(E,
        "A type-2 walk at h=2 subtracts a 1-length ramp (just 1) from a[2].  Need 5 walks to drop a[2] from 5 → 0.",
        "h=2 의 타입 2 워크는 a[2] 에서 1 만 빼요. a[2] 를 5 → 0 만들려면 5 번."),
    },
    // 1-4: Input — second-difference intuition
    {
      type: "input",
      narr: t(E,
        "Editorial trick: each walk changes diff(diff(a)) at exactly ONE position by ±1.  So min walks = sum of |diff(diff(a))|.",
        "Editorial 핵심: 워크 1 회는 diff(diff(a)) 의 한 위치만 ±1 변경. 최소 워크 = sum |diff(diff(a))|."),
      question: t(E,
        "a = [-1, 3].  diff(a) = [-1, 4].  diff(diff(a)) = [-1, 5].  Sum of absolute values?",
        "a = [-1, 3]. diff(a) = [-1, 4]. diff(diff(a)) = [-1, 5]. 절댓값 합?"),
      hint: t(E,
        "|-1| + |5| = 1 + 5 = 6.  This matches the expected answer.",
        "|-1| + |5| = 1 + 5 = 6. 답과 일치."),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh2(E, lang = "py") {
  return [
    // 2-1: Brute plan — second-order difference
    {
      type: "reveal",
      narr: t(E,
        "Plan: take diff(diff(a)) and sum |dd[i]|.  Each walk changes only ONE position of dd by ±1, so the L1-sum is exactly the minimum number of walks.",
        "계획: diff(diff(a)) 후 |dd[i]| 합. 워크 한 번이 dd 의 한 위치만 ±1 바꾸기 때문에, |dd| 합이 정확히 최소 워크 수."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N + array a",                 "N 과 a 읽기"),                  code: "a = list of N ints",                                            color: "#059669" },
              { n: 2, label: t(E, "diff(a) — first-order difference", "diff(a) — 1 차 차분"),         code: "[a[0], a[1]-a[0], a[2]-a[1], ..., a[N-1]-a[N-2]]",              color: "#0891b2" },
              { n: 3, label: t(E, "diff(diff(a))",                    "diff(diff(a))"),                code: "second-order difference of a",                                  color: "#7c3aed" },
              { n: 4, label: t(E, "Sum |dd[i]| → answer",              "|dd[i]| 합 → 답"),              code: "ans = sum(abs(x) for x in dd)",                                 color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass with O(1) update per position", "위치당 O(1) 업데이트로 한 번 순회")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBacteriaSections(E),
    },
  ];
}
