// 🔒 USACO_VERIFIED (2026-05-13, 코드 재작성 2026-07-13 — 재검증 필요)
//   Python: 13/13 PASS — 원본 검증. **2026-07-13 input()·map 입력, 긴 and 조건 → 중첩 if
//           (short-circuit 유지·로컬 stress 0.54s), lru_cache → dict 메모 패턴 재작성.
//           can() 을 for 루프 밖 전역으로 이동(memo 전역 + memo.clear()), 컴프리헨션
//           (tuple/all) 을 명시적 for 루프로 풀어씀 — 학생 가독성. 로컬 실행 정답 확인.**
//   C++:    13/13 PASS — 원본 검증. **2026-07-13 std::function 람다 → 일반 함수,
//           map<pair<vector,int>> → map<string,bool> 재작성. 변수명 전면 정리
//           (pos/target/budget/copies/block_len/cut/left_budget). 알고리즘 동일하나
//           USACO 재제출로 pass 확인 권장.**
//   **2026-07-17 (선생님 지시): 베이스 케이스 if/else → 조기 return 재구조 (PY/CPP/EN 4벌).
//     "베이스 케이스가 else 밑에 있지 않았으면" — 나머지 로직이 else 안에 갇힌 모양 제거.
//     동작 동일(베이스는 메모 생략 — 정답 불변). 로컬 샘플 검증 필요, USACO 재제출 권장.**
//   **2026-07-17-b (선생님 지시): "재귀함수 보기 어렵다 — function 을 따로 만들까?"
//     요령 ①②③ 을 is_all_same / try_repeat / try_cut 함수로 분리 — can() 이
//     계획(메모확인 → ✋베이스 → ①→②→③)과 똑같이 ~20줄로 읽힘. 알고리즘 불변.
//     로컬 검증: 이전 버전 vs 분리 버전 300 랜덤 케이스 출력 동일. USACO 재제출 권장.**
//   **2026-07-17-c (선생님): "요령 통째로 빼니 재귀같아 보이지 않아" — 분리 기준 수정.
//     재귀 없는 잡일만 도우미로(is_all_same/is_repeat_of/slice), can(...) 호출 3개는
//     전부 can() 본문에 — 가독성 + 재귀 가시성 동시 확보. 전방선언 불필요해짐.
//     로컬 검증: 직전 버전 vs 300 랜덤 동일, CPP 컴파일·교차 동일. USACO 재제출 권장.**
//   **2026-07-17-d (선생님): "아~ 넘 길어" — can/solve 접수처 패턴으로 최종 단축.
//     can(4줄)=공책 확인/기록, solve=요령 셋 — 되는 순간 바로 return (result/break
//     장부 전부 제거). PY 70줄·solve 본문 ~26줄. 로컬 검증: 직전 vs 300 랜덤 동일,
//     CPP 컴파일·교차 동일. USACO 재제출 권장.**
//   **2026-07-17-e (선생님): "더 이해하기 쉽게" — 요령② copies 셈법 제거.
//     for copies → for block_len in range(1, n) 직접 순회 (같은 탐색 집합,
//     n//copies 암산 불필요). 말풍선에 구체 예시([7 7 7]/[1 2 1 2]/[1 1 2 2]) 추가.
//     로컬 검증: 직전 vs 300 랜덤 동일, CPP 컴파일·교차 동일. USACO 재제출 권장.**
//   **2026-07-18-h (선생님 "이 코드는 통과한다. 재귀를 번외로 두고 다시 작성"):
//     주 풀이 = **비재귀 '할 일 목록(스택)' + 메모** (PSQ_STK_* 4벌 신규).
//     경위: bottom-up 표 전부 채우기는 파이썬에서 TLE (T=100 최악 9.9s, 제한 4s).
//     원인은 재귀 여부가 아니라 '게으름' — 재귀는 도달하는 ~315칸만 계산하는데
//     표 채우기는 15,150칸 전부 채움(48배). 그래서 '필요한 것만' 을 스택으로 구현.
//     로컬: 재귀 검증본과 랜덤 500+300 출력 동일, 공식샘플 일치,
//     최악 T=100 → py 0.50s / cpp 0.02s (재귀 py 0.46s 와 동급). 선생님이 실제 제출로 통과 확인.
//     재귀본(PSQ_FAST_*)은 🎁 번외로 유지. **USACO 재제출로 최종 확인 권장.**
//   **2026-07-17-g (선생님 "재귀는 힘들어. 재귀 아니어도 되면 다 없애줘"): 주/번외 스왑 —
//     bottom-up 표 채우기(PSQ_BU_*)를 **주 풀이**로 승격(chapters 2-1, 초록), 재귀본(PSQ_FAST_*)은
//     **재귀 심화편**으로 강등(2-2, 청록). 재귀 스캐폴딩(재귀 다리·PlanSim)도 심화 앞으로 이동.
//     getPrintseqBuWalk 말풍선을 '본편 참조' 제거하고 자립형으로 재작성. 코드 배열/검증 불변.**
//   **2026-07-17-f (선생님): "번외편으로 재귀 아닌 방법도" — 🎁 bottom-up 표 채우기 추가.
//     PSQ_BU_* 4벌 (신규 코드, 본편과 별개): made[(i,j,k)] 답 표를 작은 조각부터 채움 —
//     ↺재귀 자리가 📖표 읽기로. 로컬 검증: 재귀 본편과 300 랜덤 + N=100 출력 동일(0.13s),
//     CPP 컴파일·교차 동일. top-down ↔ bottom-up 대비가 학습 목적 (DP 두 얼굴).**
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#16a34a";

const PSQ_SAMPLE = ["2", "1 1", "1", "4 1", "1 1 1 1"];

/* ════════════════════════════════════════════════════════════════════
   PrintseqExplorer — pick a sequence + K, see YES/NO live.
   ════════════════════════════════════════════════════════════════════ */
const PSQ_PRESETS = [
  { name: "[1] K=1", seq: [1], K: 1 },
  { name: "[1,1,1,1] K=1", seq: [1, 1, 1, 1], K: 1 },
  { name: "[1,2,1,2] K=2", seq: [1, 2, 1, 2], K: 2 },
  { name: "[1,1,2,2] K=2", seq: [1, 1, 2, 2], K: 2 },
  { name: "[1,2,3] K=2", seq: [1, 2, 3], K: 2 },
  { name: "[1,2,3] K=3", seq: [1, 2, 3], K: 3 },
];

// JS port of the recursive checker (small inputs, plain memo).
function canProduce(seq, k, memo) {
  const key = seq.join(",") + "|" + k;
  if (memo.has(key)) return memo.get(key);
  if (seq.length === 0 || k <= 0) { memo.set(key, false); return false; }
  // A: all same → 1 PRINT
  if (seq.every(x => x === seq[0]) && k >= 1) { memo.set(key, true); return true; }
  const n = seq.length;
  // B: repeating block (m ≥ 2 copies, block_len = n/m)
  for (let m = 2; m <= n; m++) {
    if (n % m !== 0) continue;
    const bl = n / m;
    let ok = true;
    for (let i = 0; i < n && ok; i++) if (seq[i] !== seq[i % bl]) ok = false;
    if (ok) {
      if (canProduce(seq.slice(0, bl), k, memo)) { memo.set(key, true); return true; }
    }
  }
  // C: split + budget split
  for (let split = 1; split < n; split++) {
    for (let k1 = 1; k1 < k; k1++) {
      if (canProduce(seq.slice(0, split), k1, memo) &&
          canProduce(seq.slice(split), k - k1, memo)) {
        memo.set(key, true); return true;
      }
    }
  }
  memo.set(key, false); return false;
}

export function PrintseqExplorer({ E }) {
  const [pi, setPi] = useState(0);
  const preset = PSQ_PRESETS[pi];
  const result = canProduce(preset.seq, preset.K, new Map());

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 6, marginBottom: 14 }}>
        {PSQ_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "5px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#dcfce7" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
        {preset.seq.map((v, i) => (
          <div key={i} style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
            background: "#fff", border: `1px solid ${C.border}`, color: C.text,
          }}>{v}</div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 12, fontSize: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>K = {preset.K}</span>
        <span style={{ color: C.dim }}>·</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>N = {preset.seq.length}</span>
      </div>

      <div style={{
        background: result ? "#dcfce7" : "#fee2e2",
        border: `1.5px solid ${result ? "#16a34a" : "#ef4444"}`,
        borderRadius: 10, padding: "12px 14px", textAlign: "center",
        fontSize: 18, fontWeight: 700,
        color: result ? "#15803d" : "#7f1d1d",
      }}>
        {result ? "✅ YES" : "❌ NO"}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, lineHeight: 1.55 }}>
        {t(E,
          "Try each preset. Notice K=1 only handles all-same sequences. K=2 covers blocks like (a^x)(b^y) or alternating (ab)·m. K=3 adds more flexibility.",
          "각 preset 시도. K=1 은 모두 같은 수열만. K=2 는 (a^x)(b^y) 또는 (ab)·m 같은 블록. K=3 부터 더 자유.")}
      </div>
    </div>
  );
}

