// Corner Cover (MCC 2024 P1) 시뮬.
// 이 문제의 전부는 한 장의 그림이다 — "코너 두 개는 한 변의 양 끝이라,
// 그 변을 끝에서 끝까지 닿아야 둘 다 품는다."
// 슬라이더로 부분격자를 직접 놓아보게 만들면 규칙을 말로 안 해도 보인다.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#059669";
const CELL = 34, GAP = 3;

/* ═══════════════════════════════════════════════════════════════
   CornerCoverSim — n×m 격자 위에 h×w 부분격자를 직접 옮겨 보며
   "코너 몇 개를 덮었나" 를 즉시 센다.
   크기를 바꾸면 YES/NO 가 왜 그렇게 되는지도 같이 나온다.
   ═══════════════════════════════════════════════════════════════ */
export function CornerCoverSim({ E }) {
  const n = 4, m = 5;                     // 고정 격자 (숫자가 작아야 눈이 따라옴)
  const [h, setH] = useState(4);          // 부분격자 세로
  const [w, setW] = useState(2);          // 부분격자 가로
  const [r, setR] = useState(1);          // 놓은 위치 (1-indexed)
  const [c, setC] = useState(1);

  const fits = h <= n && w <= m;
  const maxR = Math.max(1, n - h + 1), maxC = Math.max(1, m - w + 1);
  const rr = Math.min(r, maxR), cc = Math.min(c, maxC);

  const corners = [[1, 1], [1, m], [n, 1], [n, m]];
  const covered = (ci, cj) => fits && ci >= rr && ci < rr + h && cj >= cc && cj < cc + w;
  const hit = corners.filter(([ci, cj]) => covered(ci, cj)).length;

  // 이 크기로 "어딘가에 놓으면" 코너 2개가 되나 — 코드가 판정하는 그 조건
  const spans = fits && (h === n || w === m);

  const Slider = ({ label, val, set, min, max, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, fontWeight: 700 }}>
      <span style={{ width: 74, color, fontFamily: "'JetBrains Mono',monospace" }}>{label} = {val}</span>
      <input type="range" min={min} max={max} value={val}
        onChange={(e) => set(Number(e.target.value))}
        style={{ width: 118, accentColor: color }} />
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginBottom: 10, wordBreak: "keep-all" }}>
        {t(E, <>Move the subgrid and resize it. How many corner cells does it hold?</>,
              <>부분격자를 옮기고 크기도 바꿔보세요. 코너 칸을 몇 개 품나요?</>)}
      </div>

      {/* 판정 — 지금 크기로 가능한가 */}
      <div style={{
        maxWidth: 430, margin: "0 auto 12px", padding: "9px 13px", borderRadius: 10,
        background: spans ? "#ecfdf5" : "#fef2f2",
        border: `1.5px solid ${spans ? "#86efac" : "#fca5a5"}`,
        color: spans ? "#15803d" : "#b91c1c",
        fontSize: 12.5, fontWeight: 800, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6,
      }}>
        {!fits
          ? t(E, <>{h}×{w} does not even fit in {n}×{m} → <b>NO</b></>,
                <>{h}×{w} 는 {n}×{m} 안에 들어가지도 못해요 → <b>NO</b></>)
          : spans
            ? t(E, <>{h}×{w} can reach a whole side → <b>YES</b></>,
                  <>{h}×{w} 는 한 변을 끝까지 닿을 수 있어요 → <b>YES</b></>)
            : t(E, <>{h}×{w} fits, but never reaches a whole side → <b>NO</b></>,
                  <>{h}×{w} 는 들어가지만 한 변을 끝까지 못 닿아요 → <b>NO</b></>)}
      </div>

      {/* 격자 */}
      <div style={{ width: m * CELL + (m - 1) * GAP, margin: "0 auto 4px" }}>
        {Array.from({ length: n }).map((_, ri) => (
          <div key={ri} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
            {Array.from({ length: m }).map((_, cj) => {
              const R = ri + 1, Cc = cj + 1;
              const isCorner = corners.some(([a, b]) => a === R && b === Cc);
              const on = covered(R, Cc);
              return (
                <div key={cj} style={{
                  width: CELL, height: CELL, display: "flex", alignItems: "center",
                  justifyContent: "center", borderRadius: 6, fontSize: 15, fontWeight: 800,
                  background: on ? (isCorner ? "#bbf7d0" : "#d1fae5") : isCorner ? "#fee2e2" : "#fff",
                  border: `${on ? 2 : 1}px solid ${on ? A : isCorner ? "#fca5a5" : "#e2e8f0"}`,
                  color: isCorner ? "#b91c1c" : "#94a3b8",
                  transition: "all .12s",
                }}>{isCorner ? "◆" : ""}</div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 12 }}>
        {t(E, "◆ = corner cell", "◆ = 코너 칸")} · {t(E, "green = your subgrid", "초록 = 놓은 부분격자")}
      </div>

      {/* 지금 몇 개 덮었나 */}
      <div style={{
        maxWidth: 300, margin: "0 auto 14px", textAlign: "center",
        fontSize: 13, fontWeight: 800,
        color: hit >= 2 ? "#15803d" : "#92400e",
      }}>
        {t(E, <>corners covered right now: <b style={{ fontSize: 17 }}>{hit}</b> / 4</>,
              <>지금 덮은 코너: <b style={{ fontSize: 17 }}>{hit}</b> / 4</>)}
        {hit >= 2 && " ✅"}
      </div>

      {/* 조작 */}
      <div style={{
        maxWidth: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: 7,
        padding: "11px 13px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10,
      }}>
        <Slider label="h" val={h} set={setH} min={1} max={n} color={A} />
        <Slider label="w" val={w} set={setW} min={1} max={m} color={A} />
        <div style={{ height: 1, background: "#e2e8f0", margin: "2px 0" }} />
        <Slider label={t(E, "row", "행")} val={rr} set={setR} min={1} max={maxR} color="#64748b" />
        <Slider label={t(E, "col", "열")} val={cc} set={setC} min={1} max={maxC} color="#64748b" />
      </div>

      {/* 코드와 이어주기 — 화면의 h·w 가 코드의 그 변수 */}
      <div style={{
        maxWidth: 430, margin: "12px auto 0", padding: "9px 13px", borderRadius: 10,
        background: "#f8fafc", border: "1px solid #e2e8f0",
        fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: "#334155", lineHeight: 1.8,
      }}>
        <div>
          {t(E, "fits", "들어가나")}: {h} ≤ {n} {h <= n ? "✔" : "✘"} {" · "} {w} ≤ {m} {w <= m ? "✔" : "✘"}
        </div>
        <div>
          {t(E, "spans", "꽉 채우나")}: h == n ({h}=={n}) {h === n ? "✔" : "✘"} {" 또는 "} w == m ({w}=={m}) {w === m ? "✔" : "✘"}
        </div>
        <div style={{ marginTop: 3, fontWeight: 800, color: spans ? "#15803d" : "#b91c1c" }}>
          → {spans ? "YES" : "NO"}
        </div>
      </div>
    </div>
  );
}
