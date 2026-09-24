import { C, t } from "@/components/quest/theme";
import { getMooin3Sections, getMooin3Walk, getMooin3MapWalk, MooTraceSimulator, TripletEnumSimulator, Mooin3FastSim, Mooin3TableSim, Mooin3MapSim, Mooin3Compare } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* ═══════════════════════════════════════════════════════════════
   Mooin' Time III walkthrough — follows the 기·승·전·결 arc
   (see quest_problem_standard.md "🌟 최우선 — 큰 틀"):

     [기] Ch1-1: Light problem intro (story + 1 visual, no detail)
     [승] Ch1-2: Sample I/O format
     [전] Ch1-3: Worked example — TripletEnumSim walks "abba" through
                 every triplet so the rule + score + window land
                 concretely.
     [확인] Ch1-4: Quick input quiz on a small case
     [결-a sim] Ch2-1: MooTraceSim — fix-j idea
     [결-a code] Ch2-2..5: brute sections (input, fix-j loop, update, full)
     [결-b limits] Ch2-6: "what if N big?"
     [결-c code] Ch2-7: smart precomputed code

   Earlier this file had 4 separate "rule detail" pages (✓, ✗, score,
   window) before sample I/O.  That bloated the [기] step.  Folded
   into the [전] worked example.
   ═══════════════════════════════════════════════════════════════ */

