import { useState, useMemo, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";
const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ───────────────── Height-reachability concept sim ─────────────────
   Each cell is a building HEIGHT. Fluffy hops to a neighbor only when
   |height difference| < D. Change D and watch the reachable region
   (green) flood-fill out from the start (1,1) grow or shrink.
   The point: the edge rule is about the DIFFERENCE to a neighbor,
   not the height itself — so adjacency is dynamic, set by D.
   ─────────────────────────────────────────────────────────────────── */
// The official 4×5 sample grid — at D = 5 exactly 18 cells are reachable.
const SIM_H = [
  [1, 3, 7, 9, 16],
  [6, 2, 4, 1, 8],
  [8, 9, 10, 12, 14],
  [7, 5, 1, 4, 11],
];

function reachableMask(H, D) {
  const R = H.length, Cn = H[0].length;
  const vis = Array.from({ length: R }, () => Array(Cn).fill(false));
  vis[0][0] = true;
  const q = [[0, 0]];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < Cn && !vis[nr][nc] &&
          Math.abs(H[nr][nc] - H[r][c]) < D) {
        vis[nr][nc] = true;
        q.push([nr, nc]);
      }
    }
  }
  return vis;
}

export function Mcc20CityTourBfsSim({ E }) {
  /* ⭐ 2026-09-26: 기본값이 **정확히 샘플의 D(5)** 였다. 앞 쪽(1-2)이
     "칸은 20 개인데 답은 18 이에요. 어느 두 칸이 막힌 걸까요?" 라고 물어 놓고
     이 쪽을 열면 손대기도 전에 18/20 과 회색 두 칸이 이미 떠 있었다
     (touched 게이트는 마지막 문단만 가렸다). 3 으로 시작한다 — 4/20 이라
     답이 아니고, 바로 다음 쪽 퀴즈가 쓰는 D 와도 같다. */
  const [D, setD] = useState(3);
  const [touched, setTouched] = useState(false);
  const vis = useMemo(() => reachableMask(SIM_H, D), [D]);
  const R = SIM_H.length, Cn = SIM_H[0].length;
  const count = vis.flat().filter(Boolean).length;

  const cellStyle = (r, c) => {
    const on = vis[r][c];
    const isStart = r === 0 && c === 0;
    return {
      width: 46, height: 46, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 1,
      background: on ? "#d1fae5" : "#f3f4f6",
      border: isStart ? "2.5px solid #059669" : on ? "2px solid #6ee7b7" : "2px solid #e5e7eb",
      borderRadius: 8, color: on ? "#065f46" : "#9ca3af",
      fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 14,
      transition: "background 160ms, border-color 160ms",
    };
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🐰 {t(E, "Where can Fluffy reach?", "Fluffy 는 어디까지 갈 수 있을까요?")}
        </div>
        {/* 2026-09-17: 100자가 줄바꿈 없이 한 덩어리였다. 절 단위로 끊는다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12,
          whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "Each cell shows a building HEIGHT.\nFluffy hops to a neighbor only when the height DIFFERENCE is less than D.\nChange D and watch the green region grow or shrink from the start 🐰.",
            "각 칸은 건물 높이예요.\nFluffy 는 이웃과의 높이 차이가 D 보다 작을 때만 건너가요.\nD 를 바꿔서 시작 🐰 에서 갈 수 있는 곳(초록)이\n어떻게 달라지는지 봐요.")}
        </div>

        {/* D stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 700 }}>D =</span>
          <button onClick={() => { setTouched(true); setD(Math.max(1, D - 1)); }} style={dBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: A, minWidth: 22, textAlign: "center" }}>{D}</span>
          <button onClick={() => { setTouched(true); setD(Math.min(16, D + 1)); }} style={dBtn}>+</button>
          <span style={{ fontSize: 11.5, color: C.dim, ...KA }}>
            {t(E, "(hop allowed if |Δheight| < D)", "(높이 차이 < D 이면 건너기 가능)")}
          </span>
        </div>

        {/* height grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 46px)`, gap: 4 }}>
            {SIM_H.map((row, r) => row.map((h, c) => (
              <div key={`${r}-${c}`} style={cellStyle(r, c)}>
                {r === 0 && c === 0 && <span style={{ fontSize: 11, lineHeight: 1 }}>🐰</span>}
                <span>{h}</span>
              </div>
            )))}
          </div>
        </div>

        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, textAlign: "center" }}>
          {t(E, "reachable = ", "갈 수 있는 칸 = ")}<b style={{ color: "#34d399" }}>{count}</b>
          <span style={{ color: "#64748b" }}> / {R * Cn}</span>
        </div>

        {/* 2026-09-17: 150자가 한 덩어리였다 + D 를 만지기도 전에 결론이 다 떠 있었다.
            (mcc20cipher:27,109-118 의 touched 수법을 그대로 가져왔다.) */}
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
          whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
          {
            touched
              ? t(E,
                  "The rule is about the DIFFERENCE to a neighbor — not the height itself.\nTwo tall buildings side by side differ little, so the hop is easy.\nA tall one next to a short one becomes a wall once that difference reaches D.\nSo no wall is fixed: the same edge opens for a big D and closes for a small one.",
                  "중요한 건 높이 자체가 아니라 이웃과의 '차이' 예요.\n높은 건물 둘이 나란히 있으면 차이가 작아서 쉽게 건너요.\n높은 건물 옆 낮은 건물은 차이가 D 이상이면 벽이 돼요.\n그래서 벽이 어디인지 미리 정해져 있지 않아요.\n같은 자리도 D 가 크면 열리고 작으면 막혀요.")
              : t(E,
                  "Try a bigger D, then a smaller one.\nDoes the same edge stay a wall every time?",
                  "D 를 키웠다 줄였다 해봐요.\n같은 자리가 늘 벽으로 남아 있나요?")}
        </div>
      </div>
    </div>
  );
}
const dBtn = {
  width: 28, height: 28, borderRadius: 6, border: "1px solid #fcd34d", background: "#fff",
  color: "#92400e", fontSize: 17, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* ───────────────── BFS process stepper — pop, check 4 neighbors, repeat ─────────────────
   2026-09-26: 선생님이 라이브를 보시고 "BFS에 대한 설명도 없고 … 시뮬로 설명하는
   부분도 없고" 라고 하셨다. 이 자리(⚡코드 1/2)에는 결과만 있었지 "과정"이 없었다.
   여기서는 큐에서 칸을 하나씩 꺼내 이웃 4개를 확인하는 과정을 직접 밟는다.
   ⭐ 이름(큐/BFS)은 맨 마지막 걸음에만 나온다 — 그전엔 "방법"으로만 부른다.
   ⭐ 첫 두 번의 pop 은 방향별로(한 걸음에 한 방향) 자세히 보여주고, 그 뒤로는
   pop 한 번에 한 걸음으로 압축한다 — 큐가 빌 때까지 클릭 수가 지나치게
   많아지지 않게. ⭐ D=2 트랩 예제는 옛 정적 그림(선생님이 걷어내라 하신 것)과
   똑같은 숫자를 쓴다 — 그림 대신 같은 스테퍼로 "가운데는 서로 통해도 테두리에서
   못 들어간다"를 직접 보여준다.
   ───────────────────────────────────────────────────────────────────── */
const DIRS = [
  { dr: -1, dc: 0, en: "up", ko: "위" },
  { dr: 1, dc: 0, en: "down", ko: "아래" },
  { dr: 0, dc: -1, en: "left", ko: "왼쪽" },
  { dr: 0, dc: 1, en: "right", ko: "오른쪽" },
];
function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// The same border/middle numbers the old static picture used — border cells
// all match, but the gap to the middle equals D, so it's blocked.
const TRAP_H = [
  [10, 10, 10, 10],
  [10, 8, 8, 10],
  [10, 8, 8, 10],
  [10, 10, 10, 10],
];

function buildBfsProcessTrace(H, D, E) {
  const R = H.length, Cn = H[0].length;
  const visited = Array.from({ length: R }, () => Array(Cn).fill(false));
  visited[0][0] = true;
  let queue = [[0, 0]];
  let count = 1;
  const snap = () => ({ visited: visited.map(row => row.slice()), queue: queue.slice(), count });
  const trace = [];

  trace.push({
    ...snap(), current: null, checking: null, status: "start",
    msg: t(E,
      "The only sure cell is (1,1).\nPut it in the queue and start.",
      "확실한 건 (1,1) 하나뿐이에요.\n줄에 넣고 시작해요."),
  });

  /* 1단계 — 처음 두 번의 pop 만 «한 걸음에 한 방향» 으로 자세히 본다.
     이 둘이면 네 가지 결과가 다 나온다: 격자 밖 · 막힘 · 통과 · 이미 다녀옴.
     나머지는 아래 2단계에서 «한 겹» 씩 묶는다. */
  let popIdx = 0;
  while (queue.length && popIdx < 2) {
    const [r, c] = queue[0];
    queue = queue.slice(1);

    {
      trace.push({
        ...snap(), current: [r, c], checking: null, status: "pop",
        msg: t(E,
          `Pop (${r + 1},${c + 1}) from the front of the queue.\nCheck its 4 neighbors, one at a time.`,
          `줄 앞에서 (${r + 1},${c + 1}) 를 꺼내요.\n이웃 4칸을 하나씩 봐요.`),
      });
      for (const d of DIRS) {
        const nr = r + d.dr, nc = c + d.dc;
        const inBounds = nr >= 0 && nr < R && nc >= 0 && nc < Cn;
        let status, msg;
        if (!inBounds) {
          status = "oob";
          msg = t(E,
            `${capFirst(d.en)}: outside the grid.\nCan't go there.`,
            `${d.ko}: 격자 밖이에요.\n못 가요.`);
        } else if (visited[nr][nc]) {
          status = "visited";
          msg = t(E,
            `${capFirst(d.en)} (${nr + 1},${nc + 1}): already visited.\nSkip.`,
            `${d.ko}(${nr + 1},${nc + 1}): 이미 다녀왔어요.\n건너뛰어요.`);
        } else {
          const diff = Math.abs(H[nr][nc] - H[r][c]);
          if (diff < D) {
            status = "pass";
            visited[nr][nc] = true;
            queue = [...queue, [nr, nc]];
            count++;
            msg = t(E,
              `${capFirst(d.en)} (${nr + 1},${nc + 1})=${H[nr][nc]}: |${H[r][c]}−${H[nr][nc]}|=${diff} < D(${D}).\nPass — add to the queue.`,
              `${d.ko}(${nr + 1},${nc + 1})=${H[nr][nc]}: |${H[r][c]}−${H[nr][nc]}|=${diff} < D(${D}).\n통과 — 줄에 넣어요.`);
          } else {
            status = "blocked";
            msg = t(E,
              `${capFirst(d.en)} (${nr + 1},${nc + 1})=${H[nr][nc]}: |${H[r][c]}−${H[nr][nc]}|=${diff}, not less than D(${D}).\nBlocked.`,
              `${d.ko}(${nr + 1},${nc + 1})=${H[nr][nc]}: |${H[r][c]}−${H[nr][nc]}|=${diff}, D(${D}) 보다 작지 않아요.\n막혀요.`);
          }
        }
        trace.push({ ...snap(), current: [r, c], checking: inBounds ? [nr, nc] : null, status, msg });
      }
    }
    popIdx++;
  }

  /* ⭐ 2026-09-26: 여기가 원래 「pop 한 번 = 한 걸음」이었다. 재검증 학생 —
     *"8~10걸음쯤부터 지루했다. 15~25걸음은 좌표만 바뀌고 하는 말이 거의 똑같아서
     그냥 ▶ 다음만 눌렀다"*. ux 도 같은 자리를 **12~27걸음(16번)** 으로 쟀다.
     `feedback_shorter_not_longer` — 더 설명하는 게 아니라 **묶는다.**
     이제 한 걸음이 **한 겹(지금 줄에서 기다리던 칸 전부)** 이다. 16걸음 → 8걸음.
     ⭐ 그냥 줄인 게 아니다 — BFS 가 실제로 **겹 단위로 번진다**는 걸 보여준다.
     자세히 본 두 번의 pop 이 「한 칸씩」을 이미 가르쳤으니, 여기서는 그 되풀이를
     묶어도 거짓이 아니다. 묶는다는 말을 첫 겹에서 대놓고 한다. */
  let waveNo = 0;
  while (queue.length) {
    const layer = queue;
    queue = [];
    waveNo++;

    const added = [];
    const blockedMap = new Map();
    for (const [r, c] of layer) {
      for (const d of DIRS) {
        const nr = r + d.dr, nc = c + d.dc;
        if (nr < 0 || nr >= R || nc < 0 || nc >= Cn || visited[nr][nc]) continue;
        if (Math.abs(H[nr][nc] - H[r][c]) < D) {
          visited[nr][nc] = true;
          queue = [...queue, [nr, nc]];
          count++;
          added.push([nr, nc]);
        } else {
          blockedMap.set(`${nr},${nc}`, [nr, nc]);
        }
      }
    }
    /* 같은 겹 안에서 어떤 칸은 A 에서 보면 막히고 B 에서 보면 통과한다.
       통과한 칸을 «막힘» 에 같이 적으면 한 칸이 두 뜻으로 보인다
       (feedback_same_number_two_meanings) — 통과가 이긴다. */
    for (const [rr, cc] of added) blockedMap.delete(`${rr},${cc}`);
    const blocked = [...blockedMap.values()];

    // 마지막 겹이 아무것도 못 넣고 줄도 비웠으면, 빈 걸음을 만들지 않고 결론으로 넘긴다.
    if (added.length === 0 && queue.length === 0) break;

    const fmt = (list) => list.map(([rr, cc]) => `(${rr + 1},${cc + 1})`).join(", ");
    const head = waveNo === 1
      ? t(E,
          "From here it's the same move over and over, so let's take a whole layer at a time.\n",
          "여기부터는 똑같은 일의 되풀이예요 — 한 겹씩 묶어서 볼게요.\n")
      : "";
    const popped = t(E,
      `Popped the ${layer.length} cell${layer.length > 1 ? "s" : ""} that were waiting.`,
      `줄에서 기다리던 ${layer.length} 칸을 꺼냈어요.`);
    let tail;
    if (added.length && blocked.length) {
      tail = t(E, `\nNew: ${fmt(added)}.  Blocked: ${fmt(blocked)}.`,
                  `\n새로 들어온 칸: ${fmt(added)}.  막힌 칸: ${fmt(blocked)}.`);
    } else if (added.length) {
      tail = t(E, `\nNew: ${fmt(added)}.`, `\n새로 들어온 칸: ${fmt(added)}.`);
    } else {
      tail = t(E, `\nNothing new — blocked: ${fmt(blocked)}.`,
                  `\n새로 들어올 칸이 없어요 — 막힘: ${fmt(blocked)}.`);
    }
    trace.push({
      ...snap(), current: null, checking: null, wave: added,
      status: added.length ? "pass" : "blocked",
      msg: head + popped + tail,
    });
  }

  const isTrap = D === 2 && R === 4 && Cn === 4;
  trace.push({
    ...snap(), current: null, checking: null, status: "done",
    msg: isTrap
      ? t(E,
          `The queue is empty. Answer: ${count}.\nThe middle 4 cells connect to EACH OTHER, but never to the border — unreachable.`,
          `줄이 비었어요. 답은 ${count}예요.\n가운데 4칸은 서로 통하지만, 테두리에서는 못 들어가서 갈 수 없어요.`)
      : t(E,
          `The queue is empty. Answer: ${count}.`,
          `줄이 비었어요. 답은 ${count}예요.`),
  });
  trace.push({
    ...snap(), current: null, checking: null, status: "name",
    msg: t(E,
      "Spreading out with a waiting line, one cell at a time — that's called BFS.\nThe waiting line itself is called a queue.",
      "이렇게 줄을 하나씩 꺼내며 번져 나가는 방법을 «BFS» 라고 불러요.\n그 줄은 «큐» 라고 불러요."),
  });

  return trace;
}

const BFS_PRESETS = [
  { key: "main", H: SIM_H, D: 5, en: "🌆 Main example (D=5)", ko: "🌆 메인 예제 (D=5)" },
  { key: "trap", H: TRAP_H, D: 2, en: "⚠️ The trap (D=2)", ko: "⚠️ 흔한 실수 예제 (D=2)" },
];

/* ⭐ 2026-09-26 — 탭을 옮겼다 와도(모바일 오탭 포함) 보던 걸음 그대로.
   ⚠️ 이건 **학생 진도가 아니라 UI 위치 캐시**다 — CLAUDE.md 의 보호 localStorage
   키 34개(`completedLessons` 등)와는 다른 층이다. 지워지거나 손상돼도
   그냥 이 시뮬이 1걸음으로 돌아갈 뿐, 학습 데이터 손실이 아니다.
   기존 `quest-pos-${pathname}`(챕터/섹션 위치, *App.jsx 168개가 씀) 과도
   다른 키 네임스페이스(`quest-step-`)를 써서 절대 겹치지 않게 한다. */
const CITY_TOUR_STEP_KEY = "quest-step-mcc20citytour-bfsprocess";

function readCityTourSteps() {
  try {
    if (typeof window === "undefined") return { main: 0, trap: 0 };
    const raw = window.localStorage.getItem(CITY_TOUR_STEP_KEY);
    if (!raw) return { main: 0, trap: 0 };
    const parsed = JSON.parse(raw);
    return {
      main: Number.isFinite(parsed?.main) && parsed.main >= 0 ? Math.floor(parsed.main) : 0,
      trap: Number.isFinite(parsed?.trap) && parsed.trap >= 0 ? Math.floor(parsed.trap) : 0,
    };
  } catch {
    // 사생활 모드·손상된 값 등 — 조용히 0부터 시작한다. 화면은 항상 떠야 한다.
    return { main: 0, trap: 0 };
  }
}

export function Mcc20CityTourBfsProcessStepper({ E }) {
  const [presetKey, setPresetKey] = useState("main");
  // 프리셋마다 걸음을 따로 기억한다 — 「⚠️ 흔한 실수 예제」를 봤다가
  // 「🌆 메인 예제」로 돌아와도 진행이 사라지지 않는다.
  const [stepByPreset, setStepByPreset] = useState(readCityTourSteps);
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(CITY_TOUR_STEP_KEY, JSON.stringify(stepByPreset));
    } catch {
      // 저장소 차단·가득 참 등 — 조용히 무시. 위치 기억만 안 될 뿐이다.
    }
  }, [stepByPreset]);
  const step = stepByPreset[presetKey] ?? 0;
  const setStep = (v) =>
    setStepByPreset(prev => ({
      ...prev,
      [presetKey]: typeof v === "function" ? v(prev[presetKey] ?? 0) : v,
    }));
  const preset = BFS_PRESETS.find(p => p.key === presetKey);
  const trace = useMemo(() => buildBfsProcessTrace(preset.H, preset.D, E), [presetKey, E]);
  const maxStep = trace.length - 1;
  const idx = Math.min(step, maxStep);
  const cur = trace[idx];
  const R = preset.H.length, Cn = preset.H[0].length;

  // 걸음은 프리셋마다 따로 산다 — 돌아오면 보던 자리 그대로다.
  const choosePreset = (k) => setPresetKey(k);

  const statusColor = { pass: "#059669", blocked: "#dc2626", visited: "#9ca3af", oob: "#9ca3af" }[cur.status] || A;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🧭 {t(E, "Drain the queue, one check at a time", "줄이 빠져나가는 걸 하나씩 봐요")}
        </div>

        {/* preset picker */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {BFS_PRESETS.map(p => (
            <button key={p.key} onClick={() => choosePreset(p.key)} style={{
              padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
              border: `1.5px solid ${presetKey === p.key ? A : "#fcd34d"}`,
              background: presetKey === p.key ? A : "#fff",
              color: presetKey === p.key ? "#fff" : "#92400e",
              cursor: "pointer",
            }}>{t(E, p.en, p.ko)}</button>
          ))}
        </div>

        {/* queue — a horizontal row of tiles, leftmost = next to pop */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
            {t(E, "queue — front is next", "줄 — 왼쪽이 다음 차례")}
          </div>
          <div style={{ display: "flex", gap: 4, minHeight: 34, flexWrap: "wrap" }}>
            {cur.queue.length === 0 ? (
              <span style={{ fontSize: 11.5, color: C.dim, alignSelf: "center" }}>{t(E, "(empty)", "(비어 있음)")}</span>
            ) : cur.queue.map(([r, c], i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: 6,
                border: i === 0 ? `2px solid ${A}` : "1.5px solid #fcd34d",
                background: i === 0 ? "#fef3c7" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10.5, fontWeight: 700, color: "#92400e",
                fontFamily: "'JetBrains Mono',monospace",
              }}>{r + 1},{c + 1}</div>
            ))}
          </div>
        </div>

        {/* height grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 42px)`, gap: 4 }}>
            {preset.H.map((row, r) => row.map((h, c) => {
              const isCurrent = cur.current && cur.current[0] === r && cur.current[1] === c;
              const isChecking = cur.checking && cur.checking[0] === r && cur.checking[1] === c;
              // 이번 겹에 새로 들어온 칸 — 한 걸음에 바뀐 자리가 어디인지 눈에 보이게
              const isNew = cur.wave && cur.wave.some(([wr, wc]) => wr === r && wc === c);
              const isVisited = cur.visited[r][c];
              let border = "2px solid #e5e7eb";
              if (isChecking) border = `2.5px solid ${statusColor}`;
              else if (isNew) border = "2.5px solid #059669";
              else if (isCurrent) border = `2.5px solid ${A}`;
              else if (isVisited) border = "2px solid #6ee7b7";
              return (
                <div key={`${r}-${c}`} style={{
                  width: 42, height: 42, borderRadius: 7, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: isVisited ? "#d1fae5" : "#f3f4f6",
                  border, color: isVisited ? "#065f46" : "#9ca3af",
                  fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5,
                  transition: "all 160ms",
                }}>
                  {r === 0 && c === 0 && <span style={{ fontSize: 9, lineHeight: 1 }}>🐰</span>}
                  <span>{h}</span>
                </div>
              );
            }))}
          </div>
        </div>

        {/* step message */}
        <div style={{
          background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 12px",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, textAlign: "center", lineHeight: 1.6,
          minHeight: 46, whiteSpace: "pre-line", wordBreak: "keep-all",
        }}>
          {cur.msg}
        </div>

        <div style={{ marginTop: 8, textAlign: "center", fontSize: 12.5, color: "#92400e" }}>
          {t(E, "reachable so far = ", "지금까지 갈 수 있는 칸 = ")}<b style={{ color: A }}>{cur.count}</b>
          <span style={{ color: C.dim }}> / {R * Cn}</span>
        </div>

        {/* controls — deliberately NOT the pill bottom-nav shape/color: small
            in-card rectangular buttons, cyan accent (feedback_one_nav_shape_per_screen) */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={idx === 0} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            border: "1.5px solid #0e7490", background: idx === 0 ? "#f1f5f9" : "#ecfeff",
            color: idx === 0 ? "#cbd5e1" : "#0e7490", cursor: idx === 0 ? "default" : "pointer",
          }}>◀ {t(E, "Back", "이전")}</button>
          <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={idx === maxStep} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            border: "none", cursor: idx === maxStep ? "default" : "pointer", color: "#fff",
            background: idx === maxStep ? "#a5f3fc" : "#0e7490",
          }}>▶ {t(E, "Next", "다음")}</button>
          {/* ⭐ 2026-09-26: 재검증 학생 *"이름을 얻으려고 20번 넘게 눌러야 하는 건 지쳤다"*.
              `feedback_student_agent_must_quit` — 학생은 패턴을 알면 그만두고 싶어 한다.
              막지 말고 **나가는 문**을 준다. 마지막 두 걸음(답 + 이름)이 어차피 결론이다. */}
          <button onClick={() => setStep(maxStep)} disabled={idx === maxStep} style={{
            padding: "7px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            border: "1.5px solid #0e7490", background: idx === maxStep ? "#f1f5f9" : "#fff",
            color: idx === maxStep ? "#cbd5e1" : "#0e7490", cursor: idx === maxStep ? "default" : "pointer",
          }}>{t(E, "Skip to the end", "끝까지")} ▶▶</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 4, fontSize: 10.5, color: C.dim, fontWeight: 700 }}>
          {idx + 1}/{maxStep + 1}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (flood-fill / BFS with the |Δheight| < D edge rule)
   Input format:  line 1 = "M N",  then M lines of N heights,  last line = "D".
   Start is fixed at (1,1) = index (0,0). Count reachable cells.
   ================================================================ */
