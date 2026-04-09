import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# 3 cows start at 7 gallons each",
  "milk = {1: 7, 2: 7, 3: 7}",
  "",
  "changes = []",
  "for _ in range(N):",
  "    d, cow, delta = input().split()",
  "    changes.append((int(d), int(cow), int(delta)))",
  "",
  "changes.sort()",
  "",
  "def get_leaders(m):",
  "    mx = max(m.values())",
  "    return frozenset(c for c, v in m.items() if v == mx)",
  "",
  "display_changes = 0",
  "prev_leaders = get_leaders(milk)",
  "",
  "for day, cow, delta in changes:",
  "    milk[cow] += delta",
  "    cur_leaders = get_leaders(milk)",
  "    if cur_leaders != prev_leaders:",
  "        display_changes += 1",
  "    prev_leaders = cur_leaders",
  "",
  "print(display_changes)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeMilkMeasCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Three cows start at 7 gallons. Over 100 days, milk production changes. Count how many times the display (set of leaders) changes.",
        "세 마리 소가 각각 7갤런으로 시작해. 100일 동안 우유 생산량이 변해. 디스플레이(리더 집합)가 몇 번 바뀌는지 세."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcca"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Milk Measurement</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Simulate day by day. Track the set of cows with maximum milk. Each time this set changes, increment the counter.",
              "핵심: 날마다 시뮬레이션해. 최대 우유를 가진 소의 집합을 추적해. 이 집합이 바뀔 때마다 카운터를 증가시켜.")}
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "All cows start at 7. Day 1: Bessie (cow 1) gets +5, now at 12. Leaders change from {all three} to {Bessie}. Is this 1 display change?",
        "모든 소가 7에서 시작. 1일차: 베시(소 1)가 +5, 이제 12. 리더가 {전부}에서 {베시}로 변경. 디스플레이 변경 1번이야?"),
      question: t(E,
        "Start: all at 7 (leaders = all). Bessie +5 -> 12. Leaders = {Bessie}. Display changes?",
        "시작: 모두 7 (리더 = 전부). 베시 +5 -> 12. 리더 = {베시}. 디스플레이 변경 횟수?"),
      options: [
        t(E, "1 change", "1번 변경"),
        t(E, "0 changes", "0번 변경"),
        t(E, "3 changes", "3번 변경"),
      ],
      correct: 0,
      explain: t(E,
        "The leader set changed from {1,2,3} to {1}. That's 1 display change.",
        "리더 집합이 {1,2,3}에서 {1}로 바뀜. 디스플레이 변경 1번."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "All start at 7. Only one change: Bessie +5 on day 1. How many display changes total?",
        "모두 7에서 시작. 변경 하나만: 1일차 베시 +5. 총 디스플레이 변경 횟수는?"),
      question: t(E,
        "1 change: Bessie +5. Total display changes?",
        "변경 1개: 베시 +5. 총 디스플레이 변경 횟수?"),
      hint: t(E,
        "Leaders go from {all} to {Bessie}. That's 1 change.",
        "리더가 {전부}에서 {베시}로. 1번 변경."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeMilkMeasCh2(E) {
  return [
    // 2-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort changes by day, simulate. Track leader set with a frozenset. O(N log N) time!",
        "변경을 날짜순 정렬하고 시뮬레이션해. frozenset으로 리더 집합 추적. O(N log N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort events by day. For each event, update milk and recompute leaders. Compare with previous leader set.",
              "이벤트를 날짜별 정렬. 각 이벤트마다 우유 업데이트하고 리더 재계산. 이전 리더 집합과 비교.")}
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "code",
      narr: t(E,
        "Here's the simulation solution!",
        "시뮬레이션 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
