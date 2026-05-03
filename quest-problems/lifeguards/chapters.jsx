import { C, t } from "@/components/quest/theme";
import { getLifeguardsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "shifts = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    shifts.append((a, b))",
  "",
  "# Compute total coverage using sweep line",
  "events = []",
  "for a, b in shifts:",
  "    events.append((a, 1))",
  "    events.append((b, -1))",
  "events.sort()",
  "",
  "total = 0",
  "active = 0",
  "prev = 0",
  "for time, delta in events:",
  "    if active > 0:",
  "        total += time - prev",
  "    active += delta",
  "    prev = time",
  "",
  "# For each guard, compute their unique coverage",
  "best = 0",
  "for skip in range(N):",
  "    ev = []",
  "    for i, (a, b) in enumerate(shifts):",
  "        if i == skip: continue",
  "        ev.append((a, 1))",
  "        ev.append((b, -1))",
  "    ev.sort()",
  "    cov = 0",
  "    act = 0",
  "    prv = 0",
  "    for time, delta in ev:",
  "        if act > 0:",
  "            cov += time - prv",
  "        act += delta",
  "        prv = time",
  "    best = max(best, cov)",
  "",
  "print(best)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeLifeguardsCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "N lifeguards have time shifts. We must fire exactly one to maximize the remaining total coverage (union of intervals).",
        "N명의 인명구조원이 근무 시간이 있어. 정확히 한 명을 해고해서 남은 전체 커버리지(구간 합집합)를 최대화해야 해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfca"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Lifeguards</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Fire the lifeguard whose unique coverage (time only they cover) is smallest. That way we lose the least coverage.",
              "핵심: 고유 커버리지(자기만 담당하는 시간)가 가장 작은 인명구조원을 해고해. 그래야 커버리지 손실이 최소야.")}
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Two shifts: [1,5] and [3,8]. If we fire the first guard, coverage = 3 to 8 = 5. If we fire the second, coverage = 1 to 5 = 4. Which gives max coverage?",
        "두 근무: [1,5]와 [3,8]. 첫째를 해고하면 커버리지 = 3~8 = 5. 둘째를 해고하면 커버리지 = 1~5 = 4. 어느 쪽이 최대 커버리지?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Fire which guard for max coverage?",
        "근무 [1,5]와 [3,8]. 최대 커버리지를 위해 누구를 해고?"),
      options: [
        t(E, "Fire first guard (coverage = 5)", "첫째 해고 (커버리지 = 5)"),
        t(E, "Fire second guard (coverage = 4)", "둘째 해고 (커버리지 = 4)"),
      ],
      correct: 0,
      explain: t(E,
        "Fire the first guard: remaining coverage [3,8] = 5, which is larger than [1,5] = 4.",
        "첫째를 해고: 남은 커버리지 [3,8] = 5, 이게 [1,5] = 4보다 커."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "Shifts [1,5] and [3,8]. What is the maximum remaining coverage after firing one guard?",
        "근무 [1,5]와 [3,8]. 한 명 해고 후 최대 남은 커버리지는?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Max coverage after firing one?",
        "근무 [1,5]와 [3,8]. 한 명 해고 후 최대 커버리지?"),
      hint: t(E,
        "Fire guard 1: coverage [3,8] = 5. Fire guard 2: coverage [1,5] = 4. Max = 5.",
        "1번 해고: 커버리지 [3,8] = 5. 2번 해고: 커버리지 [1,5] = 4. 최대 = 5."),
      answer: 5,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeLifeguardsCh2(E, lang = "py") {
  return [
    // 2-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Try removing each guard, compute union coverage with sweep line. O(N^2 log N) for Bronze is fine!",
        "각 인명구조원을 제거해보고 스위프 라인으로 합집합 커버리지 계산. Bronze에서 O(N^2 log N)이면 충분해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N^2 log N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each guard to skip, build events from remaining shifts, sort, and sweep to compute coverage. Take the maximum.",
              "각 인명구조원을 건너뛰고 남은 근무에서 이벤트를 만들어 정렬, 스위프해서 커버리지 계산. 최대값을 취해.")}
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getLifeguardsSections(E),
    },
  ];
}
