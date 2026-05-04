import { C, t } from "@/components/quest/theme";
import { getWhereAmISections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "s = input().strip()",
  "",
  "for K in range(1, N + 1):",
  "    substrings = set()",
  "    unique = True",
  "    for i in range(N - K + 1):",
  "        sub = s[i:i+K]",
  "        if sub in substrings:",
  "            unique = False",
  "            break",
  "        substrings.add(sub)",
  "    if unique:",
  "        print(K)",
  "        break",
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
        background: hl && hl.includes(i) ? "rgba(249,115,22,.15)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fdba74" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Bessie lives on a street with mailboxes, each labeled A-Z.\nShe wants to figure out her location by looking at K consecutive labels.\nLet's find the smallest K!", "베시는 각 우편함에 A-Z 라벨이 붙은 길에 살아. K개의 연속된 라벨을 보고 자기 위치를 알고 싶어. 가장 작은 K를 찾아보자!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"📍"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.carry }}>Where Am I?</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #2</div>
          <div style={{ marginTop: 12, background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Given a string of N mailbox labels (A-Z),\nfind the minimum K such that every substring of length K is unique.", "N개의 우편함 라벨 문자열(A-Z)이 주어질 때,\n길이 K인 모든 부분문자열이 고유한 최소 K를 구해요.")}
          </div>
        </div>),
    },
    // 1-2: What is a substring?
    {
      type: "reveal",
      narr: t(E,
        "First, what IS a substring?\nIt's a consecutive chunk of characters from the string.\nLike a sliding window!", "먼저 부분문자열이 뭘까? 문자열에서 연속된 글자 묶음이예요. 슬라이딩 윈도우처럼!"),
      content: (() => {
        const str = "ABCBA";
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Substrings of \"ABCBA\"", "\"ABCBA\"의 부분문자열")}
            </div>
            {/* Original string display */}
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 12 }}>
              {str.split("").map((ch, i) => (
                <div key={i} style={{
                  width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontSize: 18, fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: C.carryBg, border: `2.5px solid ${C.carryBd}`, color: C.carry,
                }}>{ch}</div>
              ))}
            </div>
            {/* K=1 examples */}
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              K=1: {t(E, "each single letter", "각 글자 하나")}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {["A","B","C","B","A"].map((s, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800,
                  background: C.accentBg, borderRadius: 4, padding: "2px 6px", color: C.accent,
                }}>{s}</span>
              ))}
            </div>
            {/* K=2 examples */}
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              K=2: {t(E, "each pair of consecutive letters", "연속 2글자씩")}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {["AB","BC","CB","BA"].map((s, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800,
                  background: C.okBg, borderRadius: 4, padding: "2px 6px", color: C.ok,
                }}>{s}</span>
              ))}
            </div>
            {/* K=3 examples */}
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              K=3: {t(E, "each group of 3", "연속 3글자씩")}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["ABC","BCB","CBA"].map((s, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800,
                  background: C.bessieBg, borderRadius: 4, padding: "2px 6px", color: C.bessie,
                }}>{s}</span>
              ))}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Sliding window visual
    {
      type: "reveal",
      narr: t(E,
        "Think of it like a window sliding across the string!\nThe window size is K, and it moves one position at a time.", "문자열 위를 슬라이드하는 창문이라고 생각해요! 창문 크기가 K이고, 한 칸씩 움직여."),
      content: (() => {
        const str = "ABAB";
        const windows = [
          { start: 0, sub: "AB" },
          { start: 1, sub: "BA" },
          { start: 2, sub: "AB" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Sliding window K=2 on \"ABAB\"", "\"ABAB\"에서 K=2 슬라이딩 윈도우")}
            </div>
            {windows.map((w, wi) => (
              <div key={wi} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 4 }}>
                  {str.split("").map((ch, ci) => {
                    const inWindow = ci >= w.start && ci < w.start + 2;
                    return (
                      <div key={ci} style={{
                        width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 8, fontSize: 18, fontWeight: 900,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: inWindow ? C.carry : "#f1f5f9",
                        border: `2.5px solid ${inWindow ? C.carry : C.border}`,
                        color: inWindow ? "#fff" : C.dim,
                        transition: "all .3s",
                      }}>{ch}</div>
                    );
                  })}
                  <span style={{
                    display: "flex", alignItems: "center", fontSize: 13, fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace", color: C.carry, marginLeft: 8,
                  }}>= "{w.sub}"</span>
                </div>
              </div>
            ))}
            <div style={{
              background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10,
              padding: 10, textAlign: "center", fontSize: 13, fontWeight: 800, color: C.no,
            }}>
              {t(E, "\"AB\" appears at position 0 AND position 2 -- duplicate! K=2 fails!", "\"AB\"가 위치 0과 위치 2에 -- 중복! K=2 실패!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — K=2 on "ABAB"
    {
      type: "quiz",
      narr: t(E,
        "We just saw that K=2 on \"ABAB\" has duplicates. Let's make sure you understand why!", "방금 \"ABAB\"에서 K=2가 중복이 있다는 걸 봤어. 왜 그런지 확인해보자!"),
      question: t(E,
        "\"ABAB\", K=2. Substrings: AB, BA, AB. Why does K=2 fail?",
        "\"ABAB\", K=2. 부분문자열: AB, BA, AB. K=2가 왜 실패해요?"),
      options: [
        t(E, "Because \"BA\" only appears once", "\"BA\"가 한 번만 나타나니까"),
        t(E, "Because \"AB\" appears twice (duplicate!)", "\"AB\"가 두 번 나타나니까 (중복!)"),
        t(E, "Because there are only 3 substrings", "부분문자열이 3개밖에 없으니까"),
      ],
      correct: 1,
      explain: t(E,
        "Right! \"AB\" appears at positions 0-1 and 2-3. Duplicate means two different locations look the same -- Bessie can't tell where she is!",
        "맞아! \"AB\"가 위치 0-1과 2-3에 나타나. 중복이면 두 위치가 같아 보여서 베시가 자기 위치를 모르게 돼요!"),
    },
    // 1-5: Visual — K=3 on "ABAB" — all unique!
    {
      type: "reveal",
      narr: t(E,
        "Now let's try K=3 on the same string \"ABAB\". Are all substrings unique this time?", "이제 같은 문자열 \"ABAB\"에서 K=3을 시도해보자. 이번엔 모든 부분문자열이 고유할까?"),
      content: (() => {
        const str = "ABAB";
        const windows = [
          { start: 0, sub: "ABA" },
          { start: 1, sub: "BAB" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Sliding window K=3 on \"ABAB\"", "\"ABAB\"에서 K=3 슬라이딩 윈도우")}
            </div>
            {windows.map((w, wi) => (
              <div key={wi} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
                  {str.split("").map((ch, ci) => {
                    const inWindow = ci >= w.start && ci < w.start + 3;
                    return (
                      <div key={ci} style={{
                        width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 8, fontSize: 18, fontWeight: 900,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: inWindow ? C.ok : "#f1f5f9",
                        border: `2.5px solid ${inWindow ? C.ok : C.border}`,
                        color: inWindow ? "#fff" : C.dim,
                      }}>{ch}</div>
                    );
                  })}
                  <span style={{
                    display: "flex", alignItems: "center", fontSize: 13, fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace", color: C.ok, marginLeft: 8,
                  }}>= "{w.sub}"</span>
                </div>
              </div>
            ))}
            <div style={{
              background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, textAlign: "center", fontSize: 13, fontWeight: 800, color: C.ok,
            }}>
              {t(E, "\"ABA\" and \"BAB\" -- all different! K=3 works!", "\"ABA\"와 \"BAB\" -- 모두 다르다! K=3 성공!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-6: Quiz — minimum K for "ABAB"
    {
      type: "quiz",
      narr: t(E,
        "We saw K=1 has duplicates (A appears twice), K=2 has duplicates (AB appears twice), K=3 is all unique.\nWhat's the minimum K?", "K=1은 중복(A가 두 번), K=2도 중복(AB가 두 번), K=3은 모두 고유. 최소 K는?"),
      question: t(E,
        "\"ABAB\": what is the minimum K for all unique substrings?",
        "\"ABAB\": 모든 부분문자열이 고유한 최소 K는?"),
      options: [
        t(E, "K = 1", "K = 1"),
        t(E, "K = 2", "K = 2"),
        t(E, "K = 3", "K = 3"),
        t(E, "K = 4", "K = 4"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! K=1 and K=2 have duplicates. K=3 is the first where all substrings are unique. Answer: 3.",
        "정답! K=1과 K=2는 중복이 있어요. K=3이 모든 부분문자열이 고유한 첫 번째. 답: 3."),
    },
    // 1-7: Input — try another string
    {
      type: "input",
      narr: t(E,
        "Now try \"AABB\".\nK=1: A,A,B,B (duplicates!).\nK=2: AA,AB,BB (all unique!).\nWhat's the minimum K?", "이제 \"AABB\"를 해봐요. K=1: A,A,B,B (중복!). K=2: AA,AB,BB (모두 고유!). 최소 K는?"),
      question: t(E,
        "\"AABB\" -> minimum K for unique substrings?",
        "\"AABB\" -> 유일한 부분문자열을 위한 최소 K?"),
      hint: t(E,
        "K=1: A, A, B, B (A repeats). K=2: AA, AB, BB (all different!). Answer: 2.",
        "K=1: A, A, B, B (A 반복). K=2: AA, AB, BB (모두 다름!). 답: 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 알고리즘 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh2(E) {
  return [
    // 2-1: Algorithm idea
    {
      type: "reveal",
      narr: t(E,
        "The algorithm is simple: try K=1, then K=2, then K=3...\nFor each K, check if ALL substrings of that length are unique.\nStop at the first K that works!", "알고리즘은 간단해: K=1, K=2, K=3... 순서대로 시도. 각 K에서 그 길이의 모든 부분문자열이 고유한지 확인. 처음 성공하는 K에서 멈춰요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
            {t(E, "Algorithm: Try K = 1, 2, 3, ...", "알고리즘: K = 1, 2, 3, ... 시도")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3].map(k => {
              const ok = k === 3;
              return (
                <div key={k} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: ok ? C.okBg : C.noBg,
                  border: `2px solid ${ok ? C.okBd : C.noBd}`,
                  borderRadius: 10, padding: "8px 12px",
                }}>
                  <div style={{
                    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8, fontSize: 16, fontWeight: 900,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: ok ? C.ok : C.no, color: "#fff",
                  }}>K={k}</div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 700 }}>
                    {k === 1 && t(E, "A, B, A, B -- A repeats! FAIL", "A, B, A, B -- A 반복! 실패")}
                    {k === 2 && t(E, "AB, BA, AB -- AB repeats! FAIL", "AB, BA, AB -- AB 반복! 실패")}
                    {k === 3 && t(E, "ABA, BAB -- all unique! STOP!", "ABA, BAB -- 모두 고유! 멈춰요!")}
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 18 }}>
                    {ok ? "✅" : "❌"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>),
    },
    // 2-2: How to check uniqueness — using a Set
    {
      type: "reveal",
      narr: t(E,
        "How do we check if substrings are unique?\nUse a SET!\nA set only stores unique items.\nIf we try to add a substring that already exists, we found a duplicate!", "부분문자열이 고유한지 어떻게 확인할까? SET을 써요! 집합은 고유한 항목만 저장해요. 이미 있는 부분문자열을 추가하려고 하면 중복을 찾은 거예요!"),
      content: (() => {
        const trace = [
          { sub: "AB", set: ["AB"], dup: false },
          { sub: "BA", set: ["AB", "BA"], dup: false },
          { sub: "AB", set: ["AB", "BA"], dup: true },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Checking K=2 on \"ABAB\" with a Set", "\"ABAB\"에서 K=2를 Set으로 확인")}
            </div>
            <div style={{
              background: "#1e293b", borderRadius: 10, padding: 12, fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {trace.map((step, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
                  padding: "4px 8px", borderRadius: 6,
                  background: step.dup ? "rgba(220,38,38,.15)" : "transparent",
                }}>
                  <span style={{ color: "#9ca3af", width: 16 }}>{i + 1}.</span>
                  <span style={{ color: step.dup ? "#fca5a5" : "#e2e8f0" }}>
                    sub = "{step.sub}"
                  </span>
                  <span style={{ color: step.dup ? C.no : "#6ee7b7", fontWeight: 800 }}>
                    {step.dup
                      ? t(E, "IN set! Duplicate!", "set에 있어요! 중복!")
                      : t(E, "add to set", "set에 추가")}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
              {t(E,
                "Set = {AB, BA}.\nWhen we try \"AB\" again, it's already there! So K=2 has duplicates.", "Set = {AB, BA}.\n\"AB\"를 다시 넣으려 하면 이미 있어요! 그래서 K=2는 중복이 있어요.")}
            </div>
          </div>
        );
      })(),
    },
    // 2-3: Full trace table for K=1,2,3
    {
      type: "reveal",
      narr: t(E,
        "Let's trace through the entire algorithm for \"ABAB\". We check K=1, K=2, K=3 one by one.", "\"ABAB\" 전체 알고리즘을 추적해보자. K=1, K=2, K=3을 하나씩 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
            {t(E, "Full trace: \"ABAB\"", "전체 추적: \"ABAB\"")}
          </div>
          {/* Trace table */}
          <div style={{
            borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`,
            fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
          }}>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "50px 1fr 80px",
              background: "#1e293b", color: "#e2e8f0", padding: "6px 8px", fontWeight: 800,
            }}>
              <span>K</span>
              <span>{t(E, "Substrings", "부분문자열")}</span>
              <span>{t(E, "Unique?", "고유?")}</span>
            </div>
            {/* K=1 */}
            <div style={{
              display: "grid", gridTemplateColumns: "50px 1fr 80px",
              background: C.noBg, padding: "6px 8px", borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ fontWeight: 800, color: C.no }}>1</span>
              <span style={{ color: C.text }}>A, B, <span style={{ color: C.no, fontWeight: 800 }}>A</span>, B</span>
              <span style={{ color: C.no, fontWeight: 800 }}>❌ {t(E, "No", "아니오")}</span>
            </div>
            {/* K=2 */}
            <div style={{
              display: "grid", gridTemplateColumns: "50px 1fr 80px",
              background: C.noBg, padding: "6px 8px", borderBottom: `1px solid ${C.border}`,
            }}>
              <span style={{ fontWeight: 800, color: C.no }}>2</span>
              <span style={{ color: C.text }}>AB, BA, <span style={{ color: C.no, fontWeight: 800 }}>AB</span></span>
              <span style={{ color: C.no, fontWeight: 800 }}>❌ {t(E, "No", "아니오")}</span>
            </div>
            {/* K=3 */}
            <div style={{
              display: "grid", gridTemplateColumns: "50px 1fr 80px",
              background: C.okBg, padding: "6px 8px",
            }}>
              <span style={{ fontWeight: 800, color: C.ok }}>3</span>
              <span style={{ color: C.text }}>ABA, BAB</span>
              <span style={{ color: C.ok, fontWeight: 800 }}>✅ {t(E, "Yes!", "예!")}</span>
            </div>
          </div>
          <div style={{
            marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: C.ok,
          }}>
            {t(E, "Answer: K = 3", "답: K = 3")}
          </div>
        </div>),
    },
    // 2-4: Complexity explanation
    {
      type: "reveal",
      narr: t(E,
        "What's the time complexity?\nWe try up to N values of K.\nFor each K, we check N-K+1 substrings.\nTotal: O(N^2) with hashing.", "시간 복잡도는? K를 최대 N개 시도. 각 K에서 N-K+1개 부분문자열 확인. 총: 해싱으로 O(N^2)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: C.carry, fontFamily: "'JetBrains Mono', monospace" }}>
            O(N{"\u00b2"})
          </div>
          <div style={{ marginTop: 12, background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Outer loop: K from 1 to N (max N iterations).\nInner loop: check N-K+1 substrings. With hash set, each check is O(1). Total: O(N^2). N <= 100, so this is fast enough!", "바깥 반복: K를 1부터 N까지 (최대 N번).\n안쪽 반복: N-K+1개 부분문자열 확인. 해시 집합으로 각 확인 O(1). 총: O(N^2). N <= 100이라 충분히 빨라요!")}
          </div>
        </div>),
    },
    // 2-5: Hand calculation
    {
      type: "input",
      narr: t(E,
        "Try \"AABBA\". K=1: A,A,B,B,A (duplicates). K=2: AA,AB,BB,BA (all unique!). Answer?", "\"AABBA\"를 해봐요. K=1: A,A,B,B,A (중복). K=2: AA,AB,BB,BA (모두 고유!). 답은?"),
      question: t(E,
        "\"AABBA\" -> minimum K?",
        "\"AABBA\" -> 최소 K?"),
      hint: t(E,
        "K=1 has duplicates (A and B repeat). K=2: AA, AB, BB, BA -- all different! Answer: 2.",
        "K=1은 중복(A, B 반복). K=2: AA, AB, BB, BA -- 모두 다름! 답: 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code step by step! First, read N and the string s from input.", "코드를 한 단계씩 만들어보자! 먼저 입력에서 N과 문자열 s를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N (number of mailboxes). Second line: the string of labels.",
              "첫 줄: N (우편함 수). 둘째 줄: 라벨 문자열.")}
          </div>
          <CodeSnippet lines={["N = int(input())", "s = input().strip()"]} highlight={[0, 1]} />
          <div style={{
            marginTop: 10, background: C.carryBg, borderRadius: 8, padding: 8,
            border: `1.5px solid ${C.carryBd}`, fontSize: 12, color: C.text,
          }}>
            {t(E,
              "Example: N=4, s=\"ABAB\"",
              "예시: N=4, s=\"ABAB\"")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Outer loop: try each K
    {
      type: "reveal",
      narr: t(E,
        "Next, the outer loop: try K from 1 to N. We'll check each K value.", "다음은 바깥 반복: K를 1부터 N까지 시도. 각 K 값을 확인할 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 2: Try each K", "2단계: 각 K 시도")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "s = input().strip()",
              "",
              "for K in range(1, N + 1):",
              "    substrings = set()",
              "    unique = True",
            ]}
            highlight={[3, 4, 5]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "For each K, we create a fresh empty set and assume unique=True until proven otherwise.",
              "각 K마다 빈 집합을 새로 만들고 중복이 발견될 때까지 unique=True로 가정해요.")}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Inner loop: check substrings
    {
      type: "reveal",
      narr: t(E,
        "Inside the K loop, we slide the window across the string.\nFor each substring, check if it's already in the set.", "K 반복 안에서 문자열을 따라 윈도우를 밀어. 각 부분문자열이 이미 집합에 있는지 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 3: Check each substring", "3단계: 각 부분문자열 확인")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "s = input().strip()",
              "",
              "for K in range(1, N + 1):",
              "    substrings = set()",
              "    unique = True",
              "    for i in range(N - K + 1):",
              "        sub = s[i:i+K]",
              "        if sub in substrings:",
              "            unique = False",
              "            break",
              "        substrings.add(sub)",
            ]}
            highlight={[6, 7, 8, 9, 10, 11]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "s[i:i+K] extracts K characters starting at position i. If it's already in the set, we found a duplicate!",
              "s[i:i+K]는 위치 i에서 K글자를 추출해요. 이미 집합에 있으면 중복을 찾은 거예요!")}
          </div>
        </div>),
    },
    // 3-4: Quiz — understanding the inner loop
    {
      type: "quiz",
      narr: t(E,
        "Quick check: in the inner loop, what does `range(N - K + 1)` represent?", "확인: 안쪽 반복에서 `range(N - K + 1)`은 무엇을 나타내?"),
      question: t(E,
        "What does range(N - K + 1) give us?",
        "range(N - K + 1)이 주는 건?"),
      options: [
        t(E, "The number of K-length substrings in the string", "문자열의 K길이 부분문자열 개수"),
        t(E, "The length of the string", "문자열의 길이"),
        t(E, "The number of unique characters", "고유 문자의 수"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A string of length N has exactly N-K+1 substrings of length K. For example, \"ABAB\" (N=4) with K=2 has 4-2+1 = 3 substrings.",
        "정답! 길이 N인 문자열에는 정확히 N-K+1개의 길이 K 부분문자열이 있어요. 예: \"ABAB\"(N=4)에서 K=2이면 4-2+1 = 3개."),
    },
    // 3-5: Step 4 — Print answer + full code
    {
      type: "reveal",
      narr: t(E,
        "Finally, if all substrings were unique for this K, print it and stop!\nThat's the complete solution!", "마지막으로, 이 K에서 모든 부분문자열이 고유하면 출력하고 멈춰요! 이게 전체 풀이예요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 4: Print and stop!", "4단계: 출력하고 멈춰요!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[18, 19, 20]}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `2px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: C.ok }}>
              {t(E, "Complete code! Just 11 lines!", "전체 코드 완성! 단 11줄!")}
            </div>
          </div>
        </div>),
    },
  ];
}
