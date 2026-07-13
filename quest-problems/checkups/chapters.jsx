import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, DiagonalSim, MatchUpToSim, DiagPrefixSim } from "./components";
import { CheckupsBruteRunner, CheckupsIntroSim, CheckupsMirrorSim, CheckupsGrowSim, CheckupsTrySim, CheckupsReuseSim, CheckupsKeyCodeSim, CheckupsEnumSim, CheckupsFinalCodeSim, CheckupsWindowSplitSim, CheckupsWindowRecapSim, CheckupsOutPrefixSim, CheckupsInPrefixSim, CheckupsExpandSim } from "./sims";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

// (예전 정적 시각화 헬퍼 SpeciesCell/CowRow/TreatedRow/PositionRow 는
//  1-1 이 CheckupsIntroSim 으로, 1-5 가 삭제되며 더 안 쓰여서 제거함.)

// Reference solution — full O(N²) version (matches `solution_py` in quest-meta).
export function makeCheckupsCh1(E) {
  return [
    /* 1-1 — Problem rules straight from the official statement. */
    {
      type: "reveal",
      narr: t(E,
        "Cows stand in a row. Each cow has a species, written as a number. The vet has already decided, for each spot, which species it will treat there — and it treats the cow at that spot only when the cow's species matches. FJ flips one chunk of cows to change who gets treated.",
        "소들이 한 줄로 서 있어요. 소마다 '종'이 있고 숫자로 적어요. 수의사는 자리마다 '여기선 몇 번 종을 치료하겠다'를 미리 정해뒀어요 — 그 자리에 선 소의 종이 정해둔 종과 같을 때만 치료해줘요. FJ 는 소 한 구간을 통째로 뒤집어서 누가 치료받는지를 바꿔요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 26 }}>🐮</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#dc2626" }}>Cow Checkups</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>USACO Jan 2025 Bronze #3</div>
          </div>

          {/* 단계별 시뮬 — 자리마다 비교 + 뒤집기를 말풍선으로 (선생님: '시뮬로 동작에 따라 말풍선') */}
          <CheckupsIntroSim E={E} />

          {/* 윗줄/아랫줄 설명은 시뮬이 하므로 큰 박스는 제거 — b[i]·입력형식만 한 줄로 남김 (선생님 판단 위임) */}
          <div style={{ marginTop: 2, marginBottom: 10, fontSize: 11.5, color: C.dim, textAlign: "center", lineHeight: 1.6, wordBreak: "keep-all" }}>
            📝 {t(E, "Input: N, then row a, then row b.  In code top = a, bottom = b → b[i] = the species chosen for spot i.",
                   "입력: N → 윗줄(a) → 아랫줄(b).  코드에선 윗줄=a, 아랫줄=b → b[i] = i 번째 자리에 정해둔 종.")}
          </div>

          {/* 출력이 뭔지 */}
          <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: "#166534", lineHeight: 1.65, wordBreak: "keep-all" }}>
            📤 <b>{t(E, "Output", "출력")}</b> — {t(E, "Flipping can be done many ways. For each possible check-count 0, 1, …, N, print how many flips give exactly that count (one number per line).",
                     "뒤집는 방법은 여러 가지. 검진 수가 0, 1, …, N 인 경우가 각각 몇 가지인지 한 줄씩 출력.")}
          </div>

          <div style={{ padding: "7px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11, color: "#5b21b6", lineHeight: 1.6 }}>
            📐 <span style={{ fontWeight: 600 }}>{t(E, "Limits", "제약")}:</span>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 7500</code>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 verbatim with all 4 output lines explained. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample 1: N=3 cows.  Take a look — input is 3 lines, output is 4 lines (one per checkup count 0..N).",
        "공식 샘플 1: N=3. 입력 3 줄, 출력 4 줄 (검진 수 0..N 각각)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
1 3 2
3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
3
0
0`}
              </div>
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              🔍 {t(E, "6 reversals → group by how many got checked", "뒤집기 6가지 → 검진된 수별로 묶기")}
            </div>
            {[
              { c: 0, n: 3, note: t(E, "the 3 length-1 ops (nothing flips)", "길이 1 연산 3개 (안 바뀜)") },
              { c: 1, n: 3, note: t(E, "the 3 real reversals", "진짜 뒤집기 3개") },
              { c: 2, n: 0, note: "" },
              { c: 3, n: 0, note: "" },
            ].map((row) => (
              <div key={row.c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ width: 56, fontSize: 11.5, fontWeight: 600, color: "#5b21b6" }}>{t(E, `check ${row.c}`, `검진 ${row.c}`)}</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <span key={i} style={{ width: 15, height: 15, borderRadius: 3, background: i < row.n ? "#8b5cf6" : "#e9d5ff" }} />
                  ))}
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#5b21b6", minWidth: 26 }}>{row.n}{t(E, "", "개")}</span>
                {row.note && <span style={{ fontSize: 10.5, color: C.dim }}>← {row.note}</span>}
              </div>
            ))}
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
              → {t(E, "output, one per line:", "출력 (한 줄에 하나씩):")}{" "}
              <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>3 / 3 / 0 / 0</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2b — '구간은 입력이 아니라 우리가 다 해본다' 를 시뮬로 (선생님 2026-06-24: 설명 말고 흐름에서 저절로). */
    {
      type: "reveal",
      narr: t(E,
        "Where does that 3, 3, 0, 0 come from? The flip isn't given — we try all 6 segments ourselves and tally by checkup count.",
        "그 3, 3, 0, 0 은 어디서 나올까요? 뒤집을 곳은 안 주어져요 — 6가지 구간을 우리가 다 해보고 검진 수별로 모아요."),
      content: (<CheckupsEnumSim E={E} />),
    },

    /* (옛 1-3 ReverseSim 삭제 — 1-1 인터랙티브 시뮬과 중복 + 점선 매핑이 보기 어려움.
        ReverseSim 은 🔒 components.jsx 라 손 못 대므로 스텝 자체를 뺌. 선생님 검토) */

    /* 1-3 — Quiz on understanding the operation. */
    {
      type: "quiz",
      narr: t(E,
        "Quick check on what a reversal does — only positions [l, r] flip, the rest stay put.",
        "뒤집기가 뭘 바꾸는지 확인 — [l, r] 위치만 뒤집히고 나머지는 그대로."),
      question: t(E,
        "After reversing a[2..4] of a=[5, 1, 2, 3, 4], what is a[3]?",
        "a=[5, 1, 2, 3, 4] 의 a[2..4] 를 뒤집은 후, a[3] 의 값은?"),
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain: t(E,
        "Positions 2..4 hold values [1, 2, 3]. Reversed → [3, 2, 1]. So new a = [5, 3, 2, 1, 4], and a[3] = 2.",
        "위치 2..4 의 값 [1, 2, 3] 을 뒤집으면 [3, 2, 1]. 새 a = [5, 3, 2, 1, 4], a[3] = 2."),
    },

    /* 1-4 — Input quiz on a tiny example. */
    {
      type: "input",
      narr: t(E,
        "Your turn — count checkups on a tiny case.",
        "직접 — 작은 케이스에서 검진 수 세 봐."),
      question: t(E,
        "Checkups after reversing a[1..2] of a=[1, 2] vs b=[2, 1]?",
        "a=[1, 2] 의 a[1..2] 뒤집기 후 b=[2, 1] 와 비교 시 검진 수?"),
      hint: t(E,
        "Reverse a[1..2] in your head, then compare each spot to b position by position.",
        "머릿속으로 a[1..2] 를 뒤집어 본 뒤, b 와 자리별로 하나씩 비교해 봐."),
      answer: 2,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 2 — 🐢 First Try (brute force).
   The obvious O(N³): try every (l, r), reverse, count. Build it section by
   section, RUN it live (feel it crawl), then see why N = 7500 times out.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh2(E, lang = "py") {
  return [
    /* 2-1 — Light, narrative intro. */
    {
      type: "reveal",
      narr: t(E,
        "Just write the obvious thing first.  Try every (l, r), reverse, count matches.  Read the code section by section.",
        "일단 눈에 보이는 대로 짜요. (l, r) 다 돌려보고, 뒤집고, 일치 수 세기. 코드를 한 단락씩 읽어요."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "We have a small N. The straight-forward solution is fine for partial credit and reads as a 1:1 translation of the problem statement. Sections below build it line by line — read the code as you'd read a story.",
            "N 이 크지 않아요. 가장 직접적인 풀이로 부분점수 받기에 충분하고, 코드도 문제 설명을 그대로 옮긴 모양이에요. 아래 섹션들이 한 단락씩 코드 쌓아가요 — 그냥 코드를 이야기 읽듯 읽어보세요.")}
        </div>),
    },

    /* 2-2..2-5 — Brute code sections (1️⃣..4️⃣) [결-a]. */
    ...getCheckupsSections(E).slice(0, 4).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build brute step by step (1️⃣–4️⃣). It's the literal translation of the problem statement — fine for partial credit.",
              "brute 를 한 단락씩 (1️⃣–4️⃣). 문제 그대로 옮긴 모양 — 부분점수에 충분.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    /* 2-6 — RUN the brute force live: feel it crawl as N grows. */
    {
      type: "reveal",
      narr: t(E,
        "Now RUN it.  Try N = 50, then 200, then 600 — watch the time jump.  Three nested loops means triple the trouble.",
        "이제 직접 돌려봐요. N = 50 → 200 → 600 순서로 — 시간이 어떻게 뛰는지 봐요. 루프 세 겹 = 세 배의 고통."),
      content: (<CheckupsBruteRunner E={E} />),
    },

    /* 2-7 — predict quiz: how does the work grow? (active step) */
    {
      type: "quiz",
      narr: t(E,
        "You just watched it slow down.  Predict the pattern before reading on.",
        "방금 느려지는 걸 봤죠. 다음으로 넘어가기 전에 패턴을 예측해 봐요."),
      question: t(E,
        "If N doubles (say 300 → 600), roughly how much MORE work does the brute force do?",
        "N 이 두 배가 되면 (예: 300 → 600), brute 가 하는 일은 대략 몇 배로 늘까요?"),
      options: [
        t(E, "About 2× (twice the work)", "약 2 배"),
        t(E, "About 4× (squared)", "약 4 배 (제곱)"),
        t(E, "About 8× (cubed)", "약 8 배 (세제곱)"),
        t(E, "No change", "변화 없음"),
      ],
      correct: 2,
      explain: t(E,
        "Three nested loops → O(N³).  Doubling N multiplies work by 2³ = 8.  That's why 600 felt so much slower than 300.",
        "루프 세 겹 → O(N³). N 을 두 배로 하면 일은 2³ = 8 배. 그래서 600 이 300 보다 훨씬 느렸어요."),
    },

    /* 2-8 — [결-b 한계] why brute times out on N=7500. */
    {
      type: "reveal",
      narr: t(E,
        "Submit brute — small inputs pass, big ones time out.  Here's the math behind what you just felt.",
        "brute 제출 — 작은 입력은 통과, 큰 입력은 시간 초과. 방금 느낀 걸 숫자로 확인해 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#991b1b", textAlign: "center", marginBottom: 12 }}>
              🚨 {t(E, "Why brute fails", "brute 가 왜 무너지는가")}
            </div>

            <div style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
                {t(E, "Per (l, r) brute does:", "(l, r) 마다 brute 는:")}
              </div>
              <div style={{ marginLeft: 12, fontSize: 12.5 }}>
                · {t(E, "Up to N reversed-position lookups + N comparisons → ", "뒤집은 위치 조회 + 비교 최대 N 번 → ")}
                <code style={{ background: "#fef3c7", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>O(N)</code>
              </div>
              <div style={{ marginLeft: 12, fontSize: 12.5, marginTop: 4 }}>
                · {t(E, "Pairs (l, r): N(N+1)/2 ≈ N² / 2 → ", "쌍 (l, r): N(N+1)/2 ≈ N² / 2 → ")}
                <code style={{ background: "#fef3c7", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>O(N²)</code>
              </div>
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>
                = O(N³) {t(E, "total", "총합")}
              </div>
            </div>

            {/* Concrete numbers grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
              {[
                { n: "100",   ops: "10⁶",     ms: "~10ms",   ok: true,  label: t(E, "tiny",   "작음") },
                { n: "1,000", ops: "10⁹",     ms: "~10s",    ok: false, label: t(E, "borderline", "경계") },
                { n: "7,500", ops: "≈4·10¹¹", ms: "~hours",  ok: false, label: t(E, "TLE",    "TLE") },
              ].map((row) => (
                <div key={row.n} style={{
                  background: row.ok ? "#dcfce7" : "#fee2e2",
                  border: `1.5px solid ${row.ok ? "#86efac" : "#fca5a5"}`,
                  borderRadius: 8, padding: 8, textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: row.ok ? "#15803d" : "#991b1b", fontWeight: 600, marginBottom: 2 }}>
                    N = {row.n}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: row.ok ? "#166534" : "#7f1d1d" }}>
                    {row.ops}
                  </div>
                  <div style={{ fontSize: 11, color: row.ok ? "#166534" : "#7f1d1d", marginTop: 2 }}>
                    {row.ms}
                  </div>
                  <div style={{ fontSize: 10, color: row.ok ? "#15803d" : "#991b1b", marginTop: 2, fontWeight: 600 }}>
                    {row.ok ? "✓" : "✗"} {row.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "#7c2d12", lineHeight: 1.6 }}>
              💡 {t(E,
                "Constraint says N ≤ 7,500.  We need to drop one factor of N — turn O(N) per pair into O(1).  Next chapter: a key observation that lets us do exactly that.",
                "제약: N ≤ 7,500. N 한 겹을 빼야 — 쌍당 O(N) 을 O(1) 로. 다음 챕터: 그게 가능한 핵심 관찰.")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 3 — 💡 Fast Idea.
   The "same diagonal, same comparison" observation, taught entirely through
   three interactive sims. No walls of pseudo-code — the visuals carry it.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh3(E, lang = "py") {
  // center-expansion 풀이 (선생님 2026-07-02: prefix 걷어내고 이 방식으로 재구성).
  // ① ExpandSim 한 방에 WHY(대칭→가운데 그대로)+HOW(두 끝만 −1/+1) → ② 능동 퀴즈 → ③ 결(O(N²)).
  return [
    /* 3-1 — 핵심 시뮬: center-expansion (왜 두 끝만, 어떻게 세나) */
    {
      type: "reveal",
      narr: t(E,
        "Recounting every interval from scratch is too slow. Let's try a smarter way — start with a tiny interval, then grow it one step at a time and see what changes. Watch it unfold below.",
        "구간마다 처음부터 다 세면 너무 느려요. 더 똑똑한 방법 — 작은 구간 하나로 시작해서, 한 칸씩 넓혀가며 뭐가 어떻게 바뀌는지 아래 시뮬로 하나씩 봐요."),
      content: (<CheckupsExpandSim E={E} />),
    },

    /* (3-2 퀴즈 제거 — ExpandSim 이 방금 '두 끝만'을 보여줬는데 바로 재질문이라 잉여. 선생님 2026-07-02.) */

    /* 3-3 — 결(payoff): brute O(N³) → center-expansion O(N²) */
    {
      type: "reveal",
      narr: t(E, "So — how much faster?", "그래서 — 얼마나 빨라졌나?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 12 }}>
            🚀 {t(E, "So how much faster?", "그래서 — 얼마나 빨라졌나")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#991b1b", marginBottom: 5 }}>🐢 {t(E, "Brute", "브루트포스")}</div>
              <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.6, wordBreak: "keep-all" }}>
                {t(E, "Each interval = recount all N spots", "구간마다 = N칸 다시 셈")}<br />
                <span style={{ fontSize: 10.5, opacity: 0.85 }}>{t(E, "~N² intervals × N", "구간 ~N²개 × N칸")}</span><br />
                <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>O(N³)</code> → {t(E, "too slow", "느림")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 5 }}>⚡ {t(E, "Center-expansion", "가운데 넓히기")}</div>
              <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.6, wordBreak: "keep-all" }}>
                {t(E, "Widen from center = fix only 2 ends", "가운데서 넓히며 = 두 끝만 갱신")}<br />
                <span style={{ fontSize: 10.5, opacity: 0.85 }}>{t(E, "each widen = O(1)", "한 번 넓힐 때 O(1)")}</span><br />
                <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>O(N²)</code> → {t(E, "passes", "통과")}
              </div>
            </div>
          </div>

          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: "12px 14px", fontSize: 12.5, color: "#155e75", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
            {t(E,
              "We never recount the middle — reversing is symmetric, so widening only swaps in two new ends. One whole factor of N gone. Each interval's checkup count goes into a tally box, and that tally is the answer.",
              "가운데는 다시 안 세요 — 뒤집기가 대칭이라 넓혀도 두 끝만 새로 들어와요. N 한 겹이 통째로 사라져요. 구간마다 검진 수를 통(answer)에 넣으면, 그 통이 답이에요.")}
            <div style={{ marginTop: 8, fontWeight: 800, color: "#0e7490", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
              {t(E, "every interval → +1 to answer[checkups] → output", "모든 구간 → answer[검진수]에 +1 → 출력")}
            </div>
          </div>
        </div>),
    },

    /* 3-4 — '가운데서 넓히기' 한눈에 정리 (선생님 2026-07-03: 학술 카드 → 학생 말투·구체로 재작성) */
    {
      type: "reveal",
      narr: t(E, "Wrap-up — 'widen from the center', in one look.",
                 "정리 — '가운데서 넓히기' 한눈에."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0e7490", textAlign: "center", marginBottom: 12, wordBreak: "keep-all" }}>
            📌 {t(E, "'Widen from the center' — in one look", "'가운데서 넓히기' — 한눈에")}
          </div>

          <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 10, padding: "10px 13px", marginBottom: 9, fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.75, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>💡 {t(E, "In one line", "한 줄로")}</div>
            {t(E,
              "Don't recount each interval from scratch. Start at its center and widen one step at a time — the only cells that change are the two outer ends. The middle stays the same even after flipping.",
              "구간마다 처음부터 다시 세지 말자. 가운데에서 한 칸씩 넓히면, 새로 바뀌는 건 양쪽 끝 두 칸뿐이에요. 가운데는 뒤집어도 그대로거든요.")}
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 13px", marginBottom: 9, fontSize: 12.5, color: "#065f46", lineHeight: 1.75, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>✅ {t(E, "Why it's fast", "왜 빨라")}</div>
            {t(E,
              "It never actually reverses, and never recounts the middle. Each widen fixes just two cells — so it's about N times faster than brute force. Fast enough to pass.",
              "실제로 뒤집지도, 가운데를 다시 세지도 않아요. 한 번 넓힐 때 딱 두 칸만 고치니까 — 브루트포스보다 N배쯤 빨라져서 통과해요.")}
          </div>

          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 13px", marginBottom: 9, fontSize: 12.5, color: "#92400e", lineHeight: 1.75, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>⚠️ {t(E, "When does this work?", "언제 이게 통해?")}</div>
            {t(E,
              "Only when widening changes just the two ends — a mirror-like structure where the middle stays put (like reversing). It's not a one-size-fits-all trick.",
              "'넓혀도 양 끝만 바뀌는' 문제일 때만 써요. 뒤집기처럼 가운데가 거울처럼 그대로인 구조. 아무 문제에나 되는 만능은 아니에요.")}
          </div>

          <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "10px 13px", fontSize: 12.5, color: "#5b21b6", lineHeight: 1.75, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>🎯 {t(E, "You'll meet it again", "딴 데서도 만나")}</div>
            {t(E,
              "This same 'expand from the center' shows up when finding palindromes — words that read the same backward, like 'level' or 'noon'. Learn it once, meet it again.",
              "이 '가운데서 넓히기'는 팰린드롬(거꾸로 읽어도 같은 낱말 — '기러기', 'level') 찾을 때도 똑같이 써요. 한 번 익혀두면 여러 문제에서 다시 만나요.")}
          </div>
        </div>),
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 4 — ⚡ Code.
   center-expansion O(N²) 코드: baseMatches → expand(두 끝만) → 모든 중심 → 전체.
   (코드는 이 파일에 인라인 정의; components.jsx 의 옛 prefix 코드는 미사용.)
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh4(E, lang = "py") {
  // center-expansion 코드 (선생님 검증). 코드 조각을 chapters.jsx 안에 인라인으로 정의 →
  // CodeSectionView 로 렌더 (🔒 components.jsx 의 옛 prefix 코드는 안 건드림). 선생님 2026-07-02.
  const sec = (label, color, py, cpp, why) => ({ label, color, py, cpp, why });

  const secBase = sec(
    t(E, "1️⃣ baseMatches — matches with no flip", "1️⃣ baseMatches — 안 뒤집었을 때 맞는 수"), "#0d9488",
    ["N = int(input())",
      "cow  = list(map(int, input().split()))",
      "want = list(map(int, input().split()))",
      "",
      "# 아무것도 안 뒤집었을 때 맞는 자리 수 = 모든 구간의 출발점",
      "baseMatches = sum(1 for i in range(N) if cow[i] == want[i])"],
    ["int N; cin >> N;",
      "vector<int> cow(N), want(N);",
      "for (int &x : cow)  cin >> x;",
      "for (int &x : want) cin >> x;",
      "",
      "// 안 뒤집었을 때 맞는 자리 수 = 출발점",
      "int baseMatches = 0;",
      "for (int i = 0; i < N; i++)",
      "    if (cow[i] == want[i]) baseMatches++;"],
    [t(E, "Every interval's checkup count starts from baseMatches (the no-flip matches).",
        "모든 구간의 검진 수는 baseMatches(안 뒤집었을 때 맞는 수)에서 출발해요.")]
  );

  const secExpand = sec(
    t(E, "2️⃣ expand — widen from a center, fix only 2 ends", "2️⃣ expand — 가운데서 넓히며 두 끝만 갱신"), "#15803d",
    ["# 구간을 중심에서 양옆으로 넓히며, 새로 들어온 두 끝만 갱신",
      "def expand(cow, want, answer, matches, left, right):",
      "    N = len(cow)",
      "    while left >= 0 and right < N:",
      "        # 제자리로 맞던 것 빼고(−), 뒤집혀 새로 맞으면 더함(+)",
      "        if cow[left]  == want[left]:  matches -= 1",
      "        if cow[right] == want[right]: matches -= 1",
      "        if cow[left]  == want[right]: matches += 1",
      "        if cow[right] == want[left]:  matches += 1",
      "        answer[matches] += 1",
      "        left  -= 1",
      "        right += 1"],
    ["// 구간을 중심에서 넓히며 새로 들어온 두 끝만 갱신",
      "void expand(const vector<int>& cow, const vector<int>& want,",
      "            vector<int>& answer, int matches, int left, int right) {",
      "    int N = cow.size();",
      "    while (left >= 0 && right < N) {",
      "        // 제자리로 맞던 것 빼고(−), 뒤집혀 새로 맞으면 더함(+)",
      "        if (cow[left]  == want[left])  matches--;",
      "        if (cow[right] == want[right]) matches--;",
      "        if (cow[left]  == want[right]) matches++;",
      "        if (cow[right] == want[left])  matches++;",
      "        answer[matches]++;",
      "        left--;",
      "        right++;",
      "    }",
      "}"],
    [t(E, "matches starts at baseMatches. Each widen touches only left,right: remove the old in-place match (−), add the new flipped match (+).",
        "matches는 baseMatches에서 시작. 한 번 넓힐 때 left,right만: 원래 맞던 것 빼고(−), 뒤집혀 새로 맞으면 더함(+)."),
     t(E, "answer[matches] += 1 records this interval's checkup count.",
        "answer[matches] += 1 로 이 구간의 검진 수를 기록.")]
  );

  const secMain = sec(
    t(E, "3️⃣ Run every center + print", "3️⃣ 모든 중심 돌기 + 출력"), "#0891b2",
    ["answer = [0] * (N + 1)   # answer[k] = 검진 k 인 구간 개수",
      "",
      "# 모든 중심: 홀수 길이(i,i), 짝수 길이(i,i+1)",
      "for i in range(N):",
      "    expand(cow, want, answer, baseMatches, i, i)",
      "    expand(cow, want, answer, baseMatches, i, i + 1)",
      "",
      "print('\\n'.join(map(str, answer)))"],
    ["vector<int> answer(N + 1, 0);   // answer[k] = 검진 k 인 구간 개수",
      "",
      "// 모든 중심: 홀수 길이(i,i), 짝수 길이(i,i+1)",
      "for (int i = 0; i < N; i++) {",
      "    expand(cow, want, answer, baseMatches, i, i);",
      "    expand(cow, want, answer, baseMatches, i, i + 1);",
      "}",
      "",
      "for (int k = 0; k <= N; k++) cout << answer[k] << \"\\n\";"],
    [t(E, "Odd center [i,i] = one spot (no flip). Even center [i,i+1] = two spots. Both for every i → every interval exactly once.",
        "홀수 중심 [i,i]=한 칸(안 뒤집음). 짝수 중심 [i,i+1]=두 칸. i마다 둘 다 → 모든 구간 딱 한 번씩.")]
  );

  const secFull = sec(
    t(E, "4️⃣ Full code", "4️⃣ 전체 코드"), "#15803d",
    ["import sys",
      "input = sys.stdin.readline",
      "",
      "def expand(cow, want, answer, matches, left, right):",
      "    N = len(cow)",
      "    while left >= 0 and right < N:",
      "        if cow[left]  == want[left]:  matches -= 1",
      "        if cow[right] == want[right]: matches -= 1",
      "        if cow[left]  == want[right]: matches += 1",
      "        if cow[right] == want[left]:  matches += 1",
      "        answer[matches] += 1",
      "        left  -= 1",
      "        right += 1",
      "",
      "N = int(input())",
      "cow  = list(map(int, input().split()))",
      "want = list(map(int, input().split()))",
      "",
      "baseMatches = sum(1 for i in range(N) if cow[i] == want[i])",
      "answer = [0] * (N + 1)",
      "",
      "for i in range(N):",
      "    expand(cow, want, answer, baseMatches, i, i)",
      "    expand(cow, want, answer, baseMatches, i, i + 1)",
      "",
      "print('\\n'.join(map(str, answer)))"],
    ["#include <iostream>",
      "#include <vector>",
      "using namespace std;",
      "",
      "void expand(const vector<int>& cow, const vector<int>& want,",
      "            vector<int>& answer, int matches, int left, int right) {",
      "    int N = cow.size();",
      "    while (left >= 0 && right < N) {",
      "        if (cow[left]  == want[left])  matches--;",
      "        if (cow[right] == want[right]) matches--;",
      "        if (cow[left]  == want[right]) matches++;",
      "        if (cow[right] == want[left])  matches++;",
      "        answer[matches]++;",
      "        left--;",
      "        right++;",
      "    }",
      "}",
      "",
      "int main() {",
      "    int N; cin >> N;",
      "    vector<int> cow(N), want(N);",
      "    for (int &x : cow)  cin >> x;",
      "    for (int &x : want) cin >> x;",
      "",
      "    int baseMatches = 0;",
      "    for (int i = 0; i < N; i++)",
      "        if (cow[i] == want[i]) baseMatches++;",
      "",
      "    vector<int> answer(N + 1, 0);",
      "    for (int i = 0; i < N; i++) {",
      "        expand(cow, want, answer, baseMatches, i, i);",
      "        expand(cow, want, answer, baseMatches, i, i + 1);",
      "    }",
      "",
      "    for (int k = 0; k <= N; k++) cout << answer[k] << \"\\n\";",
      "}"],
    [t(E, "All pieces together. Each center's widen sum → O(N²) total.", "조각을 한 코드로. 중심마다 넓힌 길이 합 → O(N²).")]
  );

  return [
    { type: "reveal", narr: t(E, "First — the starting count (no flip).", "먼저 — 출발점(안 뒤집은 검진 수)."),
      content: (<CodeSectionView section={secBase} lang={lang} E={E} />) },
    { type: "reveal", narr: t(E, "The heart: expand — touch only the two ends.", "핵심: expand — 두 끝만 건드림."),
      content: (<CodeSectionView section={secExpand} lang={lang} E={E} />) },
    { type: "reveal", narr: t(E, "Run every center, then print.", "모든 중심 돌고, 출력."),
      content: (<CodeSectionView section={secMain} lang={lang} E={E} />) },
    { type: "reveal", narr: t(E, "All pieces in one program.", "조각들을 한 코드로."),
      content: (<CodeSectionView section={secFull} lang={lang} E={E} />) },
    /* (복잡도 퀴즈 제거 — Big-O 고르기는 중1엔 추상적. 언어노트가 구체 시간으로 대신 설명. 선생님 2026-07-02.) */

    /* 4-끝 — 언어 선택: 이 문제는 O(N²)라 C++로. Python 은 큰 N 에서 TLE (선생님 2026-07-02). */
    {
      type: "reveal",
      narr: t(E, "One honest note — which language passes here?",
                 "솔직한 한마디 — 이 문제, 어떤 언어로 통과할까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0e7490", textAlign: "center", marginBottom: 12, wordBreak: "keep-all" }}>
            🏁 {t(E, "Wrap-up & language choice", "정리 & 언어 선택")}
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 13px", marginBottom: 10, fontSize: 12, color: "#065f46", lineHeight: 1.7, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>✅ {t(E, "center-expansion, in one line", "center-expansion 한 줄 정리")}</div>
            {t(E,
              "Start from baseMatches, widen from each center, fix only the two ends (−1/+1), tally answer[checkups]. O(N²).",
              "baseMatches에서 출발 → 중심마다 넓히며 두 끝만 (−1/+1) → answer[검진수] 집계. O(N²).")}
          </div>

          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 13px", marginBottom: 10, fontSize: 12, color: "#7f1d1d", lineHeight: 1.7, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>⚠️ {t(E, "Python has a real limit here", "이 문제, Python은 한계가 있어요")}</div>
            {t(E,
              "N = 7500 means O(N²) ≈ 28 million inner-loop steps. In C++ that's ~0.05 s → passes. In Python (CPython) the same loop is ~40 s → TLE on the big cases. It's not an algorithm problem — it's language speed, and there is NO faster algorithm (O(N²) is the intended complexity).",
              "N = 7500이면 O(N²) ≈ 안쪽 루프 2,800만 번. C++은 ~0.05초 → 통과. 근데 Python(CPython)은 같은 루프가 ~40초 → 큰 케이스에서 TLE. 알고리즘 문제가 아니라 언어 속도 문제예요. 게다가 더 빠른 알고리즘도 없어요 (O(N²)가 의도된 복잡도).")}
          </div>

          <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: "#1e3a8a", lineHeight: 1.7, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>🎯 {t(E, "So", "그래서")}</div>
            {t(E,
              "For big N with an O(N²) solution, the language matters. Here: submit in C++ (passes). Pure Python can't hit the limit; only heavy numpy vectorization has a chance. A good lesson: sometimes the right move is choosing C++.",
              "큰 N + O(N²) 풀이에선 언어 선택이 중요해요. 이 문제는 C++로 제출 (통과). 순수 Python은 제한에 못 들고, numpy로 세게 벡터화해야 겨우 가능해요. 좋은 교훈 — 때론 'C++로 가는 것'이 정답이에요.")}
          </div>
        </div>),
    },
  ];
}
