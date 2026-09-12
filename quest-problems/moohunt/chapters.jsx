import { C, t } from "@/components/quest/theme";
import { getMooHuntSections } from "./components";
import { getMooHuntFastWalk } from "./fast";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ScoreBoardSim, EveryBoardSim, FasterIdeaSim, IsAtTableSim, WholeRunSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooHuntCh1 (4 steps — 전부 reveal)
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
                     ⚠️ 2026-09-12: 여기 있던 **MOOOM** 을 MOMOO 로 바꿨다.
                       MOOOM 은 2쪽 공식 샘플에서 **4점**인 보드다. 같은 글자 조합이 1쪽에서 1점,
                       2쪽에서 4점으로 나와 학생이 자기가 잘못 읽었나 헷갈린다(ux 지적).
                       1쪽은 지어낸 무브 두 개, 2쪽은 공식 무브 여섯 개라 둘 다 맞는 계산인데,
                       **왜 다른지 화면에 없다.** 겹치는 이름을 안 쓰는 쪽이 설명 한 줄보다 싸다.
                     (검산: MOMOO → (1,2,3)="MOM" ✗, (1,4,5)="MOO" ✓ → 1점
                             MOOOO → 둘 다 "MOO" ✓ → 2점. 둘 다 공식 정답 보드가 아니다.) */
                  { board: "MOMOO", pts: 1, note: t(E, "(1,2,3) → \"MOM\" ✗ · (1,4,5) → \"MOO\" ✓  →  1 point", "(1,2,3) → \"MOM\" ✗ · (1,4,5) → \"MOO\" ✓  →  1점") },
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
    // 1-3: Walkthrough on MOOMM
    /* ⚠️ 2026-09-12: narr 가 **MOOOM** 이라고 불렀는데 시뮬(ScoreBoardSim)이 그리는 보드는
       **MOOMM** 이다. 2026-09-11 에 중복을 없애려고 시뮬 보드만 바꾸고 narr 를 안 따라가게 뒀다.
       학생은 파란 바를 먼저 읽고 "MOOOM 찾아야지" 하고 보는데 화면엔 MOOMM 이 있다.
       memory/feedback_screen_must_not_rely_on_memory.md — 부르는 것을 눈으로 볼 수 있어야 한다.
       2쪽이 "MOOMM 도 4점" 이라고 **말만 하고 안 보여준** 그 보드다. 그걸 narr 에도 적는다. */
    {
      type: "reveal",
      narr: t(E,
        "MOOMM scores 4 too — the other one. Walk its moves.",
        "MOOMM 도 4 점이에요 — 나머지 한 개요. 무브를 따라가 봐요."),
      content: (<ScoreBoardSim E={E} />),
    },
    /* ── 결-b 한계: 한 화면 ────────────────────────────────────────
       2026-09-11. 여기 있던 **다섯 쪽**(계획 선언 · 보드 수 퀴즈 · 3×2 워밍업 ·
       무브 수 입력 · 곱하기 시뮬)을 한 쪽으로 줄였다. 선생님이 **세 번** 말씀하셨다:
         "안된다는걸 앞 페이지에서 엄청 많이 설명하고 막상 어떻게 풀건지는 설명이 부족해"
         "굳이 시간이 오래걸린다는걸 코드까지 보여주고"
         "아직도 오래걸린다는 설명이 앞에 너무 많이 나오는데? **퀴즈도 필요없고.**"
       memory/feedback_why_and_how_over_slowness.md — 한계는 한 화면이면 충분하다.

       ── 2026-09-12: 여기에 **첫 코드(완전탐색 CodeWalk)를 넣었다가 도로 뺐다.** ──
       전원 검토 3라운드 판정은 "넣는다" 였다(결-a 가 비어 있고, 선생님이 표준에
       "쉬운 코드 단계별" 을 계속 요구하신다고 적어두셨다). 실제로 붙여서 화면을 봤더니
       **그 브루트 코드가 비트마스크를 쓴다** — `for b in range(1 << N)` · `(b >> x) & 1`
       (components.jsx:39,42). 변수 범례에 "b = 보드(비트마스크)" 가 그대로 뜬다.
       ⚠️ 이 세션 내내 한 일이 **최종 코드에서 비트를 걷어낸 것**이었고(선생님 지시,
          제출해서 통과까지 확인), 7쪽은 비트 없이 "리스트에 1 더하기" 로 보드를 만든다.
          그 앞 4쪽에서 비트마스크를 첫 코드로 보여주면 정반대다.
          `count-quests.py --list untaught` 도 moohunt 를 [비트연산] 으로 잡는다 —
          지금까지는 그 코드가 화면에 안 떠서 무해했는데, 띄우는 순간 실물이 된다.
       → **판정을 뒤집는다.** 3라운드는 코드를 열어보지 않고 낸 결론이었다.
          결-a 를 채우려면 **비트 없는 브루트를 새로 써야** 하고, 그건 새 코드라
          QA 와 pedagogy 설계 패스가 필요하다. .claude/WORK.md 항목으로 올린다.
          🔒 components.jsx 의 FULL_PY/FULL_CPP 는 USACO_VERIFIED 라 고칠 수 없다.

       ⚠️ 숫자는 고친 채로 둔다. 전에는 `100만 × 6,840 ≈ 7×10⁹` 이었는데
          실제 완전탐색은 6,840 이 아니라 **입력 K개를 그대로 돈다**
          (components.jsx:41 `for x, y, z in moves:`) → `100만 × 20만 ≈ 2×10¹¹`, 30배 차이.
          6,840 과 그걸 해명하던 각주도 뺐다 — ux·학생이 "K 는 20만이라며 왜 갑자기
          6,840?" 이라고 걸렸던 두 숫자다. 5쪽 시뮬의 기준도 20만으로 맞췄다. */
    {
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
              {t(E, <><b>Boards</b>: each of the <b>N = 20</b> cells is M or O → <b>2<sup>20</sup> ≈ 1,000,000</b></>,
                   <><b>보드 수</b>: 칸 <b>N = 20</b>개가 저마다 M 아니면 O → <b>2<sup>20</sup> ≈ 100만</b></>)}
            </div>
            <div>
              {t(E, <><b>Moves per board</b>: we walk the whole input → <b>K ≤ 200,000</b></>,
                   <><b>보드당 무브</b>: 입력을 통째로 훑어요 → <b>K ≤ 20만</b></>)}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fdba74", fontWeight: 800 }}>
              {t(E, <>1,000,000 × 200,000 ≈ <b>2×10<sup>11</sup></b></>,
                   <>100만 × 20만 ≈ <b>2×10<sup>11</sup></b> 번</>)}
            </div>
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", background: "#fef2f2",
            border: "1.5px solid #f87171", borderRadius: 12, padding: "12px 16px",
            fontSize: 13, color: "#7f1d1d", lineHeight: 1.9, textWrap: "balance", textAlign: "center" }}>
            {t(E, <>A computer does about <b>a billion simple steps</b> in one second — that is <b>10<sup>9</sup></b>.<br />So trying them all does not fit. We need another way.</>,
                 <>컴퓨터는 <b>간단한 계산 10억 번</b>에 1초쯤 걸려요 — 그게 <b>10<sup>9</sup></b> 이에요.<br />그래서 다 해보는 건 안 돼요. 다른 방법이 필요해요.</>)}
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMooHuntCh2 (5 steps — 전부 reveal)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh2(E, lang = "py") {
  /* ⚠️ 2026-09-12: `const w = getMooHuntWalk(E, lang)` 를 지웠다 — 만들어만 놓고
     어디서도 안 쓰는 죽은 변수였고, 검토자가 그걸 보고 "결-a 가 비었다" 를 세 번 지적했다.
     완전탐색 코드는 지금 PDF(getMooHuntSections)에만 있다. 화면에 올리려면
     **비트 없는 판본을 새로 써야** 한다 — .claude/WORK.md 항목. */
  const fw = getMooHuntFastWalk(E, lang);
  return [
    /* ── 2026-09-12: 여기 있던 "돌려보기"(BruteRunSim) 한 쪽을 **지웠다.**
       선생님이 **네 번째로** 같은 말씀을 하셨다:
         "아직도 시간이 오래 걸린다는 설명이 너무 많은것 같은데."
       그 쪽은 학생에게 N 을 고르게 하고 **4초를 기다리게** 한 뒤,
       바로 앞 쪽(1-3b)이 이미 숫자로 말한 것을 다시 말했다 — 같은 말을 두 번 하고
       한 번은 기다리게 하는 구조였다.
       memory/feedback_why_and_how_over_slowness.md: "한계는 **한 화면이면 충분**하다."
       그 한 화면은 1-3b 로 남긴다. 여기서부터는 전부 **왜·어떻게** 다. */
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
      label: t(E, "Every board", "보드 전부"),
      narr: t(E, "Before the code — how do we walk every board without missing one?",
                 "코드를 보기 전에요. 보드를 어떻게 하나도 빠짐없이 만들죠?"),
      content: (<EveryBoardSim E={E} />),
    },
    /* ── 계획: 코드 도는 순서 그대로 답까지 (2026-09-11 신설) ──────
       선생님: "아직 처음부터 차례대로 **코드가 동작하는 순서**정도로
                **어떻게 구할건지 눈에 안보여**"
       조각(한계·아이디어·isAt 표·비트)은 다 있었는데 그것들을 이어
       **답이 나오는 장면**이 없었다.
       memory/usaco_quest_learning_flow.md 의 "계획" 단계가 이 자리다 —
       이해 → 이해확인 → 전략 → 브루트한계 → 재전략 → **계획** → 코드.
       애들이 계획을 건너뛰고 코드로 점프하는 걸 막으려고 있는 단계다. */
    {
      type: "reveal",
      label: t(E, "The plan", "짜는 순서"),
      narr: t(E,
        "Before the code — walk the whole thing once, in the order it runs.",
        "코드 보기 전에 — 도는 순서 그대로 한 번 끝까지 따라가 봐요."),
      content: (<WholeRunSim E={E} />),
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
            {"✅ "}{t(E,
              "The official solution from usaco.org.\nThe idea is the one you just saw: only 'one M cell + two O cells' can score.\nStill every board — just far fewer moves per board.",
              "usaco.org 공식 풀이예요.\n방금 본 그 생각이에요: 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐.\n보드를 다 해보는 건 똑같은데, 보드마다 보는 무브 수가 확 줄어요.")}
          </div>
          {lang === "py" && (
            <div style={{ margin: "10px 16px 0", padding: "9px 13px", borderRadius: 10, background: "#fffbeb",
              border: "1.5px solid #fbbf24", color: "#92400e", fontSize: 12.5, fontWeight: 700,
              lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {/* ⚠️ 이 두 숫자는 **지금 실린 코드**(비트 없는 판본)를 잰 값이어야 한다.
                     2026-09-12 감사에서 걸렸다 — "1.96초" 는 비트 쓰던 옛 판본 값이라
                     지금 코드가 실제보다 아슬아슬해 보였다.
                     오늘 실측(cpp-qa, N=20·K=20만): C++ 1.49초 · Python 104초.
                     USACO_VERIFICATION.md 는 다른 기계에서 C++ 1.43~1.44초.
                     기계마다 갈리니 화면에는 **약** 을 붙인 값으로 쓴다. */}
              {t(E,
                <>⚠️ At the biggest case (N = 20, K = 200,000) this takes about <b>100 seconds</b> in Python — the limit is 4. The algorithm is right, so it is great for understanding, but submit in <b>C++</b> for full marks (measured about 1.5 s, limit 2).</>,
                <>⚠️ 가장 큰 입력(N = 20, K = 20만)에서 Python 은 약 <b>100초</b> 걸려요 — 제한은 4초예요.<br />생각은 맞으니 이해용으로는 좋지만, 만점은 <b>C++</b> 로 내요 (실측 약 1.5초, 제한 2초).</>)}
            </div>
          )}
          <CodeWalk E={E} lang={lang} code={fw.code} vars={fw.vars} beats={fw.beats} accent="#059669" />
        </div>
      ),
    },
  ];
}
