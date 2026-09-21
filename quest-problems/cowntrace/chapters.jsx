import { C, t } from "@/components/quest/theme";
import { getCowntraceSections } from "./components";

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
export function makeCowntraceCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Find who could be patient zero, and the min/max K consistent with the final infected states.",
        "처음 감염된 소는 누구이고, K 는 얼마였을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd0d"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Cowntact Tracing</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2020 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output (1) patient-zero candidates, (2) min consistent K, (3) max consistent K (or 'Infinity').",
                "세 가지를 출력해요.\n(1) 환자 제로가 될 수 있는 소의 수,\n(2) 기록에 들어맞는 K 의 가장 작은 값,\n(3) K 의 가장 큰 값 (끝없이 커도 되면 'Infinity').")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows and T timestamped hoof-shakes", "소 N 마리와 발굽 맞대기 기록 T 개")}</b>
                  {t(E, " (each says: at time t, cows i and j shook hooves).",
                        " 가 있어요. 기록 하나는 '시각 t 에 소 i 와 소 j 가 발굽을 맞댔다' 는 뜻이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Exactly one cow is ", "정확히 1마리가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "patient zero", "환자 제로")}</b>
                  {t(E, " (started infected). Infected cows can pass it on through hoof-shakes, but each infected cow infects others ", " 예요. 처음부터 감염돼 있었던 소죠. 감염된 소는 발굽을 맞대면 병을 옮길 수 있는데, 소 한 마리가 옮길 수 있는 건 많아야 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "at most K more times", "K 번")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "최종 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final infected/healthy state of every cow", "각 소의 감염/건강 상태")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print three numbers: ", "세 수를 출력해요. ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(1) candidates for patient zero, (2) min K consistent, (3) max K consistent (or 'Infinity')", "(1) 환자 제로 후보 수, (2) K 의 가장 작은 값, (3) K 의 가장 큰 값 (또는 'Infinity')")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there's only 1 infected cow and no interactions happened, how many possible patient zeros are there?", "발굽을 한 번도 안 맞댔다면 환자 제로는 누구일까요?"),
      question: t(E,
        "1 infected cow, 0 interactions. How many possible patient zeros?",
        "감염된 소가 1 마리이고 발굽 맞대기는 한 번도 없었어요.\n환자 제로가 될 수 있는 소는 몇 마리일까요?"),
      options: [
        t(E, "1 (the infected cow itself)", "1 마리 (감염된 그 소)"),
        t(E, "0 (impossible scenario)", "0 마리 (있을 수 없는 일이에요)"),
        t(E, "N (any cow could be)", "N 마리 (어느 소든 될 수 있어요)"),
      ],
      correct: 0,
      explain: t(E,
        "With no interactions, the only way a cow is infected is if it's patient zero. So exactly 1 candidate.",
        "발굽을 한 번도 안 맞댔으면 병이 옮을 길이 없어요.\n그러니 지금 감염된 그 소가 처음부터 감염돼 있었던 거예요.\n후보는 딱 1 마리예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "1 cow infected, no interactions. How many patient zero candidates?", "이번엔 직접 세어 봐요. 발굽 맞대기가 없을 때예요."),
      question: t(E,
        "1 infected cow, 0 handshakes. Number of patient zero candidates?",
        "감염된 소가 1 마리이고 발굽 맞대기가 0 번이에요.\n환자 제로 후보는 몇 마리일까요?"),
      hint: t(E,
        "Without any handshakes, who must have started infected?",
        "발굽을 한 번도 안 맞댔다면, 누가 처음부터 감염돼 있어야 할까요?"),
      answer: 1,
    },
    // 1-4: Deep-audit sim — pick patient-zero + K, replay events, watch spread.
    {
      type: "sim",
      narr: t(E,
        "Pick a patient-zero cow and a K, then replay every hoof-shake to test the match.",
        "환자 제로와 K 를 골라서 기록을 하나씩 재생해 봐요."),
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeCowntraceCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Brute force: try every (patient zero, K) pair and simulate all events to check the final state.",
        "풀이 코드를 한 단락씩 읽어 봐요."),
      sections: getCowntraceSections(E),
    },
  ];
}
