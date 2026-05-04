import { C, t } from "@/components/quest/theme";
import { getCowPhotosSections } from "./components";

export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    from collections import Counter",
  "    freq = Counter(h)",
  "    # Bitonic + symmetric + no adjacent dups",
  "    # = palindrome that increases then decreases",
  "    # = odd-length: [a,b,...,peak,...,b,a]",
  "    # Each value except peak appears even times",
  "    # Peak appears odd times (1)",
  "    # Maximize: greedily use pairs of each value",
  "    total = 0",
  "    has_odd = False",
  "    for v, cnt in freq.items():",
  "        total += (cnt // 2) * 2",
  "        if cnt % 2 == 1:",
  "            has_odd = True",
  "    if has_odd:",
  "        total += 1  # one peak",
  "    # But need no adjacent duplicates in the result",
  "    # For palindrome: each pair contributes 2 positions",
  "    # All pairs must be different values → already handled",
  "    print(total)",
];

export function makeCowPhotosCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Arrange cows in a bitonic, symmetric sequence with no adjacent duplicates.\nMaximize the number of cows in the photo!\n📸", "소들을 바이토닉, 대칭, 인접 중복 없는 배열로! 사진에 넣을 소의 수를 최대화! 📸"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📸</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>More Cow Photos</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Bitonic (↑ then ↓) + Symmetric (palindrome) + No adjacent duplicates. Find max cows that fit!",
              "바이토닉 (↑ 후 ↓) + 대칭 (팰린드롬) + 인접 중복 금지. 맞는 최대 소 수를 찾아!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Example: heights [1,1,2,3].\nValid arrangement: [1,3,1] — bitonic ✓, symmetric ✓, no adjacent dups ✓.\nLength = 3.", "예: 키 [1,1,2,3]. 유효한 배열: [1,3,1] — 바이토닉 ✓, 대칭 ✓, 인접 중복 없음 ✓. 길이 = 3."),
      question: t(E,
        "Which of these is a valid arrangement?",
        "유효한 배열은?"),
      options: [
        "[1, 2, 3, 2, 1]",
        "[1, 2, 2, 1]",
        "[3, 2, 1, 2, 3]",
      ],
      correct: 0,
      explain: t(E, "Bitonic ✓, palindrome ✓, no adjacent dups ✓. [1,2,2,1] has adjacent 2s!", "바이토닉 ✓, 팰린드롬 ✓, 인접 중복 없음 ✓. [1,2,2,1]은 인접 2가 있어!"),
    },
    {
      type: "input",
      narr: t(E,
        "Heights = [3,3,2,1].\nCan we use all 4?\n[1,3,3,1] has adjacent 3s.\n[1,3,1] works but only uses 3.\nBest length?", "키 = [3,3,2,1]. 4개 다 쓸 수 있어? [1,3,3,1]은 인접 3. [1,3,1]은 되지만 3개만. 최대 길이?"),
      question: t(E, "Max valid photo length for [3,3,2,1]?", "[3,3,2,1]의 최대 유효 사진 길이?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "3 phases: heights → Counter → final palindrome arrangement.", "3단계: 키 → Counter → 최종 팰린드롬 배열."),
    },
  ];
}

export function makeCowPhotosCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Each ring of the palindrome uses 2 cows of the same value (one on each side of the peak).\nA value can be a ring only if its count ≥ 2.",
        "팰린드롬 각 링은 같은 값 2마리 사용 (피크 양쪽).\n빈도 ≥ 2인 값만 링이 될 수 있음."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Frequency count", "빈도 세기"), code: "freq = Counter(h)", color: "#d97706" },
              { n: 2, label: t(E, "Count pair-eligible breeds", "페어 가능 품종 세기"), code: "pairs = sum(1 for c in freq.values() if c >= 2)", color: "#0891b2" },
              { n: 3, label: t(E, "2 × pairs + peak", "2 × pairs + 피크"), code: "ans = 2 * pairs + (1 if any cow else 0)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass for Counter + breed loop", "Counter 한 번 + 품종 루프")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the frequency-based solution step by step.", "빈도 기반 솔루션을 단계별로 만들자."),
      sections: getCowPhotosSections(E),
    },
    {
      type: "runner",
      narr: t(E, "Try your own heights.", "직접 키 시도."),
    },
  ];
}
