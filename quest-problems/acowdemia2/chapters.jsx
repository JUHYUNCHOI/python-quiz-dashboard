import { C, t } from "@/components/quest/theme";
import { getAcowdemia2Sections } from "./components";

// TODO: sim redesign — replace this static worked example with an interactive
// sim for the REAL Acowdemia II (effort-order publications, alphabetical-tie
// rule, N×N B/1/0/? matrix). The previous DefinitelySeniorSim modeled a
// made-up problem and was removed during the 2026-06-15 rewrite.

/* ---------- Static worked example of official Sample 1 ----------
   Publication lists all N members in DECREASING effort order; ties broken
   alphabetically. More senior = less effort = appears LATER. An adjacent
   pair that is already alphabetical gives NO info (could be a tie); only an
   alphabetical *break* proves a real effort gap. */
function SeniorityWorkedExample({ E }) {
  const members = ["dean", "elsie", "mildred"];
  const COLOR = { dean: "#2563eb", elsie: "#7c3aed", mildred: "#15803d" };
  const pub = ["elsie", "mildred", "dean"]; // decreasing effort

  // Official Sample 1 answer matrix.
  const matrix = [
    ["B", "1", "1"],
    ["0", "B", "?"],
    ["0", "?", "B"],
  ];
  const cellBg = (ch) =>
    ch === "B" ? "#f3f4f6" : ch === "1" ? "#dcfce7" : ch === "0" ? "#fee2e2" : "#fef3c7";
  const cellFg = (ch) =>
    ch === "B" ? "#9ca3af" : ch === "1" ? "#15803d" : ch === "0" ? "#b91c1c" : "#b45309";

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14, marginTop: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", marginBottom: 6, letterSpacing: 0.4 }}>
        🔍 {t(E, "Worked example — Sample 1", "예제 따라가기 — 샘플 1")}
      </div>

      {/* The publication */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
          📄 {t(E, "Publication (most effort → least effort):", "논문 (노력 많음 → 적음):")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {pub.map((nm, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                background: "#fff", color: COLOR[nm], border: `1.5px solid ${COLOR[nm]}`,
                borderRadius: 8, padding: "3px 9px", fontSize: 13, fontWeight: 800, fontFamily: "monospace",
              }}>{nm}</span>
              {i < pub.length - 1 && <span style={{ color: "#94a3b8" }}>›</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Reasoning */}
      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 10 }}>
        <div style={{ marginBottom: 4 }}>
          {t(E,
            "• elsie › mildred is already alphabetical — could be an effort tie, so NO info.",
            "• elsie › mildred 는 이미 알파벳 순서예요. 노력이 같아서 이름순으로 적힌 것일 수도 있고, 진짜 노력 차이일 수도 있어요. 둘을 가릴 수 없으니 아무것도 알 수 없어요.")}
        </div>
        <div style={{ marginBottom: 4 }}>
          {t(E,
            "• mildred › dean breaks alphabetical order → a real effort gap. So dean did LESS effort than both elsie and mildred → dean is senior to both.",
            "• mildred › dean 은 알파벳 순서를 깨뜨려요. 노력이 같으면 반드시 이름순으로 적히니, 순서가 깨졌다는 건 진짜 노력 차이가 있다는 뜻이에요. dean 이 elsie·mildred 보다 노력이 적으니 dean 이 둘보다 선임이에요.")}
        </div>
        <div>
          {t(E,
            "• elsie vs mildred stays '?' — we never proved a gap between them.",
            "• elsie 와 mildred 사이는 '?' 예요. 둘 사이에 노력 차이가 있다는 걸 못 보였거든요.")}
        </div>
      </div>

      {/* Output matrix */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
        {t(E, "Output (row i vs column j):", "출력 (행 i 대 열 j):")}
      </div>
      <div style={{ display: "inline-grid", gridTemplateColumns: `auto repeat(3, 34px)`, gap: 3, fontFamily: "monospace", fontSize: 12 }}>
        <div></div>
        {members.map((nm) => (
          <div key={`h${nm}`} style={{ textAlign: "center", color: COLOR[nm], fontWeight: 800, fontSize: 9 }}>{nm.slice(0, 3)}</div>
        ))}
        {members.flatMap((nm, i) => [
          <div key={`r${nm}`} style={{ color: COLOR[nm], fontWeight: 800, paddingRight: 4, fontSize: 9, lineHeight: "26px" }}>{nm.slice(0, 3)}</div>,
          ...matrix[i].map((ch, j) => (
            <div key={`c${i}${j}`} style={{
              width: 34, height: 26, lineHeight: "26px", textAlign: "center",
              background: cellBg(ch), color: cellFg(ch),
              border: "1px solid #e5e7eb", borderRadius: 4, fontWeight: 800,
            }}>{ch}</div>
          )),
        ])}
      </div>
      <div style={{ fontSize: 10, color: C.dim, marginTop: 6 }}>
        {t(E, "B = self · 1 = row senior · 0 = row junior · ? = undetermined",
              "B = 자기 자신 · 1 = 행이 선임 · 0 = 행이 후임 · ? = 판단 불가")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to figure out the relative seniority of N lab members from K publications.\nEvery publication lists ALL N members in decreasing order of effort. When two members put in the SAME effort, they are listed alphabetically. The rule: a more senior researcher never puts in more effort than a junior one.\nFor each ordered pair (i, j), decide whether i is definitely senior, definitely junior, or undetermined. Output an N×N grid.",
        "논문 K 편의 이름 순서만 보고\n누가 선임이고 누가 후임인지 가려내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc68\u200d\ud83d\udd2c"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Acowdemia II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "For each pair, print 'B' (self), '1' (row senior), '0' (row junior), or '?' (undetermined) as an N×N grid.",
                "각 쌍에 대해 'B'(자기), '1'(행이 선임), '0'(행이 후임), '?'(판단 불가) 를 N×N 격자로 출력해요.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N lab members and K publications", "N명의 연구원과 K개의 논문")}</b>
                  {t(E, ". Each publication lists ALL N members in ", " 이 있어요. 각 논문은 N명 전원을 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "decreasing order of effort", "노력이 많은 순서")}</b>
                  {t(E, ".", " 로 나열해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "When effort is ", "노력이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "tied, members are listed alphabetically", "같으면 이름 알파벳 순으로 나열")}</b>
                  {t(E, ". A more senior member never puts in more effort than a junior one.",
                        " 돼요. 선임은 후임보다 노력을 더 하지 않아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output an ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "N×N grid", "N×N 격자")}</b>
                  {t(E, ": 'B' on the diagonal, '1' if row member is senior, '0' if junior, '?' if undetermined.",
                        " 를 출력해요. 대각선은 'B', 행 연구원이 선임이면 '1', 후임이면 '0', 알 수 없으면 '?' 를 적어요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 📥 I/O + Sample */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 8 }}>
              📥 {t(E, "Input / Output", "입력 / 출력")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 8 }}>
              <div>{t(E, "Line 1: K and N (1 ≤ K, N ≤ 100)", "1번째 줄: K 와 N (1 ≤ K, N ≤ 100)")}</div>
              <div>{t(E, "Line 2: N names (lowercase, ≤ 10 chars) — the member order for the grid", "2번째 줄: N개의 이름 (소문자, 10글자까지) — 격자의 연구원 순서")}</div>
              <div>{t(E, "Next K lines: each lists all N names for one publication", "다음 K 줄: 한 줄이 논문 한 편의 N명 이름이에요")}</div>
              <div>{t(E, "Output: N lines of N characters each", "출력: N 줄, 한 줄에 N 글자씩")}</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 140px" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 3 }}>{t(E, "Sample input", "입력 예")}</div>
                <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: "8px 10px", borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "monospace" }}>{`1 3\ndean elsie mildred\nelsie mildred dean`}</pre>
              </div>
              <div style={{ flex: "1 1 100px" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 3 }}>{t(E, "Sample output", "출력 예")}</div>
                <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: "8px 10px", borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "monospace" }}>{`B11\n0B?\n0?B`}</pre>
              </div>
            </div>
          </div>

          <SeniorityWorkedExample E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A publication lists members in decreasing effort order, ties broken alphabetically.\nIn one publication you see 'amy beth' (amy then beth). Can you conclude amy is more junior than beth?",
        "논문은 노력이 많은 순서로 나열되고,\n노력이 같으면 이름순으로 나열돼요."),
      question: t(E,
        "'amy beth' in one pub (already alphabetical). amy more junior than beth?",
        "한 논문에 'amy beth' 가 이미 알파벳순으로 있어요. amy 가 beth 보다 후임일까요?"),
      options: [
        t(E, "Yes — amy is listed first so she did more effort", "네 — amy 가 앞이라 노력을 더 했어요"),
        t(E, "No — they could be tied, then sorted alphabetically", "아니요 — 노력이 같아서 이름순일 수도 있어요"),
      ],
      correct: 1,
      explain: t(E,
        "'amy beth' is already in alphabetical order, so it could just be an effort tie broken alphabetically. We learn nothing — undetermined.",
        "'amy beth' 는 이미 알파벳순이에요.\n노력이 같아서 이름순으로 적힌 것일 수도 있고, 진짜 노력 차이일 수도 있어요.\n둘을 가릴 수 없으니 아무것도 알아낼 수 없어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "One publication lists 'mildred dean' (mildred then dean).\nThis BREAKS alphabetical order (d < m), proving a real effort gap. So dean did less effort.\nIn the output grid, what digit goes at row=dean, column=mildred? (1 = dean senior, 0 = dean junior)",
        "'mildred dean' 은 알파벳순을 깨뜨려요 (d < m).\n그러니 dean 이 노력을 덜 한 게 확실해요."),
      question: t(E,
        "'mildred dean' breaks alphabetical order. Grid cell row=dean, col=mildred = ? (1 or 0)",
        "'mildred dean' 은 알파벳순을 깨요. 격자에서 행=dean, 열=mildred 칸에는 무엇이 들어갈까요? (1 또는 0)"),
      hint: t(E,
        "Less effort = more senior. dean is listed later (less effort), so dean is senior to mildred.",
        "'mildred dean' 은 알파벳순을 깨뜨렸으니 dean 이 정말로 노력을 덜 한 거예요. 노력이 적으면 선임이니 dean 이 mildred 보다 선임이에요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Each publication lists everyone in decreasing effort order. Scan each pair of positions x < y: once an alphabetical break appears between them, the later author (less effort) is definitely senior to the earlier one. Record senior[later][earlier] = True. Then fill the grid: 'B' on the diagonal, '1'/'0' from senior, '?' otherwise. Sections build it one piece at a time.",
        "알파벳순이 깨진 자리를 찾아 선임 관계를 적고,\n그 기록으로 격자를 채워요."),
      sections: getAcowdemia2Sections(E),
    },
  ];
}
