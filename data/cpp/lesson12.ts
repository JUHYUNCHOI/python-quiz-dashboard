// ============================================
// C++ Lesson 12: 참조와 함수
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson12Data: LessonData = {
  id: "cpp-12",
  title: "참조와 함수",
  emoji: "🔗",
  description: "참조(reference)와 포인터(pointer)로 원본을 직접 다뤄요!",
  chapters: [
    // ============================================
    // Chapter 1: 참조 (Reference)
    // ============================================
    {
      id: "ch1",
      title: "참조 (Reference)",
      emoji: "🏷️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🏷️ 참조(Reference)란?",
          component: "cppReferenceBuilder",
          content: `파이썬에서는 함수에 변수를 넘기면 알아서 잘 됐죠? C++은 달라요. **원본을 수정할지, 복사본을 쓸지** 직접 선택해야 해요. 이 차이를 모르면 함수가 생각대로 동작하지 않아요!

C++에서 **참조(reference)**는 변수의 **별명(alias)**이에요!

\`\`\`cpp
int x = 10;
int& ref = x;   // ref는 x의 별명!
\`\`\`

\`ref\`와 \`x\`는 완전히 같은 메모리를 가리켜요. \`ref\`를 바꾸면 \`x\`도 바뀌어요!

\`\`\`cpp
int x = 10;
int& ref = x;
ref = 20;        // ref를 바꾸면...
cout << x;       // x도 20! 같은 곳을 가리키니까요
\`\`\`

파이썬과 비교하면:

**파이썬 🐍:**
\`\`\`python
x = 10
ref = x       # 새로운 객체? 같은 객체?
ref = 20      # ref만 바뀌고, x는 여전히 10!
\`\`\`

파이썬에서 정수(int)는 immutable이라 \`ref = 20\`은 ref가 새 객체를 가리키는 거예요. 하지만 C++ 참조는 **항상 원본에 연결**돼 있어요!

| 파이썬 🐍 | C++ 참조 ⚡ |
|---|---|
| \`ref = x\` (값 복사 또는 객체 공유) | \`int& ref = x;\` (원본의 별명) |
| \`ref = 20\` → x 안 변함 (int) | \`ref = 20;\` → x도 변함! |
| 명시적이지 않음 | \`&\`로 참조임을 명시 |

💡 \`&\`는 "이 변수는 다른 변수의 별명이에요!"라는 뜻이에요!

💡 &는 여러 의미가 있어요! 여기서는 **참조(별명)**라는 뜻이에요. 나중에 **주소 연산자**로도 쓰이지만, 문맥에서 구분할 수 있어요.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "참조 변수 수정!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int& ref = x;\n    ref = 20;\n    cout << x;\n    return 0;\n}",
          options: ["10", "20", "0", "에러"],
          answer: 1,
          explanation: "ref는 x의 별명(참조)이에요! ref = 20은 곧 x = 20과 같아요. 그래서 x를 출력하면 20이 나와요."
        },
        {
          id: "ch1-const",
          type: "explain",
          title: "🔒 const 참조",
          content: `참조에 \`const\`를 붙이면 **읽기만 가능**해요!

\`\`\`cpp
int x = 10;
const int& ref = x;   // 읽기 전용 참조!

cout << ref;    // ✅ 읽기는 OK!
// ref = 20;    // ❌ 에러! const라서 수정 불가!
\`\`\`

큰 데이터(예: 1000글자 문자열)를 함수에 넘길 때, 복사하면 느려요. \`const string&\`로 넘기면 원본을 직접 읽되 수정은 못 하게 잠그는 거예요. 안전하면서 빨라요!

왜 const 참조를 쓰나요? 두 가지 이유가 있어요:

**1. 복사 안 해서 빠르다! (성능)**
\`\`\`cpp
string longText = "아주 긴 문자열...";

string copy = longText;        // 전체 복사! 느려요
const string& ref = longText;  // 참조만! 빨라요
\`\`\`

**2. 실수로 수정하는 걸 막는다! (안전)**
\`\`\`cpp
const string& ref = longText;
// ref = "바꾸기";  // ❌ 컴파일 에러! 안전!
\`\`\`

| 종류 | 읽기 | 수정 | 용도 |
|---|---|---|---|
| \`int& ref\` | ✅ | ✅ | 원본 수정할 때 |
| \`const int& ref\` | ✅ | ❌ | 빠르게 읽기만 |

💡 const 참조는 **함수 매개변수에서 아주 많이** 쓰여요! 다음 챕터에서 자세히 배울 거예요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "변수의 별명(참조)을 만들어봐요!",
          code: "int a = 42;\nint___ ref = a;\ncout << ref;",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "=", "@"] }
          ],
          explanation: "int& ref = a; 로 참조를 선언해요! &를 붙이면 ref는 a의 별명이 돼요."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 참조로 값 바꾸기 실험!",
          content: `참조 변수를 만들어서 원래 변수의 값을 바꿔보세요!

ref를 통해 값을 바꾸면, 원래 변수 x도 함께 바뀌는 걸 확인할 수 있어요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 100;
    int& ref = x;

    cout << "x = " << x << endl;
    cout << "ref = " << ref << endl;

    ref = 500;

    cout << "ref = 500 후:" << endl;
    cout << "x = " << x << endl;
    cout << "ref = " << ref << endl;

    return 0;
}`,
          expectedOutput: `x = 100
ref = 100
ref = 500 후:
x = 500
ref = 500`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "참조 기초!",
          content: "`int x = 5; int& ref = x;`에서 `ref`에 대한 설명으로 **맞는** 것은?",
          options: [
            "ref는 x의 복사본이다",
            "ref는 x의 별명(alias)이다",
            "ref는 x의 주소를 저장한다",
            "ref는 새로운 변수를 만든다"
          ],
          answer: 1,
          explanation: "참조(reference)는 원래 변수의 별명이에요! ref와 x는 같은 메모리를 공유해서, 하나를 바꾸면 다른 하나도 바뀌어요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 값 전달 vs 참조 전달
    // ============================================
    {
      id: "ch2",
      title: "값 전달 vs 참조 전달",
      emoji: "📞",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📞 함수에 값 전달하기 (Call by Value)",
          content: `C++에서 함수에 변수를 넘기면, 기본적으로 **값이 복사**돼요! 이걸 **Call by Value**라고 해요.

\`\`\`cpp
void tryChange(int x) {
    x = 99;   // 복사본을 바꾸는 것!
}

int main() {
    int num = 10;
    tryChange(num);
    cout << num;   // 여전히 10! 😱
}
\`\`\`

\`tryChange\`에 \`num\`을 넘기면, \`num\`의 **복사본**이 만들어져요. 함수 안에서 \`x\`를 바꿔도 원본 \`num\`은 그대로예요!

파이썬과 비교하면:

**파이썬 🐍:**
\`\`\`python
def try_change(x):
    x = 99      # 정수는 immutable!

num = 10
try_change(num)
print(num)      # 10 — 파이썬도 안 바뀜!
\`\`\`

파이썬에서도 정수(int)를 함수에 넘기면 원본이 안 바뀌어요. 정수가 immutable이라서요. 하지만 C++에서는 **모든 타입**이 기본적으로 복사돼요!

| 상황 | C++ (기본) | 파이썬 |
|---|---|---|
| int 넘기기 | 복사됨 (안 바뀜) | immutable (안 바뀜) |
| string 넘기기 | 복사됨 (안 바뀜) | 객체 참조 전달 |
| list/vector 넘기기 | 복사됨! (안 바뀜) | 객체 참조 전달 (바뀜!) |

💡 C++은 기본이 "복사"예요! 파이썬과 큰 차이가 나는 부분이에요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Call by Value!",
          code: "#include <iostream>\nusing namespace std;\nvoid tryChange(int x) {\n    x = 99;\n}\nint main() {\n    int num = 10;\n    tryChange(num);\n    cout << num;\n    return 0;\n}",
          options: ["99", "10", "0", "에러"],
          answer: 1,
          explanation: "Call by Value! 함수에 num의 복사본이 넘어가요. 함수 안에서 x를 99로 바꿔도 원본 num은 10 그대로예요."
        },
        {
          id: "ch2-ref",
          type: "explain",
          title: "🔗 참조 전달 (Call by Reference)",
          component: "cppCallByRefBuilder",
          content: `원본을 바꾸고 싶다면? **참조(&)**를 쓰면 돼요!

\`\`\`cpp
void change(int& x) {   // &를 추가!
    x = 99;   // 원본을 바꿈!
}

int main() {
    int num = 10;
    change(num);
    cout << num;   // 99! ✅
}
\`\`\`

\`int& x\`로 받으면, \`x\`는 원본 \`num\`의 **별명**이 돼요. \`x\`를 바꾸면 \`num\`도 바뀌죠!

이걸 활용한 대표적인 예: **swap 함수!**
\`\`\`cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y;  // 2 1
}
\`\`\`

파이썬에서는 \`x, y = y, x\` 한 줄이면 되지만, C++에서는 참조를 써서 swap 함수를 만들어야 해요.

| 방식 | 문법 | 원본 바뀜? |
|---|---|---|
| Call by Value | \`void f(int x)\` | ❌ |
| Call by Reference | \`void f(int& x)\` | ✅ |

💡 \`&\` 하나의 차이로 함수의 동작이 완전히 달라져요!

참조(&)와 포인터(*)는 비슷한 목적이지만 다른 도구예요. 참조는 '별명'이고, 포인터는 '주소를 저장하는 변수'예요. 바로 다음 챕터에서 포인터도 배워봐요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "참조로 원본 값을 바꿔봐요!",
          code: "void doubleIt(int___ n) {\n    n = n * 2;\n}\nint main() {\n    int x = 5;\n    doubleIt(x);\n    cout << x;  // 10\n}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "=", " "] }
          ],
          explanation: "int& n으로 참조 전달을 해야 원본 x가 바뀌어요! &가 없으면 복사본만 바뀌고 x는 5 그대로예요."
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "swap 함수!",
          code: "#include <iostream>\nusing namespace std;\nvoid swap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\nint main() {\n    int x = 3, y = 7;\n    swap(x, y);\n    cout << x << \" \" << y;\n    return 0;\n}",
          options: ["3 7", "7 3", "7 7", "에러"],
          answer: 1,
          explanation: "참조(&)로 받았으니 원본이 바뀌어요! temp=3, a=7, b=3 → x는 7, y는 3이 돼요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ swap 함수 + 벡터 2배 함수!",
          content: `참조를 활용하는 두 가지 함수를 연습해봐요!

1. swap 함수로 두 값을 교환하기
2. 벡터의 모든 원소를 2배로 만드는 함수 만들기

벡터를 참조로 받으면 원본 벡터가 수정돼요!

\`vector<int>&\`는 '정수 벡터의 참조'라는 뜻이에요. &가 있으니까 함수 안에서 원본 벡터를 직접 수정할 수 있어요!`,
          code: `#include <iostream>
#include <vector>
using namespace std;

void mySwap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

void doubleAll(vector<int>& v) {
    for (int& x : v) {
        x = x * 2;
    }
}

int main() {
    int a = 10, b = 20;
    mySwap(a, b);
    cout << "swap: " << a << " " << b << endl;

    vector<int> nums = {1, 2, 3, 4, 5};
    doubleAll(nums);
    cout << "double: ";
    for (int x : nums) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,
          expectedOutput: `swap: 20 10
double: 2 4 6 8 10 `
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Value vs Reference!",
          content: "`void f(int x)` 와 `void f(int& x)`의 차이는?",
          options: [
            "차이 없다",
            "int x는 복사본, int& x는 원본의 별명",
            "int x는 느리고, int& x는 빠르다",
            "int& x는 에러가 난다"
          ],
          answer: 1,
          explanation: "int x는 값의 복사본을 받고(Call by Value), int& x는 원본의 별명을 받아요(Call by Reference). &가 있으면 원본을 수정할 수 있어요!"
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    // ============================================
    // Chapter 3: 포인터 기초 (Pointer Basics)
    // ============================================
    {
      id: "ch3",
      title: "포인터 기초",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-ptr-intro",
          type: "explain",
          title: "🎯 포인터(Pointer) — 주소를 저장하는 변수!",
          content: `참조(&)는 변수의 '별명'이었죠? **포인터(*)는 변수의 주소(메모리 위치)를 저장하는 변수**예요!

\`\`\`cpp
int x = 42;

// 참조: 별명
int& ref = x;   // ref는 x의 다른 이름

// 포인터: 주소 저장
int* ptr = &x;  // ptr은 x의 주소를 저장
\`\`\`

**핵심 연산자 두 가지:**

| 연산자 | 이름 | 하는 일 |
|---|---|---|
| \`&\` | 주소 연산자 | 변수의 주소를 가져와요 |
| \`*\` | 역참조 연산자 | 주소에 저장된 값을 가져와요 |

\`\`\`cpp
int x = 42;
int* ptr = &x;    // ptr = x의 주소 (예: 0x1234)

cout << ptr;     // 주소 출력 (0x1234 같은 값)
cout << *ptr;    // 역참조: 42 출력
cout << &x;      // x의 주소 출력

*ptr = 100;      // 역참조로 값 변경!
cout << x;       // 100 (x가 바뀌었어요!)
\`\`\`

**nullptr — 아무것도 가리키지 않는 포인터 (C++11):**

\`\`\`cpp
int* p = nullptr;  // 빈 포인터 (C++11 이후)
// int* p = NULL;   // 옛날 방식 (비권장)

if (p != nullptr) {
    cout << *p;    // nullptr이면 접근하면 안 돼요!
}
\`\`\`

💡 포인터와 참조의 차이:
- **참조**: 항상 유효한 변수를 가리킴, nullptr 불가, 재지정 불가
- **포인터**: nullptr 가능, 다른 변수를 가리키도록 변경 가능`,
        },
        {
          id: "ch3-ptr-pred1",
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
          options: ["10", "99", "0", "에러"],
          answer: 1,
          explanation: "*p = 99는 p가 가리키는 변수(x)의 값을 99로 바꿔요! 포인터로 원본을 수정할 수 있어요.",
        },
        {
          id: "ch3-ptr-q1",
          type: "quiz",
          title: "포인터 기본!",
          content: "`int* ptr = &x;` 에서 `*ptr`이 반환하는 것은?",
          options: [
            "ptr 변수 자체의 주소",
            "x의 주소",
            "x의 값",
            "포인터의 크기",
          ],
          answer: 2,
          explanation: "*ptr은 역참조(dereference)입니다. 포인터가 가리키는 곳의 값, 즉 x의 값을 반환해요!",
        },
        {
          id: "ch3-ptr-vs-ref",
          type: "explain",
          title: "🆚 참조 vs 포인터",
          content: `경쟁 프로그래밍에서는 **참조**를 훨씬 많이 써요. 하지만 포인터를 이해해야 배열, 연결 리스트 등 고급 자료구조를 다룰 수 있어요!

\`\`\`cpp
// 참조로 전달 (권장 — 더 안전)
void add10(int& n) { n += 10; }

// 포인터로 전달 (저수준 제어 필요할 때)
void add10(int* p) { *p += 10; }

int main() {
    int x = 5;
    add10(x);     // 참조 호출: 그냥 x
    add10(&x);    // 포인터 호출: x의 주소
    cout << x;    // 25
}
\`\`\`

| 기능 | 참조 | 포인터 |
|---|---|---|
| 초기화 | 필수 | 나중에 가능 |
| nullptr | 불가 | 가능 |
| 재지정 | 불가 | 가능 |
| 경쟁 프로그래밍 | 자주 사용 ✅ | 가끔 사용 |

💡 **권장:** C++11 이후에는 포인터 대신 참조나 **스마트 포인터**를 써요!`,
        },
        {
          id: "ch3-ptr-q2",
          type: "quiz",
          title: "참조 vs 포인터!",
          content: "참조(&)와 포인터(*)의 차이로 올바른 것은?",
          options: [
            "참조는 nullptr이 될 수 있지만, 포인터는 안 된다",
            "포인터는 nullptr이 될 수 있지만, 참조는 항상 유효한 변수를 가리킨다",
            "둘 다 같은 동작을 한다",
            "포인터는 const로 선언할 수 없다",
          ],
          answer: 1,
          explanation: "참조는 항상 유효한 변수를 가리켜야 하고 nullptr이 불가능해요. 포인터는 nullptr로 '아무것도 가리키지 않음'을 표현할 수 있어요!",
        },
      ]
    },
    {
      id: "ch4",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch4-q1",
          type: "quiz",
          title: "참조 선언!",
          content: "`int x = 5;` 뒤에 `x`의 참조를 만드는 올바른 코드는?",
          options: [
            "int ref = x;",
            "int& ref = x;",
            "int* ref = x;",
            "ref int = x;"
          ],
          answer: 1,
          explanation: "int& ref = x;로 참조를 선언해요! &를 타입 뒤에 붙이는 게 참조 문법이에요."
        },
        {
          id: "ch4-q2",
          type: "quiz",
          title: "함수 매개변수!",
          content: `이 코드의 출력은?

\`\`\`cpp
void add10(int& n) { n += 10; }
int main() {
    int x = 5;
    add10(x);
    add10(x);
    cout << x;
}
\`\`\``,
          options: [
            "5",
            "15",
            "25",
            "에러"
          ],
          answer: 2,
          explanation: "참조(&)로 받으니 원본이 바뀌어요! 첫 번째 호출: 5→15, 두 번째 호출: 15→25. 최종 x는 25예요."
        },
        {
          id: "ch4-q3",
          type: "quiz",
          title: "const 참조!",
          content: "`const int& ref = x;`에서 할 수 **없는** 것은?",
          options: [
            "ref의 값을 읽기",
            "cout << ref; 로 출력하기",
            "ref = 100; 으로 값 바꾸기",
            "ref를 다른 변수와 비교하기"
          ],
          answer: 2,
          explanation: "const 참조는 읽기 전용이에요! 값을 읽거나 비교는 되지만, ref = 100처럼 수정하면 컴파일 에러가 나요."
        },
        {
          id: "ch4-q4",
          type: "quiz",
          title: "벡터와 참조!",
          content: "큰 벡터를 함수에 넘길 때, `void f(vector<int> v)` 대신 `void f(const vector<int>& v)`를 쓰는 이유는?",
          options: [
            "문법이 더 간단해서",
            "벡터를 수정할 수 있어서",
            "복사하지 않아서 빠르고, 실수로 수정하는 것도 방지",
            "에러가 안 나서"
          ],
          answer: 2,
          explanation: "const 참조(&)로 받으면 큰 벡터를 복사하지 않아서 빠르고, const라서 실수로 수정하는 것도 막아줘요! 일석이조예요."
        },
        {
          id: "ch4-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

### 📌 참조 (Reference)
- ✅ **참조** — \`int& ref = x;\`로 변수의 별명(alias)을 만들어요
- ✅ **const 참조** — \`const int& ref = x;\`는 읽기만 가능, 복사 없이 빠르게!
- ✅ **Call by Value** — \`void f(int x)\` 복사본이 넘어가서 원본 안 바뀜
- ✅ **Call by Reference** — \`void f(int& x)\` 원본의 별명이 넘어가서 원본 바뀜

| 매개변수 방식 | 문법 | 원본 수정? | 복사 비용? |
|---|---|---|---|
| Call by Value | \`void f(int x)\` | ❌ | 있음 |
| Call by Reference | \`void f(int& x)\` | ✅ | 없음 |
| const Reference | \`void f(const int& x)\` | ❌ | 없음 |

### 🎯 포인터 (Pointer)
- ✅ **포인터 선언** — \`int* ptr = &x;\` (x의 주소를 저장)
- ✅ **역참조** — \`*ptr\`로 포인터가 가리키는 값에 접근
- ✅ **nullptr** — C++11+, 아무것도 가리키지 않는 안전한 null 포인터
- ✅ **참조 vs 포인터** — 참조는 null 불가·재지정 불가, 포인터는 null 가능·재지정 가능

💡 **규칙:** 수정해야 하면 \`&\`, 읽기만 하면 \`const &\`, 저수준 제어가 필요하면 포인터!

🚀 **다음 레슨:** 재귀(Recursion) — 함수가 자기 자신을 호출하는 강력한 기법!`
        }
      ]
    }
  ]
}
