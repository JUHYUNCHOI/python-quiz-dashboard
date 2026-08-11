// Mobile Game (MCC 2023 P2) 용 시뮬 — components.jsx 는 안 건드리고 여기에만
// (cowsplits / chipxchg / photoshoot25 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리(해요체): "누굴 먹지?", "오 커졌다!", "막혔네…"
//   · 관찰 → 추론 — "매번 가장 큰 적을 먹는다(그리디)"를 *보며* 발견, 통보 X
//   · 흐름: Alice 파워 ↑ / 먹을 수 있는 적 ↑ → 가장 큰 놈부터 → 목표 도달 or 막힘(-1)

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#d97706";                          // quest accent (amber)
const HERO = "#d97706", HEROBG = "#fffbeb";
const KILLABLE = "#f59e0b";                   // 먹을 수 있는 적 강조
const ATE = "#16a34a";                        // 방금 먹은 적
const GOAL = "#dc2626";                        // 목표선

/* 적 파워 칩 */
function Tile({ val, size = 46, state = "idle" }) {
  // state: idle | killable | active | gone
  const cfg = {
    idle:     { bg: "#fff",    bd: "#e2e8f0", fg: "#1f2937", op: 1,   dash: false },
    killable: { bg: "#fffbeb", bd: KILLABLE,  fg: "#92400e", op: 1,   dash: false },
    active:   { bg: ATE,       bd: ATE,       fg: "#fff",    op: 1,   dash: false },
    gone:     { bg: "transparent", bd: "#cbd5e1", fg: "#94a3b8", op: 0.35, dash: true },
  }[state];
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 10, background: cfg.bg, border: `2px ${cfg.dash ? "dashed" : "solid"} ${cfg.bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.42, color: cfg.fg,
      opacity: cfg.op, transition: "all .15s" }}>
      {val}
    </div>
  );
}

/* 학생 목소리 말풍선 (초록 = 진행/발견, 노랑 = 막힘) */
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" }
          : { bg: "#fffbeb", bd: "#fcd34d", fg: "#92400e" };
  return (
    <div style={{ maxWidth: 560, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, flexWrap: "wrap" }}>{children}</div>;
}
function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 12, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{children}</div>;
}

/* Alice 파워 표시 (목표 대비) */
function HeroPower({ E, cur, goal, from = null, ate = null }) {
  const reached = cur >= goal;
  return (
    <div style={{ maxWidth: 340, margin: "0 auto 14px", background: "linear-gradient(135deg,#1f2937,#111827)",
      border: `2px solid ${reached ? ATE : HERO}`, borderRadius: 14, padding: "10px 16px", textAlign: "center",
      boxShadow: "0 4px 14px rgba(217,119,6,.18)" }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#fcd34d", letterSpacing: 0.6 }}>
        🦸 {t(E, "ALICE'S POWER", "Alice 파워")}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: reached ? "#4ade80" : "#fbbf24",
        fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.15, marginTop: 2 }}>
        {cur}{reached ? " ✓" : ""}
      </div>
      {from != null && ate != null && (
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1, fontFamily: "'JetBrains Mono',monospace" }}>
          {from} + {ate} = {cur}
        </div>
      )}
      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
        {t(E, "goal", "목표")} <b style={{ color: reached ? "#4ade80" : "#f87171" }}>{goal}</b>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MobileSim — 그리디 실행. 먹을 수 있는(파워 미만) 적 중 가장 큰 놈부터.
   메인 예: A=3, B=10, 적 [1,2,3,4,4] → 3처치. + 불가능 예 → -1.
   ═══════════════════════════════════════════════════════════════ */
export function MobileSim({ E }) {
  const MAIN = [1, 2, 3, 4, 4];      // 파워 오름차순 (idx 로 개별 식별)
  const IMP = [19, 70, 86];
  const B_MAIN = 10, B_IMP = 100;

  // 각 스텝 스냅샷 (하드코딩 — 그리디 정답 흐름 그대로)
  const steps = [
    { k: "intro", ds: "main", cur: 3,  killed: [],        active: null },
    { k: "eat",   ds: "main", cur: 5,  killed: [1],       active: 1, from: 3, ate: 2, kills: 1 },
    { k: "eat",   ds: "main", cur: 9,  killed: [1, 4],    active: 4, from: 5, ate: 4, kills: 2 },
    { k: "eat",   ds: "main", cur: 13, killed: [1, 4, 3], active: 3, from: 9, ate: 4, kills: 3, reached: true },
    { k: "done",  ds: "main", cur: 13, killed: [1, 3, 4], active: null, kills: 3 },
    { k: "imp",   ds: "imp",  cur: 39, killed: [0],       active: 0, from: 20, ate: 19 },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const enemies = s.ds === "main" ? MAIN : IMP;
  const goal = s.ds === "main" ? B_MAIN : B_IMP;

  const say =
    s.k === "intro" ? t(E,
      <>Alice's power is <b>3</b>, the goal is <b>10</b>. Rule: she can only beat an enemy <b>weaker than her</b>, and eating it <b>adds that power</b>. To use the <b>fewest</b> kills — eat the <b>biggest</b> enemy she can!</>,
      <>Alice 파워는 <b>3</b>, 목표는 <b>10</b>. 규칙: 지금 파워보다 <b>작은</b> 적만 처치할 수 있고, 먹으면 <b>그 파워만큼</b> 커져요. 처치 수를 <b>가장 적게</b> 하려면 — 먹을 수 있는 적 중 <b>가장 큰 놈</b>부터!</>)
    : s.k === "eat" && s.kills === 1 ? t(E,
      <>Beatable now (power &lt; 3): <b>1, 2</b>. Eat the biggest, <b>2</b> → power <b>3 + 2 = 5</b>. (1 kill)</>,
      <>지금 먹을 수 있는 적(파워 3 미만): <b>1, 2</b>. 가장 큰 <b>2</b>를 먹어요 → 파워 <b>3 + 2 = 5</b>. (1처치)</>)
    : s.k === "eat" && s.kills === 2 ? t(E,
      <>Power is <b>5</b> now — <b>3, 4, 4</b> are beatable too. Eat the biggest <b>4</b> → <b>5 + 4 = 9</b>. (2 kills)</>,
      <>이제 파워 <b>5</b> — <b>3, 4, 4</b>도 먹을 수 있어요. 가장 큰 <b>4</b> → <b>5 + 4 = 9</b>. (2처치)</>)
    : s.k === "eat" && s.kills === 3 ? t(E,
      <>Power <b>9</b>. Eat the last <b>4</b> → <b>9 + 4 = 13 ≥ 10</b> ✓ Goal reached! (3 kills)</>,
      <>파워 <b>9</b>. 남은 <b>4</b>를 먹어요 → <b>9 + 4 = 13 ≥ 10</b> ✓ 목표 도달! (3처치)</>)
    : s.k === "done" ? t(E,
      <>Just <b>3 kills</b> to reach the goal → answer <b>3</b>. Since power never drops, always eating the biggest beatable enemy is the fewest kills. 🎉</>,
      <><b>3처치</b> 만에 목표 도달 → 답 <b>3</b>. 파워는 절대 줄지 않으니, 매번 가장 큰 적을 먹는 게 최소 횟수예요. 🎉</>)
    : t(E,
      <>New case: power <b>20</b>, goal <b>100</b>, enemies <b>[19, 70, 86]</b>. Only <b>19</b> is beatable → <b>20 + 19 = 39</b>. But <b>70, 86</b> are still bigger than 39 → stuck. Answer = <b>-1</b>.</>,
      <>이번엔 파워 <b>20</b>, 목표 <b>100</b>, 적 <b>[19, 70, 86]</b>. <b>19</b>만 먹을 수 있어 → <b>20 + 19 = 39</b>. 근데 <b>70, 86</b>은 여전히 39보다 커서 못 먹어요 → 막힘. 답 = <b>-1</b>.</>);

  const tone = s.k === "done" || (s.k === "eat" && s.reached) ? "aha" : s.k === "imp" ? "stuck" : "go";

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={s.k === "imp" ? t(E, "When it's impossible → -1", "불가능하면 → -1")
                             : t(E, "Eat the biggest beatable enemy", "먹을 수 있는 가장 큰 적부터")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={tone}>{say}</Say>

      <HeroPower E={E} cur={s.cur} goal={goal} from={s.from ?? null} ate={s.ate ?? null} />

      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "enemies (sorted by power)", "적 (파워 오름차순)")}
      </div>
      <Row>
        {enemies.map((val, i) => {
          const isGone = s.killed.includes(i);
          const isActive = s.active === i;
          // 먹을 수 있는(파워 < 현재) & 아직 안 먹은 적 강조
          const isKillable = !isGone && val < s.cur;
          const state = isActive ? "active" : isGone ? "gone" : isKillable ? "killable" : "idle";
          return <Tile key={i} val={val} state={state} />;
        })}
      </Row>

      {s.k === "eat" && (
        <Caption color={s.reached ? ATE : KILLABLE}>
          {s.from} + {s.ate} = {s.cur} {s.reached ? `≥ ${goal} ✓` : ""}
        </Caption>
      )}
      {s.k === "done" && (
        <Caption color={ATE}>{t(E, "kills = 3  →  answer 3", "처치 = 3  →  답 3")}</Caption>
      )}
      {s.k === "imp" && (
        <Caption color={GOAL}>{t(E, "70, 86 ≥ 39 → can't beat → -1", "70, 86 ≥ 39 → 못 먹음 → -1")}</Caption>
      )}

      <div style={{ maxWidth: 520, margin: "16px auto 0", fontSize: 10.5, color: "#94a3b8", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "(Beat only enemies strictly weaker than you. Each enemy once. If you can never reach the goal → -1.)",
             "(자기보다 파워가 딱 작은 적만, 각 적은 한 번씩. 목표에 절대 못 닿으면 → -1.)")}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
