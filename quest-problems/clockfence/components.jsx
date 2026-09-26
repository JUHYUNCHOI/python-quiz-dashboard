import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   ClockFenceDeepAuditSim — pick a fence path, step through every
   consecutive direction pair, watch (next - cur) mod 4 classify
   each transition (right / left / straight / U-turn), tally
   rights vs lefts, and let the verdict (CW / CCW) emerge.
   ═══════════════════════════════════════════════════════════════ */
const _CF_PRESETS = [
  { s: "NESW",     label: "NESW (square, CW)" },
  { s: "NWSE",     label: "NWSE (square, CCW)" },
  { s: "NENESWSW", label: "NENESWSW (L-shape)" },
  { s: "NNEESSWW", label: "NNEESSWW (rectangle)" },
];

const _DIR_MAP = { N: 0, E: 1, S: 2, W: 3 };
const _DIR_ARROW = { N: "↑", E: "→", S: "↓", W: "←" };
const _DIR_LABEL = { N: "N", E: "E", S: "S", W: "W" };
const _DIR_COLOR = { N: "#0ea5e9", E: "#16a34a", S: "#dc2626", W: "#f59e0b" };

function _classify(cur, nxt) {
  const diff = ((nxt - cur) % 4 + 4) % 4;
  if (diff === 1) return { kind: "R", diff };  // right
  if (diff === 3) return { kind: "L", diff };  // left
  if (diff === 2) return { kind: "U", diff };  // U-turn
  return { kind: "S", diff };                  // straight
}

