import type { LessonData } from "../types"

export const cppLessonCk10Data: LessonData = {
  id: "cpp-ck10",
  title: "🔍 STL 탐색 함수 연습문제",
  emoji: "🔍",
  description: "find, count_if, accumulate 등 STL 탐색 함수를 실제로 써보는 코딩 연습.",
  chapters: [
    {
      id: "ck10-main",
      title: "STL 탐색 함수 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck10-intro",
          type: "explain" as const,
          title: "STL 탐색 함수 연습문제",
          content: `find, count_if, accumulate — USACO에서 자주 쓰는 STL 탐색 함수들을 연습해요.\n\n6문제. 막히면 힌트 써도 괜찮아요!`,
        },
        {
          id: "ck10-p1",
          type: "practice" as const,
          title: "문제 1: 원소 존재 확인 (find)",
          content: `벡터에 7이 있는지 find로 확인하고 결과를 출력하세요.\n\n**출력:** Found 또는 Not found`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    auto it = find(v.begin(), v.end(), 7);
    if (it != v.end()) {
        cout << "Found" << endl;
    } else {
        cout << "Not found" << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    // find(v.begin(), v.end(), 7)로 7 찾기
    // 결과가 v.end()면 없는 것

    return 0;
}`,
          expectedOutput: `Not found`,
          hint: "auto it = find(v.begin(), v.end(), 7); 이후 it != v.end()이면 찾은 것, == v.end()이면 없는 것입니다.",
        },
        {
          id: "ck10-p2",
          type: "practice" as const,
          title: "문제 2: 짝수 개수 세기 (count_if)",
          content: `벡터에서 짝수의 개수를 count_if로 세어 출력하세요.\n\n**출력:** 짝수 개수`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << cnt << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    // count_if와 람다로 짝수(x % 2 == 0) 개수 세기

    return 0;
}`,
          expectedOutput: `4`,
          hint: "count_if(v.begin(), v.end(), [](int x){ return x % 2 == 0; }); — 짝수이면 true를 반환하는 람다를 씁니다.",
        },
        {
          id: "ck10-p3",
          type: "practice" as const,
          title: "문제 3: 합계 구하기 (accumulate)",
          content: `accumulate로 벡터의 모든 원소 합계를 구하세요.\n\n**출력:** 합계`,
          code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int total = accumulate(v.begin(), v.end(), 0);
    cout << total << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    // accumulate(v.begin(), v.end(), 0)으로 합계 계산

    return 0;
}`,
          expectedOutput: `150`,
          hint: "accumulate(v.begin(), v.end(), 0); — 세 번째 인자 0이 초기값입니다. #include <numeric> 필요.",
        },
        {
          id: "ck10-p4",
          type: "practice" as const,
          title: "문제 4: 조건 만족 원소 찾기",
          content: `count_if로 벡터에서 10보다 큰 원소의 개수를 출력하세요.\n\n**출력:** 10 초과 원소 개수`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 12, 3, 18, 7, 25, 1, 11};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x > 10;
    });
    cout << cnt << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 12, 3, 18, 7, 25, 1, 11};
    // count_if로 10보다 큰 원소 개수 세기

    return 0;
}`,
          expectedOutput: `4`,
          hint: "count_if(v.begin(), v.end(), [](int x){ return x > 10; }); — 12, 18, 25, 11이 조건을 만족합니다.",
        },
        {
          id: "ck10-p5",
          type: "practice" as const,
          title: "문제 5: 정렬 후 이진 탐색 (binary_search)",
          content: `벡터를 정렬한 후 binary_search로 6이 있는지 확인하세요.\n\n**출력:** Yes 또는 No`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 2, 7, 1, 6, 3};
    sort(v.begin(), v.end());
    if (binary_search(v.begin(), v.end(), 6)) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 2, 7, 1, 6, 3};
    sort(v.begin(), v.end());
    // binary_search(v.begin(), v.end(), 6)으로 6 탐색

    return 0;
}`,
          expectedOutput: `Yes`,
          hint: "binary_search는 정렬된 범위에서만 동작해요. sort 후 binary_search(v.begin(), v.end(), 6)으로 탐색합니다.",
        },
        {
          id: "ck10-p6",
          type: "practice" as const,
          title: "문제 6: 최대·최소 원소 (max_element / min_element)",
          content: `max_element와 min_element로 벡터의 최대값과 최소값을 한 줄에 출력하세요.\n\n**출력:** 최대값 공백 최소값`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    int maxVal = *max_element(v.begin(), v.end());
    int minVal = *min_element(v.begin(), v.end());
    cout << maxVal << " " << minVal << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    // *max_element(v.begin(), v.end())로 최대값
    // *min_element(v.begin(), v.end())로 최소값

    return 0;
}`,
          expectedOutput: `9 1`,
          hint: "max_element는 반복자를 반환하므로 앞에 *를 붙여 실제 값을 꺼냅니다. *max_element(v.begin(), v.end())",
        },
      ],
    },
  ],
}
