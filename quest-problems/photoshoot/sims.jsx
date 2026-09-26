// photoshoot — 오른쪽에서 왼쪽으로 7쌍을 훑는 과정 시뮬.
// 설계는 pedagogy·ux 판정으로 이미 확정됐다 (2026-09-26 지시). 여기서는 구현만 한다.
//
// ⛔ components.jsx 의 FULL_PY/FULL_CPP(🔒 USACO_VERIFIED)는 이 파일에서 import 하지 않는다 —
//    이 시뮬은 그 코드가 "왜 그렇게 짜는지" 를 코드 없이 손으로 먼저 보여주는 자리다.
//
// ⭐ 예제는 지시받은 공식 샘플 하나로 고정한다 — N=14, s="GGGHGHHGHHHGHG" → 답 1.
//    아래 걸음별 값(ans/flip 전이)은 FULL_PY 와 똑같은 로직을 손으로 표(python3)로
//    뽑아 대조했다 (i=12,10,8,6,4,2,0 순회, ans: 0→0→0→0→1→1→1, flip: off→…→on).
//    다른 예제를 지어내지 않는다.
//
// 걸음 7개 (10 안쪽, 지시받은 표):
//   0=인트로 → 1=쌍(13,14) 자세히 → 2=쌍(11,12) 자세히 →
//   3=쌍(9,10)+(7,8) 묶음(둘 다 flip 안 바뀜) →
//   4=쌍(5,6) — 실제로 flip 이 켜지는 유일한 순간, 왼쪽 전부(1~4번)가 같이 바뀜을 크게 보여줌 →
//   5=쌍(3,4)+(1,2) 묶음(flip=on 상태에서 훑기) → 6=최종 답.
// ux 처방(feedcows·mcc20citytour 와 동일): flip 안 바뀌는 쌍은 왼쪽 전체를 다시 그리지
// 않고, flip 이 실제로 바뀌는 걸음(4)에서만 왼쪽 구간에 오버레이를 크게 보여준다.

import { useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#dc2626";          // 이 quest 의 공통 accent (components.jsx 와 동일)
const G_COLOR = "#059669";    // G(건지) — 목표 품종
const H_COLOR = "#94a3b8";    // H(홀스타인) — 관심 없는 품종, 무채색으로 눈에 덜 띄게
const FLIP_COLOR = "#f59e0b"; // 뒤집힘 오버레이 전용 색 (G/H 색과 안 겹치게)

const KA = { wordBreak: "keep-all" };

const S = "GGGHGHHGHHHGHG"; // 공식 샘플. 0-indexed, N=14.
const N = S.length;
const CELL_W = 32;

const charColor = (ch) => (ch === "G" ? G_COLOR : H_COLOR);
const pairPositions = (i) => [i + 1, i + 2]; // 0-idx i → 1-idx (홀수, 짝수) 위치

/** 걸음 7개를 손으로 미리 계산해 둔다 (검증된 FULL_PY 로직을 그대로 손으로 따라간 값).
    doneIs/activeIs 는 0-idx i 값들의 목록 — "이미 지나간 쌍" / "지금 보는 쌍". */
function buildSteps(E) {
  return [
    {
      kind: "intro", activeIs: [], doneIs: [],
      flipDuring: false, ansAfter: 0, flipAfter: false, overlayRange: null,
      msg: t(E,
        "14 cows: G G G H G H H G H H H G H G.\nWe check pairs (13,14), (11,12), … down to (1,2) — starting from the RIGHT.",
        "소 14마리가 G G G H G H H G H H H G H G 로 서 있어요.\n(13,14), (11,12), … (1,2) 순서로, 오른쪽 쌍부터 왼쪽으로 봐요."),
    },
    {
      kind: "detail", activeIs: [12], doneIs: [],
      flipDuring: false, ansAfter: 0, flipAfter: false, overlayRange: null,
      msg: t(E,
        "Pair (13,14): H, G.\nflip is off, so the even slot is position 14 — it already has G. Nothing to do.",
        "쌍 (13,14): H, G 예요.\nflip이 꺼져 있어서 짝수 칸은 14번이에요 — 이미 G가 있어요. 할 일이 없어요."),
    },
    {
      kind: "detail", activeIs: [10], doneIs: [12],
      flipDuring: false, ansAfter: 0, flipAfter: false, overlayRange: null,
      msg: t(E,
        "Pair (11,12): H, G.\nEven slot (12) already has G. Nothing to do again.",
        "쌍 (11,12): H, G 예요.\n짝수 칸(12번)에 이미 G가 있어요. 이번에도 할 일이 없어요."),
    },
    {
      kind: "batch", activeIs: [8, 6], doneIs: [12, 10],
      flipDuring: false, ansAfter: 0, flipAfter: false, overlayRange: null,
      msg: t(E,
        "Same pattern twice more — let's take them together.",
        "같은 패턴이 두 번 더 이어져요 — 한 번에 봐요."),
      breakdown: t(E,
        "(9,10): H, H — no G at all, skip.\n(7,8): H, G — even slot (8) already G, skip.",
        "(9,10): H, H — G가 아예 없어요, 넘어가요.\n(7,8): H, G — 짝수 칸(8번)에 이미 G, 넘어가요."),
    },
    {
      kind: "flip", activeIs: [4], doneIs: [12, 10, 8, 6],
      flipDuring: false, ansAfter: 1, flipAfter: true, overlayRange: [1, 4],
      msg: t(E,
        "Pair (5,6): G, H.\nEven slot (6) has no G — but its partner (5) does!\nOne flip brings it over: ans = 1.",
        "쌍 (5,6): G, H 예요.\n짝수 칸(6번)엔 G가 없는데, 짝꿍(5번)엔 있어요!\n한 번 뒤집어 데려와요: ans = 1."),
      breakdown: t(E,
        "flip: off → on — every pair still left (1~4) now uses the flipped rule too.",
        "flip: 꺼짐 → 켜짐 — 아직 안 본 쌍(1~4번)도 이제부터 뒤집힌 규칙을 써요."),
    },
    {
      kind: "batch", activeIs: [2, 0], doneIs: [12, 10, 8, 6, 4],
      flipDuring: true, ansAfter: 1, flipAfter: true, overlayRange: null,
      msg: t(E,
        "flip is on now, so the even duty sits on the LEFT cell of each pair.",
        "지금은 flip이 켜져 있어서, 각 쌍의 짝수 담당이 왼쪽 칸이에요."),
      breakdown: t(E,
        "(3,4): left cell (3) is G — already there, skip.\n(1,2): left cell (1) is G — already there, skip.",
        "(3,4): 왼쪽 칸(3번)이 G — 이미 있어요, 넘어가요.\n(1,2): 왼쪽 칸(1번)이 G — 이미 있어요, 넘어가요."),
    },
    {
      kind: "final", activeIs: [], doneIs: [12, 10, 8, 6, 4, 2, 0],
      flipDuring: false, ansAfter: 1, flipAfter: true, overlayRange: null,
      msg: t(E,
        "Done! Only 1 flip was ever needed — the one at (5,6), which covers positions 1-4 too.\nThat's exactly the earlier example's \"reverse the first six cows.\"",
        "다 훑었어요! 뒤집기는 딱 1번만 필요했어요 — (5,6)에서 한 뒤집기가 1~4번까지 같이 덮어요.\n위 예제의 '앞 6마리 뒤집기'가 바로 이거예요."),
    },
  ];
}

function cellStateFor(pos, step) {
  if (step.doneIs.some((i) => pairPositions(i).includes(pos))) return { state: "done" };
  for (const i of step.activeIs) {
    const [oddPos, evenPos] = pairPositions(i);
    if (oddPos === pos || evenPos === pos) {
      const evenDutyPos = step.flipDuring ? oddPos : evenPos;
      return { state: pos === evenDutyPos ? "even" : "partner" };
    }
  }
  return { state: "upcoming" };
}

function PositionCell({ pos, E, step }) {
  const ch = S[pos - 1];
  const { state } = cellStateFor(pos, step);
  const inOverlay = step.overlayRange && pos >= step.overlayRange[0] && pos <= step.overlayRange[1];

  let bg = "#fff", bd = "#e2e4ec", op = 1;
  if (state === "done") { op = 0.35; }
  else if (state === "even") { bg = "#fef2f2"; bd = A; }
  else if (state === "partner") { bg = "#f5f3ff"; bd = "#a78bfa"; }

  return (
    <div style={{ width: CELL_W, flexShrink: 0, textAlign: "center", position: "relative" }}>
      {inOverlay && (
        <div style={{
          position: "absolute", inset: "-3px -1px 14px -1px",
          background: `${FLIP_COLOR}26`, border: `1.5px dashed ${FLIP_COLOR}`,
          borderRadius: 6, pointerEvents: "none",
        }} />
      )}
      <div style={{
        position: "relative", width: CELL_W - 4, height: CELL_W - 4, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 7, border: `2px solid ${bd}`, background: bg, opacity: op,
        fontWeight: 800, fontSize: 13, color: charColor(ch),
        fontFamily: "'JetBrains Mono',monospace",
      }}>{ch}</div>
      <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>{pos}</div>
      <div style={{ fontSize: 8.5, fontWeight: 800, marginTop: 1, height: 11, color: state === "even" ? A : "#a78bfa" }}>
        {state === "even" ? t(E, "even", "짝수") : state === "partner" ? t(E, "partner", "짝꿍") : ""}
      </div>
    </div>
  );
}

/** PhotoshootRightToLeftScanSim — N=14, s="GGGHGHHGHHHGHG" 을 오른쪽에서 왼쪽으로
    7쌍씩 훑으며 ans/flip 이 어떻게 바뀌는지 보여주는 7걸음 시뮬. */
export function PhotoshootRightToLeftScanSim({ E }) {
  const steps = buildSteps(E);
  const { safe, setIdx, total } = useTraceStep(steps.length);
  const cur = steps[safe];

  /* 버튼 줄이 고정 바에 묻히면 그만큼만 스크롤을 내려 준다 (walkhome/feedcows/sims.jsx 와 동일 처방). */
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
  }, [safe]);

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 14, marginTop: 10, ...KA }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 2 }}>
        🔬 {t(E, "Watch the scan, right to left", "오른쪽부터 왼쪽으로 훑는 걸 봐요")}
      </div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {t(E, "Direction: 14 → 1", "훑는 방향: 14번 → 1번")}
      </div>

      {/* 항상 보이는 현재 상태 배지 — 앞 걸음을 기억하지 않아도 되게 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
        <span style={{
          padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 800,
          background: "#fef2f2", border: `1.5px solid ${A}`, color: A,
          fontFamily: "'JetBrains Mono',monospace",
        }}>ans = {cur.ansAfter}</span>
        <span style={{
          padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 800,
          background: cur.flipAfter ? "#fffbeb" : "#f3f4f6",
          border: `1.5px solid ${cur.flipAfter ? FLIP_COLOR : "#cbd5e1"}`,
          color: cur.flipAfter ? "#92400e" : "#6b7280",
          fontFamily: "'JetBrains Mono',monospace",
        }}>flip = {cur.flipAfter ? t(E, "on", "켜짐") : t(E, "off", "꺼짐")}</span>
      </div>

      {/* 소 14마리 줄 */}
      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ display: "flex", width: CELL_W * N, minWidth: CELL_W * N, margin: "0 auto" }}>
          {Array.from({ length: N }, (_, k) => k + 1).map((pos) => (
            <PositionCell key={pos} pos={pos} E={E} step={cur} />
          ))}
        </div>
      </div>

      {/* 걸음 설명 */}
      <div style={{
        background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 12px",
        fontSize: 12.5, lineHeight: 1.7, whiteSpace: "pre-line", textAlign: "center", marginTop: 12, ...KA,
      }}>
        {cur.msg}
        {cur.breakdown && (
          <div style={{
            marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
            color: "#fbbf24", whiteSpace: "pre-line",
          }}>{cur.breakdown}</div>
        )}
      </div>

      {cur.kind === "final" && (
        <div style={{
          marginTop: 10, textAlign: "center", background: "#dcfce7", border: "1.5px solid #86efac",
          borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, color: "#065f46",
        }}>
          🎉 {t(E, "Answer: 1 reversal", "답: 뒤집기 1번")}
        </div>
      )}

      <div ref={navRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 10, rowGap: 8, marginTop: 14 }}>
        <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
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
  );
}