export function makeMooin3Ch1(E) {
  return [
    /* [기] — Light intro.  ONE page, one tiny visual, three short
       lines.  No detailed rule explanations / score formula
       derivation / window edge cases — those land in [전]. */
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Bessie's looking at a string of letters.  She wants to pick out a special 3-letter pattern called a 'moo'.",
        "Bessie 가 글자 줄을 보고 있어요. 여기서 'moo' 라는 특별한 세 글자를 골라낼 거예요."),
      content: (
        <div style={{ padding: 20 }}>
          <div style={{
            background: C.accentBg, border: `1px solid ${C.accentBd}`, borderRadius: 12,
            padding: "16px 18px", maxWidth: 460, margin: "0 auto",
          }}>
            {/* 🎯 미션 — 문제 목표를 큰 글씨로 한 줄.  학생이 다음
                페이지 (Sample I/O) 가서 입출력 봐도 "이게 뭐 하는 거지" 가
                안 되도록 미션이 머리에 박혀있어야. */}
            <div style={{
              background: "#fff", border: `2px solid ${C.accentBd}`, borderRadius: 10,
              padding: "10px 14px", marginBottom: 16, fontSize: 13, lineHeight: 1.6, color: C.text,
            }}>
              <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🎯 {t(E, "Mission", "미션")}
              </div>
              {t(E,
                "Given a string of letters and several query windows.  For each window, find the highest-scoring 'moo' inside (or print -1).",
                "글자 줄 하나와 물음 여러 개가 주어져요.\n물음마다 찾을 범위가 하나씩 있어요.\n그 범위 안에서 점수가 가장 큰 'moo' 를 찾아 점수를 출력해요.\n없으면 -1 을 출력해요.")}
            </div>

            {/* Rule — what makes 3 letters a moo.  Cards adjacent so the
                rule is the focus; distance/score introduced separately
                with visible arrows so the student SEES what "left/right
                distance" means. */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#5b21b6", textAlign: "center", marginBottom: 8 }}>
                {t(E, "What's a 'moo'?  Three letters with this rule:",
                      "'moo' 는 세 글자예요. 규칙은 이래요.")}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 6 }}>
                {[
                  { ch: "a", bg: "#f3e8ff", bd: "#7c3aed", tag: t(E, "1st", "1번째") },
                  { ch: "b", bg: "#cffafe", bd: "#0891b2", tag: t(E, "2nd", "2번째") },
                  { ch: "b", bg: "#cffafe", bd: "#0891b2", tag: t(E, "3rd", "3번째") },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: c.bd }}>{c.tag}</div>
                    <div style={{
                      width: 36, height: 42, background: c.bg, border: `2px solid ${c.bd}`,
                      borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18, color: "#1f2937",
                    }}>{c.ch}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.55, textAlign: "center", color: C.text }}>
                <b style={{ color: "#7c3aed" }}>{t(E, "1st", "1번째")}</b>
                {t(E, " ≠ ", " 가 다르고 ")}
                <b style={{ color: "#0891b2" }}>{t(E, "2nd = 3rd", "2번째 = 3번째")}</b>
              </div>
            </div>

            {/* Score — the 3 picks can be SPREAD OUT.  Use positions 1, 3, 6
                (gaps 2 and 3) so score = 2 × 3 = 6 makes the *product of the
                two distances* unmistakable — a 1×1 example can't show that.
                Faint '·' cells = skipped positions, so 1/3/6 reads as a real
                string.  (선생님 2026-07-22: "점수를 어떻게 매긴다고?") */}
            <div style={{
              padding: "12px 12px 10px", background: "#ecfdf5", border: "1px solid #86efac",
              borderRadius: 8, marginBottom: 6,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", textAlign: "center", marginBottom: 3 }}>
                {t(E, "Score = (gap 1st→2nd) × (gap 2nd→3rd)",
                      "점수 = (1번째~2번째 거리) × (2번째~3번째 거리)")}
              </div>
              <div style={{ fontSize: 10.5, color: "#15803d", textAlign: "center", marginBottom: 10, wordBreak: "keep-all" }}>
                {t(E, "The 3 letters can sit far apart — multiply the two gaps.",
                      "3 글자는 서로 떨어져 있어도 돼요 — 두 거리를 곱해요.")}
              </div>

              {/* Mini-string: picks at pos 1, 3, 6.  Faint dots = skipped. */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
                {[
                  { kind: "pick", ch: "a", bd: "#7c3aed", bg: "#f3e8ff", pos: 1 },
                  { kind: "skip" },
                  { kind: "pick", ch: "b", bd: "#0891b2", bg: "#cffafe", pos: 3 },
                  { kind: "skip" },
                  { kind: "skip" },
                  { kind: "pick", ch: "b", bd: "#0891b2", bg: "#cffafe", pos: 6 },
                ].map((c, i) => c.kind === "skip" ? (
                  <div key={i} style={{
                    width: 20, height: 30, borderRadius: 5, border: "1.5px dashed #cbd5e1",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#cbd5e1", fontSize: 13, fontWeight: 700,
                  }}>·</div>
                ) : (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{
                      width: 30, height: 34, background: c.bg, border: `2px solid ${c.bd}`,
                      borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, color: "#1f2937",
                    }}>{c.ch}</div>
                    <div style={{ fontSize: 9, color: c.bd, fontWeight: 700 }}>
                      {t(E, "pos ", "위치 ")}{c.pos}
                    </div>
                  </div>
                ))}
              </div>

              {/* Distance bridges — one spans pos 1→3 (=2), one spans pos 3→6 (=3). */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginBottom: 8 }}>
                {/* under pick@1 (30) : half spacer */}
                <div style={{ width: 15 }} />
                <div style={{
                  width: 30 + 4 + 20 + 4, height: 17, background: "#f3e8ff", border: "1.5px solid #7c3aed",
                  borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10.5, fontWeight: 800, color: "#7c3aed",
                }}>← 2 →</div>
                <div style={{
                  width: 30 + 4 + 20 + 4 + 20 + 4, height: 17, background: "#cffafe", border: "1.5px solid #0891b2",
                  borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10.5, fontWeight: 800, color: "#0891b2",
                }}>← 3 →</div>
                <div style={{ width: 15 }} />
              </div>

              <div style={{ fontSize: 14, fontWeight: 800, color: "#15803d", textAlign: "center", marginTop: 2 }}>
                {t(E, "Score = ", "점수 = ")}
                <span style={{ color: "#7c3aed" }}>2</span>
                {" × "}
                <span style={{ color: "#0891b2" }}>3</span>
                {" = 6"}
              </div>
              <div style={{ fontSize: 11, color: "#15803d", textAlign: "center", marginTop: 6, wordBreak: "keep-all" }}>
                {t(E, "Adjacent picks → tiny (1×1=1).  Farther apart → bigger.  Mission: find the BIGGEST score in the window.",
                      "붙어 있으면 점수가 작아요 (1×1=1).\n멀리 떨어질수록 점수가 커져요.\n우리가 할 일은 범위 안에서 가장 큰 점수를 찾는 거예요.")}
              </div>
            </div>

            <div style={{
              marginTop: 10, fontSize: 11.5, color: C.dim, textAlign: "center", fontStyle: "italic",
            }}>
              {t(E, "Sample input + worked example on the next pages.",
                    "예시 입력과 풀이 예제는 다음 쪽에 나와요.")}
            </div>
          </div>
        </div>),
    },

    /* [승] — Sample I/O.  Same as before. */
    {
      type: "reveal",
      label: t(E, "Sample I/O", "예시 입출력"),
      narr: t(E,
        "Sample input — 12-character string with 5 query windows.  Output is 5 lines: the highest moo score in each window.",
        "예시 입력은 12 글자 줄과 물음 5 개예요. 출력은 5 줄, 물음마다 가장 큰 moo 점수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`12 5
abcabbacabac
1 12
2 7
4 8
2 5
3 10`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`28
6
1
-1
12`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Line by line", "한 줄씩")}
            </div>
            <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>12 5</code> — {t(E, "N = 12 (string length), Q = 5 (queries)", "N = 12 (글자 줄의 길이), Q = 5 (물음 개수)")}</div>
            <div style={{ marginTop: 6, fontWeight: 600, color: "#5b21b6" }}>📐 {t(E, "Real limits: N up to 100,000, Q up to 30,000.", "진짜 문제에서는 N 이 최대 10만, Q 가 최대 3만이에요.")}</div>
            <div style={{ marginTop: 6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>abcabbacabac</code> — {t(E, "the string s", "글자 줄 s")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "Then 5 query lines, each: ", "그 다음 물음이 5 줄 나와요. 한 줄에 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>l r</code>
              {" — "}
              <b style={{ color: "#5b21b6" }}>{t(E, "the WINDOW", "찾을 범위")}</b>
              {t(E, " (positions ", " 가 적혀 있어요 (위치 ")}
              <code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3 }}>l..r</code>
              {t(E, " only).  NOT distances!", " 만 써요). 거리가 아니에요!")}
            </div>
          </div>

          {/* Visual: highlight what query 2 ("2 7") means on the string */}
          <div style={{
            marginTop: 10, background: "#fff",
            border: "1px dashed #c4b5fd", borderRadius: 10, padding: "10px 12px",
            fontSize: 11.5, color: C.text,
          }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Example: query \"2 7\" means this window:",
                    "물음 \"2 7\" 은 이런 범위예요.")}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <div style={{ display: "flex", gap: 3 }}>
                  {"abcabbacabac".split("").map((ch, i) => {
                    const pos = i + 1;
                    const inWindow = pos >= 2 && pos <= 7;
                    return (
                      <div key={i} style={{
                        width: 20, height: 24,
                        background: inWindow ? "#fef3c7" : "#f9fafb",
                        border: `1.5px solid ${inWindow ? "#fbbf24" : "#e5e7eb"}`,
                        borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 12,
                        color: inWindow ? "#7c2d12" : "#cbd5e1",
                        opacity: inWindow ? 1 : 0.5,
                      }}>{ch}</div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                  {"abcabbacabac".split("").map((_, i) => {
                    const pos = i + 1;
                    const inWindow = pos >= 2 && pos <= 7;
                    return (
                      <div key={i} style={{
                        width: 20, fontSize: 8.5, fontWeight: inWindow ? 700 : 400,
                        color: inWindow ? "#92400e" : "#cbd5e1", textAlign: "center",
                      }}>{pos}</div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.55 }}>
              {t(E,
                "Find the highest-score moo using ONLY positions 2..7 (yellow).  Answer for this window = 6.",
                "노란 자리(2~7) 안에서만 moo 를 골라 가장 큰 점수를 찾아요.\n이 범위의 답은 6 이에요.")}
            </div>
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, fontStyle: "italic", textAlign: "center" }}>
            {t(E, "📌 Indexing: input is 1-based.  Next: a worked example walking every triplet on a tiny string.",
                  "📌 자리 번호는 1 부터 세요. 다음 쪽에서는 짧은 글자 줄로 세 글자 조합을 하나씩 따라가 봐요.")}
          </div>
        </div>),
    },

    /* [전] — Worked example.  TripletEnumSim on "abcabbc" (N=7, 35 triplets).
       Too many to walk all → walk a curated story (fail → tight moo=1 →
       spread=4 → widest=8⭐), then verdict shows all valid moos + max, then
       the scale bars anchor at N=7 → 35 to motivate "brute explodes". */
    {
      type: "reveal",
      label: t(E, "Worked example", "풀이 예제"),
      narr: t(E,
        "Try the rule on \"abcabbc\", in order — (1,2,3), (1,2,4)… sliding k right.",
        "\"abcabbc\" 를 (1,2,3), (1,2,4)… 순서로 봐요. k 를 밀수록 점수가 커져요."),
      content: (<TripletEnumSimulator E={E} />),
    },

    /* [확인] 퀴즈 스텝 제거 (선생님 2026-07-30: "퀴즈 없애줘").
       reach quest 때와 같은 판단 — 학생이 흐름을 따라가는 게 우선이고, 중간에
       답을 맞혀야 넘어가는 관문은 흐름을 끊는다. 확인은 시뮬이 대신한다.
       (되돌리려면 type:"input" / question / hint / answer:3 스텝을 여기 다시 넣으면 됨.) */
  ];
}

export function makeMooin3Ch2(E, lang = "py") {
  const sections = getMooin3Sections(E);

  // Level 1(3중 for 브루트 코드)는 제거 — 문제 chapter 가 이미 브루트 개념·한계를
  // 다뤘으므로 코드 chapter 에서 재탕하지 않음 (선생님 2026-07-23).

  return [
    /* [결-a sim] — 문제 chapter 에서 브루트(모든 i,j,k)+한계를 이미 봤으니, 코드
       chapter 는 브루트 재탕 없이 바로 '개선(가운데 j 고정)' 으로 (선생님 2026-07-23:
       "페이지 1에서 이미 브루트 설명했잖아 — 뒤에서 또 나오지"). */
    {
      type: "reveal",
      label: t(E, "Idea: fix the middle j", "아이디어 — 가운데 j 고정"),
      narr: t(E,
        "Pin the middle j, then search once for the best i and once for the best k.",
        "가운데 j 를 고정하고, 가장 좋은 i 와 k 를 한 번씩만 찾아요."),
      content: (<MooTraceSimulator E={E} lang={lang} />),
    },

    /* [결-a code] — 브루트 fix-j 전체 코드를 CodeWalk 말풍선 하나로 (선생님 2026-07-23:
       "설명 줄줄이 쓰지 말고 봐야할 부분만, 필요하면 말풍선"). 코드 위 노트 벽 4스텝 → 1스텝. */
    (() => {
      const w = getMooin3Walk(E, lang, "brute");
      return {
        type: "reveal",
        label: t(E, "Code: fix-j", "코드 — j 고정"),
        narr: t(E,
          "Same fix-j idea as the simulator — now in code.",
          "방금 시뮬에서 본 j 고정 생각을 이번엔 코드로 봐요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />),
      };
    })(),

    /* [결-b 한계] — section 5 ("What if N is big?") */
    ...sections.slice(4, 5).map((sec) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr: t(E,
        "The fix-j version is correct — but how big can N get?",
        "j 고정 코드는 답을 맞혀요. 그런데 N 은 얼마나 커질 수 있을까요?"),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    /* [결-c 시뮬] — 빠른 풀이(글자로 묶기→i·k→포물선)를 코드 前에 눈으로 (선생님 2026-07-30:
       "쉽고 시뮬로 이해가 다 되고 모든 테스트 통과"). fix-j 와 같은 예제로 답 8 재확인. */
    {
      type: "reveal",
      label: t(E, "Idea: check by letter", "아이디어 — 글자로 확인"),
      narr: t(E,
        "The fast solution turns on one idea — go letter by letter, not spot by spot.",
        "빠른 풀이는 생각 하나만 바꾸면 돼요. 자리가 아니라 글자로 봐요."),
      content: (<Mooin3FastSim E={E} />),
    },

    /* [결-c sim2] — 표가 *어떻게 채워지는지* 한 칸씩. (선생님 2026-07-30: 글자 묶기는
       시뮬이 있는데 정작 속도를 만드는 '표' 는 코드로만 있었다.) 글자 하나만 따라간다. */
    {
      type: "reveal",
      label: t(E, "Building the table", "표 만들기"),
      narr: t(E,
        "The speed comes from building three small tables ONCE, before any query.",
        "표 3 개를 물음 받기 전에 한 번만 만들어 두면 빨라져요."),
      content: (<Mooin3TableSim E={E} lang={lang} />),
    },

    /* ⭐ [결-c 다리] — 5/9 「표 만들기」 와 6/9 「빠른 코드」 사이의 **빠진 다리** (2026-09-24).
       학생(초6)이 6/9 에서 "완전히 막혔다" 고 했다. pedagogy 가 화면을 따라가며 원인을 짚었다 —
       5/9 는 글자 **하나**(b)의 **1차원 행 하나**만 만드는데, 6/9 가 곧장
       「26글자 · 2차원 표 전체 + chr(c+97)」 로 뛴다. 그 사이에 아무 설명이 없다.
       ⚠️ 원인은 chr() 가 어려워서가 아니다 — `data/algorithm/topics/string.ts` 가
          ord(s[i])-ord('a') 를 a→0·b→1·z→25 그림까지 붙여 **이미 가르친다**(4단계).
          가르친 걸 이 quest 가 **안 이어준** 것이라, 🔒 코드는 안 건드리고 화면만 놓는다.
       클릭 0 · 한 화면. 분량이 느는 자리라 일부러 «쌓인 그림 + 두 줄» 로만 짰다. */
    {
      type: "reveal",
      label: t(E, "One table \u2192 26", "\ud45c \ud558\ub098 \u2192 26\uac1c"),
      narr: t(E,
        "You built one table \u2014 now stack one for every letter.",
        "\ud45c \ud558\ub098\ub97c \ub9cc\ub4e4\uc5b4 \ubd24\uc8e0. \uc774\uc81c \uae00\uc790\ub9c8\ub2e4 \ud558\ub098\uc529 \uc313\uc544 \ub450\uc5b4\uc694."),
      content: (
        <div style={{ padding: 16, maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "just now", "\ubc29\uae08 \ub9cc\ub4e0 \uac83")}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#ecfeff", border: "1.5px solid #67e8f9", borderRadius: 8, padding: "6px 10px" }}>
                <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#155e75" }}>b</b>
                <span style={{ color: "#67e8f9" }}>|</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#155e75" }}>-1 -1 1 1 1 4 4</span>
              </div>
            </div>
            <div style={{ fontSize: 20, color: C.dim }}>{"\u2192"}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "what the code builds", "\ucf54\ub4dc\uac00 \ub9cc\ub4dc\ub294 \uac83")}</div>
              <div style={{ display: "inline-block", border: "1.5px solid #c4b5fd", borderRadius: 8, overflow: "hidden" }}>
                {[["0", "a"], ["1", "b"], ["2", "c"], ["\u22ee", "\u22ee"], ["25", "z"]].map(([n, ch], i) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 10px",
                    background: ch === "b" ? "#ecfeff" : "#faf5ff",
                    borderTop: i ? "1px solid #ede9fe" : "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
                    <span style={{ width: 20, textAlign: "right", color: "#7c3aed", fontWeight: 700 }}>{n}</span>
                    <span style={{ color: "#a78bfa" }}>|</span>
                    <b style={{ color: ch === "b" ? "#155e75" : "#5b21b6" }}>{ch}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>Which letter sits in the middle? We don't know yet — so we build a row for <b>every</b> letter before any query arrives.</>,
              <>가운데가 어떤 글자일지는 아직 모르잖아요.<br />그래서 물음을 받기 전에 <b>글자마다</b> 한 줄씩 미리 만들어 두어요.</>)}
          </div>
          <div style={{ marginTop: 8, fontSize: 12.5, color: "#5b21b6", background: "#faf5ff", border: "1px solid #ddd6fe", borderRadius: 8, padding: "8px 11px", lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>Rows are numbered 0–25, so the code writes <code>chr(97 + c)</code> to get the letter back — the same a→0, z→25 trick from the string topic.</>,
              <>줄은 0~25 번으로 세요. 그래서 코드는 번호를 다시 글자로 바꿀 때 <code>chr(97 + c)</code> 를 써요.<br />알고리즘 ‘문자열’ 토픽에서 본 a→0, z→25 와 같은 방법이에요.</>)}
          </div>
        </div>),
    },

    /* [결-c code] — 빠른 O(26) 코드를 CodeWalk 말풍선 하나로 (3단계 점진 코드 → 최종 코드 +
       '도약' 말풍선). 코드 위 노트 벽 3스텝 → 1스텝 (선생님 2026-07-23). */
    (() => {
      const w = getMooin3Walk(E, lang, "fast");
      return {
        type: "reveal",
        label: t(E, "Code: fast (O(26)/query)", "코드 — 빠른 풀이 (물음당 O(26))"),
        narr: t(E,
          "Three leaps: precompute the tables once, loop over the 26 letters, and use the vertex.",
          "표를 한 번만 만들고, j 대신 글자 26 개를 돌고, 꼭짓점을 써요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#7c3aed" />),
      };
    })(),
    /* ── 부록: map 이라는 '다른 방법' (선생님 2026-08-10 USACO 통과 → 부록 추가).
       ① 시뮬로 방법 소개 → ② 코드 → ③ 표 vs map 비교. 표 방식은 주 풀이로 유지. ── */
    /* [부록 ①] map 시뮬 — 리스트 만들고 이분탐색으로 푸는 걸 눈으로 */
    {
      type: "reveal",
      label: t(E, "Bonus ① Another way: map", "부록 ① 다른 방법 — map"),
      narr: t(E,
        "A different tool for the same problem — one 'letter → its spots' list, binary-searched.",
        "표 3 개 대신 '글자 → 위치 목록' 하나로 같은 문제를 풀어요."),
      content: (<Mooin3MapSim E={E} />),
    },
    /* [부록 ②] map 코드 */
    (() => {
      const w = getMooin3MapWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Bonus ② The map code", "부록 ② map 코드"),
        narr: t(E,
          "The same idea as the tables, in code — this one passed the real USACO judge too.",
          "표 방식과 같은 생각인데, 이 코드도 USACO 채점기를 통과했어요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0d9488"
          badge={{ ko: "부록 · map 으로 같은 풀이 (안 봐도 돼요)", en: "Bonus · same solution with a map (optional)", color: "#0d9488" }} />),
      };
    })(),
    /* [부록 ③] 표 vs map 비교 — 마지막 */
    {
      type: "reveal",
      label: t(E, "Bonus ③ Table vs map", "부록 ③ 표 vs map 비교"),
      narr: t(E,
        "So which one? Same algorithm, different trade-offs — here they are side by side.",
        "그래서 뭘 쓸까? 알고리즘은 같고 장단점만 달라요 — 나란히 비교해볼게요."),
      content: (<Mooin3Compare E={E} />),
    },
  ];
}
