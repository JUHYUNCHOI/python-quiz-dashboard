import type { PracticeCluster } from "./types"

export const pyIoCluster: PracticeCluster = {
  id: "py-io",
  title: "입출력 기초",
  emoji: "⌨️",
  description: "input(), print(), 타입변환, 포맷 출력",
  unlockAfter: "10",
  en: {
    title: "Input / Output Basics",
    description: "input(), print(), type conversion, and formatted output",
  },
  problems: [
    {
      id: "pyio-001",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "쉬움",
      title: "이름 출력",
      description: `이름을 입력받아 'Hello, {이름}!' 형식으로 출력하세요.`,
      constraints: "이름은 영문자/한글로만 구성, 길이 ≤ 20",
      initialCode: `# 이름을 입력받아 Hello, {이름}! 형식으로 출력하세요
name = input()
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "Alice", expectedOutput: "Hello, Alice!", label: "영문" },
        { stdin: "철수", expectedOutput: "Hello, 철수!", label: "한글" },
        { stdin: "Bob123", expectedOutput: "Hello, Bob123!", label: "숫자 포함" },
      ],
      hints: [
        "f-string을 사용하세요: f'Hello, {name}!'",
        "print() 함수로 결과를 출력합니다.",
      ],
      solutionCode: `name = input()
print(f'Hello, {name}!')`,
      solutionExplanation: "f-string으로 변수를 문자열에 삽입합니다. f'...' 안에서 {변수명}으로 값을 넣을 수 있습니다.",
      en: {
        title: "Print a Name",
        description: `Read a name and print it in the format 'Hello, {name}!'`,
        constraints: "Name consists of letters only, length ≤ 20",
        hints: [
          "Use an f-string: f'Hello, {name}!'",
          "Use the print() function to output the result.",
        ],
        solutionExplanation: "f-strings let you embed variables inside a string. Use {variable_name} inside f'...' to insert the value.",
      },
      language: "python",
    },
    {
      id: "pyio-002",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "쉬움",
      title: "두 정수의 합",
      description: `두 줄에 걸쳐 정수 A, B가 주어질 때, 두 수의 합을 출력하세요.`,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `# 두 정수를 각각 한 줄씩 입력받아 합을 출력하세요
a = int(input())
b = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3\n5", expectedOutput: "8", label: "기본" },
        { stdin: "-3\n7", expectedOutput: "4", label: "음수 포함" },
        { stdin: "0\n0", expectedOutput: "0", label: "둘 다 0" },
        { stdin: "1000\n-1000", expectedOutput: "0", label: "최대값" },
      ],
      hints: [
        "input()은 문자열을 반환합니다. int()로 감싸서 정수로 변환하세요.",
        "print(a + b)로 합을 출력합니다.",
      ],
      solutionCode: `a = int(input())
b = int(input())
print(a + b)`,
      solutionExplanation: "input()은 항상 문자열을 반환하므로 int()로 변환이 필요합니다. 두 정수를 더한 결과를 print()로 출력합니다.",
      en: {
        title: "Sum of Two Integers",
        description: `Given two integers A and B, each on a separate line, print their sum.`,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: [
          "input() returns a string. Wrap it with int() to convert to an integer.",
          "Use print(a + b) to output the sum.",
        ],
        solutionExplanation: "input() always returns a string, so int() conversion is required. Add the two integers and print the result.",
      },
      language: "python",
    },
    {
      id: "pyio-003",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "쉬움",
      title: "세 수의 평균",
      description: `한 줄에 공백으로 구분된 세 정수가 주어질 때, 평균을 소수점 둘째 자리까지 출력하세요.`,
      constraints: "0 ≤ 각 정수 ≤ 1000",
      initialCode: `# 한 줄에 세 정수가 공백으로 주어집니다
# 평균을 소수점 2자리까지 출력하세요
a, b, c = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1 2 3", expectedOutput: "2.00", label: "정수 평균" },
        { stdin: "10 20 30", expectedOutput: "20.00", label: "큰 수" },
        { stdin: "1 2 4", expectedOutput: "2.33", label: "소수 평균" },
        { stdin: "0 0 0", expectedOutput: "0.00", label: "모두 0" },
      ],
      hints: [
        "map(int, input().split())으로 공백으로 구분된 여러 정수를 한 번에 읽을 수 있어요.",
        "print(f'{평균:.2f}')로 소수점 2자리까지 출력할 수 있습니다.",
      ],
      solutionCode: `a, b, c = map(int, input().split())
avg = (a + b + c) / 3
print(f'{avg:.2f}')`,
      solutionExplanation: "map(int, input().split())은 공백으로 나눈 문자열 각각을 int로 변환합니다. f-string의 :.2f 형식 지정자로 소수점 2자리를 출력합니다.",
      en: {
        title: "Average of Three Numbers",
        description: `Given three integers separated by spaces on one line, print their average to 2 decimal places.`,
        constraints: "0 ≤ each integer ≤ 1000",
        hints: [
          "map(int, input().split()) reads multiple integers separated by spaces in one line.",
          "Use print(f'{avg:.2f}') to print to 2 decimal places.",
        ],
        solutionExplanation: "map(int, input().split()) splits the input by spaces and converts each part to int. The :.2f format specifier in an f-string prints to 2 decimal places.",
      },
      language: "python",
    },
    {
      id: "pyio-004",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "쉬움",
      title: "원의 넓이",
      description: `원의 반지름을 입력받아 넓이를 소수점 둘째 자리까지 출력하세요.
π = 3.14159를 사용하세요.`,
      constraints: "1 ≤ 반지름 ≤ 1000 (정수)",
      initialCode: `# 반지름을 입력받아 원의 넓이를 소수점 2자리까지 출력하세요
# π = 3.14159 사용
r = int(input())
PI = 3.14159
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1", expectedOutput: "3.14", label: "반지름 1" },
        { stdin: "5", expectedOutput: "78.54", label: "반지름 5" },
        { stdin: "10", expectedOutput: "314.16", label: "반지름 10" },
        { stdin: "2", expectedOutput: "12.57", label: "반지름 2" },
      ],
      hints: [
        "원의 넓이 공식은 π × r²입니다.",
        "r ** 2 또는 r * r로 제곱을 구할 수 있어요.",
        "print(f'{area:.2f}')로 소수점 2자리까지 출력하세요.",
      ],
      solutionCode: `r = int(input())
PI = 3.14159
area = PI * r * r
print(f'{area:.2f}')`,
      solutionExplanation: "넓이 = π × r²를 계산합니다. f-string의 :.2f로 소수점 2자리에서 반올림하여 출력합니다.",
      en: {
        title: "Area of a Circle",
        description: `Given the radius of a circle, print its area to 2 decimal places.\nUse π = 3.14159.`,
        constraints: "1 ≤ radius ≤ 1000 (integer)",
        hints: [
          "The area formula is π × r².",
          "Use r ** 2 or r * r to compute the square.",
          "Use print(f'{area:.2f}') to print to 2 decimal places.",
        ],
        solutionExplanation: "Compute area = π × r². The :.2f format specifier rounds and prints to 2 decimal places.",
      },
      language: "python",
    },
    {
      id: "pyio-005",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "보통",
      title: "섭씨→화씨 변환",
      description: `섭씨 온도를 입력받아 화씨 온도로 변환하여 소수점 첫째 자리까지 출력하세요.

변환 공식: F = C × 9/5 + 32`,
      constraints: "-100 ≤ C ≤ 100 (실수 입력 가능)",
      initialCode: `# 섭씨 온도를 입력받아 화씨로 변환하세요
# F = C * 9/5 + 32
c = float(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "0", expectedOutput: "32.0", label: "물 어는점" },
        { stdin: "100", expectedOutput: "212.0", label: "물 끓는점" },
        { stdin: "37", expectedOutput: "98.6", label: "체온" },
        { stdin: "-40", expectedOutput: "-40.0", label: "같은 온도" },
      ],
      hints: [
        "float(input())으로 실수를 입력받을 수 있어요.",
        "공식 F = C * 9/5 + 32를 그대로 코드로 작성하세요.",
        "print(f'{f:.1f}')로 소수점 1자리까지 출력하세요.",
      ],
      solutionCode: `c = float(input())
f = c * 9/5 + 32
print(f'{f:.1f}')`,
      solutionExplanation: "Python에서 9/5는 자동으로 실수 나눗셈(1.8)을 수행합니다. :.1f 형식 지정자로 소수점 첫째 자리까지 출력합니다.",
      en: {
        title: "Celsius to Fahrenheit",
        description: `Convert a Celsius temperature to Fahrenheit and print to 1 decimal place.\n\nFormula: F = C × 9/5 + 32`,
        constraints: "-100 ≤ C ≤ 100 (decimal input allowed)",
        hints: [
          "Use float(input()) to read a decimal number.",
          "Apply the formula F = C * 9/5 + 32 directly in code.",
          "Use print(f'{f:.1f}') to print to 1 decimal place.",
        ],
        solutionExplanation: "In Python, 9/5 automatically performs float division (1.8). The :.1f format specifier prints to 1 decimal place.",
      },
      language: "python",
    },
    {
      id: "pyio-006",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "보통",
      title: "시간 포맷 변환",
      description: `총 초(seconds)를 입력받아 "HH:MM:SS" 형식으로 출력하세요.
시, 분, 초는 각각 두 자리로 출력하며, 한 자리일 경우 앞에 0을 붙입니다.`,
      constraints: "0 ≤ 초 ≤ 86399",
      initialCode: `# 총 초를 입력받아 HH:MM:SS 형식으로 출력하세요
seconds = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3661", expectedOutput: "01:01:01", label: "기본" },
        { stdin: "0", expectedOutput: "00:00:00", label: "0초" },
        { stdin: "86399", expectedOutput: "23:59:59", label: "최대값" },
        { stdin: "3600", expectedOutput: "01:00:00", label: "정확히 1시간" },
      ],
      hints: [
        "시간 = 초 // 3600, 분 = (초 % 3600) // 60, 초 = 초 % 60",
        "f-string에서 {h:02d}로 두 자리 정수(앞에 0 채우기)를 출력할 수 있어요.",
      ],
      solutionCode: `seconds = int(input())
h = seconds // 3600
m = (seconds % 3600) // 60
s = seconds % 60
print(f'{h:02d}:{m:02d}:{s:02d}')`,
      solutionExplanation: "//는 정수 나눗셈, %는 나머지입니다. :02d 형식 지정자는 최소 2자리, 빈 자리는 0으로 채웁니다.",
      en: {
        title: "Time Format Conversion",
        description: `Given a total number of seconds, print it in "HH:MM:SS" format.\nHours, minutes, and seconds should each be two digits, padded with a leading zero if needed.`,
        constraints: "0 ≤ seconds ≤ 86399",
        hints: [
          "hours = seconds // 3600, minutes = (seconds % 3600) // 60, seconds = seconds % 60",
          "Use {h:02d} in an f-string to print a 2-digit integer with leading zero.",
        ],
        solutionExplanation: "// is integer division and % is the remainder. The :02d format specifier ensures at least 2 digits, padding with zeros.",
      },
      language: "python",
    },
    {
      id: "pyio-007",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "보통",
      title: "구구단 한 단",
      description: `정수 N을 입력받아 N단 구구단을 출력하세요.

형식: "N x i = 결과" (i는 1부터 9까지)`,
      constraints: "2 ≤ N ≤ 9",
      initialCode: `# N을 입력받아 구구단 N단을 출력하세요
# 형식: "N x i = N*i"
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "2", expectedOutput: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18", label: "2단" },
        { stdin: "5", expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45", label: "5단" },
        { stdin: "9", expectedOutput: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81", label: "9단" },
      ],
      hints: [
        "for i in range(1, 10):로 1부터 9까지 반복하세요.",
        "print(f'{n} x {i} = {n*i}')로 각 줄을 출력하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(1, 10):
    print(f'{n} x {i} = {n * i}')`,
      solutionExplanation: "range(1, 10)은 1 이상 10 미만, 즉 1~9를 생성합니다. f-string으로 n, i, 곱을 포맷에 맞게 출력합니다.",
      en: {
        title: "Multiplication Table",
        description: `Given an integer N, print the N times table.\n\nFormat: "N x i = result" (i from 1 to 9)`,
        constraints: "2 ≤ N ≤ 9",
        hints: [
          "Use for i in range(1, 10): to loop from 1 to 9.",
          "Use print(f'{n} x {i} = {n*i}') to print each line.",
        ],
        solutionExplanation: "range(1, 10) generates numbers from 1 up to (but not including) 10, i.e. 1–9. Use an f-string to format each line with n, i, and their product.",
      },
      language: "python",
    },
    {
      id: "pyio-008",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "어려움",
      title: "별 삼각형",
      description: `정수 N을 입력받아 N줄짜리 별 삼각형을 출력하세요.

- 1번째 줄: * (1개)
- 2번째 줄: ** (2개)
- ...
- N번째 줄: *** (N개)`,
      constraints: "1 ≤ N ≤ 20",
      initialCode: `# N을 입력받아 별 삼각형을 출력하세요
# 1번째 줄에 * 1개, 2번째 줄에 * 2개, ..., N번째 줄에 * N개
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3", expectedOutput: "*\n**\n***", label: "3줄" },
        { stdin: "1", expectedOutput: "*", label: "1줄" },
        { stdin: "5", expectedOutput: "*\n**\n***\n****\n*****", label: "5줄" },
        { stdin: "4", expectedOutput: "*\n**\n***\n****", label: "4줄" },
      ],
      hints: [
        "for i in range(1, n+1):로 1부터 n까지 반복하세요.",
        "'*' * i는 *를 i번 반복한 문자열을 만듭니다.",
        "print('*' * i)로 각 줄을 출력하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(1, n + 1):
    print('*' * i)`,
      solutionExplanation: "Python에서 문자열 * 정수는 문자열을 반복합니다. range(1, n+1)로 1부터 n까지 순회하며 각 단계에서 i개의 별을 출력합니다.",
      en: {
        title: "Star Triangle",
        description: `Given an integer N, print a triangle of stars with N rows.\n\n- Row 1: * (1 star)\n- Row 2: ** (2 stars)\n- ...\n- Row N: *** (N stars)`,
        constraints: "1 ≤ N ≤ 20",
        hints: [
          "Use for i in range(1, n+1): to loop from 1 to n.",
          "'*' * i creates a string of i repeated asterisks.",
          "Use print('*' * i) to print each row.",
        ],
        solutionExplanation: "In Python, string * integer repeats the string. Iterate from 1 to n with range(1, n+1) and print i stars on each step.",
      },
      language: "python",
    },
    {
      id: "pyio-c01",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "어려움",
      title: "영수증 출력",
      description: `첫 줄에 상품 수 N이 주어지고, 이어서 N줄에 걸쳐 "상품명 가격"이 주어집니다.
다음 형식으로 영수증을 출력하세요:
- "====================" (= 20개)
- 각 상품 줄: 이름 왼쪽 정렬 10칸, 가격 오른쪽 정렬 6칸
- "--------------------" (- 20개)
- 합계 줄: "Total" 왼쪽 정렬 10칸, 합계 오른쪽 정렬 6칸
- "====================" (= 20개)`,
      constraints: "1 ≤ N ≤ 10, 상품명 길이 ≤ 10, 1 ≤ 가격 ≤ 9999",
      initialCode: `n = int(input())
items = []
for _ in range(n):
    parts = input().split()
    name, price = parts[0], int(parts[1])
    items.append((name, price))

# 영수증 형식으로 출력하세요
# f"{name:<10}{price:>6}" — :<N은 왼쪽 정렬, :>N은 오른쪽 정렬
`,
      testCases: [
        { stdin: "3\napple 1200\nmilk 800\ncoffee 2500", expectedOutput: "====================\napple       1200\nmilk         800\ncoffee      2500\n--------------------\nTotal       4500\n====================", label: "3개 상품" },
        { stdin: "1\npen 300", expectedOutput: "====================\npen          300\n--------------------\nTotal        300\n====================", label: "1개 상품" },
        { stdin: "2\nbook 3000\nnote 500", expectedOutput: "====================\nbook        3000\nnote         500\n--------------------\nTotal       3500\n====================", label: "2개 상품" },
      ],
      hints: [
        "f'{name:<10}' — 이름을 10칸 왼쪽 정렬합니다.",
        "f'{price:>6}' — 가격을 6칸 오른쪽 정렬합니다.",
        "합계: total = sum(p for _, p in items)",
        "'=' * 20 으로 구분선을 만드세요.",
      ],
      solutionCode: `n = int(input())
items = []
for _ in range(n):
    parts = input().split()
    name, price = parts[0], int(parts[1])
    items.append((name, price))

total = sum(p for _, p in items)
print("=" * 20)
for name, price in items:
    print(f"{name:<10}{price:>6}")
print("-" * 20)
print(f"{'Total':<10}{total:>6}")
print("=" * 20)`,
      solutionExplanation: "f-string의 :<N은 왼쪽 정렬, :>N은 오른쪽 정렬입니다. '=' * 20은 = 기호를 20번 반복합니다. 합산 후 동일한 형식으로 Total을 출력합니다.",
      en: {
        title: "Print a Receipt",
        description: `Given N on the first line, followed by N lines of "item price", print a receipt in this format:\n- "====================" (20 equals)\n- Each item: name left-aligned (10 chars), price right-aligned (6 chars)\n- "--------------------" (20 dashes)\n- Total line: "Total" left-aligned (10 chars), sum right-aligned (6 chars)\n- "====================" (20 equals)`,
        constraints: "1 ≤ N ≤ 10, item name length ≤ 10, 1 ≤ price ≤ 9999",
        hints: [
          "f'{name:<10}' pads the name to 10 chars with left-alignment.",
          "f'{price:>6}' pads the price to 6 chars with right-alignment.",
          "Compute total = sum(p for _, p in items).",
          "Use '=' * 20 to generate the divider line.",
        ],
        solutionExplanation: "In f-strings, :<N left-aligns and :>N right-aligns. '=' * 20 repeats the = character 20 times. After summing, print Total in the same format.",
      },
      language: "python",
    },
    {
      id: "pyio-c02",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "어려움",
      title: "숫자 통계 보고서",
      description: `첫 줄에 정수 N이 주어지고, 둘째 줄에 N개의 정수가 공백으로 구분되어 주어집니다.
다음 형식으로 통계를 출력하세요:
Count: N
Sum: 합계
Min: 최솟값
Max: 최댓값
Avg: 평균 (소수점 2자리)`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `n = int(input())
nums = list(map(int, input().split()))

# 다음 형식으로 출력하세요:
# Count: N
# Sum: 합계
# Min: 최솟값
# Max: 최댓값
# Avg: 평균 (:.2f)
`,
      testCases: [
        { stdin: "5\n10 20 30 40 50", expectedOutput: "Count: 5\nSum: 150\nMin: 10\nMax: 50\nAvg: 30.00", label: "기본" },
        { stdin: "3\n100 200 300", expectedOutput: "Count: 3\nSum: 600\nMin: 100\nMax: 300\nAvg: 200.00", label: "큰 수" },
        { stdin: "1\n42", expectedOutput: "Count: 1\nSum: 42\nMin: 42\nMax: 42\nAvg: 42.00", label: "N=1" },
        { stdin: "4\n7 3 9 1", expectedOutput: "Count: 4\nSum: 20\nMin: 1\nMax: 9\nAvg: 5.00", label: "섞인 값" },
      ],
      hints: [
        "min(), max(), sum() 내장 함수를 사용하세요.",
        "평균: total / n 을 계산하고 f'{avg:.2f}'로 소수점 2자리까지 출력하세요.",
      ],
      solutionCode: `n = int(input())
nums = list(map(int, input().split()))
total = sum(nums)
print(f"Count: {n}")
print(f"Sum: {total}")
print(f"Min: {min(nums)}")
print(f"Max: {max(nums)}")
print(f"Avg: {total/n:.2f}")`,
      solutionExplanation: "min(), max(), sum() 내장 함수로 통계를 구합니다. f-string의 :.2f로 평균을 소수점 2자리까지 포맷합니다.",
      en: {
        title: "Number Statistics Report",
        description: `Given N on the first line and N integers on the second line (space-separated), print statistics in this format:\nCount: N\nSum: total\nMin: minimum\nMax: maximum\nAvg: average (2 decimal places)`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Use the built-in functions min(), max(), and sum().",
          "Compute average as total / n and format with f'{avg:.2f}'.",
        ],
        solutionExplanation: "Use min(), max(), and sum() built-ins for statistics. Use :.2f in an f-string to format the average to 2 decimal places.",
      },
      language: "python",
    },
    {
      id: "pyio-c03",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "어려움",
      title: "온도 변환표",
      description: `정수 세 개 start, end, step이 공백으로 주어집니다.
섭씨 start부터 end까지 step 간격으로 온도 변환표를 출력하세요.

변환 공식:
- 화씨: F = C × 9/5 + 32
- 켈빈: K = C + 273.15

헤더 줄: "C     F       K"
각 데이터 줄: 섭씨 왼쪽 정렬 6칸, 화씨 왼쪽 정렬 8칸(소수점 1자리), 켈빈 소수점 2자리`,
      constraints: "-100 ≤ start ≤ end ≤ 100, 1 ≤ step ≤ 50",
      initialCode: `start, end, step = map(int, input().split())

# 헤더 출력 (이미 완성됨)
print(f"{'C':<6}{'F':<8}K")

# start부터 end까지 step 간격으로 반복
# while c <= end: 구조를 사용하세요
`,
      testCases: [
        { stdin: "0 40 20", expectedOutput: "C     F       K\n0     32.0    273.15\n20    68.0    293.15\n40    104.0   313.15", label: "기본" },
        { stdin: "100 100 10", expectedOutput: "C     F       K\n100   212.0   373.15", label: "단일 행" },
        { stdin: "-10 10 10", expectedOutput: "C     F       K\n-10   14.0    263.15\n0     32.0    273.15\n10    50.0    283.15", label: "음수 포함" },
        { stdin: "37 37 1", expectedOutput: "C     F       K\n37    98.6    310.15", label: "체온" },
      ],
      hints: [
        "화씨: f = c * 9/5 + 32, 켈빈: k = c + 273.15",
        "각 행: print(f\"{c:<6}{f:<8.1f}{k:.2f}\")",
        "while c <= end: 로 반복하고 마지막에 c += step 을 추가하세요.",
      ],
      solutionCode: `start, end, step = map(int, input().split())
print(f"{'C':<6}{'F':<8}K")
c = start
while c <= end:
    f = c * 9/5 + 32
    k = c + 273.15
    print(f"{c:<6}{f:<8.1f}{k:.2f}")
    c += step`,
      solutionExplanation: "헤더와 동일한 너비로 데이터를 정렬합니다. f:<8.1f는 소수점 1자리 실수를 8칸 왼쪽 정렬합니다. while 루프로 step씩 증가하며 end까지 반복합니다.",
      en: {
        title: "Temperature Conversion Table",
        description: `Given three integers start, end, and step, print a temperature conversion table from start to end (inclusive) in increments of step.\n\nFormulas:\n- Fahrenheit: F = C × 9/5 + 32\n- Kelvin: K = C + 273.15\n\nHeader line: "C     F       K"\nEach data line: Celsius left-aligned (6 chars), Fahrenheit left-aligned (8 chars, 1 decimal place), Kelvin (2 decimal places)`,
        constraints: "-100 ≤ start ≤ end ≤ 100, 1 ≤ step ≤ 50",
        hints: [
          "Fahrenheit: f = c * 9/5 + 32, Kelvin: k = c + 273.15",
          "Each row: print(f\"{c:<6}{f:<8.1f}{k:.2f}\")",
          "Use while c <= end: and add c += step at the end of the loop body.",
        ],
        solutionExplanation: "Data is aligned using the same column widths as the header. f:<8.1f formats a float to 1 decimal place in 8 chars (left-aligned). The while loop increments by step until end is reached.",
      },
      language: "python",
    },
    {
      id: "pyio-c04",
      cluster: "py-io",
      unlockAfter: "10",
      difficulty: "어려움",
      title: "쇼핑 카트 합계",
      description: `첫 줄에 상품 수 N이 주어지고, 이어서 N줄에 걸쳐 "상품명 수량 단가"가 주어집니다.
각 상품의 소계(수량 × 단가)와 전체 합계를 다음 형식으로 출력하세요.

형식:
- 각 상품 줄: 이름 왼쪽 정렬 8칸, "x수량" 왼쪽 정렬 5칸, 소계 오른쪽 정렬 6칸
- "-------------------" (- 19개)
- 합계 줄: "Total" 왼쪽 정렬 13칸, 합계 오른쪽 정렬 6칸`,
      constraints: "1 ≤ N ≤ 10, 상품명 길이 ≤ 8, 1 ≤ 수량 ≤ 99, 1 ≤ 단가 ≤ 9999",
      initialCode: `n = int(input())
items = []
for _ in range(n):
    parts = input().split()
    name, qty, price = parts[0], int(parts[1]), int(parts[2])
    items.append((name, qty, price))

# 쇼핑 카트 표를 출력하세요
# 소계 = qty * price
# f"{name:<8}{'x'+str(qty):<5}{subtotal:>6}"
`,
      testCases: [
        { stdin: "3\napple 2 500\nbanana 3 200\ncoffee 1 3000", expectedOutput: "apple   x2     1000\nbanana  x3      600\ncoffee  x1     3000\n-------------------\nTotal          4600", label: "3개" },
        { stdin: "2\npen 5 200\neraser 10 50", expectedOutput: "pen     x5     1000\neraser  x10     500\n-------------------\nTotal          1500", label: "수량 두 자리" },
        { stdin: "1\nlaptop 1 9999", expectedOutput: "laptop  x1     9999\n-------------------\nTotal          9999", label: "1개" },
      ],
      hints: [
        "소계 = qty * price 로 각 상품 금액을 계산하세요.",
        "f\"{name:<8}{'x'+str(qty):<5}{subtotal:>6}\" 형식으로 각 줄을 출력하세요.",
        "합계 줄: f\"{'Total':<13}{total:>6}\"",
      ],
      solutionCode: `n = int(input())
items = []
for _ in range(n):
    parts = input().split()
    name, qty, price = parts[0], int(parts[1]), int(parts[2])
    items.append((name, qty, price))

total = sum(q * p for _, q, p in items)
for name, qty, price in items:
    subtotal = qty * price
    print(f"{name:<8}{'x'+str(qty):<5}{subtotal:>6}")
print("-" * 19)
print(f"{'Total':<13}{total:>6}")`,
      solutionExplanation: "소계 = 수량 × 단가를 계산합니다. f-string의 :<N/:>N으로 각 열의 너비를 맞춥니다. 'x'+str(qty)로 'x2', 'x10' 형태의 수량 문자열을 만든 뒤 5칸으로 정렬합니다.",
      en: {
        title: "Shopping Cart Total",
        description: `Given N on the first line, followed by N lines of "item qty price", compute the subtotal (qty × price) for each item and the grand total. Print in this format:\n- Each item line: name left-aligned (8 chars), "x{qty}" left-aligned (5 chars), subtotal right-aligned (6 chars)\n- "-------------------" (19 dashes)\n- Total line: "Total" left-aligned (13 chars), grand total right-aligned (6 chars)`,
        constraints: "1 ≤ N ≤ 10, item name length ≤ 8, 1 ≤ qty ≤ 99, 1 ≤ price ≤ 9999",
        hints: [
          "Compute subtotal = qty * price for each item.",
          "Use f\"{name:<8}{'x'+str(qty):<5}{subtotal:>6}\" for each item line.",
          "Total line: f\"{'Total':<13}{total:>6}\"",
        ],
        solutionExplanation: "Compute subtotal = qty × price. Use f-string alignment :<N and :>N to fix each column width. 'x'+str(qty) builds strings like 'x2' or 'x10', then :<5 pads to 5 chars.",
      },
      language: "python",
    },
  ],
}
