import { C, t } from "@/components/quest/theme";
import { getSocDist1Sections, SocDist1Sim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M = map(int, input().split())",
  "intervals = []",
  "for _ in range(M):",
  "    a, b = map(int, input().split())",
  "    intervals.append((a, b))",
  "intervals.sort()",
  "",
  "# can we place all N cows so neighbors are >= D apart?",
  "# greedy: in each interval, place at last+D (or interval start),",
  "# then keep stepping +D inside the same interval",
  "def can_place(D):",
  "    count = 0",
  "    last = -10**18",
  "    for a, b in intervals:",
  "        x = max(a, last + D)",
  "        while x <= b:",
  "            count += 1",
  "            last = x",
  "            if count >= N:",
  "                return True",
  "            x += D",
  "    return False",
  "",
  "# binary search the answer D",
  "lo, hi = 1, intervals[-1][1] - intervals[0][0]",
  "ans = 1",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if can_place(mid):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "print(ans)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has a number line with M disjoint segments where cows can stand. He must place exactly N cows on integer positions inside those segments.\nMaximize the MINIMUM distance between any two cows.",
        "FJ 한테 수직선 위 M 개의 서로 떨어진 구간이 있어서, 소들이 그 구간 안 정수 위치에 설 수 있어요. 정확히 N 마리 소를 배치해야 해요.\n두 소 사이 최소 거리가 가장 크게 되도록 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude37"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Social Distancing I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2020 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum possible minimum distance between any two of the N placed cows.",
                "배치한 N 마리 소 사이 최소 거리의 최댓값을 출력.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 한테 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "M disjoint segments on a number line", "수직선 위 M 개의 서로 떨어진 구간")}</b>
                  {t(E, " — cows can only stand on integer positions inside these segments.",
                        " 이 있어서, 소는 그 구간 안 정수 위치에만 설 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Place EXACTLY ", "정확히 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N cows", "N 마리 소")}</b>
                  {t(E, " in those positions.", " 를 그 위치에 배치해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM possible minimum distance between any two cows", "두 소 사이 최소 거리가 가장 크게 되는 값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🐄 Deep-audit sim — pick D and watch greedy placement */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 8px", marginTop: 6 }}>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>
              🐄 {t(E, "See it: greedy placement vs D", "직접 봐: D 에 따른 그리디 배치")}
            </div>
            <SocDist1Sim E={E} />
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Stalls: \"1001\" means occupied at positions 0 and 3.\nWe need to place 2 more cows.\nWhat's the minimum gap we can achieve?", "축사: \"1001\"은 위치 0과 3에 소가 있어요. 소 2마리를 더 넣어야 해요. 달성할 수 있는 최소 간격은?"),
      question: t(E,
        "Stalls \"10001\": occupied at 0 and 4. Place 2 cows in empty stalls 1,2,3. To maximize minimum distance, best placement?",
        "축사 \"10001\": 0과 4에 소. 빈 칸 1,2,3에 소 2마리 배치. 최소 거리 최대화하려면?"),
      options: [
        t(E, "Place at 1 and 3: min dist = 1", "1과 3에 배치: 최소 거리 = 1"),
        t(E, "Place at 2: only 1 cow, can't place 2 optimally. Min = 1", "2에 배치: 소 1마리만. 최적 배치 불가. 최소 = 1"),
        t(E, "Place at 1 and 2: min dist = 1", "1과 2에 배치: 최소 거리 = 1"),
      ],
      correct: 0,
      explain: t(E,
        "With 2 cows to place in {1,2,3}, the best is positions 1 and 3. Distances: 0-1=1, 1-3=2, 3-4=1. Min distance = 1.",
        "소 2마리를 {1,2,3}에 넣으면, 1과 3이 최적. 거리: 0-1=1, 1-3=2, 3-4=1. 최소 거리 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Stalls \"10001\": positions 0 and 4 occupied, place 2 more cows.\nWhat is the maximum possible minimum distance?", "축사 \"10001\": 0과 4에 소, 2마리 추가. 가능한 최대 최소 거리는?"),
      question: t(E,
        "\"10001\": occupied at 0,4. Place 2 cows. Max of min distance?",
        "\"10001\": 0,4에 소. 2마리 추가. 최소 거리의 최대값?"),
      hint: t(E,
        "Try different placements and look at the smallest gap each makes.",
        "여러 배치를 시도하면서 각 배치의 최소 간격을 확인해 봐."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist1Ch2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Binary search the answer D. For each candidate, greedily place cows — first at the earliest available, then leftmost spot ≥ D from the last. Check if all N fit. Sections build it one piece at a time.",
        "답 D 를 이분 탐색. 후보마다 그리디 배치 — 가장 처음 가능 위치, 그 다음 마지막 + D 이상인 가장 왼쪽. N 마리 모두 들어가는지 확인. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSocDist1Sections(E),
    },
  ];
}
