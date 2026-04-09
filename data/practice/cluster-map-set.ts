import type { PracticeCluster } from "./types"

export const mapSetCluster: PracticeCluster = {
  id: "map-set",
  title: "map/set 활용",
  emoji: "🗃️",
  description: "빈도수 세기, 중복 제거, 존재 확인 패턴",
  unlockAfter: "cpp-16",
  en: { title: "Map & Set", description: "Frequency counting, duplicate removal, existence checks" },
  problems: [
    {
      id: "ms-001",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "쉬움",
      title: "단어 등장 횟수",
      description: `N개의 단어가 주어질 때, 각 단어가 몇 번 등장하는지 알파벳 순으로 출력하세요.

형식: \`단어 횟수\` (한 줄에 하나씩)`,
      constraints: "1 ≤ N ≤ 100, 각 단어는 영문 소문자, 길이 1 이상 20 이하",
      initialCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\napple banana apple cherry banana", expectedOutput: "apple 2\nbanana 2\ncherry 1", label: "기본" },
        { stdin: "3\ncat cat cat", expectedOutput: "cat 3", label: "같은 단어만" },
        { stdin: "4\nd c b a", expectedOutput: "a 1\nb 1\nc 1\nd 1", label: "알파벳 순 정렬" },
      ],
      hints: [
        "map<string, int>를 사용하면 단어별 횟수를 자동으로 알파벳 순 정렬하여 저장합니다.",
        "map을 순회할 때 pair의 first가 단어, second가 횟수입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> freq;
    string word;
    for (int i = 0; i < n; i++) {
        cin >> word;
        freq[word]++;
    }
    for (auto& [w, cnt] : freq)
        cout << w << " " << cnt << "\n";
    return 0;
}`,
      solutionExplanation: "map은 키를 자동으로 정렬하므로 별도 정렬 없이 알파벳 순으로 출력됩니다. freq[word]++는 존재하지 않는 키에 접근 시 0으로 초기화 후 증가합니다.",
      en: {
        title: "Word Frequency Count",
        description: `Given N words, print how many times each word appears, in alphabetical order.

Format: \`word count\` (one per line)`,
        constraints: "1 ≤ N ≤ 100, each word is lowercase English letters, length 1 to 20",
        hints: [
          "Use `map<string, int>` — it automatically stores keys in alphabetical order.",
          "When iterating the map, `pair.first` is the word and `pair.second` is the count.",
        ],
        solutionExplanation: "The map automatically keeps keys sorted, so no separate sort step is needed. Accessing `freq[word]++` on a missing key initializes it to 0 before incrementing.",
      },
    },
    {
      id: "ms-002",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "쉬움",
      title: "중복 제거 후 정렬",
      description: `N개의 정수가 주어질 때, 중복을 제거하고 오름차순으로 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "1 3 4 5", label: "기본" },
        { stdin: "3\n5 5 5", expectedOutput: "5", label: "전부 같음" },
        { stdin: "4\n4 3 2 1", expectedOutput: "1 2 3 4", label: "역순 입력" },
      ],
      hints: [
        "set<int>는 중복을 자동으로 제거하고 오름차순으로 정렬하여 저장합니다.",
        "set에 모두 삽입한 후 순회하면 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        cin >> x;
        s.insert(x);
    }
    bool first = true;
    for (int v : s) {
        if (!first) cout << ' ';
        cout << v;
        first = false;
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "set은 중복 없이 정렬된 상태로 원소를 관리합니다. insert()로 추가하면 자동으로 중복을 제거합니다.",
      en: {
        title: "Remove Duplicates and Sort",
        description: `Given N integers, remove duplicates and print them in ascending order.`,
        constraints: "1 ≤ N ≤ 1000, -1000 ≤ each integer ≤ 1000",
        hints: [
          "`set<int>` automatically removes duplicates and keeps elements in ascending order.",
          "Insert all elements into the set, then iterate over it.",
        ],
        solutionExplanation: "A set stores elements without duplicates in sorted order. Calling `insert()` automatically discards duplicates.",
      },
    },
    {
      id: "ms-003",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "쉬움",
      title: "존재 여부 확인",
      description: `N개의 정수로 이루어진 집합이 주어지고, Q개의 쿼리가 주어집니다.
각 쿼리에 대해 해당 정수가 집합에 있으면 \`YES\`, 없으면 \`NO\`를 출력하세요.`,
      constraints: "1 ≤ N, Q ≤ 100000, -1000000 ≤ 정수 ≤ 1000000",
      initialCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        s.insert(x);
    }
    int q;
    cin >> q;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 3 5 7 9\n3\n3\n4\n9", expectedOutput: "YES\nNO\nYES", label: "기본" },
        { stdin: "3\n10 20 30\n2\n10\n15", expectedOutput: "YES\nNO", label: "있고 없고" },
        { stdin: "1\n42\n1\n42", expectedOutput: "YES", label: "1개" },
      ],
      hints: [
        "s.count(x)는 집합에 x가 있으면 1, 없으면 0을 반환합니다.",
        "또는 s.find(x) != s.end()로도 존재 여부를 확인할 수 있어요.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        s.insert(x);
    }
    int q;
    cin >> q;
    while (q--) {
        int x; cin >> x;
        cout << (s.count(x) ? "YES" : "NO") << "\n";
    }
    return 0;
}`,
      solutionExplanation: "set의 count()는 O(log N)으로 존재 여부를 확인합니다. 선형 탐색 O(N)보다 훨씬 빠르므로 N, Q가 클 때 특히 중요합니다.",
      en: {
        title: "Existence Check",
        description: `Given a set of N integers and Q queries, for each query print \`YES\` if the integer is in the set, otherwise \`NO\`.`,
        constraints: "1 ≤ N, Q ≤ 100000, -1000000 ≤ integers ≤ 1000000",
        hints: [
          "`s.count(x)` returns 1 if x is in the set, 0 otherwise.",
          "Alternatively, `s.find(x) != s.end()` also checks existence.",
        ],
        solutionExplanation: "`set::count()` checks existence in O(log N), far faster than linear search O(N) — especially important when N and Q are large.",
      },
    },
    {
      id: "ms-004",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "보통",
      title: "가장 많이 등장한 숫자",
      description: `N개의 정수가 주어질 때, 가장 많이 등장한 숫자를 출력하세요.
빈도가 같은 숫자가 여럿이면 가장 작은 것을 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "7\n3 1 4 1 5 9 1", expectedOutput: "1", label: "명확한 최빈값" },
        { stdin: "4\n2 2 3 3", expectedOutput: "2", label: "빈도 같을 때 작은 값" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "1", label: "모두 1회 — 최솟값" },
      ],
      hints: [
        "map<int, int>로 빈도를 세고, 최대 빈도와 해당 숫자를 순회하며 찾으세요.",
        "map은 키 오름차순으로 정렬되므로, 첫 번째로 최대 빈도에 도달하는 키가 최솟값입니다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        cin >> x;
        freq[x]++;
    }
    int maxCnt = 0, ans = -1;
    for (auto& [num, cnt] : freq) {
        if (cnt > maxCnt) {
            maxCnt = cnt;
            ans = num;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
      solutionExplanation: "map은 키를 오름차순으로 순회하므로, 빈도가 같을 때 자동으로 더 작은 숫자가 먼저 처리됩니다. 엄격한 > 비교로 앞서 저장된 값을 유지합니다.",
      en: {
        title: "Most Frequent Number",
        description: `Given N integers, print the number that appears most often. If multiple numbers share the highest frequency, print the smallest one.`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ each integer ≤ 1000",
        hints: [
          "Count frequencies with `map<int, int>`, then scan for the max frequency and its associated number.",
          "Since `map` iterates keys in ascending order, the first key that reaches the max frequency is automatically the smallest.",
        ],
        solutionExplanation: "The map iterates in ascending key order, so when frequencies tie the smaller number is encountered first. The strict `>` comparison preserves the earlier (smaller) answer.",
      },
    },
    {
      id: "ms-005",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "보통",
      title: "두 배열의 공통 원소",
      description: `N개의 정수 배열 A와 M개의 정수 배열 B가 주어질 때, 두 배열 모두에 존재하는 정수를 오름차순으로 출력하세요.
공통 원소가 없으면 \`NONE\`을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 1000, 1 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> a;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        a.insert(x);
    }
    int m;
    cin >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4\n4\n3 4 5 6", expectedOutput: "3 4", label: "기본" },
        { stdin: "3\n1 2 3\n3\n4 5 6", expectedOutput: "NONE", label: "공통 없음" },
        { stdin: "3\n5 3 1\n3\n1 3 5", expectedOutput: "1 3 5", label: "전부 공통" },
      ],
      hints: [
        "A의 원소를 set에 저장하고, B의 각 원소가 set에 있는지 확인하세요.",
        "공통 원소를 set에 저장하면 중복 없이 정렬된 결과를 얻습니다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> a;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        a.insert(x);
    }
    int m;
    cin >> m;
    set<int> common;
    for (int i = 0; i < m; i++) {
        int x; cin >> x;
        if (a.count(x)) common.insert(x);
    }
    if (common.empty()) {
        cout << "NONE\n";
    } else {
        bool first = true;
        for (int v : common) {
            if (!first) cout << ' ';
            cout << v;
            first = false;
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "A를 set으로 변환해 O(log N) 검색을 활용합니다. 공통 원소를 별도 set에 저장하면 중복 제거와 정렬이 자동으로 처리됩니다.",
      en: {
        title: "Common Elements of Two Arrays",
        description: `Given integer array A of size N and integer array B of size M, print the integers that appear in both arrays in ascending order. Print \`NONE\` if there are no common elements.`,
        constraints: "1 ≤ N, M ≤ 1000, 1 ≤ each integer ≤ 10000",
        hints: [
          "Store array A in a set, then check whether each element of B exists in the set.",
          "Storing common elements in a set automatically handles deduplication and sorting.",
        ],
        solutionExplanation: "Converting A to a set enables O(log N) lookups. Storing common elements in a separate set handles deduplication and sorted order automatically.",
      },
    },
    {
      id: "ms-006",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "보통",
      title: "이름-점수 관리",
      description: `N개의 (이름, 점수) 쌍이 주어질 때, 각 이름의 최고 점수를 이름 알파벳 순으로 출력하세요.

형식: \`이름 최고점수\``,
      constraints: "1 ≤ N ≤ 100, 각 이름은 영문 소문자, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\nalice 90\nbob 70\nalice 85\nbob 95\ncharlie 80", expectedOutput: "alice 90\nbob 95\ncharlie 80", label: "기본" },
        { stdin: "3\naaa 50\naaa 60\naaa 40", expectedOutput: "aaa 60", label: "같은 이름" },
        { stdin: "2\nzoe 100\nadam 30", expectedOutput: "adam 30\nzoe 100", label: "알파벳 순 확인" },
      ],
      hints: [
        "map<string, int>를 사용하고, 기존 점수보다 높을 때만 업데이트하세요.",
        "map은 자동으로 알파벳 순 정렬하므로 별도 정렬이 필요 없습니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> best;
    string name;
    int score;
    for (int i = 0; i < n; i++) {
        cin >> name >> score;
        if (best.find(name) == best.end() || score > best[name])
            best[name] = score;
    }
    for (auto& [nm, sc] : best)
        cout << nm << " " << sc << "\n";
    return 0;
}`,
      solutionExplanation: "처음 등장하는 이름이거나 기존 점수보다 높을 때 업데이트합니다. map의 자동 정렬 특성 덕분에 출력 시 별도 정렬이 불필요합니다.",
      en: {
        title: "Name-Score Tracker",
        description: `Given N (name, score) pairs, print the best (highest) score for each name in alphabetical order.

