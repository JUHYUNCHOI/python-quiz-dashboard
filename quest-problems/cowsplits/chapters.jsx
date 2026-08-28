import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { EraseRuleSim, InsightSim, CowSplitsTraceSim } from "./sims";

const A = "#059669";
// op 색은 시뮬(sims.jsx OPCOL)과 통일: op1 = 빨강(겹치는 OW), op2 = 주황(남는 C)
const OP1_COL = "#ef4444";  // red  (op1 = overlap OW)
const OP2_COL = "#f59e0b";  // amber(op2 = leftover C)
const OP1_BG  = "#fef2f2";
const OP2_BG  = "#fffbeb";

/* Plan — photoshoot25 스타일. 시뮬에서 알아낸 것 → 코드 변수 이름 (ans, a, b, M) 미리 소개.
   Ch2 첫 페이지: CodeWalk 진입 준비. */
function CowSplitsPlan({ E }) {
  const box = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", wordBreak: "keep-all", textWrap: "balance" };
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
          head={t(E, "If S itself is Y+Y → M = 1.", "S 자체가 Y+Y (같은 덩어리 두 번) 이면 → M = 1.")}
          body={t(E,
            <>front half == back half? Label every letter with 1.</>,
            <>앞 절반 == 뒤 절반이면 모든 글자에 라벨 1.</>)} />
        <Insight icon="🔀" color="#8b5cf6"
          head={t(E, "Otherwise → pair blocks, share the overlap → M = 2.", "아니면 → 블록 짝짓기, 겹치는 부분 공유 → M = 2.")}
          body={t(E,
            <>For each front block <b>a</b> ↔ back partner <b>b</b>: keep the 2 overlapping chars in op 1, move the leftover 1 char per side to op 2.</>,
            <>앞 블록 <b>a</b> ↔ 뒤 파트너 <b>b</b> 마다: 겹치는 2 글자는 op 1, 양쪽에 남는 1 글자씩은 op 2.</>)} />
      </div>

      <div style={{ ...box, background: "#f8fafc", fontSize: 13, lineHeight: 1.75, color: "#334155" , wordBreak: "keep-all", textWrap: "balance" }}>
        ⚙️ {t(E,
          <>So: build the labels list {codeTag("ans")} (start all 1). Loop front-half blocks, grab {codeTag("a")} and {codeTag("b")}, patch op 2 where needed. Finally {codeTag("M")} = max({codeTag("ans")}).</>,
          <>그래서: 라벨 리스트 {codeTag("ans")} 를 만들고 (처음엔 다 1). 앞 절반 블록을 순회하며 {codeTag("a")}·{codeTag("b")} 꺼내 필요한 자리에 op 2 표시. 마지막에 {codeTag("M")} = max({codeTag("ans")}).</>)}
      </div>
    </div>
  );
}

/* 입출력 형식 — photoshoot25 3-박스 스타일: INPUT(amber) / OUTPUT(green) / CONSTRAINTS(white monospace).
   샘플 정답 시각화는 자연스레 아래 별도 카드로 (기존 유지). */
/* [승] 입력 형식만 — 짧게. 출력(글자별 op 배열)은 M=2 를 안 뒤에 CowSplitsOutput 에서. */
function CowSplitsInput({ E }) {
  return (
    <div style={{ padding: 16, wordBreak: "keep-all", textWrap: "balance" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
        <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
          <div><span style={{ color: "#92400e", fontWeight: 800 }}>T k</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of tests T, mode k", "— 테스트 개수 T, 모드 k")}</span></div>
          <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of blocks (S has length 3N)", "— 블록 개수 (S 길이 = 3N)")}</span></div>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the string, N blocks of COW/OWC/WCO", "— N 개 블록을 이은 문자열 (COW/OWC/WCO)")}</span></div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these two lines repeat T times", "↑ 이 두 줄이 T 번 반복")}</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
          <div>1 ≤ T ≤ 10⁴</div>
          <div>1 ≤ N (Σ N ≤ 10⁵)</div>
          <div style={{ color: C.dim, fontSize: 11, marginTop: 2 , wordBreak: "keep-all", textWrap: "balance" }}>{t(E, "S consists of characters C, O, W only", "S 는 C, O, W 로만 이루어짐")}</div>
        </div>
      </div>

      {/* k 는 곁길 — 각주로 축소 */}
      <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E,
          <><b>k</b> is just a scoring mode (0 = exact min, 1 = min+1 also OK). Our solution always gives the true minimum, so <b>k doesn't matter to us</b>.</>,
          <><b>k</b> 는 채점 모드일 뿐이에요 (0 = 정확한 최소, 1 = 최소+1 까지 OK). 우리 풀이는 늘 진짜 최소를 내니 <b>k 는 신경 안 써도 돼요</b>.</>)}
      </div>
    </div>
  );
}

