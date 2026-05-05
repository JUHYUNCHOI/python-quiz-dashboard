import { C, t } from "@/components/quest/theme";
import { getMooin3Sections } from "./components";

export const SOLUTION_CODE = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "# A 'moo' is (i, j, k) with i < j < k,",
  "# s[i] != s[j], and s[j] == s[k]. Score = (j - i) * (k - j).",
  "# For each query [l, r], find the maximum score (or -1 if none).",
  "",
  "# Per-j brute force (O(N^2) per query):",
  "#   - leftmost  i in [l, j)  with s[i] != s[j]  → maximizes (j - i)",
  "#   - rightmost k in (j, r]  with s[k] == s[j]  → maximizes (k - j)",
  "",
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1   # 1-indexed → 0-indexed",
  "    best = -1",
  "    for j in range(l + 1, r):",
  "        # leftmost i with a different character",
  "        left = -1",
  "        for i in range(l, j):",
  "            if s[i] != s[j]:",
  "                left = i",
  "                break",
  "        if left == -1:",
  "            continue",
  "        # rightmost k with the same character as s[j]",
  "        right = -1",
  "        for k in range(r, j, -1):",
  "            if s[k] == s[j]:",
  "                right = k",
  "                break",
  "        if right == -1:",
  "            continue",
  "        best = max(best, (j - left) * (right - j))",
  "    print(best)",
];

