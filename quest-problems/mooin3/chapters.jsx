import { C, t } from "@/components/quest/theme";

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
        "Find 'moo' triplets in a string! A 'moo' is (i,j,k) where s[i]≠s[j]=s[k]. Maximize (j-i)×(k-j) in each query range. 🐄",
        "문자열에서 'moo' 삼중쌍 찾기! 'moo'는 s[i]≠s[j]=s[k]인 (i,j,k). 각 쿼리 범위에서 (j-i)×(k-j)를 최대화. 🐄"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐄</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>It's Mooin' Time III</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "String s, Q queries [l,r]. Find max (j-i)×(k-j) where s[i]≠s[j]=s[k] and l≤i<j<k≤r.",
              "문자열 s, Q개 쿼리 [l,r]. s[i]≠s[j]=s[k]이고 l≤i<j<k≤r인 (j-i)×(k-j) 최대값.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "A 'moo' means: first character differs, but second and third match. Like 'abb', 'xzz', etc.",
        "'moo'란: 첫 문자는 다르고, 둘째와 셋째는 같아. 예: 'abb', 'xzz' 등."),
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
      type: "input",
      narr: t(E,
        "s='abba', range [1,4]. Triplets: (1,2,3)='abb' → value=(2-1)×(3-2)=1. (1,3,4)='bba'? s[1]='a'≠s[3]='b', s[3]='b'=s[4]='a'? No. (1,2,4)='aba'? s[2]≠s[4]. Try (1,3,4): s[1]='a', s[3]='b', s[4]='a' → s[3]≠s[4]. Max?",
        "s='abba', 범위 [1,4]. (1,2,3)='abb' → 값=(2-1)×(3-2)=1. 최대값은?"),
      question: t(E, "Max value for s='abba', range [1,4]?", "s='abba', 범위 [1,4]의 최대값?"),
      answer: 1,
    },
  ];
}

export function makeMooin3Ch2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Key insight: for each middle position j, find the farthest left i with s[i]≠s[j], and farthest right k with s[k]=s[j]. Maximize the product!",
        "핵심: 각 중간 위치 j에서, s[i]≠s[j]인 가장 먼 왼쪽 i와 s[k]=s[j]인 가장 먼 오른쪽 k를 찾아. 곱을 최대화!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(N × Q)</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{t(E, "Fix j, scan left/right", "j 고정, 좌우 스캔")}</div>
        </div>),
    },
    {
      type: "code",
      narr: t(E, "Fix middle, maximize distances!", "중간 고정, 거리 최대화!"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