export function PrintseqSim({ E }) { return <PrintseqExplorer E={E} />; }
export function PrintseqRunner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 5 sections.
   1. Input loop                — read T, then per case
   2. Define recursive can()    — base cases (empty, k<=0)
   3. Option A — all same       — k ≥ 1 → True
   4. Options B + C             — repeating block + split
   5. Memoize + full code       — lru_cache, output YES/NO
   ════════════════════════════════════════════════════════════════════ */

const PSQ_S1_PY = [
  "T = int(input())               # 테스트 케이스 수",
  "for _ in range(T):",
  "    # 첫 줄: N K → map 으로 한 번에 int 두 개",
  "    N, K = map(int, input().split())   # N=목표 길이(참고), K=PRINT 예산",
  "",
  "    # 다음 줄: 목표 수열 → tuple",
  "    #  (tuple 이어야 나중에 '메모'의 열쇠로 쓸 수 있어요)",
  "    target = tuple(map(int, input().split()))",
  "    # 이 케이스 풀기 (다음 단계에서)",
];
const PSQ_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        vector<int> a(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> a[i];",
  "        }",
  "        // solve case (next steps)",
  "    }",
];

const PSQ_S2_PY = [
  "# can(seq, budget): 수열 seq 를 PRINT budget 개 이하로 만들 수 있나? (YES/NO)",
  "def can(seq, budget):",
  "    # 막다른 길 먼저: 빈 수열이거나 예산이 없으면 불가능",
  "    if len(seq) == 0:",
  "        return False",
  "    if budget <= 0:",
  "        return False",
  "    # ... (요령 ①②③ 은 다음 단계에서)",
  "    return False",
];
const PSQ_S3_PY = [
  "def can(seq, budget):",
  "    if len(seq) == 0 or budget <= 0:",
  "        return False",
  "",
  "    # 요령 ①: 숫자가 다 같은지 확인 (하나라도 다르면 all_same = False)",
  "    all_same = True",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            all_same = False",
  "            break",
  "    if all_same:",
  "        return True   # PRINT 1 개를 REP 로 감싸면 끝",
  "",
  "    return False  # (요령 ②③ 은 다음 단계)",
];

const PSQ_S4_PY = [
  "def can(seq, budget):",
  "    if len(seq) == 0 or budget <= 0:",
  "        return False",
  "",
  "    # 요령 ①: 다 같은지 확인",
  "    all_same = True",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            all_same = False",
  "            break",
  "    if all_same:",
  "        return True",
  "",
  "    n = len(seq)",
  "",
  "    # 요령 ②: 같은 블록이 copies 번 반복되는 모양이면",
  "    #         → REP copies 로 감싸면 되니, 블록만 풀면 됨",
  "    for copies in range(2, n + 1):",
  "        if n % copies == 0:",
  "            block_len = n // copies",
  "            block = seq[:block_len]",
  "",
  "            # 정말 이 블록이 계속 반복되는지 확인",
  "            is_repeat = True",
  "            for i in range(n):",
  "                if seq[i] != block[i % block_len]:",
  "                    is_repeat = False",
  "                    break",
  "            if is_repeat:",
  "                if can(block, budget):    # 같은 질문, 더 작게! (재귀)",
  "                    return True",
  "",
  "    # 요령 ③: 둘로 잘라서 예산을 나눠 갖기",
  "    #         왼쪽이 left_budget 개, 오른쪽이 나머지",
  "    for cut in range(1, n):",
  "        for left_budget in range(1, budget):",
  "            left = seq[:cut]",
  "            right = seq[cut:]",
  "            right_budget = budget - left_budget",
  "            if can(left, left_budget):           # 왼쪽 되나?",
  "                if can(right, right_budget):     # 오른쪽도 되나?",
  "                    return True                  # 둘 다 → 성공!",
  "",
  "    return False   # 세 요령 다 실패 → 불가능",
];
const PSQ_FAST_PY = [
  "T = int(input())          # 테스트 케이스 수",
  "",
  "# memo = 답 공책 (메모이제이션)",
  "memo = {}",
  "",
  "# ─── 도우미 (재귀 ❌ — 그냥 검사) ───",
  "",
  "# 숫자가 다 같은가?",
  "def is_all_same(seq):",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            return False",
  "    return True",
  "",
  "# block_len 짜리 블록이 끝까지 반복되는가?",
  "def is_repeat_of(seq, block_len):",
  "    for i in range(len(seq)):",
  "        if seq[i] != seq[i % block_len]:",
  "            return False",
  "    return True",
  "",
  "# ─── ⭐ 재귀 ───",
  "",
  "# can = 접수처: 공책에 없으면 solve 에게 맡기고, 답을 적어둔다",
  "def can(seq, budget):",
  "    if (seq, budget) not in memo:",
  "        memo[(seq, budget)] = solve(seq, budget)",
  "    return memo[(seq, budget)]",
  "",
  "# solve = 진짜 풀이: 되는 순간 바로 return True!",
  "def solve(seq, budget):",
  "    n = len(seq)",
  "",
  "    # ✋ 베이스 케이스 — 여기서 멈춤!",
  "    if n == 0 or budget <= 0:",
  "        return False",
  "",
  "    # 요령 ①: 다 같음 → PRINT 1 개면 끝",
  "    if is_all_same(seq):",
  "        return True",
  "",
  "    # 요령 ②: 블록의 반복 → 블록만 풀기",
  "    for block_len in range(1, n):",
  "        if n % block_len == 0:",
  "            if is_repeat_of(seq, block_len):",
  "                if can(seq[:block_len], budget):",
  "                    return True",
  "",
  "    # 요령 ③: 둘로 잘라서 예산 나눠 갖기",
  "    for cut in range(1, n):",
  "        for left_budget in range(1, budget):",
  "            if can(seq[:cut], left_budget):",
  "                if can(seq[cut:], budget - left_budget):",
  "                    return True",
  "",
  "    return False   # 세 요령 다 실패",
  "",
  "for _ in range(T):",
  "    # 첫 줄: N 과 K",
  "    N, K = map(int, input().split())   # K = PRINT 예산",
  "",
  "    # 목표 → tuple (memo 열쇠는 안 바뀌는 값만!)",
  "    target = tuple(map(int, input().split()))",
  "",
  "    memo.clear()                       # 새 케이스 → 공책 비우기",
  "    if can(target, K):",
  "        print('YES')",
  "    else:",
  "        print('NO')",
];
const PSQ_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "// memo = 답 공책 (메모이제이션) — 열쇠 = \"수열#예산\" 문자열",
  "map<string, bool> memo;",
  "",
  "// 수열+예산 → 문자열 열쇠 하나로",
  "string make_key(vector<int>& seq, int budget) {",
  "    string key = \"\";",
  "    for (int i = 0; i < (int)seq.size(); i++) {",
  "        key += to_string(seq[i]);",
  "        key += \",\";",
  "    }",
  "    key += \"#\";",
  "    key += to_string(budget);",
  "    return key;",
  "}",
  "",
  "// ─── 도우미 (재귀 ❌ — 검사·자르기) ───",
  "",
  "// 숫자가 다 같은가?",
  "bool is_all_same(vector<int>& seq) {",
  "    for (int i = 1; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[0]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// block_len 짜리 블록이 끝까지 반복되는가?",
  "bool is_repeat_of(vector<int>& seq, int block_len) {",
  "    for (int i = 0; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[i % block_len]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// seq 의 [from, to) 조각 (파이썬 seq[from:to] 역할)",
  "vector<int> slice(vector<int>& seq, int from, int to) {",
  "    vector<int> part;",
  "    for (int i = from; i < to; i++) {",
  "        part.push_back(seq[i]);",
  "    }",
  "    return part;",
  "}",
  "",
  "// ─── ⭐ 재귀 ───",
  "",
  "bool solve(vector<int> seq, int budget);   // 서로 부르니 한 줄 예고(선언)",
  "",
  "// can = 접수처: 공책에 없으면 solve 에게 맡기고, 답을 적어둔다",
  "bool can(vector<int> seq, int budget) {",
  "    string key = make_key(seq, budget);",
  "    if (memo.count(key) == 0) {",
  "        memo[key] = solve(seq, budget);",
  "    }",
  "    return memo[key];",
  "}",
  "",
  "// solve = 진짜 풀이: 되는 순간 바로 return true!",
  "bool solve(vector<int> seq, int budget) {",
  "    int n = seq.size();",
  "",
  "    // ✋ 베이스 케이스 — 여기서 멈춤!",
  "    if (n == 0 || budget <= 0) {",
  "        return false;",
  "    }",
  "",
  "    // 요령 ①: 다 같음 → PRINT 1 개면 끝",
  "    if (is_all_same(seq)) {",
  "        return true;",
  "    }",
  "",
  "    // 요령 ②: 블록의 반복 → 블록만 풀기",
  "    for (int block_len = 1; block_len < n; block_len++) {",
  "        if (n % block_len == 0) {",
  "            if (is_repeat_of(seq, block_len)) {",
  "                if (can(slice(seq, 0, block_len), budget)) {",
  "                    return true;",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    // 요령 ③: 둘로 잘라서 예산 나눠 갖기",
  "    for (int cut = 1; cut < n; cut++) {",
  "        for (int left_budget = 1; left_budget < budget; left_budget++) {",
  "            if (can(slice(seq, 0, cut), left_budget)) {",
  "                if (can(slice(seq, cut, n), budget - left_budget)) {",
  "                    return true;",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    return false;   // 세 요령 다 실패",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        vector<int> target(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> target[i];",
  "        }",
  "",
  "        memo.clear();            // 새 케이스 → 공책 비우기",
  "        if (can(target, K)) {",
  "            cout << \"YES\" << '\\n';",
  "        } else {",
  "            cout << \"NO\" << '\\n';",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