export function makeMooin3Ch1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We have a string s. A 'moo' is a triple of positions (i, j, k) where s[i] is DIFFERENT from s[j] but s[j] equals s[k].\nFor each query range, find the moo whose 'spread' (j-i)·(k-j) is biggest.",
        "문자열 s가 있어요. 'moo'는 세 자리 (i, j, k) 인데, 가운데와 끝 글자는 같고 첫 글자는 달라야 해요.\n각 쿼리 구간에서 (j-i)·(k-j)가 가장 큰 moo를 찾아요."),
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
                  {t(E, "Print the maximum ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "(j-i) · (k-j)", "(j-i) · (k-j)")}</b>
                  {t(E, " over all moos in the range, or -1 if none exists.",
                        " 의 최댓값을 출력해요. moo가 없으면 -1.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Hand-trace on a small string — find the best moo in s = "abbab"
    {
      type: "reveal",
      narr: t(E,
        "Walk through s = \"abbab\" with query l=1, r=5 (the whole string). Look at every middle position j and find the best (i, j, k) it can form.",
        "s = \"abbab\" 에서 쿼리 l=1, r=5 (문자열 전체) 로 손으로 따라가요. 각 가운데 자리 j 에 대해 만들 수 있는 최고의 (i, j, k) 를 찾아요."),
      content: (() => {
        const str = "abbab";
        const l = 0, r = 4;
        // For each j, find leftmost i with s[i]!=s[j] and rightmost k with s[k]==s[j]
        const rows = [];
        for (let j = l + 1; j < r; j++) {
          const sj = str[j];
          let left = -1;
          for (let i = l; i < j; i++) if (str[i] !== sj) { left = i; break; }
          let right = -1;
          for (let k = r; k > j; k--) if (str[k] === sj) { right = k; break; }
          const score = (left >= 0 && right >= 0) ? (j - left) * (right - j) : null;
          rows.push({ j, sj, left, right, score });
        }
        const best = Math.max(...rows.map(r => r.score ?? -1));
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", textAlign: "center", marginBottom: 4 }}>
              ✏️ {t(E, "Hand-trace on s = \"abbab\", query [1, 5]", "s = \"abbab\", 쿼리 [1, 5] 손으로 따라가기")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 12 }}>
              {t(E, "1-indexed positions: a=1, b=2, b=3, a=4, b=5", "1-인덱스: a=1, b=2, b=3, a=4, b=5")}
            </div>
            {/* String display */}
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
              {str.split("").map((ch, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.dim, marginBottom: 2 }}>{i + 1}</div>
                  <div style={{
                    width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "#fff", border: "2px solid #c4b5fd", borderRadius: 6,
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, fontSize: 16, color: "#5b21b6",
                  }}>{ch}</div>
                </div>
              ))}
            </div>
            {/* Per-j table */}
            <div style={{ display: "grid", gridTemplateColumns: "40px 50px 100px 100px 90px", gap: "4px 8px", fontSize: 12 }}>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>j</div>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>s[j]</div>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>{t(E, "leftmost i (s[i]≠s[j])", "왼쪽 i (s[i]≠s[j])")}</div>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>{t(E, "rightmost k (s[k]=s[j])", "오른쪽 k (s[k]=s[j])")}</div>
              <div style={{ fontWeight: 800, color: "#5b21b6", textAlign: "right" }}>{t(E, "score", "점수")}</div>
              {rows.map((r, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>{r.j + 1}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed" }}>{r.sj}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                    {r.left >= 0 ? `i=${r.left + 1} (s='${str[r.left]}')` : "—"}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                    {r.right >= 0 ? `k=${r.right + 1} (s='${str[r.right]}')` : "—"}
                  </div>
                  <div style={{
                    textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                    color: r.score === best && best >= 0 ? "#16a34a" : C.text,
                    background: r.score === best && best >= 0 ? "#dcfce7" : "transparent",
                    padding: "2px 6px", borderRadius: 4,
                  }}>
                    {r.score === null ? "—" : r.score}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d" }}>
                {t(E, `Best moo score for [1, 5] = ${best}`, `[1, 5] 의 최대 moo 점수 = ${best}`)}
              </div>
            </div>
          </div>
        );
      })(),
    },
    {
      type: "quiz",
      narr: t(E,
        "A 'moo' means: first character differs, but second and third match.\nLike 'abb', 'xzz', etc.", "'moo'란: 첫 문자는 다르고, 둘째와 셋째는 같아요. 예: 'abb', 'xzz' 등."),
      question: t(E,
        "Which is a valid 'moo' triplet?",
        "유효한 'moo' 삼중쌍은?"),
      options: [
        "s[i]='a', s[j]='b', s[k]='b'",
        "s[i]='a', s[j]='a', s[k]='b'",
        "s[i]='a', s[j]='b', s[k]='a'",
      ],
      correct: 0,
      explain: t(E, "s[i]≠s[j] ✓ and s[j]=s[k] ✓. That's a moo!", "s[i]≠s[j] ✓ 그리고 s[j]=s[k] ✓. moo야!"),
    },
    {
      type: "reveal",
      narr: t(E,
        "Try every triplet (i, j, k) in range [1, 4] of s='abba'.\nOnly one is a valid 'moo'.",
        "s='abba', 범위 [1, 4]의 모든 트리플 (i, j, k)을 시도.\n유효한 'moo'는 단 하나."),
      content: (
        <div style={{ padding: 16 }}>
          {/* string visualization */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#7c5cfc", fontWeight: 700, textAlign: "center", marginBottom: 4 }}>
              s = 'abba'
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {"abba".split("").map((ch, i) => {
                const idx = i + 1;
                return (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#9ca3af", marginBottom: 2 }}>idx={idx}</div>
                    <div style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
                      background: "#fff", border: `2px solid #7c5cfc`, color: "#7c5cfc",
                    }}>{ch}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* triplet candidates table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { ijk: [1,2,3], chars: "abb", note: "s[i]≠s[j] ✓, s[j]=s[k] ✓", val: "(2-1)×(3-2) = 1", ok: true },
              { ijk: [1,2,4], chars: "aba", note: "s[j]=s[k]? b≠a ✗", val: "—", ok: false },
              { ijk: [1,3,4], chars: "aba", note: "s[j]=s[k]? b≠a ✗", val: "—", ok: false },
              { ijk: [2,3,4], chars: "bba", note: "s[i]≠s[j]? b=b ✗", val: "—", ok: false },
            ].map((t, i) => (
              <div key={i} style={{
                background: t.ok ? "#dcfce7" : "#f8fafc",
                border: `1.5px solid ${t.ok ? "#86efac" : "#e5e7eb"}`,
                borderRadius: 6, padding: "6px 10px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace", flexWrap: "wrap", gap: 4,
              }}>
                <span style={{ fontWeight: 800, color: t.ok ? "#15803d" : "#64748b" }}>
                  ({t.ijk.join(",")}) = '{t.chars}'
                </span>
                <span style={{ color: t.ok ? "#15803d" : "#64748b" }}>{t.note}</span>
                <span style={{ fontWeight: 800, color: t.ok ? "#15803d" : "#cbd5e1" }}>{t.val}</span>
              </div>
            ))}
          </div>
        </div>),
    },
    {
      type: "input",
      narr: t(E, "What's the max value?", "최대값은?"),
      question: t(E, "Max value for s='abba', range [1,4]?", "s='abba', 범위 [1,4]의 최대값?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Drag j and watch how best i (left, different) and best k (right, same) shift.\nProduct (j-i)(k-j) shown live.", "j를 드래그하면서 best i (왼쪽, 다름)와 best k (오른쪽, 같음)가 어떻게 변하는지 봐요. 곱 (j-i)(k-j) 실시간."),
    },
  ];
}

export function makeMooin3Ch2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Fix j (middle), then maximize (j − i) × (k − j) by going as far as possible on each side.",
        "j (중간) 고정 → 양쪽으로 최대한 멀리 가서 (j − i) × (k − j) 최대화."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Per query, loop j", "쿼리당 j 순회"), code: "for j in range(l+1, r):", color: "#7c5cfc" },
              { n: 2, label: t(E, "Best i (farthest left, different)", "최선 i (왼쪽 끝, 다름)"), code: "i = first idx in [l, j) where s[i] != s[j]", color: "#0891b2" },
              { n: 3, label: t(E, "Best k (farthest right, same)", "최선 k (오른쪽 끝, 같음)"), code: "k = last idx in (j, r] where s[k] == s[j]", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#7c5cfc" }}>O(Q · N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "Q queries × O(N²) brute scan", "Q 쿼리 × O(N²) 완전탐색")}</div>
          </div>
        </div>),
    },
    // 2-2: Will it TLE? Check the constraints
    {
      type: "reveal",
      narr: t(E,
        "Will the brute force fit in time? With N, Q up to 10^5 each, the brute is roughly 10^10 operations — way over 1 second. We need a smarter idea.",
        "브루트포스가 시간 안에 들어올까? N, Q 가 최대 10^5 면 대략 10^10 연산 — 1 초 한참 초과. 더 똑똑한 방법 필요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            🚨 {t(E, "TLE check", "타임아웃 체크")}
          </div>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#7f1d1d" }}>
              <div style={{ fontWeight: 800 }}>N, Q</div>          <div>≤ 10⁵</div>
              <div style={{ fontWeight: 800 }}>per query</div>      <div>O(N²) ≈ 10¹⁰ scans worst case</div>
              <div style={{ fontWeight: 800 }}>total</div>          <div>Q × N² ≈ 10¹⁵ — needs years</div>
              <div style={{ fontWeight: 800, color: "#dc2626" }}>판정</div>
              <div style={{ color: "#dc2626", fontWeight: 800 }}>TLE — 1 초 안 나옴</div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              💡 {t(E, "Where can we cut?", "어디서 줄일 수 있을까?")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "For a fixed j we did TWO inner loops (find leftmost different i, find rightmost same k). If we knew those answers in O(1), each query becomes O(N) instead of O(N²).",
                    "j 고정 시 안쪽 루프 2 개 (왼쪽 다른 i 찾기, 오른쪽 같은 k 찾기) 가 있어요. 이 두 답을 O(1) 로 알 수 있다면, 각 쿼리가 O(N²) 대신 O(N) 으로 줄어요.")}
            </div>
          </div>
        </div>),
    },
    // 2-3: Pattern — precompute prev_diff and next_same
    {
      type: "reveal",
      narr: t(E,
        "The two inner scans are the same answer for many j values. Precompute them ONCE for the whole string, then each query reads them in O(1).",
        "안쪽 두 스캔은 사실 j 가 달라도 답이 같은 경우가 많아요. 문자열 전체에 대해 한 번만 미리 계산해두면, 각 쿼리는 O(1) 로 읽기만."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            ⚡ {t(E, "Idea: precompute two helper arrays", "아이디어: 보조 배열 2 개 미리 계산")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
                {t(E, "prev_diff_pos[c][j]", "prev_diff_pos[c][j]")}
              </div>
              <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6 }}>
                {t(E, "For character c and index j: the LARGEST i ≤ j where s[i] ≠ c. Sweep left→right once.",
                      "문자 c 와 인덱스 j 에 대해: s[i] ≠ c 인 가장 큰 i ≤ j. 왼→오 한 번 스윕.")}
              </div>
            </div>
            <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", marginBottom: 6 }}>
                {t(E, "next_same_pos[c][j]", "next_same_pos[c][j]")}
              </div>
              <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6 }}>
                {t(E, "For character c and index j: the SMALLEST k ≥ j where s[k] == c. Sweep right→left once.",
                      "문자 c 와 인덱스 j 에 대해: s[k] == c 인 가장 작은 k ≥ j. 오→왼 한 번 스윕.")}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              📐 {t(E, "Per-query plan", "쿼리당 처리")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "for each j in (l, r):", "for each j in (l, r):")}<br/>
              {"  "}c = s[j]<br/>
              {"  "}left  = {t(E, "leftmost i ≥ l with s[i] ≠ c", "l 이상의 가장 작은 i, s[i] ≠ c")}<br/>
              {"  "}right = {t(E, "rightmost k ≤ r with s[k] = c", "r 이하의 가장 큰 k, s[k] = c")}<br/>
              {"  "}best = max(best, (j − left) × (right − j))
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#5b21b6", fontWeight: 700, textAlign: "center" }}>
              {t(E, "→ Per query: O(N).  Total: O(N · 26 + Q · N)  ≈ 10⁷  ✓ fits.",
                    "→ 쿼리당 O(N). 총 O(N · 26 + Q · N) ≈ 10⁷ ✓ OK.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the solution step by step (brute-force version — see Ch2 step 3 for the optimized idea).",
        "단계별로 풀이 작성 (브루트 버전 — 최적화 아이디어는 Ch2 의 3단계 참고)."),
      sections: getMooin3Sections(E),
    },
  ];
}
