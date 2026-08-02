// 🔒 USACO_VERIFIED (2026-05-13; fast 재검증 2026-07-23; 표 기반 교체 2026-07-27)
//   알고리즘(고정 c + i=최근 다른글자 + k=최근 같은글자 + 포물선 꼭짓점 후보 2 개): 정답 확인.
//   Python: ✅ 통과 — 공식/선생님 표 방식(latest_same/earliest_same/nearest_diff, 쿼리당 O(26)
//     O(1) 조회, 이분탐색 없음).  기준: docs/mooin3-passing-solution.py + 공식 sol_prob3_bronze_open25.html
//     2026-07-27 quest 표시 코드(M3_FAST_PY/CPP)를 이 표 방식으로 교체 (기존 bisect 변형 제거) +
//        sections 6-8 narration 정렬 완료.  로컬: 샘플 정확·브루트 3000/3000·Py 1.81s / C++ 0.14s (N=1e5, Q=3e4).
//   C++: 표 방식, <bits/stdc++.h> 안 씀 (iostream/vector/string).  fast 미제출 — USACO 재제출로 최종 확인 권장.
//     (구 brute Python 3/11 · C++ 4/11)
//   코드 수정 시 USACO 재제출 필요.  상세: REPO_ROOT/USACO_VERIFICATION.md
//   2026-07-30 (선생님): 표시용 수정만 — (1) 코드 주석 en/ko 이중언어(M3_FULL_PY/M3_FAST_PY/CPP → (E)=>t()),
//     실행 줄 byte 동일. (2) C++ fast 에서 ios_base::sync_with_stdio/cin.tie 제거(학생 노이즈, 이 크기엔 불필요).
//     알고리즘 로직 불변. algo 태그(binarysearch) 제거 — 실제는 애드혹(표 precompute).

import { useState, useRef, useEffect } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav as SharedSimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

// Official USACO 2025 Open Bronze #3 sample, line by line.
// Index 0 = "12 5", 1 = "abcabbacabac", 2-6 = the 5 query lines.
const M3_SAMPLE = ["12 5", "abcabbacabac", "1 12", "2 7", "4 8", "2 5", "3 10"];

const A = "#7c5cfc";

/* SimNav uses the shared component, with this quest's accent color. */
function SimNav({ idx, total, onIdx }) {
  return <SharedSimNav idx={idx} total={total} onIdx={onIdx} accent={A} />;
}

/* ═══════════════════════════════════════════════════════════════
   TripletEnumSimulator — first natural idea: try every (i, j, k).
   Walks all C(N, 3) triplets on s = "abba", checking moo condition
   one by one. Final realization: O(N³) doesn't scale.
   ═══════════════════════════════════════════════════════════════ */
