import type { PracticeCluster } from "./types"

export const pyFunctionsCluster: PracticeCluster = {
  id: "py-functions",
  title: "함수 설계",
  emoji: "⚙️",
  description: "함수 정의, 매개변수, 반환값, 재귀, lambda",
  unlockAfter: "34",
  en: {
    title: "Function Design",
    description: "function definition, parameters, return values, recursion, lambda",
  },
  problems: [
    {
      id: "pyfunc-001",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "쉬움",
      title: "절댓값 함수",
      description: `정수 n을 입력받아 절댓값을 출력하는 함수 abs_val(n)을 구현하세요.
내장 함수 abs()를 사용하지 않고 직접 구현해야 합니다.`,
      constraints: "-10000 ≤ n ≤ 10000",
      initialCode: `def abs_val(n):
    # 내장 abs() 사용 금지! if문으로 직접 구현하세요
    pass

n = int(input())
print(abs_val(n))`,
      testCases: [
        { stdin: "5", expectedOutput: "5", label: "양수" },
        { stdin: "-7", expectedOutput: "7", label: "음수" },
        { stdin: "0", expectedOutput: "0", label: "0" },
        { stdin: "-10000", expectedOutput: "10000", label: "최솟값" },
      ],
      hints: [
        "n이 음수면 -n을 반환하고, 그렇지 않으면 n을 그대로 반환하세요.",
        "if n < 0: return -n 형태로 작성하세요.",
      ],
      solutionCode: `def abs_val(n):
    if n < 0:
        return -n
    return n

n = int(input())
print(abs_val(n))`,
      solutionExplanation: "절댓값은 음수면 부호를 바꾸고, 0 이상이면 그대로 반환합니다. if n < 0: return -n 한 줄로 핵심 로직을 표현할 수 있습니다.",
      en: {
        title: "Absolute Value Function",
        description: `Implement a function abs_val(n) that returns the absolute value of the integer n.
You must implement it yourself — do not use the built-in abs() function.`,
        constraints: "-10000 ≤ n ≤ 10000",
        hints: [
          "If n is negative, return -n; otherwise return n as-is.",
          "Write it as: if n < 0: return -n",
        ],
        solutionExplanation: "Absolute value flips the sign for negative numbers and leaves non-negatives unchanged. if n < 0: return -n expresses the core logic in one line.",
      },
      language: "python",
    },
    {
      id: "pyfunc-002",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "쉬움",
      title: "최대공약수 함수",
      description: `두 양의 정수 a, b를 입력받아 최대공약수(GCD)를 출력하는 함수 gcd(a, b)를 구현하세요.
유클리드 호제법을 사용하세요: gcd(a, b) = gcd(b, a % b), gcd(a, 0) = a`,
      constraints: "1 ≤ a, b ≤ 10000",
      initialCode: `def gcd(a, b):
    # 유클리드 호제법: b가 0이면 a 반환, 아니면 gcd(b, a%b)
    pass

a, b = map(int, input().split())
print(gcd(a, b))`,
      testCases: [
        { stdin: "12 8", expectedOutput: "4", label: "기본" },
        { stdin: "7 3", expectedOutput: "1", label: "서로소" },
        { stdin: "100 75", expectedOutput: "25", label: "큰 수" },
        { stdin: "6 6", expectedOutput: "6", label: "같은 수" },
      ],
      hints: [
        "유클리드 알고리즘: b가 0이면 a를 반환합니다.",
        "while b != 0: a, b = b, a % b 형태로 반복할 수 있어요.",
      ],
      solutionCode: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

a, b = map(int, input().split())
print(gcd(a, b))`,
      solutionExplanation: "유클리드 호제법: a를 b로 나눈 나머지가 0이 될 때까지 반복합니다. while b:는 b가 0이 아닌 동안 반복하며, a, b = b, a%b로 동시에 값을 갱신합니다.",
      en: {
        title: "GCD Function",
        description: `Implement a function gcd(a, b) that returns the greatest common divisor of two positive integers a and b.
Use the Euclidean algorithm: gcd(a, b) = gcd(b, a % b), gcd(a, 0) = a`,
        constraints: "1 ≤ a, b ≤ 10000",
        hints: [
          "Euclidean algorithm: if b is 0, return a.",
          "Iteratively: while b != 0: a, b = b, a % b",
        ],
        solutionExplanation: "The Euclidean algorithm repeatedly replaces (a, b) with (b, a % b) until b becomes 0. while b: loops while b is non-zero, and a, b = b, a%b updates both values simultaneously.",
      },
      language: "python",
    },
    {
      id: "pyfunc-003",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "쉬움",
      title: "소수 판별 함수",
      description: `양의 정수 n이 소수인지 판별하는 함수 is_prime(n)을 구현하세요.
소수면 True, 아니면 False를 반환해야 합니다.`,
      constraints: "1 ≤ n ≤ 10000",
      initialCode: `def is_prime(n):
    # 1은 소수가 아닙니다
    # 2부터 n-1까지 나누어 떨어지는 수가 없으면 소수
    pass

n = int(input())
print(is_prime(n))`,
      testCases: [
        { stdin: "7", expectedOutput: "True", label: "소수" },
        { stdin: "4", expectedOutput: "False", label: "합성수" },
        { stdin: "1", expectedOutput: "False", label: "1은 소수 아님" },
        { stdin: "2", expectedOutput: "True", label: "최소 소수" },
        { stdin: "97", expectedOutput: "True", label: "큰 소수" },
      ],
      hints: [
        "n이 1이면 False, n이 2면 True를 반환하세요.",
        "2부터 int(n**0.5)+1까지만 검사하면 효율적입니다.",
        "나누어 떨어지는 수가 있으면 False를 반환하세요.",
      ],
      solutionCode: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

n = int(input())
print(is_prime(n))`,
      solutionExplanation: "소수 판별은 2부터 √n까지만 검사하면 됩니다. n의 약수는 반드시 √n 이하인 것과 쌍을 이루기 때문입니다. n < 2인 경우 소수가 아닙니다.",
      en: {
        title: "Prime Check Function",
        description: `Implement a function is_prime(n) that returns True if n is a prime number, False otherwise.`,
        constraints: "1 ≤ n ≤ 10000",
        hints: [
          "Return False for n == 1, and True for n == 2.",
          "Only check divisors from 2 up to int(n**0.5) + 1 for efficiency.",
          "If any divisor evenly divides n, return False.",
        ],
        solutionExplanation: "You only need to check divisors up to √n, because every factor of n pairs with another factor that is ≤ √n. Numbers less than 2 are not prime.",
      },
      language: "python",
    },
    {
      id: "pyfunc-004",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "쉬움",
      title: "리스트 평균 함수",
      description: `N개의 정수를 입력받아 평균을 소수점 둘째 자리까지 출력하는 함수 average(numbers)를 구현하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `def average(numbers):
    # numbers 리스트의 평균값을 반환하세요
    pass

n = int(input())
numbers = list(map(int, input().split()))
print(f'{average(numbers):.2f}')`,
      testCases: [
        { stdin: "3\n1 2 3", expectedOutput: "2.00", label: "기본" },
        { stdin: "4\n10 20 30 40", expectedOutput: "25.00", label: "큰 수" },
        { stdin: "3\n1 2 4", expectedOutput: "2.33", label: "소수 평균" },
        { stdin: "1\n5", expectedOutput: "5.00", label: "단일 요소" },
      ],
      hints: [
        "sum(numbers) / len(numbers)로 평균을 구할 수 있어요.",
        "함수는 float 값을 반환하고, 출력 시 f-string으로 포맷하세요.",
      ],
      solutionCode: `def average(numbers):
    return sum(numbers) / len(numbers)

n = int(input())
numbers = list(map(int, input().split()))
print(f'{average(numbers):.2f}')`,
      solutionExplanation: "sum()으로 합계를, len()으로 개수를 구해 나누면 평균이 됩니다. :.2f 포맷으로 소수점 2자리까지 출력합니다.",
      en: {
        title: "List Average Function",
        description: `Implement a function average(numbers) that returns the average of a list of integers.
Print the result to 2 decimal places.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000",
        hints: [
          "Use sum(numbers) / len(numbers) to compute the average.",
          "Return a float from the function and format the output with f-string :.2f.",
        ],
        solutionExplanation: "Divide sum() by len() to get the average. The :.2f format specifier prints to 2 decimal places.",
      },
      language: "python",
    },
    // ── 기본값 매개변수 ────────────────────────────────────────────
    {
      id: "pyfunc-DF01",
      cluster: "py-functions",
      unlockAfter: "33",
      difficulty: "쉬움",
      title: "기본값 매개변수",
      description: `**기본값 매개변수(default parameter)** 를 사용해 함수를 작성하세요.

\`greet(name, greeting="Hello")\` 함수를 작성하세요:
- greeting이 주어지면 \`{greeting}, {name}!\`
- 주어지지 않으면 \`Hello, {name}!\` (기본값 사용)

T개 줄 입력: 단어가 1개면 이름만, 2개면 인사말+이름 순으로 주어집니다.

**기본값 매개변수:** \`def f(x, y=10):\` — y를 생략하면 자동으로 10이 사용됩니다.`,
      constraints: "1 ≤ T ≤ 5",
      initialCode: `def greet(name, greeting="Hello"):
    # greeting, name을 조합해 출력하는 함수

t = int(input())
for _ in range(t):
    parts = input().split()
    if len(parts) == 1:
        print(greet(parts[0]))
    else:
        print(greet(parts[1], parts[0]))`,
      testCases: [
        { stdin: "3\nAlice\nHi Bob\nBye Charlie", expectedOutput: "Hello, Alice!\nHi, Bob!\nBye, Charlie!", label: "기본" },
        { stdin: "1\nWorld", expectedOutput: "Hello, World!", label: "기본값만" },
        { stdin: "2\nGoodmorning Dave\nEve", expectedOutput: "Goodmorning, Dave!\nHello, Eve!", label: "혼합" },
      ],
      hints: [
        "def greet(name, greeting='Hello'): return f'{greeting}, {name}!'",
        "기본값 매개변수는 뒤쪽에 위치해야 합니다. def f(x=1, y)는 오류 — 항상 def f(y, x=1)처럼.",
      ],
      solutionCode: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

t = int(input())
for _ in range(t):
    parts = input().split()
    if len(parts) == 1:
        print(greet(parts[0]))
    else:
        print(greet(parts[1], parts[0]))`,
      solutionExplanation: "기본값 매개변수는 def f(x, y=기본값) 처럼 선언합니다. 호출 시 y를 생략하면 기본값이 사용됩니다. 기본값이 있는 매개변수는 반드시 뒤쪽에 위치해야 합니다.",
      language: "python",
      en: {
        title: "Default Parameters",
        description: `Write a function using **default parameter** values.\n\nWrite \`greet(name, greeting="Hello")\`:\n- If greeting is provided: \`{greeting}, {name}!\`\n- If omitted: \`Hello, {name}!\` (uses default)\n\nT lines of input: 1 word = name only, 2 words = greeting + name.\n\n**Default parameters:** \`def f(x, y=10):\` — y defaults to 10 if not provided.`,
        constraints: "1 ≤ T ≤ 5",
        hints: [
          "def greet(name, greeting='Hello'): return f'{greeting}, {name}!'",
          "Default parameters must come last: def f(x=1, y) is invalid — always write def f(y, x=1).",
        ],
        solutionExplanation: "Default parameters are declared as def f(x, y=default). If y is omitted in the call, the default is used. Parameters with defaults must always come after those without.",
      },
    },
    // ── 여러 반환값 ────────────────────────────────────────────────
    {
      id: "pyfunc-MR01",
      cluster: "py-functions",
      unlockAfter: "33",
      difficulty: "쉬움",
      title: "여러 값 반환",
      description: `파이썬 함수는 **여러 값을 한 번에 반환**할 수 있습니다. 이를 활용해 함수를 작성하세요.

\`stats(nums)\` 함수를 작성하세요 — 리스트를 받아 **최솟값, 최댓값, 합계를 동시에 반환**합니다.

N개의 정수를 입력받아 stats() 결과를 한 줄에 출력하세요: \`최솟값 최댓값 합계\`

**여러 반환:** \`return a, b, c\` → 호출 쪽에서 \`x, y, z = f()\` 로 받습니다.`,
      constraints: "1 ≤ N ≤ 10",
      initialCode: `def stats(nums):
    # 최솟값, 최댓값, 합계를 동시에 반환하세요
    return  # return a, b, c 형태

n = int(input())
nums = list(map(int, input().split()))
mn, mx, total = stats(nums)
print(mn, mx, total)`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "1 5 14", label: "기본" },
        { stdin: "3\n-2 0 2", expectedOutput: "-2 2 0", label: "음수 포함" },
        { stdin: "1\n7", expectedOutput: "7 7 7", label: "단일" },
      ],
      hints: [
        "return min(nums), max(nums), sum(nums) 처럼 쉼표로 구분해 반환합니다.",
        "mn, mx, total = stats(nums) 처럼 여러 변수에 한 번에 받을 수 있어요 (unpacking).",
      ],
      solutionCode: `def stats(nums):
    return min(nums), max(nums), sum(nums)

n = int(input())
nums = list(map(int, input().split()))
mn, mx, total = stats(nums)
print(mn, mx, total)`,
      solutionExplanation: "return a, b, c는 실제로 튜플 (a, b, c)를 반환합니다. 받는 쪽에서 x, y, z = f()로 unpack하면 각 변수에 자동으로 배정됩니다.",
      language: "python",
      en: {
        title: "Multiple Return Values",
        description: `Python functions can **return multiple values at once**. Use this to write a function.\n\nWrite \`stats(nums)\` — takes a list and **returns minimum, maximum, and sum simultaneously**.\n\nInput N integers and print the stats() result on one line: \`min max sum\`\n\n**Multiple return:** \`return a, b, c\` → caller receives with \`x, y, z = f()\``,
        constraints: "1 ≤ N ≤ 10",
        hints: [
          "return min(nums), max(nums), sum(nums) — separate values with commas.",
          "mn, mx, total = stats(nums) receives all values at once (unpacking).",
        ],
        solutionExplanation: "return a, b, c actually returns a tuple (a, b, c). The caller can unpack with x, y, z = f(), assigning each value to its variable.",
      },
    },
    {
      id: "pyfunc-005",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "재귀 팩토리얼",
      description: `정수 n을 입력받아 n! (팩토리얼)을 재귀 함수로 계산하여 출력하세요.
반복문(for/while)을 사용하지 않고 재귀로 구현해야 합니다.`,
      constraints: "0 ≤ n ≤ 12",
      initialCode: `def factorial(n):
    # 재귀 기저 조건: n이 0 또는 1이면 1 반환
    # 재귀 단계: n * factorial(n-1)
    pass

n = int(input())
print(factorial(n))`,
      testCases: [
        { stdin: "0", expectedOutput: "1", label: "0!" },
        { stdin: "1", expectedOutput: "1", label: "1!" },
        { stdin: "5", expectedOutput: "120", label: "5!" },
        { stdin: "10", expectedOutput: "3628800", label: "10!" },
        { stdin: "12", expectedOutput: "479001600", label: "12!" },
      ],
      hints: [
        "재귀의 기저 조건: n <= 1일 때 1을 반환합니다.",
        "재귀 단계: return n * factorial(n - 1)",
      ],
      solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

n = int(input())
print(factorial(n))`,
      solutionExplanation: "팩토리얼의 재귀 정의: 0! = 1, n! = n × (n-1)!. 기저 조건(n <= 1)이 없으면 무한 재귀가 발생합니다. n이 0일 때도 1을 반환해야 합니다.",
      en: {
        title: "Recursive Factorial",
        description: `Given integer n, calculate n! (factorial) using a recursive function.
You must use recursion — no for/while loops allowed.`,
        constraints: "0 ≤ n ≤ 12",
        hints: [
          "Base case: return 1 when n is 0 or 1.",
          "Recursive step: return n * factorial(n - 1)",
        ],
        solutionExplanation: "Recursive factorial definition: 0! = 1, n! = n × (n-1)!. Without a base case (n <= 1), the recursion runs forever. Note that 0! must also return 1.",
      },
      language: "python",
    },
    {
      id: "pyfunc-006",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "재귀 피보나치",
      description: `정수 n을 입력받아 n번째 피보나치 수를 재귀 함수로 계산하여 출력하세요.
(fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2))
메모이제이션 없이 순수 재귀로 구현하세요.`,
      constraints: "0 ≤ n ≤ 20",
      initialCode: `def fib(n):
    # 기저 조건: n이 0이면 0, n이 1이면 1
    # 재귀 단계: fib(n-1) + fib(n-2)
    pass

