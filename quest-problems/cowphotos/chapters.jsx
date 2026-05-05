import { C, t } from "@/components/quest/theme";
import { getCowPhotosSections } from "./components";

export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    from collections import Counter",
  "    freq = Counter(h)",
  "    # Bitonic + symmetric + no adjacent dups",
  "    # = palindrome that increases then decreases",
  "    # = odd-length: [a,b,...,peak,...,b,a]",
  "    # Each value except peak appears even times",
  "    # Peak appears odd times (1)",
  "    # Maximize: greedily use pairs of each value",
  "    total = 0",
  "    has_odd = False",
  "    for v, cnt in freq.items():",
  "        total += (cnt // 2) * 2",
  "        if cnt % 2 == 1:",
  "            has_odd = True",
  "    if has_odd:",
  "        total += 1  # one peak",
  "    # But need no adjacent duplicates in the result",
  "    # For palindrome: each pair contributes 2 positions",
  "    # All pairs must be different values → already handled",
  "    print(total)",
];

export function makeCowPhotosCh1(E) {
  return [
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
                  {t(E, "The row must be ", "그 줄은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "bitonic", "바이토닉")}</b>
                  {t(E, " (go UP then DOWN) AND ", " (올랐다 내려옴) 이고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "symmetric", "대칭")}</b>
                  {t(E, " (palindrome — mirrors around the peak).",
                        " (팰린드롬 — 가운데를 기준으로 좌우 대칭)이어야 해요.")}
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
    // 1-2: Hand-trace — frequency → pairs + optional peak
    {
      type: "reveal",
      narr: t(E,
        "Walk a small example. Count how many cows of each height we have, take pairs out (each pair becomes the symmetric left+right slot), and keep one extra as the peak if any height has an odd count.",
        "작은 예시를 따라가요. 각 키의 소가 몇 마리인지 세고, 쌍씩 빼내서 (각 쌍 = 좌+우 대칭 자리), 어떤 키든 홀수가 있으면 1 마리를 가운데 정점으로 남겨요."),
      content: (() => {
        const heights = [1, 1, 2, 3, 3, 3, 4];
        const freq = {};
        heights.forEach(h => freq[h] = (freq[h] || 0) + 1);
        let pairs = 0, leftover = false;
        const rows = Object.keys(freq).sort((a, b) => +a - +b).map(h => {
          const c = freq[h];
          const p = Math.floor(c / 2);
          const odd = c % 2 === 1;
          pairs += p;
          if (odd) leftover = true;
          return { h: +h, count: c, pairs: p, odd };
        });
        const total = pairs * 2 + (leftover ? 1 : 0);
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", textAlign: "center", marginBottom: 4 }}>
              ✏️ {t(E, "Hand-trace on heights [1, 1, 2, 3, 3, 3, 4]", "키 [1, 1, 2, 3, 3, 3, 4] 손으로 따라가기")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 12 }}>
              {t(E, "Goal: find the longest bitonic-symmetric photo with no adjacent dups.",
                    "목표: 인접 중복 없는 가장 긴 바이토닉-대칭 사진.")}
            </div>
            {/* Per-height table */}
            <div style={{ display: "grid", gridTemplateColumns: "60px 70px 70px 1fr", gap: "4px 8px", fontSize: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>{t(E, "height", "키")}</div>
              <div style={{ fontWeight: 800, color: "#5b21b6", textAlign: "right" }}>{t(E, "count", "수")}</div>
              <div style={{ fontWeight: 800, color: "#5b21b6", textAlign: "right" }}>{t(E, "pairs", "쌍")}</div>
              <div style={{ fontWeight: 800, color: "#5b21b6" }}>{t(E, "leftover?", "남는 거?")}</div>
              {rows.map((r, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#7c3aed" }}>{r.h}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", textAlign: "right" }}>{r.count}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, textAlign: "right", color: "#16a34a" }}>{r.pairs}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", color: r.odd ? "#dc2626" : C.dim }}>
                    {r.odd ? `1 ${t(E, "extra (could be peak)", "남음 (정점 후보)")}` : t(E, "none", "없음")}
                  </div>
                </div>
              ))}
            </div>
            {/* Result formula */}
            <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", marginBottom: 6 }}>
                🧮 {t(E, "Formula", "공식")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace" }}>
                total = 2 × pairs + (1 {t(E, "if any height has an odd count", "홀수 있으면")} else 0)<br/>
                = 2 × {pairs} + {leftover ? 1 : 0} = <b style={{ color: "#16a34a", fontSize: 14 }}>{total}</b>
              </div>
            </div>
            {/* One concrete arrangement */}
            <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 4 }}>
                {t(E, "One valid photo of length ", "길이 ")}{total}{t(E, ":", " 인 유효한 사진:")}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, color: "#15803d", fontSize: 14 }}>
                [1, 3, 4, 3, 1] {leftover ? "  (peak = 4)" : ""}
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
                {t(E, "Each pair (1,1) and (3,3) sits symmetrically on both sides; height 4 takes the peak.",
                      "쌍 (1,1) 과 (3,3) 이 양쪽으로 대칭, 키 4 는 가운데 정점.")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    {
      type: "quiz",
      narr: t(E,
        "Example: heights [1,1,2,3].\nValid arrangement: [1,3,1] — bitonic ✓, symmetric ✓, no adjacent dups ✓.\nLength = 3.", "예: 키 [1,1,2,3]. 유효한 배열: [1,3,1] — 바이토닉 ✓, 대칭 ✓, 인접 중복 없음 ✓. 길이 = 3."),
      question: t(E,
        "Which of these is a valid arrangement?",
        "유효한 배열은?"),
      options: [
        "[1, 2, 3, 2, 1]",
        "[1, 2, 2, 1]",
        "[3, 2, 1, 2, 3]",
      ],
      correct: 0,
      explain: t(E, "Bitonic ✓, palindrome ✓, no adjacent dups ✓. [1,2,2,1] has adjacent 2s!", "바이토닉 ✓, 팰린드롬 ✓, 인접 중복 없음 ✓. [1,2,2,1]은 인접 2가 있어요!"),
    },
    {
      type: "input",
      narr: t(E,
        "Heights = [3,3,2,1].\nCan we use all 4?\n[1,3,3,1] has adjacent 3s.\n[1,3,1] works but only uses 3.\nBest length?", "키 = [3,3,2,1]. 4개 다 쓸 수 있어요? [1,3,3,1]은 인접 3. [1,3,1]은 되지만 3개만. 최대 길이?"),
      question: t(E, "Max valid photo length for [3,3,2,1]?", "[3,3,2,1]의 최대 유효 사진 길이?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "3 phases: heights → Counter → final palindrome arrangement.", "3단계: 키 → Counter → 최종 팰린드롬 배열."),
    },
  ];
}

export function makeCowPhotosCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Each ring of the palindrome uses 2 cows of the same value (one on each side of the peak).\nA value can be a ring only if its count ≥ 2.",
        "팰린드롬 각 링은 같은 값 2마리 사용 (피크 양쪽).\n빈도 ≥ 2인 값만 링이 될 수 있음."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Frequency count", "빈도 세기"), code: "freq = Counter(h)", color: "#d97706" },
              { n: 2, label: t(E, "Count pair-eligible breeds", "페어 가능 품종 세기"), code: "pairs = sum(1 for c in freq.values() if c >= 2)", color: "#0891b2" },
              { n: 3, label: t(E, "2 × pairs + peak", "2 × pairs + 피크"), code: "ans = 2 * pairs + (1 if any cow else 0)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass for Counter + breed loop", "Counter 한 번 + 품종 루프")}</div>
          </div>
        </div>),
    },
    // 2-2: TLE check — does this fit?
    {
      type: "reveal",
      narr: t(E,
        "Does the frequency approach fit in time? Check the constraints — for cowphotos brute over arrangements would be exponential, so the formula is the saving grace.",
        "빈도 방식이 시간 안에 들어올까? 제약 봐요. 만약 모든 배열을 시도하는 브루트라면 지수 — 그래서 공식이 답이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            ✅ {t(E, "TLE check — formula passes easily", "타임아웃 체크 — 공식은 여유 통과")}
          </div>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>
              <div style={{ fontWeight: 800 }}>N</div>     <div>{t(E, "≤ 10⁵ heights per test, T ≤ 10 tests", "테스트당 ≤ 10⁵, T ≤ 10")}</div>
              <div style={{ fontWeight: 800 }}>{t(E, "brute (try all arrangements)", "모든 배열 브루트")}</div>
              <div style={{ color: "#dc2626" }}>{t(E, "≈ N! permutations — impossible", "≈ N! 순열 — 불가능")}</div>
              <div style={{ fontWeight: 800 }}>{t(E, "frequency formula", "빈도 공식")}</div>
              <div>O(N) per test → {t(E, "total ≈ 10⁶", "총 ≈ 10⁶")}</div>
              <div style={{ fontWeight: 800, color: "#16a34a" }}>판정</div>
              <div style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "Formula is the only feasible plan ✓", "공식 외에는 답이 없음 ✓")}</div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "💡 Key insight: we don't need to BUILD the photo, just count its length. The pair-counting formula gives the answer in O(N) without enumerating arrangements.",
                    "💡 핵심: 사진을 만들 필요 X, 길이만 세면 됨. 쌍 세기 공식이 배열 안 만들고 O(N) 으로 답.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the frequency-based solution step by step.", "빈도 기반 솔루션을 단계별로 만들자."),
      sections: getCowPhotosSections(E),
    },
    {
      type: "runner",
      narr: t(E, "Try your own heights.", "직접 키 시도."),
    },
  ];
}
