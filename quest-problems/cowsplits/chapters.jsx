import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { EraseRuleSim, StuckSim, InsightSim, LetterGroupSim } from "./sims";

const A = "#059669";
// M=2 결과 시각화용: op 1 (겹치는 4 글자), op 2 (남는 2 글자)
const OP1_COL = "#059669";  // green
const OP2_COL = "#8b5cf6";  // purple
const OP1_BG  = "#ecfdf5";
const OP2_BG  = "#f5f3ff";

/* Plan — photoshoot25 스타일. 시뮬에서 알아낸 것 → 코드 변수 이름 (ans, a, b, M) 미리 소개.
   Ch2 첫 페이지: CodeWalk 진입 준비. */
function CowSplitsPlan({ E }) {
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
    <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#065f46", background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 5, padding: "0 5px" }}>{s}</code>
  );
  return (
    <div style={{ padding: 16, maxWidth: 620, margin: "0 auto" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>
        🧩 {t(E, "What the sims told us", "시뮬에서 알아낸 것")}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <Insight icon="🚫" color="#dc2626"
          head={t(E, "If N is odd → impossible.", "N 이 홀수면 → 불가능.")}
          body={t(E,
            <>3N is odd, and each op removes an even count. Print −1 and move on.</>,
            <>3N 이 홀수인데 각 연산은 짝수 개 지우기. −1 출력하고 다음으로.</>)} />
        <Insight icon="🎯" color="#059669"
          head={t(E, "If S itself is Y+Y → M = 1.", "S 자체가 Y+Y (같은 조각 두 번) 이면 → M = 1.")}
          body={t(E,
            <>front half == back half? Label every letter with 1.</>,
            <>앞 절반 == 뒤 절반이면 모든 글자에 라벨 1.</>)} />
        <Insight icon="🔀" color="#8b5cf6"
          head={t(E, "Otherwise → pair blocks, share the overlap → M = 2.", "아니면 → 블록 짝짓기, 겹치는 부분 공유 → M = 2.")}
          body={t(E,
            <>For each front block <b>a</b> ↔ back partner <b>b</b>: keep the 2 overlapping chars in op 1, move the leftover 1 char per side to op 2.</>,
            <>앞 블록 <b>a</b> ↔ 뒤 파트너 <b>b</b> 마다: 겹치는 2 글자는 op 1, 양쪽에 남는 1 글자씩은 op 2.</>)} />
      </div>

      <div style={{ ...box, background: "#f8fafc", fontSize: 13, lineHeight: 1.75, color: "#334155" }}>
        ⚙️ {t(E,
          <>So: build the labels list {codeTag("ans")} (start all 1). Loop front-half blocks, grab {codeTag("a")} and {codeTag("b")}, patch op 2 where needed. Finally {codeTag("M")} = max({codeTag("ans")}).</>,
          <>그래서: 라벨 리스트 {codeTag("ans")} 를 만들고 (처음엔 다 1). 앞 절반 블록을 순회하며 {codeTag("a")}·{codeTag("b")} 꺼내 필요한 자리에 op 2 표시. 마지막에 {codeTag("M")} = max({codeTag("ans")}).</>)}
      </div>
    </div>
  );
}

/* 입출력 형식 — photoshoot25 3-박스 스타일: INPUT(amber) / OUTPUT(green) / CONSTRAINTS(white monospace).
   샘플 정답 시각화는 자연스레 아래 별도 카드로 (기존 유지). */
function CowSplitsSample({ E }) {
  const S = "COWOWC".split("");
  const LABELS = [2, 1, 1, 1, 1, 2];
  const colFor = (op) => op === 1 ? OP1_COL : OP2_COL;
  const bgFor = (op) => op === 1 ? OP1_BG : OP2_BG;
  return (
    <div style={{ padding: 16, wordBreak: "keep-all" }}>
      {/* INPUT */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
        <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
          <div><span style={{ color: "#92400e", fontWeight: 800 }}>T k</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of tests T, mode k (0 or 1; see note below)", "— 테스트 개수 T, 모드 k (0 또는 1 — 아래 참고)")}</span></div>
          <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of blocks (S has length 3N)", "— 블록 개수 (S 길이 = 3N)")}</span></div>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the string, N blocks glued from COW/OWC/WCO", "— N 개 블록을 이은 문자열 (블록마다 COW/OWC/WCO 중 하나)")}</span></div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these two lines repeat T times", "↑ 이 두 줄이 T 번 반복")}</div>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: "#475569", marginTop: 6, wordBreak: "keep-all", lineHeight: 1.6, background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontWeight: 700, color: "#334155", marginBottom: 3 }}>💡 {t(E, "What's k?", "k 가 뭐예요?")}</div>
          {t(E,
            <>USACO grades this problem in two versions — <b>k=0</b> (strict: your M must be the exact minimum) and <b>k=1</b> (lenient: minimum+1 is fine too). Our solution always outputs the true minimum, so k doesn't affect us.</>,
            <>USACO 는 이 문제를 두 가지 버전으로 채점해요 — <b>k=0</b> (엄격: M 이 정확히 최소값이어야) 와 <b>k=1</b> (관대: 최소값+1 까지 OK). 우리 풀이는 언제나 진짜 최소값을 내니 k 는 영향 없어요.</>)}
        </div>
      </div>

      {/* OUTPUT */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
        <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.75 }}>
          <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 4 }}>{t(E, "For each test — 2 lines:", "각 테스트마다 — 2 줄:")}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 3 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E, <><b>Line 1</b>: <code>M</code> = # of moves used.  If impossible → <code>-1</code>.</>,
                       <><b>1 줄</b>: <code>M</code> = 지우기 횟수. 불가능하면 → <code>-1</code>.</>)}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E, <><b>Line 2</b>: 3N space-separated numbers — the i-th number tells which move erased the i-th letter of S.</>,
                       <><b>2 줄</b>: 3N 개 숫자를 공백으로 — i 번째 숫자는 S 의 i 번째 글자가 몇 번째 지우기에서 없어졌는지.</>)}</div>
          </div>
        </div>
      </div>

      {/* 샘플 예시 — raw text + 형식 매핑 (알고리즘 유도는 X, 그저 "숫자가 뭘 뜻하는지") */}
      <div style={{ marginTop: 4, marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
          {t(E, "🔍 Sample", "🔍 샘플")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 12 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>{t(E, "sample input", "입력 예")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`1 0
2
COWOWC`}
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "sample output", "출력 예")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`2
2 1 1 1 1 2`}
            </div>
          </div>
        </div>

        {/* 형식 읽기 — 짧게. 자세한 개념 (한 지우기 = 여러 글자) 은 다음 페이지 EraseRuleSim 이 담당 */}
        <div style={{ background: "#fff", border: `1px dashed ${C.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 12.5, lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E,
              <>Output line 1 <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>2</code> = <b>M</b> = number of erase moves used (2 moves).</>,
              <>출력 1 줄 <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>2</code> = <b>M</b> = 지우기 횟수 (2 번).</>)}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E,
              <>Output line 2 <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>2 1 1 1 1 2</code> = one number per letter of S, telling which erase-move removed it.</>,
              <>출력 2 줄 <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>2 1 1 1 1 2</code> = S 의 글자마다 하나씩, 몇 번째 지우기에서 사라졌는지.</>)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
            {"COWOWC".split("").map((ch, i) => {
              const op = [2,1,1,1,1,2][i];
              const col = op === 1 ? OP1_COL : OP2_COL;
              const bg = op === 1 ? OP1_BG : OP2_BG;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 5, background: bg, border: `1.5px solid ${col}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 13, color: "#1f2937" }}>{ch}</div>
                  <div style={{ width: 26, height: 26, borderRadius: 5, background: col, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13 }}>{op}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic", wordBreak: "keep-all" }}>
            {t(E, "One move can wipe many letters at once — the next page shows how.",
                  "한 번의 지우기가 여러 글자를 한꺼번에 없앨 수 있어요 — 어떻게 되는지 다음 페이지에서.")}
          </div>
        </div>
      </div>

      {/* CONSTRAINTS — 맨 마지막 (숫자 벽 페이지 위쪽에 두면 학생 위축) */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
          <div>1 ≤ T ≤ 10⁴</div>
          <div>1 ≤ N (sum of N over all tests ≤ 10⁵)</div>
          <div>k ∈ {"{0, 1}"}</div>
          <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "S consists of characters C, O, W only", "S 는 C, O, W 로만 이루어짐")}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCowSplitsCh1 — mooin3 모양 (라벨 + 구체 샘플 + 풀이예제)
   문제(도입) → 샘플 입출력 → 규칙 → 막힘 → 아이디어 → 풀이 예제 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    // [기] 문제 도입 — photoshoot25 형태 + USACO 원문 순서:
    //   (1) S 가 뭔지 → (2) "square string" 정의 (Y+Y + 예시) → (3) 그런 T 를 부분수열로 골라 지운다 → 👉 최소 M
    //   미션에 정의 안 된 용어 쓰지 말 것 (선생님 2026-08-14: "뜬금없이 제곱 부분수열?")
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a string S made of COW-like pieces. Empty S in as few moves as possible — each move picks some letters that read as 'same piece twice'.",
        "Bessie 앞에 COW 조각들로 만든 문자열 S. 최소 몇 번에 다 지울 수 있을까요? 한 번에 뽑는 글자들은 '같은 조각 두 번' 이어야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission — 정의 안 된 용어 쓰지 말고 일상어로 */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Empty S in as few moves as possible.",
                "S 를 가능한 적은 횟수로 비워요.")}
            </div>
          </div>

          {/* 📖 Problem bullets — USACO 원문 순서:
              (1) S 가 뭔지  (2) square string 정의  (3) 한 번의 지우기  (4) 목표 */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {/* (1) S 가 뭔지 */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "S has length ", "S 는 길이 ")}
                  <b style={{ color: "#059669" }}>3N</b>
                  {t(E, " — N pieces glued together. Each piece is ", ", ")}
                  <b>{t(E, "a cyclic shift of ", "'COW' 를 굴려 만든 조각 (")}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code></b>
                  {t(E, " — that is ", ", ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>OWC</code>
                  {t(E, ", or ", ", ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>WCO</code>
                  {t(E, ".", ") N 개를 이은 것.")}
                </div>
              </div>

              {/* (2) "square string" 정의 — Y+Y + 예시 */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#0891b2", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Call a string a ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "\"square string\"", "\"square string\"")}</b>
                  {t(E, " when it looks like ", " 이란: 어떤 조각 Y 를 ")}
                  <b>Y + Y</b>
                  {t(E, " for some piece Y (i.e. same piece written twice).", " 로 두 번 이어 붙인 것 — 즉 같은 조각이 두 번.")}
                  <div style={{ marginTop: 4, fontSize: 12, color: C.dim }}>
                    {t(E, "e.g. ", "예: ")}
                    <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>COW+COW = COWCOW</code>
                    {", "}
                    <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>C+C = CC</code>
                    {t(E, ".  ", ".  ")}
                    <code style={{ background: "#fef2f2", padding: "1px 5px", borderRadius: 3, color: "#991b1b" }}>COWO</code>
                    {t(E, " is not (front ≠ back).", " 는 아님 (앞 ≠ 뒤).")}
                  </div>
                </div>
              </div>

              {/* (3) 한 번의 지우기 */}
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: pick some letters from S (keeping their order, need not be adjacent) so that the picked letters read as a ",
                        "한 번의 지우기: S 에서 글자 몇 개를 순서대로 뽑아 (붙어 있지 않아도 OK) ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "square string", "square string")}</b>
                  {t(E, ", then remove them.", " 을 만든 뒤 지워요.")}
                </div>
              </div>

              {/* 👉 목표 */}
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output ", "출력 ")}
                  <b style={{ color: "#15803d" }}>M</b>
                  {t(E, " (total moves) and label every letter with its move number. If impossible → ",
                        " (총 지우기 횟수) 과 각 글자의 지우기 번호. 불가능하면 → ")}
                  <code>-1</code>.
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 입출력 형식 (photoshoot25 3-박스: INPUT/OUTPUT/CONSTRAINTS + 샘플 예시)
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? Read T tests; each has N and the string S. Print M and the labels — or -1.",
        "데이터는 어떻게 들어올까? T 개 테스트, 각각 N 과 문자열 S. M 과 라벨을 출력, 아니면 -1."),
      content: (<CowSplitsSample E={E} />),
    },

    // [전] 규칙 — 한 연산 = 같은 조각 두 번 (Y+Y) 을 뽑아 지우기
    {
      type: "reveal",
      narr: t(E, "First — what does one move actually look like? Let's see.",
                 "먼저 — 한 번의 지우기가 어떻게 생겼는지 눈으로 봐요."),
      content: (<EraseRuleSim E={E} />),
    },
    // [전] 언제 1번? → 막힘
    {
      type: "reveal",
      narr: t(E, "If S itself already reads as Y+Y, one move clears it. But usually front half ≠ back half — so what then?",
                 "S 앞 절반 = 뒤 절반이면 한 번에 끝. 근데 보통은 안 맞아요 — 그럼 어떡할까요?"),
      content: (<StuckSim E={E} />),
    },
    // [전] 아이디어 — 블록 쌍 + 겹치는 2 글자
    {
      type: "reveal",
      narr: t(E, "How can we finish in just 2 moves? Pair up the blocks and look for something shared.",
                 "2 번 만에 끝낼 방법이 있을까? 블록끼리 짝지어 공통점을 찾아봐요."),
      content: (<InsightSim E={E} />),
    },
    // [전] 풀이 예제 — 샘플 COWOWC 를 2번에
    {
      type: "reveal",
      narr: t(E, "Now solve the sample: watch COWOWC get emptied in 2 ops — giving 2 1 1 1 1 2.",
                 "이제 샘플을 풀어봐요: COWOWC 가 2번에 비워지는 걸 봐요 — 답 2 1 1 1 1 2."),
      content: (<LetterGroupSim E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCowSplitsCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh2(E, lang = "py") {
  const w = getCowSplitsWalk(E, lang);
  return [
    // Plan — photoshoot25 표준. 시뮬 알아낸 것 → 변수 이름 소개
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code — here's what the sims told us, and the exact plan (with the variable names you'll see).",
        "코드 전에 — 시뮬이 알려준 것과, 정확한 계획 (곧 볼 변수 이름과 함께)."),
      content: (<CowSplitsPlan E={E} />),
    },
    // Code — mooin3 스타일 CodeWalk. ◀▶ 로 구현 조각씩 말풍선 이동
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Now the code. Each piece lights up in build order — click ▶ to move along.",
        "이제 코드예요. 구현 순서대로 조각이 밝아져요 — ▶ 눌러 따라가요."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
