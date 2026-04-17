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
          component: "cppVariableBuilder",
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
→ 컴파일할 때 타입을 확인하면 실수를 미리 잡을 수 있어요! 파이썬은 실행해봐야만 에러를 알 수 있지만, C++은 프로그램을 만들 때 바로 잡아줘요.

![파이썬 vs C++ 메모리 구조](/images/cpp/variable-memory.svg)

💡 C++은 변수를 선언하는 순간 **메모리 크기가 확정**돼요. int는 4바이트, double은 8바이트, char는 1바이트. 파이썬은 이걸 알아서 처리하지만, C++은 프로그래머가 직접 정해줘요!`
        },
        {
          id: "ch1-typefix",
          type: "explain",
          title: "타입을 정하면 바꿀 수 없어요!",
          content: `파이썬에서는 \`x = 10\` 했다가 \`x = "hello"\`로 바꿔도 됐죠. C++에서는 **불가능**해요!

\`\`\`cpp
int x = 10;
x = "hello";   // ❌ 컴파일 에러!
\`\`\`

처음에 정한 타입은 영원히 고정이에요. int 상자에는 정수만, string 상자에는 문자열만 들어가요!

**왜 C++은 이렇게 엄격할까요?** 🤔
변수를 만들 때 C++은 **메모리 공간을 미리 예약**해요. \`int\`는 4바이트, \`double\`은 8바이트 — 타입마다 필요한 공간이 달라요. 타입이 바뀔 수 있으면 예약한 공간이 맞지 않게 되거든요!

💡 불편해 보이지만, 실수를 **프로그램이 실행되기 전에** 잡아줘요! 다음에서 각 타입이 실제로 얼마나 메모리를 쓰는지 확인해봐요 →`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 C++의 주요 타입 5가지",
          component: "memoryTypeVisualizer",
          content: `자주 쓰는 타입을 정리해볼게요!

| C++ 타입 | 의미 | 예시 |
|----------|------|------|
| \`int\` | 정수 | \`int age = 14;\` |
| \`double\` | 소수 (실수) | \`double pi = 3.14;\` |
| \`string\` | 문자열 | \`string name = "주현";\` |
| \`char\` | 글자 1개 | \`char grade = 'A';\` |
| \`bool\` | 참/거짓 | \`bool pass = true;\` |

가장 많이 쓰는 건 **int, double, string** 이 3개예요!

⚠️ **string을 쓰려면** 맨 위에 \`#include <string>\`을 추가해야 해요!
\`\`\`cpp
#include <iostream>
#include <string>    // ← string 타입을 쓰려면 필수!
\`\`\`
int, double, char, bool은 기본 내장이라 별도 include가 필요 없지만, **string은 라이브러리**에서 가져와야 해요.

타입마다 **메모리를 차지하는 크기**가 달라요. 아래에서 각 타입이 몇 바이트를 쓰는지 눈으로 확인해보세요! 👇

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x = 10\` (타입 자동) | \`int x = 10;\` (타입 명시) |
| \`True / False\` (대문자) | \`true / false\` (소문자!) |

💡 파이썬의 True/False는 대문자, C++의 true/false는 **소문자**예요!`
        },
        {
          id: "ch1-longlong",
          type: "explain",
          title: "🔢 int보다 더 큰 수 — long long",
          content: `**int의 한계**: int는 약 ±21억(약 2.1 × 10^9)까지 담을 수 있어요. 그 이상은 담지 못해요 (오버플로우).

\`\`\`cpp
int n = 10000000000;  // ❌ int 한계 초과 — 엉뚱한 값
\`\`\`

**long long**: 약 ±9.2 × 10^18 까지 담을 수 있는 큰 정수 타입이에요.

\`\`\`cpp
long long big = 10000000000;   // ✅ 100억, 정상
long long fact = 1;
for (int i = 1; i <= 20; i++) fact *= i;  // 20! = 약 2.4 × 10^18
cout << fact << endl;
\`\`\`

💡 **언제 쓰나**: factorial, 여러 수의 곱, 누적 합이 클 때. 보통 \`int\` 쓰고, 오버플로우 위험이 있으면 \`long long\`.`
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
          component: "cppCharBuilder",
          content: `\`\`\`cpp
char grade = 'A';       // 작은따옴표 → 글자 1개
string name = "주현";   // 큰따옴표 → 문자열
\`\`\`

| 따옴표 | 타입 | 예시 |
|--------|------|------|
| 작은따옴표 \`' '\` | **char** (1글자) | \`'A'\`, \`'7'\` |
| 큰따옴표 \`" "\` | **string** (문자열) | \`"Hello"\`, \`"A"\` |

💭 \`char x = 'AB';\` 라고 쓰면? → **에러**예요! char는 딱 1글자만!

파이썬에서는 \`' '\`이랑 \`" "\`이 똑같지만, C++에서는 **완전히 다른 타입**이에요!

💡 char는 왜 따로 있을까요? 글자 하나는 메모리 1바이트만 차지해요. 100만 개의 글자를 저장할 때 string보다 훨씬 효율적이에요!`
        },
        {
          id: "ch1-ascii",
          type: "explain",
          title: "🔢 char의 비밀 — 사실 숫자야!",
          content: `char는 내부적으로 **정수(숫자)** 로 저장돼요. 각 글자마다 고유한 번호가 있는데, 이걸 **ASCII 코드**라고 해요.

\`\`\`cpp
char c = 'A';
cout << c << endl;        // A
cout << (int)c << endl;   // 65 ← 'A'의 ASCII 코드
\`\`\`

자주 쓰는 ASCII 코드:
| 글자 | ASCII |
|------|-------|
| \`'A'\` | 65 |
| \`'Z'\` | 90 |
| \`'a'\` | 97 |
| \`'z'\` | 122 |
| \`'0'\` | 48 |

💡 \`(int)c\` 처럼 앞에 타입을 적으면 char를 숫자로 바꿔서 출력할 수 있어요. 이게 바로 **형변환(casting)** 이에요!`,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ RPG 캐릭터 정보를 출력해보세요!",
          content: `지금까지 배운 int, double, string을 사용해서 RPG 캐릭터 정보를 출력하는 프로그램을 만들어봐요!

`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "슬라임";
    int hp = 100;
    int attack = 25;
    int level = 3;

    cout << "이름: " << name << endl;
    cout << "HP: " << hp << endl;
    cout << "공격력: " << attack << endl;
    cout << "레벨: " << level << endl;

    return 0;
}`,
          expectedOutput: `이름: 슬라임