Format: \`name best_score\``,
        constraints: "1 ≤ N ≤ 100, each name is lowercase English letters, 0 ≤ score ≤ 100",
        hints: [
          "Use `map<string, int>` and update only when the new score is higher than the stored one.",
          "The map's automatic alphabetical sorting means no extra sort is needed at output time.",
        ],
        solutionExplanation: "Update the stored score when a name is seen for the first time or when the new score is higher. The map's sorted keys eliminate the need for a separate sort step.",
      },
    },
    {
      id: "ms-007",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "두 번 이상 등장한 원소",
      description: `N개의 정수가 주어질 때, 두 번 이상 등장한 정수를 오름차순으로 한 줄에 출력하세요.
없으면 \`NONE\`을 출력하세요.`,
      constraints: "1 ≤ N ≤ 10000, 1 ≤ 각 정수 ≤ 100000",
      initialCode: `#include <iostream>
#include <map>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "6\n1 2 3 2 1 4", expectedOutput: "1 2", label: "기본" },
        { stdin: "4\n1 2 3 4", expectedOutput: "NONE", label: "모두 1회" },
        { stdin: "5\n5 5 5 5 5", expectedOutput: "5", label: "전부 같음" },
      ],
      hints: [
        "map으로 빈도를 센 후, 빈도가 2 이상인 키를 출력하세요.",
        "map의 키는 자동으로 오름차순 정렬되므로 그대로 순회하면 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        cin >> x;
        freq[x]++;
    }
    bool found = false;
    for (auto& [num, cnt] : freq) {
        if (cnt >= 2) {
            if (found) cout << ' ';
            cout << num;
            found = true;
        }
    }
    cout << (found ? "\n" : "NONE\n");
    return 0;
}`,
      solutionExplanation: "map을 순회하며 빈도가 2 이상인 키만 출력합니다. found 플래그로 NONE 처리와 공백 구분을 제어합니다.",
      en: {
        title: "Elements Appearing At Least Twice",
        description: `Given N integers, print all integers that appear two or more times, in ascending order on one line. Print \`NONE\` if no such integer exists.`,
        constraints: "1 ≤ N ≤ 10000, 1 ≤ each integer ≤ 100000",
        hints: [
          "Count frequencies with a map, then print keys whose count is ≥ 2.",
          "Map keys are automatically iterated in ascending order, so no extra sort is needed.",
        ],
        solutionExplanation: "Iterate the map and print only keys with frequency ≥ 2. The `found` flag controls the `NONE` output and space separation.",
      },
    },
    // ── unordered_map ─────────────────────────────────────────────
    {
      id: "ms-UM01",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "쉬움",
      title: "빈도수 세기 (unordered_map)",
      description: `N개의 단어를 입력받아 각 단어의 등장 횟수를 출력하세요. **unordered_map을 사용하세요.**

출력은 입력에 처음 등장한 순서대로 하세요.

**map vs unordered_map:** map은 키 순서 정렬 O(log n), unordered_map은 순서 없지만 평균 O(1)

**예시:** \`apple banana apple\` → \`apple 2\`, \`banana 1\``,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    unordered_map<string, int> freq;  // unordered_map 사용
    vector<string> order;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        // freq에 단어 카운트, order에 첫 등장 순서 기록
    }
    for (const string& w : order) {
        cout << w << " " << freq[w] << "\\n";
    }
    return 0;
}`,
      testCases: [
        { stdin: "3\napple banana apple", expectedOutput: "apple 2\nbanana 1", label: "기본" },
        { stdin: "5\na b a c b", expectedOutput: "a 2\nb 2\nc 1", label: "순서 유지" },
        { stdin: "1\nhello", expectedOutput: "hello 1", label: "단일" },
      ],
      hints: [
        "unordered_map<string, int> freq; 로 선언하고 freq[word]++ 로 카운트하세요.",
        "첫 등장 여부 확인: if (freq.count(w) == 0) order.push_back(w); 후 freq[w]++",
      ],
      solutionCode: `#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    unordered_map<string, int> freq;
    vector<string> order;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        if (freq.count(w) == 0) order.push_back(w);
        freq[w]++;
    }
    for (const string& w : order) {
        cout << w << " " << freq[w] << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "unordered_map은 해시 테이블 기반으로 평균 O(1) 조회/삽입입니다. map과 달리 키 정렬이 없어 순서를 별도로 vector에 기록합니다. freq.count(w)==0 으로 첫 등장 여부를 확인합니다.",
      en: {
        title: "Word Frequency (unordered_map)",
        description: `Given N words, count how many times each word appears. **Use unordered_map.**\n\nPrint in the order of first appearance.\n\n**map vs unordered_map:** map sorts keys O(log n), unordered_map has no order but averages O(1)\n\n**Example:** \`apple banana apple\` → \`apple 2\`, \`banana 1\``,
        constraints: "1 ≤ N ≤ 100",
        hints: [
          "Declare unordered_map<string, int> freq; and use freq[word]++ to count.",
          "Track first appearance: if (freq.count(w) == 0) order.push_back(w); before freq[w]++",
        ],
        solutionExplanation: "unordered_map is hash-table based with average O(1) lookup/insert. Unlike map, keys are not sorted, so we track order separately with a vector. freq.count(w)==0 checks first appearance.",
      },
    },
    {
      id: "ms-008",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "애너그램 그룹",
      description: `N개의 단어가 주어질 때, 같은 문자로 이루어진 단어끼리 묶어 그룹 수를 출력하세요.
(애너그램: 같은 문자들을 재배열한 단어)`,
      constraints: "1 ≤ N ≤ 1000, 각 단어는 영문 소문자, 길이 1 이상 20 이하",
      initialCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\neat tea tan nat", expectedOutput: "2", label: "eat/tea, tan/nat" },
        { stdin: "3\nabc bca cab", expectedOutput: "1", label: "전부 같은 그룹" },
        { stdin: "3\nabc def ghi", expectedOutput: "3", label: "모두 다른 그룹" },
      ],
      hints: [
        "각 단어를 알파벳 순으로 정렬한 문자열을 키로 사용하면 애너그램이 같은 키를 가집니다.",
        "map의 크기가 고유한 그룹 수입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> groups;
    string word;
    for (int i = 0; i < n; i++) {
        cin >> word;
        string key = word;
        sort(key.begin(), key.end());
        groups[key]++;
    }
    cout << groups.size() << "\n";
    return 0;
}`,
      solutionExplanation: "단어를 정렬하면 애너그램이 동일한 문자열이 됩니다. 이를 map의 키로 사용해 그룹을 자동으로 분류하고, map의 크기가 고유 그룹 수입니다.",
      en: {
        title: "Anagram Groups",
        description: `Given N words, group words made of the same letters together and print the number of groups. (Anagram: a word formed by rearranging the letters of another word)`,
        constraints: "1 ≤ N ≤ 1000, each word is lowercase English letters, length 1 to 20",
        hints: [
          "Sort each word's characters alphabetically and use it as the map key — anagrams will share the same key.",
          "The size of the map equals the number of unique groups.",
        ],
        solutionExplanation: "Sorting a word's characters produces a canonical form that is identical for all its anagrams. Using this as a map key automatically groups anagrams; the map size is the number of distinct groups.",
      },
    },
    {
      id: "ms-009",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "두 합이 K인 쌍의 수",
      description: `N개의 정수와 목표값 K가 주어질 때, 합이 K가 되는 서로 다른 쌍 (i, j)의 수를 출력하세요. (i < j)
