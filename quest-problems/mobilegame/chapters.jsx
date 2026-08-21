import { C, t } from "@/components/quest/theme";
import { getMobileGameWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { MobileSim, HeapTraceSim } from "./sims";

const A = "#d97706";

/* 샘플 입출력 — chipxchg 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩 + 테스트별 풀이). */
function MobileGameSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
5 3 10
4 3 4 1 2
3 20 100
70 86 19`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`3
-1`}
          </div>
        </div>
      </div>

      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2</code> — {t(E, "T = 2 test cases", "T = 2 (테스트 2개)")}</div>
        <div style={{ marginTop: 4 }}>
          {t(E, "Each test — first line ", "각 테스트 — 첫 줄 ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N A B</code>
          {t(E, " = enemy count · start power · goal power. Next line = the N enemy powers.", " = 적 수 · 시작 파워 · 목표 파워. 다음 줄 = 적 파워 N개.")}
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fcd34d" }}>
          {t(E, "Output = fewest kills to reach power ≥ B, or ", "출력 = 파워 ≥ B 까지 필요한 최소 처치 수, 또는 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>-1</code>{t(E, " if impossible.", " (불가능하면).")}
        </div>
      </div>

      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #fcd34d", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        <div><b style={{ color: A }}>{t(E, "Test 1", "테스트 1")}</b> {t(E, "(A=3, B=10, enemies 4 3 4 1 2): eat 2 → 5, eat 4 → 9, eat 4 → 13 ≥ 10 → ", "(A=3, B=10, 적 4 3 4 1 2): 2 먹어 5, 4 먹어 9, 4 먹어 13 ≥ 10 → ")}<b style={{ color: "#15803d" }}>3</b></div>
        <div style={{ marginTop: 3 }}><b style={{ color: A }}>{t(E, "Test 2", "테스트 2")}</b> {t(E, "(A=20, B=100, enemies 70 86 19): only 19 is beatable → 39, then stuck → ", "(A=20, B=100, 적 70 86 19): 19만 먹을 수 있어 → 39, 그다음 막힘 → ")}<b style={{ color: "#dc2626" }}>-1</b></div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all" }}>
        {t(E, "📌 Sum of N over all tests ≤ 1000.", "📌 모든 테스트의 N 합 ≤ 1000.")}
      </div>
    </div>
  );
}

/* 정리 — 발견한 규칙을 한눈에. */
function MobileGamePlan({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap", wordBreak: "keep-all" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#92400e", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole idea, at a glance", "핵심 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Power never drops, so beatable enemies only pile up — grab the biggest each time.", "파워는 줄지 않으니 먹을 수 있는 적은 늘기만 해요 — 매번 가장 큰 적을.")}
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Each round, among enemies weaker than me…", "매 라운드, 나보다 약한 적 중에서…")} res={t(E, "eat the biggest", "가장 큰 적")} col={A} bg="#fffbeb" />
        <Row q={t(E, "Why biggest? Power only grows — grow fastest → fewest kills", "왜 가장 큰? 파워는 커지기만 → 빨리 크면 → 최소 처치")} res={t(E, "greedy + max-heap", "그리디 + 최대힙")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Careful: strictly less (p < cur) — equal power can't be beaten", "주의: strictly less (p < cur) — 같은 파워는 못 먹어요")} res={t(E, "p < cur", "p < cur")} col="#0891b2" bg="#ecfeff" />
        <Row q={t(E, "No beatable enemy left but power < B", "먹을 적이 없는데 파워 < B")} res="-1" col="#dc2626" bg="#fef2f2" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMobileGameCh1 — season standard (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플 입출력 → 그리디 시뮬 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeMobileGameCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Alice starts with power A. There are N enemies with powers p₁..pₙ. She can beat an enemy weaker than her (adding its power to hers), each enemy once. Find the fewest kills to reach power ≥ B — or -1 if impossible.",
        "Alice 는 파워 A 로 시작해요. 파워 p₁..pₙ 인 적이 N 명. 자기보다 약한 적을 처치할 수 있고(그 파워만큼 커짐), 각 적은 한 번씩. 파워 ≥ B 가 되는 최소 처치 수를 구해요 — 불가능하면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📱</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: A }}>Mobile Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Reach power ≥ B in the fewest kills — or report that it can't be done.",
                "최소 처치로 파워 ≥ B 만들기 — 안 되면 불가능이라고 알리기.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Alice starts with power ", "Alice 는 파워 ")}
                  <b style={{ color: A }}>A</b>
                  {t(E, ". There are ", " 로 시작. ")}
                  <b style={{ color: A }}>{t(E, "N enemies", "적 N 명")}</b>
                  {t(E, " with powers p₁..pₙ.", ", 각 파워 p₁..pₙ.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She can beat an enemy ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "strictly weaker than her", "자기보다 파워가 딱 작은 적")}</b>
                  {t(E, " — that enemy's power is added to hers.", " 만 처치 가능 — 그 적의 파워가 자기 파워에 더해져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each enemy can be beaten ", "각 적은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "at most once", "한 번씩만")}</b>
                  {t(E, ".", " 처치할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "fewest kills to reach power ≥ B", "파워 ≥ B 까지의 최소 처치 수")}</b>
                  {t(E, ". If impossible, print ", "를 출력. 불가능하면 ")}
                  <code>-1</code>
                  {t(E, ".", " 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "Two concrete tests — and the answers we must print.", "구체적인 테스트 두 개 — 그리고 우리가 출력할 답."),
      content: (<MobileGameSample E={E} />),
    },

    // [전] 그리디 — 심술쟁이 없이, 가장 큰 적부터
    {
      type: "reveal",
      label: t(E, "No tricks — greedy", "심술쟁이 없이 — 그리디"),
      narr: t(E, "Play it out: each round, eat the biggest enemy you can. Watch the power climb.",
                 "직접 해봐요: 매 라운드, 먹을 수 있는 가장 큰 적을 먹기. 파워가 올라가는 걸 봐요."),
      content: (<MobileSim E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMobileGameCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeMobileGameCh2(E, lang = "py") {
  const w = getMobileGameWalk(E, lang);
  return [
    // Plan — photoshoot25 표준. 시뮬에서 알아낸 규칙 한눈에 + 코드 변수 소개
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code — here's the rule (from the greedy sim) and the tool we'll use (a max-heap).",
        "코드 전에 — 그리디 시뮬에서 알아낸 규칙과, 쓸 도구 (최대힙) 를 정리."),
      content: (<MobileGamePlan E={E} />),
    },
    // Run — 힙이 회차별로 어떻게 push/pop 되는지 (선생님 지적: "heap 이 어떻게 되는지 안 보임")
    {
      type: "reveal",
      label: t(E, "Run · heap trace", "실행 · 힙 트레이스"),
      narr: t(E,
        "Before the code — watch the heap actually push and pop, round by round, on the sample enemies.",
        "코드 보기 전에 — 힙이 회차마다 어떻게 push 하고 pop 하는지, 샘플에서 눈으로 따라가요."),
      content: (<HeapTraceSim E={E} />),
    },
    // Code — CodeWalk 로 말풍선이 구현 조각씩 이동
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Now the code — you just saw the heap in action. Each bubble sits on the lines it explains.",
        "이제 코드예요 — 방금 힙이 움직이는 걸 봤죠. 말풍선이 설명하는 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#d97706" />
      ),
    },
  ];
}
