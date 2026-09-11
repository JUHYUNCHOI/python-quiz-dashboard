import { C, t } from "@/components/quest/theme";
import { getMooHuntSections, getMooHuntWalk } from "./components";
import { getMooHuntFastWalk } from "./fast";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ScoreBoardSim, BitBoardSim, BruteLimitSim, BruteRunSim, FasterIdeaSim, IsAtTableSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooHuntCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Best score on a row of M / O — and how many boards reach it.",
        "M / O 한 줄에서 최고 점수와, 그 점수가 되는 보드 개수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Moo Hunt</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2026 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.7,
              whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
              {/* 2026-09-07 선생님: "난 이거 첫페이지랑 두번째 페이지 읽을떄까지
                  뭘하라는건지 모르겠는데". 원인 — 미션이 아직 정의되지 않은 말
                  ("MOO 가 나온다")에 기대고 있었다. 미션만 읽으면 "MOO 를 여러 번
                  쓰면 되나?" 로 읽힌다. 채점 규칙을 미션 안에서 먼저 말한다. */}
              {t(E,
                "You fill each cell with M or O.\nA list of cell-number trios is given — if a trio reads \"MOO\", that's 1 point.\nFill the board for the highest total: what is it, and how many fillings reach it?",
                "칸마다 M 아니면 O 를 우리가 적어요.\n확인할 칸 번호 세 개짜리 묶음들이 주어지는데, 그 세 칸이 'MOO' 로 읽히면 1점이에요.\n점수가 제일 높게 적으면 몇 점이고, 그렇게 적는 방법이 몇 가지인지 구해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
              {/* 말로만 하면 기호(N·K·x·y·z)뿐이라 그림이 안 그려진다
                  (선생님 2026-09-04: "문제 설명 저거로만으로는 이해가 안가는데").
                  칸 5개짜리 아주 작은 예를 카드 안에서 바로 보여준다. */}
              <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: "1px dashed #fca5a5" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#7f1d1d", marginBottom: 8, wordBreak: "keep-all" }}>
                  {t(E, "For example — 5 cells, and two things to check: (1, 2, 3) and (1, 4, 5).",
                       "예를 들어 — 칸이 5개, 확인할 건 (1, 2, 3) 과 (1, 4, 5) 두 개예요.")}
                  <div style={{ fontWeight: 600, color: "#7f1d1d", marginTop: 5, fontSize: 11.5, lineHeight: 1.7 }}>
                    {t(E, <>That means: read cell 1, cell 2, cell 3 <b>in that order</b>.<br />
                           If those three letters are <b>"MOO"</b> → 1 point. A trio like this is one <b>move</b>.<br />
                           Same for (1, 4, 5). Add them up — that's the board's score.</>,
                         <>1번 · 2번 · 3번 칸의 글자를 <b>이 순서대로</b> 읽어 봐요.<br />
                           그 세 글자가 <b>"MOO"</b> 면 1점. 이런 칸 번호 세 개를 <b>무브</b> 라고 해요.<br />
                           (1, 4, 5) 도 똑같이 읽어요. 둘을 더한 게 그 보드의 점수예요.</>)}
                  </div>
                </div>
                {[
                  /* 2026-09-07: 전엔 무브가 하나뿐이라 최고 점수가 늘 1점이었고,
                     그래서 미션의 "제일 많이" 가 무슨 말인지 안 보였다.
                     같은 5칸인데 채우기에 따라 1점·2점으로 갈리는 두 보드로 바꾼다.
                     (검산: MOOOM → (1,2,3)="MOO" 1점, (1,4,5)="MOM" 0점 → 1점
                             MOOOO → 둘 다 "MOO" → 2점) */
                  { board: "MOOOM", pts: 1, note: t(E, "(1,2,3) → \"MOO\" ✓ · (1,4,5) → \"MOM\" ✗  →  1 point", "(1,2,3) → \"MOO\" ✓ · (1,4,5) → \"MOM\" ✗  →  1점") },
                  { board: "MOOOO", pts: 2, note: t(E, "(1,2,3) → \"MOO\" ✓ · (1,4,5) → \"MOO\" ✓  →  2 points", "(1,2,3) → \"MOO\" ✓ · (1,4,5) → \"MOO\" ✓  →  2점") },
                ].map((r, k) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, width: 74, flexShrink: 0, textAlign: "right" }}>
                      {k === 0 ? t(E, "fill it this way", "이렇게 채우면") : t(E, "or this way", "이렇게 채우면")}
                    </span>
                    <span style={{ display: "flex", gap: 3 }}>
                      {r.board.split("").map((c, i) => (
                        <span key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span style={{ width: 26, height: 26, borderRadius: 6, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13,
                            /* 무브가 (1,2,3)·(1,4,5) 라 5칸이 전부 쓰인다 — 회색 처리하던 4·5번도 살린다 */
                            background: c === "M" ? "#fef2f2" : "#eff6ff",
                            border: `2px solid ${c === "M" ? "#dc2626" : "#2563eb"}`,
                            color: c === "M" ? "#dc2626" : "#2563eb" }}>{c}</span>
                          <span style={{ fontSize: 9, fontWeight: 800, color: "#f59e0b" }}>{i + 1}</span>
                        </span>
                      ))}
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: r.pts ? "#15803d" : "#b91c1c", wordBreak: "keep-all" }}>
                      {r.note}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color: "#7f1d1d", wordBreak: "keep-all", textWrap: "balance" }}>
                  {t(E, "Same 5 cells — but 1 point or 2, depending on how we fill it.\nSo: how should we fill it to score the most?",
                       "같은 5칸인데 어떻게 채우냐에 따라 1점도 되고 2점도 돼요.\n그래서 문제는 이거예요 — 어떻게 채워야 점수가 제일 높을까?")}
                </div>
              </div>

              {/* 규칙은 그림 아래에 짧게. 뜻은 위 그림이 이미 날랐다. */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Board", "보드")}</b>
                  {t(E, " — N cells (3 ≤ N ≤ 20), each 'M' or 'O'. ", " — N 칸 (3 ≤ N ≤ 20), 칸마다 'M' 아니면 'O'. ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "we fill it in", "우리가 채워요")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Moves", "무브")}</b>
                  {t(E, " — K trios of cell numbers (x, y, z), read ", " — 칸 번호 세 개 (x, y, z) 한 묶음. K 개. ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "in that order", "순서대로 읽어요")}</b>
                  {t(E, ". K is up to 200,000. ", ". K 는 최대 200,000. ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "given in the input — we can't change them", "입력으로 주어져요 — 못 바꿔요")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Score", "점수")}</b>
                  {t(E, " — a move scores 1 if its three cells read 'MOO'. The board's score is the total.",
                       " — 무브의 세 칸을 읽어서 'MOO' 면 1점. 다 더한 게 그 보드의 점수.")}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output the best score across all boards,\nthen how many boards reach it.",
                        "출력: 모든 보드 중 최고 점수, 그리고 그 점수에 도달하는 보드 개수.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Sample 1 — two boards tie at 4, so the answer is '4 2'.",
        "샘플 1 이에요. 두 보드가 똑같이 4 점이라 답은 '4 2' 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
            🧪 {t(E, "Sample 1", "샘플 1")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Input</div>
              <div>5 6</div>
              <div>1 2 3</div>
              <div>1 2 3</div>
              <div>1 3 5</div>
              <div>2 3 4</div>
              <div>5 3 2</div>
              <div>5 2 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Output</div>
              <div>4 2</div>
            </div>
          </div>
          {/* 2026-09-07: 입력 형식 설명이 없어서 `5 6` 이 뭔지 알 수가 없었다.
              다른 quest 에는 있는 3박스 카드(mcc19rect2 템플릿)가 여기만 빠져 있었다. */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>First line: <b>N K</b> — cells, then how many moves.<br />Next <b>K</b> lines: one move each — <b>x y z</b>.</>,
                     <>첫 줄: <b>N K</b> — 칸 수, 그리고 무브 개수.<br />다음 <b>K</b> 줄: 무브 하나씩 — <b>x y z</b>.</>)}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>One line: <b>best score</b>, then <b>how many boards</b> reach it.</>,
                     <>한 줄: <b>최고 점수</b>, 그리고 그 점수가 되는 <b>보드 개수</b>.</>)}
              </div>
            </div>
          </div>

          {/* 전엔 "두 보드가 4점" 이라고 결론만 줬다. 왜 4점인지 무브 6개를 하나씩 보여준다. */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, fontSize: 12, color: "#7f1d1d", lineHeight: 1.6, wordBreak: "keep-all" }}>
            {t(E, <>Why is <b>MOOOM</b> worth 4? Read each move on that board:</>,
                 <><b>MOOOM</b> 이 왜 4점일까요? 무브를 하나씩 읽어 봐요:</>)}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
              {[["1 2 3","MOO",true],["1 2 3","MOO",true],["1 3 5","MOM",false],
                ["2 3 4","OOO",false],["5 3 2","MOO",true],["5 2 3","MOO",true]].map(([mv,rd,ok],k)=>(
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
                  <span style={{ color: "#0891b2", fontWeight: 700, width: 46 }}>{mv}</span>
                  <span style={{ color: C.dim }}>→</span>
                  <span style={{ fontWeight: 800, color: ok ? "#15803d" : "#94a3b8" }}>{rd}</span>
                  <span style={{ fontWeight: 800, color: ok ? "#15803d" : "#b91c1c" }}>{ok ? "✓ 1" : "✗ 0"}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fca5a5", fontWeight: 800 }}>
              {t(E, "4 moves read MOO → 4 points.", "네 개가 MOO 로 읽혀요 → 4점.")}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
              {t(E, "One other board also reaches 4 — so the answer is \"4 2\":", "4점이 되는 보드가 하나 더 있어요 — 그래서 답이 \"4 2\" 예요:")}
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#dc2626" }}>
                MOOOM &nbsp; · &nbsp; MOOMM
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-3: Walkthrough on MOOOM
    {
      type: "reveal",
      narr: t(E,
        "Why is MOOOM worth 4? Walk the moves one by one.",
        "MOOOM 이 왜 4 점일까요? 무브를 하나씩 따라가 봐요."),
      content: (<ScoreBoardSim E={E} />),
    },
    /* 1-3b: **"그럼 어떻게 풀까?" 를 여기서 먼저 말한다** (2026-09-07)
       선생님: "다 해보자 다음에 이렇게 하면 문제가 있으니까 어떻게 하자고
       이게 왜 좋은지가 순서 아닌가?"
       전에는 이 선언이 문제 탭 **마지막**(BruteLimitSim 첫 단계)에 있었다. 그래서 그 앞의
       "보드가 몇 개?"(1-4) 와 "무브가 몇 개?"(1-5) 가 **아무도 안 물어본 질문**이 됐다.
       학생이 직접 그렇게 말했다: "이걸 왜 지금 세는지 이 쪽에서는 아직 모름."
       계획을 먼저 세우면, 그 뒤의 세는 일이 전부 "그 계획이 되는지 재보는 것" 이 된다.
       프레이밍은 memory/feedback_solution_framing.md — 결론 통보가 아니라 질문으로 연다. */
    {
      /* ── 결-b 한계: 한 화면 ────────────────────────────────────────
         2026-09-11. 여기 있던 **다섯 쪽**(계획 선언 · 보드 수 퀴즈 · 3×2 워밍업 ·
         무브 수 입력 · 곱하기 시뮬)을 한 쪽으로 줄였다.
         선생님이 **세 번** 말씀하셨다:
           "안된다는걸 앞 페이지에서 엄청 많이 설명하고 막상 어떻게 풀건지는 설명이 부족해"
           "굳이 시간이 오래걸린다는걸 코드까지 보여주고"
           "아직도 오래걸린다는 설명이 앞에 너무 많이 나오는데? **퀴즈도 필요없고.**"
         memory/feedback_why_and_how_over_slowness.md 가 같은 말이다 —
         "한계는 **한 화면이면 충분**하다. 제약 숫자 + 연산량 한 줄.
          아낀 분량을 왜 이 방법이 되나·어떻게 짜나 에 써라."
         아낀 분량은 isAt 다리(새 쪽)로 갔다 — 학생이 거기서 그만뒀다. */
      type: "reveal",
      label: t(E, "Try them all?", "다 해보면?"),
      narr: t(E,
        "Make every board and score each one. Does that finish in time?",
        "보드를 다 만들어 하나씩 채점해요. 시간 안에 끝날까요?"),
      content: (
        <div style={{ padding: 20, wordBreak: "keep-all" }}>
          <div style={{ maxWidth: 470, margin: "0 auto", background: "#fff7ed",
            border: "1.5px solid #fb923c", borderRadius: 12, padding: "14px 16px",
            fontSize: 13, color: "#7c2d12", lineHeight: 1.9, textWrap: "balance" }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>
              {t(E, "Two numbers decide it", "두 수가 정해요")}
            </div>
            <div>
              {t(E, <><b>Boards</b>: each cell is M or O \u2192 <b>2<sup>20</sup> \u2248 1,000,000</b></>,
                   <><b>보드 수</b>: 칸마다 M 아니면 O \u2192 <b>2<sup>20</sup> \u2248 100만</b></>)}
            </div>
            <div>
              {t(E, <><b>Moves per board</b>: (x, y, z) all different \u2192 <b>20\u00d719\u00d718 = 6,840</b></>,
                   <><b>보드당 무브</b>: (x, y, z) 가 모두 다름 \u2192 <b>20\u00d719\u00d718 = 6,840</b></>)}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fdba74", fontWeight: 800 }}>
              {t(E, <>100\u4e07 \u00d7 6,840 \u2248 <b>7\u00d710<sup>9</sup></b></>,
                   <>100만 \u00d7 6,840 \u2248 <b>7\u00d710<sup>9</sup></b> 번</>)}
            </div>
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", background: "#fef2f2",
            border: "1.5px solid #f87171", borderRadius: 12, padding: "12px 16px",
            fontSize: 13, color: "#7f1d1d", lineHeight: 1.9, textWrap: "balance", textAlign: "center" }}>
            {t(E, <>A computer does about <b>a billion simple steps</b> in one second \u2014 that is <b>10<sup>9</sup></b>.<br /><b>7\u00d710<sup>9</sup></b> is <b>seven times</b> more. Let's see it for real.</>,
                 <>컴퓨터는 <b>간단한 계산 10억 번</b>에 1초쯤 걸려요 \u2014 그게 <b>10<sup>9</sup></b> 이에요.<br /><b>7\u00d710<sup>9</sup></b> 은 그보다 <b>일곱 배</b> 많아요. 직접 봐요.</>)}
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMooHuntCh2 (1 step: progressive)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh2(E, lang = "py") {
  const w = getMooHuntWalk(E, lang);
  const fw = getMooHuntFastWalk(E, lang);
  return [
    /* 코드를 읽기 **직전**에 비트 표현을 본다 (2026-09-07 자리 이동).
       전에는 문제 탭 한복판(보드 세기 ↔ 무브 세기 사이)에 있었다. 셋이 따로 보고 다 같은 말을 했다.
         · 기획자: ">> 가 실제로 필요한 건 코드 한 줄뿐인데 네 쪽 앞에서 배우고 방치된다"
         · 수업: "코드를 읽을 때만 필요한 도구가 문제 이해 단계 한가운데 끼어 있다"
         · 학생: "이걸 왜 지금 배우는지 모르겠다"
       선생님: "막상 잘 안쓰는 비트연산자 얘기하다가 갑자기…"
       ⚠️ **분량은 줄이지 않았다.** 학생은 "길다" 가 아니라 **"모자라다"** 고 했다 —
       "이 그림에서는 이렇게 되더라 정도로만 알았다". 그래서 옮기고, 오히려 << 설명을 더했다. */
    {
      type: "reveal",
      label: t(E, "Number = board", "숫자 = 보드"),
      narr: t(E, "Before the code — how does one number become a board?",
                 "코드를 보기 전에요. 숫자 하나가 어떻게 보드가 되죠?"),
      content: (<BitBoardSim E={E} />),
    },
    {
      type: "reveal",
      label: t(E, "Run it", "돌려보기"),
      narr: t(E,
        "Let's actually run it — with your own hand, right here.",
        "정말 그런지 직접 돌려봐요. 여기서 바로요."),
      content: (<BruteRunSim E={E} />),
    },
    /* ── 결-c: 더 빠른 방법 ──────────────────────────────────────────
       pedagogy-reviewer 2026-09-04: "한계까지만 있고 더 빠른 방법이 없다.
       학생 입장에서 배운 게 '실패한 시도' 인지 '정답' 인지 구분이 안 된다."
       usaco.org 공식 답안(cpid 1564)을 가져와 관찰 → 발견 → 코드 순으로. */
    {
      type: "reveal",
      label: t(E, "Fewer checks", "덜 보기"),
      narr: t(E,
        "So — how do we make it faster? Let's look.",
        "그럼 어떻게 하면 더 빨라질까요? 같이 봐요."),
      content: (<FasterIdeaSim E={E} />),
    },
    /* ── 결-c2: 아이디어와 코드 사이의 다리 (2026-09-11 신설) ────────
       student-algorithm 이 **바로 다음 쪽에서 그만뒀다**:
         "isAt[x][a][b] 나오자마자 '이건 나 혼자 못 짜겠다' 는 생각이 들었다.
          앞의 시뮬에서는 'M칸 1개+O칸 2개만 세면 된다' 는 아이디어까지만 봤지,
          그걸 **미리 표로 저장해두는 방법은 코드에서 처음 봤다**."
       선생님(2026-09-11): "막상 어떻게 풀건지는 설명이 부족해."
       project-lead 판정: 쪽수를 맞추려 다른 쪽을 지우지 않는다 —
       quest_problem_standard.md 에 선생님이 "페이지수 상관없어" 라고 박아두셨다. */
    {
      type: "reveal",
      label: t(E, "Count once", "한 번만 세기"),
      narr: t(E,
        "Count the moves once into a table — then never scan them again.",
        "무브를 표에 한 번만 세어 넣으면, 다시 훑을 일이 없어요."),
      content: (<IsAtTableSim E={E} />),
    },
    {
      type: "reveal",
      label: t(E, "Final answer", "최종 답"),
      narr: t(E,
        "The final answer — same result, far less work.",
        "이게 최종 답이에요. 결과는 같고 일은 훨씬 적어요."),
      content: (
        <div>
          <div style={{ margin: "12px 14px 0", background: "#ecfdf5", border: "1.5px solid #34d399",
            borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#065f46",
            lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {"\u2705 "}{t(E,
              "The official solution from usaco.org.\nThe idea is the one you just saw: only 'one M cell + two O cells' can score.\nSame answer as the slow code, but it looks at far fewer moves.",
              "usaco.org 공식 풀이예요.\n방금 본 그 생각이에요: 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐.\n답은 느린 코드와 똑같고, 보는 무브 수만 확 줄어요.")}
          </div>
          {lang === "py" && (
            <div style={{ margin: "10px 16px 0", padding: "9px 13px", borderRadius: 10, background: "#fffbeb",
              border: "1.5px solid #fbbf24", color: "#92400e", fontSize: 12.5, fontWeight: 700,
              lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {t(E,
                <>⚠️ At the biggest case (N = 20, K = 200,000) this takes about <b>69 seconds</b> in Python — the limit is 4. The algorithm is right, so it is great for understanding, but submit in <b>C++</b> for full marks (measured 1.96 s, limit 2).</>,
                <>⚠️ 가장 큰 입력(N = 20, K = 20만)에서 Python 은 약 <b>69초</b> 걸려요 — 제한은 4초예요.<br />생각은 맞으니 이해용으로는 좋지만, 만점은 <b>C++</b> 로 내요 (실측 1.96초, 제한 2초).</>)}
            </div>
          )}
          <CodeWalk E={E} lang={lang} code={fw.code} vars={fw.vars} beats={fw.beats} accent="#059669" />
        </div>
      ),
    },
  ];
}
