import { C, t } from "@/components/quest/theme";
import { getMooOpsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "Q = int(input())",
  "for _ in range(Q):",
  "    s = input().strip()",
  "    n = len(s)",
  "    best = -1",
  "",
  "    # Try each position i as start of 'MOO'",
  "    # Final string is 'MOO' (length 3)",
  "    # Delete chars before i: cost = i",
  "    # Delete chars after i+2: cost = n - (i+3)",
  "    # Flip first char if s[i] != 'M': cost 1",
  "    # Middle char must be 'O' (can't flip middle)",
  "    # Flip last char if s[i+2] != 'O': cost 1",
  "    for i in range(n - 2):",
  "        # middle must be 'O'",
  "        if s[i + 1] != 'O':",
  "            continue",
  "        cost = i + (n - i - 3)  # deletions",
  "        if s[i] != 'M':",
  "            cost += 1",
  "        if s[i + 2] != 'O':",
  "            cost += 1",
  "        if best == -1 or cost < best:",
  "            best = cost",
  "",
  "    print(best)",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeMooOpsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Transform a string of M's and O's into exactly \"MOO\" using minimum operations. You can flip the first or last character, or delete the first or last character. Find the minimum operations or -1 if impossible!",
        "M과 O로 이루어진 문자열을 최소 연산으로 정확히 \"MOO\"로 변환해. 첫 번째 또는 마지막 문자를 뒤집거나, 첫 번째 또는 마지막 문자를 삭제할 수 있어. 최소 연산 수 또는 불가능하면 -1을 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc2e"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Moo Operations</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: The final string is \"MOO\" (length 3). We need to find a substring of length 3 where the middle character is 'O', then compute cost of deletions + flips. The middle character can never be changed (only first/last can flip).",
              "핵심: 최종 문자열은 \"MOO\" (길이 3). 중간 문자가 'O'인 길이 3 부분문자열을 찾고, 삭제 + 뒤집기 비용을 계산해. 중간 문자는 절대 바꿀 수 없어 (첫/마지막만 뒤집기 가능).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The string \"MOO\" already matches. How many operations are needed?",
        "문자열 \"MOO\"는 이미 일치해. 몇 번의 연산이 필요할까?"),
      question: t(E,
        "String is \"MOO\". How many operations needed?",
        "문자열이 \"MOO\"일 때. 필요한 연산 수는?"),
      options: [
        t(E, "0 operations", "0번"),
        t(E, "1 operation", "1번"),
        t(E, "Impossible (-1)", "불가능 (-1)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! \"MOO\" is already the target, so 0 operations needed.",
        "맞아! \"MOO\"가 이미 목표이므로 0번의 연산이 필요해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "String is \"MOOO\". We need to reduce it to \"MOO\". How many operations?",
        "문자열이 \"MOOO\"야. \"MOO\"로 줄여야 해. 몇 번의 연산이 필요할까?"),
      question: t(E,
        "String \"MOOO\". Min operations to make it \"MOO\"?",
        "문자열 \"MOOO\". \"MOO\"로 만드는 최소 연산 수?"),
      hint: t(E,
        "Use the first 3 characters \"MOO\" and delete the last 'O'. That's 1 deletion = 1 operation.",
        "처음 3문자 \"MOO\"를 사용하고 마지막 'O'를 삭제해. 삭제 1번 = 연산 1번."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeMooOpsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try every position as the start of \"MOO\". Check if middle is 'O'. Compute deletion + flip cost. O(N) per query!",
        "모든 위치를 \"MOO\"의 시작으로 시도해. 중간이 'O'인지 확인. 삭제 + 뒤집기 비용 계산. 쿼리당 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N) per query</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each position i where s[i+1]=='O': cost = i (delete left) + (n-i-3) (delete right) + flip costs for s[i] and s[i+2]. Take the minimum over all valid i.",
              "s[i+1]=='O'인 각 위치 i에 대해: 비용 = i (왼쪽 삭제) + (n-i-3) (오른쪽 삭제) + s[i]와 s[i+2]의 뒤집기 비용. 모든 유효한 i에서 최솟값을 취해.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMooOpsSections(E),
    },
  ];
}
