import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock, highlight } from "@/components/quest/shared";
import { calcBessie, calcElsie } from "./chapters";

/* ================================================================
   Brute force code arrays (used by CodeCompare3)
   ================================================================ */
const BRUTE_CODE_ORIG = [
  "T = int(input())",
  "for _ in range(T):",
  "  N = int(input())",
  "  count = 0",
  "  for x in range(2, N+1):",
  "    if x >= 10:",
  "      str_x = str(x)",
  "      b = len(str_x)",
  "      bessie = (x // 10**b) * 10**b",
  "      if int(str_x[-(b)]) >= 5:",
  "        bessie += 10**b",
  "      elsie = x",
  "      for position in range(1, b+1):",
  "        str_x = str(elsie)",
  "        if int(str_x[-(position)]) >= 5:",
  "          elsie += 10**position",
  "        elsie = (elsie // 10**position) * 10**position",
  "      if bessie != elsie:",
  "        count += 1",
  "  print(count)",
];

const BRUTE_CODE_CLEAN = [
  "T = int(input())",
  "for _ in range(T):",
  "  N = int(input())",
  "  count = 0",
  "  for x in range(2, N+1):",
  "    if x >= 10:",
  "      b = len(str(x))",
  "      bessie = 0",
  "      if int(str(x)[0]) >= 5:",
  "        bessie = 10**b",
  "      elsie = x",
  "      for pos in range(1, b+1):",
  "        d = (elsie // 10**(pos-1)) % 10",
  "        if d >= 5:",
  "          elsie += 10**pos",
  "        elsie = (elsie//10**pos)*10**pos",
  "      if bessie != elsie:",
  "        count += 1",
  "  print(count)",
];


/* ================================================================
   CodeCompare3 — 3-tab code viewer (pseudo / original / clean)
   ================================================================ */
export function CodeCompare3({ E }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab]   = useState(0);

  const pseudoLines = E ? [
    "for each x from 2 to N:",
    "  if x has 2+ digits:",
    "    b = number of digits",
    "",
    "    # Bessie: check first digit only",
    "    if first digit >= 5:",
    "      bessie = 10ᵇ",
    "    else:",
    "      bessie = 0",
    "",
    "    # Elsie: round step by step",
    "    elsie = x",
    "    for each position 1 to b:",
    "      look at that digit",
    "      if digit >= 5: round up",
    "      zero out that position",
    "",
    "    if bessie != elsie:",
    "      count += 1",
  ] : [
    "x를 2부터 N까지 반복:",
    "  x가 2자리 이상이면:",
    "    b = 자릿수",
    "",
    "    # Bessie: 첫째 자리만 확인",
    "    만약 첫째 자리 >= 5:",
    "      bessie = 10ᵇ",
    "    아니면:",
    "      bessie = 0",
    "",
    "    # Elsie: 순서대로 반올림",
    "    elsie = x",
    "    1번째부터 b번째까지:",
    "      그 자리 숫자를 확인",
    "      만약 >= 5: 올림",
    "      그 자리 이하를 0으로",
    "",
    "    만약 bessie != elsie:",
    "      count += 1",
  ];

  const tabs = [
    { label: t(E, "💭 Pseudo", "💭 의사코드"), lines: pseudoLines,
      note: t(E, "The idea — not real code yet.", "아이디어만 정리 — 아직 코드 아님.") },
    { label: t(E, "📝 Original", "📝 원본"), lines: BRUTE_CODE_ORIG,
      note: t(E, "Passed all 13 USACO test cases! ✅", "USACO 13개 테스트 전부 통과! ✅") },
    { label: t(E, "✨ Cleaned", "✨ 정리"), lines: BRUTE_CODE_CLEAN,
      note: t(E, "Same logic, ~1.5x faster. Math instead of str().", "같은 로직, ~1.5배 빠름. str() 대신 수학 연산.") },
  ];

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 16px", borderRadius: 12, cursor: "pointer",
        fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: open ? "#f8f9fc" : C.accent, color: open ? C.accent : "#fff",
        border: `2px solid ${C.accent}`, transition: "all .2s",
      }}>
        <span>{open ? "▲" : "▼"}</span>{t(E, "Show code (3 versions)", "코드 보기 (3단계)")}
      </button>
      {open && (
        <div style={{ marginTop: 12, animation: "popIn .3s cubic-bezier(.34,1.56,.64,1)" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
            {tabs.map((tb, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                flex: 1, padding: "7px 0", borderRadius: 8, cursor: "pointer",
                fontSize: 11, fontWeight: 700, border: `2px solid ${tab === i ? C.accent : C.border}`,
                background: tab === i ? C.accentBg : C.card,
                color: tab === i ? C.accent : C.dim,
              }}>{tb.label}</button>
            ))}
          </div>
          <CodeBlock lines={tabs[tab].lines} />
          <div style={{
            marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, lineHeight: 1.7,
            background: tab === 0 ? C.accentBg : tab === 1 ? C.carryBg : C.okBg,
            border: `1.5px solid ${tab === 0 ? C.accentBd : tab === 1 ? C.carryBd : C.okBd}`,
            color: tab === 0 ? C.accent : tab === 1 ? C.carry : C.ok,
          }}>{tabs[tab].note}</div>
        </div>
      )}
    </div>
  );
}


/* ================================================================
   SpeedScale — N 슬라이더로 세 풀이 (브루트/캐시/공식) 속도 비교 체감
   ================================================================ */
