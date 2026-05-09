import { C, t } from "@/components/quest/theme";
import { getMcc19PalSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "K, N = map(int, input().split())",
  "",
  "def get_nth_palindrome(k, n):",
  "    # Generate palindromes in base k in order",
  "    # Single digit palindromes: 1..k-1 (n=1..k-1)",
  "    if n <= k - 1:",
  "        return n",
  "    ",
  "    # For longer palindromes, enumerate by length",
  "    n -= (k - 1)  # skip single digits",
  "    length = 2",
  "    while True:",
  "        half = (length + 1) // 2",
  "        # First digit: 1..k-1, rest: 0..k-1",
  "        count = (k - 1) * (k ** (half - 1))",
  "        if n <= count:",
  "            # Build the n-th palindrome of this length",
  "            n -= 1  # 0-indexed",
  "            digits = []",
  "            for i in range(half):",
  "                if i == 0:",
  "                    d = n // (k ** (half - 1)) + 1",
  "                else:",
  "                    d = (n // (k ** (half - 1 - i))) % k",
  "                digits.append(d)",
  "            # Mirror to form full palindrome",
  "            full = digits + digits[:(length // 2)][::-1]",
  "            # Convert to base 10",
  "            val = 0",
  "            for d in full:",
  "                val = val * k + d",
  "            return val",
  "        n -= count",
  "        length += 1",
  "",
  "print(get_nth_palindrome(K, N))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "List all palindromes in base K (digits 0..K-1, no leading zeros except '0' itself) in INCREASING numeric order.\nPrint the N-th palindrome (1-indexed) in this list, written in base K.",
        "K 진법 (자릿수 0..K-1, '0' 자체 외에는 선행 0 없음) 의 모든 회문수를 작은 숫자부터 큰 숫자 순으로 나열해요.\n그 목록의 N 번째 (1-indexed) 회문수를 K 진법으로 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Palindrome</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Print the N-th base-K palindrome (in base K).", "K 진법의 N 번째 회문수를 K 진법으로 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "palindrome", "회문수")}</b>
                  {t(E, " reads the same forward and backward (in its base-K representation).",
                        " 는 K 진법 표현이 앞뒤로 같아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Sort all base-K palindromes (no leading zeros) in ", "K 진법의 모든 회문수 (선행 0 없음) 를 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "increasing numeric order", "작은 숫자부터 큰 숫자 순")}</b>
                  {t(E, ".", " 으로 정렬해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "N-th palindrome in this sorted list (in base K)", "정렬된 목록의 N 번째 회문수 (K 진법으로)")}</b>
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
        "Base 10 palindromes in order: 1,2,3,...,9,11,22,...,99,101,...\nThe first 9 are single digits.\nThe 10th palindrome is?", "10진법 회문 순서: 1,2,3,...,9,11,22,...,99,101,... 처음 9개는 한 자리. 10번째 회문은?"),
      question: t(E,
        "Base 10: what is the 10th palindrome?",
        "10진법: 10번째 회문은?"),
      options: [
        t(E, "10", "10"),
        t(E, "11", "11"),
        t(E, "22", "22"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 1-9 are the first 9 palindromes. The 10th is 11 (first 2-digit palindrome).",
        "맞아! 1-9가 처음 9개 회문이에요. 10번째는 11 (첫 번째 2자리 회문)."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Base 10 palindromes: 1,2,...,9,11,22,... What is the 10th palindrome?", "10진법 회문: 1,2,...,9,11,22,... 10번째 회문은?"),
      question: t(E,
        "10th palindrome in base 10 = ?",
        "10진법 10번째 회문 = ?"),
      hint: t(E,
        "1-9 are 9 palindromes. What's the smallest 2-digit palindrome?",
        "1-9 가 9 개 회문. 그 다음으로 가장 작은 2 자리 회문은?"),
      answer: 11,
    },
    // 1-4: Sim — drag K (base) and N (rank), watch the length-by-length count
    {
      type: "sim",
      narr: t(E,
        "Length L holds (K−1)·K^(⌈L/2⌉−1) palindromes. Drag K and N — the table builds the running total length by length until it covers N. Inside that length, decode the front ⌈L/2⌉ digits in base K and mirror. That length-walk IS the algorithm.",
        "길이 L 의 회문 개수 = (K−1)·K^(⌈L/2⌉−1). K 와 N 을 움직여 봐 — 길이별로 누적이 쌓이다 N 을 덮는 순간이 답의 길이. 그 안에서 앞 ⌈L/2⌉ 자리를 K 진법으로 디코드, 거울 대칭으로 완성. 그 길이-걷기가 알고리즘이에요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Count palindromes per length L: (K−1) × K^(ceil(L/2)−1). Find the L containing the N-th by subtracting counts. Inside that length, decode the first ⌈L/2⌉ digits in base K, then mirror to form the full palindrome. Sections build it one piece at a time.",
        "길이 L 의 회문 개수: (K−1) × K^(ceil(L/2)−1). 누적 개수를 빼가며 N 번째가 들어있는 L 을 찾기. 그 안에서 앞 ⌈L/2⌉ 자리를 K 진법으로 디코드, 거울 대칭으로 회문 완성. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc19PalSections(E),
    },
  ];
}
