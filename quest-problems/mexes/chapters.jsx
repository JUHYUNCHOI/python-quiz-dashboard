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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c3aed" }}>Making Mexes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #7c3aed", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output N+1 lines — for each target mex 0..N, the minimum element changes to make the array's mex equal that target.",
                "N+1 줄 출력 — 각 목표 mex 0..N 에 대해, 배열의 mex 를 그 값으로 만드는 최소 원소 변경 수.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "An array of N non-negative integers (each ≤ N). One operation = change ONE element to ANY non-negative integer.",
                    "음이 아닌 정수 N 개 배열 (각 ≤ N). 한 번의 연산 = 원소 하나를 아무 음이 아닌 정수로 바꾸기.")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: C.text }}>
              <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
                {t(E, "What is mex?", "mex 가 뭐?")}
              </div>
              {t(E, "The MINIMUM EXcluded non-negative integer — the smallest non-negative integer that is NOT in the array.",
                    "MINIMUM EXcluded — 배열에 들어있지 않은 가장 작은 음이 아닌 정수.")}
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#5b21b6" }}>
                mex([0, 1, 3]) = 2 &nbsp;&nbsp; mex([1, 2, 3]) = 0 &nbsp;&nbsp; mex([0, 1, 2]) = 3
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55, padding: "8px 10px", background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8 }}>
              <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`4
2 2 2 0`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`1
0
3
1
2`}
              </div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
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

    /* 1-2b — DERIVE why max, not sum. Sample a = [2,2,2,0], target mex = 2. */
    {
      type: "quiz",
      narr: t(E,
        "Back to mex = 2 on a = [2, 2, 2, 0]. Count the two jobs separately: values missing from {0, 1} = 1 (only the value 1 is absent). Copies of 2 to remove = 3.",
        "다시 a = [2, 2, 2, 0] 의 mex = 2. 두 가지 일을 따로 세 봐: {0, 1} 중 빠진 값 = 1 (값 1 만 없음). 제거할 2 의 개수 = 3."),
      question: t(E,
        "If we just ADD them: 1 (fill missing) + 3 (remove 2s) = 4. But the real answer is 3. Why is adding too many?",
        "그냥 더하면: 1 (빠진 값 채우기) + 3 (2 제거) = 4. 그런데 진짜 답은 3. 왜 더하면 너무 많을까?"),
      options: [
        t(E,
          "The op that turns a 2 into a 1 does BOTH jobs — removes a 2 AND fills the missing 1 — so it's counted once, not twice. Cost = max(1, 3) = 3.",
          "2 를 1 로 바꾸는 연산 한 번이 두 일을 동시에 해 — 2 를 제거하고 + 빠진 1 을 채워 — 그래서 두 번이 아니라 한 번. 비용 = max(1, 3) = 3."),
        t(E,
          "Removing a 2 is free, so we only pay for filling the missing 1. Cost = 1.",
          "2 제거는 공짜라서 빠진 1 채우기만 비용. 비용 = 1."),
        t(E,
          "We must remove all three 2s and separately add the 1, so 4 really is correct.",
          "2 세 개를 다 지우고 따로 1 을 더해야 하니 4 가 맞다."),
        t(E,
          "Adding is right but we double-counted the 0, so it's 4 − 1 = 3.",
          "더하기가 맞지만 0 을 두 번 세서 4 − 1 = 3."),
      ],
      correct: 0,
      explain: t(E,
        "One operation can do two things at once: changing a 2 into the missing 1 BOTH removes a copy of 2 AND supplies the 1. Summing double-counts that shared op. The cost is the bigger of the two needs — max(missing, count of i) — not their sum. Here max(1, 3) = 3.",
        "한 번의 연산이 두 일을 동시에 해: 2 를 빠진 1 로 바꾸면 2 한 개를 제거함과 동시에 1 을 채워. 더하면 이 공유 연산을 두 번 세는 셈. 비용은 두 필요 중 더 큰 쪽 — max(빠진 값, i 의 개수) — 이지 합이 아냐. 여기선 max(1, 3) = 3."),
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
        "For mex = 2 you need 0 present, 1 present, 2 absent.  Look at the array.",
        "mex = 2 가 되려면 0 있고, 1 있고, 2 없어야. 배열을 살펴봐."),
      question: t(E,
        "a = [0, 1, 1, 3]. Min ops to make mex = 2?",
        "a = [0, 1, 1, 3]. mex = 2 만드는 최소 ops?"),
      options: ["0", "1", "2", "3"],
      correct: 0,
      explain: t(E,
        "0 ✓, 1 ✓, no 2 ✓ — already mex = 2. So 0 ops.",
        "0 ✓, 1 ✓, 2 없음 ✓ — 이미 mex = 2. 0 ops."),
    },

    /* 1-5 — Input quiz: max BITES here (remove side dominates). */
    {
      type: "input",
      narr: t(E,
        "a = [0, 2, 2], target mex = 2. Count both jobs: missing from {0, 1} (0 ✓ present, 1 absent) and copies of 2 to remove. Then take the bigger one — max, not sum.",
        "a = [0, 2, 2], 목표 mex = 2. 두 일을 세 봐: {0, 1} 중 빠진 값 (0 ✓ 있음, 1 없음) 과 제거할 2 의 개수. 그다음 더 큰 쪽 — 합이 아니라 max."),
      question: t(E,
        "Min ops for a = [0, 2, 2] to make mex = 2?",
        "a = [0, 2, 2] 의 mex = 2 만들기 최소 ops?"),
      hint: t(E,
        "Missing = 1 (only the 1 is absent). Copies of 2 to remove = 2. Answer = max(1, 2). One removed 2 can become the missing 1.",
        "빠진 값 = 1 (1 만 없음). 제거할 2 = 2 개. 답 = max(1, 2). 제거하는 2 하나가 빠진 1 이 될 수 있어."),
      answer: 2,
    },
  ];
}

export function makeMexesCh2(E, lang = "py") {
  return [
    /* 2-1..2-N — sections directly. */
    ...getMexesSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Count each value, then for each target mex i: ops = max((missing values in {0..i−1}), (count of i)).  Sections build it one piece at a time.",
            "값별 개수 세고, 각 목표 mex i 마다: ops = max((빠진 값 수 in {0..i−1}), (i 의 개수)). 아래 섹션이 한 단락씩 쌓아요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
