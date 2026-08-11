import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { IntroSim, FormatSim, EraseRuleSim, StuckSim, InsightSim, LetterGroupSim } from "./sims";

const A = "#059669";

/* 계획/정리 — 발견한 걸 한 판단으로. 학생 목소리. */
function CowSplitsPlan({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "So here's my plan", "그래서 내 계획은")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Check these in order — the first one that fits is the answer.", "위에서부터 확인 — 처음 맞는 게 답.")}
      </div>
      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Is N odd?", "N 이 홀수야?")} res="−1" col="#dc2626" bg="#fef2f2" />
        <Row q={t(E, "Is S already 'same chunk twice'? (front = back)", "S 가 통째로 '같은 것 두 번'? (앞 = 뒤)")} res={t(E, "1 move", "1번")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Otherwise → gather each letter (C, O, W)", "아니면 → 글자별로 모으기 (C, O, W)")} res={t(E, "3 moves", "3번")} col="#8b5cf6" bg="#f5f3ff" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's write the code that does exactly this →", "이제 이걸 그대로 하는 코드를 써보자 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 학생이 스스로 발견하는 흐름 (퀴즈 없음, 학생 목소리)
   이해 → 뭘 지울 수 있나 → 한 방(운) → 막힘 → 핵심 발견 → 실행 → 계획
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E, "A game: wipe the whole row of letters, in as few moves as you can.",
                 "게임 하나: 글자 줄을 통째로 지우기, 되도록 적은 횟수로."),
      content: (<IntroSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "The exact rules: what you're given, what a 'square' is, and what to output.",
                 "정확한 규칙: 뭐가 주어지고, '제곱'이 뭔지, 뭘 출력하는지."),
      content: (<FormatSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "First figure out the rule: what letters am I even allowed to wipe in one move?",
                 "먼저 규칙부터: 한 번에 어떤 글자를 지울 수 있는 거지?"),
      content: (<EraseRuleSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "If I'm lucky one move clears it. But usually I get stuck — what then?",
                 "운 좋으면 한 방에 끝. 근데 보통은 막혀 — 그럼 어쩌지?"),
      content: (<StuckSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "I can pick letters from anywhere… so gather the same letters. Watch why this always works.",
                 "여기저기서 골라도 되니까… 같은 글자끼리 모으자. 왜 항상 되는지 보자."),
      content: (<InsightSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "Now use that idea to actually clear COWOWC.",
                 "그 아이디어로 COWOWC 를 실제로 지워보자."),
      content: (<LetterGroupSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E, "Everything I found = one small decision.",
                 "찾은 걸 다 모으면 = 작은 판단 하나."),
      content: (<CowSplitsPlan E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCowSplitsCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh2(E, lang = "py") {
  const w = getCowSplitsWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Now the code — you just found each step. Read top to bottom; each bubble sits on the lines it explains.",
        "이제 코드 — 방금 단계를 다 찾았지. 위에서 아래로, 말풍선이 설명하는 줄에 붙어 있어."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