// 영어 주석판 — 코드/줄 구조는 위와 100% 동일, 주석만 영어 (beats 줄번호 공유).
// (선생님 2026-07-14: 영어 모드인데 코드 주석이 한글이었음 → E 일 때 이 배열 사용.)
const PSQ_FAST_PY_EN = [
  "T = int(input())          # number of test cases",
  "",
  "# memo = the answer notebook (memoization)",
  "memo = {}",
  "",
  "# ─── helpers (no recursion — just checks) ───",
  "",
  "# are all numbers the same?",
  "def is_all_same(seq):",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            return False",
  "    return True",
  "",
  "# does a block of block_len repeat all the way?",
  "def is_repeat_of(seq, block_len):",
  "    for i in range(len(seq)):",
  "        if seq[i] != seq[i % block_len]:",
  "            return False",
  "    return True",
  "",
  "# ─── ⭐ the recursion ───",
  "",
  "# can = the front desk: not in the notebook? ask solve, write it down",
  "def can(seq, budget):",
  "    if (seq, budget) not in memo:",
  "        memo[(seq, budget)] = solve(seq, budget)",
  "    return memo[(seq, budget)]",
  "",
  "# solve = the real solving: return True the moment a trick works!",
  "def solve(seq, budget):",
  "    n = len(seq)",
  "",
  "    # ✋ BASE CASE — recursion stops here!",
  "    if n == 0 or budget <= 0:",
  "        return False",
  "",
  "    # trick 1: all same -> one PRINT",
  "    if is_all_same(seq):",
  "        return True",
  "",
  "    # trick 2: a repeated block -> solve just the block",
  "    for block_len in range(1, n):",
  "        if n % block_len == 0:",
  "            if is_repeat_of(seq, block_len):",
  "                if can(seq[:block_len], budget):",
  "                    return True",
  "",
  "    # trick 3: cut in two and split the budget",
  "    for cut in range(1, n):",
  "        for left_budget in range(1, budget):",
  "            if can(seq[:cut], left_budget):",
  "                if can(seq[cut:], budget - left_budget):",
  "                    return True",
  "",
  "    return False   # all three tricks failed",
  "",
  "for _ in range(T):",
  "    # first line: N and K",
  "    N, K = map(int, input().split())   # K = PRINT budget",
  "",
  "    # target -> tuple (dict keys must not change!)",
  "    target = tuple(map(int, input().split()))",
  "",
  "    memo.clear()                       # new case -> clear notebook",
  "    if can(target, K):",
  "        print('YES')",
  "    else:",
  "        print('NO')",
];
const PSQ_FAST_CPP_EN = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "// memo = the answer notebook — key = \"sequence#budget\" string",
  "map<string, bool> memo;",
  "",
  "// sequence+budget -> one string key",
  "string make_key(vector<int>& seq, int budget) {",
  "    string key = \"\";",
  "    for (int i = 0; i < (int)seq.size(); i++) {",
  "        key += to_string(seq[i]);",
  "        key += \",\";",
  "    }",
  "    key += \"#\";",
  "    key += to_string(budget);",
  "    return key;",
  "}",
  "",
  "// ─── helpers (no recursion — checks & slicing) ───",
  "",
  "// are all numbers the same?",
  "bool is_all_same(vector<int>& seq) {",
  "    for (int i = 1; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[0]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// does a block of block_len repeat all the way?",
  "bool is_repeat_of(vector<int>& seq, int block_len) {",
  "    for (int i = 0; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[i % block_len]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// the [from, to) piece of seq (like Python seq[from:to])",
  "vector<int> slice(vector<int>& seq, int from, int to) {",
  "    vector<int> part;",
  "    for (int i = from; i < to; i++) {",
  "        part.push_back(seq[i]);",
  "    }",
  "    return part;",
  "}",
  "",
  "// ─── ⭐ the recursion ───",
  "",
  "bool solve(vector<int> seq, int budget);   // they call each other -> declare",
  "",
  "// can = the front desk: not in the notebook? ask solve, write it down",
  "bool can(vector<int> seq, int budget) {",
  "    string key = make_key(seq, budget);",
  "    if (memo.count(key) == 0) {",
  "        memo[key] = solve(seq, budget);",
  "    }",
  "    return memo[key];",
  "}",
  "",
  "// solve = the real solving: return true the moment a trick works!",
  "bool solve(vector<int> seq, int budget) {",
  "    int n = seq.size();",
  "",
  "    // ✋ BASE CASE — recursion stops here!",
  "    if (n == 0 || budget <= 0) {",
  "        return false;",
  "    }",
  "",
  "    // trick 1: all same -> one PRINT",
  "    if (is_all_same(seq)) {",
  "        return true;",
  "    }",
  "",
  "    // trick 2: a repeated block -> solve just the block",
  "    for (int block_len = 1; block_len < n; block_len++) {",
  "        if (n % block_len == 0) {",
  "            if (is_repeat_of(seq, block_len)) {",
  "                if (can(slice(seq, 0, block_len), budget)) {",
  "                    return true;",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    // trick 3: cut in two and split the budget",
  "    for (int cut = 1; cut < n; cut++) {",
  "        for (int left_budget = 1; left_budget < budget; left_budget++) {",
  "            if (can(slice(seq, 0, cut), left_budget)) {",
  "                if (can(slice(seq, cut, n), budget - left_budget)) {",
  "                    return true;",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    return false;   // all three tricks failed",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        vector<int> target(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> target[i];",
  "        }",
  "",
  "        memo.clear();            // new case -> clear notebook",
  "        if (can(target, K)) {",
  "            cout << \"YES\" << '\\n';",
  "        } else {",
  "            cout << \"NO\" << '\\n';",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

/* 코드-워크(한 조각씩 밝히며 설명) — 전체 코드 위를 걷는 beats.
   (선생님 2026-07-13: "코드 위에 설명을 안 읽게 되더라" → 설명을 밝아진 줄에 붙임.) */
/* ═══ 🎁 번외편: 재귀 없이 (bottom-up 표 채우기) — 선생님 2026-07-17 요청 ═══ */
const PSQ_STK_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())          # 테스트 케이스 수",
  "for _ in range(T):",
  "    N, K = map(int, input().split())   # K = PRINT 예산",
  "    target = list(map(int, input().split()))",
  "",
  "    # 길이별 약수 — 요령②는 '약수' 길이 블록만 반복이 될 수 있어요",
  "    divs = [[] for _ in range(N + 1)]",
  "    for b in range(1, N + 1):",
  "        for L in range(b * 2, N + 1, b):",
  "            divs[L].append(b)",
  "",
  "    memo = {}              # 답 공책: (i, j, k) → True / False",
  "    prog = {}              # 각 조각을 '어디까지 해봤는지'",
  "    todo = [(0, N, K)]     # 할 일 목록 — 전체 수열부터 시작 (재귀 대신 이걸 굴려요)",
  "",
  "    while todo:",
  "        i, j, k = todo[-1]",
  "",
  "        if (i, j, k) in memo:          # 이미 푼 조각이면 넘어가기",
  "            todo.pop()",
  "            continue",
  "        if i >= j or k <= 0:           # 빈 조각 / 예산 없음 → 못 만듦",
  "            memo[(i, j, k)] = False",
  "            todo.pop()",
  "            continue",
  "",
  "        if (i, j, k) not in prog:      # 이 조각을 처음 꺼냈을 때만",
  "            same = True                # 요령 ①: 숫자가 다 같으면 PRINT 하나면 끝",
  "            for x in range(i + 1, j):",
  "                if target[x] != target[i]:",
  "                    same = False",
  "                    break",
  "            if same:",
  "                memo[(i, j, k)] = True",
  "                todo.pop()",
  "                continue",
  "            reps = []                  # 요령 ②: 반복되는 블록 길이 후보 모으기",
  "            for b in divs[j - i]:",
  "                good = True",
  "                for x in range(i + b, j):",
  "                    if target[x] != target[x - b]:",
  "                        good = False",
  "                        break",
  "                if good:",
  "                    reps.append(b)",
  "            prog[(i, j, k)] = [0, i + 1, 1, reps]   # [②진행, ③자를곳, ③예산나눔, 후보]",
  "",
  "        p = prog[(i, j, k)]",
  "        need = None                    # 아직 답을 모르는 '더 작은 조각'",
  "        res = False",
  "",
  "        while p[0] < len(p[3]):        # 요령 ②: 블록만 만들면 REP 로 반복",
  "            block = (i, i + p[3][p[0]], k)",
  "            if block not in memo:",
  "                need = block",
  "                break",
  "            if memo[block]:",
  "                res = True",
  "                break",
  "            p[0] += 1",
  "",
  "        if need is None and not res:   # 요령 ③: 둘로 자르고 예산도 나누기",
  "            while p[1] < j:",
  "                if p[2] >= k:",
  "                    p[1] += 1",
  "                    p[2] = 1",
  "                    continue",
  "                left = (i, p[1], p[2])",
  "                right = (p[1], j, k - p[2])",
  "                if left not in memo:",
  "                    need = left",
  "                    break",
  "                if memo[left]:",
  "                    if right not in memo:",
  "                        need = right",
  "                        break",
  "                    if memo[right]:",
  "                        res = True",
  "                        break",
  "                p[2] += 1",
  "",
  "        if need is not None:           # 모르는 조각이 있으면 그것부터 할 일 목록에",
  "            todo.append(need)",
  "            continue",
  "",
  "        memo[(i, j, k)] = res          # 세 요령 다 해봤으면 답 확정",
  "        del prog[(i, j, k)]",
  "        todo.pop()",
  "",
  "    print('YES' if memo[(0, N, K)] else 'NO')",
];

