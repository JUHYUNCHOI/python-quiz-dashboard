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
  /* 2026-09-09: 이 시뮬 마무리 문구(:104 근처)가 "26글자에 대해 한 번만 구해두면 끝" 이라고
     **이 문제의 핵심 알고리즘을 문제 탭에서** 미리 말했다. 학생이 그것 때문에
     "코드가 놀랍지 않았다" 고 했다. 같은 얘기가 코드 탭에서 두 번 더 나온다.
     조작을 한 번이라도 하면 그때 드러나게 한다 (mcc21carrots 와 같은 수법). */
  const [touched, setTouched] = useState(false);

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
            "규칙은 A[i] 를 B[i] 로 바꿔요. K번 적용하면 화살표를 K번 따라 뛰는 셈이에요. 글자와 K를 골라서 어디에 도착하는지 봐요.")}
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
              <button key={ch} onClick={() => { setTouched(true); setStart(ch); }} style={{
                width: 26, height: 26, borderRadius: 6, fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: start === ch ? "2px solid #059669" : "1px solid #a7f3d0",
                background: start === ch ? "#059669" : "#fff", color: start === ch ? "#fff" : "#065f46",
              }}>{ch}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#065f46", fontWeight: 600 }}>K =</span>
            <button onClick={() => { setTouched(true); setK(Math.max(0, k - 1)); }} style={kBtn}>−</button>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#059669", minWidth: 18, textAlign: "center" }}>{k}</span>
            <button onClick={() => { setTouched(true); setK(Math.min(7, k + 1)); }} style={kBtn}>+</button>
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

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
          {
            touched
              ? t(E,
                  "The rule never changes, so the same letter always hops the same path — its landing after K hops is fixed. Find that for all 26 letters once, and then any message, however long, is a single lookup per letter.",
                  "규칙이 늘 같으니 같은 글자는 늘 같은 길로 뛰어요.\n그래서 K번 뛴 뒤 도착지도 글자마다 하나로 정해져요.\n26글자만 한 번 구해 두면, 메시지가 아무리 길어도\n글자마다 표를 한 번 보면 끝나요.")
              : t(E,
                  "Try another letter, or change K. Does each letter always land somewhere fixed?",
                  "다른 글자도 눌러보고 K 도 바꿔봐요.\n글자마다 도착지가 늘 하나로 정해질까요?")}
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
/* 2026-09-09: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 사본이었다(화면은 components.jsx 의 FULL_PY 를 쓴다). MCC 36개에 같은 사본이 있고,
   안 쓰이니 아무도 안 봐서 선생님의 "한 줄에 여러 문장 쓰지 마라" 작업이 그것들만 건너뛰었다. */
export function makeMcc20CipherCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A substitution rule sends each letter A[i] to B[i]. You apply that rule to the message K times in a row.\nPrint the message after K applications.",
        "글자를 바꾸는 규칙을 K번 되풀이하면 메시지가 어떻게 될까요?"),
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
        "A 와 B 는 26글자 줄 두 개로 들어와 같은 자리끼리 짝을 지어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>S</b> — {t(E, "the message (lowercase)", "메시지 (소문자)")}</div>
              <div>• <b>K</b> — {t(E, "how many times to apply the rule", "규칙을 적용할 횟수")}</div>
              <div>• <b>A</b>, <b>B</b> — {t(E, "two permutations of a–z; A[i] → B[i]", "a–z 의 순열 두 개예요. A[i] 가 B[i] 로 바뀌어요.")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: |S| (S 의 길이) ≤ 100000, 1 ≤ K ≤ 100000.", "제약: |S| ≤ 100000, 1 ≤ K ≤ 100000.")}
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
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
            {t(E,
              /* 2026-09-09: 여기에 "c→…→e, t→…→p, e→…→a, j→…→l → epal" 트레이스가 통째로 있었다.
                 다음 쪽 시뮬이 바로 그 "글자 하나를 K번 따라가기" 를 손으로 해보는 자리인데
                 형식 카드가 답을 먼저 다 줬다. 학생은 "계산이 복잡해서 흘려봤다" 고 했다 —
                 읽을 이유가 없으면 안 읽는다. 답을 미루고 다음 쪽으로 넘긴다. */
              "Each letter of \"ctej\" follows its arrow twice. Why does that give \"epal\"? The next page lets you follow one letter at a time.",
              "\"ctej\" 의 각 글자가 화살표를 두 번 따라가요.\n왜 \"epal\" 이 될까요? 다음 쪽에서 글자 하나씩 따라가봐요.")}
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
        "Follow the arrow K times — that is the whole rule.",
        "화살표를 K번 따라가면 돼요. 그게 규칙 전부예요."),
      question: t(E,
        "Rule: a→b, b→c, c→a. Apply it to 'a' TWICE. What letter?",
        "규칙은 a→b, b→c, c→a 예요. 'a' 에 2번 적용하면 어떤 글자가 될까요?"),
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
        "메시지 전체를 K번 다시 쓰면 너무 느려요 — 더 빠른 길을 찾아봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: rewrite the whole message K times", "느림: 메시지 전체를 K번 다시 쓰기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "|S|×K ≈ 100000 × 100000 = 10^10 operations. Times out.", "|S|×K ≈ 100000 × 100000 = 10^10 번 계산해요. 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: precompute each letter's K-step landing", "빠름: 글자마다 K번 뛴 도착지를 미리 계산")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "26×K to build the table, then one pass over S. Total ≈ 26×100000 + 100000.", "표를 만드는 데 26×K, 그다음 S 를 한 번 훑어요. 합쳐서 ≈ 26×100000 + 100000 이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
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
