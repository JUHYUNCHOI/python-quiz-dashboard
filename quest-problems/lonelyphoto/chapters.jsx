import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "s = input().strip()",
  "",
  "ans = 0",
  "for i in range(N):",
  "    # Count consecutive same-type on left and right",
  "    left = 0",
  "    right = 0",
  "    for j in range(i - 1, -1, -1):",
  "        if s[j] == s[i]: left += 1",
  "        else: break",
  "    for j in range(i + 1, N):",
  "        if s[j] == s[i]: right += 1",
  "        else: break",
  "",
  "    # This cow is lonely in substrings where",
  "    # it's the only one of its type",
  "    # Opposite cows on left",
  "    opp_left = i - left",
  "    opp_right = (N - 1 - i) - right",
  "",
  "    # Substrings where cow i is the only one of its type:",
  "    # need >= 2 of opposite type total",
  "    # Choose l from opp_left, r from opp_right, l+r >= 2",
  "    ans += opp_left * opp_right  # both sides have opposite",
  "    ans += max(0, opp_left - 1)  # 2+ from left, 0 from right",
  "    ans += max(0, opp_right - 1) # 0 from left, 2+ from right",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLonelyPhotoCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A string of G's and H's. Count substrings of length >= 3 where exactly one cow is 'lonely' (the only one of its type).",
        "G와 H로 이루어진 문자열. 길이 3 이상인 부분 문자열 중 정확히 1마리가 '외로운'(자기 타입이 유일한) 것의 개수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcf8"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Lonely Photo</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each cow, count how many substrings (length >= 3) make it the only one of its type. Count opposite-type cows on left and right.",
              "핵심: 각 소에 대해, 그 소가 자기 타입 유일인 부분 문자열(길이 >= 3) 수를 세. 왼쪽과 오른쪽의 반대 타입 소 수를 세면 돼.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "'GHG' has length 3 with exactly 1 H. Is H lonely here?",
        "'GHG'는 길이 3이고 H가 정확히 1마리. H가 외로운 걸까?"),
      question: t(E,
        "In 'GHG', is the H a lonely cow?",
        "'GHG'에서 H는 외로운 소일까?"),
      options: [
        t(E, "Yes, it's the only H among 2 G's", "맞아, G 2마리 사이에 H가 유일해"),
        t(E, "No, there must be exactly 1 G", "아니, G가 정확히 1마리여야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A lonely photo has exactly 1 of one type. 'GHG' has 1 H among 2 G's, so H is lonely.",
        "맞아! 외로운 사진은 한 타입이 정확히 1마리. 'GHG'에 H가 1마리이니 H가 외로워."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 'GHGHG' (length 5), count all lonely substrings of length >= 3.",
        "'GHGHG'(길이 5)에서 길이 3 이상인 외로운 부분 문자열 수를 세봐."),
      question: t(E,
        "s = 'GHGHG'. How many lonely photos?",
        "s = 'GHGHG'. 외로운 사진 수는?"),
      hint: t(E,
        "Length-3 substrings: GHG(lonely H), HGH(lonely G), GHG(lonely H). Length-4: GHGH(no), HGHG(no). Length-5: GHGHG(no). Answer: 3.",
        "길이3: GHG(H외로움), HGH(G외로움), GHG(H외로움). 길이4: GHGH(x), HGHG(x). 길이5: GHGHG(x). 답: 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLonelyPhotoCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each cow, count opposite-type cows on each side. Combine counts to find valid substrings. O(N) with prefix sums!",
        "각 소에 대해 양쪽의 반대 타입 소 수를 세. 조합해서 유효한 부분 문자열을 찾아. 누적합으로 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For cow i: count opposite-type on left (opp_left) and right (opp_right). Lonely substrings = opp_left*opp_right + max(0,opp_left-1) + max(0,opp_right-1).",
              "소 i에 대해: 왼쪽 반대 타입(opp_left)과 오른쪽 반대 타입(opp_right) 수를 세. 외로운 부분문자열 = opp_left*opp_right + max(0,opp_left-1) + max(0,opp_right-1).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the O(N) solution!",
        "O(N) 풀이 코드야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
