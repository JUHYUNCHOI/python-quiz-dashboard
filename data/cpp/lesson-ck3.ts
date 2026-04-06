import type { LessonData } from "../types"

export const cppLessonCk3Data: LessonData = {
  id: "cpp-ck3",
  title: "🔧 구조체+벡터 연습",
  emoji: "🔧",
  description: "구조체와 벡터를 함께 활용하는 연습입니다.",
  chapters: [
    {
      id: "ck3-main",
      title: "구조체+벡터 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck3-intro",
          type: "explain" as const,
          title: "구조체+벡터 연습 문제",
          content: `구조체와 벡터를 함께 사용하는 연습을 합니다.\n\n총 6문제입니다. 이 문제들을 풀기 전에 걱정하지 마세요. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck3-p1",
          type: "practice" as const,
          title: "문제 1: 구조체 배열에서 최고 점수",
          content: `학생 구조체 벡터에서 가장 점수가 높은 학생의 이름을 출력하세요.\n\n**출력:** 최고 점수 학생의 이름`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int max_score = students[0].score;
    string best = students[0].name;
    for (int i = 1; i < students.size(); i++) {
        if (students[i].score > max_score) {
            max_score = students[i].score;
            best = students[i].name;
        }
    }
    cout << best << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int max_score = students[0].score;
    string best = students[0].name;
    // max_score 변수로 최고점을 추적하고 학생 이름을 저장하세요

    cout << best << endl;
    return 0;
}`,
          expectedOutput: `Bob`,
          hint: "for문으로 students[i].score를 max_score와 비교하고, 더 크면 max_score와 best를 갱신하세요.",
        },
        {
          id: "ck3-p2",
          type: "practice" as const,
          title: "문제 2: 합격자 출력",
          content: `점수가 80 이상인 학생의 이름을 순서대로 출력하세요.\n\n**출력:** 합격자 이름을 한 줄씩 출력`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    for (int i = 0; i < students.size(); i++) {
        if (students[i].score >= 80) {
            cout << students[i].name << endl;
        }
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    // 점수가 80 이상인 학생의 이름을 출력하세요

    return 0;
}`,
          expectedOutput: `Alice
Bob`,
          hint: "for문으로 각 학생을 순회하며 students[i].score >= 80 이면 students[i].name을 출력하세요.",
        },
        {
          id: "ck3-p3",
          type: "practice" as const,
          title: "문제 3: 레퍼런스로 swap 함수",
          content: `레퍼런스를 사용하는 swap 함수를 작성하여 두 변수의 값을 교환하세요.\n\n**출력:** 교환 후 a와 b의 값을 공백으로 구분하여 출력`,
          code: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int a = 10, b = 20;
    swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    // temp 변수를 사용하여 a와 b를 교환하세요

}

int main() {
    int a = 10, b = 20;
    swap(a, b);
    cout << a << " " << b << endl;
    return 0;
}`,
          expectedOutput: `20 10`,
          hint: "void swap(int& a, int& b) 함수 안에서: int temp = a; a = b; b = temp; 를 사용하세요.",
        },
        {
          id: "ck3-p4",
          type: "practice" as const,
          title: "문제 4: 문자열 뒤집기",
          content: `문자열 "Hello"를 뒤집어 출력하세요.\n\n**출력:** 뒤집힌 문자열`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    for (int i = s.length() - 1; i >= 0; i--) {
        cout << s[i];
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    // i를 s.length()-1부터 0까지 감소시키며 출력하세요

    cout << endl;
    return 0;
}`,
          expectedOutput: `olleH`,
          hint: "i를 s.length()-1부터 0까지 감소시키며 s[i]를 출력하세요. cout << s[i] 를 반복합니다.",
        },
        {
          id: "ck3-p5",
          type: "practice" as const,
          title: "문제 5: 점수 평균 (구조체 벡터)",
          content: `학생 구조체 벡터에서 점수 평균을 구하세요.\n\n**출력:** 평균 점수를 정수로 출력`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int sum = 0;
    for (int i = 0; i < students.size(); i++) {
        sum += students[i].score;
    }
    cout << sum / students.size() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {{"Alice", 85}, {"Bob", 92}, {"Charlie", 78}};
    int sum = 0;
    // sum += students[i].score 로 합산하세요

    cout << sum / students.size() << endl;
    return 0;
}`,
          expectedOutput: `85`,
          hint: "for문으로 각 학생을 순회하며 sum += students[i].score로 합산한 뒤 students.size()로 나누세요.",
        },
        {
          id: "ck3-p6",
          type: "practice" as const,
          title: "문제 6: 클래스 멤버 함수",
          content: `Person 클래스에서 getFullName() 메서드를 호출하여 전체 이름을 출력하세요.\n\n**출력:** 이름과 성을 공백으로 이어서 출력`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    string first;
    string last;
    string getFullName() {
        return first + " " + last;
    }
};

int main() {
    Person p;
    p.first = "John";
    p.last = "Doe";
    cout << p.getFullName() << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    string first;
    string last;
    string getFullName() {
        // first와 last를 공백으로 이어 반환하세요

    }
};

int main() {
    Person p;
    p.first = "John";
    p.last = "Doe";
    cout << p.getFullName() << endl;
    return 0;
}`,
          expectedOutput: `John Doe`,
          hint: "클래스의 멤버 함수 안에서 first와 last에 직접 접근할 수 있습니다. return first + \" \" + last; 를 사용하세요.",
        },
      ],
    },
  ],
}
