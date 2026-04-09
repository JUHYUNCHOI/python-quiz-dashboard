import type { PracticeCluster } from "./types"

export const conditionalsCluster: PracticeCluster = {
  id: "conditionals",
  title: "조건/논리",
  emoji: "🔀",
  description: "if-else, 논리 연산자, 경계값 처리",
  unlockAfter: "cpp-6",
  en: {
    title: "Conditionals & Logic",
    description: "if-else, logical operators, boundary value handling",
  },
  problems: [
    {
      id: "cond-001",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "절댓값 출력",
      description: `정수 N이 주어질 때, N의 절댓값을 출력하세요.

**예시**
- 입력: \`-7\` → 출력: \`7\`
- 입력: \`5\` → 출력: \`5\`
- 입력: \`0\` → 출력: \`0\``,
      constraints: "-1000 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "-7", expectedOutput: "7", label: "음수" },
        { stdin: "5", expectedOutput: "5", label: "양수" },
        { stdin: "0", expectedOutput: "0", label: "0" },
        { stdin: "-1000", expectedOutput: "1000", label: "최솟값" },
      ],
      hints: [
        "n이 0보다 작으면 부호를 바꿔야 해요.",
        "if (n < 0) n = -n; 로 부호를 반전할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n < 0) n = -n;
    cout << n << endl;
    return 0;
}`,
      solutionExplanation: "n이 음수이면 -n으로 부호를 반전합니다. 표준 라이브러리의 abs() 함수를 써도 됩니다.",
      en: {
        title: "Print Absolute Value",
        description: `Given an integer N, print its absolute value.\n\n**Examples**\n- Input: \`-7\` → Output: \`7\`\n- Input: \`5\` → Output: \`5\`\n- Input: \`0\` → Output: \`0\``,
        constraints: "-1000 ≤ N ≤ 1000",
        hints: [
          "If n is less than 0, you need to flip its sign.",
          "Use if (n < 0) n = -n; to negate the value.",
        ],
        solutionExplanation: "If n is negative, we reverse its sign with -n. You can also use the standard library abs() function.",
      },
    },
    {
      id: "cond-002",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "홀짝 판별",
      description: `정수 N이 주어질 때, 홀수이면 \`odd\`, 짝수이면 \`even\`을 출력하세요.`,
      constraints: "1 ≤ N ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "odd", label: "홀수" },
        { stdin: "4", expectedOutput: "even", label: "짝수" },
        { stdin: "1", expectedOutput: "odd", label: "최솟값" },
        { stdin: "10000", expectedOutput: "even", label: "최댓값" },
      ],
      hints: [
        "나머지 연산자 %를 사용하세요.",
        "n % 2 == 0 이면 짝수예요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) cout << "even" << endl;
    else cout << "odd" << endl;
    return 0;
}`,
      solutionExplanation: "n % 2로 2로 나눈 나머지를 구합니다. 0이면 짝수, 1이면 홀수입니다.",
      en: {
        title: "Odd or Even",
        description: `Given an integer N, print \`odd\` if it is odd, or \`even\` if it is even.`,
        constraints: "1 ≤ N ≤ 10000",
        hints: [
          "Use the modulo operator %.",
          "If n % 2 == 0, it is even.",
        ],
        solutionExplanation: "We use n % 2 to get the remainder when divided by 2. If it is 0, the number is even; if 1, it is odd.",
      },
    },
    {
      id: "cond-003",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "세 수의 최댓값",
      description: `세 정수 A, B, C가 주어질 때, 가장 큰 수를 출력하세요.`,
      constraints: "-1000 ≤ A, B, C ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 7 5", expectedOutput: "7", label: "기본" },
        { stdin: "-1 -5 -3", expectedOutput: "-1", label: "음수" },
        { stdin: "4 4 4", expectedOutput: "4", label: "같은 값" },
        { stdin: "1000 -1000 0", expectedOutput: "1000", label: "경계값" },
      ],
      hints: [
        "두 수 중 큰 값을 먼저 구하고, 세 번째 수와 비교하세요.",
        "int mx = a; if (b > mx) mx = b; if (c > mx) mx = c;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int mx = a;
    if (b > mx) mx = b;
    if (c > mx) mx = c;
    cout << mx << endl;
    return 0;
}`,
      solutionExplanation: "mx를 a로 초기화한 후 b, c와 차례로 비교해 더 큰 값으로 갱신합니다.",
      en: {
        title: "Maximum of Three Numbers",
        description: `Given three integers A, B, and C, print the largest one.`,
        constraints: "-1000 ≤ A, B, C ≤ 1000",
        hints: [
          "Find the larger of two numbers first, then compare with the third.",
          "int mx = a; if (b > mx) mx = b; if (c > mx) mx = c;",
        ],
        solutionExplanation: "Initialize mx to a, then update it by comparing with b and c in turn.",
      },
    },
    {
      id: "cond-004",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "점수 등급 판별",
      description: `시험 점수 N이 주어질 때, 등급을 출력하세요.

