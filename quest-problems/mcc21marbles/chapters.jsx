import { C, t } from "@/components/quest/theme";
import { getMcc21MarblesSections, Mcc21MarblesBoundarySim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (fast: one prefix-carry pass over D = A - B)
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "A = list(map(int, input().split()))",
  "B = list(map(int, input().split()))",
  "",
  "# D[i] = A[i] - B[i] : surplus (+) or shortage (-) at box i.",
  "# The running prefix of D is how many marbles must cross each",
  "# boundary, so the answer is the sum of |prefix| at every boundary.",
  "ops = 0",
  "carry = 0",
  "for i in range(N):",
  "    carry += A[i] - B[i]",
  "    ops += abs(carry)",
  "",
  "print(ops)",
];

export function makeMcc21MarblesCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "N boxes in a row. Box i starts with A[i] marbles and must end with B[i] marbles. One operation: move ONE marble from a box to an adjacent box (left or right).\nPrint the MINIMUM number of operations. (It is guaranteed that sum(A) = sum(B).)",
        "한 줄로 늘어선 N 개의 상자. 상자 i 는 A[i] 개로 시작해서 B[i] 개로 끝나야 해요. 한 번의 연산: 구슬 1 개를 인접한 상자 (왼쪽 또는 오른쪽) 로 옮기기.\n필요한 최소 연산 횟수를 출력해요. (sum(A) = sum(B) 가 보장돼요.)"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔴"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Marbles and Boxes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Find the minimum single-marble moves to turn the start counts A into the target counts B.", "시작 개수 A 를 목표 개수 B 로 만드는 최소 이동 횟수를 구해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N boxes in a row. Box i has ", "한 줄의 N 개 상자. 상자 i 는 ")}
                  <b style={{ color: "#dc2626" }}>A[i]</b>{t(E, " marbles now and must reach ", " 개를 가지고 있고 ")}<b style={{ color: "#7c3aed" }}>B[i]</b>
                  {t(E, ".", " 개가 되어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move 1 marble to an adjacent box", "구슬 1 개를 인접한 상자로 옮기기")}</b>
                  {t(E, " (box i−1 or i+1).", " (상자 i−1 또는 i+1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum operations to turn A into B", "A 를 B 로 만드는 최소 연산 횟수")}</b>
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
        "Read the input format and the official example. Three lines come in: N, then array A, then array B — position i pairs them up (box i goes from A[i] to B[i]).",
        "입력 형식과 공식 예제를 봐요. 세 줄이 들어와요: N, 배열 A, 배열 B — 같은 위치 i 끼리 짝을 지어요 (상자 i 는 A[i] 에서 B[i] 로)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "number of boxes", "상자 개수")}</div>
              <div>• <b>A</b> — {t(E, "N integers: the START count of each box", "N 개 정수: 각 상자의 시작 개수")}</div>
              <div>• <b>B</b> — {t(E, "N integers: the TARGET count of each box", "N 개 정수: 각 상자의 목표 개수")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 5·10⁴, sum(A) ≤ 5·10¹¹ (use 64-bit), sum(A) = sum(B).", "제약: 1 ≤ N ≤ 5·10⁴, sum(A) ≤ 5·10¹¹ (64비트 사용), sum(A) = sum(B).")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>5</div>
              <div>2 2 2 6 3</div>
              <div>1 2 3 4 5</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fca5a5", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>4</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "A = [2,2,2,6,3] → B = [1,2,3,4,5]. One optimal way: 1→2, 2→3, then twice 4→5. That's 4 single-marble moves.",
              "A = [2,2,2,6,3] → B = [1,2,3,4,5]. 한 가지 최적: 1→2, 2→3, 그다음 4→5 를 두 번. 총 4 번의 이동.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the idea. Look at each box's surplus/shortage D = A − B, then carry the running total across each boundary. The answer piles up as |carry| at every boundary.",
        "아이디어를 느껴봐요. 각 상자의 남음/모자람 D = A − B 를 보고, 누적 합을 각 경계로 넘겨요. 정답은 경계마다 |carry| 로 쌓여요."),
      content: <Mcc21MarblesBoundarySim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "2 boxes. A = [5, 1], B = [3, 3]. Box 1 has 2 too many, box 2 is 2 short. Those 2 extra marbles must cross the single boundary.",
        "상자 2개. A = [5, 1], B = [3, 3]. 상자 1 은 2 개 많고, 상자 2 는 2 개 모자라요. 남는 2 개가 하나뿐인 경계를 건너야 해요."),
      question: t(E,
        "A = [5, 1], target B = [3, 3]. Minimum moves?",
        "A = [5, 1], 목표 B = [3, 3]. 최소 이동?"),
      options: [
        t(E, "1 move", "1번"),
        t(E, "2 moves", "2번"),
        t(E, "4 moves", "4번"),
      ],
      correct: 1,
      explain: t(E,
        "D = [+2, −2]. Prefix after box 1 = +2, so 2 marbles cross the boundary. |+2| = 2 moves.",
        "D = [+2, −2]. 상자 1 까지의 누적 = +2, 그래서 2 개가 경계를 건너요. |+2| = 2 번."),
    },

    // 1-5: hand-computed input
    {
      type: "input",
      narr: t(E,
        "Now three boxes. A = [3, 0, 3], B = [1, 4, 1]. Walk the prefix of D across both boundaries and add up |carry|.",
        "이번엔 상자 3개. A = [3, 0, 3], B = [1, 4, 1]. D 의 누적을 두 경계로 넘기며 |carry| 를 더해요."),
      question: t(E,
        "A = [3, 0, 3], B = [1, 4, 1]. Min moves?",
        "A = [3, 0, 3], B = [1, 4, 1]. 최소 이동?"),
      hint: t(E, "D = [+2, −4, +2]. Prefix after box 1 = +2, after box 2 = −2. Add |+2| + |−2|.", "D = [+2, −4, +2]. 상자 1 까지 누적 = +2, 상자 2 까지 = −2. |+2| + |−2| 를 더해요."),
      answer: 4,
    },
  ];
}

export function makeMcc21MarblesCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "The slow way actually simulates marbles hopping one box at a time until A matches B — the number of hops can be enormous. The fast way never moves a marble: it reformulates the problem as a prefix-carry over D = A − B and gets the answer in one pass.",
        "느린 방법은 A 가 B 와 같아질 때까지 구슬을 한 칸씩 실제로 옮겨요 — 이동 횟수가 어마어마해질 수 있어요. 빠른 방법은 구슬을 하나도 옮기지 않아요: 문제를 D = A − B 의 누적(carry) 으로 바꿔 한 번 훑기로 답을 구해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: simulate every single-marble hop", "느림: 구슬 한 칸 이동을 하나씩 시뮬")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Marbles can travel far, and totals reach 5·10¹¹ — the number of hops is astronomically large. Times out.", "구슬이 멀리 이동할 수 있고 합이 5·10¹¹ 까지 — 이동 횟수가 천문학적으로 커요. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>
                🚀 {t(E, "Fast: prefix-carry over D = A − B", "빠름: D = A − B 의 누적(carry)")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Whatever imbalance sits left of a boundary MUST cross it. Sum |running prefix of D| over all N boxes — one O(N) pass.", "경계 왼쪽에 남은 불균형은 반드시 그 경계를 건너요. D 의 누적 |prefix| 를 N 개 상자에 걸쳐 더해요 — O(N) 한 번 훑기.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc21MarblesSections(E),
    },
  ];
}
