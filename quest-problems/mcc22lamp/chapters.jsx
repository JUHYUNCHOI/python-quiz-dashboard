import { C, t } from "@/components/quest/theme";
import { getMcc22LampSections } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   VERIFIED SOLUTION CODE (sample → 2, 0/500 brute mismatches)
   Summed triangular brightness: count integer x with total >= k.
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from collections import defaultdict",
  "",
  "def count_ge(F, s, k, L):",
  "    if L < 0:",
  "        return 0",
  "    if s == 0:",
  "        return (L + 1) if F >= k else 0",
  "    if s > 0:",
  "        num = k - F",
  "        dmin = -(-num // s) if num > 0 else 0",
  "        return 0 if dmin > L else L - dmin + 1",
  "    else:",
  "        dmax = (k - F) // s",
  "        if dmax < 0:",
  "            return 0",
  "        return min(dmax, L) + 1",
  "",
  "def solve_one(n, k, p, b):",
  "    delta = defaultdict(int)",
  "    for pi, bi in zip(p, b):",
  "        delta[pi - bi] += 1",
  "        delta[pi]      -= 2",
  "        delta[pi + bi] += 1",
  "    xs = sorted(delta.keys())",
  "    s = 0",
  "    F = 0",
  "    total = 0",
  "    for j in range(len(xs) - 1):",
  "        s += delta[xs[j]]",
  "        lo, hi = xs[j], xs[j + 1]",
  "        total += count_ge(F, s, k, hi - lo - 1)",
  "        F += s * (hi - lo)",
  "    return total",
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n, k = int(data[idx]), int(data[idx + 1]); idx += 2",
  "        p = list(map(int, data[idx:idx + n])); idx += n",
  "        b = list(map(int, data[idx:idx + n])); idx += n",
  "        out.append(str(solve_one(n, k, p, b)))",
  "    print(\"\\n\".join(out))",
  "",
  "main()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   title+mission+problem → input+sample → concept sim → quiz
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "n lamps sit on a number line. Lamp i at position p shines brightness b right under it, fading by 1 every step away. At a position x the brightnesses of all lamps add up.\nCount the integer positions where the total brightness is at least k.",
        "수직선 위에 램프 n 개가 있어요. 위치 p 의 램프 i 는 바로 아래에서 밝기 b, 한 칸 멀어질수록 1씩 약해져요. 어떤 위치 x 에서는 모든 램프의 밝기가 더해져요.\n총 밝기가 k 이상인 정수 위치의 개수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"💡"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8b5cf6" }}>Lamp</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P6</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Count the integer positions where the lamps' total brightness is at least k.",
                "램프들의 총 밝기가 k 이상인 정수 위치의 개수를 세요.")}
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
                  {t(E, "A lamp at position ", "위치 ")}
                  <b style={{ color: "#8b5cf6" }}>p</b>
                  {t(E, " with brightness ", " 의 램프(밝기 ")}
                  <b style={{ color: "#7c3aed" }}>b</b>
                  {t(E, " shines ", ")는 위치 x 에서 ")}
                  <b style={{ color: "#7c3aed" }}>max(0, b − |p − x|)</b>
                  {t(E, " at position x — a triangular \"tent\".", " 만큼 밝아요 — 삼각형 \"텐트\" 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The total brightness at x is the ", "위치 x 의 총 밝기는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "sum over all lamps", "모든 램프의 밝기 합")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of integer positions x where the total brightness is ≥ k", "총 밝기가 k 이상인 정수 위치 x 의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. Positions p are strictly increasing; the answer counts x with total brightness ≥ k.",
        "입력 형식과 공식 예제를 봐요. 위치 p 는 오름차순이고, 답은 총 밝기가 k 이상인 x 의 개수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 수")}</div>
              <div>• {t(E, "each test: ", "각 테스트: ")}<b>n k</b> {t(E, "(lamp count, threshold)", "(램프 수, 기준값)")}</div>
              <div>• <b>p₁ … pₙ</b> — {t(E, "positions (strictly increasing)", "위치 (오름차순)")}</div>
              <div>• <b>b₁ … bₙ</b> — {t(E, "brightnesses", "밝기")}</div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
              {t(E,
                "Limits: T ≤ 2×10⁵, n ≤ 2×10⁵ (Σn ≤ 10⁵), k ≤ 10¹⁸, |p| ≤ 10¹², b ≤ 10¹². Use big integers / 64-bit.",
                "제약: T ≤ 2×10⁵, n ≤ 2×10⁵ (Σn ≤ 10⁵), k ≤ 10¹⁸, |p| ≤ 10¹², b ≤ 10¹². 큰 정수 / 64비트 필요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>1</div>
              <div>4 6</div>
              <div style={{ overflowX: "auto" }}>-5 -3 0 7</div>
              <div style={{ overflowX: "auto" }}>3 2 6 1</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>2</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Only x = −3 and x = 0 reach a total brightness of 6, so the answer is 2. The next step lets you feel why.",
              "총 밝기가 6 에 닿는 곳은 x = −3 과 x = 0 뿐이라 답은 2. 다음 단계에서 직접 느껴봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim (rendered by the App via type "deepAuditSim")
    {
      type: "deepAuditSim",
      narr: t(E,
        "Each lamp is a triangular tent; the bars show the SUMMED brightness at every integer x. Drag k up and down, and bump each lamp's brightness b — watch which positions stay above the line, and notice the hill only bends at the breakpoints p−b, p, p+b.",
        "램프 하나하나가 삼각 텐트예요. 막대는 모든 정수 x 에서의 합쳐진 밝기예요. k 를 올리고 내려 보고, 각 램프의 밝기 b 도 바꿔 봐요 — 어떤 위치가 선 위에 남는지 보고, 언덕이 꺾이는 곳이 p−b, p, p+b 뿐임을 확인해요."),
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "One lamp at p=0 with b=6 shines 6 at x=0, then 5,4,3,… stepping away. A second lamp at p=−3 with b=2 shines 2 at x=−3, 1 at x=−2 and x=−4. Add them up at each x.",
        "p=0, b=6 램프는 x=0 에서 6, 멀어지며 5,4,3,… 이에요. p=−3, b=2 램프는 x=−3 에서 2, x=−2 와 x=−4 에서 1 이에요. 각 x 에서 더해요."),
      question: t(E,
        "Two lamps: (p=0, b=6) and (p=−3, b=2). What is the total brightness at x = −3?",
        "램프 둘: (p=0, b=6), (p=−3, b=2). x = −3 에서 총 밝기는?"),
      options: [
        t(E, "5", "5"),
        t(E, "6", "6"),
        t(E, "3", "3"),
      ],
      correct: 0,
      explain: t(E,
        "The lamp at p=0 gives max(0, 6 − |0−(−3)|) = 6 − 3 = 3. The lamp at p=−3 gives max(0, 2 − 0) = 2. Add them: 3 + 2 = 5. Every position's total is just the sum of the tents.",
        "p=0 램프는 max(0, 6 − |0−(−3)|) = 6 − 3 = 3. p=−3 램프는 max(0, 2 − 0) = 2. 더하면 3 + 2 = 5. 어느 위치든 총 밝기는 텐트들의 합이에요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps) — slow vs fast plan → progressive code
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22LampCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way visits every integer position and sums every lamp: with positions spanning up to 10^12 that is impossible. The fast way turns each lamp into three slope events (+1, −2, +1), sweeps only the breakpoints, and counts integers per straight segment with exact arithmetic.",
        "느린 방법은 모든 정수 위치를 방문해 모든 램프를 더해요: 위치가 최대 10^12 까지 퍼지니 불가능해요. 빠른 방법은 램프마다 기울기 이벤트 3개(+1, −2, +1)로 바꿔 꺾인점만 훑고, 직선 구간마다 정수를 정확한 계산으로 세요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: check every position, sum every lamp", "느림: 모든 위치를 돌며 모든 램프 더하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Positions can span 10^12 and there are up to 10^5 lamps — visiting each x is hopeless. Times out.",
                  "위치는 10^12 까지 퍼지고 램프는 최대 10^5 개 — x 를 하나씩 방문하는 건 불가능. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: slope events + sweep the breakpoints", "빠름: 기울기 이벤트 + 꺾인점 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "Each tent = +1 at p−b, −2 at p, +1 at p+b. Sort the 3n breakpoints, sweep once, and count integers per segment. About n log n per test.",
                  "각 텐트 = p−b 에 +1, p 에 −2, p+b 에 +1. 꺾인점 3n 개를 정렬해 한 번 훑고, 구간마다 정수를 세요. 테스트당 약 n log n.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22LampSections(E),
    },
  ];
}