const PSQ_STK_PY_EN = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())          # 테스트 케이스 수",
  "for _ in range(T):",
  "    N, K = map(int, input().split())   # K = PRINT 예산",
  "    target = list(map(int, input().split()))",
  "",
  "    # divisors by length — trick 2 only works for divisor-length blocks",
  "    divs = [[] for _ in range(N + 1)]",
  "    for b in range(1, N + 1):",
  "        for L in range(b * 2, N + 1, b):",
  "            divs[L].append(b)",
  "",
  "    memo = {}              # answer notebook: (i, j, k) -> True / False",
  "    prog = {}              # how far we got on each piece",
  "    todo = [(0, N, K)]     # TO-DO list — start with the whole sequence (instead of recursion)",
  "",
  "    while todo:",
  "        i, j, k = todo[-1]",
  "",
  "        if (i, j, k) in memo:          # already solved — skip",
  "            todo.pop()",
  "            continue",
  "        if i >= j or k <= 0:           # empty piece / no budget -> impossible",
  "            memo[(i, j, k)] = False",
  "            todo.pop()",
  "            continue",
  "",
  "        if (i, j, k) not in prog:      # only the first time we pop this piece",
  "            same = True                # trick 1: all same -> one PRINT is enough",
  "            for x in range(i + 1, j):",
  "                if target[x] != target[i]:",
  "                    same = False",
  "                    break",
  "            if same:",
  "                memo[(i, j, k)] = True",
  "                todo.pop()",
  "                continue",
  "            reps = []                  # trick 2: collect repeating block lengths",
  "            for b in divs[j - i]:",
  "                good = True",
  "                for x in range(i + b, j):",
  "                    if target[x] != target[x - b]:",
  "                        good = False",
  "                        break",
  "                if good:",
  "                    reps.append(b)",
  "            prog[(i, j, k)] = [0, i + 1, 1, reps]   # [trick2 pos, cut, budget split, candidates]",
  "",
  "        p = prog[(i, j, k)]",
  "        need = None                    # a smaller piece whose answer we don't know yet",
  "        res = False",
  "",
  "        while p[0] < len(p[3]):        # trick 2: make the block, REP repeats it",
  "            block = (i, i + p[3][p[0]], k)",
  "            if block not in memo:",
  "                need = block",
  "                break",
  "            if memo[block]:",
  "                res = True",
  "                break",
  "            p[0] += 1",
  "",
  "        if need is None and not res:   # trick 3: cut in two, split the budget",
  "            while p[1] < j:",
  "                if p[2] >= k:",
  "                    p[1] += 1",
  "                    p[2] = 1",
  "                    continue",
  "                left = (i, p[1], p[2])",
  "                right = (p[1], j, k - p[2])",
  "                if left not in memo:",
  "                    need = left",
  "                    break",
  "                if memo[left]:",
  "                    if right not in memo:",
  "                        need = right",
  "                        break",
  "                    if memo[right]:",
  "                        res = True",
  "                        break",
  "                p[2] += 1",
  "",
  "        if need is not None:           # unknown piece -> put it on the TO-DO list first",
  "            todo.append(need)",
  "            continue",
  "",
  "        memo[(i, j, k)] = res          # all three tricks tried -> answer settled",
  "        del prog[(i, j, k)]",
  "        todo.pop()",
  "",
  "    print('YES' if memo[(0, N, K)] else 'NO')",
];

const PSQ_STK_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int N, K;",
  "vector<int> target_seq;",
  "int memo[101][101][4];          // -1 = 아직 모름, 0 = NO, 1 = YES",
  "bool started[101][101][4];",
  "int pRep[101][101][4], pCut[101][101][4], pK1[101][101][4];",
  "vector<int> reps[101][101];     // (i, j) 조각의 반복 블록 후보",
  "bool repsDone[101][101];",
  "",
  "bool all_same(int i, int j) {",
  "    for (int x = i + 1; x < j; x++)",
  "        if (target_seq[x] != target_seq[i]) return false;",
  "    return true;",
  "}",
  "bool is_repeat_of(int i, int j, int b) {",
  "    for (int x = i + b; x < j; x++)",
  "        if (target_seq[x] != target_seq[x - b]) return false;",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        cin >> N >> K;",
  "        target_seq.assign(N, 0);",
  "        for (int i = 0; i < N; i++) cin >> target_seq[i];",
  "        for (int i = 0; i <= N; i++)",
  "            for (int j = 0; j <= N; j++) {",
  "                repsDone[i][j] = false; reps[i][j].clear();",
  "                for (int k = 0; k <= K; k++) { memo[i][j][k] = -1; started[i][j][k] = false; }",
  "            }",
  "",
  "        vector<vector<int>> stk;              // 할 일 목록 (재귀 대신)",
  "        stk.push_back({0, N, K});",
  "        while (!stk.empty()) {",
  "            int i = stk.back()[0], j = stk.back()[1], k = stk.back()[2];",
  "            if (memo[i][j][k] != -1) { stk.pop_back(); continue; }",
  "            if (i >= j || k <= 0) { memo[i][j][k] = 0; stk.pop_back(); continue; }",
  "            if (!started[i][j][k]) {",
  "                started[i][j][k] = true;",
  "                if (all_same(i, j)) { memo[i][j][k] = 1; stk.pop_back(); continue; }",
  "                if (!repsDone[i][j]) {",
  "                    repsDone[i][j] = true;",
  "                    int len = j - i;",
  "                    for (int b = 1; b < len; b++)",
  "                        if (len % b == 0 && is_repeat_of(i, j, b)) reps[i][j].push_back(b);",
  "                }",
  "                pRep[i][j][k] = 0; pCut[i][j][k] = i + 1; pK1[i][j][k] = 1;",
  "            }",
  "            bool need = false, res = false;",
  "            while (pRep[i][j][k] < (int)reps[i][j].size()) {          // 요령 ②",
  "                int b = reps[i][j][pRep[i][j][k]];",
  "                if (memo[i][i + b][k] == -1) { stk.push_back({i, i + b, k}); need = true; break; }",
  "                if (memo[i][i + b][k] == 1) { res = true; break; }",
  "                pRep[i][j][k]++;",
  "            }",
  "            if (!need && !res) {",
  "                while (pCut[i][j][k] < j) {                            // 요령 ③",
  "                    int cut = pCut[i][j][k], k1 = pK1[i][j][k];",
  "                    if (k1 >= k) { pCut[i][j][k]++; pK1[i][j][k] = 1; continue; }",
  "                    if (memo[i][cut][k1] == -1) { stk.push_back({i, cut, k1}); need = true; break; }",
  "                    if (memo[i][cut][k1] == 1) {",
  "                        if (memo[cut][j][k - k1] == -1) { stk.push_back({cut, j, k - k1}); need = true; break; }",
  "                        if (memo[cut][j][k - k1] == 1) { res = true; break; }",
  "                    }",
  "                    pK1[i][j][k]++;",
  "                }",
  "            }",
  "            if (need) continue;",
  "            memo[i][j][k] = res ? 1 : 0;",
  "            stk.pop_back();",
  "        }",
  "        cout << (memo[0][N][K] == 1 ? \"YES\" : \"NO\") << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

