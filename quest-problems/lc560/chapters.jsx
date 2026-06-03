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
        "LeetCode #560 — Subarray Sum Equals K. Count the number of subarrays (contiguous) with sum exactly equal to k.",
        "LeetCode #560 — Subarray Sum Equals K. 합이 정확히 k 인 연속 부분 배열의 개수를 세세요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8 }}>
              📥 {t(E, "Example: nums=[1,1,1], k=2", "예시: nums=[1,1,1], k=2")}
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
              {[1,1,1].map((v,i) => (
                <div key={i} style={{
                  width: 40, height: 40, borderRadius: 8,
                  border: `2px solid ${TEAL}`, background: "#fff",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>[{i}]</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEAL_D }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { label: "nums[0..1]", sum: 2, ok: true },
                { label: "nums[1..2]", sum: 2, ok: true },
                { label: "nums[0..2]", sum: 3, ok: false },
                { label: "nums[0..0]", sum: 1, ok: false },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.ok ? "#f0fdf4" : "#f8fafc",
                  border: `1px solid ${item.ok ? "#86efac" : "#e2e8f0"}`,
                  borderRadius: 6, padding: "5px 8px", textAlign: "center", fontSize: 11.5,
                }}>
                  <span style={{ fontFamily: "monospace", color: "#374151" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: item.ok ? "#15803d" : "#94a3b8", marginLeft: 6 }}>
                    sum={item.sum} {item.ok ? "✓" : "✗"}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 13, color: TEAL_D, textAlign: "center" }}>
              {t(E, "Answer: 2", "정답: 2")}
            </div>
          </div>
        </div>
      ),
    },

    /* ── 2. Brute force: O(n²) ───────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Brute force: try every (i, j) pair. For each starting index i, extend j to the right and check the sum. O(n²) — with n=2×10^4, that's 4×10^8 operations. TLE.",
        "완전탐색: 모든 (i, j) 쌍 시도. 시작 인덱스 i 마다 j 를 오른쪽으로 늘리며 합 확인. O(n²) — n=2×10^4 이면 4×10^8 연산. 시간 초과."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#1e293b", lineHeight: 1.8 }}>
              <div>{"for i in range(len(nums)):  # start"}</div>
              <div>{"    total = 0"}</div>
              <div>{"    for j in range(i, len(nums)):  # end"}</div>
              <div>{"        total += nums[j]"}</div>
              <div>{"        if total == k:"}</div>
              <div>{"            count += 1"}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "Every possible subarray: n*(n+1)/2 pairs. For n=20,000 that's ~200 million iterations. Way too slow.",
              "가능한 모든 부분 배열: n*(n+1)/2 쌍. n=20,000 이면 약 2억 번 반복. 너무 느려요.")}
          </div>
        </div>
      ),
    },

    /* ── 3. Prefix sum angle ──────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Think with prefix sums. The sum of nums[i..j] = prefix[j+1] − prefix[i]. We need this difference to equal k. Rearranged: prefix[i] = prefix[j+1] − k.",
        "누적합으로 생각해요. nums[i..j] 의 합 = prefix[j+1] − prefix[i]. 이 차이가 k 여야 해요. 바꾸면: prefix[i] = prefix[j+1] − k."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8, textAlign: "center" }}>
              {t(E, "Key rewrite", "핵심 변환")}
            </div>
            {[
              { label: t(E, "Original goal:", "원래 목표:"), formula: "prefix[j+1] − prefix[i]  =  k" },
              { label: t(E, "Rearranged:", "변환하면:"), formula: "prefix[i]  =  prefix[j+1] − k" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: "#374151", width: 80, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: TEAL_D }}>{row.formula}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "As we walk forward accumulating the prefix sum, at each position j+1 we ask: \"How many previous positions i have prefix[i] = current_prefix − k?\" That count is the number of valid subarrays ending at j.",
              "앞에서 뒤로 누계를 쌓으면서, 매 위치 j+1 에서 묻는 거예요: \"이전 위치 중 prefix[i] = 현재누계 − k 인 게 몇 개?\" 그 수가 j 에서 끝나는 유효 부분 배열 개수.")}
          </div>
        </div>
      ),
    },

    /* ── 4. Hashmap walkthrough ───────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Use a hashmap to count how many times each prefix sum has appeared so far. Walk left to right: at each step, add seen[prefix − k] to the answer, then record the current prefix.",
        "해시맵으로 지금까지 각 누계가 몇 번 등장했는지 세요. 왼→오른쪽으로 걸으며: 매 스텝에서 seen[현재누계 − k] 를 정답에 더하고, 현재 누계를 기록."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
            {t(E, "nums=[1,1,1], k=2 — step by step:", "nums=[1,1,1], k=2 — 단계별:")}
          </div>
          {[
            { i: "init",  prefix: 0,  lookup: "—",   found: 0, count: 0, seen: "{0:1}" },
            { i: 0,       prefix: 1,  lookup: "1−2=−1", found: 0, count: 0, seen: "{0:1, 1:1}" },
            { i: 1,       prefix: 2,  lookup: "2−2=0",  found: 1, count: 1, seen: "{0:1, 1:1, 2:1}" },
            { i: 2,       prefix: 3,  lookup: "3−2=1",  found: 1, count: 2, seen: "{0:1, 1:1, 2:1, 3:1}" },
          ].map((step, si) => (
            <div key={si} style={{
              display: "grid", gridTemplateColumns: "40px 1fr 1fr 40px",
              gap: 4, alignItems: "center", marginBottom: 6,
              padding: "6px 8px", borderRadius: 7,
              background: step.found > 0 ? "#f0fdf4" : "#f8fafc",
              border: `1px solid ${step.found > 0 ? "#86efac" : "#e2e8f0"}`,
              fontSize: 11,
            }}>
              <span style={{ fontFamily: "monospace", color: "#64748b", textAlign: "center" }}>
                {step.i === "init" ? "init" : `[${step.i}]`}
              </span>
              <span style={{ fontFamily: "monospace", color: "#374151" }}>
                prefix={step.prefix}  look:{step.lookup}
              </span>
              <span style={{ fontFamily: "monospace", color: "#64748b", fontSize: 10 }}>
                {step.seen}
              </span>
              <span style={{ fontWeight: 700, color: step.found > 0 ? "#15803d" : "#94a3b8", textAlign: "right" }}>
                +{step.found}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: TEAL_D, textAlign: "right" }}>
            {t(E, "Total count = 2 ✓", "총 개수 = 2 ✓")}
          </div>
        </div>
      ),
    },

    /* ── 5. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "In the walkthrough, we initialize seen = {0: 1}. Why start with a count of 1 for prefix sum 0?",
        "단계별에서 seen = {0: 1} 로 초기화해요. 왜 누계 0 의 개수를 1 로 시작할까요?"),
      question: t(E,
        "Why initialize seen = {0: 1} before walking the array?",
        "왜 배열 걷기 전에 seen = {0: 1} 로 초기화할까요?"),
      options: [
        t(E,
          "It represents the empty prefix (index 0, before any elements). If nums[0..j] itself sums to k, we need to count it.",
          "빈 누계(인덱스 0, 원소 없음)를 나타내요. nums[0..j] 자체가 k 이면 그것도 세야 해요."),
        t(E,
          "It's a placeholder — remove it and the code still works.",
          "자리 채우기용 — 빼도 코드가 작동해요."),
        t(E,
          "It accounts for k=0 edge case only.",
          "k=0 예외 상황만을 위한 거예요."),
      ],
      correct: 0,
      explain: t(E,
        "prefix starts at 0. If at some index j we have prefix = k, then prefix − k = 0, and seen[0] = 1 counts the subarray nums[0..j]. Without {0:1}, subarrays starting at index 0 would be missed.",
        "누계는 0 에서 시작. 인덱스 j 에서 누계 = k 면, 누계 − k = 0 이고, seen[0] = 1 은 nums[0..j] 부분 배열을 세요. {0:1} 없으면 인덱스 0 부터 시작하는 부분 배열들을 놓쳐요."),
    },

    /* ── 6. Code ─────────────────────────────────────────────── */
    {
      type: "code",
      narr: t(E,
        "One pass, O(n) time and space. The hashmap replaces the inner loop entirely.",
        "한 번 스캔, 시간/공간 O(n). 해시맵이 내부 루프를 완전히 대체해요."),
      code: [
        "def subarraySum(nums: list[int], k: int) -> int:",
        "    count = 0",
        "    prefix = 0",
        "    seen = {0: 1}          # empty prefix seen once",
        "",
        "    for n in nums:",
        "        prefix += n",
        "        count += seen.get(prefix - k, 0)   # how many valid i's?",
        "        seen[prefix] = seen.get(prefix, 0) + 1",
        "",
        "    return count",
        "",
        "# subarraySum([1, 1, 1], 2)  →  2",
        "# subarraySum([1, 2, 3], 3)  →  2  (subarrays [1,2] and [3])",
      ],
    },
  ];
}
