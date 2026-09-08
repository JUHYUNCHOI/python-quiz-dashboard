import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc19ElimSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: a sliding window over a binary string.
   The window may hold at most K zeros — those zeros get DELETED,
   so they are greyed out. The answer is the number of 1s inside
   the window (NOT the window length): the kept zeros disappear.
   Interactive: move the window (left/right) and adjust K.
   ───────────────────────────────────────────────────────────── */
const DEMO = "10110";

function ElimWindowSim({ E }) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(3);
  const [k, setK] = useState(1);

  const L = DEMO.length;
  const lo = Math.min(left, right);
  const hi = Math.max(left, right);

  // count zeros / ones inside [lo, hi]
  let zeros = 0, ones = 0;
  for (let i = lo; i <= hi; i++) {
    if (DEMO[i] === "0") zeros++; else ones++;
  }
  const winLen = hi - lo + 1;
  const valid = zeros <= k;

  const cell = (ch, idx) => {
    const inWin = idx >= lo && idx <= hi;
    const isZero = ch === "0";
    let bg = "#fff", bd = "#e2e4ec", color = "#94a3b8", extra = null;
    if (inWin && isZero) {
      // a zero inside the window is DELETED (greyed, struck through)
      bg = "#f1f5f9"; bd = "#cbd5e1"; color = "#94a3b8";
      extra = "del";
    } else if (inWin && !isZero) {
      // a one inside the window survives — it counts
      bg = "#dbeafe"; bd = "#2563eb"; color = "#1e3a8a";
    }
    return (
      <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{
          width: 44, height: 44, lineHeight: "44px", textAlign: "center",
          fontSize: 20, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
          background: bg, border: `2.5px solid ${bd}`, color, borderRadius: 8,
          textDecoration: extra === "del" ? "line-through" : "none",
          transition: "all .2s",
        }}>{ch}</div>
        <div style={{ height: 14, fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>
          {extra === "del" ? t(E, "del", "삭제") : ""}
        </div>
      </div>
    );
  };

  const stepBtn = (onClick, disabled, label) => (
    <button onClick={onClick} disabled={disabled} style={{
      width: 30, height: 30, borderRadius: 7, border: "1.5px solid #93c5fd",
      background: disabled ? "#f1f5f9" : "#fff", color: disabled ? "#cbd5e1" : "#2563eb",
      fontSize: 16, fontWeight: 800, cursor: disabled ? "not-allowed" : "pointer", lineHeight: 1,
    }}>{label}</button>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 8 }}>
          🪟 {t(E, "Window of 1s (delete the zeros inside)", "1들의 창 (안의 0은 지워요)")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Pick a stretch of the string. The zeros inside (up to K) get deleted, so the 1s squeeze together. What is left?",
            "문자열에서 한 구간을 골라요. 안의 0 은 (K 개까지) 지워지고, 1 들이 서로 붙어요.\n무엇이 남을까요?")}
        </div>

        {/* the string with the window */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
          {DEMO.split("").map((ch, idx) => cell(ch, idx))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>{t(E, "start", "시작")}</span>
            {stepBtn(() => setLeft(Math.max(0, lo - 1)), lo === 0, "−")}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#2563eb", minWidth: 16, textAlign: "center" }}>{lo}</span>
            {stepBtn(() => setLeft(Math.min(hi, lo + 1)), lo === hi, "+")}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>{t(E, "end", "끝")}</span>
            {stepBtn(() => setRight(Math.max(lo, hi - 1)), hi === lo, "−")}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#2563eb", minWidth: 16, textAlign: "center" }}>{hi}</span>
            {stepBtn(() => setRight(Math.min(L - 1, hi + 1)), hi === L - 1, "+")}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#7c3aed", fontWeight: 700 }}>K =</span>
            {stepBtn(() => setK(Math.max(0, k - 1)), k === 0, "−")}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#7c3aed", minWidth: 16, textAlign: "center" }}>{k}</span>
            {stepBtn(() => setK(Math.min(3, k + 1)), k === 3, "+")}
          </div>
        </div>

        {/* stats: window length vs ones */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
          {[
            { lbl: t(E, "window length", "창 길이"), val: winLen, color: "#94a3b8" },
            { lbl: t(E, "zeros deleted", "지운 0"), val: zeros, color: valid ? "#0f766e" : "#dc2626" },
            { lbl: t(E, "1s left = answer", "남은 1 = 답"), val: ones, color: "#2563eb" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 9.5, color: C.dim, fontWeight: 800, letterSpacing: 0.3, ...KA }}>{s.lbl}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono',monospace" }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* verdict */}
        <div style={{
          background: valid ? "#0f172a" : "#fef2f2",
          border: valid ? "none" : "1.5px solid #fca5a5",
          borderRadius: 8, padding: "10px 12px",
          fontSize: 12.5, lineHeight: 1.6,
          color: valid ? "#f8fafc" : "#b91c1c", ...KA,
        }}>
          {valid ? (
            <>
              {t(E, "Delete ", "0을 ")}<b style={{ color: "#fbbf24" }}>{zeros}</b>
              {t(E, " zero(s) → the ", " 개 지우면 → 창의 ")}<b style={{ color: "#93c5fd" }}>{ones}</b>
              {t(E, " ones become one run. ", " 개의 1이 한 덩어리로 이어져요. ")}
              {/* 2026-09-08: 여기에 "답은 창 길이가 아니라 1의 개수" 라는 **결론**이
                  처음부터 박혀 있었다. 쪽 내레이션·안내문에도 같은 말이 있어 세 군데에서
                  미리 나왔다. 학생이 창을 움직여 보고 스스로 알아챌 자리를 남긴다. */}
            </>
          ) : (
            <>
              {t(E, "This window holds ", "이 창엔 0이 ")}<b>{zeros}</b>
              {t(E, " zeros but K = ", "개인데 K = ")}<b>{k}</b>
              {t(E, ". Too many to delete — shrink the window or raise K.", ". 지우기엔 너무 많아요 — 창을 줄이거나 K를 올려요.")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (sliding window; answer = ones in window)
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "left = 0",
  "zero = 0     # zeros currently inside the window",
  "one = 0      # ones currently inside the window",
  "ans = 0",
  "",
  "for right in range(N):",
  "    if s[right] == '0':",
  "        zero += 1",
  "        while zero > K:          # too many zeros to delete",
  "            if s[left] == '0':",
  "                zero -= 1",
  "            else:",
  "                one -= 1",
  "            left += 1",
  "    else:",
  "        one += 1",
  "        ans = max(ans, one)      # count ONES, not length",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   [title+미션+문제] → [입력형식+공식예제] → [개념 시뮬] → [이해 퀴즈]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "You are given a binary string and a limit K. You may DELETE at most K zeros; the leftover characters squeeze back into one string.\nPrint the longest run of consecutive 1s you can make.",
        "이진 문자열과 한계 K 가 주어져요. 최대 K 개의 0 을 지울 수 있어요; 남은 문자들은 다시 한 줄로 붙어요.\n만들 수 있는 가장 긴 연속 1 의 길이를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔢</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>Elimination</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P5</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Delete at most K zeros, then print the longest run of consecutive 1s.",
                "최대 K 개의 0 을 지운 뒤, 가장 긴 연속 1 의 길이를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "binary string of length N", "길이 N 의 이진 문자열")}</b>
                  {t(E, " and a limit ", " 과 한계 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You may ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "delete at most K zeros", "0 을 최대 K 개 지우기")}</b>
                  {t(E, ". The remaining characters close up into one string — the deleted zeros are gone for good.",
                        " 가능. 남은 문자들이 한 줄로 붙어요 — 지운 0 은 완전히 사라져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "longest run of consecutive 1s", "가장 긴 연속 1 의 길이")}</b>
                  {t(E, " you can make.", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The first line gives N and K; the second line is the binary string.",
        "입력 형식과 공식 예제를 봐요. 첫 줄에 N 과 K, 둘째 줄에 이진 문자열이 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0f9ff", border: "1px solid #7dd3fc", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1: ", "1번째 줄: ")}<b>N K</b> — {t(E, "string length and delete limit", "문자열 길이와 삭제 한계")}</div>
              <div>• {t(E, "line 2: ", "2번째 줄: ")}<b>{t(E, "the binary string", "이진 문자열")}</b> ({t(E, "only 0s and 1s", "0 과 1 만")})</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Output: the longest run of consecutive 1s achievable.", "출력: 만들 수 있는 가장 긴 연속 1 의 길이.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 160 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>15 1</div>
              <div style={{ overflowX: "auto" }}>101111001110111</div>
            </div>
            <div style={{ background: "#0f172a", color: "#93c5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>6</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {/* 2026-09-08: 여기 계산이 **틀려 있었다.**
                "101111" 은 0 이 하나, 1 이 다섯이라 지워도 5 다 (6 이 아니다).
                6 이 나오는 구간은 "1110111" 이다 — 원문 설명("두 111 사이의 0 하나")과도 이쪽이 맞다.
                검산: s[8..14] = "1110111", 0 한 개, 1 여섯 개 → 6.
                전수 확인: 이 문자열·K=1 의 정답은 6, 그 구간은 s[8..14] 뿐이다. */}
            {t(E,
              "Look at the stretch \"1110111\" near the end. It holds one 0; delete it and six 1s line up: 6.",
              "뒤쪽의 \"1110111\" 을 봐요. 그 안에 0 이 하나 있어요.\n그 0 을 지우면 1 이 여섯 개 이어져요: 6.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      /* 2026-09-08: 이 narr 이 "답은 남은 1 의 개수 — 창의 길이가 아니에요" 라고
         **누르기 전에 결론부터** 말했다. 같은 문장이 시뮬 안내문·판정 박스에도 있어
         세 군데에서 미리 나왔다. 여기선 무엇을 해보라는 것만 말한다. */
      narr: t(E,
        "Slide the window and delete the zeros inside — what do you get?",
        "창을 움직이며 안의 0 을 지워봐요. 무엇이 남을까요?"),
      content: <ElimWindowSim E={E} />,
    },

    // 1-4: understanding quiz  (FIXED: answer is 3, not 4 — the kept zero is deleted, not counted)
    {
      type: "quiz",
      /* 2026-09-08: 여기 narr 에 **두 경우의 계산과 "최선 = 3" 이 그대로** 적혀 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 읽기만 해도 답을 알고 클릭한다.
         계산은 explain(정답을 고른 뒤 보이는 곳)으로 옮겼다. */
      narr: t(E,
        "s = \"10110\", K = 1. Which 0 would you delete?",
        "s = \"10110\", K = 1. 어느 0 을 지우면 좋을까요?"),
      question: t(E,
        "s = \"10110\", K = 1. Delete at most one 0. Longest run of consecutive 1s = ?",
        "s = \"10110\", K = 1. 0 을 최대 한 개 지워요. 가장 긴 연속 1 의 길이 = ?"),
      options: [
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "4", "4"),
      ],
      correct: 1,
      explain: t(E,
        "Delete the 0 at index 1 → \"1110\": three 1s in a row. Delete the 0 at index 4 → \"1011\": at most two. So 3 is the best. Note the window \"1011\" has length 4, but one of those characters was the deleted 0 — the deleted 0 does not count.",
        "인덱스 1 의 0 을 지우면 \"1110\" — 1 이 세 개 연속.\n인덱스 4 의 0 을 지우면 \"1011\" — 많아야 두 개.\n그래서 3 이 최선이에요.\n창 \"1011\" 은 길이가 4 지만 그중 하나는 지운 0 이에요 — 지운 0 은 세지 않아요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드
   [🐢 느림 vs 🚀 빠름 계획] → [단계별 코드]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every possible window and recounts each one: about N² work — too slow for a long string. The fast way slides one window across in a single pass, keeping the zero and one counts as it goes: N work.",
        "느린 방법은 가능한 모든 구간을 골라 매번 다시 세요: 약 N² 연산 — 긴 문자열엔 너무 느려요. 빠른 방법은 창 하나를 한 번에 훑으며 0 과 1 의 개수를 계속 유지해요: N 연산."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: check every window and recount", "느림: 모든 구간을 골라 매번 다시 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Every start × every end ≈ N² pairs, and each recounts its zeros and ones. Times out when N is large.", "모든 시작 × 모든 끝 ≈ N² 쌍, 게다가 매번 0 과 1 을 다시 세요. N 이 크면 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: one sliding window, counts kept live", "빠름: 창 하나로 개수를 실시간 유지")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Move right forward; if the window holds more than K zeros, move left until it doesn't. Keep 'one' as you go and take its max. One pass ≈ N.", "right 를 앞으로; 창의 0 이 K 를 넘으면 넘지 않을 때까지 left 를 옮겨요. 지나가며 'one' 을 유지하고 그 최댓값을 취해요. 한 번 훑기 ≈ N.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. The key line counts ONES, not the window length.",
        "풀이 코드 — 부분별로 읽어봐요. 핵심 줄은 창 길이가 아니라 1 의 개수를 세요."),
      sections: getMcc19ElimSections(E),
    },
  ];
}
