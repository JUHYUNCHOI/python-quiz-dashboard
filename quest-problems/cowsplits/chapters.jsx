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
          head={t(E, "If S itself is a square → M = 1.", "S 자체가 제곱이면 → M = 1.")}
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
          <div><span style={{ color: "#92400e", fontWeight: 800 }}>T k</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of tests, k mode (0 = exact M, 1 = M ≤ opt+1)", "— 테스트 개수, k 모드 (0 = M 정확, 1 = M ≤ 최적+1)")}</span></div>
          <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of blocks (S has length 3N)", "— 블록 개수 (S 길이 = 3N)")}</span></div>
            <div><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the string, N blocks glued from COW/OWC/WCO", "— N 개 블록을 이은 문자열 (블록마다 COW/OWC/WCO 중 하나)")}</span></div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these two lines repeat T times", "↑ 이 두 줄이 T 번 반복")}</div>
          </div>
        </div>
      </div>

      {/* OUTPUT */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
        <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
          {t(E,
            "For each test — if impossible, one line: -1.  Otherwise: M on one line, then 3N move numbers (space-separated) telling which move erased each letter.",
            "각 테스트에 대해 — 불가능하면 한 줄에 -1.  가능하면 M 한 줄, 그다음 3N 개 연산 번호를 공백으로 (각 글자가 몇 번째 연산에서 지워졌는지).")}
        </div>
      </div>

      {/* CONSTRAINTS */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
          <div>1 ≤ T ≤ 10⁴</div>
          <div>1 ≤ N (sum of N over all tests ≤ 10⁵)</div>
          <div>k ∈ {"{0, 1}"}</div>
          <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "S consists of characters C, O, W only", "S 는 C, O, W 로만 이루어짐")}</div>
        </div>
      </div>

      {/* 샘플 예시 (구체 숫자 + 정답 시각화) */}
      <div style={{ marginTop: 4, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
          {t(E, "🔍 Worked sample", "🔍 샘플 예시")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 8 }}>
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
        <div style={{ fontSize: 11.5, color: "#065f46", marginBottom: 8, lineHeight: 1.6 }}>
          {t(E, "M = 2 moves.  Each letter is labeled with its move number:", "M = 2 (연산 2번).  각 글자에 연산 번호가 붙어요:")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6 }}>
          {S.map((ch, i) => {
            const op = LABELS[i];
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 34, height: 34, borderRadius: 7, background: bgFor(op), border: `2px solid ${colFor(op)}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 16, color: "#1f2937" }}>{ch}</div>
                <div style={{ width: 18, height: 18, borderRadius: 999, background: colFor(op), color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{op}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: "#166534", textAlign: "center", lineHeight: 1.6 }}>
          {t(E, "op 1 = OWOW = OW+OW ✓  ·  op 2 = CC = C+C ✓",
                "op 1 = OWOW = OW+OW ✓  ·  op 2 = CC = C+C ✓")}
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
    // [기] 문제 도입 — photoshoot25 형태 (Dec 2025 Bronze 표준):
    //   이모지 → 제목 → USACO 메타 → 🎯 미션 → 📖 문제 • 불릿 → 👉 목표
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a string S built from N blocks (each COW/OWC/WCO). Each move erases a 'square' subsequence — same piece twice. Empty S in as few moves as possible.",
        "Bessie 에게 문자열 S — N 개 블록 (COW/OWC/WCO 중 하나) 을 이은 것. 한 번의 지우기는 '제곱' 부분수열, 즉 같은 조각 두 번을 없애요. 가능한 적은 횟수로 S 를 비워봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Empty S with as few moves as possible — each move erases a square subsequence (Y+Y).",
                "S 를 가능한 적은 횟수로 비우기 — 한 번의 지우기는 제곱 부분수열 (Y+Y) 을 없애요.")}
            </div>
          </div>

          {/* 📖 Problem bullets */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "S has length ", "S 는 길이 ")}
                  <b style={{ color: "#059669" }}>3N</b>
                  {t(E, " — N blocks, each one of ", " — N 개 블록, 각 블록은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>OWC</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>WCO</code>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "square", "제곱")}</b>
                  {t(E, " string = ", " 문자열 = ")}
                  <b style={{ color: "#0891b2" }}>Y+Y</b>
                  {t(E, " for some piece Y (e.g. ", " (조각 Y 는 무엇이든; 예: ")}
                  <code>COWCOW</code>, <code>CC</code>{t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move erases any subsequence that is a square (letters kept in order, need not be adjacent).",
                        "한 번의 지우기는 S 에서 제곱이 되는 부분수열을 제거해요 (순서 유지, 붙어있지 않아도 OK).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output ", "출력 ")}
                  <b style={{ color: "#15803d" }}>M</b>
                  {t(E, " and label every letter with its move number. If impossible → ",
                        " 과 각 글자의 연산 번호를 출력.  불가능하면 → ")}
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

    // [전] 규칙 — 한 연산 = 제곱 부분수열
    {
      type: "reveal",
      narr: t(E, "First — one operation erases a 'square subsequence'. Let's see exactly what that means.",
                 "먼저 — 한 연산은 '제곱 부분수열'을 지워요. 그게 정확히 뭔지 봐요."),
      content: (<EraseRuleSim E={E} />),
    },
    // [전] 언제 1번? → 막힘
    {
      type: "reveal",
      narr: t(E, "If S itself is a square, one op clears it. But usually it isn't — so what then?",
                 "S 자체가 제곱이면 한 번에 끝. 근데 보통은 아니에요 — 그럼 어떡할까요?"),
      content: (<StuckSim E={E} />),
    },
    // [전] 아이디어 — 블록 쌍 + 겹치는 2 글자
    {
      type: "reveal",
      narr: t(E, "The key idea: pair each front block with its back partner. Any two of {COW, OWC, WCO} share a 2-letter overlap — so op 1 keeps the overlap, op 2 takes the leftover 1 letter each side.",
                 "핵심 아이디어: 앞 블록을 뒤 파트너 블록과 짝지어요. {COW, OWC, WCO} 어떤 두 블록도 2 글자가 겹쳐요 — op 1 은 겹치는 부분, op 2 는 양쪽에 남는 1 글자씩."),
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
        "Now the code — you just met the variables (ans, a, b, M). Watch each piece light up in build order: read input → parity → M=1 try → M=2 block-pair fallback → print.",
        "이제 코드 — 방금 변수 (ans, a, b, M) 를 만났죠. 구현 순서대로 조각이 밝아져요: 입력 → 홀짝 → M=1 시도 → M=2 블록 쌍 → 출력."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