export function SpeedScale({ E }) {
  const [logN, setLogN] = useState(2); // log10(N), 시작은 N=100
  const N = Math.round(Math.pow(10, logN));

  // 파이썬 대략 처리 속도 (interpreted)
  const OPS_PER_SEC = 1e7;
  const TIME_LIMIT = 2; // USACO 제한 ~2초

  // 풀이별 예상 연산 횟수
  const bruteOps   = N * 6;          // N 번 × 자릿수 만큼 작업
  const cacheOps   = N * 6;          // 한 번 N 까지 채우면 다음은 즉시 — 첫 호출 기준 같음
  const formulaOps = Math.max(1, Math.ceil(Math.log10(N)) * 5); // O(log N)

  const bruteTime   = bruteOps   / OPS_PER_SEC;
  const cacheTime   = cacheOps   / OPS_PER_SEC;
  const formulaTime = formulaOps / OPS_PER_SEC;

  // 시각용 — TIME_LIMIT 까지가 100%, 넘으면 100% 채우고 ❌
  const widthOf = t => Math.min(100, (t / TIME_LIMIT) * 100);
  const fmtTime = t =>
    t < 1e-4 ? "즉시"
    : t < 0.01 ? `${(t * 1000).toFixed(1)}ms`
    : t < 1   ? `${(t * 1000).toFixed(0)}ms`
    : t < 60  ? `${t.toFixed(1)}초`
    : `${(t / 60).toFixed(1)}분`;
  const fmtOps = n =>
    n < 1e3 ? `${n}`
    : n < 1e6 ? `${(n / 1e3).toFixed(1)}K`
    : n < 1e9 ? `${(n / 1e6).toFixed(1)}M`
    : `${(n / 1e9).toFixed(1)}B`;

  const Bar = ({ label, time, ops, color, bg }) => {
    const tle = time > TIME_LIMIT;
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color }}>{label}</span>
          <span style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
            {fmtOps(ops)} {t(E, "ops", "번")}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 18, background: "#f1f5f9", borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <div style={{
              width: `${widthOf(time)}%`, height: "100%",
              background: tle ? C.no : color,
              transition: "width .2s",
            }} />
          </div>
          <span style={{
            minWidth: 70, textAlign: "right", fontSize: 12, fontWeight: 800,
            color: tle ? C.no : color, fontFamily: "'JetBrains Mono',monospace",
          }}>
            {tle ? "❌ TLE" : fmtTime(time)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      {/* 현재 N 표시 */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>N = </span>
        <span style={{ fontSize: 22, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>
          {N.toLocaleString()}
        </span>
      </div>

      {/* 슬라이더 */}
      <input
        type="range" min={1} max={9} step={0.1} value={logN}
        onChange={e => setLogN(parseFloat(e.target.value))}
        style={{ width: "100%", marginBottom: 4, accentColor: C.accent }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace", marginBottom: 16 }}>
        <span>10</span><span>10²</span><span>10³</span><span>10⁴</span><span>10⁵</span><span>10⁶</span><span>10⁷</span><span>10⁸</span><span>10⁹</span>
      </div>

      {/* 막대 3 개 */}
      <Bar label={t(E, "🐢 Brute force", "🐢 브루트포스")} time={bruteTime} ops={bruteOps} color={C.no}     bg={C.noBg} />
      <Bar label={t(E, "💾 Cache",       "💾 캐시")}        time={cacheTime} ops={cacheOps} color={C.carry} bg={C.carryBg} />
      <Bar label={t(E, "⚡ Formula",     "⚡ 공식 (목표)")}   time={formulaTime} ops={formulaOps} color={C.ok} bg={C.okBg} />

      {/* 제한 시간 표시 */}
      <div style={{ marginTop: 12, padding: "8px 12px", background: "#f8f9fc", borderRadius: 8, fontSize: 11, color: C.dim, fontWeight: 700, textAlign: "center" }}>
        ⏱ {t(E, `Time limit: ${TIME_LIMIT}s. Bar full = TLE`, `시간 제한: ${TIME_LIMIT}초. 막대 꽉 차면 시간 초과`)}
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 8, fontSize: 11, color: C.accent, fontWeight: 700, lineHeight: 1.6, textAlign: "center" }}>
        💡 {t(E, "Slide N to 10⁸ or 10⁹ — see brute & cache hit TLE, but formula stays instant!",
              "슬라이더를 10⁸, 10⁹ 까지 끌어봐 — 브루트와 캐시는 TLE 되는데 공식은 즉시!")}
      </div>
    </div>
  );
}


/* ================================================================
   BruteRunner — interactive brute force runner
   ================================================================ */
export function BruteRunner({ E }) {
  const [n, setN] = useState(100);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const alive = useRef(false);
  const startTimeRef = useRef(0);

  const run = () => {
    const N = Math.min(Math.max(parseInt(n) || 10, 10), 100000);
    setN(N); setRunning(true); setResults(null); setProgress(0);
    alive.current = true;
    startTimeRef.current = performance.now();
    const found = []; let idx = 2;
    const tick = () => {
      if (!alive.current) { setRunning(false); return; }
      const end = Math.min(idx + 500, N + 1);
      for (; idx < end; idx++) {
        if (idx >= 10) {
          const b = calcBessie(idx), e = calcElsie(idx);
          if (b !== e) found.push({ x: idx, b, e });
        }
      }
      setProgress(Math.floor((idx - 2) / (N - 1) * 100));
      if (idx > N) {
        const elapsed = performance.now() - startTimeRef.current;
        setRunning(false);
        setResults({ found, total: found.length, N, elapsedMs: elapsed });
        alive.current = false;
      }
      else setTimeout(tick, N > 5000 ? 1 : 16);
    };
    setTimeout(tick, 50);
  };
  const stop = () => { alive.current = false; setRunning(false); };

  // USACO 추정: 브라우저는 setTimeout 으로 인해 인위적으로 늦어졌으니
  // CPU 연산 시간만 추정 — N 당 ~10 연산 (Bessie + Elsie 각각의 자릿수 루프)
  // C++ 가 1억 ops/sec 라고 보면 N=10^9 에서 ~10×10^9 / 10^8 = 100 초 / 쿼리
  const estimateUSACO = (N) => {
    const opsPerN = 10;
    const cppOpsPerSec = 1e8;
    const queries = 10;
    const secondsPerQuery = (N * opsPerN) / cppOpsPerSec;
    const totalSeconds = secondsPerQuery * queries;
    return totalSeconds;
  };
  const fmtTime = (sec) => {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    if (sec < 60) return `${sec.toFixed(1)}s`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)}분`;
    if (sec < 86400) return `${(sec / 3600).toFixed(1)}시간`;
    return `${(sec / 86400).toFixed(1)}일`;
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim }}>N =</span>
        <input type="number" value={n} onChange={e => setN(e.target.value)} disabled={running}
          style={{
            width: 160, padding: "10px 14px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 18, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
            color: C.accent, textAlign: "center", outline: "none",
          }} />
        <button onClick={running ? stop : run} style={{
          flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 800, background: running ? C.no : C.accent, color: "#fff",
        }}>
          {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run", "▶ 실행!")}
        </button>
      </div>

      {running && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", background: C.accent, borderRadius: 3, width: `${progress}%`, transition: "width .1s" }} />
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 4 }}>{progress}%</div>
        </div>
      )}

      {results && (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>{t(E, `2 ~ ${results.N} checked`, `2 ~ ${results.N} 확인 완료`)}</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>{results.total}</div>
            <div style={{ fontSize: 12, color: C.dim }}>{t(E, "different x found", "개 (답이 다른 x)")}</div>
          </div>

          {/* 실제 측정 시간 (브라우저) — 가장 명확한 timing 신호 */}
          <div style={{
            background: "#fff", border: `2px solid ${results.elapsedMs > 500 ? C.no : C.okBd}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, letterSpacing: 0.5 }}>
                ⏱️ {t(E, "BROWSER TIME (this run)", "브라우저 측정 시간")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: results.elapsedMs > 500 ? C.no : C.ok, fontFamily: "'JetBrains Mono',monospace" }}>
                {fmtTime(results.elapsedMs / 1000)}
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.dim, textAlign: "right", lineHeight: 1.5, maxWidth: 180 }}>
              {t(E, "JS animation overhead included — actual brute work is faster.",
                  "setTimeout 애니메이션 시간 포함 — 순수 brute 연산은 더 빠름.")}
            </div>
          </div>

          {/* USACO 채점기 추정 (실제 제출 시) */}
          <div style={{
            background: "linear-gradient(135deg, #fef2f2, #fff)", border: `2px solid ${C.noBd}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.no, letterSpacing: 0.5, marginBottom: 6 }}>
              🏆 {t(E, "ON USACO JUDGE — REAL ESTIMATE", "USACO 채점기 — 실제 추정")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { N: results.N, label: t(E, "your N", "지금 N") },
                  { N: 1_000_000, label: "10⁶" },
                  { N: 1_000_000_000, label: "10⁹ (max)" },
                ].map((row, i) => {
                  const sec = estimateUSACO(row.N);
                  const tle = sec > 2;
                  return (
                    <tr key={i} style={{ borderTop: i > 0 ? "1px solid #fee2e2" : "none" }}>
                      <td style={{ padding: "4px 0", fontWeight: 700, color: C.dim }}>N = {row.N.toLocaleString()}</td>
                      <td style={{ padding: "4px 6px", fontSize: 10, color: C.dim }}>{row.label}</td>
                      <td style={{ padding: "4px 0", textAlign: "right", fontWeight: 800, color: tle ? C.no : C.ok }}>
                        {fmtTime(sec)}
                      </td>
                      <td style={{ padding: "4px 0 4px 6px", textAlign: "right", fontWeight: 800, color: tle ? C.no : C.ok, minWidth: 32 }}>
                        {tle ? "TLE" : "✓"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 6, fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
              {t(E,
                "Estimate: ~10 ops per x × 10 queries / 10⁸ ops/sec (typical C++ throughput).",
                "추정: x 당 ~10 연산 × 10 쿼리 / 1억 ops/sec (C++ 대략 처리량).")}
            </div>
          </div>

          {results.found.length > 0 && (
            <div style={{ maxHeight: 200, overflowY: "auto", borderRadius: 10, border: `1.5px solid ${C.border}` }}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 11, fontWeight: 700,
                color: C.dim, padding: "6px 10px", background: "#f8f9fc",
                borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0,
              }}>
                <span>x</span><span>🐄</span><span>🐮</span>
              </div>
              {results.found.slice(0, 50).map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 13, fontWeight: 600,
                  padding: "5px 10px", borderBottom: `1px solid ${C.border}`,
                  fontFamily: "'JetBrains Mono',monospace", background: i % 2 === 0 ? "#fff" : "#fafbff",
                }}>
                  <span style={{ color: C.text }}>{r.x}</span>
                  <span style={{ color: C.bessie }}>{r.b}</span>
                  <span style={{ color: C.elsie }}>{r.e}</span>
                </div>
              ))}
              {results.found.length > 50 && (
                <div style={{ textAlign: "center", padding: 8, fontSize: 11, color: C.dim }}>
                  … {t(E, `${results.found.length - 50} more`, `외 ${results.found.length - 50}개`)}
                </div>
              )}
            </div>
          )}

          {results.N >= 5000 && (
            <div style={{ marginTop: 10, padding: "10px 12px", background: C.carryBg, borderRadius: 8, fontSize: 12, color: C.carry, fontWeight: 700, textAlign: "center" }}>
              {t(E, "Even if browser runs fast — at N=10⁹ on judge, this brute is HOPELESSLY slow.",
                  "브라우저는 빨라도 — N=10⁹ 채점기에선 이 brute 는 절망적으로 느림.")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


/* ================================================================
   syntax highlight → HTML strings (PDF 인쇄용)
   ================================================================ */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","to_string","size","include"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;

  // 주석 분리
  let comment = "";
  let rest = line;
  if (lang === "py") {
    const i = rest.indexOf("#");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  } else {
    // C++ // 주석. 전처리 # 와 구분
    const i = rest.indexOf("//");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  }

  // C++ 전처리 (#include 등) 처음에 있으면 keyword 색
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
  // 줄 번호 + 하이라이트
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

/* ================================================================
   downloadFullPDF — 전체 풀이 종합 (문제 → 브루트 → 패턴 → 최적화)
   lang: "py" | "cpp"  — 한 가지 언어만 보여줌
   ================================================================ */
export function downloadFullPDF(E, optSections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) {
    alert(t(E,
      "Pop-up was blocked. Please allow pop-ups and try again.",
      "팝업이 차단됐어요. 팝업 허용 후 다시 시도해주세요."));
    return;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const fileTitle = t(E, "Roundabout Rounding — Full Study Guide", "🔄 Roundabout Rounding — 종합 풀이 노트");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";

  // 코드 블록 — 선택된 언어만, 하이라이트 적용
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  // 브루트 포스 코드 (Python / C++ 둘 중 lang 에 맞는 것만)
  const BRUTE_PY = [
    "import sys",
    "input = sys.stdin.readline",
    "",
    "def Bessie(x):",
    "    s = str(x)",
    "    P = len(s)",
    "    if int(s[0]) >= 5:",
    "        return 10 ** P",
    "    else:",
    "        return 0",
    "",
    "def Elsie(x):",
    "    P = len(str(x))",
    "    cur = x",
    "    for pos in range(1, P + 1):",
    "        d = (cur // 10 ** (pos - 1)) % 10",
    "        if d >= 5:",
    "            cur += 10 ** pos",
    "            cur = (cur // 10 ** pos) * 10 ** pos",
    "    return cur",
    "",
    "T = int(input())",
    "for _ in range(T):",
    "    N = int(input())",
    "    count = 0",
    "    for x in range(2, N + 1):",
    "        if Bessie(x) != Elsie(x):",
    "            count += 1",
    "    print(count)",
  ];
  const BRUTE_CPP = [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "long long Bessie(long long x) {",
    "    string s = to_string(x);",
    "    int P = s.size();",
    "    long long pw = 1;",
    "    for (int i = 0; i < P; i++) pw *= 10;",
    "    return (s[0] - '0' >= 5) ? pw : 0;",
    "}",
    "",
    "long long Elsie(long long x) {",
    "    long long cur = x;",
    "    int P = to_string(x).size();",
    "    for (int pos = 1; pos <= P; pos++) {",
    "        long long pw = 1;",
    "        for (int i = 0; i < pos - 1; i++) pw *= 10;",
    "        long long d = (cur / pw) % 10;",
    "        if (d >= 5) {",
    "            long long pwn = pw * 10;",
    "            cur += pwn;",
    "            cur = (cur / pwn) * pwn;",
    "        }",
    "    }",
    "    return cur;",
    "}",
    "",
    "int main() {",
    "    int T; cin >> T;",
    "    while (T--) {",
    "        long long N; cin >> N;",
    "        long long count = 0;",
    "        for (long long x = 2; x <= N; x++)",
    "            if (Bessie(x) != Elsie(x)) count++;",
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
  h1 { font-size: 22px; margin: 0 0 4px; color: #4f46e5; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px;
       background: #4f46e5; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: #4f46e5; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px;
         margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: #4f46e5; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  .why li { margin-bottom: 3px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px;
        font-family: "JetBrains Mono", Consolas, monospace; font-size: 11.5px;
        overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid;
        margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: #4f46e5; color: white;
              padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px;
              vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px;
          page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #f8fafc; color: #4f46e5; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px;
          margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #eef2ff; border: 1.5px solid #c7d2fe; border-radius: 8px;
         padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  .box.warn { background: #fef3c7; border-color: #fbbf24; }
  code.inline { background: #f1f5f9; padding: 1px 5px; border-radius: 3px;
                font-family: "JetBrains Mono", monospace; font-size: 12px; color: #4f46e5; }
  .toc { background: #f8fafc; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; }
  .toc b { color: #4f46e5; }
  .formula { text-align: center; font-family: "JetBrains Mono", monospace; font-size: 18px;
             font-weight: 800; color: #4f46e5; margin: 8px 0; }
  @media print {
    body { padding: 0; } .hint { display: none; }
    h2 { page-break-after: avoid; }
    h3 { page-break-after: avoid; }
  }
</style></head><body>

<div class="hint">📄 ${t(E,
  "In the print dialog, choose 'Save as PDF' as the destination to download.",
  "인쇄 창에서 '대상' / 'Destination' 을 'PDF로 저장' / 'Save as PDF' 로 선택하면 다운로드됩니다.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 December Bronze · ${t(E, "Self-contained walkthrough — no app needed", "독립 학습용 — 앱 없이 처음부터 이해 가능")}</div>

<div class="toc">
  <b>${t(E, "Contents", "목차")}:</b>
  1. ${t(E, "Problem", "문제")} ·
  2. ${t(E, "Worked Examples", "예제 풀이")} ·
  3. ${t(E, "Brute Force", "브루트 포스")} ·
  4. ${t(E, "Pattern Discovery", "패턴 발견")} ·
  5. ${t(E, "Optimization", "최적화")}
</div>

<!-- ════════════════════════════ 1. 문제 ════════════════════════════ -->
<h2>1. ${t(E, "Problem", "문제")}</h2>

<p>${t(E,
  "Two cows round numbers differently. We want to count: between 2 and N, how many x give different rounded answers from Bessie vs Elsie?",
  "두 마리 소(Bessie와 Elsie)가 반올림 방법이 달라요. 2~N 사이에서 두 소의 결과가 다른 x 가 몇 개일까요?")}</p>

<h3>${t(E, "Common step: find P", "공통 단계: P 구하기")}</h3>
<p>${t(E, "Both cows first compute", "두 소 모두 먼저")} <code class="inline">P = ${t(E, "digit count of x", "x 의 자릿수")}</code> ${t(E, "(e.g. 48 → P=2, 4459 → P=4).", "(예: 48 → P=2, 4459 → P=4).")}</p>

<div class="box">
  <b>🐄 Bessie:</b> ${t(E,
    "looks ONLY at the first digit. If first digit ≥ 5, round up to 10^P. Otherwise return 0.",
    "첫째 자리만 봐요. 첫째 ≥ 5 면 10^P 로 올림, 아니면 0.")}
</div>
<div class="box">
  <b>🐮 Elsie:</b> ${t(E,
    "walks digit by digit from ones place to P-th place. At each position, if digit ≥ 5, add 10^pos and zero out lower digits (carry propagates).",
    "1의자리부터 P자리까지 한 자리씩 봐요. 자리값 ≥ 5 면 10^pos 더하고 그 아래 0으로 (carry 전파).")}
</div>

<h3>${t(E, "Input / Output", "입력 / 출력")}</h3>
<p>${t(E, "T test cases. Each line: N. For each, output the count of x in [2, N] where Bessie(x) ≠ Elsie(x).",
        "T 테스트케이스. 각 줄에 N. 각 케이스마다 2 ≤ x ≤ N 중 Bessie(x) ≠ Elsie(x) 인 x 의 개수 출력.")}</p>
<p>${t(E, "Constraints: T up to 10, N up to 10⁹. Brute O(T·N) = 10¹⁰ → too slow.",
        "제약: T ≤ 10, N ≤ 10⁹. 브루트 O(T·N) = 10¹⁰ → 시간초과.")}</p>

<!-- ════════════════════════════ 2. 예제 ════════════════════════════ -->
<h2>2. ${t(E, "Worked Examples", "예제 풀이")}</h2>

<h3>${t(E, "Example 1: x = 48", "예제 1: x = 48")}</h3>
<table>
  <tr><th>${t(E, "Cow", "소")}</th><th>${t(E, "Process", "과정")}</th><th>${t(E, "Result", "결과")}</th></tr>
  <tr><td>🐄 Bessie</td><td>${t(E, "first digit = 4 < 5 → return 0", "첫째 = 4 < 5 → 0 반환")}</td><td><b>0</b></td></tr>
  <tr><td>🐮 Elsie</td><td>${t(E, "ones=8≥5 → 48+10=58 → tens=5≥5 → 58+10·10=158 → //100·100 = 100",
                                   "1의자리 8≥5 → 48+10=58 → 10의자리 5≥5 → 58+100=158 → //100·100 = 100")}</td><td><b>100</b></td></tr>
</table>
<p><b>${t(E, "Different! → counts.", "다름! → 카운트.")}</b></p>

<h3>${t(E, "Elsie's carry — step by step (x = 48)", "Elsie 의 carry — 한 자리씩 (x = 48)")}</h3>
<p style="font-size:12px;color:#6b7280;">${t(E,
  "How does the carry propagate? Track 'cur' through each position:",
  "carry 가 어떻게 위로 전파될까? 각 pos 에서 'cur' 변수가 어떻게 바뀌는지 추적:")}</p>
<table>
  <tr><th>pos</th><th>${t(E, "cur (before)", "cur (시작)")}</th><th>${t(E, "digit at pos", "그 자리 숫자")}</th><th>${t(E, "≥ 5?", "≥ 5?")}</th><th>${t(E, "action", "동작")}</th><th>${t(E, "cur (after)", "cur (결과)")}</th></tr>
  <tr><td>1 (ones)</td><td>48</td><td>8</td><td>✅ ${t(E, "yes", "예")}</td><td>${t(E, "+10, zero out ones", "+10, 1의자리 0으로")}</td><td><b>50</b></td></tr>
  <tr><td>2 (tens)</td><td>50</td><td>5</td><td>✅ ${t(E, "yes", "예")}</td><td>${t(E, "+100, zero out tens", "+100, 10의자리 0으로")}</td><td><b>100</b></td></tr>
</table>
<p style="font-size:12px;"><b>${t(E, "Final Elsie(48) = 100.", "결과 Elsie(48) = 100.")}</b> ${t(E,
  "Bessie sees first digit = 4, returns 0. So 0 ≠ 100 → counted.",
  "Bessie 는 첫째 자리 = 4 만 보고 0 반환. 0 ≠ 100 → 카운트.")}</p>

<h3>${t(E, "Example 2: x = 100", "예제 2: x = 100")}</h3>
<table>
  <tr><th>${t(E, "Cow", "소")}</th><th>${t(E, "Process", "과정")}</th><th>${t(E, "Result", "결과")}</th></tr>
  <tr><td>🐄 Bessie</td><td>${t(E, "first digit = 1 < 5 → 0", "첫째 = 1 < 5 → 0")}</td><td><b>0</b></td></tr>
  <tr><td>🐮 Elsie</td><td>${t(E, "ones=0, tens=0, hundreds=1: none ≥ 5 → no carry", "1의자리=0, 10의자리=0, 100의자리=1: 모두 <5 → carry 없음")}</td><td><b>0</b></td></tr>
</table>
<p>${t(E, "Same → not counted.", "같음 → 카운트 안 함.")}</p>

<div class="box warn">
  <b>📝 ${t(E, "Self-check", "자가 점검")} (${t(E, "answers below", "답은 아래")})</b>
  <ol style="margin:6px 0 0;padding-left:20px;font-size:12px;">
    <li>${t(E, "Compute Bessie(67) and Elsie(67). Are they equal?",
              "Bessie(67) 과 Elsie(67) 를 직접 구해봐. 같을까?")}</li>
    <li>${t(E, "Compute Bessie(123) and Elsie(123). Equal?",
              "Bessie(123), Elsie(123). 같을까?")}</li>
    <li>${t(E, "Compute Bessie(449) and Elsie(449). Equal?",
              "Bessie(449), Elsie(449). 같을까?")}</li>
  </ol>
  <div style="font-size:11px;color:#94a3b8;margin-top:6px;font-style:italic;">
    ${t(E,
      "Answers: 1) Bessie=100, Elsie=100 (equal). 2) Bessie=0, Elsie=0 (equal). 3) Bessie=0, Elsie=1000 (different!).",
      "답: 1) Bessie=100, Elsie=100 (같음). 2) Bessie=0, Elsie=0 (같음). 3) Bessie=0, Elsie=1000 (다름!).")}
  </div>
</div>

<!-- ════════════════════════════ 3. 브루트 ════════════════════════════ -->
<h2>3. ${t(E, "Brute Force (TLE on big N)", "브루트 포스 (큰 N 에서 시간초과)")}</h2>

<p>${t(E,
  "Direct approach: for every x in [2, N], compute Bessie(x) and Elsie(x), compare.",
  "직접 풀이: 2~N 의 모든 x 에 대해 Bessie(x), Elsie(x) 계산해서 비교.")}</p>

${codeBlock(bruteCode)}

<div class="box no">
  <b>${t(E, "Why TLE?", "왜 시간초과?")}</b> ${t(E,
    "Time complexity O(T · N). For N = 10⁹: ~10⁹ operations per query × 10 queries = 10¹⁰. Way too slow (limit ~10⁸/sec).",
    "시간복잡도 O(T · N). N = 10⁹ 면: 쿼리당 ~10⁹ 연산 × 10 쿼리 = 10¹⁰. 너무 느림 (한계 ~10⁸/초).")}
</div>

<div class="box warn">
  <b>📝 ${t(E, "Self-check (brute)", "자가 점검 (브루트)")}</b>
  <ol style="margin:6px 0 0;padding-left:20px;font-size:12px;">
    <li>${t(E, "Roughly how long would the brute take for N = 10⁶? (1 op = 1 ns)",
              "브루트가 N = 10⁶ 에 대략 얼마나 걸릴까? (연산 1 개 = 1 ns 가정)")}</li>
    <li>${t(E, "Why does the prefix sum (DP) idea help when there are MANY queries?",
              "쿼리가 많을 때 누적합(DP) 아이디어가 왜 도움이 될까?")}</li>
  </ol>
  <div style="font-size:11px;color:#94a3b8;margin-top:6px;font-style:italic;">
    ${t(E,
      "Answers: 1) ~1 second for one query (10⁶ × ~10 inner ops). With T=10 queries → 10s. Still TLE for N=10⁹. 2) Prefix sum builds the array ONCE; T queries become O(1) lookups. But for N=10⁹ even building once is too slow → need O(log N) formula.",
      "답: 1) 쿼리 하나에 ~1 초 (10⁶ × ~10 내부 연산). T=10 → 10 초. N=10⁹ 면 여전히 TLE. 2) 누적합은 배열을 한 번만 만들고 T 쿼리는 O(1) 조회. 하지만 N=10⁹ 면 한 번 만드는 것도 너무 느림 → O(log N) 공식 필요.")}
  </div>
</div>

<!-- ════════════════════════════ 4. 패턴 ════════════════════════════ -->
<h2>4. ${t(E, "Pattern Discovery", "패턴 발견")}</h2>

<p>${t(E,
  "Look at numbers where Bessie ≠ Elsie. They all share the same shape:",
  "Bessie ≠ Elsie 인 수들의 형태를 관찰하면 — 모두 같은 모양:")}</p>

<div class="box ok">
  <div style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:800;">
    <span style="color:#dc2626;">4</span>
    <span style="color:#f59e0b;">[4~9]</span>
    <span style="color:#f59e0b;">[4~9]</span>
    ...
    <span style="color:#f59e0b;">[4~9]</span>
    <span style="color:#10b981;">[5~9]</span>
  </div>
  <div style="text-align:center;font-size:11px;color:#6b7280;margin-top:6px;">
    ${t(E, "first=4 fixed · middle digits 4~9 · last digit 5~9", "첫째=4 고정 · 중간 자리 4~9 · 마지막 자리 5~9")}
  </div>
</div>

<h3>${t(E, "Why first digit must be 4 — three cases", "첫째 자리가 왜 반드시 4 여야 하나 — 세 케이스")}</h3>
<p style="font-size:12px;color:#6b7280;">${t(E,
  "Key Elsie detail: at the very last position (pos=P), the line",
  "Elsie 의 핵심 디테일: 마지막 위치(pos=P)에서")} <code class="inline">cur = (cur // 10^P) * 10^P</code> ${t(E,
  "zeros everything UNLESS cur ≥ 10^P. So Elsie returns 10^P only if carry pushed cur over 10^P.",
  "는 cur ≥ 10^P 가 아니면 모두 0 으로 만들어요. 즉 Elsie 가 10^P 를 반환하려면 carry 가 cur 를 10^P 위로 밀어 올려야 해요.")}</p>
<table>
  <tr><th>${t(E, "Case", "경우")}</th><th>x</th><th>🐄 Bessie</th><th>🐮 Elsie</th><th>${t(E, "Equal?", "같음?")}</th></tr>
  <tr><td>${t(E, "first ≤ 3", "첫째 ≤ 3")}</td><td>345</td>
      <td>${t(E, "first=3 < 5 → 0", "첫째=3 < 5 → 0")}</td>
      <td>${t(E, "350 → 400 (first now 4) → final step zeros (4<5) = 0",
               "350 → 400 (first 가 4 됨) → 마지막 step 에서 0 (4<5)")}</td>
      <td style="color:#10b981;">${t(E, "Same (0 vs 0)", "같음 (0 vs 0)")}</td></tr>
  <tr><td>${t(E, "first = 4 ✅", "첫째 = 4 ✅")}</td><td>449</td>
      <td>${t(E, "first=4 < 5 → 0", "첫째=4 < 5 → 0")}</td>
      <td>${t(E, "450 → 500 (first now 5) → final keeps 1000",
               "450 → 500 (first 가 5 됨) → 마지막 step 에서 1000 유지")}</td>
      <td style="color:#dc2626;"><b>${t(E, "Different! (0 vs 1000) ✓ COUNTED", "다름! (0 vs 1000) ✓ 카운트")}</b></td></tr>
  <tr><td>${t(E, "first ≥ 5", "첫째 ≥ 5")}</td><td>523</td>
      <td>${t(E, "first=5 ≥ 5 → 1000", "첫째=5 ≥ 5 → 1000")}</td>
      <td>${t(E, "no carry from below, but first=5≥5 at pos=3 → 1000",
               "아래에서 carry 없지만 pos=3 에서 first=5≥5 → 1000")}</td>
      <td style="color:#10b981;">${t(E, "Same (1000 vs 1000)", "같음 (1000 vs 1000)")}</td></tr>
</table>

<div class="why"><b>💡 ${t(E, "The key insight", "핵심 통찰")}:</b>
<p style="font-size:12px;margin:4px 0 0;">${t(E,
  "For first ≤ 3: carry can push first to at most 4 (3+1). 4 < 5 → final step zeros it → Elsie = 0 = Bessie.\nFor first ≥ 5: Bessie immediately returns 10^P. Elsie also ends at 10^P.\nFor first = 4 with carry reaching it: 4+1 = 5 → Elsie returns 10^P, but Bessie sees ORIGINAL first=4 → returns 0. They differ by exactly 10^P.",
  "first ≤ 3: carry 가 first 를 최대 4 까지만 밀어 올림 (3+1). 4 < 5 라서 마지막 step 에서 0. Elsie = 0 = Bessie.\nfirst ≥ 5: Bessie 가 바로 10^P 반환. Elsie 도 결국 10^P 로 끝.\nfirst = 4 + carry 도달: 4+1 = 5 → Elsie 가 10^P 반환. Bessie 는 원래 first=4 만 봐서 → 0. 정확히 10^P 차이.")}</p>
</div>

<h3>${t(E, "Why these digit ranges (4~9 middle, 5~9 last)?", "왜 이런 자릿수 범위 (중간 4~9, 마지막 5~9)?")}</h3>
<div class="why"><ul>
  <li>${t(E, "Last digit ≥ 5: needed to START the carry chain.",
            "마지막 자리 ≥ 5: carry 를 시작하려면 필요.")}</li>
  <li>${t(E, "Middle digits ≥ 4: when they receive carry (+1) from below, they become ≥ 5, so they propagate upward. (digit 3 + 1 = 4 stays below 5 → carry stops.)",
            "중간 자리 ≥ 4: 아래에서 carry 받아 +1 되면 ≥5 가 되어 위로 전파. (digit 3 + 1 = 4 는 5 미만 → carry 멈춤.)")}</li>
  <li>${t(E, "First digit = 4: receives carry → becomes 5 → Elsie returns 10^P. Bessie sees first=4 < 5 → returns 0. Always different by 10^P.",
            "첫째 = 4: carry 받아 → 5 됨 → Elsie 가 10^P 반환. Bessie 는 first=4 < 5 → 0 반환. 항상 10^P 만큼 다름.")}</li>
</ul></div>

<h3>${t(E, "Slot visualization — where does 5 × 6^(d−2) come from?", "슬롯 시각화 — 5 × 6^(d−2) 어디서 나왔지?")}</h3>
<div class="box ok">
  <div style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800;margin-bottom:10px;">
    ${t(E, "Each slot = number of choices for that digit", "각 칸 = 그 자리의 선택지 수")}
  </div>
  <div style="text-align:center;">
    <div style="display:inline-block;padding:8px 12px;border:2px solid #dc2626;border-radius:6px;background:#fef2f2;color:#dc2626;font-family:'JetBrains Mono',monospace;font-weight:800;font-size:18px;">4</div>
    <span style="font-size:18px;color:#6b7280;">×</span>
    <div style="display:inline-block;padding:8px 12px;border:2px solid #f59e0b;border-radius:6px;background:#fef3c7;color:#92400e;font-family:'JetBrains Mono',monospace;font-weight:800;font-size:18px;">[4~9]</div>
    <span style="font-size:18px;color:#6b7280;">×</span>
    <div style="display:inline-block;padding:8px 12px;border:2px solid #f59e0b;border-radius:6px;background:#fef3c7;color:#92400e;font-family:'JetBrains Mono',monospace;font-weight:800;font-size:18px;">[4~9]</div>
    <span style="font-size:14px;color:#6b7280;">… (d−2 ${t(E, "middles", "중간")})</span>
    <span style="font-size:18px;color:#6b7280;">×</span>
    <div style="display:inline-block;padding:8px 12px;border:2px solid #10b981;border-radius:6px;background:#ecfdf5;color:#065f46;font-family:'JetBrains Mono',monospace;font-weight:800;font-size:18px;">[5~9]</div>
  </div>
  <div style="text-align:center;margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:800;">
    <span style="color:#dc2626;">1</span>
    <span style="color:#6b7280;">×</span>
    <span style="color:#92400e;">6</span>
    <span style="color:#6b7280;">×</span>
    <span style="color:#92400e;">6</span>
    <span style="color:#6b7280;">× … ×</span>
    <span style="color:#10b981;">5</span>
    <span style="color:#6b7280;">=</span>
    <span style="color:#4f46e5;">5 × 6<sup>d−2</sup></span>
  </div>
  <div style="text-align:center;margin-top:6px;font-size:11px;color:#6b7280;">
    ${t(E, "first: 1 choice (must be 4) · middles: 6 choices each (4,5,6,7,8,9) · last: 5 choices (5,6,7,8,9)",
          "첫째: 1가지 (4 만) · 중간: 각 6가지 (4,5,6,7,8,9) · 마지막: 5가지 (5,6,7,8,9)")}
  </div>
</div>

<h3>${t(E, "Counting formula", "개수 공식")}</h3>
<div class="formula">5 × 6<sup>d−2</sup></div>
<div style="text-align:center;font-size:12px;color:#6b7280;">
  ${t(E, "= count of d-digit numbers where Bessie ≠ Elsie", "= d 자리 수 중 답이 다른 개수")}
</div>
<p>${t(E,
  "1 (first=4) × 6^(d−2) (middle digits, each 6 options) × 5 (last digit, 5 options).",
  "1 (첫째=4) × 6^(d−2) (중간 자리 각각 6가지) × 5 (마지막 5가지).")}</p>

<table>
  <tr><th>d</th><th>${t(E, "Calculation", "계산")}</th><th>${t(E, "Count", "개수")}</th><th>${t(E, "Examples", "예시")}</th></tr>
  <tr><td>2</td><td>5 × 6⁰ = 5 × 1</td><td><b>5</b></td><td>45, 46, 47, 48, 49</td></tr>
  <tr><td>3</td><td>5 × 6¹ = 5 × 6</td><td><b>30</b></td><td>445, 467, 489, 495 ...</td></tr>
  <tr><td>4</td><td>5 × 6² = 5 × 36</td><td><b>180</b></td><td>4456, 4789 ...</td></tr>
  <tr><td>5</td><td>5 × 6³ = 5 × 216</td><td><b>1,080</b></td><td>...</td></tr>
  <tr><td>6</td><td>5 × 6⁴</td><td><b>6,480</b></td><td>...</td></tr>
</table>

<!-- ════════════════════════════ 5. 최적화 ════════════════════════════ -->
<h2>5. ${t(E, "Optimization — O(log N)", "최적화 — O(log N)")}</h2>

<p>${t(E,
  "Strategy: split into two parts.",
  "전략: 두 부분으로 나눠서 처리.")}</p>

<div class="box ok">
  <b>${t(E, "Part 1 (Easy):", "쉬운 부분:")}</b>
  ${t(E, "Numbers with FEWER digits than N. Automatically ≤ N. Use formula directly.",
        "N 보다 자릿수가 적은 수. 자동으로 ≤ N. 공식 그대로 사용.")}
</div>
<div class="box warn">
  <b>${t(E, "Part 2 (Tricky):", "어려운 부분:")}</b>
  ${t(E, "Numbers with the SAME digit count as N. Walk N's digits one by one to count only ≤ N.",
        "N 과 자릿수 같은 수. N 의 자릿수를 하나씩 따라가면서 ≤ N 인 것만 셈.")}
</div>

<h3>${t(E, "Worked example: N = 1000 (D=4)", "예: N = 1000 (D=4)")}</h3>
<table>
  <tr><th>${t(E, "Digits", "자릿수")}</th><th>${t(E, "What counts", "셈에 들어가는 것")}</th><th>${t(E, "Count", "개수")}</th></tr>
  <tr><td>1</td><td>${t(E, "no carry possible", "carry 못 함")}</td><td>0</td></tr>
  <tr><td>2</td><td>45~49</td><td>5</td></tr>
  <tr><td>3</td><td>4xx ${t(E, "pattern", "패턴")}</td><td>30</td></tr>
  <tr><td>4</td><td>${t(E, "only 1000, first=1≠4", "1000만 있고 첫째=1≠4")}</td><td>0</td></tr>
  <tr><td colspan="2" style="text-align:right;"><b>${t(E, "Total", "합계")}</b></td><td><b>35</b></td></tr>
</table>

<h3>${t(E, "Worked example: N = 473 (D=3)", "예: N = 473 (D=3)")}</h3>
<p><b>${t(E, "Easy part:", "쉬운 부분:")}</b> ${t(E, "2-digit = 5", "2자리 = 5")}</p>
<p><b>${t(E, "Tricky part:", "어려운 부분:")}</b> ${t(E, "3-digit ≤ 473, broken down by middle digit:", "3자리 중 ≤ 473, 중간 자리별로:")}</p>
<table>
  <tr><th>${t(E, "Middle", "중간")}</th><th>${t(E, "Numbers", "수들")}</th><th>${t(E, "Count", "개수")}</th></tr>
  <tr><td>4</td><td>445~449</td><td>5</td></tr>
  <tr><td>5</td><td>455~459</td><td>5</td></tr>
  <tr><td>6</td><td>465~469</td><td>5</td></tr>
  <tr><td>7</td><td>${t(E, "need ≥5 AND ≤3 → impossible", "마지막 ≥5 AND ≤3 → 불가능")}</td><td>0</td></tr>
  <tr><td>8</td><td>480~ &gt; 473 ❌</td><td>0</td></tr>
  <tr><td>9</td><td>490~ &gt; 473 ❌</td><td>0</td></tr>
  <tr><td colspan="2" style="text-align:right;"><b>${t(E, "Tricky total", "어려운 합")}</b></td><td><b>15</b></td></tr>
</table>
<p style="text-align:center;font-size:14px;font-weight:800;color:#4f46e5;">
  ${t(E, "Final: 5 + 15 = 20", "최종: 5 + 15 = 20")}
</p>

<h3>${t(E, "Code trace for N = 473 — what each variable holds", "N = 473 코드 trace — 변수가 실제로 뭘 담고 있나")}</h3>
<p style="font-size:12px;color:#6b7280;">${t(E,
  "Map the variables in the tricky-part code to actual numbers from the N=473 walkthrough above:",
  "위 N=473 워크쓰루의 실제 숫자가 어려운 부분 코드의 어느 변수에 들어가는지 매핑:")}</p>
<table>
  <tr><th>i</th><th>${t(E, "digit (s[i])", "digit (s[i])")}</th><th>${t(E, "branch", "분기")}</th><th>extra</th><th>rem</th><th>${t(E, "result += ?", "result += ?")}</th><th>${t(E, "running total", "누적")}</th></tr>
  <tr><td>${t(E, "(start)", "(시작)")}</td><td>—</td><td>${t(E, "easy part: d=2 → +5", "쉬운 부분: d=2 → +5")}</td><td>—</td><td>—</td><td><b>+5</b></td><td>5</td></tr>
  <tr><td>${t(E, "(D-loop start, first==4)", "(D-loop 시작, first==4)")}</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>5</td></tr>
  <tr><td>1</td><td>7 (s = "473", s[1] = '7')</td><td>${t(E, "middle, digit≥4", "중간, digit≥4")}</td><td>7−4 = 3</td><td>3−1−2 = 0</td><td>3 × 6⁰ × 5 = <b>+15</b></td><td>20</td></tr>
  <tr><td>2</td><td>3 (s[2] = '3')</td><td>${t(E, "last, digit&lt;5 → +0", "마지막, digit&lt;5 → +0")}</td><td>—</td><td>—</td><td>+0</td><td><b>20</b></td></tr>
</table>
<p style="font-size:12px;"><b>${t(E, "Final result = 20.", "최종 result = 20.")}</b> ${t(E,
  "Note: at i=1 the 'extra * p6[rem] * 5' = '3 × 1 × 5 = 15' is exactly the count of (445~449) + (455~459) + (465~469) = 5+5+5 from our table.",
  "주목: i=1 에서 'extra * p6[rem] * 5' = '3 × 1 × 5 = 15' 는 위 표의 (445~449) + (455~459) + (465~469) = 5+5+5 와 정확히 일치.")}</p>

<h3>${t(E, "Optimal Code — broken into 4 parts", "최적 코드 — 4 부분으로 나눠서")}</h3>

${optSections.map(s => `
  <h3 style="background:${s.bgColor || '#eef2ff'};color:${s.color || '#4f46e5'};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E,
    "Per query O(D) = O(log₁₀ N). Total O(T · log N). For N = 10⁹: ~10 ops/query vs brute's ~10⁹. Speedup ≈ 10⁸×.",
    "쿼리당 O(D) = O(log₁₀ N). 전체 O(T · log N). N = 10⁹: 쿼리당 ~10 연산 vs 브루트 ~10⁹. 약 10⁸ 배 빠름.")}
