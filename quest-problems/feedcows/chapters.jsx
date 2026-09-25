import { C, t } from "@/components/quest/theme";
import { getFeedCowsSections, FeedCowsNumberLineViz } from "./components";

/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeFeedCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Place same-breed grass near every cow, using as few patches as possible.",
        "소마다 가까이에 같은 품종 풀을 놓되, 풀을 가장 적게 써요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf3e"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Feeding the Cows</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of grass patches so every cow has a same-breed patch within distance K.",
                "모든 소가 거리 K 안에 자기 품종 패치를 갖도록 패치를 가장 적게 놓아요.")}
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
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, ", each of breed ", " 가 있고, 각 소는 품종 ")}
                  <b style={{ color: "#7c3aed" }}>G or H</b>
                  {t(E, ", at distinct integer positions on a number line.",
                        " 이며 수직선 위 서로 다른 정수 위치에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ places grass patches ", "FJ 는 풀 패치 (각각 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "(each patch is type G or H)", "G 또는 H 종류)")}</b>
                  {t(E, " on integer positions.", " 를 정수 위치에 놓아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each cow must have a ", "각 소는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "same-breed patch within distance K", "자기 품종과 같은 패치가 거리 K 이내")}</b>
                  {t(E, " — one patch can serve many cows of its breed within K.",
                        " 에 있어야 해요 — 패치 하나가 K 안의 같은 품종 소를 다 먹여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of patches", "최소 패치 수")}</b>
                  {t(E, ", then one valid placement string ('.', 'G', 'H') — for each of the T test cases.",
                        " 와 놓은 자리를 보여 주는 문자열 ('.', 'G', 'H') 을 출력해요 — 테스트 T 개마다요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 👀 Eye-evident visualization — additive */}
          <FeedCowsNumberLineViz E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문 cpid=1252) — 시즌 표준(photoshoot25) 형식
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  T test cases, each N K then a breed string.",
        "입력은 테스트 T개, 각각 N K와 품종 문자열이에요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows, max distance", "— 소의 수, 최대 거리")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>s</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— breed string, length N ('G' or 'H')", "— 품종 문자열, 길이 N ('G' 또는 'H')")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these 2 lines repeat T times", "↑ 이 두 줄이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each test case, two lines — the minimum number of patches, then a length-N placement string ('.', 'G', 'H').",
                  "테스트마다 두 줄 — 최소 패치 수와, 길이 N 인 배치 문자열 ('.', 'G', 'H') 을 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 10⁵ {t(E, "(= 100,000)", "(= 10만)")}</div>
              <div>0 ≤ K ≤ N − 1</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "breeds = \"GH\", K = 0.\nEach cow can only reach its own position.\nHow many patches needed?", "K = 0 이면 소는 자기 자리만 닿아요. 패치가 몇 개 필요할까요?"),
      question: t(E,
        "\"GH\", K = 0. How many patches?",
        "\"GH\", K = 0 이면 패치가 몇 개 필요할까요?"),
      options: [
        t(E, "2 (one G at pos 0, one H at pos 1)", "2개 (G 하나 위치 0, H 하나 위치 1)"),
        t(E, "1 (one patch covers both)", "1개 (하나로 둘 다 커버)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! K=0 means each patch only covers its own position, and patches must match breed. So we need 1 G patch and 1 H patch = 2 total.",
        "맞아요! K = 0 이면 패치는 자기 자리만 덮고 품종도 같아야 해요.\n그래서 G 패치 1 개와 H 패치 1 개, 모두 2 개예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GGG\", K = 1.\nA patch at position 1 covers positions 0, 1, 2.\nHow many patches minimum?", "위치 1 의 패치는 0, 1, 2 를 덮어요. 패치가 몇 개면 될까요?"),
      question: t(E,
        "\"GGG\", K = 1. Min patches?",
        "\"GGG\", K = 1 이면 패치가 가장 적게 몇 개일까요?"),
      hint: t(E,
        "Place a patch as far right as possible while still covering the leftmost uncovered cow of that breed.",
        "아직 못 먹은 가장 왼쪽 소가 닿는 한, 패치를 최대한 오른쪽에 놓아 봐요."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeFeedCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "When a cow isn't covered yet, place a new patch as far right as she can reach.",
        "못 먹은 소가 나오면 그 소가 닿는 가장 오른쪽에 패치를 놓아요."),
      sections: getFeedCowsSections(E),
    },
  ];
}