/* [전] 답은 −1 / 1 / 2 셋 중 하나 — 문제의 핵심을 한 카드로 (Ch2 Plan 에만 있던 걸 여기로). */
function CowSplitsClassify({ E }) {
  const Row3 = ({ icon, color, bg, cond, ans, ex }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "center", background: bg, border: `1.5px solid ${color}`, borderRadius: 12, padding: "11px 14px" }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1, fontSize: 13, color: "#334155", lineHeight: 1.5, wordBreak: "keep-all", textWrap: "balance" }}>
        {cond}{ex && <span style={{ color: "#94a3b8", marginLeft: 6, fontFamily: "'JetBrains Mono',monospace" }}>{ex}</span>}
      </div>
      <div style={{ flexShrink: 0, minWidth: 40, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20, color }}>{ans}</div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0f172a", textAlign: "center", marginBottom: 4, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "So the answer is always one of just three", "그래서 답은 언제나 이 셋 중 하나")}
      </div>
      <div style={{ fontSize: 11.5, color: "#64748b", textAlign: "center", marginBottom: 12, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "never 3 or more — that's the whole problem", "3 이상은 절대 없어요 — 이게 문제의 전부")}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <Row3 icon="🚫" color="#dc2626" bg="#fef2f2"
          cond={t(E, <><b>N is odd</b> → impossible</>, <><b>N 이 홀수</b> → 불가능</>)} ans="−1" />
        <Row3 icon="🎯" color="#059669" bg="#ecfdf5"
          cond={t(E, <><b>S is already a square</b> (front half = back half)</>, <><b>S 자체가 제곱</b> (앞 절반 = 뒤 절반)</>)} ans="1" ex="COWCOW" />
        <Row3 icon="🔀" color="#8b5cf6" bg="#f5f3ff"
          cond={t(E, <><b>otherwise</b> → block-pair trick</>, <><b>그 외</b> → 블록쌍 트릭</>)} ans="2" ex="COWOWC" />
      </div>
    </div>
  );
}

