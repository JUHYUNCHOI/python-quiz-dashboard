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
        "Find one station every other station can reach.",
        "다른 모든 역에서 갈 수 있는 역 하나를 찾아요."),
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
                "다른 모든 역에서 갈 수 있는 중심 역의 번호를 출력해요. 그런 역이 없으면 −1 을 출력해요.")}
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
    // 1-1b: 입출력 형식 (시즌 표준 — photoshoot25 형태). ⚠️ PDF 원문 없음(public/problems/ 에
    // milkfactory.pdf 없음) — CONSTRAINTS(제약 숫자) 는 원문으로 확인 못해 넣지 않음.
    // 아래 샘플은 1-3 퀴즈/1-4 입력 스텝과 같은 "1->2, 3->2" 예제를 그대로 재사용하고,
    // 🔒 검증된 FULL_PY 로직으로 직접 돌려 "2" 를 확인함.
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? N, then N-1 belt lines.",
        "입력은 N, 그 다음 컨베이어 N-1줄로 와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of stations", "— 역의 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>a b</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— belt carries milk from a to b", "— 컨베이어가 a 에서 b 로 우유를 옮김")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N-1 times", "↑ 이 줄이 N-1 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the station number every other station can reach, or -1 if none.",
                  "한 줄: 다른 모든 역에서 갈 수 있는 역 번호, 없으면 -1.")}
            </div>
          </div>
          {/* 샘플 — 1-3 퀴즈와 같은 1->2, 3->2 예제, 실제 코드로 검증함 */}
          <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 10, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "SAMPLE", "샘플")}</div>
            <div style={{ whiteSpace: "pre" }}>{`3\n1 2\n3 2`}</div>
            <div style={{ color: "#15803d", marginTop: 4 }}>→ {`2`}</div>
          </div>
        </div>),
    },
    // 1-2: Belt-graph reachability sim (interactive)
    {
      type: "reveal",
      narr: t(E,
        "Edit the belts and pick a candidate station.",
        "컨베이어를 고치고 후보 역을 골라 봐요."),
      content: <MilkFactoryBeltSim E={E} />,
    },
    // 1-3: Quiz (uses example student just simulated)
    {
      type: "quiz",
      narr: t(E,
        "Consider: edges 1->2 and 3->2. Which station is reachable from all others?", "컨베이어가 1→2, 3→2 일 때 우유는 어디로 모일까요?"),
      question: t(E,
        "Edges: 1->2, 3->2. Which station can all others reach?",
        "컨베이어가 1→2, 3→2 예요. 다른 모든 역에서 갈 수 있는 역은 어디일까요?"),
      options: [
        t(E, "Station 1", "역 1"),
        t(E, "Station 2", "역 2"),
        t(E, "Station 3", "역 3"),
        t(E, "No such station (-1)", "그런 역이 없어요 (-1)"),
      ],
      correct: 1,
      explain: t(E,
        "Station 2 is reachable from 1 (via 1->2) and from 3 (via 3->2). Station 2 can reach itself.",
        "역 2 는 1 에서 (1→2), 3 에서 (3→2) 갈 수 있어요. 자기 자신에게도 갈 수 있고요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "In the example above, what station number is the answer?", "답이 몇 번 역인지 적어 봐요."),
      question: t(E,
        "Edges: 1->2, 3->2. Answer station number?",
        "컨베이어가 1→2, 3→2 예요. 답은 몇 번 역일까요?"),
      hint: t(E,
        "Where do all the conveyor arrows point toward?",
        "컨베이어 화살표가 모두 어디를 향하고 있나요?"),
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
        "Reverse the arrows — then just check if all stations reach from one.",
        "화살표를 거꾸로 뒤집으면 한 역에서 다 갈 수 있는지만 보면 돼요."),
      sections: getMilkFactorySections(E),
    },
  ];
}
