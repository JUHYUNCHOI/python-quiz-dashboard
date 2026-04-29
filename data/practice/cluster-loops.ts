import type { PracticeCluster } from "./types"

export const loopsCluster: PracticeCluster = {
  id: "loops",
  title: "반복문 패턴",
  emoji: "🔁",
  description: "for/while, 누적, 중첩 루프, 패턴 출력",
  unlockAfter: "cpp-7",
  en: {
    title: "Loop Patterns",
    description: "for/while loops, accumulation, nested loops, pattern printing",
  },
  problems: [
    {
      id: "loop-001",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "1부터 N까지 합",
      description: `정수 N이 주어질 때, 1부터 N까지 모든 정수의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5", expectedOutput: "15", label: "기본" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "10", expectedOutput: "55", label: "N=10" },
        { stdin: "100", expectedOutput: "5050", label: "N=100" },
      ],
      hints: [
        "sum 변수를 0으로 초기화하고 for 루프로 더하세요.",
        "for (int i = 1; i <= n; i++) sum += i;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation: "누적 합계 패턴: sum=0으로 초기화 후 1부터 n까지 더합니다. n*(n+1)/2 공식으로도 가능합니다.",
      en: {
        title: "Sum from 1 to N",
        description: `Given an integer N, print the sum of all integers from 1 to N.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Initialize a sum variable to 0 and add using a for loop.",
          "for (int i = 1; i <= n; i++) sum += i;",
        ],
        solutionExplanation: "Accumulation pattern: initialize sum=0, then add each number from 1 to n. You can also use the formula n*(n+1)/2.",
      },
    },
    // ── while + break ────────────────────────────────────────────────
    {
      id: "loop-W01",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "0 전까지 합산 (while + break)",
      description: `정수를 한 줄에 하나씩 입력받습니다. **0이 입력되면 즉시 종료**하고, 그 전까지 입력받은 수의 합계를 출력하세요.

**예시**
- 입력: \`3 5 2 0\` (한 줄에 하나씩) → 출력: \`10\`
- 입력: \`0\` → 출력: \`0\`

**힌트:** \`while (true) { ... if (n == 0) break; ... }\` 패턴을 사용하세요.`,
      constraints: "입력 수는 최대 100개, 각 수의 절댓값 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3\n5\n2\n0", expectedOutput: "10", label: "기본" },
        { stdin: "10\n0", expectedOutput: "10", label: "값 하나" },
        { stdin: "0", expectedOutput: "0", label: "바로 0" },
        { stdin: "1\n2\n3\n4\n5\n0", expectedOutput: "15", label: "5개" },
        { stdin: "-3\n7\n0", expectedOutput: "4", label: "음수 포함" },
      ],
      hints: [
        "while (true) 는 무한 루프입니다. break로만 빠져나올 수 있어요.",
        "cin >> n 으로 읽은 후 if (n == 0) break; 를 먼저 확인하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    while (true) {
        cin >> n;
        if (n == 0) break;
        sum += n;
    }
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation: "while (true)로 무한 루프를 만들고 break로 탈출합니다. for 루프와 달리 while은 반복 횟수를 미리 알 수 없을 때 적합합니다.",
      en: {
        title: "Sum Until Zero (while + break)",
        description: `Integers are given one per line. When **0 is entered, stop immediately** and print the sum of all numbers before it.\n\n**Examples**\n- Input: \`3 5 2 0\` (one per line) → Output: \`10\`\n- Input: \`0\` → Output: \`0\`\n\n**Hint:** Use the pattern \`while (true) { ... if (n == 0) break; ... }\``,
        constraints: "At most 100 numbers, absolute value of each ≤ 1000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "while (true) is an infinite loop — break is the only way out.",
          "After reading cin >> n, check if (n == 0) break; before adding to sum.",
        ],
        solutionExplanation: "while (true) creates an infinite loop and break exits it. Unlike for loops, while is ideal when the number of iterations isn't known in advance.",
      },
    },
    // ── do-while ─────────────────────────────────────────────────────
    {
      id: "loop-DW01",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "절반씩 줄이기 (do-while)",
      description: `양의 정수 N이 주어질 때, **do-while 루프를 사용해** N을 계속 2로 나누며 그 결과를 출력하세요. 결과가 0이 되면 멈춥니다.

**예시**
- 입력: \`16\` → 출력: \`8  4  2  1\` (한 줄에 하나씩)
- 입력: \`7\` → 출력: \`3  1\`

**do-while 특성:** 조건을 나중에 검사하므로 **무조건 한 번은 실행**됩니다.`,
      constraints: "2 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "16", expectedOutput: "8\n4\n2\n1", label: "16" },
        { stdin: "7", expectedOutput: "3\n1", label: "7" },
        { stdin: "2", expectedOutput: "1", label: "2" },
        { stdin: "100", expectedOutput: "50\n25\n12\n6\n3\n1", label: "100" },
      ],
      hints: [
        "루프 안에서 n을 2로 나누고, 그 결과를 출력하세요.",
        "while 조건: n이 아직 양수인 동안 계속 반복해야 합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    do {
        n /= 2;
        cout << n << "\\n";
    } while (n > 1);
    return 0;
}`,
      solutionExplanation: "do-while은 { } 안의 코드를 먼저 실행한 뒤 while 조건을 검사합니다. n /= 2로 절반씩 줄이고, n이 0이 되면 루프가 끝납니다.",
      en: {
        title: "Halve Repeatedly (do-while)",
        description: `Given a positive integer N, use a **do-while loop** to repeatedly divide N by 2 and print each result. Stop when the result becomes 0.\n\n**Examples**\n- Input: \`16\` → Output: \`8  4  2  1\` (one per line)\n- Input: \`7\` → Output: \`3  1\`\n\n**do-while characteristic:** The condition is checked after the body, so it **always executes at least once**.`,
        constraints: "2 ≤ N ≤ 1000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Inside the loop, divide n by 2 and print the result.",
          "While condition: keep looping as long as n is still positive.",
        ],
        solutionExplanation: "do-while executes the code in { } first, then checks the while condition. n /= 2 halves n each time, and the loop ends when n reaches 0.",
      },
    },
    // ── continue ──────────────────────────────────────────────────────
    {
      id: "loop-C01",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "3의 배수 건너뛰기 (continue)",
      description: `1부터 N까지 정수 중 **3의 배수를 제외하고** 나머지를 한 줄에 하나씩 출력하세요. **continue 문을 사용하세요.**

**예시**
- 입력: \`10\` → 출력: \`1 2 4 5 7 8 10\` (한 줄에 하나씩)
- 입력: \`6\` → 출력: \`1 2 4 5\`

**continue 특성:** 현재 반복을 즉시 건너뛰고 다음 반복으로 이동합니다.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "10", expectedOutput: "1\n2\n4\n5\n7\n8\n10", label: "N=10" },
        { stdin: "6", expectedOutput: "1\n2\n4\n5", label: "N=6" },
        { stdin: "3", expectedOutput: "1\n2", label: "N=3" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
      ],
      hints: [
        "if (i % 3 == 0) continue; 를 루프 맨 위에 두면 3의 배수일 때 출력을 건너뜁니다.",
        "continue는 현재 반복의 나머지 코드를 건너뛰고 바로 다음 i++로 이동합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0) continue;
        cout << i << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복으로 이동합니다. if 조건으로 건너뛸 대상을 먼저 걸러내는 것이 가독성에 좋습니다.",
      en: {
        title: "Skip Multiples of 3 (continue)",
        description: `Print all integers from 1 to N **except multiples of 3**, one per line. **Use the continue statement.**\n\n**Examples**\n- Input: \`10\` → Output: \`1 2 4 5 7 8 10\` (one per line)\n- Input: \`6\` → Output: \`1 2 4 5\`\n\n**continue characteristic:** Immediately skips the rest of the current iteration and moves to the next one.`,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "Put if (i % 3 == 0) continue; at the top of the loop to skip multiples of 3.",
          "continue skips the remaining code in the current iteration and jumps to the next i++.",
        ],
        solutionExplanation: "continue skips the rest of the current iteration and moves to the next. Filtering out the 'skip' condition at the top improves readability.",
      },
    },
    {
      id: "loop-002",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "N의 배수 출력",
      description: `두 정수 N과 M이 주어질 때, 1 이상 M 이하인 N의 배수를 한 줄에 하나씩 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, N ≤ M ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3 10", expectedOutput: "3\n6\n9", label: "기본" },
        { stdin: "5 20", expectedOutput: "5\n10\n15\n20", label: "5의 배수" },
        { stdin: "7 7", expectedOutput: "7", label: "N=M" },
      ],
      hints: [
        "i를 N부터 시작해서 N씩 증가시키거나, 모든 i에 대해 i%N==0을 확인하세요.",
        "for (int i = n; i <= m; i += n)",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = n; i <= m; i += n)
        cout << i << "\\n";
    return 0;
}`,
      solutionExplanation: "i를 n으로 초기화하고 n씩 증가시키면 n의 배수만 순서대로 얻을 수 있습니다.",
      en: {
        title: "Multiples of N",
        description: `Given two integers N and M, print all multiples of N that are between 1 and M (inclusive), one per line.`,
        constraints: "1 ≤ N ≤ 100, N ≤ M ≤ 1000",
        hints: [
          "Start i at N and increase by N each step, or check i%N==0 for every i.",
          "for (int i = n; i <= m; i += n)",
        ],
        solutionExplanation: "Initialize i to n and increase by n each iteration to get only multiples of n in order.",
      },
    },
    {
      id: "loop-003",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "팩토리얼",
      description: `정수 N이 주어질 때, N! (N 팩토리얼)을 출력하세요.

N! = 1 × 2 × 3 × … × N`,
      constraints: "1 ≤ N ≤ 12",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1!" },
        { stdin: "5", expectedOutput: "120", label: "5!" },
        { stdin: "10", expectedOutput: "3628800", label: "10!" },
        { stdin: "12", expectedOutput: "479001600", label: "12!" },
      ],
      hints: [
        "result 변수를 1로 초기화하고 1부터 n까지 곱하세요.",
        "for (int i = 1; i <= n; i++) result *= i;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long result = 1;
    for (int i = 1; i <= n; i++) result *= i;
    cout << result << endl;
    return 0;
}`,
      solutionExplanation: "곱셈 누적 패턴: result=1로 초기화 후 1부터 n까지 곱합니다. 12!은 int 범위를 넘을 수 있으므로 long long을 사용합니다.",
      en: {
        title: "Factorial",
        description: `Given an integer N, print N! (N factorial).\n\nN! = 1 × 2 × 3 × … × N`,
        constraints: "1 ≤ N ≤ 12",
        hints: [
          "Initialize a result variable to 1 and multiply from 1 to n.",
          "for (int i = 1; i <= n; i++) result *= i;",
        ],
        solutionExplanation: "Multiplication accumulation pattern: initialize result=1, then multiply each number from 1 to n. Use long long since 12! can exceed the int range.",
      },
    },
    {
      id: "loop-004",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "별 삼각형",
      description: `정수 N이 주어질 때, 아래와 같이 별(*) 삼각형을 출력하세요.

