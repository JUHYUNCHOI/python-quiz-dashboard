import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAcowdemia2Sections } from "./components";

/* ---------- Definitely-Senior Auditor ----------
   Additive bilingual interactive sim. The student edits two papers' author
   lists and watches the (a -> b) "always before" matrix update live. The
   verdict for the pair (A, B) flips between DEFINITELY SENIOR and
   UNDETERMINED based on whether A appears before B in every shared paper. */
function DefinitelySeniorSim({ E }) {
  // Two papers, each an ordered list of author IDs (0-indexed cows).
  const [papers, setPapers] = useState([
    [0, 1, 2],
    [1, 0],
  ]);
  const [pairA, setPairA] = useState(0);
  const [pairB, setPairB] = useState(1);

  const N = 3;
  const COW_EMOJI = ["🐄", "🐮", "🐂"];
  const COW_COLOR = ["#2563eb", "#7c3aed", "#15803d"];
  const cowName = (id) => `${COW_EMOJI[id]}${id}`;

  // before[a][b] = true if some paper has a appearing before b.
  const before = Array.from({ length: N }, () => Array(N).fill(false));
  for (const auth of papers) {
    for (let i = 0; i < auth.length; i++) {
      for (let j = i + 1; j < auth.length; j++) {
        before[auth[i]][auth[j]] = true;
      }
    }
  }

  // verdict for ordered pair (A, B):
  //  - SHARED: at least one paper contains both
  //  - SENIOR: shared && before[A][B] && !before[B][A]
  const sharesPaper = (a, b) => papers.some((p) => p.includes(a) && p.includes(b));
  const verdict = (a, b) => {
    if (a === b) return "self";
    if (!sharesPaper(a, b)) return "noshare";
    if (before[a][b] && !before[b][a]) return "senior";
    return "undetermined";
  };

  const cyclePos = (pi, slot) => {
    const next = papers.map((p) => p.slice());
    const list = next[pi];
    list[slot] = (list[slot] + 1) % N;
    setPapers(next);
  };
  const addAuthor = (pi) => {
    if (papers[pi].length >= 4) return;
    const next = papers.map((p) => p.slice());
    next[pi].push(0);
    setPapers(next);
  };
  const delAuthor = (pi) => {
    if (papers[pi].length <= 1) return;
    const next = papers.map((p) => p.slice());
    next[pi].pop();
    setPapers(next);
  };
  const reset = () => {
    setPapers([[0, 1, 2], [1, 0]]);
    setPairA(0);
    setPairB(1);
  };

  const v = verdict(pairA, pairB);
  const verdictColor =
    v === "senior" ? "#15803d" :
    v === "undetermined" ? "#b45309" :
    v === "noshare" ? "#6b7280" : "#6b7280";
  const verdictBg =
    v === "senior" ? "#dcfce7" :
    v === "undetermined" ? "#fef3c7" :
    v === "noshare" ? "#f3f4f6" : "#f3f4f6";
  const verdictText =
    v === "senior" ? t(E, "DEFINITELY SENIOR ✅", "확실히 선임 ✅") :
    v === "undetermined" ? t(E, "UNDETERMINED ❓", "판단 불가 ❓") :
    v === "noshare" ? t(E, "no shared paper", "공동 논문 없음") :
    t(E, "same cow", "같은 소");

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14, marginTop: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", marginBottom: 6, letterSpacing: 0.4 }}>
        🧪 {t(E, "Try it: Definitely-Senior Auditor", "직접 해보기: 선임 판정 시뮬레이터")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E,
          "Tap any author chip to cycle the cow ID. Pick a pair (A, B) below — the verdict flips live. A is 'definitely senior' to B only when they share a paper AND A is before B in every shared paper.",
          "저자 칩을 눌러 소 번호를 바꿔봐요. 아래에서 (A, B) 를 골라요 — 판정이 바로 바뀌어요. 함께 쓴 논문이 있고, 그 모든 논문에서 A 가 B 보다 앞일 때만 '확실히 선임'.")}
      </div>

      {/* Papers */}
      {papers.map((auth, pi) => (
        <div key={pi} style={{
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10,
          padding: "8px 10px", marginBottom: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", minWidth: 56 }}>
              📄 {t(E, `Paper ${pi + 1}`, `논문 ${pi + 1}`)}
            </span>
            {auth.map((cid, slot) => (
              <button key={slot} onClick={() => cyclePos(pi, slot)} style={{
                background: "#fff", color: COW_COLOR[cid],
                border: `1.5px solid ${COW_COLOR[cid]}`, borderRadius: 8,
                padding: "3px 9px", fontSize: 13, fontWeight: 800, cursor: "pointer",
                fontFamily: "monospace",
              }}>{cowName(cid)}</button>
            ))}
            <button onClick={() => addAuthor(pi)} disabled={auth.length >= 4} style={{
              background: "transparent", border: "1px dashed #94a3b8", borderRadius: 6,
              color: "#475569", padding: "2px 7px", fontSize: 11, cursor: auth.length >= 4 ? "not-allowed" : "pointer",
              opacity: auth.length >= 4 ? 0.4 : 1,
            }}>+</button>
            <button onClick={() => delAuthor(pi)} disabled={auth.length <= 1} style={{
              background: "transparent", border: "1px dashed #94a3b8", borderRadius: 6,
              color: "#475569", padding: "2px 7px", fontSize: 11, cursor: auth.length <= 1 ? "not-allowed" : "pointer",
              opacity: auth.length <= 1 ? 0.4 : 1,
            }}>−</button>
          </div>
        </div>
      ))}

      {/* Pair selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>
          {t(E, "Audit pair:", "판정할 쌍:")}
        </span>
        <span style={{ fontSize: 11, color: "#64748b" }}>A =</span>
        {[0, 1, 2].map((id) => (
          <button key={`A${id}`} onClick={() => setPairA(id)} style={{
            background: pairA === id ? COW_COLOR[id] : "#fff",
            color: pairA === id ? "#fff" : COW_COLOR[id],
            border: `1.5px solid ${COW_COLOR[id]}`, borderRadius: 6,
            padding: "2px 7px", fontSize: 12, fontWeight: 800, cursor: "pointer",
            fontFamily: "monospace",
          }}>{cowName(id)}</button>
        ))}
        <span style={{ fontSize: 11, color: "#64748b", marginLeft: 4 }}>B =</span>
        {[0, 1, 2].map((id) => (
          <button key={`B${id}`} onClick={() => setPairB(id)} style={{
            background: pairB === id ? COW_COLOR[id] : "#fff",
            color: pairB === id ? "#fff" : COW_COLOR[id],
            border: `1.5px solid ${COW_COLOR[id]}`, borderRadius: 6,
            padding: "2px 7px", fontSize: 12, fontWeight: 800, cursor: "pointer",
            fontFamily: "monospace",
          }}>{cowName(id)}</button>
        ))}
      </div>

      {/* Verdict box */}
      <div style={{
        background: verdictBg, border: `1.5px solid ${verdictColor}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 8,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: verdictColor, letterSpacing: 0.4, marginBottom: 4 }}>
          {t(E, "Verdict for (A, B)", "(A, B) 판정")}
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: verdictColor, fontFamily: "monospace" }}>
          {cowName(pairA)} → {cowName(pairB)} : {verdictText}
        </div>
        <div style={{ fontSize: 11, color: verdictColor, marginTop: 4, lineHeight: 1.5 }}>
          {pairA === pairB
            ? t(E, "Pick two different cows.", "서로 다른 소를 골라요.")
            : v === "noshare"
            ? t(E, "These cows never co-author a paper, so seniority cannot be checked.", "두 소가 함께 쓴 논문이 없어서 선임 여부를 확인할 수 없어요.")
            : v === "senior"
            ? t(E, `In every shared paper, ${cowName(pairA)} appears before ${cowName(pairB)}.`,
                  `함께 쓴 모든 논문에서 ${cowName(pairA)} 가 ${cowName(pairB)} 보다 앞에 등장해요.`)
            : t(E, `At least one shared paper has ${cowName(pairB)} before ${cowName(pairA)} — the order is not consistent.`,
                  `한 논문이라도 ${cowName(pairB)} 가 ${cowName(pairA)} 보다 앞이면 — 순서가 일관되지 않아요.`)}
        </div>
      </div>

      {/* before[][] mini-matrix */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>
          {t(E, "before[a][b]:", "before[a][b]:")}
        </div>
        <div style={{ display: "inline-grid", gridTemplateColumns: `auto repeat(${N}, 28px)`, gap: 2, fontFamily: "monospace", fontSize: 11 }}>
          <div></div>
          {[0, 1, 2].map((b) => (
            <div key={`hb${b}`} style={{ textAlign: "center", color: COW_COLOR[b], fontWeight: 800 }}>{b}</div>
          ))}
          {[0, 1, 2].flatMap((a) => [
            <div key={`ra${a}`} style={{ color: COW_COLOR[a], fontWeight: 800, paddingRight: 4 }}>{a}</div>,
            ...[0, 1, 2].map((b) => {
              const on = a !== b && before[a][b];
              const hi = a === pairA && b === pairB;
              return (
                <div key={`c${a}${b}`} style={{
                  width: 28, height: 22, lineHeight: "22px", textAlign: "center",
                  background: a === b ? "#f3f4f6" : on ? "#dcfce7" : "#fef3c7",
                  color: a === b ? "#9ca3af" : on ? "#15803d" : "#b45309",
                  border: hi ? "2px solid #2563eb" : "1px solid #e5e7eb",
                  borderRadius: 4, fontWeight: 800,
                }}>{a === b ? "·" : on ? "T" : "F"}</div>
              );
            }),
          ])}
        </div>
        <button onClick={reset} style={{
          marginLeft: "auto", background: "transparent", border: "1px solid #cbd5e1",
          color: "#475569", borderRadius: 6, padding: "3px 9px", fontSize: 11, cursor: "pointer", fontWeight: 700,
        }}>{t(E, "↺ reset", "↺ 초기화")}</button>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "# order[a][b] = True if a always before b",
  "before = [[False]*(N) for _ in range(N)]",
  "",
  "for _ in range(M):",
  "    K = int(input())",
  "    authors = list(map(int, input().split()))",
  "    for i in range(K):",
  "        for j in range(i+1, K):",
  "            before[authors[i]][authors[j]] = True",
  "",
  "for a in range(N):",
  "    for b in range(N):",
  "        if a != b:",
  "            if before[a][b] and not before[b][a]:",
  "                print('YES')  # a more senior",
  "            else:",
  "                print('UNDETERMINED')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "K papers are each authored by some subset of N total cow-researchers, written in a particular order.\nCow A is more senior than cow B if (a) they share at least one paper, and (b) on every shared paper A's name appears BEFORE B's. Count how many ordered pairs (A, B) satisfy this 'definitely senior' relation.",
        "N명의 소-연구자가 함께 K개의 논문을 썼고, 각 논문마다 저자 순서가 정해져 있어요.\n소 A 가 소 B 보다 '확실히 선임' 이려면 두 가지 조건이 필요해요. 첫째, 둘이 함께 쓴 논문이 하나라도 있어야 해요. 둘째, 그 모든 공동 논문에서 A 의 이름이 B 보다 앞에 나와야 해요. 이 조건을 만족하는 순서쌍 (A, B) 의 개수를 출력해요."),
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
                "Print the number of ordered pairs (A, B) where A is definitely senior to B.",
                "A 가 B 보다 확실히 선임인 순서쌍 (A, B) 의 개수를 출력해요.")}
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
                  <b style={{ color: "#2563eb" }}>{t(E, "N cow-researchers and K papers", "N명의 소-연구자와 K개의 논문")}</b>
                  {t(E, " — each paper has an ordered list of authors.",
                        " 이 있고, 각 논문은 정해진 순서의 저자 목록을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cow ", "소 ")}
                  <b style={{ color: "#7c3aed" }}>A is 'definitely senior' to B</b>
                  {t(E, " if they share at least one paper AND in every shared paper A's name appears before B's.",
                        " 인 조건: 둘이 함께 쓴 논문이 1개 이상 있고, 그 모든 공동 논문에서 A 가 B 보다 앞에 등장.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of ordered pairs (A, B) where A is definitely senior to B", "A 가 B 보다 확실히 선임인 순서쌍 (A, B) 의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <DefinitelySeniorSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In author list [A, B, C], A appears before B.\nIf this is the only paper, can we say A is more senior than B?", "저자 목록 [A, B, C]에서 A가 B 앞에 나와요. 이것이 유일한 논문이면, A가 B보다 선임이라고 할 수 있을까?"),
      question: t(E,
        "List [A,B,C]: A always before B. A more senior or equal?",
        "목록 [A,B,C]: A가 항상 B 앞. A가 더 선임 또는 동등?"),
      options: [
        t(E, "Yes, A is more senior", "네, A가 더 선임"),
        t(E, "No, we can't tell from one paper", "아니요, 논문 하나로는 알 수 없어"),
      ],
      correct: 0,
      explain: t(E,
        "If A always appears before B in all co-authored papers, we conclude A is more senior (or equal).",
        "공동 저술한 모든 논문에서 A가 항상 B 앞에 나타나면, A가 더 선임(또는 동등)이라고 결론."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2 publications: [A,B] and [B,A].\nWhat is the relationship between A and B?\nEnter 0 for undetermined.", "2개의 논문: [A,B]와 [B,A]. A와 B의 관계는? 판단 불가이면 0을 입력해요."),
      question: t(E,
        "Pubs [A,B] and [B,A]. Relationship? (0=undetermined)",
        "논문 [A,B]와 [B,A]. 관계? (0=판단 불가)"),
      hint: t(E,
        "Look at each paper separately — is A always before B across all of them?",
        "두 논문을 각각 살펴봐요 — 모든 논문에서 A 가 항상 B 보다 앞에 있나요?"),
      answer: 0,
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
        "For every paper, mark before[a][b] = True if a appears before b somewhere in that paper. Cow A is 'definitely senior' to B iff before[A][B] is True AND before[B][A] is False. Sum over all (A, B). Sections build it one piece at a time.",
        "모든 논문에서, 그 논문 안에서 a 가 b 보다 앞이면 before[a][b] = True. A 가 B 보다 '확실히 선임' 이면 before[A][B] 가 True 이고 before[B][A] 가 False. 모든 (A, B) 에 대해 합산. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAcowdemia2Sections(E),
    },
  ];
}
