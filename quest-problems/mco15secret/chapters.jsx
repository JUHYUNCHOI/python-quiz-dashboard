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
          🔬 {t(E, "Deep-Audit: slide the window over a+a", "자세히 보기 — a+a 위에서 창문 밀기")}
        </div>
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Pick a candidate b. Slide a length-N window across a+a. If the window equals b at any offset, b is a rotation of a.",
            "후보 b 를 골라 봐요. a+a 위에서 길이 N 짜리 창문을 오른쪽으로 밀어요.\n어느 자리에서든 창문 안이 b 와 같으면, b 는 a 를 돌린 것이에요.")}
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
            {t(E, "a + a (doubled)", "a + a (두 배)")}
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
            {t(E, `offset i = ${offset} → window = doubled[${offset}:${offset + N}]`,
                  `${offset} 칸 밀었어요 → 창문 = doubled[${offset}:${offset + N}]`)}
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
            : t(E, `❌ No match at offset ${offset} — slide further (or all N offsets fail → NO)`,
                  `❌ ${offset} 칸 민 자리에서는 달라요. 더 밀어 봐요. N 자리가 다 다르면 NO 예요.`)}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "b = list(map(int, input().split()))",
  "",
  "# Check if b is a rotation of a",
  "# Classic trick: b is rotation of a iff",
  "# b appears as a subarray in a + a",
  "",
  "if len(a) != len(b):",
  "    print('NO')",
  "else:",
  "    doubled = a + a",
  "    found = False",
  "    for i in range(N):",
  "        if doubled[i:i+N] == b:",
  "            found = True",
  "            break",
  "    print('YES' if found else 'NO')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two strings A and B of equal length are given.\nDetermine if B is a CIRCULAR ROTATION of A — i.e., B can be obtained by cyclically shifting A by some amount. Print YES or NO.",
        "같은 길이의 두 문자열 A 와 B 가 주어져요.\nA 를 몇 칸 돌려서 B 를 만들 수 있는지 가려내요.\n만들 수 있으면 YES, 없으면 NO 를 출력해요."),
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
              {t(E, "Decide if string B is a circular rotation of string A — print YES or NO.", "A 를 돌려서 B 가 되는지 가려내고, YES 또는 NO 를 출력해요.")}
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
                  <b style={{ color: "#8b5cf6" }}>{t(E, "Two strings A and B of equal length", "같은 길이의 두 문자열 A 와 B")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if B is a circular rotation of A, else NO", "A 를 몇 칸 돌려 B 가 되면 YES, 안 되면 NO 를 출력해요")}</b>
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
        "The classic rotation check: if we concatenate array a with itself (a+a), any rotation of a will appear as a contiguous subarray.\nWhy does this work?", "배열 a 를 자기 자신과 이어 붙이면(a+a), a 를 돌린 모양이 모두 그 안에 붙어서 나타나요.\n왜 그럴까요?"),
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
    // 1-3: Deep-Audit Sim — slide a window over a+a
    {
      type: "reveal",
      narr: t(E,
        "Let's audit the trick. Pick a candidate b, then slide a length-N window across a+a. The verdict turns green at the matching offset — or stays gray if no offset works.",
        "후보 b 를 고르고 a+a 위에서 창문을 밀어 봐요.\n같은 자리에서는 초록으로, 끝까지 안 맞으면 회색으로 보여요."),
      content: <SecretDeepAuditSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "[1,2,3] and [2,3,1] - is [2,3,1] a rotation of [1,2,3]? Answer 1 for Yes, 0 for No.", "[1,2,3] 을 돌려서 [2,3,1] 을 만들 수 있을까요? 되면 1, 안 되면 0 을 넣어요."),
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
      narr: t(E,
        "Classic trick: B is a circular rotation of A iff B is a substring of A+A. So just check 'B in A+A'. Sections build it one piece at a time.",
        "A 를 돌려 B 가 되는 것과, B 가 A+A 안에 붙어 있는 것은 같은 말이에요.\n그래서 'B in A+A' 한 줄만 확인하면 돼요."),
      sections: getSecretSections(E),
    },
  ];
}
