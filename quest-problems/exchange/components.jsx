// 🔒 USACO_VERIFIED — C++17 AC 16/16 on cpid=1396 (2026-06-16 re-submit).
//   Real USACO 2024 Feb Bronze #2 "Milk Exchange" (cpid 1396).
//   O(N) deficit-cow approach: total milk − Σ min(chainSum, M) over each
//   'R…RL…L' chain. Matches all 3 official samples (3 1 RRL 1 1 1 → 2;
//   5 20 LLLLL 3 3 2 3 3 → 14; 9 5 RRRLRRLLR 5 8 4 9 3 4 9 5 4 → 38).
//   2026-09-23: FULL_PY rewritten from brute O(N·M) (TLE at M=1e9) to the
//   same O(N) chain-walk as FULL_CPP. Agrees with brute sim + FULL_CPP on
//   1100+ random cases (500 general, 300 N≤60/M≤15, 300 edge patterns —
//   N=1, all-R, all-L, alternating RLRLRL, huge single chain) and with
//   FULL_CPP on 3 adversarial-chain inputs at N=2e5, M=1e9 (~0.12s each).
//   Python re-submit for AC PENDING — 상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ──────────────────────────────────────────────────────────────
   Full solution — brute simulation of M minutes
   Real Milk Exchange (USACO 2024 Feb Bronze #2).
   ────────────────────────────────────────────────────────────── */
const FULL_PY = [
  "N, M = map(int, input().split())",
  "S = input()               # direction string, e.g. 'RRL'",
  "cap = list(map(int, input().split()))",
  "",
  "# A boundary is an 'R' cow right before an 'L' cow —",
  "# S[i] == 'R' and S[i + 1] == 'L'.",
  "bad_L = [False] * N",
  "bad_R = [False] * N",
  "for i in range(N):",
  "    if S[i] == 'R' and S[(i + 1) % N] == 'L':",
  "        bad_L[i] = True",
  "        bad_R[(i + 1) % N] = True",
  "",
  "ans = sum(cap)",
  "for i in range(N):",
  "    chain = 0",
  "    if bad_L[i]:                # walk the 'R' run behind cow i",
  "        j = (i - 1) % N",
  "        while S[j] == 'R':",
  "            chain += cap[j]",
  "            j = (j - 1) % N",
  "    if bad_R[i]:                # walk the 'L' run ahead of cow i",
  "        j = (i + 1) % N",
  "        while S[j] == 'L':",
  "            chain += cap[j]",
  "            j = (j + 1) % N",
  "    ans -= min(chain, M)",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <numeric>",
  "#include <algorithm>",
  "using namespace std;",
  "typedef long long ll;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    ll M;",
  "    cin >> N >> M;",
  "    string S;",
  "    cin >> S;                          // direction string of 'L'/'R'",
  "    vector<ll> cap(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> cap[i];",
  "    }",
  "",
  "    // A 'deficit pair' is two adjacent cows S[i]=='R', S[i+1]=='L':",
  "    // they trade milk forever and each leaks 1L every minute. Behind",
  "    // the 'R' cow sits a run of consecutive 'R's all pointing toward",
  "    // it; ahead of the 'L' cow sits a run of consecutive 'L's. Each",
  "    // such chain pours its milk into the loop and never gets it back,",
  "    // so over M minutes it loses min(chainSum, M).",
  "    vector<bool> bad_L(N, false), bad_R(N, false);",
  "    for (int i = 0; i < N; i++) {",
  "        if (S[i] == 'R' && S[(i + 1) % N] == 'L') {",
  "            bad_L[i] = true;",
  "            bad_R[(i + 1) % N] = true;",
  "        }",
  "    }",
  "",
  "    ll ans = accumulate(cap.begin(), cap.end(), 0LL);",
  "    for (int i = 0; i < N; i++) {",
  "        ll sum = 0;",
  "        if (bad_L[i]) {                // 'R' run behind cow i",
  "            int j = (i - 1 + N) % N;",
  "            while (S[j] == 'R') {",
  "                sum += cap[j];",
  "                j = (j - 1 + N) % N;",
  "            }",
  "        }",
  "        if (bad_R[i]) {                // 'L' run ahead of cow i",
  "            int j = (i + 1) % N;",
  "            while (S[j] == 'L') {",
  "                sum += cap[j];",
  "                j = (j + 1) % N;",
  "            }",
  "        }",
  "        ans -= min(sum, M);",
  "    }",
  "",
  "    cout << ans << endl;",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로 참조**한다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (이 파일 헤더가 USACO_VERIFIED 라 그 이름 패턴은 보호 변수로 간주된다). ── */
export function getExchangeWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "bad_L / bad_R", ko: "경계('R…RL…L')에 닿은 자리 표시", en: "flags marking cows touching a boundary" },
        { v: "chain", ko: "그 경계가 M분 동안 흘려보내는 우유량", en: "milk this boundary's chain leaks in M minutes" },
      ],
      beats: [
        { hi: [0, 21], bubble: t(E,
          "What do we need before we can follow the milk? N, M, the direction string, and each cow's capacity. So read those first — each cow starts full.",
          "무엇을 알아야 흐름을 따라갈 수 있나요? N, M, 방향 문자열, 그리고 각 소의 용량이에요.\n그러니 이 넷을 먼저 읽어요. 각 소는 가득 찬 채로 시작해요.") },
        { hi: [22, 34], bubble: t(E,
          "Passing milk minute by minute is what the problem describes, but M can be 10^9 — doing that M times is far too slow, in Python or C++. So instead of replaying every minute, find where milk is actually lost.\n\nWhere does milk actually get lost forever? Only at a boundary 'R…RL…L' — an 'R' cow next to an 'L' cow. Those two keep trading milk back and forth forever, and each minute 1L of it leaks into that endless trade. So mark every such boundary first.",
          "매분 우유를 넘기는 게 문제 그대로의 방식이지만, M 이 최대 10^9 라\nM번을 그대로 반복하면 파이썬이든 C++ 이든 너무 느려요.\n그러니 매분을 따라가는 대신, 우유가 실제로 어디서 사라지는지를 찾아요.\n\n우유가 영영 사라지는 곳은 딱 한 군데예요 — 'R…RL…L' 경계, 즉 'R' 소 바로 옆에 'L' 소가 있는 자리예요.\n이 둘은 우유를 끝없이 주고받으며 매분 1L 씩 그 교환 속으로 흘려보내요.\n그러니 그런 경계를 먼저 전부 찾아 표시해요.") },
        { hi: [35, 58], bubble: t(E,
          "Start from the total milk, then for each boundary walk its 'R' run (or 'L' run) and subtract min(chainSum, M) — the milk that chain leaks in M minutes, capped at what it actually has. O(N) overall, so N=2·10^5 / M=10^9 runs instantly.\n\nSums (and M) reach N·10^9, so cap/ans/M use long long; (j - 1 + N) % N keeps the chain walk index positive on a circle.",
          "전체 우유량에서 시작해서, 경계마다 그 'R' 줄기(또는 'L' 줄기)를 따라가며\nmin(chainSum, M) 을 빼요 — M분 동안 그 줄기가 흘려보내는 양인데,\n가진 양을 넘을 순 없으니 M 과 비교해 작은 쪽을 써요.\n전체가 O(N) 이라 N=2·10^5, M=10^9 도 바로 끝나요.\n\n합계와 M 이 N·10^9 까지 가서 cap, ans, M 은 long long 으로 둬요.\n동그란 줄기를 따라갈 때는 (j - 1 + N) % N 으로 자리가 음수가 되지 않게 해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "bad_L / bad_R", ko: "경계('R…RL…L')에 닿은 자리 표시", en: "flags marking cows touching a boundary" },
      { v: "chain", ko: "그 경계가 M분 동안 흘려보내는 우유량", en: "milk this boundary's chain leaks in M minutes" },
    ],
    beats: [
      { hi: [0, 2], bubble: t(E,
        "What do we need before we can follow the milk? N, M, the direction string, and each cow's capacity. So read those first — each cow starts full.",
        "무엇을 알아야 흐름을 따라갈 수 있나요? N, M, 방향 문자열, 그리고 각 소의 용량이에요.\n그러니 이 넷을 먼저 읽어요. 각 소는 가득 찬 채로 시작해요.") },
      { hi: [3, 11], bubble: t(E,
        "Passing milk minute by minute is what the problem describes, but M can be 10^9 — doing that M times is far too slow, in Python or C++. So instead of replaying every minute, find where milk is actually lost.\n\nWhere does milk actually get lost forever? Only at a boundary 'R…RL…L' — an 'R' cow next to an 'L' cow. Those two keep trading milk back and forth forever, and each minute 1L of it leaks into that endless trade. So mark every such boundary first.",
        "매분 우유를 넘기는 게 문제 그대로의 방식이지만, M 이 최대 10^9 라\nM번을 그대로 반복하면 파이썬이든 C++ 이든 너무 느려요.\n그러니 매분을 따라가는 대신, 우유가 실제로 어디서 사라지는지를 찾아요.\n\n우유가 영영 사라지는 곳은 딱 한 군데예요 — 'R…RL…L' 경계, 즉 'R' 소 바로 옆에 'L' 소가 있는 자리예요.\n이 둘은 우유를 끝없이 주고받으며 매분 1L 씩 그 교환 속으로 흘려보내요.\n그러니 그런 경계를 먼저 전부 찾아 표시해요.") },
      { hi: [12, 28], bubble: t(E,
        "Start from the total milk, then for each boundary walk its 'R' run (or 'L' run) and subtract min(chainSum, M) — the milk that chain leaks in M minutes, capped at what it actually has. O(N) overall, so N=2·10^5 / M=10^9 runs instantly.",
        "전체 우유량에서 시작해서, 경계마다 그 'R' 줄기(또는 'L' 줄기)를 따라가며\nmin(chainSum, M) 을 빼요 — M분 동안 그 줄기가 흘려보내는 양인데,\n가진 양을 넘을 순 없으니 M 과 비교해 작은 쪽을 써요.\n전체가 O(N) 이라 N=2·10^5, M=10^9 도 바로 끝나요.") },
    ],
  };
}

