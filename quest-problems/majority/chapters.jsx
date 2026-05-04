import { C, t } from "@/components/quest/theme";
import { getMajoritySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "result = set()",
  "for i in range(N - 1):",
  "    if a[i] == a[i + 1]:",
  "        result.add(a[i])",
  "",
  "if len(result) == 0:",
  "    print(-1)",
  "else:",
  "    for x in sorted(result):",
  "        print(x)",
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
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗳️</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Majority Opinion</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ". Cow i prefers hay type ", "가 있어요. i번 소는 건초 종류 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, ".", "를 좋아해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ can repeatedly run a ", "FJ는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "focus group", "포커스 그룹")}</b>
                  {t(E, " on any 3 adjacent cows: if 2 agree on a type, the 3rd cow switches to that type.",
                        "을 인접한 3마리 위에 반복해서 열 수 있어요: 그중 2명이 같은 종류를 좋아하면, 나머지 1명도 그 종류로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A hay type ", "어떤 건초 종류가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "becomes universal", "전체를 지배")}</b>
                  {t(E, " if FJ can use focus groups to make ALL cows prefer it.",
                        "한다면 — FJ가 포커스 그룹을 잘 사용해서 모든 소가 그것을 좋아하게 만들 수 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print all hay types that can become universal, in increasing order — or ", "전체를 지배할 수 있는 건초 종류를 오름차순으로 모두 출력해요. 없으면 ")}
                  <b style={{ color: "#15803d" }}>-1</b>
                  {t(E, " if none.", " 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If the preferences are [1, 2, 2, 2, 3], which hay type can become universal?", "선호도가 [1, 2, 2, 2, 3]이면 어떤 건초가 전체를 지배할 수 있을까?"),
      question: t(E,
        "Preferences: [1, 2, 2, 2, 3]. Which can become universal?",
        "선호도: [1, 2, 2, 2, 3]. 전체를 지배할 수 있는 건?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "1 and 3", "1과 3"),
      ],
      correct: 1,
      explain: t(E,
        "Only type 2 appears in adjacent positions (indices 1-2 and 2-3). Types 1 and 3 never appear next to themselves.",
        "타입 2만 인접한 위치에 나타나 (인덱스 1-2, 2-3). 타입 1과 3은 자기 자신 옆에 나타나지 않아."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Count the adjacent pairs!\nIn [1, 1, 2, 3, 3], how many adjacent pairs share the same value?", "인접 쌍을 세봐요! [1, 1, 2, 3, 3]에서 같은 값을 가진 인접 쌍은 몇 개?"),
      question: t(E,
        "Array [1, 1, 2, 3, 3]: how many adjacent pairs have the same value?",
        "배열 [1, 1, 2, 3, 3]: 같은 값의 인접 쌍은 몇 개?"),
      hint: t(E,
        "Check each pair: (1,1), (1,2), (2,3), (3,3)",
        "각 쌍을 확인: (1,1), (1,2), (2,3), (3,3)"),
      answer: 2,
    },
    {
      type: "sim",
      narr: t(E,
        "Pick a preset and step through the adjacent-pair scan.\nWatch which values get added to the result set.", "프리셋을 골라 인접 쌍 스캔을 한 단계씩. 어떤 값이 결과 집합에 추가되는지 봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMajorityCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "We just scan once through the array checking adjacent pairs. That's O(N) time!", "배열을 한 번 쭉 훑으면서 인접 쌍만 확인하면 돼요. O(N) 시간!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init result set", "결과 집합 초기화"), code: "result = set()", color: "#dc2626" },
              { n: 2, label: t(E, "Scan adjacent pairs", "인접 쌍 스캔"), code: "for i in range(N \u2212 1): if a[i] == a[i+1]: result.add(a[i])", color: "#0891b2" },
              { n: 3, label: t(E, "Print sorted (or \u22121)", "정렬 출력 (또는 \u22121)"), code: "for x in sorted(result): print(x)   # else print(\u22121)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fee2e2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "\u23f1 Complexity", "\u23f1 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan", "단일 선형 스캔")}</div>
          </div>
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
