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
  "T = int(input())                  # 테스트 케이스 수",
  "",
  "# 메모이제이션: 한 번 계산한 답을 memo 에 저장 → 같은 질문 또 오면 꺼내 씀",
  "# memo 열쇠 = (수열, 예산), 값 = True 또는 False",
  "memo = {}",
  "",
  "# 요령 ①: 숫자가 다 같은가?",
  "def is_all_same(seq):",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            return False",
  "    return True",
  "",
  "# 요령 ②: 같은 블록이 여러 번 반복? → 블록만 풀면 됨",
  "def try_repeat(seq, budget):",
  "    n = len(seq)",
  "    for copies in range(2, n + 1):",
  "        if n % copies != 0:",
  "            continue",
  "        block_len = n // copies",
  "        block = seq[:block_len]",
  "",
  "        # 정말 이 블록이 끝까지 반복되는지 확인",
  "        is_repeat = True",
  "        for i in range(n):",
  "            if seq[i] != block[i % block_len]:",
  "                is_repeat = False",
  "                break",
  "",
  "        if is_repeat:",
  "            if can(block, budget):   # 같은 질문, 더 작게! (재귀)",
  "                return True",
  "    return False",
  "",
  "# 요령 ③: 둘로 잘라서 예산 나눠 갖기",
  "def try_cut(seq, budget):",
  "    n = len(seq)",
  "    for cut in range(1, n):",
  "        for left_budget in range(1, budget):",
  "            left = seq[:cut]              # 왼쪽 조각",
  "            right = seq[cut:]             # 오른쪽 조각",
  "            right_budget = budget - left_budget",
  "            if can(left, left_budget):           # 왼쪽 되나?",
  "                if can(right, right_budget):     # 오른쪽도 되나?",
  "                    return True                  # 둘 다 → 성공!",
  "    return False",
  "",
  "# can(질문 쪽지): seq 를 PRINT budget 개 이하로 만들 수 있나?",
  "def can(seq, budget):",
  "    # 이미 푼 질문이면 → 메모에서 답 꺼내기 (다시 안 풂!)",
  "    if (seq, budget) in memo:",
  "        return memo[(seq, budget)]",
  "",
  "    # ✋ 베이스 케이스 (재귀가 멈추는 곳): 빈 수열/예산 없음 → 그 자리에서 바로 NO",
  "    if len(seq) == 0 or budget <= 0:",
  "        return False",
  "",
  "    # 요령 ① → ② → ③ 순서대로 시도",
  "    result = False",
  "    if is_all_same(seq):              # ① 다 같음 → PRINT 1 개면 끝",
  "        result = True",
  "    elif try_repeat(seq, budget):     # ② 블록 반복",
  "        result = True",
  "    elif try_cut(seq, budget):        # ③ 둘로 자르기",
  "        result = True",
  "",
  "    memo[(seq, budget)] = result      # 메모에 적어두기",
  "    return result",
  "",
  "for _ in range(T):",
  "    # 첫 줄: N K → map(int, ...) 로 한 번에 두 개",
  "    N, K = map(int, input().split())     # N=목표 길이(참고), K=PRINT 예산",
  "",
  "    # 목표 수열 → tuple 로. (딕셔너리 memo 의 열쇠는 '안 바뀌는 값'만 돼요.",
  "    #  리스트는 바뀔 수 있어 ✗, tuple 은 못 바꿔서 ✓)",
  "    target = tuple(map(int, input().split()))",
  "",
  "    memo.clear()                         # 새 케이스 → 메모 비우기",
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
  "// 메모이제이션: 한 번 계산한 답을 memo 에 저장 → 같은 질문 또 오면 꺼내 씀",
  "// memo 열쇠 = \"수열#예산\" 문자열 (예: \"1,2,1,2,#2\")",
  "map<string, bool> memo;",
  "",
  "// 수열 + 예산을 문자열 열쇠 하나로 합치기",
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
  "// can 을 미리 '선언' — 아래 요령 ②③ 이 can 을 다시 부르기 때문 (재귀)",
  "bool can(vector<int> seq, int budget);",
  "",
  "// 요령 ①: 숫자가 다 같은가?",
  "bool is_all_same(vector<int>& seq) {",
  "    for (int i = 1; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[0]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// 요령 ②: 같은 블록이 여러 번 반복? → 블록만 풀면 됨",
  "bool try_repeat(vector<int>& seq, int budget) {",
  "    int n = seq.size();",
  "    for (int copies = 2; copies <= n; copies++) {",
  "        if (n % copies != 0) {",
  "            continue;",
  "        }",
  "        int block_len = n / copies;",
  "",
  "        // 정말 이 블록이 끝까지 반복되는지 확인",
  "        bool is_repeat = true;",
  "        for (int i = 0; i < n; i++) {",
  "            if (seq[i] != seq[i % block_len]) {",
  "                is_repeat = false;",
  "            }",
  "        }",
  "",
  "        if (is_repeat) {",
  "            vector<int> block;",
  "            for (int i = 0; i < block_len; i++) {",
  "                block.push_back(seq[i]);",
  "            }",
  "            if (can(block, budget)) {   // 같은 질문, 더 작게! (재귀)",
  "                return true;",
  "            }",
  "        }",
  "    }",
  "    return false;",
  "}",
  "",
  "// 요령 ③: 둘로 잘라서 예산 나눠 갖기",
  "bool try_cut(vector<int>& seq, int budget) {",
  "    int n = seq.size();",
  "    for (int cut = 1; cut < n; cut++) {",
  "        for (int left_budget = 1; left_budget < budget; left_budget++) {",
  "            vector<int> left, right;",
  "            for (int i = 0; i < cut; i++) {",
  "                left.push_back(seq[i]);",
  "            }",
  "            for (int i = cut; i < n; i++) {",
  "                right.push_back(seq[i]);",
  "            }",
  "            int right_budget = budget - left_budget;",
  "            if (can(left, left_budget)) {           // 왼쪽 되나?",
  "                if (can(right, right_budget)) {     // 오른쪽도 되나?",
  "                    return true;                    // 둘 다 → 성공!",
  "                }",
  "            }",
  "        }",
  "    }",
  "    return false;",
  "}",
  "",
  "// can(질문 쪽지): seq 를 PRINT budget 개 이하로 만들 수 있나?",
  "bool can(vector<int> seq, int budget) {",
  "    // 이미 푼 질문이면 → 메모에서 답 꺼내기",
  "    string key = make_key(seq, budget);",
  "    if (memo.count(key) > 0) {",
  "        return memo[key];",
  "    }",
  "",
  "    // ✋ 베이스 케이스 (재귀가 멈추는 곳): 빈 수열/예산 없음 → 그 자리에서 바로 NO",
  "    if ((int)seq.size() == 0 || budget <= 0) {",
  "        return false;",
  "    }",
  "",
  "    // 요령 ① → ② → ③ 순서대로 시도",
  "    bool result = false;",
  "    if (is_all_same(seq)) {                 // ① 다 같음 → PRINT 1 개면 끝",
  "        result = true;",
  "    } else if (try_repeat(seq, budget)) {   // ② 블록 반복",
  "        result = true;",
  "    } else if (try_cut(seq, budget)) {      // ③ 둘로 자르기",
  "        result = true;",
  "    }",
  "",
  "    memo[key] = result;              // 메모에 적어두기",
  "    return result;",
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
  "        memo.clear();                // 새 케이스 → 메모 비우기",
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
  "T = int(input())                  # number of test cases",
  "",
  "# memoization: store each answer in memo -> reuse when the same question returns",
  "# memo key = (sequence, budget), value = True or False",
  "memo = {}",
  "",
  "# trick 1: are all numbers the same?",
  "def is_all_same(seq):",
  "    for x in seq:",
  "        if x != seq[0]:",
  "            return False",
  "    return True",
  "",
  "# trick 2: same block repeated several times? -> just solve the block",
  "def try_repeat(seq, budget):",
  "    n = len(seq)",
  "    for copies in range(2, n + 1):",
  "        if n % copies != 0:",
  "            continue",
  "        block_len = n // copies",
  "        block = seq[:block_len]",
  "",
  "        # check the block really repeats all the way",
  "        is_repeat = True",
  "        for i in range(n):",
  "            if seq[i] != block[i % block_len]:",
  "                is_repeat = False",
  "                break",
  "",
  "        if is_repeat:",
  "            if can(block, budget):   # same question, smaller! (recursion)",
  "                return True",
  "    return False",
  "",
  "# trick 3: cut in two and split the budget",
  "def try_cut(seq, budget):",
  "    n = len(seq)",
  "    for cut in range(1, n):",
  "        for left_budget in range(1, budget):",
  "            left = seq[:cut]              # left piece",
  "            right = seq[cut:]             # right piece",
  "            right_budget = budget - left_budget",
  "            if can(left, left_budget):           # left works?",
  "                if can(right, right_budget):     # right too?",
  "                    return True                  # both -> success!",
  "    return False",
  "",
  "# can (the question-note): can seq be made with <= budget PRINTs?",
  "def can(seq, budget):",
  "    # already solved? -> take the answer from the memo (no re-solving!)",
  "    if (seq, budget) in memo:",
  "        return memo[(seq, budget)]",
  "",
  "    # ✋ BASE CASE (where recursion stops): empty seq / no budget -> return False right here",
  "    if len(seq) == 0 or budget <= 0:",
  "        return False",
  "",
  "    # try trick 1 -> 2 -> 3 in order",
  "    result = False",
  "    if is_all_same(seq):              # 1) all same -> one PRINT",
  "        result = True",
  "    elif try_repeat(seq, budget):     # 2) repeating block",
  "        result = True",
  "    elif try_cut(seq, budget):        # 3) cut in two",
  "        result = True",
  "",
  "    memo[(seq, budget)] = result      # write into the memo",
  "    return result",
  "",
  "for _ in range(T):",
  "    # first line: N and K",
  "    N, K = map(int, input().split())     # N=target length (info), K=PRINT budget",
  "",
  "    # target sequence -> tuple (dict keys must be immutable:",
  "    #  a list can change x, a tuple can't v)",
  "    target = tuple(map(int, input().split()))",
  "",
  "    memo.clear()                         # new case -> clear the memo",
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
  "// memoization: store each answer in memo -> reuse when the same question returns",
  "// memo key = \"sequence#budget\" string (e.g. \"1,2,1,2,#2\")",
  "map<string, bool> memo;",
  "",
  "// combine sequence + budget into one string key",
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
  "// 'declare' can first — tricks 2/3 below call can again (recursion)",
  "bool can(vector<int> seq, int budget);",
  "",
  "// trick 1: are all numbers the same?",
  "bool is_all_same(vector<int>& seq) {",
  "    for (int i = 1; i < (int)seq.size(); i++) {",
  "        if (seq[i] != seq[0]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// trick 2: same block repeated several times? -> just solve the block",
  "bool try_repeat(vector<int>& seq, int budget) {",
  "    int n = seq.size();",
  "    for (int copies = 2; copies <= n; copies++) {",
  "        if (n % copies != 0) {",
  "            continue;",
  "        }",
  "        int block_len = n / copies;",
  "",
  "        // check the block really repeats all the way",
  "        bool is_repeat = true;",
  "        for (int i = 0; i < n; i++) {",
  "            if (seq[i] != seq[i % block_len]) {",
  "                is_repeat = false;",
  "            }",
  "        }",
  "",
  "        if (is_repeat) {",
  "            vector<int> block;",
  "            for (int i = 0; i < block_len; i++) {",
  "                block.push_back(seq[i]);",
  "            }",
  "            if (can(block, budget)) {   // same question, smaller! (recursion)",
  "                return true;",
  "            }",
  "        }",
  "    }",
  "    return false;",
  "}",
  "",
  "// trick 3: cut in two and split the budget",
  "bool try_cut(vector<int>& seq, int budget) {",
  "    int n = seq.size();",
  "    for (int cut = 1; cut < n; cut++) {",
  "        for (int left_budget = 1; left_budget < budget; left_budget++) {",
  "            vector<int> left, right;",
  "            for (int i = 0; i < cut; i++) {",
  "                left.push_back(seq[i]);",
  "            }",
  "            for (int i = cut; i < n; i++) {",
  "                right.push_back(seq[i]);",
  "            }",
  "            int right_budget = budget - left_budget;",
  "            if (can(left, left_budget)) {           // left works?",
  "                if (can(right, right_budget)) {     // right too?",
  "                    return true;                    // both -> success!",
  "                }",
  "            }",
  "        }",
  "    }",
  "    return false;",
  "}",
  "",
  "// can (the question-note): can seq be made with <= budget PRINTs?",
  "bool can(vector<int> seq, int budget) {",
  "    // already solved? -> take the answer from the memo",
  "    string key = make_key(seq, budget);",
  "    if (memo.count(key) > 0) {",
  "        return memo[key];",
  "    }",
  "",
  "    // ✋ BASE CASE (where recursion stops): empty seq / no budget -> return false right here",
  "    if ((int)seq.size() == 0 || budget <= 0) {",
  "        return false;",
  "    }",
  "",
  "    // try trick 1 -> 2 -> 3 in order",
  "    bool result = false;",
  "    if (is_all_same(seq)) {                 // 1) all same -> one PRINT",
  "        result = true;",
  "    } else if (try_repeat(seq, budget)) {   // 2) repeating block",
  "        result = true;",
  "    } else if (try_cut(seq, budget)) {      // 3) cut in two",
  "        result = true;",
  "    }",
  "",
  "    memo[key] = result;              // write into the memo",
  "    return result;",
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
  "        memo.clear();                // new case -> clear the memo",
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
export function getPrintseqWalk(E, lang = "py") {
  const vars = [
    { v: "seq", ko: "지금 보는 수열", en: "current sequence" },
    { v: "n", ko: "seq 길이", en: "length of seq" },
    { v: "budget", ko: "남은 PRINT 예산", en: "PRINT budget left" },
    { v: "block", ko: "반복 후보 블록", en: "candidate block" },
  ];
  if (lang === "cpp") {
    return {
      code: E ? PSQ_FAST_CPP_EN : PSQ_FAST_CPP,
      vars,
      // ✋ 베이스 케이스 상시 강조 (선생님 2026-07-17: "base case 가 눈에 잘 보이게")
      marks: [{ from: 96, to: 99, ko: "✋ 베이스 케이스", en: "✋ base case" }],
      beats: [
        { hi: [115, 124], bubble: t(E,
          "Start where we always start — the INPUT.\nmain reads T, then each case: N, K, and the target sequence.",
          "언제나 시작은 — 입력부터.\nmain 에서 T, 그리고 케이스마다 N, K, 목표 수열을 읽어요.") },
        { hi: [126, 131], bubble: t(E,
          "What do we DO with that input?\nCall can(target, K) → print YES / NO. That's the goal.\nSo now let's READ that function 👇",
          "이 입력으로 뭘 하지?\ncan(목표, K) 를 불러 YES / NO 출력. 이게 목표.\n그럼 이제 그 함수를 읽어봐요 👇") },
        { hi: [88, 94], bubble: t(E,
          "can — the question-note. First thing: check the memo.\nIf this exact note was solved before → hand back the saved answer (no re-solving!).\n(The key is the string built by make_key, lines 12~21.)",
          "can — '질문 쪽지'예요. 받자마자 제일 먼저: 메모 확인.\n똑같은 쪽지를 전에 풀었다면 → 적어둔 답을 바로 꺼내요 (다시 안 풂!).\n(열쇠는 위 make_key(12~21행)가 만든 문자열.)") },
        { hi: [6, 8], bubble: t(E,
          "This is the answer notebook — memo.\nKey = \"sequence#budget\" string, value = true/false.\nMEMOIZATION (top-down DP): solve once, reuse forever.",
          "이게 답 공책 — memo.\n열쇠 = \"수열#예산\" 문자열, 값 = true/false.\n한 번 푼 건 영원히 재사용 = 메모이제이션 (top-down DP).") },
        { hi: [96, 99], bubble: t(E,
          "The ✋ BASE CASE, right at the top —\nempty sequence or no budget → return false RIGHT HERE.\nThis is where the recursion stops — without it, it never ends!",
          "맨 위에서 ✋ 베이스 케이스부터 —\n빈 수열이거나 예산이 없으면 → 그 자리에서 바로 return false.\n재귀가 멈추는 곳 — 이게 없으면 영원히 안 끝나요!") },
        { hi: [101, 109], bubble: t(E,
          "Didn't stop? Then try trick ① → ② → ③ in order.\ncan() now reads EXACTLY like our plan!\nEach trick is its own function above — let's visit them 👇",
          "안 멈췄으면? 요령 ① → ② → ③ 을 차례로 시도.\ncan() 이 우리 계획서랑 똑같이 읽히죠!\n요령 하나 = 함수 하나 — 위에 있는 그 함수들을 보러 가요 👇") },
        { hi: [25, 33], bubble: t(E,
          "Trick ① — is_all_same: one job only.\nAny number different from the first → false. All same → true.",
          "요령 ① — is_all_same: 하는 일이 딱 하나.\n첫 숫자와 다른 게 하나라도 있으면 false. 다 같으면 true.") },
        { hi: [35, 42], bubble: t(E,
          "Trick ② — try_repeat: pick a block candidate.\nIf n divides evenly into `copies` pieces, block_len = n / copies.",
          "요령 ② — try_repeat: 블록 후보를 잡아요.\nn 이 copies 로 나눠떨어지면 block_len = n / copies.") },
        { hi: [44, 59], bubble: t(E,
          "Check it REALLY repeats all the way.\nIf yes → can(block, budget): the same question, just smaller. (recursion!)",
          "정말 끝까지 반복인지 확인.\n맞으면 → can(block, budget): 같은 질문을 블록만큼 작게! (재귀)") },
        { hi: [65, 77], bubble: t(E,
          "Trick ③ — try_cut: CUT the sequence in two.\nLeft program + right program run back-to-back → the whole sequence prints.\nThe budget is shared: left gets left_budget, right gets the rest.",
          "요령 ③ — try_cut: 수열을 둘로 잘라요.\n왼쪽 찍는 프로그램 + 오른쪽 찍는 프로그램을 이어 붙이면 전체 완성.\n예산은 나눠 써요: 왼쪽 left_budget, 오른쪽 나머지.") },
        { hi: [78, 85], bubble: t(E,
          "Does the LEFT fit its budget AND the RIGHT the rest?\nBoth yes → success! Each piece is checked by can() again (recursion).\nTry every cut × every budget split until one combo works.",
          "왼쪽이 그 예산 안에 되고 + 오른쪽도 나머지로 되나?\n둘 다 되면 → 성공! 각 조각은 can() 을 또 불러 확인 (재귀).\n어디서 자를지 × 예산 나누기, 되는 조합까지 다 시도.") },
        { hi: [22, 23], bubble: t(E,
          "One C++ detail: tricks ②③ call can() which is defined BELOW.\nC++ reads top-to-bottom, so we 'declare' can up front: \"this function exists!\"",
          "C++ 디테일 하나: 요령 ②③ 이 '아래에 있는' can 을 부르죠?\nC++ 은 위에서 아래로 읽으니, \"이런 함수 있어요\" 하고 미리 선언해 둬요.") },
        { hi: [111, 112], bubble: t(E,
          "Finally: write the answer into memo, then return it. Done!",
          "마지막: 답을 memo 에 적고 돌려줘요. 끝!") },
      ],
    };
  }
  return {
    code: E ? PSQ_FAST_PY_EN : PSQ_FAST_PY,
    vars,
    // ✋ 베이스 케이스 상시 강조 (선생님 2026-07-17: "base case 가 눈에 잘 보이게")
    marks: [{ from: 53, to: 55, ko: "✋ 베이스 케이스", en: "✋ base case" }],
    beats: [
      { hi: [0, 0], bubble: t(E,
        "Start where we always start — the INPUT.\nFirst line: T = how many cases. The for-loop at the bottom repeats T times.",
        "언제나 시작은 — 입력부터.\n첫 줄: T = 케이스가 몇 개인지. 맨 아래 for 가 이걸 T 번 반복해요.") },
      { hi: [69, 71], bubble: t(E,
        "Each of the T cases has 2 lines:\nfirst line → N and K, next line → the target sequence.",
        "T 개 케이스마다 2 줄씩:\n첫 줄 → N 과 K, 다음 줄 → 목표 수열.") },
      { hi: [73, 75], bubble: t(E,
        "Why a tuple, not a list?\nSoon we use (target, budget) as a KEY in the memo dictionary.\nDict keys must never change — a list CAN change (✗), a tuple can't (✓).",
        "왜 리스트가 아니라 tuple 이냐면?\n곧 (목표, 예산) 을 memo 딕셔너리의 '열쇠'로 쓸 거예요.\n딕셔너리 열쇠는 절대 안 바뀌는 값만 돼요 — 리스트는 바뀌니까 ✗, tuple 은 못 바꾸니까 ✓.") },
      { hi: [77, 81], bubble: t(E,
        "What do we DO with that input?\nCall can(target, K) → YES / NO. That's the goal.\nSo now let's READ that function 👇",
        "이 입력으로 뭘 하지?\ncan(목표, K) 를 불러 YES / NO 를 받아요. 이게 목표.\n그럼 이제 그 함수를 읽어봐요 👇") },
      { hi: [47, 51], bubble: t(E,
        "can — the question-note. First thing inside: check the memo.\nIf this exact note was solved before → hand back the saved answer (no re-solving!).",
        "can — '질문 쪽지'예요. 받자마자 제일 먼저: 메모 확인.\n똑같은 쪽지를 전에 풀었다면 → 적어둔 답을 바로 꺼내요 (다시 안 풂!).") },
      { hi: [2, 4], bubble: t(E,
        "This is the answer notebook — memo.\nKey = (sequence, budget), value = True/False.\nMEMOIZATION (top-down DP): solve once, reuse forever.",
        "이게 답 공책 — memo.\n열쇠 = (수열, 예산), 값 = True/False.\n한 번 푼 건 영원히 재사용 = 메모이제이션 (top-down DP).") },
      { hi: [53, 55], bubble: t(E,
        "The ✋ BASE CASE, right at the top —\nempty sequence or no budget → return False RIGHT HERE.\nThis is where the recursion stops — without it, it never ends!",
        "맨 위에서 ✋ 베이스 케이스부터 —\n빈 수열이거나 예산이 없으면 → 그 자리에서 바로 return False.\n재귀가 멈추는 곳 — 이게 없으면 영원히 안 끝나요!") },
      { hi: [57, 64], bubble: t(E,
        "Didn't stop? Then try trick ① → ② → ③ in order.\ncan() now reads EXACTLY like our plan!\nEach trick is its own function above — let's visit them 👇",
        "안 멈췄으면? 요령 ① → ② → ③ 을 차례로 시도.\ncan() 이 우리 계획서랑 똑같이 읽히죠!\n요령 하나 = 함수 하나 — 위에 있는 그 함수들을 보러 가요 👇") },
      { hi: [6, 11], bubble: t(E,
        "Trick ① — is_all_same: one job only.\nAny number different from the first → False. All same → True.",
        "요령 ① — is_all_same: 하는 일이 딱 하나.\n첫 숫자와 다른 게 하나라도 있으면 False. 다 같으면 True.") },
      { hi: [13, 20], bubble: t(E,
        "Trick ② — try_repeat: pick a block candidate.\nIf n divides evenly into `copies` pieces, block_len = n // copies.",
        "요령 ② — try_repeat: 블록 후보를 잡아요.\nn 이 copies 로 나눠떨어지면 block_len = n // copies.") },
      { hi: [22, 32], bubble: t(E,
        "Check it REALLY repeats all the way.\nIf yes → can(block, budget): the same question, just smaller. (recursion!)",
        "정말 끝까지 반복인지 확인.\n맞으면 → can(block, budget): 같은 질문을 블록만큼 작게! (재귀)") },
      { hi: [34, 41], bubble: t(E,
        "Trick ③ — try_cut: CUT the sequence in two.\nLeft program + right program run back-to-back → the whole sequence prints.\nThe budget is shared: left gets left_budget, right gets the rest.",
        "요령 ③ — try_cut: 수열을 둘로 잘라요.\n왼쪽 찍는 프로그램 + 오른쪽 찍는 프로그램을 이어 붙이면 전체 완성.\n예산은 나눠 써요: 왼쪽 left_budget, 오른쪽 나머지.") },
      { hi: [42, 45], bubble: t(E,
        "Does the LEFT fit its budget AND the RIGHT the rest?\nBoth yes → success! Each piece is checked by can() again (recursion).\nTry every cut × every budget split until one combo works.",
        "왼쪽이 그 예산 안에 되고 + 오른쪽도 나머지로 되나?\n둘 다 되면 → 성공! 각 조각은 can() 을 또 불러 확인 (재귀).\n어디서 자를지 × 예산 나누기, 되는 조합까지 다 시도.") },
      { hi: [66, 67], bubble: t(E,
        "Finally: write the answer into memo, then return it. Done!",
        "마지막: 답을 memo 에 적고 돌려줘요. 끝!") },
    ],
  };
}

