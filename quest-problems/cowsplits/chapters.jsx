import { C, t } from "@/components/quest/theme";
import { getCowSplitsSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCowSplitsCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a string S of length 3N, built from N blocks. Each block is COW, OWC, or WCO. She can erase a square subsequence (Y+Y) per operation. Empty out S in as few ops as possible.",
        "Bessie 에게 길이 3N 의 문자열 S 가 있어요. N 개 블록으로 이뤄지고 각 블록은 COW / OWC / WCO 중 하나. 한 번의 연산마다 사각 부분수열 (Y+Y) 을 지워요. 가능한 적은 연산으로 S 를 비워봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Empty S by repeatedly removing square-string subsequences, minimizing the number of operations.",
                "사각 문자열 부분수열을 반복해서 지워 S 를 비우되 연산 횟수를 최소화.")}
            </div>
          </div>

          {/* ⚠️ Scope note */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            ⚠️ {t(E,
              "This tutorial covers only the k = 1 variant (output any M ≤ optimal + 1). The exact-optimum k = 0 case (where M = 2 is sometimes possible) is harder — see the official editorial.",
              "이 튜토리얼은 k = 1 변형 (M ≤ 최적값 + 1 인 어떤 M 든 출력) 만 다뤄요. 정확한 최솟값을 요구하는 k = 0 케이스는 더 어려워요 — 공식 editorial 참고.")}
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "S has length ", "S 는 길이 ")}
                  <b style={{ color: "#059669" }}>3N</b>
                  {t(E, " — N blocks, each one of ", " — N 개 블록, 각 블록은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>OWC</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>WCO</code>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "square string", "사각 문자열")}</b>
                  {t(E, " is one that equals Y+Y for some Y (e.g. ", " 은 어떤 Y 에 대해 Y+Y 형태 (예: ")}
                  <code>COWCOW</code>, <code>CC</code>{t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation removes any subsequence T from S where T is a square.",
                        "한 연산은 S 에서 임의의 사각 부분수열 T 를 제거.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "If impossible print ", "불가능하면 ")}
                  <code>-1</code>
                  {t(E, ". Otherwise print M and label each char with its operation index (1..M).",
                       " 출력. 가능하면 M 과 각 문자의 연산 번호 (1..M) 를 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Parity quiz
    {
      type: "quiz",
      narr: t(E,
        "Each operation removes a square Y+Y, which has even length. So the total chars erased across all ops is even. Total length is 3N. What must be true about N?",
        "각 연산은 짝수 길이 Y+Y 를 지워요. 모든 연산 합도 짝수 길이. 전체 길이는 3N. N 에 대해 어떤 조건이 맞아야 할까?"),
      question: t(E,
        "When is it possible to empty S?",
        "S 를 비우는 게 가능한 조건은?"),
      options: [
        t(E, "Always possible", "항상 가능"),
        t(E, "Only when N is even (so 3N is even)", "N 이 짝수일 때만 (3N 이 짝수)"),
        t(E, "Only when N is a multiple of 3", "N 이 3 의 배수일 때만"),
      ],
      correct: 1,
      explain: t(E,
        "Each op deletes an even number of chars (length of Y+Y). Sum of evens is even. So 3N must be even, meaning N must be even. If N is odd, output -1.",
        "각 연산은 짝수 개를 지워요. 짝수의 합도 짝수. 그래서 3N 이 짝수여야 하고 → N 이 짝수. N 이 홀수면 -1."),
    },

    // 1-3: M=1 quiz
    {
      type: "quiz",
      narr: t(E,
        "Best case: M=1. Then ALL of S is removed in one op as a square. That means S itself = Y+Y.",
        "최선의 경우 M=1. 모든 S 를 한 번에 사각 문자열로 지움 → S = Y+Y."),
      question: t(E,
        "When does M=1 work?",
        "언제 M=1 으로 끝나?"),
      options: [
        t(E, "When the first half of S equals the second half", "S 의 앞쪽 절반과 뒤쪽 절반이 같을 때"),
        t(E, "When N = 1", "N = 1 일 때"),
      ],
      correct: 0,
      explain: t(E,
        "S itself must be Y+Y, i.e. S[:3N/2] == S[3N/2:]. If yes, label everyone with 1.",
        "S 자체가 Y+Y 이려면 앞 절반 == 뒤 절반. 그러면 모두 1 로 라벨."),
    },

    // 1-4: M=3 construction insight
    {
      type: "reveal",
      narr: t(E,
        "When N is even but S isn't a square, we still want a clean construction. Trick: separate by letter. All C's form 'CCCC...' which is a square (Y='CCC...'). Same for O's and W's. That gives M=3.",
        "N 은 짝수인데 S 가 사각이 아니면? 깔끔한 트릭: 글자별로 분리. C 만 모으면 'CCCC...' → 사각. O, W 도 마찬가지 → M=3."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              💡 {t(E, "Letter-group trick (M ≤ 3)", "글자 그룹 트릭 (M ≤ 3)")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div style={{ marginBottom: 6 }}>
                {t(E,
                  "Each block has exactly one C, one O, one W. So total counts: ",
                  "각 블록엔 C, O, W 가 정확히 하나씩. 그래서 총 개수: ")}
                <b style={{ color: "#059669" }}>{t(E, "N of each letter", "각 글자 N 개")}</b>.
              </div>
              <div style={{ marginBottom: 6 }}>
                {t(E, "If N is even, each letter count is even. ",
                     "N 이 짝수면 각 글자 개수도 짝수. ")}
                {t(E, "Subsequence of all C's = ", "모든 C 만 모은 부분수열 = ")}
                <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>CCCC...C</code>
                {t(E, " (length N) — a square with Y = ", " (길이 N) — Y = ")}
                <code>C^(N/2)</code>{t(E, ".", ".")}
              </div>
              <div>
                {t(E, "Op 1 = all C's, Op 2 = all O's, Op 3 = all W's. Each is a valid square op.",
                     "Op 1 = 모든 C, Op 2 = 모든 O, Op 3 = 모든 W. 각각 유효한 사각 연산.")}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            {t(E,
              "Note: this gives M=3, which is fine when k=1 (allowed up to min+1). For k=0 we'd need to chase the true minimum (often 2). This tutorial focuses on the k=1 construction.",
              "주의: 이 방식은 M=3. k=1 (min+1 까지 허용) 이면 충분. k=0 진짜 최솟값 (보통 2) 은 더 정교한 구성이 필요. 본 튜토리얼은 k=1 구성에 집중.")}
          </div>
        </div>),
    },

    // 1-5: Mini calc
    {
      type: "input",
      narr: t(E,
        "Quick check. If N=4 and S is NOT a square but the letter-group trick is used, what is M?",
        "빠른 체크. N=4 이고 S 가 사각이 아닐 때 글자-그룹 트릭을 쓰면 M 은?"),
      question: t(E,
        "N=4, S not a square, letter-group trick → M = ?",
        "N=4, S 가 사각 아님, 글자-그룹 트릭 → M = ?"),
      hint: t(E,
        "One op per letter type.",
        "글자 종류 하나당 연산 하나."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCowSplitsCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Read the input, handle the parity check, try M=1, otherwise apply the letter-group trick. The code builds up section by section.",
        "입력을 읽고 짝수 체크 → M=1 시도 → 안 되면 글자-그룹 트릭. 아래 섹션이 한 단락씩 쌓아가요."),
      sections: getCowSplitsSections(E),
    },
  ];
}
