import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getBovShuffleSections } from "./components";

/* ────────────────────────────────────────────────────────────────
   Interactive sim: step the shuffle round-by-round
   shuffle (1-indexed) = [3,1,4,5,2]
   meaning cow at position i moves to position shuffle[i]
   Cows labeled A..E start at positions 1..5.
   Click "Apply shuffle" to advance one round; "Reset" to start over.
   ──────────────────────────────────────────────────────────────── */
function PermShuffleSim({ E }) {
  // shuffle in 1-indexed form for display friendliness; store 0-indexed internally
  const SHUFFLE_1 = [3, 1, 4, 5, 2];
  const N = SHUFFLE_1.length;
  const SHUFFLE = SHUFFLE_1.map(s => s - 1);
  const INITIAL = ["A", "B", "C", "D", "E"];

  const [round, setRound] = useState(0);
  const [lineup, setLineup] = useState(INITIAL);

  const applyOnce = () => {
    const next = new Array(N).fill(null);
    for (let i = 0; i < N; i++) next[SHUFFLE[i]] = lineup[i];
    setLineup(next);
    setRound(r => r + 1);
  };
  const reset = () => { setLineup(INITIAL); setRound(0); };

  const cellBase = {
    width: 44, height: 44, display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "JetBrains Mono, monospace", fontWeight: 800,
    fontSize: 18, border: "1.5px solid #fdba74", borderRadius: 8,
    background: "#fff7ed", color: "#9a3412",
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10,
        padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
          🧪 {t(E, "Interactive Sim", "직접 해보기")}
        </div>
        <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
          {t(E,
            "Watch the shuffle act. The cow at position i jumps to shuffle[i]. Click 'Apply shuffle' to advance one round.",
            "셔플이 어떻게 움직이는지 봐요. 위치 i 의 소가 shuffle[i] 위치로 이동해요. 'Apply shuffle' 을 눌러 한 라운드씩 진행해요.")}
        </div>
      </div>

      {/* shuffle permutation row */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 6,
        marginBottom: 6, fontSize: 12, color: C.dim,
      }}>
        <span style={{ fontWeight: 700, color: "#7c3aed" }}>
          shuffle = [{SHUFFLE_1.join(", ")}]
        </span>
        <span>·</span>
        <span>{t(E, "1-indexed", "1-인덱스")}</span>
      </div>

      <table style={{ borderCollapse: "separate", borderSpacing: 6, margin: "0 auto" }}>
        <tbody>
          <tr>
            <td style={{ fontSize: 11, color: C.dim, paddingRight: 6, textAlign: "right" }}>
              {t(E, "position", "위치")}
            </td>
            {INITIAL.map((_, i) => (
              <td key={`p-${i}`} style={{ textAlign: "center", fontSize: 12, color: C.dim, fontWeight: 600 }}>
                {i + 1}
              </td>
            ))}
          </tr>
          <tr>
            <td style={{ fontSize: 11, color: "#f97316", paddingRight: 6, textAlign: "right", fontWeight: 700 }}>
              {t(E, "🐄 cow", "🐄 소")}
            </td>
            {lineup.map((c, i) => (
              <td key={`c-${i}`}>
                <div style={cellBase}>{c == null ? "·" : c}</div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: 10, marginTop: 14, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#9a3412" }}>
          {t(E, "Rounds applied", "적용한 라운드")}: {round}
        </span>
        <button
          onClick={applyOnce}
          style={{
            background: "#f97316", color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 14px", fontWeight: 800,
            fontSize: 13, cursor: "pointer",
          }}>
          ▶ {t(E, "Apply shuffle", "셔플 적용")}
        </button>
        <button
          onClick={reset}
          style={{
            background: "#fff", color: "#f97316", border: "1.5px solid #f97316",
            borderRadius: 8, padding: "6px 12px", fontWeight: 800,
            fontSize: 13, cursor: "pointer",
          }}>
          ↺ {t(E, "Reset", "초기화")}
        </button>
      </div>

      <div style={{
        marginTop: 14, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.55,
      }}>
        {t(E,
          "After 3 rounds, this is the lineup the problem GIVES you. To recover the original (round 0), apply the inverse shuffle 3 times.",
          "3 라운드가 지난 모습이 문제에서 주어지는 줄이에요. 원래 줄(라운드 0)로 되돌리려면 역셔플을 3 번 적용해요.")}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "shuffle = list(map(int, input().split()))",
  "# Convert to 0-indexed",
  "shuffle = [s - 1 for s in shuffle]",
  "",
  "cows = list(map(int, input().split()))",
  "",
  "# Build inverse permutation",
  "inv = [0] * N",
  "for i in range(N):",
  "    inv[shuffle[i]] = i",
  "",
  "# Apply inverse permutation 3 times",
  "result = cows[:]",
  "for _ in range(3):",
  "    temp = [0] * N",
  "    for i in range(N):",
  "        temp[i] = result[inv[i]]",
  "    result = temp",
  "",
  "for x in result:",
  "    print(x)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a line. A 'shuffle' is a permutation that moves each cow at position i to position shuffle[i]. The shuffle has been applied THREE times in a row, and we're given the final lineup.\nRecover the original lineup before any shuffles.",
        "한 줄로 선 N마리 소가 있어요. '셔플' 은 위치 i 의 소를 shuffle[i] 위치로 옮기는 순열이에요. 이 셔플이 연속으로 세 번 적용된 뒤의 줄이 주어져요.\n셔플이 일어나기 전 원래 줄을 복원해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>The Bovine Shuffle</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Recover the original lineup before any shuffles, given the lineup after 3 applications.",
                "셔플 3 번 후의 줄에서 원래 줄을 복원해 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows in a line", "한 줄로 선 N마리 소")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "shuffle permutation", "셔플 순열")}</b>
                  {t(E, " is given — it moves the cow at position i to position shuffle[i].",
                        " 가 주어져요 — 위치 i 의 소를 shuffle[i] 위치로 옮겨요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the lineup ", "주어지는 줄은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "AFTER 3 shuffles", "셔플 3 번 후")}</b>
                  {t(E, ".", " 의 모습이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "original lineup before any shuffles", "셔플 전 원래 줄")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Interactive sim — step the shuffle round-by-round
    {
      type: "reveal",
      narr: t(E,
        "Before reading code, see the shuffle in motion. Click 'Apply shuffle' a few times — watch which cows land where, and notice how the lineup at round 3 is what the problem gives you.",
        "코드를 읽기 전에 셔플이 움직이는 모습을 봐요. 'Apply shuffle' 을 몇 번 눌러서 어느 소가 어디로 가는지, 라운드 3 의 모습이 문제에서 주는 줄과 같다는 걸 확인해요."),
      content: <PermShuffleSim E={E} />,
    },
    // 1-3: quiz
    {
      type: "quiz",
      narr: t(E,
        "Permutation [2,1] is self-inverse: applying it once swaps positions 1 and 2.\nHow many times is the shuffle applied in this problem?", "순열 [2,1]은 자기역순열이야: 한 번 적용하면 위치 1과 2를 교환해요. 이 문제에서 셔플을 몇 번 적용해요?"),
      question: t(E,
        "How many times is the shuffle applied in the problem?",
        "문제에서 셔플을 몇 번 적용해요?"),
      options: [
        t(E, "3 times", "3번"),
        t(E, "1 time", "1번"),
        t(E, "N times", "N번"),
      ],
      correct: 0,
      explain: t(E,
        "The problem states the shuffle is applied exactly 3 times. So we undo it by applying the inverse 3 times.",
        "문제에서 셔플을 정확히 3번 적용한다고 해요. 그래서 역순열을 3번 적용해서 되돌려."),
    },
    // 1-4: input
    {
      type: "input",
      narr: t(E,
        "The shuffle is applied exactly how many times? Enter the number.", "셔플은 정확히 몇 번 적용돼요? 숫자를 입력해요."),
      question: t(E,
        "How many times is the shuffle applied?",
        "셔플은 몇 번 적용돼요?"),
      hint: t(E,
        "Re-read the problem statement — how many shuffles are applied?",
        "문제를 다시 읽어 봐 — 셔플이 몇 번 적용돼?"),
      answer: 3,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Given lineup AFTER 3 shuffles → recover original by building INVERSE shuffle and applying it 3 times. Sections build it one piece at a time.",
        "셔플 3 번 후 줄이 주어짐 → 역셔플을 만들고 3 번 적용해 원래 줄 복원. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBovShuffleSections(E),
    },
  ];
}
