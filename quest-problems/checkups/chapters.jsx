import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, ReverseSim } from "./components";

// Reference solution — full O(N²) version (matches `solution_py` in quest-meta).
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [0] + [int(data[p+i]) for i in range(N)]; p += N",
  "b = [0] + [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "# baseline prefix: P[i] = matches a[k]==b[k] in [1..i]",
  "P = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    P[i] = P[i-1] + (1 if a[i] == b[i] else 0)",
  "",
  "counts = [0] * (N + 1)",
  "# diagonal s = l + r — for fixed s, all (l, r) pairs share Q",
  "for s in range(2, 2*N + 1):",
  "    Q = [0] * (N + 2)",
  "    for k in range(1, N + 1):",
  "        j = s - k",
  "        inc = 1 if (1 <= j <= N and a[j] == b[k]) else 0",
  "        Q[k] = Q[k-1] + inc",
  "    l_min = max(1, s - N)",
  "    l_max = s // 2",
  "    for l in range(l_min, l_max + 1):",
  "        r = s - l",
  "        inside = Q[r] - Q[l-1]",
  "        outside = P[l-1] + (P[N] - P[r])",
  "        counts[inside + outside] += 1",
  "",
  "for c in counts:",
  "    print(c)",
];

export function makeCheckupsCh1(E) {
  return [
    /* 1-1 — Problem rules straight from the official statement. */
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows in a line. The vet checks cow i ONLY if its species matches b[i]. FJ performs ONE operation — reverse the subarray [l, r]. For every c=0..N, count how many (l, r) operations leave EXACTLY c cows checked.",
        "FJ 에 N 마리 소가 줄 서 있어요. 수의사는 i 번째 소의 종이 b[i] 와 같을 때만 검진. FJ 가 딱 한 번 [l, r] 부분 배열을 뒤집어요. c = 0..N 각각에 대해 정확히 c 마리가 검진되는 (l, r) 쌍의 개수를 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐮</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Cow Checkups</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO January 2025 Bronze #3</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "FJ has N cows in a line. Cow i has species ", "FJ 에 N 마리 소가 줄 서 있어요. i 번째 소의 종은 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 800 }}>a[i]</code>
              {t(E, ". The vet will check cow i only if ", ". 수의사는 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 800 }}>a[i] == b[i]</code>
              {t(E, ".", " 일 때만 i 번째 소를 검진해요.")}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>1.</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "One reversal operation", "한 번의 뒤집기")}</b>
                  {t(E, " — pick l, r with 1 ≤ l ≤ r ≤ N and reverse the subarray a[l..r] in place.",
                        " — 1 ≤ l ≤ r ≤ N 인 l, r 를 골라 a[l..r] 를 그 자리에서 뒤집어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#0891b2", fontWeight: 800, flexShrink: 0 }}>2.</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Count checkups", "검진 수 세기")}</b>
                  {t(E, " — after the reversal, the vet checks every position i where the new a[i] equals b[i].",
                        " — 뒤집은 뒤, new a[i] == b[i] 인 모든 i 에서 검진.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#7c3aed", fontWeight: 800, flexShrink: 0 }}>3.</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Tally over all (l, r)", "(l, r) 별 집계")}</b>
                  {t(E, " — there are N(N+1)/2 distinct operations. For each c = 0, 1, …, N, count how many of these operations leave exactly c cows checked.",
                        " — 서로 다른 연산은 총 N(N+1)/2 개. c = 0, 1, …, N 각각에 대해 검진 수가 정확히 c 인 연산 개수.")}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10, paddingTop: 8, borderTop: "1px dashed #fca5a5", fontSize: 13 }}>
              <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
              <div>
                {t(E, "Output ", "")}
                <b style={{ color: "#15803d" }}>{t(E, "N + 1 lines", "N + 1 줄")}</b>
                {t(E, " — line i has the count of operations that check exactly i − 1 cows.",
                      " — i 번째 줄은 정확히 i − 1 마리가 검진되는 연산 개수.")}
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 7500</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ a[i], b[i] ≤ N</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 verbatim with all 4 output lines explained. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample 1: N=3 cows. There are 6 possible (l, r) pairs. Three leave 0 cows checked, three leave exactly 1 — so the answer is 3, 3, 0, 0.",
        "공식 샘플 1: N=3. (l, r) 쌍 6 개. 3 개는 검진 0, 3 개는 정확히 1 → 답 3, 3, 0, 0."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
