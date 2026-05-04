import { C, t } from "@/components/quest/theme";
import { getClockFenceSections } from "./components";

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
        "A fence is described by a sequence of unit-step directions (N, E, S, W) that returns to the start, forming a closed simple polygon.\nDecide whether the fence is traced CLOCKWISE or COUNTER-CLOCKWISE.",
        "울타리가 단위 길이 방향(N, E, S, W) 의 수열로 묘사되고, 시작점으로 돌아오는 단순 폐곡선을 이뤄요.\n그 울타리가 시계 방향(CW) 인지 반시계 방향(CCW) 인지 판단해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Clockwise Fence</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A fence is given as a ", "울타리가 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "string of unit-step directions", "단위 길이 방향 문자열")}</b>
                  {t(E, " — letters ", " — 문자 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>N E S W</code>
                  {t(E, " (north / east / south / west).", " (북 / 동 / 남 / 서) 로 표현돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Following the directions ", "방향을 따라가면 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "returns to the start", "시작점으로 돌아와요")}</b>
                  {t(E, " — forming a closed simple polygon (no self-crossings).",
                        " — 자기 자신과 교차하지 않는 닫힌 단순 다각형이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "CW if the fence is traced clockwise, else CCW", "시계 방향이면 CW, 아니면 CCW")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "The path 'NESW' makes a square: go North, then East, then South, then West.\nEach turn is a right turn.\nIs this clockwise?", "경로 'NESW'는 정사각형: 북쪽, 동쪽, 남쪽, 서쪽. 각 회전이 오른쪽 회전이예요. 시계 방향일까요?"),
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
        "For 'NESW': N->E is right, E->S is right, S->W is right, W->N is right.\nHow many right turns total?", "'NESW'에서: N->E 오른쪽, E->S 오른쪽, S->W 오른쪽, W->N 오른쪽. 오른쪽 회전 총 몇 번?"),
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
export function makeClockCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Map each direction to 0-3.\nA right turn increases by 1 (mod 4), a left turn decreases by 1.\nCount and compare.\nO(N) time.", "각 방향을 0-3으로 매핑. 오른쪽 회전은 1 증가(mod 4), 왼쪽 회전은 1 감소. 세고 비교. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each consecutive pair of directions, compute (next - cur) mod 4.\nIf 1 = right turn, if 3 = left turn. Compare totals.",
              "연속 방향 쌍마다 (다음 - 현재) mod 4 계산.\n1이면 오른쪽 회전, 3이면 왼쪽 회전. 합계 비교.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getClockFenceSections(E),
    },
  ];
}
