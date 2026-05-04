import { C, t } from "@/components/quest/theme";
import { getPermSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    perm = [0] * N",
  "    used = [False] * (N + 1)",
  "",
  "    # find positions where h[i] == 0 (fixed neighbors)",
  "    # greedy: place from left to right",
  "    ok = True",
  "    # positions with 0 hint: perm[i+1] = perm[i]±0 impossible,",
  "    # means perm[i+1] not constrained by diff",
  "    # Actually: h[i] = abs(perm[i]-perm[i+1])",
  "    # Strategy: start with perm[0], then perm[i+1]=perm[i]±h[i]",
  "",
  "    # Try all starting values",
  "    found = False",
  "    for start in range(1, N + 1):",
  "        perm[0] = start",
  "        used_t = [False] * (N + 1)",
  "        used_t[start] = True",
  "        valid = True",
  "        for i in range(N - 1):",
  "            plus = perm[i] + h[i]",
  "            minus = perm[i] - h[i]",
  "            if 1 <= plus <= N and not used_t[plus]:",
  "                perm[i+1] = plus",
  "                used_t[plus] = True",
  "            elif 1 <= minus <= N and not used_t[minus]:",
  "                perm[i+1] = minus",
  "                used_t[minus] = True",
  "            else:",
  "                valid = False",
  "                break",
  "        if valid:",
  "            found = True",
  "            break",
  "",
  "    if found:",
  "        print(' '.join(map(str, perm)))",
  "    else:",
  "        print(-1)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "FJ has a favorite permutation of 1..N, but he only gave us hints!\nCan we reconstruct it?\n🔢", "FJ가 좋아하는 1~N 순열이 있는데, 힌트만 줬어! 복원할 수 있을까? 🔢"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔢</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>Farmer John's Favorite Permutation</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #3</div>
          <div style={{ marginTop: 12, background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Given hints h[i] = abs(perm[i] - perm[i+1]),\nreconstruct the permutation of 1..N or say it's impossible!", "힌트 h[i] = abs(perm[i] - perm[i+1]) 가 주어지면,\n1~N 순열을 복원하거나 불가능하다고 판별해!")}
          </div>
        </div>),
    },
    // 1-2: What is a permutation?
    {
      type: "reveal",
      narr: t(E,
        "A permutation of 1..N means each number from 1 to N appears exactly once.\nFor example, [3,1,4,2] is a permutation of 1..4.", "1~N의 순열이란 1부터 N까지 각 숫자가 정확히 한 번씩 나오는 것! 예: [3,1,4,2]는 1~4의 순열이야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, marginBottom: 10 }}>
              {t(E, "Example: perm = [3, 1, 4, 2]", "예시: perm = [3, 1, 4, 2]")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
              {[3,1,4,2].map((v, i) => (
                <div key={i} style={{
                  width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontSize: 20, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
                  background: "#fff", border: `2.5px solid ${C.accentBd}`, color: C.accent,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, textAlign: "center" }}>
              {t(E,
                "Hints: |3-1|=2, |1-4|=3, |4-2|=2 → h = [2, 3, 2]",
                "힌트: |3-1|=2, |1-4|=3, |4-2|=2 → h = [2, 3, 2]")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — hint meaning
    {
      type: "quiz",
      narr: t(E,
        "The hint h[i] tells us the absolute difference between consecutive elements.\nSo h[i] = abs(perm[i] - perm[i+1]).", "힌트 h[i]는 연속 원소의 절댓값 차이야. h[i] = abs(perm[i] - perm[i+1])."),
      question: t(E,
        "If perm = [2, 5, 1, 4, 3], what is h[1] (0-indexed)?",
        "perm = [2, 5, 1, 4, 3]이면, h[1] (0-indexed)은?"),
      options: ["3", "4", "6", "1"],
      correct: 1,
      explain: t(E,
        "|5 - 1| = 4. h[1] is the diff between perm[1]=5 and perm[2]=1.",
        "|5 - 1| = 4. h[1]은 perm[1]=5와 perm[2]=1의 차이야."),
    },
    // 1-4: Quiz — reconstruction idea
    {
      type: "quiz",
      narr: t(E,
        "To reconstruct: if we know perm[i] and h[i], then perm[i+1] = perm[i] + h[i] or perm[i] - h[i].\nTwo choices each step!", "복원하려면: perm[i]와 h[i]를 알면, perm[i+1] = perm[i] + h[i] 또는 perm[i] - h[i]. 매 단계 2가지 선택!"),
      question: t(E,
        "If perm[0] = 3 and h[0] = 2, what are the possible values for perm[1]?",
        "perm[0] = 3이고 h[0] = 2이면, perm[1]의 가능한 값은?"),
      options: [
        t(E, "1 or 5", "1 또는 5"),
        t(E, "2 or 4", "2 또는 4"),
        t(E, "1 or 3", "1 또는 3"),
        t(E, "5 only", "5만"),
      ],
      correct: 0,
      explain: t(E, "3+2=5 or 3-2=1. Both are candidates!", "3+2=5 또는 3-2=1. 둘 다 후보야!"),
    },
    // 1-5: Input
    {
      type: "input",
      narr: t(E,
        "Let's practice!\nperm = [?, ?, ?, ?] with N=4.\nh = [1, 2, 1].\nIf perm starts with 2, and we always pick +, what is perm[3]?", "연습! perm = [?, ?, ?, ?], N=4. h = [1, 2, 1]. perm이 2로 시작하고 항상 +를 고르면, perm[3]은?"),
      question: t(E,
        "perm[0]=2, h=[1,2,1], always pick +. perm[3]=?",
        "perm[0]=2, h=[1,2,1], 항상 + 선택. perm[3]=?"),
      hint: t(E, "2→3→5→6. But 6>4! Is this valid?", "2→3→5→6. 그런데 6>4! 유효할까?"),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 시뮬레이션
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh2(E) {
  return [
    // 2-1: First idea — natural greedy
    {
      type: "reveal",
      narr: t(E,
        "First thought: if we know perm[0], then perm[1] = perm[0] ± h[0] — only two choices.\nSo pick a starting value, then greedily pick + or - at each step.\nSounds simple!", "첫 생각: perm[0]을 알면 perm[1] = perm[0] ± h[0] — 두 가지뿐.\n시작값을 정하고 매 단계 +/− 중 하나를 그리디로 골라.\n간단해 보이지?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: C.accent, marginBottom: 6 }}>
              {t(E, "💡 Natural First Idea", "💡 자연스러운 첫 아이디어")}
            </div>
            {t(E,
              "Try every start = 1, 2, ..., N.\nFor each step: prefer + (or any rule). If +h is in [1, N] and unused, take it. Otherwise try −h. If both fail, this start is bad — try the next one.", "시작값 = 1, 2, ..., N 다 시도.\n매 단계: +h 먼저 (또는 정해진 규칙). +h가 [1, N] 안이고 미사용이면 선택. 아니면 −h 시도. 둘 다 실패면 이 시작값은 안 됨 — 다음 시도.")}
          </div>
        </div>),
    },
    // 2-2: Interactive sim
    {
      type: "sim",
      narr: t(E,
        "Try it!\nN=4, h=[2,3,2].\nPick a starting value below and step through the greedy.\nNotice that some starts fail and some succeed.", "직접 해봐! N=4, h=[2,3,2]. 아래에서 시작값을 골라 그리디를 한 단계씩 따라가봐. 어떤 시작값은 실패하고 어떤 건 성공해."),
    },
    // 2-3: Static trace example
    {
      type: "reveal",
      narr: t(E,
        "Recap: with start=3, the trace is 3→1→4→2 = [3,1,4,2] ✅.\nWith start=1, we get stuck at step 2.\nWith start=4, we get stuck at step 3.", "정리: 시작값=3이면 3→1→4→2 = [3,1,4,2] ✅. 시작값=1은 2단계에서 막히고, 시작값=4는 3단계에서 막혀."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { step: "Start", val: 3, used: [3] },
              { step: "h[0]=2", val: 1, try1: "3+2=5 ✗", try2: "3-2=1 ✓", used: [3,1] },
              { step: "h[1]=3", val: 4, try1: "1+3=4 ✓", used: [3,1,4] },
              { step: "h[2]=2", val: 2, try1: "4+2=6 ✗", try2: "4-2=2 ✓", used: [3,1,4,2] },
            ].map((s, i) => (
              <div key={i} style={{
                background: i === 0 ? C.accentBg : "#fff",
                border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px",
                fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span style={{ fontWeight: 800, color: C.accent }}>{s.step}</span>
                {s.try1 && <span style={{ color: s.try1.includes("✓") ? C.ok : C.no, marginLeft: 8 }}>{s.try1}</span>}
                {s.try2 && <span style={{ color: s.try2.includes("✓") ? C.ok : C.no, marginLeft: 8 }}>{s.try2}</span>}
                <span style={{ color: C.dim, marginLeft: 8 }}>→ [{s.used.join(",")}]</span>
              </div>
            ))}
          </div>
        </div>),
    },
    // 2-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "What happens when BOTH perm[i]+h[i] and perm[i]-h[i] are invalid (out of range or already used)?", "perm[i]+h[i]와 perm[i]-h[i] 둘 다 유효하지 않으면 (범위 밖이거나 이미 사용)?"),
      question: t(E,
        "If both options fail at some step, what should we do?",
        "어떤 단계에서 두 옵션 모두 실패하면?"),
      options: [
        t(E, "Try next starting value", "다음 시작값 시도"),
        t(E, "Output -1 immediately", "즉시 -1 출력"),
        t(E, "Swap previous elements", "이전 원소를 교환"),
        t(E, "Skip this step", "이 단계를 건너뜀"),
      ],
      correct: 0,
      explain: t(E,
        "This starting value doesn't work. Move on to the next one. Only output -1 if ALL starting values fail!",
        "이 시작값이 안 되는 거야. 다음 시작값으로! 모든 시작값이 실패할 때만 -1!"),
    },
    // 2-4: Input
    {
      type: "input",
      narr: t(E,
        "N=3, h=[1,1]. Try start=1: 1→1+1=2→2+1=3. Result: [1,2,3]. What is perm[2]?", "N=3, h=[1,1]. 시작=1: 1→1+1=2→2+1=3. 결과: [1,2,3]. perm[2]는?"),
      question: t(E, "N=3, h=[1,1], start=1. perm[2]=?", "N=3, h=[1,1], 시작=1. perm[2]=?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh3(E, lang = "py") {
  return [
    // 3-1: Complexity
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(N²) per test case — we try N starting values, each taking O(N).\nSince N ≤ 1000, this is fast enough!", "시간복잡도: 테스트 케이스당 O(N²) — N개의 시작값을 시도하고, 각각 O(N). N ≤ 1000이니 충분히 빨라!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Try each start", "시작값 차례로 시도"), code: "for start in range(1, N+1):", color: "#7c5cfc" },
              { n: 2, label: t(E, "Greedy + or \u2212", "그리디 + 또는 \u2212"), code: "if perm[i] + h[i] valid: pick;  elif perm[i] \u2212 h[i] valid: pick;  else: fail", color: "#0891b2" },
              { n: 3, label: t(E, "Output if found", "성공하면 출력"), code: "if valid: print(perm);  break", color: "#16a34a" },
              { n: 4, label: t(E, "All starts fail \u2192 -1", "모두 실패 \u2192 -1"), code: "if no start works: print(-1)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "\u23f1 Complexity", "\u23f1 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>O(N\u00b2)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N starts \u00d7 N steps each", "N개 시작 \u00d7 각 N단계")}</div>
          </div>
        </div>),
    },
    // 3-2: Quiz on edge case
    {
      type: "quiz",
      narr: t(E,
        "When h[i] = 0, perm[i+1] must equal perm[i].\nBut in a permutation, all values are distinct!\nSo h[i]=0 means...", "h[i] = 0이면, perm[i+1] = perm[i]이어야 해. 그런데 순열에선 모든 값이 다르잖아! h[i]=0이면..."),
      question: t(E,
        "If h[i] = 0 for some i, what can we conclude?",
        "어떤 i에서 h[i] = 0이면?"),
      options: [
        t(E, "Impossible! Output -1", "불가능! -1 출력"),
        t(E, "perm[i] = perm[i+1] = 0", "perm[i] = perm[i+1] = 0"),
        t(E, "Skip to next element", "다음 원소로 건너뜀"),
      ],
      correct: 0,
      explain: t(E,
        "h[i]=0 means abs(perm[i]-perm[i+1])=0, so they're equal. But permutations have all distinct values — contradiction!",
        "h[i]=0이면 abs(perm[i]-perm[i+1])=0, 같은 값. 하지만 순열은 모든 값이 달라 — 모순!"),
    },
    // 3-3: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read it part by part. Toggle Python ↔ C++ in header, save as PDF.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글, PDF 저장 가능."),
      sections: getPermSections(E),
    },
    // 3-4: Live runner
    {
      type: "runner",
      narr: t(E,
        "Now run it yourself. Enter N and h, watch the greedy try each start. Stop anytime.", "이제 직접 돌려봐. N과 h 입력하고, 그리디가 시작값을 하나씩 시도하는 걸 봐. 언제든 중지 가능."),
    },
  ];
}
