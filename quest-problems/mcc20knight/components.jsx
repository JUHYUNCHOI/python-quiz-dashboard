import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

// 8 knight L-moves: 2 in one axis, 1 in the perpendicular.
const MOVES = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];

// Minimum knight moves from (0,0) to (dx,dy) on an INFINITE board.
// BFS with a small negative margin so a short path may dip below 0
// (e.g. reaching (1,1) really needs 2 moves, not 4).
function minKnight(dx, dy) {
  dx = Math.abs(dx); dy = Math.abs(dy);
  const M = 4, LO = -M, HI = Math.max(dx, dy) + M, SIZE = HI - LO + 1;
  const ix = (v) => v - LO;
  const dist = Array.from({ length: SIZE }, () => new Array(SIZE).fill(-1));
  dist[ix(0)][ix(0)] = 0;
  const q = [[0, 0]]; let head = 0;
  while (head < q.length) {
    const [x, y] = q[head++];
    const d = dist[ix(x)][ix(y)];
    for (const [mx, my] of MOVES) {
      const nx = x + mx, ny = y + my;
      if (nx >= LO && nx <= HI && ny >= LO && ny <= HI && dist[ix(nx)][ix(ny)] === -1) {
        dist[ix(nx)][ix(ny)] = d + 1;
        q.push([nx, ny]);
      }
    }
  }
  return dist[ix(dx)][ix(dy)];
}

/* ─────────────────────────────────────────────────────────────
   Concept sim: pick a target square, see its MINIMUM moves, then
   nudge K. Green when K ≥ min AND (K − min) is even → reachable in
   EXACTLY K. Red otherwise. Teaches: extra moves come in pairs.
   ───────────────────────────────────────────────────────────── */
