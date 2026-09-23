import { C, t } from "@/components/quest/theme";
import { getRotShiftSections, RotShiftSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeRotShiftCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "N cows stand at positions 0..N−1 in a circle. K of those positions are 'active'.\nEach minute: (1) all cows currently AT active positions cyclically rotate by 1 (within the active set), (2) every active position then shifts by +1 (mod N).\nAfter T minutes, where does each cow end up?",
        "매분 소들이 한 칸 돌고 활성 위치도 옮겨가요. T분 뒤엔 어디 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Rotate and Shift</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "After T minutes, output for each position p (0..N−1) which cow ends up there.",
                "T 분 후 각 위치 p (0..N−1) 에 어느 소가 있는지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
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
        "\uccab \uc904\uc5d0 N K T \uac00 \uc624\uace0, \ub2e4\uc74c \uc904\uc5d0 \ud65c\uc131 \uc704\uce58 K \uac1c\uac00 \uc640\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 10 }}>
            \ud83d\udce5 {t(E, "Sample 1 \u2014 official", "\uc0d8\ud50c 1 \u2014 \uacf5\uc2dd")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>{t(E, "INPUT", "\uc785\ub825")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#5b21b6", whiteSpace: "pre" }}>
{`5 3 4
0 2 3`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "\ucd9c\ub825")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`1 2 3 4 0`}
              </div>
            </div>
          </div>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              \ud83d\udd0d {t(E, "Walkthrough \u2014 N=5, active=[0,2,3], 4 minutes",
                          "\ud480\uc774 \u2014 N=5, active=[0,2,3], 4 \ubd84")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "After 4 minutes of rotate-then-shift, the cows end up cyclically shifted: cow 0 \u2192 pos 4, cow 1 \u2192 pos 0, cow 2 \u2192 pos 1, ...",
                    "4 \ubd84 \ub3d9\uc548 \ud68c\uc804\uacfc \uc774\ub3d9\uc744 \ub418\ud480\uc774\ud558\uba74 \uc18c 0 \uc740 \uc704\uce58 4, \uc18c 1 \uc740 \uc704\uce58 0, \uc18c 2 \ub294 \uc704\uce58 1 \ub85c \uac00\uc694.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Output by position p:  p=0 has cow 1,  p=1 has cow 2, ...,  p=4 has cow 0  \u2192  '1 2 3 4 0'.",
                    "\uc704\uce58 p \ub97c \uae30\uc900\uc73c\ub85c \ubcf4\uba74 p=0 \uc5d0 \uc18c 1, p=1 \uc5d0 \uc18c 2, ..., p=4 \uc5d0 \uc18c 0 \uc774\uc5d0\uc694 \u2192 '1 2 3 4 0'.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's visualize with N=4, K=2, active=[0,1].\nRotation means: cow at pos 0 goes to pos 1, cow at pos 1 goes to pos 0 (swap for K=2).", "\ud65c\uc131 \uc704\uce58\uac00 \ub458\ubfd0\uc774\uba74 \ud68c\uc804\uc740 \ub450 \uc18c\uac00 \uc790\ub9ac\ub97c \ub9de\ubc14\uafb8\ub294 \uac70\uc608\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Example: N=4, active=[0,1]", "\uc608\uc2dc: N=4, active=[0,1]")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 600,
                  background: i < 2 ? "#ddd6fe" : "#f1f5f9",
                  border: `1.5px solid ${i < 2 ? "#8b5cf6" : "#cbd5e1"}`,
                  color: i < 2 ? "#5b21b6" : "#64748b",
                }}>{t(E, `C${i}`, `\uc18c${i}`)}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 700, textAlign: "center" }}>
              {t(E, "Purple = active positions. They rotate, then shift right!", "\ubcf4\ub77c\uc0c9\uc774 \ud65c\uc131 \uc704\uce58\uc608\uc694.\n\ud68c\uc804\ud55c \ub4a4 \uc624\ub978\ucabd\uc73c\ub85c \uc62e\uaca8\uac00\uc694!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Drive the simulation yourself. Press Step to advance one minute (rotate then shift). Sample 1 reaches '1 2 3 4 0' after 4 steps.",
        "Step \uc744 \ub20c\ub7ec 1 \ubd84\uc529 \uad74\ub824 \ubd10\uc694 \u2014 \ud68c\uc804\ud55c \ub4a4 \uc62e\uaca8\uac00\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <RotShiftSim E={E} />
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "In the rotation step, cows cycle: A1\u2192A2\u2192...\u2192AK\u2192A1. Is this correct?", "\ud68c\uc804 \ub2e8\uacc4\uc5d0\uc11c \uc18c\ub4e4\uc740 A1\u2192A2\u2192...\u2192AK\u2192A1 \ub85c \ub3cc\uc544\uc694."),
      question: t(E, "Rotation means A1\u2192A2\u2192...\u2192AK\u2192A1?", "\ud68c\uc804\uc740 A1\u2192A2\u2192...\u2192AK\u2192A1 \uc744 \ub73b\ud560\uae4c\uc694?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc694")],
      correct: 0,
      explain: t(E, "Correct! Cows at active positions cycle forward by one.", "\ub9de\uc544\uc694! \ud65c\uc131 \uc704\uce58\uc758 \uc18c\ub4e4\uc774 \ud558\ub098\uc529 \uc55e\uc73c\ub85c \ub3cc\uc544\uc694."),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, active=[0,1]. After 1 step:\n1. Rotate: cow0\u2192pos1, cow1\u2192pos0 (swap)\n2. Shift: active becomes [1,2]\nWhere is cow 0 now?", "N=4, K=2, active=[0,1] \uc774\uc5d0\uc694. 1\ub2e8\uacc4\uac00 \uc9c0\ub098\uba74\n1. \ud68c\uc804\uc73c\ub85c cow0\u2192pos1, cow1\u2192pos0 \uc774 \ub418\uace0 (\ub9de\ubc14\uafb8\uae30)\n2. \uc774\ub3d9\uc73c\ub85c active \uac00 [1,2] \uac00 \ub3fc\uc694.\nCow 0 \uc740 \uc9c0\uae08 \uc5b4\ub514\uc5d0 \uc788\uc744\uae4c\uc694?"),
      question: t(E, "After 1 step, cow 0 is at position...?", "1\ub2e8\uacc4 \ub4a4 cow 0 \uc740 \uc5b4\ub290 \uc704\uce58\uc5d0 \uc788\uc744\uae4c\uc694?"),
      hint: t(E, "Cow 0 was at pos 0 (active), rotates to pos 1", "Cow 0 \uc740 \ud65c\uc131 \uc704\uce58\uc778 pos 0 \uc5d0 \uc788\uc5c8\uc73c\ub2c8 pos 1 \ub85c \ub3cc\uc544\uc694."),
      answer: 1,
    },
    {
      type: "reveal",
      narr: t(E,
        "This is what one minute does. Follow it by hand a few times and a pattern shows up — the code will ride that pattern instead of walking all T minutes.", "\ud55c \ubd84 \ub3d9\uc548 \uc77c\uc5b4\ub098\ub294 \uc77c\uc774\uc5d0\uc694.\n\uc190\uc73c\ub85c \uba87 \ubc88 \ub530\ub77c\uac00 \ubcf4\uba74 \uaddc\uce59\uc774 \ubcf4\uc5ec\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#8b5cf6", marginBottom: 10 }}>
              {t(E, "Simulation Steps", "\ud55c \ubd84 \ub3d9\uc548 \uc77c\uc5b4\ub098\ub294 \uc77c")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "Every minute:\n1. Find which cow is at each active position\n2. Move each cow to the next active position (cyclic)\n3. Shift all active positions by +1 (mod N)\nAfter T minutes, output each cow's position",
                "\ud55c \ubd84\ub9c8\ub2e4 \uc774\ub7f0 \uc77c\uc774 \uc77c\uc5b4\ub098\uc694.\n1. \uac01 \ud65c\uc131 \uc704\uce58\uc5d0 \uc5b4\ub5a4 \uc18c\uac00 \uc788\ub294\uc9c0 \ucc3e\uc544\uc694\n2. \uac01 \uc18c\ub97c \ub2e4\uc74c \ud65c\uc131 \uc704\uce58\ub85c \uc62e\uaca8\uc694 (\uc21c\ud658)\n3. \ubaa8\ub4e0 \ud65c\uc131 \uc704\uce58\ub97c +1 \uc62e\uaca8\uc694 (mod N)\nT \ubd84\uc774 \ub2e4 \uc9c0\ub098\uba74 \uac01 \uc18c\uc758 \uc704\uce58\ub97c \ucd9c\ub825\ud574\uc694")}
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
        "T can reach a billion, so we never walk it minute by minute. We count the sweeps instead.",
        "T 가 10억까지 가서 한 분씩 걸을 수 없어요.\n대신 «몇 번 휩쓸리나» 를 바로 세요."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "After T minutes, output (for each position p) which cow ended up there.  Code section by section.",
            "T 분 후 각 위치 p 에 어느 소가 있는지 출력해요. 코드를 한 단락씩 봐요.")}
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 한 부분씩 읽어봐요. 위에서 Python ↔ C++ 을 바꿔 볼 수 있어요."),
      sections: getRotShiftSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "After the rotation, what happens to the active positions?", "\ud68c\uc804\uc774 \ub05d\ub098\uba74 \ud65c\uc131 \uc704\uce58\ub294 \uc5b4\ub5bb\uac8c \ub420\uae4c\uc694?"),
      question: t(E, "After rotation, active positions...?", "\ud68c\uc804 \ub4a4 \ud65c\uc131 \uc704\uce58\ub294 \uc5b4\ub5bb\uac8c \ub420\uae4c\uc694?"),
      options: [
        t(E, "Stay the same", "\uadf8\ub300\ub85c \uc788\uc5b4\uc694"),
        t(E, "Shift by +1 (mod N)", "+1 \ub9cc\ud07c \uc62e\uaca8\uac00\uc694 (mod N)"),
        t(E, "Reverse order", "\uc21c\uc11c\uac00 \uac70\uafb8\ub85c \ub3fc\uc694"),
      ],
      correct: 1,
      explain: t(E, "Each active position shifts by +1 modulo N!", "\ud65c\uc131 \uc704\uce58\uac00 \ud558\ub098\uc529 +1 (mod N) \ub9cc\ud07c \uc62e\uaca8\uac00\uc694!"),
    },
    {
      type: "input",
      narr: t(E,
        "If N=6 and active position is currently 5, after shifting by +1 mod 6, what is its new position?", "N=6 \uc774\uace0 \ud65c\uc131 \uc704\uce58\uac00 \uc9c0\uae08 5 \uc608\uc694. +1 mod 6 \ub9cc\ud07c \uc62e\uae30\uba74 \uc5b4\ub514\ub85c \uac08\uae4c\uc694?"),
      question: t(E, "(5 + 1) mod 6 = ?", "(5 + 1) mod 6 = ?"),
      hint: t(E, "6 mod 6 = 0, wraps around!", "6 mod 6 = 0 \uc774\ub77c \ucc98\uc74c\uc73c\ub85c \ub3cc\uc544\uc640\uc694!"),
      answer: 0,
    },
  ];
}
