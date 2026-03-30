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
          id: "ch1-why",
          type: "explain",
          title: "🤔 함수가 왜 필요할까?",
          content: `함수는 **한 가지 일을 잘하는 도우미**예요. 식당에서 주문받는 사람, 요리하는 사람, 서빙하는 사람이 따로 있잖아요? 프로그래밍도 마찬가지예요!

같은 코드를 여러 번 쓰고 있다면? 함수로 묶어서 **이름 하나로 호출**할 수 있어요!

**함수 없이:**
\`\`\`cpp
cout << 3 + 5;
cout << 10 + 7;
cout << 4 + 9;
\`\`\`

**함수로 만들면:**
\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
cout << add(3, 5);
cout << add(10, 7);
cout << add(4, 9);
\`\`\`

한 번 만들어두면 **이름만 불러서** 몇 번이든 재사용! 코드가 깔끔해지고, 수정할 때도 한 곳만 고치면 돼요.`
        },
        {
          id: "ch1-structure",
          type: "explain",
          title: "🔍 C++ 함수 구조 뜯어보기",
          content: `C++ 함수는 이렇게 생겼어요:

\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
\`\`\`

각 부분이 뭔지 하나씩 볼게요:

| 부분 | 예시 | 역할 |
|---|---|---|
| **반환 타입** | \`int\` | 이 함수가 돌려주는 값의 타입 |
| **함수 이름** | \`add\` | 함수를 부를 때 쓰는 이름 |
| **매개변수** | \`(int a, int b)\` | 함수에 넣어주는 입력값 (타입 필수!) |
| **중괄호 {}** | \`{ ... }\` | 함수가 실행할 코드를 감싸는 블록 |
| **return** | \`return a + b;\` | 결과를 돌려주기 |

⚠️ **파이썬과 다른 점:**
- 파이썬: \`def add(a, b):\` — 콜론으로 시작, 들여쓰기로 블록
- C++: \`int add(int a, int b) { }\` — **중괄호 {}**로 블록, 타입 필수!

💡 중괄호를 빼먹으면 에러예요! 꼭 \`{\`로 열고 \`}\`로 닫아야 해요.`,
          component: "cppFunctionBuilder",
        },
        {
          id: "ch1-compare",
          type: "explain",
          title: "🧩 파이썬 vs C++ 비교",
          content: `파이썬 함수와 C++ 함수를 나란히 비교해볼게요:

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

| | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 키워드 | \`def\` | 없음 (반환 타입이 대신!) |
| 반환 타입 | 안 씀 | \`int\`, \`double\`, \`void\` 등 필수 |
| 매개변수 타입 | 안 씀 | \`int a\`, \`double b\` 등 필수 |
| 코드 블록 | 콜론 + 들여쓰기 | **중괄호 { }** |
| 줄 끝 | 세미콜론 없음 | **세미콜론 ;** 필수 |

💡 C++은 "이 함수가 뭘 받고, 뭘 돌려주는지" 전부 타입으로 미리 알려줘야 해요!`,
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
          content: `함수 이름 앞에 쓰는 **반환 타입**은 "이 함수가 뭘 돌려줄거야?"를 알려주는 거예요.

\`\`\`cpp
int multiply(int a, int b) { ... }         // 정수를 돌려줌
double average(double a, double b) { ... }  // 실수를 돌려줌
string greet(string name) { ... }          // 문자열을 돌려줌
bool isEven(int n) { ... }                // true/false를 돌려줌
\`\`\`

반환 타입이 \`int\`면 \`return\`도 **정수**를 돌려줘야 해요:
\`\`\`cpp
int add(int a, int b) {
    return a + b;   // ✅ 정수 돌려줌 — OK!
    return "hello"; // ❌ 문자열인데? — 에러!
}
\`\`\`

💡 C++은 타입이 안 맞으면 에러를 내요. "약속한 타입과 다른 걸 돌려주지 마!"라는 뜻이에요.`
        },
        {
          id: "ch1-void",
          type: "explain",
          title: "🕳️ void — 돌려주는 게 없는 함수?",
          content: `그런데... **아무것도 돌려줄 필요 없는** 함수도 있잖아요?

파이썬에서 이런 함수 써본 적 있죠?
\`\`\`python
def say_hello():
    print("안녕!")
    # return 없음!
\`\`\`

C++에서는 "이 함수는 아무것도 안 돌려줘요!"를 \`void\`로 표현해요:
\`\`\`cpp
void sayHello() {
    cout << "안녕!";
    // return 필요 없음!
}
\`\`\`

**void** = "비어있는, 없는"이라는 뜻의 영어 단어예요.

| 상황 | 반환 타입 | return |
|---|---|---|
| 계산 결과를 돌려줌 | \`int\`, \`double\` 등 | \`return 값;\` 필수 |
| 그냥 출력만 함 | **\`void\`** | return 없어도 됨 |
| true/false 판단 | \`bool\` | \`return true;\` 또는 \`return false;\` |

💡 void 함수를 호출하면:
\`\`\`cpp
sayHello();          // ✅ 그냥 호출만 — OK!
int x = sayHello();  // ❌ 돌려주는 게 없는데 받으려고? — 에러!
\`\`\`

⚠️ void 함수의 결과를 변수에 저장하려 하면 에러가 나요!`
        },
        {
          id: "ch1-return-vs-cout",
          type: "explain",
          title: "🤔 return과 cout의 차이",
          content: `return과 cout은 완전히 달라요!

**cout**: 화면에 보여주기만 해요 (사람이 볼 수 있음)
**return**: 함수가 값을 돌려줘요 (프로그램이 사용할 수 있음)

비유: 식당에서
- cout = "주문번호 42번!" 하고 소리치는 것 (보여주기)
- return = 음식을 손님 테이블에 가져다주는 것 (전달하기)

\`\`\`cpp
// cout만 하면?
void showDouble(int x) {
    cout << x * 2;  // 화면에 보임
}

// return하면?
int getDouble(int x) {
    return x * 2;  // 값을 돌려줌
}

int main() {
    // showDouble(5);  // 화면에 10 출력, 하지만 저장 불가!
    int result = getDouble(5);  // result에 10 저장!
    cout << result + 3;  // 13 출력 가능!
}
\`\`\`

💡 **계산 결과를 다른 곳에서 쓸 거면 return, 그냥 보여주기만 할 거면 cout!**`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "이 함수는 \"Hello!\"를 출력만 하고 아무것도 돌려주지 않아요. 반환 타입은?",
          code: "___ printHello() {\n    cout << \"Hello!\";\n}",
          fillBlanks: [
            { id: 0, answer: "void", options: ["void", "int", "string", "None"] }
          ],
          explanation: "돌려주는 게 없으니까 void! 파이썬에서 return 없이 쓰던 함수 = C++에서는 void 함수예요."
        },
        {
          id: "ch1-void-pred",
          type: "predict" as const,
          title: "void 함수 호출하면?",
          code: "#include <iostream>\nusing namespace std;\nvoid greet(string name) {\n    cout << \"Hi, \" << name << \"!\";\n}\nint main() {\n    greet(\"철수\");\n    return 0;\n}",
          options: ["Hi, 철수!", "철수", "에러", "아무것도 안 나옴"],
          answer: 0,
          explanation: "void 함수도 잘 실행돼요! 그냥 돌려주는 값이 없을 뿐. cout으로 출력은 됩니다!"
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
          stdin: `7\n3`,
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
        // ===== 프로토타입: 왜? → 어떻게? → 주의점 → 연습 =====
        {
          id: "ch2-proto-why",
          type: "explain",
          title: "😱 왜 에러가 나지? (순서 문제)",
          content: `이 코드는 에러가 나요. 왜일까요? 🤔

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << add(3, 5);
    return 0;
}

int add(int a, int b) {
    return a + b;
}
\`\`\`

다음을 눌러서 컴파일러가 어떻게 읽는지 직접 확인해봐요!`
        },
        {
          id: "ch2-proto-why-anim",
          type: "animation",
          component: "functionOrder",
          title: "🎬 컴파일러가 코드를 읽는 순서",
          content: `💡 해결 방법이 2가지 있어요! 다음 단계에서 알아볼게요.`
        },
        {
          id: "ch2-proto-fix",
          type: "explain",
          title: "✅ 해결 방법 2가지",
          content: `**방법 1: main 위에 함수를 먼저 쓰기** (간단! ✅)

\`\`\`cpp
int add(int a, int b) {   // ← 먼저 정의!
    return a + b;
}

int main() {
    cout << add(3, 5);    // ✅ 위에 있으니까 OK!
}
\`\`\`

**방법 2: 프로토타입(미리 알려주기)**

\`\`\`cpp
int add(int a, int b);    // ← 프로토타입: "이런 함수가 있을 거야!"

int main() {
    cout << add(3, 5);    // ✅ 위에서 선언했으니 OK!
}

int add(int a, int b) {   // ← 실제 본체는 아래에
    return a + b;
}
\`\`\`

**프로토타입** = 함수의 "예고편"이에요. 본체({ } 안의 코드) 없이, **이름, 매개변수, 반환 타입**만 적고 **세미콜론(;)**으로 끝!

⚠️ 주의: 프로토타입 끝에 **세미콜론(;)**을 꼭 붙여야 해요! 안 붙이면 에러!`
        },
        {
          id: "ch2-proto-why2",
          type: "explain",
          title: "🤷 그냥 다 main 위에 쓰면 되잖아?",
          content: `좋은 질문이에요! 함수가 2~3개면 그래도 돼요. 하지만...

**문제 1: 함수가 서로 호출할 때**

\`\`\`cpp
// ❌ A가 B를 부르고, B가 A를 부르면?
void funcA() {
    funcB();  // funcB는 아래에 있음 → 에러!
}
void funcB() {
    funcA();  // funcA는 위에 있으니 OK
}
\`\`\`

누가 위에 있든 **한쪽은 에러!** 프로토타입으로만 해결 가능:

\`\`\`cpp
// ✅ 프로토타입으로 해결!
void funcA();  // 미리 선언
void funcB();  // 미리 선언

void funcA() { funcB(); }  // OK!
void funcB() { funcA(); }  // OK!
\`\`\`

**문제 2: 함수가 50개면?**

main() 위에 50개 함수를 전부 쓰면... main()이 어디 있는지도 못 찾아요 😵

프로토타입을 쓰면 **main()을 파일 맨 위에** 두고, 함수 본체는 아래에 정리할 수 있어요.

💡 정리: 프로토타입은 **큰 프로그램을 깔끔하게 정리**하기 위한 도구예요!`
        },
        {
          id: "ch2-proto-pred1",
          type: "predict" as const,
          title: "이 코드는 실행될까?",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << multiply(4, 5);\n    return 0;\n}\n\nint multiply(int a, int b) {\n    return a * b;\n}",
          options: ["20", "에러 (함수를 찾을 수 없음)", "0", "45"],
          answer: 1,
          explanation: "main()에서 multiply를 호출하는데, 그 위에 프로토타입도 정의도 없어요! C++은 위→아래로 읽으니까 에러!"
        },
        {
          id: "ch2-proto-fb1",
          type: "fillblank" as const,
          title: "프로토타입을 완성해봐요!",
          content: "multiply 함수의 프로토타입을 적어서 에러를 없애봐요! (세미콜론 잊지 마세요!)",
          code: "___ multiply(___ a, ___ b)___\n\nint main() {\n    cout << multiply(4, 5);\n    return 0;\n}\n\nint multiply(int a, int b) {\n    return a * b;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "void", "def", "func"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 3, answer: ";", options: [";", "{", ":", "()"] }
          ],
          explanation: "프로토타입 = 반환 타입 + 함수 이름 + (매개변수) + 세미콜론(;)! 본체 { } 없이 선언만 해요."
        },
        // ===== 헤더 파일: .h → .cpp → main → 시뮬 → 인사이트 → #ifndef =====
        {
          id: "ch2-header-intro",
          type: "explain",
          title: "📄 헤더 파일 만들어볼게요 — 여기엔 뭐가 들어가요?",
          content: `프로토타입이 많아지면 파일로 분리하는 게 좋아요. 먼저 **헤더 파일**부터 만들어볼게요.

**.h 파일에는 프로토타입(선언)만 넣어요:**

\`\`\`cpp
// math.h
int add(int a, int b);
int multiply(int a, int b);
\`\`\`

본체 \`{ }\` 없이 선언만! "이런 함수가 있을 거예요" 라고 미리 알려주는 목차 같은 거예요.`
        },
        {
          id: "ch2-header-cpp",
          type: "explain",
          title: "📄 그럼 함수 본체는? — .cpp 파일에 써요",
          content: `함수의 실제 내용(본체)은 **.cpp 파일**에 작성해요. 관례상 헤더 파일과 같은 이름을 써요 (\`math.h\` ↔ \`math.cpp\`).

그리고 **이 .cpp 파일도 자신의 .h 파일을 include**해야 해요 — 컴파일러가 "선언대로 본체가 맞게 작성됐나?" 확인하기 위해서예요:

\`\`\`cpp
// math.cpp
#include "math.h"        // ← 내 헤더를 include!

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}
\`\`\`

💡 \`<iostream>\` 처럼 꺾쇠(\`<>\`)는 C++ 기본 라이브러리,
\`"math.h"\` 처럼 따옴표(\`""\`)는 우리가 만든 파일이에요.`
        },
        {
          id: "ch2-header-main",
          type: "explain",
          title: "📄 갖다 쓰는 쪽 — main.cpp에서도 include",
          content: `main.cpp에서도 **헤더 파일을 include**하면 함수를 쓸 수 있어요. 본체가 어떻게 생겼는지 몰라도 돼요 — 헤더만 보면 돼요!

\`\`\`cpp
// main.cpp
#include <iostream>
#include "math.h"     // ← 이것만 있으면 add, multiply 사용 가능!
using namespace std;

int main() {
    cout << add(3, 5) << endl;      // ✅ 8
    cout << multiply(4, 6) << endl; // ✅ 24
    return 0;
}
\`\`\`

이제 3개 파일이 있어요. 이게 어떻게 연결되는지 다음 화면에서 확인해봐요!`
        },
        {
          id: "ch2-header-anim",
          type: "animation",
          component: "headerFiles",
          title: "🔗 세 파일이 연결되는 방식",
          content: `💡 **핵심 인사이트:**
본체(\`math.cpp\`)가 어떻게 작성됐는지 몰라도,
**헤더 파일(\`math.h\`)만 보면** 어떤 함수가 있고 어떻게 쓰는지 알 수 있어요!

C++ 표준 라이브러리(\`<iostream>\`, \`<string>\` 등)도 같은 방식이에요 — 우리는 헤더만 include하고, 본체는 어딘가에 이미 컴파일돼 있어요.`
        },
        {
          id: "ch2-header-guard",
          type: "explain",
          title: "⚠️ 아주 작은 문제 하나 — 중복 include",
          content: `헤더 파일이 잘 작동해요! 근데 프로젝트가 커지면 이런 일이 생겨요:

\`\`\`cpp
// main.cpp
#include "math.h"   // ← add, multiply 선언됨 ✅
#include "utils.h"  // ← utils.h 내부에도 #include "math.h" 있으면?
//   └→ add, multiply 또 선언됨 ❌ 중복 에러!
\`\`\`

같은 헤더가 두 번 include되면 **같은 프로토타입이 두 번 선언**돼서 에러나요.

---

해결책 — 헤더 파일에 **헤더 가드** 추가:

\`\`\`cpp
// math.h
#ifndef MATH_H       // "MATH_H 아직 정의 안 됐지?"
#define MATH_H       // "없으면 지금 정의할게!"

int add(int a, int b);
int multiply(int a, int b);

#endif               // "끝!"
\`\`\`

두 번째 include → \`#ifndef\` "이미 정의됨!" → **통째로 건너뜀** ✅

💡 **관례(convention):** 식별자는 아무 이름이나 써도 되지만, 다른 파일과 겹치지 않도록 파일명을 대문자로 바꿔서 쓰는 게 일반적이에요.
- \`math.h\` → \`MATH_H\`
- \`player_utils.h\` → \`PLAYER_UTILS_H\``
        },
        {
          id: "ch2-header-q",
          type: "quiz",
          title: "#ifndef의 역할은?",
          content: `헤더 파일에서 \`#ifndef\` / \`#define\` / \`#endif\`를 쓰는 이유는?`,
          options: [
            "함수를 더 빠르게 실행하려고",
            "같은 헤더가 두 번 포함될 때 중복 에러를 막으려고",
            "헤더 파일을 암호화하려고",
            "컴파일 시간을 줄이려고"
          ],
          answer: 1,
          explanation: "#ifndef = '정의 안 됐으면'이라는 뜻! 같은 헤더가 여러 번 include돼도 한 번만 적용되게 해줘요."
        },
        {
          id: "ch2-header-q2",
          type: "quiz",
          title: ".h 파일에 들어가는 것은?",
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
          id: "ch2-proto-pred2",
          type: "predict" as const,
          title: "프로토타입 있으면?",
          code: "#include <iostream>\nusing namespace std;\n\nint square(int x);  // 프로토타입!\n\nint main() {\n    cout << square(7);\n    return 0;\n}\n\nint square(int x) {\n    return x * x;\n}",
          options: ["에러", "49", "7", "0"],
          answer: 1,
          explanation: "프로토타입이 위에 있으니까 main()에서 square를 호출할 수 있어요! 7 × 7 = 49!"
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
          id: "ch2-overload-why",
          type: "explain",
          title: "🤔 같은 이름의 함수가 여러 개?",
          content: `add라는 이름의 함수를 만들었어요. 정수 두 개를 더하는 함수예요.

그런데 이제 **실수 두 개**를 더하고 싶어요. 어떻게 할까요?

**방법 1: 이름을 다르게 만든다**
\`\`\`cpp
int add_int(int a, int b) { return a + b; }
double add_double(double a, double b) { return a + b; }
int add_three(int a, int b, int c) { return a + b + c; }
\`\`\`

이름이 점점 길어지고 복잡해져요 😩 함수가 50개면? \`add_int_int\`, \`add_double_double\`...

**방법 2: 같은 이름, 다른 매개변수** ← C++의 해결책!

파이썬에서는 같은 이름의 함수를 두 번 만들면 나중 것이 덮어쓰죠?
C++은 달라요. **매개변수가 다르면 같은 이름을 여러 번 쓸 수 있어요!**

💡 이걸 **함수 오버로딩(Function Overloading)**이라고 해요.`
        },
        {
          id: "ch2-overload",
          type: "explain",
          title: "🎭 함수 오버로딩 실전",
          content: `\`\`\`cpp
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

**컴파일러는 어떻게 골라줄까요?**

| 호출 코드 | 매개변수 확인 | 선택되는 함수 |
|---|---|---|
| \`add(3, 5)\` | int 2개 | \`int add(int, int)\` |
| \`add(1.5, 2.3)\` | double 2개 | \`double add(double, double)\` |
| \`add(1, 2, 3)\` | int 3개 | \`int add(int, int, int)\` |

C++이 **매개변수의 타입과 개수**를 보고 자동으로 골라줘요!`
        },
        {
          id: "ch2-overload-rules",
          type: "explain",
          title: "⚠️ 오버로딩의 규칙과 함정",
          content: `**오버로딩이 되는 경우:**
✅ 매개변수 **타입**이 다를 때: \`add(int)\` vs \`add(double)\`
✅ 매개변수 **개수**가 다를 때: \`add(int, int)\` vs \`add(int, int, int)\`

**오버로딩이 안 되는 경우:**
❌ **반환 타입만** 다르면 안 돼요!

\`\`\`cpp
int calc(int x) { return x * 2; }
double calc(int x) { return x * 2.0; }  // ❌ 에러!
\`\`\`

왜? \`calc(5)\`를 호출하면 컴파일러가 둘 중 뭘 써야 할지 **구분할 수 없거든요!**
매개변수가 똑같으니까요.

❌ **변수 이름만** 다르면 안 돼요!
\`\`\`cpp
int add(int a, int b) { return a + b; }
int add(int x, int y) { return x + y; }  // ❌ 에러! 타입이 같잖아
\`\`\`

💡 기억하세요: 오버로딩은 **매개변수의 타입이나 개수가 달라야** 해요!`
        },
        {
          id: "ch2-overload-trap",
          type: "predict" as const,
          title: "🪤 이 호출은 어떻게 될까?",
          content: `int 버전과 double 버전이 있을 때, 하나는 int이고 하나는 double인 인자를 넘기면?`,
          code: "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\nint main() {\n    cout << add(1, 2.5);  // int + double ??\n    return 0;\n}",
          options: ["3", "3.5", "컴파일 에러 (모호함)", "런타임 에러"],
          answer: 1,
          explanation: "C++은 int 1을 double 1.0으로 자동 변환해서 double 버전을 호출해요. 결과는 3.5! 하지만 이런 자동 변환은 예상 못한 결과를 낳을 수 있으니, 매개변수 타입을 맞춰주는 게 좋아요."
        },
        {
          id: "ch2-pred-overload",
          type: "predict" as const,
          title: "어떤 함수가 호출될까?",
          code: "#include <iostream>\nusing namespace std;\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint main() {\n    cout << add(1.5, 2.5);\n    return 0;\n}",
          options: ["3", "에러", "4", "int 버전 add가 호출돼서 3"],
          answer: 2,
          explanation: "1.5와 2.5는 double이니까 double 버전의 add가 호출돼요! 1.5 + 2.5 = 4. int 버전이 호출됐다면 소수점이 잘려서 add(1, 2) = 3이 됐겠지만, C++이 타입을 보고 딱 맞는 double 버전을 골라줘요!"
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
          explanation: "오버로딩은 매개변수의 타입이나 개수가 달라야 해요! double calc(double x)는 매개변수 타입이 다르니까 OK. 옵션 1, 3은 매개변수 타입이 같고, 옵션 4는 반환 타입만 달라서 안 돼요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 함수를 다양하게 만들어보세요!",
          content: `기본값 매개변수와 함수 오버로딩을 모두 써보는 프로그램이에요!

void 함수와 반환값 있는 함수의 차이도 직접 느껴보세요.`,
          starterCode: `#include <iostream>
using namespace std;

// 기본값 매개변수: greet(이름, 메시지="안녕하세요")
void greet(string name, string msg = "안녕하세요") {

}

// 함수 오버로딩: 정수용 add
int add(int a, int b) {

}

// 함수 오버로딩: 실수용 add
double add(double a, double b) {

}

int main() {
    greet("주현");
    greet("민지", "반가워요");

    cout << "정수: " << add(3, 5) << endl;
    cout << "실수: " << add(1.5, 2.7) << endl;

    return 0;
}`,
          code: `#include <iostream>
using namespace std;

void greet(string name, string msg = "안녕하세요") {
    cout << msg << ", " << name << "!" << endl;
}

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
