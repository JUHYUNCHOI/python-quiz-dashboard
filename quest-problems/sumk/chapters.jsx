import { C, t } from "@/components/quest/theme";
import { getSumkWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { useTraceStep, SimShell } from "@/components/quest/TraceStepper";
import { SumkSim, SumkBuildSim, SumkAreaSim } from "./sims";

const A = "#8b5cf6";

/* 샘플 입출력 — 시즌 표준 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function SumKSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 2
1 2 3`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`100`}
          </div>
        </div>
      </div>

      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 2</code> — {t(E, "N = 3 numbers, K = 2 (the exponent)", "N = 3 (숫자 3개), K = 2 (거듭제곱 지수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2 3</code> — {t(E, "the array A", "다음 줄 = 배열 A")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>100</code>
          {/* 2026-09-10 학생: "998244353 로 나눈 나머지 라고 잘 쓰다가 갑자기 mod 998244353 이 나온다.
              mod 는 처음 보는 말이다." — 같은 화면에서 같은 뜻을 두 말로 쓰고 있었다. 한 말로 통일한다. */}
          {t(E, " = the sum of (subset sum)^K over every non-empty subset, then the remainder after dividing by 998244353.",
               " = 모든 비어있지 않은 부분집합의 (합)^K 를 다 더한 뒤, 998244353 으로 나눈 나머지.")}
        </div>
      </div>

      {/* 2026-09-10 — 여기 원래 부분집합 7개의 점수 칩(`{1}→1 … {1,2,3}→36`)과
          `1+4+9+9+16+25+36 = 100 ✓` 합산 박스가 있었다. **뺐다.**
          바로 다음 쪽 시뮬이 같은 배열·같은 K로 **같은 7개를 같은 순서로** 하나씩 세게 한다.
          답을 다 본 뒤에 "직접 세어봐요" 를 시키면 그건 발견이 아니라 확인이다
          (pedagogy 2순위 · memory/feedback_students_copy_the_answer.md 와 같은 뿌리).
          지우는 게 아니라 **옮긴 것**이다 — 설명은 다음 쪽이 그대로 갖고 있다. */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        {/* 2026-09-10 학생: "`/` 로 두 줄 입력을 붙여 쓴 걸 처음 봐서 뭐가 N,K 고 뭐가 배열인지
            한참 봐야 알았다." — 위 INPUT 카드는 두 줄로 보여주는데 여기만 한 줄로 뭉쳤다.
            그리고 값이 같은 원소 둘을 `{3},{3}` 로 써서 "같은 걸 두 번 셌나" 로도 읽혔다.
            줄을 나누고, 어느 3 인지 자리로 구분해 준다. */}
        <b style={{ color: "#5b21b6" }}>{t(E, "Another test", "다른 테스트")}</b><br />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          <code style={{ background: "#f5f3ff", padding: "1px 5px", borderRadius: 3 }}>2 1</code>
          {t(E, "  ← N = 2, K = 1", "  ← N = 2, K = 1")}<br />
          <code style={{ background: "#f5f3ff", padding: "1px 5px", borderRadius: 3 }}>3 3</code>
          {t(E, "  ← the array: first 3, second 3", "  ← 배열: 첫 번째 3, 두 번째 3")}
        </span><br />
        {t(E, "Subsets: {first}, {second}, {both} → 3 + 3 + 6 = ", "부분집합: {첫 번째}, {두 번째}, {둘 다} → 3 + 3 + 6 = ")}<b style={{ color: "#15803d" }}>12</b>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {/* 2026-09-10 — 전엔 영어가 "N and K up to 200", 한국어가 "N·K 최대 200" 으로
            **서로 다른 뜻**이었고 둘 다 원문과 안 맞았다(check-bilingual-drift 는 이런 걸 못 잡는다 —
            글자가 아니라 뜻이 갈린 경우다). PDF 의 서브태스크 표를 눈으로 읽고 다시 썼다:
              N=10 K=1 / 10,2 / 18,2 / 1000,2 / 100000,2 / 100000,3 / 200,200 / 777,150,  1 ≤ aᵢ ≤ 10⁹
            즉 두 갈래다 — 큰 N·작은 K, 그리고 작은 N·큰 K. aᵢ 상한은 아예 빠져 있었다. */}
        {t(E, "📌 Constraints — two families: N up to 100,000 with K ≤ 3, or N up to 777 with K up to 200. Each aᵢ ≤ 10⁹. The answer is taken mod 998244353.",
             "📌 제약 — 두 갈래예요: N 이 최대 10만이면 K 는 3 이하, N 이 777 이하면 K 가 200까지. 각 원소 aᵢ 는 10억 이하. 답은 998244353 로 나눈 나머지.")}
      </div>
    </div>
  );
}

