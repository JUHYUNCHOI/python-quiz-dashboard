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
};