export function getPrintseqSections(E) {
  return [
    {
      label: t(E, "1️⃣ First — we need the input, right? Read it.", "1️⃣ 우선 — 입력값부터 받아야겠지? 입력 받기."),
      color: A,
      py: PSQ_S1_PY, cpp: PSQ_S1_CPP,
      why: [
        t(E, "Before anything, get the numbers in. T cases; for each read N (length), K (budget), then the N-value target.",
            "뭘 하든 먼저 숫자부터 받아와요. T 케이스, 각각 N (길이) · K (예산) · 그 다음 목표 수열 N 개."),
        t(E, "Python tip: read the target as a tuple — later we'll use (seq, budget) as a memo key, and tuple can be a key (list can't).",
            "Python 팁: 목표를 tuple 로 받아요 — 나중에 (수열, 예산) 을 메모 열쇠로 쓰는데, 리스트는 열쇠가 안 되고 tuple 은 돼요."),
      ],
      aside: <SampleInputAside E={E} sample={PSQ_SAMPLE} highlight={[0, 1, 2]} note={t(E,
        "First lines: \"2\" (T=2), then case 1 = \"1 1\" + \"1\" (N=1, K=1, [1]).",
        "처음: \"2\" (T=2), 그 다음 케이스 1 = \"1 1\" + \"1\" (N=1, K=1, [1]).")} />,
    },
    {
      label: t(E, "2️⃣ Now — how do we decide YES/NO? Make can(). Dead ends first.", "2️⃣ 이제 — YES/NO 를 어떻게 판단하지? can() 만들기. 막다른 길 먼저."),
      color: "#0891b2",
      py: PSQ_S2_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "The whole decision is one question: can(seq, budget)? So let's build that function. Start with the easy 'impossible' cases.",
            "판단 전체가 결국 한 질문이에요: can(수열, 예산)? 그러니 그 함수부터 만들어요. 쉬운 '불가능' 경우부터 처리."),
        t(E, "Empty sequence → nothing to print → impossible. Budget gone (≤ 0) → no PRINT left → impossible.",
            "빈 수열 → 찍을 게 없음 → 불가능. 예산 0 이하 → PRINT 못 씀 → 불가능."),
      ],
    },
    {
      label: t(E, "3️⃣ Not a dead end? Try the easiest trick — all same.", "3️⃣ 막다른 길 아니면? 제일 쉬운 요령부터 — 다 같음."),
      color: "#dc2626",
      py: PSQ_S3_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Ask the simplest thing first: is every number the same? Then one PRINT wrapped in REP does it — done with just 1 PRINT.",
            "제일 단순한 것부터 물어요: 숫자가 다 같아? 그럼 PRINT 1 개를 REP 로 감싸면 끝 — PRINT 1 개로 해결."),
        t(E, "This is trick ①. If it fits, we can stop early and answer True.",
            "이게 요령 ①. 맞으면 바로 True 로 끝낼 수 있어요."),
      ],
    },
    {
      label: t(E, "4️⃣ Still stuck? Two more tricks — repeat, or cut.", "4️⃣ 그래도 안 되면? 요령 두 개 더 — 반복, 아니면 자르기."),
      color: "#7c3aed",
      py: PSQ_S4_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Trick ②: is it a small block repeated? Then wrap the block in REP — so we only need to solve the block. Same question, smaller → we call can() again.",
            "요령 ②: 작은 블록의 반복인가? 그럼 블록을 REP 로 감싸면 되니, 블록만 풀면 돼요. 같은 질문을 더 작게 → can() 을 또 부름."),
        t(E, "Trick ③: cut the sequence in two and split the budget. Left gets left_budget, right gets the rest. Try every cut and every budget split.",
            "요령 ③: 수열을 둘로 자르고 예산도 나눠요. 왼쪽 left_budget, 오른쪽 나머지. 모든 자르기 × 모든 예산 나누기를 시도."),
        t(E, "Tricks ① + ② + ③ cover every program this language can make — there's nothing else to try.",
            "요령 ①②③ 이면 이 언어로 만들 수 있는 모든 프로그램을 커버해요 — 더 시도할 건 없어요."),
      ],
    },
    {
      label: t(E, "5️⃣ Same question keeps coming back → memoization. Full code.", "5️⃣ 같은 질문이 자꾸 또 나오네 → 메모이제이션. 전체 코드."),
      color: "#15803d",
      py: PSQ_FAST_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Tricks ② and ③ ask can() the SAME question over and over. Solving it fresh every time is way too slow — so use memoization.",
            "요령 ②③ 이 can() 에게 '같은 질문'을 자꾸 또 물어봐요. 매번 처음부터 풀면 너무 느려요 — 그러니 메모에 적어둬요."),
        t(E, "Before solving: is this question already in the memo? Reuse it. After solving: write the answer in. That's the whole trick.",
            "풀기 전: 이 질문 메모에 이미 있나? 있으면 그대로 씀. 푼 뒤: 답을 적어둠. 이게 전부예요."),
        t(E, "Python: a dict keyed by (seq, budget). C++: map<string, bool> with a text key like \"1,2,1,2,#2\".",
            "Python: (수열, 예산) 을 열쇠로 하는 딕셔너리. C++: \"1,2,1,2,#2\" 같은 문자열 열쇠의 map<string, bool>."),
        t(E, "New test case → clear the memo (memo = {} / memo.clear()).",
            "새 케이스 → 메모 비우기 (memo = {} / memo.clear())."),
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
