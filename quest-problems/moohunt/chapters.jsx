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
      type: "reveal",
      label: t(E, "The plan", "세워보기"),
      narr: t(E, "So — how would we solve this? Let's think.",
                 "그럼 이걸 어떻게 풀면 될까요? 생각해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ maxWidth: 470, margin: "0 auto", background: "#f5f3ff",
            border: "1.5px solid #c4b5fd", borderRadius: 12, padding: "14px 18px",
            fontSize: 13.5, color: "#5b21b6", lineHeight: 1.85, fontWeight: 700,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>The board is ours to fill. So the simplest idea —<br />
                <b>make every possible board</b>, score each one,<br />and keep the best.</>,
              <>보드는 우리가 채우는 거예요. 그러니 제일 쉬운 생각은 —<br />
                <b>가능한 보드를 전부 만들어</b> 하나씩 채점하고,<br />제일 높은 걸 고르는 거예요.</>)}
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", background: "#fffbeb",
            border: "1.5px solid #fbbf24", borderRadius: 12, padding: "12px 18px",
            fontSize: 13, color: "#92400e", lineHeight: 1.85, fontWeight: 700,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>Will that finish in time?<br />
                To know, we need two numbers:<br />
                <b>how many boards</b>, and <b>how many moves</b>.<br />
                Let's count them.</>,
              <>그런데 그게 시간 안에 끝날까요?<br />
                알려면 두 가지를 세야 해요 —<br />
                <b>보드가 몇 개</b>인지, <b>무브가 몇 개</b>인지.<br />
                하나씩 세어봐요.</>)}
          </div>
        </div>
      ),
    },
    // 1-4: Quiz - bitmask insight
    {
      type: "quiz",
      narr: t(E,
        "First number: how many boards are there to make?",
        "첫째 — 만들 보드는 몇 개일까요?"),
      question: t(E,
        "How many distinct boards exist when N ≤ 20?",
        "N ≤ 20 일 때 서로 다른 보드는 몇 개?"),
      options: [
        t(E, "About 1,000,000 (2^N)", "약 100만 (2^N)"),
        t(E, "About N \u00d7 (N\u22121) \u00d7 \u2026 \u00d7 1 \u2014 way too many to enumerate",
             "약 N \u00d7 (N\u22121) \u00d7 \u2026 \u00d7 1 \u2014 너무 많아 열거 불가"),
      ],
      correct: 0,
      explain: t(E,
        "Right — 2^20 ≈ 1M. Each cell is M or O, so the count doubles with every extra cell.",
        "맞아요. 2^20 ≈ 100 만이에요.\n칸마다 M 아니면 O 둘 중 하나라, 칸이 하나 늘 때마다 보드 수가 두 배가 돼요."),
    },
    // 1-5a: 작은 수로 먼저 세어보기 (2026-09-07 추가)
    //   학생: "힌트를 읽고 나서야 겨우 이해했다. 힌트 없이 혼자였으면 못 풀었을 것 같다.
    //          '순서가 있는 조합' 이라는 개념 자체가 처음이라서."
    //          "아주 작은 숫자(3개 중 2개 = 3×2)로 먼저 손으로 세워보게 했으면
    //           20×19×18 이 왜 저렇게 되는지 더 잘 알았을 것 같다."
    //   → 결론(20×19×18)을 묻기 전에, 손으로 다 세어지는 크기를 먼저 보여준다.
    //   검산: 칸 3개에서 서로 다른 두 칸을 순서 있게 = 6가지 = 3×2
    {
      type: "reveal",
      narr: t(E,
        "First, a tiny one you can count on your fingers.",
        "먼저 손으로 다 셀 수 있는 작은 걸로 해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 8, wordBreak: "keep-all" }}>
              {t(E, "Cells 1, 2, 3 — pick two different ones, in order. How many ways?",
                   "칸이 1·2·3 세 개예요. 서로 다른 두 칸을 순서대로 고르면 몇 가지일까요?")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {[["1","2"],["1","3"],["2","1"],["2","3"],["3","1"],["3","2"]].map(([a,bb],k)=>(
                <span key={k} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                  background: "#fff", border: "1.5px solid #93c5fd", color: "#1d4ed8",
                  borderRadius: 8, padding: "4px 10px" }}>({a}, {bb})</span>
              ))}
            </div>
            <div style={{ fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.8, wordBreak: "keep-all" }}>
              {t(E, <>Six. Because the first cell has <b>3</b> choices, and the second has only <b>2</b> left —<br /><b>3 × 2 = 6</b>. Order matters: (1, 2) and (2, 1) are different.</>,
                   <>여섯 가지예요. 첫 칸은 <b>3</b>가지 중에 고르고, 둘째 칸은 <b>2</b>가지만 남으니까 —<br /><b>3 × 2 = 6</b>. 순서가 중요해요. (1, 2) 와 (2, 1) 은 다른 거예요.</>)}
            </div>
          </div>
        </div>),
    },
    // 1-5: NumInput - count distinct triples to dedup
    {
      type: "input",
      narr: t(E,
        "Second number: scoring one board means checking every move. How many?",
        "둘째 — 보드 하나를 채점하려면 무브를 다 봐야 해요. 몇 개죠?"),
      question: t(E,
        "When N = 20, count distinct ordered triples (x, y, z) with x, y, z all different. Answer = ?",
        "N = 20 일 때, 세 칸이 모두 다른 무브 (x, y, z) 는 몇 개? = ?"),
      hint: t(E,
        "Same as the 3 × 2 you just counted — but three cells this time, out of 20.",
        "방금 센 3 × 2 와 똑같아요. 이번엔 칸이 20개고, 고르는 게 세 개예요."),
      answer: 6840,
    },
    // 1-6: 브루트 한계 — 1M 보드 × 6840 무브 = 7×10⁹ 벽 (배너와 일관). review 2026-08-18.
    {
      type: "reveal",
      narr: t(E,
        "Two numbers in hand. Now — is the plan fast enough?",
        "두 수를 다 셌어요. 그럼 그 계획, 시간 안에 될까요?"),
      content: (<BruteLimitSim E={E} />),
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
      label: t(E, "First code (slow)", "첫 코드 (느림)"),
      narr: t(E,
        "The slow plan, as code. This is not the final answer yet.",
        "느린 방법을 코드로 옮겼어요. 아직 최종 답은 아니에요."),
      content: (
        <div>
          {/* ⚠️ 이 코드의 한계 — 1페이지(문제 소개)에 있던 걸 코드 보는 자리로 옮김.
              선생님 2026-08-29 검토: 문제를 읽기도 전에 우리 코드 얘기가 나올 자리가 아님. */}
          <div style={{ margin: "12px 14px 0", background: "#fffbeb", border: "1.5px solid #d97706",
            borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#92400e",
            lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {"\u26A0\uFE0F "}{t(E,
              /* ⚠️ 2026-09-11: 여기에 "7×10⁹" 과 "시간이 모자라요" 를 넣었다가 뺐다.
                 커밋 4c00bbbc(9/7)가 **정확히 그 문장을 지운 자리**다 —
                 "느리다 를 세 번 말하던 걸 한 번으로". 8쪽이 이미 그 말을 한다.
                 이름표·파란 바의 "첫 코드(느림)/최종 답" 은 새 정보라 남긴다. */
              "This is the slow plan, written as code \u2014 not the one to submit yet.\nRead it, run it on the next page, and then we make it fast.",
              "이건 방금 세운 느린 방법을 코드로 옮긴 거예요. 아직 제출할 코드는 아니에요.\n읽어보고, 다음 쪽에서 직접 돌려본 뒤에 빠르게 고쳐요.")}
          </div>
          <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />
        </div>
      ),
    },
    /* ── 결-b: 한계를 **체감** ─────────────────────────────────────
       quest_problem_standard.md:205 "체감하는 느림 (brute 류는 진짜 느려야)".
       전엔 한계가 숫자표뿐이었다 — "7×10⁹" 을 읽어도 얼마나 오래인지는 안 온다.
       그리고 "느리다" 를 코드 보기 전에 두 번, 코드 배너에서 또 한 번 말하고 있었다.
       이제 순서가 이렇다: 계산으로 예측(ch1) → 코드 → **직접 돌려서 확인** → 개선. */
    {
      type: "reveal",
      label: t(E, "Run it", "돌려보기"),
      narr: t(E,
        "Now run that code — with your own hand, right here.",
        "이제 그 코드를 직접 돌려봐요. 여기서 바로요."),
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
