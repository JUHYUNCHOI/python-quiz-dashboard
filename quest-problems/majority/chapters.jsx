import { C, t } from "@/components/quest/theme";
import { getMajoritySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1     # number of test cases",
  "",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx]); idx += 1",
  "    a = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
  "",
  "    # Key fact (from the editorial): a type x is achievable iff",
  "    #   some pair of cows at distance 1 OR 2 both like x.",
  "    valid = set()",
  "    for i in range(N - 1):",
  "        if a[i] == a[i + 1]:                  # distance 1 — same as cow i+1",
  "            valid.add(a[i])",
  "        if i + 2 < N and a[i] == a[i + 2]:    # distance 2 — same as cow i+2",
  "            valid.add(a[i])",
  "",
  "    if not valid:",
  "        out.append('-1')",
  "    else:",
  "        out.append(' '.join(str(x) for x in sorted(valid)))",
  "",
  "print(chr(10).join(out))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMajorityCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a row, each preferring some hay type.\nFJ runs 'focus groups' on any 3 adjacent cows: if 2+ agree, the third switches to the majority.\nWhich hay types could end up everywhere?",
        "N마리 소가 한 줄로 서있고, 각자 좋아하는 건초 종류가 있어요.\nFJ가 인접한 3마리에게 '포커스 그룹'을 열면, 그중 2명 이상이 같은 의견이면 나머지 한 명이 그 의견으로 바꿔요.\n어떤 건초 종류가 결국 전체를 지배할 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🗳️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Majority Opinion</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ". Cow i prefers hay type ", "가 있어요. i번 소는 건초 종류 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, ".", "를 좋아해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ can repeatedly run a ", "FJ는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "focus group", "포커스 그룹")}</b>
                  {t(E, " on any 3 adjacent cows: if 2 agree on a type, the 3rd cow switches to that type.",
                        "을 인접한 3마리 위에 반복해서 열 수 있어요: 그중 2명이 같은 종류를 좋아하면, 나머지 1명도 그 종류로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A hay type ", "어떤 건초 종류가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "becomes universal", "전체를 지배")}</b>
                  {t(E, " if FJ can use focus groups to make ALL cows prefer it.",
                        "한다면 — FJ가 포커스 그룹을 잘 사용해서 모든 소가 그것을 좋아하게 만들 수 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Multiple test cases. For each, print all valid hay types in increasing order separated by spaces — or ",
                        "여러 테스트 케이스. 각 테스트마다 가능한 건초 종류를 오름차순 공백 구분으로 출력. 없으면 ")}
                  <b style={{ color: "#15803d" }}>-1</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: T (test cases), then for each: N then N values on one line. Output one line per case (space-separated values, or -1).",
        "입력: T (테스트 수), 각 테스트마다 N 줄과 값 N개 한 줄. 출력: 케이스마다 한 줄 (공백 구분 값 또는 -1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "2px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d", whiteSpace: "pre" }}>
{`5
5
1 2 2 2 3
6
1 2 3 1 2 3
6
1 1 1 2 2 2
3
3 2 3
2
2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`2
-1
1 2
3
-1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — case 4: [3, 2, 3]", "풀이 — 4 번 케이스: [3, 2, 3]")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Cows: 3, 2, 3. The two 3's sit at positions 0 and 2 — distance 2.",
                    "소: 3, 2, 3. 양쪽 3 이 위치 0 과 2 — 거리 2.")}
              <br/>
              {t(E, "Focus group on cows 0, 1, 2: two 3's vs one 2 → cow 1 switches to 3.",
                    "0, 1, 2 포커스 그룹: 3 두 명 vs 2 한 명 → 1번 소가 3 으로 변함.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ type 3 takes over.  Output: 3.", "→ 3 이 전체 지배. 출력: 3.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — distance-2 case
    {
      type: "quiz",
      narr: t(E,
        "Two cows of the same type need to be CLOSE (distance 1 or 2) for the type to spread. Why distance 2 still works?",
        "같은 타입 두 소가 가까이 있어야 (거리 1 또는 2) 그 타입이 퍼져요. 왜 거리 2도 가능할까?"),
      question: t(E,
        "Preferences: [3, 2, 3]. Which type can become universal?",
        "선호도: [3, 2, 3]. 어떤 타입이 전체를 지배할 수 있어?"),
      options: [
        t(E, "Only 2", "2 만"),
        t(E, "Only 3", "3 만"),
        t(E, "Both 2 and 3", "2 와 3 모두"),
        t(E, "Neither", "둘 다 안 돼"),
      ],
      correct: 1,
      explain: t(E,
        "Cows at 0 and 2 both like type 3. Focus group on (0, 1, 2): two 3's win → cow 1 becomes 3 too. Type 2 has no nearby duplicate, so it can't spread.",
        "0번과 2번 소가 둘 다 3을 좋아. (0,1,2) 포커스 그룹: 3 두 명이 다수 → 1번도 3 됨. 2 는 가까이에 같은 게 없어서 못 퍼져."),
    },
    // 1-4: Input — count valid types in [1,1,1,2,2,2]
    {
      type: "input",
      narr: t(E,
        "Count valid types in [1, 1, 1, 2, 2, 2]. Look for pairs at distance 1 OR 2 with the same value.",
        "[1, 1, 1, 2, 2, 2]에서 가능한 타입 수. 거리 1 또는 2 의 같은 값 쌍을 찾아요."),
      question: t(E,
        "How many distinct hay types can become universal in [1, 1, 1, 2, 2, 2]?",
        "[1, 1, 1, 2, 2, 2]에서 전체를 지배할 수 있는 타입 수?"),
      hint: t(E,
        "Type 1: pairs (0,1), (0,2), (1,2) all match → valid. Type 2: pairs (3,4), (3,5), (4,5) all match → valid. Both qualify.",
        "타입 1: (0,1), (0,2), (1,2) 다 같음 → 가능. 타입 2: (3,4), (3,5), (4,5) 다 같음 → 가능. 둘 다 OK."),
      answer: 2,
    },
    {
      type: "sim",
      narr: t(E,
        "Pick a preset and step through the distance-1 + distance-2 scan. Watch which values get added.",
        "프리셋을 골라 거리 1 + 거리 2 스캔을 한 단계씩. 어떤 값이 추가되는지 봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMajorityCh2(E, lang = "py") {
  return [
    // 2-1: Light intro — code first.
    {
      type: "reveal",
      narr: t(E,
        "From the editorial trick: a hay type x is achievable iff some pair of cows at distance 1 OR distance 2 both like x.  Just scan once.",
        "Editorial 한 줄: 어떤 타입 x 가 가능 ↔ 거리 1 또는 거리 2 의 두 소가 둘 다 x 좋아함. 한 번만 스캔."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "Read T cases. For each: scan i = 0..N-2. If a[i] == a[i+1] OR a[i] == a[i+2], add a[i] to a set. Print the sorted set (or '-1').  Code section by section.",
            "T 케이스 읽기. 각 케이스: i = 0..N-2 스캔. a[i] == a[i+1] 또는 a[i] == a[i+2] 면 a[i] 를 set 에 추가. 정렬 출력 (없으면 '-1'). 코드 한 단락씩.")}
        </div>),
    },
    // 2-2: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Now build the linear scan step by step.", "선형 스캔을 단계별로 만들자."),
      sections: getMajoritySections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own array. Enter space-separated values, see live scan and final output.", "직접 배열 시도. 공백 구분 값 입력, 실시간 스캔과 최종 출력 확인."),
    },
  ];
}