const PSQ_STK_CPP_EN = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int N, K;",
  "vector<int> target_seq;",
  "int memo[101][101][4];          // -1 = unknown, 0 = NO, 1 = YES",
  "bool started[101][101][4];",
  "int pRep[101][101][4], pCut[101][101][4], pK1[101][101][4];",
  "vector<int> reps[101][101];     // repeating-block candidates for piece (i, j)",
  "bool repsDone[101][101];",
  "",
  "bool all_same(int i, int j) {",
  "    for (int x = i + 1; x < j; x++)",
  "        if (target_seq[x] != target_seq[i]) return false;",
  "    return true;",
  "}",
  "bool is_repeat_of(int i, int j, int b) {",
  "    for (int x = i + b; x < j; x++)",
  "        if (target_seq[x] != target_seq[x - b]) return false;",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        cin >> N >> K;",
  "        target_seq.assign(N, 0);",
  "        for (int i = 0; i < N; i++) cin >> target_seq[i];",
  "        for (int i = 0; i <= N; i++)",
  "            for (int j = 0; j <= N; j++) {",
  "                repsDone[i][j] = false; reps[i][j].clear();",
  "                for (int k = 0; k <= K; k++) { memo[i][j][k] = -1; started[i][j][k] = false; }",
  "            }",
  "",
  "        vector<vector<int>> stk;              // TO-DO list (instead of recursion)",
  "        stk.push_back({0, N, K});",
  "        while (!stk.empty()) {",
  "            int i = stk.back()[0], j = stk.back()[1], k = stk.back()[2];",
  "            if (memo[i][j][k] != -1) { stk.pop_back(); continue; }",
  "            if (i >= j || k <= 0) { memo[i][j][k] = 0; stk.pop_back(); continue; }",
  "            if (!started[i][j][k]) {",
  "                started[i][j][k] = true;",
  "                if (all_same(i, j)) { memo[i][j][k] = 1; stk.pop_back(); continue; }",
  "                if (!repsDone[i][j]) {",
  "                    repsDone[i][j] = true;",
  "                    int len = j - i;",
  "                    for (int b = 1; b < len; b++)",
  "                        if (len % b == 0 && is_repeat_of(i, j, b)) reps[i][j].push_back(b);",
  "                }",
  "                pRep[i][j][k] = 0; pCut[i][j][k] = i + 1; pK1[i][j][k] = 1;",
  "            }",
  "            bool need = false, res = false;",
  "            while (pRep[i][j][k] < (int)reps[i][j].size()) {          // trick 2",
  "                int b = reps[i][j][pRep[i][j][k]];",
  "                if (memo[i][i + b][k] == -1) { stk.push_back({i, i + b, k}); need = true; break; }",
  "                if (memo[i][i + b][k] == 1) { res = true; break; }",
  "                pRep[i][j][k]++;",
  "            }",
  "            if (!need && !res) {",
  "                while (pCut[i][j][k] < j) {                            // trick 3",
  "                    int cut = pCut[i][j][k], k1 = pK1[i][j][k];",
  "                    if (k1 >= k) { pCut[i][j][k]++; pK1[i][j][k] = 1; continue; }",
  "                    if (memo[i][cut][k1] == -1) { stk.push_back({i, cut, k1}); need = true; break; }",
  "                    if (memo[i][cut][k1] == 1) {",
  "                        if (memo[cut][j][k - k1] == -1) { stk.push_back({cut, j, k - k1}); need = true; break; }",
  "                        if (memo[cut][j][k - k1] == 1) { res = true; break; }",
  "                    }",
  "                    pK1[i][j][k]++;",
  "                }",
  "            }",
  "            if (need) continue;",
  "            memo[i][j][k] = res ? 1 : 0;",
  "            stk.pop_back();",
  "        }",
  "        cout << (memo[0][N][K] == 1 ? \"YES\" : \"NO\") << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getPrintseqWalk(E, lang = "py") {
  const vars = [
    { v: "seq", ko: "지금 보는 수열", en: "current sequence" },
    { v: "n", ko: "seq 길이", en: "length of seq" },
    { v: "budget", ko: "남은 PRINT 예산", en: "PRINT budget left" },
    { v: "block_len", ko: "반복 블록 길이", en: "repeat block length" },
  ];
  if (lang === "cpp") {
    return {
      code: E ? PSQ_FAST_CPP_EN : PSQ_FAST_CPP,
      vars,
      // ✋ 베이스(장미) + ↺ 재귀 호출(남보라) 상시 강조 (선생님 2026-07-17)
      marks: [
        { from: 69, to: 72, ko: "✋ 베이스 케이스", en: "✋ base case" },
        { from: 83, to: 83, color: "#818cf8", ko: "↺ 재귀!", en: "↺ recursion!" },
        { from: 93, to: 94, color: "#818cf8", ko: "↺ 재귀!", en: "↺ recursion!" },
      ],
      beats: [
        { hi: [104, 113], bubble: t(E,
          "Start where we always start — the INPUT.\nmain reads T, then each case: N, K, and the target sequence.",
          "언제나 시작은 — 입력부터.\nmain 에서 T, 그리고 케이스마다 N, K, 목표 수열을 읽어요.") },
        { hi: [115, 119], bubble: t(E,
          "Call can(target, K) → print YES / NO. That's the goal.\nNow meet the TWO people doing the work 👇",
          "can(목표, K) 를 불러 YES / NO 출력. 이게 목표.\n이제 일하는 '두 명'을 만나요 👇") },
        { hi: [56, 63], bubble: t(E,
          "can = the FRONT DESK (5 lines!).\nNot in the notebook? → ask solve, write the answer down. That's all.\nBecause the desk writes everything down, solve is free to return anywhere!",
          "can = 접수처 (5줄!).\n공책에 없으면 → solve 에게 맡기고, 답을 적어둬요. 끝.\n적는 건 접수처가 다 하니까 — solve 는 아무 데서나 return 해도 돼요!") },
        { hi: [6, 7], bubble: t(E,
          "The answer notebook — memo.\nSolve once, reuse forever = MEMOIZATION (top-down DP).",
          "답 공책 — memo.\n한 번 푼 건 영원히 재사용 = 메모이제이션 (top-down DP).") },
        { hi: [65, 67], bubble: t(E,
          "solve = the real SOLVING.\nThe rule: the moment a trick works → return true right there!",
          "solve = 진짜 풀이.\n규칙: 요령이 되는 '그 순간' → 그 자리서 바로 return true!") },
        { hi: [69, 72], bubble: t(E,
          "✋ BASE CASE first — empty / no budget → return false RIGHT HERE.\nWithout this, the recursion never ends!",
          "✋ 베이스 케이스부터 — 빈 수열 / 예산 없음 → 그 자리에서 바로 return false.\n이게 없으면 재귀가 영원히 안 끝나요!") },
        { hi: [74, 77], bubble: t(E,
          "Trick ①: all same? (helper checks) → one PRINT wrapped in REP → true.\ne.g. [7 7 7] → REP 3 (PRINT 7) ✓",
          "요령 ①: 다 같아? (도우미가 검사) → PRINT 1 개 + REP → true.\n예: [7 7 7] → REP 3 (PRINT 7) ✓") },
        { hi: [79, 88], bubble: t(E,
          "Trick ②: try block lengths 1, 2, … — a repeating shape (is_repeat_of)?\nThen ↺ can(block) — the SAME question, smaller. Recursion!\ne.g. [1 2 1 2] = block [1 2] repeated → just solve can([1 2]) ✓",
          "요령 ②: 블록 길이 1, 2, … 를 시도 — 반복 모양이면(is_repeat_of)\n↺ can(블록)! 같은 질문, 더 작게 = 재귀.\n예: [1 2 1 2] = 블록 [1 2] 의 반복 → can([1 2]) 만 풀면 끝 ✓") },
        { hi: [90, 99], bubble: t(E,
          "Trick ③: cut in two, split the budget — ↺ can(left) AND ↺ can(right)!\nBoth yes → return true. Try every cut × every split.\ne.g. [1 1 2 2] budget 2 → [1 1]+budget 1, [2 2]+budget 1 ✓",
          "요령 ③: 둘로 자르고 예산도 나눠 — ↺ can(왼쪽) 그리고 ↺ can(오른쪽)!\n둘 다 되면 return true. 모든 자르기 × 나누기 시도.\n예: [1 1 2 2] 예산 2 → [1 1] 예산 1 + [2 2] 예산 1 ✓") },
        { hi: [101, 101], bubble: t(E,
          "All three tricks failed → false.\n(The front desk writes it in the notebook — we never solve this note again.)",
          "세 요령 다 실패 → false.\n(공책에 적는 건 접수처 몫 — 이 쪽지는 다신 안 풀어요.)") },
        { hi: [21, 31], bubble: t(E,
          "The helpers — NO recursion, just simple checks.\nis_all_same: any number different from the first → false.",
          "도우미들 — 재귀 ❌, 그냥 단순 검사.\nis_all_same: 첫 숫자와 다른 게 하나라도 있으면 false.") },
        { hi: [33, 41], bubble: t(E,
          "is_repeat_of: does a block of block_len repeat all the way?\nJust a shape check.",
          "is_repeat_of: block_len 짜리 블록이 끝까지 반복되는 모양인지만 확인.") },
        { hi: [43, 50], bubble: t(E,
          "slice: the [from, to) piece — C++'s Python seq[from:to].\nWorkers work; the thinking (recursion) happens in solve.",
          "slice: [from, to) 조각 — 파이썬 seq[from:to] 의 C++ 판.\n일꾼은 일하고, 생각(재귀)은 solve 가 해요.") },
      ],
    };
  }
  return {
    code: E ? PSQ_FAST_PY_EN : PSQ_FAST_PY,
    vars,
    // ✋ 베이스(장미) + ↺ 재귀 호출(남보라) 상시 강조 (선생님 2026-07-17)
    marks: [
      { from: 33, to: 35, ko: "✋ 베이스 케이스", en: "✋ base case" },
      { from: 45, to: 45, color: "#818cf8", ko: "↺ 재귀!", en: "↺ recursion!" },
      { from: 51, to: 52, color: "#818cf8", ko: "↺ 재귀!", en: "↺ recursion!" },
    ],
    beats: [
      { hi: [0, 0], bubble: t(E,
        "Start where we always start — the INPUT.\nFirst line: T = how many cases. The for-loop at the bottom repeats T times.",
        "언제나 시작은 — 입력부터.\n첫 줄: T = 케이스 개수. 맨 아래 for 가 이걸 T 번 반복해요.") },
      { hi: [57, 59], bubble: t(E,
        "Each case: first line → N and K, next line → the target sequence.",
        "케이스마다: 첫 줄 → N 과 K, 다음 줄 → 목표 수열.") },
      { hi: [61, 62], bubble: t(E,
        "Why a tuple? (target, budget) becomes a memo KEY soon —\ndict keys must never change: list ✗, tuple ✓.",
        "왜 tuple? 곧 (목표, 예산) 이 memo 열쇠가 되는데 —\n딕셔너리 열쇠는 안 바뀌는 값만: 리스트 ✗, tuple ✓.") },
      { hi: [64, 68], bubble: t(E,
        "Call can(target, K) → YES / NO. That's the goal.\nNow meet the TWO people doing the work 👇",
        "can(목표, K) 를 불러 YES / NO. 이게 목표.\n이제 일하는 '두 명'을 만나요 👇") },
      { hi: [23, 27], bubble: t(E,
        "can = the FRONT DESK (4 lines!).\nNot in the notebook? → ask solve, write the answer down. That's all.\nBecause the desk writes everything down, solve is free to return anywhere!",
        "can = 접수처 (4줄!).\n공책에 없으면 → solve 에게 맡기고, 답을 적어둬요. 끝.\n적는 건 접수처가 다 하니까 — solve 는 아무 데서나 return 해도 돼요!") },
      { hi: [2, 3], bubble: t(E,
        "The answer notebook — memo. Key = (sequence, budget).\nSolve once, reuse forever = MEMOIZATION (top-down DP).",
        "답 공책 — memo. 열쇠 = (수열, 예산).\n한 번 푼 건 영원히 재사용 = 메모이제이션 (top-down DP).") },
      { hi: [29, 31], bubble: t(E,
        "solve = the real SOLVING.\nThe rule: the moment a trick works → return True right there!",
        "solve = 진짜 풀이.\n규칙: 요령이 되는 '그 순간' → 그 자리서 바로 return True!") },
      { hi: [33, 35], bubble: t(E,
        "✋ BASE CASE first — empty / no budget → return False RIGHT HERE.\nWithout this, the recursion never ends!",
        "✋ 베이스 케이스부터 — 빈 수열 / 예산 없음 → 그 자리에서 바로 return False.\n이게 없으면 재귀가 영원히 안 끝나요!") },
      { hi: [37, 39], bubble: t(E,
        "Trick ①: all same? (helper checks) → one PRINT wrapped in REP → True.\ne.g. [7 7 7] → REP 3 (PRINT 7) ✓",
        "요령 ①: 다 같아? (도우미가 검사) → PRINT 1 개 + REP → True.\n예: [7 7 7] → REP 3 (PRINT 7) ✓") },
      { hi: [41, 46], bubble: t(E,
        "Trick ②: try block lengths 1, 2, … — a repeating shape (is_repeat_of)?\nThen ↺ can(seq[:block_len]) — the SAME question, smaller. Recursion!\ne.g. [1 2 1 2] = block [1 2] repeated → just solve can([1 2]) ✓",
        "요령 ②: 블록 길이 1, 2, … 를 시도 — 반복 모양이면(is_repeat_of)\n↺ can(seq[:block_len])! 같은 질문, 더 작게 = 재귀.\n예: [1 2 1 2] = 블록 [1 2] 의 반복 → can([1 2]) 만 풀면 끝 ✓") },
      { hi: [48, 53], bubble: t(E,
        "Trick ③: cut in two, split the budget — ↺ can(left) AND ↺ can(right)!\nBoth yes → return True. Try every cut × every split.\ne.g. [1 1 2 2] budget 2 → [1 1]+budget 1, [2 2]+budget 1 ✓",
        "요령 ③: 둘로 자르고 예산도 나눠 — ↺ can(왼쪽) 그리고 ↺ can(오른쪽)!\n둘 다 되면 return True. 모든 자르기 × 나누기 시도.\n예: [1 1 2 2] 예산 2 → [1 1] 예산 1 + [2 2] 예산 1 ✓") },
      { hi: [55, 55], bubble: t(E,
        "All three tricks failed → False.\n(The front desk writes it in the notebook — we never solve this note again.)",
        "세 요령 다 실패 → False.\n(공책에 적는 건 접수처 몫 — 이 쪽지는 다신 안 풀어요.)") },
      { hi: [5, 12], bubble: t(E,
        "The helpers — NO recursion, just simple checks.\nis_all_same: any number different from the first → False.",
        "도우미들 — 재귀 ❌, 그냥 단순 검사.\nis_all_same: 첫 숫자와 다른 게 하나라도 있으면 False.") },
      { hi: [14, 19], bubble: t(E,
        "is_repeat_of: does a block of block_len repeat all the way?\nJust a shape check — the thinking (recursion) happens in solve.",
        "is_repeat_of: block_len 짜리 블록이 끝까지 반복되는지만 확인.\n일꾼은 일하고, 생각(재귀)은 solve 가 해요.") },
    ],
  };
}

