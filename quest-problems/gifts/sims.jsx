// Gifts (MCC 2024 P2) 시뮬 — 🔒 아닌 파일이지만 옛 시뮬(N/K 슬라이더)이 다른
// 문제 것이라 새로 만들었다. 이 문제의 핵심은 딱 하나:
//   "티어로 줄을 세우고, 같은 티어면 먼저 온 사람이 앞. 앞에서 m 명만 받는다."
// 그래서 줄이 서는 장면과 선물이 떨어지는 지점을 보여주면 끝난다.

import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#d946ef";

/* ═══════════════════════════════════════════════════════════════
   GiftQueueSim — 공식 샘플(n=8, m=6) 그대로.
   ① 원래 순서 → ② 티어로 줄 세우기 → ③ 앞에서부터 한 명씩 선물
   같은 티어(5)인 손님 5·8 에서 갈리는 순간이 이 문제의 전부.
   ═══════════════════════════════════════════════════════════════ */
export function GiftQueueSim({ E }) {
  const n = 8, m = 6;
  const tier = [3, 1, 4, 1, 5, 9, 2, 5];          // 손님 1..8 의 티어

  // 코드와 같은 방식: (티어, 번호) 로 줄 세우기
  const order = [...Array(n).keys()].sort((a, b) => tier[a] - tier[b] || a - b);

  const steps = [{ kind: "raw" }, { kind: "lined" }];
  for (let k = 0; k < n; k++) {
    steps.push({ kind: "give", k, guest: order[k], got: k < m, left: Math.max(0, m - k) });
  }
  steps.push({ kind: "final" });

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 지금까지 선물 받은 사람
  const given = new Set();
  if (s.kind === "give") order.slice(0, Math.min(s.k + (s.got ? 1 : 0), m)).forEach(g => given.add(g));
  if (s.kind === "final") order.slice(0, m).forEach(g => given.add(g));

  const lined = s.kind !== "raw";
  const row = lined ? order : [...Array(n).keys()];

  const Card = ({ g, pos }) => {
    const cur = s.kind === "give" && s.k === pos;
    const has = given.has(g);
    const done = s.kind === "give" && pos < s.k;
    const missed = (s.kind === "give" && pos <= s.k && !has && lined) || (s.kind === "final" && !has);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{ fontSize: 15, height: 18 }}>{has ? "🎁" : missed ? "✗" : ""}</div>
        <div style={{
          width: 40, height: 44, borderRadius: 8, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", lineHeight: 1.15,
          background: cur ? "#fae8ff" : has ? "#f0fdf4" : missed ? "#fef2f2" : "#fff",
          border: `${cur ? 2 : 1.5}px solid ${cur ? A : has ? "#86efac" : missed ? "#fca5a5" : "#e2e8f0"}`,
          transform: cur ? "scale(1.08)" : "none",
          boxShadow: cur ? `0 0 0 3px ${A}33` : "none",
          transition: "all .15s",
        }}>
          <div style={{ fontSize: 9.5, color: C.dim, fontWeight: 700 }}>
            {t(E, "guest", "손님")} {g + 1}
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#a21caf", fontFamily: "'JetBrains Mono',monospace" }}>
            {tier[g]}
          </div>
        </div>
      </div>
    );
  };

  const bubble = (() => {
    if (s.kind === "raw") return t(E,
      <>8 guests, only <b>6</b> gifts. The number on each card is that guest's <b>tier</b>.</>,
      <>손님 8 명인데 선물은 <b>6</b> 개뿐. 카드의 숫자가 그 손님의 <b>티어</b> 예요.</>);
    if (s.kind === "lined") return t(E,
      <>Line them up: <b>lower tier first</b>, and if the tier ties, <b>whoever came earlier</b>.</>,
      <>줄을 세워요: <b>티어가 낮은 사람 먼저</b>, 티어가 같으면 <b>먼저 온 사람</b> 먼저.</>);
    if (s.kind === "give") {
      const g = s.guest + 1;
      return s.got
        ? t(E, <>guest {g} (tier {tier[s.guest]}) gets one — <b>{s.left - 1}</b> gifts left</>,
              <>손님 {g} (티어 {tier[s.guest]}) 받았어요 — 남은 선물 <b>{s.left - 1}</b>개</>)
        : t(E, <>guest {g} (tier {tier[s.guest]}) — <b>no gifts left</b></>,
              <>손님 {g} (티어 {tier[s.guest]}) — <b>선물이 없어요</b></>);
    }
    return t(E,
      <>Print in the <b>original</b> guest order — not the queue order.</>,
      <>출력은 줄 순서가 아니라 <b>원래 손님 번호 순</b> 이에요.</>);
  })();

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, `${n} guests, ${m} gifts`, `손님 ${n} 명, 선물 ${m} 개`)}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      {/* 말풍선 — 스텝마다 줄 수가 달라 흔들리므로 가장 긴 경우에 맞춰 자리를 잡는다. */}
      <div style={{
        maxWidth: 440, margin: "0 auto 14px", padding: "9px 13px", borderRadius: 10,
        background: "#fdf4ff", border: `1.5px solid #f0abfc`, color: "#86198f",
        fontSize: 12, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6,
        minHeight: 62, display: "flex", alignItems: "center", justifyContent: "center",
      }}>{bubble}</div>

      {/* 줄 */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 6 }}>
        {row.map((g, pos) => <Card key={g} g={g} pos={pos} />)}
      </div>
      <div style={{ textAlign: "center", fontSize: 10.5, color: C.dim, marginBottom: 14 }}>
        {lined
          ? t(E, "lined up by (tier, arrival)", "(티어, 도착 순) 으로 줄 선 상태")
          : t(E, "original guest order", "원래 손님 번호 순")}
      </div>

      {/* 결과 줄 — 원래 번호 순 0/1.
          ⚠️ 3 스텝째에 갑자기 생기면 화면이 90px 커진다 (mooin3 에서 겪은 그 문제).
             자리는 처음부터 잡아두고 내용만 나중에 채운다. */}
      <div style={{
        maxWidth: 440, margin: "0 auto 12px", padding: "9px 13px", borderRadius: 10,
        background: "#f8fafc", border: "1px solid #e2e8f0",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, textAlign: "center", color: "#334155",
        opacity: (s.kind === "final" || s.kind === "give") ? 1 : 0.45,
      }}>
        <div style={{ fontSize: 10, color: C.dim, marginBottom: 3 }}>
          {t(E, "output (guest 1 … 8)", "출력 (손님 1 … 8)")}
        </div>
        {[...Array(n).keys()].map(i => (
          <span key={i} style={{
            margin: "0 4px", fontWeight: 800,
            color: given.has(i) ? "#15803d" : "#94a3b8",
          }}>{(s.kind === "final" || s.kind === "give") ? (given.has(i) ? 1 : 0) : "·"}</span>
        ))}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
