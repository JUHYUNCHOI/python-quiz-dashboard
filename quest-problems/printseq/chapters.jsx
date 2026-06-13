import { C, t } from "@/components/quest/theme";
import { getPrintseqSections, PrintseqExplorer } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makePrintseqCh1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Bessie writes simple programs with two statements: PRINT c (output c) and REP o (repeat block o times). Given a target sequence and budget K, can the sequence be produced using AT MOST K PRINT statements? (REPs are unlimited.)",
        "Bessie 의 단순 언어: PRINT c (c 출력) + REP o (블록 o 번 반복). 목표 수열과 예산 K 가 주어졌을 때 PRINT 를 K 개 이하로 써서 수열을 만들 수 있을까? (REP 는 무제한.)"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🖨️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#16a34a" }}>Printing Sequences</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #3</div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#15803d", marginBottom: 8 }}>
              📖 {t(E, "The mini-language", "미니 언어")}
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #86efac", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ marginBottom: 6 }}>
                <code style={{ background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>PRINT c</code>
                {t(E, " — append integer c to the output.", " — 정수 c 를 출력에 추가.")}
              </div>
              <div>
                <code style={{ background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>REP o</code>
                <code style={{ marginLeft: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>(...)</code>
                <code style={{ marginLeft: 4, background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>END</code>
                {t(E, " — execute the inner block o times.", " — 내부 블록을 o 번 실행.")}
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E, "Given a target sequence of N positive integers (each ≤ K), decide if Bessie can write a program producing exactly that sequence using ", "양의 정수 N 개 수열 (각 ≤ K) 이 주어졌을 때, ")}
              <b style={{ color: "#15803d" }}>{t(E, "at most K", "K 개 이하")}</b>
              {t(E, " PRINT statements (REPs unlimited). Output \"YES\" or \"NO\".",
                    "의 PRINT 로 수열을 정확히 출력하는 프로그램을 짤 수 있는지 (REP 는 무제한). \"YES\" 또는 \"NO\" 출력.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 8, fontSize: 11.5, color: "#065f46", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 100</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ K ≤ 3</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 100</code>{" "}
              ({t(E, "test cases", "테스트 케이스")})
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O. */
    {
      type: "reveal",
      narr: t(E,
        "Sample: K=1 with sequence [1] → 1 PRINT does it. K=1 with [1,1,1,1] → REP 4 wrapping a single PRINT 1 still uses ONE PRINT.",
        "샘플: K=1 + [1] → PRINT 1 개로 끝. K=1 + [1,1,1,1] → REP 4 안에 PRINT 1 → PRINT 한 개로 충분."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
1 1
1
4 1
1 1 1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`YES
YES`}
              </div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <div><b>Case 1:</b> N=1, K=1, seq=[1]. {t(E, "Program: ", "프로그램: ")}<code>PRINT 1</code>. {t(E, "1 PRINT used. YES.", "PRINT 1 개. YES.")}</div>
              <div style={{ marginTop: 6 }}><b>Case 2:</b> N=4, K=1, seq=[1,1,1,1]. {t(E, "Program: ", "프로그램: ")}<code>REP 4 PRINT 1 END</code>. {t(E, "Still 1 PRINT (the REP just multiplies). YES.", "여전히 PRINT 1 개 (REP 는 그냥 반복). YES.")}</div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #86efac", fontSize: 11.5, color: "#065f46" }}>
              {t(E, "Key idea: REPs do NOT cost any PRINT. Wrapping a 1-PRINT block in any tower of REPs is still 1 PRINT.",
                    "핵심: REP 는 PRINT 비용 0. PRINT 1 개 블록을 REP 로 아무리 감싸도 PRINT 는 그대로 1.")}
            </div>
          </div>
        </div>),
    },

    /* 1-2b — Discover the three shapes.  Three tiny sequences reveal that
       every sequence is one of: all-same (A), repeated block (B), or must be
       split (C).  This is WHERE the A/B/C trichotomy comes from — derived,
       not asserted later in the code chapter. */
    {
      type: "reveal",
      narr: t(E,
        "Look at three tiny sequences. Each one forces a different move: copy one value, repeat a whole block, or CUT in two. Every sequence ends up being one of these three shapes.",
        "작은 수열 세 개를 보자. 각각 다른 수를 강제해 — 값 하나 복사, 블록 통째로 반복, 둘로 자르기. 모든 수열은 결국 이 세 모양 중 하나야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            🔎 {t(E, "Three sequences, three shapes", "수열 셋, 모양 셋")}
          </div>

          {/* Shape A */}
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <code style={{ background: "#dcfce7", padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>[2, 2, 2]</code>
              <span style={{ fontSize: 12, color: "#15803d", fontWeight: 600 }}>{t(E, "all the same", "전부 같음")}</span>
              <span style={{ fontSize: 11, color: C.dim }}>→ {t(E, "shape A: uniform", "모양 A: 균일")}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>REP 3 (PRINT 2) END</code>
              {"  →  "}
              <b style={{ color: "#15803d" }}>{t(E, "1 PRINT", "PRINT 1 개")}</b>
            </div>
          </div>

          {/* Shape B */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <code style={{ background: "#dbeafe", padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>[1, 2, 1, 2]</code>
              <span style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>{t(E, "block [1,2] twice", "[1,2] 블록 두 번")}</span>
              <span style={{ fontSize: 11, color: C.dim }}>→ {t(E, "shape B: repeated block", "모양 B: 블록 반복")}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>REP 2 (PRINT 1; PRINT 2) END</code>
              {"  →  "}
              <b style={{ color: "#1d4ed8" }}>{t(E, "2 PRINTs", "PRINT 2 개")}</b>
            </div>
          </div>

          {/* Shape C */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <code style={{ background: "#fee2e2", padding: "2px 8px", borderRadius: 4, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>[1, 1, 2, 2]</code>
              <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 600 }}>{t(E, "neither — must cut", "둘 다 아님 — 잘라야 함")}</span>
              <span style={{ fontSize: 11, color: C.dim }}>→ {t(E, "shape C: split", "모양 C: 쪼개기")}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>[1,1]</code>
              {" | "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>[2,2]</code>
              {"  →  "}
              {t(E, "each its own sub-program, ", "각각 하위 프로그램, ")}
              <b style={{ color: "#b91c1c" }}>{t(E, "split the budget", "예산 나누기")}</b>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Not uniform (1≠2), and not one block repeated cleanly. The only move left is to cut it in two and solve each side.",
                    "균일하지도 않고 (1≠2), 한 블록이 깔끔히 반복되지도 않아. 남은 수는 둘로 자르고 각 쪽을 푸는 것뿐.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 10, padding: 12, fontSize: 12, color: "#065f46", lineHeight: 1.65 }}>
            🎯 {t(E,
              "Every sequence is one of three shapes — all-same, a repeated block, or it must be split. That's why the code checks exactly A, B, C.",
              "모든 수열은 세 모양 중 하나 — 다 같거나, 블록 반복이거나, 쪼개야 하거나. 그래서 코드가 정확히 A, B, C 를 검사하는 거야.")}
          </div>
        </div>),
    },

    /* 1-2c — Follow-up: name the shape. */
    {
      type: "quiz",
      narr: t(E,
        "Three shapes: all-same (A), repeated block (B), or split (C). Which one is this?",
        "세 모양: 다 같음(A), 블록 반복(B), 쪼개기(C). 이건 어느 것?"),
      question: t(E,
        "Which shape is [3, 3, 1, 1]?",
        "[3, 3, 1, 1] 은 어느 모양?"),
      options: [
        t(E, "A — all the same", "A — 다 같음"),
        t(E, "B — one block repeated", "B — 한 블록 반복"),
        t(E, "C — must be split", "C — 쪼개야 함"),
      ],
      correct: 2,
      explain: t(E,
        "3≠1 so not uniform (A), and [3,3,1,1] isn't one block repeated (B). Cut into [3,3] | [1,1] and solve each — shape C, split.",
        "3≠1 이라 균일(A) 아니고, [3,3,1,1] 은 한 블록 반복(B) 도 아냐. [3,3] | [1,1] 로 잘라 각각 풀기 — 모양 C, 쪼개기."),
    },

    /* 1-3 — Explorer simulator. */
    {
      type: "reveal",
      narr: t(E,
        "Try a few sequences and budgets. The explorer runs the recursive checker and shows YES/NO. Use it to build intuition for what K=1, K=2, K=3 can express.",
        "수열과 예산을 바꿔보세요. 재귀 체커가 YES/NO 를 알려줘요. K=1, 2, 3 이 각각 어떤 수열을 만들 수 있는지 감 잡기."),
      content: (<PrintseqExplorer E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      type: "quiz",
      narr: t(E,
        "K=1 means only one distinct value (in any quantity). K=2 lets you have at most two PRINTs.",
        "K=1 은 한 가지 값만 (개수 무관). K=2 는 PRINT 2 개까지."),
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
      type: "input",
      narr: t(E,
        "Try writing a program for this — can you make it within the budget?",
        "이거 직접 프로그램 짜 봐 — 예산 안에 가능?"),
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
    /* 2-1..2-N — sections.  No empty "plan" placeholder; the first
       section's narration introduces the recursive checker. */
    ...getPrintseqSections(E).map((sec, i) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr: i === 0
        ? t(E,
            "Three patterns from the explorer: (A) all-equal → 1 PRINT, (B) repeated blocks → REP, (C) split.  Code the recursive checker that tries each.",
            "explorer 에서 본 세 패턴: (A) 다 같으면 PRINT 1, (B) 블록 반복이면 REP, (C) 쪼개기. 이 셋을 다 시도하는 재귀 체커를 짜자.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
