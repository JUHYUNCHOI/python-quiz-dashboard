import { t } from "@/components/quest/theme";
import { SlidingWindowSim } from "./components";

const ACC   = "#7c3aed";
const ACC_L = "#ede9fe";
const ACC_D = "#5b21b6";

export function makeChapters(E) {
  return [
    /* ── 1. Problem ─────────────────────────────────────────── */
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
              "Note: \"substring\" means contiguous — the letters must be next to each other. \"acb\" picked out of \"abcb\" is NOT a substring. We return the length, not the string itself.",
              "주의: \"부분 문자열(substring)\"은 연속이어야 해요 — 글자들이 서로 붙어 있어야 해요. \"abcb\"에서 띄엄띄엄 고른 \"acb\"는 부분 문자열이 아니에요. 그리고 글자가 아니라 길이를 반환해요.")}
          </div>
        </div>
      ),
    },

    /* ── 2. Brute force ──────────────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Brute force: try every start i and every end j, then check whether s[i..j] has any repeats. Three things stacked — that's O(n³) (or O(n²) with a set per window). With n up to 5×10^4, far too slow.",
        "완전탐색: 모든 시작 i, 모든 끝 j 를 잡고, s[i..j] 에 중복이 있는지 매번 검사. 세 가지가 겹쳐서 O(n³) (창문마다 set 쓰면 O(n²)). n 이 최대 5×10^4 이면 너무 느려요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#1e293b", lineHeight: 1.8 }}>
              <div>{"best = 0"}</div>
              <div>{"for i in range(len(s)):        # start"}</div>
              <div>{"    for j in range(i, len(s)):  # end"}</div>
              <div>{"        window = s[i:j+1]"}</div>
              <div>{"        if len(set(window)) == len(window):  # no repeats?"}</div>
              <div>{"            best = max(best, j - i + 1)"}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "Every (i, j) pair, and re-checking the whole window each time. Tons of repeated work — every time we extend the window we re-scan letters we already knew were fine.",
              "모든 (i, j) 쌍에 매번 창문 전체를 다시 검사. 낭비가 엄청나요 — 창문을 늘릴 때마다 이미 괜찮다고 확인한 글자들을 또 훑어요.")}
          </div>
        </div>
      ),
    },

    /* ── 3. Sliding window angle ─────────────────────────────── */
    {
      type: "reveal",
      narr: t(E,
        "Key idea: don't restart. Keep ONE window [left, right] that always has no repeats. Push right forward; if the new letter is already inside the window, slide left just past the old copy. A dictionary remembers where we last saw each letter, so left can jump instantly.",
        "핵심 아이디어: 매번 처음부터 다시 하지 말자. 항상 중복이 없는 창문 [left, right] 하나만 유지해요. right 를 앞으로 밀고, 새 글자가 이미 창문 안에 있으면 left 를 그 옛날 글자 바로 다음으로 밀어요. 딕셔너리가 각 글자를 마지막으로 본 위치를 기억하니까 left 가 한 번에 점프할 수 있어요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: ACC_L, border: `2px solid ${ACC}`, borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: ACC_D, marginBottom: 8, textAlign: "center" }}>
              {t(E, "Window rule", "창문 규칙")}
            </div>
            {[
              { label: t(E, "Expand:", "넓히기:"), formula: "right += 1  (read next letter)" },
              { label: t(E, "Shrink:", "줄이기:"), formula: "if dup inside → left = last[ch] + 1" },
              { label: t(E, "Track:", "기록:"), formula: "best = max(best, right − left + 1)" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 11.5, color: "#374151", width: 64, flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 12.5, fontWeight: 700, color: ACC_D }}>{row.formula}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px" }}>
            {t(E,
              "left and right both only move RIGHT, never back. Each letter is visited at most twice (once by right, once by left). That's O(n) — one smooth pass instead of restarting from every index.",
              "left 와 right 둘 다 오른쪽으로만 움직이고 절대 뒤로 안 가요. 각 글자는 많아야 두 번만 방문돼요 (right 한 번, left 한 번). 그래서 O(n) — 매 인덱스마다 다시 시작하는 대신 한 번에 매끄럽게 훑어요.")}
          </div>
        </div>
      ),
    },

    /* ── 4. Sliding window walkthrough (interactive) ─────────── */
    {
      type: "reveal",
      narr: t(E,
        "Now slide it yourself, one step at a time. Watch the window [L, R] grow and snap. Press \"Next step\". Then try the \"abba\" case — that's where the subtle check prevIdx ≥ left matters: a letter seen earlier but already OUTSIDE the window must not drag left backwards.",
        "이제 한 스텝씩 직접 밀어 봐요. 창문 [L, R] 이 늘어나고 줄어드는 걸 보세요. \"다음 스텝\" 을 누르며 진행해요. 그다음 \"abba\" 케이스를 눌러봐요 — 거기서 prevIdx ≥ left 검사가 왜 필요한지 드러나요: 예전에 봤지만 이미 창문 밖인 글자가 left 를 뒤로 끌면 안 돼요."),
      content: <SlidingWindowSim E={E} />,
    },

    /* ── 5. Quiz ─────────────────────────────────────────────── */
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

    /* ── 6. Code ─────────────────────────────────────────────── */
    {
      type: "code",
      narr: t(E,
        "One pass, O(n) time. The dictionary lets left jump instantly past any duplicate — no inner loop needed.",
        "한 번 스캔, 시간 O(n). 딕셔너리 덕분에 left 가 중복 글자 다음으로 한 번에 점프해요 — 내부 루프가 필요 없어요."),
      code: [
        "def lengthOfLongestSubstring(s: str) -> int:",
        "    last = {}          # letter -> last index we saw it",
        "    left = 0",
        "    best = 0",
        "",
        "    for right in range(len(s)):",
        "        ch = s[right]",
        "        if ch in last and last[ch] >= left:",
        "            left = last[ch] + 1     # jump past the duplicate",
        "        last[ch] = right",
        "        best = max(best, right - left + 1)",
        "",
        "    return best",
        "",
        "# lengthOfLongestSubstring(\"abcabcbb\")  ->  3  (\"abc\")",
        "# lengthOfLongestSubstring(\"abba\")      ->  2  (\"ab\", then \"ba\")",
      ],
    },
  ];
}
