import { C, t } from "@/components/quest/theme";
import { getMooin3Sections, MooTraceSimulator, TripletEnumSimulator } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeMooin3Ch1(E) {
  return [
    // 1-1: Problem
    {
      type: "reveal",
      narr: t(E,
        "We have a string s. A 'moo' is a triple of positions (i, j, k) where s[i] is DIFFERENT from s[j] but s[j] equals s[k] — like 'abb'.\nFor each query range, find the moo with the BIGGEST value of (j-i)·(k-j) (the product of left distance and right distance).",
        "문자열 s 가 있어요. 'moo' 는 세 자리 (i, j, k) — s[i] 는 다르고 s[j] = s[k] (예: 'abb').\n각 쿼리 구간에서 (j-i)·(k-j) (왼쪽 거리 × 오른쪽 거리) 가 가장 큰 moo 를 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>It's Mooin' Time III</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #3</div>
          </div>

          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given a ", "")}
                  <b style={{ color: "#7c5cfc" }}>{t(E, "string s of length N", "길이 N의 문자열 s")}</b>
                  {t(E, " (only lowercase letters).", "가 주어져요 (소문자만).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "'moo'", "'moo'")}</b>
                  {t(E, " is positions ", "는 위치 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>i &lt; j &lt; k</code>
                  {t(E, " where ", " 중 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>s[i] ≠ s[j] = s[k]</code>
                  {t(E, " (e.g., 'abb', 'xzz').",
                        " 인 것 (예: 'abb', 'xzz').")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each query gives a range ", "각 쿼리는 구간 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "[l, r]", "[l, r]")}</b>
                  {t(E, " — only positions inside this range count.",
                        "을 줘요 — 이 안의 위치만 사용할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: `1px dashed ${C.accentBd}` }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the maximum value of ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "(j-i) · (k-j)", "(j-i) · (k-j)")}</b>
                  {t(E, " — the left distance times the right distance — over all moos in the range. ",
                        " — 왼쪽 거리 × 오른쪽 거리 — 의 최댓값을 출력. ")}
                  {t(E, "If no moo exists in the range, print -1.",
                        "moo 가 없으면 -1.")}
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>3 ≤ N ≤ 10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ Q ≤ 3·10⁴</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>r − l + 1 ≥ 3</code>{" "}
              {t(E, "(query range fits a triplet).", "(쿼리 구간에 triplet 들어갈 수 있어야).")}
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O — the official USACO 2025 Open Bronze #3 sample, verbatim.
    {
      type: "reveal",
      narr: t(E,
        "Real USACO sample: 12-character string, 5 queries. Each gives a different answer (28, 6, 1, -1, 12). One walkthrough below.",
        "실제 USACO 샘플: 12 자 문자열 + 쿼리 5 개. 답이 각각 다름 (28, 6, 1, -1, 12). 첫 쿼리는 아래에서 자세히."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format (official sample)", "입력 / 출력 형식 (공식 샘플)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
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
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`28
6
1
-1
12`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Line by line", "한 줄씩")}
            </div>
            <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>12 5</code> — {t(E, "N = 12 (string length), Q = 5 (five queries)", "N = 12 (문자열 길이), Q = 5 (쿼리 5 개)")}</div>
            <div style={{ marginTop: 6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>abcabbacabac</code> — {t(E, "the string s (1-indexed positions 1..12)", "문자열 s (1-based 위치 1..12)")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "Then 5 query lines, each: ", "그 다음 쿼리 5 줄, 각각: ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>l r</code>
            </div>

            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Walkthrough — Query 1: [1, 12] → 28", "샘플 풀이 — 쿼리 1: [1, 12] → 28")}</b>
              <div style={{ marginTop: 4 }}>
                {t(E, "The best triplet is (i, j, k) = (1, 8, 12).", "최선 triplet 은 (i, j, k) = (1, 8, 12).")}
              </div>
              <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#5b21b6" }}>
                s[1]='a', s[8]='c', s[12]='c' &nbsp;→&nbsp; 'a' ≠ 'c' ✓, 'c' = 'c' ✓
              </div>
              <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#15803d" }}>
                {t(E, "Score = (8 − 1) · (12 − 8) = 7 · 4 = 28", "점수 = (8 − 1) · (12 − 8) = 7 · 4 = 28")}
              </div>
            </div>

            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #c4b5fd", fontSize: 11.5 }}>
              <b style={{ color: "#dc2626" }}>{t(E, "Query 4: [2, 5] → −1", "쿼리 4: [2, 5] → −1")}</b>{" "}
              {t(E, "no valid moo exists in s[2..5] = \"bcab\".",
                    "s[2..5] = \"bcab\" 안엔 유효한 moo 없음.")}
            </div>

            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, fontStyle: "italic" }}>
              {t(E, "📌 Indexing: input is 1-based (1..N). Code converts to 0-based with l--, r-- for array access.",
                    "📌 인덱싱: 입력은 1-based (1..N). 코드 안에서는 배열 접근 위해 0-based 로 변환 (l--, r--).")}
            </div>
          </div>
        </div>),
    },

    // 1-3: Quiz — moo shape recognition
    {
      type: "quiz",
      narr: t(E,
        "Quick check on the 'moo' shape: first character DIFFERENT, second and third character SAME.",
        "'moo' 모양 체크: 첫 글자 다름, 둘째와 셋째 같음."),
      question: t(E,
        "Which is a valid 'moo' triplet?",
        "유효한 'moo' 삼중쌍은?"),
      options: [
        "s[i]='a', s[j]='b', s[k]='b'",
        "s[i]='a', s[j]='a', s[k]='b'",
        "s[i]='a', s[j]='b', s[k]='a'",
      ],
      correct: 0,
      explain: t(E,
        "(0) s[i]≠s[j] ✓ and s[j]=s[k] ✓ — that's a moo. (1) s[i]=s[j] (both 'a') ✗. (2) s[j]≠s[k] ('b' vs 'a') ✗.",
        "(0) s[i]≠s[j] ✓, s[j]=s[k] ✓ — moo 맞음. (1) s[i]=s[j] (둘 다 'a') ✗. (2) s[j]≠s[k] ('b' vs 'a') ✗."),
    },

    // 1-4: First natural idea — try all triplets (TripletEnumSimulator on s='abba')
    {
      type: "reveal",
      narr: t(E,
        "Natural first idea: try EVERY (i, j, k). Walk through s = \"abba\" — only 4 triplets, easy by hand.",
        "자연스러운 첫 시도: 모든 (i, j, k) 시도. s = \"abba\" 따라가요 — 4 개뿐, 손으로 가능."),
      content: (<TripletEnumSimulator E={E} />),
    },

    // 1-5: Narrowed idea — fix j, find best i and k separately (MooTraceSimulator on s='abbab')
    {
      type: "reveal",
      narr: t(E,
        "Better idea: fix j (the middle), then find the BEST i and BEST k separately.\n• To maximize (j − i): take the SMALLEST possible i with s[i] ≠ s[j]  →  i = leftmost different character.\n• To maximize (k − j): take the LARGEST possible k with s[k] = s[j]  →  k = rightmost matching character.",
        "좋은 아이디어: j (중간) 고정 → best i 와 best k 따로 찾기.\n• (j − i) 최대화 → i 가 가장 작아야 → s[i] ≠ s[j] 인 가장 왼쪽 i.\n• (k − j) 최대화 → k 가 가장 커야 → s[k] = s[j] 인 가장 오른쪽 k."),
      content: (<MooTraceSimulator E={E} />),
    },

    // 1-6: Input quiz — apply on small case
    {
      type: "input",
      narr: t(E,
        "Apply the fix-j approach on s='abba' query [1, 4]. Going through every j ∈ {2, 3}:\n• j=2 (s[2]='b'): i=1 ('a' is different), k = no 'b' to right of 2 in [1,4] → 3. score = (2-1)·(3-2) = 1.\n• j=3 (s[3]='b'): i=1 ('a' is different), k = no 'b' to right (4 is 'a') → invalid.\nBest = 1.",
        "s='abba' 쿼리 [1, 4] 에 fix-j 적용. j ∈ {2, 3} 각각:\n• j=2 (s[2]='b'): i=1 ('a' 가 다름), k = 2 오른쪽에 'b' 가 [1,4] 안에 → 3. 점수 = (2-1)·(3-2) = 1.\n• j=3 (s[3]='b'): i=1 ('a' 가 다름), k = 3 오른쪽에 'b' 없음 (4는 'a') → 무효.\n최선 = 1."),
      question: t(E,
        "Max (j-i)·(k-j) for s='abba' query [1, 4]?",
        "s='abba' 쿼리 [1, 4] 의 최대 (j-i)·(k-j) ?"),
      hint: t(E,
        "Only triplet (1, 2, 3) = 'abb' is a valid moo in this range. Score = (2-1)·(3-2) = 1.",
        "이 구간에서 유효한 moo 는 (1, 2, 3) = 'abb' 하나. 점수 = (2-1)·(3-2) = 1."),
      answer: 1,
    },

    // 1-7: Free sim
    {
      type: "sim",
      narr: t(E,
        "Drag j and watch how best i (left, different) and best k (right, same) shift. Product (j-i)(k-j) shown live.",
        "j 를 드래그하면서 best i (왼쪽, 다름) 와 best k (오른쪽, 같음) 가 어떻게 변하는지 봐요. 곱 (j-i)(k-j) 실시간."),
    },
  ];
}

export function makeMooin3Ch2(E, lang = "py") {
  return [
    // 2-1: Brute plan
    {
      type: "reveal",
      narr: t(E,
        "Fix j (middle), then maximize (j − i) × (k − j) by going as far as possible on each side.\nWHY 'farthest'? Bigger (j − i) and bigger (k − j) both make the product bigger.",
        "j (중간) 고정 → 양쪽으로 최대한 멀리 가서 (j − i) × (k − j) 최대화.\n왜 '가장 멀리'? (j − i) 와 (k − j) 둘 다 커야 곱이 커짐."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Per query, loop j", "쿼리당 j 순회"), code: "for j in range(l+1, r):", color: "#7c5cfc" },
              { n: 2, label: t(E, "Best i = SMALLEST i with s[i] ≠ s[j] (maximizes j−i)", "최선 i = s[i] ≠ s[j] 인 가장 작은 i ((j−i) 최대화)"), code: "i = leftmost idx in [l, j) where s[i] != s[j]", color: "#0891b2" },
              { n: 3, label: t(E, "Best k = LARGEST k with s[k] = s[j] (maximizes k−j)", "최선 k = s[k] = s[j] 인 가장 큰 k ((k−j) 최대화)"), code: "k = rightmost idx in (j, r] where s[k] == s[j]", color: "#16a34a" },
              { n: 4, label: t(E, "Update best product", "최댓값 갱신"), code: "best = max(best, (j − i) × (k − j))", color: "#dc2626" },
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
        </div>),
    },

    // 2-2..2-8: WRITE — one section per chapter step (cowphotos pattern).
    //   Single nav level: chapter prev/next walks all 7 sections.
    //   Brute (1–4) first, complexity / insight / fast (5–7) appear AFTER.
    ...getMooin3Sections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the code step by step. Start with the brute that matches the fix-j idea.",
              "단계별로 코드 작성. fix-j 아이디어 그대로 brute 부터.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
