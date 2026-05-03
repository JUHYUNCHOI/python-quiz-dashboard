import { C, t } from "@/components/quest/theme";
import { getAirCond1Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "current = list(map(int, input().split()))",
  "preferred = list(map(int, input().split()))",
  "",
  "# Compute difference array",
  "d = [preferred[i] - current[i] for i in range(N)]",
  "",
  "# Answer = sum of positive increases + sum of negative decreases",
  "# Think of it like painting: when diff goes up, new strokes needed",
  "ans = 0",
  "prev = 0",
  "for i in range(N):",
  "    if d[i] > prev:",
  "        ans += d[i] - prev  # need more positive strokes",
  "    elif d[i] < prev:",
  "        ans += prev - d[i]  # need more negative strokes (if sign flips)",
  "    prev = d[i]",
  "",
  "# Handle the boundary at the end",
  "ans += abs(prev)",
  "",
  "# Simpler equivalent: ans = sum(max(0, d[i]-d[i-1]) for increases)",
  "#                       + sum(max(0, d[i-1]-d[i]) for decreases)",
  "# with d[-1] = d[N] = 0",
  "",
  "# Even simpler:",
  "d2 = [preferred[i] - current[i] for i in range(N)]",
  "ans2 = abs(d2[0])",
  "for i in range(1, N):",
  "    ans2 += max(0, d2[i] - d2[i-1])  # positive jumps",
  "    ans2 += max(0, d2[i-1] - d2[i])  # handled by abs at end? No.",
  "# Correct approach:",
  "ans3 = 0",
  "ext = [0] + d2 + [0]",
  "for i in range(1, len(ext)):",
  "    if ext[i] > ext[i-1]:",
  "        ans3 += ext[i] - ext[i-1]",
  "",
  "print(ans3)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAirCond1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N stalls with current and preferred temperatures. Each command adjusts a consecutive range by +1 or -1. Find the minimum number of commands!",
        "N개 칸에 현재 온도와 원하는 온도가 있어. 각 명령은 연속 구간을 +1 또는 -1 조절해. 최소 명령 수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf21\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Air Cownditioning</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Compute diff d[i] = preferred[i] - current[i]. The answer equals the sum of all positive increases in the diff array (like the painting/histogram problem).",
              "핵심: 차이 d[i] = preferred[i] - current[i] 계산. 답은 차이 배열에서 양의 증가분의 합 (페인팅/히스토그램 문제와 같아).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Think of the diff array like a histogram. Each horizontal stroke covers a range. How many strokes do we need?",
        "차이 배열을 히스토그램처럼 생각해. 각 수평 선은 구간을 커버해. 몇 개의 선이 필요할까?"),
      question: t(E,
        "diff = [3, 3, 3]. How many commands needed? (One command covers all 3, repeated 3 times)",
        "diff = [3, 3, 3]. 필요한 명령 수? (하나의 명령이 3칸 모두 커버, 3번 반복)"),
      options: [
        t(E, "3 commands", "3번"),
        t(E, "9 commands", "9번"),
        t(E, "1 command", "1번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! One command covers stalls 1-3 with +1, repeated 3 times = 3 total commands.",
        "맞아! 1-3번 칸을 +1하는 명령을 3번 반복 = 총 3번 명령."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "diff = [3, 3, 3]. All same height. One wide stroke repeated 3 times.",
        "diff = [3, 3, 3]. 높이가 모두 같아. 넓은 선 하나를 3번 반복."),
      question: t(E,
        "diff = [3, 3, 3]. Min commands?",
        "diff = [3, 3, 3]. 최소 명령 수?"),
      hint: t(E,
        "All stalls need +3. One command covers all 3 stalls. Repeat 3 times.",
        "모든 칸이 +3 필요. 하나의 명령이 3칸 모두 커버. 3번 반복."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAirCond1Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Compute the diff array, then sum positive jumps (with boundaries at 0). O(N) time!",
        "차이 배열 계산 후, 양의 점프(경계는 0)를 합산. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Extend diff with 0 at both ends. Answer = sum of max(0, d[i] - d[i-1]) for all i. Each positive jump means we need new commands.",
              "diff 양쪽 끝에 0 추가. 답 = 모든 i에 대해 max(0, d[i] - d[i-1])의 합. 양의 점프마다 새 명령이 필요해.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getAirCond1Sections(E),
    },
  ];
}
