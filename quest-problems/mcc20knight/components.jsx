import { useState, useMemo, useEffect, useRef } from "react";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

// 8 knight L-moves: 2 in one axis, 1 in the perpendicular.
const MOVES = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];

// Minimum knight moves from (0,0) to (dx,dy) on an INFINITE board.
// BFS with a small negative margin so a short path may dip below 0
// (e.g. reaching (1,1) really needs 2 moves, not 4).
function minKnight(dx, dy) {
  dx = Math.abs(dx); dy = Math.abs(dy);
  const M = 4, LO = -M, HI = Math.max(dx, dy) + M, SIZE = HI - LO + 1;
  const ix = (v) => v - LO;
  const dist = Array.from({ length: SIZE }, () => new Array(SIZE).fill(-1));
  dist[ix(0)][ix(0)] = 0;
  const q = [[0, 0]]; let head = 0;
  while (head < q.length) {
    const [x, y] = q[head++];
    const d = dist[ix(x)][ix(y)];
    for (const [mx, my] of MOVES) {
      const nx = x + mx, ny = y + my;
      if (nx >= LO && nx <= HI && ny >= LO && ny <= HI && dist[ix(nx)][ix(ny)] === -1) {
        dist[ix(nx)][ix(ny)] = d + 1;
        q.push([nx, ny]);
      }
    }
  }
  return dist[ix(dx)][ix(dy)];
}

/* ─────────────────────────────────────────────────────────────
   Concept sim: pick a target square, see its MINIMUM moves, then
   nudge K. Green when K ≥ min AND (K − min) is even → reachable in
   EXACTLY K. Red otherwise. Teaches: extra moves come in pairs.
   ───────────────────────────────────────────────────────────── */
