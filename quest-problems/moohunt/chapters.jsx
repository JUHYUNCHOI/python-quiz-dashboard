import { C, t } from "@/components/quest/theme";
import { getMooHuntSections, getMooHuntWalk } from "./components";
import { getMooHuntFastWalk } from "./fast";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ScoreBoardSim, BitBoardSim, BruteLimitSim, FasterIdeaSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooHuntCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "M / O 한 줄에서 최고 점수와, 그 점수가 되는 보드 개수를 구해요.",
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
              {t(E,
                "Fill each cell with M or O.\nFill it so \"MOO\" shows up as many times as possible —\nhow many is that, and how many fillings tie for it?",
                "칸마다 M 아니면 O 를 채워요.\n\"MOO\" 가 제일 많이 나오게 채우면 몇 개이고,\n그렇게 채우는 방법이 몇 가지인지 구해요.")}
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
                  {t(E, "For example — 5 cells, and one thing to check: (1, 2, 3).",
                       "예를 들어 — 칸이 5개, 확인할 건 (1, 2, 3) 하나예요.")}
                  <div style={{ fontWeight: 600, color: "#7f1d1d", marginTop: 5, fontSize: 11.5, lineHeight: 1.7 }}>
                    {t(E, <>That means: read cell 1, cell 2, cell 3 <b>in that order</b>.<br />
                           If those three letters are <b>"MOO"</b> → 1 point. A trio like this is one <b>move</b>.</>,
                         <>1번 · 2번 · 3번 칸의 글자를 <b>이 순서대로</b> 읽어 봐요.<br />
                           그 세 글자가 <b>"MOO"</b> 면 1점. 이런 칸 번호 세 개를 <b>무브</b> 라고 해요.</>)}
                  </div>
                </div>
                {[
                  { board: "MOOOM", pts: 1, note: t(E, "reading 1→2→3 gives \"MOO\" → 1 point", "1→2→3 을 읽으면 \"MOO\" → 1점") },
                  { board: "OOOOM", pts: 0, note: t(E, "reading 1→2→3 gives \"OOO\" → 0", "1→2→3 을 읽으면 \"OOO\" → 0점") },
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
                            background: i < 3 ? (c === "M" ? "#fef2f2" : "#eff6ff") : "#f8fafc",
                            border: `${i < 3 ? 2 : 1}px solid ${i < 3 ? (c === "M" ? "#dc2626" : "#2563eb") : "#e2e8f0"}`,
                            color: i < 3 ? (c === "M" ? "#dc2626" : "#2563eb") : "#cbd5e1" }}>{c}</span>
                          <span style={{ fontSize: 9, fontWeight: 800, color: i < 3 ? "#f59e0b" : "#e2e8f0" }}>{i + 1}</span>
                        </span>
                      ))}
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: r.pts ? "#15803d" : "#b91c1c", wordBreak: "keep-all" }}>
                      {r.note}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 800, color: "#7f1d1d", wordBreak: "keep-all", textWrap: "balance" }}>
                  {t(E, "So the question is: how should we fill the board to score the most?",
                       "그래서 문제는 이거예요 — 보드를 어떻게 채워야 점수가 제일 높을까?")}
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
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, fontSize: 12, color: "#7f1d1d", lineHeight: 1.6, wordBreak: "keep-all" }}>
            {t(E, "Two boards reach the max score of 4:", "최고 점수 4 에 도달하는 보드는 두 가지:")}
            <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#dc2626" }}>
              MOOOM &nbsp; · &nbsp; MOOMM
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
    // 1-4: Quiz - bitmask insight
    {
      type: "quiz",
      narr: t(E,
        "How many different boards are there at all?",
        "보드는 애초에 몇 가지나 있을까요?"),
      question: t(E,
        "How many distinct boards exist when N ≤ 20?",
        "N ≤ 20 일 때 서로 다른 보드는 몇 개?"),
      options: [
        t(E, "About 1,000,000 (2^N)", "약 100만 (2^N)"),
        t(E, "About N! — way too many to enumerate", "약 N! — 너무 많아 열거 불가"),
      ],
      correct: 0,
      explain: t(E,
        "Right — 2^20 ≈ 1M. Each cell is just M or O, so a whole board can be written as a single number.\nHow? Next screen.",
        "맞아요. 2^20 ≈ 100 만이에요.\n각 칸이 M 아니면 O 둘 중 하나뿐이라, 보드 하나를 숫자 하나로 적을 수 있어요.\n어떻게요? 다음 화면에서 봐요."),
    },
    /* 1-4b: 숫자 하나 = 보드 하나. student-algorithm 이 직접 풀어보고 막힌 자리 (2026-09-03):
       "1-4 에서 '비트마스크' 단어만 한 번 나오고, 코드에 오니 >> 랑 & 가 뭔지부터 막혔다."
       작은 N=3 으로 숫자 → 2진수 → 칸 을 눈으로 보여준 뒤 >> 와 & 를 그 위에서 설명한다. */
    {
      type: "reveal",
      label: t(E, "One number = one board", "숫자 = 보드"),
      narr: t(E, "But how does one number become a whole board?",
                 "그런데 숫자 하나가 어떻게 보드가 되죠?"),
      content: (<BitBoardSim E={E} />),
    },

    // 1-5: NumInput - count distinct triples to dedup
    {
      type: "input",
      narr: t(E,
        "How many different moves (x, y, z) can there even be?",
        "서로 다른 무브 (x, y, z) 는 몇 개나 있을 수 있을까요?"),
      question: t(E,
        "When N = 20, count distinct ordered triples (x, y, z) with x, y, z all different. Answer = ?",
        "N = 20 일 때, 세 칸이 모두 다른 무브 (x, y, z) 는 몇 개? = ?"),
      hint: t(E,
        "Pick x first, then y, then z — each from a shrinking pool.",
        "x 를 먼저 고르고, 그 다음 y, 그 다음 z 를 골라요. 고를 수 있는 게 하나씩 줄어들어요."),
      answer: 6840,
    },
    // 1-6: 브루트 한계 — 1M 보드 × 6840 무브 = 7×10⁹ 벽 (배너와 일관). review 2026-08-18.
    {
      type: "reveal",
      narr: t(E,
        "So — try all of them. Does that finish in time?",
        "그럼 다 해보면 되겠네요. 시간 안에 끝날까요?"),
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
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Now the code — each bubble sits on the lines it explains.",
        "이제 코드예요. 말풍선이 설명하는 줄에 붙어 있어요."),
      content: (
        <div>
          {/* ⚠️ 이 코드의 한계 — 1페이지(문제 소개)에 있던 걸 코드 보는 자리로 옮김.
              선생님 2026-08-29 검토: 문제를 읽기도 전에 우리 코드 얘기가 나올 자리가 아님. */}
          <div style={{ margin: "12px 14px 0", background: "#fffbeb", border: "1.5px solid #d97706",
            borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#92400e",
            lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {"\u26A0\uFE0F "}{t(E,
              "This is the brute force from the last page.\nIt is correct, and fast enough on the samples.\nAt N = 20 it is too slow — Python only gets partial credit.\nWe fix that on the next two pages.",
              "앞 페이지에서 본 완전탐색 그대로예요.\n답은 맞고 샘플에서는 충분히 빨라요.\nN = 20 에서는 느려요 — 파이썬은 부분 점수를 받아요.\n다음 두 페이지에서 이걸 고쳐요.")}
          </div>
          <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />
        </div>
      ),
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
    {
      type: "reveal",
      label: t(E, "Faster code", "더 빠른 코드"),
      narr: t(E,
        "The official solution — same answer, far less work.",
        "공식 풀이예요. 답은 같고 일은 훨씬 적어요."),
      content: (
        <div>
          <div style={{ margin: "12px 14px 0", background: "#ecfdf5", border: "1.5px solid #34d399",
            borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#065f46",
            lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {"\u2705 "}{t(E,
              "This is the official solution from usaco.org.\nThe idea is the one you just saw: only 'one M cell + two O cells' can score.\nThe answer is identical to the brute force — it just looks at far fewer moves.",
              "usaco.org 공식 풀이예요.\n방금 본 그 생각이에요 — 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이라는 것.\n답은 완전탐색과 똑같아요. 보는 무브 수만 확 줄어요.")}
          </div>
          <CodeWalk E={E} lang={lang} code={fw.code} vars={fw.vars} beats={fw.beats} accent="#059669" />
        </div>
      ),
    },
  ];
}
