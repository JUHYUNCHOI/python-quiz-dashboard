import { C, t } from "@/components/quest/theme";
import { getMooin3Sections, MooTraceSimulator, TripletEnumSimulator } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

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
        "Bessie 가 글자로 된 줄을 보고 있어. 'moo' 라는 특별한 3 글자 패턴을 골라 점수를 매길 거야."),
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
                "글자 줄과 여러 쿼리 윈도우가 주어져요. 각 윈도우 안에서 점수가 가장 큰 'moo' 의 점수를 출력 (없으면 -1).")}
            </div>

            {/* Rule — what makes 3 letters a moo.  Cards adjacent so the
                rule is the focus; distance/score introduced separately
                with visible arrows so the student SEES what "left/right
                distance" means. */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#5b21b6", textAlign: "center", marginBottom: 8 }}>
                {t(E, "What's a 'moo'?  Three letters with this rule:",
                      "'moo' = 3 글자, 규칙은:")}
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
                      "붙어있으면 작은 점수 (1×1=1), 멀리 떨어질수록 큰 점수.  미션: 윈도우 안에서 최대 점수 찾기.")}
              </div>
            </div>

            <div style={{
              marginTop: 10, fontSize: 11.5, color: C.dim, textAlign: "center", fontStyle: "italic",
            }}>
              {t(E, "Sample input + worked example on the next pages.",
                    "샘플 입력 + 풀이 예제는 다음 페이지에서.")}
            </div>
          </div>
        </div>),
    },

    /* [승] — Sample I/O.  Same as before. */
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E,
        "Sample input — 12-character string with 5 query windows.  Output is 5 lines: the highest moo score in each window.",
        "샘플 입력 — 12 자 문자열 + 쿼리 윈도우 5 개. 출력 5 줄 = 각 윈도우의 점수 최대 moo 점수."),
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
            <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>12 5</code> — {t(E, "N = 12 (string length), Q = 5 (queries)", "N = 12 (문자열 길이), Q = 5 (쿼리 개수)")}</div>
            <div style={{ marginTop: 6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>abcabbacabac</code> — {t(E, "the string s", "문자열 s")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "Then 5 query lines, each: ", "그 다음 쿼리 5 줄, 각각: ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>l r</code>
              {" — "}
              <b style={{ color: "#5b21b6" }}>{t(E, "the WINDOW", "윈도우 범위")}</b>
              {t(E, " (positions ", " (위치 ")}
              <code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3 }}>l..r</code>
              {t(E, " only).  NOT distances!", " 만 사용). 거리 X!")}
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
                    "예시: 쿼리 \"2 7\" 은 이 윈도우:")}
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
                "노란 자리 (2..7) 안에서만 moo 골라 점수 최대 찾기. 이 윈도우 답 = 6.")}
            </div>
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, fontStyle: "italic", textAlign: "center" }}>
            {t(E, "📌 Indexing: input is 1-based.  Next: a worked example walking every triplet on a tiny string.",
                  "📌 인덱싱: 입력은 1-based. 다음 페이지: 작은 문자열에서 모든 triplet 직접 따라가는 풀이 예제.")}
          </div>
        </div>),
    },

    /* [전] — Worked example.  TripletEnumSim walks "abba" through
       every (i, j, k), showing rule + score in action.  Tiny string
       so the student sees the full picture without intimidation. */
    {
      type: "reveal",
      label: t(E, "Worked example", "풀이 예제"),
      narr: t(E,
        "Try the rule on a tiny string \"abba\".  Walk every (i, j, k) — only 4 triplets.",
        "작은 문자열 \"abba\" 로 규칙을 직접 적용해 보자. (i, j, k) 4 개뿐 — 손으로 따라가기 쉬움."),
      content: (<TripletEnumSimulator E={E} />),
    },

    /* [확인] — Quick input quiz on a tiny case.  Hint nudges only. */
    {
      type: "input",
      label: t(E, "Your turn", "직접 풀어보기"),
      narr: t(E,
        "Your turn — find the best moo on a small string.",
        "직접 — 작은 문자열에서 최선 moo."),
      question: t(E,
        "Max (left·right) for s='abba' query [1, 4]?",
        "s='abba' 쿼리 [1, 4] 의 최대 (왼쪽 거리 × 오른쪽 거리)?"),
      hint: t(E,
        "Try j ∈ {2, 3}.  For each j, find the leftmost i with s[i] ≠ s[j] and rightmost k with s[k] = s[j], inside [1, 4].",
        "j ∈ {2, 3} 시도. j 마다 [1, 4] 안에서 s[i] ≠ s[j] 인 가장 왼쪽 i, s[k] = s[j] 인 가장 오른쪽 k."),
      answer: 1,
    },
  ];
}

