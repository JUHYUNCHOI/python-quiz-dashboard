/* 학생 코드 안 **한국어 주석**의 영어 번역표. `localizeCode.ts` 가 쓴다.
 *
 * 왜 (2026-09-11): 코드 배열이 `t(E, 영어, 한국어)` 가 아니라 **한 벌뿐**이라
 * 화면 언어를 English 로 바꿔도 주석만 한국어로 남는다.
 * student-algorithm 이 moohunt 를 영어 모드로 따라가다 잡았다.
 * quest **92개 · 1189줄**(서로 다른 문장 813개)이 걸려 있다.
 *
 * 왜 quest 파일을 안 고치나 — 92개 중 다수가 🔒 USACO_VERIFIED 다.
 *   그 코드 배열을 일괄로 손대는 건 `memory/quest_review_progress.md` 의
 *   "표준-맞추기 함정" 이 경고하는 작업이다(2026-05-06 rounding 붕괴).
 *   그래서 **원본은 그대로 두고 그리는 자리에서만** 바꾼다.
 *
 * 없는 문장은 어떻게 되나 — `localizeCode` 가 그 줄을 **비운다**(줄 수는 유지).
 *   영어 학생에게 읽을 수 없는 한국어를 남기는 것보다 낫고,
 *   설명은 이미 CodeWalk 말풍선이 두 언어로 한다.
 *
 * 늘리는 법 — 키는 **주석 기호(`#`/`//`)를 뗀 뒤 trim 한 그대로** 써야 맞는다.
 *   지금 남은 목록을 뽑으려면:
 *     python3 scripts/list-untranslated-comments.py
 */
