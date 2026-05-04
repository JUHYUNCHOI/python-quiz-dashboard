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
        "A squirrel collects honey using a pot of capacity M ml. There are N beehives with given honey amounts h[1..N]. The squirrel can make AT MOST K trips. Each trip: visit ONE hive and take min(remaining honey there, M) into the pot.\nMaximize the TOTAL honey collected.",
        "다람쥐가 용량 M ml 의 항아리로 꿀을 모아요. N 개의 벌집에 각자 꿀 양 h[1..N] 이 있어요. 다람쥐는 최대 K 번 왕복 가능. 매 왕복: 벌집 1 개를 방문해 min (그곳의 남은 꿀, M) 만큼 가져옴.\n수집한 꿀의 총량 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf6f"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Honey</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A squirrel has a ", "다람쥐가 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "pot of capacity M ml", "용량 M ml 의 항아리")}</b>
                  {t(E, " and faces ", " 를 들고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N beehives with honey h[1..N]", "꿀 양 h[1..N] 을 가진 N 개의 벌집")}</b>
                  {t(E, ".", " 을 만나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She can make at most ", "최대 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K trips", "K 번 왕복")}</b>
                  {t(E, "; each trip visits ONE hive and takes min (remaining honey there, M).",
                        " 가능; 매 왕복: 벌집 1 개를 방문해 min (그곳의 남은 꿀, M) 만큼 가져옴.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM total honey collected", "수집한 꿀의 총량 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Why do we sort the hives in descending order? Think about maximizing honey per trip.", "왜 벌집을 내림차순으로 정렬할까? 왕복당 꿀 수집량 최대화를 생각해봐요."),
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
        "맞아! 각 왕복은 최대 M ml 수집. 큰 벌집부터 방문하면 매 왕복마다 M에 가깝게 수집할 수 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the pot holds M=10 ml and a hive has 25 ml of honey, how many trips are needed to collect all the honey from that hive?", "항아리 용량 M=10 ml이고 벌집에 꿀이 25 ml 있으면, 그 벌집의 꿀을 다 모으려면 몇 번 왕복해야 할까?"),
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
        "Sort the hives, then greedily assign trips.\nO(N log N) for sorting, O(N) for the greedy pass.", "벌집을 정렬한 뒤, 그리디하게 왕복을 배정해요. 정렬에 O(N log N), 그리디 패스에 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Greedy: sort descending.\nFor each hive, compute trips needed = ceil(honey/M). Use min(trips_needed, trips_left) trips, collecting min(honey, trips_used * M).",
              "그리디: 내림차순 정렬.\n각 벌집에 대해 필요한 왕복 = ceil(honey/M). min(필요 왕복, 남은 왕복)만큼 사용, min(honey, 사용 왕복 * M) 수집.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getHoneySections(E),
    },
  ];
}
