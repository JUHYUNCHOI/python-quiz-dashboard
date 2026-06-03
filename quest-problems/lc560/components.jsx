import { useState } from "react";
import { t } from "@/components/quest/theme";

const TEAL   = "#0891b2";
const TEAL_L = "#e0f2fe";
const TEAL_D = "#0c4a6e";
const OK      = "#15803d";
const OK_BG   = "#f0fdf4";
const OK_BD   = "#86efac";
const NO      = "#b91c1c";
const NO_BG   = "#fef2f2";
const NO_BD   = "#fca5a5";

/* 한 케이스의 전체 추적(trace)을 미리 계산한다.
   순서가 핵심: 조회(seen[need]) → 기록(seen[prefix]+1). 이 순서가 바뀌면 답이 꼬인다. */
function buildTrace(nums, k) {
  const steps = [];
  let prefix = 0;
  let count = 0;
  const seen = { 0: 1 };

  steps.push({
    phase: "init",
    i: -1, x: null, prefix: 0, need: null, found: null, count: 0,
    seen: { ...seen },
    hlKey: null,
  });

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    prefix += x;                       // ① 누계 갱신
    const need = prefix - k;           // ② 짝(시작점 누계) 계산
    const found = seen[need] || 0;     // ③ 그 짝이 앞에 나온 횟수 조회
    count += found;
    seen[prefix] = (seen[prefix] || 0) + 1;  // ④ 지금 누계 기록(+1)
    steps.push({
      phase: "step",
      i, x, prefix, need, found, count,
      seen: { ...seen },
      hlKey: found > 0 ? need : null,   // 조회 성공 시 하이라이트할 key
    });
  }
  return steps;
}

const CASES = [
  { id: "basic", nums: [1, 1, 1], k: 2 },
  { id: "neg",   nums: [1, -1, 1], k: 1 },
];

function Chip({ label, value, hot, E }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      borderRadius: 8, padding: "4px 10px", minWidth: 38,
      background: hot ? OK_BG : "#fff",
      border: `2px solid ${hot ? OK_BD : "#e2e8f0"}`,
      boxShadow: hot ? `0 0 0 3px ${OK_BG}` : "none",
      transition: "all .15s",
    }}>
      <span style={{ fontSize: 10, color: hot ? OK : "#94a3b8", fontFamily: "monospace" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 800, color: hot ? OK : "#334155", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}

export function SubarraySumSim({ E }) {
  const [caseId, setCaseId] = useState("basic");
  const [si, setSi] = useState(0);

  const cur = CASES.find(c => c.id === caseId);
  const trace = buildTrace(cur.nums, cur.k);
  const step = trace[Math.min(si, trace.length - 1)];
  const last = si >= trace.length - 1;
  const final = trace[trace.length - 1].count;

  const pick = (id) => { setCaseId(id); setSi(0); };
  const next = () => setSi(s => Math.min(s + 1, trace.length - 1));
  const prev = () => setSi(s => Math.max(s - 1, 0));
  const reset = () => setSi(0);

  const seenEntries = Object.entries(step.seen).sort((a, b) => Number(a[0]) - Number(b[0]));
  const isStep = step.phase === "step";

  return (
    <div style={{ padding: 14, fontFamily: "inherit" }}>
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

      {/* 배열 + 현재 위치 포인터 */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14 }}>
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

      {/* 현재 스텝 계산 패널 */}
      <div style={{
        background: TEAL_L, border: `2px solid ${TEAL}`, borderRadius: 10,
        padding: "12px 14px", marginBottom: 12,
      }}>
        {step.phase === "init" ? (
          <div style={{ fontSize: 12.5, color: TEAL_D, lineHeight: 1.7 }}>
            <b>{t(E, "Start.", "시작.")}</b>{" "}
            {t(E,
              "Nothing added yet, so prefix = 0. We pre-record prefix 0 once in seen — this lets us catch subarrays that start at index 0.",
              "아직 아무것도 안 더했으니 누계 prefix = 0. 출석부 seen 에 누계 0 을 미리 1번 기록해 둬요 — 그래야 인덱스 0 부터 시작하는 구간을 잡을 수 있어요.")}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <Row n="①" code={`prefix += ${step.x}`}
                 desc={t(E, `running sum → ${step.prefix}`, `누계 → ${step.prefix}`)} E={E} />
            <Row n="②" code={`need = prefix − k = ${step.prefix} − ${cur.k} = ${step.need}`}
                 desc={t(E, "the partner start-sum we want", "찾고 싶은 짝(시작점 누계)")} E={E} />
            <Row n="③" code={`seen[${step.need}] = ${step.found}`}
                 desc={step.found > 0
                   ? t(E, `found! +${step.found} to count`, `있다! count 에 +${step.found}`)
                   : t(E, "not seen before → +0", "본 적 없음 → +0")}
                 ok={step.found > 0} no={step.found === 0} E={E} />
            <Row n="④" code={`seen[${step.prefix}] += 1`}
                 desc={t(E, "record current prefix", "지금 누계를 출석부에 기록")} E={E} />
          </div>
        )}
      </div>

      {/* seen 출석부 + count */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: "1 1 260px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6 }}>
            seen {t(E, "(prefix → count)", "(누계 → 횟수)")}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {seenEntries.map(([key, val]) => (
              <Chip key={key} label={key} value={val} hot={String(step.hlKey) === key} E={E} />
            ))}
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
          {step.phase === "init" ? t(E, "start", "시작") : `${t(E, "step", "스텝")} ${step.i + 1}`} / {cur.nums.length}
        </span>
      </div>

      {/* 마지막 스텝이면 정답 배너 */}
      {last && (
        <div style={{
          marginTop: 12, background: OK_BG, border: `2px solid ${OK_BD}`,
          borderRadius: 10, padding: "10px 14px", textAlign: "center",
          fontSize: 13.5, fontWeight: 800, color: OK,
        }}>
          {t(E, `Answer = ${final}`, `정답 = ${final}`)}
          {caseId === "neg" && (
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "#15803d", marginTop: 4 }}>
              {t(E,
                "Prefix 0 appeared twice → last step added +2. A boolean set would have missed one!",
                "누계 0 이 두 번 나와서 마지막에 +2. set(있다/없다)이었다면 하나를 놓쳤어요!")}
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
