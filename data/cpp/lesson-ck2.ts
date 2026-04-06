import type { LessonData } from "../types"

export const cppLessonCk2Data: LessonData = {
  id: "cpp-ck2",
  title: "📦 벡터 연습 문제",
  emoji: "📦",
  description: "벡터로 실제 문제를 풀어봅니다.",
  chapters: [
    {
      id: "ck2-main",
      title: "벡터 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck2-intro",
          type: "explain" as const,
          title: "벡터 연습 문제",
          content: `배운 벡터 개념으로 실제 문제를 풀어봅니다.\n\n총 8문제입니다. 각 문제를 직접 코딩으로 해결해보세요. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck2-p1",
          type: "practice" as const,
          title: "문제 1: 벡터의 합",
          content: `주어진 벡터의 모든 원소의 합을 구하세요.\n\n**출력:** 합계를 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1};
    int sum = 0;
    // v의 모든 원소를 sum에 더하세요

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `22`,
          hint: "for문으로 v[i]를 하나씩 sum에 더해보세요. i는 0부터 v.size()-1까지.",
        },
        {
          id: "ck2-p2",
          type: "practice" as const,
          title: "문제 2: 최대값 찾기",
          content: `주어진 벡터에서 가장 큰 값을 출력하세요.\n\n**출력:** 최대값을 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {4, 2, 8, 1, 5};
    int max_val = v[0];
    for (int i = 1; i < v.size(); i++) {
        if (v[i] > max_val) {
            max_val = v[i];
        }
    }
    cout << max_val << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {4, 2, 8, 1, 5};
    int max_val = v[0];
    // 더 큰 값을 찾으면 max_val을 갱신하세요

    cout << max_val << endl;
    return 0;
}`,
          expectedOutput: `8`,
          hint: "max_val을 v[0]으로 초기화하고, for문으로 v[i] > max_val이면 max_val = v[i]로 갱신하세요.",
        },
        {
          id: "ck2-p3",
          type: "practice" as const,
          title: "문제 3: 5보다 큰 수 출력",
          content: `벡터에서 5보다 큰 수만 출력하세요.\n\n**출력:** 조건에 맞는 수를 순서대로 한 줄씩 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1, 6};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] > 5) {
            cout << v[i] << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {3, 7, 2, 9, 1, 6};
    // 5보다 큰 수만 출력하세요

    return 0;
}`,
          expectedOutput: `7
9
6`,
          hint: "for문 안에서 if (v[i] > 5) cout << v[i] << endl; 을 사용하세요.",
        },
        {
          id: "ck2-p4",
          type: "practice" as const,
          title: "문제 4: 평균 구하기",
          content: `주어진 벡터의 평균을 구하세요.\n\n**출력:** 평균을 정수로 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum / v.size() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    int sum = 0;
    // 합을 구한 후 v.size()로 나누세요

    cout << sum / v.size() << endl;
    return 0;
}`,
          expectedOutput: `30`,
          hint: "먼저 for문으로 합을 구하고, sum / v.size()로 평균을 계산하세요.",
        },
        {
          id: "ck2-p5",
          type: "practice" as const,
          title: "문제 5: 역순 출력",
          content: `벡터의 원소를 역순으로 출력하세요.\n\n**출력:** 뒤에서부터 공백으로 구분하여 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (int i = v.size() - 1; i >= 0; i--) {
        cout << v[i];
        if (i > 0) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    // i를 v.size()-1부터 0까지 감소시키세요

    cout << endl;
    return 0;
}`,
          expectedOutput: `5 4 3 2 1`,
          hint: "i를 v.size()-1부터 0까지 감소시키며 v[i]를 출력하세요. 원소 사이에 공백을 넣으세요.",
        },
        {
          id: "ck2-p6",
          type: "practice" as const,
          title: "문제 6: 짝수만 출력",
          content: `벡터에서 짝수만 출력하세요.\n\n**출력:** 짝수를 순서대로 한 줄씩 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] % 2 == 0) {
            cout << v[i] << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
    // 짝수만 출력하세요

    return 0;
}`,
          expectedOutput: `2
4
6
8`,
          hint: "v[i] % 2 == 0 이면 짝수입니다. 조건이 참일 때만 출력하세요.",
        },
        {
          id: "ck2-p7",
          type: "practice" as const,
          title: "문제 7: 조건 만족하는 개수",
          content: `벡터에서 3보다 큰 수의 개수를 출력하세요.\n\n**출력:** 개수를 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 5, 2, 7, 3, 8};
    int count = 0;
    for (int i = 0; i < v.size(); i++) {
        if (v[i] > 3) {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 5, 2, 7, 3, 8};
    int count = 0;
    // 3보다 큰 수의 개수를 세세요

    cout << count << endl;
    return 0;
}`,
          expectedOutput: `3`,
          hint: "count 변수를 만들고, v[i] > 3인 경우마다 ++count 하세요.",
        },
        {
          id: "ck2-p8",
          type: "practice" as const,
          title: "문제 8: 두 벡터 합치기",
          content: `v2의 원소를 v1에 추가하여 합쳐진 벡터를 출력하세요.\n\n**출력:** 합쳐진 원소를 공백으로 구분하여 출력`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v1 = {1, 2, 3};
    vector<int> v2 = {4, 5, 6};
    for (int i = 0; i < v2.size(); i++) {
        v1.push_back(v2[i]);
    }
    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i];
        if (i < v1.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v1 = {1, 2, 3};
    vector<int> v2 = {4, 5, 6};
    // for문으로 v2의 원소를 v1.push_back()으로 추가하세요

    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i];
        if (i < v1.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4 5 6`,
          hint: "for문으로 v2의 원소를 순회하며 v1.push_back(v2[i])로 추가하세요.",
        },
      ],
    },
  ],
}
