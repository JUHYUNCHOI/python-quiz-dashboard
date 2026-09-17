import { C, t } from "@/components/quest/theme";
import { getCannonballSections, CannonballTrajectorySim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCannonCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie is a cannonball that starts at position S, moving RIGHT with power 1.  Positions 1..N each hold either a jump pad (reverses direction and adds to power) or a target (breaks once if power ≥ its value).  Each step she moves by direction × power.  Count broken targets before she leaves [1, N].",
        "대포알 Bessie 가 수직선을 벗어나기 전까지 타겟을 몇 개 부술까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca5"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Cannonball</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #2</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Count how many targets break before Bessie leaves the line [1, N] (or starts looping).",
                "Bessie \uac00 [1, N] \uc744 \ubc97\uc5b4\ub098\uac70\ub098 \uac19\uc740 \uc790\ub9ac\ub97c \ub05d\uc5c6\uc774 \ub3cc\uae30 \uc804\uae4c\uc9c0, \ubd80\uc11c\uc9c0\ub294 \ud0c0\uac9f \uac1c\uc218\ub97c \uc138\uc5b4 \ucd9c\ub825\ud574\uc694.")}
            </div>
          </div>

          {/* Mini-visual: Bessie bouncing on a number line */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Tiny example: 5 pads, start S=2, power 1 →",
                    "작은 예 — 패드 5 개, S=2 에서 파워 1 로 출발해요 →")}
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
              {[
                { i: 1, kind: "jump", v: 1 },
                { i: 2, kind: "tgt",  v: 1 },
                { i: 3, kind: "tgt",  v: 2 },
                { i: 4, kind: "jump", v: 1 },
                { i: 5, kind: "tgt",  v: 1 },
              ].map((p) => (
                <div key={p.i} style={{
                  width: 52, padding: "5px 4px", borderRadius: 8, textAlign: "center",
                  background: p.kind === "jump" ? "#dbeafe" : "#fee2e2",
                  border: `1px solid ${p.kind === "jump" ? "#3b82f6" : "#fca5a5"}`,
                  color: p.kind === "jump" ? "#1e3a8a" : "#7f1d1d",
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.8 }}>pos {p.i}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.1 }}>{p.kind === "jump" ? "🪂" : "🎯"}</div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>v={p.v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace", background: "#fff", border: "1.5px dashed #fdba74", borderRadius: 8, padding: "8px 10px" }}>
              {t(E, "x=2, power=1 → 🎯 v=1 ✓ break (ans=1) → x=3", "x=2, 파워=1 → 🎯 v=1 ✓ 부숴요 (ans=1) → x=3")}<br/>
              {t(E, "x=3, power=1 → 🎯 v=2 ✗ too weak → x=4",       "x=3, 파워=1 → 🎯 v=2 ✗ 파워가 모자라요 → x=4")}<br/>
              {t(E, "x=4 → 🪂 flip dir, power=2 → x=4 + (-1)·2 = 2 (already broken) → x=0 OUT",
                    "x=4 → 🪂 방향 뒤집고 파워=2 → x=4 + (-1)·2 = 2 (이미 부쉈어요) → x=0 벗어나요")}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#15803d", fontWeight: 700, textAlign: "center" }}>
              {t(E, "→ ans = 1 (only one target broken)", "→ ans = 1 (타겟 하나만 부쉈어요)")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie starts at position ", "Bessie 가 위치 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "S with power 1, moving RIGHT", "S, 파워 1, 오른쪽 방향")}</b>
                  {t(E, ".  Each step she moves by ", "으로 출발해요. 한 번 움직일 때마다 ")}
                  <code style={{ background: "#fff7ed", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>direction × power</code>
                  {t(E, ".", " 만큼 움직여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each position 1..N holds either a ",
                        "위치 1..N 각각에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "jump pad", "점프패드")}</b>
                  {t(E, " (reverses direction and adds to power) or a target.",
                        " (방향을 뒤집고 파워에 값을 더해요) 또는 타겟이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Targets", "타겟")}</b>
                  {t(E, " break the first time Bessie lands on them ", "은 Bessie가 처음 착지했을 때 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "if her power ≥ the target's value", "파워 ≥ 타겟 값")}</b>
                  {t(E, ". Once broken, they stay broken (and don't trigger again).",
                        "이면 부서져요. 한 번 부서진 타겟은 다시 밟아도 아무 일도 안 일어나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print how many targets ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "break in total", "부서진 타겟의 총 개수")}</b>
                  {t(E, " (Bessie keeps going until she leaves the line or starts looping).",
                        "를 출력해요 (Bessie는 수직선을 벗어나거나 무한 반복에 빠질 때까지 계속 움직여요).")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: N S, then N lines each 't v' (the i-th line is pad i).  t = 0 → jump pad, t = 1 → target.",
        "패드 줄의 t 는 0 이면 점프패드, 1 이면 타겟이라는 뜻이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#9a3412", whiteSpace: "pre" }}>
{`5 2
0 1
1 1
1 2
0 1
1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Pads: jump1, target1, target2, jump1, target1.  Start x=2, dir=+1, power=1.",
                    "패드는 점프1, 타겟1, 타겟2, 점프1, 타겟1 이에요. x=2, dir=+1, power=1 로 시작해요.")}
              <br/>
              {t(E, "x=2 (target val 1): power 1 ≥ 1 → break.  ans=1.  x ← 2 + 1·1 = 3.",
                    "x=2 는 타겟 값 1 이에요. 파워 1 ≥ 1 이라 부숴요. ans=1. x ← 2 + 1·1 = 3.")}
              <br/>
              {t(E, "x=3 (target val 2): power 1 < 2 → can't break.  x ← 3 + 1·1 = 4.",
                    "x=3 은 타겟 값 2 예요. 파워 1 < 2 라 못 부숴요. x ← 3 + 1·1 = 4.")}
              <br/>
              {t(E, "x=4 (jump pad val 1): dir flips to -1, power becomes 2.  x ← 4 + (-1)·2 = 2.",
                    "x=4 는 점프 값 1 이에요. dir = -1, power = 2 가 돼요. x ← 4 + (-1)·2 = 2.")}
              <br/>
              {t(E, "x=2 already broken; x ← 2 + (-1)·2 = 0.  Out of [1, 5] → stop.",
                    "x=2 는 이미 부쉈어요. x ← 2 + (-1)·2 = 0. [1, 5] 를 벗어나요 → 끝.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ ans = 1.", "→ ans = 1.")}
            </div>
          </div>
        </div>),
    },
    // 1-2.5: Eye-evident trajectory simulator (sample 1 walkthrough)
    {
      type: "reveal",
      narr: t(E,
        "Read the walkthrough was hard?  Watch it.  Click Next to advance one logical step at a time — process pad, then move.",
        "Next 를 눌러 한 걸음씩 봐요 — 패드를 처리한 뒤 움직여요."),
      content: <CannonballTrajectorySim E={E} />,
    },
    // 1-3: Quiz — break threshold
    {
      type: "quiz",
      narr: t(E,
        "Targets only break the first time Bessie reaches them WITH enough power.",
        "타겟은 Bessie 가 처음 도착했을 때 파워가 충분해야 부서져요."),
      question: t(E,
        "Power = 2, target value = 3. Does the target break?",
        "파워 = 2, 타겟 값 = 3 이에요. 타겟이 부서질까요?"),
      options: [
        t(E, "Yes, it breaks", "네, 부서져요"),
        t(E, "No, power is too low", "아니요, 파워가 모자라요"),
      ],
      correct: 1,
      explain: t(E,
        "Power (2) < value (3) — target does NOT break.  She needs power ≥ value.",
        "파워(2) 가 값(3) 보다 작아서 안 부서져요. 파워가 값 이상이어야 해요."),
    },
    // 1-4: Input — step distance
    {
      type: "input",
      narr: t(E,
        "Each step Bessie moves by direction × power.",
        "Bessie 는 한 번에 direction × power 만큼 움직여요."),
      question: t(E,
        "Position = 4, direction = -1, power = 2.  Next position?",
        "위치 = 4, 방향 = -1, 파워 = 2 예요. 다음 위치는 어디일까요?"),
      hint: t(E,
        "Apply next = position + direction × power.  What does -1 × 2 do to the position?",
        "next = position + direction × power 예요. -1 × 2 는 위치를 어떻게 바꿀까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCannonCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Simulate Bessie bouncing.  Each step: process the pad, then move by direction × power.  Stop when she leaves [1, N] or after a generous iteration cap (handles infinite jump-pad loops).  Sections build the loop one piece at a time.",
        "Bessie 가 튀는 걸 그대로 따라가는 코드를 한 단락씩 쌓아요."),
      sections: getCannonballSections(E),
    },
  ];
}
