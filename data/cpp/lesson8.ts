// ============================================
// C++ 레슨 8: 함수
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================
import { LessonData } from '../types'

export const cppLesson8Data: LessonData = {
  id: "cpp-8",
  title: "함수",
  emoji: "🧩",
  description: "반환 타입을 직접 지정하는 C++ 함수!",
  chapters: [
    // ============================================
    // Chapter 1: 함수 선언/호출
    // ============================================
    {
      id: "ch1",
      title: "함수 만들기",
      emoji: "📝",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🧩 함수: 파이썬 vs C++",
          content: `파이썬은 \`def\`로 함수를 만들지만, C++은 **반환 타입**을 써요!

**파이썬 🐍:**
\`\`\`python
def add(a, b):
    return a + b
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
\`\`\`

차이점:
1. \`def\` 대신 **반환 타입** (int, double, string...)
2. 매개변수에도 **타입** 지정! (int a, int b)
3. 콜론(:) 대신 **중괄호 {}**

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`def add(a, b):\` | \`int add(int a, int b) {\` |
| 타입 안 씀 | 반환 타입 + 매개변수 타입 필수! |

💡 C++은 "이 함수가 뭘 돌려주는지" 미리 알려줘야 해요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "두 수를 곱하는 함수를 완성해봐요!",
          code: "___ multiply(___ a, ___ b) {\n    return a * b;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "any"] }
          ],
          explanation: "C++에서는 def 대신 반환 타입(int)을 쓰고, 매개변수에도 타입(int)을 지정해야 해요!"
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 반환 타입 종류",
          content: `C++ 함수의 반환 타입은 여러 가지가 있어요!

\`\`\`cpp
int multiply(int a, int b) { ... }        // 정수 반환
double average(double a, double b) { ... } // 실수 반환
string greet(string name) { ... }         // 문자열 반환
bool isEven(int n) { ... }               // true/false 반환
void sayHello() { ... }                   // 반환값 없음!
\`\`\`

**void** = 아무것도 반환하지 않는 함수에 써요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| return 없는 함수 | **void** 함수 |
| return으로 아무거나 반환 | 타입에 맞는 것만 반환! |

💡 void = "비어있다"는 뜻! 파이썬에서 return 없이 쓰던 함수가 C++에서는 void가 돼요.`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "반환값 없는 함수의 타입을 골라봐요!",
          code: "___ printHello() {\n    cout << \"Hello!\";\n}",
          fillBlanks: [
            { id: 0, answer: "void", options: ["void", "int", "string", "None"] }
          ],
          explanation: "반환값이 없는 함수는 void를 써요! 파이썬의 return 없는 함수에 해당해요."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "함수 호출!",
          code: "#include <iostream>\nusing namespace std;\nint square(int x) {\n    return x * x;\n}\nint main() {\n    cout << square(4);\n    return 0;\n}",
          options: ["4", "8", "16", "에러"],
          answer: 2,
          explanation: "square(4)는 4 × 4 = 16을 반환해요!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 함수를 직접 만들어보세요!",
          content: `두 정수를 받아서 합을 반환하는 함수를 만들어봐요!

함수를 main() 위에 정의하고, main()에서 호출하는 구조예요.`,
          code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int x, y;
    cout << "첫 번째 숫자: ";
    cin >> x;
    cout << "두 번째 숫자: ";
    cin >> y;

    cout << x << " + " << y << " = " << add(x, y) << endl;

    return 0;
}`,
          expectedOutput: `첫 번째 숫자: 7
두 번째 숫자: 3
7 + 3 = 10`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "반환 타입!",
          content: "C++에서 아무것도 반환하지 않는 함수의 반환 타입은?",
          options: ["None", "null", "void", "empty"],
          answer: 2,
          explanation: "C++에서는 반환값이 없는 함수에 void를 써요! 파이썬의 None과 비슷한 개념이에요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 기본값, 프로토타입
    // ============================================
    {
      id: "ch2",
      title: "기본값과 프로토타입",
      emoji: "📞",
      steps: [
        {
          id: "ch2-params",
          type: "explain",
          title: "📞 기본값 매개변수",
          content: `파이썬처럼 C++도 **기본값**을 설정할 수 있어요!

\`\`\`cpp
void greet(string name, string msg = "안녕") {
    cout << msg << ", " << name << "!" << endl;
}

greet("주현");           // 안녕, 주현!
greet("주현", "반가워");  // 반가워, 주현!
\`\`\`

파이썬과 똑같죠?
\`\`\`python
def greet(name, msg="안녕"):
    print(f"{msg}, {name}!")
\`\`\`

⚠️ 주의: 기본값이 있는 매개변수는 **오른쪽에** 와야 해요!
\`\`\`cpp
// ✅ OK: 기본값이 뒤에
void func(int a, int b = 10) { }

// ❌ 에러: 기본값이 앞에
void func(int a = 10, int b) { }
\`\`\`

💡 이 규칙은 파이썬도 마찬가지예요! 기본값은 항상 뒤쪽!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "여러 매개변수!",
          code: "#include <iostream>\nusing namespace std;\nint add(int a, int b, int c) {\n    return a + b + c;\n}\nint main() {\n    cout << add(2, 3, 5);\n    return 0;\n}",
          options: ["5", "10", "235", "에러"],
          answer: 1,
          explanation: "add(2, 3, 5)는 2 + 3 + 5 = 10을 반환해요!"
        },
        {
          id: "ch2-prototype",
          type: "explain",
          title: "📜 함수 프로토타입 (C++만의 규칙!)",
          content: `C++에서는 함수를 **사용하기 전에** 선언해야 해요!

\`\`\`cpp
// 방법 1: main 위에 함수를 먼저 정의 (추천! ✅)
int add(int a, int b) {
    return a + b;
}
int main() {
    cout << add(3, 5);  // OK!
}
\`\`\`

\`\`\`cpp
// 방법 2: 프로토타입(선언)을 먼저!
int add(int a, int b);  // ← 프로토타입 (본체 없이 선언만)

int main() {
    cout << add(3, 5);  // OK! 위에서 선언했으니까
}

int add(int a, int b) {  // 본체는 아래에
    return a + b;
}
\`\`\`

파이썬은 순서가 자유롭지만, C++은 **위에서 아래로** 읽으니까 미리 알려줘야 해요!

💡 보통은 방법 1(main 위에 함수 정의)을 많이 써요. 간단하니까요!`
        },
        {
          id: "ch2-header",
          type: "explain",
          title: "📁 .h 파일과 .cpp 파일 (파일 나누기!)",
          content: `프로토타입이 많아지면? **헤더 파일(.h)**에 모아놓아요!

\`\`\`
📂 프로젝트/
├── math_utils.h    ← 프로토타입 (선언)
├── math_utils.cpp  ← 함수 본체 (정의)
└── main.cpp        ← main 함수
\`\`\`

\`\`\`cpp
// math_utils.h — 프로토타입만!
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);      // 선언만!
int multiply(int a, int b); // 선언만!

#endif
\`\`\`

\`\`\`cpp
// math_utils.cpp — 함수 본체!
#include "math_utils.h"

int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

\`\`\`cpp
// main.cpp — 사용하는 쪽!
#include <iostream>
#include "math_utils.h"  // 우리가 만든 헤더!
using namespace std;

int main() {
    cout << add(3, 5) << endl;
    cout << multiply(4, 6) << endl;
    return 0;
}
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|-----------|--------|
| \`import math_utils\` | \`#include "math_utils.h"\` |
| 파일 하나에 다 있음 | .h (선언) + .cpp (정의) 분리 |

\`#include <iostream>\`은 C++ 기본 헤더, \`#include "파일.h"\`는 우리가 만든 헤더예요!

💡 CP(경시대회)에서는 파일 하나에 다 쓰지만, 큰 프로젝트에서는 꼭 나눠요!`
        },
        {
          id: "ch2-header-q",
          type: "quiz",
          title: ".h 파일의 역할!",
          content: `.h (헤더) 파일에 주로 들어가는 것은?`,
          options: [
            "함수 프로토타입 (선언)",
            "함수의 전체 본체 (정의)",
            "main 함수",
            "프로그램 실행 결과"
          ],
          answer: 0,
          explanation: ".h 파일에는 함수 프로토타입(선언)을 넣어요! 함수 본체는 .cpp 파일에, main은 main.cpp에 따로 둬요."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "두 수 중 큰 값을 반환하는 함수를 만들어요!",
          code: "___ max(___ a, ___ b) {\n    if (a > b) {\n        return a;\n    } ___ {\n        return b;\n    }\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "void", "bool", "def"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "double"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "double"] },
            { id: 3, answer: "else", options: ["else", "elif", "otherwise", "default"] }
          ],
          explanation: "두 정수 중 큰 값을 반환하는 max 함수예요. 반환 타입과 매개변수 타입 모두 int!"
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "mystery 함수!",
          code: "#include <iostream>\nusing namespace std;\nint mystery(int a, int b) {\n    if (a > b) return a;\n    else return b;\n}\nint main() {\n    cout << mystery(7, 12);\n    return 0;\n}",
          options: ["7", "12", "19", "에러"],
          answer: 1,
          explanation: "a=7, b=12. a > b? 아니요! → else로 가서 b(12)를 반환! 이건 두 수 중 큰 값을 반환하는 max 함수예요."
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "기본값 매개변수!",
          content: `다음 중 올바른 C++ 함수 선언은?`,
          options: [
            "void func(int a = 10, int b) { }",
            "void func(int a, int b = 10) { }",
            "void func(int a = 10, int b = 20, int c) { }",
            "void func(a, b = 10) { }"
          ],
          answer: 1,
          explanation: "기본값이 있는 매개변수는 뒤쪽에 와야 해요! (int a, int b = 10)처럼요. 앞에 기본값이 있으면 에러!"
        },
        {
          id: "ch2-overload",
          type: "explain",
          title: "🎭 함수 오버로딩 (C++만의 마법!)",
          content: `파이썬에서는 같은 이름의 함수를 두 번 만들면 나중 것이 덮어쓰죠?

C++에서는 **매개변수가 다르면 같은 이름의 함수를 여러 개** 만들 수 있어요!

\`\`\`cpp
// 정수 두 개를 더하는 add
int add(int a, int b) {
    return a + b;
}

// 실수 두 개를 더하는 add — 이름은 같지만 OK!
double add(double a, double b) {
    return a + b;
}

// 정수 세 개를 더하는 add — 이것도 OK!
int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(3, 5);        // int 버전 → 8
    cout << add(1.5, 2.3);    // double 버전 → 3.8
    cout << add(1, 2, 3);     // 3개짜리 버전 → 6
}
\`\`\`

C++이 **매개변수의 타입과 개수**를 보고 어떤 함수를 쓸지 자동으로 골라줘요!

💡 이걸 **함수 오버로딩(Function Overloading)**이라고 해요. 파이썬에는 없는 C++만의 강력한 기능!`
        },
        {
          id: "ch2-pred-overload",
          type: "predict" as const,
          title: "어떤 함수가 호출될까?",
          code: "#include <iostream>\nusing namespace std;\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint main() {\n    cout << add(1.5, 2.5);\n    return 0;\n}",
          options: ["3", "4.0", "4", "에러"],
          answer: 2,
          explanation: "1.5와 2.5는 double이니까 double 버전의 add가 호출돼요! 1.5 + 2.5 = 4. cout은 소수점 뒤가 0이면 생략해서 4가 출력돼요."
        },
        {
          id: "ch2-overload-q",
          type: "quiz",
          title: "함수 오버로딩!",
          content: `int calc(int x) 함수가 이미 있을 때, 오버로딩이 가능한 함수는?`,
          options: [
            "int calc(int x) { return x * 3; }",
            "double calc(double x) { return x * 2.0; }",
            "int calc(int y) { return y + 1; }",
            "void calc(int x) { cout << x; }"
          ],
          answer: 1,
          explanation: "오버로딩은 매개변수의 타입이나 개수가 달라야 해요! double calc(double x)는 매개변수 타입이 다르니까 OK. 같은 타입에 이름만 바꾸거나 반환 타입만 다르면 안 돼요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 함수를 다양하게 만들어보세요!",
          content: `기본값 매개변수와 함수 오버로딩을 모두 써보는 프로그램이에요!

void 함수와 반환값 있는 함수의 차이도 직접 느껴보세요.`,
          code: `#include <iostream>
using namespace std;

// 기본값 매개변수
void greet(string name, string msg = "안녕하세요") {
    cout << msg << ", " << name << "!" << endl;
}

// 함수 오버로딩
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int main() {
    greet("주현");
    greet("민지", "반가워요");

    cout << "정수: " << add(3, 5) << endl;
    cout << "실수: " << add(1.5, 2.7) << endl;

    return 0;
}`,
          expectedOutput: `안녕하세요, 주현!
반가워요, 민지!
정수: 8
실수: 4.2`
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🎓",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "함수 + 반복문!",
          content: `출력은?

\`\`\`cpp
int calc(int x) {
    return x * x + 1;
}
int main() {
    int result = 0;
    for (int i = 1; i <= 3; i++) {
        result += calc(i);
    }
    cout << result;
}
\`\`\``,
          options: ["6", "14", "17", "10"],
          answer: 2,
          explanation: "calc(1)=2, calc(2)=5, calc(3)=10. result = 2+5+10 = 17!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "파이썬 → C++ 변환",
          content: `파이썬의 다음 함수를 C++로 바꾸면?

\`\`\`python
def square(x):
    return x * x
\`\`\``,
          options: [
            "def square(int x) { return x * x; }",
            "int square(int x) { return x * x; }",
            "void square(int x) { return x * x; }",
            "square(int x) { return x * x; }"
          ],
          answer: 1,
          explanation: "x * x는 정수를 반환하므로 반환 타입은 int! 매개변수 x도 int 타입을 지정해야 해요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "프로토타입",
          content: "C++에서 함수를 main() 아래에 정의했을 때, main() 위에 필요한 것은?",
          options: [
            "import문",
            "함수 프로토타입(선언)",
            "def 키워드",
            "아무것도 필요 없다"
          ],
          answer: 1,
          explanation: "C++은 위에서 아래로 읽으니까, main() 아래 함수를 쓰려면 위에 프로토타입이 필요해요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "가장 큰 차이!",
          content: "파이썬과 C++ 함수의 가장 큰 차이점은?",
          options: [
            "C++은 함수를 만들 수 없다",
            "C++은 반환 타입과 매개변수 타입을 반드시 지정해야 한다",
            "파이썬은 return을 쓸 수 없다",
            "C++은 매개변수를 받을 수 없다"
          ],
          answer: 1,
          explanation: "C++은 정적 타입 언어라서 함수의 반환 타입, 매개변수 타입을 반드시 지정해야 해요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **함수 선언** — def 대신 반환 타입! (int, double, void...)
- ✅ **매개변수 타입** — 각 매개변수에 타입 필수!
- ✅ **void** — 반환값 없는 함수
- ✅ **기본값** — 파이썬과 같은 방식! (뒤쪽 매개변수에)
- ✅ **프로토타입** — 함수를 사용 전에 선언!

🎉 **C++ 기초 Part 1 완료!** 여기까지 배운 것만으로도 간단한 C++ 프로그램을 만들 수 있어요! 🚀`
        }
      ]
    }
  ]
}
