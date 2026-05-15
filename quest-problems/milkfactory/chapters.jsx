import { C, t } from "@/components/quest/theme";
import { getMilkFactorySections, MilkFactoryBeltSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFactoryCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has a milk factory with N stations connected by N−1 one-way conveyor belts (so the underlying graph is a tree).\nFind a single station that EVERY other station can reach by following the conveyors. Print that station's number, or −1 if none exists.",
        "FJ 에게 N개의 역과 N−1개의 한 방향 컨베이어로 이뤄진 우유 공장이 있어요 (연결 구조가 트리 모양이에요).\n다른 모든 역에서 컨베이어를 따라 도달할 수 있는 단 하나의 역을 찾아요. 그 번호를 출력하고, 없으면 −1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfed"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Milk Factory</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the central station every other station can reach, or −1 if none exists.",
                "다른 모든 역에서 도달 가능한 중심 역의 번호 (없으면 −1) 를 출력.")}
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
                  {t(E, "FJ's factory has ", "공장에 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N stations", "N개의 역")}</b>
                  {t(E, " connected by ", "이 있고, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N−1 one-way conveyor belts", "N−1개의 한 방향 컨베이어")}</b>
                  {t(E, " (the underlying graph is a tree).", "로 연결돼 있어요 (연결 구조가 트리 모양이에요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We want a ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "central station C", "중심 역 C")}</b>
                  {t(E, " such that ", " — ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every other station can reach C", "다른 모든 역에서 C 로 갈 수 있어요")}</b>
                  {t(E, " by following the conveyor directions.", " (컨베이어 방향대로).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print such a station's number, or ", "그런 역의 번호를 출력해요. 없으면 ")}
                  <b style={{ color: "#dc2626" }}>−1</b>
                  {t(E, ".", " 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Belt-graph reachability sim (interactive)
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself! Edit the belts, pick a candidate station, and watch which stations turn green (reach the candidate). The sim also shows the auto-detected central station.",
        "직접 해봐! 벨트를 수정하고 후보 역을 골라봐. 어떤 역이 초록 (후보로 도달) 인지 보여주고, 자동으로 중심 역도 알려줘."),
      content: <MilkFactoryBeltSim E={E} />,
    },
    // 1-3: Quiz (uses example student just simulated)
    {
      type: "quiz",
      narr: t(E,
        "Consider: edges 1->2 and 3->2. Which station is reachable from all others?", "간선 1->2, 3->2가 있어요. 모든 스테이션에서 도달 가능한 곳은?"),
      question: t(E,
        "Edges: 1->2, 3->2. Which station can all others reach?",
        "간선: 1->2, 3->2. 모든 스테이션이 도달 가능한 곳은?"),
      options: [
        t(E, "Station 1", "스테이션 1"),
        t(E, "Station 2", "스테이션 2"),
        t(E, "Station 3", "스테이션 3"),
        t(E, "No such station (-1)", "없음 (-1)"),
      ],
      correct: 1,
      explain: t(E,
        "Station 2 is reachable from 1 (via 1->2) and from 3 (via 3->2). Station 2 can reach itself.",
        "스테이션 2는 1에서 (1->2), 3에서 (3->2) 도달 가능. 자기 자신도 도달 가능."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "In the example above, what station number is the answer?", "위 예제에서 답은 몇 번 스테이션일까요?"),
      question: t(E,
        "Edges: 1->2, 3->2. Answer station number?",
        "간선: 1->2, 3->2. 답 스테이션 번호는?"),
      hint: t(E,
        "Where do all the conveyor arrows point toward?",
        "컨베이어 화살표가 모두 어디로 향하고 있어?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFactoryCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "C reachable from all ↔ in the REVERSE graph C reaches all. Build the reverse graph, BFS/DFS from each candidate — print the first whose reverse-BFS reaches all N stations. Sections build it one piece at a time.",
        "C 가 모두에서 도달 가능 ↔ 역방향 그래프에서 C 가 모두에 도달. 역방향 그래프 → 후보마다 BFS/DFS → N 개 모두 도달하면 출력. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMilkFactorySections(E),
    },
  ];
}
