import { C, t } from "@/components/quest/theme";
import { getStallingSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "cows = sorted([int(input()) for _ in range(N)])",
  "stalls = sorted([int(input()) for _ in range(N)])",
  "",
  "# For each cow (sorted), count how many stalls it fits in",
  "# Then multiply choices, subtracting already-assigned stalls",
  "ans = 1",
  "j = 0  # pointer into stalls",
  "for i in range(N):",
  "    # cow i (sorted ascending) can fit in stalls where stall height >= cow height",
  "    while j < N and stalls[j] < cows[i]:",
  "        j += 1",
  "    choices = N - j - i  # available stalls minus already assigned",
  "    # Wait, need to be more careful:",
  "    # After sorting both, cow[i] can use stalls[j..N-1]",
  "    # But i cows before already took i stalls from that range",
  "    # So choices = (N - j) - i",
  "    ans *= (N - j) - i",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N cows (each with a height) and N stalls (each with a maximum height limit). Each stall can hold AT MOST ONE cow, and a cow can be assigned to a stall only if her height is ≤ the stall's limit.\nCount the number of valid one-to-one assignments of cows to stalls.",
        "N마리 소(각자 키)와 N개 축사(각자 최대 키 제한)가 있어요. 각 축사에 한 마리만 배정할 수 있고, 소의 키가 축사 제한 이하일 때만 그 축사에 배정 가능해요.\n소를 축사에 한 마리씩 배정하는 방법의 수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Just Stalling</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of valid one-to-one cow ↔ stall assignments.",
                "유효한 소 ↔ 축사 일대일 배정의 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, " (each with a height) and ", "와 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N stalls", "N개 축사")}</b>
                  {t(E, " (each with a maximum height limit).",
                        " 가 있어요. 각자 키와 축사 최대 키 제한이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each stall holds ", "각 축사에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "at most one cow", "최대 1마리만 배정")}</b>
                  {t(E, ", and a cow fits only if her height ≤ the stall limit.",
                        " 가능해요. 소는 자기 키 ≤ 축사 제한 일 때만 그 축사에 들어가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of valid one-to-one assignments", "소를 축사에 한 마리씩 배정하는 방법의 수")}</b>
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
        "Cows have heights [1,2] and stalls have limits [2,2]. How many valid arrangements?", "소 높이 [1,2], 축사 제한 [2,2]일 때 유효한 배정 수는?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?",
        "소: [1,2], 축사: [2,2]. 유효한 배정 수?"),
      options: [
        t(E, "2 (both cows fit in both stalls)", "2 (두 소 모두 두 축사에 가능)"),
        t(E, "1 (only one way)", "1 (한 가지만 가능)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Cow 1 (height 1) fits both stalls, cow 2 (height 2) fits both. So 2 x 1 = 2 arrangements.",
        "맞아! 소 1(높이 1)은 두 축사 모두 가능, 소 2(높이 2)도 두 축사 모두 가능. 2 x 1 = 2 배정."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?", "소: [1,2], 축사: [2,2]. 유효한 배정은 몇 가지?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. Number of valid arrangements?",
        "소: [1,2], 축사: [2,2]. 유효한 배정 수?"),
      hint: t(E,
        "Process the tallest cow first and multiply available choices.",
        "가장 큰 소부터 처리하면서 가능한 축사 수를 곱해 봐."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort cows and stalls ascending. Process the TALLEST cow first — she can use any stall with limit ≥ her height. Each next (smaller) cow has more stalls available minus those taken by taller cows. Sections build it one piece at a time.",
        "소·축사 오름차순 정렬. 가장 큰 소부터 — 자기 키 ≥ 인 축사 사용 가능. 다음 (더 작은) 소는 추가 가능 축사 − 이미 배정된 수. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getStallingSections(E),
    },
  ];
}
