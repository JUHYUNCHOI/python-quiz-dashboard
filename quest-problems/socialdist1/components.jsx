import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ----------------------------------------------------------------
   SocDist1Sim — bilingual deep-audit sim for the title page

   2026-09-25 재작성 — 이전 버전은 **다른 문제**(Silver, cpid 1038: 구간 M 개에
   소 N 마리를 배치)를 그리고 있었다. 진짜 문제(Bronze, cpid 1035)는:
     길이 N 인 0/1 문자열 하나(1 = 이미 소가 있음) + 빈 칸에 소 2마리를 더 넣어서
     이웃한 두 소 사이 최소 거리를 최대로 만들기.

   ⚠️ 2026-09-25 (2차, PM 판정 ③): 예제를 "10001"(0번·4번) → "0100000010"
   (N=10, 1번·8번) 으로 바꿨다. 옛 예제는 사이 구간 길이가 3이라 D=2 이상에서
   `ones[0]//D` · `(N-1-ones[-1])//D` 두 줄이 **항상 0** — 그 두 줄이 왜 필요한지
   원리상 못 느꼈다(학생: "5쪽 코드에서 그만두고 싶었다"). 새 예제는 사이 간격이
   7 이라 D=1 에서 양 끝 칸(0·9)이 처음 값을 낸다. 미션·시뮬·퀴즈(1-2)·입력(1-3)이
   전부 이 예제를 같이 쓴다.

   여기서 보여주는 계산은 🔒 FULL_PY 의 `can_place(D, 2)` 와 **같은 논리**다:
     기존 소와 소 사이 빈 구간의 길이를 구하고, 그 안에 D 간격으로 몇 자리가
     남는지 (구간길이 − D) ÷ D 로 센다.
   검산(완전탐색과 대조): D=1→8자리(✓) · D=2→2자리(✓) · D=3→1자리(✗) · D=4+→0자리(✗)
   → 가장 좋은 D=2, 퀴즈 1-2(D=3 은 안 됨)·입력 1-3(정답 2) 과 일치.
   --------------------------------------------------------------- */
