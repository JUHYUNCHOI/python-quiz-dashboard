import type { PracticeCluster } from "./types"

export const part1ComboCluster: PracticeCluster = {
  id: "part1-combo",
  title: "Part 1 종합",
  emoji: "🎯",
  description: "입출력 + 조건문 + 반복문을 조합한 종합 문제",
  unlockAfter: "cpp-p1",
  en: { title: "Part 1 Combined", description: "Comprehensive problems combining I/O, conditionals, and loops" },
  problems: [
    {
      id: "p1c-001",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "쉬움",
      title: "홀수만 합계",
      description: `정수 N이 주어질 때, 1부터 N까지의 홀수만 더한 합계를 출력하세요.`,
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
        { stdin: "5", expectedOutput: "9", label: "1+3+5=9" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "10", expectedOutput: "25", label: "1+3+5+7+9=25" },
        { stdin: "6", expectedOutput: "9", label: "1+3+5=9" },
      ],
      hints: [
        "for 루프로 1부터 n까지 순회하세요.",
        "if (i % 2 != 0)로 홀수를 걸러내어 sum에 더하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 2 != 0) sum += i;
    }
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "1부터 n까지 반복하며 홀수(i % 2 != 0)인 경우만 합산합니다.",
      en: {
        title: "Sum of Odd Numbers",
        description: `Given an integer N, print the sum of all odd numbers from 1 to N.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Use a for loop to iterate from 1 to n.",
          "Use `if (i % 2 != 0)` to filter odd numbers and add them to sum.",
        ],
        solutionExplanation: "Iterate from 1 to n and accumulate only the odd values (where `i % 2 != 0`).",
      },
    },
    {
      id: "p1c-002",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "쉬움",
      title: "양수 개수 세기",
      description: `N개의 정수가 주어질 때, 그 중 양수(0보다 큰 수)의 개수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 -1 0 7 -2", expectedOutput: "2", label: "기본" },
        { stdin: "3\n-1 -2 -3", expectedOutput: "0", label: "양수 없음" },
        { stdin: "4\n1 2 3 4", expectedOutput: "4", label: "전부 양수" },
        { stdin: "3\n0 0 0", expectedOutput: "0", label: "전부 0" },
      ],
      hints: [
        "N개를 for 루프로 하나씩 입력받으세요.",
        "입력받은 값이 0보다 크면 카운터를 1 증가시키세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > 0) count++;
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation: "N개를 순서대로 읽으며 양수인 경우 count를 증가시킵니다. 0은 양수가 아니므로 x > 0 조건으로 처리합니다.",
      en: {
        title: "Count Positive Numbers",
        description: `Given N integers, print how many of them are positive (greater than 0).`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each integer ≤ 1000",
        hints: [
          "Read each of the N numbers one by one in a for loop.",
          "Increment a counter when the value is greater than 0.",
        ],
        solutionExplanation: "Read the numbers in order and increment `count` for each positive value. Note that 0 is not positive, so use the strict `x > 0` condition.",
      },
    },
    {
      id: "p1c-003",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "쉬움",
      title: "구구단 한 줄",
      description: `정수 N이 주어질 때, N단의 구구단을 1부터 9까지 출력하세요.

형식: \`N x i = 결과\``,
      constraints: "1 ≤ N ≤ 9",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27", label: "3단" },
        { stdin: "1", expectedOutput: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9", label: "1단" },
      ],
      hints: [
        "for (int i = 1; i <= 9; i++)로 1부터 9까지 반복하세요.",
        "cout << n << \" x \" << i << \" = \" << n * i 형태로 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= 9; i++) {
        cout << n << " x " << i << " = " << n * i << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "i를 1부터 9까지 반복하며 n * i를 계산해 지정된 형식으로 출력합니다.",
      en: {
        title: "Multiplication Table Row",
        description: `Given an integer N, print the N times table from 1 to 9.

Format: \`N x i = result\``,
        constraints: "1 ≤ N ≤ 9",
        hints: [
          "Use `for (int i = 1; i <= 9; i++)` to iterate from 1 to 9.",
          "Print with `cout << n << \" x \" << i << \" = \" << n * i`.",
        ],
        solutionExplanation: "Loop `i` from 1 to 9, compute `n * i`, and print it in the specified format.",
      },
    },
    {
      id: "p1c-004",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "보통",
      title: "약수 합계",
      description: `정수 N이 주어질 때, N의 모든 약수의 합을 출력하세요.`,
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
        { stdin: "12", expectedOutput: "28", label: "1+2+3+4+6+12=28" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "7", expectedOutput: "8", label: "소수 (1+7=8)" },
        { stdin: "6", expectedOutput: "12", label: "1+2+3+6=12" },
      ],
      hints: [
        "1부터 n까지 반복하며 n % i == 0 인 경우 약수예요.",
        "약수를 sum에 더하고 마지막에 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) sum += i;
    }
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "1부터 n까지 모든 수를 시도해 n을 나누어 떨어지게 하는 수(약수)를 찾아 합산합니다.",
      en: {
        title: "Sum of Divisors",
        description: `Given an integer N, print the sum of all its divisors.`,
        constraints: "1 ≤ N ≤ 10000",
        hints: [
          "Iterate from 1 to n; if `n % i == 0`, then i is a divisor.",
          "Add each divisor to sum and print the total at the end.",
        ],
        solutionExplanation: "Try every number from 1 to n and add those that divide n evenly (divisors) to the running sum.",
      },
    },
    {
      id: "p1c-005",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "보통",
      title: "소수 판별",
      description: `정수 N이 주어질 때, N이 소수이면 \`YES\`, 아니면 \`NO\`를 출력하세요.

소수: 1보다 크고, 1과 자기 자신으로만 나누어지는 수`,
      constraints: "2 ≤ N ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "7", expectedOutput: "YES", label: "소수" },
        { stdin: "12", expectedOutput: "NO", label: "합성수" },
        { stdin: "2", expectedOutput: "YES", label: "가장 작은 소수" },
        { stdin: "1", expectedOutput: "NO", label: "1은 소수 아님" },
      ],
      hints: [
        "2부터 n-1까지 반복하며 n을 나눌 수 있는 수가 있으면 소수가 아니에요.",
        "bool isPrime = true로 시작해서, 나눠지면 false로 바꾸세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool isPrime = (n >= 2);
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    cout << (isPrime ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation: "2부터 n-1까지 시도해 나누어 떨어지는 수가 하나라도 있으면 소수가 아닙니다. break로 조기 종료해 불필요한 반복을 줄입니다.",
      en: {
        title: "Prime Number Check",
        description: `Given an integer N, print \`YES\` if it is prime, \`NO\` otherwise.

A prime number is greater than 1 and divisible only by 1 and itself.`,
        constraints: "2 ≤ N ≤ 10000",
        hints: [
          "Try every number from 2 to n-1; if any divides n evenly, it is not prime.",
          "Start with `bool isPrime = true` and set it to false if a divisor is found.",
        ],
        solutionExplanation: "If any number from 2 to n-1 divides n evenly, n is not prime. Use `break` to exit early and avoid unnecessary iterations.",
      },
    },
    {
      id: "p1c-006",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "보통",
      title: "계단 패턴",
      description: `정수 N이 주어질 때, 아래와 같은 계단 모양의 별을 출력하세요.

N=4 예시:
\`\`\`
*
**
***
****
\`\`\``,
      constraints: "1 ≤ N ≤ 20",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4", expectedOutput: "*\n**\n***\n****", label: "N=4" },
        { stdin: "1", expectedOutput: "*", label: "N=1" },
        { stdin: "3", expectedOutput: "*\n**\n***", label: "N=3" },
      ],
      hints: [
        "바깥 for 루프로 줄 번호(1~n)를 반복하세요.",
        "안쪽 for 루프로 줄 번호만큼 별을 출력하고, 줄바꿈하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            cout << "*";
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "바깥 루프가 줄 번호 i를 1~n으로 증가시키고, 안쪽 루프가 i번 별을 출력합니다. 중첩 반복문의 기본 패턴입니다.",
      en: {
        title: "Staircase Pattern",
        description: `Given an integer N, print a staircase pattern of stars as shown below.

Example for N=4:
\`\`\`
*
**
***
****
\`\`\``,
        constraints: "1 ≤ N ≤ 20",
        hints: [
          "Use an outer for loop for the row number (1 to n).",
          "Use an inner for loop to print that many stars, then print a newline.",
        ],
        solutionExplanation: "The outer loop increases the row number `i` from 1 to n, and the inner loop prints `i` stars. This is the classic nested loop pattern.",
      },
    },
    {
      id: "p1c-007",
      cluster: "part1-combo",
      unlockAfter: "cpp-p1",
      difficulty: "어려움",
      title: "점수 통계",
      description: `N명의 점수(0~100)가 주어질 때, 다음을 출력하세요.

- 첫 번째 줄: 평균 (소수점 **첫째 자리**까지)
- 두 번째 줄: 최고점
- 세 번째 줄: 평균 이상인 학생 수

💡 **소수점 자리수 고정 출력 방법** — \`<iomanip>\` 헤더를 포함하고,
\`cout << fixed << setprecision(1) << avg;\` 처럼 \`fixed\`와 \`setprecision(N)\`을 함께 씁니다. \`N\`이 소수점 아래 자릿수예요.`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n80 90 70 95 85", expectedOutput: "84.0\n95\n3", label: "기본" },
        { stdin: "3\n100 100 100", expectedOutput: "100.0\n100\n3", label: "전부 최고점" },
        { stdin: "4\n60 70 80 90", expectedOutput: "75.0\n90\n2", label: "정확히 절반" },
      ],
      hints: [
        "입력을 배열 없이 처리하려면 두 번 반복해야 해서 어렵습니다. int scores[100]에 저장해보세요.",
        "평균 계산 후, 다시 배열을 순회하며 평균 이상인 값을 세세요.",
      ],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    int scores[100];
    int sum = 0, maxScore = 0;
    for (int i = 0; i < n; i++) {
        cin >> scores[i];
        sum += scores[i];
        if (scores[i] > maxScore) maxScore = scores[i];
    }
    double avg = (double)sum / n;
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] >= avg) count++;
    }
    cout << fixed << setprecision(1) << avg << "\\n";
    cout << maxScore << "\\n";
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation: "배열에 점수를 저장하며 합계와 최대값을 구합니다. 평균 계산 후 다시 순회해 평균 이상인 학생 수를 셉니다.",
      en: {
        title: "Score Statistics",
        description: `Given the scores (0–100) of N students, print the following:

- First line: average (to **one decimal place**)
- Second line: highest score
- Third line: number of students at or above the average

💡 **How to fix decimal places** — include \`<iomanip>\` and use
\`cout << fixed << setprecision(1) << avg;\`. Here \`N\` inside \`setprecision(N)\` is the number of digits after the decimal point.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ score ≤ 100",
        hints: [
          "Without an array you would need two passes over the input, which is tricky. Store the scores in `int scores[100]`.",
          "After computing the average, iterate over the array again to count students at or above it.",
        ],
        solutionExplanation: "Store scores in an array while computing the sum and maximum in one pass. Then compute the average and do a second pass to count students who meet or exceed it.",
      },
    },
  ],
}
