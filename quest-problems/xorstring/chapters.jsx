import { C, t } from "@/components/quest/theme";
import { getXorStringSections, TransformSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE (full program — verified 4 and 75497471)
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
   ═══════════════════════════════════════════════════════════════ */
export function makeXorStringCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Sum the beauty after k transforms over every substring of s.",
        "k번 변신한 뒤의 beauty 를 모두 더해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"⊕"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>XOR The String</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P6 · Lv5</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Add up g(substring) over every substring of s (length ≥ 2), then print it mod 998244353.",
                "s 의 모든 부분문자열(길이 ≥ 2)에 대해 g(부분문자열) 을 더해요.\n그 합을 998244353 으로 나눈 나머지를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#2563eb" }}>{t(E, "Transform", "변신")}</b>
                  {t(E, ": between every adjacent pair, insert their ", ": 이웃한 두 글자마다 그 사이에 ")}
                  <b>XOR</b>{t(E, " (same → 0, different → 1). A length-m string becomes ", " (같으면 0, 다르면 1) 을 끼워요. 길이 m 은 ")}
                  <b>2m − 1</b>{t(E, ".", " 이 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Beauty f(t)", "Beauty f(t)")}</b>
                  {t(E, ": how many neighboring pairs are ", ": 이웃한 두 글자가 ")}
                  <b>{t(E, "equal", "같은")}</b>{t(E, ".", " 쌍이 몇 개인지.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>g(t)</b>
                  {t(E, " = beauty AFTER transforming t exactly ", " = t 를 정확히 ")}
                  <b style={{ color: "#dc2626" }}>k</b>{t(E, " times.", " 번 변신시킨 뒤의 beauty.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 700, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "Σ g(s[l..r])", "Σ g(s[l..r])")}</b>
                  {t(E, " over all substrings of length ≥ 2, mod 998244353.", " 를 길이 ≥ 2 인 모든 부분문자열에 대해 더한 값, mod 998244353.")}
                </div>
              </div>
            </div>
          </div>

          {/* tiny worked example */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: C.text, lineHeight: 1.7, ...KA }}>
            <b style={{ color: "#2563eb" }}>{t(E, "Example transform: ", "변신 예시: ")}</b>
            <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>101</span>
            {t(E, " → insert 1⊕0=1 and 0⊕1=1 → ", " → 1⊕0=1, 0⊕1=1 끼워넣기 → ")}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#2563eb" }}>11011</span>
            {t(E, " (beauty 2: the two 11 pairs).", " (beauty 2: 11 쌍이 두 개).")}
          </div>
        </div>),
    },

    // 1-2: Input format + official samples
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the two official samples. Line 1 is n and k; line 2 is the binary string s.",
        "입력 형식과 공식 예제 두 개를 봐요. 첫 줄은 n 과 k, 둘째 줄은 이진 문자열 s 예요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1: ", "첫 줄: ")}<b>n k</b> — {t(E, "length of s, and the transform count", "s 의 길이, 변신 횟수")}</div>
              <div>• {t(E, "line 2: ", "둘째 줄: ")}<b>s</b> — {t(E, "a binary string (0/1) of length n", "길이 n 의 이진 문자열 (0/1)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 2 ≤ n ≤ 2·10^5, 0 ≤ k ≤ 10^18. Output the sum mod 998244353.",
                  "크기는 2 ≤ n ≤ 2·10^5, 0 ≤ k ≤ 10^18 이에요.\n합을 998244353 으로 나눈 나머지를 출력해요.")}
            </div>
          </div>

          {/* official samples */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {[
              { in1: "3 2", in2: "101", out: "4" },
              { in1: "2 30", in2: "00", out: "75497471" },
            ].map((ex, idx) => (
              <div key={idx} style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, flex: 1, minWidth: 70 }}>
                  <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "input", "입력")}</div>
                  <div>{ex.in1}</div>
                  <div>{ex.in2}</div>
                </div>
                <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, minWidth: 70, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
                  <div style={{ fontWeight: 800 }}>{ex.out}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
            {t(E,
              "In sample 2 the answer is a huge number taken mod 998244353 — a hint that even for tiny input the true count is astronomically large, because transforming 30 times blows the string up.",
              "예제 2 는 k = 30 이에요. 30번 변신하면 문자열이 어마어마하게 길어져요.\n그래서 입력이 짧아도 실제 답은 엄청나게 커요.\n예제 2 의 답이 998244353 으로 나눈 나머지로 적혀 있는 이유예요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the transform. Press it and watch the tiny string grow, and count its beauty each time.",
        "변신을 직접 느껴봐요. 눌러서 작은 문자열이 커지는 걸 보고, 매번 beauty 를 세어봐요."),
      content: <TransformSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Transform '10' once: insert 1 XOR 0 = 1 between them.",
        "'10' 을 한 번 변신하면 사이에 1 XOR 0 = 1 이 들어가요."),
      question: t(E,
        "Transforming '10' once gives '110'. What is its beauty (equal-adjacent pairs)?",
        "'10' 을 한 번 변신하면 '110' 이에요. '110' 의 beauty (이웃이 같은 쌍의 수) 는?"),
      options: [
        t(E, "1  (the '11' pair)", "1  ('11' 쌍 하나)"),
        t(E, "0  (no equal pairs)", "0  (같은 쌍 없음)"),
        t(E, "2  (both pairs)", "2  (두 쌍 모두)"),
      ],
      correct: 0,
      explain: t(E,
        "'110' has pairs (1,1) equal and (1,0) different → beauty = 1. Counting equal neighbors is exactly f(t).",
        "'110' 의 쌍은 (1,1) 은 같고 (1,0) 은 달라요.\n그래서 beauty = 1 이에요.\n이웃이 같은 쌍을 세는 게 바로 f(t) 예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeXorStringCh2(E, lang = "py") {
  return [
    // 2-1: slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "Don't build them — solve each pair with a formula instead.",
        "만들지 말고, 쌍마다 공식으로 바로 구해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: transform every substring k times", "느림: 모든 부분문자열을 k번 변신")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Two walls at once: there are ~n×n/2 substrings (up to 2·10^10), AND each transformed string doubles in length every time — for k = 10^18 it can never be built. Hopeless.",
                  "막히는 곳이 두 군데예요. 부분문자열이 ~n×n/2 개(최대 2·10^10) 나 돼요. 게다가 변신한 문자열은 한 번마다 길이가 두 배가 되는데, k = 10^18 이면 아예 만들 수가 없어요.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: per-pair formula × substring count", "빠름: 쌍별 공식 × 부분문자열 개수")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Each adjacent pair transforms independently. Its beauty after k steps has a closed form from the pair type (00 / 11 / 01) and two numbers: 2^k (2 multiplied by itself k times) and (-1)^k (+1 or −1, flipping each step). Weight the pair at i by i·(n−i) substrings. One pass: O(n).",
                  "이웃 쌍은 서로 상관없이 따로 변신해요. 그래서 k번 뒤 beauty 는 쌍 종류(00 / 11 / 01) 와 두 값 — 2^k(2를 k번 곱한 수), (-1)^k(한 번씩 걸러 +1, −1) — 만으로 공식이 나와요. 위치 i 의 쌍은 부분문자열 i·(n−i) 개에 들어가니 그만큼 곱해 더해요. 한 번만 훑으면 되니 O(n) 이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "↓ Next page: the fast code — read the why-notes first.", "↓ 다음 쪽에 빠른 코드 — 먼저 '왜 이렇게?' 노트를 읽어요.")}
          </div>
        </div>),
    },

    // 2-2: code
    {
      type: "xorstring-walk",
      narr: t(E,
        "Solution code — read the why-notes, then the code.", "풀이 코드 — '왜 이렇게?' 노트를 읽고 코드를 봐요."),
    },
  ];
}
