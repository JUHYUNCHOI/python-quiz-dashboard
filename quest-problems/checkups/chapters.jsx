import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, DiagonalSim, MatchUpToSim, DiagPrefixSim } from "./components";
import { CheckupsBruteRunner, CheckupsIntroSim, CheckupsMirrorSim, CheckupsGrowSim, CheckupsTrySim, CheckupsReuseSim, CheckupsKeyCodeSim, CheckupsEnumSim, CheckupsFinalCodeSim, CheckupsWindowSplitSim, CheckupsWindowRecapSim, CheckupsOutPrefixSim, CheckupsInPrefixSim } from "./sims";
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
  return [
    /* 3-0 — 큰 그림 먼저: 검진 = 창 밖 + 창 안. 정적 박스 → 진짜 '창문' 시뮬로 교체
        (선생님 2026-07-02: "진짜 윈도우 그림 — 문 닫았다 열었다 느낌" + 풀이 도입은
        "그럼 어떻게 해결하면 될까? 생각해보자"로 시작). */
    {
      type: "reveal",
      narr: t(E,
        "So — how do we solve this? Let's think together.",
        "그럼 어떻게 해결하면 될까요? 같이 생각해봐요."),
      content: (<CheckupsWindowSplitSim E={E} />),
    },

    /* 3-1 — 안쪽(핵심) 규칙: 뒤집으면 자리 i ← 짝꿍(s−i), s 만 중요 — stepped 말풍선 시뮬. */
    {
      type: "reveal",
      narr: t(E,
        "Outside is free (never moves). Now inside the window — flip it: how do the cows move?",
        "창 밖은 공짜(안 변함). 이제 창 안 — 뒤집으면 소가 어떻게 움직이나?"),
      content: (<CheckupsMirrorSim E={E} />),
    },

    /* 3-1a (GrowSim) 제거 — '같은 s → 안쪽 같다'를 TrySim ←원래자리 행이 더 명확히 증명하고,
        Grow 의 '±로 키우기' 틀은 결론(s마다 한 번 세서 재사용)과 다른 틀이라 겉돎 (선생님 2026-06-24: 반복 제거·제대로 개편). */

    /* 3-1b — 직접 구간을 골라 뒤집어 보는 탐색 (선생님 2026-06-23: '자리 3,4,5 뒤집을 때 보고 싶어').
        s 가 다르면 안쪽 검진이 달라지는 걸 학생이 직접 확인 + ←원래자리 로 같은 s 재사용 증명. */
    {
      type: "reveal",
      narr: t(E,
        "Now you try — pick a window, count outside + inside.",
        "이제 직접 — 창 하나 골라 '창 밖 + 창 안'을 세 봐요."),
      content: (<CheckupsTrySim E={E} />),
    },

    /* (3-2 DiagonalSim + 3-3 '대각선' 퀴즈 제거 — 거울 시뮬이 같은 'same-s 재사용'을 검진 세기로
        이미 더 명확히 보여줌. 추상 반복 + '대각선' 용어 재등장이 오히려 헷갈렸음. 선생님 2026-06-22) */
    /* 쪼개기(바깥+안쪽) 슬라이드는 맨 앞(3-0)으로 이동 (선생님 2026-06-23: 흐름 순서). */

    /* 3-4·3-5 (OutPrefixSim·InPrefixSim) 제거 (선생님 2026-06-23: '시뮬이 너무 많다').
        바깥-prefix 는 FastSim 바깥 칸이, 안쪽-prefix 는 GrowSim 의 ± 가 이미 보여주고,
        실제 구현(prefix 배열)은 코드 챕터(⚡)가 한 줄씩 다룸 → 중복. 바로 통합 FastSim 으로. */

    /* 3-1c — 재사용(직관만): 같은 s 면 안쪽 ✓ 자리가 똑같다 → s마다 한 번 세두면 재사용.
        (선생님 2026-06-28: prefix '빼기' 계산은 추상적이라 코드 챕터로 — 여기선 '왜 재사용 되나'만.) */
    {
      type: "reveal",
      narr: t(E,
        "Recounting every time? For the same s, count the inside once — then reuse.",
        "매번 다시 셌죠? 같은 s면 창 안은 한 번만 세고 재사용."),
      content: (<CheckupsReuseSim E={E} />),
    },

    /* (3-5b FastSim 제거 — TrySim 합본이 '바깥 + 안쪽 = 총'을 이미 한 화면에서 stepped 로 함. 선생님 2026-06-28: 3·5 중복 합침.) */

    /* 3-5c — 핵심을 코드로 살짝 (Py/C++ 토글) (선생님 2026-06-24: 안 바꾸고 index 비교 + 재사용을 코드로) */
    {
      type: "reveal",
      narr: t(E,
        "And in code we never even flip — the idea, as code.",
        "게다가 코드에선 아예 안 뒤집어요 — 아이디어를 코드로."),
      content: (<CheckupsKeyCodeSim E={E} lang={lang} />),
    },

    /* (3-5c2 FinalCodeSim 이동 → ch4 맨 끝. 선생님 2026-07-01: 완성코드 전체 실행은
        '아이디어' 챕터가 아니라 코드 조각(6️⃣~9️⃣) 다 만든 뒤 '이제 돌려보자' 자리가 맞음.
        여기 있으면 코드 챕터와 중복 + 아직 안 배운 코드를 통째로 먼저 보게 됨.) */

    /* 3-5d — 결(payoff): 그래서 전체가 빨라졌다 + 분포 완성 (선생님 2026-06-24: '이게 설명 끝인가?' — 결론이 약함) */
    {
      type: "reveal",
      narr: t(E,
        "So — how much faster?",
        "그래서 — 얼마나 빨라졌나?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 12 }}>
            🚀 {t(E, "So how much faster?", "그래서 — 얼마나 빨라졌나")}
          </div>

          {/* brute → fast 비교 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#991b1b", marginBottom: 5 }}>🐢 {t(E, "Brute", "브루트포스")}</div>
              <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.6, wordBreak: "keep-all" }}>
                {t(E, "Window 1 = look at all N cells", "창 1개 = N칸 다 봄")}<br />
                <span style={{ fontSize: 10.5, opacity: 0.85 }}>{t(E, "~N² windows × N cells", "창 ~N²개 × N칸")}</span><br />
                <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>O(N³)</code> → {t(E, "too slow", "느림")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 5 }}>⚡ {t(E, "Fast", "빠른 풀이")}</div>
              <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.6, wordBreak: "keep-all" }}>
                {t(E, "Window 1 = outside + a few pairs (fixed)", "창 1개 = 창 밖 + 쌍 몇 개 (정해진 횟수)")}<br />
                <span style={{ fontSize: 10.5, opacity: 0.85 }}>{t(E, "~N² windows × a few = O(1) each", "창 ~N²개 × 몇 번 = 창당 O(1)")}</span><br />
                <code style={{ background: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>O(N²)</code> → {t(E, "passes", "통과")}
              </div>
            </div>
          </div>

          {/* O(1) 일상어 풀이 */}
          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 10, padding: "9px 12px", marginBottom: 12, fontSize: 11.5, color: "#92400e", lineHeight: 1.6, textAlign: "center", wordBreak: "keep-all" }}>
            💡 {t(E,
              "O(1) per window = the work for one window stays a fixed few steps, no matter how big N is (it doesn't grow with the window).",
              "창당 O(1) = 창 하나에 드는 일이 N 이 아무리 커도 *정해진 몇 번*으로 일정 (창이 커져도 안 늘어남).")}
          </div>

          {/* 분포 완성 — EnumSim 으로 회귀 */}
          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: "12px 14px", fontSize: 12.5, color: "#155e75", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
            {t(E,
              "We dropped one whole factor of N — exactly what we needed. Each window's checkup count goes into a tally box (just like the start), and that tally IS the answer.",
              "N 한 겹을 통째로 덜어냈어요 — 딱 필요했던 거죠. 창마다 검진 수를 통에 넣으면 (맨 처음 그 통!), 그 통이 바로 답(분포)이에요.")}
            <div style={{ marginTop: 8, fontWeight: 800, color: "#0e7490", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
              {t(E, "every window → +1 to its box → output", "모든 창 → 통에 +1 → 출력")}
            </div>
          </div>
        </div>),
    },

    /* (3-6 입력 퀴즈 제거 — TrySim 합본이 '바깥 + 안쪽 = 총'을 직접 보여줘 군더더기. 선생님 2026-06-28.) */
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 4 — ⚡ Code.
   Now that the idea is clear from the sims, see the actual O(N²) code:
   the idea recap, both prefixes, the combine loop, and the full program.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh4(E, lang = "py") {
  // Ch3 가 ⑤(아이디어)를 유도+시뮬로 이미 가르쳤으므로 Ch4 는 실제 코드 ⑥⑦⑧⑨ →
  // 전체를 샘플에 돌려보는 실행 시뮬(FinalCodeSim) → 복잡도 확인.
  // (전체 ⑤~⑨ 는 PDF 에 그대로 남아 있어 참고 가능.)
  const smart = getCheckupsSections(E).slice(5);   // [6️⃣ matchUpTo, 7️⃣ insideUpTo, 8️⃣ combine, 9️⃣ full]
  return [
    /* 4-0 — 30초 복습: '창(window)' = 뒤집을 구간, 창 안 = 뒤집히는 부분 (선생님 2026-07-02:
        prefix 시뮬 전에 창 알고리즘 간단 설명 + reverse할 부분이라는 것 짚기). */
    {
      type: "reveal",
      narr: t(E,
        "First, a 30-second recap — what was the 'window'?",
        "먼저 30초 복습 — '창'이 뭐였죠?"),
      content: (<CheckupsWindowRecapSim E={E} />),
    },
    /* 4-pre바깥 — 코드 전에 '바깥=prefix 빼기 두 번' 을 시뮬로 먼저 이해 (선생님 2026-07-01:
        '이해가 안 되는데 코드 먼저는 이상'. matchUpTo 코드 앞에 OutPrefixSim). */
    {
      type: "reveal",
      narr: t(E,
        "✓ outside the window, fast: two subtractions on a prefix — see it first, then the code.",
        "창 밖 검진 빨리 세기 — 미리 적어두고 빼기 두 번. 먼저 보고, 그다음 코드."),
      content: (<CheckupsOutPrefixSim E={E} />),
    },
    /* 바깥 코드 (방금 시뮬로 이해한 걸 코드로) */
    {
      type: "reveal",
      narr: t(E, "Outside the window: build matchUpTo once.", "창 밖 검진: matchUpTo 미리 한 번."),
      content: (<CodeSectionView section={smart[0]} lang={lang} E={E} />),
    },
    /* 안쪽: 코드 전에 'prefix 빼기 한 번' 을 시뮬로 먼저 이해 (선생님 2026-07-01). */
    {
      type: "reveal",
      narr: t(E,
        "✓ inside the window, fast: one subtraction per same-s window — see it first, then the code.",
        "창 안 검진 빨리 세기 — s 같은 창마다 빼기 한 번. 먼저 보고, 그다음 코드."),
      content: (<CheckupsInPrefixSim E={E} />),
    },
    /* 안쪽 코드 */
    {
      type: "reveal",
      narr: t(E, "Inside the window: count once per same-s window (insideUpTo).", "창 안 검진: s 같은 창마다 한 번 (insideUpTo)."),
      content: (<CodeSectionView section={smart[1]} lang={lang} E={E} />),
    },
    /* 합치기 코드 */
    {
      type: "reveal",
      narr: t(E, "Combine the two, then print.", "둘을 합쳐서 출력."),
      content: (<CodeSectionView section={smart[2]} lang={lang} E={E} />),
    },
    /* 전체 코드 */
    {
      type: "reveal",
      narr: t(E, "All pieces in one program.", "조각들을 한 코드로."),
      content: (<CodeSectionView section={smart[3]} lang={lang} E={E} />),
    },
    /* 4-run — 조각을 다 만들었으니, 전체 코드를 샘플에 한 줄씩 돌려보기 (구 3-5c2 이동. 선생님 2026-07-01) */
    {
      type: "reveal",
      narr: t(E,
        "All pieces built — now run the whole thing on the sample, line by line.",
        "조각 다 만들었으니 — 이제 전체를 샘플에 한 줄씩 돌려보자."),
      content: (<CheckupsFinalCodeSim E={E} />),
    },
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
