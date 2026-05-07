import { C, t } from "@/components/quest/theme";
import { getRotShiftSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0]); K = int(data[1]); T = int(data[2])",
  "active = [int(data[3 + i]) for i in range(K)]",
  "",
  "# pos[c] = current position of cow c",
  "pos = list(range(N))",
  "",
  "for step in range(T):",
  "    new_pos = pos[:]",
  "    # 1) Rotate: cow at active[j] → active[(j+1) % K]",
  "    for j in range(K):",
  "        for c in range(N):",
  "            if pos[c] == active[j]:",
  "                new_pos[c] = active[(j + 1) % K]",
  "                break",
  "    pos = new_pos",
  "    # 2) Shift: every active position moves +1 mod N",
  "    active = [(a + 1) % N for a in active]",
  "",
  "# Invert: at_position[p] = which cow is at position p",
  "at_position = [0] * N",
  "for c in range(N):",
  "    at_position[pos[c]] = c",
  "",
  "# Output one line, space-separated.",
  "print(' '.join(str(x) for x in at_position))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeRotShiftCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "N cows stand at positions 0..N−1 in a circle. K of those positions are 'active'.\nEach minute: (1) all cows currently AT active positions cyclically rotate by 1 (within the active set), (2) every active position then shifts by +1 (mod N).\nAfter T minutes, where does each cow end up?",
        "N마리 소가 원형의 위치 0..N−1에 서있고, 그중 K개의 위치가 '활성'이에요.\n매분: (1) 활성 위치에 있는 소들이 활성 집합 안에서 순환 회전(1칸), (2) 그 다음 활성 위치들이 +1 만큼 이동 (N 으로 나눈 나머지).\nT분 후 각 소는 어디에 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Rotate and Shift</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N cows stand at ", "N마리 소가 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "positions 0..N−1 in a circle", "원형 위치 0..N−1")}</b>
                  {t(E, ". ", "에 서있어요. ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K of those positions are active", "그중 K개의 위치가 활성")}</b>
                  {t(E, ".", "이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each minute, two things happen in order:", "매분, 다음 두 가지가 순서대로 일어나요:")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    {t(E, "(1) cows at active positions ", "(1) 활성 위치의 소들이 ")}
                    <b style={{ color: "#dc2626" }}>{t(E, "cyclically rotate", "활성 집합 안에서 순환 회전")}</b>
                    {t(E, " within the active set (each shifts to the next active position).",
                          " (각자 다음 활성 위치로 이동).")}
                    <br/>
                    {t(E, "(2) every active position itself ", "(2) 활성 위치들이 ")}
                    <b style={{ color: "#7c3aed" }}>{t(E, "shifts by +1 (mod N)", "+1 만큼 이동 (N 으로 나눈 나머지)")}</b>
                    {t(E, ".", ".")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Total of ", "총 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "T minutes", "T분")}</b>
                  {t(E, " — T can be huge.", " — T는 매우 클 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print one line, space-separated: ", "한 줄에 공백 구분으로 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "for each position p (0..N-1), which cow ends up there",
                                                            "각 위치 p (0..N-1) 에 어느 소가 있는지")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: N K T then K active positions on the next line.  Output: one line with N space-separated values.",
        "\uc785\ub825: \uccab \uc904 N K T, \ub2e4\uc74c \uc904\uc5d0 K \uac1c \ud65c\uc131 \uc704\uce58. \ucd9c\ub825: \uacf5\ubc31 \uad6c\ubd84 N \uac1c \uac12 \ud55c \uc904."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 10 }}>
            \ud83d\udce5 {t(E, "Sample 1 \u2014 official", "\uc0d8\ud50c 1 \u2014 \uacf5\uc2dd")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>{t(E, "INPUT", "\uc785\ub825")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#5b21b6", whiteSpace: "pre" }}>
{`5 3 4
0 2 3`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "\ucd9c\ub825")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`1 2 3 4 0`}
              </div>
            </div>
          </div>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              \ud83d\udd0d {t(E, "Walkthrough \u2014 N=5, active=[0,2,3], 4 minutes",
                          "\ud480\uc774 \u2014 N=5, active=[0,2,3], 4 \ubd84")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "After 4 minutes of rotate-then-shift, the cows end up cyclically shifted: cow 0 \u2192 pos 4, cow 1 \u2192 pos 0, cow 2 \u2192 pos 1, ...",
                    "4 \ubd84 \ud6c4 \ud68c\uc804+\uc774\ub3d9 \uacb0\uacfc: \uc18c 0 \u2192 \uc704\uce58 4, \uc18c 1 \u2192 \uc704\uce58 0, \uc18c 2 \u2192 \uc704\uce58 1, ...")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Output by position p:  p=0 has cow 1,  p=1 has cow 2, ...,  p=4 has cow 0  \u2192  '1 2 3 4 0'.",
                    "\uc704\uce58 p \uae30\uc900: p=0 \uc5d0 \uc18c 1, p=1 \uc5d0 \uc18c 2, ..., p=4 \uc5d0 \uc18c 0 \u2192 '1 2 3 4 0'.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's visualize with N=4, K=2, active=[0,1].\nRotation means: cow at pos 0 goes to pos 1, cow at pos 1 goes to pos 0 (swap for K=2).", "N=4, K=2, active=[0,1]\uc73c\ub85c \uc2dc\uac01\ud654.\n\ud68c\uc804: \uc704\uce58 0\uc758 \uc18c\uac00 \uc704\uce58 1\ub85c, \uc704\uce58 1\uc758 \uc18c\uac00 \uc704\uce58 0\uc73c\ub85c (K=2\uc774\uba74 \uad50\ud658)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Example: N=4, active=[0,1]", "\uc608\uc2dc: N=4, active=[0,1]")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 600,
                  background: i < 2 ? "#ddd6fe" : "#f1f5f9",
                  border: `2.5px solid ${i < 2 ? "#8b5cf6" : "#cbd5e1"}`,
                  color: i < 2 ? "#5b21b6" : "#64748b",
                }}>{t(E, `C${i}`, `\uc18c${i}`)}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 700, textAlign: "center" }}>
              {t(E, "Purple = active positions. They rotate, then shift right!", "\ubcf4\ub77c = \ud65c\uc131 \uc704\uce58.\n\ud68c\uc804 \ud6c4 \uc624\ub978\ucabd\uc73c\ub85c \uc774\ub3d9!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "In the rotation step, cows cycle: A1\u2192A2\u2192...\u2192AK\u2192A1. Is this correct?", "\ud68c\uc804 \ub2e8\uacc4\uc5d0\uc11c \uc18c\ub4e4\uc774 \uc21c\ud658: A1\u2192A2\u2192...\u2192AK\u2192A1.\n\ub9de\ub098?"),
      question: t(E, "Rotation means A1\u2192A2\u2192...\u2192AK\u2192A1?", "\ud68c\uc804\uc740 A1\u2192A2\u2192...\u2192AK\u2192A1\uc744 \uc758\ubbf8?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! Cows at active positions cycle forward by one.", "\ub9de\uc544! \ud65c\uc131 \uc704\uce58\uc758 \uc18c\ub4e4\uc774 \ud558\ub098\uc529 \uc55e\uc73c\ub85c \uc21c\ud658\ud574."),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, active=[0,1]. After 1 step:\n1. Rotate: cow0\u2192pos1, cow1\u2192pos0 (swap)\n2. Shift: active becomes [1,2]\nWhere is cow 0 now?", "N=4, K=2, active=[0,1]. 1\ub2e8\uacc4 \ud6c4:\n1. \ud68c\uc804: cow0\u2192pos1, cow1\u2192pos0 (\uad50\ud658)\n2. \uc774\ub3d9: active\uac00 [1,2]\ub85c\nCow 0\uc740 \uc9c0\uae08 \uc5b4\ub514?"),
      question: t(E, "After 1 step, cow 0 is at position...?", "1\ub2e8\uacc4 \ud6c4 cow 0\uc758 \uc704\uce58\ub294?"),
      hint: t(E, "Cow 0 was at pos 0 (active), rotates to pos 1", "Cow 0\uc740 pos 0(\ud65c\uc131)\uc5d0 \uc788\uc5c8\uace0, pos 1\ub85c \ud68c\uc804"),
      answer: 1,
    },
    {
      type: "reveal",
      narr: t(E,
        "Algorithm: Simply simulate each step.\nFor large T, you can detect cycles, but for Bronze, direct simulation works!", "\uc54c\uace0\ub9ac\uc998: \uac01 \ub2e8\uacc4\ub97c \ub2e8\uc21c\ud788 \uc2dc\ubbac\ub808\uc774\uc158.\n\ud070 T\uc5d0\ub294 \uc21c\ud658 \uac10\uc9c0\ub97c \ud560 \uc218 \uc788\uc9c0\ub9cc, \ube0c\ub860\uc988\ub294 \uc9c1\uc811 \uc2dc\ubbac\ub808\uc774\uc158\uc73c\ub85c \ucda9\ubd84!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Simulation Steps", "\uc2dc\ubbac\ub808\uc774\uc158 \ub2e8\uacc4")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "For each of T steps:\n1. Find which cow is at each active position\n2. Move each cow to the next active position (cyclic)\n3. Shift all active positions by +1 (mod N)\n4. After all steps, output each cow's position",
                "T\ubc88 \ubc18\ubcf5:\n1. \uac01 \ud65c\uc131 \uc704\uce58\uc5d0 \uc5b4\ub5a4 \uc18c\uac00 \uc788\ub294\uc9c0 \ucc3e\uae30\n2. \uac01 \uc18c\ub97c \ub2e4\uc74c \ud65c\uc131 \uc704\uce58\ub85c \uc774\ub3d9 (\uc21c\ud658)\n3. \ubaa8\ub4e0 \ud65c\uc131 \uc704\uce58\ub97c +1 \uc774\ub3d9 (mod N)\n4. \ubaa8\ub4e0 \ub2e8\uacc4 \ud6c4 \uac01 \uc18c\uc758 \uc704\uce58 \ucd9c\ub825")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeRotShiftCh2(E, lang = "py") {
  return [
    // 2-1: Light intro — code first.
    {
      type: "reveal",
      narr: t(E,
        "Just simulate T minutes directly.  Each minute: rotate cows on active positions one step around the cycle, then shift every active position +1 mod N.",
        "그냥 T 분을 그대로 시뮬레이션. 매 분: 활성 위치 소들 순환 한 칸, 그 다음 모든 활성 위치 +1 mod N."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "After T minutes, output (for each position p) which cow ended up there.  Code section by section.",
            "T 분 후 각 위치 p 에 어느 소가 있는지 출력. 코드 한 단락씩.")}
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getRotShiftSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "After the rotation, what happens to the active positions?", "\ud68c\uc804 \ud6c4 \ud65c\uc131 \uc704\uce58\ub294 \uc5b4\ub5bb\uac8c \ub420\uae4c?"),
      question: t(E, "After rotation, active positions...?", "\ud68c\uc804 \ud6c4 \ud65c\uc131 \uc704\uce58\ub294?"),
      options: [
        t(E, "Stay the same", "\uadf8\ub300\ub85c"),
        t(E, "Shift by +1 (mod N)", "+1 \uc774\ub3d9 (mod N)"),
        t(E, "Reverse order", "\uc5ed\uc21c"),
      ],
      correct: 1,
      explain: t(E, "Each active position shifts by +1 modulo N!", "\uac01 \ud65c\uc131 \uc704\uce58\uac00 +1 (mod N)\ub9cc\ud07c \uc774\ub3d9!"),
    },
    {
      type: "input",
      narr: t(E,
        "If N=6 and active position is currently 5, after shifting by +1 mod 6, what is its new position?", "N=6\uc774\uace0 \ud65c\uc131 \uc704\uce58\uac00 \ud604\uc7ac 5\uc774\uba74, +1 mod 6 \uc774\ub3d9 \ud6c4 \uc0c8 \uc704\uce58\ub294?"),
      question: t(E, "(5 + 1) mod 6 = ?", "(5 + 1) mod 6 = ?"),
      hint: t(E, "6 mod 6 = 0, wraps around!", "6 mod 6 = 0, \uc21c\ud658!"),
      answer: 0,
    },
  ];
}
