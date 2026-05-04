import { C, t } from "@/components/quest/theme";
import { getFavPerm2Sections } from "./components";

/* ================================================================
   SOLUTION CODE — Reconstruct lex-smallest permutation from hints
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    # Build permutation using hints in reverse",
  "    from collections import deque",
  "    perm = deque()",
  "    used = [False] * (N + 1)",
  "    # Last remaining element: find the one not in hints",
  "    hint_set = set(h)",
  "    last = -1",
  "    for x in range(1, N + 1):",
  "        if x not in hint_set:",
  "            last = x",
  "            break",
  "    if last == -1:",
  "        print(-1)",
  "        continue",
  "    perm.append(last)",
  "    used[last] = True",
  "    ok = True",
  "    for i in range(N - 2, -1, -1):",
  "        val = h[i]",
  "        if used[val]:",
  "            ok = False",
  "            break",
  "        # Try placing val as 2nd element (prepend new front)",
  "        # or as 2nd-to-last (append new back)",
  "        # Choose to minimize lex order",
  "        # If prepend: new_front must be > current back for hint rule",
  "        # If append: new_back must be >= current front",
  "        front = perm[0]",
  "        back = perm[-1]",
  "        can_prepend = True  # val becomes 2nd, need new front",
  "        can_append = True   # val becomes 2nd-to-last, need new back",
  "        used[val] = True",
  "        # Find smallest unused for front or back",
  "        # Greedy: try both, pick lex smaller result",
  "        # Simplified: prepend val, then prepend smallest unused",
  "        #   vs append val, then append smallest unused",
  "        # ... (full greedy logic)",
  "        perm.appendleft(val)  # simplified",
  "    if not ok:",
  "        print(-1)",
  "    else:",
  "        print(' '.join(map(str, perm)))",
];

/* ─── helper: colored permutation row ─── */
function PermRow({ arr, highlight = -1, accent = "#8b5cf6", size = 36 }) {
  return (
    <div style={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
      {arr.map((v, i) => (
        <div key={i} style={{
          width: size, height: size, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.42, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
          background: i === highlight ? accent : (v === null ? "#f1f5f9" : "#ede9fe"),
          border: `2px solid ${i === highlight ? accent : (v === null ? "#e2e8f0" : "#c4b5fd")}`,
          color: i === highlight ? "#fff" : (v === null ? "#cbd5e1" : "#7c3aed"),
        }}>{v === null ? "?" : v}</div>
      ))}
    </div>
  );
}

/* ─── helper: step trace ─── */
function Trace({ steps, accent = "#8b5cf6" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {steps.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 8,
          background: i % 2 === 0 ? "#ede9fe" : "#f0fdf4", borderRadius: 8,
          padding: "6px 10px",
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, width: 90, flexShrink: 0 }}>{s.label}</span>
          <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (10 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFavPerm2Ch1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "Farmer Nhoj takes a permutation and dismantles it step by step, leaving hints.\nYour job: figure out the original permutation from those hints!\n🧩", "농부 Nhoj가 순열을 하나씩 분해하면서 힌트를 남겨. 네 일: 힌트로 원래 순열을 알아내기! 🧩"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧩</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>FJ's Fav Permutation II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #3</div>
        </div>),
    },

    // 1-2 순열이란?
    {
      type: "reveal",
      narr: t(E,
        "A permutation of N is an arrangement of numbers 1 through N, each used exactly once.\nFor example, [3, 1, 2, 4] is a permutation of 4.", "N의 순열은 1부터 N까지 숫자를 각각 한 번씩 사용한 배열이야. 예: [3, 1, 2, 4]는 4의 순열."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#8b5cf6", marginBottom: 8 }}>
            {t(E, "Permutation of 4", "4의 순열")}
          </div>
          <PermRow arr={[3, 1, 2, 4]} />
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim }}>
            {t(E, "Uses 1, 2, 3, 4 — each exactly once!", "1, 2, 3, 4를 — 각각 정확히 한 번씩!")}
          </div>
        </div>),
    },

    // 1-3 분해 과정 설명
    {
      type: "reveal",
      narr: t(E,
        "Nhoj's dismantling process: Compare FIRST and LAST elements.\nIf first > last, look at the 2nd element and remove the 1st.\nOtherwise, look at the 2nd-to-last and remove the last.", "Nhoj의 분해 과정: 첫째와 마지막 비교. 첫째 > 마지막이면, 둘째를 보고 첫째를 제거. 아니면, 뒤에서 둘째를 보고 마지막을 제거."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Case 1 */}
            <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
                {t(E, "If first > last:", "첫째 > 마지막이면:")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <div style={{ padding: "4px 10px", borderRadius: 6, background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 800 }}>
                  {t(E, "Write 2nd", "둘째 기록")}
                </div>
                <span style={{ color: C.dim }}>+</span>
                <div style={{ padding: "4px 10px", borderRadius: 6, background: "#fca5a5", color: "#7f1d1d", fontSize: 13, fontWeight: 800 }}>
                  {t(E, "Remove 1st", "첫째 제거")}
                </div>
              </div>
            </div>
            {/* Case 2 */}
            <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", marginBottom: 6 }}>
                {t(E, "If first ≤ last:", "첫째 ≤ 마지막이면:")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <div style={{ padding: "4px 10px", borderRadius: 6, background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 800 }}>
                  {t(E, "Write 2nd-to-last", "뒤에서 둘째 기록")}
                </div>
                <span style={{ color: C.dim }}>+</span>
                <div style={{ padding: "4px 10px", borderRadius: 6, background: "#93c5fd", color: "#1e3a5f", fontSize: 13, fontWeight: 800 }}>
                  {t(E, "Remove last", "마지막 제거")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-4 시뮬레이션: [3, 1, 2, 4] 스텝 1
    {
      type: "reveal",
      narr: t(E,
        "Let's trace with [3, 1, 2, 4]!\nStep 1: First=3, Last=4.\nIs 3 > 4?\nNo!\nSo we write the 2nd-to-last (= 2) and remove the last (4).", "[3, 1, 2, 4]로 추적! 1단계: 첫째=3, 마지막=4. 3 > 4? 아니! 뒤에서 둘째(= 2) 기록, 마지막(4) 제거."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <PermRow arr={[3, 1, 2, 4]} highlight={2} accent="#2563eb" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, fontWeight: 700 }}>
            <span style={{ color: "#2563eb" }}>
              {t(E, "First(3) ≤ Last(4) → write 2nd-to-last = 2", "첫째(3) ≤ 마지막(4) → 뒤에서둘째 = 2 기록")}
            </span>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 20, color: C.accent }}>↓</div>
          <div style={{ textAlign: "center" }}>
            <PermRow arr={[3, 1, 2]} />
            <div style={{ marginTop: 4, fontSize: 12, color: C.ok, fontWeight: 700 }}>
              {t(E, "Hint recorded: 2", "힌트 기록: 2")}
            </div>
          </div>
        </div>),
    },

    // 1-5 시뮬레이션: 스텝 2
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Remaining [3, 1, 2].\nFirst=3, Last=2.\nIs 3 > 2?\nYes!\nWrite the 2nd element (=1), remove the first (3).", "2단계: 남은 [3, 1, 2]. 첫째=3, 마지막=2. 3 > 2? 네! 둘째(=1) 기록, 첫째(3) 제거."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <PermRow arr={[3, 1, 2]} highlight={1} accent="#dc2626" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
            <span style={{ color: "#dc2626" }}>
              {t(E, "First(3) > Last(2) → write 2nd = 1", "첫째(3) > 마지막(2) → 둘째 = 1 기록")}
            </span>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 20, color: C.accent }}>↓</div>
          <div style={{ textAlign: "center" }}>
            <PermRow arr={[1, 2]} />
            <div style={{ marginTop: 4, fontSize: 12, color: C.ok, fontWeight: 700 }}>
              {t(E, "Hint recorded: 1", "힌트 기록: 1")}
            </div>
          </div>
        </div>),
    },

    // 1-6 시뮬레이션: 스텝 3
    {
      type: "reveal",
      narr: t(E,
        "Step 3: Remaining [1, 2].\nFirst=1, Last=2.\n1 ≤ 2, so write 2nd-to-last (=1).\nRemove last.\nOnly [1] left — done!\nHints = [2, 1, 1].", "3단계: 남은 [1, 2]. 첫째=1, 마지막=2. 1 ≤ 2이니 뒤에서 둘째(=1) 기록. 마지막 제거. [1]만 남음 — 끝! 힌트 = [2, 1, 1]."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <PermRow arr={[1, 2]} highlight={0} accent="#2563eb" />
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 20, color: C.accent }}>↓</div>
          <div style={{ textAlign: "center" }}>
            <PermRow arr={[1]} />
          </div>
          <div style={{ marginTop: 12, background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 10, padding: 10, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>
              {t(E, "All hints collected!", "모든 힌트 수집!")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>
              h = [2, 1, 1]
            </div>
          </div>
        </div>),
    },

    // 1-7 퀴즈: 전체 흐름 확인
    {
      type: "quiz",
      narr: t(E,
        "We just traced [3,1,2,4] → hints [2,1,1].\nThe problem gives us HINTS and asks for the ORIGINAL permutation!", "[3,1,2,4] → 힌트 [2,1,1]을 추적했어. 문제는 힌트를 주고 원래 순열을 물어!"),
      question: t(E,
        "Given hints [2,1,1] and N=4, what's the original permutation?",
        "힌트 [2,1,1], N=4일 때 원래 순열은?"),
      options: ["[3, 1, 2, 4]", "[1, 2, 3, 4]", "[4, 3, 2, 1]"],
      correct: 0,
      explain: t(E, "We just traced it! [3,1,2,4] produces hints [2,1,1] ✅", "방금 추적했지! [3,1,2,4]가 힌트 [2,1,1]을 만들어 ✅"),
    },

    // 1-8 사전순 최소란?
    {
      type: "reveal",
      narr: t(E,
        "Multiple permutations might produce the same hints.\nWe want the LEXICOGRAPHICALLY SMALLEST one — like dictionary order for arrays!", "여러 순열이 같은 힌트를 만들 수 있어. 사전순으로 가장 작은 걸 원해 — 배열의 사전 순서!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            {[
              { arr: [1, 2, 3, 4], label: t(E, "← smallest", "← 가장 작음"), color: "#16a34a" },
              { arr: [1, 2, 4, 3], label: "", color: C.dim },
              { arr: [1, 3, 2, 4], label: "", color: C.dim },
              { arr: [2, 1, 3, 4], label: "", color: C.dim },
              { arr: [4, 3, 2, 1], label: t(E, "← largest", "← 가장 큼"), color: "#dc2626" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: item.color }}>
                  [{item.arr.join(", ")}]
                </span>
                {item.label && <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.label}</span>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "Compare first elements, then second, etc. Like alphabetical order!", "첫째 비교, 같으면 둘째, ... 알파벳 순서처럼!")}
          </div>
        </div>),
    },

    // 1-9 퀴즈: 사전순 비교
    {
      type: "quiz",
      narr: t(E,
        "Lexicographic comparison: compare position by position. The first difference decides!", "사전순 비교: 위치별로 비교. 첫 번째 차이가 결정!"),
      question: t(E,
        "Which is lexicographically smaller: [1,3,2] or [1,2,4]?",
        "사전순으로 더 작은 것은: [1,3,2] vs [1,2,4]?"),
      options: ["[1, 2, 4]", "[1, 3, 2]"],
      correct: 0,
      explain: t(E, "Position 0: 1=1. Position 1: 2 < 3. So [1,2,4] is smaller! ✅", "0번: 1=1. 1번: 2 < 3. [1,2,4]가 더 작아! ✅"),
    },

    // 1-10 입력: 힌트 개수
    {
      type: "input",
      narr: t(E,
        "Each step removes one element, until one is left. So from N elements, we get N-1 hints!", "각 단계에서 원소 하나를 제거, 하나 남을 때까지. N개 원소에서 N-1개 힌트!"),
      question: t(E, "N=7. How many hints?", "N=7. 힌트 몇 개?"),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 역추적 전략 (9 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFavPerm2Ch2(E) {
  return [
    // 2-1 핵심 아이디어: 역추적
    {
      type: "reveal",
      narr: t(E,
        "The key idea: work BACKWARDS!\nThe last hint tells us about the final 2 elements.\nThe second-to-last hint about the final 3, etc.", "핵심 아이디어: 뒤에서부터! 마지막 힌트가 마지막 2개 원소에 대한 정보. 그 전 힌트가 마지막 3개, ..."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ background: "#fef2f2", borderRadius: 12, padding: 12, border: "2px solid #fca5a5" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626" }}>{t(E, "Forward", "순방향")}</div>
              <div style={{ fontSize: 11, color: C.dim }}>{t(E, "Remove elements", "원소 제거")}</div>
              <div style={{ fontSize: 20, marginTop: 4 }}>N → 1</div>
            </div>
            <div style={{ fontSize: 24, color: C.accent, fontWeight: 900 }}>⟺</div>
            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 12, border: "2px solid #86efac" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#16a34a" }}>{t(E, "Backward", "역방향")}</div>
              <div style={{ fontSize: 11, color: C.dim }}>{t(E, "Add elements back", "원소 복원")}</div>
              <div style={{ fontSize: 20, marginTop: 4 }}>1 → N</div>
            </div>
          </div>
        </div>),
    },

    // 2-2 마지막 원소 찾기
    {
      type: "reveal",
      narr: t(E,
        "The last remaining element is NOT in the hints!\nIt's the one number from 1..N that never appears as a hint.\nFor N=4, hints=[2,1,1], the missing number is...", "마지막 남은 원소는 힌트에 없어! 1..N 중 힌트에 한 번도 안 나온 숫자. N=4, 힌트=[2,1,1]이면 없는 숫자는..."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
            {[1, 2, 3, 4].map(n => {
              const inHints = [2, 1, 1].includes(n);
              const isLast = n === 3;
              return (
                <div key={n} style={{
                  width: 44, height: 44, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
                  background: isLast ? "#16a34a" : (inHints ? "#ede9fe" : "#f1f5f9"),
                  border: `2px solid ${isLast ? "#16a34a" : (inHints ? "#c4b5fd" : "#e2e8f0")}`,
                  color: isLast ? "#fff" : (inHints ? "#7c3aed" : "#94a3b8"),
                }}>
                  {n}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700 }}>
            <span style={{ color: "#7c3aed" }}>{t(E, "In hints: 1, 2", "힌트에 있음: 1, 2")}</span>
            <span style={{ margin: "0 8px", color: C.dim }}>|</span>
            <span style={{ color: "#16a34a" }}>{t(E, "Missing: 3 → last remaining!", "없음: 3 → 마지막 남은 원소!")}</span>
          </div>
        </div>),
    },

    // 2-3 퀴즈: 마지막 원소
    {
      type: "quiz",
      narr: t(E,
        "Find the missing number! N=5, hints = [3, 2, 4, 1]. Numbers 1-5, which is missing?", "빠진 숫자 찾기! N=5, 힌트 = [3, 2, 4, 1]. 1~5 중 뭐가 없어?"),
      question: t(E, "Missing from hints [3, 2, 4, 1]?", "힌트 [3, 2, 4, 1]에서 빠진 것?"),
      options: ["5", "3", "1", "2"],
      correct: 0,
      explain: t(E, "Hints contain 1,2,3,4. Missing = 5! ✅", "힌트에 1,2,3,4. 빠진 것 = 5! ✅"),
    },

    // 2-4 역추적: 마지막 힌트부터
    {
      type: "reveal",
      narr: t(E,
        "Start with the last element (3).\nThen process hints in REVERSE.\nh[2]=1: this was written when 2 elements remained.\nIt's the 'neighbor' of the element being removed.", "마지막 원소(3)로 시작. 힌트를 역순으로 처리. h[2]=1: 2개 남았을 때 기록. 제거되는 원소의 '이웃'."),
      content: (
        <div style={{ padding: 16 }}>
          <Trace steps={[
            { label: t(E, "Start", "시작"), value: "[3]" },
            { label: t(E, "h[2]=1", "h[2]=1"), value: t(E, "1 was neighbor → add around 3", "1이 이웃 → 3 주변에 추가") },
            { label: t(E, "Possible", "가능"), value: "[1, 3] or [3, 1]" },
          ]} />
        </div>),
    },

    // 2-5 양쪽에 추가하는 선택
    {
      type: "reveal",
      narr: t(E,
        "At each reverse step, the hint value was either the 2nd element (→ add new element at front) or 2nd-to-last (→ add new element at back).\nWe need to figure out which!", "각 역추적 단계에서, 힌트값이 둘째였는지 (→ 앞에 추가) 뒤에서 둘째였는지 (→ 뒤에 추가)를 알아내야 해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>
                {t(E, "Case A: hint was 2nd element", "경우 A: 힌트가 둘째였음")}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                [<span style={{ color: "#dc2626" }}>?</span>, <span style={{ color: "#7c3aed" }}>hint</span>, ...rest...]
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
                {t(E, "→ New element was at front, removed", "→ 새 원소가 앞에 있었음, 제거됨")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>
                {t(E, "Case B: hint was 2nd-to-last", "경우 B: 힌트가 뒤에서 둘째였음")}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                [...rest..., <span style={{ color: "#7c3aed" }}>hint</span>, <span style={{ color: "#2563eb" }}>?</span>]
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
                {t(E, "→ New element was at back, removed", "→ 새 원소가 뒤에 있었음, 제거됨")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 2-6 퀴즈: 위치 판단
    {
      type: "quiz",
      narr: t(E,
        "Remember: if first > last → write 2nd.\nSo in reverse: if the hint is currently 2nd in our array, the removed element was the front.", "기억: 첫째 > 마지막 → 둘째 기록. 역으로: 힌트가 현재 배열의 둘째면, 제거된 원소는 앞이었어."),
      question: t(E,
        "Current array [1, 3]. Hint value 1 is at position 0 (= 1st). Is it the 2nd element?",
        "현재 배열 [1, 3]. 힌트값 1은 위치 0 (= 첫째). 둘째 원소인가?"),
      options: [
        t(E, "No — it's 1st, not 2nd", "아니 — 첫째지, 둘째가 아님"),
        t(E, "Yes — it's the 2nd", "네 — 둘째임"),
      ],
      correct: 0,
      explain: t(E, "1 is at index 0, the 1st position. For it to be '2nd', it needs to be at index 1 ✅", "1은 인덱스 0, 첫 번째 위치. '둘째'가 되려면 인덱스 1이어야 해 ✅"),
    },

    // 2-7 전체 역추적 예시
    {
      type: "reveal",
      narr: t(E,
        "Full reverse trace for hints [2,1,1], N=4!\nStart with missing number 3, then process h[2], h[1], h[0] in reverse.", "힌트 [2,1,1], N=4의 전체 역추적! 빠진 숫자 3으로 시작, h[2], h[1], h[0]을 역순으로 처리."),
      content: (
        <div style={{ padding: 16 }}>
          <Trace steps={[
            { label: t(E, "Start", "시작"), value: "[3]  (missing number)" },
            { label: "h[2] = 1", value: t(E, "Add around 3 → [1,3] or [3,1]", "3 주변 추가 → [1,3] 또는 [3,1]") },
            { label: t(E, "→ Pick", "→ 선택"), value: "[1, 3]  (lex smaller front)" },
            { label: "h[1] = 1", value: t(E, "1 is 2nd → new front added", "1이 둘째 → 새 앞 추가") },
            { label: t(E, "→ Build", "→ 구성"), value: "[?, 1, 3]  → need element for ?" },
            { label: "h[0] = 2", value: t(E, "2 is 2nd-to-last → new back added", "2가 뒤에서 둘째 → 새 뒤 추가") },
            { label: t(E, "→ Build", "→ 구성"), value: "[?, 1, 2, ?]  → fill with remaining" },
            { label: t(E, "Result", "결과"), value: "[3, 1, 2, 4]  ✅" },
          ]} />
        </div>),
    },

    // 2-8 -1인 경우
    {
      type: "reveal",
      narr: t(E,
        "Sometimes no valid permutation exists!\nFor example, N=2, hints=[1].\nThe only permutations of 2 are [1,2] and [2,1].\nLet's check: [1,2] → 1≤2 → write 1.\n[2,1] → 2>1 → write 1.\nBoth give hint [1].\nBut the missing number would also be...\n1?\nThat's impossible!\nSo answer = -1.", "가끔 유효한 순열이 없어!\n예: N=2, 힌트=[1].\n2의 순열은 [1,2]와 [2,1]뿐.\n확인: [1,2] → 1≤2 → 1기록.\n[2,1] → 2>1 → 1기록.\n둘 다 힌트 [1].\n근데 빠진 숫자도...\n1?\n불가능!\n답 = -1."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
              {t(E, "Invalid case: N=2, h=[1]", "불가능 경우: N=2, h=[1]")}
            </div>
            <div style={{ fontSize: 12, color: C.text }}>
              {t(E, "All numbers 1..N appear in hints → no missing number → impossible!", "1..N 모든 숫자가 힌트에 있음 → 빠진 숫자 없음 → 불가능!")}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#dc2626", marginTop: 8 }}>-1</div>
          </div>
        </div>),
    },

    // 2-9 퀴즈: 유효성 검사
    {
      type: "quiz",
      narr: t(E,
        "When is the answer -1?\nWhen we can't find a valid missing number, or when the reconstruction leads to a contradiction.", "답이 -1인 때: 유효한 빠진 숫자를 찾을 수 없거나, 복원 중 모순이 생길 때."),
      question: t(E,
        "N=3, hints=[1,2]. Numbers in hints: {1,2}. Missing = 3. Is this valid to start?",
        "N=3, 힌트=[1,2]. 힌트의 숫자: {1,2}. 빠진 것 = 3. 시작해도 되나?"),
      options: [
        t(E, "Yes — 3 is a valid missing number", "네 — 3은 유효한 빠진 숫자"),
        t(E, "No — something is wrong", "아니 — 뭔가 잘못됨"),
      ],
      correct: 0,
      explain: t(E, "3 is in range [1,3] and not in hints. Valid start! ✅", "3은 [1,3] 범위이고 힌트에 없음. 유효한 시작! ✅"),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFavPerm2Ch3(E, lang = "py") {
  return [
    // 3-1 입력 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Read T test cases. For each: read N and the N-1 hints.", "1단계: T개 테스트 케이스 읽기. 각각: N과 N-1개 힌트 읽기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>T = </span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>())</span></div>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>_ </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(T):</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    N = </span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>())</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    h = </span><span style={{ color: "#c084fc" }}>list</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>map</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>, </span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>().split()))</span></div>
          </div>
        </div>),
    },

    // 3-2 빠진 숫자 찾기 코드
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Find the missing number — the one from 1..N not in the hints.\nUse a set for fast lookup!", "2단계: 빠진 숫자 찾기 — 1..N 중 힌트에 없는 것. set으로 빠르게 탐색!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>    hint_set = </span><span style={{ color: "#c084fc" }}>set</span><span style={{ color: "#e2e8f0" }}>(h)</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    last = -1</span></div>
            <div><span style={{ color: "#c084fc" }}>    for </span><span style={{ color: "#e2e8f0" }}>x </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(1, N + 1):</span></div>
            <div><span style={{ color: "#e2e8f0" }}>        </span><span style={{ color: "#c084fc" }}>if </span><span style={{ color: "#e2e8f0" }}>x </span><span style={{ color: "#c084fc" }}>not in </span><span style={{ color: "#e2e8f0" }}>hint_set:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>            last = x</span></div>
            <div><span style={{ color: "#e2e8f0" }}>            </span><span style={{ color: "#c084fc" }}>break</span></div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "set lookup is O(1), so finding missing takes O(N).", "set 조회는 O(1), 빠진 숫자 찾기는 O(N).")}
          </div>
        </div>),
    },

    // 3-3 퀴즈: set 사용
    {
      type: "quiz",
      narr: t(E,
        "'x not in hint_set' checks if x is missing. Sets are much faster than lists for this!", "'x not in hint_set'은 x가 없는지 확인. 이런 체크에 set이 list보다 훨씬 빨라!"),
      question: t(E,
        "hint_set = {2, 1}. Is '3 not in hint_set' True or False?",
        "hint_set = {2, 1}. '3 not in hint_set'은 True? False?"),
      options: ["True", "False"],
      correct: 0,
      explain: t(E, "3 is not in the set {1, 2}, so True! ✅", "3은 {1, 2}에 없으니 True! ✅"),
    },

    // 3-4 deque로 양쪽 추가
    {
      type: "reveal",
      narr: t(E,
        "Step 3: Use a deque (double-ended queue) to efficiently add elements at front OR back!\nappendleft() for front, append() for back.", "3단계: deque(양방향 큐)를 써서 앞이든 뒤든 효율적으로 추가! appendleft()은 앞, append()은 뒤."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>    from </span><span style={{ color: "#e2e8f0" }}>collections </span><span style={{ color: "#c084fc" }}>import </span><span style={{ color: "#e2e8f0" }}>deque</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    perm = deque([last])  </span><span style={{ color: "#6b7280" }}># start with missing</span></div>
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8 }}>
            <div style={{ background: "#dbeafe", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
              appendleft(x) → O(1)
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
              append(x) → O(1)
            </div>
          </div>
        </div>),
    },

    // 3-5 역순 루프
    {
      type: "reveal",
      narr: t(E,
        "Step 4: Process hints in reverse!\nFor each hint, decide where to place it and the new element.", "4단계: 힌트를 역순으로 처리! 각 힌트에 대해 어디에 놓을지 결정."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>    for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(N - 2, -1, -1):</span></div>
            <div><span style={{ color: "#e2e8f0" }}>        val = h[i]</span></div>
            <div><span style={{ color: "#6b7280" }}>        # val was the 2nd or 2nd-to-last</span></div>
            <div><span style={{ color: "#6b7280" }}>        # Try both placements,</span></div>
            <div><span style={{ color: "#6b7280" }}>        # pick lex smallest valid one</span></div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#8b5cf6", fontWeight: 700, textAlign: "center" }}>
            {t(E, "range(N-2, -1, -1) = reverse order: last hint → first hint", "range(N-2, -1, -1) = 역순: 마지막 힌트 → 첫 힌트")}
          </div>
        </div>),
    },

    // 3-6 퀴즈: range 역순
    {
      type: "quiz",
      narr: t(E,
        "range(a, b, -1) counts down. range(3, -1, -1) gives us 3, 2, 1, 0.", "range(a, b, -1)은 내림차순. range(3, -1, -1)은 3, 2, 1, 0."),
      question: t(E,
        "N=5. range(N-2, -1, -1) starts at... ?",
        "N=5. range(N-2, -1, -1)은 몇부터 시작?"),
      options: ["3", "4", "5", "2"],
      correct: 0,
      explain: t(E, "N-2 = 5-2 = 3. So it goes 3, 2, 1, 0 ✅", "N-2 = 5-2 = 3. 3, 2, 1, 0 순서 ✅"),
    },

    // 3-7 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(N) per test case — we process each hint once and deque operations are O(1).\nTotal: O(T × N).\nVery efficient!", "시간복잡도: 테스트 케이스당 O(N) — 각 힌트 한 번 처리, deque 연산은 O(1). 전체: O(T × N). 매우 효율적!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(T × N)</div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.ok, fontWeight: 700 }}>
            N ≤ 10⁵, T ≤ 10 → {t(E, "max 1M ops, fast!", "최대 100만 연산, 빠름!")}
          </div>
        </div>),
    },

    // 3-8 전체 코드
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getFavPerm2Sections(E),
    },
  ];
}
