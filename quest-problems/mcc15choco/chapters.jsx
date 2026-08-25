import { C, t } from "@/components/quest/theme";
import { getMcc15ChocoSections, Mcc15ChocoStackSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "bars = list(map(int, input().split()))",
  "",
  "stack = []      # 아직 짝을 못 찾은 바들",
  "total = 0       # 지금까지 가져간 초콜릿 길이",
  "",
  "for bar in bars:",
  "    if stack and stack[-1] == bar:",
  "        # 맨 위 바와 길이가 같아요 → 둘을 가져가요",
  "        total += 2 * bar",
  "        stack.pop()",
  "    else:",
  "        stack.append(bar)",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15ChocoCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A row of N chocolate bars with sizes a[1..N]. You can repeatedly remove ADJACENT pairs of equal-size bars (after removal, the remaining bars become adjacent).\nPrint the TOTAL chocolate length removed.",
        "N 개 초콜릿 바가 한 줄에 있고, 크기는 각각 a[i] 예요. 같은 크기의 인접한 두 바를 반복해서 제거할 수 있어요 (제거 후 남은 바가 인접하게 돼요).\n제거한 초콜릿 총 길이를 출력해요."),
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
                        " 를 반복해서 제거 — 제거 후 남은 바들이 인접해 새로운 짝이 생길 수 있음.")}
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
        "Read the input format and the official example. Notice how removing the 9s lets the two 5s meet — that chain reaction is the whole problem.",
        "입력 형식과 공식 예제를 봐요. 9 두 개를 가져가면 5 와 5 가 만나요 — 이 연쇄가 이 문제의 전부예요."),
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
                    "제약: 1 ≤ N ≤ 1,000,000 · 1 ≤ Lᵢ ≤ 1,000,000. (배점의 약 50% 는 N ≤ 10,000.)")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>8</div>
              <div style={{ overflowX: "auto" }}>3 4 4 5 9 9 5 2</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>36</div>
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "10px 12px", ...KA }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "the official walkthrough", "공식 풀이 과정")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.75, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>3 <b style={{ color: "#7c3aed" }}>4 4</b> 5 9 9 5 2 &nbsp;→&nbsp; +8</div>
              <div>3 5 <b style={{ color: "#7c3aed" }}>9 9</b> 5 2 &nbsp;→&nbsp; +18</div>
              <div>3 <b style={{ color: "#7c3aed" }}>5 5</b> 2 &nbsp;→&nbsp; +10</div>
              <div>3 2 &nbsp;→&nbsp; {t(E, "no pair left", "더 이상 짝 없음")}</div>
            </div>
            <div style={{ fontSize: 12, color: "#5b21b6", marginTop: 8, lineHeight: 1.6 }}>
              {t(E, "8 + 18 + 10 = 36. The two 5s were never adjacent at the start — they only met after the 9s were taken.",
                    "8 + 18 + 10 = 36. 처음엔 5 와 5 가 붙어 있지 않았어요. 9 두 개를 가져간 뒤에야 만났어요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Stack walkthrough sim (bilingual, step-by-step)
    {
      type: "reveal",
      narr: t(E,
        "Now the same example one bar at a time. Bars with no partner yet are parked on a stack; the top of the stack is always the current left neighbour.",
        "이제 같은 예제를 한 바씩 따라가요. 아직 짝을 못 찾은 바는 스택에 세워두고, 스택 맨 위가 늘 지금의 왼쪽 이웃이에요."),
      content: <Mcc15ChocoStackSim E={E} />,
    },
    // 1-4: Quiz — the chain reaction
    {
      type: "quiz",
      narr: t(E,
        "In [3, 4, 4, 5, 9, 9, 5, 2], why can the two 5s be taken even though they are not next to each other at the start?",
        "[3, 4, 4, 5, 9, 9, 5, 2] 에서, 처음엔 붙어 있지도 않은 5 와 5 를 왜 가져갈 수 있을까요?"),
      question: t(E,
        "Why can the two 5s be taken?",
        "5 와 5 를 왜 가져갈 수 있을까요?"),
      options: [
        t(E, "Once the 9s between them are taken, the gap closes and the 5s become adjacent.",
             "사이에 있던 9 두 개를 가져가면 빈틈이 메워져서 5 와 5 가 붙어요."),
        t(E, "Bars of equal length can always be taken, adjacent or not.",
             "길이가 같으면 붙어 있든 말든 언제나 가져갈 수 있어요."),
        t(E, "Because 5 is smaller than 9.",
             "5 가 9 보다 작아서요."),
      ],
      correct: 0,
      explain: t(E,
        "Taking a pair closes the gap, so bars that were far apart can become neighbours. That is why we cannot just count equal pairs once — new pairs keep appearing.",
        "짝을 가져가면 빈틈이 메워져서, 멀리 있던 바가 이웃이 될 수 있어요. 그래서 같은 길이 짝을 한 번 세는 걸로는 안 돼요 — 새 짝이 계속 생기니까요."),
    },
    // 1-5: numeric check on the official sample
    {
      type: "input",
      narr: t(E,
        "For the official sample [3, 4, 4, 5, 9, 9, 5, 2], what is the total length taken?",
        "공식 샘플 [3, 4, 4, 5, 9, 9, 5, 2] 에서 가져간 총 길이는?"),
      question: t(E,
        "Bars [3,4,4,5,9,9,5,2]. Total length taken = ?",
        "바 [3,4,4,5,9,9,5,2]. 가져간 총 길이 = ?"),
      hint: t(E,
        "Three pairs are taken: (4,4), (9,9), (5,5). Each pair is worth 2 × its length.",
        "짝을 세 번 가져가요: (4,4), (9,9), (5,5). 각 짝은 2 × 길이만큼이에요."),
      answer: 36,
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
        "The obvious way is to scan the row for a pair, remove it, and start over. That re-scan is what makes it slow. The stack does the same thing without ever going back.",
        "떠오르는 방법은 줄을 훑어 짝을 찾고, 지우고, 처음부터 다시 훑는 거예요. 이 '다시 훑기' 가 느림의 원인이에요. 스택은 되돌아가지 않고 같은 일을 해요."),
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
                  "한 가지 짚고 갈 것: 문제는 '최대' 를 물어요. 보이는 짝을 바로 가져가도 정말 괜찮을까요? 짝을 가져가면 다른 짝이 사라지지 않아요 — 빈틈만 메워지고, 오히려 새 짝이 생겨요. 작은 줄에 대해 가능한 모든 제거 순서를 전부 시도해 봐도, 이 방법과 답이 같아요.")}
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
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
