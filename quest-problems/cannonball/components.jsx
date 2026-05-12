import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav, useTraceStep, NarrativePanel, StepHeader } from "@/components/quest/TraceStepper";

const A = "#f97316";

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "S = int(data[p])",
  "p += 1",
  "typ = [0] * (N + 2)",
  "val = [0] * (N + 2)",
  "for i in range(1, N + 1):",
  "    typ[i] = int(data[p])",
  "    p += 1",
  "    val[i] = int(data[p])",
  "    p += 1",
  "",
  "x = S",
  "direction = 1",
  "power = 1",
  "broken = [False] * (N + 2)",
  "ans = 0",
  "",
  "for _ in range(5_000_000):",
  "    if x < 1 or x > N:",
  "        break",
  "    if typ[x] == 1 and power >= val[x] and not broken[x]:",
  "        broken[x] = True",
  "        ans += 1",
  "    if typ[x] == 0:",
  "        direction *= -1",
  "        power += val[x]",
  "    x += direction * power",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, S;",
  "    cin >> N >> S;",
  "    vector<int> typ(N + 2, 0), val(N + 2, 0);",
  "    for (int i = 1; i <= N; i++) cin >> typ[i] >> val[i];",
  "",
  "    long long x = S;",
  "    long long dir = 1;",
  "    long long power = 1;",
  "    long long ans = 0;",
  "    vector<bool> broken(N + 2, false);",
  "    int LIMIT = 5000000;",
  "    for (int reps = 0; reps < LIMIT; reps++) {",
  "        if (x < 1 || x > N) {",
  "            break;",
  "        }",
  "        if (typ[x] == 1 && power >= val[x] && !broken[x]) {",
  "            broken[x] = true;",
  "            ans++;",
  "        }",
  "        if (typ[x] == 0) {",
  "            dir *= -1;",
  "            power += val[x];",
  "        }",
  "        x += dir * power;",
  "    }",
  "",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCannonballSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, vector).",
            "#include 는 배운 헤더들로 (iostream, vector) 나눠 적어."),
        t(E, "power grows multiplicatively — long long avoids overflow on x and power.",
            "power 가 곱셈으로 커져 — x 와 power 는 long long 으로 안전하게."),
      ],
    },
  ];
}

export function CannonballProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadCannonballPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cannonball — Full Study Guide", "Cannonball — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
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


/* ════════════════════════════════════════════════════════════════
   CannonballTrajectorySim — eye-evident bouncing on a number line.
   Hard-coded to sample 1 (N=5, S=2).  Each click of "Next" advances
   one logical step: process pad → move.  Power, direction, ans, and
   the broken-set are all visible at once.
   ════════════════════════════════════════════════════════════════ */
const SAMPLE_PADS = [
  { i: 1, kind: "jump", v: 1 },
  { i: 2, kind: "tgt",  v: 1 },
  { i: 3, kind: "tgt",  v: 2 },
  { i: 4, kind: "jump", v: 1 },
  { i: 5, kind: "tgt",  v: 1 },
];

// trace[k] = state AT THIS MOMENT (after the action described in `note`).
// We build it explicitly so the order of "process pad" vs "move" stays clear.
const TRAJECTORY = [
  // 0 — start
  { x: 2, dir: 1, power: 1, ans: 0, broken: [],   active: 2, fromX: null, toX: null,
    note: { en: "Start: x=2, power=1, direction=→ (right). ans=0.",
            ko: "시작: x=2, 파워=1, 방향=→ (오른쪽). ans=0." } },
  // 1 — at x=2 (target v=1): power 1 ≥ 1 → break
  { x: 2, dir: 1, power: 1, ans: 1, broken: [2],  active: 2, fromX: null, toX: null,
    note: { en: "x=2 is a target with value 1. power 1 ≥ 1 → break! ans=1.",
            ko: "x=2 는 값 1 인 타겟. 파워 1 ≥ 1 → 부숨! ans=1." } },
  // 2 — move: x ← 2 + 1·1 = 3
  { x: 3, dir: 1, power: 1, ans: 1, broken: [2],  active: 3, fromX: 2, toX: 3,
    note: { en: "Move by direction × power = +1. x: 2 → 3.",
            ko: "direction × power = +1 만큼 이동. x: 2 → 3." } },
  // 3 — at x=3 (target v=2): power 1 < 2 → can't break
  { x: 3, dir: 1, power: 1, ans: 1, broken: [2],  active: 3, fromX: null, toX: null,
    note: { en: "x=3 is a target with value 2. power 1 < 2 → too weak, no break.",
            ko: "x=3 은 값 2 인 타겟. 파워 1 < 2 → 부족, 못 부숨." } },
  // 4 — move: x ← 3 + 1·1 = 4
  { x: 4, dir: 1, power: 1, ans: 1, broken: [2],  active: 4, fromX: 3, toX: 4,
    note: { en: "Move by +1. x: 3 → 4.",
            ko: "+1 만큼 이동. x: 3 → 4." } },
  // 5 — at x=4 (jump v=1): flip dir, power += 1
  { x: 4, dir: -1, power: 2, ans: 1, broken: [2], active: 4, fromX: null, toX: null,
    note: { en: "x=4 is a jump pad. Flip direction → ←, power += 1 → power=2.",
            ko: "x=4 는 점프 패드. 방향 뒤집고 → ←, 파워 += 1 → 파워=2." } },
  // 6 — move: x ← 4 + (-1)·2 = 2
  { x: 2, dir: -1, power: 2, ans: 1, broken: [2], active: 2, fromX: 4, toX: 2,
    note: { en: "Move by direction × power = -2. x: 4 → 2 (a big leap left!).",
            ko: "direction × power = -2 만큼 이동. x: 4 → 2 (왼쪽으로 크게 점프!)." } },
  // 7 — at x=2 (already broken; no effect)
  { x: 2, dir: -1, power: 2, ans: 1, broken: [2], active: 2, fromX: null, toX: null,
    note: { en: "x=2 is already broken — no effect this time.",
            ko: "x=2 는 이미 부서졌음 — 이번엔 아무 일도 안 일어남." } },
  // 8 — move: x ← 2 + (-1)·2 = 0  → out of [1, 5]
  { x: 0, dir: -1, power: 2, ans: 1, broken: [2], active: null, fromX: 2, toX: 0,
    note: { en: "Move by -2. x: 2 → 0. 0 < 1 → out of [1, 5]. STOP. Final ans = 1.",
            ko: "-2 만큼 이동. x: 2 → 0. 0 < 1 → [1, 5] 벗어남. 종료. 최종 ans = 1." } },
];

