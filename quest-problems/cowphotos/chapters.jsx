import { C, t } from "@/components/quest/theme";
import { getCowPhotosSections, HandDrawSimulator, TrickySimulator } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

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
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 10 }}>
              {t(E, "FJ has N cows with heights ", "FJ에게 키 ")}
              <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[1..N]</code>
              {t(E, " — pick a subset and arrange them in a row h₁,…,h_K satisfying ALL three rules below.",
                    "인 N 마리 소가 있어요 — 그 중 일부를 골라 한 줄 h₁,…,h_K 로 세우는데, 아래 세 조건을 **모두** 만족해야 해요.")}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              {/* Rule 1: mountain */}
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>1.</span>
                <div style={{ flex: 1 }}>
                  <b style={{ color: "#dc2626" }}>{t(E, "Mountain shape", "산 모양")}</b>
                  {t(E, " — heights go UP to a peak, then DOWN.", " — 가운데 peak 까지 올라갔다 내려와요.")}
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>
                    h₁ ≤ ⋯ ≤ hᵢ ≥ ⋯ ≥ h_K
                  </div>
                </div>
              </div>
              {/* Rule 2: no adjacent dup */}
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#0891b2", fontWeight: 800, flexShrink: 0 }}>2.</span>
                <div style={{ flex: 1 }}>
                  <b style={{ color: "#0891b2" }}>{t(E, "No adjacent duplicates", "이웃 다름")}</b>
                  {t(E, " — neighboring cows have different heights.", " — 이웃한 두 소의 키는 달라야 해요.")}
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>
                    hᵢ ≠ hᵢ₊₁
                  </div>
                </div>
              </div>
              {/* Rule 3: palindrome */}
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#7c3aed", fontWeight: 800, flexShrink: 0 }}>3.</span>
                <div style={{ flex: 1 }}>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Symmetric (palindrome)", "좌우 대칭 (팰린드롬)")}</b>
                  {t(E, " — reads the same forwards and backwards.", " — 거꾸로 읽어도 같아요.")}
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>
                    {t(E, "if i + j = K + 1, then hᵢ = hⱼ", "i + j = K + 1 이면 hᵢ = hⱼ")}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10, paddingTop: 8, borderTop: "1px dashed #fdba74", fontSize: 13 }}>
              <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
              <div>
                {t(E, "Print the ", "")}
                <b style={{ color: "#15803d" }}>{t(E, "maximum number of cows K", "최대 소 수 K")}</b>
                {t(E, " that can stand in the photo.", "를 출력해요.")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample input/output format — real USACO sample
    {
      type: "reveal",
      narr: t(E,
        "Real USACO sample: 2 test cases. Each case = N then N heights. Print one answer per case.",
        "실제 USACO 샘플: 2 케이스. 각 케이스 = N 그 다음 키 N 개. 케이스마다 답 1 줄 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
4
1 1 2 3
4
3 3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "What each line means", "각 줄 의미")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", alignItems: "baseline" }}>
              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>2</code>
              <div>{t(E, "T = number of test cases (here: 2 cases)", "T = 테스트 케이스 개수 (여기선: 2 개)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>4</code>
              <div>{t(E, "Case 1: N = 4 cows", "케이스 1: N = 4 마리")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 1 2 3</code>
              <div>{t(E, "Case 1: heights of the 4 cows", "케이스 1: 4 마리의 키")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>4</code>
              <div>{t(E, "Case 2: N = 4 cows", "케이스 2: N = 4 마리")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>3 3 2 1</code>
              <div>{t(E, "Case 2: heights of those 4 cows", "케이스 2: 그 4 마리의 키")}</div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #c4b5fd", fontSize: 12, color: "#5b21b6" }}>
              💡 {t(E, "For each case, print ONE number — the longest valid mountain palindrome length.",
                       "케이스마다 답을 한 줄씩 출력 — 가능한 가장 긴 mountain palindrome 의 길이.")}
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#475569", lineHeight: 1.55 }}>
              {t(E, "Sample answers: case 1 (heights 1,1,2,3) → 3 (e.g. [1, 3, 1]) · case 2 (heights 3,3,2,1) → 1 (just one cow alone). The next pages show WHY.",
                    "샘플 답: 케이스 1 (키 1,1,2,3) → 3 (예: [1, 3, 1]) · 케이스 2 (키 3,3,2,1) → 1 (한 마리만). 다음 페이지에서 왜 그런지.")}
            </div>
          </div>
        </div>),
    },

    // 1-3: Hand-draw small example to discover the shape & first pattern
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
          {/* Rules reminder — student needs all 3 rules in mind to make sense of "ring" below. */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#1e40af", lineHeight: 1.55 }}>
            📋 <b>{t(E, "Rules recap", "규칙 다시")}:</b>{" "}
            <b style={{ color: "#dc2626" }}>{t(E, "mountain", "산 모양")}</b>
            {" + "}
            <b style={{ color: "#0891b2" }}>{t(E, "no adj duplicates", "이웃 다름")}</b>
            {" + "}
            <b style={{ color: "#7c3aed" }}>{t(E, "palindrome (mirror)", "좌우 대칭 (거울)")}</b>
            {t(E,
                ". The 3rd rule (palindrome) is what forces every non-peak cow to have a twin on the other side — that's where 'ring' comes from below.",
                ". 세 번째 규칙 (좌우 대칭) 때문에 peak 가 아닌 모든 소가 반대편에 짝을 가져야 함 — 이게 아래 'ring' 정의의 출발점.")}
          </div>

          {/* Concrete picture-first definition of peak / ring. */}
          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: 12.5, lineHeight: 1.65, color: "#7c2d12" }}>
            <div style={{ fontWeight: 800, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
              📖 {t(E, "First — name the parts of the photo", "먼저 — 사진의 부분 이름 짓기")}
            </div>

            {/* The picture */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  {[
                    { v: 1, label: t(E, "left", "왼쪽") },
                    { v: 3, label: t(E, "MIDDLE", "가운데"), peak: true },
                    { v: 1, label: t(E, "right", "오른쪽") },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <div style={{
                        width: 36, height: 24 + c.v * 14,
                        background: c.peak ? "#f59e0b" : "#fbbf24",
                        border: c.peak ? "3px solid #d97706" : "1.5px solid #d97706",
                        borderRadius: "6px 6px 0 0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#7c2d12", fontWeight: 900, fontSize: 14,
                        fontFamily: "'JetBrains Mono',monospace",
                      }}>{c.v}</div>
                      <div style={{ fontSize: 9, color: "#92400e", fontWeight: 700 }}>{c.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>
                  [1, 3, 1] {t(E, "(3 cows in a row)", "(3 마리 줄)")}
                </div>
              </div>
            </div>

            {/* The names */}
            <div style={{ background: "#fff", border: "1px solid #fcd34d", borderRadius: 6, padding: "8px 10px", marginTop: 4 }}>
              <div style={{ marginBottom: 4 }}>
                • <b style={{ color: "#9a3412" }}>peak</b>
                {t(E, " = the tallest cow in the MIDDLE. There's only ONE.",
                      " = 가운데 가장 큰 소. 1 마리만.")}
                <span style={{ color: "#6b7280" }}>{t(E, " (here: 3)", " (위 사진에선: 3)")}</span>
              </div>
              <div>
                • <b style={{ color: "#9a3412" }}>ring</b>
                {t(E, " = a height value that fills BOTH sides — left AND right (so 2 cows of the same value).",
                      " = 양옆 (왼쪽 AND 오른쪽) 에 똑같이 들어가는 키 — 한 ring 마다 같은 키 소가 2 마리.")}
                <span style={{ color: "#6b7280" }}>{t(E, " (here: value 1, on left and right)",
                                                              " (위 사진에선: 키 1, 왼쪽과 오른쪽 한 마리씩)")}</span>
              </div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontSize: 11.5, color: "#6b7280" }}>
                {t(E, "Why 2 cows per ring? The photo must read the same forward and backward (palindrome). So whatever cow stands at position 2 from the LEFT must also stand at position 2 from the RIGHT. Same height, two cows.",
                      "왜 ring 마다 2 마리? 사진이 거꾸로 읽어도 똑같아야 하니까 (palindrome). 왼쪽에서 두 번째 소의 키는 오른쪽에서 두 번째 소의 키와 같아야 함 → 같은 키 2 마리.")}
              </div>
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
              💡 {t(E, "Natural first formula", "자연스러운 첫 공식")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "rings = how many distinct values have freq ≥ 2 (could go on both sides)",
                          "rings = freq ≥ 2 인 값의 개수 (양옆에 들어갈 수 있는 값 개수)")}</div>
              <div>• {t(E, "answer = 2 · rings + 1 (each ring contributes 2 cows, peak contributes 1)",
                          "답 = 2 · rings + 1 (ring 마다 2 마리, peak 1 마리)")}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
                {t(E, "Why +1? Even with 0 rings we can still take any one cow alone (just a peak). So the answer is at least 1.",
                      "왜 +1? ring 이 0 개여도 한 마리만 단독으로 길이 1 사진 가능 (peak 만). 그래서 답은 최소 1.")}
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
              { n: 1, label: t(E, "Read input", "입력 읽기"), code: t(E, "Read T, then per case: N + heights array h", "T 읽고, 케이스마다: N + 키 배열 h"), color: "#d97706" },
              { n: 2, label: t(E, "Find the largest height (peak)", "가장 큰 키 찾기 (peak)"), code: t(E, "M = max(h)", "M = max(h)"), color: "#0891b2" },
              { n: 3, label: t(E, "Count ring values (v < M and appears ≥ 2 times)", "ring 값 세기 (v < M 이고 ≥ 2 번 등장)"), code: t(E, "for distinct v in h: if v < M and count of v ≥ 2 → ring", "h 의 서로 다른 값 v 마다: v < M 이고 v 가 ≥ 2 번 등장이면 ring"), color: "#7c3aed" },
              { n: 4, label: t(E, "Apply formula and print", "공식 적용 + 출력"), code: t(E, "answer = 2 · rings + 1", "답 = 2 · rings + 1"), color: "#16a34a" },
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

    // 2-2..2-5: WRITE — one section per chapter step (cumulative code,
    //    sample input on the right, "why" notes per step). Single nav
    //    level: chapter prev/next walks all sections.
    ...getCowPhotosSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Now write the code, step by step. Each step adds one piece.",
              "이제 코드 작성. 한 단계마다 한 조각씩 추가.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    // 2-7: Free runner
    {
      type: "runner",
      narr: t(E, "Try your own heights.", "직접 키 시도."),
    },
  ];
}
