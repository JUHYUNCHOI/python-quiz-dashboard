import { C, t } from "@/components/quest/theme";
import { getMcc22LampSections } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   VERIFIED SOLUTION CODE (sample → 2, 0/500 brute mismatches)
   Summed triangular brightness: count integer x with total >= k.
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   title+mission+problem → input+sample → concept sim → quiz
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Count the integer positions where the total brightness of all lamps is at least k.",
        "총 밝기가 k 이상인 정수 위치는 몇 개일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"💡"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8b5cf6" }}>Lamp</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P6</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {/* 2026-09-17: k 가 무엇인지 한 번도 안 밝히고 미션에 썼다. 입력이 준다는 것부터. */}
              {t(E,
                "The input gives you a threshold k. Count the integer positions where the lamps' total brightness reaches k.",
                "입력이 기준값 k 를 줘요. 램프들의 총 밝기가 k 이상인 정수 위치가 몇 개인지 세요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {/* 2026-09-17: 괄호가 읽는 순서를 끊고 있었다 ("램프(밝기 b)는").
                      그리고 한 칸 멀어질 때마다 1 씩 줄어든다는 말이 빠져서,
                      학생이 |p − x| 를 혼자 해석해야 했다. */}
                  {t(E, "A lamp at position ", "위치 ")}
                  <b style={{ color: "#8b5cf6" }}>p</b>
                  {t(E, " has brightness ", " 에 밝기 ")}
                  <b style={{ color: "#7c3aed" }}>b</b>
                  {t(E, ". It is brightest right under itself and fades by 1 every step away, so at position x it shines ", " 인 램프가 있어요. 바로 아래가 제일 밝고 한 칸 멀어질 때마다 1 씩 약해져요. 그래서 위치 x 에서는 ")}
                  <b style={{ color: "#7c3aed" }}>max(0, b − |p − x|)</b>
                  {t(E, " — a triangular \"tent\".", " 만큼 밝아요 — 삼각형 \"텐트\" 모양이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The total brightness at x is the ", "위치 x 의 총 밝기는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "sum over all lamps", "모든 램프의 밝기 합")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of integer positions x where the total brightness is ≥ k", "총 밝기가 k 이상인 정수 위치 x 의 개수")}</b>
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
        "Read the input format and the official example. Positions p are strictly increasing; the answer counts x with total brightness ≥ k.",
        "입력 형식과 공식 예제를 함께 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 수")}</div>
              <div>• {t(E, "each test: ", "각 테스트: ")}<b>n k</b> {t(E, "(lamp count, threshold)", "(램프 수, 기준값)")}</div>
              <div>• <b>p₁ … pₙ</b> — {t(E, "positions (strictly increasing)", "위치 (오름차순)")}</div>
              <div>• <b>b₁ … bₙ</b> — {t(E, "brightnesses", "밝기")}</div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
              {t(E,
                "Limits: T ≤ 2×10^5, n ≤ 2×10^5 (n added up over all test cases ≤ 10^5), k ≤ 10^18, |p| ≤ 10^12, b ≤ 10^12.",
                "제약: T ≤ 2×10^5, n ≤ 2×10^5 (모든 테스트케이스의 n 을 더한 값 ≤ 10^5), k ≤ 10^18, |p| ≤ 10^12, b ≤ 10^12.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>1</div>
              <div>4 6</div>
              <div style={{ overflowX: "auto" }}>-5 -3 0 7</div>
              <div style={{ overflowX: "auto" }}>3 2 6 1</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>2</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {/* 2026-09-17: 6 이 무엇인지 안 밝히고 썼다 — 둘째 줄 "4 6" 의 k 다. */}
            {t(E,
              "In this example the threshold k is 6. Only x = −3 and x = 0 reach a total brightness of 6 or more, so the answer is 2. The next page lets you try it yourself.",
              "이 예제는 기준값 k 가 6 이에요. 총 밝기가 6 이상인 곳은 x = −3 과 x = 0 뿐이라 답은 2 예요. 다음 쪽에서 직접 만져 봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim (rendered by the App via type "deepAuditSim")
    {
      type: "deepAuditSim",
      narr: t(E,
        "Change k and each lamp's b, and see where the hill bends.",
        "k 와 밝기 b 를 바꿔 보며 언덕이 어디서 꺾이는지 봐요."),
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "A lamp's brightness at x is max(0, b − |p − x|).",
        "램프 하나의 밝기는 max(0, b − |p − x|) 예요."),
      question: t(E,
        "Two lamps: (p=0, b=6) and (p=−3, b=2). What is the total brightness at x = −3?",
        "램프가 (p=0, b=6) 과 (p=−3, b=2) 둘 있어요. x = −3 에서 총 밝기는 얼마일까요?"),
      options: [
        t(E, "5", "5"),
        t(E, "6", "6"),
        t(E, "3", "3"),
      ],
      correct: 0,
      explain: t(E,
        "The lamp at p=0 gives max(0, 6 − |0−(−3)|) = 6 − 3 = 3. The lamp at p=−3 gives max(0, 2 − 0) = 2. Add them: 3 + 2 = 5. Every position's total is just the sum of the tents.",
        "p=0 램프는 max(0, 6 − |0−(−3)|) = 6 − 3 = 3 이에요. p=−3 램프는 max(0, 2 − 0) = 2 예요. 더하면 3 + 2 = 5 예요. 어느 위치든 총 밝기는 텐트들의 합이에요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps) — slow vs fast plan → progressive code
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "Instead of checking every position, sweep only where the brightness slope changes.",
        "위치를 하나씩 도는 대신 꺾인점만 훑는 방법을 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: check every position, sum every lamp", "느림: 모든 위치를 돌며 모든 램프 더하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Positions can span 10^12 and there are up to 10^5 lamps — visiting each x is hopeless. Times out.",
                  "위치는 10^12 까지 퍼지고 램프는 최대 10^5 개예요. x 를 하나씩 방문하면 시간 초과가 나요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: slope events + sweep the breakpoints", "빠름: 기울기 이벤트 + 꺾인점 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Each tent = +1 at p−b, −2 at p, +1 at p+b. Sort the 3n breakpoints, sweep once, and count integers per segment. About n log n per test.",
                  "텐트 하나는 p−b 에 +1, p 에 −2, p+b 에 +1 이에요. 꺾인점 3n 개를 정렬해 한 번 훑고, 구간마다 정수를 세요. 테스트 하나당 약 n log n 이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드를 부분별로 읽어 봐요."),
      sections: getMcc22LampSections(E),
    },
  ];
}