// 🎁 번외편 워크: 재귀 없이 — bottom-up 표 채우기 (선생님 2026-07-17)
export function getPrintseqStkWalk(E, lang = "py") {
  const vars = [
    { v: "todo", ko: "할 일 목록", en: "the TO-DO list" },
    { v: "memo", ko: "답 공책", en: "answer notebook" },
    { v: "prog", ko: "어디까지 해봤는지", en: "how far we got" },
    { v: "k", ko: "PRINT 예산", en: "PRINT budget" },
  ];
  if (lang === "cpp") {
    return {
      code: E ? PSQ_STK_CPP_EN : PSQ_STK_CPP,
      vars,
      marks: [
        { from: 35, to: 36, color: "#0d9488", ko: "📋 재귀 대신 이것!", en: "📋 instead of recursion!" },
      ],
      beats: [
        { hi: [23, 28], bubble: t(E,
          "Start where we always start — the INPUT.\nmain reads T, then each case: N, K, and the target sequence.",
          "언제나 시작은 — 입력부터.\nmain 에서 T, 그리고 케이스마다 N, K, 목표 수열을 읽어요.") },
        { hi: [4, 10], bubble: t(E,
          "Our three tools: memo (the answer notebook, -1 = don't know yet),\nreps (repeat-block candidates), and pRep/pCut/pK1 = how far we got on each piece.",
          "준비물 셋: memo (답 공책, -1 = 아직 모름),\nreps (반복 블록 후보), 그리고 pRep/pCut/pK1 = 각 조각을 어디까지 해봤는지.") },
        { hi: [29, 33], bubble: t(E,
          "Each case starts fresh — wipe the notebook and the progress marks.",
          "케이스마다 새로 시작 — 공책과 진행 표시를 지워요.") },
        { hi: [35, 36], bubble: t(E,
          "⭐ Here it is — the TO-DO list, instead of recursion.\nWe put the whole sequence (0, N, K) on it and start working.",
          "⭐ 이게 핵심 — 재귀 대신 '할 일 목록'.\n전체 수열 (0, N, K) 을 올려놓고 일을 시작해요.") },
        { hi: [37, 38], bubble: t(E,
          "The loop: take the piece on top of the list and look at it.\n(We only LOOK — we don't remove it until its answer is settled.)",
          "반복문: 목록 맨 위 조각을 꺼내 봐요.\n(보기만 해요 — 답이 확정될 때까지 안 치워요.)") },
        { hi: [39, 40], bubble: t(E,
          "Quick exits: already in the notebook → done.\nEmpty piece or no budget left → impossible (0).",
          "바로 끝나는 경우: 공책에 이미 있으면 → 끝.\n빈 조각이거나 예산이 없으면 → 못 만듦 (0).") },
        { hi: [41, 43], bubble: t(E,
          "First time we open this piece — trick ①: all numbers the same?\nThen one PRINT + REP does it → YES.  e.g. [7 7 7] ✓",
          "이 조각을 처음 열었을 때 — 요령 ①: 숫자가 다 같나?\n그럼 PRINT 하나 + REP 로 끝 → YES.  예: [7 7 7] ✓") },
        { hi: [44, 52], bubble: t(E,
          "Trick ② prep: collect block lengths that actually repeat.\ne.g. [1 2 1 2] → block length 2 works. Then reset the progress marks.",
          "요령 ② 준비: 실제로 반복되는 블록 길이만 모아요.\n예: [1 2 1 2] → 블록 길이 2 가 됨. 그리고 진행 표시를 초기화.") },
        { hi: [53, 58], bubble: t(E,
          "Trick ② run: is that block makable? Check the notebook.\nIf it's NOT in the notebook yet → push it on the list and come back later.",
          "요령 ② 실행: 그 블록은 만들 수 있나? 공책을 봐요.\n공책에 아직 없으면 → 목록에 올려두고 나중에 다시 와요.") },
        { hi: [59, 70], bubble: t(E,
          "Trick ③: cut in two and split the budget.\nLeft makable AND right makable? Same rule — unknown piece goes on the list.\ne.g. [1 1 2 2] → [1 1] + [2 2] ✓",
          "요령 ③: 둘로 자르고 예산도 나눠요.\n왼쪽도 되고 오른쪽도 되나? 규칙은 같아요 — 모르는 조각은 목록에.\n예: [1 1 2 2] → [1 1] + [2 2] ✓") },
        { hi: [71, 71], bubble: t(E,
          "This is what recursion used to do for us:\n\"I need a smaller answer first\" → we put it on the list and loop again.\nThe pRep/pCut/pK1 marks remember where we were.",
          "이게 원래 재귀가 대신 해주던 일이에요:\n\"더 작은 답이 먼저 필요해\" → 목록에 올리고 다시 돌아요.\npRep/pCut/pK1 표시가 '어디까지 했는지' 를 기억해줘요.") },
        { hi: [72, 74], bubble: t(E,
          "All three tricks tried → write the answer in the notebook and remove the piece.\nIt will never be solved twice.",
          "세 요령 다 해봤으면 → 답을 공책에 적고 조각을 치워요.\n같은 조각을 두 번 풀 일은 없어요.") },
        { hi: [12, 21], bubble: t(E,
          "The helpers — plain checks, no recursion, no notebook.\nall_same: any number different from the first → false.\nis_repeat_of: does a block of length b repeat all the way?",
          "도우미들 — 그냥 단순 검사. 재귀도 공책도 안 써요.\nall_same: 첫 숫자와 다른 게 있으면 false.\nis_repeat_of: 길이 b 블록이 끝까지 반복되나?") },
        { hi: [75, 78], bubble: t(E,
          "The notebook entry for the WHOLE sequence is our answer → print YES / NO.\nOnly the pieces we actually needed were ever computed. ⭐",
          "전체 수열에 대한 공책 값이 곧 우리 답 → YES / NO 출력.\n실제로 필요했던 조각만 계산했어요. ⭐") },
      ],
    };
  }
  return {
    code: E ? PSQ_STK_PY_EN : PSQ_STK_PY,
    vars,
    marks: [
      { from: 84, to: 86, color: "#0d9488", ko: "📋 재귀 대신 이것!", en: "📋 instead of recursion!" },
    ],
    beats: [
      { hi: [0, 6], bubble: t(E,
        "Start where we always start — the INPUT.\nT = how many cases; then each case: N, K (the PRINT budget), and the target.",
        "언제나 시작은 — 입력부터.\nT = 케이스 수, 케이스마다 N, K(PRINT 예산), 목표 수열.") },
      { hi: [8, 12], bubble: t(E,
        "A little prep: divisors by length.\nTrick ② only works when the block length DIVIDES the piece length — so we list those first.",
        "작은 준비: 길이별 약수.\n요령 ② 는 블록 길이가 조각 길이를 '나눠떨어질' 때만 되니까 미리 모아둬요.") },
      { hi: [14, 16], bubble: t(E,
        "⭐ Our three tools:\nmemo = the answer notebook · prog = how far we got on each piece\ntodo = the TO-DO list — this is what replaces recursion.",
        "⭐ 준비물 셋:\nmemo = 답 공책 · prog = 각 조각을 어디까지 해봤는지\ntodo = 할 일 목록 — 이게 재귀를 대신해요.") },
      { hi: [18, 19], bubble: t(E,
        "The loop: look at the piece on top of the TO-DO list.\n(Just LOOK — we don't remove it until its answer is settled.)",
        "반복문: 할 일 목록 맨 위 조각을 봐요.\n(보기만 — 답이 확정될 때까지 안 치워요.)") },
      { hi: [21, 27], bubble: t(E,
        "Quick exits: already in the notebook → skip.\nEmpty piece or no budget → can't be made.",
        "바로 끝나는 경우: 공책에 이미 있으면 → 넘어가기.\n빈 조각이거나 예산이 없으면 → 못 만듦.") },
      { hi: [29, 38], bubble: t(E,
        "First time we open this piece — trick ①: are all numbers the same?\nThen one PRINT wrapped in REP does it → True.  e.g. [7 7 7] ✓",
        "이 조각을 처음 꺼냈을 때 — 요령 ①: 숫자가 다 같나?\n그럼 PRINT 하나를 REP 로 감싸면 끝 → True.  예: [7 7 7] ✓") },
      { hi: [39, 48], bubble: t(E,
        "Trick ② prep: collect the block lengths that actually repeat.\ne.g. [1 2 1 2] → block length 2 works.\nThen save the progress marks for this piece.",
        "요령 ② 준비: 실제로 반복되는 블록 길이만 모아요.\n예: [1 2 1 2] → 블록 길이 2 가 됨.\n그리고 이 조각의 진행 표시를 저장해요.") },
      { hi: [50, 52], bubble: t(E,
        "p = where we left off on this piece.\nneed = a smaller piece whose answer we don't know yet · res = the answer so far.",
        "p = 이 조각을 어디까지 했는지.\nneed = 아직 답을 모르는 더 작은 조각 · res = 지금까지의 답.") },
      { hi: [54, 62], bubble: t(E,
        "Trick ② run: is the block makable? Look in the notebook.\nNot there yet → that block becomes `need` (we'll do it first).",
        "요령 ② 실행: 그 블록은 만들 수 있나? 공책을 봐요.\n아직 없으면 → 그 블록이 `need` (그것부터 처리해요).") },
      { hi: [64, 82], bubble: t(E,
        "Trick ③: cut in two and split the budget.\nLeft makable AND right makable? Unknown pieces become `need` too.\ne.g. [1 1 2 2] → [1 1] + [2 2] ✓",
        "요령 ③: 둘로 자르고 예산도 나눠요.\n왼쪽도 되고 오른쪽도 되나? 모르는 조각은 역시 `need`.\n예: [1 1 2 2] → [1 1] + [2 2] ✓") },
      { hi: [84, 86], bubble: t(E,
        "⭐ This is exactly what recursion used to do for us:\n\"I need a smaller answer first\" → put it on the TO-DO list and loop again.\nWhen we come back, `prog` remembers where we stopped.",
        "⭐ 이게 바로 재귀가 대신 해주던 일이에요:\n\"더 작은 답이 먼저 필요해\" → 할 일 목록에 올리고 다시 반복.\n돌아왔을 때 `prog` 가 '어디서 멈췄는지' 를 기억해줘요.") },
      { hi: [88, 90], bubble: t(E,
        "All three tricks tried → write the answer in the notebook, drop the piece.\nSame piece is never solved twice.",
        "세 요령 다 해봤으면 → 답을 공책에 적고 조각을 치워요.\n같은 조각을 두 번 풀 일은 없어요.") },
      { hi: [92, 92], bubble: t(E,
        "The notebook entry for the WHOLE sequence is our answer → print YES / NO.\nNo recursion anywhere — and we only computed the pieces we actually needed. ⭐",
        "전체 수열에 대한 공책 값이 곧 우리 답 → YES / NO 출력.\n재귀는 어디에도 없고 — 실제로 필요한 조각만 계산했어요. ⭐") },
    ],
  };
}