export function TripletEnumSimulator({ E }) {
  // "abcabbc" (N=7) — 선생님 지정 예제. C(7,3)=35 조합이라 다 걷기엔 너무 많음 →
  // '대표 조합'만 이야기처럼 걷는다: 실패 → 붙은 moo(1) → 벌린 moo(4) → 가장 벌린 moo(8⭐).
  // verdict 에서 유효 moo 전부 + 최대, scale 에서 '35 개 전부 확인 → 폭발'.
  // (선생님 2026-07-22: "예제를 abcabbc 로 하자")
  const str = "abcabbc";
  const allTrips = [];
  for (let i = 0; i < str.length; i++)
    for (let j = i + 1; j < str.length; j++)
      for (let k = j + 1; k < str.length; k++) {
        const ok = str[i] !== str[j] && str[j] === str[k];
        const score = ok ? (j - i) * (k - j) : null;
        const why = !ok
          ? (str[i] === str[j]
              ? `s[i]='${str[i]}' = s[j]='${str[j]}'  ✗ (same)`
              : `s[j]='${str[j]}' ≠ s[k]='${str[k]}'  ✗`)
          : `s[i]≠s[j] ✓, s[j]=s[k] ✓ → score = (${j}-${i})·(${k}-${j}) = ${score}`;
        allTrips.push({ i, j, k, ok, score, why });
      }
  const validMoos = allTrips.filter(t => t.ok);
  let best = -1;
  validMoos.forEach(t => { if (t.score > best) best = t.score; });

  // Sequential walk (선생님 2026-07-22: "점프하지 말고 1,2,3 다음 1,2,4 처럼 차례로").
  // 첫 그룹만: i=1·j=2 고정, k 를 3→7 로 밀며 (1,2,3)…(1,2,7).  moo 2 개 나옴(점수 3→4,
  // k 가 오른쪽으로 갈수록 큼).  나머지 i·j 조합(총 35)은 verdict 가 요약(최대 8⭐).
  const walk = allTrips.slice(0, 5);
  const trace = [{ kind: "intro" }, ...walk.map((t, idx) => ({ kind: "step", t, idx })), { kind: "verdict" }, { kind: "scale" }];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const cellStyle = (pos, t) => {
    let role = null;
    if (t) { if (pos === t.i) role = "i"; else if (pos === t.j) role = "j"; else if (pos === t.k) role = "k"; }
    const colors = {
      i: ["#fee2e2", "#dc2626", "#7f1d1d"],
      j: ["#fef3c7", "#f59e0b", "#92400e"],
      k: ["#dcfce7", "#16a34a", "#15803d"],
    };
    const [bg, bd, fg] = role ? colors[role] : ["#fff", "#cbd5e1", "#475569"];
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
      background: bg, border: `1px solid ${bd}`, color: fg, transition: "all .2s",
    };
  };

  // Per-triplet "rule check card" — shows visually whether s[i]≠s[j] and s[j]=s[k] hold.
  // Three letter chips with comparison signs.  Pure visual, no prose.
  const RuleCheckCard = ({ tr }) => {
    const sIeqJ = str[tr.i] === str[tr.j];   // BAD if equal
    const sJeqK = str[tr.j] === str[tr.k];   // GOOD if equal
    const Letter = ({ ch, role }) => {
      const cols = {
        i: { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d" },
        j: { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e" },
        k: { bg: "#dcfce7", bd: "#16a34a", fg: "#15803d" },
      };
      const c = cols[role];
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        }}>
          <div style={{ fontSize: 9, color: c.fg, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            s[{role}]
          </div>
          <div style={{
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
            background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
          }}>{ch}</div>
        </div>
      );
    };
    const Comp = ({ pass, expected }) => (
      // expected: "≠" or "=" — what we WANT.  pass: did the actual values satisfy this?
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: pass ? "#16a34a" : "#dc2626", lineHeight: 1, marginBottom: 4 }}>
          {expected}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 800, lineHeight: 1,
          color: pass ? "#16a34a" : "#dc2626",
        }}>{pass ? "✓" : "✗"}</div>
      </div>
    );
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 6,
        background: tr.ok ? "#f0fdf4" : "#fef2f2",
        border: `1.5px solid ${tr.ok ? "#86efac" : "#fca5a5"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
      }}>
        <Letter ch={str[tr.i]} role="i" />
        <Comp pass={!sIeqJ} expected="≠" />
        <Letter ch={str[tr.j]} role="j" />
        <Comp pass={sJeqK} expected="=" />
        <Letter ch={str[tr.k]} role="k" />
        {tr.ok && (
          <div style={{ marginLeft: 10, paddingLeft: 10, borderLeft: "1px dashed #86efac",
            display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 9, color: "#15803d", fontWeight: 700 }}>score</div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#1f2937", whiteSpace: "nowrap" }}>
              <span style={{ color: "#dc2626" }}>{tr.j - tr.i}</span>
              <span style={{ color: C.dim }}>×</span>
              <span style={{ color: "#16a34a" }}>{tr.k - tr.j}</span>
              <span style={{ color: C.dim }}>=</span>
              <span style={{ fontSize: 14, color: "#15803d", fontWeight: 800 }}>{tr.score}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Score strip: during the walk show the curated triplets so far; at the end
  // show ALL valid moos (so the max ⭐ and full picture appear).
  const stripTrips =
    s.kind === "intro" ? [] :
    s.kind === "step" ? walk.slice(0, s.idx + 1) :
    validMoos;  // verdict/scale

  // Persistent role labels above cells (so j/i/k meaning is visible without text).
  const labelForPos = (pos) => {
    if (s.kind !== "step") return "";
    if (pos === s.t.i) return "i";
    if (pos === s.t.j) return "j";
    if (pos === s.t.k) return "k";
    return "";
  };
  const labelColor = (lab) =>
    lab === "i" ? "#dc2626" : lab === "j" ? "#92400e" : lab === "k" ? "#16a34a" : "transparent";

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `s = "${str}"`, `s = "${str}"`)}
        subtitle={`(${safe + 1} / ${trace.length})`}
      />

      {/* String visualization with i/j/k labels above */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10 }}>
        {str.split("").map((ch, pos) => {
          const lab = labelForPos(pos);
          return (
            <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 10, height: 12, fontWeight: 700, color: labelColor(lab), fontFamily: "'JetBrains Mono',monospace" }}>
                {lab || " "}
              </div>
              <div style={cellStyle(pos, s.kind === "step" ? s.t : null)}>{ch}</div>
              {/* 1-based — 문제 지문의 말 (쿼리도 "1 12" 처럼 1 부터).
                  뒤 fix-j 시뮬은 코드의 0-based 를 쓴다 (그 시뮬 상단 주석 참고) —
                  둘이 다른 건 '문제의 말 → 코드의 말' 로 넘어가기 때문이고, 양쪽 다
                  화면에 한 줄로 밝혀 둔다. */}
              <div style={{ fontSize: 9, color: C.dim }}>{pos + 1}</div>
            </div>
          );
        })}
      </div>

      {/* 번호 규칙 한 줄 — 뒤 시뮬에서 0 부터로 바뀌므로 여기서 기준을 밝혀 둔다. */}
      <div style={{ textAlign: "center", fontSize: 9.5, color: C.dim, marginBottom: 10 }}>
        {t(E, "spots are numbered from 1 — same as the problem statement",
              "칸 번호는 1 부터 — 문제 지문과 같아요")}
      </div>

      {/* Step body: rule-check card on step, scale-bars on scale, otherwise empty */}
      {s.kind === "step" && <RuleCheckCard tr={s.t} />}

      {s.kind === "scale" && (
        <div style={{ marginBottom: 10 }}>
          {/* Bridge: abba(4 triplets) → length-N string(~N³/6).  Without this the
              jump from "4" to 1.6e14 is a mystery. (선생님 2026-07-22: 시뮬 이해 안 감) */}
          <div style={{
            background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8,
            padding: "9px 12px", marginBottom: 10, fontSize: 11.5, lineHeight: 1.65,
            color: "#1f2937", wordBreak: "keep-all",
          }}>
            🐌 <b style={{ color: "#dc2626" }}>{t(E, "But on a big string?", "근데 큰 문자열이면?")}</b>{" "}
            {t(E,
              `"abcabbc" (N=7) already has 35 triplets. A length-N string has about N³/6 of them — so the count EXPLODES as N grows.`,
              `"abcabbc"(N=7)만 해도 (i,j,k) 조합이 35 개. 길이 N 이면 ≈ N³/6 개 — N 이 커질수록 조합 수가 폭발해요.`)}
            <div style={{ marginTop: 4, color: C.dim }}>
              {t(E, "Each bar = how many (i,j,k) triplets you'd check for that N:",
                    "아래 막대 = 그 N 일 때 확인해야 할 (i,j,k) 조합 수:")}
            </div>
          </div>
          {[
            { N: 7,    ops: 35,        okLabel: "✓" },
            { N: 100,  ops: 1.6e5,     okLabel: "✓" },
            { N: 1000, ops: 1.6e8,     okLabel: "△" },
            { N: 1e5,  ops: 1.6e14,    okLabel: "✗" },
          ].map((row) => {
            // Use log scale for bar widths; clamp.
            const w = Math.max(8, Math.min(320, 25 * Math.log10(row.ops + 1)));
            const ok = row.okLabel === "✓";
            const borderline = row.okLabel === "△";
            const bg = ok ? "#16a34a" : borderline ? "#f59e0b" : "#dc2626";
            return (
              <div key={row.N} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                <div style={{ width: 60, textAlign: "right", color: C.dim, fontWeight: 600 }}>N = {row.N.toLocaleString()}</div>
                <div style={{
                  width: w, height: 16, background: bg, borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6,
                  color: "#fff", fontSize: 10, fontWeight: 700,
                }}>
                  {row.ops >= 1e6 ? `~${row.ops.toExponential(1)}` : row.ops.toLocaleString()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: bg }}>{row.okLabel}</div>
              </div>
            );
          })}
          <div style={{
            marginTop: 8, fontSize: 10.5, color: C.dim, lineHeight: 1.6, wordBreak: "keep-all", textAlign: "center",
          }}>
            {t(E,
              "Rule of thumb: ~100M (1e8) ops fit in the time limit.  ✓ fine · △ risky · ✗ way too slow.  And this is PER query — with many queries, brute is hopeless → we need a faster idea.",
              "대략 1 억(1e8) 연산까지가 제한 시간 안.  ✓ 여유 · △ 위험 · ✗ 한참 초과.  게다가 이건 쿼리 1 개당 — 쿼리가 많으면 브루트는 가망 없음 → 더 빠른 방법이 필요해요.")}
          </div>
        </div>
      )}

      {s.kind === "verdict" && (() => {
        const validCount = validMoos.length;
        return (
          <div style={{
            background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8,
            padding: "9px 12px", marginBottom: 10, fontSize: 12, lineHeight: 1.65,
            color: "#15803d", textAlign: "center", wordBreak: "keep-all", fontWeight: 600,
          }}>
            {t(E,
              `${validCount} valid moos in here.  Biggest score = ${best} ⭐ — the two c's picked far apart (pos 3 & 7) beat every tighter moo.  (Brute would check all ${allTrips.length} triplets.)`,
              `여기 유효한 moo 는 ${validCount} 개.  최대 점수 = ${best} ⭐ — 멀리 떨어진 c 두 개(위치 3·7)가 더 붙은 moo 들을 다 이겨요.  (브루트는 조합 ${allTrips.length} 개를 전부 확인.)`)}
          </div>
        );
      })()}

      {/* Score strip — small card per triplet checked.  ✓ green = valid moo with score.
          ✗ red = rule failed.  Best gets ⭐ + dark green. */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
        {stripTrips.map((tr, idx) => {
          const isCurrent = s.kind === "step" && idx === s.idx;
          const isBest = tr.ok && tr.score === best && best > 0;
          return (
            <div key={idx} style={{
              padding: "3px 7px", borderRadius: 6, minWidth: 38,
              background: isBest ? "#dcfce7" : tr.ok ? "#f0fdf4" : "#fef2f2",
              border: `${isCurrent ? 2 : 1.5}px solid ${
                isBest ? "#16a34a" : isCurrent ? "#f59e0b" : tr.ok ? "#86efac" : "#fca5a5"
              }`,
              fontFamily: "'JetBrains Mono',monospace",
              display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.2,
            }}>
              <div style={{ fontSize: 8.5, color: C.dim, fontWeight: 700 }}>
                ({tr.i + 1},{tr.j + 1},{tr.k + 1})
              </div>
              <div style={{
                fontSize: 13, fontWeight: 800,
                color: tr.ok ? (isBest ? "#15803d" : "#166534") : "#991b1b",
              }}>
                {tr.ok ? tr.score : "✗"}{isBest && " ⭐"}
              </div>
            </div>
          );
        })}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MooTraceSimulator — s = "abcabbc" 위에서 포인터를 한 칸씩 걸리며 보는 시뮬.
   비교 한 번 = 스텝 하나. 오른쪽에 *실제 제출 코드의 그 줄* 을 같이 비춘다.
   (선생님 2026-07-22: 브루트 시뮬과 같은 예제로 통일 → abcabbc.)
   (선생님 2026-07-30: "진짜 포인터가 하나씩 코드대로 움직이는걸 보여줬으면 좋겠어".)

   ⚠️ 번호는 0-based — 코드가 l -= 1 로 0-based 로 바꿔 쓰기 때문에, 셀 번호와
      코드의 idx 가 *같은 수* 여야 "코드대로" 가 성립한다. (형제 시뮬인 브루트
      TripletEnumSimulator 는 문제 지문의 1-based 를 쓴다 — 이 시뮬만 예외이고
      화면에 그 사실을 한 줄로 적어 둔다.)
   ═══════════════════════════════════════════════════════════════ */
export function MooTraceSimulator({ E, lang = "py" }) {
  const str = "abcabbc";
  const l = 0, r = str.length - 1;
  const perJ = [];
  for (let j = l + 1; j < r; j++) {
    const sj = str[j];
    let left = -1;
    for (let i = l; i < j; i++) if (str[i] !== sj) { left = i; break; }
    let right = -1;
    for (let k = r; k > j; k--) if (str[k] === sj) { right = k; break; }
    const score = (left >= 0 && right >= 0) ? (j - left) * (right - j) : null;
    perJ.push({ j, sj, left, right, score });
  }
  // 한 칸에 한 스텝 (선생님 2026-07-30: "이거 스텝바이스텝으로 보여주면 안되나?").
  //
  // 이력: 원래는 j 하나에 한 스텝 → 2026-07-22 "스텝으로 안 하고 뛰어넘었다" 지적으로
  // ①왼쪽/②오른쪽 두 박자로 쪼갰다. 그런데 한 박자 *안에서* 스캔 결과(i 또는 k)와 ✗
  // 발자국이 통째로 나타나서, 정작 "한 칸씩 걸어가며 비교하는" 장면은 여전히 없었다.
  // → 이제 비교 한 번 = 스텝 하나. 각 스텝은 커서가 놓인 칸 하나와 그 비교 결과만 보여준다.
  //
  // 스텝 종류:
  //   scan  — 커서가 cursor 칸에 있고, str[cursor] 를 j 글자와 비교하는 순간.
  //           isMatch=true 면 그 스캔이 여기서 끝난다(i 또는 k 확정).
  //   score — 스캔 둘 다 끝난 뒤 점수를 계산해 카드로 공개.
  const trace = [{ kind: "init", revealed: 0, best: -1 }];
  let best = -1;
  perJ.forEach((row, ri) => {
    const leftSeen = [];
    // 왼쪽 스캔: 왼쪽 끝(l)부터 오른쪽으로. j 와 *다른* 글자를 처음 만나면 거기가 i.
    for (let i = l; i < row.j; i++) {
      const isMatch = str[i] !== row.sj;
      trace.push({
        kind: "scan", row, dir: "left", cursor: i, isMatch,
        leftSeen: [...leftSeen], leftFound: isMatch ? i : -1,
        rightSeen: [], rightFound: -1,
        revealed: ri, best,
      });
      if (isMatch) break;
      leftSeen.push(i);           // 같은 글자였음 → ✗ 발자국으로 남김
    }
    const rightSeen = [];
    // 오른쪽 스캔: 오른쪽 끝(r)부터 왼쪽으로. j 와 *같은* 글자를 처음 만나면 거기가 k.
    for (let k = r; k > row.j; k--) {
      const isMatch = str[k] === row.sj;
      trace.push({
        kind: "scan", row, dir: "right", cursor: k, isMatch,
        leftSeen: [...leftSeen], leftFound: row.left,
        rightSeen: [...rightSeen], rightFound: isMatch ? k : -1,
        revealed: ri, best,
      });
      if (isMatch) break;
      rightSeen.push(k);
    }
    if (row.score !== null && row.score > best) best = row.score;
    trace.push({
      kind: "score", row,
      leftSeen: [...leftSeen], leftFound: row.left,
      rightSeen: [...rightSeen], rightFound: row.right,
      revealed: ri + 1, best,
    });
  });
  trace.push({ kind: "final", revealed: perJ.length, best });

  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];
  const hasRow = s.kind === "scan" || s.kind === "score";

  /* ── 코드 패널 ──────────────────────────────────────────────
     코드를 여기 다시 베껴 쓰지 않는다 — 뒤 챕터가 보여주는 M3_FULL_* 에서
     안쪽 블록만 잘라 쓴다. 그래야 코드를 고쳐도 시뮬이 어긋나지 않는다.
     (slice 범위가 밀리면 하이라이트가 엉뚱한 줄을 짚으므로 아래 주석의
      줄 번호를 기준으로 확인할 것.)                              */
  const isCpp = lang === "cpp";
  // py:  9 = "for j in range(l + 1, r):"  … 25 = "best = score"
  // cpp: 16 = "for (int j = l + 1; ...)"  … 36 = 그 for 의 닫는 }
  const RAW = isCpp ? M3_FULL_CPP.slice(16, 37) : M3_FULL_PY(E).slice(9, 26);
  // 주석 줄은 뺀다 (선생님 2026-07-30: "너무 많은 정보가 있어").
  // 여기 주석은 한 줄이 길어서 패널을 잡아먹고, 바로 위 말풍선과 내용이 겹친다.
  const KEPT = RAW.map((L, i) => ({ L, i })).filter(({ L }) => !/^\s*(#|\/\/)/.test(L));
  const CODE = KEPT.map(k => k.L);
  // 주석을 빼면 줄 번호가 밀리므로 원본→표시 인덱스 맵으로 하이라이트를 옮긴다.
  const IDX = new Map(KEPT.map((k, n) => [k.i, n]));
  const toShown = ([a, b]) => {
    const from = IDX.get(a), to = IDX.get(b);
    return from === undefined || to === undefined ? null : [from, to];
  };
  // 스텝 → 지금 실행 중인 줄 (RAW 기준 [from, to] 포함 → toShown 으로 변환)
  const hiRange = (() => {
    const raw = (() => {
      if (s.kind === "scan") {
        if (s.dir === "left") return s.isMatch ? (isCpp ? [3, 5] : [4, 6])
                                               : (isCpp ? [2, 3] : [3, 4]);
        return                      s.isMatch ? (isCpp ? [10, 12] : [10, 12])
                                               : (isCpp ? [9, 10]  : [9, 10]);
      }
      if (s.kind === "score") {
        return s.row.score === null ? (isCpp ? [15, 15] : [13, 13])
                                    : (isCpp ? [15, 18] : [13, 16]);
      }
      return null;   // init / final — 코드 하이라이트 없음
    })();
    return raw ? toShown(raw) : null;
  })();

  /* 실행 중인 줄이 화면 밖으로 나가면 "코드대로" 가 안 보인다 (2026-07-30 스크린샷에서
     오른쪽 스캔 줄이 패널 아래로 잘려 있었음). 패널은 높이를 제한해 스크롤 가능하게 하고,
     스텝이 바뀔 때마다 그 줄을 패널 안에서만 가운데로 끌어온다.
     block:"nearest" + 컨테이너 직접 스크롤 → 페이지 전체가 튀지 않음. */
  const codeBoxRef = useRef(null);
  const activeLineRef = useRef(null);
  useEffect(() => {
    const box = codeBoxRef.current, line = activeLineRef.current;
    if (!box || !line) return;
    const target = line.offsetTop - box.clientHeight / 2 + line.offsetHeight / 2;
    box.scrollTop = Math.max(0, target);
  }, [safe]);

  /* 변수 판 — 이 순간 코드 안 변수들이 실제로 든 값. 포인터 위치(idx)를 코드
     변수로 보여줘야 "코드대로 움직인다" 가 눈으로 확인된다. */
  const codeVars = (() => {
    if (!hasRow) return null;
    if (s.kind === "scan") {
      return {
        j: s.row.j,
        idx: s.cursor,
        left_i: s.dir === "left" ? s.leftFound : s.row.left,
        right_k: s.dir === "left" ? -1 : s.rightFound,
        best: s.best,
      };
    }
    return { j: s.row.j, idx: null, left_i: s.row.left, right_k: s.row.right, best: s.best };
  })();

  /* cellRole — what each cell IS in the current step:
       "j"            → middle (yellow, locked)
       "left_i"       → matched during LEFT scan (red)
       "right_k"      → matched during RIGHT scan (green)
       "skipped_left" → scanned during LEFT scan, didn't match → ✗ overlay
       "skipped_right"→ scanned during RIGHT scan, didn't match → ✗ overlay
       "outside"      → not scanned at all in this j
     The "skipped_*" roles let the student SEE the scan path
     without reading text — footprints from outside-l → j and outside-r → j. */
  // 커서 = 지금 이 순간 비교하고 있는 칸 하나. 색은 cellRole 이, 링은 isCursor 가 담당.
  const isCursor = (i) => s.kind === "scan" && i === s.cursor;

  const cellRole = (i) => {
    if (!hasRow) return "outside";
    if (i === s.row.j) return "j";
    // 확정된 i / k 는 커서보다 우선 — "찾았다" 가 색으로 남아야 하니까.
    if (s.leftFound >= 0 && i === s.leftFound) return "left_i";
    if (s.rightFound >= 0 && i === s.rightFound) return "right_k";
    // 아직 비교 중인 칸 (확정 아님)
    if (isCursor(i)) return s.dir === "left" ? "cursor_left" : "cursor_right";
    // 이미 보고 지나간 칸 → ✗ 발자국
    if (s.leftSeen.includes(i)) return "skipped_left";
    if (s.rightSeen.includes(i)) return "skipped_right";
    return "outside";
  };
  const cellStyle = (i) => {
    const role = cellRole(i);
    const PALETTE = {
      j:             { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e", op: 1 },
      left_i:        { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d", op: 1 },
      right_k:       { bg: "#dcfce7", bd: "#16a34a", fg: "#15803d", op: 1 },
      // 비교 중 — 확정색(빨강/초록)과 구별되게 남색. "아직 결정 안 됨" 을 뜻함.
      cursor_left:   { bg: "#eef2ff", bd: "#6366f1", fg: "#3730a3", op: 1 },
      cursor_right:  { bg: "#eef2ff", bd: "#6366f1", fg: "#3730a3", op: 1 },
      skipped_left:  { bg: "#fef2f2", bd: "#fca5a5", fg: "#991b1b", op: 0.55 },
      skipped_right: { bg: "#f0fdf4", bd: "#86efac", fg: "#166534", op: 0.55 },
      outside:       { bg: "#fff",    bd: "#cbd5e1", fg: "#475569", op: 1 },
    };
    const p = PALETTE[role];
    const cur = isCursor(i);
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
      background: p.bg, border: `${cur ? 2 : 1}px solid ${p.bd}`, color: p.fg, opacity: p.op,
      transition: "all .2s",
      position: "relative",
      // 커서 칸만 살짝 키우고 링 — 눈이 "지금 여기" 를 바로 찾게.
      transform: cur ? "scale(1.12)" : "none",
      boxShadow: cur ? "0 0 0 3px rgba(99,102,241,.25)" : "none",
      zIndex: cur ? 1 : 0,
    };
  };
  const labelFor = (i) => {
    const role = cellRole(i);
    if (role === "j") return "j";
    if (role === "left_i") return "left_i";
    if (role === "right_k") return "right_k";
    // 비교 중인 칸엔 이름을 안 붙임 — 아직 i/k 가 아니니까. 대신 '보는 중' 표시.
    if (role === "cursor_left" || role === "cursor_right") return "?";
    return "";
  };
  const overlayFor = (i) => {
    // Show ✗ on cells that were scanned but didn't match — the "footprint" of the scan.
    const role = cellRole(i);
    if (role === "skipped_left" || role === "skipped_right") return "✗";
    return null;
  };
  // Direction-arrow row: shows ▶▶▶ from l-edge toward where left_i was found,
  //                     and ◀◀◀ from r-edge toward where right_k was found.
  // Anchored on the OUTSIDE end of each scan so the student sees "scan starts here, lands there".
  const arrowFor = (i) => {
    if (!hasRow) return null;
    // 스캔 중이면 화살표가 *커서 위* 에 온다 — 어느 방향으로 걸어가는 중인지 보이게.
    if (s.kind === "scan") return i === s.cursor ? (s.dir === "left" ? "▶" : "◀") : null;
    // 점수 단계에선 두 스캔이 시작한 양 끝을 표시.
    if (i === l) return "▶";
    if (i === r) return "◀";
    return null;
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `s = "${str}"`, `s = "${str}"`)}
        subtitle={`(${safe + 1} / ${trace.length})`}
      />

      {/* 규칙 설명은 시작 화면에서만. 스캔이 시작되면 말풍선이 매 스텝 같은 말을
          더 구체적으로 하므로 겹친다. (선생님 2026-07-30: "너무 많은 정보가 있어") */}
      {s.kind === "init" && (
        <div style={{
          textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10,
          wordBreak: "keep-all", lineHeight: 1.6,
        }}>
          {t(E,
            <>j is fixed (yellow). Find <b style={{ color: "#dc2626" }}>i</b> = leftmost letter <b>different</b> from j, and <b style={{ color: "#16a34a" }}>k</b> = rightmost letter <b>same</b> as j.</>,
            <>j 는 고정 (노랑). <b style={{ color: "#dc2626" }}>i</b> = j 와 <b>다른</b> 글자 중 가장 왼쪽, <b style={{ color: "#16a34a" }}>k</b> = j 와 <b>같은</b> 글자 중 가장 오른쪽.</>)}
        </div>
      )}

      {/* 스텝 말풍선 — 이번 한 번의 비교를 글자와 번호로 그대로 말해준다.
          (추상적인 "i 를 찾는다" 대신 "2번 = 'a' vs j = 'b' → 다르다") */}
      {s.kind === "scan" && (() => {
        const cch = str[s.cursor], jch = s.row.sj;
        const dirKo = s.dir === "left" ? "왼쪽에서 →" : "오른쪽에서 ←";
        const dirEn = s.dir === "left" ? "from the left →" : "from the right ←";
        const col = s.isMatch ? (s.dir === "left" ? "#dc2626" : "#16a34a") : "#4338ca";
        return (
          <div style={{
            maxWidth: 460, margin: "0 auto 12px", padding: "9px 13px", borderRadius: 10,
            background: s.isMatch ? (s.dir === "left" ? "#fef2f2" : "#f0fdf4") : "#eef2ff",
            border: `1.5px solid ${s.isMatch ? (s.dir === "left" ? "#fca5a5" : "#86efac") : "#c7d2fe"}`,
            fontSize: 12, fontWeight: 700, color: col, textAlign: "center",
            wordBreak: "keep-all", lineHeight: 1.6,
          }}>
            <span style={{ color: C.dim, fontWeight: 600 }}>{t(E, dirEn, dirKo)}</span>{"  "}
            <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              s[{s.cursor}] = '{cch}'
            </span>
            {" "}{s.dir === "left"
              ? (s.isMatch ? "≠" : "=")
              : (s.isMatch ? "=" : "≠")}{" "}
            <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>j = '{jch}'</span>
            <br />
            {s.isMatch
              ? (s.dir === "left"
                  ? t(E, <>different! → <b>left_i = {s.cursor}</b> decided ✔</>, <>다르다! → <b>left_i = {s.cursor}</b> 확정 ✔</>)
                  : t(E, <>same! → <b>right_k = {s.cursor}</b> decided ✔</>, <>같다! → <b>right_k = {s.cursor}</b> 확정 ✔</>))
              : (s.dir === "left"
                  ? t(E, "same — not what we want, keep going →", "같네 — 우리가 찾는 게 아니에요, 계속 →")
                  : t(E, "different — keep going ←", "다르네 — 계속 ←"))}
          </div>
        );
      })()}

      {/* 점수 단계 — 스캔이 다 끝난 뒤에만 계산식을 보여준다. */}
      {s.kind === "score" && (
        <div style={{
          maxWidth: 460, margin: "0 auto 12px", padding: "9px 13px", borderRadius: 10,
          background: "#fffbeb", border: "1.5px solid #fcd34d",
          fontSize: 12, fontWeight: 700, color: "#92400e", textAlign: "center",
          wordBreak: "keep-all", lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace",
        }}>
          {s.row.score === null
            ? t(E, <span style={{ fontFamily: "inherit" }}>No i or no k for this j → skip ✗</span>,
                  <span style={{ fontFamily: "inherit" }}>이 j 는 i 나 k 가 없어요 → 건너뜀 ✗</span>)
            : <>
                ({s.row.j} − <span style={{ color: "#dc2626" }}>{s.row.left}</span>) × (<span style={{ color: "#16a34a" }}>{s.row.right}</span> − {s.row.j})
                {" = "}
                <span style={{ color: "#dc2626" }}>{s.row.j - s.row.left}</span>×<span style={{ color: "#16a34a" }}>{s.row.right - s.row.j}</span>
                {" = "}<b style={{ fontSize: 14 }}>{s.row.score}</b>
              </>}
        </div>
      )}

      {/* No legend. The cells below carry all the meaning visually:
          color  → role (yellow=j, red=left_i, green=right_k)
          ▶◀     → scan start direction
          ✗      → scanned-but-skipped
          label  → which name (j / left_i / right_k) */}

      {/* String row with j/left_i/right_k labels + scan footprints (✗) + scan-direction arrows. */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
        {str.split("").map((ch, i) => {
          const role = cellRole(i);
          const labelColor =
            role === "j" ? "#92400e" :
            role === "left_i" ? "#dc2626" :
            role === "right_k" ? "#16a34a" :
            "transparent";
          const arrow = arrowFor(i);
          const overlay = overlayFor(i);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {/* Top: scan-direction arrow (▶ at l, ◀ at r) — shows where each scan STARTS. */}
              <div style={{ fontSize: 11, height: 13, fontWeight: 700,
                color: arrow === "▶" ? "#dc2626" : arrow === "◀" ? "#16a34a" : "transparent" }}>
                {arrow || " "}
              </div>
              {/* Role label (j / left_i / right_k) */}
              <div style={{ fontSize: 10, height: 14, fontWeight: 600, color: labelColor }}>
                {labelFor(i) || "·"}
              </div>
              {/* The cell itself with optional ✗ overlay for scanned-but-skipped positions */}
              <div style={cellStyle(i)} data-cell={i}>
                {ch}
                {overlay && (
                  <span style={{
                    position: "absolute", top: -3, right: -3, fontSize: 12, fontWeight: 800,
                    color: cellRole(i) === "skipped_left" ? "#dc2626" : "#16a34a",
                    background: "#fff", border: `1.5px solid ${cellRole(i) === "skipped_left" ? "#fca5a5" : "#86efac"}`,
                    width: 14, height: 14, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}>{overlay}</span>
                )}
              </div>
              {/* 0-based — 코드의 idx 와 같은 수여야 "코드대로" 가 성립 (컴포넌트 상단 주석). */}
              <div style={{ fontSize: 9, color: isCursor(i) ? "#4338ca" : C.dim, fontWeight: isCursor(i) ? 800 : 400 }}>{i}</div>
            </div>
          );
        })}
      </div>

      {/* 번호가 여기서 0 부터로 바뀌는 이유를 짚는다.
          앞 브루트 시뮬은 지문의 1-based, 이 시뮬은 코드의 0-based — 우연이 아니라
          '문제의 말 → 코드의 말' 로 넘어가는 지점이고, 코드에 l -= 1 이 있는 이유다.
          (USACO 에서 애들이 실제로 제일 많이 틀리는 off-by-one 이라 숨기지 않는다.) */}
      {/* 번호 기준 안내도 시작 화면에서만 — 매 스텝 붙어 있으면 읽을 게 늘기만 한다. */}
      {s.kind === "init" && (
        <div style={{
          maxWidth: 460, margin: "0 auto 12px", textAlign: "center",
          fontSize: 10, color: C.dim, lineHeight: 1.6, wordBreak: "keep-all",
        }}>
          {t(E,
            <>📎 Numbers start at <b>0</b> here — the code converts with <code>l -= 1</code>. So the problem's <b>1st</b> spot is <code>s[0]</code> in the code.</>,
            <>📎 여기부터 번호가 <b>0</b> 부터예요 — 코드가 <code>l -= 1</code> 로 바꿔 쓰기 때문. 문제의 <b>1 번째</b> 칸이 코드에선 <code>s[0]</code>.</>)}
        </div>
      )}

      {/* ── 코드 + 변수판 — 포인터가 '코드대로' 움직이는 걸 보여주는 부분.
             (선생님 2026-07-30) 하이라이트된 줄이 이번 스텝에 실행된 줄. ── */}
      {CODE.length > 0 && (
        <div style={{ maxWidth: 520, margin: "0 auto 12px" }}>
          {codeVars && (
            <div style={{
              display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 6,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5,
            }}>
              {/* 칩을 최소로 (선생님 2026-07-30: "너무 많은 정보가 있어").
                  j 는 셀에 노란 라벨로 이미 있고, best 는 점수 단계에서만 의미가 있다. */}
              {[
                ["idx", codeVars.idx, "#3730a3", "#eef2ff", "#c7d2fe"],
                ["left_i", codeVars.left_i, "#7f1d1d", "#fef2f2", "#fca5a5"],
                ["right_k", codeVars.right_k, "#15803d", "#f0fdf4", "#86efac"],
                ...(s.kind === "score" ? [["best", codeVars.best, "#334155", "#f8fafc", "#e2e8f0"]] : []),
              ].map(([name, val, fg, bg, bd]) => (
                <span key={name} style={{
                  padding: "2px 7px", borderRadius: 6, background: bg,
                  border: `1px solid ${bd}`, color: fg, fontWeight: 700,
                }}>
                  {name} = {val === null ? "—" : val}
                </span>
              ))}
            </div>
          )}
          <div ref={codeBoxRef} style={{
            background: "#0f172a", borderRadius: 10, padding: "9px 0", overflowX: "auto",
            // 높이 제한 + 자동 스크롤 → 실행 줄이 항상 보인다 (useEffect 참고)
            maxHeight: 170, overflowY: "auto", scrollBehavior: "smooth",
            // ⚠️ 필수 — 이게 없으면 자식의 offsetTop 이 이 박스가 아니라 바깥 조상
            // 기준으로 잡혀서 값이 과도하게 커지고, 스크롤이 늘 맨 아래로 튄다.
            // (2026-07-30 선생님 스크린샷: 2/22 인데 오른쪽 스캔 부분이 보이고
            //  하이라이트가 화면 밖이었음.)
            position: "relative",
          }}>
            {CODE.map((line, li) => {
              const on = hiRange && li >= hiRange[0] && li <= hiRange[1];
              const isFirstOn = on && li === hiRange[0];
              return (
                <div key={li} ref={isFirstOn ? activeLineRef : null} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  padding: "0 10px",
                  background: on ? "rgba(99,102,241,.28)" : "transparent",
                  borderLeft: `3px solid ${on ? "#818cf8" : "transparent"}`,
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5,
                    color: on ? "#c7d2fe" : "#475569", minWidth: 14, textAlign: "right",
                    userSelect: "none", lineHeight: 1.65,
                  }}>{on ? "▸" : " "}</span>
                  <pre style={{
                    margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                    lineHeight: 1.65, color: on ? "#e0e7ff" : "#94a3b8",
                    whiteSpace: "pre", fontWeight: on ? 700 : 400,
                  }}>{line || " "}</pre>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Score strip — one card per j tried so far.
          Shows: which j, and where the score COMES FROM as a formula.
          Format:  j=2
                   1×3=3   ⭐
          The "1×3=3" makes it unambiguous that 3 is the SCORE (result of multiplication),
          not the j position.  No prose. */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {perJ.slice(0, s.revealed).map((row) => {
          const isCurrent = hasRow && row.j === s.row.j;
          const isBest = row.score !== null && row.score === s.best && s.best >= 0;
          // (j - left_i) × (right_k - j) = score
          const f1 = row.left >= 0 ? row.j - row.left : null;
          const f2 = row.right >= 0 ? row.right - row.j : null;
          return (
            <div key={row.j} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "4px 8px", borderRadius: 8, minWidth: 64,
              background: isBest ? "#dcfce7" : isCurrent ? "#fef3c7" : "#f8fafc",
              border: `${isCurrent ? 2 : 1.5}px solid ${
                isBest ? "#16a34a" : isCurrent ? "#f59e0b" : "#e2e8f0"
              }`,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {/* Top: which j this card is about (small, dim) */}
              <div style={{ fontSize: 9.5, color: isCurrent ? "#92400e" : C.dim, fontWeight: 700 }}>
                j = {row.j}
              </div>
              {/* Bottom: the score, shown as a formula so '3' can't be mistaken for j.
                  Uses red/green colored factor numbers matching left_i (red) and right_k (green) cells. */}
              <div style={{
                fontSize: 12, fontWeight: 700, lineHeight: 1.2,
                color: row.score === null ? "#9ca3af" : "#1f2937",
                whiteSpace: "nowrap",
              }}>
                {row.score === null ? (
                  <span style={{ fontSize: 16 }}>✗</span>
                ) : (
                  <>
                    <span style={{ color: "#dc2626" }}>{f1}</span>
                    <span style={{ color: C.dim }}>×</span>
                    <span style={{ color: "#16a34a" }}>{f2}</span>
                    <span style={{ color: C.dim }}>=</span>
                    <span style={{
                      fontSize: 14, fontWeight: 800,
                      color: isBest ? "#15803d" : "#1f2937",
                    }}>{row.score}</span>
                    {isBest && " ⭐"}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* '왜 빠른가 / 기법' — 마지막 단계에서 (선생님 2026-07-23: "왜 빨라? 기법은?"). */}
      {s.kind === "final" && (
        <div style={{ maxWidth: 500, margin: "0 auto 12px", background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "11px 14px", fontSize: 11.5, lineHeight: 1.7, color: "#1e3a8a", wordBreak: "keep-all" }}>
          <div style={{ fontWeight: 800, marginBottom: 5, color: "#1d4ed8" }}>⚡ {t(E, "Why is this faster? (the technique)", "왜 빨라졌나 — 기법")}</div>
          <div>• {t(E, "Triple loop tries every i, j, k → N³.", "3중 for 는 i·j·k 를 다 시도 → N³.")}</div>
          <div>• {t(E, "Fix j: the two gaps (j−i) and (k−j) are INDEPENDENT → put i as far LEFT as possible, k as far RIGHT as possible.  No middle values to try.", "j 고정: 두 거리 (j−i)·(k−j) 는 서로 독립 → i 는 최대한 왼쪽, k 는 최대한 오른쪽.  중간값은 볼 필요 없음.")}</div>
          <div style={{ fontWeight: 700, marginTop: 2 }}>→ {t(E, "one left scan + one right scan per j → N².  Technique: fix the middle + greedy extremes.", "j 마다 왼쪽·오른쪽 한 번씩 → N².  기법: 가운데 고정 + 양 끝 그리디.")}</div>
        </div>
      )}

      {/* Nav */}
      <SharedSimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Mooin3FastSim — 빠른 풀이(글자로 묶기 → i·k → 포물선 j)를 코드 前에 눈으로.
   fix-j 시뮬과 같은 예제(abcabbc)로 이어받아, "모든 j" 대신 "글자 3개"만
   확인해도 같은 답 8 이 나오는 걸 보여줌. 마지막에 그 3동작을 표 3개에 연결.
   (선생님 2026-07-30: "쉽고 시뮬로 이해가 다 되고 모든 테스트 통과".)
   ═══════════════════════════════════════════════════════════════ */
export function Mooin3FastSim({ E }) {
  const FA = "#7c3aed";
  const str = "abcabbc";           // fix-j 시뮬과 동일 예제
  const l = 0, r = str.length - 1;
  const LETTERS = [...new Set(str.split(""))].sort();   // a, b, c

  // 글자마다: i=가장 왼쪽 '다른 글자', k=가장 오른쪽 그 글자, j=i·k 사이 중간(m)에 가장 가까운 그 글자
  const perC = LETTERS.map((c) => {
    let i = -1; for (let x = l; x <= r; x++) if (str[x] !== c) { i = x; break; }
    let k = -1; for (let x = r; x >= l; x--) if (str[x] === c) { k = x; break; }
    let j = -1, area = null, m = null;
    if (i >= 0 && k >= 0 && i < k) {
      m = (i + k) / 2;
      let bd = Infinity;
      for (let x = i + 1; x < k; x++) if (str[x] === c) { const d = Math.abs(x - m); if (d < bd) { bd = d; j = x; } }
      if (j >= 0) area = (j - i) * (k - j);
    }
    return { c, i, k, j, area, m };
  });

  const trace = [{ kind: "intro", revealed: 0 }];
  perC.forEach((row, ci) => {
    trace.push({ kind: "letter", ci, phase: "ik", revealed: ci });
    trace.push({ kind: "letter", ci, phase: "j", revealed: ci + 1 });
  });
  trace.push({ kind: "final", revealed: perC.length });

  const ts = useTraceStep(trace);
  const s = trace[ts.safe];
  const cur = s.kind === "letter" ? perC[s.ci] : null;

  const cellStyle = (x) => {
    let role = "outside";
    if (cur) {
      if (s.phase === "j" && x === cur.j) role = "j";
      else if (x === cur.i) role = "i";
      else if (x === cur.k) role = "k";
      else if (str[x] === cur.c) role = "cpos";
    }
    const P = {
      j:       { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e", op: 1 },
      i:       { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d", op: 1 },
      k:       { bg: "#dcfce7", bd: "#16a34a", fg: "#15803d", op: 1 },
      cpos:    { bg: "#f3e8ff", bd: "#c4b5fd", fg: "#6b21a8", op: 1 },
      outside: { bg: "#fff",    bd: "#cbd5e1", fg: "#94a3b8", op: 0.6 },
    }[role];
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
      background: P.bg, border: `1px solid ${P.bd}`, color: P.fg, opacity: P.op,
      transition: "all .2s", position: "relative",
    };
  };
  const labelFor = (x) => {
    if (!cur) return "";
    if (s.phase === "j" && x === cur.j) return "j";
    if (x === cur.i) return "i";
    if (x === cur.k) return "k";
    return "";
  };
  const labelColor = (x) => {
    if (!cur) return "transparent";
    if (s.phase === "j" && x === cur.j) return "#92400e";
    if (x === cur.i) return "#dc2626";
    if (x === cur.k) return "#16a34a";
    return "transparent";
  };
  // 중간점 m 마커 (phase j 에서만) — m 에 가장 가까운 칸 아래 ▲
  const mCell = (cur && s.phase === "j" && cur.m !== null) ? Math.round(cur.m) : -1;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={FA}
        idx={ts.safe}
        total={trace.length}
        isEn={E}
        title={t(E, `s = "${str}"  —  fast: check by LETTER`, `s = "${str}"  —  빠른 풀이: 글자로 확인`)}
        subtitle={`(${ts.safe + 1} / ${trace.length})`}
      />

      {/* 말풍선 — 이 단계에서 무슨 일이 일어나는지 (코드 前 이해용). */}
      <div style={{
        maxWidth: 560, margin: "0 auto 14px", background: "#faf5ff", border: `1.5px solid ${FA}`,
        borderRadius: 12, padding: "11px 15px", fontSize: 13, lineHeight: 1.65, color: "#5b21b6",
        wordBreak: "keep-all", textAlign: "center",
      }}>
        {s.kind === "intro" && t(E,
          "Fix-j checked every middle spot (5 here). But notice: in every moo the middle and the right are the SAME letter. So instead of every spot, just check per LETTER — only a, b, c here.",
          "fix-j 는 가운데 자리를 전부(여기선 5개) 확인했죠. 근데 보세요 — 모든 moo 에서 '가운데'와 '오른쪽'은 같은 글자예요. 그러니 자리마다 말고, 글자마다만 확인하면 돼요 — 여기선 a, b, c 셋뿐.")}
        {s.kind === "letter" && s.phase === "ik" && t(E,
          `Letter c = '${cur.c}':  far-right '${cur.c}' = k (green, biggest k−j room),  far-left NON-'${cur.c}' = i (red, biggest j−i room).`,
          `글자 c = '${cur.c}':  가장 오른쪽 '${cur.c}' = k (초록, k−j 최대),  가장 왼쪽 '${cur.c} 아닌 글자' = i (빨강, j−i 최대).`)}
        {s.kind === "letter" && s.phase === "j" && (cur.area !== null
          ? t(E,
              `Put j (a '${cur.c}') near the midpoint m — (j−i)(k−j) is a rectangle, biggest in the middle. Only the '${cur.c}' closest to m matters.  Area = (${cur.j - cur.i})×(${cur.k - cur.j}) = ${cur.area}.`,
              `j (='${cur.c}') 는 중간 m 근처에 — (j−i)(k−j) 는 직사각형 넓이라 가운데서 최대. m 에 가장 가까운 '${cur.c}' 하나만 보면 돼요.  넓이 = (${cur.j - cur.i})×(${cur.k - cur.j}) = ${cur.area}.`)
          : t(E,
              `No '${cur.c}' sits strictly between i and k → letter '${cur.c}' makes no moo. Skip it.`,
              `i 와 k 사이에 '${cur.c}' 가 없어요 → 글자 '${cur.c}' 로는 moo 없음. 넘어가요.`))}
        {s.kind === "final" && t(E,
          "Same answer as fix-j: 8 ⭐ (from c = 'c').  But we checked only 3 LETTERS, not every spot.",
          "fix-j 와 같은 답: 8 ⭐ (c = 'c' 에서).  근데 자리 전부가 아니라 글자 3개만 확인했어요.")}
      </div>

      {/* 문자열 행 */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4 }}>
        {str.split("").map((ch, x) => (
          <div key={x} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 11, height: 14, fontWeight: 700, color: labelColor(x) }}>{labelFor(x) || "·"}</div>
            <div style={cellStyle(x)}>{ch}</div>
            <div style={{ fontSize: 11, height: 13, fontWeight: 800, color: x === mCell ? FA : "transparent" }}>
              {x === mCell ? "▲" : "·"}
            </div>
            <div style={{ fontSize: 9, color: C.dim }}>{x + 1}</div>
          </div>
        ))}
      </div>
      {mCell >= 0 && (
        <div style={{ textAlign: "center", fontSize: 10.5, color: FA, marginBottom: 10, fontWeight: 700 }}>
          {t(E, "▲ m = midpoint of i and k", "▲ m = i 와 k 의 가운데")}
        </div>
      )}

      {/* 글자별 결과 카드 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {perC.slice(0, s.revealed).map((row) => {
          const isCur = cur && row.c === cur.c;
          const isBest = row.area !== null && row.area === Math.max(...perC.map((p) => p.area ?? -1)) && row.area >= 0;
          return (
            <div key={row.c} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "5px 10px", borderRadius: 8, minWidth: 66,
              background: isBest ? "#dcfce7" : isCur ? "#faf5ff" : "#f8fafc",
              border: `${isCur ? 2 : 1.5}px solid ${isBest ? "#16a34a" : isCur ? FA : "#e2e8f0"}`,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              <div style={{ fontSize: 10, color: isCur ? "#6b21a8" : C.dim, fontWeight: 700 }}>c = '{row.c}'</div>
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, color: row.area === null ? "#9ca3af" : "#1f2937", whiteSpace: "nowrap" }}>
                {row.area === null ? <span style={{ fontSize: 16 }}>✗</span> : (
                  <>
                    <span style={{ color: "#dc2626" }}>{row.j - row.i}</span>
                    <span style={{ color: C.dim }}>×</span>
                    <span style={{ color: "#16a34a" }}>{row.k - row.j}</span>
                    <span style={{ color: C.dim }}>=</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: isBest ? "#15803d" : "#1f2937" }}>{row.area}</span>
                    {isBest && " ⭐"}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* final — 왜 빠른가 + 표 3개 연결 */}
      {s.kind === "final" && (
        <div style={{ maxWidth: 540, margin: "0 auto 12px", background: "#faf5ff", border: `1.5px solid ${FA}`, borderRadius: 10, padding: "12px 15px", fontSize: 12, lineHeight: 1.7, color: "#5b21b6", wordBreak: "keep-all" }}>
          <div style={{ fontWeight: 800, marginBottom: 6, color: FA }}>⚡ {t(E, "Why it's fast — 3 tables answer each move instantly", "왜 빠른가 — 표 3개가 각 동작을 즉시 답해줌")}</div>
          <div>1. {t(E, "rightmost letter c  →  k", "가장 오른쪽 글자 c  →  k")} <span style={{ color: C.dim }}>(latest_same)</span></div>
          <div>2. {t(E, "leftmost NON-c  →  i", "가장 왼쪽 c 아닌 글자  →  i")} <span style={{ color: C.dim }}>(nearest_diff)</span></div>
          <div>3. {t(E, "the c nearest the midpoint m  →  j", "중간 m 에 가장 가까운 c  →  j")} <span style={{ color: C.dim }}>(earliest/latest_same)</span></div>
          <div style={{ fontWeight: 700, marginTop: 5 }}>→ {t(E, "Built once beforehand, each lookup is instant → only 26 letters per query → passes N = 100,000.", "미리 한 번 만들어 두면 조회가 즉시 → 쿼리당 글자 26개뿐 → N = 100,000 도 통과.")}</div>
        </div>
      )}

      <SharedSimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={FA} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Mooin3Sim — for each j in [l+1, r-1], find best i and k
   ═══════════════════════════════════════════════════════════════ */
const _M3_PRESETS = [
  { s: "abbab", l: 0, r: 4 },
  { s: "abacaba", l: 0, r: 6 },
  { s: "aaabbb", l: 0, r: 5 },
];

export function Mooin3Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [j, setJ] = useState(2);
  const preset = _M3_PRESETS[pi];
  const s = preset.s;
  const l = preset.l, r = preset.r;
  // ensure j in valid range
  const validJ = Math.max(l + 1, Math.min(r - 1, j));

  // find best i (farthest left with s[i] != s[j])
  let bestI = -1;
  for (let i = l; i < validJ; i++) if (s[i] !== s[validJ]) { bestI = i; break; }
  // find best k (farthest right with s[k] == s[j])
  let bestK = -1;
  for (let k = r; k > validJ; k--) if (s[k] === s[validJ]) { bestK = k; break; }
  const product = (bestI >= 0 && bestK >= 0) ? (validJ - bestI) * (bestK - validJ) : -1;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_M3_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setJ(p.l + 1); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>"{p.s}"</button>
        ))}
      </div>

      {/* Cells with role labels above (j / left_i / right_k) — colors match the score card.
          left_i = RED (consistent with MooTraceSim), j = YELLOW, right_k = GREEN. */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12 }}>
        {s.split("").map((ch, idx) => {
          const isJ = idx === validJ;
          const isI = idx === bestI;
          const isK = idx === bestK;
          const inRange = idx >= l && idx <= r;
          const lab = isJ ? "j" : isI ? "left_i" : isK ? "right_k" : "";
          const labColor = isJ ? "#92400e" : isI ? "#dc2626" : isK ? "#16a34a" : "transparent";
          return (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 9.5, height: 12, fontWeight: 700, color: labColor, fontFamily: "'JetBrains Mono',monospace" }}>
                {lab || " "}
              </div>
              <div style={{
                width: 30, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: isJ ? "#fef3c7" : (isI ? "#fee2e2" : (isK ? "#dcfce7" : (inRange ? "#fff" : "#f3f4f6"))),
                border: `1.5px solid ${isJ ? "#f59e0b" : (isI ? "#dc2626" : (isK ? "#16a34a" : (inRange ? "#cbd5e1" : "#e5e7eb")))}`,
                color: isJ ? "#92400e" : isI ? "#7f1d1d" : isK ? "#15803d" : (inRange ? C.text : "#9ca3af"),
              }}>{ch}</div>
              <div style={{ fontSize: 9, color: C.dim }}>{idx + 1}</div>
            </div>
          );
        })}
      </div>

      {/* j slider — visual control, label shows current j next to thumb. */}
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.text, marginBottom: 4 }}>
          <span style={{ background: "#fef3c7", border: "1.5px solid #f59e0b", color: "#92400e", padding: "1px 8px", borderRadius: 5, fontWeight: 800 }}>
            j = {validJ + 1}
          </span>
          <span style={{ color: C.dim, fontSize: 10 }}>← →</span>
        </div>
        <input type="range" min={l + 1} max={r - 1} value={validJ} onChange={e => setJ(parseInt(e.target.value))} style={{ width: "100%" }} />
      </div>

      {/* Score card — visual formula, no prose.  Matches the score-strip card style of MooTraceSim. */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 6,
        background: product >= 0 ? "#dcfce7" : "#fef2f2",
        border: `1.5px solid ${product >= 0 ? "#16a34a" : "#dc2626"}`,
        borderRadius: 10, padding: "8px 14px", fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span style={{ fontSize: 10, color: product >= 0 ? "#15803d" : "#991b1b", fontWeight: 700 }}>
          score
        </span>
        {product >= 0 ? (
          <>
            <span style={{ color: "#dc2626", fontSize: 14, fontWeight: 700 }}>{validJ - bestI}</span>
            <span style={{ color: C.dim }}>×</span>
            <span style={{ color: "#16a34a", fontSize: 14, fontWeight: 700 }}>{bestK - validJ}</span>
            <span style={{ color: C.dim }}>=</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>{product}</span>
          </>
        ) : (
          <span style={{ fontSize: 22, fontWeight: 800, color: "#dc2626" }}>✗</span>
        )}
      </div>
    </div>
  );
}

export function Mooin3Runner({ E }) {
  // Empty placeholder — actual interactivity lives in Mooin3Sim above.
  return null;
}

/* Section 1: Input — string + queries */
const M3_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
];
const M3_INPUT_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: For each query, scan middle j */
const M3_LOOP_PY = (E) => [
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  t(E, "    l -= 1   # convert to 0-based",
        "    l -= 1   # 0-based 로 변환"),
  "    r -= 1",
  "    best = -1",
  "",
  t(E, "    # Try every middle position j; for each, scan left + right.",
        "    # 모든 가운데 자리 j 시도 — j 박힌 동안 왼쪽 + 오른쪽 훑기."),
  "    for j in range(l + 1, r):",
  t(E, "        # left_i = first slot in [l, j) with a DIFFERENT letter from s[j].",
        "        # left_i = [l, j) 에서 s[j] 와 다른 글자가 *처음* 나오는 자리"),
  "        left_i = -1",
  "        for idx in range(l, j):",
  "            if s[idx] != s[j]:",
  "                left_i = idx",
  "                break",
  t(E, "        # right_k = last slot in (j, r] with the SAME letter as s[j].",
        "        # right_k = (j, r] 에서 s[j] 와 같은 글자가 *마지막* 으로 있는 자리"),
  "        right_k = -1",
  "        for idx in range(r, j, -1):",
  "            if s[idx] == s[j]:",
  "                right_k = idx",
  "                break",
];
const M3_LOOP_CPP = (E) => [
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  t(E, "        l--;   // convert to 0-based",
        "        l--;   // 0-based 로 변환"),
  "        r--;",
  "        long long best = -1;",
  "",
  "        for (int j = l + 1; j < r; j++) {",
  t(E, "            // left_i = first slot left of j with a DIFFERENT letter from s[j].",
        "            // left_i = j 왼쪽에서 s[j] 와 다른 글자가 *처음* 나오는 자리"),
  "            int left_i = -1;",
  "            for (int idx = l; idx < j; idx++) {",
  "                if (s[idx] != s[j]) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  t(E, "            // right_k = last slot right of j with the SAME letter as s[j].",
        "            // right_k = j 오른쪽에서 s[j] 와 같은 글자가 *마지막* 자리"),
  "            int right_k = -1;",
  "            for (int idx = r; idx > j; idx--) {",
  "                if (s[idx] == s[j]) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
];

/* Section 3: update best with (j - left_i) * (right_k - j) */
const M3_UPDATE_PY = [
  "        if left_i != -1 and right_k != -1:",
  "            score = (j - left_i) * (right_k - j)",
  "            if score > best:",
  "                best = score",
  "    print(best)",
];
const M3_UPDATE_CPP = [
  "            if (left_i != -1 && right_k != -1) {",
  "                long long score = (long long)(j - left_i) * (right_k - j);",
  "                if (score > best) {",
  "                    best = score;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const M3_FULL_PY = (E) => [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  t(E, "    l -= 1   # convert to 0-based", "    l -= 1   # 0-based 로 변환"),
  "    r -= 1",
  "    best = -1",
  t(E, "    # Try every middle spot j — while j is pinned, scan both sides.", "    # 모든 가운데 자리 j 한 번씩 시도 — j 가 박힌 동안 양쪽으로 훑기."),
  "    for j in range(l + 1, r):",
  t(E, "        # Left scan: FIRST spot with a different letter than s[j] -> left_i", "        # 왼쪽 훑기: s[j] 와 다른 글자가 *처음* 나오는 자리 → left_i"),
  "        left_i = -1",
  "        for idx in range(l, j):",
  "            if s[idx] != s[j]:",
  "                left_i = idx",
  "                break",
  t(E, "        # Right scan: LAST spot with the same letter as s[j] -> right_k", "        # 오른쪽 훑기: s[j] 와 같은 글자가 *마지막* 으로 있는 자리 → right_k"),
  "        right_k = -1",
  "        for idx in range(r, j, -1):",
  "            if s[idx] == s[j]:",
  "                right_k = idx",
  "                break",
  "        if left_i != -1 and right_k != -1:",
  "            score = (j - left_i) * (right_k - j)",
  "            if score > best:",
  "                best = score",
  "    print(best)",
];
const M3_FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int left_i = -1;",
  "            for (int idx = l; idx < j; idx++) {",
  "                if (s[idx] != s[j]) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  "            int right_k = -1;",
  "            for (int idx = r; idx > j; idx--) {",
  "                if (s[idx] == s[j]) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (left_i != -1 && right_k != -1) {",
  "                long long score = (long long)(j - left_i) * (right_k - j);",
  "                if (score > best) {",
  "                    best = score;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 6 — Stage A: Group by character c (still scans for i, k each query).
       이 단계의 목표: 외곽 루프를 j (N 개) → c (26 개) 로 바꾼다.
       복잡도는 아직 O(Q · 26·N) — 통과는 못 하지만 다음 단계의 발판.        ── */
const M3_STAGE_A_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "# 문자 c 마다 등장 인덱스 미리 모아두기 (왼→오 순서라 자동 정렬).",
  "positions_of = [[] for _ in range(26)]",
  "for idx in range(N):",
  "    positions_of[ord(s[idx]) - 97].append(idx)",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    # 핵심 변경: j (N 개) 대신 c (26 개) 로 외곽 루프.",
  "    # 같은 글자 c 인 j 들은 모두 같은 i, k 질문을 함 → 한 번만 답하면 됨.",
  "    for c in range(26):",
  "        ch = chr(c + 97)",
  "        # 가장 왼쪽 i (s[i] ≠ ch) — 매번 스캔 (다음 단계에서 lookup 표로 교체)",
  "        left_i = -1",
  "        for idx in range(l, r):",
  "            if s[idx] != ch:",
  "                left_i = idx",
  "                break",
  "        if left_i == -1:",
  "            continue",
  "        # 가장 오른쪽 k (s[k] = ch) — 매번 스캔",
  "        right_k = -1",
  "        for idx in range(r, left_i, -1):",
  "            if s[idx] == ch:",
  "                right_k = idx",
  "                break",
  "        if right_k <= left_i:",
  "            continue",
  "        # 그 사이의 j 후보들 = positions_of[c] 중 (left_i, right_k) 안",
  "        for j in positions_of[c]:",
  "            if j <= left_i:",
  "                continue",
  "            if j >= right_k:",
  "                break",
  "            product = (j - left_i) * (right_k - j)",
  "            if product > best:",
  "                best = product",
  "    print(best)",
];
const M3_STAGE_A_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    // 문자 c 마다 등장 인덱스 미리 모아두기 (왼→오 순서라 자동 정렬).",
  "    vector<vector<int>> positions_of(26);",
  "    for (int idx = 0; idx < N; idx++) {",
  "        positions_of[s[idx] - 'a'].push_back(idx);",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        // 핵심 변경: j (N 개) 대신 c (26 개) 로 외곽 루프.",
  "        for (int c = 0; c < 26; c++) {",
  "            char ch = 'a' + c;",
  "            // 가장 왼쪽 i (s[i] != ch) — 매번 스캔",
  "            int left_i = -1;",
  "            for (int idx = l; idx < r; idx++) {",
  "                if (s[idx] != ch) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (left_i == -1) {",
  "                continue;",
  "            }",
  "            // 가장 오른쪽 k (s[k] == ch)",
  "            int right_k = -1;",
  "            for (int idx = r; idx > left_i; idx--) {",
  "                if (s[idx] == ch) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (right_k <= left_i) {",
  "                continue;",
  "            }",
  "            // 그 사이의 j 후보들",
  "            for (int j : positions_of[c]) {",
  "                if (j <= left_i) {",
  "                    continue;",
  "                }",
  "                if (j >= right_k) {",
  "                    break;",
  "                }",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 7 — Stage B: + lookup 표 미리 만들기.
       nearest_diff[c][i] + latest_same[c][i] precompute → i, k 조회 O(1).
       복잡도 O(26·N + Q · |positions[c]|) — 여전히 부족하지만 점점 나아짐.    ── */