export function getExchangeSections(E) {
  return [
    {
      label: t(E, "1️⃣ Take in the values", "1️⃣ 값 받기"),
      color: A,
      py: FULL_PY.slice(0, 3), cpp: FULL_CPP.slice(0, 22),
      why: [
        t(E, "What do we need before we can follow the milk? N, M, the direction string, and each cow's capacity. So read those first — each cow starts full.",
            "무엇을 알아야 흐름을 따라갈 수 있나요? N, M, 방향 문자열, 그리고 각 소의 용량이에요.\n그러니 이 넷을 먼저 읽어요. 각 소는 가득 찬 채로 시작해요."),
      ],
      pyOnly: [],
    },
    {
      label: t(E, "2️⃣ Find the leaking chains", "2️⃣ 새는 줄기 찾기"),
      color: "#0891b2",
      py: FULL_PY.slice(3, 12), cpp: FULL_CPP.slice(22, 35),
      why: [
        t(E, "Passing milk minute by minute is what the problem describes, but M can be 10^9 — doing that M times is far too slow, in Python or C++. So instead of replaying every minute, find where milk is actually lost.",
            "매분 우유를 넘기는 게 문제 그대로의 방식이지만, M 이 최대 10^9 라\nM번을 그대로 반복하면 파이썬이든 C++ 이든 너무 느려요.\n그러니 매분을 따라가는 대신, 우유가 실제로 어디서 사라지는지를 찾아요."),
        t(E, "Where does milk actually get lost forever? Only at a boundary 'R…RL…L' — an 'R' cow next to an 'L' cow. Those two keep trading milk back and forth forever, and each minute 1L of it leaks into that endless trade. So mark every such boundary first.",
            "우유가 영영 사라지는 곳은 딱 한 군데예요 — 'R…RL…L' 경계, 즉 'R' 소 바로 옆에 'L' 소가 있는 자리예요.\n이 둘은 우유를 끝없이 주고받으며 매분 1L 씩 그 교환 속으로 흘려보내요.\n그러니 그런 경계를 먼저 전부 찾아 표시해요."),
      ],
    },
    {
      label: t(E, "3️⃣ Add it up", "3️⃣ 합산 출력"),
      color: "#16a34a",
      py: FULL_PY.slice(12), cpp: FULL_CPP.slice(35),
      why: [
        t(E, "Start from the total milk, then for each boundary walk its 'R' run (or 'L' run) and subtract min(chainSum, M) — the milk that chain leaks in M minutes, capped at what it actually has. O(N) overall, so N=2·10^5 / M=10^9 runs instantly.",
            "전체 우유량에서 시작해서, 경계마다 그 'R' 줄기(또는 'L' 줄기)를 따라가며\nmin(chainSum, M) 을 빼요 — M분 동안 그 줄기가 흘려보내는 양인데,\n가진 양을 넘을 순 없으니 M 과 비교해 작은 쪽을 써요.\n전체가 O(N) 이라 N=2·10^5, M=10^9 도 바로 끝나요."),
      ],
      cppOnly: [
        t(E, "Sums (and M) reach N·10^9, so cap/ans/M use long long; (j - 1 + N) % N keeps the chain walk index positive on a circle.",
            "합계와 M 이 N·10^9 까지 가서 cap, ans, M 은 long long 으로 둬요.\n동그란 줄기를 따라갈 때는 (j - 1 + N) % N 으로 자리가 음수가 되지 않게 해요."),
      ],
    },
  ];
}

