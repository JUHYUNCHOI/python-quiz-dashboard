import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))  # FJ's breeds",
  "b = list(map(int, input().split()))  # Bessie's breeds",
  "",
  "# Count matching positions",
  "match = 0",
  "for i in range(N):",
  "    if a[i] == b[i]:",
  "        match += 1",
  "",
  "# Count frequency of each breed in a and b",
  "from collections import Counter",
  "ca = Counter(a)",
  "cb = Counter(b)",
  "",
  "# Max possible matches = sum of min(ca[x], cb[x]) for each breed x",
  "max_match = sum(min(ca[x], cb.get(x, 0)) for x in ca)",
  "",
  "# Can we get all N matching? Only if max_match >= N",
  "# Answer: how many swaps in b to maximize matches with a?",
  "# Actually: min swaps = N - max_match is NOT the question",
  "# Question: count arrangements where at least half match",
  "",
  "# Simpler: just count current matches and max possible",
  "print(match)",
  "print(max_match)",
];

export function makeCheckupsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows with breed types. He checks them against Bessie's list. How many match? And what's the maximum possible? 🐮",
        "FJ에게 N마리 소의 품종이 있어. 베시의 리스트와 비교해서 몇 개가 일치하는지, 최대 얼마나 일치시킬 수 있는지 찾자! 🐮"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐮</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Cow Checkups</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #1</div>
          <div style={{ marginTop: 12, background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Two arrays a[] and b[] of length N. Count positions where a[i]==b[i]. Then find max matches by rearranging b.",
              "길이 N인 배열 a[]와 b[]. a[i]==b[i]인 위치 세기. 그리고 b를 재배열해서 최대 일치 찾기.")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Example: a=[1,2,3,1], b=[1,3,2,1]. Current matches: positions 0 and 3 (both have 1). That's 2 matches!",
        "예시: a=[1,2,3,1], b=[1,3,2,1]. 현재 일치: 위치 0과 3 (둘 다 1). 2개 일치!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 14 }}>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {[1,2,3,1].map((v, i) => (
                <div key={`a${i}`} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontWeight: 900,
                  background: [1,3,2,1][i] === v ? C.okBg : "#fff",
                  border: `2px solid ${[1,3,2,1][i] === v ? C.okBd : C.border}`,
                  color: [1,3,2,1][i] === v ? C.ok : C.text,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {[1,3,2,1].map((v, i) => (
                <div key={`b${i}`} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontWeight: 900,
                  background: [1,2,3,1][i] === v ? C.okBg : "#fff",
                  border: `2px solid ${[1,2,3,1][i] === v ? C.okBd : C.border}`,
                  color: [1,2,3,1][i] === v ? C.ok : C.text,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 4 }}>
              {t(E, "Top: a[], Bottom: b[]. Green = match!", "위: a[], 아래: b[]. 초록 = 일치!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "For max matches: count how many of each breed appear in a[] and b[]. For breed x, we can match min(count_a[x], count_b[x]) cows.",
        "최대 일치: 각 품종이 a[]와 b[]에 몇 번 나오는지 세고. 품종 x에 대해 min(count_a[x], count_b[x])마리를 매칭."),
      question: t(E,
        "a=[1,1,2], b=[1,2,2]. Max matches by rearranging b?",
        "a=[1,1,2], b=[1,2,2]. b를 재배열한 최대 일치는?"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E,
        "Breed 1: min(2,1)=1. Breed 2: min(1,2)=1. Total max = 2. (Can't get 3 since b only has one '1')",
        "품종 1: min(2,1)=1. 품종 2: min(1,2)=1. 최대 합 = 2. (b에 '1'이 1개뿐이라 3은 불가)"),
    },
    {
      type: "input",
      narr: t(E,
        "a=[3,3,3,3,3], b=[3,3,1,1,1]. How many current matches (same position)?",
        "a=[3,3,3,3,3], b=[3,3,1,1,1]. 현재 일치 수 (같은 위치)?"),
      question: t(E, "Matches at same positions?", "같은 위치에서 일치 수?"),
      answer: 2,
    },
  ];
}

export function makeCheckupsCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The solution uses Counter (frequency map). Count frequencies in both arrays, then sum min of each breed's counts.",
        "솔루션은 Counter(빈도맵)를 써. 두 배열의 빈도를 세고, 각 품종 빈도의 min을 합산."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: C.accent, marginBottom: 6 }}>
              {t(E, "🔧 Algorithm", "🔧 알고리즘")}
            </div>
            {t(E,
              "1. Count breed frequencies in a[] → Counter(a)\n2. Count breed frequencies in b[] → Counter(b)\n3. For each breed x: add min(count_a[x], count_b[x])\n4. That's the maximum possible matches!",
              "1. a[]의 품종 빈도 → Counter(a)\n2. b[]의 품종 빈도 → Counter(b)\n3. 각 품종 x: min(count_a[x], count_b[x]) 더하기\n4. 그게 가능한 최대 일치!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Time complexity: counting frequencies is O(N), then iterating over breeds is at most O(N). Total: O(N)!",
        "시간복잡도: 빈도 세기 O(N), 품종 순회 최대 O(N). 합계: O(N)!"),
      question: t(E, "What data structure is best for counting frequencies?", "빈도 세기에 가장 좋은 자료구조는?"),
      options: [
        t(E, "Dictionary / Counter", "딕셔너리 / Counter"),
        t(E, "Sorted array", "정렬된 배열"),
        t(E, "Linked list", "링크드 리스트"),
      ],
      correct: 0,
      explain: t(E, "Dictionary gives O(1) lookup and increment. Counter is Python's built-in frequency map!", "딕셔너리는 O(1) 조회와 증가. Counter는 파이썬 내장 빈도맵!"),
    },
    {
      type: "code",
      narr: t(E, "Clean and simple solution!", "깔끔하고 간단한 솔루션!"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
