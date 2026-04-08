import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "s = input().strip()",
  "",
  "# Direction mapping: N=0, E=1, S=2, W=3",
  "dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3}",
  "",
  "right_turns = 0",
  "left_turns = 0",
  "",
  "for i in range(len(s)):",
  "    cur = dir_map[s[i]]",
  "    nxt = dir_map[s[(i+1) % len(s)]]",
  "    diff = (nxt - cur) % 4",
  "    if diff == 1:",
  "        right_turns += 1",
  "    elif diff == 3:",
  "        left_turns += 1",
  "    # diff == 2 means U-turn, diff == 0 means straight",
  "",
  "if right_turns > left_turns:",
  "    print('CW')",
  "else:",
  "    print('CCW')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A fence path is described by a sequence of directions (N, E, S, W). Determine if the path goes clockwise (CW) or counter-clockwise (CCW) by counting right vs left turns!",
        "울타리 경로가 방향 시퀀스(N, E, S, W)로 설명돼. 오른쪽 회전과 왼쪽 회전을 세서 시계 방향(CW)인지 반시계 방향(CCW)인지 판단해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Clockwise Fence</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Count right turns minus left turns. If positive, the path is clockwise. Map directions to numbers (N=0, E=1, S=2, W=3) and check transitions.",
              "핵심: 오른쪽 회전 - 왼쪽 회전을 계산. 양수이면 시계 방향. 방향을 숫자로 매핑(N=0, E=1, S=2, W=3)하고 전환을 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The path 'NESW' makes a square: go North, then East, then South, then West. Each turn is a right turn. Is this clockwise?",
        "경로 'NESW'는 정사각형: 북쪽, 동쪽, 남쪽, 서쪽. 각 회전이 오른쪽 회전이야. 시계 방향일까?"),
      question: t(E,
        "'NESW' path: all right turns. Clockwise?",
        "'NESW' 경로: 모두 오른쪽 회전. 시계 방향?"),
      options: [
        t(E, "Yes, CW", "네, 시계 방향"),
        t(E, "No, CCW", "아니요, 반시계 방향"),
      ],
      correct: 0,
      explain: t(E,
        "All 4 transitions are right turns (N->E, E->S, S->W, W->N). More right turns than left = clockwise!",
        "4개 전환 모두 오른쪽 회전(N->E, E->S, S->W, W->N). 오른쪽 회전이 왼쪽보다 많으면 = 시계 방향!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 'NESW': N->E is right, E->S is right, S->W is right, W->N is right. How many right turns total?",
        "'NESW'에서: N->E 오른쪽, E->S 오른쪽, S->W 오른쪽, W->N 오른쪽. 오른쪽 회전 총 몇 번?"),
      question: t(E,
        "'NESW': right turns - left turns = ?",
        "'NESW': 오른쪽 회전 - 왼쪽 회전 = ?"),
      hint: t(E,
        "All 4 turns are right turns, 0 left turns. 4 - 0 = 4.",
        "4번 모두 오른쪽 회전, 왼쪽 회전 0번. 4 - 0 = 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Map each direction to 0-3. A right turn increases by 1 (mod 4), a left turn decreases by 1. Count and compare. O(N) time.",
        "각 방향을 0-3으로 매핑. 오른쪽 회전은 1 증가(mod 4), 왼쪽 회전은 1 감소. 세고 비교. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each consecutive pair of directions, compute (next - cur) mod 4. If 1 = right turn, if 3 = left turn. Compare totals.",
              "연속 방향 쌍마다 (다음 - 현재) mod 4 계산. 1이면 오른쪽 회전, 3이면 왼쪽 회전. 합계 비교.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the turn-counting solution!",
        "회전 카운팅 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