N=3일 때:
\`\`\`
*
**
***
\`\`\``,
      constraints: "1 ≤ N ≤ 20",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "*\n**\n***", label: "N=3" },
        { stdin: "1", expectedOutput: "*", label: "N=1" },
        { stdin: "5", expectedOutput: "*\n**\n***\n****\n*****", label: "N=5" },
      ],
      hints: [
        "바깥 루프는 행(i), 안쪽 루프는 그 행에 출력할 * 개수(j)를 담당합니다.",
        "for(i=1..n) { for(j=1..i) { cout << '*'; } cout << '\\n'; }",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            cout << '*';
        cout << '\\n';
    }
    return 0;
}`,
      solutionExplanation: "i번째 행에서 별을 i개 출력합니다. 안쪽 루프의 상한을 i로 설정하는 것이 핵심입니다.",
      en: {
        title: "Star Triangle",
        description: `Given an integer N, print a triangle of stars (*) as shown below.\n\nFor N=3:\n\`\`\`\n*\n**\n***\n\`\`\``,
        constraints: "1 ≤ N ≤ 20",
        hints: [
          "The outer loop handles rows (i), and the inner loop prints the number of stars for that row (j).",
          "for(i=1..n) { for(j=1..i) { cout << '*'; } cout << '\\n'; }",
        ],
        solutionExplanation: "Print i stars on the i-th row. The key is setting the inner loop's upper bound to i.",
      },
    },
    {
      id: "loop-005",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "소수 판별",
      description: `정수 N이 주어질 때, N이 소수이면 \`prime\`, 아니면 \`not prime\`을 출력하세요.

소수: 1과 자기 자신으로만 나누어 떨어지는 1보다 큰 양의 정수`,
      constraints: "2 ≤ N ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "7", expectedOutput: "prime", label: "소수" },
        { stdin: "12", expectedOutput: "not prime", label: "합성수" },
        { stdin: "2", expectedOutput: "prime", label: "최소 소수" },
        { stdin: "1000000", expectedOutput: "not prime", label: "큰 합성수" },
      ],
      hints: [
        "2부터 N-1까지 나누어 떨어지는 수가 하나라도 있으면 소수가 아닙니다.",
        "최적화: √N까지만 확인하면 됩니다. i*i <= n 조건을 사용하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool isPrime = true;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) { isPrime = false; break; }
    }
    cout << (isPrime ? "prime" : "not prime") << endl;
    return 0;
}`,
      solutionExplanation: "i*i <= n까지만 확인하면 O(√N)으로 효율적입니다. 나누어 떨어지면 즉시 break로 탈출합니다.",
      en: {
        title: "Prime Check",
        description: `Given an integer N, print \`prime\` if it is a prime number, or \`not prime\` otherwise.\n\nPrime: a positive integer greater than 1 that is divisible only by 1 and itself.`,
        constraints: "2 ≤ N ≤ 1000000",
        hints: [
          "If any number from 2 to N-1 divides N evenly, it is not prime.",
          "Optimization: you only need to check up to √N. Use the condition i*i <= n.",
        ],
        solutionExplanation: "Checking only up to i*i <= n gives O(√N) efficiency. Break out immediately when a divisor is found.",
      },
    },
    {
      id: "loop-006",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "구구단 출력",
      description: `정수 N이 주어질 때, N단 구구단을 출력하세요.

형식: \`N x i = 결과\` (i는 1부터 9)`,
      constraints: "2 ≤ N ≤ 9",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27", label: "3단" },
        { stdin: "7", expectedOutput: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63", label: "7단" },
      ],
      hints: [
        "i를 1부터 9까지 반복하면서 n * i를 출력하세요.",
        `cout << n << " x " << i << " = " << n*i << "\\n";`,
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= 9; i++)
        cout << n << " x " << i << " = " << n * i << "\\n";
    return 0;
}`,
      solutionExplanation: "for 루프 하나로 i=1~9를 순회하며 형식에 맞춰 출력합니다.",
      en: {
        title: "Multiplication Table",
        description: `Given an integer N, print the N-times table.\n\nFormat: \`N x i = result\` (i from 1 to 9)`,
        constraints: "2 ≤ N ≤ 9",
        hints: [
          "Loop i from 1 to 9 and print n * i each time.",
          `cout << n << " x " << i << " = " << n*i << "\\n";`,
        ],
        solutionExplanation: "Iterate i from 1 to 9 with a single for loop and print in the required format.",
      },
    },
    {
      id: "loop-007",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "짝수만 합산",
      description: `정수 N이 주어질 때, 1부터 N까지의 짝수의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "6", expectedOutput: "12", label: "2+4+6" },
        { stdin: "1", expectedOutput: "0", label: "짝수 없음" },
        { stdin: "10", expectedOutput: "30", label: "N=10" },
        { stdin: "100", expectedOutput: "2550", label: "N=100" },
      ],
      hints: [
        "루프 안에서 i % 2 == 0 조건으로 짝수만 골라 더하세요.",
        "또는 i를 2부터 시작해서 2씩 증가시키면 짝수만 순회할 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 2; i <= n; i += 2)
        sum += i;
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation: "i를 2부터 시작해 2씩 증가시키면 2, 4, 6, ... 짝수만 순회합니다. i % 2 == 0 조건으로 필터링해도 동일합니다.",
      en: {
        title: "Sum of Even Numbers",
        description: `Given an integer N, print the sum of all even numbers from 1 to N.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Inside the loop, use i % 2 == 0 to pick only even numbers.",
          "Alternatively, start i at 2 and increment by 2 to iterate over only even numbers.",
        ],
        solutionExplanation: "Starting i at 2 and incrementing by 2 visits 2, 4, 6, ... Filtering with i % 2 == 0 gives the same result.",
      },
    },
    {
      id: "loop-008",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "자릿수 합",
      description: `양의 정수 N이 주어질 때, 각 자리 숫자의 합을 출력하세요.

예) 1234 → 1+2+3+4 = 10`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1234", expectedOutput: "10", label: "기본" },
        { stdin: "9", expectedOutput: "9", label: "한 자리" },
        { stdin: "100", expectedOutput: "1", label: "0 포함" },
        { stdin: "999", expectedOutput: "27", label: "모두 9" },
      ],
      hints: [
        "n % 10으로 일의 자리를 꺼내고, n /= 10으로 자릿수를 줄여나가세요.",
        "while (n > 0) { sum += n % 10; n /= 10; }",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation: "n % 10으로 일의 자리를 추출하고 n /= 10으로 해당 자리를 제거합니다. while 루프로 n이 0이 될 때까지 반복합니다.",
      en: {
        title: "Sum of Digits",
        description: `Given a positive integer N, print the sum of its digits.\n\nExample: 1234 → 1+2+3+4 = 10`,
        constraints: "1 ≤ N ≤ 1000000",
        hints: [
          "Extract the last digit with n % 10, then remove it with n /= 10.",
          "while (n > 0) { sum += n % 10; n /= 10; }",
        ],
        solutionExplanation: "Extract the last digit with n % 10 and remove it with n /= 10. Repeat in a while loop until n becomes 0.",
      },
    },
    {
      id: "loop-009",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "A부터 B까지 합",
      description: `두 정수 A, B가 주어질 때 (A ≤ B), A부터 B까지 모든 정수의 합을 출력하세요.`,
      constraints: "1 ≤ A ≤ B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1 10", expectedOutput: "55", label: "1~10" },
        { stdin: "3 7", expectedOutput: "25", label: "3~7" },
        { stdin: "5 5", expectedOutput: "5", label: "A=B" },
        { stdin: "1 100", expectedOutput: "5050", label: "1~100" },
      ],
      hints: [
        "loop-001과 비슷하게, i를 a부터 b까지 순회하며 더하세요.",
        "(A+B)*(B-A+1)/2 공식으로도 구할 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int sum = 0;
    for (int i = a; i <= b; i++)
        sum += i;
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation: "시작값을 a로, 종료 조건을 i <= b로 설정하면 됩니다.",
      en: {
        title: "Sum from A to B",
        description: `Given two integers A and B (A ≤ B), print the sum of all integers from A to B inclusive.`,
        constraints: "1 ≤ A ≤ B ≤ 1000",
        hints: [
          "Similar to loop-001: iterate i from a to b and accumulate.",
          "You can also use the formula (A+B)*(B-A+1)/2.",
        ],
        solutionExplanation: "Set the start value to a and the termination condition to i <= b.",
      },
    },
    {
      id: "loop-010",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "쉬움",
      title: "홀수 개수",
      description: `N개의 정수가 주어질 때, 홀수가 몇 개인지 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "3", label: "기본" },
        { stdin: "3\n2 4 6", expectedOutput: "0", label: "홀수 없음" },
        { stdin: "4\n-3 -1 0 2", expectedOutput: "2", label: "음수 포함" },
      ],
      hints: [
        "입력을 받으면서 바로 홀수 여부를 확인할 수 있습니다.",
        "x % 2 != 0이면 홀수입니다. 단, 음수도 % 연산이 적용됩니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x % 2 != 0) cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
      solutionExplanation: "x % 2 != 0으로 홀수를 판별합니다. 음수의 경우 C++에서 -3 % 2 = -1이므로 != 0 조건이 올바릅니다.",
      en: {
        title: "Count Odd Numbers",
        description: `Given N integers, print how many of them are odd.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "You can check for odd numbers as you read input without storing in an array.",
          "x % 2 != 0 means odd. This also works correctly for negative numbers.",
        ],
        solutionExplanation: "Use x % 2 != 0 to detect odd numbers. In C++, -3 % 2 = -1, so the != 0 condition is correct for negatives too.",
      },
    },
    {
      id: "loop-011",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "피보나치 N번째",
      description: `정수 N이 주어질 때, 피보나치 수열의 N번째 수를 출력하세요.

피보나치 수열: 1, 1, 2, 3, 5, 8, 13, 21, ...
F(1)=1, F(2)=1, F(N)=F(N-1)+F(N-2)`,
      constraints: "1 ≤ N ≤ 45",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "F(1)" },
        { stdin: "7", expectedOutput: "13", label: "F(7)" },
        { stdin: "10", expectedOutput: "55", label: "F(10)" },
        { stdin: "45", expectedOutput: "1134903170", label: "F(45)" },
      ],
      hints: [
        "이전 두 값을 변수에 저장하면서 업데이트하세요. a=1, b=1 시작.",
        "for i=3..n: temp=a+b; a=b; b=temp;",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n <= 2) { cout << 1; return 0; }
    long long a = 1, b = 1;
    for (int i = 3; i <= n; i++) {
        long long tmp = a + b;
        a = b;
        b = tmp;
    }
    cout << b << endl;
    return 0;
}`,
      solutionExplanation: "a와 b로 이전 두 값을 관리합니다. N=45이면 약 11억으로 int 범위를 넘으므로 long long을 씁니다.",
      en: {
        title: "N-th Fibonacci Number",
        description: `Given an integer N, print the N-th Fibonacci number.\n\nFibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, ...\nF(1)=1, F(2)=1, F(N)=F(N-1)+F(N-2)`,
        constraints: "1 ≤ N ≤ 45",
        hints: [
          "Track the previous two values in variables and update them. Start with a=1, b=1.",
          "for i=3..n: temp=a+b; a=b; b=temp;",
        ],
        solutionExplanation: "Maintain the previous two values with a and b. At N=45 the result is about 1.1 billion, which exceeds int range, so use long long.",
      },
    },
    {
      id: "loop-012",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "최대공약수 (GCD)",
      description: `두 양의 정수 A, B의 최대공약수(GCD)를 출력하세요.

