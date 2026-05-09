import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getSleepySortSections } from "./components";

/* ================================================================
   Eye-evident sim: cows in a line + step-through suffix scan
   - Example array: [3, 1, 5, 2, 4]
   - Student steps from right to left, watching the green
     "already-sorted suffix" grow until a[k-1] >= a[k] breaks it.
   - Final K = N - (sorted suffix length) is highlighted at the end.
   ================================================================ */
function SuffixSortSim({ E }) {
  // A handful of preset arrays to flip between
  const PRESETS = [
    [3, 1, 5, 2, 4],
    [1, 2, 4, 3],
    [1, 2, 3, 4],
    [5, 4, 3, 2, 1],
  ];
  const [pi, setPi] = useState(0);
  const arr = PRESETS[pi];
  const N = arr.length;

  // Step counter: starts at N - 1 (only last cow in suffix),
  // each step we try to extend left. When extension fails OR k = 0, stop.
  // step value is the current k being inspected.
  const [step, setStep] = useState(N - 1);

  // Recompute final k based on full scan (for "answer" badge)
  const finalK = (() => {
    let k = N - 1;
    while (k > 0 && arr[k - 1] < arr[k]) k -= 1;
    return k;
  })();

  // For the current step, the sorted suffix runs from `step` to N-1.
  // At each step we either succeed (extend) or fail (stop).
  // We animate the scan: from N-1 down. Suffix is [step .. N-1].
  // Check between arr[step-1] and arr[step] tells us whether we can keep going.
  const k = step;
  const compareLeft = k > 0 ? arr[k - 1] : null;
  const compareRight = arr[k];
  const canExtend = k > 0 && compareLeft < compareRight;
  const done = k === 0 || (k > 0 && !canExtend);

  const A = "#2563eb";
  const GREEN = "#15803d";
  const RED = "#dc2626";
  const PURPLE = "#7c3aed";

  const reset = (newPi) => {
    setPi(newPi);
    setStep(PRESETS[newPi].length - 1);
  };

  const onStep = () => {
    if (done) return;
    if (canExtend) setStep(k - 1);
  };

  const cell = (val, i) => {
    const inSuffix = i >= k;
    const isBoundaryLeft = i === k - 1; // the cow being tested against
    const isBoundaryRight = i === k;    // leftmost of current suffix
    let bg = "#fff";
    let border = "#cbd5e1";
    let color = C.text;
    if (inSuffix) {
      bg = GREEN + "22";
      border = GREEN;
      color = GREEN;
    }
    if (isBoundaryLeft && !done) {
      bg = PURPLE + "22";
      border = PURPLE;
      color = PURPLE;
    }
    if (isBoundaryLeft && done && !canExtend) {
      bg = RED + "22";
      border = RED;
      color = RED;
    }
    return (
      <div key={i} style={{
        width: 44, height: 44, borderRadius: 8,
        background: bg, border: `2px solid ${border}`, color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 16, position: "relative",
        transition: "all 240ms",
      }}>
        {val}
        <div style={{ position: "absolute", bottom: -16, fontSize: 10, color: C.dim, fontWeight: 600 }}>{i}</div>
        {isBoundaryRight && (
          <div style={{ position: "absolute", top: -14, fontSize: 10, color: GREEN, fontWeight: 800 }}>
            {t(E, "k", "k")}
          </div>
        )}
      </div>
    );
  };

  // Status message
  let status;
  if (done) {
    if (k === 0) {
      status = t(E,
        "Reached k = 0 — the entire array is already a sorted suffix. Answer = 0.",
        "k = 0까지 도달 — 배열 전체가 이미 정렬된 접미사. 답 = 0.");
    } else {
      status = t(E,
        `Stopped: a[${k - 1}] = ${compareLeft} ≥ a[${k}] = ${compareRight}. Suffix length = ${N - k}, answer K = ${N} − ${N - k} = ${k}.`,
        `멈춤: a[${k - 1}] = ${compareLeft} ≥ a[${k}] = ${compareRight}. 접미사 길이 = ${N - k}, 답 K = ${N} − ${N - k} = ${k}.`);
    }
  } else {
    status = t(E,
      `Compare a[${k - 1}] = ${compareLeft} with a[${k}] = ${compareRight}. ${compareLeft} < ${compareRight} → suffix can grow!`,
      `a[${k - 1}] = ${compareLeft} 와 a[${k}] = ${compareRight} 비교. ${compareLeft} < ${compareRight} → 접미사 확장 가능!`);
  }

  return (
    <div style={{ background: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 10, padding: 14, marginTop: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 8, letterSpacing: 0.4 }}>
        🐮 {t(E, "TRY: step-through the suffix scan", "직접 해봐: 접미사 스캔 단계별로")}
      </div>

      {/* Preset picker */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, justifyContent: "center" }}>
        {PRESETS.map((p, idx) => (
          <button key={idx} onClick={() => reset(idx)} style={{
            background: idx === pi ? A : "#fff",
            color: idx === pi ? "#fff" : A,
            border: `1.5px solid ${A}`, borderRadius: 6,
            padding: "3px 9px", fontSize: 11, fontWeight: 700, cursor: "pointer",
            fontFamily: "monospace",
          }}>
            [{p.join(", ")}]
          </button>
        ))}
      </div>

      {/* Row of cows */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 22, paddingTop: 6 }}>
        {arr.map((v, i) => cell(v, i))}
      </div>

      {/* Status */}
      <div style={{
        background: done ? (k === 0 ? GREEN + "11" : "#fff7ed") : "#eff6ff",
        border: `1.5px solid ${done ? (k === 0 ? GREEN : RED) : A}`,
        borderRadius: 8, padding: "8px 12px", marginBottom: 10,
        fontSize: 12, color: done ? (k === 0 ? GREEN : "#9a3412") : "#1e3a8a",
        lineHeight: 1.5, fontWeight: 600, textAlign: "center",
      }}>
        {status}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={onStep} disabled={done} style={{
          background: done ? "#e5e7eb" : A,
          color: done ? "#9ca3af" : "#fff",
          border: "none", borderRadius: 6,
          padding: "6px 16px", fontSize: 12, fontWeight: 800,
          cursor: done ? "not-allowed" : "pointer",
        }}>
          {done ? t(E, "✓ done", "✓ 끝") : t(E, "▶ extend left", "▶ 왼쪽으로 확장")}
        </button>
        <button onClick={() => reset(pi)} style={{
          background: "#fff", color: C.dim,
          border: "1.5px solid #cbd5e1", borderRadius: 6,
          padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "↻ reset", "↻ 처음부터")}
        </button>
      </div>

      {/* Final-answer badge (only after scan finished) */}
      {done && (
        <div style={{
          marginTop: 12, padding: "8px 12px", borderRadius: 8,
          background: GREEN + "11", border: `1.5px solid ${GREEN}`,
          fontSize: 12, color: GREEN, fontWeight: 700, textAlign: "center",
        }}>
          {t(E,
            `Cows that must move: front ${finalK} of them → answer = ${finalK}.`,
            `움직여야 하는 소: 앞쪽 ${finalK}마리 → 답 = ${finalK}.`)}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Find longest sorted suffix",
  "# from the right, find where it stops being sorted",
  "k = N - 1",
  "while k > 0 and a[k - 1] < a[k]:",
  "    k -= 1",
  "",
  "# k is the first index of the sorted suffix",
  "# We need to move cows 0..k-1",
  "print(k)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a line with distinct IDs. The only allowed move: take the FRONT cow and reinsert her anywhere later in the line.\nFind the MINIMUM number of such moves needed to make the IDs sorted in increasing order.",
        "한 줄로 선 N마리 소가 있고, 각자 서로 다른 ID를 가져요. 허용되는 움직임은 단 하나: 맨 앞 소를 빼서 줄의 더 뒤쪽 어딘가에 다시 끼워 넣기.\nID가 오름차순이 되도록 만드는 최소 움직임 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"😴"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Sleepy Cow Sorting</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of front-pulls needed to sort the line by ID.",
                "줄을 ID 오름차순으로 정렬하는 데 필요한 최소 움직임 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows in a line", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each with a distinct ID.", "가 있고, ID는 서로 달라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each move: take the ", "한 번의 움직임: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "front cow and reinsert her anywhere later", "맨 앞 소를 빼서 더 뒤쪽 어디든 다시 끼워 넣기")}</b>
                  {t(E, " in the line.", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "sort the line by ID in increasing order", "ID 오름차순으로 정렬")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of moves", "필요한 최소 움직임 횟수")}</b>
                  {t(E, " required.", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: Suffix-sort visualizer
    {
      type: "reveal",
      narr: t(E,
        "Look at the line from the RIGHT. Walk left as long as each cow is smaller than the next.\nThe green prefix from the right is already in order — those cows never have to move.\nEverything to the LEFT of the boundary must be pulled and reinserted.",
        "줄을 오른쪽부터 봐요. 각 소가 다음 소보다 작은 동안 왼쪽으로 한 칸씩 가요.\n오른쪽부터 초록색 부분은 이미 정렬돼 있어 — 그 소들은 움직일 필요 없음.\n경계 왼쪽에 있는 소들은 모두 빼서 다시 끼워야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 6 }}>
              🔭 {t(E, "Visual idea", "그림으로 보기")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "Pick an array, then press \"extend left\" to walk the boundary one cow at a time. The green block is the already-sorted suffix. The red boundary marks where the order finally breaks.",
                "배열을 하나 골라서 \"왼쪽으로 확장\" 버튼을 눌러봐. 한 칸씩 경계를 옮기면서 초록 블록(이미 정렬된 접미사)이 자라나요. 순서가 깨지는 자리가 빨간 경계로 표시돼요.")}
            </div>
          </div>
          <SuffixSortSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For [1, 2, 4, 3]: looking from the right, [3] is fine, but 4 > 3 breaks the order.\nThe sorted suffix has length 1.\nSo we move N - 1 = 3 cows.", "[1, 2, 4, 3]에서: 오른쪽부터 보면 [3]은 괜찮지만 4 > 3에서 순서가 깨져. 정렬된 접미사 길이는 1. 그래서 N - 1 = 3마리를 옮겨야 해요."),
      question: t(E,
        "For [2, 1, 3, 4]: what is the length of the longest sorted suffix from the right?",
        "[2, 1, 3, 4]에서: 오른쪽부터 가장 긴 정렬된 접미사 길이는?"),
      options: [
        t(E, "1 - only [4]", "1 - [4]만"),
        t(E, "2 - [3, 4]", "2 - [3, 4]"),
        t(E, "3 - [1, 3, 4]", "3 - [1, 3, 4]"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! From the right: 4 ok, 3 < 4 ok, 1 < 3 ok, but 2 > 1 breaks. So suffix [1, 3, 4] has length 3. Answer = 4 - 3 = 1.",
        "맞아! 오른쪽부터: 4 ok, 3 < 4 ok, 1 < 3 ok, 하지만 2 > 1에서 깨져. 접미사 [1, 3, 4] 길이는 3. 답 = 4 - 3 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the array is already sorted [1, 2, 3, 4], the entire array is a sorted suffix.\nHow many moves?", "배열이 이미 정렬된 [1, 2, 3, 4]이면, 전체가 정렬된 접미사예요. 이동 횟수는?"),
      question: t(E,
        "[1, 2, 3, 4] already sorted. How many moves needed?",
        "[1, 2, 3, 4] 이미 정렬됨. 필요한 이동 횟수는?"),
      hint: t(E,
        "If everything is already sorted, no moves are required.",
        "이미 다 정렬된 상태라면 굳이 움직일 필요가 있을까?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Cows in the longest already-sorted SUFFIX never need to move. Every cow in front of it needs at least 1 move. Answer = N − (sorted suffix length). Sections build it one piece at a time.",
        "이미 정렬된 가장 긴 SUFFIX 소들은 움직일 필요 없음. 그 앞의 소들은 적어도 한 번 이동 필요. 답 = N − (SUFFIX 길이). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSleepySortSections(E),
    },
  ];
}
