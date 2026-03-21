// ============================================
// C++ Lesson 14: 클래스 (class)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson14Data: LessonData = {
  id: "cpp-14",
  title: "클래스 (class)",
  emoji: "🏗️",
  description: "class로 나만의 타입 만들기!",
  chapters: [
    // ============================================
    // Chapter 1: 구조체 (struct)
    // ============================================
    {
      id: "ch1",
      title: "구조체 (struct)",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 struct — 여러 데이터를 하나로 묶기!",
          component: "cppStructBuilder",
          content: `## struct — 관련 데이터를 하나의 묶음으로!

게임 캐릭터를 생각해봐요. 캐릭터에는 이름, 체력, 공격력이 있어요. 이걸 따로따로 변수로 관리하면?

\`\`\`cpp
// 😰 따로따로 관리하면 복잡해요
string name1 = "전사";
int hp1 = 100;
int atk1 = 30;

string name2 = "마법사";
int hp2 = 70;
int atk2 = 50;
\`\`\`

캐릭터가 100명이면? 변수가 300개가 필요해요. 😱

**struct**를 쓰면 관련 데이터를 하나로 묶을 수 있어요!

\`\`\`cpp
struct Character {
    string name;
    int hp;
    int atk;
};

Character warrior = {"전사", 100, 30};
Character mage    = {"마법사", 70, 50};

cout << warrior.name << " HP: " << warrior.hp;  // 전사 HP: 100
\`\`\`

| 구분 | 파이썬 🐍 | C++ struct ⚡ |
|------|-----------|--------------|
| 묶음 정의 | \`class\` 또는 \`dataclass\` | \`struct\` |
| 멤버 접근 | \`obj.field\` | \`obj.field\` |
| 기본 접근권한 | 없음(관례) | **public** (class는 private) |

> 💡 **struct vs class**: C++에서 struct는 기본이 \`public\`, class는 기본이 \`private\`이에요. 주로 데이터 묶음엔 struct, 기능(메서드) 위주엔 class를 씁니다.`,
        },
        {
          id: "ch1-practice",
          type: "explain",
          title: "struct 선언과 사용",
          content: `## struct 선언 방법

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
    char grade;
};

int main() {
    // 방법 1: 선언 후 대입
    Student s1;
    s1.name  = "김철수";
    s1.score = 95;
    s1.grade = 'A';

    // 방법 2: 초기화 리스트 (순서 맞춰야 해요!)
    Student s2 = {"이영희", 87, 'B'};

    cout << s1.name << ": " << s1.score << "점 (" << s1.grade << ")" << endl;
    cout << s2.name << ": " << s2.score << "점 (" << s2.grade << ")" << endl;
    return 0;
}
\`\`\`

출력:
\`\`\`
김철수: 95점 (A)
이영희: 87점 (B)
\`\`\`

## struct 배열 (여러 학생 관리)

\`\`\`cpp
Student students[3] = {
    {"김철수", 95, 'A'},
    {"이영희", 87, 'B'},
    {"박민준", 72, 'C'},
};

for (int i = 0; i < 3; i++) {
    cout << students[i].name << ": " << students[i].score << endl;
}
\`\`\`

## 함수에 struct 전달

\`\`\`cpp
// 값 전달 (복사본)
void print(Student s) {
    cout << s.name << " " << s.score << endl;
}

// 참조 전달 (원본 수정 가능, 빠름)
void boost(Student& s) {
    s.score += 10;
}

boost(s1);  // s1.score가 실제로 바뀜
\`\`\``,
        },
        {
          id: "ch1-quiz",
          type: "quiz",
          title: "struct 멤버 접근",
          content: "struct Point { int x; int y; }; 에서 Point p = {3, 7}; p.x += 2; 를 실행하면 p.x의 값은?",
          options: ["3", "5", "7", "9"],
          answer: 1,
          explanation: "p.x = 3이고 p.x += 2를 하면 p.x = 5가 됩니다.",
        },
      ],
    },
    // ============================================
    // Chapter 2: class 입문
    // ============================================
    {
      id: "ch2",
      title: "class 입문",
      emoji: "🎓",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎓 class — 나만의 타입 만들기!",
          component: "cppPublicPrivateBuilder",
          content: `## C++ class — 파이썬 class와 비슷하지만 더 강력해요!

파이썬에서 class를 써봤죠? C++의 class도 비슷해요. 다른 점은 **접근 권한을 진짜로 막을 수 있다**는 거예요.

**class**는 기본적으로 모든 멤버가 \`private\`이에요. 왜 그럴까요?

실수로 내부 데이터를 잘못 건드리는 걸 막으려고예요! 예: 사각형의 width = -10이 되면 안 되잖아요?

• \`public:\` — 클래스 바깥에서도 접근 가능 (누구나 쓸 수 있어요)
• \`private:\` — 클래스 안에서만 접근 가능 (외부에서 직접 건드릴 수 없어요)

\`\`\`cpp
class Rectangle {
private:          // 외부에서 직접 접근 불가!
    double width, height;

public:           // 외부에서 접근 가능!
    void setSize(double w, double h) {
        width = w;
        height = h;
    }
    double area() {
        return width * height;
    }
};
\`\`\`

\`\`\`cpp
Rectangle r;
// r.width = 5;      // ❌ 에러! private이라 접근 불가
r.setSize(5, 3);     // ✅ public 함수로 접근!
cout << r.area();     // ✅ 15
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
class Rectangle:
    def __init__(self):
        self._width = 0   # _는 관례일 뿐, 강제 아님
        self._height = 0

    def set_size(self, w, h):
        self._width = w
        self._height = h
\`\`\`

| 파이썬 🐍 | C++ class ⚡ |
|---|---|
| \`_변수\`는 관례적 private | \`private:\`로 진짜 차단! |
| 모든 것 접근 가능 | private은 진짜 접근 불가 |
| \`self\` 필요 | \`self\` 불필요 |

캡슐화(encapsulation)는 **데이터를 숨겨서 실수를 방지**하는 거예요. 약 캡슐처럼 안의 내용물(데이터)을 보호하고, 정해진 방법(메서드)으로만 접근하게 해요.

💡 private으로 데이터를 숨기고, public 함수로만 접근하게 하는 게 **캡슐화(encapsulation)**예요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "클래스의 접근 제어를 설정해봐요!",
          code: "class Circle {\n___:\n    double radius;\npublic:\n    double area() {\n        return 3.14 * radius * radius;\n    }\n};",
          fillBlanks: [
            { id: 0, answer: "private", options: ["private", "public", "protected", "static"] }
          ],
          explanation: "private으로 선언하면 외부에서 radius에 직접 접근할 수 없어요! public 함수를 통해서만 접근하게 하는 게 캡슐화예요."
        },
        {
          id: "ch2-constructor",
          type: "explain",
          title: "🎓 생성자 (Constructor)!",
          content: `**생성자(constructor)**는 객체가 만들어질 때 **자동으로 호출**되는 특별한 함수예요!

규칙:
- 클래스 이름과 **같은 이름**
- **리턴 타입이 없음** (void도 아님!)
- 객체 생성 시 자동 호출

\`\`\`cpp
class Dog {
public:
    string name;
    int age;

    Dog(string n, int a) {  // 생성자!
        name = n;
        age = a;
    }
};

Dog d("Buddy", 3);  // 생성자가 자동으로 호출!
cout << d.name;      // Buddy
cout << d.age;       // 3
\`\`\`

파이썬의 \`__init__\`과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

d = Dog("Buddy", 3)
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`__init__(self, ...)\` | \`클래스이름(...)\` |
| self 필요 | self 불필요 |
| \`Dog("Buddy", 3)\` | \`Dog d("Buddy", 3);\` |

C++에서 생성자가 없으면? 멤버 변수들이 **쓰레기 값**으로 시작해요! width가 -8273561이 될 수 있어요. 그래서 생성자에서 초기값을 꼭 정해줘야 해요.

💡 생성자 덕분에 객체를 만들 때 바로 값을 넣을 수 있어요! 파이썬의 \`__init__\`과 같은 역할이에요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "생성자 실행!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nclass Cat {\npublic:\n    string name;\n    int lives;\n    Cat(string n, int l) {\n        name = n;\n        lives = l;\n    }\n};\nint main() {\n    Cat c(\"Nabi\", 9);\n    cout << c.name << \" \" << c.lives;\n    return 0;\n}",
          options: ["에러", "Nabi 9", "Nabi 0", " 9"],
          answer: 1,
          explanation: "Cat c(\"Nabi\", 9)에서 생성자가 호출돼요! name은 \"Nabi\", lives는 9로 초기화돼요. 그래서 Nabi 9가 출력돼요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Rectangle class 만들기!",
          content: `Rectangle 클래스를 만들어봐요!

- 생성자로 가로(width), 세로(height)를 받아요
- area() 메서드로 넓이를, perimeter() 메서드로 둘레를 계산해요

class의 생성자와 메서드를 활용해봐요!`,
          code: `#include <iostream>
using namespace std;

class Rectangle {
private:
    double width, height;

public:
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }

    double area() {
        return width * height;
    }

    double perimeter() {
        return 2 * (width + height);
    }
};

