import type { PracticeCluster } from "./types"

export const bankBruteforceCluster: PracticeCluster = {
  id: "bank-bf",
  title: "완전탐색",
  emoji: "🔍",
  description: "모든 경우를 따져서 답을 구하는 방법 — 알고리즘 사고의 출발점",
  en: { title: "Brute Force", description: "Try all possibilities — the foundation of algorithmic thinking" },
  unlockAfter: "cpp-p3",
  problems: [
    {
      id: "bank-bf-001",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "두 수의 합",
      description: "N개의 정수가 주어질 때, 두 수를 골라 합이 T가 되는 쌍의 수를 구하세요. (i < j인 인덱스 쌍만 카운트)",
      constraints: "2 ≤ N ≤ 1000, -10000 ≤ 각 수 ≤ 10000, -20000 ≤ T ≤ 20000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 9\n2 7 4 5 4", expectedOutput: "2", label: "기본 케이스" },
        { stdin: "3 6\n1 2 3", expectedOutput: "1", label: "단순 케이스" },
        { stdin: "4 10\n3 7 2 8", expectedOutput: "1", label: "중간 케이스" },
      ],
      hints: [
        "모든 두 수의 쌍(i, j)을 따져보세요.",
        "i < j 조건을 지키며 이중 반복문을 사용하면 됩니다.",
        "a[i] + a[j] == t이면 카운트를 늘립니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    int count = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] + a[j] == t) count++;
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "i < j인 모든 쌍을 이중 반복문으로 확인합니다. a[i] + a[j] == t이면 카운트를 늘립니다. 시간복잡도는 O(N²)입니다.",
      en: {
        title: "Two Sum Count",
        description: "Given N integers, count the number of pairs (i < j) whose sum equals T.",
        hints: [
          "Consider every pair of indices (i, j).",
          "Use a double loop with the condition i < j.",
          "If a[i] + a[j] == t, increment the counter.",
        ],
        solutionExplanation: "Check all pairs (i, j) with i < j using a double loop. Increment the count when a[i] + a[j] == t. Time complexity is O(N²).",
      },
    },
    {
      id: "bank-bf-002",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "소수 목록",
      description: "1 이상 N 이하의 소수를 모두 한 줄에 하나씩 출력하세요.",
      constraints: "2 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10", expectedOutput: "2\n3\n5\n7", label: "10 이하" },
        { stdin: "20", expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19", label: "20 이하" },
        { stdin: "5", expectedOutput: "2\n3\n5", label: "5 이하" },
      ],
      hints: [
        "2부터 N까지 각 수가 소수인지 판별합니다.",
        "어떤 수 i가 소수인지 확인하려면 2부터 i-1까지 나누어봅니다.",
        "약수가 하나도 없으면 소수입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i < n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int n;
    cin >> n;
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) cout << i << "\n";
    return 0;
}`,
      solutionExplanation: "2부터 N까지 각 수에 대해 소수 판별 함수를 호출합니다. isPrime()은 2부터 n-1까지 나누어 떨어지는 수가 없으면 true를 반환합니다.",
      en: {
        title: "List of Primes",
        description: "Print all prime numbers from 1 to N, each on its own line.",
        hints: [
          "Check each number from 2 to N to see if it is prime.",
          "A number i is prime if no integer from 2 to i-1 divides it evenly.",
          "If no divisor is found, it is prime.",
        ],
        solutionExplanation: "Call a primality-check function for every number from 2 to N. isPrime() returns true if no number from 2 to n-1 divides it evenly.",
      },
    },
    {
      id: "bank-bf-003",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "약수 개수 최대",
      description: "1 이상 N 이하의 자연수 중 약수의 개수가 가장 많은 수를 출력하세요. 동률이면 가장 작은 수를 출력합니다.",
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
        { stdin: "10", expectedOutput: "6", label: "10 이하" },
        { stdin: "20", expectedOutput: "12", label: "20 이하" },
        { stdin: "30", expectedOutput: "24", label: "30 이하" },
      ],
      hints: [
        "각 수에 대해 약수의 개수를 구합니다.",
        "어떤 수 i의 약수 개수는 1부터 i까지 순회하며 나누어 떨어지는 수를 셉니다.",
        "약수 개수가 현재 최대보다 크면 갱신합니다. 같으면 작은 수를 유지합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int countDivisors(int n) {
    int cnt = 0;
    for (int i = 1; i <= n; i++)
        if (n % i == 0) cnt++;
    return cnt;
}

int main() {
    int n;
    cin >> n;
    int best = 1, bestCnt = 1;
    for (int i = 1; i <= n; i++) {
        int cnt = countDivisors(i);
        if (cnt > bestCnt) {
            bestCnt = cnt;
            best = i;
        }
    }
    cout << best << "\n";
    return 0;
}`,
      solutionExplanation: "1부터 N까지 각 수의 약수 개수를 구하고, 최대인 수를 추적합니다. 동률이면 갱신하지 않으므로(>) 자연스럽게 가장 작은 수가 선택됩니다.",
      en: {
        title: "Most Divisors",
        description: "Find the number from 1 to N that has the most divisors. If there is a tie, output the smallest such number.",
        hints: [
          "Count the divisors of each number from 1 to N.",
          "For number i, iterate from 1 to i and count how many divide evenly.",
          "Update the best if the count is strictly greater (ties keep the smaller number).",
        ],
        solutionExplanation: "Count divisors for each number 1..N and track the maximum. Using strict greater-than (>) for the update naturally keeps the smallest number in case of ties.",
      },
    },
    {
      id: "bank-bf-004",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "연속 구간 최대합",
      description: "N개의 정수가 주어질 때, 연속된 부분 배열의 합 중 최대값을 출력하세요.",
      constraints: "1 ≤ N ≤ 1000, -1000 ≤ 각 수 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n-1 2 3 -2 4", expectedOutput: "7", label: "양수 섞임" },
        { stdin: "4\n-3 -1 -4 -2", expectedOutput: "-1", label: "전부 음수" },
        { stdin: "6\n1 -2 3 4 -1 2", expectedOutput: "8", label: "중간 구간" },
      ],
      hints: [
        "시작 인덱스 i와 끝 인덱스 j를 모두 따져봅니다.",
        "a[i]부터 a[j]까지의 합을 계산하고 최대값을 갱신합니다.",
        "최솟값을 INT_MIN 또는 첫 번째 원소로 초기화하세요.",
      ],
      solutionCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    int maxSum = INT_MIN;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum > maxSum) maxSum = sum;
        }
    }
    cout << maxSum << "\n";
    return 0;
}`,
      solutionExplanation: "모든 시작점 i에 대해 j를 늘려가며 구간 합을 누적합니다. 각 구간의 합 중 최댓값을 추적합니다. 전부 음수인 경우도 처리하기 위해 INT_MIN으로 초기화합니다.",
      en: {
        title: "Maximum Subarray Sum",
        description: "Given N integers, find the maximum sum of any contiguous subarray.",
        hints: [
          "Try every possible starting index i and ending index j.",
          "Accumulate a[i..j] and update the maximum.",
          "Initialize the answer to INT_MIN (or the first element) to handle all-negative arrays.",
        ],
        solutionExplanation: "For each starting index i, extend j while accumulating the sum. Track the overall maximum. Initialize with INT_MIN so all-negative inputs are handled correctly.",
      },
    },
    {
      id: "bank-bf-005",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "완전수 찾기",
      description: "1 이상 N 이하의 완전수를 모두 한 줄에 하나씩 출력하세요. 완전수란 자신을 제외한 약수의 합이 자신과 같은 수입니다.",
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
        { stdin: "30", expectedOutput: "6\n28", label: "30 이하" },
        { stdin: "1000", expectedOutput: "6\n28\n496", label: "1000 이하" },
        { stdin: "5", expectedOutput: "", label: "완전수 없음" },
      ],
      hints: [
        "각 수에 대해 자신을 제외한 약수의 합을 구합니다.",
        "1부터 n-1까지 순회하면서 n으로 나누어 떨어지면 합산합니다.",
        "약수의 합이 n과 같으면 완전수입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

bool isPerfect(int n) {
    if (n < 2) return false;
    int sum = 0;
    for (int i = 1; i < n; i++)
        if (n % i == 0) sum += i;
    return sum == n;
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        if (isPerfect(i)) cout << i << "\n";
    return 0;
}`,
      solutionExplanation: "각 수 n에 대해 1부터 n-1까지 약수의 합을 구합니다. 합이 n과 같으면 완전수로 출력합니다. 완전수가 없으면 아무것도 출력하지 않습니다.",
      en: {
        title: "Perfect Numbers",
        description: "Print all perfect numbers from 1 to N, each on its own line. A perfect number equals the sum of its proper divisors.",
        hints: [
          "For each number, sum all of its proper divisors (excluding itself).",
          "Iterate from 1 to n-1 and add every divisor of n.",
          "If the sum equals n, it is a perfect number.",
        ],
        solutionExplanation: "For each n, sum divisors from 1 to n-1. If the sum equals n, print it. If no perfect numbers exist in the range, nothing is printed.",
      },
    },
    {
      id: "bank-bf-006",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "팰린드롬 수 개수",
      description: "A 이상 B 이하의 정수 중 팰린드롬인 수의 개수를 출력하세요. (앞뒤로 읽어도 같은 수)",
      constraints: "1 ≤ A ≤ B ≤ 100000",
      initialCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 100", expectedOutput: "18", label: "1~100" },
        { stdin: "10 99", expectedOutput: "9", label: "두 자리" },
        { stdin: "100 200", expectedOutput: "1", label: "세 자리" },
      ],
      hints: [
        "각 수를 문자열로 변환하여 팰린드롬인지 확인합니다.",
        "문자열이 뒤집어도 같으면 팰린드롬입니다.",
        "to_string()으로 정수를 문자열로, reverse()나 직접 비교로 확인합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

bool isPalin(int n) {
    string s = to_string(n);
    string r = s;
    reverse(r.begin(), r.end());
    return s == r;
}

int main() {
    int a, b;
    cin >> a >> b;
    int count = 0;
    for (int i = a; i <= b; i++)
        if (isPalin(i)) count++;
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "각 수를 to_string()으로 문자열로 변환한 뒤, reverse()로 뒤집어 원본과 비교합니다. 같으면 팰린드롬입니다.",
      en: {
        title: "Palindrome Count",
        description: "Count the integers from A to B (inclusive) that read the same forwards and backwards.",
        hints: [
          "Convert each number to a string and check if it is a palindrome.",
          "A string is a palindrome if it equals its reverse.",
          "Use to_string() to convert, then reverse() or a manual check.",
        ],
        solutionExplanation: "Convert each number to a string with to_string(), reverse it, and compare to the original. Increment the counter for each match.",
      },
    },
    {
      id: "bank-bf-007",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "세 수의 합",
      description: "N개의 정수 중 세 수를 골라(i < j < k) 합이 T가 되는 경우의 수를 구하세요.",
      constraints: "3 ≤ N ≤ 200, -10000 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    int a[200];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 6\n1 2 3 4", expectedOutput: "1", label: "기본 케이스" },
        { stdin: "5 9\n1 2 3 4 5", expectedOutput: "2", label: "두 가지 조합" },
        { stdin: "6 10\n1 2 3 4 5 6", expectedOutput: "3", label: "세 가지 조합" },
      ],
      hints: [
        "세 인덱스 i, j, k를 모두 따져봅니다.",
        "i < j < k 조건을 지키며 삼중 반복문을 사용합니다.",
        "a[i] + a[j] + a[k] == t이면 카운트를 늘립니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    int a[200];
    for (int i = 0; i < n; i++) cin >> a[i];
    int count = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            for (int k = j + 1; k < n; k++)
                if (a[i] + a[j] + a[k] == t) count++;
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "i < j < k를 만족하는 모든 삼중 쌍을 삼중 반복문으로 탐색합니다. 합이 T이면 카운트를 늘립니다. N ≤ 200이므로 O(N³) = 8,000,000으로 충분합니다.",
      en: {
        title: "Three Sum Count",
        description: "Given N integers, count the number of triples (i < j < k) whose sum equals T.",
        hints: [
          "Consider every triple of indices i, j, k.",
          "Use a triple nested loop with the constraint i < j < k.",
          "Increment the counter when a[i] + a[j] + a[k] == t.",
        ],
        solutionExplanation: "Enumerate all triples with i < j < k using three nested loops. Increment when the sum equals T. With N ≤ 200, O(N³) ≈ 8,000,000 is fast enough.",
      },
    },
    {
      id: "bank-bf-008",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "부분집합 합",
      description: "N개의 정수 중 0개 이상을 선택해서 합이 정확히 S가 될 수 있으면 \"YES\", 없으면 \"NO\"를 출력하세요.",
      constraints: "1 ≤ N ≤ 20, 0 ≤ S ≤ 100000, 1 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, s;
    cin >> n >> s;
    int a[20];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 9\n2 3 7 8", expectedOutput: "YES", label: "가능한 경우" },
        { stdin: "4 1\n2 3 7 8", expectedOutput: "NO", label: "불가능한 경우" },
        { stdin: "5 15\n1 2 3 4 5", expectedOutput: "YES", label: "전체 합" },
      ],
      hints: [
        "2^N가지 부분집합을 모두 시도해봅니다.",
        "비트마스크를 이용해 0부터 2^N-1까지 반복합니다.",
        "각 비트가 1이면 해당 원소를 선택한 것으로 합산하고, 합이 S이면 YES입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, s;
    cin >> n >> s;
    int a[20];
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int mask = 0; mask < (1 << n); mask++) {
        int sum = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sum += a[i];
        if (sum == s) {
            cout << "YES\n";
            return 0;
        }
    }
    cout << "NO\n";
    return 0;
}`,
      solutionExplanation: "0부터 2^N-1까지의 각 정수를 비트마스크로 사용합니다. i번째 비트가 1이면 a[i]를 포함합니다. 어떤 마스크에서 합이 S가 되면 YES를 출력합니다.",
      en: {
        title: "Subset Sum",
        description: "Given N integers, determine whether any subset (including the empty set) sums to exactly S. Output \"YES\" or \"NO\".",
        hints: [
          "Try all 2^N possible subsets.",
          "Use a bitmask from 0 to 2^N - 1 to represent each subset.",
          "If bit i is set, include a[i] in the sum. If any subset sums to S, output YES.",
        ],
        solutionExplanation: "Each integer from 0 to 2^N-1 serves as a bitmask. Bit i being 1 means a[i] is included. If any mask produces a sum of S, print YES and exit.",
      },
    },
    {
      id: "bank-bf-009",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "가장 가까운 두 점",
      description: "2차원 평면 위 N개의 점이 주어질 때, 두 점 사이의 최소 거리를 소수점 둘째 자리까지 출력하세요.",
      constraints: "2 ≤ N ≤ 1000, -10000 ≤ x,y ≤ 10000",
      initialCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    double x[1000], y[1000];
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n0 0\n3 4\n1 1", expectedOutput: "1.41", label: "세 점" },
        { stdin: "4\n0 0\n1 0\n0 1\n5 5", expectedOutput: "1.00", label: "최소 1.00" },
        { stdin: "2\n0 0\n3 4", expectedOutput: "5.00", label: "두 점" },
      ],
      hints: [
        "모든 두 점의 쌍을 확인합니다.",
        "두 점 (x1, y1)과 (x2, y2)의 거리는 sqrt((x1-x2)^2 + (y1-y2)^2)입니다.",
        "fixed << setprecision(2)로 소수점 두 자리를 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <cmath>
#include <iomanip>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    double x[1000], y[1000];
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    double minDist = 1e18;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            double dx = x[i] - x[j], dy = y[i] - y[j];
            double dist = sqrt(dx * dx + dy * dy);
            if (dist < minDist) minDist = dist;
        }
    cout << fixed << setprecision(2) << minDist << "\n";
    return 0;
}`,
      solutionExplanation: "모든 점 쌍 (i, j)에 대해 유클리드 거리를 계산하고 최솟값을 유지합니다. sqrt()로 실제 거리를 구한 뒤 fixed + setprecision(2)로 출력합니다.",
      en: {
        title: "Closest Pair of Points",
        description: "Given N points on a 2D plane, output the minimum distance between any two points, rounded to two decimal places.",
        hints: [
          "Check every pair of points.",
          "The distance between (x1,y1) and (x2,y2) is sqrt((x1-x2)² + (y1-y2)²).",
          "Use fixed << setprecision(2) to print exactly two decimal places.",
        ],
        solutionExplanation: "Compute the Euclidean distance for all pairs (i, j) and track the minimum. Output with fixed + setprecision(2).",
      },
    },
    {
      id: "bank-bf-010",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "배낭 채우기",
      description: "N개의 물건이 있고 각 물건은 무게 w와 가치 v를 가집니다. 배낭의 최대 무게가 W일 때 담을 수 있는 최대 가치를 구하세요. (각 물건은 한 번씩만 사용)",
      constraints: "1 ≤ N ≤ 20, 1 ≤ W ≤ 1000, 1 ≤ 무게 ≤ 100, 1 ≤ 가치 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    int w[20], v[20];
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 5\n2 6\n2 10\n3 12", expectedOutput: "22", label: "기본 케이스" },
        { stdin: "2 3\n2 3\n3 4", expectedOutput: "3", label: "하나만 선택" },
        { stdin: "4 7\n1 1\n3 4\n4 5\n5 7", expectedOutput: "9", label: "최적 조합" },
      ],
      hints: [
        "2^N가지 부분집합을 모두 시도합니다.",
        "각 부분집합에서 총 무게가 W를 초과하지 않는지 확인합니다.",
        "조건을 만족하면 총 가치를 계산하고 최댓값을 갱신합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    int w[20], v[20];
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];
    int maxVal = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int totalW = 0, totalV = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                totalW += w[i];
                totalV += v[i];
            }
        }
        if (totalW <= W && totalV > maxVal) maxVal = totalV;
    }
    cout << maxVal << "\n";
    return 0;
}`,
      solutionExplanation: "비트마스크로 2^N가지 부분집합을 모두 탐색합니다. 총 무게가 W 이하인 경우에 한해 총 가치를 계산하고 최댓값을 갱신합니다.",
      en: {
        title: "0/1 Knapsack",
        description: "Given N items each with weight w and value v, find the maximum total value you can carry without exceeding weight W. Each item can be used at most once.",
        hints: [
          "Try all 2^N subsets of items.",
          "For each subset, check that the total weight does not exceed W.",
          "Among valid subsets, track the maximum total value.",
        ],
        solutionExplanation: "Enumerate all 2^N subsets via bitmask. For each valid subset (total weight ≤ W), compute the total value and update the maximum.",
      },
    },
    {
      id: "bank-bf-011",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "자릿수 합 조건",
      description: "1 이상 N 이하 자연수 중 각 자리 숫자의 합이 S인 수의 개수를 출력하세요.",
      constraints: "1 ≤ N ≤ 10000, 1 ≤ S ≤ 36",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, s;
    cin >> n >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "100 10", expectedOutput: "9", label: "자릿수 합 10" },
        { stdin: "50 5", expectedOutput: "6", label: "자릿수 합 5" },
        { stdin: "30 3", expectedOutput: "3", label: "자릿수 합 3" },
      ],
      hints: [
        "1부터 N까지 각 수에 대해 자릿수 합을 구합니다.",
        "자릿수 합: 수를 10으로 반복해서 나누며 나머지를 더합니다.",
        "자릿수 합이 S이면 카운트를 늘립니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int digitSum(int n) {
    int s = 0;
    while (n > 0) {
        s += n % 10;
        n /= 10;
    }
    return s;
}

int main() {
    int n, s;
    cin >> n >> s;
    int count = 0;
    for (int i = 1; i <= n; i++)
        if (digitSum(i) == s) count++;
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "각 수의 자릿수 합을 구하는 함수를 만들고 1부터 N까지 적용합니다. 10으로 나눈 나머지를 더하는 방식으로 자릿수 합을 구합니다.",
      en: {
        title: "Digit Sum Condition",
        description: "Count how many integers from 1 to N have a digit sum equal to S.",
        hints: [
          "Compute the digit sum for every number from 1 to N.",
          "Digit sum: repeatedly divide by 10 and add the remainders.",
          "Increment the counter whenever the digit sum equals S.",
        ],
        solutionExplanation: "A helper function computes the digit sum by repeatedly taking n % 10 and dividing by 10. Count how many numbers 1..N match the target digit sum S.",
      },
    },
    {
      id: "bank-bf-012",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "카드 조합 합",
      description: "N장의 카드에 적힌 숫자 중 K장을 골라 만들 수 있는 서로 다른 합의 개수를 출력하세요.",
      constraints: "1 ≤ K ≤ N ≤ 15, 1 ≤ 각 수 ≤ 100",
      initialCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int a[15];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 2\n1 2 3 4", expectedOutput: "5", label: "기본 케이스" },
        { stdin: "3 2\n1 2 4", expectedOutput: "3", label: "세 장 중 두 장" },
        { stdin: "5 3\n1 2 3 4 5", expectedOutput: "7", label: "다섯 장 중 세 장" },
      ],
      hints: [
        "비트마스크로 K장을 정확히 선택하는 모든 경우를 찾습니다.",
        "set을 사용하면 중복 없이 서로 다른 합을 추적할 수 있습니다.",
        "1인 비트의 개수(popcount)가 K인 마스크만 처리합니다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int a[15];
    for (int i = 0; i < n; i++) cin >> a[i];
    set<int> sums;
    for (int mask = 0; mask < (1 << n); mask++) {
        int bits = __builtin_popcount(mask);
        if (bits != k) continue;
        int sum = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sum += a[i];
        sums.insert(sum);
    }
    cout << sums.size() << "\n";
    return 0;
}`,
      solutionExplanation: "비트마스크로 N장의 카드 중 K장을 선택하는 모든 경우를 열거합니다. 각 경우의 합을 set에 삽입해 중복을 제거하고, set의 크기를 출력합니다.",
      en: {
        title: "Combination Sum Count",
        description: "Count the number of distinct sums that can be formed by choosing exactly K cards from N cards.",
        hints: [
          "Use a bitmask to enumerate all ways to choose exactly K cards.",
          "Use a set to track distinct sums (no duplicates).",
          "Only process masks where the number of set bits equals K (use popcount).",
        ],
        solutionExplanation: "Enumerate all bitmasks. For each mask with exactly K bits set, compute the sum and insert it into a set. The answer is the set's size.",
      },
    },
    {
      id: "bank-bf-013",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "최소 동전 개수",
      description: "N가지 동전 종류와 금액 M이 주어질 때, M원을 만드는 데 필요한 최소 동전 수를 출력하세요. 만들 수 없으면 -1을 출력합니다.",
      constraints: "1 ≤ N ≤ 10, 1 ≤ M ≤ 10000, 1 ≤ 동전 ≤ 1000",
      initialCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int coins[10];
    for (int i = 0; i < n; i++) cin >> coins[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 11\n1 4 6", expectedOutput: "3", label: "가능한 경우" },
        { stdin: "3 7\n3 5 7", expectedOutput: "1", label: "한 개로 가능" },
        { stdin: "2 3\n2 4", expectedOutput: "-1", label: "불가능한 경우" },
      ],
      hints: [
        "각 금액에 대해 최소 동전 수를 저장하는 배열을 만듭니다.",
        "dp[0] = 0으로 초기화하고, dp[i] = min(dp[i - coin] + 1)로 점화식을 세웁니다.",
        "dp[m]이 초기 무한값이면 -1을 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int coins[10];
    for (int i = 0; i < n; i++) cin >> coins[i];
    int dp[10001];
    for (int i = 0; i <= m; i++) dp[i] = INT_MAX;
    dp[0] = 0;
    for (int i = 1; i <= m; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i && dp[i - coins[j]] != INT_MAX)
                dp[i] = min(dp[i], dp[i - coins[j]] + 1);
        }
    }
    cout << (dp[m] == INT_MAX ? -1 : dp[m]) << "\n";
    return 0;
}`,
      solutionExplanation: "dp[i]를 금액 i를 만드는 최소 동전 수로 정의합니다. dp[0] = 0에서 출발하여 각 동전을 써서 도달 가능한 금액을 갱신합니다. dp[m]이 INT_MAX이면 -1을 출력합니다.",
      en: {
        title: "Minimum Coins",
        description: "Given N coin denominations and a target amount M, find the minimum number of coins needed to make exactly M. Output -1 if it is impossible.",
        hints: [
          "Build an array dp[0..M] storing the minimum coins for each amount.",
          "Initialize dp[0] = 0 and all others to infinity.",
          "For each amount i and each coin, update dp[i] = min(dp[i], dp[i - coin] + 1). Output -1 if dp[m] is still infinity.",
        ],
        solutionExplanation: "dp[i] is the minimum number of coins to make amount i. Starting from dp[0]=0, update reachable amounts for each coin denomination. If dp[m] remains INT_MAX, output -1.",
      },
    },
    {
      id: "bank-bf-014",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "팀 점수 차 최소화",
      description: "N명(짝수)을 두 팀(각 N/2명)으로 나누어 두 팀의 점수 합의 차이를 최소화하세요. 최소 차이를 출력합니다.",
      constraints: "2 ≤ N ≤ 20 (짝수), 1 ≤ 점수 ≤ 1000",
      initialCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[20];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "0", label: "균등 분할" },
        { stdin: "4\n1 2 5 8", expectedOutput: "2", label: "최소 차이 2" },
        { stdin: "6\n1 1 1 1 1 1", expectedOutput: "0", label: "모두 동일" },
      ],
      hints: [
        "비트마스크로 N명 중 N/2명을 선택하는 모든 경우를 탐색합니다.",
        "선택된 팀의 합과 나머지 팀의 합의 차이를 계산합니다.",
        "차이의 절댓값이 최솟값이 되도록 갱신합니다.",
      ],
      solutionCode: `#include <iostream>