export function ExchangeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ──────────────────────────────────────────────────────────────
   ExchangeSim — STATIC worked-example of the official sample.
   (The old interactive sim was built for the WRONG problem and was
    removed during the rewrite to the real Milk Exchange.)
   // TODO: sim redesign for real problem
   ────────────────────────────────────────────────────────────── */
export function ExchangeSim({ E }) {
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        {t(E, "Worked example — Sample 1 (3 cows, RRL, caps 1 1 1, M=1)",
              "풀이 예제 — 샘플 1 (소 3마리, RRL, 용량 1 1 1, M=1)")}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", margin: "0 auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          <thead>
            <tr>
              {["", t(E, "cow 0", "소 0"), t(E, "cow 1", "소 1"), t(E, "cow 2", "소 2"), t(E, "total", "합계")].map((h, i) => (
                <th key={i} style={{ border: `1px solid ${C.border}`, padding: "5px 10px", color: C.dim, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: t(E, "direction", "방향"), cells: ["R", "R", "L"], tot: "", muted: true },
              { label: t(E, "start (full)", "시작 (가득)"), cells: ["1", "1", "1"], tot: "3" },
              { label: t(E, "after 1 min", "1분 후"), cells: ["0", "1*", "1"], tot: "2" },
            ].map((row, ri) => (
              <tr key={ri}>
                <td style={{ border: `1px solid ${C.border}`, padding: "5px 10px", color: C.dim, fontWeight: 700, whiteSpace: "nowrap" }}>{row.label}</td>
                {row.cells.map((c, ci) => (
                  <td key={ci} style={{
                    border: `1px solid ${C.border}`, padding: "5px 12px", textAlign: "center", fontWeight: 700,
                    color: c.includes("*") ? "#92400e" : (row.muted ? "#16a34a" : A),
                    background: c.includes("*") ? "#fef3c7" : "transparent",
                  }}>{c}</td>
                ))}
                <td style={{ border: `1px solid ${C.border}`, padding: "5px 12px", textAlign: "center", fontWeight: 800, color: row.tot ? "#16a34a" : "transparent" }}>{row.tot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, fontSize: 11.5, color: C.text, lineHeight: 1.7, textAlign: "center" }}>
        {t(E,
          "Cow 0→1 (R), Cow 1→2 (R), Cow 2→1 (L). Cow 1 receives from BOTH sides but cap=1, so 1L overflows (yellow *). Total = 0 + 1 + 1 = 2.",
          "소 0→1 (R), 소 1→2 (R), 소 2→1 (L) 로 넘겨요.\n소 1은 양쪽에서 받지만 용량이 1이라 1L 가 넘쳐요 (노랑 *). 합계 = 0 + 1 + 1 = 2.")}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ExchangeRunner — run the real simulation on a chosen sample.
   ────────────────────────────────────────────────────────────── */
const _RUNNER_PRESETS = [
  { label: "3 1 / RRL / 1 1 1", N: 3, M: 1, S: "RRL", cap: [1, 1, 1], out: 2 },
  { label: "5 20 / LLLLL / 3 3 2 3 3", N: 5, M: 20, S: "LLLLL", cap: [3, 3, 2, 3, 3], out: 14 },
  { label: "9 5 / RRRLRRLLR / 5 8 4 9 3 4 9 5 4", N: 9, M: 5, S: "RRRLRRLLR", cap: [5, 8, 4, 9, 3, 4, 9, 5, 4], out: 38 },
];

function _simulate(N, M, S, cap) {
  const cur = cap.slice();
  for (let t = 0; t < M; t++) {
    for (let i = 0; i < N; i++) {
      if (cur[i] > 0) {
        cur[i] -= 1;
        const j = (i + (S[i] === "R" ? 1 : -1) + N) % N;
        cur[j] += 1;
      }
    }
    for (let i = 0; i < N; i++) cur[i] = Math.min(cur[i], cap[i]);
  }
  return cur.reduce((a, b) => a + b, 0);
}

export function ExchangeRunner({ E }) {
  const [pi, setPi] = useState(0);
  const p = _RUNNER_PRESETS[pi];
  const total = _simulate(p.N, p.M, p.S, p.cap);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_RUNNER_PRESETS.map((preset, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{preset.label}</button>
        ))}
      </div>
      <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, textAlign: "center" }}>
        N={p.N}, M={p.M}, S={p.S}<br/>
        cap = [{p.cap.join(", ")}]<br/>
        → {t(E, "total milk after M minutes", "M분 후 총 우유")} = <b>{total}</b>
        {total === p.out && <span> ✅</span>}
      </div>
    </div>
  );
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

export function downloadExchangePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "🥛 Milk Exchange — Full Study Guide", "🥛 Milk Exchange — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Feb Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
