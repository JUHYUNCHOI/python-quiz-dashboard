import { C, t } from "@/components/quest/theme";
import { getHoneySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M, K = map(int, input().split())",
  "hives = [int(input()) for _ in range(N)]",
  "",
  "# Each trip to a hive collects min(M, remaining honey).",
  "# Build the list of all possible per-trip yields, then take the K largest.",
  "yields = []",
  "for h in hives:",
  "    while h > 0:",
  "        take = min(M, h)",
  "        yields.append(take)",
  "        h -= take",
  "",
  "yields.sort(reverse=True)",
  "print(sum(yields[:K]))",
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
        "K 번만 오갈 수 있어요. 꿀을 가장 많이 모아 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf6f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Honey</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Maximize total honey across at most K trips, where each trip drains up to M ml from one hive.",
                    "최대 K 번 왕복 안에서, 각 왕복마다 한 벌집에서 최대 M ml 을 가져와 총 꿀을 최대로 모아요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A squirrel has a ", "다람쥐가 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "pot of capacity M ml", "용량이 M ml 인 항아리")}</b>
                  {t(E, " and faces ", " 를 들고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N beehives with honey h[1..N]", "꿀 양 h[1..N] 을 가진 N 개의 벌집")}</b>
                  {t(E, ".", " 을 만나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She can make at most ", "최대 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K trips", "K 번 왕복(한 번 가서 가져오기)")}</b>
                  {t(E, "; each trip visits ONE hive and takes min (remaining honey there, M).",
                        " 까지 할 수 있어요. 한 번 갈 때마다 벌집 하나에 들러서\nmin (그 벌집에 남은 꿀, M) 만큼 가져와요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Why do we sort the hives in descending order? Think about maximizing honey per trip.", "한 번 다녀올 때 꿀을 얼마나 가져오는지 생각해 봐요."),
      question: t(E,
        "Why sort hives descending by honey amount?",
        "왜 꿀이 많은 벌집부터 정렬할까요?"),
      options: [
        t(E, "Larger hives can fill the pot completely", "큰 벌집은 항아리를 가득 채울 수 있어요"),
        t(E, "Smaller hives are easier to empty", "작은 벌집이 비우기 쉬워요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Each trip collects at most M ml. Visiting larger hives first ensures each trip collects as close to M as possible.",
        "맞아요! 한 번 다녀올 때 최대 M ml 을 가져와요.\n꿀이 적은 벌집부터 가면 항아리를 못 채우고 한 번을 써 버려요.\n큰 벌집부터 가면 갈 때마다 M 에 가깝게 채울 수 있어요."),
    },
    // 1-3: Sim — drag K, watch which trip-yields the squirrel picks
    {
      type: "sim",
      narr: t(E,
        "Three hives, M=10. Each hive splits into trip-yields (M ml, last block = remainder). Drag K — the K largest yields light up and sum into the live total. That sorted-descending pick IS the algorithm.",
        "K 를 움직여 보면 큰 것부터 K 개가 골라져요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "If the pot holds M=10 ml and a hive has 25 ml of honey, how many trips are needed to collect all the honey from that hive?", "항아리가 10 ml, 벌집에 꿀이 25 ml 있어요. 몇 번 다녀와야 할까요?"),
      question: t(E,
        "Pot M=10, hive has 25 honey. Trips to empty it? (10+10+5)",
        "항아리 M=10, 벌집에 꿀 25. 몇 번 다녀올까요? (10+10+5)"),
      hint: t(E,
        "Each trip takes up to 10. Subtract 10 each time until honey hits 0 — count the trips.",
        "한 번에 최대 10 씩 가져와요. 꿀이 0 이 될 때까지 10 씩 빼면서 횟수를 세어봐요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoneyCh2(E, lang = "py") {
  return [
    // 2-1: Code (greedy strategy + progressive sections)
    {
      type: "progressive",
      narr: t(E,
        "Greedy: sort hives by honey amount DESCENDING. For each hive in order, use trips = ceil(honey / M) — capped by remaining trips. Sections build it one piece at a time. Toggle Python ↔ C++ in header.",
        "꿀이 많은 벌집부터 차례로 다녀와요."),
      sections: getHoneySections(E),
    },
  ];
}
