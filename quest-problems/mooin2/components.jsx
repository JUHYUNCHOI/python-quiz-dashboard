// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 11/11 PASS
//   C++:    11/11 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useRef, useLayoutEffect } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#ea580c";

const M2_SAMPLE = ["6", "1 2 3 4 4 4"];

/* ════════════════════════════════════════════════════════════════════
   MooinExplorer — show the array, list which moos occur.
   ════════════════════════════════════════════════════════════════════ */
const M2_PRESETS = [
  { name: "S1", a: [1, 2, 3, 4, 4, 4] },
  { name: "ABA", a: [1, 2, 1, 2, 1] },
  { name: "Repeats", a: [1, 1] },
  { name: "Mixed", a: [3, 1, 2, 1, 2, 3, 3] },
];

function findMoos(a) {
  const N = a.length;
  const lastSeen = new Map();
  const secondLast = new Map();
  const cnt = new Map();
  for (let i = 0; i < N; i++) {
    const v = a[i];
    cnt.set(v, (cnt.get(v) ?? 0) + 1);
    if (lastSeen.has(v)) secondLast.set(v, lastSeen.get(v));
    lastSeen.set(v, i);
  }
  const seen = new Set();
  const D = new Array(N + 1).fill(0);
  for (let i = 0; i < N; i++) {
    D[i + 1] = D[i] + (seen.has(a[i]) ? 0 : 1);
    seen.add(a[i]);
  }
  // For each y with cnt >= 2: list distinct x's before second_last[y]
  const moos = [];
  for (const [y, c] of cnt.entries()) {
    if (c < 2) continue;
    const p = secondLast.get(y);
    const beforeSet = new Set();
    for (let i = 0; i < p; i++) beforeSet.add(a[i]);
    for (const x of beforeSet) {
      if (x !== y) moos.push([x, y]);
    }
  }
  return moos;
}

