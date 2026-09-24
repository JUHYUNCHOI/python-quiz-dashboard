import { C, t } from "@/components/quest/theme";
import { getPermSections, DismantleSimulator, BruteForceEnumerator } from "./components";

/* ================================================================
   SOLUTION CODE — Brute force.
   For each test case, run dismantle() on every permutation of
   1..N (in lex order, via itertools.permutations / next_permutation —
   no recursion, per 2026-09-22 "no recursion in student code"). The
   FIRST p whose dismantle matches h is automatically the lex-smallest
   answer. -1 if none.
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh1(E) {
  return [
    // 1-1: Title + the actual problem (dismantle version)
    {
      type: "reveal",
      narr: t(E,
        "Recover Farmer John's permutation from Nhoj's hints.",
        "힌트만 보고 원래 순열을 되살려요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧩</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c5cfc" }}>Farmer John's Favorite Permutation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #3</div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {/* fact 1 — John has p */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Farmer John has a ", "Farmer John 에게 ")}
                  <b style={{ color: "#9a3412" }}>{t(E, "permutation p of length N", "길이 N 의 순열 p")}</b>
                  {t(E, ", containing each integer 1..N exactly once.", " 가 있어요. 1 부터 N 까지 모든 숫자를 한 번씩만 써요.")}
                </div>
              </div>
              {/* fact 2 — Nhoj's dismantle rule */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Farmer Nhoj ", "Farmer Nhoj 가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "dismantles p step by step", "p 를 한 단계씩 분해")}</b>
                  {t(E, ". While more than 1 element remains in p, he applies this rule and records one hint:",
                        ". p 에 원소가 2 개 이상 남아 있는 동안 아래 규칙을 쓰고 힌트를 하나씩 적어요.")}
                  <div style={{ marginTop: 6, marginLeft: 6, fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
                    {t(E, "↳ if first element > last element: ", "↳ 첫 원소 > 마지막 원소 이면: ")}
                    <b style={{ color: "#dc2626" }}>{t(E, "write the 2nd element, remove the 1st", "2 번째 원소를 적고 1 번째를 빼요")}</b><br/>
                    {t(E, "↳ otherwise: ", "↳ 그 외: ")}
                    <b style={{ color: "#7c3aed" }}>{t(E, "write the 2nd-to-last element, remove the last", "끝에서 2 번째 원소를 적고 마지막을 빼요")}</b>
                  </div>
                </div>
              </div>
              {/* fact 3 — N-1 hints total */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "After N−1 steps, only 1 element is left and Nhoj has written ", "N−1 단계가 끝나면 원소가 1 개만 남고, Nhoj 는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N−1 hints h[0], h[1], …, h[N−2]", "N−1 개 힌트 h[0], h[1], …, h[N−2]")}</b>
                  {t(E, " in order — that's the input.", " 를 순서대로 적었어요. 그게 바로 입력이에요.")}
                </div>
              </div>
              {/* fact 4 — your job */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Reconstruct the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest p consistent with the hints", "힌트와 일관된 사전순으로 가장 작은 p")}</b>
                  {t(E, ", or determine that no permutation fits (print ",
                        " 를 되살려요. 어떤 순열도 안 맞으면 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 3, color: "#991b1b", fontWeight: 600 }}>-1</code>
                  {t(E, ").", " 을 출력해요.")}
                </div>
              </div>
            </div>

            {/* Permutation definition box */}
            <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #fdba74", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
              <b style={{ color: "#9a3412" }}>{t(E, "💬 What's a permutation?", "💬 순열이란?")}</b>{" "}
              {t(E, "A list using each number 1..N exactly once. e.g. for N=4: [3,1,4,2] is a permutation, [3,1,1,2] is not (1 used twice, 4 missing).",
                    "1 부터 N 까지 각 숫자를 딱 한 번씩 쓰는 리스트예요. N=4 일 때 [3,1,4,2] 는 순열이에요. [3,1,1,2] 는 1 을 두 번 쓰고 4 가 빠져서 순열이 아니에요.")}
            </div>

            {/* Lex order definition box */}
            <div style={{ marginTop: 6, background: "#fff", border: "1px dashed #fdba74", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
              <b style={{ color: "#9a3412" }}>{t(E, "💬 What's lexicographic (lex) order?", "💬 사전순(lex)이란?")}</b>{" "}
              {t(E, "Compare two lists position by position from left to right. The first position where they differ decides which is 'smaller'. e.g. [1,3,2] < [2,1,3] because position 0: 1 < 2.",
                    "두 리스트를 왼쪽부터 한 자리씩 비교해요. 처음으로 달라지는 자리가 어느 쪽이 더 '작은지' 정해요. [1,3,2] 와 [2,1,3] 은 0 번 자리가 1 과 2 라서 [1,3,2] 가 더 작아요.")}
            </div>
          </div>

        </div>),
    },
    // 1-1.5: Forward (Nhoj's process) + Your job (reverse) — split off so 1-1 isn't a wall
    {
      type: "reveal",
      narr: t(E,
        "Two directions: Nhoj went FORWARD (p → h). Your job goes BACKWARD (h → p).",
        "Nhoj 는 정방향으로 갔어요 (p → h).\n우리가 할 일은 역방향이에요 (h → p)."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Forward direction summary */}
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              ⚙️ {t(E, "Forward (what Nhoj did to John's permutation)", "정방향 (Nhoj 가 John 의 순열에 한 일)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fff", border: "1px solid #7c5cfc", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#7c5cfc", marginBottom: 4 }}>
                  🤠 {t(E, "John's secret p", "John 의 비밀 p")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>
                  [?, ?, ?, ?]
                </div>
              </div>
              <div style={{ fontSize: 18, color: "#dc2626", textAlign: "center", fontWeight: 700 }}>
                <div style={{ fontSize: 16, lineHeight: 1 }}>👹</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, marginTop: 2 }}>Nhoj</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>
                  ✏️ {t(E, "hints Nhoj wrote", "Nhoj 가 적은 힌트")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#92400e" }}>
                  h = [?, ?, ?]
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
              {t(E, "(Next page: hand-trace exactly how p turns into h, step by step.)",
                    "(다음 쪽에서 p 가 h 로 바뀌는 과정을 한 단계씩 손으로 따라가요.)")}
            </div>
          </div>

          {/* Your job — reverse direction */}
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#15803d", marginBottom: 8 }}>
              🎯 {t(E, "Your job (reverse — recover John's permutation)", "할 일 (역방향 — John 의 순열 되살리기)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>{t(E, "GIVEN", "받는 것")}</div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>h = [?, ?, ?]</div>
              </div>
              <div style={{ fontSize: 22, color: "#15803d", textAlign: "center", fontWeight: 700 }}>→</div>
              <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>{t(E, "FIND John's p", "John 의 p 찾기")}</div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>[?, ?, ?, ?]</div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#15803d", textAlign: "center", lineHeight: 1.5 }}>
              {t(E, "Multiple p's can produce the same h — find John's LEXICOGRAPHICALLY SMALLEST possible p (or -1).",
                    "같은 h 를 만드는 p 가 여러 개일 수 있어요 — John 의 순열 중 사전순으로 가장 작은 것 (또는 -1) 을 찾아요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Interactive hand-simulator (was a static trace dump)
    {
      type: "reveal",
      narr: t(E,
        "Hand-simulate Nhoj's process on p = [3, 1, 2, 4] — press ▶ to step through it.",
        "이제 Nhoj 가 한 일을 p = [3, 1, 2, 4] 에서 손으로 따라가요.\n▶ 를 눌러 한 단계씩 비교하고, 빼고, 적어 봐요.\n리스트가 줄어들면서 힌트가 늘어나는 걸 볼 수 있어요."),
      content: (<DismantleSimulator E={E} />),
    },
    // 1-1.5: Input / Output format
    {
      type: "reveal",
      narr: t(E,
        "Here's the sample input and output.",
        "샘플 입력과 출력 형식이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>

          {/* INPUT */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
                {`5
2
1
2
2
4
1 1 1
4
2 1 1
4
3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
                {`1 2
-1
-1
3 1 2 4
1 2 3 4`}
              </div>
            </div>
          </div>

          {/* Annotated breakdown */}
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              🔍 {t(E, "Reading the input line by line", "입력을 한 줄씩 읽기")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: C.text, lineHeight: 1.5 }}>
              <div><b style={{ color: "#5b21b6" }}>5</b> {t(E, " — number of test cases (T)", " — 테스트 케이스 수 (T)")}</div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>2</b> {t(E, " ← N for case 1", " ← 케이스 1의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>1</b> {t(E, " ← hints (N−1 = 1 number) → answer ", " ← 힌트 (N−1 = 1개) → 답 ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#15803d" }}>1 2</code></div>
              </div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>2</b> {t(E, " ← N for case 2", " ← 케이스 2의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>2</b> {t(E, " ← hints → no perm of [1, 2] has gap 2 → ", " ← 힌트 → [1, 2] 의 순열 중에는 차이가 2 인 게 없어요 → ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#dc2626" }}>-1</code></div>
              </div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>4</b> {t(E, " ← N for case 3", " ← 케이스 3의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>1 1 1</b> {t(E, " ← 3 hints → no valid perm → ", " ← 힌트 3 개 → 맞는 순열이 없어요 → ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#dc2626" }}>-1</code></div>
              </div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>4</b> {t(E, " ← N for case 4", " ← 케이스 4의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>2 1 1</b> {t(E, " ← 3 hints → answer ", " ← 힌트 3개 → 답 ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#15803d" }}>3 1 2 4</code></div>
              </div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>4</b> {t(E, " ← N for case 5", " ← 케이스 5의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>3 2 1</b> {t(E, " ← 3 hints → answer ", " ← 힌트 3개 → 답 ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#15803d" }}>1 2 3 4</code></div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — verify understanding of the dismantling rule
    {
      type: "quiz",
      narr: t(E,
        "The rule: compare the FIRST and LAST element. Bigger end loses (gets removed). The element NEXT to the loser is what we WRITE down.",
        "첫 원소와 마지막 원소를 비교해요.\n큰 쪽이 빠지고, 빠지는 원소 옆에 있는 값을 적어요."),
      question: t(E,
        "Suppose the current state is p = [2, 4, 5, 3]. What gets WRITTEN down in this step?",
        "지금 상태가 p = [2, 4, 5, 3] 이에요. 이 단계에서 적히는 값은?"),
      options: ["2", "4", "5", "3"],
      correct: 2,
      explain: t(E,
        "first=2, last=3. 2 < 3, so we remove the LAST (3). The element next to 3 is 5 (2nd-to-last). So we write 5.",
        "first=2, last=3 이에요. 2 < 3 이니까 마지막 3 을 빼요.\n3 옆에 있는 원소는 5 (끝에서 둘째) 예요. 그래서 5 를 적어요."),
    },
    // 1-4: Input — predict what happens next
    {
      type: "input",
      narr: t(E,
        "Continuing from p = [2, 4, 5, 3]: the previous step removes 3 and writes 5. The new state is [2, 4, 5]. Now run ONE more dismantling step.",
        "p = [2, 4, 5, 3] 에서 이어가요.\n앞 단계에서 3 을 빼고 5 를 적었어요.\n이제 [2, 4, 5] 가 남았어요. 한 단계 더 분해해 보세요."),
      question: t(E,
        "From [2, 4, 5], what value gets written next?",
        "[2, 4, 5] 에서 다음에 적히는 값은?"),
      hint: t(E,
        "Compare first=2 and last=5. Bigger end loses → remove last (5). The element next to 5 is 4 (2nd-to-last).",
        "first=2 와 last=5 를 비교해요. 큰 쪽인 마지막 5 를 빼요.\n5 옆에 있는 원소는 4 (끝에서 둘째) 예요."),
      answer: 4,
    },
    // 1-5: First natural attempt — brute force
    {
      type: "reveal",
      narr: t(E,
        "What's the simplest idea? Try every permutation of 1..N.",
        "가장 단순한 생각은 뭘까요?\n1..N 의 모든 순열을 다 해 보는 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            🐢 {t(E, "Idea 1: Try every permutation (brute force)", "아이디어 1: 모든 순열 다 해 보기 (브루트포스)")}
          </div>

          {/* Pseudocode — show what we actually need to write */}
          <div style={{ background: "#1f2937", color: "#e5e7eb", borderRadius: 10, padding: 12, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7, marginBottom: 8 }}>
            {/* import */}
            <div><span style={{ color: "#60a5fa" }}>from</span> itertools <span style={{ color: "#60a5fa" }}>import</span> permutations</div>
            <div style={{ height: 8 }} />
            {/* dismantle helper */}
            <div><span style={{ color: "#60a5fa" }}>def</span> <span style={{ color: "#fbbf24" }}>dismantle</span>(p):</div>
            <div style={{ marginLeft: 20 }}>p = list(p);  h = []</div>
            <div style={{ marginLeft: 20 }}><span style={{ color: "#60a5fa" }}>while</span> len(p) {">"} 1:</div>
            <div style={{ marginLeft: 40 }}><span style={{ color: "#60a5fa" }}>if</span> p[0] {">"} p[-1]: h.append(p[1]);  p.pop(0)</div>
            <div style={{ marginLeft: 40 }}><span style={{ color: "#60a5fa" }}>else</span>: h.append(p[-2]);  p.pop()</div>
            <div style={{ marginLeft: 20 }}><span style={{ color: "#60a5fa" }}>return</span> h</div>
            <div style={{ height: 8 }} />
            {/* main: try every perm in lex order */}
            <div><span style={{ color: "#60a5fa" }}>for</span> p <span style={{ color: "#60a5fa" }}>in</span> permutations(<span style={{ color: "#a78bfa" }}>range</span>(1, N+1)):</div>
            <div style={{ marginLeft: 20 }}><span style={{ color: "#60a5fa" }}>if</span> dismantle(p) == h:</div>
            <div style={{ marginLeft: 40 }}><span style={{ color: "#60a5fa" }}>print</span>(*p);  <span style={{ color: "#60a5fa" }}>break</span></div>
            <div><span style={{ color: "#60a5fa" }}>else</span>: <span style={{ color: "#60a5fa" }}>print</span>(-1)  <span style={{ color: "#9ca3af" }}># no perm matched</span></div>
          </div>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 12, fontStyle: "italic" }}>
            {t(E, "↳ We need both imports: permutations from itertools, and a dismantle() helper that runs Nhoj's process.",
                  "↳ 두 가지가 필요해요. 하나는 itertools 의 permutations 이고, 다른 하나는 Nhoj 과정을 돌리는 dismantle() 함수예요.")}
          </div>

          {/* Why it works */}
          <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>
              ✅ {t(E, "Why it works", "왜 정답이 되나")}
            </div>
            <div style={{ fontSize: 12, color: "#15803d", lineHeight: 1.6 }}>
              {t(E, "We literally check every possibility — if any permutation makes the right h, we'll find it. And ", "가능성을 하나도 빠짐없이 확인해요. 맞는 h 를 만드는 순열이 있다면 반드시 찾아요. 그리고 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>permutations()</code>
              {t(E, " gives them in LEX order, so the first match is the lex-smallest.",
                    " 가 사전순으로 돌려주니까, 처음 맞는 게 곧 사전순 최솟값이에요.")}
            </div>
          </div>

          {/* Test cases pass */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
              ✓ {t(E, "Sample test cases pass — for small N this is enough!",
                       "샘플 테스트 통과 — 작은 N 에서는 이걸로 충분해요!")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontSize: 11, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
              <div style={{ color: "#7c2d12" }}>N=2 → 2! = 2</div><div style={{ color: C.dim }}>{t(E, "instant", "즉시")}</div>
              <div style={{ color: "#7c2d12" }}>N=4 → 4! = 24</div><div style={{ color: C.dim }}>{t(E, "instant", "즉시")}</div>
              <div style={{ color: "#7c2d12" }}>N=8 → 8! = 40,320</div><div style={{ color: C.dim }}>{t(E, "fast (< 1s)", "빠름 (< 1초)")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-6: Why brute force fails for the actual constraints
    {
      type: "reveal",
      narr: t(E,
        "But the real constraint is N up to 10⁵ (100,000). N! grows so fast it doesn't even fit in the universe.",
        "그런데 실제 제약은 N 이 최대 10⁵(10만) 이에요.\nN! 은 너무 빨리 커져서 우주에도 못 담아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            🚨 {t(E, "Problem: N! explodes", "문제: N! 폭발")}
          </div>

          {/* Growth table */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: "8px 12px", fontSize: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 600, color: "#7f1d1d" }}>N</div>
              <div style={{ fontWeight: 600, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>N!</div>
              <div style={{ fontWeight: 600, color: "#7f1d1d" }}>{t(E, "Time @ 10⁸/s (100 million/sec)", "10⁸(1억)/초 기준 시간")}</div>

              {[
                { n: 4,    fac: "24",                       time: t(E, "instant", "즉시"), bad: false },
                { n: 8,    fac: "40,320",                   time: t(E, "instant", "즉시"), bad: false },
                { n: 12,   fac: "479M",                     time: t(E, "~5 sec",  "~5 초"), bad: false },
                { n: 15,   fac: "1.3 trillion",             time: t(E, "~3.5 hr", "~3.5 시간"), bad: true  },
                { n: 20,   fac: "2.4 × 10¹⁸",               time: t(E, "~770 yr", "~770 년"), bad: true  },
                { n: 100,  fac: "9.3 × 10¹⁵⁷",              time: t(E, "uh...", "어..."),    bad: true  },
                { n: 100000,fac: "10⁴⁵⁶⁵⁷⁴ (!)",            time: t(E, "🌌🪦", "🌌🪦"),       bad: true  },
              ].map((r, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: r.bad ? "#dc2626" : "#7f1d1d" }}>{r.n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", color: r.bad ? "#dc2626" : "#7f1d1d" }}>{r.fac}</div>
                  <div style={{ color: r.bad ? "#dc2626" : "#7f1d1d", fontWeight: r.bad ? 700 : 400 }}>{r.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What we need */}
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              💡 {t(E, "We need to be cleverer", "더 똑똑해져야 해요")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {/* ⚠️ 2026-09-18 — 여기 "다음 챕터에서 deque 로 거꾸로 만드는 법을 봐요" 라고
                  **없는 챕터를 약속하고** 있었다. Ch2·Ch3 은 끝까지 브루트포스뿐이다.
                  학생은 더 빠른 방법이 나온다고 믿고 넘어갔다가 안 나온다
                  (`memory/feedback_sentence_must_follow.md` — 가리키는 말이 화면에 있나).
                  ⚠️ 그리고 `components.jsx` 의 `PermSim`·`PermRunner` 는 **이미 만들어진
                     O(N) 그리디 풀이인데 어느 스텝에도 연결돼 있지 않다.** 죽은 코드다.
                     그걸 붙이는 건 글이 아니라 조립 + 재검증이라 `.claude/WORK.md` 에 올렸다.
                  지금은 **거짓 약속만 걷어낸다.** */}
              {t(E, "For N = 10⁵ we need O(N) or O(N log N). That's a HUGE jump from O(N! · N²).",
                    "N = 10⁵ 에서는 O(N) 이나 O(N log N) 가 필요해요. O(N! · N²) 에서 아주 크게 뛰어야 하죠.")}{" "}
              {t(E, "Next, let's code this brute-force idea itself — knowing where it breaks is the first step toward a faster one.",
                    "일단 다음 쪽에서 이 브루트포스 생각을 코드로 짜 봐요. 어디서 막히는지 알아야 더 빠른 방법으로 갈 수 있어요.")}
            </div>
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 시뮬레이션 — brute force search aligned with Ch1
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh2(E) {
  return [
    // 2-2.5: Interactive brute-force enumerator — walk all 24 perms in lex order
    {
      type: "reveal",
      narr: t(E,
        "Step through all 24 permutations of {1,2,3,4} and watch the first match light up.",
        "이제 직접 돌려 봐요.\n{1,2,3,4} 의 순열 24 개를 한 단계씩 dismantle 해요."),
      content: (<BruteForceEnumerator E={E} />),
    },
    // 2-3: Quiz on the brute force plan
    {
      type: "quiz",
      narr: t(E,
        "Why does iterating permutations in lex order give us the lex-smallest answer for free?",
        "순열을 사전순으로 해 보면 왜 자동으로 사전순 최소 답이 나올까요?"),
      question: t(E,
        "Why is the FIRST matching p automatically the lex-smallest valid p?",
        "처음 맞는 p 가 왜 자동으로 사전순 최소일까요?"),
      options: [
        t(E, "Because we try permutations in lex order — the first match is by definition the smallest.",
              "사전순으로 해 보니까, 처음 맞는 게 당연히 가장 작아요."),
        t(E, "Because dismantle gives unique results.", "dismantle 이 유일한 결과를 주니까."),
        t(E, "Because N is small.", "N 이 작으니까."),
      ],
      correct: 0,
      explain: t(E,
        "Lex-order iteration visits 1234 before 1243 before 1324 ... If we stop at the first p whose dismantle matches h, we've found the lex-smallest valid p.",
        "사전순이면 1234 → 1243 → 1324 ... 이런 순서로 가요.\ndismantle 결과가 h 와 맞는 첫 p 에서 멈추면,\n그게 사전순으로 가장 작은 p 예요."),
    },
    // 2-4: Input quiz
    {
      type: "input",
      narr: t(E,
        "N=2, h=[1]. Try both permutations of [1,2] and dismantle each.",
        "N=2, h=[1] 이에요.\n[1,2] 의 순열 두 개를 각각 dismantle 해 봐요."),
      question: t(E, "N=2, h=[1]. perm[0]=?", "N=2, h=[1]. perm[0]=?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh3(E, lang = "py") {
  return [
    // 3-1: Plan + complexity
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(N! · N) per test case — N! permutations, each costs O(N) to dismantle. Bronze typically uses small N for this kind of problem.",
        "테스트 하나에 걸리는 시간은 O(N! · N) 이에요.\n순열이 N! 개고, 하나를 dismantle 하는 데 O(N) 이 들어요.\nBronze 문제는 보통 N 이 작아요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ Next page: the code, section by section.", "↓ 다음 쪽에서 코드를 한 단락씩 봐요.")}
        </div>),

    },
    // 3-2: Quiz — when does -1 happen?
    {
      type: "quiz",
      narr: t(E,
        "We try every permutation in lex order, dismantle each, and stop at the first match. -1 is printed only when...",
        "모든 순열을 사전순으로 dismantle 해 봤는데\n맞는 게 하나도 없으면 -1 을 출력해요. 언제 그럴까요?"),
      question: t(E,
        "When does the brute force return -1?",
        "브루트포스가 -1 을 돌려주는 경우는 언제일까요?"),
      options: [
        t(E, "When no permutation produces the input h", "어떤 순열도 입력 h 를 만들지 못할 때"),
        t(E, "When h has a 0 in it", "h 에 0 이 있을 때"),
        t(E, "When N is too large", "N 이 너무 클 때"),
      ],
      correct: 0,
      explain: t(E,
        "Some hint lists are 'unreachable' — no permutation produces them under Nhoj's dismantle rule. We can only know after trying all N! permutations.",
        "어떤 힌트 리스트는 dismantle 규칙으로는 만들 수 없어요.\nN! 개를 다 돌려본 뒤에야 알 수 있어요."),
    },
    // 3-3: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read it part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드예요. 한 부분씩 읽어 봐요.\n위쪽에서 Python 과 C++ 을 바꿔 볼 수 있어요."),
      sections: getPermSections(E),
    },
  ];
}
