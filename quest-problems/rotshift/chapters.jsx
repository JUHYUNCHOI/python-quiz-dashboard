import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K, T = map(int, input().split())",
  "active = list(map(int, input().split()))",
  "",
  "# pos[i] = which position cow i is at",
  "pos = list(range(N))",
  "",
  "for step in range(T):",
  "    # 1. Rotate: active[0]->active[1]->...->active[K-1]->active[0]",
  "    new_pos = pos[:]",
  "    for j in range(K):",
  "        cow_at = -1",
  "        for c in range(N):",
  "            if pos[c] == active[j]:",
  "                cow_at = c",
  "                break",
  "        new_pos[cow_at] = active[(j + 1) % K]",
  "    pos = new_pos",
  "",
  "    # 2. Shift: active[j] = (active[j] + 1) % N",
  "    active = [(a + 1) % N for a in active]",
  "",
  "for c in range(N):",
  "    print(pos[c])",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeRotShiftCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Cows stand in a circle. Some positions are 'active'. Each minute, cows at active positions rotate, then active positions shift! \ud83d\udd04",
        "\uc18c\ub4e4\uc774 \uc6d0\ud615\uc73c\ub85c \uc11c \uc788\uc5b4. \uc77c\ubd80 \uc704\uce58\uac00 '\ud65c\uc131'. \ub9e4\ubd84 \ud65c\uc131 \uc704\uce58\uc758 \uc18c\ub4e4\uc774 \ud68c\uc804\ud558\uace0, \ud65c\uc131 \uc704\uce58\uac00 \uc774\ub3d9\ud574! \ud83d\udd04"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Rotate and Shift</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N positions in a circle, K active positions. Each step:\n1. Rotate cows at active positions cyclically\n2. Shift active positions by +1\nAfter T steps, where is each cow?",
              "N\uac1c \uc6d0\ud615 \uc704\uce58, K\uac1c \ud65c\uc131 \uc704\uce58. \uac01 \ub2e8\uacc4:\n1. \ud65c\uc131 \uc704\uce58\uc758 \uc18c\ub4e4\uc744 \uc21c\ud658 \ud68c\uc804\n2. \ud65c\uc131 \uc704\uce58\ub97c +1 \uc774\ub3d9\nT\ub2e8\uacc4 \ud6c4 \uac01 \uc18c\uc758 \uc704\uce58\ub294?")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's visualize with N=4, K=2, active=[0,1]. Rotation means: cow at pos 0 goes to pos 1, cow at pos 1 goes to pos 0 (swap for K=2).",
        "N=4, K=2, active=[0,1]\uc73c\ub85c \uc2dc\uac01\ud654. \ud68c\uc804: \uc704\uce58 0\uc758 \uc18c\uac00 \uc704\uce58 1\ub85c, \uc704\uce58 1\uc758 \uc18c\uac00 \uc704\uce58 0\uc73c\ub85c (K=2\uc774\uba74 \uad50\ud658)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Example: N=4, active=[0,1]", "\uc608\uc2dc: N=4, active=[0,1]")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800,
                  background: i < 2 ? "#ddd6fe" : "#f1f5f9",
                  border: `2.5px solid ${i < 2 ? "#8b5cf6" : "#cbd5e1"}`,
                  color: i < 2 ? "#5b21b6" : "#64748b",
                }}>{t(E, `C${i}`, `\uc18c${i}`)}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 700, textAlign: "center" }}>
              {t(E, "Purple = active positions. They rotate, then shift right!", "\ubcf4\ub77c = \ud65c\uc131 \uc704\uce58. \ud68c\uc804 \ud6c4 \uc624\ub978\ucabd\uc73c\ub85c \uc774\ub3d9!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "In the rotation step, cows cycle: A1\u2192A2\u2192...\u2192AK\u2192A1. Is this correct?",
        "\ud68c\uc804 \ub2e8\uacc4\uc5d0\uc11c \uc18c\ub4e4\uc774 \uc21c\ud658: A1\u2192A2\u2192...\u2192AK\u2192A1. \ub9de\ub098?"),
      question: t(E, "Rotation means A1\u2192A2\u2192...\u2192AK\u2192A1?", "\ud68c\uc804\uc740 A1\u2192A2\u2192...\u2192AK\u2192A1\uc744 \uc758\ubbf8?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! Cows at active positions cycle forward by one.", "\ub9de\uc544! \ud65c\uc131 \uc704\uce58\uc758 \uc18c\ub4e4\uc774 \ud558\ub098\uc529 \uc55e\uc73c\ub85c \uc21c\ud658\ud574."),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, active=[0,1]. After 1 step:\n1. Rotate: cow0\u2192pos1, cow1\u2192pos0 (swap)\n2. Shift: active becomes [1,2]\nWhere is cow 0 now?",
        "N=4, K=2, active=[0,1]. 1\ub2e8\uacc4 \ud6c4:\n1. \ud68c\uc804: cow0\u2192pos1, cow1\u2192pos0 (\uad50\ud658)\n2. \uc774\ub3d9: active\uac00 [1,2]\ub85c\nCow 0\uc740 \uc9c0\uae08 \uc5b4\ub514?"),
      question: t(E, "After 1 step, cow 0 is at position...?", "1\ub2e8\uacc4 \ud6c4 cow 0\uc758 \uc704\uce58\ub294?"),
      hint: t(E, "Cow 0 was at pos 0 (active), rotates to pos 1", "Cow 0\uc740 pos 0(\ud65c\uc131)\uc5d0 \uc788\uc5c8\uace0, pos 1\ub85c \ud68c\uc804"),
      answer: 1,
    },
    {
      type: "reveal",
      narr: t(E,
        "Algorithm: Simply simulate each step. For large T, you can detect cycles, but for Bronze, direct simulation works!",
        "\uc54c\uace0\ub9ac\uc998: \uac01 \ub2e8\uacc4\ub97c \ub2e8\uc21c\ud788 \uc2dc\ubbac\ub808\uc774\uc158. \ud070 T\uc5d0\ub294 \uc21c\ud658 \uac10\uc9c0\ub97c \ud560 \uc218 \uc788\uc9c0\ub9cc, \ube0c\ub860\uc988\ub294 \uc9c1\uc811 \uc2dc\ubbac\ub808\uc774\uc158\uc73c\ub85c \ucda9\ubd84!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Simulation Steps", "\uc2dc\ubbac\ub808\uc774\uc158 \ub2e8\uacc4")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
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
export function makeRotShiftCh2(E) {
  return [
    {
      type: "code",
      narr: t(E,
        "Here's the simulation solution. We track each cow's position and apply rotate + shift each step.",
        "\uc2dc\ubbac\ub808\uc774\uc158 \ud480\uc774\uc57c. \uac01 \uc18c\uc758 \uc704\uce58\ub97c \ucd94\uc801\ud558\uace0 \ub9e4 \ub2e8\uacc4 \ud68c\uc804 + \uc774\ub3d9\uc744 \uc801\uc6a9\ud574."),
      label: t(E, "\ud83d\udc0d Full Solution", "\ud83d\udc0d \uc804\uccb4 \ud480\uc774"),
      code: SOLUTION_CODE,
    },
    {
      type: "quiz",
      narr: t(E,
        "After the rotation, what happens to the active positions?",
        "\ud68c\uc804 \ud6c4 \ud65c\uc131 \uc704\uce58\ub294 \uc5b4\ub5bb\uac8c \ub420\uae4c?"),
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
        "If N=6 and active position is currently 5, after shifting by +1 mod 6, what is its new position?",
        "N=6\uc774\uace0 \ud65c\uc131 \uc704\uce58\uac00 \ud604\uc7ac 5\uc774\uba74, +1 mod 6 \uc774\ub3d9 \ud6c4 \uc0c8 \uc704\uce58\ub294?"),
      question: t(E, "(5 + 1) mod 6 = ?", "(5 + 1) mod 6 = ?"),
      hint: t(E, "6 mod 6 = 0, wraps around!", "6 mod 6 = 0, \uc21c\ud658!"),
      answer: 0,
    },
  ];
}
