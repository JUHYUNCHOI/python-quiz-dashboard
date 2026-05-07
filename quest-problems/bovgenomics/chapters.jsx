import { C, t } from "@/components/quest/theme";
import { getBovGenomicsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "spotted = []",
  "for _ in range(N):",
  "    spotted.append(input().strip())",
  "",
  "plain = []",
  "for _ in range(N):",
  "    plain.append(input().strip())",
  "",
  "ans = 0",
  "for j in range(M):",
  "    s_chars = set(spotted[i][j] for i in range(N))",
  "    p_chars = set(plain[i][j] for i in range(N))",
  "    if len(s_chars & p_chars) == 0:",
  "        ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N spotted cows and N plain cows; each cow has an M-letter genome over {A, C, G, T}.\nA position j is 'distinguishing' if the set of letters appearing at column j among spotted cows DOES NOT INTERSECT the set among plain cows.\nCount how many positions are distinguishing.",
        "FJ 에게 점박이 소 N마리와 무늬 없는 소 N마리가 있어요. 각 소는 A, C, G, T 로 된 M글자 유전체를 가져요.\n어떤 위치 j 가 '구별 가능' 이려면, j 번째 칸에서 점박이 소들이 가진 글자와 무늬 없는 소들이 가진 글자가 한 글자도 겹치지 않아야 해요. 구별 가능한 위치가 몇 개인지 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\uddec"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Bovine Genomics</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N spotted cows and N plain cows", "점박이 소 N마리와 무늬 없는 소 N마리")}</b>
                  {t(E, ", each with an M-letter genome over A/C/G/T.",
                        " 가 있고, 각 소는 A/C/G/T 로 된 M글자 유전체를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Position j is ", "위치 j 가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "distinguishing", "'구별 가능'")}</b>
                  {t(E, " if the set of letters at column j across spotted cows does NOT intersect the set across plain cows.",
                        " 인 건, j 번째 칸의 점박이 소 글자들과 무늬 없는 소 글자들이 한 글자도 겹치지 않을 때예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinguishing positions", "구별 가능한 위치의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "At a certain position, spotted cows have {A, A} and plain cows have {C, C}.\nIs this position a valid distinguishing position?", "어떤 위치에서 점박이 소는 {A, A}, 무늬 없는 소는 {C, C}야. 이 위치는 유효한 구별 위치예요?"),
      question: t(E,
        "Spotted = {A, A}, Plain = {C, C}. No overlap, so valid?",
        "점박이 = {A, A}, 무늬 없음 = {C, C}. 겹침 없으니 유효?"),
      options: [
        t(E, "Yes, sets {A} and {C} don't overlap", "맞아, 집합 {A}와 {C}는 안 겹쳐"),
        t(E, "No, we need more characters", "아니, 더 많은 문자가 필요해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The spotted set is {A} and the plain set is {C}. They have no intersection, so this position can distinguish the two groups.",
        "맞아! 점박이 집합은 {A}, 무늬 없는 집합은 {C}. 교집합이 없으니 이 위치로 두 그룹을 구별할 수 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If there's exactly 1 valid distinguishing position, what is the answer?", "유효한 구별 위치가 정확히 1개라면 답은 뭐예요?"),
      question: t(E,
        "How many valid positions if only 1 position has no overlap?",
        "겹침 없는 위치가 1개뿐이면 유효한 위치 수는?"),
      hint: t(E,
        "We simply count positions with no overlap. 1 position = answer is 1.",
        "겹침 없는 위치를 단순히 세면 돼요. 1개 위치 = 답은 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each genome column j (1..M), gather the SET of letters used by spotted cows there and the SET used by plain cows. If the two sets DON'T intersect, that column distinguishes the breeds.",
        "각 유전체 열 j (1..M) 마다 점박이 소들이 그 자리에서 쓴 글자의 집합과 무늬 없는 소들의 집합을 모아요. 두 집합이 교집합이 없으면 그 열이 구별 가능."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBovGenomicsSections(E),
    },
  ];
}
