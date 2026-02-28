// ============================================
// C++ 레슨 3: 변수와 타입
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================

import { LessonData } from '../types'

export const cppLesson3Data: LessonData = {
  id: "cpp-3",
  title: "변수와 타입",
  emoji: "📦",
  description: "int, double, string — 타입을 직접 정해요!",
  chapters: [
    // ============================================
    // Chapter 1: int / double / string 선언
    // ============================================
    {
      id: "ch1",
      title: "타입을 직접 정하자!",
      emoji: "🆚",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 파이썬과 뭐가 달라요?",
          content: `파이썬에서는 \`x = 10\` 하면 끝이었죠?
C++은 달라요! **변수를 만들 때 타입을 직접 정해줘야** 해요.

**파이썬 🐍** — 타입 자동
\`\`\`python
x = 10         # 알아서 정수
x = "안녕"     # 문자열로 바꿔도 OK
\`\`\`

**C++ ⚡** — 타입 직접 지정
\`\`\`cpp
int x = 10;         // "이건 정수야!"
x = 20;             // OK! 정수끼리는 가능
// x = "안녕";      // ❌ 에러! 정수 변수에 문자열 못 넣어!
\`\`\`

왜 이렇게 엄격할까요? 🤔
→ 실수를 **컴파일할 때** 바로 잡아줘서 좋아요! 파이썬은 실행해봐야 에러를 알 수 있잖아요.

💡 C++의 변수 = **타입이 정해진 상자**. 정수 상자에는 정수만 넣을 수 있어요!`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 C++의 주요 타입 5가지",
          content: `자주 쓰는 타입을 정리해볼게요!

| C++ 타입 | 의미 | 예시 |
|----------|------|------|
| \`int\` | 정수 | \`int age = 14;\` |
| \`double\` | 소수 (실수) | \`double pi = 3.14;\` |
| \`string\` | 문자열 | \`string name = "주현";\` |
| \`char\` | 글자 1개 | \`char grade = 'A';\` |
| \`bool\` | 참/거짓 | \`bool pass = true;\` |

가장 많이 쓰는 건 **int, double, string** 이 3개예요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x = 10\` (타입 자동) | \`int x = 10;\` (타입 명시) |
| \`True / False\` (대문자) | \`true / false\` (소문자!) |

💡 파이썬의 True/False는 대문자, C++의 true/false는 **소문자**예요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "이건 뭘까?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    x = 20;\n    cout << x << endl;\n    return 0;\n}',
          options: ["10", "20", "에러"],
          answer: 1,
          explanation: "int x에 10을 넣고, 다시 20을 넣었어요. 같은 타입(정수)끼리는 값을 바꿀 수 있어요!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "알맞은 타입으로 변수를 선언해봐요!",
          code: "___ age = 14;\n___ pi = 3.14;\n___ name = \"주현\";",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "double", "string", "char"] },
            { id: 1, answer: "double", options: ["int", "double", "string", "char"] },
            { id: 2, answer: "string", options: ["int", "double", "string", "char"] }
          ],
          explanation: "정수는 int, 소수는 double, 문자열은 string으로 선언해요!"
        },
        {
          id: "ch1-char",
          type: "explain",
          title: "🔤 char vs string — 따옴표가 달라요!",
          content: `\`\`\`cpp
char grade = 'A';       // 작은따옴표 → 글자 1개
string name = "주현";   // 큰따옴표 → 문자열
\`\`\`

| 따옴표 | 타입 | 예시 |
|--------|------|------|
| 작은따옴표 \`' '\` | **char** (1글자) | \`'A'\`, \`'7'\` |
| 큰따옴표 \`" "\` | **string** (문자열) | \`"Hello"\`, \`"A"\` |

💭 \`char x = 'AB';\` 라고 쓰면? → **에러**예요! char는 딱 1글자만!

파이썬에서는 \`' '\`이랑 \`" "\`이 똑같지만, C++에서는 **완전히 다른 타입**이에요!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 변수를 직접 만들어보세요!",
          content: `지금까지 배운 int, double, string을 사용해서 자기소개를 출력하는 프로그램을 만들어봐요!

에디터에서 아래 코드를 **직접 입력**하고 컴파일해서 실행해보세요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "주현";
    int age = 14;
    double height = 165.5;

    cout << "이름: " << name << endl;
    cout << "나이: " << age << "살" << endl;
    cout << "키: " << height << "cm" << endl;

    return 0;
}`,
          expectedOutput: `이름: 주현
나이: 14살
키: 165.5cm`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "타입 맞추기!",
          content: `C++에서 소수(실수)를 저장하는 타입은?`,
          options: [
            "int",
            "char",
            "double",
            "bool"
          ],
          answer: 2,
          explanation: "double은 소수(실수)를 저장하는 타입이에요! int는 정수만, char는 글자 1개, bool은 참/거짓!"
        }
      ]
    },
    // ============================================
    // Chapter 2: 선언, const, 타입 변환
    // ============================================
    {
      id: "ch2",
      title: "타입의 규칙들",
      emoji: "✏️",
      steps: [
        {
          id: "ch2-declare",
          type: "explain",
          title: "📝 선언과 초기화",
          content: `변수를 만드는 두 가지 방법이 있어요!

\`\`\`cpp
int age;           // 선언만 (빈 상자 만들기)
age = 14;          // 나중에 값 넣기

int score = 100;   // 선언 + 초기화 한 번에! (추천! ✅)
\`\`\`

값을 바꾸면 안 되는 변수는 **const**를 붙여요:
\`\`\`cpp
const double PI = 3.14159;
// PI = 0;  // ❌ 컴파일 에러! 바꿀 수 없어요
\`\`\`

파이썬은 상수 문법이 없지만, C++은 const로 **컴파일러가 지켜줘요**!

💡 const = **절대 안 바뀌는 값**. 원주율(π)처럼 고정된 값에 쓰면 딱이에요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "함정 주의! 🕳️",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    double result = 7 / 2;\n    cout << result << endl;\n    return 0;\n}",
          options: ["3.5", "3", "3.0", "에러"],
          answer: 1,
          explanation: "7과 2는 둘 다 int이므로 7/2 = 3 (정수 나눗셈)이 먼저 일어나요! 그 결과 3이 double에 들어가서 내부적으로는 3.0이지만, cout은 소수점 뒤가 0이면 그냥 3으로 출력해요. 3.5를 원하면 7.0 / 2로 써야 해요!"
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "🔄 타입 변환",
          content: `**자동 변환** — 작은 타입 → 큰 타입은 자동!
\`\`\`cpp
int a = 10;
double b = a;  // int → double 자동! (내부적으로 10.0이지만 cout은 10으로 출력)
\`\`\`

**문자열 ↔ 숫자 변환** — 함수를 써야 해요!
\`\`\`cpp
int num = stoi("123");       // string → int
double dec = stod("3.14");   // string → double
string s = to_string(456);   // int → string "456"
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`int("123")\` | \`stoi("123")\` |
| \`float("3.14")\` | \`stod("3.14")\` |
| \`str(456)\` | \`to_string(456)\` |

💡 stoi = **s**tring **to** **i**nt 의 약자예요! 이름만 기억하면 쉬워요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "문자열과 숫자를 변환하는 함수를 써봐요!",
          code: "int num = ___(\"42\");\nstring s = ___(100);",
          fillBlanks: [
            { id: 0, answer: "stoi", options: ["stoi", "int", "toInt", "parseInt"] },
            { id: 1, answer: "to_string", options: ["to_string", "str", "string", "toString"] }
          ],
          explanation: "stoi = string to int, to_string = 숫자를 문자열로! 파이썬의 int()와 str()에 대응해요."
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "자동 변환 테스트!",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    double b = a;\n    cout << b << endl;\n    return 0;\n}",
          options: ["10", "10.0", "에러", "0"],
          answer: 0,
          explanation: "int 10이 double로 자동 변환돼요. cout은 소수점 뒤가 .0이면 생략해서 10이 출력돼요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 타입 변환을 직접 해보세요!",
          content: `stoi, stod, to_string을 활용해서 문자열과 숫자를 변환해봐요!

직접 실행해보고, 숫자나 문자열을 바꿔가면서 결과를 확인해보세요!`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string numStr = "42";
    int num = stoi(numStr);
    cout << num + 8 << endl;

    double pi = stod("3.14");
    cout << pi * 2 << endl;

    string result = to_string(100) + "점";
    cout << result << endl;

    return 0;
}`,
          expectedOutput: `50
6.28
100점`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "타입 변환 함수!",
          content: `파이썬의 \`int("42")\`에 해당하는 C++ 코드는?`,
          options: [
            `int("42")`,
            `stoi("42")`,
            `toInt("42")`,
            `parseInt("42")`
          ],
          answer: 1,
          explanation: "C++에서 문자열을 정수로 바꾸는 함수는 stoi(string to int)예요! 파이썬의 int()에 해당해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🧪",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "파이썬 → C++ 변환",
          content: `파이썬 코드 \`name = "주현"\`을 C++로 바꾸면?`,
          options: [
            `char name = "주현";`,
            `string name = "주현";`,
            `str name = "주현";`,
            `text name = "주현";`
          ],
          answer: 1,
          explanation: "C++에서 문자열 타입은 string이에요! char는 글자 1개만, str이나 text라는 타입은 C++에 없어요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "변수 선언 문법",
          content: `다음 중 올바른 C++ 변수 선언은?`,
          options: [
            "x = 10;",
            "int x = 10;",
            "var x = 10;",
            "let x = 10;"
          ],
          answer: 1,
          explanation: "C++에서는 반드시 타입(int)을 앞에 써야 해요! var는 C++에서 다른 의미고, let은 JavaScript 문법이에요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "char vs string",
          content: `다음 중 올바른 C++ 코드는?`,
          options: [
            `char grade = "A";`,
            `char grade = 'AB';`,
            `char grade = 'A';`,
            `char grade = A;`
          ],
          answer: 2,
          explanation: "char 타입은 작은따옴표 ' '로 감싸고, 반드시 글자 1개만 넣을 수 있어요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "const 이해하기",
          content: `다음 코드의 결과는?

\`\`\`cpp
const int MAX = 100;
MAX = 200;
cout << MAX << endl;
\`\`\``,
          options: [
            "100",
            "200",
            "컴파일 에러!",
            "0"
          ],
          answer: 2,
          explanation: "const로 선언한 변수는 값을 바꿀 수 없어요! MAX = 200; 에서 컴파일 에러가 발생해요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **타입 지정** — C++은 변수 만들 때 타입을 직접 써줘요
- ✅ **int** — 정수, **double** — 소수, **string** — 문자열
- ✅ **char** — 글자 1개 (작은따옴표!), **bool** — 참/거짓
- ✅ **const** — 값을 절대 못 바꾸는 변수
- ✅ **정수 나눗셈 함정** — int끼리 나누면 소수점이 날아가요!
- ✅ **타입 변환** — stoi(), stod(), to_string()

🚀 **다음 시간: cout 심화 & namespace** — cout으로 이것저것 출력하고, std의 정체를 파헤쳐요!`
        }
      ]
    }
  ]
}
