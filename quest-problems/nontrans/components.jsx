// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1180
//   Fixed: now checks BOTH non-transitive cycle directions (was 1/11 fail).
//   FULL_PY also fixed to match.
//   Fixed: input is 8 ints on ONE line (A[0..3] B[0..3]), not two lines; C++ rewritten to
//          brute-force die C (4 faces 1..10) and require beats(A,B) & beats(B,C) & beats(C,A).
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ═══════════════════════════════════════════════════════════════
   NonTransDeepAuditSim — pick a pair of 4-sided dice, step through
   every (x, y) outcome, watch each pair classified as X-wins /
   X-loses / tie, tally win vs lose, and let the verdict (X beats Y
   or not) emerge from the count. This is exactly what beats(X, Y)
   does — but at human speed, one pair at a time.
   ═══════════════════════════════════════════════════════════════ */
const _NT_PRESETS = [
  { X: [4, 4, 4, 4], Y: [3, 3, 3, 6], label: "[4,4,4,4] vs [3,3,3,6]" },
  { X: [3, 3, 3, 6], Y: [2, 2, 5, 5], label: "[3,3,3,6] vs [2,2,5,5]" },
  { X: [2, 2, 5, 5], Y: [4, 4, 4, 4], label: "[2,2,5,5] vs [4,4,4,4]" },
  { X: [1, 2, 3, 4], Y: [1, 2, 3, 4], label: "[1,2,3,4] vs [1,2,3,4]" },
];