export function makeMooin3Ch2(E, lang = "py") {
  const sections = getMooin3Sections(E);

  /* [결-a₁] — Level 1: just translate the problem to code.  Three
     nested for loops over (i, j, k).  No insight — student writes
     this straight from reading the problem.  Slow but correct.
     Works for tiny inputs; obviously won't scale.  The "natural
     first code" the standard demands.  Level 2 (fix-j) comes
     after as a small refinement. */
  const LEVEL1_PY = [
    "N, Q = map(int, input().split())",
    "s = input().strip()",
    "",
    "for q in range(Q):",
    "    l, r = map(int, input().split())",
    "    l -= 1",
    "    r -= 1",
    "    best = -1",
    "    # Try every (i, j, k) inside the window — straight from the rules.",
    "    for i in range(l, r + 1):",
    "        for j in range(i + 1, r + 1):",
    "            for k in range(j + 1, r + 1):",
    "                if s[i] != s[j] and s[j] == s[k]:",
    "                    val = (j - i) * (k - j)",
    "                    if val > best:",
    "                        best = val",
    "    print(best)",
  ];
  const LEVEL1_CPP = [
    "#include <iostream>",
    "#include <string>",
    "using namespace std;",
    "",
    "int main() {",
    "    int N, Q;",
    "    cin >> N >> Q;",
    "    string s;",
    "    cin >> s;",
    "    for (int q = 0; q < Q; q++) {",
    "        int l, r;",
    "        cin >> l >> r;",
    "        l--;",
    "        r--;",
    "        long long best = -1;",
    "        // Try every (i, j, k) inside the window.",
    "        for (int i = l; i <= r; i++) {",
    "            for (int j = i + 1; j <= r; j++) {",
    "                for (int k = j + 1; k <= r; k++) {",
    "                    if (s[i] != s[j] && s[j] == s[k]) {",
    "                        long long val = (long long)(j - i) * (k - j);",
    "                        if (val > best) {",
    "                            best = val;",
    "                        }",
    "                    }",
    "                }",
    "            }",
    "        }",
    "        cout << best << '\\n';",
    "    }",
    "    return 0;",
    "}",
  ];
  const level1Section = {
    label: t(E, "1️⃣ First code — try every (i, j, k)",
                "1️⃣ 첫 코드 — 모든 (i, j, k) 시도"),
    color: "#f59e0b",
    py: LEVEL1_PY,
    cpp: LEVEL1_CPP,
    why: [
      t(E,
        "Straight from the problem definition: walk every triplet (i, j, k) inside the window, check the moo rule, track the best score.",
        "문제 정의 그대로: 윈도우 안 모든 (i, j, k) 돌면서 moo 규칙 확인 + 최고 점수 추적."),
      t(E,
        "Three nested for-loops — outermost i, then j > i, then k > j.  No insight, just brute enumeration.",
        "3 중 for — 바깥 i, 그 다음 j > i, 그 다음 k > j. 통찰 없이 그냥 다 시도."),
      t(E,
        "Works for tiny inputs (N ≤ ~30).  For real constraints (N up to 10⁵) it explodes — three loops over N each = O(N³) per query.  Next: a small refinement.",
        "작은 입력 (N ≤ ~30) 엔 OK. 실제 제약 (N 최대 10⁵) 에선 폭발 — N 짜리 for 가 3 겹 = 쿼리당 O(N³). 다음: 작은 개선."),
    ],
  };

  return [
    /* [결-a₁] — Level 1: try-every-triplet code (natural first code) */
    {
      type: "reveal",
      label: level1Section.label,
      preview: level1Section.why[0],
      narr: t(E,
        "Worked example clear — now write the code that just *does what the problem says*.  Three for loops.",
        "예제 따라가기 끝났으니 코드로. 문제 그대로 옮기면 — 3 중 for."),
      content: (<CodeSectionView section={level1Section} lang={lang} E={E} />),
    },

    /* [결-a sim] — MooTraceSim shows the fix-j idea right before the
       student sees the Level 2 (refined) brute code. */
    {
      type: "reveal",
      label: t(E, "Idea: fix the middle j", "아이디어: 중간 j 고정"),
      narr: t(E,
        "Three for loops — that's N × N × N work per query.  Even N = 100 means 10⁶ checks.  What if we fix the middle j and only search for i and k?  Drag j around and see.",
        "3 중 for — 쿼리당 N × N × N. N = 100 만 돼도 100 만 번. 가운데 j 만 고정하고 i, k 따로 찾으면 어떻게 될까? j 드래그하면서 봐."),
      content: (<MooTraceSimulator E={E} />),
    },

    /* [결-a code] — brute code sections (input → fix-j loop → update → full).
       Sections 1..4 from getMooin3Sections. */
    ...sections.slice(0, 4).map((sec, i) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr: i === 0
        ? t(E,
            "Same fix-j idea as the simulator — but now in code.  For each j, scan the left side once for the best i, scan the right side once for the best k.  Three nested for-loops shrink to two.",
            "방금 시뮬에서 j 를 고정한 그 아이디어 그대로 — 이번엔 코드로.  매 j 마다 왼쪽에서 best i 를 한 번 훑고, 오른쪽에서 best k 를 한 번 훑어요.  3중 for 가 2중 for 로 줄어요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    /* [결-b 한계] — section 5 ("What if N is big?") */
    ...sections.slice(4, 5).map((sec) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr: t(E,
        "Brute solves the problem correctly — but how big can N actually get?  Let's count operations.",
        "Brute 는 문제를 *정확히* 풀어요 — 근데 N 이 얼마나 커질 수 있지? 연산량을 세어 봐요."),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    /* [결-c code] — smart code, in 3 stages:
        slice(5)[0] = Stage A: group j by character c (outer loop swap)
        slice(5)[1] = Stage B: precompute i, k lookup tables
        slice(5)[2] = Stage C: parabola peak + binary search (final fast)  */
    ...sections.slice(5).map((sec, i) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr:
        i === 0
          ? t(E,
              "First leap: every j with the same s[j] asks the SAME left/right question.  So loop the OUTER over character c (just 26) instead of j (N positions).",
              "첫 도약: s[j] 가 같은 j 들은 모두 같은 좌/우 질문을 함. 외곽 루프를 c (26 개) 로 — j (N 개) 대신.")
          : i === 1
          ? t(E,
              "Second leap: build nearest_diff and latest_same tables once before any query.  Now (left_i, right_k) per (c, l, r) is just a table lookup.",
              "둘째 도약: nearest_diff, latest_same 표를 쿼리 전에 한 번만. 이제 (left_i, right_k) 가 표 한 번 조회로 끝.")
          : i === 2
          ? t(E,
              "Third leap: f(j) = (j − left_i)·(right_k − j) is a parabola — peak at the midpoint.  Binary search positions_of[c] to land on the 2 closest j candidates.  Done — fits in time.",
              "셋째 도약: f(j) = (j − left_i)·(right_k − j) 는 포물선 — 꼭대기 중점. positions_of[c] 에서 이분 탐색으로 가장 가까운 j 2 개만. 끝 — 시간 안에 들어옴.")
          : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
