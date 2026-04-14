import type { PracticeCluster } from "./types"

export const bankSortingCluster: PracticeCluster = {
  id: "bank-ds",
  title: "정렬 + 자료구조",
  emoji: "📊",
  description: "정렬과 map/set/vector 중 어떤 걸 쓸지 스스로 판단하는 연습",
  en: {
    title: "Sort + Data Structures",
    description: "Decide which tool to use — sort, map, set, or vector",
  },
  unlockAfter: "cpp-p3",
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // EASY (bank-ds-001 ~ 006)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-ds-001",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "중앙값",
      description:
        "N개의 정수가 주어진다. 이 수들의 중앙값을 출력하라. (N은 항상 홀수)",
      constraints: "1 ≤ N ≤ 1001 (홀수), -10000 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "3" },
        { stdin: "3\n100 50 1", expectedOutput: "50" },
        { stdin: "7\n7 6 5 4 3 2 1", expectedOutput: "4" },
      ],
      hints: [
        "중앙값은 오름차순으로 정렬했을 때 가운데 위치하는 값이다.",
        "N이 홀수이면 가운데 인덱스는 N/2 (0-based)이다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    cout << arr[n / 2] << endl;
    return 0;
}`,
      solutionExplanation:
        "배열을 오름차순으로 정렬하면 인덱스 N/2(정수 나눗셈)에 중앙값이 위치한다. N이 홀수이므로 정확히 가운데 원소다.",
      en: {
        title: "Median",
        description:
          "Given N integers, print their median value. (N is always odd)",
        hints: [
          "The median is the middle value when the array is sorted in ascending order.",
          "When N is odd, the middle index is N/2 (0-based integer division).",
        ],
        solutionExplanation:
          "Sort the array in ascending order. The element at index N/2 (integer division) is the median because N is odd.",
      },
    },
    {
      id: "bank-ds-002",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "K번째 작은 수",
      description:
        "N개의 정수 중에서 K번째로 작은 수를 출력하라. (1-indexed, 중복 포함)",
      constraints: "1 ≤ K ≤ N ≤ 100000, 정수 범위 제한 없음",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5 3\n3 1 4 1 5", expectedOutput: "3" },
        { stdin: "4 1\n10 5 7 2", expectedOutput: "2" },
        { stdin: "5 5\n1 2 3 4 5", expectedOutput: "5" },
      ],
      hints: [
        "정렬 후 원하는 위치의 원소를 바로 읽을 수 있다.",
        "K번째(1-indexed)는 정렬된 배열의 인덱스 K-1이다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    cout << arr[k - 1] << endl;
    return 0;
}`,
      solutionExplanation:
        "오름차순 정렬 후 인덱스 K-1의 원소가 K번째로 작은 수다. 중복 원소도 그대로 유지되므로 별도 처리 없이 정렬만 하면 된다.",
      en: {
        title: "K-th Smallest Number",
        description:
          "Given N integers, print the K-th smallest number. (1-indexed, duplicates count)",
        hints: [
          "After sorting, the desired element can be read directly by index.",
          "The K-th smallest (1-indexed) is at index K-1 in the sorted array.",
        ],
        solutionExplanation:
          "Sort the array in ascending order. The element at index K-1 is the K-th smallest. Duplicates are kept as-is, so no extra handling is needed.",
      },
    },
    {
      id: "bank-ds-003",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "중복 제거 후 오름차순",
      description:
        "N개의 정수를 입력받아 중복을 제거한 뒤 오름차순으로 한 줄에 하나씩 출력하라.",
      constraints: "1 ≤ N ≤ 100000, 0 ≤ 각 수 ≤ 1000000",
      initialCode: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "1\n3\n4\n5" },
        { stdin: "4\n2 2 2 2", expectedOutput: "2" },
        { stdin: "6\n5 3 1 3 5 1", expectedOutput: "1\n3\n5" },
      ],
      hints: [
        "중복을 자동으로 처리해 주는 자료구조가 있다.",
        "해당 자료구조는 삽입 시 자동으로 정렬도 유지한다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        s.insert(x);
    }
    for (int v : s) cout << v << "\n";
    return 0;
}`,
      solutionExplanation:
        "set<int>은 중복을 허용하지 않고 원소를 자동으로 오름차순 정렬해 저장한다. N개 숫자를 모두 삽입한 뒤 순서대로 출력하면 된다.",
      en: {
        title: "Deduplicate and Sort",
        description:
          "Given N integers, remove duplicates and print the remaining numbers in ascending order, one per line.",
        hints: [
          "There is a data structure that automatically handles duplicates.",
          "That data structure also keeps elements sorted upon insertion.",
        ],
        solutionExplanation:
          "set<int> stores elements without duplicates and maintains ascending order automatically. Insert all N numbers, then iterate over the set to print them.",
      },
    },
    {
      id: "bank-ds-004",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "가장 많이 등장한 수",
      description:
        "N개의 정수 중 가장 많이 등장한 수를 출력하라. 등장 횟수가 동일하면 더 작은 수를 출력한다.",
      constraints: "1 ≤ N ≤ 100000, 0 ≤ 각 수 ≤ 1000000",
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
        { stdin: "7\n1 2 2 3 3 3 4", expectedOutput: "3" },
        { stdin: "5\n5 5 1 1 2", expectedOutput: "1" },
        { stdin: "4\n7 7 7 7", expectedOutput: "7" },
      ],
      hints: [
        "각 수가 몇 번 등장하는지 세어야 한다.",
        "최대 빈도를 먼저 구한 뒤, 그 빈도를 가진 수 중 가장 작은 수를 찾아라.",
      ],
      solutionCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        freq[x]++;
    }
    int maxFreq = 0;
    for (auto& p : freq) maxFreq = max(maxFreq, p.second);
    for (auto& p : freq) {
        if (p.second == maxFreq) {
            cout << p.first << endl;
            break;
        }
    }
    return 0;
}`,
      solutionExplanation:
        "map<int,int>으로 각 숫자의 등장 횟수를 센다. map은 키(숫자)를 오름차순으로 유지하므로, 최대 빈도를 구한 뒤 map을 앞에서부터 순회하면 동률 중 가장 작은 수를 먼저 만난다.",
      en: {
        title: "Most Frequent Number",
        description:
          "Given N integers, print the number that appears most often. If there is a tie, print the smaller number.",
        hints: [
          "Count how many times each number appears.",
          "First find the maximum frequency, then find the smallest number with that frequency.",
        ],
        solutionExplanation:
          "Use map<int,int> to count occurrences. Since map iterates in ascending key order, find the max frequency first, then scan the map from the front to get the smallest number with that frequency.",
      },
    },
    {
      id: "bank-ds-005",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "두 그룹 평균 비교",
      description:
        "A그룹 N명과 B그룹 M명의 점수가 주어진다. 평균 점수가 더 높은 그룹을 출력하라. 동점이면 \"DRAW\"를 출력한다.",
      constraints: "1 ≤ N, M ≤ 1000, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    long long sumA = 0, sumB = 0;
    for (int i = 0; i < n; i++) { int x; cin >> x; sumA += x; }
    for (int i = 0; i < m; i++) { int x; cin >> x; sumB += x; }

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n80 90 70\n60 50 40", expectedOutput: "A" },
        { stdin: "2 2\n50 50\n50 50", expectedOutput: "DRAW" },
        { stdin: "1 2\n100\n30 80", expectedOutput: "A" },
      ],
      hints: [
        "부동소수점 나눗셈을 피하려면 분자끼리 교차 곱셈으로 비교할 수 있다.",
        "sumA/N > sumB/M 는 sumA*M > sumB*N 과 동치다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    long long sumA = 0, sumB = 0;
    for (int i = 0; i < n; i++) { int x; cin >> x; sumA += x; }
    for (int i = 0; i < m; i++) { int x; cin >> x; sumB += x; }
    if (sumA * m > sumB * n) cout << "A" << endl;
    else if (sumA * m < sumB * n) cout << "B" << endl;
    else cout << "DRAW" << endl;
    return 0;
}`,
      solutionExplanation:
        "평균을 부동소수점으로 계산하면 오차가 생길 수 있다. sumA/N 과 sumB/M 의 대소 비교는 sumA*M 과 sumB*N 의 비교로 변환하면 정수 연산만으로 정확히 처리할 수 있다.",
      en: {
        title: "Compare Two Group Averages",
        description:
          "Given scores for group A (N members) and group B (M members), print which group has the higher average. Print \"DRAW\" if they are equal.",
        hints: [
          "To avoid floating-point division, compare averages using cross-multiplication.",
          "sumA/N > sumB/M is equivalent to sumA*M > sumB*N.",
        ],
        solutionExplanation:
          "Avoid floating-point errors by converting the average comparison sumA/N vs sumB/M into the integer comparison sumA*M vs sumB*N.",
      },
    },
    {
      id: "bank-ds-006",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "성적 통계",
      description:
        "N명의 점수가 주어질 때 최고점, 최저점, 평균(소수점 둘째 자리 반올림)을 각각 한 줄씩 출력하라.",
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
        { stdin: "5\n70 80 90 60 100", expectedOutput: "100\n60\n80.00" },
        { stdin: "3\n50 50 50", expectedOutput: "50\n50\n50.00" },
        { stdin: "4\n1 2 3 4", expectedOutput: "4\n1\n2.50" },
      ],
      hints: [
        "최고점과 최저점은 STL 함수 또는 직접 비교로 구할 수 있다.",
        "평균을 소수점 둘째 자리까지 출력하려면 fixed와 setprecision(2)을 사용한다.",
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
    int hi = *max_element(scores.begin(), scores.end());
    int lo = *min_element(scores.begin(), scores.end());
    double avg = 0;
    for (int s : scores) avg += s;
    avg /= n;
    cout << hi << "\n" << lo << "\n"
         << fixed << setprecision(2) << avg << endl;
    return 0;
}`,
      solutionExplanation:
        "max_element / min_element로 최고·최저점을 구하고, 합계를 N으로 나눠 평균을 계산한다. fixed << setprecision(2)로 소수점 둘째 자리까지 출력한다.",
      en: {
        title: "Grade Statistics",
        description:
          "Given N scores, print the maximum, minimum, and average (rounded to two decimal places), each on its own line.",
        hints: [
          "Use STL functions or manual comparison to find the max and min.",
          "Use fixed and setprecision(2) to print the average to two decimal places.",
        ],
        solutionExplanation:
          "Find max and min using max_element / min_element, compute the average by summing all scores and dividing by N, then print with fixed << setprecision(2).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // MEDIUM (bank-ds-007 ~ 015)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-ds-007",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "성적표 정렬",
      description:
        "이름과 점수 N쌍이 주어진다. 점수 내림차순으로 정렬하고, 동점이면 이름 오름차순으로 정렬한 뒤 이름만 출력하라.",
      constraints: "1 ≤ N ≤ 10000, 점수는 0~100 정수, 이름은 영문 대소문자",
      initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "4\nAlice 80\nBob 90\nCarol 80\nDave 95",
          expectedOutput: "Dave\nBob\nAlice\nCarol",
        },
        {
          stdin: "3\nZara 70\nAnn 70\nMike 70",
          expectedOutput: "Ann\nMike\nZara",
        },
        { stdin: "2\nA 100\nB 50", expectedOutput: "A\nB" },
      ],
      hints: [
        "이름과 점수를 함께 저장할 수 있는 구조를 생각해 보라.",
        "sort의 비교 함수에서 점수가 같을 때 이름 비교를 추가하면 된다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> students(n);
    for (int i = 0; i < n; i++) cin >> students[i].first >> students[i].second;
    sort(students.begin(), students.end(), [](const pair<string,int>& a, const pair<string,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    for (auto& s : students) cout << s.first << "\n";
    return 0;
}`,
      solutionExplanation:
        "pair<string, int>에 (이름, 점수)를 저장하고 커스텀 비교 함수로 점수 내림차순, 동점 시 이름 오름차순으로 정렬한다.",
      en: {
        title: "Grade Sheet Sort",
        description:
          "Given N (name, score) pairs, sort by score descending; break ties alphabetically by name. Print only the names.",
        hints: [
          "Think about a structure that can store both name and score together.",
          "In the comparator, add a name comparison when scores are equal.",
        ],
        solutionExplanation:
          "Store each student as pair<string, int> and sort with a custom comparator: descending score, then ascending name for ties.",
      },
    },
    {
      id: "bank-ds-008",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "단어 빈도 Top K",
      description:
        "단어 N개가 주어질 때, 등장 횟수 상위 K개 단어를 빈도 내림차순으로 출력하라. 빈도가 동일하면 사전순(오름차순)으로 출력한다.",
      constraints: "1 ≤ K ≤ N ≤ 100000, 각 단어는 소문자 알파벳으로 구성",
      initialCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "7 2\napple\nbanana\napple\ncherry\nbanana\napple\nbanana",
          expectedOutput: "apple\nbanana",
        },
        {
          stdin: "4 2\nabc\nabc\ndef\ndef",
          expectedOutput: "abc\ndef",
        },
        { stdin: "3 1\nz\na\nz", expectedOutput: "z" },
      ],
      hints: [
        "각 단어의 등장 횟수를 먼저 기록해야 한다.",
        "빈도와 단어를 묶어서 정렬한 뒤 앞에서 K개를 출력하면 된다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    map<string, int> freq;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        freq[w]++;
    }
    vector<pair<int, string>> v;
    for (auto& p : freq) v.push_back({p.second, p.first});
    sort(v.begin(), v.end(), [](const pair<int,string>& a, const pair<int,string>& b) {
        if (a.first != b.first) return a.first > b.first;
        return a.second < b.second;
    });
    for (int i = 0; i < k; i++) cout << v[i].second << "\n";
    return 0;
}`,
      solutionExplanation:
        "map<string,int>으로 빈도를 기록한 뒤, (빈도, 단어) 쌍으로 벡터를 만들어 빈도 내림차순·동률 시 사전순으로 정렬한다. 앞에서 K개를 출력하면 된다.",
      en: {
        title: "Top K Word Frequencies",
        description:
          "Given N words, print the K most frequent words in descending frequency order. Break ties alphabetically (ascending).",
        hints: [
          "First record the count of each word.",
          "Pair each word with its frequency, sort, then output the top K.",
        ],
        solutionExplanation:
          "Count frequencies in a map<string,int>, then build a vector of (freq, word) pairs, sort by descending frequency with alphabetical tiebreak, and print the first K entries.",
      },
    },
    {
      id: "bank-ds-009",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "구간 병합",
      description:
        "N개의 구간 [시작, 끝]이 주어진다. 겹치거나 맞닿은 구간을 모두 병합한 결과를 시작 오름차순으로 출력하라.",
      constraints: "1 ≤ N ≤ 10000, 0 ≤ 시작 ≤ 끝 ≤ 10^9",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> intervals(n);
    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "4\n1 3\n2 6\n8 10\n15 18",
          expectedOutput: "1 6\n8 10\n15 18",
        },
        { stdin: "3\n1 4\n4 5\n5 8", expectedOutput: "1 8" },
        { stdin: "2\n1 10\n2 5", expectedOutput: "1 10" },
      ],
      hints: [
        "구간을 시작점 기준으로 정렬하면 겹침 여부를 순서대로 확인할 수 있다.",
        "현재 구간의 시작이 이전 병합 구간의 끝 이하이면 겹친다(끝점을 확장). 그렇지 않으면 새 구간을 추가한다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> iv(n);
    for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;
    sort(iv.begin(), iv.end());
    vector<pair<int,int>> merged;
    for (auto& seg : iv) {
        if (!merged.empty() && seg.first <= merged.back().second)
            merged.back().second = max(merged.back().second, seg.second);
        else
            merged.push_back(seg);
    }
    for (auto& seg : merged) cout << seg.first << " " << seg.second << "\n";
    return 0;
}`,
      solutionExplanation:
        "시작점 오름차순으로 정렬한 뒤 선형 스캔한다. 새 구간의 시작이 마지막으로 병합한 구간의 끝 이하이면 끝점을 max로 확장하고, 그렇지 않으면 새 구간으로 추가한다.",
      en: {
        title: "Merge Intervals",
        description:
          "Given N intervals [start, end], merge all overlapping or touching intervals and print the result in ascending order of start.",
        hints: [
          "Sorting by start lets you check overlap in linear order.",
          "If the current interval's start is ≤ the last merged interval's end, extend the end (take max). Otherwise start a new merged interval.",
        ],
        solutionExplanation:
          "Sort by start, then do a linear scan. When the new interval overlaps the last merged one, extend its end with max. Otherwise append a new interval.",
      },
    },
    {
      id: "bank-ds-010",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "학생 랭킹",
      description:
        "N명의 점수가 주어질 때, 각 학생의 등수를 입력 순서대로 공백으로 구분해 출력하라. 동점이면 같은 등수를 부여하고, 다음 등수는 동점자 수만큼 건너뛴다.",
      constraints: "1 ≤ N ≤ 10000, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
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
        { stdin: "5\n80 90 70 90 60", expectedOutput: "2 1 3 1 4" },
        { stdin: "3\n50 50 50", expectedOutput: "1 1 1" },
        { stdin: "4\n100 80 60 40", expectedOutput: "1 2 3 4" },
      ],
      hints: [
        "특정 학생의 등수는 자신보다 점수가 높은 학생 수 + 1이다.",
        "N이 최대 10000이므로 O(N²) 풀이도 통과할 수 있다. 더 빠른 방법은 정렬 후 각 점수의 등수를 미리 계산하는 것이다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> scores(n);
    for (int i = 0; i < n; i++) cin >> scores[i];
    for (int i = 0; i < n; i++) {
        int rank = 1;
        for (int j = 0; j < n; j++)
            if (scores[j] > scores[i]) rank++;
        if (i > 0) cout << " ";
        cout << rank;
    }
    cout << endl;
    return 0;
}`,
      solutionExplanation:
        "각 학생에 대해 자신보다 점수가 높은 학생 수를 세어 rank = count + 1로 구한다. N ≤ 10000이므로 O(N²)이 충분히 통과한다. 더 빠른 방법은 정렬된 배열에서 map으로 점수→등수를 미리 구성하는 것이다.",
      en: {
        title: "Student Rankings",
        description:
          "Given N scores, print each student's rank in input order, space-separated. Tied scores share the same rank, and the next rank skips accordingly.",
        hints: [
          "A student's rank equals the number of students with a strictly higher score, plus 1.",
          "With N ≤ 10000, an O(N²) approach is acceptable. A faster approach precomputes rank by sorting.",
        ],
        solutionExplanation:
          "For each student count how many others scored strictly higher; that count + 1 is their rank. O(N²) passes for N ≤ 10000.",
      },
    },
    {
      id: "bank-ds-011",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "주차 요금 계산",
      description:
        "N대의 차량 입출차 기록과 분당 요금 C원이 주어진다. 주차 시간(분) 내림차순, 동률이면 차량 번호 오름차순으로 정렬해 차량 번호와 요금을 출력하라.",
      constraints: "1 ≤ N ≤ 1000, 1 ≤ C ≤ 100, 차량 번호는 4자리 숫자(0001~9999)",
      initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n, c;
    cin >> n >> c;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "3 10\n1234 09:00 11:30\n5678 10:00 11:00\n9012 08:00 11:00",
          expectedOutput: "9012 1800\n1234 1500\n5678 600",
        },
        {
          stdin: "2 5\n0001 09:00 10:00\n0002 09:00 10:00",
          expectedOutput: "0001 300\n0002 300",
        },
        {
          stdin: "1 100\n1111 00:00 01:00",
          expectedOutput: "1111 6000",
        },
      ],
      hints: [
        "HH:MM 형식의 시간을 분 단위 정수로 변환하면 주차 시간 계산이 쉬워진다.",
        "주차 시간, 차량 번호, 요금을 묶어서 저장한 뒤 커스텀 정렬을 적용하라.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int parseTime(const string& t) {
    int h = stoi(t.substr(0, 2));
    int m = stoi(t.substr(3, 2));
    return h * 60 + m;
}

