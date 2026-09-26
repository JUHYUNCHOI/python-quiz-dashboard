// walkhome — DP 표를 집에서부터 거꾸로 채우는 과정 시뮬.
// 설계는 pedagogy·ux 판정으로 이미 확정됐다 (2026-09-26 지시). 여기서는 구현만 한다.
//
// ⛔ components.jsx 의 FULL_PY/FULL_CPP(🔒 USACO_VERIFIED)는 이 파일에서 import 하지 않는다 —
//    이 시뮬은 그 코드가 "무엇을 계산하는지" 를 코드 없이 손으로 먼저 보여주는 자리다.
//
// 왜 2×2 인가 (프리셋 A): 3쪽 퀴즈가 이미 "2x2 빈 격자, K=1 → 2개" 를 묻고 학생이 직접
// 답한다. 이 시뮬은 그 답 2 가 "어디서 나온 수인지" 를 표를 채우며 보여준다 — 같은 예제,
// 같은 숫자. CLAUDE.md 가 quest 를 닫기 전에 묻는 그 질문("인트로 시뮬 숫자와 코드
// 단계 숫자가 같은 예제로 맞아떨어지나")에 답하기 위한 장치다.
//
// ⭐ 프리셋 B(3×3, K=1) — 2026-09-26 추가. A(2×2)엔 없던 "오른쪽·아래 이웃을 둘 다
//    가진, 시작이 아닌 칸"(진짜 안쪽 칸)이 3×3부터 생긴다 — 그 칸에서 "이미 한 번 꺾은
//    채로 왔다면 또 꺾을 수 없다(K 초과)"가 처음 실제로 일어난다. 이게 B 를 만드는 이유다.
//    ⚠️ B 의 모든 값은 FULL_PY/FULL_CPP 의 dp[r][c][direction][changes] 재귀를 그대로
//    파이썬으로 옮겨 손으로 검증했다(스크래치패드, 이 커밋엔 없음) — 답 2 는 실제 경로
//    RRDD·DDRR 둘뿐이고, 정가운데 (2,2) 칸은 "이미 한 번 꺾었다면" 상태에서 정확히 0
//    이다(오른쪽으로 더 가도 (2,3)에서 또 꺾어야 해서 막히고, 아래로 꺾는 건 바로 막힘).

import { useEffect, useRef, useState } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";           // 이 quest 의 공통 accent (components.jsx 와 동일)
const RIGHT = C.look;          // "#2563eb" — 오른쪽으로 가는 화살표 전용 색
const DOWN = C.carry;          // "#ea580c" — 아래로 가는 화살표 전용 색
const DONE = C.ok;             // "#16a34a" — 표를 다 채운 뒤 "정답 확정" 색
const BLOCK = C.no;            // "#dc2626" — K 를 넘어서 "안 되는" 이동 전용 색 (프리셋 B)

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

/** blocked: K 를 넘어서 "그 이동은 안 된다" 는 뜻 — 빨강 + 취소선. active 보다 우선한다.
 *  (프리셋 A 는 blocked 를 절대 넘기지 않으므로 이 prop 을 추가해도 A 화면은 그대로다.) */
function Arrow({ dir, active, color, blocked }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: dir === "h" ? 28 : 60, height: dir === "h" ? 60 : 28,
      fontSize: 17, fontWeight: 900,
      color: blocked ? BLOCK : (active ? color : "#d1d5db"),
      textDecoration: blocked ? "line-through" : "none",
      transition: "color 160ms",
    }}>
      {dir === "h" ? "→" : "↓"}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   프리셋 B — 3×3, K = 1.
   ════════════════════════════════════════════════════════════════════════ */

/** 3×3, K=1 격자에서 실제로 쓰이는 아홉 칸의 값. 전부 FULL_PY 의 dp 재귀를 손으로
 *  대조해 나온 값이다 — (2,2) 의 "0" 은 "이 칸까지 오는 동안 이미 한 번 꺾은 경우"에만
 *  해당한다(그 상태가 실제 정답 계산에 쓰이는 유일한 경우라 이 시뮬에선 그 값만 보여준다). */
const VALUES_B = {
  "3,3": 1, "3,2": 1, "3,1": 1, "2,3": 1, "1,3": 1,
  "2,2": 0,
  "2,1": 1, "1,2": 1,
  "1,1": 2,
};

/* 6걸음 — home → (바깥 줄, 빠르게) → 진짜 안쪽 칸(꺾임 금지가 처음 일어남) →
   그 칸의 값 확정(0) → 안쪽 칸에 바로 붙은 두 칸(빠르게, 방금 배운 0 을 재사용) → 출발점. */
