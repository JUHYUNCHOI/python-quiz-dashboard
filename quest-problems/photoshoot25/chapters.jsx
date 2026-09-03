import { C, t } from "@/components/quest/theme";
import { getPhotoshoot25Sections, getPhotoshoot25Walk } from "./components";
import { PhotoWindowSim, PhotoUpdateSim, PhotoMonotoneSim, PhotoTraceSim } from "./sims";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makePhotoshoot25Ch1 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshoot25Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N x N field of cows, all starting with beauty 0. Farmer John takes K x K square photos. After each beauty update, output the best possible photo.",
        "N × N 들판에 소들이 있어요. 처음엔 아름다움이 모두 0 이에요.\n농부는 K × K 정사각형으로 사진을 찍어요.\n소 한 마리의 아름다움이 늘어날 때마다, 가장 멋진 사진의 점수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📸"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#5b21b6" }}>Photoshoot (2025)</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "After each beauty update, print the maximum sum over every K x K window of the grid.",
                "매번 한 칸의 아름다움이 늘어날 때마다 모든 K x K 윈도우 중 최대 합을 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#5b21b6" }}>{t(E, "N x N grid", "N x N 격자")}</b>
                  {t(E, " of cows (1 ≤ N ≤ 500). Each cow has a beauty value, all starting at 0.",
                       " 의 소들 (1 ≤ N ≤ 500). 각 소는 아름다움 값을 가지며 처음엔 모두 0.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A camera shot is any ", "사진은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K x K square", "K x K 정사각형")}</b>
                  {t(E, " (1 ≤ K ≤ min(N, 25)). Its score = sum of beauties inside.",
                       " (1 ≤ K ≤ min(N, 25)). 점수 = 안에 든 아름다움의 합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are Q updates (Q ≤ 30000). Each gives a single cow ", "Q 번의 업데이트 (Q ≤ 30000). 매번 한 마리 소에게 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "a higher beauty value", "더 높은 아름다움")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "After each update, print the ", "각 업데이트 후 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum K x K window sum", "K x K 윈도우의 최대 합")}</b>
                  {t(E, ".", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-4b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  Grid size, then Q updates.  Print the best window after each one.",
        "데이터는 어떻게 들어올까?  격자 크기, 그 다음 Q 개 업데이트.  매번 최고 창을 출력."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— grid size, camera size", "— 격자 크기, 카메라 크기")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>Q</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of updates", "— 업데이트 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>r c v</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— set cell (r,c) to beauty v", "— 칸 (r,c) 를 아름다움 v 로")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats Q times", "↑ 이 줄이 Q 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "After each update, the largest sum among all K×K windows (Q lines).",
                  "각 업데이트 후, 모든 K×K 창 중 최대 합 (Q 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 500</div>
              <div>1 ≤ K ≤ min(N, 25)</div>
              <div>1 ≤ Q ≤ 30,000 (= 3 × 10⁴)</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "1 ≤ v ≤ 10⁶  ·  updates only increase a cell's value", "1 ≤ v ≤ 10⁶  ·  업데이트는 값을 올리기만 함")}</div>
            </div>
          </div>
        </div>),
    },
    /* [전-1] 퀴즈 3 개(느린 비용 / 영향받는 창 수 / 최대 단조) → 시뮬 2 개로 교체.
       셋 다 "말로 물어보고 말로 답" 이었는데, 이 문제는 답이 통째로 그림이다.
       (선생님: "퀴즈는 없는게 좋은것 같아", "설명은 시뮬로") */
    {
      type: "reveal",
      narr: t(E,
        "First — what IS a photo's score?  Slide the K x K square everywhere and keep the best.",
        "먼저 — 사진 점수가 뭔지부터.  K x K 정사각형을 다 밀어보고 제일 좋은 걸 기억해요."),
      content: (<PhotoWindowSim E={E} />),
    },
    /* [결-b 한계] — 브루트가 왜 안 되는지 숫자로. 원래 퀴즈에 있던 값인데
       퀴즈를 없애면서 사라졌다. 문제 최대 크기로 직접 비교. */
    {
      type: "reveal",
      narr: t(E,
        "So we could just recompute every photo after every update.  Would that finish in time?",
        "그럼 업데이트마다 모든 사진을 다시 더하면 되지 않을까?  시간 안에 끝날까?"),
      content: (
        <div style={{ padding: 20, wordBreak: "keep-all" }}>
          <div style={{
            maxWidth: 470, margin: "0 auto", background: "#fef2f2",
            border: "1.5px solid #fca5a5", borderRadius: 12, padding: "14px 16px",
          }}>
            <div style={{ fontWeight: 800, color: "#b91c1c", marginBottom: 8, fontSize: 13 }}>
              🐌 {t(E, "Recompute everything, every time", "매번 전부 다시 더하면")}
            </div>
            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>{t(E, "biggest case", "최대 크기")}: N = 500, K = 25, Q = 30000</div>
              <div>{t(E, "photos", "사진")} = (500−25+1)² = <b>226,576</b></div>
              <div>{t(E, "cells per photo", "사진 한 장의 칸")} = 25² = <b>625</b></div>
              <div style={{ color: "#b91c1c", fontWeight: 800, marginTop: 4 }}>
                → 226,576 × 625 × 30,000 ≈ <b>4×10¹²</b>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: "#7f1d1d", marginTop: 8, lineHeight: 1.6 }}>
              {t(E, "Way over the limit — a computer does roughly 10⁸~10⁹ simple steps per second.",
                    "제한을 한참 넘어요 — 컴퓨터는 1 초에 대략 10⁸~10⁹ 번 정도 계산해요.")}
            </div>
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", fontSize: 12.5, color: "#5b21b6", textAlign: "center", fontWeight: 700 }}>
            {t(E, "→ So: don't recompute.  Only fix what actually changed.",
                  "→ 그러니 다시 더하지 말고, 진짜 바뀐 것만 고치자.")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Now the key: when ONE cow gets prettier, which photos change?  Only the ones containing her — and their top-left corners form a rectangle.",
        "이제 핵심이에요. 소 한 마리가 예뻐지면 어떤 사진이 바뀔까요?\n그 소가 들어간 사진만 바뀌어요.\n그리고 그 사진들의 왼쪽위가 직사각형을 이뤄요."),
      content: (<PhotoUpdateSim E={E} />),
    },
    /* [전] 마지막 미묘한 고리 — 왜 '바뀐 사진만' cur_max 와 견줘도 되나.
       선생님 2026-08-30: Ch2 계획 카드 불릿 한 줄로만 있어서 '왜' 가 없었음.
       다른 질문이라 별도 페이지 (cowsplits 의 −1 분리와 같은 이유). */
    {
      type: "reveal",
      narr: t(E,
        "One more link: we only compare the changed photos against cur_max. Why is that safe?",
        "마지막 고리 하나: 바뀐 사진만 cur_max 와 견줘요. 그래도 괜찮은 이유는?"),
      content: (<PhotoMonotoneSim E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makePhotoshoot25Ch2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
/* 코드 전 '그래서 뭘 어떻게 했나' 계획 카드 (선생님 2026-08-11).
   두 시뮬에서 알아낸 것 → 그걸로 세운 코드 순서. 변수 이름(S·cur_max·delta·i_lo…)을
   여기서 먼저 만나서, CodeWalk 에 들어갈 때 낯설지 않게. */
function Photoshoot25Plan({ E }) {
  const box = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", wordBreak: "keep-all" };
  const Insight = ({ icon, head, body, color }) => (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", ...box, borderLeft: `4px solid ${color}` }}>
      <span style={{ fontSize: 20, lineHeight: 1.2 }}>{icon}</span>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155" }}>
        <b style={{ color: "#0f172a" }}>{head}</b><br />{body}
      </div>
    </div>
  );
  const codeTag = (s) => (
    <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#0e7490", background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: 5, padding: "0 5px" }}>{s}</code>
  );
  const Line = ({ n, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 7 }}>
      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 999, background: "#0891b2", color: "#fff", fontSize: 11.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "#334155" }}>{children}</div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 620, margin: "0 auto" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>
        🧩 {t(E, "What the two sims told us", "두 시뮬에서 알아낸 것")}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <Insight icon="📊" color="#8b5cf6"
          head={t(E, "Every photo has a score (its sum).", "사진마다 '점수(합)'가 있다.")}
          body={t(E, <>Keep each one in a table {codeTag("S")} — don't re-add from scratch every time.</>,
                     <>각 점수를 표 {codeTag("S")} 에 저장해두자 — 매번 처음부터 다시 안 더하게.</>)} />
        <Insight icon="🐄" color="#f97316"
          head={t(E, "One cow changes → only the photos holding it change.", "소 하나가 바뀌면 → 그 소를 품는 사진만 바뀐다.")}
          body={t(E, "Those photos form a small rectangle — touch just them, not all of them.",
                     "그 사진들은 작은 직사각형 — 전부 말고 그 몇 장만 손대자.")} />
        <Insight icon="📈" color="#059669"
          head={t(E, "Beauty only grows → the best score never drops.", "값은 커지기만 → 최고 점수는 줄지 않는다.")}
          body={t(E, <>So only compare the changed photos against {codeTag("cur_max")}.</>,
                     <>그러니 바뀐 사진만 {codeTag("cur_max")} 와 비교하면 돼.</>)} />
      </div>

      <div style={{ ...box, background: "#f8fafc", fontSize: 13, lineHeight: 1.75, color: "#334155" }}>
        ⚙️ {t(E,
          <>So: keep table {codeTag("S")}. Each update — add {codeTag("delta")} to just the cow's photos, then lift {codeTag("cur_max")}.</>,
          <>그래서: 표 {codeTag("S")} 를 유지. 업데이트마다 — 소를 품는 사진에만 {codeTag("delta")} 를 더하고, {codeTag("cur_max")} 를 갱신.</>)}
      </div>
    </div>
  );
}

