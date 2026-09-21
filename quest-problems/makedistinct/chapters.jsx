import { C, t } from "@/components/quest/theme";
import { getMakeDistinctSections, getMakeDistinctWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CodeBlock } from "@/components/quest/shared";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMakeDistinctCh1 (6 steps: reveal / reveal / reveal / quiz / input / reveal)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh1(E, codeLang = "py") {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Numbers, and one move: add K. Make them all different.",
        "수들에 K 를 더해서 전부 다르게 만드는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔢"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Make All Distinct</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "Some numbers are given, and one number K.\nWe may pick any number and add K to it, as many times as we like.\nMake them all different — and do it in as few adds as possible. Print that count.",
                "수가 몇 개 있고, 더할 수 K 가 하나 주어져요.\n우리는 아무 수나 골라서 K 를 더할 수 있어요. 몇 번이든요.\n모든 수가 서로 달라지게 만들되, 더한 횟수가 가장 적어야 해요. 그 횟수를 구해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#2563eb" }}>{t(E, "N numbers", "수 N 개가")}</b>
                  {t(E, " are given, and one more number ", " 주어져요. 그리고 더할 때 쓸 수 ")}
                  <b style={{ color: "#2563eb" }}>K</b>
                  {t(E, " to add with. K may be negative, but it is never 0.",
                       " 도 하나 주어져요. K 는 음수여도 되지만 0 은 아니에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move — pick one number and ", "한 번에 수 하나를 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "add K to it", "K 를 더해요")}</b>
                  {t(E, ". You may pick the same number again and again.", ". 같은 수를 여러 번 골라도 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "When you stop, ", "다 하고 나면 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "no two numbers may be the same", "같은 수가 하나도 없어야 해요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the fewest moves that does it", "그렇게 만드는 가장 적은 횟수를")}</b>
                  {t(E, ".", " 출력해요.")}
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
        "One sample — 4 numbers with K = 1. The answer is 2.",
        "샘플 하나예요. 수 네 개에 K = 1. 답은 2 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`1
4 1
4 1 4 1`}</pre>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #86efac", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`2`}</pre>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>The four numbers are 4, 1, 4, 1 and K = 1.<br />The two 4s are the same, and so are the two 1s.<br />Why the answer is 2 — that's the next page.</>,
              <>수 네 개는 4, 1, 4, 1 이고 K = 1 이에요.<br />4 가 두 개로 겹치고, 1 도 두 개로 겹쳐요.<br />답이 왜 2 인지는 다음 쪽에서 봐요.</>)}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim }}>
            {t(E, "First line is T (number of test cases).", "첫 줄 T 는 테스트케이스 개수.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 200,000 (= 2 × 10⁵)</div>
              <div>−N ≤ K ≤ N,  K ≠ 0</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each number is between 1 and N  ·  all N added together ≤ 1,000,000", "수는 1 부터 N 사이  ·  N 을 다 더해도 1,000,000 이하")}</div>
            </div>
          </div>
        </div>
      ),
    },

    // 1-3: Worked example with residues
    {
      type: "reveal",
      narr: t(E,
        "The sample again — [4, 1, 4, 1] with K = 1, smallest first.",
        "앞 쪽 샘플 그대로예요. [4, 1, 4, 1] 에 K = 1. 작은 수부터 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🔬 {t(E, "Walk through it", "직접 따라가요")}
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            <div><b>{t(E, "Step 1.", "1.")}</b> {t(E, "Line them up from the smallest: ", "작은 수부터 줄 세워요: ")}<code style={{ color: "#2563eb" }}>[1, 1, 4, 4]</code></div>
            <div><b>{t(E, "Step 2.", "2.")}</b> {t(E, "The first one stays where it is: ", "첫 값은 그 자리에 그대로 놓아요: ")} <code>1</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 3.", "3.")}</b> {t(E, "Next is 1, not past 1, so push it to ", "다음이 1, 방금 놓은 1 을 넘지 못하니 밀어요 → ")}<code>2</code> ({t(E, "1 op", "1 회")})</div>
            <div><b>{t(E, "Step 4.", "4.")}</b> {t(E, "Next is 4, already past 2, so keep it: ", "다음 4 는 방금 놓은 2 를 이미 넘었으니 그대로: ")}<code>4</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 5.", "5.")}</b> {t(E, "Next is 4, not past 4, so push it to ", "다음 4 는 방금 놓은 4 를 넘지 못하니 밀어요 → ")}<code>5</code> ({t(E, "1 op", "1 회")})</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Total: 0 + 1 + 0 + 1 = 2 moves — that is the sample answer.", "합계: 0 + 1 + 0 + 1 = 2 회 — 앞 쪽 샘플의 답이 이거예요.")}</b>
            </div>
          </div>

          {/* 2026-09-21: 샘플을 `[4,1,4,4,1]` 로 **바꿔치웠다가** 앞 쪽의
              "답이 왜 2 인지는 다음 쪽에서 봐요" 가 거짓말이 됐다.
              선생님: *"뭔말인지 모르겠는데. 읽는게 넘 힘든데?"*
              샘플은 그대로 두고, 한 칸 더 붙인 경우를 **따로** 보여준다 —
              학생이 코드의 `(cur - vals[i]) // k` 나눗셈에서 멈춘 자리다. */}
          <div style={{ marginTop: 10, background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: "#92400e", lineHeight: 1.65, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>🤔 What if there were <b>one more 4</b>? Then [1, 1, 4, 4, <b>4</b>].<br />1 and 2 and 4 and 5 are all taken, so the last 4 has to go to <b>6</b> — pushing it once only reaches 5, so it takes <b>2 moves at once</b>. Total 4.<br />That is the case the code counts with a division.</>,
              <>🤔 4 가 <b>하나 더</b> 있었다면? [1, 1, 4, 4, <b>4</b>] 가 돼요.<br />1 도 2 도 4 도 5 도 이미 찼으니 마지막 4 는 <b>6</b> 까지 가야 해요 — 한 칸 밀면 5 라 아직 겹쳐서 <b>한 걸음에 2 회</b>예요. 합계는 4 회고요.<br />코드가 나눗셈으로 세는 게 바로 이 경우예요.</>)}
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.dim, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>💡 Each value either stays, or moves just past the one before it.<br />Why start from the smallest? If you moved a bigger one first, the smaller one would still have to climb over it later — the same work, or more.</>,
              <>💡 각 값은 그대로 두거나, 바로 앞에 놓은 값을 막 넘을 만큼만 밀려요.<br />왜 작은 것부터 할까요? 큰 것을 먼저 옮겨 두면 작은 것이 나중에 그 위를 또 넘어야 해서, 일이 같거나 더 늘어나기 때문이에요.</>)}
          </div>
        </div>
      ),
    },

    // 1-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Now K = 2. Which numbers can ever collide?",
        "이번엔 K = 2 예요. 어떤 수끼리 부딪힐 수 있을까요?"),
      question: t(E,
        "a = [5, 3, 5, 4], K = 2. Which numbers can ever land on each other?",
        "a = [5, 3, 5, 4], K = 2. 어떤 수끼리 같은 값이 될 수 있을까요?"),
      options: [
        t(E, "Only 5, 3, 5 — the 4 is on its own", "5, 3, 5 끼리만. 4 는 혼자예요"),
        t(E, "4 and 5 can meet too", "4 와 5 도 만날 수 있어요"),
        t(E, "All four can meet each other", "네 수 모두 서로 만날 수 있어요"),
      ],
      correct: 0,
      explain: t(E,
        "Right.\nAdding 2 keeps odd numbers odd and even numbers even, so 4 can never become 5, 3 or 5.\nSame remainder when divided by 2 = they can meet. Different remainder = they never can.\nSo we split the numbers by that remainder and solve each pile on its own.",
        "맞아요.\n2 를 더하면 홀수는 계속 홀수, 짝수는 계속 짝수예요. 그래서 4 는 5·3·5 가 될 수 없어요.\n2 로 나눈 나머지가 같으면 만날 수 있고, 나머지가 다르면 영영 못 만나요.\n그래서 나머지끼리 따로 묶어서, 묶음마다 따로 풀면 돼요."),
    },

    // 1-5: Input — direction-only hint
    {
      type: "input",
      narr: t(E,
        "Now K is negative. Work it out yourself.",
        "이번엔 K 가 음수예요. 직접 풀어봐요."),
      question: t(E,
        "a = [3, 3, 4, 4], K = -2. Minimum ops?",
        "a = [3, 3, 4, 4], K = -2. 최소 횟수는?"),
      hint: t(E,
        "K is negative — which way does a push move a value? And which of these four can ever meet?",
        "K 가 음수면 밀 때 값이 어느 쪽으로 갈까요? 그리고 이 넷 중 어떤 수끼리 만날 수 있을까요?"),
      answer: 2,
      /* 2026-09-21: 맞혀도 ✅ 만 뜨고 **왜 2 인지**가 없었다 (재검증 학생 지적).
         `NumInput` 에 explain 을 새로 달아 이 자리부터 쓴다. */
      explain: t(E,
        "2 is right.\nK = -2, so each push lowers a value by 2 — and a value keeps its remainder when divided by 2.\nSo the two 3s are one pile and the two 4s are another; the piles never meet.\nIn each pile the second one has to move down once: 3 → 1 and 4 → 2. One push each, 2 in total.",
        "2 가 맞아요.\nK = -2 라서 밀면 값이 2 씩 작아져요. 2 로 나눈 나머지는 그대로예요.\n그래서 3 두 개가 한 묶음, 4 두 개가 다른 묶음이고 서로 만나지 않아요.\n묶음마다 두 번째 값만 한 번씩 내려가면 돼요 — 3 → 1, 4 → 2. 합해서 2 회예요."),
    },

    /* 1-6: 쉬운 첫 코드와 그 한계 (2026-09-21 추가)
       왜 생겼나 — 교육 검토: **[기][승][전] 다음이 바로 최종 코드**여서
       "쉬운 방법 → 왜 안 되나 → 그래서 이 방법" 사다리의 첫 칸이 비어 있었다.
       project-lead 가 실측해서 판정했다 — 브루트는 **답은 맞고**(무작위 3000 케이스
       최적해와 전부 일치) **느리다**(파이썬 N=10,000 에 2.3초, 깨끗한 O(N²)).
       그래서 한 쪽만 넣는다. `feedback_why_and_how_over_slowness.md` 처방대로
       느림을 체감시키는 데 쪽을 쓰지 않고 **제약 숫자 + 연산량 한 줄**로 끝낸다. */
    {
      type: "reveal",
      narr: t(E,
        "What if we just push whenever two values collide?",
        "겹칠 때마다 그 자리에서 바로 밀면 안 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🐣 {t(E, "The first idea — just push on collision", "제일 먼저 떠오르는 방법 — 겹치면 바로 밀기")}
          </div>

          <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7, marginBottom: 8, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Keep the values we have already placed. For each new value, push it by K until it lands somewhere free.",
              "이미 놓은 값들을 들고 있다가, 새 값이 겹치면 빈 자리를 만날 때까지 K 씩 밀어요.")}
          </div>

          <CodeBlock lang={codeLang} isEn={E} lines={codeLang === "cpp" ? [
            "vector<long long> used;   // 이미 놓인 값들",
            "long long total = 0;",
            "",
            "for (long long x : a) {",
            "    while (find(used.begin(), used.end(), x) != used.end()) {",
            "        x += k;           // 한 번 밀고 다시 본다",
            "        total++;",
            "    }",
            "    used.push_back(x);",
            "}",
            "",
            "cout << total << \"\\n\";",
          ] : [
            "used = []          # 이미 놓인 값들",
            "total = 0",
            "",
            "for x in a:",
            "    while x in used:   # 겹치면",
            "        x += k         # 한 번 밀고 다시 본다",
            "        total += 1",
            "    used.append(x)",
            "",
            "print(total)",
          ]} />

          <div style={{ marginTop: 10, background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            <b>{t(E, "It gives the right answer — but it is too slow.", "답은 맞아요. 그런데 너무 느려요.")}</b><br />
            {t(E,
              "N can be 200,000. One value may be pushed almost N times, and each push looks through everything placed so far — that is about 200,000 × 200,000 = 40,000,000,000 steps.",
              "N 이 200,000 까지예요. 값 하나가 거의 N 번 밀릴 수 있고, 밀 때마다 지금까지 놓은 값을 전부 훑어요. 200,000 × 200,000 = 400억 번쯤 돼요.")}<br />
            {/* "몇 분" 이었다 → 실측값으로. project-lead 가 N=200,000·K=1 을 끝까지 돌렸다: 1179초. */}
            {t(E, "We actually ran it at N = 200,000 — it took about 20 minutes. The contest gives seconds.",
                  "실제로 N = 200,000 으로 돌려봤어요. 약 20분이 걸렸어요. 대회가 주는 시간은 몇 초예요.")}
          </div>

          <div style={{ marginTop: 10, background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#065f46", lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            👉 {t(E,
              "We already know something this code does not use: values only collide when they share the same remainder. Split them by that remainder first, and each pile becomes small and easy. That is the next code.",
              "우리는 이 코드가 안 쓰는 걸 하나 알고 있어요 — 나머지가 같은 값끼리만 부딪힌다는 것. 나머지로 먼저 나눠 두면 묶음마다 작아져요. 다음 코드가 그거예요.")}
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMakeDistinctCh2 (1 step: progressive)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh2(E, lang = "py") {
  return [
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getMakeDistinctWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Group by residue, sort, greedy-push.  Each part lights up with a bubble — read them in order.",
          "나머지로 묶고, 정렬하고, 앞에서부터 하나씩 밀어요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />),
      };
    })(),
  ];
}
