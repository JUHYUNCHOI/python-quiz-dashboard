import { C, t } from "@/components/quest/theme";
import { getChipXchgWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ChipCountSim, GameBoardSim, CheckSim, StrategySlide, PlanSlide, AllBlueWorstSim, AllRedWorstSim, LastOneWhySlide, WhyMinusPlusSim, WorstCaseWhySim } from "./sims";

const A = "#2563eb";

/* 숫자 하나 + 그 아래 바로 라벨·뜻 (봐야 할 곳에 설명) */
function AnnTok({ v, label, ko, color, bg }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 62 }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 800, color, background: bg,
        border: `1.5px solid ${color}`, borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{v}</div>
      <div style={{ fontSize: 10, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: "#475569", wordBreak: "keep-all", textAlign: "center", lineHeight: 1.2 }}>{ko}</div>
    </div>
  );
}

/* 한 테스트 = 입력 숫자(주석 달림) → 출력 + 한 줄 이유 */
function ChipXchgTestCard({ E, n, toks, out, reason }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "10px 12px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#1e3a8a" }}>{t(E, `Test ${n}`, `테스트 ${n}`)}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#166534" }}>
          {t(E, "output ", "출력 ")}<b style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#15803d" }}>{out}</b>
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {toks.map((tk, i) => <AnnTok key={i} {...tk} />)}
      </div>
      <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #e2e8f0", fontSize: 11.5, color: C.text, lineHeight: 1.55, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>{reason}</div>
    </div>
  );
}

