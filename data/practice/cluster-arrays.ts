import type { PracticeCluster } from "./types"

export const arraysCluster: PracticeCluster = {
  id: "arrays",
  title: "배열/벡터",
  emoji: "📦",
  description: "배열 순회, 최대/최소, 두 배열 비교",
  unlockAfter: "cpp-9",
  en: {
    title: "Arrays & Vectors",
    description: "Traversal, max/min, two-array patterns",
  },
  problems: [
    {
      id: "arr-001",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "배열 최댓값",
      description: `N개의 정수가 주어질 때, 가장 큰 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 7 4 9", expectedOutput: "9", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "3\n-5 -1 -3", expectedOutput: "-1", label: "모두 음수" },
      ],
      hints: [
        "mx를 첫 번째 원소로 초기화하고, 나머지 원소와 비교하세요.",
        "for (int i = 1; i < n; i++) if (v[i] > mx) mx = v[i];",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int mx = v[0];
    for (int i = 1; i < n; i++)
        if (v[i] > mx) mx = v[i];
    cout << mx << endl;
    return 0;
}`,
      solutionExplanation: "mx를 v[0]으로 초기화합니다. 0으로 초기화하면 모두 음수일 때 틀립니다.",
      en: {
        title: "Array Maximum",
        description: `Given N integers, print the largest one.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Initialize mx to the first element, then compare with the rest.",
          "for (int i = 1; i < n; i++) if (v[i] > mx) mx = v[i];",
        ],
        solutionExplanation: "Initialize mx to v[0]. Initializing to 0 would give the wrong answer when all elements are negative.",
      },
    },
    // ── push_back / pop_back ──────────────────────────────────────
    {
      id: "arr-PB01",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "조건부 추가/삭제 (push_back · pop_back)",
      description: `N개의 정수를 순서대로 처리하세요. **push_back과 pop_back을 반드시 사용하세요.**

- 양수이면 벡터에 **push_back**으로 추가
- 음수이면 벡터가 비어있지 않을 때 **pop_back**으로 마지막 원소 제거

최종 벡터의 원소를 공백으로 구분해 출력하세요. (비어있으면 빈 줄 출력)

**예시:** 입력 \`3 5 -1 2 -1 -1 4\` → \`4\` (3 추가→5 추가→5제거→2 추가→2제거→3제거→4 추가)`,
      constraints: "1 ≤ N ≤ 20, -100 ≤ 각 수 ≤ 100 (0 제외)",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > 0) {
            // push_back 사용
        } else {
            // pop_back 사용 (비어있지 않을 때만)
        }
    }
    for (int i = 0; i < (int)v.size(); i++) {
        if (i) cout << " ";
        cout << v[i];
    }
    cout << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "7\n3 5 -1 2 -1 -1 4", expectedOutput: "4", label: "기본" },
        { stdin: "3\n1 2 3", expectedOutput: "1 2 3", label: "모두 추가" },
        { stdin: "4\n-1 5 -1 -1", expectedOutput: "", label: "빈 벡터" },
        { stdin: "5\n10 20 -1 30 -1", expectedOutput: "10", label: "교차" },
      ],
      hints: [
        "v.push_back(x)는 벡터 끝에 x를 추가합니다.",
        "v.pop_back()은 벡터 마지막 원소를 제거합니다. v.empty()로 비어있는지 먼저 확인하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > 0) v.push_back(x);
        else if (!v.empty()) v.pop_back();
    }
    for (int i = 0; i < (int)v.size(); i++) {
        if (i) cout << " ";
        cout << v[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "push_back(x)는 벡터 끝에 추가, pop_back()은 끝 원소 제거입니다. pop_back 전에 empty() 확인이 필수 — 빈 벡터에서 호출하면 undefined behavior입니다.",
      en: {
        title: "Conditional Add/Remove (push_back · pop_back)",
        description: `Process N integers in order. **You must use push_back and pop_back.**\n\n- Positive: **push_back** to add to the vector\n- Negative: **pop_back** to remove the last element (if non-empty)\n\nPrint the final vector elements separated by spaces (empty line if empty).\n\n**Example:** Input \`3 5 -1 2 -1 -1 4\` → \`4\``,
        constraints: "1 ≤ N ≤ 20, -100 ≤ each value ≤ 100 (no zeros)",
        hints: [
          "v.push_back(x) adds x to the end of the vector.",
          "v.pop_back() removes the last element. Check v.empty() first to avoid undefined behavior.",
        ],
        solutionExplanation: "push_back(x) adds to the end, pop_back() removes the last element. Always check empty() before pop_back — calling it on an empty vector is undefined behavior.",
      },
    },
    {
      id: "arr-002",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "배열 합계와 평균",
      description: `N개의 정수가 주어질 때, 합계와 평균(소수점 버림)을 출력하세요.

- 첫 번째 줄: 합계
- 두 번째 줄: 평균 (소수점 이하 버림)`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n10 20 30 40", expectedOutput: "100\n25", label: "기본" },
        { stdin: "3\n1 2 3", expectedOutput: "6\n2", label: "정수 평균" },
        { stdin: "3\n1 2 4", expectedOutput: "7\n2", label: "소수점 버림" },
      ],
      hints: [
        "합계는 반복문으로 누적합을 구하세요.",
        "정수 나눗셈 sum / n은 자동으로 소수점이 버려집니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int sum = 0;
    for (int x : v) sum += x;
    cout << sum << "\n";
    cout << sum / n << "\n";
    return 0;
}`,
      solutionExplanation: "합계를 구한 후 sum / n으로 평균을 계산합니다. int끼리의 나눗셈은 소수점 이하가 자동으로 버려집니다.",
      en: {
        title: "Array Sum and Average",
        description: `Given N integers, print the sum on the first line and the average (truncated toward zero) on the second line.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ each element ≤ 1000",
        hints: [
          "Use a loop to accumulate the sum.",
          "Integer division sum / n automatically truncates the decimal part.",
        ],
        solutionExplanation: "After computing the sum, calculate the average as sum / n. Integer division between two ints automatically discards the fractional part.",
      },
    },
    {
      id: "arr-003",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "역순 출력",
      description: `N개의 정수가 주어질 때, 역순으로 출력하세요. 각 수는 공백으로 구분합니다.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "3\n10 20 30", expectedOutput: "30 20 10", label: "3개" },
      ],
      hints: [
        "인덱스를 n-1부터 0까지 역순으로 순회하세요.",
        "마지막 원소 뒤에 공백이 오지 않도록 주의하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    for (int i = n - 1; i >= 0; i--) {
        if (i < n - 1) cout << ' ';
        cout << v[i];
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "i를 n-1부터 0까지 감소시킵니다. 첫 출력 전에는 공백을 출력하지 않도록 조건을 추가합니다.",
      en: {
        title: "Print in Reverse",
        description: `Given N integers, print them in reverse order separated by spaces.`,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "Iterate from index n-1 down to 0.",
          "Be careful not to print a trailing space after the last element.",
        ],
        solutionExplanation: "Decrease i from n-1 to 0. Add a condition to avoid printing a space before the first output.",
      },
    },
    {
      id: "arr-004",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "두 번째로 큰 수",
      description: `N개의 서로 다른 정수가 주어질 때, 두 번째로 큰 수를 출력하세요.`,
      constraints: "2 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000, 모든 원소는 서로 다름",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 7 4 9", expectedOutput: "7", label: "기본" },
        { stdin: "2\n5 3", expectedOutput: "3", label: "원소 2개" },
        { stdin: "4\n-5 -1 -3 -2", expectedOutput: "-2", label: "음수" },
      ],
      hints: [
        "최댓값과 두 번째 최댓값을 각각 변수로 관리하세요.",
        "새 원소가 최댓값보다 크면 최댓값을 second로 내리고 새 값을 최댓값으로, 최댓값보다 작고 second보다 크면 second를 업데이트.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int first = -1001, second = -1001;
    for (int x : v) {
        if (x > first) { second = first; first = x; }
        else if (x > second) second = x;
    }
    cout << second << endl;
    return 0;
}`,
      solutionExplanation: "first와 second를 동시에 관리합니다. 새 값이 first보다 크면 first를 second로 내립니다.",
      en: {
        title: "Second Largest",
        description: `Given N distinct integers, print the second largest.`,
        constraints: "2 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000, all elements are distinct",
        hints: [
          "Track both the maximum and the second maximum with separate variables.",
          "When a new element exceeds the max, demote the current max to second and set the new value as max. If it is less than max but greater than second, update second.",
        ],
        solutionExplanation: "Maintain first and second simultaneously. When a new value exceeds first, demote first to second.",
      },
    },
    {
      id: "arr-005",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "특정 합 쌍 개수",
      description: `N개의 정수와 목표값 T가 주어질 때, 합이 T가 되는 쌍 (i, j)의 수를 출력하세요. (i < j)`,
      constraints: "2 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000, -2000 ≤ T ≤ 2000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 7\n1 3 4 6 3", expectedOutput: "3", label: "기본 (1+6, 3+4, 4+3)" },
        { stdin: "4 10\n5 5 5 5", expectedOutput: "6", label: "중복 원소" },
        { stdin: "3 100\n1 2 3", expectedOutput: "0", label: "없는 경우" },
      ],
      hints: [
        "모든 i < j 쌍을 이중 루프로 확인하세요.",
        "for(i=0..n-1) for(j=i+1..n-1) if(v[i]+v[j]==t) count++;",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int count = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (v[i] + v[j] == t) count++;
    cout << count << endl;
    return 0;
}`,
      solutionExplanation: "j=i+1부터 시작해 i < j 조건을 자동으로 만족시킵니다. O(N²) 브루트포스 접근입니다.",
      en: {
        title: "Count Pairs with Target Sum",
        description: `Given N integers and a target T, count the number of pairs (i, j) with i < j whose sum equals T.`,
        constraints: "2 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000, -2000 ≤ T ≤ 2000",
        hints: [
          "Check all pairs (i, j) with i < j using a double loop.",
          "for(i=0..n-1) for(j=i+1..n-1) if(v[i]+v[j]==t) count++;",
        ],
        solutionExplanation: "Starting j from i+1 automatically satisfies the i < j condition. This is an O(N²) brute-force approach.",
      },
    },
    {
      id: "arr-006",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "배열 최솟값",
      description: `N개의 정수가 주어질 때, 가장 작은 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 7 4 9", expectedOutput: "1", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "3\n-5 -1 -3", expectedOutput: "-5", label: "모두 음수" },
      ],
      hints: [
        "mn을 첫 번째 원소로 초기화하고, 나머지 원소와 비교하세요.",
        "for (int i = 1; i < n; i++) if (v[i] < mn) mn = v[i];",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int mn = v[0];
    for (int i = 1; i < n; i++)
        if (v[i] < mn) mn = v[i];
    cout << mn << endl;
    return 0;
}`,
      solutionExplanation: "mn을 v[0]으로 초기화합니다. 1001이나 INT_MAX로 초기화하면 음수를 처리 못할 수 있어요.",
      en: {
        title: "Array Minimum",
        description: `Given N integers, print the smallest one.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Initialize mn to the first element, then compare with the rest.",
          "for (int i = 1; i < n; i++) if (v[i] < mn) mn = v[i];",
        ],
        solutionExplanation: "Initialize mn to v[0]. Initializing to 1001 or INT_MAX may fail to handle negative numbers correctly.",
      },
    },
    {
      id: "arr-007",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "특정 값 개수",
      description: `N개의 정수와 목표값 K가 주어질 때, 배열에서 K가 몇 번 등장하는지 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소, K ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 3\n1 3 3 2 3", expectedOutput: "3", label: "3번 등장" },
        { stdin: "4 7\n1 2 3 4", expectedOutput: "0", label: "없는 경우" },
        { stdin: "3 5\n5 5 5", expectedOutput: "3", label: "모두 K" },
      ],
      hints: [
        "v[i] == k이면 count를 증가시킵니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int cnt = 0;
    for (int x : v)
        if (x == k) cnt++;
    cout << cnt << endl;
    return 0;
}`,
      solutionExplanation: "range-for로 순회하며 k와 같은 원소를 셉니다.",
      en: {
        title: "Count Occurrences",
        description: `Given N integers and a target value K, print how many times K appears in the array.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element, K ≤ 1000",
        hints: [
          "Increment a counter whenever v[i] == k.",
        ],
        solutionExplanation: "Iterate with a range-for loop and count elements equal to k.",
      },
    },
    {
      id: "arr-008",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "배열 원소 두 배",
      description: `N개의 정수가 주어질 때, 각 원소를 2배로 만들어 공백으로 구분하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -500 ≤ 각 원소 ≤ 500",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "2 4 6 8", label: "기본" },
        { stdin: "3\n-1 0 5", expectedOutput: "-2 0 10", label: "음수/0 포함" },
        { stdin: "1\n7", expectedOutput: "14", label: "원소 1개" },
      ],
      hints: [
        "각 원소에 2를 곱해서 출력합니다. 마지막 원소 뒤에 공백이 없어야 합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i] * 2;
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "첫 원소 전에만 공백을 출력하지 않으면 됩니다. i > 0 조건으로 제어합니다.",
      en: {
        title: "Double Each Element",
        description: `Given N integers, print each element multiplied by 2, separated by spaces.`,
        constraints: "1 ≤ N ≤ 100, -500 ≤ each element ≤ 500",
        hints: [
          "Multiply each element by 2 when printing. Make sure there is no trailing space after the last element.",
        ],
        solutionExplanation: "Only suppress the space before the very first element. Use the condition i > 0 to control spacing.",
      },
    },
    {
      id: "arr-009",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "양수/음수 개수",
      description: `N개의 정수가 주어질 때, 양수의 개수와 음수의 개수를 공백으로 구분하여 출력하세요. (0은 양수도 음수도 아닙니다)`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 -2 0 3 -4", expectedOutput: "2 2", label: "기본" },
        { stdin: "3\n0 0 0", expectedOutput: "0 0", label: "모두 0" },
        { stdin: "4\n1 2 3 4", expectedOutput: "4 0", label: "모두 양수" },
      ],
      hints: [
        "pos와 neg 두 카운터를 사용하세요. 0은 무시합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int pos = 0, neg = 0;
    for (int x : v) {
        if (x > 0) pos++;
        else if (x < 0) neg++;
    }
    cout << pos << " " << neg << endl;
    return 0;
}`,
      solutionExplanation: "x > 0이면 양수, x < 0이면 음수입니다. x == 0은 두 조건에 모두 해당하지 않아 자연스럽게 무시됩니다.",
      en: {
        title: "Count Positives and Negatives",
        description: `Given N integers, print the count of positive numbers and the count of negative numbers separated by a space. (0 is neither positive nor negative.)`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Use two counters, pos and neg. Ignore 0.",
        ],
        solutionExplanation: "x > 0 means positive, x < 0 means negative. x == 0 does not match either condition and is naturally skipped.",
      },
    },
    {
      id: "arr-010",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "쉬움",
      title: "값 존재 여부",
      description: `N개의 정수와 목표값 K가 주어질 때, K가 배열에 있으면 \`YES\`, 없으면 \`NO\`를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소, K ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 3\n1 2 3 4 5", expectedOutput: "YES", label: "있음" },
        { stdin: "4 7\n1 2 3 4", expectedOutput: "NO", label: "없음" },
        { stdin: "1 1\n1", expectedOutput: "YES", label: "원소 1개" },
      ],
      hints: [
        "bool found = false;로 초기화하고, v[i] == k이면 found = true; break;",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    bool found = false;
    for (int x : v)
        if (x == k) { found = true; break; }
    cout << (found ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation: "found를 false로 초기화하고 k를 찾으면 true로 설정 후 break로 빠져나옵니다.",
      en: {
        title: "Value Exists",
        description: `Given N integers and a target value K, print \`YES\` if K is in the array, or \`NO\` if it is not.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element, K ≤ 1000",
        hints: [
          "Initialize bool found = false; and set found = true; break; when you find v[i] == k.",
        ],
        solutionExplanation: "Initialize found to false, set it to true when k is found, then break out of the loop.",
      },
    },
    {
      id: "arr-011",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "배열 회전",
      description: `N개의 정수가 주어질 때, 배열을 오른쪽으로 1칸 회전한 결과를 출력하세요.

예) [1, 2, 3, 4, 5] → [5, 1, 2, 3, 4]`,
      constraints: "2 ≤ N ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5 1 2 3 4", label: "기본" },
        { stdin: "2\n3 7", expectedOutput: "7 3", label: "2개" },
        { stdin: "3\n10 20 30", expectedOutput: "30 10 20", label: "3개" },
      ],
      hints: [
        "마지막 원소를 임시 저장하고, 나머지 원소를 뒤로 한 칸씩 이동시킵니다.",
        "int last = v[n-1]; for (int i = n-1; i > 0; i--) v[i] = v[i-1]; v[0] = last;",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int last = v[n - 1];
    for (int i = n - 1; i > 0; i--)
        v[i] = v[i - 1];
    v[0] = last;
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "마지막 원소를 저장한 뒤 뒤에서 앞으로 한 칸씩 복사합니다. 마지막에 v[0]에 저장한 값을 넣습니다.",
      en: {
        title: "Array Rotation",
        description: `Given N integers, print the array rotated one step to the right.\n\nExample: [1, 2, 3, 4, 5] → [5, 1, 2, 3, 4]`,
        constraints: "2 ≤ N ≤ 100",
        hints: [
          "Save the last element, then shift all others one position to the right.",
          "int last = v[n-1]; for (int i = n-1; i > 0; i--) v[i] = v[i-1]; v[0] = last;",
        ],
        solutionExplanation: "Save the last element, then copy each element one step to the right from back to front. Finally, place the saved value at v[0].",
      },
    },
    {
      id: "arr-012",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "최댓값 인덱스",
      description: `N개의 정수가 주어질 때, 가장 큰 수의 인덱스(0-based)를 출력하세요. 최댓값이 여러 개이면 가장 첫 번째 인덱스를 출력합니다.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 7 4 9", expectedOutput: "4", label: "기본" },
        { stdin: "4\n5 5 3 1", expectedOutput: "0", label: "첫 번째 최대" },
        { stdin: "3\n-1 -5 -2", expectedOutput: "0", label: "모두 음수" },
      ],
      hints: [
        "최댓값과 그 인덱스를 함께 저장합니다.",
        "v[i] > mx 이면 (엄격히 크면) mx=v[i], idx=i로 업데이트합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int mx = v[0], idx = 0;
    for (int i = 1; i < n; i++)
        if (v[i] > mx) { mx = v[i]; idx = i; }
    cout << idx << endl;
    return 0;
}`,
      solutionExplanation: "엄격하게 >(크다)를 사용해 최초 발생 인덱스만 저장합니다. >=를 쓰면 마지막 발생 인덱스가 저장됩니다.",
      en: {
        title: "Index of Maximum",
        description: `Given N integers, print the 0-based index of the largest element. If the maximum appears multiple times, print the first occurrence.`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Track both the maximum value and its index.",
          "Update mx and idx only when v[i] > mx (strictly greater) to keep the first occurrence.",
        ],
        solutionExplanation: "Use strict greater-than (>) to store only the first occurrence index. Using >= would store the last occurrence.",
      },
    },
    {
      id: "arr-013",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "두 배열 원소합",
      description: `두 배열 A, B가 주어질 때 (같은 크기 N), 같은 인덱스의 원소를 더한 배열 C를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6", expectedOutput: "5 7 9", label: "기본" },
        { stdin: "2\n-1 2\n1 -2", expectedOutput: "0 0", label: "합이 0" },
        { stdin: "1\n100\n200", expectedOutput: "300", label: "원소 1개" },
      ],
      hints: [
        "c[i] = a[i] + b[i] 로 각 인덱스별 합을 구합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << a[i] + b[i];
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "별도 벡터 없이 출력 시 a[i]+b[i]를 계산합니다.",
      en: {
        title: "Element-wise Sum of Two Arrays",
        description: `Given two arrays A and B of the same size N, print the array C where C[i] = A[i] + B[i].`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Compute c[i] = a[i] + b[i] for each index.",
        ],
        solutionExplanation: "Compute a[i]+b[i] directly at output time without creating a separate result vector.",
      },
    },
    {
      id: "arr-014",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "배열 정렬 여부",
      description: `N개의 정수가 주어질 때, 배열이 오름차순으로 정렬되어 있으면 \`YES\`, 아니면 \`NO\`를 출력하세요.`,
      constraints: "2 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "YES", label: "정렬됨" },
        { stdin: "4\n1 3 2 4", expectedOutput: "NO", label: "정렬 안됨" },
        { stdin: "3\n5 5 5", expectedOutput: "YES", label: "같은 값" },
      ],
      hints: [
        "인접한 원소 중 v[i] > v[i+1]인 경우가 있으면 정렬이 안된 겁니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    bool sorted = true;
    for (int i = 0; i + 1 < n; i++)
        if (v[i] > v[i + 1]) { sorted = false; break; }
    cout << (sorted ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation: "인접 쌍을 비교합니다. 하나라도 역전이 있으면 즉시 false로 설정 후 break.",
      en: {
        title: "Is Sorted?",
        description: `Given N integers, print \`YES\` if the array is sorted in non-decreasing order, or \`NO\` otherwise.`,
        constraints: "2 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "If any adjacent pair v[i] > v[i+1] exists, the array is not sorted.",
        ],
        solutionExplanation: "Compare adjacent pairs. If any inversion is found, set false immediately and break.",
      },
    },
    {
      id: "arr-015",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "K번째로 작은 수",
      description: `N개의 정수와 K가 주어질 때, K번째로 작은 수를 출력하세요. (중복 포함, 1-indexed)
※ 이 시점에서 sort() 사용 가능: sort(v.begin(), v.end())`,
      constraints: "1 ≤ K ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 2\n3 1 7 4 9", expectedOutput: "3", label: "2번째 최솟값" },
        { stdin: "5 1\n3 1 7 4 9", expectedOutput: "1", label: "최솟값" },
        { stdin: "4 4\n4 2 3 1", expectedOutput: "4", label: "최댓값" },
      ],
      hints: [
        "배열을 정렬한 후 k-1 인덱스를 출력하세요.",
        "sort(v.begin(), v.end());",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    cout << v[k - 1] << endl;
    return 0;
}`,
      solutionExplanation: "정렬 후 인덱스 k-1을 출력합니다. 정렬 후 인덱싱은 USACO Bronze에서 매우 자주 사용되는 패턴입니다.",
      en: {
        title: "K-th Smallest",
        description: `Given N integers and K, print the K-th smallest element (1-indexed, duplicates included).\n※ You may use sort() at this point: sort(v.begin(), v.end())`,
        constraints: "1 ≤ K ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Sort the array, then output the element at index k-1.",
          "sort(v.begin(), v.end());",
        ],
        solutionExplanation: "After sorting, output v[k-1]. Sort-then-index is a very common pattern in USACO Bronze.",
      },
    },
    {
      id: "arr-016",
      cluster: "arrays",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "누적 합 (Prefix Sum)",
      description: `N개의 정수가 주어질 때, 누적 합 배열 P를 출력하세요.

