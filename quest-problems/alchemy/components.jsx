// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1229
// 🔒 USACO_VERIFIED (rewritten 2026-06-15)
//   Real problem: USACO 2022 US Open Bronze #3 "Alchemy" (cpid 1229).
//   MAXIMIZE units of metal N. Recipe line is "L M ing1..ingM"
//   (L = product, M = #ingredients). Greedy crafting: to make 1 of m,
//   use stock if any else craft each ingredient first; a failed
//   attempt must NOT consume stock (work on a copy, commit on success).
//   Python: official sample PASS (output 1) — local verify
//   C++:    official sample PASS (output 1) — local verify (g++ -std=c++17)
//   2026-09-22: FULL_PY / FULL_CPP 한 글자도 안 바꿈 — CodeWalk 표시(beats/marks/vars)만
//   추가했다. 코드가 그대로라 재제출 불필요. AC 11/11 (2026-06-16) 그대로 유효.
//   2026-09-24: 선생님 지시("코드는 아이들이 이해하기 쉽게 ... 되도록이면 재귀 사용하지
//   말기") — make() 를 재귀 → todo 스택 반복문으로 바꿨다. 알고리즘은 그대로다(방문
//   순서만 바뀜: 실패하면 trial 전체를 버리므로 부분 되돌리기가 필요 없다).
//   무작위 500케이스 + 공식 샘플: 옛 재귀 코드와 0 불일치. 깊은 체인(N 이 클 때)에서
//   재귀는 RecursionError 위험이 있었는데 반복문은 그 위험이 없다.
//   ⚠️ FULL_PY / FULL_CPP 를 바꿨다 — **USACO 재제출 필요**(cpid=1229). 결과 나오면 이 헤더 갱신.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ================================================================
   Interactive sim: Greedy recipe maker
   Shows the make(metal) crafting process in action on a tiny example.
   Student clicks "Make metal 3" — watch stock get consumed, see
   how many total units of N can be crafted before failure.
   ================================================================ */
