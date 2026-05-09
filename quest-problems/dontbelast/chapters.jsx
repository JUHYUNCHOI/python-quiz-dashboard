import { C, t } from "@/components/quest/theme";
import { getDontBeLastSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "cows = ['Bessie','Elsie','Daisy','Gertie','Annabelle','Maggie','Henrietta']",
  "milk = {c: 0 for c in cows}",
  "",
  "N = int(input())",
  "for _ in range(N):",
  "    parts = input().split()",
  "    name = parts[0]",
  "    amt = int(parts[1])",
  "    milk[name] += amt",
  "",
  "vals = sorted(set(milk.values()))",
  "if len(vals) < 2:",
  "    print('Tie')",
  "else:",
  "    second = vals[1]",
  "    winners = [c for c in cows if milk[c] == second]",
  "    if len(winners) == 1:",
  "        print(winners[0])",
  "    else:",
  "        print('Tie')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Seven cows (Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta) produce milk. You're given a log of N entries, each saying how many gallons one cow produced on one occasion.\nFind the cow with the SECOND-lowest total production. If two or more cows are tied for second-lowest, print 'Tie'.",
        "일곱 마리 소(Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta)가 우유를 생산해요. N개의 기록이 주어지고, 각 기록은 한 번에 한 소가 생산한 갤런 수예요.\n총 생산량이 두 번째로 적은 소를 찾아요. 두 마리 이상이 두 번째 자리를 동률로 차지하면 'Tie'를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udd5b"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Don't Be Last!</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the cow with the second-lowest total milk, or 'Tie' if multiple cows tie for second.",
                "총 우유량이 두 번째로 적은 소의 이름을 출력 — 동률이면 'Tie'.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "7 named cows", "이름이 정해진 7마리 소")}</b>
                  {t(E, " — Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta.",
                        " — Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given a ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "log of N entries", "N개의 기록")}</b>
                  {t(E, " — each entry: a cow name and a gallon amount she produced that time.",
                        "이 주어져요 — 각 기록은 (소 이름, 그때 생산한 갤런 수).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows not in the log are treated as having ", "기록에 없는 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "0 gallons total", "총 생산량 0")}</b>
                  {t(E, ".", "으로 취급해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "총 생산량이 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "name of the cow whose total is second-lowest", "두 번째로 적은 소의 이름")}</b>
                  {t(E, " — or ", "을 출력해요. 두 번째 자리가 동률이면 ")}
                  <b style={{ color: "#dc2626" }}>'Tie'</b>
                  {t(E, " if 2+ cows tie for second.", " 출력.")}
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
        "All 7 cows produce 0 milk except Bessie who produces 5.\nThe minimum is 0 (six cows).\nThe second-lowest distinct value is 5.\nOnly Bessie has 5.\nWhat's the answer?", "Bessie만 5를 생산하고 나머지 6마리는 0이에요. 최솟값은 0 (6마리). 두 번째로 작은 고유값은 5. Bessie만 5를 가져요. 답은?"),
      question: t(E,
        "6 cows produce 0, Bessie produces 5. Who is second-lowest?",
        "6마리는 0, Bessie는 5. 두 번째로 적은 소는?"),
      options: [
        t(E, "Tie (6 cows at 0)", "Tie (0인 소 6마리)"),
        t(E, "Bessie", "Bessie (Bessie)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Min=0, second distinct value=5. Only Bessie has 5, so the answer is Bessie.",
        "맞아! 최솟값=0, 두 번째 고유값=5. Bessie만 5이므로 답은 Bessie야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "The problem always uses exactly 7 named cows. How many cows are there in total?", "이 문제에서는 항상 정확히 7마리의 이름 있는 소를 사용해요. 총 몇 마리예요?"),
      question: t(E,
        "How many named cows are in this problem?",
        "이 문제에서 이름 있는 소는 총 몇 마리?"),
      hint: t(E,
        "Re-read the problem statement — count the listed cow names.",
        "문제를 다시 읽어 봐 — 적힌 소 이름의 수를 세어 봐."),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sum each named cow's milk in a dict (cows not in the log default to 0). Find the second-lowest distinct total. If exactly one cow has that total, print her name; otherwise 'Tie'. Sections build it one piece at a time.",
        "딕셔너리로 각 소의 우유를 합산 (로그에 없는 소는 0). 두 번째로 낮은 서로 다른 총량을 찾아 — 그 값을 가진 소가 정확히 1 마리면 이름, 아니면 'Tie'. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getDontBeLastSections(E),
    },
  ];
}