export function ClockFenceDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { s } = _CF_PRESETS[pi];
  const [step, setStep] = useState(0);     // how many transitions revealed
  const [audited, setAudited] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setStep(0);
    setAudited(false);
  };

  const n = s.length;
  const transitions = [];
  for (let i = 0; i < n; i++) {
    const cur = _DIR_MAP[s[i]];
    const nxt = _DIR_MAP[s[(i + 1) % n]];
    transitions.push({ i, cur, nxt, ...(_classify(cur, nxt)) });
  }

  // Tally based on revealed-so-far step
  let rights = 0, lefts = 0;
  for (let k = 0; k < step; k++) {
    if (transitions[k].kind === "R") rights++;
    else if (transitions[k].kind === "L") lefts++;
  }
  const totalRights = transitions.filter(x => x.kind === "R").length;
  const totalLefts  = transitions.filter(x => x.kind === "L").length;
  const verdict = totalRights > totalLefts ? "CW" : "CCW";

  const advance = () => {
    if (step < n) setStep(step + 1);
    else setAudited(true);
  };
  const reset = () => { setStep(0); setAudited(false); };

  const kindBg = { R: "#dcfce7", L: "#fee2e2", U: "#fef3c7", S: "#e0e7ff" };
  const kindBd = { R: "#86efac", L: "#fca5a5", U: "#fde68a", S: "#a5b4fc" };
  const kindCol = { R: "#166534", L: "#991b1b", U: "#92400e", S: "#3730a3" };
  const kindTxt = (k) => k === "R" ? t(E, "right", "오른쪽")
                       : k === "L" ? t(E, "left",  "왼쪽")
                       : k === "U" ? t(E, "U-turn","U턴")
                       :              t(E, "straight","직진");

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_CF_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Step through each consecutive pair. Watch (next − cur) mod 4 decide right / left / straight / U-turn.",
          "이어진 방향을 두 개씩 한 걸음씩 봐요.\n(다음 − 지금) mod 4 가 오른쪽·왼쪽·직진·U턴 중 무엇인지 알려 줘요.")}
      </div>

      {/* direction row with arrow icons */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {s.split("").map((ch, i) => {
          const active = i === step % n && step < n;
          const consumed = i < step;
          return (
            <div key={i} style={{
              width: 40, height: 50, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 8,
              background: consumed ? "#f5f3ff" : (active ? "#ede9fe" : "#fff"),
              border: `1.5px solid ${active ? A : C.border}`,
              color: _DIR_COLOR[ch],
              boxShadow: active ? `0 0 0 2px ${A}33` : "none",
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{_DIR_ARROW[ch]}</div>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{_DIR_LABEL[ch]}</div>
            </div>
          );
        })}
      </div>

      {/* index row showing (next-cur) mod 4 calc, only for revealed steps */}
      <div style={{
        background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: "8px 10px", marginBottom: 10, fontSize: 12,
        fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 4, fontFamily: "inherit" }}>
          {t(E, "Transitions revealed", "지금까지 본 꺾임")} ({Math.min(step, n)} / {n})
        </div>
        {step === 0 && (
          <div style={{ color: C.dim, fontStyle: "italic" }}>
            {t(E, "Tap 'Next step' to reveal the first transition.",
                  "'다음 단계' 를 누르면 첫 꺾임부터 보여 줘요.")}
          </div>
        )}
        {transitions.slice(0, step).map((tr, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: C.dim, minWidth: 22 }}>#{k + 1}</span>
            <span style={{ color: _DIR_COLOR[s[tr.i]], fontWeight: 700 }}>{s[tr.i]}({tr.cur})</span>
            <span style={{ color: C.dim }}>→</span>
            <span style={{ color: _DIR_COLOR[s[(tr.i + 1) % n]], fontWeight: 700 }}>{s[(tr.i + 1) % n]}({tr.nxt})</span>
            <span style={{ color: C.dim }}>:</span>
            <span>({tr.nxt} − {tr.cur}) mod 4 = {tr.diff}</span>
            <span style={{
              padding: "1px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              background: kindBg[tr.kind], border: `1px solid ${kindBd[tr.kind]}`, color: kindCol[tr.kind],
            }}>
              {kindTxt(tr.kind)}
            </span>
          </div>
        ))}
      </div>

      {/* tally */}
      <div style={{
        background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "right", "오른쪽")} = {rights} &nbsp; {t(E, "left", "왼쪽")} = {lefts}
        </div>
        <div style={{ fontSize: 12, color: "#5b21b6" }}>
          {step < n
            ? t(E, "more to go…", "아직 남았어요…")
            : t(E, "all pairs counted ✓", "다 세었어요 ✓")}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={advance} disabled={audited} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: audited ? "#e5e7eb" : A, color: audited ? "#9ca3af" : "#fff",
          fontSize: 12, fontWeight: 700, cursor: audited ? "default" : "pointer",
        }}>
          {step < n
            ? t(E, "▶ Next step", "▶ 다음 단계")
            : t(E, "🔍 Reveal verdict", "🔍 답 보기")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 처음으로")}
        </button>
      </div>

      {/* verdict */}
      {audited && (
        <div style={{
          background: verdict === "CW" ? "#ecfdf5" : "#eff6ff",
          border: `1px solid ${verdict === "CW" ? "#6ee7b7" : "#93c5fd"}`,
          borderRadius: 10, padding: "10px 14px",
          color: verdict === "CW" ? "#065f46" : "#1e3a8a",
          fontSize: 13, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 800, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            rights ({totalRights}) {totalRights > totalLefts ? ">" : "≤"} lefts ({totalLefts}) → {verdict}
          </div>
          <div style={{ fontSize: 12 }}>
            {verdict === "CW"
              ? t(E, "More right turns than left → fence is traced CLOCKWISE.",
                    "오른쪽으로 꺾은 횟수가 더 많아요.\n그래서 이 울타리는 시계 방향(CW) 으로 그린 거예요.")
              : t(E, "More (or equal) left turns than right → fence is traced COUNTER-CLOCKWISE.",
                    "오른쪽으로 꺾은 횟수가 더 많지 않아요.\n그래서 이 울타리는 반시계 방향(CCW) 으로 그린 거예요.")}
          </div>
        </div>
      )}
    </div>
  );
}

// ⚠️ 로컬 검증만 — 재제출 대기 (USACO_VERIFIED 아님)
// 2026-09-26: 옛 코드는 T(테스트 개수)를 읽지 않고 문자열 한 줄만 읽어
// 다른 문제를 풀고 있었다(USACO_VERIFICATION.md: RTE/WA). 원문(Feb 2021
// Bronze #3) 확인 결과 입력은 "N, 그 다음 N 개의 방향 문자열" 이고
// 출력은 각 경로마다 CW/CCW 한 줄씩(N 줄)이다. 아래는 그 형식대로
// 고친 코드 — 공식 샘플 통과 + 브루트포스(신발끈 공식) 300케이스 대조
// 완료(python_qa 에이전트). 실제 USACO 채점기 제출은 아직 안 했다 —
// 로그인이 필요해 선생님 확인 대기.
const FULL_PY = [
  "n = int(input())",
  "",
  "for _ in range(n):",
  "    s = input().strip()",
  "",
  "    # 방향 번호: N=0, E=1, S=2, W=3",
  "    dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3}",
  "",
  "    right_turns = 0",
  "    left_turns = 0",
  "",
  "    for i in range(len(s)):",
  "        cur = dir_map[s[i]]",
  "        nxt = dir_map[s[(i+1) % len(s)]]",
  "        diff = (nxt - cur) % 4",
  "",
  "        if diff == 1:",
  "            right_turns += 1",
  "        elif diff == 3:",
  "            left_turns += 1",
  "        # diff == 2 면 U턴, diff == 0 이면 직진이에요",
  "",
  "    if right_turns > left_turns:",
  "        print('CW')",
  "    else:",
  "        print('CCW')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n;",
  "    cin >> n;",
  "",
  "    for (int t = 0; t < n; t++) {",
  "        string s;",
  "        cin >> s;",
  "",
  "        map<char, int> dirMap = {{'N', 0}, {'E', 1}, {'S', 2}, {'W', 3}};",
  "        int rights = 0;",
  "        int lefts = 0;",
  "",
  "        for (int i = 0; i < (int)s.size(); i++) {",
  "            int cur = dirMap[s[i]];",
  "            int next = dirMap[s[(i + 1) % s.size()]];",
  "            int diff = (next - cur + 4) % 4;",
  "",
  "            if (diff == 1) {",
  "                rights++;",
  "            } else if (diff == 3) {",
  "                lefts++;",
  "            }",
  "        }",
  "",
  "        if (rights > lefts) {",
  "            cout << \"CW\" << \"\\n\";",
  "        } else {",
  "            cout << \"CCW\" << \"\\n\";",
  "        }",
  "    }",
  "",
  "    return 0;",
  "}",
];

export function getClockFenceSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? For each fence path, whether the loop turns clockwise (CW) or counterclockwise (CCW).",
            "무엇을 출력해야 하나요?\n울타리마다 시계 방향(CW)으로 그렸는지\n반시계 방향(CCW)으로 그렸는지예요."),
        t(E, "One corner alone doesn't tell you the loop's overall direction. But going all the way around, right turns and left turns can't tie — one side always wins.",
            "모퉁이 하나만 보면 전체 방향은 몰라요.\n그런데 한 바퀴를 다 돌면\n오른쪽으로 꺾은 횟수와 왼쪽으로 꺾은 횟수가\n똑같을 수는 없어요 — 한쪽이 항상 더 많아요."),
        t(E, "So the code reads N paths, and for each one counts right vs left turns at every corner and prints whichever direction happened more.",
            "그래서 코드는 울타리 N 개를 읽고,\n하나마다 모퉁이에서\n오른쪽인지 왼쪽인지 세어서\n더 많이 나온 쪽을 방향으로 출력해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣으면 (<iostream>, <vector>, ...)\n코드가 무엇을 하려는지 더 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더한 값이나 곱한 값이 2×10^9 쯤을 넘을 수 있으면\nlong long 을 써요."),
      ],
    },
  ];
}