배열에 중복 원소가 있을 수 있습니다.`,
      constraints: "1 ≤ N ≤ 100000, -100000 ≤ 각 정수, K ≤ 100000",
      initialCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 7\n1 3 4 6 3", expectedOutput: "2", label: "기본" },
        { stdin: "4 10\n5 5 5 5", expectedOutput: "6", label: "중복 원소" },
        { stdin: "3 100\n1 2 3", expectedOutput: "0", label: "쌍 없음" },
      ],
      hints: [
        "이미 본 숫자를 map에 저장하고, 현재 숫자에서 k - x가 map에 있는지 확인하세요.",
        "중복 원소가 있으므로 map<int, int>로 각 값의 등장 횟수를 관리해야 합니다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    map<int, int> seen;
    long long count = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        int need = k - x;
        if (seen.count(need))
            count += seen[need];
        seen[x]++;
    }
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "왼쪽에서 오른쪽으로 순회하면서, 현재 값의 보완값(k-x)이 이미 등장했는지 확인합니다. seen[need]는 그 값이 현재까지 등장한 횟수이므로, 이만큼의 쌍이 생깁니다.",
      en: {
        title: "Count Pairs Summing to K",
        description: `Given N integers and a target K, count the number of distinct index pairs (i, j) with i < j such that the two elements sum to K. The array may contain duplicates.`,
        constraints: "1 ≤ N ≤ 100000, -100000 ≤ each integer and K ≤ 100000",
        hints: [
          "Store previously seen numbers in a map, then for each new number check whether `k - x` is already in the map.",
          "Since duplicates exist, use `map<int, int>` to track how many times each value has appeared.",
        ],
        solutionExplanation: "Scan left to right. For each element `x`, the complement `k-x` may have appeared multiple times before — `seen[need]` gives that count, which is exactly how many new pairs are formed. Then record `x` in `seen`.",
      },
    },
    {
      id: "ms-010",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "학생 점수 통계",
      description: `N명의 학생 점수가 주어질 때, 아래 정보를 출력하세요.
