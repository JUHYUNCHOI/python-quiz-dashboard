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
              "A \"subarray\" is one unbroken stretch — you can't skip the middle. Count how many stretches add up to exactly k. The numbers can be negative, and there can be up to 20,000 of them.",
              "\"부분 배열\"은 붙어 있는 한 토막이에요 — 중간을 건너뛰면 안 돼요. 그 토막의 합이 딱 k 인 게 몇 개인지 세요. 숫자는 음수도 나올 수 있고, 최대 2만 개까지 들어와요.")}
          </div>
        </div>
      ),
    },

    /* ── 2. First idea: brute (progressive code) ─────────────── */
    {
      type: "reveal",
      narr: t(E,
        "First, the idea anyone would try: pick a start, then add numbers to the right one at a time. Every time the running sum lands exactly on k, count one. Move the start over and do it all again.",
        "가장 먼저 떠오르는 방법부터. 시작 칸을 하나 정하고, 거기서 오른쪽으로 숫자를 하나씩 더해 가요. 더한 값이 딱 k 가 되면 하나 세고요. 시작 칸을 옆으로 옮겨가며 전부 다시 해봐요."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "Brute force — every start × every end", "완전탐색 — 모든 시작 × 모든 끝"),
              color: TEAL,
              why: [
                t(E, "count is the variable that counts the answer — bump it up by one each time we find a slice that sums to k.", "count 는 답 개수를 세는 변수예요 — 합이 k 인 토막을 찾을 때마다 1 늘려요."),
                t(E, "For each start i, set total to 0. Then move the end j right, adding nums[j] as you go.", "시작 칸 i 마다 total 을 0 으로 두고, 끝 칸 j 를 오른쪽으로 옮기며 nums[j] 를 더해요."),
                t(E, "Whenever total lands exactly on k, that's one more slice — count it.", "더하다가 total 이 딱 k 가 되면, 답을 1 늘려요."),
              ],
              cppOnly: [t(E, "A sum can get big, so total is long long.", "합이 커질 수 있어서 total 은 long long 으로 둬요.")],
              py: [
                "count = 0",
                "for i in range(len(nums)):          # subarray start",
                "    total = 0",
                "    for j in range(i, len(nums)):   # subarray end",
                "        total += nums[j]",
                "        if total == k:",
                "            count += 1",
                "",
                "# count is the answer",
              ],
              cpp: [
                "int count = 0, n = nums.size();",
                "for (int i = 0; i < n; i++) {           // subarray start",
                "    long long total = 0;",
                "    for (int j = i; j < n; j++) {       // subarray end",
                "        total += nums[j];",
                "        if (total == k) count++;",
                "    }",
                "}",
                "// count is the answer",
              ],
            },
          ]}
          doneNote={t(E, "✓ The answer is right — it tries every start-and-end pair, nothing skipped.", "✓ 답은 맞아요 — 가능한 시작·끝 조합을 하나도 빠짐없이 확인하니까요.")}
        />
      ),
    },

    /* ── 3. Felt limit (interactive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "A tiny input like [1,1,1] is fine. But there can be 20,000 numbers, and trying \"every start × every end\" is about n × n ÷ 2 steps. Drag the slider — watch how slow that gets when the input grows.",
        "[1,1,1] 같은 작은 입력은 잘 돼요. 그런데 숫자가 2만 개까지 들어올 수 있어요. \"모든 시작 × 모든 끝\" 을 다 해보면 대략 n × n ÷ 2 번이에요. 슬라이더를 끌어보세요 — 입력이 커지면 얼마나 느려지는지 보세요."),
      content: <SpeedRaceSim E={E} nMax={20000} nStart={200} constraintN={20000} />,
    },

    /* ── 4. Insight setup: prefix-sum rewrite ────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "The faster way uses a running sum — the total from the very start up to where you are. Any slice's sum = (running sum now) − (running sum just before the slice began). We want that gap to be k. Flip it around: (sum before the slice) = (sum now) − k. So the question becomes: of the running sums I've seen so far, how many equal (now − k)?",
        "더 빠른 길은 '누적합' 을 써요 — 맨 앞에서 지금 자리까지 전부 더한 값이에요. 어떤 토막의 합 = (지금까지 누적합) − (그 토막 시작 직전까지 누적합) 이에요. 우리는 이 차이가 k 이길 원해요. 식을 뒤집으면: (시작 직전 누적합) = (지금 누적합) − k. 그래서 질문이 이렇게 바뀌어요 → \"지금까지 본 누적합 중에 (지금 − k) 인 게 몇 개였지?\""),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 8, textAlign: "center" }}>
              {t(E, "Key rewrite", "핵심 변환")}
            </div>
            {[
              { label: t(E, "We want:", "원하는 것:"), formula: t(E, "(sum now) − (sum before the slice)  =  k", "(지금 누적합) − (시작 직전 누적합)  =  k") },
              { label: t(E, "Flip it:", "뒤집으면:"), formula: t(E, "(sum before the slice)  =  (sum now) − k", "(시작 직전 누적합)  =  (지금 누적합) − k") },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: "#374151", width: 70, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: TEAL_D }}>{row.formula}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "Keep a roll-call (a dictionary) of how many times each running sum has shown up. Then \"how many equal (now − k)?\" is answered in one look — the inner loop disappears completely. That's the flat green bar you saw on the speed slider.",
              "지금까지 나온 누적합을 '출석부(딕셔너리)' 에 몇 번 나왔는지 적어둬요. 그럼 \"(지금 − k) 인 게 몇 개?\" 를 한 번에 찾아요 — 안쪽 반복이 통째로 사라져요. 속도 슬라이더에서 평평하던 초록 막대가 바로 이거예요.")}
          </div>
        </div>
      ),
    },

    /* ── 5. Discover: step through it ────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Now follow it one square at a time. Press \"Next step\" and watch four things: the running sum, the partner we look for (running sum − k), the roll-call (seen), and the answer ticking up. Then try the negatives example — that's where you see why we count how many times (not just yes/no).",
        "이제 한 칸씩 직접 따라가 봐요. \"다음 스텝\" 을 누르면서 네 가지를 보세요: 누적합, 찾는 짝(누적합 − k), 출석부(seen), 그리고 답이 하나씩 늘어나는 것. 그다음 음수 예제도 눌러봐요 — 거기서 왜 '있다/없다' 가 아니라 '몇 번' 을 세야 하는지 보여요."),
      content: <SubarraySumSim E={E} />,
    },

    /* ── 6. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "In the walkthrough, we start with seen = {0: 1}. Why begin with running sum 0 already counted once?",
        "따라가기에서 seen = {0: 1} 로 시작했어요. 왜 누적합 0 을 미리 1 번 본 걸로 두고 시작할까요?"),
      question: t(E,
        "Why initialize seen = {0: 1} before walking the array?",
        "왜 배열 걷기 전에 seen = {0: 1} 로 초기화할까요?"),
      options: [
        t(E,
          "It stands for the empty sum — before any number is added. If a slice starting at index 0 sums to k, this is what lets us count it.",
          "아무것도 안 더한 빈 누적합을 나타내요. 맨 앞(0번)부터 시작하는 토막의 합이 k 이면, 이게 있어야 그걸 셀 수 있어요."),
        t(E,
          "It's a placeholder — remove it and the code still works.",
          "자리 채우기용 — 빼도 코드가 작동해요."),
        t(E,
          "It accounts for k=0 edge case only.",
          "k=0 예외 상황만을 위한 거예요."),
      ],
      correct: 0,
      explain: t(E,
        "The running sum starts at 0. If at some square the running sum equals k, then (running sum − k) = 0, and seen[0] = 1 counts the slice that started at the very beginning. Without {0:1}, every slice starting at index 0 would be missed.",
        "누적합은 0 에서 시작해요. 어떤 칸에서 누적합이 딱 k 가 되면, (누적합 − k) = 0 이고, seen[0] = 1 이 맨 앞부터 시작한 토막을 세줘요. {0:1} 이 없으면 맨 앞(0번)부터 시작하는 토막을 전부 놓쳐요."),
    },

    /* ── 7. Final code (progressive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Just one sweep through the array — O(n) time and space. The dictionary does the whole job the inner loop used to do.",
        "배열을 딱 한 번만 쭉 훑으면 끝 — 시간도 공간도 O(n). 딕셔너리가 안쪽 반복이 하던 일을 통째로 대신해요."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "1. Setup", "1. 준비"),
              color: TEAL,
              why: [
                t(E, "prefix: the running sum, growing as we walk.", "prefix: 걸으며 계속 더해 가는 누적합."),
                t(E, "seen: the roll-call — how many times each running sum has shown up.", "seen: 출석부 — 각 누적합이 지금까지 몇 번 나왔는지."),
                t(E, "{0: 1}: the empty sum (nothing added yet) counts as seen once.", "{0: 1}: 아무것도 안 더한 상태(빈 누적합)를 1 번 본 걸로 시작."),
              ],
              cppOnly: [t(E, "prefix is long long so a big sum can't overflow.", "큰 합이 넘치지 않게 prefix 는 long long 으로.")],
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
              label: t(E, "2. Walk and look up the partner", "2. 걸으며 짝을 찾기"),
              color: TEAL,
              why: [
                t(E, "Add each number to prefix, one at a time.", "숫자를 하나씩 prefix 에 더해요."),
                t(E, "The partner is prefix − k. How many earlier running sums equal it = how many slices ending right here add up to k.", "찾는 짝은 prefix − k. 이전 누적합 중 이 값이 몇 개 있었나 = 지금 칸에서 끝나는 '합이 k' 토막 개수."),
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
              label: t(E, "3. Record, then return", "3. 출석부에 적고 반환"),
              color: TEAL,
              why: [
                t(E, "Mark this running sum on the roll-call — one more appearance.", "지금 누적합을 출석부에 1 번 더 적어요."),
                t(E, "Once the sweep is done, count is the answer.", "끝까지 다 돌면 count 가 정답이에요."),
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