export function NonTransDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { X, Y } = _NT_PRESETS[pi];
  const [step, setStep] = useState(0);
  const [audited, setAudited] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setStep(0);
    setAudited(false);
  };

  const pairs = [];
  for (let i = 0; i < X.length; i++) {
    for (let j = 0; j < Y.length; j++) {
      const x = X[i], y = Y[j];
      const kind = x > y ? "W" : x < y ? "L" : "T";
      pairs.push({ i, j, x, y, kind });
    }
  }
  const n = pairs.length;

  let win = 0, lose = 0, tie = 0;
  for (let k = 0; k < step; k++) {
    if (pairs[k].kind === "W") win++;
    else if (pairs[k].kind === "L") lose++;
    else tie++;
  }
  const totalWin  = pairs.filter(p => p.kind === "W").length;
  const totalLose = pairs.filter(p => p.kind === "L").length;
  const verdict = totalWin > totalLose ? "BEATS" : "NOT";

  const advance = () => {
    if (step < n) setStep(step + 1);
    else setAudited(true);
  };
  const reset = () => { setStep(0); setAudited(false); };

  const kindBg  = { W: "#dcfce7", L: "#fee2e2", T: "#fef3c7" };
  const kindBd  = { W: "#86efac", L: "#fca5a5", T: "#fde68a" };
  const kindCol = { W: "#166534", L: "#991b1b", T: "#92400e" };
  const kindTxt = (k) => k === "W" ? t(E, "X wins", "X 승")
                       : k === "L" ? t(E, "X loses", "X 패")
                       :              t(E, "tie",   "무승부");

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_NT_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Step through every (x, y) outcome. Each pair is x > y, x < y, or x = y. Tally to decide whether X beats Y.",
          "모든 (x, y) 결과를 한 쌍씩 살펴봐요. 각 쌍은 x > y, x < y, x = y 중 하나예요.\n다 더해서 X 가 Y 를 이기는지 가려내요.")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: A, marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>X:</span>
          {X.map((v, k) => (
            <div key={k} style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: `1.5px solid ${A}`, background: "#fff",
              fontSize: 14, fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace",
            }}>{v}</div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0891b2", marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>Y:</span>
          {Y.map((v, k) => (
            <div key={k} style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: `1.5px solid #0891b2`, background: "#fff",
              fontSize: 14, fontWeight: 700, color: "#0891b2", fontFamily: "'JetBrains Mono',monospace",
            }}>{v}</div>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: `auto repeat(${Y.length}, 1fr)`,
        gap: 3, background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: 8, marginBottom: 10, fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
      }}>
        <div></div>
        {Y.map((v, j) => (
          <div key={`h${j}`} style={{ textAlign: "center", color: "#0891b2", fontWeight: 700, padding: "2px 0" }}>y={v}</div>
        ))}
        {X.map((xv, i) => (
          <RowFragment key={`row${i}`} i={i} xv={xv} Y={Y} pairs={pairs} step={step}
            kindBg={kindBg} kindBd={kindBd} kindCol={kindCol} accent={A} />
        ))}
      </div>

      <div style={{
        background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: "8px 10px", marginBottom: 10, fontSize: 12,
        fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 700, color: "#7f1d1d", marginBottom: 4, fontFamily: "inherit" }}>
          {t(E, "Pairs revealed", "공개된 쌍")} ({Math.min(step, n)} / {n})
        </div>
        {step === 0 && (
          <div style={{ color: C.dim, fontStyle: "italic" }}>
            {t(E, "Tap 'Next pair' to reveal the first (x, y) outcome.",
                  "'다음 쌍' 을 눌러 첫 (x, y) 결과를 열어 봐요.")}
          </div>
        )}
        {step > 0 && pairs.slice(Math.max(0, step - 3), step).map((p, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: C.dim, minWidth: 28 }}>#{Math.max(0, step - 3) + k + 1}</span>
            <span style={{ color: A, fontWeight: 700 }}>x={p.x}</span>
            <span style={{ color: C.dim }}>vs</span>
            <span style={{ color: "#0891b2", fontWeight: 700 }}>y={p.y}</span>
            <span style={{ color: C.dim }}>:</span>
            <span style={{ fontWeight: 700 }}>
              {p.x} {p.kind === "W" ? ">" : p.kind === "L" ? "<" : "="} {p.y}
            </span>
            <span style={{
              padding: "1px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              background: kindBg[p.kind], border: `1px solid ${kindBd[p.kind]}`, color: kindCol[p.kind],
            }}>
              {kindTxt(p.kind)}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          win = {win} &nbsp; lose = {lose} &nbsp; tie = {tie}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d" }}>
          {step < n
            ? t(E, "more to go…", "아직 남았어요…")
            : t(E, "all 16 pairs counted ✓", "16 쌍 모두 세기 완료 ✓")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={advance} disabled={audited} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: audited ? "#e5e7eb" : A, color: audited ? "#9ca3af" : "#fff",
          fontSize: 12, fontWeight: 700, cursor: audited ? "default" : "pointer",
        }}>
          {step < n
            ? t(E, "▶ Next pair", "▶ 다음 쌍")
            : t(E, "🔍 Reveal verdict", "🔍 판정 공개")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 다시 처음부터")}
        </button>
      </div>

      {audited && (
        <div style={{
          background: verdict === "BEATS" ? "#ecfdf5" : "#eff6ff",
          border: `1px solid ${verdict === "BEATS" ? "#6ee7b7" : "#93c5fd"}`,
          borderRadius: 10, padding: "10px 14px",
          color: verdict === "BEATS" ? "#065f46" : "#1e3a8a",
          fontSize: 13, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 800, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            win ({totalWin}) {totalWin > totalLose ? ">" : "≤"} lose ({totalLose}) → {verdict === "BEATS" ? "X beats Y" : "X does NOT beat Y"}
          </div>
          <div style={{ fontSize: 12 }}>
            {verdict === "BEATS"
              ? t(E, "More x > y outcomes than x < y — X beats Y. beats(X, Y) returns True.",
                    "x > y 가 x < y 보다 많아요.\n그래서 X 가 Y 를 이기고, beats(X, Y) 는 True 예요.")
              : t(E, "win is not strictly greater than lose — X does NOT beat Y. beats(X, Y) returns False.",
                    "win 이 lose 보다 크지 않아요.\n그래서 X 는 Y 를 이기지 못하고, beats(X, Y) 는 False 예요.")}
          </div>
        </div>
      )}
    </div>
  );
}

function RowFragment({ i, xv, Y, pairs, step, kindBg, kindBd, kindCol, accent }) {
  return (
    <>
      <div style={{ color: accent, fontWeight: 700, paddingRight: 4 }}>x={xv}</div>
      {Y.map((yv, j) => {
        const idx = i * Y.length + j;
        const revealed = idx < step;
        const isCurrent = idx === step;
        const p = pairs[idx];
        return (
          <div key={`c${i}-${j}`} style={{
            height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 5,
            background: revealed ? kindBg[p.kind] : (isCurrent ? "#fde2e2" : "#fff"),
            border: `1px solid ${revealed ? kindBd[p.kind] : (isCurrent ? accent : "#e5e7eb")}`,
            color: revealed ? kindCol[p.kind] : (isCurrent ? accent : "#cbd5e1"),
            fontWeight: 700,
            boxShadow: isCurrent ? `0 0 0 2px ${accent}33` : "none",
          }}>
            {revealed ? (p.kind === "W" ? ">" : p.kind === "L" ? "<" : "=") : "·"}
          </div>
        );
      })}
    </>
  );
}

const FULL_PY = [
  "def beats(X, Y):",
  "    win = sum(1 for x in X for y in Y if x > y)",
  "    lose = sum(1 for x in X for y in Y if x < y)",
  "    return win > lose",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    # 8 integers on one line: 4 faces of A, then 4 faces of B",
  "    nums = list(map(int, input().split()))",
  "    A = nums[0:4]",
  "    B = nums[4:8]",
  "",
  "    found = False",
  "    # Brute force every die C (4 faces, values 1-10, sorted to skip dupes)",
  "    for c1 in range(1, 11):",
  "        for c2 in range(c1, 11):",
  "            for c3 in range(c2, 11):",
  "                for c4 in range(c3, 11):",
  "                    C_die = [c1, c2, c3, c4]",
  "                    # Two non-transitive cycle directions are both valid",
  "                    if beats(A, B) and beats(B, C_die) and beats(C_die, A):",
  "                        found = True",
  "                    elif beats(B, A) and beats(C_die, B) and beats(A, C_die):",
  "                        found = True",
  "                    if found:",
  "                        break",
  "                if found:",
  "                    break",
  "            if found:",
  "                break",
  "        if found:",
  "            break",
  "",
  "    if found:",
  "        print('yes')",
  "    else:",
  "        print('no')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "// X beats Y when more (x, y) pairs have x > y than x < y",
  "bool beats(const vector<int>& X, const vector<int>& Y) {",
  "    int win = 0;",
  "    int lose = 0;",
  "    for (int x : X) {",
  "        for (int y : Y) {",
  "            if (x > y) {",
  "                win++;",
  "            } else if (x < y) {",
  "                lose++;",
  "            }",
  "        }",
  "    }",
  "    return win > lose;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        // 8 integers per test case: 4 faces of A, then 4 faces of B",
  "        vector<int> A(4), B(4);",
  "        for (int i = 0; i < 4; i++) {",
  "            cin >> A[i];",
  "        }",
  "        for (int i = 0; i < 4; i++) {",
  "            cin >> B[i];",
  "        }",
  "",
  "        bool found = false;",
  "        // Try every possible die C: 4 faces, values 1..10 (sorted to skip duplicates)",
  "        for (int c1 = 1; c1 <= 10 && !found; c1++)",
  "        for (int c2 = c1; c2 <= 10 && !found; c2++)",
  "        for (int c3 = c2; c3 <= 10 && !found; c3++)",
  "        for (int c4 = c3; c4 <= 10 && !found; c4++) {",
  "            vector<int> C = {c1, c2, c3, c4};",
  "            // Two non-transitive cycle directions are both valid:",
  "            //   1) A beats B, B beats C, C beats A",
  "            //   2) B beats A, C beats B, A beats C",
  "            if (beats(A, B) && beats(B, C) && beats(C, A)) {",
  "                found = true;",
  "            } else if (beats(B, A) && beats(C, B) && beats(A, C)) {",
  "                found = true;",
  "            }",
  "        }",
  "        const char* ans;",
  "        if (found) {",
  "            ans = \"yes\";",
  "        } else {",
  "            ans = \"no\";",
  "        }",
  "        cout << ans << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고,
   beats(설명 말풍선)만 덧붙인다. getNonTransSections() 는 PDF 다운로드가 계속 쓰므로
   그대로 둔다. ── */
export function getNonTransWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "beats(X, Y)", ko: "X 가 Y 를 이기는지 판정", en: "does X beat Y" },
        { v: "A, B, C", ko: "세 주사위의 눈 4개씩", en: "each die's 4 face values" },
        { v: "found", ko: "순환이 성립했나", en: "whether a cycle was found" },
      ],
      beats: [
        { hi: [4, 18], bubble: t(E,
          "beats(X, Y) decides whether X beats Y — compare all 16 pairs and return true when x > y outcomes outnumber x < y ones.",
          "beats(X, Y) 는 X 가 Y 를 이기는지 판정해요.\n16쌍을 다 비교해서 x > y 인 쌍이 x < y 인 쌍보다 많으면 true 예요.") },
        { hi: [20, 31], bubble: t(E,
          "For each case, read A's 4 faces and B's 4 faces. Repeat T times.",
          "케이스마다 A, B 의 눈 4개씩을 읽어요. T 케이스만큼 반복해요.") },
        { hi: [33, 39], bubble: t(E,
          "We can't compute C directly. So the c1..c4 loops try every sorted combination of 4 values from 1..10.",
          "C 를 계산으로 바로 구할 수 없어요.\n그래서 1~10 중 4개를 고르는 모든 경우(오름차순)를 c1..c4 반복문으로 만들어요.") },
        { hi: [40, 48], bubble: t(E,
          "Check both cycle directions with that C — either one working sets found to true.",
          "만든 C 로 두 순환 방향을 확인해요 — 한 방향이라도 성립하면 found 가 true 예요.") },
        { hi: [49, 58], bubble: t(E,
          "Choose yes or no based on found, and print it.",
          "found 결과에 따라 yes 또는 no 를 골라 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "beats(X, Y)", ko: "X 가 Y 를 이기는지 판정", en: "does X beat Y" },
      { v: "A, B, C_die", ko: "세 주사위의 눈 4개씩", en: "each die's 4 face values" },
      { v: "found", ko: "순환이 성립했나", en: "whether a cycle was found" },
    ],
    beats: [
      { hi: [0, 3], bubble: t(E,
        "beats(X, Y) decides whether X beats Y. It compares all 16 (x, y) pairs and returns True when x > y outcomes outnumber x < y ones.",
        "beats(X, Y) 는 X 가 Y 를 이기는지 판정해요.\nX, Y 의 눈 16쌍을 다 비교해서, x > y 인 쌍이 x < y 인 쌍보다 많으면 True 예요.") },
      { hi: [5, 10], bubble: t(E,
        "Each case is 8 numbers on one line — A's 4 faces, then B's 4 faces. Loop T times, splitting them into A and B.",
        "케이스마다 한 줄에 8개 숫자가 와요 — A 의 눈 4개, B 의 눈 4개예요.\nT 케이스만큼 반복하며 A, B 를 나눠 읽어요.") },
      { hi: [12, 18], bubble: t(E,
        "We can't compute C directly. So try every combination of 4 values from 1..10, kept sorted to skip duplicate dice.",
        "C 의 눈을 계산으로 바로 구할 수 없어요.\n그래서 1~10 중 4개를 고르는 모든 경우(오름차순)를 하나씩 만들어 봐요.") },
      { hi: [20, 23], bubble: t(E,
        "Check both cycle directions with that C — A beats B beats C beats A, or the reverse. Either one sets found to True.",
        "만든 C 로 두 순환 방향을 확인해요 — A→B→C→A 이거나 B→A→C→B 이거나,\n둘 중 하나만 성립하면 found 가 True 예요.") },
      { hi: [24, 31], bubble: t(E,
        "Once found is True there's nothing left to check, so break out of all four loops right away.",
        "found 가 True 면 더 찾을 필요 없어서, 네 반복을 전부 즉시 멈춰요.") },
      { hi: [33, 36], bubble: t(E,
        "Print yes or no based on found.",
        "found 결과에 따라 yes 또는 no 를 출력해요.") },
    ],
  };
}