export function KnightExactSim({ E }) {
  const N = 7, SR = 3, SC = 3;          // 7×7 board, knight in the center
  const [pick, setPick] = useState({ r: 0, c: 0 });  // start target: offset (3,3)
  const dx = Math.abs(pick.r - SR), dy = Math.abs(pick.c - SC);
  const need = minKnight(dx, dy);
  const [k, setK] = useState(need);

  const reachable = k >= need && (k - need) % 2 === 0;
  /* 2026-09-17: 여기가 규칙을 먼저 말해 버리던 자리다. 시뮬은 판정과 **사실**만 보여준다
     (K, 최소, 남는 이동이 몇인지). "왜 짝수여야 하나" 는 바로 다음 퀴즈에서
     학생이 스스로 찾고, explain 에서 처음 밝힌다. */
  const reason = k < need
    ? t(E, `K = ${k}, minimum = ${need} — K is smaller than the minimum.`,
          `K = ${k}, 최소 = ${need} — K 가 최소보다 작아요.`)
    : t(E, `K = ${k}, minimum = ${need}, left over = ${k - need}.`,
          `K = ${k}, 최소 = ${need}, 남는 이동 = ${k - need}.`);

  const cellSize = 40;

  const clickCell = (r, c) => {
    if (r === SR && c === SC) return;
    const ndx = Math.abs(r - SR), ndy = Math.abs(c - SC);
    setPick({ r, c });
    setK(minKnight(ndx, ndy));   // reset K to the fresh minimum for a clean demo
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          ♞ {t(E, "Can it arrive in EXACTLY K moves?", "정확히 K번에 도착할 수 있을까?")}
        </div>
        {/* 2026-09-17: 75 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12,
          whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "Click a square to pick a target. Its MINIMUM number of moves appears.\nThen change K and watch:\ngreen means the knight can land there in exactly K moves.",
            "칸을 눌러 목표를 골라요. 그 칸까지 최소 이동이 나와요.\n그다음 K 를 바꿔 봐요.\n초록이면 정확히 K 번에 도착할 수 있다는 뜻이에요.")}
        </div>

        {/* 🐛 2026-10-01 — **K 버튼이 격자·캡션 아래에 있어 하단 고정 바에 먹혔다.**
            실측(모바일 375×812, 스크롤 0): 격자가 456~**740px**, 하단 고정 바
            (「◀ 이전 쪽 / 다음 쪽 ▶ / 목록」)가 **745~812px**. 옛 순서에서는 K 스테퍼가
            격자·캡션 **뒤**라 752px 이후에 놓였고 — **바 안쪽이다.**
            3쪽은 *"그다음 K 를 바꿔 봐요"* 라고 시키는데, 그 자리를 누르면 K 가 아니라
            「다음 쪽 ▶」이 눌려 **쪽이 넘어갔다** — 시키는 대로 했더니 그 쪽을 잃는다.
            → 형제 `mcc20citytour` 와 같은 순서로 **조작을 격자 위에** 둔다.
            고친 뒤 실측: 스테퍼 **414~444px**, 눌러서 K 2 → 3, 쪽은 3/5 그대로. */}
        {/* K stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12.5, color: "#1e3a8a", fontWeight: 700 }}>K =</span>
          <button onClick={() => setK(Math.max(0, k - 1))} style={kBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: A, minWidth: 26, textAlign: "center" }}>{k}</span>
          <button onClick={() => setK(k + 1)} style={kBtn}>+</button>
        </div>

        {/* board */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${N}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${N}, ${cellSize}px)`,
            border: `2px solid ${A}`, borderRadius: 8, overflow: "hidden",
            boxShadow: "0 2px 8px rgba(37,99,235,.15)",
          }}>
            {Array.from({ length: N * N }, (_, idx) => {
              const r = Math.floor(idx / N), c = idx % N;
              const isStart = r === SR && c === SC;
              const isTarget = r === pick.r && c === pick.c && !isStart;
              const checker = (r + c) % 2 === 0 ? "#f1f5f9" : "#dbe3ee";
              let bg = checker;
              if (isTarget) bg = reachable ? "#bbf7d0" : "#fecaca";
              return (
                <button
                  key={idx}
                  onClick={() => clickCell(r, c)}
                  disabled={isStart}
                  title={isStart ? t(E, "knight", "나이트") : `(${Math.abs(r - SR)},${Math.abs(c - SC)})`}
                  style={{
                    background: bg,
                    border: "1px solid #94a3b8",
                    cursor: isStart ? "default" : "pointer",
                    fontSize: isStart ? 22 : 15, fontWeight: 800,
                    color: isStart ? "#1e293b" : (isTarget ? (reachable ? "#166534" : "#991b1b") : "#94a3b8"),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 0, transition: "background .2s ease",
                  }}
                >
                  {isStart ? "♞" : isTarget ? String(need) : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* offset + min readout */}
        <div style={{ textAlign: "center", fontSize: 12.5, color: C.text, marginBottom: 10, ...KA }}>
          {/* 2026-09-17: "오프셋" 은 화면에서 한 번도 뜻을 안 밝힌 음차어였다.
              무엇에서 무엇을 뺀 값인지를 그 자리에서 말한다. */}
          {t(E, "gap from the knight to the target (rows, cols) ", "나이트에서 목표까지의 차이 (세로, 가로) ")}
          <b style={{ color: A, fontFamily: "'JetBrains Mono',monospace" }}>({dx}, {dy})</b>
          {t(E, "  ·  minimum moves = ", "  ·  최소 이동 = ")}
          <b style={{ color: A }}>{need}</b>
        </div>

        {/* verdict */}
        <div style={{
          background: reachable ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${reachable ? "#6ee7b7" : "#fca5a5"}`,
          borderRadius: 10, padding: "12px 14px", ...KA,
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: reachable ? "#065f46" : "#b91c1c", marginBottom: 4 }}>
            {reachable
              ? t(E, `✅ YES — reachable in exactly ${k} moves`, `✅ YES — 정확히 ${k}번에 도착 가능`)
              : t(E, `❌ NO — not in exactly ${k} moves`, `❌ NO — 정확히 ${k}번엔 불가능`)}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>{reason}</div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
          {/* ⚠️ 2026-09-29 — **학생 둘이 독립적으로** *"그 전까지는 계속 찍는 기분이었다"*
              고 했다(`feedback_student_agent_must_quit`: 같은 신호가 둘이면 약한 신호가 아니다).
              화면은 이미 **「남는 이동 = 2」** 를 보여주는데, 묻는 말이
              *"어떤 K 에서 초록인가요?"* 로 **막연했다** — 어디를 보라는 말이 없었다.
              ⛔ 답(짝수)은 여전히 안 준다. **볼 곳만 좁힌다** —
                `feedback_explain_why_certain_first` 의 「관찰 → 추론」 그대로. */}
          {t(E,
            "Keep the same target and push K up one at a time.\nWatch the «left over» number — for which values does it turn green?",
            "목표 칸을 그대로 두고 K 를 하나씩 올려 봐요.\n「남는 이동」 숫자를 보세요 — 그 값이 얼마일 때 초록이 되나요?")}
        </div>
      </div>
    </div>
  );
}
const kBtn = {
  width: 30, height: 30, borderRadius: 7, border: "1px solid #93c5fd", background: "#fff",
  color: "#1e3a8a", fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};


/* ================================================================
   SOLUTION CODE
   Precompute min knight moves once (BFS), then answer each query
   with:  exactly K  ⇔  K ≥ min  AND  (K − min) is even.
   ================================================================ */
