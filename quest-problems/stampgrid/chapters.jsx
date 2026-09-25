import { C, t } from "@/components/quest/theme";
import { getStampGridSections, StampSimulator } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeStampCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We have an N\u00d7N canvas and a K\u00d7K stamp that can be rotated 4 ways.\nCan we recreate the desired pattern by stamping?\n\ud83d\udcee", "\ub3c4\uc7a5\uc744 \ucc0d\uc5b4\uc11c \uc774 \ubb34\ub2ac\ub97c \uadf8\ub300\ub85c \ub9cc\ub4e4 \uc218 \uc788\uc744\uae4c\uc694?\ud83d\udcee"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcee"}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Stamp Grid</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #2</div>
          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginTop: 12, marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E, "Decide if a K×K stamp (rotatable 4 ways) can recreate the N×N pattern exactly.", "네 방향으로 돌릴 수 있는 K×K 도장으로 N×N 무늬를 똑같이 만들 수 있는지 가려내요.")}
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N\u00d7N grid (desired pattern).\nK\u00d7K stamp (can rotate 0/90/180/270\u00b0). Place stamp at any valid position, any rotation. Can we match the pattern exactly?",
              "N\u00d7N \uaca9\uc790\uc5d0 \ub9cc\ub4e4\uace0 \uc2f6\uc740 \ubb34\ub2ac\uac00 \uc788\uc5b4\uc694.\n\ub3c4\uc7a5\uc740 K\u00d7K \uc774\uace0 0/90/180/270\u00b0 \ub85c \ub3cc\ub9b4 \uc218 \uc788\uc5b4\uc694.\n\uc5b4\ub290 \uc790\ub9ac\uc5d0 \uc5b4\ub290 \ubc29\ud5a5\uc73c\ub85c\ub4e0 \ucc0d\uc744 \uc218 \uc788\uc5b4\uc694.\n\uc774 \ubb34\ub2ac\ub97c \ub611\uac19\uc774 \ub9cc\ub4e4 \uc218 \uc788\uc744\uae4c\uc694?")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  T test cases, each with a target grid and a stamp.",
        "입력은 T 개의 테스트 케이스로 들어와요. 각 케이스에 목표 무늬와 도장이 있어요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— target grid size", "— 목표 무늬 크기")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>*. row</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— N lines: the target grid", "— N줄: 목표 무늬")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— stamp size", "— 도장 크기")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>*. row</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— K lines: the stamp", "— K줄: 도장 무늬")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this block repeats T times", "↑ 이 묶음이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each test case, YES or NO on its own line (T lines total).",
                  "테스트 케이스마다 YES 또는 NO 를 한 줄씩 출력해요 (T 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 100</div>
              <div>1 ≤ N ≤ 20</div>
              <div>1 ≤ K ≤ N</div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "The stamp can be rotated 4 ways (0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0).\nEach placement covers a K\u00d7K area on the canvas.", "\ub3c4\uc7a5\uc740 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0 \ub85c \ub3cc\ub9b4 \uc218 \uc788\uc5b4\uc694.\n\ud55c \ubc88 \ucc0d\uc73c\uba74 \uce94\ubc84\uc2a4\uc758 K\u00d7K \ub113\uc774\ub97c \ub36e\uc5b4\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#059669", marginBottom: 10 }}>
              {t(E, "4 Rotations", "4\ubc29\ud5a5 \ud68c\uc804")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {["0\u00b0", "90\u00b0", "180\u00b0", "270\u00b0"].map((r, i) => (
                <div key={i} style={{
                  background: "#d1fae5", borderRadius: 8, padding: "8px 14px",
                  fontSize: 14, fontWeight: 600, color: "#065f46",
                  border: "1px solid #6ee7b7",
                  transform: `rotate(${i * 90}deg)`,
                }}>{"\ud83d\udcee"}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#059669", marginTop: 10 }}>
              {t(E, "Same stamp, 4 orientations!", "\uac19\uc740 \ub3c4\uc7a5\uc778\ub370 \ubc29\ud5a5\uc740 \ub124 \uac00\uc9c0\uc608\uc694!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A stamp can be rotated 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0.\nThat's 4 orientations total, right?", "\ub3c4\uc7a5\uc744 \ub3cc\ub9b4 \uc218 \uc788\ub294 \ubc29\ud5a5\uc740 \uba87 \uac00\uc9c0\uc77c\uae4c\uc694?"),
      question: t(E, "How many orientations does the stamp have?", "\ub3c4\uc7a5\uc758 \ubc29\ud5a5\uc740 \ubaa8\ub450 \uba87 \uac00\uc9c0\uc77c\uae4c\uc694?"),
      options: ["2", "4", "8"],
      correct: 1,
      explain: t(E, "4 rotations: 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0!", "0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0 \u2014 \ubaa8\ub450 \ub124 \uac00\uc9c0\uc608\uc694."),
    },
    {
      type: "input",
      narr: t(E,
        "If canvas is 3\u00d73 and stamp is 2\u00d72, valid top-left positions are (0,0), (0,1), (1,0), (1,1).\nThat's (3-2+1) \u00d7 (3-2+1) = 4 positions!", "\ub3c4\uc7a5\uc744 \uc5b4\ub514\uc5d0 \ub193\uc744 \uc218 \uc788\ub294\uc9c0 \uc138\uc5b4 \ubd10\uc694."),
      question: t(E, "Canvas 3\u00d73, stamp 2\u00d72 \u2192 max positions?", "\uce94\ubc84\uc2a4\uac00 3\u00d73, \ub3c4\uc7a5\uc774 2\u00d72 \uc608\uc694.\n\ub3c4\uc7a5\uc744 \ub193\uc744 \uc218 \uc788\ub294 \uc790\ub9ac\ub294 \uba87 \uad70\ub370\uc77c\uae4c\uc694?"),
      hint: t(E, "Top-left rows: 0, 1. Top-left cols: 0, 1. Count the pairs.", "\uc67c\ucabd \uc704 \uce78\uc774 \uc62c \uc218 \uc788\ub294 \ud589\uc740 0, 1 \uc774\uc5d0\uc694.\n\uc5f4\ub3c4 0, 1 \uc774\uace0\uc694. \uadf8 \uc9dd\uc774 \uba87 \uac1c\uc778\uc9c0 \uc138\uc5b4 \ubd10\uc694."),
      answer: 4,
    },
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself! Pick a rotation and position, then stamp. The legality rule: every '*' of the stamp must land on a '*' of the target.",
        "\ubc29\ud5a5\uacfc \uc790\ub9ac\ub97c \uace8\ub77c \ub3c4\uc7a5\uc744 \uc9c1\uc811 \ucc0d\uc5b4 \ubd10\uc694."),
      content: <StampSimulator E={E} />,
    },
    {
      type: "reveal",
      narr: t(E,
        "Approach: Try all positions and rotations.\nFor each combination, check if the stamped cells match the desired pattern!", "\ubaa8\ub4e0 \uc790\ub9ac\uc640 \ubaa8\ub4e0 \ubc29\ud5a5\uc744 \ub2e4 \ud574\ubcf4\uba74 \ub3fc\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#059669", marginBottom: 10 }}>
              {t(E, "Brute Force Strategy", "\uc644\uc804\ud0d0\uc0c9 \u2014 \ub2e4 \ud574\ubcf4\uae30")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "1. Generate 4 rotations of the stamp\n2. For each rotation, try all (N-K+1) \u00d7 (N-K+1) positions\n3. For each placement, check if stamp cells match canvas\n4. Output YES if any combination works",
                "1. \ub3c4\uc7a5\uc744 \ub124 \ubc29\ud5a5\uc73c\ub85c \ub3cc\ub824 \ub194\uc694\n2. \ubc29\ud5a5\ub9c8\ub2e4 (N-K+1) \u00d7 (N-K+1) \uad70\ub370 \uc790\ub9ac\ub97c \ub2e4 \ud574\ubd10\uc694\n3. \ucc0d\uc744 \ub54c\ub9c8\ub2e4 \ub3c4\uc7a5 \uce78\uc774 \uce94\ubc84\uc2a4\uc640 \ub9de\ub294\uc9c0 \ubd10\uc694\n4. \ub9de\ub294 \ubc29\ubc95\uc774 \ud558\ub098\ub77c\ub3c4 \uc788\uc73c\uba74 YES \ub97c \ucd9c\ub825\ud574\uc694")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeStampCh2(E, lang = "py") {
  return [
    {
      type: "opt-codewalk",
      narr: t(E,
        "The solution code, start to finish — toggle Python ↔ C++ via the header.", "풀이 코드를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
    {
      type: "quiz",
      narr: t(E,
        "To rotate a grid 90\u00b0 clockwise, what transformation do we apply?", "\uaca9\uc790\ub97c 90\u00b0 \uc2dc\uacc4 \ubc29\ud5a5\uc73c\ub85c \ub3cc\ub9ac\ub824\uba74 \uc5b4\ub5bb\uac8c \ud560\uae4c\uc694?"),
      question: t(E, "90\u00b0 clockwise rotation: new[c][R-1-r] = old[r][c]?", "90\u00b0 \uc2dc\uacc4 \ubc29\ud5a5\uc73c\ub85c \ub3cc\ub9ac\uba74 new[c][R-1-r] = old[r][c] \uac00 \ub9de\uc744\uae4c\uc694?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! Row r, col c maps to row c, col R-1-r.", "\ub9de\uc544\uc694! r \ud589 c \uc5f4\uc5d0 \uc788\ub358 \uac83\uc774 c \ud589 R-1-r \uc5f4\ub85c \uac00\uc694."),
    },
    {
      type: "input",
      narr: t(E,
        "If N=5 and K=3, how many positions can we place the stamp in a single rotation?", "N=5, K=3 \uc77c \ub54c \ub3c4\uc7a5\uc744 \ub193\uc744 \uc790\ub9ac\ub294 \uba87 \uad70\ub370\uc77c\uae4c\uc694?"),
      question: t(E, "(5-3+1)\u00b2 = ?", "(5-3+1)\u00b2 = ?"),
      hint: t(E, "3\u00b2 = 9", "3\u00b2 = 9"),
      answer: 9,
    },
  ];
}
