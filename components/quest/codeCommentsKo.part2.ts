/* 영어 주석 → 한국어. `codeCommentsKo.ts` 가 합쳐 쓴다. 2/4 (2026-09-21) */
export const PART2: Record<string, string> = {
  "'B' impossible as first cell → min_stars stays [EMPTY, EMPTY]":
    "'B' 는 첫 칸으로 못 와요 → min_stars 는 그대로 [EMPTY, EMPTY]",
  "(a) original ★ here → +1": "(a) 원래 여기 별이 있었을 때 → +1",
  "(these are values we need to ADD to make mex = i)":
    "(mex 를 i 로 만들려면 더해야 하는 값들이에요)",
  "0-indexed": "0부터 세는 번호",
  "1) Rotate: cow at active[j] moves to active[(j+1) % K]":
    "1) 돌리기: active[j] 자리의 소가 active[(j+1) % K] 로 옮겨가요",
  "2) Shift: active positions all move +1 (mod N)":
    "2) 밀기: active 위치가 모두 +1 만큼 움직여요 (mod N)",
  "3 lines = answer grid, next 3 lines = guess grid (single test case)":
    "3줄 = 정답 칸, 다음 3줄 = 추측 칸 (테스트 케이스 1개)",
  "8 lines: 3 rows + 3 cols + 2 diagonals": "8줄: 가로줄 3 + 세로줄 3 + 대각선 2",
  "A +1/-1 range command changes the total gap by at most 2, so":
    "+1/-1 구간 명령 하나는 전체 간격을 최대 2까지만 바꿔요, 그래서",
  "Actually: which counter does cow N-1 go to?":
    "실제로는: 소 N-1 은 어느 창구로 갈까요?",
  "Alternating sum: + - + - ...  (decides the final value f)":
    "번갈아 더하고 빼기: + - + - ... (최종 값 f 를 결정해요)",
  "Bessie (cow N-1) could go to ANY counter with min free time":
    "베시(소 N-1)는 대기 시간이 가장 짧은 창구 아무 데나 갈 수 있어요",
  "Build a list of possible collisions: (meet_time, victim, blocker, blocker_arrive)":
    "만날 수 있는 경우를 목록으로 만들어요: (meet_time, victim, blocker, blocker_arrive)",
  "Can `word` be spelled? Give each letter its own distinct block.":
    "`word` 를 만들 수 있나요? 글자마다 서로 다른 블록을 하나씩 줘요.",
  "Check if all cows satisfied": "모든 소가 만족했는지 확인해요",
  "Cows K..N-2 take the next free counter": "소 K..N-2 는 다음으로 비는 창구를 차지해요",
  "Distance along the boundary from post 0 to point (x, y)":
    "기준점 0 부터 점 (x, y) 까지 울타리를 따라간 거리",
  "Each AC is either on or off, so with M <= 10 there are":
    "에어컨은 켜지거나 꺼지거나 둘 중 하나예요, M <= 10 이면",
  "Even-sum group = 1 even cow OR 2 odd cows.":
    "합이 짝수인 그룹 = 짝수 소 1마리 또는 홀수 소 2마리예요.",
  "Find when Bessie (last cow, index N-1) finishes":
    "베시(마지막 소, 번호 N-1)가 언제 끝나는지 구해요",
  "Flip first char if s[i] != 'M': cost 1":
    "s[i] 가 'M' 이 아니면 첫 글자를 바꿔요: 비용 1",
  "For each target mex i (0..N):": "목표로 하는 mex 값 i 마다 (0..N):",
  "G: 1 star here, keep OR pass — both OK":
    "G: 여기 별이 1개, 안 보내도 보내도 다 돼요",
  "H beats S, P beats H, S beats P → cow1 wins (a,b) ∈ {(H,S),(P,H),(S,P)}":
    "H 는 S 를 이기고, P 는 H 를 이기고, S 는 P 를 이겨요 → cow1 이 이기는 경우는 (a,b) ∈ {(H,S),(P,H),(S,P)}",
  "If the total is 0, every period is already 0 — no merges needed.":
    "합이 0 이면 모든 구간이 이미 0 이에요 — 합칠 필요가 없어요.",
  "Join pairs of sentences with conjunctions.": "문장 쌍을 접속사로 이어 붙여요.",
  "Meet at cell (nx, ey) only if E reaches column nx":
    "E 가 nx 열에 도착할 때만 (nx, ey) 칸에서 만나요",
  "Move down": "아래로 이동",
  "N cow arrives at meeting cell": "N 소가 만나는 칸에 도착해요",
  "Number the combinations 0, 1, 2, ... and read each number in base 2:":
    "조합에 0, 1, 2, ... 번호를 매기고 각 번호를 2진수로 읽어요:",
  "Only count a cell if a cow is actually standing on it.":
    "실제로 소가 서 있는 칸만 세요.",
  "Output: word count, then the sentence (each ends with a period).":
    "출력: 단어 개수, 그다음 문장 (문장마다 마침표로 끝나요).",
  "Position of this cow in current arrangement": "지금 배치에서 이 소의 위치",
  "Removing copies of i can double as adding missing values,":
    "i 의 복사본을 빼는 건 빠진 값을 채우는 것과 같은 효과를 낼 수 있어요,",
  "Scan pairs RIGHT to LEFT, tracking a flip flag.":
    "짝을 오른쪽에서 왼쪽으로 훑으면서 뒤집힘 여부를 기록해요.",
  "Special case: right = down = 0 (stars don't move)":
    "특수한 경우: right = down = 0 (별이 움직이지 않아요)",
  "Step 2: read s as a binary number n mod MOD.":
    "2단계: s 를 2진수로 읽어서 n mod MOD 를 구해요.",
  "Step A: bring target[k] to column k inside s_y (if needed).":
    "A단계: 필요하면 target[k] 를 s_y 안에서 k 열로 가져와요.",
  "Sweep number of transitive sentences; for each, take as many":
    "이행 관계 문장 개수를 하나씩 늘려가며 훑어요; 그때마다 최대한 많이",
  "Team winners: line has exactly 2 distinct letters":
    "팀 승리: 줄에 서로 다른 글자가 정확히 2개예요",
  "This cow is to the left of a cow that": "이 소는 어떤 소보다 왼쪽에 있는데, 그 소는",
  "Try each divisor of total as target period length":
    "합의 약수를 하나씩 목표 주기 길이로 시도해요",
  "Try every possible position for Bessie": "베시가 있을 수 있는 자리를 다 시도해요",
  "Two non-transitive cycle directions are both valid":
    "순환하는(이행 관계가 아닌) 두 방향 모두 답이 될 수 있어요",
  "W = number of valid top-left positions per dimension":
    "W = 차원마다 왼쪽 위 시작점이 될 수 있는 자리 개수",
  "Walk right to left. Track parity of O's typed at later positions.":
    "오른쪽에서 왼쪽으로 가요. 뒤쪽에서 입력된 O 개수의 홀짝을 기록해요.",
  "We solve each S in turn — each S becomes its own DP run.":
    "S 하나씩 차례로 풀어요 — S 마다 따로 DP 를 돌려요.",
  "Which counters have the same free time as Bessie's start?":
    "베시가 시작할 때와 같은 대기 시간인 창구는 어디인가요?",
  "abs": "abs 함수를 쓰려고",
  "all same output": "출력이 전부 같아요",
  "already locked in (the running max). Otherwise it stays.":
    "이미 확정됐어요(지금까지의 최댓값). 아니면 그대로 있어요.",
  "answer is printed modulo 1000": "답은 1000 으로 나눈 나머지를 출력해요",
  "as possible. Even 1-indexed = 0-indexed odd: 1, 3, 5, ...":
    "만큼요. 1부터 센 짝수 번째 = 0부터 센 홀수 번째: 1, 3, 5, ...",
  "back, losing min(chainSum, M) over M minutes.":
    "받지 못하고, M 분 동안 min(chainSum, M) 만큼 잃어요.",
  "blocker died before reaching the cell": "막는 소가 그 칸에 닿기 전에 멈췄어요",
  "can_win[n] = True if the player to move with n stones wins":
    "can_win[n] = 돌이 n 개 남았을 때 차례인 사람이 이기면 True",
  "choice[pos] = the block assigned to letter word[pos]":
    "choice[pos] = word[pos] 글자에 배정된 블록",
  "coefficient: 1, 2, 4, 8, ...": "계수: 1, 2, 4, 8, ...",
  "cooling at each stall 1..100": "칸 1..100 마다의 냉방 온도",
  "count d[i] > S = N - upper_bound(S)": "d[i] > S 인 개수 = N - upper_bound(S)",
  "cow (bad_L) and the 'L' cow (bad_R) each anchor a chain of cows":
    "소(bad_L)와 'L' 소(bad_R)가 각각 사슬(체인)이 시작되는 지점이에요",
  "craft every ingredient first": "재료부터 먼저 다 만들어요",
  "d[i] = pref[i] - cur[i]; pad d with 0 at BOTH ends.":
    "d[i] = pref[i] - cur[i]; d 양 끝에 0 을 채워요.",
  "deletions": "지우는 횟수",
  "digit j says whether AC j is on.": "j번째 자리 숫자가 에어컨 j 가 켜졌는지를 말해줘요.",
  "distance 1": "거리 1",
  "does a block of length blockLen repeat all the way?":
    "길이가 blockLen 인 블록이 끝까지 반복되나요?",
  "each even group needs 1 even OR 2 leftover odds":
    "짝수 그룹마다 짝수 1개 또는 남은 홀수 2개가 필요해요",
  "equal: they share the cell, neither stops": "같으면: 같은 칸을 나눠 써요, 둘 다 안 멈춰요",
  "even-slot char of this pair is s[i] when flipped, else s[i+1]":
    "이 짝에서 짝수 번째 자리 글자는 뒤집혔으면 s[i], 아니면 s[i+1]",
  "have one ready": "쓸 수 있는 게 있으면",
  "have[i] = units of metal i in stock": "have[i] = 금속 i 를 몇 개 갖고 있나",
  "if EVERY row sharing some variable=value has the SAME output.":
    "어떤 변수=값을 같이 갖는 줄들이 전부 같은 출력이면요.",
  "it; ahead of the 'L' cow sits a run of consecutive 'L's. Each":
    "'L' 소 앞에는 연속된 'L' 들이 있어요. 각각",
  "leading 0 pad": "앞에 0 을 채워요",
  "left/right = opposite-breed cows touching i (i is the only one of its breed)":
    "left/right = i 와 맞닿은 다른 품종 소 (i 는 자기 품종에서 혼자예요)",
  "limits, one line": "제한값들, 한 줄",
  "middle must be 'O'": "가운데는 'O' 여야 해요",
  "min_stars[1] = min stars so far, when this cell DOES pass a star out":
    "min_stars[1] = 이 칸이 별을 보낼 때까지의 최소 별 개수",
  "modular inverse of 2": "2 의 모듈러 역원",
  "n's parity = last bit": "n 의 홀짝 = 마지막 비트",
  "no assignment worked": "어떤 배정도 안 됐어요",
  "not enough odds": "홀수가 모자라요",
  "off": "출구로일 때",
  "only 4 blocks to hand out": "나눠줄 블록이 4개뿐이에요",
  "orientation for everything further left.": "더 왼쪽에 있는 것들의 방향도 같이요.",
  "partition into segments summing to d": "합이 d 가 되도록 구간으로 나눠요",
  "pointing toward them (a run of consecutive 'R's behind, or 'L's":
    "그쪽을 향한 사슬이에요 (뒤에 이어진 연속된 'R', 또는",
  "positions 1,3,5...": "1, 3, 5번째 자리...",
  "positions as possible. Even 1-indexed = 0-indexed odd.":
    "자리에 최대한 많이요. 1부터 센 짝수 번째 = 0부터 센 홀수 번째예요.",
  "query is V then S": "질문은 V 다음 S 순서예요",
  "recipe[i] = ingredients to make 1 of metal i":
    "recipe[i] = 금속 i 를 1개 만드는 데 필요한 재료",
  "senior[i][j] = i is definitely more senior than j":
    "senior[i][j] = i 가 j 보다 확실히 선배예요",
  "smaller p means we're done": "p 가 더 작으면 끝난 거예요",
  "solve = the real solving: return true the moment a trick works!":
    "solve = 진짜로 푸는 함수예요: 방법 하나가 통하는 순간 true 를 돌려줘요!",
  "start at (1,1) = index (0,0)": "(1,1) 에서 시작 = 배열 번호로는 (0,0)",
  "sum of 1..N": "1부터 N까지의 합",
  "the 'R' cow sits a run of consecutive 'R's all pointing toward":
    "'R' 소 뒤에는 그쪽을 향한 연속된 'R' 들이 있고,",
  "the input counts from 1, our arrays count from 0":
    "입력은 1부터 세지만, 우리 배열은 0부터 세요",
  "they trade milk forever and each leaks 1 unit per minute. The 'R'":
    "둘은 계속 우유를 주고받으면서 1분마다 1씩 새요. 'R'",
  "trick 1: all same -> one PRINT": "방법 1: 전부 같으면 → PRINT 한 번",
  "trick 2: repeatable block lengths": "방법 2: 반복 가능한 블록 길이",
  "trick 3: where to cut next": "방법 3: 다음에 어디를 자를지",
  "valid top-left range per dim": "차원마다 왼쪽 위가 될 수 있는 범위",
  "walk the 'R' run behind cow i": "소 i 뒤로 이어진 'R' 들을 따라가요",
  "which cow of a pair lands in the even slot, and flips that":
    "짝에서 어느 소가 짝수 자리로 가는지를 바꾸고, 그",
  "x-direction row: (y, z)": "x 방향 줄: (y, z)",
  "→ NEW[shuffle[i]] = OLD[i], OLD[i] = NEW[shuffle[i]]":
    "→ NEW[shuffle[i]] = OLD[i], OLD[i] = NEW[shuffle[i]]",
  "─── ⭐ the recursion ───": "─── ⭐ 재귀 부분 ───",
};
