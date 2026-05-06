import { C, t } from "@/components/quest/theme";
import { getMexesSections, MexesSlider } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeMexesCh1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "mex(array) = smallest non-negative integer NOT in the array. For each i = 0..N, find the minimum number of element changes to make mex equal i.",
        "mex(배열) = 배열에 없는 가장 작은 음이 아닌 정수. 각 i = 0..N 에 대해, mex 를 i 로 만드는 데 필요한 최소 원소 변경 수."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧮</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#7c3aed" }}>Making Mexes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO February 2025 Bronze #2</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "An array of N non-negative integers (each ≤ N). One operation = change ONE element to ANY non-negative integer.",
                    "음이 아닌 정수 N 개 배열 (각 ≤ N). 한 번의 연산 = 원소 하나를 아무 음이 아닌 정수로 바꾸기.")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: C.text }}>
              <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
                {t(E, "What is mex?", "mex 가 뭐?")}
              </div>
              {t(E, "The MINIMUM EXcluded non-negative integer — the smallest non-negative integer that is NOT in the array.",
                    "MINIMUM EXcluded — 배열에 들어있지 않은 가장 작은 음이 아닌 정수.")}
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#5b21b6" }}>
                mex([0, 1, 3]) = 2 &nbsp;&nbsp; mex([1, 2, 3]) = 0 &nbsp;&nbsp; mex([0, 1, 2]) = 3
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55, padding: "8px 10px", background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8 }}>
              <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
              <div>
                {t(E, "Output ", "")}
                <b style={{ color: "#15803d" }}>{t(E, "N + 1 lines", "N + 1 줄")}</b>
                {t(E, " — line i has the minimum operations to make mex = i − 1 (for i = 1, …, N + 1; i.e. mex from 0 to N).",
                      " — i 번째 줄은 mex = i − 1 만들기 최소 연산 (i = 1, …, N + 1; 즉 mex 0 ~ N).")}
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfeff", border: "1px dashed #67e8f9", borderRadius: 8, fontSize: 11.5, color: "#155e75", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 2·10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ a[i] ≤ N</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample: a = [2, 2, 2, 0]. Walk through each target mex.",
        "공식 샘플: a = [2, 2, 2, 0]. 각 목표 mex 별로 풀이."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`4
2 2 2 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`1
0
3
1
2`}
              </div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — a = [2, 2, 2, 0]", "풀이 — a = [2, 2, 2, 0]")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <div><b>mex = 0:</b> {t(E, "0 must NOT appear. We have one 0 → 1 op.", "0 이 없어야. 0 한 개 있으니 1 op.")}</div>
              <div><b>mex = 1:</b> {t(E, "0 in, 1 out. 0 ✓, no 1 → 0 ops.", "0 있고 1 없어야. 0 ✓, 1 없음 → 0 ops.")}</div>
              <div><b>mex = 2:</b> {t(E, "0, 1 in, 2 out. Missing 1 (need 1 op), and 3 twos to remove (3 ops). Combine: change one 2 to 1, change other two 2s to anything else → 3 total.", "0, 1 있고 2 없어야. 1 빠짐 (+1 op), 2 가 3 개 (3 ops). 합쳐서: 2 하나를 1 로, 다른 2 둘을 다른 값으로 → 3.")}</div>
              <div><b>mex = 3:</b> {t(E, "0, 1, 2 in, 3 out. Missing 1 (need 1 op). 3 not present → ok. Total = 1.", "0, 1, 2 있고 3 없어야. 1 빠짐 (+1 op). 3 없음 → OK. 총 1.")}</div>
              <div><b>mex = 4:</b> {t(E, "0, 1, 2, 3 in. Missing 1 and 3 (need 2 ops). Total = 2.", "0, 1, 2, 3 있어야. 1 과 3 빠짐 (+2 ops). 총 2.")}</div>
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Interactive: drag mex slider. */
    {
      type: "reveal",
      narr: t(E,
        "Drag the target mex slider. The simulator shows which values are missing (need to add) and how many copies of mex must be removed.",
        "목표 mex 슬라이더 드래그. 빠진 값 (추가해야) 과 제거해야 할 mex 개수 보여줘요."),
      content: (<MexesSlider E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      type: "quiz",
      narr: t(E,
        "Think about the formula: ops = max(missing values in {0..mex−1}, count of mex).",
        "공식 생각: ops = max({0..mex−1} 에서 빠진 값 수, mex 개수)."),
      question: t(E,
        "a = [0, 1, 1, 3]. Min ops to make mex = 2?",
        "a = [0, 1, 1, 3]. mex = 2 만드는 최소 ops?"),
      options: ["0", "1", "2", "3"],
      correct: 0,
      explain: t(E,
        "Need 0 and 1 present (both present ✓), and 2 absent (no 2 in array ✓). Already mex = 2! → 0 ops.",
        "0 과 1 있어야 (둘 다 ✓), 2 없어야 (2 없음 ✓). 이미 mex = 2! → 0 ops."),
    },

    /* 1-5 — Input quiz. */
    {
      type: "input",
      narr: t(E,
        "a = [0, 0, 0]. Min ops to make mex = 1?",
        "a = [0, 0, 0]. mex = 1 만드는 최소 ops?"),
      question: t(E,
        "Min ops for a = [0, 0, 0] to make mex = 1?",
        "a = [0, 0, 0] 의 mex = 1 만들기 최소 ops?"),
      hint: t(E,
        "Need 0 present (✓), 1 absent (✓). Already mex = 1! → 0 ops.",
        "0 있어야 (✓), 1 없어야 (✓). 이미 mex = 1! → 0 ops."),
      answer: 0,
    },
  ];
}

export function makeMexesCh2(E, lang = "py") {
  return [
    /* 2-1 — Plan: count + missing. */
    {
      type: "reveal",
      narr: t(E,
        "Plan: count how many of each value, then for each target mex i compute (a) how many of {0..i−1} are missing, and (b) how many copies of i exist. Min ops = max of those two.",
        "계획: 값별 개수 세고, 각 목표 mex i 마다 (a) {0..i−1} 에서 빠진 개수, (b) i 의 개수. 최소 ops = 둘 중 큰 값."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Count value frequencies", "값 빈도 세기"), code: "cnt[v] = number of elements equal to v", color: "#7c3aed" },
              { n: 2, label: t(E, "missing[i] = count of v ∈ {0..i−1} with cnt[v] == 0", "missing[i] = {0..i−1} 중 cnt[v] == 0 인 v 개수"), code: "missing[i] = missing[i-1] + (cnt[i-1] == 0)", color: "#0891b2" },
              { n: 3, label: t(E, "For each i: ops = max(missing[i], cnt[i])", "각 i: ops = max(missing[i], cnt[i])"), code: "print(max(missing[i], cnt[i]))", color: "#16a34a" },
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

    /* 2-2..2-N — sections */
    ...getMexesSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the code step by step.", "단계별로 코드 작성.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
