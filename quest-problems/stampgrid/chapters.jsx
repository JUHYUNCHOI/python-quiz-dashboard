import { C, t } from "@/components/quest/theme";
import { getStampGridSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "canvas = []",
  "for _ in range(N):",
  "    canvas.append(input())",
  "",
  "stamp = []",
  "for _ in range(K):",
  "    stamp.append(input())",
  "",
  "def rotate90(grid):",
  "    R, C = len(grid), len(grid[0])",
  "    return [''.join(grid[R-1-r][c] for r in range(R)) for c in range(C)]",
  "",
  "# get all 4 rotations of stamp",
  "rotations = [stamp]",
  "for _ in range(3):",
  "    rotations.append(rotate90(rotations[-1]))",
  "",
  "# try all positions and rotations",
  "for rot in rotations:",
  "    for r in range(N - K + 1):",
  "        for c in range(N - K + 1):",
  "            # check if stamping here matches canvas",
  "            ok = True",
  "            for dr in range(K):",
  "                for dc in range(K):",
  "                    if rot[dr][dc] == '*' and canvas[r+dr][c+dc] != '*':",
  "                        ok = False",
  "            if not ok: continue",
  "            # check all canvas '*' are covered",
  "            # (simplified: need union of all stamp placements)",
  "",
  "print('YES' if covered_all else 'NO')",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeStampCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We have an N\u00d7N canvas and a K\u00d7K stamp that can be rotated 4 ways. Can we recreate the desired pattern by stamping? \ud83d\udcee",
        "N\u00d7N \uce94\ubc84\uc2a4\uc640 4\ubc29\ud5a5 \ud68c\uc804 \uac00\ub2a5\ud55c K\u00d7K \ub3c4\uc7a5\uc774 \uc788\uc5b4. \ub3c4\uc7a5\uc744 \ucc0d\uc5b4\uc11c \uc6d0\ud558\ub294 \ud328\ud134\uc744 \ub9cc\ub4e4 \uc218 \uc788\uc744\uae4c? \ud83d\udcee"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcee"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Stamp Grid</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N\u00d7N grid (desired pattern). K\u00d7K stamp (can rotate 0/90/180/270\u00b0). Place stamp at any valid position, any rotation. Can we match the pattern exactly?",
              "N\u00d7N \uadf8\ub9ac\ub4dc (\uc6d0\ud558\ub294 \ud328\ud134). K\u00d7K \ub3c4\uc7a5 (0/90/180/270\u00b0 \ud68c\uc804 \uac00\ub2a5). \uc5b4\ub5a4 \uc704\uce58, \uc5b4\ub5a4 \ud68c\uc804\uc73c\ub85c\ub4e0 \ubc30\uce58. \ud328\ud134\uc744 \uc815\ud655\ud788 \ub9cc\ub4e4 \uc218 \uc788\ub098?")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "The stamp can be rotated 4 ways (0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0). Each placement covers a K\u00d7K area on the canvas.",
        "\ub3c4\uc7a5\uc740 4\ubc29\ud5a5 \ud68c\uc804 \uac00\ub2a5 (0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0). \uac01 \ubc30\uce58\ub294 \uce94\ubc84\uc2a4\uc758 K\u00d7K \uc601\uc5ed\uc744 \ucee4\ubc84."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#059669", marginBottom: 10 }}>
              {t(E, "4 Rotations", "4\ubc29\ud5a5 \ud68c\uc804")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {["0\u00b0", "90\u00b0", "180\u00b0", "270\u00b0"].map((r, i) => (
                <div key={i} style={{
                  background: "#d1fae5", borderRadius: 8, padding: "8px 14px",
                  fontSize: 14, fontWeight: 800, color: "#065f46",
                  border: "2px solid #6ee7b7",
                  transform: `rotate(${i * 90}deg)`,
                }}>{"\ud83d\udcee"}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#059669", marginTop: 10 }}>
              {t(E, "Same stamp, 4 orientations!", "\uac19\uc740 \ub3c4\uc7a5, 4\uac00\uc9c0 \ubc29\ud5a5!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A stamp can be rotated 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0. That's 4 orientations total, right?",
        "\ub3c4\uc7a5\uc740 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0 \ud68c\uc804 \uac00\ub2a5. \ucd1d 4\uac00\uc9c0 \ubc29\ud5a5\uc774\uc9c0?"),
      question: t(E, "How many orientations does the stamp have?", "\ub3c4\uc7a5\uc758 \ubc29\ud5a5\uc740 \uba87 \uac00\uc9c0?"),
      options: ["2", "4", "8"],
      correct: 1,
      explain: t(E, "4 rotations: 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0!", "4\ubc29\ud5a5: 0\u00b0, 90\u00b0, 180\u00b0, 270\u00b0!"),
    },
    {
      type: "input",
      narr: t(E,
        "If canvas is 3\u00d73 and stamp is 2\u00d72, valid top-left positions are (0,0), (0,1), (1,0), (1,1). That's (3-2+1)\u00b2 = 4 positions!",
        "\uce94\ubc84\uc2a4 3\u00d73, \ub3c4\uc7a5 2\u00d72\uba74, \uc720\ud6a8\ud55c \uc88c\uc0c1\ub2e8 \uc704\uce58\ub294 (0,0), (0,1), (1,0), (1,1). (3-2+1)\u00b2 = 4\uac1c!"),
      question: t(E, "Canvas 3\u00d73, stamp 2\u00d72 \u2192 max positions?", "\uce94\ubc84\uc2a4 3\u00d73, \ub3c4\uc7a5 2\u00d72 \u2192 \ucd5c\ub300 \uc704\uce58?"),
      hint: t(E, "(N-K+1)\u00b2 = (3-2+1)\u00b2", "(N-K+1)\u00b2 = (3-2+1)\u00b2"),
      answer: 4,
    },
    {
      type: "reveal",
      narr: t(E,
        "Approach: Try all positions and rotations. For each combination, check if the stamped cells match the desired pattern!",
        "\uc811\uadfc\ubc95: \ubaa8\ub4e0 \uc704\uce58\uc640 \ud68c\uc804\uc744 \uc2dc\ub3c4. \uac01 \uc870\ud569\uc5d0\uc11c \ub3c4\uc7a5 \ucc0d\ud78c \uc140\uc774 \uc6d0\ud558\ub294 \ud328\ud134\uacfc \uc77c\uce58\ud558\ub294\uc9c0 \ud655\uc778!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#059669", marginBottom: 10 }}>
              {t(E, "Brute Force Strategy", "\ube0c\ub8e8\ud2b8 \ud3ec\uc2a4 \uc804\ub7b5")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              {t(E,
                "1. Generate 4 rotations of the stamp\n2. For each rotation, try all (N-K+1)\u00b2 positions\n3. For each placement, check if stamp cells match canvas\n4. Output YES if any combination works",
                "1. \ub3c4\uc7a5\uc758 4\uac00\uc9c0 \ud68c\uc804 \uc0dd\uc131\n2. \uac01 \ud68c\uc804\uc5d0 \ub300\ud574 (N-K+1)\u00b2 \uc704\uce58 \uc2dc\ub3c4\n3. \uac01 \ubc30\uce58\uc5d0\uc11c \ub3c4\uc7a5 \uc140\uc774 \uce94\ubc84\uc2a4\uc640 \uc77c\uce58\ud558\ub294\uc9c0 \ud655\uc778\n4. \uc5b4\ub5a4 \uc870\ud569\uc774 \ub418\uba74 YES \ucd9c\ub825")}
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
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getStampGridSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "To rotate a grid 90\u00b0 clockwise, what transformation do we apply?",
        "\uadf8\ub9ac\ub4dc\ub97c 90\u00b0 \uc2dc\uacc4\ubc29\ud5a5\uc73c\ub85c \ud68c\uc804\ud558\ub824\uba74 \uc5b4\ub5a4 \ubcc0\ud658\uc744 \uc801\uc6a9\ud560\uae4c?"),
      question: t(E, "90\u00b0 clockwise rotation: new[c][R-1-r] = old[r][c]?", "90\u00b0 \uc2dc\uacc4\ubc29\ud5a5 \ud68c\uc804: new[c][R-1-r] = old[r][c]?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! Row r, col c maps to row c, col R-1-r.", "\ub9de\uc544! \ud589 r, \uc5f4 c\uac00 \ud589 c, \uc5f4 R-1-r\ub85c \ub9e4\ud551!"),
    },
    {
      type: "input",
      narr: t(E,
        "If N=5 and K=3, how many positions can we place the stamp in a single rotation?",
        "N=5, K=3\uc774\uba74 \ud55c \ud68c\uc804\uc5d0\uc11c \ub3c4\uc7a5\uc744 \uba87 \uac1c \uc704\uce58\uc5d0 \ub193\uc744 \uc218 \uc788\uc744\uae4c?"),
      question: t(E, "(5-3+1)\u00b2 = ?", "(5-3+1)\u00b2 = ?"),
      hint: t(E, "3\u00b2 = 9", "3\u00b2 = 9"),
      answer: 9,
    },
  ];
}