n = int(input())
print(fib(n))`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "fib(0)" },
        { stdin: "1", expectedOutput: "1", label: "fib(1)" },
        { stdin: "6", expectedOutput: "8", label: "fib(6)" },
        { stdin: "10", expectedOutput: "55", label: "fib(10)" },
        { stdin: "20", expectedOutput: "6765", label: "fib(20)" },
      ],
      hints: [
        "기저 조건: n == 0이면 0, n == 1이면 1을 반환하세요.",
        "return fib(n-1) + fib(n-2)로 재귀 호출합니다.",
      ],
      solutionCode: `def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

n = int(input())
print(fib(n))`,
      solutionExplanation: "피보나치 수열의 재귀 정의를 그대로 구현합니다. n이 클수록 중복 계산이 많아져 느려집니다. 이를 해결하려면 메모이제이션(pyfunc-014)이 필요합니다.",
      en: {
        title: "Recursive Fibonacci",
        description: `Given integer n, compute the nth Fibonacci number using a recursive function.
(fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2))
Implement with pure recursion — no memoization.`,
        constraints: "0 ≤ n ≤ 20",
        hints: [
          "Base cases: return 0 when n == 0, return 1 when n == 1.",
          "Recursive step: return fib(n-1) + fib(n-2)",
        ],
        solutionExplanation: "Directly implements the recursive Fibonacci definition. For larger n, redundant calls grow exponentially — memoization (pyfunc-014) is needed to fix that.",
      },
      language: "python",
    },
    {
      id: "pyfunc-007",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "하노이탑 이동 횟수",
      description: `원판 n개를 이동하는 하노이탑 문제에서 최소 이동 횟수를 재귀 함수로 계산하세요.
