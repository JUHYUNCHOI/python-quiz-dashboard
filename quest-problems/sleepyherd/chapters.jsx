import { C, t } from "@/components/quest/theme";
import { getSleepyHerdSections, SleepyHerdSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "How many moves to line up the three cows?",
        "세 소가 나란히 붙을 때까지 몇 번 옮기게 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude34"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Sleepy Cow Herding</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the MIN and MAX moves to make the three cow positions consecutive integers.",
                "세 소가 연속한 정수 자리에 놓일 때까지 걸리는 이동 횟수의 최솟값과 최댓값을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#d97706" }}>{t(E, "3 cows at distinct integer positions", "서로 다른 정수 위치의 3마리 소")}</b>
                  {t(E, " on a number line.", " 가 수직선에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: take one of the ", "한 번 옮길 때는 양 끝에 있는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two endpoint cows", "두 소 중 한 마리")}</b>
                  {t(E, " and place her at any unoccupied integer ", "를 골라서 다른 두 소 사이의 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "STRICTLY BETWEEN the other two", "비어있는 자리")}</b>
                  {t(E, ".", "에 놓아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "all three positions become CONSECUTIVE integers", "세 소의 위치가 연속한 정수가 되도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MIN and MAX possible number of moves", "이동 횟수의 최솟값과 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <SleepyHerdSim E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 (시즌 표준 — photoshoot25 형태). ⚠️ PDF 원문 없음(public/problems/ 에
    // sleepyherd.pdf 없음) — CONSTRAINTS(제약 숫자) 는 원문으로 확인 못해 넣지 않음.
    // 아래 샘플은 1-2 퀴즈/1-3 입력 스텝과 같은 [4,7,9] 예제를 그대로 재사용하고,
    // 🔒 검증된 FULL_PY 로직으로 직접 돌려 "1, 2" 를 확인함.
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? One line — the three positions.",
        "입력은 한 줄 — 세 소의 위치예요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>p₁ p₂ p₃</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the 3 cow positions, one line", "— 소 3마리의 위치, 한 줄")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "Two lines: the minimum moves, then the maximum moves.",
                  "두 줄: 최소 이동 횟수, 그 다음 최대 이동 횟수.")}
            </div>
          </div>
          {/* 샘플 — 1-2 퀴즈와 같은 [4,7,9] 예제, 실제 코드로 검증함 */}
          <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 10, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "SAMPLE", "샘플")}</div>
            <div>{`4 7 9`}</div>
            <div style={{ color: "#15803d", marginTop: 4 }}>{"→ "}<span style={{ whiteSpace: "pre" }}>{`1\n2`}</span></div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Positions [4, 7, 9]. Move 4 to 8, getting [7, 8, 9]. How many moves was that?", "[4, 7, 9] 를 나란히 만들려면 몇 번 옮겨야 할까요?"),
      question: t(E,
        "Positions [4,7,9]. Min moves to make consecutive?",
        "[4,7,9] 를 연속으로 만드는 최소 이동 횟수는 몇 번일까요?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "7 and 9 are 2 apart, so there is exactly one empty spot between them: 8. Move the endpoint cow at 4 into it and you get [7,8,9] — consecutive in just 1 move.",
        "7 과 9 사이 간격이 2 라서 그 사이에 빈 자리가 딱 하나 있어요. 바로 8 이에요. 끝에 있는 4 를 거기로 옮기면 [7,8,9] 가 되니까 한 번이면 끝나요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For positions [4,7,9], what is the minimum number of moves?", "[4,7,9] 에서 최소 이동 횟수는 몇 번일까요?"),
      question: t(E,
        "Positions [4,7,9]. Minimum moves?",
        "[4,7,9] 의 최소 이동 횟수는 몇 번일까요?"),
      hint: t(E,
        "Look at the gaps — can one move land an endpoint into the slot?",
        "간격을 봐요. 한 번에 끝점 소를 빈 자리에 넣을 수 있을까요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort them and look at the two gaps.",
        "정렬해서 두 간격을 보면 답이 나와요."),
      sections: getSleepyHerdSections(E),
    },
  ];
}
