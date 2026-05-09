import { C, t } from "@/components/quest/theme";
import { getMilkOrderSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M, K = map(int, input().split())",
  "hierarchy = []",
  "for _ in range(M):",
  "    line = list(map(int, input().split()))",
  "    hierarchy.append(line[1:])",
  "",
  "fixed = {}",
  "fixed_inv = {}",
  "for _ in range(K):",
  "    c, p = map(int, input().split())",
  "    fixed[c] = p",
  "    fixed_inv[p] = c",
  "",
  "if 1 in fixed:",
  "    print(fixed[1])",
  "else:",
  "    def feasible(p):",
  "        if p in fixed_inv:",
  "            return False",
  "        for seq in hierarchy:",
  "            if 1 in seq:",
  "                idx = seq.index(1)",
  "                if idx + 1 > p:",
  "                    return False",
  "                if (len(seq) - idx) > (N - p + 1):",
  "                    return False",
  "        return True",
  "",
  "    for p in range(1, N + 1):",
  "        if feasible(p):",
  "            print(p)",
  "            break",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ wants a valid milking order of his N cows. Two kinds of rules exist: (1) hierarchy — a list saying these M cows must appear in this relative order, and (2) some cows have FIXED positions in the line.\nAmong all valid orders, print the EARLIEST possible position of cow #1.",
        "FJ 가 N마리 소의 유효한 착유 순서를 정하려고 해요. 두 종류의 규칙이 있어요: (1) 순서 규칙 — 어떤 M마리 소는 이 상대 순서를 지켜야 해요, (2) 어떤 소들은 줄에서 정해진 위치를 가져요.\n모든 유효한 순서 중에서 1번 소가 가장 일찍 설 수 있는 위치를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Milking Order</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Find the earliest position cow #1 can take in a valid milking order.", "유효한 착유 순서에서 1번 소가 설 수 있는 가장 이른 위치를 찾아요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows to put in a milking order", "착유 순서를 정해야 할 N마리 소")}</b>
                  {t(E, " (1..N).", " (1..N) 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Hierarchy constraint", "순서 규칙")}</b>
                  {t(E, ": a list of M cows that must appear in this exact relative order in the line.",
                        ": M마리 소의 목록이 주어지고, 이들은 줄에서 이 상대 순서로 등장해야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Fixed positions", "고정 위치")}</b>
                  {t(E, ": some cows have a specified spot in the line.",
                        ": 어떤 소들은 줄에서 정해진 위치를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Among all valid orders, print the ", "모든 유효한 순서 중에서 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "earliest possible position of cow 1", "1번 소의 가능한 가장 이른 위치")}</b>
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
        "If cow 1 has no constraints at all, what's the earliest position it can be in?", "소 1번에 아무 제약이 없으면, 가능한 가장 빠른 위치는?"),
      question: t(E,
        "Cow 1 has no constraints. Earliest position?",
        "소 1번에 제약 없음. 가장 빠른 위치는?"),
      options: [
        t(E, "Position 1", "1번 위치"),
        t(E, "Position N", "N번 위치"),
        t(E, "Cannot determine", "알 수 없음"),
      ],
      correct: 0,
      explain: t(E,
        "With no constraints, cow 1 can go first! Position 1.",
        "제약이 없으면, 소 1번이 첫 번째로 갈 수 있어요! 1번 위치."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If cow 1 has no constraints, what position can it be placed at earliest?", "소 1번에 제약이 없으면, 가장 일찍 배치할 수 있는 위치는?"),
      question: t(E,
        "No constraints on cow 1. Earliest position number?",
        "소 1번에 제약 없음. 가장 빠른 위치 번호는?"),
      hint: t(E,
        "If nothing blocks cow 1, what's the smallest spot in a line of N?",
        "소 1번을 막는 게 아무것도 없다면, N마리 줄에서 가장 작은 자리 번호는?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Build a DAG from the hierarchy chain (a → b means a must come before b). Try every possible position for cow 1 (1..N) — for each, build the lineup using topological sort with cow 1 inserted there. Print the smallest valid position. Sections build it one piece at a time.",
        "위계 체인으로 DAG 구축 (a → b 는 a 가 b 보다 먼저). 1번 소의 위치를 1..N 모두 시도해 — 각 위치에서 그 자리에 소 1번을 넣은 위상 정렬 라인업을 만들고, 가장 작은 유효 위치를 출력. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMilkOrderSections(E),
    },
  ];
}
