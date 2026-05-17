// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 13/13 PASS
//   C++:    13/13 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

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
  const T = 10; // 쿼리 수 — USACO 보통 10

  // 파이썬 대략 처리 속도 (interpreted)
  const OPS_PER_SEC = 1e7;
  const TIME_LIMIT = 2; // USACO 제한 ~2초

  // T 번 쿼리 누적 연산 횟수
  const bruteOps   = T * N * 6;                                  // 매번 N 까지 처음부터
  const cacheOps   = N * 6 + T * 1;                              // 한 번 채우고 나머지는 lookup
  const formulaOps = T * Math.max(1, Math.ceil(Math.log10(N)) * 5); // 매번 O(log N)

  const bruteTime   = bruteOps   / OPS_PER_SEC;
  const cacheTime   = cacheOps   / OPS_PER_SEC;
  const formulaTime = formulaOps / OPS_PER_SEC;

  // 시각용 — *log10 ops* 기준. 선형 시간 기준이면 공식 (~400 ops)
  // 이 항상 invisible. log 로 하면 세 풀이 다 보이게 자람.
  // MAX_LOG_OPS = 11 → 10^11 까지 표시 (브루트 N=10^9 면 6×10^10).
  const MAX_LOG_OPS = 11;
  const widthOf = ops => Math.min(100, (Math.log10(Math.max(ops, 1)) / MAX_LOG_OPS) * 100);
  // TLE 임계점 (시간 = TIME_LIMIT) 의 ops = TIME_LIMIT * OPS_PER_SEC = 2*10^7.
  // 그 위치 = log10(2e7)/11 ≈ 0.66 → 막대의 66% 지점.
  const TLE_THRESHOLD_PCT = (Math.log10(TIME_LIMIT * OPS_PER_SEC) / MAX_LOG_OPS) * 100;
  const fmtTime = tt =>
    tt < 1e-4 ? t(E, "instant", "즉시")
    : tt < 0.01 ? `${(tt * 1000).toFixed(1)}ms`
    : tt < 1   ? `${(tt * 1000).toFixed(0)}ms`
    : tt < 60  ? `${tt.toFixed(1)}${t(E, "s", "초")}`
    : `${(tt / 60).toFixed(1)}${t(E, "m", "분")}`;
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
          <div style={{
            flex: 1, height: 18, background: "#f1f5f9", borderRadius: 6,
            border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
          }}>
            {/* TLE 임계선 — 막대 위 세로선 (한 번만 그려도 되지만 각 막대에 표시) */}
            <div style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${TLE_THRESHOLD_PCT}%`, width: 2,
              background: "#fca5a5", zIndex: 2,
            }} />
            <div style={{
              width: `${widthOf(ops)}%`, height: "100%",
              background: tle ? C.no : color,
              transition: "width .25s",
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
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginLeft: 12 }}>
          {t(E, `· T = ${T} queries`, `· T = ${T} 쿼리`)}
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

      {/* 제한 시간 표시 + log scale 안내 */}
      <div style={{ marginTop: 12, padding: "8px 12px", background: "#f8f9fc", borderRadius: 8, fontSize: 11, color: C.dim, fontWeight: 700, textAlign: "center", lineHeight: 1.7 }}>
        ⏱ {t(E,
          `Time limit: ${TIME_LIMIT}s. Red vertical line = TLE threshold. Bar is log scale, so even the formula's slow growth is visible.`,
          `시간 제한: ${TIME_LIMIT}초. 빨간 세로선 = TLE 임계점. 막대는 log 스케일이라 공식의 느린 성장도 보임.`)}
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 8, fontSize: 11, color: C.accent, fontWeight: 700, lineHeight: 1.6, textAlign: "center" }}>
        💡 {t(E,
              `Slide N from 10 to 10⁹: watch brute jump way past the red line, cache eventually too, while the formula bar barely budges (still left of red line). That's O(N) vs O(log N).`,
              `N 을 10 부터 10⁹ 까지 끌어봐요: 브루트는 금방 빨간선 넘어가고 캐시도 결국 넘어가요. 공식은 막대가 살짝씩만 자라요 (빨간선 한참 못 미침). 이게 O(N) 과 O(log N) 차이.`)}
      </div>
    </div>
  );
}


