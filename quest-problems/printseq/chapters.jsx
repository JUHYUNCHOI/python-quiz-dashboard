import { C, t } from "@/components/quest/theme";
import { getPrintseqSections, getPrintseqWalk, PrintseqExplorer } from "./components";
import { PrintseqIntroSim, PrintseqShapesSim, PrintseqPlanSim, PrintseqBlockSim } from "./sims";
import { CodeSectionView } from "@/components/quest/CodeSectionView";
import { CodeWalk } from "@/components/quest/CodeWalk";

export function makePrintseqCh1(E) {
  return [
    /* ── 단계 스크린 ①: 문제 이해 (선생님 2026-07-16: 배너 말고 화면으로 "지금 뭘 하는 단계") */
    { phase: 1, type: "phase" },

    /* 1-1 — 스텝별 인트로 시뮬 (선생님 2026-07-13: "눈이 말풍선을 따라가며 보게 해달라니까").
       텍스트 벽 → SimNav 로 목표→N→K→명령→질문→나이브→REP→YES 8 스텝. */
    {
      phase: 1,
      type: "reveal",
      narr: t(E,
        "Bessie's printer has only 2 commands — and a strict budget K. What exactly is K counting? Let's see.",
        "Bessie 의 프린터엔 명령이 2 개뿐 — 그리고 깐깐한 예산 K 가 있어요. K 가 정확히 '뭘' 세는 걸까요?"),
      content: (
        <div>
          <div style={{ textAlign: "center", padding: "10px 16px 0" }}>
            <div style={{ fontSize: 30, marginBottom: 2 }}>🖨️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#16a34a" }}>Printing Sequences</div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 2 }}>USACO Feb 2025 Bronze #3</div>
          </div>
          <PrintseqIntroSim E={E} />
        </div>),
    },

    /* 1-2 — Sample I/O with labeled callouts (선생님 2026-07-13: "K? 어떻게 입력되는데?"). */
    {
      phase: 1,
      type: "reveal",
      narr: t(E,
        "Now the real input file. Each line has a label bubble — read top to bottom and you'll see where N, K, and the target live.",
        "이제 진짜 입력 파일이에요. 줄마다 말풍선 라벨을 달아뒀으니 위에서 아래로 읽으면 N, K, 목표가 어디 있는지 보여요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — what each number means", "샘플 1 — 각 숫자가 뭘 뜻하는지")}
          </div>

          {(() => {
            const mono = "'JetBrains Mono',monospace";
            const chip = { fontFamily: mono, fontSize: 13, color: "#7c2d12", background: "#fffbeb", padding: "5px 10px", borderRadius: 4, whiteSpace: "pre", border: "1px solid #fde68a", display: "inline-block", fontWeight: 700 };
            const note = { fontSize: 12, color: "#92400e", lineHeight: 1.6, wordBreak: "keep-all", flex: 1 };
            const outChip = { fontFamily: mono, fontSize: 13, color: "#166534", background: "#f0fdf4", padding: "4px 12px", borderRadius: 4, border: "1px solid #bbf7d0", minWidth: 44, textAlign: "center", fontWeight: 700 };
            const outNote = { fontSize: 12, color: "#166534", lineHeight: 1.6, wordBreak: "keep-all", flex: 1 };
            return (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginBottom: 12 }}>
                {/* INPUT — labeled */}
                <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 10, letterSpacing: 0.3 }}>{t(E, "INPUT", "입력")}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={chip}>2</div>
                    <div style={note}>💬 {t(E, <><b>T = 2</b> — 2 test cases to solve</>, <><b>T = 2</b> — 테스트 케이스 2 개</>)}</div>
                  </div>

                  <div style={{ marginBottom: 6, fontSize: 10.5, fontWeight: 700, color: "#7c2d12", opacity: 0.75 }}>
                    ─── {t(E, "Test 1", "1번째 케이스")} ───
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={chip}>1 1</div>
                    <div style={note}>💬 {t(E, <><b>N = 1</b> (target has 1 number), <b>K = 1</b> (only 1 PRINT allowed)</>, <><b>N = 1</b> (목표 수열 길이 1), <b>K = 1</b> (PRINT 최대 1 개)</>)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={chip}>1</div>
                    <div style={note}>💬 {t(E, <>target sequence = <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: mono }}>[1]</code></>, <>목표 수열 = <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: mono }}>[1]</code></>)}</div>
                  </div>

                  <div style={{ marginBottom: 6, fontSize: 10.5, fontWeight: 700, color: "#7c2d12", opacity: 0.75 }}>
                    ─── {t(E, "Test 2", "2번째 케이스")} ───
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={chip}>4 1</div>
                    <div style={note}>💬 {t(E, <><b>N = 4</b>, <b>K = 1</b> (target has 4 numbers, still only 1 PRINT)</>, <><b>N = 4</b>, <b>K = 1</b> (목표 4 개, PRINT 여전히 1 개까지)</>)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={chip}>1 1 1 1</div>
                    <div style={note}>💬 {t(E, <>target = <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: mono }}>[1, 1, 1, 1]</code></>, <>목표 = <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: mono }}>[1, 1, 1, 1]</code></>)}</div>
                  </div>
                </div>

                {/* OUTPUT — labeled */}
                <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 10, letterSpacing: 0.3 }}>{t(E, "OUTPUT (one line per test)", "출력 (케이스당 한 줄)")}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={outChip}>YES</div>
                    <div style={outNote}>{t(E, <>Test 1: <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>PRINT 1</code> → uses 1 PRINT ≤ K = 1 ✓</>, <>1번째: <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>PRINT 1</code> → PRINT 1 개 ≤ K = 1 ✓</>)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={outChip}>YES</div>
                    <div style={outNote}>{t(E, <>Test 2: <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>REP 4 (PRINT 1) END</code> → still uses only 1 PRINT ≤ K = 1 ✓</>, <>2번째: <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>REP 4 (PRINT 1) END</code> → PRINT 여전히 1 개 ≤ K = 1 ✓</>)}</div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#155e75", lineHeight: 1.7, wordBreak: "keep-all" }}>
            💡 <b>{t(E, "So what's K?", "그래서 K 가 뭐냐면?")}</b>{" "}
            {t(E,
              <>K is the <b>PRINT budget</b> — the max number of PRINT lines allowed in the program. REP is free, so wrapping a 1-PRINT block in <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>REP 100</code> still costs only 1 PRINT.</>,
              <>K = <b>PRINT 예산</b>. 프로그램에 쓸 수 있는 PRINT 줄 수의 상한. REP 는 공짜라서, PRINT 1 개짜리 블록을 <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>REP 100</code> 로 감싸도 PRINT 는 여전히 1 개.</>)}
          </div>

          <div style={{ marginTop: 8, padding: "8px 10px", background: "#fffbeb", border: "1px dashed #fcd34d", borderRadius: 8, fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
            📐 <b>{t(E, "Limits", "제약")}:</b>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 100</code>,{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ K ≤ 3</code>,{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 100</code>
          </div>
        </div>),
    },

    /* ── 단계 스크린 ②: 이해 확인 (요령을 직접 찾아보며) */
    { phase: 2, type: "phase" },

    /* 1-2b — 세 모양 발견: 스텝 시뮬 (선생님 2026-07-13: 텍스트 벽 → 한 수열씩 눈으로 따라가기). */
    {
      phase: 2,
      type: "reveal",
      narr: t(E,
        "Three tiny sequences, one at a time. For each: how would YOU build it? The trick is different each time.",
        "작은 수열 세 개를 하나씩 봐요. 각각 '나라면 어떻게 만들까?' — 요령이 매번 달라요."),
      content: (<PrintseqShapesSim E={E} />),
    },

    /* 1-2c — Follow-up: name the shape. */
    {
      phase: 2,
      type: "quiz",
      narr: t(E,
        "Your turn! A new sequence — which of the three tricks fits?",
        "이번엔 직접! 새 수열이에요 — 방금 배운 세 요령 중 어느 게 통할까요?"),
      question: t(E,
        "Which trick fits [3, 3, 1, 1]?",
        "[3, 3, 1, 1] 은 어느 요령으로 만들까?"),
      options: [
        t(E, "① all same", "① 다 같음"),
        t(E, "② repeating block", "② 블록 반복"),
        t(E, "③ cut in two", "③ 둘로 자르기"),
      ],
      correct: 2,
      explain: t(E,
        "All same? No (3≠1). One block repeating? No — (3 3) then (1 1) are different. So cut: [3 3] ✂️ [1 1] — each piece is all-same. Trick ③!",
        "다 같나? 아니요 (3≠1). 블록 반복? 아니요 — (3 3) 다음 (1 1), 서로 달라요. 그러니 자르기: [3 3] ✂️ [1 1] — 조각마다 '다 같음'이 돼요. ③번 요령!"),
    },

    /* 1-3 — Explorer simulator. */
    {
      phase: 2,
      type: "reveal",
      narr: t(E,
        "Playground time — pick a sequence and a budget K, and see YES or NO instantly. Try to find one that's NO with K=2 but YES with K=3!",
        "놀이터 시간 — 수열과 예산 K 를 골라보면 YES/NO 가 바로 떠요. K=2 로는 NO 인데 K=3 이면 YES 가 되는 수열을 찾아보세요!"),
      content: (<PrintseqExplorer E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      phase: 2,
      type: "quiz",
      narr: t(E,
        "Quiz — remember, REP is free. Count only the PRINTs you'd have to write.",
        "퀴즈 — REP 는 공짜인 거 기억하죠? 써야 하는 PRINT 개수만 세면 돼요."),
      question: t(E,
        "Can [1, 2, 1, 2, 1, 2] be produced with K=2?",
        "[1, 2, 1, 2, 1, 2] 를 K=2 로 만들 수 있을까?"),
      options: [
        t(E, "YES — REP 3 (PRINT 1; PRINT 2)", "YES — REP 3 (PRINT 1; PRINT 2)"),
        t(E, "NO — needs 3 PRINTs", "NO — PRINT 3 개 필요"),
      ],
      correct: 0,
      explain: t(E,
        "REP 3 wrapping PRINT 1 followed by PRINT 2 produces (1,2)(1,2)(1,2) using exactly 2 PRINTs. YES.",
        "PRINT 1; PRINT 2 를 REP 3 로 감싸면 (1,2)(1,2)(1,2) — PRINT 정확히 2 개. YES."),
    },

    /* 1-5 — Input quiz: student tries to write a program for [1,1,2,2] with K=2.
       Hint nudges toward "split into blocks" without giving the program. */
    {
      phase: 2,
      type: "input",
      narr: t(E,
        "Last one — imagine the program in your head first, then answer. (Hint: we solved this exact sequence in the shapes sim!)",
        "마지막! 머릿속으로 프로그램을 먼저 그려보고 답하세요. (힌트: 아까 모양 시뮬에서 똑같은 수열을 풀었어요!)"),
      question: t(E,
        "Can [1, 1, 2, 2] be produced with K=2?  (1 = YES, 0 = NO)",
        "[1, 1, 2, 2] 를 K=2 로 만들 수 있을까? (1 = YES, 0 = NO)"),
      hint: t(E,
        "[1, 1, 2, 2] = two blocks of identical values stuck together.  Can REP help with each block?",
        "[1, 1, 2, 2] = 같은 값 블록 두 개. 각 블록에 REP 가 도움이 될까?"),
      answer: 1,
    },
  ];
}

export function makePrintseqCh2(E, lang = "py") {
  return [
    /* ── 단계 스크린 ⑥: 계획 (코드 짜기 전에 어떻게 풀지) */
    { phase: 6, type: "phase" },

    /* 2-0 — 계획 시뮬: 코드 적기 전에 can() 이 뭘 할지 트리로 한 단계씩
       (선생님 2026-07-13: "코드를 보여주기 전에 어떻게 하겠다는걸 시뮬로"). */
    {
      phase: 4,
      type: "reveal",
      narr: t(E,
        "Before any code — watch the plan run on [1 1 2 2] with budget 2. One function, three tricks, and a question that calls itself.",
        "코드보다 계획 먼저 — [1 1 2 2] 에 예산 2 로 계획이 어떻게 돌아가는지 봐요. 함수 하나, 요령 셋, 그리고 자기 자신을 다시 부르는 질문."),
      content: (<PrintseqPlanSim E={E} />),
    },

    /* 2-0b — 블록 반복 탐지 시뮬: 요령②의 추상 코드를 구체 숫자로
       (선생님 2026-07-13: "저 코드가 머릿속에서 안 그려짐"). */
    {
      phase: 6,
      type: "reveal",
      narr: t(E,
        "Trick ② in the code looked abstract — let's SEE it: try block sizes on 1 2 1 2 1 2 and find the repeat.",
        "요령 ② 코드가 추상적이었죠 — 눈으로 봐요: 1 2 1 2 1 2 에 블록 크기를 바꿔가며 반복을 찾아요."),
      content: (<PrintseqBlockSim E={E} />),
    },

    /* ── 단계 스크린 ⑦: 코드 짜기 */
    { phase: 7, type: "phase" },

    /* 2-1 — 코드 워크: 전체 코드 위를 '한 조각씩 밝히며' 걷기.
       설명 말풍선이 밝아진 줄 바로 위에 붙어서 건너뛸 수 없음
       (선생님 2026-07-13: "코드 위에 설명을 안 읽게 되더라"). */
    {
      phase: 7,
      type: "reveal",
      /* narr 없음 — CodeWalk 안 말풍선이 그 역할 (중복 바 제거로 세로 공간 확보). */
      narr: "",
      content: (<CodeWalk E={E} lang={lang} {...getPrintseqWalk(E, lang)} accent="#16a34a" />),
    },
  ];
}
