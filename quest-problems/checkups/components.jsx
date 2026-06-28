// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 6/13 (TLE 7-13, Python expected slow)
//   C++:    6/13 (intended O(N^3))
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md
//   (2026-06-28: 용어만 대각선→"s 같은 구간", 변수 diag→insideUpTo. 로직 무변경, 출력 동일.)
//   (2026-06-28: 변수 a→cow, b→want, c→checks. 로직 무변경.)

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

// Official Sample 1 (cpid=1469): N=3, cow=[1,3,2], want=[3,2,1]. Answers: 3,3,0,0.
const CK_SAMPLE = ["3", "1 3 2", "3 2 1"];

const A = "#dc2626";

/* ════════════════════════════════════════════════════════════════════
   ReverseSim — drag (l, r) to reverse a subarray and count vet checkups
   ════════════════════════════════════════════════════════════════════ */
const _CK_PRESETS = [
  { name: "S1: cow=[1,3,2] want=[3,2,1]",  cow: [1, 3, 2],             want: [3, 2, 1] },
  { name: "S2: cow=[1,2,3] want=[1,2,3]",  cow: [1, 2, 3],             want: [1, 2, 3] },
  { name: "S3: cow=[1,3,2,2,1,3,2] want=[3,2,2,1,2,3,1]", cow: [1, 3, 2, 2, 1, 3, 2], want: [3, 2, 2, 1, 2, 3, 1] },
];

// Same species color palette as the 1-1 mini-visual on chapters.jsx —
// keep them in sync so the student sees ONE visual language across the quest.
const _SPECIES = {
  1: { bg: "#fef3c7", text: "#92400e", border: "#fbbf24" },  // amber
  2: { bg: "#dbeafe", text: "#1e3a8a", border: "#60a5fa" },  // blue
  3: { bg: "#fce7f3", text: "#9d174d", border: "#f472b6" },  // pink
  4: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },  // green
  5: { bg: "#ede9fe", text: "#5b21b6", border: "#a78bfa" },  // purple
};

