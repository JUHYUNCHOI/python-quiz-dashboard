// ============================================
// C++ Lesson 22: 클래스 (class)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson22Data: LessonData = {
  id: "cpp-22",
  title: "클래스 (class)",
  emoji: "🎓",
  description: "나만의 타입 만들기! public/private, 생성자, 캡슐화",
  chapters: [
    // ============================================
    // Chapter 1: class 기초
    // ============================================
    {
      id: "ch1",
      title: "class 기초",
      emoji: "🎓",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎓 class — struct보다 강력한 타입!",
          component: "cppPublicPrivateBuilder",
          content: `앞에서 배운 **struct**는 데이터를 묶는 간단한 방법이었어요.

**class**는 거기서 한 발 더 나아가요 — 데이터를 **숨길 수 있어요**.

왜 숨길까요? 예를 들어 사각형의 가로 길이가 음수가 되면 안 되잖아요. 직접 접근을 막고, 정해진 방법으로만 바꾸게 하면 실수를 막을 수 있어요.

\`\`\`cpp
class Rectangle {
private:          // 외부에서 직접 접근 불가!
    double width, height;

public:           // 외부에서 접근 가능!
    void setSize(double w, double h) {
        if (w > 0 && h > 0) {  // 검증 후 설정
            width = w;
            height = h;
        }
    }
    double area() {
        return width * height;
    }
};
\`\`\`

\`\`\`cpp
Rectangle r;
// r.width = -5;    // ❌ 컴파일 에러! private이라 접근 불가
r.setSize(5, 3);    // ✅ public 함수로만 접근
cout << r.area();   // 15
\`\`\`

| | struct | class |
|---|---|---|
| 기본 접근 | **public** (누구나) | **private** (내부만) |
| 주로 쓰는 곳 | 데이터 묶음 | 데이터 + 기능 |

💡 **private**으로 데이터를 숨기고, **public** 함수로만 접근하게 하는 것 → **캡슐화(encapsulation)**`,
        },
        {
          id: "ch1-fb1",
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
          id: "ch1-pred1",
          type: "predict" as const,
          title: "private 접근 시도",
          code: "class Rectangle {\nprivate:\n    int width;\npublic:\n    Rectangle(int w) : width(w) {}\n};\n\nint main() {\n    Rectangle r(5);\n    r.width = 10;  // ???\n}",
          options: ["10", "5", "0", "컴파일 에러"],
          answer: 3,
          explanation: "컴파일 에러! width는 private이라 클래스 바깥에서 접근할 수 없어요. 외부에서 수정하려면 public setter 메서드를 만들어야 해요."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "class 기본 접근 권한!",
          content: "C++ `class`에서 아무것도 지정하지 않으면 멤버의 기본 접근 권한은?",
          options: [
            "public — 누구나 접근 가능",
            "protected — 자식 클래스만 접근 가능",
            "private — 클래스 내부에서만 접근 가능",
            "접근 권한이 없어 에러가 난다"
          ],
          answer: 2,
          explanation: "class의 멤버는 기본적으로 private이에요! 외부에서 접근하려면 public:으로 명시해야 해요. struct는 반대로 기본이 public이에요."
        },
      ]
    },
    // ============================================
    // Chapter 2: 생성자 (Constructor)
    // ============================================
    {
      id: "ch2",
      title: "생성자 (Constructor)",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-constructor",
          type: "explain",
          title: "🔧 생성자 — 객체가 태어날 때 자동 호출!",
          content: `**생성자(constructor)**는 객체가 만들어질 때 **자동으로 호출**되는 특별한 함수예요.

규칙:
- 클래스 이름과 **같은 이름**
- **리턴 타입 없음** (void도 아님!)
- 객체 생성 시 자동 호출

\`\`\`cpp
class Dog {
public:
    string name;
    int age;

    Dog(string n, int a) {  // 생성자!
        name = n;
        age  = a;
    }
};

Dog d("Buddy", 3);   // 생성자 자동 호출
cout << d.name;      // Buddy
cout << d.age;       // 3
\`\`\`

생성자가 없으면 멤버 변수들이 **쓰레기 값**으로 시작해요! 항상 생성자에서 초기값을 정해줘야 해요.

**더 깔끔한 방법 — 멤버 초기화 리스트:**

\`\`\`cpp
// 일반 방법
Dog(string n, int a) {
    name = n;
    age = a;
}

// 초기화 리스트 (권장)
Dog(string n, int a) : name(n), age(a) {}
\`\`\`

\`: name(n), age(a)\` — 대입이 아니라 **처음부터 올바른 값으로 초기화**해요.`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "생성자 실행!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nclass Cat {\npublic:\n    string name;\n    int lives;\n    Cat(string n, int l) {\n        name = n;\n        lives = l;\n    }\n};\nint main() {\n    Cat c(\"Nabi\", 9);\n    cout << c.name << \" \" << c.lives;\n    return 0;\n}",
          options: ["에러", "Nabi 9", "Nabi 0", " 9"],
          answer: 1,
          explanation: "Cat c(\"Nabi\", 9)에서 생성자가 호출돼요! name은 \"Nabi\", lives는 9로 초기화돼요."
        },
        {
          id: "ch2-getter-setter",
          type: "explain",
          title: "💡 private 값은 어떻게 읽고 바꿔?",
          content: `private 멤버를 안전하게 접근하는 방법: **getter(읽기)**와 **setter(쓰기)** 메서드!

\`\`\`cpp
class Rectangle {
private:
    int width;
public:
    Rectangle(int w) : width(w) {}

    int getWidth() { return width; }      // getter: 읽기만
    void setWidth(int w) {
        if (w > 0) width = w;            // setter: 검증 후 쓰기
    }
};

Rectangle r(5);
cout << r.getWidth();  // 5
r.setWidth(10);        // OK
r.setWidth(-3);        // 무시됨 (검증 실패)
\`\`\`

setter에서 \`w > 0\` 검증을 하기 때문에 width = -10이 되는 걸 막아줘요. 직접 접근했다면 이런 보호가 불가능해요.`,
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Rectangle class 만들기!",
          content: `Rectangle 클래스를 완성해봐요!

- 생성자로 가로(width), 세로(height)를 받아요
- area()는 넓이, perimeter()는 둘레를 반환해요

주어진 코드를 실행해서 아래 출력이 나오게 해봐요.`,
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
          expectedOutput: `Area: 15\nPerimeter: 16`
        },
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
          options: ["에러", "d", "Buddy", "name"],
          answer: 2,
          explanation: "Dog d(\"Buddy\")로 생성자가 호출돼 name = \"Buddy\"가 돼요. name은 public이라 d.name으로 접근 가능해요!"
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
          options: ["줄 A", "줄 B", "둘 다 에러", "에러 없음"],
          answer: 0,
          explanation: "size는 private이라 외부에서 직접 b.size = 10은 에러! setSize()는 public 함수라 괜찮아요."
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
          options: ["10", "11", "13", "에러"],
          answer: 2,
          explanation: "Counter c(10)으로 count=10이 돼요. add()를 3번 호출하면 10→11→12→13이 돼요. get()은 13을 리턴해요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Part 2 완료!",
          content: `## 🏆 Part 2 완료! 정말 대단해요!

Part 2 (레슨 9~14, 22)에서 배운 모든 것을 정리해봐요!

### 📚 레슨 9: 배열 & 벡터
- C-style 배열과 \`vector\`로 여러 데이터를 저장하는 법

### 🔄 레슨 10: Range-for & auto
- \`for(auto x : vec)\`로 편하게 반복, \`auto\`로 타입 자동 추론

### 🔤 레슨 11: 문자열 심화
- \`string\`의 다양한 메서드와 활용법

### 🔗 레슨 12: 참조와 함수
- Call by Value vs Reference, \`int& ref\`로 원본 수정

### 🎯 레슨 13: 포인터 기초
- 포인터 선언 \`int* ptr\`, 역참조 \`*ptr\`, nullptr

### 📦 레슨 14: 구조체 (struct)
- 관련 데이터를 하나로 묶는 사용자 정의 타입

### 🎓 레슨 22: 클래스 (class)
- \`private\`/\`public\` 접근 제어, 생성자, 캡슐화

---

## ✅ Part 2 핵심 요약!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 배열/벡터 | \`int arr[]\`, \`vector<int>\` | 여러 값 저장 |
| Range-for | \`for(auto x : v)\` | 편한 반복 |
| 참조 | \`int& ref\` | 원본에 직접 접근 |
| 포인터 | \`int* ptr\` | 주소를 저장하는 변수 |
| struct | \`struct Name { };\` | 데이터 묶음 |
| class | \`class { private/public };\` | 캡슐화 (기본 private) |
| 생성자 | \`ClassName(...)\` | 객체 초기화 |

🎊 **축하해요!** Part 2를 모두 마쳤어요!

🚀 **다음은 Part 3!** 2차원 배열, pair & 정렬, map & set, STL 알고리즘!`
        }
      ]
    }
  ]
}
