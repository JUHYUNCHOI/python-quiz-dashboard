// ============================================
// C++ 레슨 5: 연산자
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================
import { LessonData } from '../types'

export const cppLesson5Data: LessonData = {
  id: "cpp-5",
  title: "연산자",
  emoji: "🔢",
  description: "C++의 연산자, 파이썬과 뭐가 다를까?",
  chapters: [
    // ============================================
    // Chapter 1: 산술 연산자
    // ============================================
    {
      id: "ch1",
      title: "산술 연산자",
      emoji: "➕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "➕ 기본 산술 연산자",
          content: `C++에서도 파이썬처럼 \`+\`, \`-\`, \`*\`, \`/\` 를 쓸 수 있어요!

\`\`\`cpp
int a = 10 + 3;   // 13
int b = 10 - 3;   // 7
int c = 10 * 3;   // 30
\`\`\`

더하기, 빼기, 곱하기는 파이썬과 **완전히 똑같아요**! 👍

하지만... **나눗셈**에서 큰 차이가 있어요! 😱`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "이건 쉽죠?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 5 + 3;\n    return 0;\n}",
          options: ["8", "53", "5 + 3", "에러"],
          answer: 0,
          explanation: "정수끼리의 덧셈! 5 + 3 = 8이에요."
        },
        {
          id: "ch1-division",
          type: "explain",
          title: "⚠️ 정수 나눗셈의 함정!",
          component: "cppIntDivisionBuilder",
          content: `**왜 5 / 2 = 2가 될까요?** 🤔

C++은 메모리를 아끼기 위해 \`int\`끼리 계산하면 결과도 \`int\`로 만들어요.
소수점을 저장할 공간이 없으니 그냥 잘라버리는 거예요!

파이썬과 C++의 **가장 큰 차이점**이에요!

**파이썬 🐍:** \`5 / 2\` → \`2.5\` ✅
**C++ ⚡:** \`5 / 2\` → \`2\` 😱 (소수점이 버려짐!)

\`\`\`cpp
cout << 5 / 2;     // 2 (정수끼리 = 정수 결과!)
cout << 5.0 / 2;   // 2.5 (하나라도 실수면 OK!)
cout << 5 / 2.0;   // 2.5 (이것도 OK!)
\`\`\`

소수점 결과를 얻으려면 **하나라도 실수(double)로** 만들면 돼요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`5 / 2\` → 2.5 | \`5 / 2\` → 2 (정수 나눗셈!) |
| \`5 // 2\` → 2 (정수 나눗셈) | \`5.0 / 2\` → 2.5 |

💡 C++에서는 \`//\` 연산자가 없어요! int끼리 나누면 **자동으로 정수 나눗셈**이 되니까요.`
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "함정에 빠지지 마세요!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 7 / 2;\n    return 0;\n}",
          options: ["3.5", "3", "4", "에러"],
          answer: 1,
          explanation: "C++에서 int / int = int! 7 / 2 = 3 (소수점 버림). 3.5를 원하면 7.0 / 2 처럼 실수로 만들어야 해요."
        },
        {
          id: "ch1-modulo",
          type: "explain",
          title: "➗ 나머지 연산자 (%)",
          content: `나머지 연산자 \`%\`는 파이썬과 똑같아요!

\`\`\`cpp
cout << 10 % 3;  // 1 (10 ÷ 3 = 3 나머지 1)
cout << 8 % 2;   // 0 (짝수는 나머지 0!)
cout << 15 % 4;  // 3 (15 = 4 × 3 + 3)
\`\`\`

% 연산자는 **짝수/홀수 판별**에 자주 쓰여요!
→ \`x % 2 == 0\` 이면 짝수, \`x % 2 == 1\` 이면 홀수!

💡 나머지 연산은 파이썬이랑 똑같으니까 편하게 쓰세요! 😊`
        },
        {
          id: "ch1-pred-modulo",
          type: "predict" as const,
          title: "나머지 연산 활용",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 7;\n    if (n % 2 == 0) {\n        cout << \"짝수\";\n    } else {\n        cout << \"홀수\";\n    }\n    return 0;\n}",
          options: ["짝수", "홀수", "1", "에러"],
          answer: 1,
          explanation: "7을 2로 나눈 나머지는 1이에요. 0이 아니니까 else 블록이 실행돼요! 이 패턴은 정말 자주 써요."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 계산기를 만들어보세요!",
          content: `두 숫자를 입력받아서 사칙연산 결과를 출력하는 계산기를 만들어봐요!

정수 나눗셈의 결과도 확인해보세요 — 소수점이 사라지는 걸 직접 볼 수 있어요!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "첫 번째 숫자: ";
    cin >> a;
    cout << "두 번째 숫자: ";
    cin >> b;

    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " * " << b << " = " << a * b << endl;
    cout << a << " / " << b << " = " << a / b << endl;
    cout << a << " % " << b << " = " << a % b << endl;

    return 0;
}`,
          expectedOutput: `첫 번째 숫자: 10
두 번째 숫자: 3
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3
10 % 3 = 1`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "나머지 연산!",
          content: `C++에서 \`15 % 4\`의 결과는?`,
          options: ["3", "4", "3.75", "0"],
          answer: 0,
          explanation: "15 / 4 = 3 나머지 3! 15 = 4 × 3 + 3 이니까 나머지는 3이에요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 비교, 논리, 증감 연산자
    // ============================================
    {
      id: "ch2",
      title: "비교와 논리 연산자",
      emoji: "⚖️",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "왜 값을 비교해야 할까?",
          content: `게임에서 점수가 100점 이상이면 보너스를 주고 싶어요.
쇼핑몰에서 나이가 19세 이상이면 성인 인증을 해야 해요.
로봇이 벽과의 거리가 10cm 이하면 멈춰야 해요.

이런 **'조건 판단'**을 하려면 값을 비교할 수 있어야 해요!
비교 연산자는 다음 시간에 배울 **if문의 핵심 재료**예요.`
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ 비교 연산자",
          content: `비교 연산자는 파이썬과 거의 같아요!

\`\`\`cpp
cout << (5 == 5);   // 1 (true)
cout << (3 > 5);    // 0 (false)
cout << (10 != 3);  // 1 (true)
\`\`\`

한 가지 주의: C++에서 true/false를 출력하면 **1과 0**으로 나와요!

| 연산자 | 의미 | 파이썬과 차이 |
|--------|------|------------|
| \`==\` | 같다 | 같음 ✅ |
| \`!=\` | 다르다 | 같음 ✅ |
| \`<\`, \`>\`, \`<=\`, \`>=\` | 비교 | 같음 ✅ |
| 출력 결과 | **1 / 0** | 파이썬은 True / False |

💡 C++에서 true = 1, false = 0 이에요! 숫자로 나오는 게 처음엔 이상하지만 금방 익숙해져요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "true? false?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << (10 != 10);\n    return 0;\n}",
          options: ["0", "1", "false", "에러"],
          answer: 0,
          explanation: "10 != 10은 false이고, C++에서 false를 출력하면 0이 나와요!"
        },
        {
          id: "ch2-logic",
          type: "explain",
          title: "🔗 논리 연산자가 달라요!",
          content: `여기가 가장 크게 달라지는 부분이에요!

| 의미 | 파이썬 🐍 | C++ ⚡ |
|------|-----------|-------|
| 그리고 | \`and\` | \`&&\` |
| 또는 | \`or\` | \`\\|\\|\` |
| 아니다 | \`not\` | \`!\` |

\`\`\`cpp
// 파이썬: if x > 0 and x < 10:
if (x > 0 && x < 10) {
    cout << "한 자리 양수!";
}

// 파이썬: if not finished:
if (!finished) {
    cout << "아직!";
}
\`\`\`

💡 \`and\` → \`&&\`, \`or\` → \`||\`, \`not\` → \`!\` 만 기억하면 돼요!`,
          component: "cppIfBuilder",
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "90~100점이면 A등급! 조건을 완성해봐요!",
          code: "if ((score >= 90) ___ (score <= 100)) {\n    cout << \"A등급!\";\n}",
          fillBlanks: [
            { id: 0, answer: "&&", options: ["&&", "||", "and", "&"] }
          ],
          explanation: "C++에서 '그리고'는 &&를 사용해요. 파이썬의 and에 해당해요!"
        },
        {
          id: "ch2-increment",
          type: "explain",
          title: "🆕 ++ 와 -- (파이썬에 없는 것!)",
          content: `C++에는 파이썬에 **없는** 특별한 연산자가 있어요!

\`\`\`cpp
int x = 5;
x++;    // x = x + 1 → 6
x--;    // x = x - 1 → 5
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x += 1\` | \`x++\` (더 짧아요!) |
| \`x -= 1\` | \`x--\` |

💡 알고 있었나요? **C++이라는 이름** 자체가 "C에 1을 더한다(++)"는 뜻이에요! 😄`
        },
        {
          id: "ch2-pred-inc",
          type: "predict" as const,
          title: "++ 연습!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3;\n    a++;\n    a++;\n    cout << a;\n    return 0;\n}",
          options: ["3", "4", "5", "에러"],
          answer: 2,
          explanation: "a = 3 → a++ → 4 → a++ → 5! 두 번 ++했으니까 3 + 2 = 5예요."
        },
        {
          id: "ch2-prefix-postfix",
          type: "explain",
          title: "🔍 후위 증감(x++) vs 전위 증감(++x) — 뭐가 다를까?",
          content: `\`x++\`과 \`++x\`는 둘 다 x에 1을 더해요. 하지만 **다른 연산과 함께 쓸 때** 차이가 나요!

\`\`\`cpp
int x = 5;
cout << x++ << endl;  // 5를 출력하고, 그 다음에 x가 6이 됨
cout << x << endl;    // 6
\`\`\`

\`\`\`cpp
int y = 5;
cout << ++y << endl;  // y를 먼저 6으로 만들고, 6을 출력
cout << y << endl;    // 6
\`\`\`

| 구분 | 동작 순서 | 기억법 |
|---|---|---|
| \`x++\` (후위) | **값을 먼저 사용** → 그 다음 +1 | ++가 뒤 → "나중에" 올라감 |
| \`++x\` (전위) | **먼저 +1** → 그 다음 값을 사용 | ++가 앞 → "먼저" 올라감 |

💡 단독으로 쓸 때는 \`x++;\`과 \`++x;\` 결과가 똑같아요! 차이는 **cout이나 대입과 함께 쓸 때**만 나타나요.`
        },
        {
          id: "ch2-pred-prefix",
          type: "predict" as const,
          title: "후위(x++) vs 전위(++x) 차이 맞추기!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 10;\n    cout << a++ << endl;\n    cout << a << endl;\n    return 0;\n}",
          options: ["10\\n10", "10\\n11", "11\\n11", "11\\n12"],
          answer: 1,
          explanation: "a++는 **후위**: 먼저 현재 값 10을 출력하고, 그 다음에 a가 11이 돼요. 두 번째 줄에서 a는 이미 11!"
        },
        {
          id: "ch2-pred-prefix2",
          type: "predict" as const,
          title: "이번엔 ++x!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int b = 10;\n    cout << ++b << endl;\n    cout << b << endl;\n    return 0;\n}",
          options: ["10\\n10", "10\\n11", "11\\n11", "11\\n12"],
          answer: 2,
          explanation: "++b는 **전위**: 먼저 b를 11로 만들고, 그 값 11을 출력해요. 두 번째 줄에서도 b는 11!"
        },
        {
          id: "ch2-q-prefix",
          type: "quiz",
          title: "후위 vs 전위!",
          content: `다음 코드의 출력은?

\`\`\`cpp
int x = 3;
int y = x++;
cout << x << " " << y;
\`\`\``,
          options: ["3 3", "4 3", "4 4", "3 4"],
          answer: 1,
          explanation: "x++는 후위: y에 현재 값 3을 먼저 대입하고, 그 다음 x가 4가 돼요. 결과: x=4, y=3!"
        },
        {
          id: "ch2-compound",
          type: "explain",
          title: "📝 복합 대입 연산자 (+=, -=, ...)",
          content: `파이썬에서 쓰던 \`+=\`, \`-=\` 는 C++에서도 똑같이 써요!

\`\`\`cpp
int score = 100;
score += 10;   // score = score + 10 → 110
score -= 30;   // score = score - 30 → 80
score *= 2;    // score = score * 2 → 160
score /= 4;    // score = score / 4 → 40
score %= 3;    // score = score % 3 → 1
\`\`\`

| 연산자 | 의미 | 예시 |
|---|---|---|
| \`+=\` | 더하고 대입 | \`x += 5\` → \`x = x + 5\` |
| \`-=\` | 빼고 대입 | \`x -= 3\` → \`x = x - 3\` |
| \`*=\` | 곱하고 대입 | \`x *= 2\` → \`x = x * 2\` |
| \`/=\` | 나누고 대입 | \`x /= 4\` → \`x = x / 4\` |
| \`%=\` | 나머지 대입 | \`x %= 3\` → \`x = x % 3\` |

💡 파이썬이랑 완전히 같아요! 다만 C++에는 \`x++\`, \`x--\`가 추가로 있는 거예요!`
        },
        {
          id: "ch2-precedence",
          type: "explain",
          title: "⚠️ 연산 순서 주의!",
          content: `연산자가 많아지면 **순서**가 중요해요!

\`\`\`cpp
cout << 5 + 3 * 2;   // 11 (16이 아니에요!)
\`\`\`

곱셈(\`*\`)이 덧셈(\`+\`)보다 먼저 계산돼요! 수학이랑 같죠?

헷갈리면 **괄호**를 써요:
\`\`\`cpp
cout << (5 + 3) * 2;  // 16 (괄호 안이 먼저!)
\`\`\`

비교와 논리도 순서가 있어요: \`&&\`가 \`||\`보다 먼저 계산돼요!
\`\`\`cpp
// a || b && c 는 a || (b && c) 와 같아요!
\`\`\`

💡 기억법: **"괄호 > 산술 > 비교 > 논리"** 순서!
→ 헷갈리면 그냥 괄호를 쓰세요. 코드도 더 읽기 쉬워져요! 😊`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "증감 연산자 추적!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    x++;\n    x++;\n    x--;\n    cout << x;\n    return 0;\n}",
          options: ["10", "11", "12", "9"],
          answer: 1,
          explanation: "x = 10 → x++ → 11 → x++ → 12 → x-- → 11. 최종 결과는 11!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 연산자들을 직접 써보세요!",
          content: `비교, 논리, 증감, 복합 대입 연산자를 모두 사용해보는 프로그램이에요!

실행해보고, x의 값을 바꿔가면서 결과가 어떻게 달라지는지 확인해봐요!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;

    // 비교 연산자
    cout << "x > 5: " << (x > 5) << endl;
    cout << "x == 7: " << (x == 7) << endl;

    // 논리 연산자
    cout << "x > 0 && x < 10: " << (x > 0 && x < 10) << endl;
    cout << "x < 0 || x > 5: " << (x < 0 || x > 5) << endl;

    // 증감 연산자
    cout << "x = " << x << endl;
    x++;
    cout << "x++ 후: " << x << endl;
    x--;
    cout << "x-- 후: " << x << endl;

    // 복합 대입
    x += 10;
    cout << "x += 10 후: " << x << endl;

    return 0;
}`,
          expectedOutput: `x > 5: 1
x == 7: 1
x > 0 && x < 10: 1
x < 0 || x > 5: 1
x = 7
x++ 후: 8
x-- 후: 7
x += 10 후: 17`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "++ 연산자!",
          content: `파이썬의 \`x += 1\`에 해당하는 C++ 코드는?`,
          options: [
            "x + 1",
            "x++",
            "x =+ 1",
            "++x(1)"
          ],
          answer: 1,
          explanation: "C++의 x++는 x = x + 1과 같은 뜻이에요! 파이썬의 x += 1보다 더 짧죠."
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
          title: "정수 나눗셈 + 나머지",
          content: `다음 C++ 코드의 출력은?

\`\`\`cpp
int a = 17 / 5;
int b = 17 % 5;
cout << a << " " << b;
\`\`\``,
          options: ["3.4 2", "3 2", "3 3", "4 2"],
          answer: 1,
          explanation: "17 / 5 = 3 (정수 나눗셈!), 17 % 5 = 2 (17 = 5×3 + 2). 출력: 3 2"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "파이썬에 없는 연산자",
          content: "다음 중 파이썬에는 있지만 C++에는 **없는** 연산자는?",
          options: ["++", "//", "%", "!="],
          answer: 1,
          explanation: "// (정수 나눗셈)는 파이썬 전용이에요! C++에서는 int끼리 /하면 자동으로 정수 나눗셈이에요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "논리 연산자",
          content: `result의 출력 값은?

\`\`\`cpp
int x = 5;
bool result = (x > 3 && x < 10);
cout << result;
\`\`\``,
          options: ["True", "1", "true", "0"],
          answer: 1,
          explanation: "x=5는 3보다 크고(true) 10보다 작으므로(true), true && true = true! C++에서 bool 출력은 1이에요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "실수 나눗셈",
          content: `다음 코드의 출력은?

\`\`\`cpp
double result = 5.0 / 2;
cout << result;
\`\`\``,
          options: ["2", "2.5", "2.0", "에러"],
          answer: 1,
          explanation: "5.0은 실수(double)이므로, 5.0 / 2 = 2.5! 하나라도 실수면 결과도 실수가 돼요."
        },
        {
          id: "ch3-q5",
          type: "quiz",
          title: "x++ vs ++x",
          content: `다음 코드의 출력은?

\`\`\`cpp
int a = 5;
int b = ++a;
cout << a << " " << b;
\`\`\``,
          options: ["5 5", "5 6", "6 6", "6 5"],
          answer: 2,
          explanation: "++a는 전위: 먼저 a를 6으로 만들고, 그 값 6을 b에 대입해요. 결과: a=6, b=6!"
        },
        {
          id: "ch3-q6",
          type: "quiz",
          title: "종합 추적!",
          content: `다음 코드의 출력은?

\`\`\`cpp
int x = 8;
x += 2;
x--;
x *= 3;
cout << x;
\`\`\``,
          options: ["27", "30", "24", "21"],
          answer: 0,
          explanation: "x=8 → x+=2 → 10 → x-- → 9 → x*=3 → 27! 한 줄씩 따라가면 돼요."
        },
        {
          id: "ch3-q7",
          type: "quiz",
          title: "논리 + 비교 종합",
          content: `다음 코드의 출력은?

\`\`\`cpp
int a = 3, b = 7;
cout << (a != b && b > 5);
\`\`\``,
          options: ["0", "1", "true", "에러"],
          answer: 1,
          explanation: "a != b → true (3≠7), b > 5 → true (7>5). true && true = true! C++에서 true는 1로 출력돼요."
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ x++ vs ++x 직접 실험해보기!",
          content: `후위(x++)와 전위(++x)의 차이를 직접 눈으로 확인해봐요!

숫자를 바꿔가면서 결과를 예측해보세요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;

    // 후위 (postfix): 값을 먼저 쓰고, 나중에 +1
    cout << "=== 후위 x++ ===" << endl;
    cout << "x 시작: " << x << endl;
    cout << "x++ = " << x++ << endl;  // 5 출력 후 +1
    cout << "x 현재: " << x << endl;  // 6

    cout << endl;
    x = 5;  // 리셋

    // 전위 (prefix): 먼저 +1하고, 값을 씀
    cout << "=== 전위 ++x ===" << endl;
    cout << "x 시작: " << x << endl;
    cout << "++x = " << ++x << endl;  // +1 후 6 출력
    cout << "x 현재: " << x << endl;  // 6

    return 0;
}`,
          expectedOutput: `=== 후위 x++ ===
x 시작: 5
x++ = 5
x 현재: 6

=== 전위 ++x ===
x 시작: 5
++x = 6
x 현재: 6`
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **산술 연산자** — +, -, * 는 파이썬과 같음!
- ✅ **정수 나눗셈** — int / int = 소수점 버림! (7/2 = 3)
- ✅ **나머지** — % 연산자는 파이썬과 동일
- ✅ **비교 연산자** — ==, !=, <, > 동일, 출력은 1/0
- ✅ **논리 연산자** — and → &&, or → ||, not → !
- ✅ **증감 연산자** — x++, x-- (파이썬에 없는 것!)
- ✅ **x++ vs ++x** — 후위는 "쓰고 올리고", 전위는 "올리고 쓰고"!

🚀 **다음 시간: 조건문 (if/else)** — 중괄호 {}와 else if를 배워요!`
        }
      ]
    }
  ]
}