HP: 100
공격력: 25
레벨: 3`
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

💡 const = **절대 안 바뀌는 값**. 원주율(π)처럼 고정된 값에 쓰면 딱이에요!

const로 선언하면 실수로 값을 바꾼 경우를 컴파일러가 잡아줘요! 원주율 같은 고정값은 const로 보호하세요.

예를 들어 게임에서 중력값 \`const double GRAVITY = 9.8;\`로 정해두면, 실수로 \`GRAVITY = 0;\`을 쓰면 **컴파일러가 바로 에러**를 내요. const 없이는 프로그램이 이상하게 동작해도 원인을 찾기 어려워요.`
        },
        {
          id: "ch2-division-trap",
          type: "explain",
          title: "⚠️ 함정: 정수 나눗셈",
          content: `C++에서 int끼리 나누면 소수점이 **버려져요**!

7 / 2 = 3.5가 아니라 **3**이 됩니다.

왜? int끼리의 연산 결과도 int이기 때문이에요.

소수점 결과를 원한다면? 방법이 두 가지예요:

\`7.0 / 2\` → \`3.5\` ✅ (숫자를 double로 쓰기)
\`(double)7 / 2\` → \`3.5\` ✅ (타입 캐스팅)`
        },
        {
          id: "ch2-casting",
          type: "explain",
          title: "🔧 형변환 (Casting)",
          content: `**형변환(Casting)** 이란 변수나 값의 타입을 내가 원하는 타입으로 **직접 바꾸는 것**이에요.

문법은 간단해요:
\`\`\`cpp
(바꿀_타입) 값
\`\`\`

**① int ↔ double 캐스팅**
\`\`\`cpp
int a = 7, b = 2;
double result = (double)a / b;  // 3.5 ✅
// (double)a 먼저 → 7.0이 됨 → 7.0 / 2 = 3.5
\`\`\`

주의! 괄호 위치가 중요해요:
\`\`\`cpp
(double)(a / b)  // ❌ 3.0  → 나눗셈이 먼저 일어남
(double)a / b    // ✅ 3.5  → a만 먼저 변환 후 나눗셈
\`\`\`

**② char ↔ int 캐스팅**
\`\`\`cpp
char c = 'A';
cout << (int)c << endl;   // 65  (char → int: ASCII 코드 출력)

int n = 66;
cout << (char)n << endl;  // B   (int → char: ASCII 코드 → 글자)
\`\`\`

💡 파이썬의 \`ord('A')\` = 65, \`chr(66)\` = 'B' 와 같은 개념이에요!`,
        },
        {
          id: "ch2-precision",
          type: "explain",
          title: "🎯 소수점 자리수 고정 — setprecision",
          content: `\`double\` 값을 출력하면 기본은 6자리 유효숫자예요:

\`\`\`cpp
cout << 3.14159265 << endl;  // 3.14159
\`\`\`

**소수점 N자리까지 고정**하려면 \`<iomanip>\` 헤더와 \`fixed << setprecision(N)\` 을 씁니다.

\`\`\`cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double pi = 3.14159265;
    cout << fixed << setprecision(2) << pi << endl;  // 3.14
    cout << fixed << setprecision(4) << pi << endl;  // 3.1416
}
\`\`\`

💡 **fixed**: 소수점 아래 자리수를 고정하는 모드 (지수 표기법 X)
💡 **setprecision(N)**: 소수점 아래 N자리까지 표시
💡 한 번 설정하면 이후 모든 출력에 적용됩니다.`
        },
        {
          id: "ch2-casting-q1",
          type: "quiz",
          title: "캐스팅 퀴즈!",
          content: `다음 코드의 출력 결과는?\n\n\`\`\`cpp\nint a = 5, b = 2;\ncout << (double)a / b << endl;\n\`\`\``,
          options: ["2", "2.5", "2.0", "에러"],
          answer: 1,
          explanation: "(double)a로 a가 5.0으로 변환된 후 b(=2)로 나눠요. 5.0 / 2 = 2.5! (double)(a/b)였다면 2.0이 됩니다."
        },
        {
          id: "ch2-casting-q2",
          type: "quiz",
          title: "char 캐스팅!",
          content: `다음 코드의 출력 결과는?\n\n\`\`\`cpp\n// 참고: 'A' = 65\nint n = 66;\ncout << (char)n << endl;\n\`\`\``,
          options: ["66", "B", "A", "에러"],
          answer: 1,
          explanation: "(char)66은 ASCII 코드 66에 해당하는 글자 'B'를 출력해요. 'A'=65, 'B'=66, 'C'=67 순서예요."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "함정 주의! 🕳️",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    double result = 7 / 2;\n    cout << result << endl;\n    return 0;\n}",
          options: ["3.5", "3", "3.0", "에러"],
          answer: 1,
          explanation: "7과 2는 둘 다 int이므로 7/2 = 3 (정수 나눗셈)이 먼저 일어나요! 그 결과 3이 double에 들어가서 내부적으로는 3.0이지만, cout은 소수점 뒤가 0이면 그냥 3으로 출력해요. 3.5를 원하면 7.0 / 2 또는 (double)7 / 2로 써야 해요!"
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "🔄 타입 변환",
          component: "cppTypeConvertBuilder",
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
          title: "✋ 데미지 계산기!",
          content: `아래 두 변수가 이미 선언되어 있어요:

\`\`\`cpp
string rawDamage = "25";      // 문자열로 된 기본 데미지
string rawMultiplier = "1.5"; // 문자열로 된 배율
\`\`\`

1. \`rawDamage\`를 정수로 변환해서 2배한 값을 출력하세요 (25 × 2 = 50)
2. \`rawMultiplier\`를 실수로 변환해서 2배한 값을 출력하세요 (1.5 × 2 = 3)
3. 계산한 데미지(50)를 \`to_string()\`으로 문자열로 변환하고, **문자열 연결(+)** 로 \`"의 데미지!"\`을 붙여서 출력하세요

💡 **힌트** — 변수를 그대로 함수에 넣으면 돼요:
\`\`\`cpp
int dmg = stoi(rawDamage);        // rawDamage 문자열 → 정수
double mult = stod(rawMultiplier); // rawMultiplier 문자열 → 실수
\`\`\`
문자열 연결: 숫자를 문자열에 붙이려면 먼저 \`to_string()\`으로 변환하세요:
\`\`\`cpp
cout << to_string(dmg * 2) + "의 데미지!" << endl;
\`\`\``,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string rawDamage = "25";
    string rawMultiplier = "1.5";

    // 여기에 코드를 작성하세요

    return 0;
}`,
          expectedOutput: `50