export function makePhotoshoot25Ch2(E, lang = "py") {
  return [
    /* 코드 전: 두 시뮬 → 코드 순서 다리 놓기 (변수 미리 소개). */
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code — here's what the sims told us, and the exact plan (with the variable names you'll see).",
        "코드 전에 — 시뮬이 알려준 것과, 정확한 계획(곧 볼 변수 이름과 함께)."),
      content: (<Photoshoot25Plan E={E} />),
    },
    /* 코드 전: 값이 실제로 어떻게 변하는지 먼저 눈으로 (선생님 2026-08-11: '코드 시뮬을 코드 보여주기 전에'). */
    {
      type: "reveal",
      label: t(E, "Run", "실행"),
      narr: t(E,
        "Before the code — watch the values change on a real example, so the code reads easy after.",
        "코드를 보기 전에 — 값들이 실제 예제에서 어떻게 변하는지 먼저 눈으로 따라가요."),
      content: (<PhotoTraceSim E={E} />),
    },
    /* 그 다음 실제 코드 — 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getPhotoshoot25Walk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Now the code — you just saw these variables move. S keeps each photo's score; each update touches only the cow's rectangle.",
          "이제 코드예요. 방금 이 변수들이 움직이는 걸 봤죠.\nS 는 각 사진의 점수고, 업데이트는 소가 든 사각형만 건드려요."),
        content: (
          <div>
            {lang === "py" && (
              <div style={{ margin: "0 16px 6px", padding: "9px 13px", borderRadius: 10, background: "#fffbeb", border: "1.5px solid #fbbf24", color: "#92400e", fontSize: 12.5, fontWeight: 700, lineHeight: 1.6, wordBreak: "keep-all", textAlign: "center" }}>
                {t(E,
                  <>⚠️ This problem's data is large, so Python <b>times out on the later tests (12/18)</b>. The algorithm is identical — great for understanding — but submit in <b>C++</b> for full marks.</>,
                  <>⚠️ 이 문제는 데이터가 커서 Python은 <b>뒷 테스트에서 시간초과 (12/18)</b>. 알고리즘은 똑같으니 이해용으론 완벽하지만, USACO 만점은 <b>C++</b>로 제출해요.</>)}
              </div>
            )}
            <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />
          </div>
        ),
      };
    })(),
  ];
}
