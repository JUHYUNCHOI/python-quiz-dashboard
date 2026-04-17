import type { PracticeCluster } from "./types"

export const sortingCluster: PracticeCluster = {
  id: "sorting",
  title: "정렬 마스터",
  emoji: "📊",
  description: "sort(), 커스텀 comparator, lambda 정렬, 정렬 후 처리",
  unlockAfter: "cpp-23",
  en: { title: "Sorting", description: "Custom sort, sort + process patterns, USACO-style ranking" },
  problems: [
    {
      id: "sort-001",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "쉬움",
      title: "오름차순 정렬",
      description: `N개의 정수가 주어질 때, 오름차순으로 정렬하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
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
        { stdin: "5\n5 3 1 4 2", expectedOutput: "1 2 3 4 5", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "4\n-3 1 -1 0", expectedOutput: "-3 -1 0 1", label: "음수 포함" },
      ],
      hints: [
        "sort(v.begin(), v.end())는 기본적으로 오름차순 정렬합니다.",
        "정렬 후 공백으로 구분하여 출력하세요.",
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
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "sort(v.begin(), v.end())는 O(N log N)으로 오름차순 정렬합니다. 비교 함수를 생략하면 기본값(less<int>)이 사용됩니다.",
      en: {
        title: "Ascending Sort",
        description: `Given N integers, sort them in ascending order and print the result.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "`sort(v.begin(), v.end())` sorts in ascending order by default.",
          "After sorting, print the elements separated by spaces.",
        ],
        solutionExplanation: "`sort(v.begin(), v.end())` runs in O(N log N) and sorts in ascending order. Omitting the comparator uses the default `less<int>`.",
      },
    },
    {
      id: "sort-002",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "쉬움",
      title: "내림차순 정렬",
      description: `N개의 정수가 주어질 때, 내림차순으로 정렬하여 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
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
        { stdin: "5\n5 3 1 4 2", expectedOutput: "5 4 3 2 1", label: "기본" },
        { stdin: "3\n-1 -5 -3", expectedOutput: "-1 -3 -5", label: "음수" },
        { stdin: "4\n10 10 5 5", expectedOutput: "10 10 5 5", label: "중복 포함" },
      ],
      hints: [
        "sort의 세 번째 인수로 greater<int>()를 전달하면 내림차순 정렬입니다.",
        "또는 정렬 후 reverse()를 호출하는 방법도 있습니다.",
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
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "greater<int>()는 a > b가 true일 때 a를 앞에 놓으므로 내림차순이 됩니다. 람다로 작성하면 [](int a, int b){ return a > b; }와 동일합니다.",
      en: {
        title: "Descending Sort",
        description: `Given N integers, sort them in descending order and print the result.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Pass `greater<int>()` as the third argument to `sort` for descending order.",
          "Alternatively, you can sort in ascending order and then call `reverse()`.",
        ],
        solutionExplanation: "`greater<int>()` places `a` before `b` when `a > b`, producing descending order. Writing it as a lambda: `[](int a, int b){ return a > b; }` is equivalent.",
      },
    },
    {
      id: "sort-003",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "쉬움",
      title: "절댓값 기준 정렬",
      description: `N개의 정수가 주어질 때, 절댓값 기준 오름차순으로 정렬하여 출력하세요.
절댓값이 같으면 음수를 먼저 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
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
        { stdin: "5\n-3 1 -1 5 -5", expectedOutput: "-1 1 -3 -5 5", label: "기본" },
        { stdin: "3\n3 -3 0", expectedOutput: "0 -3 3", label: "0 포함" },
        { stdin: "4\n10 -10 2 -2", expectedOutput: "-2 2 -10 10", label: "모두 절댓값 쌍" },
      ],
      hints: [
        "람다 comparator에서 abs(a) != abs(b)이면 abs로 비교, 같으면 a < b로 비교하세요.",
        "[](int a, int b){ return abs(a) != abs(b) ? abs(a) < abs(b) : a < b; }",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), [](int a, int b) {
        if (abs(a) != abs(b)) return abs(a) < abs(b);
        return a < b;
    });
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "람다의 반환값은 'a가 b보다 앞에 와야 하면 true'입니다. 절댓값이 다르면 절댓값으로 비교하고, 같으면 원래 값으로 비교해 음수를 앞에 놓습니다.",
      en: {
        title: "Sort by Absolute Value",
        description: `Given N integers, sort them in ascending order by absolute value. If two values have the same absolute value, the negative one comes first.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "In the lambda comparator, compare by `abs` when `abs(a) != abs(b)`, otherwise compare by original value `a < b`.",
          "`[](int a, int b){ return abs(a) != abs(b) ? abs(a) < abs(b) : a < b; }`",
        ],
        solutionExplanation: "The lambda returns `true` if `a` should come before `b`. When absolute values differ, sort by absolute value; when equal, sort by original value so negatives come first.",
      },
    },
    {
      id: "sort-004",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "문자열 길이 기준 정렬",
      description: `N개의 문자열이 주어질 때, 길이 기준 오름차순으로 정렬하여 출력하세요.
길이가 같으면 사전순으로 정렬하세요.`,
      constraints: "1 ≤ N ≤ 1000, 각 문자열은 영문 소문자, 길이 1 이상 50 이하",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\nbanana apple fig cherry", expectedOutput: "fig apple banana cherry", label: "기본" },
        { stdin: "3\ncat bat ant", expectedOutput: "ant bat cat", label: "길이 같음 — 사전순" },
        { stdin: "2\nz ab", expectedOutput: "z ab", label: "짧은 것 우선" },
      ],
      hints: [
        "람다에서 길이가 같으면 사전순(a < b)으로 비교하세요.",
        "[](const string& a, const string& b){ return a.size() != b.size() ? a.size() < b.size() : a < b; }",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        if (a.size() != b.size()) return a.size() < b.size();
        return a < b;
    });
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "다중 조건 정렬은 첫 번째 조건이 다를 때와 같을 때를 분기합니다. string의 < 연산자는 사전순 비교를 수행합니다.",
      en: {
        title: "Sort Strings by Length",
        description: `Given N strings, sort them in ascending order by length. Strings of the same length should be sorted lexicographically.`,
        constraints: "1 ≤ N ≤ 1000, each string is lowercase English letters, length 1 to 50",
        hints: [
          "In the lambda, when lengths are equal, fall back to lexicographic comparison (`a < b`).",
          "`[](const string& a, const string& b){ return a.size() != b.size() ? a.size() < b.size() : a < b; }`",
        ],
        solutionExplanation: "Multi-key sorting branches on whether the first key differs. The `<` operator on strings performs lexicographic comparison.",
      },
    },
    {
      id: "sort-005",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "pair 정렬 — 두 번째 기준 우선",
      description: `N개의 (이름, 점수) 쌍이 주어질 때, 점수 내림차순으로 정렬하여 출력하세요.
점수가 같으면 이름 알파벳 순으로 정렬하세요.`,
      constraints: "1 ≤ N ≤ 1000, 이름은 영문 소문자, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\nalice 90\nbob 85\ncharlie 90\ndave 70", expectedOutput: "alice 90\ncharlie 90\nbob 85\ndave 70", label: "기본" },
        { stdin: "2\nzoe 100\nadam 100", expectedOutput: "adam 100\nzoe 100", label: "점수 같음" },
        { stdin: "3\na 50\nb 50\nc 50", expectedOutput: "a 50\nb 50\nc 50", label: "모두 같은 점수" },
      ],
      hints: [
        "점수를 내림차순, 이름을 오름차순으로 정렬하는 comparator를 작성하세요.",
        "b.second != a.second이면 점수 비교(b.second < a.second), 같으면 이름 비교",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end(), [](const pair<string,int>& a, const pair<string,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    for (auto& [name, score] : v)
        cout << name << " " << score << "\n";
    return 0;
}`,
      solutionExplanation: "a.second > b.second는 점수가 높은 것을 앞에 놓습니다. 점수가 같으면 이름 알파벳 순(a.first < b.first)으로 결정합니다.",
      en: {
        title: "Pair Sort — Score Primary Key",
        description: `Given N (name, score) pairs, sort them by score in descending order. If scores are equal, sort by name alphabetically.`,
        constraints: "1 ≤ N ≤ 1000, names are lowercase English letters, 0 ≤ score ≤ 100",
        hints: [
          "Write a comparator that sorts by score descending, then by name ascending.",
          "If `a.second != b.second`, compare scores (`a.second > b.second`); otherwise compare names.",
        ],
        solutionExplanation: "`a.second > b.second` places higher scores first. When scores tie, `a.first < b.first` resolves by alphabetical name order.",
      },
    },
    {
      id: "sort-006",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "정렬 후 K번째 수",
      description: `N개의 정수가 주어질 때, 정렬했을 때 K번째로 작은 수를 출력하세요. (1-based)`,
      constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
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
        { stdin: "5 3\n5 3 1 4 2", expectedOutput: "3", label: "기본" },
        { stdin: "5 1\n5 3 1 4 2", expectedOutput: "1", label: "최솟값" },
        { stdin: "5 5\n5 3 1 4 2", expectedOutput: "5", label: "최댓값" },
        { stdin: "3 2\n7 7 7", expectedOutput: "7", label: "중복" },
      ],
      hints: [
        "오름차순 정렬 후 인덱스 K-1의 원소를 출력하세요.",
        "K는 1-based이므로, 0-based 인덱스로 변환하면 v[K-1]입니다.",
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
    cout << v[k - 1] << "\n";
    return 0;
}`,
      solutionExplanation: "정렬 후 v[K-1]이 K번째로 작은 수입니다. nth_element()로 O(N) 시간에 구할 수도 있지만, sort + 인덱스가 더 직관적입니다.",
      en: {
        title: "K-th Smallest After Sorting",
        description: `Given N integers, find and print the K-th smallest value after sorting. (1-based index)`,
        constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Sort in ascending order and access the element at index K-1.",
          "K is 1-based, so the 0-based index is `v[K-1]`.",
        ],
        solutionExplanation: "After sorting, `v[K-1]` is the K-th smallest element. `nth_element()` can find it in O(N), but sort + index is more intuitive.",
      },
    },
    {
      id: "sort-007",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "중복 제거 후 정렬 (벡터)",
      description: `N개의 정수가 주어질 때, 중복을 제거하고 오름차순으로 정렬한 뒤, 서로 다른 수의 개수와 그 수들을 출력하세요.

- 첫 번째 줄: 서로 다른 수의 개수
- 두 번째 줄: 수들 (공백 구분)`,
      constraints: "1 ≤ N ≤ 10000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
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
        { stdin: "6\n3 1 4 1 5 3", expectedOutput: "4\n1 3 4 5", label: "기본" },
        { stdin: "4\n2 2 2 2", expectedOutput: "1\n2", label: "전부 같음" },
        { stdin: "3\n3 2 1", expectedOutput: "3\n1 2 3", label: "중복 없음" },
      ],
      hints: [
        "sort 후 unique()를 사용하면 중복을 제거할 수 있습니다.",
        "unique()는 중복 원소를 뒤로 옮기고 '새 끝' 반복자를 반환합니다. erase()로 뒷부분을 삭제하세요.",
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
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size() << "\n";
    for (int i = 0; i < (int)v.size(); i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "sort → unique → erase 패턴은 벡터에서 중복을 제거하는 관용적 방법입니다. unique()는 정렬된 상태에서만 정확히 동작합니다.",
      en: {
        title: "Remove Duplicates Then Sort (Vector)",
        description: `Given N integers, remove duplicates, sort in ascending order, then output the count of distinct values and the values themselves.

- First line: count of distinct values
- Second line: the values (space-separated)`,
        constraints: "1 ≤ N ≤ 10000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "After sorting, use `unique()` to remove duplicates.",
          "`unique()` moves duplicates to the back and returns an iterator to the new end. Use `erase()` to trim the vector.",
        ],
        solutionExplanation: "The sort → unique → erase pattern is the idiomatic way to deduplicate a vector. `unique()` only works correctly on a sorted container.",
      },
    },
    {
      id: "sort-008",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "나이 순 명단 정렬",
      description: `N명의 (이름, 나이) 정보가 주어질 때, 나이 오름차순으로 정렬하여 출력하세요.
나이가 같으면 입력 순서를 유지하세요. (stable sort)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 나이 ≤ 100, 이름은 영문 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\nalice 30\nbob 20\ncharlie 20\ndave 25", expectedOutput: "bob 20\ncharlie 20\ndave 25\nalice 30", label: "나이 같을 때 순서 유지" },
        { stdin: "3\na 3\nb 1\nc 2", expectedOutput: "b 1\nc 2\na 3", label: "역순 입력" },
        { stdin: "2\nalpha 1\nbeta 1", expectedOutput: "alpha 1\nbeta 1", label: "전부 같은 나이" },
      ],
      hints: [
        "stable_sort()는 같은 키 값을 가진 원소의 상대적 순서를 유지합니다.",
        "일반 sort()는 같은 키에서 순서를 보장하지 않으므로, 이 문제에서는 stable_sort가 필요합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    stable_sort(v.begin(), v.end(), [](const pair<string,int>& a, const pair<string,int>& b) {
        return a.second < b.second;
    });
    for (auto& [name, age] : v)
        cout << name << " " << age << "\n";
    return 0;
}`,
      solutionExplanation: "stable_sort()는 sort()와 동일하지만, 비교값이 같은 원소들의 원래 순서를 보장합니다. O(N log² N) 또는 O(N log N)으로 동작합니다.",
      en: {
        title: "Roster Sort by Age",
        description: `Given N (name, age) pairs, sort by age in ascending order, preserving the original input order for ties. (stable sort)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ age ≤ 100, names are English up to 20 characters",
        hints: [
          "`stable_sort()` preserves the relative order of elements with equal keys.",
          "Regular `sort()` does not guarantee order among equal elements, so `stable_sort` is required here.",
        ],
        solutionExplanation: "`stable_sort()` behaves like `sort()` but guarantees that equal elements retain their original relative order. It runs in O(N log² N) or O(N log N).",
      },
    },
    {
      id: "sort-009",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "어려움",
      title: "구간 병합",
      description: `N개의 구간 [l, r]이 주어질 때, 겹치거나 인접한 구간을 병합하여 출력하세요.
병합된 구간의 수와 각 구간을 왼쪽 끝점 기준 오름차순으로 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ l ≤ r ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "3\n1 6\n8 10\n15 18", label: "기본" },
        { stdin: "3\n1 4\n4 5\n6 10", expectedOutput: "2\n1 5\n6 10", label: "인접 구간 병합" },
        { stdin: "2\n1 10\n2 6", expectedOutput: "1\n1 10", label: "포함 관계" },
      ],
      hints: [
        "먼저 l 기준으로 정렬하세요.",
        "현재 구간의 l이 이전 병합 구간의 r 이하이면 r을 max(r, 현재 r)로 확장합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end());
    vector<pair<int,int>> merged;
    for (auto [l, r] : v) {
        if (!merged.empty() && l <= merged.back().second)
            merged.back().second = max(merged.back().second, r);
        else
            merged.push_back({l, r});
    }
    cout << merged.size() << "\n";
    for (auto [l, r] : merged)
        cout << l << " " << r << "\n";
    return 0;
}`,
      solutionExplanation: "l 기준 정렬 후 선형 순회합니다. 현재 구간의 시작이 마지막 병합 구간 끝 이하면 겹치므로 끝을 확장합니다. 그렇지 않으면 새 구간으로 추가합니다.",
      en: {
        title: "Interval Merging",
        description: `Given N intervals [l, r], merge all overlapping or adjacent intervals and print the result. Output the count of merged intervals followed by each interval in ascending order of left endpoint.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ l ≤ r ≤ 10000",
        hints: [
          "Sort the intervals by left endpoint first.",
          "If the current interval's `l` is ≤ the last merged interval's `r`, extend `r` to `max(r, current r)`.",
        ],
        solutionExplanation: "Sort by `l`, then do a linear sweep. If the current interval overlaps or touches the last merged one, extend its right endpoint; otherwise start a new merged interval.",
      },
    },
    {
      id: "sort-010",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "어려움",
      title: "구조체 3중 기준 정렬",
      description: `N명의 학생 정보 (이름, 반 번호, 점수)가 주어질 때, 다음 기준으로 정렬하여 출력하세요.
1. 반 번호 오름차순
2. 같은 반이면 점수 내림차순
3. 점수도 같으면 이름 오름차순
출력 형식: "이름 반번호 점수" (한 줄에 하나)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 반 번호 ≤ 100, 0 ≤ 점수 ≤ 100, 이름은 영문 소문자 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요 (struct를 사용하면 편리합니다)
    return 0;
}`,
      testCases: [
        { stdin: "5\nalice 1 90\nbob 2 85\ncarol 1 80\ndave 2 85\neve 1 90", expectedOutput: "alice 1 90\neve 1 90\ncarol 1 80\nbob 2 85\ndave 2 85", label: "기본" },
        { stdin: "3\nzara 1 70\nalex 1 70\nmike 1 80", expectedOutput: "mike 1 80\nalex 1 70\nzara 1 70", label: "같은 반" },
        { stdin: "4\ndave 3 95\ncarol 1 88\nbob 2 88\nalice 1 95", expectedOutput: "alice 1 95\ncarol 1 88\nbob 2 88\ndave 3 95", label: "3개 반" },
      ],
      hints: [
        "pair는 2개 값만 담을 수 있습니다. struct를 만들어 name, cls, score를 저장하세요.",
        "comparator에서 if (a.cls != b.cls) return a.cls < b.cls; 다음 점수, 다음 이름 순으로 비교합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int cls, score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].name >> v[i].cls >> v[i].score;
    sort(v.begin(), v.end(), [](const Student& a, const Student& b) {
        if (a.cls != b.cls) return a.cls < b.cls;
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (auto& s : v)
        cout << s.name << " " << s.cls << " " << s.score << "\\n";
    return 0;
}`,
      solutionExplanation: "pair로는 3개 필드를 담을 수 없으므로 struct를 사용합니다. comparator에서 첫 번째 기준(반 오름차순)이 다르면 즉시 리턴, 같으면 두 번째 기준(점수 내림차순), 그것도 같으면 세 번째 기준(이름 오름차순)으로 비교합니다.",
      en: {
        title: "Struct Three-Key Sort",
        description: `Given N students with (name, class_number, score), sort by:
1. Class number ascending
2. Within the same class, score descending
3. On ties, name ascending
Output format: "name class_number score" (one per line)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ class_number ≤ 100, 0 ≤ score ≤ 100, names are lowercase English up to 20 characters",
        hints: [
          "A pair can only hold 2 values. Create a struct with name, cls, and score fields.",
          "In the comparator, check `a.cls != b.cls` first, then score, then name.",
        ],
        solutionExplanation: "Since a pair cannot hold 3 fields, we define a struct. The comparator checks the first key (class ascending) — if different, return immediately. Otherwise check score (descending), then name (ascending). This cascading pattern extends to any number of sort keys.",
      },
    },
    {
      id: "sort-011",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "정렬 후 중앙값",
      description: `N개의 정수가 주어질 때, 정렬 후 중앙값을 출력하세요.
N이 홀수이면 가운데 값, 짝수이면 가운데 두 값 중 작은 값을 출력합니다.`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
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
        { stdin: "5\n3 1 4 1 5", expectedOutput: "3", label: "홀수 개" },
        { stdin: "4\n3 1 4 2", expectedOutput: "2", label: "짝수 개 — 가운데 작은 값" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "6\n10 3 7 1 9 5", expectedOutput: "5", label: "짝수 6개" },
      ],
      hints: [
        "sort() 후 인덱스 (n-1)/2를 출력하면 됩니다.",
        "n=5: (5-1)/2=2 → 인덱스 2 (가운데). n=4: (4-1)/2=1 → 인덱스 1 (가운데 두 값 중 작은 쪽).",
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
    cout << v[(n - 1) / 2] << "\n";
    return 0;
}`,
      solutionExplanation: "sort() 후 인덱스 (n-1)/2가 중앙값입니다. 홀수면 정확히 중간, 짝수면 가운데 두 값 중 작은 쪽이 선택됩니다. 정렬 후 인덱싱은 USACO Bronze 단골 패턴입니다.",
      en: {
        title: "Median After Sorting",
        description: `Given N integers, sort them and print the median. If N is odd, print the middle value; if N is even, print the smaller of the two middle values.`,
        constraints: "1 ≤ N ≤ 100, -10000 ≤ each integer ≤ 10000",
        hints: [
          "After `sort()`, print the element at index `(n-1)/2`.",
          "n=5: (5-1)/2=2 → index 2 (exact middle). n=4: (4-1)/2=1 → index 1 (smaller of the two middle values).",
        ],
        solutionExplanation: "After sorting, index `(n-1)/2` gives the median. For odd N it lands exactly in the middle; for even N it picks the smaller of the two center elements. Index-after-sort is a staple USACO Bronze pattern.",
      },
    },
    {
      id: "sort-012",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "보통",
      title: "원래 인덱스 유지하며 정렬",
      description: `N개의 정수가 주어질 때, 오름차순 정렬했을 때 각 원소가 원래 몇 번째(1-based) 위치에 있었는지 출력하세요.
(값이 같은 원소가 있으면 원래 인덱스가 작은 것이 먼저 오도록 정렬)`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n5 3 1 4 2", expectedOutput: "3 5 2 4 1", label: "기본" },
        { stdin: "4\n1 2 3 4", expectedOutput: "1 2 3 4", label: "이미 정렬됨" },
        { stdin: "4\n4 3 2 1", expectedOutput: "4 3 2 1", label: "역순" },
        { stdin: "4\n3 1 3 2", expectedOutput: "2 4 1 3", label: "중복 포함" },
      ],
      hints: [
        "pair<int,int>에 {값, 원래인덱스}를 저장하고 정렬하세요.",
        "sort 후 pair의 second(원래인덱스)를 순서대로 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i].first;
        v[i].second = i + 1;  // 1-based 원래 인덱스
    }
    sort(v.begin(), v.end());  // 값 오름차순, 같으면 인덱스 오름차순 (pair 기본 비교)
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i].second;
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "pair<값, 원래인덱스>로 묶어서 정렬합니다. pair의 기본 비교는 first 우선, 같으면 second 비교이므로 값이 같을 때 원래 인덱스가 작은 것이 앞에 옵니다. USACO에서 정렬 후 원래 위치를 추적할 때 쓰는 핵심 패턴입니다.",
      en: {
        title: "Sort While Tracking Original Indices",
        description: `Given N integers, sort them in ascending order and output the original 1-based positions of the elements in sorted order. When values are equal, the element with the smaller original index comes first.`,
        constraints: "1 ≤ N ≤ 100, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Store `{value, original_index}` as a `pair<int,int>` and sort.",
          "After sorting, print `pair.second` (the original index) in order.",
        ],
        solutionExplanation: "Pack each element with its original index as a `pair<value, index>`. The default pair comparison sorts by first key, then second, so equal values are automatically ordered by original index. This is a core USACO pattern for tracking positions after sorting.",
      },
    },
    {
      id: "sort-013",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "어려움",
      title: "회의실 배정",
      description: `N개의 회의 (시작 시간, 끝 시간)가 주어질 때, 최대한 많은 회의를 배정할 수 있는 수를 출력하세요.
한 회의가 끝나는 동시에 다음 회의를 시작할 수 있습니다.`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 시작 시간 < 끝 시간 ≤ 100000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> meetings(n);
    for (int i = 0; i < n; i++) cin >> meetings[i].first >> meetings[i].second;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "6\n1 4\n3 5\n0 6\n5 7\n3 8\n5 9", expectedOutput: "2", label: "기본" },
        { stdin: "3\n1 2\n2 3\n3 4", expectedOutput: "3", label: "연속 회의" },
        { stdin: "2\n1 10\n2 5", expectedOutput: "1", label: "포함 관계" },
      ],
      hints: [
        "끝 시간 기준으로 정렬하는 것이 핵심입니다 (그리디 알고리즘).",
        "현재 회의의 시작 시간 >= 이전 선택 회의의 끝 시간이면 선택합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> meetings(n);
    for (int i = 0; i < n; i++) cin >> meetings[i].first >> meetings[i].second;
    sort(meetings.begin(), meetings.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.second != b.second) return a.second < b.second;
        return a.first < b.first;
    });
    int count = 0, end = 0;
    for (auto [s, e] : meetings) {
        if (s >= end) {
            count++;
            end = e;
        }
    }
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "활동 선택 문제의 그리디 해법: 끝 시간이 빠른 회의를 먼저 선택하면 최대 회의 수가 보장됩니다. 끝 시간이 같으면 시작 시간이 빠른 것을 우선합니다.",
      en: {
        title: "Meeting Room Scheduling",
        description: `Given N meetings with (start time, end time), find the maximum number of meetings that can be scheduled in one room. A new meeting can start exactly when the previous one ends.`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ start time < end time ≤ 100000",
        hints: [
          "The key is to sort by end time (greedy algorithm).",
          "Select a meeting if its start time is ≥ the end time of the last selected meeting.",
        ],
        solutionExplanation: "Greedy solution for the activity selection problem: always picking the meeting that ends earliest maximizes the total count. Break end-time ties by start time.",
      },
    },
    {
      id: "sort-014",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "어려움",
      title: "정렬 후 연속 구간 최대 길이",
      description: `N개의 정수가 주어질 때, 정렬 후 중복을 제거하면 연속된 정수로 이루어진 가장 긴 구간의 길이를 출력하세요.
예: [4, 2, 2, 3, 5] → 정렬+중복제거 → [2, 3, 4, 5] → 연속 4개`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
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
        { stdin: "5\n4 2 2 3 5", expectedOutput: "4", label: "기본" },
        { stdin: "4\n1 9 3 10", expectedOutput: "2", label: "9-10 연속" },
        { stdin: "6\n1 2 3 10 11 12", expectedOutput: "3", label: "두 구간" },
        { stdin: "5\n5 5 5 5 5", expectedOutput: "1", label: "전부 같음" },
        { stdin: "1\n7", expectedOutput: "1", label: "원소 1개" },
      ],
      hints: [
        "sort 후 unique로 중복을 제거하세요.",
        "인접한 두 원소가 차이가 1이면 연속입니다. 현재 구간 길이와 최대 구간 길이를 추적하세요.",
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
    v.erase(unique(v.begin(), v.end()), v.end());
    int maxLen = 1, cur = 1;
    for (int i = 1; i < (int)v.size(); i++) {
        if (v[i] == v[i-1] + 1) cur++;
        else cur = 1;
        maxLen = max(maxLen, cur);
    }
    cout << maxLen << "\\n";
    return 0;
}`,
      solutionExplanation: "정렬 + unique로 고유값만 남긴 후, 인접 원소가 1 차이면 같은 구간으로 봅니다. 선형 순회로 최대 연속 구간 길이를 추적합니다.",
      en: {
        title: "Longest Consecutive Sequence After Sort",
        description: `Given N integers, sort them, remove duplicates, then find the length of the longest run of consecutive integers.
Example: [4, 2, 2, 3, 5] → sort+dedup → [2, 3, 4, 5] → length 4`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        hints: [
          "Sort then use `unique` to remove duplicates.",
          "Two adjacent elements are consecutive if their difference is 1. Track the current run length and the maximum.",
        ],
        solutionExplanation: "After sort + unique, only distinct values remain. A linear sweep checks whether adjacent elements differ by 1; track current and max run lengths.",
      },
    },
    {
      id: "sort-015",
      cluster: "sorting",
      unlockAfter: "cpp-23",
      difficulty: "어려움",
      title: "가장 큰 수 만들기",
      description: `N개의 비음수 정수가 주어질 때, 이 수들을 이어 붙여 만들 수 있는 가장 큰 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
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
        { stdin: "4\n3 30 34 5", expectedOutput: "534330", label: "기본" },
        { stdin: "2\n10 2", expectedOutput: "210", label: "두 수" },
        { stdin: "3\n0 0 0", expectedOutput: "0", label: "전부 0" },
        { stdin: "3\n1 2 3", expectedOutput: "321", label: "단순" },
      ],
      hints: [
        "두 수 a, b를 비교할 때 to_string(a)+to_string(b) vs to_string(b)+to_string(a)를 문자열로 비교하세요.",
        "전부 0일 때 '000...' 대신 '0'을 출력해야 하는 예외 처리를 잊지 마세요.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        v[i] = to_string(x);
    }
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        return a + b > b + a;
    });
    string result;
    for (auto& s : v) result += s;
    // 앞의 0 제거 (전부 0인 경우 "0" 출력)
    size_t start = result.find_first_not_of('0');
    cout << (start == string::npos ? "0" : result.substr(start)) << "\n";
    return 0;
}`,
      solutionExplanation: "comparator a+b > b+a는 이어 붙였을 때 더 큰 문자열을 만드는 순서를 정합니다. 예: '3'+'30'='330' vs '30'+'3'='303', 330>303이므로 '3'이 앞에 옵니다.",
      en: {
        title: "Largest Number from Parts",
        description: `Given N non-negative integers, concatenate them in some order to form the largest possible number and print it.`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ each integer ≤ 1000",
        hints: [
          "When comparing two numbers `a` and `b`, compare `to_string(a)+to_string(b)` vs `to_string(b)+to_string(a)` as strings.",
          "Don't forget to handle the all-zeros edge case — output `\"0\"` instead of `\"000...\"`.",
        ],
        solutionExplanation: "The comparator `a+b > b+a` orders numbers so that concatenating them produces the largest result. Example: `'3'+'30'='330'` vs `'30'+'3'='303'`; since 330>303, `'3'` comes first.",
      },
    },
  ],
}