int main() {
    Rectangle r(5.0, 3.0);
    cout << "Area: " << r.area() << endl;
    cout << "Perimeter: " << r.perimeter() << endl;

    return 0;
}`,
          expectedOutput: `Area: 15
Perimeter: 16`
        },
        {
          id: "ch2-pred-private",
          type: "predict" as const,
          title: "private 접근 시도",
          code: "class Rectangle {\nprivate:\n    int width;\npublic:\n    Rectangle(int w) : width(w) {}\n};\n\nint main() {\n    Rectangle r(5);\n    r.width = 10;  // ???\n}",
          options: ["10", "5", "0", "컴파일 에러"],
          answer: 3,
          explanation: "컴파일 에러! width는 private이라 클래스 바깥에서 접근할 수 없어요. private 멤버는 클래스 내부에서만 접근 가능해요. 외부에서 수정하려면 public 메서드(setter)를 만들어야 해요. 이것이 캡슐화의 핵심이에요!"
        },
        {
          id: "ch2-getter-setter",
          type: "explain",
          title: "💡 그러면 private 값은 어떻게 바꿔?",
          content: `private 멤버를 안전하게 접근하는 방법: **getter(읽기)**와 **setter(쓰기)** 메서드!

\`\`\`cpp
class Rectangle {
private:
    int width;
public:
    Rectangle(int w) : width(w) {}
    int getWidth() { return width; }     // getter
    void setWidth(int w) {
        if (w > 0) width = w;  // 검증 후 설정!
    }
};
\`\`\`

왜 이렇게 할까요? setWidth에서 \`w > 0\` 검증을 하잖아요! width = -10이 되는 걸 막아줘요. 직접 접근하면 이런 보호가 불가능해요.

💡 getter는 값을 읽어오는 함수, setter는 값을 검증 후 설정하는 함수예요!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "class의 기본 접근 권한!",
          content: "C++ `class`에서 아무것도 지정하지 않으면 멤버의 기본 접근 권한은?",
          options: [
            "public — 누구나 접근 가능",
            "protected — 자식 클래스만 접근 가능",
            "private — 클래스 내부에서만 접근 가능",
            "접근 권한이 없어 에러가 난다"
          ],
          answer: 2,
          explanation: "class의 멤버는 기본적으로 private이에요! 그래서 외부에서 실수로 건드리지 못해요. 외부에서 접근하려면 public:으로 명시해야 해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "class 코드 읽기!",
          content: `이 코드의 출력은?

