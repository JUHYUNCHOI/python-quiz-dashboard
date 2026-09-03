import { C, t } from "@/components/quest/theme";
import { getMcc19PalSections } from "./components";

const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ================================================================
   SOLUTION CODE  (verified: strings, leading zeros allowed,
   ordered by length then lexicographically)
   count of length-l palindromes = k^ceil(l/2)
   ================================================================ */
export const SOLUTION_CODE = [
  "import math",
  "",
  "def nth_palindrome(n, k):",
  "    # count of length-l palindromes = k ** ceil(l/2)",
  "    # walk lengths, adding counts, until we reach n",
  "    s, c = 0, 0",
  "    while s < n:",
  "        c += 1",
  "        s += k ** math.ceil(c / 2)",
  "",
  "    # find the 0-indexed rank r inside length c",
  "    r = n",
  "    for i in range(1, c):",
  "        r -= k ** math.ceil(i / 2)",
  "    r -= 1",
  "",
  "    # write r in base k -> the front half (least digit first)",
  "    half = ''",
  "    rr = r",
  "    if rr == 0:",
  "        half = '0'",
  "    while rr > 0:",
  "        half += str(rr % k); rr //= k",
  "",
  "    # left-pad to ceil(c/2) digits, then most-significant first",
  "    while len(half) * 2 < c:",
  "        half += '0'",
  "    half = half[::-1]",
  "",
  "    # mirror the front half to build the palindrome string",
  "    if c % 2 == 0:",
  "        return half + half[::-1]",
  "    else:",
  "        return half + half[-2::-1]",
  "",
  "N, K = map(int, input().split())",
  "print(nth_palindrome(N, K))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   [제목+🎯미션+📖문제] → [📥입력+공식샘플] → [개념 시뮬] → [이해 퀴즈]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "\"Book k\" lists every palindrome STRING made of the digits 0…k−1 (leading zeros allowed), ordered by length first, then alphabetically.\nPrint the N-th entry as its digit string.",
        "\"책 k\" 는 숫자 0…k−1 로 만들 수 있는 모든 회문 문자열을 담아요 (앞자리 0 허용). 길이가 짧은 것부터, 같은 길이면 사전 순으로 나열해요.\nN 번째 항목을 숫자 문자열 그대로 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔄</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8b5cf6" }}>Palindrome</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Print the N-th palindrome string in Book k (leading zeros kept).",
                "책 k 의 N 번째 회문 문자열을 그대로 출력해요 (앞자리 0 유지).")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "palindrome string", "회문 문자열")}</b>
                  {t(E, " reads the same forwards and backwards, made only of the digits ",
                        " 은 앞뒤로 똑같이 읽혀요. 숫자 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "0…k−1", "0…k−1")}</b>{t(E, ".", " 로만 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Leading zeros ARE allowed", "앞자리 0 을 써도 돼요")}</b>
                  {t(E, " — so \"0\", \"00\", \"010\", \"0110\" all count as valid entries.",
                        " — 그래서 \"0\", \"00\", \"010\", \"0110\" 전부 유효한 항목이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "\"Book k\" lists ALL of them, ordered by ", "\"책 k\" 는 그것들을 전부 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "length first, then alphabetically", "길이 먼저, 같으면 사전 순")}</b>
                  {t(E, " (string order, ", " 으로 나열해요 (문자열 순서, ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "not numeric value", "숫자 값이 아님")}</b>
                  {t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "N-th entry (1-indexed) as its literal digit string", "N 번째 (1-indexed) 항목을 숫자 문자열 그대로")}</b>
                  {t(E, ".", "출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Input format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. Input is one line: n then k. Output is the digit string (keep the leading zeros).",
        "입력 형식과 공식 예제를 봐요. 입력은 한 줄에 n 그리고 k. 출력은 숫자 문자열 (앞자리 0 그대로)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "One line: ", "한 줄: ")}<b>n</b> <b>k</b></div>
              <div>• <b>n</b> — {t(E, "which entry to print (1-indexed)", "몇 번째 항목인지 (1-indexed)")}</div>
              <div>• <b>k</b> — {t(E, "the digits are 0…k−1", "쓸 수 있는 숫자는 0…k−1")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 2 ≤ k ≤ 10. Output: the palindrome digit string.", "제약: 2 ≤ k ≤ 10. 출력: 회문 숫자 문자열.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 120 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>7 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>000</div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#faf5ff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "10px 14px", ...KA }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Book 3 order (k = 3):", "책 3 의 순서 (k = 3):")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {[["0",1],["1",2],["2",3],["00",4],["11",5],["22",6],["000",7]].map(([s,i]) => (
                <span key={i} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 4,
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                  border: i === 7 ? "2px solid #8b5cf6" : "1px solid #c4b5fd",
                  background: i === 7 ? "#ede9fe" : "#fff", borderRadius: 6, padding: "2px 7px" }}>
                  <span style={{ color: C.dim, fontSize: 10 }}>{i}.</span>
                  <b style={{ color: i === 7 ? "#8b5cf6" : "#5b21b6" }}>{s}</b>
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.55 }}>
              {t(E,
                "The 7th entry is \"000\" — three single digits, three two-digit doubles, then the length-3 strings start with \"000\" (leading zeros are fine).",
                "7 번째는 \"000\" 이에요 — 한 자리 3 개, 두 자리 3 개, 그다음 길이 3 이 \"000\" 부터 시작해요 (앞자리 0 허용).")}
            </div>
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "sim",
      narr: t(E,
        "Feel the order. Pick k and N, and watch the palindrome strings line up by length then alphabetically. Each length holds k^⌈L/2⌉ of them — the front half is chosen freely, then mirrored.",
        "순서를 직접 느껴봐요. k 와 N 을 골라 회문 문자열이 길이 순, 사전 순으로 줄 서는 걸 봐요. 각 길이는 k^⌈L/2⌉ 개예요 — 앞 절반을 자유롭게 고르고 거울처럼 뒤집으면 돼요."),
      content: null, // rendered by App via <Mcc19PalSim />
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Book 2 order: \"0\", \"1\", \"00\", \"11\", \"000\", \"010\", \"101\", \"111\", …\nLength 1 gives 2 strings, length 2 gives 2 more — so the 5th starts the length-3 group.",
        "책 2 의 순서: \"0\", \"1\", \"00\", \"11\", \"000\", \"010\", \"101\", \"111\", … 길이 1 이 2 개, 길이 2 가 2 개 — 그래서 5 번째가 길이 3 의 첫 항목이에요."),
      question: t(E,
        "Book 2 (k = 2): what is the 5th palindrome string?",
        "책 2 (k = 2): 5 번째 회문 문자열은?"),
      options: [
        t(E, "\"11\"", "\"11\""),
        t(E, "\"000\"", "\"000\""),
        t(E, "\"101\"", "\"101\""),
      ],
      correct: 1,
      explain: t(E,
        "\"0\",\"1\" (length 1) and \"00\",\"11\" (length 2) fill the first 4. The length-3 group starts with \"000\" — leading zeros are allowed, and it's alphabetical order, so \"000\" comes before \"010\" and \"101\".",
        "\"0\",\"1\" (길이 1) 과 \"00\",\"11\" (길이 2) 가 처음 4 개예요. 길이 3 그룹은 \"000\" 부터 시작해요 — 앞자리 0 이 허용되고 사전 순이라 \"000\" 이 \"010\", \"101\" 보다 앞이에요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드
   [🐢느림 vs 🚀빠름 계획] → [단계별 코드]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow (generate all) vs fast (count & jump)
    {
      type: "reveal",
      narr: t(E,
        "The slow way generates every palindrome one by one until the N-th — if N is huge, that's far too many. The fast way COUNTS how many strings each length holds (k^⌈L/2⌉), skips whole lengths at once, then builds just the one answer directly.",
        "느린 방법은 N 번째까지 회문을 하나씩 전부 만들어요 — N 이 크면 개수가 너무 많아요. 빠른 방법은 각 길이가 몇 개인지(k^⌈L/2⌉) 세어 길이 단위로 건너뛰고, 답 하나만 곧바로 만들어요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: generate every palindrome until the N-th", "느림: N 번째까지 회문을 하나씩 전부 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Listing N strings one by one takes about N steps. When N is very large, you never finish.",
                      "문자열을 하나씩 N 개 만들면 약 N 번. N 이 아주 크면 끝나지 않아요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count per length, jump, then build one answer", "빠름: 길이별 개수로 건너뛰고 답 하나만 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Length L holds k^⌈L/2⌉ strings (pick the front half freely, mirror it). Subtract counts length by length to land on the right length, then write the rank in base k and mirror.",
                      "길이 L 은 k^⌈L/2⌉ 개 (앞 절반을 자유롭게 고르고 거울 대칭). 길이별 개수를 빼가며 맞는 길이를 찾고, 그 안 순위를 k 진법으로 적어 거울 대칭으로 완성.")}
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
      sections: getMcc19PalSections(E),
    },
  ];
}
