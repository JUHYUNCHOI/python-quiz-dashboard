import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc20CipherSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

// Small demo rule for the concept sim (a permutation of a–f).
//   a→c  b→a  c→d  d→f  e→e  f→b   →  cycle (a c d f b), fixed point e
const DEMO_SRC = "abcdef";
const DEMO_DST = "cadfeb";
const DEMO_STEP = {};
for (let i = 0; i < DEMO_SRC.length; i++) DEMO_STEP[DEMO_SRC[i]] = DEMO_DST[i];

/* ─────────────────────────────────────────────────────────────
   Concept sim: follow ONE letter as the rule is applied K times.
   Teaches: "apply K times" = hop along the arrow K times, and the
   only thing that matters is where each letter finally lands.
   ───────────────────────────────────────────────────────────── */
function CipherHopSim({ E }) {
  const [start, setStart] = useState("a");
  const [k, setK] = useState(2);

  // path of letters visited: start, step(start), step(step(start)), ...
  const path = [start];
  let cur = start;
  for (let i = 0; i < k; i++) { cur = DEMO_STEP[cur]; path.push(cur); }
  const landed = path[path.length - 1];

  const chip = (ch, kind) => (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 30, borderRadius: 8, fontFamily: "'JetBrains Mono',monospace",
      fontSize: 15, fontWeight: 800,
      border: kind === "final" ? "2px solid #059669" : "1.5px solid #6ee7b7",
      background: kind === "final" ? "#059669" : kind === "start" ? "#d1fae5" : "#fff",
      color: kind === "final" ? "#fff" : "#065f46",
    }}>{ch}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          🔁 {t(E, "Follow one letter K times", "한 글자를 K번 따라가기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "The rule sends A[i] → B[i]. Applying it K times just means hopping along the arrow K times. Pick a letter and a K, and watch where it lands.",
            "규칙은 A[i] → B[i] 로 보내요. K번 적용은 화살표를 K번 따라 뛰는 것뿐이에요. 글자와 K를 골라서 어디에 도착하는지 봐요.")}
        </div>

        {/* the rule shown as arrows */}
        <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "the rule (one application)", "규칙 (한 번 적용)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {DEMO_SRC.split("").map((ch) => (
            <span key={ch} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 2,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#065f46",
              border: "1px solid #a7f3d0", borderRadius: 6, padding: "2px 6px", background: "#fff" }}>
              <b>{ch}</b><span style={{ color: "#059669" }}>→</span><b style={{ color: "#7c3aed" }}>{DEMO_STEP[ch]}</b>
            </span>
          ))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#065f46", fontWeight: 600 }}>{t(E, "start:", "시작:")}</span>
            {DEMO_SRC.split("").map((ch) => (
              <button key={ch} onClick={() => setStart(ch)} style={{
                width: 26, height: 26, borderRadius: 6, fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: start === ch ? "2px solid #059669" : "1px solid #a7f3d0",
                background: start === ch ? "#059669" : "#fff", color: start === ch ? "#fff" : "#065f46",
              }}>{ch}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#065f46", fontWeight: 600 }}>K =</span>
            <button onClick={() => setK(Math.max(0, k - 1))} style={kBtn}>−</button>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#059669", minWidth: 18, textAlign: "center" }}>{k}</span>
            <button onClick={() => setK(Math.min(7, k + 1))} style={kBtn}>+</button>
          </div>
        </div>

        {/* the hop path */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10 }}>
          {path.map((ch, i) => (
            <span key={i} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 6 }}>
              {chip(ch, i === 0 ? "start" : i === path.length - 1 ? "final" : "mid")}
              {i < path.length - 1 && <span style={{ color: "#059669", fontWeight: 700 }}>→</span>}
            </span>
          ))}
        </div>

        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, ...KA }}>
          {t(E, "after ", "")}<b style={{ color: "#fbbf24" }}>{k}</b>{t(E, " applications: ", " 번 적용 후: ")}
          <b style={{ color: "#34d399" }}>'{start}'</b> → <b style={{ color: "#6ee7b7" }}>'{landed}'</b>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "So each letter has one final destination after K hops. Find that for all 26 letters once — then any message, however long, is a single lookup per character.",
            "그러니 각 글자는 K번 뛴 뒤 도착지가 하나로 정해져요. 26글자에 대해 이걸 한 번만 구해두면, 아무리 긴 메시지라도 글자마다 한 번의 조회로 끝나요.")}
        </div>
      </div>
    </div>
  );
}
const kBtn = {
  width: 26, height: 26, borderRadius: 6, border: "1px solid #a7f3d0", background: "#fff",
  color: "#065f46", fontSize: 16, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* ================================================================
   SOLUTION CODE  (fast: precompute each letter's K-step landing)
   ================================================================ */
export const SOLUTION_CODE = [
  "S = input().strip()",
  "K = int(input())",
  "A = input().strip()",
  "B = input().strip()",
  "",
  "# one application of the rule: A[i] turns into B[i]",
  "step = {}",
  "for i in range(26):",
  "    step[A[i]] = B[i]",
  "",
  "# where does each letter land after K applications?",
  "after = {}",
  "for c in 'abcdefghijklmnopqrstuvwxyz':",
  "    x = c",
  "    for _ in range(K):",
  "        x = step[x]",
  "    after[c] = x",
  "",
  "# rewrite the message in one pass",
  "print(''.join(after[c] for c in S))",
];

export function makeMcc20CipherCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A substitution rule sends each letter A[i] to B[i]. You apply that rule to the message K times in a row.\nPrint the message after K applications.",
        "치환 규칙이 각 글자 A[i] 를 B[i] 로 보내요. 이 규칙을 메시지에 연달아 K번 적용해요.\nK번 적용한 뒤의 메시지를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔐"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>Cipher</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P1</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Apply the substitution rule to the message K times, then print the result.",
                "치환 규칙을 메시지에 K번 적용한 결과를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two alphabet permutations ", "알파벳 순열 두 개 ")}
                  <b style={{ color: "#059669" }}>A</b>{t(E, " and ", " 와 ")}<b style={{ color: "#7c3aed" }}>B</b>
                  {t(E, " give the rule: the letter ", " 가 규칙을 줘요: 글자 ")}
                  <b style={{ color: "#059669" }}>A[i]</b>{t(E, " becomes ", " 는 ")}<b style={{ color: "#7c3aed" }}>B[i]</b>
                  {t(E, ".", " 로 바뀌어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Apply this rule to every letter of the message ", "이 규칙을 메시지의 모든 글자에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "K times in a row", "연달아 K번")}</b>
                  {t(E, ".", " 적용해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "message after K applications", "K번 적용한 뒤의 메시지")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "Read the input format and the official example. Notice A and B are read as two 26-letter lines — position i pairs them up.",
        "입력 형식과 공식 예제를 봐요. A 와 B 는 26글자 줄 두 개로 들어오고, 같은 위치 i 끼리 짝을 지어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>S</b> — {t(E, "the message (lowercase)", "메시지 (소문자)")}</div>
              <div>• <b>K</b> — {t(E, "how many times to apply the rule", "규칙을 적용할 횟수")}</div>
              <div>• <b>A</b>, <b>B</b> — {t(E, "two permutations of a–z; A[i] → B[i]", "a–z 의 순열 두 개; A[i] → B[i]")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: |S| ≤ 100000, 1 ≤ K ≤ 100000.", "제약: |S| ≤ 100000, 1 ≤ K ≤ 100000.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>ctej</div>
              <div>2</div>
              <div style={{ overflowX: "auto" }}>zyxwvutsrqponmlkjihgfedcba</div>
              <div style={{ overflowX: "auto" }}>cbafedihglkjonmrqputsxwvzy</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>epal</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Each letter of \"ctej\" follows its arrow twice: c→…→e, t→…→p, e→…→a, j→…→l, giving \"epal\".",
              "\"ctej\" 의 각 글자가 화살표를 두 번 따라가요: c→…→e, t→…→p, e→…→a, j→…→l → \"epal\".")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the rule. Pick a letter and a K, and follow the hops to its final landing spot.",
        "규칙을 직접 느껴봐요. 글자와 K를 골라 도착지까지 뛰는 걸 따라가요."),
      content: <CipherHopSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "If the rule is a→b, b→c, c→a, then applying it to 'a' three times gives: a→b→c→a. Back to 'a'.",
        "규칙이 a→b, b→c, c→a 이면, 'a' 에 3번 적용: a→b→c→a. 다시 'a' 로 돌아와요."),
      question: t(E,
        "Rule: a→b, b→c, c→a. Apply it to 'a' TWICE. What letter?",
        "규칙: a→b, b→c, c→a. 'a' 에 2번 적용하면 어떤 글자?"),
      options: [
        t(E, "c", "c"),
        t(E, "a", "a"),
        t(E, "b", "b"),
      ],
      correct: 0,
      explain: t(E,
        "a → b (once) → c (twice). Following the arrow K times is the whole idea.",
        "a → b (1번) → c (2번). 화살표를 K번 따라가는 게 핵심이에요."),
    },
  ];
}

export function makeMcc20CipherCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way rewrites the whole message K times: |S|×K work — up to 10^10, far too slow. The fast way asks each of the 26 letters where it lands after K hops (26×K work), then rewrites the message once.",
        "느린 방법은 메시지 전체를 K번 다시 써요: |S|×K 연산 — 최대 10^10, 너무 느려요. 빠른 방법은 26글자에게 'K번 뛰면 어디 도착?' 을 물어(26×K 연산) 표를 만들고, 메시지는 한 번만 다시 써요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: rewrite the whole message K times", "느림: 메시지 전체를 K번 다시 쓰기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "|S|×K ≈ 100000 × 100000 = 10^10 operations. Times out.", "|S|×K ≈ 100000 × 100000 = 10^10 연산. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: precompute each letter's K-step landing", "빠름: 글자별 K-스텝 도착지 미리 계산")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "26×K to build the table, then one pass over S. Total ≈ 26×100000 + 100000.", "표 만들기 26×K, 그다음 S 한 번 훑기. 합계 ≈ 26×100000 + 100000.")}
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
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc20CipherSections(E),
    },
  ];
}