\`\`\`cpp
class Dog {
public:
    string name;
    Dog(string n) { name = n; }
};
int main() {
    Dog d("Buddy");
    cout << d.name;
}
\`\`\``,
          options: [
            "에러",
            "d",
            "Buddy",
            "name"
          ],
          answer: 2,
          explanation: "Dog d(\"Buddy\")로 생성자가 호출돼 name = \"Buddy\"가 돼요. name은 public이라 d.name으로 접근할 수 있어요!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "private 접근!",
          content: `이 코드에서 에러가 나는 줄은?

\`\`\`cpp
class Box {
private:
    int size;
public:
    void setSize(int s) { size = s; }
};
int main() {
    Box b;
    b.size = 10;       // 줄 A
    b.setSize(10);     // 줄 B
}
\`\`\``,
          options: [
            "줄 A",
            "줄 B",
            "둘 다 에러",
            "에러 없음"
          ],
          answer: 0,
          explanation: "size는 private이라 외부에서 직접 접근하면 에러가 나요! b.size = 10은 불가하고, b.setSize(10)은 public 함수라 괜찮아요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "생성자!",
          content: "C++ 생성자에 대한 설명으로 **틀린** 것은?",
          options: [
            "클래스 이름과 같은 이름을 가진다",
            "리턴 타입이 void이다",
            "객체 생성 시 자동으로 호출된다",
            "매개변수를 받을 수 있다"
          ],
          answer: 1,
          explanation: "생성자는 리턴 타입이 아예 없어요! void도 아니에요. 클래스 이름과 같은 이름이고, 객체 생성 시 자동 호출되고, 매개변수를 받을 수 있어요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "종합 문제!",
          content: `이 코드의 출력은?

\`\`\`cpp
class Counter {
private:
    int count;
public:
    Counter(int c) { count = c; }
    void add() { count++; }
    int get() { return count; }
};
int main() {
    Counter c(10);
    c.add();
    c.add();
    c.add();
    cout << c.get();
}
\`\`\``,
          options: [
            "10",
            "11",
            "13",
            "에러"
          ],
          answer: 2,
          explanation: "Counter c(10)으로 count=10이 돼요. add()를 3번 호출하면 10→11→12→13이 돼요. get()은 13을 리턴해요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Part 2 완료!",
          content: `## 🏆 Part 2 완료! 정말 대단해요!

Part 2 (레슨 9~14)에서 배운 모든 것을 정리해봐요!

### 📚 레슨 9: 배열 & 벡터
- C-style 배열과 \`vector\`로 여러 데이터를 저장하는 법

### 🔄 레슨 10: Range-for & auto
- \`for(auto x : vec)\`로 편하게 반복, \`auto\`로 타입 자동 추론

### 🔤 레슨 11: 문자열 심화
- \`string\`의 다양한 메서드와 활용법

### 🔗 레슨 12: 참조와 함수
- Call by Value vs Reference, \`&\`로 원본 수정

### 🔄 레슨 13: 재귀 (Recursion)
- 함수가 자신을 호출하는 재귀, 기저 조건(Base Case)
- 메모이제이션으로 중복 계산 제거 → 동적 프로그래밍(DP) 기초

### 🏗️ 레슨 14: 클래스 (class)
- \`class\`로 캡슐화, private/public 접근 제어, 생성자(constructor)

---

## ✅ Part 2 핵심 요약!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 배열/벡터 | \`int arr[]\`, \`vector<int>\` | 여러 값 저장 |
| Range-for | \`for(auto x : v)\` | 편한 반복 |
| 참조 | \`int& ref\` | 변수의 별명 |
| 재귀 | \`func(n-1)\` | 기저 조건 + 재귀 호출 |
| 메모이제이션 | \`memo[n]\` | 중복 계산 제거 (DP 기초) |
| class | \`class { private/public };\` | 캡슐화 (기본 private) |
| 생성자 | \`ClassName(...)\` | 객체 초기화 |

🎊 **축하해요!** Part 2를 모두 마쳤어요! C++의 중요한 개념들을 정복했어요!

🚀 **다음은 Part 3!** pair & 정렬, map & set, STL 알고리즘으로 더 강력한 C++을 배워볼 거예요!`
        }
      ]
    }
  ]
}