유클리드 알고리즘: GCD(A, B) = GCD(B, A % B), GCD(A, 0) = A`,
      constraints: "1 ≤ A, B ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "12 8", expectedOutput: "4", label: "기본" },
        { stdin: "100 75", expectedOutput: "25", label: "두 자리" },
        { stdin: "7 3", expectedOutput: "1", label: "서로소" },
        { stdin: "6 6", expectedOutput: "6", label: "같은 수" },
      ],
      hints: [
        "b가 0이 될 때까지 a, b = b, a%b 를 반복합니다.",
        "while (b != 0) { int t = b; b = a % b; a = t; } → a가 GCD",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    cout << a << endl;
    return 0;
}`,
      solutionExplanation: "유클리드 알고리즘입니다. b가 0이 될 때 a가 GCD입니다. O(log min(A,B)) 복잡도로 매우 빠릅니다.",
      en: {
        title: "GCD (Greatest Common Divisor)",
        description: `Print the GCD of two positive integers A and B.\n\nEuclidean algorithm: GCD(A, B) = GCD(B, A % B), GCD(A, 0) = A`,
        constraints: "1 ≤ A, B ≤ 1000000",
        hints: [
          "Repeat a, b = b, a%b until b becomes 0.",
          "while (b != 0) { int t = b; b = a % b; a = t; } → a is the GCD",
        ],
        solutionExplanation: "This is the Euclidean algorithm. When b reaches 0, a holds the GCD. The complexity is O(log min(A,B)), making it very fast.",
      },
    },
    {
      id: "loop-013",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "직사각형 별 출력",
      description: `두 정수 N, M이 주어질 때, N행 M열의 별(*) 직사각형을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 20",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3 5", expectedOutput: "*****\n*****\n*****", label: "기본" },
        { stdin: "1 1", expectedOutput: "*", label: "1x1" },
        { stdin: "2 3", expectedOutput: "***\n***", label: "2x3" },
      ],
      hints: [
        "바깥 루프: 행(n번), 안쪽 루프: 각 행에 별 m개 출력.",
        "각 행이 끝나면 줄바꿈을 출력합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++)
            cout << '*';
        cout << '\\n';
    }
    return 0;
}`,
      solutionExplanation: "중첩 루프의 기본입니다. 바깥 루프(행)와 안쪽 루프(열)를 독립적으로 제어합니다.",
      en: {
        title: "Star Rectangle",
        description: `Given two integers N and M, print a rectangle of stars (*) with N rows and M columns.`,
        constraints: "1 ≤ N, M ≤ 20",
        hints: [
          "Outer loop: N rows, inner loop: print M stars per row.",
          "Print a newline after each row.",
        ],
        solutionExplanation: "This is the fundamental nested loop pattern. The outer loop (rows) and inner loop (columns) are controlled independently.",
      },
    },
    {
      id: "loop-014",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "약수 나열",
      description: `정수 N이 주어질 때, N의 약수를 오름차순으로 한 줄에 하나씩 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "12", expectedOutput: "1\n2\n3\n4\n6\n12", label: "12의 약수" },
        { stdin: "7", expectedOutput: "1\n7", label: "소수" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
      ],
      hints: [
        "1부터 n까지 순회하면서 n % i == 0인 수를 출력하세요.",
        "최적화: 1부터 √n까지만 확인하고 쌍을 같이 추가할 수도 있습니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        if (n % i == 0) cout << i << '\\n';
    return 0;
}`,
      solutionExplanation: "1부터 n까지 순회하며 n을 나누어 떨어지게 하는 수를 출력합니다. O(N)이지만 N≤1000이므로 충분합니다.",
      en: {
        title: "List Divisors",
        description: `Given an integer N, print all divisors of N in ascending order, one per line.`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Iterate from 1 to n and print i whenever n % i == 0.",
          "Optimization: you can check only up to √n and add divisors in pairs — but not required here.",
        ],
        solutionExplanation: "Iterate from 1 to n and print any i that divides n evenly. O(N) is acceptable since N ≤ 1000.",
      },
    },
    {
      id: "loop-015",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "숫자 뒤집기",
      description: `양의 정수 N이 주어질 때, 자릿수를 뒤집은 수를 출력하세요.

예) 1234 → 4321, 1200 → 21`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1234", expectedOutput: "4321", label: "기본" },
        { stdin: "1200", expectedOutput: "21", label: "끝 0 제거" },
        { stdin: "7", expectedOutput: "7", label: "한 자리" },
        { stdin: "100", expectedOutput: "1", label: "00 제거" },
      ],
      hints: [
        "n % 10으로 일의 자리를 꺼내 reversed = reversed * 10 + digit 로 누적하세요.",
        "while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int rev = 0;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    cout << rev << endl;
    return 0;
}`,
      solutionExplanation: "rev에 한 자리씩 붙여나갑니다. 끝자리 0은 rev * 10 + 0이 되어 정수 앞의 0이 자동 제거됩니다.",
      en: {
        title: "Reverse Digits",
        description: `Given a positive integer N, print its digits reversed.\n\nExamples: 1234 → 4321, 1200 → 21`,
        constraints: "1 ≤ N ≤ 1000000",
        hints: [
          "Extract the last digit with n % 10 and accumulate with reversed = reversed * 10 + digit.",
          "while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; }",
        ],
        solutionExplanation: "Append one digit at a time to rev. Trailing zeros produce rev * 10 + 0, which leading zeros in the reversed integer are automatically dropped.",
      },
    },
    {
      id: "loop-016",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "콜라츠 추측",
      description: `양의 정수 N이 주어질 때, 다음 규칙을 반복하여 1이 될 때까지의 횟수를 출력하세요.