function buildStepsB(E) {
  return [
    {
      focus: [[3, 3]], filledThrough: ["3,3"],
      activeArrows: [], blockedArrows: [], ringNeighbors: [],
      msg: t(E,
        "3×3 works the same way. Start right at home, (3,3) — just standing there is exactly 1 way. So (3,3) = 1.",
        "3×3 도 똑같아요. 집인 (3,3) 부터 시작해요.\n거기 서 있는 것 자체가 1가지 방법이니, (3,3) = 1."),
    },
    {
      focus: [], filledThrough: ["3,3", "3,2", "3,1", "2,3", "1,3"],
      activeArrows: ["h-r3-c2", "h-r3-c1", "v-r1-c3", "v-r2-c3"], blockedArrows: [],
      ringNeighbors: [],
      msg: t(E,
        "The bottom-row and right-side cells are just like page A — only one direction is left, so with no turn the count carries straight over. All of them are 1.",
        "맨 아랫줄과 오른쪽 끝 칸들은 A 에서 본 것과 같아요.\n갈 수 있는 방향이 하나뿐이라, 방향을 안 바꾸면 그대로 이어져요 — 다 1."),
    },
    {
      focus: [[2, 2]], filledThrough: ["3,3", "3,2", "3,1", "2,3", "1,3"],
      activeArrows: ["h-r2-c2"], blockedArrows: ["v-r2-c2"],
      ringNeighbors: [{ cell: [2, 3], color: RIGHT }, { cell: [3, 2], color: DOWN }],
      msg: t(E,
        "Cell (2,2) has BOTH a right and a down neighbor — the first cell like this we've seen. Suppose you already used your one allowed turn to get here. Turning again to go down would be a SECOND turn — not allowed when K = 1.",
        "(2,2) 칸에는 오른쪽·아래 이웃이 둘 다 있어요 — 처음 보는 모양이에요.\n여기까지 오는 동안 이미 방향을 한 번 바꿨다고 해봐요.\n또 꺾어서 아래로 가면 두 번째로 바꾸는 거라, K = 1 을 넘어서 안 돼요."),
    },
    {
      focus: [[2, 2]], filledThrough: ["3,3", "3,2", "3,1", "2,3", "1,3", "2,2"],
      activeArrows: ["h-r2-c2"], blockedArrows: ["v-r2-c2"],
      ringNeighbors: [{ cell: [2, 3], color: RIGHT }, { cell: [3, 2], color: DOWN }],
      msg: t(E,
        "Going right is still allowed — but at (2,3) you'd need one more turn (down) to reach home, and that's blocked too. So having already turned once, (2,2) has 0 ways left.",
        "오른쪽으로 가는 건 괜찮지만, (2,3) 에서도 결국 아래로 한 번 더 꺾어야 집에 가는데\n그것도 안 돼요. 그래서 이미 한 번 꺾은 채로 (2,2) 에 왔다면 남은 방법은 0가지예요."),
      centerNote: true,
    },
    {
      focus: [[2, 1], [1, 2]], filledThrough: ["3,3", "3,2", "3,1", "2,3", "1,3", "2,2", "2,1", "1,2"],
      activeArrows: ["v-r2-c1", "h-r1-c2", "h-r2-c1", "v-r1-c2"], blockedArrows: [],
      ringNeighbors: [],
      msg: t(E,
        "Now (2,1) and (1,2) are quick. Going straight gives 1 (page A's rule), and turning into the center gives the 0 we just found. Added together, that's 1.",
        "이제 (2,1) 과 (1,2) 는 빨리 갈 수 있어요.\n곧장 가면 1(A 에서 본 규칙)이고, 가운데로 꺾으면 방금 구한 0이에요.\n둘을 더하면 1이에요."),
      centerNote: true,
    },
    {
      focus: [[1, 1]], filledThrough: ["3,3", "3,2", "3,1", "2,3", "1,3", "2,2", "2,1", "1,2", "1,1"],
      activeArrows: ["h-r1-c1", "v-r1-c1"], blockedArrows: [],
      ringNeighbors: [{ cell: [1, 2], color: RIGHT }, { cell: [2, 1], color: DOWN }],
      msg: t(E,
        "The start (1,1) has two branches — right and down. Neither has turned yet, so both are allowed. Add them up: 1 + 1 = 2 — the same answer as the 2×2 grid!",
        "출발 칸 (1,1) 에는 두 갈래가 있어요 — 오른쪽과 아래.\n아직 한 번도 안 꺾었으니 둘 다 허용돼요.\n더하면 1 + 1 = 2 — 2×2 때와 답이 같아요!"),
      breakdown: true, done: true,
    },
  ];
}

const PRESETS = [
  { key: "a", en: "2×2 (default)", ko: "2×2 (기본)" },
  { key: "b", en: "3×3 (extended)", ko: "3×3 (확장)" },
];

