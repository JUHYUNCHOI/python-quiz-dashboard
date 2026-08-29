import { C, t } from "@/components/quest/theme";
import { getMooHuntSections, getMooHuntWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ScoreBoardSim, BruteLimitSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooHuntCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a line of N cells, each holding 'M' or 'O'. She does K taps — each tap picks 3 cells. She scores 1 if those 3 cells spell 'MOO' in order. Find the highest score reachable, and how many boards reach it.",
        "베시는 N 칸짜리 한 줄을 가지고 있어요. 각 칸은 'M' 아니면 'O' 예요.\nK 번 탭을 하는데 매번 세 칸을 골라요.\n그 세 칸이 순서대로 'MOO' 면 1 점이에요.\n받을 수 있는 최고 점수와, 그 점수가 되는 보드 개수를 구해요."),
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
                "Find the highest score any board can reach.\nThen count how many boards reach it.",
                "어떤 보드가 받을 수 있는 최고 점수를 구해요.\n그리고 그 점수가 되는 보드가 몇 개인지도 구해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A row of ", "한 줄에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cells (3 ≤ N ≤ 20)", "N 칸 (3 ≤ N ≤ 20)")}</b>
                  {t(E, " — each one is 'M' or 'O'.", " — 각각 'M' 또는 'O'.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie does ", "베시는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K moves", "K 번의 무브")}</b>
                  {t(E, " (1 ≤ K ≤ 200,000).\nEach move taps three distinct cells (x, y, z) in order.\nThe order matters.",
                        " (1 ≤ K ≤ 200,000) 를 해요.\n무브마다 서로 다른 세 칸 (x, y, z) 를 순서대로 탭해요.\n순서가 중요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She scores when cell ", "득점 조건: 칸 ")}
                  <b style={{ color: "#dc2626" }}>x</b>
                  {t(E, " = 'M', cell ", " = 'M', 칸 ")}
                  <b style={{ color: "#dc2626" }}>y</b>
                  {t(E, " = 'O', cell ", " = 'O', 칸 ")}
                  <b style={{ color: "#dc2626" }}>z</b>
                  {t(E, " = 'O' — spelling 'MOO'.", " = 'O' — 'MOO' 가 되도록.")}
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
        "Look at sample 1: N=5 cells, K=6 moves. Two boards (MOOOM and MOOMM) both score 4 — the answer is '4 2'.",
        "샘플 1 을 봐: N=5 칸, K=6 무브. 보드 MOOOM 과 MOOMM 둘 다 4 점 — 답은 '4 2'."),
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
        "Why does board MOOOM score 4? Let's walk each move on it. M = 'M', O = 'O'. A move (x,y,z) scores when cell x is M and cells y,z are O.",
        "보드 MOOOM 이 왜 4 점일까요?\n무브를 하나씩 따라가 봐요.\n무브 (x,y,z) 는 칸 x 가 M 이고 칸 y, z 가 O 일 때 득점해요."),
      content: (<ScoreBoardSim E={E} />),
    },
    // 1-4: Quiz - bitmask insight
    {
      type: "quiz",
      narr: t(E,
        "Each cell is one of two values (M or O). With N ≤ 20 cells, how many possible boards are there in total?",
        "각 칸은 두 값 중 하나 (M 또는 O). N ≤ 20 칸일 때 가능한 보드는 총 몇 개?"),
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
    // 1-5: NumInput - count distinct triples to dedup
    {
      type: "input",
      narr: t(E,
        "K can be up to 200,000, but the same triple (x,y,z) can repeat.\nHow many distinct ordered triples are possible when N = 20?",
        "K 는 최대 20 만이지만 같은 (x,y,z) 가 반복될 수 있어요.\nN = 20 일 때 서로 다른 삼중쌍은 몇 개일까요?"),
      question: t(E,
        "When N = 20, count distinct ordered triples (x, y, z) with x, y, z all different. Answer = ?",
        "N = 20 일 때 x, y, z 가 모두 다른 순서 있는 (x, y, z) 의 개수 = ?"),
      hint: t(E,
        "Pick x first, then y, then z — each from a shrinking pool.",
        "x 를 먼저, 그 다음 y, 그 다음 z 를 골라봐 — 풀이 줄어들지."),
      answer: 6840,
    },
    // 1-6: 브루트 한계 — 1M 보드 × 6840 삼중쌍 = 7×10⁹ 벽 (배너와 일관). review 2026-08-18.
    {
      type: "reveal",
      narr: t(E,
        "So: build all 1M boards, score each against every distinct triple. Does that finish in time?",
        "그럼: 100만 보드를 다 만들어 각각을 모든 삼중쌍으로 채점. 시간 안에 끝날까?"),
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
        "Read the solution top to bottom — each bubble sits on the lines it explains: group moves, try every board with a bitmask, print best & count.",
        "코드를 위에서 아래로 읽어봐요.\n말풍선이 설명하는 코드 줄에 바로 붙어 있어요.\n무브 묶기 → 비트마스크로 모든 보드 시도 → 최고 점수와 보드 개수 출력."),
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
