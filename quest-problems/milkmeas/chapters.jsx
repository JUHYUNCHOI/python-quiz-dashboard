import { C, t } from "@/components/quest/theme";
import { getMilkMeasSections } from "./components";

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
        "FJ has 3 cows (Bessie, Elsie, Mildred), each starting at 7 gallons of daily output. There are N daily change events: \"on day d, cow X's output changes by ±value\".\nA sign 'displays the leader(s)' — the set of cows currently producing the maximum. Print the number of times the displayed set changes over the whole period.",
        "FJ 에게 3마리 소 (Bessie, Elsie, Mildred) 가 있고, 각자 매일 7 갤런 생산으로 시작해요. N 개의 날짜별 변동 이벤트가 있어요: \"d 일에 X 의 생산량이 ±값 만큼 바뀌어요\".\n간판이 '지금 가장 많이 만든 소들' 을 표시해요 — 즉 현재 최대 생산량인 소들이에요. 전체 기간 동안 표시되는 소들이 바뀐 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcca"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Milk Measurement</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #3</div>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "3 cows (Bessie, Elsie, Mildred)", "3마리 소 (Bessie, Elsie, Mildred)")}</b>
                  {t(E, " — each starts at 7 gallons of daily output.",
                        " 가 있고, 매일 생산량이 7 갤런으로 시작.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N change events: ", "N 개의 변동 이벤트: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "on day d, cow X's output changes by ±value", "d 일에 X 의 생산량이 ±값 만큼 변함")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A sign displays the ", "간판은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "set of current leaders", "지금 가장 많이 만든 소들")}</b>
                  {t(E, " (cows tied for the maximum output).",
                        " (현재 최대 생산량인 소들) 을 표시해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of times the displayed set changes", "표시 집합이 바뀐 횟수")}</b>
                  {t(E, " over the whole event sequence.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "All cows start at 7.\nDay 1: Bessie (cow 1) gets +5, now at 12.\nLeaders change from {all three} to {Bessie}.\nIs this 1 display change?", "모든 소가 7에서 시작. 1일차: 베시(소 1)가 +5, 이제 12. 리더가 {전부}에서 {베시}로 변경. 디스플레이 변경 1번이에요?"),
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
        "All start at 7. Only one change: Bessie +5 on day 1. How many display changes total?", "모두 7에서 시작. 변경 하나만: 1일차 베시 +5. 총 디스플레이 변경 횟수는?"),
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
export function makeMilkMeasCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort events by day. Process each event in order: update that cow's output, recompute the leader set (cows tied for max). Compare with previous leader set — count changes.",
        "이벤트를 날짜순 정렬. 순서대로 처리: 해당 소의 생산량 갱신, 리더 집합 (최대 값과 동률 소들) 재계산. 이전 리더 집합과 비교 — 변화 카운트."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Sort events by day", "이벤트 날짜순 정렬"), code: "events.sort(key=lambda e: e.day)", color: "#8b5cf6" },
              { n: 2, label: t(E, "Init milk = {Bessie:7, Elsie:7, Mildred:7}", "우유 = 모두 7 로 초기화"), code: "milk = {'Bessie':7, 'Elsie':7, 'Mildred':7}", color: "#7c3aed" },
              { n: 3, label: t(E, "Apply event, recompute leaders", "이벤트 적용, 리더 재계산"), code: "milk[name] += delta;  new_leaders = cows with max(milk.values())", color: "#0891b2" },
              { n: 4, label: t(E, "If different from previous: count", "이전과 다르면 카운트"), code: "if new_leaders != prev: changes += 1; prev = new_leaders", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N log N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "sort + linear simulation", "정렬 + 선형 시뮬레이션")}</div>
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMilkMeasSections(E),
    },
  ];
}
