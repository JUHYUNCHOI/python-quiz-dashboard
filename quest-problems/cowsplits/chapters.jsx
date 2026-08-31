import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { EraseRuleSim, OddImpossibleSim, InsightSim, CowSplitsTraceSim } from "./sims";

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
        🧩 {t(E, "What we found out", "우리가 알아낸 것")}
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
          <>그래서: 라벨 리스트 {codeTag("ans")} 를 만들어요 (처음엔 다 1).<br />앞 절반 블록을 돌며 {codeTag("a")}·{codeTag("b")} 를 꺼내<br />필요한 자리에 op 2 를 표시해요.<br />마지막에 {codeTag("M")} = 라벨의 최댓값.</>)}
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
          <><b>k</b> is a scoring mode: 0 = the exact minimum, 1 = minimum or one more.<br /><b>k = 1 is the looser of the two</b>, so anything that clears k = 0 clears k = 1 as well. Our solution always gives the true minimum, so it passes both and <b>never has to look at k</b>.</>,
          <><b>k</b> 는 채점 모드예요: 0 = 정확한 최소, 1 = 최소 또는 최소+1.<br /><b>k=1 이 k=0 보다 느슨해요.</b> 그래서 k=0 을 통과하면 k=1 도 저절로 통과해요.<br />우리 풀이는 늘 진짜 최소를 내니 둘 다 통과 — <b>k 를 볼 일이 없어요</b>.</>)}
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
        {t(E, "we just saw why 3 or more never happens", "3 번 이상이 왜 안 나오는지 방금 봤어요")}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <Row3 icon="🚫" color="#dc2626" bg="#fef2f2"
          cond={t(E, <><b>N is odd</b> → impossible</>, <><b>N 이 홀수</b> → 불가능</>)} ans="−1" />
        <Row3 icon="🎯" color="#059669" bg="#ecfdf5"
          cond={t(E, <><b>S is already a square</b> (front half = back half)</>, <><b>S 자체가 제곱</b> (앞 절반 = 뒤 절반)</>)} ans="1" ex="COWCOW" />
        <Row3 icon="🔀" color="#8b5cf6" bg="#f5f3ff"
          cond={t(E, <><b>otherwise</b> → pair front and back blocks</>, <><b>그 외</b> → 앞뒤 블록을 짝지어서</>)} ans="2" ex="COWOWC" />
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
            <>가운데 <b style={{ color: OP1_COL }}>O W O W</b> 4글자는 <b style={{ color: OP1_COL }}>1번</b> 지우기,<br />양끝 <b style={{ color: OP2_COL }}>C … C</b> 2글자는 <b style={{ color: OP2_COL }}>2번</b> 지우기.<br />→ 출력 <code>2</code>, 그리고 <code>2 1 1 1 1 2</code>.</>)}
        </div>
      </div>
    </div>
  );
}

/* [결] 원문 샘플의 3 — quest 의 '원래 문제' 버튼으로 USACO 원문을 열면
   샘플 출력에 3 이 보이는데 우리 답은 2 라서 학생이 반드시 헷갈린다.
   (선생님 2026-08-30: 이 혼동을 직접 겪으심 — quest 에 한 줄도 없었음) */
