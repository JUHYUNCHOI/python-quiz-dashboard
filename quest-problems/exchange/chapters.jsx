import { C, t } from "@/components/quest/theme";
import { getExchangeSections } from "./components";

const A = "#2563eb";

// Reference solution: brute simulation of M minutes (real Milk Exchange).
export const SOLUTION_CODE = [
  "import sys",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "M = int(data[p]); p += 1",
  "S = data[p]; p += 1               # direction string, e.g. 'RRL'",
  "cap = [int(x) for x in data[p:p+N]]",
  "cur = list(cap)                   # initial milk = capacity",
  "for t in range(M):",
  "    for i in range(N):",
  "        if cur[i] > 0:",
  "            cur[i] -= 1",
  "            j = (i + (1 if S[i] == 'R' else -1)) % N",
  "            cur[j] += 1",
  "    for i in range(N):",
  "        cur[i] = min(cur[i], cap[i])",
  "print(sum(cur))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 Problem Understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeExchangeCh1(E) {
  return [
    // 1-1 Intro / mission
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a circle, each with a full bucket of milk.\nEvery minute, each cow with milk passes 1 liter left or right.\nMilk over a bucket's capacity is lost. How much milk is left after M minutes?",
        "N마리 소가 원형으로 서 있고, 각자 우유가 가득 찬 양동이를 가지고 있어요.\n매분 우유가 있는 소는 1리터를 왼쪽 또는 오른쪽으로 전달해요.\n양동이 용량을 넘는 우유는 버려져요. M분 후 남은 우유는?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥛</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: A }}>Milk Exchange</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2024 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "After M minutes of milk passing (with overflow lost), output the TOTAL milk left.",
                "M분 동안 우유를 전달하고 (넘침은 버림) 남은 총 우유 양을 출력.")}
            </div>
          </div>

          {/* Mini-visual: 3 cows, RRL, one minute trace */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a8a", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Tiny example: 3 cows, directions RRL, all start with 1 L (cap 1)",
                    "작은 예: 소 3마리, 방향 RRL, 모두 1 L로 시작 (용량 1)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 14 }}>
              {/* Before */}
              <div>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>{t(E, "Before", "전")}</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {[{ v: 1, dir: "→" }, { v: 1, dir: "→" }, { v: 1, dir: "←" }].map((c, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #93c5fd", borderRadius: 10, padding: "6px 8px", textAlign: "center", minWidth: 40 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>{c.v} L</div>
                      <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 600 }}>{c.dir}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: 22, color: A, fontWeight: 700 }}>→</div>

              {/* After 1 minute */}
              <div>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>{t(E, "After 1 minute", "1분 후")}</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {[{ v: 0, hi: false }, { v: 1, hi: true }, { v: 1, hi: false }].map((c, i) => (
                    <div key={i} style={{ background: c.hi ? "#fef3c7" : "#fff", border: `1px solid ${c.hi ? "#fbbf24" : "#93c5fd"}`, borderRadius: 10, padding: "6px 8px", textAlign: "center", minWidth: 40 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: c.hi ? "#92400e" : "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>{c.v} L</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.text, textAlign: "center", lineHeight: 1.6 }}>
              {t(E, "Cow 1 received from BOTH sides → would have 2 L, but cap = 1 → 1 L lost (yellow). ",
                    "소 1이 양쪽에서 받음 → 2 L가 됐어야 하지만 용량 1 → 1 L 버려짐 (노랑). ")}
              <b style={{ color: A }}>{t(E, "Total milk = 0 + 1 + 1 = 2.", "총 우유 = 0 + 1 + 1 = 2.")}</b>
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N cows in a circle, each with milk and a capacity limit.\nEvery minute: pass 1L left or right. Overflow is lost! Find total milk after M minutes.",
              "N마리 소가 원형으로, 각각 우유와 용량 제한이 있어요.\n매분: 1L를 왼쪽 또는 오른쪽으로 전달.\n넘치면 버려져!\nM분 후 총 우유량을 구해요.")}
          </div>
        </div>),
    },

    // 1-2 Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: line 1 is N M, line 2 is the direction string (no spaces), line 3 is N capacities. Initial milk equals capacity.",
        "입력: 첫 줄 N M, 둘째 줄 방향 문자열 (공백 없음), 셋째 줄 N개 용량. 초기 우유 = 용량."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: A, textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#1e3a8a", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#1e3a8a", whiteSpace: "pre" }}>
{`3 1
RRL
1 1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`2`}
              </div>
            </div>
          </div>
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#1e3a8a", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — minute 1", "풀이 — 1분 후")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Cows: [1, 1, 1], directions R R L, caps [1, 1, 1].",
                    "소: [1, 1, 1], 방향 R R L, 용량 [1, 1, 1].")}
              <br/>
              {t(E, "Cow 0 → cow 1 (R). Cow 1 → cow 2 (R). Cow 2 → cow 1 (L).",
                    "소 0 → 소 1 (R). 소 1 → 소 2 (R). 소 2 → 소 1 (L).")}
              <br/>
              {t(E, "After transfers: cow 1 receives from both sides → over capacity → overflow lost.",
                    "전달 후: 소 1이 양쪽에서 받음 → 용량 초과 → 넘침은 사라짐.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ total milk = 0 + 1 + 1 = 2.", "→ 총 우유 = 0 + 1 + 1 = 2.")}
            </div>
          </div>
        </div>),
    },

    // 1-3 How passing works
    {
      type: "reveal",
      narr: t(E,
        "Each cow simultaneously passes 1 liter in its direction.\nA cow with 0 milk passes nothing.\nIf milk received pushes a cow over its capacity, the overflow is lost forever!",
        "모든 소가 동시에 자기 방향으로 1리터를 전달해요. 우유가 0이면 아무것도 안 전달해요. 받은 우유가 용량을 넘으면 넘치는 건 영원히 사라져요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: A, marginBottom: 10 }}>
              {t(E, "Passing Rules", "전달 규칙")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
              {[
                [t(E, "Has milk?", "우유 있어요?"), t(E, "Pass 1L", "1L 전달")],
                [t(E, "Over capacity?", "용량 초과?"), t(E, "Overflow lost!", "넘치면 버려!")],
              ].map(([q, a], i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #93c5fd", borderRadius: 10, padding: 10, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: A }}>{q}</div>
                  <div style={{ fontSize: 11, color: C.text, marginTop: 4 }}>{a}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "All transfers happen simultaneously, then capacity is enforced.",
                "모든 전달이 동시에 일어나고, 그 후 용량 제한이 적용돼요.")}
            </div>
          </div>
        </div>),
    },

    // 1-4 Quiz: net change
    {
      type: "quiz",
      narr: t(E,
        "Think about what happens when two adjacent cows pass to each other!",
        "두 이웃한 소가 서로에게 전달하면 어떻게 되는지 생각해봐요!"),
      question: t(E,
        "If cow A passes left and neighbor cow B passes right to cow A, what is cow A's net milk change from these two?",
        "소 A가 왼쪽으로, 이웃 소 B가 오른쪽으로 소 A에게 전달하면, 이 둘로 인한 소 A의 우유 순 변화는?"),
      options: [
        t(E, "+1 (gains one)", "+1 (하나 받아)"),
        t(E, "0 (gives one, receives one)", "0 (하나 주고 하나 받아)"),
        t(E, "-1 (loses one)", "-1 (하나 잃어)"),
      ],
      correct: 1,
      explain: t(E,
        "Right! A gives 1L left and receives 1L from B. Net change = 0. Milk is only lost on overflow.",
        "맞아! A는 왼쪽으로 1L 주고 B에게서 1L 받아요. 순 변화 = 0. 우유는 넘칠 때만 사라져요."),
    },

    // 1-5 Input: small case
    {
      type: "input",
      narr: t(E,
        "Let's try a simple case!\n3 cows in a circle, all pass right, each starts with 2L, capacity 2.",
        "간단한 예시를 해보자! 3마리 소가 원형으로, 모두 오른쪽으로 전달, 각각 2L로 시작, 용량 2."),
      question: t(E,
        "3 cows, all pass right, milk=[2,2,2], capacity=[2,2,2]. After 1 minute, what is the total milk?",
        "3마리 소, 모두 오른쪽 전달, 우유=[2,2,2], 용량=[2,2,2]. 1분 후 총 우유량은?"),
      hint: t(E,
        "Each cow gives 1 right AND receives 1 from the left. Will any cow exceed its capacity?",
        "각 소는 1을 오른쪽으로 주고 왼쪽에서 1 받아. 용량 초과되는 소가 있을까?"),
      answer: 6,
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ Code
   ═══════════════════════════════════════════════════════════════ */
export function makeExchangeCh2(E, lang = "py") {
  return [
    // 2-0 Idea recap
    {
      type: "reveal",
      narr: t(E,
        "The plan: simulate one minute at a time. Each cow with milk passes 1L, then over-cap cells lose the overflow. Repeat M times, sum at the end.",
        "계획: 한 분씩 시뮬레이션. 우유 있는 소가 1L 전달, 그 다음 용량 초과는 버림. M번 반복하고 마지막에 합계."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, color: A }}>
            {t(E, "Brute simulation: pass → cap → repeat. O(N·M).", "단순 시뮬: 전달 → 용량 제한 → 반복. O(N·M).")}
          </div>
        </div>),
    },

    // 2-1 Static worked example (sim step — replaces wrong interactive sim)
    {
      type: "sim",
      narr: t(E,
        "Trace the official Sample 1 minute by minute — see the milk move and the overflow disappear.",
        "공식 샘플 1을 분 단위로 따라가 봐 — 우유가 움직이고 넘침이 사라지는 걸 봐."),
    },

    // 2-2 Progressive code build
    {
      type: "progressive",
      narr: t(E,
        "Now build the solution. The section below reveals the simulation loop one piece at a time.",
        "이제 솔루션을 만들어보자. 아래 섹션이 시뮬레이션 루프를 한 조각씩 보여줘."),
      sections: getExchangeSections(E),
    },

    // 2-3 Runner — verify on official samples
    {
      type: "runner",
      narr: t(E,
        "Pick an official sample and confirm the simulation gives the expected total.",
        "공식 샘플을 골라 시뮬레이션이 예상 합계를 내는지 확인해."),
    },
  ];
}
