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
};