/* 2026-09-10 — 여기 원래 `SumKWhyDP` 한 쪽이 있었다. **둘로 갈랐다.**

   팀 넷이 같은 자리를 짚었다:
     · pedagogy: "3쪽은 부분집합을 통째로 나열하고 4쪽은 원소를 하나씩 넣는다 —
       순회 방식 자체가 다른데 둘이 같은 100 을 낸다는 걸 잇는 문장이 없다."
     · student(초6): **여기서 그만뒀다.** "이항정리로 펼치면 을 읽는 순간 뭔 소린지 몰라서
       눈으로만 흘려보고 넘겼다. 5쪽 코드는 읽는 척만 했다."
     · quest-auditor: 이항정리·C(t,j)·파스칼이 정의 없이 이름만 쓰인다.

   전엔 한 쪽에서 "2ᴺ 은 크다 → 트릭은 P[t] 다 → 이항정리로 갱신한다" 를 색 카드 세 장으로
   **연달아 통보**했다. 학생이 할 일이 받아 적는 것밖에 없었다.

   갈라서 사이에 시뮬(`SumkBuildSim`)을 넣는다:
     [한계 + 질문]  →  숫자로 직접 굴려보기  →  [정리 + 이름 붙이기]
   이름(P[t]·이항정리·C(t,j))은 **맨 뒤에서만** 나온다
   (memory/feedback_first_concept_scaffolding.md — 이름은 나중에). */

/* [한계] 2ᴺ 은 못 센다 — 그리고 **질문으로 닫는다.** */
function SumKLimit({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", textWrap: "balance" }}>
        🤔 {t(E, "7 subsets was easy — but N up to 10⁵?", "7개는 쉬웠죠 — 근데 N 이 10만이면?")}
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 14px", fontSize: 12.5, color: C.text, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.7 }}>
        {/* 2026-09-10 quest-auditor: 여기 원래 "N=60 만 돼도 **온 우주 원자보다 많아요**" 라고 적혀 있었다.
            2⁶⁰ = 1,152,921,504,606,846,976 ≈ 1.15×10¹⁸ 이고 관측 가능한 우주의 원자는 약 10⁸⁰ 개다.
            **62자릿수 차이로 사실이 정반대다.** 겁주려고 쓴 비유가 틀린 셈이다.
            브루트가 불가능한 건 맞으니, 맞는 숫자로 같은 말을 한다 —
            1초에 10억 개씩 세어도 36.5년 (2⁶⁰ / 10⁹ / 초 = 36.5년, 직접 계산). */}
        {t(E, "There are ", "부분집합은 ")}<b style={{ color: "#dc2626" }}>2ᴺ</b>
        {t(E, " subsets. For N = 60 that is 2⁶⁰ ≈ 1,150,000,000,000,000,000 — counting a billion per second would take 36 years. And here N goes up to 100,000.",
             " 개예요. N = 60 이면 2⁶⁰ ≈ 115경 개 — 1초에 10억 개씩 세어도 36년이에요. 그런데 이 문제의 N 은 10만까지 가요.")}
      </div>

      {/* 결론을 통보하지 않는다 — 질문으로 닫고, 다음 쪽에서 학생이 숫자로 직접 굴려본다
          (memory/feedback_solution_framing.md — "그럼 어떻게 해결하면 될까? 생각해보자"). */}
      <div style={{ maxWidth: 500, margin: "0 auto", background: "#f5f3ff", border: "2px solid #8b5cf6",
        borderRadius: 12, padding: "14px 16px", textAlign: "center", fontSize: 13.5, fontWeight: 800,
        color: "#5b21b6", lineHeight: 1.85, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, <>So — how else could we do it?<br />
              Could the answer <b>grow</b> as we drop the numbers in one at a time,<br />
              without ever listing a subset?</>,
             <>그럼 어떻게 하면 될까요?<br />
              숫자를 <b>하나씩 넣으면서</b> 답이 자라게 할 수는 없을까요?<br />
              부분집합은 한 번도 나열하지 않고요.</>)}
      </div>

      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Let's try it with 1, 2, 3 →", "1, 2, 3 으로 직접 해봐요 →")}
      </div>
    </div>
  );
}

