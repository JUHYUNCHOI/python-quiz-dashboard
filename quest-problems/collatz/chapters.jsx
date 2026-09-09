import { C, t } from "@/components/quest/theme";
import { getCollatzWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CollatzStepSim } from "./sims";

const A = "#059669";

/* 샘플 입출력 — mooin3 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function CollatzSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`5 1
1 2 3 4 5`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`33`}
          </div>
        </div>
      </div>

      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>5 1</code> — {t(E, "n = 5 numbers, k = 1 repeat", "n = 5 (개수), k = 1 (반복 횟수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2 3 4 5</code> — {t(E, "the list of numbers", "숫자 리스트")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #6ee7b7" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>33</code>{t(E, " = the sum of the list after k passes.", " = 한 바퀴를 k번 돈 뒤 리스트의 합.")}
        </div>
      </div>

      {/* 2026-09-09: 여기에 [1 2 3 4 5] → [4 1 10 2 16] → 합 33 전개가 통째로 있었다.
          그런데 **바로 다음 쪽**의 시뮬이 정확히 같은 리스트를 같은 결과로,
          원소 하나씩 7단계에 걸쳐 다시 보여준다. 학생은 답을 이미 본 뒤라
          ◀▶ 를 여섯 번 누르는 게 발견이 아니라 아는 걸 다시 읽는 일이 된다.
          전개는 3쪽 몫으로 미루고 여기는 질문으로 닫는다.
          원문 PDF 의 공식 설명을 지운 게 아니라 자리를 옮긴 것이다. */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #6ee7b7", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 12, color: "#065f46", textAlign: "center", wordBreak: "keep-all", whiteSpace: "pre-line", lineHeight: 1.75 }}>
          {t(E, "One pass (k = 1): even /2, odd *3+1.\nSo what does [1 2 3 4 5] turn into, and why 33?\nThe next page walks it one number at a time.",
                "한 바퀴(k = 1): 짝수 ÷2, 홀수 ×3+1.\n그러면 [1 2 3 4 5] 는 무엇이 되고, 왜 합이 33 일까요?\n다음 쪽에서 숫자 하나씩 따라가봐요.")}
        </div>
      </div>

      {/* 2026-09-09: 두 번째 공식 샘플이 각주 한 줄("다른 샘플: 6 3 / … → 33")로만 있었다.
          이건 원문의 유일한 k>1 예제이고, "Collatz 니까 1이 될 때까지 도는 것 아니냐" 는
          오해를 정면으로 깨는 도구다 — 세 바퀴를 돌아도 숫자가 1에 머물지 않는다.
          각주로 두면 아무도 안 본다. 원문 PDF 의 3단계 트레이스를 그대로 올린다.
          숫자는 직접 계산해 대조했다: 합이 64 → 32 → 33 으로 간다. */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#334155", marginBottom: 7, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
          {t(E, "The other official sample: 6 3 / 3 1 4 1 5 9 — three passes, not 'until it reaches 1'",
                "다른 공식 샘플: 6 3 / 3 1 4 1 5 9 — 세 바퀴예요. '1이 될 때까지' 가 아니에요")}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.95, textAlign: "center", color: "#475569" }}>
          <div>[3 1 4 1 5 9]</div>
          <div style={{ color: A }}>↓ {t(E, "pass 1", "1바퀴")}</div>
          <div>[10 4 2 4 16 28]</div>
          <div style={{ color: A }}>↓ {t(E, "pass 2", "2바퀴")}</div>
          <div>[5 2 1 2 8 14]</div>
          <div style={{ color: A }}>↓ {t(E, "pass 3", "3바퀴")}</div>
          <div style={{ color: "#15803d", fontWeight: 700 }}>[16 1 4 1 4 7] → {t(E, "sum 33", "합 33")}</div>
        </div>
        <div style={{ marginTop: 7, fontSize: 11, color: "#64748b", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.65 }}>
          {t(E, "Watch the 1s: they become 4, then 2, then 1 again. They never stop and wait.",
                "1 을 눈여겨봐요 — 4 가 됐다가 2 가 됐다가 다시 1 이에요. 멈춰서 기다리지 않아요.")}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: n, k ≤ 1000 · each aᵢ ≤ 10⁴.",
             "📌 제약: n, k ≤ 1000 · 각 aᵢ ≤ 10⁴.")}
      </div>
    </div>
  );
}

