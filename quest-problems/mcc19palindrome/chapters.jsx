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
        "Find the N-th palindrome in base K. Palindromes read the same forwards and backwards. Enumerate by length: first half determines the whole number!",
        "K진법에서 N번째 회문수를 찾아. 회문은 앞뒤로 읽어도 같아. 길이별로 열거: 앞 절반이 전체를 결정해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔄</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Palindrome</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P6</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Palindromes of length L are determined by the first ceil(L/2) digits. Count how many exist per length, then construct the N-th one.",
              "핵심: 길이 L의 회문은 처음 ceil(L/2)자리로 결정돼. 길이별 개수를 세고 N번째를 구성해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Base 10 palindromes in order: 1,2,3,...,9,11,22,...,99,101,... The first 9 are single digits. The 10th palindrome is?",
        "10진법 회문 순서: 1,2,3,...,9,11,22,...,99,101,... 처음 9개는 한 자리. 10번째 회문은?"),
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
        "맞아! 1-9가 처음 9개 회문이야. 10번째는 11 (첫 번째 2자리 회문)."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Base 10 palindromes: 1,2,...,9,11,22,... What is the 10th palindrome?",
        "10진법 회문: 1,2,...,9,11,22,... 10번째 회문은?"),
      question: t(E,
        "10th palindrome in base 10 = ?",
        "10진법 10번째 회문 = ?"),
      hint: t(E,
        "After 1-9 (9 palindromes), the next is 11.",
        "1-9 (9개 회문) 다음은 11."),
      answer: 11,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Count palindromes per length, find which length contains N-th, construct it from the first half. O(log N) per query!",
        "길이별 회문 개수를 세고, N번째가 포함된 길이를 찾아 앞 절반에서 구성. 쿼리당 O(log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(log N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each length L: (K-1) × K^(ceil(L/2)-1) palindromes exist. Skip lengths until we find the right one, then construct from first half digits.",
              "각 길이 L: (K-1) × K^(ceil(L/2)-1)개의 회문이 존재. 맞는 길이를 찾을 때까지 건너뛰고 앞 절반 숫자로 구성.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19PalSections(E),
    },
  ];
}
