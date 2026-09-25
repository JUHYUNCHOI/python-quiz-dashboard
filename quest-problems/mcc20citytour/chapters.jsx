import { C, t } from "@/components/quest/theme";
import { getMcc20CityTourWalk, Mcc20CityTourBfsSim } from "./components";
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
                "Count the cells Fluffy can reach from (1,1), hopping only where |height difference| < D.",
                "높이 차이 < D 인 곳으로만 건너면서, (1,1) 에서 Fluffy 가 도달할 수 있는 칸의 수를 세요.")}
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
                  {t(E, " and may jump to an adjacent cell (up/down/left/right) only if ", " 에서 시작하고, 인접 칸 (상하좌우) 으로는 ")}
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
              <div>• <b>M</b>, <b>N</b> — {t(E, "rows and columns", "행 수와 열 수")}</div>
              <div>• <b>H</b> — {t(E, "the M×N grid of building heights", "M×N 격자에 담긴 건물 높이")}</div>
              <div>• <b>D</b> — {t(E, "the jump threshold", "건너가기 기준값")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {/* 2026-09-17: 세미콜론 3개를 쉼표로. 형제 quest(mcc20kitty:209·mcc20cipher:217)가 쉼표를 쓴다. */}
              {t(E, "Limits: 1 ≤ M, N, M×N ≤ 100000, 1 ≤ D ≤ 100000, −10^6 ≤ H ≤ 10^6.", "제약: 1 ≤ M, N, M×N ≤ 100000, 1 ≤ D ≤ 100000, −10^6 ≤ H ≤ 10^6.")}
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: M = 4, N = 5, D = 5, H = [[1,3,7,9,16], …].\nThe code below starts from those same values — you'll meet input(), which reads lines in, in the 2022 problems.",
                "원문은 M = 4, N = 5, D = 5, H = [[1,3,7,9,16], ...] 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
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
    // 2-1: plan — slow sweep vs fast flood-fill
    {
      type: "reveal",
      narr: t(E,
        "Instead of sweeping the grid over and over, flood-fill visits each cell just once.",
        "격자를 몇 번이고 훑는 대신, 한 번만 훑는 방법을 찾아봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* 2026-09-24: 원문(mcc20citytour.pdf) 이 풀이 절에서 명시적으로 짚는
              흔한 오답 — "이웃과 건널 수 있는가" 만 보면 틀린다. D=2, 4×4 예제는
              원문에 나온 그 예제 그대로다. PM 판정: 새 쪽을 만들지 않고 이 쪽
              (plan) 에 자리를 찾았다. */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
              ⚠️ {t(E, "A common mistake first", "먼저, 흔한 실수 하나를 봐요")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 8, whiteSpace: "pre-line" }}>
              {t(E,
                "The middle four cells below all match each other, so they can hop between themselves.\nBut the border cannot hop into the middle — the gap is 2, and D = 2 needs a gap LESS than D.\nIf Fluffy's home is on the border, the middle four are unreachable, even though they hop fine among themselves.\nChecking \"can this cell hop to some neighbor\" alone would wrongly count them.\nWe have to trace an actual path back to home.",
                "아래 그림에서 가운데 네 칸은 서로 높이가 같아서 건널 수 있어요.\n하지만 테두리에서 가운데로는 못 건너가요 — 차이가 2 인데, D = 2 는 차이가 2 보다 작아야 해요.\nFluffy 의 집이 테두리에 있으면, 가운데 네 칸은 서로 건널 수 있어도 집에서는 갈 수 없어요.\n\"이웃과 건널 수 있는가\" 만 보면 이 네 칸도 답에 넣는 실수를 해요.\n집에서부터 실제로 이어지는 길이 있는지를 봐야 해요.")}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6 }}>
                <div style={{ color: "#8b949e", fontSize: 10.5, marginBottom: 2 }}>D = 2</div>
                <div>10 10 10 10</div>
                <div>10&nbsp;&nbsp;8&nbsp;&nbsp;8 10</div>
                <div>10&nbsp;&nbsp;8&nbsp;&nbsp;8 10</div>
                <div>10 10 10 10</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: sweep the whole grid until nothing changes", "느림: 변화가 없을 때까지 격자 전체를 반복해서 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Up to (M×N) passes × (M×N) cells = 10^5 × 10^5 = 10^10 operations. Times out.", "최대 (M×N) 번 × (M×N) 칸 = 10^5 × 10^5 = 10^10 번 계산해요. 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: flood-fill (BFS) — visit each cell once", "빠름: 플러드필 (BFS) — 각 칸을 한 번만 방문")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Each cell enters the queue once; we check its 4 neighbors once. Total ≈ 4×M×N ≈ 4×10^5.", "각 칸은 큐에 한 번만 들어가고, 이웃 4 개를 한 번씩 확인해요. 모두 합쳐 ≈ 4×M×N ≈ 4×10^5 번이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "The edge rule stays the same: step to a neighbor only if |Δheight| < D.", "건너가기 규칙은 그대로예요. 이웃과 높이 차가 D 보다 작을 때만 건너가요.")}
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
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
