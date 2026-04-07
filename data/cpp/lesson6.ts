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
          content: `게임에서 캐릭터 체력이 0 이하면 게임 오버, 100 이상이면 무적 모드... 이런 **조건 판단**이 프로그래밍의 핵심이에요!

파이썬의 if문과 C++의 if문을 비교해봐요!

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
{!pink} 1. 조건을 {pink:**소괄호 ()**} 로 감싸야 해요
{!blue} 2. 콜론(:) 대신 {blue:**중괄호**} { } 를 써요
{!green} 3. {green:**들여쓰기**}는 선택! (파이썬은 필수)

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`if 조건:\` | \`if (조건) {\` |
| 들여쓰기 필수 | 중괄호 {} 필수 |
| 콜론 : | 중괄호 { } |

💡 C++은 **()와 {}** 두 가지만 기억하면 돼요!`,
          component: "cppIfBuilder",
        },
        {
          id: "ch1-else",
          type: "explain",
          title: "🔀 if만으로는 부족해! → else",
          content: `if문은 "이것이 참이면 실행"이에요. 그런데 **거짓이면?** 아무것도 안 해요!

\`\`\`cpp
int score = 40;
if (score >= 60) {
    cout << "합격!";
}
// score가 40이면... 아무 반응 없음 😶
\`\`\`

**"거짓일 때도 뭔가 하고 싶으면"** → \`else\`를 써요!

\`\`\`cpp
if (score >= 60) {
    cout << "합격!";
} else {
    cout << "불합격...";   // ← 조건이 거짓일 때 실행!
}
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`else:\` | \`} else {\` |
| 콜론 : | **} else {** (중괄호 주의!) |

{!blue} 💡 \`else\`는 "그 외 나머지 전부"를 의미해요. if 조건이 거짓이면 무조건 else로!

⚠️ else는 **항상 if 바로 뒤에** 와야 해요. 혼자 쓸 수 없어요!`
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
          id: "ch1-brace-no-sim",
          type: "explain",
          title: "⚠️ 중괄호 함정! — 실행 추적",
          content: `중괄호가 없으면 if 조건이 참이어도 **바로 아래 한 줄만** 실행돼요!

\`\`\`cpp
// ❌ 중괄호 없으면 위험!
if (score >= 90)
    cout << "A등급!";   // ← 조건이 참일 때만 실행
    cout << "축하!";     // ← 조건과 상관없이 항상 실행!!
\`\`\`

들여쓰기가 똑같아도 C++은 **중괄호로만** 묶인 코드를 구분해요.
그래서 "축하!"는 조건이 거짓(score=80)이어도 항상 출력돼요.

**여러 줄을 if에 묶으려면 반드시 중괄호로 감싸야 해요:**

\`\`\`cpp
// ✅ 올바른 방법
if (score >= 90) {
    cout << "A등급!";   // ← 조건 참일 때만
    cout << "축하!";     // ← 조건 참일 때만
}
\`\`\`

아래에서 **score=80(거짓)**과 **score=96(참)** 두 경우를 비교해 보세요.
빨간 취소선 줄은 **건너뛴 줄**이에요!`,
          component: "codeTraceCppBraceTrapNoCombo",
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
    // Chapter 2: else if / else
    // ============================================
    {
      id: "ch2",
      title: "else if / else",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "🤔 조건이 2개 이상이면?",
          content: `if-else만으로는 **2가지 경우**밖에 처리 못 해요:

\`\`\`cpp
if (score >= 60) {
    cout << "합격";
} else {
    cout << "불합격";
}
\`\`\`

근데 성적은 A, B, C, F... **4가지 이상**으로 나눠야 하잖아요?

{!pink} ❌ **if만 여러 개 쓰면?** → 조건이 겹쳐서 "A"도 되고 "B"도 되는 문제!
{!green} ✅ **else if를 쓰면?** → 위에서부터 검사하고, {green:**첫 번째로 맞는 것 하나만 실행!**}

파이썬의 \`elif\`와 같은 역할이에요!`
        },
        {
          id: "ch2-elseif",
          type: "explain",
          title: "🔗 elif 대신 else if!",
          component: "cppElseIfBuilder",
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
          id: "ch2-sim",
          type: "explain",
          title: "🔍 실행 추적: score=85 → B등급 (else if 경로)",
          content: `score=85일 때, 90 이상? 80 이상? 위에서부터 하나씩 확인하는 과정을 봐요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTraceCppScoreGrade",
        },
        {
          id: "ch2-sim-true",
          type: "explain",
          title: "🔍 실행 추적: score=95 → A등급 (첫 조건 참!)",
          content: `이번엔 score=95! 첫 번째 조건이 바로 참이면 나머지 else if는 어떻게 될까?

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTraceCppScoreGradeHigh",
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
          title: "✋ HP 상태 판별 프로그램을 만들어보세요!",
          content: `HP를 입력받아서 상태를 출력하는 프로그램을 완성해봐요!

**상태 기준:**
- 80 이상 → \`안전!\`
- 50 이상 → \`주의!\`
- 20 이상 → \`위험!\`
- 20 미만 → \`쓰러지기 직전!\`

if, else if, else를 순서대로 사용해보세요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int hp;
    cin >> hp;

    if (hp >= 80) {
        cout << "안전!" << endl;
    } else if (hp >= 50) {
        cout << "주의!" << endl;
    } else if (hp >= 20) {
        cout << "위험!" << endl;
    } else {
        cout << "쓰러지기 직전!" << endl;
    }

    return 0;
}`,
          stdin: `35`,
          expectedOutput: `위험!`
        }
      ]
    },
    // ============================================
    // Chapter 3: 삼항 연산자
    // ============================================
    {
      id: "ch3",
      title: "삼항 연산자",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-why",
          type: "explain",
          title: "삼항 연산자가 왜 필요할까?",
          content: `if-else가 있는데 왜 또 다른 방법이 필요할까요?

이런 상황을 봐요:
\`\`\`cpp
string status;
if (score >= 60) {
    status = "합격";
} else {
    status = "불합격";
}
\`\`\`
**6줄**이나 되는데, 사실 하는 일은 딱 하나: status에 값 하나 대입!

**조건에 따라 하나의 값을 고를 때**는 삼항 연산자가 딱 맞아요.
⚠️ 복잡한 로직은 if-else가 더 읽기 쉬워요!`
        },
        {
          id: "ch3-intro",
          type: "explain",
          title: "⚡ 삼항 연산자란?",
          content: `if-else를 잘 배웠으니, 이제 **간단한 조건문을 한 줄로 쓰는 방법**을 배워봐요!

예를 들어 합격 여부를 판단한다고 해봐요:
\`\`\`cpp
string status;
if (score >= 60) {
    status = "합격";
} else {
    status = "불합격";
}
\`\`\`

**6줄**이나 걸려요. 하지만 실제로 하는 일은 딱 하나: status에 값 넣기!

이렇게 **'조건에 따라 값 하나를 정할 때'** 삼항 연산자로 한 줄로 줄일 수 있어요.

💡 이건 "있으면 편한 도구"예요. 지금 바로 못 외워도 괜찮아요!`
        },
        {
          id: "ch3-ternary",
          type: "explain",
          title: "❓ 조건 ? 참값 : 거짓값",
          content: `이게 아까 본 6줄짜리 코드예요:

\`\`\`cpp
string result;
if (x > 0) {
    result = "양수";
} else {
    result = "음수";
}
\`\`\`

이걸 **삼항 연산자**로 바꾸면:

\`\`\`cpp
string result = (x > 0) ? "양수" : "음수";
\`\`\`

6줄 → 1줄! 😮

삼항 연산자의 형태:
\`\`\`
조건 ? 참일 때 값 : 거짓일 때 값
\`\`\`

**읽는 법:** "x가 0보다 크면? 양수! 아니면? 음수!"

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`"양수" if x > 0 else "음수"\` | \`(x > 0) ? "양수" : "음수"\` |
| 참값이 **앞에** | 조건이 **앞에** |

💡 순서가 달라요! 파이썬은 "참값 if 조건 else 거짓값", C++은 "조건 ? 참값 : 거짓값"`,
          component: "cppTernaryBuilder",
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "삼항 연산자를 완성해봐요!",
          content: "x가 짝수면 \"even\", 홀수면 \"odd\"를 result에 저장하는 삼항 연산자를 완성해봐요!",
          code: "string result = (x % 2 ___ 0) ___ \"even\" ___ \"odd\";",
          fillBlanks: [
            { id: 0, answer: "==", options: ["==", "!=", ">=", "<="] },
            { id: 1, answer: "?", options: ["?", ":", "&&", "||"] },
            { id: 2, answer: ":", options: [":", "?", ";", ","] }
          ],
          explanation: "삼항 연산자: (조건) ? 참값 : 거짓값. x % 2 == 0이면 짝수니까 \"even\"이 선택돼요!"
        },
        {
          id: "ch3-convert-practice1",
          type: "fillblank" as const,
          title: "🔄 if/else → 삼항으로 바꿔보기 ①",
          content: `이 if/else를 삼항 연산자 한 줄로 바꿔보세요!

\`\`\`cpp
string msg;
if (score >= 90) {
    msg = "A등급";
} else {
    msg = "재시험";
}
\`\`\``,
          code: "string msg = (score ___ 90) ___ \"A등급\" ___ \"재시험\";",
          fillBlanks: [
            { id: 0, answer: ">=", options: [">=", ">", "==", "<="] },
            { id: 1, answer: "?", options: ["?", ":", "&&", "||"] },
            { id: 2, answer: ":", options: [":", "?", ";", "!"] }
          ],
          explanation: "if의 조건 → ( ), 참일 때 값 → ? 뒤, 거짓일 때 값 → : 뒤! (score >= 90) ? \"A등급\" : \"재시험\""
        },
        {
          id: "ch3-convert-practice2",
          type: "fillblank" as const,
          title: "🔄 if/else → 삼항으로 바꿔보기 ②",
          content: `이번엔 숫자를 반환하는 경우! if/else를 삼항으로 바꿔보세요.

\`\`\`cpp
int fee;
if (age <= 12) {
    fee = 500;
} else {
    fee = 1500;
}
\`\`\``,
          code: "int fee = (age ___ 12) ? ___ : ___;",
          fillBlanks: [
            { id: 0, answer: "<=", options: ["<=", "<", ">=", "=="] },
            { id: 1, answer: "500", options: ["500", "1500", "12", "0"] },
            { id: 2, answer: "1500", options: ["1500", "500", "12", "0"] }
          ],
          explanation: "age <= 12이면 500원, 아니면 1500원! 조건 ? 참값(500) : 거짓값(1500)"
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "삼항 연산자로 생존/사망 판별",
          content: `HP를 입력받아 1 이상이면 "생존!", 0 이하면 "사망..."을 출력하세요.
삼항 연산자를 사용하세요!`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int hp;
    cin >> hp;

    // 삼항 연산자로 한 줄에 작성하세요
    string result = ___;

    cout << result << endl;
    return 0;
}`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int hp;
    cin >> hp;

    string result = (hp >= 1) ? "생존!" : "사망...";

    cout << result << endl;
    return 0;
}`,
          stdin: `50`,
          expectedOutput: `생존!`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "삼항 연산자 결과는?",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int age = 15;\n    string msg = (age >= 18) ? \"adult\" : \"minor\";\n    cout << msg;\n    return 0;\n}",
          options: ["adult", "minor", "에러", "18"],
          answer: 1,
          explanation: "age=15이고, 15 >= 18은 false! 삼항 연산자에서 false면 : 뒤의 'minor'가 선택돼요."
        },
        {
          id: "ch3-convert",
          type: "quiz",
          title: "🔄 if/else → 삼항 변환!",
          content: `이 if/else를 삼항 연산자로 바꾸면?

\`\`\`cpp
string s;
if (score >= 60) {
    s = "pass";
} else {
    s = "fail";
}
\`\`\``,
          options: [
            'string s = (score >= 60) ? "pass" : "fail";',
            'string s = (score >= 60) : "pass" ? "fail";',
            'string s = "pass" ? (score >= 60) : "fail";',
            'string s = (score >= 60) ? "fail" : "pass";'
          ],
          answer: 0,
          explanation: "조건 ? 참값 : 거짓값! (score >= 60)이 조건, \"pass\"가 참일 때, \"fail\"이 거짓일 때예요."
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "삼항 연산자 문법!",
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
          id: "ch3-pred2",
          type: "predict" as const,
          title: "중첩 삼항 연산자!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    string r = (x > 0) ? \"positive\" : (x < 0) ? \"negative\" : \"zero\";\n    cout << r;\n    return 0;\n}",
          options: ["positive", "negative", "zero", "에러"],
          answer: 2,
          explanation: "x=0이면 x > 0은 false → 두 번째 삼항으로! x < 0도 false → 'zero'! 삼항을 겹칠 수도 있어요."
        },
      ]
    },
    // ============================================
    // Chapter 4: switch-case
    // ============================================
    {
      id: "ch4",
      title: "switch-case",
      emoji: "🔀",
      steps: [
        {
          id: "ch4-why",
          type: "explain",
          title: "🤔 switch가 왜 필요할까?",
          content: `if-else if가 이렇게 길어지면 읽기 힘들어요:

\`\`\`cpp
if (day == 1) { cout << "월요일"; }
else if (day == 2) { cout << "화요일"; }
else if (day == 3) { cout << "수요일"; }
else if (day == 4) { cout << "목요일"; }
else if (day == 5) { cout << "금요일"; }
else if (day == 6) { cout << "토요일"; }
else if (day == 7) { cout << "일요일"; }
\`\`\`

잘 보면 결국 **day가 1인지, 2인지, 3인지...** 묻는 거잖아요? 매번 \`day ==\`을 반복하고 있어요!

**하나의 변수**를 여러 값과 비교할 때, **switch**를 쓰면 더 깔끔해요!

💡 switch는 "이 변수가 어떤 값이냐?"를 물어보는 거예요.`,
        },
        {
          id: "ch4-switch",
          type: "explain",
          title: "🔀 switch-case 구조",
          content: `switch문을 직접 한 단계씩 조립해봐요!

| 구성 | 의미 |
|------|------|
| \`switch (변수)\` | 이 변수의 값을 검사해요 |
| \`case 값:\` | 값이 이거면 여기를 실행! |
| {pink:\`break;\`} | 여기서 멈춰! ({pink:**필수!**}) |
| \`default:\` | 어떤 case에도 안 맞으면 (else 같은 역할) |

{!orange} ⚠️ switch는 {orange:**정수와 char만**} 쓸 수 있어요! 문자열 비교는 if-else를 써야 해요.`,
          component: "cppSwitchBuilder",
        },
        {
          id: "ch4-break",
          type: "explain",
          title: "⚠️ break를 빼먹으면?",
          content: `break가 없으면 다음 case도 **연달아 실행**돼요! 이걸 **fall-through**라고 해요.

\`\`\`cpp
// ❌ break 없으면 위험!
switch (day) {
    case 1: cout << "월";  // break 없음!
    case 2: cout << "화";  // day=1이면 "월화" 둘 다 출력됨! 😱
    case 3: cout << "수";
}
\`\`\`

\`\`\`cpp
// ✅ break를 꼭 써주세요!
switch (day) {
    case 1: cout << "월"; break;
    case 2: cout << "화"; break;
    case 3: cout << "수"; break;
}
\`\`\`

💡 실수로 break를 빼먹는 건 C++ 초보자가 가장 많이 하는 실수 중 하나예요!`
        },
        {
          id: "ch4-default",
          type: "explain",
          title: "🛡️ default — 어디에도 안 맞으면?",
          content: `if-else에서 **else**가 있는 것처럼, switch에도 **default**가 있어요!

\`\`\`cpp
switch (score) {
    case 10: cout << "완벽!"; break;
    case 9:  cout << "아주 잘했어요!"; break;
    case 8:  cout << "잘했어요!"; break;
    default: cout << "더 노력해요!";  // 10, 9, 8이 아닌 모든 값
}
\`\`\`

**default의 특징:**
- 어떤 case에도 안 맞을 때 실행돼요
- 보통 맨 마지막에 써요 (관례)
- **선택 사항** — 없어도 돼요 (모든 경우를 case로 다 처리했다면)
- default 뒤에도 break를 쓰는 게 좋은 습관이에요 (fall-through 방지)

\`\`\`cpp
// default가 없어도 되는 경우
switch (day) {
    case 1: cout << "월"; break;
    case 2: cout << "화"; break;
    // day가 1, 2가 아니면 → 아무것도 출력 안 함 (괜찮아요!)
}
\`\`\``,
        },
        {
          id: "ch4-fb1",
          type: "fillblank" as const,
          title: "switch문을 완성해봐요!",
          content: "등급(grade)에 따라 메시지를 출력하는 switch문을 완성해봐요!",
          code: "___ (grade) {\n    ___ 'A':\n        cout << \"Excellent\";\n        ___;\n    ___ 'B':\n        cout << \"Good\";\n        break;\n    ___:\n        cout << \"Try again\";\n}",
          fillBlanks: [
            { id: 0, answer: "switch", options: ["switch", "if", "select", "match"] },
            { id: 1, answer: "case", options: ["case", "when", "if", "is"] },
            { id: 2, answer: "break", options: ["break", "stop", "exit", "return"] },
            { id: 3, answer: "case", options: ["case", "when", "if", "else"] },
            { id: 4, answer: "default", options: ["default", "else", "other", "none"] }
          ],
          explanation: "switch(변수) { case 값: 코드 break; ... default: 코드 } 형태예요!"
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "switch 출력은?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n        default: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "D"],
          answer: 1,
          explanation: "x=2이니까 case 2로 가서 'B'를 출력하고, break로 빠져나와요!"
        },
        {
          id: "ch4-pred2",
          type: "predict" as const,
          title: "⚠️ break 없는 switch!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 1;\n    switch (x) {\n        case 1: cout << \"A\";\n        case 2: cout << \"B\";\n        case 3: cout << \"C\";\n    }\n    return 0;\n}",
          options: ["A", "AB", "ABC", "에러"],
          answer: 2,
          explanation: "break가 없어서 case 1 이후 case 2, case 3도 연달아 실행! \"ABC\" 전부 출력돼요! 이게 fall-through예요."
        },
        {
          id: "ch4-limit",
          type: "explain",
          title: "🤔 switch vs if — 언제 뭘 쓸까?",
          content: `switch가 만능은 아니에요. 상황에 따라 **if가 더 나을 때**가 있어요:

| 상황 | 추천 | 이유 |
|---|---|---|
| 메뉴 번호 (1, 2, 3...) | ✅ **switch** | 깔끔하게 분기 |
| 학점 (A, B, C, D) | ✅ **switch** | char 값으로 분기 |
| 점수 범위 (90점 이상?) | ✅ **if** | 크다/작다 비교 필요 |
| 이름 비교 ("Kim"?) | ✅ **if** | 문자열 비교 필요 |

C++의 규칙: switch는 **정수와 char만** 비교할 수 있어요.

\`\`\`cpp
// ❌ 컴파일 에러!
switch (name) { case "Kim": ... }  // string 안 됨
switch (x) { case x > 10: ... }   // 범위 비교 안 됨
\`\`\`

💡 **정리:** "이 값이 정확히 1? 2? 3?" → **switch** / "90점 이상?" "이름이 Kim?" → **if**`
        },
        {
          id: "ch4-q1",
          type: "quiz",
          title: "switch vs if",
          content: "switch문에서 비교할 수 **없는** 것은?",
          options: [
            "int 변수",
            "char 변수",
            "string 변수",
            "정수 상수"
          ],
          answer: 2,
          explanation: "switch는 정수/char만 비교 가능! 문자열(string)은 비교할 수 없어서 if-else if를 써야 해요."
        },
        // break 위치에 따른 결과 — 중간에서 break 빠짐
        {
          id: "ch4-pred3",
          type: "predict" as const,
          title: "break가 중간에만 없다면?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\";\n        case 3: cout << \"C\"; break;\n        case 4: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["B", "BC", "BCD", "ABCD"],
          answer: 1,
          explanation: "x=2 → case 2 실행 → break가 없으니 case 3도 실행! → case 3에 break가 있으니 멈춤. 결과: \"BC\""
        },
        // default가 없을 때
        {
          id: "ch4-pred4",
          type: "predict" as const,
          title: "default가 없으면?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n    }\n    cout << \"끝\";\n    return 0;\n}",
          options: ["A끝", "C끝", "끝", "에러"],
          answer: 2,
          explanation: "x=5인데 case 1, 2, 3 어디에도 안 맞아요. default도 없으니까 switch를 그냥 통과! 그래서 \"끝\"만 출력돼요."
        },
        // default가 있을 때 같은 값
        {
          id: "ch4-pred5",
          type: "predict" as const,
          title: "default가 있으면?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        default: cout << \"기타\";\n    }\n    cout << \"끝\";\n    return 0;\n}",
          options: ["A끝", "B끝", "기타끝", "끝"],
          answer: 2,
          explanation: "x=5 → case 1? 아니요. case 2? 아니요. default로! → \"기타\" 출력 → switch 끝 → \"끝\" 출력. 결과: \"기타끝\""
        },
        // char 값으로 switch
        {
          id: "ch4-pred6",
          type: "predict" as const,
          title: "char로 switch!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    char grade = 'B';\n    switch (grade) {\n        case 'A': cout << \"최고\"; break;\n        case 'B': cout << \"잘함\"; break;\n        case 'C': cout << \"보통\"; break;\n        default: cout << \"노력\";\n    }\n    return 0;\n}",
          options: ["최고", "잘함", "보통", "노력"],
          answer: 1,
          explanation: "grade='B' → case 'B'에 딱 맞아요! \"잘함\" 출력하고 break로 끝!"
        },
        // fall-through 두 번 후 break 만남
        {
          id: "ch4-pred7",
          type: "predict" as const,
          title: "fall-through가 2번 일어나면?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 1;\n    switch (x) {\n        case 1: cout << \"A\";\n        case 2: cout << \"B\";\n        case 3: cout << \"C\"; break;\n        case 4: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "ABC", "ABCD", "AB"],
          answer: 1,
          explanation: "x=1 → case 1 실행(A) → break 없어서 case 2도(B) → break 없어서 case 3도(C) → case 3에 break! 여기서 멈춤. case 4는 실행 안 돼요. 결과: \"ABC\""
        },
        // 위에 break가 있지만 내 case 다음에 fall-through
        {
          id: "ch4-pred8",
          type: "predict" as const,
          title: "break 위치를 잘 봐요!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 3;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\";\n        case 4: cout << \"D\";\n        case 5: cout << \"E\"; break;\n    }\n    return 0;\n}",
          options: ["C", "CD", "CDE", "ABCDE"],
          answer: 2,
          explanation: "x=3 → case 3 실행(C) → break 없음! → case 4도 실행(D) → break 없음! → case 5도 실행(E) → break! 멈춤. case 1, 2의 break는 x=3과 관계없어요. 결과: \"CDE\""
        },
        // default도 fall-through 된다
        {
          id: "ch4-pred9",
          type: "predict" as const,
          title: "default까지 fall-through?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\";\n        default: cout << \"X\";\n    }\n    return 0;\n}",
          options: ["B", "BX", "X", "에러"],
          answer: 1,
          explanation: "x=2 → case 2 실행(B) → break 없음! → default도 실행(X)! default도 break가 없으면 fall-through의 대상이에요. 결과: \"BX\""
        },
        // 의도적 fall-through (여러 case가 같은 코드)
        {
          id: "ch4-intentional",
          type: "explain",
          title: "💡 일부러 break를 안 쓰는 경우!",
          content: `break를 안 쓰는 게 항상 실수는 아니에요! **여러 case가 같은 코드**를 실행할 때 일부러 빼기도 해요:

\`\`\`cpp
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        cout << "평일";
        break;
    case 6:
    case 7:
        cout << "주말";
        break;
}
\`\`\`

case 1~5는 break 없이 쭉 떨어져서 **"평일"**을 출력해요. 이게 **의도적 fall-through**예요!

💡 default는 **선택사항**이에요! 모든 경우를 case로 다 처리했으면 default를 안 써도 돼요.`
        },
        // 의도적 fall-through 퀴즈
        {
          id: "ch4-pred10",
          type: "predict" as const,
          title: "의도적 fall-through!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int day = 6;\n    switch (day) {\n        case 1:\n        case 2:\n        case 3:\n        case 4:\n        case 5:\n            cout << \"평일\"; break;\n        case 6:\n        case 7:\n            cout << \"주말\"; break;\n    }\n    return 0;\n}",
          options: ["평일", "주말", "평일주말", "에러"],
          answer: 1,
          explanation: "day=6 → case 6에 매칭 → break 없으니 case 7도 → cout << \"주말\" 실행 → break! 결과: \"주말\". case 1~5는 건너뛰어요!"
        },
        // 직접 코딩 — practice
        {
          id: "ch4-practice1",
          type: "practice" as const,
          title: "✍️ 무기 선택 switch문 만들어보기!",
          content: `무기 번호에 따라 무기 이름을 출력하는 switch문을 만들어봐요!

- weapon = 1이면 "검"
- weapon = 2이면 "활"
- weapon = 3이면 "마법"
- 그 외에는 "맨손"`,
          code: `#include <iostream>
using namespace std;
int main() {
    int weapon = 1;
    switch (weapon) {
        case 1:
            cout << "검";
            break;
        case 2:
            cout << "활";
            break;
        case 3:
            cout << "마법";
            break;
        default:
            cout << "맨손";
    }
    return 0;
}`,
          expectedOutput: "검"
        },
      ]
    },
    // ============================================
    // Chapter 5: 정리 퀴즈
    // ============================================
    {
      id: "ch5",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch5-q1",
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
          id: "ch5-q2",
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
          id: "ch5-q3",
          type: "quiz",
          title: "switch fall-through!",
          content: `결과는?

\`\`\`cpp
int x = 2;
switch (x) {
    case 1: cout << "one"; break;
    case 2: cout << "two";
    case 3: cout << "three"; break;
    default: cout << "other";
}
\`\`\``,
          options: ["two", "twothree", "two three", "에러"],
          answer: 1,
          explanation: "case 2에 break가 없어서 case 3으로 fall-through! 'two'와 'three'가 붙어서 출력돼요. 의도하지 않은 fall-through는 흔한 버그예요 — break를 꼭 확인하세요."
        },
        {
          id: "ch5-summary",
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
