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
        "How many photos have exactly one cow of a different breed?",
        "한 마리만 품종이 다른 사진이 몇 장이나 나올까요?"),
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
                "\uc5f0\uc18d\ud55c 3 \ub9c8\ub9ac \uc774\uc0c1\uc758 \ubb36\uc74c \uc911\uc5d0\uc11c \ud55c \ub9c8\ub9ac\ub9cc \ud488\uc885\uc774 \ub2e4\ub978 \ubb36\uc74c\uc774 \uba87 \uac1c\uc778\uc9c0 \ucd9c\ub825\ud574\uc694.")}
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
        "'GHG' 에서 G 가 몇 마리, H 가 몇 마리인지 세어 봐요."),
      question: t(E,
        "In 'GHG', is the H a lonely cow?",
        "'GHG' 에서 H 는 외로운 소일까요?"),
      options: [
        t(E, "Yes, it's the only H among 2 G's", "맞아요, G 두 마리 사이에 H 가 하나뿐이에요"),
        t(E, "No, there must be exactly 1 G", "아니에요, G 가 한 마리여야 해요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A lonely photo has exactly 1 of one type. 'GHG' has 1 H among 2 G's, so H is lonely.",
        "외로운 사진은 한쪽 품종이 딱 한 마리인 사진이에요. 'GHG' 는 G 두 마리에 H 한 마리라 H 가 외로워요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Walk through every length-3, length-4, length-5 chunk of 'GHGHG' and count the lonely ones.",
        "'GHGHG' 에서 길이 3, 4, 5 묶음을 모두 살펴봐요."),
      question: t(E,
        "s = 'GHGHG'. How many lonely photos?",
        "s = 'GHGHG' 일 때 외로운 사진은 몇 장일까요?"),
      hint: t(E,
        "Each length is its own family — count 1-only chunks separately for length 3, 4, 5.",
        "길이별로 나눠서 세어 봐요. 3 짜리, 4 짜리, 5 짜리에 각각 몇 개가 있나요?"),
      answer: 3,
    },
    {
      type: "sim",
      narr: t(E,
        "Stand at each cow i and look around — how far does my breed stretch, and what's beyond?",
        "소 하나를 골라 왼쪽과 오른쪽에 무엇이 있는지 봐요."),
    },
    // 1-5: Window-scanner sim — change s and the window size, see every lonely window light up green.
    {
      type: "windowSim",
      narr: t(E,
        "Change the window length and watch lonely groups light up.",
        "묶음 길이를 바꿔 가며 외로운 묶음이 켜지는 걸 봐요."),
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
        "Fix one cow as the lonely one and count both sides.",
        "소 하나를 외로운 소로 정해 놓고 양옆을 세어 볼게요."),
      sections: getLonelyPhotoSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own G/H string.", "G 와 H 로 된 문자열을 직접 넣어 봐요."),
    },
  ];
}
