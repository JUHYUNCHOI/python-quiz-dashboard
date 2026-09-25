import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeTrianglesCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      narr: t(E,
        "Pick three fence posts to form the biggest axis-aligned right triangle.",
        "울타리 기둥 세 개로 가장 큰 직각 삼각형을 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcd0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Triangles</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output TWICE the maximum area of an axis-aligned right triangle from the N posts.",
                "축에 평행한 직각 삼각형의 최대 넓이의 2 배를 출력해요.")}
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
                  {t(E, "FJ has ", "FJ 한테 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "N fence posts at integer (x, y)", "정수 (x, y) 의 N 개 울타리 기둥")}</b>
                  {t(E, " positions.", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose 3 posts forming a ", "그중 세 기둥으로 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "right triangle with legs parallel to the axes", "두 변이 x 축과 y 축에 평행한 직각 삼각형")}</b>
                  {t(E, ".", " 을 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TWICE the maximum area of such a triangle", "그 삼각형 최대 넓이의 2 배")}</b>
                  {t(E, " (to keep the output an integer).", " 를 출력해요 (소수 없이 정수로).")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문 triangles.in/.out, usaco.org cpid=1011 직접 확인) —
    // 시즌 표준화 (photoshoot25 형태). 샘플은 원문 그대로, FULL_PY 로 직접 돌려 "2" 확인함.
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then N lines of a post's (x, y).",
        "입력은 N, 그다음 기둥의 (x, y) 가 적힌 N 줄이에요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of fence posts", "— 울타리 기둥의 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>X Y</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— this post's position", "— 이 기둥의 위치")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: twice the maximum triangle area (so the answer is always a whole number).",
                  "한 줄: 최대 삼각형 넓이의 2 배 (그래야 항상 정수가 돼요).")}
            </div>
          </div>
          {/* 제약 (USACO 원문) */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>3 ≤ N ≤ 100</div>
              <div>−10⁴ ≤ X, Y ≤ 10⁴  (= −10,000 ~ 10,000)</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "posts are at distinct points  ·  at least one valid triangle exists", "기둥은 서로 다른 위치  ·  만들 수 있는 삼각형이 하나는 있음")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Points (0,0), (1,0), (0,2), with the right angle at (0,0). Measure the base and the height first.", "밑변과 높이를 먼저 재고 넓이를 구해 봐요."),
      question: t(E,
        "Points (0,0),(1,0),(0,2). Right angle at origin. 2 * area = ?",
        "점 (0,0),(1,0),(0,2). 원점이 직각이에요. 2 × 넓이는?"),
      options: [
        t(E, "2", "2"),
        t(E, "1", "1"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "Base = 1 (along x), Height = 2 (along y). Area = 1*2/2 = 1. Output = 2*1 = 2.",
        "밑변 = 1 (x축), 높이 = 2 (y축). 넓이 = 1*2/2 = 1. 출력 = 2*1 = 2."),
    },
    // 1-3: Sim — click a post as the right-angle corner, see legs auto-light, watch 2×area compute live
    {
      type: "sim",
      narr: t(E,
        "Click a post to make it the right-angle corner.",
        "기둥을 클릭하면 그 기둥이 직각 꼭짓점이 돼요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "For points (0,0), (1,0), (0,2): what is 2 * max area?", "점 세 개가 (0,0), (1,0), (0,2) 일 때 최대 넓이 × 2 는?"),
      question: t(E,
        "Points (0,0),(1,0),(0,2). Output 2 * max triangle area?",
        "점 (0,0),(1,0),(0,2) 일 때 최대 넓이 × 2 를 출력하면?"),
      hint: t(E,
        "Find the right-angle vertex, then 2 × area = base × height.",
        "직각 꼭짓점을 먼저 찾아요. 2 × 넓이 = 밑변 × 높이 예요."),
      answer: 2,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeTrianglesCh2(E, lang = "py") {
  return [
    /* ⚡ 풀이 전체 코드 — CodeWalk 말풍선 하나로 (선생님 2026-07-14: 모든 quest 코드 이 방식).
       PDF 는 getTrianglesSections() 로 계속 받을 수 있음(위 PDF 버튼). */
    {
      type: "triangles-walk",
      narr: t(E,
        "Treat each post as the right-angle corner and find the largest area.",
        "각 기둥을 직각 꼭짓점으로 두고 가장 큰 넓이를 찾아요."),
    },
  ];
}
