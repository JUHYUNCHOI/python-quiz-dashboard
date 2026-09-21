import { C, t } from "@/components/quest/theme";
import { getMcc19PalSections } from "./components";

const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ================================================================
   SOLUTION CODE  (verified: strings, leading zeros allowed,
   ordered by length then lexicographically)
   count of length-l palindromes = k^ceil(l/2)
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   [제목+🎯미션+📖문제] → [📥입력+공식샘플] → [개념 시뮬] → [이해 퀴즈]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Line up palindromes made of digits 0 to k-1 and print the N-th one.",
        "숫자 0…k−1 로 만든 회문을 줄 세워 N 번째를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔄</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8b5cf6" }}>Palindrome</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Print the N-th palindrome string in Book k (leading zeros kept).",
                "책 k 의 N 번째 회문 문자열을 그대로 출력해요 (앞자리 0 유지).")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "palindrome string", "회문 문자열")}</b>
                  {t(E, " reads the same forwards and backwards, made only of the digits ",
                        " 은 앞뒤로 똑같이 읽혀요. 숫자 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "0…k−1", "0…k−1")}</b>{t(E, ".", " 로만 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Leading zeros ARE allowed", "앞자리 0 을 써도 돼요")}</b>
                  {t(E, " — so \"0\", \"00\", \"010\", \"0110\" all count as valid entries.",
                        " — 그래서 \"0\", \"00\", \"010\", \"0110\" 도 모두 책에 들어가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "\"Book k\" lists ALL of them, ordered by ", "\"책 k\" 는 그런 회문을 전부 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "length first, then alphabetically", "길이 먼저, 같으면 사전 순")}</b>
                  {t(E, " (string order, ", " 으로 나열해요 (문자열 순서, ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "not numeric value", "숫자 값이 아님")}</b>
                  {t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "N-th entry (1-indexed) as its literal digit string", "N 번째 (1 부터 세요) 항목을 숫자 문자열 그대로")}</b>
                  {t(E, ".", " 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Input format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. Input is one line: n then k. Output is the digit string (keep the leading zeros).",
        "입력 형식과 공식 예제를 같이 살펴봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>n k</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— on one line", "— 한 줄에 같이 와요")}</span></div>
              <div style={{ fontSize: 11, color: C.dim, fontFamily: "inherit" }}>n — {t(E, "which entry to print (counting from 1)", "몇 번째 항목인지 (1 부터 세요)")}</div>
              <div style={{ fontSize: 11, color: C.dim, fontFamily: "inherit" }}>k — {t(E, "the digits you may use are 0…k−1", "쓸 수 있는 숫자는 0…k−1")}</div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {t(E, "One line: the n-th palindrome as a digit string.\nKeep the leading zeros exactly as they are.",
                    "n 번째 회문을 숫자 문자열로 한 줄에 써요.\n앞자리 0 도 그대로 두고요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#5b21b6", whiteSpace: "pre" }}>{`7 3`}</div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`000`}</div>
              </div>
            </div>
          </div>
          <div style={{ background: "#faf5ff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "10px 14px", marginBottom: 12, ...KA }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Book 3 order (k = 3):", "책 3 의 순서 (k = 3):")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {[["0",1],["1",2],["2",3],["00",4],["11",5],["22",6],["000",7]].map(([s,i]) => (
                <span key={i} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 4,
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                  border: i === 7 ? "2px solid #8b5cf6" : "1px solid #c4b5fd",
                  background: i === 7 ? "#ede9fe" : "#fff", borderRadius: 6, padding: "2px 7px" }}>
                  <span style={{ color: C.dim, fontSize: 10 }}>{i}.</span>
                  <b style={{ color: i === 7 ? "#8b5cf6" : "#5b21b6" }}>{s}</b>
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.55 }}>
              {/* 2026-09-08: 여기서 "왜 000 인지" 를 통째로 설명하고 있었다
                  (한 자리 3개 · 두 자리 3개 · 그다음 길이 3…).
                  P4 의 "왜 15?" 와 같은 자리다 — 형식 쪽은 형식만. 궁리는 다음 쪽 몫이다. */}
              {t(E,
                "So the 7th entry is \"000\". Leading zeros are fine.",
                "그래서 7 번째는 \"000\" 이에요. 앞자리 0 도 그대로 써요.")}
            </div>
          </div>

          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>2 ≤ k ≤ 10</div>
              <div>n ≥ 1</div>
              {/* 2026-09-17: k 범위만 있고 n 범위가 아예 없었다. 원문(ioimalaysia 2019
                  editorial)에도 n 이 얼마까지 커지는지가 없다 — 없는 숫자를 지어내지 않고,
                  "안 적혀 있다" 가 무슨 뜻인지를 적는다. Ch2 의 "N 이 아주 크면
                  끝나지 않아요" 가 여기에 기댄다. */}
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2, fontFamily: "inherit", ...KA, whiteSpace: "pre-line" }}>
                {t(E,
                  "The original statement gives no upper bound for n.\nNo bound means n may be huge — far beyond what you could reach by listing palindromes one at a time from the first.",
                  "원문에 n 이 얼마까지 커지는지는 적혀 있지 않아요.\n안 적혀 있다는 건 n 이 아주 클 수도 있다는 뜻이에요.\n1 번째부터 하나씩 세어 가서는 닿을 수 없을 만큼요.")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "sim",
      /* 2026-09-08: 이 narr 이 슬라이더를 만지기 **전에** 공식(k^⌈L/2⌉)과
         거울 트릭을 문장으로 다 줬다. 시뮬이 "느껴보라" 는데 느낄 게 없었다.
         공식은 시뮬 안 라이브 카드가 이미 보여준다 — 여기선 무엇을 해보라는 것만. */
      narr: t(E,
        "Pick k and N, and watch the strings line up.",
        "k 와 N 을 골라 문자열이 줄 서는 걸 봐요."),
      content: null, // rendered by App via <Mcc19PalSim />
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      /* 2026-09-08: 여기 narr 이 책 2 의 순서를 8번째까지 **나열**하고
         "5 번째가 길이 3 의 첫 항목" 까지 못박았다. 질문이 바로 그 5번째 값을 묻는다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         목록과 결론을 빼고, 세는 데 필요한 것만 남긴다. */
      narr: t(E,
        "Book 2 (k = 2). Count them in order — how far does each length reach?",
        "책 2 (k = 2). 순서대로 세어봐요. 길이마다 몇 개씩일까요?"),
      question: t(E,
        "Book 2 (k = 2): what is the 5th palindrome string?",
        "책 2 (k = 2): 5 번째 회문 문자열은?"),
      options: [
        t(E, "\"11\"", "\"11\""),
        t(E, "\"000\"", "\"000\""),
        t(E, "\"101\"", "\"101\""),
      ],
      correct: 1,
      explain: t(E,
        "\"0\",\"1\" (length 1) and \"00\",\"11\" (length 2) fill the first 4. The length-3 group starts with \"000\" — leading zeros are allowed, and it's alphabetical order, so \"000\" comes before \"010\" and \"101\".",
        "\"0\",\"1\" (길이 1) 과 \"00\",\"11\" (길이 2) 가 처음 4 개예요. 길이 3 그룹은 \"000\" 부터 시작해요 — 앞자리 0 이 허용되고 사전 순이라 \"000\" 이 \"010\", \"101\" 보다 앞이에요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드
   [🐢느림 vs 🚀빠름 계획] → [단계별 코드]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19PalCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow (generate all) vs fast (count & jump)
    {
      type: "reveal",
      narr: t(E,
        "Instead of generating every palindrome, count them by length and jump straight to the N-th.",
        "회문을 다 만들지 말고 길이별 개수로 건너뛰어 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: generate every palindrome until the N-th", "느린 방법 — N 번째까지 회문을 하나씩 전부 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Listing N strings one by one takes about N steps. When N is very large, you never finish.",
                      "문자열을 하나씩 N 개 만들면 N 번쯤 걸려요. N 이 아주 크면 끝나지 않아요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count per length, jump, then build one answer", "빠른 방법 — 길이별 개수로 건너뛰고 답 하나만 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Length L holds one string for every way to fill its front half (pick the front half freely, mirror it). Subtract counts length by length to land on the right length, then write the rank in base k and mirror.",
                      "길이 L 짜리 회문은 앞 절반만 고르면 뒤는 거울처럼 따라와요. 그래서 그 길이의 개수는 앞 절반의 자리 수만큼 k 를 곱한 값이에요. 길이별 개수를 빼 가며 맞는 길이를 찾고, 그 안에서의 순위를 k 진법으로 적어 거울 대칭으로 완성해요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    /* ─────────────────────────────────────────────────────────────
       2026-09-17: 초6 학생이 **여기서 그만뒀다.**
         "진법 변환을 아예 안 배웠다. rr % k / rr //= k 반복문도,
          half[-2::-1] 도 손으로 못 따라갔다. 이 페이지부터는 눈으로만 훑었다."
       코드가 순위 → −1 → K 진법 → 거울 을 한꺼번에 하는데,
       그중 어느 것도 화면에서 숫자로 걸어본 적이 없었다.
       코드 앞에 두 쪽을 놓는다: ① 왜 1 을 빼나 ② K 진법으로 바꾸고 거울 붙이기.
       예제는 k = 2, n = 7 → "101" 하나로 끝까지 간다 (앞 시뮬 목록과 일치).
       ───────────────────────────────────────────────────────────── */

    // 2-2: 왜 1 을 빼는가 — 1 부터 세는 것을 0 부터 세는 것으로
    {
      type: "reveal",
      narr: t(E,
        "Before the code: why does the rank lose a 1?",
        "코드 전에 — 순위에서 왜 1 을 뺄까요?"),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, marginBottom: 10, whiteSpace: "pre-line", textWrap: "balance" }}>
            {t(E,
              "Take k = 2 and n = 7. Lengths 1 and 2 hold 4 strings in total, so n = 7 sits in length 3, and inside that length it is the 3rd one.\nLength 3 is decided by its front 2 digits — the rest is a mirror.",
              "k = 2, n = 7 로 해봐요. 길이 1 과 2 가 합쳐서 4 개니까\nn = 7 은 길이 3 안에 있고, 그 안에서는 3 번째예요.\n길이 3 짜리는 앞 두 자리만 고르면 정해져요. 뒤는 거울이니까요.")}
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr", gap: "0 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, alignItems: "center" }}>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>{t(E, "rank", "순위")}</div>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>{t(E, "front half", "앞 절반")}</div>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>{t(E, "as a number in base 2", "2 진법 수로 읽으면")}</div>
              {[["1", "00", "0"], ["2", "01", "1"], ["3", "10", "2"], ["4", "11", "3"]].map(([rk, fh, num]) => {
                const hit = rk === "3";
                return (
                  <div key={rk} style={{ display: "contents" }}>
                    <div style={{ ...NW, padding: "5px 0", color: hit ? "#8b5cf6" : C.dim, fontWeight: hit ? 800 : 500 }}>{rk}{t(E, "", " 번째")}</div>
                    <div style={{ ...NW, padding: "5px 0", fontWeight: 800, color: hit ? "#8b5cf6" : "#5b21b6" }}>{fh}</div>
                    <div style={{ ...NW, padding: "5px 0", color: hit ? "#8b5cf6" : C.dim, fontWeight: hit ? 800 : 500 }}>{num}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: "10px 14px" }}>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "The ranks start at 1, but the numbers start at 0.\nSo the 3rd one is the number 2, not 3 — one step apart, every time.\nThat is the whole reason for this line:",
                "순위는 1 부터 세고, 숫자는 0 부터 세요.\n그래서 3 번째는 숫자 3 이 아니라 2 예요. 늘 하나씩 어긋나요.\n이 줄이 있는 이유가 그거예요:")}
            </div>
            <div style={{ marginTop: 8, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: "8px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
              r -= 1
            </div>
          </div>
        </div>),
    },

    // 2-3: 10 진수를 K 진법으로 + 거울 붙이기
    {
      type: "reveal",
      narr: t(E,
        "Now write the number 2 with only the digits 0 and 1.",
        "이제 숫자 2 를 0 과 1 만으로 적어봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, marginBottom: 10, whiteSpace: "pre-line", textWrap: "balance" }}>
            {t(E,
              "We need 2, written with only the digits 0 and 1 — that is \"base 2\".\nThe trick: divide by 2 over and over, and keep each remainder.",
              "우리가 적을 값은 2 인데, 쓸 수 있는 숫자는 0 과 1 뿐이에요.\n이걸 \"2 진법으로 적는다\" 고 해요.\n방법은 이래요 — 2 로 계속 나누면서 나머지를 적어둬요.")}
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 12, overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", gap: "0 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, alignItems: "center", minWidth: 300 }}>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>rr</div>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>rr % 2</div>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>half</div>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 800, paddingBottom: 4 }}>rr //= 2</div>
              {[["2", "0", "\"0\"", "1"], ["1", "1", "\"01\"", "0"]].map(([a, b, c2, d]) => (
                <div key={a} style={{ display: "contents" }}>
                  <div style={{ ...NW, padding: "5px 0", color: "#5b21b6", fontWeight: 800 }}>{a}</div>
                  <div style={{ ...NW, padding: "5px 0", color: "#8b5cf6", fontWeight: 800 }}>{b}</div>
                  <div style={{ ...NW, padding: "5px 0", color: "#5b21b6" }}>{c2}</div>
                  <div style={{ ...NW, padding: "5px 0", color: C.dim }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.65, whiteSpace: "pre-line" }}>
              {t(E,
                "rr is 0 now, so we stop. That loop is exactly these two code lines:\n  half += str(rr % k)   and   rr //= k",
                "이제 rr 이 0 이라 멈춰요. 이 반복문이 딱 코드 두 줄이에요:\n  half += str(rr % k)   와   rr //= k")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Flip it around", "뒤집어요")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "We wrote the last digit first, so the string came out backwards: \"01\".\nFlip it and the front half is \"10\" — and 2 in base 2 really is 10.",
                "우리는 뒤쪽 자리부터 적었어요. 그래서 \"01\" 처럼 거꾸로 나와요.\n뒤집으면 앞 절반은 \"10\" 이에요.\n2 를 2 진법으로 쓰면 정말 10 이 맞아요.")}
            </div>
          </div>

          <div style={{ background: "#faf5ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: "10px 14px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Mirror it — and mind the middle", "거울을 붙여요 — 가운데를 조심해서")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "The answer has length 3, an odd length, so the LAST digit of the front half is the middle one — and a middle digit is written only once.\nSo drop that last digit and stick the rest on backwards.\n  \"10\" + \"1\" = \"101\"\nIf the length were even, the whole front half would go on backwards instead.",
                "답의 길이는 3, 홀수예요.\n그러면 앞 절반의 마지막 글자가 바로 가운데 글자예요.\n가운데는 한 번만 쓰니까 그 마지막 글자는 빼고 나머지를 거꾸로 붙여요.\n  \"10\" + \"1\" = \"101\"\n길이가 짝수였다면 앞 절반을 통째로 거꾸로 붙여요.")}
            </div>
            <div style={{ marginTop: 8, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: "8px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, overflowX: "auto" }}>
              <div>half + half[::-1]{"    "}<span style={{ color: "#8b949e" }}>{t(E, "# even length", "# 길이가 짝수일 때")}</span></div>
              <div>half + half[-2::-1]{"  "}<span style={{ color: "#8b949e" }}>{t(E, "# odd — skip the middle", "# 홀수 — 가운데는 건너뛰기")}</span></div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.65, whiteSpace: "pre-line" }}>
              {t(E,
                "half[-2::-1] reads: start one before the end, then walk backwards.",
                "half[-2::-1] 은 \"끝에서 한 칸 앞부터 시작해 거꾸로 간다\" 는 뜻이에요.")}
            </div>
          </div>
        </div>),
    },

    // 2-4: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc19PalSections(E),
    },
  ];
}