</div>

<div class="box warn">
  <b>📝 ${t(E, "Self-check (final)", "자가 점검 (마지막)")}</b>
  <ol style="margin:6px 0 0;padding-left:20px;font-size:12px;">
    <li>${t(E, "Compute by hand: how many x in [2, 100] give different answers? (Use the table.)",
              "직접 계산: x ∈ [2, 100] 중 답이 다른 수는 몇 개? (표 활용.)")}</li>
    <li>${t(E, "What does the optimal code return for N = 50?",
              "N = 50 일 때 최적 코드는 뭘 반환?")}</li>
    <li>${t(E, "Trace N = 4500 by hand. (Hint: easy = 5+30 = 35; tricky = 4-digit ≤ 4500 with first=4 → walk i=1,2,3.)",
              "N = 4500 직접 trace. (힌트: 쉬운 = 5+30 = 35; 어려운 = 4자리 ≤ 4500 중 first=4 → i=1,2,3 따라가기.)")}</li>
  </ol>
  <div style="font-size:11px;color:#94a3b8;margin-top:6px;font-style:italic;">
    ${t(E,
      "Answers: 1) 5 (just 45~49). 2) 5 (only 2-digit, 45~49). 3) Easy = 35. Tricky: i=1 digit=5≥4 → extra=1, rem=1, p6[1]=6 → +1·6·5=30; i=2 digit=0<4 → break. So tricky = 30. Total = 65.",
      "답: 1) 5 (45~49 만). 2) 5 (2자리만, 45~49). 3) 쉬운 = 35. 어려운: i=1 digit=5≥4 → extra=1, rem=1, p6[1]=6 → +1·6·5=30; i=2 digit=0<4 → break. 어려운 = 30. 전체 = 65.")}
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


