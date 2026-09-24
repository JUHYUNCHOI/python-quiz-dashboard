import { t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const TEAL  = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";

export function makeChapters(E) {
  return [
    /* ── 1. Problem ─────────────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Answer up to 10^4 sumRange(left, right) queries fast on an array that never changes.",
        "안 바뀌는 배열에서 구간 합을 1만 번 빠르게 답해야 해요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8 }}>
              📥 {t(E, "Example", "예시")}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 12.5, color: "#1e293b", lineHeight: 1.8 }}>
              <div>obj = NumArray([-2, 0, 3, -5, 2, -1])</div>
              <div>obj.sumRange(0, 2)  <span style={{ color: "#16a34a", fontWeight: 700 }}>→ 1</span>  <span style={{ color: "#94a3b8", fontSize: 11 }}># -2+0+3</span></div>
              <div>obj.sumRange(2, 5)  <span style={{ color: "#16a34a", fontWeight: 700 }}>→ -1</span>  <span style={{ color: "#94a3b8", fontSize: 11 }}># 3+(-5)+2+(-1)</span></div>
              <div>obj.sumRange(0, 5)  <span style={{ color: "#16a34a", fontWeight: 700 }}>→ -3</span>  <span style={{ color: "#94a3b8", fontSize: 11 }}># full array</span></div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#991b1b" }}>
            {t(E,
              "Constraints: array size up to 10^4, up to 10^4 queries. A naive O(n) loop per query = 10^8 ops → too slow.",
              "배열 크기는 최대 10^4 이고, 물음도 최대 10^4 번이에요. 물음마다 처음부터 하나씩 더하면 10^8 번 계산이라 너무 느려요.")}
          </div>
        </div>
      ),
    },

    /* ── 2. Naive approach ───────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Naive approach: for each query, loop from left to right and sum. Works, but O(n) per query. With many queries on a large array, this will time-limit.",
        "물음마다 left 부터 right 까지 하나씩 더하면 어떨까요?"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 10,
            padding: "10px 14px", marginBottom: 12,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
              🐢 {t(E, "Naive: O(n) per query", "단순한 방법: 물음마다 O(n)")}
            </div>
            <CodeBlock lang="py" isEn={E} lines={[
              "def sumRange(self, left, right):",
              "    total = 0",
              "    for i in range(left, right + 1):",
              "        total += self.nums[i]",
              "    return total",
            ]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "#fef2f2", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#991b1b" }}>😞 {t(E, "Problem", "문제")}</div>
              <div style={{ fontSize: 11, color: "#7f1d1d", marginTop: 4, lineHeight: 1.5 }}>
                {t(E, "10^4 queries × O(n) = 10^8 ops. TLE.", "물음 10^4 번 × O(n) = 10^8 번 계산이라 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#14532d" }}>💡 {t(E, "Goal", "목표")}</div>
              <div style={{ fontSize: 11, color: "#14532d", marginTop: 4, lineHeight: 1.5 }}>
                {t(E, "O(1) per query. Preprocess once.", "미리 한 번만 준비해서 물음마다 O(1) 로 답해요.")}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    /* ── 3. Prefix array ─────────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Key idea: build a prefix array ONCE in __init__. prefix[i] = sum of nums[0..i-1]. Then any range sum is just two lookups.",
        "__init__ 에서 누적합 배열을 딱 한 번만 만들어 둬요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
            {t(E, "nums = [-2, 0, 3, -5, 2, -1]", "nums = [-2, 0, 3, -5, 2, -1]")}
          </div>

          {/* prefix array visual */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>
              {t(E, "prefix[] (length n+1, starts with 0):", "prefix[] (길이 n+1, 0 으로 시작):")}
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {[0, -2, -2, 1, -4, -2, -3].map((v, i) => (
                <div key={i} style={{
                  width: 42, height: 48, borderRadius: 7,
                  border: `2px solid ${TEAL}`,
                  background: TEAL_L,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>[{i}]</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TEAL_D }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 4 }}>
              {t(E, "prefix[0]=0  prefix[1]=-2  prefix[2]=-2  prefix[3]=1 ...", "prefix[0]=0  prefix[1]=-2  prefix[2]=-2  prefix[3]=1 ...")}
            </div>
          </div>

          <div style={{
            background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10,
            padding: "10px 14px", textAlign: "center",
          }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: TEAL_D, marginBottom: 4 }}>
              prefix[i] = prefix[i-1] + nums[i-1]
            </div>
            <div style={{ fontSize: 11.5, color: TEAL_D }}>
              {t(E, "prefix[i] holds the sum of nums[0..i-1]", "prefix[i] 는 nums[0..i-1] 의 합을 담고 있어요")}
            </div>
          </div>
        </div>
      ),
    },

    /* ── 4. Formula visual ───────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "The magic formula: sumRange(l, r) = prefix[r+1] - prefix[l]. Why? prefix[r+1] covers 0..r, prefix[l] covers 0..l-1. Their difference is exactly l..r.",
        "큰 덩어리에서 앞 덩어리를 빼면 원하는 구간만 남아요."),
      content: (
        <div style={{ padding: 14 }}>
          {/* Subtraction diagram */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <svg width="300" height="100" viewBox="0 0 300 100">
              {/* Full bar: 0..r */}
              <rect x="10" y="15" width="280" height="22" rx="5" fill={TEAL_L} stroke={TEAL} strokeWidth="2" />
              <text x="150" y="31" textAnchor="middle" fontSize="11" fontWeight="700" fill={TEAL_D}>prefix[r+1] = sum(0 .. r)</text>

              {/* Left bar: 0..l-1 */}
              <rect x="10" y="58" width="100" height="22" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <text x="60" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">prefix[l]</text>

              {/* Remainder bar */}
              <rect x="110" y="58" width="180" height="22" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="200" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">sum(l .. r)</text>

              {/* minus sign */}
              <text x="4" y="75" fontSize="14" fontWeight="800" fill="#374151">−</text>
            </svg>
          </div>

          <div style={{
            background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 10,
            padding: "10px 14px", marginBottom: 10, textAlign: "center",
          }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 800, color: "#14532d" }}>
              sumRange(l, r) = prefix[r+1] − prefix[l]
            </div>
          </div>

          {/* Worked example */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 12.5 }}>
            <div style={{ fontWeight: 700, color: "#374151", marginBottom: 6 }}>
              {t(E, "sumRange(0, 2) on [-2, 0, 3, -5, 2, -1]:", "sumRange(0, 2) — [-2, 0, 3, -5, 2, -1] 에서:")}
            </div>
            <div style={{ fontFamily: "monospace", color: "#1e293b", lineHeight: 1.8 }}>
              <div>prefix[3] − prefix[0]</div>
              <div>= 1 − 0</div>
              <div style={{ color: "#16a34a", fontWeight: 700 }}>= 1 ✓  {t(E, "(−2+0+3=1)", "(−2+0+3=1)")}</div>
            </div>
          </div>
        </div>
      ),
    },

    /* ── 5. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "Using the prefix below, what is sumRange(1, 3)?",
        "아래 prefix 로 sumRange(1, 3) 을 구해 볼까요?"),
      question: t(E,
        "nums = [1, 2, 3, 4, 5]\nprefix = [0, 1, 3, 6, 10, 15]\nsumRange(1, 3) = ?",
        "nums = [1, 2, 3, 4, 5]\nprefix = [0, 1, 3, 6, 10, 15]\nsumRange(1, 3) = ?"),
      options: [
        t(E, "9  (prefix[4] − prefix[1] = 10−1)", "9  (prefix[4] − prefix[1] = 10−1)"),
        t(E, "6  (just prefix[3])", "6  (prefix[3] 그대로)"),
        t(E, "12 (calculation error)", "12 (계산 오류)"),
      ],
      correct: 0,
      explain: t(E,
        "sumRange(1,3) = prefix[3+1] − prefix[1] = prefix[4] − prefix[1] = 10 − 1 = 9. Check: 2+3+4 = 9 ✓",
        "sumRange(1,3) = prefix[3+1] − prefix[1] = prefix[4] − prefix[1] = 10 − 1 = 9. 직접 더해 봐도 2+3+4 = 9 로 같아요 ✓"),
    },

    /* ── 6. Code ─────────────────────────────────────────────── */
    {
      type: "code",
      narr: t(E,
        "Build prefix once in __init__, then each sumRange is O(1). Total: O(n) init + O(1) per query.",
        "prefix 를 한 번 만들어 두면 sumRange 는 O(1) 이에요."),
      code: [
        "class NumArray:",
        "    def __init__(self, nums: list[int]):",
        "        # prefix[i] 는 nums[0..i-1] 의 합이에요",
        "        self.prefix = [0]",
        "        for n in nums:",
        "            self.prefix.append(self.prefix[-1] + n)",
        "",
        "    def sumRange(self, left: int, right: int) -> int:",
        "        return self.prefix[right + 1] - self.prefix[left]",
        "",
        "# 예시:",
        "# obj = NumArray([-2, 0, 3, -5, 2, -1])",
        "# obj.sumRange(0, 2)  →  1   (O(1) 로 바로 찾아요!)",
        "# obj.sumRange(2, 5)  →  -1",
      ],
    },
  ];
}
