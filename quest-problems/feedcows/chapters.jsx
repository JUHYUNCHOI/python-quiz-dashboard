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
        "N cows of breed G or H stand at distinct positions on a number line. FJ places grass patches (each patch is type G or H) on integer positions. Each cow must have a SAME-BREED patch within distance K of her — and a single patch can satisfy any number of cows of its breed within K.\nFind the MINIMUM number of patches needed.",
        "N마리 소가 G 또는 H 품종으로 수직선의 서로 다른 정수 위치에 서있어요. FJ 가 풀 패치 (G 종류 또는 H 종류) 를 정수 위치에 놓아요. 각 소는 자기 품종과 같은 패치가 거리 K 이내에 있어야 해요 — 한 패치는 거리 K 이내의 같은 품종 소들을 한꺼번에 처리해요.\n필요한 최소 패치 수를 출력해요."),
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
                "모든 소가 거리 K 이내에 자기 품종 패치를 가지도록 하는 최소 패치 수를 출력.")}
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
                        " 에 있어야 해요 — 한 패치가 K 이내의 같은 품종 소들을 모두 만족.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of patches", "최소 패치 수")}</b>
                  {t(E, ", then one valid placement string ('.', 'G', 'H') — for each of the T test cases.",
                        " 와 한 가지 유효한 배치 문자열 ('.', 'G', 'H') 을 출력해요 — T개의 테스트 케이스 각각에 대해.")}
                </div>
              </div>
            </div>
          </div>

          {/* 👀 Eye-evident visualization — additive */}
          <FeedCowsNumberLineViz E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "breeds = \"GH\", K = 0.\nEach cow can only reach its own position.\nHow many patches needed?", "breeds = \"GH\", K = 0. 각 소는 자기 위치만 도달 가능. 패치 몇 개 필요?"),
      question: t(E,
        "\"GH\", K = 0. How many patches?",
        "\"GH\", K = 0. 패치 몇 개?"),
      options: [
        t(E, "2 (one G at pos 0, one H at pos 1)", "2개 (G 하나 위치 0, H 하나 위치 1)"),
        t(E, "1 (one patch covers both)", "1개 (하나로 둘 다 커버)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! K=0 means each patch only covers its own position, and patches must match breed. So we need 1 G patch and 1 H patch = 2 total.",
        "맞아! K=0이면 패치는 자기 위치만 커버하고, 품종이 맞아야 해요. G 패치 1개 + H 패치 1개 = 총 2개."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GGG\", K = 1.\nA patch at position 1 covers positions 0, 1, 2.\nHow many patches minimum?", "breeds = \"GGG\", K = 1. 위치 1의 패치는 위치 0, 1, 2를 커버해요. 최소 패치 수는?"),
      question: t(E,
        "\"GGG\", K = 1. Min patches?",
        "\"GGG\", K = 1. 최소 패치 수?"),
      hint: t(E,
        "Place a patch as far right as possible while still covering the leftmost uncovered cow of that breed.",
        "그 품종의 가장 왼쪽 미커버 소를 여전히 커버하면서 패치를 가능한 한 오른쪽에 놓아 봐."),
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
        "Track per breed how far it is already satisfied (g_cover, h_cover). When a cow of breed B at position i is not yet covered, place a NEW patch as far right as it can still reach — at position i + K — which then covers same-breed cows up to i + 2K. There are T test cases, and each prints the count plus the patch string. Sections build it one piece at a time.",
        "품종별로 어디까지 이미 만족됐는지 추적 (g_cover, h_cover). 품종 B 의 소가 i 에 있고 아직 미커버이면, 여전히 닿을 수 있는 가장 오른쪽 — 위치 i + K — 에 새 패치를 놓아. 그러면 같은 품종 소를 i + 2K 까지 커버해. 테스트 케이스가 T개이고, 각각 개수와 패치 문자열을 출력해. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getFeedCowsSections(E),
    },
  ];
}
