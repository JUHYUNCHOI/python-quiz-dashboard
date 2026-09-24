import { C, t } from "@/components/quest/theme";
import { getMcc15ChocoSections, Mcc15ChocoStackSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 죽은 복제본이었다. 화면이 쓰는 살아 있는 코드는 components.jsx 의 FULL_PY /
   FULL_CPP 다. 둘을 같이 두면 조용히 어긋나고, 다음 사람이 이쪽을 고치느라 시간을 쓴다.
   형제 quest mcc15isthmus 가 같은 이유로 먼저 지웠다. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A row of chocolate bars — how much can we take away?",
        "초콜릿 바 한 줄에서 얼마나 가져갈 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf6b"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Chocolate Bars</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Print the total length of chocolate removed by repeatedly popping adjacent equal-size pairs.", "인접한 같은 크기의 짝을 반복해서 제거한 초콜릿 총 길이를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A row of ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N chocolate bars with sizes a[1..N]", "N 개 초콜릿 바, 크기는 각각 a[i]")}</b>
                  {t(E, ".", " 가 한 줄에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeatedly remove ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent pairs of equal-size bars", "같은 크기의 인접한 두 바")}</b>
                  {t(E, " — after removal, the remaining bars become adjacent and may form new equal pairs.",
                        " 를 반복해서 제거해요. 제거하고 나면 남은 바들이 붙어서 새 짝이 생길 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL length of chocolate removed", "제거한 초콜릿 총 길이")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "What the input and the output look like.",
        "입력과 출력이 어떤 모양인지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#faf5ff", border: "1px solid #d8b4fe", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1 — ", "1번째 줄 — ")}<b>N</b>{t(E, ", the number of chocolate bars", ", 초콜릿 바의 개수")}</div>
              <div>• {t(E, "line 2 — ", "2번째 줄 — ")}<b>N</b>{t(E, " lengths L₁ … Lₙ", " 개의 길이 L₁ … Lₙ")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 1,000,000 · 1 ≤ Lᵢ ≤ 1,000,000. (About 50% of the points use N ≤ 10,000.)",
                    "조건은 1 ≤ N ≤ 1,000,000 이고 1 ≤ Lᵢ ≤ 1,000,000 이에요.\n채점 문제 중에는 N 이 10,000 을 넘지 않는 작은 것도 있어요.\n거기서만 맞아도 점수의 절반쯤은 받아요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>8 <span style={{ fontSize: 10.5, color: "#8b949e" }}>← {t(E, "N (bars)", "N (바 개수)")}</span></div>
              <div style={{ overflowX: "auto" }}>3 4 4 5 9 9 5 2 <span style={{ fontSize: 10.5, color: "#8b949e" }}>← {t(E, "bar lengths", "바 길이")}</span></div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>36 <span style={{ fontSize: 10.5, color: "#8b949e", fontWeight: 400 }}>← {t(E, "total length removed", "제거한 총 길이")}</span></div>
            </div>
          </div>

          {/* 2026-09-17: 여기 있던 "공식 풀이 과정"(+8 / +18 / +10 = 36, 그리고 "두 5는
             9를 가져간 뒤에야 만났다") 을 지웠다. 형식 쪽이 답과 이유를 먼저 말해 버려서
             뒤의 세 쪽(시뮬·퀴즈·직접 풀기)이 확인 작업이 되고 있었다.
             형식 쪽은 형식만 — 풀어 보는 건 1-3 시뮬과 1-4 퀴즈 몫이다. */}
        </div>),
    },
    // 1-3: Stack walkthrough sim (bilingual, step-by-step)
    {
      type: "reveal",
      narr: t(E,
        "Now the same example one bar at a time, using a stack.",
        "짝을 못 찾은 바를 쌓아두는 '스택' 으로 따라가 봐요."),
      content: <Mcc15ChocoStackSim E={E} />,
    },
    // 1-4: Quiz — the chain reaction
    {
      type: "quiz",
      narr: t(E,
        "One moment from that walkthrough is worth a second look.",
        "방금 본 장면 하나를 다시 짚어 볼게요."),
      question: t(E,
        "In [3, 4, 4, 5, 9, 9, 5, 2], the two 5s are not next to each other at the start. Why can they still be taken?",
        "[3, 4, 4, 5, 9, 9, 5, 2] 에서 5 와 5 는 처음엔 붙어 있지 않아요.\n그런데 왜 가져갈 수 있을까요?"),
      options: [
        t(E, "Once the 9s between them are taken, the gap closes and the 5s become adjacent.",
             "사이에 있던 9 두 개를 가져가면 빈틈이 메워져서 5 와 5 가 붙어요."),
        t(E, "Bars of equal length can always be taken, adjacent or not.",
             "길이가 같으면 붙어 있든 말든 언제나 가져갈 수 있어요."),
        t(E, "Because 5 is smaller than 9, so shorter bars get taken first.",
             "5 가 9 보다 작아서, 짧은 바부터 먼저 가져가요."),
      ],
      correct: 0,
      explain: t(E,
        "Taking a pair closes the gap, so bars that were far apart can become neighbours. That is why we cannot just count equal pairs once — new pairs keep appearing.",
        "짝을 가져가면 빈틈이 메워져서, 멀리 있던 바가 이웃이 될 수 있어요. 그래서 같은 길이 짝을 한 번 세는 걸로는 안 돼요 — 새 짝이 계속 생기니까요."),
    },
    // 1-5: numeric check on the official sample
    {
      type: "input",
      // 2026-09-17: 예전엔 공식 샘플의 답 36 을 그대로 다시 물었다. 그 값은 앞 쪽
      // 출력 칸에 이미 있어서 문제가 아니었다. 처음 보는 줄로 바꿨다.
      narr: t(E,
        "Now try a row you have not seen yet.",
        "이번엔 처음 보는 줄로 직접 해봐요."),
      question: t(E,
        "Bars [1, 4, 4, 1, 5]. Total length taken = ?",
        "바 [1, 4, 4, 1, 5]. 가져간 총 길이 = ?"),
      hint: t(E,
        "Take the 4s first — then the two 1s become neighbours. A pair is worth 2 × its length.",
        "4 와 4 를 먼저 가져가면 1 과 1 이 이웃이 돼요.\n짝 하나는 길이의 2 배만큼이에요."),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh2(E, lang = "py") {
  return [
    // 2-1: plan — why re-scanning is too slow, and what the stack replaces
    {
      type: "reveal",
      narr: t(E,
        "Why is the obvious way too slow?",
        "쉽게 떠오르는 방법은 왜 느릴까요?"),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: find a pair, remove it, scan the row again", "느림: 짝 찾고 → 지우고 → 줄을 처음부터 다시 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Removing a pair can create a new one, so we go back to the start every time. With N up to 1,000,000 that is up to about N × N — far too slow.",
                      "짝을 지우면 새 짝이 생길 수 있으니 매번 처음으로 돌아가요. N 이 최대 1,000,000 이라 최악 N × N 에 가까워요 — 너무 느려요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: park the unmatched bars on a stack", "빠름: 짝 못 찾은 바를 스택에 세워두기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "The stack keeps exactly the bars that still have no partner, so its top is always the current left neighbour. When a pair leaves, the next bar down becomes the top on its own — the chain reaction happens for free. One pass, N steps.",
                      "스택에는 아직 짝 없는 바만 남으니, 맨 위가 늘 지금의 왼쪽 이웃이에요. 짝이 빠지면 그 아래 바가 저절로 맨 위가 돼요 — 연쇄가 공짜로 처리돼요. 한 번만 훑으면 끝, N 번.")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6 }}>
            {t(E, "One thing worth asking: the problem wants the MAXIMUM, so is grabbing every pair as soon as we see it really safe? Taking a pair never destroys another pair — it only closes a gap, which can create more. Checking every possible removal order by brute force on small rows gives the same answer as this greedy scan.",
                  "한 가지만 짚고 갈게요.\n문제는 '가장 많이' 를 물어요. 보이는 짝을 바로 가져가도 괜찮을까요?\n짝을 가져간다고 다른 짝이 사라지지는 않아요.\n빈틈이 메워지면서 오히려 새 짝이 생겨요.\n짧은 줄로 모든 순서를 다 해봐도 이 방법과 답이 같아요.")}
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the code, section by section.", "↓ 다음 쪽에서 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc15ChocoSections(E),
    },
  ];
}