- N이 짝수: N = N / 2
- N이 홀수: N = 3 * N + 1`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "6", expectedOutput: "8", label: "6→3→10→5→16→8→4→2→1" },
        { stdin: "1", expectedOutput: "0", label: "이미 1" },
        { stdin: "27", expectedOutput: "111", label: "긴 경우" },
      ],
      hints: [
        "while (n != 1)로 루프를 돌며 짝수/홀수에 따라 n을 변환하고 횟수를 셉니다.",
        "중간에 n이 int 범위를 초과할 수 있으니 long long을 사용하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int cnt = 0;
    while (n != 1) {
        if (n % 2 == 0) n /= 2;
        else n = 3 * n + 1;
        cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
      solutionExplanation: "규칙을 그대로 while 루프로 구현합니다. 3n+1 과정에서 n이 커질 수 있으므로 long long이 필요합니다.",
      en: {
        title: "Collatz Conjecture",
        description: `Given a positive integer N, apply the following rule repeatedly until N becomes 1, and print the number of steps taken.\n\n- If N is even: N = N / 2\n- If N is odd: N = 3 * N + 1`,
        constraints: "1 ≤ N ≤ 1000000",
        hints: [
          "Use while (n != 1) and apply the even/odd rule, counting iterations.",
          "N can grow beyond the int range during 3n+1 steps, so use long long.",
        ],
        solutionExplanation: "Implement the rules directly with a while loop. The 3n+1 step can cause n to grow large, so long long is needed.",
      },
    },
    {
      id: "loop-017",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "N번째 소수",
      description: `정수 N이 주어질 때, N번째 소수를 출력하세요.

