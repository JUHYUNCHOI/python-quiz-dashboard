import { C, t } from "@/components/quest/theme";
import { getPermSections, DismantleSimulator } from "./components";

/* ================================================================
   SOLUTION CODE — Brute force (correct but only for small N)
   The smart O(N) approach is built backward with a deque (Ch 2).
   ================================================================ */
export const SOLUTION_CODE = [
  "from itertools import permutations",
  "",
  "def dismantle(p):",
  "    '''Run Nhoj's dismantling on p, return the hint list h.'''",
  "    p = list(p)",
  "    h = []",
  "    while len(p) > 1:",
  "        if p[0] > p[-1]:",
  "            h.append(p[1])     # write 2nd, remove 1st (bigger end)",
  "            p.pop(0)",
  "        else:",
  "            h.append(p[-2])    # write 2nd-to-last, remove last",
  "            p.pop()",
  "    return h",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "",
  "    # Try every permutation in lex order — first match is lex-smallest",
  "    found = None",
  "    for p in permutations(range(1, N + 1)):",
  "        if dismantle(p) == h:",
  "            found = p",
  "            break",
  "",
  "    if found:",
  "        print(' '.join(map(str, found)))",
  "    else:",
  "        print(-1)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh1(E) {
  return [
    // 1-1: Title + the actual problem
    {
      type: "reveal",
      narr: t(E,
        "Farmer John has a permutation p of 1..N. Farmer Nhoj broke into the barn and disassembled it. To not be too cruel, he left hints. From those hints, reconstruct the lex-smallest p consistent with them, or report -1 if Nhoj must have made a mistake.",
        "Farmer John 에게 1..N 의 순열 p 가 있어요. Farmer Nhoj 가 헛간에 들어가서 그걸 분해했어요. 너무 잔인하지 않으려고 힌트를 남겼어요. 그 힌트들로 일관된 사전순으로 가장 작은 p 를 복원하거나, Nhoj 가 실수했음이 분명하면 -1 을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧩</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>Farmer John's Favorite Permutation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #3</div>
          </div>

          {/* Scenario — clean bulleted facts */}
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {/* fact 1 — John has p */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Farmer John has a ", "Farmer John 에게 ")}
                  <b style={{ color: "#9a3412" }}>{t(E, "permutation p of length N", "길이 N 의 순열 p")}</b>
                  {t(E, ", containing each integer 1..N exactly once.", " 가 있어요 (1부터 N 까지 각 정수가 정확히 한 번씩).")}
                </div>
              </div>
              {/* fact 2 — Nhoj broke in */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Farmer Nhoj ", "Farmer Nhoj 가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "broke into the barn and disassembled p", "헛간에 들어가서 p 를 분해")}</b>
                  {t(E, ". To not be too cruel, he left hints — at each step (while more than 1 element remains in p):",
                        "했어요. 너무 잔인하지 않으려고 힌트를 남겼어요 — 매 단계 (p 에 원소가 1 개 초과로 남아있는 동안):")}
                  <div style={{ marginTop: 6, marginLeft: 6, fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
                    {t(E, "↳ if p′₁ > p′ₙ: ", "↳ p′₁ > p′ₙ 이면: ")}
                    <b style={{ color: "#dc2626" }}>{t(E, "write p′₂, remove p′₁", "p′₂ 를 적고 p′₁ 제거")}</b><br/>
                    {t(E, "↳ otherwise: ", "↳ 그 외: ")}
                    <b style={{ color: "#7c3aed" }}>{t(E, "write p′ₙ₋₁, remove p′ₙ", "p′ₙ₋₁ 을 적고 p′ₙ 제거")}</b>
                  </div>
                </div>
              </div>
              {/* fact 3 — N-1 hints total */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "At the end, Nhoj will have written ", "끝에는 Nhoj 가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N−1 integers h₁, h₂, …, h_{N−1}", "N−1 개의 정수 h₁, h₂, …, h_{N−1}")}</b>
                  {t(E, ", in that order — that's the input.", " 을 그 순서대로 적어둬요 — 그게 입력이에요.")}
                </div>
              </div>
              {/* fact 4 — your job */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Reconstruct the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically minimum p consistent with the hints", "힌트와 일관된 사전순으로 가장 작은 p")}</b>
                  {t(E, ", or determine that Nhoj must have made a mistake (print ",
                        " 를 복원하거나, Nhoj 가 실수했음이 분명하면 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 3, color: "#991b1b", fontWeight: 800 }}>-1</code>
                  {t(E, ").", " 출력.")}
                </div>
              </div>
            </div>

            {/* Permutation definition box — separate so it doesn't break flow */}
            <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #fdba74", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
              <b style={{ color: "#9a3412" }}>{t(E, "💬 What's a “permutation”?", "💬 “순열”이란?")}</b>{" "}
              {t(E, "A list using each number 1..N exactly once. e.g. for N=4: [3,1,4,2] is a permutation, [3,1,1,2] is not (1 used twice, 4 missing).",
                    "1부터 N까지 각 숫자를 정확히 1번씩만 쓰는 리스트. 예: N=4 일 때 [3,1,4,2] 는 순열, [3,1,1,2] 는 순열 아님 (1 두 번, 4 빠짐).")}
            </div>
          </div>

        </div>),
    },
    // 1-1.5: Forward (Nhoj's process) + Your job (reverse) — split off so 1-1 isn't a wall
    {
      type: "reveal",
      narr: t(E,
        "Two directions: Nhoj went FORWARD (p → h). Your job goes BACKWARD (h → p).",
        "두 방향: Nhoj 는 정방향 (p → h). 우리 할 일은 역방향 (h → p)."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Forward direction summary */}
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
              ⚙️ {t(E, "Forward (what Nhoj did to John's permutation)", "정방향 (Nhoj 가 John 의 순열에 한 일)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fff", border: "2px solid #7c5cfc", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#7c5cfc", marginBottom: 4 }}>
                  🤠 {t(E, "John's secret p", "John 의 비밀 p")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>
                  [3, 1, 2, 4]
                </div>
              </div>
              <div style={{ fontSize: 18, color: "#dc2626", textAlign: "center", fontWeight: 900 }}>
                <div style={{ fontSize: 16, lineHeight: 1 }}>👹</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, marginTop: 2 }}>Nhoj</div>
              </div>
              <div style={{ background: "#fff", border: "2px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
                  ✏️ {t(E, "hints Nhoj wrote", "Nhoj 가 적은 힌트")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#92400e" }}>
                  h = [2, 1, 1]
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
              {t(E, "(Next page: hand-trace exactly how p turns into h, step by step.)",
                    "(다음 페이지: p 가 h 로 바뀌는 과정을 한 단계씩 손으로 따라가요.)")}
            </div>
          </div>

          {/* Your job — reverse direction */}
          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#15803d", marginBottom: 8 }}>
              🎯 {t(E, "Your job (reverse — recover John's permutation)", "할 일 (역방향 — John 의 순열 복원)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>{t(E, "GIVEN", "받는 것")}</div>
                <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>h = [2, 1, 1]</div>
              </div>
              <div style={{ fontSize: 22, color: "#15803d", textAlign: "center", fontWeight: 900 }}>→</div>
              <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#15803d", marginBottom: 4 }}>{t(E, "FIND John's p", "John 의 p 찾기")}</div>
                <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>[?, ?, ?, ?]</div>
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
        "Now hand-simulate Nhoj's process on p = [3, 1, 2, 4]. Press ▶ to walk through it one sub-step at a time — compare, then remove + write — and see how the array shrinks while the hint list grows.",
        "이제 Nhoj 의 과정을 p = [3, 1, 2, 4] 에서 손으로 따라가요. ▶ 눌러서 한 단계씩 — 비교하고, 빼고 적기 — 진행해 봐요. 배열이 줄어들면서 힌트가 늘어나는 걸 볼 수 있어요."),
      content: (<DismantleSimulator E={E} />),
    },
    // 1-1.5: Input / Output format
    {
      type: "reveal",
      narr: t(E,
        "Here's the sample input — the first line is T (number of test cases). Each test case is 2 lines: N, then the N−1 hints.\nFor each test case, print the permutation on one line, or −1 if impossible.",
        "샘플 입력 형식이에요 — 첫 줄은 T (테스트 케이스 수). 각 케이스는 2줄: N, 그 다음 N−1개의 힌트.\n각 케이스마다 순열을 한 줄로 출력 (불가능하면 −1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>

          {/* INPUT */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
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
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
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
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
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
                <div><b style={{ color: "#0891b2" }}>2</b> {t(E, " ← hints → no perm of [1, 2] has gap 2 → ", " ← 힌트 → [1, 2] 순열 중 차이 2인 게 없음 → ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#dc2626" }}>-1</code></div>
              </div>
              <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 6 }}>
                <div><b style={{ color: "#7c3aed" }}>4</b> {t(E, " ← N for case 3", " ← 케이스 3의 N")}</div>
                <div><b style={{ color: "#0891b2" }}>1 1 1</b> {t(E, " ← 3 hints → no valid perm → ", " ← 힌트 3개 → 유효 순열 없음 → ")}<code style={{ background: "#fff", padding: "1px 4px", borderRadius: 3, color: "#dc2626" }}>-1</code></div>
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
        "규칙: 첫 원소와 마지막 원소 비교. 큰 쪽이 제거. 제거되는 원소 옆 원소가 적혀요."),
      question: t(E,
        "Suppose the current state is p = [2, 4, 5, 3]. What gets WRITTEN down in this step?",
        "지금 상태가 p = [2, 4, 5, 3] 이에요. 이 단계에서 적히는 값은?"),
      options: ["2", "4", "5", "3"],
      correct: 2,
      explain: t(E,
        "first=2, last=3. 2 < 3, so we remove the LAST (3). The element next to 3 is 5 (2nd-to-last). So we write 5.",
        "first=2, last=3. 2 < 3 이므로 마지막 (3) 제거. 3 옆 원소는 5 (끝에서 둘째). 그래서 5 를 적어요."),
    },
    // 1-4: Input — predict what happens next
    {
      type: "input",
      narr: t(E,
        "Continuing from p = [2, 4, 5, 3]: the previous step removes 3 and writes 5. The new state is [2, 4, 5]. Now run ONE more dismantling step.",
        "p = [2, 4, 5, 3] 에서 이어가요: 이전 단계에서 3 제거하고 5 적었어요. 이제 [2, 4, 5] 상태. 한 단계 더 분해해 보세요."),
      question: t(E,
        "From [2, 4, 5], what value gets written next?",
        "[2, 4, 5] 에서 다음에 적히는 값은?"),
      hint: t(E,
        "Compare first=2 and last=5. Bigger end loses → remove last (5). The element next to 5 is 4 (2nd-to-last).",
        "first=2, last=5 비교. 큰 쪽 제거 → 마지막 (5) 제거. 5 옆 원소는 4 (끝에서 둘째)."),
      answer: 4,
    },
    // 1-5: First natural attempt — brute force
    {
      type: "reveal",
      narr: t(E,
        "What's the most direct idea? Try EVERY permutation of 1..N — for each one, simulate Nhoj's process and check if it produces our h. Iterate in lex order so the first match is automatically the smallest.",
        "가장 직접적인 아이디어는? 1..N 의 모든 순열을 다 시도 — 각 순열마다 Nhoj 과정을 돌려서 우리 h 가 나오는지 확인. 사전순으로 돌면 처음 일치하는 게 자동으로 가장 작은 것."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            🐢 {t(E, "Idea 1: Try every permutation (brute force)", "아이디어 1: 모든 순열 다 시도 (브루트포스)")}
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
                  "↳ 두 가지가 필요해요: itertools 의 permutations 임포트 + Nhoj 과정을 돌리는 dismantle() 함수.")}
          </div>

          {/* Why it works */}
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 4 }}>
              ✅ {t(E, "Why it works", "왜 정답이 되나")}
            </div>
            <div style={{ fontSize: 12, color: "#15803d", lineHeight: 1.6 }}>
              {t(E, "We literally check every possibility — if any permutation makes the right h, we'll find it. And ", "가능성을 모두 직접 확인 — 맞는 h 를 만드는 순열이 있다면 반드시 찾아요. 그리고 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>permutations()</code>
              {t(E, " gives them in LEX order, so the first match is the lex-smallest.",
                    " 가 사전순으로 돌려주니까 처음 일치 = 사전순 최솟값.")}
            </div>
          </div>

          {/* Test cases pass */}
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", marginBottom: 6 }}>
              ✓ {t(E, "Sample test cases pass — for small N this is enough!",
                       "샘플 테스트 통과 — 작은 N 에서는 이걸로 충분!")}
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
        "But the real constraint is N up to 10⁵. N! grows so fast it doesn't even fit in the universe.",
        "근데 실제 제약은 N 최대 10⁵. N! 은 너무 빨리 커져서 우주에도 못 담아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            🚨 {t(E, "Problem: N! explodes", "문제: N! 폭발")}
          </div>

          {/* Growth table */}
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: "8px 12px", fontSize: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 800, color: "#7f1d1d" }}>N</div>
              <div style={{ fontWeight: 800, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>N!</div>
              <div style={{ fontWeight: 800, color: "#7f1d1d" }}>{t(E, "Time @ 10⁸/s", "10⁸/초 기준 시간")}</div>

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
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: r.bad ? "#dc2626" : "#7f1d1d" }}>{r.n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", color: r.bad ? "#dc2626" : "#7f1d1d" }}>{r.fac}</div>
                  <div style={{ color: r.bad ? "#dc2626" : "#7f1d1d", fontWeight: r.bad ? 700 : 400 }}>{r.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What we need */}
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              💡 {t(E, "We need to be cleverer", "더 똑똑해져야 함")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "For N = 10⁵ we need O(N) or O(N log N). That's a HUGE jump from O(N! · N²). The next chapter shows how to think ",
                    "N = 10⁵ 에서는 O(N) 또는 O(N log N) 가 필요해요. O(N! · N²) 에서 거대한 점프죠. 다음 챕터에서 ")}
              <b style={{ color: "#7c3aed" }}>{t(E, "BACKWARDS from the hints", "힌트로부터 거꾸로 생각")}</b>
              {t(E, " (using a deque) — building the permutation in reverse is the key insight.",
                    " 하는 방법을 봐요 (deque 사용) — 거꾸로 만드는 게 핵심 발상이에요.")}
            </div>
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 시뮬레이션
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh2(E) {
  return [
    // 2-1: From the formula → 2 choices → greedy idea
    {
      type: "reveal",
      narr: t(E,
        "Where does the algorithm come from? Start from the formula.",
        "공식부터 출발하면 알고리즘이 자연스럽게 나와요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Step A: the given formula */}
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "1️⃣  What we're given", "1️⃣  주어진 것")}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#5b21b6", textAlign: "center" }}>
              h[i] = abs(perm[i] − perm[i+1])
            </div>
          </div>

          {/* Step B: rearrange to find perm[i+1] */}
          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
              {t(E, "2️⃣  Rearrange — only 2 possible values for perm[i+1]", "2️⃣  변형 — perm[i+1]의 가능값은 단 2개")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginTop: 6 }}>
              <div style={{ padding: "6px 12px", borderRadius: 8, background: "#dcfce7", border: "1.5px solid #16a34a", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#15803d" }}>
                perm[i] + h[i]
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d" }}>{t(E, "OR", "또는")}</div>
              <div style={{ padding: "6px 12px", borderRadius: 8, background: "#dcfce7", border: "1.5px solid #16a34a", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#15803d" }}>
                perm[i] − h[i]
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#15803d", textAlign: "center", marginTop: 6 }}>
              {t(E, "(because abs removes the sign)", "(abs가 부호를 지우니까)")}
            </div>
          </div>

          {/* Step C: pick start, then greedy chain */}
          <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
              {t(E, "3️⃣  But what's perm[0]? Try every value 1..N", "3️⃣  근데 perm[0]은? 1부터 N까지 다 시도")}
            </div>
            <div style={{ fontSize: 12, color: "#7c2d12", lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "For each start in 1..N:\n  • set perm[0] = start\n  • for each step, try + first, then − (whichever is in [1, N] and unused)\n  • if both fail, give up on this start and try the next",
                "각 시작값 1..N에 대해:\n  • perm[0] = start로 설정\n  • 단계마다 +를 먼저 시도, 안 되면 − ([1, N] 안이고 미사용인 것)\n  • 둘 다 실패하면 이 시작값 포기, 다음 시도")}
            </div>
          </div>

          {/* Why this is natural */}
          <div style={{ background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 4 }}>
              {t(E, "💡 Why is this natural?", "💡 왜 자연스러울까?")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "Once you fix perm[0], the rest is forced (only ± each step). So we only need to guess perm[0] — N choices.",
                "perm[0]을 정하면 나머지는 강제 (매 단계 ±뿐). 그래서 perm[0]만 추측하면 됨 — N가지.")}
            </div>
          </div>
        </div>),
    },
    // 2-2: Interactive sim
    {
      type: "sim",
      narr: t(E,
        "Try it!\nN=4, h=[2,3,2].\nPick a starting value below and step through the greedy.\nNotice that some starts fail and some succeed.", "직접 해봐요! N=4, h=[2,3,2]. 아래에서 시작값을 골라 그리디를 한 단계씩 따라가봐요. 어떤 시작값은 실패하고 어떤 건 성공해요."),
    },
    // 2-3: Static trace example
    {
      type: "reveal",
      narr: t(E,
        "Recap: with start=3, the trace is 3→1→4→2 = [3,1,4,2] ✅.\nWith start=1, we get stuck at step 2.\nWith start=4, we get stuck at step 3.", "정리: 시작값=3이면 3→1→4→2 = [3,1,4,2] ✅. 시작값=1은 2단계에서 막히고, 시작값=4는 3단계에서 막혀."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { step: "Start", val: 3, used: [3] },
              { step: "h[0]=2", val: 1, try1: "3+2=5 ✗", try2: "3-2=1 ✓", used: [3,1] },
              { step: "h[1]=3", val: 4, try1: "1+3=4 ✓", used: [3,1,4] },
              { step: "h[2]=2", val: 2, try1: "4+2=6 ✗", try2: "4-2=2 ✓", used: [3,1,4,2] },
            ].map((s, i) => (
              <div key={i} style={{
                background: i === 0 ? C.accentBg : "#fff",
                border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px",
                fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span style={{ fontWeight: 800, color: C.accent }}>{s.step}</span>
                {s.try1 && <span style={{ color: s.try1.includes("✓") ? C.ok : C.no, marginLeft: 8 }}>{s.try1}</span>}
                {s.try2 && <span style={{ color: s.try2.includes("✓") ? C.ok : C.no, marginLeft: 8 }}>{s.try2}</span>}
                <span style={{ color: C.dim, marginLeft: 8 }}>→ [{s.used.join(",")}]</span>
              </div>
            ))}
          </div>
        </div>),
    },
    // 2-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "What happens when BOTH perm[i]+h[i] and perm[i]-h[i] are invalid (out of range or already used)?", "perm[i]+h[i]와 perm[i]-h[i] 둘 다 유효하지 않으면 (범위 밖이거나 이미 사용)?"),
      question: t(E,
        "If both options fail at some step, what should we do?",
        "어떤 단계에서 두 옵션 모두 실패하면?"),
      options: [
        t(E, "Try next starting value", "다음 시작값 시도"),
        t(E, "Output -1 immediately", "즉시 -1 출력"),
        t(E, "Swap previous elements", "이전 원소를 교환"),
        t(E, "Skip this step", "이 단계를 건너뜀"),
      ],
      correct: 0,
      explain: t(E,
        "This starting value doesn't work. Move on to the next one. Only output -1 if ALL starting values fail!",
        "이 시작값이 안 되는 거예요. 다음 시작값으로! 모든 시작값이 실패할 때만 -1!"),
    },
    // 2-4: Input
    {
      type: "input",
      narr: t(E,
        "N=3, h=[1,1]. Try start=1: 1→1+1=2→2+1=3. Result: [1,2,3]. What is perm[2]?", "N=3, h=[1,1]. 시작=1: 1→1+1=2→2+1=3. 결과: [1,2,3]. perm[2]는?"),
      question: t(E, "N=3, h=[1,1], start=1. perm[2]=?", "N=3, h=[1,1], 시작=1. perm[2]=?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh3(E, lang = "py") {
  return [
    // 3-1: Complexity
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(N²) per test case — we try N starting values, each taking O(N).\nSince N ≤ 1000, this is fast enough!", "시간복잡도: 테스트 케이스당 O(N²) — N개의 시작값을 시도하고, 각각 O(N). N ≤ 1000이니 충분히 빨라요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Try each start", "시작값 차례로 시도"), code: "for start in range(1, N+1):", color: "#7c5cfc" },
              { n: 2, label: t(E, "Greedy + or \u2212", "그리디 + 또는 \u2212"), code: "if perm[i] + h[i] valid: pick;  elif perm[i] \u2212 h[i] valid: pick;  else: fail", color: "#0891b2" },
              { n: 3, label: t(E, "Output if found", "성공하면 출력"), code: "if valid: print(perm);  break", color: "#16a34a" },
              { n: 4, label: t(E, "All starts fail \u2192 -1", "모두 실패 \u2192 -1"), code: "if no start works: print(-1)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "\u23f1 Complexity", "\u23f1 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>O(N\u00b2)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N starts \u00d7 N steps each", "N개 시작 \u00d7 각 N단계")}</div>
          </div>
        </div>),
    },
    // 3-2: Quiz on edge case
    {
      type: "quiz",
      narr: t(E,
        "When h[i] = 0, perm[i+1] must equal perm[i].\nBut in a permutation, all values are distinct!\nSo h[i]=0 means...", "h[i] = 0이면, perm[i+1] = perm[i]이어야 해요. 그런데 순열에선 모든 값이 다르잖아요! h[i]=0이면..."),
      question: t(E,
        "If h[i] = 0 for some i, what can we conclude?",
        "어떤 i에서 h[i] = 0이면?"),
      options: [
        t(E, "Impossible! Output -1", "불가능! -1 출력"),
        t(E, "perm[i] = perm[i+1] = 0", "perm[i] = perm[i+1] = 0"),
        t(E, "Skip to next element", "다음 원소로 건너뜀"),
      ],
      correct: 0,
      explain: t(E,
        "h[i]=0 means abs(perm[i]-perm[i+1])=0, so they're equal. But permutations have all distinct values — contradiction!",
        "h[i]=0이면 abs(perm[i]-perm[i+1])=0, 같은 값. 하지만 순열은 모든 값이 달라 — 모순!"),
    },
    // 3-3: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read it part by part. Toggle Python ↔ C++ in header, save as PDF.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글, PDF 저장 가능."),
      sections: getPermSections(E),
    },
    // 3-4: Live runner
    {
      type: "runner",
      narr: t(E,
        "Now run it yourself. Enter N and h, watch the greedy try each start. Stop anytime.", "이제 직접 돌려봐요. N과 h 입력하고, 그리디가 시작값을 하나씩 시도하는 걸 봐요. 언제든 중지 가능."),
    },
  ];
}