공식: hanoi(n) = 2^n - 1 (재귀로 구현해야 합니다)`,
      constraints: "1 ≤ n ≤ 20",
      initialCode: `def hanoi(n):
    # 원판 1개: 이동 1번
    # n개: 2 * hanoi(n-1) + 1
    pass

n = int(input())
print(hanoi(n))`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1개" },
        { stdin: "2", expectedOutput: "3", label: "2개" },
        { stdin: "3", expectedOutput: "7", label: "3개" },
        { stdin: "10", expectedOutput: "1023", label: "10개" },
        { stdin: "20", expectedOutput: "1048575", label: "20개" },
      ],
      hints: [
        "기저 조건: n == 1이면 1을 반환합니다.",
        "n개 하노이 = 위에 n-1개 이동 + 맨 아래 1개 이동 + 다시 n-1개 이동 = 2 * hanoi(n-1) + 1",
      ],
      solutionCode: `def hanoi(n):
    if n == 1:
        return 1
    return 2 * hanoi(n - 1) + 1

n = int(input())
print(hanoi(n))`,
      solutionExplanation: "n개 원판 이동은 (n-1)개를 보조 기둥으로 이동 + 맨 아래 이동 + (n-1)개를 목적지로 이동 = 2×hanoi(n-1)+1. 전개하면 2^n - 1이 됩니다.",
      en: {
        title: "Tower of Hanoi Move Count",
        description: `Compute the minimum number of moves to solve the Tower of Hanoi problem for n discs using a recursive function.