1 3 2
3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
3
0
0`}
              </div>
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "All 6 operations enumerated", "6 개 연산 모두")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, lineHeight: 1.7 }}>
              <div>a = [1, 3, 2], b = [3, 2, 1]</div>
              <div style={{ marginTop: 4, color: "#7f1d1d" }}>
                {t(E, "Length-1 (no actual reversal):", "길이 1 (사실상 그대로):")}
              </div>
              <div>(l=1, r=1): a → [1, 3, 2] · check = <b>0</b></div>
              <div>(l=2, r=2): a → [1, 3, 2] · check = <b>0</b></div>
              <div>(l=3, r=3): a → [1, 3, 2] · check = <b>0</b></div>
              <div style={{ marginTop: 4, color: "#15803d" }}>
                {t(E, "Length ≥ 2 (real reversal):", "길이 ≥ 2 (진짜 뒤집기):")}
              </div>
              <div>(l=1, r=2): a → [3, 1, 2] · check = <b>1</b> (pos 1: 3=3)</div>
              <div>(l=2, r=3): a → [1, 2, 3] · check = <b>1</b> (pos 2: 2=2)</div>
              <div>(l=1, r=3): a → [2, 3, 1] · check = <b>1</b> (pos 3: 1=1)</div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
              <b>{t(E, "Tally:", "집계:")}</b>{" "}
              {t(E, "c=0: 3 ops · c=1: 3 ops · c=2: 0 · c=3: 0 → output ", "c=0: 3 · c=1: 3 · c=2: 0 · c=3: 0 → 출력 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 3 0 0</code>
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Interactive simulator: drag (l, r), see reversed array + checkup count. */
    {
      type: "reveal",
      narr: t(E,
        "Drag the l and r sliders to pick a reversal. The top row is a (after reverse), the bottom is b. Green cells = vet checks.",
        "l, r 슬라이더 드래그해서 뒤집기 선택. 위 줄 = a (뒤집은 후), 아래 줄 = b. 초록 칸 = 수의사 검진."),
      content: (<ReverseSim E={E} />),
    },

    /* 1-4 — Quiz on understanding the operation. */
    {
      type: "quiz",
      narr: t(E,
        "Reverse a[2..4] in [5, 1, 2, 3, 4] gives [5, 4, 3, 2, 1]? No — only positions 2..4 reverse, leaving [5, 4, 3, 2, 4]. Wait, we lose the 4 at the end! Actually positions 2..4 are values 1, 2, 3 — reversed they become 3, 2, 1. Result: [5, 3, 2, 1, 4].",
        "[5, 1, 2, 3, 4] 의 a[2..4] 뒤집기? 위치 2..4 의 값 1, 2, 3 만 뒤집혀서 3, 2, 1 → 결과 [5, 3, 2, 1, 4]. 위치 1 과 5 는 그대로."),
      question: t(E,
        "After reversing a[2..4] of a=[5, 1, 2, 3, 4], what is a[3]?",
        "a=[5, 1, 2, 3, 4] 의 a[2..4] 를 뒤집은 후, a[3] 의 값은?"),
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain: t(E,
        "Positions 2..4 hold values [1, 2, 3]. Reversed → [3, 2, 1]. So new a = [5, 3, 2, 1, 4], and a[3] = 2.",
        "위치 2..4 의 값 [1, 2, 3] 을 뒤집으면 [3, 2, 1]. 새 a = [5, 3, 2, 1, 4], a[3] = 2."),
    },

    /* 1-5 — Sample 3 walkthrough — pinpoint a high-yield reversal. */
    {
      type: "reveal",
      narr: t(E,
        "Sample 3: N=7. The two operations that yield 4 checkups are (l=4, r=5) and (l=5, r=7). One worked example below — verify by hand.",
        "샘플 3: N=7. 검진 4 개를 내는 연산은 (l=4, r=5) 와 (l=5, r=7). 아래 손 풀이로 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — (l=4, r=5)", "풀이 — (l=4, r=5)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <div>a = [1, 3, 2, 2, 1, 3, 2]</div>
              <div>b = [3, 2, 2, 1, 2, 3, 1]</div>
              <div style={{ marginTop: 4 }}>
                {t(E, "Reverse a[4..5] (values 2, 1 → 1, 2):", "a[4..5] (2, 1 → 1, 2) 뒤집기:")}
              </div>
              <div>a' = [1, 3, 2, <b style={{ color: "#dc2626" }}>1, 2</b>, 3, 2]</div>
              <div style={{ marginTop: 6 }}>
                {t(E, "Compare a' vs b — green = match:", "a' vs b 비교 — 초록 = 일치:")}
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 4 }}>
                {[
                  { av: 1, bv: 3 }, { av: 3, bv: 2 }, { av: 2, bv: 2 },
                  { av: 1, bv: 1 }, { av: 2, bv: 2 }, { av: 3, bv: 3 }, { av: 2, bv: 1 },
                ].map((c, i) => {
                  const ok = c.av === c.bv;
                  return (
                    <div key={i} style={{
                      display: "flex", flexDirection: "column", gap: 2,
                      border: `2px solid ${ok ? "#16a34a" : "#e5e7eb"}`,
                      background: ok ? "#dcfce7" : "#fff",
                      borderRadius: 6, padding: "4px 6px", textAlign: "center",
                      minWidth: 28, color: ok ? "#15803d" : C.text, fontWeight: 800,
                    }}>
                      <div>{c.av}</div>
                      <div style={{ fontSize: 9, color: C.dim }}>{c.bv}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 6, color: "#15803d", fontWeight: 800 }}>
                {t(E, "Matches at positions 3, 4, 5, 6 → ", "위치 3, 4, 5, 6 일치 → ")}<span style={{ fontSize: 16 }}>4</span>{t(E, " checkups.", " 검진.")}
              </div>
            </div>
          </div>
        </div>),
    },

    /* 1-6 — Input quiz on a tiny example. */
    {
      type: "input",
      narr: t(E,
        "Tiny case: a=[1, 2], b=[2, 1]. After reversing a[1..2] we get a'=[2, 1]. How many checkups?",
        "작은 예: a=[1, 2], b=[2, 1]. a[1..2] 뒤집기 후 a'=[2, 1]. 검진 수?"),
      question: t(E,
        "Checkups after reversing a[1..2] of a=[1, 2] vs b=[2, 1]?",
        "a=[1, 2] 의 a[1..2] 뒤집기 후 b=[2, 1] 와 비교 시 검진 수?"),
      hint: t(E,
        "a' = [2, 1]. Compare to b = [2, 1]: position 1 → 2=2 ✓, position 2 → 1=1 ✓. Both match!",
        "a' = [2, 1]. b = [2, 1] 비교: 위치 1 → 2=2 ✓, 위치 2 → 1=1 ✓. 둘 다."),
      answer: 2,
    },
  ];
}

export function makeCheckupsCh2(E, lang = "py") {
  return [
    /* 2-1 — Brute plan: 3 numbered steps. */
    {
      type: "reveal",
      narr: t(E,
        "Direct approach: try every (l, r), simulate the reversal, count matches, tally. Three nested loops.",
        "직접적인 방법: 모든 (l, r) 시도 → 뒤집기 시뮬 → 일치 세기 → 집계. 삼중 루프."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Initialize counts[0..N] = 0", "counts[0..N] = 0 초기화"), code: "counts = [0] * (N + 1)", color: "#dc2626" },
              { n: 2, label: t(E, "Outer pair (l, r) — loop both", "바깥 쌍 (l, r) — 두 겹"), code: "for l in 1..N:  for r in l..N:", color: "#0891b2" },
              { n: 3, label: t(E, "Inner: count checkups after reversing [l, r]", "안쪽: [l, r] 뒤집기 후 검진 세기"), code: "c = 0; for i in 1..N: if (reversed-a)[i] == b[i]: c++", color: "#7c3aed" },
              { n: 4, label: t(E, "Tally", "집계"), code: "counts[c] += 1", color: "#15803d" },
              { n: 5, label: t(E, "Print N+1 lines", "N+1 줄 출력"), code: "for c in counts: print(c)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity (brute)", "⏱ 복잡도 (brute)")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed" }}>O(N³)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N² pairs × O(N) inner scan", "N² 쌍 × O(N) 안쪽 스캔")}</div>
          </div>
        </div>),
    },

    /* 2-2 — TLE analysis. */
    {
      type: "reveal",
      narr: t(E,
        "Brute O(N³) at N=7500 ≈ 4·10¹¹ — TLE on large tests. Bronze partial credit comes from small N. Full credit needs O(N²).",
        "brute O(N³) 가 N=7500 면 ≈ 4·10¹¹ — 큰 입력 TLE. Bronze 부분점수는 작은 N. 풀점수는 O(N²) 필요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", textAlign: "center", marginBottom: 10 }}>
            ⏱ {t(E, "Will brute O(N³) fit?", "brute O(N³) 가 들어올까?")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
                ✅ {t(E, "Small N (~100)", "작은 N (~100)")}
              </div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" }}>
                <div>brute ≈ 100³ = 10⁶</div>
                <div style={{ color: "#15803d", fontWeight: 700 }}>{t(E, "→ instant. Partial credit ✓", "→ 즉시. 부분점수 ✓")}</div>
              </div>
            </div>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
                ⚠️ {t(E, "Mid N (~1000)", "중간 N (~1000)")}
              </div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" }}>
                <div>brute ≈ 10⁹</div>
                <div style={{ color: "#dc2626", fontWeight: 700 }}>{t(E, "→ TLE in Python.", "→ Python TLE.")}</div>
              </div>
            </div>
            <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>
                🚨 {t(E, "Full N = 7500", "풀 N = 7500")}
              </div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" }}>
                <div>brute ≈ 4·10¹¹</div>
                <div style={{ color: "#dc2626", fontWeight: 700 }}>{t(E, "→ TLE.", "→ TLE.")}</div>
              </div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            💡 {t(E,
              "Plan: code the brute first (it's clean and gets partial credit). Next, learn the O(N²) trick that uses prefix sums for full credit.",
              "계획: 먼저 brute 코드 (간단 + 부분점수 통과). 그 다음 prefix sum 트릭으로 O(N²) → 풀점수.")}
          </div>
        </div>),
    },

    /* 2-3 — Smart approach (sketch only — full code is in section 7). */
    {
      type: "reveal",
      narr: t(E,
        "Key observation: the inner scan repeats the same work across many (l, r). For all pairs sharing the same diagonal s = l + r, one prefix array Q answers every (l, r) in O(1).",
        "핵심 관찰: 같은 대각선 s = l + r 위의 (l, r) 들이 같은 안쪽 작업을 반복. 한 번 prefix Q 만들어두면 모든 (l, r) 답이 O(1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            ⚡ {t(E, "Full-credit path: prefix sum on the diagonal", "풀점수 경로: 대각선 위의 prefix sum")}
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#065f46", marginBottom: 4 }}>
              {t(E, "Why diagonal s = l + r?", "왜 대각선 s = l + r?")}
            </div>
            {t(E,
              "After reversing [l, r], position i (l ≤ i ≤ r) holds the value that was at l + r − i. So matching at i means a[l+r−i] == b[i]. The expression depends on s = l + r, NOT on l and r separately.",
              "[l, r] 를 뒤집으면 위치 i (l ≤ i ≤ r) 에는 원래 l + r − i 자리에 있던 값이 와요. 즉 a[l+r−i] == b[i] 가 일치 조건. 이 식은 s = l + r 에만 의존, l 과 r 각각엔 의존 안 함.")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
                {t(E, "P[i] — baseline prefix", "P[i] — 기본 prefix")}
              </div>
              <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6 }}>
                {t(E, "Number of matches a[k] == b[k] for k in [1, i]. Built once in O(N).",
                      "k ∈ [1, i] 에서 a[k] == b[k] 인 k 개수. O(N) 에 한 번 계산.")}
              </div>
            </div>
            <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", marginBottom: 6 }}>
                {t(E, "Q[k] for diagonal s", "대각선 s 의 Q[k]")}
              </div>
              <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6 }}>
                {t(E, "Number of j ∈ [1, k] with a[s−j] == b[j]. Rebuilt for each s in O(N).",
                      "j ∈ [1, k] 에서 a[s−j] == b[j] 인 j 개수. s 마다 O(N) 재계산.")}
              </div>
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <b>{t(E, "For each (l, r) on diagonal s:", "대각선 s 의 각 (l, r) 마다:")}</b>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, marginTop: 4 }}>
              inside&nbsp; = Q[r] − Q[l−1]<br/>
              outside = P[l−1] + (P[N] − P[r])<br/>
              counts[inside + outside] += 1
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "#5b21b6" }}>
              {t(E, "Total: O(N²). Code in the next section walks through all of this step by step.",
                    "총: O(N²). 다음 섹션의 progressive code 가 단계별로 안내.")}
            </div>
          </div>
        </div>),
    },

    /* 2-4 — Progressive code (brute + smart). */
    {
      type: "progressive",
      narr: t(E,
        "Build the code step by step. First brute (1–4) for partial credit, then the prefix-sum upgrade (5–7) for full credit.",
        "단계별 코드. 먼저 brute (1–4) 로 부분점수, 그 다음 prefix-sum 업그레이드 (5–7) 로 풀점수."),
      sections: getCheckupsSections(E),
    },
  ];
}
