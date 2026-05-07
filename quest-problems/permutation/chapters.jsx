import { C, t } from "@/components/quest/theme";
import { getPermSections, DismantleSimulator } from "./components";

/* ================================================================
   SOLUTION CODE — Brute force.
   For each test case, run dismantle() on every permutation of
   1..N (in lex order, via recursion). The FIRST p whose dismantle
   matches h is automatically the lex-smallest answer. -1 if none.
   ================================================================ */
export const SOLUTION_CODE = [
  "def dismantle(p):",
  "    # Apply Nhoj's rule until 1 element remains; return the hint list.",
  "    p = list(p)",
  "    out = []",
  "    while len(p) > 1:",
  "        if p[0] > p[-1]:",
  "            out.append(p[1])     # write 2nd, remove 1st (bigger end)",
  "            p.pop(0)",
  "        else:",
  "            out.append(p[-2])    # write 2nd-to-last, remove last",
  "            p.pop()",
  "    return out",
  "",
  "def search(p, used, idx, N, h):",
  "    if idx == N:",
  "        if dismantle(p) == h:",
  "            print(' '.join(map(str, p)))",
  "            return True",
  "        return False",
  "    for v in range(1, N + 1):",
  "        if used[v]:",
  "            continue",
  "        p[idx] = v",
  "        used[v] = True",
  "        if search(p, used, idx + 1, N, h):",
  "            return True",
  "        used[v] = False",
  "    return False",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    p = [0] * N",
  "    used = [False] * (N + 1)",
  "    if not search(p, used, 0, N, h):",
  "        print(-1)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh1(E) {
  return [
    // 1-1: Title + the actual problem (dismantle version)
    {
      type: "reveal",
      narr: t(E,
        "Farmer John has a permutation p of 1..N. Farmer Nhoj 'dismantled' it by repeatedly removing one end and writing down its neighbor — leaving N−1 hints. From those hints, recover the lex-smallest p, or print -1 if Nhoj must have made a mistake.",
        "Farmer John 에게 1..N 의 순열 p 가 있어요. Farmer Nhoj 가 한 번에 한 쪽 끝을 빼면서 그 옆 값을 적는 방식으로 p 를 '분해' 했어요 — N−1 개의 힌트가 남아요. 그 힌트들로 사전순으로 가장 작은 p 를 복원하거나, Nhoj 가 실수했음이 분명하면 -1 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧩</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c5cfc" }}>Farmer John's Favorite Permutation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #3</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
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
                  {t(E, ", containing each integer 1..N exactly once.", " 가 있어요 (1..N 각 정수 정확히 한 번씩).")}
                </div>
              </div>
              {/* fact 2 — Nhoj's dismantle rule */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Farmer Nhoj ", "Farmer Nhoj 가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "dismantles p step by step", "p 를 한 단계씩 분해")}</b>
                  {t(E, ". While more than 1 element remains in p, he applies this rule and records one hint:",
                        ". p 에 원소가 1 개 초과로 남아있는 동안, 다음 규칙 적용 + 힌트 1 개 기록:")}
                  <div style={{ marginTop: 6, marginLeft: 6, fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
                    {t(E, "↳ if first element > last element: ", "↳ 첫 원소 > 마지막 원소 이면: ")}
                    <b style={{ color: "#dc2626" }}>{t(E, "write the 2nd element, remove the 1st", "2 번째 원소 적고 1 번째 제거")}</b><br/>
                    {t(E, "↳ otherwise: ", "↳ 그 외: ")}
                    <b style={{ color: "#7c3aed" }}>{t(E, "write the 2nd-to-last element, remove the last", "마지막에서 2 번째 원소 적고 마지막 제거")}</b>
                  </div>
                </div>
              </div>
              {/* fact 3 — N-1 hints total */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#9a3412", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "After N−1 steps, only 1 element is left and Nhoj has written ", "N−1 단계 후 원소 1 개 남고 Nhoj 가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N−1 hints h[0], h[1], …, h[N−2]", "N−1 개 힌트 h[0], h[1], …, h[N−2]")}</b>
                  {t(E, " in order — that's the input.", " 를 순서대로 적었어요 — 그게 입력.")}
                </div>
              </div>
              {/* fact 4 — your job */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Reconstruct the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest p consistent with the hints", "힌트와 일관된 사전순으로 가장 작은 p")}</b>
                  {t(E, ", or determine that no permutation fits (print ",
                        " 를 복원하거나, 어떤 순열도 안 맞으면 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 3, color: "#991b1b", fontWeight: 600 }}>-1</code>
                  {t(E, ").", " 출력.")}
                </div>
              </div>
            </div>

            {/* Permutation definition box */}
            <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #fdba74", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
              <b style={{ color: "#9a3412" }}>{t(E, "💬 What's a permutation?", "💬 순열이란?")}</b>{" "}
              {t(E, "A list using each number 1..N exactly once. e.g. for N=4: [3,1,4,2] is a permutation, [3,1,1,2] is not (1 used twice, 4 missing).",
                    "1부터 N 까지 각 숫자를 정확히 1번씩 쓰는 리스트. 예: N=4 → [3,1,4,2] 는 순열, [3,1,1,2] 는 순열 아님 (1 두 번, 4 빠짐).")}
            </div>

            {/* Lex order definition box */}
            <div style={{ marginTop: 6, background: "#fff", border: "1px dashed #fdba74", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
              <b style={{ color: "#9a3412" }}>{t(E, "💬 What's lexicographic (lex) order?", "💬 사전순(lex)이란?")}</b>{" "}
              {t(E, "Compare two lists position by position from left to right. The first position where they differ decides which is 'smaller'. e.g. [1,3,2] < [2,1,3] because position 0: 1 < 2.",
                    "두 리스트를 왼쪽부터 한 자리씩 비교. 처음 다른 자리가 어느 쪽이 더 '작은지' 결정. 예: [1,3,2] < [2,1,3] (자리 0: 1 < 2 이므로).")}
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
            <div style={{ fontSize: 14, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              ⚙️ {t(E, "Forward (what Nhoj did to John's permutation)", "정방향 (Nhoj 가 John 의 순열에 한 일)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fff", border: "2px solid #7c5cfc", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#7c5cfc", marginBottom: 4 }}>
                  🤠 {t(E, "John's secret p", "John 의 비밀 p")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>
                  [3, 1, 2, 4]
                </div>
              </div>
              <div style={{ fontSize: 18, color: "#dc2626", textAlign: "center", fontWeight: 700 }}>
                <div style={{ fontSize: 16, lineHeight: 1 }}>👹</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, marginTop: 2 }}>Nhoj</div>
              </div>
              <div style={{ background: "#fff", border: "2px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>
                  ✏️ {t(E, "hints Nhoj wrote", "Nhoj 가 적은 힌트")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#92400e" }}>
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
            <div style={{ fontSize: 14, fontWeight: 600, color: "#15803d", marginBottom: 8 }}>
              🎯 {t(E, "Your job (reverse — recover John's permutation)", "할 일 (역방향 — John 의 순열 복원)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>{t(E, "GIVEN", "받는 것")}</div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>h = [2, 1, 1]</div>
              </div>
              <div style={{ fontSize: 22, color: "#15803d", textAlign: "center", fontWeight: 700 }}>→</div>
              <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>

          {/* INPUT */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
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
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
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
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
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
            <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>
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
            <div style={{ fontSize: 12, fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            🚨 {t(E, "Problem: N! explodes", "문제: N! 폭발")}
          </div>

          {/* Growth table */}
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr", gap: "8px 12px", fontSize: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 600, color: "#7f1d1d" }}>N</div>
              <div style={{ fontWeight: 600, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>N!</div>
              <div style={{ fontWeight: 600, color: "#7f1d1d" }}>{t(E, "Time @ 10⁸/s", "10⁸/초 기준 시간")}</div>

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
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
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
   Chapter 2: 🔍 시뮬레이션 — brute force search aligned with Ch1
   ═══════════════════════════════════════════════════════════════ */
export function makePermCh2(E) {
  return [
    // 2-1: Brute force plan
    {
      type: "reveal",
      narr: t(E,
        "How do we recover p? The dismantle rule is hard to invert directly. Easiest idea: try every permutation of 1..N in lex order, dismantle each, and stop at the first match.",
        "p 를 어떻게 복원할까? dismantle 규칙을 거꾸로 푸는 건 까다로워요. 가장 쉬운 방법: 1..N 의 모든 순열을 사전순으로 시도, 각각 dismantle 해서 일치하는 첫 번째에서 멈추기."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Trace example with dismantle on small input
    {
      type: "reveal",
      narr: t(E,
        "Worked example: N=4, h=[2,1,1]. We try permutations of {1,2,3,4} in lex order, dismantle each, stop at first match. There are 4! = 24 permutations to try in the worst case.",
        "예시: N=4, h=[2,1,1]. {1,2,3,4} 순열을 사전순으로 시도, 각각 dismantle, 첫 매칭에서 멈춤. 최악의 경우 4! = 24 개."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: C.text, marginBottom: 10, lineHeight: 1.6 }}>
            {t(E, "First few attempts in lex order (most don't match):",
                  "사전순으로 처음 몇 개 (대부분 안 맞음):")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { p: "[1,2,3,4]", dis: "[3,2,1]", ok: false },
              { p: "[1,2,4,3]", dis: "[4,2,1]", ok: false },
              { p: "[1,3,2,4]", dis: "[2,3,1]", ok: false },
              { p: "[1,3,4,2]", dis: "[4,3,1]", ok: false },
              { p: "…", dis: "…", ok: false, ellipsis: true },
              { p: "[3,1,2,4]", dis: "[2,1,1]", ok: true },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.ok ? "#dcfce7" : "#fff",
                border: `1.5px solid ${s.ok ? "#16a34a" : C.border}`, borderRadius: 8, padding: "8px 12px",
                fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: s.ok ? "#15803d" : C.text,
                display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
              }}>
                <span style={{ fontWeight: 600 }}>p = {s.p}</span>
                <span>→ dismantle = {s.dis}</span>
                <span style={{ fontWeight: 700, color: s.ok ? "#16a34a" : "#9ca3af" }}>
                  {s.ok ? "✓ MATCH" : s.ellipsis ? "…" : "✗"}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            {t(E, "→ The first p in lex order with dismantle(p) == [2, 1, 1] is ", "→ dismantle = [2, 1, 1] 인 사전순 첫 p 는 ")}
            <b style={{ color: "#16a34a" }}>[3, 1, 2, 4]</b>
            {t(E, ". Output that.", " 그걸 출력.")}
          </div>
        </div>),
    },
    // 2-3: Quiz on the brute force plan
    {
      type: "quiz",
      narr: t(E,
        "Why does iterating permutations in lex order give us the lex-smallest answer for free?",
        "사전순으로 순열을 시도하면 왜 자동으로 사전순 최소 답이 나올까요?"),
      question: t(E,
        "Why is the FIRST matching p automatically the lex-smallest valid p?",
        "처음 일치하는 p 가 왜 자동으로 사전순 최소?"),
      options: [
        t(E, "Because we try permutations in lex order — the first match is by definition the smallest.",
              "사전순으로 시도하니까 — 처음 매칭이 정의상 가장 작은 것."),
        t(E, "Because dismantle gives unique results.", "dismantle 이 유일한 결과를 주니까."),
        t(E, "Because N is small.", "N 이 작으니까."),
      ],
      correct: 0,
      explain: t(E,
        "Lex-order iteration visits 1234 before 1243 before 1324 ... If we stop at the first p whose dismantle matches h, we've found the lex-smallest valid p.",
        "사전순으로 1234 → 1243 → 1324 ... 순서. dismantle 일치하는 첫 p 에서 멈추면, 그게 사전순 최소 유효 p."),
    },
    // 2-4: Input quiz
    {
      type: "input",
      narr: t(E,
        "Test it. N=2, h=[1]. The only 2 permutations of [1,2] are: [1,2] and [2,1]. Dismantle each.\n• [1,2]: 1<2 → write 1, drop 2 → h=[1] ✓\n• [2,1]: 2>1 → write 1, drop 2 → h=[1] ✓\nBoth match! The lex-smallest is [1,2]. So perm[0] = ?",
        "테스트. N=2, h=[1]. [1,2] 의 순열은 둘: [1,2] 와 [2,1]. 각각 dismantle:\n• [1,2]: 1<2 → 1 적고 2 제거 → h=[1] ✓\n• [2,1]: 2>1 → 1 적고 2 제거 → h=[1] ✓\n둘 다 일치! 사전순 최소는 [1,2]. perm[0] = ?"),
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
        "시간복잡도: 테스트당 O(N! · N) — N! 개 순열, 각각 dismantle O(N). Bronze 는 보통 작은 N."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 3-2: Quiz — when does -1 happen?
    {
      type: "quiz",
      narr: t(E,
        "We try every permutation in lex order, dismantle each, and stop at the first match. -1 is printed only when...",
        "사전순으로 모든 순열을 시도해 dismantle 했는데 일치하는 게 없으면 -1. 언제 그럴까?"),
      question: t(E,
        "When does the brute force return -1?",
        "브루트포스가 -1 을 반환하는 경우?"),
      options: [
        t(E, "When no permutation produces the input h", "어떤 순열도 입력 h 를 만들지 못할 때"),
        t(E, "When h has a 0 in it", "h 에 0 이 있을 때"),
        t(E, "When N is too large", "N 이 너무 클 때"),
      ],
      correct: 0,
      explain: t(E,
        "Some hint lists are 'unreachable' — no permutation produces them under Nhoj's dismantle rule. We can only know after trying all N! permutations.",
        "어떤 힌트 리스트는 dismantle 규칙으로 만들 수 없음 — N! 개 다 돌려본 후에야 알 수 있음."),
    },
    // 3-3: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read it part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getPermSections(E),
    },
  ];
}
