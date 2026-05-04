import { C, t } from "@/components/quest/theme";
import { getFeb23Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "s = input()",
  "results = set()",
  "",
  "# find positions of 'F'",
  "f_positions = [i for i, c in enumerate(s) if c == 'F']",
  "n_f = len(f_positions)",
  "",
  "# try all 2^|F| assignments",
  "for mask in range(1 << n_f):",
  "    arr = list(s)",
  "    for j in range(n_f):",
  "        arr[f_positions[j]] = 'B' if (mask >> j) & 1 else 'E'",
  "    # count consecutive same pairs",
  "    excitement = 0",
  "    for i in range(len(arr) - 1):",
  "        if arr[i] == arr[i+1]:",
  "            excitement += 1",
  "    results.add(excitement)",
  "",
  "print(len(results))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie sends text messages using only B, E, and F.\nLet's figure out how many excitement levels are possible!\n🔤", "베시는 B, E, F만 사용해서 메시지를 보내! 가능한 흥분 수준이 몇 개인지 알아보자! 🔤"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔤</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>FEB</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "String of B, E, F chars. F can be B or E. Count consecutive same-char pairs = excitement. Find all possible excitement levels!",
              "B, E, F로 이루어진 문자열. F는 B 또는 E가 될 수 있어. 연속 같은 문자 쌍 = 흥분도. 가능한 흥분도의 개수를 구해!")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "The excitement level is the number of positions where adjacent characters are the same.\nFor example, 'BEEB' has 1 pair (E,E at positions 2-3).", "흥분도는 인접한 문자가 같은 위치의 수야. 예를 들어 'BEEB'은 1쌍 (위치 2-3의 E,E)이 있어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Example: BEEB", "예시: BEEB")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
              {["B","E","E","B"].map((ch, i) => (
                <div key={i} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 800,
                  background: ch === "B" ? "#dbeafe" : "#dcfce7",
                  border: `2.5px solid ${ch === "B" ? "#93c5fd" : "#86efac"}`,
                  color: ch === "B" ? "#1d4ed8" : "#166534",
                }}>{ch}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "Pairs: B≠E, E=E ✅, E≠B → excitement = 1", "쌍: B≠E, E=E ✅, E≠B → 흥분도 = 1")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Let's think about 'BEEF'.\nIf F→B, we get 'BEEB' (excitement 1).\nIf F→E, we get 'BEEE' (excitement 2).\nGot it?", "'BEEF'를 생각해보자. F→B이면 'BEEB' (흥분도 1). F→E이면 'BEEE' (흥분도 2). 이해했지?"),
      question: t(E, "What is the excitement of 'BEEE'?", "'BEEE'의 흥분도는?"),
      hint: t(E, "Count consecutive same pairs: B≠E, E=E, E=E", "연속 같은 쌍 세기: B≠E, E=E, E=E"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "B≠E, E=E ✅, E=E ✅ → 2 pairs!", "B≠E, E=E ✅, E=E ✅ → 2쌍!"),
    },
    {
      type: "input",
      narr: t(E,
        "Now try this: for the string 'BF', F can be B or E.\nIf F→B: 'BB' has 1 match.\nIf F→E: 'BE' has 0 matches.\nHow many distinct excitement levels?", "이제 해보자: 문자열 'BF'에서 F는 B 또는 E. F→B: 'BB'는 1쌍. F→E: 'BE'는 0쌍. 서로 다른 흥분도는 몇 개?"),
      question: t(E, "How many possible excitement levels for 'BF'?", "'BF'의 가능한 흥분도 개수는?"),
      hint: t(E, "F→B gives 1, F→E gives 0. Two distinct values!", "F→B는 1, F→E는 0. 서로 다른 값 2개!"),
      answer: 2,
    },
    {
      type: "reveal",
      narr: t(E,
        "The key insight: try all possible F assignments (2^count_of_F), compute excitement for each, then count distinct values!", "핵심: 가능한 모든 F 할당(2^F개수)을 시도하고, 각각의 흥분도를 계산한 후, 서로 다른 값의 개수를 세!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Algorithm", "알고리즘")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              {t(E,
                "1. Find all F positions\n2. Try all 2^|F| assignments (B or E)\n3. For each, count consecutive same pairs\n4. Collect distinct excitement values\n5. Answer = size of that set",
                "1. F 위치 찾기\n2. 모든 2^|F| 할당 시도 (B 또는 E)\n3. 각각에서 연속 같은 쌍 세기\n4. 서로 다른 흥분도 모으기\n5. 답 = 집합의 크기")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getFeb23Sections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "Quick check: what data structure do we use to collect distinct excitement levels?", "퀴즈: 서로 다른 흥분도를 모으는 데 어떤 자료구조를 쓸까?"),
      question: t(E, "Which data structure collects distinct values?", "서로 다른 값을 모으는 자료구조는?"),
      options: [t(E, "List", "리스트"), t(E, "Set", "집합"), t(E, "Dictionary", "딕셔너리")],
      correct: 1,
      explain: t(E, "A set automatically removes duplicates!", "집합은 자동으로 중복을 제거해!"),
    },
    {
      type: "input",
      narr: t(E,
        "If the string has 3 F's, how many total assignments do we try?", "문자열에 F가 3개면, 총 몇 가지 할당을 시도할까?"),
      question: t(E, "2^3 = ?", "2^3 = ?"),
      hint: t(E, "Each F has 2 choices: B or E", "각 F는 2가지 선택: B 또는 E"),
      answer: 8,
    },
  ];
}
