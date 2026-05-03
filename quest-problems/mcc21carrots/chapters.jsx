import { C, t } from "@/components/quest/theme";
import { getMcc21CarrotsSections } from "./components";

export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "found = False",
  "for i in range(N):",
  "    for j in range(i+1, N):",
  "        for k in range(j+1, N):",
  "            s = a[i] + a[j] + a[k]",
  "            if s % 3 == 0:",
  "                print(s)",
  "                found = True",
  "                break",
  "        if found: break",
  "    if found: break",
  "",
  "if not found:",
  "    print(-1)",
];

export function makeMcc21CarrotsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A rabbit has N baskets of carrots. Pick 3 baskets so that the total number of carrots is divisible by a given number. Use brute force to check all combinations!",
        "토끼가 N개의 바구니에 당근을 가지고 있어. 3개의 바구니를 골라서 당근 합이 특정 수로 나누어떨어지게 해! 모든 조합을 확인하는 브루트포스를 써!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udd55"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Carrots</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Try all C(N,3) combinations of 3 baskets. Check if their sum is divisible by the target. Brute force O(N^3).",
              "핵심: 3개 바구니의 모든 C(N,3) 조합을 시도해. 합이 목표로 나누어떨어지는지 확인. 브루트포스 O(N^3).")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Given baskets [3, 6, 9], their sum is 18. Is 18 divisible by 3?",
        "바구니 [3, 6, 9]의 합은 18이야. 18은 3으로 나누어떨어질까?"),
      question: t(E,
        "Baskets [3, 6, 9]. Sum = 18. Is 18 divisible by 3?",
        "바구니 [3, 6, 9]. 합 = 18. 18은 3으로 나누어떨어져?"),
      options: [
        t(E, "Yes, 18 / 3 = 6", "맞아, 18 / 3 = 6"),
        t(E, "No, it has remainder", "아니, 나머지가 있어"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 18 / 3 = 6 with no remainder.",
        "맞아! 18 / 3 = 6, 나머지 없어."),
    },
    {
      type: "input",
      narr: t(E,
        "What is the sum of baskets [3, 6, 9]?",
        "바구니 [3, 6, 9]의 합은?"),
      question: t(E,
        "Baskets = [3, 6, 9]. What is their sum?",
        "바구니 = [3, 6, 9]. 합은 얼마야?"),
      hint: t(E, "3 + 6 + 9 = ?", "3 + 6 + 9 = ?"),
      answer: 18,
    },
  ];
}

export function makeMcc21CarrotsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Use triple nested loops to try all combinations. O(N^3) brute force.",
        "삼중 반복문으로 모든 조합을 시도해. O(N^3) 브루트포스."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N^3)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Three nested loops pick every triple (i, j, k). Check if a[i]+a[j]+a[k] is divisible by the target. Print and break when found.",
              "삼중 반복문으로 모든 (i, j, k) 조합 선택. a[i]+a[j]+a[k]가 목표로 나누어떨어지는지 확인. 찾으면 출력하고 중단.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21CarrotsSections(E),
    },
  ];
}
