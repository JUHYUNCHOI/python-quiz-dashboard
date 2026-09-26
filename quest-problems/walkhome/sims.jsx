// walkhome — DP 표를 집에서부터 거꾸로 채우는 과정 시뮬.
// 설계는 pedagogy·ux 판정으로 이미 확정됐다 (2026-09-26 지시). 여기서는 구현만 한다.
//
// ⛔ components.jsx 의 FULL_PY/FULL_CPP(🔒 USACO_VERIFIED)는 이 파일에서 import 하지 않는다 —
//    이 시뮬은 그 코드가 "무엇을 계산하는지" 를 코드 없이 손으로 먼저 보여주는 자리다.
//
// ⭐ 이번 라운드는 프리셋 A(2×2, K=1) 만. 3×3(B) 은 다음 라운드 — ux 지시대로 프리셋
//    선택기를 아예 넣지 않는다(옵션이 하나뿐인 선택기는 혼란만 준다).
//
// 왜 2×2 인가: 3쪽 퀴즈가 이미 "2x2 빈 격자, K=1 → 2개" 를 묻고 학생이 직접 답한다.
// 이 시뮬은 그 답 2 가 "어디서 나온 수인지" 를 표를 채우며 보여준다 — 같은 예제,
// 같은 숫자. CLAUDE.md 가 quest 를 닫기 전에 묻는 그 질문("인트로 시뮬 숫자와 코드
// 단계 숫자가 같은 예제로 맞아떨어지나")에 답하기 위한 장치다.

import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";           // 이 quest 의 공통 accent (components.jsx 와 동일)
const RIGHT = C.look;          // "#2563eb" — 오른쪽으로 가는 화살표 전용 색
const DOWN = C.carry;          // "#ea580c" — 아래로 가는 화살표 전용 색
const DONE = C.ok;             // "#16a34a" — 표를 다 채운 뒤 "정답 확정" 색

const KA = { wordBreak: "keep-all" };

/* ── 걸음 6개 — 집(2,2)에서부터 거꾸로 채운다. 좌표는 1부터 센다(코드의 0-index 와 다름).
   숫자는 전부 3쪽 퀴즈와 같은 예제(2×2, K=1, 답 2)를 그대로 쓴다.
   E 에 따라 문구가 갈리므로 컴포넌트 렌더 때마다 새로 만든다(모듈 top-level 상수로 두면
   언어가 하나로 고정된다 — check-bilingual-drift 가 잡는 바로 그 함정). ── */
function buildSteps(E) {
  return [
    {
      focus: [2, 2], filledThrough: [], activeArrows: [], ringNeighbors: [],
      msg: t(E,
        "Cells close to home are the ones we can be sure about FIRST. Let's start right at home, (2,2).",
        "집에서 가까운 칸부터 먼저 확실하게 알 수 있어요.\n집인 (2,2) 부터 시작해요."),
    },
    {
      focus: [2, 2], filledThrough: ["2,2"], activeArrows: [], ringNeighbors: [],
      msg: t(E,
        "We're already standing at home — that's exactly 1 way (just staying here). So (2,2) = 1.",
        "집엔 이미 서 있으니 '가는 길' 은 1가지예요 (그냥 거기 있는 것).\n그래서 (2,2) = 1."),
    },
    {
      focus: [2, 1], filledThrough: ["2,2", "2,1"], activeArrows: ["bottom-right"], ringNeighbors: [{ cell: [2, 2], color: RIGHT }],
      msg: t(E,
        "From (2,1), one step RIGHT reaches home. No direction change happened here, so the count is just carried over: 1.",
        "(2,1) 에서는 오른쪽으로 한 칸만 가면 집이에요.\n방향을 바꾸지 않았으니 값도 그대로 1이에요."),
    },
    {
      focus: [1, 2], filledThrough: ["2,2", "2,1", "1,2"], activeArrows: ["right-down"], ringNeighbors: [{ cell: [2, 2], color: DOWN }],
      msg: t(E,
        "From (1,2), one step DOWN reaches home. No direction change here either — still 1.",
        "(1,2) 에서는 아래로 한 칸만 가면 집이에요.\n여기도 방향을 바꾸지 않았어요 — 여전히 1."),
    },
    {
      focus: [1, 1], filledThrough: ["2,2", "2,1", "1,2", "1,1"],
      activeArrows: ["top-right", "left-down"],
      ringNeighbors: [{ cell: [1, 2], color: RIGHT }, { cell: [2, 1], color: DOWN }],
      msg: t(E,
        "The start cell (1,1) has two branches — right and down. Each branch changes direction exactly once. K = 1, so both are allowed.",
        "출발 칸 (1,1) 에는 두 갈래가 있어요 — 오른쪽과 아래.\n두 갈래 다 방향을 딱 한 번 바꿔요. K = 1 이니 둘 다 허용돼요."),
      breakdown: true,
    },
    {
      focus: [1, 1], filledThrough: ["2,2", "2,1", "1,2", "1,1"],
      activeArrows: ["top-right", "left-down"],
      ringNeighbors: [{ cell: [1, 2], color: RIGHT }, { cell: [2, 1], color: DOWN }],
      msg: t(E,
        "The table is filled. The answer is 2 — the same 2 you found on page 3!",
        "표를 다 채웠어요. 답은 2 — 3쪽에서 맞혔던 그 2 와 같아요!"),
      breakdown: true, done: true,
    },
  ];
}