export const CODE_COMMENT_EN: Record<string, string> = {
  // ── 압도적으로 많이 쓰이는 것 (97줄)
  "USACO 이전 contest는 파일 입출력 사용": "older USACO contests use file I/O",

  // ── 헤더 안내 (quest 여러 개가 같은 문장을 쓴다)
  "include 는 배운 헤더들로 (iostream, vector, string) 나눠 적어.":
    "list the headers you have learned one by one (iostream, vector, string)",
  "include 는 배운 헤더들로 (iostream, vector, string) 나눠 적어요.":
    "list the headers you have learned one by one (iostream, vector, string)",
  "include 는 배운 헤더들로 (iostream, vector, algorithm) 나눠 적어.":
    "list the headers you have learned one by one (iostream, vector, algorithm)",
  "include 는 배운 헤더들로 (iostream, vector, string, set) 나눠 적어.":
    "list the headers you have learned one by one (iostream, vector, string, set)",

  // ── 짧은 표시
  "(앞부분 생략)": "(earlier part omitted)",
  "(앞부분 생략 — 입력 읽기)": "(earlier part omitted — reading the input)",
  "✖️ 곱하기": "✖️ multiply",
  "➕ 더하기": "➕ add",
  "테스트 케이스 수": "how many test cases",
  "0-based 로 변환": "switch to 0-based numbering",
  "2 부터 N 까지": "from 2 up to N",
  "요령 ②": "trick ②",
  "요령 ③": "trick ③",
  "← 불필요한 방어코드": "← this guard is not needed",
  "10개": "10 of them",
  "11개": "11 of them",
  "9개": "9 of them",
  "Bessie 의 답": "Bessie's answer",
  "Elsie 의 답": "Elsie's answer",
  "Elsie 패 마다:": "for each of Elsie's hands:",
  "Binary search 최대 D": "binary search for the largest D",

  // ── 회문 (palindrome)
  "모든 중심: 홀수 길이(i,i), 짝수 길이(i,i+1)":
    "every centre: odd length (i,i), even length (i,i+1)",

  // ── 이분 탐색 · 화살
  "이분 탐색: 가능한 가장 작은 X": "binary search for the smallest X that works",
  "화살 K 개로 X 가 될까?": "can K arrows reach X?",
  "X 가 커질수록 쉬워짐 → 정답 X 를 이분 탐색":
    "the bigger X gets the easier it is → binary search for the answer X",
  "MX   # 여기서 쏠 화살 수": "MX   # how many arrows to shoot here",
  "M   # j 를 혼자 없앨 최소 X": "M   # smallest X that clears j on its own",
  "데미지가 닿는 최대 거리 (d*d < M*X)": "how far the damage reaches (d*d < M*X)",
  "아직 남은 체력": "health still left",
  "이 포물선이 끝나는 위치": "where this arc lands",
  "D 만큼의 최소 거리로 cows 마리 더 추가 가능한지 확인":
    "check whether we can still fit that many cows with gaps of at least D",

  // ── reflection (거울 대칭)
  "거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다":
    "compare with the 3 mirror cells and count how many differ from me",
  "칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수":
    "fewest repaints to make cell (i, j)'s group one colour",
  "제자리로 맞던 것 빼고(−), 뒤집혀 새로 맞으면 더함(+)":
    "subtract what used to match (−), add what matches after the flip (+)",

  // ── photoshoot / checkups
  "answer[k] = 검진 k 인 구간 개수": "answer[k] = how many ranges have exactly k checkups",
  "한 사진에만 별": "a star in only one photo",
  "가장 큰 키 = peak 후보": "the tallest one is the peak candidate",

  // ── 초콜릿 바
  "맨 위 바와 길이가 같아요 → 둘을 가져가요":
    "same length as the top bar → take both",
  "아직 짝을 못 찾은 바들": "bars that have not found a partner yet",
  "지금까지 가져간 초콜릿 길이": "total chocolate length taken so far",
  "이 조각을 처음 꺼냈을 때만": "only the first time we take this piece",

  // ── subseqmedian / memo
  "memo[i] = i 앞의 '서로 다른 값' 중 a[i] 와 다른 것의 개수  (= x 후보 수)":
    "memo[i] = how many distinct earlier values differ from a[i]  (= candidates for x)",

  // ── 반올림
  "(1의자리 8 이 ≥5 라서 올라가고, 1의자리 자체는 0)":
    "(the ones digit 8 is ≥5 so it rounds up, and the ones digit itself becomes 0)",
  "1자리부터 P자리까지 순서대로": "from the ones digit up to digit P, in order",

  // ── 카드 / 셔플
  "(a, b) 모든 짝 시도 — Bessie 의 두 카드":
    "try every pair (a, b) — Bessie's two cards",
  "Elsie 의 두 카드 읽기 (1-based → 0-based 로)":
    "read Elsie's two cards (1-based → 0-based)",
  "AFTER 3 shuffles 로부터 BEFORE 를 얻기 위해 역방향 3 번":
    "run it backwards 3 times to get BEFORE from AFTER",
  "\"even\" 을 외쳤으면 pos * 2 - 1  자리에 있었어요":
    "if they called \"even\" it was at position pos * 2 - 1",
  "\"odd\" 를 외쳤으면  pos * 2      자리에 있었고":
    "if they called \"odd\" it was at position pos * 2",

  // ── 문자열 / 위치 목록
  "(1) 글자 -> 그 글자가 나온 위치들 (오름차순).  쿼리 전에 딱 한 번.":
    "(1) letter -> the positions where it appears (increasing). Built once, before any query.",
  "K = 1, 2, ... 차례로 시도 — 모든 길이 K 부분문자열이 서로 다르면 그게 답":
    "try K = 1, 2, ... in turn — the first K where every length-K substring is different is the answer",
  "A[i] != B[i] 인 연속 구간 개수 = flip 필요 횟수":
    "the number of runs where A[i] != B[i] is how many flips we need",

  // ── 격자 / 이동
  "10x10 grid 에서 B (barn), L (lake), R (rock) 위치 찾기":
    "find B (barn), L (lake), R (rock) on the 10x10 grid",
  "W → 아무것도 안 함": "W → do nothing",
  "100 step: src=step%3, dst=(step+1)%3, 가능한 만큼 따르기":
    "100 steps: src=step%3, dst=(step+1)%3, pour as much as we can",

  // ── 기타
  "K = PRINT 예산": "K = how many PRINTs we are allowed",
  "1과 1 사이 gap": "the gap between one 1 and the next",
  "- 둘 다 gap=1: 이미 연속, 0번": "- both gaps are 1: already next to each other, 0 moves",
  "... 이제 2 ~ N 의 답을 구해야 함": "... now we need the answers for 2 through N",

  // ── moohunt · reflection (2026-09-11, 그날 손댄 두 quest 부터)
  "만들 수 있는 보드를 전부 해봐요. 비트가 1 이면 M, 0 이면 O 예요.":
    "try every board we can make. bit 1 means M, bit 0 means O",
  "무브를 그냥 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.":
    "just keep the moves in a list. cells count from 0 in code, so subtract 1",
  "count[x][a][b] = 'x 가 M, a 와 b 가 O' 면 득점하는 무브가 몇 개인가 (a < b)":
    "count[x][a][b] = how many moves score when x is M and a, b are O (a < b)",
  "무브를 세어 둘 곳. 열쇠는 (M 자리, O 자리 작은 쪽, O 자리 큰 쪽) 이에요.":
    "where we tally the moves. the key is (M cell, smaller O cell, larger O cell)",
  "y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없다 → 작은 쪽·큰 쪽으로 모은다":
    "y and z only both need to be O, so order does not matter → store as smaller, larger",
  "y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요 → 작은 쪽·큰 쪽으로 모아요.":
    "y and z only both need to be O, so order does not matter → store as smaller, larger",
  "보드를 리스트로 들고 다녀요. 1 이면 M, 0 이면 O.":
    "keep the board as a list. 1 means M, 0 means O",
  "보드를 리스트로 들고 다닌다. 1 이면 M, 0 이면 O.":
    "keep the board as a list. 1 means M, 0 means O",
  "이 보드에서 M 자리와 O 자리를 갈라요":
    "split this board into its M cells and O cells",
  "이 보드에서 M 자리와 O 자리를 가른다":
    "split this board into its M cells and O cells",
  "득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요":
    "only 'one M cell + two O cells' can ever score",
  "득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이다":
    "only 'one M cell + two O cells' can ever score",
  "다음 보드로 넘어가요 — 2진수에 1 을 더하는 것과 같아요.":
    "move to the next board — this is just adding 1 in binary",
  "다음 보드로 — 2진수에 1 을 더하는 것과 같다.":
    "move to the next board — this is just adding 1 in binary",
  "뒤에서부터 M(1) 이면 O(0) 로 되돌리고 한 칸 앞으로,":
    "from the front: while it is M(1), turn it back to O(0) and step on,",
  "O(0) 를 만나면 그 자리를 M(1) 로 바꾸고 멈춰요.":
    "when you meet an O(0), make that one M(1) and stop",
  "칸 (i, j) 의 거울짝은 (i, n-1-j) · (n-1-i, j) · (n-1-i, n-1-j) — 나까지 4 칸이 한 묶음.":
    "cell (i, j) mirrors to (i, n-1-j) · (n-1-i, j) · (n-1-i, n-1-j) — 4 cells make one group",
  "이 묶음을 한 색으로 만들려면 최소 몇 번 뒤집어야 하나?":
    "how few repaints make this group one colour?",
  "거울짝 3 칸을 하나씩 견줘서, 나와 색이 다른 칸을 센다":
    "check the 3 mirror cells one by one and count how many differ from me",
  "나와 다른 diff 칸을 고치거나, 나를 포함한 4 - diff 칸을 고치거나 — 적은 쪽":
    "repaint the diff that differ from me, or the 4 - diff including me — whichever is fewer",
  "적은 쪽만 뒤집으면 된다":
    "repaint only the smaller side",
  "묶음마다 대표 한 칸씩만 보면 된다 — 왼쪽 위 1/4 이 딱 그 대표들이다.":
    "one cell per group is enough — the top-left quarter is exactly those",
  "처음 답 — 묶음마다 대표 한 칸씩, 곧 왼쪽 위 1/4 만 훑는다":
    "first answer — one cell per group, so we scan only the top-left quarter",
  "매번 왼쪽 위 1/4 을 처음부터 다시 훑는다 — O(N²)":
    "scan the whole top-left quarter again every time — O(N²)",
  "뒤집을 때마다 전부 다시 셈 — 느림!":
    "recount everything after every flip — slow!",
  "뒤집기 1 번 = 칸 1 개 토글 → 그 칸이 속한 묶음 하나만 바뀜.":
    "one flip = one cell toggled → only that cell's group changes",
  "나머지 묶음은 그대로. 그래서 1/4 을 다시 훑을 필요가 없다:":
    "every other group stays the same, so there is no need to rescan the quarter:",
  "1) before = flip_cost(grid, r, c)   ← 이 묶음의 옛 비용":
    "1) before = flip_cost(grid, r, c)   ← this group's old cost",
  "2) 칸을 뒤집고":
    "2) flip the cell",
  "3) after  = flip_cost(grid, r, c)   ← 새 비용":
    "3) after  = flip_cost(grid, r, c)   ← the new cost",
  "flip_cost 는 거울짝 3 칸만 보므로 한 번당 O(1).":
    "flip_cost looks at only the 3 mirror cells, so each update is O(1)",
  "flip_cost 는 거울짝 3 칸만 보므로 O(1) per update.":
    "flip_cost looks at only the 3 mirror cells, so each update is O(1)",
  "같은 인사이트:":
    "the same idea:",
  "한 번 뒤집으면 묶음 하나의 비용만 바뀐다.":
    "one flip changes the cost of just one group",
  "total 에서 그 묶음의 옛 비용을 빼고 새 비용을 더하면 끝.":
    "subtract that group's old cost from total and add the new one — done",
  "이 묶음의 옛 비용을 빼고":
    "subtract this group's old cost",
  "칸을 뒤집고":
    "flip the cell",
  "새 비용을 더한다":
    "add the new cost",
  "그림 N 줄":
    "the picture, N rows",
  "칠하기)":
    "paint)",
  "지우기)":
    "erase)",

  // ── moohunt 첫 코드(비트 없는 브루트, 2026-09-13)
  "무브를 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.":
    "keep the moves in a list. cells count from 0 in code, so subtract 1",
  "이 보드를 채점해요 — 무브를 하나씩 다 봐요.":
    "score this board — walk the moves one by one",

  // ── "2진수" 라는 말이 설명 없이 나온다고 학생이 잡았다 (2026-09-13)
  "다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.":
    "move to the next board — cell 1 is the ones place, add 1 there",

  // ── "들고 다녀요" 는 지어낸 비유라고 학생이 잡았다 (2026-09-13)
  "보드는 리스트로 나타내요. 1 이면 M, 0 이면 O.":
    "the board is a list. 1 means M, 0 means O",

  // ── 주석이 코드와 모순이었다: i = 0 부터 도는데 "뒤에서부터" 라고 적혀 있었다 (2026-09-13)
  "1번 칸부터 M(1) 이면 O(0) 로 되돌리며 뒤로 가고,":
    "starting at cell 1: while it is M(1), turn it back to O(0) and move on,",

  // ── C++ 표를 3차원 → 2차원으로 바꾸며 (2026-09-13)
  "표 한 장 = M 자리 하나. 그 안은 O 짝 (작은 쪽, 큰 쪽) 을 번호 하나로 바꿔서 넣어요.":
    "one row per M cell; inside it, the O pair (smaller, larger) becomes a single number",

  // ── C++ 2차원 표의 '번호 합치기' (2026-09-13)
  "표 한 줄 = M 자리 하나. 그 안은 O 짝을 번호 하나로 합쳐서 넣어요.":
    "one row per M cell; inside it, the O pair is squeezed into a single number",
  "두 칸을 번호 하나로: 작은 쪽 * N + 큰 쪽.  (N = 5 면 작은 1·큰 2 → 1*5+2 = 7번 칸)":
    "two cells into one number: smaller * N + larger.  (N = 5: smaller 1, larger 2 -> 1*5+2 = slot 7)",

  "두 칸을 번호 하나로: 작은 쪽 * N + 큰 쪽.  (N = 5 면 1·2 → 7번. 7/5 = 몫 1·나머지 2 로 되돌아온다)":
    "two cells into one number: smaller * N + larger.  (N = 5: 1 and 2 -> 7. 7/5 gives quotient 1, remainder 2 back)",

  "두 칸을 번호 하나로: 작은 쪽 * N + 큰 쪽":
    "two cells into one number: smaller * N + larger",

  // ── printseq (2026-09-15)
  "block_len 짜리 블록이 끝까지 반복되는가?":
    "does a block of block_len repeat all the way to the end?",
  "can = 접수처: 공책에 없으면 solve 에게 맡기고, 답을 적어둔다":
    "can = the front desk: if it is not in the notebook, hand it to solve and write the answer down",
  "memo = 답 공책 = 메모이제이션(memoization)":
    "memo = the answer notebook = memoization",
  "─── ⭐ 재귀 ───":
    "--- * recursion ---",
  "✋ 베이스 케이스 — 여기서 멈춤!":
    "STOP base case - we stop here!",
  "길이별 약수 — 요령②는 '약수' 길이 블록만 반복이 될 수 있어요":
    "divisors of the length - trick 2 only works for block lengths that divide it",
  "모르는 조각이 있으면 그것부터 할 일 목록에":
    "if a piece is still unknown, put that one on the to-do list first",
  "빈 조각 / 예산 없음 → 못 만듦":
    "empty piece, or no budget left -> cannot be made",
  "새 케이스 → 공책 비우기":
    "new test case -> wipe the notebook",
  "세 요령 다 실패":
    "all three tricks failed",
  "숫자가 다 같은가?":
    "are all the numbers the same?",
  "아직 답을 모르는 '더 작은 조각'":
    "a smaller piece whose answer we do not know yet",
  "요령 ①: 다 같음 → PRINT 1 개면 끝":
    "trick 1: all the same -> one PRINT is enough",
  "요령 ①: 숫자가 다 같으면 PRINT 하나면 끝":
    "trick 1: if every number is the same, one PRINT is enough",
  "요령 ②: 블록의 반복 → 블록만 풀기":
    "trick 2: a repeating block -> just solve the block",
  "요령 ③: 둘로 잘라서 예산 나눠 갖기":
    "trick 3: cut it in two and split the budget",
  "요령②: 반복 가능한 블록 길이 후보들":
    "trick 2: candidate block lengths that could repeat",
  "요령③: 어디서 자를 차례인가":
    "trick 3: which cut point are we on",
  "요령③: 왼쪽에 예산 몇 개 줄 차례인가":
    "trick 3: how much budget are we giving the left side this time",
  "이미 푼 조각이면 넘어가기":
    "skip pieces we have already solved",
  "(i, j) 조각의 반복 블록 후보":
    "candidate repeating blocks for the piece (i, j)",
  "(tuple 이어야 나중에 '메모'의 열쇠로 쓸 수 있어요)":
    "(it must be a tuple so we can use it as a key in memo later)",
  "(요령 ②③ 은 다음 단계)":
    "(tricks 2 and 3 come in the next step)",
  "-1 = 아직 모름, 0 = NO, 1 = YES":
    "-1 = not known yet, 0 = NO, 1 = YES",
  "-1 = 아직 모름, 0 = 못 만듦, 1 = 만들 수 있음":
    "-1 = not known yet, 0 = cannot be made, 1 = can be made",
  "... (요령 ①②③ 은 다음 단계에서)":
    "... (tricks 1, 2, 3 come in the next step)",
  "N=목표 길이(참고), K=PRINT 예산":
    "N = length of the target (for reference), K = how many PRINTs we may use",
  "PRINT 1 개를 REP 로 감싸면 끝":
    "wrap a single PRINT in a REP and we are done",
  "[②진행, ③자를곳, ③예산나눔, 후보]":
    "[trick2 progress, trick3 cut point, trick3 budget split, candidates]",
  "can(seq, budget): 수열 seq 를 PRINT budget 개 이하로 만들 수 있나? (YES/NO)":
    "can(seq, budget): can we build the sequence seq using at most budget PRINTs? (YES/NO)",
  "memo = 답 공책 (메모이제이션)":
    "memo = the answer notebook (memoization)",
  "memo = 답 공책 (메모이제이션) — 열쇠 = \"수열#예산\" 문자열":
    "memo = the answer notebook (memoization) - the key is the string \"sequence#budget\"",
  "memo[(start, end, budget)] = 그 조각, 만들 수 있나?":
    "memo[(start, end, budget)] = can that piece be made?",
  "seq 의 [from, to) 조각 (파이썬 seq[from:to] 역할)":
    "the piece seq[from, to) - this is what Python's seq[from:to] does",
  "solve = 진짜 풀이: 되는 순간 바로 return True!":
    "solve = the real work: return True the moment it works!",
  "solve = 진짜 풀이: 되는 순간 바로 return true!":
    "solve = the real work: return true the moment it works!",
  "→ REP copies 로 감싸면 되니, 블록만 풀면 됨":
    "-> wrap it in REP copies, so we only need to solve the block",
  "─── 도우미 (재귀 ❌ — 검사·자르기) ───":
    "--- helpers (no recursion - just checking and cutting) ---",
  "─── 도우미 (재귀 ❌ — 그냥 검사) ───":
    "--- helpers (no recursion - just checking) ---",
  "각 조각을 '어디까지 해봤는지'":
    "how far we have got with each piece",
  "같은 질문, 더 작게! (재귀)":
    "the same question, but smaller! (recursion)",
  "길이 blockLen 짜리 블록이 끝까지 반복되는가?":
    "does a block of length blockLen repeat all the way to the end?",
  "다음 줄: 목표 수열 → tuple":
    "next line: the target sequence -> tuple",
  "답 공책: (i, j, k) → True / False":
    "the answer notebook: (i, j, k) -> True / False",
  "둘 다 → 성공!":
    "both work -> success!",
  "막다른 길 먼저: 빈 수열이거나 예산이 없으면 불가능":
    "dead ends first: an empty sequence, or no budget, means impossible",
  "모르는 조각부터 먼저 (할 일 목록에 올라감)":
    "unknown pieces go first (they go onto the to-do list)",
  "목표 → tuple (memo 열쇠는 안 바뀌는 값만!)":
    "target -> tuple (a memo key must be something that cannot change!)",
  "서로 부르니 한 줄 예고(선언)":
    "they call each other, so announce one of them first (a declaration)",
  "세 요령 다 실패 → 불가능":
    "all three tricks failed -> impossible",
  "세 요령 다 해봤으면 답 확정":
    "once all three tricks have been tried, the answer is settled",
  "수열+예산 → 문자열 열쇠 하나로":
    "sequence + budget -> one string key",
  "오른쪽도 되나?":
    "does the right side work too?",
  "왼쪽 되나?":
    "does the left side work?",
  "왼쪽이 left_budget 개, 오른쪽이 나머지":
    "the left side gets left_budget, the right side gets the rest",
  "요령 ①: 다 같은지 확인":
    "trick 1: check whether they are all the same",
  "요령 ①: 숫자가 다 같은지 확인 (하나라도 다르면 all_same = False)":
    "trick 1: check whether every number is the same (one difference makes all_same False)",
  "요령 ②: 같은 블록이 copies 번 반복되는 모양이면":
    "trick 2: if it is the same block repeated copies times",
  "요령 ②: 반복되는 블록 길이 모으기":
    "trick 2: collect the block lengths that repeat",
  "요령 ②: 반복되는 블록 길이 후보 모으기":
    "trick 2: collect candidate block lengths that repeat",
  "요령 ②: 블록만 만들면 REP 로 반복":
    "trick 2: build the block once, then REP it",
  "요령 ③: 둘로 자르고 예산도 나누기":
    "trick 3: cut it in two and split the budget as well",
  "요령 ③: 둘로 잘라서 예산을 나눠 갖기":
    "trick 3: cut it in two and share the budget between the halves",
  "요령②: 몇 번째 블록 후보까지 봤나":
    "trick 2: how many block candidates we have looked at",
  "요령②: 몇 번째 후보까지 봤나":
    "trick 2: how many candidates we have looked at",
  "이 조각을 만들 수 있나":
    "can this piece be made?",
  "이 조각을 이미 꺼내 봤나":
    "have we already taken this piece out?",
  "이 케이스 풀기 (다음 단계에서)":
    "solve this test case (in the next step)",
  "정말 이 블록이 계속 반복되는지 확인":
    "check that this block really does repeat all the way",
  "조각 target[start:end) 의 숫자가 다 같은가?":
    "are all the numbers in the piece target[start:end) the same?",
  "조각마다 '어디까지 해봤는지' 기억해두는 곳":
    "where we remember how far we got with each piece",
  "첫 줄: N K → map 으로 한 번에 int 두 개":
    "first line: N K -> two ints at once with map",
  "첫 줄: N 과 K":
    "first line: N and K",
  "할 일 목록 (재귀 대신)":
    "the to-do list (instead of recursion)",
  "할 일 목록 — 전체 수열부터 (재귀 대신 이걸 굴려요)":
    "the to-do list - start with the whole sequence (we run this instead of recursing)",
  "할 일 목록 — 전체 수열부터 시작 (재귀 대신 이걸 굴려요)":
    "the to-do list - start from the whole sequence (we run this instead of recursing)",

  // ── astral (2026-09-15)
  "possibles = 원래 별이 있어야 하는 칸들 (set → 중복은 알아서 하나로)":
    "possibles = the cells that must have had a star (a set, so duplicates collapse on their own)",
  "↓ 다음: 이 퍼즐 풀기":
    "next: solve this puzzle",
  "격자를 오른쪽-아래 끝에서 → 왼쪽-위로 거꾸로 훑기":
    "sweep the grid backwards, from the bottom-right corner to the top-left",
  "두 사진 다 별":
    "a star in both photos",
  "시작점 판별: 거꾸로 한 칸이 격자 안이면 시작점 아님":
    "finding a start: if one step backwards is still inside the grid, this is not a start",
  "이 퍼즐 답":
    "the answer for this puzzle",
  "이전 칸: 별 보냄":
    "previous cell: it sent a star",
  "이전 칸: 별 안 보냄":
    "previous cell: it sent no star",
  "지금 따라가는 위치":
    "the position we are following right now",
  "직전 칸이 사진 안?":
    "is the previous cell inside the photo?",
  "진짜 답보다 큰 수 (= '못 만듦' 표시)":
    "a number bigger than any real answer (this marks 'cannot be made')",
  "진짜 답보다 큰 수 = '못 만듦' 표시":
    "a number bigger than any real answer = the mark for 'cannot be made'",
  "퍼즐 하나씩 처리":
    "handle the puzzles one at a time",
  "+1 별 (여기 원래 별)":
    "+1 star (this cell had a star to begin with)",
  "N = 격자 크기, right/down = 별 이동량":
    "N = grid size, right/down = how far a star moves",
  "N = 격자 한 변 크기 (N × N)":
    "N = length of one side of the grid (N by N)",
  "N × N 격자":
    "an N by N grid",
  "N 줄 모아서 grid":
    "collect N lines into grid",
  "T = 퍼즐 개수":
    "T = how many puzzles",
  "T = 퍼즐 개수 (T 번 풀어야 함)":
    "T = how many puzzles (we solve it T times)",
  "down = 별이 아래로 몇 칸":
    "down = how many cells the star moves down",
  "p = 지금 읽을 단어 위치":
    "p = which word we are reading now",
  "right = 별이 오른쪽 이동, down = 별이 아래 이동":
    "right = how far the star moves right, down = how far it moves down",
  "right = 별이 오른쪽으로 몇 칸":
    "right = how many cells the star moves right",
  "right = 오른쪽 이동, down = 아래 이동":
    "right = move right, down = move down",
  "↓ 다음 슬라이드: 이 path 로 별 최소 수 계산":
    "next slide: work out the fewest stars along this path",
  "↓ 다음 슬라이드: 이 path 로 별 최소 수 계산 (DP)":
    "next slide: work out the fewest stars along this path (DP)",
  "격자 모든 칸 돌기":
    "go over every cell of the grid",
  "격자 모든 칸 돌면서":
    "going over every cell of the grid",
  "끝에서부터 거꾸로":
    "backwards, from the end",
  "두 사진 다 별 → 여기 + 직전 칸 둘 다":
    "a star in both photos -> this cell and the previous one, both",
  "두 사진 다 별 → 여기 + 직전 칸 둘 다 별":
    "a star in both photos -> a star here and in the previous cell",
  "뒤에서 B 가 이미 별 찍어둠 → 끝":
    "a B further back already placed the star -> done",
  "모든 입력을 단어 리스트로 한 번에 받기 (입력 빠름)":
    "read the whole input as one list of words (this is fast)",
  "별 길은 (아래 down, 오른쪽 right) 방향으로 칸을 잇는 선.":
    "a star path is a line of cells joined in the (down, right) direction",
  "별이 아래로 몇 칸":
    "how many cells the star moves down",
  "별이 아래로 몇 칸 이동":
    "how many cells down the star moves",
  "별이 오른쪽으로 몇 칸":
    "how many cells the star moves right",
  "별이 오른쪽으로 몇 칸 이동":
    "how many cells right the star moves",
  "시작점 = 거꾸로 한 칸 (r-down, c-right) 가 격자 밖인 칸.":
    "a start = a cell whose one step back (r-down, c-right) falls outside the grid",
  "시작점 찾음! 이 별 길의 칸 글자들 모으기":
    "found a start! collect the letters along this star path",
  "시작점! 별 길 따라가며 칸 글자 모으기":
    "a start! follow the star path and collect the letters",
  "아래로":
    "down",
  "아래로 down 칸":
    "down by down cells",
  "오른쪽으로":
    "right",
  "오른쪽으로 right 칸":
    "right by right cells",
  "원래 별이 있어야 하는 칸":
    "a cell that must have had a star",
  "원래 별이 있어야 하는 칸 (중복 자동 제거)":
    "cells that must have had a star (duplicates drop out on their own)",
  "이 별 길의 칸 글자들":
    "the letters along this star path",
  "이 별 길의 칸 글자들 (W/G/B)":
    "the letters along this star path (W/G/B)",
  "이미 별 → 끝":
    "already a star -> done",
  "이미 별 있음":
    "there is already a star",
  "이미 처리 → 패스":
    "already handled -> skip",
  "이미 처리한 칸이면 패스":
    "skip cells we have already handled",
  "전체 답 — 모든 별 길 답 합칠 곳":
    "the whole answer - where every star path's answer is added up",
  "전체 답 — 모든 별 길 답을 합칠 곳":
    "the whole answer - where we add up every star path's answer",
  "직전 W → 못 만듦":
    "previous is W -> cannot be made",
  "직전 W → 여기 별":
    "previous is W -> a star here",
  "직전 밖 → 못 만듦":
    "previous is outside -> cannot be made",
  "직전 밖 → 여기 별":
    "previous is outside -> a star here",
  "직전 칸 W → 여기 별":
    "previous cell is W -> a star here",
  "직전 칸 별":
    "a star in the previous cell",
  "직전 칸 사진 밖 → 여기 별":
    "previous cell is outside the photo -> a star here",
  "직전 칸과 별 공유":
    "share the star with the previous cell",
  "직전 칸에 별":
    "a star in the previous cell",
  "직전 칸이 W → B 못 만듦":
    "previous cell is W -> B cannot be made",
  "직전 칸이 사진 밖 → B 못 만듦":
    "previous cell is outside the photo -> B cannot be made",
  "직전과 별 공유":
    "share the star with the previous one",
  "칸 이미 처리?":
    "has this cell been handled already?",
  "칸 이미 처리했는지 표시 (중복 방지)":
    "mark cells we have handled, so we do not do them twice",
  "한 길이라도 못 만들면 True → 답 -1":
    "if even one path cannot be made, this is True -> the answer is -1",
  "한 길이라도 못 만들면 true → 답 -1":
    "if even one path cannot be made, this is true -> the answer is -1",

  // ── mooin3 (2026-09-15)
  "NEW: 두 lookup 표를 한 번만 만들어 둠.":
    "NEW: build the two lookup tables once, up front",
  "j = 가운데 m 근처의 c — m 양옆 둘만 확인":
    "j = a c near the middle m - only check the two on either side of m",
  "nearest_diff[c][i]  = idx ≥ i 중 c 아닌 가장 왼쪽 (없으면 INF)":
    "nearest_diff[c][i] = leftmost idx >= i whose letter is not c (INF if there is none)",
  "모든 글자 c 시도":
    "try every letter c",
  "문자 c 마다 등장 인덱스 미리 모아두기 (왼→오 순서라 자동 정렬).":
    "for each letter c, collect where it appears up front (left to right, so it is already sorted)",
  "핵심 변경: j (N 개) 대신 c (26 개) 로 외곽 루프.":
    "the key change: the outer loop runs over c (26 of them) instead of j (N of them)",
  "(2) nextDiff[idx] = idx 부터 글자가 s[idx] 와 처음 '달라지는' 자리 (없으면 N)":
    "(2) nextDiff[idx] = the first place from idx on where the letter differs from s[idx] (N if there is none)",
  "(2) next_diff[idx] = idx 부터 글자가 s[idx] 와 처음 '달라지는' 자리 (없으면 N)":
    "(2) next_diff[idx] = the first place from idx on where the letter differs from s[idx] (N if there is none)",
  "2. 후보 둘: latest_same[c][m], earliest_same[c][m].":
    "2. two candidates: latest_same[c][m] and earliest_same[c][m]",
  "NEW: 매번 스캔하던 left / right 가 표 한 번 조회로 끝.":
    "NEW: left / right used to be scanned every time - now it is one table lookup",
  "NEW: 표 조회 O(1)":
    "NEW: a table lookup, O(1)",
  "earliest_same[c][i] = idx ≥ i 중 c 의 가장 왼쪽 (없으면 INF)":
    "earliest_same[c][i] = leftmost idx >= i holding c (INF if there is none)",
  "earliest_same[c][i] = idx ≥ i 중 글자 c 의 가장 왼쪽 (없으면 INF)":
    "earliest_same[c][i] = leftmost idx >= i holding the letter c (INF if there is none)",
  "f(j) = (j - i)(k - j) 는 위로 볼록 포물선(∩) → 꼭짓점 m 에 가까운 j 가 최대":
    "f(j) = (j - i)(k - j) is a downward parabola, so a j near its top m gives the largest value",
  "i = c 와 다른 가장 왼쪽 글자  (nextDiff 로 O(1))":
    "i = the leftmost letter different from c (O(1) with nextDiff)",
  "i = c 와 다른 가장 왼쪽 글자  (next_diff 로 O(1))":
    "i = the leftmost letter different from c (O(1) with next_diff)",
  "i = 가장 왼쪽 '다른 글자' → (j - i) 를 최대로":
    "i = the leftmost different letter -> makes (j - i) as large as possible",
  "j 는 여전히 positions_of[c] 모두 순회 (다음 단계에서 표 하나 더로 O(1) 압축)":
    "j still walks all of positions_of[c] (the next step squeezes this to O(1) with one more table)",
  "k = R 이하 중 가장 오른쪽 c  (이분탐색)":
    "k = the rightmost c at or before R (binary search)",
  "k = R 이하 중 가장 오른쪽 c  (이분탐색, 훑지 않음)":
    "k = the rightmost c at or before R (binary search, no scanning)",
  "k = 가장 오른쪽 c → (k - j) 를 최대로":
    "k = the rightmost c -> makes (k - j) as large as possible",
  "latest_same[c][i]   = idx ≤ i 중 c 의 가장 오른쪽 (없으면 -1)":
    "latest_same[c][i] = rightmost idx <= i holding c (-1 if there is none)",
  "latest_same[c][i]   = idx ≤ i 중 글자 c 의 가장 오른쪽 (없으면 -1)":
    "latest_same[c][i] = rightmost idx <= i holding the letter c (-1 if there is none)",
  "latest_same[c][i]  = idx ≤ i 중 s[idx] == chr(c) 인 가장 큰 idx":
    "latest_same[c][i] = the largest idx <= i with s[idx] == chr(c)",
  "left_pointer = [l, j) 에서 s[j] 와 다른 글자가 *처음* 나오는 자리":
    "left_pointer = the first place in [l, j) whose letter differs from s[j]",
  "left_pointer = j 왼쪽에서 s[j] 와 다른 글자가 *처음* 나오는 자리":
    "left_pointer = the first place left of j whose letter differs from s[j]",
  "moo 하나의 소리크기 = (j - i)*(k - j).  곱이 커서(~25억) long long.":
    "the loudness of one moo is (j - i)*(k - j). the product gets big (~2.5 billion), so use 64-bit",
  "nearest_diff[c][i] = idx ≥ i 중 s[idx] ≠ chr(c) 인 가장 작은 idx":
    "nearest_diff[c][i] = the smallest idx >= i with s[idx] != chr(c)",
  "right_pointer = (j, r] 에서 s[j] 와 같은 글자가 *마지막* 으로 있는 자리":
    "right_pointer = the last place in (j, r] holding the same letter as s[j]",
  "right_pointer = j 오른쪽에서 s[j] 와 같은 글자가 *마지막* 자리":
    "right_pointer = the last place right of j holding the same letter as s[j]",
  "가장 오른쪽 c":
    "the rightmost c",
  "가장 오른쪽 k (s[k] = ch) — 매번 스캔":
    "the rightmost k with s[k] = ch - scanned every time",
  "가장 오른쪽 k (s[k] == ch)":
    "the rightmost k with s[k] == ch",
  "가장 왼쪽 '다른 글자'":
    "the leftmost different letter",
  "가장 왼쪽 i (s[i] != ch) — 매번 스캔":
    "the leftmost i with s[i] != ch - scanned every time",
  "가장 왼쪽 i (s[i] ≠ ch) — 매번 스캔 (다음 단계에서 lookup 표로 교체)":
    "the leftmost i with s[i] != ch - scanned every time (the next step replaces this with a lookup table)",
  "같은 글자 c 인 j 들은 모두 같은 i, k 질문을 함 → 한 번만 답하면 됨.":
    "every j holding the same letter c asks the same i and k question - so answer it once",
  "그 사이의 j 후보들":
    "the candidate j's in between",
  "그 사이의 j 후보들 = positions_of[c] 중 (left_pointer, right_pointer) 안":
    "the candidate j's in between = those in positions_of[c] that fall inside (left_pointer, right_pointer)",
  "꼭짓점 양옆 c 후보 2 개 = 두 표에서 O(1) 로 바로 (이분 탐색 불필요)":
    "the two c candidates either side of the top - straight from the two tables in O(1), no binary search needed",
  "꼭짓점 양옆 c 후보 2 개 — 두 표에서 O(1)":
    "the two c candidates either side of the top - O(1) from the two tables",
  "모든 가운데 자리 j 시도 — j 박힌 동안 왼쪽 + 오른쪽 훑기.":
    "try every middle position j - with j fixed, scan left and right",
  "모든 가운데 자리 j 한 번씩 시도 — j 가 박힌 동안 양쪽으로 훑기.":
    "try each middle position j once - with j fixed, scan both ways",
  "모아서 한 번에 출력 (쿼리마다 print 하면 느림)":
    "collect and print once at the end (printing per query is slow)",
  "빠른 입력 (쿼리 3 만 개 필수)":
    "fast input (needed for 30,000 queries)",
  "세 lookup 표 — 쿼리 전에 한 번만 (전처리).  ('a'+c) = 글자 c":
    "three lookup tables - built once before any query. ('a'+c) is the letter c",
  "세 lookup 표 — 쿼리 전에 한 번만 만들어 둠 (전처리).  chr(c+97) = 글자 c":
    "three lookup tables - built once before any query. chr(c+97) is the letter c",
  "오→왼":
    "right to left",
  "오→왼: 앞으로 나올 c / c아님 의 첫 위치":
    "right to left: the first place ahead holding c, and the first not holding c",
  "오른쪽 훑기: s[j] 와 같은 글자가 *마지막* 으로 있는 자리 → right_pointer":
    "scan right: the last place holding the same letter as s[j] -> right_pointer",
  "왼→오":
    "left to right",
  "왼→오: 지금까지 본 c 의 마지막 위치":
    "left to right: the last place we have seen c so far",
  "왼쪽 훑기: s[j] 와 다른 글자가 *처음* 나오는 자리 → left_pointer":
    "scan left: the first place whose letter differs from s[j] -> left_pointer",
  "포물선 꼭짓점":
    "the top of the parabola",

  // ── rounding (2026-09-15)
  "P = 자릿수":
    "P = how many digits",
  "pos 번째 자리 숫자 어떻게 가져오지?":
    "how do we get the digit at place pos?",
  "≥5 → 올림":
    ">= 5 -> round up",
  "≥5 면 올림":
    "if it is >= 5, round up",
  "그 자리 이하 0으로":
    "make that place and everything below it 0",
  "그 자리가 ≥5 면 다음 자리로 +1 올림":
    "if that digit is >= 5, carry +1 into the next place",
  "그 자리의 숫자":
    "the digit at that place",
  "다르면":
    "if they differ",
  "두 함수 모두 먼저 P 가 필요해요":
    "both functions need P first",
  "매 테스트마다 N":
    "N for each test case",
  "예시":
    "for example",
  "카운트!":
    "count it!",
  "테스트케이스 개수":
    "how many test cases",
  "(10^(pos-1) 로 나눠서 그 자리를 ones 위치까지 내리고, % 10)":
    "(divide by 10^(pos-1) to bring that digit down to the ones place, then take % 10)",
  "(1자리=ones, 2자리=tens, 3자리=hundreds, ...)":
    "(place 1 = ones, place 2 = tens, place 3 = hundreds, ...)",
  "10 보다 작아질 때까지 나누면 첫째 자리만 남음":
    "divide until it drops below 10 and only the leading digit is left",
  "10 의 n 제곱  (n 작을 때만 — brute 라 OK)":
    "10 to the power n (only for small n - fine for a brute force)",
  "10^n 헬퍼":
    "a helper for 10^n",
  "10^pos 미리 계산":
    "work out 10^pos ahead of time",
  "4 를 한 자리씩 붙임":
    "add one more 4 each time",
  "9 를 한 자리씩 붙임":
    "add one more 9 each time",
  "Bessie: 첫째 자리만 확인":
    "Bessie: only looks at the leading digit",
  "Elsie: 순서대로 반올림":
    "Elsie: rounds place by place, in order",
  "N ≤ 10^9 라서 자릿수는 9 까지만 의미 있음":
    "N <= 10^9, so only digit counts up to 9 matter",
  "P = x 의 자릿수":
    "P = how many digits x has",
  "P = x 의 자릿수 — Python 의 len(str(x)) 와 동일":
    "P = how many digits x has - the same as len(str(x)) in Python",
  "T 번 반복":
    "repeat T times",
  "ans[x] = 2 ~ x 까지의 답":
    "ans[x] = the answer for 2 up to x",
  "largest  (가장 큼)   = 4 99...9  (4 하나 + 9 가 잔뜩)":
    "largest = 4 99...9 (one 4 then a lot of 9s)",
  "largest_for(d) = 4 99...9  (앞에 4 + 9 가 잔뜩)":
    "largest_for(d) = 4 99...9 (a 4 in front, then a lot of 9s)",
  "long long: 안전용 — d=10 이면 int 오버플로":
    "64-bit, to be safe - at d = 10 an int would overflow",
  "smallest (가장 작음) = 4...45    (4 가 잔뜩 + 끝에 5)":
    "smallest = 4...45 (a lot of 4s with a 5 at the end)",
  "smallest_for(d) = 4...45  (4 가 잔뜩 + 끝에 5)":
    "smallest_for(d) = 4...45 (a lot of 4s with a 5 at the end)",
  "각 자릿수 마다, 답이 다른 수는 하나의 연속 구간:":
    "for each digit count, the numbers where the answers differ form one unbroken range:",
  "그 자리 이하는 0":
    "that place and below become 0",
  "그 자리 이하는 0 으로 (잘라내기)":
    "make that place and below 0 (cut them off)",
  "누적합 — 필요한 만큼만 계산해서 저장.":
    "running totals - work out and store only as much as we need",
  "마지막은 5":
    "the last one is a 5",
  "문자열 길이 = 자릿수":
    "the length of the string is the number of digits",
  "문자열로":
    "as a string",
  "숫자 → 문자열":
    "number -> string",
  "예: cur=58, pos=1":
    "e.g. cur = 58, pos = 1",
  "예: cur=58, pos=1, pw=10":
    "e.g. cur = 58, pos = 1, pw = 10",
  "위 자리 +1":
    "+1 to the place above",
  "첫째 자리만 남기기":
    "keep only the leading digit",
  "첫째 자리만 본다":
    "look only at the leading digit",

  // ── checkups · cowphotos · cheese (2026-09-15)
  "관찰: 뒤집기는 '가운데 기준 대칭'.":
    "notice: flipping is symmetric about the middle",
  "구간을 중심에서 넓히며 새로 들어온 두 끝만 갱신":
    "widen the range out from the centre and only update the two new ends",
  "구간을 중심에서 넓히며, 새로 들어온 두 끝만 갱신":
    "widen the range out from the centre, updating only the two new ends",
  "구간을 중심에서 양옆으로 넓히며, 새로 들어온 두 끝만 갱신":
    "widen the range out from the centre on both sides, updating only the two new ends",
  "아무것도 안 뒤집었을 때 맞는 자리 수 = 모든 구간의 출발점":
    "how many places already match with nothing flipped - the starting point for every range",
  "안 뒤집었을 때 맞는 수 = 출발점":
    "how many match with nothing flipped - the starting point",
  "안 뒤집었을 때 맞는 자리 수 = 출발점":
    "how many places match with nothing flipped - the starting point",
  "자리 i 에 올 소":
    "the cow that ends up in place i",
  "창 안 자리 l..r":
    "places l..r inside the window",
  "(다음 단계에서 안쪽 채움)":
    "(the inside gets filled in at the next step)",
  "2. 그래서 l: max(1,":
    "2. so l starts at max(1,",
  "[l, r] 바깥: 그대로 cow[i].":
    "outside [l, r]: cow[i] stays as it is",
  "[l, r] 안: 뒤집힌 후 i 자리에는 원래 (l + r - i) 자리 값.":
    "inside [l, r]: after the flip, place i holds what used to be at place (l + r - i)",
  "counts[checks] = (l, r) 쌍 중 검진 수가 정확히 checks 인 개수":
    "counts[checks] = how many (l, r) pairs give exactly that many checkups",
  "검진 ✓":
    "a checkup, yes",
  "검진 수를 '두 끝만' 고쳐 O(1) 로 이어 세고 answer 에 집계.":
    "keep the checkup count going in O(1) by fixing only the two ends, and add it into answer",
  "구간을 양쪽으로 똑같이 넓혀도 가운데 소는 자리 그대로,":
    "widening the range equally on both sides leaves the middle cows where they are,",
  "새로 들어온 두 끝만 서로 바뀐다.":
    "only the two newly added ends swap",
  "양쪽을 똑같이 넓혀도 가운데 소는 자리 그대로, 새 두 끝만 바뀜.":
    "widening equally on both sides leaves the middle cows in place - only the two new ends change",
  "외곽 (l, r) 쌍 — 서로 다른 연산 N(N+1)/2 개":
    "the outer (l, r) pairs - N(N+1)/2 different operations",
  "원하는 소면 검진 ✓":
    "if it is the cow we wanted, that is a checkup",
  "원하는 소와 같으면":
    "if it matches the cow we wanted",
  "작전: 가운데(중심)에서 구간을 한 칸씩 넓히며,":
    "the plan: widen the range one cell at a time out from the centre,",
  "작전: 중심에서 구간을 넓히며, 두 끝만 고쳐 O(1) 로 이어 세고 answer 집계.":
    "the plan: widen the range from the centre, fix only the two ends to keep counting in O(1), and add it into answer",
  "h 한 번만 훑기 → O(N)":
    "walk h once -> O(N)",
  "h 한 번만 훑음 → O(N)":
    "h is walked only once -> O(N)",
  "lookup 은 즉시":
    "the lookup is instant",
  "lookup 은 즉시 (O(1))":
    "the lookup is instant (O(1))",
  "peak 도 같이":
    "the peak too",
  "길이 = 2·rings + 1":
    "length = 2 * rings + 1",
  "길이 = 2·rings + 1 (좌+우 mirror = 2 마리, peak 1 마리)":
    "length = 2 * rings + 1 (each ring is a left and a right cow, plus the one peak)",
  "매번 h.count(v) 대신 — 빈도를 한 번만 세두면?":
    "instead of calling h.count(v) every time - what if we count once, up front?",
  "인덱스 = 키, 값 = 빈도":
    "the index is the key, the value is how often it appears",
  "입력 받으면서 빈도 누적":
    "build up the counts while reading the input",
  "키가 1..N 이라 — 그냥 freq[키] 인덱스로 빈도 저장하면 어떨까?":
    "the keys run 1..N - so why not just store the count at freq[key]?",
  "한 줄로 dict 빈도 — O(N)":
    "counts in a dict, in one line - O(N)",
  "(앞부분 생략 — h 로 입력 읽음)":
    "(earlier part omitted - the input is read into h)",
  "ring 이 되려면: v < M 이고 같은 값 2 마리 이상":
    "to be a ring: v < M, and at least two cows share that value",
  "ring 이 되려면: v < M 이고 같은 값이 2 마리 이상":
    "to be a ring: v < M, and at least two cows have that same value",
  "ring 이 되려면: 값이 peak 보다 작고 (v < M), 같은 값 2 마리 이상":
    "to be a ring: the value is below the peak (v < M) and at least two cows share it",
  "ring: v < M 이고 같은 값이 2 마리 이상 (즉시 조회)":
    "a ring: v < M and at least two cows share the value (looked up instantly)",
  "v 가 몇 번 나오는지 세고 ≥ 2 면 ring":
    "count how often v appears - two or more makes it a ring",
  "v 를 이미 셌으면 skip":
    "skip v if we have already counted it",
  "빈도 한 번에 — O(N)":
    "count them all in one pass - O(N)",
  "빈도를 한 번에 세기 — O(N)  (h.count 로 매번 훑으면 O(N²) → TLE)":
    "count them all in one pass - O(N) (calling h.count every time would be O(N^2) and time out)",
  "키가 1..N → 값 자체를 인덱스로 freq 세기 — O(N)":
    "the keys run 1..N, so use the value itself as the index into freq - O(N)",
  "키가 1..N → 값을 인덱스로 freq 세기 — O(N)":
    "the keys run 1..N, so count into freq using the value as the index - O(N)",
  "x-방향: (y,z) 쌍":
    "along x: the pair (y, z)",
  "y-방향: (x,z) 쌍":
    "along y: the pair (x, z)",
  "z-방향: (x,y) 고정, z 변함":
    "along z: (x, y) stay fixed, z changes",
  "z-방향: (x,y) 쌍":
    "along z: the pair (x, y)",
  "블록 빼기":
    "take a block away",
  "🐌 3 방향 × N² 줄 × N 칸 = O(N³) per query — TLE 원인!":
    "slow: 3 directions x N^2 lines x N cells = O(N^3) per query - this is what times out!",
  "0 으로 미리 채운 2D vector":
    "a 2D vector filled with zeros up front",
  "3D 큐브: cheese[x][y][z] = True 면 거기 블록 있음":
    "a 3D cube: cheese[x][y][z] is True when a block sits there",
  "3D 큐브: cheese[x][y][z] = true 면 거기 블록 있음":
    "a 3D cube: cheese[x][y][z] is true when a block sits there",
  "N×N 격자 — z/x/y 방향 줄별 카운터":
    "an N by N grid - a counter for each line along z, x and y",
  "x-방향, y-방향도 똑같이 (생략 — 같은 패턴 반복)":
    "x and y work the same way (left out - it repeats the same pattern)",
  "x-방향: (y,z) 고정, x 변함":
    "along x: (y, z) stay fixed, x changes",
  "x-방향: N² 직선":
    "along x: N^2 straight lines",
  "xy[(3,5)] → 이제 1!":
    "xy[(3,5)] -> now 1!",
  "xy[(3,5)] → 자동으로 0!":
    "xy[(3,5)] -> 0 on its own!",
  "xy[3][5] 는 이미 0":
    "xy[3][5] is already 0",
  "xy[3][5] 는 이제 1":
    "xy[3][5] is now 1",
  "y-방향: (x,z) 고정, y 변함":
    "along y: (x, z) stay fixed, y changes",
  "y-방향: N² 직선":
    "along y: N^2 straight lines",
  "z-방향: N² 직선":
    "along z: N^2 straight lines",
  "모든 N² 줄을 N 칸씩 확인 → O(N³) per query":
    "checking all N^2 lines, N cells each -> O(N^3) per query",

  // ── mcc22maze · hps · lostcow · race · mcc21simplemath · livestock (2026-09-15)
  "). 인접한 통로 칸 사이를 오가요. 조작 한 번: 한 행이나 열을 골라 그 안의 벽을 전부 부숴요.\n좌상단에서 우하단에 닿을 수 있게 만드는 최소 조작 횟수를 구해요.":
    "). You move between neighbouring open cells. One operation: pick a row or a column and knock down every wall in it.\nFind the fewest operations that let you get from the top-left to the bottom-right.",
  "각 '열'도 똑같이 시험":
    "try each column the same way",
  "각 '행'을 하나씩 시험 삼아 부숴보기":
    "try knocking down each row, one at a time",
  "각 칸의 대표":
    "the representative of each cell",
  "그 행을 통로로":
    "open that row up",
  "묶음 크기":
    "size of the group",
  "원래 통로끼리 인접하면 같은 묶음으로":
    "open cells that already touch go into the same group",
  "원상복구":
    "put it back the way it was",
  "위·아래 통로와 연결":
    "join up with the open cells above and below",
  "유니온-파인드 (되돌리기 지원)":
    "union-find (with undo)",
  "이미 이어짐":
    "already joined",
  "칸 (r,c) 에 번호 붙이기":
    "give the cell (r, c) a number",
  "하나로는 안 되면 2":
    "if one is not enough, then 2",
  "합친 기록 (되돌리기용)":
    "a record of what we joined, so we can undo it",
  "N (카드 종류) 와 M (Elsie 패 개수) 읽기":
    "read N (how many card types) and M (how many hands Elsie has)",
  "W/L/D 차트로 표 채우기":
    "fill the table in from the W/L/D chart",
  "둘 중 하나가 Elsie 두 카드 다 이기나?":
    "does either one beat both of Elsie's cards?",
  "'누가 누구 이김' 표 — 처음엔 다 False":
    "the 'who beats whom' table - everything starts False",
  "'누가 누구 이김' 표 — 처음엔 다 false":
    "the 'who beats whom' table - everything starts false",
  "(Elsie 패 루프 안)":
    "(inside the loop over Elsie's hands)",
  "(Python 전용 트릭 — C++ 은 위 코드로 충분)":
    "(a Python-only trick - in C++ the code above is enough)",
  "Elsie 두 카드 다 이기는 카드 (dom) — 단일 for":
    "cards that beat both of Elsie's (dom) - one loop",
  "Elsie 두 카드 다 이기는 카드 (dom) 개수 — 단일 for, O(N)":
    "how many cards beat both of Elsie's (dom) - one loop, O(N)",
  "col[c] = 비트마스크: i 번째 비트 = 카드 i 가 카드 c 이김":
    "col[c] marks, bit by bit, which cards beat card c - bit i means card i beats it",
  "├─ 이 두 줄이 N² !":
    "these two lines are the N^2 part!",
  "답 = 전체 N² - dom 없는 (N-dom)²":
    "answer = all N^2 minus the (N-dom)^2 pairs with no dominating card",
  "두 컬럼 AND → 둘 다 이기는 카드 비트만 남음 → popcount":
    "AND the two columns: only cards beating both survive, then count the bits",
  "(시작 위치 x 로부터 2배씩 멀어지는 zig-zag)":
    "(a zig-zag that doubles its distance from the starting spot x each time)",
  "+1 오른쪽, -1 왼쪽":
    "+1 is right, -1 is left",
  "⚠️ target 은 항상 시작 x 기준":
    "careful: target is always measured from the starting x",
  "⚠️ target 은 항상 시작 x 에서 계산 (현재 pos 가 아니라!)":
    "careful: target is always worked out from the starting x, not from where we are now!",
  "누적 걸은 거리":
    "how far we have walked in total",
  "매 step k: target = x + direction * 2^(k-1)":
    "at step k: target = x + direction * 2^(k-1)",
  "매 step k: target = x + direction * 2^(k-1) (시작 위치 x 기준)":
    "at step k: target = x + direction * 2^(k-1), measured from the starting x",
  "시작 위치 x 기준":
    "measured from the starting spot x",
  "이번 leg 의 거리 — 매번 두 배":
    "how far this leg goes - it doubles every time",
  "지금 pos 에서 target 사이에 y 가 있으면 도달":
    "if y lies between where we are and target, we reach it",
  "지금 발 위치 (처음엔 x 에서 시작)":
    "where we are standing now (we start at x)",
  "한 leg 다 걷고 방향 반전, step 은 두 배":
    "after one leg, turn around and double the step",
  "- p <= X: 가속만 (끝 속도 = p, 그래도 X 이하면 OK)":
    "- p <= X: speed up only (we finish at speed p, which is fine as long as it is at most X)",
  "- p > X: 가속 + cruise + 감속 (끝 속도 = X)":
    "- p > X: speed up, cruise, then slow down (we finish at speed X)",
  "- 최고 속도 p 까지 가속 → 정속 cruise → X 까지 감속":
    "- speed up to a top speed of p, cruise, then slow down to X",
  "Case 1: 최고 속도 p <= X (가속만 + cruise)":
    "case 1: top speed p <= X (speed up, then cruise)",
  "Case 2: p > X (가속 + cruise + 감속)":
    "case 2: p > X (speed up, cruise, slow down)",
  "p = X 로 가속 후 cruise":
    "speed up to p = X, then cruise",
  "가장 작은 t 찾기: t(t+1)/2 >= K, t <= X":
    "find the smallest t with t(t+1)/2 >= K and t <= X",
  "각 peak 속도 p 마다 최소 time 계산":
    "for each top speed p, work out the shortest time",
  "거리 공식: base_dist(p, X) = p*p - X*(X-1)//2  (p > X 경우)":
    "distance formula: base_dist(p, X) = p*p - X*(X-1)//2 (when p > X)",
  "시간 공식: base_time = 2p - X  + cruise":
    "time formula: base_time = 2p - X, plus the cruise",
  "전략:":
    "the plan:",
  "최적 p 는 sqrt(K + X(X-1)/2) 근처 → 그 주변만 시도":
    "the best p sits near sqrt(K + X(X-1)/2), so only try around there",
  "최적은 p = X (속도 최대). 단, X(X+1)/2 >= K 면 더 작은 t 가능":
    "the best is p = X (top speed) - though if X(X+1)/2 >= K, a smaller t will do",
  "(1+A1)(1+A2)...(1+An) 를 펼치면":
    "if you expand (1+A1)(1+A2)...(1+An)",
  "→ 2^(N-1) 개의 부분집합에 그 수가 들어간다":
    "-> that number appears in 2^(N-1) of the subsets",
  "각 수 x 2^(N-1)":
    "each number, times 2^(N-1)",
  "각 수는 2^(N-1) 개의 부분집합에 등장한다":
    "each number shows up in 2^(N-1) subsets",
  "각 항이 부분집합 하나의 곱 (빈 집합 = 1 만 빼면 됨)":
    "each term is the product of one subset (we only have to drop the empty set, which is 1)",
  "모든 부분집합 곱의 합 = (1+A1)(1+A2)...(1+An) - 1":
    "the sum over all subsets of their product = (1+A1)(1+A2)...(1+An) - 1",
  "비트마다: 그 비트를 홀수 개 고른 부분집합만 기여":
    "bit by bit: only subsets that pick an odd number of that bit contribute",
  "빈 집합(=1) 만 빼기":
    "subtract just the empty set, which is 1",
  "수 하나를 고정하면 나머지 N-1 개는 자유":
    "fix one number and the other N-1 are free",
  "이 비트를 가진 원소가 k 개일 때,":
    "when k of the numbers carry this bit,",
  "입력은 main() 에서 읽음":
    "the input is read in main()",
  "홀수 개 고르기: 2^(k-1) 가지, 나머지 자유: 2^(N-k)":
    "picking an odd number of them: 2^(k-1) ways; the rest are free: 2^(N-k)",
  "알파벳 순으로 정렬해둔 소 이름 8개":
    "the eight cow names, sorted alphabetically",
  "'X must be milked beside Y' — 첫 단어와 마지막 단어":
    "'X must be milked beside Y' - the first word and the last word",
  "'X must be milked beside Y' → 첫 단어와 마지막 단어":
    "'X must be milked beside Y' -> the first word and the last word",
  "cows 가 알파벳 순이라 next_permutation 은 '사전순으로' 배열을 만들어줘요.":
    "because cows is in alphabetical order, next_permutation hands us the arrangements in dictionary order",
  "cows 가 알파벳 순이라 permutations 는 배열을 '사전순으로' 만들어줘요.":
    "because cows is in alphabetical order, permutations hands us the arrangements in dictionary order",
  "공백으로 자르기":
    "split on spaces",
  "제약: (a, b) 쌍들 — a 와 b 는 줄에서 인접해야 함":
    "the rules: pairs (a, b) - a and b must stand next to each other in the line",
  "제약: pairs_a[i] 와 pairs_b[i] 는 인접해야 함":
    "the rules: pairs_a[i] and pairs_b[i] must stand next to each other",
  "줄바꿈 흡수":
    "swallow the newline",
  "처음으로 모든 제약을 만족하는 배열이 곧 답 — 재귀 없이 반복문으로.":
    "the first arrangement that meets every rule is the answer - done with a loop, no recursion",
  "처음으로 제약을 만족하는 배열이 곧 답 — 재귀 없이 반복문으로.":
    "the first arrangement that meets the rules is the answer - done with a loop, no recursion",

  // ── milkorder · mooin2 · acowdemia3 · familytree · meastraffic · modernart · sleepyherd · billboard2 (2026-09-15)
  "USACO 이전 contest 는 파일 입출력 사용":
    "older USACO contests use file I/O",
  "hierarchy 순서대로 placement":
    "place them in hierarchy order",
  "1) 고정 위치 + cow 1 at p 로 position 배열 만듦":
    "1) build the position array from the fixed spots plus cow 1 at p",
  "2) hierarchy 를 순서대로 placement: 고정이면 그 위치 사용, 아니면 next 이후 가능한 위치 찾기":
    "2) place the hierarchy in order: use the fixed spot if there is one, otherwise find the next free spot",
  "K 고정 위치: cow -> position":
    "K fixed spots: cow -> position",
  "cow 1 의 고정 위치가 있다면 그것과 일치해야 함":
    "if cow 1 has a fixed spot, this has to match it",
  "h 의 위치를 결정":
    "settle where h goes",
  "nxt 이후 비어있는 위치 찾기":
    "find the first free spot at or after nxt",
  "pos_to_cow[q] = q 위치에 있는 cow (없으면 0)":
    "pos_to_cow[q] = the cow standing at spot q (0 if it is empty)",
  "각 p (1..N) 에 대해 cow 1 이 거기 갈 수 있는지 검사":
    "for each p in 1..N, check whether cow 1 can stand there",
  "각 p 에 대해 cow 1 이 p 에 갈 수 있는지 검사":
    "for each p, check whether cow 1 can stand at p",
  "다음 후보 위치":
    "the next spot to try",
  "second_last: 각 값의 '끝에서 두 번째' 자리 j (오른쪽부터, count 가 2 되는 순간)":
    "second_last: for each value, the second-from-the-end place j (counting from the right, the moment the count hits 2)",
  "x 는 i 자리":
    "x sits at place i",
  "둘째 y 는 k 자리":
    "the second y sits at place k",
  "서로 다른 (x, y) moo 모음":
    "the collection of different (x, y) moos",
  "오른쪽부터 세다가 그 값의 count 가 2 되는 순간이 그 자리":
    "counting from the right, that place is where the value's count reaches 2",
  "첫 y 는 j 자리":
    "the first y sits at place j",
  "a[i] 자기 자신은 빼기":
    "leave out a[i] itself",
  "second_last: 각 값이 '끝에서 두 번째'로 나온 자리 j (그 뒤에 같은 y 가 또 있음)":
    "second_last: for each value, the place j where it appears second from the end (another matching y comes after it)",
  "second_last: 각 값이 '끝에서 두 번째'로 나온 자리 j (뒤에 같은 y 가 또 있음)":
    "second_last: for each value, the place j where it appears second from the end (another matching y follows)",
  "답 (클 수 있음 -> long long): (y,y) 짝마다 memo[j] 를 더함":
    "the answer (it can get big, so use 64-bit): for each (y, y) pair, add memo[j]",
  "답 = 각 (y,y) 짝마다, 그 j 앞에 올 수 있는 서로 다른 x 개수를 더함":
    "the answer = for each (y, y) pair, add how many different x's could come before that j",
  "3마리 이상이면 반대편 한 쌍 → 바로 친구":
    "three or more means some pair sits opposite each other -> friends right away",
  "3마리+ → 반대편 한 쌍":
    "three or more -> a pair opposite each other",
  "같은 쌍은 1번만":
    "count each pair only once",
  "같은 쌍이 두 번 나와도 set 이 1번만":
    "even if the same pair comes up twice, the set keeps only one",
  "소 0~1마리 → 우정 불가":
    "zero or one cow -> no friendship possible",
  "소 0~1마리면 우정 불가":
    "with zero or one cow there is no friendship",
  "소 2마리 쌍 (중복 제거)":
    "pairs of exactly two cows (duplicates removed)",
  "풀 칸에 소 3마리 이상 (반대편 쌍) → 바로 +1":
    "three or more cows on a grass cell (a pair sits opposite) -> +1 right away",
  "풀 칸에 소 3마리+ (반대편 쌍) → 바로 +1":
    "three or more cows on a grass cell (an opposite pair) -> +1 right away",
  "풀 칸에 소 정확히 2마리 → 그 소 쌍을 기록 (중복 제거)":
    "exactly two cows on a grass cell -> record that pair (duplicates removed)",
  "A 가 B 의 ancestor":
    "A is an ancestor of B",
  "A 가 B 의 aunt (혹은 great-aunt)":
    "A is B's aunt (or great-aunt)",
  "A 의 ancestor chain (자기 자신 포함)":
    "A's chain of ancestors (A included)",
  "A 의 ancestor chain 만들기 (자기 자신 포함)":
    "build A's chain of ancestors (A included)",
  "B 가 A 의 ancestor":
    "B is an ancestor of A",
  "B 의 ancestor chain":
    "B's chain of ancestors",
  "LCA 찾기: chain_A 에서 가장 가까운 (인덱스 낮은) 공통 조상":
    "find the lowest common ancestor: the nearest shared one in chain_A (the smallest index)",
  "LCA: chain_A 에서 가장 가까운 공통 조상":
    "the lowest common ancestor: the nearest shared one in chain_A",
  "같은 cow 가정 안 함":
    "we do not assume they are the same cow",
  "첫 줄: N + 두 cow 이름":
    "first line: N and the two cow names",
  "Backward sweep: 끝부터 처음까지":
    "backward sweep: from the end to the start",
  "Backward sweep: 끝부터 처음까지 흐름 범위 좁히기":
    "backward sweep: narrow the flow range from the end to the start",
  "Forward sweep: 처음부터 끝까지":
    "forward sweep: from the start to the end",
  "Forward sweep: 처음부터 끝까지 흐름 범위 좁히기":
    "forward sweep: narrow the flow range from the start to the end",
  "reverse: 거꾸로 가니 ramp 만큼 더하기":
    "going backwards, so add the ramp instead",
  "reverse: 거꾸로 가니 ramp 만큼 빼기":
    "going backwards, so subtract the ramp instead",
  "type = 'none' (센서), 'on' (진입로), 'off' (출구)":
    "type is 'none' for a sensor, 'on' for an on-ramp, 'off' for an exit",
  "각 segment: (type, lo, hi)":
    "each segment is (type, lo, hi)",
  "큰 범위로 시작 (아주 큰 수 = 무한대 대신)":
    "start with a wide range (a very large number stands in for infinity)",
  "canvas 에 안 보임":
    "it does not show on the canvas",
  "각 색깔의 bounding box":
    "the bounding box of each colour",
  "각 색깔의 bounding box 계산":
    "work out the bounding box of each colour",
  "각 줄은 공백 없이 N 자리 숫자":
    "each line is N digits with no spaces",
  "각 줄은 공백 없이 N 자리 숫자 (예: '2230')":
    "each line is N digits with no spaces (e.g. '2230')",
  "색깔 C 가 first 일 조건:":
    "for colour C to have been painted first:",
  "색깔 C 가 first: 어떤 C 셀도 다른 색깔 Y 의 bbox 안에 있으면 안 됨":
    "colour C was first only if no C cell sits inside another colour Y's bounding box",
  "어떤 C 셀도 다른 색깔 Y 의 bbox 안에 있으면 안 됨 (있으면 C 가 Y 보다 나중)":
    "no C cell may sit inside another colour Y's bounding box (if one does, C came after Y)",
  "이 C 셀이 다른 색깔의 bbox 에 있는지 확인":
    "check whether this C cell sits inside another colour's bounding box",
  "- 나머지: 2번":
    "- otherwise: 2 moves",
  "- 나머지: 2번 필요 (gap=1 한쪽 + gap>2 다른쪽 케이스 포함)":
    "- otherwise: 2 moves (this covers one gap of 1 with the other bigger than 2)",
  "- 한 쪽 gap=2: 가운데 빈 칸으로 옮기면 1번":
    "- if one gap is 2: move into the empty middle cell, so 1 move",
  "- 한 쪽 gap=2: 가운데 빈 칸으로 옮기면 1번에 해결":
    "- if one gap is 2: moving into the empty middle cell settles it in 1 move",
  "3마리 소 위치 입력 (한 줄에 공백으로 구분), 정렬":
    "read the three cow positions (one line, space separated) and sort them",
  "Maximum moves: 큰 gap 안에서 1칸씩 = max(gap1, gap2) - 1":
    "most moves: stepping one cell at a time inside the larger gap = max(gap1, gap2) - 1",
  "Maximum moves: 큰 gap 안에서 1칸씩 움직이는 횟수 = max(gap1, gap2) - 1":
    "most moves: how many one-cell steps fit in the larger gap = max(gap1, gap2) - 1",
  "a 와 b 사이 간격":
    "the gap between a and b",
  "b 와 c 사이 간격":
    "the gap between b and c",
  "billboard 너비":
    "the width of the billboard",
  "billboard 높이":
    "the height of the billboard",
  "cow feed 가 billboard 의 전 너비 + 위/아래 한쪽 edge 까지 닿음":
    "the feed poster covers the billboard's full width and reaches the top or bottom edge",
  "cow feed 가 billboard 의 전 너비를 덮고, 위/아래 한쪽 edge 까지 닿는 경우":
    "the case where the feed poster covers the full width and reaches the top or bottom edge",
  "cow feed 가 billboard 의 전 높이 + 좌/우 한쪽 edge 까지 닿음":
    "the feed poster covers the billboard's full height and reaches the left or right edge",
  "cow feed 가 billboard 의 전 높이를 덮고, 좌/우 한쪽 edge 까지 닿는 경우":
    "the case where the feed poster covers the full height and reaches the left or right edge",
  "그 외: bounding box 가 전체 billboard → 전체 면적":
    "otherwise the bounding box is the whole billboard -> the whole area",
  "첫 줄: billboard 좌표, 둘째 줄: feed (tarp) 좌표":
    "first line: the billboard's corners; second line: the feed poster's corners",

  // ── hoofball · moo · swapity · backforth · socialdist2 · bucketbrigade · crossroad2 · explodingarrow · fences (2026-09-15)
  "1 단계: 아무도 안 주는 cow 마다 ball 1 개":
    "step 1: one ball for each cow nobody passes to",
  "1 단계: 안 받는 cow 마다 ball 1 개":
    "step 1: one ball for each cow that never receives",
  "2 단계: 서로만 패스하는 인접 쌍 (mutual cycle) 마다 ball 1 개 추가":
    "step 2: one more ball for each neighbouring pair that only passes to each other",
  "2 단계: 인접 mutual cycle 쌍마다 ball 1 개 추가":
    "step 2: one more ball for each neighbouring pair that passes only to each other",
  "각 cow 가 몇 번 받는지":
    "how many times each cow receives",
  "각 cow 마다 누구한테 패스하는지 (tie 시 왼쪽)":
    "who each cow passes to (on a tie, the one on the left)",
  "각 cow 마다 누구한테 패스하는지 (가까운 쪽, tie 시 왼쪽)":
    "who each cow passes to (the nearer one; on a tie, the left)",
  "받는 횟수":
    "how many times it receives",
  "매번 전체 문자열 재스캔 (N 칸)":
    "rescanning the whole string every time (N cells)",
  "원본 문자열에 이미 있는 moo 등록":
    "register the moos already in the original string",
  "🐌 매 위치 × 26 글자 시도 — TLE 원인!":
    "slow: every position times 26 letters - this is what times out!",
  "set 은 순서 없음 — sorted() 로 리스트 만듦":
    "a set has no order, so sorted() turns it into a list",
  "set 은 알파벳순 순회 — 정렬 불필요":
    "this set walks in alphabetical order, so no sorting is needed",
  "한 식이 모든 경우 처리":
    "one formula handles every case",
  "🔴 REMOVE: 영향받는 3 윈도우 카운트 빼기":
    "REMOVE: take away the counts of the three windows this affects",
  "🟢 RESTORE: 원래 윈도우 복원":
    "RESTORE: put the original windows back",
  "사이클 분해로 K 라운드 효율적 계산":
    "break it into cycles to work out K rounds quickly",
  "위치 cycle[j] 에 사이클에서 shift 만큼 뒤의 원래 소 (1-indexed)":
    "spot cycle[j] gets the cow that sits shift places further along the cycle (counting from 1)",
  "두번째 reverse: 위치 B1-1 ~ B2-1":
    "second reverse: spots B1-1 to B2-1",
  "사이클 추출":
    "pull out the cycles",
  "첫번째 reverse: 위치 A1-1 ~ A2-1 (0-indexed)":
    "first reverse: spots A1-1 to A2-1 (counting from 0)",
  "출력: 각 줄에 위치 i 의 소 번호":
    "output: one line per spot i, the number of the cow standing there",
  "한 라운드의 perm 구축 (2번의 reverse 적용)":
    "build one round's rearrangement (applying the two reverses)",
  "한 라운드의 perm 구축 (2번의 reverse)":
    "build one round's rearrangement (the two reverses)",
  "1일: b1 → b2 (b1 의 10개 중 1개 선택)":
    "day 1: b1 -> b2 (pick one of b1's 10)",
  "2일: b2 → b1 (b2 의 11개 중 1개 선택)":
    "day 2: b2 -> b1 (pick one of b2's 11)",
  "3일: b1 → b2 (b1 의 10개 중 1개 선택)":
    "day 3: b1 -> b2 (pick one of b1's 10)",
  "4일 동안 barn1 <-> barn2 옮기기, 최종 b1 총합 distinct":
    "move buckets between barn 1 and barn 2 for four days, then count the different totals barn 1 can end with",
  "4일 동안 barn1 <-> barn2 옮기기:":
    "moving buckets between barn 1 and barn 2 for four days:",
  "4일: b2 → b1 (b2 의 11개 중 1개 선택)":
    "day 4: b2 -> b1 (pick one of b2's 11)",
  "최종 b1 총합의 distinct 가짓수 출력":
    "print how many different totals barn 1 can end with",
  "모두 아픔 — 초기 감염 1마리로 전파 가능":
    "everyone is sick - one starting case could have spread to all of them",
  "max R: 가장 큰 R — 어떤 건강한 소도 아픈 소의 R 이내에 없어야 함":
    "the largest R: no healthy cow may sit within R of a sick one",
  "max R: 가장 큰 R 값 — 어떤 건강한 소도 아픈 소의 R 이내에 없어야 함":
    "the largest possible R: no healthy cow may sit within R of a sick one",
  "건강한 소가 나오면 클러스터 끊김":
    "a healthy cow breaks the cluster",
  "연속된 아픈 소 사이 거리 > R 이면 새 클러스터":
    "if two sick cows in a row are more than R apart, that starts a new cluster",
  "클러스터 세기":
    "count the clusters",
  "클러스터 세기: 정렬된 cows 순회":
    "count the clusters: walk the sorted cows",
  "rock 이 L 과 B 의 같은 행/열에 끼어 있으면 우회 → +2":
    "if the rock sits between L and B on the same row or column, we go around it -> +2",
  "같은 열":
    "the same column",
  "같은 행":
    "the same row",
  "같은 행: L, B, R 모두 같은 행이고 R 이 L 과 B 사이에 있음":
    "same row: L, B and R are all on one row and R sits between L and B",
  "최단 거리 = 맨해튼 - 1 (양 끝 제외)":
    "shortest distance = the Manhattan distance minus 1 (the two ends do not count)",
  "최단 거리 = 맨해튼 거리 - 1 (양 끝 제외)":
    "shortest distance = the Manhattan distance minus 1 (the two ends do not count)",
  "각 글자의 첫 번째와 두 번째 위치":
    "where each letter appears the first and the second time",
  "각 글자의 첫 번째와 두 번째 위치 찾기":
    "find where each letter appears the first and the second time",
  "끝점 번갈아: a1 < b1 < a2 < b2 또는 b1 < a1 < b2 < a2":
    "the ends alternate: a1 < b1 < a2 < b2, or b1 < a1 < b2 < a2",
  "두 chord (A, B) 가 교차할 조건: 끝점이 번갈아 (a1 < b1 < a2 < b2 또는 그 반대)":
    "two chords A and B cross exactly when their ends alternate (a1 < b1 < a2 < b2, or the other way round)",
  "입력은 한 줄: 글자 시퀀스":
    "the input is one line: a sequence of letters",
  "입력은 한 줄: 글자 시퀀스 (각 cow 가 2번씩 등장)":
    "the input is one line: a sequence of letters (each cow shows up twice)",
  "데미지가 닿는 최대 거리":
    "how far the damage reaches",
  "여기서 쏠 화살 수":
    "how many arrows to shoot here",
  "... feasible(X) 는 아래 ② 에서 ...":
    "... feasible(X) is defined in part 2 below ...",
  "M 은 j 를 혼자서 없앨 최소 X 예요 — 정답은 이 값들 중 최댓값을 넘지 않아요.":
    "M is the smallest X that clears j on its own - the answer never goes above the largest of these",
  "feasible(X) 는 아래 ② 에서 정의":
    "feasible(X) is defined in part 2 below",
  "정수 제곱근":
    "integer square root",
  "이면 된다":
    "is enough",
  ") 로 바꿔요.":
    ") .",
  ") 로 채워져 있어요. FJ 가 한 개의 열을 골라 그 열의 모든 칸을 울타리 (#) 로 바꾸려고 해요. 풀 → 울타리 한 칸당 비용 1.\n어떤 열을 골랐을 때 가장 적은 총 비용이 드는지 출력해요.":
    ") . FJ picks one column and turns every cell of it into fence (#). Turning one grass cell into fence costs 1.\nPrint the smallest total cost he can get by choosing the best column.",
  "). 열(세로줄!) 하나를 골라서 전부 울타리로 만들어야 해요!":
    "). Pick one column (a vertical line!) and turn all of it into fence!",
  "으로 바꿔요!":
    "!",
  "이어야 한다":
    "must be",
  /* ── 2026-09-15 배치 5 (남은 181개 전부) ───────────────────────── */
  "c+d 오름차순":
    "sorted by c+d ascending",
  "include 는 배운 헤더들로 (iostream, vector) 나눠 적어.":
    "include only the headers we learned (iostream, vector), one per line.",
  "log[i] 제약":
    "constraint from log[i]",
  "radj[b] = b 로 들어오는 간선의 시작점들 (역방향 인접 리스트)":
    "radj[b] = the starts of edges coming into b (reverse adjacency list)",
  "x op y == z 인가?":
    "is x op y == z ?",
  "y 도 똑같이 해요.":
    "do the same for y.",
  "가장 큰 적을 먹어 최대 성장":
    "eat the biggest enemy you can for the most growth",
  "각 (pz, K) 시뮬레이션":
    "simulate each (pz, K)",
  "각 목초지마다 '다른 풀이어야 하는' 목초지 목록":
    "for each pasture, the list of pastures that must get a different grass",
  "각 점을 직각 꼭짓점으로: 같은 y 의 가장 먼 점 + 같은 x 의 가장 먼 점":
    "take each point as the right angle: farthest point with the same y + farthest with the same x",
  "각 행을 K 번 반복, 각 글자도 K 번 반복":
    "repeat each row K times, and each letter K times too",
  "같은 cow 가 이전 관찰과 다른 side 면 cross 횟수 증가":
    "if the same cow is on a different side than last time, count one more crossing",
  "그리디: 각 목초지에 가장 작은 색(1~4) 할당":
    "greedy: give each pasture the smallest color (1-4) it can take",
  "단어 길이 합이 K 이하 (공백은 안 세는 USACO 문제)":
    "the word lengths must sum to K or less (this USACO problem does not count spaces)",
  "더 먹을 적이 없음":
    "no enemy left to eat",
  "두 특성 a, b 가 'cross' 하면 invalid:":
    "if two traits a and b 'cross', it is invalid:",
  "마지막 1 ~ 오른쪽 끝":
    "from the last 1 to the right end",
  "마지막 라운드부터 거꾸로 되돌려요.":
    "undo it backwards, starting from the last round.",
  "빈 stall만 있는 경우: 0, D, 2D, ... 배치":
    "if every stall is empty: place at 0, D, 2D, ...",
  "세 x 좌표 중 둘은 같아요. 짝 없는 하나가 네 번째 점의 x 예요.":
    "two of the three x values are equal. the unpaired one is the fourth point's x.",
  "세 수의 합이 홀수 = (홀 3개) 또는 (홀 1개 + 짝 2개)":
    "three numbers sum to an odd number when they are (3 odds) or (1 odd + 2 evens)",
  "실제 감염된 소 set (1-indexed)":
    "the set of cows that really got infected (1-indexed)",
  "쌍 (i, j) 중 모든 세션에서 같은 순서가 유지되는 쌍 개수":
    "count the pairs (i, j) that keep the same order in every session",
  "역방향 한 step: temp[i] = result[shuffle[i]]":
    "one step backwards: temp[i] = result[shuffle[i]]",
  "오른쪽부터 정렬되어 있는 가장 긴 suffix 찾기":
    "find the longest suffix that is already sorted, starting from the right",
  "왼쪽 끝 ~ 첫 1":
    "from the left end to the first 1",
  "음절 + 메아리":
    "the syllable plus its echo",
  "이미 존재하는 1들 사이 최소 거리가 D 이상이어야 함":
    "the 1s that are already there must be at least D apart",
  "이벤트: (시각, delta). 시작 +b, 끝+1 -b":
    "events: (time, delta). +b at the start, -b at end+1",
  "자음이 없어요 → f 를 앞에 붙여요":
    "no consonant -> put f in front",
  "정렬된 순서와 비교해 어긋난 위치 개수":
    "how many spots differ from the sorted order",
  "주어진 3개 중 짝이 있는 두 개를 빼면, 짝 없는 하나가 답이에요.":
    "drop the two that pair up, and the unpaired one is the answer.",
  "줄마다 [-1, -1, …] 하나씩":
    "one [-1, -1, ...] row per line",
  "줄마다 [False, False, …] 하나씩":
    "one [False, False, ...] row per line",
  "줄마다 [INF, INF, …] 하나씩":
    "one [INF, INF, ...] row per line",
  "지금 자리가 pos 라면, 한 라운드 전에는":
    "if you are at pos now, then one round earlier you were",
  "첫 자음을 f 로 갈아끼워요":
    "swap the first consonant for an f",
  "축에 평행한 직사각형 → x 좌표는 왼쪽 변에 2번, 오른쪽 변에 2번 등장해요.":
    "in an axis-parallel rectangle each x shows up twice on the left side and twice on the right.",
  "현재 점유된 stall 위치들 (0-indexed)":
    "the stalls that are taken right now (0-indexed)",
  "홀수·짝수 바구니 개수":
    "how many odd and even baskets there are",
  "'factory' 후보는 모든 소가 도달할 수 있는 곳":
    "a 'factory' candidate is a spot every cow can reach",
  "(arrival, duration) — arrival 순으로 정렬해서 처리":
    "(arrival, duration) - sort by arrival and handle them in that order",
  "(거리, x, y) 최소 힙 — greater<> 로 가장 작은 거리부터 꺼냄":
    "(distance, x, y) min-heap - greater<> pops the smallest distance first",
  "(티어, 번호) 쌍으로 줄 세우기.":
    "line them up by the pair (tier, number).",
  "1..N 순열 검사: 정렬해서 1, 2, ..., N 이면 OK":
    "check it is a permutation of 1..N: sort it and see if it is 1, 2, ..., N",
  "1..N 순열 검사: 정렬해서 [1, 2, ..., N] 과 같으면 OK":
    "check it is a permutation of 1..N: sort it and compare with [1, 2, ..., N]",
  "10 = 2, partial = 5. answer = 2 × 4 (온전한 사이클) + 2 (남는 5항의 0) = 10.":
    "10 = 2, partial = 5. answer = 2 x 4 (whole cycles) + 2 (the 0s in the leftover 5 terms) = 10.",
  "1480 — Running Sum of 1d Array. nums 가 주어지면 output[i] = nums[0] + nums[1] + … + nums[i] 인 배열을 반환. 가장 간단한 누적합 문제 — 다음 세 문제의 기초예요.":
    "1480 - Running Sum of 1d Array. Given nums, return the array output[i] = nums[0] + nums[1] + ... + nums[i]. The simplest prefix-sum problem - the base for the next three.",
  "2인가? 이것만 비교해도 충분한거야?":
    "is it 2? is comparing just this enough?",
  "3 cows: Bessie, Elsie, Mildred, 시작 우유량 7":
    "3 cows: Bessie, Elsie, Mildred, all starting at 7 milk",
  "3 — Longest Substring Without Repeating Characters. 같은 글자가 두 번 안 나오는 가장 긴 연속 구간의 길이를 구하세요.":
    "3 - Longest Substring Without Repeating Characters. Find the length of the longest run with no repeated letter.",
  "303 — Range Sum Query - Immutable. sumRange(left, right) 쿼리에 답하는 NumArray 클래스 만들기. 배열은 안 변해요 — 근데 쿼리가 최대 10^4 번 호출될 수 있어요.":
    "303 - Range Sum Query - Immutable. Build a NumArray class that answers sumRange(left, right). The array never changes - but the query can be called up to 10^4 times.",
  "303 에서 열리는 마법이에요.":
    "that is the magic 303 unlocks.",
  "560 — Subarray Sum Equals K. 합이 정확히 k 인 연속 부분 배열의 개수를 세세요.":
    "560 - Subarray Sum Equals K. Count the runs whose sum is exactly k.",
  "560 과 구조 동일 — (prefix − k) 조회 대신 prefix % k 조회. 시간/공간 O(n).":
    "same shape as 560 - look up prefix % k instead of (prefix - k). O(n) time and space.",
  "560 과 핵심 차이: 고정 목표값이 아님 — k 의 배수면 모두 해당. 다른 인사이트가 필요해요.":
    "the key difference from 560: there is no single target - any multiple of k counts. It needs a different insight.",
  "8 lines: 3 행 + 3 열 + 2 대각선":
    "8 lines: 3 rows + 3 columns + 2 diagonals",
  "974 — Subarray Sums Divisible by K. 합이 k 로 나누어 떨어지는 부분 배열 개수. 이건 #560 의 변형: sum = k 대신 sum % k = 0 이에요.":
    "974 - Subarray Sums Divisible by K. Count the subarrays whose sum divides by k. A twist on #560: sum % k = 0 instead of sum = k.",
  "= 역방향으로 BFS 했을 때 모든 노드에 도달 가능한 곳":
    "= a spot whose reverse BFS reaches every node",
  "B 에 최소 비용 도착 — 끝":
    "reached B at the lowest cost - done",
  "DP: dp[c] = day i 에서 counter 가 c 일 때 min/max breakout":
    "DP: dp[c] = the min/max breakouts when the counter is c on day i",
  "DP: dp_min[c] = day i 에서 counter 가 c 일 때의 최소 breakout 횟수":
    "DP: dp_min[c] = the fewest breakouts when the counter is c on day i",
  "K = 1, 2, ... 차례로 시도":
    "try K = 1, 2, ... in order",
  "P[t] = 지금까지 부분집합들의 (합)^t 합 (공집합 포함)":
    "P[t] = the sum of (subset sum)^t over the subsets so far (the empty set included)",
  "a 를 넣은 부분집합의 기여":
    "what the subsets that include a contribute",
  "a+b 상위 m-1개":
    "the top m-1 by a+b",
  "a[0] 를 1..N 다 시도, a[i+1] = b[i] - a[i]":
    "try every a[0] from 1..N, then a[i+1] = b[i] - a[i]",
  "a[0] 를 1..N 다 시도, a[i+1] = b[i] - a[i] 로 사슬 만들기":
    "try every a[0] from 1..N and build the chain with a[i+1] = b[i] - a[i]",
  "arrival 기준 정렬 (parallel sort)":
    "sort by arrival (parallel sort)",
  "arrival 순으로 처리, gate 가 비어 있으면 기다림":
    "handle them in arrival order; if the gate is busy, wait",
  "cB × cA).\n앞에서 본 환전 세기 그대로예요.":
    "cB x cA).\nthe same swap counting we saw earlier.",
  "day 기준 정렬 (parallel sort via indices)":
    "sort by day (parallel sort via indices)",
  "day 기준 정렬 — parallel sort via triple list":
    "sort by day - parallel sort via a list of triples",
  "i 가 항상 앞 (= K) 이거나 항상 뒤 (= 0)":
    "i is always in front (= K) or always behind (= 0)",
  "include <algorithm> 필요.":
    "you need include <algorithm>.",
  "include 는 배운 헤더들로 (iostream, string) 나눠 적어.":
    "include only the headers we learned (iostream, string), one per line.",
  "include 는 배운 헤더들로 (iostream, string, map, algorithm) 나눠 적어.":
    "include only the headers we learned (iostream, string, map, algorithm), one per line.",
  "include 는 배운 헤더들로 (iostream, vector, set, algorithm) 나눠 적어.":
    "include only the headers we learned (iostream, vector, set, algorithm), one per line.",
  "include 는 배운 헤더들로 (iostream, vector, string, map) 나눠 적어.":
    "include only the headers we learned (iostream, vector, string, map), one per line.",
  "include 는 배운 헤더만 (iostream, string) — bits/stdc++.h 안 써.":
    "include only the headers we learned (iostream, string) - no bits/stdc++.h.",
  "include 는 이 코드에 필요한 헤더들로 (iostream, vector, queue, tuple) 나눠 적어.":
    "include just the headers this code needs (iostream, vector, queue, tuple), one per line.",
  "k = 옮겨야 할 소의 수":
    "k = how many cows we have to move",
  "k = 옮겨야 할 소의 수 (앞쪽 0..k-1)":
    "k = how many cows we have to move (the front ones, 0..k-1)",
  "k번 반복":
    "repeat k times",
  "n = 4 스택":
    "n = 4 stacks",
  "name K trait1 trait2 ... traitK (한 줄)":
    "name K trait1 trait2 ... traitK (one line)",
  "order-K 골짜기":
    "an order-K valley",
  "order-K 봉우리":
    "an order-K peak",
  "rank[s][c] = 세션 s 에서 소 c 가 몇 등인지 (0-based)":
    "rank[s][c] = what place cow c took in session s (0-based)",
  "rank[s][c] = 세션 s 에서 소 c 의 순위 (0-based)":
    "rank[s][c] = cow c's place in session s (0-based)",
  "s) 는 양수 올림나눗셈 파이썬 관용구예요; num // s 는 이미 −∞ 방향으로 내림해요.":
    "s) is the Python idiom for rounding up when the numbers are positive; num // s already rounds down toward -infinity.",
  "set 은 정렬됨":
    "a set keeps them sorted",
  "shuffle: i 번째 위치 → 어디로 가는지 (1-indexed → 0-indexed 변환)":
    "shuffle: where position i goes (converted from 1-indexed to 0-indexed)",
  "shuffle: 위치 i 에 있던 cow 가 shuffle[i] 위치로 감":
    "shuffle: the cow at position i moves to position shuffle[i]",
  "top 다시 찾기":
    "find the top again",
  "x op y == z 인가?  (나눗셈은 x / y == z  ⟺  x == y * z 로 확인)":
    "is x op y == z ?  (for division check x == y * z instead of x / y == z)",
  "x 이하 최대":
    "the largest one that is at most x",
  "{1, 2, 3} → (H, P, S) 6 가지 순열":
    "{1, 2, 3} -> the 6 ways to map onto (H, P, S)",
  "{1, 2, 3} 을 (Hoof, Paper, Scissors) 에 배정하는 6 가지 순열":
    "the 6 ways to assign {1, 2, 3} to (Hoof, Paper, Scissors)",
  "① 격자 안에 들어가나":
    "(1) does it fit inside the grid",
  "② 한 방향을 끝까지 꽉 채우나":
    "(2) does it fill one direction all the way",
  "각 gap 에 새 cow 몇 마리 넣을 수 있는지":
    "how many new cows fit in each gap",
  "각 lifeguard 의 (start, end)":
    "each lifeguard's (start, end)",
  "각 swap: (a, b, g) — a 와 b 컵 바꾸고 g 컵 추측":
    "each swap: (a, b, g) - swap cups a and b, then guess cup g",
  "각 관찰: (cow, side)":
    "each sighting: (cow, side)",
  "각 글자 (a-z) 마다 필요한 블록 수 계산":
    "work out how many blocks each letter (a-z) needs",
  "각 글자마다 max(front, back) 누적":
    "add up max(front, back) for each letter",
  "각 동물의 특성 set":
    "each animal's set of traits",
  "각 변화 (day, name, delta)":
    "each change as (day, name, delta)",
  "각 소의 (start, end, buckets) — sweep line 으로 동시에 필요한 최대 buckets":
    "each cow's (start, end, buckets) - a sweep line gives the most buckets needed at once",
  "각 소의 우유 총합 초기화":
    "start every cow's milk total at zero",
  "각 순열마다 cow1 이 이긴 게임 수 세기":
    "for each permutation, count the games cow1 wins",
  "각 원소를":
    "take each element",
  "각 위치 j 마다 spotted 와 plain 글자가 안 겹치는 위치 수":
    "count the spots j where the spotted and plain letters never overlap",
  "각 위치 j 마다 spotted 와 plain 의 글자가 한 번도 안 겹치는 위치 수":
    "count the spots j where no spotted letter ever equals a plain letter",
  "각 집단은 특성 set":
    "each population is a set of traits",
  "각 집단은 한 줄: K char1 char2 ... charK":
    "each population is one line: K char1 char2 ... charK",
  "각 후보 노드에 대해 역방향 BFS, 모든 노드 도달 가능하면 답":
    "run a reverse BFS from each candidate; if it reaches every node, that is the answer",
  "경계마다 넘겨야 하는 구슬 = D 의 누적(prefix). 답 = 그 |누적| 의 합.":
    "the marbles that must cross each border are the running sum of D. the answer is the sum of those absolute values.",
  "공통 글자 있나 확인":
    "check whether they share a letter",
  "그 합":
    "their sum",
  "눕혀서 놓는 것도 허용":
    "you may lay it on its side too",
  "두 글자 정렬한 \"AB\" 형태":
    "the two letters sorted into an \"AB\" string",
  "두 글자 정렬해서 tuple 로 (frozenset 대신)":
    "the two letters sorted into a tuple (instead of a frozenset)",
  "두 다리 길이 곱 = 2 * 삼각형 넓이 (문제가 2배 넓이를 요구)":
    "the two legs multiplied = 2 * the area (the problem asks for twice the area)",
  "두 다리(leg) 길이 곱 = 2 * 삼각형 넓이 (문제가 2배 넓이를 정수로 요구)":
    "the two legs multiplied = 2 * the area (the problem wants twice the area as a whole number)",
  "두 동물에 대해 공통 특성 수 + 1":
    "for two animals, the number of shared traits + 1",
  "두 동물에 대해 공통 특성 수 + 1 (한 개 차이 나는 질문)":
    "for two animals, the shared traits + 1 (the question that tells them apart)",
  "두 번째로 적은 우유량 찾기":
    "find the second smallest milk amount",
  "두 번째로 적은 우유량 찾기 — 가장 적은 것 + 그 다음":
    "find the second smallest milk amount - the smallest, then the next one",
  "두 사각형의 교집합 면적":
    "the area where the two rectangles overlap",
  "두 직사각형 좌표":
    "the two rectangles' coordinates",
  "두 직사각형을 모두 덮는 bounding box":
    "the bounding box that covers both rectangles",
  "마지막 라운드부터 거꾸로 되돌려요":
    "undo it backwards, starting from the last round",
  "만든 사슬이 1..N 의 순열이면 정답":
    "if the chain you built is a permutation of 1..N, it is the answer",
  "먹을 수 있는 적 (max-heap)":
    "the enemies you can eat (max-heap)",
  "먹을 수 있는 적 (max-heap: -값 저장)":
    "the enemies you can eat (max-heap: store the negative values)",
  "목표 − 지금 (+안전)":
    "target - what you have now (plus the safety margin)",
  "세 x 좌표 중 둘은 같아요. 짝 없는 하나가 답이에요.":
    "two of the three x values are equal. the unpaired one is the answer.",
  "소1 의 gesture (1/2/3)":
    "cow 1's gesture (1/2/3)",
  "소2 의 gesture":
    "cow 2's gesture",
  "시작 위치 1, 2, 3 다 시도해서 최대 점수":
    "try starting at 1, 2 and 3 and take the best score",
  "시작 위치 1, 2, 3 다 시도해서 최대 점수 찾기":
    "try starting at 1, 2 and 3 and find the best score",
  "알고 있는 x 좌표 셋":
    "the x values we already know",
  "알고 있는 y 좌표 셋":
    "the y values we already know",
  "앞에서 m 명만 선물을 받음":
    "only the first m in line get a gift",
  "앞쪽 a+b 상위 m-1개":
    "the top m-1 by a+b from the front",
  "어느 면이 보여도 spell 가능해야 하므로":
    "it has to spell the word no matter which side shows",
  "어떤 집단은 a 만, 어떤 집단은 b 만, 어떤 집단은 a 와 b 둘 다":
    "some populations have only a, some only b, and some have both",
  "어떤 집단은 a 만, 어떤 집단은 b 만, 어떤 집단은 a 와 b 둘 다 가짐":
    "some populations have only a, some only b, and some have both a and b",
  "여기가 −1":
    "this is where the -1 comes from",
  "오른쪽 방향은 뒤에서부터 똑같이":
    "do the right side the same way, starting from the back",
  "오른쪽 아래부터 왼쪽 위로 처리: 1 이면 (0,0)-(i,j) 직사각형 toggle":
    "go from the bottom right to the top left: if it is 1, toggle the rectangle (0,0)-(i,j)",
  "오른쪽 아래부터 왼쪽 위로: 1 이면 (0,0)-(i,j) 직사각형 toggle":
    "from the bottom right to the top left: if it is 1, toggle the rectangle (0,0)-(i,j)",
  "왼쪽으로 계속 내려가는 길이 / 계속 올라가는 길이":
    "how far it keeps going down to the left / how far it keeps going up",
  "원소 0개 = 공집합만":
    "zero elements = only the empty set",
  "음절 하나가 끝났어요":
    "one syllable is finished",
  "이미 더 좋은 값으로 처리된 칸":
    "a cell we already settled with a better value",
  "이웃이 이미 쓴 색 모으기":
    "collect the colors the neighbors already used",
  "이항계수 C[t][j]":
    "the binomial coefficient C[t][j]",
  "이항계수 C[t][j] 미리 계산 (파스칼의 삼각형)":
    "work out the binomial coefficients C[t][j] first (Pascal's triangle)",
  "인덱스 0 = 'a', 25 = 'z'":
    "index 0 = 'a', 25 = 'z'",
  "인터랙션 (t, a, b) 읽고 시간순 정렬":
    "read the interactions (t, a, b) and sort them by time",
  "전이: counter c → c+1 (no break) 또는 counter * → 0 (break, +1)":
    "moves: counter c -> c+1 (no break), or counter * -> 0 (a break, +1)",
  "정답":
    "the answer",
  "정사각형 한 변 = 가로/세로 범위 중 큰 값":
    "the square's side = the larger of the width and the height",
  "정점마다 빈 목록 하나씩":
    "one empty list per vertex",
  "중복 제거":
    "drop the duplicates",
  "지금 먹을 수 있는 적 넣기":
    "put in the enemies you can eat right now",
  "직접 가는 거리":
    "the distance if you just walk there",
  "출발 칸 인구도 비용에 포함":
    "the starting cell's population counts toward the cost too",
  "테스트 케이스 개수":
    "how many test cases",
  "텔레포터 사용 반대 방향: a→y, teleport to x, x→b":
    "using the teleporter the other way: a->y, teleport to x, x->b",
  "텔레포터 사용: a→x, teleport to y, y→b":
    "using the teleporter: a->x, teleport to y, y->b",
  "튜플은 앞에서부터 비교 → 티어가 먼저, 같으면 번호가 작은 사람이 먼저.":
    "tuples compare from the front, so the tier decides first, and a tie goes to the smaller number.",
  "파워 오름차순":
    "sorted by power ascending",
  "한 마리만 잘못 배치된 경우, 인접 swap 횟수 = diff - 1":
    "when only one cow is out of place, the number of neighbor swaps is diff - 1",
  "한 명 제외해보고 sweep line 으로 union coverage 계산, 최댓값":
    "drop one lifeguard, sweep-line the covered time, and take the best",
  "한 명 제외해보고 sweep line 으로 union coverage 계산, 최댓값 출력":
    "drop one lifeguard, sweep-line the covered time, and print the best",
  "합을 맨 앞에 둬요 — 그러면 그냥 정렬해도 합 기준으로 줄이 서요":
    "put the sum first - then a plain sort lines them up by the sum",
  "합이 큰 것부터":
    "biggest sum first",

  /* buymilk — 2026-09-17 변수 이름·주석을 학생이 읽게 고치면서 같이 넣었다 */
  "거래 개수 N, 물음 개수 Q":
    "N deals, Q questions",
  "deal_price[i] = i 번 거래의 가격.":
    "deal_price[i] = the price of deal i.",
  "dealPrice[i] = i 번 거래의 가격.":
    "dealPrice[i] = the price of deal i.",
  "i 번 거래는 1 통을 i 번 두 배 한 만큼을 준다 — 1, 2, 4, 8, ...":
    "deal i gives 1 bucket doubled i times - 1, 2, 4, 8, ...",
  "block_cost[i] = 2^i 통짜리 묶음을 얻는 가장 싼 값.":
    "block_cost[i] = the cheapest way to get a block of 2^i buckets.",
  "blockCost[i] = 2^i 통짜리 묶음을 얻는 가장 싼 값.":
    "blockCost[i] = the cheapest way to get a block of 2^i buckets.",
  "거래를 그대로 사거나, 절반짜리 묶음을 두 번 사거나 — 둘 중 싼 쪽이다.":
    "buy that deal, or buy the half-size block twice - whichever is cheaper",
  "이렇게 해 두면 큰 묶음이 한 통당 손해인 경우가 없어서":
    "after this a bigger block is never worse per bucket,",
  "큰 묶음부터 한 번만 훑으면 되고 재귀가 필요 없다.":
    "so one big-to-small sweep is enough and no recursion is needed.",
  "blockSize[i] = i 번 묶음이 몇 통인지. 1 에서 시작해 계속 두 배다.":
    "blockSize[i] = how many buckets block i holds. Start at 1 and keep doubling.",
  "C++ 에는 ** 가 없어서 표를 한 번 만들어 두고 쓴다.":
    "C++ has no ** operator, so we build the table once and reuse it.",
  "'아직 아무것도 못 찾았다' 는 표시":
    "means 'nothing found yet'",
  "이번 물음에서 사야 할 통 수":
    "buckets we must buy this time",
  "지금까지 찾은 가장 싼 값":
    "cheapest total found so far",
  "여기까지 확정으로 낸 값":
    "cost locked in so far",
  "아직 못 채운 통 수":
    "buckets still to cover",
  "want 는 많아야 10억이다. 2 를 30번 곱하면 1,073,741,824 라 벌써 넘는다.":
    "want is at most 1,000,000,000. Doubling 30 times already passes it: 1,073,741,824.",
  "그래서 30번 묶음보다 큰 것은 볼 필요가 없다.":
    "so blocks past number 30 never need looking at",
  "(A) 이 묶음으로 넉넉히 사고 끝내기":
    "(A) buy enough with this block and stop",
  "올림 나눗셈":
    "round up",
  "(B) 모자라게 사고, 남은 통은 더 작은 묶음에 맡기기":
    "(B) buy less here, leave the rest to smaller blocks",
  "딱 맞게 산 경우도 후보다":
    "covering it exactly is also a candidate",

  /* 2026-09-17 — 코드 주석을 한국어로 옮기면서 생긴 짝.
     ⚠️ 영어 쪽은 **옛 판의 원문 그대로**다. 지어낸 번역이 아니라 git 에서 꺼냈다. */
  "'(' 가 모두 ')' 보다 앞에 있어서":
    "Since all '(' come before all ')',",
  "'(' 마다 뒤에 있는 ')' 와 짝을 지어요":
    "Each '(' must pair with a ')' AFTER it.",
  "'X는 Y의 직전/직후 <동물> 해에 태어났다' 형식이에요":
    "'born in <prev/next> <Animal> year from <name>'",
  "(c+1)/2 는 ceil(c/2) 예요":
    "(c+1)/2 = ceil(c/2)",
  "(perm 을 처음 배열이 될 때까지 적용해요)":
    "(apply perm until we get identity)",
  "0,0 쌍":
    "pair 0,0",
  "0,1 / 1,0 쌍":
    "pair 0,1 / 1,0",
  "0~L 중 F + s*d 가 k 이상인 정수 d 는 몇 개?":
    "how many integers d in 0..L have F + s*d >= k?",
  "0번 자리가 맨 위":
    "index 0 = top",
  "0부터 시작하는 인덱스로 바꿔요":
    "0-indexed",
  "1,1 쌍":
    "pair 1,1",
  "1. 누적합 리스트":
    "1. prefix-sum list",
  "1부터 시작하는 인덱스로 출력해요":
    "Output 1-indexed",
  "2 번째로 비싼 것":
    "2nd most expensive",
  "2 번째로 비싼 것 -> 지불":
    "2nd most expensive -> pay",
  "2. 차이가 k 인 쌍 세기":
    "2. count pairs that differ by k",
  "2^k (k 가 1e18 까지!)":
    "2^k  (k up to 1e18!)",
  "2^k (k 가 1e18 까지)":
    "2^k  (k up to 1e18)",
  "3 번째로 비싼 것 -> 무료":
    "3rd most expensive -> FREE",
  "A/B 는 오른쪽으로 자라요 → 가로가 두 배":
    "A / B grow RIGHT -> width doubles",
  "A[i] != B[i] 인 연속 구간 개수를 세요":
    "Count contiguous blocks where A[i] != B[i]",
  "A[i] 보다 작은 값들의 L_(k-1) 합":
    "sum of L_{k-1} over < A[i]",
  "A[i] 보다 큰 값들의 합":
    "sum over > A[i]",
  "A[i] 앞 작은 값 (L) / 뒤 큰 값 (R)":
    "< A[i] before i (L) / > after (R)",
  "B 가 이 복사본을 좌우로 뒤집었어요":
    "B flipped this copy horizontally",
  "Bessie 의 출생 연도 (상대값)":
    "Bessie's birth year (relative)",
  "C 가 이 복사본을 위아래로 뒤집었어요":
    "C flipped this copy vertically",
  "C 는 아래로 자라요 → 세로가 두 배":
    "C grows DOWN -> height doubles",
  "C는 (A+B+C) - A - B 로 구해요":
    "C = (A+B+C) - A - B",
  "K mod 순환 길이가 실제 라운드 수예요":
    "K mod cycle gives effective rounds",
  "K 를 0부터 T까지 다 시도해요":
    "Try each K from 0 to T",
  "K 제약을 더한 다익스트라":
    "Dijkstra with K constraint",
  "L_k: 왼쪽 체인을 한 칸 늘려요, 더 작은 값, 더 앞 인덱스":
    "L_k: extend left chains by one, smaller value, earlier index",
  "L_k[i] = 길이 k 증가 부분수열의 개수":
    "L_k[i] = # incr subseqs of length k",
  "N 글자, S 두루마리, Q 친구":
    "N letters, S scrolls, Q friends",
  "N 단계마다 격자 가로/세로 (두 배씩, 한계값에서 멈춤)":
    "grid width / height after each of the N steps (doubling, but capped)",
  "N개의 여는 괄호, M개의 닫는 괄호예요":
    "N opening brackets, M closing brackets",
  "R 은 건강한 소와 가장 가까운 아픈 소 사이 거리보다 작아야 해요":
    "R must be < min distance from any healthy to nearest sick",
  "R_k: 오른쪽에서 같은 방식, 더 큰 값, 더 뒤 인덱스":
    "R_k: same idea from the right, larger value, later index",
  "a 를 두 번 붙여요":
    "a + a",
  "a+b 가 큰 쌍부터 오도록 정렬해요":
    "sort so the biggest a+b pairs come first",
  "adj[x] = x 다음에 올 수 있는 단어들이에요.":
    "adj[x] = the words allowed right after x.",
  "b 가 a 를 돌린 것인지 확인해요":
    "Check if b is a rotation of a",
  "b 는 a 를 돌린 것이에요":
    "b appears as a subarray in a + a",
  "best 가 답이에요":
    "best is the answer",
  "ceil(c/2) 자리로 0 을 채우고 앞자리부터 오게 뒤집어요":
    "left-pad to ceil(c/2) digits, then most-significant first",
  "count 가 정답이에요":
    "count is the answer",
  "diff == 2 면 U턴, diff == 0 이면 직진이에요":
    "diff == 2 means U-turn, diff == 0 means straight",
  "i 번째 창문이 b 와 같은지":
    "does the window at i match b?",
  "i 부터 쓴 글자들":
    "letters used from i",
  "k번 변신한 뒤 이웃 쌍의 beauty 는":
    "after k transforms, one adjacent pair's beauty depends",
  "obj.sumRange(0, 2)  →  1   (O(1) 로 바로 찾아요!)":
    "obj.sumRange(0, 2)  →  1   (O(1) lookup!)",
  "perm[l..r] 을 뒤집어요":
    "Reverse perm[l..r]",
  "prefix[i] 는 nums[0..i-1] 의 합이에요":
    "prefix[i] = sum(nums[0..i-1])",
  "r 을 K 진법으로 적어요 -> 앞 절반 (아래 자리부터)":
    "write r in base K -> the front half (least digit first)",
  "r 을 k 진법으로 적어요 -> 앞 절반 (아래 자리부터)":
    "write r in base k -> the front half (least digit first)",
  "suffix_max: i 일부터 끝까지 중 가장 비싼 가격":
    "Suffix maximum: best future price from day i onward",
  "target 과 그 위 모두 영영 사라져요":
    "target + everything above: gone forever",
  "target 과 그 위가 사라져요":
    "target + above gone",
  "target 과 그 위에 있는 것 모두 영영 사라져요":
    "target + everything above it: gone forever",
  "target 을 스택에서 치워요 (꺼낸 거예요)":
    "Remove target from stack (it's taken out)",
  "target 의 스택 안 위치를 찾아요":
    "Find position of target in stack",
  "turn 0,2,4,... 는 Evirir (+a) / turn 1,3,5,... 는 Rhae (-b)":
    "turn 0,2,4,... = Evirir (+a) / turn 1,3,5,... = Rhae (-b)",
  "{누적합 값 : 몇 번}":
    "{prefix value: how many times}",
  "가로 방향 이웃 (같은 y, 다른 x)":
    "horizontal neighbors (same y, different x)",
  "가장 긴 균형 부분수열을 구해요":
    "the string '(' * N + ')' * M",
  "가장 작은 값이 A, 두 번째로 작은 값이 B, 가장 큰 값이 A+B+C예요":
    "smallest is A, second smallest is B, largest is A+B+C",
  "가장 작은 수가 A예요 (A <= B <= C 라서)":
    "The smallest number is A (since A <= B <= C)",
  "가장 큰 번호보다 조금 큰 한계값":
    "just above the biggest index",
  "가장 큰 수가 A+B+C예요":
    "The largest number is A+B+C",
  "각 점을 직각 꼭짓점으로 두고 봐요":
    "For each point as the right-angle vertex",
  "각 주장을 필요한 타입으로 바꿔요":
    "decode each claim to the type it DEMANDS,",
  "간격이 max_R 보다 큰 곳마다 클러스터를 세요":
    "Count clusters of sick cows with gaps > max_R",
  "값은 'previous' 또는 'next'":
    "'previous' or 'next'",
  "값을 1..m 등수로 눌러 담아요":
    "compress values to ranks 1..m",
  "값을 1..m 등수로 눌러 담아요 (A_i 는 최대 1e9)":
    "compress values to ranks 1..m (A_i up to 1e9)",
  "같은 구간 안에서 +D 씩 계속 옮겨요":
    "then keep stepping +D inside the same interval",
  "거짓말쟁이는 뒤집어요":
    "liar: flip the claim",
  "건강한 소들로부터 가장 큰 R 을 구해요":
    "Find max R from healthy cows",
  "검사 ①: 모든 단어가 5개 중 하나여야 해요":
    "check ①: every word must be one of the 5 valid words",
  "검사 ②: 이웃한 쌍마다 화살표가 있어야 해요":
    "check ②: every consecutive pair must have an arrow",
  "겹치면 → 멈춤":
    "repeat → stop",
  "균형 부분수열 = min(N, M) 쌍":
    "Balanced = min(N, M) pairs = 2 * min(N, M)",
  "그 위에 있는 선물을 모두 치워야 해요":
    "Must remove all presents above it",
  "그리디: 각 구간에서 last+D 자리(또는 구간 시작)에 놓고,":
    "greedy: in each interval, place at last+D (or interval start),",
  "글자 -> 마지막으로 본 자리":
    "letter -> last index",
  "길이 c 안에서 0 부터 센 순위 r 을 구해요":
    "find the 0-indexed rank r inside length c",
  "길이 l 짜리 회문 개수는 K^ceil(l/2) 예요":
    "count of length-l palindromes = K^ceil(l/2)",
  "길이 l 짜리 회문 개수는 k ** ceil(l/2) 예요":
    "count of length-l palindromes = k ** ceil(l/2)",
  "길이를 늘리며 개수를 더해 N 에 닿을 때까지 가요":
    "walk lengths, adding counts, until we reach N",
  "길이를 늘리며 개수를 더해 n 에 닿을 때까지 가요":
    "walk lengths, adding counts, until we reach n",
  "꺾이는 점들을 훑으며 기울기 s 와 밝기 F 를 갱신해요":
    "sweep the breakpoints, tracking slope s and brightness F",
  "남은 것 중 제일 싼 것":
    "cheapest remaining",
  "남은 것 중 제일 싼 것 -> 지불":
    "cheapest remaining -> pay",
  "내림세: d <= floor((k-F)/s) 필요":
    "falling: need d <= floor((k-F)/s)",
  "내림세: d <= floor(num/s)":
    "falling: d <= floor(num/s)",
  "누적":
    "accumulate",
  "눌러 담은 값 위에 펜윅 트리(BIT) 를 만들어요":
    "Fenwick (BIT) over compressed values",
  "단계마다 격자 가로/세로 (두 배씩, 한계값에서 멈춤)":
    "grid width / height after each step (doubling, but capped)",
  "답 D 를 이분 탐색해요":
    "binary search the answer D",
  "두 번째로 작은 수가 B예요":
    "The second smallest is B",
  "두루마리를 거꾸로 따라가요":
    "walk the scroll BACKWARD",
  "램프 하나는 텐트: p-b 에서 +1, 꼭짓점 p 에서 -2, p+b 에서 +1":
    "each lamp is a tent: +1 at p-b, -2 at the peak p, +1 at p+b",
  "램프 하나는 텐트: p-b 에서 기울기 +1, 꼭짓점 p 에서 -2, p+b 에서 +1":
    "each lamp is a tent: slope +1 at p-b, -2 at the peak p, +1 at p+b",
  "레벨 0: 원소 하나하나가 길이 1 부분수열이에요":
    "level 0: every element is its own length-1 subseq",
  "리스트는 이미 정렬돼 있어요 (오름차순)":
    "List is already sorted (non-decreasing)",
  "마지막 감염 상태":
    "final infected",
  "매일 코인 1 개씩 벌어요":
    "earn 1 coin per day",
  "맨 위부터 0 부터 센 위치":
    "0-based position from top",
  "맨 위부터 하나씩 훑어요":
    "linear scan from top",
  "모든 왕복 결과를 모아 큰 것부터 K개를 더해요":
    "Build the list of all possible per-trip yields, then take the K largest.",
  "묶음마다":
    "each stack →",
  "문법은 고정이에요 — 문제에 주어지고 입력으로 읽지 않아요.":
    "The grammar is FIXED — given in the problem, not read from input.",
  "문자열 '(' * N + ')' * M 에서":
    "But we need longest balanced subsequence of",
  "문자열은 '(' N개 다음 ')' M개, 순서가 고정이에요":
    "Insight: string is N '(' followed by M ')' — order is fixed.",
  "반복 적용으로 순환 길이를 찾아요":
    "Find cycle length by repeated application",
  "방향 번호: N=0, E=1, S=2, W=3":
    "Direction mapping: N=0, E=1, S=2, W=3",
  "번호 → (행, 열)":
    "1-D number -> (row, col)",
  "빈 누계의 나머지는 0":
    "empty prefix has remainder 0",
  "빈 누적합":
    "empty prefix",
  "세로 방향 이웃 (같은 x, 다른 y)":
    "vertical neighbors (same x, different y)",
  "소 N 마리를 이웃 간격 D 이상으로 다 놓을 수 있나?":
    "can we place all N cows so neighbors are >= D apart?",
  "소마다 환자 제로로 놓고 시도해요":
    "Try each cow as patient zero",
  "십이지 동물 순서 (12년 주기)":
    "Zodiac animals in order (12-year cycle)",
  "쌍의 종류만으로 정해져요 — 큰 문자열을 만들 필요가 없어요":
    "ONLY on the pair type — no need to build the huge string",
  "아래쪽 복사본 쪽인가?":
    "in the copied BOTTOM half?",
  "앞 절반을 거울 대칭해 회문 문자열을 완성해요":
    "mirror the front half to build the palindrome string",
  "없는 키 → 0":
    "missing key → 0",
  "예시:":
    "Example:",
  "옛 글자 다음으로 점프":
    "jump past old copy",
  "오늘이 최고가면 코인을 전부 팔아요":
    "Sell all coins if today's price >= all future prices",
  "오른쪽 복사본 쪽인가?":
    "in the copied RIGHT half?",
  "오름세: d >= ceil((k-F)/s) 필요":
    "rising: need d >= ceil((k-F)/s)",
  "오름세: d >= ceil(num/s)":
    "rising: d >= ceil(num/s)",
  "오름차순":
    "ascending",
  "옮긴 횟수":
    "handshakes used",
  "요청마다 찾을 선물을 정해요":
    "For each query: which present to find",
  "위에 있는 선물 pos 개를 치워야 해요 (0부터 pos-1 까지)":
    "Must remove pos presents above it (0-indexed: remove 0..pos-1)",
  "위에 있는 선물 수 = pos":
    "presents above = pos",
  "위에서 아래 순서":
    "top to bottom",
  "위치 i, i+1 사이 쌍은 부분문자열 i*(n-i) 개에 들어가요":
    "the pair joining positions i, i+1 sits inside i*(n-i) substrings",
  "입력 예: \"Mildred born in previous Cow year from Bessie\"":
    "\"Mildred born in previous Cow year from Bessie\"",
  "작은 것 -> 큰 것 순서라 back() 이 제일 비싸고 front() 가 제일 싸요":
    "small -> big, so back() is most expensive, front() is cheapest",
  "잘 알려진 방법: b 가 a+a 안에 있으면":
    "Classic trick: b is rotation of a iff",
  "점들을 x좌표와 y좌표로 묶어요":
    "Group points by x-coordinate and y-coordinate",
  "제일 비싼 것":
    "most expensive",
  "제일 비싼 것 -> 지불":
    "most expensive  -> pay",
  "지금 연도의 동물이에요":
    "current animal at year",
  "진실쟁이는 그대로":
    "truth-teller: claim as-is",
  "짝수 묶음은 자유롭게 뒤집을 수 있어요 → |D| 를 가져가요":
    "even stacks can flip freely → take |D|",
  "창문 끝":
    "window end",
  "창문 시작":
    "window start",
  "최대 짝 수는 min(N, M), 한 쌍은 2 글자예요":
    "Maximum balanced pairs = min(N, M); each pair = 2 chars",
  "최댓값은 2 * min(N, M) 이에요":
    "max balanced = 2 * min(N, M)",
  "출력":
    "Output",
  "토막 끝":
    "subarray end",
  "토막 시작":
    "subarray start",
  "토큰: 이름 \"born\" \"in\" 방향 동물 \"year\" \"from\" 다른이름":
    "Tokens: name \"born\" \"in\" direction Animal \"year\" \"from\" otherName",
  "파이썬 // 처럼 음의 무한대 방향으로 내려 잡는 나눗셈":
    "floor division rounding toward -infinity (like Python //)",
  "평평함: 모든 칸이 F":
    "flat: every point equals F",
  "필요한 T 와 있는 T 를 비교해요":
    "then compare demand for T with supply of T",
  "한 라운드의 순열을 만들어요":
    "Build permutation for one round",
  "한 번 왕복마다 M 과 벌집에 남은 꿀 중 작은 값을 가져와요":
    "Each trip to a hive collects min(M, remaining honey).",
  "한 줄을 읽어 숫자로 나눠요":
    "Read one line and split it into integers",
  "홀수 묶음은 부호가 번갈아요 → 정렬해서 위쪽 절반에 +":
    "odd stacks alternate sign → sort, + to the top half",
  "홀수 묶음이 없으면 → 부호가 정해져요, D 를 그대로 더해요":
    "no odd stack → signs forced, sum D directly",

  /* 2026-09-17 (2) — 표에 없던 한국어 주석을 마저 채웠다. 없으면 영어 화면에서 그 줄이 빈다. */
  "560 과 가장 다른 점이에요. 목표값이 하나로 정해진 게 아니라 k 의 배수면 모두 해당돼요. 그래서 '이 값을 본 적 있나' 하고 하나만 찾아볼 수가 없어요. 새로운 생각이 필요해요.":
    "the big difference from 560: the target is not one number - any multiple of k counts. So you cannot look up a single value. A new idea is needed.",
  "560 과 구조가 같고 prefix % k 를 찾아보는 것만 달라요.":
    "same shape as 560, except we look up prefix % k instead.",
  "include <algorithm> 이 있어야 해요.":
    "you need include <algorithm> here.",
  "include 는 배운 것들로 (iostream, vector, string) 나눠 적어요.":
    "include the ones we have learned, one per line: iostream, vector, string.",
  "include 는 배운 것들로 (iostream, vector, string, set) 나눠 적어요.":
    "include the ones we have learned, one per line: iostream, vector, string, set.",
  "include 는 배운 것만 써요 (iostream, string). bits/stdc++.h 는 안 써요.":
    "include only what we have learned: iostream, string. We do not use bits/stdc++.h.",
  "include 는 배운 헤더 (iostream, vector, algorithm) 로 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, vector, algorithm.",
  "include 는 배운 헤더(iostream, string)를 하나씩 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, string.",
  "include 는 배운 헤더(iostream, vector, algorithm)를 하나씩 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, vector, algorithm.",
  "include 는 배운 헤더(iostream, vector, string)만 하나씩 나눠 적어요.":
    "include only the headers we have learned, one per line: iostream, vector, string.",
  "include 는 배운 헤더(iostream, vector, string, map)만 하나씩 나눠 적어요.":
    "include only the headers we have learned, one per line: iostream, vector, string, map.",
  "include 는 배운 헤더(iostream, vector, string, set)를 하나씩 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, vector, string, set.",
  "include 는 배운 헤더들로 (iostream, vector) 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, vector.",
  "include 는 배운 헤더로 (iostream, string, map, algorithm) 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, string, map, algorithm.",
  "include 는 배운 헤더로 (iostream, vector) 나눠 적어요.":
    "include the headers we have learned, one per line: iostream, vector.",
  "include 는 배운 헤더로 하나씩 나눠 적어요 (iostream, vector, algorithm).":
    "include the headers we have learned, one per line: iostream, vector, algorithm.",
  "include 는 배운 헤더를 한 줄에 하나씩 적어요 — iostream, vector, algorithm.":
    "include the headers we have learned, one per line - iostream, vector, algorithm.",
  "include 는 배운 헤더만 (iostream, vector, set, algorithm) 하나씩 적어요.":
    "include only the headers we have learned, one per line: iostream, vector, set, algorithm.",
  "include 는 이 코드에 필요한 헤더(iostream, vector, queue, tuple)를 하나씩 나눠 적어요.":
    "include the headers this code needs, one per line: iostream, vector, queue, tuple.",
  "j 를 혼자 없앨 최소 X":
    "smallest X that clears j on its own",
  "그 자리의 값 — 1, 2, 4, 8, ...":
    "the value of that place - 1, 2, 4, 8, ...",
  "길이가 짝수일 때":
    "when the length is even",
  "묶음이 n = 4 개":
    "n = 4 piles",
  "이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (예제 1)":
    "this contest has no line-by-line input format - it hands you the values (sample 1)",
  "지금 따라가는 열":
    "the column we are following",
  "지금 따라가는 행":
    "the row we are following",
  "짝수 바구니 개수":
    "how many baskets hold an even count",
  "홀수 — 가운데는 건너뛰기":
    "odd length - skip the middle one",
  "홀수 바구니 개수":
    "how many baskets hold an odd count",

  /* 2026-09-17 (3) — 자유 quest 의 남은 영어 주석을 마저 옮기며 생긴 짝. 영어는 옛 원문 그대로. */
  "(0,0) 에서 한 번만 퍼뜨려요. 가장자리를 조금 음수까지 두면":
    "BFS once from (0,0); a small negative margin lets a short path",
  "0 아래로 살짝 도는 짧은 길도 잡혀요 ((1,1) 을 두 번에 가려면 필요해요)":
    "dip below 0 (needed to reach (1,1) in 2 moves).",
  "0 을 세요 (3 으로 나누어떨어지는 항이에요)":
    "count the zeros (terms divisible by 3)",
  "D[i] = A[i] - B[i] — 상자 i 에 남는 양(+) 이나 모자란 양(-) 이에요":
    "D[i] = A[i] - B[i] : surplus (+) or shortage (-) at box i.",
  "K 번 쓰고 나면 글자마다 어디로 가나요?":
    "where does each letter land after K applications?",
  "Kitty_1 부터 5 까지를 3 으로 나눈 나머지만 남겨요":
    "keep only remainders mod 3 of Kitty_1..5",
  "carry 는 D = A - B 를 앞에서부터 더해 온 값이고, 답은 |carry| 를 다 더한 값이에요":
    "carry = running prefix of D = A - B; answer = sum of |carry|.",
  "prefix[i] = b1² - b2² + b3² - ...  (제곱을 번갈아 더하고 뺀 값)":
    "prefix[i] = b1^2 - b2^2 + b3^2 - ...  (alternating sum of squares)",
  "up[i][j] · dn[i][j] = i 에서 끝나는 길이 j 짜리 지그재그 개수":
    "up[i][j] / dn[i][j] = # length-j zig-zags ending at i",
  "up[i][j] · dn[i][j] — i 에서 끝나는 길이 j 짜리, 마지막 걸음이 위 · 아래":
    "up[i][j] / dn[i][j]: length-j zig-zags ending at i, last step up / down",
  "거기에 K 를 더하면 목록의 제일 큰 값이나 제일 작은 값 자리에 와요.":
    "and after +K it sits at the MAX or MIN of the list.",
  "규칙을 한 번 쓰면 A[i] 가 B[i] 로 바뀌어요":
    "one application of the rule: A[i] turns into B[i]",
  "그래서 K 는 이 넷 중 하나예요:":
    "so K can only be one of these 4 values:",
  "나이트가 갈 수 있는 여덟 가지 (한쪽 2 칸, 다른 쪽 1 칸)":
    "8 knight L-moves (2 in one axis, 1 in the other)",
  "다섯 칸짜리 묶음이 되풀이될 때까지 늘려요":
    "grow the list until a 5-window repeats",
  "딱 K 번이 되려면 — K 가 need 이상이고, 남는 (K - need) 가 짝수예요":
    "exactly K  <=>  K >= need and leftover (K - need) is even",
  "마지막 걸음이 올라간 것 · 내려간 것. 시작 방향은 둘 다 세요.":
    "whose LAST step went up / down. Counts BOTH start directions.",
  "맞는 경우 — 크기가 서로 다른 N-1 개이고 전부 1 부터 N 사이예요":
    "valid: N-1 distinct magnitudes, all in [1, N]",
  "메시지를 한 번만 훑으며 새로 써요":
    "rewrite the message in one pass",
  "목록의 제일 큰 값이나 제일 작은 값 자리에 와요 — 그래서 K 후보는 넷뿐이에요":
    "the MAX or MIN of the list -> only 4 candidate K values.",
  "벌집에 한 번 갈 때마다 min(M, 남은 꿀) 만큼 가져와요":
    "Each trip to a hive collects min(M, remaining honey).",
  "빠진 반지름이 들어갈 자리를 p (1 부터 N) 로 놓아요":
    "the missing radius slots into one position p (1..N)",
  "세로는 H, 가로는 W 를 써요 — 같은 t 인데 따로 움직여요":
    "row uses H, column uses W — the same t, two separate waves",
  "앞꼬리 + 되풀이 한 바퀴만큼은 꼭 있게 해요":
    "make sure we have the tail + one full cycle",
  "원래 값 중 제일 큰 크기는 N (또는 N-1) 이고, K 를 더하면":
    "biggest original magnitude is N (or N-1); after +K it sits at",
  "원래 값 중 제일 큰 크기는 N 이에요 (N 이 버려졌으면 N-1),":
    "the biggest original magnitude is N (or N-1 if N was discarded),",
  "작은 층을 먼저 놓으면 곱이 작게 유지돼요":
    "smallest layer first keeps the running product small",
  "작은 층을 먼저 놓으면 곱이 작게 유지돼요 (둘을 바꿔 보면 알 수 있어요)":
    "smallest layer first keeps the running product small (exchange argument)",
  "제곱을 번갈아 더하고 뺀 값 (__int128 을 써요 — 합이 10^18 을 넘어요)":
    "prefix alternating sum of squares (use __int128 — sums exceed 10^18)",
  "차이 (dx, dy) 마다 최소 몇 번 움직이면 되나를 미리 구해요":
    "minimum moves to cover any offset (dx, dy), 0 <= dx, dy <= 2000.",
  "총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것":
    "total lines = sum of prefix products",
  "총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것 (계속 MOD 로 나눈 나머지만 들고 있어요)":
    "total lines = sum of prefix products (keep everything mod MOD)",
  "한 방향은 1 과 N 사이를 오가요. 2*(N-1) 마다 되풀이돼요":
    "one axis bounces between 1 and N, repeating every 2*(N-1)",
  "한 번만 퍼뜨려서 차이마다 최소 이동 횟수를 구해요":
    "BFS once: minimum knight moves to every offset",
  "한 번에 얻을 수 있는 양을 전부 모은 다음, 큰 것부터 K 개를 골라요":
    "Build the list of all possible per-trip yields, then take the K largest.",
  "이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)":
    "this contest has no line-by-line input format - it hands you the values (official sample)",
  "케이스마다 바구니 개수":
    "how many baskets in each case",
  "케이스마다 바구니 하나씩":
    "one case's baskets at a time",

  // ── 2026-09-24: makedistinct·buymilk·moohunt·mcc21simplemath·feb23·
  //    mcc15bahasaf·reach·stampgrid·tichu (`localizeCode` 언어 오판 버그 수정과 같이 채움)
  "이미 놓인 값들":
    "values already placed",
  "한 번 밀고 다시 본다":
    "push once, check again",
  "겹치면":
    "if it collides",
  "(A) 넉넉히 사고 끝내기":
    "(A) buy enough, stop",
  "(B) 모자라게 사고 남은 통은 작은 묶음에 넘기기":
    "(B) buy less, pass the rest to a smaller group",
  "묶음마다 몇 통인지 미리 적어둬요 (C++ 에는 ** 가 없어요)":
    "note how many cans each group has (C++ has no **)",
  "다음 보드 = 지금 보드 + 1. 1999 + 1 = 2000 처럼 받아올림이 생겨요.":
    "next board = this board + 1. Carrying happens, like 1999 + 1 = 2000.",
  "무브를 세어 둘 곳. 없던 열쇠를 물으면 0 부터 시작해요.":
    "where we keep the move count. A new key starts at 0.",
  "다음 보드 = 지금 보드 + 1. 1번 칸이 일의 자리예요.":
    "next board = this board + 1. Cell 1 is the ones place.",
  "1999 + 1 = 2000 처럼 받아올림이 생겨요 — 뒤의 9 들만 0 이 돼요.":
    "carrying happens, like 1999 + 1 = 2000 — only the trailing 9s turn into 0.",
  "여기서도 뒤에 붙은 M(1) 들만 O(0) 로 돌아가고, 처음 만난 O 가 M 이 돼요.":
    "same here — only the trailing M(1)s flip to O(0), and the first O we hit becomes M.",
  "부분집합을 전부 만들어 봐요":
    "build every subset",
  "빈 것 하나로 시작해서, 수를 하나씩 넣은 사본을 계속 붙여요":
    "start from just the empty set, and keep appending copies with one more number added",
  "빈 부분집합은 세지 않아요":
    "don't count the empty subset",
  "MOD 는 1 번 걸음에서 정해 둔 10**9 + 7 이에요":
    "MOD is the 10**9 + 7 we set back in step 1",
  "MOD 는 1 번 걸음에서 정해 둔 1000000007LL 이에요":
    "MOD is the 1000000007LL we set back in step 1",
  "F 가 많으면 1 << nf 가 int 범위를 넘어 엉뚱한 값이 돼요.":
    "if F is large, 1 << nf overflows int and gives a wrong value.",
  "그래서 0/1 을 담은 칸을 두고 다음 조합을 하나씩 만들어요.":
    "so we keep a 0/1 array and build the next combination one at a time.",
  "이진수에 1 을 더하듯 다음 조합으로 넘어가요.":
    "move to the next combination the way you add 1 to a binary number.",
  "첫 자음의 자리, 아직 못 찾았으면 -1":
    "index of the first consonant, -1 if not found yet",
  "첫 자음만 f 로 갈아끼워요":
    "swap just the first consonant for f",
  "첫 자음만 f 로":
    "just the first consonant -> f",
  "S가 0이어도 이 줄은 항상 있어요 (빈 줄)":
    "this line is always here even when S is 0 (a blank line)",
  "채점기는 케이스 사이에 빈 줄을 넣어요 — 그건 건너뛰어요.":
    "the judge puts a blank line between cases — skip it.",
  "와일드카드가 아닌 카드가 있을 때만 둘째 줄이 와요.":
    "the second line only shows up when there's a non-wildcard card.",
};
