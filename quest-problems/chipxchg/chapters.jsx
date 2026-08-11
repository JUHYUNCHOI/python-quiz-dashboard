import { C, t } from "@/components/quest/theme";
import { getChipXchgWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { ChipCountSim, AdversarySim } from "./sims";

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
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
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
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        <div><b style={{ color: "#2563eb" }}>{t(E, "Test 1", "테스트 1")}</b> {t(E, "(A=2,B=3,cA=cB=1,fA=4): every blue → a red, already have 2+3=5 ≥ 4 → ", "(A=2,B=3,cA=cB=1,fA=4): 파랑 하나가 빨강 하나로, 이미 2+3=5 ≥ 4 → ")}<b style={{ color: "#15803d" }}>x = 0</b></div>
        <div style={{ marginTop: 3 }}><b style={{ color: "#2563eb" }}>{t(E, "Test 2", "테스트 2")}</b> {t(E, "(A=0,B=0,cA=2,cB=3,fA=5): trickster wastes blue → need ", "(A=0,B=0,cA=2,cB=3,fA=5): 심술쟁이가 파랑을 낭비 → ")}<b style={{ color: "#15803d" }}>x = 9</b> {t(E, "(we'll see why!)", "(왜인지 곧!)")}</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all" }}>
        {t(E, "📌 Up to 10⁴ tests · answer can reach 10¹⁸ → use 64-bit.", "📌 테스트 최대 10⁴ · 답이 10¹⁸ 까지 → 64비트 필요.")}
      </div>
    </div>
  );
}

