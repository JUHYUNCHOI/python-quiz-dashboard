import type { LessonData } from "../types"

export const cppLessonCk4Data: LessonData = {
  id: "cpp-ck4",
  title: "🔢 정렬 연습 문제",
  emoji: "🔢",
  description: "sort와 커스텀 정렬을 활용한 연습입니다.",
  chapters: [
    {
      id: "ck4-main",
      title: "정렬 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck4-intro",
          type: "explain" as const,
          title: "정렬 연습 문제",
          content: `sort와 커스텀 comparator를 활용한 문제들입니다.\n\n총 6문제입니다. 이 문제들을 풀기 전에 걱정하지 마세요. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck4-p1",
          type: "practice" as const,
          title: "문제 1: 내림차순 정렬",
          content: `주어진 벡터를 내림차순으로 정렬하여 출력하세요.\n\n**출력:** 내림차순 정렬된 원소를 공백으로 구분하여 출력`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < v.size(); i++) {
        cout << v[i];
        if (i < v.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    // 내림차순으로 정렬하세요

    for (int i = 0; i < v.size(); i++) {
        cout << v[i];
        if (i < v.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
          expectedOutput: `9 8 5 3 2 1`,
          hint: "sort(v.begin(), v.end(), greater<int>()) 를 사용하면 내림차순 정렬이 됩니다.",
        },
        {
          id: "ck4-p2",
          type: "practice" as const,
          title: "문제 2: 구조체 벡터 정렬 (점수순)",
          content: `학생을 점수 내림차순으로 정렬하여 이름을 출력하세요.\n\n**출력:** 점수 높은 순으로 이름을 한 줄씩 출력`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    sort(students.begin(), students.end(), [](Student a, Student b) {
        return a.score > b.score;
    });
    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    // 점수 내림차순으로 정렬하세요 (lambda 사용)

    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          expectedOutput: `Bob
Alice
Charlie`,
          hint: "sort with lambda: sort(students.begin(), students.end(), [](Student a, Student b){ return a.score > b.score; });",
        },
        {
          id: "ck4-p3",
          type: "practice" as const,
          title: "문제 3: 중앙값 찾기",
          content: `벡터를 정렬한 후 중앙값을 출력하세요.\n\n**출력:** 중앙값`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1};
    sort(v.begin(), v.end());
    cout << v[v.size() / 2] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1};
    // 정렬 후 중앙값을 출력하세요

    return 0;
}`,
          expectedOutput: `5`,
          hint: "sort로 정렬한 후 v[v.size()/2]가 중앙값입니다.",
        },
        {
          id: "ck4-p4",
          type: "practice" as const,
          title: "문제 4: 동점자 처리",
          content: `점수 내림차순으로 정렬하되, 동점이면 이름 오름차순으로 정렬하세요.\n\n**출력:** 정렬된 순서로 이름을 한 줄씩 출력`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 85}};
    sort(students.begin(), students.end(), [](Student a, Student b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 85}};
    // 점수 내림차순, 동점이면 이름 오름차순으로 정렬하세요

    for (int i = 0; i < students.size(); i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          expectedOutput: `Bob
Alice
Charlie`,
          hint: "lambda 안에서: a.score != b.score ? a.score > b.score : a.name < b.name 을 사용하세요.",
        },
        {
          id: "ck4-p5",
          type: "practice" as const,
          title: "문제 5: K번째로 작은 수",
          content: `벡터에서 3번째로 작은 수를 출력하세요.\n\n**출력:** K번째로 작은 수`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1, 3};
    int k = 3;
    sort(v.begin(), v.end());
    cout << v[k - 1] << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {7, 2, 5, 9, 1, 3};
    int k = 3;
    // 정렬 후 k번째로 작은 수를 출력하세요

    return 0;
}`,
          expectedOutput: `3`,
          hint: "오름차순 정렬 후 v[k-1]이 k번째로 작은 수입니다 (인덱스는 0부터 시작).",
        },
        {
          id: "ck4-p6",
          type: "practice" as const,
          title: "문제 6: 정렬로 중복 찾기",
          content: `벡터에서 중복된 수를 오름차순으로 출력하세요 (각 중복 수는 한 번만 출력).\n\n**출력:** 중복된 수를 공백으로 구분하여 출력`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    sort(v.begin(), v.end());
    for (int i = 0; i < v.size() - 1; i++) {
        if (v[i] == v[i + 1]) {
            cout << v[i];
            // 같은 수가 연속으로 여러 번 나오는 경우 한 번만 출력
            while (i + 1 < v.size() && v[i] == v[i + 1]) i++;
            if (i < v.size() - 1) cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    sort(v.begin(), v.end());
    // 정렬 후 v[i] == v[i+1] 이면 중복입니다

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 5`,
          hint: "정렬 후 인접한 원소를 비교하세요. v[i] == v[i+1]이면 중복입니다.",
        },
      ],
    },
  ],
}
