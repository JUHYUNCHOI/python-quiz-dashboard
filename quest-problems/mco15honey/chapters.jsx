import { C, t } from "@/components/quest/theme";
import { getHoneySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M, K = map(int, input().split())",
  "hives = [int(input()) for _ in range(N)]",
  "",
  "hives.sort(reverse=True)",
  "",
  "total = 0",
  "trips_left = K",
  "",
  "for honey in hives:",
  "    if trips_left <= 0:",
  "        break",
  "    # How many full trips to empty this hive?",
  "    trips_needed = (honey + M - 1) // M  # ceil(honey / M)",
  "    trips_used = min(trips_needed, trips_left)",
  "    collected = min(honey, trips_used * M)",
  "    total += collected",
  "    trips_left -= trips_used",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoneyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A squirrel collects honey from N beehives using a pot that holds M ml. It can make at most K trips. Each trip: pick one hive, collect min(remaining, M). Maximize total honey collected!",
        "다람쥐가 M ml 용량의 항아리로 N개 벌집에서 꿀을 모아. 최대 K번 왕복 가능. 매 왕복: 벌집 하나를 골라 min(남은양, M)만큼 수집. 총 꿀을 최대화해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf6f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Honey</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P2</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Greedy approach - sort hives by honey amount in descending order. Use trips on the largest hives first to maximize collection.",
              "핵심: 그리디 접근 - 벌집을 꿀 양 내림차순으로 정렬. 가장 큰 벌집부터 왕복을 사용해서 수집량을 최대화.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Why do we sort the hives in descending order? Think about maximizing honey per trip.",
        "왜 벌집을 내림차순으로 정렬할까? 왕복당 꿀 수집량 최대화를 생각해봐."),
      question: t(E,
        "Why sort hives descending by honey amount?",
        "왜 벌집을 꿀 양 내림차순으로 정렬하나?"),
      options: [
        t(E, "Larger hives give more honey per trip", "큰 벌집이 왕복당 더 많은 꿀을 줘"),
        t(E, "Smaller hives are easier to empty", "작은 벌집이 비우기 쉬워"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Each trip collects at most M ml. Visiting larger hives first ensures each trip collects as close to M as possible.",
        "맞아! 각 왕복은 최대 M ml 수집. 큰 벌집부터 방문하면 매 왕복마다 M에 가깝게 수집할 수 있어."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the pot holds M=10 ml and a hive has 25 ml of honey, how many trips are needed to collect all the honey from that hive?",
        "항아리 용량 M=10 ml이고 벌집에 꿀이 25 ml 있으면, 그 벌집의 꿀을 다 모으려면 몇 번 왕복해야 할까?"),
      question: t(E,
        "Pot M=10, hive has 25 honey. Trips to empty it? (10+10+5)",
        "항아리 M=10, 벌집에 꿀 25. 다 모으려면 왕복 횟수? (10+10+5)"),
      hint: t(E,
        "ceil(25/10) = 3 trips: first two collect 10 each, third collects 5.",
        "ceil(25/10) = 3번: 처음 두 번은 10씩, 세 번째는 5를 수집."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoneyCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the hives, then greedily assign trips. O(N log N) for sorting, O(N) for the greedy pass.",
        "벌집을 정렬한 뒤, 그리디하게 왕복을 배정해. 정렬에 O(N log N), 그리디 패스에 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Greedy: sort descending. For each hive, compute trips needed = ceil(honey/M). Use min(trips_needed, trips_left) trips, collecting min(honey, trips_used * M).",
              "그리디: 내림차순 정렬. 각 벌집에 대해 필요한 왕복 = ceil(honey/M). min(필요 왕복, 남은 왕복)만큼 사용, min(honey, 사용 왕복 * M) 수집.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getHoneySections(E),
    },
  ];
}
