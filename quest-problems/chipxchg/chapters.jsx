import { C, t } from "@/components/quest/theme";
import { getChipXchgWalk, getChipXchgBruteWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ChipCountSim, AdversarySim, GameBoardSim, SearchSim, CheckSim, StrategySlide, PlanSlide, CandidateSim } from "./sims";

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
          reason={t(E, <>Start empty; the trickster wastes blue → need <b style={{color:"#15803d"}}>9 extra</b> <span style={{color:"#94a3b8"}}>(we'll see why!)</span></>,
                       <>빈손 시작인데 심술쟁이가 파랑을 낭비 → <b style={{color:"#15803d"}}>추가 9개</b> 필요 <span style={{color:"#94a3b8"}}>(왜인지 곧!)</span></>)} />
      </div>
      {/* 출력 뜻 */}
      <div style={{ marginTop: 10, background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
        {t(E, "Output = fewest extra chips ", "출력 = 필요한 최소 추가 칩 ")}<b>x</b>{t(E, " that reaches the goal no matter how the trickster splits.", " — 심술쟁이가 어떻게 나눠도 목표 도달.")}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "📌 Up to 10⁴ tests · answer can reach 10¹⁸ → use 64-bit.", "📌 테스트 최대 10⁴ · 답이 10¹⁸ 까지 → 64비트 필요.")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeChipXchgCh1 — mooin3 모양 (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플입출력 → 환전계산 → 심술쟁이 → 답찾기(이분탐색)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh1(E) {
  return [
    // [기] 문제 (도입) = 게임 한 판을 구체 그림으로 (첫 화면부터 단계별 시뮬)
    {
      type: "reveal",
      label: t(E, "The game", "게임 이해"),
      narr: t(E, "Bessie's chip-swap game — let's just watch one round with real chips, step by step.",
                 "Bessie 의 칩 교환 게임 — 진짜 칩으로 한 판을 한 단계씩 같이 봐요."),
      content: (<GameBoardSim E={E} />),
    },

    // [승] 샘플 입출력 — 입력 숫자마다 뜻이 바로 아래
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "Two concrete tests — each input number labeled right under it.", "구체적인 테스트 두 개 — 입력 숫자마다 뜻이 바로 아래."),
      content: (<ChipXchgSample E={E} />),
    },

    // [승] ② 이해 확인 — 우리가 뭘 구하는지 자가 확인
    {
      type: "reveal",
      label: t(E, "Quick check", "이해 확인"),
      narr: t(E, "Before strategy — check you know what we're actually asked to print.",
                 "전략 전에 — 우리가 뭘 출력하는 건지 스스로 확인해봐요."),
      content: (<CheckSim E={E} />),
    },

    // [전] ③ 전략 — 어떻게 풀지 큰 그림 + 두 하위 질문
    {
      type: "reveal",
      label: t(E, "Strategy", "전략"),
      narr: t(E, "The plan: test a candidate x, and it splits into two questions.",
                 "계획 — 후보 x 를 시험해요. 이게 두 가지 질문으로 갈려요."),
      content: (<StrategySlide E={E} />),
    },

    // [전] 도구 ①-a: 환전 계산 (최악 계산의 기초)
    {
      type: "reveal",
      label: t(E, "Tool ①a: counting red", "도구 ①a: 환전 세기"),
      narr: t(E, "Question ①, part a — given a pile, how many red do I end with? Group the blue; leftovers waste.",
                 "질문 ① 의 준비 — 어떤 더미면 최종 빨강 몇 개? 파랑을 묶고, 자투리는 버려요."),
      content: (<ChipCountSim E={E} />),
    },

    // [전] 도구 ①-b: 심술쟁이 최악 (한 x)
    {
      type: "reveal",
      label: t(E, "Tool ①b: worst split", "도구 ①b: 심술쟁이 최악"),
      narr: t(E, "Question ① — for one x, try every split; the trickster picks the worst.",
                 "질문 ① — 한 x 에서 모든 분배를 따져 심술쟁이가 최악을 골라요."),
      content: (<AdversarySim E={E} />),
    },

    // [전] 도구 ①-c: 브루트(b 다 재기) → 후보 몇 개만 재기 (O(1) 다리).
    //   모듈러 공식 유도는 안 함 (Bronze 범위 밖) — 후보 4개로 최악 찾는 아이디어만.
    {
      type: "reveal",
      label: t(E, "Tool ①c: check a few suspects", "도구 ①c: 후보 몇 개만"),
      narr: t(E, "x can be huge, so we can't try every split — the worst is always one of a few candidates; check only those.",
                 "x 가 크면 모든 분배를 못 해요 — 최악은 늘 후보 몇 개 중 하나. 그 몇 개만 재요."),
      content: (<CandidateSim E={E} />),
    },

    // [결] ⑤ 답 찾기 (질문②) — 브루트 한계(10¹⁸)→계단→이분탐색까지 한 시뮬에서
    {
      type: "reveal",
      label: t(E, "Find x: binary search", "답 찾기: 이분탐색"),
      narr: t(E, "Question ② — trying every x is too slow (up to 10¹⁸). But the worst case is a staircase → binary-search it.",
                 "질문 ② — 모든 x 를 다 해보면 느려요 (10¹⁸까지). 근데 최악이 계단 → 이분탐색으로 콕."),
      content: (<SearchSim E={E} />),
    },

    // [결] ⑥ 계획 — 코드 짜는 순서 (코드 전에 말로)
    {
      type: "reveal",
      label: t(E, "The plan (before code)", "계획"),
      narr: t(E, "Turn the strategy into the exact steps the code will follow.",
                 "전략을 코드가 따라갈 순서로 정리해요 — 다음 챕터 코드가 이대로예요."),
      content: (<PlanSlide E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeChipXchgCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh2(E, lang = "py") {
  const brute = getChipXchgBruteWalk(E, lang);
  const fast = getChipXchgWalk(E, lang);
  return [
    // 코드 ① 쉬운 브루트포스 — 먼저 이해되는 버전 (느림)
    {
      type: "reveal",
      label: t(E, "Code ① brute force", "코드 ① 쉬운 브루트"),
      narr: t(E,
        "Start with the simple, readable version — try every split b, and raise x one at a time.",
        "먼저 쉽고 그대로 읽히는 버전 — 나눔 b 를 다 해보고, x 를 하나씩 늘려요."),
      content: (
        <CodeWalk E={E} lang={lang} code={brute.code} vars={brute.vars} beats={brute.beats} accent="#2563eb" />
      ),
    },
    // 코드 ② 빠른 코드 — 브루트 한계 → 이분탐색 × 후보
    {
      type: "reveal",
      label: t(E, "Code ② fast", "코드 ② 빠른 코드"),
      narr: t(E,
        "x can reach 10¹⁸, so the brute is far too slow. Binary-search x, and check only a few candidate b's (O(1)). Same names, now with the shortcuts.",
        "x 가 10¹⁸까지라 브루트는 너무 느려요. x 는 이분탐색으로, b 는 후보 몇 개만 (O(1)). 같은 이름, 지름길만 추가."),
      content: (
        <CodeWalk E={E} lang={lang} code={fast.code} vars={fast.vars} beats={fast.beats} accent="#2563eb" />
      ),
    },
  ];
}
