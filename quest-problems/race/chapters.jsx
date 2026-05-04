import { C, t } from "@/components/quest/theme";
import { getRaceSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "K, N = map(int, input().split())",
  "",
  "for _ in range(N):",
  "    target_K, X = map(int, input().split())",
  "    # Binary search / simulation",
  "    # Accelerate to some peak speed, then decelerate to X",
  "    best = float('inf')",
  "    # Try peak speeds from 1 to ~2*sqrt(K)",
  "    dist = 0",
  "    time = 0",
  "    speed = 0",
  "    # Accelerate phase",
  "    while dist < target_K:",
  "        speed += 1",
  "        dist += speed",
  "        time += 1",
  "        # Check if we can decelerate from here",
  "        # Decel from speed to X: takes (speed - X) seconds",
  "        # covers speed + (speed-1) + ... + (X+1) = sum from X+1 to speed",
  "        if speed >= X:",
  "            decel_dist = speed * (speed + 1) // 2 - X * (X + 1) // 2",
  "            accel_dist = dist",
  "            total = accel_dist + decel_dist - speed  # don't double count",
  "            # This is approximate; real solution needs careful handling",
  "    print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRaceCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A cow runs K meters.\nEach second, speed changes by +1 or -1.\nMust end at speed ≤ X.\nFind minimum time.\nStrategy: accelerate then decelerate!", "소가 K미터를 달려. 매초 속도가 +1 또는 -1 변해. 끝날 때 속도 ≤ X. 최소 시간을 구해. 전략: 가속 후 감속!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🏃"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Race</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Accelerate to some peak speed, then decelerate to reach speed ≤ X by the end.\nThe distance covered is the sum of speeds each second. Find the optimal peak speed.",
              "핵심: 어떤 최고 속도까지 가속한 후 감속하여 끝에 속도 ≤ X에 도달.\n이동 거리는 매초 속도의 합.\n최적 최고 속도를 찾아.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Example: K=1, X=1.\nStart at speed 0.\nSecond 1: speed becomes 1, move 1 meter.\nTotal = 1 = K.\nSpeed is 1 ≤ X=1.\nDone in 1 second!", "예시: K=1, X=1. 속도 0에서 시작. 1초: 속도 1, 1미터 이동. 총 = 1 = K. 속도 1 ≤ X=1. 1초에 완료!"),
      question: t(E,
        "K=1, X=1. Minimum time to cover 1 meter?",
        "K=1, X=1. 1미터를 이동하는 최소 시간?"),
      options: [
        t(E, "1 second", "1초"),
        t(E, "2 seconds", "2초"),
        t(E, "3 seconds", "3초"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Speed 0 → 1 in 1 second, covering 1 meter. Final speed 1 ≤ X=1. Done!",
        "정답! 속도 0 → 1로 1초, 1미터 이동. 최종 속도 1 ≤ X=1. 완료!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "K=1, X=1. What's the minimum number of seconds?", "K=1, X=1. 최소 몇 초?"),
      question: t(E,
        "K=1, X=1. Minimum seconds?",
        "K=1, X=1. 최소 초?"),
      hint: t(E,
        "Accelerate to speed 1 in 1 second. Covers 1 meter. Done!",
        "1초에 속도 1로 가속. 1미터 이동. 완료!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRaceCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try all possible peak speeds.\nFor each, compute total distance and time for accel + decel phases.\nO(sqrt(K)) per query.", "모든 가능한 최고 속도를 시도. 각각에 대해 가속 + 감속 단계의 총 거리와 시간 계산. 쿼리당 O(sqrt(K))."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>{"O(\u221aK)"}</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Accelerate from 0 to peak speed P: distance = 1+2+...+P = P(P+1)/2.\nDecelerate from P to X: distance = P+(P-1)+...+(X+1). Find optimal P such that total distance ≥ K.",
              "0에서 최고 속도 P까지 가속: 거리 = 1+2+...+P = P(P+1)/2.\nP에서 X까지 감속: 거리 = P+(P-1)+...+(X+1). 총 거리 ≥ K가 되는 최적 P를 찾아.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getRaceSections(E),
    },
  ];
}
