import { C, t } from "@/components/quest/theme";
import { getCowntactSections, InfectionSim, RunsViz } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowntactCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Find the fewest cows that could have been sick on day 0.",
        "0일차에 감염됐던 소가 최소 몇 마리였을지 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🦠</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c5cfc" }}>Cowntact Tracing 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #7c5cfc", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the smallest possible number of cows that could have been sick on day 0 to produce this final state.",
                "이 최종 상태가 나오려면 0일차에 몇 마리가 감염돼 있어야 했을까요? 그 최소 수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#7c5cfc" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ". Some cows were sick on day 0 — we don't know which.",
                        "가 있어요. 0일차에 어떤 소들이 감염됐는지 우리는 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each night, every sick cow ", "매일 밤, 모든 감염된 소가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "infects her immediate neighbors", "양옆 이웃에게 병을 옮겨요")}</b>
                  {t(E, " (left and right). Once sick, always sick.",
                        " (왼쪽과 오른쪽). 한 번 감염된 소는 계속 감염 상태예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final state", "최종 상태")}</b>
                  {t(E, " — a string of 0s (healthy) and 1s (sick) — after some unknown number of nights.",
                        " — 0(건강)과 1(감염)으로 된 문자열 — 이 며칠 후의 모습으로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows that could have been sick on day 0", "0일차에 감염됐을 수 있는 소의 최소 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1348) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then the final 0/1 string.",
        "입력은 N 다음 최종 0/1 문자열로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>bitstring</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— length N string of 0s and 1s (final state)", "— 길이 N 인 0/1 문자열 (최종 상태)")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The minimum number of cows that could have started sick.",
                  "0일차에 감염됐을 수 있는 소의 최소 수를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 300,000 <span style={{ color: C.dim, fontWeight: 400 }}>{t(E, "(= 3 × 10⁵)", "(= 3 × 10⁵)")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "some subtasks: N ≤ 1,000", "일부 서브태스크: N ≤ 1,000")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Spread simulator — see infection wave with your eyes
    {
      type: "reveal",
      narr: t(E,
        "Try it: pick one source in the middle, then step night by night.",
        "가운데 감염원 하나를 고르고, 한 밤씩 넘기며 지켜봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <InfectionSim E={E} />
          <div style={{ marginTop: 10, padding: "8px 12px", background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 8, fontSize: 12, color: "#9a3412" }}>
            🔑 {t(E,
              "Key observation: a single source's block is always ODD-sized after any number of nights — 1, 3, 5, 7... So an EVEN-sized block can never come from just one source.",
              "핵심 관찰: 감염원 1마리가 만드는 덩어리 크기는 항상 홀수예요 — 1, 3, 5, 7... 그래서 짝수 크기 덩어리는 감염원 1마리로 못 만들어요.")}
          </div>
        </div>),
    },
    // 1-3: Quiz — an even-sized block needs more than 1 source
    {
      type: "quiz",
      narr: t(E,
        "Now think backwards — what's the minimum for \"0110\"?",
        "이번엔 거꾸로 생각해봐요 — \"0110\" 은 최소 몇 마리로 만들 수 있을까요?"),
      question: t(E,
        "\"0110\" — what is the minimum number initially infected?",
        "\"0110\" 이 되려면 처음에 감염된 소는 최소 몇 마리일까요?"),
      options: [
        t(E, "1 (one in the middle)", "1 (가운데 하나)"),
        t(E, "2 (both of them)", "2 (둘 다)"),
        t(E, "4 (all of them)", "4 (전부)"),
      ],
      correct: 1,
      explain: t(E,
        "A single source only ever makes an ODD-sized block (1, 3, 5...). 2 is even, so it can NEVER come from 1 source — both cows must already be sick on day 0.",
        "감염원 1마리가 만드는 덩어리는 항상 홀수 칸이에요 (1, 3, 5...). 2는 짝수라서 절대 안 나와요 — 두 마리 모두 0일차부터 감염돼 있어야 해요."),
    },
    // 1-4: Visualize runs — odd vs even blocks
    {
      type: "reveal",
      narr: t(E,
        "Each '0' splits the row into odd- or even-sized blocks.",
        "0 이 줄을 덩어리로 나누면 크기가 홀수거나 짝수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <RunsViz E={E} str="01110110" />
        </div>),
    },
    // 1-5: Input — how wide does a block grow?
    {
      type: "input",
      narr: t(E,
        "Each night, a block grows by 1 cell on each side.",
        "밤이 지날수록 덩어리는 양쪽으로 1칸씩 자라나요."),
      question: t(E,
        "One source in the middle spreads for 3 nights.\nHow many cells does the block cover?",
        "감염원 1마리가 가운데서 3일 밤 동안 퍼지면,\n덩어리는 몇 칸이 될까요?"),
      hint: t(E,
        "Block size = 2 × (nights) + 1.",
        "덩어리 크기 = 2 × (밤 수) + 1 이에요."),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowntactCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — find the block-size limit, then sum ceil(block / limit).
    {
      type: "progressive",
      narr: t(E,
        "Find the biggest window that fits, then sum ceil(block / window).",
        "딱 맞는 가장 큰 창을 구하고, ceil(덩어리 / 창) 을 더해요."),
      sections: getCowntactSections(E),
    },
  ];
}