int main() {
    int n, c;
    cin >> n >> c;
    struct Car { string num; int duration; long long fee; };
    vector<Car> cars(n);
    for (int i = 0; i < n; i++) {
        string num, tin, tout;
        cin >> num >> tin >> tout;
        int dur = parseTime(tout) - parseTime(tin);
        cars[i] = {num, dur, (long long)dur * c};
    }
    sort(cars.begin(), cars.end(), [](const Car& a, const Car& b) {
        if (a.duration != b.duration) return a.duration > b.duration;
        return a.num < b.num;
    });
    for (auto& car : cars) cout << car.num << " " << car.fee << "\n";
    return 0;
}`,
      solutionExplanation:
        "HH:MM을 h*60+m으로 분 단위로 변환해 주차 시간을 계산한다. 구조체에 차량 번호·주차 시간·요금을 담고, 주차 시간 내림차순·동률 시 차량 번호 오름차순으로 정렬 후 출력한다.",
      en: {
        title: "Parking Fee Calculation",
        description:
          "Given N car entry/exit records and a per-minute fee C, sort by parking duration descending (tie: vehicle number ascending) and print the vehicle number and fee.",
        hints: [
          "Convert HH:MM to total minutes to compute parking duration easily.",
          "Store duration, vehicle number, and fee together, then apply a custom sort.",
        ],
        solutionExplanation:
          "Parse HH:MM as h*60+m. Compute duration and fee, store in a struct, then sort by descending duration with ascending vehicle number as tiebreak.",
      },
    },
    {
      id: "bank-ds-012",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "좌표 압축",
      description:
        "N개의 정수가 주어질 때, 각 수가 전체에서 몇 번째로 작은지(0-based, 중복이면 같은 순위)를 입력 순서대로 공백으로 구분해 출력하라.",
      constraints: "1 ≤ N ≤ 100000, -10^9 ≤ 각 수 ≤ 10^9",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5\n10 30 20 30 10", expectedOutput: "0 2 1 2 0" },
        { stdin: "4\n-5 0 5 -5", expectedOutput: "0 1 2 0" },
        { stdin: "3\n100 200 300", expectedOutput: "0 1 2" },
      ],
      hints: [
        "정렬 후 중복을 제거하면 각 원소의 '압축된 순위'를 알 수 있다.",
        "lower_bound로 원소가 정렬된 고유 배열에서 몇 번째 위치인지 찾을 수 있다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<int> sorted = arr;
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << (int)(lower_bound(sorted.begin(), sorted.end(), arr[i]) - sorted.begin());
    }
    cout << endl;
    return 0;
}`,
      solutionExplanation:
        "원본 배열을 복사해 정렬 후 unique로 중복을 제거한다. 각 원소에 대해 lower_bound로 정렬된 고유 배열에서의 위치(0-based)를 구하면 그것이 압축된 순위다.",
      en: {
        title: "Coordinate Compression",
        description:
          "Given N integers, print each number's 0-based rank among all distinct values (ties get the same rank), in input order, space-separated.",
        hints: [
          "Sort and deduplicate to get the mapping from value to compressed rank.",
          "Use lower_bound to find where each element falls in the sorted unique array.",
        ],
        solutionExplanation:
          "Copy, sort, and deduplicate the array. For each original element, use lower_bound to find its 0-based index in the unique sorted array — that is its compressed rank.",
      },
    },
    {
      id: "bank-ds-013",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "빈도 역순 정렬",
      description:
        "N개의 정수를 빈도 내림차순으로 정렬해 출력하라. 빈도가 같으면 더 작은 수가 먼저 온다.",
      constraints: "1 ≤ N ≤ 10000, -10000 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "7\n1 1 2 3 3 3 4", expectedOutput: "3 3 3 1 1 2 4" },
        { stdin: "5\n5 5 1 1 2", expectedOutput: "1 1 5 5 2" },
        { stdin: "4\n4 3 2 1", expectedOutput: "1 2 3 4" },
      ],
      hints: [
        "각 수의 등장 횟수를 먼저 기록하라.",
        "정렬 시 우선순위가 두 가지다: 빈도 내림차순, 그다음 값 오름차순.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    map<int, int> freq;
    for (int x : arr) freq[x]++;
    sort(arr.begin(), arr.end(), [&](int a, int b) {
        if (freq[a] != freq[b]) return freq[a] > freq[b];
        return a < b;
    });
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << arr[i];
    }
    cout << endl;
    return 0;
}`,
      solutionExplanation:
        "map으로 각 수의 빈도를 계산한 뒤, 람다를 사용해 빈도 내림차순·동률 시 값 오름차순으로 배열을 정렬한다. 원본 배열을 정렬하므로 같은 값은 자연스럽게 연속해서 출력된다.",
      en: {
        title: "Sort by Frequency",
        description:
          "Sort N integers by frequency in descending order. Break ties by value in ascending order.",
        hints: [
          "Count the frequency of each number first.",
          "The sort has two priority levels: descending frequency, then ascending value.",
        ],
        solutionExplanation:
          "Count frequencies with a map, then sort the array using a lambda that compares by descending frequency and ascending value on ties.",
      },
    },
    {
      id: "bank-ds-014",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "최빈값과 중앙값",
      description:
        "N개(홀수)의 정수가 주어질 때, 최빈값과 중앙값을 각각 한 줄씩 출력하라. 최빈값이 동률이면 더 큰 수를 출력한다.",
      constraints: "1 ≤ N ≤ 10001 (홀수), 0 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 2 3 3", expectedOutput: "3\n2" },
        { stdin: "5\n1 1 1 2 2", expectedOutput: "1\n1" },
        { stdin: "7\n3 3 3 1 1 1 2", expectedOutput: "3\n2" },
      ],
      hints: [
        "최빈값은 빈도 기록 후 최대 빈도를 가진 수들 중 가장 큰 것이다.",
        "중앙값은 정렬 후 인덱스 N/2의 원소다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    map<int,int> freq;
    for (int x : arr) freq[x]++;
    int maxFreq = 0;
    for (auto& p : freq) maxFreq = max(maxFreq, p.second);
    int mode = -1;
    for (auto& p : freq)
        if (p.second == maxFreq) mode = p.first;  // map is ordered: last = largest
    sort(arr.begin(), arr.end());
    cout << mode << "\n" << arr[n / 2] << endl;
    return 0;
}`,
      solutionExplanation:
        "map<int,int>은 키를 오름차순으로 유지하므로, 최대 빈도를 가진 모든 키 중 map을 끝까지 순회하면 마지막에 만나는 값이 가장 크다. 중앙값은 정렬 후 arr[N/2]이다.",
      en: {
        title: "Mode and Median",
        description:
          "Given N (odd) integers, print the mode and median each on its own line. If there is a tie for mode, print the larger value.",
        hints: [
          "The mode is the largest among all numbers that share the maximum frequency.",
          "The median is arr[N/2] after sorting.",
        ],
        solutionExplanation:
          "Since map iterates in ascending key order, the last key with maximum frequency is the largest. Sort the array and output arr[N/2] as the median.",
      },
    },
    {
      id: "bank-ds-015",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "애너그램 그룹",
      description:
        "N개의 단어를 애너그램끼리 같은 그룹으로 묶어 출력하라. 각 그룹 내 단어는 사전순으로 정렬하고, 그룹들은 각 그룹의 첫 번째 단어를 기준으로 사전순으로 정렬한다.",
      constraints: "1 ≤ N ≤ 10000, 각 단어 길이 ≤ 20 (소문자 알파벳)",
      initialCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "6\neat\ntea\ntan\nate\nnat\nbat",
          expectedOutput: "ate eat tea\nbat\nnat tan",
        },
        {
          stdin: "4\nabc\nbca\ncab\nxyz",
          expectedOutput: "abc bca cab\nxyz",
        },
        {
          stdin: "3\nlisten\nsilent\nenlist",
          expectedOutput: "enlist listen silent",
        },
      ],
      hints: [
        "두 단어가 애너그램인지 확인하는 간단한 방법이 있다. 단어를 정렬해 보면 어떨까?",
        "정렬된 문자열을 키로 사용하는 맵에 단어를 그룹화하면 된다.",
        "그룹화 후 각 그룹 내부를 사전순 정렬하고, 그룹들을 첫 번째 단어 기준으로 정렬한다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, vector<string>> groups;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    vector<vector<string>> result;
    for (auto& p : groups) {
        vector<string> g = p.second;
        sort(g.begin(), g.end());
        result.push_back(g);
    }
    sort(result.begin(), result.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    for (auto& g : result) {
        for (int i = 0; i < (int)g.size(); i++) {
            if (i > 0) cout << " ";
            cout << g[i];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "단어의 문자를 정렬하면 애너그램은 같은 키가 된다. map<string, vector<string>>에 키→단어 목록으로 그룹화한 뒤, 각 그룹을 사전순 정렬하고, 그룹들을 첫 번째 단어 기준으로 정렬해 출력한다.",
      en: {
        title: "Anagram Groups",
        description:
          "Group N words by anagram. Within each group, words are sorted alphabetically. Groups are sorted by their first word alphabetically.",
        hints: [
          "There is a simple way to check if two words are anagrams — try sorting the characters.",
          "Use a map keyed by the sorted characters to group words.",
          "After grouping, sort each group internally, then sort the groups by their first word.",
        ],
        solutionExplanation:
          "Sorting a word's characters produces the same key for all its anagrams. Group words in map<string, vector<string>>, sort each group alphabetically, then sort the groups by their first element.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // HARD (bank-ds-016 ~ 020)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-ds-016",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "회의실 배정",
      description:
        "N개의 회의가 시작 시간과 끝 시간으로 주어진다. 한 개의 회의실에서 겹치지 않게 진행할 수 있는 최대 회의 수를 출력하라.",
      constraints: "1 ≤ N ≤ 100000, 0 ≤ 시작 < 끝 ≤ 10^9",
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
        {
          stdin: "6\n1 4\n3 5\n0 6\n5 7\n8 9\n2 4",
          expectedOutput: "3",
        },
        { stdin: "3\n1 2\n2 3\n3 4", expectedOutput: "3" },
        { stdin: "3\n1 10\n2 3\n4 5", expectedOutput: "2" },
      ],
      hints: [
        "가능한 한 많은 회의를 배정하려면 어떤 기준으로 다음 회의를 선택해야 할까?",
        "끝 시간이 빠른 회의를 먼저 선택하면 이후 회의가 겹칠 여지가 줄어든다.",
        "끝 시간 오름차순으로 정렬 후, 이전 회의의 끝 시간 이상인 회의를 탐욕적으로 선택한다.",
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
    // sort by end time
    sort(meetings.begin(), meetings.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        return a.second < b.second;
    });
    int count = 0, lastEnd = -1;
    for (auto& m : meetings) {
        if (m.first >= lastEnd) {
            count++;
            lastEnd = m.second;
        }
    }
    cout << count << endl;
    return 0;
}`,
      solutionExplanation:
        "이 문제는 그리디 알고리즘의 대표 예제다. 끝 시간이 빠른 회의를 먼저 배정하면 최적 해를 보장한다. 끝 시간 오름차순으로 정렬 후, 현재 회의의 시작 시간이 마지막으로 선택한 회의의 끝 시간 이상이면 선택한다.",
      en: {
        title: "Meeting Room Scheduling",
        description:
          "Given N meetings with start and end times, find the maximum number of non-overlapping meetings that can be held in a single room.",
        hints: [
          "To fit as many meetings as possible, what criterion should be used to pick the next meeting?",
          "Choosing the meeting that ends earliest leaves the most room for future meetings.",
          "Sort by end time ascending, then greedily pick any meeting whose start time is ≥ the last selected end time.",
        ],
        solutionExplanation:
          "Classic greedy interval scheduling. Sort by end time; greedily pick a meeting when its start ≥ lastEnd, then update lastEnd. This always yields the maximum count.",
      },
    },
    {
      id: "bank-ds-017",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "동시 탑승 최대 인원",
      description:
        "버스에 N명이 탑승한다. 각 승객의 탑승 시간과 하차 시간이 주어질 때, 버스에 동시에 탑승한 최대 인원을 출력하라. (탑승 시간 = 하차 시간인 승객은 겹치지 않는 것으로 본다)",
      constraints: "1 ≤ N ≤ 100000, 0 ≤ 탑승 시간 < 하차 시간 ≤ 10^9",
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
        { stdin: "3\n1 5\n2 4\n3 6", expectedOutput: "3" },
        { stdin: "3\n1 3\n3 5\n5 7", expectedOutput: "1" },
        { stdin: "4\n1 10\n2 8\n3 6\n4 9", expectedOutput: "4" },
      ],
      hints: [
        "탑승 이벤트(+1)와 하차 이벤트(-1)로 분리해 시간순으로 처리하면 어떨까?",
        "같은 시간에 하차와 탑승이 동시에 있다면 어느 쪽을 먼저 처리해야 동시 탑승자가 겹치지 않을까?",
        "이벤트 배열을 (시간, 유형) 쌍으로 만들고 정렬할 때, 같은 시간이면 하차(-1)를 탑승(+1)보다 먼저 처리하라.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> events;
    for (int i = 0; i < n; i++) {
        int a, b;
        cin >> a >> b;
        events.push_back({a, 1});   // board
        events.push_back({b, -1});  // alight
    }
    // Sort: same time → alight (-1) before board (+1)
    sort(events.begin(), events.end(), [](const pair<int,int>& x, const pair<int,int>& y) {
        if (x.first != y.first) return x.first < y.first;
        return x.second < y.second;  // -1 < 1, so alight first
    });
    int cur = 0, maxPeople = 0;
    for (auto& e : events) {
        cur += e.second;
        maxPeople = max(maxPeople, cur);
    }
    cout << maxPeople << endl;
    return 0;
}`,
      solutionExplanation:
        "스위핑(이벤트 정렬) 기법을 사용한다. 탑승을 +1, 하차를 -1 이벤트로 만들어 시간순 정렬한다. 같은 시간에는 하차(-1)를 탑승(+1)보다 먼저 처리해 '탑승=하차 시간은 겹치지 않는다' 조건을 반영한다. 스위프하면서 현재 인원의 최댓값을 추적한다.",
      en: {
        title: "Maximum Simultaneous Passengers",
        description:
          "N passengers board a bus, each with a boarding and alighting time. Find the maximum number of passengers simultaneously on the bus. (If boarding time equals alighting time, they do NOT overlap.)",
        hints: [
          "Consider splitting each ride into a board event (+1) and an alight event (-1) and processing them in time order.",
          "When boarding and alighting happen at the same time, which should be processed first to satisfy the non-overlap rule?",
          "Build (time, type) event pairs and sort so that at equal times, alighting (−1) comes before boarding (+1).",
        ],
        solutionExplanation:
          "Use an event sweep: create +1 (board) and -1 (alight) events. Sort by time; at ties, process -1 before +1 to honor the 'same time = no overlap' rule. Track the running maximum during the sweep.",
      },
    },
    {
      id: "bank-ds-018",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "점수 격차 최소 팀 배정",
      description:
        "N명의 점수가 주어진다. N명을 두 팀(각각 1명 이상)으로 나눠 두 팀 점수 합의 차이를 최소화하라. 가능한 최솟값을 출력한다.",
      constraints: "2 ≤ N ≤ 20, 1 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> scores(n);
    int total = 0;
    for (int i = 0; i < n; i++) { cin >> scores[i]; total += scores[i]; }

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "0" },
        { stdin: "3\n1 2 10", expectedOutput: "7" },
        { stdin: "5\n5 5 5 5 5", expectedOutput: "5" },
      ],
      hints: [
        "N이 최대 20이다. 모든 가능한 분할을 시도해 볼 수 있는 방법을 생각해 보라.",
        "비트마스크를 사용하면 2^N가지 부분집합을 각각 한 팀으로 간주할 수 있다.",
        "부분집합의 합과 나머지의 합의 차이를 구할 때, 양 팀이 모두 비어있지 않도록 주의한다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <climits>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> scores(n);
    int total = 0;
    for (int i = 0; i < n; i++) { cin >> scores[i]; total += scores[i]; }
    int minDiff = INT_MAX;
    for (int mask = 1; mask < (1 << n) - 1; mask++) {
        int sumA = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sumA += scores[i];
        minDiff = min(minDiff, abs(total - 2 * sumA));
    }
    cout << minDiff << endl;
    return 0;
}`,
      solutionExplanation:
        "N ≤ 20이므로 2^20 ≈ 100만 가지 부분집합을 비트마스크로 탐색한다. 마스크가 0(빈 팀)과 (1<<n)-1(전체) 인 경우는 제외하고, 각 부분집합의 합 sumA에 대해 |total - 2*sumA|를 최솟값으로 추적한다.",
      en: {
        title: "Minimize Team Score Gap",
        description:
          "Given N scores, split the N people into two non-empty teams to minimize the absolute difference of their total scores. Print the minimum possible difference.",
        hints: [
          "N ≤ 20. Think about a way to try all possible splits.",
          "Bitmask enumeration lets you treat each of the 2^N subsets as one team.",
          "For each subset, compute the score difference and track the minimum, excluding empty and full subsets.",
        ],
        solutionExplanation:
          "Enumerate all 2^N subsets with bitmask (skip 0 and all-ones). For each subset with sum sumA, the gap is |total - 2*sumA|. Track the minimum.",
      },
    },
    {
      id: "bank-ds-019",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "가중 중앙값",
      description:
        "N개의 (값, 가중치) 쌍이 주어진다. 값 오름차순으로 정렬했을 때 누적 가중치가 전체 가중치 합의 절반을 처음으로 초과하는 값을 출력하라.",
      constraints: "1 ≤ N ≤ 10000, 1 ≤ 값 ≤ 10^9, 1 ≤ 가중치 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> items(n);  // (값, 가중치)
    for (int i = 0; i < n; i++) cin >> items[i].first >> items[i].second;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 1\n2 1\n3 1\n4 1\n5 1", expectedOutput: "3" },
        { stdin: "3\n10 3\n20 1\n30 1", expectedOutput: "10" },
        { stdin: "4\n1 1\n2 2\n3 3\n4 4", expectedOutput: "3" },
      ],
      hints: [
        "값 기준 오름차순으로 정렬한 뒤 가중치를 누적하면서 전체 합의 절반을 넘는 시점을 찾는다.",
        "전체 가중치 합을 먼저 구한 다음, 누적 합이 total/2를 처음으로 초과하는 원소를 찾아라. (절반을 정확히 맞추는 것이 아니라 초과하는 것임에 주의)",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> items(n);
    long long totalW = 0;
    for (int i = 0; i < n; i++) {
        cin >> items[i].first >> items[i].second;
        totalW += items[i].second;
    }
    sort(items.begin(), items.end());
    long long cumul = 0;
    for (auto& item : items) {
        cumul += item.second;
        if (cumul * 2 > totalW) {
            cout << item.first << endl;
            return 0;
        }
    }
    return 0;
}`,
      solutionExplanation:
        "전체 가중치 합 totalW를 구한 뒤 값 오름차순으로 정렬한다. 누적 가중치 cumul이 totalW/2를 처음 초과하는(cumul*2 > totalW) 원소의 값이 가중 중앙값이다. 정수 비교를 위해 cumul*2 > totalW를 사용한다.",
      en: {
        title: "Weighted Median",
        description:
          "Given N (value, weight) pairs, find the weighted median: the smallest value such that the cumulative weight of all values up to and including it exceeds half the total weight.",
        hints: [
          "Sort by value ascending, then accumulate weights looking for when the cumulative total first exceeds half the total.",
          "Compute total weight first, then find the first element where cumulative weight exceeds total/2 (strictly greater, not equal).",
        ],
        solutionExplanation:
          "Sort by value, track cumulative weight. The first element where cumul*2 > totalW is the weighted median. Multiplying by 2 avoids floating-point division.",
      },
    },
    {
      id: "bank-ds-020",
      cluster: "bank-ds",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "리그 순위표",
      description:
        "N개 팀이 리그전(모든 팀이 서로 한 번씩 경기)을 치른다. 각 경기 결과가 주어질 때 승점 기준 순위표를 출력하라. 승=3점, 무=1점, 패=0점. 동점이면 팀 이름 사전순.",
      constraints: "3 ≤ N ≤ 20, 팀 이름은 알파벳 대문자 최대 10자, 총 N*(N-1)/2 경기",
      initialCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int games = n * (n - 1) / 2;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "3\nA 3 0 B\nA 2 1 C\nB 1 1 C",
          expectedOutput: "A 6\nB 1\nC 1",
        },
        {
          stdin: "3\nA 1 1 B\nA 1 1 C\nB 1 1 C",
          expectedOutput: "A 2\nB 2\nC 2",
        },
        {
          stdin: "3\nA 0 1 B\nA 0 2 C\nB 0 1 C",
          expectedOutput: "C 6\nB 3\nA 0",
        },
      ],
      hints: [
        "각 팀의 승점을 기록할 자료구조가 필요하다. 팀 이름이 문자열이라는 점을 활용하라.",
        "경기 결과 한 줄을 파싱할 때 '팀A 골A 골B 팀B' 형식임에 주의한다.",
        "모든 경기를 처리한 뒤 승점 내림차순, 동점이면 이름 오름차순으로 정렬한다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int games = n * (n - 1) / 2;
    map<string, int> points;
    // Initialize all teams — we'll collect from matches
    vector<string> teams;
    map<string, bool> seen;

    for (int i = 0; i < games; i++) {
        string teamA, teamB;
        int goalA, goalB;
        cin >> teamA >> goalA >> goalB >> teamB;
        if (!seen[teamA]) { seen[teamA] = true; teams.push_back(teamA); points[teamA] = 0; }
        if (!seen[teamB]) { seen[teamB] = true; teams.push_back(teamB); points[teamB] = 0; }
        if (goalA > goalB) points[teamA] += 3;
        else if (goalA < goalB) points[teamB] += 3;
        else { points[teamA] += 1; points[teamB] += 1; }
    }
    sort(teams.begin(), teams.end(), [&](const string& a, const string& b) {
        if (points[a] != points[b]) return points[a] > points[b];
        return a < b;
    });
    for (auto& t : teams) cout << t << " " << points[t] << "\n";
    return 0;
}`,
      solutionExplanation:
        "map<string,int>으로 각 팀의 승점을 관리한다. 입력 형식 '팀A 골A 골B 팀B'를 파싱해 승/무/패에 따라 승점을 부여한다. 모든 경기 처리 후 팀 목록을 승점 내림차순·동점 시 이름 오름차순으로 정렬해 출력한다.",
      en: {
        title: "League Standings",
        description:
          "N teams play a round-robin league (each pair plays once). Given all match results, print the standings sorted by points descending. Win=3pts, draw=1pt, loss=0pts. Break ties alphabetically.",
        hints: [
          "Use a data structure keyed by team name to track points.",
          "Each result line has the format: teamA goalsA goalsB teamB.",
          "After processing all matches, sort by descending points, then ascending team name for ties.",
        ],
        solutionExplanation:
          "Use map<string,int> for team points. Parse each line as 'teamA goalsA goalsB teamB', award points accordingly. Sort the team list by descending points with alphabetical tiebreak.",
      },
    },
  ],
}

export default bankSortingCluster