/* [정리] 6쪽 — **한 상자씩 넘긴다.**

   2026-09-10. 학생 **둘이 독립으로** 같은 말을 했다:
     · "1~6번 여섯 항목이 한 화면에 다 있는데 **3번부터 글자만 훑고 안 읽었다.**"
     · "6쪽은 6개 소제목이 한 화면에 몰려 있어서 **3번부터는 거의 안 읽고 넘겼다.**"
   고치고 다시 보낸 학생도 똑같았다 — "**지난번이랑 똑같이 3번에서 막힘. 안 나아짐.**"
   (그때는 6쪽을 아직 안 고쳤으니 당연한 결과다.)

   기획·디자인이 따로 냈는데 둘 다 같은 처방을 냈다: **스크롤로 다 보여주지 말고 한 장씩 넘겨라.**

   그리고 pedagogy 가 하나 더 잡았다 — 옛 3번 상자("우리가 한 게 바로 그 전개예요")는
   **5쪽 7~9걸음(넓이 그림 → 색 → 세 줄)이 이제 그 일을 한다.** 남겨두면 같은 설명을 두 번 한다.
   → **뺐다.** 학생 둘이 멈춘 자리가 하필 그 3번이었다는 게 우연 같지 않다.

   시뮬과 같은 ◀▶ 문법을 쓴다 — 학생이 새 조작을 배우지 않아도 된다. */
