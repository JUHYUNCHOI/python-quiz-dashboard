import type { PracticeCluster } from "./types"

export const functionsCluster: PracticeCluster = {
  id: "functions",
  title: "함수 활용",
  emoji: "🔧",
  description: "함수 선언/정의, 매개변수, return, 재귀 함수 기초",
  en: { title: "Functions", description: "Function design, overloading, decomposition" },
  unlockAfter: "cpp-8",
  problems: [
    {
      id: "fn-001",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "최솟값/최댓값 함수",
      description: `두 정수 A, B를 받아 더 큰 값을 반환하는 함수 myMax와 더 작은 값을 반환하는 함수 myMin을 작성하세요. N쌍의 입력에 대해 각각 최댓값, 최솟값을 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, -1000 ≤ A, B ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

// myMax, myMin 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    while (n--) {
        int a, b;
        cin >> a >> b;
        // myMax, myMin을 호출해 출력하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "3\n3 7\n-5 2\n0 0", expectedOutput: "7 3\n2 -5\n0 0", label: "기본" },
        { stdin: "1\n100 -100", expectedOutput: "100 -100", label: "큰 차이" },
      ],
      hints: [
        "int myMax(int a, int b) { return a > b ? a : b; } 형태로 작성하세요.",
        "함수는 main() 위에 선언해야 합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int myMax(int a, int b) { return a > b ? a : b; }
int myMin(int a, int b) { return a < b ? a : b; }

int main() {
    int n;
    cin >> n;
    while (n--) {
        int a, b;
        cin >> a >> b;
        cout << myMax(a, b) << " " << myMin(a, b) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "함수를 main() 위에 정의해 선언 없이 사용합니다. 삼항 연산자로 간결하게 작성할 수 있습니다.",
      en: {
        title: "Min/Max Functions",
        description: `Write a function myMax that returns the larger of two integers A and B, and myMin that returns the smaller. For N pairs of input, output the maximum and minimum on each line.`,
        constraints: "1 ≤ N ≤ 10, -1000 ≤ A, B ≤ 1000",
        hints: [
          "Write: int myMax(int a, int b) { return a > b ? a : b; }",
          "Functions must be declared above main().",
        ],
        solutionExplanation: "Define functions above main() so they can be used without a forward declaration. The ternary operator keeps each function concise.",
      },
    },
    {
      id: "fn-002",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "절댓값 합계",
      description: `정수를 받아 절댓값을 반환하는 함수 myAbs를 작성하세요. N개의 정수에 대해 절댓값의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// myAbs 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // myAbs를 호출해 sum에 더하세요
    }
    cout << sum << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "4\n-3 5 -2 1", expectedOutput: "11", label: "기본" },
        { stdin: "3\n0 0 0", expectedOutput: "0", label: "모두 0" },
        { stdin: "1\n-100", expectedOutput: "100", label: "단일 음수" },
      ],
      hints: [
        "if (x < 0) return -x; else return x;",
        "myAbs를 호출해 각 값의 절댓값을 누적합에 더하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int myAbs(int x) {
    return x < 0 ? -x : x;
}

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += myAbs(x);
    }
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "myAbs 함수로 부호 처리를 분리하면 main이 깔끔해집니다. 같은 로직을 여러 번 써야 할 때 함수로 추출하는 것이 핵심입니다.",
      en: {
        title: "Sum of Absolute Values",
        description: `Write a function myAbs that returns the absolute value of an integer. Output the sum of absolute values of N integers.`,
        constraints: "1 ≤ N ≤ 100, -10000 ≤ each integer ≤ 10000",
        hints: [
          "if (x < 0) return -x; else return x;",
          "Call myAbs for each value and add the result to a running sum.",
        ],
        solutionExplanation: "Extracting the sign-handling into myAbs keeps main clean. Pulling repeated logic into a function is a fundamental programming practice.",
      },
    },
    {
      id: "fn-003",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "짝수 홀수 판별 함수",
      description: `정수가 짝수이면 true, 홀수이면 false를 반환하는 함수 isEven을 작성하세요. N개의 정수에 대해 각각 "even" 또는 "odd"를 출력하세요.`,
      constraints: "1 ≤ N ≤ 20, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

// isEven 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        // isEven을 호출해 "even" 또는 "odd"를 출력하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "4\n2 7 0 -3", expectedOutput: "even\nodd\neven\nodd", label: "기본" },
        { stdin: "2\n1 2", expectedOutput: "odd\neven", label: "1과 2" },
      ],
      hints: [
        "bool isEven(int x) { return x % 2 == 0; }",
        "음수의 % 연산도 0이면 짝수입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

bool isEven(int x) {
    return x % 2 == 0;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        cout << (isEven(x) ? "even" : "odd") << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "bool 반환 함수는 조건을 직접 반환합니다. 삼항 연산자로 출력을 결정합니다.",
      en: {
        title: "Even/Odd Check Function",
        description: `Write a function isEven that returns true if an integer is even and false if odd. For N integers, output "even" or "odd" for each.`,
        constraints: "1 ≤ N ≤ 20, -1000 ≤ each integer ≤ 1000",
        hints: [
          "bool isEven(int x) { return x % 2 == 0; }",
          "For negative numbers, % == 0 also means even.",
        ],
        solutionExplanation: "A bool-returning function directly returns a condition expression. Use the ternary operator to choose the output string.",
      },
    },
    {
      id: "fn-004",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "N번 함수 호출",
      description: `정수 X를 받아 X²을 반환하는 함수 square를 작성하세요. N개의 정수에 대해 제곱값의 합과 최대 제곱값을 출력하세요.\n\n출력:\n- 첫 번째 줄: 제곱합\n- 두 번째 줄: 최대 제곱값`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ 각 정수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

// square 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    int sum = 0, maxSq = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // square를 호출해 sum과 maxSq를 갱신하세요
    }
    cout << sum << "\\n" << maxSq << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "30\n16", label: "기본" },
        { stdin: "1\n7", expectedOutput: "49\n49", label: "단일 입력" },
        { stdin: "3\n3 1 2", expectedOutput: "14\n9", label: "순서 무관" },
      ],
      hints: [
        "int square(int x) { return x * x; }",
        "sum += square(x), maxSq = max(maxSq, square(x)) 패턴을 사용하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int square(int x) {
    return x * x;
}