export function SocDist1Sim({ E }) {
  const N = 10;
  const S = "0100000010";                         // 미션·퀴즈·입력과 같은 예제
  const ones = [];
  for (let i = 0; i < N; i++) if (S[i] === "1") ones.push(i);
  const NEED = 2;                                 // 새로 넣을 소
  const MAX_X = N - 1;                            // D 가 가질 수 있는 가장 큰 값
  const [D, setD] = useState(1);

  // can_place(D, NEED) 와 같은 논리 — 빈 구간마다 D 간격으로 몇 자리가 남는지 센다.
  // renderA/renderB = 그 구간에 **실제로 비어 있는 칸**의 범위(칸 번호, 양끝 포함).
  // 이 범위는 D 가 바뀌어도 움직이지 않는다 — 소가 이미 있는 칸(0, 4)은 절대 포함하지 않는다
  // (전엔 a,b 를 그대로 배경 상자에 써서 기존 소 칸까지 덮어 겹쳐 보였다 — see-screen 실측으로 발견).
  function regionsFor(d) {
    const segs = [];
    if (ones.length === 0) {
      const cap = Math.floor((N - 1) / d) + 1;
      segs.push({ renderA: 0, renderB: N - 1, cap, pos: Array.from({ length: cap }, (_, i) => i * d) });
      return segs;
    }
    if (ones[0] > 0) {
      const cap = Math.floor(ones[0] / d);
      segs.push({ renderA: 0, renderB: ones[0] - 1, cap, pos: Array.from({ length: cap }, (_, i) => ones[0] - (i + 1) * d).reverse() });
    }
    for (let k = 1; k < ones.length; k++) {
      const a = ones[k - 1], b = ones[k];
      const cap = Math.max(0, Math.floor((b - a - d) / d));
      segs.push({ renderA: a + 1, renderB: b - 1, cap, pos: Array.from({ length: cap }, (_, i) => a + (i + 1) * d) });
    }
    const lastOne = ones[ones.length - 1];
    if (lastOne < N - 1) {
      const cap = Math.floor((N - 1 - lastOne) / d);
      segs.push({ renderA: lastOne + 1, renderB: N - 1, cap, pos: Array.from({ length: cap }, (_, i) => lastOne + (i + 1) * d) });
    }
    return segs;
  }

  const segs = regionsFor(D);
  const totalCap = segs.reduce((s, x) => s + x.cap, 0);
  const feasible = totalCap >= NEED;
  const newPositions = segs.flatMap((s) => s.pos).slice(0, NEED); // 필요한 만큼만 표시

  // 이 예제에서 가장 좋은 D — D 를 1부터 늘려가며 직접 스캔
  const bestD = (() => {
    let best = 0;
    for (let d = 1; d <= MAX_X; d++) {
      if (regionsFor(d).reduce((s, x) => s + x.cap, 0) >= NEED) best = d;
    }
    return best;
  })();
  const isBest = D === bestD;

  const U = 46;
  const totalW = N * U;

  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, `Try it · stalls = "${S}" (cows already at ${ones.join(", ")})`, `직접 해봐요 · 칸 = "${S}" (${ones.map((p) => `${p}번`).join(", ")}에 소)`)}
      </div>

      {/* D 슬라이더 — **칸 줄보다 위에 둔다.** (2026-09-25, PM 재지시)
          ⚠️ 처음엔 이 자리에 margin-top 을 줘서 아래로 밀었는데, 그러면 슬라이더가
          **더** 하단 고정 바 뒤로 들어가 오히려 나빠졌다(실측: top 863→925, 바가
          832 부터 시작). 진짜 문제는 "여백 부족"이 아니라 "칸 줄(90px+)이 슬라이더보다
          먼저 나와서 슬라이더를 화면 아래로 떠민 것" — 그래서 순서를 바꿨다.
          부수 효과: 조작기(슬라이더)를 먼저 보고 그 결과(상태 배지·칸 그림)가
          아래에서 바뀌는 순서가 돼서 "한 걸음에 바뀌는 자리는 한 곳" 에도 맞는다.
          끌기 정밀도가 기기마다 갈려서(선생님 확인) 양옆에 −/+ 버튼을 뒀다. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Drag — or tap −/+ — to change minimum gap D", "끌거나 −/+ 를 눌러 최소 간격 D 를 바꿔 봐요")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button" onClick={() => setD((d) => Math.max(1, d - 1))} disabled={D <= 1}
            aria-label={t(E, "Decrease D", "D 줄이기")}
            style={{
              width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${D <= 1 ? "#e2e8f0" : A}`,
              background: D <= 1 ? "#f1f5f9" : "#fff", color: D <= 1 ? "#94a3b8" : A,
              fontSize: 16, fontWeight: 800, cursor: D <= 1 ? "default" : "pointer", flexShrink: 0,
            }}
          >−</button>
          <span style={{ fontSize: 11, color: C.dim }}>1</span>
          <input
            type="range" min={1} max={MAX_X} value={D}
            onChange={(e) => setD(parseInt(e.target.value, 10))}
            style={{ width: 180, accentColor: A }}
          />
          <span style={{ fontSize: 11, color: C.dim }}>{MAX_X}</span>
          <button
            type="button" onClick={() => setD((d) => Math.min(MAX_X, d + 1))} disabled={D >= MAX_X}
            aria-label={t(E, "Increase D", "D 늘리기")}
            style={{
              width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${D >= MAX_X ? "#e2e8f0" : A}`,
              background: D >= MAX_X ? "#f1f5f9" : "#fff", color: D >= MAX_X ? "#94a3b8" : A,
              fontSize: 16, fontWeight: 800, cursor: D >= MAX_X ? "default" : "pointer", flexShrink: 0,
            }}
          >+</button>
        </div>
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          D = <b>{D}</b>
        </div>
        <div style={{
          background: feasible ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${feasible ? "#16a34a" : "#dc2626"}`,
          borderRadius: 8, padding: "4px 10px", fontSize: 11,
          color: feasible ? "#166534" : "#7f1d1d",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {t(E, "room for new cows", "새로 넣을 자리")} = <b>{totalCap}</b> / {NEED} {feasible ? "✓" : "✗"}
        </div>
        {isBest && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
            {t(E, "★ best D", "★ 가장 좋은 D")}
          </div>
        )}
      </div>

      {/* Stall row */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "16px 10px", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ position: "relative", width: totalW, height: 90, margin: "0 auto" }}>
          {/* D 로 검사 중인 빈 구간 — 자리가 있으면 빨갛게, 없으면 회색.
              renderA..renderB 는 실제로 비어 있는 칸만 (기존 소 칸은 절대 포함 안 함). */}
          {segs.filter((sgm) => sgm.renderB >= sgm.renderA).map((sgm, si) => (
            <div key={`seg-${si}`} style={{
              position: "absolute",
              left: sgm.renderA * U + 4, top: 38,
              width: (sgm.renderB - sgm.renderA + 1) * U - 8, height: 26,
              background: sgm.cap > 0 ? "linear-gradient(180deg, #fee2e2, #fecaca)" : "#f1f5f9",
              border: `1.5px dashed ${sgm.cap > 0 ? "#fca5a5" : "#cbd5e1"}`,
              borderRadius: 10,
            }} />
          ))}

          {/* 칸 번호 */}
          {Array.from({ length: N }, (_, i) => (
            <div key={`cell-${i}`} style={{
              position: "absolute", left: i * U, top: 64, width: U, textAlign: "center",
              fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace",
            }}>{i}</div>
          ))}

          {/* 이미 있던 소 */}
          {ones.map((pos, i) => (
            <div key={`old-${i}`} style={{ position: "absolute", left: pos * U + U / 2 - 14, top: 14, width: 28, fontSize: 22, textAlign: "center" }}>
              <div>{"🐄"}</div>
              <div style={{ fontSize: 9, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -2 }}>{pos}</div>
            </div>
          ))}

          {/* 새로 놓을 소 (필요한 2마리, D 가 바뀌면 자리도 바뀐다).
              고리(테두리 원)는 라벨과 겹치지 않게 크기를 고정한다 —
              전엔 라벨에 marginTop:-2 를 줘서 고리 배경과 겹쳐 보였다(see-screen 실측). */}
          {newPositions.map((pos, i) => (
            <div key={`new-${i}`} style={{
              position: "absolute", left: pos * U + U / 2 - 16, top: 11, width: 32,
              textAlign: "center", transition: "left .2s ease-out",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 999, background: "#fecaca",
                border: "2px solid #dc2626", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto", fontSize: 18,
              }}>{"🐄"}</div>
              <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{pos}</div>
            </div>
          ))}

          {/* 부족한 만큼 ✗ 표시 */}
          {!feasible && Array.from({ length: NEED - totalCap }, (_, mi) => (
            <div key={`miss-${mi}`} style={{ position: "absolute", right: 4 + mi * 22, top: 0, fontSize: 16, opacity: 0.55 }}>
              {"🐄"}<span style={{ position: "absolute", left: 0, top: 0, fontSize: 18, color: "#dc2626" }}>✗</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight box */}
      <div style={{ marginTop: 10, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.55, wordBreak: "keep-all" }}>
        <b style={{ color: A }}>{t(E, "Why binary search?", "왜 이분 탐색?")}</b>{" "}
        {t(E,
          <>Bigger D → less room for the 2 new cows. So {"{D : 2 more cows fit}"} is a downward-true range —<br />the biggest such D is the answer.</>,
          <>D 가 커질수록 새로 넣을 자리가 줄어요.<br />그래서 '2마리가 들어가는 D' 는 작은 쪽이 모두 참이라, 그중 가장 큰 D 가 답이에요.</>)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('socdist1.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "s = lines[1].strip()",
  "",
  "# 현재 점유된 stall 위치들 (0-indexed)",
  "ones = []",
  "for i in range(N):",
  "    if s[i] == '1':",
  "        ones.append(i)",
  "",
  "# D 만큼의 최소 거리로 cows 마리 더 추가 가능한지 확인",
  "def can_place(D, cows):",
  "    # 이미 존재하는 1들 사이 최소 거리가 D 이상이어야 함",
  "    for k in range(1, len(ones)):",
  "        if ones[k] - ones[k-1] < D:",
  "            return False",
  "    # 각 gap 에 새 cow 몇 마리 넣을 수 있는지",
  "    placed = 0",
  "    if not ones:",
  "        # 빈 stall만 있는 경우: 0, D, 2D, ... 배치",
  "        placed = (N - 1) // D + 1",
  "    else:",
  "        # 1과 1 사이 gap",
  "        for k in range(1, len(ones)):",
  "            gap = ones[k] - ones[k-1]",
  "            placed += (gap - D) // D",
  "        # 왼쪽 끝 ~ 첫 1",
  "        placed += ones[0] // D",
  "        # 마지막 1 ~ 오른쪽 끝",
  "        placed += (N - 1 - ones[-1]) // D",
  "    return placed >= cows",
  "",
  "# Binary search 최대 D",
  "lo, hi = 1, N",
  "ans = 1",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if can_place(mid, 2):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "",
  "with open('socdist1.out', 'w') as file:",
  "    file.write(str(ans) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int N;",
  "vector<int> ones;",
  "",
  "// D 만큼의 최소 거리로 cows 마리 더 추가 가능한지 확인",
  "bool can_place(int D, int cows) {",
  "    // 이미 존재하는 1들 사이 최소 거리가 D 이상이어야 함",
  "    for (int k = 1; k < (int)ones.size(); k++) {",
  "        if (ones[k] - ones[k-1] < D) {",
  "            return false;",
  "        }",
  "    }",
  "    int placed = 0;",
  "    if (ones.empty()) {",
  "        // 빈 stall만 있는 경우: 0, D, 2D, ... 배치",
  "        placed = (N - 1) / D + 1;",
  "    } else {",
  "        // 1과 1 사이 gap",
  "        for (int k = 1; k < (int)ones.size(); k++) {",
  "            int gap = ones[k] - ones[k-1];",
  "            placed += (gap - D) / D;",
  "        }",
  "        // 왼쪽 끝 ~ 첫 1",
  "        placed += ones[0] / D;",
  "        // 마지막 1 ~ 오른쪽 끝",
  "        placed += (N - 1 - ones.back()) / D;",
  "    }",
  "    return placed >= cows;",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"socdist1.in\");",
  "    ofstream fout(\"socdist1.out\");",
  "",
  "    fin >> N;",
  "    string s;",
  "    fin >> s;",
  "",
  "    // 현재 점유된 stall 위치들 (0-indexed)",
  "    for (int i = 0; i < N; i++) {",
  "        if (s[i] == '1') {",
  "            ones.push_back(i);",
  "        }",
  "    }",
  "",
  "    // Binary search 최대 D",
  "    int lo = 1;",
  "    int hi = N;",
  "    int ans = 1;",
  "    while (lo <= hi) {",
  "        int mid = (lo + hi) / 2;",
  "        if (can_place(mid, 2)) {",
  "            ans = mid;",
  "            lo = mid + 1;",
  "        } else {",
  "            hi = mid - 1;",
  "        }",
  "    }",
  "    fout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSocDist1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? The largest minimum distance guaranteed between any two of the N cows once we add 2 more.",
            "무엇을 출력해야 하나요?\n소 2마리를 더 놓았을 때\n어떤 두 소든 보장되는 최소 거리의\n가장 큰 값이에요."),
        t(E, "Trying every distance D one by one is slow. But 'can 2 more cows fit with gaps of at least D?' gets harder as D grows and easier as D shrinks — it flips exactly once. So we test the middle and keep halving toward the side that works. That way of searching is called binary search.",
            "거리 D 를 하나씩 다 시도하면 느려요.\n그런데 'D 이상 거리로 2마리를 더 놓을 수 있나?'\n라는 질문은 D 가 커질수록 어려워지고\n작아질수록 쉬워져요 — 딱 한 번만 뒤집혀요.\n그래서 가운데를 찍어 보고 되는 쪽으로 절반씩 좁혀 가요.\n이렇게 찾는 걸 이분 탐색이라고 불러요."),
        t(E, "So the code binary-searches D, and for each candidate D checks the gaps between existing cows and how many new cows still fit. (With 3+ existing cows, this check just repeats once per gap between them.)",
            "그래서 코드는 D 를 이분 탐색하면서\n기존 소들 사이 간격과\n새로 몇 마리를 더 넣을 수 있는지 확인해요.\n(소가 3마리 이상이면 이 계산을 간격마다 한 번씩 반복해요.)"),
        /* ⚠️ 2026-09-25 학생 보고 ①: *"제일 어려운 «한 구간에 새 소가 몇 마리 들어가나»
           계산식은 설명이 없었다. 손으로 계산해서 억지로 따라갔지 이해한 게 아니다."*
           ⚠️ 그래서 쓴 첫 문장이 **두 번째 학생에게 틀리게 읽혔다** —
           「첫 소는 D 뒤에 → gap−D 가 남고 → 그다음 소마다 또 D」로 쓰니
           *"그럼 첫 소 1마리 + (gap−D)//D 마리겠네"* 로 읽혀 **+1 을 하게 만들었다.**
           그 나눗셈은 **첫 소까지 포함한 전체 마리 수**다(gap 1~15 · D 1~7 전수 대조로 확인,
           어긋난 경우 0). 「첫 소」를 따로 세지 말고 **자리를 D·2D·3D… 로 세는** 쪽으로 다시 썼다. */
        t(E, "Why (gap − D) // D? New cows go at D, 2D, 3D … past the left cow — that spacing is what D means. The last one must also stay D short of the right cow, so k·D ≤ gap − D. Divide and k = (gap − D) // D — that is ALL the new cows, not the ones after the first. The two ends have a cow on one side only, so nothing is reserved on the far side: ones[0] // D and (N−1−ones[−1]) // D.",
            "(gap − D) // D 는 왜 이럴까요?\n새 소는 왼쪽 소로부터 D · 2D · 3D … 칸에 놓여요.\n마지막 소도 오른쪽 소에서 D 칸은 떨어져야 하니까\nk 번째 자리 k×D 가 gap − D 를 넘으면 안 돼요.\n그래서 k = (gap − D) // D 예요 —\n이 값이 **새로 넣는 소 전체**예요. 첫 소를 따로 더하지 않아요.\n양 끝은 한쪽에만 소가 있어서 반대쪽을 비워 둘 필요가 없어요 —\nones[0] // D 와 (N−1−ones[−1]) // D 예요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 넣으면 코드가 무엇을 쓰는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function SocDist1ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}

/* ── CodeWalk (선생님 2026-07-14: "앞으로 코드는 모두 이런식으로") ──
   FULL_PY / FULL_CPP 는 위에서 한 글자도 안 바뀐다 — beats 는 그 배열의
   줄 번호(hi:[lo,hi], 0-based, 양끝 포함)만 가리킨다. */
export function getSocDist1Walk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "ones", ko: "기존 소가 있는 칸 번호들", en: "positions of existing cows" },
        { v: "D", ko: "지금 시도하는 최소 거리", en: "the minimum distance we're testing" },
        { v: "placed", ko: "D 간격으로 더 놓을 수 있는 소 수", en: "how many new cows fit with spacing D" },
      ],
      beats: [
        { hi: [0, 8], bubble: t(E,
          "What should we print? The biggest minimum gap we can guarantee once 2 more cows are squeezed in.\nWe'll binary-search that value, so N and the existing positions ones go in global scope.",
          "무엇을 출력해야 하나요? 소 2마리를 더 넣었을 때 보장되는 최소 거리의 가장 큰 값이에요.\n이 값을 이분 탐색으로 찾을 거라, 반복해서 쓸 N과 기존 소 위치 ones를 전역에 둬요.") },
        { hi: [10, 16], bubble: t(E,
          "can_place(D, cows) asks: could every cow end up at least D apart if we add cows more?\nFirst the existing cows themselves must already be D apart — if two are already closer, distance D is impossible no matter what we add.",
          "can_place(D, cows) 는 «cows 마리를 더해도 모든 소가 D 이상 떨어질 수 있나?» 를 확인해요.\n먼저 지금 있는 소들끼리도 D 이상 떨어져 있어야 해요 — 이미 둘이 D보다 가까우면 무엇을 더해도 D는 불가능해요.") },
        { hi: [17, 20], bubble: t(E,
          "If there are no existing cows at all, the stalls are wide open — cows fit at 0, D, 2D, … as densely as that spacing allows.",
          "기존 소가 하나도 없으면 칸이 완전히 비어 있으니, 0, D, 2D, … 자리에 그 간격대로 최대한 촘촘히 놓을 수 있어요.") },
        { hi: [21, 26], bubble: t(E,
          "Otherwise, check each gap between two neighboring existing cows. New cows sit at D, 2D, 3D … past the left one, and the last must still stay D short of the right one — so (gap − D) / D new cows fit, no more.",
          "그게 아니면 이웃한 기존 소 사이 간격마다 확인해요. 새 소는 왼쪽 소로부터 D, 2D, 3D … 자리에 놓이고, 마지막 소도 오른쪽 소에서 D만큼은 떨어져야 해서 그 간격엔 (gap − D) / D 마리만 들어가요.") },
        { hi: [27, 32], bubble: t(E,
          "The two outer ends only have a cow on one side, so nothing needs to stay clear on the far side — ones[0] / D on the left, (N−1−ones.back()) / D on the right.\nD works if the total placed reaches cows (here, 2).",
          "양 끝은 한쪽에만 소가 있어서 반대쪽을 비워 둘 필요가 없어요 — 왼쪽은 ones[0] / D, 오른쪽은 (N−1−ones.back()) / D 만큼 놓을 수 있어요.\n이렇게 다 놓은 자리 수가 cows(여기선 2) 이상이면 D는 성공이에요.") },
        { hi: [35, 42], bubble: t(E,
          "USACO's older contests use file I/O. Read the stall count N and the current layout string from the file.",
          "USACO 이전 대회는 파일로 입출력해요. 칸 수 N과 지금 배치 문자열을 파일에서 읽어요.") },
        { hi: [44, 49], bubble: t(E,
          "To measure gaps later, we need to know exactly where the existing cows are — scan the string and collect their positions into ones.",
          "나중에 간격을 재려면 지금 소가 있는 자리를 알아야 해요 — 문자열을 훑어 그 위치들을 ones에 모아요.") },
        { hi: [51, 63], bubble: t(E,
          "Trying every D one by one is slow. But «can 2 cows fit at distance D?» flips exactly once as D grows — possible for small D, impossible for large D — so binary-search the largest D that still works.",
          "D를 하나씩 다 시도하면 느려요. 그런데 «거리 D로 2마리가 들어가나?» 는 D가 커질수록 딱 한 번만 가능→불가능으로 뒤집혀요 — 그래서 되는 가장 큰 D를 이분 탐색으로 찾아요.") },
        { hi: [64, 66], bubble: t(E,
          "Write the answer to the output file.",
          "답을 출력 파일에 써요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "ones", ko: "기존 소가 있는 칸 번호들", en: "positions of existing cows" },
      { v: "D", ko: "지금 시도하는 최소 거리", en: "the minimum distance we're testing" },
      { v: "placed", ko: "D 간격으로 더 놓을 수 있는 소 수", en: "how many new cows fit with spacing D" },
    ],
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What should we print? The biggest minimum gap we can guarantee once 2 more cows are squeezed in.\nRead the stall count N and the current layout string from the file.",
        "무엇을 출력해야 하나요? 소 2마리를 더 넣었을 때 보장되는 최소 거리의 가장 큰 값이에요.\n파일에서 칸 수 N과 지금 배치 문자열을 읽어요.") },
      { hi: [7, 11], bubble: t(E,
        "To measure gaps later, we need to know exactly where the existing cows are — scan the string and collect their positions into ones.",
        "나중에 간격을 재려면 지금 소가 있는 자리를 알아야 해요 — 문자열을 훑어 그 위치들을 ones에 모아요.") },
      { hi: [13, 19], bubble: t(E,
        "can_place(D, cows) asks: could every cow end up at least D apart if we add cows more?\nFirst the existing cows themselves must already be D apart — if two are already closer, distance D is impossible no matter what we add.",
        "can_place(D, cows) 는 «cows 마리를 더해도 모든 소가 D 이상 떨어질 수 있나?» 를 확인해요.\n먼저 지금 있는 소들끼리도 D 이상 떨어져 있어야 해요 — 이미 둘이 D보다 가까우면 무엇을 더해도 D는 불가능해요.") },
      { hi: [21, 23], bubble: t(E,
        "If there are no existing cows at all, the stalls are wide open — cows fit at 0, D, 2D, … as densely as that spacing allows.",
        "기존 소가 하나도 없으면 칸이 완전히 비어 있으니, 0, D, 2D, … 자리에 그 간격대로 최대한 촘촘히 놓을 수 있어요.") },
      { hi: [24, 28], bubble: t(E,
        "Otherwise, check each gap between two neighboring existing cows. New cows sit at D, 2D, 3D … past the left one, and the last must still stay D short of the right one — so (gap − D) // D new cows fit, no more.",
        "그게 아니면 이웃한 기존 소 사이 간격마다 확인해요. 새 소는 왼쪽 소로부터 D, 2D, 3D … 자리에 놓이고, 마지막 소도 오른쪽 소에서 D만큼은 떨어져야 해서 그 간격엔 (gap − D) // D 마리만 들어가요.") },
      { hi: [29, 33], bubble: t(E,
        "The two outer ends only have a cow on one side, so nothing needs to stay clear on the far side — ones[0] // D on the left, (N−1−ones[-1]) // D on the right.\nD works if the total placed reaches cows (here, 2).",
        "양 끝은 한쪽에만 소가 있어서 반대쪽을 비워 둘 필요가 없어요 — 왼쪽은 ones[0] // D, 오른쪽은 (N−1−ones[-1]) // D 만큼 놓을 수 있어요.\n이렇게 다 놓은 자리 수가 cows(여기선 2) 이상이면 D는 성공이에요.") },
      { hi: [35, 44], bubble: t(E,
        "Trying every D one by one is slow. But «can 2 cows fit at distance D?» flips exactly once as D grows — possible for small D, impossible for large D — so binary-search the largest D that still works.",
        "D를 하나씩 다 시도하면 느려요. 그런데 «거리 D로 2마리가 들어가나?» 는 D가 커질수록 딱 한 번만 가능→불가능으로 뒤집혀요 — 그래서 되는 가장 큰 D를 이분 탐색으로 찾아요.") },
      { hi: [46, 47], bubble: t(E,
        "Write the answer to the output file.",
        "답을 출력 파일에 써요.") },
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


export function downloadSocDist1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SocDist1 — Full Study Guide", "SocDist1 — 종합 풀이 노트");
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

