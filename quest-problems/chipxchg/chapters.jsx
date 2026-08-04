import { C, t } from "@/components/quest/theme";
import { getChipXchgSections, getChipXchgWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeChipXchgCh1 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh1(E) {
  return [
    // 1-1: Title reveal & mission
    {
      type: "reveal",
      /* 도입에 기호를 쓰지 않는다 (선생님 2026-07-30: "뭔말이지?", "굳이 처음에
         _ 이게 왜 있는지 모르겠더라고").  옛 첫 문장은 A·B·c_A·c_B·f_A 다섯 기호를
         정의 없이 한꺼번에 던졌다 — checkups 6원칙의 "기호 정의 먼저" 위반.
         구체적인 색·숫자로 먼저 말하고, 이름은 아래 📎 에서 마지막에. */
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

          {/* 🎯 Mission box */}
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
                <div>
                  {t(E, "You have: ", "지금 있는 것: ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "some red chips and some blue chips.", "빨간 칩 몇 개, 파란 칩 몇 개.")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Exchange: ", "교환소: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "hand in blue chips \u2192 get red chips", "파란 칩 몇 개를 내면 \u2192 빨간 칩 몇 개")}</b>
                  {t(E, " (blue \u2192 red only, repeat as you like).", " (파랑 \u2192 빨강 한 방향, 몇 번이든).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "More chips arrive, but ", "칩을 더 받는데, ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "a trickster decides how many go red and how many go blue.", "빨강 몇 개, 파랑 몇 개로 갈지 심술쟁이가 정해요.")}</b>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the fewest ", "가장 적은 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "extra chips", "추가 칩 개수")}</b>
                  {t(E, " that always reaches the red-chip goal. (Up to 10^4 test cases; the answer can reach 10^18 \u2014 use 64-bit.)",
                       " 를 출력 \u2014 어떻게 나뉘어도 목표를 채우는 개수. (테스트 최대 10^4, 답이 10^18 까지 커서 64비트 필요.)")}
                </div>
              </div>
            </div>
          </div>

          {/* 📎 이름 붙이기 — *마지막에.*  위에서 색·숫자로 이해한 다음에야 기호가
              의미를 갖는다.  다음 슬라이드부터 A칩/B칩·c_A·c_B 를 쓰므로 여기서
              다리를 놓아야 한다 (안 그러면 빨강/파랑 ↔ A/B 가 따로 논다).
              선생님이 막힌 지점이 정확히 "_ 가 왜 있는지" 라 그것도 한 줄. */}
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10,
            padding: "10px 13px", fontSize: 12, color: "#475569", lineHeight: 1.75,
            wordBreak: "keep-all",
          }}>
            <div style={{ fontWeight: 700, color: "#334155", marginBottom: 4 }}>
              📎 {t(E, "Names for these (used from the next page)", "여기에 이름 붙이기 (다음 장부터 이 이름을 써요)")}
            </div>
            <div>
              🔴 {t(E, "red chip", "빨간 칩")} = <b>{t(E, "type-A chip", "A 칩")}</b>
              {" · "}🔵 {t(E, "blue chip", "파란 칩")} = <b>{t(E, "type-B chip", "B 칩")}</b>
            </div>
            <div>
              {t(E, "The trade numbers change from test to test, so they get names: ",
                    "교환 숫자는 문제마다 달라서 이름이 붙어요: ")}
              <b style={{ color: "#0891b2" }}>c_B</b>{t(E, " blue in → ", " 개 파랑 내고 → ")}
              <b style={{ color: "#0891b2" }}>c_A</b>{t(E, " red out", " 개 빨강 받기")}
              {t(E, ", goal ", ", 목표는 ")}<b style={{ color: "#15803d" }}>f_A</b>
              {t(E, " red chips.", " 개 빨강.")}
            </div>
            <div style={{ color: "#64748b" }}>
              {t(E, "( the _ is just a small letter written below: c_B means “c, the blue one” )",
                    "( _ 는 아래에 작게 쓰는 글자예요. c_B = “c 인데 파랑 쪽” )")}
            </div>
          </div>
        </div>),
    },

    // 1-1b: Numeric warm-up — ground the variables before the abstract formula
    {
      type: "reveal",
      narr: t(E,
        "Before the formula, let's try tiny numbers. Trade rule: 3 type-B chips → 1 type-A chip.",
        "공식 전에 작은 숫자로 먼저 해봐요. 환전 규칙: B칩 3개 → A칩 1개."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1.5px solid #16a34a", borderRadius: 10, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
              🔢 {t(E, "Get a feel with numbers first", "숫자로 먼저 감 잡기")}
            </div>
            <div style={{ marginBottom: 8 }}>
              {t(E, "Trade rule: ", "환전 규칙: ")}
              <b style={{ color: "#0891b2" }}>{t(E, "3 type-B → 1 type-A", "B칩 3개 → A칩 1개")}</b>
              {" (c_B=3, c_A=1)"}
            </div>
            <div style={{ marginBottom: 8 }}>
              {t(E, "You hold ", "지금 손에 ")}
              <b>{t(E, "2 type-A and 7 type-B", "A칩 2개, B칩 7개")}</b>
              {t(E, ". Final type-A count?", ". 최종 A칩은?")}
            </div>
            <div style={{ paddingLeft: 8, borderLeft: "3px solid #86efac", display: "flex", flexDirection: "column", gap: 4 }}>
              <div>{t(E, "7 type-B = (group of 3) ×2 + 1 leftover", "B칩 7개 = (3개 묶음) ×2 + 자투리 1개")}</div>
              <div>{t(E, "2 groups → 2 type-A ✅  /  1 leftover can't convert ❌", "묶음 2개 → A칩 2개 ✅  /  자투리 1개는 못 바꿈 ❌")}</div>
              <div>{t(E, "Final type-A = 2 + 2 = ", "최종 A칩 = 2 + 2 = ")}<b style={{ color: "#15803d" }}>4</b></div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #86efac" }}>
              👉 <b>{t(E, "Final A = A_now + (B_now // c_B) × c_A", "최종 A = A_now + (B_now // c_B) × c_A")}</b>
              {" = 2 + (7 // 3)×1 = 4"}
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
                {t(E, "( // = integer division; leftovers are discarded )", "( // = 몫. 자투리는 버려져요 )")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Quiz — what does Bessie do with B chips?
    {
      type: "quiz",
      narr: t(E,
        "If Bessie ends with some A chips and some B chips, how many type-A chips does she finish with (assuming she exchanges optimally)?",
        "Bessie 가 A 칩 약간, B 칩 약간을 들고 있을 때, 환전을 잘 하면 최종 A 칩은 몇 개?"),
      question: t(E,
        "Bessie ends holding A_now type-A chips and B_now type-B chips. Final type-A count = ?",
        "Bessie 가 A 칩 A_now 개, B 칩 B_now 개로 끝나면 최종 A 칩 수 = ?"),
      options: [
        t(E, "A_now + (B_now // c_B) * c_A", "A_now + (B_now // c_B) * c_A"),
        t(E, "A_now + B_now", "A_now + B_now"),
      ],
      correct: 0,
      explain: t(E,
        "Right — every full group of c_B type-B chips converts into c_A type-A chips. The B_now mod c_B leftovers are stuck.",
        "정답 — c_B 묶음 하나가 A 칩 c_A 개가 돼요. B_now mod c_B 자투리는 못 바꿔요."),
    },

    // 1-3: Quiz — who decides the split?
    {
      type: "quiz",
      narr: t(E,
        "Why does this problem need any thinking? Because the adversary picks the split that's WORST for Bessie.",
        "이 문제가 어려운 이유? 적이 Bessie 에게 가장 불리하게 나누기 때문이에요."),
      question: t(E,
        "When x extra chips arrive, who picks how many become type A and how many become type B?",
        "추가 x 개가 올 때, A 와 B 로 몇 개씩 갈지 정하는 사람은?"),
      options: [
        t(E, "An adversary — they pick the split that minimizes Bessie's final A count.", "적 — Bessie 의 최종 A 가 가장 작아지게 나눔."),
        t(E, "Bessie — she picks the split that maximizes her final A count.", "Bessie — 자기 최종 A 가 가장 커지게 나눔."),
      ],
      correct: 0,
      explain: t(E,
        "Yes. We must find the smallest x that survives EVERY split. That's why we look at min over splits.",
        "맞아요. 모든 분배에서 살아남는 가장 작은 x 를 찾아야 해요. 그래서 분배에 대한 최솟값을 봐요."),
    },

    // 1-4: NumInput — sample 1
    {
      type: "input",
      narr: t(E,
        "Sample: A=2, B=3, c_A=1, c_B=1, f_A=4. Total chips already = 5, and every B can become an A. How many extra chips x are needed?",
        "예시: A=2, B=3, c_A=1, c_B=1, f_A=4. 이미 칩 5 개, 모든 B 가 A 로 바뀜. 추가 x 는?"),
      question: t(E,
        "A=2, B=3, c_A=c_B=1, f_A=4 → x = ?",
        "A=2, B=3, c_A=c_B=1, f_A=4 → x = ?"),
      hint: t(E,
        "Convert all B → A first. Are you already at f_A?",
        "B 를 다 A 로 바꿔 봐. 이미 f_A 에 도달했나?"),
      answer: 0,
    },

    // 1-5: NumInput — sample 2 (adversary really matters)
    {
      type: "input",
      narr: t(E,
        "Now A=0, B=0, c_A=2, c_B=3, f_A=5. The adversary will pile chips onto type B knowing only every 3rd chip pays off (as 2 A's). How big does x need to be?",
        "이제 A=0, B=0, c_A=2, c_B=3, f_A=5. 적은 B 쪽으로 몰아서 3 개마다 한 번씩만 A 2개로 환전되도록 만들 거예요. x 는?"),
      question: t(E,
        "A=B=0, c_A=2, c_B=3, f_A=5 → x = ?",
        "A=B=0, c_A=2, c_B=3, f_A=5 → x = ?"),
      hint: t(E,
        "Try x=8: if all 8 go to B, that's only floor(8/3)*2 = 4 A-chips. Not enough. Try one bigger.",
        "x=8 시도: 모두 B 면 floor(8/3)*2 = 4 A 칩 — 부족. 하나 더 시도."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeChipXchgCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeChipXchgCh2(E, lang = "py") {
  const w = getChipXchgWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: model one round, narrow b to a few candidates, then binary-search x.",
        "코드를 위에서 아래로 읽어보자 — 말풍선이 설명하는 코드 줄에 바로 붙어 있어: 한 시도 모델링 → b 후보 좁히기 → x 이분 탐색."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />
      ),
    },
  ];
}
