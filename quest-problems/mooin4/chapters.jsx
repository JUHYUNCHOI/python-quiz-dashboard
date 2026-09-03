import { C, t } from "@/components/quest/theme";
import { getMooin4Sections, getMooin4Walk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { TypeTraceSim, BackwardSim } from "./sims";

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
                "Print YES — it is always possible.\nIf k=1, also print one keystroke string that produces S.",
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
                  {t(E, <> is given, print YES — it is always possible.<br />When k=1, also print one keystroke string that makes it.</>,
                        <> 가 주어지면 YES 를 출력해요.<br />k=1 일 땐 S 를 만드는 키 입력도 출력해요.</>)}
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
          {/* 절 단위로 나눈 \n 이 살아나도록 pre-line + 한글 줄바꿈 세트 */}
          <div style={{ marginTop: 10, padding: 10, background: "#fff7ed", borderRadius: 8, border: "1px solid #fdba74", fontSize: 12, color: "#9a3412", lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "First line: T (test cases) and k.\nEach test: N, then a string S of length N.\nPrint YES for every test.\nWhen k=1, also print a keystroke string of length N.",
              "첫 줄에 T (케이스 수) 와 k 가 와요.\n각 케이스는 N 과 길이 N 인 문자열 S 예요.\n케이스마다 YES 를 출력해요.\nk=1 이면 길이 N 인 키 입력 문자열도 출력해요.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10,000 (= 10⁴)</div>
              <div>0 ≤ k ≤ 1</div>
              <div>1 ≤ N ≤ 200,000 (= 2 × 10⁵)</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "sum of N across tests ≤ 4 × 10⁵", "모든 케이스 N 합 ≤ 4 × 10⁵")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Worked example — simulate MOOMO -> OOMOO
    {
      type: "reveal",
      narr: t(E,
        "Walk through typing MOOMO one key at a time and watch the screen change.",
        "MOOMO 를 한 글자씩 쳐보면서 화면이 어떻게 바뀌는지 따라가요."),
      content: (<TypeTraceSim E={E} />),
    },

    // 1-4: Input — count parity
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
        "문자열 MMO 안의 O 글자 개수만 세면 돼요."),
      answer: 1,
    },
    // 1-5: 거꾸로 복원 시뮬 — 전엔 이 알고리즘을 글로만 설명했음 (2026-08-18 감사에서
    //   "뒤→앞 재구성 스텝 + 트레이스 시뮬" 로 지적된 자리). 실제로 돌려서 보여준 뒤 아래에서 정리.
    {
      type: "reveal",
      narr: t(E,
        "Now walk backwards through S and recover every key.",
        "이제 S 를 거꾸로 훑으며 친 키를 하나씩 찾아봐요."),
      content: (<BackwardSim E={E} />),
    },

    // 1-6: 통찰 — 뒤→앞 재구성 + O 홀짝 (코드 전에 평이하게). review 2026-08-18.
    {
      type: "reveal",
      narr: t(E,
        "We know the LAST key. How do we get the key before it… and the one before that? Here's the whole idea — in plain words, before any code.",
        "마지막 키는 알아요. 그럼 그 앞 키는? 또 그 앞은? 코드 보기 전에, 핵심을 말로 먼저 잡아요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#5b21b6", marginBottom: 12, textWrap: "balance" }}>
            💡 {t(E, "Work backwards — only the O parity matters", "핵심: 뒤에서부터, O 홀짝만 세면 돼요")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480, margin: "0 auto" }}>
            {[
              t(E, <><b>Start at the end.</b> Nothing flips after the last keystroke, so the last key = <b>S[N-1]</b>. That's our foothold.</>,
                   <><b>맨 끝부터.</b> 마지막 키 뒤엔 뒤집힘이 없어요 → 마지막 키 = <b>S[N-1]</b>. 이게 발판이에요.</>),
              t(E, <>Each key shows up flipped once for <b>every O typed after it</b>.<br />But O swaps M↔O, and flipping twice undoes itself.<br />So only <b>whether that count is even or odd</b> matters.</>,
                   <>각 키는 <b>그 뒤에 친 O 개수</b>만큼 뒤집혀 화면에 나와요. 근데 O는 M↔O로 뒤집고, 두 번 뒤집으면 원래대로 → <b>그 개수의 홀짝(parity)만</b> 중요해요.</>),
              t(E, <>So sweep <b>right → left</b>, holding the running O-parity (<b>flips</b>).<br />Un-flip each S[i] by that parity to recover the real key.<br />If that key is O, flip the parity.<br />One backward pass — that is the code.</>,
                   <>그래서 <b>뒤에서 앞으로</b> 훑어요.<br />지금까지 본 O 의 홀짝(<b>flips</b>)을 들고 가요.<br />S[i] 를 그 홀짝만큼 되돌리면 진짜 친 키예요.<br />그 키가 O 면 flips 를 뒤집어요.<br />거꾸로 한 번 훑기 — 그게 코드예요.</>),
            ].map((body, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#faf5ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: "11px 14px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#7c3aed", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: "#334155" }}>{body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: "center", fontSize: 12.5, fontWeight: 700, color: "#15803d", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, "→ Next chapter: this exact idea, line by line.", "→ 다음 챕터: 이 생각 그대로, 코드 한 줄씩.")}
          </div>
        </div>
      ),
    },

    /* 1-7: "그럼 왜 굳이 YES 를 물어보지?" — 미션 박스엔 '항상 가능' 이라고만 적혀 있고
       왜 항상 가능한지가 어디에도 없었다 (선생님 2026-09-03 이 직접 물음). */
    {
      type: "reveal",
      narr: t(E,
        "The problem asks \"can she type it?\" — and the answer is always YES. Why?",
        "문제는 \"칠 수 있냐\" 고 물어요. 그런데 답은 늘 YES 예요. 왜 그럴까요?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#15803d", marginBottom: 12, textWrap: "balance" }}>
            ✅ {t(E, "Why the answer is always YES", "왜 답이 항상 YES 일까?")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480, margin: "0 auto" }}>
            {[
              t(E, <><b>Length matches by itself.</b><br />M and O each append exactly one letter.<br />So N keystrokes always give an N-letter screen.</>,
                   <><b>길이는 저절로 맞아요.</b><br />M 도 O 도 한 글자씩만 붙여요.<br />그래서 키를 N 번 치면 화면도 딱 N 글자예요.</>),
              t(E, <><b>Each key is forced.</b><br />Going backwards, the O-parity behind position i is already fixed.<br />Un-flip S[i] by it and you get <b>one</b> candidate — no choice to make.</>,
                   <><b>각 자리의 키는 강제돼요.</b><br />거꾸로 가면 i 번 자리 뒤쪽의 O 홀짝은 이미 정해져 있어요.<br />S[i] 를 그만큼 되돌리면 후보가 <b>하나</b>뿐이에요. 고를 게 없어요.</>),
              t(E, <><b>That one candidate is always typeable.</b><br />The keyboard has both M and O.<br />So we can never get stuck → the answer is YES, every time.</>,
                   <><b>그 하나는 언제나 칠 수 있는 키예요.</b><br />키보드에 M 과 O 가 둘 다 있으니까요.<br />그래서 막힐 데가 없어요 → 답은 늘 YES 예요.</>),
            ].map((body, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "11px 14px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#16a34a", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: "#334155", textWrap: "balance" }}>{body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, maxWidth: 480, margin: "12px auto 0", background: "#fffbeb", border: "1px dashed #fbbf24",
            borderRadius: 10, padding: "10px 13px", fontSize: 12.5, lineHeight: 1.7, color: "#92400e", textWrap: "balance" }}>
            {t(E, <><b>So why does the problem ask at all?</b><br />Because <i>realizing</i> it is always YES is the work.<br />And k splits it: with k=0 you only answer the question, with k=1 you must also build the keystrokes.</>,
                   <><b>그럼 왜 굳이 물어볼까요?</b><br />항상 YES 라는 걸 <i>알아내는 것</i> 자체가 이 문제가 시키는 일이에요.<br />그리고 k 가 둘로 나눠요 — k=0 이면 답만, k=1 이면 키 입력까지 만들어야 해요.</>)}
          </div>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#7c3aed", textWrap: "balance", wordBreak: "keep-all" }}>
            {t(E, "Bonus: since nothing is ever a choice, the keystroke string is the ONLY one that works.",
                   "덤: 고를 게 하나도 없었으니, 답이 되는 키 입력은 그거 하나뿐이에요.")}
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMooin4Ch2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooin4Ch2(E, lang = "py") {
  return [
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getMooin4Walk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Walk right→left, flipping the letter when an odd number of O's come after it.  Each part lights up with a bubble.",
          "오른쪽→왼쪽으로 걸으며, 뒤에 O 가 홀수 개면 글자를 뒤집어요.  각 부분이 밝아지며 말풍선이 떠요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />),
      };
    })(),

    /* 짜다가 실제로 걸리는 세 군데. 선생님이 직접 겪은 것들이라 그대로 남긴다
       (선생님 2026-09-03: "내가 했던 실수나 그런것들에 대한 설명도 들어가 있었으면 좋겠어"). */
    {
      type: "reveal",
      label: t(E, "Traps", "실수"),
      narr: t(E,
        "Three places people actually get this wrong. Each one still compiles and still looks right.",
        "짜다 보면 실제로 걸리는 곳 세 군데예요. 셋 다 컴파일도 되고 그럴듯해 보여요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#b91c1c", marginBottom: 12, textWrap: "balance" }}>
            ⚠️ {t(E, "Three traps", "여기서 자주 틀려요")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520, margin: "0 auto" }}>
            {[
              {
                bad: "if (S[i] == 'O') count++;",
                good: "if (key[i] == 'O') count++;",
                why: t(E, <>Count the <b>keys we recovered</b>, not the letters on screen.<br />A screen O can come from an M that got flipped.</>,
                         <><b>화면 글자</b>가 아니라 <b>방금 알아낸 친 키</b>를 세야 해요.<br />화면의 O 는 M 이 뒤집혀 보이는 걸 수도 있거든요.</>),
              },
              {
                bad: t(E, "if (key == S) YES else NO", "if (key == S) YES 아니면 NO"),
                good: 'cout << "YES"',
                why: t(E, <>The answer is <b>always YES</b> — there is nothing to test.<br />Whether the keys match S has nothing to do with it.</>,
                         <>답은 <b>항상 YES</b> 예요. 판정할 게 없어요.<br />친 키가 S 와 같은지는 아무 상관이 없고요.</>),
              },
              {
                bad: t(E, "a leftover debug print", "디버깅용으로 넣어둔 출력"),
                good: t(E, "delete it before submitting", "제출 전에 지우기"),
                why: t(E, <>One stray blank line per test and the judge marks it wrong,<br />even though the algorithm is perfect.</>,
                         <>케이스마다 빈 줄이 하나씩 더 나가면 그걸로 오답이에요.<br />알고리즘이 완벽해도요.</>),
              },
            ].map((x, i) => (
              <div key={i} style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12, padding: "11px 14px" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 7 }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 999, background: "#dc2626", color: "#fff", fontSize: 11.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 800, color: "#b91c1c",
                    background: "#fff", border: "1px solid #fca5a5", borderRadius: 6, padding: "2px 7px", textDecoration: "line-through" }}>{x.bad}</code>
                  <span style={{ color: "#94a3b8", fontWeight: 800 }}>→</span>
                  <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 800, color: "#15803d",
                    background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 6, padding: "2px 7px" }}>{x.good}</code>
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.7, color: "#7f1d1d", textWrap: "balance" }}>{x.why}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];
}
