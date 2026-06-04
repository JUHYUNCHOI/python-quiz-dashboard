import { t } from "@/components/quest/theme";
import { SlidingWindowSim, SpeedRaceSim, CodeJourney } from "./components";

const ACC   = "#7c3aed";
const ACC_L = "#ede9fe";
const ACC_D = "#5b21b6";

export function makeChapters(E) {
  return [
    /* ── 1. Problem (observe) ────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "LeetCode #3 — Longest Substring Without Repeating Characters. Find the length of the longest run of contiguous characters with no repeats.",
        "LeetCode #3 — Longest Substring Without Repeating Characters. 같은 글자가 두 번 안 나오는 가장 긴 연속 구간의 길이를 구하세요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: ACC_L, border: `2px solid ${ACC}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: ACC_D, marginBottom: 8 }}>
              📥 {t(E, "Example: s = \"abcabcbb\"", "예시: s = \"abcabcbb\"")}
            </div>
            <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
              {"abcabcbb".split("").map((ch, i) => (
                <div key={i} style={{
                  width: 38, height: 38, borderRadius: 8,
                  border: `2px solid ${i < 3 ? ACC : "#e2e8f0"}`,
                  background: i < 3 ? "#f5f3ff" : "#fff",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 8, color: "#94a3b8" }}>{i}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? ACC_D : "#94a3b8", fontFamily: "monospace" }}>{ch}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { label: '"abc"',  len: 3, ok: true },
                { label: '"bca"',  len: 3, ok: true },
                { label: '"abca"', len: "—", ok: false, note: "a×2" },
                { label: '"bb"',   len: "—", ok: false, note: "b×2" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.ok ? "#f0fdf4" : "#f8fafc",
                  border: `1px solid ${item.ok ? "#86efac" : "#e2e8f0"}`,
                  borderRadius: 6, padding: "5px 8px", textAlign: "center", fontSize: 11.5,
                }}>
                  <span style={{ fontFamily: "monospace", color: "#374151" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: item.ok ? "#15803d" : "#94a3b8", marginLeft: 6 }}>
                    {item.ok ? `len=${item.len} ✓` : `${item.note} ✗`}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 13, color: ACC_D, textAlign: "center" }}>
              {t(E, "Answer: 3  (longest is \"abc\")", "정답: 3  (가장 긴 건 \"abc\")")}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "\"Substring\" = contiguous — the letters must be next to each other. \"acb\" picked out of \"abcb\" is NOT a substring. We return the length, not the string. Constraint: the string can be up to n = 50,000 letters long.",
              "\"부분 문자열(substring)\"은 연속이어야 해요 — 글자들이 서로 붙어 있어야 해요. \"abcb\"에서 띄엄띄엄 고른 \"acb\"는 부분 문자열이 아니에요. 글자가 아니라 길이를 반환해요. 제약: 문자열 길이는 최대 n = 50,000 글자.")}
          </div>
        </div>
      ),
    },

    /* ── 2. First idea: brute (progressive code) ─────────────── */
    {
      type: "reveal",
      narr: t(E,
        "First, the idea you'd reach for right away: try every starting point. From each start, keep adding letters to the right until you hit one you've already seen — that's the longest clean run from that start. Take the best.",
        "먼저, 누구나 가장 먼저 떠올릴 방법: 모든 시작점을 다 해보자. 각 시작점에서 오른쪽으로 글자를 계속 더하다가, 이미 본 글자를 만나면 멈춰요 — 거기까지가 그 시작점에서의 가장 긴 깨끗한 구간. 그중 제일 긴 걸 답으로."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "Brute force — every start, stretch the end", "완전탐색 — 모든 시작에서 끝을 늘려보기"),
              color: ACC,
              why: [
                t(E, "best holds the longest no-repeat run we've found so far.", "best 는 지금까지 찾은 가장 긴 '겹침 없는 구간' 길이를 담아둬요."),
                t(E, "For each start i, seen collects the letters used from i, and end j moves right adding each new letter.", "각 시작점 i 마다 seen 에 그 구간에서 쓴 글자를 모으고, 끝 j 를 오른쪽으로 옮기며 새 글자를 넣어요."),
                t(E, "The moment a letter repeats, this start is done — stop and try the next start.", "같은 글자가 또 나오는 순간, 이 시작점은 여기까지 — 멈추고 다음 시작점으로."),
              ],
              py: [
                "best = 0",
                "n = len(s)",
                "for i in range(n):              # window start",
                "    seen = set()                # letters used from i",
                "    for j in range(i, n):       # window end",
                "        if s[j] in seen:        # repeat → stop",
                "            break",
                "        seen.add(s[j])",
                "        best = max(best, j - i + 1)",
                "",
                "# best is the answer",
              ],
              cpp: [
                "int best = 0, n = s.size();",
                "for (int i = 0; i < n; i++) {        // window start",
                "    set<char> seen;                 // letters used from i",
                "    for (int j = i; j < n; j++) {   // window end",
                "        if (seen.count(s[j])) break; // repeat → stop",
                "        seen.insert(s[j]);",
                "        best = max(best, j - i + 1);",
                "    }",
                "}",
                "// best is the answer",
              ],
            },
          ]}
          doneNote={t(E, "✓ The answer is right — it tries every start, nothing skipped.", "✓ 답은 맞아요 — 모든 시작점을 하나도 빠짐없이 해보니까요.")}
        />
      ),
    },

    /* ── 3. Felt limit (interactive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "It works on \"abcabcbb\". But the string can be 50,000 letters long, and trying \"every start × every end\" is about n × n ÷ 2 steps. Drag the slider — watch how slow that gets when the input grows.",
        "\"abcabcbb\" 같은 작은 입력은 잘 돼요. 그런데 문자열이 5만 글자까지 길어질 수 있어요. \"모든 시작 × 모든 끝\" 을 다 해보면 대략 n × n ÷ 2 번이에요. 슬라이더를 끌어보세요 — 입력이 커지면 얼마나 느려지는지 보세요."),
      content: <SpeedRaceSim E={E} nMax={50000} nStart={200} constraintN={50000} />,
    },

    /* ── 4. Discover: sliding window (interactive) ───────────── */
    {
      type: "reveal",
      narr: t(E,
        "The waste: every time brute restarts at a new start, it re-checks letters it already knew were fine. What if we never restart — keep ONE window that always has no repeats, and only slide its edges? Try it: push \"Next step\", then switch to \"abba\" — that case hides a subtle trap.",
        "낭비의 정체: 완전탐색은 새 시작점마다 이미 괜찮다고 확인한 글자를 또 검사해요. 아예 다시 시작하지 말고 — 항상 중복 없는 창문(window) 하나만 두고, 그 양 끝만 밀면 어떨까요? 직접 해봐요: \"다음 스텝\" 을 누르고, \"abba\" 케이스도 눌러봐요 — 거기에 미묘한 함정이 숨어 있어요."),
      content: <SlidingWindowSim E={E} />,
    },

    /* ── 5. Insight: name what you just saw ──────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "What you just watched has a name: the sliding window. Three moves, repeated.",
        "방금 본 게 바로 슬라이딩 윈도우예요. 세 가지 동작의 반복."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: ACC_L, border: `2px solid ${ACC}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: ACC_D, marginBottom: 8, textAlign: "center" }}>
              {t(E, "Window rule", "창문 규칙")}
            </div>
            {[
              { label: t(E, "Widen:", "넓히기:"), formula: t(E, "move the right edge over to read the next letter", "오른쪽 끝을 한 칸 옮겨 다음 글자를 읽어요") },
              { label: t(E, "Shrink:", "줄이기:"), formula: t(E, "a repeat inside? jump the left edge past the old copy", "안에 중복이 있으면? 왼쪽 끝을 옛 글자 다음으로 점프") },
              { label: t(E, "Track:", "기록:"), formula: t(E, "keep the longest window length in best", "가장 긴 창문 길이를 best 에 기록") },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: "#374151", width: 58, flexShrink: 0, fontWeight: 700 }}>{row.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: ACC_D }}>{row.formula}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "left and right both only move RIGHT, never back. Each letter is visited at most twice (once by right, once by left). That's O(n) — one smooth pass instead of restarting from every index. Back on the speed slider, this is the flat green bar.",
              "left 와 right 둘 다 오른쪽으로만 움직이고 절대 뒤로 안 가요. 각 글자는 많아야 두 번만 방문돼요 (right 한 번, left 한 번). 그래서 O(n) — 매 인덱스마다 다시 시작하는 대신 한 번에 매끄럽게 훑어요. 앞의 속도 슬라이더에서 평평하던 초록 막대가 바로 이거예요.")}
          </div>
        </div>
      ),
    },

    /* ── 6. Quiz (the gotcha) ────────────────────────────────── */
    {
      type: "quiz",
      narr: t(E,
        "In \"abba\", when right reaches the second 'a' (index 3), last['a'] is 0. But left is already 2. Why do we NOT move left back to 1?",
        "\"abba\" 에서 right 가 두 번째 'a'(인덱스 3)에 닿을 때 last['a'] 는 0 이에요. 근데 left 는 이미 2 예요. 왜 left 를 1 로 되돌리지 않을까요?"),
      question: t(E,
        "Why guard the jump with `if last[ch] >= left` instead of always doing `left = last[ch] + 1`?",
        "왜 `left = last[ch] + 1` 을 항상 하지 않고 `if last[ch] >= left` 로 막을까요?"),
      options: [
        t(E,
          "Index 0 is already LEFT of the window (left=2), so that 'a' isn't inside the current window. Moving left back would wrongly re-include dropped letters and shrink a valid window.",
          "인덱스 0 은 이미 창문 왼쪽(left=2) 밖이라, 그 'a' 는 지금 창문 안에 없어요. left 를 되돌리면 이미 버린 글자를 잘못 다시 포함시켜서 멀쩡한 창문을 줄여버려요."),
        t(E,
          "Because 'a' is only allowed to appear once in the entire string.",
          "'a' 는 문자열 전체에서 딱 한 번만 나올 수 있어서요."),
        t(E,
          "Because the window is never allowed to shrink, only grow.",
          "창문은 절대 줄어들면 안 되고 늘어나기만 해서요."),
      ],
      correct: 0,
      explain: t(E,
        "last[ch] remembers the last position ever, even if it's outside the current window. Only a duplicate INSIDE the window (last[ch] >= left) forces left forward. Without the guard, 'a' at index 0 would pull left back to 1, shrinking the correct window and giving a wrong answer.",
        "last[ch] 는 (창문 밖이라도) 가장 마지막 위치를 기억해요. 창문 안 중복(last[ch] >= left)일 때만 left 를 앞으로 밀어야 해요. 이 검사가 없으면 인덱스 0 의 'a' 가 left 를 1 로 되돌려서 올바른 창문을 줄이고 틀린 답을 줘요."),
    },

    /* ── 7. Final code (progressive) ─────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Now the whole thing in one O(n) pass. The dictionary lets left jump instantly past any duplicate — no inner loop at all.",
        "이제 전체를 한 번 O(n) 스캔으로. 딕셔너리 덕분에 left 가 중복 글자 다음으로 한 번에 점프해요 — 내부 루프가 아예 없어요."),
      content: (
        <CodeJourney
          E={E}
          sections={[
            {
              label: t(E, "1. Setup", "1. 준비"),
              color: ACC,
              why: [
                t(E, "last: each letter → the last index we saw it.", "last: 각 글자 → 마지막으로 본 위치."),
                t(E, "left: the left edge of the current window.", "left: 현재 창문의 왼쪽 끝."),
                t(E, "best: longest window length so far.", "best: 지금까지 가장 긴 창문 길이."),
              ],
              py: [
                "def lengthOfLongestSubstring(s: str) -> int:",
                "    last = {}      # letter -> last index seen",
                "    left = 0",
                "    best = 0",
              ],
              cpp: [
                "int lengthOfLongestSubstring(string s) {",
                "    unordered_map<char,int> last;  // letter -> last index",
                "    int left = 0, best = 0;",
              ],
            },
            {
              label: t(E, "2. Slide the right edge", "2. 오른쪽 끝을 민다"),
              color: ACC,
              why: [
                t(E, "Move right one letter at a time.", "right 를 한 글자씩 앞으로."),
                t(E, "If that letter is a duplicate INSIDE the window (last[ch] >= left), jump left just past the old copy.", "그 글자가 창문 안 중복이면(last[ch] >= left) left 를 옛 글자 바로 다음으로 점프."),
                t(E, "Seen before but already dropped? Ignore it — that's the abba trap.", "본 적 있지만 이미 버린 글자면? 무시 — 그게 abba 함정."),
              ],
              pyOnly: [t(E, "`ch in last` checks whether we've ever seen it.", "`ch in last` 로 본 적 있는지 확인.")],
              cppOnly: [t(E, "last.count(ch) checks whether the key exists.", "last.count(ch) 로 키가 있는지 확인.")],
              py: [
                "    for right in range(len(s)):",
                "        ch = s[right]",
                "        if ch in last and last[ch] >= left:",
                "            left = last[ch] + 1   # jump past old copy",
              ],
              cpp: [
                "    for (int right = 0; right < (int)s.size(); right++) {",
                "        char ch = s[right];",
                "        if (last.count(ch) && last[ch] >= left)",
                "            left = last[ch] + 1;  // jump past old copy",
              ],
            },
            {
              label: t(E, "3. Record & return", "3. 기록하고 반환"),
              color: ACC,
              why: [
                t(E, "Write down this letter's newest position (right).", "이 글자의 마지막 위치를 right 로 새로 적어요."),
                t(E, "Update best with the current window length.", "지금 창문 길이로 best 를 갱신해요."),
                t(E, "Once the sweep is done, best is the answer.", "끝까지 다 돌면 best 가 정답이에요."),
              ],
              py: [
                "        last[ch] = right",
                "        best = max(best, right - left + 1)",
                "",
                "    return best",
              ],
              cpp: [
                "        last[ch] = right;",
                "        best = max(best, right - left + 1);",
                "    }",
                "    return best;",
                "}",
              ],
            },
          ]}
          fullCode={{
            py: [
              "def lengthOfLongestSubstring(s: str) -> int:",
              "    last = {}      # letter -> last index seen",
              "    left = 0",
              "    best = 0",
              "    for right in range(len(s)):",
              "        ch = s[right]",
              "        if ch in last and last[ch] >= left:",
              "            left = last[ch] + 1   # jump past old copy",
              "        last[ch] = right",
              "        best = max(best, right - left + 1)",
              "    return best",
            ],
            cpp: [
              "int lengthOfLongestSubstring(string s) {",
              "    unordered_map<char,int> last;  // letter -> last index",
              "    int left = 0, best = 0;",
              "    for (int right = 0; right < (int)s.size(); right++) {",
              "        char ch = s[right];",
              "        if (last.count(ch) && last[ch] >= left)",
              "            left = last[ch] + 1;  // jump past old copy",
              "        last[ch] = right;",
              "        best = max(best, right - left + 1);",
              "    }",
              "    return best;",
              "}",
            ],
          }}
          doneNote={t(E, "O(n) time, O(min(n, charset)) space. \"abcabcbb\" → 3, \"abba\" → 2.", "시간 O(n), 공간 O(min(n, 글자종류)). \"abcabcbb\" → 3, \"abba\" → 2.")}
        />
      ),
    },
  ];
}