#include <climits>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[20];
    int total = 0;
    for (int i = 0; i < n; i++) { cin >> a[i]; total += a[i]; }
    int minDiff = INT_MAX;
    int half = n / 2;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (__builtin_popcount(mask) != half) continue;
        int sum = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sum += a[i];
        int diff = abs(total - 2 * sum);
        if (diff < minDiff) minDiff = diff;
    }
    cout << minDiff << "\n";
    return 0;
}`,
      solutionExplanation: "비트마스크로 정확히 N/2명을 선택하는 모든 경우를 탐색합니다. 선택된 팀의 합을 sum이라 하면, 차이는 |total - 2*sum|입니다. 이 값의 최솟값을 출력합니다.",
      en: {
        title: "Minimize Team Score Difference",
        description: "Divide N people (N is even) into two teams of N/2 each to minimize the absolute difference between the two teams' total scores. Output the minimum difference.",
        hints: [
          "Use a bitmask to enumerate all ways to assign N/2 people to one team.",
          "If one team's sum is s, the other team's sum is total - s.",
          "Track the minimum value of |total - 2 * s| across all valid splits.",
        ],
        solutionExplanation: "Enumerate all bitmasks with exactly N/2 bits set. For each, compute the team sum s; the difference is |total - 2*s|. Output the minimum such difference.",
      },
    },
    {
      id: "bank-bf-015",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "조합 출력",
      description: "1 이상 N 이하 자연수 중 M개를 선택한 모든 조합을 사전순으로 출력하세요.",
      constraints: "1 ≤ M ≤ N ≤ 8",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 2", expectedOutput: "1 2\n1 3\n1 4\n2 3\n2 4\n3 4", label: "4C2" },
        { stdin: "3 1", expectedOutput: "1\n2\n3", label: "3C1" },
        { stdin: "3 3", expectedOutput: "1 2 3", label: "3C3" },
      ],
      hints: [
        "재귀 함수로 조합을 생성할 수 있습니다.",
        "현재까지 선택된 수의 개수와 마지막으로 선택한 수를 인자로 넘깁니다.",
        "선택된 수가 M개이면 출력합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int n, m;
int chosen[8];

void solve(int start, int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++) {
            if (i > 0) cout << " ";
            cout << chosen[i];
        }
        cout << "\n";
        return;
    }
    for (int i = start; i <= n; i++) {
        chosen[depth] = i;
        solve(i + 1, depth + 1);
    }
}

int main() {
    cin >> n >> m;
    solve(1, 0);
    return 0;
}`,
      solutionExplanation: "재귀 함수 solve(start, depth)를 사용합니다. depth가 M이 되면 선택된 수를 출력합니다. 각 단계에서 start부터 n까지의 수를 하나씩 선택하고 재귀 호출합니다. 자연스럽게 사전순으로 출력됩니다.",
      en: {
        title: "Print Combinations",
        description: "Print all combinations of M numbers chosen from 1 to N in lexicographic order.",
        hints: [
          "Use a recursive function to generate combinations.",
          "Pass the current number of chosen elements and the next starting value as arguments.",
          "When M elements have been chosen, print them.",
        ],
        solutionExplanation: "A recursive solve(start, depth) builds combinations. When depth == M, print the chosen array. Iterating start..n in order naturally produces lexicographic output.",
      },
    },
    {
      id: "bank-bf-016",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "최장 증가 부분수열",
      description: "N개의 정수로 이루어진 수열에서 가장 긴 증가 부분수열(LIS)의 길이를 출력하세요.",
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "6\n10 20 10 30 20 50", expectedOutput: "4", label: "기본 케이스" },
        { stdin: "5\n3 1 2 1 5", expectedOutput: "3", label: "중간 케이스" },
        { stdin: "4\n4 3 2 1", expectedOutput: "1", label: "역순" },
      ],
      hints: [
        "dp[i]를 i번째 원소에서 끝나는 LIS의 길이로 정의합니다.",
        "각 i에 대해, i보다 앞에 있고 a[j] < a[i]인 모든 j를 확인합니다.",
        "dp[i] = max(dp[j] + 1) (a[j] < a[i]인 모든 j에 대해), 초기값은 1입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    int dp[1000];
    for (int i = 0; i < n; i++) dp[i] = 1;
    int ans = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i])
                dp[i] = dp[j] + 1;
        }
        if (dp[i] > ans) ans = dp[i];
    }
    cout << ans << "\n";
    return 0;
}`,
      solutionExplanation: "dp[i]를 a[i]에서 끝나는 LIS 길이로 정의합니다. 각 i에 대해 i 이전 인덱스 j 중 a[j] < a[i]이면 dp[i]를 dp[j]+1로 갱신합니다. 모든 dp[i]의 최댓값이 답입니다.",
      en: {
        title: "Longest Increasing Subsequence",
        description: "Find the length of the longest strictly increasing subsequence (LIS) of N integers.",
        hints: [
          "Define dp[i] as the length of the LIS ending at index i.",
          "For each i, look at all j < i where a[j] < a[i].",
          "dp[i] = max(dp[j] + 1) over all valid j; initialize dp[i] = 1.",
        ],
        solutionExplanation: "dp[i] stores the LIS length ending at a[i]. For each i, check all j < i with a[j] < a[i] and set dp[i] = max(dp[i], dp[j]+1). The answer is the maximum of all dp values.",
      },
    },
    {
      id: "bank-bf-017",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "숫자 재배치 최댓값",
      description: "N자리 수가 주어질 때, 각 자리 숫자를 재배치하여 만들 수 있는 가장 큰 수를 출력하세요. (앞자리에 0이 오면 안 됩니다. 입력은 항상 0만으로 이루어지지 않습니다.)",
      constraints: "1 ≤ 자리수 ≤ 12",
      initialCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1234", expectedOutput: "4321", label: "기본 케이스" },
        { stdin: "9120", expectedOutput: "9210", label: "0 포함" },
        { stdin: "3030", expectedOutput: "3300", label: "0 두 개" },
      ],
      hints: [
        "자리 숫자들을 내림차순으로 정렬하면 가장 큰 수가 됩니다.",
        "sort()에 greater<char>()를 사용하면 내림차순 정렬이 됩니다.",
        "내림차순 정렬 후 앞자리가 0이 되는 경우는 입력 조건상 발생하지 않습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    sort(s.begin(), s.end(), greater<char>());
    cout << s << "\n";
    return 0;
}`,
      solutionExplanation: "문자열의 각 문자(자리 숫자)를 내림차순으로 정렬합니다. 문자 비교에서 '9' > '8' > ... > '0'이므로 greater<char>()로 내림차순 정렬하면 가장 큰 수를 얻을 수 있습니다.",
      en: {
        title: "Largest Rearrangement",
        description: "Given an N-digit number, rearrange its digits to form the largest possible number. No leading zeros are allowed (the input is never all zeros).",
        hints: [
          "Sort the digits in descending order to get the largest number.",
          "Use sort() with greater<char>() for descending character order.",
          "Given the input constraint, the first digit after sorting is never 0.",
        ],
        solutionExplanation: "Sort the string's characters in descending order. Since '9' > '8' > ... > '0' lexicographically, sort with greater<char>() gives the largest arrangement.",
      },
    },
    {
      id: "bank-bf-018",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "구간 합이 K인 부분배열",
      description: "N개의 정수에서 합이 정확히 K인 연속 부분배열의 수를 출력하세요.",
      constraints: "1 ≤ N ≤ 10000, -1000 ≤ 각 수 ≤ 1000, -10^6 ≤ K ≤ 10^6",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int a[10000];
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 5\n1 2 3 4 5", expectedOutput: "2", label: "합 5인 구간" },
        { stdin: "5 0\n1 -1 2 -2 3", expectedOutput: "3", label: "합 0인 구간" },
        { stdin: "4 4\n4 1 3 2", expectedOutput: "2", label: "합 4인 구간" },
      ],
      hints: [
        "모든 시작점과 끝점의 쌍을 따져봅니다.",
        "prefix[i] = a[0] + ... + a[i-1]로 구간 합을 O(1)에 계산합니다.",
        "prefix[j] - prefix[i] == k이면 구간 [i, j-1]의 합이 k입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int a[10000];
    for (int i = 0; i < n; i++) cin >> a[i];
    int count = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum == k) count++;
        }
    }
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "모든 시작 인덱스 i에 대해 j를 늘려가며 구간 합을 누적합니다. 합이 k이면 카운트를 늘립니다. N ≤ 10000이므로 O(N²) = 10^8이 다소 느릴 수 있지만, 단순 누적이라 빠르게 동작합니다.",
      en: {
        title: "Subarray Sum Equals K",
        description: "Count the number of contiguous subarrays whose sum equals exactly K.",
        hints: [
          "Try every pair of starting and ending indices.",
          "Use a running sum starting from index i, extending j to the right.",
          "Increment the counter whenever the running sum equals K.",
        ],
        solutionExplanation: "For each starting index i, extend j to the right while accumulating the sum. Count each time the sum equals K. O(N²) with a simple inner loop runs efficiently for N ≤ 10000.",
      },
    },
    {
      id: "bank-bf-019",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "외판원 문제",
      description: "N개 도시가 있고, 모든 도시 쌍 사이의 이동 비용이 주어집니다. 도시 0에서 출발하여 모든 도시를 정확히 한 번씩 방문하고 도시 0으로 돌아오는 최소 비용을 구하세요.",
      constraints: "2 ≤ N ≤ 10, 1 ≤ 비용 ≤ 1000 (같은 도시 이동 비용 = 0)",
      initialCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    int dist[10][10];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> dist[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0", expectedOutput: "80", label: "4개 도시" },
        { stdin: "3\n0 1 2\n1 0 3\n2 3 0", expectedOutput: "6", label: "3개 도시" },
        { stdin: "2\n0 5\n5 0", expectedOutput: "10", label: "2개 도시" },
      ],
      hints: [
        "도시 1부터 N-1까지의 순열을 모두 시도합니다.",
        "각 순열에 대해 0→순열[0]→순열[1]→...→순열[N-2]→0의 총 비용을 계산합니다.",
        "next_permutation()을 사용하면 편리합니다.",
      ],
      solutionCode: `#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    int dist[10][10];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> dist[i][j];
    vector<int> cities;
    for (int i = 1; i < n; i++) cities.push_back(i);
    int minCost = INT_MAX;
    do {
        int cost = dist[0][cities[0]];
        for (int i = 0; i + 1 < (int)cities.size(); i++)
            cost += dist[cities[i]][cities[i + 1]];
        cost += dist[cities.back()][0];
        if (cost < minCost) minCost = cost;
    } while (next_permutation(cities.begin(), cities.end()));
    cout << minCost << "\n";
    return 0;
}`,
      solutionExplanation: "도시 1부터 N-1까지의 모든 순열을 next_permutation()으로 탐색합니다. 각 순열에 대해 0에서 출발해 순열 순서대로 방문하고 0으로 돌아오는 총 비용을 계산하여 최솟값을 추적합니다.",
      en: {
        title: "Travelling Salesman Problem",
        description: "Given N cities and the travel costs between every pair, find the minimum cost to start at city 0, visit every other city exactly once, and return to city 0.",
        hints: [
          "Try all permutations of cities 1 through N-1.",
          "For each permutation, compute the cost: 0 → perm[0] → ... → perm[N-2] → 0.",
          "Use next_permutation() to iterate over all orderings.",
        ],
        solutionExplanation: "Enumerate all permutations of cities 1..N-1 with next_permutation(). For each permutation, compute the total tour cost starting and ending at city 0. Track and output the minimum.",
      },
    },
    {
      id: "bank-bf-020",
      cluster: "bank-bf",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "체스판 다시 칠하기",
      description: "NxM 크기의 보드가 주어질 때, 이 안에서 8x8 체스판 패턴(교대로 흑백)이 되도록 최소한으로 다시 칠해야 하는 칸 수를 출력하세요.",
      constraints: "8 ≤ N, M ≤ 50",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string board[50];
    for (int i = 0; i < n; i++) cin >> board[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "8 8\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW",
          expectedOutput: "0",
          label: "완벽한 체스판",
        },
        {
          stdin: "8 8\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW\nWWWWWWWW",
          expectedOutput: "32",
          label: "모두 흰색",
        },
        {
          stdin: "8 8\nBBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW\nWBWBWBWB\nBWBWBWBW",
          expectedOutput: "1",
          label: "한 칸만 다름",
        },
      ],
      hints: [
        "가능한 8x8 시작 위치 (i, j)를 모두 따져봅니다.",
        "각 위치에 대해 두 가지 패턴(시작이 W인 경우와 B인 경우)을 모두 시도합니다.",
        "(r+c)가 짝수인 칸은 한 색, 홀수인 칸은 다른 색이어야 합니다. 불일치 칸 수의 최솟값을 구합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string board[50];
    for (int i = 0; i < n; i++) cin >> board[i];
    int minPaint = INT_MAX;
    for (int si = 0; si <= n - 8; si++) {
        for (int sj = 0; sj <= m - 8; sj++) {
            // Pattern 1: (si+sj) even -> W
            // Pattern 2: (si+sj) even -> B
            int cnt1 = 0, cnt2 = 0;
            for (int r = si; r < si + 8; r++) {
                for (int c = sj; c < sj + 8; c++) {
                    bool even = ((r + c) % 2 == 0);
                    if (even && board[r][c] != 'W') cnt1++;
                    if (!even && board[r][c] != 'B') cnt1++;
                    if (even && board[r][c] != 'B') cnt2++;
                    if (!even && board[r][c] != 'W') cnt2++;
                }
            }
            minPaint = min(minPaint, min(cnt1, cnt2));
        }
    }
    cout << minPaint << "\n";
    return 0;
}`,
      solutionExplanation: "가능한 모든 8x8 시작 위치 (si, sj)에 대해 두 가지 체스판 패턴을 시도합니다. (r+c)가 짝수인 칸이 W(또는 B)여야 하는 패턴으로, 불일치 칸 수를 세어 최솟값을 출력합니다.",
      en: {
        title: "Repaint the Chessboard",
        description: "Given an NxM board of 'W' and 'B' cells, find the minimum number of cells to repaint so that some 8x8 sub-board forms a valid chessboard pattern (alternating colors).",
        hints: [
          "Try every possible 8x8 starting position (i, j) within the board.",
          "For each position, test both possible patterns (starting with W or starting with B).",
          "Cells where (r+c) is even should be one color; odd should be the other. Count mismatches.",
        ],
        solutionExplanation: "For every valid 8x8 top-left corner (si, sj), count mismatches for both color-pattern orientations. The answer is the minimum mismatch count across all positions and both patterns.",
      },
    },
  ],
}

export default bankBruteforceCluster
