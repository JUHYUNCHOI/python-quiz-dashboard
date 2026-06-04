import { useState } from "react";
import { t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { useCodeLang } from "@/components/quest/use-code-lang";

const TEAL   = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";
const OK      = "#15803d";
const OK_BG   = "#f0fdf4";
const OK_BD   = "#86efac";
const NO      = "#b91c1c";
const NO_BG   = "#fef2f2";
const NO_BD   = "#fca5a5";

/* 누적합 리스트: prefix[i] = 앞 i 개 숫자의 합. prefix[0] = 0 (빈 누적합). */
function prefixList(nums) {
  const p = [0];
  for (const x of nums) p.push(p[p.length - 1] + x);
  return p;
}

/* 모드 ①: 배운 대로 — 누적합 '리스트' 를 한 칸씩 만든다.
   prefix = [0] 에서 시작해 prefix[-1] + nums[i] 를 계속 덧붙인다. */
function buildPrefixTrace(nums) {
  const steps = [];
  const p = [0];
  steps.push({ phase: "init", i: -1, x: null, prefix: [...p], added: 0 });
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const prev = p[p.length - 1];
    p.push(prev + x);
    steps.push({ phase: "step", i, x, prev, prefix: [...p], added: prev + x });
  }
  return steps;
}

/* 모드 ②: 만든 누적합 리스트를 왼→오 훑으며 (prefix[r] − prefix[l] = k) 쌍을 센다.
   값마다: 짝(p − k) 이 앞에 몇 번 나왔나 조회 → count 에 더하기 → 이 값을 seen 에 기록.
   순서가 핵심: 조회 → 기록 (자기 자신을 짝으로 세지 않도록). */
function buildCountTrace(nums, k) {
  const p = prefixList(nums);
  const steps = [];
  const seen = {};
  let count = 0;
  steps.push({ phase: "init", pi: -1, p: null, need: null, found: null, count: 0, seen: {}, prefix: p, hlKey: null });
  for (let pi = 0; pi < p.length; pi++) {
    const val = p[pi];
    const need = val - k;
    const found = seen[need] || 0;
    count += found;
    seen[val] = (seen[val] || 0) + 1;
    steps.push({
      phase: "step", pi, p: val, need, found, count,
      seen: { ...seen }, prefix: p, hlKey: found > 0 ? need : null,
    });
  }
  return steps;
}

const CASES = [
  { id: "basic", nums: [1, 1, 1], k: 2 },
  { id: "neg",   nums: [1, -1, 1], k: 1 },
];

/* seen 항목 — 딕셔너리처럼 보이게 `key: value` 한 줄로. (배열 칸으로 오해하지 않도록) */
function DictEntry({ k, v, hot }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      borderRadius: 8, padding: "4px 10px",
      background: hot ? OK_BG : "#fff",
      border: `2px solid ${hot ? OK_BD : "#e2e8f0"}`,
      boxShadow: hot ? `0 0 0 3px ${OK_BG}` : "none",
      fontFamily: "monospace", transition: "all .15s",
    }}>
      <span style={{ fontSize: 13.5, fontWeight: 800, color: hot ? OK : "#334155" }}>{k}</span>
      <span style={{ fontSize: 12, color: "#94a3b8" }}>:</span>
      <span style={{ fontSize: 13.5, fontWeight: 800, color: hot ? OK : TEAL_D }}>{v}</span>
    </span>
  );
}