- 90 이상: \`A\`
- 80 이상 90 미만: \`B\`
- 70 이상 80 미만: \`C\`
- 70 미만: \`F\``,
      constraints: "0 ≤ N ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "95", expectedOutput: "A", label: "A등급" },
        { stdin: "83", expectedOutput: "B", label: "B등급" },
        { stdin: "72", expectedOutput: "C", label: "C등급" },
        { stdin: "55", expectedOutput: "F", label: "F등급" },
        { stdin: "90", expectedOutput: "A", label: "경계값 90" },
        { stdin: "80", expectedOutput: "B", label: "경계값 80" },
      ],
      hints: [
        "if-else if 체인을 사용하세요.",
        "90 이상부터 내려가며 조건을 확인하면 범위 조건을 단순하게 쓸 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n >= 90) cout << "A" << endl;
    else if (n >= 80) cout << "B" << endl;
    else if (n >= 70) cout << "C" << endl;
    else cout << "F" << endl;
    return 0;
}`,
      solutionExplanation: "90 이상부터 내림차순으로 검사합니다. else if를 쓰면 앞 조건이 이미 걸러졌으므로 &&를 쓸 필요가 없습니다.",
      en: {
        title: "Grade Classification",
        description: `Given a test score N, print the grade.\n\n- 90 or above: \`A\`\n- 80 to 89: \`B\`\n- 70 to 79: \`C\`\n- Below 70: \`F\``,
        constraints: "0 ≤ N ≤ 100",
        hints: [
          "Use an if-else if chain.",
          "Check from 90 and above downward — this simplifies the range conditions.",
        ],
        solutionExplanation: "Check from 90 downward. Using else if means the previous condition already filtered out higher values, so no && is needed.",
      },
    },
    // ── switch 문 ─────────────────────────────────────────────────
    {
      id: "cond-022",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "요일 출력 (switch)",
      description: `1~7 사이의 정수가 입력됩니다. **switch 문을 사용해** 해당 요일 이름을 영어로 출력하세요.

- 1 → \`Mon\`
- 2 → \`Tue\`
- 3 → \`Wed\`
- 4 → \`Thu\`
- 5 → \`Fri\`
- 6 → \`Sat\`
- 7 → \`Sun\``,
      constraints: "1 ≤ N ≤ 7",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    switch (n) {
        // 각 case를 채우세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "Mon", label: "월요일" },
        { stdin: "5", expectedOutput: "Fri", label: "금요일" },
        { stdin: "6", expectedOutput: "Sat", label: "토요일" },
        { stdin: "7", expectedOutput: "Sun", label: "일요일" },
        { stdin: "3", expectedOutput: "Wed", label: "수요일" },
      ],
      hints: [
        "switch (n) { case 1: ... break; case 2: ... break; ... } 구조를 사용하세요.",
        "각 case 끝에 break;를 반드시 써야 다음 case로 넘어가지 않아요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    switch (n) {
        case 1: cout << "Mon" << endl; break;
        case 2: cout << "Tue" << endl; break;
        case 3: cout << "Wed" << endl; break;
        case 4: cout << "Thu" << endl; break;
        case 5: cout << "Fri" << endl; break;
        case 6: cout << "Sat" << endl; break;
        case 7: cout << "Sun" << endl; break;
    }
    return 0;
}`,
      solutionExplanation: "switch (n)으로 n 값에 따라 분기합니다. 각 case 끝에 break;를 쓰지 않으면 다음 case까지 실행되는 'fall-through'가 발생합니다.",
      en: {
        title: "Day of Week (switch)",
        description: `An integer from 1 to 7 is given. Using a **switch statement**, print the day name in English.\n\n- 1 → \`Mon\`\n- 2 → \`Tue\`\n- 3 → \`Wed\`\n- 4 → \`Thu\`\n- 5 → \`Fri\`\n- 6 → \`Sat\`\n- 7 → \`Sun\``,
        constraints: "1 ≤ N ≤ 7",
        hints: [
          "Use the structure: switch (n) { case 1: ... break; case 2: ... break; ... }",
          "Always put break; at the end of each case to prevent fall-through.",
        ],
        solutionExplanation: "switch (n) branches based on the value of n. Without break; at the end of a case, execution falls through to the next case.",
      },
    },
    // ── 삼항 연산자 ───────────────────────────────────────────────
    {
      id: "cond-023",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "큰 수 선택 (삼항)",
      description: `두 정수 A, B가 입력됩니다. **삼항 연산자 (?:)** 를 사용해 더 큰 수를 출력하세요. A와 B가 같으면 A를 출력합니다.

**삼항 연산자 문법:**
\`조건 ? 참일 때 값 : 거짓일 때 값\`

**예시:** \`int max = (a > b) ? a : b;\``,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int result = // 삼항 연산자로 채우세요
    cout << result << endl;
    return 0;
}`,
      testCases: [
        { stdin: "5 3", expectedOutput: "5", label: "a > b" },
        { stdin: "2 9", expectedOutput: "9", label: "a < b" },
        { stdin: "7 7", expectedOutput: "7", label: "같음" },
        { stdin: "-3 -1", expectedOutput: "-1", label: "음수" },
      ],
      hints: [
        "삼항 연산자: (a > b) ? a : b",
        "결과를 변수에 저장한 뒤 출력하거나, cout << ((a > b) ? a : b); 처럼 직접 출력해도 됩니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int result = (a >= b) ? a : b;
    cout << result << endl;
    return 0;
}`,
      solutionExplanation: "삼항 연산자 (a >= b) ? a : b 는 a가 b보다 크거나 같으면 a, 아니면 b를 반환합니다. if-else 한 줄 버전이라고 생각하면 돼요.",
      en: {
        title: "Select Larger Number (Ternary)",
        description: `Two integers A and B are given. Use the **ternary operator (?:)** to print the larger one. If A equals B, print A.\n\n**Ternary operator syntax:**\n\`condition ? value_if_true : value_if_false\`\n\n**Example:** \`int max = (a > b) ? a : b;\``,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: [
          "Ternary operator: (a > b) ? a : b",
          "You can store the result in a variable or use it directly: cout << ((a > b) ? a : b);",
        ],
        solutionExplanation: "The ternary operator (a >= b) ? a : b returns a if a is greater than or equal to b, otherwise b. Think of it as a one-line if-else.",
      },
    },
    {
      id: "cond-005",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "윤년 판별",
      description: `연도 Y가 주어질 때, 윤년이면 \`yes\`, 아니면 \`no\`를 출력하세요.

**윤년 조건:**
- 4로 나누어 떨어지고, 100으로 나누어 떨어지지 않거나
- 400으로 나누어 떨어지는 경우`,
      constraints: "1 ≤ Y ≤ 4000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int y;
    cin >> y;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "2000", expectedOutput: "yes", label: "400의 배수" },
        { stdin: "1900", expectedOutput: "no", label: "100의 배수 (윤년 아님)" },
        { stdin: "2024", expectedOutput: "yes", label: "4의 배수" },
        { stdin: "2023", expectedOutput: "no", label: "평년" },
      ],
      hints: [
        "% 연산자로 나누어 떨어지는지 확인하세요.",
        "(y%4==0 && y%100!=0) || (y%400==0)",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int y;
    cin >> y;
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
        cout << "yes" << endl;
    else
        cout << "no" << endl;
    return 0;
}`,
      solutionExplanation: "윤년 조건을 &&와 ||로 정확히 표현합니다. 400의 배수는 무조건 윤년이므로 || 뒤에 배치합니다.",
      en: {
        title: "Leap Year",
        description: `Given a year Y, print \`yes\` if it is a leap year, or \`no\` otherwise.\n\n**Leap year conditions:**\n- Divisible by 4 but not by 100, OR\n- Divisible by 400`,
        constraints: "1 ≤ Y ≤ 4000",
        hints: [
          "Use the % operator to check divisibility.",
          "(y%4==0 && y%100!=0) || (y%400==0)",
        ],
        solutionExplanation: "Express the leap year condition precisely with && and ||. Years divisible by 400 are always leap years, so that goes after ||.",
      },
    },
    {
      id: "cond-006",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "양수/음수/0 판별",
      description: `정수 N이 주어질 때, 양수이면 \`positive\`, 음수이면 \`negative\`, 0이면 \`zero\`를 출력하세요.`,
      constraints: "-1000 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5", expectedOutput: "positive", label: "양수" },
        { stdin: "-3", expectedOutput: "negative", label: "음수" },
        { stdin: "0", expectedOutput: "zero", label: "0" },
      ],
      hints: ["세 가지 경우를 if-else if-else로 처리하세요."],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n > 0) cout << "positive" << endl;
    else if (n < 0) cout << "negative" << endl;
    else cout << "zero" << endl;
    return 0;
}`,
      solutionExplanation: "양수 → 음수 → 0 순서로 확인합니다. else if 체인으로 세 경우를 처리합니다.",
      en: {
        title: "Positive, Negative, or Zero",
        description: `Given an integer N, print \`positive\` if it is positive, \`negative\` if it is negative, or \`zero\` if it is 0.`,
        constraints: "-1000 ≤ N ≤ 1000",
        hints: ["Handle the three cases with if-else if-else."],
        solutionExplanation: "Check positive → negative → zero in order. The else if chain handles all three cases.",
      },
    },
    {
      id: "cond-007",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "두 수 비교",
      description: `두 정수 A, B가 주어질 때:
- A > B이면 \`>\`
- A < B이면 \`<\`
- A == B이면 \`==\`

를 출력하세요.`,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 3", expectedOutput: ">", label: "A > B" },
        { stdin: "2 8", expectedOutput: "<", label: "A < B" },
        { stdin: "4 4", expectedOutput: "==", label: "같음" },
      ],
      hints: ["세 경우를 if-else if-else로 구분하세요."],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    if (a > b) cout << ">" << endl;
    else if (a < b) cout << "<" << endl;
    else cout << "==" << endl;
    return 0;
}`,
      solutionExplanation: "세 경우(크다/작다/같다)를 if-else if-else로 처리합니다.",
      en: {
        title: "Compare Two Numbers",
        description: `Given two integers A and B:\n- If A > B, print \`>\`\n- If A < B, print \`<\`\n- If A == B, print \`==\``,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: ["Distinguish the three cases with if-else if-else."],
        solutionExplanation: "Handle the three cases (greater/less/equal) with if-else if-else.",
      },
    },
    {
      id: "cond-008",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "배수 판별 (FizzBuzz)",
      description: `정수 N 하나가 주어질 때 조건에 따라 출력하세요. (반복문 없이 if-else만 사용)

- 15의 배수이면 \`FizzBuzz\`
- 3의 배수이면 \`Fizz\`
- 5의 배수이면 \`Buzz\`
- 그 외에는 N을 그대로 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "15", expectedOutput: "FizzBuzz", label: "15의 배수" },
        { stdin: "9", expectedOutput: "Fizz", label: "3의 배수" },
        { stdin: "10", expectedOutput: "Buzz", label: "5의 배수" },
        { stdin: "7", expectedOutput: "7", label: "해당 없음" },
        { stdin: "30", expectedOutput: "FizzBuzz", label: "30" },
      ],
      hints: [
        "15의 배수 조건을 가장 먼저 확인해야 합니다. 그래야 3과 5의 배수에 모두 해당하는 경우를 잡을 수 있어요.",
        "if (n%15==0) → Fizz Buzz 순서 조심!",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 15 == 0) cout << "FizzBuzz" << endl;
    else if (n % 3 == 0) cout << "Fizz" << endl;
    else if (n % 5 == 0) cout << "Buzz" << endl;
    else cout << n << endl;
    return 0;
}`,
      solutionExplanation: "15의 배수를 먼저 처리해야 합니다. 3 또는 5만 확인하면 15의 배수도 걸려버리므로 순서가 중요합니다.",
      en: {
        title: "Multiple Check (FizzBuzz)",
        description: `Given a single integer N, print the following (no loops, use only if-else):\n\n- Multiple of 15: \`FizzBuzz\`\n- Multiple of 3: \`Fizz\`\n- Multiple of 5: \`Buzz\`\n- Otherwise: print N itself`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Check multiples of 15 first, so numbers divisible by both 3 and 5 are caught correctly.",
          "if (n%15==0) → watch the Fizz/Buzz order!",
        ],
        solutionExplanation: "Multiples of 15 must be handled first. If you only check 3 or 5 first, multiples of 15 will be caught by those branches, so order matters.",
      },
    },
    {
      id: "cond-009",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "계절 판별",
      description: `월(1~12)이 주어질 때 계절을 출력하세요.
- 3, 4, 5월: \`spring\`
- 6, 7, 8월: \`summer\`
- 9, 10, 11월: \`fall\`
- 12, 1, 2월: \`winter\``,
      constraints: "1 ≤ M ≤ 12",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "spring", label: "봄" },
        { stdin: "7", expectedOutput: "summer", label: "여름" },
        { stdin: "11", expectedOutput: "fall", label: "가을" },
        { stdin: "1", expectedOutput: "winter", label: "겨울(1월)" },
        { stdin: "12", expectedOutput: "winter", label: "겨울(12월)" },
      ],
      hints: [
        "if-else if 체인으로 범위 조건을 확인하세요.",
        "12월은 1~2월과 함께 winter — 범위가 불연속이라 || 조건을 씁니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    if (m >= 3 && m <= 5) cout << "spring" << endl;
    else if (m >= 6 && m <= 8) cout << "summer" << endl;
    else if (m >= 9 && m <= 11) cout << "fall" << endl;
    else cout << "winter" << endl;
    return 0;
}`,
      solutionExplanation: "12, 1, 2월은 나머지(else)로 처리하면 깔끔합니다. &&로 범위를 표현합니다.",
      en: {
        title: "Season Classifier",
        description: `Given a month (1~12), print the season:\n- March, April, May: \`spring\`\n- June, July, August: \`summer\`\n- September, October, November: \`fall\`\n- December, January, February: \`winter\``,
        constraints: "1 ≤ M ≤ 12",
        hints: [
          "Use an if-else if chain to check the range.",
          "December falls together with January and February — use || since the range is non-contiguous.",
        ],
        solutionExplanation: "Months 12, 1, and 2 can be handled by the final else. Use && to express the range conditions.",
      },
    },
    {
      id: "cond-010",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "삼각형 판별",
      description: `세 변의 길이 A, B, C가 주어질 때, 이 세 변으로 삼각형을 만들 수 있는지 판별하세요.

삼각형 조건: 두 변의 합이 나머지 한 변보다 커야 합니다. (세 조건 모두)

- 가능하면 \`YES\`
- 불가능하면 \`NO\``,
      constraints: "1 ≤ A, B, C ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 4 5", expectedOutput: "YES", label: "직각삼각형" },
        { stdin: "1 1 2", expectedOutput: "NO", label: "경계 (불가)" },
        { stdin: "5 5 5", expectedOutput: "YES", label: "정삼각형" },
        { stdin: "1 2 10", expectedOutput: "NO", label: "불가" },
      ],
      hints: [
        "a+b>c, a+c>b, b+c>a 세 조건이 모두 참이어야 합니다.",
        "&& 연산자로 세 조건을 연결하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    if (a + b > c && a + c > b && b + c > a)
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
    return 0;
}`,
      solutionExplanation: "세 삼각형 부등식을 &&로 묶습니다. 1+1>2는 거짓(2>2)이므로 NO입니다.",
      en: {
        title: "Triangle Check",
        description: `Given three side lengths A, B, and C, determine whether they can form a triangle.\n\nTriangle condition: the sum of any two sides must be greater than the third side (all three conditions must hold).\n\n- If possible: \`YES\`\n- If not: \`NO\``,
        constraints: "1 ≤ A, B, C ≤ 1000",
        hints: [
          "All three conditions must be true: a+b>c, a+c>b, b+c>a.",
          "Connect the three conditions with the && operator.",
        ],
        solutionExplanation: "Combine the three triangle inequalities with &&. Note that 1+1>2 is false (2>2), so that case outputs NO.",
      },
    },
    {
      id: "cond-011",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "문자 분류",
      description: `문자 하나가 주어질 때:
- 대문자(A-Z): \`upper\`
- 소문자(a-z): \`lower\`
- 숫자(0-9): \`digit\`
- 그 외: \`other\`

를 출력하세요.`,
      constraints: "아스키 코드 33~126 범위의 문자 1개",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    char c;
    cin >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "A", expectedOutput: "upper", label: "대문자" },
        { stdin: "z", expectedOutput: "lower", label: "소문자" },
        { stdin: "5", expectedOutput: "digit", label: "숫자" },
        { stdin: "!", expectedOutput: "other", label: "기타" },
      ],
      hints: [
        "문자는 ASCII 코드로 비교됩니다. 'A'<=c && c<='Z'로 대문자 범위 확인 가능.",
        "isupper(), islower(), isdigit() 표준 함수를 써도 됩니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    char c;
    cin >> c;
    if (c >= 'A' && c <= 'Z') cout << "upper" << endl;
    else if (c >= 'a' && c <= 'z') cout << "lower" << endl;
    else if (c >= '0' && c <= '9') cout << "digit" << endl;
    else cout << "other" << endl;
    return 0;
}`,
      solutionExplanation: "char도 정수처럼 비교할 수 있습니다. 'A'(65)~'Z'(90), 'a'(97)~'z'(122), '0'(48)~'9'(57).",
      en: {
        title: "Character Classification",
        description: `Given a single character:\n- Uppercase (A-Z): \`upper\`\n- Lowercase (a-z): \`lower\`\n- Digit (0-9): \`digit\`\n- Other: \`other\``,
        constraints: "One character in the ASCII range 33–126",
        hints: [
          "Characters are compared by ASCII code. Check uppercase range with 'A'<=c && c<='Z'.",
          "You can also use standard functions isupper(), islower(), isdigit().",
        ],
        solutionExplanation: "char values can be compared like integers. 'A'(65)–'Z'(90), 'a'(97)–'z'(122), '0'(48)–'9'(57).",
      },
    },
    {
      id: "cond-012",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "어려움",
      title: "월의 일수",
      description: `연도 Y와 월 M이 주어질 때, 그 달의 일수를 출력하세요.

- 1, 3, 5, 7, 8, 10, 12월: 31일
- 4, 6, 9, 11월: 30일
- 2월: 28일 (평년) 또는 29일 (윤년)

윤년 조건: 4의 배수이면서 100의 배수가 아니거나, 400의 배수`,
      constraints: "1 ≤ Y ≤ 9999, 1 ≤ M ≤ 12",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int y, m;
    cin >> y >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "2024 2", expectedOutput: "29", label: "윤년 2월" },
        { stdin: "2023 2", expectedOutput: "28", label: "평년 2월" },
        { stdin: "2023 1", expectedOutput: "31", label: "31일 월" },
        { stdin: "2023 4", expectedOutput: "30", label: "30일 월" },
        { stdin: "1900 2", expectedOutput: "28", label: "100배수(평년)" },
        { stdin: "2000 2", expectedOutput: "29", label: "400배수(윤년)" },
      ],
      hints: [
        "먼저 윤년 여부를 bool 변수로 계산하세요.",
        "switch(m)으로 월별 일수를 처리하면 깔끔합니다. case 1: case 3: ... 을 연속으로 쓸 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int y, m;
    cin >> y >> m;
    bool leap = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
    int days;
    if (m == 2) days = leap ? 29 : 28;
    else if (m == 4 || m == 6 || m == 9 || m == 11) days = 30;
    else days = 31;
    cout << days << endl;
    return 0;
}`,
      solutionExplanation: "윤년 판별을 먼저 bool로 계산합니다. 2월은 윤년 여부에 따라 분기하고, 4/6/9/11월은 30일, 나머지는 31일입니다.",
      en: {
        title: "Days in a Month",
        description: `Given a year Y and month M, print the number of days in that month.\n\n- January, March, May, July, August, October, December: 31 days\n- April, June, September, November: 30 days\n- February: 28 days (common year) or 29 days (leap year)\n\nLeap year: divisible by 4 but not 100, OR divisible by 400`,
        constraints: "1 ≤ Y ≤ 9999, 1 ≤ M ≤ 12",
        hints: [
          "First compute whether it is a leap year using a bool variable.",
          "You can use switch(m) for clean month-based branching. Consecutive case labels like case 1: case 3: can share a result.",
        ],
        solutionExplanation: "Compute leap year first as a bool. Branch on February using the leap year flag, months 4/6/9/11 get 30 days, and the rest get 31.",
      },
    },
    {
      id: "cond-013",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "어려움",
      title: "세 수를 오름차순 정렬",
      description: `세 정수 A, B, C가 주어질 때, if-else만 사용해서 오름차순으로 정렬하여 출력하세요. (sort 사용 금지)`,
      constraints: "-1000 ≤ A, B, C ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // 여기에 코드를 작성하세요
    // sort() 사용 금지: if-else와 swap으로만 해결하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 1 2", expectedOutput: "1 2 3", label: "기본" },
        { stdin: "5 5 5", expectedOutput: "5 5 5", label: "같은 값" },
        { stdin: "-3 0 -1", expectedOutput: "-3 -1 0", label: "음수" },
        { stdin: "9 1 5", expectedOutput: "1 5 9", label: "역순" },
      ],
      hints: [
        "두 수를 swap하는 조건을 반복 적용합니다: a>b이면 swap(a,b).",
        "버블 정렬처럼: (a,b) → (a,c) → (b,c) 순으로 비교하면 됩니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    if (a > b) swap(a, b);
    if (a > c) swap(a, c);
    if (b > c) swap(b, c);
    cout << a << " " << b << " " << c << endl;
    return 0;
}`,
      solutionExplanation: "3번의 비교로 세 수를 정렬할 수 있습니다. 첫 swap 후 a가 최솟값, 두 번째 후 순서 확정, 세 번째로 b,c 정렬 완료.",
      en: {
        title: "Sort Three Numbers (Ascending)",
        description: `Given three integers A, B, and C, sort and print them in ascending order using only if-else (no sort() allowed).`,
        constraints: "-1000 ≤ A, B, C ≤ 1000",
        hints: [
          "Repeatedly apply swap conditions: if a>b, swap(a,b).",
          "Like bubble sort: compare (a,b) → (a,c) → (b,c) in that order.",
        ],
        solutionExplanation: "Three comparisons are enough to sort three numbers. After the first swap a holds the minimum, after the second the order is determined, and the third sorts b and c.",
      },
    },
    {
      id: "cond-014",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "어려움",
      title: "중간값",
      description: `세 정수 A, B, C가 주어질 때, 중간값(중앙값)을 출력하세요.`,
      constraints: "-1000 ≤ A, B, C ≤ 1000, 세 수는 서로 다름",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 3 2", expectedOutput: "2", label: "기본" },
        { stdin: "5 1 3", expectedOutput: "3", label: "순서 섞임" },
        { stdin: "-5 0 5", expectedOutput: "0", label: "음수 포함" },
        { stdin: "100 1 50", expectedOutput: "50", label: "큰 차이" },
      ],
      hints: [
        "최솟값도 아니고 최댓값도 아닌 수가 중간값입니다.",
        "또는: a,b,c 중 b가 중간값인 조건은 (a<=b && b<=c) || (c<=b && b<=a) 입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int mid;
    if ((a <= b && b <= c) || (c <= b && b <= a)) mid = b;
    else if ((b <= a && a <= c) || (c <= a && a <= b)) mid = a;
    else mid = c;
    cout << mid << endl;
    return 0;
}`,
      solutionExplanation: "각 값이 중간값인지 조건을 확인합니다. b가 a와 c 사이에 있으면 b가 중간값입니다.",
      en: {
        title: "Median of Three",
        description: `Given three integers A, B, and C, print the median (middle value).`,
        constraints: "-1000 ≤ A, B, C ≤ 1000, all three values are distinct",
        hints: [
          "The median is the value that is neither the minimum nor the maximum.",
          "Alternatively: b is the median if (a<=b && b<=c) || (c<=b && b<=a).",
        ],
        solutionExplanation: "Check which value lies between the other two. If b is between a and c, then b is the median.",
      },
    },
    {
      id: "cond-015",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "어려움",
      title: "구간 경계 분류",
      description: `세 정수 L, R, X가 주어질 때 (L ≤ R):