const FULL_PY = [
  "from collections import deque",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "M = 4",
  "N = 5",
  "D = 5",
  "H = [",
  "    [1, 3, 7, 9, 16],",
  "    [6, 2, 4, 1, 8],",
  "    [8, 9, 10, 12, 14],",
  "    [7, 5, 1, 4, 11],",
  "]",
  "",
  "visited = []",
  "for _ in range(M):            # 줄마다 [False, False, …] 하나씩",
  "    visited.append([False] * N)",
  "visited[0][0] = True          # start at (1,1) = index (0,0)",
  "q = deque([(0, 0)])",
  "count = 1",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<M and 0<=nc<N and not visited[nr][nc] \\",
  "                and abs(H[nr][nc]-H[r][c]) < D:",
  "            visited[nr][nc] = True",
  "            q.append((nr, nc))",
  "            count += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <cstdlib>   // abs",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int M = 4;",
  "    int N = 5;",
  "    int D = 5;",
  "    vector<vector<int>> H = {",
  "        {1, 3, 7, 9, 16},",
  "        {6, 2, 4, 1, 8},",
  "        {8, 9, 10, 12, 14},",
  "        {7, 5, 1, 4, 11},",
  "    };",
  "",
  "    vector<vector<bool>> visited(M, vector<bool>(N, false));",
  "    visited[0][0] = true;          // start at (1,1) = index (0,0)",
  "    queue<pair<int,int>> q;",
  "    q.push({0, 0});",
  "    int count = 1;",
  "",
  "    int dr[4] = {-1, 1, 0, 0};",
  "    int dc[4] = {0, 0, -1, 1};",
  "    while (!q.empty()) {",
  "        auto [r, c] = q.front();",
  "        q.pop();",
  "        for (int d = 0; d < 4; d++) {",
  "            int nr = r + dr[d];",
  "            int nc = c + dc[d];",
  "            if (nr >= 0 && nr < M && nc >= 0 && nc < N &&",
  "                !visited[nr][nc] && abs(H[nr][nc] - H[r][c]) < D) {",
  "                visited[nr][nc] = true;",
  "                q.push({nr, nc});",
  "                count++;",
  "            }",
  "        }",
  "    }",
  "    cout << count << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc20CityTourSections(E) {
  return [
    {
      label: t(E, "1️⃣ Take in the map", "1️⃣ 지도를 받아요"),
      color: A,
      py: FULL_PY.slice(0, 13), cpp: FULL_CPP.slice(0, 18),
      why: [
        t(E, "What do we have to hand back? How many cells you can reach from (1,1).\nSo first take in the map: its size, the gap limit D, and every height.",
            "무엇을 내놓아야 하나요? (1,1) 에서 갈 수 있는 칸이 몇 개인지예요.\n그러니 먼저 지도를 받아요 — 크기와 높이 차 한계 D, 그리고 높이들이에요."),
      ],
    },
    {
      label: t(E, "2️⃣ Stand at the start", "2️⃣ 시작 칸에 서요"),
      color: "#0891b2",
      py: FULL_PY.slice(13, 20), cpp: FULL_CPP.slice(18, 24),
      why: [
        t(E, "Why not sweep the whole grid over and over?\nThat could take M×N passes over M×N cells — 10^10.\nSo we visit each cell just once and let the reachable area spread outwards.",
            "왜 지도를 몇 번씩 다시 훑지 않을까요?\n그러면 최대 M×N 번을 M×N 칸에 되풀이해서 10^10 이 될 수 있어요.\n그래서 칸마다 딱 한 번만 가고, 갈 수 있는 곳이 바깥으로 번져 나가게 해요."),
        t(E, "To do that we need two things — a note of where we have been, and a line of cells waiting their turn.\n(1,1) goes into both, and the count starts at 1.",
            "그러려면 둘이 필요해요 — 어디를 다녀왔는지 적을 곳과,\n차례를 기다리는 칸들의 줄이에요.\n(1,1) 을 둘 다에 넣고, 센 수는 1 에서 시작해요."),
      ],
    },
    {
      label: t(E, "3️⃣ Let it spread", "3️⃣ 번져 나가게 해요"),
      color: "#16a34a",
      py: FULL_PY.slice(20), cpp: FULL_CPP.slice(24),
      why: [
        /* ⚠️ 2026-09-19: 여기 있던 "왜 다시 안 훑나" 는 **2번 조각으로 옮겼다.**
           그 결정이 일어나는 자리가 거기다. 같은 말을 두 번 하지 않는다.
           이 조각의 이름은 "번져 나가며 채우기(BFS)" 다 — 음차어를 먼저 쓰지 않는다. */
        t(E, "This spreading is called BFS (flood fill).\nPop a cell, look at its 4 neighbours, and step in only where you may.",
            "이렇게 번져 나가며 채우는 방법을 BFS 라고 불러요.\n칸을 하나 꺼내서 이웃 넷을 보고, 갈 수 있는 곳에만 들어가요."),
        t(E, "Pop a cell, then for each of its 4 neighbors step in only if it hasn't been visited AND the height gap |H[nr][nc] − H[r][c]| < D.",
            "칸을 하나 꺼내서 이웃 4 개를 봐요.\n아직 안 간 칸이면서 높이 차 |H[nr][nc] − H[r][c]| < D 일 때만 들어가요."),
        t(E, "Mark visited AT PUSH time and bump count then — so every reachable cell is counted exactly once.",
            "큐에 넣는 순간 방문 표시를 하고 그때 count 를 올려요.\n그래야 갈 수 있는 칸이 정확히 한 번씩만 세어져요."),
        t(E, "The answer is how many cells got visited.",
            "답은 방문한 칸의 개수예요."),
        t(E, "There is no fixed wall map: whether an edge is open depends on the two heights AND D.",
            "벽이 어디인지 미리 정해져 있지 않아요. 길이 열리는지는 두 높이와 D 에 따라 달라져요."),
        t(E, "The same neighbour can be open for a large D and blocked for a small one.",
            "같은 이웃도 D 가 크면 열리고 작으면 막혀요."),
      ],
      pyOnly: [
        t(E, "deque.popleft() finishes instantly no matter how big the deque is — that is what makes this real BFS, not a slow list.pop(0) each step.",
            "deque 의 popleft() 는 줄이 아무리 길어도 바로 끝나요.\n그래서 느린 list.pop(0) 대신 쓰면 진짜 BFS 가 돼요."),
        t(E, "abs(H[nr][nc] - H[r][c]) < D is the whole edge rule — the height DIFFERENCE, strictly less than D.",
            "abs(H[nr][nc] - H[r][c]) < D 한 줄이 규칙의 전부예요.\n높이 '차이' 가 D 보다 작아야만 건너가요."),
      ],
      cppOnly: [
        t(E, "Use queue<pair<int,int>> and abs() from <cstdlib>; visited is a vector<vector<bool>>.",
            "queue<pair<int,int>> 와 <cstdlib> 의 abs() 를 써요.\nvisited 는 vector<vector<bool>> 이에요."),
        t(E, "int is plenty here: heights fit (|H| ≤ 10^6) and the cell count is small (M×N ≤ 10^5).",
            "여기선 int 로 충분해요.\n높이 (|H| ≤ 10^6) 와 칸 수 (M×N ≤ 10^5) 모두 int 범위 안이에요."),
      ],
    },
  ];
}

