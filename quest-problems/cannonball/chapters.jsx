import { C, t } from "@/components/quest/theme";
import { getCannonballSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, S = map(int, input().split())",
  "pos_type = {}  # position -> (type, value)",
  "for _ in range(N):",
  "    p, typ, val = map(int, input().split())",
  "    pos_type[p] = (typ, val)",
  "",
  "position = S",
  "direction = 1   # 1 = right, -1 = left",
  "power = 1",
  "broken = set()",
  "visited = set()",
  "",
  "while True:",
  "    state = (position, direction, power)",
  "    if state in visited:",
  "        break",
  "    visited.add(state)",
  "",
  "    if position not in pos_type:",
  "        break",
  "",
  "    typ, val = pos_type[position]",
  "    if typ == 0:  # jump pad",
  "        direction *= -1",
  "        power += val",
  "    else:  # target",
  "        if power >= val and position not in broken:",
  "            broken.add(position)",
  "",
  "    position += direction",
  "",
  "print(len(broken))",
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
        "Bessie is a cannonball that starts at position S, moving RIGHT with power 1, on a number line dotted with N items at distinct positions.\nEach item is a jump pad (reverse direction, add to power) or a target (breaks if power ≥ its value).\nHow many targets break before Bessie leaves the line or loops forever?",
        "베시가 대포알이 되어 위치 S에서 시작해 파워 1로 오른쪽으로 움직여요. 수직선 위에는 서로 다른 위치에 N개의 아이템이 있어요.\n각 아이템은 점프패드(방향을 반대로 바꾸고 파워를 더해줌) 또는 타겟(파워가 그 값 이상이면 부서짐) 둘 중 하나예요.\n베시가 수직선을 벗어나거나 무한 반복할 때까지 부서지는 타겟 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca5"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Cannonball</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie starts at position ", "베시가 위치 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "S, moving RIGHT with power 1", "S에서 오른쪽 방향, 파워 1")}</b>
                  {t(E, ", on a number line.", "로 출발해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "수직선 위 N개 위치에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "jump pads", "점프패드")}</b>
                  {t(E, " — landing on one ", " — 착지하면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "reverses direction and adds to power", "방향을 반대로 바꾸고 파워에 값을 더해줘요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Targets", "타겟")}</b>
                  {t(E, " break the first time Bessie lands on them ", "은 베시가 처음 착지했을 때 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "if her power ≥ the target's value", "파워 ≥ 타겟 값")}</b>
                  {t(E, ". Once broken, they stay broken (and don't trigger again).",
                        "이면 부서져요. 한 번 부서진 뒤에는 효과가 없어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print how many targets ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "break in total", "부서진 타겟의 총 개수")}</b>
                  {t(E, " (Bessie keeps going until she leaves the line or starts looping).",
                        "를 출력해요 (베시는 수직선을 벗어나거나 무한 반복에 빠질 때까지 계속 움직여요).")}
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
        "Quick check!\nIf Bessie's power is 2 and she lands on a target with value 3, does it break?", "확인! 베시의 파워가 2이고 값이 3인 타겟에 착지하면, 부서질까?"),
      question: t(E,
        "Power = 2, target value = 3. Does the target break?",
        "파워 = 2, 타겟 값 = 3. 타겟이 부서질까?"),
      options: [
        t(E, "Yes, it breaks", "네, 부서져"),
        t(E, "No, power is too low", "아니, 파워 부족"),
      ],
      correct: 1,
      explain: t(E,
        "Power (2) < value (3), so the target does NOT break. Bessie needs power >= target value.",
        "파워(2) < 값(3)이라 타겟은 안 부서져. 파워 >= 타겟 값이어야 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Bessie starts at position 2 with power 1, going right. What is her next position?", "베시가 위치 2에서 파워 1, 오른쪽으로 출발해요. 다음 위치는?"),
      question: t(E,
        "Position = 2, direction = right (+1). Next position?",
        "위치 = 2, 방향 = 오른쪽(+1). 다음 위치는?"),
      hint: t(E,
        "Next position = current position + direction",
        "다음 위치 = 현재 위치 + 방향"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCannonCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Simulate step by step. The state is (position, direction, power) — if we revisit one, we're looping forever. Otherwise process the item at this position and step in our direction.",
        "한 단계씩 시뮬레이션해요. 상태 = (위치, 방향, 파워) — 같은 상태를 다시 만나면 무한 반복 중이라는 뜻. 아니면 현재 위치의 아이템을 처리하고 한 칸 이동."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Initialize", "초기화"), code: "pos=S, dir=+1, power=1, visited={}", color: "#f97316" },
              { n: 2, label: t(E, "Loop detection", "루프 감지"), code: "if (pos, dir, power) in visited: stop", color: "#dc2626" },
              { n: 3, label: t(E, "Process item at pos", "현재 위치 아이템 처리"), code: "jump pad → reverse + boost  /  target → break if power ≥ value", color: "#7c3aed" },
              { n: 4, label: t(E, "Step + repeat", "이동 + 반복"), code: "pos += dir;  go to step 2", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "(position, direction, power) state space ≤ N · 2 · N", "(위치, 방향, 파워) 상태 공간 ≤ N · 2 · N")}</div>
          </div>
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
