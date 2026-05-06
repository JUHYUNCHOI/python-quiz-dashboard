import { C, t } from "@/components/quest/theme";
import { getLonelyPhotoSections } from "./components";

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
        "FJ has N cows in a row, each Guernsey (G) or Holstein (H).\nA contiguous group of 3 or more is 'lonely' if exactly ONE cow has a different breed from all the others.\nCount how many lonely groups there are.",
        "FJ에게 한 줄로 선 N마리 소가 있고, 각 소는 건지(G) 또는 홀스타인(H)이에요.\n연속한 3마리 이상의 묶음에서 단 1마리만 다른 품종일 때 '외로운' 묶음이라고 해요.\n외로운 묶음이 몇 개 있는지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcf8"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Lonely Photo</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #1</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each labeled ", "가 있어요. 각 소는 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>G</code>
                  {t(E, " (Guernsey) or ", " (건지) 또는 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>H</code>
                  {t(E, " (Holstein).", " (홀스타인) 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A photo is a ", "사진은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous group of 3 or more cows", "연속한 3마리 이상의 묶음")}</b>
                  {t(E, " from the row.", "이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A photo is ", "사진이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "'lonely'", "'외로운' 사진")}</b>
                  {t(E, " if exactly ONE cow in it has a different breed from all the others (e.g., 'GHG', 'HHGHH').",
                        "이 되려면 그 안에서 정확히 1마리만 나머지와 다른 품종이어야 해요 (예: 'GHG', 'HHGHH').")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total number of lonely photos", "외로운 사진의 총 개수")}</b>
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
        "'GHG' has length 3 with exactly 1 H. Is H lonely here?", "'GHG'는 길이 3이고 H가 정확히 1마리. H가 외로운 걸까요?"),
      question: t(E,
        "In 'GHG', is the H a lonely cow?",
        "'GHG'에서 H는 외로운 소일까요?"),
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
        "For 'GHGHG' (length 5), count all lonely substrings of length >= 3.", "'GHGHG'(길이 5)에서 길이 3 이상인 외로운 부분 문자열 수를 세봐요."),
      question: t(E,
        "s = 'GHGHG'. How many lonely photos?",
        "s = 'GHGHG'. 외로운 사진 수는?"),
      hint: t(E,
        "Length-3 substrings: GHG(lonely H), HGH(lonely G), GHG(lonely H). Length-4: GHGH(no), HGHG(no). Length-5: GHGHG(no). Answer: 3.",
        "길이3: GHG(H외로움), HGH(G외로움), GHG(H외로움). 길이4: GHGH(x), HGHG(x). 길이5: GHGHG(x). 답: 3."),
      answer: 3,
    },
    {
      type: "sim",
      narr: t(E,
        "For each i, see same-type run + opp_left/opp_right + the count formula contribution.", "각 i마다 같은 타입 구간 + opp_left/opp_right + 카운트 공식 기여."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLonelyPhotoCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each cow, count opposite-type cows on each side.\nCombine counts to find valid substrings.\nO(N) with prefix sums!", "각 소에 대해 양쪽의 반대 타입 소 수를 세. 조합해서 유효한 부분 문자열을 찾아요. 누적합으로 O(N)!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Skip same-type neighbors", "같은 타입 이웃 건너뛰기"), code: "left, right = same-type run lengths around i", color: "#2563eb" },
              { n: 2, label: t(E, "Count opposite-type per side", "양쪽 반대 타입 수"), code: "opp_left = i \u2212 left,  opp_right = (N\u22121\u2212i) \u2212 right", color: "#0891b2" },
              { n: 3, label: t(E, "Combine via 3 cases", "3가지 경우 조합"), code: "ans += opp_left\u00b7opp_right + max(0, opp_left\u22121) + max(0, opp_right\u22121)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
            <div style={{ fontWeight: 800, color: "#1e3a8a", marginBottom: 4 }}>{t(E, "🤔 Why these 3 terms?", "🤔 왜 3가지 항?")}</div>
            {t(E,
              "• opp_left × opp_right: at least 1 from each side\n• max(0, opp_left \u2212 1): 2+ from left, 0 from right\n• max(0, opp_right \u2212 1): 0 from left, 2+ from right",
              "• opp_left × opp_right: 양쪽에서 최소 1개씩\n• max(0, opp_left \u2212 1): 왼쪽 2+, 오른쪽 0\n• max(0, opp_right \u2212 1): 왼쪽 0, 오른쪽 2+")}
          </div>
          <div style={{ marginTop: 10, background: "#dbeafe", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "worst case (run scan per i)", "최악 (i마다 구간 스캔)")}</div>
          </div>
        </div>),
    },
    // 2-2: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Now build the run-length scan step by step.", "구간 길이 스캔을 단계별로 만들자."),
      sections: getLonelyPhotoSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own G/H string.", "직접 G/H 문자열 시도."),
    },
  ];
}