const PADX = (i) => 60 + (i - 1) * 80; // x-coord on SVG number line

export function CannonballTrajectorySim({ E }) {
  const ts = useTraceStep(TRAJECTORY);
  const s = TRAJECTORY[ts.safe];
  const note = E ? s.note.en : s.note.ko;

  const W = 60 + 5 * 80 + 60;
  const Y = 70;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={ts.idx}
        total={ts.total}
        isEn={E}
        title={t(E, "Watch Bessie bounce — sample 1, step by step",
                    "Bessie 가 튕기는 모습 — 샘플 1, 한 단계씩")}
      />

      {/* State chips: power / direction / ans */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <Chip label={t(E, "x", "x")} value={s.x === 0 ? "0 (out)" : String(s.x)} color="#1f2937" bg="#f3f4f6" />
        <Chip label={t(E, "dir", "방향")} value={s.dir === 1 ? "→" : "←"} color="#1d4ed8" bg="#dbeafe" />
        <Chip label={t(E, "power", "파워")} value={String(s.power)} color="#9a3412" bg="#fff7ed" />
        <Chip label={t(E, "ans", "ans")} value={String(s.ans)} color="#15803d" bg="#dcfce7" />
      </div>

      {/* Number line + pads + Bessie */}
      <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: "14px 8px", marginBottom: 12, overflowX: "auto" }}>
        <svg width={W} height={150} style={{ display: "block", margin: "0 auto" }}>
          {/* number line */}
          <line x1={20} y1={Y} x2={W - 20} y2={Y} stroke="#9a3412" strokeWidth={2} />
          {/* tick at 0 (out) */}
          <text x={20} y={Y + 32} fontSize={10} fill="#94a3b8" textAnchor="middle">0</text>
          {/* pads */}
          {SAMPLE_PADS.map(p => {
            const broken = s.broken.includes(p.i);
            const isActive = s.active === p.i;
            const fill = p.kind === "jump" ? "#dbeafe" : (broken ? "#e5e7eb" : "#fee2e2");
            const stroke = isActive ? A : (p.kind === "jump" ? "#3b82f6" : (broken ? "#9ca3af" : "#fca5a5"));
            const cx = PADX(p.i);
            return (
              <g key={p.i}>
                <rect x={cx - 22} y={Y - 22} width={44} height={44} rx={8}
                      fill={fill} stroke={stroke} strokeWidth={isActive ? 3 : 1.5} />
                <text x={cx} y={Y - 6} fontSize={14} textAnchor="middle">
                  {p.kind === "jump" ? "🪂" : (broken ? "💥" : "🎯")}
                </text>
                <text x={cx} y={Y + 12} fontSize={10} fontWeight={700}
                      fill={broken ? "#9ca3af" : "#1f2937"}
                      textDecoration={broken ? "line-through" : "none"}>
                  v={p.v}
                </text>
                <text x={cx} y={Y + 32} fontSize={10} fill="#9a3412" textAnchor="middle" fontWeight={700}>
                  {p.i}
                </text>
              </g>
            );
          })}
          {/* movement arrow (curved) when this step is a move */}
          {s.fromX != null && s.toX != null && (() => {
            const x1 = s.fromX === 0 ? 30 : PADX(s.fromX);
            const x2 = s.toX === 0 ? 30 : PADX(s.toX);
            const midX = (x1 + x2) / 2;
            const arc = Math.min(36, Math.abs(x2 - x1) / 2 + 12);
            const path = `M ${x1} ${Y - 24} Q ${midX} ${Y - 24 - arc} ${x2} ${Y - 24}`;
            return (
              <g>
                <path d={path} stroke={A} strokeWidth={2.5} fill="none"
                      markerEnd="url(#arr)" strokeDasharray="4 3" />
                <defs>
                  <marker id="arr" markerWidth={8} markerHeight={8} refX={6} refY={4}
                          orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 z" fill={A} />
                  </marker>
                </defs>
              </g>
            );
          })()}
          {/* Bessie marker */}
          {s.x >= 1 && s.x <= 5 && (
            <text x={PADX(s.x)} y={Y + 56} fontSize={22} textAnchor="middle">💥</text>
          )}
          {s.x === 0 && (
            <text x={30} y={Y + 56} fontSize={20} textAnchor="middle">💥</text>
          )}
        </svg>
      </div>

      <NarrativePanel minHeight={70} stepKey={ts.safe}>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>{note}</div>
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

function Chip({ label, value, color, bg }) {
  return (
    <div style={{
      background: bg, border: `1.5px solid ${color}33`, borderRadius: 8,
      padding: "4px 10px", fontSize: 12, color, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace", display: "flex", gap: 6, alignItems: "baseline",
    }}>
      <span style={{ fontSize: 10, opacity: 0.75 }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

