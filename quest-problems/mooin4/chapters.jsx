import { C, t } from "@/components/quest/theme";
import { getMooin4Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T, k = map(int, input().split())",
  "out = []",
  "for _ in range(T):",
  "    N = int(input())",
  "    S = input().strip()",
  "    typed = [''] * N",
  "    flips = 0",
  "    for i in range(N - 1, -1, -1):",
  "        c = S[i]",
  "        if flips % 2 == 1:",
  "            c = 'O' if c == 'M' else 'M'",
  "        typed[i] = c",
  "        if c == 'O':",
  "            flips += 1",
  "    out.append('YES')",
  "    if k == 1:",
  "        out.append(''.join(typed))",
  "print('\\n'.join(out))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooin4Ch1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooin4Ch1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Bessie's keyboard has only M and O. Every time she types O, ALL letters typed so far flip first (M↔O), then O is appended. Can she type her favorite moo S?",
        "베시의 키보드엔 M 과 O 만 있어요. O 를 칠 때마다 지금까지 친 모든 글자가 먼저 뒤집히고 (M↔O), 그 뒤에 O 가 붙어요. 원하는 무 소리 S 를 칠 수 있을까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#9a3412" }}>It's Mooin' Time IV</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2026 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Print YES (always possible), and if k=1 print one keystroke string that produces S.",
                "YES 를 출력하고 (항상 가능), k=1 이면 S 를 만드는 키 입력 한 가지를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Typing ", "")}
                  <b style={{ color: "#f97316" }}>M</b>
                  {t(E, " just appends M.", "을 치면 그냥 M 이 뒤에 붙어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Typing ", "")}
                  <b style={{ color: "#f97316" }}>O</b>
                  {t(E, " first flips every letter on screen (M↔O), then appends O.",
                        " 를 치면 화면의 모든 글자가 먼저 뒤집히고 (M↔O), 그 뒤에 O 가 붙어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Given target ", "목표 ")}
                  <b style={{ color: "#15803d" }}>S</b>
                  {t(E, ", print YES (always possible) and one valid keystroke string when k=1.",
                        " 가 주어지면 YES 를 출력하고, k=1 일 땐 S 를 만드는 키 입력도 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Read the sample carefully. Same two test cases, but k changes whether we also print the keystroke string.",
        "샘플을 잘 봐요. 같은 두 테스트케이스인데, k 값에 따라 키 입력 문자열도 출력할지 결정돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
            📋 {t(E, "Sample (k = 1)", "샘플 (k = 1)")}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ background: "#0f172a", color: "#f1f5f9", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", margin: 0 }}>
{`2 1
3
MOO
5
OOMOO`}
              </pre>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ background: "#0f172a", color: "#f1f5f9", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", margin: 0 }}>
{`YES
OMO
YES
MOOMO`}
              </pre>
            </div>
          </div>
          <div style={{ marginTop: 10, padding: 10, background: "#fff7ed", borderRadius: 8, border: "1px solid #fdba74", fontSize: 12, color: "#9a3412", lineHeight: 1.6 }}>
            {t(E,
              "First line: T (test cases) and k. Each test: N then string S of length N. Output YES per test; if k=1 also a keystroke string of length N.",
              "첫 줄: T (케이스 수) 와 k. 각 케이스: N 그리고 길이 N 인 문자열 S. 케이스마다 YES 출력, k=1 이면 길이 N 인 키 입력 문자열도.")}
          </div>
        </div>),
    },

    // 1-3: Worked example — simulate MOOMO -> OOMOO
    {
      type: "reveal",
      narr: t(E,
        "Walk through typing MOOMO step by step and watch the screen change. Each O flips everything BEFORE it appends.",
        "MOOMO 를 한 글자씩 쳐보면서 화면이 어떻게 바뀌는지 따라가봐요. O 를 칠 때마다 먼저 다 뒤집히고 그 다음 O 가 붙어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
            🎬 {t(E, "Type MOOMO step by step", "MOOMO 를 한 글자씩 입력")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
            {[
              { k: "M", before: "(empty)", flip: "—", after: "M" },
              { k: "O", before: "M", flip: "O", after: "OO" },
              { k: "O", before: "OO", flip: "MM", after: "MMO" },
              { k: "M", before: "MMO", flip: "—", after: "MMOM" },
              { k: "O", before: "MMOM", flip: "OOMO", after: "OOMOO" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: 8, alignItems: "center", padding: "6px 8px", background: i % 2 ? "#fff7ed" : "#fff", borderRadius: 6, border: "1px solid #fed7aa" }}>
                <div style={{ fontWeight: 700, color: "#f97316", fontSize: 14 }}>{row.k}</div>
                <div style={{ color: C.dim }}><span style={{ color: C.dim, fontSize: 10 }}>{t(E, "before", "이전")}: </span>{row.before}</div>
                <div style={{ color: row.flip === "—" ? C.dim : "#9a3412" }}><span style={{ color: C.dim, fontSize: 10 }}>{t(E, "flip→", "뒤집기→")}: </span><b>{row.flip}</b></div>
                <div style={{ color: "#15803d", fontWeight: 700 }}><span style={{ color: C.dim, fontSize: 10, fontWeight: 400 }}>{t(E, "screen", "화면")}: </span>{row.after}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: 10, background: "#ecfdf5", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#166534", lineHeight: 1.6 }}>
            {t(E,
              "Final screen = OOMOO. So typing MOOMO produces OOMOO. Notice the LAST key M is the only key that never gets flipped after — it appears as O in S because the final O flipped it.",
              "최종 화면 = OOMOO. MOOMO 를 치면 OOMOO 가 나와요. 마지막에서 두 번째로 친 M 은 마지막 O 한 번에 의해 뒤집혀서 S 에서는 O 로 보여요.")}
          </div>
        </div>),
    },

    // 1-4: Quiz — last typed key
    {
      type: "quiz",
      narr: t(E,
        "After the LAST keystroke, no more flips happen. So the last typed key equals which character?",
        "맨 마지막 키 입력 뒤에는 더 이상 뒤집힘이 없어요. 그러면 마지막에 친 키는 무엇과 같을까?"),
      question: t(E,
        "If S has length N, what must the LAST typed key be?",
        "S 의 길이가 N 일 때, 마지막에 친 키는 무엇이어야 할까?"),
      options: [
        t(E, "S[N-1] (the last character of S itself)", "S[N-1] (S 의 마지막 글자 그 자체)"),
        t(E, "Always M", "항상 M"),
        t(E, "Always O", "항상 O"),
      ],
      correct: 0,
      explain: t(E,
        "Right! Nothing flips after the last keystroke, so it lands at position N-1 unchanged. That gives us a foothold — work backwards from there.",
        "맞아! 마지막 키 입력 뒤에는 뒤집힘이 없으니 그대로 N-1 자리에 놓여요. 여기서부터 거꾸로 풀어가면 돼."),
    },

    // 1-5: Input — count parity
    {
      type: "input",
      narr: t(E,
        "Suppose we want S = OOMOO and we already know t[2..4] = MMO. How many O's are in t[2..4]? (That's the parity that flips position 1.)",
        "S = OOMOO 를 만들고 싶고, t[2..4] = MMO 인 것까지 정했어요. t[2..4] 안에 O 가 몇 개일까? (그 개수의 홀짝이 1번 자리 글자를 뒤집어요.)"),
      question: t(E,
        "How many O's are in 'MMO'?",
        "'MMO' 안에 O 는 몇 개?"),
      hint: t(E,
        "Just count the letter O in the string MMO.",
        "문자열 MMO 안의 O 글자 개수만 세면 돼."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMooin4Ch2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooin4Ch2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Walk right→left. For each position, flip the target letter when an odd number of O's come after it. Sections build it one piece at a time.",
        "오른쪽→왼쪽으로 걸어가요. 뒤에 O 가 홀수 개면 목표 글자를 뒤집어서 칠 키를 정해요. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMooin4Sections(E),
    },
  ];
}
