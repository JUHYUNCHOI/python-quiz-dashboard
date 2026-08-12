import { C, t } from "@/components/quest/theme";
import { getChipXchgWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ChipCountSim, AdversarySim, GameBoardSim, SearchSim } from "./sims";

const A = "#2563eb";

/* 샘플 입출력 — mooin3 모양 (구체 숫자 + 한 줄씩). */
function ChipXchgSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
2 3 1 1 4
0 0 2 3 5`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`0
9`}
          </div>
        </div>
      </div>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
        <div style={{ fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2</code> — {t(E, "T = 2 test cases", "T = 2 (테스트 2개)")}</div>
        <div style={{ marginTop: 4 }}>
          {t(E, "Each test: ", "각 테스트: ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>A B c_A c_B f_A</code>
          {" — "}
          {t(E, "start red / start blue / swap out / swap in / goal red.", "시작 빨강 / 시작 파랑 / 환전 나오는 수 / 환전 내는 수 / 목표 빨강.")}
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
          {t(E, "Output = fewest extra chips ", "출력 = 필요한 최소 추가 칩 ")}<b>x</b>{t(E, " that reaches the goal no matter how the trickster splits.", " — 심술쟁이가 어떻게 나눠도 목표 도달.")}
        </div>
      </div>
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance" }}>
        <div><b style={{ color: "#2563eb" }}>{t(E, "Test 1", "테스트 1")}</b> {t(E, "(A=2,B=3,cA=cB=1,fA=4): every blue → a red, already have 2+3=5 ≥ 4 → ", "(A=2,B=3,cA=cB=1,fA=4): 파랑 하나가 빨강 하나로, 이미 2+3=5 ≥ 4 → ")}<b style={{ color: "#15803d" }}>x = 0</b></div>
        <div style={{ marginTop: 3 }}><b style={{ color: "#2563eb" }}>{t(E, "Test 2", "테스트 2")}</b> {t(E, "(A=0,B=0,cA=2,cB=3,fA=5): trickster wastes blue → need ", "(A=0,B=0,cA=2,cB=3,fA=5): 심술쟁이가 파랑을 낭비 → ")}<b style={{ color: "#15803d" }}>x = 9</b> {t(E, "(we'll see why!)", "(왜인지 곧!)")}</div>
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

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "Two concrete tests — and the answers we must print.", "구체적인 테스트 두 개 — 그리고 우리가 출력할 답."),
      content: (<ChipXchgSample E={E} />),
    },

    // [전] 환전 계산 — 최종 A 공식
    {
      type: "reveal",
      label: t(E, "Counting red chips", "빨강 칩 세기"),
      narr: t(E, "First — if I hold some red and some blue, how many red do I end with? Group the blue.",
                 "먼저 — 빨강 약간, 파랑 약간이면 최종 빨강은 몇 개? 파랑을 묶어봐요."),
      content: (<ChipCountSim E={E} />),
    },

    // [전] 심술쟁이 — 최악 분배
    {
      type: "reveal",
      label: t(E, "The trickster", "심술쟁이"),
      narr: t(E, "Why is this tricky? The trickster splits the extra chips to make my final red as small as possible.",
                 "왜 어렵냐면 — 심술쟁이가 추가 칩을 내 최종 빨강이 최소가 되게 나눠요."),
      content: (<AdversarySim E={E} />),
    },

    // [전/결] 답 찾기 — 이분탐색
    {
      type: "reveal",
      label: t(E, "Find x: binary search", "답 찾기: 이분탐색"),
      narr: t(E, "The worst-case result only grows as x grows — so we binary-search the smallest x that reaches the goal.",
                 "최악 결과는 x 가 커질수록 커지기만 해요 — 그래서 목표에 닿는 가장 작은 x 를 이분탐색해요."),
      content: (<SearchSim E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeChipXchgCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh2(E, lang = "py") {
  const w = getChipXchgWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: model one round, narrow b to a few candidates, then binary-search x.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 한 시도 모델링 → b 후보 좁히기 → x 이분탐색."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />
      ),
    },
  ];
}
