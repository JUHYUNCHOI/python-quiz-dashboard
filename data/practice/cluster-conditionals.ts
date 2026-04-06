import type { PracticeCluster } from "./types"

export const conditionalsCluster: PracticeCluster = {
  id: "conditionals",
  title: "조건/논리",
  emoji: "🔀",
  description: "if-else, 논리 연산자, 경계값 처리",
  unlockAfter: "cpp-6",
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
    },
  ],
}