export function SubarraySumSim({ E }) {
  const [lang] = useCodeLang();                 // 위쪽 🐍 Py / 💻 C++ 토글과 동기화
  const py = lang === "py";
  const [mode, setMode] = useState("prefix");   // "prefix" = 리스트 만들기, "count" = 쌍 세기
  const [caseId, setCaseId] = useState("basic");
  const [si, setSi] = useState(0);

  const cur = CASES.find(c => c.id === caseId);
  const trace = mode === "prefix" ? buildPrefixTrace(cur.nums) : buildCountTrace(cur.nums, cur.k);
  const step = trace[Math.min(si, trace.length - 1)];
  const last = si >= trace.length - 1;
  const final = mode === "count" ? trace[trace.length - 1].count : null;
  const totalSteps = trace.length - 1;

  const pickMode = (m) => { setMode(m); setSi(0); };
  const pick = (id) => { setCaseId(id); setSi(0); };
  const next = () => setSi(s => Math.min(s + 1, trace.length - 1));
  const prev = () => setSi(s => Math.max(s - 1, 0));
  const reset = () => setSi(0);

  const seenEntries = mode === "count"
    ? Object.entries(step.seen).sort((a, b) => Number(a[0]) - Number(b[0]))
    : [];
  const isStep = step.phase === "step";

  const MODES = [
    { id: "prefix", label: t(E, "① Build the prefix list", "① 누적합 리스트 만들기") },
    { id: "count",  label: t(E, "② Count the pairs", "② 차이가 k 인 쌍 세기") },
  ];

  // 누적합 리스트 셀들 — 두 모드 공통으로 보여준다.
  const prefixCells = step.prefix;
  // 모드 ②에서 짝(need)으로 강조할 리스트 위치(가장 최근에 그 값이 기록된 칸)
  const partnerIdx = (mode === "count" && isStep && step.found > 0)
    ? prefixCells.slice(0, step.pi).lastIndexOf(step.need)
    : -1;

  return (
    <div style={{ padding: 14, fontFamily: "inherit" }}>
      {/* 모드 선택 — 먼저 누적합 리스트를 만들고, 그다음 쌍을 센다 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {MODES.map(m => {
          const on = m.id === mode;
          return (
            <button key={m.id} onClick={() => pickMode(m.id)} style={{
              cursor: "pointer", borderRadius: 999, padding: "6px 14px",
              fontSize: 12, fontWeight: 800,
              border: `2px solid ${on ? TEAL_D : "#cbd5e1"}`,
              background: on ? TEAL_D : "#fff",
              color: on ? "#fff" : "#475569",
            }}>
              {m.label}
            </button>
          );
        })}
      </div>

      {/* 케이스 선택 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {CASES.map(c => {
          const on = c.id === caseId;
          return (
            <button key={c.id} onClick={() => pick(c.id)} style={{
              cursor: "pointer", borderRadius: 8, padding: "6px 12px",
              fontSize: 12, fontWeight: 700, fontFamily: "monospace",
              border: `2px solid ${on ? TEAL : "#cbd5e1"}`,
              background: on ? TEAL : "#fff",
              color: on ? "#fff" : "#475569",
            }}>
              nums={JSON.stringify(c.nums)}, k={c.k}
              {c.id === "neg" && <span style={{ marginLeft: 6 }}>{t(E, "(negatives!)", "(음수!)")}</span>}
            </button>
          );
        })}
      </div>

      {/* nums 배열 — 모드 ① 에서 어떤 숫자를 더하는지 가리킨다 */}
      {mode === "prefix" && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 5 }}>nums</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
            {cur.nums.map((v, idx) => {
              const here = isStep && idx === step.i;
              const done = isStep && idx < step.i;
              return (
                <div key={idx} style={{
                  width: 44, height: 52, borderRadius: 8,
                  border: `2px solid ${here ? TEAL : done ? "#94a3b8" : "#e2e8f0"}`,
                  background: here ? TEAL_L : "#fff",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  transform: here ? "translateY(-4px)" : "none",
                  transition: "all .15s",
                }}>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>[{idx}]</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: here ? TEAL_D : done ? "#64748b" : "#334155" }}>{v}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 누적합 리스트 prefix — 두 모드 공통. 모드 ② 에선 훑는 위치/짝을 강조 */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 5 }}>
        prefix {t(E, "(the prefix-sum list)", "(누적합 리스트)")}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
        {prefixCells.map((v, idx) => {
          // 모드 ①: 방금 추가한 칸 강조. 모드 ②: 현재 훑는 칸(TEAL) / 짝으로 찾은 칸(초록)
          const justAdded = mode === "prefix" && isStep && idx === prefixCells.length - 1;
          const cursorHere = mode === "count" && isStep && idx === step.pi;
          const isPartner = mode === "count" && idx === partnerIdx;
          const future = mode === "count" && isStep && idx > step.pi;
          const border = cursorHere ? TEAL : isPartner ? OK_BD : justAdded ? TEAL : "#e2e8f0";
          const bg = cursorHere ? TEAL_L : isPartner ? OK_BG : justAdded ? TEAL_L : "#fff";
          return (
            <div key={idx} style={{
              width: 40, height: 48, borderRadius: 8,
              border: `2px solid ${border}`, background: bg,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              opacity: future ? 0.4 : 1,
              transform: cursorHere || justAdded ? "translateY(-4px)" : "none",
              transition: "all .15s",
            }}>
              <span style={{ fontSize: 9, color: "#94a3b8" }}>[{idx}]</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: isPartner ? OK : TEAL_D }}>{v}</span>
            </div>
          );
        })}
      </div>

      {/* 현재 스텝 계산 패널 */}
      <div style={{
        background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10,
        padding: "12px 14px", marginBottom: 12,
      }}>
        {step.phase === "init" ? (
          <div style={{ fontSize: 12.5, color: TEAL_D, lineHeight: 1.7 }}>
            <b>{t(E, "Start.", "시작.")}</b>{" "}
            {mode === "prefix"
              ? t(E,
                  "prefix is a list. It starts as [0] — the sum before adding anything (the empty prefix). We'll append one running sum per number.",
                  "prefix 는 리스트예요. [0] 으로 시작해요 — 아무것도 더하기 전의 합(빈 누적합)이에요. 숫자마다 누적합을 하나씩 뒤에 붙여 가요.")
              : py
                ? t(E,
                    "Now sweep the prefix list left to right. A subarray sum = prefix[r] − prefix[l], so we count pairs whose difference is k — using a dictionary seen to look up partners fast.",
                    "이제 누적합 리스트를 왼→오로 훑어요. 토막 합 = prefix[r] − prefix[l] 이니까, 차이가 k 인 쌍을 세면 돼요 — 딕셔너리 seen 으로 짝을 빠르게 찾으면서요.")
                : t(E,
                    "Now sweep the prefix list left to right. A subarray sum = prefix[r] − prefix[l], so we count pairs whose difference is k — using a map seen to look up partners fast.",
                    "이제 누적합 리스트를 왼→오로 훑어요. 토막 합 = prefix[r] − prefix[l] 이니까, 차이가 k 인 쌍을 세면 돼요 — 맵(map) seen 으로 짝을 빠르게 찾으면서요.")}
          </div>
        ) : mode === "prefix" ? (
          <div style={{ display: "grid", gap: 7 }}>
            <Row n="①" code={py
                   ? `prefix[-1] + nums[${step.i}] = ${step.prev} + ${step.x} = ${step.added}`
                   : `prefix[${step.i}] + nums[${step.i}] = ${step.prev} + ${step.x} = ${step.added}`}
                 desc={t(E, "the new running sum", "새 누적합")} E={E} />
            <Row n="②" code={py
                   ? `prefix.append(${step.added})`
                   : `prefix.push_back(${step.added})`}
                 desc={t(E, "tack it onto the list", "리스트 뒤에 붙이기")} E={E} />
          </div>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <Row n="①" code={`p = prefix[${step.pi}] = ${step.p}`}
                 desc={t(E, "current running sum", "지금 누적합 값")} E={E} />
            <Row n="②" code={`need = p − k = ${step.p} − ${cur.k} = ${step.need}`}
                 desc={t(E, "partner value we look for", "찾는 짝 값")} E={E} />
            <Row n="③" code={`seen[${step.need}] = ${step.found}`}
                 desc={step.found > 0
                   ? t(E, `found ${step.found} earlier → +${step.found}`, `앞에 ${step.found} 번 있음 → +${step.found}`)
                   : t(E, "not seen before → +0", "본 적 없음 → +0")}
                 ok={step.found > 0} no={step.found === 0} E={E} />
            <Row n="④" code={`seen[${step.p}] += 1`}
                 desc={t(E, "record this prefix value", "이 누적합 값을 기록")} E={E} />
          </div>
        )}
      </div>

      {/* seen 딕셔너리 + count — 모드 ② 에서만 */}
      {mode === "count" && (
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6 }}>
              seen {py
                ? t(E, "— a dictionary { prefix value : count }", "— 딕셔너리 { 누적합 값 : 횟수 }")
                : t(E, "— a map { prefix value : count }", "— 맵(map) { 누적합 값 : 횟수 }")}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", fontFamily: "monospace" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#94a3b8" }}>{"{"}</span>
              {seenEntries.length === 0 && <span style={{ fontSize: 12, color: "#94a3b8" }}>{t(E, "empty", "비어 있음")}</span>}
              {seenEntries.map(([key, val]) => (
                <DictEntry key={key} k={key} v={val} hot={String(step.hlKey) === key} />
              ))}
              <span style={{ fontSize: 22, fontWeight: 800, color: "#94a3b8" }}>{"}"}</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6 }}>count</div>
            <div style={{
              fontSize: 26, fontWeight: 900, fontFamily: "monospace",
              color: TEAL_D, background: "#fff", border: `2px solid ${TEAL}`,
              borderRadius: 10, padding: "2px 18px", minWidth: 56,
            }}>
              {step.count}
            </div>
          </div>
        </div>
      )}

      {/* 컨트롤 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={prev} disabled={si === 0} style={btn(si === 0)}>
          ◀ {t(E, "Prev", "이전")}
        </button>
        <button onClick={next} disabled={last} style={btn(last, true)}>
          {t(E, "Next step", "다음 스텝")} ▶
        </button>
        <button onClick={reset} style={{ ...btn(false), background: "#fff", color: "#64748b", border: "2px solid #cbd5e1" }}>
          ↺ {t(E, "Restart", "처음으로")}
        </button>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#94a3b8", fontFamily: "monospace" }}>
          {step.phase === "init" ? t(E, "start", "시작") : `${t(E, "step", "스텝")} ${si}`} / {totalSteps}
        </span>
      </div>

      {/* 마지막 스텝 — 모드별 마무리 배너 */}
      {last && mode === "prefix" && (
        <div style={{
          marginTop: 12, background: TEAL_L, border: `2px solid ${TEAL}`,
          borderRadius: 10, padding: "10px 14px", textAlign: "center",
          fontSize: 12.5, fontWeight: 700, color: TEAL_D, lineHeight: 1.6,
        }}>
          {t(E,
            "The prefix list is built. Now switch to ② Count the pairs to find slices whose two prefix sums differ by k.",
            "누적합 리스트 완성. 이제 ② 차이가 k 인 쌍 세기 로 바꿔서, 두 누적합의 차이가 k 인 토막을 찾아봐요.")}
        </div>
      )}
      {last && mode === "count" && (
        <div style={{
          marginTop: 12, background: OK_BG, border: `2px solid ${OK_BD}`,
          borderRadius: 10, padding: "10px 14px", textAlign: "center",
          fontSize: 13.5, fontWeight: 800, color: OK,
        }}>
          {t(E, `Answer = ${final}`, `정답 = ${final}`)}
          {caseId === "neg" && (
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "#15803d", marginTop: 4 }}>
              {t(E,
                "Prefix value 0 appeared twice in the list → seen[0] reached 2, so a later step added +2. Counting (not just yes/no) is what catches both.",
                "누적합 값 0 이 리스트에 두 번 나와서 seen[0] 이 2 가 됐고, 뒤에서 +2. '있다/없다' 가 아니라 '몇 번' 을 세야 둘 다 잡혀요.")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ n, code, desc, ok, no, E }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        flexShrink: 0, width: 20, height: 20, borderRadius: "50%",
        background: ok ? OK : no ? NO : TEAL, color: "#fff",
        fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
      }}>{n}</span>
      <code style={{
        fontFamily: "monospace", fontSize: 12.5, fontWeight: 700,
        color: ok ? OK : no ? NO : TEAL_D,
        background: ok ? OK_BG : no ? NO_BG : "#fff",
        border: `1px solid ${ok ? OK_BD : no ? NO_BD : "#bae6fd"}`,
        borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap",
      }}>{code}</code>
      <span style={{ fontSize: 11.5, color: "#475569" }}>{desc}</span>
    </div>
  );
}