export function MooinExplorer({ E }) {
  const [pi, setPi] = useState(0);
  const preset = M2_PRESETS[pi];
  const moos = findMoos(preset.a);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {M2_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#ffedd5" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}: [{p.a.join(", ")}]</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
        {preset.a.map((v, i) => (
          <div key={i} style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
            background: "#fff", border: `1px solid ${C.border}`, color: C.text,
          }}>{v}</div>
        ))}
      </div>

      {/* 시각만 축소 — 풀폭 배너 → 가운데 컴팩트 알약 (선생님: '뭐이리 커?'). 정답 코드 무관. */}
      <div style={{ background: A, color: "#fff", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, margin: "0 auto 10px", textAlign: "center", width: "fit-content" }}>
        {t(E, "Distinct moos: ", "서로 다른 moo: ")}<span style={{ fontSize: 15 }}>{moos.length}</span>
      </div>

      {moos.length > 0 && (
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "6px 9px", fontSize: 11, color: "#9a3412", lineHeight: 1.55, width: "fit-content", maxWidth: "100%", margin: "0 auto" }}>
          <b>{t(E, "Moos that occur:", "발생하는 moo:")}</b><br/>
          {moos.map(([x, y], i) => (
            <code key={i} style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, marginRight: 6, fontFamily: "'JetBrains Mono',monospace" }}>
              ({x}, {y}, {y})
            </code>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MooinDeepAudit — single-step trace through a = [1, 2, 3, 4, 4, 4].
   Shows live count[], last_seen[], second_last[], and D[] after each
   index — turning the dense Ch1 walkthrough into a button-driven
   "see it happen" panel. Matches the Ch1 sample I/O and orange theme.
   ════════════════════════════════════════════════════════════════════ */
const M2_AUDIT_A = [3, 1, 2, 1, 2, 3, 3];   // CountTrace 와 같은 '섞인 예' 로 통일 (선생님 2026-06-19)

// 한 칸(변수)씩 갱신 + 각각 말풍선 (선생님 2026-06-19: '하나씩 다 해줘'). 인덱스마다
// count → (반복이면) second_last → last_seen → D 순으로 sub-step 을 쪼개고, 각 sub-step 은
// 그 시점의 부분 상태 + '봐야 할 칸(focus)' + 전용 설명을 담는다.
function buildAuditTrace(a) {
  const N = a.length;
  const trace = [];
  const count = {}, lastSeen = {}, secondLast = {}, seen = new Set();
  const D = [0];
  const snap = (extra) => ({ count: { ...count }, lastSeen: { ...lastSeen }, secondLast: { ...secondLast }, D: [...D], ...extra });

  trace.push(snap({
    i: -1, v: null, focus: null,
    note_en: "We haven't looked at any number yet, so all three notes are empty. Let's go through the array from left to right, one cell at a time.",
    note_ko: "아직 아무 숫자도 안 봤어요. 그래서 메모 세 칸이 다 비어 있죠. 이제 배열을 왼쪽부터 한 칸씩 볼게요.",
  }));

  for (let i = 0; i < N; i++) {
    const v = a[i];
    const prevLast = lastSeen[v];          // second_last 에 쓸 '이전 마지막 본 자리'

    // 1) 몇 번 나왔나 (count)
    count[v] = (count[v] ?? 0) + 1;
    const c = count[v];
    trace.push(snap({
      i, v, focus: { table: "count", col: v },
      note_en: c >= 2
        ? `Spot ${i} is ${v} again! Add one to "times seen" for ${v}, making it ${c}. Now ${v} has shown up 2+ times, so a ${v}, ${v} pair is possible.`
        : `Spot ${i} holds ${v}. It's the first time we see ${v}, so write 1 in the "times seen" note for ${v}.`,
      note_ko: c >= 2
        ? `${i}번 칸도 ${v} 네요! ${v}의 '몇 번 나왔나'에 1 을 더해서 ${c}로 만들어요. 이제 ${v}가 2번 넘게 나왔으니, ${v}, ${v} 짝을 만들 수 있어요.`
        : `${i}번 칸엔 ${v}가 있어요. ${v}를 처음 봤으니, ${v}의 '몇 번 나왔나'에 1 이라고 적어요.`,
    }));

    // 2) 짝 시작 자리 (second_last) — 반복일 때만, last_seen 갱신 '전' 의 값 사용
    if (c >= 2) {
      secondLast[v] = prevLast;
      trace.push(snap({
        i, v, focus: { table: "second_last", col: v },
        note_en: `We saw ${v} a moment ago, back at spot ${prevLast}. Save that spot as "where ${v}'s pair begins". Later we'll count how many different numbers came before it.`,
        note_ko: `${v}는 방금 전 ${prevLast}번 칸에서 봤었죠. 그 자리를 '${v}의 짝이 시작되는 곳'으로 적어둬요. 이따 그 앞에 서로 다른 숫자가 몇 종류 있었는지 셀 거예요.`,
      }));
    }

    // 3) 마지막 본 자리 (last_seen) 갱신
    lastSeen[v] = i;
    trace.push(snap({
      i, v, focus: { table: "last_seen", col: v },
      note_en: `Now change "${v}'s last spot" to here (${i}). If ${v} appears again later, this is the value we'll use.`,
      note_ko: `그리고 '${v}를 마지막으로 본 곳'을 지금 칸(${i})으로 바꿔 적어요. 나중에 ${v}가 또 나오면 이 값을 쓸 거예요.`,
    }));

    // 4) 앞 종류 수 (D)
    const wasNew = !seen.has(v);
    if (wasNew) seen.add(v);
    D.push(D[i] + (wasNew ? 1 : 0));
    trace.push(snap({
      i, v, focus: { strip: "D", k: i + 1 },
      note_en: wasNew
        ? `${v} is a number we hadn't seen before, so the count of "different numbers so far" goes up by one, to ${D[i + 1]}.`
        : `We've already seen ${v} before, so the count of "different numbers so far" stays the same: ${D[i + 1]}.`,
      note_ko: wasNew
        ? `${v}는 지금까지 안 나온 새 숫자예요. 그래서 '여기까지 나온 숫자 종류 수'가 하나 늘어서 ${D[i + 1]}가 돼요.`
        : `${v}는 아까 이미 본 숫자라, '여기까지 나온 숫자 종류 수'는 그대로 ${D[i + 1]}예요.`,
    }));
  }

  // ── 메모로 답 구하기 (payoff) ──
  const reps = Object.keys(count).map(Number).filter(y => count[y] >= 2).sort((x, y) => x - y);

  // 오른쪽에 누적해서 적어 둘 '계산 기록' (선생님 2026-06-19: 계산된 내용 오른쪽에 적어둠)
  const done = [];

  // (1) 먼저 2번 이상 나온 숫자부터 확인 (선생님 2026-06-19: payoff 전에 누가 후보인지 짚기)
  trace.push(snap({
    i: N - 1, v: null, focus: { table: "count", col: reps[0] }, markCols: reps, phase: "use", ans: 0, ledger: [],
    note_en: `The notes are done! First, which numbers can make a moo? In "times seen", the numbers with 2 or more (the colored cells) are ${reps.join(", ")}. We'll go through just these, one at a time.`,
    note_ko: `메모를 다 적었어요! 먼저 어떤 숫자가 moo를 만들 수 있는지 봐요. '몇 번 나왔나'에서 2번 이상인 숫자(색칠된 칸)는 ${reps.join(", ")}예요. 이 숫자들만 하나씩 볼게요.`,
  }));

  // (2) 각 후보마다 한 동작씩: 배열에서 짝 찾기 → 짝 시작 자리 → D 읽기 →(빼기)→ 더하기
  //     (선생님 2026-06-19: '짝 구하고, 계산하고, 다음 짝 찾고 — 스텝이 훨씬 많아야')
  let ans = 0;
  for (const y of reps) {
    const p = secondLast[y];
    const lastIdx = lastSeen[y];                    // 같은 숫자 짝의 뒤쪽 자리
    const d = D[p];
    const sub = count[y] >= 3;
    const contrib = d - (sub ? 1 : 0);
    const pair = [p, lastIdx];

    // (a) 배열에서 짝 찾기
    trace.push(snap({
      i: N - 1, v: y, phase: "use", ans, focus: null, arrPair: pair, ledger: done.slice(),
      note_en: `Now ${y}. In the array, here are its two ${y}s (orange) — a ${y}, ${y} pair. Let's count how many moos this pair makes.`,
      note_ko: `이제 ${y} 차례예요. 배열에서 ${y}가 있는 두 칸을 찾았어요 (주황 칸) — ${y}, ${y} 짝이죠. 이 짝으로 moo가 몇 개 나오는지 세어 볼게요.`,
    }));
    // (b) 짝 시작 자리 (앞쪽 y) 확인
    trace.push(snap({
      i: N - 1, v: y, phase: "use", ans, focus: { table: "second_last", col: y }, arrPair: pair, ledger: done.slice(),
      note_en: `The front ${y} of the pair is at spot ${p}. The "pair-start" note says ${p} too. A moo's front number (x) has to come from BEFORE this spot.`,
      note_ko: `짝의 앞쪽 ${y}는 ${p}번 칸에 있어요. '짝 시작 자리' 메모에도 ${p}라고 적혀 있죠. moo의 앞 숫자(x)는 이 자리보다 '앞'에서 와야 해요.`,
    }));
    // (c) D 읽기 — 그 앞 종류 수
    trace.push(snap({
      i: N - 1, v: y, phase: "use", ans, focus: { table: "second_last", col: y }, dLink: p, arrPair: pair, ledger: done.slice(),
      note_en: `How many different numbers came before spot ${p}? The D note already has the answer: ${d} (blue cell). So there are ${d} candidates for the front number.`,
      note_ko: `${p}번 칸 앞에는 서로 다른 숫자가 몇 종류였을까요? D 메모에 이미 적혀 있어요 — ${d}종류예요 (파란 칸). 그러니 앞 숫자가 될 후보가 ${d}개네요.`,
    }));
    // (d) 빼기 (y 자신이 앞에 껴 있는 경우)
    if (sub) {
      trace.push(snap({
        i: N - 1, v: y, phase: "use", ans, focus: { table: "second_last", col: y }, dLink: p, arrPair: pair, ledger: done.slice(),
        note_en: `But ${y} itself is one of those ${d} numbers, and the front number can't be ${y}. So drop one: that leaves ${contrib}.`,
        note_ko: `그런데 그 ${d}종류 안에 ${y} 자신도 있어요. 앞 숫자가 ${y}면 안 되니까 하나 빼요 — ${contrib}개가 남아요.`,
      }));
    }
    // (e) 더하기 — 오른쪽 기록에 한 줄 추가 (계산 과정 d·sub 도 함께 저장)
    ans += contrib;
    done.push({ y, d, sub, contrib });
    trace.push(snap({
      i: N - 1, v: y, phase: "use", ans, focus: { table: "second_last", col: y }, arrPair: pair, ledger: done.slice(), ledgerNew: y,
      note_en: `So ${y} makes ${contrib} moos. Write it on the right and add to the total → ${ans}.`,
      note_ko: `그래서 ${y}로 만드는 moo는 ${contrib}개. 오른쪽에 적고, 답에 더하면 ${ans}이에요.`,
    }));
  }
  trace.push(snap({
    i: N - 1, v: null, focus: null, phase: "use", ans, ledger: done.slice(), ledgerSum: true,
    note_en: `Now add up everything on the right: ${done.map(p => p.contrib).join(" + ")} = ${ans}. There are ${ans} different moos in all — that's the answer!`,
    note_ko: `이제 오른쪽에 적은 걸 다 더해요: ${done.map(p => p.contrib).join(" + ")} = ${ans}개. 서로 다른 moo는 모두 ${ans}개 — 이게 답이에요!`,
  }));
  return trace;
}

const M2_AUDIT_TRACE = buildAuditTrace(M2_AUDIT_A);

function tableRow(plainLabel, codeLabel, dict, tableKey, focus, cellRef, keys, markCols) {
  const focusCol = focus && focus.table === tableKey ? focus.col : null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", minHeight: 40 }}>
      <div style={{ width: 116, lineHeight: 1.25, flexShrink: 0 }}>
        <div style={{ fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif", color: "#9a3412", fontWeight: 800, fontSize: 11.5, wordBreak: "keep-all" }}>{plainLabel}</div>
        <div style={{ fontSize: 9.5, color: C.dim, fontWeight: 700 }}>{codeLabel}</div>
      </div>
      {keys.length === 0 && (
        <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif" }}>·</div>
      )}
      {keys.map(k => {
        const has = dict[k] != null;
        const isHi = k === focusCol;
        const isMark = !isHi && markCols && markCols.includes(k);   // 2번 이상 후보 (초록)
        return (
          <div key={k} ref={isHi ? cellRef : null} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            border: `2px solid ${isHi ? "#ea580c" : isMark ? "#16a34a" : "#fde2c4"}`,
            background: isHi ? "#ffedd5" : isMark ? "#ecfdf5" : "#fff",
            borderRadius: 6, padding: "2px 6px", minWidth: 38,
            boxShadow: isHi ? "0 0 0 3px rgba(234,88,12,0.18)" : isMark ? "0 0 0 3px rgba(22,163,74,0.15)" : "none",
            transition: "background .15s, border-color .15s, box-shadow .15s",
          }}>
            <div style={{ fontSize: 10, color: "#9a3412" }}>{k}</div>
            <div style={{ fontWeight: 700, color: has ? C.text : "#cbd5e1" }}>
              {has ? String(dict[k]) : "·"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MooinDeepAudit({ E }) {
  const { idx, safe, setIdx, total } = useTraceStep(M2_AUDIT_TRACE.length);
  const step = M2_AUDIT_TRACE[safe];
  const note = E ? step.note_en : step.note_ko;
  const focus = step.focus;                       // { table, col } | { strip:"D", k } | null

  // 말풍선이 가리킬 배열 칸: 짝 찾기 단계면 짝의 앞 칸, 그 외 focus 없는 단계는 보이는 칸
  // (화면 밖 마지막 칸을 가리키면 꼬리가 엉뚱해짐 — 선생님 2026-06-19)
  const arrTargetI = !focus
    ? (step.arrPair ? step.arrPair[0] : (step.i < 0 ? 0 : Math.floor(M2_AUDIT_A.length / 2)))
    : -1;
  const dTargetK = focus && focus.strip === "D" ? focus.k : -1;  // D 채우는 단계 (주황)
  const dLink = step.dLink != null ? step.dLink : -1;            // payoff: 읽는 D 칸 (파랑)

  // 표의 열 = '지금까지 발견된 값'만 (선생님 2026-06-19: 최대 숫자를 미리 아는 게 아니라,
  // 새 숫자가 나올 때마다 칸이 하나씩 생기는 거여야 함). count 에 있는 값 = 본 적 있는 값.
  const cols = Object.keys(step.count).map(Number).sort((x, y) => x - y);

  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const bubbleRef = useRef(null);
  const [pos, setPos] = useState({ side: "top", left: 0, top: 0, tail: 24, ready: false });

  // 봐야 할 칸을 측정 → 말풍선을 그 칸 '오른쪽 빈 공간'에 두고 왼쪽으로 꼬리 (표를 안 가림).
  // 오른쪽 공간이 부족하면 칸 위로 올리고 아래로 꼬리 (선생님 2026-06-19: '말풍선이 다 가린다').
  useLayoutEffect(() => {
    const tc = targetRef.current, cont = containerRef.current, bub = bubbleRef.current;
    if (!tc || !cont || !bub) return;
    const cr = cont.getBoundingClientRect();
    const tr = tc.getBoundingClientRect();
    const br = bub.getBoundingClientRect();
    const cellRight = tr.right - cr.left;
    const cellCx = tr.left + tr.width / 2 - cr.left;
    const cellCy = tr.top + tr.height / 2 - cr.top;
    const cellTop = tr.top - cr.top;
    // payoff 단계엔 오른쪽에 '계산 기록' 패널이 있으니 그만큼 폭을 비워둠
    const availW = (step.phase === "use" && step.ledger) ? cr.width - 168 : cr.width;
    if (cellRight + 14 + br.width <= availW) {
      const left = cellRight + 14;
      let top = cellCy - br.height / 2;
      top = Math.max(0, Math.min(top, Math.max(0, cr.height - br.height)));
      const tail = Math.max(10, Math.min(cellCy - top - 8, br.height - 22));
      setPos({ side: "left", left, top, tail, ready: true });
    } else {
      let left = cellCx - br.width / 2;
      left = Math.max(2, Math.min(left, availW - br.width - 2));
      const top = Math.max(0, cellTop - br.height - 12);
      const tail = Math.max(12, Math.min(cellCx - left - 8, br.width - 24));
      setPos({ side: "top", left, top, tail, ready: true });
    }
  }, [safe, E]);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", letterSpacing: 0.3 }}>
          🗂️ {t(E, "The variables the code uses — filled in live", "코드가 쓰는 변수(메모) 채우기")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "One change at a time. A new column appears each time we meet a new number.", "한 칸씩 채워요. 새 숫자가 처음 나올 때마다 그 숫자의 칸이 하나 생겨요.")}
        </div>
      </div>

      <div ref={containerRef} style={{ position: "relative", paddingTop: 8 }}>
        {/* 움직이는 말풍선 — 봐야 할 칸 옆(또는 위)으로 이동, 꼬리가 그 칸을 가리킴 */}
        <div ref={bubbleRef} style={{
          position: "absolute", left: pos.left, top: pos.top, maxWidth: 290, zIndex: 5,
          background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 14,
          padding: "10px 13px", fontSize: 12.5, color: "#92400e", lineHeight: 1.55,
          display: "flex", gap: 7, wordBreak: "keep-all", overflowWrap: "anywhere",
          boxShadow: "0 5px 16px rgba(0,0,0,0.16)",
          opacity: pos.ready ? 1 : 0, transition: "left .28s ease, top .28s ease, opacity .15s",
        }}>
          <span style={{ fontSize: 15, flexShrink: 0 }}>💬</span>
          <span>{note}</span>
          {pos.side === "left" ? (
            <>
              <div style={{ position: "absolute", left: -9, top: pos.tail, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderRight: "9px solid #fbbf24" }} />
              <div style={{ position: "absolute", left: -7, top: pos.tail + 1, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "8px solid #fffbeb" }} />
            </>
          ) : (
            <>
              <div style={{ position: "absolute", bottom: -9, left: pos.tail, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid #fbbf24" }} />
              <div style={{ position: "absolute", bottom: -7, left: pos.tail + 1, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #fffbeb" }} />
            </>
          )}
        </div>

        {/* 오른쪽 계산 기록 (payoff) — 숫자마다 만든 moo 개수를 적어 두고 합산 */}
        {step.phase === "use" && step.ledger && (
          <div style={{ position: "absolute", top: 0, right: 0, width: 150, zIndex: 4, background: "#fffdf7", border: "1.5px solid #fdba74", borderRadius: 10, padding: "8px 10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#9a3412", marginBottom: 5, fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif" }}>
              🧮 {t(E, "moo tally", "계산 기록")}
            </div>
            {step.ledger.length === 0 && (
              <div style={{ fontSize: 11, color: C.dim, fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif" }}>{t(E, "(filling in…)", "(채우는 중…)")}</div>
            )}
            {step.ledger.map(({ y, d, sub, contrib }, li) => {
              const isNew = step.ledgerNew === y;
              return (
                <div key={li} style={{ padding: "3px 0", borderTop: li > 0 ? "1px dashed #fde2c4" : "none" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
                    color: isNew ? "#15803d" : C.text, fontWeight: isNew ? 800 : 700,
                  }}>
                    <span>{y} {t(E, "→ moo", "→ moo")}</span><span>{contrib}{t(E, "", "개")}</span>
                  </div>
                  <div style={{ fontSize: 9.5, color: isNew ? "#16a34a" : C.dim, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>
                    {t(E, `kinds ${d}${sub ? " − 1" : ""}`, `앞 ${d}종류${sub ? " − 1" : ""}`)}
                  </div>
                </div>
              );
            })}
            {step.ledger.length > 0 && (
              <div style={{ borderTop: "1.5px solid #fdba74", marginTop: 5, paddingTop: 5, display: "flex", justifyContent: "space-between", alignItems: "center", color: A, fontWeight: 800 }}>
                <span style={{ fontSize: 12, fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif" }}>{t(E, "total", "합")}</span>
                <span style={{ fontSize: step.ledgerSum ? 18 : 14, fontFamily: "'JetBrains Mono',monospace" }}>{step.ans}</span>
              </div>
            )}
          </div>
        )}

        {/* array with cursor */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 10 }}>
          {M2_AUDIT_A.map((v, i) => {
            const pairHi = step.arrPair && step.arrPair.includes(i);   // payoff: 지금 보는 짝 (주황)
            const isCur = step.i === i && step.phase !== "use";        // 채우기 단계 커서 (payoff 땐 끔)
            const past = step.i >= 0 && i <= step.i;
            const hot = pairHi || isCur;
            return (
              <div key={i} ref={i === arrTargetI ? targetRef : null} style={{
                width: 36, height: 44, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: hot ? "#ea580c" : past ? "#ffedd5" : "#fff",
                color: hot ? "#fff" : C.text,
                border: `2px solid ${hot ? "#ea580c" : past ? "#fdba74" : C.border}`,
                boxShadow: pairHi ? "0 0 0 3px rgba(234,88,12,0.18)" : "none",
                transition: "background .15s, border-color .15s, box-shadow .15s",
              }}>
                <div style={{ fontSize: 9, opacity: 0.85 }}>i={i}</div>
                <div style={{ fontSize: 14 }}>{v}</div>
              </div>
            );
          })}
        </div>

        {/* state tables — 이번 단계에 해당하는 한 칸만 강조 + 그 칸에 ref */}
        <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: 10, marginBottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {tableRow(t(E, "times seen", "몇 번 나왔나"), "count", step.count, "count", focus, targetRef, cols, step.markCols)}
          {tableRow(t(E, "last spot (helper)", "마지막 본 자리 (도우미)"), "last_seen", step.lastSeen, "last_seen", focus, targetRef, cols)}
          {tableRow(t(E, "pair-start spot", "짝 시작 자리"), "second_last", step.secondLast, "second_last", focus, targetRef, cols)}
        </div>

        {/* D[] strip */}
        <div style={{ background: "#fff", border: "1.5px solid #fdba74", borderRadius: 10, padding: "8px 10px" }}>
          <div style={{ fontSize: 11.5, color: "#9a3412", fontWeight: 800, marginBottom: 4, fontFamily: "-apple-system, 'Apple SD Gothic Neo', sans-serif" }}>
            {t(E, "kinds before spot k", "앞 종류 수")} <span style={{ fontWeight: 700, color: C.dim, fontSize: 10 }}>D[k] — {t(E, "different values before spot k", "자리 k 앞에 서로 다른 값 몇 개")}</span>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace" }}>
            {step.D.map((d, k) => {
              const isHi = k === dTargetK;            // 채우는 단계 (주황)
              const isRead = !isHi && k === dLink;    // payoff 에서 읽는 칸 (파랑)
              return (
                <div key={k} ref={isHi ? targetRef : null} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  border: `2px solid ${isHi ? "#ea580c" : isRead ? "#2563eb" : "#fde2c4"}`,
                  background: isHi ? "#ffedd5" : isRead ? "#eff6ff" : "#fff",
                  borderRadius: 6, padding: "2px 6px", minWidth: 36,
                  boxShadow: isHi ? "0 0 0 3px rgba(234,88,12,0.18)" : isRead ? "0 0 0 3px rgba(37,99,235,0.15)" : "none",
                  transition: "background .15s, border-color .15s, box-shadow .15s",
                }}>
                  <div style={{ fontSize: 9, color: "#9a3412" }}>k={k}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* (누적 답은 오른쪽 '계산 기록' 패널의 '합' 으로 표시 — 별도 칩 제거) */}

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}

export function Mooin2Sim({ E }) { return <MooinExplorer E={E} />; }
export function Mooin2Runner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 4 sections.
   ════════════════════════════════════════════════════════════════════ */

const M2_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
];
const M2_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> a[i];",
  "    }",
];

// 한글 모드면 주석만 한글로 (선생님 2026-06-19: '한글 코드는 한글 주석'). 코드 줄은
// USACO 검증본 그대로 — 주석은 실행에 영향 없음.
const M2_S2_PY = (E) => [
  t(E, "# count[v] = number of times v appears", "# count[v] = 값 v 가 나온 횟수"),
  t(E, "# second_last[v] = index of the SECOND-TO-LAST occurrence of v", "# second_last[v] = v 가 '끝에서 두 번째'로 나온 자리"),
  t(E, "#                  (only meaningful if count[v] >= 2)", "#                  (count[v] >= 2 일 때만 의미 있음)"),
  "last_seen = [-1] * (N + 2)",
  "second_last = [-1] * (N + 2)",
  "count = [0] * (N + 2)",
  "for i in range(N):",
  "    v = a[i]",
  "    count[v] += 1",
  "    if last_seen[v] != -1:",
  "        second_last[v] = last_seen[v]",
  "    last_seen[v] = i",
];
const M2_S2_CPP = [
  "    vector<int> last_seen(N + 2, -1);",
  "    vector<int> second_last(N + 2, -1);",
  "    vector<int> count(N + 2, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        int v = a[i];",
  "        count[v]++;",
  "        if (last_seen[v] != -1) {",
  "            second_last[v] = last_seen[v];",
  "        }",
  "        last_seen[v] = i;",
  "    }",
];

const M2_S3_PY = (E) => [
  t(E, "# D[k] = number of distinct values in a[0..k-1]", "# D[k] = a[0..k-1] 안의 서로 다른 값 개수"),
  t(E, "# Walk left-to-right, marking each new value.", "# 왼쪽→오른쪽으로 훑으며, 새 값이 나올 때마다 표시."),
  "seen = [False] * (N + 2)",
  "D = [0] * (N + 1)",
  "for i in range(N):",
  "    D[i + 1] = D[i] + (0 if seen[a[i]] else 1)",
  "    seen[a[i]] = True",
];
const M2_S3_CPP = [
  "    vector<bool> seen(N + 2, false);",
  "    vector<int> D(N + 1, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        D[i + 1] = D[i] + (seen[a[i]] ? 0 : 1);",
  "        seen[a[i]] = true;",
  "    }",
];

const M2_FULL_PY = (E) => [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
  "",
  t(E, "# count + second-to-last position", "# 값별 count + 끝에서 두 번째 위치"),
  "last_seen = [-1] * (N + 2)",
  "second_last = [-1] * (N + 2)",
  "count = [0] * (N + 2)",
  "for i in range(N):",
  "    v = a[i]",
  "    count[v] += 1",
  "    if last_seen[v] != -1:",
  "        second_last[v] = last_seen[v]",
  "    last_seen[v] = i",
  "",
  t(E, "# Prefix distinct count", "# 앞쪽 서로 다른 값 개수 (D)"),
  "seen = [False] * (N + 2)",
  "D = [0] * (N + 1)",
  "for i in range(N):",
  "    D[i + 1] = D[i] + (0 if seen[a[i]] else 1)",
  "    seen[a[i]] = True",
  "",
  t(E, "# For each y with count >= 2:", "# count >= 2 인 각 y 에 대해:"),
  t(E, "#   second_last[y] is where j sits (the (count-1)-th occurrence).", "#   second_last[y] = j 의 자리 ((count-1) 번째 등장)."),
  t(E, "#   distinct x's allowed: positions [0, second_last[y] - 1] → D[second_last[y]] values.", "#   가능한 x 종류: 자리 [0, second_last[y] - 1] → D[second_last[y]] 개."),
  t(E, "#   But y itself appears in those positions iff there are >=2 occurrences before", "#   단, count[y] >= 3 이면 그 구간에 y 자신도 들어 있음"),
  t(E, "#   second_last, i.e., count[y] >= 3. Subtract 1 in that case.", "#   (second_last 앞에 y 가 한 번 더). 그땐 1 을 빼줌."),
  "ans = 0",
  "for y in range(1, N + 2):",
  "    if count[y] >= 2:",
  "        p = second_last[y]",
  "        d = D[p]",
  "        if count[y] >= 3:",
  "            d -= 1",
  "        ans += d",
  "",
  "print(ans)",
];
const M2_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> a[i];",
  "    }",
  "",
  "    vector<int> last_seen(N + 2, -1);",
  "    vector<int> second_last(N + 2, -1);",
  "    vector<int> count(N + 2, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        int v = a[i];",
  "        count[v]++;",
  "        if (last_seen[v] != -1) {",
  "            second_last[v] = last_seen[v];",
  "        }",
  "        last_seen[v] = i;",
  "    }",
  "",
  "    vector<bool> seen(N + 2, false);",
  "    vector<int> D(N + 1, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        D[i + 1] = D[i] + (seen[a[i]] ? 0 : 1);",
  "        seen[a[i]] = true;",
  "    }",
  "",
  "    long long ans = 0;",
  "    for (int y = 1; y <= N + 1; y++) {",
  "        if (count[y] >= 2) {",
  "            int p = second_last[y];",
  "            int d = D[p];",
  "            if (count[y] >= 3) {",
  "                d -= 1;",
  "            }",
  "            ans += d;",
  "        }",
  "    }",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

export function getMooin2Sections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N and array a", "1️⃣ N 과 배열 a 읽기"),
      color: A,
      py: M2_S1_PY, cpp: M2_S1_CPP,
      why: [
        t(E, "Read N (length) then N integers into a.",
            "N (길이) 읽고, N 개 정수를 a 로."),
      ],
      aside: <SampleInputAside E={E} sample={M2_SAMPLE} highlight={[0, 1]} note={t(E,
        "Two lines: \"6\" (N=6), then \"1 2 3 4 4 4\".",
        "두 줄: \"6\" (N=6), 그 다음 \"1 2 3 4 4 4\".")} />,
    },
    {
      label: t(E, "2️⃣ count + second-to-last position per value", "2️⃣ 값별 count + 끝에서 두 번째 위치"),
      color: "#0891b2",
      py: M2_S2_PY(E), cpp: M2_S2_CPP,
      why: [
        t(E, "count[v] tells us if v can be the moo's repeated value (need ≥ 2).",
            "count[v] 가 ≥ 2 여야 v 가 moo 반복값이 될 수 있음."),
        t(E, "second_last[v] = position of v's (count-1)-th occurrence — the LATEST possible j position with another v after it.",
            "second_last[v] = v 의 (count-1) 번째 위치 — 그 뒤에 또 v 가 있는 가장 늦은 j 위치."),
        t(E, "Update strategy: as we scan, remember last_seen[v]; when we see v again, that previous last_seen becomes the new second_last.",
            "갱신: 훑으면서 last_seen[v] 를 기억하고, v 를 또 만나면 이전 last_seen 이 새 second_last."),
      ],
    },
    {
      label: t(E, "3️⃣ Prefix distinct count", "3️⃣ prefix 서로 다른 값 수"),
      color: "#16a34a",
      py: M2_S3_PY(E), cpp: M2_S3_CPP,
      why: [
        t(E, "D[k] = number of DISTINCT values in a[0..k-1].",
            "D[k] = a[0..k-1] 의 서로 다른 값 수."),
        t(E, "Built in one pass: increment when we see a value for the first time.",
            "한 번 패스: 처음 보는 값일 때만 증가."),
        t(E, "We'll use D[second_last[y]] = number of distinct x values that could appear before j.",
            "D[second_last[y]] = j 앞에 나타날 수 있는 서로 다른 x 값 수.")
      ],
    },
    {
      label: t(E, "4️⃣ Sum contributions — full code", "4️⃣ 기여 합산 — 전체 코드"),
      color: "#dc2626",
      py: M2_FULL_PY(E), cpp: M2_FULL_CPP,
      why: [
        t(E, "For each y with count[y] ≥ 2: D[second_last[y]] gives distinct values appearing before j.",
            "count[y] ≥ 2 인 y 마다: D[second_last[y]] 가 j 앞 서로 다른 값 수."),
        t(E, "x must differ from y. y itself appears before j iff count[y] ≥ 3 (then earlier copies of y are in [0, second_last[y]-1]). Subtract 1 in that case.",
            "x 는 y 와 달라야. count[y] ≥ 3 일 때만 y 가 [0, second_last[y]-1] 에도 등장 (더 이전 복사본). 그땐 1 빼기."),
        t(E, "Total: O(N). Even at N = 10⁶ this is fast.",
            "총: O(N). N = 10⁶ 도 빠름."),
        t(E, "C++ uses long long for ans because N(N-1) can exceed 2³¹.",
            "C++ 는 long long — N(N-1) 이 2³¹ 초과 가능."),
      ],
    },
  ];
}

export function Mooin2ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* PDF helpers */
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

export function downloadMooin2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time II — Full Study Guide", "🐄 Mooin' Time II — 종합 풀이 노트");
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
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>${t(E, "Problem", "문제")}</h2>
<div class="why">
  <b>🐄 ${t(E, "What's a moo?", "moo 란?")}</b>
  <p>${t(E, "A <b>moo</b> is three numbers (x, y, y): the last two are EQUAL, the first is DIFFERENT. It <b>occurs</b> in the array if you can pick those three left-to-right in order — gaps are allowed (a subsequence).", "<b>moo</b> 는 숫자 3개 (x, y, y): 뒤 둘은 같고 첫째는 다름. 그 셋을 왼→오 순서로 고를 수 있으면(사이 건너뜀 OK = 부분수열) 배열에서 <b>발생</b>.")}</p>
  <p>${t(E, "Count the number of <b>DISTINCT</b> moos — i.e. distinct (x, y) pairs.", "<b>서로 다른</b> moo 개수 — 즉 서로 다른 (x, y) 쌍 — 를 센다.")}</p>
  <p><b>${t(E, "Input", "입력")}:</b> ${t(E, "line 1 = N; line 2 = N integers a₁ … a_N.", "1줄 = N; 2줄 = 정수 N 개 a₁ … a_N.")}</p>
  <p><b>${t(E, "Constraints", "제약")}:</b> 1 ≤ N ≤ 10⁶, 1 ≤ aᵢ ≤ N ${t(E, "(answer can be big — use 64-bit in C++).", "(답이 클 수 있음 — C++ 는 64-bit).")}</p>
</div>
<h3>${t(E, "Sample", "샘플")}</h3>
<pre>${t(E, "input", "입력")}:
6
1 2 3 4 4 4

${t(E, "output", "출력")}: 3</pre>
<div class="why">${t(E, "The 3 distinct moos are (1,4,4), (2,4,4), (3,4,4) — all use the (4,4) pair, with three different x's.", "서로 다른 moo 3개는 (1,4,4), (2,4,4), (3,4,4) — 모두 (4,4) 짝을 쓰고 x 만 셋.")}</div>

<h2>${t(E, "First idea — and why it's too slow", "첫 아이디어 — 왜 너무 느린가")}</h2>
<div class="why">
  <p>${t(E, "Obvious approach: try every triple i &lt; j &lt; k. If a[j] = a[k] and a[i] ≠ a[j], add (a[i], a[j]) to a set. The set's final size is the answer (the set kills duplicates).", "뻔한 방법: 모든 삼중 i &lt; j &lt; k 시도. a[j] = a[k] 이고 a[i] ≠ a[j] 면 (a[i], a[j]) 를 집합에 넣기. 집합의 최종 크기가 답 (집합이 중복 제거).")}</p>
  <p>${t(E, "But that's ≈ N³ ÷ 6 work. N = 10⁶ → ~1.7×10¹⁷ steps → about <b>30 YEARS</b> at a billion/sec. The limit is ~2 seconds. We need O(N).", "하지만 ≈ N³ ÷ 6. N = 10⁶ → ~1.7×10¹⁷ → 초당 10억 번 해도 약 <b>30년</b>. 제한 ~2초. O(N) 이 필요.")}</p>
</div>

<h2>${t(E, "The fast idea — O(N)", "빠른 아이디어 — O(N)")}</h2>
<div class="why">
  <p>${t(E, "For each value y that appears at least twice, let <b>p = the second-to-last position of y</b> (the latest j that still has another y after it). Every DISTINCT value before p can be the x. So add <b>D[p]</b>, where D[k] = number of distinct values in a[0..k-1].", "2번 이상 나오는 각 y 에 대해 <b>p = y 의 끝에서 두 번째 위치</b> (뒤에 또 y 가 있는 가장 늦은 j). p 앞의 서로 다른 값은 모두 x 가 될 수 있음. 그래서 <b>D[p]</b> 더하기 (D[k] = a[0..k-1] 의 서로 다른 값 수).")}</p>
  <p><b>⚠️ ${t(E, "Tricky bit", "함정")}:</b> ${t(E, "x must differ from y. y itself appears before p exactly when count[y] ≥ 3 — subtract 1 in that case.", "x 는 y 와 달라야. count[y] ≥ 3 일 때만 y 가 p 앞에 등장 — 그땐 1 빼기.")}</p>
  <p>${t(E, "Sample trace: y = 4, p = 4, D[4] = 4 (values 1,2,3,4), count[4] = 3 → 4 − 1 = 3. Answer = 3. ✓", "샘플 추적: y = 4, p = 4, D[4] = 4 (값 1,2,3,4), count[4] = 3 → 4 − 1 = 3. 답 = 3. ✓")}</p>
</div>

<h2>${t(E, "Code (4 sections)", "코드 (4 섹션)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}

<h2>${t(E, "Self-check", "스스로 확인")}</h2>
<div class="why">
  <p>1. ${t(E, "a = [1, 2, 2] — how many distinct moos occur?", "a = [1, 2, 2] — 서로 다른 moo 개수는?")}</p>
  <p>2. ${t(E, "a = [1, 1] — how many?", "a = [1, 1] — 몇 개?")}</p>
  <p>3. ${t(E, "a = [4, 1, 4, 4] — which moo(s) occur, and why do we subtract 1?", "a = [4, 1, 4, 4] — 어떤 moo 가 발생하고, 왜 1 을 빼나?")}</p>
  <p style="color:#9ca3af;font-size:11px;margin-top:8px;">${t(E, "Answers: 1) one — (1,2,2). 2) zero — there's no x ≠ 1 before the (1,1) pair. 3) one — (1,4,4); count[4] = 3, so a 4 sits before p and can't be its own x → subtract 1.", "답: 1) 1개 — (1,2,2). 2) 0개 — (1,1) 짝 앞에 x ≠ 1 이 없음. 3) 1개 — (1,4,4); count[4] = 3 이라 4 가 p 앞에 있고 자기 x 가 못 됨 → 1 빼기.")}</p>
</div>

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