export function ClockFenceProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest
   코드 이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (그 이름 패턴은 보호 변수로 간주된다). ── */
export function getClockFenceWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "diff", ko: "(다음 방향 − 지금 방향) mod 4", en: "(next direction − current) mod 4" },
        { v: "rights/lefts", ko: "오른쪽/왼쪽으로 꺾은 횟수", en: "count of right/left turns" },
      ],
      beats: [
        { hi: [0, 11], bubble: t(E,
          "What do we print? For each fence path, whether the loop turns clockwise or counterclockwise.\nSo read N — how many paths there are — and read one path string per turn.",
          "무엇을 출력해야 하나요? 울타리마다 시계 방향인지 반시계 방향인지예요.\n그러니 울타리가 몇 개인지(N) 를 먼저 읽고, 한 바퀴에 방향 문자열을 하나씩 읽어요.") },
        { hi: [13, 15], bubble: t(E,
          "To compare directions as numbers, give each letter 0-3 going clockwise: N, E, S, W.\nThen start both turn counters at 0.",
          "방향을 숫자로 비교하려고 시계 방향 순서(N, E, S, W)대로 0~3 번을 매겨요.\n그리고 꺾은 횟수 둘을 0 으로 시작해요.") },
        { hi: [17, 27], bubble: t(E,
          "At each corner, compare this direction to the next one (wrapping around to the start). A difference of 1 means a right turn, 3 means a left turn — 2 is a U-turn and 0 is straight, neither of which we need to count.",
          "모퉁이마다 지금 방향과 다음 방향을 비교해요 (끝에서는 처음으로 돌아가요).\n차이가 1 이면 오른쪽, 3 이면 왼쪽으로 꺾은 거예요 — 2 는 U턴, 0 은 직진이라 세지 않아요.") },
        { hi: [29, 37], bubble: t(E,
          "One corner alone can't tell you the loop's overall direction, but going all the way around, right and left turns can't tie. So whichever count is bigger decides CW or CCW for this path — then move on to the next one.",
          "모퉁이 하나만으로는 전체 방향을 알 수 없지만, 한 바퀴를 다 돌면 오른쪽과 왼쪽 횟수가 같을 수 없어요.\n그래서 더 많은 쪽으로 이 울타리의 CW 나 CCW 를 출력하고, 다음 울타리로 넘어가요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "diff", ko: "(다음 방향 − 지금 방향) mod 4", en: "(next direction − current) mod 4" },
      { v: "right_turns/left_turns", ko: "오른쪽/왼쪽으로 꺾은 횟수", en: "count of right/left turns" },
    ],
    beats: [
      { hi: [0, 3], bubble: t(E,
        "What do we print? For each fence path, whether the loop turns clockwise or counterclockwise. So first read N (how many paths), then for each one read the path string.",
        "무엇을 출력해야 하나요? 울타리마다 시계 방향인지 반시계 방향인지예요.\n먼저 울타리 개수 N 을 읽고, 그만큼 반복하면서 방향 문자열을 하나씩 읽어요.") },
      { hi: [5, 6], bubble: t(E,
        "To compare directions numerically, give each letter a number 0-3 going clockwise: N, E, S, W.",
        "방향을 숫자로 비교하려고, 시계 방향 순서(N, E, S, W)대로 0~3 번을 매겨요.") },
      { hi: [8, 9], bubble: t(E,
        "We'll tally how many corners turn right versus left, so start both counters at 0.",
        "모퉁이마다 오른쪽으로 꺾었는지 왼쪽으로 꺾었는지 셀 거라, 두 값을 0 으로 시작해요.") },
      { hi: [11, 20], bubble: t(E,
        "At each corner, compare this direction to the next one (wrapping around to the start). A difference of 1 means a right turn, 3 means a left turn — 2 is a U-turn and 0 is straight, neither of which we need to count.",
        "모퉁이마다 지금 방향과 다음 방향을 비교해요 (끝에서는 처음으로 돌아가요).\n차이가 1 이면 오른쪽, 3 이면 왼쪽으로 꺾은 거예요 — 2 는 U턴, 0 은 직진이라 세지 않아요.") },
      { hi: [22, 25], bubble: t(E,
        "One corner alone can't tell you the loop's overall direction, but going all the way around, right and left turns can't tie. So print CW or CCW for this path — then move on to the next one.",
        "모퉁이 하나만으로는 전체 방향을 알 수 없지만, 한 바퀴를 다 돌면 오른쪽과 왼쪽 횟수가 같을 수 없어요.\n그래서 이 울타리는 더 많은 쪽으로 CW 나 CCW 를 출력하고, 다음 울타리로 넘어가요.") },
    ],
  };
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadClockFencePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ClockFence — Full Study Guide", "ClockFence — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}