function key(r, c) { return `${r},${c}`; }

function Cell({ r, c, value, isFocus, ringColor, isHome, isStart, done }) {
  const filled = value != null;
  let border = "2px dashed #d1d5db";
  if (isFocus) border = `3px solid ${done ? DONE : A}`;
  else if (ringColor) border = `2.5px solid ${ringColor}`;
  else if (filled) border = "2px solid #6ee7b7";

  return (
    <div style={{
      position: "relative", width: 60, height: 60, borderRadius: 10,
      background: filled ? "#fff" : "#f3f4f6",
      border, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "all 160ms", boxShadow: isFocus ? `0 0 0 3px ${(done ? DONE : A)}22` : "none",
    }}>
      <div style={{
        position: "absolute", top: 3, left: 5, fontSize: 9, color: "#9ca3af",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
      }}>({r},{c})</div>
      {(isHome || isStart) && (
        <div style={{ position: "absolute", top: 2, right: 4, fontSize: 12 }}>{isHome ? "🏠" : "⭐"}</div>
      )}
      <div style={{
        fontSize: 20, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        color: filled ? (isFocus ? (done ? DONE : A) : "#1f2937") : "#cbd5e1",
        marginTop: 4,
      }}>
        {filled ? value : "?"}
      </div>
    </div>
  );
}

function Arrow({ dir, active, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: dir === "h" ? 28 : 60, height: dir === "h" ? 60 : 28,
      fontSize: 17, fontWeight: 900, color: active ? color : "#d1d5db",
      transition: "color 160ms",
    }}>
      {dir === "h" ? "→" : "↓"}
    </div>
  );
}

