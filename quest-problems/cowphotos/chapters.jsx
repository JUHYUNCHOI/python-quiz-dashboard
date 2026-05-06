import { C, t } from "@/components/quest/theme";
import { getCowPhotosSections, HandDrawSimulator, TrickySimulator } from "./components";

export function makeCowPhotosCh1(E) {
  return [
    // 1-1: Problem statement
    {
      type: "reveal",
      narr: t(E,
        "FJ wants a row of cows for a photo where the heights go UP then DOWN, mirror around the middle, and no two neighbors share the same height.\nPick as many cows as possible!",
        "FJ가 사진을 찍어요 — 소들의 키가 가운데까지 올라갔다 내려오고, 좌우 대칭이며, 이웃끼리 같은 키가 없어야 해요.\n최대한 많은 소를 사진에 넣어요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📸</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>More Cow Photos</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has N cows with heights ", "FJ에게 키 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[1..N]</code>
                  {t(E, " — pick a subset and order them in a row.",
                        "인 N마리 소가 있어요 — 일부를 골라서 일렬로 배치해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The row must look like a ", "그 줄은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "mountain", "산 모양")}</b>
                  {t(E, " — heights go UP to a peak, then DOWN — and be ", " (가운데까지 올라갔다 내려옴) 이고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "left-right symmetric", "좌우 대칭")}</b>
                  {t(E, " (mirror image around the peak).",
                        " (가운데 peak 를 기준으로 좌우 거울상)이어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "No two neighbors", "이웃한 두 소")}</b>
                  {t(E, " can have the same height.",
                        "는 같은 키를 가질 수 없어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of cows", "최대 소 수")}</b>
                  {t(E, " that can stand in the photo.", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Hand-draw small example to discover the shape & first pattern
    {
      type: "reveal",
      narr: t(E,
        "Pick up paper. Heights = [1, 1, 2, 3]. Try arranging them — see why even lengths fail, and what makes [1, 3, 1] work.",
        "종이를 꺼내요. 키 = [1, 1, 2, 3]. 직접 배열을 시도하며 짝수 길이가 왜 안 되는지, [1, 3, 1] 은 왜 되는지 봐요."),
      content: (<HandDrawSimulator E={E} />),
    },

    // 1-3: First natural formula (the kid's instinct)
    {
      type: "reveal",
      narr: t(E,
        "From the hand-draw: peak appears 1×, each ring value appears 2×. So a natural first formula falls out — count value pairs, add 1 peak.",
        "손으로 그려본 결과: peak 는 1번, ring 값은 2번씩 등장. 자연스럽게 첫 공식이 나와요 — 페어 가능한 값 세고 + peak 1마리."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
              💡 {t(E, "Natural first formula", "자연스러운 첫 공식")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "rings = (number of distinct values with freq ≥ 2)",
                          "rings = (freq ≥ 2 인 서로 다른 값의 개수)")}</div>
              <div>• {t(E, "answer = 2 · rings + 1", "답 = 2 · rings + 1")}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
                {t(E, "Why +1? Even with 0 rings, we can still take ANY single cow alone as a length-1 photo (just a peak, no rings on either side). So the answer is at least 1.",
                      "왜 +1? ring 이 0 개여도, 어떤 한 마리든 단독으로 길이 1 사진 가능 (peak 만, 양쪽 ring 없음). 그래서 답은 최소 1.")}
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", border: "2px solid #fbbf24", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
              🧪 {t(E, "Try it on a bigger input: [1, 1, 2, 3, 3, 3, 4]", "더 큰 입력에 시도: [1, 1, 2, 3, 3, 3, 4]")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: C.text, lineHeight: 1.7, paddingLeft: 8 }}>
              <div>freq = {`{1: 2, 2: 1, 3: 3, 4: 1}`}</div>
              <div>{t(E, "values with freq ≥ 2: ", "freq ≥ 2 인 값: ")}{`{1, 3}`} → rings = <b>2</b></div>
              <div>{t(E, "answer = 2 · 2 + 1 = ", "답 = 2 · 2 + 1 = ")}<b style={{ color: "#16a34a", fontSize: 15 }}>5</b></div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fbbf24", fontSize: 12, color: C.text }}>
              ✅ {t(E, "Verify: [1, 3, 4, 3, 1] — uses two 1s, two 3s, one 4. mountain ✓ palindrome ✓ no adj dup ✓",
                       "검증: [1, 3, 4, 3, 1] — 1 두 마리, 3 두 마리, 4 하나. mountain ✓ palindrome ✓ 인접 다름 ✓")}
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Looks great — let's code it!", "잘 되네 — 코드 짜볼까!")}
            </div>
          </div>
        </div>),
    },

    // 1-4: TRICKY case — formula breaks
    {
      type: "reveal",
      narr: t(E,
        "But before coding — try one more case. [3, 3, 2, 1]. Walk through what the formula says, then try to BUILD it. Something goes wrong.",
        "코드 짜기 전에 — 한 번만 더 시도. [3, 3, 2, 1]. 공식 답이 뭔지 보고, 실제로 만들어봐요. 뭔가 이상해요."),
      content: (<TrickySimulator E={E} />),
    },

    // 1-5: Verify corrected formula on both cases
    {
      type: "reveal",
      narr: t(E,
        "The fix is small: only count rings of values STRICTLY less than M (the max). Verify both cases match reality.",
        "고침은 작아요: M (최댓값) 보다 엄격히 작은 값만 ring 으로 세요. 두 케이스 다 검증."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #16a34a", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
              🛠️ {t(E, "Corrected formula", "고친 공식")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.text, lineHeight: 1.7, paddingLeft: 8 }}>
              <div>M = max(values)</div>
              <div>rings = #{"{"}v : v &lt; M, freq[v] ≥ 2{"}"}</div>
              <div>answer = 2 · rings + 1</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            <div style={{ background: "#fff", border: "2px solid #86efac", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
                ✓ [1, 1, 2, 3, 3, 3, 4]
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
                <div>M = 4</div>
                <div>{t(E, "v < 4 with freq ≥ 2: ", "v < 4, freq ≥ 2: ")}{`{1, 3}`}</div>
                <div>rings = 2</div>
                <div>{t(E, "answer = ", "답 = ")}<b style={{ color: "#16a34a" }}>5</b> ✓</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "2px solid #86efac", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
                ✓ [3, 3, 2, 1]
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
                <div>M = 3</div>
                <div>{t(E, "v < 3 with freq ≥ 2: ", "v < 3, freq ≥ 2: ")}{`{}`} {t(E, "(none)", "(없음)")}</div>
                <div>rings = 0</div>
                <div>{t(E, "answer = ", "답 = ")}<b style={{ color: "#16a34a" }}>1</b> ✓</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            <b>{t(E, "Edge case: ", "엣지: ")}</b>
            {t(E, "if all cows are the same height, max value M has freq ≥ 2 but no v < M exists → rings = 0 → answer = 1. Correct: any single cow alone is a valid (length 1) photo.",
                  "모든 소가 같은 키면, M 은 freq ≥ 2 인데 v < M 이 없음 → rings = 0 → 답 1. 맞음: 어떤 한 마리든 단독으로 (길이 1) 유효한 사진.")}
          </div>
        </div>),
    },

    // 1-6: Quiz — arrangement validity (not formula, just shape recognition)
    {
      type: "quiz",
      narr: t(E,
        "Quick check on arrangement validity (independent of input). Mountain palindromes look like [a, b, ..., peak, ..., b, a].",
        "배열 자체의 유효성 체크 (입력 무관). mountain palindrome 모양은 [a, b, ..., peak, ..., b, a]."),
      question: t(E,
        "Which is a valid mountain palindrome (no adj dup)?",
        "유효한 mountain palindrome 은? (인접 중복 없이)"),
      options: [
        "[1, 2, 3, 2, 1]",
        "[1, 2, 2, 1]",
        "[3, 2, 1, 2, 3]",
      ],
      correct: 0,
      explain: t(E,
        "[1,2,3,2,1] is a mountain ✓. [1,2,2,1] has adjacent 2s ✗. [3,2,1,2,3] is V-shape (DOWN-UP), not mountain ✗.",
        "[1,2,3,2,1] 은 mountain ✓. [1,2,2,1] 은 인접 2 가 붙어있음 ✗. [3,2,1,2,3] 은 V 모양 (내려갔다 올라옴), mountain 아님 ✗."),
    },

    // 1-7: Input quiz — apply corrected formula
    {
      type: "input",
      narr: t(E,
        "Apply the CORRECTED formula to a new input. Heights = [4, 4, 3, 3, 2].\nM = 4.\nv < 4 with freq ≥ 2: {3} (freq 2 ≥ 2 ✓). 2 has freq 1, doesn't count.\nrings = 1, so answer = 2·1 + 1.\nThe photo: [3, 4, 3] — peak 4 in middle, ring of 3s on each side.",
        "고친 공식을 새 입력에 적용해요. 키 = [4, 4, 3, 3, 2].\nM = 4.\nv < 4, freq ≥ 2: {3} (freq 2 ≥ 2 ✓). 2 는 freq 1, 안 셈.\nrings = 1, 답 = 2·1 + 1.\n사진: [3, 4, 3] — 가운데 peak 4, 양쪽에 ring 3."),
      question: t(E,
        "Max photo length for heights [4, 4, 3, 3, 2]?",
        "키 [4, 4, 3, 3, 2] 의 최대 사진 길이?"),
      hint: t(E, "M = 4. Rings need v < 4 AND freq ≥ 2. Only 3 qualifies. rings = 1, answer = 2·1+1 = 3. Arrangement: [3, 4, 3].",
                "M = 4. ring 후보는 v < 4 이고 freq ≥ 2. 3 만 해당. rings = 1, 답 = 2·1+1 = 3. 배열: [3, 4, 3]."),
      answer: 3,
    },

    // 1-8: Free sim
    {
      type: "sim",
      narr: t(E,
        "Free play: try your own heights. Compare your hand-prediction with the formula's output.",
        "자유 입력: 직접 키 시도. 손으로 예측 vs 공식 결과 비교."),
    },
  ];
}

export function makeCowPhotosCh2(E, lang = "py") {
  return [
    // 2-1: Plan — corrected algorithm in 4 numbered steps
    {
      type: "reveal",
      narr: t(E,
        "Time to code. The algorithm in 4 small steps — the only subtle part is excluding v == M.",
        "코드 시간. 4 단계로 알고리즘 — 까다로운 건 v == M 제외 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Frequency map", "빈도 맵"), code: "freq = Counter(h)", color: "#d97706" },
              { n: 2, label: t(E, "Find peak", "peak 찾기"), code: "M = max(freq)", color: "#0891b2" },
              { n: 3, label: t(E, "Count rings (v < M, freq ≥ 2)", "ring 세기 (v < M, freq ≥ 2)"), code: "rings = sum(1 for v,c in freq.items() if v < M and c >= 2)", color: "#7c3aed" },
              { n: 4, label: t(E, "Output length", "길이 출력"), code: "ans = 2 * rings + 1", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, textAlign: "center", marginBottom: 6 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px", fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>
              <div style={{ fontWeight: 800 }}>🐍 Python</div>
              <div>{t(E, "Counter + max + sum → O(N)", "Counter + max + sum → O(N)")}</div>
              <div style={{ fontWeight: 800 }}>💻 C++</div>
              <div>{t(E, "brute count (no map yet) → O(N²) per test", "brute 카운팅 (map 미배움) → 테스트당 O(N²)")}</div>
            </div>
            <div style={{ fontSize: 10.5, color: "#9a3412", marginTop: 6, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "(C++ uses brute counting because map<int,int> is taught in cpp-16; both fit at typical Bronze sizes)",
                    "(C++ 은 map<int,int> 가 cpp-16 에서 배우므로 brute 카운팅 사용; 둘 다 일반 Bronze 크기에 충분)")}
            </div>
          </div>
        </div>),
    },

    // 2-2: TLE check
    {
      type: "reveal",
      narr: t(E,
        "Does this fit in time? Python's Counter approach is O(N); C++ brute is O(N²) per test. Both fit comfortably at Bronze sizes.",
        "시간 안에 들어올까? Python Counter 는 O(N); C++ brute 는 테스트당 O(N²). Bronze 크기에는 둘 다 여유."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            ✅ {t(E, "TLE check — both languages pass at Bronze sizes", "타임아웃 체크 — Bronze 크기에 둘 다 통과")}
          </div>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>
              <div style={{ fontWeight: 800 }}>{t(E, "constraints", "제약")}</div>
              <div>{t(E, "N ≤ 10⁵ per test, T ≤ 10 tests", "테스트당 N ≤ 10⁵, T ≤ 10")}</div>
              <div style={{ fontWeight: 800 }}>{t(E, "brute (all arrangements)", "모든 배열 브루트")}</div>
              <div style={{ color: "#dc2626" }}>{t(E, "≈ N! permutations — impossible", "≈ N! 순열 — 불가능")}</div>
              <div style={{ fontWeight: 800 }}>🐍 Python</div>
              <div>{t(E, "Counter map → O(N) per test, total ~10⁶ ✓", "Counter map → 테스트당 O(N), 총 ~10⁶ ✓")}</div>
              <div style={{ fontWeight: 800 }}>💻 C++</div>
              <div>{t(E, "brute count → O(N²) per test; for typical Bronze N (~10³) total ~10⁷ ✓", "brute 카운팅 → 테스트당 O(N²); 일반 Bronze N (~10³) 면 총 ~10⁷ ✓")}</div>
              <div style={{ fontWeight: 800, color: "#16a34a" }}>{t(E, "verdict", "판정")}</div>
              <div style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "both fit ✓", "둘 다 통과 ✓")}</div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "💡 Key insight: we don't need to BUILD the photo, just count its length. C++ brute counting is O(N²) but for the typical Bronze sizes (N ≤ a few thousand) it's plenty fast. After learning map<int,int> in cpp-16 you can drop to O(N) like Python.",
                    "💡 핵심: 사진을 만들 필요 X, 길이만 세면 됨. C++ brute 는 O(N²) 지만 일반 Bronze 크기 (N ≤ 수천) 에는 빠름. cpp-16 에서 map<int,int> 배우면 Python 처럼 O(N) 으로 가능.")}
            </div>
          </div>
        </div>),
    },

    // 2-3: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Build the corrected solution piece by piece. Each section reveals one part.",
        "고친 솔루션을 한 조각씩. 각 섹션이 한 부분 공개."),
      sections: getCowPhotosSections(E),
    },

    // 2-4: Free runner
    {
      type: "runner",
      narr: t(E, "Try your own heights.", "직접 키 시도."),
    },
  ];
}
