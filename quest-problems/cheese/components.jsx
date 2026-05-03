import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

export function Cube3D({ N, carved, E }) {
  const [rotX, setRotX] = useState(-30);
  const [rotY, setRotY] = useState(40);
  const dragRef = useRef(null);

  const onPD = (e) => {
    e.preventDefault();
    dragRef.current = { x: e.clientX, y: e.clientY, rx: rotX, ry: rotY };
  };

  useEffect(() => {
    const mv = (e) => {
      if (!dragRef.current) return;
      setRotY(dragRef.current.ry + (e.clientX - dragRef.current.x) * 0.5);
      setRotX(Math.max(-80, Math.min(10, dragRef.current.rx - (e.clientY - dragRef.current.y) * 0.5)));
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
  }, []);

  const S = 52, gap = 3, unit = S + gap, half = S / 2;
  const total = N * unit;
  const isC = (x, y, z) => carved.some(c => c[0] === x && c[1] === y && c[2] === z);

  const cells = [];
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++)
      for (let z = 0; z < N; z++)
        cells.push([x, y, z]);

  // Label shown on all 6 faces
  const mkLabel = (x, y, z, color) => (
    <span style={{
      fontSize: 10, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace",
      color, pointerEvents: "none",
    }}>{x},{y},{z}</span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
      <div onPointerDown={onPD} style={{
        perspective: 600, width: total * 2.4, height: total * 2.4,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "grab", touchAction: "none",
      }}>
        <div style={{
          width: total, height: total, position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}>
          {cells.map(([x, y, z], i) => {
            if (isC(x, y, z)) return null;

            // Mapping: x→CSS-X, y→CSS-Z(depth), z→CSS-Y(up, flipped)
            const cx = x * unit + half;
            const cy = (N - 1 - z) * unit + half;
            const cz = y * unit + half;

            const topC = "#fde047", frC = "#eab308", sideC = "#ca8a04";
            const brd = "1px solid rgba(120,80,0,0.25)", txtC = "#78510a";

            const lbl = mkLabel(x, y, z, txtC);

            // Each face: S×S div, centered on the cube via wrapper translate3d
            // Then offset from center by ±half in the appropriate axis
            const face = (bg, transform) => (
              <div style={{
                position: "absolute", width: S, height: S,
                left: -half, top: -half,
                background: bg, border: brd, borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                backfaceVisibility: "hidden",
                transform,
              }}>{lbl}</div>
            );

            return (
              <div key={i} style={{
                position: "absolute",
                transformStyle: "preserve-3d",
                // Move wrapper to the CENTER of this unit cube in 3D space
                transform: `translate3d(${cx}px, ${cy}px, ${cz}px)`,
              }}>
                {face(frC, `translateZ(${half}px)`)}
                {face(frC, `translateZ(${-half}px) rotateY(180deg)`)}
                {face(topC, `translateY(${-half}px) rotateX(90deg)`)}
                {face(sideC, `translateY(${half}px) rotateX(-90deg)`)}
                {face(sideC, `translateX(${half}px) rotateY(90deg)`)}
                {face(sideC, `translateX(${-half}px) rotateY(-90deg)`)}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ fontSize: 11, color: C.dim }}>{"🖱️"} {E ? "Drag to rotate" : "드래그로 회전"}</div>
    </div>
  );
}

/* --- Brute Force Runner --- */
export function CheeseBruteRunner({ E }) {
  const [N, setN] = useState(3);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const run = () => {
    if (N < 2 || N > 50) return;
    setRunning(true); setResult(null);
    const t0 = performance.now();
    // Brute: random Q removals, check all lines each time
    const Q = Math.min(N * N * N, 30);
    const allCells = [];
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) allCells.push([x,y,z]);
    // shuffle
    for (let i = allCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }
    const carved = [];
    const answers = [];
    const isC = new Set();
    for (let q = 0; q < Q; q++) {
      const [x,y,z] = allCells[q];
      carved.push([x,y,z]);
      isC.add(`${x},${y},${z}`);
      // Brute: check all 3N² lines
      let count = 0;
      for (let a = 0; a < N; a++)
        for (let b = 0; b < N; b++) {
          let ok = true;
          for (let c = 0; c < N; c++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      for (let b = 0; b < N; b++)
        for (let c = 0; c < N; c++) {
          let ok = true;
          for (let a = 0; a < N; a++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      for (let a = 0; a < N; a++)
        for (let c = 0; c < N; c++) {
          let ok = true;
          for (let b = 0; b < N; b++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      answers.push(count);
    }
    const ms = performance.now() - t0;
    setElapsed(ms);
    setResult({ Q, answers, lastAnswer: answers[answers.length - 1] });
    setRunning(false);
  };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>N =</span>
        <input type="number" min={2} max={50} value={N}
          onChange={e => { setN(+e.target.value); setResult(null); }}
          style={{ width: 60, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
        <button onClick={run} disabled={running || N < 2 || N > 50} style={{
          padding: "8px 20px", borderRadius: 10, border: "none",
          background: running ? "#e5e7eb" : "linear-gradient(135deg,#fbbf24,#d97706)",
          color: "#fff", fontSize: 14, fontWeight: 800, cursor: running ? "default" : "pointer",
        }}>{running ? "..." : E ? "Run Brute!" : "브루트 실행!"}</button>
      </div>
      {N > 20 && <div style={{ textAlign: "center", fontSize: 12, color: C.carry, fontWeight: 700, marginBottom: 8 }}>
        {E ? "⚠️ N>20 may be slow!" : "⚠️ N>20이면 느릴 수 있어!"}
      </div>}
      {result && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.dim, marginBottom: 4 }}>
            {E ? `${result.Q} removals in` : `${result.Q}번 제거 →`}{" "}
            <span style={{ fontWeight: 800, color: elapsed > 100 ? C.no : C.ok }}>{elapsed.toFixed(1)}ms</span>
          </div>
          <div style={{ fontSize: 11, color: C.dim }}>
            {E ? `Final answer: ${result.lastAnswer}` : `최종 답: ${result.lastAnswer}`}
          </div>
          {elapsed > 100 && (
            <div style={{ marginTop: 6, fontSize: 12, color: C.no, fontWeight: 700 }}>
              {E ? "Imagine N=1000 with 200K queries... 💀" : "N=1000에 20만 쿼리면... 💀"}
            </div>)}
        </div>)}
    </div>
  );
}

/* --- Interactive Simulator --- */
export function CheeseSim2({ E }) {
  const N = 2;
  const order = [[0,0,0],[1,1,1],[0,1,0],[1,0,0],[1,1,0]];
  const expectedAns = [0,0,1,2,5];

  const mkGrid = () => Array.from({length:N}, ()=>Array(N).fill(N));
  const initState = () => ({
    step: 0, xy: mkGrid(), yz: mkGrid(), xz: mkGrid(),
    total: 0, history: [], carved: [], lastCarved: null,
  });

  const [state, setState] = useState(initState);

  const doCarve = () => {
    if (state.step >= order.length) return;
    const [x,y,z] = order[state.step];
    const xy = state.xy.map(r=>[...r]);
    const yz = state.yz.map(r=>[...r]);
    const xz = state.xz.map(r=>[...r]);
    let newHits = 0;
    const details = [];
    xy[x][y] -= 1; if (xy[x][y] === 0) { newHits++; details.push("z"); }
    yz[y][z] -= 1; if (yz[y][z] === 0) { newHits++; details.push("x"); }
    xz[x][z] -= 1; if (xz[x][z] === 0) { newHits++; details.push("y"); }
    const newTotal = state.total + newHits;
    setState({
      step: state.step + 1, xy, yz, xz, total: newTotal,
      history: [...state.history, { coord: [x,y,z], hits: newHits, total: newTotal, details }],
      carved: [...state.carved, [x,y,z]], lastCarved: [x,y,z],
    });
  };

  const reset = () => setState(initState());
  const cur = state.step < order.length ? order[state.step] : null;

  return (
    <div style={{ padding: "12px 8px" }}>
      <Cube3D N={N} carved={state.carved} E={E} />

      {/* Answer display */}
      {state.step > 0 && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: C.dim, fontWeight: 600, marginBottom: 2 }}>
            {E ? "Bricks that fit:" : "들어갈 수 있는 막대:"}
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.accent }}>
            {state.total}
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 14 }}>
        {cur && (
          <div style={{ fontSize: 14, color: C.text, marginBottom: 8, fontWeight: 700 }}>
            {state.step + 1}/5: ({cur[0]},{cur[1]},{cur[2]}) {E ? "to remove" : "제거 예정"}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {state.step < order.length ? (
            <button onClick={doCarve} style={{
              padding: "12px 28px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg,#fbbf24,#d97706)",
              color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 3px 12px #fbbf2440",
            }}>{"🧀"} {E ? "Carve!" : "제거!"}</button>
          ) : (
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ok }}>
              {"🎉"} {E ? "All 5 answers match!" : "5개 전부 정답!"}
            </div>
          )}
          <button onClick={reset} style={{
            padding: "12px 16px", borderRadius: 10,
            border: `2px solid ${C.border}`, background: C.card,
            fontSize: 13, fontWeight: 700, cursor: "pointer", color: C.dim,
          }}>{"↻"}</button>
        </div>
      </div>
    </div>
  );
}


/* ================================================================
   ProgressiveCode — 인터랙티브 코드 뷰어
   섹션 버튼 + Python/C++ 토글 + "왜 이렇게?" + PDF 다운로드 (위젯 내부)
   ================================================================ */
export function CheeseProgressiveCode({ E, sections }) {
  const [active, setActive] = useState(null);
  const [lang, setLang] = useState("py");
  const cur = active !== null ? sections[active] : null;
  const code = cur ? (lang === "py" ? cur.py : cur.cpp) : null;

  const downloadPDF = () => downloadCheesePDF(E, sections, lang);

  return (
    <div style={{ padding: 14 }}>
      {/* 상단: 언어 토글 + PDF */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 2, background: "#fff", borderRadius: 8, border: `1.5px solid ${C.border}`, padding: 2 }}>
          {[["py","🐍 Python"],["cpp","💻 C++"]].map(([v, label]) => (
            <button key={v} onClick={() => setLang(v)} style={{
              background: lang === v ? "#d97706" : "transparent", border: "none", borderRadius: 6,
              padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 800,
              color: lang === v ? "#fff" : C.dim,
            }}>{label}</button>
          ))}
        </div>
        <button onClick={downloadPDF} style={{
          background: "#fff", border: `1.5px solid #d97706`, borderRadius: 8,
          padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 800, color: "#d97706",
        }}>📄 {t(E, "Download PDF", "PDF 다운로드")}</button>
      </div>

      {/* 섹션 선택 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {sections.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "8px 12px", borderRadius: 8,
                border: `2px solid ${isActive ? s.color : C.border}`,
                background: isActive ? s.color : "#fff",
                color: isActive ? "#fff" : s.color || C.dim,
                fontWeight: 800, fontSize: 12, cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {!cur && (
        <div style={{
          textAlign: "center", padding: "40px 20px", color: C.dim, fontSize: 13,
          background: "#fff", border: `1.5px dashed ${C.border}`, borderRadius: 10,
        }}>
          👆 {t(E, "Click a section above to see code + reasoning.",
                  "위 버튼 눌러서 코드 + 이유 확인해봐요.")}
        </div>
      )}

      {cur && (
        <>
          <div style={{
            background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10,
            padding: "10px 12px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
              💡 {t(E, "Why this way?", "왜 이렇게?")}
            </div>
            {cur.why.map((line, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                <span style={{ color: cur.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
          <CodeBlock lines={code} />
        </>
      )}
    </div>
  );
}


/* ================================================================
   getCheeseSections — Python/C++ 코드 + 설명 (인앱 + PDF 공용)
   ================================================================ */

const CHEESE_INPUT_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
];
const CHEESE_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
];

const CHEESE_COUNTERS_PY = [
  "xy = defaultdict(int)  # z-방향: (x,y) 쌍",
  "yz = defaultdict(int)  # x-방향: (y,z) 쌍",
  "xz = defaultdict(int)  # y-방향: (x,z) 쌍",
];
const CHEESE_COUNTERS_CPP = [
  "    // N×N 격자 — z/x/y 방향 줄별 카운터",
  "    vector<vector<int>> xy(N, vector<int>(N, 0));",
  "    vector<vector<int>> yz(N, vector<int>(N, 0));",
  "    vector<vector<int>> xz(N, vector<int>(N, 0));",
];

const CHEESE_LOOP_PY = [
  "count = 0",
  "for _ in range(Q):",
  "    x, y, z = map(int, input().split())",
  "    for d, key in [(xy,(x,y)), (yz,(y,z)), (xz,(x,z))]:",
  "        d[key] += 1",
  "        if d[key] == N:",
  "            count += 1",
  "    print(count)",
];
const CHEESE_LOOP_CPP = [
  "    int count = 0;",
  "    while (Q--) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "",
  "        if (++xy[x][y] == N) count++;",
  "        if (++yz[y][z] == N) count++;",
  "        if (++xz[x][z] == N) count++;",
  "",
  "        cout << count << \"\\n\";",
  "    }",
];

const CHEESE_FULL_PY = [
  ...CHEESE_INPUT_PY,
  "",
  ...CHEESE_COUNTERS_PY,
  "",
  ...CHEESE_LOOP_PY,
];
const CHEESE_FULL_CPP = [
  ...CHEESE_INPUT_CPP,
  "",
  ...CHEESE_COUNTERS_CPP,
  "",
  ...CHEESE_LOOP_CPP,
  "    return 0;",
  "}",
];

export function getCheeseSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: "#d97706",
      py: CHEESE_INPUT_PY, cpp: CHEESE_INPUT_CPP,
      why: [
        t(E,
          "N = cube size, Q = number of removals. Standard fast input.",
          "N = 큐브 크기, Q = 제거 횟수. 표준 빠른 입력."),
        t(E,
          "Python: sys.stdin.readline. C++: ios::sync_with_stdio(false) + cin.tie(nullptr).",
          "Python 은 sys.stdin.readline. C++ 은 ios::sync_with_stdio(false) + cin.tie(nullptr)."),
        t(E,
          "Q can be 200,000 — slow input would TLE. Always include this for big-input problems.",
          "Q 가 20만까지 갈 수 있음 — 느린 입력은 TLE. 입력 큰 문제는 무조건 빠른 입력."),
      ],
    },
    {
      label: t(E, "📊 2. Three Counters", "📊 2. 카운터 3 개"),
      color: "#0891b2",
      py: CHEESE_COUNTERS_PY, cpp: CHEESE_COUNTERS_CPP,
      why: [
        t(E,
          "One counter per row direction. xy → z-axis rows. yz → x-axis. xz → y-axis.",
          "방향당 카운터 1 개. xy → z-축 줄. yz → x-축. xz → y-축."),
        t(E,
          "Why three? A block sits on exactly 3 rows (one per direction). Update = 3 increments.",
          "왜 3 개? 블록 1 개가 정확히 3 줄에 걸침 (방향당 1). 업데이트 = +1 세 번."),
        t(E,
          "Python defaultdict(int): keys auto-init to 0. Saves 'if key not in dict' check.",
          "Python defaultdict(int): 키가 없으면 자동 0. 'if key not in' 체크 생략."),
        t(E,
          "C++: 2D vector(N, vector<int>(N, 0)). N up to 1000 → 1M ints × 3 = 12MB. Fits.",
          "C++: 2D vector(N, vector<int>(N, 0)). N 1000 → 100만 int × 3 = 12MB. OK."),
        t(E,
          "Could use map<pair<int,int>, int> in C++ but 2D array is faster + simpler here.",
          "C++ 에서 map<pair<int,int>, int> 도 가능하지만 2D 배열이 더 빠르고 깔끔."),
      ],
    },
    {
      label: t(E, "🔄 3. Update Loop", "🔄 3. 업데이트 루프"),
      color: "#16a34a",
      py: CHEESE_LOOP_PY, cpp: CHEESE_LOOP_CPP,
      why: [
        t(E,
          "Per query: read (x,y,z), update 3 counters, check if any reached N, print total.",
          "쿼리마다: (x,y,z) 읽고, 카운터 3 개 +1, N 도달 체크, 총합 출력."),
        t(E,
          "++xy[x][y] increments AND returns the new value — combine increment + N-check in one line.",
          "++xy[x][y] 는 증가 + 새 값 반환을 한 번에 — 증가 + N 체크가 한 줄."),
        t(E,
          "count is cumulative — once a row opens, it stays open. So we just keep adding.",
          "count 는 누적 — 한 번 뚫린 줄은 계속 뚫린 상태. 그래서 더하기만 함."),
        t(E,
          "Each block is unique — counter hits N exactly once per row. No 'already counted' check needed.",
          "각 블록은 유일 — 카운터가 줄마다 N 에 정확히 한 번 도달. '이미 카운트' 체크 불필요."),
        t(E,
          "Print count every iteration (not just at end) — problem asks for answer after EACH removal.",
          "매 반복마다 count 출력 (마지막만 X) — 문제가 각 제거 후 답을 요구."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#d97706",
      py: CHEESE_FULL_PY, cpp: CHEESE_FULL_CPP,
      why: [
        t(E,
          "Per query: O(1) — three counter updates and three N-checks. Total: O(Q).",
          "쿼리당 O(1) — 카운터 업데이트 3 번과 N 체크 3 번. 전체 O(Q)."),
        t(E,
          "Brute was O(QN³). For N=1000, Q=200,000: brute = 2×10¹⁴ ops. Smart = 6×10⁵. Speedup ~10⁹×.",
          "브루트 O(QN³). N=1000, Q=20만: 브루트 2×10¹⁴ 연산. 스마트 6×10⁵. 약 10⁹ 배."),
        t(E,
          "Insight: 'don't recompute everything — only track what changes'. The 3-counters trick.",
          "핵심: '전부 재계산하지 마 — 바뀌는 것만 추적'. 카운터 3개 트릭."),
      ],
    },
  ];
}