- X < L: \`left\`
- X > R: \`right\`
- X == L 또는 X == R: \`boundary\`
- L < X < R: \`inside\`

를 출력하세요.`,
      constraints: "-1000 ≤ L ≤ R ≤ 1000, -1000 ≤ X ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int l, r, x;
    cin >> l >> r >> x;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 7 5", expectedOutput: "inside", label: "내부" },
        { stdin: "3 7 3", expectedOutput: "boundary", label: "왼쪽 경계" },
        { stdin: "3 7 7", expectedOutput: "boundary", label: "오른쪽 경계" },
        { stdin: "3 7 1", expectedOutput: "left", label: "왼쪽 밖" },
        { stdin: "3 7 10", expectedOutput: "right", label: "오른쪽 밖" },
      ],
      hints: [
        "경계값 조건(x==l || x==r)을 inside보다 먼저 확인해야 합니다.",
        "순서: left → right → boundary → inside",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int l, r, x;
    cin >> l >> r >> x;
    if (x < l) cout << "left" << endl;
    else if (x > r) cout << "right" << endl;
    else if (x == l || x == r) cout << "boundary" << endl;
    else cout << "inside" << endl;
    return 0;
}`,
      solutionExplanation: "범위 밖을 먼저 처리하고, 경계값, 마지막으로 내부 순서로 확인합니다. USACO에서 경계 처리 실수가 자주 오답 원인이 됩니다.",
      en: {
        title: "Interval Boundary Classification",
        description: `Given three integers L, R, and X (L ≤ R):\n- X < L: \`left\`\n- X > R: \`right\`\n- X == L or X == R: \`boundary\`\n- L < X < R: \`inside\``,
        constraints: "-1000 ≤ L ≤ R ≤ 1000, -1000 ≤ X ≤ 1000",
        hints: [
          "Check boundary conditions (x==l || x==r) before checking inside.",
          "Order: left → right → boundary → inside",
        ],
        solutionExplanation: "Handle out-of-range first, then boundary, then inside. In USACO, mistakes in boundary handling are a common source of wrong answers.",
      },
    },
    {
      id: "cond-016",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "성적 등급 출력",
      description: `이름과 점수(0~100)가 주어질 때, 등급을 출력하세요.

- 90 이상: A
- 80 이상: B
- 70 이상: C
- 60 이상: D
- 60 미만: F

형식: \`[이름]: [등급]\``,
      constraints: "0 ≤ 점수 ≤ 100, 이름은 영문 최대 20자",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int score;
    cin >> name >> score;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "Alice 95", expectedOutput: "Alice: A", label: "A등급" },
        { stdin: "Bob 73", expectedOutput: "Bob: C", label: "C등급" },
        { stdin: "Charlie 55", expectedOutput: "Charlie: F", label: "F등급" },
        { stdin: "Dave 80", expectedOutput: "Dave: B", label: "경계값 B" },
      ],
      hints: [
        "else if 체인으로 점수 범위를 높은 순서부터 확인하세요.",
        "char 변수에 등급을 저장하고 마지막에 한 번에 출력하면 깔끔합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int score;
    cin >> name >> score;
    char grade;
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';
    cout << name << ": " << grade << "\\n";
    return 0;
}`,
      solutionExplanation: "조건을 높은 점수부터 확인합니다. 앞 조건을 통과하면 자동으로 그보다 낮은 범위임이 보장되므로 else if가 정확하게 동작합니다.",
      en: {
        title: "Print Grade with Name",
        description: `Given a name and a score (0~100), print the grade in the format \`[name]: [grade]\`.\n\n- 90 or above: A\n- 80 or above: B\n- 70 or above: C\n- 60 or above: D\n- Below 60: F`,
        constraints: "0 ≤ score ≤ 100, name is up to 20 English characters",
        hints: [
          "Use an else if chain checking from the highest score down.",
          "Store the grade in a char variable and print it all at once at the end.",
        ],
        solutionExplanation: "Check conditions from the highest score downward. Once an else if passes, lower ranges are guaranteed by exclusion, so no && is needed.",
      },
    },
    // ── 삼항 연산자 ──────────────────────────────────────────────────
    {
      id: "cond-017",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "삼항 연산자 — 큰 수",
      description: `두 정수 A, B가 주어질 때, **삼항 연산자 (?:)** 를 사용해 더 큰 수를 출력하세요.
A == B이면 둘 중 아무 값이나 출력해도 됩니다.

**삼항 연산자 문법:**
\`조건 ? 참일 때 값 : 거짓일 때 값\`

**예시**
- 입력: \`3 7\` → 출력: \`7\`
- 입력: \`9 4\` → 출력: \`9\`
- 입력: \`5 5\` → 출력: \`5\``,
      constraints: "-1000 ≤ A, B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // 삼항 연산자를 사용하세요: 조건 ? 값1 : 값2
    int result = /* 여기를 채우세요 */;
    cout << result << endl;
    return 0;
}`,
      testCases: [
        { stdin: "3 7", expectedOutput: "7", label: "b가 큼" },
        { stdin: "9 4", expectedOutput: "9", label: "a가 큼" },
        { stdin: "5 5", expectedOutput: "5", label: "같음" },
        { stdin: "-3 -1", expectedOutput: "-1", label: "음수" },
      ],
      hints: [
        "삼항 연산자: 조건 ? 참일 때 : 거짓일 때",
        "int result = (a > b) ? a : b;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int result = (a > b) ? a : b;
    cout << result << endl;
    return 0;
}`,
      solutionExplanation: "(a > b) ? a : b 는 a가 b보다 크면 a, 아니면 b를 반환합니다. if-else를 한 줄로 표현한 것입니다.",
      en: {
        title: "Ternary Operator — Larger Number",
        description: `Given two integers A and B, use the **ternary operator (?:)** to print the larger one.\nIf A == B, either value is acceptable.\n\n**Ternary operator syntax:**\n\`condition ? value_if_true : value_if_false\`\n\n**Examples**\n- Input: \`3 7\` → Output: \`7\`\n- Input: \`9 4\` → Output: \`9\`\n- Input: \`5 5\` → Output: \`5\``,
        constraints: "-1000 ≤ A, B ≤ 1000",
        hints: [
          "Ternary operator: condition ? if_true : if_false",
          "int result = (a > b) ? a : b;",
        ],
        solutionExplanation: "(a > b) ? a : b returns a if a is greater than b, otherwise b. It is a one-line equivalent of if-else.",
      },
    },
    {
      id: "cond-018",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "삼항 연산자 — 부호 분류",
      description: `정수 N이 주어질 때, **삼항 연산자만 사용해서** 다음을 출력하세요.

- N > 0: \`positive\`
- N < 0: \`negative\`
- N == 0: \`zero\`

**힌트:** 삼항 연산자는 중첩할 수 있습니다.
\`조건1 ? 값1 : (조건2 ? 값2 : 값3)\``,
      constraints: "-1000 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 삼항 연산자만 사용해서 result에 결과를 저장하세요
    string result = (n > 0) ? "positive" : /* 여기를 채우세요 */;
    cout << result << endl;
    return 0;
}`,
      testCases: [
        { stdin: "7", expectedOutput: "positive", label: "양수" },
        { stdin: "-3", expectedOutput: "negative", label: "음수" },
        { stdin: "0", expectedOutput: "zero", label: "0" },
        { stdin: "1000", expectedOutput: "positive", label: "최댓값" },
      ],
      hints: [
        "중첩 삼항: (n > 0) ? \"positive\" : (n < 0) ? \"negative\" : \"zero\"",
        "삼항 연산자를 연달아 쓰면 if-else if-else와 같습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    string result = (n > 0) ? "positive" : (n < 0) ? "negative" : "zero";
    cout << result << endl;
    return 0;
}`,
      solutionExplanation: "중첩 삼항 연산자입니다. n>0이면 positive, 아니면 다시 n<0을 검사해 negative, 둘 다 아니면 zero.",
      en: {
        title: "Ternary Operator — Sign Classification",
        description: `Given an integer N, use **only the ternary operator** to print:\n\n- N > 0: \`positive\`\n- N < 0: \`negative\`\n- N == 0: \`zero\`\n\n**Hint:** Ternary operators can be nested.\n\`condition1 ? value1 : (condition2 ? value2 : value3)\``,
        constraints: "-1000 ≤ N ≤ 1000",
        hints: [
          "Nested ternary: (n > 0) ? \"positive\" : (n < 0) ? \"negative\" : \"zero\"",
          "Chaining ternary operators is equivalent to if-else if-else.",
        ],
        solutionExplanation: "This is a nested ternary operator. If n>0 → positive; otherwise check n<0 → negative; if neither → zero.",
      },
    },
    // ── switch / case ─────────────────────────────────────────────────
    {
      id: "cond-019",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "쉬움",
      title: "switch — 요일 출력",
      description: `1~7의 정수가 주어질 때, **switch** 문을 사용해 요일을 출력하세요.

- 1: \`Monday\`
- 2: \`Tuesday\`
- 3: \`Wednesday\`
- 4: \`Thursday\`
- 5: \`Friday\`
- 6: \`Saturday\`
- 7: \`Sunday\``,
      constraints: "1 ≤ N ≤ 7",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    switch (n) {
        case 1: cout << "Monday" << endl; break;
        // 나머지를 채우세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "Monday", label: "월요일" },
        { stdin: "5", expectedOutput: "Friday", label: "금요일" },
        { stdin: "7", expectedOutput: "Sunday", label: "일요일" },
        { stdin: "3", expectedOutput: "Wednesday", label: "수요일" },
      ],
      hints: [
        "각 case마다 break를 잊지 마세요. break 없으면 다음 case도 실행됩니다.",
        "case 2: cout << \"Tuesday\" << endl; break;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    switch (n) {
        case 1: cout << "Monday" << endl; break;
        case 2: cout << "Tuesday" << endl; break;
        case 3: cout << "Wednesday" << endl; break;
        case 4: cout << "Thursday" << endl; break;
        case 5: cout << "Friday" << endl; break;
        case 6: cout << "Saturday" << endl; break;
        case 7: cout << "Sunday" << endl; break;
    }
    return 0;
}`,
      solutionExplanation: "switch는 변수 값에 따라 해당 case로 점프합니다. break가 없으면 아래 case까지 연속 실행되므로 반드시 break를 씁니다.",
      en: {
        title: "switch — Day of the Week",
        description: `Given an integer 1~7, use a **switch** statement to print the day of the week.\n\n- 1: \`Monday\`\n- 2: \`Tuesday\`\n- 3: \`Wednesday\`\n- 4: \`Thursday\`\n- 5: \`Friday\`\n- 6: \`Saturday\`\n- 7: \`Sunday\``,
        constraints: "1 ≤ N ≤ 7",
        hints: [
          "Don't forget break after each case. Without break, execution falls through to the next case.",
          "case 2: cout << \"Tuesday\" << endl; break;",
        ],
        solutionExplanation: "switch jumps to the matching case based on the variable value. Always use break to prevent fall-through to subsequent cases.",
      },
    },
    {
      id: "cond-020",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "switch fall-through — 계절",
      description: `월(1~12)이 주어질 때, **switch의 fall-through**를 활용해 계절을 출력하세요.

- 3, 4, 5월: \`spring\`
- 6, 7, 8월: \`summer\`
- 9, 10, 11월: \`fall\`
- 12, 1, 2월: \`winter\`

**fall-through:** case에 break를 생략하면 다음 case로 이어집니다.
\`\`\`
case 3:
case 4:
case 5: cout << "spring"; break;
\`\`\``,
      constraints: "1 ≤ M ≤ 12",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    switch (m) {
        case 3:
        case 4:
        case 5: cout << "spring" << endl; break;
        // 나머지 계절을 채우세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "4", expectedOutput: "spring", label: "봄" },
        { stdin: "7", expectedOutput: "summer", label: "여름" },
        { stdin: "10", expectedOutput: "fall", label: "가을" },
        { stdin: "1", expectedOutput: "winter", label: "겨울(1월)" },
        { stdin: "12", expectedOutput: "winter", label: "겨울(12월)" },
      ],
      hints: [
        "case에 break가 없으면 다음 case로 이어집니다. 이를 fall-through라 합니다.",
        "12월은 1, 2월과 같은 계절이라 case 12: case 1: case 2: 로 묶을 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    switch (m) {
        case 3: case 4: case 5:
            cout << "spring" << endl; break;
        case 6: case 7: case 8:
            cout << "summer" << endl; break;
        case 9: case 10: case 11:
            cout << "fall" << endl; break;
        case 12: case 1: case 2:
            cout << "winter" << endl; break;
    }
    return 0;
}`,
      solutionExplanation: "fall-through를 이용해 여러 case를 한 번에 처리합니다. 마지막 case에만 break를 씁니다. default는 입력이 보장될 때 생략 가능합니다.",
      en: {
        title: "switch Fall-Through — Seasons",
        description: `Given a month (1~12), use **switch fall-through** to print the season.\n\n- March, April, May: \`spring\`\n- June, July, August: \`summer\`\n- September, October, November: \`fall\`\n- December, January, February: \`winter\`\n\n**Fall-through:** omitting break in a case causes execution to continue to the next case.\n\`\`\`\ncase 3:\ncase 4:\ncase 5: cout << "spring"; break;\n\`\`\``,
        constraints: "1 ≤ M ≤ 12",
        hints: [
          "Without break, execution falls through to the next case. This is called fall-through.",
          "December, January, and February share the same season, so use case 12: case 1: case 2: together.",
        ],
        solutionExplanation: "Use fall-through to group multiple cases together. Only place break after the last case in each group. When input is guaranteed valid, default can be omitted.",
      },
    },
    {
      id: "cond-021",
      cluster: "conditionals",
      unlockAfter: "cpp-6",
      difficulty: "보통",
      title: "switch — 사칙연산 계산기",
      description: `두 정수 A, B와 연산자 문자(+, -, *, /) 가 주어질 때, **switch** 문을 사용해 계산 결과를 출력하세요.

- 나눗셈은 정수 나눗셈(몫)을 출력합니다.
- 0으로 나누는 입력은 주어지지 않습니다.

**예시**
- 입력: \`10 3 +\` → 출력: \`13\`
- 입력: \`10 3 -\` → 출력: \`7\`
- 입력: \`10 3 *\` → 출력: \`30\`
- 입력: \`10 3 /\` → 출력: \`3\``,
      constraints: "-1000 ≤ A, B ≤ 1000, B ≠ 0 (나눗셈의 경우)",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;
    cin >> a >> b >> op;
    switch (op) {
        // 각 연산자 case를 작성하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "10 3 +", expectedOutput: "13", label: "덧셈" },
        { stdin: "10 3 -", expectedOutput: "7", label: "뺄셈" },
        { stdin: "10 3 *", expectedOutput: "30", label: "곱셈" },
        { stdin: "10 3 /", expectedOutput: "3", label: "나눗셈(몫)" },
        { stdin: "-5 2 +", expectedOutput: "-3", label: "음수 덧셈" },
      ],
      hints: [
        "switch는 char에도 사용할 수 있습니다. case '+':",
        "각 연산자마다 case를 작성하고 break를 잊지 마세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;
    cin >> a >> b >> op;
    switch (op) {
        case '+': cout << a + b << endl; break;
        case '-': cout << a - b << endl; break;
        case '*': cout << a * b << endl; break;
        case '/': cout << a / b << endl; break;
    }
    return 0;
}`,
      solutionExplanation: "switch는 char 타입에도 동작합니다. case '+'처럼 문자 리터럴을 씁니다. int a / int b는 자동으로 정수 나눗셈(몫)이 됩니다.",
      en: {
        title: "switch — Four-Operation Calculator",
        description: `Given two integers A and B and an operator character (+, -, *, /), use a **switch** statement to print the result.\n\n- Division outputs integer quotient.\n- Division by zero will not appear in the input.\n\n**Examples**\n- Input: \`10 3 +\` → Output: \`13\`\n- Input: \`10 3 -\` → Output: \`7\`\n- Input: \`10 3 *\` → Output: \`30\`\n- Input: \`10 3 /\` → Output: \`3\``,
        constraints: "-1000 ≤ A, B ≤ 1000, B ≠ 0 (for division)",
        hints: [
          "switch works with char too. Use case '+':",
          "Write a case for each operator and don't forget break.",
        ],
        solutionExplanation: "switch works on char values. Use character literals like case '+':. Integer division a / b automatically truncates toward zero.",
      },
    },
  ],
}
