import { useEffect, useRef, useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ================================================================
   RoundSim — visualize one round (two reversals) + cycle detection
   on [1,2,3,4,5] with reverses (1-3) then (3-5).
   Pure presentation, no algorithm change.
   ================================================================ */
export function SwapityRoundSim({ E }) {
  // 0-indexed reversal ranges: [0..2] then [2..4] on a 5-cow array.
  const N = 5;
  const REV = [
    [0, 2],
    [2, 4],
  ];
  const initial = [1, 2, 3, 4, 5];

  // Compute one-round permutation P (apply both reversals to identity).
  const onePerm = (() => {
    const p = [...initial];
    for (const [l, r] of REV) {
      const slice = p.slice(l, r + 1).reverse();
      for (let k = 0; k < slice.length; k++) p[l + k] = slice[k];
    }
    return p; // P[i] = cow at position i after one round
  })();

  // Detect cycle length: apply round repeatedly to initial.
  const cycleLen = (() => {
    let cur = [...initial];
    let n = 0;
    do {
      const nxt = new Array(N);
      for (let i = 0; i < N; i++) {
        // Map by reapplying reversals (equivalent to one round).
        nxt[i] = cur[i];
      }
      // Just apply the same reversals to cur:
      for (const [l, r] of REV) {
        const slice = nxt.slice(l, r + 1).reverse();
        for (let k = 0; k < slice.length; k++) nxt[l + k] = slice[k];
      }
      cur = nxt;
      n++;
      if (n > 60) break;
    } while (!cur.every((v, i) => v === initial[i]));
    return n;
  })();

  /* phase machine:
     0 = identity, 1 = after first reversal, 2 = after second (= 1 round done)
     round counter increments when we transition 2 -> next 0. */
  const [phase, setPhase] = useState(0);
  const [round, setRound] = useState(0);
  const [arr, setArr] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const stepOnce = (curArr, curPhase, curRound) => {
    if (curPhase === 0) {
      // Apply first reversal.
      const next = [...curArr];
      const [l, r] = REV[0];
      const slice = next.slice(l, r + 1).reverse();
      for (let k = 0; k < slice.length; k++) next[l + k] = slice[k];
      return { arr: next, phase: 1, round: curRound };
    }
    if (curPhase === 1) {
      const next = [...curArr];
      const [l, r] = REV[1];
      const slice = next.slice(l, r + 1).reverse();
      for (let k = 0; k < slice.length; k++) next[l + k] = slice[k];
      return { arr: next, phase: 2, round: curRound + 1 };
    }
    // phase 2 -> start of next round (no array change yet, just reset highlight)
    return { arr: curArr, phase: 0, round: curRound };
  };

  const doStep = () => {
    const { arr: a, phase: p, round: r } = stepOnce(arr, phase, round);
    setArr(a); setPhase(p); setRound(r);
  };
  const doReset = () => {
    setPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setArr(initial); setPhase(0); setRound(0);
  };
  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setPlaying(true);
  };

  // Auto-advance when playing.
  useEffect(() => {
    if (!playing) return;
    if (round >= cycleLen && phase === 0) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => {
      const { arr: a, phase: p, round: r } = stepOnce(arr, phase, round);
      setArr(a); setPhase(p); setRound(r);
    }, 700);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, arr, phase, round, cycleLen]);

  // Highlight which range is "active" based on phase.
  const activeRange = phase === 0 ? null : REV[phase === 1 ? 0 : 1];
  const phaseLabel = (() => {
    if (phase === 0) return t(E, "Start of round (identity)", "라운드 시작 (원래 줄)");
    if (phase === 1) return t(E, `Step 1: reversed positions ${REV[0][0] + 1}–${REV[0][1] + 1}`, `1단계: 위치 ${REV[0][0] + 1}–${REV[0][1] + 1} 뒤집기 완료`);
    return t(E, `Step 2: reversed positions ${REV[1][0] + 1}–${REV[1][1] + 1}  →  round complete`, `2단계: 위치 ${REV[1][0] + 1}–${REV[1][1] + 1} 뒤집기 완료  →  라운드 끝`);
  })();

  const cellSize = 46;
  const gap = 8;
  const reachedCycle = round >= cycleLen && phase === 0;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
          🎬 {t(E, "Watch one round, then keep going", "한 라운드를 본 다음, 계속 돌려봐")}
        </div>
        <div style={{ fontSize: 12, color: "#5b21b6", lineHeight: 1.5 }}>
          {t(E,
            "Array [1..5]. Each round = reverse positions 1–3, then reverse 3–5. Step or play to see the cycle close.",
            "배열 [1..5]. 한 라운드 = 위치 1–3 뒤집기 → 위치 3–5 뒤집기. 단계로 넘기거나 재생을 눌러 순환이 닫히는 걸 확인.")}
        </div>
      </div>

      {/* Array row */}
      <div style={{ display: "flex", justifyContent: "center", gap, marginBottom: 10 }}>
        {arr.map((v, i) => {
          const inRange = activeRange && i >= activeRange[0] && i <= activeRange[1];
          return (
            <div key={i} style={{
              width: cellSize, height: cellSize,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: inRange ? "#fde68a" : "#fff",
              color: C.text,
              border: `2px solid ${inRange ? "#f59e0b" : A}`,
              borderRadius: 8,
              fontWeight: 800, fontSize: 18,
              transition: "all .35s ease",
              boxShadow: inRange ? "0 2px 8px rgba(245,158,11,.4)" : "none",
            }}>{v}</div>
          );
        })}
      </div>

      {/* Position labels */}
      <div style={{ display: "flex", justifyContent: "center", gap, marginBottom: 14 }}>
        {arr.map((_, i) => (
          <div key={i} style={{ width: cellSize, textAlign: "center", fontSize: 10, color: C.dim }}>
            pos {i + 1}
          </div>
        ))}
      </div>

      {/* Where each ORIGINAL cow ended up — arrows after a full round */}
      {phase === 2 && (
        <div style={{ background: "#ecfdf5", border: "1px dashed #10b981", borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#047857", marginBottom: 6 }}>
            🔁 {t(E, "After this round, cow → new position:", "이 라운드 후 소 → 새 위치:")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#047857" }}>
            {onePerm.map((cow, newPos) => (
              <span key={newPos} style={{ background: "#fff", padding: "2px 8px", borderRadius: 6, border: "1px solid #a7f3d0" }}>
                {t(E, `cow ${cow} → pos ${newPos + 1}`, `소 ${cow} → 위치 ${newPos + 1}`)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Counters */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, color: A, fontWeight: 700 }}>
          {t(E, "Round", "라운드")}: <b style={{ fontSize: 15 }}>{round}</b> / K
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #10b981", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: "#047857", fontWeight: 700 }}>
          {t(E, "Cycle length", "순환 길이")}: <b style={{ fontSize: 15 }}>{reachedCycle ? cycleLen : "?"}</b>
        </div>
        <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: C.text }}>
          {phaseLabel}
        </div>
      </div>

      {/* Cycle hint */}
      {reachedCycle && (
        <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
          💡 {t(E,
            `The array returned to [1..5] after ${cycleLen} rounds. So K rounds is the same as K mod ${cycleLen} rounds — that's how 10^9 becomes manageable.`,
            `${cycleLen} 라운드 후 배열이 [1..5] 로 돌아왔어요. 즉 K 라운드 = K mod ${cycleLen} 라운드 — 10^9 가 다룰 만한 수가 되는 이유.`)}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={doStep} disabled={reachedCycle} style={{
          background: reachedCycle ? "#e5e7eb" : A, color: reachedCycle ? "#94a3b8" : "#fff",
          border: "none", borderRadius: 8, padding: "8px 18px",
          fontSize: 13, fontWeight: 700, cursor: reachedCycle ? "default" : "pointer",
        }}>▶ {t(E, "Step", "단계")}</button>
        <button onClick={togglePlay} disabled={reachedCycle} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 8,
          padding: "8px 18px", fontSize: 13, fontWeight: 700,
          cursor: reachedCycle ? "default" : "pointer",
          opacity: reachedCycle ? 0.5 : 1,
        }}>{playing ? "⏸ " + t(E, "Pause", "일시정지") : "⏯ " + t(E, "Play", "재생")}</button>
        <button onClick={doReset} style={{
          background: "#fff", color: C.dim, border: `1.5px solid ${C.border}`, borderRadius: 8,
          padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음으로")}</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M, K = map(int, input().split())",
  "swaps = []",
  "for _ in range(M):",
  "    l, r = map(int, input().split())",
  "    swaps.append((l - 1, r - 1))  # 0-indexed",
  "",
  "# Build permutation for one round",
  "perm = list(range(N))",
  "for l, r in swaps:",
  "    # Reverse perm[l..r]",
  "    perm[l:r+1] = perm[l:r+1][::-1]",
  "",
  "# Find cycle length by repeated application",
  "# (apply perm until we get identity)",
  "cur = list(range(N))",
  "cycle = 0",
  "while True:",
  "    cur = [cur[perm[i]] for i in range(N)]",
  "    cycle += 1",
  "    if cur == list(range(N)):",
  "        break",
  "",
  "# K mod cycle gives effective rounds",
  "eff = K % cycle",
  "result = list(range(N))",
  "for _ in range(eff):",
  "    result = [result[perm[i]] for i in range(N)]",
  "",
  "# Output 1-indexed",
  "for i in range(N):",
  "    print(result[i] + 1)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int N, M, K; cin >> N >> M >> K;",
  "    vector<int> perm(N);",
  "    iota(perm.begin(), perm.end(), 0);",
  "    while (M--) {",
  "        int l, r; cin >> l >> r; l--; r--;",
  "        reverse(perm.begin() + l, perm.begin() + r + 1);",
  "    }",
  "    // Apply permutation K times via cycles",
  "    vector<int> cur(N);",
  "    iota(cur.begin(), cur.end(), 0);",
  "    vector<bool> vis(N, false);",
  "    for (int i = 0; i < N; i++) {",
  "        if (vis[i]) continue;",
  "        vector<int> cyc;",
  "        int x = i;",
  "        while (!vis[x]) { vis[x] = true; cyc.push_back(x); x = perm[x]; }",
  "        int L = (int)cyc.size();",
  "        int shift = K % L;",
  "        for (int j = 0; j < L; j++) cur[cyc[j]] = cyc[(j + shift) % L];",
  "    }",
  "    // cur[i] = where i ends up; output in 1-indexed cow order",
  "    vector<int> out(N);",
  "    for (int i = 0; i < N; i++) out[cur[i]] = i + 1;",
  "    for (int i = 0; i < N; i++) cout << out[i] << \"\n\";",
  "    return 0;",
  "}",
];

export function getSwapitySections(E) {
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
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function SwapityProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadSwapityPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Swapity — Full Study Guide", "Swapity — 종합 풀이 노트");
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

