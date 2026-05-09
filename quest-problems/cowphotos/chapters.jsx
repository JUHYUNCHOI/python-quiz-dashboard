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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>More Cow Photos</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 8 }}>
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
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>1.</span>
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
                <span style={{ color: "#0891b2", fontWeight: 600, flexShrink: 0 }}>2.</span>
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
                <span style={{ color: "#7c3aed", fontWeight: 600, flexShrink: 0 }}>3.</span>
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
              <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "First — what does the input look like?  Two test cases: each is N followed by N heights.",
        "샘플 입력 한번 보자. 케이스가 두 개 들어와요 — 각 케이스 = N + 키 N 개."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
4
1 1 2 3
4
3 3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
1`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
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
          </div>
        </div>),
    },

    // 1-3: Hand-draw small example to discover the shape & first pattern
    {
      type: "reveal",
      narr: t(E,
        "Heights = [1, 1, 2, 3].  Try arranging them on paper before reading any answer.",
        "키 [1, 1, 2, 3]. 답 보기 전에 직접 종이로 한번 배열해 봐요."),
      content: (<HandDrawSimulator E={E} />),
    },

    // 1-3: First natural formula (the kid's instinct)
    {
      type: "reveal",
      narr: t(E,
        "Spotted a pattern from the paper?  Let's name the parts and write down a first-try formula.",
        "종이에서 패턴 보였어? 부분 이름 짓고 첫 공식을 적어보자."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Connect to the paper drawing the student just did. */}
          <div style={{
            background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8,
            padding: "8px 12px", marginBottom: 12, fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.55,
          }}>
            {t(E,
              "Your paper answer for heights [1, 1, 2, 3] was [1, 3, 1] — 3 cows.  Look at WHERE each cow came from.",
              "종이에서 [1, 1, 2, 3] 의 답이 [1, 3, 1] — 3 마리. 각 자리의 소가 어디서 왔는지 봐.")}
          </div>

          {/* Mountain picture with names + per-cow count.  Bigger height
              ratio (×24 instead of ×14) so the peak is clearly above
              the rings — looked jagged before. */}
          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.65, color: "#7c2d12" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                  {[
                    { v: 1, tag: t(E, "ring", "ring"), side: t(E, "left", "왼쪽") },
                    { v: 3, tag: t(E, "peak", "peak"), peak: true },
                    { v: 1, tag: t(E, "ring", "ring"), side: t(E, "right", "오른쪽") },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <div style={{
                        width: 44, height: 20 + c.v * 24,
                        background: c.peak ? "#f59e0b" : "#fbbf24",
                        border: c.peak ? "3px solid #d97706" : "1.5px solid #d97706",
                        borderRadius: "6px 6px 0 0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#7c2d12", fontWeight: 700, fontSize: 15,
                        fontFamily: "'JetBrains Mono',monospace",
                      }}>{c.v}</div>
                      <div style={{ fontSize: 10, color: c.peak ? "#9a3412" : "#92400e", fontWeight: 700 }}>{c.tag}</div>
                      <div style={{ fontSize: 9, color: c.peak ? "#9a3412" : "#92400e" }}>{c.side ?? ""}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
                  [1, 3, 1]
                </div>
              </div>
            </div>

            {/* What the student noticed — names + cow counts */}
            <div style={{ paddingLeft: 4 }}>
              • {t(E, "Middle: ", "가운데: ")}
              <b>peak</b> = {t(E, "the tallest cow, alone in the middle.", "가운데 가장 큰 소, 혼자.")}
              <span style={{ color: "#15803d", fontWeight: 700 }}>{t(E, "  1 cow.", "  1 마리.")}</span>
            </div>
            <div style={{ paddingLeft: 4 }}>
              • {t(E, "Sides: ", "양옆: ")}
              <b>ring</b> = {t(E, "a height that fills both sides (palindrome).",
                                      "양옆에 같이 들어가는 키 (palindrome).")}
              <span style={{ color: "#15803d", fontWeight: 700 }}>{t(E, "  2 cows per ring.", "  ring 마다 2 마리.")}</span>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontSize: 11.5, color: "#7c2d12" }}>
              {t(E,
                "Here: 1 peak + 1 ring × 2 cows = 3 cows. ✓",
                "여기선: peak 1 + ring 1 개 × 2 마리 = 3 마리. ✓")}
            </div>
          </div>
        </div>),
    },

    // 1-4b: BUILD a bigger one — student tries to construct on paper
    //       before any formula.  This is the "try → try → can't keep
    //       doing this by hand" moment that motivates the formula.
    //       Hint is intentionally NOT a formula spoiler — it nudges
    //       toward building.
    {
      type: "input",
      narr: t(E,
        "Bigger input.  Try building it on paper — what's the longest valid arrangement?",
        "이번엔 더 큰 입력. 직접 종이에 짜 봐 — 가장 긴 배열은 몇 마리?"),
      question: t(E,
        "Heights = [1, 1, 2, 3, 3, 3, 4].  How long can you make the photo?",
        "키 [1, 1, 2, 3, 3, 3, 4]. 사진 길이를 최대 몇 마리까지?"),
      hint: t(E,
        "Try arranging: peak in the middle, mirror on both sides, no neighbor duplicates.  E.g. [1, 3, 4, 3, 1] works — verify the rules.",
        "직접 배열해 봐: 가운데 peak, 양옆 거울, 이웃 다름. 예: [1, 3, 4, 3, 1] 시도 — 세 규칙 만족하는지 확인."),
      answer: 5,
    },

    // 1-4c: NOW notice the pattern across two cases.  Two data points
    //        is when manual building starts feeling repetitive — the
    //        natural moment to ask "is there a shortcut?".
    {
      type: "reveal",
      narr: t(E,
        "Building these by hand works but it's getting tedious.  Same shape both times — peak in the middle, paired heights on the sides.  Maybe we can just COUNT.",
        "손으로 짜는 거 되긴 하는데 점점 귀찮아지지. 두 번 다 같은 모양 — 가운데 peak, 양옆은 짝지은 키들. 그냥 세기만 하면 안 될까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12.5 }}>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
              🔍 {t(E, "What both photos had in common",
                      "두 사진에서 공통으로 본 것")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.85, paddingLeft: 6 }}>
              <div>[1, 3, 1]            : peak <b>3</b> + ring of <b>1</b>     = 1 + 2×1 = <b style={{ color: "#15803d" }}>3</b></div>
              <div>[1, 3, 4, 3, 1] : peak <b>4</b> + rings of <b>3, 1</b> = 1 + 2×2 = <b style={{ color: "#15803d" }}>5</b></div>
            </div>
            <div style={{ marginTop: 6, fontSize: 11.5, color: "#7c2d12" }}>
              {t(E,
                "Both = 1 (peak) + 2 × (number of paired heights).  We don't have to BUILD — just count the pairs.",
                "둘 다 = 1 (peak) + 2 × (짝지을 수 있는 키 개수). 짤 필요 없이 짝의 수만 세면 됨.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
              💡 {t(E, "First-try formula (count, don't build)",
                      "첫 번째 공식 (짜지 말고 세자)")}
            </div>
            <div style={{ textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700, color: "#15803d", padding: "6px 0" }}>
              {t(E, "answer", "답")} = 1 + 2 × rings
            </div>
            <div style={{ fontSize: 11.5, color: "#065f46", lineHeight: 1.55, textAlign: "center" }}>
              {t(E,
                "rings = number of distinct heights with freq ≥ 2 (a height that can fill both sides).",
                "rings = freq ≥ 2 인 키의 개수 (양옆에 같이 넣을 수 있는 키).")}
            </div>
          </div>
        </div>),
    },

    // 1-4: TRICKY case — formula breaks
    {
      type: "reveal",
      narr: t(E,
        "Before coding it up — try the formula on one more input.  [3, 3, 2, 1].  Does it still work?",
        "코드 짜기 전에 한 번만 더 시도 — [3, 3, 2, 1] 에서도 공식이 통할까?"),
      content: (<TrickySimulator E={E} />),
    },

    // 1-5: Verify corrected formula on both cases
    {
      type: "reveal",
      narr: t(E,
        "The fix turns out to be one tiny tweak.  Then double-check it against both cases.",
        "고치는 건 의외로 작은 한 줄. 그 다음 두 케이스 모두 다시 검증."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Plain-words recipe — set-builder notation (#{v : v < M, freq[v] ≥ 2})
              is unreadable for middle/high school students.  Replace with a
              numbered 3-step procedure they can read top-to-bottom. */}
          <div style={{ background: "#ecfdf5", border: "1px solid #16a34a", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              🛠️ {t(E, "Corrected recipe", "고친 풀이 — 순서대로")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div style={{ marginBottom: 6 }}>
                <b style={{ color: "#15803d" }}>1.</b>{" "}
                {t(E, "Find the ", "")}
                <b>{t(E, "tallest height", "가장 큰 키")}</b>
                {t(E, ".  That's the ", " — 그게 ")}<b>peak</b>{t(E, ".", ".")}
              </div>
              <div style={{ marginBottom: 6 }}>
                <b style={{ color: "#15803d" }}>2.</b>{" "}
                {t(E, "Among heights ", "키 중에서 ")}
                <b>{t(E, "shorter than the peak", "peak 보다 작은 키")}</b>
                {t(E, ", count how many appear ", " 만 보고, ")}
                <b>{t(E, "at least 2 times", "2 마리 이상 등장")}</b>
                {t(E, ".  Each one is a ", " 한 종류 = ")}<b>ring</b>{t(E, ".", ".")}
              </div>
              <div>
                <b style={{ color: "#15803d" }}>3.</b>{" "}
                {t(E, "Answer = ", "답 = ")}
                <b style={{ fontSize: 14 }}>1 + 2 × (ring {t(E, "count", "개수")})</b>
                <span style={{ color: C.dim, fontSize: 11.5 }}>{t(E,
                  "  (1 peak + 2 cows for each ring)",
                  "  (peak 1 마리 + ring 마다 2 마리)")}</span>
              </div>
            </div>
            <div style={{
              marginTop: 10, paddingTop: 8, borderTop: "1px dashed #6ee7b7",
              fontSize: 11.5, color: "#065f46",
            }}>
              {t(E,
                "What changed: rings have to be SHORTER than the peak.  Heights equal to the peak can't go on the sides.",
                "바뀐 부분: ring 은 peak 보다 작아야 함. peak 와 같은 키는 양옆에 못 들어감.")}
            </div>
          </div>

          {/* Two worked cases — same recipe applied step by step.  No
              math notation; just words + concrete numbers. */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            <div style={{ background: "#fff", border: "1px solid #86efac", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
                ✓ [1, 1, 2, 3, 3, 3, 4]
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.75 }}>
                <div>1. {t(E, "tallest = ", "가장 큰 키 = ")}<b>4</b> {t(E, "(peak)", "(peak)")}</div>
                <div>
                  2. {t(E, "shorter than 4, appears ≥ 2 times: ",
                          "4 보다 작고 2 마리 이상 등장: ")}
                </div>
                <div style={{ paddingLeft: 12, color: C.dim }}>
                  {t(E,
                    "1 (×2) ✓, 2 (×1) ✗, 3 (×3) ✓",
                    "키 1 (2 마리 ✓), 키 2 (1 마리 ✗), 키 3 (3 마리 ✓)")}
                </div>
                <div style={{ paddingLeft: 12 }}>→ <b>2 {t(E, "rings", "ring")}</b></div>
                <div style={{ marginTop: 4, paddingTop: 4, borderTop: "1px dashed #86efac" }}>
                  3. {t(E, "answer = 1 + 2 × 2 = ", "답 = 1 + 2 × 2 = ")}
                  <b style={{ color: "#16a34a", fontSize: 14 }}>5</b> ✓
                </div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #86efac", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
                ✓ [3, 3, 2, 1]
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.75 }}>
                <div>1. {t(E, "tallest = ", "가장 큰 키 = ")}<b>3</b> {t(E, "(peak)", "(peak)")}</div>
                <div>
                  2. {t(E, "shorter than 3, appears ≥ 2 times: ",
                          "3 보다 작고 2 마리 이상 등장: ")}
                </div>
                <div style={{ paddingLeft: 12, color: C.dim }}>
                  {t(E,
                    "2 (×1) ✗, 1 (×1) ✗ — none qualify",
                    "키 2 (1 마리 ✗), 키 1 (1 마리 ✗) — 해당 없음")}
                </div>
                <div style={{ paddingLeft: 12 }}>→ <b>0 {t(E, "rings", "ring")}</b></div>
                <div style={{ marginTop: 4, paddingTop: 4, borderTop: "1px dashed #86efac" }}>
                  3. {t(E, "answer = 1 + 2 × 0 = ", "답 = 1 + 2 × 0 = ")}
                  <b style={{ color: "#16a34a", fontSize: 14 }}>1</b> ✓
                </div>
              </div>
            </div>
          </div>

        </div>),
    },

    // (Removed: "valid mountain palindrome?" rule-recognition quiz —
    //  came after the corrected formula but tests something the student
    //  already mastered through HandDraw + TrickySim.  Was a sidetrip
    //  in the fix → apply flow.)

    // 1-7: Input quiz — apply corrected formula
    {
      type: "input",
      narr: t(E,
        "Your turn — apply the corrected formula to a new input.",
        "이번엔 직접 — 고친 공식을 새 입력에 적용해 봐요."),
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
    // 2-1..: WRITE — code sections directly.  No "code time intro"
    //    page (used to be a near-empty placeholder); the first
    //    section's narration handles the transition.
    ...getCowPhotosSections(E).map((sec, i) => ({
      type: "reveal",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      narr: i === 0
        ? t(E, "Formula's settled.  Translate it straight to code — input → freq → count rings → output.",
              "공식 확정. 그대로 코드로 — 입력 → 빈도 → ring 세기 → 출력.")
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
