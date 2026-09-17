import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getSecretSections } from "./components";

/* ================================================================
   Deep-Audit Sim: rotation check via a+a doubling
   ================================================================ */
const SIM_A = [1, 2, 3, 4, 5];
const SIM_DOUBLED = [...SIM_A, ...SIM_A];

const PRESETS = [
  { label: "[2,3,4,5,1]", b: [2, 3, 4, 5, 1] },
  { label: "[4,5,1,2,3]", b: [4, 5, 1, 2, 3] },
  { label: "[1,2,3,4,5]", b: [1, 2, 3, 4, 5] },
  { label: "[5,4,3,2,1]", b: [5, 4, 3, 2, 1] },
  { label: "[3,4,5,1,2]", b: [3, 4, 5, 1, 2] },
];

function SecretDeepAuditSim({ E }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [offset, setOffset] = useState(0);
  const N = SIM_A.length;
  const b = PRESETS[presetIdx].b;
  const window = SIM_DOUBLED.slice(offset, offset + N);
  const isMatch = window.every((v, i) => v === b[i]);

  const cellBase = {
    width: 32, height: 32, display: "inline-flex", alignItems: "center",
    justifyContent: "center", fontFamily: "'JetBrains Mono',monospace",
    fontSize: 13, fontWeight: 700, border: "1px solid #c4b5fd",
    background: "#fff", color: "#5b21b6", margin: "0 1px",
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
          🔬 {t(E, "Deep-Audit: slide the window over a written twice", "자세히 보기 — a 를 두 번 이어 붙인 띠 위에서 창문 밀기")}
        </div>
        {/* 2026-09-17: 첫 말풍선이 "창문 안이 b 와 같으면 b 는 a 를 돌린 것" 이라고
            **결론을 먼저** 말하고 있었다. 만지기 전에 답을 준 것이고, 바로 다음 쪽
            퀴즈의 정답 보기와도 같은 문장이었다. 게다가 a+a 가 무엇인지·왜 두 번
            이어 붙였는지는 한 번도 안 말했다. 여기선 "무엇을 할지" 만 말하고,
            결론은 아래 판정 칸이 낸다. */}
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 12, wordBreak: "keep-all", whiteSpace: "pre-line" }}>
          {t(E,
            "The strip below is a, written out twice in a row.\nPick a candidate b, then slide the 5-wide window one step at a time.\nLook for a spot where the window and b are the same.",
            "아래 띠는 a 를 두 번 이어 적어 놓은 것이에요.\n후보 b 를 하나 고르고, 다섯 칸짜리 창문을 한 칸씩 밀어 보세요.\n창문 안과 b 가 같아지는 자리가 있는지 찾아요.")}
        </div>

        {/* b preset selector */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 600, marginBottom: 6 }}>
            {t(E, "Candidate b", "후보 b")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => setPresetIdx(i)} style={{
                padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                border: `1.5px solid ${presetIdx === i ? "#8b5cf6" : "#c4b5fd"}`,
                background: presetIdx === i ? "#8b5cf6" : "#fff",
                color: presetIdx === i ? "#fff" : "#5b21b6",
                borderRadius: 6, fontFamily: "'JetBrains Mono',monospace",
              }}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* a + a doubled strip */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 600, marginBottom: 4 }}>
            {t(E, "a + a — a written twice", "a + a — a 를 두 번 이어 붙인 띠")}
          </div>
          <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 4 }}>
            {SIM_DOUBLED.map((v, i) => {
              const inWin = i >= offset && i < offset + N;
              return (
                <span key={i} style={{
                  ...cellBase,
                  background: inWin ? (isMatch ? "#bbf7d0" : "#ddd6fe") : "#fff",
                  borderColor: inWin ? (isMatch ? "#16a34a" : "#8b5cf6") : "#c4b5fd",
                  color: inWin ? (isMatch ? "#14532d" : "#4c1d95") : "#5b21b6",
                  borderWidth: inWin ? 2 : 1,
                }}>{v}</span>
              );
            })}
          </div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>
            {/* 2026-09-17: `doubled[0:5]` 는 챕터 2 에서야 나오는 변수명·코드 표기다.
                이 쪽 학생은 그 이름을 아직 본 적이 없다. 화면이 하는 말로 바꾼다. */}
            {t(E, `slid ${offset} steps → the window covers ${N} cells starting at cell ${offset}`,
                  `${offset} 칸 밀었어요 → 창문은 ${offset} 번 칸부터 ${N} 칸이에요`)}
          </div>
        </div>

        {/* offset slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, marginBottom: 12 }}>
          <button onClick={() => setOffset(Math.max(0, offset - 1))} disabled={offset === 0} style={{
            padding: "4px 10px", fontSize: 12, fontWeight: 700,
            border: "1.5px solid #8b5cf6", background: offset === 0 ? "#eee" : "#fff",
            color: offset === 0 ? "#999" : "#5b21b6", borderRadius: 6,
            cursor: offset === 0 ? "not-allowed" : "pointer",
          }}>◀</button>
          <input type="range" min={0} max={N} value={offset}
            onChange={e => setOffset(parseInt(e.target.value, 10))}
            style={{ flex: 1, accentColor: "#8b5cf6" }} />
          <button onClick={() => setOffset(Math.min(N, offset + 1))} disabled={offset === N} style={{
            padding: "4px 10px", fontSize: 12, fontWeight: 700,
            border: "1.5px solid #8b5cf6", background: offset === N ? "#eee" : "#fff",
            color: offset === N ? "#999" : "#5b21b6", borderRadius: 6,
            cursor: offset === N ? "not-allowed" : "pointer",
          }}>▶</button>
        </div>

        {/* compare row */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 600, marginBottom: 4 }}>
            {t(E, "window  vs  b", "창문  vs  b")}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              {window.map((v, i) => (
                <span key={"w" + i} style={{
                  ...cellBase,
                  background: v === b[i] ? "#bbf7d0" : "#fee2e2",
                  borderColor: v === b[i] ? "#16a34a" : "#dc2626",
                  color: v === b[i] ? "#14532d" : "#7f1d1d",
                }}>{v}</span>
              ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#5b21b6" }}>vs</div>
            <div>
              {b.map((v, i) => (
                <span key={"b" + i} style={{
                  ...cellBase,
                  background: v === window[i] ? "#bbf7d0" : "#fee2e2",
                  borderColor: v === window[i] ? "#16a34a" : "#dc2626",
                  color: v === window[i] ? "#14532d" : "#7f1d1d",
                }}>{v}</span>
              ))}
            </div>
          </div>
        </div>

        {/* verdict */}
        <div style={{
          marginTop: 12, padding: "8px 12px", borderRadius: 8,
          background: isMatch ? "#dcfce7" : "#f3f4f6",
          border: `1.5px solid ${isMatch ? "#16a34a" : "#9ca3af"}`,
          fontSize: 12, fontWeight: 700,
          color: isMatch ? "#14532d" : "#374151",
        }}>
          {isMatch
            ? t(E, `✅ Match at offset ${offset} → b IS a rotation of a → print YES`,
                  `✅ ${offset} 칸 민 자리에서 같아요 → b 는 a 를 돌린 것이에요 → YES`)
            : t(E, `❌ No match after ${offset} steps — slide further. If all ${N} spots differ → NO`,
                  `❌ ${offset} 칸 민 자리에서는 달라요. 더 밀어 봐요. ${N} 자리가 다 다르면 NO 예요.`)}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-17: narr 이 3 문장 86 자였고, 바로 아래 미션 박스와 같은 말이었다.
         파란 바는 한 문장 55 자 이하. 나머지는 미션 박스가 이미 하고 있다. */
      narr: t(E,
        "Can a be turned into b just by rotating it?",
        "a 를 돌려서 b 가 되는지 가려내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd10"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Secret</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Decide if b is a rotation of a — print YES or NO.", "a 를 돌려서 b 가 되는지 가려내고, YES 또는 NO 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "Two lines of N numbers, a and b", "숫자가 N 개씩 든 두 줄 a 와 b")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              {/* 2026-09-17: 미션과 👉 가 "돌린다" 에 기대는데 그 말을 quest 안에서
                  한 번도 정의하지 않았다. 정의는 챕터 2 코드 설명에만 있었다 —
                  학생은 문제를 읽는 시점에 그 말을 모른다. 여기서 먼저 말한다.
                  예시 숫자는 다음 쪽 샘플(1 2 3 4 5)·1-5 문제(1 2 3)와 겹치지
                  않게 골랐다. 답을 미리 주면 안 되니까. */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "Rotate", "돌린다")}</b>
                  {t(E, " — take some numbers off the front and put them on the back, keeping their order. Rotating 7 8 9 by one step gives 8 9 7.",
                        " — 앞쪽 몇 개를 떼어 순서 그대로 뒤에 붙이는 거예요. 7 8 9 를 한 칸 돌리면 8 9 7 이 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if b is a rotation of a, else NO", "a 를 몇 칸 돌려 b 가 되면 YES, 안 되면 NO 를 출력해요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 (mcc19rect2 4-박스 표준)
       2026-09-17: 형식 카드가 없어서 학생이 코드까지 가서야 형식을 역추론했다. */
    {
      type: "reveal",
      narr: t(E,
        "N on one line, then a, then b.",
        "N 한 줄, 그다음 a 한 줄, b 한 줄이 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— how many numbers in each line", "— 각 줄에 들어 있는 수의 개수")}</span></div>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>a1 a2 … aN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the original a", "— 원래 것 a")}</span></div>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>b1 b2 … bN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the one to check, b", "— 확인할 것 b")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: YES if b is a rotation of a, otherwise NO.",
                    "한 줄에, a 를 돌려 b 가 되면 YES, 안 되면 NO 를 적어요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#4c1d95", whiteSpace: "pre" }}>
{`5
1 2 3 4 5
3 4 5 1 2`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`YES`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Why YES? — the sim on the next page lets you check it yourself.",
                    "왜 YES 일까? — 다음 쪽 시뮬에서 직접 확인해 봐요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {/* 2026-09-17: 원문 N 상한을 못 찾았다. 지어내지 않고 이 방법이 감당하는 크기를 적는다. */}
              {/* 2026-09-17 2차: N 상한은 원문 PDF 가 없어 그대로 둔다(지어내지 않는다).
                  낱말만 손본다 — 여기만 "창" 이고 시뮬·코드 설명은 "창문" 이었다. */}
              {t(E, "a and b always have the same length N. We could not find the original limit on N. What we can say: this method compares N windows of N numbers, so N up to a few thousand is fine.",
                    "a 와 b 는 길이가 N 으로 같아요.\nN 이 얼마까지 커지는지는 원문에서 확인하지 못했어요.\n대신 이 방법이 감당하는 크기를 적어요 — N 칸짜리 창문을 N 번 견주니까\nN 이 수천 정도까지는 괜찮아요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Deep-Audit Sim — slide a length-N window over a+a
    {
      type: "reveal",
      narr: t(E,
        "Pick a candidate b and slide the window yourself.",
        "후보 b 를 고르고 창문을 직접 밀어 봐요."),
      content: <SecretDeepAuditSim E={E} />,
    },
    /* 1-4: Quiz
       2026-09-17: 이 퀴즈가 시뮬 **앞**에 있었고, narr 이 정답 보기와 사실상 같은
       문장이었다("a+a 안에 a 를 돌린 모양이 전부 들어 있어요"). 읽고 그대로 찍으면 됐다.
       시뮬 뒤로 옮기고, narr 은 "지금 뭘 볼 차례" 만 남긴다. */
    {
      type: "quiz",
      narr: t(E,
        "Now say why it works, without the sim.",
        "이번엔 시뮬 없이 이유를 말해 볼 차례예요."),
      question: t(E,
        "Why does checking if b is in a+a work for rotation detection?",
        "b 가 a+a 안에 있는지만 봐도 되는 이유는 무엇일까요?"),
      options: [
        t(E, "a+a contains all rotations of a as subarrays", "a+a 안에 a 를 돌린 모양이 전부 들어 있어요"),
        t(E, "a+a doubles the length, making comparison easier", "a+a 는 길이가 두 배라서 비교가 쉬워져요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! For [1,2,3], a+a = [1,2,3,1,2,3]. Rotations [2,3,1] and [3,1,2] are both subarrays of a+a.",
        "맞아요! a = [1,2,3] 이면 a+a = [1,2,3,1,2,3] 이에요.\n돌린 모양인 [2,3,1] 과 [3,1,2] 가 둘 다 그 안에 붙어 있어요."),
    },
    // 1-5: Input
    {
      type: "input",
      /* 2026-09-17 2차: narr 이 바로 아래 질문을 그대로 한 번 더 말하고 있었다.
         narr 은 "지금 뭘 할 차례" 만. 문제는 아래 칸이 이미 하고 있다. */
      narr: t(E,
        "Now rotate one yourself and type the answer.",
        "이제 직접 돌려 보고 답을 넣을 차례예요."),
      question: t(E,
        "[1,2,3] and [2,3,1]: same rotation? (1=Yes, 0=No)",
        "[1,2,3] 을 돌리면 [2,3,1] 이 나올까요? (1=예, 0=아니오)"),
      hint: t(E,
        "Try shifting [1,2,3] left by 1 step — what do you get? Compare with [2,3,1].",
        "[1,2,3] 을 왼쪽으로 한 칸 밀면 무엇이 될까요? [2,3,1] 과 견줘 봐요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      /* 2026-09-17: narr 이 "'B in A+A' 한 줄만 확인하면 돼요" 라고 했는데
         아래 코드는 한 줄이 아니라 슬라이딩 윈도우 반복문이다. 게다가 파이썬
         **리스트**에서 `in` 은 부분수열 검사를 못 한다 — 실행되지 않는 코드를
         암시하고 있었다. 실제 코드가 하는 일로 바꾼다. */
      narr: t(E,
        "Slide an N-wide window across a+a and look for b.",
        "a+a 위에서 N 칸짜리 창문을 밀며 b 와 같은 자리를 찾아요."),
      sections: getSecretSections(E),
    },
  ];
}
