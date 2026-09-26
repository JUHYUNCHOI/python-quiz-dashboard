// feedcows — 그리디가 왼쪽에서 오른쪽으로 패치를 놓는 과정 시뮬.
// 설계는 pedagogy·ux 판정으로 이미 확정됐다 (2026-09-26 지시). 여기서는 구현만 한다.
//
// ⛔ components.jsx 의 FULL_PY/FULL_CPP(🔒 USACO_VERIFIED)는 이 파일에서 import 하지 않는다 —
//    이 시뮬은 그 코드가 "왜 그렇게 짜는지" 를 코드 없이 손으로 먼저 보여주는 자리다.
//
// ⭐ 예제는 지시받은 대로 N=6, K=1, s="GHHGGH" 하나로 고정한다 — FULL_PY 에 직접 넣어
//    돌려서 답 count=4 · 배치 ".GH.GH" 를 확인했다. 다른 예제를 지어내지 않는다.
//
// 걸음 8개(지시받은 표 그대로): 0=인트로 → 1~6=i=0..5 각 자리의 판정 → 7=최종 답.
// g_cover/h_cover 를 화면에 계속 띠(band)로 보여, "이미 덮였다" 가 왜 그런지 글이 아니라
// 그림으로 설명한다. 걸음 1(자기 자리가 아니라 오른쪽에 놓는 이유)과 걸음 3(그 보상으로
// 패치 하나가 소 둘을 먹이는 순간)을 말풍선에서 명시적으로 잇는다.

import { useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#059669";            // 이 quest 의 공통 accent (components.jsx 와 동일)
const G_COLOR = "#059669";      // components.jsx 의 FeedCowsNumberLineViz 와 동일 색
const H_COLOR = "#7c3aed";
const NEW_RING = "#f59e0b";     // "이번 걸음에 새로 생긴 것" 전용 색 (기존 G/H 색과 겹치지 않게)

const KA = { wordBreak: "keep-all" };

const BREEDS = ["G", "H", "H", "G", "G", "H"]; // s = "GHHGGH"
const K = 1;
const N = BREEDS.length;
const colorOf = (b) => (b === "G" ? G_COLOR : H_COLOR);

/* ── 걸음 8개를 손으로 미리 계산해 둔다 (검증된 FULL_PY 를 그대로 손으로 따라간 값).
   patches 는 "이 걸음이 끝난 뒤" 의 누적 상태. E 에 따라 문구가 갈리므로 컴포넌트
   렌더 때마다 새로 만든다 (top-level 상수로 두면 언어가 하나로 고정된다). ── */
function buildSteps(E) {
  const empty = [".", ".", ".", ".", ".", "."];
  return [
    {
      i: null, patches: [...empty], gCover: -1, hCover: -1, newPatch: null,
      msg: t(E,
        "6 cows in a row, breeds G H H G G H. K = 1.\nNo patches yet — gCover and hCover both start at -1 (nobody fed yet).",
        "소 6마리가 나란히 있고, 품종은 G H H G G H 예요. K = 1 이에요.\n아직 패치가 없어요 — gCover, hCover 둘 다 -1 (아직 아무도 못 먹었어요)."),
    },
    {
      i: 0, patches: [".", "G", ".", ".", ".", "."], gCover: 2, hCover: -1,
      newPatch: { pos: 1, breed: "G" }, showChoice: true,
      msg: t(E,
        "Position 0 is G. gCover(-1) < 0, so this cow isn't fed yet.\nPlace the new patch as far right as it can still reach her: i+K = 0+1 = 1.\nNot at her own spot (0) — pushing it right lets it reach further cows too.",
        "자리 0 은 G 예요. gCover(-1) 가 0 보다 작으니 아직 못 먹었어요.\n이 소가 닿는 가장 오른쪽 자리, i+K = 0+1 = 1 에 새 패치를 놓아요.\n자기 자리(0)가 아니라 1 에 놓는 이유는, 오른쪽으로 밀수록 더 먼 소까지 닿기 때문이에요."),
      breakdown: t(E, "patch at i+K = 0+1 = 1  →  gCover = i+2K = 0+2 = 2",
                      "패치 자리 = i+K = 0+1 = 1  →  gCover = i+2K = 0+2 = 2"),
    },
    {
      i: 1, patches: [".", "G", "H", ".", ".", "."], gCover: 2, hCover: 3,
      newPatch: { pos: 2, breed: "H" }, showChoice: true,
      msg: t(E,
        "Position 1 is H. hCover(-1) < 1, so this cow isn't fed yet either.\nSame rule: patch at i+K = 1+1 = 2.",
        "자리 1 은 H 예요. hCover(-1) 가 1 보다 작아요 — 이 소도 아직 못 먹었어요.\n똑같은 규칙으로 i+K = 1+1 = 2 에 새 패치를 놓아요."),
      breakdown: t(E, "patch at i+K = 1+1 = 2  →  hCover = i+2K = 1+2 = 3",
                      "패치 자리 = i+K = 1+1 = 2  →  hCover = i+2K = 1+2 = 3"),
    },
    {
      i: 2, patches: [".", "G", "H", ".", ".", "."], gCover: 2, hCover: 3,
      newPatch: null, covered: true,
      msg: t(E,
        "Position 2 is H too. hCover(3) ≥ 2 — she's already fed!\nThat patch we placed at 2 (not at 1) is the payoff: ONE patch just fed TWO cows.",
        "자리 2 도 H 예요. hCover(3) 가 이미 2 보다 크거나 같아요 — 벌써 먹었어요!\n방금 1 이 아니라 2 에 놓았던 게 여기서 값을 했어요 — 패치 하나가 소 둘을 먹였어요."),
      breakdown: t(E, "hCover(3) ≥ i(2)  →  already fed, skip", "hCover(3) ≥ i(2)  →  이미 덮였어요, 지나가요"),
    },
    {
      i: 3, patches: [".", "G", "H", ".", "G", "."], gCover: 5, hCover: 3,
      newPatch: { pos: 4, breed: "G" }, showChoice: true,
      msg: t(E,
        "Position 3 is G. gCover(2) < 3 — the earlier G patch doesn't reach this far.\nPlace a new one at i+K = 3+1 = 4.",
        "자리 3 은 G 예요. gCover(2) 는 3 보다 작아요 — 앞 G 패치 사거리가 여기까진 안 닿아요.\n새 패치를 i+K = 3+1 = 4 에 놓아요."),
      breakdown: t(E, "patch at i+K = 3+1 = 4  →  gCover = i+2K = 3+2 = 5",
                      "패치 자리 = i+K = 3+1 = 4  →  gCover = i+2K = 3+2 = 5"),
    },
    {
      i: 4, patches: [".", "G", "H", ".", "G", "."], gCover: 5, hCover: 3,
      newPatch: null, covered: true,
      msg: t(E,
        "Position 4 is G too. gCover(5) ≥ 4 — already fed by the patch we just placed.",
        "자리 4 도 G 예요. gCover(5) 가 이미 4 보다 크거나 같아요.\n방금 놓은 패치가 이미 먹이고 있어요."),
      breakdown: t(E, "gCover(5) ≥ i(4)  →  already fed, skip", "gCover(5) ≥ i(4)  →  이미 덮였어요, 지나가요"),
    },
    {
      i: 5, patches: [".", "G", "H", ".", "G", "H"], gCover: 5, hCover: 6,
      newPatch: { pos: 5, breed: "H" }, edge: true,
      msg: t(E,
        "Position 5 is H. hCover(3) < 5 — not fed yet.\nBut i+K = 5+1 = 6 is past the last cow (0..5) — can't push further right.\nSo this time the patch goes right at her own spot, 5.",
        "자리 5 는 H 예요. hCover(3) 는 5 보다 작아요 — 아직 못 먹었어요.\n그런데 i+K = 5+1 = 6 은 마지막 소(자리 0~5) 밖이에요 — 더 못 밀어요.\n그래서 이번엔 자기 자리(5)에 그대로 패치를 놓아요."),
      breakdown: t(E, "i+K = 6 ≥ N(6)  →  can't push further, patch at own spot (5)",
                      "i+K = 6 ≥ N(6)  →  더 못 밀어요, 자기 자리(5)에 놓아요"),
    },
    {
      i: null, patches: [".", "G", "H", ".", "G", "H"], gCover: 5, hCover: 6,
      newPatch: null, done: true,
      msg: t(E,
        "Done! 4 patches, at positions 1, 2, 4, 5 — the layout is .GH.GH",
        "다 훑었어요! 패치는 4개(자리 1, 2, 4, 5) — 배치는 .GH.GH 예요."),
    },
  ];
}

function Ruler() {
  return (
    <div style={{ display: "flex" }}>
      {BREEDS.map((_, i) => (
        <div key={i} style={{
          width: 52, textAlign: "center", fontSize: 10, color: "#9ca3af",
          fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
        }}>{i}</div>
      ))}
    </div>
  );
}

function CowRow({ i: curI }) {
  return (
    <div style={{ display: "flex" }}>
      {BREEDS.map((b, i) => {
        const focus = i === curI;
        return (
          <div key={i} style={{ width: 52, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              padding: "2px 4px", borderRadius: 8,
              border: focus ? `2.5px solid ${NEW_RING}` : "2.5px solid transparent",
              background: focus ? "#fffbeb" : "transparent",
            }}>
              <div style={{ fontSize: 20 }}>🐄</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: colorOf(b), marginTop: -2 }}>{b}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 품종 하나(G 또는 H)의 커버 띠 — cover 값까지 왼쪽부터 색을 채운다.
    patches 배열에서 그 품종 패치가 놓인 자리엔 🌱 표시. */
function CoverBand({ breed, cover, patches, newPos }) {
  const color = colorOf(breed);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
      <div style={{
        width: 16, fontSize: 12, fontWeight: 900, color, flexShrink: 0, textAlign: "center",
      }}>{breed}</div>
      <div style={{ display: "flex" }}>
        {BREEDS.map((_, c) => {
          const isCovered = cover >= 0 && c <= cover;
          const isPatch = patches[c] === breed;
          const isNew = newPos === c;
          return (
            <div key={c} style={{
              width: 52, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: "2px 3px",
                background: isCovered ? `${color}2e` : "#f3f4f6",
                border: isCovered ? `1.5px solid ${color}` : "1.5px dashed #e2e4ec",
                borderRadius: 6,
              }} />
              {isPatch && (
                <div style={{
                  position: "relative", fontSize: 13,
                  filter: isNew ? `drop-shadow(0 0 3px ${NEW_RING})` : "none",
                }}>🌱</div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        fontSize: 11, fontWeight: 800, color, whiteSpace: "nowrap",
        fontFamily: "'JetBrains Mono',monospace", marginLeft: 4,
      }}>{breed}Cover={cover}</div>
    </div>
  );
}

/** FeedCowsGreedyFillSim — N=6,K=1,s="GHHGGH" 를 왼쪽부터 훑으며 패치를 놓는 8걸음 시뮬. */
export function FeedCowsGreedyFillSim({ E }) {
  const steps = buildSteps(E);
  const { safe, setIdx, total } = useTraceStep(steps.length);

  /* 버튼 줄이 고정 바에 묻히면 그만큼만 스크롤을 내려 준다 (walkhome/sims.jsx 와 동일 처방). */
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

  const cur = steps[safe];
  const newPos = cur.newPatch ? cur.newPatch.pos : null;
  const patchesStr = cur.patches.join("");

  return (
    <div style={{ padding: 16, ...KA }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
          🌱 {t(E, "Watch the sweep left to right, one cow at a time", "왼쪽부터 소 한 마리씩 훑으며 패치를 놓아요")}
        </div>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 999,
            fontSize: 11, fontWeight: 800, color: "#6b7280", background: "#f1f5f9",
            fontFamily: "'JetBrains Mono',monospace",
          }}>N = 6 · K = 1 · s = GHHGGH</span>
        </div>

        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ width: 52 * N, minWidth: 52 * N, margin: "0 auto" }}>
            <Ruler />
            <CowRow i={cur.i} />
            <CoverBand breed="G" cover={cur.gCover} patches={cur.patches} newPos={cur.newPatch?.breed === "G" ? newPos : null} />
            <CoverBand breed="H" cover={cur.hCover} patches={cur.patches} newPos={cur.newPatch?.breed === "H" ? newPos : null} />
          </div>
        </div>

        {/* 지금까지 놓은 패치 문자열 — 최종 답과 같은 모양으로 미리 보여준다 */}
        <div style={{
          textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 800,
          fontFamily: "'JetBrains Mono',monospace", color: "#065f46", letterSpacing: 2,
        }}>{patchesStr}</div>

        {/* 걸음 설명 */}
        <div style={{
          background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 12px",
          fontSize: 12.5, lineHeight: 1.7, whiteSpace: "pre-line", textAlign: "center", marginTop: 10, ...KA,
        }}>
          {cur.msg}
          {cur.breakdown && (
            <div style={{
              marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
              color: "#fbbf24",
            }}>{cur.breakdown}</div>
          )}
        </div>

        {cur.done && (
          <div style={{
            marginTop: 10, textAlign: "center", background: "#dcfce7", border: "1.5px solid #86efac",
            borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 800, color: "#065f46",
          }}>
            🎉 {t(E, "Answer: 4 patches, .GH.GH", "답: 패치 4개, .GH.GH")}
          </div>
        )}

        {/* 2026-09-26 walkhome/sims.jsx 와 같은 처방 — 좁은 화면에서 버튼 줄이 넘치면
            둘째 줄로 자연스럽게 접히게 flexWrap, 마지막 걸음에서 고정 바에 가려지면
            navRef 효과로 그만큼 스크롤을 밀어준다. */}
        <div ref={navRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 10, rowGap: 8, marginTop: 14 }}>
          <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
          {/* ⭐ 끝까지 건너뛰기 — walkhome/sims.jsx·mcc20citytour 와 같은 자리·같은 용도. */}
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