P[i] = A[0] + A[1] + ... + A[i]`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "1 3 6 10 15", label: "기본" },
        { stdin: "3\n10 -3 5", expectedOutput: "10 7 12", label: "음수 포함" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
      ],
      hints: [
        "prefix[0] = v[0], prefix[i] = prefix[i-1] + v[i]",
        "또는 누적값을 변수로 관리하면서 출력할 수도 있습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += v[i];
        if (i > 0) cout << ' ';
        cout << sum;
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "누적 합을 sum 변수로 관리하며 출력합니다. 구간 합 쿼리의 기초가 되는 핵심 패턴입니다.",
      en: {
        title: "Prefix Sum",
        description: `Given N integers, print the prefix sum array P where P[i] = A[0] + A[1] + ... + A[i].`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "prefix[0] = v[0], prefix[i] = prefix[i-1] + v[i]",
          "You can also manage a running total variable and print it as you go.",
        ],
        solutionExplanation: "Track the running total in a sum variable and print it at each step. This is the core pattern for range-sum queries.",
      },
    },
    {
      id: "arr-017",
      cluster: "arrays",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "연속 구간 합 최대",
      description: `N개의 정수가 주어질 때, 연속된 부분 배열의 합 중 최댓값을 출력하세요. (최소 1개 이상 선택)`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n-2 1 -3 4 -1", expectedOutput: "4", label: "4 하나" },
        { stdin: "6\n1 2 3 -10 4 5", expectedOutput: "9", label: "4+5=9" },
        { stdin: "3\n-1 -2 -3", expectedOutput: "-1", label: "모두 음수" },
        { stdin: "4\n1 2 3 4", expectedOutput: "10", label: "전체 합" },
      ],
      hints: [
        "모든 구간 [i,j]의 합을 O(N²)으로 확인하세요. 또는 Kadane's algorithm을 사용하세요.",
        "Kadane's: cur = max(v[i], cur + v[i]); ans = max(ans, cur);",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int cur = v[0], ans = v[0];
    for (int i = 1; i < n; i++) {
        cur = max(v[i], cur + v[i]);
        ans = max(ans, cur);
    }
    cout << ans << endl;
    return 0;
}`,
      solutionExplanation: "Kadane's Algorithm: cur가 음수가 되면 현재 위치에서 새로 시작합니다. O(N)으로 최대 부분합을 구합니다.",
      en: {
        title: "Maximum Subarray Sum",
        description: `Given N integers, print the maximum sum of any contiguous subarray (at least 1 element must be selected).`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Check all intervals [i, j] in O(N²), or use Kadane's algorithm.",
          "Kadane's: cur = max(v[i], cur + v[i]); ans = max(ans, cur);",
        ],
        solutionExplanation: "Kadane's Algorithm: when cur goes negative, restart from the current position. Finds the maximum subarray sum in O(N).",
      },
    },
    {
      id: "arr-018",
      cluster: "arrays",
      unlockAfter: "cpp-9",
      difficulty: "보통",
      title: "중복 원소 확인",
      description: `N개의 정수가 주어질 때, 중복된 원소가 있으면 \`YES\`, 없으면 \`NO\`를 출력하세요.`,
      constraints: "2 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 2 5", expectedOutput: "YES", label: "2가 중복" },
        { stdin: "4\n1 2 3 4", expectedOutput: "NO", label: "중복 없음" },
        { stdin: "3\n7 7 7", expectedOutput: "YES", label: "모두 같음" },
      ],
      hints: [
        "이중 루프로 모든 쌍 (i, j), i ≠ j 를 비교하세요.",
        "또는 정렬 후 인접 원소 비교 — sort 후 v[i] == v[i+1]이면 중복.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    bool dup = false;
    for (int i = 0; i + 1 < n; i++)
        if (v[i] == v[i + 1]) { dup = true; break; }
    cout << (dup ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation: "정렬 후 인접 원소를 비교합니다. 중복이 있으면 정렬 후 반드시 이웃하게 됩니다. O(N log N)입니다.",
      en: {
        title: "Has Duplicate",
        description: `Given N integers, print \`YES\` if any element is duplicated, or \`NO\` if all elements are distinct.`,
        constraints: "2 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "Check all pairs (i, j) with i ≠ j using a double loop.",
          "Alternatively, sort then compare adjacent elements — v[i] == v[i+1] after sorting means a duplicate.",
        ],
        solutionExplanation: "After sorting, compare adjacent elements. Duplicates always end up next to each other after sorting. O(N log N).",
      },
    },
    {
      id: "arr-019",
      cluster: "arrays",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "배열 병합",
      description: `두 개의 오름차순 정렬된 배열 A(크기 N)와 B(크기 M)를 하나의 정렬된 배열로 병합하여 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 50, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 3 5\n2 4 6", expectedOutput: "1 2 3 4 5 6", label: "기본" },
        { stdin: "2 3\n1 5\n2 3 4", expectedOutput: "1 2 3 4 5", label: "크기 다름" },
        { stdin: "1 1\n3\n1", expectedOutput: "1 3", label: "각 1개" },
      ],
      hints: [
        "두 포인터 i, j를 사용합니다. a[i] ≤ b[j]이면 a[i]를 먼저 출력하고 i++.",
        "한쪽이 끝나면 나머지를 그대로 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    int i = 0, j = 0;
    bool first = true;
    while (i < n || j < m) {
        int val;
        if (i < n && (j >= m || a[i] <= b[j])) val = a[i++];
        else val = b[j++];
        if (!first) cout << ' ';
        cout << val;
        first = false;
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "두 포인터 패턴으로 두 배열을 동시에 순회합니다. 병합 정렬(Merge Sort)의 핵심 단계입니다.",
      en: {
        title: "Merge Two Sorted Arrays",
        description: `Given two sorted arrays A (size N) and B (size M), merge them into one sorted array and print it.`,
        constraints: "1 ≤ N, M ≤ 50, -1000 ≤ each element ≤ 1000",
        hints: [
          "Use two pointers i and j. If a[i] ≤ b[j], output a[i] and advance i.",
          "Once one array is exhausted, output the remaining elements of the other.",
        ],
        solutionExplanation: "Traverse both arrays simultaneously with two pointers. This is the core step of Merge Sort.",
      },
    },
    {
      id: "arr-020",
      cluster: "arrays",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "슬라이딩 윈도우 최댓값",
      description: `N개의 정수와 윈도우 크기 K가 주어질 때, 크기 K인 윈도우를 왼쪽부터 오른쪽으로 한 칸씩 이동하면서 각 윈도우의 최댓값을 출력하세요.`,
      constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "6 3\n1 3 -1 -3 5 3", expectedOutput: "3\n3\n5\n5", label: "기본" },
        { stdin: "4 1\n4 2 7 1", expectedOutput: "4\n2\n7\n1", label: "K=1" },
        { stdin: "5 5\n1 2 3 4 5", expectedOutput: "5", label: "K=N" },
        { stdin: "5 2\n3 1 4 1 5", expectedOutput: "3\n4\n4\n5", label: "K=2" },
      ],
      hints: [
        "윈도우 시작 인덱스 i는 0부터 n-k까지 이동합니다.",
        "각 윈도우 [i, i+k-1]에서 최댓값을 찾으려면 안쪽 루프를 쓰세요: for (int j = i; j < i+k; j++)",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    for (int i = 0; i <= n - k; i++) {
        int mx = v[i];
        for (int j = i + 1; j < i + k; j++)
            if (v[j] > mx) mx = v[j];
        cout << mx << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "이중 루프로 각 윈도우의 최댓값을 구합니다. 바깥 루프는 윈도우 시작 위치(0~n-k), 안쪽 루프는 윈도우 내 최댓값을 탐색합니다. USACO Bronze에서 자주 등장하는 윈도우 탐색 패턴입니다.",
      en: {
        title: "Sliding Window Maximum",
        description: `Given N integers and a window size K, slide a window of size K from left to right one step at a time and print the maximum value in each window.`,
        constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ each element ≤ 10000",
        hints: [
          "The window start index i moves from 0 to n-k.",
          "To find the maximum in each window [i, i+k-1], use an inner loop: for (int j = i; j < i+k; j++)",
        ],
        solutionExplanation: "Find the maximum in each window with a double loop. The outer loop moves the window start position (0 to n-k), and the inner loop searches for the maximum within the window. This sliding window search pattern appears frequently in USACO Bronze.",
      },
    },
  ],
}
