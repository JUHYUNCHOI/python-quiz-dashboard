import { C, t } from "@/components/quest/theme";
import { getCandyCaneSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "M = int(data[p])",
  "p += 1",
  "h = [int(data[p + i]) for i in range(N)]; p += N        # cow heights",
  "canes = [int(data[p + i]) for i in range(M)]            # cane heights, one line",
  "",
  "for curr in canes:",
  "    taken = 0   # how much of THIS cane has already been eaten",
  "    for i in range(N):",
  "        if h[i] > taken:",
  "            # cow i can reach the un-eaten portion from `taken`",
  "            # up to min(curr, h[i])",
  "            inc = min(curr, h[i]) - taken",
  "            if inc > 0:",
  "                h[i] += inc        # cow grows by what it ate",
  "                taken += inc",
  "        if taken >= curr:",
  "            break                  # cane fully eaten",
  "",
  "for x in h:",
  "    print(x)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCandyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows and hangs M candy canes from above, one at a time. For each cane, every cow walks up in order and eats the bottom of the cane up to her own height — and GROWS by the amount she ate.\nAfter all canes, print each cow's final height.",
        "FJ에게 N마리 소가 있고, M개의 캔디 케인을 위에서 한 개씩 매달아요. 각 캔디마다 모든 소가 차례로 다가가, 자기 키까지 캔디 아랫부분을 먹고, 먹은 양만큼 키가 커져요.\n모든 캔디가 끝난 뒤 각 소의 최종 키를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🍬</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Candy Cane Feast</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "After all M canes are eaten, output each cow's final height (one per line).",
                "M 개 캔디 케인을 모두 처리한 뒤 각 소의 최종 키를 한 줄씩 출력.")}
            </div>
          </div>

          {/* Mini-visual: 3 cows eating one cane height 6 */}
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Tiny example: cow heights [3, 2, 5], one cane of height 6 →",
                    "작은 예: 소 키 [3, 2, 5], 캔디 케인 높이 6 →")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[
                { who: t(E, "Cow 1 (h=3)", "소 1 (키 3)"), reach: "0 → 3", ate: 3, newH: 6, hi: true },
                { who: t(E, "Cow 2 (h=2)", "소 2 (키 2)"), reach: t(E, "can't reach 3", "3 에 못 닿음"), ate: 0, newH: 2, hi: false },
                { who: t(E, "Cow 3 (h=5)", "소 3 (키 5)"), reach: "3 → 5", ate: 2, newH: 7, hi: true },
              ].map((c, i) => (
                <div key={i} style={{ background: "#fff", border: `1px solid ${c.hi ? "#dc2626" : "#fca5a5"}`, borderRadius: 10, padding: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>{c.who}</div>
                  <div style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}>{c.reach}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.hi ? "#dc2626" : C.dim }}>{t(E, "ate", "먹음")} {c.ate}</div>
                  <div style={{ fontSize: 11, color: C.text, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
                    {t(E, "h →", "키 →")} <b style={{ color: "#dc2626" }}>{c.newH}</b>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.text, lineHeight: 1.6, textAlign: "center" }}>
              {t(E, "After cow 1 eats 0 → 3, the next cow starts at the new bottom = 3.  Cow 2 is too short.  Cow 3 keeps eating from 3 → 5.  Cane top (6) reached only partially — the rest (5 → 6) is wasted.",
                    "소 1 이 0 → 3 먹은 후 다음 소는 새 bottom = 3 부터. 소 2 는 너무 작음. 소 3 이 3 → 5 까지 먹음. 캔디 꼭대기 (6) 까지 다 못 먹어 5 → 6 부분은 버려짐.")}
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
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, " in a fixed order, each starting with some height.",
                        "가 정해진 순서로 서있고, 각 소는 시작 키를 가지고 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He hangs ", "FJ가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "M candy canes", "M개 캔디 케인")}</b>
                  {t(E, " one at a time. Each cane goes from height 0 (touches ground) up to its own height.",
                        "을 위에서 하나씩 매달아요. 각 캔디는 바닥(높이 0)부터 자기 높이까지 매달려 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For each cane, every cow walks up in order: she eats the bottom up to her own height, and ", "각 캔디마다 모든 소가 차례로 다가가요. 자기 키까지 아랫부분을 먹고, ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "grows by the amount she ate", "먹은 만큼 키가 커져요")}</b>
                  {t(E, ". (If the bottom is already higher than her, she eats nothing.)",
                        ". (캔디 아래가 자기 키보다 위에 있으면 못 먹어요.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "After all M candy canes, print each cow's ", "M개 캔디가 끝난 뒤, 각 소의 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "final height", "최종 키")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input format: N M, then N cow heights on one line, then M cane heights on one line.",
        "입력: 첫 줄 N M, 두 번째 줄 소 N 마리 키, 세 번째 줄 캔디 M 개 높이."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d", whiteSpace: "pre" }}>
{`3 2
3 2 5
6 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`7
2
7`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Cane 1 (height 6).  Cows [3, 2, 5] → eat to [6, 2, 7].  (cow 2 can't reach 3.)",
                    "캔디 1 (높이 6). 소 [3, 2, 5] → [6, 2, 7] 로 자라남. (소 2 는 3 에 못 닿음.)")}
              <br/>
              {t(E, "Cane 2 (height 1).  Cow 1 (height 6) eats 0 → 1, becomes 7.  Cane fully eaten.",
                    "캔디 2 (높이 1). 소 1 (키 6) 이 0 → 1 먹음, 키 7 이 됨. 캔디 다 먹음.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ final heights = 7, 2, 7.", "→ 최종 키 = 7, 2, 7.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — single cow eating
    {
      type: "quiz",
      narr: t(E,
        "A cow has height 3 and faces a candy cane of height 6.\nThe candy hangs from 0 to 6.\nThe cow can reach up to height 3.\nHow much does it eat?", "키 3인 소가 높이 6짜리 캔디 케인을 만났어. 캔디는 0~6에 있어요. 소는 높이 3까지 닿아. 얼마나 먹을까?"),
      question: t(E,
        "Cow height = 3, candy cane height = 6. How much does the cow eat?",
        "소 키 = 3, 캔디 높이 = 6. 소가 얼마나 먹어?"),
      options: [
        t(E, "6 (eats everything)", "6 (다 먹음)"),
        t(E, "3 (eats up to its height)", "3 (자기 키까지 먹음)"),
        t(E, "0 (can't reach)", "0 (닿지 못함)"),
      ],
      correct: 1,
      explain: t(E,
        "The cow can only reach up to height 3, so it eats the portion from 0 to 3 = 3 units!",
        "소는 높이 3까지만 닿으니까 0~3 부분인 3만큼 먹어!"),
    },
    // 1-3: Input — multi-cow scenario
    {
      type: "input",
      narr: t(E,
        "Cow 1 ate first; the bottom of the cane has risen.  Now it's cow 2's turn.",
        "소 1 이 먼저 먹어 캔디 bottom 이 올라갔어. 이제 소 2 차례."),
      question: t(E,
        "Cow heights [3,2,5], candy height 6.\nAfter cow1 eats 0→3, bottom=3.\nCow2 height=2, bottom=3.\nHow much does cow2 eat?",
        "소 키 [3,2,5], 캔디 높이 6.\n소1이 0→3 먹고 bottom=3.\n소2 키=2, bottom=3.\n소2가 먹는 양은?"),
      hint: t(E,
        "Can cow 2 reach the new bottom?  If not, she eats nothing.",
        "소 2 가 새 bottom 에 닿을 수 있어? 안 닿으면 못 먹음."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCandyCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight to the build.
    {
      type: "progressive",
      narr: t(E,
        "For each cane, walk the cows in order — track 'taken' = how much of this cane has been eaten so far.  Sections build the loop one piece at a time.",
        "각 캔디마다 소를 순서대로 처리. 'taken' = 이 캔디에서 지금까지 먹은 양. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCandyCaneSections(E),
    },
  ];
}
