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
            "셔플이 어떻게 움직이는지 봐요. 위치 i 의 소가 shuffle[i] 위치로 옮겨 가요. '셔플 적용' 을 누르면 한 라운드씩 나아가요.")}
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
          ↺ {t(E, "Reset", "처음으로")}
        </button>
      </div>

      <div style={{
        marginTop: 14, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.55,
      }}>
        {t(E,
          "After 3 rounds, this is the lineup the problem GIVES you. To recover the original (round 0), apply the inverse shuffle 3 times.",
          "3 라운드가 지난 모습이 문제에서 주어지는 줄이에요. 원래 줄(라운드 0)로 되돌리려면 반대 셔플, 즉 셔플을 거꾸로 하는 것을 3 번 하면 돼요.")}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Recover the original lineup from just the result after 3 shuffles.",
        "셔플을 세 번 한 줄만 보고 원래 줄을 되찾아 봐요."),
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
                "셔플을 3 번 한 줄을 보고 원래 줄을 되찾아 출력해요.")}
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
    // 1-2: 입출력 형식 + 제약 (USACO 원문, usaco.org cpid=760) — 시즌 표준(photoshoot25) 형식
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? N, then the shuffle rule, then the lineup AFTER 3 shuffles.",
        "입력은 N, 셔플 규칙, 셔플 3번 후의 줄 순서로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>a[1] a[2] ... a[N]</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— shuffle rule: cow at position i moves to position a[i]", "— 셔플 규칙: 위치 i 의 소가 a[i] 위치로")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>id[1] id[2] ... id[N]</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— cow IDs AFTER 3 shuffles", "— 셔플 3번 후의 소 ID 줄")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "N lines — one cow ID per line, the lineup BEFORE any shuffles.",
                  "N줄 — 한 줄에 소 ID 하나씩, 셔플 전 원래 줄을 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "cow IDs are distinct 7-digit integers", "소 ID는 서로 다른 7자리 정수예요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-3: Interactive sim — step the shuffle round-by-round
    {
      type: "reveal",
      narr: t(E,
        "Click 'Apply shuffle' to see which cow lands where.",
        "'셔플 적용' 을 눌러 어느 소가 어디로 가는지 봐요."),
      content: <PermShuffleSim E={E} />,
    },
    // 1-3: quiz
    {
      type: "quiz",
      narr: t(E,
        "Before we undo anything, pin down how many times the shuffle was applied.", "되돌리기 전에 셔플을 몇 번 했는지부터 확인해요."),
      question: t(E,
        "How many times is the shuffle applied in the problem?",
        "문제에서 셔플을 몇 번 한다고 했나요?"),
      options: [
        t(E, "3 times", "3번"),
        t(E, "1 time", "1번"),
        t(E, "N times", "N번"),
      ],
      correct: 0,
      explain: t(E,
        "The problem states the shuffle is applied exactly 3 times. So we undo it by applying the inverse 3 times.",
        "문제에서 셔플을 정확히 3 번 한다고 했어요.\n그러니 반대 셔플도 3 번 해야 원래 줄로 돌아와요."),
    },
    // 1-4: input
    {
      type: "input",
      narr: t(E,
        "The shuffle is applied exactly how many times? Enter the number.", "셔플을 몇 번 하는지 숫자로 적어 봐요."),
      question: t(E,
        "How many times is the shuffle applied?",
        "셔플을 몇 번 하나요?"),
      hint: t(E,
        "Re-read the problem statement — how many shuffles are applied?",
        "문제를 다시 읽어 봐요. 셔플을 몇 번 한다고 했나요?"),
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
        "반대 셔플을 만들어 3 번 하면 원래 줄이 나와요."),
      sections: getBovShuffleSections(E),
    },
  ];
}