function CowSplitsSampleThree({ E }) {
  const Line = ({ tag, m, tone }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 9,
      background: tone === "ours" ? "#ecfdf5" : "#f8fafc",
      border: `1.5px solid ${tone === "ours" ? "#6ee7b7" : C.border}` }}>
      <div style={{ flex: 1, fontSize: 12.5, color: "#334155", wordBreak: "keep-all" }}>{tag}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18,
        color: tone === "ours" ? "#059669" : "#64748b" }}>{m}</div>
    </div>
  );
  return (
    <div style={{ padding: 16, wordBreak: "keep-all", textWrap: "balance" }}>
      <div style={{ background: "#fffbeb", border: "2px solid #fbbf24", borderRadius: 12, padding: "12px 15px", marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#92400e", marginBottom: 5 }}>
          ⚠️ {t(E, "You will see a 3 in the official sample", "원문 샘플에는 3 이 보여요")}
        </div>
        <div style={{ fontSize: 12.5, color: "#78350f", lineHeight: 1.8 }}>
          {t(E,
            <>Open the original problem and the sample output for <code>COWCOWOWCOWCOWCOWC</code> says <b>3</b>. Ours says <b>2</b>. Is ours wrong?</>,
            <>원문을 열어보면 <code>COWCOWOWCOWCOWCOWC</code> 의 샘플 출력이 <b>3</b> 이에요.<br />우리는 <b>2</b> 라고 하고요. 우리가 틀린 걸까요?</>)}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        <Line tag={t(E, "the official sample (k = 1)", "원문 샘플 (k = 1)")} m="3" />
        <Line tag={t(E, "our solution", "우리 풀이")} m="2" tone="ours" />
      </div>

      <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 12, padding: "12px 15px", fontSize: 12.5, color: "#065f46", lineHeight: 1.85 }}>
        {t(E,
          <><b>Both are accepted.</b> The statement says "provide <i>a way</i> to do so" — a checker verifies your answer instead of matching it to the sample.<br />That sample runs with <b>k = 1</b>, which allows one extra move, so the author showed a 3 on purpose. The statement even spells it out: <i>"the optimal number of operations is two."</i><br />The very next sample gives the same string with <b>k = 0</b>, and there the answer is <b>2</b>.</>,
          <><b>둘 다 정답이에요.</b> 문제가 "한 가지 방법을 제시하라" 고만 해서, 샘플과 맞춰보는 게 아니라 검사 프로그램이 유효한지만 봐요.<br />그 샘플은 <b>k = 1</b> 이라 한 번 더 써도 되거든요. 그래서 출제자가 일부러 3 짜리를 보여준 거예요.<br />문제에 대놓고 적혀 있어요 — <i>"이 테스트의 최적은 2번"</i>.<br />바로 다음 샘플은 같은 문자열을 <b>k = 0</b> 으로 주는데, 거기선 답이 <b>2</b> 예요.</>)}
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
        "COW 조각들로 만든 S 를 최소 몇 번에 다 지울까요? 한 번에 지우는 건 '똑같은 게 두 번' 꼴이에요."),
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
              {/* (1) S 가 뭔지 — 이 문제 풀이 전체가 이 한 줄 위에 서 있다.
                  선생님 2026-08-30: "처음 내가 COW/OWC/WCO 이걸 놓쳤더라고. 이게 중요한거였어"
                  → 다른 불릿과 같은 모양이면 배경설정처럼 읽혀서 넘어간다. 카드로 끌어올림. */}
              <div style={{ background: "#fffbeb", border: "2px solid #fbbf24", borderRadius: 12,
                padding: "12px 14px", margin: "2px 0 4px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", letterSpacing: 0.4, marginBottom: 8 }}>
                  🔑 {t(E, "THE ONE FACT EVERYTHING RESTS ON", "이 문제의 열쇠")}
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginBottom: 9, flexWrap: "wrap" }}>
                  {["COW", "OWC", "WCO"].map((b, bi) => (
                    <span key={b} style={{ display: "inline-flex", gap: 2, padding: 5, borderRadius: 9,
                        background: "#fff", border: "1.5px dashed #f59e0b" }}>
                        {b.split("").map((ch, i) => (
                          <span key={i} style={{ width: 26, height: 30, display: "flex", alignItems: "center",
                            justifyContent: "center", borderRadius: 6, background: "#fffbeb",
                            border: "1.5px solid #f59e0b", fontFamily: "'JetBrains Mono',monospace",
                            fontWeight: 800, fontSize: 15, color: "#92400e" }}>{ch}</span>
                        ))}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 12.5, color: "#78350f", lineHeight: 1.75, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
                  {t(E,
                    <>Every piece of <b>S</b> is one of these three — <b>COW rolled around</b>, nothing else.<br />
                      <b>S</b> is <b>N</b> of them glued together, so its length is <b>3N</b>.</>,
                    <><b>S</b> 의 조각은 <b>이 셋뿐</b>이에요 — <b>COW 를 한 칸씩 굴린 것</b>, 그 외엔 없어요.<br />
                      <b>S</b> 는 이 조각을 <b>N 개</b> 이은 것이라 길이가 <b>3N</b> 이에요.</>)}
                </div>
                <div style={{ marginTop: 9, paddingTop: 8, borderTop: "1px dashed #fbbf24",
                  fontSize: 11.5, color: "#92400e", lineHeight: 1.7, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
                  {t(E,
                    <>Hold on to this. It is the reason two moves are always enough — and if pieces could be any 3 letters, this problem would be a completely different one.</>,
                    <>이걸 꼭 붙잡고 가세요. 나중에 <b>왜 2번이면 되는지</b>가 전부 여기서 나와요.<br />조각이 아무 3글자나 될 수 있었다면 완전히 다른 문제가 돼요.</>)}
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
    // [승] 불가능한 경우 — 전엔 통찰 시뮬 마지막 단계에 얹혀 있었음. 다른 질문이라 분리
    // (선생님 2026-08-29 검토). 요약 페이지 순서(−1 → 1 → 2)와도 맞음.
    {
      type: "reveal",
      narr: t(E, "Before counting moves — is there an S we can never empty at all?",
                 "몇 번인지 세기 전에 — 아예 못 비우는 S 도 있을까요?"),
      content: (<OddImpossibleSim E={E} />),
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
      narr: t(E, "Zoom out: every S lands in one of three cases — -1, 1, or 2.",
                 "한 발 물러서 정리해요. 어떤 S 든 −1, 1, 2 셋 중 하나예요."),
      content: (<CowSplitsClassify E={E} />),
    },
    // [결] 출력 형식 — 이제 M=2 와 두 op 를 아니까 '글자별 op 번호' 배열이 이해됨
    {
      type: "reveal",
      narr: t(E, "Now the output makes sense: print M, then which move erased each letter — our COWOWC gives 2 1 1 1 1 2.",
                 "이제 출력이 이해돼요: M 과 글자별 '몇 번째 지우기'를 출력 — COWOWC 는 2 1 1 1 1 2."),
      content: (<CowSplitsOutput E={E} />),
    },
    // [결] 원문 샘플이 3 인 이유 — 안 짚어주면 학생이 '우리가 틀렸나?' 로 끝난다
    {
      type: "reveal",
      narr: t(E, "One last thing: the official sample prints 3 for a string we answer 2 for. Here's why both are right.",
                 "마지막 하나 — 우리가 2 라고 한 문자열을 원문 샘플은 3 이라고 해요. 둘 다 맞는 이유예요."),
      content: (<CowSplitsSampleThree E={E} />),
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
        "코드 전에 — 앞에서 알아낸 것과 정확한 계획 (곧 볼 변수 이름과 함께)."),
      content: (<CowSplitsPlan E={E} />),
    },
    // Run — 코드 앞에 ans 표가 채워지는 걸 눈으로 (photoshoot25 Run 단계처럼)
    {
      type: "reveal",
      label: t(E, "Run", "실행"),
      narr: t(E,
        "Before reading the code — watch its ans table fill in on COWOWC, so the code reads easy after.",
        "코드 전에 — ans 표가 채워지는 걸 먼저 눈으로 봐요. 그럼 코드가 쉽게 읽혀요."),
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
