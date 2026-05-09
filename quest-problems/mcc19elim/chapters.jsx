import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc19ElimSections } from "./components";

/* ─────────────────────────────────────────────────────────────
   SlidingWindowSim — bilingual, step-through visualization of
   the two-pointer sliding window on "10110" with K=1.
   Shows how zero_count, left, right, and best evolve frame by
   frame so students can audit the algorithm one move at a time.
   ───────────────────────────────────────────────────────────── */
function SlidingWindowSim({ E }) {
  // Pre-computed trace of the algorithm on s="10110", K=1.
  // Each frame: { right, left, zc, best, note_en, note_ko }
  const S = "10110";
  const K = 1;
  const FRAMES = [
    { right: 0, left: 0, zc: 0, best: 1, en: "right=0, s[0]='1'. zeros in window = 0. best = 1.", ko: "right=0, s[0]='1'. 윈도우 0 개수 = 0. best = 1." },
    { right: 1, left: 0, zc: 1, best: 2, en: "right=1, s[1]='0'. zeros = 1 ≤ K. best = 2.", ko: "right=1, s[1]='0'. 0개수 = 1 ≤ K. best = 2." },
    { right: 2, left: 0, zc: 1, best: 3, en: "right=2, s[2]='1'. zeros still 1. best = 3.", ko: "right=2, s[2]='1'. 0개수 그대로 1. best = 3." },
    { right: 3, left: 0, zc: 1, best: 4, en: "right=3, s[3]='1'. zeros still 1. best = 4.", ko: "right=3, s[3]='1'. 0개수 그대로 1. best = 4." },
    { right: 4, left: 0, zc: 2, best: 4, en: "right=4, s[4]='0'. zeros = 2 > K → must shrink left.", ko: "right=4, s[4]='0'. 0개수 = 2 > K → 왼쪽을 줄여야 해요." },
    { right: 4, left: 1, zc: 2, best: 4, en: "shrink: s[left=0]='1' → zeros stays 2. left becomes 1.", ko: "줄이기: s[left=0]='1' → 0개수 그대로 2. left = 1." },
    { right: 4, left: 2, zc: 1, best: 4, en: "shrink: s[left=1]='0' → zeros = 1. left becomes 2. window OK.", ko: "줄이기: s[left=1]='0' → 0개수 = 1. left = 2. 윈도우 OK." },
    { right: 4, left: 2, zc: 1, best: 4, en: "window size = 4-2+1 = 3. best stays 4. ✅ Final answer = 4.", ko: "윈도우 크기 = 4-2+1 = 3. best 그대로 4. ✅ 최종 답 = 4." },
  ];

  const [i, setI] = useState(0);
  const f = FRAMES[i];

  const cellStyle = (idx) => {
    const inWin = idx >= f.left && idx <= f.right;
    const isLeft = idx === f.left;
    const isRight = idx === f.right;
    const isZero = S[idx] === "0";
    let bg = "#fff";
    let bd = "#e2e4ec";
    let color = "#475569";
    if (inWin) {
      bg = isZero ? "#fee2e2" : "#dbeafe";
      bd = isZero ? "#fca5a5" : "#93c5fd";
      color = isZero ? "#b91c1c" : "#1e3a8a";
    }
    if (isLeft || isRight) {
      bd = "#2563eb";
    }
    return {
      width: 44, height: 44, lineHeight: "44px", textAlign: "center",
      fontSize: 20, fontWeight: 800, fontFamily: "monospace",
      background: bg, border: `2.5px solid ${bd}`, color,
      borderRadius: 8, transition: "all .25s",
    };
  };

  const ptrLabel = (idx) => {
    const isL = idx === f.left;
    const isR = idx === f.right;
    if (isL && isR) return "L,R";
    if (isL) return "L";
    if (isR) return "R";
    return "";
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#1e3a8a", letterSpacing: 0.4, marginBottom: 4 }}>
          🪟 {t(E, "Sliding Window — step audit", "슬라이딩 윈도우 — 한 걸음씩 감사")}
        </div>
        <div style={{ fontSize: 12, color: "#1e3a8a", lineHeight: 1.5 }}>
          {t(E,
            "s = \"10110\", K = 1. Walk the two pointers one frame at a time and verify zero_count never stays above K.",
            "s = \"10110\", K = 1. 두 포인터를 한 프레임씩 움직이며 zero_count 가 K 를 절대 초과하지 않는지 확인해요.")}
        </div>
      </div>

      {/* String cells */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 4 }}>
        {S.split("").map((ch, idx) => (
          <div key={idx} style={cellStyle(idx)}>{ch}</div>
        ))}
      </div>
      {/* Pointer labels */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {S.split("").map((_, idx) => (
          <div key={idx} style={{
            width: 44, textAlign: "center", fontSize: 11, fontWeight: 800,
            color: "#2563eb", height: 16, lineHeight: "16px",
          }}>{ptrLabel(idx)}</div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
        {[
          { lbl: t(E, "right", "right"), val: f.right, color: "#2563eb" },
          { lbl: t(E, "left",  "left"),  val: f.left,  color: "#2563eb" },
          { lbl: t(E, "zeros", "0개수"), val: f.zc,    color: f.zc > K ? "#dc2626" : "#15803d" },
          { lbl: t(E, "best",  "best"),  val: f.best,  color: "#7c3aed" },
        ].map((s, k) => (
          <div key={k} style={{
            background: "#fff", border: `1.5px solid ${C.border}`,
            borderRadius: 10, padding: "8px 6px", textAlign: "center",
          }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, letterSpacing: 0.4 }}>{s.lbl}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{
        background: f.zc > K ? "#fef3c7" : "#f0fdfa",
        border: `1.5px solid ${f.zc > K ? "#fbbf24" : "#99f6e4"}`,
        borderRadius: 10, padding: "10px 14px", marginBottom: 12,
        fontSize: 13, color: f.zc > K ? "#92400e" : "#0f766e", lineHeight: 1.5,
      }}>
        <b>{t(E, "Frame", "프레임")} {i + 1}/{FRAMES.length}:</b> {t(E, f.en, f.ko)}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{
          padding: "8px 16px", borderRadius: 8, border: "1.5px solid #2563eb",
          background: i === 0 ? "#f1f5f9" : "#fff", color: i === 0 ? C.dim : "#2563eb",
          fontWeight: 800, cursor: i === 0 ? "not-allowed" : "pointer", fontSize: 13,
        }}>◀ {t(E, "Prev", "이전")}</button>
        <button onClick={() => setI(0)} style={{
          padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${C.border}`,
          background: "#fff", color: C.text, fontWeight: 700, cursor: "pointer", fontSize: 13,
        }}>↺ {t(E, "Reset", "처음")}</button>
        <button onClick={() => setI(Math.min(FRAMES.length - 1, i + 1))} disabled={i === FRAMES.length - 1} style={{
          padding: "8px 16px", borderRadius: 8, border: "1.5px solid #2563eb",
          background: i === FRAMES.length - 1 ? "#f1f5f9" : "#2563eb",
          color: i === FRAMES.length - 1 ? C.dim : "#fff",
          fontWeight: 800, cursor: i === FRAMES.length - 1 ? "not-allowed" : "pointer", fontSize: 13,
        }}>{t(E, "Next", "다음")} ▶</button>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "# Sliding window: find longest substring with at most K zeros",
  "left = 0",
  "zero_count = 0",
  "best = 0",
  "",
  "for right in range(N):",
  "    if s[right] == '0':",
  "        zero_count += 1",
  "    while zero_count > K:",
  "        if s[left] == '0':",
  "            zero_count -= 1",
  "        left += 1",
  "    best = max(best, right - left + 1)",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given a binary string of length N and a limit K, you may delete at most K zeros from the string. After deletion, the remaining characters re-pack into a single string.\nPrint the LONGEST run of consecutive 1s achievable.",
        "길이 N 의 이진 문자열과 한계 K 가 주어져요. 문자열에서 최대 K 개의 0 을 지울 수 있어요. 지운 뒤 남은 문자가 한 문자열로 재조합돼요.\n달성 가능한 가장 긴 연속 1 의 길이를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔢</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Elimination</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Print the longest run of consecutive 1s achievable after deleting at most K zeros.", "최대 K 개의 0 을 지운 뒤 달성 가능한 가장 긴 연속 1 의 길이를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "binary string of length N", "길이 N 의 이진 문자열")}</b>
                  {t(E, " and a limit ", " 와 한계 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You may ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "delete at most K zeros", "최대 K 개의 0 을 지우기")}</b>
                  {t(E, ". The remaining characters re-pack into a single string.",
                        " 가능. 지운 뒤 남은 문자가 한 문자열로 재조합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "LONGEST run of consecutive 1s achievable", "달성 가능한 가장 긴 연속 1 의 길이")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "String = \"10110\", K=1.\nIf we remove the 0 at position 2, we get \"11_10\" → \"1110\" streak of 4.\nOr remove pos 4: \"1011_\" → streak 3.\nBest is 4!", "문자열 = \"10110\", K=1.\n위치 2의 0을 제거하면 \"11_10\" → \"1110\" 연속 4.\n위치 4 제거: \"1011_\" → 연속 3.\n최선은 4!"),
      question: t(E,
        "\"10110\", K=1. What's the longest 1-streak after removing one 0?",
        "\"10110\", K=1. 0 하나를 제거한 후 가장 긴 1-연속은?"),
      options: [
        t(E, "3", "3"),
        t(E, "4", "4"),
        t(E, "5", "5"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Remove the 0 at index 2: window [0..3] = \"1_110\" has 4 ones with 1 zero removed.",
        "맞아! 인덱스 2의 0 제거: 윈도우 [0..3] = \"1_110\"에서 0 하나 제거로 1이 4개."),
    },
    // 1-3: Sliding-window deep audit sim
    {
      type: "reveal",
      narr: t(E,
        "Before coding, audit the sliding window one frame at a time. Watch how zero_count rises, and how left shrinks the moment it crosses K. The window after each move must always satisfy zero_count ≤ K.",
        "코드를 짜기 전에 슬라이딩 윈도우를 한 프레임씩 따라가요. zero_count 가 어떻게 늘고, K 를 넘는 순간 left 가 어떻게 줄이는지 봐요. 매 동작 뒤 윈도우는 항상 zero_count ≤ K 를 만족해야 해요."),
      content: <SlidingWindowSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "\"10110\", K=1. Maximum consecutive 1s after removing at most 1 zero?", "\"10110\", K=1. 최대 1개의 0을 제거한 후 최대 연속 1의 수?"),
      question: t(E,
        "\"10110\", K=1. Longest streak = ?",
        "\"10110\", K=1. 가장 긴 연속 = ?"),
      hint: t(E,
        "Find the longest window that contains at most 1 zero — that zero is the one you delete.",
        "0 이 최대 1 개 들어가는 가장 긴 구간을 찾아봐요 — 그 0 하나를 지우면 돼요."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Sliding window with two pointers. Expand the right side; if zeros in window > K, shrink left until back ≤ K. Track the maximum window size. Sections build it one piece at a time.",
        "투 포인터 슬라이딩 윈도우. 오른쪽으로 확장; 윈도우 안 0 의 수가 K 초과면 왼쪽을 줄여서 ≤ K. 최대 윈도우 크기 추적. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc19ElimSections(E),
    },
  ];
}
