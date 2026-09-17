import { C, t } from "@/components/quest/theme";
import { getMcc19CandySections, Mcc19CandyShoutSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (fast: sum a bit per "odd" round)
   ================================================================ */
export const SOLUTION_CODE = [
  "R = int(input())",
  "shouts = input().split()",
  "",
  "# 마지막 라운드부터 거꾸로 되돌려요.",
  "# 지금 자리가 pos 라면, 한 라운드 전에는",
  "#   \"odd\" 를 외쳤으면  pos * 2      자리에 있었고",
  "#   \"even\" 을 외쳤으면 pos * 2 - 1  자리에 있었어요",
  "pos = 1",
  "for i in range(R - 1, -1, -1):",
  "    if shouts[i] == \"odd\":",
  "        pos = pos * 2",
  "    else:",
  "        pos = pos * 2 - 1",
  "",
  "print(pos)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19CandyCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Students stand in a line at positions 1, 2, 3, …. Over R rounds, each round shouts \"odd\" or \"even\". An \"odd\" shout eliminates everyone at an odd position; an \"even\" shout eliminates the even positions. Survivors renumber from 1.\nBob wants to be the SOLE survivor — print the starting position he must take.",
        "라운드마다 홀수 자리나 짝수 자리가 탈락해요.\nBob 이 끝까지 남으려면 어디에 서야 할까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🍬</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Candy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Given each round's shout, print the starting position Bob must take to be the last one standing.",
                "각 라운드의 외침이 주어질 때, Bob 이 마지막까지 남으려면 서야 할 시작 위치를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Students stand in a line at positions 1, 2, 3, …", "학생들이 1, 2, 3, … 자리에 한 줄로 서 있어요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "총 ")}<b style={{ color: "#dc2626" }}>R</b>{t(E, " rounds. Round i shouts ", " 번의 라운드가 있고, 라운드 i 는 ")}
                  <b style={{ color: "#7c3aed" }}>"odd"</b>{t(E, " or ", " 또는 ")}<b style={{ color: "#7c3aed" }}>"even"</b>
                  {t(E, ".", " 을 외쳐요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>"odd"</b>{t(E, " → everyone at an ODD position is eliminated (evens survive). ", " 면 홀수 자리가 모두 탈락하고 짝수 자리가 살아남아요. ")}
                  <b style={{ color: "#7c3aed" }}>"even"</b>{t(E, " → the EVEN positions are eliminated (odds survive). Survivors keep order and renumber from 1.", " 이면 짝수 자리가 탈락하고 홀수 자리가 살아남아요. 살아남은 사람은 순서를 유지한 채 1 부터 다시 번호를 매겨요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Bob wants to be the sole survivor. Print the ", "Bob 은 혼자 남고 싶어요. ")}
                  <b style={{ color: "#15803d" }}>{t(E, "starting position", "시작 위치")}</b>
                  {t(E, " he must take.", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The shouts arrive in order: the first round comes first, the last round comes last.",
        "외침은 순서대로 들어와요.\n첫 라운드가 맨 앞이고, 마지막 라운드가 맨 뒤예요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#7f1d1d", fontWeight: 800 }}>R</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of rounds", "— 라운드 수")}</span></div>
              <div><span style={{ color: "#7f1d1d", fontWeight: 800 }}>s₁ s₂ … s_R</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— each shout: \"odd\" or \"even\"", "— 각 라운드의 외침: \"odd\" 또는 \"even\"")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the starting position Bob must take.",
                    "Bob 이 서야 할 시작 자리를 한 줄에 써요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#7f1d1d", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7f1d1d", whiteSpace: "pre", overflowX: "auto" }}>
{`3
even even odd`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`5`}</div>
              </div>
            </div>
            {/* 2026-09-08: 여기서 이미 푸는 방법(되돌리기·두배·−1)을 통째로 줬다.
                학생: "아직 문제도 다 안 읽었는데 벌써 답 구하는 방법이 통째로 나왔다."
                답만 남기고 방법은 시뮬(다음 쪽) 몫으로 넘긴다. */}
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line" }}>
              {t(E,
                "Shouts are even, even, odd — and Bob must start at position 5. How would you find that?",
                "외침은 even, even, odd 이고, Bob 은 5 번 자리에서 시작해요.\n그걸 어떻게 찾을까요?")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>R ≥ 1</div>
              <div>{t(E, "every shout is \"odd\" or \"even\"", "외침은 \"odd\" 아니면 \"even\"")}</div>
              {/* 2026-09-17: 원문(ioimalaysia 2019 editorial)에 R 의 정확한 상한이 없다.
                  없는 숫자를 "공식 상한" 인 척 지어내지 않는다. 대신 이 문제가 커지는
                  크기를 정직하게 적는다 — Ch2 의 "R 이 커지면" 이 여기에 기댄다. */}
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2, fontFamily: "inherit", ...KA, whiteSpace: "pre-line" }}>
                {t(E,
                  "The original statement gives no exact upper bound for R.\nBut one round halves the line, so for one person to be left the line needs about 2^R people — that is 2 multiplied by itself R times. R = 40 already means over a trillion.",
                  "원문에 R 이 얼마까지 커지는지는 적혀 있지 않아요.\n다만 한 라운드마다 줄이 절반이 되니, 한 명만 남으려면\n줄에 2^R 명쯤 서 있어야 해요. 2 를 R 번 곱한 수예요.\nR 이 40 이면 벌써 1 조가 넘어요.")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-3: concept sim
    /* 2026-09-17: narr · 겉 제목 · 시뮬 안 제목 셋이 거의 같은 문장이라
       모바일에서 파란 바 → 보라 제목 → 회색 부제가 세로로 3 줄 쌓였다.
       겉 제목을 없애고(시뮬 안에 이미 제목이 있다), 역할을 나눴다 —
       narr 은 상황, 시뮬 안 제목은 할 일. */
    {
      type: "reveal",
      narr: t(E,
        "The students are lined up. The first round is about to start.",
        "학생들이 한 줄로 서 있어요. 이제 첫 라운드가 시작돼요."),
      content: <Mcc19CandyShoutSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      /* 2026-09-08: 여기 narr 에 **정답이 그대로** 적혀 있었다
         ("자리 2 가 살아남아요"). narr 은 질문과 무관하게 항상 먼저 렌더된다 —
         안 풀어도 읽고 클릭만 하면 됐다. 상황만 남기고 답은 뺀다.
         같은 사고를 저장소 전체에서 찾는 검사기: scripts/check-quiz-spoiler.py */
      narr: t(E,
        "One round, shout \"odd\". A full line is just [1, 2].",
        "라운드 한 번, 외침 \"odd\". 꽉 찬 줄은 [1, 2] 예요."),
      question: t(E,
        "R = 1 with shout \"odd\". What starting position must Bob take?",
        "R = 1, 외침 \"odd\". Bob 은 어느 시작 위치에 서야 하나요?"),
      options: [
        t(E, "Position 1", "자리 1"),
        t(E, "Position 2", "자리 2"),
        t(E, "Position 3", "자리 3"),
      ],
      correct: 1,
      explain: t(E,
        "\"odd\" eliminates the odd position, so position 2 survives. Undoing it: the last survivor stands at 1, and one round earlier that was 1 × 2 = 2.",
        "\"odd\" 는 홀수 자리를 없애니 자리 2 가 살아남아요.\n거꾸로 보면 마지막에 남은 사람은 자리 1 이고, 한 라운드 전엔 1 × 2 = 2 였어요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19CandyCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow simulate vs fast bit-per-round
    {
      type: "reveal",
      narr: t(E,
        "Slow way vs fast way.",
        "느린 방법과 빠른 방법을 견줘봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              {/* 2026-09-17: 여기 적힌 "느린 방법" 이 학생이 시뮬에서 해 본 것과 달랐다.
                  시뮬은 줄을 한 번 세우고 라운드마다 지운다. 화면에 한 번도 안 나온
                  "자리마다 다시 돌리기" 를 느리다고 부르면 기댈 경험이 없다.
                  시뮬이 한 그대로를 느린 방법으로 적는다. */}
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: line everyone up and cross them out, round by round", "느림 — 시뮬처럼 줄을 실제로 세우고 라운드마다 지우기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {t(E, "That is exactly what the sim did. But the line holds about 2^R people.\nAt R = 40 you would have to lay out over a trillion of them — you cannot even start.", "방금 시뮬이 한 그대로예요.\n그런데 줄에는 2^R 명이 서 있어요.\nR 이 40 이면 1 조 명을 늘어놓아야 해서 시작조차 못 해요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: undo the rounds, last one first", "빠름 — 라운드를 마지막부터 되돌리기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Start at pos = 1 and walk the rounds backwards: \"odd\" → ×2, \"even\" → ×2 − 1.", "pos = 1 에서 시작해 라운드를 거꾸로 훑어요. \"odd\" 면 ×2, \"even\" 이면 ×2 − 1 을 해요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.",
        "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc19CandySections(E),
    },
  ];
}
