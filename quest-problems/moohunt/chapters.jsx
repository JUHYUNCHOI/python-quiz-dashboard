import { C, t } from "@/components/quest/theme";
import { getMooHuntSections, getMooHuntWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ScoreBoardSim, BitBoardSim, BruteLimitSim } from "./sims";

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
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "The moves are fixed. YOU choose the board.\nPick the best board — what score does it get,\nand how many boards tie for it?",
                "무브는 정해져 있어요. 보드는 내가 골라요.\n제일 좋은 보드를 골랐을 때 몇 점인지,\n그리고 그 점수가 나오는 보드가 몇 개인지 구해요.")}
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
                  {t(E, "For example — 5 cells, and just one move (1, 2, 3):",
                       "예를 들어 — 칸이 5개, 무브는 (1, 2, 3) 하나뿐이라고 해봐요.")}
                </div>
                {[
                  { board: "MOOOM", pts: 1, note: t(E, "cells 1·2·3 read M O O → scores", "1·2·3번 칸이 M O O → 1점") },
                  { board: "OOOOM", pts: 0, note: t(E, "cells 1·2·3 read O O O → no", "1·2·3번 칸이 O O O → 0점") },
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
                  {t(E, " — K of them (1 ≤ K ≤ 200,000), each naming three cells (x, y, z). ",
                       " — K 개 (1 ≤ K ≤ 200,000), 각각 세 칸 (x, y, z) 를 가리켜요. ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "given in the input — we can't change them", "입력으로 주어져요 — 못 바꿔요")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Score", "점수")}</b>
                  {t(E, " — a move scores 1 if its three cells read 'MOO'. The board's score is the total.",
                       " — 무브가 가리키는 세 칸이 'MOO' 면 그 무브가 1점. 다 더한 게 보드 점수.")}
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
        t(E, "About 1,000,000 (2^N) — representable with a bitmask", "약 100만 (2^N) — 비트마스크로 표현"),
        t(E, "About N! — way too many to enumerate", "약 N! — 너무 많아 열거 불가"),
      ],
      correct: 0,
      explain: t(E,
        "Right! 2^20 ≈ 1M. Each cell is M or O — a binary choice, perfect for a bitmask, so one number defines a whole board. Enumerating them is fine — but scoring each board still costs work (next).",
        "맞아요. 2^20 ≈ 100 만이에요.\n각 칸이 M 아니면 O 라 비트마스크로 보드 하나를 숫자 하나로 표현할 수 있어요.\n보드를 다 훑는 건 괜찮아요.\n그런데 보드마다 점수를 매기는 비용이 남았어요."),
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
        "K can be 200,000 — but the same (x,y,z) repeats. Same triple, same check. So how many are really different?",
        "K 는 20만까지 가는데 같은 (x,y,z) 가 여러 번 나와요.\n같은 삼중쌍이면 검사도 똑같으니 한 번만 세면 돼요.\n그럼 진짜 서로 다른 건 몇 개일까요?"),
      question: t(E,
        "When N = 20, count distinct ordered triples (x, y, z) with x, y, z all different. Answer = ?",
        "N = 20 일 때 x, y, z 가 모두 다른 순서 있는 (x, y, z) 의 개수 = ?"),
      hint: t(E,
        "Pick x first, then y, then z — each from a shrinking pool.",
        "x 를 먼저 고르고, 그 다음 y, 그 다음 z 를 골라요. 고를 수 있는 게 하나씩 줄어들어요."),
      answer: 6840,
    },
    // 1-6: 브루트 한계 — 1M 보드 × 6840 삼중쌍 = 7×10⁹ 벽 (배너와 일관). review 2026-08-18.
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
              "This is the brute force from the last page.\nIt is correct, and it is fast enough on the samples.\nAt N = 20 the C++ version still passes.\nPython runs out of time there and gets partial credit.",
              "앞 페이지에서 본 완전탐색 그대로예요.\n답은 맞고 샘플에서는 충분히 빨라요.\nN = 20 에서도 C++ 은 통과해요.\n파이썬은 시간이 모자라 부분 점수를 받아요.")}
          </div>
          <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />
        </div>
      ),
    },
  ];
}
