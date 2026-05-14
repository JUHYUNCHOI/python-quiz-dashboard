import { C, t } from "@/components/quest/theme";
import { getMooOpsSections, MooOpsLab } from "./components";

/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeMooOpsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "You're given a string of M's and O's. In one operation you can flip the FIRST char (M↔O), flip the LAST char, delete the FIRST char, or delete the LAST char.\nFind the minimum number of operations to turn the string into exactly \"MOO\". If impossible, print -1.",
        "M과 O로 된 문자열이 주어져요. 한 번의 연산으로 맨 앞 문자를 뒤집거나(M↔O), 맨 뒤 문자를 뒤집거나, 맨 앞 문자를 지우거나, 맨 뒤 문자를 지울 수 있어요.\n문자열을 정확히 \"MOO\"로 만드는 데 필요한 최소 연산 횟수를 구해요. 불가능하면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc2e"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Moo Operations</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum operations to turn the string into 'MOO', or -1 if impossible.",
                "문자열을 'MOO' 로 만드는 최소 연산 수 (불가능하면 -1) 를 출력.")}
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
                  {t(E, "You're given a ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "string of M's and O's", "M과 O로 된 문자열")}</b>
                  {t(E, " (length ≥ 1).", " (길이 ≥ 1) 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each operation costs 1 and lets you do ONE of:", "한 번의 연산(비용 1) 으로 다음 중 하나를 할 수 있어요:")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    {t(E, "↳ flip the first char (M↔O)  /  flip the last char", "↳ 맨 앞 문자 뒤집기 (M↔O) / 맨 뒤 문자 뒤집기")}<br/>
                    {t(E, "↳ delete the first char  /  delete the last char", "↳ 맨 앞 문자 삭제 / 맨 뒤 문자 삭제")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The goal is to end with the string ", "최종 목표는 문자열이 ")}
                  <b style={{ color: "#dc2626" }}>"MOO"</b>
                  {t(E, " (exactly 3 chars).", " (정확히 3글자) 가 되는 거예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 연산 횟수")}</b>
                  {t(E, " — or ", " 를 출력해요. 불가능하면 ")}
                  <b style={{ color: "#dc2626" }}>-1</b>
                  {t(E, " if impossible.", ".")}
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
        "The string \"MOO\" already matches. How many operations are needed?", "문자열 \"MOO\"는 이미 일치해요. 몇 번의 연산이 필요할까?"),
      question: t(E,
        "String is \"MOO\". How many operations needed?",
        "문자열이 \"MOO\"일 때. 필요한 연산 수는?"),
      options: [
        t(E, "0 operations", "0번"),
        t(E, "1 operation", "1번"),
        t(E, "Impossible (-1)", "불가능 (-1)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! \"MOO\" is already the target, so 0 operations needed.",
        "맞아! \"MOO\"가 이미 목표이므로 0번의 연산이 필요해요."),
    },
    // 1-3: Lab — visualize the candidate-MOO scan
    {
      type: "reveal",
      narr: t(E,
        "Pick a position i and watch the cost break down: left deletes + right deletes + flips. The middle char must already be 'O' (we can't flip the middle).",
        "위치 i 를 골라봐 — 비용이 (왼쪽 삭제) + (오른쪽 삭제) + (뒤집기) 로 쪼개져. 가운데 글자는 이미 'O' 여야 해 (가운데는 뒤집기 불가)."),
      content: <MooOpsLab E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "String is \"MOOO\". We need to reduce it to \"MOO\". How many operations?", "문자열이 \"MOOO\"야. \"MOO\"로 줄여야 해요. 몇 번의 연산이 필요할까?"),
      question: t(E,
        "String \"MOOO\". Min operations to make it \"MOO\"?",
        "문자열 \"MOOO\". \"MOO\"로 만드는 최소 연산 수?"),
      hint: t(E,
        "Try keeping the first 3 chars and removing extras with deletes / flips.",
        "앞 3 글자를 살리고 나머지를 삭제/뒤집기로 처리하는 걸 시도해 봐."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeMooOpsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Final 'MOO' middle char can never be flipped (only first/last). Scan every i with s[i+1]='O' and compute (left deletes) + (right deletes) + (flips needed for s[i] and s[i+2]). Sections build it one piece at a time.",
        "최종 'MOO' 의 가운데는 절대 뒤집기 불가 (앞/뒤만 가능). s[i+1]='O' 인 모든 i 를 스캔, (왼쪽 삭제) + (오른쪽 삭제) + (s[i], s[i+2] 뒤집기) 계산. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMooOpsSections(E),
    },
  ];
}