Formula: hanoi(n) = 2^n - 1 (implement with recursion)`,
        constraints: "1 ≤ n ≤ 20",
        hints: [
          "Base case: return 1 when n == 1.",
          "Move n discs = move top n-1 discs to aux + move bottom disc + move n-1 discs to target = 2 * hanoi(n-1) + 1",
        ],
        solutionExplanation: "Moving n discs = move n-1 to auxiliary + move bottom disc + move n-1 to target = 2×hanoi(n-1)+1. This expands to 2^n - 1.",
      },
      language: "python",
    },
    {
      id: "pyfunc-008",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "map으로 제곱 변환",
      description: `N개의 정수를 입력받아 각 수를 제곱한 결과를 공백으로 구분하여 출력하세요.
map()과 lambda를 함께 사용하세요.`,
      constraints: "1 ≤ N ≤ 10, 0 ≤ 각 정수 ≤ 100",
      initialCode: `# N개의 정수를 입력받아 각각 제곱하여 공백으로 출력하세요
# map과 lambda를 사용하세요
n = int(input())
numbers = list(map(int, input().split()))
# map과 lambda로 제곱 변환 후 출력하세요`,
      testCases: [
        { stdin: "3\n1 2 3", expectedOutput: "1 4 9", label: "기본" },
        { stdin: "4\n2 3 4 5", expectedOutput: "4 9 16 25", label: "연속수" },
        { stdin: "1\n7", expectedOutput: "49", label: "단일" },
        { stdin: "3\n0 5 10", expectedOutput: "0 25 100", label: "0 포함" },
      ],
      hints: [
        "map(lambda x: x**2, numbers)로 각 요소를 제곱합니다.",
        "print(*결과)로 공백 구분하여 출력하거나, ' '.join(map(str, 결과))를 사용하세요.",
      ],
      solutionCode: `n = int(input())
numbers = list(map(int, input().split()))
result = list(map(lambda x: x**2, numbers))
print(*result)`,
      solutionExplanation: "map(lambda x: x**2, numbers)는 각 요소에 람다 함수를 적용합니다. print(*result)는 리스트를 언패킹해 공백으로 출력합니다.",
      en: {
        title: "Square Transform with map",
        description: `Given N integers, print each number squared, separated by spaces.
Use map() and lambda together.`,
        constraints: "1 ≤ N ≤ 10, 0 ≤ each integer ≤ 100",
        hints: [
          "Use map(lambda x: x**2, numbers) to square each element.",
          "Use print(*result) to print space-separated, or ' '.join(map(str, result)).",
        ],
        solutionExplanation: "map(lambda x: x**2, numbers) applies the lambda to each element. print(*result) unpacks the list and prints with spaces.",
      },
      language: "python",
    },
    {
      id: "pyfunc-009",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "filter로 짝수 추출",
      description: `N개의 정수를 입력받아 짝수만 걸러서 공백으로 구분하여 출력하세요.
filter()와 lambda를 함께 사용하세요. 짝수가 없으면 아무것도 출력하지 않습니다.`,
      constraints: "1 ≤ N ≤ 10, 0 ≤ 각 정수 ≤ 100",
      initialCode: `# filter와 lambda로 짝수만 추출하세요
n = int(input())
numbers = list(map(int, input().split()))
# filter와 lambda로 짝수 필터링 후 출력하세요`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "2 4", label: "혼합" },
        { stdin: "4\n2 4 6 8", expectedOutput: "2 4 6 8", label: "모두 짝수" },
        { stdin: "3\n1 3 5", expectedOutput: "", label: "짝수 없음" },
        { stdin: "3\n0 1 2", expectedOutput: "0 2", label: "0 포함" },
      ],
      hints: [
        "filter(lambda x: x % 2 == 0, numbers)로 짝수만 걸러냅니다.",
        "결과가 비어있을 수 있으니 print(*result) 또는 ' '.join(...)을 사용하세요.",
      ],
      solutionCode: `n = int(input())
numbers = list(map(int, input().split()))
result = list(filter(lambda x: x % 2 == 0, numbers))
print(*result)`,
      solutionExplanation: "filter(함수, 이터러블)은 함수가 True를 반환하는 요소만 남깁니다. lambda x: x % 2 == 0은 짝수 조건입니다. print(*[])는 빈 줄을 출력합니다.",
      en: {
        title: "Extract Even Numbers with filter",
        description: `Given N integers, print only the even numbers separated by spaces.
Use filter() and lambda together. Print nothing if there are no even numbers.`,
        constraints: "1 ≤ N ≤ 10, 0 ≤ each integer ≤ 100",
        hints: [
          "Use filter(lambda x: x % 2 == 0, numbers) to keep only even numbers.",
          "The result may be empty, so print(*result) or ' '.join(...) is fine.",
        ],
        solutionExplanation: "filter(fn, iterable) keeps only elements for which fn returns True. lambda x: x % 2 == 0 is the even-number condition. print(*[]) outputs an empty line.",
      },
      language: "python",
    },
    {
      id: "pyfunc-010",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "보통",
      title: "클로저 카운터",
      description: `make_counter() 함수를 구현하세요. 이 함수는 내부 카운터를 가진 함수를 반환합니다.
반환된 함수를 호출할 때마다 카운터가 1씩 증가하고 현재 값을 반환합니다.
N을 입력받아 counter를 N번 호출한 후의 카운트 값을 출력하세요.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `def make_counter():
    # 클로저 패턴: count 변수를 내부 함수가 캡처하도록 구현하세요
    count = 0
    def counter():
        nonlocal count
        # count를 1 증가시키고 반환하세요
        pass
    return counter

n = int(input())
counter = make_counter()
for _ in range(n):
    result = counter()
print(result)`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1번 호출" },
        { stdin: "3", expectedOutput: "3", label: "3번 호출" },
        { stdin: "10", expectedOutput: "10", label: "10번 호출" },
        { stdin: "100", expectedOutput: "100", label: "100번 호출" },
      ],
      hints: [
        "nonlocal count로 외부 함수의 변수를 수정할 수 있습니다.",
        "count += 1 후 return count를 사용하세요.",
        "클로저: 내부 함수가 외부 함수의 변수를 '기억'하는 패턴입니다.",
      ],
      solutionCode: `def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

n = int(input())
counter = make_counter()
for _ in range(n):
    result = counter()
print(result)`,
      solutionExplanation: "클로저는 외부 함수의 변수를 내부 함수가 기억하는 패턴입니다. nonlocal 키워드 없이 count += 1을 하면 UnboundLocalError가 발생합니다.",
      en: {
        title: "Closure Counter",
        description: `Implement make_counter(), a function that returns an inner function with its own counter.
Each call to the returned function increments the counter by 1 and returns the current value.
Read N and call counter N times, then print the final count.`,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "Use nonlocal count to modify the outer function's variable from inside the inner function.",
          "count += 1 then return count.",
          "Closure: the inner function 'remembers' the variable from the enclosing scope.",
        ],
        solutionExplanation: "A closure lets the inner function remember the outer function's variable. Without nonlocal, count += 1 inside the inner function causes an UnboundLocalError.",
      },
      language: "python",
    },
    {
      id: "pyfunc-011",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "어려움",
      title: "가변 인자 합산",
      description: `*args를 사용하여 임의 개수의 숫자를 받아 합계를 반환하는 함수 total(*args)를 구현하세요.
첫 줄에 N, 두 번째 줄에 N개의 정수가 주어집니다.`,
      constraints: "1 ≤ N ≤ 20, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `def total(*args):
    # *args는 임의 개수의 인자를 튜플로 받습니다
    # args의 모든 원소 합을 반환하세요
    pass

n = int(input())
numbers = list(map(int, input().split()))
print(total(*numbers))`,
      testCases: [
        { stdin: "3\n1 2 3", expectedOutput: "6", label: "3개" },
        { stdin: "1\n5", expectedOutput: "5", label: "1개" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15", label: "5개" },
        { stdin: "3\n-1 0 1", expectedOutput: "0", label: "음수 포함" },
      ],
      hints: [
        "*args는 함수 내부에서 튜플처럼 사용할 수 있습니다.",
        "return sum(args)로 간단히 합산할 수 있어요.",
        "total(*numbers)는 리스트를 언패킹하여 각 요소를 인자로 전달합니다.",
      ],
      solutionCode: `def total(*args):
    return sum(args)

n = int(input())
numbers = list(map(int, input().split()))
print(total(*numbers))`,
      solutionExplanation: "*args는 위치 인자를 개수 제한 없이 튜플로 받습니다. 호출 시 *numbers로 리스트를 언패킹하여 각 원소를 개별 인자로 전달합니다.",
      en: {
        title: "Variadic Sum",
        description: `Implement a function total(*args) that accepts any number of numbers and returns their sum.
Read N integers and call total(*numbers).`,
        constraints: "1 ≤ N ≤ 20, -1000 ≤ each integer ≤ 1000",
        hints: [
          "*args collects all positional arguments as a tuple inside the function.",
          "return sum(args) is all you need.",
          "Calling total(*numbers) unpacks the list and passes each element as a separate argument.",
        ],
        solutionExplanation: "*args collects positional arguments into a tuple with no limit on count. Calling with *numbers unpacks the list so each element becomes an individual argument.",
      },
      language: "python",
    },
    {
      id: "pyfunc-012",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "어려움",
      title: "재귀 이진탐색",
      description: `오름차순으로 정렬된 N개의 정수에서 target을 재귀 이진탐색으로 찾아 인덱스를 출력하세요.
찾지 못하면 -1을 출력합니다.`,
      constraints: "1 ≤ N ≤ 100, 배열은 오름차순 정렬, 중복 없음",
      initialCode: `def binary_search(arr, target, low, high):
    # 기저 조건: low > high이면 -1 반환
    # mid 계산 후 target과 비교
    pass

n = int(input())
arr = list(map(int, input().split()))
target = int(input())
print(binary_search(arr, target, 0, n - 1))`,
      testCases: [
        { stdin: "5\n1 3 5 7 9\n5", expectedOutput: "2", label: "중간 탐색" },
        { stdin: "5\n1 3 5 7 9\n1", expectedOutput: "0", label: "첫 번째" },
        { stdin: "5\n1 3 5 7 9\n9", expectedOutput: "4", label: "마지막" },
        { stdin: "5\n1 3 5 7 9\n4", expectedOutput: "-1", label: "없는 값" },
        { stdin: "1\n42\n42", expectedOutput: "0", label: "단일 요소" },
      ],
      hints: [
        "mid = (low + high) // 2로 중간 인덱스를 계산합니다.",
        "arr[mid] == target이면 mid 반환, < target이면 오른쪽(low=mid+1), > target이면 왼쪽(high=mid-1) 재귀 호출",
        "기저 조건: low > high이면 -1을 반환합니다.",
      ],
      solutionCode: `def binary_search(arr, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    else:
        return binary_search(arr, target, low, mid - 1)

n = int(input())
arr = list(map(int, input().split()))
target = int(input())
print(binary_search(arr, target, 0, n - 1))`,
      solutionExplanation: "이진탐색은 매 단계에서 탐색 범위를 절반으로 줄입니다. O(log n)의 시간복잡도를 가집니다. 재귀 호출마다 low 또는 high를 갱신하여 무한루프를 방지합니다.",
      en: {
        title: "Recursive Binary Search",
        description: `Given a sorted array of N distinct integers, use recursive binary search to find the index of target.
Print the index, or -1 if not found.`,
        constraints: "1 ≤ N ≤ 100, array is sorted in ascending order, no duplicates",
        hints: [
          "Compute mid = (low + high) // 2.",
          "If arr[mid] == target return mid; if arr[mid] < target recurse right (low=mid+1); else recurse left (high=mid-1).",
          "Base case: return -1 when low > high.",
        ],
        solutionExplanation: "Binary search halves the search range each step, giving O(log n). Each recursive call updates either low or high to prevent infinite recursion.",
      },
      language: "python",
    },
    {
      id: "pyfunc-013",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "어려움",
      title: "데코레이터 이해",
      description: `함수 실행 전후에 메시지를 출력하는 데코레이터 log_call을 구현하세요.
데코레이팅된 함수 greet(name)을 호출하면 아래 형식으로 출력해야 합니다:

\`\`\`
함수 호출 시작
Hello, {name}!
함수 호출 완료
\`\`\``,
      constraints: "name은 영문자/한글, 길이 ≤ 20",
      initialCode: `def log_call(func):
    def wrapper(*args, **kwargs):
        print("함수 호출 시작")
        # func 호출 후
        # "함수 호출 완료" 출력
        pass
    return wrapper

@log_call
def greet(name):
    print(f"Hello, {name}!")

name = input()
greet(name)`,
      testCases: [
        { stdin: "Alice", expectedOutput: "함수 호출 시작\nHello, Alice!\n함수 호출 완료", label: "영문" },
        { stdin: "철수", expectedOutput: "함수 호출 시작\nHello, 철수!\n함수 호출 완료", label: "한글" },
      ],
      hints: [
        "wrapper 함수 안에서 func(*args, **kwargs)를 호출합니다.",
        "func 호출 전에 '시작', 호출 후에 '완료'를 출력하세요.",
        "@log_call은 greet = log_call(greet)와 같습니다.",
      ],
      solutionCode: `def log_call(func):
    def wrapper(*args, **kwargs):
        print("함수 호출 시작")
        func(*args, **kwargs)
        print("함수 호출 완료")
    return wrapper

@log_call
def greet(name):
    print(f"Hello, {name}!")

name = input()
greet(name)`,
      solutionExplanation: "데코레이터는 함수를 감싸는 함수입니다. @log_call은 greet = log_call(greet)와 동일합니다. wrapper가 func 앞뒤에 추가 동작을 삽입합니다.",
      en: {
        title: "Understanding Decorators",
        description: `Implement a decorator log_call that prints a message before and after the decorated function runs.
When the decorated function greet(name) is called, the output should be:

\`\`\`
함수 호출 시작
Hello, {name}!
함수 호출 완료
\`\`\``,
        constraints: "name is alphabetic or Korean, length ≤ 20",
        hints: [
          "Call func(*args, **kwargs) inside the wrapper function.",
          "Print '시작' before the call and '완료' after.",
          "@log_call is equivalent to greet = log_call(greet).",
        ],
        solutionExplanation: "A decorator is a function that wraps another function. @log_call is syntactic sugar for greet = log_call(greet). The wrapper inserts extra behavior before and after func.",
      },
      language: "python",
    },
    {
      id: "pyfunc-014",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "어려움",
      title: "메모이제이션 피보나치",
      description: `딕셔너리 캐시를 사용한 메모이제이션으로 n번째 피보나치 수를 계산하세요.
(fib(0) = 0, fib(1) = 1)`,
      constraints: "0 ≤ n ≤ 50",
      initialCode: `cache = {}

def fib(n):
    # cache에 결과가 있으면 바로 반환
    # 없으면 계산 후 cache에 저장
    pass

n = int(input())
print(fib(n))`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "fib(0)" },
        { stdin: "10", expectedOutput: "55", label: "fib(10)" },
        { stdin: "30", expectedOutput: "832040", label: "fib(30)" },
        { stdin: "50", expectedOutput: "12586269025", label: "fib(50)" },
      ],
      hints: [
        "함수 시작 시 if n in cache: return cache[n]으로 캐시를 확인하세요.",
        "계산 결과를 cache[n] = 결과로 저장한 후 반환합니다.",
        "또는 @functools.lru_cache(maxsize=None)를 사용할 수 있어요.",
      ],
      solutionCode: `cache = {}

def fib(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        cache[n] = n
        return n
    cache[n] = fib(n - 1) + fib(n - 2)
    return cache[n]

n = int(input())
print(fib(n))`,
      solutionExplanation: "메모이제이션은 이미 계산한 결과를 캐시에 저장해 중복 계산을 방지합니다. 순수 재귀 fib(50)은 매우 느리지만 메모이제이션으로 O(n)에 해결됩니다.",
      en: {
        title: "Memoized Fibonacci",
        description: `Compute the nth Fibonacci number using memoization with a dictionary cache.
(fib(0) = 0, fib(1) = 1)`,
        constraints: "0 ≤ n ≤ 50",
        hints: [
          "At the start of the function, check if n in cache: return cache[n].",
          "Store the result as cache[n] = result before returning.",
          "Alternatively, you can use @functools.lru_cache(maxsize=None).",
        ],
        solutionExplanation: "Memoization stores previously computed results in a cache to avoid redundant work. Pure recursive fib(50) is extremely slow, but memoization solves it in O(n).",
      },
      language: "python",
    },
    {
      id: "pyfunc-015",
      cluster: "py-functions",
      unlockAfter: "34",
      difficulty: "어려움",
      title: "함수형 파이프라인",
      description: `N개의 정수를 입력받아 다음 파이프라인을 적용한 결과를 출력하세요:
1단계: 홀수만 걸러내기 (filter)
2단계: 각 수를 제곱 (map)
3단계: 모두 합산 (sum)`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ 각 정수 ≤ 100",
      initialCode: `# filter → map → sum 파이프라인을 한 줄로 작성하세요
n = int(input())
numbers = list(map(int, input().split()))
# 홀수만 걸러 제곱한 뒤 합산하세요`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "35", label: "기본 (1+9+25=35)" },
        { stdin: "4\n2 4 6 8", expectedOutput: "0", label: "짝수만 → 0" },
        { stdin: "3\n1 3 5", expectedOutput: "35", label: "홀수만 (1+9+25)" },
        { stdin: "1\n7", expectedOutput: "49", label: "단일 홀수" },
      ],
      hints: [
        "filter(lambda x: x % 2 != 0, numbers)로 홀수를 추출합니다.",
        "map(lambda x: x**2, ...)로 제곱합니다.",
        "sum(map(lambda x: x**2, filter(lambda x: x % 2 != 0, numbers)))로 한 줄로 작성할 수 있어요.",
      ],
      solutionCode: `n = int(input())
numbers = list(map(int, input().split()))
result = sum(map(lambda x: x**2, filter(lambda x: x % 2 != 0, numbers)))
print(result)`,
      solutionExplanation: "함수형 파이프라인: filter로 홀수를 선택 → map으로 각각 제곱 → sum으로 합산. 안쪽 함수 결과가 바깥 함수의 입력이 됩니다. 리스트 컴프리헨션으로도 작성 가능합니다.",
      en: {
        title: "Functional Pipeline",
        description: `Given N integers, apply the following pipeline and print the result:
Step 1: Keep only odd numbers (filter)
Step 2: Square each number (map)
Step 3: Sum everything (sum)`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ each integer ≤ 100",
        hints: [
          "filter(lambda x: x % 2 != 0, numbers) keeps odd numbers.",
          "map(lambda x: x**2, ...) squares each element.",
          "sum(map(lambda x: x**2, filter(lambda x: x % 2 != 0, numbers))) chains everything in one line.",
        ],
        solutionExplanation: "Functional pipeline: filter selects odd numbers → map squares each → sum adds them all. The inner function's output feeds into the outer function. A list comprehension can express the same logic.",
      },
      language: "python",
    },
  ],
}
