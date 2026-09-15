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
};
