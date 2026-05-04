import { C, t } from "@/components/quest/theme";
import { getMooin3Sections } from "./components";

export const SOLUTION_CODE = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1  # 0-indexed",
  "    best = -1",
  "    # Brute force: try all triplets i < j < k",
  "    # 'moo' = s[i] != s[j] == s[k]",
  "    # value = (j-i) * (k-j)",
  "    # Optimization: fix j, maximize (j-i) and (k-j)",
  "    for j in range(l+1, r):",
  "        # Find leftmost i != s[j]",
  "        left_dist = 0",
  "        for i in range(l, j):",
  "            if s[i] != s[j]:",
  "                left_dist = max(left_dist, j - i)",
  "                break",
  "        if left_dist == 0:",
  "            # try from left",
  "            for i in range(l, j):",
  "                if s[i] != s[j]:",
  "                    left_dist = j - i",
  "                    break",
  "        # Find rightmost k == s[j]",
  "        right_dist = 0",
  "        for k in range(r, j, -1):",
  "            if s[k] == s[j]:",
  "                right_dist = k - j",
  "                break",
  "        if left_dist > 0 and right_dist > 0:",
  "            best = max(best, left_dist * right_dist)",
  "    print(best)",
];

export function makeMooin3Ch1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Find 'moo' triplets in a string!\nA 'moo' is (i,j,k) where s[i]≠s[j]=s[k].\nMaximize (j-i)×(k-j) in each query range.\n🐄", "문자열에서 'moo' 삼중쌍 찾기! 'moo'는 s[i]≠s[j]=s[k]인 (i,j,k). 각 쿼리 범위에서 (j-i)×(k-j)를 최대화. 🐄"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐄</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>It's Mooin' Time III</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "String s, Q queries [l,r].\nFind max (j-i)×(k-j) where s[i]≠s[j]=s[k] and l≤i<j<k≤r.", "문자열 s, Q개 쿼리 [l,r].\ns[i]≠s[j]=s[k]이고 l≤i<j<k≤r인 (j-i)×(k-j) 최대값.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A 'moo' means: first character differs, but second and third match.\nLike 'abb', 'xzz', etc.", "'moo'란: 첫 문자는 다르고, 둘째와 셋째는 같아. 예: 'abb', 'xzz' 등."),
      question: t(E,
        "Which is a valid 'moo' triplet?",
        "유효한 'moo' 삼중쌍은?"),
      options: [
        "s[i]='a', s[j]='b', s[k]='b'",
        "s[i]='a', s[j]='a', s[k]='b'",
        "s[i]='a', s[j]='b', s[k]='a'",
      ],
      correct: 0,
      explain: t(E, "s[i]≠s[j] ✓ and s[j]=s[k] ✓. That's a moo!", "s[i]≠s[j] ✓ 그리고 s[j]=s[k] ✓. moo야!"),
    },
    {
      type: "reveal",
      narr: t(E,
        "Try every triplet (i, j, k) in range [1, 4] of s='abba'.\nOnly one is a valid 'moo'.",
        "s='abba', 범위 [1, 4]의 모든 트리플 (i, j, k)을 시도.\n유효한 'moo'는 단 하나."),
      content: (
        <div style={{ padding: 16 }}>
          {/* string visualization */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#7c5cfc", fontWeight: 700, textAlign: "center", marginBottom: 4 }}>
              s = 'abba'
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {"abba".split("").map((ch, i) => {
                const idx = i + 1;
                return (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#9ca3af", marginBottom: 2 }}>idx={idx}</div>
                    <div style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
                      background: "#fff", border: `2px solid #7c5cfc`, color: "#7c5cfc",
                    }}>{ch}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* triplet candidates table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { ijk: [1,2,3], chars: "abb", note: "s[i]≠s[j] ✓, s[j]=s[k] ✓", val: "(2-1)×(3-2) = 1", ok: true },
              { ijk: [1,2,4], chars: "aba", note: "s[j]=s[k]? b≠a ✗", val: "—", ok: false },
              { ijk: [1,3,4], chars: "aba", note: "s[j]=s[k]? b≠a ✗", val: "—", ok: false },
              { ijk: [2,3,4], chars: "bba", note: "s[i]≠s[j]? b=b ✗", val: "—", ok: false },
            ].map((t, i) => (
              <div key={i} style={{
                background: t.ok ? "#dcfce7" : "#f8fafc",
                border: `1.5px solid ${t.ok ? "#86efac" : "#e5e7eb"}`,
                borderRadius: 6, padding: "6px 10px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace", flexWrap: "wrap", gap: 4,
              }}>
                <span style={{ fontWeight: 800, color: t.ok ? "#15803d" : "#64748b" }}>
                  ({t.ijk.join(",")}) = '{t.chars}'
                </span>
                <span style={{ color: t.ok ? "#15803d" : "#64748b" }}>{t.note}</span>
                <span style={{ fontWeight: 800, color: t.ok ? "#15803d" : "#cbd5e1" }}>{t.val}</span>
              </div>
            ))}
          </div>
        </div>),
    },
    {
      type: "input",
      narr: t(E, "What's the max value?", "최대값은?"),
      question: t(E, "Max value for s='abba', range [1,4]?", "s='abba', 범위 [1,4]의 최대값?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Drag j and watch how best i (left, different) and best k (right, same) shift.\nProduct (j-i)(k-j) shown live.", "j를 드래그하면서 best i (왼쪽, 다름)와 best k (오른쪽, 같음)가 어떻게 변하는지 봐. 곱 (j-i)(k-j) 실시간."),
    },
  ];
}

export function makeMooin3Ch2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Fix j (middle), then maximize (j − i) × (k − j) by going as far as possible on each side.",
        "j (중간) 고정 → 양쪽으로 최대한 멀리 가서 (j − i) × (k − j) 최대화."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Per query, loop j", "쿼리당 j 순회"), code: "for j in range(l+1, r):", color: "#7c5cfc" },
              { n: 2, label: t(E, "Best i (farthest left, different)", "최선 i (왼쪽 끝, 다름)"), code: "i = first idx in [l, j) where s[i] != s[j]", color: "#0891b2" },
              { n: 3, label: t(E, "Best k (farthest right, same)", "최선 k (오른쪽 끝, 같음)"), code: "k = last idx in (j, r] where s[k] == s[j]", color: "#16a34a" },
              { n: 4, label: t(E, "Update best product", "최댓값 갱신"), code: "best = max(best, (j − i) × (k − j))", color: "#dc2626" },
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
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>O(Q · N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "Q queries × O(N²) brute scan", "Q 쿼리 × O(N²) 완전탐색")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the brute-force solution step by step.", "완전탐색을 단계별로 만들자."),
      sections: getMooin3Sections(E),
    },
  ];
}
