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
        "학생들이 1, 2, 3, … 자리에 한 줄로 서 있어요. R 번의 라운드 동안, 매 라운드마다 \"odd\" 또는 \"even\" 을 외쳐요. \"odd\" 외침은 홀수 자리의 모두를, \"even\" 외침은 짝수 자리의 모두를 탈락시켜요. 살아남은 사람은 1 부터 다시 번호를 매겨요.\nBob 은 혼자 남고 싶어요 — 처음에 서야 할 시작 위치를 출력해요."),
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
                  <b style={{ color: "#7c3aed" }}>"odd"</b>{t(E, " → everyone at an ODD position is eliminated (evens survive). ", " → 홀수 자리의 모두가 탈락 (짝수 자리 생존). ")}
                  <b style={{ color: "#7c3aed" }}>"even"</b>{t(E, " → the EVEN positions are eliminated (odds survive). Survivors keep order and renumber from 1.", " → 짝수 자리가 탈락 (홀수 자리 생존). 살아남은 사람은 순서를 유지한 채 1 부터 다시 번호를 매겨요.")}
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
        "Read the input format and the official example. The shouts arrive in order: round 0 first, round R−1 last.",
        "입력 형식과 공식 예제를 봐요. 외침은 순서대로 들어와요: 라운드 0 이 먼저, 라운드 R−1 이 마지막."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Line 1: ", "1번째 줄: ")}<b>R</b> — {t(E, "the number of rounds", "라운드 수")}</div>
              <div>• {t(E, "Line 2: ", "2번째 줄: ")}<b>R</b> {t(E, "shout words (\"odd\"/\"even\"), space-separated", "개의 외침 단어 (\"odd\"/\"even\"), 공백으로 구분")}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", margin: "10px 0 4px" }}>
              📤 {t(E, "Output", "출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              {t(E, "Bob's starting position.", "Bob 의 시작 위치.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>3</div>
              <div>even even odd</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>5</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {/* 2026-09-08: 여기서 이미 푸는 방법(되돌리기·두배·−1)을 통째로 줬다.
                학생: "아직 문제도 다 안 읽었는데 벌써 답 구하는 방법이 통째로 나왔다."
                답만 남기고 방법은 시뮬(다음 쪽) 몫으로 넘긴다. */}
            {t(E,
              "Rounds are even, even, odd — and Bob must start at position 5. How would you find that?",
              "라운드는 even, even, odd 이고, Bob 은 5 번 자리에서 시작해야 해요.\n그걸 어떻게 찾을까요?")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Set each round's shout and watch the line thin out — who is the last one left?",
        "라운드마다 외침을 정하고 줄이 줄어드는 걸 봐요. 마지막에 누가 남을까요?"),
      content: (
        <div style={{ padding: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#dc2626", textAlign: "center", marginBottom: 6 }}>
            🗣️ {t(E, "Shout Sim — set the shouts, find the survivor", "외침 시뮬 — 외침을 정하고 생존자 찾기")}
          </div>
          <Mcc19CandyShoutSim E={E} />
        </div>),
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
        "\"odd\" 는 홀수 자리를 없애니 자리 2 가 살아남아요. 거꾸로 보면: 마지막에 남은 사람은 자리 1 이고, 한 라운드 전엔 1 × 2 = 2 였어요."),
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
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: guess a position, simulate all rounds, check", "느림: 위치 하나 찍고, 모든 라운드 시뮬, 확인")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Try each starting spot and replay the eliminations — lots of repeated work as R grows.", "각 시작 자리를 시도하며 탈락을 다시 재생 — R 이 커지면 반복이 많아요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: undo the rounds, last one first", "빠름: 라운드를 마지막부터 되돌리기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Start at pos = 1 and walk the rounds backwards: \"odd\" → ×2, \"even\" → ×2 − 1.", "pos = 1 에서 시작해 라운드를 거꾸로 훑어요: \"odd\" 면 ×2, \"even\" 이면 ×2 − 1.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
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
