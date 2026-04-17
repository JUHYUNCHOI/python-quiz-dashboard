import type { PracticeCluster } from "./types"

export const pyConditionalsCluster: PracticeCluster = {
  id: "py-conditionals",
  title: "조건/논리",
  emoji: "🔀",
  description: "if/elif/else, 논리 연산자, 경계값 처리",
  unlockAfter: "12",
  en: {
    title: "Conditionals / Logic",
    description: "if/elif/else, logical operators, and boundary value handling",
  },
  problems: [
    {
      id: "pycond-001",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "쉬움",
      title: "양수/음수/영 판별",
      description: `정수를 입력받아 양수이면 "양수", 음수이면 "음수", 0이면 "영"을 출력하세요.`,
      constraints: "-1000 ≤ N ≤ 1000",
      initialCode: `# 정수를 입력받아 양수/음수/영을 판별하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5", expectedOutput: "양수", label: "양수" },
        { stdin: "-3", expectedOutput: "음수", label: "음수" },
        { stdin: "0", expectedOutput: "영", label: "0" },
        { stdin: "1000", expectedOutput: "양수", label: "최대값" },
      ],
      hints: [
        "if/elif/else 세 가지 경우로 나눠서 처리하세요.",
        "n > 0이면 양수, n < 0이면 음수, 나머지는 영입니다.",
      ],
      solutionCode: `n = int(input())
if n > 0:
    print("양수")
elif n < 0:
    print("음수")
else:
    print("영")`,
      solutionExplanation: "if/elif/else로 세 가지 경우를 처리합니다. n > 0과 n < 0이 모두 해당하지 않으면 n은 0이므로 else에서 '영'을 출력합니다.",
      en: {
        title: "Positive / Negative / Zero",
        description: `Read an integer and print "positive" if it's positive, "negative" if it's negative, or "zero" if it's 0.`,
        constraints: "-1000 ≤ N ≤ 1000",
        hints: [
          "Use if/elif/else to handle all three cases.",
          "n > 0 is positive, n < 0 is negative, and anything else is zero.",
        ],
        solutionExplanation: "if/elif/else handles all three cases. If neither n > 0 nor n < 0 applies, n must be 0, so the else branch prints 'zero'.",
      },
      language: "python",
    },
    {
      id: "pycond-002",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "쉬움",
      title: "홀수/짝수 판별",
      description: `정수를 입력받아 짝수이면 "짝수", 홀수이면 "홀수"를 출력하세요.`,
      constraints: "1 ≤ N ≤ 10000",
      initialCode: `# 정수를 입력받아 홀수/짝수를 판별하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "4", expectedOutput: "짝수", label: "짝수" },
        { stdin: "7", expectedOutput: "홀수", label: "홀수" },
        { stdin: "1", expectedOutput: "홀수", label: "최솟값" },
        { stdin: "1000", expectedOutput: "짝수", label: "큰 짝수" },
      ],
      hints: [
        "% 연산자(나머지)를 사용하세요.",
        "n % 2 == 0이면 짝수, n % 2 == 1이면 홀수입니다.",
      ],
      solutionCode: `n = int(input())
if n % 2 == 0:
    print("짝수")
else:
    print("홀수")`,
      solutionExplanation: "% 2의 결과가 0이면 짝수, 1이면 홀수입니다. if/else 두 경우로 충분합니다.",
      en: {
        title: "Even or Odd",
        description: `Read an integer and print "even" if it's even, or "odd" if it's odd.`,
        constraints: "1 ≤ N ≤ 10000",
        hints: [
          "Use the % operator (remainder).",
          "If n % 2 == 0, it's even; if n % 2 == 1, it's odd.",
        ],
        solutionExplanation: "If the remainder when dividing by 2 is 0, the number is even; otherwise it's odd. Two cases are enough — use if/else.",
      },
      language: "python",
    },
    {
      id: "pycond-003",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "쉬움",
      title: "두 수 중 큰 수",
      description: `두 정수 A와 B를 입력받아 더 큰 수를 출력하세요. 같으면 A를 출력합니다.`,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `# 두 정수를 입력받아 더 큰 수를 출력하세요
a, b = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3 7", expectedOutput: "7", label: "A < B" },
        { stdin: "10 2", expectedOutput: "10", label: "A > B" },
        { stdin: "5 5", expectedOutput: "5", label: "같은 수" },
        { stdin: "-1 -5", expectedOutput: "-1", label: "음수" },
      ],
      hints: [
        "if a >= b이면 a, 아니면 b를 출력하세요.",
        "Python의 max(a, b) 함수를 사용해도 됩니다.",
      ],
      solutionCode: `a, b = map(int, input().split())
if a >= b:
    print(a)
else:
    print(b)`,
      solutionExplanation: "a >= b 조건으로 같거나 큰 경우를 처리합니다. 또는 print(max(a, b))로 한 줄로도 작성할 수 있습니다.",
      en: {
        title: "Larger of Two Numbers",
        description: `Read two integers A and B, then print the larger one. If they are equal, print A.`,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: [
          "If a >= b, print a; otherwise print b.",
          "You can also use Python's max(a, b) function.",
        ],
        solutionExplanation: "The condition a >= b covers the case where they are equal or a is larger. Alternatively, print(max(a, b)) achieves the same in one line.",
      },
      language: "python",
    },
    {
      id: "pycond-004",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "쉬움",
      title: "세 수 중 최대값",
      description: `세 정수 A, B, C를 입력받아 가장 큰 수를 출력하세요.`,
      constraints: "-1000 ≤ A, B, C ≤ 1000",
      initialCode: `# 세 정수를 입력받아 최대값을 출력하세요
a, b, c = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1 2 3", expectedOutput: "3", label: "오름차순" },
        { stdin: "3 1 2", expectedOutput: "3", label: "첫 번째가 최대" },
        { stdin: "1 3 2", expectedOutput: "3", label: "두 번째가 최대" },
        { stdin: "-5 -1 -3", expectedOutput: "-1", label: "모두 음수" },
      ],
      hints: [
        "if/elif/else로 세 수를 비교하거나, max(a, b, c)를 사용하세요.",
        "먼저 a와 b 중 큰 것을 구한 뒤, 그 값과 c를 비교하는 방법도 있습니다.",
      ],
      solutionCode: `a, b, c = map(int, input().split())
print(max(a, b, c))`,
      solutionExplanation: "Python의 max() 함수는 여러 인수를 받아 최대값을 반환합니다. if/elif로 직접 비교해도 동일한 결과를 얻을 수 있습니다.",
      en: {
        title: "Maximum of Three Numbers",
        description: `Read three integers A, B, and C, then print the largest.`,
        constraints: "-1000 ≤ A, B, C ≤ 1000",
        hints: [
          "Use if/elif/else to compare the three numbers, or use max(a, b, c).",
          "Find the larger of a and b first, then compare that result with c.",
        ],
        solutionExplanation: "Python's max() function accepts multiple arguments and returns the maximum. You can also compare directly using if/elif to get the same result.",
      },
      language: "python",
    },
    {
      id: "pycond-005",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "쉬움",
      title: "학점 출력",
      description: `점수를 입력받아 학점을 출력하세요.

- 90점 이상: A
- 80점 이상: B
- 70점 이상: C
- 60점 이상: D
- 60점 미만: F`,
      constraints: "0 ≤ 점수 ≤ 100",
      initialCode: `# 점수를 입력받아 학점을 출력하세요
score = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "95", expectedOutput: "A", label: "A학점" },
        { stdin: "83", expectedOutput: "B", label: "B학점" },
        { stdin: "70", expectedOutput: "C", label: "C 경계" },
        { stdin: "55", expectedOutput: "F", label: "F학점" },
        { stdin: "60", expectedOutput: "D", label: "D 경계" },
      ],
      hints: [
        "elif 체인을 사용해 점수를 높은 순서부터 비교하세요.",
        "score >= 90, score >= 80, ... 순서로 확인하면 됩니다.",
      ],
      solutionCode: `score = int(input())
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")`,
      solutionExplanation: "높은 점수부터 확인하면 앞 조건을 통과한 경우 자동으로 그보다 낮은 범위임이 보장됩니다. 예를 들어 elif score >= 80은 이미 90 미만임을 전제합니다.",
      en: {
        title: "Grade Output",
        description: `Read a score and print the corresponding letter grade.\n\n- 90 or above: A\n- 80 or above: B\n- 70 or above: C\n- 60 or above: D\n- Below 60: F`,
        constraints: "0 ≤ score ≤ 100",
        hints: [
          "Use an elif chain and check from highest to lowest.",
          "Check score >= 90, then score >= 80, and so on.",
        ],
        solutionExplanation: "Checking from highest first ensures each subsequent elif implicitly means a lower range. For example, elif score >= 80 already assumes score < 90.",
      },
      language: "python",
    },
    {
      id: "pycond-006",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "윤년 판별",
      description: `연도를 입력받아 윤년이면 "윤년", 아니면 "평년"을 출력하세요.

윤년 조건:
- 4의 배수이고 100의 배수가 아닌 경우
- 또는 400의 배수인 경우`,
      constraints: "1 ≤ 연도 ≤ 9999",
      initialCode: `# 연도를 입력받아 윤년인지 판별하세요
year = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "2000", expectedOutput: "윤년", label: "400의 배수" },
        { stdin: "1900", expectedOutput: "평년", label: "100의 배수" },
        { stdin: "2024", expectedOutput: "윤년", label: "4의 배수" },
        { stdin: "2023", expectedOutput: "평년", label: "평년" },
      ],
      hints: [
        "400의 배수이거나, (4의 배수이고 100의 배수가 아닌) 경우가 윤년입니다.",
        "and, or, not 논리 연산자를 조합하세요.",
        "year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)",
      ],
      solutionCode: `year = int(input())
if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
    print("윤년")
else:
    print("평년")`,
      solutionExplanation: "400의 배수는 항상 윤년이고, 4의 배수이면서 100의 배수가 아닌 경우도 윤년입니다. 두 조건을 or로 연결합니다.",
      en: {
        title: "Leap Year",
        description: `Given a year, print "leap year" if it's a leap year, or "common year" otherwise.\n\nLeap year conditions:\n- Divisible by 4 but not by 100\n- Or divisible by 400`,
        constraints: "1 ≤ year ≤ 9999",
        hints: [
          "A year is a leap year if divisible by 400, or divisible by 4 but not by 100.",
          "Combine the conditions with and, or, not operators.",
          "year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)",
        ],
        solutionExplanation: "Multiples of 400 are always leap years. Multiples of 4 that are not multiples of 100 are also leap years. Connect both conditions with or.",
      },
      language: "python",
    },
    {
      id: "pycond-007",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "계절 판별",
      description: `월(1~12)을 입력받아 해당 계절을 출력하세요.

- 봄: 3, 4, 5월
- 여름: 6, 7, 8월
- 가을: 9, 10, 11월
- 겨울: 12, 1, 2월`,
      constraints: "1 ≤ 월 ≤ 12",
      initialCode: `# 월을 입력받아 계절을 출력하세요
month = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3", expectedOutput: "봄", label: "봄" },
        { stdin: "7", expectedOutput: "여름", label: "여름" },
        { stdin: "10", expectedOutput: "가을", label: "가을" },
        { stdin: "12", expectedOutput: "겨울", label: "겨울 12월" },
        { stdin: "1", expectedOutput: "겨울", label: "겨울 1월" },
      ],
      hints: [
        "in 연산자로 특정 값들 중 하나인지 확인할 수 있어요: month in [3, 4, 5]",
        "겨울은 12월이나 1, 2월이므로 조건이 두 부분으로 나뉩니다.",
      ],
      solutionCode: `month = int(input())
if month in [3, 4, 5]:
    print("봄")
elif month in [6, 7, 8]:
    print("여름")
elif month in [9, 10, 11]:
    print("가을")
else:
    print("겨울")`,
      solutionExplanation: "in 연산자로 값이 리스트 안에 있는지 확인합니다. 12, 1, 2월이 모두 겨울이므로 나머지를 else로 처리합니다.",
      en: {
        title: "Season Identifier",
        description: `Given a month (1–12), print the corresponding season.\n\n- Spring: March, April, May\n- Summer: June, July, August\n- Fall: September, October, November\n- Winter: December, January, February`,
        constraints: "1 ≤ month ≤ 12",
        hints: [
          "Use the in operator to check membership: month in [3, 4, 5]",
          "Winter spans December and January–February, so it splits across two ranges.",
        ],
        solutionExplanation: "The in operator checks if a value belongs to a list. Since December, January, and February are all winter, the else branch handles them all.",
      },
      language: "python",
    },
    {
      id: "pycond-008",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "삼각형 판별",
      description: `세 변의 길이 a, b, c를 입력받아 삼각형의 종류를 출력하세요.

- 삼각형이 아님: 가장 긴 변 ≥ 나머지 두 변의 합
- 직각삼각형: 가장 긴 변² = 나머지 두 변²의 합
- 둔각삼각형: 가장 긴 변² > 나머지 두 변²의 합
- 예각삼각형: 가장 긴 변² < 나머지 두 변²의 합`,
      constraints: "1 ≤ a, b, c ≤ 1000 (정수)",
      initialCode: `# 세 변의 길이를 입력받아 삼각형 종류를 출력하세요
a, b, c = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "3 4 5", expectedOutput: "직각삼각형", label: "직각" },
        { stdin: "5 5 5", expectedOutput: "예각삼각형", label: "정삼각형" },
        { stdin: "1 2 10", expectedOutput: "삼각형아님", label: "불가능" },
        { stdin: "2 3 4", expectedOutput: "둔각삼각형", label: "둔각" },
      ],
      hints: [
        "if/elif로 가장 긴 변을 찾아 c에 할당하고, 나머지 두 변을 a, b로 두세요.",
        "삼각형 성립 조건: a + b > c",
        "직각: c² == a² + b², 둔각: c² > a² + b², 예각: c² < a² + b²",
      ],
      solutionCode: `a, b, c = map(int, input().split())
# 가장 긴 변을 c로, 나머지를 a, b로 재배치
if a >= b and a >= c:
    long_side = a
    s1, s2 = b, c
elif b >= a and b >= c:
    long_side = b
    s1, s2 = a, c
else:
    long_side = c
    s1, s2 = a, b
a, b, c = s1, s2, long_side

if a + b <= c:
    print("삼각형아님")
elif c ** 2 == a ** 2 + b ** 2:
    print("직각삼각형")
elif c ** 2 > a ** 2 + b ** 2:
    print("둔각삼각형")
else:
    print("예각삼각형")`,
      solutionExplanation: "if/elif로 가장 긴 변을 c에 두고, 삼각형 성립 여부 확인(a+b > c) 후 피타고라스 정리로 종류를 판별합니다.",
      en: {
        title: "Triangle Classification",
        description: `Given three side lengths a, b, c, print the type of triangle.\n\n- Not a triangle: longest side ≥ sum of the other two\n- Right triangle: longest side² = sum of squares of the other two\n- Obtuse triangle: longest side² > sum of squares of the other two\n- Acute triangle: longest side² < sum of squares of the other two`,
        constraints: "1 ≤ a, b, c ≤ 1000 (integers)",
        hints: [
          "Use if/elif to find the longest side (assign to c) and assign the other two to a and b.",
          "Check if a triangle is valid first: a + b > c",
          "Right: c² == a² + b², Obtuse: c² > a² + b², Acute: c² < a² + b²",
        ],
        solutionExplanation: "Use if/elif to assign the longest side to c, then check the triangle inequality (a+b > c) and use the Pythagorean theorem to classify the triangle type.",
      },
      language: "python",
    },
    {
      id: "pycond-009",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "로그인 시뮬레이션",
      description: `아이디와 비밀번호를 입력받아 로그인 성공 여부를 출력하세요.

- 정답 아이디: admin
- 정답 비밀번호: 1234
- 성공: "로그인 성공"
- 아이디 틀림: "아이디 오류"
- 비밀번호 틀림: "비밀번호 오류"`,
      constraints: "아이디/비밀번호는 1~20자 문자열",
      initialCode: `# 아이디와 비밀번호를 입력받아 로그인 결과를 출력하세요
user_id = input()
password = input()
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "admin\n1234", expectedOutput: "로그인 성공", label: "성공" },
        { stdin: "guest\n1234", expectedOutput: "아이디 오류", label: "아이디 틀림" },
        { stdin: "admin\n0000", expectedOutput: "비밀번호 오류", label: "비밀번호 틀림" },
        { stdin: "user\nabc", expectedOutput: "아이디 오류", label: "둘 다 틀림" },
      ],
      hints: [
        "아이디를 먼저 확인한 뒤, 아이디가 맞을 때만 비밀번호를 확인하세요.",
        "중첩 if를 사용하거나 elif로 순서대로 처리하세요.",
      ],
      solutionCode: `user_id = input()
password = input()
if user_id != "admin":
    print("아이디 오류")
elif password != "1234":
    print("비밀번호 오류")
else:
    print("로그인 성공")`,
      solutionExplanation: "아이디를 먼저 확인합니다. 아이디가 맞으면(elif로 이어서) 비밀번호를 확인합니다. 두 조건이 모두 맞으면 로그인 성공입니다.",
      en: {
        title: "Login Simulation",
        description: `Read a username and password, then print the login result.\n\n- Correct username: admin\n- Correct password: 1234\n- Success: "login success"\n- Wrong username: "username error"\n- Wrong password: "password error"`,
        constraints: "Username/password is a string of 1–20 characters",
        hints: [
          "Check the username first; only check the password if the username is correct.",
          "Use nested if or elif to handle the cases in order.",
        ],
        solutionExplanation: "Check the username first. If it's correct (handled by elif), check the password. If both are correct, login succeeds.",
      },
      language: "python",
    },
    {
      id: "pycond-010",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "나이별 요금 계산",
      description: `나이를 입력받아 해당하는 요금을 출력하세요.

- 어린이 (13세 미만): 500원
- 청소년 (19세 미만): 800원
- 성인 (19세 이상): 1200원`,
      constraints: "1 ≤ 나이 ≤ 120",
      initialCode: `# 나이를 입력받아 요금을 출력하세요
age = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "10", expectedOutput: "500", label: "어린이" },
        { stdin: "15", expectedOutput: "800", label: "청소년" },
        { stdin: "25", expectedOutput: "1200", label: "성인" },
        { stdin: "12", expectedOutput: "500", label: "어린이 경계" },
        { stdin: "19", expectedOutput: "1200", label: "성인 경계" },
      ],
      hints: [
        "나이를 낮은 범위부터 확인하세요: age < 13 → age < 19 → else",
        "각 조건에 맞는 요금을 출력하세요.",
      ],
      solutionCode: `age = int(input())
if age < 13:
    print(500)
elif age < 19:
    print(800)
else:
    print(1200)`,
      solutionExplanation: "age < 13을 먼저 확인합니다. 이 조건을 통과하면 age >= 13이므로 다음 elif에서 age < 19는 13 이상 19 미만을 의미합니다.",
      en: {
        title: "Age-Based Fare",
        description: `Given an age, print the corresponding fare.\n\n- Child (under 13): 500\n- Teen (under 19): 800\n- Adult (19 or older): 1200`,
        constraints: "1 ≤ age ≤ 120",
        hints: [
          "Check from the lowest range upward: age < 13 → age < 19 → else",
          "Print the fare corresponding to each condition.",
        ],
        solutionExplanation: "Check age < 13 first. Once that condition passes, age >= 13 is guaranteed, so elif age < 19 implicitly means 13 ≤ age < 19.",
      },
      language: "python",
    },
    {
      id: "pycond-011",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "보통",
      title: "BMI 계산",
      description: `키(cm)와 몸무게(kg)를 입력받아 BMI를 계산하고 체중 상태를 출력하세요.

BMI = 몸무게(kg) / (키(m))²

- 저체중: BMI < 18.5
- 정상: BMI < 25.0
- 과체중: BMI < 30.0
- 비만: BMI ≥ 30.0`,
      constraints: "100 ≤ 키 ≤ 250 (cm), 30 ≤ 몸무게 ≤ 300 (kg)",
      initialCode: `# 키(cm)와 몸무게(kg)를 입력받아 BMI를 계산하고 체중 상태를 출력하세요
height_cm = int(input())
weight = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "170\n55", expectedOutput: "정상", label: "정상" },
        { stdin: "160\n40", expectedOutput: "저체중", label: "저체중" },
        { stdin: "175\n90", expectedOutput: "과체중", label: "과체중" },
        { stdin: "180\n80", expectedOutput: "정상", label: "정상" },
      ],
      hints: [
        "키를 cm에서 m로 변환하세요: height = height_cm / 100",
        "BMI = weight / (height ** 2)로 계산하세요.",
        "18.5, 25.0, 30.0을 기준으로 if/elif/else를 작성하세요.",
      ],
      solutionCode: `height_cm = int(input())
weight = int(input())
height = height_cm / 100
bmi = weight / (height ** 2)
if bmi < 18.5:
    print("저체중")
elif bmi < 25.0:
    print("정상")
elif bmi < 30.0:
    print("과체중")
else:
    print("비만")`,
      solutionExplanation: "키를 100으로 나눠 미터 단위로 변환합니다. BMI = 체중 / 키²를 계산한 뒤, 기준값과 비교하여 체중 상태를 출력합니다.",
      en: {
        title: "BMI Calculator",
        description: `Given height (cm) and weight (kg), calculate BMI and print the weight status.\n\nBMI = weight(kg) / (height(m))²\n\n- Underweight: BMI < 18.5\n- Normal: BMI < 25.0\n- Overweight: BMI < 30.0\n- Obese: BMI ≥ 30.0`,
        constraints: "100 ≤ height ≤ 250 (cm), 30 ≤ weight ≤ 300 (kg)",
        hints: [
          "Convert height from cm to m: height = height_cm / 100",
          "Compute BMI = weight / (height ** 2).",
          "Use if/elif/else with thresholds 18.5, 25.0, and 30.0.",
        ],
        solutionExplanation: "Divide height by 100 to convert to meters, then compute BMI = weight / height². Compare against the thresholds to determine the weight status.",
      },
      language: "python",
    },
    {
      id: "pycond-012",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "어려움",
      title: "날짜 비교",
      description: `두 날짜를 각각 "YYYY MM DD" 형식으로 입력받아, 먼저 오는 날짜를 출력하세요.
같은 날이면 "같은 날"을 출력하세요.

출력 형식: "YYYY-MM-DD"`,
      constraints: "1900 ≤ 연도 ≤ 2100, 유효한 날짜가 입력됩니다",
      initialCode: `# 두 날짜를 입력받아 먼저 오는 날짜를 출력하세요
y1, m1, d1 = map(int, input().split())
y2, m2, d2 = map(int, input().split())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "2024 1 15\n2024 3 10", expectedOutput: "2024-01-15", label: "같은 해, 다른 월" },
        { stdin: "2023 12 31\n2024 1 1", expectedOutput: "2023-12-31", label: "연도 차이" },
        { stdin: "2024 5 5\n2024 5 5", expectedOutput: "같은 날", label: "같은 날" },
        { stdin: "2024 7 20\n2024 7 5", expectedOutput: "2024-07-05", label: "같은 월, 다른 일" },
      ],
      hints: [
        "연도 → 월 → 일 순서로 비교하세요.",
        "연도가 같으면 월을 비교하고, 월도 같으면 일을 비교합니다.",
        "출력 시 f'{y:04d}-{m:02d}-{d:02d}'로 포맷을 맞추세요.",
      ],
      solutionCode: `y1, m1, d1 = map(int, input().split())
y2, m2, d2 = map(int, input().split())
if (y1, m1, d1) < (y2, m2, d2):
    print(f'{y1:04d}-{m1:02d}-{d1:02d}')
elif (y1, m1, d1) > (y2, m2, d2):
    print(f'{y2:04d}-{m2:02d}-{d2:02d}')
else:
    print("같은 날")`,
      solutionExplanation: "Python의 튜플 비교는 첫 번째 원소부터 순서대로 비교합니다. (y1, m1, d1) < (y2, m2, d2)는 연도→월→일 순서로 자동으로 비교해 줍니다.",
      en: {
        title: "Date Comparison",
        description: `Read two dates each in "YYYY MM DD" format and print the earlier one.\nIf both dates are the same, print "same day".\n\nOutput format: "YYYY-MM-DD"`,
        constraints: "1900 ≤ year ≤ 2100, valid dates are guaranteed",
        hints: [
          "Compare year → month → day in order.",
          "If the year is the same, compare the month; if the month is the same, compare the day.",
          "Use f'{y:04d}-{m:02d}-{d:02d}' to format the output.",
        ],
        solutionExplanation: "Python compares tuples element by element from left to right. (y1, m1, d1) < (y2, m2, d2) automatically compares year → month → day in order.",
      },
      language: "python",
    },
    {
      id: "pycond-013",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "어려움",
      title: "틱택토 승자 판별",
      description: `3×3 틱택토 보드 상태가 주어질 때, 승자를 판별하세요.

입력: 9개의 값을 한 줄씩 입력 ('X', 'O', '.')
(. = 빈 칸, 위 왼쪽부터 오른쪽, 아래 순서)

출력:
- "X 승리", "O 승리", "무승부"`,
      constraints: "입력은 X, O, . 세 문자만 포함하며 유효한 틱택토 상태입니다",
      initialCode: `# 9개의 셀을 입력받아 틱택토 승자를 판별하세요
board = []
for _ in range(9):
    board.append(input())
# 3x3 그리드로 변환
grid = [board[i*3:(i+1)*3] for i in range(3)]
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "X\nX\nX\nO\nO\n.\n.\n.\n.", expectedOutput: "X 승리", label: "X 1행 승리" },
        { stdin: "O\nX\nO\nX\nO\nX\nO\n.\nX", expectedOutput: "O 승리", label: "O 대각 승리" },
        { stdin: "X\nO\nX\nO\nX\nO\nO\nX\nO", expectedOutput: "무승부", label: "무승부" },
        { stdin: "X\n.\nO\nX\nO\n.\nX\n.\nO", expectedOutput: "X 승리", label: "X 열 승리" },
      ],
      hints: [
        "행, 열, 두 대각선 총 8가지 라인을 확인하세요.",
        "각 라인의 세 값이 모두 'X'이면 X 승리, 모두 'O'이면 O 승리입니다.",
        "모든 라인을 리스트로 만들어 반복문으로 확인하면 코드가 간결해집니다.",
      ],
      solutionCode: `board = []
for _ in range(9):
    board.append(input())
grid = [board[i*3:(i+1)*3] for i in range(3)]

lines = []
# 행
for r in range(3):
    lines.append([grid[r][0], grid[r][1], grid[r][2]])
# 열
for c in range(3):
    lines.append([grid[0][c], grid[1][c], grid[2][c]])
# 대각선
lines.append([grid[0][0], grid[1][1], grid[2][2]])
lines.append([grid[0][2], grid[1][1], grid[2][0]])

winner = None
for line in lines:
    if line == ['X', 'X', 'X']:
        winner = 'X'
    elif line == ['O', 'O', 'O']:
        winner = 'O'

if winner:
    print(f'{winner} 승리')
else:
    print("무승부")`,
      solutionExplanation: "8개의 라인(행 3 + 열 3 + 대각 2)을 리스트에 담아 반복문으로 검사합니다. 세 값이 모두 같은 문자면 해당 플레이어의 승리입니다.",
      en: {
        title: "Tic-Tac-Toe Winner",
        description: `Given the state of a 3×3 tic-tac-toe board, determine the winner.\n\nInput: 9 values, one per line ('X', 'O', or '.')\n(. = empty, from top-left to bottom-right)\n\nOutput:\n- "X wins", "O wins", or "draw"`,
        constraints: "Input contains only X, O, and . — a valid tic-tac-toe state is guaranteed",
        hints: [
          "Check all 8 lines: 3 rows, 3 columns, and 2 diagonals.",
          "If all three values in a line are 'X', X wins; if all are 'O', O wins.",
          "Collect all lines into a list and loop through them for cleaner code.",
        ],
        solutionExplanation: "Store all 8 lines (3 rows + 3 columns + 2 diagonals) in a list and check each one. If all three values match, that player wins.",
      },
      language: "python",
    },
    {
      id: "pycond-014",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "어려움",
      title: "자판기 거스름돈",
      description: `투입 금액과 음료 가격을 입력받아 거스름돈을 500원, 100원, 10원 단위로 출력하세요.

출력 형식:
500원: N개
100원: N개
10원: N개

투입 금액이 가격보다 작으면 "금액 부족"을 출력하세요.`,
      constraints: "10 ≤ 가격 ≤ 10000 (10의 배수), 10 ≤ 투입 금액 ≤ 10000 (10의 배수)",
      initialCode: `# 투입 금액과 음료 가격을 입력받아 거스름돈을 출력하세요
inserted = int(input())
price = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "1000\n650", expectedOutput: "500원: 0개\n100원: 3개\n10원: 5개", label: "기본" },
        { stdin: "500\n500", expectedOutput: "500원: 0개\n100원: 0개\n10원: 0개", label: "정확히" },
        { stdin: "300\n500", expectedOutput: "금액 부족", label: "금액 부족" },
        { stdin: "2000\n350", expectedOutput: "500원: 3개\n100원: 1개\n10원: 5개", label: "큰 거스름돈" },
      ],
      hints: [
        "먼저 거스름돈 = 투입 금액 - 가격을 계산하세요.",
        "500원 개수 = 거스름돈 // 500, 나머지로 100원, 10원을 계산하세요.",
        "각 단위로 // 연산 후 % 연산으로 나머지를 구해 다음 단위를 계산합니다.",
      ],
      solutionCode: `inserted = int(input())
price = int(input())
if inserted < price:
    print("금액 부족")
else:
    change = inserted - price
    c500 = change // 500
    change %= 500
    c100 = change // 100
    change %= 100
    c10 = change // 10
    print(f'500원: {c500}개')
    print(f'100원: {c100}개')
    print(f'10원: {c10}개')`,
      solutionExplanation: "거스름돈에서 큰 단위부터 몫을 계산하고 나머지를 다음 단위 계산에 사용합니다. 이를 탐욕 알고리즘(greedy)이라고 합니다.",
      en: {
        title: "Vending Machine Change",
        description: `Given the amount inserted and the item price, print the change in 500, 100, and 10 coin denominations.\n\nOutput format:\n500: N coins\n100: N coins\n10: N coins\n\nIf the amount inserted is less than the price, print "insufficient funds".`,
        constraints: "10 ≤ price ≤ 10000 (multiple of 10), 10 ≤ inserted ≤ 10000 (multiple of 10)",
        hints: [
          "First compute change = inserted - price.",
          "Count of 500 coins = change // 500; use the remainder for 100 and 10 coins.",
          "After each denomination, use // and % to find the next denomination's count.",
        ],
        solutionExplanation: "Compute the quotient for each denomination from largest to smallest, using the remainder for the next one. This approach is called a greedy algorithm.",
      },
      language: "python",
    },
    {
      id: "pycond-015",
      cluster: "py-conditionals",
      unlockAfter: "12",
      difficulty: "어려움",
      title: "FizzBuzz",
      description: `정수 N을 입력받아 1부터 N까지 FizzBuzz를 출력하세요.

- 15의 배수: FizzBuzz
- 3의 배수: Fizz
- 5의 배수: Buzz
- 그 외: 숫자 그대로`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `# N을 입력받아 1부터 N까지 FizzBuzz를 출력하세요
n = int(input())
# 여기에 코드를 작성하세요`,
      testCases: [
        { stdin: "5", expectedOutput: "1\n2\nFizz\n4\nBuzz", label: "5까지" },
        { stdin: "15", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", label: "15까지" },
        { stdin: "3", expectedOutput: "1\n2\nFizz", label: "3까지" },
        { stdin: "1", expectedOutput: "1", label: "1만" },
      ],
      hints: [
        "15의 배수를 먼저 확인해야 합니다 (3과 5 동시 해당).",
        "for i in range(1, n+1):로 반복하세요.",
        "if i % 15 == 0 → elif i % 3 == 0 → elif i % 5 == 0 → else 순서로 작성하세요.",
      ],
      solutionCode: `n = int(input())
for i in range(1, n + 1):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
      solutionExplanation: "15의 배수를 먼저 확인하는 것이 핵심입니다. 15는 3과 5의 공배수이므로 3의 배수나 5의 배수 조건보다 먼저 검사해야 FizzBuzz가 올바르게 출력됩니다.",
      en: {
        title: "FizzBuzz",
        description: `Given an integer N, print FizzBuzz from 1 to N.\n\n- Multiple of 15: FizzBuzz\n- Multiple of 3: Fizz\n- Multiple of 5: Buzz\n- Otherwise: the number itself`,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "Check for multiples of 15 first (divisible by both 3 and 5).",
          "Use for i in range(1, n+1): to loop.",
          "Order: if i % 15 == 0 → elif i % 3 == 0 → elif i % 5 == 0 → else",
        ],
        solutionExplanation: "Checking multiples of 15 first is the key. Since 15 is a common multiple of 3 and 5, it must be checked before the 3 and 5 conditions for FizzBuzz to print correctly.",
      },
      language: "python",
    },
  ],
}
