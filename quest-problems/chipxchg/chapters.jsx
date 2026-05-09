import { C, t } from "@/components/quest/theme";
import { getChipXchgSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def min_final_A(A, B, cA, cB, x):",
  "    if x == 0:",
  "        return A + (B // cB) * cA",
  "    cands = {0, x}",
  "    r1 = (cB - 1 - (B % cB)) % cB",
  "    if r1 <= x:",
  "        cands.add(r1)",
  "        cands.add(r1 + ((x - r1) // cB) * cB)",
  "    r0 = (-B) % cB",
  "    if r0 <= x:",
  "        cands.add(r0)",
  "        cands.add(r0 + ((x - r0) // cB) * cB)",
  "    return min(A + (x - b) + ((B + b) // cB) * cA for b in cands)",
  "",
  "def solve(A, B, cA, cB, fA):",
  "    lo, hi = 0, 2 * 10**18",
  "    while lo < hi:",
  "        mid = (lo + hi) // 2",
  "        if min_final_A(A, B, cA, cB, mid) >= fA:",
  "            hi = mid",
  "        else:",
  "            lo = mid + 1",
  "    return lo",
  "",
  "T = int(input())",
  "out = []",
  "for _ in range(T):",
  "    A, B, cA, cB, fA = map(int, input().split())",
  "    out.append(str(solve(A, B, cA, cB, fA)))",
  "print('\\n'.join(out))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeChipXchgCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh1(E) {
  return [
    // 1-1: Title reveal & mission
    {
      type: "reveal",
      narr: t(E,
        "Bessie has A chips of type A and B chips of type B. She can repeatedly trade c_B B-chips for c_A A-chips. Random chips arrive, but the adversary picks the split. How many chips does she need so she's guaranteed to reach f_A type-A chips?",
        "Bessie 는 A 종류 칩 A 개, B 종류 칩 B 개를 가지고 있어요. B 칩 c_B 개를 A 칩 c_A 개로 계속 바꿀 수 있어요. 랜덤 칩이 오는데 분배는 적이 정해요. f_A 개 A 칩에 도달이 보장되려면 몇 개가 필요할까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔵"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Chip Exchange</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Find the smallest x so that for every adversarial split of x extra chips, Bessie can still reach f_A type-A chips.",
                "추가 x 개를 적이 어떻게 나눠 줘도 f_A 개 A 칩에 도달 가능한 가장 작은 x 를 구하기.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Start: ", "시작: ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "A type-A chips and B type-B chips.", "A 종류 칩 A 개, B 종류 칩 B 개.")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Exchange: trade ", "환전: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "c_B B-chips for c_A A-chips", "B 칩 c_B 개 → A 칩 c_A 개")}</b>
                  {t(E, " (one direction, repeat as you like).", " (한 방향, 원하는 만큼 반복).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "x extra chips arrive, but ", "추가 x 개가 오는데, ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "an adversary picks how many go to A vs. B.", "A 와 B 로 몇 개씩 갈지 적이 정함.")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the smallest ", "가장 작은 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "x", "x")}</b>
                  {t(E, " that guarantees reaching f_A A-chips. (Up to 10^4 test cases, answer up to 10^18 — use 64-bit.)",
                       " 를 출력. (테스트 최대 10^4, 답 최대 10^18 — 64비트 사용.)")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Quiz — what does Bessie do with B chips?
    {
      type: "quiz",
      narr: t(E,
        "If Bessie ends with some A chips and some B chips, how many type-A chips does she finish with (assuming she exchanges optimally)?",
        "Bessie 가 A 칩 약간, B 칩 약간을 들고 있을 때, 환전을 잘 하면 최종 A 칩은 몇 개?"),
      question: t(E,
        "Bessie ends holding A_now type-A chips and B_now type-B chips. Final type-A count = ?",
        "Bessie 가 A 칩 A_now 개, B 칩 B_now 개로 끝나면 최종 A 칩 수 = ?"),
      options: [
        t(E, "A_now + (B_now // c_B) * c_A", "A_now + (B_now // c_B) * c_A"),
        t(E, "A_now + B_now", "A_now + B_now"),
      ],
      correct: 0,
      explain: t(E,
        "Right — every full group of c_B type-B chips converts into c_A type-A chips. The B_now mod c_B leftovers are stuck.",
        "정답 — c_B 묶음 하나가 A 칩 c_A 개가 돼요. B_now mod c_B 자투리는 못 바꿔요."),
    },

    // 1-3: Quiz — who decides the split?
    {
      type: "quiz",
      narr: t(E,
        "Why does this problem need any thinking? Because the adversary picks the split that's WORST for Bessie.",
        "이 문제가 어려운 이유? 적이 Bessie 에게 가장 불리하게 나누기 때문이에요."),
      question: t(E,
        "When x extra chips arrive, who picks how many become type A and how many become type B?",
        "추가 x 개가 올 때, A 와 B 로 몇 개씩 갈지 정하는 사람은?"),
      options: [
        t(E, "An adversary — they pick the split that minimizes Bessie's final A count.", "적 — Bessie 의 최종 A 가 가장 작아지게 나눔."),
        t(E, "Bessie — she picks the split that maximizes her final A count.", "Bessie — 자기 최종 A 가 가장 커지게 나눔."),
      ],
      correct: 0,
      explain: t(E,
        "Yes. We must find the smallest x that survives EVERY split. That's why we look at min over splits.",
        "맞아요. 모든 분배에서 살아남는 가장 작은 x 를 찾아야 해요. 그래서 분배에 대한 최솟값을 봐요."),
    },

    // 1-4: NumInput — sample 1
    {
      type: "input",
      narr: t(E,
        "Sample: A=2, B=3, c_A=1, c_B=1, f_A=4. Total chips already = 5, and every B can become an A. How many extra chips x are needed?",
        "예시: A=2, B=3, c_A=1, c_B=1, f_A=4. 이미 칩 5 개, 모든 B 가 A 로 바뀜. 추가 x 는?"),
      question: t(E,
        "A=2, B=3, c_A=c_B=1, f_A=4 → x = ?",
        "A=2, B=3, c_A=c_B=1, f_A=4 → x = ?"),
      hint: t(E,
        "Convert all B → A first. Are you already at f_A?",
        "B 를 다 A 로 바꿔 봐. 이미 f_A 에 도달했나?"),
      answer: 0,
    },

    // 1-5: NumInput — sample 2 (adversary really matters)
    {
      type: "input",
      narr: t(E,
        "Now A=0, B=0, c_A=2, c_B=3, f_A=5. The adversary will pile chips onto type B knowing only every 3rd chip pays off (as 2 A's). How big does x need to be?",
        "이제 A=0, B=0, c_A=2, c_B=3, f_A=5. 적은 B 쪽으로 몰아서 3 개마다 한 번씩만 A 2개로 환전되도록 만들 거예요. x 는?"),
      question: t(E,
        "A=B=0, c_A=2, c_B=3, f_A=5 → x = ?",
        "A=B=0, c_A=2, c_B=3, f_A=5 → x = ?"),
      hint: t(E,
        "Try x=8: if all 8 go to B, that's only floor(8/3)*2 = 4 A-chips. Not enough. Try one bigger.",
        "x=8 시도: 모두 B 면 floor(8/3)*2 = 4 A 칩 — 부족. 하나 더 시도."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeChipXchgCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Three steps stack up: model one round, narrow b to a few candidates, then binary-search x. Walk through the sections one at a time.",
        "세 단계로 쌓아요: 한 시도 모델링 → b 후보 좁히기 → x 이분 탐색. 한 섹션씩 따라가요."),
      sections: getChipXchgSections(E),
    },
  ];
}