- 가장 높은 점수
- 가장 낮은 점수
- 평균 점수 (소수점 둘째 자리까지)
- 중앙값 (중앙값: 정렬했을 때 가운데 값, N이 짝수면 가운데 두 값의 평균)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> scores(n);
    for (int i = 0; i < n; i++) cin >> scores[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n80 90 70 60 100", expectedOutput: "100\n60\n80.00\n80.00", label: "홀수 N" },
        { stdin: "4\n10 20 30 40", expectedOutput: "40\n10\n25.00\n25.00", label: "짝수 N" },
        { stdin: "1\n75", expectedOutput: "75\n75\n75.00\n75.00", label: "N=1" },
      ],
      hints: [
        "sort 후 첫 원소가 최솟값, 마지막 원소가 최댓값입니다.",
        "중앙값: N이 홀수면 scores[N/2], 짝수면 (scores[N/2-1] + scores[N/2]) / 2.0",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> scores(n);
    for (int i = 0; i < n; i++) cin >> scores[i];
    sort(scores.begin(), scores.end());
    int sum = 0;
    for (int s : scores) sum += s;
    double median;
    if (n % 2 == 1)
        median = scores[n / 2];
    else
        median = (scores[n / 2 - 1] + scores[n / 2]) / 2.0;
    cout << scores[n - 1] << "\n";
    cout << scores[0] << "\n";
    cout << fixed << setprecision(2) << (double)sum / n << "\n";
    cout << fixed << setprecision(2) << median << "\n";
    return 0;
}`,
      solutionExplanation: "sort 후 최댓값/최솟값은 인덱스로 직접 접근합니다. 중앙값은 N 홀수/짝수 경우를 나눠 처리합니다. 짝수 평균은 2.0으로 나눠 실수 나눗셈을 보장합니다.",
      en: {
        title: "Student Score Statistics",
        description: `Given N student scores, output the following:
- Highest score
- Lowest score
- Average score (to 2 decimal places)
- Median (middle value when sorted; if N is even, the average of the two middle values)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ score ≤ 100",
        hints: [
          "After sorting, the first element is the minimum and the last is the maximum.",
          "Median: if N is odd use `scores[N/2]`; if N is even use `(scores[N/2-1] + scores[N/2]) / 2.0`.",
        ],
        solutionExplanation: "After sorting, min and max are directly accessible by index. Median splits on odd/even N. Dividing by `2.0` ensures floating-point division for the even-N case.",
      },
    },
    {
      id: "ms-011",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "전화번호부 검색",
      description: `N개의 (이름, 전화번호) 쌍을 저장하고, Q개의 이름 쿼리에 대해 전화번호를 출력하세요.
없는 이름이면 \`NOT FOUND\`를 출력하세요.`,
      constraints: "1 ≤ N, Q ≤ 100000, 이름과 번호는 각각 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, string> phonebook;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\nalice 010-1111-2222\nbob 010-3333-4444\ncharlie 010-5555-6666\n2\nalice\ndave", expectedOutput: "010-1111-2222\nNOT FOUND", label: "기본" },
        { stdin: "1\njohn 123-456-7890\n1\njohn", expectedOutput: "123-456-7890", label: "1건 조회" },
        { stdin: "2\namy 000\nbob 111\n2\nbob\ncarol", expectedOutput: "111\nNOT FOUND", label: "없는 이름" },
      ],
      hints: [
        "map<string, string>으로 이름을 키, 전화번호를 값으로 저장하세요.",
        "조회 시 find()로 존재 여부를 확인하고, 없으면 NOT FOUND를 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, string> phonebook;
    string name, number;
    for (int i = 0; i < n; i++) {
        cin >> name >> number;
        phonebook[name] = number;
    }
    int q;
    cin >> q;
    while (q--) {
        cin >> name;
        auto it = phonebook.find(name);
        if (it == phonebook.end())
            cout << "NOT FOUND\n";
        else
            cout << it->second << "\n";
    }
    return 0;
}`,
      solutionExplanation: "map<string, string>은 이름을 O(log N)으로 검색합니다. find()는 iterator를 반환하며, end()와 같으면 없는 키입니다. it->second로 연관된 값에 접근합니다.",
      en: {
        title: "Phone Book Lookup",
        description: `Store N (name, phone number) pairs, then for each of Q name queries print the corresponding phone number. Print \`NOT FOUND\` for unknown names.`,
        constraints: "1 ≤ N, Q ≤ 100000, names and numbers are at most 20 characters each",
        hints: [
          "Use `map<string, string>` with name as key and phone number as value.",
          "Use `find()` to check existence; if it returns `end()`, print NOT FOUND.",
        ],
        solutionExplanation: "`map<string, string>` looks up names in O(log N). `find()` returns an iterator; comparing to `end()` tells you whether the key exists. Access the associated value via `it->second`.",
      },
    },
    {
      id: "ms-012",
      cluster: "map-set",
      unlockAfter: "cpp-16",
      difficulty: "어려움",
      title: "점수 분포 히스토그램",
      description: `N개의 점수(0~100)가 주어질 때, 10점 단위 구간별 학생 수를 출력하세요.

형식:
\`0-9: X명\`
\`10-19: X명\`
...
\`100: X명\``,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n5 15 25 95 100", expectedOutput: "0-9: 1명\n10-19: 1명\n20-29: 1명\n30-39: 0명\n40-49: 0명\n50-59: 0명\n60-69: 0명\n70-79: 0명\n80-89: 0명\n90-99: 1명\n100: 1명", label: "기본" },
        { stdin: "3\n100 100 100", expectedOutput: "0-9: 0명\n10-19: 0명\n20-29: 0명\n30-39: 0명\n40-49: 0명\n50-59: 0명\n60-69: 0명\n70-79: 0명\n80-89: 0명\n90-99: 0명\n100: 3명", label: "100점만" },
      ],
      hints: [
        "점수 / 10으로 구간 인덱스(0~10)를 구합니다. 100점은 인덱스 10으로 처리하세요.",
        "int bucket[11] = {}; 배열로 구간별 카운트를 관리하는 방법도 있습니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int bucket[11] = {};
    for (int i = 0; i < n; i++) {
        int s; cin >> s;
        if (s == 100) bucket[10]++;
        else bucket[s / 10]++;
    }
    for (int i = 0; i < 10; i++)
        cout << i * 10 << "-" << i * 10 + 9 << ": " << bucket[i] << "명\n";
    cout << "100: " << bucket[10] << "명\n";
    return 0;
}`,
      solutionExplanation: "int bucket[11] = {}로 0으로 초기화한 배열을 사용합니다. 점수/10이 구간 인덱스가 됩니다. 100점은 별도로 처리해 bucket[10]에 저장합니다.",
      en: {
        title: "Score Distribution Histogram",
        description: `Given N scores (0–100), print the number of students in each 10-point range.

Format:
\`0-9: X명\`
\`10-19: X명\`
...
\`100: X명\``,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ score ≤ 100",
        hints: [
          "Compute the bucket index as `score / 10` (range 0–10). Handle the score of 100 as index 10.",
          "You can manage bucket counts with a simple array: `int bucket[11] = {};`.",
        ],
        solutionExplanation: "`int bucket[11] = {}` initializes all counts to 0. `score / 10` gives the bucket index. Score 100 is handled separately and placed in `bucket[10]`.",
      },
    },
  ],
}