int main() {
    int n;
    cin >> n;
    int sum = 0, maxSq = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += square(x);
        if (square(x) > maxSq) maxSq = square(x);
    }
    cout << sum << "\\n" << maxSq << "\\n";
    return 0;
}`,
      solutionExplanation: "같은 함수를 여러 목적(합산, 최댓값)에 반복 호출합니다. 이것이 함수 재사용의 기본 패턴입니다.",
      en: {
        title: "Repeated Function Calls",
        description: `Write a function square that returns X². For N integers, output the sum of squares and the maximum square value.\n\nOutput:\n- Line 1: sum of squares\n- Line 2: maximum square value`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ each integer ≤ 100",
        hints: [
          "int square(int x) { return x * x; }",
          "Use sum += square(x) and maxSq = max(maxSq, square(x)).",
        ],
        solutionExplanation: "The same function is called multiple times for different purposes (summing, finding max). This is the fundamental pattern of function reuse.",
      },
    },
    {
      id: "fn-005",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "소수 판별 함수",
      description: `정수 N이 소수이면 true를 반환하는 함수 isPrime을 작성하세요. Q개의 정수에 대해 각각 "prime" 또는 "composite"를 출력하세요. (1은 소수도 합성수도 아님 → "neither")`,
      constraints: "1 ≤ Q ≤ 20, 1 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// isPrime 함수를 여기에 작성하세요

int main() {
    int q;
    cin >> q;
    while (q--) {
        int n;
        cin >> n;
        // 1, 소수, 합성수를 구분해 출력하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "5\n2 3 4 1 17", expectedOutput: "prime\nprime\ncomposite\nneither\nprime", label: "기본" },
        { stdin: "3\n100 97 1", expectedOutput: "composite\nprime\nneither", label: "큰 수" },
      ],
      hints: [
        "2부터 sqrt(n)까지 나누어 보세요: for (int i = 2; i*i <= n; i++)",
        "1은 특별 케이스로 먼저 처리하세요.",
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
    int q;
    cin >> q;
    while (q--) {
        int n;
        cin >> n;
        if (n == 1) cout << "neither\\n";
        else if (isPrime(n)) cout << "prime\\n";
        else cout << "composite\\n";
    }
    return 0;
}`,
      solutionExplanation: "isPrime 함수는 2부터 sqrt(n)까지만 나눠보면 됩니다. i*i <= n 조건으로 sqrt 없이 처리합니다. 1의 경우는 main에서 별도 처리합니다.",
      en: {
        title: "Primality Test Function",
        description: `Write a function isPrime that returns true if N is prime. For Q integers, output "prime", "composite", or "neither" (1 is neither prime nor composite).`,
        constraints: "1 ≤ Q ≤ 20, 1 ≤ each integer ≤ 10000",
        hints: [
          "Try dividing from 2 to sqrt(n): for (int i = 2; i*i <= n; i++)",
          "Handle 1 as a special case first.",
        ],
        solutionExplanation: "isPrime only needs to check divisors up to sqrt(n). The condition i*i <= n avoids using sqrt. The case n==1 is handled separately in main.",
      },
    },
    {
      id: "fn-006",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "팩토리얼 (재귀)",
      description: `N!을 재귀 함수로 구현하세요. T개의 테스트케이스에 대해 N!을 출력하세요.`,
      constraints: "1 ≤ T ≤ 10, 0 ≤ N ≤ 12",
      initialCode: `#include <iostream>
using namespace std;

// factorial 재귀 함수를 여기에 작성하세요

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << factorial(n) << "\\n";
    }
    return 0;
}`,
      testCases: [
        { stdin: "4\n0\n1\n5\n10", expectedOutput: "1\n1\n120\n3628800", label: "기본" },
        { stdin: "2\n12\n7", expectedOutput: "479001600\n5040", label: "큰 값" },
      ],
      hints: [
        "기저 조건: n == 0이면 1을 반환합니다.",
        "재귀 호출: return n * factorial(n-1);",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << factorial(n) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "재귀의 두 요소: 기저 조건(0! = 1)과 재귀 호출(n * (n-1)!). 재귀는 '현재 문제를 더 작은 같은 문제로 표현'하는 것입니다.",
      en: {
        title: "Factorial (Recursive)",
        description: `Implement N! using a recursive function. For T test cases, output N!.`,
        constraints: "1 ≤ T ≤ 10, 0 ≤ N ≤ 12",
        hints: [
          "Base case: if n == 0, return 1.",
          "Recursive call: return n * factorial(n-1);",
        ],
        solutionExplanation: "Two elements of recursion: base case (0! = 1) and recursive call (n * (n-1)!). Recursion expresses the current problem in terms of a smaller instance of the same problem.",
      },
    },
    // ── 함수 오버로딩 ─────────────────────────────────────────────
    {
      id: "fn-OL01",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "오버로딩 — 면적 계산",
      description: `**함수 오버로딩**을 사용해 같은 이름 \`area\`로 두 가지 도형의 넓이를 계산하세요.

- \`area(int r)\` → 원의 넓이 (r²×3 출력, π≈3 사용)
- \`area(int w, int h)\` → 직사각형의 넓이 (w×h 출력)

입력 첫 줄: \`circle 5\` 또는 \`rect 4 3\` 형식. 케이스 수 T가 먼저 주어집니다.

**반드시 함수 오버로딩을 사용하세요.** (같은 이름, 다른 매개변수)`,
      constraints: "1 ≤ T ≤ 5, 1 ≤ r, w, h ≤ 100",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

// 오버로딩: area 함수를 두 가지 버전으로 작성하세요
int area(int r) {
    // 원: r * r * 3
}
int area(int w, int h) {
    // 직사각형: w * h
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        string shape;
        cin >> shape;
        if (shape == "circle") {
            int r; cin >> r;
            cout << area(r) << "\\n";
        } else {
            int w, h; cin >> w >> h;
            cout << area(w, h) << "\\n";
        }
    }
    return 0;
}`,
      testCases: [
        { stdin: "3\ncircle 5\nrect 4 3\ncircle 2", expectedOutput: "75\n12\n12", label: "혼합" },
        { stdin: "1\nrect 10 5", expectedOutput: "50", label: "직사각형" },
        { stdin: "2\ncircle 1\nrect 1 1", expectedOutput: "3\n1", label: "최솟값" },
      ],
      hints: [
        "C++에서 함수 오버로딩은 매개변수 개수나 타입이 다르면 같은 이름을 사용할 수 있어요.",
        "area(int r)와 area(int w, int h)는 이름은 같지만 매개변수 수가 달라 C++이 자동으로 구분합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int area(int r) { return r * r * 3; }
int area(int w, int h) { return w * h; }

int main() {
    int t;
    cin >> t;
    while (t--) {
        string shape;
        cin >> shape;
        if (shape == "circle") {
            int r; cin >> r;
            cout << area(r) << "\\n";
        } else {
            int w, h; cin >> w >> h;
            cout << area(w, h) << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation: "함수 오버로딩: 같은 이름 area를 매개변수 수에 따라 두 버전으로 정의합니다. 호출 시 컴파일러가 인자 수/타입을 보고 자동으로 알맞은 버전을 선택합니다.",
      en: {
        title: "Overloading — Area Calculator",
        description: `Use **function overloading** to calculate the area of two shapes using the same function name \`area\`.\n\n- \`area(int r)\` → circle area (r²×3, using π≈3)\n- \`area(int w, int h)\` → rectangle area (w×h)\n\nInput: T test cases, each line is \`circle 5\` or \`rect 4 3\`.\n\n**You must use function overloading.** (Same name, different parameters)`,
        constraints: "1 ≤ T ≤ 5, 1 ≤ r, w, h ≤ 100",
        hints: [
          "In C++, function overloading allows the same name if parameter count or types differ.",
          "area(int r) and area(int w, int h) have the same name but different parameter counts — C++ distinguishes them automatically.",
        ],
        solutionExplanation: "Function overloading: define two versions of area based on parameter count. When called, the compiler automatically selects the right version based on the number/type of arguments.",
      },
    },
    {
      id: "fn-007",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "피보나치 (재귀)",
      description: `N번째 피보나치 수를 재귀 함수로 구현하세요. (fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2))\nT개의 테스트케이스에 대해 fib(N)을 출력하세요.`,
      constraints: "1 ≤ T ≤ 10, 0 ≤ N ≤ 15",
      initialCode: `#include <iostream>
using namespace std;

// fib 재귀 함수를 여기에 작성하세요

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << fib(n) << "\\n";
    }
    return 0;
}`,
      testCases: [
        { stdin: "5\n0\n1\n5\n10\n15", expectedOutput: "0\n1\n5\n55\n610", label: "기본" },
        { stdin: "3\n2\n3\n4", expectedOutput: "1\n2\n3", label: "소수 인덱스" },
      ],
      hints: [
        "기저 조건: n == 0이면 0, n == 1이면 1을 반환합니다.",
        "return fib(n-1) + fib(n-2);",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << fib(n) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "피보나치는 두 개의 기저 조건이 필요합니다. N이 커지면 중복 계산으로 느려지지만, N ≤ 15에서는 충분히 빠릅니다.",
      en: {
        title: "Fibonacci (Recursive)",
        description: `Implement the N-th Fibonacci number using a recursive function. (fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2))\nFor T test cases, output fib(N).`,
        constraints: "1 ≤ T ≤ 10, 0 ≤ N ≤ 15",
        hints: [
          "Base cases: n == 0 returns 0, n == 1 returns 1.",
          "return fib(n-1) + fib(n-2);",
        ],
        solutionExplanation: "Fibonacci requires two base cases. For large N it becomes slow due to redundant calls, but N ≤ 15 is fast enough for a naive recursive solution.",
      },
    },
    {
      id: "fn-008",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "어려움",
      title: "GCD/LCM 함수",
      description: `두 양의 정수 A, B의 최대공약수(GCD)와 최소공배수(LCM)를 반환하는 함수를 작성하세요. T개의 테스트케이스에 대해 GCD와 LCM을 한 줄에 출력하세요.\n\nGCD는 유클리드 알고리즘으로 구현: gcd(a, b) = gcd(b, a%b), 기저조건 gcd(a, 0) = a\nLCM = a * b / GCD(a, b)`,
      constraints: "1 ≤ T ≤ 10, 1 ≤ A, B ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// gcd, lcm 함수를 여기에 작성하세요

int main() {
    int t;
    cin >> t;
    while (t--) {
        int a, b;
        cin >> a >> b;
        cout << gcd(a, b) << " " << lcm(a, b) << "\\n";
    }
    return 0;
}`,
      testCases: [
        { stdin: "3\n12 8\n7 5\n100 75", expectedOutput: "4 24\n1 35\n25 300", label: "기본" },
        { stdin: "2\n6 6\n9 6", expectedOutput: "6 6\n3 18", label: "같은 수 / 배수" },
      ],
      hints: [
        "int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }",
        "lcm = a / gcd(a, b) * b (오버플로우 방지를 위해 나누기 먼저)",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int a, b;
        cin >> a >> b;
        cout << gcd(a, b) << " " << lcm(a, b) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "유클리드 알고리즘: gcd(a, b) = gcd(b, a%b). b가 0이 될 때까지 반복합니다. LCM은 a*b/gcd로 구하되, 오버플로우를 막기 위해 a/gcd를 먼저 계산합니다.",
      en: {
        title: "GCD/LCM Functions",
        description: `Write functions to compute the GCD and LCM of two positive integers A and B. For T test cases, output GCD and LCM on one line.\n\nGCD via Euclidean algorithm: gcd(a, b) = gcd(b, a%b), base case gcd(a, 0) = a\nLCM = a * b / GCD(a, b)`,
        constraints: "1 ≤ T ≤ 10, 1 ≤ A, B ≤ 10000",
        hints: [
          "int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }",
          "lcm = a / gcd(a, b) * b (divide first to prevent overflow)",
        ],
        solutionExplanation: "Euclidean algorithm: gcd(a, b) = gcd(b, a%b), stopping when b reaches 0. For LCM, compute a/gcd first to prevent integer overflow before multiplying by b.",
      },
    },
    {
      id: "fn-009",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "어려움",
      title: "문자열 처리 함수 분리",
      description: `문자열 처리를 함수로 분리합니다. 다음 함수를 구현하세요:\n- countVowels(s): 문자열에서 모음(a,e,i,o,u) 개수 반환\n- reverseStr(s): 문자열을 뒤집어서 반환\n\nN개의 문자열에 대해 각각 "모음개수 뒤집은문자열"을 출력하세요.`,
      constraints: "1 ≤ N ≤ 10, 1 ≤ 문자열 길이 ≤ 50, 소문자 영문자만",
      initialCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// countVowels, reverseStr 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    while (n--) {
        string s;
        cin >> s;
        cout << countVowels(s) << " " << reverseStr(s) << "\\n";
    }
    return 0;
}`,
      testCases: [
        { stdin: "3\nhello\nworld\naeiou", expectedOutput: "2 olleh\n1 dlrow\n5 uoiea", label: "기본" },
        { stdin: "2\nabc\nxyz", expectedOutput: "1 cba\n0 zyx", label: "모음 적은 경우" },
      ],
      hints: [
        "countVowels: for 루프로 각 문자가 모음인지 확인하세요.",
        "reverseStr: string result = s; reverse(result.begin(), result.end()); return result;",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int countVowels(const string& s) {
    int count = 0;
    for (char c : s)
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            count++;
    return count;
}

string reverseStr(string s) {
    reverse(s.begin(), s.end());
    return s;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        string s;
        cin >> s;
        cout << countVowels(s) << " " << reverseStr(s) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "각 기능을 함수로 분리하면 코드가 읽기 쉬워집니다. countVowels는 const 참조로 받아 복사 비용을 아끼고, reverseStr는 값으로 받아 내부에서 수정합니다.",
      en: {
        title: "String Processing Functions",
        description: `Decompose string processing into functions:\n- countVowels(s): return the count of vowels (a,e,i,o,u) in s\n- reverseStr(s): return the reversed string\n\nFor N strings, output "vowel_count reversed_string" on each line.`,
        constraints: "1 ≤ N ≤ 10, 1 ≤ string length ≤ 50, lowercase letters only",
        hints: [
          "countVowels: loop over each character and check if it is a vowel.",
          "reverseStr: string result = s; reverse(result.begin(), result.end()); return result;",
        ],
        solutionExplanation: "Separating each feature into a function improves readability. countVowels takes a const reference to avoid copying; reverseStr takes a value so it can be modified internally.",
      },
    },
    {
      id: "fn-010",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "어려움",
      title: "재귀 합계 (1+2+...+N)",
      description: `1+2+...+N을 재귀로 구하는 함수 sumTo와 반복문으로 구하는 함수 sumToIter를 모두 구현하세요. N이 주어질 때 두 결과가 같은지 확인하고, 재귀 결과를 출력하세요.\n\n결과가 같으면 결과 그대로, 다르면 "ERROR"를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

// sumTo (재귀), sumToIter (반복문) 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    int r = sumTo(n), it = sumToIter(n);
    if (r == it) cout << r << "\\n";
    else cout << "ERROR\\n";
    return 0;
}`,
      testCases: [
        { stdin: "5", expectedOutput: "15", label: "N=5" },
        { stdin: "10", expectedOutput: "55", label: "N=10" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "100", expectedOutput: "5050", label: "N=100" },
      ],
      hints: [
        "sumTo(n) = n + sumTo(n-1), 기저조건: sumTo(0) = 0",
        "sumToIter: for 루프로 1부터 n까지 더합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int sumTo(int n) {
    if (n == 0) return 0;
    return n + sumTo(n - 1);
}

int sumToIter(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    return sum;
}

int main() {
    int n;
    cin >> n;
    int r = sumTo(n), it = sumToIter(n);
    if (r == it) cout << r << "\\n";
    else cout << "ERROR\\n";
    return 0;
}`,
      solutionExplanation: "재귀와 반복문은 많은 경우 교환 가능합니다. 재귀는 '더 작은 문제로 쪼개기', 반복은 '쌓아가기'로 표현 방식이 다릅니다. 두 결과를 비교해 정확성을 검증합니다.",
      en: {
        title: "Recursive Sum (1+2+...+N)",
        description: `Implement both a recursive function sumTo and an iterative function sumToIter to compute 1+2+...+N. For a given N, verify both produce the same result and output it.\n\nIf they match, output the result; otherwise output "ERROR".`,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "sumTo(n) = n + sumTo(n-1), base case: sumTo(0) = 0",
          "sumToIter: use a for loop to add 1 through n.",
        ],
        solutionExplanation: "Recursion and iteration are often interchangeable. Recursion 'decomposes' the problem; iteration 'builds up' the answer. Comparing both results validates correctness.",
      },
    },
    {
      id: "fn-011",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "세 수 중 최솟값",
      description: `세 정수 a, b, c 중 가장 작은 값을 반환하는 함수 minOfThree를 작성하세요. 세 정수가 주어질 때 최솟값을 출력하세요.`,
      constraints: "-1000 ≤ a, b, c ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

// minOfThree 함수를 여기에 작성하세요

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << minOfThree(a, b, c) << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "3 1 2", expectedOutput: "1", label: "기본" },
        { stdin: "5 5 5", expectedOutput: "5", label: "모두 같은 수" },
        { stdin: "-1 0 1", expectedOutput: "-1", label: "음수 포함" },
      ],
      hints: [
        "먼저 a와 b를 비교해 더 작은 값을 구한 뒤, 그 결과와 c를 비교하세요.",
        "int minOfThree(int a, int b, int c) { return (a < b ? a : b) < c ? (a < b ? a : b) : c; }",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int minOfThree(int a, int b, int c) {
    int m = a < b ? a : b;
    return m < c ? m : c;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << minOfThree(a, b, c) << "\\n";
    return 0;
}`,
      solutionExplanation: "두 값을 비교하는 연산을 두 번 적용합니다. 먼저 a와 b 중 작은 값을 m에 저장하고, m과 c를 비교합니다. 이 패턴은 여러 값의 최솟값을 구할 때 반복적으로 사용됩니다.",
      en: {
        title: "Minimum of Three",
        description: `Write a function minOfThree that returns the smallest of three integers a, b, c. Output the minimum for given inputs.`,
        constraints: "-1000 ≤ a, b, c ≤ 1000",
        hints: [
          "First compare a and b to find the smaller, then compare that result with c.",
          "int minOfThree(int a, int b, int c) { int m = a < b ? a : b; return m < c ? m : c; }",
        ],
        solutionExplanation: "Apply a two-value comparison twice: store the smaller of a and b in m, then compare m with c. This pattern extends naturally to finding the minimum of any number of values.",
      },
    },
    {
      id: "fn-012",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "쉬움",
      title: "문자열 반복 출력",
      description: `문자열 s와 정수 n을 받아 s를 n번 줄바꿈 없이 연속으로 출력하는 함수 printRepeat를 작성하세요.

입력: 문자열 s와 정수 n (공백으로 구분)`,
      constraints: "1 ≤ n ≤ 10, 1 ≤ s의 길이 ≤ 10",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

// printRepeat 함수를 여기에 작성하세요

int main() {
    string s;
    int n;
    cin >> s >> n;
    printRepeat(s, n);
    cout << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "ab 3", expectedOutput: "ababab", label: "기본" },
        { stdin: "hi 1", expectedOutput: "hi", label: "1번" },
        { stdin: "x 5", expectedOutput: "xxxxx", label: "단일 문자" },
      ],
      hints: [
        "void 함수는 return 값 없이 출력만 수행합니다.",
        "for 루프로 n번 반복해 cout << s를 호출하세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

void printRepeat(string s, int n) {
    for (int i = 0; i < n; i++) {
        cout << s;
    }
}

int main() {
    string s;
    int n;
    cin >> s >> n;
    printRepeat(s, n);
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "void 함수는 반환값 없이 부수 효과(출력)만 수행합니다. main에서 줄바꿈을 처리하면 함수 내부를 단순하게 유지할 수 있습니다.",
      en: {
        title: "Repeated String Print",
        description: `Write a function printRepeat that takes a string s and integer n, and prints s n times consecutively without a newline.

Input: string s and integer n (space-separated)`,
        constraints: "1 ≤ n ≤ 10, 1 ≤ length of s ≤ 10",
        hints: [
          "A void function performs output as a side effect with no return value.",
          "Use a for loop to call cout << s exactly n times.",
        ],
        solutionExplanation: "A void function performs a side effect (output) with no return value. Handling the newline in main keeps the function itself simple.",
      },
    },
    {
      id: "fn-013",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "배수 개수 세기",
      description: `1부터 limit까지의 정수 중 n의 배수 개수를 반환하는 함수 countMultiples(int n, int limit)를 작성하세요.

두 정수 n과 limit이 주어질 때 결과를 출력하세요.`,
      constraints: "1 ≤ n ≤ limit ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

// countMultiples 함수를 여기에 작성하세요

int main() {
    int n, limit;
    cin >> n >> limit;
    cout << countMultiples(n, limit) << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "3 10", expectedOutput: "3", label: "3의 배수 (3,6,9)" },
        { stdin: "5 20", expectedOutput: "4", label: "5의 배수" },
        { stdin: "7 7", expectedOutput: "1", label: "limit=n" },
      ],
      hints: [
        "for 루프로 i = n, 2n, 3n, ... <= limit 까지 세거나",
        "더 간단하게: return limit / n; 으로 정수 나눗셈만으로 구할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int countMultiples(int n, int limit) {
    return limit / n;
}

int main() {
    int n, limit;
    cin >> n >> limit;
    cout << countMultiples(n, limit) << "\\n";
    return 0;
}`,
      solutionExplanation: "1부터 limit까지 n의 배수 개수는 limit / n (정수 나눗셈)과 동일합니다. for 루프보다 O(1)로 훨씬 효율적입니다. 수학적 통찰로 코드를 단순화하는 좋은 예입니다.",
      en: {
        title: "Count Multiples",
        description: `Write a function countMultiples(int n, int limit) that returns the count of multiples of n from 1 to limit.

Given two integers n and limit, output the result.`,
        constraints: "1 ≤ n ≤ limit ≤ 10000",
        hints: [
          "Count with a for loop: i = n, 2n, 3n, ... while i <= limit, or",
          "More simply: return limit / n; — integer division gives the answer directly.",
        ],
        solutionExplanation: "The count of multiples of n up to limit equals limit / n (integer division). This is O(1) and far more efficient than a loop. A good example of simplifying code with a mathematical insight.",
      },
    },
    {
      id: "fn-014",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "보통",
      title: "거듭제곱 함수 (재귀)",
      description: `base의 exp 거듭제곱을 재귀로 계산하는 함수 power(int base, int exp)를 작성하세요.

- 기저 조건: exp == 0이면 1을 반환
- 재귀 호출: base * power(base, exp - 1)

두 정수 base와 exp가 주어질 때 결과를 출력하세요.`,
      constraints: "0 ≤ base ≤ 10, 0 ≤ exp ≤ 10",
      initialCode: `#include <iostream>
using namespace std;

// power 재귀 함수를 여기에 작성하세요

int main() {
    int base, exp;
    cin >> base >> exp;
    cout << power(base, exp) << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "2 10", expectedOutput: "1024", label: "2의 10승" },
        { stdin: "3 5", expectedOutput: "243", label: "3의 5승" },
        { stdin: "5 0", expectedOutput: "1", label: "0승은 항상 1" },
      ],
      hints: [
        "기저 조건: if (exp == 0) return 1;",
        "재귀 호출: return base * power(base, exp - 1);",
      ],
      solutionCode: `#include <iostream>
using namespace std;

long long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main() {
    int base, exp;
    cin >> base >> exp;
    cout << power(base, exp) << "\\n";
    return 0;
}`,
      solutionExplanation: "재귀의 핵심: 'base^exp = base × base^(exp-1)'이라는 수학적 정의를 그대로 코드로 표현합니다. exp가 0에 도달하면 1을 반환해 재귀를 종료합니다. long long을 사용해 큰 값의 오버플로우를 방지합니다.",
      en: {
        title: "Power Function (Recursive)",
        description: `Write a recursive function power(int base, int exp) to compute base raised to exp.

- Base case: if exp == 0, return 1
- Recursive call: base * power(base, exp - 1)

Given base and exp, output the result.`,
        constraints: "0 ≤ base ≤ 10, 0 ≤ exp ≤ 10",
        hints: [
          "Base case: if (exp == 0) return 1;",
          "Recursive call: return base * power(base, exp - 1);",
        ],
        solutionExplanation: "The key idea: 'base^exp = base × base^(exp-1)' translates the mathematical definition directly into code. When exp reaches 0, return 1 to end the recursion. Use long long to avoid overflow for large values.",
      },
    },
    {
      id: "fn-015",
      cluster: "functions",
      unlockAfter: "cpp-8",
      difficulty: "어려움",
      title: "소수의 합",
      description: `정수 N이 소수인지 판별하는 함수 isPrime을 작성한 뒤, 2부터 N까지의 소수를 모두 더한 합을 출력하세요.`,
      constraints: "2 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

// isPrime 함수를 여기에 작성하세요

int main() {
    int n;
    cin >> n;
    // 2부터 n까지 isPrime을 호출해 소수의 합을 구하세요
    return 0;
}`,
      testCases: [
        { stdin: "10", expectedOutput: "17", label: "2+3+5+7=17" },
        { stdin: "20", expectedOutput: "77", label: "N=20" },
        { stdin: "2", expectedOutput: "2", label: "N=2 (소수 하나)" },
      ],
      hints: [
        "isPrime(n): 2부터 sqrt(n)까지 나누어 보세요. i*i <= n 조건 활용.",
        "main에서 for 루프로 2부터 n까지 순회하며 isPrime이 true인 경우 합산하세요.",
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
    int sum = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) sum += i;
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation: "isPrime 함수를 먼저 만들고, main에서 반복 호출하는 '함수 재사용' 패턴입니다. i*i <= n 조건으로 O(sqrt(n)) 시간에 소수를 판별합니다. 함수를 잘 분리하면 main 로직이 단순해집니다.",
      en: {
        title: "Sum of Primes",
        description: `Write an isPrime function to check whether an integer is prime, then output the sum of all primes from 2 to N.`,
        constraints: "2 ≤ N ≤ 1000",
        hints: [
          "isPrime(n): try dividing from 2 to sqrt(n) using i*i <= n.",
          "In main, loop from 2 to n and accumulate whenever isPrime returns true.",
        ],
        solutionExplanation: "Build isPrime first, then call it repeatedly in main — this is the 'function reuse' pattern. The condition i*i <= n gives O(sqrt(n)) primality testing. Good function decomposition keeps main logic simple.",
      },
    },
  ],
}
