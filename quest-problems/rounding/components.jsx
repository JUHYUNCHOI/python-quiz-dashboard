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
  const widthOf = tt => Math.min(100, (tt / TIME_LIMIT) * 100);
  const fmtTime = tt =>
    tt < 1e-4 ? "즉시"
    : tt < 0.01 ? `${(tt * 1000).toFixed(1)}ms`
    : tt < 1   ? `${(tt * 1000).toFixed(0)}ms`
    : tt < 60  ? `${tt.toFixed(1)}초`
    : `${(tt / 60).toFixed(1)}분`;
  const fmtOps = n =>
    n < 1e3 ? `${n}`
    : n < 1e6 ? `${(n / 1e3).toFixed(1)}K`
    : n < 1e9 ? `${(n / 1e6).toFixed(1)}M`
    : `${(n / 1e9).toFixed(1)}B`;

  const Bar = ({ label, time, ops, color }) => {
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
      <Bar label={t(E, "🐢 Brute force", "🐢 브루트포스")} time={bruteTime} ops={bruteOps} color={C.no} />
      <Bar label={t(E, "💾 Cache",       "💾 캐시")}        time={cacheTime} ops={cacheOps} color={C.carry} />
      <Bar label={t(E, "⚡ Formula",     "⚡ 공식 (목표)")}   time={formulaTime} ops={formulaOps} color={C.ok} />

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
   IntervalSim — interactive [s_d, e_d] interval explorer
   ----------------------------------------------------------------
   Goal: BEFORE the student sees `s_d = int("4"*(d-1) + "5")` in code,
   give them hands-on feel for what s_d / e_d mean. Slide d, slide N,
   see the digit boxes light up and the band on the number line clip.
   ================================================================ */
export function IntervalSim({ E }) {
  const [d, setD] = useState(3);
  const [N, setN] = useState(4567);

  // s_d = 4...45 (d-1 fours + one 5)
  // e_d = 4 99...9 (one 4 + d-1 nines)
  const sStr = "4".repeat(d - 1) + "5";
  const eStr = "4" + "9".repeat(d - 1);
  const sVal = parseInt(sStr, 10);
  const eVal = parseInt(eStr, 10);

  // d-digit overall range, used for the number-line scale
  const lo = Math.pow(10, d - 1);
  const hi = Math.pow(10, d) - 1;
  const xMax = hi; // number line ends at the largest d-digit number
  const pct = v => Math.max(0, Math.min(100, ((v - 0) / xMax) * 100));

  // Where N sits relative to [s_d, e_d]
  let zone, count, formula;
  if (N < sVal) {
    zone = "before";
    count = 0;
    formula = t(E, `s_d (${sVal}) > N (${N}) → 0 (stop)`,
                   `s_d (${sVal}) > N (${N}) → 0 (멈춤)`);
  } else if (N > eVal) {
    zone = "after";
    count = eVal - sVal + 1;
    formula = `min(${N}, ${eVal}) − ${sVal} + 1 = ${eVal} − ${sVal} + 1 = ${count}`;
  } else {
    zone = "inside";
    count = N - sVal + 1;
    formula = `min(${N}, ${eVal}) − ${sVal} + 1 = ${N} − ${sVal} + 1 = ${count}`;
  }

  // Highlighted band on the number line: [s_d, min(N, e_d)] when N >= s_d
  const bandStart = sVal;
  const bandEnd = zone === "before" ? sVal : Math.min(N, eVal);

  // Digit-box renderer
  const Box = ({ ch, color, bg, bd, big }) => (
    <div style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: big ? 36 : 30, height: big ? 44 : 38,
      background: bg, color, border: `2px solid ${bd}`, borderRadius: 8,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 900,
      fontSize: big ? 22 : 18,
    }}>{ch}</div>
  );

  const sBoxes = sStr.split("").map((ch, i) => {
    const isFive = i === sStr.length - 1;
    return (
      <Box key={`s${i}`} ch={ch}
        color={isFive ? "#fff" : C.no}
        bg={isFive ? C.no : C.noBg}
        bd={C.noBd}
        big={isFive} />
    );
  });
  const eBoxes = eStr.split("").map((ch, i) => {
    const isFour = i === 0;
    return (
      <Box key={`e${i}`} ch={ch}
        color={isFour ? C.ok : "#fff"}
        bg={isFour ? C.okBg : C.ok}
        bd={C.okBd}
        big={!isFour} />
    );
  });

  return (
    <div style={{ padding: 16 }}>
      {/* Sliders */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ minWidth: 40, fontSize: 12, fontWeight: 800, color: C.dim }}>d =</span>
          <span style={{ minWidth: 28, fontSize: 20, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>{d}</span>
          <input type="range" min={2} max={6} step={1} value={d}
            onChange={e => setD(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: C.accent }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ minWidth: 40, fontSize: 12, fontWeight: 800, color: C.dim }}>N =</span>
          <span style={{ minWidth: 70, fontSize: 16, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>{N.toLocaleString()}</span>
          <input type="range" min={1} max={99999} step={1} value={N}
            onChange={e => setN(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: C.accent }} />
        </div>
      </div>

      {/* Digit-box display: s_d and e_d */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14,
      }}>
        {/* s_d */}
        <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.no, letterSpacing: 0.5, marginBottom: 6 }}>
            s<sub>d</sub> {t(E, "(smallest)", "(가장 작음)")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6 }}>{sBoxes}</div>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            = "4"×{d - 1} + "5"
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.no, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>
            {sVal.toLocaleString()}
          </div>
        </div>
        {/* e_d */}
        <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.ok, letterSpacing: 0.5, marginBottom: 6 }}>
            e<sub>d</sub> {t(E, "(largest)", "(가장 큼)")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6 }}>{eBoxes}</div>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            = "4" + "9"×{d - 1}
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.ok, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>
            {eVal.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Number line */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "14px 16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, letterSpacing: 0.5, marginBottom: 8, textAlign: "center" }}>
          {t(E, `${d}-digit number line — disagreement band highlighted`,
              `${d}자리 수직선 — 답이 다른 구간 강조`)}
        </div>
        <div style={{ position: "relative", height: 70, marginBottom: 4 }}>
          {/* base line: full d-digit range [lo, hi] shown lightly */}
          <div style={{
            position: "absolute", left: `${pct(lo)}%`, right: `${100 - pct(hi)}%`,
            top: 30, height: 8, background: "#e5e7eb", borderRadius: 4,
          }} />
          {/* disagreement band [s_d, min(N, e_d)] */}
          {zone !== "before" && (
            <div style={{
              position: "absolute", left: `${pct(bandStart)}%`,
              width: `${pct(bandEnd) - pct(bandStart)}%`,
              top: 28, height: 12, background: C.accent, borderRadius: 4,
              boxShadow: `0 0 0 2px ${C.accentBd}`,
            }} />
          )}
          {/* s_d tick */}
          <div style={{ position: "absolute", left: `${pct(sVal)}%`, top: 18, transform: "translateX(-50%)" }}>
            <div style={{ width: 2, height: 32, background: C.no }} />
            <div style={{ fontSize: 10, fontWeight: 800, color: C.no, fontFamily: "'JetBrains Mono',monospace", marginTop: 2, transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
              s<sub>d</sub>={sVal}
            </div>
          </div>
          {/* e_d tick */}
          <div style={{ position: "absolute", left: `${pct(eVal)}%`, top: 18, transform: "translateX(-50%)" }}>
            <div style={{ width: 2, height: 32, background: C.ok }} />
            <div style={{ fontSize: 10, fontWeight: 800, color: C.ok, fontFamily: "'JetBrains Mono',monospace", marginTop: 2, transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
              e<sub>d</sub>={eVal}
            </div>
          </div>
          {/* N marker */}
          <div style={{
            position: "absolute", left: `${pct(Math.min(N, xMax))}%`,
            top: 0, transform: "translateX(-50%)",
          }}>
            <div style={{
              fontSize: 10, fontWeight: 900,
              color: zone === "before" ? C.no : C.accent,
              fontFamily: "'JetBrains Mono',monospace",
              background: "#fff",
              padding: "1px 4px", borderRadius: 4,
              border: `1.5px solid ${zone === "before" ? C.noBd : C.accentBd}`,
              whiteSpace: "nowrap",
            }}>N={N.toLocaleString()}</div>
            <div style={{
              width: 2, height: 18, marginLeft: "auto", marginRight: "auto",
              background: zone === "before" ? C.no : C.accent,
            }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace", marginTop: 6 }}>
          <span>0</span>
          <span>{lo.toLocaleString()}</span>
          <span>{hi.toLocaleString()}</span>
        </div>
      </div>

      {/* Count formula */}
      <div style={{
        background: zone === "before" ? C.noBg : C.accentBg,
        border: `2px solid ${zone === "before" ? C.noBd : C.accentBd}`,
        borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: zone === "before" ? C.no : C.accent, letterSpacing: 0.5, marginBottom: 4 }}>
          {t(E, "count = min(N, e_d) − s_d + 1", "개수 = min(N, e_d) − s_d + 1")}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
          {formula}
        </div>
        {zone !== "before" && (
          <div style={{ fontSize: 22, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
            = {count}
          </div>
        )}
      </div>

      {/* Caption */}
      <div style={{
        background: "#f8f9fc", borderRadius: 8, padding: "10px 12px",
        fontSize: 11.5, color: C.dim, fontWeight: 700, lineHeight: 1.6, textAlign: "center",
      }}>
        💡 {t(E,
          "Slide d and N. The disagreeing numbers for each digit count form ONE clean interval.",
          "d 와 N 을 움직여 봐. 각 자릿수마다 답이 다른 수들이 한 덩어리로 모여 있어요.")}
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
  // 라이브 표시용 — 실행 중에 현재 위치 + 누적 카운트 보여줌
  const [liveCurrent, setLiveCurrent] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const alive = useRef(false);
  const startTimeRef = useRef(0);

  const run = () => {
    const N = Math.min(Math.max(parseInt(n) || 10, 10), 100000);
    setN(N); setRunning(true); setResults(null); setProgress(0);
    setLiveCurrent(2); setLiveCount(0);
    alive.current = true;
    startTimeRef.current = performance.now();
    const found = []; let idx = 2;

    const BATCH = 40;
    const TICK_MS = 16;

    const tick = () => {
      if (!alive.current) {
        const elapsed = performance.now() - startTimeRef.current;
        setResults({
          found, total: found.length, N, elapsedMs: elapsed,
          partial: true, checkedUpTo: idx - 1,
        });
        setRunning(false);
        return;
      }
      const end = Math.min(idx + BATCH, N + 1);
      for (; idx < end; idx++) {
        if (idx >= 10) {
          const b = calcBessie(idx), e = calcElsie(idx);
          if (b !== e) found.push({ x: idx, b, e });
        }
      }
      setProgress(Math.floor((idx - 2) / (N - 1) * 100));
      setLiveCurrent(idx - 1);
      setLiveCount(found.length);

      if (idx > N) {
        const elapsed = performance.now() - startTimeRef.current;
        setRunning(false);
        setResults({
          found, total: found.length, N, elapsedMs: elapsed,
          partial: false, checkedUpTo: N,
        });
        alive.current = false;
      } else {
        setTimeout(tick, TICK_MS);
      }
    };
    setTimeout(tick, 50);
  };
  const stop = () => { alive.current = false; };

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
          <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: C.accent, borderRadius: 4, width: `${progress}%`, transition: "width .1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
            <span style={{ color: C.dim, fontWeight: 700 }}>
              {t(E, "checking", "확인 중")} <span style={{ color: C.accent, fontWeight: 900 }}>x = {liveCurrent.toLocaleString()}</span>
            </span>
            <span style={{ color: C.dim, fontWeight: 700 }}>
              {t(E, "found so far", "지금까지")}: <span style={{ color: C.no, fontWeight: 900 }}>{liveCount.toLocaleString()}</span>
            </span>
            <span style={{ color: C.dim, fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      )}

      {results && (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", marginBottom: 10 }}>
            {results.partial ? (
              <>
                <div style={{ fontSize: 11, color: C.no, fontWeight: 800, letterSpacing: 0.5 }}>
                  ⏸ {t(E, "STOPPED EARLY", "중간에 멈춤")}
                </div>
                <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginTop: 2 }}>
                  {t(E, `checked 2 ~ ${results.checkedUpTo.toLocaleString()} of ${results.N.toLocaleString()}`,
                      `2 ~ ${results.checkedUpTo.toLocaleString()} 까지 확인 (목표 ${results.N.toLocaleString()})`)}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 11, color: C.ok, fontWeight: 800 }}>
                ✓ {t(E, `2 ~ ${results.N} fully checked`, `2 ~ ${results.N} 전부 확인`)}
              </div>
            )}
            <div style={{ fontSize: 36, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>{results.total}</div>
            <div style={{ fontSize: 12, color: C.dim }}>{t(E, "different x found (so far)", "개 (지금까지 발견)")}</div>
          </div>

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

/* ================================================================
   downloadFullPDF — 전체 풀이 종합 (문제 → 브루트 → 패턴 → 최적화)
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

  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

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

<h2>2. ${t(E, "Worked Examples", "예제 풀이")}</h2>

<h3>${t(E, "Example 1: x = 48", "예제 1: x = 48")}</h3>
<table>
  <tr><th>${t(E, "Cow", "소")}</th><th>${t(E, "Process", "과정")}</th><th>${t(E, "Result", "결과")}</th></tr>
  <tr><td>🐄 Bessie</td><td>${t(E, "first digit = 4 < 5 → return 0", "첫째 = 4 < 5 → 0 반환")}</td><td><b>0</b></td></tr>
  <tr><td>🐮 Elsie</td><td>${t(E, "ones=8≥5 → 48+10=58 → tens=5≥5 → 58+10·10=158 → //100·100 = 100",
                                   "1의자리 8≥5 → 48+10=58 → 10의자리 5≥5 → 58+100=158 → //100·100 = 100")}</td><td><b>100</b></td></tr>
</table>
<p><b>${t(E, "Different! → counts.", "다름! → 카운트.")}</b></p>

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

<h2>4. ${t(E, "Pattern Discovery", "패턴 발견")}</h2>

<p>${t(E,
  "Look at numbers where Bessie ≠ Elsie. They form contiguous intervals by digit count d:",
  "Bessie ≠ Elsie 인 수들 — 자릿수 d 별로 연속 구간을 이룸:")}</p>

<div class="box ok">
  <div style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:800;line-height:1.9;">
    s<sub>d</sub> = <span style="color:#dc2626;">4…45</span> &nbsp;(d−1 fours + a 5)<br/>
    e<sub>d</sub> = <span style="color:#10b981;">4 99…9</span> &nbsp;(a 4 + d−1 nines)
  </div>
  <div style="text-align:center;font-size:11px;color:#6b7280;margin-top:6px;">
    ${t(E, "All d-digit x with Bessie ≠ Elsie lie in [s_d, e_d].",
          "Bessie ≠ Elsie 인 d 자리 x 는 모두 [s_d, e_d] 구간에 있어요.")}
  </div>
</div>

<table>
  <tr><th>d</th><th>s<sub>d</sub></th><th>e<sub>d</sub></th><th>${t(E, "Count", "개수")}</th></tr>
  <tr><td>2</td><td>45</td><td>49</td><td><b>5</b></td></tr>
  <tr><td>3</td><td>445</td><td>499</td><td><b>55</b></td></tr>
  <tr><td>4</td><td>4445</td><td>4999</td><td><b>555</b></td></tr>
  <tr><td>5</td><td>44445</td><td>49999</td><td><b>5555</b></td></tr>
</table>

<h2>5. ${t(E, "Optimization — O(log N)", "최적화 — O(log N)")}</h2>

<p>${t(E,
  "Strategy: for each digit count d (2, 3, 4, ...), the disagreeing x form one contiguous interval [s_d, e_d]. Clip to N and sum the lengths.",
  "전략: 각 자릿수 d (2, 3, 4, ...) 마다 답이 다른 x 는 연속 구간 [s_d, e_d]. N 으로 자르고 길이 합산.")}</p>

<div class="box ok">
  <b>${t(E, "Per query:", "쿼리당:")}</b>
  ${t(E,
    "Loop d = 2, 3, ... while s_d ≤ N. Add min(N, e_d) − s_d + 1. Stop when s_d > N (about 10 iterations max for N ≤ 10⁹).",
    "d = 2, 3, ... 반복하며 s_d ≤ N 인 동안. min(N, e_d) − s_d + 1 더함. s_d > N 이면 멈춤 (N ≤ 10⁹ 면 최대 10번).")}
</div>

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

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용 출력")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}

// Backwards-compat alias used by RoundingApp.jsx
export const downloadRoundingPDF = downloadFullPDF;


/* ================================================================
   ProgressiveCode — 인터랙티브 코드 뷰어
   ================================================================ */
export function ProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`,
            `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{
              background: s.color, color: "#fff",
              padding: "8px 14px", borderRadius: "10px 10px 0 0",
              fontSize: 14, fontWeight: 800,
            }}>{s.label}</div>
            <div style={{
              background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none",
              padding: "10px 12px",
            }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {langLabel} {t(E, "specific:", "전용:")}
                  </div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              <CodeBlock lines={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Backwards-compat alias used by RoundingApp.jsx
export const RoundingProgressiveCode = ProgressiveCode;

// Stubs kept for any other consumer of the old "thin" component API.
// These aren't used by the new RoundingApp (which wires its own widgets via
// step types like "compare3" / "runner" / "scale" / "progressive"), but
// re-exporting keeps compile-time imports stable elsewhere.
export function RoundingSim() { return null; }
export function RoundingRunner() { return null; }

// getRoundingSections is wired through chapters.jsx (re-export) so old code
// that imports it from "./components" keeps working.
export { getOptSections as getRoundingSections } from "./chapters";