function SumKRecap({ E }) {
  const cards = [{ k: "formula" }, { k: "names" }, { k: "coef" }];
  const ts = useTraceStep(cards);
  const c = cards[ts.safe];
  const M = ({ children }) => (
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>{children}</span>
  );
  const Head = ({ children }) => (
    <div style={{ fontSize: 13.5, fontWeight: 800, color: "#5b21b6", textAlign: "center",
      marginBottom: 10, wordBreak: "keep-all", textWrap: "balance" }}>{children}</div>
  );
  const Body = ({ children }) => (
    <div style={{ maxWidth: 470, margin: "0 auto", fontSize: 12.5, color: C.text,
      lineHeight: 1.9, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>{children}</div>
  );

  return (
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
      maxHeightCss="calc(100dvh - 360px)">
      <div style={{ fontSize: 11, fontWeight: 800, color: "#a78bfa", textAlign: "center", marginBottom: 8 }}>
        ✏️ {t(E, "The same thing, as a formula", "같은 것을 공식으로")} ({ts.safe + 1} / {cards.length})
      </div>

      {c.k === "formula" && (
        <>
          <Head>{t(E, "If there were just two numbers a and b", "숫자가 a, b 둘뿐이라면")}</Head>
          <Body>
            {t(E, "The subsets are {a}, {b}, {a,b}. So the answer is",
                 "부분집합은 {a}, {b}, {a,b} 셋. 그러니 답은")}
            <span style={{ display: "block", fontSize: 16, margin: "8px 0", color: "#5b21b6" }}>
              <M>a² + b² + (a+b)²</M>
            </span>
            {t(E, "Each sum is squared first, then all added. Expand it:",
                 "각 합을 먼저 제곱하고, 그걸 다 더해요. 펼쳐보면 —")}
            <span style={{ display: "block", fontSize: 14, margin: "8px 0", lineHeight: 2, color: "#1e40af" }}>
              <M>(a+b)² = a² + 2ab + b²</M><br />
              <M>a² + b² + (a+b)² = 2a² + 2b² + 2ab</M>
            </span>
            {t(E, "With a = 1, b = 2: 1 + 4 + 9 = ", "a = 1, b = 2 를 넣으면 1 + 4 + 9 = ")}
            <b style={{ color: "#15803d" }}>14</b>
            {t(E, " — the number the table showed after 2 went in.", " — 앞 쪽 표에서 2 를 담은 뒤 나왔던 그 숫자예요.")}
          </Body>
        </>
      )}

      {c.k === "names" && (
        <>
          <Head>{t(E, "Names for the three rows", "세 줄의 이름")}</Head>
          <Body>
            {t(E, "The three rows we kept writing down are", "우리가 계속 적어둔 세 줄이")}<br />
            <span style={{ display: "block", fontSize: 15, margin: "8px 0", color: "#5b21b6" }}>
              <M>P[0]</M> · <M>P[1]</M> · <M>P[2]</M>
            </span>
            {t(E, "how many · each sum added up · each sum squared, added up.",
                 "부분집합 개수 · 각 합을 더한 것 · 각 합을 제곱해서 더한 것.")}<br />
            {t(E, "For a bigger K we write down P[0] … P[K].", "K 가 더 크면 P[0] 부터 P[K] 까지 적어둬요.")}
            <div style={{ marginTop: 12, background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
              padding: "10px 14px", fontSize: 13, fontWeight: 800, color: "#065f46", lineHeight: 1.85 }}>
              ✅ {t(E, "The answer is ", "답은 ")}<M>P[K]</M>
              {t(E, ". (For K ≥ 1 the empty pick scores 0ᴷ = 0, so it drops out on its own.)",
                   ". (K ≥ 1 이면 아무것도 안 담은 것은 0ᴷ = 0 이라 저절로 빠져요.)")}
            </div>
          </Body>
        </>
      )}

      {c.k === "coef" && (
        <>
          <Head>{t(E, "Names for the numbers in front", "앞에 붙는 수의 이름")}</Head>
          <Body>
            {/* 2026-09-10 학생 A: "'조각 앞에 붙은 수가 1, 2, 1 이었죠' 라는데
                앞 쪽 사각형에서는 1,3,3,9 값만 봤지 **'앞에 붙은 수 1,2,1' 은 본 적 없다.**"
                맞았다 — 그래서 앞 쪽 2걸음이 이제 "초록 1개 · 파랑 2개 · 보라 1개.
                이 1, 2, 1 을 기억해요" 라고 **실제로 말한다.** 여기서는 그걸 되받는다. */}
            {t(E, "Remember the pieces — 1 green, 2 blue, 1 purple. That ", "조각이 초록 1개 · 파랑 2개 · 보라 1개였죠. 그 ")}
            <M>1, 2, 1</M>
            {t(E, " is row 2 of the triangle below.", " 이 아래 삼각형의 2 번째 줄이에요.")}<br />
            {t(E, "We write them ", "이 수를 ")}<M>C(t, j)</M>
            {t(E, ": row t of the triangle, the j-th number (counting from 0). So C(2,0)=1, C(2,1)=2, C(2,2)=1.",
                 " 라고 써요 — 삼각형 t 번째 줄의, j 번째 수 (0 부터 셈). 그러니까 C(2,0)=1, C(2,1)=2, C(2,2)=1.")}
          </Body>

          <div style={{ maxWidth: 340, margin: "12px auto 0", background: "#fff",
            border: "1.5px dashed #93c5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10.5, color: "#64748b", textAlign: "center", marginBottom: 7, wordBreak: "keep-all" }}>
              {t(E, "each number = the two just above it, added (1 + 2 = 3)", "한 칸 = 바로 위 두 칸을 더한 것 (1 + 2 = 3)")}
            </div>
            {[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]].map((row, tt) => (
              <div key={tt} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5, marginTop: 3 }}>
                <span style={{ width: 30, textAlign: "right", fontSize: 10, fontWeight: 800, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>
                  t={tt}
                </span>
                {row.map((v, j) => (
                  <span key={j} style={{ minWidth: 22, textAlign: "center", padding: "2px 6px", borderRadius: 7,
                    fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                    background: tt === 2 ? "#dbeafe" : "#f8fafc", color: tt === 2 ? "#1e40af" : "#64748b",
                    border: `1px solid ${tt === 2 ? "#93c5fd" : "#e2e8f0"}` }}>{v}</span>
                ))}
              </div>
            ))}
          </div>

          <Body>
            <div style={{ marginTop: 12, fontSize: 12.5, color: "#5b21b6" }}>
              {t(E, "Cutting (x+a)ᵗ into t+1 pieces like that is called the ", "(x+a)ᵗ 를 그렇게 t+1 조각으로 가르는 걸 ")}
              <b>{t(E, "binomial theorem", "이항정리")}</b>{t(E, ".", " 라고 해요.")}
            </div>
          </Body>
        </>
      )}
    </SimShell>
  );
}

/* t=2 줄 옆 주석 — (1+2)² 에서 본 1·2·1 이 바로 이 줄이라는 것만 말한다. */
function t2Note(E) {
  return t(E, "← the 1, 2, 1 from (1+2)²", "← (1+2)² 에서 본 1, 2, 1");
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeSumKCh1 — 시즌 표준 (라벨 + 구체 샘플 + 시뮬 + 정리)
   문제(도입) → 샘플 입출력 → 작은 예로 직접 → 왜 DP?
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      /* 2026-09-08 — narr 이 86자였고, 바로 아래 🎯미션·📖불릿이 **같은 정의를 두 번 더** 말했다.
         한 화면에서 같은 말을 세 번 하는 셈이다 (feedback_narration_short.md: 55자 이하 한 문장). */
      narr: t(E,
        "Sum^K — add up the score of every subset.",
        "Sum^K — 모든 부분집합의 점수를 더해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"∑"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>{"Sum^K"}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P6</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5, wordBreak: "keep-all" }}>
              {t(E,
                "Add up (subset sum)^K over ALL non-empty subsets of A, and print it modulo 998244353.",
                "A 의 모든 비어있지 않은 부분집합에 대해 (합)^K 을 더한 값을 998244353 로 나눈 나머지로 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You're given an ", "주어지는 것: ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "array A of N integers", "정수 N 개짜리 배열 A")}</b>
                  {t(E, " and a number ", " 와 숫자 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "한 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "subset", "부분집합")}</b>
                  {t(E, " picks any of the elements. Its ", " 은 원소를 골라 담은 것. 그 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "score", "점수")}</b>
                  {t(E, " = (sum of chosen elements)", " = (고른 원소들의 합)")}
                  <sup>K</sup>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Look at ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "every non-empty subset", "모든 비어있지 않은 부분집합")}</b>
                  {t(E, " — there are 2ᴺ − 1 of them.", " — 총 2ᴺ − 1 개.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total of all scores", "모든 점수의 총합")}</b>
                  {t(E, ", taken modulo 998244353.", " 을 998244353 로 나눈 나머지로 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "A concrete example — one array, and the answer we must print.",
                 "구체적인 예 하나 — 배열 하나와, 우리가 출력할 답."),
      content: (<SumKSample E={E} />),
    },

    // [전] 작은 예로 직접 — 7개 부분집합 시뮬
    {
      type: "reveal",
      label: t(E, "Try a small case", "작은 예로 직접"),
      /* 2026-09-10 ux 실측 56자 — 55자 규칙 위반. 뒷절은 시뮬 첫 말풍선이 그대로 다시 말한다. */
      narr: t(E, "Let's count it by hand for [1, 2, 3], K = 2.",
                 "[1, 2, 3], K = 2 로 직접 세어봐요."),
      content: (<SumkSim E={E} />),
    },

    // [전-2] 한계 — 그리고 질문으로 닫는다
    {
      type: "reveal",
      label: t(E, "Too many", "너무 많아요"),
      narr: t(E, "For big N, listing 2ᴺ subsets is impossible.",
                 "N 이 크면 2ᴺ 개 나열은 불가능해요."),
      content: (<SumKLimit E={E} />),
    },

    /* [전-3] **빠진 다리** — 2026-09-10 에 새로 넣은 쪽.
       전엔 위 [한계] 다음이 곧바로 [정리] 였다. 학생(초6)이 정확히 그 자리에서 그만뒀다.
       나열하는 방식(3쪽)과 원소를 하나씩 넣는 방식(정리) 사이를 **숫자로** 잇는다. */
    {
      type: "reveal",
      label: t(E, "Grow it instead", "나열 말고 키우기"),
      /* 2026-09-10 — 시뮬 안을 "담다" 로 통일하면서 파란 바도 같이 맞춘다.
         선생님: "말이 이해가 안돼. 뭘 빼고 넣고" */
      narr: t(E, "Decide one number at a time and watch the answer grow.",
                 "숫자를 하나씩 담을지 정하면서 답을 키워요."),
      content: (<SumkBuildSim E={E} />),
    },

    /* [전-4] **새 쪽** (2026-09-10 재설계).
       원래 이 걸음들은 앞 쪽 시뮬 안에 있었다. 선생님이 그 시뮬 하나에서 **열 번 넘게** 막히셨고,
       검토가 원인을 냈다 — "한 시뮬에서 배워야 할 **보는 법이 5개**", "칩(이산)에서 넓이(연속)로
       **그림이 통째로 갈아치워지는데** 잇는 근거가 말풍선뿐". 저장소 관례는 **시뮬당 2개**다.
       기획: "**왜 2ab 인지는 앞 쪽 일의 증명이지 그 일 자체가 아니다.** 옮기지 말고 **쪼개라.**" */
    {
      type: "reveal",
      label: t(E, "Why three", "왜 세 줄"),
      narr: t(E, "Why do three rows do the job?", "왜 세 줄이면 될까요?"),
      content: (<SumkAreaSim E={E} />),
    },

    // [결] 정리 — 방금 본 것에 이름을 붙이고 K 로 넓힌다
    {
      type: "reveal",
      label: t(E, "As a formula", "공식으로"),
      /* 2026-09-10 선생님: "이거 결국 공식으로 보여주면 좋을것 같은데 애들 수학 잘하잖아." */
      narr: t(E, "The same thing written as a formula.",
                 "방금 한 것을 공식으로 써봐요."),
      content: (<SumKRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeSumKCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh2(E, lang = "py") {
  const w = getSumkWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      /* 2026-09-10 ux 실측 89자였다 — 55자 규칙의 최대 위반이고,
         나열한 5단계를 바로 아래 CodeWalk 말풍선 5개가 **또 한 번씩** 설명한다. */
      narr: t(E, "Read the code top to bottom.", "코드를 위에서 아래로 읽어봐요."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />
      ),
    },
  ];
}