export function Mcc20CityTourProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). FULL_PY / FULL_CPP 는 표시용 배열이다 — 내용은 절대 바꾸지 않고, 그대로 가져와
   beats(설명 말풍선)만 덧붙인다.
   ⭐ 2026-09-26 선생님 직접 지시: "c++코드로도 만들어줘. 이 MCC는" — 이 quest 는
   MCC 중 유일하게 C++ 을 만든다(다른 MCC 는 여전히 Python 전용, feedback_mcc_is_python_only). ── */
export function getMcc20CityTourWalk(E, lang = "py") {
  const vars = [
    { v: "visited", ko: "이미 다녀온 칸 표시", en: "cells already visited" },
    { v: "q", ko: "차례를 기다리는 칸들의 줄", en: "queue of cells waiting their turn" },
    { v: "D", ko: "이 값보다 높이 차가 작아야 건널 수 있음", en: "the height gap must be smaller than this to cross" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 17], bubble: t(E,
          "What do we have to hand back? How many cells we can reach from (1,1). So first take in the map — bring in the tools we need (vector, queue) with headers, then set the size, the gap limit D, and every height as values.",
          "무엇을 내놓아야 하나요? (1,1) 에서 갈 수 있는 칸이 몇 개인지예요.\n그러니 먼저 지도를 받아요 — 필요한 도구(vector, queue)를 헤더로 가져오고, 크기와 D, 높이들을 값으로 넣어요.") },
        { hi: [18, 23], bubble: t(E,
          "Why not sweep the whole grid again and again? That's 10^10 checks.\nSo we visit each cell just once — mark where we've been in a vector<vector<bool>>, and put cells waiting their turn in a queue<pair<int,int>>, pairing up (row, col) like a Python tuple.",
          "왜 지도를 몇 번씩 다시 훑지 않을까요? 그러면 10^10 번을 봐야 해요.\n그래서 칸마다 딱 한 번만 가요 — 다녀온 곳은 vector<vector<bool>> 에 적고, 차례를 기다리는 칸은 pair 로 줄 번호·칸 번호를 묶어 queue<pair<int,int>> 에 넣어요.") },
          /* ⭐ 파이썬 쪽 [(-1,0),(1,0),(0,-1),(0,1)] 을 오늘 방향까지 풀어 설명했다
             (선생님 라이브 지적 + 재검증 학생). C++ 은 dr[]/dc[] 두 배열로 나뉘어
             있어서 그 대응을 여기서 짚는다 — 그대로 번역하면 안 되는 자리다. */
        { hi: [24, 25], bubble: t(E,
          "Lay out the four directions as arrays ahead of time — dr[0],dc[0]=(-1,0) up, dr[1],dc[1]=(1,0) down,\ndr[2],dc[2]=(0,-1) left, dr[3],dc[3]=(0,1) right.\nOne index d pairs the two arrays together.",
          "네 방향을 미리 배열로 적어 둬요 — dr[0], dc[0] = (-1, 0) 은 위, dr[1], dc[1] = (1, 0) 은 아래,\ndr[2], dc[2] = (0, -1) 은 왼쪽, dr[3], dc[3] = (0, 1) 은 오른쪽이에요.\n숫자 d 하나로 두 배열을 짝지어 써요.") },
        { hi: [26, 28], bubble: t(E,
          "This spreading is called BFS. Keep going while the queue isn't empty, and each time look at the front cell with front() and remove it with pop() — the same job as Python's popleft().",
          "이렇게 번져 나가는 방법을 BFS 라고 불러요.\n줄이 빌 때까지 계속하면서, 매번 맨 앞의 칸을 front() 로 보고 pop() 으로 꺼내요 — 파이썬의 popleft() 와 같은 일이에요.") },
        { hi: [29, 31], bubble: t(E,
          "Now check the four directions one by one.\nAdd dr[d], dc[d] to the row and column we're standing on, and you get that neighbor's place.",
          "이제 네 방향을 하나씩 확인해요.\n지금 칸의 줄 번호·칸 번호에 dr[d], dc[d] 를 더하면 그 이웃의 자리가 나와요.") },
        { hi: [32, 33], bubble: t(E,
          "Step into a neighbor only when two things hold: it's still inside the grid and not yet visited, and the height gap abs(H[nr][nc] - H[r][c]) is smaller than D.\nThis one line is the whole rule.",
          "이웃으로 들어가는 건 두 가지가 맞을 때예요 — 격자 안이면서 아직 안 간 칸이고,\n높이 차 abs(H[nr][nc] - H[r][c]) 가 D 보다 작을 때요.\n이 한 줄이 규칙의 전부예요.") },
        { hi: [34, 36], bubble: t(E,
          "Mark it visited and bump count at the moment we push it into the queue, not when we pop it.\nThat way a cell can never enter the queue twice, so every reachable cell is counted exactly once.",
          "큐에 넣는 순간에 방문 표시를 하고 count 를 올려요. 꺼낼 때가 아니에요.\n그래야 같은 칸이 큐에 두 번 들어가지 않아서, 갈 수 있는 칸이 딱 한 번씩만 세어져요.") },
        { hi: [40, 40], bubble: t(E,
          "The answer is how many cells got visited — print count.",
          "답은 방문한 칸 개수예요 — count 를 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 12], bubble: t(E,
        "What do we have to hand back? How many cells we can reach from (1,1). So first take in the map — its size, the gap limit D, and every height.",
        "무엇을 내놓아야 하나요? (1,1) 에서 갈 수 있는 칸이 몇 개인지예요.\n그러니 먼저 지도를 받아요 — 크기와 높이 차 한계 D, 그리고 높이들이에요.") },
      { hi: [13, 19], bubble: t(E,
        "Why not sweep the whole grid again and again? That is 10^10 checks.\nSo we go to each cell just once — we need a note of where we've been, and a line of cells waiting their turn.",
        "왜 지도를 몇 번씩 다시 훑지 않을까요? 그러면 10^10 번을 봐야 해요.\n그래서 칸마다 딱 한 번만 가요 — 다녀온 곳을 적을 곳과, 차례를 기다리는 줄이 필요해요.") },
      /* ⭐ 2026-09-26: 재검증 학생이 **딱 하나**를 남겼다 —
         *"`deque` 가 무슨 뜻인지, `popleft()` 가 리스트의 무엇과 다른지 **한 번도 설명이
         없었다.** … 「리스트의 `.pop(0)` 도 되지만 느려서 `deque` 라는 걸 쓴다」 정도
         **한 줄이면** 됐을 것 같다."* — 처방까지 학생이 직접 말했다.
         🚨 **그 문장은 이미 있었다.** `getMcc20CityTourSections`(491~550줄, **PDF 전용**)에
         *"deque 의 popleft() 는 크기와 상관없이 바로 끝나는 연산이에요"* 라고 적혀 있는데
         **화면(CodeWalk)에는 없었다.** 이 quest 에서 **같은 모양의 사고가 두 번째**다
         (앞서 「1️⃣2️⃣3️⃣ 왜 이렇게」 단계별 설명도 PDF 에만 있었다).
         ⭐ **PDF 에만 있는 글은 학생이 안 본다.** 화면으로 옮긴다.
         ⭐ 그리고 **`deque` 는 레슨 25(덱)가 이미 가르친다** — 갈 곳을 알려준다. */
      { hi: [17, 17], bubble: t(E,
        "Why deque and not a plain list? list.pop(0) has to shift every item left, so it gets slower as the line grows.\ndeque.popleft() finishes instantly no matter how long the line is.\n(Lesson 25 covers deque.)",
        "왜 리스트가 아니라 deque 일까요? list.pop(0) 은 뒤의 값을 전부 한 칸씩 당겨야 해서\n줄이 길어질수록 느려져요.\ndeque 의 popleft() 는 줄이 아무리 길어도 바로 끝나요. (deque 는 25강에서 배워요.)") },
      /* ⭐ 2026-09-26: 선생님이 라이브를 보시고 *"neighbor 또는 next 가 위아래오른쪽왼쪽인데"*
         라고 짚으신 자리. 재검증 학생도 같은 줄에서 걸렸다 —
         *"dr·dc 가 상하좌우를 어떻게 나타내는지는 안 짚어준다"*.
         숫자 넷이 각각 어느 쪽인지 그 자리에서 말한다. */
      { hi: [20, 21], bubble: t(E,
        "This spreading is called BFS.\nKeep going while the line still has someone in it, and take the cell at the front each time.",
        "이렇게 번져 나가는 방법을 BFS 라고 불러요.\n줄에 누가 남아 있는 동안 계속하면서, 매번 줄 맨 앞의 칸을 꺼내요.") },
      { hi: [22, 23], bubble: t(E,
        "The four number pairs are the four directions — (-1,0) up, (1,0) down, (0,-1) left, (0,1) right.\nAdd one to the row and column number of where we stand, and you get that neighbor's place.",
        "숫자 짝 네 개가 곧 네 방향이에요 — (-1,0) 은 위, (1,0) 은 아래, (0,-1) 은 왼쪽, (0,1) 은 오른쪽.\n지금 서 있는 칸의 줄 번호·칸 번호에 하나씩 더하면 그 이웃의 자리가 나와요.") },
      { hi: [24, 25], bubble: t(E,
        "Step into a neighbor only when two things hold: it is still inside the grid and not yet visited, and the height gap is smaller than D.\nThis one line is the whole rule — so no wall is fixed in advance.",
        "이웃으로 들어가는 건 두 가지가 맞을 때예요 — 격자 안이면서 아직 안 간 칸이고,\n높이 차가 D 보다 작을 때요.\n이 한 줄이 규칙의 전부예요 — 그래서 벽이 어디인지 미리 정해져 있지 않아요.") },
      { hi: [26, 28], bubble: t(E,
        "Mark it visited and bump count at the moment we put it in the line, not when we pop it.\nThat way a cell can never enter the line twice, so every reachable cell is counted exactly once.",
        "줄에 넣는 그 순간에 방문 표시를 하고 count 를 올려요. 꺼낼 때가 아니에요.\n그래야 같은 칸이 줄에 두 번 들어가지 않아서, 갈 수 있는 칸이 딱 한 번씩만 세어져요.") },
      { hi: [30, 30], bubble: t(E,
        "The answer is how many cells got visited — print count.",
        "답은 방문한 칸 개수예요 — count 를 출력해요.") },
    ],
  };
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","queue"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadMcc20CityTourPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20CityTour — Full Study Guide", "Mcc20CityTour — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
