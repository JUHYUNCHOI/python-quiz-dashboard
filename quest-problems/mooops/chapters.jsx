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
        "Find the fewest operations to turn the string into exactly 'MOO'.",
        "문자열을 딱 \"MOO\" 로 바꾸는 가장 적은 횟수를 구해요."),
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
                "문자열을 'MOO' 로 만드는 데 드는 가장 적은 횟수를 출력해요. 못 만들면 -1 을 출력해요.")}
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
                  {t(E, "Each operation costs 1 and lets you do ONE of:", "한 번에(비용 1) 다음 중 하나를 할 수 있어요:")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    {t(E, "↳ flip the first char (M↔O)  /  flip the last char", "↳ 맨 앞 글자 뒤집기 (M↔O) / 맨 뒤 글자 뒤집기")}<br/>
                    {t(E, "↳ delete the first char  /  delete the last char", "↳ 맨 앞 글자 지우기 / 맨 뒤 글자 지우기")}
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
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "가장 적은 횟수")}</b>
                  {t(E, " — or ", " 를 출력해요. 불가능하면 ")}
                  <b style={{ color: "#dc2626" }}>-1</b>
                  {t(E, " if impossible.", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1277) — 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? Q, then Q strings, one per line.",
        "Q 다음, 문자열이 한 줄씩 Q번 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of strings", "— 문자열 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>s</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— a string of only 'M' and 'O'", "— M과 O로만 된 문자열")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats Q times", "↑ 이 줄이 Q 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The answer for each string, one per line (Q lines).",
                  "문자열마다 답을 한 줄씩 출력해요 (Q 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ Q ≤ 100</div>
              <div>{t(E, "each string has length 1 to 100", "각 문자열의 길이는 1~100")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each character is 'M' or 'O' only", "각 글자는 'M' 또는 'O' 만")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The string \"MOO\" already matches. How many operations are needed?", "문자열이 이미 \"MOO\" 예요. 몇 번이면 될까요?"),
      question: t(E,
        "String is \"MOO\". How many operations needed?",
        "문자열이 \"MOO\" 일 때 필요한 횟수는?"),
      options: [
        t(E, "0 operations", "0번"),
        t(E, "1 operation", "1번"),
        t(E, "Impossible (-1)", "불가능 (-1)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! \"MOO\" is already the target, so 0 operations needed.",
        "맞아요! \"MOO\" 가 이미 목표라서 한 번도 안 바꿔도 돼요."),
    },
    // 1-3: Lab — visualize the candidate-MOO scan
    {
      type: "reveal",
      narr: t(E,
        "Pick a position i and watch the cost break down: left deletes + right deletes + flips. The middle char must already be 'O' (we can't flip the middle).",
        "가운데 글자는 뒤집을 수 없어서 처음부터 'O' 여야 해요."),
      content: <MooOpsLab E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "String is \"MOOO\". We need to reduce it to \"MOO\". How many operations?", "\"MOOO\" 를 \"MOO\" 로 줄이려면 몇 번이 필요할까요?"),
      question: t(E,
        "String \"MOOO\". Min operations to make it \"MOO\"?",
        "문자열 \"MOOO\" 를 \"MOO\" 로 만드는 가장 적은 횟수는?"),
      hint: t(E,
        "Try keeping the first 3 chars and removing extras with deletes / flips.",
        "앞 3 글자를 살리고 나머지는 지우거나 뒤집어 봐요."),
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
        "The middle can't be flipped, so only check positions where s[i+1]='O'.",
        "가운데는 못 뒤집으니 s[i+1]='O' 인 자리만 살펴봐요."),
      sections: getMooOpsSections(E),
    },
  ];
}
