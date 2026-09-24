import { C, t } from "@/components/quest/theme";
import { getCrossRoad2Sections, CrossRoad2Sim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "How many pairs of cows have paths that cross?",
        "길이 서로 엇갈리는 소는 몇 쌍일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Cross the Road II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E, "Print the number of intersecting cow-pairs.", "교차하는 소-쌍의 개수를 출력해요.")}
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
                  <b style={{ color: "#f97316" }}>{t(E, "26 cows (A..Z) walk around a circular road", "26마리 소 (A..Z) 가 원형 도로 위를 걸어요")}</b>
                  {t(E, " — each crosses it exactly twice (so 52 crossing points total).",
                        " . 소마다 딱 두 번씩 건너니까 건너는 자리는 모두 52 군데예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "cyclic sequence of 52 letters at the crossing points", "원을 따라 늘어선 글자 52 개")}</b>
                  {t(E, " (each letter appears twice).",
                        " 가 주어져요. 글자마다 두 번씩 나와요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two cow paths ", "두 소의 경로가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "intersect", "교차")}</b>
                  {t(E, " if their crossing points interleave around the circle (e.g., A..B..A..B), like two chords that cross.",
                        " 한다는 건, 원을 돌며 읽을 때 두 소의 자리가 A..B..A..B 처럼 엇갈려 나온다는 뜻이에요. 원 안에 선을 그어 보면 두 선이 X 자로 만나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of intersecting cow-pairs", "교차하는 소-쌍의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>

            {/* 🔍 Deep-audit sim — step through every pair and check interleave */}
            <div style={{ background: "#fff", border: `1.5px solid #fdba74`, borderRadius: 12, marginTop: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", padding: "10px 14px 0" }}>
                🔍 {t(E, "Walk through every pair — does it interleave?",
                       "모든 쌍을 한 번씩 보며 엇갈리는지 직접 확인해요")}
              </div>
              <CrossRoad2Sim E={E} />
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    // ⚠️ 2026-09-17 고침 — 원래 이 퀴즈는 **ABBA 가 교차한다**고 가르쳤다. 틀렸다.
    //    A(0,3) 이 B(1,2) 를 **감싸는** 모양이고, 감싸는 건 넘어가는 게 아니다.
    //    같은 quest 의 풀이 코드 조건(0<1<3<2)으로 검산해도 거짓이다.
    //    실제로 교차하는 건 **번갈아 나오는 ABAB** 다. 담당자가 찾았다.
    {
      type: "quiz",
      narr: t(E,
        "A joins to A, B joins to B.\nWhich order makes the two lines cross over each other?",
        "A 는 A 끼리, B 는 B 끼리 줄로 이어요.\n어떤 차례일 때 두 줄이 서로 넘어갈까요?"),
      question: t(E,
        "Which one has crossing lines: AABB, ABBA, or ABAB?",
        "AABB · ABBA · ABAB 중에 두 줄이 교차하는 건 어느 것일까요?"),
      options: [
        t(E, "AABB — A finishes before B starts", "AABB — A 가 끝난 뒤에 B 가 시작해요"),
        t(E, "ABBA — A wraps around B", "ABBA — A 가 B 를 감싸요"),
        t(E, "ABAB — A and B take turns", "ABAB — A 와 B 가 번갈아 나와요"),
      ],
      correct: 2,
      explain: t(E,
        "In AABB the A line is done before the B line starts, so they never meet.\nIn ABBA the A line wraps around the B line — wrapping around is not crossing over.\nOnly when they take turns, ABAB, does each line have to cross the other.",
        "AABB 는 A 줄이 끝난 뒤에 B 줄이 시작해서 둘이 만나지 않아요.\nABBA 는 A 줄이 B 줄을 감싸기만 해요 — 감싸는 건 넘어가는 게 아니에요.\nABAB 처럼 번갈아 나올 때만 두 줄이 서로를 넘어가요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now count them for 'ABAB'.", "이번엔 'ABAB' 에서 세어 봐요."),
      question: t(E,
        "Pattern 'ABAB': how many crossing pairs?",
        "패턴 'ABAB' 에서 교차하는 쌍은 몇 개일까요?"),
      hint: t(E,
        "Only 2 cows here (A and B). Do their two lines cross over each other?",
        "소가 A, B 두 마리뿐이에요. 두 줄이 서로 넘어가나요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd2Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Read the solution code piece by piece.",
        "풀이 코드를 한 단락씩 읽어 봐요."),
      sections: getCrossRoad2Sections(E),
    },
  ];
}