/* [결] 출력 형식 — 이제 M=2 와 두 op 를 아니까 '글자별 op 번호' 배열이 이해됨. */
function CowSplitsOutput({ E }) {
  return (
    <div style={{ padding: 16, wordBreak: "keep-all", textWrap: "balance" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
        <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.75 , wordBreak: "keep-all", textWrap: "balance" }}>
          <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 4 }}>{t(E, "For each test — 2 lines:", "각 테스트마다 — 2 줄:")}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 3 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E, <><b>Line 1</b>: <code>M</code> = # of moves.  If impossible → <code>-1</code>.</>,
                       <><b>1 줄</b>: <code>M</code> = 지우기 횟수. 불가능하면 → <code>-1</code>.</>)}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
            <div>{t(E, <><b>Line 2</b>: 3N numbers — the i-th says which move erased S's i-th letter.</>,
                       <><b>2 줄</b>: 3N 개 숫자 — i 번째 숫자 = S 의 i 번째 글자가 몇 번째 지우기에 사라졌는지.</>)}</div>
          </div>
        </div>
      </div>

      {/* 방금 푼 COWOWC 2-move 풀이가 곧 이 출력 */}
      <div style={{ background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
          {t(E, "🔍 Our COWOWC solution → exactly this output", "🔍 방금 푼 COWOWC → 그게 곧 이 출력")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
          {"COWOWC".split("").map((ch, i) => {
            const op = [2,1,1,1,1,2][i];
            const col = op === 1 ? OP1_COL : OP2_COL;
            const bg = op === 1 ? OP1_BG : OP2_BG;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: bg, border: `1.5px solid ${col}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14, color: "#1f2937" }}>{ch}</div>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: col, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14 }}>{op}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 12, color: "#334155", textAlign: "center", lineHeight: 1.65, wordBreak: "keep-all", textWrap: "balance" }}>
          {t(E,
            <>The 4 <b style={{ color: OP1_COL }}>O W O W</b> letters were move <b style={{ color: OP1_COL }}>1</b>, the 2 <b style={{ color: OP2_COL }}>C … C</b> were move <b style={{ color: OP2_COL }}>2</b> → output <code>2</code>, then <code>2 1 1 1 1 2</code>.</>,
            <>가운데 <b style={{ color: OP1_COL }}>O W O W</b> 4글자는 <b style={{ color: OP1_COL }}>1번</b> 지우기, 양끝 <b style={{ color: OP2_COL }}>C … C</b> 2글자는 <b style={{ color: OP2_COL }}>2번</b> 지우기 → 출력 <code>2</code>, 그리고 <code>2 1 1 1 1 2</code>.</>)}
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
        "Bessie has a string S made of COW-like pieces. Empty it in as few moves as possible — each move erases a group of letters that reads as 'the same block twice' (e.g. COWCOW, CC).",
        "Bessie 앞에 COW 조각들로 만든 문자열 S. 최소 몇 번 만에 다 지울 수 있을까요? 한 번에 지우는 건 '똑같은 게 두 번' 인 글자 묶음이에요 (예: COWCOW, CC)."),
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
                  <b>{t(E, "a cyclic shift of ", "")}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code></b>
                   {t(E, " — that is ", " 를 굴려 만든 조각, 즉 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>OWC</code>
                  {t(E, ", or ", ", ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>WCO</code>
                  {t(E, ".", " 중 하나 — 를 N 개 이은 것.")}
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

    // [승] 입력 형식 (짧게 — 출력은 M=2 를 안 뒤에)
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? Read T tests; each gives N and the string S.",
        "데이터는 어떻게 들어올까? T 개 테스트, 각각 N 과 문자열 S 예요."),
      content: (<CowSplitsInput E={E} />),
    },

    // [승] 체험 — 한 번의 지우기 (CC → OWOW → OW+OW → 빈 문자열, 2번에 싹) + "항상 2번?" 질문
    {
      type: "reveal",
      narr: t(E, "First — what does one move actually look like? Let's clear COWOWC and count.",
                 "먼저 — 한 번의 지우기가 어떻게 생겼는지, COWOWC 를 직접 비워보며 세어봐요."),
      content: (<EraseRuleSim E={E} />),
    },
    // [전] 통찰 — 놀랍게도 항상 2번! (블록 쌍 + 겹치는 2 글자)
    {
      type: "reveal",
      narr: t(E, "Is there an S that really needs 3 or 4? Let's pair front and back blocks and check them one by one.",
                 "3번, 4번이 필요한 S 가 정말 있을까요? 앞뒤 블록을 짝지어서 하나씩 따져 봐요."),
      content: (<InsightSim E={E} />),
    },
    // [전] 분류 — 답은 −1 / 1 / 2 셋 중 하나
    {
      type: "reveal",
      narr: t(E, "Zoom out: the answer is always one of three — -1, 1, or 2. That's the whole problem.",
                 "한 발 물러서 정리해요: 답은 늘 셋 중 하나 — -1, 1, 2. 그게 이 문제의 전부예요."),
      content: (<CowSplitsClassify E={E} />),
    },
    // [결] 출력 형식 — 이제 M=2 와 두 op 를 아니까 '글자별 op 번호' 배열이 이해됨
    {
      type: "reveal",
      narr: t(E, "Now the output makes sense: print M, then which move erased each letter — our COWOWC gives 2 1 1 1 1 2.",
                 "이제 출력이 이해돼요: M 과 글자별 '몇 번째 지우기'를 출력 — COWOWC 는 2 1 1 1 1 2."),
      content: (<CowSplitsOutput E={E} />),
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
    // Run — 코드 앞에 ans 표가 채워지는 걸 눈으로 (photoshoot25 Run 단계처럼)
    {
      type: "reveal",
      label: t(E, "Run", "실행"),
      narr: t(E,
        "Before reading the code — watch its ans table fill in on COWOWC, so the code reads easy after.",
        "코드를 읽기 전에 — ans 표가 COWOWC 에서 채워지는 걸 먼저 눈으로 봐요. 그럼 코드가 쉽게 읽혀요."),
      content: (<CowSplitsTraceSim E={E} />),
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
