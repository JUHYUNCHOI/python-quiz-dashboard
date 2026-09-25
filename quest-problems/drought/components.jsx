// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 15/15 on cpid=1181
// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 0/1 (WA - py expects single case, problem has T test cases)
//   C++:    0/1 (WA - single test case (problem has T tests))
//   C++/Py rewritten from official editorial 2026-06-15: now reads T test cases,
//     equalizes to a free (not fixed-0) target via the alternating-sum / o[i] method,
//     answer = 2*sum(o). Passes official sample (14 16 -1 -1 -1). USACO re-submit pending.
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ==========================================================
   FeedPairSim — interactive "feed adjacent pair" simulator
   Student clicks a pair (i, i+1) to reduce both by 1.
   Counter tracks ops; reset returns to start.
   ========================================================== */
export function FeedPairSim({ E }) {
  /* ⚠️ 2026-09-21: 시작값이 [2, 3, 1, 2] 였다 — **어떻게 눌러도 성공할 수 없는 값**이다.
     번갈아 더하고 빼면 2-3+1-2 = -2 ≠ 0 이라 균등 상태에 도달 자체가 안 된다
     (solve([2,3,1,2]) = -1, 도달 가능한 9개 상태 중 균등은 0개).
     배지가 "모두 0" 이던 시절부터 있던 버그라, 글만 "모두 같게" 로 고쳐도 안 풀렸다.
     project-lead 가 BFS 로 잡았다.
     [1, 3, 3, 1] 은 **두 가지 답**에 닿는다 — (1,1,1,1) 과 (0,0,0,0).
     "꼭 0이 아니어도 돼요" 를 학생이 손으로 확인할 수 있는 값이다. */
  const START = [1, 3, 3, 1];
  const [hunger, setHunger] = useState(START);
  const [ops, setOps] = useState(0);
  const [lastPair, setLastPair] = useState(-1);

  const feedPair = (i) => {
    if (hunger[i] < 1 || hunger[i + 1] < 1) return;
    const next = [...hunger];
    next[i] -= 1;
    next[i + 1] -= 1;
    setHunger(next);
    setOps(ops + 1);
    setLastPair(i);
  };
  const reset = () => { setHunger(START); setOps(0); setLastPair(-1); };
  const allEqual = hunger.every(h => h === hunger[0]);

  return (
    <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
        🐄 {t(E, "Try it: click a pair to feed both", "직접 해보기: 쌍을 눌러 둘 다 먹이기")}
      </div>

      {/* Cow row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>
        {hunger.map((h, i) => (
          <div key={i} style={{
            width: 54, height: 64,
            background: h === 0 ? "#dcfce7" : "#fef3c7",
            border: `2px solid ${h === 0 ? "#15803d" : "#d97706"}`,
            borderRadius: 10,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 22 }}>🐄</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: h === 0 ? "#15803d" : "#92400e" }}>{h}</div>
          </div>
        ))}
      </div>

      {/* Pair feed buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {hunger.slice(0, -1).map((_, i) => {
          const canFeed = hunger[i] >= 1 && hunger[i + 1] >= 1;
          const wasLast = lastPair === i;
          return (
            <button key={i} onClick={() => feedPair(i)} disabled={!canFeed} style={{
              width: 54 + 4 + 54, padding: "4px 0",
              background: canFeed ? (wasLast ? A : "#fff") : "#f1f5f9",
              color: canFeed ? (wasLast ? "#fff" : A) : "#94a3b8",
              border: `1.5px solid ${canFeed ? A : "#cbd5e1"}`,
              borderRadius: 6, fontSize: 11, fontWeight: 700,
              cursor: canFeed ? "pointer" : "not-allowed",
            }}>
              {t(E, `feed (${i},${i + 1})`, `(${i},${i + 1}) 먹이`)}
            </button>
          );
        })}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, fontSize: 12 }}>
        <div style={{ color: "#92400e", fontWeight: 700 }}>
          {t(E, "Feedings:", "먹인 횟수:")} <span style={{ color: A, fontSize: 14 }}>{ops}</span>
          <span style={{ fontWeight: 600, color: "#a16207", marginLeft: 6 }}>
            {t(E, ` = ${ops * 2} bags`, ` = 봉지 ${ops * 2}개`)}
          </span>
        </div>
        {allEqual && (
          <div style={{ color: "#15803d", fontWeight: 700 }}>
            ✅ {t(E, `All equal at ${hunger[0]}!`, `모두 같아요! (값 ${hunger[0]})`)}
          </div>
        )}
        <button onClick={reset} style={{
          background: "transparent", color: "#92400e",
          border: `1px solid ${A}`, borderRadius: 6,
          padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>
          ↺ {t(E, "Reset", "처음")}
        </button>
      </div>

      <div style={{ fontSize: 11, color: "#a16207", marginTop: 8, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Start: [1, 3, 3, 1]. Each click feeds an adjacent pair (both must be ≥ 1). Can you make them all equal? (It does not have to be zero — try landing on all 1s.)",
          "시작: [1, 3, 3, 1]. 한 번 누르면 인접한 쌍을 먹여요 (둘 다 ≥ 1 일 때만). 모두 같게 만들 수 있을까요? (꼭 0이 아니어도 돼요 — 모두 1 로 만드는 길도 있어요.)")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "",
  "def solve(h):",
  "    N = len(h)",
  "",
  "    # Alternating sum: + - + - ...  (decides the final value f)",
  "    f = 0",
  "    for i in range(N):",
  "        if i % 2 == 0:",
  "            sign = 1",
  "        else:",
  "            sign = -1",
  "        f += sign * h[i]",
  "",
  "    if N % 2 == 0:",
  "        if f != 0:",
  "            return -1          # even N: alternating sum must be 0",
  "    else:",
  "        if f < 0:",
  "            return -1          # odd N: final value f must be >= 0",
  "",
  "    # o[i] = bags spent on pair (i, i+1)",
  "    o = [0] * (N - 1)",
  "    last = 0",
  "    for i in range(N - 1):",
  "        o[i] = h[i] - f - last",
  "        if o[i] < 0:",
  "            return -1",
  "        last = o[i]",
  "",
  "    # even N: f is free, so push the even-indexed o[] down by their minimum",
  "    if N % 2 == 0:",
  "        mn = min(o[i] for i in range(0, N - 1, 2))",
  "        for i in range(0, N - 1, 2):",
  "            o[i] -= mn",
  "",
  "    return 2 * sum(o)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    print(solve(h))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "long long solve(const vector<long long>& h) {",
  "    int N = (int)h.size();",
  "",
  "    // Alternating sum: + - + - ...  (decides the final value f)",
  "    long long f = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        long long sign;",
  "        if (i % 2 == 0) {",
  "            sign = 1;",
  "        } else {",
  "            sign = -1;",
  "        }",
  "        f += sign * h[i];",
  "    }",
  "",
  "    if (N % 2 == 0) {",
  "        if (f != 0) {",
  "            return -1;   // even N: alternating sum must be 0",
  "        }",
  "    } else {",
  "        if (f < 0) {",
  "            return -1;    // odd N: final value f must be >= 0",
  "        }",
  "    }",
  "",
  "    // o[i] = bags spent on pair (i, i+1)",
  "    vector<long long> o(N - 1);",
  "    long long last = 0;",
  "    for (int i = 0; i + 1 < N; i++) {",
  "        o[i] = h[i] - f - last;",
  "        if (o[i] < 0) {",
  "            return -1;",
  "        }",
  "        last = o[i];",
  "    }",
  "",
  "    // even N: f is free, push even-indexed o[] down by their minimum",
  "    if (N % 2 == 0) {",
  "        long long mn = o[0];",
  "        for (int i = 0; i < N - 1; i += 2) {",
  "            mn = min(mn, o[i]);",
  "        }",
  "        for (int i = 0; i < N - 1; i += 2) {",
  "            o[i] -= mn;",
  "        }",
  "    }",
  "",
  "    long long bags = 0;",
  "    for (long long x : o) {",
  "        bags += x;",
  "    }",
  "    return 2 * bags;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N;",
  "        cin >> N;",
  "        vector<long long> h(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "        cout << solve(h) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로 참조**한다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라. ── */
export function getDroughtWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "f", ko: "모두가 도달할 마지막 배고픔 값", en: "the final hunger every cow lands on" },
        { v: "o[i]", ko: "쌍 (i, i+1) 에 먹인 횟수", en: "how many times we fed pair (i, i+1)" },
      ],
      beats: [
        { hi: [0, 29], bubble: t(E,
          "First, what is the final hunger f? The alternating sum (+ - + - ...) pins it down — there is only one f that can work.\n\nIf N is even, f must land exactly on 0; if N is odd, f must be 0 or more. Anything else means no feeding plan can work, so answer -1 right away.",
          "먼저 마지막 배고픔 f 부터 정해요.\n교대합(+ − + − …) 이 f 를 하나로 못 박아 줘요.\n\nN 이 짝수면 f 가 정확히 0 이어야 하고, 홀수면 f 가 0 이상이어야 해요.\n그렇지 않으면 어떻게 먹여도 답이 안 나와서 바로 -1 이에요.") },
        { hi: [30, 40], bubble: t(E,
          "Once f is fixed, how many times do we feed pair (i, i+1)? Walking left to right forces it: o[i] = h[i] - f - o[i-1].\nIf any o[i] comes out negative, this f is impossible — return -1.",
          "f 가 정해지면 쌍 (i, i+1) 에 몇 번 먹일지도 따라 정해져요.\n왼쪽부터 보면 o[i] = h[i] − f − o[i−1] 이에요.\no[i] 가 음수로 나오면 불가능하다는 뜻이라 -1 을 돌려줘요.") },
        { hi: [41, 57], bubble: t(E,
          "Why adjust when N is even? f was free to pick, so we may lower every even-indexed o[i] by the same amount without breaking anything — so subtract their minimum to spend as few bags as possible.\n\nSo the answer is 2 * sum(o): one feeding costs 2 bags (one cow each), and o[i] is how many times we fed the pair (i, i+1).",
          "왜 N 이 짝수일 때 더 손봐야 할까요?\nf 를 자유롭게 고를 수 있어서, 짝수 자리 o[i] 를 전부 같은 만큼 줄여도 문제없어요.\n그래서 그중 최솟값만큼 다 같이 빼서 봉지를 최대한 적게 써요.\n\n그래서 답은 2 * sum(o) 예요.\n한 번 먹일 때마다 봉지 2개(소 한 마리씩)가 쓰이고,\no[i] 는 쌍 (i, i+1) 에 먹인 횟수거든요.") },
        { hi: [58, 72], bubble: t(E,
          "Why solve cases one at a time? Each test case is a completely different row of cows. So read T, then solve and print exactly one answer per case.\n\nvector<long long> stores hunger values because they can be up to 1e9 and sums grow large. while (T--) loops over all test cases; solve() is called once per case.",
          "왜 케이스마다 따로 풀까요? 각 테스트 케이스는 서로 다른 소들의 줄이라서예요.\n그래서 T 를 읽고, 케이스마다 따로 풀어 한 줄에 하나씩 답을 출력해요.\n\nvector<long long> 에 배고픔 값을 담아요 — 값이 최대 1e9 라 합이 커질 수 있거든요.\nwhile (T--) 로 모든 테스트 케이스를 돌아요. 케이스마다 solve() 를 한 번씩 불러요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "f", ko: "모두가 도달할 마지막 배고픔 값", en: "the final hunger every cow lands on" },
      { v: "o[i]", ko: "쌍 (i, i+1) 에 먹인 횟수", en: "how many times we fed pair (i, i+1)" },
    ],
    beats: [
      { hi: [0, 19], bubble: t(E,
        "First, what is the final hunger f? The alternating sum (+ - + - ...) pins it down — there is only one f that can work.\n\nIf N is even, f must land exactly on 0; if N is odd, f must be 0 or more. Anything else means no feeding plan can work, so answer -1 right away.",
        "먼저 마지막 배고픔 f 부터 정해요.\n교대합(+ − + − …) 이 f 를 하나로 못 박아 줘요.\n\nN 이 짝수면 f 가 정확히 0 이어야 하고, 홀수면 f 가 0 이상이어야 해요.\n그렇지 않으면 어떻게 먹여도 답이 안 나와서 바로 -1 이에요.") },
      { hi: [20, 28], bubble: t(E,
        "Once f is fixed, how many times do we feed pair (i, i+1)? Walking left to right forces it: o[i] = h[i] - f - o[i-1].\nIf any o[i] comes out negative, this f is impossible — return -1.",
        "f 가 정해지면 쌍 (i, i+1) 에 몇 번 먹일지도 따라 정해져요.\n왼쪽부터 보면 o[i] = h[i] − f − o[i−1] 이에요.\no[i] 가 음수로 나오면 불가능하다는 뜻이라 -1 을 돌려줘요.") },
      { hi: [29, 35], bubble: t(E,
        "Why adjust when N is even? f was free to pick, so we may lower every even-indexed o[i] by the same amount without breaking anything — so subtract their minimum to spend as few bags as possible.\n\nSo the answer is 2 * sum(o): one feeding costs 2 bags (one cow each), and o[i] is how many times we fed the pair (i, i+1).",
        "왜 N 이 짝수일 때 더 손봐야 할까요?\nf 를 자유롭게 고를 수 있어서, 짝수 자리 o[i] 를 전부 같은 만큼 줄여도 문제없어요.\n그래서 그중 최솟값만큼 다 같이 빼서 봉지를 최대한 적게 써요.\n\n그래서 답은 2 * sum(o) 예요.\n한 번 먹일 때마다 봉지 2개(소 한 마리씩)가 쓰이고,\no[i] 는 쌍 (i, i+1) 에 먹인 횟수거든요.") },
      { hi: [36, 41], bubble: t(E,
        "Why solve cases one at a time? Each test case is a completely different row of cows. So read T, then solve and print exactly one answer per case.\n\nlist(map(int, input().split())) reads one line of hunger values into a list.",
        "왜 케이스마다 따로 풀까요? 각 테스트 케이스는 서로 다른 소들의 줄이라서예요.\n그래서 T 를 읽고, 케이스마다 따로 풀어 한 줄에 하나씩 답을 출력해요.\n\nlist(map(int, input().split())) 로 한 줄의 배고픔 값을 리스트로 읽어요.") },
    ],
  };
}

export function getDroughtSections(E) {
  return [
    {
      label: t(E, "1️⃣ Find f, filter -1 right away", "1️⃣ 교대합으로 f 정하고 -1 부터 걸러요"),
      color: A,
      py: FULL_PY.slice(0, 20), cpp: FULL_CPP.slice(0, 30),
      why: [
        t(E, "First, what is the final hunger f? The alternating sum (+ - + - ...) pins it down — there is only one f that can work.",
            "먼저 마지막 배고픔 f 부터 정해요.\n교대합(+ − + − …) 이 f 를 하나로 못 박아 줘요."),
        t(E, "If N is even, f must land exactly on 0; if N is odd, f must be 0 or more. Anything else means no feeding plan can work, so answer -1 right away.",
            "N 이 짝수면 f 가 정확히 0 이어야 하고, 홀수면 f 가 0 이상이어야 해요.\n그렇지 않으면 어떻게 먹여도 답이 안 나와서 바로 -1 이에요."),
      ],
    },
    {
      label: t(E, "2️⃣ Work out o[i]", "2️⃣ o[i] 계산해요"),
      color: "#0891b2",
      py: FULL_PY.slice(20, 29), cpp: FULL_CPP.slice(30, 41),
      why: [
        t(E, "Once f is fixed, how many times do we feed pair (i, i+1)? Walking left to right forces it: o[i] = h[i] - f - o[i-1].\nIf any o[i] comes out negative, this f is impossible — return -1.",
            "f 가 정해지면 쌍 (i, i+1) 에 몇 번 먹일지도 따라 정해져요.\n왼쪽부터 보면 o[i] = h[i] − f − o[i−1] 이에요.\no[i] 가 음수로 나오면 불가능하다는 뜻이라 -1 을 돌려줘요."),
      ],
    },
    {
      label: t(E, "3️⃣ Fix up even N, get the answer", "3️⃣ 짝수 N 보정하고 답을 내요"),
      color: "#16a34a",
      py: FULL_PY.slice(29, 36), cpp: FULL_CPP.slice(41, 58),
      why: [
        t(E, "Why adjust when N is even? f was free to pick, so we may lower every even-indexed o[i] by the same amount without breaking anything — so subtract their minimum to spend as few bags as possible.",
            "왜 N 이 짝수일 때 더 손봐야 할까요?\nf 를 자유롭게 고를 수 있어서, 짝수 자리 o[i] 를 전부 같은 만큼 줄여도 문제없어요.\n그래서 그중 최솟값만큼 다 같이 빼서 봉지를 최대한 적게 써요."),
        t(E, "So the answer is 2 * sum(o): one feeding costs 2 bags (one cow each), and o[i] is how many times we fed the pair (i, i+1).",
            "그래서 답은 2 * sum(o) 예요.\n한 번 먹일 때마다 봉지 2개(소 한 마리씩)가 쓰이고,\no[i] 는 쌍 (i, i+1) 에 먹인 횟수거든요."),
      ],
    },
    {
      label: t(E, "4️⃣ Read and print each case", "4️⃣ 테스트 케이스마다 읽고 출력해요"),
      color: "#7c3aed",
      py: FULL_PY.slice(36), cpp: FULL_CPP.slice(58),
      why: [
        t(E, "Why solve cases one at a time? Each test case is a completely different row of cows. So read T, then solve and print exactly one answer per case.",
            "왜 케이스마다 따로 풀까요? 각 테스트 케이스는 서로 다른 소들의 줄이라서예요.\n그래서 T 를 읽고, 케이스마다 따로 풀어 한 줄에 하나씩 답을 출력해요."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) reads one line of hunger values into a list.",
            "list(map(int, input().split())) 로 한 줄의 배고픔 값을 리스트로 읽어요."),
      ],
      cppOnly: [
        t(E, "vector<long long> stores hunger values because they can be up to 1e9 and sums grow large.",
            "vector<long long> 에 배고픔 값을 담아요 — 값이 최대 1e9 라 합이 커질 수 있거든요."),
        t(E, "while (T--) loops over all test cases; solve() is called once per case.",
            "while (T--) 로 모든 테스트 케이스를 돌아요. 케이스마다 solve() 를 한 번씩 불러요."),
      ],
    },
  ];
}

export function DroughtProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadDroughtPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Drought — Full Study Guide", "Drought — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