export function getNonTransSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? yes/no — is there a die C that makes a beats-cycle with A and B?",
            "무엇을 답으로 내야 하나요?\nA, B 와 순환(누가 누굴 이기는)을 만드는 주사위 C 가 있는지예요."),
        t(E, "We can't compute C directly, so we have to build every possible C and test it.",
            "C 의 눈금을 계산으로 바로 구할 수는 없어서,\n가능한 C 를 하나씩 만들어 순환이 되는지 봐야 해요."),
        t(E, "So try every C with 4 faces from 1..10 (sorted, to skip duplicate orderings) — that covers every distinct die.",
            "그래서 눈금 1~10 중 4개를 고르는 경우를 다 만들어요.\n오름차순으로만 골라 중복된 조합은 건너뛰어요."),
        t(E, "For each C, check both cycle directions (A beats B beats C beats A, or the reverse). Either one working means yes.",
            "만든 C 로 두 순환 방향을 둘 다 확인해요.\n한 방향이라도 성립하면 yes, 다 안 되면 no 예요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "파이썬의 list, map 덕분에 코드가 짧아요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, …). 그래야 코드가 뭘 하려는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더한 값이나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function NonTransProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadNonTransPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "NonTrans — Full Study Guide", "NonTrans — 종합 풀이 노트");
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

