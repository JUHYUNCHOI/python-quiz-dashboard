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
        "소 N 마리를 놓아서 서로 사이가 가장 멀어지게 해요."),
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
                "소 N 마리를 놓았을 때 두 소 사이 최소 거리가 가장 커지는 값을 출력해요.")}
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
              🐄 {t(E, "See it: greedy placement vs D", "직접 봐요 — D 에 따라 달라지는 그리디 배치")}
            </div>
            <SocDist1Sim E={E} />
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Stalls \"10001\": cows already stand at 0 and 4.\nPlace 2 more so the smallest gap is as large as possible.", "소 2마리를 더 넣어서 최소 간격을 가장 크게 만들어요."),
      question: t(E,
        "Stalls \"10001\": occupied at 0 and 4. Place 2 cows in empty stalls 1,2,3. To maximize minimum distance, best placement?",
        "축사 \"10001\" 의 0 번과 4 번에 소가 있어요. 빈 칸 1, 2, 3 에 소 2마리를 넣어요. 최소 거리를 가장 크게 하려면 어디에 놓을까요?"),
      options: [
        t(E, "Place at 1 and 3: min dist = 1", "1 번과 3 번에 놓아요 — 최소 거리 = 1"),
        t(E, "Place at 2: only 1 cow, can't place 2 optimally. Min = 1", "2 번에만 놓아요 — 소를 1마리밖에 못 놔요. 최소 = 1"),
        t(E, "Place at 1 and 2: min dist = 1", "1 번과 2 번에 놓아요 — 최소 거리 = 1"),
      ],
      correct: 0,
      explain: t(E,
        "With 2 cows to place in {1,2,3}, the best is positions 1 and 3. Distances: 0-1=1, 1-3=2, 3-4=1. Min distance = 1.",
        "소 2마리를 1, 2, 3 에 넣으면 1 번과 3 번이 제일 좋아요. 거리가 0-1=1, 1-3=2, 3-4=1 이라 최소 거리는 1 이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Stalls \"10001\": positions 0 and 4 occupied, place 2 more cows.\nWhat is the maximum possible minimum distance?", "소 2마리를 더 넣었을 때 최소 거리를 가장 크게 해 봐요."),
      question: t(E,
        "\"10001\": occupied at 0,4. Place 2 cows. Max of min distance?",
        "\"10001\" 의 0 번과 4 번에 소가 있어요. 2마리를 더 넣을 때 최소 거리의 가장 큰 값은 얼마일까요?"),
      hint: t(E,
        "Try different placements and look at the smallest gap each makes.",
        "여러 가지로 놓아 보면서 그때마다 가장 작은 간격을 확인해 봐요."),
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
        "답 D 를 이분 탐색하고, D 마다 소를 그리디로 놓아 봐요."),
      sections: getSocDist1Sections(E),
    },
  ];
}
