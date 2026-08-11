import { C, t } from "@/components/quest/theme";
import { getCowSplitsSections, getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { SquareSim, DecideSim, LetterGroupSim } from "./sims";

const A = "#059669";

/* 도입 — 문제를 눈으로 (블록 그림 + 규칙). 텍스트 벽/퀴즈 대신. */
function CowSplitsIntro({ E }) {
  const blocks = [["C", "O", "W"], ["O", "W", "C"]];   // N=2 예시
  const blockCol = ["#059669", "#0891b2"];
  const ruleBox = {
    display: "flex", gap: 9, alignItems: "flex-start", background: "#fff",
    border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 13px",
    fontSize: 13, color: "#334155", lineHeight: 1.6, wordBreak: "keep-all",
  };
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 30 }}>🐄✂️</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>USACO Dec 2025 Bronze #2</div>
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#334155", textAlign: "center", marginBottom: 10, wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, <>String <b>S</b> = <b>N</b> blocks; each block is <b>COW</b> / <b>OWC</b> / <b>WCO</b>. (example N = 2)</>,
             <>문자열 <b>S</b> = <b>N</b> 개 블록, 각 블록은 <b>COW</b> / <b>OWC</b> / <b>WCO</b> 중 하나. (예: N = 2)</>)}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
        {blocks.map((b, bi) => (
          <div key={bi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {b.map((ch, i) => (
                <div key={i} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, background: "#fff", border: `2px solid ${blockCol[bi]}`,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18, color: "#1f2937" }}>{ch}</div>
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: blockCol[bi], fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, `block ${bi + 1}`, `블록 ${bi + 1}`)} · {b.join("")}
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", display: "grid", gap: 8 }}>
        <div style={ruleBox}><span style={{ fontSize: 18 }}>✂️</span>
          <div>{t(E, <>One <b>operation</b>: pick some letters (even far apart) that form <b>Y+Y</b> (same piece twice), and erase them together. <span style={{ color: "#94a3b8" }}>— we'll unpack this next.</span></>,
                    <>한 <b>연산</b>: <b>같은 조각을 두 번(Y+Y)</b> 이루도록 글자를 골라(떨어져 있어도 OK) 한꺼번에 지움. <span style={{ color: "#94a3b8" }}>— 바로 다음에 풀어서 봐요.</span></>)}</div>
        </div>
        <div style={ruleBox}><span style={{ fontSize: 18 }}>🎯</span>
          <div>{t(E, <><b>Goal</b>: empty S in the <b>fewest</b> operations. If it's impossible → print <b>−1</b>.</>,
                    <><b>목표</b>: <b>가장 적은</b> 연산으로 S 를 다 비우기. 못 비우면 <b>−1</b> 출력.</>)}</div>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: "11px auto 0", fontSize: 11, color: "#92400e", background: "#fffbeb",
        border: "1px solid #fcd34d", borderRadius: 8, padding: "7px 11px", lineHeight: 1.5, wordBreak: "keep-all" }}>
        ⚠️ {t(E, "This tutorial does the k = 1 version (any M ≤ best + 1 is accepted).",
                 "이 튜토리얼은 k = 1 버전 (최적값 + 1 이하 아무 M 이나 통과).")}
      </div>
    </div>
  );
}

/* 결 — 전체 판단 한눈에 (정리). */
function CowSplitsWrap({ E }) {
  const Row = ({ q, arrow, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 14 }}>
        🧭 {t(E, "The whole decision, at a glance", "전체 판단 한눈에")}
      </div>
      <div style={{ maxWidth: 460, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "N is odd?", "N 이 홀수?")} res="−1" col="#dc2626" bg="#fef2f2" />
        <Row q={t(E, "S is a square (first half = second half)?", "S 가 사각 (앞 절반 = 뒤 절반)?")} res={t(E, "M = 1", "M = 1")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Otherwise → split by letter (C, O, W)", "그 외 → 글자별로 (C, O, W)")} res={t(E, "M = 3", "M = 3")} col="#8b5cf6" bg="#f5f3ff" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCowSplitsCh1 — 시각 시뮬 흐름 (퀴즈 없음)
   도입 → 사각이 뭔지 → 언제 몇 번 → 글자 트릭 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie empties a C/O/W string by erasing 'square' subsequences. First, let's see what S looks like and what one erase does.",
        "Bessie 는 COW 문자열을 '사각' 부분수열을 지워서 비워요. 먼저 S 가 어떻게 생겼고 한 번 지우면 뭐가 되는지 봐요."),
      content: (<CowSplitsIntro E={E} />),
    },
    {
      type: "reveal",
      narr: t(E,
        "'Erase a square subsequence' packs two hard words. Let's unpack them one at a time: pick (subsequence), then square.",
        "'사각 부분수열을 지운다' — 어려운 낱말 두 개예요. 하나씩 풀어봐요: 골라 빼기(부분수열) → 사각."),
      content: (<SquareSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E,
        "When can we empty S, and in how few ops? It splits into three cases.",
        "언제 비울 수 있고, 몇 번이면 될까? 세 경우로 갈려요."),
      content: (<DecideSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E,
        "The main trick: when one op isn't enough, erase one letter-type at a time — three ops, always works.",
        "핵심 트릭: 한 번으로 안 되면 글자 종류별로 한 번씩 — 세 번, 항상 통해요."),
      content: (<LetterGroupSim E={E} />),
    },
    {
      type: "reveal",
      narr: t(E,
        "So the whole answer is one small decision. Here it is in one picture.",
        "그래서 답 전체가 작은 판단 하나예요. 한 그림으로 정리."),
      content: (<CowSplitsWrap E={E} />),
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
        "코드를 위에서 아래로 읽어보자 — 말풍선이 설명하는 코드 줄에 바로 붙어 있어: 입력 읽기 → 짝수 체크 → M=1 시도 → 안 되면 글자-그룹 트릭."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
