import { C, t } from "@/components/quest/theme";
import { getStallingSections, StallingAssignmentSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows and N stalls each have a height limit — count the ways to match them one-to-one.",
        "소 N 마리는 저마다 키가 있고, 축사 N 개는 저마다 들어갈 수 있는 키 제한이 있어요.\n축사 하나에는 소 한 마리만 들어가요.\n소의 키가 그 축사의 제한보다 크지 않아야 들어갈 수 있어요.\n소를 축사에 한 마리씩 넣는 방법이 몇 가지인지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Just Stalling</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of valid one-to-one cow ↔ stall assignments.",
                "소를 축사에 한 마리씩 넣는 방법이\n모두 몇 가지인지 세어서 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, " (each with a height) and ", "와 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N stalls", "N개 축사")}</b>
                  {t(E, " (each with a maximum height limit).",
                        " 가 있어요.\n소는 저마다 키가 있고, 축사는 저마다 키 제한이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each stall holds ", "축사 하나에는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "at most one cow", "소를 한 마리까지만")}</b>
                  {t(E, ", and a cow fits only if her height ≤ the stall limit.",
                        " 넣을 수 있어요.\n소의 키가 그 축사의 제한보다 크지 않아야 들어가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of valid one-to-one assignments", "소를 축사에 한 마리씩 넣는 방법의 가짓수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <StallingAssignmentSim E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1085) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then the cow heights, then the stall limits.",
        "입력은 N 다음에 키, 제한 배열로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows, number of stalls", "— 소의 수, 축사의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>a[0] a[1] ... a[N-1]</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— each cow's height", "— 소들의 키")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>b[0] b[1] ... b[N-1]</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— each stall's height limit", "— 축사들의 키 제한")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The number of valid one-to-one cow ↔ stall assignments.",
                  "소를 축사에 한 마리씩 넣는 방법의 가짓수를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 20</div>
              <div>1 ≤ a[i], b[i] ≤ 10⁹ {t(E, "(= 1 billion)", "(= 10억)")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "the answer may need a 64-bit integer", "답이 커서 64비트 정수가 필요할 수 있어요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Cows have heights [1,2] and stalls have limits [2,2]. How many valid arrangements?", "소의 키가 [1, 2] 이고 축사 제한이 [2, 2] 예요. 방법은 몇 가지일까요?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?",
        "소의 키는 [1, 2], 축사 제한은 [2, 2] 예요.\n소를 넣는 방법은 몇 가지일까요?"),
      options: [
        t(E, "2 (both cows fit in both stalls)", "2 가지 (두 소 다 두 축사에 들어가요)"),
        t(E, "1 (only one way)", "1 가지 (한 가지밖에 없어요)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Start with the taller cow 2 (height 2): both stalls fit her, so 2 choices. Cow 1 (height 1) then has only the one remaining stall, so 1 choice. 2 x 1 = 2 arrangements.",
        "맞아요. 키가 큰 소 2 (키 2) 부터 넣어 봐요.\n축사 두 곳 다 들어갈 수 있으니 고를 곳이 2 군데예요.\n그러면 소 1 (키 1) 에게는 남은 축사 한 곳뿐이라 1 가지예요.\n그래서 2 × 1 = 2 가지예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Cows: [1,2], Stalls: [2,2]. How many valid arrangements?", "소의 키는 [1, 2], 축사 제한은 [2, 2] 예요. 방법은 몇 가지일까요?"),
      question: t(E,
        "Cows: [1,2], Stalls: [2,2]. Number of valid arrangements?",
        "소의 키는 [1, 2], 축사 제한은 [2, 2] 예요.\n넣는 방법은 몇 가지일까요?"),
      hint: t(E,
        "Process the tallest cow first and multiply available choices.",
        "키가 제일 큰 소부터 넣으면서\n그때그때 고를 수 있는 축사 수를 곱해 보세요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeStallingCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort cows and stalls, then place the tallest cow first.",
        "소와 축사를 작은 것부터 줄 세워요.\n키가 제일 큰 소부터 넣는데, 제한이 자기 키 이상인 축사면 다 들어갈 수 있어요.\n그다음 소는 키가 더 작아서 들어갈 수 있는 축사가 더 많지만\n큰 소가 이미 쓴 축사는 빼야 해요.\n아래에서 코드를 한 부분씩 쌓아 갈게요."),
      sections: getStallingSections(E),
    },
  ];
}
