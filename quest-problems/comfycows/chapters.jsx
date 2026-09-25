import { C, t } from "@/components/quest/theme";
import { getComfyCowsSections, ComfyCowsSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeComfyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Each time a cow is added, count how many cows are comfortable.",
        "소를 한 마리씩 놓을 때마다 편안한 소가 몇 마리인지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Comfortable Cows</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "After each cow is added, output the current count of comfortable cows.",
                "소를 한 마리 놓을 때마다 편안한 소가 몇 마리인지 출력해요.")}
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
                  {t(E, "FJ adds ", "FJ가 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows one at a time", "N마리 소를 한 마리씩")}</b>
                  {t(E, " to an infinite 2D grid, each at a distinct cell.",
                        " 무한 2D 격자의 서로 다른 칸에 추가해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A cow is ", "어떤 소가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "COMFORTABLE", "편안 (COMFORTABLE)")}</b>
                  {t(E, " if exactly 3 of its 4 up/down/left/right neighbor cells are currently occupied.",
                        "하려면 상하좌우 4개의 이웃 칸 중 정확히 3개가 그 시점에 차 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "After each addition, print the ", "각 추가 직후 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "current count of comfortable cows", "현재 편안한 소의 개수")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then N cow positions, one per line.",
        "입력은 소의 수 N 다음에, 소가 놓이는 자리가 한 줄씩 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>x y</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the i-th cow's cell", "— i번째 소가 놓이는 칸")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "After each cow is added, the running total of comfortable cows (N lines).",
                  "소를 한 마리 놓을 때마다, 그 시점까지 편안한 소의 개수를 한 줄씩 출력해요 (N 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 10⁵ (100,000)</div>
              <div>0 ≤ x, y ≤ 1000</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "all N cells are distinct (guaranteed)", "N개의 칸은 모두 서로 달라요 (보장됨)")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sim — click cells to add cows, watch neighbor counts + comfortable highlight live.
    {
      type: "reveal",
      narr: t(E,
        "Click empty cells to add cows one at a time.",
        "빈 칸을 클릭해 소를 한 마리씩 놓아 봐요."),
      content: (<ComfyCowsSim E={E} />),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A cow at (1,1) has neighbors at (0,1), (2,1), (1,0).\nThat's 3 neighbors.\nIs it comfortable?", "(1,1) 의 소는 이웃이 3마리예요.\n이 소는 편안할까요?"),
      question: t(E,
        "Cow at (1,1) with 3 neighbors. Comfortable?",
        "(1,1)의 소, 이웃 3마리. 편안해요?"),
      options: [
        t(E, "Yes, exactly 3 neighbors", "네, 정확히 이웃 3마리"),
        t(E, "No, needs 4 neighbors", "아니요, 이웃 4마리 필요"),
      ],
      correct: 0,
      explain: t(E,
        "A cow is comfortable with exactly 3 neighbors. (1,1) has 3 occupied neighbors, so it's comfortable!",
        "소는 이웃이 정확히 3마리일 때 편안해요.\n(1,1) 은 이웃 칸 3개가 차 있으니까 편안해요!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "A cow with exactly 3 neighbors is comfortable.\nEnter 1 for yes, 0 for no: is it comfortable?", "이웃이 정확히 3마리인 소는 편안해요. 편안하면 1, 아니면 0 을 넣어요."),
      question: t(E,
        "Cow with exactly 3 neighbors: comfortable? (1=yes, 0=no)",
        "이웃이 3마리인 소는 편안할까요? (1=예, 0=아니오)"),
      hint: t(E,
        "Re-read the comfortable rule — exactly how many neighbors?",
        "편안한 조건을 다시 읽어 봐요. 이웃이 정확히 몇 마리일까요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeComfyCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Only recheck the new cow and her 4 neighbors — 5 cells.",
        "새 소와 그 이웃 4칸, 이 5칸만 다시 보면 돼요."),
      sections: getComfyCowsSections(E),
    },
  ];
}
