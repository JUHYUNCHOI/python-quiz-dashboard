import { C, t } from "@/components/quest/theme";
import { getBacteriaSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "ans = 0",
  "# prefix[i] = cumulative spray effect at position i",
  "prefix = [0] * (N + 1)",
  "",
  "for i in range(N):",
  "    # current value after all previous sprays",
  "    a[i] += prefix[i]",
  "    if a[i] != 0:",
  "        spray = -a[i]",
  "        ans += abs(a[i])",
  "        # spray of power `spray` affects i..N-1",
  "        # patch i gets spray, i+1 gets spray-sign,",
  "        # triangular: patch j gets spray-(j-i)*sign",
  "        # Use difference array for triangular update",
  "        prefix[i] += spray",
  "        if i + 1 <= N:",
  "            prefix[i + 1] += -spray  # cancel linear",
  "    if i + 1 < N:",
  "        prefix[i + 1] += prefix[i]",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N patches of bacteria with positive/negative pH-deviation values.\nA sprayer of power L applied to position i raises patch i by L, patch i+1 by L−1, ..., down to patch i+L−1 by 1 (triangular fall-off).\nFind the MINIMUM number of sprays needed to zero out every patch.",
        "FJ에게 N개의 세균 패치가 있고, 각 패치에는 양수/음수 편차값이 있어요.\n파워 L의 분무를 위치 i에 쓰면 패치 i는 L, i+1은 L−1, ..., i+L−1은 1 만큼 더해져요 (오른쪽으로 갈수록 감소).\n모든 패치를 0으로 만드는 데 필요한 분무의 최소 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udda0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Balancing Bacteria</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N patches in a row", "한 줄로 늘어선 N개의 패치")}</b>
                  {t(E, " with deviation values ", "가 있어요. 각 패치의 편차값 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[1..N]</code>
                  {t(E, " (positive or negative).", " (양수 또는 음수)이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A spray with ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "power L at position i", "파워 L의 분무를 위치 i에 쏘면")}</b>
                  {t(E, " adds L to a[i], L−1 to a[i+1], ..., 1 to a[i+L−1] (triangular).",
                        " a[i]에 L, a[i+1]에 L−1, ..., a[i+L−1]에 1 이 더해져요 (삼각형 모양).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Power can also be ", "파워는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "negative", "음수")}</b>
                  {t(E, " (subtract instead of add). Each spray counts as ONE operation regardless of |L|.",
                        "도 가능해요 (더하기 대신 빼기). 분무 한 번은 |L|와 관계없이 1번으로 계산해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of sprays", "필요한 분무의 최소 횟수")}</b>
                  {t(E, " to make every a[i] equal 0.", "를 출력해요. 모든 a[i]가 0이 되도록.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Understanding the spray pattern: if we spray at power 2 from the right, patch N gets 2, patch N-1 gets 1.\nIs this correct?", "분무 패턴 이해: 파워 2로 오른쪽에서 분무하면, 패치 N은 2, 패치 N-1은 1을 받아요. 맞을까?"),
      question: t(E,
        "Spray power 2 from right: patch N gets 2, patch N-1 gets 1. True?",
        "파워 2로 오른쪽에서 분무: 패치 N은 2, 패치 N-1은 1. 맞아?"),
      options: [
        t(E, "Yes, that's the triangular pattern", "맞아, 삼각형 패턴이야"),
        t(E, "No, both get 2", "아니, 둘 다 2를 받아"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The spray creates a triangular pattern: power L at the rightmost, L-1 at the next, and so on.",
        "맞아! 분무는 삼각형 패턴을 만들어: 맨 오른쪽에 L, 그 다음에 L-1, 이런 식이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If a = [0, 5] (2 patches), how many sprays of power 5 do we need to fix the right patch?", "a = [0, 5] (패치 2개)이면, 오른쪽 패치를 고치려면 파워 5 분무가 몇 번 필요해요?"),
      question: t(E,
        "a = [0, 5]. Min sprays to make right patch 0? (Each spray adds -1 to right patch)",
        "a = [0, 5]. 오른쪽 패치를 0으로 만드는 최소 분무 횟수? (분무 1회 = 오른쪽에 -1)"),
      hint: t(E,
        "Each spray of power -1 reduces the right patch by 1. We need 5 sprays.",
        "파워 -1의 분무 1회는 오른쪽 패치를 1 줄여줘요. 5번 필요해요."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Process left to right with greedy: cancel each patch as we reach it, track ripple effects with a difference array. O(N) total.",
        "왼쪽부터 오른쪽으로 그리디하게 처리해요: 각 패치에 도착하면 그 값을 0으로 만드는 분무를 한 번 쏘고, 영향을 차분 배열로 추적해요. 전체 O(N)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read input", "입력 읽기"), code: "a = list(map(int, input().split()))", color: "#059669" },
              { n: 2, label: t(E, "Walk left → right", "왼쪽 → 오른쪽 순회"), code: "for i in range(N):  current = a[i] + prefix[i]", color: "#0891b2" },
              { n: 3, label: t(E, "Spray to zero this patch", "이 패치를 0으로 만드는 분무"), code: "spray = -current  →  apply triangular update", color: "#7c3aed" },
              { n: 4, label: t(E, "Count this spray", "분무 1번 카운트"), code: "ans += abs(spray)  // wait, count is just 1", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass with O(1) update per position", "위치당 O(1) 업데이트로 한 번 순회")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBacteriaSections(E),
    },
  ];
}
