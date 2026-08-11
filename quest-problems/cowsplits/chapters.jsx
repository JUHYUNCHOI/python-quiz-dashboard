import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { EraseRuleSim, StuckSim, InsightSim, LetterGroupSim } from "./sims";

const A = "#059669";

/* 계획/정리 — 발견한 걸 한 판단으로 (photoshoot25 톤과 통일: 해요체). */
function CowSplitsPlan({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole decision, at a glance", "전체 판단 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Check these in order — the first one that fits is the answer.", "위에서부터 확인 — 처음 맞는 게 답이에요.")}
      </div>
      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Is N odd?", "N 이 홀수?")} res="−1" col="#dc2626" bg="#fef2f2" />
        <Row q={t(E, "Is S itself a square? (front half = back half)", "S 자체가 제곱? (앞 절반 = 뒤 절반)")} res={t(E, "M = 1", "M = 1")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Otherwise → gather each letter (C, O, W)", "아니면 → 글자별로 모으기 (C, O, W)")} res={t(E, "M = 3", "M = 3")} col="#8b5cf6" bg="#f5f3ff" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCowSplitsCh1 — Dec 2025 Bronze 시즌 표준 모양
   (photoshoot25 와 통일: 제목카드 → 입출력형식 → 개념시뮬들)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    // 1-1: 제목 + 미션 + 문제 (형제 quest 와 같은 카드 모양)
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a string S of length 3N, built from N blocks. Each block is COW, OWC, or WCO. She can erase a square subsequence (Y+Y) per operation. Empty out S in as few ops as possible.",
        "Bessie 에게 길이 3N 의 문자열 S 가 있어요. N 개 블록으로 이뤄지고 각 블록은 COW / OWC / WCO 중 하나. 한 번의 연산마다 사각 부분수열 (Y+Y) 을 지워요. 가능한 적은 연산으로 S 를 비워봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #2</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Empty S by repeatedly removing square-string subsequences, minimizing the number of operations.",
                "사각 문자열 부분수열을 반복해서 지워 S 를 비우되 연산 횟수를 최소화.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            ⚠️ {t(E,
              "This tutorial covers only the k = 1 variant (output any M ≤ optimal + 1). The exact-optimum k = 0 case is harder — see the official editorial.",
              "이 튜토리얼은 k = 1 변형 (M ≤ 최적값 + 1 인 어떤 M 든 출력) 만 다뤄요. 정확한 최솟값을 요구하는 k = 0 케이스는 더 어려워요 — 공식 editorial 참고.")}
          </div>

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
                  <b style={{ color: "#0891b2" }}>{t(E, "square string", "사각 문자열")}</b>
                  {t(E, " equals Y+Y for some Y (e.g. ", " 은 어떤 Y 에 대해 Y+Y 형태 (예: ")}
                  <code>COWCOW</code>, <code>CC</code>{t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation removes any subsequence T from S where T is a square (letters kept in order, need not be adjacent).",
                        "한 연산은 S 에서 사각인 부분수열 T 를 제거 (순서 유지, 붙어있지 않아도 됨).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "If impossible print ", "불가능하면 ")}
                  <code>-1</code>
                  {t(E, ". Otherwise print M and label each char with its operation index (1..M).",
                       " 출력. 가능하면 M 과 각 글자의 연산 번호 (1..M) 를 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: 입출력 형식 + 제약 (형제 quest 와 같은 카드 모양)
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive, and what exactly do we print?",
        "데이터는 어떻게 들어오고, 정확히 뭘 출력할까요?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T k</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— # of tests, k (0 or 1)", "— 테스트 개수, k (0 또는 1)")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— block count (S has length 3N)", "— 블록 개수 (S 길이 3N)")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the C/O/W string", "— COW 문자열")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these two lines repeat T times", "↑ 이 두 줄이 T 번 반복")}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT (per test)", "출력 (테스트마다)")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, lineHeight: 1.7, color: "#065f46" }}>
              <div>{t(E, "• impossible → ", "• 못 비우면 → ")}<code style={{ background: "#fff", padding: "0 5px", borderRadius: 4 }}>-1</code></div>
              <div style={{ marginTop: 3 }}>{t(E, "• else → ", "• 되면 → ")}<b>M</b>{t(E, ", then 3N integers: which operation (1..M) erased each letter.", ", 그다음 3N 개 정수: 각 글자가 몇 번째 연산(1..M)에서 지워졌는지.")}</div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontWeight: 700 }}>
                {t(E, "= split every letter into M groups, each group a square (read in original order).",
                     "= 모든 글자를 M 개 그룹으로 나눠, 각 그룹이 (원래 순서로) 제곱.")}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>T ≤ 10⁴</div>
              <div>{t(E, "sum of N ≤ 10⁵", "N 의 합 ≤ 10⁵")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "k = 0: M must be smallest · k = 1: smallest+1 ok", "k = 0: M 최소 · k = 1: 최소+1까지 OK")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: 한 연산 = 사각 부분수열 (개념 시뮬)
    {
      type: "reveal",
      narr: t(E, "First — one operation erases a 'square subsequence'. Let's see exactly what that means.",
                 "먼저 — 한 연산은 '사각 부분수열'을 지워요. 그게 정확히 뭔지 봐요."),
      content: (<EraseRuleSim E={E} />),
    },
    // 1-4: 언제 1번? (운 좋으면) → 막힘
    {
      type: "reveal",
      narr: t(E, "If S itself is a square, one op clears it. But usually it isn't — so what then?",
                 "S 자체가 제곱이면 한 번에 끝. 근데 보통은 아니에요 — 그럼 어떡할까요?"),
      content: (<StuckSim E={E} />),
    },
    // 1-5: 핵심 — 같은 글자끼리 (왜 되나 + 홀수→-1)
    {
      type: "reveal",
      narr: t(E, "The key idea: we can pick letters from anywhere, so gather the same letters. Let's see why it always works.",
                 "핵심 아이디어: 글자를 여기저기서 골라도 되니, 같은 글자끼리 모아요. 왜 항상 되는지 봐요."),
      content: (<InsightSim E={E} />),
    },
    // 1-6: 실행 — COWOWC 를 3번에
    {
      type: "reveal",
      narr: t(E, "Now use that idea to actually clear COWOWC.",
                 "그 아이디어로 COWOWC 를 실제로 지워봐요."),
      content: (<LetterGroupSim E={E} />),
    },
    // 1-7: 정리
    {
      type: "reveal",
      narr: t(E, "Everything boils down to one small decision.",
                 "결국 작은 판단 하나로 정리돼요."),
      content: (<CowSplitsPlan E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCowSplitsCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh2(E, lang = "py") {
  const w = getCowSplitsWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read input, parity check, try M=1, otherwise the letter-group trick.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → 짝수 체크 → M=1 시도 → 안 되면 글자-그룹 트릭."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
