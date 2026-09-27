import { useState, useMemo, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
/* ⭐ 2026-09-27 선생님: *"버튼 순서나 처음부터 시작하는 버튼도 없어. 디자이너? 뭐지?
   너 마음대로 다른 디자인이랑 다르잖아."* — 맞는 지적이다.
   이 저장소에는 **공용 `SimNav`** 가 이미 있다(⏮ 처음부터 · ◀ 이전 · [걸음 칩] · ▶ 다음,
   카운터가 버튼 **사이**에 들어간다). 그런데 내가 그걸 안 쓰고 버튼을 새로 만들었다 —
   그래서 ①「처음부터」가 없고 ②카운터가 버튼 위에 따로 떠 있고 ③형제 시뮬과 모양이 달랐다.
   `quest_season_shape_consistency`: **발명 금지, 형제부터 열어라.** 공용 것으로 되돌린다. */
import { SimNav } from "@/components/quest/TraceStepper";
import { CodeBlock } from "@/components/quest/shared";

/* ⭐ 이 quest 의 **고유색 하나**. 형제도 각자 한 색이다 —
   knight `#2563eb`(파랑) · kitty `#dc2626`(빨강) · rect `#059669`(초록).
   2026-09-27 선생님: *"UX랑 너무 다른데?"* 실측하니 citytour 만 **세 색이 섞여** 있었다 —
   3쪽 시뮬 `#047857`(초록) · 5쪽 시뮬 `#0e7490`(청록) · 나머지 주황.
   ⛔ `#0e7490` 은 **CLAUDE.md 의 SimNav 사용 예시에 적힌 색**이다. 예시를 복붙하고
   quest 색으로 안 바꾼 것이다. **accent 는 반드시 `A` 를 넘겨라.** */
const A = "#d97706";
const NW = { whiteSpace: "nowrap" };
/** 말풍선이 격자 위에 뜰 자리 — 이만큼 미리 비워 둬야 격자를 안 가린다. */
const BUBBLE_H = 78;
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

/* ⭐ 2026-09-27: 같은 퍼짐을 **한 홉씩 겹으로 끊어서** 돌려준다.
   선생님(4차 반려): *"색칠된 것이 단계별로 더 나눠서 어떻게 가지는지
   실제로 점프하면서 갈 수 있는 것이 더 세분화되어 있지 않아."*
   새 학생도 독립적으로 같은 말을 했다 — *"색깔만 보고 «왜 딱 거기까지만 초록인지»는
   처음엔 몰랐다. 결과만 보고 넘어가기엔 부족했다."*
   ⚠️ `reachableMask` 와 **같은 규칙**을 써야 한다 — 마지막 겹까지 다 켜면
   두 결과가 반드시 같아야 하고, 화면이 그걸 «✓ 같은 결과» 로 보여준다.
   겹 수 실측: D=1~2 → 1겹 · D=3 → 4겹 · D=4 → 6겹 · D=5 → 10겹 · D≥6 → 8겹. */
function reachableWaves(H, D) {
  const R = H.length, Cn = H[0].length;
  const vis = Array.from({ length: R }, () => Array(Cn).fill(false));
  vis[0][0] = true;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const waves = [[[0, 0]]];
  let frontier = [[0, 0]];
  while (frontier.length) {
    const next = [];
    for (const [r, c] of frontier) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < R && nc >= 0 && nc < Cn && !vis[nr][nc] &&
            Math.abs(H[nr][nc] - H[r][c]) < D) {
          vis[nr][nc] = true;
          next.push([nr, nc]);
        }
      }
    }
    if (next.length) waves.push(next);
    frontier = next;
  }
  return waves;
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
  const fullCount = vis.flat().filter(Boolean).length;

  /* 「겹으로 보기」 — **기본은 꺼짐**이라 지금까지 보던 화면이 그대로다.
     켠 사람만 한 겹씩 밟는다(강제 클릭이 안 늘어난다 — `feedback_shorter_not_longer`). */
  const [waveMode, setWaveMode] = useState(false);
  const [waveIdx, setWaveIdx] = useState(0);
  const waves = useMemo(() => reachableWaves(SIM_H, D), [D]);
  const lastWave = waves.length - 1;
  // D 를 바꾸면 겹도 달라지니 처음부터 다시 본다.
  useEffect(() => { setWaveIdx(0); }, [D]);

  // 칸마다 «몇 번째 홉에 들어왔나». -1 이면 끝내 못 간다.
  const waveNo = useMemo(() => {
    const g = Array.from({ length: R }, () => Array(Cn).fill(-1));
    waves.forEach((w, i) => w.forEach(([r, c]) => { g[r][c] = i; }));
    return g;
  }, [waves, R, Cn]);

  const shown = (r, c) => (waveMode ? waveNo[r][c] >= 0 && waveNo[r][c] <= waveIdx : vis[r][c]);
  const count = waveMode
    ? waves.slice(0, waveIdx + 1).reduce((a, w) => a + w.length, 0)
    : fullCount;

  const cellStyle = (r, c) => {
    const on = shown(r, c);
    const isStart = r === 0 && c === 0;
    // 이번 겹에 **새로** 들어온 칸 — 한 걸음에 바뀐 자리가 눈에 보이게
    // (Ch2 과정 스테퍼가 쓰는 색·테두리를 그대로 쓴다. 새로 만들지 않는다.)
    const isNew = waveMode && waveNo[r][c] === waveIdx && waveIdx > 0;
    let border = "2px solid #e5e7eb";
    if (isNew) border = "2.5px solid #059669";
    else if (isStart) border = "2.5px solid #059669";
    else if (on) border = "2px solid #6ee7b7";
    return {
      width: 46, height: 46, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 1,
      background: on ? "#d1fae5" : "#f3f4f6",
      border, borderRadius: 8, color: on ? "#065f46" : "#9ca3af",
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
          {/* ⭐ 2026-09-27: 2쪽이 *"칸은 20개인데 답은 18이에요 — 다음 쪽에서 확인해요"* 라고
              **약속해 놓고**, 이 쪽 기본값이 D=3 이라 학생이 **18 을 한 번도 못 봤다.**
              (D=5 를 기본값으로 두면 답이 미리 새기 때문에 일부러 3 으로 뒀던 것이다.)
              → 기본값은 3 그대로 두고, **약속을 회수하는 버튼**을 하나 준다.
              `feedback_sentence_must_follow` — 예고했으면 회수해야 한다. */}
          <button onClick={() => { setTouched(true); setD(5); }} style={{
            padding: "5px 11px", borderRadius: 999, fontSize: 11.5, fontWeight: 800,
            border: `1.5px solid ${D === 5 ? A : "#fcd34d"}`,
            background: D === 5 ? A : "#fff", color: D === 5 ? "#fff" : "#92400e",
            cursor: "pointer", ...KA,
          }}>{t(E, "Official sample (D=5)", "공식 예제 (D=5)")}</button>
        </div>


        {/* height grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          {/* ⭐ 2026-09-27 선생님: "배열의 위 아래가 너무 다닥 붙어있어서 보기 불편해".
              ux 실측으로 **전제가 정정됐다** — 가로·세로 둘 다 정확히 4px 로 **대칭**이고
              위아래만 좁을 구조적 이유는 없다(셀 높이가 46px 로 고정이라 🐰 두 줄 칸도
              행을 안 늘린다). 즉 위아래만이 아니라 **전체가 빽빽**했다.
              형제 기준 `checkups/sims.jsx:274` 가 gap 8 이라 거기에 맞춘다.
              ⚠️ 셀 크기는 **안 건드린다** — 46→48 은 검증 안 된 제안이고, gap 만으로 푼다. */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 46px)`, gap: 8 }}>
            {SIM_H.map((row, r) => row.map((h, c) => (
              <div key={`${r}-${c}`} style={cellStyle(r, c)}>
                {r === 0 && c === 0 && <span style={{ fontSize: 11, lineHeight: 1 }}>🐰</span>}
                <span>{h}</span>
              </div>
            )))}
          </div>
        </div>

        {/* 겹 모드일 때만 뜨는 한 줄 — 이번 걸음이 답하는 질문을 그 자리에서 말한다. */}
        {waveMode && (
          <div style={{
            /* ⭐ 2026-09-27: 여기도 까만 터미널 상자였다 — 3쪽 겹 시뮬의 말.
               ⚡코드 쪽 말풍선만 고치고 이건 놓칠 뻔했다(선생님: *"전체적으로 확인해주고"*).
               같은 quest 안에서 **말 거는 자리는 같은 모양**이어야 한다. */
            background: "#fffbeb", border: "1.5px solid #fcd34d", color: "#92400e",
            borderRadius: 12, padding: "11px 14px", fontWeight: 600,
            fontSize: 13, textAlign: "center", lineHeight: 1.6, marginBottom: 8,
            whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)", ...KA,
          }}>💬 
            {waveIdx === 0
              ? t(E, "Start here. Nothing else is sure yet.", "여기서 시작해요.\n아직 다른 칸은 확실하지 않아요.")
              : t(E,
                  `Hop ${waveIdx}: ${waves[waveIdx].length} new cell(s).`,
                  `${waveIdx}번 뛰어서 닿는 칸이에요 — 이번에 ${waves[waveIdx].length}칸 늘었어요.`)}
          </div>
        )}

        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, textAlign: "center" }}>
          {t(E, "reachable = ", "갈 수 있는 칸 = ")}<b style={{ color: "#34d399" }}>{count}</b>
          <span style={{ color: "#64748b" }}> / {R * Cn}</span>
          {/* 마지막 겹까지 켜면 즉시 계산한 값과 **반드시 같아야** 한다.
              새 설명 문장을 대는 대신 그걸 숫자로 보여준다. */}
          {waveMode && waveIdx === lastWave && (
            <span style={{ color: "#34d399", fontWeight: 800 }}>
              {"  "}{t(E, "✓ same as the finished picture", "✓ 다 칠한 그림과 같아요")}
            </span>
          )}
        </div>

        {/* ⭐ 2026-09-27 선생님: *"여직까지 시뮬의 다음 이전은 시뮬 밑에 나왔던것 같은데
            페이지 3은 버튼이 위에 있는게 있네"* — 맞다. 이 토글이 **격자 위**에 있었다.
            형제 시뮬은 조작이 전부 **그림 아래**에 모여 있다. 아래로 내린다. */}
        {/* ⭐ 2026-09-27 ①: 여기까지는 «결과»만 보여준다 — D 를 누르면 초록이 통째로 바뀐다.
            선생님과 학생이 같은 자리에서 막혔다: *"왜 딱 거기까지만 초록인지 모르겠다."*
            그 답은 **한 홉씩 번져나가는 순서**인데, 그걸 보여주는 화면이 지금까지
            ⚡코드 탭 안쪽(고정 D 두 개)에만 있었다. 학생이 D 를 만지는 이 순간엔
            볼 방법이 없었다 — **빠진 다리**였다. 여기 놓는다.
            ⚠️ 기본은 꺼짐이고 **자동재생이 아니다**(`feedback_sim_style_consistency`
            — 선생님: *"자동은 뭐지? 우리 시뮬 스타일이랑 넘 달라."*). 학생이 눌러서 넘긴다.
            ⚠️ 여기서 «BFS» 라는 이름은 **부르지 않는다** — 이름은 ⚡코드 탭 끝에서 한 번만. */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          {/* ⭐ 2026-09-27 선생님: *"저게 버튼인지도 몰랐고."*
              흰 배경 + 얇은 주황 테두리라 바로 위 `− / +` 와 **똑같은 옷**이었고
              옆 회색 설명문과도 구별이 안 됐다. **꽉 찬 색 + 흰 글씨 + 큰 글자**로
              바꿔서 「이건 누르는 것」이 한눈에 보이게 한다. */}
          <button onClick={() => { setWaveMode(v => !v); setWaveIdx(0); }} style={{
            padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 800,
            border: "none", boxShadow: "0 2px 6px rgba(217,119,6,.30)",
            background: waveMode ? "#334155" : A,
            color: "#fff", cursor: "pointer", ...KA,
          }}>
            {waveMode
              ? t(E, "✕ Back to the finished picture", "✕ 다 칠한 그림으로")
              /* ⭐ 2026-09-27 학생: *"「번져간다」만 말하고 **지금 화면이 지워진다**는 말은
                 안 해서, 누르기 전엔 지금 보이는 초록칸이 없어질 거라고 짐작 못 했다."*
                 버튼 이름이 **누르면 무슨 일이 나는지**를 그대로 말하게 고친다. */
              : t(E, "▶ Clear it and colour one hop at a time", "▶ 다 지우고 한 번씩 뛰면서 칠해 보기")}
          </button>
        </div>

        {waveMode && (
          <div style={{ marginTop: 10 }}>
            <SimNav idx={waveIdx} total={lastWave + 1} onIdx={setWaveIdx} accent={A} showLabels isEn={E} />
          </div>
        )}

        {/* 2026-09-17: 150자가 한 덩어리였다 + D 를 만지기도 전에 결론이 다 떠 있었다.
            (mcc20cipher:27,109-118 의 touched 수법을 그대로 가져왔다.) */}
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
          whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
          {
            touched
              ? t(E,
                  /* 2026-09-27: 다섯 줄이었다. 위에 버튼을 하나 늘렸으니 여기서 갚는다
                     (`feedback_shorter_not_longer`). 셋째~다섯째 줄은 같은 말을 세 번 한다. */
                  "The rule is about the DIFFERENCE to a neighbor — not the height itself.\nSo no wall is fixed: the same edge opens for a big D and closes for a small one.",
                  "중요한 건 높이 자체가 아니라 이웃과의 '차이' 예요.\n그래서 같은 자리도 D 가 크면 열리고 작으면 막혀요.")
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
/* ⭐ 2026-09-27: 방향을 **말로만** 부르다가 6쪽 코드에서 갑자기 `dr[d]/dc[d]` 숫자쌍이
   튀어나왔다. pedagogy: *"진짜 점프는 5쪽→6쪽이다 — 말로 이해한 규칙을 코드가 다룰 수 있는
   모양(좌표쌍)으로 어떻게 바꾸나를 다루는 자리가 없다."*
   선생님(2026-09-27): *"결국 우리가 갈 수 있는게 위아래오른쪽왼쪽이라는거잖아.
   그러면 인덱스라던가? 고민해야하는것들…"*
   → **새 쪽을 만들지 않고** 걸음 문장의 방향 이름 옆에 「줄 −1」 같은 좌표를 붙인다.
   `lab` 이 그 꼬리표다. */
const DIRS = [
  { dr: -1, dc: 0, en: "up", ko: "위" },
  { dr: 1, dc: 0, en: "down", ko: "아래" },
  { dr: 0, dc: -1, en: "left", ko: "왼쪽" },
  { dr: 0, dc: 1, en: "right", ko: "오른쪽" },
];
function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
/** 방향 이름 뒤에 붙는 말 — 「왼쪽」에 「쪽」을 또 붙이면 «왼쪽쪽» 이 된다.
    (2026-09-27 실측으로 잡았다. 화면을 안 봤으면 그대로 나갔을 것이다.) */
function dirKo(d) { return d.ko.endsWith("쪽") ? d.ko : d.ko + "쪽"; }
/** 받침에 따라 조사를 고른다 — 「위은/아래으로」 같은 말이 나오면 애들이 먼저 걸린다.
    (2026-09-27 실측으로 잡았다. 화면을 안 읽었으면 그대로 나갔다.) */
function hasJong(w) {
  const c = w.charCodeAt(w.length - 1);
  return c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28 !== 0;
}
function josa(w, withJong, without) { return w + (hasJong(w) ? withJong : without); }
/** 여러 방향을 「·」 로 잇고 마지막 낱말 기준으로 조사를 붙인다. */
function joinKo(list, withJong, without) {
  const j = list.join("·");
  return josa(j, withJong, without);
}
/** 방향 이름 + **좌표가 어떻게 바뀌는지**. 6쪽 `dr/dc` 와 같은 값을 미리 보여준다. */
function dirLabel(d, E) {
  const n = (v) => (v < 0 ? "−1" : v > 0 ? "+1" : "0");
  return E
    ? `${capFirst(d.en)} (row ${n(d.dr)}, col ${n(d.dc)})`
    : `${d.ko} (줄 ${n(d.dr)}, 칸 ${n(d.dc)})`;
}

// The same border/middle numbers the old static picture used — border cells
// all match, but the gap to the middle equals D, so it's blocked.
const TRAP_H = [
  [10, 10, 10, 10],
  [10, 8, 8, 10],
  [10, 8, 8, 10],
  [10, 10, 10, 10],
];

function buildBfsProcessTrace(H, D, E, presetKey) {
  const R = H.length, Cn = H[0].length;
  const visited = Array.from({ length: R }, () => Array(Cn).fill(false));
  visited[0][0] = true;
  let queue = [[0, 0]];
  let count = 1;
  /* ⭐ 「줄」은 **갈 곳이 둘 이상이 되는 순간** 처음 나오고, 그 뒤로는 계속 보인다.
     검토 지적: 렌더에서 `queue.length >= 2` 로만 판정하면 줄이 다시 1개로 줄 때
     **패널이 사라졌다 나타난다.** 한 번 켜지면 안 꺼지게 걸음에 플래그를 실어 보낸다.
     ⚠️ 「몇 번째 걸음」으로 하드코딩하면 안 된다 — trap 프리셋(D=2)은 첫 칸에서
     두 방향이 바로 통과해 **더 이른 걸음**에 걸린다. 길이로 판정해야 둘 다 맞는다. */
  let queueNamed = false;
  const snap = () => {
    if (queue.length >= 2) queueNamed = true;
    return { visited: visited.map(row => row.slice()), queue: queue.slice(), count, queueNamed };
  };
  const trace = [];
  /* ⭐ 2026-09-26: 재검증 학생 — 시작·이름 문장이 "두 프리셋에서 토씨 하나 안
     틀리고" 반복됐다. main 을 먼저 보고 오는 게 기본값이니, trap 에서는
     되풀이하지 않고 짧게 다시 부른다(feedback_shorter_not_longer). */
  const isRepeatVisit = presetKey === "trap";

  trace.push({
    ...snap(), current: null, checking: null, status: "start",
    msg: isRepeatVisit
      ? t(E,
          "Same start, new grid — (1,1) again.",
          "이번에도 (1,1)에서 시작해요.")
      /* ⭐ 2026-09-27 선생님: *"BFS에 대한 개념을 아는 사람들은 너가 저 시뮬을 왜할려는건지
         알겠는데 **사실 내가 있는곳에서 위아래오른쪽왼쪽이잖아.**"*
         맞다. 첫 문장이 *"줄에 넣고 시작해요"* 였다 — **왜 줄이 필요한지 겪기도 전에**
         자료구조부터 나왔다. 그건 BFS 를 **아는 사람의 순서**다.
         `feedback_first_concept_scaffolding`: 아는 것 → 새 생각법 → **이름은 나중**.
         줄은 「갈 곳이 둘 이상」이 되는 순간에 나온다(아래 needQueue). */
      : t(E,
          "I'm standing on (1,1).\nLet's look around from here.",
          "나는 (1,1) 에 서 있어요.\n여기서 둘러봐요."),
  });

  /* 1단계 — 처음 **한 번**의 pop 만 «한 걸음에 한 방향» 으로 자세히 본다.
     그 한 번이면 네 가지 결과가 다 나온다: 격자 밖 · 막힘 · 통과 · 이미 다녀옴.
     나머지는 아래 2단계에서 «한 겹» 씩 묶는다.
     ⭐ 2026-09-27: 원래 **둘**이었는데 하나로 줄였다. **독립 학생 둘이 같은 자리에서
     같은 말을 했다** — *"6~7번째 클릭쯤부터 패턴이 이미 파악됐는데 그 뒤로도 13번을 더
     눌러야 했다"* · *"중간부터는 그냥 다음다음 누르기만 했어."*
     `feedback_student_agent_must_quit` — 같은 신호가 두 번 겹치면 약한 신호가 아니다.
     ⚠️ 재설계가 아니라 **이미 있던 손잡이를 하나 돌린 것**이다(PM 판정). */
  let popIdx = 0;
  while (queue.length && popIdx < 1) {
    const [r, c] = queue[0];
    queue = queue.slice(1);

    {
      trace.push({
        ...snap(), current: [r, c], checking: null, dirIdx: null, checkedDirs: 0, status: "pop",
        msg: t(E,
          `From (${r + 1},${c + 1}) — up, down, left, right.\nOne at a time.`,
          `(${r + 1},${c + 1}) 에서 위·아래·왼쪽·오른쪽.\n하나씩 봐요.`),
      });
      for (const [di, d] of DIRS.entries()) {
        const nr = r + d.dr, nc = c + d.dc;
        const inBounds = nr >= 0 && nr < R && nc >= 0 && nc < Cn;
        let status, msg;
        if (!inBounds) {
          status = "oob";
          msg = t(E,
            `${capFirst(d.en)} — nothing there.`,
            `${dirKo(d)}은 칸이 없어요.`);
        } else if (visited[nr][nc]) {
          status = "visited";
          msg = t(E,
            `${capFirst(d.en)} — already been there.`,
            `${dirKo(d)}은 이미 다녀왔어요.`);
        } else {
          const diff = Math.abs(H[nr][nc] - H[r][c]);
          if (diff < D) {
            status = "pass";
            visited[nr][nc] = true;
            queue = [...queue, [nr, nc]];
            count++;
            msg = t(E,
              `${capFirst(d.en)} — can go!\nThe gap is ${diff}, under ${D}.`,
              `${dirKo(d)}은 갈 수 있어요!\n높이 차이가 ${diff}, ${D} 보다 작아요.`);
          } else {
            status = "blocked";
            msg = t(E,
              `${capFirst(d.en)} — blocked.\nThe gap is ${diff}, not under ${D}.`,
              `${dirKo(d)}은 막혀요.\n높이 차이가 ${diff}, ${D} 보다 작지 않아요.`);
          }
        }
        /* ⭐ `dirIdx` 를 같이 넘긴다 — 격자 **밖** 이웃은 `checking` 이 null 이라
           칸 좌표로는 가리킬 수 없다. 「위 없음」 자리를 화면에 표시하려면 방향이 필요하다. */
        trace.push({ ...snap(), current: [r, c], checking: inBounds ? [nr, nc] : null,
          dirIdx: di, checkedDirs: di + 1, status, msg });
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
  /* ⭐ 2026-09-27 선생님: *"아니야. **내가 있는것 기준으로 하나씩** 되어야지
     **퍼져가는것 이해가 안돼**"* — 겹(wave)을 걷어낸다.
     겹은 「한 번에 여러 칸이 동시에」라 **서 있는 자리가 사라진다.** 학생이 보는 건
     「나는 여기 있고, 내 위·아래·왼쪽·오른쪽은 어떤가」 하나뿐이어야 한다.
     ⚠️ 2026-09-26 에 반대 방향으로 한 번 갔었다(pop 하나씩 → 지루하다 → 겹으로 묶음).
     그때 지루했던 진짜 이유는 **걸음 수가 아니라 한 걸음이 방향 하나였던 것**이다.
     이번엔 **한 걸음 = 칸 하나**, 네 방향은 **한 화면에 그림으로 같이** 보여준다.
     `feedback_one_thing_changes_at_a_time` — 바뀌는 자리는 「지금 서 있는 칸」 하나. */
  while (queue.length) {
    const [r, c] = queue[0];
    queue = queue.slice(1);
    /* ⭐ 2026-09-27 선생님: *"**두군데가 더 생긴게 아니라 갔던곳은 가는게 아니니까**
       원래는 위아래오른쪽왼쪽이잖아. 그런게 잘 안나타나고 **말도 부자연스러워**"*
       「N 군데 늘었어요」는 **결과 숫자**다. 학생이 실제로 하는 건 **네 방향을 하나씩 보고
       «갈까 말까» 를 정하는 것**이고, 그중 하나가 **「거긴 벌써 갔잖아」** 다.
       방향 넷을 **이름으로** 말하고, 갔던 곳·막힘·없음을 그대로 드러낸다. */
    const added = [], blocked = [], goKo = [], seenKo = [], blockKo = [], noneKo = [];
    const goEn = [], seenEn = [], blockEn = [], noneEn = [];
    for (const d of DIRS) {
      const nr = r + d.dr, nc = c + d.dc;
      if (nr < 0 || nr >= R || nc < 0 || nc >= Cn) { noneKo.push(d.ko); noneEn.push(d.en); continue; }
      if (visited[nr][nc]) { seenKo.push(d.ko); seenEn.push(d.en); continue; }
      if (Math.abs(H[nr][nc] - H[r][c]) < D) {
        visited[nr][nc] = true;
        queue = [...queue, [nr, nc]];
        count++;
        added.push([nr, nc]); goKo.push(d.ko); goEn.push(d.en);
      } else {
        blocked.push([nr, nc]); blockKo.push(d.ko); blockEn.push(d.en);
      }
    }
    const here = t(E, `Now I'm on (${r + 1},${c + 1}).`, `이제 (${r + 1},${c + 1}) 에 서 있어요.`);
    const ko = [], en = [];
    if (goKo.length)    { ko.push(`${joinKo(goKo, "으로", "로")} 갈 수 있어요`);        en.push(`${goEn.join(", ")} — I can go`); }
    if (seenKo.length)  { ko.push(`${joinKo(seenKo, "은", "는")} 벌써 갔던 곳`);        en.push(`${seenEn.join(", ")} — been there`); }
    if (blockKo.length) { ko.push(`${joinKo(blockKo, "은", "는")} 막혔어요`);           en.push(`${blockEn.join(", ")} — blocked`); }
    if (noneKo.length)  { ko.push(`${joinKo(noneKo, "은", "는")} 칸이 없어요`);         en.push(`${noneEn.join(", ")} — no cell`); }
    const tail = "\n" + t(E, en.join(". ") + ".", ko.join(". ") + ".");
    trace.push({
      ...snap(), current: [r, c], checking: null, dirIdx: null, checkedDirs: 4,
      wave: added, blocked, popped: [[r, c]],
      status: added.length ? "pass" : "blocked",
      msg: here + tail,
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
    msg: isRepeatVisit
      ? t(E,
          "Same method as before.",
          "방법은 방금과 똑같아요.")
      : t(E,
          "Spreading out with a waiting line, one cell at a time — that's called BFS.\nThe waiting line itself is called a queue.",
          "이렇게 줄을 하나씩 꺼내며 번져 나가는 방법을 «BFS» 라고 불러요.\n그 줄은 «큐» 라고 불러요."),
  });

  return trace;
}

/* ⭐ 2026-09-26: 재검증 학생 — *"「흔한 실수 예제」라고 이름 붙여놓고 실제로는
   실수하는 장면이 하나도 안 나왔다. 그냥 D=2 로 한 번 더 정상적으로 BFS 를 도는
   것뿐. 「뭐가 실수라는 거지?」 하고 넘어갔다."* 이 프리셋이 실제로 보여주는 건
   "가운데는 서로 통해도 테두리에서 못 들어간다" 는 것 — 이름을 그것에 맞춘다
   (feedback_shorter_not_longer — 화면을 더 만드는 대신 이름 한 줄만 고친다). */
const BFS_PRESETS = [
  { key: "main", H: SIM_H, D: 5, en: "🌆 Main example (D=5)", ko: "🌆 메인 예제 (D=5)" },
  { key: "trap", H: TRAP_H, D: 2, en: "🧊 Trapped cells (D=2)", ko: "🧊 갇힌 칸 예제 (D=2)" },
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
  const trace = useMemo(() => buildBfsProcessTrace(preset.H, preset.D, E, presetKey), [presetKey, E]);
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
        {/* ⭐ 2026-09-27 ①: 새 학생 — *"둘 다 처음엔 «어 또 이거네» 싶었다.
            첫 3~4번 클릭까지는 진짜 겹친다고 느꼈다 — 같은 그림, 같은 색, 같은 시작 칸이라서."*
            그런데 이어서 *"«아까 본 걸 이번엔 코드가 실제로 하는 순서로 더 자세히 본다»는
            느낌"* 이라고 했다. **빼지 않고 잇는다** — 앞 쪽과 이 쪽이 어떻게 다른지를
            첫 화면에서 말해 준다(`feedback_screen_must_not_rely_on_memory` — 앞 쪽은 사라진다). */}
        <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 8, lineHeight: 1.55, ...KA }}>
          {t(E,
            /* ⭐ 2026-09-27 선생님: *"위에 있는건 애들이 읽을까?"* — 안 읽는다.
               세 문장짜리 회색 덩어리였다. 한 줄로 줄인다
               (`feedback_narration_short` · `feedback_shorter_not_longer`). */
            "Same spreading — but one cell at a time.",
            "앞에서 본 그 번짐을 이번엔 한 칸씩 봐요.")}
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

        {/* queue — a horizontal row of tiles, leftmost = next to pop
            ⭐ 2026-09-27 선생님: *"BFS 아는 사람은 왜 하는지 알겠는데 사실 내가 있는곳에서
            위아래오른쪽왼쪽이잖아."* — 이 줄 패널이 **격자보다 위에 항상** 있었다.
            학생은 「줄」이 왜 있는지 모르는 채로 그걸 먼저 본다.
            **갈 곳이 둘 이상이 되는 순간**에만 나타나게 한다 — 그때 「어디부터 가지?」 라는
            질문이 생기고, 줄은 **그 질문의 답**이다. (`feedback_first_concept_scaffolding`) */}
        {cur.queueNamed && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4, ...KA }}>
            {t(E, "Two or more places to go — keep them in order. This line is the queue.",
                  "갈 곳이 둘 이상이네요 — 순서대로 세워 둬요. 이 줄이 «큐» 예요.")}
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
        )}

        {/* ⭐ 2026-09-27 — 말풍선을 **격자 바로 위**로 올린다(꼬리 ▼ 가 격자를 가리킨다).
            선생님이 2026-07-02 에 이미 주신 규칙이다(`feedback_sim_style_consistency`,
            **반복 지적** *"그건 내가 원하는게 아니라니까"*) — **말풍선 본체가 설명 대상
            옆으로 이동**해야 하고 「위치 고정 + 꼬리만 이동」은 금지. 참고 구현은 `mexes`.
            그동안 이건 **격자 아래 까만 띠에 고정**이었다. `see-screen --sim` 실측 —
            16걸음 중 14걸음이 *"바뀐 자리가 3~5군데로 283~471px 흩어짐"* 경고였다.
            큐 칩 → 말풍선 → 격자 → 칸 수 를 **한 덩어리로 붙인다.** */}
        {/* ⭐ 2026-09-27 선생님: *"말풍선이 잘 안보여. 디자인? 넌 괜찮은것 같지? 전체 기획에 맞춰서?"*
            **안 괜찮았다.** 자리만 옮기고 **생김새는 그대로 뒀다** — 까만 `#0f172a` 바탕에
            흰 글씨, 12px 고정폭(JetBrains Mono). 크림색(`#fffbeb`) 카드 안에서 **혼자 터미널**이었고,
            한국어 문장을 12px 고정폭으로 읽게 하고 있었다. 말풍선이 아니라 **코드 출력 상자**다.
            참고 구현(`mexes/sims.jsx:56-63`)은 **밝은 바탕 + 강조색 글씨 + 13px 굵게 + 💬 + 그림자**이고,
            **걸음 종류에 따라 색이 바뀐다.** 그대로 맞춘다 — 발명하지 않는다.
            색이 바뀌면 「이번 걸음에 무슨 일이 났나」가 **글을 읽기 전에** 보인다. */}
        {/* ⭐ 2026-09-27: 칸 수가 **격자 아래**에 있어서 말풍선과 250px 떨어져 있었다
            (`see-screen --sim` 경고). 걸음마다 바뀌는 건 말풍선·칸수·격자 셋인데,
            셋이 붙어 있어야 눈이 한 군데만 본다. 말풍선 바로 밑으로 올린다. */}
        {/* ⭐ 2026-09-27: 여기와 아래 걸음 카운터가 **둘 다 「X / 20」** 이었다.
            끝까지 가면 분모까지 같아져서 «18 / 20» 과 «20/20» 이 한 화면에 나란히 떴다.
            게다가 눈에 띄는 건 이쪽(진한 갈색·크다)인데 **네 걸음 동안 안 변한다** —
            선생님(2026-09-27): *"시뮬레이션에서 다음 버튼이 눌러지는것 같지도 않아."*
            새 학생도 같은 말을 했다: *"처음 9번 클릭 중 4번은 격자도 큐도 숫자도 안 바뀌어서
            «방금 누른 게 진짜 눌린 거 맞나» 싶었을 것."*
            `feedback_same_number_two_meanings` 의 처방 셋을 그대로 쓴다 —
            ①값 옆에 **무엇의 20인지 이름표** ②뜻이 다르면 **모양도 가른다**
            (이쪽은 맨 글자, 걸음 쪽은 알약 칩) ③출처와 같은 색. */}
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 12.5, color: "#92400e" }}>
          {t(E, "cells reached ", "갈 수 있다고 확인한 칸 ")}<b style={{ color: A }}>{cur.count}</b>
          <span style={{ color: C.dim }}> / {R * Cn} {t(E, "cells", "칸")}</span>
        </div>
        {/* height grid */}
        {/* ⭐ 2026-09-27 선생님: *"이건 말풍선이라기 보다는 그냥 위에 박혀있는거잖아.
            난 **화면 위에 있는 말풍선**을 예전에 얘기했었고"* — 맞다.
            `feedback_sim_style_consistency`(2026-07-02) 에 이미 적혀 있다:
            **absolute + zIndex, 대상에 앵커, 아래 콘텐츠를 좀 가려도 OK.**
            나는 흐름 안에 블록으로 박아 뒀다 — 「위치 고정」의 변종일 뿐이었다.
            이제 격자를 `relative` 로 감싸고 말풍선이 **지금 보는 칸 옆에 떠서** 따라다닌다. */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center",
          paddingTop: BUBBLE_H + 10, marginBottom: 10 }}>
          {(() => {
            const tone = {
              pass:    { bg: "#ecfdf5", bd: "#059669", fg: "#065f46" },
              blocked: { bg: "#fef2f2", bd: "#dc2626", fg: "#991b1b" },
              oob:     { bg: "#f1f5f9", bd: "#94a3b8", fg: "#475569" },
              visited: { bg: "#f1f5f9", bd: "#94a3b8", fg: "#475569" },
            }[cur.status] || { bg: "#fffbeb", bd: "#d97706", fg: "#92400e" };
            // 말풍선이 붙을 칸 — 지금 보는 이웃이 있으면 거기, 없으면 꺼낸 칸
            // 말풍선이 가리킬 칸 — 지금 보는 이웃 > 꺼낸 칸 > 이번에 새로 들어온 칸
            const anchor = cur.checking || cur.current || (cur.wave && cur.wave[0]) || [0, 0];
            const ac = anchor[1];
            const CELL = 42, GAP = 8;
            const gridW = Cn * CELL + (Cn - 1) * GAP;
            const cx = ac * (CELL + GAP) + CELL / 2;
            /* ⭐ 2026-09-27 선생님: *"화면을 가리네"* — 규칙은 «좀 가려도 OK» 인데
               격자를 **통째로 덮고** 있었다(칸 위에 겹쳐 놨다).
               참고 구현 `mexes` 는 **상자를 안 덮는다** — 위/아래에 두고 **꼬리만** 대상을 가리킨다.
               그대로 맞춘다: 말풍선은 격자 **바깥 위**에 뜨고(자리를 미리 비워 둔다),
               꼬리가 **지금 보는 칸의 세로줄**을 가리킨다. 격자는 하나도 안 가린다. */
            return (
              <div style={{
                position: "absolute", zIndex: 20, left: `calc(50% - ${gridW / 2}px)`,
                bottom: `calc(100% - ${BUBBLE_H}px)`, width: gridW, pointerEvents: "none",
              }}>
                <div style={{
                  background: tone.bg, border: `2px solid ${tone.bd}`, color: tone.fg,
                  borderRadius: 12, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.5,
                  textAlign: "center", fontWeight: 700, whiteSpace: "pre-line",
                  boxShadow: "0 6px 20px rgba(0,0,0,.14)", ...KA,
                }}>💬 {cur.msg}</div>
                {/* 꼬리 — 지금 보는 **그 칸의 세로줄**을 가리킨다 */}
                <div aria-hidden="true" style={{
                  position: "absolute", left: cx - 8, top: "100%",
                  width: 0, height: 0, transition: "left 160ms",
                  borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                  borderTop: `8px solid ${tone.bd}`,
                }} />
              </div>
            );
          })()}
          {/* ⭐ 2026-09-27 선생님: *"이웃하는 4군데라는것을 보여주려면 **네군대를 표시**하면서
              처음으넨 **위 왼쪽 없는것 전부 다 단계적으로** 보여줘야지"*
              격자 **밖**에 있는 이웃은 지금까지 «격자 밖이에요» 라는 **말로만** 있었다.
              자리를 안 보여주니 「이웃이 넷」이 안 보인다. 유령 칸으로 그 자리를 표시한다. */}
          {cur.current && (() => {
            const [pr, pc] = cur.current;
            const CELL = 42, GAP = 8;
            const gridW = Cn * CELL + (Cn - 1) * GAP, gridH = R * CELL + (R - 1) * GAP;
            return (
              /* 🐛 2026-09-27 선생님이 화면에서 잡으셨다 — 유령 칸이 **격자 위로 떠올라**
                 프리셋 버튼 옆에 붙어 있었다. 원인: 이 겹침 판이 `top: 0` 인데 그 기준이
                 **격자가 아니라 바깥 상자**다. 말풍선 자리로 `paddingTop: BUBBLE_H + 10` 을
                 준 뒤로 그만큼 **위로 밀려 있었다.** 격자 시작점에 맞춘다. */
              <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none",
                left: `calc(50% - ${gridW / 2}px)`, top: BUBBLE_H + 10, width: gridW, height: gridH }}>
                {DIRS.map((d, di) => {
                  const nr = pr + d.dr, nc = pc + d.dc;
                  const outside = nr < 0 || nr >= R || nc < 0 || nc >= Cn;
                  const isNow = cur.dirIdx === di;
                  // 격자 밖이면 «그 자리» 를 유령 칸으로, 안이면 점선 테두리만
                  const seen = cur.checkedDirs != null && di < cur.checkedDirs;
                  return (
                    <div key={di} style={{
                      position: "absolute",
                      left: nc * (CELL + GAP), top: nr * (CELL + GAP),
                      width: CELL, height: CELL, borderRadius: 7, boxSizing: "border-box",
                      border: isNow ? `3px dashed ${A}` : `2px dashed ${seen ? "#cbd5e1" : "#fcd34d"}`,
                      background: outside ? (isNow ? "rgba(217,119,6,.12)" : "rgba(148,163,184,.10)") : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 800, color: isNow ? A : "#cbd5e1",
                      transition: "all 160ms",
                    }}>{outside ? t(E, "none", "없음") : ""}</div>
                  );
                })}
              </div>
            );
          })()}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 42px)`, gap: 8 }}>
            {preset.H.map((row, r) => row.map((h, c) => {
              const at = (list) => list && list.some(([wr, wc]) => wr === r && wc === c);
              const isCurrent = cur.current && cur.current[0] === r && cur.current[1] === c;
              const isChecking = cur.checking && cur.checking[0] === r && cur.checking[1] === c;
              const isNew = at(cur.wave);            // 이번 걸음에 **새로 들어온** 칸
              const isBlocked = at(cur.blocked);     // 이번 걸음에 **막힌** 칸
              const isPopped = at(cur.popped);       // 이번 걸음에 **꺼낸** 칸 (여기서 둘러봤다)
              const isVisited = cur.visited[r][c];

              /* ⭐ 2026-09-27: 셋이 **채움색으로** 갈린다. 전에는 전부 연초록 바탕에
                 테두리만 달라서 *"색도 똑같고 한 단계가 뭘 하는지 안 보인다"* 였다. */
              let bg = isVisited ? "#d1fae5" : "#f3f4f6";   // 이미 간 칸 / 아직 못 간 칸
              let border = isVisited ? "2px solid #6ee7b7" : "2px solid #e5e7eb";
              let fg = isVisited ? "#065f46" : "#9ca3af";
              let ring = "none";
              if (isPopped) { border = `2.5px solid ${A}`; }
              if (isNew) {                                   // 새 칸 — 진한 초록으로 확 튄다
                bg = "#34d399"; fg = "#04372a";
                border = "2.5px solid #047857";
                ring = "0 0 0 3px rgba(4,120,87,.22)";
              }
              if (isBlocked) {                               // 막힌 칸 — 빨강
                bg = "#fee2e2"; fg = "#991b1b";
                border = "2.5px solid #dc2626";
              }
              if (isChecking) border = `2.5px solid ${statusColor}`;
              else if (isCurrent && !isNew && !isBlocked) border = `2.5px solid ${A}`;
              return (
                <div key={`${r}-${c}`} style={{
                  width: 42, height: 42, borderRadius: 7, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", position: "relative",
                  background: bg, border, color: fg, boxShadow: ring,
                  fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5,
                  transition: "all 160ms",
                }}>
                  {r === 0 && c === 0 && <span style={{ fontSize: 9, lineHeight: 1 }}>🐰</span>}
                  <span>{h}</span>
                  {isBlocked && <span style={{
                    position: "absolute", top: -1, right: 2, fontSize: 11, color: "#dc2626", fontWeight: 900,
                  }}>✕</span>}
                </div>
              );
            }))}
          </div>
        </div>



        {/* ⭐ 2026-09-27: 색을 갈랐으면 **그 색이 무슨 뜻인지**도 그 자리에 있어야 한다.
            `feedback_screen_must_not_rely_on_memory` — 화면은 앞 쪽 기억에 기대면 안 된다. */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap",
          fontSize: 10.5, color: "#92400e", marginBottom: 8, ...KA }}>
          {[
            { bg: "#34d399", bd: "#047857", ko: "이번에 새로", en: "new now" },
            { bg: "#fee2e2", bd: "#dc2626", ko: "막힘", en: "blocked" },
            { bg: "#d1fae5", bd: "#6ee7b7", ko: "이미 감", en: "already in" },
            { bg: "#f3f4f6", bd: "#e5e7eb", ko: "아직", en: "not yet" },
          ].map(k => (
            <span key={k.ko} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: k.bg,
                border: `1.5px solid ${k.bd}`, display: "inline-block" }} />
              {t(E, k.en, k.ko)}
            </span>
          ))}
        </div>

        {/* 공용 SimNav — ⏮ 처음부터 · ◀ 이전 · [걸음 N/총] · ▶ 다음.
            카운터가 버튼 **사이**에 들어간다(형제 시뮬 전부 같은 모양). */}
        <div style={{ marginTop: 12 }}>
          <SimNav idx={idx} total={maxStep + 1} onIdx={setStep} accent={A} showLabels isEn={E} />
        </div>

        {/* ⭐ 2026-09-26: 재검증 학생 *"이름을 얻으려고 20번 넘게 눌러야 하는 건 지쳤다"*.
            `feedback_student_agent_must_quit` — 막지 말고 **나가는 문**을 준다.
            SimNav 에는 없는 버튼이라 그 아래 한 줄로 따로 둔다(네비가 아니라 지름길). */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <button onClick={() => setStep(maxStep)} disabled={idx === maxStep} style={{
            padding: "5px 12px", borderRadius: 8, fontSize: 11.5, fontWeight: 700,
            border: "1.5px dashed", background: "transparent",
            color: idx === maxStep ? "#cbd5e1" : A, cursor: idx === maxStep ? "default" : "pointer",
            borderColor: idx === maxStep ? "#e5e7eb" : A,
          }}>{t(E, "Skip to the end", "끝까지 건너뛰기")} ▶▶</button>
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
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
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
          "Why not sweep the whole grid again and again?\nThe grid can hold M×N = 100,000 cells, and sweeping it that many times is 100,000 × 100,000 = 10^10 checks.\nSo we visit each cell just once — mark where we've been in a vector<vector<bool>>, and put cells waiting their turn in a queue<pair<int,int>>, pairing up (row, col) like a Python tuple.",
          "왜 지도를 몇 번씩 다시 훑지 않을까요?\n칸이 최대 M×N = 100,000 개인데 그걸 그만큼 되풀이하면 100,000 × 100,000 = 10^10 번이에요.\n그래서 칸마다 딱 한 번만 가요 — 다녀온 곳은 vector<vector<bool>> 에 적고, 차례를 기다리는 칸은 pair 로 줄 번호·칸 번호를 묶어 queue<pair<int,int>> 에 넣어요.") },
          /* ⭐ 파이썬 쪽 [(-1,0),(1,0),(0,-1),(0,1)] 을 오늘 방향까지 풀어 설명했다
             (선생님 라이브 지적 + 재검증 학생). C++ 은 dr[]/dc[] 두 배열로 나뉘어
             있어서 그 대응을 여기서 짚는다 — 그대로 번역하면 안 되는 자리다. */
        { hi: [24, 25], bubble: t(E,
          "Lay out the four directions as arrays ahead of time — dr[0],dc[0]=(-1,0) up, dr[1],dc[1]=(1,0) down,\ndr[2],dc[2]=(0,-1) left, dr[3],dc[3]=(0,1) right.\nOne index d pairs the two arrays together.",
          "네 방향을 미리 배열로 적어 둬요 — dr[0], dc[0] = (-1, 0) 은 위, dr[1], dc[1] = (1, 0) 은 아래,\ndr[2], dc[2] = (0, -1) 은 왼쪽, dr[3], dc[3] = (0, 1) 은 오른쪽이에요.\n숫자 d 하나로 두 배열을 짝지어 써요.") },
        /* ⭐ 2026-09-26: py 쪽과 같은 이유로 "BFS 라고 불러요" 정의를 뺐다 —
           5쪽(BFS 과정 스테퍼) 마지막 걸음과 토씨 하나 안 틀리게 겹쳐서
           1클릭 거리에 같은 문장이 두 번 있었다. front()/pop() ↔ popleft() 대응은
           C++ 만의 새 정보라 남긴다. */
        { hi: [26, 28], bubble: t(E,
          "This is the same method you just saw. Keep going while the queue isn't empty, and each time look at the front cell with front() and remove it with pop() — the same job as Python's popleft().",
          "방금 봤던 그 방법이에요.\n줄이 빌 때까지 계속하면서, 매번 맨 앞의 칸을 front() 로 보고 pop() 으로 꺼내요 — 파이썬의 popleft() 와 같은 일이에요.") },
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
        "Why not sweep the whole grid again and again?\nThe grid can hold M×N = 100,000 cells, and sweeping it that many times is 100,000 × 100,000 = 10^10 checks.\nSo we go to each cell just once — we need a note of where we've been, and a line of cells waiting their turn.",
        "왜 지도를 몇 번씩 다시 훑지 않을까요?\n칸이 최대 M×N = 100,000 개인데 그걸 그만큼 되풀이하면 100,000 × 100,000 = 10^10 번이에요.\n그래서 칸마다 딱 한 번만 가요 — 다녀온 곳을 적을 곳과, 차례를 기다리는 줄이 필요해요.") },
      /* ⭐ 2026-09-26: 재검증 학생이 **딱 하나**를 남겼다 —
         *"`deque` 가 무슨 뜻인지, `popleft()` 가 리스트의 무엇과 다른지 **한 번도 설명이
         없었다.** … 「리스트의 `.pop(0)` 도 되지만 느려서 `deque` 라는 걸 쓴다」 정도
         **한 줄이면** 됐을 것 같다."* — 처방까지 학생이 직접 말했다.
         🚨 **그 문장은 이미 있었다.** `getMcc20CityTourSections`(491~550줄, **PDF 전용**)에
         *"deque 의 popleft() 는 크기와 상관없이 바로 끝나는 연산이에요"* 라고 적혀 있는데
         **화면(CodeWalk)에는 없었다.** 이 quest 에서 **같은 모양의 사고가 두 번째**다
         (앞서 「1️⃣2️⃣3️⃣ 왜 이렇게」 단계별 설명도 PDF 에만 있었다).
         ⭐ **PDF 에만 있는 글은 학생이 안 본다.** 화면으로 옮긴다.
         🚨 2026-09-26 (같은 날 두 번째 재검증): 이 문장이 오히려 **다른 학생을
         쫓아냈다** — *"`deque` 니 `popleft()` 니 처음 보는 게 튀어나와서 뒤에는
         대충 훑고 넘겼다."* 원인 셋: ⓐ **뜻 없이 성능부터** 말함(`deque` 가
         뭔지 한 마디도 없이 `list.pop(0)` 비교부터 시작) ⓑ **「25강에서 배워요」**
         가 "몇 강까지 배웠는지도 모르는" 학생을 뒤처진 기분으로 만듦
         ⓒ 성능 비교(뒤 값을 한 칸씩 당기는 이유)가 "너무 앞서간 얘기"였음.
         `feedback_shorter_not_longer` — 늘리지 않고 **뜻 먼저, 성능은 한 줄로
         줄이고, 강의 번호는 뺀다.** */
      { hi: [17, 17], bubble: t(E,
        "deque IS that line — the one we called a queue a moment ago. Python just spells it deque.\nappend() puts a cell at the back, popleft() takes one from the front.",
        "deque 가 바로 그 줄이에요 — 방금 «큐» 라고 부른 그것. 파이썬에서 쓰는 이름이 deque 예요.\nappend() 로 뒤에 넣고, popleft() 로 앞에서 꺼내요.") },
      /* ⭐ 2026-09-26: 선생님이 라이브를 보시고 *"neighbor 또는 next 가 위아래오른쪽왼쪽인데"*
         라고 짚으신 자리. 재검증 학생도 같은 줄에서 걸렸다 —
         *"dr·dc 가 상하좌우를 어떻게 나타내는지는 안 짚어준다"*.
         숫자 넷이 각각 어느 쪽인지 그 자리에서 말한다.
         🚨 2026-09-26 (같은 날 두 번째 재검증): "BFS 라고 불러요" 정의가
         **5쪽(BFS 과정 스테퍼) 마지막 걸음과 토씨 하나 안 틀리고 같다** —
         1클릭 거리에서 두 번 나온다(pedagogy: "정보가 아니라 되풀이"). 이름은
         5쪽에 남기고, 여기는 "방금 봤던 그 방법" 으로 되짚기만 한다. */
      { hi: [20, 21], bubble: t(E,
        "This is the same method you just saw.\nKeep going while the line still has someone in it, and take the cell at the front each time.\nWhat comes out is a (row, col) pair — that is why it lands in two names at once: r, c = q.popleft().",
        "방금 봤던 그 방법이에요.\n줄에 누가 남아 있는 동안 계속하면서, 매번 줄 맨 앞의 칸을 꺼내요.\n꺼낸 건 (줄 번호, 칸 번호) 짝이라서 이름 두 개에 한꺼번에 담겨요 — 그게 r, c = q.popleft() 예요.") },
      { hi: [22, 23], bubble: t(E,
        "The four number pairs are the four directions — (-1,0) up, (1,0) down, (0,-1) left, (0,1) right.\nAdd one to the row and column number of where we stand, and you get that neighbor's place.",
        "숫자 짝 네 개가 곧 네 방향이에요 — (-1,0) 은 위, (1,0) 은 아래, (0,-1) 은 왼쪽, (0,1) 은 오른쪽.\n지금 서 있는 칸의 줄 번호·칸 번호에 하나씩 더하면 그 이웃의 자리가 나와요.") },
      { hi: [24, 25], bubble: t(E,
        "Step into a neighbor only when two things hold: it is still inside the grid and not yet visited, and the height gap is smaller than D.\n0 <= nr < M is two comparisons on one line — nr must be 0 or more AND under M.\nAnd H[nr][nc] has two brackets because you pick twice: first the row nr, then the cell nc in that row.",
        "이웃으로 들어가는 건 두 가지가 맞을 때예요 — 격자 안이면서 아직 안 간 칸이고,\n높이 차가 D 보다 작을 때요.\n0 <= nr < M 은 부등호를 두 개 이어 쓴 거예요 — nr 이 0 이상이면서 동시에 M 보다 작아야 해요.\nH[nr][nc] 에 대괄호가 두 개인 건 두 번 고르기 때문이에요 — 먼저 nr 번째 줄, 그 줄에서 nc 번째 칸.") },
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