/* 답 찾기 — f(x)=최악 최종빨강 이 x에 대해 안 줄어듦(계단) → 이분탐색. */
function ChipXchgSearch({ E }) {
  const cA = 2, cB = 3, fA = 5;
  const f = (x) => { let m = Infinity; for (let b = 0; b <= x; b++) m = Math.min(m, (x - b) + Math.floor(b / cB) * cA); return m; };
  const xs = Array.from({ length: 11 }, (_, x) => ({ x, v: f(x) }));
  const maxV = Math.max(...xs.map((d) => d.v), fA);
  const firstOk = xs.find((d) => d.v >= fA)?.x;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a", textAlign: "center", marginBottom: 4 }}>
        🎯 {t(E, "Find the smallest x", "가장 작은 x 찾기")}
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto 12px", fontSize: 12.5, color: C.text, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {t(E, "More chips can never hurt (dump extras on red). So the worst-case final red f(x) ",
             "칩이 많아져서 손해일 린 없어요 (남는 건 빨강에 얹으면 되니). 그래서 최악의 최종 빨강 f(x) 는 ")}
        <b style={{ color: "#2563eb" }}>{t(E, "never goes down as x grows", "x 가 커질수록 안 줄어요")}</b>
        {t(E, " — a staircase ↗.", " — 계단 ↗.")}
      </div>

      {/* f(x) 막대 그래프 + 목표선 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 6, height: 150, position: "relative", maxWidth: 520, margin: "0 auto" }}>
        {/* 목표선 */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: (fA / maxV) * 120 + 22, borderTop: "2px dashed #dc2626", zIndex: 2 }}>
          <span style={{ position: "absolute", right: 0, top: -16, fontSize: 10, fontWeight: 800, color: "#dc2626" }}>{t(E, `goal ${fA}`, `목표 ${fA}`)}</span>
        </div>
        {xs.map((d) => {
          const ok = d.v >= fA, first = d.x === firstOk;
          return (
            <div key={d.x} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: ok ? "#15803d" : "#94a3b8" }}>{d.v}</div>
              <div style={{ width: 26, height: (d.v / maxV) * 120 + 2, borderRadius: "4px 4px 0 0",
                background: first ? "#15803d" : ok ? "#86efac" : "#bfdbfe",
                border: first ? "2px solid #15803d" : "none", transition: "all .15s" }} />
              <div style={{ fontSize: 10, fontWeight: first ? 800 : 600, color: first ? "#15803d" : "#64748b", fontFamily: "'JetBrains Mono',monospace" }}>{d.x}</div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10.5, color: C.dim, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>x →</div>

      <div style={{ maxWidth: 460, margin: "14px auto 0", background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
        {t(E, <>The first x that reaches the goal is <b>x = {firstOk}</b>. Since it's a staircase, we don't test every x — <b>binary search</b> jumps straight to it. (x up to ~10¹⁸)</>,
             <>목표에 처음 닿는 x 는 <b>x = {firstOk}</b>. 계단이니 모든 x 를 안 돌아요 — <b>이분탐색</b>으로 콕 집어요. (x 는 최대 ~10¹⁸)</>)}
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
    // [기] 문제 (도입) — 빨강/파랑 칩 + 심술쟁이 (기호는 마지막에)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Bessie has red chips and blue chips. At the exchange, 3 blue chips get her 1 red chip — as many times as she likes. She wants 4 red chips. More chips are coming, but a trickster decides how many go red and how many go blue. How many chips does she need so she gets there no matter what?",
        "Bessie 는 빨간 칩과 파란 칩을 갖고 있어요. 교환소에서 파란 칩 3 개를 내면 빨간 칩 1 개를 줘요 — 몇 번이든. 목표는 빨간 칩 4 개. 칩을 더 받는데, 빨강으로 갈지 파랑으로 갈지는 심술쟁이가 정해요. 심술쟁이가 어떻게 나눠도 목표를 채우려면 몇 개를 받아야 할까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔵"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Chip Exchange</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #1</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "However the trickster splits the extra chips, Bessie must still reach her red-chip goal. Find the smallest number of extra chips that guarantees it.",
                "심술쟁이가 추가 칩을 어떻게 나눠 줘도 빨간 칩 목표를 채울 수 있어야 해요. 그걸 보장하는 가장 작은 추가 칩 개수를 구하기.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>{t(E, "You have: ", "지금 있는 것: ")}<b style={{ color: "#2563eb" }}>{t(E, "some red chips and some blue chips.", "빨간 칩 몇 개, 파란 칩 몇 개.")}</b></div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>{t(E, "Exchange: ", "교환소: ")}<b style={{ color: "#0891b2" }}>{t(E, "hand in blue chips → get red chips", "파란 칩 몇 개를 내면 → 빨간 칩 몇 개")}</b>{t(E, " (blue → red only, repeat as you like).", " (파랑 → 빨강 한 방향, 몇 번이든).")}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>{t(E, "More chips arrive, but ", "칩을 더 받는데, ")}<b style={{ color: "#dc2626" }}>{t(E, "a trickster decides how many go red and how many go blue.", "빨강 몇 개, 파랑 몇 개로 갈지 심술쟁이가 정해요.")}</b></div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>{t(E, "Print the fewest ", "가장 적은 ")}<b style={{ color: "#15803d" }}>{t(E, "extra chips", "추가 칩 개수")}</b>{t(E, " that always reaches the red-chip goal.", " 를 출력 — 어떻게 나뉘어도 목표를 채우는 개수.")}</div>
              </div>
            </div>
          </div>

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: "#475569", lineHeight: 1.75, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 700, color: "#334155", marginBottom: 4 }}>📎 {t(E, "Names for these (used from the next page)", "여기에 이름 붙이기 (다음 장부터 이 이름을 써요)")}</div>
            <div>🔴 {t(E, "red chip", "빨간 칩")} = <b>{t(E, "type-A chip", "A 칩")}</b>{" · "}🔵 {t(E, "blue chip", "파란 칩")} = <b>{t(E, "type-B chip", "B 칩")}</b></div>
            <div>{t(E, "Trade numbers get names: ", "교환 숫자엔 이름이 붙어요: ")}<b style={{ color: "#0891b2" }}>c_B</b>{t(E, " blue in → ", " 개 파랑 내고 → ")}<b style={{ color: "#0891b2" }}>c_A</b>{t(E, " red out", " 개 빨강 받기")}{t(E, ", goal ", ", 목표는 ")}<b style={{ color: "#15803d" }}>f_A</b>{t(E, " red chips.", " 개 빨강.")}</div>
          </div>
        </div>),
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
      content: (<ChipXchgSearch E={E} />),
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
