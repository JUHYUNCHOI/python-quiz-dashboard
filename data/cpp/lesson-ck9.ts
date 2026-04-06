import type { LessonData } from "../types"

export const cppLessonCk9Data: LessonData = {
  id: "cpp-ck9",
  title: "🔗 참조와 포인터 연습문제",
  emoji: "🔗",
  description: "참조(reference)와 포인터(pointer)를 직접 써보는 코딩 연습.",
  chapters: [
    {
      id: "ck9-main",
      title: "참조·포인터 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck9-intro",
          type: "explain" as const,
          title: "참조와 포인터 연습문제",
          content: `참조(\`&\`)와 포인터(\`*\`)의 핵심 사용법을 연습해요.\n\n6문제. 막히면 힌트 써도 괜찮아요!`,
        },
        {
          id: "ck9-p1",
          type: "practice" as const,
          title: "문제 1: 참조로 두 수 교환",
          content: `참조 매개변수를 사용해서 두 수를 교환하는 \`swap\` 함수를 완성하세요.\n\n**출력:** 교환 후 x와 y를 공백으로 출력`,
          code: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    // temp에 a 저장 후, a = b, b = temp 순서로 교환

}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
          expectedOutput: `10 5`,
          hint: "int temp = a; a = b; b = temp; — 임시 변수로 두 값을 교환해요. & 덕분에 원본이 바뀝니다.",
        },
        {
          id: "ck9-p2",
          type: "practice" as const,
          title: "문제 2: 참조로 값 두 배 만들기",
          content: `참조 매개변수를 받아서 값을 2배로 만드는 \`doubleIt\` 함수를 완성하세요.\n\n**출력:** 결과 숫자`,
          code: `#include <iostream>
using namespace std;

void doubleIt(int& n) {
    n *= 2;
}

int main() {
    int x = 7;
    doubleIt(x);
    cout << x << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void doubleIt(int& n) {
    // n을 2배로 만드세요 (n *= 2)

}

int main() {
    int x = 7;
    doubleIt(x);
    cout << x << endl;
    return 0;
}`,
          expectedOutput: `14`,
          hint: "n *= 2; — &로 받았으니 함수 안에서 n을 바꾸면 원본 x도 바뀌어요.",
        },
        {
          id: "ck9-p3",
          type: "practice" as const,
          title: "문제 3: 포인터로 값 변경",
          content: `포인터를 통해 변수 x의 값을 42에서 100으로 바꾸세요.\n\n**출력:** 바뀐 x 값`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;
    *ptr = 100;
    cout << x << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;   // ptr은 x의 주소를 가리킴
    // *ptr을 통해 x 값을 100으로 바꾸세요

    cout << x << endl;
    return 0;
}`,
          expectedOutput: `100`,
          hint: "*ptr = 100; — *ptr은 포인터가 가리키는 곳의 값을 의미해요. 여기서 x를 직접 바꾸는 것과 같아요.",
        },
        {
          id: "ck9-p4",
          type: "practice" as const,
          title: "문제 4: 포인터 매개변수로 10 더하기",
          content: `포인터 매개변수를 받아서 그 값에 10을 더하는 \`addTen\` 함수를 완성하세요.\n\n**출력:** 결과 숫자`,
          code: `#include <iostream>
using namespace std;

void addTen(int* p) {
    *p += 10;
}

int main() {
    int n = 5;
    addTen(&n);
    cout << n << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

void addTen(int* p) {
    // *p를 통해 원본 값에 10을 더하세요

}

int main() {
    int n = 5;
    addTen(&n);   // &n: n의 주소를 전달
    cout << n << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "*p += 10; — p는 n의 주소, *p는 n의 실제 값이에요. *p += 10이면 n이 5→15 됩니다.",
        },
        {
          id: "ck9-p5",
          type: "practice" as const,
          title: "문제 5: 참조로 벡터 합계 누적",
          content: `참조 매개변수 \`sum\`에 값을 더하는 함수를 사용해서 벡터 합계를 구하세요.\n\n**출력:** 벡터 원소 합계`,
          code: `#include <iostream>
#include <vector>
using namespace std;

void addToSum(int val, int& sum) {
    sum += val;
}

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = 0;
    for (int i = 0; i < v.size(); i++) {
        addToSum(v[i], total);
    }
    cout << total << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <vector>
using namespace std;

void addToSum(int val, int& sum) {
    // sum에 val을 더하세요

}

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = 0;
    for (int i = 0; i < v.size(); i++) {
        addToSum(v[i], total);
    }
    cout << total << endl;
    return 0;
}`,
          expectedOutput: `15`,
          hint: "sum += val; — sum이 int& 이라서 함수 안에서 더하면 main의 total도 바뀌어요.",
        },
        {
          id: "ck9-p6",
          type: "practice" as const,
          title: "문제 6: 구조체 참조로 점수 보너스",
          content: `Student 구조체를 참조로 받아서 보너스 점수를 더하는 함수를 완성하세요.\n\n**출력:** 보너스 후 점수`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void giveBonus(Student& s, int bonus) {
    s.score += bonus;
}

int main() {
    Student alice = {"Alice", 85};
    giveBonus(alice, 10);
    cout << alice.score << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void giveBonus(Student& s, int bonus) {
    // s.score에 bonus를 더하세요

}

int main() {
    Student alice = {"Alice", 85};
    giveBonus(alice, 10);
    cout << alice.score << endl;
    return 0;
}`,
          expectedOutput: `95`,
          hint: "s.score += bonus; — 구조체를 &로 받으면 복사 없이 원본을 직접 수정할 수 있어요.",
        },
      ],
    },
  ],
}
