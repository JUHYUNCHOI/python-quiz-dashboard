import { C, t } from "@/components/quest/theme";
import { getShellGameSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "swaps = []",
  "for _ in range(N):",
  "    a, b, g = map(int, input().split())",
  "    swaps.append((a, b, g))",
  "",
  "best = 0",
  "for start in range(1, 4):       # try shell 1, 2, 3",
  "    pos = start                  # ball starts here",
  "    score = 0",
  "    for a, b, g in swaps:",
  "        if pos == a:",
  "            pos = b",
  "        elif pos == b:",
  "            pos = a",
  "        if pos == g:",
  "            score += 1",
  "    best = max(best, score)",
  "",
  "print(best)",
];

/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => (
      <div key={i} style={{
        display: "flex", minHeight: 20,
        background: hl && hl.includes(i) ? "rgba(220,38,38,.12)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fca5a5" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);

/* Helper: shell visual */
const ShellRow = ({ shells, pebble, guess, label, E: isE }) => {
  const colors = ["#6366f1", "#10b981", "#f59e0b"];
  return (
    <div style={{ marginBottom: 6 }}>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {[1, 2, 3].map(pos => {
          const hasPebble = pebble === pos;
          const isGuess = guess === pos;
          return (
            <div key={pos} style={{
              width: 56, height: 56, borderRadius: 12,
              background: hasPebble ? "#fef3c7" : "#f3f4f6",
              border: `3px solid ${isGuess ? "#dc2626" : hasPebble ? "#f59e0b" : "#d1d5db"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: isGuess ? "0 0 8px rgba(220,38,38,.25)" : "none",
              position: "relative",
            }}>
              <div style={{ fontSize: 22 }}>{"🐚"}</div>
              {hasPebble && <div style={{ fontSize: 10, position: "absolute", bottom: 2 }}>{"⚪"}</div>}
              {isGuess && <div style={{
                position: "absolute", top: -8, right: -8, fontSize: 10,
                background: "#dc2626", color: "#fff", borderRadius: 10, padding: "1px 5px", fontWeight: 800,
              }}>{isE ? "G" : "추"}</div>}
              <div style={{ position: "absolute", top: -16, fontSize: 10, color: C.dim, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>{pos}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "The classic shell game!\nA pebble is hidden under one of 3 shells.\nAfter each swap, someone guesses where it is.\nWe need to find the maximum possible correct guesses!", "고전 쉘 게임! 3개 컵 중 하나에 조약돌이 숨겨져 있어. 각 스왑 후 누군가가 위치를 추측해. 최대 정답 수를 찾아야 해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🐚"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Shell Game</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "N swaps happen.\nEach swap tells us: swap shells A and B, then guess G. We don't know where the pebble starts!",
              "N번의 스왑이 일어나.\n각 스왑마다: 컵 A와 B를 교환하고, G를 추측.\n조약돌이 어디서 시작하는지 몰라!")}
          </div>
        </div>),
    },
    // 1-2: What is a swap?
    {
      type: "reveal",
      narr: t(E,
        "A swap exchanges the positions of two shells.\nIf the pebble is under one of the swapped shells, it moves!\nIf not, it stays put.", "스왑은 두 컵의 위치를 바꿔. 조약돌이 교환되는 컵 중 하나 아래에 있으면 이동해! 아니면 그대로 있어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "How Swaps Work", "스왑 작동 방식")}
          </div>
          <div style={{ marginBottom: 14, paddingTop: 16 }}>
            <ShellRow shells={[1, 2, 3]} pebble={2} label={t(E, "Before: pebble at 2", "이전: 조약돌 2번")} E={E} />
          </div>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#dc2626", margin: "8px 0" }}>
            {t(E, "Swap 1 ↔ 3", "스왑 1 ↔ 3")}
          </div>
          <div style={{ paddingTop: 16 }}>
            <ShellRow shells={[1, 2, 3]} pebble={2} label={t(E, "After: pebble STILL at 2!", "이후: 조약돌 여전히 2번!")} E={E} />
          </div>
          <div style={{ marginTop: 10, background: "#fef2f2", borderRadius: 10, padding: 10, border: "2px solid #fca5a5", fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "The pebble was at 2.\nWe swapped 1 and 3. Since the pebble wasn't under 1 or 3, it doesn't move!", "조약돌은 2번에 있었어.\n1번과 3번을 교환했어. 조약돌이 1번이나 3번 아래에 없었으니 이동하지 않아!")}
          </div>
        </div>),
    },
    // 1-3: Quiz — swap understanding
    {
      type: "quiz",
      narr: t(E,
        "Now a case where the pebble IS under one of the swapped shells.\nPebble at 1, swap 1 and 3.\nWhere does it go?", "이번엔 조약돌이 교환되는 컵 아래에 있는 경우야. 조약돌이 1번에 있고, 1번과 3번을 교환. 어디로 가?"),
      question: t(E,
        "Pebble at shell 1. Swap shells 1 ↔ 3. Where is the pebble now?",
        "조약돌이 1번 컵. 1번 ↔ 3번 스왑. 조약돌은 이제 어디?"),
      options: [
        t(E, "Still at 1", "여전히 1번"),
        t(E, "At 2", "2번"),
        t(E, "At 3", "3번"),
      ],
      correct: 2,
      explain: t(E,
        "The pebble was at 1. We swapped 1 and 3, so the pebble moves from 1 to 3!",
        "조약돌이 1번에 있었어. 1번과 3번을 교환했으니 조약돌은 1번에서 3번으로 이동!"),
    },
    // 1-4: The key insight — try all 3 starts
    {
      type: "reveal",
      narr: t(E,
        "We don't know where the pebble starts!\nBut there are only 3 possible positions: 1, 2, or 3.\nSo we try ALL 3 starting positions and take the best score!", "조약돌이 어디서 시작하는지 몰라! 하지만 가능한 위치는 1, 2, 3 단 3개야. 그래서 3가지 시작 위치를 모두 시도하고 최고 점수를 구해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "The Key Insight: Try All 3!", "핵심 아이디어: 3가지 모두 시도!")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3].map(start => {
              const colors = ["#3b82f6", "#10b981", "#f59e0b"];
              return (
                <div key={start} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: `${colors[start - 1]}10`, borderRadius: 10,
                  padding: "8px 12px", border: `2px solid ${colors[start - 1]}40`,
                }}>
                  <div style={{
                    fontSize: 24, width: 40, height: 40, borderRadius: "50%",
                    background: `${colors[start - 1]}20`, display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}>{"🐚"}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: colors[start - 1] }}>
                      {t(E, `Try start = ${start}`, `시작 위치 = ${start} 시도`)}
                    </div>
                    <div style={{ fontSize: 11, color: C.dim }}>
                      {t(E, "Simulate all swaps → count correct guesses", "모든 스왑 시뮬레이션 → 정답 수 세기")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: "#dc2626" }}>
            {t(E, "Answer = max of all 3 scores!", "답 = 3개 점수 중 최대값!")}
          </div>
        </div>),
    },
    // 1-5: Quiz — number of starting positions
    {
      type: "quiz",
      narr: t(E,
        "Since there are exactly 3 shells, how many starting positions do we need to try?", "컵이 정확히 3개니까, 시작 위치를 몇 가지 시도해야 할까?"),
      question: t(E,
        "How many possible starting positions for the pebble?",
        "조약돌의 가능한 시작 위치는 몇 가지?"),
      options: [
        t(E, "1 — just pick the middle", "1 — 가운데만 선택"),
        t(E, "3 — try all shell positions", "3 — 모든 컵 위치 시도"),
        t(E, "N — depends on swap count", "N — 스왑 수에 따라"),
      ],
      correct: 1,
      explain: t(E,
        "Only 3 shells, so only 3 possible starts. Try each, simulate, take the max!",
        "컵이 3개뿐이니 시작 위치도 3가지. 각각 시뮬레이션하고 최대값 구하면 끝!"),
    },
    // 1-6: Input practice
    {
      type: "input",
      narr: t(E,
        "Pebble at 2.\nSwap 2 ↔ 3.\nThen guess = 3.\nIs the guess correct?\nThe pebble moved to 3, guess is 3, so yes!\nScore +1.", "조약돌 2번. 2 ↔ 3 스왑. 추측 = 3. 추측이 맞아? 조약돌이 3으로 이동, 추측도 3, 맞아! 점수 +1."),
      question: t(E,
        "Pebble at 2. Swap 2↔3. Now pebble is at position...?",
        "조약돌 2번. 2↔3 스왑. 이제 조약돌 위치는...?"),
      hint: t(E,
        "Pebble was at 2. Swap 2 and 3. So pebble moves to 3!",
        "조약돌이 2번에 있었어. 2번과 3번 교환. 조약돌은 3번으로 이동!"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 시뮬레이션 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh2(E) {
  return [
    // 2-1: Trace example setup
    {
      type: "reveal",
      narr: t(E,
        "Let's trace with an example!\n3 swaps: (1,2,guess=1), (3,2,guess=1), (1,3,guess=1).\nWe'll try starting position = 1.", "예시로 추적해보자! 스왑 3번: (1,2,추측=1), (3,2,추측=1), (1,3,추측=1). 시작 위치 = 1로 시도할 거야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "Trace: start = 1", "추적: 시작 = 1")}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef2f2" }}>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626", textAlign: "left" }}>{t(E, "Step", "단계")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Swap", "스왑")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Pebble", "조약돌")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Guess", "추측")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{"✓?"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "Init", "초기"), "—", "1", "—", "—"],
                  ["1", "1↔2", "2", "1", "✗"],
                  ["2", "3↔2", "3", "1", "✗"],
                  ["3", "1↔3", "1", "1", "✓"],
                ].map(([step, swap, peb, guess, ok], i) => (
                  <tr key={i} style={{ background: ok === "✓" ? "#dcfce7" : i % 2 === 0 ? "#fff" : "#fef2f2" }}>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2" }}>{step}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{swap}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center", fontWeight: 800, color: "#f59e0b" }}>{peb}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{guess}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center", fontWeight: 800, color: ok === "✓" ? "#059669" : "#dc2626" }}>{ok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8, textAlign: "center", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>
            {t(E, "Start=1: score = 1", "시작=1: 점수 = 1")}
          </div>
        </div>),
    },
    // 2-2: Trace other starts
    {
      type: "reveal",
      narr: t(E,
        "Now let's see start=2 and start=3 too. We need to compare all three!", "이제 시작=2와 시작=3도 보자. 셋 다 비교해야 해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "All 3 starting positions", "3가지 시작 위치 모두")}
          </div>
          {/* Compact summary for each start */}
          {[
            { start: 1, trace: ["1→2", "2→3", "3→1"], matches: [false, false, true], score: 1 },
            { start: 2, trace: ["2→2", "2→3", "3→3"], matches: [false, false, false], score: 0 },
            { start: 3, trace: ["3→3", "3→2", "2→2"], matches: [false, false, false], score: 0 },
          ].map(({ start, trace, matches, score }) => {
            const cols = ["#3b82f6", "#10b981", "#f59e0b"];
            return (
              <div key={start} style={{
                marginBottom: 8, padding: "8px 12px", borderRadius: 10,
                background: score > 0 ? "#dcfce7" : "#f9fafb",
                border: `2px solid ${score > 0 ? "#6ee7b7" : "#e5e7eb"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: cols[start - 1] }}>
                    {t(E, `Start = ${start}`, `시작 = ${start}`)}
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 900,
                    color: score > 0 ? "#059669" : C.dim,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    {t(E, `score = ${score}`, `점수 = ${score}`)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {trace.map((t2, i) => (
                    <div key={i} style={{
                      fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
                      color: matches[i] ? "#059669" : C.dim, fontWeight: matches[i] ? 800 : 400,
                    }}>
                      {t2}{matches[i] ? " ✓" : " ✗"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 8, textAlign: "center", fontSize: 14, fontWeight: 900, color: "#dc2626" }}>
            {t(E, "Answer = max(1, 0, 0) = 1", "답 = max(1, 0, 0) = 1")}
          </div>
        </div>),
    },
    // 2-3: Quiz on simulation logic
    {
      type: "quiz",
      narr: t(E,
        "When we swap shells A and B, what happens to the pebble position (pos)?", "컵 A와 B를 교환할 때, 조약돌 위치(pos)에 무슨 일이 일어나?"),
      question: t(E,
        "Swap A↔B. If pos==A, then pos becomes...?",
        "A↔B 스왑. pos==A이면 pos는...?"),
      options: [
        t(E, "pos stays at A", "pos는 A에 그대로"),
        t(E, "pos becomes B", "pos가 B가 됨"),
        t(E, "pos becomes 0", "pos가 0이 됨"),
      ],
      correct: 1,
      explain: t(E,
        "If the pebble is at A and we swap A↔B, the pebble moves to B! If pos==B, it moves to A. Otherwise, no change.",
        "조약돌이 A에 있고 A↔B를 교환하면 조약돌은 B로 이동! pos==B이면 A로 이동. 아니면 변화 없음."),
    },
    // 2-4: Complexity input
    {
      type: "input",
      narr: t(E,
        "We try 3 starting positions, each simulating N swaps.\nWhat's the total number of operations?", "3가지 시작 위치를 시도하고 각각 N번의 스왑을 시뮬레이션해. 총 연산 수는?"),
      question: t(E,
        "3 starts × N swaps each. If N=5, total operations?",
        "3가지 시작 × N번 스왑. N=5이면 총 연산 수?"),
      hint: t(E,
        "3 × 5 = 15",
        "3 × 5 = 15"),
      answer: 15,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh3(E, lang = "py") {
  return [
    // 3-1: Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code!\nFirst read N and all the swap data.\nEach swap has: shell A, shell B, and guess G.", "코드를 만들어보자! 먼저 N과 모든 스왑 데이터를 읽어. 각 스왑에는: 컵 A, 컵 B, 추측 G가 있어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "swaps = []",
              "for _ in range(N):",
              "    a, b, g = map(int, input().split())",
              "    swaps.append((a, b, g))",
            ]}
            highlight={[0, 1, 2, 3, 4]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5, whiteSpace: "pre-line" }}>
            {t(E,
              "Store all swaps as tuples (a, b, g) in a list.\nWe'll replay these for each starting position.", "모든 스왑을 튜플 (a, b, g)로 리스트에 저장.\n각 시작 위치마다 이걸 다시 재생할 거야.")}
          </div>
        </div>),
    },
    // 3-2: Outer loop — try all 3 starts
    {
      type: "reveal",
      narr: t(E,
        "The outer loop tries all 3 starting positions.\nFor each, we track the pebble position and count correct guesses.", "바깥 루프에서 3가지 시작 위치를 모두 시도해. 각각에 대해 조약돌 위치를 추적하고 정답 수를 세."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 2: Try all starting positions", "2단계: 모든 시작 위치 시도")}
          </div>
          <CodeSnippet
            lines={[
              "best = 0",
              "for start in range(1, 4):       # try shell 1, 2, 3",
              "    pos = start                  # ball starts here",
              "    score = 0",
            ]}
            highlight={[0, 1, 2, 3]}
          />
          <div style={{ marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8, border: "1.5px solid #fca5a5", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>range(1, 4)</span> = {t(E, "gives 1, 2, 3", "1, 2, 3을 생성")}</div>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>pos</span> = {t(E, "current pebble location", "현재 조약돌 위치")}</div>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>score</span> = {t(E, "correct guesses for this start", "이 시작 위치의 정답 수")}</div>
          </div>
        </div>),
    },
    // 3-3: Inner loop — simulate swaps
    {
      type: "reveal",
      narr: t(E,
        "Inside, for each swap: update pebble position, then check if the guess matches.\nThis is the heart of the simulation!", "안쪽에서 각 스왑마다: 조약돌 위치 업데이트 후 추측이 맞는지 확인. 이게 시뮬레이션의 핵심!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 3: Simulate each swap", "3단계: 각 스왑 시뮬레이션")}
          </div>
          <CodeSnippet
            lines={[
              "    for a, b, g in swaps:",
              "        if pos == a:",
              "            pos = b",
              "        elif pos == b:",
              "            pos = a",
              "        if pos == g:",
              "            score += 1",
            ]}
            highlight={[0, 1, 2, 3, 4, 5, 6]}
          />
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>
              {t(E, "Two-part logic:", "2단계 로직:")}
            </div>
            <div>1. {t(E, "Update pos: if pebble is at a, move to b (and vice versa)", "pos 업데이트: 조약돌이 a에 있으면 b로 이동 (반대도)")}</div>
            <div>2. {t(E, "Check: if pos matches guess g, increment score", "확인: pos가 추측 g와 같으면 점수 +1")}</div>
          </div>
        </div>),
    },
    // 3-4: Quiz — why separate if statements
    {
      type: "quiz",
      narr: t(E,
        "Notice: the swap uses if/elif, but the guess check is a SEPARATE if.\nWhy not elif for the guess check?", "주목: 스왑은 if/elif를 쓰지만 추측 확인은 별도의 if야. 왜 추측 확인에 elif를 쓰지 않을까?"),
      question: t(E,
        "Why is 'if pos == g' separate from the swap if/elif?",
        "왜 'if pos == g'가 스왑 if/elif와 분리되어 있을까?"),
      options: [
        t(E, "No reason, just style", "이유 없어, 그냥 스타일"),
        t(E, "Guess check must happen AFTER the swap, using updated pos", "추측 확인은 스왑 이후에, 업데이트된 pos로 해야 하니까"),
        t(E, "To save time", "시간을 절약하려고"),
      ],
      correct: 1,
      explain: t(E,
        "The swap updates pos first. THEN we check the guess against the NEW pos. If it were elif, the guess check might be skipped!",
        "스왑이 먼저 pos를 업데이트해. 그 다음 새로운 pos로 추측을 확인해. elif였다면 추측 확인이 건너뛸 수 있어!"),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getShellGameSections(E),
    },
  ];
}
