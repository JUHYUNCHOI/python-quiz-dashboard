import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, DiagonalSim, MatchUpToSim, DiagPrefixSim } from "./components";
import { CheckupsBruteRunner, CheckupsIntroSim } from "./sims";
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
export function makeCheckupsCh3(E) {
  return [
    /* 3-1 — the big idea, in plain words (own lines so it stands out). */
    {
      type: "reveal",
      narr: t(E,
        "One picture unlocks everything.  Look at what stays the same as (l, r) changes.",
        "그림 하나가 전부를 풀어줘요. (l, r) 이 바뀔 때 무엇이 그대로인지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: 16, fontSize: 13, color: C.text, lineHeight: 1.75 }}>
            <div style={{ fontWeight: 700, color: "#0e7490", marginBottom: 10, fontSize: 14 }}>
              🔑 {t(E, "The key observation", "핵심 관찰")}
            </div>
            <div style={{ marginBottom: 10 }}>
              {t(E,
                "When you reverse a[l..r], the cell that lands on position i is the value that was at l + r − i.",
                "a[l..r] 를 뒤집으면, 위치 i 에 오는 값은 원래 l + r − i 자리에 있던 값이에요.")}
            </div>
            <div style={{ background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8, padding: "10px 12px", marginBottom: 10, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#0e7490", fontWeight: 700 }}>
              {t(E, "that index depends ONLY on s = l + r", "그 인덱스는 s = l + r 에만 달려 있어요")}
            </div>
            <div>
              {t(E,
                "So every (l, r) pair with the same sum s asks the EXACT same comparison questions inside the window.  Group them by s — that's the 'diagonal'.  The three sims below build the idea up one layer at a time.",
                "그래서 합 s 가 같은 모든 (l, r) 쌍은 윈도우 안에서 완전히 같은 비교를 해요. s 별로 묶으면 — 그게 '대각선'. 아래 시뮬 세 개가 한 겹씩 쌓아가요.")}
            </div>
          </div>
        </div>),
    },

    /* 3-1b — DERIVE l+r−i (the mirror) so the key formula is earned, not asserted. */
    {
      type: "reveal",
      narr: t(E,
        "Wait — why l + r − i? Let's SEE it. Reversing just mirrors the window: the ends swap, then it works inward.",
        "잠깐 — 왜 l + r − i 일까? 직접 봐요. 뒤집기는 윈도우를 거울처럼 뒤집어요: 양 끝이 바뀌고 안쪽으로 좁혀가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0e7490", textAlign: "center", marginBottom: 10 }}>
            🪞 {t(E, "Why position i gets the value from l + r − i", "왜 위치 i 에 l + r − i 의 값이 올까")}
          </div>
          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            {t(E, "Take the window [l, r] = [2, 5]. Reversing pairs the ends and moves inward:",
                  "윈도우 [l, r] = [2, 5] 를 봐요. 뒤집으면 양 끝이 짝지어 안쪽으로:")}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "12px 0 6px" }}>
              {[1, 2, 3, 4, 5, 6].map(p => {
                const inside = p >= 2 && p <= 5;
                return (
                  <div key={p} style={{
                    width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15,
                    background: inside ? "#cffafe" : "#fff", color: inside ? "#0e7490" : "#cbd5e1",
                    border: `${inside ? 1.5 : 1}px solid ${inside ? "#22d3ee" : C.border}`,
                  }}>{p}</div>
                );
              })}
            </div>
            <div style={{ textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#0e7490", fontWeight: 700, lineHeight: 1.9 }}>
              2 ↔ 5,&nbsp;&nbsp; 3 ↔ 4
            </div>
            <div style={{ marginTop: 10, padding: "9px 11px", background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8, fontSize: 12.5, lineHeight: 1.8 }}>
              {t(E, "Each pair adds up to the SAME total: 2 + 5 = 7 and 3 + 4 = 7. So the value landing on position i came from (7 − i) = (l + r − i).",
                    "각 짝의 합이 똑같아요: 2 + 5 = 7, 3 + 4 = 7. 그래서 위치 i 에 오는 값은 (7 − i) = (l + r − i) 에서 온 거예요.")}
              <div style={{ marginTop: 6, color: "#0e7490", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                ✓ i = 2 → 7 − 2 = 5,&nbsp;&nbsp; i = 3 → 7 − 3 = 4
              </div>
            </div>
            <div style={{ marginTop: 10, fontWeight: 700, color: "#0e7490" }}>
              {t(E, "And s = l + r = 7 is the same for every spot in the window — that one constant is the whole secret.",
                    "그리고 s = l + r = 7 은 윈도우 안 모든 자리에서 똑같아요 — 그 상수 하나가 전부의 비밀이에요.")}
            </div>
          </div>
        </div>),
    },

    /* 3-2 — DiagonalSim: drag two (l, r) windows; same s → same colour. */
    {
      type: "reveal",
      narr: t(E,
        "Drag two (l, r) windows.  When their l + r matches, inside cells share a colour: same diagonal, same comparison.",
        "두 (l, r) 윈도우를 드래그해 봐요. l + r 가 같으면 안쪽 셀이 같은 색 — 같은 대각선이면 같은 비교."),
      content: (<DiagonalSim E={E} />),
    },

    /* 3-3 — quiz on the diagonal idea (active step). */
    {
      type: "quiz",
      narr: t(E,
        "Quick check on what 'same diagonal' means.",
        "'같은 대각선' 이 뭔지 확인해 봐요."),
      question: t(E,
        "Which pair (l, r) lands on the SAME diagonal as (l=2, r=5)?",
        "(l=2, r=5) 와 같은 대각선에 있는 쌍은 어느 것일까요?"),
      options: [
        "(l=3, r=4)",
        "(l=1, r=5)",
        "(l=2, r=6)",
        "(l=4, r=4)",
      ],
      correct: 0,
      explain: t(E,
        "Same diagonal means same s = l + r.  Here s = 2 + 5 = 7.  (l=3, r=4) gives 3 + 4 = 7 — same diagonal.  The others give 6, 8, 8.",
        "같은 대각선 = 같은 s = l + r. 여기선 s = 2 + 5 = 7. (l=3, r=4) 는 3 + 4 = 7 — 같은 대각선. 나머지는 6, 8, 8."),
    },

    /* 3-3b — split the count into OUTSIDE + INSIDE so the next two sims have a home. */
    {
      type: "reveal",
      narr: t(E,
        "Here's the whole plan for counting ONE operation fast: split the line into two zones.",
        "한 연산을 빠르게 세는 전체 작전: 줄을 두 구역으로 나눠요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0e7490", textAlign: "center", marginBottom: 10 }}>
            ✂️ {t(E, "Checkups = OUTSIDE + INSIDE", "검진 수 = 바깥 + 안쪽")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
            {[
              { label: t(E, "outside", "바깥"), c: "#e2e8f0", bd: "#cbd5e1", tc: "#475569", grow: 1 },
              { label: "[ l … r ]", c: "#cffafe", bd: "#22d3ee", tc: "#0e7490", grow: 2 },
              { label: t(E, "outside", "바깥"), c: "#e2e8f0", bd: "#cbd5e1", tc: "#475569", grow: 1 },
            ].map((z, i) => (
              <div key={i} style={{
                flex: z.grow, background: z.c, border: `1.5px solid ${z.bd}`, borderRadius: 8,
                padding: "12px 6px", textAlign: "center", fontSize: 12.5, fontWeight: 700, color: z.tc,
              }}>{z.label}</div>
            ))}
          </div>
          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.75 }}>
            <div><b style={{ color: "#475569" }}>{t(E, "OUTSIDE the window", "윈도우 바깥")}</b> — {t(E, "nothing moved. A spot matches if a[i] = b[i], exactly like before any reversal — and it's the SAME for every (l, r).", "아무것도 안 움직임. a[i] = b[i] 면 일치 — 뒤집기 전과 똑같고, 모든 (l, r) 에서 동일.")}</div>
            <div style={{ marginTop: 8 }}><b style={{ color: "#0e7490" }}>{t(E, "INSIDE the window", "윈도우 안")}</b> — {t(E, "reversed. Position i now holds a[l+r−i], compared to b[i]. This is the part that changes — but only with the diagonal s.", "뒤집힘. 위치 i 에 a[l+r−i] 가 와서 b[i] 와 비교. 바뀌는 부분 — 단, 대각선 s 에만 따라.")}</div>
            <div style={{ marginTop: 10, textAlign: "center", padding: "9px 10px", background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8, fontWeight: 800, color: "#0e7490", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
              {t(E, "checkups = (outside matches) + (inside matches)", "검진 수 = (바깥 일치) + (안쪽 일치)")}
            </div>
            <div style={{ marginTop: 8 }}>{t(E, "We just need a fast way to read each part. Outside first — it never changes.", "각 부분을 빠르게 읽는 법만 있으면 돼요. 바깥부터 — 절대 안 변하니까.")}</div>
          </div>
        </div>),
    },

    /* 3-4 — MatchUpToSim: outside-window matches via a prefix built once. */
    {
      type: "reveal",
      narr: t(E,
        "Outside the window, nothing moves.  Build matchUpTo once (left-to-right), then drag (l, r) — outside matches drop out instantly.",
        "윈도우 바깥은 안 움직여요. matchUpTo 를 왼쪽부터 한 번만 만들고, (l, r) 드래그 — 바깥 일치 수가 바로 떨어져요."),
      content: (<MatchUpToSim E={E} />),
    },

    /* 3-5 — DiagPrefixSim: inside-window matches via per-diagonal prefix. */
    {
      type: "reveal",
      narr: t(E,
        "Inside the window: pick a diagonal s, count ✓ per position to get diag[k].  Any (l, r) on this s reads inside matches as diag[r] − diag[l−1].",
        "윈도우 안: 대각선 s 를 골라 자리마다 ✓ 를 세면 diag[k]. 이 s 의 (l, r) 안쪽 일치는 diag[r] − diag[l−1] 로 바로 읽어요."),
      content: (<DiagPrefixSim E={E} />),
    },

    /* 3-6 — closing input: the two-piece formula in one number (active step). */
    {
      type: "input",
      narr: t(E,
        "Put the two prefixes together for one (l, r).",
        "한 (l, r) 에 대해 두 prefix 를 합쳐 봐요."),
      question: t(E,
        "For some (l, r): outside matches = 3, inside matches = diag[r] − diag[l−1] = 5 − 2.  Total checkups for this pair?",
        "어떤 (l, r): 바깥 일치 = 3, 안쪽 일치 = diag[r] − diag[l−1] = 5 − 2. 이 쌍의 총 검진 수는?"),
      hint: t(E,
        "Total = outside + inside.  inside = 5 − 2 = 3.",
        "총합 = 바깥 + 안쪽. 안쪽 = 5 − 2 = 3."),
      answer: 6,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 4 — ⚡ Code.
   Now that the idea is clear from the sims, see the actual O(N²) code:
   the idea recap, both prefixes, the combine loop, and the full program.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh4(E, lang = "py") {
  // Ch3 가 ⑤(아이디어)를 유도+시뮬로 이미 가르쳤으므로 Ch4 는 실제 코드 ⑥⑦⑧⑨ 만.
  // (전체 ⑤~⑨ 는 PDF 에 그대로 남아 있어 참고 가능.)
  const smart = getCheckupsSections(E).slice(5);   // [6️⃣ matchUpTo, 7️⃣ diag, 8️⃣ combine, 9️⃣ full]
  return [
    ...smart.map((sec, i) => ({
      type: "reveal",
      narr:
        i === 0
          ? t(E, "matchUpTo — built once with a left-to-right sweep.  Outside-window matches come straight from it.",
                "matchUpTo — 왼쪽부터 한 번에. 바깥 일치는 여기서 바로 나와요.")
          : i === 1
          ? t(E, "diag — rebuilt for each diagonal s.  Inside-window matches = diag[r] − diag[l−1].",
                "diag — 대각선 s 마다 새로. 안쪽 일치 = diag[r] − diag[l−1].")
          : i === 2
          ? t(E, "Combine the two prefixes for every (l, r) on the diagonal, then print the tally.",
                "대각선 위 모든 (l, r) 에 대해 두 prefix 합치고, 집계를 출력.")
          : t(E, "All the pieces wired together — variable names match the sections above.  Read top to bottom.",
                "조각들이 한 군데에 — 변수 이름은 위 섹션 그대로. 위에서 아래로 읽어요."),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
    /* 4-끝 — 마무리 확인 (능동): 빠른 풀이의 복잡도 = 이 챕터의 보상 */
    {
      type: "quiz",
      narr: t(E, "Last check — why is this finally fast enough?", "마지막 확인 — 왜 이제 충분히 빠를까요?"),
      question: t(E,
        "Brute was O(N³) (hours at N = 7500).  What is this smart solution's total time?",
        "brute 는 O(N³) (N = 7500 에서 몇 시간).  이 빠른 풀이의 전체 복잡도는?"),
      options: ["O(N)", "O(N²)", "O(N³)", "O(2ᴺ)"],
      correct: 1,
      explain: t(E,
        "Each (l, r) is now O(1) — just two prefix lookups — and there are about N² pairs → O(N²).  At N = 7500 that's ~5·10⁷ ops, fast enough.",
        "이제 (l, r) 마다 O(1) — prefix 조회 두 번뿐 — 이고 쌍이 약 N² 개 → O(N²). N = 7500 이면 약 5·10⁷ 연산, 충분히 빨라요."),
    },
  ];
}
