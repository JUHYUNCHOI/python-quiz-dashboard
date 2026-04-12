// ============================================
// C++ Lesson 13: 포인터 기초 (Pointer Basics)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson13Data: LessonData = {
  id: "cpp-13",
  title: "포인터 기초",
  emoji: "🎯",
  description: "메모리 주소를 직접 다루는 포인터! int* ptr, &주소, *역참조, nullptr",
  chapters: [
    // ============================================
    // Chapter 1: 포인터란?
    // ============================================
    {
      id: "ch1",
      title: "포인터란?",
      emoji: "📍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📍 포인터(Pointer) — 주소를 저장하는 변수!",
          content: `이전 레슨에서 배운 참조(reference):
\`\`\`cpp
int x = 42;
int& ref = x;   // ref는 x를 직접 가리키는 참조
\`\`\`

이번 레슨: 포인터(pointer) — x의 **주소**를 저장하는 변수예요!
\`\`\`cpp
int x = 42;
int* ptr = &x;  // ptr에 x의 주소를 저장
\`\`\`

\`&\`와 \`*\`는 **선언할 때**와 **사용할 때** 의미가 달라요:

| | 선언 (타입의 일부) | 사용 (연산자) |
|---|---|---|
| \`&\` | \`int& ref\` → 참조 변수 | \`&x\` → x의 주소를 가져와 |
| \`*\` | \`int* ptr\` → 포인터 변수 | \`*ptr\` → ptr이 가리키는 값을 가져와 |

실제로 써보면:
\`\`\`cpp
int x = 42;
int* ptr = &x;    // ptr에 x의 주소 저장

cout << ptr;      // 출력 → 0x7fff1234  (메모리 주소)
cout << *ptr;     // 출력 → 42          (ptr이 가리키는 값)
cout << &x;       // 출력 → 0x7fff1234  (x의 주소, ptr과 같음!)

*ptr = 100;       // ptr이 가리키는 곳의 값을 100으로 변경
cout << x;        // 출력 → 100         (x가 바뀌었어요!)
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "포인터 역참조!",
          code: `#include <iostream>
using namespace std;
int main() {
    int x = 10;
    int* p = &x;
    *p = 99;
    cout << x;
    return 0;
}`,
          options: ["10", "99", "주소값", "에러"],
          answer: 1,
          explanation: "*p = 99는 p가 가리키는 변수(x)의 값을 99로 바꿔요! 포인터로 역참조하면 원본을 수정할 수 있어요.",
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "포인터 기본!",
          content: "`int x = 5; int* ptr = &x;`에서 `*ptr`이 반환하는 것은?",
          options: [
            "ptr 변수 자체의 주소",
            "x의 주소",
            "x의 값 (5)",
            "포인터의 크기",
          ],
          answer: 2,
          explanation: "*ptr은 역참조(dereference)예요. 포인터가 가리키는 곳의 값, 즉 x의 값(5)을 반환해요!",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "포인터를 선언하고 역참조해봐요!",
          code: "int x = 42;\nint___ ptr = &x;  // 포인터 선언\ncout << ___ptr;   // 역참조: 42 출력",
          fillBlanks: [
            { id: 0, answer: "*", options: ["*", "&", "**", " "] },
            { id: 1, answer: "*", options: ["*", "&", "**", " "] },
          ],
          explanation: "int* ptr로 포인터를 선언하고, *ptr로 역참조해서 값을 가져와요!",
        },
      ]
    },
    // ============================================
    // Chapter 2: nullptr & 포인터 vs 참조
    // ============================================
    {
      id: "ch2",
      title: "nullptr & 포인터 활용",
      emoji: "🔒",
      steps: [
        {
          id: "ch2-nullptr",
          type: "explain",
          title: "🔒 nullptr — 안전한 빈 포인터 (C++11)",
          content: `포인터가 아무것도 가리키지 않을 때는 **nullptr**을 써요!

\`\`\`cpp
int* p = nullptr;  // 빈 포인터 (C++11 이후 권장)
// int* p = NULL;   // 옛날 방식 (비권장)

if (p != nullptr) {
    cout << *p;    // nullptr이면 절대 역참조하면 안 돼요!
}
\`\`\`

nullptr을 역참조하면 **프로그램이 충돌**(segfault)해요. 항상 확인하고 써야 해요!

\`\`\`cpp
int* p = nullptr;

// ❌ 위험! segfault!
// cout << *p;

// ✅ 안전하게 확인 후 사용
if (p != nullptr) {
    cout << *p;
} else {
    cout << "포인터가 비어있어요!";
}
\`\`\`

| | nullptr (C++11) | NULL (구식) |
|---|---|---|
| 타입 | nullptr_t (타입 안전) | 정수 0 |
| 권장 | ✅ C++11+ | ❌ 비권장 |`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "nullptr 체크!",
          code: `#include <iostream>
using namespace std;
int main() {
    int* p = nullptr;
    if (p != nullptr) {
        cout << "값: " << *p;
    } else {
        cout << "비어있음";
    }
    return 0;
}`,
          options: ["값: 0", "값: nullptr", "비어있음", "에러"],
          answer: 2,
          explanation: "p가 nullptr이므로 else 분기가 실행돼서 '비어있음'이 출력돼요. nullptr을 역참조하지 않아서 안전해요!",
        },
        {
          id: "ch2-vs-ref",
          type: "explain",
          title: "🆚 참조 vs 포인터 — 언제 뭘 써요?",
          content: `경쟁 프로그래밍에서는 **참조**를 훨씬 많이 써요. 하지만 포인터를 이해해야 배열, 연결 리스트 등 고급 자료구조를 다룰 수 있어요!

참조로 전달 (권장):
\`\`\`cpp
void add10(int& n) { n += 10; }

int main() {
    int x = 5;
    add10(x);       // 그냥 x를 넘김
    cout << x;      // 출력 → 15
}
\`\`\`

포인터로 전달:
\`\`\`cpp
void add10ptr(int* p) { *p += 10; }

int main() {
    int x = 5;
    add10ptr(&x);   // x의 주소를 넘김
    cout << x;      // 출력 → 15
}
\`\`\`

| 기능 | 참조 (&) | 포인터 (*) |
|---|---|---|
| 초기화 | 선언 시 필수 | 나중에 가능 |
| nullptr | 불가 (항상 유효) | 가능 |
| 재지정 | 불가 | 가능 |
| 문법 | 더 간단 | 더 복잡 |
| 경쟁 프로그래밍 | 자주 사용 ✅ | 가끔 사용 |

💡 **실전 규칙:** 함수에 변수를 넘길 때는 참조(&)를 써요. 포인터는 개념 이해 정도면 충분하고, 경쟁 프로그래밍에서 직접 쓸 일은 거의 없어요.`,
        },
        {
          id: "ch2-vs-visual",
          type: "interactive",
          title: "🔬 참조 vs 포인터 — 메모리에서 어떻게 다를까?",
          content: "탭을 눌러 참조와 포인터가 메모리에서 어떻게 다른지 확인해봐요!",
          component: "pointerRefVisualizer",
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 포인터로 swap 함수 만들기!",
          content: `포인터를 이용해서 두 정수를 교환하는 \`swap\` 함수를 만들어봐요.

\`int temp = *a;\` 로 시작했으니 나머지를 채워보세요.`,
          starterCode: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    int temp = *a;
    // 나머지를 완성하세요

}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
          code: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
          expectedOutput: `20 10`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "참조 vs 포인터!",
          content: "참조(&)와 포인터(*)의 차이로 **올바른** 것은?",
          options: [
            "참조는 nullptr이 될 수 있지만, 포인터는 안 된다",
            "포인터는 nullptr이 될 수 있지만, 참조는 항상 유효한 변수를 가리킨다",
            "둘 다 완전히 같은 동작을 한다",
            "포인터는 const로 선언할 수 없다",
          ],
          answer: 1,
          explanation: "참조는 항상 유효한 변수를 가리켜야 하고 nullptr이 불가능해요. 포인터는 nullptr로 '아무것도 가리키지 않음'을 표현할 수 있어요!",
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
          title: "포인터 선언!",
          content: "`int x = 5;` 뒤에 `x`를 가리키는 포인터를 올바르게 선언한 것은?",
          options: [
            "int ptr = x;",
            "int& ptr = x;",
            "int* ptr = &x;",
            "int* ptr = x;"
          ],
          answer: 2,
          explanation: "int* ptr = &x;로 포인터를 선언해요! *는 포인터 타입, &x는 x의 주소를 가져오는 주소 연산자예요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "역참조 결과!",
          content: `이 코드의 출력은?

\`\`\`cpp
int a = 7;
int* p = &a;
*p = *p + 3;
cout << a;
\`\`\``,
          options: [
            "7",
            "10",
            "3",
            "에러"
          ],
          answer: 1,
          explanation: "*p는 a의 값(7)이에요. *p + 3 = 10을 a에 저장하므로 a는 10이 돼요!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "nullptr 안전 체크!",
          content: "포인터를 역참조하기 전에 해야 할 것은?",
          options: [
            "항상 바로 역참조한다",
            "nullptr인지 확인한다",
            "포인터를 정수로 변환한다",
            "포인터를 삭제한다"
          ],
          answer: 1,
          explanation: "nullptr인 포인터를 역참조하면 프로그램이 충돌해요(segfault)! 항상 `if (p != nullptr)` 로 확인한 후 사용해야 해요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "포인터로 함수 전달!",
          content: "`void f(int* p) { *p = 99; }` 를 올바르게 호출하는 방법은?",
          options: [
            "f(x);",
            "f(*x);",
            "f(&x);",
            "f(&&x);"
          ],
          answer: 2,
          explanation: "포인터를 받는 함수에는 주소(&x)를 넘겨야 해요! f(&x)로 x의 주소를 전달하면 함수 안에서 *p로 x를 수정할 수 있어요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

### 🎯 포인터 (Pointer)
- ✅ **포인터 선언** — \`int* ptr = &x;\` (x의 주소를 저장)
- ✅ **주소 연산자** — \`&x\` (x의 메모리 주소)
- ✅ **역참조 연산자** — \`*ptr\` (포인터가 가리키는 값)
- ✅ **nullptr** — C++11+, 아무것도 가리키지 않는 안전한 빈 포인터
- ✅ **참조 vs 포인터** — 참조는 null 불가·재지정 불가, 포인터는 null 가능·재지정 가능

| 연산 | 문법 | 의미 |
|---|---|---|
| 포인터 선언 | \`int* ptr;\` | 정수 주소를 저장하는 변수 |
| 주소 가져오기 | \`&x\` | x의 메모리 주소 |
| 역참조 | \`*ptr\` | ptr이 가리키는 곳의 값 |
| 빈 포인터 | \`nullptr\` | 아무것도 가리키지 않음 |

💡 **실전 팁:** 경쟁 프로그래밍에서는 참조(&)를 더 많이 써요. 포인터는 자료구조(연결 리스트 등)에 중요해요!

🚀 **다음 레슨:** 구조체 & 클래스 — 데이터를 묶어서 나만의 타입을 만들어봐요!`
        }
      ]
    }
  ]
}