export function ReverseSim({ E }) {
  const [pi, setPi] = useState(2);
  const preset = _CK_PRESETS[pi];
  const N = preset.cow.length;
  const [l, setL] = useState(1);
  const [r, setR] = useState(N);

  // Clamp on preset change
  const safeL = Math.min(l, N);
  const safeR = Math.min(Math.max(r, safeL), N);

  // Build cow' = cow with positions [safeL..safeR] reversed (1-indexed, inclusive)
  const cowPrime = preset.cow.slice();
  for (let i = safeL - 1, j = safeR - 1; i < j; i++, j--) {
    [cowPrime[i], cowPrime[j]] = [cowPrime[j], cowPrime[i]];
  }

  let matches = 0;
  for (let i = 0; i < N; i++) if (cowPrime[i] === preset.want[i]) matches++;

  // Cell size adapts to N — keeps the row from overflowing on long arrays.
  const cellSize = N <= 5 ? 52 : (N <= 8 ? 44 : 36);
  const fontSize = cellSize >= 50 ? 22 : (cellSize >= 42 ? 18 : 15);
  const cellGap = 8;

  // Render one species cell. `swapped` = inside [l, r] (reversal segment).
  // `matched` = cow'[i] == want[i] — kept subtle (no inset glow on data cells), the
  // only loud match indicator is the ✓ pill in its own row below.  This keeps
  // the data rows calm so the colour-shift across the swap reads as the
  // primary visual story.
  const cell = (val, { swapped = false } = {}) => {
    const sp = _SPECIES[val] || _SPECIES[1];
    return (
      <div style={{
        width: cellSize, height: cellSize, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize,
        background: sp.bg, color: sp.text,
        border: `${swapped ? 1.5 : 1}px ${swapped ? "dashed" : "solid"} ${swapped ? "#3b82f6" : sp.border}`,
      }}>{val}</div>
    );
  };

  // Has the reversal actually changed anything? (l == r means a 1-element reverse,
  // which is a no-op.)  Used to label rows correctly so it never says "after swap"
  // when nothing was swapped.
  const reversed = safeL < safeR;

  return (
    <div style={{ padding: 14 }}>
      {/* No "how to play" box — clicking on numbered chips below to set l/r is self-evident
          once you see the [ ] brackets and tinted band react. */}

      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 500 }}>{t(E, "Example:", "예시:")}</div>
        {_CK_PRESETS.map((p, i) => (
          <button key={i}
            onClick={() => { setPi(i); setL(1); setR(p.cow.length); }}
            style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600,
              border: `1px solid ${pi === i ? A : C.border}`,
              background: pi === i ? "#fee2e2" : "#fff",
              color: pi === i ? A : C.text,
              cursor: "pointer",
            }}>{p.name.split(":")[0]}</button>
        ))}
        <div style={{ fontSize: 10, color: C.dim, marginLeft: 4 }}>
          (N = {N})
        </div>
      </div>

      {/* position picker — click a number to set l, click another to set r. */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {Array.from({ length: N }, (_, i) => {
            const pos = i + 1;
            const isL = pos === safeL;
            const isR = pos === safeR;
            const inside = pos >= safeL && pos <= safeR;
            const isEnd = isL || isR;
            return (
              <button key={i}
                onClick={() => {
                  // Click logic: if l == r, the next click sets r (extending the range).
                  // Otherwise, start over: this click becomes the new l.
                  if (safeL === safeR) {
                    if (pos < safeL) { setL(pos); /* keep r */ }
                    else if (pos > safeL) { setR(pos); }
                    else { /* same chip — no-op */ }
                  } else {
                    setL(pos); setR(pos);
                  }
                }}
                style={{
                  width: 36, height: 36, borderRadius: 8, fontSize: 13,
                  fontWeight: isEnd ? 700 : 500,
                  fontFamily: "'JetBrains Mono',monospace",
                  border: isEnd
                    ? `2px solid ${isL ? A : "#0891b2"}`
                    : inside ? "1.5px solid #93c5fd" : "1px solid #e5e7eb",
                  background: isL ? "#fee2e2" : isR ? "#cffafe" : inside ? "#eff6ff" : "#fff",
                  color: isL ? A : isR ? "#0891b2" : inside ? "#1e40af" : C.text,
                  cursor: "pointer",
                }}>{pos}</button>
            );
          })}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, textAlign: "center", color: C.text, fontWeight: 500 }}>
          <span style={{ color: A, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>l = {safeL}</span>
          <span style={{ margin: "0 10px", color: C.dim }}>·</span>
          <span style={{ color: "#0891b2", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>r = {safeR}</span>
        </div>
      </div>

      {/* No prose summary — the [ ] brackets + tinted band + arc overlay below
          show the reversal range visually. */}

      {(() => {
        const labelWidth = 110;
        const cellGap2 = 8;
        const cellCenterX = (i) => i * (cellSize + cellGap2) + cellSize / 2;
        const arcHeight = 26;
        const swapPairs = [];
        if (reversed) {
          for (let i = safeL - 1, j = safeR - 1; i < j; i++, j--) swapPairs.push([i, j]);
        }
        const totalWidth = N * cellSize + (N - 1) * cellGap2;

        // Build a [...] bracket strip so the swap range is unmistakable
        // even before you read the cell colours.
        const bracketStrip = (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: labelWidth }} />
            <div style={{ display: "flex", gap: cellGap2 }}>
              {preset.cow.map((_, i) => {
                const pos = i + 1;
                const isL = reversed && pos === safeL;
                const isR = reversed && pos === safeR;
                return (
                  <div key={i} style={{
                    width: cellSize, height: 18, fontSize: 14, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    color: isL ? A : isR ? "#0891b2" : "transparent",
                    textAlign: "center", lineHeight: "18px",
                  }}>{isL ? "[" : isR ? "]" : ""}</div>
                );
              })}
            </div>
          </div>
        );

        // Soft tinted band that spans positions [l..r] across BOTH a and a' rows.
        // Sits behind the cells. Same width as the swapped slice — students
        // can see at a glance "this much got flipped".
        const tintedBand = ({ row }) => {
          if (!reversed) return null;
          const left = (safeL - 1) * (cellSize + cellGap2);
          const width = (safeR - safeL + 1) * cellSize + (safeR - safeL) * cellGap2;
          return (
            <div style={{
              position: "absolute", left, width,
              top: -3, bottom: -3,
              background: row === "cow" ? "rgba(254, 226, 226, 0.55)" : "rgba(207, 250, 254, 0.55)",
              border: `1px dashed ${row === "cow" ? "#fca5a5" : "#67e8f9"}`,
              borderRadius: 8, pointerEvents: "none", zIndex: 0,
            }} />
          );
        };

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            {bracketStrip}
            {/* Original cow row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: labelWidth, fontSize: 11, fontWeight: 500, color: "#7f1d1d", textAlign: "right", lineHeight: 1.2 }}>
                {t(E, "🐄 original", "🐄 원래")}
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 400 }}>cow</div>
              </div>
              <div style={{ position: "relative", display: "flex", gap: cellGap2 }}>
                {tintedBand({ row: "cow" })}
                {preset.cow.map((v, i) => <div key={i} style={{ position: "relative", zIndex: 1 }}>{cell(v)}</div>)}
              </div>
            </div>

            {/* Swap arc overlay — visible only when something IS reversed.
                Each pair (i, l+r-i) gets two crossing dashed arcs that LOOK
                like the values are sliding past each other into mirrored
                positions.  This is the 'feel of reversing' that was missing. */}
            {reversed && swapPairs.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: labelWidth }} />
                <svg
                  width={totalWidth}
                  height={arcHeight}
                  style={{ display: "block", overflow: "visible" }}
                  aria-hidden="true"
                >
                  {swapPairs.map(([i, j], k) => {
                    const x1 = cellCenterX(i);
                    const x2 = cellCenterX(j);
                    const dip = Math.min(arcHeight - 4, 10 + (j - i) * 2);
                    return (
                      <g key={k}>
                        <path d={`M ${x1} 0 Q ${(x1 + x2) / 2} ${dip} ${x2} ${arcHeight}`}
                          fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
                        <path d={`M ${x2} 0 Q ${(x1 + x2) / 2} ${arcHeight - dip} ${x1} ${arcHeight}`}
                          fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* cow' row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: labelWidth, fontSize: 11, fontWeight: 500, color: "#7f1d1d", textAlign: "right", lineHeight: 1.2 }}>
                {reversed
                  ? t(E, "🐄 after swap", "🐄 뒤집기 후")
                  : t(E, "🐄 (= cow)", "🐄 (= cow)")}
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 400 }}>cow'</div>
              </div>
              <div style={{ position: "relative", display: "flex", gap: cellGap2 }}>
                {tintedBand({ row: "cowPrime" })}
                {cowPrime.map((v, i) => {
                  const inside = reversed && i + 1 >= safeL && i + 1 <= safeR;
                  return <div key={i} style={{ position: "relative", zIndex: 1 }}>{cell(v, { swapped: inside })}</div>;
                })}
              </div>
            </div>

            {/* b row, with a tiny gap so the eye reads it as 'compare with' */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <div style={{ width: labelWidth, fontSize: 11, fontWeight: 500, color: "#7f1d1d", textAlign: "right", lineHeight: 1.2 }}>
                {t(E, "📋 vet wants", "📋 원하는 종")}
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 400 }}>want</div>
              </div>
              <div style={{ display: "flex", gap: cellGap2 }}>
                {preset.want.map((v, i) => <div key={i}>{cell(v)}</div>)}
              </div>
            </div>

            {/* treated row — light tint, never a heavy solid pill */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <div style={{ width: labelWidth, fontSize: 11, fontWeight: 500, color: "#15803d", textAlign: "right" }}>
                {t(E, "💉 treated?", "💉 치료?")}
              </div>
              <div style={{ display: "flex", gap: cellGap2 }}>
                {preset.want.map((v, i) => {
                  const m = cowPrime[i] === v;
                  return (
                    <div key={i} style={{
                      width: cellSize, height: Math.round(cellSize * 0.5), borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: Math.round(fontSize * 0.75), fontWeight: 500,
                      background: m ? "#dcfce7" : "transparent",
                      color: m ? "#166534" : "#cbd5e1",
                      border: m ? "1px solid #86efac" : "1px dashed #e5e7eb",
                    }}>{m ? "✓" : "—"}</div>
                  );
                })}
              </div>
            </div>

            {/* position labels */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: labelWidth }} />
              <div style={{ display: "flex", gap: cellGap2 }}>
                {preset.cow.map((_, i) => (
                  <div key={i} style={{ width: cellSize, fontSize: 10, color: C.dim, textAlign: "center", fontWeight: 400 }}>{i + 1}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Count badge — large number, minimal prose.  Just 💉 icon + count / total. */}
      <div style={{
        marginTop: 14, padding: "8px 14px", borderRadius: 10,
        background: "#f0fdf4", border: "1.5px solid #86efac",
        display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8,
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span style={{ fontSize: 22 }}>💉</span>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#15803d" }}>{matches}</span>
        <span style={{ fontSize: 14, color: C.dim, fontWeight: 600 }}>/ {N}</span>
      </div>
      {/* No caption — the arcs/✓ marks/colored cells have to carry their own meaning. */}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Stub legacy exports — chapters.jsx no longer renders sim/runner
   steps directly, but CheckupsApp still imports these names. Keep them
   as no-op exports so the import doesn't break.
   ════════════════════════════════════════════════════════════════════ */
export function CheckupsSim({ E }) { return <ReverseSim E={E} />; }
export function CheckupsRunner() {
  // Empty — interactivity lives in ReverseSim above.
  return null;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code — 7 sections (brute 1–4, smart 5–7).
   ════════════════════════════════════════════════════════════════════ */

/* ── Brute (cumulative) ── */
const CK_BRUTE_S1_PY = [
  "N = int(input())",
  "cow = list(map(int, input().split()))",
  "want = list(map(int, input().split()))",
  "",
  "counts = [0] * (N + 1)   # counts[checks] = (l, r) 쌍 중 검진 수가 정확히 checks 인 개수",
];
const CK_BRUTE_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> cow(N), want(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> cow[i];",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> want[i];",
  "    }",
  "    vector<int> counts(N + 1, 0);",
];

const CK_BRUTE_S2_PY = [
  "N = int(input())",
  "cow = list(map(int, input().split()))",
  "want = list(map(int, input().split()))",
  "",
  "counts = [0] * (N + 1)",
  "",
  "# 외곽 (l, r) 쌍 — 서로 다른 연산 N(N+1)/2 개",
  "for l in range(N):",
  "    for r in range(l, N):",
  "        pass   # (다음 단계에서 안쪽 채움)",
];
const CK_BRUTE_S2_CPP = [
  "// (input + counts init from step 1)",
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            // inner: count checkups",
  "        }",
  "    }",
];

const CK_BRUTE_S3_PY = [
  "for l in range(N):",
  "    for r in range(l, N):",
  "        # Count checkups after reversing cow[l..r]",
  "        checks = 0",
  "        for i in range(N):",
  "            # Inside [l, r]: position i holds the value originally at l + r - i",
  "            if l <= i <= r:",
  "                v = cow[l + r - i]",
  "            else:",
  "                v = cow[i]",
  "            if v == want[i]:",
  "                checks += 1",
];
const CK_BRUTE_S3_CPP = [
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            int checks = 0;",
  "            for (int i = 0; i < N; i++) {",
  "                int v;",
  "                if (l <= i && i <= r) {",
  "                    v = cow[l + r - i];",
  "                } else {",
  "                    v = cow[i];",
  "                }",
  "                if (v == want[i]) {",
  "                    checks++;",
  "                }",
  "            }",
  "        }",
  "    }",
];

const CK_BRUTE_FULL_PY = [
  "N = int(input())",
  "cow = list(map(int, input().split()))",
  "want = list(map(int, input().split()))",
  "",
  "counts = [0] * (N + 1)",
  "for l in range(N):",
  "    for r in range(l, N):",
  "        checks = 0",
  "        for i in range(N):",
  "            # [l, r] 안: 뒤집힌 후 i 자리에는 원래 (l + r - i) 자리 값.",
  "            # [l, r] 바깥: 그대로 cow[i].",
  "            if l <= i <= r:",
  "                v = cow[l + r - i]",
  "            else:",
  "                v = cow[i]",
  "            if v == want[i]:",
  "                checks += 1",
  "        counts[checks] += 1",
  "",
  "for checks in counts:",
  "    print(checks)",
];
const CK_BRUTE_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> cow(N), want(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> cow[i];",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> want[i];",
  "    }",
  "",
  "    vector<int> counts(N + 1, 0);",
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            int checks = 0;",
  "            for (int i = 0; i < N; i++) {",
  "                int v;",
  "                if (l <= i && i <= r) {",
  "                    v = cow[l + r - i];",
  "                } else {",
  "                    v = cow[i];",
  "                }",
  "                if (v == want[i]) {",
  "                    checks++;",
  "                }",
  "            }",
  "            counts[checks]++;",
  "        }",
  "    }",
  "    for (int checks : counts) {",
  "        cout << checks << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Smart code, split into 4 small pages.  Each page = one idea + a
     focused code snippet (NOT cumulative — students see only what's new
     on each page, like the brute split).  Variable names spell out
     what the array holds, so a learner can read the page top-to-bottom
     without holding extra context in their head. ── */

// Page 5 — IDEA only.  No new working code; just a tiny pseudocode
// reminder of what the brute inner loop kept asking.  The aside on
// this section carries the visual ("same-s window = same comparison").
const CK_SMART_S5_PY = [
  "# brute 안쪽 루프가 (l, r) 마다 묻는 것:",
  "#   for i in range(N):",
  "#       if l ≤ i ≤ r:  v = cow[l + r - i]    # 윈도우 안",
  "#       else:          v = cow[i]            # 윈도우 바깥",
  "#       if v == want[i]:  checks += 1",
  "#",
  "# 관찰:",
  "#   1) 윈도우 바깥은 늘 cow[i]·want[i] 비교 — (l, r) 무관, 매번 같은 답.",
  "#   2) 윈도우 안은 cow[l+r-i]·want[i] 비교 — l+r 만 같으면 모두 같은 답.",
  "#",
  "# 작전: 두 부분을 prefix-sum 으로 한 번씩만 계산해서 공유.",
];
const CK_SMART_S5_CPP = [
  "// brute 안쪽 루프가 (l, r) 마다 묻는 것:",
  "//   for (int i = 0; i < N; i++) {",
  "//       int v = (l <= i && i <= r) ? cow[l + r - i] : cow[i];",
  "//       if (v == want[i]) checks++;",
  "//   }",
  "//",
  "// 관찰:",
  "//   1) 윈도우 바깥은 cow[i]·want[i] — (l, r) 무관 → 매번 같은 답.",
  "//   2) 윈도우 안은 cow[l+r-i]·want[i] — l+r 같으면 모두 같은 답.",
  "//",
  "// 작전: 두 부분을 prefix-sum 한 번씩만 계산 → 공유.",
];

// Page 6 — outside prefix matchUpTo, built ONCE.
const CK_SMART_S6_PY = [
  "# 1-indexed 로 바꾸기 — 앞에 0 자리 끼우면 prefix 식이 깔끔해짐.",
  "# (cow, want 는 brute 와 같은 이름 그대로 — 단 1번부터 시작.)",
  "cow = [0] + list(map(int, input().split()))",
  "want = [0] + list(map(int, input().split()))",
  "",
  "# matchUpTo[i] = 1..i 위치 중 cow[k] == want[k] 인 자리 개수.",
  "# 어떤 (l, r) 도 바깥(0..l-1, r+1..N) 일치를 O(1) 로 답할 수 있음:",
  "#   바깥 일치 = matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r])",
  "matchUpTo = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    if cow[i] == want[i]:",
  "        matchUpTo[i] = matchUpTo[i - 1] + 1",
  "    else:",
  "        matchUpTo[i] = matchUpTo[i - 1]",
];
const CK_SMART_S6_CPP = [
  "// 1-indexed — 앞에 0 자리 비워두기.",
  "vector<int> cow(N + 1), want(N + 1);",
  "for (int i = 1; i <= N; i++) {",
  "    cin >> cow[i];",
  "}",
  "for (int i = 1; i <= N; i++) {",
  "    cin >> want[i];",
  "}",
  "",
  "// matchUpTo[i] = 1..i 위치 중 cow[k] == want[k] 자리 개수.",
  "// 어떤 (l, r) 도 바깥 일치를 O(1) 로 조회:",
  "//   바깥 = matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r])",
  "vector<int> matchUpTo(N + 1, 0);",
  "for (int i = 1; i <= N; i++) {",
  "    if (cow[i] == want[i]) {",
  "        matchUpTo[i] = matchUpTo[i - 1] + 1;",
  "    } else {",
  "        matchUpTo[i] = matchUpTo[i - 1];",
  "    }",
  "}",
];

// Page 7 — inside prefix insideUpTo, built per same-s window s = l + r.
const CK_SMART_S7_PY = [
  "# s 같은 구간의 모든 (l, r) 쌍이 같은 비교를 함:",
  "#   안쪽은 i = l..r 에서 cow[s - i] == want[i] 를 묻는 것.",
  "# insideUpTo[k] = 여기까지 ✓ (s 같은 구간에서 k 까지 cow[s−j]==want[j] 인 자리 수).",
  "# 그러면 (l, r) 의 안쪽 일치 = insideUpTo[r] - insideUpTo[l - 1] (O(1)).",
  "for s in range(2, 2 * N + 1):",
  "    insideUpTo = [0] * (N + 2)",
  "    for k in range(1, N + 1):",
  "        j = s - k",
  "        if 1 <= j <= N and cow[j] == want[k]:",
  "            insideUpTo[k] = insideUpTo[k - 1] + 1",
  "        else:",
  "            insideUpTo[k] = insideUpTo[k - 1]",
  "    # ↓ 다음 페이지: 같은 s 의 (l, r) 들 다 처리",
];
const CK_SMART_S7_CPP = [
  "// s 같은 구간의 (l, r) 쌍들이 같은 비교를 함:",
  "//   안쪽은 i = l..r 에서 cow[s - i] == want[i].",
  "// insideUpTo[k] = checkmarks so far (matches up to k on this same-s window).",
  "// (l, r) 의 안쪽 일치 = insideUpTo[r] - insideUpTo[l - 1] (O(1)).",
  "vector<int> insideUpTo(N + 2);",
  "for (int s = 2; s <= 2 * N; s++) {",
  "    insideUpTo[0] = 0;",
  "    for (int k = 1; k <= N; k++) {",
  "        int j = s - k;",
  "        if (1 <= j && j <= N && cow[j] == want[k]) {",
  "            insideUpTo[k] = insideUpTo[k - 1] + 1;",
  "        } else {",
  "            insideUpTo[k] = insideUpTo[k - 1];",
  "        }",
  "    }",
  "    // ↓ 다음 페이지: 같은 s 의 (l, r) 들 처리",
];

// Page 8 — collect every (l, r) on same-s window s + print.
const CK_SMART_S8_PY = [
  "# 결과: pairsWithCheckups[checks] = 검진 수가 정확히 checks 인 (l, r) 쌍 개수",
  "pairsWithCheckups = [0] * (N + 1)",
  "",
  "# 위 두 페이지의 for s 루프 안에서:",
  "    # 같은 s 위 유효 (l, r): l ≥ max(1, s - N), l ≤ s // 2, r = s - l",
  "    for l in range(max(1, s - N), s // 2 + 1):",
  "        r = s - l",
  "        inside  = insideUpTo[r] - insideUpTo[l - 1]",
  "        outside = matchUpTo[l - 1] + (matchUpTo[N] - matchUpTo[r])",
  "        pairsWithCheckups[inside + outside] += 1",
  "",
  "# 끝: counts 한 줄씩 출력",
  "for checks in pairsWithCheckups:",
  "    print(checks)",
];
const CK_SMART_S8_CPP = [
  "// 결과: pairsWithCheckups[checks] = 검진 수가 정확히 checks 인 (l, r) 쌍 개수",
  "vector<int> pairsWithCheckups(N + 1, 0);",
  "",
  "// 위 페이지의 for (s) 루프 안에서:",
  "    int l_min = max(1, s - N);",
  "    int l_max = s / 2;",
  "    for (int l = l_min; l <= l_max; l++) {",
  "        int r = s - l;",
  "        int inside  = insideUpTo[r] - insideUpTo[l - 1];",
  "        int outside = matchUpTo[l - 1] + (matchUpTo[N] - matchUpTo[r]);",
  "        pairsWithCheckups[inside + outside]++;",
  "    }",
  "}   // close for (s)",
  "",
  "// 끝: counts 한 줄씩 출력",
  "for (int checks : pairsWithCheckups) {",
  "    cout << checks << '\\n';",
  "}",
];

/* ── Page 9 — FULL smart code, all pieces wired together with consistent
   variable names (matchUpTo + insideUpTo).  Lets the student see the whole
   algorithm at once, after walking through it section by section.    ── */
const CK_SMART_FULL_PY = [
  "N = int(input())",
  "cow = [0] + list(map(int, input().split()))   # 앞에 0 자리 끼워 1-indexed",
  "want = [0] + list(map(int, input().split()))",
  "",
  "# ① 바깥 prefix — 한 번만 만들고 끝.",
  "matchUpTo = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    if cow[i] == want[i]:",
  "        matchUpTo[i] = matchUpTo[i - 1] + 1",
  "    else:",
  "        matchUpTo[i] = matchUpTo[i - 1]",
  "",
  "pairsWithCheckups = [0] * (N + 1)",
  "",
  "# ② 모든 s 같은 구간 s = l + r 순회 (s = 2..2N).",
  "for s in range(2, 2 * N + 1):",
  "    # ③ s 같은 구간 안쪽 prefix — 이 s 의 모든 (l, r) 가 공유.",
  "    insideUpTo = [0] * (N + 2)",
  "    for k in range(1, N + 1):",
  "        j = s - k",
  "        if 1 <= j <= N and cow[j] == want[k]:",
  "            insideUpTo[k] = insideUpTo[k - 1] + 1",
  "        else:",
  "            insideUpTo[k] = insideUpTo[k - 1]",
  "",
  "    # ④ 같은 s 위 유효 (l, r) 모두 처리: 안쪽 + 바깥 = 검진 수.",
  "    l_min = max(1, s - N)",
  "    l_max = s // 2",
  "    for l in range(l_min, l_max + 1):",
  "        r = s - l",
  "        inside  = insideUpTo[r] - insideUpTo[l - 1]",
  "        outside = matchUpTo[l - 1] + (matchUpTo[N] - matchUpTo[r])",
  "        pairsWithCheckups[inside + outside] += 1",
  "",
  "# ⑤ counts 0..N 한 줄씩 출력.",
  "for checks in pairsWithCheckups:",
  "    print(checks)",
];
const CK_SMART_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> cow(N + 1), want(N + 1);   // 1-indexed",
  "    for (int i = 1; i <= N; i++) {",
  "        cin >> cow[i];",
  "    }",
  "    for (int i = 1; i <= N; i++) {",
  "        cin >> want[i];",
  "    }",
  "",
  "    // ① 바깥 prefix — 한 번만.",
  "    vector<int> matchUpTo(N + 1, 0);",
  "    for (int i = 1; i <= N; i++) {",
  "        if (cow[i] == want[i]) {",
  "            matchUpTo[i] = matchUpTo[i - 1] + 1;",
  "        } else {",
  "            matchUpTo[i] = matchUpTo[i - 1];",
  "        }",
  "    }",
  "",
  "    vector<int> pairsWithCheckups(N + 1, 0);",
  "",
  "    // ② s 같은 구간 s = l + r 순회.",
  "    vector<int> insideUpTo(N + 2);",
  "    for (int s = 2; s <= 2 * N; s++) {",
  "        // ③ 안쪽 prefix.",
  "        insideUpTo[0] = 0;",
  "        for (int k = 1; k <= N; k++) {",
  "            int j = s - k;",
  "            if (1 <= j && j <= N && cow[j] == want[k]) {",
  "                insideUpTo[k] = insideUpTo[k - 1] + 1;",
  "            } else {",
  "                insideUpTo[k] = insideUpTo[k - 1];",
  "            }",
  "        }",
  "",
  "        // ④ 같은 s 의 유효 (l, r).",
  "        int l_min = max(1, s - N);",
  "        int l_max = s / 2;",
  "        for (int l = l_min; l <= l_max; l++) {",
  "            int r = s - l;",
  "            int inside  = insideUpTo[r] - insideUpTo[l - 1];",
  "            int outside = matchUpTo[l - 1] + (matchUpTo[N] - matchUpTo[r]);",
  "            pairsWithCheckups[inside + outside]++;",
  "        }",
  "    }",
  "",
  "    // ⑤ 출력.",
  "    for (int checks : pairsWithCheckups) {",
  "        cout << checks << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Asides ── */
const CkPerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#991b1b", marginBottom: 6 }}>
      🐌 {t(E, "Operation count (brute O(N³))", "연산량 (brute O(N³))")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 100</code>
      <div>{t(E, "10⁶ ops — instant ✓", "100 만 — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 1,000</code>
      <div>{t(E, "10⁹ ops — TLE in Python", "10 억 — Python TLE")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 7,500</code>
      <div>{t(E, "≈4·10¹¹ ops — TLE 🚫", "≈4·10¹¹ — TLE 🚫")}</div>
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11 }}>
      {t(E,
        "Inner loop walks the whole array for every (l, r) pair. N² pairs × N work each.",
        "안쪽 루프가 (l, r) 마다 전체 배열 훑음. N² 쌍 × N 일.")}
    </div>
  </div>
);

const CkInsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Same s = same work", "s 같은 구간 = 같은 일")}
    </div>
    <div>
      {t(E,
        "After reverse, position i holds cow[l+r−i]. Two pairs (l₁, r₁) and (l₂, r₂) with l₁+r₁ = l₂+r₂ ask the SAME match question per i. Compute it once.",
        "뒤집은 후 위치 i 에는 cow[l+r−i] 가 옴. l+r 가 같은 두 쌍은 i 마다 같은 매칭 질문을 함. 한 번만 계산.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      <div>{t(E, "Per value of s: O(N) to build Q.", "s 같은 구간마다: Q 만들기 O(N).")}</div>
      <div>{t(E, "Total: 2N − 1 values of s × O(N) = ", "총: s 값 2N − 1 개 × O(N) = ")}<b>O(N²)</b></div>
    </div>
  </div>
);

const CkSmartAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Two prefix arrays do all the work", "prefix 배열 2 개로 끝")}
    </div>
    <div style={{ marginBottom: 6 }}>
      <b>matchUpTo</b> {t(E, "(built once): outside-window matches stay constant.",
                          "(한 번): 윈도우 바깥 일치는 그대로.")}
    </div>
    <div>
      <b>insideUpTo</b> {t(E, "(rebuilt per same-s window): inside-window matches in O(1) per (l, r).",
                       "(s 같은 구간마다): 안쪽 일치를 (l, r) 마다 O(1).")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "Total work ~ N² (was N³).  N=7500 → about 5·10⁷ checks — fast enough.",
            "전체 일은 ~ N² (원래 N³). N=7500 이면 약 5·10⁷ 회 — 충분히 빠름.")}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════════
   DiagonalSim — interactive sim for "same diagonal s = l+r → same value
   lands at each position i".  Student drags two (l, r) pairs; cells
   inside each window get tinted by s.  When both windows share an s,
   their inside cells share the SAME tint → student SEES that the
   comparison output at each i is invariant on a diagonal.
   Replaces the academic prose code-block + static aside that used to
   live on section ⑤.  Visualization carries the load; narration stays
   under one sentence.
   ════════════════════════════════════════════════════════════════════ */
// Palette keyed by s = l + r.  Each s value (2..2N) gets its own tint
// so two windows with the same s glow the same colour.  Outside cells
// stay neutral grey.
const _DIAG_PALETTE = {
  2:  { bg: "#fef3c7", bd: "#f59e0b", color: "#92400e" }, // amber
  3:  { bg: "#fed7aa", bd: "#fb923c", color: "#7c2d12" }, // orange
  4:  { bg: "#fecaca", bd: "#f87171", color: "#7f1d1d" }, // red
  5:  { bg: "#fce7f3", bd: "#f472b6", color: "#9d174d" }, // pink
  6:  { bg: "#ede9fe", bd: "#a78bfa", color: "#5b21b6" }, // purple
  7:  { bg: "#dbeafe", bd: "#60a5fa", color: "#1e3a8a" }, // blue
  8:  { bg: "#cffafe", bd: "#22d3ee", color: "#155e75" }, // cyan
  9:  { bg: "#dcfce7", bd: "#4ade80", color: "#166534" }, // green
  10: { bg: "#d9f99d", bd: "#a3e635", color: "#365314" }, // lime
};
const _diagTint = (s) => _DIAG_PALETTE[s] || { bg: "#f1f5f9", bd: "#cbd5e1", color: "#475569" };
const _NEUTRAL = { bg: "#f1f5f9", bd: "#e2e8f0", color: "#94a3b8" };

export function DiagonalSim({ E }) {
  // Concrete fixed array.  Length 5 keeps the row compact and makes the
  // diagonal palette feel "rich" without sprawling.
  const cow = [4, 1, 3, 2, 5];
  const N = cow.length;

  // Two windows.  Pre-set so both START on the same s = 5 — the student
  // sees the matching tints immediately, then drags to break/restore them.
  const [lX, setLX] = useState(1);
  const [rX, setRX] = useState(4);
  const [lY, setLY] = useState(2);
  const [rY, setRY] = useState(3);

  const sX = lX + rX;
  const sY = lY + rY;
  const sameDiagonal = sX === sY;

  // Build cow' for one window.
  const buildCowPrime = (l, r) => {
    const out = cow.slice();
    for (let i = l - 1, j = r - 1; i < j; i++, j--) {
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const Cell = ({ v, tint, dashed }) => (
    <div style={{
      width: 38, height: 38, borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700,
      background: tint.bg, color: tint.color,
      border: `${dashed ? 1.5 : 1}px ${dashed ? "dashed" : "solid"} ${tint.bd}`,
    }}>{v}</div>
  );

  const Slider = ({ label, value, setValue, min, max, accent }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
      <span style={{ width: 14, fontWeight: 700, color: accent, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ flex: 1, accentColor: accent }}
      />
      <span style={{ width: 18, textAlign: "center", fontWeight: 700, color: accent, fontFamily: "'JetBrains Mono',monospace" }}>{value}</span>
    </div>
  );

  // One panel: original a row + reversed a' row + s-labels under each cell.
  // Cells INSIDE [l, r] are tinted by s; cells outside stay neutral.
  const Panel = ({ title, l, r, accent, onChangeL, onChangeR }) => {
    const cowPrime = buildCowPrime(l, r);
    const s = l + r;
    const tint = _diagTint(s);
    return (
      <div style={{
        background: "#fff", border: `1.5px solid ${sameDiagonal ? tint.bd : "#e5e7eb"}`,
        borderRadius: 10, padding: "10px 12px", flex: 1, minWidth: 250,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: accent }}>{title}</div>
          <div style={{
            fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
            background: tint.bg, color: tint.color, border: `1px solid ${tint.bd}`,
            borderRadius: 6, padding: "2px 8px",
          }}>s = l+r = {s}</div>
        </div>

        {/* sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
          <Slider label="l" value={l} setValue={(v) => { onChangeL(v); if (v > r) onChangeR(v); }} min={1} max={N} accent={accent} />
          <Slider label="r" value={r} setValue={(v) => { onChangeR(v); if (v < l) onChangeL(v); }} min={1} max={N} accent={accent} />
        </div>

        {/* original cow */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>cow</div>
          <div style={{ display: "flex", gap: 4 }}>
            {cow.map((v, i) => <Cell key={i} v={v} tint={_NEUTRAL} />)}
          </div>
        </div>

        {/* cow' (after reverse) */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>cow'</div>
          <div style={{ display: "flex", gap: 4 }}>
            {cowPrime.map((v, i) => {
              const pos = i + 1;
              const inside = pos >= l && pos <= r;
              return <Cell key={i} v={v} tint={inside ? tint : _NEUTRAL} dashed={inside} />;
            })}
          </div>
        </div>

        {/* s label under each inside cell — empty outside */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>s</div>
          <div style={{ display: "flex", gap: 4 }}>
            {cow.map((_v, i) => {
              const pos = i + 1;
              const inside = pos >= l && pos <= r;
              return (
                <div key={i} style={{
                  width: 38, fontSize: 11, fontWeight: 700,
                  fontFamily: "'JetBrains Mono',monospace",
                  textAlign: "center",
                  color: inside ? tint.color : "#cbd5e1",
                }}>{inside ? s : "—"}</div>
              );
            })}
          </div>
        </div>

        {/* position labels */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <div style={{ width: 36 }} />
          <div style={{ display: "flex", gap: 4 }}>
            {cow.map((_v, i) => (
              <div key={i} style={{ width: 38, fontSize: 9, color: "#94a3b8", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Panel
            title={t(E, "Pair X", "쌍 X")} l={lX} r={rX} accent={A}
            onChangeL={setLX} onChangeR={setRX}
          />
          <Panel
            title={t(E, "Pair Y", "쌍 Y")} l={lY} r={rY} accent="#0891b2"
            onChangeL={setLY} onChangeR={setRY}
          />
        </div>

        {/* verdict pill — green if same s, grey otherwise */}
        <div style={{
          padding: "8px 12px", borderRadius: 10,
          background: sameDiagonal ? "#ecfdf5" : "#f8fafc",
          border: `1.5px solid ${sameDiagonal ? "#86efac" : "#e2e8f0"}`,
          textAlign: "center",
          fontSize: 12.5, fontWeight: 600,
          color: sameDiagonal ? "#15803d" : "#64748b", lineHeight: 1.55,
        }}>
          {sameDiagonal
            ? <>🟢 {t(E,
                `Same s = ${sX}. Inside both windows, position i lands on cow[s − i] — identical comparisons. Precompute once for s = ${sX}.`,
                `같은 s = ${sX}. 두 윈도우 안쪽에서 i 자리에 cow[s − i] 가 들어옴 — 완전히 같은 비교. s = ${sX} 에 대해 한 번만 계산.`)}</>
            : <>⚪ {t(E,
                `Different s (X: ${sX}, Y: ${sY}). Drag sliders so l + r matches in both panels — watch the inside cells turn the same colour.`,
                `다른 s (X: ${sX}, Y: ${sY}). l + r 이 같아지도록 슬라이더 조정 — 안쪽 셀이 같은 색이 되는 걸 확인.`)}</>}
        </div>

        <div style={{
          fontSize: 11.5, color: C.dim, textAlign: "center", lineHeight: 1.6,
          fontStyle: "italic",
        }}>
          {t(E,
            "Same s = l + r → same cow-value at each position i. Precompute once per value of s.",
            "같은 s = l + r → 자리 i 마다 같은 cow 값. s 같은 구간마다 한 번만 미리 계산.")}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MatchUpToSim — interactive sim for section ⑥.
   Shows two arrays, the per-position match indicator, the cumulative
   matchUpTo[i] row, and two sliders for (l, r) so the student SEES the
   outside-window match count = matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r]).
   Replaces the dense pseudo-code prose; visualization carries the load.
   ════════════════════════════════════════════════════════════════════ */
export function MatchUpToSim({ E }) {
  // Concrete fixed binary arrays — length 7 keeps the row compact and
  // gives a varied match/mismatch sequence for matchUpTo to grow through.
  const cow = [1, 0, 1, 1, 0, 1, 0];
  const want = [1, 1, 1, 0, 0, 1, 1];
  const N = cow.length;

  // matchUpTo[0..N], 1-indexed.  matchUpTo[i] = # of j in 1..i with cow[j-1]==want[j-1].
  const matchUpTo = [0];
  for (let i = 1; i <= N; i++) {
    matchUpTo.push(matchUpTo[i - 1] + (cow[i - 1] === want[i - 1] ? 1 : 0));
  }

  const [l, setL] = useState(2);
  const [r, setR] = useState(5);

  const left  = matchUpTo[l - 1];                  // matches before window
  const right = matchUpTo[N] - matchUpTo[r];       // matches after window
  const outside = left + right;

  const RED = "#dc2626";
  const RED_BG = "#fef2f2";
  const RED_BD = "#fca5a5";
  const MATCH_BG = "#dcfce7";
  const MATCH_BD = "#86efac";
  const MATCH_TXT = "#15803d";
  const DIM_BG = "#f1f5f9";
  const DIM_BD = "#e2e8f0";
  const DIM_TXT = "#94a3b8";

  // Single value cell (a or b).  `inside` dims the cell (it's *in* the window,
  // so it doesn't contribute to outside count).
  const ValCell = ({ v, inside }) => (
    <div style={{
      width: 38, height: 38, borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700,
      background: inside ? DIM_BG : "#fff",
      color: inside ? DIM_TXT : "#1f2937",
      border: `1px solid ${inside ? DIM_BD : "#cbd5e1"}`,
      opacity: inside ? 0.55 : 1,
    }}>{v}</div>
  );

  const Slider = ({ label, value, setValue, min, max }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
      <span style={{ width: 14, fontWeight: 700, color: RED, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ flex: 1, accentColor: RED }}
      />
      <span style={{ width: 18, textAlign: "center", fontWeight: 700, color: RED, fontFamily: "'JetBrains Mono',monospace" }}>{value}</span>
    </div>
  );

  // Header strip: position numbers 1..N
  const posStrip = (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 60 }} />
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: N }, (_, i) => (
          <div key={i} style={{
            width: 38, fontSize: 9.5, color: "#94a3b8", textAlign: "center",
            fontFamily: "'JetBrains Mono',monospace",
          }}>{i + 1}</div>
        ))}
      </div>
    </div>
  );

  const Row = ({ label, children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <div style={{ width: 60, fontSize: 11, color: C.dim, textAlign: "right", fontWeight: 600 }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Step 1 — show a, b, per-position match, prefix matchUpTo */}
        <div style={{
          background: "#fff", border: `1.5px solid ${RED_BD}`,
          borderRadius: 10, padding: "10px 12px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: RED, marginBottom: 8 }}>
            {t(E, "Build matchUpTo once: count matches as you sweep left to right.",
                  "matchUpTo 한 번 만들기: 왼쪽부터 일치 개수를 누적.")}
          </div>

          {posStrip}

          <Row label="cow">
            {cow.map((v, i) => {
              const pos = i + 1;
              const inside = pos >= l && pos <= r;
              return <ValCell key={i} v={v} inside={inside} />;
            })}
          </Row>

          <Row label="want">
            {want.map((v, i) => {
              const pos = i + 1;
              const inside = pos >= l && pos <= r;
              return <ValCell key={i} v={v} inside={inside} />;
            })}
          </Row>

          {/* Match indicator row — ✓ green if cow==want, ✗ grey otherwise */}
          <Row label={t(E, "match", "일치")}>
            {cow.map((_, i) => {
              const ok = cow[i] === want[i];
              return (
                <div key={i} style={{
                  width: 38, height: 28, borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700,
                  background: ok ? MATCH_BG : DIM_BG,
                  color: ok ? MATCH_TXT : DIM_TXT,
                  border: `1px solid ${ok ? MATCH_BD : DIM_BD}`,
                }}>{ok ? "✓" : "✗"}</div>
              );
            })}
          </Row>

          {/* Prefix matchUpTo[1..N] — running count, ticks up at each ✓ */}
          <Row label="matchUpTo">
            {Array.from({ length: N }, (_, i) => {
              const pos = i + 1;
              const ok = cow[i] === want[i];
              const v = matchUpTo[pos];
              return (
                <div key={i} style={{
                  width: 38, height: 32, borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700,
                  background: ok ? "#fff7ed" : "#fff",
                  color: "#7c2d12",
                  border: `1px solid ${ok ? "#fdba74" : "#e5e7eb"}`,
                }}>{v}</div>
              );
            })}
          </Row>

          <div style={{ marginTop: 8, fontSize: 10.5, color: C.dim, fontStyle: "italic" }}>
            {t(E, "matchUpTo[0] = 0; each step, +1 if ✓, else carry over.",
                  "matchUpTo[0] = 0; 한 칸 갈 때 ✓ 면 +1, 아니면 그대로.")}
          </div>
        </div>

        {/* Step 2 — sliders + outside formula */}
        <div style={{
          background: RED_BG, border: `1.5px solid ${RED_BD}`,
          borderRadius: 10, padding: "10px 12px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>
            {t(E, "Pick (l, r) — outside the window, matches stay constant.",
                  "(l, r) 골라 — 윈도우 바깥 일치 수는 그대로.")}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
            <Slider label="l" min={1} max={N} value={l}
                    setValue={(v) => { setL(v); if (v > r) setR(v); }} />
            <Slider label="r" min={1} max={N} value={r}
                    setValue={(v) => { setR(v); if (v < l) setL(v); }} />
          </div>

          {/* Live outside computation strip — split a/b into [before | window | after] */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8,
          }}>
            <div style={{
              background: "#fff", border: `1px dashed ${RED_BD}`, borderRadius: 8,
              padding: "8px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 10.5, color: "#7f1d1d", fontWeight: 600 }}>
                {t(E, "before window", "윈도우 앞")}
              </div>
              <div style={{
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#1f2937",
                marginTop: 4,
              }}>
                matchUpTo[{l - 1}] = <b style={{ color: RED }}>{left}</b>
              </div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>
                {t(E, `pos 1..${l - 1}`, `자리 1..${l - 1}`)}
              </div>
            </div>

            <div style={{
              background: DIM_BG, border: `1px dashed ${DIM_BD}`, borderRadius: 8,
              padding: "8px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 10.5, color: "#475569", fontWeight: 600 }}>
                {t(E, "window [l, r]", "윈도우 [l, r]")}
              </div>
              <div style={{
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#475569",
                marginTop: 4,
              }}>
                {t(E, "skipped", "건너뜀")}
              </div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>
                {t(E, `pos ${l}..${r}`, `자리 ${l}..${r}`)}
              </div>
            </div>

            <div style={{
              background: "#fff", border: `1px dashed ${RED_BD}`, borderRadius: 8,
              padding: "8px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 10.5, color: "#7f1d1d", fontWeight: 600 }}>
                {t(E, "after window", "윈도우 뒤")}
              </div>
              <div style={{
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#1f2937",
                marginTop: 4,
              }}>
                matchUpTo[{N}] − matchUpTo[{r}] = <b style={{ color: RED }}>{right}</b>
              </div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>
                {t(E, `pos ${r + 1}..${N}`, `자리 ${r + 1}..${N}`)}
              </div>
            </div>
          </div>

          {/* Big result */}
          <div style={{
            background: "#fff", border: `2px solid ${RED}`, borderRadius: 10,
            padding: "10px 12px", textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 600, marginBottom: 4 }}>
              {t(E, "outside-window matches", "윈도우 바깥 일치")}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#1f2937",
            }}>
              matchUpTo[{l - 1}] + (matchUpTo[{N}] − matchUpTo[{r}])
              {" = "}
              <b style={{ color: RED }}>{left}</b> + <b style={{ color: RED }}>{right}</b>
              {" = "}
              <span style={{
                fontSize: 22, fontWeight: 800, color: RED, marginLeft: 4,
              }}>{outside}</span>
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 11.5, color: C.dim, textAlign: "center", lineHeight: 1.6,
          fontStyle: "italic",
        }}>
          {t(E,
            "Outside-window matches = matchUpTo[l−1] + (matchUpTo[N] − matchUpTo[r]). One prefix array, O(1) lookup.",
            "윈도우 바깥 일치 = matchUpTo[l−1] + (matchUpTo[N] − matchUpTo[r]). prefix 배열 한 개로 O(1) 조회.")}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DiagPrefixSim — Section ⑦ "insideUpTo" / per-same-s-window prefix.
   Student picks a value of s (2..2N) and SEES which (i, s−i) pairs
   land inside the array, which compare cow[s−i]==want[i] (✓/✗), and how
   insideUpTo[r] − insideUpTo[l−1] reads off inside-window matches for any (l, r)
   on that same-s window — replacing the dense pseudo-code prose.
   Replaces <CodeSectionView> on chapters.jsx slice(4)[2].
   ════════════════════════════════════════════════════════════════════ */
export function DiagPrefixSim({ E }) {
  // Concrete fixed arrays, length N = 5 — keeps row compact and mirrors
  // the DiagonalSim example so the student carries context across.
  const cow = [4, 1, 3, 2, 5];
  const want = [4, 3, 1, 2, 5];
  const N = cow.length;

  // s ranges over 2..2N. Default to 5 (matches DiagonalSim's default).
  const [s, setS] = useState(5);
  // Window (l, r) for the right-side mapping panel — l ≤ r, l + r = s.
  // Student drags l; r is derived as s − l.
  const lMin = Math.max(1, s - N);
  const lMax = Math.min(N, Math.floor(s / 2));
  const [lWin, setLWin] = useState(2);
  const lActual = Math.max(lMin, Math.min(lMax, lWin));
  const rActual = s - lActual;

  // insideUpTo[k] = number of valid i ≤ k where cow[s−i] == want[i] (1-indexed).
  const insideUpTo = [0];
  for (let i = 1; i <= N; i++) {
    const j = s - i;
    let inc = 0;
    if (j >= 1 && j <= N && cow[j - 1] === want[i - 1]) inc = 1;
    insideUpTo.push(insideUpTo[i - 1] + inc);
  }

  // Per-diagonal full count for the bottom table.
  const diagCount = (sVal) => {
    let checks = 0;
    for (let i = 1; i <= N; i++) {
      const j = sVal - i;
      if (j >= 1 && j <= N && cow[j - 1] === want[i - 1]) checks++;
    }
    return checks;
  };

  const tint = _diagTint(s);
  const insideMatches = lMax >= lMin ? insideUpTo[rActual] - insideUpTo[lActual - 1] : 0;

  const Cell = ({ v, glow, ok }) => (
    <div style={{
      width: 38, height: 38, borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700,
      background: glow ? (ok === true ? "#dcfce7" : ok === false ? "#fee2e2" : tint.bg) : "#f1f5f9",
      color: glow ? (ok === true ? "#166534" : ok === false ? "#991b1b" : tint.color) : "#94a3b8",
      border: `${glow ? 1.5 : 1}px solid ${
        glow ? (ok === true ? "#86efac" : ok === false ? "#fca5a5" : tint.bd) : "#e2e8f0"
      }`,
    }}>{v}</div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        {/* s selector + a/b rows + ✓/✗ row */}
        <div style={{
          background: "#fff", border: `1.5px solid ${tint.bd}`, borderRadius: 10,
          padding: "10px 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: A }}>
              {t(E, "s value", "s 값")}
            </span>
            <input
              type="range" min={2} max={2 * N} value={s}
              onChange={(e) => setS(Number(e.target.value))}
              style={{ flex: 1, minWidth: 160, accentColor: A }}
            />
            <span style={{
              fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: tint.bg, color: tint.color, border: `1px solid ${tint.bd}`,
              borderRadius: 6, padding: "2px 8px",
            }}>s = {s}</span>
          </div>

          {/* cow row — glow positions j = s − i where i is valid. */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>cow</div>
            <div style={{ display: "flex", gap: 4 }}>
              {cow.map((v, idx) => {
                const pos = idx + 1;
                const i = s - pos;
                const valid = i >= 1 && i <= N;
                const ok = valid && cow[pos - 1] === want[i - 1];
                return <Cell key={idx} v={v} glow={valid} ok={valid ? ok : undefined} />;
              })}
            </div>
          </div>

          {/* want row — glow positions i where partner j = s − i is valid. */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>want</div>
            <div style={{ display: "flex", gap: 4 }}>
              {want.map((v, idx) => {
                const i = idx + 1;
                const j = s - i;
                const valid = j >= 1 && j <= N;
                const ok = valid && cow[j - 1] === want[i - 1];
                return <Cell key={idx} v={v} glow={valid} ok={valid ? ok : undefined} />;
              })}
            </div>
          </div>

          {/* per-position match marker: ✓ / ✗ / — */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <div style={{ width: 36, fontSize: 10, color: C.dim, textAlign: "right" }}>
              cow[s−i]·want[i]
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {cow.map((_v, idx) => {
                const i = idx + 1;
                const j = s - i;
                const valid = j >= 1 && j <= N;
                const ok = valid && cow[j - 1] === want[i - 1];
                return (
                  <div key={idx} style={{
                    width: 38, fontSize: 14, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    textAlign: "center",
                    color: !valid ? "#cbd5e1" : ok ? "#16a34a" : "#dc2626",
                  }}>{!valid ? "—" : ok ? "✓" : "✗"}</div>
                );
              })}
            </div>
          </div>

          {/* position labels (1..N) */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <div style={{ width: 36 }} />
            <div style={{ display: "flex", gap: 4 }}>
              {cow.map((_v, idx) => (
                <div key={idx} style={{
                  width: 38, fontSize: 9, color: "#94a3b8", textAlign: "center",
                  fontFamily: "'JetBrains Mono',monospace",
                }}>i={idx + 1}</div>
              ))}
            </div>
          </div>

          {/* total ✓ on this diagonal */}
          <div style={{
            marginTop: 8, padding: "6px 10px", borderRadius: 8,
            background: tint.bg, border: `1px solid ${tint.bd}`,
            fontSize: 12, color: tint.color, fontWeight: 600, textAlign: "center",
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            {t(E,
              `pairsWithCheckups[s = ${s}] = insideUpTo[${N}] = ${insideUpTo[N]}  (sum of ✓ on this same-s window)`,
              `pairsWithCheckups[s = ${s}] = insideUpTo[${N}] = ${insideUpTo[N]}  (이 s 같은 구간의 ✓ 합)`)}
          </div>
        </div>

        {/* Window-to-diagonal mapping */}
        <div style={{
          background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10,
          padding: "10px 12px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, marginBottom: 8 }}>
            {t(E,
              `Any window (l, r) with l + r = ${s}`,
              `l + r = ${s} 인 모든 윈도우 (l, r)`)}
          </div>
          {lMax < lMin ? (
            <div style={{ fontSize: 11.5, color: C.dim, fontStyle: "italic" }}>
              {t(E,
                `No valid (l, r) with l ≤ r and l + r = ${s} on N = ${N}.`,
                `N = ${N} 에서 l ≤ r, l + r = ${s} 인 (l, r) 없음.`)}
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 6 }}>
                <span style={{ width: 14, fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>l</span>
                <input
                  type="range" min={lMin} max={lMax} value={lActual}
                  onChange={(e) => setLWin(Number(e.target.value))}
                  style={{ flex: 1, accentColor: A }}
                />
                <span style={{
                  width: 60, textAlign: "right", fontWeight: 700, color: A,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>l = {lActual}</span>
              </div>
              <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
                r = s − l = {s} − {lActual} = {rActual}
              </div>
              <div style={{
                padding: "8px 10px", borderRadius: 8,
                background: "#fef2f2", border: "1px solid #fecaca",
                fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.55,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                inside [{lActual}, {rActual}] = insideUpTo[{rActual}] − insideUpTo[{lActual - 1}] = {insideUpTo[rActual]} − {insideUpTo[lActual - 1]} = <strong>{insideMatches}</strong>
              </div>
            </>
          )}
        </div>

        {/* Diagonal table — one box per s */}
        <div style={{
          background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10,
          padding: "10px 12px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, marginBottom: 8 }}>
            {t(E,
              "pairsWithCheckups — one number per value of s",
              "pairsWithCheckups — s 같은 구간마다 한 숫자")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {Array.from({ length: 2 * N - 1 }, (_v, k) => k + 2).map((sv) => {
              const sel = sv === s;
              const tt = _diagTint(sv);
              return (
                <button
                  key={sv}
                  onClick={() => setS(sv)}
                  style={{
                    padding: "4px 6px", borderRadius: 6, cursor: "pointer",
                    background: sel ? tt.bg : "#f8fafc",
                    border: `${sel ? 1.5 : 1}px solid ${sel ? tt.bd : "#e2e8f0"}`,
                    color: sel ? tt.color : "#64748b",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 10.5, fontWeight: sel ? 700 : 500,
                    minWidth: 46, textAlign: "center", lineHeight: 1.2,
                  }}
                >
                  <div>s={sv}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{diagCount(sv)}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* caption */}
        <div style={{
          fontSize: 11.5, color: C.dim, textAlign: "center", lineHeight: 1.6,
          fontStyle: "italic",
        }}>
          {t(E,
            "All windows on the same-s window share the same internal matches. Precompute one number per value of s.",
            "같은 s 구간의 모든 윈도우는 내부 일치 수가 같음. s 같은 구간마다 한 숫자씩 미리 계산.")}
        </div>
      </div>
    </div>
  );
}

// Static diagram: two (l, r) pairs on the same same-s window s = l + r.
// Goal: SHOW (not just claim) that position i in BOTH reversals holds cow[s-i].
// We pick a concrete example, do the two reversals visually, and call out
// the matching cells.  No formulas — just before/after of cell values.
// (Kept for backwards compat; section ⑤ now uses DiagonalSim instead.)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CkDiagonalAside = ({ E }) => {
  // Concrete example.  Use 1-indexed positions 1..5.
  // cow = [_, 4, 1, 3, 2, 5]  (slot 0 ignored).  Then s = l + r = 5 ⇒ position i holds cow[5 - i].
  // Pair X: (l, r) = (1, 4).  Reversed cow[1..4]:
  //   pos 1 ← cow[4] = 2,  pos 2 ← cow[3] = 3,  pos 3 ← cow[2] = 1,  pos 4 ← cow[1] = 4,  pos 5 unchanged = 5.
  // Pair Y: (l, r) = (2, 3).  Reversed cow[2..3]:
  //   pos 1 unchanged = 4,  pos 2 ← cow[3] = 3,  pos 3 ← cow[2] = 1,  pos 4 unchanged = 2,  pos 5 unchanged = 5.
  // Inside-window cells (where the reversal matters):
  //   Pair X covers positions 1..4 → all reversed → values 2, 3, 1, 4.
  //   Pair Y covers positions 2..3 → values 3, 1.
  //   At positions 2 and 3, BOTH pairs land on the same values (3 and 1) — that's the "same s" claim.
  const cellSize = 26;
  const fontSize = 12;
  const Cell = ({ v, kind }) => {
    // kind: "match" (both pairs same value) | "x-only" (only pair X reverses here)
    //       | "outside" (no reversal in either) | "empty"
    const palette = {
      match:    { bg: "#fef3c7", bd: "#f59e0b", color: "#92400e" },
      "x-only": { bg: "#dbeafe", bd: "#60a5fa", color: "#1e3a8a" },
      outside:  { bg: "#f1f5f9", bd: "#cbd5e1", color: "#64748b" },
      empty:    { bg: "transparent", bd: "transparent", color: "transparent" },
    };
    const p = palette[kind];
    return (
      <div style={{
        width: cellSize, height: cellSize, borderRadius: 5, fontSize, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: p.bg, border: `1.5px solid ${p.bd}`, color: p.color,
        fontFamily: "'JetBrains Mono',monospace",
      }}>{v}</div>
    );
  };
  const Row = ({ label, cells }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#1e3a8a", marginBottom: 3 }}>
      <div style={{ width: 78, textAlign: "right", fontWeight: 600, fontSize: 10 }}>{label}</div>
      {cells.map((c, i) => <Cell key={i} v={c.v} kind={c.kind} />)}
    </div>
  );
  // Position labels 1..5
  const posLabels = [1, 2, 3, 4, 5];
  return (
    <div style={{
      background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
      padding: "10px 12px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>
        🔍 {t(E, "Why same-s? — two reversals, same values land at same spots",
                  "왜 s 같은 구간끼리 같나? — 두 뒤집기, 같은 자리에 같은 값이 들어옴")}
      </div>

      <div style={{ marginBottom: 8, fontSize: 11.2, lineHeight: 1.55 }}>
        {t(E,
          "After reversing cow[l..r], position i holds whatever was at cow[l+r−i].  So if you fix s = l+r, position i ALWAYS gets cow[s−i] — no matter how you split l and r.",
          "cow[l..r] 를 뒤집으면 i 자리 값은 cow[l+r−i].  s = l+r 만 고정하면 i 자리는 *항상* cow[s−i] — l, r 을 어떻게 나눠도.")}
      </div>

      {/* Original a row */}
      <div style={{ background: "#fff", borderRadius: 6, padding: "8px 10px", border: "1px dashed #93c5fd", marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: "#475569", marginBottom: 4, fontWeight: 600 }}>
          {t(E, "Original cow = [4, 1, 3, 2, 5]   (positions 1..5)",
                "원본 cow = [4, 1, 3, 2, 5]   (위치 1..5)")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 78, textAlign: "right", fontSize: 10, color: "#64748b" }}>pos →</div>
          {posLabels.map(p => (
            <div key={p} style={{ width: cellSize, fontSize: 9.5, textAlign: "center", color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>{p}</div>
          ))}
        </div>
        <Row label="cow" cells={[
          { v: 4, kind: "outside" }, { v: 1, kind: "outside" }, { v: 3, kind: "outside" },
          { v: 2, kind: "outside" }, { v: 5, kind: "outside" },
        ]} />
      </div>

      {/* Pair X: (1, 4) — reverse covers positions 1..4 */}
      <div style={{ background: "#fff", borderRadius: 6, padding: "8px 10px", border: "1px dashed #93c5fd", marginBottom: 8 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1e40af", marginBottom: 4 }}>
          {t(E, "Pair X: (l, r) = (1, 4)   →   reverse cow[1..4]",
                "쌍 X: (l, r) = (1, 4)   →   cow[1..4] 뒤집기")}
        </div>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>
          {t(E, "pos 1 ← cow[4]=2, pos 2 ← cow[3]=3, pos 3 ← cow[2]=1, pos 4 ← cow[1]=4",
                "1자리 ← cow[4]=2, 2자리 ← cow[3]=3, 3자리 ← cow[2]=1, 4자리 ← cow[1]=4")}
        </div>
        <Row label={t(E, "cow (after)", "cow (후)")} cells={[
          { v: 2, kind: "x-only" }, { v: 3, kind: "match" }, { v: 1, kind: "match" },
          { v: 4, kind: "x-only" }, { v: 5, kind: "outside" },
        ]} />
      </div>

      {/* Pair Y: (2, 3) — reverse covers positions 2..3 only */}
      <div style={{ background: "#fff", borderRadius: 6, padding: "8px 10px", border: "1px dashed #93c5fd", marginBottom: 8 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1e40af", marginBottom: 4 }}>
          {t(E, "Pair Y: (l, r) = (2, 3)   →   reverse cow[2..3]   (same s = 5!)",
                "쌍 Y: (l, r) = (2, 3)   →   cow[2..3] 뒤집기   (같은 s = 5!)")}
        </div>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>
          {t(E, "pos 2 ← cow[3]=3, pos 3 ← cow[2]=1   (positions 1, 4, 5 unchanged)",
                "2자리 ← cow[3]=3, 3자리 ← cow[2]=1   (1, 4, 5 자리는 그대로)")}
        </div>
        <Row label={t(E, "cow (after)", "cow (후)")} cells={[
          { v: 4, kind: "outside" }, { v: 3, kind: "match" }, { v: 1, kind: "match" },
          { v: 2, kind: "outside" }, { v: 5, kind: "outside" },
        ]} />
      </div>

      <div style={{
        background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 6,
        padding: "8px 10px", fontSize: 11, color: "#7c2d12", lineHeight: 1.55,
      }}>
        🟨 {t(E,
          "Look at positions 2 and 3 (yellow): BOTH pairs land on values 3 and 1.  That's the same-s trick — comparison work at any position i depends only on s = l+r, not on l and r individually.  Compute it once per s.",
          "2, 3 자리 (노랑) 봐: 쌍 X와 Y 모두 값 3, 1 이 들어옴. 그게 s 같은 구간 — i 자리 비교는 s = l+r 에만 의존, l/r 개별 값과 무관. s 마다 한 번만 계산.")}
      </div>
    </div>
  );
};

export function getCheckupsSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read input + counts array", "1️⃣ 입력 읽기 + counts 배열"),
      color: A,
      py: CK_BRUTE_S1_PY, cpp: CK_BRUTE_S1_CPP,
      why: [
        t(E, "Read N, then arrays cow and want. Initialize counts[0..N] = 0.",
            "N 읽고, cow 와 want 읽기. counts[0..N] = 0 으로 초기화."),
        t(E, "counts[checks] will hold the number of (l, r) pairs that result in exactly checks checkups.",
            "counts[checks] 는 검진 수가 정확히 checks 인 (l, r) 쌍 개수."),
      ],
      aside: <SampleInputAside E={E} sample={CK_SAMPLE} highlight={[0, 1, 2]} note={t(E,
        "N=3, cow=[1, 3, 2], want=[3, 2, 1]. Three input lines.",
        "N=3, cow=[1, 3, 2], want=[3, 2, 1]. 입력 3 줄.")} />,
    },
    {
      label: t(E, "2️⃣ Outer pair (l, r)", "2️⃣ 바깥 쌍 (l, r)"),
      color: "#0891b2",
      py: CK_BRUTE_S2_PY, cpp: CK_BRUTE_S2_CPP,
      why: [
        t(E, "Two nested loops over l ≤ r enumerate all N(N+1)/2 distinct operations.",
            "l ≤ r 두 겹 루프로 서로 다른 연산 N(N+1)/2 개 모두 시도."),
        t(E, "We'll fill the inner body next — for now just see the shape.",
            "안쪽은 다음 단계에서 채움 — 지금은 모양만."),
      ],
    },
    {
      label: t(E, "3️⃣ Reverse + count matches", "3️⃣ 뒤집기 + 일치 세기"),
      color: "#7c3aed",
      py: CK_BRUTE_S3_PY, cpp: CK_BRUTE_S3_CPP,
      why: [
        t(E, "After reversing [l, r], position i holds the value that was at l + r − i (still cow's value, just relocated).",
            "[l, r] 뒤집은 후 위치 i 에는 원래 l + r − i 자리에 있던 값 (여전히 cow 의 값, 자리만 바뀜)."),
        t(E, "Outside [l, r], positions are unchanged — keep using cow[i].",
            "[l, r] 바깥은 그대로 — cow[i] 그대로."),
        t(E, "Compare to want[i]; tally if equal.",
            "want[i] 와 비교, 같으면 checks 증가."),
      ],
    },
    {
      label: t(E, "4️⃣ Tally + print full counts", "4️⃣ 집계 + counts 전체 출력"),
      color: "#16a34a",
      py: CK_BRUTE_FULL_PY, cpp: CK_BRUTE_FULL_CPP,
      why: [
        t(E, "After every (l, r) pair, counts[checks] += 1 records this operation.",
            "(l, r) 쌍마다 counts[checks] += 1 로 이 연산을 기록."),
        t(E, "Output N + 1 lines: counts[0], counts[1], …, counts[N].",
            "N + 1 줄 출력: counts[0], counts[1], …, counts[N]."),
        t(E, "Submit this — passes small tests, times out around N ≈ 1000.  Pages 5–8 below build a faster O(N²) version, one idea at a time.",
            "이 코드 제출 — 작은 테스트 통과, N ≈ 1000 부터 시간 초과. 5–8 페이지에서 더 빠른 O(N²) 풀이를 한 단계씩."),
      ],
    },
    {
      label: t(E, "5️⃣ Idea — same-s window, same comparisons", "5️⃣ 아이디어 — s 같은 구간이면 비교가 같음"),
      color: "#0891b2",
      py: CK_SMART_S5_PY, cpp: CK_SMART_S5_CPP,
      why: [
        t(E, "Stare at the brute inner loop.  Outside [l, r] the comparison is always cow[i]·want[i] — independent of (l, r).",
            "brute 안쪽 루프 다시 봐요. [l, r] 바깥은 늘 cow[i]·want[i] — (l, r) 무관."),
        t(E, "Inside, position i compares cow[l+r−i] with want[i].  The index l+r−i depends ONLY on s = l+r — pairs with the same s ask the same questions.",
            "안쪽은 cow[l+r−i] 와 want[i] 비교. 인덱스 l+r−i 는 s = l+r 에만 의존 — s 가 같은 쌍들은 같은 질문을 함."),
        t(E, "Plan: two prefix arrays — outside (built once), inside (rebuilt per s).  Each (l, r) lookup becomes O(1).",
            "작전: prefix 배열 두 개 — 바깥 (한 번), 안쪽 (s 마다). (l, r) 조회는 O(1)."),
      ],
      aside: <CkDiagonalAside E={E} />,
    },
    {
      label: t(E, "6️⃣ Outside prefix — matchUpTo (built once)", "6️⃣ 바깥 prefix — matchUpTo (한 번 만들고 끝)"),
      color: "#7c3aed",
      py: CK_SMART_S6_PY, cpp: CK_SMART_S6_CPP,
      why: [
        t(E, "matchUpTo[i] = number of j in 1..i where cow[j] == want[j].",
            "matchUpTo[i] = 1..i 중 cow[j] == want[j] 자리 개수."),
        t(E, "Outside-window matches for any (l, r) is matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r]).",
            "(l, r) 의 바깥 일치 = matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r])."),
        t(E, "1-indexed (insert dummy 0) keeps the formula clean.",
            "1-indexed (앞에 0 더미) → 식이 깔끔."),
      ],
    },
    {
      label: t(E, "7️⃣ Inside prefix — insideUpTo (per same-s window)", "7️⃣ 안쪽 prefix — insideUpTo (s 같은 구간마다)"),
      color: "#15803d",
      py: CK_SMART_S7_PY, cpp: CK_SMART_S7_CPP,
      why: [
        t(E, "Fix s.  insideUpTo[k] = number of j ≤ k where cow[s−j] matches want[j] (and indices are valid).",
            "s 고정. insideUpTo[k] = j ≤ k 중 cow[s−j] == want[j] 인 j 개수 (인덱스 유효 시)."),
        t(E, "For any (l, r) with l + r = s, the inside-window matches = insideUpTo[r] − insideUpTo[l-1].",
            "l + r = s 인 (l, r) 의 안쪽 일치 = insideUpTo[r] − insideUpTo[l-1]."),
        t(E, "insideUpTo is rebuilt per s — O(N) each, 2N−1 values of s → O(N²) total.",
            "insideUpTo 는 s 마다 다시 만들기 (O(N)). s 값 2N−1 개 → 합계 O(N²)."),
      ],
    },
    {
      label: t(E, "8️⃣ Combine + print", "8️⃣ 합치기 + 출력"),
      color: "#0d9488",
      py: CK_SMART_S8_PY, cpp: CK_SMART_S8_CPP,
      why: [
        t(E, "Inside the for-s loop, walk every valid (l, r) on same-s window s:  l ∈ [max(1, s−N), s // 2], r = s − l.",
            "for-s 루프 안에서 유효한 (l, r) 순회: l ∈ [max(1, s−N), s // 2], r = s − l."),
        t(E, "checks = inside + outside.  pairsWithCheckups[checks] += 1.  Both lookups are O(1).",
            "checks = inside + outside. pairsWithCheckups[checks] += 1. 두 조회 모두 O(1)."),
        t(E, "After all values of s, print pairsWithCheckups[0..N] one per line.",
            "모든 s 처리 후 pairsWithCheckups[0..N] 한 줄씩 출력."),
      ],
      aside: <CkSmartAside E={E} />,
    },
    /* ── 9️⃣ Full integrated smart code — every piece together, consistent vars. ── */
    {
      label: t(E, "9️⃣ Full smart code — everything wired together",
                  "9️⃣ 전체 smart 코드 — 한 번에 보기"),
      color: "#15803d",
      py: CK_SMART_FULL_PY, cpp: CK_SMART_FULL_CPP,
      why: [
        t(E, "All five pieces from sections 5–8 in one place: input → matchUpTo (① outside prefix) → for s → insideUpTo (③ inside prefix) → tally (④) → print (⑤).",
            "5–8 의 다섯 조각이 한 군데에: 입력 → matchUpTo (① 바깥 prefix) → for s → insideUpTo (③ 안쪽 prefix) → 집계 (④) → 출력 (⑤)."),
        t(E, "Variable names match the section pages — matchUpTo (built once), insideUpTo (rebuilt per same-s window), pairsWithCheckups (final answer).",
            "변수 이름은 섹션 페이지와 동일 — matchUpTo (한 번), insideUpTo (s 같은 구간마다), pairsWithCheckups (최종 답)."),
        t(E, "Total work O(N²) — N = 7,500 takes ≈ 5·10⁷ ops, fits comfortably in time.",
            "총 일 O(N²) — N = 7,500 면 약 5·10⁷ 연산, 시간 안에 충분."),
      ],
    },
  ];
}

export function CheckupsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ════════════════════════════════════════════════════════════════════
   Syntax-highlight helpers + PDF export — unchanged shape, retitled.
   ════════════════════════════════════════════════════════════════════ */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair"];
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

export function downloadCheckupsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cow Checkups — Full Study Guide", "🐮 Cow Checkups — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #fee2e2; border: 1.5px solid #fca5a5; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "FJ has N cows with species cow[i]. The vet checks cow i if cow[i] == want[i]. FJ performs ONE operation: reverse a subarray [l, r]. For each c = 0..N, count operations leaving exactly c cows checked.",
  "FJ 에 N 마리 소, 종 cow[i]. 수의사는 cow[i] == want[i] 일 때만 i 검진. FJ 가 한 번 [l, r] 뒤집기. c = 0..N 각각에 대해 정확히 c 마리 검진되는 연산 개수.")}</p>
<h2>2. ${t(E, "Insight: same s = l + r window", "통찰: s 같은 구간 s = l + r")}</h2>
<div class="box">
  <b>💡 ${t(E, "Why same-s?", "왜 s 같은 구간끼리 같나?")}</b>
  ${t(E,
    "After reversing [l, r], position i holds cow[l + r − i]. The match question depends only on s = l + r. So all pairs with the same s share work — compute once, reuse.",
    "[l, r] 뒤집은 후 위치 i 의 값은 cow[l + r − i]. 매칭 질문은 s = l + r 에만 의존. 같은 s 의 쌍들은 일 공유 — 한 번만 계산.")}
</div>
<h2>3. ${t(E, "Code (7 sections)", "코드 (7 섹션)")}</h2>
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
