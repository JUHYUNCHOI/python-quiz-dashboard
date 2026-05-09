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
        "Bessie has N papers with citation counts c[i]. Her h-index is the largest h such that at least h of her papers have ≥ h citations.\nShe can ADD a total of L extra citations distributed across her papers (each extra citation goes to one paper). What's the MAXIMUM h-index she can achieve?",
        "Bessie에게 인용수 c[i] 인 N개의 논문이 있어요. h-index 는 어떤 수 h 에 대해, 인용수가 h 이상인 논문이 h편 이상 있을 때의 가장 큰 h 예요.\n추가 인용을 총 L개 까지 자유롭게 더할 수 있어요 (한 인용은 한 논문에). 만들 수 있는 h-index 의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcda"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Acowdemia I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the maximum h-index Bessie can achieve after distributing L extra citations.",
                "L 개의 추가 인용을 나눠 더했을 때 만들 수 있는 h-index 의 최댓값을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N papers with citation counts", "인용수가 주어진 N개의 논문")}</b>
                  {t(E, " ", " ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>c[i]</code>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "h-index", "h-index")}</b>
                  {t(E, " is the largest h such that ", " 는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "at least h papers have ≥ h citations", "인용수가 h 이상인 논문이 h편 이상")}</b>
                  {t(E, ".", " 일 때의 가장 큰 h 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "total of L extra citations", "총 L개의 추가 인용")}</b>
                  {t(E, " distributed however she likes across her papers.",
                        " 을 논문에 자유롭게 나눠 더할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible h-index", "달성 가능한 h-index 의 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Consider papers with citations [1, 3, 3, 100].\nWithout any extra citations, what is the h-index?", "인용수가 [1, 3, 3, 100]인 논문들이 있어요. 추가 인용 없이 h-index는 얼마일까요?"),
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
        "Papers [1, 3, 3, 100] with no extra citations. What is the h-index?", "논문 [1, 3, 3, 100]에 추가 인용이 없어요. h-index는?"),
      question: t(E,
        "Papers [1, 3, 3, 100], L=0. H-index?",
        "논문 [1, 3, 3, 100], L=0. H-index는?"),
      hint: t(E,
        "Try each h from largest down: how many papers meet ≥ h?",
        "큰 h 부터 시도해봐요: 인용수가 h 이상인 논문이 몇 개?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow1Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Sort papers ascending. For a candidate h-index, the LAST h papers (top h cited) must each have ≥ h citations. Sum the deficits (max(0, h − c[i])) and check if ≤ L extra citations are needed. Binary search h. Sections build it one piece at a time.",
        "논문 오름차순 정렬. 후보 h-index 에 대해, 인용수 상위 h 개 논문이 각자 ≥ h 인용 필요. 부족분 (max(0, h − c[i])) 의 합 ≤ L 인지 확인. h 를 이분 탐색. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAcowdemia1Sections(E),
    },
  ];
}