3
50의 데미지!`
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
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "const 이해하기!",
          content: `다음 코드에서 에러가 발생하는 줄은?\n\n\`\`\`cpp\nconst double PI = 3.14;\ndouble r = 5.0;\nPI = 3.14159;\ncout << PI * r * r << endl;\n\`\`\``,
          options: [
            "1번 줄 (const double PI = 3.14;)",
            "2번 줄 (double r = 5.0;)",
            "3번 줄 (PI = 3.14159;)",
            "4번 줄 (cout << PI * r * r;)"
          ],
          answer: 2,
          explanation: "const로 선언한 PI는 값을 바꿀 수 없어요! 3번 줄에서 PI에 새 값을 넣으려고 해서 컴파일 에러가 발생해요."
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "정수 나눗셈 함정!",
          content: `다음 코드의 출력 결과는?\n\n\`\`\`cpp\nint a = 5;\nint b = 2;\ncout << a / b << endl;\n\`\`\``,
          options: [
            "2.5",
            "2",
            "3",
            "에러"
          ],
          answer: 1,
          explanation: "int끼리 나누면 소수점이 버려져요! 5 / 2 = 2.5가 아니라 2가 됩니다. 2.5를 원하면 5.0 / 2 또는 (double)5 / 2로 써야 해요!"
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
