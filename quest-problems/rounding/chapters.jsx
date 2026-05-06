import { C, t } from "@/components/quest/theme";
import { getRoundingSections, RoundingSimulator } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeRoundingCh1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Bessie rounds x DIRECTLY to the nearest 10^P (P = smallest with 10^P ≥ x). Elsie chains: rounds to 10^1, then 10^2, ..., then 10^P. Sometimes they get different answers. Count integers in [2, N] where they disagree.",
        "Bessie 는 x 를 10^P (P = 10^P ≥ x 인 최소) 로 직접 반올림. Elsie 는 단계별로 10^1 → 10^2 → ... → 10^P 로 사슬 반올림. 가끔 답이 달라요. [2, N] 중 답이 다른 정수 개수를 셈."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔄</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0ea5e9" }}>Roundabout Rounding</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO December 2024 Bronze #1</div>
          </div>

          <div style={{ background: "#f0f9ff", border: "2px solid #7dd3fc", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0c4a6e", marginBottom: 8 }}>
              📖 {t(E, "Two rounding methods", "두 가지 반올림 방법")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #7dd3fc", borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ fontWeight: 800, color: "#0ea5e9", marginBottom: 4 }}>
                {t(E, "Bessie — round once to 10^P", "Bessie — 10^P 한 번에 반올림")}
              </div>
              {t(E, "To round x to 10^b: check the b-th digit from the right. If ≥ 5, add 10^b to x. Then zero out all digits at positions 1..b.",
                    "x 를 10^b 로 반올림: 오른쪽에서 b 번째 자리 (1-indexed) 를 봄. ≥ 5 이면 x 에 10^b 더하기. 그 다음 1..b 자리 모두 0 으로.")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #7dd3fc", borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ fontWeight: 800, color: "#0ea5e9", marginBottom: 4 }}>
                {t(E, "Elsie — chain round 10^1 → 10^2 → ... → 10^P", "Elsie — 10^1 → 10^2 → ... → 10^P 단계별로")}
              </div>
              {t(E, "Round to 10, then to 100, then to 1000, ..., finally to 10^P. Each step uses Bessie's method on the current value.",
                    "10 으로 반올림 → 100 으로 → 1000 으로 → ... → 마지막에 10^P. 각 단계마다 현재 값에 Bessie 방법 적용.")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #7dd3fc", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <b style={{ color: "#15803d" }}>{t(E, "Goal", "목표")}:</b>{" "}
              {t(E, "For each test case N, count integers x ∈ [2, N] where Bessie(x) ≠ Elsie(x). Output one count per case.",
                    "각 테스트 케이스 N 에 대해 [2, N] 중 Bessie(x) ≠ Elsie(x) 인 x 개수 출력 (케이스당 한 줄).")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 10⁹</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 10⁵</code>{" "}
              ({t(E, "all N distinct", "N 모두 서로 다름")})
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O. */
    {
      type: "reveal",
      narr: t(E,
        "Sample: 4 cases. N=1 has no x in [2, 1] → 0. N=100 has 5 disagreements (45..49). N=4567 → 183. N=3366 → 60.",
        "샘플: 4 케이스. N=1 은 [2, 1] 비어있음 → 0. N=100 은 5 개 (45..49). N=4567 → 183. N=3366 → 60."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0ea5e9", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`4
1
100
4567
3366`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
5
183
60`}
              </div>
            </div>
          </div>

          <div style={{ background: "#f0f9ff", border: "2px solid #7dd3fc", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#0c4a6e", marginBottom: 6 }}>
              🔍 {t(E, "Smallest disagreement: x = 45", "가장 작은 불일치: x = 45")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <div>x = 45, P = 2 (10² = 100 ≥ 45)</div>
              <div style={{ color: "#0ea5e9", marginTop: 4 }}>
                <b>Bessie:</b> {t(E, "round 45 to 100. 2nd digit from right = 4 (tens). 4 < 5 → no add. Zero last 2 digits → 0.",
                                       "45 → 100 으로. 오른쪽 2번째 자리 = 4 (십의 자리). 4 < 5 → 더하기 X. 끝 2 자리 0 으로 → 0.")}
              </div>
              <div style={{ color: "#dc2626", marginTop: 4 }}>
                <b>Elsie:</b> {t(E, "45 → round to 10: ones=5 ≥ 5, +10 → 55, zero ones → 50. 50 → round to 100: tens=5, +100 → 150, zero last 2 → 100.",
                                      "45 → 10 으로 반올림: 일의자리=5 ≥ 5, +10 → 55, 일의자리 0 → 50. 50 → 100 으로: 십의자리=5, +100 → 150, 끝 2 자리 0 → 100.")}
              </div>
              <div style={{ color: "#15803d", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Bessie 0 ≠ Elsie 100. Disagreement!", "Bessie 0 ≠ Elsie 100. 불일치!")}
              </div>
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Simulator. */
    {
      type: "reveal",
      narr: t(E,
        "Try different values. Watch Bessie do one big round vs Elsie's chain. The simulator shows P and each step.",
        "여러 값 시도. Bessie 의 한 번 vs Elsie 의 단계별 비교. P 와 각 단계 표시."),
      content: (<RoundingSimulator E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      type: "quiz",
      narr: t(E,
        "Think: when does the chain RAISE the value but a single round doesn't?",
        "체인은 값을 올리는데 한 번 반올림은 안 올리는 경우는?"),
      question: t(E,
        "x = 449. P = 3. Does Bessie agree with Elsie?",
        "x = 449. P = 3. Bessie 와 Elsie 답이 같을까?"),
      options: [
        t(E, "Yes — both give 0", "예 — 둘 다 0"),
        t(E, "Yes — both give 1000", "예 — 둘 다 1000"),
        t(E, "No — Bessie 0, Elsie 1000", "아니요 — Bessie 0, Elsie 1000"),
      ],
      correct: 2,
      explain: t(E,
        "Bessie: hundreds digit = 4 < 5 → no add. Zero last 3 → 0. Elsie: 449 → 450 → 500 → 1000 (each step rounds up). Disagree.",
        "Bessie: 백의자리 = 4 < 5 → 더하기 X. 끝 3 자리 0 → 0. Elsie: 449 → 450 → 500 → 1000 (단계마다 올림). 불일치."),
    },

    /* 1-5 — Tiny case. */
    {
      type: "input",
      narr: t(E,
        "x = 5: only one round step (P=1). Both give 10. Agree. Now N = 50: how many disagreements in [2, 50]?",
        "x = 5: 한 단계 (P=1). 둘 다 10. 같음. N = 50 일 때 [2, 50] 의 불일치 수?"),
      question: t(E,
        "Disagreements in [2, 50]?",
        "[2, 50] 의 불일치 수?"),
      hint: t(E,
        "Disagreements happen at 45, 46, 47, 48, 49 (P=2 with leading digit 4, ones ≥ 5). 50 is leading 5 — Bessie also rounds up. So 5 disagreements.",
        "45, 46, 47, 48, 49 에서 불일치 (P=2, 첫 자리 4, 일의자리 ≥ 5). 50 은 첫 자리 5 — Bessie 도 올림. 그래서 5 개."),
      answer: 5,
    },
  ];
}

export function makeRoundingCh2(E, lang = "py") {
  return [
    /* 2-1 — Brute plan. */
    {
      type: "reveal",
      narr: t(E,
        "Plan: for each x in [2, N], compute Bessie(x) and Elsie(x), check if they disagree. Brute is O(N) per case — works for samples but TLEs for N up to 10⁹.",
        "계획: [2, N] 의 각 x 마다 Bessie(x) 와 Elsie(x) 계산해서 다른지 확인. brute 는 케이스당 O(N) — 샘플 통과하지만 N = 10⁹ 면 TLE."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Helper: round x to 10^b (Bessie's method)", "도우미: x 를 10^b 로 (Bessie 방법)"), code: "round_to(x, b)", color: "#0ea5e9" },
              { n: 2, label: t(E, "Find P = smallest with 10^P ≥ x", "P = 10^P ≥ x 인 최소 찾기"), code: "find_P(x)", color: "#7c3aed" },
              { n: 3, label: t(E, "Bessie: one round to 10^P", "Bessie: 10^P 한 번"), code: "bessie = round_to(x, P)", color: "#16a34a" },
              { n: 4, label: t(E, "Elsie: chain rounds 10^1 ... 10^P", "Elsie: 10^1...10^P 사슬"), code: "for k in 1..P: v = round_to(v, k)", color: "#dc2626" },
              { n: 5, label: t(E, "Count disagreements", "불일치 카운트"), code: "if bessie != elsie: count++", color: "#9a3412" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>),
    },

    ...getRoundingSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the brute first, then optimize for full credit.",
              "brute 먼저, 그 다음 풀점수용 최적화.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
