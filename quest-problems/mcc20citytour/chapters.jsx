import { C, t } from "@/components/quest/theme";
import { getMcc20CityTourWalk, Mcc20CityTourBfsSim, Mcc20CityTourBfsProcessStepper } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (flood-fill / BFS with the |Δheight| < D edge rule)
   Input format:  line 1 = "M N",  then M lines of N heights,  last = "D".
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makeMcc20CityTourCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "How many cells can Fluffy reach by hopping only where the height gap is under D?",
        "Fluffy 가 건너갈 수 있는 칸은 모두 몇 개일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🏙️"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#d97706" }}>City Tour</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                /* ⭐ 2026-09-26: 재검증 학생 *"1쪽 미션에서 D 를 먼저 쓰는데, D 가
                   «건너가기 기준값» 이라는 뜻은 2쪽에 가서야 나온다"*.
                   뜻을 그 자리에서 붙인다 (feedback_no_invented_terms — 처음 쓰기 전에 정의). */
                "Count the cells Fluffy can reach from (1,1), hopping to a neighbor only when the height difference is smaller than a given limit D.",
                "이웃과의 높이 차이가 기준값 D 보다 작을 때만 건너가면서,\n(1,1) 에서 Fluffy 가 갈 수 있는 칸이 몇 개인지 세요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The city is an M×N grid where each cell holds a ", "도시는 M×N 격자이고 각 칸에는 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "building height H(i,j)", "건물 높이 H(i,j)")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Fluffy starts at ", "Fluffy 는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "(1,1)", "(1,1)")}</b>
                  {/* ⭐ 2026-09-26 (PM 판정, 좁게 승인된 유일한 변경): 학생이
                      *"절댓값 기호가 정의 없이 쓰였다"* 고 했다. `check-undefined-symbol.py` 는
                      이 quest 를 0건으로 통과시켰는데, 표기가 `t(E, ...)` 조각으로 쪼개져 있어
                      **그 검사기가 못 보는 구멍**이었다.
                      ⛔ 새 설명을 지어내지 않는다 — **이미 이 quest 안에 있는 말**을 앞에 붙인다
                      (`components.jsx:92` 의 「높이 차이」). `feedback_no_invented_terms`. */}
                  {t(E, " and may jump to an adjacent cell (up/down/left/right) only when the height difference ", " 에서 시작하고, 인접 칸 (상하좌우) 으로는 높이 차이 ")}
                  <b style={{ color: "#dc2626", whiteSpace: "nowrap" }}>{t(E, "|H(here) − H(there)| < D", "|H(현재) − H(이웃)| < D")}</b>
                  {t(E, ".", " 일 때만 건너가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of cells reachable from the start (including the start)", "시작에서 도달 가능한 칸의 수 (시작 포함)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Check what shape the input comes in first.",
        "입력이 어떤 모양으로 들어오는지 먼저 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            {/* 2026-09-17: 여기가 "1번째 줄 / 다음 M 줄 / 마지막 줄" 이라고 **원문에 없는 줄 형식**을
                원문인 것처럼 적어 두던 자리다. 원문(public/problems/mcc20citytour.pdf)은
                M = 4 / N = 5 / D = 5 / H = [[1,3,7,9,16], ...] 처럼 값을 변수로 준다.
                값의 이름만 남기고, 표준 입력은 우리 연습 방식이라고 밝힌다. */}
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>M</b>, <b>N</b> — {t(E, "rows and columns", "줄 수와 칸 수")}</div>
              <div>• <b>H</b> — {t(E, "the M×N grid of building heights", "M×N 격자에 담긴 건물 높이")}</div>
              <div>• <b>D</b> — {t(E, "the jump threshold", "건너가기 기준값")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {/* 2026-09-17: 세미콜론 3개를 쉼표로. 형제 quest(mcc20kitty:209·mcc20cipher:217)가 쉼표를 쓴다. */}
              {t(E, "Limits: 1 ≤ M, N, M×N ≤ 100000, 1 ≤ D ≤ 100000, −10^6 ≤ H ≤ 10^6.", "제약: 1 ≤ M, N, M×N ≤ 100000, 1 ≤ D ≤ 100000, −10^6 ≤ H ≤ 10^6.")}
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                /* 2026-09-26: 이 쪽은 「형식」만 다뤄야 하는데 주제가 넷이었다(293자).
                   예고 두 문장을 하나로 줄인다 (feedback_shorter_not_longer). */
                "This contest hands the data over as values, so the code below starts from those same values — no reading lines in.",
                "이 대회는 값을 그대로 줘요. 그래서 아래 코드도 값을 적어 두고 시작해요 — 줄을 읽어 오지 않아요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>M = 4</div>
              <div>N = 5</div>
              <div>D = 5</div>
              <div style={{ overflowX: "auto" }}>H = [[1, 3, 7, 9, 16],</div>
              <div style={{ overflowX: "auto" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6, 2, 4, 1, 8],</div>
              <div style={{ overflowX: "auto" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[8, 9, 10, 12, 14],</div>
              <div style={{ overflowX: "auto" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[7, 5, 1, 4, 11]]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>18 <span style={{ fontSize: 10, fontWeight: 400, color: "#8b949e" }}>← {t(E, "answer", "답")}</span></div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
            {/* 2026-09-17: 여기가 "(1,5)=16 과 (2,5)=8 만 막혀서 20칸 중 18칸" 이라고
                답과 이유를 통째로 말했다. 바로 다음 쪽 시뮬의 기본값이 정확히 D = 5 라서
                (components.jsx:47), 학생은 슬라이더를 만지기도 전에 결론을 다 알았다.
                형제 mcc19rect2 처럼 답을 다음 쪽으로 미룬다. */}
            {t(E,
              "20 cells in the grid, but the answer is 18. Which two are cut off, and why?\nThe next page lets you slide D and watch.",
              "칸은 20 개인데 답은 18 이에요. 어느 두 칸이 막힌 걸까요?\n다음 쪽에서 D 를 움직이며 직접 확인해요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the rule. Slide D up and down and watch the reachable region flood-fill out from Fluffy's start.",
        "D 를 바꾸면 갈 수 있는 곳이 어떻게 달라지는지 봐요."),
      content: <Mcc20CityTourBfsSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "The edge rule is strict: the height gap must be LESS than D, not equal. A gap exactly equal to D is blocked.",
        "높이 차가 D 보다 작아야만 건너갈 수 있어요."),
      question: t(E,
        "Fluffy is on a building of height 10 with D = 3. Which neighbor can Fluffy hop to?",
        "Fluffy 가 높이 10 인 건물에 있고 D = 3 이에요. 어느 이웃으로 건너갈 수 있을까요?"),
      options: [
        t(E, "height 12  (gap 2)", "높이 12  (차이 2)"),
        t(E, "height 7  (gap 3)", "높이 7  (차이 3)"),
        t(E, "height 15  (gap 5)", "높이 15  (차이 5)"),
      ],
      correct: 0,
      explain: t(E,
        "|10 − 12| = 2 < 3, so yes. |10 − 7| = 3 is NOT less than 3 (the rule is strict), and |10 − 15| = 5 is too big. Only height 12 works.",
        "|10 − 12| = 2 는 3 보다 작으니 건너갈 수 있어요. |10 − 7| = 3 은 3 보다 작지 않아서 안 되고, |10 − 15| = 5 는 너무 커요. 높이 12 만 가능해요."),
    },
  ];
}

export function makeMcc20CityTourCh2(E, lang = "py") {
  const w = getMcc20CityTourWalk(E);
  return [
    // 2-1: BFS process stepper — pop a cell, check its 4 neighbors, repeat.
    // (2026-09-26: 여기 있던 느림/빠름 산문 두 박스와 정적 D=2 그림을 걷어냈다 —
    //  선생님 "시뮬로 설명하는 부분도 없고". 그 자리에 과정을 직접 밟는 스테퍼를
    //  넣었다. "왜 스윕 대신 큐" 논증은 다음 쪽 CodeWalk 의 [13,19] 말풍선에
    //  이미 있어 여기서 되풀이하지 않는다.)
    {
      type: "reveal",
      narr: t(E,
        "Pop a cell, check its 4 neighbors, repeat — walk through it yourself.",
        "줄에서 칸을 하나씩 꺼내며 이웃을 확인하는 과정을 직접 밟아봐요."),
      content: (
        <>
          <Mcc20CityTourBfsProcessStepper E={E} />
          <div style={{ padding: "0 16px 14px", fontSize: 12, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "↓ Next page: the same code, section by section.", "↓ 다음 쪽에서 같은 코드를 한 단락씩 봐요.")}
          </div>
        </>
      ),
    },
    // 2-2: code, CodeWalk — bubbles sit on the lines they explain
    {
      type: "reveal",
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang="py" code={w.code} vars={w.vars} beats={w.beats} accent="#d97706" />
      ),
    },
  ];
}