/* 정리 — 이 문제는 결국 '시키는 대로 k번 + 합'. */
function CollatzRecap({ E }) {
  const Row = ({ q, res }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#ecfdf5", border: "1.5px solid #6ee7b7",
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: A }}>→</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole plan", "전체 계획 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "No trick needed — just do exactly what's asked.", "특별한 트릭 필요 없어요 — 시키는 대로만 하면 돼요.")}
      </div>
      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "For each number: even?", "숫자마다: 짝수면?")} res={t(E, "÷ 2", "÷ 2")} />
        <Row q={t(E, "For each number: odd?", "숫자마다: 홀수면?")} res={t(E, "× 3 + 1", "× 3 + 1")} />
        <Row q={t(E, "Do the whole pass ...", "이 한 바퀴를 ...")} res={t(E, "k times", "k번")} />
        <Row q={t(E, "Finally", "마지막에")} res={t(E, "sum", "합")} />
      </div>
      <div style={{ maxWidth: 470, margin: "14px auto 0", background: "#fffbeb", border: "1px solid #fbbf24", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: "#92400e", lineHeight: 1.7, wordBreak: "keep-all", whiteSpace: "pre-line", textAlign: "center" }}>
        {/* 2026-09-09: 전에는 "값이 커질 수 있으니 64비트 / long long 사용" 이었다.
            학생이 "왜 커지는지, 얼마나 커지는지 숫자가 없어서 그냥 넘어갔다" 고 했다.
            게다가 MCC 는 codeLang="py" 고정이라 학생은 C++ 을 볼 수도 없다.
            그래서 실제 최댓값을 계산해서 넣었다 — 시작값 1~10000 전부를 1000단계까지
            돌려보면 9663 이 48번째에 27,114,424 로 최고점을 찍는다. 리스트 1000칸이
            전부 9663 이면 그 순간 합은 271억이다. */}
        {t(E, "n · k <= 10^6, so a plain simulation is fast enough. But the numbers get big: 9663 becomes 27,114,424 after 48 rounds, and 1000 of those add up to 27 billion.",
             "n · k ≤ 10⁶ 라 그냥 시뮬로 충분히 빨라요.\n단 값이 꽤 커져요 — 9663 은 48번 만에 27,114,424 가 되고, 그런 수가 1000개면 합이 271억이에요.")}
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCollatzCh1 — 시즌 표준 모양 (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플 입출력 → 한 번 적용해보기 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "You have a list of n numbers. Repeat this whole pass k times: each number, if even halve it, if odd triple-plus-one. At the end, print the sum of the list.",
        "리스트에 한 바퀴를 k번 돌리고, 마지막에 합을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔢</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>Collatz</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Apply the even/odd rule to every number, repeat the whole thing k times, then print the sum of the list.",
                "모든 숫자에 짝/홀 규칙을 적용하고 그 전체를 k번 반복한 뒤, 리스트의 합을 출력.")}
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
                  {t(E, "You're given a list of ", "숫자 ")}
                  <b style={{ color: "#059669" }}>n</b>
                  {t(E, " numbers a₁, a₂, …, aₙ.", " 개짜리 리스트 a₁, a₂, …, aₙ 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One pass: replace ", "한 바퀴: 각 ")}
                  <b>aᵢ</b>
                  {t(E, " with ", " 를 — ")}
                  <code style={{ background: "#eff6ff", padding: "1px 5px", borderRadius: 4 }}>aᵢ / 2</code>
                  {t(E, " if even, or ", " (짝수) 또는 ")}
                  <code style={{ background: "#fffbeb", padding: "1px 5px", borderRadius: 4 }}>3·aᵢ + 1</code>
                  {t(E, " if odd.", " (홀수) 로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeat the whole pass ", "이 한 바퀴 전체를 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "exactly k times", "정확히 k번")}</b>
                  {t(E, " (not 'until it reaches 1' — always k passes).", " 반복 ('1이 될 때까지'가 아니라 — 무조건 k번).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "마지막 리스트의 ")}
                  <b style={{ color: "#059669" }}>{t(E, "sum", "합")}</b>
                  {t(E, " of the final list.", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력 (구체 숫자)
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E,
        "A concrete example — one list, and the number we must print.",
        "구체적인 예 하나 — 리스트 하나와, 우리가 출력해야 할 숫자."),
      content: (<CollatzSample E={E} />),
    },

    // [전] 한 번 적용해보기 — 시뮬
    {
      type: "reveal",
      label: t(E, "Try one pass", "한 번 적용해보기"),
      narr: t(E,
        "Run one pass on [1, 2, 3, 4, 5] — one number at a time.",
        "[1, 2, 3, 4, 5] 에 한 바퀴를 돌려봐요 — 숫자 하나씩요."),
      content: (<CollatzStepSim E={E} />),
    },

    /* [확인] 2026-09-09 추가. 이 quest 는 5쪽 전부가 reveal 이라 능동 스텝이 0개였다.
       학생은 코드 쪽을 열기 전에 이미 정답 코드를 변수명까지 똑같이 짰다 —
       즉 "코드를 못 짜는 것" 이 이 quest 의 막히는 지점이 아니다.
       진짜 함정은 이름이다. Collatz 라는 이름 때문에 "1이 될 때까지 돈다" 고
       읽기 쉬운데, 이 문제는 **정확히 k번**이다. 거기를 묻는다.
       숫자는 직접 계산해 확인했다: [1] 에 3바퀴 → 1→4→2→1, 합 1. */
    {
      type: "quiz",
      label: t(E, "Check", "확인"),
      narr: t(E,
        "One question before we move on.",
        "넘어가기 전에 하나만 물어볼게요."),
      question: t(E,
        "n=1, k=3 and the list is [1]. What do we print?",
        "n=1, k=3 이고 리스트가 [1] 이에요. 무엇을 출력할까요?"),
      hint: t(E,
        "1 is odd. Apply the rule three times — do not stop early.",
        "1 은 홀수예요. 규칙을 세 번 적용해봐요 — 중간에 멈추지 말고요."),
      options: [
        t(E, "1 — it is already 1, so nothing happens", "1 — 이미 1 이라 아무 일도 안 일어나요"),
        t(E, "1 — it goes 1 to 4 to 2 to 1 again", "1 — 1→4→2→1 로 돌아서 다시 1 이에요"),
        t(E, "4 — it goes 1 to 4 and stops there", "4 — 1→4 가 되고 거기서 멈춰요"),
      ],
      correct: 1,
      explain: t(E,
        "Both the first and second option say 1, but only one of them is right about why. The rule runs exactly k times, no matter what the numbers are. 1 is odd, so 3*1+1 = 4. Then 4 is even, so 4/2 = 2. Then 2 is even, so 2/2 = 1. Three passes, back to 1. The answer is the sum, which is 1.",
        "첫째와 둘째 보기 모두 답은 1 이지만, 이유가 맞는 건 하나예요.\n규칙은 숫자가 무엇이든 **정확히 k번** 돌아요.\n1 은 홀수라 3×1+1 = 4, 4 는 짝수라 4÷2 = 2, 2 는 짝수라 2÷2 = 1.\n세 바퀴를 돌아 다시 1 이 됐어요. 합은 1 이에요."),
    },

    // [결] 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E,
        "It all comes down to: do the pass k times, then sum.",
        "결국 정리하면: 한 바퀴를 k번 돌리고, 합을 구해요."),
      content: (<CollatzRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCollatzCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh2(E, lang = "py") {
  const w = getCollatzWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read the input, repeat the pass k times transforming each number, then print the sum.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
