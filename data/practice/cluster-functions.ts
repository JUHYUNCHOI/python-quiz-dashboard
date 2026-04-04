import type { PracticeCluster } from "./types"

export const functionsCluster: PracticeCluster = {
  id: "functions",
  title: "함수 활용",
  emoji: "🔧",
  description: "함수 선언/정의, 매개변수, return, 재귀 함수 기초",
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
    },
  ],
}
