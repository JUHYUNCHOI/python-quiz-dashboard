/**
 * 스타터 코드 주석의 한국어 → 영어 사전.
 *
 * ── 왜 사전인가 ───────────────────────────────────────────────────────────────
 * `translateCodeComments()`(types.ts)의 정규식 체인은 **반복되는 틀**("// 여기에
 * 코드를 작성하세요" 같은 것)만 잡는다. 하지만 스타터 코드 주석은 대부분
 * 문제마다 한 번씩만 쓰이는 고유한 문장이다 — 실측 343개 중 겹치는 건 3개뿐.
 * 정규식으로는 도저히 못 잡으므로 **원문 그대로를 키로 쓰는 사전**이 답이다.
 *
 * ── 왜 문제 파일에 en.initialCode 를 넣지 않았나 ──────────────────────────────
 * 243개 문제에 흩어져 있다. 문제 파일마다 스타터 코드를 복제하면 한국어 쪽을
 * 고칠 때 영어 쪽이 조용히 낡는다. 주석만 따로 빼면 **코드는 한 벌**이고
 * 번역은 한 파일에 모인다.
 *
 * 다만 출력 문자열 자체가 한국어인 문제(채점이 바이트 일치라 번역 불가)는
 * 영어 설명에 한국어 리터럴을 그대로 적어야 하므로, 그런 문제는 예외적으로
 * 문제 파일에 `en.initialCode` 를 직접 둔다. 그 주석들은 이 사전에 없다 —
 * 사전에 없는 주석은 손대지 않고 그대로 남기는 게 이 설계의 기본 동작이다.
 *
 * ── 키 규칙 ──────────────────────────────────────────────────────────────────
 * `#` 또는 `//` **뒤쪽만** 잘라서 `trim()` 한 문자열. 들여쓰기와 주석 기호,
 * 주석 앞의 코드는 호출 측이 보존한다.
 */
