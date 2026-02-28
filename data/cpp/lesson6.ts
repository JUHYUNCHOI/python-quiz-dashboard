// ============================================
// C++ 레슨 6: 조건문 (if/else)
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================
import { LessonData } from '../types'

export const cppLesson6Data: LessonData = {
  id: "cpp-6",
  title: "조건문 (if/else)",
  emoji: "🔀",
  description: "중괄호 {}로 감싸는 C++ 조건문!",
  chapters: [
    // ============================================
    // Chapter 1: if문 기본
    // ============================================
    {
      id: "ch1",
      title: "if문 기본",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔍 if문: 파이썬 vs C++",
          content: `파이썬의 if문과 C++의 if문을 비교해봐요!

**파이썬 🐍:**
\`\`\`python
if x > 0:
    print("양수!")
\`\`\`

**C++ ⚡:**
\`\`\`cpp
if (x > 0) {
    cout << "양수!";
}
\`\`\`

**3가지 차이점:**
1. 조건을 **소괄호 ()** 로 감싸야 해요
2. 콜론(:) 대신 **중괄호 {}** 를 써요
3. **들여쓰기**는 선택! (파이썬은 필수)

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`if 조건:\` | \`if (조건) {\` |
| 들여쓰기 필수 | 중괄호 {} 필수 |
| 콜론 : | 중괄호 { } |

💡 C++은 **()와 {}** 두 가지만 기억하면 돼요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "C++ if문의 구조를 완성해봐요!",
          code: "___ (score >= 90) ___\n    cout << \"A등급!\";\n___",
          fillBlanks: [
            { id: 0, answer: "if", options: ["if", "If", "IF", "when"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++ if문은 if (조건) { 코드 } 형태예요. 소괄호와 중괄호를 꼭 써야 해요!"
        },
        {
          id: "ch1-braces",
          type: "explain",
          title: "⚠️ 중괄호를 빼먹으면?",
          content: `중괄호가 없으면 **바로 다음 한 줄만** if에 속해요!

\`\`\`cpp
// ❌ 중괄호 없으면 위험!
if (score >= 90)
    cout << "A등급!";
    cout << "축하!";  // 이건 항상 실행됨!
\`\`\`

\`\`\`cpp
// ✅ 중괄호를 쓰면 안전!
if (score >= 90) {
    cout << "A등급!";
    cout << "축하!";  // 이것도 조건 안!
}
\`\`\`

파이썬은 들여쓰기로 블록을 구분하지만, C++은 **중괄호 {}로 구분**해요.
들여쓰기가 되어 있어도 중괄호가 없으면 소용없어요!

💡 항상 중괄호를 쓰는 습관을 들이세요! 버그를 예방해줘요.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "함정 주의!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 3;\n    if (x > 5)\n        cout << \"A\";\n        cout << \"B\";\n    return 0;\n}",
          options: ["아무것도 안 나옴", "A", "B", "AB"],
          answer: 2,
          explanation: "중괄호가 없으면 if는 바로 다음 한 줄만 제어해요! 'A'는 조건이 false라 안 나오고, 'B'는 항상 실행돼요."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "if문 문법!",
          content: "C++의 if문에서 조건을 감싸는 기호는?",
          options: ["콜론 :", "중괄호 {}", "소괄호 ()", "대괄호 []"],
          answer: 2,
          explanation: "C++의 if문은 조건을 소괄호 ()로 감싸요! if (조건) { 코드 } 형태예요."
        }
      ]
    },
    // ============================================
    // Chapter 2: else if, else, 삼항 연산자
    // ============================================
    {
      id: "ch2",
      title: "else if와 삼항 연산자",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-elseif",
          type: "explain",
          title: "🔗 elif 대신 else if!",
          content: `파이썬의 \`elif\`는 C++에서 \`else if\`(두 단어!)로 바뀌어요.

\`\`\`cpp
if (score >= 90) {
    cout << "A";
} else if (score >= 80) {
    cout << "B";
} else if (score >= 70) {
    cout << "C";
} else {
    cout << "F";
}
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`elif\` | \`else if\` (두 단어!) |
| \`else:\` | \`else {\` |

💡 \`elif\`는 파이썬 전용! C++에서는 항상 \`else if\` (띄어쓰기)로 쓰세요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "어떤 게 출력될까?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 7;\n    if (x > 10) {\n        cout << \"A\";\n    } else if (x > 5) {\n        cout << \"B\";\n    } else {\n        cout << \"C\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "AB"],
          answer: 1,
          explanation: "x=7: x > 10? 아니요. x > 5? 네! → 'B' 출력! else if는 위에서부터 검사하고, 처음 맞는 것 하나만 실행해요."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "온도별 날씨 안내 조건문을 완성해봐요!",
          code: "if (temp >= 30) {\n    cout << \"더워요\";\n} ___ ___ (temp >= 20) {\n    cout << \"적당해요\";\n} ___ {\n    cout << \"추워요\";\n}",
          fillBlanks: [
            { id: 0, answer: "else", options: ["else", "elif", "or", "then"] },
            { id: 1, answer: "if", options: ["if", "when", "case", "for"] },
            { id: 2, answer: "else", options: ["else", "default", "elif", "other"] }
          ],
          explanation: "파이썬의 elif는 C++에서 else if (두 단어)로 써요. 마지막은 else로 마무리해요."
        },
        {
          id: "ch2-ternary",
          type: "explain",
          title: "⚡ 삼항 연산자 (한 줄 조건문!)",
          content: `간단한 조건문은 한 줄로 쓸 수 있어요!

**C++ ⚡:** \`조건 ? 참값 : 거짓값\`
**파이썬 🐍:** \`참값 if 조건 else 거짓값\`

\`\`\`cpp
string result = (x > 0) ? "양수" : "음수";
// x가 양수면 "양수", 아니면 "음수"!
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`"양수" if x > 0 else "음수"\` | \`(x > 0) ? "양수" : "음수"\` |
| 참값이 앞에 | 조건이 앞에 |

💡 순서가 달라요! 파이썬은 "참값 if 조건 else 거짓값", C++은 "조건 ? 참값 : 거짓값"`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "삼항 연산자!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int age = 15;\n    string msg = (age >= 18) ? \"adult\" : \"minor\";\n    cout << msg;\n    return 0;\n}",
          options: ["adult", "minor", "에러", "18"],
          answer: 1,
          explanation: "age=15이고, 15 >= 18은 false! 삼항 연산자에서 false면 : 뒤의 'minor'가 선택돼요."
        },
        {
          id: "ch2-switch",
          type: "explain",
          title: "🔀 switch-case (여러 값 비교!)",
          content: `if-else if가 너무 많아지면? **switch**를 쓸 수 있어요!

\`\`\`cpp
int day = 3;
switch (day) {
    case 1:
        cout << "월요일";
        break;
    case 2:
        cout << "화요일";
        break;
    case 3:
        cout << "수요일";
        break;
    default:
        cout << "기타";
}
\`\`\`

| 구성 | 의미 |
|------|------|
| \`switch (변수)\` | 이 변수의 값을 검사해요 |
| \`case 값:\` | 값이 이거면 여기를 실행! |
| \`break;\` | 여기서 멈춰! (**필수!**) |
| \`default:\` | 어떤 case에도 안 맞으면 (else 같은 역할) |

⚠️ **break를 빼먹으면?** → 다음 case도 연달아 실행돼요! (fall-through)
\`\`\`cpp
switch (day) {
    case 1: cout << "월";  // break 없음!
    case 2: cout << "화";  // day=1이면 "월화" 둘 다 출력됨! 😱
    case 3: cout << "수";
}
\`\`\`

💡 switch는 **정수/char** 값만 비교할 수 있어요. 문자열은 if-else if를 써야 해요!`
        },
        {
          id: "ch2-pred-switch",
          type: "predict" as const,
          title: "switch 출력은?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n        default: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "D"],
          answer: 1,
          explanation: "x=2이니까 case 2로 가서 'B'를 출력하고, break로 빠져나와요!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "else if 문법!",
          content: "파이썬의 `elif`에 해당하는 C++ 키워드는?",
          options: ["elseif", "elsif", "else if", "elif"],
          answer: 2,
          explanation: "C++에서는 else if (띄어쓰기!)를 써요! elseif, elsif는 다른 언어(PHP, Ruby)에서 쓰이는 형태예요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 성적 등급 프로그램을 만들어보세요!",
          content: `점수를 입력받아서 등급을 출력하는 프로그램을 만들어봐요!

if, else if, else를 활용하는 연습이에요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "점수를 입력하세요: ";
    cin >> score;

    if (score >= 90) {
        cout << "A등급! 🎉" << endl;
    } else if (score >= 80) {
        cout << "B등급! 👍" << endl;
    } else if (score >= 70) {
        cout << "C등급" << endl;
    } else {
        cout << "더 열심히!" << endl;
    }

    return 0;
}`,
          expectedOutput: `점수를 입력하세요: 85
B등급! 👍`
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
          title: "올바른 if문",
          content: "다음 중 올바른 C++ if문은?",
          options: [
            "if x > 5 { cout << \"크다\"; }",
            "if (x > 5) { cout << \"크다\"; }",
            "if (x > 5): cout << \"크다\"",
            "if [x > 5] { cout << \"크다\"; }"
          ],
          answer: 1,
          explanation: "C++의 if문은 조건을 소괄호 ()로, 코드 블록을 중괄호 {}로 감싸요! if (조건) { 코드; }"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "break 없으면?",
          content: `switch문에서 break를 빼먹으면?

\`\`\`cpp
switch (day) {
    case 1: cout << "월";
    case 2: cout << "화";
    case 3: cout << "수";
}
\`\`\``,
          options: [
            "컴파일 에러가 난다",
            "해당 case만 실행된다",
            "다음 case들도 연달아 실행된다",
            "프로그램이 종료된다"
          ],
          answer: 2,
          explanation: "break가 없으면 해당 case 이후의 모든 case가 연달아 실행돼요! 이걸 'fall-through'라고 해요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "C++에 없는 것!",
          content: "다음 중 파이썬에는 있지만 C++에는 **없는** 조건문 문법은?",
          options: [
            "else if",
            "삼항 연산자 (? :)",
            "switch-case",
            "elif"
          ],
          answer: 3,
          explanation: "elif는 파이썬 전용이에요! C++에서는 else if (띄어쓰기)를 써야 해요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "삼항 연산자!",
          content: `결과는?

\`\`\`cpp
int n = 4;
string result = (n % 2 == 0) ? "짝수" : "홀수";
cout << result;
\`\`\``,
          options: ["짝수", "홀수", "에러", "4"],
          answer: 0,
          explanation: "4 % 2 == 0은 true! 삼항 연산자에서 true면 ? 바로 뒤의 '짝수'가 선택돼요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **if문** — if (조건) { } (소괄호 + 중괄호!)
- ✅ **중괄호 필수** — 빼먹으면 한 줄만 제어됨!
- ✅ **else if** — 파이썬의 elif 대신 (두 단어!)
- ✅ **삼항 연산자** — 조건 ? 참값 : 거짓값
- ✅ **switch-case** — break 빼먹으면 fall-through!

🚀 **다음 시간: 반복문 (for/while)** — range() 없는 세계, for(int i=0; i<n; i++)!`
        }
      ]
    }
  ]
}
