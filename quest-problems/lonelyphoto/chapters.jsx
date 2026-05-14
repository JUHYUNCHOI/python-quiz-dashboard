import { C, t } from "@/components/quest/theme";
import { getLonelyPhotoSections } from "./components";

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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Lonely Photo</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #1</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Count contiguous groups of 3+ cows where exactly one cow's breed differs from all the rest.",
                "\ud55c \ub9c8\ub9ac\ub9cc \ub098\uba38\uc9c0\uc640 \ud488\uc885\uc774 \ub2e4\ub978 \u2014 \uc5f0\uc18d 3 \ub9c8\ub9ac \uc774\uc0c1 \ubb36\uc74c\uc758 \uac1c\uc218\ub97c \ucd9c\ub825.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A photo is a ", "사진은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous group of 3 or more cows", "연속한 3마리 이상의 묶음")}</b>
                  {t(E, " from the row.", "이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A photo is ", "사진이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "'lonely'", "'외로운' 사진")}</b>
                  {t(E, " if exactly ONE cow in it has a different breed from all the others (e.g., 'GHG', 'HHGHH').",
                        "이 되려면 그 안에서 정확히 1마리만 나머지와 다른 품종이어야 해요 (예: 'GHG', 'HHGHH').")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Look at 'GHG' — count G's, count H's, decide.",
        "'GHG' 보고 — G 몇 개, H 몇 개, 그래서 외로운 거 맞아?"),
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
        "Walk through every length-3, length-4, length-5 chunk of 'GHGHG' and count the lonely ones.",
        "'GHGHG' 의 길이 3, 4, 5 묶음을 모두 훑어. 외로운 거 몇 개?"),
      question: t(E,
        "s = 'GHGHG'. How many lonely photos?",
        "s = 'GHGHG'. 외로운 사진 수는?"),
      hint: t(E,
        "Each length is its own family — count 1-only chunks separately for length 3, 4, 5.",
        "길이별로 따로 — 3 짜리, 4 짜리, 5 짜리 각각 외로운 건 몇 개?"),
      answer: 3,
    },
    {
      type: "sim",
      narr: t(E,
        "Stand at each cow i and look around — how far does my breed stretch, and what's beyond?",
        "각 소 i 자리에 서서 둘러봐 — 내 품종이 어디까지 이어지고, 그 너머는 어때?"),
    },
    // 1-5: Window-scanner sim — change s and the window size, see every lonely window light up green.
    {
      type: "windowSim",
      narr: t(E,
        "Type your own G/H string and slide the window size — every length-w substring with exactly one minority breed lights up green. Watch the count change as you grow w.",
        "G/H 문자열을 직접 입력하고 창 크기 슬라이더를 움직여봐 — 길이 w 묶음 중 한 품종만 1마리인 것이 초록으로 켜져. 창을 키워가며 개수가 어떻게 바뀌는지 관찰."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLonelyPhotoCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in, no placeholder.
    {
      type: "progressive",
      narr: t(E,
        "For each cow i, count same-type neighbors and the opposite-type cows beyond. The formula combines those into the lonely count.  Sections build it one piece at a time.",
        "각 소 i 마다 — 같은 품종 이웃이 어디까지인지, 그 너머 반대 품종이 몇 마리인지 세고 공식으로 합쳐. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getLonelyPhotoSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own G/H string.", "직접 G/H 문자열 시도."),
    },
  ];
}