첫 번째 소수는 2, 두 번째는 3, 세 번째는 5, ...`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "2", label: "첫 소수" },
        { stdin: "5", expectedOutput: "11", label: "5번째" },
        { stdin: "10", expectedOutput: "29", label: "10번째" },
        { stdin: "100", expectedOutput: "541", label: "100번째" },
      ],
      hints: [
        "candidate를 2부터 시작해서 소수인지 확인하고, 소수면 count를 증가시킵니다.",
        "소수 판별: for (int i = 2; i * i <= candidate; i++) if (candidate % i == 0) → 소수 아님",
      ],
      solutionCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int n;
    cin >> n;
    int cnt = 0, candidate = 2;
    while (cnt < n) {
        if (isPrime(candidate)) cnt++;
        if (cnt < n) candidate++;
    }
    cout << candidate << endl;
    return 0;
}`,
      solutionExplanation: "소수 판별 함수를 분리해 candidate를 2부터 하나씩 늘려가며 n번째 소수를 찾습니다.",
      en: {
        title: "N-th Prime",
        description: `Given an integer N, print the N-th prime number.\n\nThe 1st prime is 2, the 2nd is 3, the 3rd is 5, ...`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Start candidate at 2, check if it is prime, and increment count each time.",
          "Prime check: for (int i = 2; i * i <= candidate; i++) if (candidate % i == 0) → not prime",
        ],
        solutionExplanation: "Separate the primality test into its own function, then find the N-th prime by incrementing candidate from 2.",
      },
    },
    {
      id: "loop-018",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "최솟값이 되는 횟수",
      description: `N개의 정수가 주어질 때, 각 원소가 "현재까지의 최솟값"이 되는 횟수를 출력하세요.

예) 3 1 4 1 5 → 3(1번), 1(2번 — 3번째, 4번째 위치) = 3 (3번 업데이트: 3→1→1 안 됨, 3이 최솟값(1번), 1이 최솟값(2번), 1은 최솟값과 같아서 안 됨)

정확히는: 현재 원소가 이전까지의 최솟값보다 작을 때만 카운트합니다.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "2", label: "3→1(갱신), 1=1(갱신 안됨)" },
        { stdin: "4\n5 3 2 1", expectedOutput: "4", label: "계속 감소" },
        { stdin: "3\n1 2 3", expectedOutput: "1", label: "첫 원소만" },
        { stdin: "3\n3 3 3", expectedOutput: "1", label: "모두 같음" },
      ],
      hints: [
        "첫 원소는 항상 최솟값 업데이트로 count=1 시작.",
        "이후 원소가 현재 최솟값보다 엄격히 작을 때만 count를 늘리고 최솟값을 갱신하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int x;
    cin >> x;
    int mn = x, cnt = 1;
    for (int i = 1; i < n; i++) {
        cin >> x;
        if (x < mn) { mn = x; cnt++; }
    }
    cout << cnt << endl;
    return 0;
}`,
      solutionExplanation: "첫 원소로 mn과 cnt=1을 초기화합니다. 이후 새 원소가 mn보다 작을 때만 갱신합니다. USACO에서 자주 나오는 최솟값 트래킹 패턴입니다.",
      en: {
        title: "Minimum Update Count",
        description: `Given N integers, print how many times a new minimum is set. An element sets a new minimum only when it is strictly less than the current minimum.\n\nExample: 3 1 4 1 5 → 3 sets the minimum first (count=1), then 1 is smaller (count=2), then 1 equals the minimum (no update). Answer: 2`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "The first element always sets the minimum, so start count=1.",
          "Only increment count and update the minimum when the new element is strictly less than the current minimum.",
        ],
        solutionExplanation: "Initialize mn and cnt=1 with the first element. Update only when a new element is strictly less than mn. This minimum-tracking pattern appears frequently in USACO.",
      },
    },
    {
      id: "loop-019",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "이진수 변환",
      description: `양의 정수 N을 2진수로 변환하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "10", expectedOutput: "1010", label: "10" },
        { stdin: "1", expectedOutput: "1", label: "1" },
        { stdin: "8", expectedOutput: "1000", label: "2의 거듭제곱" },
        { stdin: "255", expectedOutput: "11111111", label: "8비트 최대" },
      ],
      hints: [
        "n을 2로 나누면서 나머지(0 또는 1)를 string 앞에 붙여 나갑니다.",
        "bits = (n % 2 ? \"1\" : \"0\") + bits; n /= 2;",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    string bits = "";
    while (n > 0) {
        bits = (char)('0' + n % 2) + bits;
        n /= 2;
    }
    cout << bits << endl;
    return 0;
}`,
      solutionExplanation: "n % 2로 현재 비트를 꺼내고 string 앞에 붙입니다. 나머지가 역순으로 나오므로 앞에 붙여야 올바른 순서가 됩니다.",
      en: {
        title: "Binary Conversion",
        description: `Given a positive integer N, print its binary representation.`,
        constraints: "1 ≤ N ≤ 1000000",
        hints: [
          "Divide n by 2 repeatedly and prepend the remainder (0 or 1) to a string.",
          "bits = (n % 2 ? \"1\" : \"0\") + bits; n /= 2;",
        ],
        solutionExplanation: "Extract the current bit with n % 2 and prepend it to the string. Since remainders come out in reverse order, prepending gives the correct result.",
      },
    },
    {
      id: "loop-020",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "어려움",
      title: "소인수 분해",
      description: `정수 N이 주어질 때, N을 소인수의 곱으로 나타내세요.
소인수를 오름차순으로 한 줄에 공백으로 구분하여 출력합니다. (중복 포함)
N이 1이면 "1"을 출력하세요.`,
      constraints: "1 ≤ N ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "12", expectedOutput: "2 2 3", label: "기본" },
        { stdin: "7", expectedOutput: "7", label: "소수" },
        { stdin: "1", expectedOutput: "1", label: "1" },
        { stdin: "100", expectedOutput: "2 2 5 5", label: "100" },
        { stdin: "360", expectedOutput: "2 2 2 3 3 5", label: "360" },
      ],
      hints: [
        "2부터 n까지 순서대로 나누어 보세요. n이 i로 나눠지면 i를 출력하고 n을 i로 나눕니다.",
        "while (n % i == 0) { 출력; n /= i; } 패턴을 반복합니다.",
        "for (int i = 2; i * i <= n; i++) 까지만 확인하고, 루프 후 n > 1이면 n 자체가 소인수입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n == 1) { cout << 1 << "\\n"; return 0; }
    bool first = true;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            if (!first) cout << ' ';
            cout << i;
            first = false;
            n /= i;
        }
    }
    if (n > 1) {
        if (!first) cout << ' ';
        cout << n;
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "i=2부터 sqrt(n)까지 반복하며 n을 나눌 수 있는 소인수를 추출합니다. while로 같은 소인수를 여러 번 나눕니다. 루프 후 n>1이면 남은 n 자체가 소인수(sqrt(n)보다 큰 소수 인수)입니다.",
      en: {
        title: "Prime Factorization",
        description: `Given an integer N, print its prime factors in ascending order separated by spaces (with repetition). Print "1" if N is 1.`,
        constraints: "1 ≤ N ≤ 10000",
        hints: [
          "Try each divisor i from 2 upward. For each i, divide n by i as many times as possible.",
          "for (int i = 2; i * i <= n; i++) — after the loop, if n > 1 then n itself is a prime factor.",
        ],
        solutionExplanation: "Iterate i from 2 to √n and repeatedly divide n when possible. Using while extracts the same prime factor multiple times. After the loop, if n > 1, the remaining n is a prime factor larger than √n.",
      },
    },
    {
      id: "loop-026",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "최댓값과 위치",
      description: `N개의 정수가 주어질 때, 최댓값과 그 값이 처음 등장하는 위치(1-based)를 출력하세요.

- 첫 번째 줄: 최댓값
- 두 번째 줄: 위치 (1-based)`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 7 2 7 1", expectedOutput: "7\n2", label: "기본 (첫 번째 최댓값)" },
        { stdin: "4\n-1 -5 -2 -3", expectedOutput: "-1\n1", label: "음수만" },
        { stdin: "1\n42", expectedOutput: "42\n1", label: "원소 1개" },
        { stdin: "3\n10 10 10", expectedOutput: "10\n1", label: "전부 최댓값" },
      ],
      hints: [
        "첫 번째 값을 최댓값으로 초기화하고, 나머지 값과 비교하면서 갱신하세요.",
        "최댓값을 갱신할 때만 위치를 업데이트합니다 (같은 값이면 갱신하지 않음).",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int maxVal, maxPos = 1, x;
    cin >> maxVal;
    for (int i = 2; i <= n; i++) {
        cin >> x;
        if (x > maxVal) {
            maxVal = x;
            maxPos = i;
        }
    }
    cout << maxVal << "\\n" << maxPos << "\\n";
    return 0;
}`,
      solutionExplanation: "첫 번째 원소로 초기화 후 2번째부터 비교합니다. 엄격하게 큰 경우(>)만 갱신하므로 같은 값이 있어도 처음 위치를 유지합니다.",
      en: {
        title: "Maximum Value and Position",
        description: `Given N integers, print the maximum value on the first line and its first occurrence position (1-based) on the second line.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Initialize with the first value and compare from the second onward.",
          "Update the position only when a strictly larger value is found (same value does not update).",
        ],
        solutionExplanation: "Initialize with the first element and compare from index 2 onward. Using strict greater-than (>) means the first occurrence position is preserved even when duplicates exist.",
      },
    },
    {
      id: "loop-027",
      cluster: "loops",
      unlockAfter: "cpp-7",
      difficulty: "보통",
      title: "EOF까지 합계",
      description: `입력이 끝날 때까지 정수를 읽어 모두 더한 합계를 출력하세요.
입력의 개수는 미리 주어지지 않습니다.`,
      constraints: "정수 개수는 1 이상 100 이하, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "1 2 3 4 5", expectedOutput: "15", label: "5개" },
        { stdin: "10", expectedOutput: "10", label: "1개" },
        { stdin: "-5 3 -2 10", expectedOutput: "6", label: "음수 포함" },
        { stdin: "100 200 300", expectedOutput: "600", label: "3개" },
      ],
      hints: [
        "while (cin >> x)는 입력 성공 여부를 반환합니다 — 입력이 없으면 false가 돼요.",
        "루프 안에서 sum += x를 하고, 루프가 끝난 후 sum을 출력하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int x, sum = 0;
    while (cin >> x) sum += x;
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "while (cin >> x)는 입력에 성공하면 true, EOF나 오류면 false를 반환합니다. 이 패턴으로 개수를 모르는 입력을 처리할 수 있습니다.",
      en: {
        title: "Sum Until EOF",
        description: `Read integers until end-of-input and print their total sum. The count of integers is not given in advance.`,
        constraints: "1 to 100 integers, -10000 ≤ each integer ≤ 10000",
        hints: [
          "while (cin >> x) returns true on successful read and false on EOF or error.",
          "Accumulate sum += x inside the loop, then print sum after the loop ends.",
        ],
        solutionExplanation: "while (cin >> x) returns true when input succeeds, and false at EOF or on error. This pattern handles an unknown number of inputs.",
      },
    },
  ],
}
