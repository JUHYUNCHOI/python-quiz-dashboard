import { t } from "@/components/quest/theme";

const TEAL  = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";

export function makeChapters(E) {
  return [
    /* ── 1. Problem ─────────────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "LeetCode #1480 — Running Sum of 1d Array. Given nums, return an array where output[i] = nums[0] + nums[1] + … + nums[i]. This is the simplest prefix sum problem — and the foundation for the next three.",
        "LeetCode #1480 — Running Sum of 1d Array. nums 가 주어지면 output[i] = nums[0] + nums[1] + … + nums[i] 인 배열을 반환. 가장 간단한 누적합 문제 — 다음 세 문제의 기초예요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8 }}>
              📥 {t(E, "Example", "예시")}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#1e293b", marginBottom: 4 }}>
              {t(E, "Input:  nums = [1, 2, 3, 4]", "입력:  nums = [1, 2, 3, 4]")}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: TEAL_D, fontWeight: 700 }}>
              {t(E, "Output:       [1, 3, 6, 10]", "출력:        [1, 3, 6, 10]")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["output[0]", "=", "1", ""],
              ["output[1]", "=", "1 + 2", "= 3"],
              ["output[2]", "=", "1 + 2 + 3", "= 6"],
              ["output[3]", "=", "1 + 2 + 3 + 4", "= 10"],
            ].map(([label, eq, expr, result], i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontFamily: "monospace", fontSize: 12.5 }}>
                <span style={{ color: TEAL_D, width: 80 }}>{label}</span>
                <span style={{ color: "#94a3b8" }}>{eq}</span>
                <span style={{ color: "#1e293b" }}>{expr}</span>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>{result}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    /* ── 2. Step-by-step build ───────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Watch how the running sum builds: start from index 1 and add the previous running total to the current element.",
        "누계가 쌓이는 과정: 인덱스 1 부터, 이전 누계 + 현재 원소를 더해요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 12, textAlign: "center" }}>
            nums = [1, 2, 3, 4]
          </div>
          {[
            { active: 0, vals: [1, "—", "—", "—"], note: t(E, "index 0: copy as-is → 1", "인덱스 0: 그대로 → 1") },
            { active: 1, vals: [1, 3, "—", "—"], note: t(E, "1 + 2 = 3", "1 + 2 = 3") },
            { active: 2, vals: [1, 3, 6, "—"], note: t(E, "3 + 3 = 6", "3 + 3 = 6") },
            { active: 3, vals: [1, 3, 6, 10], note: t(E, "6 + 4 = 10 ✓", "6 + 4 = 10 ✓") },
          ].map((step, si) => (
            <div key={si} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {step.vals.map((v, ci) => (
                  <div key={ci} style={{
                    width: 42, height: 38, borderRadius: 7,
                    border: `2px solid ${ci === step.active ? TEAL : "#e2e8f0"}`,
                    background: typeof v === "number" ? TEAL_L : "#f8fafc",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    fontSize: 10,
                  }}>
                    <span style={{ fontSize: 9, color: "#94a3b8" }}>[{ci}]</span>
                    <span style={{ fontWeight: 700, color: typeof v === "number" ? TEAL_D : "#cbd5e1" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: si === 3 ? TEAL_D : "#64748b", fontWeight: si === 3 ? 700 : 400 }}>
                {step.note}
              </div>
            </div>
          ))}
          <div style={{
            marginTop: 8, background: TEAL_L, borderRadius: 8, padding: "8px 12px",
            fontFamily: "monospace", fontSize: 12.5, fontWeight: 700, color: TEAL_D, textAlign: "center",
          }}>
            prefix[i] = prefix[i-1] + nums[i]
          </div>
        </div>
      ),
    },

    /* ── 3. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "nums = [3, 1, 4, 1, 5]. What is running_sum[3]?",
        "nums = [3, 1, 4, 1, 5]. running_sum[3] 은?"),
      question: t(E,
        "nums = [3, 1, 4, 1, 5]\nrunning_sum[3] = ?",
        "nums = [3, 1, 4, 1, 5]\nrunning_sum[3] = ?"),
      options: [
        "1  (just nums[3])",
        "9  (3+1+4+1)",
        "8  (3+1+4)",
        "14 (3+1+4+1+5)",
      ],
      correct: 1,
      explain: t(E,
        "running_sum[3] = nums[0]+nums[1]+nums[2]+nums[3] = 3+1+4+1 = 9. Always sum from index 0 through i.",
        "running_sum[3] = nums[0]+nums[1]+nums[2]+nums[3] = 3+1+4+1 = 9. 항상 인덱스 0 부터 i 까지 더해요."),
    },

    /* ── 4. Why it matters ───────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Once you have the prefix array, you can answer range sum queries in O(1) — without looping. That's the magic unlocked in problem #303.",
        "누적합 배열이 있으면 구간 합을 O(1) 에 — 루프 없이 — 계산할 수 있어요. 그게 #303 에서 열리는 마법이에요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>
              🔗 {t(E, "Prefix Sum Series: #1480 → #303 → #560 → #974", "누적합 시리즈: #1480 → #303 → #560 → #974")}
            </div>
            {[
              { id: "#1480", desc: t(E, "Build the prefix array (this problem)", "누적합 배열 만들기 (지금 문제)"), active: true },
              { id: "#303",  desc: t(E, "Use prefix to answer range sum in O(1)", "누적합으로 구간 합 O(1) 조회"), active: false },
              { id: "#560",  desc: t(E, "Prefix + hashmap → count subarrays", "누적합 + 해시맵 → 부분 배열 세기"), active: false },
              { id: "#974",  desc: t(E, "Same idea + modulo", "같은 아이디어 + 나머지"), active: false },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "center", padding: "4px 0",
                borderLeft: item.active ? `3px solid ${TEAL}` : "3px solid #e2e8f0",
                paddingLeft: 8, marginBottom: 4, opacity: item.active ? 1 : 0.65,
              }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: item.active ? TEAL_D : "#64748b", width: 38 }}>{item.id}</span>
                <span style={{ fontSize: 11.5, color: "#374151" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    /* ── 5. Code ─────────────────────────────────────────────── */
    {
      type: "code",
      narr: t(E,
        "In-place: walk from index 1, add the previous element. O(n) time, O(1) extra space.",
        "In-place: 인덱스 1 부터 걸으면서 이전 원소를 더해요. 시간 O(n), 추가 공간 O(1)."),
      code: [
        "def runningSum(nums: list[int]) -> list[int]:",
        "    for i in range(1, len(nums)):",
        "        nums[i] += nums[i - 1]  # accumulate",
        "    return nums",
        "",
        "# runningSum([1, 2, 3, 4])  →  [1, 3, 6, 10]",
        "# runningSum([3, 1, 4, 1])  →  [3, 4, 8, 9]",
      ],
    },
  ];
}