export function RecipeSimulator({ E }) {
  // Tiny example: metal 1 + metal 2 -> metal 3
  // Start: 3x metal 1, 2x metal 2, 1x metal 3 already
  const INITIAL = { 1: 3, 2: 2, 3: 1 };
  const RECIPES = { 3: [1, 2] };
  const TARGET = 3;

  const [stock, setStock] = useState({ ...INITIAL });
  const [made, setMade] = useState(0);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  // 2026-09-22 학생 지적: "버튼 색이 성공이든 실패든 똑같아서 글자를 읽어야만 알 수 있었어요."
  // 마지막 시도 성공/실패를 색으로도 보이게 한다.
  const [lastOk, setLastOk] = useState(null);

  const fmt = (m) => t(E, `metal ${m}`, `금속 ${m}`);

  const reset = () => {
    setStock({ ...INITIAL });
    setMade(0);
    setLog([]);
    setLastOk(null);
  };

  // One full attempt at making one unit of TARGET, with step messages.
  const tryMakeOne = () => {
    if (busy) return;
    setBusy(true);
    const local = { ...stock };
    const trace = [];
    let ok = true;

    const make = (m, depth) => {
      const pad = "  ".repeat(depth);
      if (local[m] > 0) {
        local[m] -= 1;
        trace.push({ pad, kind: "use", text: t(E, `use 1 stock of ${fmt(m)}`, `${fmt(m)} 재고 1개 사용`) });
        return true;
      }
      if (!RECIPES[m]) {
        trace.push({ pad, kind: "fail", text: t(E, `no stock and no recipe for ${fmt(m)} → fail`, `${fmt(m)} 재고도 레시피도 없음 → 실패`) });
        return false;
      }
      trace.push({ pad, kind: "open", text: t(E, `need ${fmt(m)} → try recipe`, `${fmt(m)} 필요 → 레시피 시도`) });
      for (const ing of RECIPES[m]) {
        if (!make(ing, depth + 1)) return false;
      }
      return true;
    };

    trace.push({ pad: "", kind: "head", text: t(E, `attempt #${made + 1}: make ${fmt(TARGET)}`, `시도 #${made + 1}: ${fmt(TARGET)} 만들기`) });
    ok = make(TARGET, 1);
    trace.push({ pad: "", kind: ok ? "ok" : "no", text: ok ? t(E, "success ✓", "성공 ✓") : t(E, "cannot continue ✗", "더 못 만들어요 ✗") });

    if (ok) {
      setStock(local);
      setMade(made + 1);
    }
    setLog(trace);
    setLastOk(ok);
    setBusy(false);
  };

  const stockEntries = Object.keys(INITIAL).map(Number).sort((a, b) => a - b);

  const colorOf = (m) => (m === 1 ? "#0891b2" : m === 2 ? "#7c3aed" : A);

  return (
    <div style={{
      background: "#fff7ed",
      border: `1.5px solid ${A}`,
      borderRadius: 12,
      padding: 14,
      marginTop: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        {/* 2026-09-22 학생 지적: "탐욕 알고리즘' 이 이름부터 나와요. 무슨 뜻인지 설명이
            없어요." — 하는 일로 먼저 부르고, 이름은 아래 힌트(다 써본 뒤)에서 붙인다. */}
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>
          🧪 {t(E, "Try crafting", "직접 만들어 보기")}
        </div>
        <div style={{ fontSize: 11, color: "#92400e" }}>
          {t(E, "Recipe: metal 1 + metal 2 → metal 3", "레시피: 금속1 + 금속2 → 금속3")}
        </div>
      </div>

      {/* Stock display */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        {stockEntries.map(m => (
          <div key={m} style={{
            background: "#fff",
            border: `1.5px solid ${colorOf(m)}`,
            borderRadius: 10,
            padding: "8px 12px",
            minWidth: 88,
            textAlign: "center",
            opacity: stock[m] === 0 ? 0.45 : 1,
            transition: "opacity 200ms",
          }}>
            <div style={{ fontSize: 11, color: colorOf(m), fontWeight: 700 }}>{fmt(m)}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1f2937", fontFamily: "'JetBrains Mono', monospace" }}>
              {stock[m]}
            </div>
            <div style={{ fontSize: 10, color: C.dim }}>
              {t(E, "in stock", "재고")}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button
          onClick={tryMakeOne}
          disabled={busy}
          style={{
            // 2026-09-22 학생 지적: "성공이든 실패든 버튼 색이 똑같았어요." 마지막 시도가
            // 실패면 빨강으로 갈라서, 글자를 안 읽어도 결과가 보이게 한다.
            background: lastOk === false ? "#dc2626" : A,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 800,
            cursor: busy ? "default" : "pointer",
            transition: "background .2s",
          }}
        >
          {t(E, `▶ Make 1 metal ${TARGET}`, `▶ 금속${TARGET} 1개 만들기`)}
        </button>
        <button
          onClick={reset}
          style={{
            background: "#fff",
            color: A,
            border: `1.5px solid ${A}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ↺ {t(E, "Reset", "다시 처음부터")}
        </button>
        <div style={{
          background: "#fff",
          border: `1.5px solid ${C.ok}`,
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 12,
          fontWeight: 800,
          color: C.ok,
        }}>
          {t(E, "Total made: ", "총 제작: ")}{made}
        </div>
      </div>

      {/* Trace log */}
      {log.length > 0 && (
        <div style={{
          background: "#1e1b2e",
          color: "#e2e8f0",
          borderRadius: 8,
          padding: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          lineHeight: 1.6,
          maxHeight: 180,
          overflowY: "auto",
        }}>
          {log.map((entry, i) => {
            const tone = entry.kind === "ok" ? "#86efac"
              : entry.kind === "no" || entry.kind === "fail" ? "#fca5a5"
              : entry.kind === "use" ? "#fcd34d"
              : entry.kind === "open" ? "#a5b4fc"
              : "#e2e8f0";
            return (
              <div key={i} style={{ color: tone, whiteSpace: "pre" }}>
                {entry.pad}{entry.text}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: 11, color: "#92400e", marginTop: 8, lineHeight: 1.5, wordBreak: "keep-all" }}>
        {/* 2026-09-22 학생 지적: "'깊이 1' 이 뭘 세는건지 몰랐어요." → 빼고, 하는 일로 풀어 쓴다.
            이름(탐욕적/그리디)은 **여기, 다 써본 뒤에** 처음 붙인다 (reverseeng/wordproc 과 같은 문구). */}
        💡 {t(E,
          "Click ▶ until it fails — that count is the answer. Notice it uses metal 3's own stock first, then falls back to combining metal 1 + metal 2. Always picking what already works right now, without planning ahead, is called a greedy method — you'll meet that name again in the code.",
          "▶ 를 실패할 때까지 눌러봐요 — 그 횟수가 답이에요.\n금속3 재고를 먼저 다 쓰고, 다 쓰면 금속1 + 금속2 조합으로 넘어가요.\n이렇게 지금 당장 되는 것을 그때그때 바로 쓰는 방법을 탐욕적(그리디) 방법이라고 불러요 — 코드에서도 이 이름을 다시 만나요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "have = [0] + list(map(int, input().split()))   # have[i] = units of metal i (1-indexed)",
  "K = int(input())",
  "recipe = [[] for _ in range(N + 1)]             # recipe[i] = ingredients to make 1 of metal i",
  "for _ in range(K):",
  "    nums = list(map(int, input().split()))",
  "    L, M = nums[0], nums[1]                      # L = product, M = #ingredients",
  "    recipe[L] = nums[2:2 + M]",
  "",
  "# Try to make 1 unit of metal m using a working copy of stock.",
  "def make(m, stock):",
  "    todo = [m]                    # metals we still need to check",
  "    while todo:",
  "        cur = todo.pop()",
  "        if stock[cur] > 0:        # have one ready — use it",
  "            stock[cur] -= 1",
  "        elif not recipe[cur]:     # no stock and no recipe — give up",
  "            return False",
  "        else:",
  "            todo.extend(recipe[cur])   # need every ingredient too",
  "    return True",
  "",
  "ans = 0",
  "while True:",
  "    trial = have[:]               # copy: a failed attempt must not eat stock",
  "    if make(N, trial):",
  "        have = trial              # success — commit the consumption",
  "        ans += 1",
  "    else:",
  "        break",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int N, K;",
  "vector<long long> have;        // have[i] = units of metal i in stock",
  "vector<vector<int>> recipe;    // recipe[i] = ingredients to make 1 of metal i",
  "",
  "// Try to make 1 unit of metal m using a working copy of stock.",
  "bool make(int m, vector<long long> &stock) {",
  "    vector<int> todo;",
  "    todo.push_back(m);",
  "    while (!todo.empty()) {",
  "        int cur = todo.back();",
  "        todo.pop_back();",
  "        if (stock[cur] > 0) {",
  "            stock[cur]--;                 // have one ready",
  "        } else if (recipe[cur].empty()) {",
  "            return false;                 // no stock, no recipe",
  "        } else {",
  "            for (int ing : recipe[cur]) {",
  "                todo.push_back(ing);      // need every ingredient too",
  "            }",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    cin >> N;",
  "    have.assign(N + 1, 0);",
  "    for (int i = 1; i <= N; i++) {",
  "        cin >> have[i];",
  "    }",
  "    cin >> K;",
  "    recipe.assign(N + 1, {});",
  "    for (int k = 0; k < K; k++) {",
  "        int L, M;",
  "        cin >> L >> M;          // L = product, M = #ingredients",
  "        recipe[L].resize(M);",
  "        for (int j = 0; j < M; j++) {",
  "            cin >> recipe[L][j];",
  "        }",
  "    }",
  "    long long ans = 0;",
  "    while (true) {",
  "        vector<long long> trial = have;   // copy: failed attempt must not eat stock",
  "        if (make(N, trial)) {",
  "            have = trial;",
  "            ans++;   // commit on success",
  "        } else {",
  "            break;",
  "        }",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getAlchemySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we print? The most units of metal N we can craft.",
            "무엇을 출력해야 하나요?\n금속 N 을 최대 몇 개까지 만들 수 있는지예요."),
        t(E, "First idea: just spend stock while crafting one N. But if the recipe fails halfway, we already spent stock other ingredients still needed.",
            "재고를 바로 깎으며 만들면 어떨까요?\n레시피 중간에 실패하면, 다른 곳에 쓸 재료까지 이미 써버려요."),
        t(E, "So make() tries on a copy of the stock. We only commit the changes when the whole craft succeeds — then repeat until it fails.",
            "그래서 make() 는 재고 복사본에서 먼저 시도해요.\n성공했을 때만 진짜 재고에 반영하고, 실패할 때까지 반복해요."),
      ],
      pyOnly: [
        // 2026-09-22 학생 지적: "sorted 라고 써있는데 실제 코드엔 한 번도 안 나와요."
        // grep -c "sorted(" FULL_PY → 0. list/map 은 실제로 쓰여서(각 2회) 그대로 둔다.
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "파이썬의 list, map 덕분에 코드가 짧아요."),
      ],
      cppOnly: [
        t(E, "Only <iostream> and <vector> needed — no bits/stdc++.h.",
            "필요한 헤더는 <iostream> 과 <vector> 뿐이에요. bits/stdc++.h 는 안 써요."),
        t(E, "Pass stock by reference (vector<long long>&) so make() can consume it.",
            "stock 을 참조로 넘겨야 (vector<long long>&) make() 안에서 꺼내 쓸 수 있어요."),
        t(E, "Copy `have` into `trial` before each attempt; commit only on success.",
            "시도하기 전에 have 를 trial 로 복사해 둬요. 성공했을 때만 옮겨요."),
      ],
    },
  ];
}

/* ================================================================
   CodeWalk 걸음 (2026-09-24 개정 — 재귀 → 반복문)
   생각 순서: 무엇을 내놓나 → make() 는 어떻게 만드나(할 일 목록 방식,
   1쪽 시뮬 경험과 연결) → 몇 번 할 수 있나(먼저 든 순진한 생각 → 복사본으로 고침).

   2026-09-22 에는 이 자리가 재귀(↺)를 가르쳤다. 학생이 5쪽에서 그만뒀다 —
   "함수가 자기 자신을 또 부르는 게 왜 되는 건지 전혀 몰랐어요." →
   2026-09-24 선생님 지시("되도록이면 재귀 사용하지 말기")로 make() 자체를
   재귀 없는 '할 일 목록(todo)' 반복문으로 바꿨다 — 이제 재귀라는 낱말 자체가
   필요 없다. 시뮬(1쪽)이 보여준 "재고 없으면 그 재료부터 만든다" 는 그대로
   유효하다 — 이번엔 함수가 자기를 부르는 대신 할 일 목록에 적어 둔다.
   ================================================================ */
const _ALCHEMY_VARS = [
  { v: "have", ko: "지금 가진 금속 개수(재고)", en: "units of each metal in stock" },
  { v: "recipe", ko: "금속마다 있는 레시피(없을 수도 있음)", en: "each metal's recipe, if it has one" },
  { v: "stock", ko: "make() 함수 안에서 재고를 가리키는 이름 — trial 이 이 이름으로 들어와요", en: "the name make() uses for stock inside itself — trial is passed in under this name" },
  { v: "todo", ko: "아직 확인 안 한 금속들의 할 일 목록", en: "the to-do list of metals we still need to check" },
  { v: "trial", ko: "이번 시도용 재고 복사본", en: "a working copy of stock for this attempt" },
  { v: "ans", ko: "성공한 횟수 = 금속 N 최종 개수", en: "successful crafts = final units of metal N" },
];

export function getAlchemyWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: _ALCHEMY_VARS,
      marks: [
        { from: 10, to: 11, ko: "📋 할 일 목록", en: "📋 the to-do list" },
        { from: 15, to: 16, ko: "✅ 재고 있으면 바로 씀", en: "✅ use stock if ready" },
        { from: 17, to: 18, ko: "🛑 포기", en: "🛑 give up" },
        { from: 20, to: 22, color: "#0d9488", ko: "➕ 목록에 더 넣기", en: "➕ add more to the list" },
      ],
      beats: [
        { hi: [0, 6], bubble: t(E,
          "What do we need to output?\nThe most units of metal N. We need somewhere to keep what we have and each recipe — declared globally since make() needs them too.",
          "무엇을 내놓아야 하나요?\n금속 N 최대 개수예요. 그러려면 가진 것(have)과 레시피(recipe)를 저장해 둬야 해요 — make() 함수도 써야 해서 전역으로 선언해요.") },
        { hi: [8, 26], bubble: t(E,
          "Here's the trick: make() keeps a to-do list (todo) of metals it still needs, starting with just the target itself (📋).\nIt looks at the item on top: if there's stock, use it (✅). If there's no stock and no recipe, give up (🛑) — the whole attempt fails right there. Otherwise, add every ingredient in its recipe to the list (➕) so they get checked too.\nThat's exactly what you clicked in the sim earlier: \"no stock? build that ingredient first.\" We just keep looping until the list is empty — no need for the function to call itself.",
          "여기가 핵심이에요 — make() 는 아직 확인 안 한 금속들의 '할 일 목록(todo)' 을 들고 있어요. 처음엔 목표 금속 하나만 올려둬요(📋).\n목록 맨 위 것을 봐요. 재고 있으면 바로 씀(✅). 재고도 레시피도 없으면 그 자리에서 포기(🛑) — 이번 시도 전체가 실패해요. 그 외엔 레시피에 있는 재료를 전부 목록에 더 넣어요(➕) — 그것들도 확인해야 하니까요.\n아까 시뮬에서 눌러본 '재고 없으면 그 재료부터 만든다' 가 바로 이거예요. 목록이 빌 때까지 반복만 하면 돼요 — 함수가 자기를 다시 부를 필요가 없어요.") },
        { hi: [28, 43], bubble: t(E,
          "Now read the input — N, then have, then each recipe.",
          "이제 입력을 읽어요 — N, 가진 것(have), 레시피(recipe) 차례로요.") },
        { hi: [44, 53], bubble: t(E,
          "Now, how many times can we do this?\nIf we spend have directly, a failed recipe can't undo the stock it already used.\nSo we try on a copy (trial) first, and only commit it to have on success. The count (ans) when it finally fails is the answer.",
          "이제 몇 번 할 수 있을까요?\n바로 have 를 깎으며 만들면, 레시피 중간에 실패했을 때 이미 쓴 재고를 되돌릴 수 없어요.\n그래서 trial 복사본에서 먼저 시도하고, 성공했을 때만 have 에 반영해요. 실패할 때까지 반복한 횟수(ans)가 답이에요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: _ALCHEMY_VARS,
    marks: [
      { from: 11, to: 11, ko: "📋 할 일 목록", en: "📋 the to-do list" },
      { from: 14, to: 15, ko: "✅ 재고 있으면 바로 씀", en: "✅ use stock if ready" },
      { from: 16, to: 17, ko: "🛑 포기", en: "🛑 give up" },
      { from: 19, to: 19, color: "#0d9488", ko: "➕ 목록에 더 넣기", en: "➕ add more to the list" },
    ],
    beats: [
      { hi: [0, 7], bubble: t(E,
        "What do we need to output?\nThe most units of metal N we can craft. First read what we start with (have) and each metal's recipe.",
        "무엇을 내놓아야 하나요?\n금속 N 을 최대 몇 개까지 만들 수 있는지예요. 그러려면 먼저 가진 것(have)과 레시피(recipe)부터 읽어야 해요.") },
      { hi: [9, 20], bubble: t(E,
        "Here's the trick: make() keeps a to-do list (todo) of metals it still needs, starting with just the target itself (📋).\nIt looks at the item on top: if there's stock, use it (✅). If there's no stock and no recipe, give up (🛑) — the whole attempt fails right there. Otherwise, add every ingredient in its recipe to the list (➕) so they get checked too.\nThat's exactly what you clicked in the sim earlier: \"no stock? build that ingredient first.\" We just keep looping until the list is empty.",
        "여기가 핵심이에요 — make() 는 아직 확인 안 한 금속들의 '할 일 목록(todo)' 을 들고 있어요. 처음엔 목표 금속 하나만 올려둬요(📋).\n목록 맨 위 것을 봐요. 재고 있으면 바로 씀(✅). 재고도 레시피도 없으면 그 자리에서 포기(🛑) — 이번 시도 전체가 실패해요. 그 외엔 레시피에 있는 재료를 전부 목록에 더 넣어요(➕) — 그것들도 확인해야 하니까요.\n아까 시뮬에서 눌러본 '재고 없으면 그 재료부터 만든다' 가 바로 이거예요. 목록이 빌 때까지 반복만 하면 돼요.") },
      { hi: [22, 30], bubble: t(E,
        "Now, how many times can we do this?\nFirst idea: just spend real stock while crafting — but if a recipe fails partway, we've already wasted stock other things still need.\nSo we try on a copy (trial) first, and only commit it to have when the whole craft succeeds. The count (ans) when it finally fails is the answer.",
        "이제 이걸 몇 번 할 수 있을까요?\n먼저 이렇게 생각해볼 수 있어요 — 재고를 바로 깎으면서 만들면 어떨까요? 근데 레시피 중간에 실패하면, 다른 곳에 쓸 재고까지 이미 써버려요.\n그래서 복사본(trial)에서 먼저 시도하고, 성공했을 때만 진짜 재고(have)에 반영해요. 더 못 만들 때까지 반복한 횟수(ans)가 답이에요.") },
    ],
  };
}

export function AlchemyProgressiveCode(props) {
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


export function downloadAlchemyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Alchemy — Full Study Guide", "Alchemy — 종합 풀이 노트");
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

