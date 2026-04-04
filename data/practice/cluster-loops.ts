import type { PracticeCluster } from "./types"

export const loopsCluster: PracticeCluster = {
  id: "loops",
  title: "반복문 패턴",
  emoji: "🔁",
  description: "for/while, 누적, 중첩 루프, 패턴 출력",
  unlockAfter: "cpp-7",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
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
        cout << i << "\n";
    return 0;
}`,
      solutionExplanation: "i를 n으로 초기화하고 n씩 증가시키면 n의 배수만 순서대로 얻을 수 있습니다.",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
        cout << '\n';
    }
    return 0;
}`,
      solutionExplanation: "i번째 행에서 별을 i개 출력합니다. 안쪽 루프의 상한을 i로 설정하는 것이 핵심입니다.",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
        cout << n << " x " << i << " = " << n * i << "\n";
    return 0;
}`,
      solutionExplanation: "for 루프 하나로 i=1~9를 순회하며 형식에 맞춰 출력합니다.",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int a, b;
    cin >> a >> b;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int a, b;
    cin >> a >> b;
    // 여기에 코드를 작성하세요
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
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
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
        cout << '\n';
    }
    return 0;
}`,
      solutionExplanation: "중첩 루프의 기본입니다. 바깥 루프(행)와 안쪽 루프(열)를 독립적으로 제어합니다.",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
        if (n % i == 0) cout << i << '\n';
    return 0;
}`,
      solutionExplanation: "1부터 n까지 순회하며 n을 나누어 떨어지게 하는 수를 출력합니다. O(N)이지만 N≤1000이므로 충분합니다.",
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    long long n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
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
    },
  ],
}