/* 샘플 입출력 — 입력 숫자마다 뜻을 바로 아래 붙임 (CodeWalk 원칙). */
function ChipXchgSample({ E }) {
  const RED = "#dc2626", RBG = "#fef2f2", BLU = "#2563eb", BBG = "#eff6ff",
        CY = "#0891b2", CBG = "#ecfeff", GR = "#15803d", GBG = "#f0fdf4";
  const test1 = [
    { v: "2", label: "A", ko: t(E, "start red", "시작 빨강"), color: RED, bg: RBG },
    { v: "3", label: "B", ko: t(E, "start blue", "시작 파랑"), color: BLU, bg: BBG },
    { v: "1", label: "c_A", ko: t(E, "swap→red", "환전: 받는 빨강"), color: CY, bg: CBG },
    { v: "1", label: "c_B", ko: t(E, "swap: blue in", "환전: 내는 파랑"), color: CY, bg: CBG },
    { v: "4", label: "f_A", ko: t(E, "goal red", "목표 빨강"), color: GR, bg: GBG },
  ];
  const test2 = [
    { v: "0", label: "A", ko: t(E, "start red", "시작 빨강"), color: RED, bg: RBG },
    { v: "0", label: "B", ko: t(E, "start blue", "시작 파랑"), color: BLU, bg: BBG },
    { v: "2", label: "c_A", ko: t(E, "swap→red", "환전: 받는 빨강"), color: CY, bg: CBG },
    { v: "3", label: "c_B", ko: t(E, "swap: blue in", "환전: 내는 파랑"), color: CY, bg: CBG },
    { v: "5", label: "f_A", ko: t(E, "goal red", "목표 빨강"), color: GR, bg: GBG },
  ];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 8 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      {/* 첫 줄 = T */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, wordBreak: "keep-all" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: "#7c3aed", background: "#f5f3ff",
          border: "1.5px solid #7c3aed", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>2</div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6" }}>{t(E, "first line = T (number of tests)", "첫 줄 = T (테스트 개수)")}</span>
      </div>
      {/* 각 테스트: 숫자마다 뜻이 바로 아래 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ChipXchgTestCard E={E} n={1} toks={test1} out="0"
          reason={t(E, <>1 blue → 1 red, and I already have 2+3=5 <b style={{color:"#15803d"}}>≥ goal 4</b> → <b style={{color:"#15803d"}}>0 extra</b>.</>,
                       <>파랑 1개가 빨강 1개, 이미 2+3=5 <b style={{color:"#15803d"}}>≥ 목표 4</b> → <b style={{color:"#15803d"}}>추가 0개</b>.</>)} />
        <ChipXchgTestCard E={E} n={2} toks={test2} out="9"
          reason={t(E, <>Start empty; the worst case wastes blue → need <b style={{color:"#15803d"}}>9 extra</b> <span style={{color:"#94a3b8"}}>(we'll see why!)</span></>,
                       <>빈손 시작인데 최악의 경우 파랑을 낭비 → <b style={{color:"#15803d"}}>추가 9개</b> 필요 <span style={{color:"#94a3b8"}}>(왜인지 곧!)</span></>)} />
      </div>
      {/* 출력 뜻 */}
      <div style={{ marginTop: 10, background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
        {t(E, "Output = fewest extra chips ", "출력 = 필요한 최소 추가 칩 ")}<b>x</b>{t(E, " that reaches the goal no matter which combination comes.", " — 어떤 조합이 와도 목표 도달.")}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "📌 Up to 10⁴ tests · answer can reach 10¹⁸ → use 64-bit.", "📌 테스트는 최대 10⁴ 개이고 답이 10¹⁸ 까지 커져요. 그래서 64비트 정수가 필요해요.")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeChipXchgCh1 — mooin3 모양 (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플입출력 → 이해확인 → 전략 → 환전(red_now) → 최악의 경우→공식 → 계획
   (USACO 공식 풀이 = O(1) 닫힌 공식. 이분탐색·후보 안 씀)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh1(E) {
  return [
    // [기] 문제 (도입) = 게임 한 판을 구체 그림으로 (첫 화면부터 단계별 시뮬)
    {
      type: "reveal",
      label: t(E, "The game", "게임 이해"),
      narr: t(E, "Bessie's chip-swap game — let's just watch one round with real chips, step by step.",
                 "Bessie 의 칩 교환 게임이에요. 진짜 칩으로 한 판을 한 단계씩 같이 봐요."),
      content: (<GameBoardSim E={E} />),
    },

    // [승] 샘플 입출력 — 입력 숫자마다 뜻이 바로 아래
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "Two concrete tests — each input number labeled right under it.", "구체적인 테스트 두 개예요. 입력 숫자가 각각 무슨 뜻인지 바로 아래에 적어 뒀어요."),
      content: (<ChipXchgSample E={E} />),
    },

    // [승] ② 이해 확인 — 우리가 뭘 구하는지 자가 확인
    {
      type: "reveal",
      label: t(E, "Quick check", "이해 확인"),
      narr: t(E, "Before strategy — check you know what we're actually asked to print.",
                 "전략으로 넘어가기 전에, 우리가 무엇을 출력해야 하는 건지 스스로 확인해봐요."),
      content: (<CheckSim E={E} />),
    },

    // [승] ②-2 왜 '제일 나쁜 조합' 을 세나 — 랜덤이라 운에 맡길 수 없다는 걸 먼저 못박음.
    //      (선생님 2026-08-27: "랜덤으로 받기 때문에 최악인 경우를 해결해야한다는걸 시뮬로")
    //      1페이지 예제 그대로(빨강2·파랑3·목표5) 라서 답이 3 — 조합을 전부 펼쳐도 짧음.
    {
      type: "reveal",
      label: t(E, "Why the worst case?", "왜 제일 나쁜 경우?"),
      narr: t(E, "The chips arrive without me knowing their colours — so luck can't be part of the answer.",
                 "칩은 무슨 색인지 모른 채로 와요 — 그러니 운에 기댈 수는 없어요."),
      content: (<WorstCaseWhySim E={E} />),
    },

    // [전] 전략 — 공식 큰 그림 (지금 걸로 되나? 안 되면 최악의 경우에 몇 개?)
    {
      type: "reveal",
      label: t(E, "Strategy", "전략"),
      narr: t(E, "First check what I can make now; if it falls short, count how many extra chips are needed.",
                 "먼저 지금 가진 걸로 되는지 보고, 모자라면 칩을 몇 개 받아야 하는지 세요."),
      content: (<StrategySlide E={E} />),
    },

    // [전] 도구: 환전 세기 = init (지금 가진 걸로 만드는 빨강)
    {
      type: "reveal",
      label: t(E, "Tool: red I can make now (red_now)", "도구: 지금 만드는 빨강 (red_now)"),
      narr: t(E, "How many red can I make right now? Group my blue by cB; leftovers waste. That's red_now.",
                 "지금 가진 걸로 빨강을 몇 개까지 만들 수 있을까요? 내 파랑을 cB 개씩 묶어서 바꾸고, 남는 자투리는 버려요. 그 결과가 red_now 예요."),
      content: (<ChipCountSim E={E} />),
    },

    // [전] 도구: 최악의 경우 파랑으로 줌 → 자투리 버림 = 최악 (칩 시각, 슬라이드 없음).
    {
      type: "reveal",
      label: t(E, "Tool: cA < cB (swap loses) → he gives blue", "도구: cA < cB (바꾸면 손해) → 파랑을 준다"),
      narr: t(E, "Swap rate here: 3 blue → 2 red. Blue gives me less — so the worst case hands blue. Watch with real chips.",
                 "이 예시의 환전 비율은 파랑 3개 → 빨강 2개예요. 파랑을 받으면 빨강보다 손해라서, 최악의 경우엔 파랑으로 줍니다. 진짜 칩으로 한 단계씩 봐요."),
      content: (<AllBlueWorstSim E={E} />),
    },

    // [전] 도구: 환전이 이득(cA≥cB)이면 최악의 경우엔 '빨강'을 줌 (파랑 아님). 공식의 다른 가지.
    {
      type: "reveal",
      label: t(E, "Tool: cA ≥ cB (swap gains) → he gives red", "도구: cA ≥ cB (바꾸면 이득) → 빨강을 준다"),
      narr: t(E, "Opposite rate: 2 blue → 3 red. Now blue gives me MORE — so the worst case hands red instead.",
                 "이번엔 반대로 파랑 2개 → 빨강 3개예요. 파랑을 받는 게 오히려 이득이라서, 최악의 경우엔 빨강으로 줍니다."),
      content: (<AllRedWorstSim E={E} />),
    },

    // [전] 도구 ④: 마지막 빨강은 묶음(손해) 말고 낱개로 = 코드 경우 ② 의 근거.
    //      원래 '계획' 슬랩 ④ 안에 있었는데 계획 페이지가 너무 길어져서 형제 도구들 옆으로 옮김
    //      (선생님 2026-08-26: "이걸 다음 페이지에 나두는건? 이 페이지가 넘 긴데").
    {
      type: "reveal",
      label: t(E, "Tool: how many chips force 4 red?", "도구: 빨강 4개를 받으려면 칩 몇 개?"),
      narr: t(E, "How many chips reach the goal no matter which combination comes?",
                 "어떤 조합이 와도 목표에 닿으려면 칩이 몇 개 필요할까요?"),
      content: (<LastOneWhySlide E={E} />),
    },

    // [전] 도구 ④-2: 위 관찰을 칩 개수마다 다 해보면 사다리가 나오고, 거기서 식이 그냥 읽힌다.
    //      한 페이지에 관찰 + 식 유도를 같이 두니 너무 길고, 유도가 '먼저 틀리게 세고 −1 로 고치는'
    //      모양이라 설명이 안 됐음 (선생님 2026-08-27: "결론적으로 −1을 안하면 6이 된다는건 설명이 아니지").
    //      → 식을 missing + eaten*(cB−cA) 로 바꿔 보정을 없애고, 사다리로 관찰→식 순서를 만듦.
    {
      type: "reveal",
      label: t(E, "Tool: why −1 and why +1", "도구: 왜 −1 이고 왜 +1 인가"),
      narr: t(E, "The formula has a −1 and a +1. Here is where each of them comes from.",
                 "식에 −1 과 +1 이 있어요. 그게 각각 어디서 나온 건지 한 단계씩 봐요."),
      content: (<WhyMinusPlusSim E={E} />),
    },

    // [결] 계획 — 공식 단계 (개념 슬라이드, 코드는 다음 챕터에서)

    {
      type: "reveal",
      label: t(E, "The plan (before code)", "계획"),
      narr: t(E, "Turn it into the exact steps the code will follow.",
                 "코드가 따라갈 순서로 정리해요 — 다음 챕터 코드가 이대로예요."),
      content: (<PlanSlide E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeChipXchgCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh2(E, lang = "py") {
  const w = getChipXchgWalk(E, lang);
  return [
    // 코드 — 개념에서 유도한 공식 그대로 (O(1), 제출용). 브루트는 없음.
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "The formula we derived, in code — no loop, no search. One calculation per test (O(1)).",
        "앞에서 만든 공식 그대로예요. 반복도 탐색도 없이 테스트 하나당 계산을 한 번만 해요 (O(1))."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />
      ),
    },
  ];
}
