import { C, t } from "@/components/quest/theme";
import { getCannonballSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1     # number of pads (positions 1..N)",
  "S = int(data[p]); p += 1     # starting position",
  "",
  "# Position i holds pad i — line i is its (type, value) pair.",
  "typ = [0] * (N + 2)",
  "val = [0] * (N + 2)",
  "for i in range(1, N + 1):",
  "    typ[i] = int(data[p]); p += 1   # 0 = jump pad, 1 = target",
  "    val[i] = int(data[p]); p += 1   # power-up amount or break threshold",
  "",
  "x = S",
  "direction = 1   # +1 right, -1 left",
  "power = 1",
  "broken = [False] * (N + 2)",
  "ans = 0",
  "",
  "# 5,000,000 iterations is plenty.  When Bessie loops between two value-0",
  "# jump pads forever, she can't break NEW targets after the loop starts,",
  "# so we don't need explicit cycle detection — just a generous cap.",
  "for _ in range(5_000_000):",
  "    if x < 1 or x > N:",
  "        break",
  "    if typ[x] == 1 and power >= val[x] and not broken[x]:",
  "        broken[x] = True",
  "        ans += 1",
  "    if typ[x] == 0:",
  "        direction *= -1",
  "        power += val[x]",
  "    x += direction * power",
  "",
  "print(ans)",
];


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
        "Bessie 가 위치 S 에서 오른쪽 방향, 파워 1 로 출발하는 대포알. 위치 1..N 각각에 점프패드 (방향을 뒤집고 파워에 값을 더함) 또는 타겟 (파워 ≥ 값이면 한 번 부서짐) 이 있어요. 매 step 마다 direction × power 만큼 움직여요. [1, N] 범위를 벗어날 때까지 부서지는 타겟 수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca5"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Cannonball</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #2</div>
          </div>

          {/* Mini-visual: Bessie bouncing on a number line */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Tiny example: 5 pads, start S=2, power 1 →",
                    "작은 예: 패드 5 개, S=2 에서 출발, 파워 1 →")}
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
              {t(E, "x=2, power=1 → 🎯 v=1 ✓ break (ans=1) → x=3", "x=2, 파워=1 → 🎯 v=1 ✓ 부숨 (ans=1) → x=3")}<br/>
              {t(E, "x=3, power=1 → 🎯 v=2 ✗ too weak → x=4",       "x=3, 파워=1 → 🎯 v=2 ✗ 약함 → x=4")}<br/>
              {t(E, "x=4 → 🪂 flip dir, power=2 → x=4 + (-1)·2 = 2 (already broken) → x=0 OUT",
                    "x=4 → 🪂 방향 뒤집고 파워=2 → x=4 + (-1)·2 = 2 (이미 부숨) → x=0 범위 벗어남")}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#15803d", fontWeight: 700, textAlign: "center" }}>
              {t(E, "→ ans = 1 (only one target broken)", "→ ans = 1 (한 타겟만 부숨)")}
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
                  {t(E, ".  Each step she moves by ", "으로 출발. 매 step 마다 ")}
                  <code style={{ background: "#fff7ed", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>direction × power</code>
                  {t(E, ".", " 만큼 이동.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each position 1..N holds either a ",
                        "위치 1..N 각각에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "jump pad", "점프패드")}</b>
                  {t(E, " (reverses direction and adds to power) or a target.",
                        " (방향을 뒤집고 파워에 값을 더함) 또는 타겟이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Targets", "타겟")}</b>
                  {t(E, " break the first time Bessie lands on them ", "은 Bessie가 처음 착지했을 때 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "if her power ≥ the target's value", "파워 ≥ 타겟 값")}</b>
                  {t(E, ". Once broken, they stay broken (and don't trigger again).",
                        "이면 부서져요. 한 번 부서진 뒤에는 효과가 없어요.")}
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
        "입력: N S, 그 다음 N 줄에 't v' 씩 (i 번째 줄이 i 번 패드). t = 0 → 점프패드, t = 1 → 타겟."),
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
                    "패드: 점프1, 타겟1, 타겟2, 점프1, 타겟1. 시작 x=2, dir=+1, power=1.")}
              <br/>
              {t(E, "x=2 (target val 1): power 1 ≥ 1 → break.  ans=1.  x ← 2 + 1·1 = 3.",
                    "x=2 (타겟 값 1): 파워 1 ≥ 1 → 부숨. ans=1. x ← 2 + 1·1 = 3.")}
              <br/>
              {t(E, "x=3 (target val 2): power 1 < 2 → can't break.  x ← 3 + 1·1 = 4.",
                    "x=3 (타겟 값 2): 파워 1 < 2 → 못 부숨. x ← 3 + 1·1 = 4.")}
              <br/>
              {t(E, "x=4 (jump pad val 1): dir flips to -1, power becomes 2.  x ← 4 + (-1)·2 = 2.",
                    "x=4 (점프 값 1): dir = -1, power = 2. x ← 4 + (-1)·2 = 2.")}
              <br/>
              {t(E, "x=2 already broken; x ← 2 + (-1)·2 = 0.  Out of [1, 5] → stop.",
                    "x=2 이미 부숨; x ← 2 + (-1)·2 = 0. [1, 5] 벗어남 → 종료.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ ans = 1.", "→ ans = 1.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — break threshold
    {
      type: "quiz",
      narr: t(E,
        "Targets only break the first time Bessie reaches them WITH enough power.",
        "타겟은 Bessie 가 처음 도착했을 때 파워가 충분해야 부서져요."),
      question: t(E,
        "Power = 2, target value = 3. Does the target break?",
        "파워 = 2, 타겟 값 = 3. 타겟이 부서질까?"),
      options: [
        t(E, "Yes, it breaks", "네, 부서져"),
        t(E, "No, power is too low", "아니, 파워 부족"),
      ],
      correct: 1,
      explain: t(E,
        "Power (2) < value (3) — target does NOT break.  She needs power ≥ value.",
        "파워(2) < 값(3) — 안 부서짐. 파워 ≥ 값 필요."),
    },
    // 1-4: Input — step distance
    {
      type: "input",
      narr: t(E,
        "Each step Bessie moves by direction × power.",
        "매 step 마다 Bessie 는 direction × power 만큼 움직여요."),
      question: t(E,
        "Position = 4, direction = -1, power = 2.  Next position?",
        "위치 = 4, 방향 = -1, 파워 = 2. 다음 위치?"),
      hint: t(E,
        "next = position + direction × power = 4 + (-1) × 2 = 2.",
        "next = position + direction × power = 4 + (-1) × 2 = 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCannonCh2(E, lang = "py") {
  return [
    // 2-1: Light intro — code first.
    {
      type: "reveal",
      narr: t(E,
        "Just simulate Bessie bouncing.  Each step: process the pad at her position, then move by direction × power.  Stop when she leaves [1, N].",
        "Bessie 가 튀는 걸 그냥 시뮬레이션. 매 step: 현재 위치의 패드 처리 후 direction × power 만큼 이동. [1, N] 벗어나면 종료."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "If she lands on a target with power ≥ value, that target breaks (only once).  If she lands on a jump pad, direction flips and power grows.  A loop CAN happen between two value-0 jump pads — bounding the iteration count keeps that safe.  Read the code section by section.",
            "타겟에 도착하고 파워 ≥ 값이면 부숨 (한 번만). 점프 패드에 도착하면 방향 뒤집고 파워 증가. 값 0 점프 패드 두 개 사이에서 무한 루프 가능 — 반복 횟수 cap 으로 안전. 코드 한 단락씩.")}
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCannonballSections(E),
    },
  ];
}