/* ================================================================
   downloadOptPDF — 어디서든 호출 가능. 새 창에 인쇄용 HTML 그리고 print() 호출
   ================================================================ */
export function downloadOptPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) {
    alert(t(E,
      "Pop-up was blocked. Please allow pop-ups and try again.",
      "팝업이 차단됐어요. 팝업 허용 후 다시 시도해주세요."));
    return;
  }
  const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "Python" : "C++";
  const fileTitle = t(E, "Roundabout Rounding — Optimized Code", "🔄 Roundabout Rounding — 최적 코드");
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 18mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
         color: #1f2937; line-height: 1.55; max-width: 760px; margin: 0 auto; padding: 16px; }
  h1 { font-size: 20px; margin: 0 0 4px; color: #4f46e5; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 16px; padding: 8px 12px; border-radius: 8px; margin: 18px 0 10px; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; font-size: 13px; }
  .why b { color: #4f46e5; }
  .why ul { margin: 6px 0 0; padding-left: 18px; }
  .why li { margin-bottom: 4px; }
  pre { background: #0f172a; color: #f8fafc; padding: 12px 14px; border-radius: 8px;
        font-family: "JetBrains Mono", Consolas, monospace; font-size: 12px;
        overflow-x: auto; white-space: pre-wrap; word-break: break-word; page-break-inside: avoid; }
  .lang-tag { display: inline-block; background: #4f46e5; color: white;
              padding: 2px 8px; border-radius: 4px; font-size: 10px; margin-left: 6px; vertical-align: middle; }
  .footer { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 8px; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } }
</style></head><body>
<div class="hint">📄 ${t(E,
  "In the print dialog, choose 'Save as PDF' as the destination to download.",
  "인쇄 창에서 '대상' / 'Destination' 을 'PDF로 저장' / 'Save as PDF' 로 선택하면 다운로드됩니다.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">${t(E, "USACO 2024 December Bronze · O(log N) solution", "USACO 2024 December Bronze · O(log N) 풀이")}</div>
${sections.map(s => {
  const sCode = lang === "py" ? s.py : s.cpp;
  return `
  <h2 style="background:${s.bgColor || "#eef2ff"};color:${s.color || "#4f46e5"};">${s.label}</h2>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${escapeHtml(w)}</li>`).join("")}</ul>
  </div>
  <pre>${escapeHtml(sCode.join("\n"))}</pre>
  `;
}).join("")}
<div class="footer">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 400);
}

/* ================================================================
   ProgressiveCode — 인터랙티브 코드 뷰어
     - 4 가지 섹션 (1단계, 2단계, 3단계, 전체) 버튼으로 선택
     - Python / C++ 토글
     - 각 섹션마다 "왜 이렇게?" 설명
     - PDF 다운로드 (브라우저 print → Save as PDF)
   ================================================================ */
export function ProgressiveCode({ E, sections }) {
  const [active, setActive] = useState(null);     // null = 아직 안 누름
  const [lang, setLang] = useState("py");         // "py" or "cpp"
  const cur = active !== null ? sections[active] : null;
  const code = cur ? (lang === "py" ? cur.py : cur.cpp) : null;

  const downloadPDF = () => downloadFullPDF(E, sections, lang);

  return (
    <div style={{ padding: 14 }}>
      {/* 상단: 언어 토글 + PDF 다운로드 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 2, background: "#fff", borderRadius: 8, border: `1.5px solid ${C.border}`, padding: 2 }}>
          {[["py","🐍 Python"],["cpp","💻 C++"]].map(([v, label]) => (
            <button key={v} onClick={() => setLang(v)} style={{
              background: lang === v ? C.accent : "transparent", border: "none", borderRadius: 6,
              padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 800,
              color: lang === v ? "#fff" : C.dim,
            }}>{label}</button>
          ))}
        </div>
        <button onClick={downloadPDF} style={{
          background: "#fff", border: `1.5px solid ${C.accentBd}`, borderRadius: 8,
          padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 800, color: C.accent,
        }}>📄 {t(E, "Download PDF", "PDF 다운로드")}</button>
      </div>

      {/* 섹션 선택 버튼들 */}
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
                transition: "all .15s",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* 활성 섹션 내용 */}
      {!cur && (
        <div style={{
          textAlign: "center", padding: "40px 20px", color: C.dim, fontSize: 13,
          background: "#fff", border: `1.5px dashed ${C.border}`, borderRadius: 10,
        }}>
          👆 {t(E, "Click a button above to see that part of the code.",
                  "위 버튼 눌러서 코드 부분을 확인해봐요.")}
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