/** WalkHomeDpFillSim — 2×2, K=1 을 손으로 채우는 6걸음 시뮬. */
export function WalkHomeDpFillSim({ E }) {
  const steps = buildSteps(E);
  const { safe, setIdx, total } = useTraceStep(steps.length);
  const cur = steps[safe];
  const filledSet = new Set(cur.filledThrough);
  const valueOf = (r, c) => {
    const k = key(r, c);
    if (!filledSet.has(k)) return null;
    if (r === 1 && c === 1) return 2;
    return 1;
  };
  const ringOf = (r, c) => {
    const hit = cur.ringNeighbors.find(n => n.cell[0] === r && n.cell[1] === c);
    return hit ? hit.color : null;
  };
  const isFocus = (r, c) => cur.focus[0] === r && cur.focus[1] === c;
  const active = (id) => cur.activeArrows.includes(id);

  return (
    <div style={{ padding: 16, ...KA }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
          🧮 {t(E, "Fill the table backward, from home", "표를 집에서부터 거꾸로 채워요")}
        </div>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 999,
            fontSize: 11, fontWeight: 800, color: "#6b7280", background: "#f1f5f9",
            fontFamily: "'JetBrains Mono',monospace",
          }}>2×2 · K = 1</span>
        </div>

        {/* 격자 3x3 — 칸 넷 + 화살표 넷 (가운데는 비움) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 28px 60px",
            gridTemplateRows: "60px 28px 60px",
            alignItems: "center", justifyItems: "center",
          }}>
            <Cell r={1} c={1} value={valueOf(1, 1)} isFocus={isFocus(1, 1)} ringColor={ringOf(1, 1)} isStart done={cur.done} />
            <Arrow dir="h" active={active("top-right")} color={RIGHT} />
            <Cell r={1} c={2} value={valueOf(1, 2)} isFocus={isFocus(1, 2)} ringColor={ringOf(1, 2)} done={cur.done} />

            <Arrow dir="v" active={active("left-down")} color={DOWN} />
            <div />
            <Arrow dir="v" active={active("right-down")} color={DOWN} />

            <Cell r={2} c={1} value={valueOf(2, 1)} isFocus={isFocus(2, 1)} ringColor={ringOf(2, 1)} done={cur.done} />
            <Arrow dir="h" active={active("bottom-right")} color={RIGHT} />
            <Cell r={2} c={2} value={valueOf(2, 2)} isFocus={isFocus(2, 2)} ringColor={ringOf(2, 2)} isHome done={cur.done} />
          </div>
        </div>

        {/* 색 범례 — 한 번만, 방향과 색의 뜻은 걸음 내내 안 바뀐다 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 10, fontSize: 11, color: "#6b7280", fontWeight: 700 }}>
          <span><span style={{ color: RIGHT }}>→</span> {t(E, "right", "오른쪽")}</span>
          <span><span style={{ color: DOWN }}>↓</span> {t(E, "down", "아래")}</span>
        </div>

        {/* 걸음 설명 — 지금 보는 칸 하나의 상태만 (4상태 표를 격자 위에 얹지 않는다) */}
        <div style={{
          background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 12px",
          fontSize: 12.5, lineHeight: 1.7, whiteSpace: "pre-line", textAlign: "center", ...KA,
        }}>
          {cur.msg}
          {cur.breakdown && (
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800 }}>
              <span style={{ color: RIGHT }}>1{t(E, "(right)", "(오른쪽)")}</span>
              {" + "}
              <span style={{ color: DOWN }}>1{t(E, "(down)", "(아래)")}</span>
              {" = "}
              <span style={{ color: cur.done ? DONE : "#fbbf24" }}>2</span>
            </div>
          )}
        </div>
        {cur.done && (
          <div style={{
            marginTop: 10, textAlign: "center", background: "#dcfce7", border: "1.5px solid #86efac",
            borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, color: "#065f46",
          }}>
            🎉 {t(E, "Answer: 2", "답: 2")}
          </div>
        )}

        {/* 2026-09-26 모바일 375px 실측: SimNav(4버튼, showLabels) + 끝까지 버튼을 한 줄로
            강제하면 화면 밖으로 넘친다("Restart" 앞글자가 잘림). flexWrap 으로 두 번째 줄로
            자연스럽게 내려가게 한다 — 고정 폭 계산 대신, 화면이 좁아지면 알아서 접힌다. */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 10, rowGap: 8, marginTop: 14 }}>
          <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
          {/* ⭐ 끝까지 건너뛰기 — mcc20citytour 의 Mcc20CityTourBfsProcessStepper 와 같은 자리·같은 용도.
              feedback_student_agent_must_quit: 패턴을 알면 그만두고 싶어 한다 — 나가는 문을 준다. */}
          <button
            onClick={() => setIdx(total - 1)}
            disabled={safe === total - 1}
            style={{
              padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
              border: `1.5px solid ${safe === total - 1 ? "#e5e7eb" : A}`,
              background: safe === total - 1 ? "#f8fafc" : "#fff",
              color: safe === total - 1 ? "#cbd5e1" : A,
              cursor: safe === total - 1 ? "default" : "pointer", whiteSpace: "nowrap",
            }}
          >{t(E, "Skip to the end", "끝까지")} ▶▶</button>
        </div>
      </div>
    </div>
  );
}
