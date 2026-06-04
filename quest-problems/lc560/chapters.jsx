import { t } from "@/components/quest/theme";
import { SubarraySumSim, SpeedRaceSim, CodeJourney } from "./components";

const TEAL  = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";

export function makeChapters(E) {
  return [
    /* ── 1. Problem (observe) ────────────────────────────────── */
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
            <div style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginBottom: 6 }}>
              {t(E, "Check every contiguous slice — all 6 of them:", "연속 구간을 전부 확인 — 총 6개:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {[
                { from: 0, to: 0, sum: 1 },
                { from: 1, to: 1, sum: 1 },
                { from: 2, to: 2, sum: 1 },
                { from: 0, to: 1, sum: 2 },
                { from: 1, to: 2, sum: 2 },
                { from: 0, to: 2, sum: 3 },
              ].map((item, i) => {
                const ok = item.sum === 2;
                return (
                  <div key={i} style={{
                    background: ok ? "#f0fdf4" : "#f8fafc",
                    border: `1px solid ${ok ? "#86efac" : "#e2e8f0"}`,
                    borderRadius: 6, padding: "5px 8px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
                  }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[0,1,2].map(j => {
                        const inRange = j >= item.from && j <= item.to;
                        return (
                          <div key={j} style={{
                            width: 18, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: inRange ? TEAL : "#fff",
                            color: inRange ? "#fff" : "#cbd5e1",
                            border: `1px solid ${inRange ? TEAL : "#e2e8f0"}`,
                          }}>1</div>
                        );
                      })}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 11.5, color: ok ? "#15803d" : "#94a3b8" }}>
                      ={item.sum} {ok ? "✓" : "✗"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 13, color: TEAL_D, textAlign: "center" }}>
              {t(E, "2 of the 6 sum to 2  →  Answer: 2", "6개 중 합이 2인 건 2개  →  정답: 2")}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "\"Subarray\" = contiguous slice. We count HOW MANY have sum exactly k (numbers may be negative). Constraint: up to n = 20,000 numbers.",
              "\"부분 배열(subarray)\"은 연속 구간이에요. 합이 정확히 k 인 게 몇 개인지 세요 (숫자는 음수일 수도 있어요). 제약: 숫자는 최대 n = 20,000 개.")}
          </div>
        </div>
      ),
    },

    /* ── 2. First idea: brute (progressive code) ─────────────── */
    {
      type: "reveal",
      narr: t(E,
        "First, the natural idea: try every starting index. From each start, add numbers to the right one by one, and every time the running total hits k, count it. Check them all.",
        "먼저, 자연스러운 방법: 모든 시작 인덱스를 다 해보자. 각 시작점에서 오른쪽으로 숫자를 하나씩 더하다가, 누적합이 k 가 될 때마다 카운트. 전부 확인해요."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "Try every start", "모든 시작점 시도"),
              color: TEAL,
              why: [
                t(E, "count holds how many subarrays sum to k.", "count 에 합이 k 인 부분 배열 개수를 보관."),
                t(E, "For each start i, total begins at 0.", "각 시작점 i 에서 total 을 0 부터 시작."),
              ],
              cppOnly: [t(E, "total is long long — a sum can overflow int.", "total 은 long long — 합이 int 범위를 넘을 수 있어요.")],
              py: [
                "count = 0",
                "for i in range(len(nums)):      # subarray start",
                "    total = 0",
              ],
              cpp: [
                "int count = 0, n = nums.size();",
                "for (int i = 0; i < n; i++) {       // subarray start",
                "    long long total = 0;",
              ],
            },
            {
              label: t(E, "Extend the end, add as you go", "끝을 늘리며 합 누적"),
              color: TEAL,
              why: [
                t(E, "Push the end j forward, adding nums[j] to total.", "끝 j 를 앞으로 밀며 nums[j] 를 total 에 더함."),
                t(E, "Every time total equals k, that's one more subarray.", "total 이 k 가 되는 순간마다 부분 배열 하나 추가."),
              ],
              py: [
                "    for j in range(i, len(nums)):   # subarray end",
                "        total += nums[j]",
                "        if total == k:",
                "            count += 1",
                "",
                "# count is the answer",
              ],
              cpp: [
                "    for (int j = i; j < n; j++) {       // subarray end",
                "        total += nums[j];",
                "        if (total == k) count++;",
                "    }",
                "}",
                "// count is the answer",
              ],
            },
          ]}
          doneNote={t(E, "✓ Correct — it checks every (start, end) pair.", "✓ 정답은 맞아요 — 모든 (시작, 끝) 쌍을 확인해요.")}
        />
      ),
    },

    /* ── 3. Felt limit (interactive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Fine on [1,1,1]. But the array can hold 20,000 numbers. \"Every start × every end\" is about n²/2 steps. Drag the slider — how slow does brute get on a big input?",
        "[1,1,1] 에선 잘 돼요. 그런데 배열에 숫자가 2만 개까지 들어갈 수 있어요. \"모든 시작 × 모든 끝\" 은 약 n²/2 번. 슬라이더를 끌어보세요 — 큰 입력에서 완전탐색은 얼마나 느려질까요?"),
      content: <SpeedRaceSim E={E} nMax={20000} nStart={200} constraintN={20000} />,
    },

    /* ── 4. Insight setup: prefix-sum rewrite ────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "The escape: prefix sums. The sum of nums[i..j] = prefix[j+1] − prefix[i]. We need that to equal k. Rearranged: prefix[i] = prefix[j+1] − k. So as we walk, the question becomes \"how many earlier prefix sums equal current − k?\"",
        "탈출구: 누적합(prefix sum). nums[i..j] 의 합 = prefix[j+1] − prefix[i]. 이게 k 여야 해요. 바꾸면: prefix[i] = prefix[j+1] − k. 그래서 앞으로 걸으며 묻는 건 \"이전 누적합 중 현재 − k 인 게 몇 개?\" 가 돼요."),
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
              "If we keep a tally of how many times each prefix sum has appeared, that \"how many earlier i\" answer is instant — one dictionary lookup. No inner loop. That's the flat green bar from the speed slider.",
              "각 누적합이 몇 번 나왔는지 출석부(딕셔너리)에 적어두면, \"이전 i 가 몇 개?\" 답이 즉시 나와요 — 딕셔너리 한 번 조회. 내부 루프가 사라져요. 속도 슬라이더에서 평평하던 초록 막대가 바로 이거예요.")}
          </div>
        </div>
      ),
    },

    /* ── 5. Discover: step through it ────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Now trace it one step at a time. Press \"Next step\": watch the running prefix sum, the partner we look up (prefix − k), the seen tally, and the answer growing. Then try the negatives case — that's where counting (not a yes/no set) matters.",
        "이제 한 스텝씩 직접 따라가 봐요. \"다음 스텝\" 을 누르며: 누계(prefix), 찾는 짝(prefix − k), 출석부(seen), 그리고 정답이 커지는 걸 보세요. 그다음 음수 케이스도 눌러봐요 — 거기서 \"있다/없다\" 가 아니라 \"횟수\" 를 세야 하는 이유가 드러나요."),
      content: <SubarraySumSim E={E} />,
    },

    /* ── 6. Quiz ─────────────────────────────────────────────── */
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

    /* ── 7. Final code (progressive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "One pass, O(n) time and space. The dictionary replaces the inner loop entirely.",
        "한 번 스캔, 시간/공간 O(n). 딕셔너리가 내부 루프를 완전히 대체해요."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "1. Setup", "1. 준비"),
              color: TEAL,
              why: [
                t(E, "prefix: running sum as we walk.", "prefix: 걸으며 쌓는 누적합."),
                t(E, "seen: how many times each prefix sum has appeared.", "seen: 각 누적합이 몇 번 나왔는지."),
                t(E, "{0: 1}: the empty prefix (before any element) counts once.", "{0: 1}: 빈 누계(원소 0개)를 1 번으로 시작."),
              ],
              cppOnly: [t(E, "prefix is long long to avoid overflow.", "prefix 는 오버플로 방지로 long long.")],
              py: [
                "def subarraySum(nums: list[int], k: int) -> int:",
                "    count = 0",
                "    prefix = 0",
                "    seen = {0: 1}      # empty prefix seen once",
              ],
              cpp: [
                "int subarraySum(vector<int>& nums, int k) {",
                "    unordered_map<long long,int> seen;",
                "    seen[0] = 1;            // empty prefix",
                "    long long prefix = 0;",
                "    int count = 0;",
              ],
            },
            {
              label: t(E, "2. Walk & look up the partner", "2. 걸으며 짝을 조회"),
              color: TEAL,
              why: [
                t(E, "Add each number to prefix.", "각 숫자를 prefix 에 더함."),
                t(E, "prefix − k is the partner: how many earlier prefixes equal it = subarrays ending here with sum k.", "prefix − k 가 짝: 이전 누계 중 이 값이 몇 개 = 여기서 끝나는 합 k 부분 배열 개수."),
              ],
              pyOnly: [t(E, "seen.get(key, 0) returns 0 when the key is absent.", "seen.get(key, 0) 은 키가 없으면 0 반환.")],
              cppOnly: [t(E, "Check seen.count first — reading a missing key would insert a 0.", "seen.count 로 먼저 확인 — 없는 키를 읽으면 0 이 삽입돼요.")],
              py: [
                "    for x in nums:",
                "        prefix += x",
                "        count += seen.get(prefix - k, 0)",
              ],
              cpp: [
                "    for (int x : nums) {",
                "        prefix += x;",
                "        if (seen.count(prefix - k))",
                "            count += seen[prefix - k];",
              ],
            },
            {
              label: t(E, "3. Record & return", "3. 기록하고 반환"),
              color: TEAL,
              why: [
                t(E, "Bump this prefix sum's tally by one.", "이 누적합의 횟수를 1 증가."),
                t(E, "After the pass, count is the answer.", "끝까지 돌면 count 가 정답."),
              ],
              py: [
                "        seen[prefix] = seen.get(prefix, 0) + 1",
                "",
                "    return count",
              ],
              cpp: [
                "        seen[prefix]++;",
                "    }",
                "    return count;",
                "}",
              ],
            },
          ]}
          doneNote={t(E, "O(n) time & space. [1,1,1],k=2 → 2; [1,2,3],k=3 → 2.", "시간·공간 O(n). [1,1,1],k=2 → 2; [1,2,3],k=3 → 2.")}
        />
      ),
    },
  ];
}
