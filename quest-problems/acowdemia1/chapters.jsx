import { C, t } from "@/components/quest/theme";
import { getAcowdemia1Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, L = map(int, input().split())",
  "c = sorted(map(int, input().split()))",
  "",
  "def check(h):",
  "    # count papers with >= h citations",
  "    # papers are sorted ascending",
  "    idx = N - h  # need last h papers",
  "    if idx < 0: return False",
  "    need = 0",
  "    for i in range(idx, N):",
  "        if c[i] < h:",
  "            need += h - c[i]",
  "    return need <= L",
  "",
  "lo, hi, ans = 0, N, 0",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if check(mid):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to maximize her h-index!\nShe has N papers and can add L extra citations.\nThe h-index is the largest h such that at least h papers have at least h citations.", "Bessie가 h-index를 최대화하고 싶어!\nN개의 논문이 있고 L개의 추가 인용을 넣을 수 있어.\nh-index는 최소 h개의 논문이 각각 h 이상의 인용을 가지는 최대 h야."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcda"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Acowdemia I</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Sort papers by citations.\nBinary search on h. For each candidate h, check if we can boost enough papers using L extra citations.",
              "핵심: 인용수로 논문을 정렬.\nh를 이분 탐색.\n각 후보 h에 대해 L개의 추가 인용으로 충분한 논문을 올릴 수 있는지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider papers with citations [1, 3, 3, 100].\nWithout any extra citations, what is the h-index?", "인용수가 [1, 3, 3, 100]인 논문들이 있어. 추가 인용 없이 h-index는 얼마일까?"),
      question: t(E,
        "Papers [1, 3, 3, 100]. H-index without extra citations?",
        "논문 [1, 3, 3, 100]. 추가 인용 없이 h-index는?"),
      options: [
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "4", "4"),
      ],
      correct: 1,
      explain: t(E,
        "3 papers have >= 3 citations (3, 3, 100), so h-index = 3. Only 1 paper has >= 4, so h=4 fails.",
        "3개의 논문이 3 이상의 인용을 가져 (3, 3, 100), h-index = 3. 4 이상은 1개뿐이라 h=4는 실패."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Papers [1, 3, 3, 100] with no extra citations. What is the h-index?", "논문 [1, 3, 3, 100]에 추가 인용이 없어. h-index는?"),
      question: t(E,
        "Papers [1, 3, 3, 100], L=0. H-index?",
        "논문 [1, 3, 3, 100], L=0. H-index는?"),
      hint: t(E,
        "3 papers have >= 3 citations. So h = 3.",
        "3개의 논문이 인용 3 이상. h = 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow1Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the papers, then binary search on h.\nFor each candidate h, greedily check if L citations suffice.\nO(N log N) time!", "논문을 정렬하고 h를 이분 탐색. 각 후보 h에 대해 L개 인용이 충분한지 그리디로 확인. O(N log N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort ascending.\nBinary search on h. For a candidate h, the last h papers need at least h citations each. Sum up the deficit and compare with L.",
              "오름차순 정렬.\nh를 이분 탐색.\n후보 h에 대해 마지막 h개 논문이 각각 h 이상 인용 필요.\n부족분의 합을 L과 비교.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getAcowdemia1Sections(E),
    },
  ];
}