export function KnightExactSim({ E }) {
  const N = 7, SR = 3, SC = 3;          // 7×7 board, knight in the center
  const [pick, setPick] = useState({ r: 0, c: 0 });  // start target: offset (3,3)
  const dx = Math.abs(pick.r - SR), dy = Math.abs(pick.c - SC);
  const need = minKnight(dx, dy);
  const [k, setK] = useState(need);

  const reachable = k >= need && (k - need) % 2 === 0;
  const reason = k < need
    ? t(E, "K is smaller than the minimum — you can't even get there yet.",
          "K가 최소 이동보다 작아요 — 아직 도착조차 못 해요.")
    : ((k - need) % 2 === 1
        ? t(E, "Leftover K − min is ODD — those wasted moves can't pair up.",
              "남는 K − 최소가 홀수예요 — 낭비할 이동이 짝을 못 지어요.")
        : t(E, "Leftover K − min is EVEN — waste it as go-and-come-back pairs.",
              "남는 K − 최소가 짝수예요 — 갔다 오기 짝으로 딱 낭비돼요."));

  const cellSize = 40;

  const clickCell = (r, c) => {
    if (r === SR && c === SC) return;
    const ndx = Math.abs(r - SR), ndy = Math.abs(c - SC);
    setPick({ r, c });
    setK(minKnight(ndx, ndy));   // reset K to the fresh minimum for a clean demo
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          ♞ {t(E, "Can it arrive in EXACTLY K moves?", "정확히 K번에 도착할 수 있을까?")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Click a square to pick a target. See its MINIMUM moves. Then change K and watch: green means the knight can land there in exactly K moves.",
            "칸을 눌러 목표를 골라요. 그 칸까지 최소 이동이 나와요. 그다음 K를 바꿔봐요: 초록이면 정확히 K번에 도착할 수 있어요.")}
        </div>

        {/* board */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${N}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${N}, ${cellSize}px)`,
            border: `2px solid ${A}`, borderRadius: 8, overflow: "hidden",
            boxShadow: "0 2px 8px rgba(37,99,235,.15)",
          }}>
            {Array.from({ length: N * N }, (_, idx) => {
              const r = Math.floor(idx / N), c = idx % N;
              const isStart = r === SR && c === SC;
              const isTarget = r === pick.r && c === pick.c && !isStart;
              const checker = (r + c) % 2 === 0 ? "#f1f5f9" : "#dbe3ee";
              let bg = checker;
              if (isTarget) bg = reachable ? "#bbf7d0" : "#fecaca";
              return (
                <button
                  key={idx}
                  onClick={() => clickCell(r, c)}
                  disabled={isStart}
                  title={isStart ? t(E, "knight", "나이트") : `(${Math.abs(r - SR)},${Math.abs(c - SC)})`}
                  style={{
                    background: bg,
                    border: "1px solid #94a3b8",
                    cursor: isStart ? "default" : "pointer",
                    fontSize: isStart ? 22 : 15, fontWeight: 800,
                    color: isStart ? "#1e293b" : (isTarget ? (reachable ? "#166534" : "#991b1b") : "#94a3b8"),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 0, transition: "background .2s ease",
                  }}
                >
                  {isStart ? "♞" : isTarget ? String(need) : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* offset + min readout */}
        <div style={{ textAlign: "center", fontSize: 12.5, color: C.text, marginBottom: 10, ...KA }}>
          {t(E, "target offset ", "목표 오프셋 ")}
          <b style={{ color: A, fontFamily: "'JetBrains Mono',monospace" }}>({dx}, {dy})</b>
          {t(E, "  ·  minimum moves = ", "  ·  최소 이동 = ")}
          <b style={{ color: A }}>{need}</b>
        </div>

        {/* K stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12.5, color: "#1e3a8a", fontWeight: 700 }}>K =</span>
          <button onClick={() => setK(Math.max(0, k - 1))} style={kBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: A, minWidth: 26, textAlign: "center" }}>{k}</span>
          <button onClick={() => setK(k + 1)} style={kBtn}>+</button>
        </div>

        {/* verdict */}
        <div style={{
          background: reachable ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${reachable ? "#6ee7b7" : "#fca5a5"}`,
          borderRadius: 10, padding: "12px 14px", ...KA,
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: reachable ? "#065f46" : "#b91c1c", marginBottom: 4 }}>
            {reachable
              ? t(E, `✅ YES — reachable in exactly ${k} moves`, `✅ YES — 정확히 ${k}번에 도착 가능`)
              : t(E, `❌ NO — not in exactly ${k} moves`, `❌ NO — 정확히 ${k}번엔 불가능`)}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>{reason}</div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "The rule: reachable in exactly K  ⇔  K ≥ min AND (K − min) is even. Extra moves are wasted two at a time — step out and come right back.",
            "규칙: 정확히 K번 도착  ⇔  K ≥ 최소 그리고 (K − 최소)가 짝수. 남는 이동은 두 번씩 낭비돼요 — 한 칸 나갔다 바로 돌아오기.")}
        </div>
      </div>
    </div>
  );
}
const kBtn = {
  width: 30, height: 30, borderRadius: 7, border: "1px solid #93c5fd", background: "#fff",
  color: "#1e3a8a", fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};


/* ================================================================
   SOLUTION CODE
   Precompute min knight moves once (BFS), then answer each query
   with:  exactly K  ⇔  K ≥ min  AND  (K − min) is even.
   ================================================================ */