/** N×N 격자를 (2N-1)×(2N-1) CSS grid 로 그린다 — 칸 사이 화살표까지 한 번에.
 *  화살표 id: 가로 "h-r{행}-c{열}" = (행,열)→(행,열+1), 세로 "v-r{행}-c{열}" = (행,열)→(행+1,열).
 *  (행,열은 1부터 센다 — 코드의 0-index 와 다르다, 위 buildSteps 와 동일한 관례.) */
function GridN({ N, valueOf, ringOf, isFocus, activeSet, blockedSet, done }) {
  const track = Array.from({ length: 2 * N - 1 }, (_, i) => (i % 2 === 0 ? "60px" : "28px")).join(" ");
  const items = [];
  for (let gr = 1; gr <= 2 * N - 1; gr++) {
    for (let gc = 1; gc <= 2 * N - 1; gc++) {
      const cellRow = gr % 2 === 1, cellCol = gc % 2 === 1;
      if (cellRow && cellCol) {
        const r = (gr + 1) / 2, c = (gc + 1) / 2;
        items.push(
          <div key={`c${gr}-${gc}`} style={{ gridRow: gr, gridColumn: gc }}>
            <Cell r={r} c={c} value={valueOf(r, c)} isFocus={isFocus(r, c)} ringColor={ringOf(r, c)}
              isHome={r === N && c === N} isStart={r === 1 && c === 1} done={done} />
          </div>
        );
      } else if (cellRow && !cellCol) {
        const r = (gr + 1) / 2, cLeft = gc / 2;
        const id = `h-r${r}-c${cLeft}`;
        items.push(<div key={id} style={{ gridRow: gr, gridColumn: gc }}>
          <Arrow dir="h" active={activeSet.has(id)} blocked={blockedSet.has(id)} color={RIGHT} />
        </div>);
      } else if (!cellRow && cellCol) {
        const rTop = gr / 2, c = (gc + 1) / 2;
        const id = `v-r${rTop}-c${c}`;
        items.push(<div key={id} style={{ gridRow: gr, gridColumn: gc }}>
          <Arrow dir="v" active={activeSet.has(id)} blocked={blockedSet.has(id)} color={DOWN} />
        </div>);
      } else {
        items.push(<div key={`e${gr}-${gc}`} style={{ gridRow: gr, gridColumn: gc }} />);
      }
    }
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: track, gridTemplateRows: track, alignItems: "center", justifyItems: "center" }}>
      {items}
    </div>
  );
}

/** WalkHomeDpFillSim — DP 표를 손으로 채우는 시뮬. 프리셋 A(2×2, 기본)와
 *  B(3×3, 확장)를 고를 수 있다. A 는 원래 화면(6걸음)을 한 글자도 안 바꿨다. */
