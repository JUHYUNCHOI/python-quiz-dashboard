import type { PracticeCluster } from "./types"

export const pyIoCluster: PracticeCluster = {
  id: "py-io",
  title: "입출력 기초",
  emoji: "⌨️",
  description: "input(), print(), 타입변환, 포맷 출력",
  unlockAfter: "10",
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
      language: "python",
    },
  ],
}