function btn(disabled, primary) {
  return {
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    borderRadius: 8, padding: "8px 16px",
    fontSize: 12.5, fontWeight: 700,
    border: `2px solid ${primary ? TEAL : "#cbd5e1"}`,
    background: primary ? TEAL : "#fff",
    color: primary ? "#fff" : "#475569",
  };
}

/* ── 속도 체감 — brute(모든 쌍) vs 똑똑한 한 번 스캔 ──────────────
   슬라이더로 n 을 키우면 brute 막대가 2초 예산선을 훌쩍 넘는 걸 *눈으로* 봄. */
export function SpeedRaceSim({ E, nMax = 20000, nStart = 200, constraintN = 20000 }) {
  const [n, setN] = useState(nStart);
  const brute = (n * (n + 1)) / 2;   // ≈ n²/2 (모든 시작 × 끝)
  const fast = n;                    // 한 번 스캔
  const BUDGET = 2e8;                // ≈ 2초치 연산 (대략 1e8 연산/초)

  const fmt = (x) => {
    if (x < 1000) return String(Math.round(x));
    if (x < 1e6) return (x / 1e3).toFixed(x < 1e4 ? 1 : 0) + "K";
    if (x < 1e9) return (x / 1e6).toFixed(1) + "M";
    if (x < 1e12) return (x / 1e9).toFixed(1) + "B";
    return x.toExponential(1);
  };
  const human = (ops) => {
    const s = ops / 1e8;
    if (s < 0.001) return t(E, "instant", "즉시");
    if (s < 1) return (s * 1000).toFixed(0) + "ms";
    if (s < 60) return s.toFixed(1) + (E ? "s" : "초");
    if (s < 3600) return (s / 60).toFixed(1) + (E ? "min" : "분");
    return (s / 3600).toFixed(1) + (E ? "hr" : "시간");
  };
  const pct = (ops) => Math.min(100, (ops / BUDGET) * 100);
  const over = brute > BUDGET;

  const Bar = ({ label, ops, color, slow }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
        <span style={{ color: "#334155" }}>{label}</span>
        <span style={{ fontFamily: "monospace", color: slow ? NO : OK }}>
          {fmt(ops)} {t(E, "ops", "연산")} · {human(ops)}
        </span>
      </div>
      <div style={{ position: "relative", height: 24, background: "#f1f5f9", borderRadius: 6, overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <div style={{ width: `${pct(ops)}%`, height: "100%", background: color, transition: "width .12s", borderRadius: 5 }} />
        {slow && (
          <span style={{ position: "absolute", right: 8, top: 3, fontSize: 11, fontWeight: 800, color: "#fff" }}>
            {t(E, "OVER ❌", "초과 ❌")}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{t(E, "input size", "입력 크기")}</div>
        <div style={{ fontSize: 30, fontWeight: 900, fontFamily: "monospace", color: TEAL_D }}>
          n = {n.toLocaleString()}
        </div>
        <input type="range" min={nStart} max={nMax} step={Math.max(1, Math.round(nMax / 500))}
          value={n} onChange={(e) => setN(Number(e.target.value))}
          style={{ width: "80%", accentColor: TEAL, marginTop: 6 }} />
        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          {t(E, `drag · problem allows up to n = ${constraintN.toLocaleString()}`,
               `드래그 · 문제는 최대 n = ${constraintN.toLocaleString()} 까지`)}
        </div>
      </div>

      <Bar label={t(E, "Brute (every start × end)", "완전탐색 (모든 시작 × 끝)")} ops={brute} color={NO} slow={over} />
      <Bar label={t(E, "One smart pass", "똑똑한 한 번 스캔")} ops={fast} color={OK} slow={false} />

      <div style={{ marginTop: 6, fontSize: 11.5, color: "#475569", textAlign: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px" }}>
        {t(E,
          "Bars fill toward the ~2-second budget (≈2×10⁸ ops). Drag n up: brute shoots past it while the smart pass barely moves.",
          "막대는 약 2초 예산(≈2×10⁸ 연산)까지 차요. n 을 키워보면 — 완전탐색은 예산을 훌쩍 넘기고, 똑똑한 스캔은 거의 안 움직여요.")}
      </div>
    </div>
  );
}

/* ── 단계별 코드 (Python/C++ 토글) ───────────────────────────────
   sections: [{ label, color, py:[], cpp:[], why:[], pyOnly:[], cppOnly:[] }] */
export function CodeJourney({ E, sections, doneNote, fullCode }) {
  // Single source of truth: the header 🐍 Py / 💻 C++ toggle (shared via localStorage).
  const [lang] = useCodeLang();
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 10, textAlign: "right" }}>
        {t(E, "language: switch with 🐍 Py / 💻 C++ up top", "언어: 위쪽 🐍 Py / 💻 C++ 로 전환")}
      </div>

      {sections.map((sec, i) => {
        const bullets = [...(sec.why || []), ...(lang === "py" ? (sec.pyOnly || []) : (sec.cppOnly || []))];
        const col = sec.color || TEAL;
        return (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: "#fff", background: col, borderRadius: "8px 8px 0 0", padding: "5px 12px" }}>
              {sec.label}
            </div>
            <div style={{ border: `2px solid ${col}`, borderRadius: "0 8px 8px 8px", padding: 10, background: "#fff" }}>
              {bullets.length > 0 && (
                <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 12, color: "#374151", lineHeight: 1.65 }}>
                  {bullets.map((b, j) => (<li key={j} style={{ marginBottom: 3 }}>{b}</li>))}
                </ul>
              )}
              <CodeBlock lang={lang} lines={lang === "py" ? sec.py : sec.cpp} />
            </div>
          </div>
        );
      })}

      {fullCode && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: "#fff", background: TEAL_D, borderRadius: "8px 8px 0 0", padding: "5px 12px" }}>
            {t(E, "✓ Full solution", "✓ 전체 코드")}
          </div>
          <div style={{ border: `2px solid ${TEAL_D}`, borderRadius: "0 8px 8px 8px", padding: 10, background: "#fff" }}>
            <CodeBlock lang={lang} lines={lang === "py" ? fullCode.py : fullCode.cpp} />
          </div>
        </div>
      )}

      {doneNote && (
        <div style={{ background: OK_BG, border: `2px solid ${OK_BD}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: OK, textAlign: "center" }}>
          {doneNote}
        </div>
      )}
    </div>
  );
}