const FULL_PY = [
  "from collections import deque",
  "",
  "# 나이트가 갈 수 있는 여덟 가지 (한쪽 2 칸, 다른 쪽 1 칸)",
  "MOVES = [(-2,-1),(-2,1),(-1,-2),(-1,2),",
  "         (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "# 차이 (dx, dy) 마다 최소 몇 번 움직이면 되나를 미리 구해요",
  "# (0,0) 에서 한 번만 퍼뜨려요. 가장자리를 조금 음수까지 두면",
  "# 0 아래로 살짝 도는 짧은 길도 잡혀요 ((1,1) 을 두 번에 가려면 필요해요)",
  "M = 4",
  "LO, HI = -M, 2000 + M",
  "SIZE = HI - LO + 1",
  "best = []",
  "for _ in range(SIZE):         # 줄마다 [-1, -1, …] 하나씩",
  "    best.append([-1] * SIZE)",
  "best[0 - LO][0 - LO] = 0",
  "q = deque([(0, 0)])",
  "while q:",
  "    x, y = q.popleft()",
  "    for dx, dy in MOVES:",
  "        nx, ny = x + dx, y + dy",
  "        if LO <= nx <= HI and LO <= ny <= HI and best[nx - LO][ny - LO] == -1:",
  "            best[nx - LO][ny - LO] = best[x - LO][y - LO] + 1",
  "            q.append((nx, ny))",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "T = 3",
  "cases = [[2, 0, 0, 3, 3], [5, -2, -2, 100, 100], [2, 0, 0, 1, 2]]",
  "out = []",
  "for K, X, Y, A, B in cases:",
  "    dx, dy = abs(X - A), abs(Y - B)",
  "    need = best[dx - LO][dy - LO]",
  "    # 딱 K 번이 되려면 — K 가 need 이상이고, 남는 (K - need) 가 짝수예요",
  "    if K >= need and (K - need) % 2 == 0:",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int dr[8] = {-2,-2,-1,-1, 1, 1, 2, 2};",
  "int dc[8] = {-1, 1,-2, 2,-2, 2,-1, 1};",
  "",
  "const int M = 4;",
  "const int LO = -M;",
  "const int HI = 2000 + M;",
  "const int SIZE = HI - LO + 1;",
  "vector<vector<int>> best(SIZE, vector<int>(SIZE, -1));",
  "",
  "int main() {",
  "",
  "    // 한 번만 퍼뜨려서 차이마다 최소 이동 횟수를 구해요",
  "    best[0 - LO][0 - LO] = 0;",
  "    queue<pair<int,int>> q;",
  "    q.push(make_pair(0, 0));",
  "    while (!q.empty()) {",
  "        int x = q.front().first;",
  "        int y = q.front().second;",
  "        q.pop();",
  "        for (int i = 0; i < 8; i++) {",
  "            int nx = x + dr[i];",
  "            int ny = y + dc[i];",
  "            if (nx>=LO && nx<=HI && ny>=LO && ny<=HI && best[nx-LO][ny-LO]==-1) {",
  "                best[nx-LO][ny-LO] = best[x-LO][y-LO] + 1;",
  "                q.push(make_pair(nx, ny));",
  "            }",
  "        }",
  "    }",
  "",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int T = 3;",
  "    int cases[3][5] = {",
  "        {2, 0, 0, 3, 3},",
  "        {5, -2, -2, 100, 100},",
  "        {2, 0, 0, 1, 2},",
  "    };",
  "    for (int c = 0; c < T; c++) {",
  "        int K = cases[c][0];",
  "        int X = cases[c][1];",
  "        int Y = cases[c][2];",
  "        int A = cases[c][3];",
  "        int B = cases[c][4];",
  "        int dx = abs(X - A);",
  "        int dy = abs(Y - B);",
  "        int need = best[dx - LO][dy - LO];",
  "        // 딱 K 번이 되려면 — K 가 need 이상이고, 남는 (K - need) 가 짝수예요",
  "        if (K >= need && (K - need) % 2 == 0) {",
  "            cout << \"YES\\n\";",
  "        } else {",
  "            cout << \"NO\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개라 "한 부분씩 읽어 봐요" 라고 해 놓고 읽을 데가 없었다.
   코드 글자는 한 자도 안 바꾸고 FULL_PY / FULL_CPP 를 잘라 세 부분으로 나눈다. */
const PY_SETUP = FULL_PY.slice(0, 15);   // L자 이동 목록 + 빈 표 만들기
const PY_BFS = FULL_PY.slice(15, 24);    // BFS 로 표 채우기
const PY_QUERY = FULL_PY.slice(25, 37);  // 질문마다 확인하기

const CPP_SETUP = FULL_CPP.slice(0, 14);
const CPP_BFS = FULL_CPP.slice(15, 34);
const CPP_QUERY = FULL_CPP.slice(35, 52);

/* ═══════════════════════════════════════════════════════════════════════
   BFS 과정 스테퍼 — 표가 **어떻게** 채워지는지 한 걸음씩 (2026-09-29)

   왜 생겼나 — `pedagogy-reviewer` 판정:
     *"`KnightExactSim` 은 **이미 계산된 결과**만 보여준다. 큐에서 칸을 꺼내고
       이웃을 확인하는 **과정 자체는 한 번도 안 보여준다.** 2-1 쪽은 산문 박스
       둘에서 곧바로 코드로 건너뛴다 — `mcc20citytour` 가 정확히 이 모양을
       걷어내고 과정 스테퍼로 바꾼 바로 그 결함이 그대로 남아 있다."*

   ⭐ 형제(`mcc20citytour` 의 `Mcc20CityTourBfsProcessStepper`)를 그대로 따른다.
      발명하지 않는다 — 공용 `useTraceStep` + `SimNav`, 밝은 말풍선 + 💬.
   ⭐ **이름(BFS)은 맨 마지막 걸음에만** 나온다. 그전엔 「방법」으로만 부른다
      (`feedback_first_concept_scaffolding` — 겪은 뒤에 이름).
   ⛔ 「동그라미가 퍼지듯」 비유는 **안 쓴다.** 나이트는 ㄴ자로 뛰어서 실제 모양이
      원이 아니다 — 학생이 문자 그대로 상상하면 **틀린 그림**이 남는다
      (`feedback_no_invented_terms` 의 「지우면 더 쉬워지나」 판정).
   ═══════════════════════════════════════════════════════════════════════ */

const KN_R = 5;   // 5×5 오프셋 격자 — 「칸이 없어요」가 나오도록 일부러 작게

/* 숫자 뒤 조사 — **한국어로 읽었을 때** 받침이 있나로 고른다.
   1(일)·3(삼)·6(육)·7(칠)·8(팔)·0(영) 은 받침이 있고, 2(이)·4(사)·5(오)·9(구) 는 없다.
   ⚠️ `hasJong` 은 한글 음절용이라 숫자에는 못 쓴다 — 그래서 따로 둔다.
   («4 이 채워져요» 가 나와서 고쳤다.) */
const NUM_JONG = { 0: true, 1: true, 2: false, 3: true, 4: false, 5: false, 6: true, 7: true, 8: true, 9: false };
const numJosa = (n, withJong, without) => `${n}${NUM_JONG[n % 10] ? withJong : without}`;

function buildKnightBfsTrace(E) {
  /* ⚠️ 2026-09-29 — **첫 판을 학생이 무너뜨렸다.** 고친 것 넷, 전부 학생 말이 근거다.

     ① *"11번째에 「한 칸씩 **꺼내면서**」라는데, 1~10걸음 어디에도 뭔가를 **꺼내는
        동작이 없었다**(그냥 격자에 숫자만 채워졌다). 그래서 「꺼낸다」가 뭘 말하는지 몰랐다."*
        → **줄(큐)을 화면에 그린다.** 형제 `citytour` 가 칩으로 그리는 것과 같은 모양.
          꺼내는 걸 **보여준 뒤에** 그 이름을 붙인다.
     ② *"9→10번째에서 갑자기 나머지 22칸이 전부 한꺼번에 나타났다. 제목이 「한 칸씩
        채워지는 걸 봐요」인데 3칸만 한 칸씩 보여주고 나머지는 순간이동 같았다."*
        → **겹(layer)마다 끊어서** 1 → 2 → 3 이 차례로 차는 걸 보여준다.
     ③ *"2,3,6,8번째는 격자가 안 바뀌는데 버튼을 눌러야 해서 「어 또 그대로네」 싶었다."*
        → 격자가 안 바뀌는 걸음은 **줄이 바뀌게** 한다(꺼내기·넣기). 빈 걸음을 없앤다.
     ④ *"`deque`·`popleft`·「큐」를 코드에서 처음 만났다 — 화면 전체에서 「큐」라는 낱말을
        한 번도 못 봤다."*  → 줄이 둘 이상이 되는 순간 **「줄」**이라고 부르고,
        마지막에 «이 줄을 코드에서는 deque 라고 부른다» 로 잇는다. */
  const dist = Array.from({ length: KN_R }, () => new Array(KN_R).fill(-1));
  dist[0][0] = 0;
  let queue = [[0, 0]];
  const trace = [];
  const snap = (extra) => ({ dist: dist.map(r => r.slice()), queue: queue.slice(), ...extra });

  trace.push(snap({ cur: [0, 0], look: null, status: "start",
    msg: t(E, "I'm standing on (0,0).\nLet's see where the knight can jump from here.",
             "나는 (0,0) 에 서 있어요.\n여기서 나이트가 갈 수 있는 곳을 봐요.") }));

  // ── 첫 칸을 **꺼낸다** — 줄에서 사라지는 게 눈에 보인다
  const [r0, c0] = queue[0];
  queue = queue.slice(1);
  trace.push(snap({ cur: [r0, c0], look: null, status: "pop",
    msg: t(E, "Take (0,0) out and look around from there.\nA knight jumps in an L — two one way, one across.",
             "(0,0) 을 꺼내서 거기서 둘러봐요.\n나이트는 ㄴ자로 뛰어요 — 한 쪽으로 2칸, 옆으로 1칸.") }));

  let shownOob = 0, shownPass = 0;
  for (const [mr, mc] of MOVES) {
    const nr = r0 + mr, nc = c0 + mc;
    if (nr < 0 || nr >= KN_R || nc < 0 || nc >= KN_R) {
      if (shownOob < 1) {
        shownOob++;
        trace.push(snap({ cur: [r0, c0], look: [nr, nc], status: "oob",
          msg: t(E, `(${nr},${nc}) is off the board — there's no such square.`,
                   `(${nr},${nc}) 는 격자 밖이에요 — 그런 칸이 없어요.`) }));
      }
      continue;
    }
    dist[nr][nc] = 1;
    queue = [...queue, [nr, nc]];
    if (shownPass < 2) {
      shownPass++;
      trace.push(snap({ cur: [r0, c0], look: [nr, nc], status: "pass",
        msg: t(E, `(${nr},${nc}) is empty — one jump gets me there.\nWrite 1, and put it at the back of the line.`,
                 `(${nr},${nc}) 는 비어 있어요 — 한 번에 닿아요.\n1 을 적고, 줄 맨 뒤에 세워 둬요.`) }));
    }
  }
  trace.push(snap({ cur: [r0, c0], look: null, status: "layer",
    msg: t(E, "The rest work the same way. Everything one jump away now holds 1,\nand they're all waiting in the line.",
             "나머지 여섯 방향도 같은 식이에요.\n줄을 보세요 — 1 이 적힌 칸들이 모두 거기 서서 기다려요.") }));

  // ── 두 번째 칸: 「이미 갔던 곳」 + 2 적기
  const [r1, c1] = queue[0];
  queue = queue.slice(1);
  trace.push(snap({ cur: [r1, c1], look: null, status: "pop",
    msg: t(E, `Take the front of the line — (${r1},${c1}) — and do exactly the same thing.`,
             `줄 맨 앞을 꺼내요 — (${r1},${c1}) — 그리고 똑같이 해요.`) }));
  let sawVisited = false, sawNew = false;
  for (const [mr, mc] of MOVES) {
    const nr = r1 + mr, nc = c1 + mc;
    if (nr < 0 || nr >= KN_R || nc < 0 || nc >= KN_R) continue;
    if (dist[nr][nc] !== -1) {
      if (!sawVisited) {
        sawVisited = true;
        trace.push(snap({ cur: [r1, c1], look: [nr, nc], status: "visited",
          msg: t(E, `(${nr},${nc}) already has a number, so I leave it alone.\nThe first number written is the shortest.`,
                   `(${nr},${nc}) 는 이미 숫자가 있어요 — 그래서 줄에 넣지 않아요.\n처음 적힌 값이 가장 짧은 횟수라 고칠 필요가 없거든요.`) }));
      }
      continue;
    }
    dist[nr][nc] = 2;
    queue = [...queue, [nr, nc]];
    if (!sawNew) {
      sawNew = true;
      trace.push(snap({ cur: [r1, c1], look: [nr, nc], status: "pass",
        msg: t(E, `(${nr},${nc}) is still empty — two jumps. Write 2 and line it up.`,
                 `(${nr},${nc}) 는 아직 비어 있어요 — 두 번 만에 닿아요. 2 를 적고 줄에 세워요.`) }));
    }
  }

  /* ── 나머지를 **겹마다 끊어서** 보여준다.

     ⚠️ 2026-09-29 (2판) — 재검증 학생이 **막힘**으로 보고했다:
       *"13·14번째 말풍선은 「줄이 비었어요」라는데 그 밑에 「차례를 기다리는 줄 · 1」
         이라고 써 있고 안에 `2,1` 이 그대로 남아 있었다. 「어? 비었다면서 왜 있지?」
         하고 멈칫했다."*
       원인 — `if (!thisLayer.length) break;` 로 빠져나오면서 **줄을 안 비웠다.**
       내 코드 버그다. 겹 번호를 하드코딩하지 말고 **줄에 남은 가장 작은 값**으로 잡는다
       → 줄이 반드시 빈다.
     ⚠️ 같은 학생: *"1~9걸음은 한 칸씩 천천히인데 10~11걸음은 갑자기 왕창 채워져서
       리듬이 갑자기 바뀐다."*  → **바뀐다고 말해 준다.** 화면이 말 안 하면 학생은
       「내가 뭘 놓쳤나」로 읽는다. */
  let first = true;
  while (queue.length) {
    const layerNow = Math.min(...queue.map(([r, c]) => dist[r][c]));
    const thisLayer = queue.filter(([r, c]) => dist[r][c] === layerNow);
    queue = queue.filter(([r, c]) => dist[r][c] !== layerNow);
    let added = 0;
    for (const [r, c] of thisLayer) {
      for (const [mr, mc] of MOVES) {
        const nr = r + mr, nc = c + mc;
        if (nr < 0 || nr >= KN_R || nc < 0 || nc >= KN_R) continue;
        if (dist[nr][nc] !== -1) continue;
        dist[nr][nc] = layerNow + 1;
        queue = [...queue, [nr, nc]];
        added++;
      }
    }
    if (!added) continue;             // 새로 채운 게 없으면 걸음을 만들지 않는다
    const lead = first
      ? t(E, "From here on I'll take a whole batch at a time.\n",
             "여기서부터는 한 겹씩 묶어서 볼게요.\n")
      : "";
    first = false;
    trace.push(snap({ cur: null, look: null, status: "layer",
      msg: lead + t(E, `Empty the line of every ${layerNow} — that fills in the ${layerNow + 1}s.`,
                      `줄에 선 ${layerNow} 들을 다 꺼내고 나면 ${numJosa(layerNow + 1, "이", "가")} 채워져요.`) }));
  }

  trace.push(snap({ cur: null, look: null, status: "done",
    msg: t(E, "The line is empty, so every square already has its smallest number.",
             "줄이 비었어요 — 모든 칸이 이미 가장 작은 숫자를 갖고 있다는 뜻이에요.") }));
  trace.push(snap({ cur: null, look: null, status: "named",
    msg: t(E, "Taking the front of the line each time, nearest first — that method is called BFS.\nIn the code the line is a deque, and taking the front is popleft().",
             "이렇게 줄 맨 앞을 하나씩 꺼내며 가까운 곳부터 채우는 방법을 BFS 라고 불러요.\n코드에서는 이 줄을 deque, 맨 앞을 꺼내는 걸 popleft() 라고 써요.") }));
  return trace;
}

export function Mcc20KnightBfsProcessStepper({ E }) {
  const trace = useMemo(() => buildKnightBfsTrace(E), [E]);
  const { safe, setIdx: rawSetIdx, total, step } = useTraceStep(trace, "mcc20knight-bfs");
  const st = step || trace[0];
  /* 🐛 2026-10-01 — **걸음을 눌러 가면 말풍선이 화면 위로 밀려 사라졌다.** 걸음 버튼이
     시뮬 맨 아래, 말풍선이 맨 위라 누를수록 말풍선이 위로 올라간다. 형제
     `mcc20citytour` 가 2026-09-27 에 같은 모양을 고친 방법을 그대로 가져온다
     (`mcc20citytour/components.jsx` 의 `SAFE_TOP` + `scrollBy`).
     🔧 **정정: citytour 주석의 「상단 고정 바 둘(0~105px)」은 이제 사실이 아니다.**
       오늘 좌표로 다시 재니 quest 화면에 **위쪽 고정/스티키 요소가 0개**다 —
       전역 Header 를 quest 안에서 sticky 해제한 `41c522bd`(2026-09-27) 때문이다.
       그래서 `SAFE_TOP` 은 「바를 피하는 값」이 아니라 **「화면 위 끝에서 이만큼
       떨어뜨린다」**는 뜻이다. 동작은 그대로 맞고, 이유만 바로잡는다.
     ⚠️ 복원값에는 안 건다 — 학생이 **직접 누른 뒤**에만 움직인다(`touched`).
     실측(모바일 375): 걸음 3~14 전부 말풍선 top=161 — 밀려 사라지는 걸음 0개. */
  const [touched, setTouched] = useState(false);
  const setIdx = (n) => { setTouched(true); rawSetIdx(n); };
  const simRef = useRef(null);
  useEffect(() => {
    if (!touched) return;
    const el = simRef.current;
    if (!el || typeof window === "undefined") return;
    const SAFE_TOP = 118;            // 화면 위 끝에서 떨어뜨릴 거리 (위 주석 참고)
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;   // 시뮬이 화면 밖이면 건드리지 않는다
    if (r.top >= SAFE_TOP) return;                            // 이미 잘 보인다
    window.scrollBy(0, r.top - SAFE_TOP);
  }, [safe, touched]);
  const tone = { pass: "#059669", oob: "#9ca3af", visited: "#9ca3af", named: A }[st.status] || A;
  const bg   = { pass: "#ecfdf5", oob: "#f9fafb", visited: "#f9fafb", named: "#eff6ff" }[st.status] || "#eff6ff";

  return (
    <div style={{ padding: 16 }}>
      <div ref={simRef} style={{ background: "#eff6ff", border: `1px solid ${A}55`, borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 8 }}>
          🐴 {t(E, "Filling the table, one square at a time", "표가 한 칸씩 채워지는 걸 봐요")}
        </div>

        {/* 말풍선 — 밝은 바탕 + 💬 (`check-bubble-not-terminal`, mexes/sims.jsx 참고) */}
        <div style={{ maxWidth: 520, margin: "0 auto 12px" }}>
          <div style={{ background: bg, border: `1.5px solid ${tone}`, borderRadius: 12,
            padding: "11px 14px", fontSize: 13, color: tone, lineHeight: 1.6, fontWeight: 600,
            textAlign: "center", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)", ...KA }}>
            💬 {st.msg}
          </div>
        </div>

        {/* 5×5 오프셋 격자 */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${KN_R}, 1fr)`, gap: 4,
          maxWidth: 260, margin: "0 auto 12px" }}>
          {st.dist.map((row, r) => row.map((v, c) => {
            const isCur  = st.cur  && st.cur[0]  === r && st.cur[1]  === c;
            const isLook = st.look && st.look[0] === r && st.look[1] === c;
            return (
              <div key={`${r}-${c}`} style={{
                aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 13, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
                background: isLook ? bg : v === -1 ? "#f9fafb" : "#dbeafe",
                border: isCur ? `2.5px solid ${A}` : isLook ? `2.5px solid ${tone}` : "1px solid #e5e7eb",
                color: v === -1 ? "#d1d5db" : "#1e3a8a",
              }}>{v === -1 ? "·" : v}</div>
            );
          }))}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10, ...KA }}>
          {t(E, "(0,0) is the knight's start. Each number = fewest jumps to reach that square.",
               "(0,0) 이 나이트가 선 곳이에요. 숫자는 그 칸까지 가는 가장 적은 횟수예요.")}
        </div>

        {/* ⭐ 2026-09-29 — **줄(큐)을 그린다.** 학생이 *"「꺼내면서」라는데 어디에도
            꺼내는 동작이 없었다"* 고 했다. 꺼내는 걸 **보여준 뒤에** 이름을 붙인다.
            형제 `mcc20citytour` 가 칩으로 그리는 것과 같은 모양. 맨 앞은 테두리로 표시한다. */}
        <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 10,
          padding: "8px 10px", marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, marginBottom: 6, ...KA }}>
            {t(E, "Line of squares waiting", "차례를 기다리는 줄")}
            <span style={{ color: C.dim, fontWeight: 500 }}> · {st.queue.length}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, minHeight: 30, alignItems: "center" }}>
            {st.queue.length === 0
              ? <span style={{ fontSize: 11.5, color: C.dim, ...KA }}>
                  {t(E, "(empty — nothing left to check)", "(비었어요 — 더 볼 칸이 없어요)")}
                </span>
              : st.queue.slice(0, 12).map(([r, c], i) => (
                  <div key={i} style={{
                    padding: "3px 7px", borderRadius: 6, fontSize: 10.5, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    border: i === 0 ? `2px solid ${A}` : "1.5px solid #bfdbfe",
                    background: i === 0 ? "#dbeafe" : "#fff", color: "#1e3a8a",
                  }}>{r},{c}</div>
                ))}
            {st.queue.length > 12 && (
              <span style={{ fontSize: 11, color: C.dim }}>+{st.queue.length - 12}</span>
            )}
          </div>
        </div>

        <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
}

export function getMcc20KnightSections(E) {
  return [
    {
      label: t(E, "① The 8 moves and an empty table", "① L자 이동 8 가지 · 빈 표 만들기"),
      color: "#0891b2",
      py: PY_SETUP, cpp: CPP_SETUP,
      why: [
        t(E, "Reaching (A,B) from (X,Y) is the same as covering the gap (dx,dy) = (|X−A|, |Y−B|) from (0,0).",
            "(X,Y) 에서 (A,B) 로 가는 건 (0,0) 에서 차이 (dx,dy) = (|X−A|, |Y−B|) 만큼 가는 것과 같아요."),
        /* 2026-09-17: 132 자가 한 덩어리였다. Stepper 가 \n 을 뭉개니 항목을 나눈다. */
        t(E, "So we never store a query's actual coordinates — one table of gaps serves all 400 queries.",
            "그래서 질문에 나온 좌표 자체는 저장하지 않아요. 차이만 담은 표 하나면 질문 400 개를 전부 처리해요."),
        t(E, "−1 means 'not reached yet'.",
            "−1 은 '아직 도착 못 했다' 는 뜻이에요."),
        t(E, "The table is a little bigger than 2000 on purpose: the shortest way to a near square sometimes steps backwards past 0 first.",
            "표를 2000 보다 조금 크게 잡은 건 일부러예요. 가까운 칸으로 가는 가장 짧은 길이 0 뒤쪽으로 한 번 나갔다 오는 경우가 있거든요."),
      ],
      pyOnly: [
        t(E, "best[nx - LO][ny - LO] shifts coordinates by LO so negative cells fit into a normal 2D list.",
            "best[nx - LO][ny - LO] 는 좌표를 LO 만큼 밀어 음수 칸도 보통 2차원 리스트에 담아요."),
      ],
      cppOnly: [
        t(E, "dr[]/dc[] list the 8 L-moves; LO shifts coordinates so negatives index a plain vector.",
            "dr[]/dc[] 는 8 가지 L자 이동이에요. LO 만큼 좌표를 밀면 음수 칸도 보통 vector 에 담을 수 있어요."),
      ],
    },
    {
      label: t(E, "② Fill the table once with BFS", "② BFS 로 표를 한 번에 채우기"),
      color: "#2563eb",
      py: PY_BFS, cpp: CPP_BFS,
      why: [
        t(E, "It fills in the nearest squares first: every square one move away, then every square two moves away, and so on. The first time a square is written is the shortest way to it, so we never overwrite it.",
            "BFS 는 가까운 칸부터 채워요. 한 번에 갈 수 있는 칸을 모두 적고, 그다음 두 번에 갈 수 있는 칸을 모두 적어요. 어떤 칸에 처음 적히는 값이 그 칸까지의 가장 짧은 횟수라, 한 번 적은 값은 다시 고치지 않아요."),
        t(E, "We run this once, before reading any query. After it finishes, every offset already knows its minimum.",
            "이 일은 질문을 읽기 전에 딱 한 번만 해요. 끝나고 나면 모든 차이가 자기 최소 횟수를 이미 알고 있어요."),
      ],
    },
    {
      label: t(E, "③ Answer each query", "③ 질문마다 확인하기"),
      color: "#15803d",
      py: PY_QUERY, cpp: CPP_QUERY,
      why: [
        t(E, "Each query is now two checks: is K at least the minimum, and is the leftover (K − min) even?",
            "이제 질문 하나는 두 가지만 보면 돼요. K 가 최소 이상인가, 그리고 남는 이동 (K − 최소) 이 짝수인가."),
        t(E, "Why must the leftover be even? Colour the board like a chessboard. An L-move is 1 in one direction and 2 in the other, so 1+2 = 3 squares — an odd step always lands on the opposite colour. So after an even number of moves the knight is on its starting colour, after an odd number on the other one. The target's colour is fixed, so the number of moves can only change by 2 at a time.",
            "남는 이동이 왜 짝수여야 할까요. 판을 체스판처럼 두 색으로 칠해 봐요. L자 이동은 한 쪽으로 1, 다른 쪽으로 2 니까 합쳐서 3 칸이에요. 홀수 칸을 움직이면 색이 반드시 반대가 돼요. 그래서 짝수 번 움직이면 출발한 색으로 돌아오고, 홀수 번 움직이면 반대 색에 있어요. 목표 칸의 색은 정해져 있으니 이동 횟수는 2 씩만 달라질 수 있어요."),
        t(E, "And the leftover is always usable: step out to any square and come straight back — that burns exactly 2 moves and changes nothing.",
            "남는 이동은 언제나 쓸 수 있어요. 아무 칸으로나 한 번 나갔다 바로 돌아오면 2 번을 쓰고 제자리로 와요."),
      ],
      pyOnly: [
        t(E, "Collect answers in a list and print once with '\\n'.join — faster than printing T times.",
            "답을 리스트에 모아 '\\n'.join 으로 한 번에 출력해요. T 번 나눠서 출력하는 것보다 빨라요."),
      ],
    },
  ];
}

export function Mcc20KnightProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). FULL_PY 는 표시용 배열이다 — 내용은 절대 바꾸지 않고, 그대로 가져와
   beats(설명 말풍선)만 덧붙인다. MCC 는 C++ 이 없다 — py 만 만든다. ── */
export function getMcc20KnightWalk(E) {
  return {
    code: FULL_PY,
    vars: [
      { v: "best", ko: "차이(dx,dy)별 최소 이동 횟수 표", en: "table of minimum moves per gap (dx,dy)" },
      { v: "need", ko: "지금 질문의 최소 이동 횟수", en: "minimum moves for this query" },
      { v: "K", ko: "정확히 이 횟수에 도착할 수 있는지 묻는 값", en: "the exact move count being asked about" },
    ],
    beats: [
      { hi: [0, 14], bubble: t(E,
        "What do we need before answering any query? For every possible gap (dx, dy), the minimum number of knight moves to cross it — computed once, not per query. Reaching (A,B) from (X,Y) is exactly the same problem as reaching (dx,dy) = (|X−A|,|Y−B|) from (0,0), so one table of gaps serves every query. List the 8 L-moves, then build an empty table (best) where −1 means 'not reached yet' — a little bigger than 2000 because the shortest path to a nearby square sometimes dips below 0 first.",
        "질문에 답하기 전에 뭐가 필요할까요? 모든 차이 (dx, dy) 마다 나이트가 최소 몇 번 움직이면 되는지를요 — 질문마다가 아니라 딱 한 번만 구해 둬요.\n(X,Y) 에서 (A,B) 로 가는 건 (0,0) 에서 차이 (dx,dy) = (|X−A|, |Y−B|) 만큼 가는 것과 같아서, 차이만 담은 표 하나면 모든 질문을 처리해요.\nL자 이동 8가지를 적고, 빈 표(best) 를 만들어요 — −1 은 '아직 도착 못 했다' 는 뜻이고, 표를 2000 보다 조금 크게 잡은 건 가까운 칸으로 가는 가장 짧은 길이 0 아래로 살짝 도는 경우가 있어서예요.") },
      { hi: [15, 23], bubble: t(E,
        "Why fill it this way? It works outward from the start — every square one move away first, then every square two moves away, and so on — so the first time a square is written is already its shortest distance, and it's never overwritten. Run this once, starting from (0,0), before reading any query.",
        "왜 BFS 로 채울까요? 가까운 칸부터 차례로 채우기 때문이에요 — 한 번에 갈 수 있는 칸을 먼저 적고, 그다음 두 번에 갈 수 있는 칸을 적어요.\n그래서 어떤 칸에 처음 적히는 값이 이미 가장 짧은 거리라, 다시 고치지 않아요.\n(0,0) 에서 시작해 질문을 읽기 전에 이 일을 딱 한 번만 해요.") },
      { hi: [24, 31], bubble: t(E,
        "Now answer each query. This contest has no fixed input format, so the values are given like this (the official sample). For every query, turn the coordinates back into a gap (dx, dy) and look up its precomputed minimum.",
        "이제 질문마다 답해요. 이 대회는 입력 형식이 따로 없어서 값을 이렇게 줘요 (공식 예제).\n질문마다 좌표를 다시 차이 (dx, dy) 로 바꾸고, 미리 구해 둔 최소값을 찾아봐요.") },
      { hi: [32, 36], bubble: t(E,
        "Why must the leftover (K − need) be even? Color the board like a chessboard — an L-move is 1 in one direction and 2 in the other, so 1+2 = 3 squares, and an odd step always lands on the opposite color. So after an even number of moves the knight is back on its starting color, after an odd number it's on the other one. The target's color never changes, so the move count can only shift by 2 at a time — and any extra pair can always be burned by stepping out and straight back.",
        "남는 이동 (K − need) 이 왜 짝수여야 할까요? 판을 체스판처럼 두 색으로 칠해 봐요.\nL자 이동은 한 쪽으로 1, 다른 쪽으로 2 라서 합쳐서 3 칸 — 홀수 칸을 움직이면 색이 반드시 반대가 돼요.\n그래서 짝수 번 움직이면 출발한 색으로 돌아오고, 홀수 번 움직이면 반대 색에 있어요.\n목표 칸의 색은 정해져 있으니 이동 횟수는 2 씩만 달라질 수 있고, 남는 이동은 아무 칸으로나 나갔다 바로 돌아오면 항상 쓸 수 있어요.") },
      { hi: [37, 37], bubble: t(E,
        "Collect every answer and print them all at once, one per line.",
        "답을 다 모아서 한 번에, 한 줄씩 출력해요.") },
    ],
  };
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
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


export function downloadMcc20KnightPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Knight — Full Study Guide", "Mcc20Knight — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
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