/* ================================================================
   downloadCheesePDF — 종합 풀이 노트
   ================================================================ */

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","to_string","size","include","vector","unordered_map","map","pair"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;

  let comment = "";
  let rest = line;
  if (lang === "py") {
    const i = rest.indexOf("#");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  } else {
    const i = rest.indexOf("//");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  }

  let out = "";
  let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) {
      out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`;
      work = work.slice(ppm[0].length);
    }
  }

  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok))
      out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok))
      out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok))
      out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else
      out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment)
    out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}

function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadCheesePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) {
    alert(t(E, "Pop-up blocked. Allow pop-ups and try again.", "팝업 차단됨. 허용 후 재시도."));
    return;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cheese Block — Full Study Guide", "🧀 Cheese Block — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const BRUTE_PY = [
    "import sys",
    "input = sys.stdin.readline",
    "",
    "N, Q = map(int, input().split())",
    "cheese = [[[True]*N for _ in range(N)] for _ in range(N)]",
    "",
    "for _ in range(Q):",
    "    x, y, z = map(int, input().split())",
    "    cheese[x][y][z] = False",
    "    count = 0",
    "    # 모든 N² 줄을 N 칸씩 확인 → O(N³) per query",
    "    for a in range(N):",
    "        for b in range(N):",
    "            if all(not cheese[a][b][c] for c in range(N)): count += 1",
    "    for b in range(N):",
    "        for c in range(N):",
    "            if all(not cheese[a][b][c] for a in range(N)): count += 1",
    "    for a in range(N):",
    "        for c in range(N):",
    "            if all(not cheese[a][b][c] for b in range(N)): count += 1",
    "    print(count)",
  ];
  const BRUTE_CPP = [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int main() {",
    "    ios::sync_with_stdio(false);",
    "    cin.tie(nullptr);",
    "    int N, Q; cin >> N >> Q;",
    "    vector<vector<vector<bool>>> cheese(N, vector<vector<bool>>(N, vector<bool>(N, true)));",
    "",
    "    while (Q--) {",
    "        int x, y, z; cin >> x >> y >> z;",
    "        cheese[x][y][z] = false;",
    "        int count = 0;",
    "        // O(N³) per query",
    "        for (int a = 0; a < N; a++)",
    "            for (int b = 0; b < N; b++) {",
    "                bool ok = true;",
    "                for (int c = 0; c < N; c++) if (cheese[a][b][c]) { ok = false; break; }",
    "                if (ok) count++;",
    "            }",
    "        // ... + same for x-direction and y-direction",
    "        cout << count << \"\\n\";",
    "    }",
    "}",
  ];
  const bruteCode = lang === "py" ? BRUTE_PY : BRUTE_CPP;

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
         color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: #d97706; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px;
       background: #d97706; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: #d97706; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px;
         margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: #d97706; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  .why li { margin-bottom: 3px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px;
        font-family: "JetBrains Mono", Consolas, monospace; font-size: 11.5px;
        overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid;
        margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: #d97706; color: white;
              padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px;
              vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px;
          page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #fef3c7; color: #92400e; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px;
          margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px;
         padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  .box.warn { background: #fef3c7; border-color: #fbbf24; }
  code.inline { background: #f1f5f9; padding: 1px 5px; border-radius: 3px;
                font-family: "JetBrains Mono", monospace; font-size: 12px; color: #d97706; }
  .toc { background: #fffbeb; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; }
  .toc b { color: #d97706; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E,
  "In the print dialog, choose 'Save as PDF' as the destination to download.",
  "인쇄 창에서 '대상' / 'Destination' 을 'PDF로 저장' / 'Save as PDF' 로 선택하면 다운로드됩니다.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 December Bronze · ${t(E, "Self-contained walkthrough — no app needed", "독립 학습용 — 앱 없이 처음부터 이해 가능")}</div>

<div class="toc">
  <b>${t(E, "Contents", "목차")}:</b>
  1. ${t(E, "Problem", "문제")} ·
  2. ${t(E, "Worked Example", "예제 풀이")} ·
  3. ${t(E, "Brute Force", "브루트 포스")} ·
  4. ${t(E, "Pattern (Counter Trick)", "패턴 (카운터 트릭)")} ·
  5. ${t(E, "Optimal Code", "최적 코드")}
</div>

<!-- 1. 문제 -->
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "An N×N×N cheese cube. Q removals — each removes one block at (x,y,z). After each removal, count how many 1×1×N rows are now completely empty (a chopstick can fit through).",
  "N×N×N 치즈 큐브. Q 번 제거 — 각 제거는 (x,y,z) 의 블록 하나를 뺌. 제거 후, 1×1×N 줄 중 전부 비어 있는 줄이 몇 개인지 (젓가락이 통과할 수 있는 줄) 출력.")}</p>

<div class="box">
  <b>🥢 ${t(E, "Chopstick condition", "젓가락 조건")}</b>:
  ${t(E, "A row of N cells must be ENTIRELY empty. Even one block left = no fit.",
        "N 칸 한 줄이 전부 비어야 함. 1 개라도 남으면 못 들어감.")}
</div>

<h3>${t(E, "How many rows are there?", "줄은 몇 개?")}</h3>
<p>${t(E, "3 directions × N² rows each = 3N² total rows.", "3 방향 × 방향당 N² 줄 = 총 3N² 줄.")}</p>
<table>
  <tr><th>${t(E, "Direction", "방향")}</th><th>${t(E, "Fixed", "고정 자리")}</th><th>${t(E, "Varies", "변화 자리")}</th><th>${t(E, "Count", "개수")}</th></tr>
  <tr><td>z-axis</td><td>(x, y)</td><td>z = 0..N-1</td><td>N²</td></tr>
  <tr><td>x-axis</td><td>(y, z)</td><td>x = 0..N-1</td><td>N²</td></tr>
  <tr><td>y-axis</td><td>(x, z)</td><td>y = 0..N-1</td><td>N²</td></tr>
</table>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>N ≤ 1000, Q ≤ 200,000. ${t(E, "Brute O(QN³) ≈ 2×10¹⁴ → way TLE. Need O(Q).", "브루트 O(QN³) ≈ 2×10¹⁴ → 무조건 TLE. O(Q) 필요.")}</p>

<!-- 2. 예제 -->
<h2>2. ${t(E, "Worked Example (N=2)", "예제 풀이 (N=2)")}</h2>
<p>${t(E,
  "N=2 has 12 rows total (3 directions × 4 each). Watch what happens as we remove 5 blocks:",
  "N=2 에서는 총 12 줄 (3 방향 × 4 개씩). 5 개 블록 제거하면서 어떻게 변하는지:")}</p>
<table>
  <tr><th>${t(E, "Step", "단계")}</th><th>${t(E, "Removed", "제거")}</th><th>${t(E, "Open rows", "뚫린 줄")}</th><th>${t(E, "Change", "변화")}</th><th>${t(E, "Why?", "왜?")}</th></tr>
  <tr><td>1</td><td>(0,0,0)</td><td>0</td><td>+0</td><td>${t(E, "All 3 rows still have 1 block left", "3 개 줄 모두 아직 1 블록 남음")}</td></tr>
  <tr><td>2</td><td>(1,1,1)</td><td>0</td><td>+0</td><td>${t(E, "Same — different rows, all still half-full", "마찬가지 — 다른 줄, 모두 반쯤 참")}</td></tr>
  <tr><td>3</td><td>(0,1,0)</td><td>1</td><td>+1</td><td>${t(E, "y-row (0,_,0) now empty (had (0,0,0) and (0,1,0))", "y-줄 (0,_,0) 가 빔 ((0,0,0) + (0,1,0) 다 제거)")}</td></tr>
  <tr><td>4</td><td>(1,0,0)</td><td>2</td><td>+1</td><td>${t(E, "x-row (_,0,0) opens", "x-줄 (_,0,0) 뚫림")}</td></tr>
  <tr><td>5</td><td>(1,1,0)</td><td><b>5</b></td><td><b>+3 🤯</b></td><td>${t(E, "This block was the LAST on 3 rows simultaneously!", "이 블록이 3 줄의 마지막 블록!")}</td></tr>
</table>

<div class="box ok">
  <b>💡 ${t(E, "The surprise", "놀라움 포인트")}</b>:
  ${t(E,
    "One block can be on 3 different rows. When it's the LAST block on multiple rows, removing it opens them all at once — could be +1, +2, or +3.",
    "블록 1 개가 3 줄에 동시에 걸침. 여러 줄의 마지막 블록일 때, 빼면 동시에 다 뚫림 — +1, +2, +3 가능.")}
</div>

<!-- 3. 브루트 -->
<h2>3. ${t(E, "Brute Force (TLE)", "브루트 포스 (TLE)")}</h2>
<p>${t(E,
  "Direct approach: after each removal, scan all 3N² rows and check each cell. Time complexity O(QN³).",
  "직접 풀이: 매 제거 후 3N² 줄을 다 훑고 각 칸을 확인. 시간복잡도 O(QN³).")}</p>

${codeBlock(bruteCode)}

<div class="box no">
  <b>${t(E, "Why TLE?", "왜 TLE?")}</b>
  ${t(E,
    "N=1000, Q=200,000: 200,000 × 3 × 10⁶ × 10³ = 6×10¹⁴ ops. Even 1B ops/sec would take 600,000 seconds = 7 days.",
    "N=1000, Q=20만: 20만 × 3 × 10⁶ × 10³ = 6×10¹⁴ 연산. 초당 10억 연산 컴퓨터로도 60만 초 = 7 일.")}
</div>

<!-- 4. 패턴 -->
<h2>4. ${t(E, "Pattern: The Counter Trick", "패턴: 카운터 트릭")}</h2>
<h3>${t(E, "Key insight", "핵심 통찰")}</h3>
<div class="box ok">
  ${t(E,
    "Removing 1 block can affect AT MOST 3 rows (one per direction). The other 3N²−3 rows don't change at all. So why scan all of them every time?",
    "블록 1 개를 빼도 영향받는 줄은 최대 3 개 (방향당 1). 나머지 3N²−3 개 줄은 전혀 안 바뀜. 매번 다 훑을 필요 없음.")}
</div>

<h3>${t(E, "Solution: tally counters per row", "해결책: 줄마다 카운터")}</h3>
<p>${t(E, "For each row, keep a counter of how many blocks have been removed.", "각 줄마다, 제거된 블록 수를 카운트.")}</p>
<ul>
  <li>${t(E, "Counter starts at 0.", "카운터 0 에서 시작.")}</li>
  <li>${t(E, "Block removed → that row's counter += 1.", "블록 제거 → 그 줄의 카운터 += 1.")}</li>
  <li>${t(E, "Counter == N → row fully empty → chopstick fits!", "카운터 == N → 줄 완전히 빔 → 젓가락 들어감!")}</li>
</ul>

<h3>${t(E, "Why 3 counters per removal?", "왜 제거당 3 카운터?")}</h3>
<p>${t(E,
  "Block (x,y,z) sits on:",
  "블록 (x,y,z) 가 걸린 줄:")}</p>
<ul>
  <li>z-axis row at (x, y) — ${t(E, "every cell with these (x,y) and any z", "이 (x,y) 와 z 가 변하는 모든 칸")}</li>
  <li>x-axis row at (y, z) — ${t(E, "every cell with these (y,z) and any x", "이 (y,z) 와 x 가 변하는 모든 칸")}</li>
  <li>y-axis row at (x, z) — ${t(E, "every cell with these (x,z) and any y", "이 (x,z) 와 y 가 변하는 모든 칸")}</li>
</ul>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(1) per query (3 increments, 3 checks). Total O(Q). Even Q=200,000 is instant.",
        "쿼리당 O(1) (증가 3 번, 체크 3 번). 전체 O(Q). Q=20만도 순식간.")}
</div>

<!-- 5. 최적 코드 -->
<h2>5. ${t(E, "Optimal Code (4 sections)", "최적 코드 (4 부분)")}</h2>

${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div class="box warn">
  <b>📝 ${t(E, "Self-check", "자가 점검")}</b>
  <ol style="margin:6px 0 0;padding-left:20px;font-size:12px;">
    <li>${t(E, "N=2, removals: (0,0,1), (1,1,1), (0,1,1), (1,0,1). What's the answer after each?",
              "N=2, 제거 순서: (0,0,1), (1,1,1), (0,1,1), (1,0,1). 각 단계 답?")}</li>
    <li>${t(E, "Why use 3 counters and not just one?",
              "왜 카운터를 3 개나 쓸까? 1 개로 안 될까?")}</li>
    <li>${t(E, "Can a removal ever DECREASE the answer? Why or why not?",
              "제거가 답을 줄일 수 있을까? 이유는?")}</li>
  </ol>
  <div style="font-size:11px;color:#94a3b8;margin-top:6px;font-style:italic;">
    ${t(E,
      "Answers: 1) After (0,0,1): xy[0][0]=1, yz[0][1]=1, xz[0][1]=1, all <N=2 → 0. After (1,1,1): xy[1][1]=1, yz[1][1]=1, xz[1][1]=1, all <2 → 0. After (0,1,1): xy[0][1]=1, yz[1][1]=2 (HIT! +1), xz[0][1]=2 (HIT! +1) → 2. After (1,0,1): xy[1][0]=1, yz[0][1]=2 (HIT! +1), xz[1][1]=2 (HIT! +1) → 4. 2) Each block sits on 3 rows (one per direction). One counter would only track one direction. 3) No — once a row is empty it stays empty. count is monotonically non-decreasing.",
      "답: 1) (0,0,1) 후: 모두 1 < 2 → 0. (1,1,1) 후: 모두 1 → 0. (0,1,1) 후: yz[1][1]=2 (+1), xz[0][1]=2 (+1) → 2. (1,0,1) 후: yz[0][1]=2 (+1), xz[1][1]=2 (+1) → 4. 2) 블록 1 개는 3 줄에 걸쳐서 1 개로는 한 방향만 추적 가능. 3) 못 줄임 — 한 번 뚫린 줄은 계속 뚫린 상태. count 는 단조 비감소.")}
  </div>
</div>

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용 출력")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