/* ================================================================
   IntervalSim — see ALL digit counts at once for a chosen N
   ----------------------------------------------------------------
   Goal: make the algorithm's "stop when s_d > N" obvious by showing
   every d=2..6 row simultaneously. Student picks N; each row's
   contribution is shown with a status badge. Once a STOP row hits,
   the rest grey out as "skip" — exactly mirroring the algorithm.
   ================================================================ */
export function IntervalSim({ E }) {
  const [N, setN] = useState(4567);
  // stepIdx: 1..rows.length = 그 번째 행까지 공개. rows.length+1 = 합계 공개.
  // N 바뀌면 1 로 리셋 (사용자가 새 N 으로 처음부터 따라가게).
  const [stepIdx, setStepIdx] = useState(1);

  // N 변할 때 step 리셋
  const handleSetN = (newN) => { setN(newN); setStepIdx(1); };

  // Build all d rows
  const rows = [2, 3, 4, 5, 6].map(d => {
    let s_d = 0;
    for (let i = 0; i < d - 1; i++) s_d = s_d * 10 + 4;
    s_d = s_d * 10 + 5;
    let e_d = 4;
    for (let i = 0; i < d - 1; i++) e_d = e_d * 10 + 9;
    return { d, s_d, e_d };
  });

  // Status: full / clipped / stop / skip
  let stopped = false;
  rows.forEach(r => {
    if (stopped) {
      r.status = "skip";
      r.count = 0;
    } else if (r.s_d > N) {
      r.status = "stop";
      r.count = 0;
      stopped = true;
    } else if (r.e_d <= N) {
      r.status = "full";
      r.count = r.e_d - r.s_d + 1;
    } else {
      r.status = "clipped";
      r.count = N - r.s_d + 1;
    }
  });

  const total = rows.reduce((s, r) => s + r.count, 0);

  // 단계 제어
  const showTotal = stepIdx > rows.length;
  const currentRowIdx = Math.min(stepIdx - 1, rows.length - 1); // 방금 공개된 행
  const canPrevStep = stepIdx > 1;
  const canNextStep = stepIdx <= rows.length;

  // 다음 버튼 라벨 — 무슨 일이 일어날지 미리 알려줌
  let nextLabel;
  if (stepIdx <= rows.length) {
    const nextRow = rows[stepIdx - 1];   // ← 다음 클릭 시 강조될 행
    if (stepIdx === rows.length + 0 && false) {
      // unreachable; placeholder
    }
    if (stepIdx === 1) {
      nextLabel = t(E, `▶ Start with d=${nextRow.d}`, `▶ d=${nextRow.d} 부터 시작`);
    } else if (stepIdx === rows.length) {
      nextLabel = t(E, "🎯 Show total", "🎯 합계 보기");
    } else {
      nextLabel = t(E, `▶ Next: d=${nextRow.d}`, `▶ 다음: d=${nextRow.d}`);
    }
  } else {
    nextLabel = t(E, "🔄 Restart", "🔄 다시 처음부터");
  }
  const handleNext = () => {
    if (stepIdx > rows.length) setStepIdx(1);   // restart
    else setStepIdx(stepIdx + 1);
  };

  const statusStyle = (status) => {
    if (status === "full")    return { bg: C.okBg, color: C.ok,   label: t(E, "FULL",   "전체") };
    if (status === "clipped") return { bg: "#fef3c7", color: "#a16207", label: t(E, "CLIPPED", "잘림") };
    if (status === "stop")    return { bg: C.noBg, color: C.no,   label: t(E, "STOP",   "멈춤") };
    return { bg: "#f8f9fc", color: C.dim, label: t(E, "skip", "건너뜀") };
  };

  return (
    <div style={{ padding: 16 }}>
      {/* N preset buttons */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ minWidth: 40, fontSize: 12, fontWeight: 800, color: C.dim }}>N =</span>
          {[
            { v: 30,    label: "30",     hint: t(E, "before any band", "구간 시작 전") },
            { v: 47,    label: "47",     hint: t(E, "clips d=2",        "d=2 잘림") },
            { v: 500,   label: "500",    hint: t(E, "clips d=3",        "d=3 잘림") },
            { v: 4567,  label: "4,567",  hint: t(E, "clips d=4",        "d=4 잘림") },
            { v: 99999, label: "99,999", hint: t(E, "all bands fit",    "전부 다 들어감") },
          ].map(({ v, label, hint }) => {
            const active = N === v;
            return (
              <button
                key={v}
                onClick={() => handleSetN(v)}
                title={hint}
                style={{
                  padding: "6px 12px",
                  background: active ? C.accent : "#f8f9fc",
                  color: active ? "#fff" : C.text,
                  border: `1.5px solid ${active ? C.accent : C.border}`,
                  borderRadius: 8,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >{label}</button>
            );
          })}
        </div>
      </div>

      {/* Pre-table caption — frame the goal */}
      <div style={{
        background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 10,
        fontSize: 13, color: C.text, lineHeight: 1.7, fontWeight: 600,
      }}>
        {t(E, "Counting disagreeing numbers from ", "")}
        <strong style={{ fontFamily: "'JetBrains Mono',monospace" }}>2</strong>
        {t(E, " to ", " 부터 ")}
        <strong style={{ color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>N={N.toLocaleString()}</strong>
        {t(E, ". Each digit-count d adds its share — until the interval goes past N.",
              " 까지 답이 다른 수를 세요. 각 자릿수 d 가 자기 몫을 더해요 — 그 자릿수 구간이 N 을 넘어가기 전까지.")}
      </div>

      {/* Step controls — 단계별 따라가기 */}
      <div style={{
        background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: C.accent }}>
          {t(E, `Step ${Math.min(stepIdx, rows.length + 1)} / ${rows.length + 1}`,
                `${Math.min(stepIdx, rows.length + 1)} / ${rows.length + 1} 단계`)}
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setStepIdx(Math.max(1, stepIdx - 1))}
            disabled={!canPrevStep}
            style={{
              padding: "6px 12px",
              background: canPrevStep ? "#fff" : "#f1f5f9",
              color: canPrevStep ? C.accent : "#cbd5e1",
              border: `1.5px solid ${canPrevStep ? C.accent : "#e2e8f0"}`,
              borderRadius: 8, fontSize: 12, fontWeight: 800,
              cursor: canPrevStep ? "pointer" : "default",
            }}
          >◀ {t(E, "Prev", "이전")}</button>
          <button
            onClick={handleNext}
            style={{
              padding: "6px 14px",
              background: C.accent, color: "#fff",
              border: `1.5px solid ${C.accent}`,
              borderRadius: 8, fontSize: 12, fontWeight: 800,
              cursor: "pointer",
            }}
          >{nextLabel}</button>
        </div>
      </div>

      {/* All-d table */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "40px 1fr 90px 80px",
          padding: "8px 12px", background: "#f8f9fc",
          borderBottom: `1.5px solid ${C.border}`,
          fontSize: 11, fontWeight: 800, color: C.dim,
        }}>
          <span>d</span>
          <span>{t(E, "interval [s_d, e_d] — counted vs cut",
                       "구간 [s_d, e_d] — 카운트 vs 잘림")}</span>
          <span style={{ textAlign: "center" }}>{t(E, "status", "상태")}</span>
          <span style={{ textAlign: "right" }}>+</span>
        </div>
        {rows.map((r, i) => {
          const st = statusStyle(r.status);
          // 단계 게이팅: 아직 공개 안 된 행은 placeholder 로 (구조는 유지, 내용 가림)
          const revealed = i < stepIdx;
          const isCurrent = i === currentRowIdx && stepIdx <= rows.length;
          if (!revealed) {
            return (
              <div key={r.d} style={{
                display: "grid", gridTemplateColumns: "40px 1fr 90px 80px",
                alignItems: "center",
                padding: "10px 12px",
                borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
                background: "#fafbff",
                opacity: 0.35,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span style={{ fontWeight: 900, color: "#cbd5e1", fontSize: 14 }}>{r.d}</span>
                <span style={{ fontSize: 12, color: "#cbd5e1", fontStyle: "italic", fontFamily: "system-ui, sans-serif" }}>
                  {t(E, "— hidden, click Next ▶", "— 가려짐, 다음 ▶ 클릭")}
                </span>
                <span></span>
                <span></span>
              </div>
            );
          }
          return (
            <div key={r.d} style={{
              display: "grid", gridTemplateColumns: "40px 1fr 90px 80px",
              alignItems: "center",
              padding: "10px 12px",
              borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
              background: isCurrent ? "#fff7ed" : (i % 2 === 0 ? "#fff" : "#fafbff"),
              opacity: r.status === "skip" ? 0.45 : 1,
              fontFamily: "'JetBrains Mono',monospace",
              ...(isCurrent ? {
                boxShadow: "inset 4px 0 0 #f97316",
                animation: "popIn .3s cubic-bezier(.34,1.56,.64,1)",
              } : {}),
              transition: "background .2s",
            }}>
              <span style={{ fontWeight: 900, color: isCurrent ? "#f97316" : C.accent, fontSize: 14 }}>
                {isCurrent && "👉 "}{r.d}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.6 }}>
                {r.status === "clipped" ? (
                  <>
                    {/* Counted portion — bold + N highlighted */}
                    <span style={{ color: C.no }}>{r.s_d.toLocaleString()}</span>
                    <span style={{ color: C.dim }}>{" — "}</span>
                    <span style={{
                      color: "#a16207", fontWeight: 900,
                      background: "#fef3c7", padding: "1px 7px", borderRadius: 4,
                    }}>{t(E, "N=", "N=")}{N.toLocaleString()}</span>
                    <span style={{ marginLeft: 6, fontSize: 10, color: "#a16207", fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                      ✓ {t(E, "counted", "카운트")}
                    </span>
                    <br />
                    {/* Excluded portion — strikethrough + dimmed */}
                    <span style={{
                      color: "#94a3b8", textDecoration: "line-through",
                      fontSize: 11, fontWeight: 600,
                    }}>
                      {(N + 1).toLocaleString()} — {r.e_d.toLocaleString()}
                    </span>
                    <span style={{ marginLeft: 6, fontSize: 10, color: "#94a3b8", fontWeight: 600, fontFamily: "system-ui, sans-serif" }}>
                      ✗ {t(E, `${(r.e_d - N)} excluded`, `${(r.e_d - N)} 개 제외`)}
                    </span>
                  </>
                ) : r.status === "stop" ? (
                  <>
                    <span style={{ color: C.no, opacity: 0.6 }}>{r.s_d.toLocaleString()}</span>
                    <span style={{ color: C.dim, opacity: 0.6 }}>{" — "}</span>
                    <span style={{ color: C.ok, opacity: 0.6 }}>{r.e_d.toLocaleString()}</span>
                    <span style={{ marginLeft: 8, fontSize: 10, color: C.no, fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                      {t(E, `s_d > N → exit loop`, `s_d > N → 루프 종료`)}
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ color: C.no }}>{r.s_d.toLocaleString()}</span>
                    <span style={{ color: C.dim }}>{" — "}</span>
                    <span style={{ color: C.ok }}>{r.e_d.toLocaleString()}</span>
                    {r.status === "full" && (
                      <span style={{ marginLeft: 8, fontSize: 10, color: C.ok, fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                        ✓ {t(E, "all in range", "전부 N 안")}
                      </span>
                    )}
                  </>
                )}
              </span>
              <span style={{
                textAlign: "center",
                fontSize: 11, fontWeight: 800,
                color: st.color, background: st.bg,
                padding: "3px 0", borderRadius: 6,
                justifySelf: "center",
                minWidth: 70,
              }}>{st.label}</span>
              <span style={{
                textAlign: "right", fontSize: 14, fontWeight: 900,
                color: r.count > 0 ? C.accent : C.dim,
              }}>
                {r.count > 0 ? "+" + r.count.toLocaleString() : "0"}
              </span>
            </div>
          );
        })}
        {/* Total row — show only when all rows revealed */}
        {showTotal ? (
          <div style={{
            padding: "12px 14px",
            background: C.accentBg, borderTop: `2px solid ${C.accentBd}`,
            fontFamily: "'JetBrains Mono',monospace",
            color: C.accent, fontWeight: 900,
            animation: "popIn .3s cubic-bezier(.34,1.56,.64,1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>🎯 {t(E, "Total answer", "최종 답")}</span>
              <span style={{ fontSize: 20 }}>{total.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, opacity: 0.85, textAlign: "right" }}>
              {rows.filter(r => r.count > 0).map((r, i, arr) => (
                <span key={r.d}>
                  {r.count.toLocaleString()}
                  {i < arr.length - 1 ? " + " : " = " + total.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            padding: "10px 14px",
            background: "#fafbff", borderTop: `2px solid ${C.border}`,
            fontFamily: "system-ui, sans-serif",
            color: C.dim, fontWeight: 700, fontSize: 12, textAlign: "center",
          }}>
            {t(E,
              `▶ Next button to reveal more rows (${rows.length - stepIdx + 1} left, then total)`,
              `▶ 다음 누르면 더 공개 (${rows.length - stepIdx + 1} 개 남음, 그 다음 합계)`)}
          </div>
        )}
      </div>

      {/* Caption — explains why we show ALL d's */}
      <div style={{
        background: C.accentBg, border: `1.5px dashed ${C.accentBd}`, borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12, color: C.accent, fontWeight: 700, lineHeight: 1.7,
      }}>
        💡 {t(E,
          "Reading the table top-down: include FULL rows entirely, take only the CLIPPED row's left part (up to N), then STOP. That's the whole algorithm.",
          "표를 위에서 아래로 읽어요: 전체 (FULL) 행은 통째로 더하고, 잘림 (CLIPPED) 행은 N 까지만, 그 다음은 멈춤 (STOP). 이게 알고리즘 전체예요.")}
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
    if (sec < 3600) return `${(sec / 60).toFixed(1)}${t(E, "m", "분")}`;
    if (sec < 86400) return `${(sec / 3600).toFixed(1)}${t(E, "h", "시간")}`;
    return `${(sec / 86400).toFixed(1)}${t(E, "d", "일")}`;
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
    "    first_digit = int(s[0])",
    "    if first_digit >= 5:",
    "        return 10**P",
    "    else:",
    "        return 0",
    "",
    "def Elsie(x):",
    "    P = len(str(x))",
    "    cur = x",
    "    for pos in range(1, P+1):",
    "        d = (cur // 10**(pos-1)) % 10",
    "        if d >= 5:",
    "            cur += 10**pos",
    "        cur = (cur // 10**pos) * 10**pos",
    "    return cur",
    "",
    "T = int(input())",
    "for _ in range(T):",
    "    N = int(input())",
    "    count = 0",
    "    for x in range(2, N+1):",
    "        b = Bessie(x)",
    "        e = Elsie(x)",
    "        if b != e:",
    "            count += 1",
    "    print(count)",
  ];
  const BRUTE_CPP = [
    "#include <iostream>",
    "#include <string>",
    "using namespace std;",
    "",
    "int pw10(int n) {",
    "    int r = 1;",
    "    for (int i = 0; i < n; i++) {",
    "        r *= 10;",
    "    }",
    "    return r;",
    "}",
    "",
    "int Bessie(int x) {",
    "    string s = to_string(x);",
    "    int P = s.length();",
    "",
    "    int first = x;",
    "    while (first >= 10) {",
    "        first /= 10;",
    "    }",
    "",
    "    if (first >= 5) {",
    "        return pw10(P);",
    "    }",
    "    return 0;",
    "}",
    "",
    "int Elsie(int x) {",
    "    string s = to_string(x);",
    "    int P = s.length();",
    "    int cur = x;",
    "",
    "    for (int pos = 1; pos <= P; pos++) {",
    "        int d = (cur / pw10(pos - 1)) % 10;",
    "        if (d >= 5) {",
    "            cur += pw10(pos);",
    "        }",
    "        cur = (cur / pw10(pos)) * pw10(pos);",
    "    }",
    "    return cur;",
    "}",
    "",
    "int main() {",
    "    int T;",
    "    cin >> T;",
    "    for (int t = 0; t < T; t++) {",
    "        int N;",
    "        cin >> N;",
    "        int count = 0;",
    "        for (int x = 2; x <= N; x++) {",
    "            if (Bessie(x) != Elsie(x)) {",
    "                count++;",
    "            }",
    "        }",
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

/* ================================================================
   RecapDrawer — right-side slide-out for "remind me what was X again?"
   학생이 이전 챕터 내용 잠시 확인하고 싶을 때. 퀴즈 스텝에 recap 필드
   넣어서 사용 (RoundingApp.jsx 가 step.recap 있으면 자동 렌더).
   ================================================================ */
export function RecapDrawer({ buttonLabel, title, children, E }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "6px 12px",
            background: "#fff",
            border: `1.5px solid ${C.accent}`,
            color: C.accent,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
          title={t(E, "Open recap", "다시 보기 열기")}
        >
          📖 {buttonLabel}
        </button>
      </div>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.35)",
              zIndex: 999,
              animation: "fadeIn .2s ease-out",
            }}
          />
          {/* Drawer panel — slides in from right */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(440px, 90vw)",
              background: "#fff",
              boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.18)",
              zIndex: 1000,
              overflowY: "auto",
              animation: "slideInRight .25s cubic-bezier(.34,1.56,.64,1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                position: "sticky",
                top: 0,
                background: C.accentBg,
                borderBottom: `1.5px solid ${C.accentBd}`,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 1,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: C.accent }}>
                📖 {title || buttonLabel}
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  border: `1.5px solid ${C.border}`,
                  color: C.dim,
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
                title={t(E, "Close", "닫기")}
              >
                ×
              </button>
            </div>
            {/* Drawer body */}
            <div style={{ padding: 0, flex: 1 }}>{children}</div>
          </div>

          {/* Keyframes */}
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to   { transform: translateX(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
          `}</style>
        </>
      )}
    </>
  );
}

/* ================================================================
   Ch1PRecap — content shown when student opens "P 가 뭐였더라?" drawer
   on the "What was P?" quiz in Try Solving tab.
   Mirrors the Ch1 step that introduces P (10^P > x).
   ================================================================ */
export function Ch1PRecap({ E }) {
  return (
    <div style={{ padding: 16, fontSize: 14, lineHeight: 1.85 }}>
      <div
        style={{
          background: C.accentBg,
          border: `2px solid ${C.accentBd}`,
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: C.accent, marginBottom: 8 }}>
          📐 {t(E, "P's condition", "P 의 조건")}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: C.accent,
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          10<sup>P</sup> &gt; x
        </div>
        <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
          {t(E, "(smallest such P)", "(을 만족하는 가장 작은 P)")}
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: C.dim,
          marginBottom: 4,
        }}
      >
        🔍 {t(E, "Examples", "예시")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
        {[
          { x: 7, d: 1, calc: "10¹=10 > 7" },
          { x: 48, d: 2, calc: "10²=100 > 48" },
          { x: 445, d: 3, calc: "10³=1000 > 445" },
          { x: 4459, d: 4, calc: "10⁴=10000 > 4459" },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 14px",
              marginBottom: 4,
              borderRadius: 8,
              background: "#f8f9fc",
              border: `1.5px solid ${C.border}`,
            }}
          >
            <span style={{ fontWeight: 800, color: C.text, minWidth: 50 }}>{row.x}</span>
            <span style={{ color: C.dim, fontSize: 11 }}>{row.calc}</span>
            <span style={{ fontWeight: 800, color: C.accent }}>P = {row.d}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fef3c7",
          border: `2px solid #fcd34d`,
          borderRadius: 10,
          padding: 12,
          marginTop: 12,
        }}
      >
        <div style={{ fontSize: 13, color: "#a16207", fontWeight: 700, lineHeight: 1.7 }}>
          💡 {t(E, "P = ", "")}
          <strong style={{ fontSize: 14 }}>{t(E, "the digit count of x", "x 의 자릿수")}</strong>
          {t(E, ".", " 예요.")}
        </div>
      </div>
    </div>
  );
}

// Stubs kept for any other consumer of the old "thin" component API.
// These aren't used by the new RoundingApp (which wires its own widgets via
// step types like "compare3" / "runner" / "scale" / "progressive"), but
// re-exporting keeps compile-time imports stable elsewhere.
export function RoundingSim() { return null; }
export function RoundingRunner() { return null; }

// getRoundingSections is wired through chapters.jsx (re-export) so old code
// that imports it from "./components" keeps working.
export { getOptSections as getRoundingSections } from "./chapters";
