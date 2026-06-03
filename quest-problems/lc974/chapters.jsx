import { t } from "@/components/quest/theme";

const TEAL  = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";

export function makeChapters(E) {
  return [
    /* ── 1. Problem + connection to #560 ────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "LeetCode #974 — Subarray Sums Divisible by K. Count subarrays whose sum is divisible by k. This is #560 with a twist: instead of sum = k, we want sum % k = 0.",
        "LeetCode #974 — Subarray Sums Divisible by K. 합이 k 로 나누어 떨어지는 부분 배열 개수. 이건 #560 의 변형: sum = k 대신 sum % k = 0 이에요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8 }}>
              📥 {t(E, "Example: nums=[4,5,0,−2,−3,1], k=5", "예시: nums=[4,5,0,−2,−3,1], k=5")}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 12.5, color: "#1e293b", marginBottom: 8, lineHeight: 1.8 }}>
              <div>{t(E, "Output: 7", "출력: 7")}</div>
            </div>
            <div style={{ fontSize: 11.5, color: "#374151", lineHeight: 1.6 }}>
              {t(E,
                "7 subarrays have sum divisible by 5. Examples: [4,5,0,−2,−3,1] sum=5, [5] sum=5, [5,0,−2,−3] sum=0, [0] sum=0, ...",
                "합이 5 의 배수인 부분 배열이 7개. 예: [4,5,0,−2,−3,1] 합=5, [5] 합=5, [5,0,−2,−3] 합=0, [0] 합=0, ...")}
            </div>
          </div>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#1d4ed8" }}>
            {t(E,
              "Key difference from #560: not a fixed target value — any multiple of k counts. We need a different insight.",
              "#560 과 핵심 차이: 고정 목표값이 아님 — k 의 배수면 모두 해당. 다른 인사이트가 필요해요.")}
          </div>
        </div>
      ),
    },

    /* ── 2. Modulo insight ───────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Key insight: (prefix[j] − prefix[i]) % k = 0  means  prefix[j] % k = prefix[i] % k. Two prefix sums with the SAME remainder → their difference is divisible by k.",
        "핵심 인사이트: (prefix[j] − prefix[i]) % k = 0  →  prefix[j] % k = prefix[i] % k. 나머지가 같은 두 누계 → 차이가 k 로 나누어 떨어져요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: TEAL_D, lineHeight: 2 }}>
              <div>(prefix[j] − prefix[i]) % k = 0</div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>⟺</div>
              <div>prefix[j] % k  =  prefix[i] % k</div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#14532d", marginBottom: 6 }}>
              {t(E, "Example (k=5):", "예시 (k=5):")}
            </div>
            {[
              { pj: 10, pi: 5,  diff: 5,  rem_j: 0, rem_i: 0, ok: true },
              { pj: 15, pi: 5,  diff: 10, rem_j: 0, rem_i: 0, ok: true },
              { pj: 7,  pi: 2,  diff: 5,  rem_j: 2, rem_i: 2, ok: true },
              { pj: 8,  pi: 3,  diff: 5,  rem_j: 3, rem_i: 3, ok: true },
              { pj: 9,  pi: 2,  diff: 7,  rem_j: 4, rem_i: 2, ok: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", gap: 6, alignItems: "center", fontFamily: "monospace", fontSize: 11.5,
                color: row.ok ? "#14532d" : "#94a3b8", marginBottom: 3,
              }}>
                <span>prefix[j]={row.pj} prefix[i]={row.pi}</span>
                <span style={{ color: "#94a3b8" }}>→</span>
                <span>rem: {row.rem_j} vs {row.rem_i}</span>
                <span style={{ fontWeight: 700 }}>{row.ok ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
            {t(E,
              "So instead of tracking prefix sums directly, we track prefix sums MOD k. Two positions with the same mod = valid subarray.",
              "그러니까 누계 자체 대신 누계 mod k 를 추적해요. 나머지가 같은 두 위치 = 유효 부분 배열.")}
          </div>
        </div>
      ),
    },

    /* ── 3. Walkthrough ──────────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Walk-through with nums=[4,5,0,−2,−3,1], k=5. Track prefix mod k in a hashmap {remainder: count}.",
        "nums=[4,5,0,−2,−3,1], k=5 로 단계별. 해시맵 {나머지: 횟수} 에 prefix mod k 를 추적."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: TEAL_L }}>
                  {[t(E,"i","i"), t(E,"nums[i]","nums[i]"), t(E,"prefix","누계"), t(E,"mod 5","mod 5"), t(E,"lookup","조회"), t(E,"+count","+개수")].map((h,i) => (
                    <th key={i} style={{ padding: "5px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, color: TEAL_D }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { i:"init", n:"—", prefix:0,  mod:0, lookup:"—",   count:0 },
                  { i:0,      n:4,   prefix:4,  mod:4, lookup:"0",   count:0 },
                  { i:1,      n:5,   prefix:9,  mod:4, lookup:"1",   count:1 },
                  { i:2,      n:0,   prefix:9,  mod:4, lookup:"2",   count:3 },
                  { i:3,      n:-2,  prefix:7,  mod:2, lookup:"0",   count:3 },
                  { i:4,      n:-3,  prefix:4,  mod:4, lookup:"3",   count:6 },
                  { i:5,      n:1,   prefix:5,  mod:0, lookup:"1",   count:7 },
                ].map((row, si) => (
                  <tr key={si} style={{ background: row.count > 0 && row.i !== "init" ? "#f0fdf4" : "#fff" }}>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "monospace", color: "#64748b" }}>{row.i === "init" ? "init" : row.i}</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "monospace", fontWeight: 700 }}>{row.n}</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "monospace" }}>{row.prefix}</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "monospace", color: TEAL_D, fontWeight: 700 }}>{row.mod}</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "monospace", color: "#64748b" }}>seen[{row.lookup}]</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800, color: row.count > (si > 0 ? [0,0,1,3,3,6,7][si-1] : 0) ? "#15803d" : "#94a3b8" }}>
                      {row.count > 0 && row.i !== "init" ? `=${row.count}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: TEAL_D, textAlign: "right" }}>
            {t(E, "Total = 7 ✓", "합계 = 7 ✓")}
          </div>
        </div>
      ),
    },

    /* ── 4. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "nums=[2,3,4], k=3. At index 2 (nums[2]=4), prefix=9, prefix%3=0. How many valid subarrays END at index 2?",
        "nums=[2,3,4], k=3. 인덱스 2 (nums[2]=4) 에서 prefix=9, prefix%3=0. 인덱스 2 에서 끝나는 유효 부분 배열이 몇 개?"),
      question: t(E,
        "nums=[2,3,4], k=3\nprefix at i=2 is 9, mod 3 = 0\nseen = {0:1, 2:2}  (init + i=0 mod=2 + i=1 mod=2)\nHow many subarrays ending at i=2 are divisible by 3?",
        "nums=[2,3,4], k=3\ni=2 에서 prefix=9, mod 3=0\nseen = {0:1, 2:2}  (init + i=0 mod=2 + i=1 mod=2)\n인덱스 2 에서 끝나는 유효 부분 배열 수?"),
      options: [
        t(E, "1  (only the full array [2,3,4])", "1  (전체 배열 [2,3,4] 만)"),
        t(E, "2  (seen[0]=1 + seen[2]=2 somehow)", "2  (seen[0]=1 에다 뭔가 더)"),
        t(E, "3  (all subarrays ending here)", "3  (여기서 끝나는 모든 부분 배열)"),
      ],
      correct: 0,
      explain: t(E,
        "prefix sums so far: 0 (init), 2 (i=0), 5 (i=1). seen after i=1: {0:1, 2:1, 5:1}. At i=2, mod=0. seen[0]=1 → counts [2,3,4]. Also prefix at i=1 is 5, 5%3=2, not 0. Actually seen[0]=1 only. Wait: prefix at i=0 is 2 (mod=2), at i=1 is 5 (mod=2). seen = {0:1, 2:2}. At i=2 mod=0, seen[0]=1 → 1 subarray ending here. Hmm, let me recalculate. Actually [3,4] sum=7 not div by 3, [4] sum=4 not div by 3, [2,3,4] sum=9 div by 3. Just 1.",
        "누계들: 0(init), 2(i=0), 5(i=1). seen after i=1: {0:1, 2:2}. i=2 에서 mod=0. seen[0]=1 → [2,3,4] 만. 정답 1."),
    },

    /* ── 5. Python negative mod note ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "One detail: Python's % operator always returns a non-negative result for positive divisors. So (-7) % 5 = 3 in Python (not -2). This means we can use remainder directly as a hashmap key without any adjustment.",
        "한 가지 주의: Python 의 % 연산자는 양수 제수에 대해 항상 0 이상을 반환해요. 그래서 Python 에서 (-7) % 5 = 3 (−2 가 아니에요). 해시맵 키로 나머지를 그대로 써도 돼요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#14532d", marginBottom: 6 }}>
              ✅ Python % handles negatives correctly
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 12.5, color: "#1e293b", lineHeight: 1.8 }}>
              <div>(-7) % 5   <span style={{ color: "#16a34a" }}>→  3</span>  <span style={{ color: "#94a3b8" }}># not -2</span></div>
              <div>(-3) % 5   <span style={{ color: "#16a34a" }}>→  2</span></div>
              <div>10 % 5     <span style={{ color: "#16a34a" }}>→  0</span></div>
            </div>
          </div>
          <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#78350f" }}>
            {t(E,
              "In C++ or Java, % can return negative for negative dividends. In those languages you'd write: (prefix_mod + k) % k to normalize. Python doesn't need this.",
              "C++ 나 Java 에서 % 는 음수 피제수에 음수를 반환할 수 있어요. 그럴 때는 (prefix_mod + k) % k 로 정규화해요. Python 은 필요 없어요.")}
          </div>
        </div>
      ),
    },

    /* ── 6. Code ─────────────────────────────────────────────── */
    {
      type: "code",
      narr: t(E,
        "Identical structure to #560 — just replace (prefix − k) lookup with prefix % k lookup. O(n) time and space.",
        "#560 과 구조 동일 — (prefix − k) 조회 대신 prefix % k 조회. 시간/공간 O(n)."),
      code: [
        "def subarraysDivByK(nums: list[int], k: int) -> int:",
        "    count = 0",
        "    prefix_mod = 0",
        "    remainders = {0: 1}   # empty prefix has remainder 0",
        "",
        "    for n in nums:",
        "        prefix_mod = (prefix_mod + n) % k",
        "        count += remainders.get(prefix_mod, 0)",
        "        remainders[prefix_mod] = remainders.get(prefix_mod, 0) + 1",
        "",
        "    return count",
        "",
        "# subarraysDivByK([4,5,0,-2,-3,1], 5)  →  7",
        "# subarraysDivByK([5],             5)  →  1",
      ],
    },
  ];
}