const FULL_PY = [
  "from collections import deque",
  "",
  "# 8 knight L-moves (2 in one axis, 1 in the other)",
  "MOVES = [(-2,-1),(-2,1),(-1,-2),(-1,2),",
  "         (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "# minimum moves to cover any offset (dx, dy), 0 <= dx, dy <= 2000.",
  "# BFS once from (0,0); a small negative margin lets a short path",
  "# dip below 0 (needed to reach (1,1) in 2 moves).",
  "M = 4",
  "LO, HI = -M, 2000 + M",
  "SIZE = HI - LO + 1",
  "best = [[-1] * SIZE for _ in range(SIZE)]",
  "best[0 - LO][0 - LO] = 0",
  "q = deque([(0, 0)])",
  "while q:",
  "    x, y = q.popleft()",
  "    for dx, dy in MOVES:",
  "        nx, ny = x + dx, y + dy",
  "        if LO <= nx <= HI and LO <= ny <= HI and best[nx - LO][ny - LO] == -1:",
  "            best[nx - LO][ny - LO] = best[x - LO][y - LO] + 1",
  "            q.append((nx, ny))",
  "",
  "T = int(input())",
  "out = []",
  "for _ in range(T):",
  "    K, X, Y, A, B = map(int, input().split())",
  "    dx, dy = abs(X - A), abs(Y - B)",
  "    need = best[dx - LO][dy - LO]",
  "    # exactly K  <=>  K >= need and leftover (K - need) is even",
  "    if K >= need and (K - need) % 2 == 0:",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int dr[8] = {-2,-2,-1,-1, 1, 1, 2, 2};",
  "int dc[8] = {-1, 1,-2, 2,-2, 2,-1, 1};",
  "",
  "const int M = 4, LO = -M, HI = 2000 + M, SIZE = HI - LO + 1;",
  "vector<vector<int>> best(SIZE, vector<int>(SIZE, -1));",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    // BFS once: minimum knight moves to every offset",
  "    best[0 - LO][0 - LO] = 0;",
  "    queue<pair<int,int>> q;",
  "    q.push(make_pair(0, 0));",
  "    while (!q.empty()) {",
  "        int x = q.front().first, y = q.front().second; q.pop();",
  "        for (int i = 0; i < 8; i++) {",
  "            int nx = x + dr[i], ny = y + dc[i];",
  "            if (nx>=LO && nx<=HI && ny>=LO && ny<=HI && best[nx-LO][ny-LO]==-1) {",
  "                best[nx-LO][ny-LO] = best[x-LO][y-LO] + 1;",
  "                q.push(make_pair(nx, ny));",
  "            }",
  "        }",
  "    }",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int K, X, Y, A, B;",
  "        cin >> K >> X >> Y >> A >> B;",
  "        int dx = abs(X - A), dy = abs(Y - B);",
  "        int need = best[dx - LO][dy - LO];",
  "        // exactly K  <=>  K >= need and leftover (K - need) is even",
  "        if (K >= need && (K - need) % 2 == 0) cout << \"YES\\n\";",
  "        else cout << \"NO\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc20KnightSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Reaching (A,B) from (X,Y) is the same as covering the offset (dx,dy) = (|X−A|, |Y−B|) from (0,0) — so one BFS from the origin answers every query.",
            "(X,Y) 에서 (A,B) 로 가는 건 (0,0) 에서 오프셋 (dx,dy) = (|X−A|, |Y−B|) 를 덮는 것과 같아요 — 그래서 원점에서 BFS 한 번이면 모든 질문에 답해요."),
        t(E, "BFS gives the MINIMUM moves to each offset. Then the exact-K test is just: K ≥ min AND (K − min) is even — extra moves are wasted two at a time (out and back).",
            "BFS 는 각 오프셋까지의 최소 이동을 줘요. 그다음 정확히-K 판정은 딱: K ≥ 최소 그리고 (K − 최소)가 짝수 — 남는 이동은 두 번씩(나갔다 돌아오기) 낭비돼요."),
        t(E, "Why parity is forced: a knight flips square color every move, so the number of moves and (dx+dy) always share the same parity. That's why the leftover must be even.",
            "왜 홀짝이 강제될까: 나이트는 한 번 움직일 때마다 칸 색이 바뀌어서, 이동 횟수와 (dx+dy)는 항상 같은 홀짝이에요. 그래서 남는 값이 짝수여야 해요."),
      ],
      pyOnly: [
        t(E, "best[nx - LO][ny - LO] shifts coordinates by LO so negative cells fit into a normal 2D list.",
            "best[nx - LO][ny - LO] 는 좌표를 LO 만큼 밀어 음수 칸도 보통 2차원 리스트에 담아요."),
        t(E, "Collect answers in a list and print once with '\\n'.join — faster than printing T times.",
            "답을 리스트에 모아 '\\n'.join 으로 한 번에 출력해요 — T 번 출력보다 빨라요."),
      ],
      cppOnly: [
        t(E, "dr[]/dc[] list the 8 L-moves; LO shifts coordinates so negatives index a plain vector.",
            "dr[]/dc[] 는 8 개 L-이동; LO 로 좌표를 밀어 음수도 보통 vector 로 인덱싱해요."),
        t(E, "ios::sync_with_stdio(false) speeds up cin/cout for up to 400 queries.",
            "ios::sync_with_stdio(false) 로 최대 400 질문의 cin/cout 을 빠르게 해요."),
      ],
    },
  ];
}

export function Mcc20KnightProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMcc20KnightPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Knight — Full Study Guide", "Mcc20Knight — 종합 풀이 노트");
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
