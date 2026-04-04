import type { PracticeCluster } from "./types"

export const pyLoopsCluster: PracticeCluster = {
  id: "py-loops",
  title: "반복문 패턴",
  emoji: "🔁",
  description: "for/while, range, 누적합, 중첩 루프",
  unlockAfter: "14",
  problems: [
    {
      id: "pyloop-001",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "쉬움",
      title: "1부터 N까지 합",
      description: `정수 N을 입력받아 1부터 N까지의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `# 1부터 N까지의 합을 구하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "10", expectedOutput: "55", label: "기본" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "100", expectedOutput: "5050", label: "100" },
        { stdin: "5", expectedOutput: "15", label: "N=5" },
      ],
      hints: [
        "for i in range(1, n+1):로 1부터 n까지 반복하세요.",
        "변수 total에 i를 누적해서 더하세요.",
        "또는 sum(range(1, n+1))로 한 줄로 작성할 수 있어요.",
      ],
      solutionCode: `n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)`,
      solutionExplanation: "누적합 패턴입니다. total 변수를 0으로 초기화하고 반복할 때마다 i를 더합니다. sum(range(1, n+1))로도 같은 결과를 얻을 수 있습니다.",
      language: "python",
    },
    {
      id: "pyloop-002",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "쉬움",
      title: "짝수 합",
      description: `정수 N을 입력받아 1부터 N까지의 짝수만 더한 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `# 1부터 N까지 짝수의 합을 구하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "10", expectedOutput: "30", label: "N=10" },
        { stdin: "1", expectedOutput: "0", label: "짝수 없음" },
        { stdin: "6", expectedOutput: "12", label: "N=6" },
        { stdin: "100", expectedOutput: "2550", label: "N=100" },
      ],
      hints: [
        "if i % 2 == 0: 조건으로 짝수만 더하세요.",
        "또는 range(2, n+1, 2)로 짝수만 순회할 수 있어요.",
      ],
      solutionCode: `n = int(input())
total = 0
for i in range(2, n + 1, 2):
    total += i
print(total)`,
      solutionExplanation: "range(2, n+1, 2)는 2부터 n 이하까지 2씩 증가하는 수열(짝수만)을 생성합니다. 세 번째 인수가 step(간격)입니다.",
      language: "python",
    },
    {
      id: "pyloop-003",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "쉬움",
      title: "팩토리얼",
      description: `정수 N을 입력받아 N! (N 팩토리얼)을 출력하세요.
N! = 1 × 2 × 3 × ... × N`,
      constraints: "0 ≤ N ≤ 12",
      initialCode: `# N 팩토리얼을 계산하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5", expectedOutput: "120", label: "5!" },
        { stdin: "0", expectedOutput: "1", label: "0! = 1" },
        { stdin: "1", expectedOutput: "1", label: "1!" },
        { stdin: "10", expectedOutput: "3628800", label: "10!" },
      ],
      hints: [
        "result를 1로 초기화하고 반복할 때마다 곱하세요.",
        "for i in range(1, n+1): result *= i",
        "0! = 1이 자동으로 처리되는지 확인하세요 (빈 범위를 반복하면 초기값 1이 유지됩니다).",
      ],
      solutionCode: `n = int(input())
result = 1
for i in range(1, n + 1):
    result *= i
print(result)`,
      solutionExplanation: "result를 1로 초기화합니다. n=0이면 range(1, 1)이 빈 범위라 반복이 없고 result=1이 유지되어 0!=1을 자동으로 처리합니다.",
      language: "python",
    },
    {
      id: "pyloop-004",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "쉬움",
      title: "최솟값 찾기",
      description: `첫 줄에 정수 N, 다음 N줄에 정수가 하나씩 주어질 때, 가장 작은 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `# N개의 숫자를 입력받아 최솟값을 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5\n3\n1\n4\n1\n5", expectedOutput: "1", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "1개" },
        { stdin: "3\n-5\n0\n5", expectedOutput: "-5", label: "음수 포함" },
        { stdin: "4\n10\n10\n10\n10", expectedOutput: "10", label: "모두 같음" },
      ],
      hints: [
        "첫 번째 수를 최솟값으로 초기화한 뒤, 나머지를 비교하세요.",
        "또는 numbers 리스트에 모두 담은 뒤 min(numbers)를 사용하세요.",
      ],
      solutionCode: `n = int(input())
numbers = [int(input()) for _ in range(n)]
print(min(numbers))`,
      solutionExplanation: "리스트 컴프리헨션으로 n개의 정수를 한 번에 읽습니다. Python의 내장 min() 함수로 최솟값을 구합니다.",
      language: "python",
    },
    {
      id: "pyloop-005",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "쉬움",
      title: "거꾸로 출력",
      description: `정수 N을 입력받아 N부터 1까지 역순으로 출력하세요.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `# N부터 1까지 거꾸로 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5", expectedOutput: "5\n4\n3\n2\n1", label: "기본" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "3", expectedOutput: "3\n2\n1", label: "N=3" },
      ],
      hints: [
        "range(n, 0, -1)은 n부터 1까지 1씩 감소하는 수열을 생성합니다.",
        "또는 range(1, n+1)을 reversed()로 감싸도 됩니다.",
      ],
      solutionCode: `n = int(input())
for i in range(n, 0, -1):
    print(i)`,
      solutionExplanation: "range(n, 0, -1)은 n에서 시작해 1씩 감소하며 1까지(0은 미포함) 생성합니다. 세 번째 인수 -1이 음수 step입니다.",
      language: "python",
    },
    {
      id: "pyloop-006",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "소수 판별",
      description: `정수 N이 소수인지 판별하여 "소수" 또는 "소수 아님"을 출력하세요.
1은 소수가 아닙니다.`,
      constraints: "1 ≤ N ≤ 10000",
      initialCode: `# N이 소수인지 판별하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "7", expectedOutput: "소수", label: "소수" },
        { stdin: "1", expectedOutput: "소수 아님", label: "1은 소수 아님" },
        { stdin: "4", expectedOutput: "소수 아님", label: "합성수" },
        { stdin: "97", expectedOutput: "소수", label: "큰 소수" },
        { stdin: "2", expectedOutput: "소수", label: "2는 소수" },
      ],
      hints: [
        "2부터 n-1까지 나눠지는 수가 있으면 소수가 아닙니다.",
        "효율적으로는 2부터 √n까지만 확인하면 됩니다: range(2, int(n**0.5)+1)",
        "n이 1이면 바로 '소수 아님'을 출력하세요.",
      ],
      solutionCode: `n = int(input())
if n < 2:
    print("소수 아님")
else:
    is_prime = True
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            is_prime = False
            break
    print("소수" if is_prime else "소수 아님")`,
      solutionExplanation: "N의 약수는 √N 이하에서 반드시 하나가 발견됩니다. 따라서 2부터 √N까지만 나눠보면 충분합니다. 나눠지면 소수가 아니고, break로 루프를 빠져나옵니다.",
      language: "python",
    },
    {
      id: "pyloop-007",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "구구단 전체",
      description: `2단부터 9단까지 구구단을 출력하세요.

형식: "N x i = 결과"
단과 단 사이에 빈 줄 없이 이어서 출력합니다.`,
      constraints: "없음",
      initialCode: `# 2단부터 9단까지 구구단 전체를 출력하세요
# 여기에 코드를 작성하세요`,
      testCases: [
        {
          stdin: "",
          expectedOutput: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20\n4 x 6 = 24\n4 x 7 = 28\n4 x 8 = 32\n4 x 9 = 36\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n6 x 1 = 6\n6 x 2 = 12\n6 x 3 = 18\n6 x 4 = 24\n6 x 5 = 30\n6 x 6 = 36\n6 x 7 = 42\n6 x 8 = 48\n6 x 9 = 54\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n8 x 1 = 8\n8 x 2 = 16\n8 x 3 = 24\n8 x 4 = 32\n8 x 5 = 40\n8 x 6 = 48\n8 x 7 = 56\n8 x 8 = 64\n8 x 9 = 72\n9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81",
          label: "전체 구구단",
        },
      ],
      hints: [
        "중첩 for 루프를 사용하세요: 바깥쪽은 단(2~9), 안쪽은 곱하는 수(1~9).",
        "for n in range(2, 10): for i in range(1, 10):",
      ],
      solutionCode: `for n in range(2, 10):
    for i in range(1, 10):
        print(f'{n} x {i} = {n * i}')`,
      solutionExplanation: "중첩 반복문 패턴입니다. 바깥 루프가 단(2~9)을 순회하고, 안쪽 루프가 각 단의 1~9를 순회합니다.",
      language: "python",
    },
    {
      id: "pyloop-008",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "피보나치 N번째",
      description: `정수 N을 입력받아 피보나치 수열의 N번째 수를 출력하세요.
(1번째=1, 2번째=1, 3번째=2, 4번째=3, 5번째=5, ...)`,
      constraints: "1 ≤ N ≤ 50",
      initialCode: `# N번째 피보나치 수를 출력하세요
# F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1번째" },
        { stdin: "5", expectedOutput: "5", label: "5번째" },
        { stdin: "10", expectedOutput: "55", label: "10번째" },
        { stdin: "20", expectedOutput: "6765", label: "20번째" },
      ],
      hints: [
        "a, b = 1, 1로 초기화하고, 반복할 때마다 a, b = b, a+b로 갱신하세요.",
        "N번 반복 후 a가 N번째 피보나치 수입니다.",
      ],
      solutionCode: `n = int(input())
a, b = 1, 1
for _ in range(n - 1):
    a, b = b, a + b
print(a)`,
      solutionExplanation: "a, b를 이전 항과 현재 항으로 유지합니다. 한 번 반복할 때마다 a←b, b←a+b로 동시에 갱신(튜플 대입)합니다. n-1번 반복하면 a가 n번째 항이 됩니다.",
      language: "python",
    },
    {
      id: "pyloop-009",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "각 자리수 합",
      description: `정수 N을 입력받아 각 자리의 숫자를 모두 더한 값을 출력하세요.
(예: 1234 → 1+2+3+4 = 10)`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `# N의 각 자리수를 모두 더하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1234", expectedOutput: "10", label: "기본" },
        { stdin: "999", expectedOutput: "27", label: "모두 9" },
        { stdin: "1", expectedOutput: "1", label: "한 자리" },
        { stdin: "100000", expectedOutput: "1", label: "큰 수" },
      ],
      hints: [
        "방법 1: 문자열로 변환 후 각 문자를 int로 변환하여 합산",
        "방법 2: while n > 0: digit = n % 10, n //= 10으로 각 자리를 추출",
        "sum(int(d) for d in str(n))으로 한 줄로 작성할 수 있어요.",
      ],
      solutionCode: `n = int(input())
print(sum(int(d) for d in str(n)))`,
      solutionExplanation: "str(n)으로 정수를 문자열로 변환하면 각 문자가 한 자리 숫자가 됩니다. 제너레이터 표현식으로 각 문자를 int로 변환하며 합산합니다.",
      language: "python",
    },
    {
      id: "pyloop-010",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "별 피라미드",
      description: `정수 N을 입력받아 N줄짜리 피라미드를 출력하세요.

각 줄에서 별 앞에 공백이 있습니다:
- i번째 줄: (N-i)개의 공백 + (2i-1)개의 별`,
      constraints: "1 ≤ N ≤ 20",
      initialCode: `# N줄짜리 별 피라미드를 출력하세요
# i번째 줄: (N-i)개 공백 + (2i-1)개 별
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3", expectedOutput: "  *\n ***\n*****", label: "3줄" },
        { stdin: "1", expectedOutput: "*", label: "1줄" },
        { stdin: "4", expectedOutput: "   *\n  ***\n *****\n*******", label: "4줄" },
      ],
      hints: [
        "i번째 줄(1부터 시작): 공백 (N-i)개, 별 (2*i-1)개",
        "' ' * (n-i) + '*' * (2*i-1)로 각 줄을 구성하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(1, n + 1):
    print(' ' * (n - i) + '*' * (2 * i - 1))`,
      solutionExplanation: "i번째 줄은 앞에 (n-i)개의 공백, 그 뒤에 (2i-1)개의 별로 구성됩니다. 문자열 반복으로 두 부분을 만들어 이어 붙입니다.",
      language: "python",
    },
    {
      id: "pyloop-011",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "역 별 삼각형",
      description: `정수 N을 입력받아 역방향 별 삼각형을 출력하세요.

- 1번째 줄: N개의 별
- 2번째 줄: N-1개의 별
- ...
- N번째 줄: 1개의 별`,
      constraints: "1 ≤ N ≤ 20",
      initialCode: `# N부터 1까지 줄어드는 역 삼각형을 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "4", expectedOutput: "****\n***\n**\n*", label: "4줄" },
        { stdin: "1", expectedOutput: "*", label: "1줄" },
        { stdin: "3", expectedOutput: "***\n**\n*", label: "3줄" },
      ],
      hints: [
        "range(n, 0, -1)로 n부터 1까지 거꾸로 반복하세요.",
        "각 단계에서 현재 숫자만큼 별을 출력하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(n, 0, -1):
    print('*' * i)`,
      solutionExplanation: "range(n, 0, -1)로 n에서 1까지 1씩 감소하며 반복합니다. 각 i에서 '*' * i로 i개의 별을 출력합니다.",
      language: "python",
    },
    {
      id: "pyloop-012",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "최대공약수 (GCD)",
      description: `두 양의 정수 A, B를 입력받아 최대공약수(GCD)를 출력하세요.`,
      constraints: "1 ≤ A, B ≤ 100000",
      initialCode: `# 두 수의 최대공약수를 구하세요
a, b = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "12 8", expectedOutput: "4", label: "기본" },
        { stdin: "100 75", expectedOutput: "25", label: "큰 수" },
        { stdin: "7 3", expectedOutput: "1", label: "서로소" },
        { stdin: "36 36", expectedOutput: "36", label: "같은 수" },
      ],
      hints: [
        "유클리드 호제법: a, b = b, a % b를 b가 0이 될 때까지 반복하세요.",
        "b가 0이 되면 a가 GCD입니다.",
        "while b != 0: a, b = b, a % b",
      ],
      solutionCode: `a, b = map(int, input().split())
while b:
    a, b = b, a % b
print(a)`,
      solutionExplanation: "유클리드 호제법: a를 b로 나눈 나머지를 새로운 b로 설정하며 반복합니다. b가 0이 되면 a가 최대공약수입니다. while b는 while b != 0과 동일합니다.",
      language: "python",
    },
    {
      id: "pyloop-013",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "보통",
      title: "누적 평균",
      description: `첫 줄에 N, 이후 N개의 정수가 한 줄씩 주어질 때, 각 수를 입력받을 때마다 지금까지의 평균을 소수점 둘째 자리까지 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ 각 정수 ≤ 10000",
      initialCode: `# N개의 숫자를 입력받으며 각 단계별 누적 평균을 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3\n10\n20\n30", expectedOutput: "10.00\n15.00\n20.00", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7.00", label: "1개" },
        { stdin: "4\n1\n2\n3\n4", expectedOutput: "1.00\n1.50\n2.00\n2.50", label: "오름차순" },
      ],
      hints: [
        "total과 count를 추적하면서 매 단계마다 total/count를 출력하세요.",
        "for i in range(1, n+1):로 반복하며 입력과 동시에 평균을 계산하세요.",
      ],
      solutionCode: `n = int(input())
total = 0
for i in range(1, n + 1):
    total += int(input())
    print(f'{total / i:.2f}')`,
      solutionExplanation: "매 반복에서 새 수를 total에 더한 뒤, total / i (현재까지 입력받은 개수)로 누적 평균을 계산합니다. :.2f로 소수점 2자리 출력합니다.",
      language: "python",
    },
    {
      id: "pyloop-014",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "소수 목록",
      description: `정수 N을 입력받아 2 이상 N 이하의 소수를 한 줄에 하나씩 오름차순으로 출력하세요.`,
      constraints: "2 ≤ N ≤ 1000",
      initialCode: `# 2부터 N까지의 소수를 모두 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "10", expectedOutput: "2\n3\n5\n7", label: "10 이하" },
        { stdin: "2", expectedOutput: "2", label: "최솟값" },
        { stdin: "20", expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19", label: "20 이하" },
        { stdin: "30", expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19\n23\n29", label: "30 이하" },
      ],
      hints: [
        "2부터 n까지 각 수에 대해 소수 판별 함수를 적용하세요.",
        "소수 판별: 2부터 √i까지 나눠지는 수가 없으면 소수입니다.",
        "중첩 반복문으로 구현하거나, 소수 판별 함수를 따로 작성하세요.",
      ],
      solutionCode: `n = int(input())
for num in range(2, n + 1):
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        print(num)`,
      solutionExplanation: "2부터 n까지 각 수를 순회하며 소수 여부를 판별합니다. 각 수에 대해 2부터 √num까지 나눠지는 수가 있으면 소수가 아닙니다.",
      language: "python",
    },
    {
      id: "pyloop-015",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "숫자 패턴",
      description: `정수 N을 입력받아 다음 패턴을 출력하세요.

N=4 예시:
1
12
123
1234`,
      constraints: "1 ≤ N ≤ 9",
      initialCode: `# N을 입력받아 숫자 패턴을 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "4", expectedOutput: "1\n12\n123\n1234", label: "N=4" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "3", expectedOutput: "1\n12\n123", label: "N=3" },
        { stdin: "5", expectedOutput: "1\n12\n123\n1234\n12345", label: "N=5" },
      ],
      hints: [
        "바깥 반복문은 줄 수(1~N), 안쪽 반복문은 각 줄에 출력할 숫자(1~줄번호)를 담당합니다.",
        "내부 루프에서 print(j, end='')로 줄바꿈 없이 이어 출력하고, 내부 루프 후 print()로 줄바꿈하세요.",
        "또는 ''.join(str(j) for j in range(1, i+1))로 문자열을 구성하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(1, n + 1):
    print(''.join(str(j) for j in range(1, i + 1)))`,
      solutionExplanation: "i번째 줄은 1부터 i까지의 숫자를 이어 붙인 문자열입니다. 내부 제너레이터로 각 숫자를 문자열로 변환해 join으로 합칩니다.",
      language: "python",
    },
    {
      id: "pyloop-016",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "마름모 패턴",
      description: `홀수 N을 입력받아 N줄짜리 마름모(다이아몬드) 모양을 출력하세요.

N=5 예시:
  *
 ***
*****
 ***
  *`,
      constraints: "N은 홀수, 1 ≤ N ≤ 21",
      initialCode: `# 홀수 N을 입력받아 마름모를 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5", expectedOutput: "  *\n ***\n*****\n ***\n  *", label: "N=5" },
        { stdin: "1", expectedOutput: "*", label: "N=1" },
        { stdin: "3", expectedOutput: " *\n***\n *", label: "N=3" },
      ],
      hints: [
        "위쪽 절반(중간 포함): i = 1, 3, 5, ..., N (홀수 증가)",
        "아래쪽 절반: i = N-2, N-4, ..., 1 (홀수 감소)",
        "각 줄에서 공백 수 = (N - 별 개수) // 2",
      ],
      solutionCode: `n = int(input())
# 위쪽 절반 (중간 포함)
for i in range(1, n + 1, 2):
    spaces = (n - i) // 2
    print(' ' * spaces + '*' * i)
# 아래쪽 절반
for i in range(n - 2, 0, -2):
    spaces = (n - i) // 2
    print(' ' * spaces + '*' * i)`,
      solutionExplanation: "위쪽은 별 개수를 1, 3, 5, ..., N으로 증가시키고, 아래쪽은 N-2, N-4, ..., 1로 감소시킵니다. 각 줄의 앞 공백 수는 (N-별개수)//2입니다.",
      language: "python",
    },
    {
      id: "pyloop-017",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "콜라츠 추측",
      description: `양의 정수 N을 입력받아 콜라츠 수열의 단계 수를 출력하세요.

규칙:
- N이 짝수면: N = N / 2
- N이 홀수면: N = N * 3 + 1
- 1이 될 때까지 반복하며, 몇 번 만에 1이 되는지 출력`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `# N이 1이 될 때까지 콜라츠 규칙을 적용한 횟수를 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "6", expectedOutput: "8", label: "N=6" },
        { stdin: "1", expectedOutput: "0", label: "이미 1" },
        { stdin: "27", expectedOutput: "111", label: "N=27" },
        { stdin: "2", expectedOutput: "1", label: "N=2" },
      ],
      hints: [
        "while n != 1: 루프 안에서 규칙을 적용하고 count를 증가시키세요.",
        "count를 0으로 초기화하고, n이 1이 아닌 동안 반복합니다.",
      ],
      solutionCode: `n = int(input())
count = 0
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = n * 3 + 1
    count += 1
print(count)`,
      solutionExplanation: "while 루프로 n이 1이 될 때까지 반복합니다. 짝수면 2로 나누고, 홀수면 3배+1로 변환하며 count를 셉니다.",
      language: "python",
    },
    {
      id: "pyloop-018",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "행렬 대각합",
      description: `정수 N과 N×N 행렬이 주어질 때, 주대각선과 부대각선의 합을 출력하세요.
(중심이 겹치는 경우 한 번만 더합니다)

주대각선: [0][0], [1][1], ..., [N-1][N-1]
부대각선: [0][N-1], [1][N-2], ..., [N-1][0]`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 행렬 원소 ≤ 1000",
      initialCode: `# N x N 행렬의 두 대각선 합을 출력하세요
n = int(input())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "25", label: "3x3" },
        { stdin: "1\n7", expectedOutput: "7", label: "1x1" },
        { stdin: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", expectedOutput: "68", label: "4x4" },
      ],
      hints: [
        "주대각선: i와 i 인덱스 (matrix[i][i])",
        "부대각선: i와 n-1-i 인덱스 (matrix[i][n-1-i])",
        "N이 홀수면 중앙(matrix[n//2][n//2])이 두 번 더해지므로 한 번 빼야 합니다.",
      ],
      solutionCode: `n = int(input())
matrix = []
for _ in range(n):
    row = list(map(int, input().split()))
    matrix.append(row)
total = 0
for i in range(n):
    total += matrix[i][i]
    total += matrix[i][n - 1 - i]
if n % 2 == 1:
    mid = n // 2
    total -= matrix[mid][mid]
print(total)`,
      solutionExplanation: "주대각선과 부대각선을 각각 더합니다. N이 홀수면 중심 원소가 두 번 더해지므로 한 번 빼서 보정합니다.",
      language: "python",
    },
    {
      id: "pyloop-019",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "버블 정렬 구현",
      description: `첫 줄에 N, 다음 줄에 N개의 정수가 공백으로 주어질 때, 버블 정렬로 오름차순 정렬한 결과를 출력하세요.
결과는 공백으로 구분하여 한 줄에 출력합니다.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `# 버블 정렬을 직접 구현하여 정렬하세요 (sorted() 사용 금지)
n = int(input())
arr = list(map(int, input().split()))
# 여기에 코드를 작성하세요 (버블 정렬 직접 구현)`,
      testCases: [
        { stdin: "5\n5 3 1 4 2", expectedOutput: "1 2 3 4 5", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "1개" },
        { stdin: "4\n4 3 2 1", expectedOutput: "1 2 3 4", label: "역순" },
        { stdin: "3\n-3 0 -1", expectedOutput: "-3 -1 0", label: "음수 포함" },
      ],
      hints: [
        "버블 정렬: 인접한 두 원소를 비교하여 큰 것을 오른쪽으로 보냅니다.",
        "바깥 루프 n-1번, 안쪽 루프 n-1-i번 반복합니다.",
        "arr[j] > arr[j+1]이면 두 원소를 교환(swap)합니다.",
      ],
      solutionCode: `n = int(input())
arr = list(map(int, input().split()))
for i in range(n - 1):
    for j in range(n - 1 - i):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
print(' '.join(map(str, arr)))`,
      solutionExplanation: "버블 정렬은 인접 원소를 비교·교환하며 큰 값을 오른쪽으로 밀어냅니다. i번 반복 후 뒤에서 i개 원소가 정렬되므로 안쪽 루프는 n-1-i까지만 실행합니다.",
      language: "python",
    },
    {
      id: "pyloop-020",
      cluster: "py-loops",
      unlockAfter: "14",
      difficulty: "어려움",
      title: "에라토스테네스의 체",
      description: `정수 N을 입력받아 2 이상 N 이하의 소수를 에라토스테네스의 체 알고리즘으로 구하여 한 줄에 하나씩 출력하세요.`,
      constraints: "2 ≤ N ≤ 10000",
      initialCode: `# 에라토스테네스의 체로 2~N의 소수를 모두 출력하세요
n = int(input())
# is_prime 배열을 만들어서 체를 구현하세요
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "10", expectedOutput: "2\n3\n5\n7", label: "10 이하" },
        { stdin: "2", expectedOutput: "2", label: "최솟값" },
        { stdin: "30", expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19\n23\n29", label: "30 이하" },
        { stdin: "50", expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19\n23\n29\n31\n37\n41\n43\n47", label: "50 이하" },
      ],
      hints: [
        "is_prime = [True] * (n+1)으로 초기화한 뒤 is_prime[0] = is_prime[1] = False로 설정하세요.",
        "2부터 √N까지 순회하며, is_prime[i]가 True이면 i의 배수를 모두 False로 표시합니다.",
        "i의 배수는 i*i부터 시작해 i씩 증가합니다: range(i*i, n+1, i)",
      ],
      solutionCode: `n = int(input())
is_prime = [True] * (n + 1)
is_prime[0] = is_prime[1] = False
for i in range(2, int(n ** 0.5) + 1):
    if is_prime[i]:
        for j in range(i * i, n + 1, i):
            is_prime[j] = False
for i in range(2, n + 1):
    if is_prime[i]:
        print(i)`,
      solutionExplanation: "에라토스테네스의 체: 각 소수의 배수를 제거합니다. i*i부터 시작하는 이유는 그보다 작은 배수는 이미 이전 소수에서 제거되었기 때문입니다. 시간복잡도 O(N log log N)으로 단순 소수 판별보다 훨씬 빠릅니다.",
      language: "python",
    },
  ],
}