const M3_STAGE_B_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "positions_of = [[] for _ in range(26)]",
  "for idx in range(N):",
  "    positions_of[ord(s[idx]) - 97].append(idx)",
  "",
  "# NEW: 두 lookup 표를 한 번만 만들어 둠.",
  "#   nearest_diff[c][i] = idx ≥ i 중 s[idx] ≠ chr(c) 인 가장 작은 idx",
  "#   latest_same[c][i]  = idx ≤ i 중 s[idx] == chr(c) 인 가장 큰 idx",
  "INF = N",
  "nearest_diff = [[INF] * (N + 1) for _ in range(26)]",
  "latest_same  = [[-1]  * (N + 1) for _ in range(26)]",
  "for c in range(26):",
  "    ch = chr(c + 97)",
  "    next_diff_idx = INF",
  "    for idx in range(N - 1, -1, -1):",
  "        if s[idx] != ch:",
  "            next_diff_idx = idx",
  "        nearest_diff[c][idx] = next_diff_idx",
  "    last_same_idx = -1",
  "    for idx in range(N):",
  "        if s[idx] == ch:",
  "            last_same_idx = idx",
  "        latest_same[c][idx] = last_same_idx",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    for c in range(26):",
  "        # NEW: 매번 스캔하던 left_i / right_k 가 표 한 번 조회로 끝.",
  "        left_i = nearest_diff[c][l]",
  "        if left_i >= r:",
  "            continue",
  "        right_k = latest_same[c][r]",
  "        if right_k <= left_i:",
  "            continue",
  "        # j 는 여전히 positions_of[c] 모두 순회 (다음 단계에서 표 하나 더로 O(1) 압축)",
  "        for j in positions_of[c]:",
  "            if j <= left_i:",
  "                continue",
  "            if j >= right_k:",
  "                break",
  "            product = (j - left_i) * (right_k - j)",
  "            if product > best:",
  "                best = product",
  "    print(best)",
];
const M3_STAGE_B_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    vector<vector<int>> positions_of(26);",
  "    for (int idx = 0; idx < N; idx++) {",
  "        positions_of[s[idx] - 'a'].push_back(idx);",
  "    }",
  "",
  "    // NEW: 두 lookup 표를 한 번만 만들어 둠.",
  "    int INF = N;",
  "    vector<vector<int>> nearest_diff(26, vector<int>(N + 1, INF));",
  "    vector<vector<int>> latest_same(26, vector<int>(N + 1, -1));",
  "    for (int c = 0; c < 26; c++) {",
  "        char ch = 'a' + c;",
  "        int next_diff_idx = INF;",
  "        for (int idx = N - 1; idx >= 0; idx--) {",
  "            if (s[idx] != ch) {",
  "                next_diff_idx = idx;",
  "            }",
  "            nearest_diff[c][idx] = next_diff_idx;",
  "        }",
  "        int last_same_idx = -1;",
  "        for (int idx = 0; idx < N; idx++) {",
  "            if (s[idx] == ch) {",
  "                last_same_idx = idx;",
  "            }",
  "            latest_same[c][idx] = last_same_idx;",
  "        }",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int c = 0; c < 26; c++) {",
  "            // NEW: 표 조회 O(1)",
  "            int left_i = nearest_diff[c][l];",
  "            if (left_i >= r) {",
  "                continue;",
  "            }",
  "            int right_k = latest_same[c][r];",
  "            if (right_k <= left_i) {",
  "                continue;",
  "            }",
  "            for (int j : positions_of[c]) {",
  "                if (j <= left_i) {",
  "                    continue;",
  "                }",
  "                if (j >= right_k) {",
  "                    break;",
  "                }",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 8 — Stage C (final fast): 포물선 꼭짓점 + lookup 표 (이분 탐색 없음).
       f(j) = (j - i)(k - j) 는 위로 볼록 포물선(∩) → 꼭짓점 (i+k)/2 근처 c 후보 2 개만.
       그 2 개를 latest_same / earliest_same 표에서 O(1) 로 바로 조회 → 쿼리당 O(26).
       공식 solution 과 동일 (표 기반, bisect 없음).  O(26·(N + Q)) — 통과.       ── */
const M3_FAST_PY = (E) => [
  "import sys",
  t(E, "input = sys.stdin.readline                     # fast input (essential for 30k queries)", "input = sys.stdin.readline                     # 빠른 입력 (쿼리 3 만 개 필수)"),
  "",
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  t(E, "# Three lookup tables — built once, before any query (precompute).  chr(c+97) = letter c", "# 세 lookup 표 — 쿼리 전에 한 번만 만들어 둠 (전처리).  chr(c+97) = 글자 c"),
  t(E, "#   latest_same[c][i]   = rightmost idx <= i that is letter c (-1 if none)", "#   latest_same[c][i]   = idx ≤ i 중 글자 c 의 가장 오른쪽 (없으면 -1)"),
  t(E, "#   earliest_same[c][i] = leftmost idx >= i that is letter c (INF if none)", "#   earliest_same[c][i] = idx ≥ i 중 글자 c 의 가장 왼쪽 (없으면 INF)"),
  t(E, "#   nearest_diff[c][i]  = leftmost idx >= i that is NOT c (INF if none)", "#   nearest_diff[c][i]  = idx ≥ i 중 c 아닌 가장 왼쪽 (없으면 INF)"),
  "INF = N",
  "latest_same   = [[-1]  * N for _ in range(26)]",
  "earliest_same = [[INF] * N for _ in range(26)]",
  "nearest_diff  = [[INF] * N for _ in range(26)]",
  "for c in range(26):",
  "    ch = chr(c + 97)",
  "    ls = latest_same[c]",
  "    last = -1",
  t(E, "    for i in range(N):                         # left->right: last position of c seen so far", "    for i in range(N):                         # 왼→오: 지금까지 본 c 의 마지막 위치"),
  "        if s[i] == ch:",
  "            last = i",
  "        ls[i] = last",
  "    es = earliest_same[c]",
  "    nd = nearest_diff[c]",
  "    nxt_same = INF",
  "    nxt_diff = INF",
  t(E, "    for i in range(N - 1, -1, -1):             # right->left: first upcoming c / non-c position", "    for i in range(N - 1, -1, -1):             # 오→왼: 앞으로 나올 c / c아님 의 첫 위치"),
  "        if s[i] == ch:",
  "            nxt_same = i",
  "        else:",
  "            nxt_diff = i",
  "        es[i] = nxt_same",
  "        nd[i] = nxt_diff",
  "",
  "out = []",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    for c in range(26):",
  t(E, "        # i = leftmost DIFFERENT letter -> maximize (j - i)", "        # i = 가장 왼쪽 '다른 글자' → (j - i) 를 최대로"),
  "        i = nearest_diff[c][l]",
  "        if i >= r:",
  "            continue",
  t(E, "        # k = rightmost c -> maximize (k - j)", "        # k = 가장 오른쪽 c → (k - j) 를 최대로"),
  "        k = latest_same[c][r]",
  "        if k <= i:",
  "            continue",
  t(E, "        # f(j) = (j - i)(k - j) is an upside-down parabola (∩) -> j near the vertex m is largest", "        # f(j) = (j - i)(k - j) 는 위로 볼록 포물선(∩) → 꼭짓점 m 에 가까운 j 가 최대"),
  "        m = (i + k) // 2",
  t(E, "        # the 2 c-candidates around the vertex = O(1) straight from the tables (no binary search)", "        # 꼭짓점 양옆 c 후보 2 개 = 두 표에서 O(1) 로 바로 (이분 탐색 불필요)"),
  "        for j in (latest_same[c][m], earliest_same[c][m]):",
  "            if i < j < k:",
  "                product = (j - i) * (k - j)",
  "                if product > best:",
  "                    best = product",
  "    out.append(str(best))",
  "",
  t(E, "sys.stdout.write('\\n'.join(out) + '\\n')   # print all at once (printing per query is slow)", "sys.stdout.write('\\n'.join(out) + '\\n')   # 모아서 한 번에 출력 (쿼리마다 print 하면 느림)"),
];
const M3_FAST_CPP = (E) => [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  t(E, "    // Three lookup tables — once, before any query (precompute).  ('a'+c) = letter c", "    // 세 lookup 표 — 쿼리 전에 한 번만 (전처리).  ('a'+c) = 글자 c"),
  t(E, "    //   latest_same[c][i]   = rightmost idx <= i that is c (-1 if none)", "    //   latest_same[c][i]   = idx ≤ i 중 c 의 가장 오른쪽 (없으면 -1)"),
  t(E, "    //   earliest_same[c][i] = leftmost idx >= i that is c (INF if none)", "    //   earliest_same[c][i] = idx ≥ i 중 c 의 가장 왼쪽 (없으면 INF)"),
  t(E, "    //   nearest_diff[c][i]  = leftmost idx >= i that is NOT c (INF if none)", "    //   nearest_diff[c][i]  = idx ≥ i 중 c 아닌 가장 왼쪽 (없으면 INF)"),
  "    int INF = N;",
  "    vector<vector<int>> latest_same  (26, vector<int>(N, -1));",
  "    vector<vector<int>> earliest_same(26, vector<int>(N, INF));",
  "    vector<vector<int>> nearest_diff (26, vector<int>(N, INF));",
  "    for (int c = 0; c < 26; c++) {",
  "        char ch = 'a' + c;",
  "        int last = -1;",
  t(E, "        for (int i = 0; i < N; i++) {              // left->right", "        for (int i = 0; i < N; i++) {              // 왼→오"),
  "            if (s[i] == ch) last = i;",
  "            latest_same[c][i] = last;",
  "        }",
  "        int nxt_same = INF, nxt_diff = INF;",
  t(E, "        for (int i = N - 1; i >= 0; i--) {         // right->left", "        for (int i = N - 1; i >= 0; i--) {         // 오→왼"),
  "            if (s[i] == ch) nxt_same = i;",
  "            else            nxt_diff = i;",
  "            earliest_same[c][i] = nxt_same;",
  "            nearest_diff[c][i]  = nxt_diff;",
  "        }",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int c = 0; c < 26; c++) {",
  t(E, "            int i = nearest_diff[c][l];            // leftmost DIFFERENT letter", "            int i = nearest_diff[c][l];            // 가장 왼쪽 '다른 글자'"),
  "            if (i >= r) continue;",
  t(E, "            int k = latest_same[c][r];             // rightmost c", "            int k = latest_same[c][r];             // 가장 오른쪽 c"),
  "            if (k <= i) continue;",
  t(E, "            int m = (i + k) / 2;                   // parabola vertex", "            int m = (i + k) / 2;                   // 포물선 꼭짓점"),
  t(E, "            // the 2 c-candidates around the vertex — O(1) from the tables", "            // 꼭짓점 양옆 c 후보 2 개 — 두 표에서 O(1)"),
  "            int cand[2] = { latest_same[c][m], earliest_same[c][m] };",
  "            for (int t = 0; t < 2; t++) {",
  "                int j = cand[t];",
  "                if (i < j && j < k) {",
  "                    long long product = (long long)(j - i) * (k - j);",
  "                    if (product > best) best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk provider — 코드 위 '왜 이렇게?' 노트 벽 대신, 설명을 코드 줄에 붙이는 말풍선.
// (선생님 2026-07-23: "설명 줄줄이 쓰지 말고 봐야할 부분만, 필요하면 말풍선".)
// 검증본 코드(M3_FULL_*, M3_FAST_*)는 그대로 두고 표시 방식만 CodeWalk 로.
const _M3_VARS = [
  { v: "s", ko: "문자열", en: "the string" },
  { v: "j", ko: "가운데 자리", en: "middle spot" },
  { v: "left_i", ko: "왼쪽 '다른 글자'", en: "left different" },
  { v: "right_k", ko: "오른쪽 '같은 글자'", en: "right same" },
];
export function getMooin3Walk(E, lang = "py", mode = "brute") {
  if (mode === "brute") {
    if (lang === "cpp") {
      return { code: M3_FULL_CPP, vars: _M3_VARS, beats: [
        { hi: [4, 8],   bubble: t(E, "Input first — read N, Q, then the string s.", "입력부터 — N, Q 읽고 문자열 s.") },
        { hi: [10, 15], bubble: t(E, "Each query: read l, r → 0-based (l--, r--). best = -1 (long long, the product gets big).", "쿼리마다 l, r 읽고 0-based (l--, r--). best = -1 (곱이 커서 long long).") },
        { hi: [16, 16], bubble: t(E, "Pin the middle spot j — for each j we look both ways once.", "가운데 자리 j 를 하나씩 박아요 — j 마다 양쪽을 한 번씩.") },
        { hi: [17, 23], bubble: t(E, "Left: first spot with a DIFFERENT letter than s[j] = left_i (smaller i → bigger j−i).", "왼쪽: s[j] 와 '다른' 글자가 처음 나오는 자리 = left_i (i 작을수록 j−i 큼).") },
        { hi: [24, 30], bubble: t(E, "Right: last spot with the SAME letter as s[j] = right_k (bigger k → bigger k−j).", "오른쪽: s[j] 와 '같은' 글자가 마지막 자리 = right_k (k 클수록 k−j 큼).") },
        { hi: [31, 36], bubble: t(E, "If both exist, (j−left_i)×(right_k−j) — keep the max. Cast to long long so it doesn't overflow.", "둘 다 있으면 (j−left_i)×(right_k−j) — 최댓값 유지. long long 캐스팅으로 오버플로 방지.") },
        { hi: [38, 38], bubble: t(E, "Print this query's answer.", "이 쿼리의 답 출력.") },
      ] };
    }
    return { code: M3_FULL_PY(E), vars: _M3_VARS, beats: [
      { hi: [0, 1],   bubble: t(E, "Input first — read N, Q, then the string s.", "입력부터 — N, Q 읽고 문자열 s.") },
      { hi: [3, 7],   bubble: t(E, "Each query: read l, r → 0-based (l−=1, r−=1). Start best = -1.", "쿼리마다 l, r 읽고 0-based (l−=1, r−=1). best = -1 로 시작.") },
      { hi: [8, 9],   bubble: t(E, "Pin the middle spot j — for each j we look both ways once.", "가운데 자리 j 를 하나씩 박아요 — j 마다 양쪽을 한 번씩.") },
      { hi: [10, 15], bubble: t(E, "Left: first spot with a DIFFERENT letter than s[j] = left_i (smaller i → bigger j−i).", "왼쪽: s[j] 와 '다른' 글자가 처음 나오는 자리 = left_i (i 작을수록 j−i 큼).") },
      { hi: [16, 21], bubble: t(E, "Right: last spot with the SAME letter as s[j] = right_k (bigger k → bigger k−j).", "오른쪽: s[j] 와 '같은' 글자가 마지막 자리 = right_k (k 클수록 k−j 큼).") },
      { hi: [22, 25], bubble: t(E, "If both exist, (j−left_i)×(right_k−j) — keep the max.", "둘 다 있으면 (j−left_i)×(right_k−j) — 최댓값 유지.") },
      { hi: [26, 26], bubble: t(E, "Print this query's answer.", "이 쿼리의 답 출력.") },
    ] };
  }
  // mode === "fast" — O(26) per query: 3 lookup tables + parabola vertex
  if (lang === "cpp") {
    return { code: M3_FAST_CPP(E), vars: _M3_VARS, beats: [
      { hi: [5, 9],   bubble: t(E, "Read N, Q, and the string s — Q up to 30,000.", "N, Q 와 문자열 s 읽기 — 쿼리 3만 개.") },
      { hi: [11, 33], bubble: t(E, "PRECOMPUTE once, before any query: for each letter, 3 tables. Left→right fills latest_same; right→left fills earliest_same & nearest_diff. After this, each lookup is O(1).", "전처리 — 쿼리 전에 한 번만: 글자마다 표 3개. 왼→오로 latest_same, 오→왼으로 earliest_same·nearest_diff. 이러면 조회가 O(1).") },
      { hi: [35, 40], bubble: t(E, "Each query: read l, r → 0-based. best = -1.", "쿼리마다 l, r 읽고 0-based. best = -1.") },
      { hi: [41, 45], bubble: t(E, "Loop over the 26 LETTERS c (not j!). For each c, grab the leftmost 'different' i and the rightmost c = k straight from the tables.", "j 대신 글자 c 26개로 루프. c 마다 가장 왼쪽 '다른' i, 가장 오른쪽 c = k 를 표에서 바로.") },
      { hi: [46, 55], bubble: t(E, "f(j) = (j−i)(k−j) is an ∩-parabola → biggest near the midpoint m. Check just the 2 candidates around m (O(1), no binary search).", "f(j)=(j−i)(k−j) 는 위로 볼록(∩) 포물선 → 꼭짓점 m 근처가 최대. m 양옆 후보 2개만 확인 (O(1), 이분 탐색 없이).") },
      { hi: [57, 57], bubble: t(E, "Print the answer.", "답 출력.") },
    ] };
  }
  return { code: M3_FAST_PY(E), vars: _M3_VARS, beats: [
    { hi: [0, 4],   bubble: t(E, "Fast input (sys.stdin.readline) + read N, Q, s — Q up to 30,000.", "빠른 입력(sys.stdin.readline) + N, Q, s 읽기 — 쿼리 3만 개.") },
    { hi: [6, 32],  bubble: t(E, "PRECOMPUTE once, before any query: for each letter, 3 tables. Left→right fills latest_same; right→left fills earliest_same & nearest_diff. After this, each lookup is O(1).", "전처리 — 쿼리 전에 한 번만: 글자마다 표 3개. 왼→오로 latest_same, 오→왼으로 earliest_same·nearest_diff. 이러면 조회가 O(1).") },
    { hi: [34, 39], bubble: t(E, "Each query: read l, r → 0-based. best = -1.", "쿼리마다 l, r 읽고 0-based. best = -1.") },
    { hi: [40, 46], bubble: t(E, "Loop over the 26 LETTERS c (not j!). For each c, grab the leftmost 'different' i and the rightmost c = k straight from the tables.", "j 대신 글자 c 26개로 루프. c 마다 가장 왼쪽 '다른' i, 가장 오른쪽 c = k 를 표에서 바로.") },
    { hi: [47, 54], bubble: t(E, "f(j) = (j−i)(k−j) is an ∩-parabola → biggest near the midpoint m. Check just the 2 candidates around m (O(1), no binary search).", "f(j)=(j−i)(k−j) 는 위로 볼록(∩) 포물선 → 꼭짓점 m 근처가 최대. m 양옆 후보 2개만 확인 (O(1), 이분 탐색 없이).") },
    { hi: [55, 57], bubble: t(E, "Collect answers and print them all at once.", "답을 모아서 한 번에 출력.") },
  ] };
}

export function getMooin3Sections(E) {
  return [
    {
      label: t(E, "📦 1. Input + String", "📦 1. 입력 + 문자열"),
      color: A,
      py: M3_INPUT_PY, cpp: M3_INPUT_CPP,
      why: [
        t(E, "Read N, Q, then the whole string s.",
            "N, Q 와 문자열 s 읽기."),
        t(E, "Each query line: l r — both 1-INDEXED. The code converts to 0-indexed (l--, r--) before processing.",
            "각 쿼리 줄: l r — 둘 다 1-INDEXED. 코드에서 0-indexed (l--, r--) 로 변환."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip() 으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token (cpp-11 string).",
            "cin >> string 으로 공백 구분 토큰 (cpp-11 string)."),
      ],
      aside: <SampleInputAside E={E} sample={M3_SAMPLE} highlight={[0, 1]} note={t(E,
        "First two lines: \"12 5\" → N=12, Q=5. Then the string.",
        "처음 두 줄: \"12 5\" → N=12, Q=5. 그 다음 문자열.")} />,
    },
    {
      label: t(E, "🔍 2. Fix the Middle j", "🔍 2. 중간 j 고정"),
      color: "#0891b2",
      py: M3_LOOP_PY(E), cpp: M3_LOOP_CPP(E),
      why: [
        t(E, "For each middle j in [l+1, r−1], we want the BEST i to its left and BEST k to its right.",
            "각 중간 j ∈ [l+1, r−1] 에 대해, 왼쪽 최선 i 와 오른쪽 최선 k 찾기."),
        t(E, "Best i = SMALLEST index with s[i] ≠ s[j] (smaller i → bigger j−i).",
            "최선 i = s[i] ≠ s[j] 인 가장 작은 인덱스 (i 작을수록 j−i 커짐)."),
        t(E, "Best k = LARGEST index with s[k] == s[j] (bigger k → bigger k−j).",
            "최선 k = s[k] == s[j] 인 가장 큰 인덱스 (k 클수록 k−j 커짐)."),
      ],
      pyOnly: [
        t(E, "Plain for-loop with break gives the first match — uses only Python lesson 13/14 syntax.",
            "for + break 로 첫 매칭 — Python 레슨 13/14 문법만 사용."),
      ],
      cppOnly: [
        t(E, "Inner loop with break — uses only cpp-7 (loops) + cpp-11 (string indexing).",
            "for + break 내부 루프 — cpp-7 (루프) + cpp-11 (문자열 인덱싱) 만 사용."),
      ],
    },
    {
      label: t(E, "🏆 3. Update Best Product", "🏆 3. 최댓값 갱신"),
      color: "#16a34a",
      py: M3_UPDATE_PY, cpp: M3_UPDATE_CPP,
      why: [
        t(E, "If both i and k exist, compute (j − i) × (k − j) and keep the maximum.",
            "i 와 k 둘 다 존재하면 (j − i) × (k − j) 계산해 최댓값 갱신."),
        t(E, "If no valid triplet in the range, best stays −1 → print −1.",
            "범위에 유효 triplet 없으면 best 는 −1 → −1 출력."),
      ],
      cppOnly: [
        t(E, "Why long long? With N up to 10⁵, (j−i) and (k−j) can each be up to 10⁵ → product up to 10¹⁰, larger than int's max (~2·10⁹). Casting one operand to long long forces the multiplication to use long long.",
            "왜 long long? N 최대 10⁵, (j−i) 와 (k−j) 각각 최대 10⁵ → 곱 최대 10¹⁰, int 최대값 (~2·10⁹) 초과. 한 쪽을 long long 캐스팅하면 곱이 long long 으로 계산됨."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code (fix-j, O(N²))", "🎯 4. 전체 코드 (j 고정, O(N²))"),
      color: "#7c3aed",
      py: M3_FULL_PY(E), cpp: M3_FULL_CPP,
      why: [
        t(E, "All four parts wired together. Reads input, walks every j, tracks the best product.",
            "네 조각이 합쳐진 모습. 입력 읽고, 모든 j 훑고, 최고 곱 추적."),
        t(E, "Try it on the official sample first — small N, instant. Then think about big inputs.",
            "공식 샘플 먼저 시도 — N 작아서 즉시. 그 다음 큰 입력 생각."),
      ],
    },
    /* ── 5–8: appears AFTER the brute is written. Now we ask: what about big N? ── */
    {
      label: t(E, "5️⃣ What if N is big?", "5️⃣ N 이 크면 어떻게 될까?"),
      color: "#dc2626",
      // 같은 brute 코드를 다시 보여주고 — 이번엔 분석.
      py: M3_FULL_PY(E), cpp: M3_FULL_CPP,
      why: [
        t(E, "The inner two scans (left for i, right for k) walk the array — O(N) each, so per-j work is O(N).",
            "안쪽 두 스캔 (왼쪽으로 i, 오른쪽으로 k) 가 배열을 훑어요 — 각 O(N), j 마다 O(N) 일."),
        t(E, "Outer j loop runs O(N) times per query → O(N²) per query.",
            "바깥 j 루프가 쿼리당 O(N) 번 → 쿼리당 O(N²)."),
        t(E, "Q queries → total O(Q · N²). At N = 10⁵ and Q = 3·10⁴ that's ~3·10¹⁴ — way too slow.",
            "Q 쿼리 → 총 O(Q · N²). N = 10⁵, Q = 3·10⁴ 면 ~3·10¹⁴ — 너무 느려요."),
        t(E, "So small-N test cases pass, but large-N cases TLE.  The next steps (6-8) turn this into a truly fast O(26 · (N + Q)) solution.",
            "그래서 N 작은 테스트는 통과, N 큰 테스트는 TLE.  다음 단계 (6-8) 에서 진짜 빠른 O(26 · (N + Q)) 풀이로 바꿔요."),
      ],
    },
    /* ── 6️⃣ Stage A: 외곽 루프를 j → c (26 개) 로 ── */
    {
      label: t(E, "6️⃣ Group j by character c — 26 candidates instead of N",
                  "6️⃣ j 대신 글자 c 26 개로 묶기"),
      color: "#0891b2",
      py: M3_STAGE_A_PY, cpp: M3_STAGE_A_CPP,
      why: [
        t(E, "Key observation: every j with s[j] = c asks the SAME left/right scan question (find leftmost i with s[i] ≠ c, rightmost k with s[k] = c).",
            "핵심 관찰: s[j] = c 인 모든 j 가 같은 좌/우 스캔 질문을 함 (s[i] ≠ c 인 가장 왼쪽 i, s[k] = c 인 가장 오른쪽 k)."),
        t(E, "So loop the OUTER over c (just 26 letters) instead of j (N positions).  Inside each c, iterate positions_of[c] to find the best j.",
            "외곽 루프를 c (26 글자) 로 — j (N 개) 대신. c 안에서 positions_of[c] 를 돌며 best j 를 찾음."),
        t(E, "Per query still O(26·N) because we scan to find left_i / right_k each time. Conceptual win, not yet a speed win — but the next step plugs that hole.",
            "쿼리당 아직 O(26·N) — 매번 left_i / right_k 를 스캔해서. 개념 압축은 끝, 속도 압축은 다음 단계."),
      ],
    },

    /* ── 7️⃣ Stage B: lookup 표 미리 만들기 ── */
    {
      label: t(E, "7️⃣ Precompute i, k tables — O(1) lookup per query",
                  "7️⃣ i, k lookup 표 미리 만들기 — 쿼리당 O(1) 조회"),
      color: "#7c3aed",
      py: M3_STAGE_B_PY, cpp: M3_STAGE_B_CPP,
      why: [
        t(E, "Build two tables ONCE before any query: nearest_diff[c][i] (smallest idx ≥ i with s[idx] ≠ c) and latest_same[c][i] (largest idx ≤ i with s[idx] = c).",
            "쿼리 전에 한 번만: nearest_diff[c][i] (idx ≥ i 중 s[idx] ≠ c 인 가장 작은 idx) 와 latest_same[c][i] (idx ≤ i 중 s[idx] = c 인 가장 큰 idx) 표 작성."),
        t(E, "Precompute is O(26·N).  Per query, getting (left_i, right_k) for each c is now a single table lookup — no scan.",
            "Precompute O(26·N). 쿼리에선 c 마다 (left_i, right_k) 가 표 한 번 조회로 끝 — 스캔 없음."),
        t(E, "But we still iterate every position in positions_of[c] to find best j — per query O(N) total. One more leap to go.",
            "그래도 best j 를 찾으려고 positions_of[c] 를 다 도는 건 그대로 — 쿼리당 O(N). 마지막 한 걸음 남음."),
      ],
      aside: <M3InsightAside E={E} />,
    },

    /* ── 8️⃣ Stage C: 포물선 꼭짓점 + lookup 표 (이분 탐색 없음) → 최종 ── */
    {
      label: t(E, "8️⃣ Parabola vertex + lookup tables — only 2 j candidates per c",
                  "8️⃣ 포물선 꼭짓점 + lookup 표 — c 마다 후보 j 2 개만 (이분 탐색 없음)"),
      color: "#15803d",
      py: M3_FAST_PY(E), cpp: M3_FAST_CPP(E),
      why: [
        t(E, "With c fixed, i = leftmost different char and k = rightmost c are fixed too.  f(j) = (j − i)·(k − j) is an upward-convex (∩) parabola, biggest at the vertex (i + k) / 2.",
            "c 가 정해지면 i = 가장 왼쪽 다른 글자, k = 가장 오른쪽 c 도 정해짐. f(j) = (j − i)·(k − j) 는 위로 볼록(∩) 포물선 → 꼭짓점 (i + k) / 2 에서 최대."),
        t(E, "So the best j is the c nearest the vertex.  The 2 nearest c (one on each side) come STRAIGHT from the tables — latest_same[c][m] and earliest_same[c][m] — O(1), no binary search.",
            "그래서 best j 는 꼭짓점에 가장 가까운 c. 꼭짓점 양옆의 c 2 개는 표에서 바로 나와요 — latest_same[c][m] 와 earliest_same[c][m] — O(1), 이분 탐색 불필요."),
        t(E, "Per query: 26 chars × O(1) ≈ 52 ops.  Build 26·N + queries → total O(26 · (N + Q)).  Same as the official table solution (no bisect).",
            "쿼리당: 26 문자 × O(1) ≈ 52 연산. 표 만들기 26·N + 쿼리 → 총 O(26 · (N + Q)). 공식 표 solution 과 동일 (bisect 없음)."),
      ],
      pyOnly: [
        t(E, "The only new table vs Step 7 is earliest_same (leftmost c at/after i) — built in the same right-to-left pass.  No bisect, no positions_of list.",
            "Step 7 대비 새로 생긴 표는 earliest_same (i 이후 c 의 가장 왼쪽) 하나뿐 — 같은 오→왼 패스에서 함께 만듦. bisect 도, positions_of 리스트도 없음."),
      ],
      cppOnly: [
        t(E, "Only <iostream> / <vector> / <string> — no <bits/stdc++.h>, no binary search, no STL algorithm.  Just three tables and O(1) lookups.",
            "<iostream> / <vector> / <string> 만 — <bits/stdc++.h> 도, 이분 탐색도, STL algorithm 도 안 씀. 표 세 개와 O(1) 조회뿐."),
      ],
      aside: <M3PerfFastAside E={E} />,
    },
  ];
}

/* ── Asides for steps 5/6/7 ── */
const M3PerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#991b1b", marginBottom: 6 }}>
      🐌 {t(E, "Operation count (brute O(Q · N²))", "연산량 (brute O(Q · N²))")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N, Q ≤ 50</code>
      <div>{t(E, "1.25·10⁵ — instant ✓", "1.25·10⁵ — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>Q=1, N=10⁵</code>
      <div>{t(E, "10¹⁰ — TLE 🚫", "10¹⁰ — TLE 🚫")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>full N, Q</code>
      <div>{t(E, "3·10¹⁴ — TLE 🚫", "3·10¹⁴ — TLE 🚫")}</div>
    </div>
    {/* 실제 검증된 USACO 제출 결과 */}
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11 }}>
      <b>{t(E, "Actual USACO submission (verified)", "실제 USACO 제출 (검증됨)")}</b>:{" "}
      {t(E, "Python brute → 3/11 PASS · C++ brute → 4/11 PASS",
            "Python brute → 3/11 통과 · C++ brute → 4/11 통과")}
    </div>
  </div>
);

const M3PerfFastAside = ({ E }) => (
  <div style={{
    background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#14532d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
      ⚡ {t(E, "Operation count (smart)", "연산량 (smart)")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "precompute", "표 만들기")}</code>
      <div>{t(E, "26·N ≈ 2.6·10⁶ — fast ✓", "26·N ≈ 2.6·10⁶ — 빠름 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "per query", "쿼리당")}</code>
      <div>{t(E, "26 × O(1) ≈ 52 — instant ✓", "26 × O(1) ≈ 52 — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "total", "총합")}</code>
      <div>{t(E, "O(26·(N+Q)) — fits ✓", "O(26·(N+Q)) — 통과 ✓")}</div>
    </div>
  </div>
);

const M3InsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Same character → same answer", "같은 문자 → 같은 답")}
    </div>
    <div>
      {t(E,
        "If s[j] = 'b' for many j, all those j's ask the SAME left/right scan question. Compute once per character.",
        "여러 j 에서 s[j] = 'b' 이면, 그 j 들이 같은 왼/오 스캔 질문을 함. 문자마다 한 번만.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      {t(E, "Per query work: O(N²) → O(N).", "쿼리당 일: O(N²) → O(N).")}
    </div>
  </div>
);

const M3PeakAside = ({ E }) => (
  <div style={{
    background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7c2d12",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>
      📈 {t(E, "Why a parabola?", "왜 포물선?")}
    </div>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, marginBottom: 6 }}>
      f(j) = (j − i)(k − j)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;= −j² + (i+k)j − ik
    </div>
    <div style={{ marginBottom: 6 }}>
      {t(E,
        "Coefficient of j² is −1 → opens DOWN. Maximum at the vertex j = (i + k)/2.",
        "j² 계수 −1 → 위로 볼록(∩). 꼭대기(최댓값) j = (i + k)/2.")}
    </div>
    <div style={{ paddingTop: 6, borderTop: "1px dashed #fbbf24", fontSize: 11 }}>
      {t(E,
        "Constraint: s[j] = c.  The two c nearest the vertex come straight from the tables — latest_same[c][m] (left side) and earliest_same[c][m] (right side).  Just two candidates, O(1).",
        "조건: s[j] = c. 꼭짓점 양옆에서 가장 가까운 c 2 개는 표에서 바로 — latest_same[c][m] (왼쪽) 와 earliest_same[c][m] (오른쪽). 후보 2 개, O(1).")}
    </div>
  </div>
);

const M3FastAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Three pieces working together", "세 조각의 합")}
    </div>
    <div style={{ marginBottom: 4 }}>
      <b>nearest_diff / latest_same</b>{" "}
      {t(E, "→ give i (leftmost different) and k (rightmost c) in O(1) per (c, l, r).",
            "→ (c, l, r) 마다 i (가장 왼쪽 다른 글자) 와 k (가장 오른쪽 c) 를 O(1).")}
    </div>
    <div style={{ marginBottom: 4 }}>
      <b>latest_same / earliest_same</b>{" "}
      {t(E, "→ at the vertex m = (i+k)/2, give the 2 nearest c directly — O(1), no binary search.",
            "→ 꼭짓점 m = (i+k)/2 에서 가장 가까운 c 2 개를 바로 — O(1), 이분 탐색 없음.")}
    </div>
    <div>
      <b>{t(E, "parabola", "포물선")}</b>{" "}
      {t(E, "→ f(j)=(j−i)(k−j) is ∩-shaped, so those 2 candidates are all we need to check.",
            "→ f(j)=(j−i)(k−j) 는 ∩ 모양이라 그 후보 2 개만 확인하면 끝.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "Total: O(26·N) build + O(Q · 26) queries = O(26·(N+Q)). Both Python and C++ comfortable.",
            "총: O(26·N) 만들기 + O(Q · 26) 쿼리 = O(26·(N+Q)). Python 도 C++ 도 여유.")}
    </div>
  </div>
);

export function Mooin3ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
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

export function downloadMooin3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time III — Full Study Guide", "🐄 Mooin' Time III — 종합 풀이 노트");
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
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
