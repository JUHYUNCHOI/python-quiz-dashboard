import { C, t } from "@/components/quest/theme";
import { SocDist1Sim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Add 2 cows to empty stalls to maximize the minimum gap.",
        "빈 칸에 소 2마리를 더 넣어 최소 거리를 최대로 만들어요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude37"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Social Distancing I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2020 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the largest possible minimum gap after adding 2 more cows to empty stalls.",
                "빈 칸에 소 2마리를 넣어 최소 거리를 가장 크게 만드는 값을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "칸이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N stalls in a row", "N 개")}</b>
                  {t(E, ", each already holding a cow (1) or empty (0) — given as a 0/1 string.",
                        " 한 줄로 있고, 이미 소가 있거나(1) 비어 있어요(0) — 0/1 문자열로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Place EXACTLY ", "빈 칸에 정확히 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "2 more cows", "소 2마리")}</b>
                  {t(E, " into the EMPTY stalls.", "를 새로 놓아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "largest possible minimum distance between neighboring cows", "이웃한 두 소 사이 최소 거리의 가장 큰 값")}</b>
                  {t(E, " after placing them.", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🐄 Deep-audit sim — pick D, watch how many new cows still fit */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 8px", marginTop: 6 }}>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>
              🐄 {t(E, "See it: how many new cows fit as D changes", "직접 봐요 — D 값에 따라 새 소가 몇 마리 들어가는지")}
            </div>
            <SocDist1Sim E={E} />
          </div>
        </div>),
    },

    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1035) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then a 0/1 string of occupied stalls.",
        "입력은 N 다음 현재 소가 있는 칸을 나타내는 0/1 문자열로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of stalls", "— 칸의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>bitstring</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— length N string of 0s and 1s (1 = occupied)", "— 길이 N 인 0/1 문자열 (1 = 소가 있음)")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The largest D achievable after placing 2 new cows in empty stalls.",
                  "빈 칸에 새 소 2마리를 놓은 뒤 얻을 수 있는 가장 큰 D 값을 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>2 ≤ N ≤ 100,000 <span style={{ color: C.dim, fontWeight: 400 }}>{t(E, "(= 10⁵)", "(= 10⁵)")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "the string has at least two 0s  ·  some subtasks: N ≤ 10, ≤ 100, ≤ 5000", "문자열에는 0이 최소 두 개  ·  일부 서브태스크: N ≤ 10, ≤ 100, ≤ 5000")}</div>
            </div>
          </div>
          {/* 샘플 — 시뮬·퀴즈·입력과 같은 예제(0100000010) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
                <div>10</div>
                <div>0100000010</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>2</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "Cows already at stalls 1 and 8. Adding 2 more with every gap at least 2 apart is the best you can do.",
                "1 번과 8 번에 이미 소가 있어요. 2마리를 더해 모든 간격을 2 이상으로 만드는 게 최선이에요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Before hunting for the answer, ask a smaller question: does THIS distance fit?", "답을 찾기 전에 먼저 물어봐요 — 이 거리로 넣을 수 있나요?"),
      /* ⚠️ 2026-09-25 (1차): 원래 질문은 「어디에 놓을까요?」였는데 **답이 하나가 아니었다.**
         "10001" 에 2마리를 넣는 경우는 {1,2}·{1,3}·{2,3} 셋뿐이고 **최소 거리가 전부 1** 이다
         (전수로 확인). 그런데 보기 글자에 둘 다 「= 1」 이라고 적어 놓고 하나만 ✅ 였다.
         학생이 잡았다 — *"왜 똑같은 숫자인데 하나는 틀렸다는 거지?"*
         → 예제를 키우지 않고, **코드가 실제로 묻는 질문**으로 바꿨다:
            `can_place(D, 2)` = 「거리 D 로 2마리를 넣을 수 있나?」
         이러면 답이 하나로 갈리고(안 된다), 다음 쪽의 「답은 1」로도 곧바로 이어진다.

         ⚠️ 2026-09-25 (2차, PM 판정 ③): 공유 예제를 "10001" → "0100000010" 으로 바꿨다
         (`(gap−D)//D` 가 D 에 따라 실제로 움직이게). 새 예제의 D=2 최적 배치는
         (3,5)·(3,6)·(4,6) 세 가지가 **동점**이라(완전탐색 확인) 자리 선택형은 또 같은 함정에
         빠진다. 그래서 이번엔 **D=3**(유일하게 실패하는 값)을 물어 정답을 하나로 고정했다. */
      question: t(E,
        "Stalls \"0100000010\": occupied at 1 and 8. Can we place 2 cows so EVERY neighbouring pair is at least 3 apart?",
        "축사 \"0100000010\" 의 1 번과 8 번에 소가 있어요.\n이웃한 두 소가 모두 3 칸 이상 떨어지게 2마리를 넣을 수 있을까요?"),
      options: [
        t(E, "No — only stalls 4 and 5 are far enough from both, but they're only 1 apart",
             "안 돼요 — 양쪽에서 3 칸 떨어진 자리는 4, 5 번뿐인데 둘이 1 칸밖에 안 떨어져요"),
        t(E, "Yes — stalls 4 and 5", "돼요 — 4 번과 5 번"),
      ],
      correct: 0,
      explain: t(E,
        "A cow at least 3 from the cow at 1 must be at stall 4 or later; at least 3 from the cow at 8 must be at stall 5 or earlier. Only stalls 4 and 5 satisfy both, and they're just 1 apart — so only 1 cow fits, not 2. So distance 3 is impossible, and the answer must be smaller.",
        "1 번 소에서 3 칸 이상 떨어지려면 4 번부터,\n8 번 소에서 3 칸 이상 떨어지려면 5 번까지예요.\n둘 다 되는 자리는 4, 5 번뿐인데 서로 1 칸밖에 안 떨어져 1마리만 들어가요.\n그래서 거리 3 은 안 되고, 답은 그보다 작아요."),
    },
    /* 1-3: Input
       ⚠️ 2026-09-25: 여기가 **앞 쪽을 베껴도 맞는** 자리였다. 1-1b 카드의 SAMPLE OUTPUT 에
       `"0100000010"` 의 답 **2** 가 글자 그대로 박혀 있는데, 이 쪽이 **같은 예제로 같은 숫자**를
       물었다 — 「← 이전」 두 번이면 닿는다. `feedback_students_copy_the_answer` 와 같은 모양이다
       (거기선 힌트2 가 정답 전문이었고, 여기선 두 쪽 앞의 샘플 출력이 정답 전문이다).
       형제를 열어 보니 **저장소 관행은 이미 갈라 놨다** — `drought` 는 카드가 `[3,5,2]→10` 인데
       입력은 `[2,4,2]→8`, `exchange` 는 카드가 `RRL→2` 인데 입력은 `모두 오른쪽→6` 이다.
       socialdist1 만 어긋나 있었다. → **입력 쪽에만 새 예제를 준다.**
       카드·시뮬·퀴즈가 쓰는 `"0100000010"` 은 그대로 둔다(오늘 양 끝 버그를 고친 그 예제다).
       검산: 완전탐색과 🔒 `FULL_PY` 둘 다 `6 / 100001` → **1**. 카드의 2 와 달라서 베끼면 틀린다. */
    {
      type: "input",
      narr: t(E,
        "New example — a smaller one this time.", "이번엔 새 예제로 풀어봐요."),
      question: t(E,
        "\"100001\": occupied at 0,5. Place 2 cows. Max of min distance?",
        "\"100001\" 의 0 번과 5 번에 소가 있어요.\n2마리를 더 넣을 때 최소 거리의 가장 큰 값은 얼마일까요?"),
      hint: t(E,
        "Same idea as the slider: pick a distance, then count how many cows still fit.",
        "슬라이더에서 하던 것과 같아요 —\n거리를 하나 정하고, 그 간격으로 몇 마리가 들어가는지 세어 봐요."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist1Ch2(E, lang = "py") {
  return [
    // 2-1: CodeWalk — 선생님 2026-07-14: "앞으로 코드는 모두 이런식으로"
    {
      type: "socialdist1-codewalk",
      narr: t(E,
        "The full solution, start to finish — toggle Python ↔ C++ via the header.",
        "전체 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