export function WalkHomeDpFillSim({ E }) {
  const [presetKey, setPresetKey] = useState("a");
  const isB = presetKey === "b";
  const steps = isB ? buildStepsB(E) : buildSteps(E);
  const { safe, setIdx, total } = useTraceStep(steps.length);
  /* 프리셋을 바꾸면 항상 그 프리셋의 1걸음부터 — 이전 프리셋의 인덱스를 들고 가면
     걸음 번호는 남아 있는데 내용은 딴판이 되어 혼란을 준다 (mcc20citytour 와 동일 관례). */
  const choosePreset = (k) => { setPresetKey(k); setIdx(0); };

  /* 버튼 줄이 고정 바에 묻히면 그만큼만 스크롤을 내려 준다. (근거는 아래 JSX 주석) */
  const navRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const row = navRef.current;
    if (!row) return;
    const bar = document.querySelector(".quest-navbar");
    if (!bar) return;
    const rowBottom = row.getBoundingClientRect().bottom;
    const barTop = bar.getBoundingClientRect().top;
    const hidden = rowBottom - barTop;
    if (hidden > 0) window.scrollBy({ top: hidden + 12, behavior: "smooth" });
  }, [safe, presetKey]);
  const cur = steps[safe];
  const filledSet = new Set(cur.filledThrough);
  /* focus 는 A 에서 [r,c] 한 쌍, B 에서 [[r,c], ...] 여러 쌍(예: 5걸음이 칸 둘을 동시에
     다룬다) — 둘 다 받아준다. */
  const isFocus = (r, c) => {
    const foc = cur.focus;
    if (Array.isArray(foc[0])) return foc.some(([fr, fc]) => fr === r && fc === c);
    return foc[0] === r && foc[1] === c;
  };
  const valueOf = (r, c) => {
    const k = key(r, c);
    if (!filledSet.has(k)) return null;
    if (isB) return VALUES_B[k];
    return (r === 1 && c === 1) ? 2 : 1;
  };
  const ringOf = (r, c) => {
    const hit = cur.ringNeighbors.find(n => n.cell[0] === r && n.cell[1] === c);
    return hit ? hit.color : null;
  };
  const active = (id) => cur.activeArrows.includes(id);
  const activeSet = new Set(cur.activeArrows);
  const blockedSet = new Set(cur.blockedArrows || []);

  return (
    <div style={{ padding: 16, ...KA }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
          🧮 {t(E, "Fill the table backward, from home", "표를 집에서부터 거꾸로 채워요")}
        </div>

        {/* 프리셋 선택기 — mcc20citytour 의 BFS_PRESETS 와 같은 모양(작은 사각 버튼).
            하단 고정 SimNav(알약형)와 모양이 갈려 있어 헷갈리지 않는다. */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button key={p.key} onClick={() => choosePreset(p.key)} style={{
              padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
              border: `1.5px solid ${presetKey === p.key ? A : "#c4b5fd"}`,
              background: presetKey === p.key ? A : "#fff",
              color: presetKey === p.key ? "#fff" : "#5b21b6",
              cursor: "pointer",
            }}>{t(E, p.en, p.ko)}</button>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 999,
            fontSize: 11, fontWeight: 800, color: "#6b7280", background: "#f1f5f9",
            fontFamily: "'JetBrains Mono',monospace",
          }}>{isB ? "3×3 · K = 1" : "2×2 · K = 1"}</span>
        </div>

        {!isB && (
          /* 격자 3x3 — 칸 넷 + 화살표 넷 (가운데는 비움). 프리셋 A, 손대지 않았다. */
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
        )}

        {isB && (
          /* 격자 3x3 — GridN 이 칸 아홉 + 화살표 열둘을 한 번에 그린다. */
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <GridN N={3} valueOf={valueOf} ringOf={ringOf} isFocus={isFocus}
              activeSet={activeSet} blockedSet={blockedSet} done={cur.done} />
          </div>
        )}

        {/* 색 범례 — 한 번만, 방향과 색의 뜻은 걸음 내내 안 바뀐다 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 10, fontSize: 11, color: "#6b7280", fontWeight: 700, flexWrap: "wrap" }}>
          <span><span style={{ color: RIGHT }}>→</span> {t(E, "right", "오른쪽")}</span>
          <span><span style={{ color: DOWN }}>↓</span> {t(E, "down", "아래")}</span>
          {isB && (
            <span><span style={{ color: BLOCK, textDecoration: "line-through" }}>→</span> {t(E, "over K, not allowed", "K 넘음, 안 됨")}</span>
          )}
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

        {/* B 전용 각주 — (2,2) 의 값은 "이미 한 번 꺾은 채로 왔을 때" 에만 해당한다.
            같은 숫자가 다른 뜻으로 보이지 않도록, 채워진 뒤 걸음 내내 붙여 둔다
            (feedback_same_number_two_meanings). */}
        {isB && filledSet.has("2,2") && (
          <div style={{ marginTop: 8, fontSize: 11, color: "#7c3aed", textAlign: "center", ...KA }}>
            {t(E, "★ (2,2) = 0 only for \"already turned once\" — not every visit to (2,2).",
                "★ (2,2) 의 0 은 «이미 한 번 꺾은 채로 왔을 때» 만의 값이에요.")}
          </div>
        )}

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
        {/* ⭐ 2026-09-26 ux 재검토가 잡은 것 — **마지막 걸음(6/6)에서 이 버튼 줄이
            화면 하단 고정 바에 묻힌다.** 실측: 버튼 줄 top=760·bottom=792 인데
            고정 바(`.quest-navbar`)가 top=744·bottom=812 이고 배경이 **불투명**이다.
            클릭 자체는 통과한다(바 컨테이너가 `pointer-events:none`) — 그래서
            「눌러도 안 먹는다」는 아니다. 하지만 **버튼이 안 보인다.**
            왜 마지막 걸음만인가: 그 걸음에만 공식 줄과 초록 「답: 2」 띠가 더 붙어서
            카드가 길어진다. 걸음이 넘어갈 때 `useTraceStep` 은 스크롤을 안 건드리니,
            스크롤 0 인 채로 6까지 누르면 버튼 줄이 딱 그 자리에 온다.
            ⚠️ 아래 여백을 늘리는 걸로는 **안 고쳐진다** — 버튼 줄 자체가 안 올라간다.
            그래서 **가려졌을 때만** 그만큼 스크롤을 밀어 준다. 안 가려졌으면 아무것도 안 한다
            (학생이 잡아 둔 스크롤을 함부로 흔들지 않는다). */}
        <div ref={navRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 10, rowGap: 8, marginTop: 14 }}>
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
