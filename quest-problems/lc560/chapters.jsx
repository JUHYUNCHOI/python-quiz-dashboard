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
        "Now the fast way. The key is one idea — the running sum.\nThe formula below is the whole trick ↓",
        "이제 빠른 방법이에요. 열쇠는 딱 하나, '누적합'.\n아래 식이 전부예요 ↓"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: TEAL_D, marginBottom: 3, textAlign: "center" }}>
              {t(E, "The running-sum rewrite", "누적합 공식")}
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginBottom: 10, textAlign: "center", lineHeight: 1.5 }}>
              {t(E, "running sum = everything added from the very start up to this cell",
                   "누적합 = 맨 앞부터 지금 칸까지 전부 더한 값")}
            </div>

            {/* 구체 예시: 토막 합 = 두 누적합의 차이 (슬라이드 1 과 같은 [1,1,1]) */}
            <div style={{ background: "#fff", border: "1px dashed #7dd3fc", borderRadius: 8, padding: "8px 10px", marginBottom: 12 }}>
              <div style={{ fontSize: 10.5, color: "#64748b", marginBottom: 7, textAlign: "center" }}>
                {t(E, "Why a difference? The prefix-sum list of [1,1,1] is [0,1,2,3]:", "왜 '차이'? — [1,1,1] 의 누적합 리스트는 [0,1,2,3]:")}
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center", marginBottom: 7, flexWrap: "wrap" }}>
                {[
                  { v: 0, lab: t(E, "start", "시작 전"), hl: false },
                  { v: 1, lab: "+1", hl: true },
                  { v: 2, lab: "+1", hl: false },
                  { v: 3, lab: "+1", hl: true },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    minWidth: 40, borderRadius: 7, padding: "3px 6px",
                    background: c.hl ? "#e0f2fe" : "#f8fafc",
                    border: `2px solid ${c.hl ? TEAL : "#e2e8f0"}`,
                  }}>
                    <span style={{ fontSize: 9, color: "#94a3b8" }}>{c.lab}</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: c.hl ? TEAL_D : "#94a3b8" }}>{c.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, textAlign: "center", color: TEAL_D, fontWeight: 700, lineHeight: 1.5 }}>
                {t(E, "slice sum = (sum now) − (sum before)  →  3 − 1 = 2  ✓",
                     "토막 합 = (지금 누적합) − (시작 직전 누적합)  →  3 − 1 = 2  ✓")}
              </div>
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
          <div style={{ background: "#ecfdf5", border: "2px solid #34d399", borderLeft: "6px solid #10b981", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#047857", marginBottom: 5 }}>
              💡 {t(E, "Why this is instant", "그래서 한 번에 찾아져요")}
            </div>
            <div style={{ fontSize: 12.5, color: "#065f46", lineHeight: 1.6 }}>
              {t(E,
                "Build the prefix-sum list once, then sweep it left to right. At each value, just check whether (value − k) showed up earlier — a dictionary answers that instantly, so the inner loop disappears.",
                "누적합 리스트를 한 번 만들어 두고 왼→오로 훑어요. 각 값에서 (그 값 − k) 가 앞에 나왔는지만 보면 되고, 그건 딕셔너리가 바로 답해줘요 — 안쪽 반복이 사라져요.")}
            </div>
          </div>
        </div>
      ),
    },

    /* ── 5. Discover: step through it ────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "First, ① Build the prefix list.\nAdd nums left to right, appending each running sum to prefix = [0, …].\nThen switch to ② Count the pairs: sweep the list and count values that differ by k, using a dictionary.\nTry the negatives example — you'll see the same prefix value show up twice.",
        "먼저 ① 누적합 리스트 만들기.\nnums 를 왼쪽부터 더해 prefix = [0, …] 리스트를 한 칸씩 채워요.\n그다음 ② 차이가 k 인 쌍 세기 로 바꿔서, 리스트를 훑으며 차이가 k 인 값들을 딕셔너리로 세요.\n음수 예제도 눌러봐요 — 같은 누적합 값이 두 번 나오는 걸 보게 돼요."),
      content: <SubarraySumSim E={E} />,
    },

    /* ── 6. Quiz ─────────────────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "We built the prefix list starting at prefix = [0]. Why put a 0 at the very front?",
        "누적합 리스트를 prefix = [0] 으로 시작했어요. 왜 맨 앞에 0 을 넣을까요?"),
      question: t(E,
        "Why start the prefix-sum list with [0]?",
        "왜 누적합 리스트를 [0] 으로 시작할까요?"),
      options: [
        t(E,
          "0 is the empty prefix — the sum before any number. A subarray starting at index 0 has sum prefix[r] − prefix[0], so this 0 must be in the list to count those.",
          "0 은 '아무것도 안 더한' 빈 누적합이에요. 맨 앞(0번)부터 시작하는 토막의 합은 prefix[r] − prefix[0] 인데, 이 0 이 리스트에 있어야 그런 토막을 셀 수 있어요."),
        t(E,
          "It's just a placeholder — remove it and the code works the same.",
          "그냥 자리 채우기 — 빼도 똑같이 작동해요."),
        t(E,
          "To make the list length an even number.",
          "리스트 길이를 짝수로 맞추려고요."),
      ],
      correct: 0,
      explain: t(E,
        "A subarray nums[l..r] sums to prefix[r+1] − prefix[l]. A slice starting at the very beginning (l = 0) is prefix[r+1] − prefix[0], so prefix[0] = 0 has to be in the list — otherwise every subarray starting at index 0 would be missed.",
        "토막 nums[l..r] 의 합 = prefix[r+1] − prefix[l] 이에요. 맨 앞부터 시작하는 토막(l=0)은 prefix[r+1] − prefix[0] 인데, prefix[0] = 0 이 리스트에 없으면 맨 앞부터 시작하는 토막을 전부 놓쳐요. 그래서 [0] 으로 시작해요."),
    },

    /* ── 7. Final code (progressive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Build the prefix-sum list, then one sweep with a dictionary — O(n) time and space. No nested loop.",
        "누적합 리스트를 만들고, 딕셔너리로 한 번만 훑으면 끝 — 시간도 공간도 O(n). 이중 반복 없음."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "1. Build the prefix-sum list", "1. 누적합 리스트 만들기"),
              color: TEAL,
              why: [
                t(E, "prefix[0] = 0: the empty prefix — the sum before adding anything.", "prefix[0] = 0: 빈 누적합 — 아무것도 더하기 전의 합."),
                t(E, "Each next cell = the previous one + the next number. So prefix[i] holds the sum of the first i numbers.", "다음 칸 = 이전 칸 + 다음 숫자. 그래서 prefix[i] 는 앞 i 개 숫자의 합."),
              ],
              cppOnly: [t(E, "Use long long for prefix so a big sum can't overflow.", "합이 커질 수 있으니 prefix 는 long long 으로.")],
              py: [
                "from collections import defaultdict",
                "",
                "def subarraySum(nums: list[int], k: int) -> int:",
                "    prefix = [0]                  # empty prefix",
                "    for x in nums:",
                "        prefix.append(prefix[-1] + x)",
              ],
              cpp: [
                "int subarraySum(vector<int>& nums, int k) {",
                "    int n = nums.size();",
                "    vector<long long> prefix(n + 1, 0);   // prefix[0] = 0",
                "    for (int i = 0; i < n; i++)",
                "        prefix[i + 1] = prefix[i] + nums[i];",
              ],
            },
            {
              label: t(E, "2. Count pairs that differ by k", "2. 차이가 k 인 쌍 세기"),
              color: TEAL,
              why: [
                t(E, "A subarray sum = prefix[r] − prefix[l]. We want that difference to be k.", "토막 합 = prefix[r] − prefix[l]. 이 차이가 k 인 쌍을 찾는 거예요."),
                t(E, "Sweep the list. For value p, the partner is p − k: how many earlier values equal it = how many valid slices end here.", "리스트를 훑어요. 값 p 의 짝은 p − k: 앞에서 이 값이 몇 번 나왔나 = 여기서 끝나는 유효한 토막 개수."),
                t(E, "Look up first, then record p — so a value never pairs with itself.", "조회를 먼저 하고 그다음 p 를 기록 — 자기 자신과 짝지어지지 않게."),
              ],
              pyOnly: [t(E, "seen = defaultdict(int): a missing key reads as 0 automatically — no if-check needed before adding.", "seen = defaultdict(int): 없는 키를 읽으면 자동으로 0 — if 검사 없이 바로 더하고 셀 수 있어요.")],
              cppOnly: [t(E, "Check seen.count first — reading a missing key would insert a 0.", "seen.count 로 먼저 확인 — 없는 키를 읽으면 0 이 삽입돼요.")],
              py: [
                "    count = 0",
                "    seen = defaultdict(int)       # {prefix value: how many times}",
                "    for p in prefix:",
                "        count += seen[p - k]      # missing key → 0",
                "        seen[p] += 1",
                "    return count",
              ],
              cpp: [
                "    int count = 0;",
                "    unordered_map<long long,int> seen;",
                "    for (long long p : prefix) {",
                "        if (seen.count(p - k)) count += seen[p - k];",
                "        seen[p]++;",
                "    }",
                "    return count;",
                "}",
              ],
            },
          ]}
          fullCode={{
            py: [
              "from collections import defaultdict",
              "",
              "def subarraySum(nums: list[int], k: int) -> int:",
              "    # 1. prefix-sum list",
              "    prefix = [0]",
              "    for x in nums:",
              "        prefix.append(prefix[-1] + x)",
              "    # 2. count pairs that differ by k",
              "    count = 0",
              "    seen = defaultdict(int)",
              "    for p in prefix:",
              "        count += seen[p - k]",
              "        seen[p] += 1",
              "    return count",
            ],
            cpp: [
              "int subarraySum(vector<int>& nums, int k) {",
              "    int n = nums.size();",
              "    vector<long long> prefix(n + 1, 0);",
              "    for (int i = 0; i < n; i++)",
              "        prefix[i + 1] = prefix[i] + nums[i];",
              "",
              "    int count = 0;",
              "    unordered_map<long long,int> seen;",
              "    for (long long p : prefix) {",
              "        if (seen.count(p - k)) count += seen[p - k];",
              "        seen[p]++;",
              "    }",
              "    return count;",
              "}",
            ],
          }}
          doneNote={t(E, "O(n) time & space. [1,1,1],k=2 → 2; [1,2,3],k=3 → 2.", "시간·공간 O(n). [1,1,1],k=2 → 2; [1,2,3],k=3 → 2.")}
        />
      ),
    },
  ];
}