export function getPrintseqSections(E) {
  return [
    {
      label: t(E, "1️⃣ First — read the input.", "1️⃣ 우선 — 입력부터 받기."),
      color: A,
      py: [
        "import sys",
        "input = sys.stdin.readline",
        "",
        "T = int(input())          # 테스트 케이스 수",
        "for _ in range(T):",
        "    N, K = map(int, input().split())   # K = PRINT 예산",
        "    target = list(map(int, input().split()))",
      ],
      cpp: [
        "int main() {",
        "    int T; cin >> T;",
        "    while (T--) {",
        "        cin >> N >> K;",
        "        target_seq.assign(N, 0);",
        "        for (int i = 0; i < N; i++) cin >> target_seq[i];",
      ],
      why: [
        t(E, "T test cases; each gives N, K (the PRINT budget) and the target sequence.",
            "케이스 T 개, 각각 N, K(PRINT 예산), 목표 수열."),
      ],
    },
    {
      label: t(E, "2️⃣ Three tools — notebook, progress marks, TO-DO list.", "2️⃣ 준비물 셋 — 답 공책, 진행 표시, 할 일 목록."),
      color: A,
      py: [
        "    # 길이별 약수 — 요령②는 '약수' 길이 블록만 반복이 될 수 있어요",
        "    divs = [[] for _ in range(N + 1)]",
        "    for b in range(1, N + 1):",
        "        for L in range(b * 2, N + 1, b):",
        "            divs[L].append(b)",
        "",
        "    memo = {}              # 답 공책: (i, j, k) → True / False",
        "    prog = {}              # 각 조각을 '어디까지 해봤는지'",
        "    todo = [(0, N, K)]     # 할 일 목록 — 전체 수열부터 시작 (재귀 대신 이걸 굴려요)",
      ],
      cpp: [
        "int N, K;",
        "vector<int> target_seq;",
        "int memo[101][101][4];          // -1 = 아직 모름, 0 = NO, 1 = YES",
        "bool started[101][101][4];",
        "int pRep[101][101][4], pCut[101][101][4], pK1[101][101][4];",
        "vector<int> reps[101][101];     // (i, j) 조각의 반복 블록 후보",
        "bool repsDone[101][101];",
      ],
      why: [
        t(E, "memo = answers we already know. prog = how far we got on each piece. todo = the TO-DO list, which replaces recursion.",
            "memo = 이미 아는 답. prog = 각 조각을 어디까지 해봤는지. todo = 할 일 목록 — 이게 재귀를 대신해요."),
        t(E, "divs: trick ② only works when the block length divides the piece length, so we list divisors up front.",
            "divs: 요령 ② 는 블록 길이가 조각 길이를 나눠떨어질 때만 되니 약수를 미리 모아둬요."),
      ],
    },
    {
      label: t(E, "3️⃣ The loop — take the top piece; quick exits.", "3️⃣ 반복문 — 맨 위 조각 꺼내기, 바로 끝나는 경우."),
      color: A,
      py: [
        "    while todo:",
        "        i, j, k = todo[-1]",
        "",
        "        if (i, j, k) in memo:          # 이미 푼 조각이면 넘어가기",
        "            todo.pop()",
        "            continue",
        "        if i >= j or k <= 0:           # 빈 조각 / 예산 없음 → 못 만듦",
        "            memo[(i, j, k)] = False",
        "            todo.pop()",
        "            continue",
      ],
      cpp: [
        "        while (!stk.empty()) {",
        "            int i = stk.back()[0], j = stk.back()[1], k = stk.back()[2];",
        "            if (memo[i][j][k] != -1) { stk.pop_back(); continue; }",
        "            if (i >= j || k <= 0) { memo[i][j][k] = 0; stk.pop_back(); continue; }",
      ],
      why: [
        t(E, "Look at the top piece (don't remove it yet). Already in the notebook → skip. Empty piece or no budget → impossible.",
            "맨 위 조각을 봐요 (아직 치우지 않고). 공책에 있으면 → 넘어가기. 빈 조각·예산 0 → 못 만듦."),
      ],
    },
    {
      label: t(E, "4️⃣ The three tricks — unknown piece goes on the list.", "4️⃣ 세 요령 — 모르는 조각은 목록에."),
      color: A,
      py: [
        "        if (i, j, k) not in prog:      # 이 조각을 처음 꺼냈을 때만",
        "            same = True                # 요령 ①: 숫자가 다 같으면 PRINT 하나면 끝",
        "            for x in range(i + 1, j):",
        "                if target[x] != target[i]:",
        "                    same = False",
        "                    break",
        "            if same:",
        "                memo[(i, j, k)] = True",
        "                todo.pop()",
        "                continue",
        "            reps = []                  # 요령 ②: 반복되는 블록 길이 후보 모으기",
        "            for b in divs[j - i]:",
        "                good = True",
        "                for x in range(i + b, j):",
        "                    if target[x] != target[x - b]:",
        "                        good = False",
        "                        break",
        "                if good:",
        "                    reps.append(b)",
        "            prog[(i, j, k)] = [0, i + 1, 1, reps]   # [②진행, ③자를곳, ③예산나눔, 후보]",
        "",
        "        p = prog[(i, j, k)]",
        "        need = None                    # 아직 답을 모르는 '더 작은 조각'",
        "        res = False",
        "",
        "        while p[0] < len(p[3]):        # 요령 ②: 블록만 만들면 REP 로 반복",
        "            block = (i, i + p[3][p[0]], k)",
        "            if block not in memo:",
        "                need = block",
        "                break",
        "            if memo[block]:",
        "                res = True",
        "                break",
        "            p[0] += 1",
        "",
        "        if need is None and not res:   # 요령 ③: 둘로 자르고 예산도 나누기",
        "            while p[1] < j:",
        "                if p[2] >= k:",
        "                    p[1] += 1",
        "                    p[2] = 1",
        "                    continue",
        "                left = (i, p[1], p[2])",
        "                right = (p[1], j, k - p[2])",
        "                if left not in memo:",
        "                    need = left",
        "                    break",
        "                if memo[left]:",
        "                    if right not in memo:",
        "                        need = right",
        "                        break",
        "                    if memo[right]:",
        "                        res = True",
        "                        break",
        "                p[2] += 1",
        "",
        "        if need is not None:           # 모르는 조각이 있으면 그것부터 할 일 목록에",
        "            todo.append(need)",
        "            continue",
      ],
      cpp: [
        "            if (!started[i][j][k]) {",
        "                started[i][j][k] = true;",
        "                if (all_same(i, j)) { memo[i][j][k] = 1; stk.pop_back(); continue; }",
        "                if (!repsDone[i][j]) {",
        "                    repsDone[i][j] = true;",
        "                    int len = j - i;",
        "                    for (int b = 1; b < len; b++)",
        "                        if (len % b == 0 && is_repeat_of(i, j, b)) reps[i][j].push_back(b);",
        "                }",
        "                pRep[i][j][k] = 0; pCut[i][j][k] = i + 1; pK1[i][j][k] = 1;",
        "            }",
        "            bool need = false, res = false;",
        "            while (pRep[i][j][k] < (int)reps[i][j].size()) {          // 요령 ②",
        "                int b = reps[i][j][pRep[i][j][k]];",
        "                if (memo[i][i + b][k] == -1) { stk.push_back({i, i + b, k}); need = true; break; }",
        "                if (memo[i][i + b][k] == 1) { res = true; break; }",
        "                pRep[i][j][k]++;",
        "            }",
        "            if (!need && !res) {",
        "                while (pCut[i][j][k] < j) {                            // 요령 ③",
        "                    int cut = pCut[i][j][k], k1 = pK1[i][j][k];",
        "                    if (k1 >= k) { pCut[i][j][k]++; pK1[i][j][k] = 1; continue; }",
        "                    if (memo[i][cut][k1] == -1) { stk.push_back({i, cut, k1}); need = true; break; }",
        "                    if (memo[i][cut][k1] == 1) {",
        "                        if (memo[cut][j][k - k1] == -1) { stk.push_back({cut, j, k - k1}); need = true; break; }",
        "                        if (memo[cut][j][k - k1] == 1) { res = true; break; }",
        "                    }",
        "                    pK1[i][j][k]++;",
        "                }",
        "            }",
        "            if (need) continue;",
      ],
      why: [
        t(E, "① all same → one PRINT. ② a repeating block → make just the block. ③ cut in two and split the budget.",
            "① 다 같음 → PRINT 하나. ② 반복 블록 → 블록만 만들기. ③ 둘로 자르고 예산도 나누기."),
        t(E, "Key: if a smaller piece's answer isn't known yet, we push it on the TO-DO list and come back — prog remembers where we stopped. That's exactly what recursion used to do.",
            "핵심: 더 작은 조각의 답을 모르면 할 일 목록에 올리고 나중에 다시 와요 — prog 가 멈춘 자리를 기억하고요. 재귀가 대신 해주던 일이 이거예요."),
      ],
    },
    {
      label: t(E, "5️⃣ Settle the answer — and the full code.", "5️⃣ 답 확정 — 그리고 전체 코드."),
      color: A,
      py: PSQ_STK_PY, cpp: PSQ_STK_CPP,
      why: [
        t(E, "All three tricks tried → write the answer in the notebook and drop the piece. The notebook entry for the whole sequence is the answer.",
            "세 요령 다 해봤으면 → 답을 공책에 적고 조각을 치워요. 전체 수열의 공책 값이 곧 답."),
        t(E, "Only the pieces we actually needed get computed — that's why this is fast without recursion.",
            "실제로 필요한 조각만 계산돼요 — 그래서 재귀 없이도 빠른 거예요."),
      ],
      pyOnly: [
        t(E, "A tuple (i, j, k) works as a dict key — that's our notebook.",
            "튜플 (i, j, k) 를 dict 열쇠로 — 그게 우리 공책이에요."),
      ],
      cppOnly: [
        t(E, "memo/started/pRep/pCut/pK1 are plain 3-D arrays; the TO-DO list is a vector we push and pop.",
            "memo/started/pRep/pCut/pK1 는 3차원 배열이고, 할 일 목록은 push/pop 하는 vector 예요."),
      ],
    },
  ];
}
export function PrintseqProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ─── PDF helpers ─── */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","tuple"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair","function"];
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

export function downloadPrintseqPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Printing Sequences — Full Study Guide", "🖨️ Printing Sequences — 종합 풀이 노트");
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
<div class="sub">USACO February 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>${t(E, "Code (5 sections)", "코드 (5 섹션)")}</h2>
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
