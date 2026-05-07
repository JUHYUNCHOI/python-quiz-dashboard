import { C, t } from "@/components/quest/theme";
import { getFeedCowsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "# covered_g[i] = True if cow i is covered by a G patch",
  "# covered_h[i] = True if cow i is covered by an H patch",
  "patches = 0",
  "last_g = -1  # rightmost position covered by G patch",
  "last_h = -1  # rightmost position covered by H patch",
  "",
  "for i in range(N):",
  "    if s[i] == 'G' and i > last_g:",
  "        # Place G patch as far right as possible",
  "        patches += 1",
  "        last_g = i + K  # covers i to i+K",
  "    elif s[i] == 'H' and i > last_h:",
  "        # Place H patch as far right as possible",
  "        patches += 1",
  "        last_h = i + K  # covers i to i+K",
  "",
  "print(patches)",
];


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
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of patches needed", "필요한 최소 패치 수")}</b>
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
        "Greedy: cow 0 is uncovered, place G patch. It covers positions 0 to 0+1=1. Cow 2 is uncovered, place another. But actually: patch at pos 0+K=1 covers 0 to 1+0? No: a patch at position p covers [p-K, p+K]? No, cow at pos i needs patch within K. So patch at pos 1 covers cows 0,1,2. Answer: 1.",
        "그리디: 소 0이 미커버, G 패치 놓아요. 위치 0+K=1에 놓으면 소 0, 1, 2 모두 커버. 답: 1."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeFeedCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Track separately for each breed: the right-end of the last patch placed (last_G, last_H). When a cow of breed B at position i is past last_B, place a NEW patch at position i — extending its coverage to i + K.",
        "품종별로 따로 추적: 마지막에 놓은 패치의 오른쪽 끝 (last_G, last_H). 품종 B 의 소가 위치 i 에 있고 i > last_B 이면, 위치 i 에 새 패치를 놓아 — 커버 범위를 i + K 까지 확장."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getFeedCowsSections(E),
    },
  ];
}
