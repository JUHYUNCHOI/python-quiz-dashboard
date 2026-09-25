import { C, t } from "@/components/quest/theme";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A log of milk records comes in for seven cows. Who has the second-lowest total?",
"소 일곱 마리의 우유 기록이 들어와요.\n총 우유량이 두 번째로 적은 소는 누구일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udd5b"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Don't Be Last!</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the cow with the second-lowest total milk, or 'Tie' if multiple cows tie for second.",
                "총 우유량이 두 번째로 적은 소의 이름을 출력해요. 그 자리에 여러 마리가 함께 있으면 'Tie' 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "7 named cows", "이름이 정해진 7마리 소")}</b>
                  {t(E, " — Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta.",
                        " — Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given a ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "log of N entries", "N개의 기록")}</b>
                  {t(E, " — each entry: a cow name and a gallon amount she produced that time.",
                        "이 주어져요. 기록 하나에는 소 이름과, 그때 짠 갤런 수가 적혀 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows not in the log are treated as having ", "기록에 없는 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "0 gallons total", "총 생산량 0")}</b>
                  {t(E, ".", "으로 취급해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "총 생산량이 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "name of the cow whose total is second-lowest", "두 번째로 적은 소의 이름")}</b>
                  {t(E, " — or ", "을 출력해요. 두 번째 자리가 동률이면 ")}
                  <b style={{ color: "#dc2626" }}>'Tie'</b>
                  {t(E, " if 2+ cows tie for second.", " 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=687) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  The log length, then the log's own entries.",
        "입력은 기록 개수 다음에 기록들로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of log entries", "— 기록 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>name amount</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— cow name, milk from one session", "— 소 이름, 그 한 번의 우유량")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The name of the cow with the second-lowest total — or 'Tie' if it's not unique.",
                  "총 생산량이 두 번째로 적은 소의 이름을 출력해요. 동률이면 'Tie' 를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each entry's amount is a positive integer, at most 100", "기록 하나의 양은 1 ~ 100 사이 정수예요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Only Bessie produces 5; the other six produce 0. The second-lowest distinct value is 5.", "Bessie 만 5 를 짜고 나머지 6마리는 0 이에요.\n서로 다른 값 중 두 번째로 작은 값은 5 예요."),
      question: t(E,
        "6 cows produce 0, Bessie produces 5. Who is second-lowest?",
        "6마리는 0, Bessie 는 5 예요. 두 번째로 적은 소는 누구일까요?"),
      options: [
        t(E, "Tie (6 cows at 0)", "Tie — 0 인 소가 6마리라서"),
        t(E, "Bessie", "Bessie (Bessie)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Min=0, second distinct value=5. Only Bessie has 5, so the answer is Bessie.",
        "맞아요! 가장 작은 값은 0 이고, 서로 다른 값 중 두 번째는 5 예요.\n5 를 가진 소가 Bessie 한 마리뿐이라 답은 Bessie 예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "The problem always uses exactly 7 named cows. How many cows are there in total?", "이 문제에서는 항상 정확히 7마리의 이름 있는 소를 사용해요. 총 몇 마리예요?"),
      question: t(E,
        "How many named cows are in this problem?",
        "이 문제에서 이름 있는 소는 모두 몇 마리일까요?"),
      hint: t(E,
        "Re-read the problem statement — count the listed cow names.",
        "문제를 다시 읽어 보고, 적힌 소 이름의 수를 세어 봐요."),
      answer: 7,
    },
    // 1-4: Interactive sim — milk-log playground
    {
      type: "sim",
      narr: t(E,
        "Change each cow's total and watch the ranking sort itself. 'Second-lowest' means the second distinct value.",
        "각 소의 총량을 바꿔 보면 순위가 저절로 정렬돼요.\n'두 번째로 적음' 은 서로 다른 값 중 두 번째를 뜻해요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "dbl-codewalk",
      narr: t(E,
        "The solution code, start to finish — toggle Python ↔ C++ via the header.",
        "풀이 코드를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
