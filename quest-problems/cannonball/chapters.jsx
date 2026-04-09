import { C, t } from "@/components/quest/theme";

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
        "Bessie is a cannonball bouncing on a number line! Jump pads reverse her direction and add power. Targets break if her power is high enough. How many targets can she break?",
        "베시가 수직선 위에서 대포알처럼 튀어다녀! 점프패드는 방향을 바꾸고 파워를 올려줘. 타겟은 파워가 충분하면 부서져. 몇 개를 부술 수 있을까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udca5"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Cannonball</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Simulate: track position, direction, power. Jump pads reverse + boost. Targets break if power >= value. Stop when off-line or in a loop.",
              "시뮬레이션: 위치, 방향, 파워 추적. 점프패드는 반전 + 부스트. 타겟은 파워 >= 값이면 파괴. 범위 밖이거나 루프면 종료.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Quick check! If Bessie's power is 2 and she lands on a target with value 3, does it break?",
        "확인! 베시의 파워가 2이고 값이 3인 타겟에 착지하면, 부서질까?"),
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
        "파워(2) < 값(3)이라 타겟은 안 부서져. 파워 >= 타겟 값이어야 해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Bessie starts at position 2 with power 1, going right. What is her next position?",
        "베시가 위치 2에서 파워 1, 오른쪽으로 출발해. 다음 위치는?"),
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
export function makeCannonCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "We simulate step by step, tracking visited states to detect loops. Worst case O(N\u00b2) states since power can grow up to N.",
        "한 단계씩 시뮬레이션하면서 방문 상태를 추적해 루프를 감지해. 최악 O(N\u00b2) 상태 (파워가 N까지 커질 수 있으니까)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N{"\u00b2"}) Simulation</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "State = (position, direction, power). If we revisit a state, we're in a loop \u2192 stop. Otherwise process jump pad or target and move.",
              "상태 = (위치, 방향, 파워). 같은 상태를 재방문하면 루프 \u2192 종료. 아니면 점프패드/타겟 처리 후 이동.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full simulation solution!",
        "전체 시뮬레이션 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