export const CODE_COMMENT_EN: Record<string, string> = {
  // ── 출력 형식 안내 ──────────────────────────────────────────────────────
  '"(x, y)" 형식으로 반환': 'Return in "(x, y)" format',
  '"Vector(x, y)" 형식': '"Vector(x, y)" format',
  '"둘레 넓이" 형식으로 출력하세요': 'Print as "perimeter area"',
  '"함수 호출 완료" 출력': 'Print "함수 호출 완료"',
  "다음 형식으로 출력하세요:": "Print in the following format:",
  '출력 형식: "0: 2", "1: 0", ...': 'Output format: "0: 2", "1: 0", ...',
  '출력 형식: "a: 3"': 'Output format: "a: 3"',
  '출력 형식: "apple: 3"': 'Output format: "apple: 3"',
  '출력 형식: "최댓값 최솟값"': 'Output format: "max min"',
  '형식: "N x i = N*i"': 'Format: "N x i = N*i"',
  "소수점 1자리까지 출력 (예: 3.5)": "Print with 1 decimal place (e.g. 3.5)",
  "소수점 2자리까지 (:.2f)": "Two decimal places (:.2f)",
  "각 평균을 소수점 2자리로 출력합니다": "Print each average with 2 decimal places",
  "Avg: 평균 (:.2f)": "Avg: the average (:.2f)",
  "Max: 최댓값": "Max: the maximum",
  "Min: 최솟값": "Min: the minimum",
  "Sum: 합계": "Sum: the total",
  "헤더 출력 (이미 완성됨)": "Print the header (already written for you)",

  // ── 입력 형식 안내 ──────────────────────────────────────────────────────
  "첫 줄: N (숫자 개수)": "First line: N (how many numbers)",
  "둘째 줄: N개의 정수 (공백 구분)": "Second line: N integers (space-separated)",
  "한 줄에 세 정수가 공백으로 주어집니다": "Three space-separated integers on one line",
  "가로 w, 세로 h를 한 줄에 공백으로 입력받아": "Read width w and height h space-separated on one line",
  "0이 입력되면 종료": "Stop when 0 is entered",
  "원소 읽기 (값은 무시)": "Read an element (value is ignored)",
  "첫 번째 공백으로만 분리": "Split on the first space only",
  "input()으로 받은 값은 문자열! 정수로 변환 후 계산하세요":
    "input() returns a string! Convert to int before doing math.",

  // ── 기초 산술 / 변환 ────────────────────────────────────────────────────
  "합, 차, 곱, 정수 나눗셈, 나머지를 순서대로 출력하세요":
    "Print the sum, difference, product, floor division, and remainder in order",
  "2**0, 2**1, ... 2**7 을 순서대로 출력하세요": "Print 2**0, 2**1, ... 2**7 in order",
  "두 식을 계산해서 각각 출력하세요": "Evaluate both expressions and print each result",
  "원의 넓이를 계산해서 출력하세요": "Compute and print the area of the circle",
  "π = 3.14159 사용": "Use π = 3.14159",
  "반지름을 입력받아 원의 넓이를 소수점 2자리까지 출력하세요":
    "Read a radius and print the circle's area to 2 decimal places",
  "n이 짝수인지, 홀수인지 판별해서 출력하세요": "Decide whether n is even or odd and print the result",
  "a, b를 적절한 타입으로 변환해서 계산하세요": "Convert a and b to suitable types, then compute",
  "a, b를 적절히 변환해서 합과 이어붙이기를 출력하세요":
    "Convert a and b appropriately, then print their sum and their concatenation",
  "s를 정수로 변환해서 8을 더한 결과를 출력하세요": "Convert s to an int, add 8, and print the result",
  "정수 변환과 반올림 결과를 출력하세요": "Print the result of int conversion and of rounding",
  "섭씨 온도를 입력받아 화씨로 변환하세요": "Read a Celsius temperature and convert it to Fahrenheit",
  "섭씨를 입력받아 화씨로 변환하세요": "Read Celsius and convert to Fahrenheit",
  "두 정수를 각각 한 줄씩 입력받아 합을 출력하세요":
    "Read two integers, one per line, and print their sum",
  "두 정수를 한 줄에서 공백으로 입력받아 평균을 출력하세요":
    "Read two space-separated integers on one line and print their average",
  "시간 h, 분 m을 공백으로 입력받아 총 몇 분인지 출력하세요":
    "Read hours h and minutes m space-separated, then print the total minutes",
  "총 분을 입력받아 \"H시간 M분\" 형식으로 출력하세요":
    'Read a total number of minutes and print it as "H시간 M분" (시간 = hours, 분 = minutes)',
  "총 초를 입력받아 HH:MM:SS 형식으로 출력하세요":
    "Read a total number of seconds and print it as HH:MM:SS",
  "1초 진행. 자리올림 처리 + 24시 → 0시":
    "Advance one second: handle carry, and wrap hour 24 back to 0",
  "몸무게(kg)와 키(m)를 공백으로 입력받아 BMI를 출력하세요":
    "Read weight (kg) and height (m) space-separated, then print the BMI",
  "BMI = 몸무게 / (키 * 키)": "BMI = weight / (height * height)",
  "두 점 사이의 거리: sqrt((x2-x1)^2 + (y2-y1)^2)":
    "Distance between two points: sqrt((x2-x1)^2 + (y2-y1)^2)",
  "총 금액과 10% 할인 금액을 계산해 출력하세요":
    "Compute and print the total and the 10%-discounted amount",
  "소계 = qty * price": "subtotal = qty * price",

  // ── 조건문 ──────────────────────────────────────────────────────────────
  "두 정수를 입력받아 더 큰 수를 출력하세요": "Read two integers and print the larger one",
  "세 정수를 입력받아 최대값을 출력하세요": "Read three integers and print the largest",
  "세 조건을 and로 연결하세요": "Chain the three conditions with and",
  "and로 두 조건을 동시에 확인하세요": "Use and to check both conditions at once",
  "and를 사용해 두 조건을 동시에 확인하세요": "Use and to check both conditions at once",
  "and, or, not을 활용해 윤년 조건을 구현하세요":
    "Implement the leap-year condition using and, or, not",
  "1 <= n <= 100 인지 확인하세요": "Check that 1 <= n <= 100",
  "조건 순서가 중요해요! 가장 구체적인 조건부터":
    "Order matters! Start with the most specific condition.",
  "점수를 입력받아 학점을 출력하세요": "Read a score and print the letter grade",
  "90이상: A, 80이상: B, 70이상: C, 60이상: D, 미만: F":
    "90+: A, 80+: B, 70+: C, 60+: D, below: F",
  "score에 따라 Strong / Medium / Weak 출력": "Print Strong / Medium / Weak based on score",
  "나이를 입력받아 요금을 출력하세요": "Read an age and print the fare",
  "낸 돈과 가격을 공백으로 입력받아 거스름돈을 출력하세요":
    "Read the amount paid and the price space-separated, then print the change",
  "삼항 연산자만 사용해서 result에 결과를 저장하세요":
    "Store the result in `result` using only the ternary operator",
  "내장 abs() 사용 금지! if문으로 직접 구현하세요":
    "Do not use the built-in abs()! Implement it yourself with an if statement.",
  "조건 1: 길이 8 이상": "Rule 1: at least 8 characters long",
  "조건 2: 대문자 포함 — any(c.isupper() for c in p)":
    "Rule 2: contains an uppercase letter — any(c.isupper() for c in p)",
  "조건 3: 숫자 포함 — any(c.isdigit() for c in p)":
    "Rule 3: contains a digit — any(c.isdigit() for c in p)",
  "조건 4: 특수문자(@#$!) 포함": "Rule 4: contains a special character (@#$!)",
  "대소문자에 따라 base(기준 문자) 설정": "Set `base` (the reference character) based on letter case",
  "(현재 위치 + N) % 26 으로 새 위치 계산": "Compute the new position as (current + N) % 26",
  "연료가 km보다 적으면 fuel만큼만 가고 \"연료 부족\" 출력":
    'If fuel is less than km, travel only `fuel` and print "연료 부족" (out of fuel)',
  "잔액 부족 시 \"잔액 부족\" 출력": 'If the balance is too low, print "잔액 부족" (insufficient balance)',
  "c1이 먼저 공격, 번갈아 공격, 쓰러지면 \"{name} 패배!\" 출력 후 종료":
    'c1 attacks first, then they alternate; when one falls, print "{name} 패배!" (defeated) and stop',

  // ── 반복문 / 패턴 출력 ──────────────────────────────────────────────────
  "1부터 N까지의 합을 구하세요": "Compute the sum from 1 to N",
  "1부터 N까지 짝수의 합을 구하세요": "Compute the sum of the even numbers from 1 to N",
  "N부터 1까지 거꾸로 출력하세요": "Print from N down to 1",
  "N의 각 자리수를 모두 더하세요": "Add up all the digits of N",
  "N 팩토리얼을 계산하세요": "Compute N factorial",
  "N번째 피보나치 수를 출력하세요": "Print the Nth Fibonacci number",
  "N을 입력받아 구구단 N단을 출력하세요": "Read N and print the N times table",
  "2단부터 9단까지 구구단 전체를 출력하세요": "Print the full times tables from 2 through 9",
  "N을 입력받아 별 삼각형을 출력하세요": "Read N and print a triangle of stars",
  "N을 입력받아 숫자 패턴을 출력하세요": "Read N and print the number pattern",
  "N줄짜리 별 피라미드를 출력하세요": "Print a pyramid of stars with N rows",
  "N부터 1까지 줄어드는 역 삼각형을 출력하세요":
    "Print an inverted triangle shrinking from N down to 1",
  "홀수 N을 입력받아 마름모를 출력하세요": "Read an odd N and print a diamond",
  "1번째 줄에 * 1개, 2번째 줄에 * 2개, ..., N번째 줄에 * N개":
    "Row 1 has 1 star, row 2 has 2 stars, ..., row N has N stars",
  "i번째 줄: (N-i)개 공백 + (2i-1)개 별": "Row i: (N-i) spaces followed by (2i-1) stars",
  "N을 입력받아 1부터 N까지 FizzBuzz를 출력하세요": "Read N and print FizzBuzz from 1 to N",
  "N이 1이 될 때까지 콜라츠 규칙을 적용한 횟수를 출력하세요":
    "Print how many Collatz steps it takes for N to reach 1",
  "N이 소수인지 판별하세요": "Determine whether N is prime",
  "1은 소수가 아닙니다": "1 is not prime",
  "2부터 n-1까지 나누어 떨어지는 수가 없으면 소수":
    "It is prime if nothing from 2 to n-1 divides it evenly",
  "2부터 N까지의 소수를 모두 출력하세요": "Print every prime from 2 to N",
  "에라토스테네스의 체로 2~N의 소수를 모두 출력하세요":
    "Print every prime from 2 to N using the Sieve of Eratosthenes",
  "is_prime 배열을 만들어서 체를 구현하세요": "Build an is_prime array to implement the sieve",
  "두 수의 최대공약수를 구하세요": "Find the greatest common divisor of the two numbers",
  "유클리드 호제법: b가 0이면 a 반환, 아니면 gcd(b, a%b)":
    "Euclid's algorithm: if b is 0 return a, otherwise gcd(b, a%b)",
  "while 루프를 사용하세요": "Use a while loop",
  "while c <= end: 구조를 사용하세요": "Use a `while c <= end:` structure",
  "start부터 end까지 step 간격으로 반복": "Loop from start to end in increments of step",
  "3의 배수 건너뛰기": "Skip multiples of 3",
  "end=\" \"를 활용해 한 줄에 카운트다운을 출력하세요":
    'Use end=" " to print the countdown on a single line',
  "end와 sep를 활용해 한 줄에 구구단을 출력하세요":
    "Use end and sep to print the times table on a single line",
  "sep를 사용해 두 가지 형식으로 출력하세요": "Use sep to print it in two different formats",
  "sep를 활용해 한 줄에 출력하세요": "Use sep to print it on a single line",
  "N개의 숫자를 입력받아 최솟값을 출력하세요": "Read N numbers and print the smallest",
  "N개의 숫자를 입력받으며 각 단계별 누적 평균을 출력하세요":
    "Read N numbers, printing the running average at each step",
  "N개의 정수를 입력받아 각각 제곱하여 공백으로 출력하세요":
    "Read N integers and print each one squared, space-separated",
  "세 과목 점수와 평균을 출력하세요 (평균은 소수점 2자리)":
    "Print the three subject scores and their average (average to 2 decimal places)",

  // ── 문자열 ──────────────────────────────────────────────────────────────
  "이름을 입력받아 Hello, {이름}! 형식으로 출력하세요":
    "Read a name and print it as Hello, {name}!",
  "f-string으로 이름과 점수를 출력하세요": "Print the name and score with an f-string",
  "f-string 정렬로 영수증을 출력하세요": "Print a receipt using f-string alignment",
  'f"{name:<10}{price:>6}" — :<N은 왼쪽 정렬, :>N은 오른쪽 정렬':
    'f"{name:<10}{price:>6}" — :<N left-aligns, :>N right-aligns',
  "영수증 형식으로 출력하세요": "Print it in receipt format",
  "쇼핑 카트 표를 출력하세요": "Print the shopping cart table",
  "strip()을 사용해 양쪽 공백 제거 후 출력": "Use strip() to trim both ends, then print",
  "str.replace() 를 사용하세요": "Use str.replace()",
  "replace()를 사용해 a를 b로 교체 후 출력": "Use replace() to swap a for b, then print",
  "index()를 사용해 t의 위치를 찾으세요": "Use index() to find the position of t",
  "find()를 사용해 t의 위치 출력": "Use find() to print the position of t",
  "t가 처음 나오는 인덱스를 출력하고, 없으면 -1 출력":
    "Print the first index where t appears, or -1 if it never does",
  "팰린드롬이면 Yes, 아니면 No를 출력하세요": "Print Yes if it is a palindrome, otherwise No",
  "모음(a, e, i, o, u) 개수를 세세요 (대소문자 무시)":
    "Count the vowels (a, e, i, o, u), ignoring case",
  "각 단어를 뒤집되 단어 순서는 그대로 유지하세요":
    "Reverse each word but keep the word order unchanged",
  '예: "hello world" → "olleh dlrow"': 'e.g. "hello world" → "olleh dlrow"',
  "snake_case를 camelCase로 변환하세요": "Convert snake_case to camelCase",
  '예: "hello_world_foo" → "helloWorldFoo"': 'e.g. "hello_world_foo" → "helloWorldFoo"',
  "두 단어가 아나그램인지 판별하세요": "Determine whether the two words are anagrams",
  "아나그램: 글자를 재배열하면 다른 단어가 됨":
    "Anagram: rearranging the letters produces the other word",
  "아나그램끼리 그루핑해서 출력하세요": "Group the anagrams together and print them",
  "키: sorted(word) 문자열 → 같은 키면 같은 아나그램 그룹":
    "Key: the sorted(word) string — equal keys mean the same anagram group",
  "Run-Length Encoding으로 문자열을 압축하세요": "Compress the string with run-length encoding",
  "Run-Length Encoding: 연속 반복을 압축하세요": "Run-length encoding: compress runs of repeats",
  '예: "aaabbbcc" → "a3b3c2"': 'e.g. "aaabbbcc" → "a3b3c2"',
  '예: "abcd" → "abcd" (1개는 숫자 생략)': 'e.g. "abcd" → "abcd" (a run of 1 omits the digit)',
  "1~len(s)//2 단위 크기를 모두 시도해 가장 짧은 압축 결과의 길이를 출력하세요":
    "Try every chunk size from 1 to len(s)//2 and print the length of the shortest compression",
  "문자열에서 숫자(연속된 digit)만 추출해 합산하세요":
    "Extract only the numbers (runs of digits) from the string and add them up",
  '예: "abc12def34" → 12 + 34 = 46': 'e.g. "abc12def34" → 12 + 34 = 46',
  '예: [1, 1, 2, 3, 3, 3] → "(1 2) (2) (3 3)"': 'e.g. [1, 1, 2, 3, 3, 3] → "(1 2) (2) (3 3)"',
  "로마 숫자를 정수로 변환하세요": "Convert the Roman numeral to an integer",
  "현재 값이 다음 값보다 작으면 빼고, 아니면 더합니다":
    "If the current value is smaller than the next one, subtract it; otherwise add it",
  "template에서 {key}를 value로 치환하세요": "Replace {key} with value in the template",
  "검색 결과를 출력하세요": "Print the search result",

  // ── 리스트 / 배열 ───────────────────────────────────────────────────────
  "합계를 구하세요": "Compute the total",
  "최댓값과 최솟값을 구하세요": "Find the maximum and the minimum",
  "리스트를 역순으로 출력하세요": "Print the list in reverse order",
  "두 번째로 큰 수를 출력하세요": "Print the second largest number",
  "힌트: 정렬 후 인덱스를 활용하거나, 최댓값을 한 번 제거한 후 max를 구하세요":
    "Hint: sort and use an index, or remove the maximum once and take max again",
  "평균을 소수점 2자리까지 출력하세요": "Print the average to 2 decimal places",
  "평균을 계산하고, 평균보다 큰 수만 오름차순으로 출력하세요":
    "Compute the average, then print only the numbers above it in ascending order",
  "버블 정렬을 직접 구현하여 정렬하세요 (sorted() 사용 금지)":
    "Sort by implementing bubble sort yourself (do not use sorted())",
  "버블정렬을 직접 구현하고 스왑 횟수를 세세요":
    "Implement bubble sort yourself and count the swaps",
  "인접한 원소를 비교해 순서가 틀리면 교환합니다":
    "Compare adjacent elements and swap them when they are out of order",
  "입력 순서를 유지하며 중복을 제거하세요": "Remove duplicates while preserving input order",
  "중복이 있으면 Yes, 없으면 No를 출력하세요":
    "Print Yes if there is a duplicate, otherwise No",
  "오른쪽으로 K번 회전한 결과를 출력하세요": "Print the result of rotating right K times",
  "힌트: k를 n으로 나눈 나머지만큼 실제 회전": "Hint: the real rotation is k modulo n",
  "연속 부분합의 최댓값을 구하세요": "Find the maximum contiguous subarray sum",
  "힌트: 현재까지의 합이 음수가 되면 새로 시작하는 것이 유리합니다":
    "Hint: once the running sum goes negative, it pays to start over",
  "누적합 배열을 만들어 공백으로 구분해 출력하세요":
    "Build a prefix-sum array and print it space-separated",
  "r1,c1 ~ r2,c2 직사각형 영역의 합을 구하세요":
    "Compute the sum of the rectangle from r1,c1 to r2,c2",
  "크기 K 슬라이딩 윈도우의 이동 평균을 계산하세요":
    "Compute the moving average over a sliding window of size K",
  "슬라이딩 윈도우로 각 구간의 최빈값을 출력하세요":
    "Use a sliding window to print the mode of each window",
  "윈도우가 이동할 때 딕셔너리를 업데이트하세요": "Update the dictionary as the window slides",
  "최빈값을 구하세요 (동수면 더 작은 수)": "Find the mode (on a tie, the smaller number)",
  "0~9 각 숫자의 빈도수를 출력하세요": "Print how many times each digit 0–9 appears",
  "left, right 포인터를 활용하세요": "Use left and right pointers",
  "앞/뒤를 번갈아 선택하세요": "Alternate between taking from the front and the back",
  "홀수번째(1,3,5...): 앞에서 선택, 짝수번째(2,4,6...): 뒤에서 선택":
    "Odd turns (1,3,5...) take from the front; even turns (2,4,6...) take from the back",
  "합이 T인 인덱스 쌍 (i < j)의 수를 구하세요":
    "Count the index pairs (i < j) whose values sum to T",
  "합이 T가 되는 부분집합이 존재하는지 확인하세요":
    "Check whether some subset sums to T",
  "DP 또는 재귀/완전탐색으로 풀 수 있습니다":
    "You can solve this with DP, or with recursion / brute force",
  "N x N 행렬의 두 대각선 합을 출력하세요":
    "Print the sums of both diagonals of the N x N matrix",
  "N×M 행렬을 M×N 전치행렬로 변환해 출력하세요":
    "Transpose the N×M matrix into an M×N matrix and print it",
  "N줄의 CSV를 읽고 K번째 열(0-based)의 합을 출력하세요":
    "Read N CSV lines and print the sum of column K (0-based)",
  "이진 탐색으로 t의 인덱스를 구하세요": "Find the index of t with binary search",
  "mid 계산 후 target과 비교": "Compute mid, then compare with target",
  "기저 조건: low > high이면 -1 반환": "Base case: return -1 when low > high",
  "없으면 -1 출력": "Print -1 if there is none",
  "멱집합의 원소 수(부분집합 수)를 출력하세요":
    "Print the size of the power set (the number of subsets)",
  "힌트: N개의 서로 다른 원소의 부분집합 수는 2^N":
    "Hint: N distinct elements have 2^N subsets",
  "append 사용": "Use append",
  "pop 사용, 비어있으면 'empty'": "Use pop; print 'empty' if it is empty",
  "나머지 출력": "Print the rest",

  // ── 딕셔너리 / 집합 ────────────────────────────────────────────────────
  "딕셔너리에 저장하세요": "Store it in a dictionary",
  "딕셔너리로 이미 본 숫자의 등장 횟수를 기록하세요":
    "Use a dictionary to record how many times each number has been seen",
  "각 단어의 빈도를 딕셔너리로 집계하고 알파벳 순으로 출력하세요":
    "Tally each word's frequency in a dictionary and print the entries in alphabetical order",
  "각 글자의 빈도를 딕셔너리로 집계해 알파벳 순으로 출력하세요":
    "Tally each letter's frequency in a dictionary and print the entries in alphabetical order",
  "가장 많이 나온 단어를 출력하세요": "Print the most frequent word",
  "동수일 때는 알파벳 순서가 앞선 단어": "On a tie, the word that comes first alphabetically",
  "빈도 상위 K개 단어를 출력하세요": "Print the K most frequent words",
  "scores[name]에 점수 리스트를 누적하세요": "Accumulate a list of scores under scores[name]",
  "각 학생의 평균을 알파벳 순으로 출력하세요":
    "Print each student's average in alphabetical order",
  "이름 첫 글자로 그루핑하여 평균 점수를 출력하세요":
    "Group by the first letter of the name and print the average score",
  "totals[cat]에 금액을 누적하세요": "Accumulate the amount under totals[cat]",
  "합계 내림차순, 동수면 이름 오름차순으로 출력하세요":
    "Print by total descending, breaking ties by name ascending",
  "두 딕셔너리를 합치되, 겹치는 키는 d2 값 우선":
    "Merge the two dictionaries; on a key collision, d2's value wins",
  "d를 뒤집어 value -> [keys] 딕셔너리를 만든 뒤 출력하세요":
    "Invert d into a value -> [keys] dictionary, then print it",
  "두 리스트의 공통 원소를 중복 없이 오름차순으로 출력하세요":
    "Print the elements common to both lists, deduplicated and in ascending order",
  "합집합 / 교집합 / 차집합을 각각 한 줄씩 오름차순으로 출력하세요":
    "Print the union, intersection, and difference — one per line, each in ascending order",
  "합집합 크기와 교집합 크기를 출력하세요":
    "Print the size of the union and the size of the intersection",
  "A - B (차집합)를 오름차순으로 출력하세요": "Print A - B (the difference) in ascending order",

  // ── 함수 / 재귀 / 클래스 ───────────────────────────────────────────────
  "myMax, myMin을 호출해 출력하세요": "Call myMax and myMin, then print the results",
  "myAbs를 호출해 sum에 더하세요": "Call myAbs and add the result to sum",
  'isEven을 호출해 "even" 또는 "odd"를 출력하세요': 'Call isEven and print "even" or "odd"',
  "square를 호출해 sum과 maxSq를 갱신하세요": "Call square and update sum and maxSq",
  "1, 소수, 합성수를 구분해 출력하세요":
    "Distinguish 1, primes, and composites, and print which it is",
  "2부터 n까지 isPrime을 호출해 소수의 합을 구하세요":
    "Call isPrime for 2 through n and total up the primes",
  "numbers 리스트의 평균값을 반환하세요": "Return the average of the numbers list",
  "최솟값, 최댓값, 합계를 동시에 반환하세요": "Return the minimum, maximum, and total together",
  "return a, b, c 형태": "in the form `return a, b, c`",
  "args의 모든 원소 합을 반환하세요": "Return the sum of every element in args",
  "*args는 임의 개수의 인자를 튜플로 받습니다":
    "*args collects any number of arguments into a tuple",
  "greeting, name을 조합해 출력하는 함수": "A function that combines greeting and name and prints it",
  "func 호출 후": "after calling func",
  "map과 lambda를 사용하세요": "Use map and lambda",
  "map과 lambda로 제곱 변환 후 출력하세요": "Square the values with map and lambda, then print",
  "filter와 lambda로 짝수만 추출하세요": "Extract only the even numbers with filter and lambda",
  "filter와 lambda로 짝수 필터링 후 출력하세요":
    "Filter for even numbers with filter and lambda, then print",
  "filter → map → sum 파이프라인을 한 줄로 작성하세요":
    "Write the filter → map → sum pipeline as a single line",
  "홀수만 걸러 제곱한 뒤 합산하세요": "Keep only the odd numbers, square them, then sum",
  "클로저 패턴: count 변수를 내부 함수가 캡처하도록 구현하세요":
    "Closure pattern: have the inner function capture the count variable",
  "cache에 결과가 있으면 바로 반환": "If the result is already cached, return it immediately",
  "없으면 계산 후 cache에 저장": "Otherwise compute it and store it in the cache",
  "재귀 기저 조건: n이 0 또는 1이면 1 반환": "Recursive base case: return 1 when n is 0 or 1",
  "재귀 단계: n * factorial(n-1)": "Recursive step: n * factorial(n-1)",
  "재귀 단계: fib(n-1) + fib(n-2)": "Recursive step: fib(n-1) + fib(n-2)",
  "기저 조건: n이 0이면 0, n이 1이면 1": "Base case: 0 when n is 0, and 1 when n is 1",
  "원판 1개: 이동 1번": "1 disk: 1 move",
  "n개: 2 * hanoi(n-1) + 1": "n disks: 2 * hanoi(n-1) + 1",
  "최초 1회만 초기화": "Initialize only on the very first call",
  "_instance가 None이면 새 인스턴스 생성, 아니면 기존 반환":
    "If _instance is None create a new instance, otherwise return the existing one",
  "인스턴스 변수 설정": "Set the instance variables",
  "연이율 %": "annual interest rate, in %",
  "1) 잔액에 monthly 더함": "1) Add `monthly` to the balance",
  "2) 새 잔액에 월이율 적용: bal = bal + bal * rate / 12 / 100 (정수로 버림)":
    "2) Apply the monthly rate to the new balance: bal = bal + bal * rate / 12 / 100 (truncated to an int)",
  "self.price를 rate% 할인": "Discount self.price by rate%",
  "두 벡터 합을 새 Vector로 반환": "Return the sum of the two vectors as a new Vector",
  "그 후 gcd로 약분해서 새 Fraction 반환":
    "Then reduce with gcd and return a new Fraction",
  "스택을 사용해 괄호 유효성을 검사하세요": "Use a stack to validate the brackets",
  "열린 괄호는 스택에 push, 닫힌 괄호는 스택 top과 매칭 확인":
    "Push opening brackets; for a closing bracket, check it against the stack top",
  "42 출력": "prints 42",
  "True 출력": "prints True",

  // ── C++ 전용 ───────────────────────────────────────────────────────────
  "struct Book을 선언하세요 (title, author, year)": "Declare struct Book (title, author, year)",
  "TODO: Declare struct Rect (w, h, area() 멤버 함수)":
    "TODO: Declare struct Rect (w, h, and an area() member function)",
  "TODO: Declare struct Complex (정수 real, imag)":
    "TODO: Declare struct Complex (integer real, imag)",
  "TODO: struct Bucket 을 선언하세요 (label, nums — 이 버킷에 속한 숫자들)":
    "TODO: Declare struct Bucket (label, nums — the numbers in this bucket)",
  "TODO: struct Club을 선언하세요 (name, members — 회원 이름 목록)":
    "TODO: Declare struct Club (name, members — the list of member names)",
  "TODO: struct Result 를 선언하세요 (label, students — 이 그룹에 속한 학생 이름들)":
    "TODO: Declare struct Result (label, students — the names of the students in this group)",
  "TODO (overloading): Write two versions of the area 함수 function":
    "TODO (overloading): Write two versions of the area function",
  "원: r * r * 3": "circle: r * r * 3",
  "직사각형: w * h": "rectangle: w * h",
  "nullptr 체크": "nullptr check",
  "-1 반환": "return -1",
  "아니면 *p × 2 반환": "otherwise return *p × 2",
  "1. 최솟값을 구하세요": "1. Find the minimum",
  "2. 포인터(int* p)를 이용해 최솟값과 같은 원소를 0으로 바꾸세요":
    "2. Use a pointer (int* p) to set every element equal to the minimum to 0",
  "3. 결과를 출력하세요": "3. Print the result",
  "포인터로 arr을 순회하며 짝수만 sum에 더하세요":
    "Walk arr with a pointer and add only the even values to sum",
  "(int* p = arr; p < arr + n; p++) 형태로 작성하세요":
    "Write it in the form (int* p = arr; p < arr + n; p++)",
  "next[] 배열을 역순 연결로 초기화하세요": "Initialize the next[] array as a reversed chain",
  "next[n-1] = -1 (끝)": "next[n-1] = -1 (end)",
  "next[i] = i+1 ... 하지만 순회는 n-1부터 시작하니":
    "next[i] = i+1 ... but the walk starts at n-1, so",
  "역순이 되려면: next[i] = i-1, 시작은 n-1, 끝은 0 (next[0] = -1)":
    "to reverse it: next[i] = i-1, start at n-1, end at 0 (next[0] = -1)",
  "인덱스 n-1 부터 next[cur] != -1 인 동안 순회해 출력하세요":
    "Walk from index n-1 while next[cur] != -1, printing as you go",
  "찾으면 해당 원소의 포인터 반환, 없으면 nullptr 반환":
    "Return a pointer to the element if found, otherwise nullptr",
  "포인터 - 배열 시작 = 인덱스": "pointer - array start = index",
  "sort 후 unique + erase 패턴 또는 직접 구현":
    "Use the sort + unique + erase pattern, or implement it yourself",
  "기본이 최대 힙": "max-heap by default",
  "최소 힙": "min-heap",
  "{끝, 시작}": "{end, start}",

  // ── 알고리즘 TODO (C++ 사다리) ─────────────────────────────────────────
  "TODO: 여기에 코드를 작성하세요": "TODO: Write your code here",
  "TODO: s를 뒤집어서 출력하기": "TODO: Reverse s and print it",
  "TODO: 공백으로 나눈 단어가 몇 개인지 세어서 출력하기":
    "TODO: Count the space-separated words and print the count",
  "TODO: 각 알파벳이 몇 번 나왔는지 세고, 가장 많은 것을 출력하기":
    "TODO: Count each letter's occurrences and print the most frequent one",
  "TODO: 첫 값으로 최대·최소를 초기화하고, 나머지를 훑으며 갱신하세요":
    "TODO: Initialize max and min from the first value, then update as you scan the rest",
  "TODO: 숫자를 하나씩 읽으며 지금까지의 합을 누적해 출력하세요":
    "TODO: Read the numbers one at a time, printing the running total",
  "TODO: 오름차순 정렬 후 공백으로 출력": "TODO: Sort ascending and print space-separated",
  "TODO: 내림차순 정렬 후 공백으로 출력": "TODO: Sort descending and print space-separated",
  "TODO: 역순으로 공백 구분 출력 (스택에 넣었다 꺼내는 것과 같음)":
    "TODO: Print in reverse, space-separated (the same as pushing then popping a stack)",
  "TODO: 빈도를 세고, 최빈값(동점이면 가장 작은 수) 출력":
    "TODO: Count frequencies and print the mode (on a tie, the smallest number)",
  "TODO: 전부 넣고 서로 다른 개수(set 크기) 출력":
    "TODO: Insert them all and print the number of distinct values (the set's size)",
  "TODO: 가진 카드를 set 에 넣기": "TODO: Put the cards you hold into a set",
  "TODO: 각 질의마다 있으면 1, 없으면 0 출력":
    "TODO: For each query print 1 if present, 0 if not",
  "TODO: 누적합 배열 pre 채우기": "TODO: Fill the prefix-sum array `pre`",
  "TODO: pre[k] = pre[k-1] + (k번째 수) 로 누적합 배열을 채우세요":
    "TODO: Fill the prefix-sum array with pre[k] = pre[k-1] + (the kth number)",
  "TODO: pre[j] - pre[i-1] 출력": "TODO: Print pre[j] - pre[i-1]",
  "TODO: 구간 [i, j] 합 = pre[j] - pre[i-1] 출력":
    "TODO: Print the range sum [i, j] = pre[j] - pre[i-1]",
  "TODO: 두 포인터로 합 == x 인 쌍이 있는지 찾기":
    "TODO: Use two pointers to find whether a pair sums to x",
  "TODO: 처음 K개 합을 구한 뒤, 창을 옮기며 최댓값 갱신":
    "TODO: Sum the first K, then slide the window and keep the maximum",
  "TODO: 각 질의 x 마다 lower_bound 위치의 값 (없으면 -1)":
    "TODO: For each query x, the value at lower_bound (or -1 if there is none)",
  "TODO: 각 질의 x 마다 x 이하 개수 = upper_bound 위치":
    "TODO: For each query x, the count of values ≤ x = the upper_bound position",
  "TODO: mid*mid <= n 이면 ans=mid, lo=mid+1; 아니면 hi=mid-1":
    "TODO: If mid*mid <= n then ans=mid, lo=mid+1; otherwise hi=mid-1",
  "TODO: 끝나는 시각 기준 정렬 후, 겹치지 않게 그리디 선택":
    "TODO: Sort by end time, then greedily pick non-overlapping intervals",
  "TODO: 오름차순 정렬 후, 누적합을 더해 대기시간 합 출력":
    "TODO: Sort ascending, then add up the prefix sums to print the total wait time",
  "TODO: 내림차순 정렬 후, i번째(1-based)까지 쓸 때 a[i]*i 의 최댓값":
    "TODO: Sort descending, then take the maximum of a[i]*i over the first i (1-based)",
  "TODO: 2개 이상인 동안 가장 작은 두 수 합치고 total에 더하고 다시 넣기":
    "TODO: While two or more remain, merge the two smallest, add to total, and push back",
  "TODO: 나이 기준 안정 정렬(stable_sort) 후 \"나이 이름\" 줄마다 출력":
    'TODO: stable_sort by age, then print one "age name" line each',
  "TODO: x>0 넣기, x==0 가장 큰 값 출력 후 제거(비었으면 0)":
    "TODO: For x>0 insert it; for x==0 print and remove the largest (0 if empty)",
  "TODO: K-1번 pop 후 top() 출력": "TODO: Pop K-1 times, then print top()",
  "TODO: 한 장 남을 때까지 (버리기 + 맨 아래로 옮기기) 반복":
    "TODO: Repeat (discard, then move to the bottom) until one card remains",
  "TODO: '(' 면 깊이+1(최댓값 갱신), ')' 면 깊이-1":
    "TODO: On '(' increase the depth (updating the maximum); on ')' decrease it",
  "TODO: 2의 거듭제곱이면 YES, 아니면 NO": "TODO: Print YES if it is a power of two, else NO",
  "TODO: n의 이진수에서 1의 개수 출력": "TODO: Print how many 1 bits n has",
  "TODO: n의 k번째 비트가 켜졌으면 1, 아니면 0":
    "TODO: Print 1 if n's kth bit is set, otherwise 0",
  "TODO: 이진 거듭제곱으로 A^B mod M (곱할 때마다 % M)":
    "TODO: A^B mod M by binary exponentiation (take % M after every multiply)",
  "TODO: b == 0 이면 a, 아니면 gcd2(b, a % b)":
    "TODO: a when b == 0, otherwise gcd2(b, a % b)",
  "TODO: k == 0 이면 0, 아니면 k + sumTo(k-1)":
    "TODO: 0 when k == 0, otherwise k + sumTo(k-1)",
  "TODO: k < 2 면 k, 아니면 fib(k-1) + fib(k-2)":
    "TODO: k when k < 2, otherwise fib(k-1) + fib(k-2)",
  "TODO: dp[i] = dp[i-1] + dp[i-2] + dp[i-3] (i-s >= 0 인 경우만)":
    "TODO: dp[i] = dp[i-1] + dp[i-2] + dp[i-3] (only where i-s >= 0)",
  "TODO: 각 금액 x 에 대해 dp[x] = min(dp[x - coin]) + 1":
    "TODO: For each amount x, dp[x] = min(dp[x - coin]) + 1",
  "TODO: solve(0, n-1) 분할정복 최댓값":
    "TODO: solve(0, n-1) — the divide-and-conquer maximum",
  "TODO: 분할정복 합 (long long!)": "TODO: Divide-and-conquer sum (use long long!)",
  "depth == M 이면 출력, 아니면 start..N 골라 재귀":
    "If depth == M print it; otherwise pick from start..N and recurse",
  "depth==M 이면 cnt++, 아니면 start..N 골라 재귀":
    "If depth == M then cnt++; otherwise pick from start..N and recurse",
  "idx==N 이면 chosen>0 && sum==S 일 때 cnt++":
    "At idx == N, increment cnt when chosen > 0 && sum == S",
  "아니면 a[idx] 제외/포함 두 갈래로 재귀":
    "Otherwise recurse down both branches: excluding and including a[idx]",
  "TODO: 인접 리스트 + 1번 BFS, dist[1..N] 출력 (불가 -1)":
    "TODO: Build an adjacency list, BFS from node 1, print dist[1..N] (-1 if unreachable)",
  "TODO: 1번 BFS 후 dist[N] 출력 (불가 -1)":
    "TODO: BFS from node 1, then print dist[N] (-1 if unreachable)",
  "TODO: 1번에서 BFS/DFS 로 퍼지며 방문 정점 수 세기":
    "TODO: Spread out from node 1 with BFS/DFS and count the visited vertices",
  "TODO: 방문 안 한 정점마다 BFS/DFS 시작 → 시작 횟수 = 연결 요소 수":
    "TODO: Start a BFS/DFS at every unvisited vertex — the number of starts is the number of connected components",
  "TODO: 격자 읽고 (0,0)→(R-1,C-1) BFS 칸 수 출력 (불가 0)":
    "TODO: Read the grid and BFS from (0,0) to (R-1,C-1), printing the cell count (0 if unreachable)",
  "TODO: 루트 1 BFS로 깊이 구하고 최댓값 출력 (루트 깊이 0)":
    "TODO: BFS from root 1 to get depths and print the maximum (the root's depth is 0)",
  "TODO: 루트 1 BFS로 부모를 정하고 2..N 부모 출력":
    "TODO: BFS from root 1 to assign parents, then print the parents of 2..N",
  "TODO: 인접 리스트 + 루트 1 BFS로 자식 없는 노드 수 세기":
    "TODO: Build an adjacency list and BFS from root 1, counting the nodes with no children",
  "TODO: 간선 u→v 마다 indeg[v]++, 1..N 출력":
    "TODO: For each edge u→v do indeg[v]++, then print 1..N",
  "TODO: 간선마다 양 끝 정점의 차수를 1씩 늘리고, 1..N 출력":
    "TODO: For each edge increment the degree of both endpoints, then print 1..N",
  "TODO: 진입 차수 0인 정점 개수 출력": "TODO: Print how many vertices have in-degree 0",
  "TODO: 간선 읽고, 진입 0부터 BFS식 제거, 제거 수==n 이면 YES":
    "TODO: Read the edges, peel off in-degree-0 vertices BFS-style, and print YES if the removed count == n",
  "TODO: 명령마다 루트 다르면 합치고 groups--, 매번 groups 출력":
    "TODO: For each command, union when the roots differ and groups--, printing groups every time",
  "TODO: m개 합치기 후 서로 다른 루트 개수 출력":
    "TODO: After m unions, print the number of distinct roots",
  "TODO: 합치며 크기 더하고, 루트 sz 중 최댓값 출력":
    "TODO: Add sizes as you union, then print the largest root size",
  "n개 단어 입력, m개 접두사마다 시작 단어 수 출력":
    "Read n words, then for each of the m prefixes print how many words start with it",
  "n개 등록, m개 질의 1/0 출력": "Register n items, then print 1/0 for each of the m queries",
  "n개 문자열의 공통 접두사 출력": "Print the common prefix of the n strings",
}
