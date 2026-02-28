// ============================================
// C++ Lesson 14: 구조체 & 클래스
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson14Data: LessonData = {
  id: "cpp-14",
  title: "구조체 & 클래스",
  emoji: "🏗️",
  description: "struct와 class로 나만의 타입 만들기!",
  chapters: [
    // ============================================
    // Chapter 1: struct (구조체)
    // ============================================
    {
      id: "ch1",
      title: "구조체 (struct)",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 struct — 여러 변수를 하나로 묶기!",
          content: `학생의 이름, 나이, 성적을 저장하고 싶다면? 변수를 하나하나 만드는 건 불편해요:

\`\`\`cpp
string name1 = "Kim";
int age1 = 15;
double gpa1 = 3.8;
// 학생이 100명이면...? 😱
\`\`\`

**struct**를 쓰면 여러 변수를 **하나의 타입**으로 묶을 수 있어요!

\`\`\`cpp
struct Student {
    string name;
    int age;
    double gpa;
};  // ← 세미콜론 꼭 붙여요!

Student s;
s.name = "Kim";
s.age = 15;
s.gpa = 3.8;
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
class Student:
    def __init__(self):
        self.name = ""
        self.age = 0
        self.gpa = 0.0

s = Student()
s.name = "Kim"
s.age = 15
\`\`\`

| 파이썬 🐍 | C++ struct ⚡ |
|---|---|
| \`class Student:\` | \`struct Student { };\` |
| \`self.name\` | \`s.name\` |
| \`__init__\`에서 초기화 | 선언 후 .\`으로 접근 |
| 세미콜론 없음 | **닫는 중괄호 뒤 세미콜론!** |

💡 struct 정의 끝에 **세미콜론(;)**을 꼭 붙여야 해요! 안 붙이면 에러가 나요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "좌표를 저장하는 구조체를 만들어요!",
          code: "___  Point {\n    double x;\n    double y;\n};",
          fillBlanks: [
            { id: 0, answer: "struct", options: ["struct", "class", "type", "object"] }
          ],
          explanation: "struct 키워드로 구조체를 선언해요! struct Point { ... }; 형태로 작성해요."
        },
        {
          id: "ch1-init",
          type: "explain",
          title: "📋 struct 초기화 방법!",
          content: `struct를 초기화하는 방법은 여러 가지가 있어요!

**방법 1: 하나씩 대입**
\`\`\`cpp
Student s;
s.name = "Kim";
s.age = 15;
s.gpa = 3.8;
\`\`\`

**방법 2: 중괄호 초기화 (Brace Initialization)**
\`\`\`cpp
Student s = {"Kim", 15, 3.8};
\`\`\`

순서가 중요해요! struct에 선언한 순서대로 값을 넣어야 해요.

**멤버 접근: 점(.) 연산자**
\`\`\`cpp
cout << s.name << endl;   // Kim
cout << s.age << endl;    // 15
cout << s.gpa << endl;    // 3.8
\`\`\`

**struct에 함수도 넣을 수 있어요!**
\`\`\`cpp
struct Student {
    string name;
    int age;
    double gpa;

    void print() {
        cout << name << " (" << age << ") GPA: " << gpa << endl;
    }
};

Student s = {"Kim", 15, 3.8};
s.print();  // Kim (15) GPA: 3.8
\`\`\`

파이썬의 메서드처럼, C++ struct 안에도 함수를 넣을 수 있어요! 대신 \`self\`는 필요 없어요.

💡 중괄호 초기화는 간단할 때, 하나씩 대입은 명확하게 하고 싶을 때 써요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "struct 사용하기!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nstruct Point {\n    double x;\n    double y;\n};\nint main() {\n    Point p = {3.0, 4.0};\n    cout << p.x + p.y;\n    return 0;\n}",
          options: ["3.0", "4.0", "7", "에러"],
          answer: 2,
          explanation: "p.x는 3.0, p.y는 4.0이에요. 3.0 + 4.0 = 7이 출력돼요! 점(.) 연산자로 멤버에 접근해요."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Student struct 만들기!",
          content: `Student struct를 만들고, 이름/나이/점수를 저장한 후 출력해봐요!

struct를 정의하고, 중괄호 초기화로 값을 넣고, 멤버에 접근해서 출력해봐요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double score;
};

int main() {
    Student s = {"Kim", 15, 95.5};

    cout << "Name: " << s.name << endl;
    cout << "Age: " << s.age << endl;
    cout << "Score: " << s.score << endl;

    return 0;
}`,
          expectedOutput: `Name: Kim
Age: 15
Score: 95.5`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "struct 기초!",
          content: "C++ struct 정의에서 자주 빠뜨려서 에러가 나는 것은?",
          options: [
            "struct 키워드",
            "중괄호 {}",
            "닫는 중괄호 뒤의 세미콜론 ;",
            "멤버 변수 이름"
          ],
          answer: 2,
          explanation: "struct 정의 끝에 세미콜론(;)을 꼭 붙여야 해요! struct Student { ... }; 이렇게요. 안 붙이면 컴파일 에러가 나요."
        }
      ]
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
          title: "🎓 class = struct + 접근 제어!",
          content: `**class**는 struct에 **접근 제어(public/private)**가 추가된 거예요!

핵심 차이:
- **struct**: 멤버가 기본적으로 **public** (누구나 접근 가능)
- **class**: 멤버가 기본적으로 **private** (외부에서 접근 불가)

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
          id: "ch2-q1",
          type: "quiz",
          title: "struct vs class!",
          content: "C++에서 `struct`와 `class`의 **가장 큰 차이점**은?",
          options: [
            "struct에는 함수를 넣을 수 없다",
            "class에는 변수를 넣을 수 없다",
            "struct는 기본 public, class는 기본 private",
            "struct는 느리고 class는 빠르다"
          ],
          answer: 2,
          explanation: "struct는 멤버가 기본적으로 public이고, class는 기본적으로 private이에요! 그 외에는 거의 똑같아요. 둘 다 함수와 변수를 가질 수 있어요."
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
          title: "struct 문법!",
          content: `이 코드의 출력은?

\`\`\`cpp
struct Vec2 {
    int x, y;
};
int main() {
    Vec2 v = {10, 20};
    cout << v.x + v.y;
}
\`\`\``,
          options: [
            "10",
            "20",
            "30",
            "에러"
          ],
          answer: 2,
          explanation: "중괄호 초기화로 v.x=10, v.y=20이 돼요. v.x + v.y = 30이 출력돼요!"
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

### 🧩 레슨 13: 열거형 & 상수
- \`enum\`, \`enum class\`, \`const\`로 코드의 의미를 명확하게

### 🏗️ 레슨 14: 구조체 & 클래스
- \`struct\`로 데이터 묶기, \`class\`로 캡슐화, 생성자(constructor)

---

## ✅ Part 2 핵심 요약!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 배열/벡터 | \`int arr[]\`, \`vector<int>\` | 여러 값 저장 |
| Range-for | \`for(auto x : v)\` | 편한 반복 |
| 참조 | \`int& ref\` | 변수의 별명 |
| struct | \`struct { };\` | 데이터 묶기 |
| class | \`class { private/public };\` | 캡슐화 |
| 생성자 | \`ClassName(...)\` | 객체 초기화 |

🎊 **축하해요!** Part 2를 모두 마쳤어요! C++의 중요한 개념들을 정복했어요!

🚀 **다음은 Part 3!** 포인터, 동적 메모리, 그리고 더 깊은 OOP를 배워볼 거예요!`
        }
      ]
    }
  ]
}
