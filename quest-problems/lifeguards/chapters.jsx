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
        "FJ has N lifeguards, each working a half-open shift [s, t). The pool is 'covered' at any moment when at least one lifeguard is on duty.\nFJ must FIRE exactly one lifeguard. Print the MAXIMUM total coverage time (union of remaining intervals) he can keep.",
        "FJ에게 N명의 인명구조원이 있고, 각자 반열린 구간 [s, t) 동안 근무해요. 어느 한 순간에 최소 1명이 근무 중이면 그 순간은 '커버됐다'고 해요.\nFJ가 정확히 1명을 해고해야 해요. 남은 인명구조원들의 근무 구간 합집합으로 얻을 수 있는 최대 커버 시간을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfca"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Lifeguards</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N lifeguards", "N명의 인명구조원")}</b>
                  {t(E, ", each working a shift ", "이 있고, 각자 근무 구간 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[s, t)</code>
                  {t(E, ".", " 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The pool is ", "수영장이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "COVERED at any moment", "어느 한 순간에 '커버'된다")}</b>
                  {t(E, " when at least one lifeguard is on duty.",
                        "는 건, 그 순간 최소 1명이 근무 중일 때예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must ", "FJ는 정확히 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "fire EXACTLY ONE lifeguard", "1명의 인명구조원을 해고")}</b>
                  {t(E, ".", " 해야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total covered time after firing one", "1명을 해고한 뒤 얻을 수 있는 최대 커버 시간")}</b>
                  {t(E, " (union of remaining shifts).", " (남은 근무들의 합집합).")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Two shifts: [1,5] and [3,8].\nIf we fire the first guard, coverage = 3 to 8 = 5.\nIf we fire the second, coverage = 1 to 5 = 4.\nWhich gives max coverage?", "두 근무: [1,5]와 [3,8]. 첫째를 해고하면 커버리지 = 3~8 = 5. 둘째를 해고하면 커버리지 = 1~5 = 4. 어느 쪽이 최대 커버리지?"),
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
        "Shifts [1,5] and [3,8]. What is the maximum remaining coverage after firing one guard?", "근무 [1,5]와 [3,8]. 한 명 해고 후 최대 남은 커버리지는?"),
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
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Brute force: try firing each guard one at a time. For each removal, compute the union coverage of remaining shifts using a sweep line. Take the maximum coverage across all N choices.",
        "완전 탐색: 인명구조원을 하나씩 해고. 매 시도마다 남은 근무의 합집합 커버 시간을 스위프 라인으로 계산. N 가지 시도 중 최댓값."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "For each guard to fire", "해고할 각 인명구조원"), code: "for k in range(N):", color: "#2563eb" },
              { n: 2, label: t(E, "Build events from remaining shifts", "남은 근무 이벤트 생성"), code: "events = [(s,+1),(t,-1) for i != k]", color: "#7c3aed" },
              { n: 3, label: t(E, "Sort + sweep", "정렬 + 스윕"), code: "sort events; cur = 0; sum coverage when cur > 0", color: "#0891b2" },
              { n: 4, label: t(E, "Track max coverage", "최대 커버 추적"), code: "best = max(best, coverage);  print(best)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N² log N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N firings × O(N log N) sweep", "N 해고 × O(N log N) 스윕")}</div>
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getLifeguardsSections(E),
    },
  ];
}
