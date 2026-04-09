// ============================================
// C++ 레슨 7: 반복문 (for/while)
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================
import { LessonData } from '../types'

export const cppLesson7Data: LessonData = {
  id: "cpp-7",
  title: "반복문 (for/while)",
  emoji: "🔄",
  description: "range() 없는 세계, for(int i=0; i<n; i++)",
  chapters: [
    // ============================================
    // Chapter 1: for 루프
    // ============================================
    {
      id: "ch1",
      title: "for 루프",
      emoji: "🔁",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔁 for문: 파이썬 vs C++",
          content: `for문이 **가장 크게 달라지는 부분**이에요! C++에는 \`range()\`가 없어요.

**파이썬 🐍:** \`for i in range(5):\`
**C++ ⚡:** \`for (int i = 0; i < 5; i++)\`

C++ for문은 세미콜론(;)으로 **3부분**을 나눠요:

\`\`\`cpp
for (int i = 0;  i < 5;    i++)
\`\`\`

{!pink} ① {pink:**초기식**} — \`int i = 0\` → 시작값 설정 (딱 한 번만!)
{!blue} ② {blue:**조건식**} — \`i < 5\` → 이 조건이 true인 동안 반복
{!green} ③ {green:**증감식**} — \`i++\` → 매 반복 끝에 실행

**실행 순서:** {pink:① 초기화} → {blue:② 조건 확인} → 본문 실행 → {green:③ 증감} → {blue:② 조건 확인} → 본문 실행 → {green:③ 증감} → ... → {blue:② 거짓이면 끝!}

@핵심: for문 = "{pink:시작}, {blue:조건}, {green:변화}" 딱 3가지!`,
          component: "cppForBuilder",
        },
        {
          id: "ch1-sim",
          type: "explain",
          title: "🔍 추적: C++ for(init; cond; inc)의 실행 순서",
          content: `초기화 → 조건 확인 → 증감의 정확한 순서를 눈으로 확인해봐요!

**▶ 실행** 또는 **▷ 단계** 버튼을 눌러 추적하세요.`,
          component: "codeTraceCppFor",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "0부터 4까지 출력하는 for문을 만들어요!",
          code: "for (___ i = 0; i ___ 5; ___) {\n    cout << i << endl;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "let", "for"] },
            { id: 1, answer: "<", options: ["<", "<=", "==", "!="] },
            { id: 2, answer: "i++", options: ["i++", "i--", "i+1", "++"] }
          ],
          explanation: "for (int i = 0; i < 5; i++)은 0부터 4까지 반복해요. range(5)와 같은 결과!"
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "출력 결과는?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 0; i < 4; i++) {\n        cout << i;\n    }\n    return 0;\n}",
          options: ["1234", "0123", "01234", "0124"],
          answer: 1,
          explanation: "i=0부터 시작, i < 4가 조건이므로 i=0,1,2,3일 때 실행! 출력: 0123"
        },
        {
          id: "ch1-patterns",
          type: "explain",
          title: "📋 range() → for문 변환표!",
          content: `range()의 여러 형태를 C++로 바꿔보면:

| 파이썬 🐍 | C++ ⚡ | 결과 |
|---|---|---|
| \`range(5)\` | \`i = 0; i < 5; i++\` | 0,1,2,3,4 |
| \`range(2, 10)\` | \`i = 2; i < 10; i++\` | 2,3,...,9 |
| \`range(0, 10, 2)\` | \`i = 0; i < 10; i += 2\` | 0,2,4,6,8 |
| \`range(10, 0, -1)\` | \`i = 10; i > 0; i--\` | 10,9,...,1 |

\`\`\`cpp
// 짝수만: 0, 2, 4, 6, 8
for (int i = 0; i < 10; i += 2) {
    cout << i << " ";
}
\`\`\`

💡 range(start, end, step) → for (int i = start; i < end; i += step) 패턴이에요!`
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "곱하기 패턴!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        cout << i * 2 << \" \";\n    }\n    return 0;\n}",
          options: ["1 2 3 ", "2 4 6 ", "0 2 4 ", "2 4 6 8 "],
          answer: 1,
          explanation: "i=1: 1×2=2, i=2: 2×2=4, i=3: 3×2=6. i=4일 때 4 <= 3이 false라 종료! 출력: 2 4 6"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "range() 변환!",
          content: "`for i in range(3):`을 C++로 바꾸면?",
          options: [
            "for (int i = 0; i < 3; i++)",
            "for (int i = 1; i <= 3; i++)",
            "for (int i = 0; i <= 3; i++)",
            "for (i in range(3))"
          ],
          answer: 0,
          explanation: "range(3)은 0, 1, 2를 만들어요. C++: i = 0부터 시작, i < 3이 조건, i++로 증가!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 1부터 10까지 합 구하기!",
          content: `for문을 사용해서 1부터 10까지의 합을 구하는 프로그램을 만들어봐요!

파이썬이었다면 \`sum(range(1, 11))\`이겠지만, C++에서는 for문으로 직접 계산해요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        sum += i;
    }

    cout << "1부터 10까지의 합: " << sum << endl;

    return 0;
}`,
          expectedOutput: `1부터 10까지의 합: 55`
        }
      ]
    },
    // ============================================
    // Chapter 2: while, do-while
    // ============================================
    {
      id: "ch2",
      title: "while & do-while",
      emoji: "🔃",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "for vs while: 언제 어떤 걸 쓸까?",
          content: `for 반복문은 **횟수가 정해진** 반복에 딱이에요: '10번 반복', '배열 끝까지'

하지만 이런 상황은요?
- 사용자가 'quit'을 입력할 때까지 계속 받기
- 비밀번호가 맞을 때까지 다시 입력받기
- 게임이 끝날 때까지 턴 반복하기

**횟수를 모르고, 조건만 아는 경우** → while문이 필요해요!
while은 '~하는 동안 반복'이라는 뜻 그대로예요.`
        },
        {
          id: "ch2-while",
          type: "explain",
          title: "🔃 while문 — 파이썬과 거의 같아요!",
          content: `while문은 파이썬과 거의 같아요! 소괄호와 중괄호만 추가!

**파이썬 🐍:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int count = 0;
while (count < 5) {
    cout << count << endl;
    count++;
}
\`\`\`

차이점은 딱 3개:
{!pink} 1. 조건에 {pink:**소괄호 ()**}
{!blue} 2. 블록에 {blue:**중괄호**} { }
{!green} 3. count += 1 대신 {green:**count++**} (선택)

💡 if문이랑 규칙이 똑같아요! () + {} 만 기억하세요.`,
          component: "cppWhileBuilder",
        },
        {
          id: "ch2-sim",
          type: "explain",
          title: "🔍 추적: C++ while문으로 팩토리얼 계산",
          content: `while문이 팩토리얼(1×2×3×4)을 어떻게 계산하는지 단계별로 확인해봐요!

**▶ 실행** 또는 **▷ 단계** 버튼을 눌러 추적하세요.`,
          component: "codeTraceCppWhile",
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "합계 구하기!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    int i = 1;\n    while (i <= 5) {\n        sum += i;\n        i++;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["10", "15", "20", "5"],
          answer: 1,
          explanation: "sum = 1 + 2 + 3 + 4 + 5 = 15! i가 1부터 5까지 반복하면서 sum에 더해요."
        },
        {
          id: "ch2-dowhile",
          type: "explain",
          title: "🆕 do-while문 (파이썬에 없음!)",
          component: "cppDoWhileBuilder",
          content: `C++에는 **do-while문**이 있어요. 파이썬에는 없는 거예요!

\`\`\`cpp
do {
    명령어;
} while (조건);   // ← 끝에 세미콜론!
\`\`\`

| while | do-while |
|-------|----------|
| {blue:조건 먼저 확인} → false면 0번 실행 | {pink:**먼저 실행**} → 그다음 조건 확인 |
| 0번 실행 가능 | {pink:**최소 1번은 실행!**} |

### 🤔 왜 쓰는 건데?

**"일단 한 번은 해야 하는"** 상황에 딱이에요:

{!pink} 🎮 **메뉴 선택** — 일단 메뉴를 보여줘야 선택할 수 있잖아!
{!blue} 🔐 **비밀번호 입력** — 일단 한 번은 입력받아야 맞는지 확인하지!
{!green} 🎲 **게임 라운드** — 일단 한 판은 해봐야 더 할지 결정하지!

\`\`\`cpp
// 가장 흔한 패턴: 입력 검증
int num;
do {
    cout << "1~10 사이 숫자: ";
    cin >> num;
} while (num < 1 || num > 10);
// 올바른 숫자 나올 때까지 반복!
\`\`\`

while로도 할 수 있지만, do-while이 {pink:**의도가 더 명확**}해요:

| while 버전 | do-while 버전 |
|-----------|-------------|
| 변수 초기화 필요 | 바로 실행! |
| \`while(true) { ... break; }\` | \`do { ... } while(조건);\` |
| 의도가 불분명 | **"일단 실행"**이 코드에서 보임 |

@핵심: do-while = "일단 한 번 하고, 더 할지 결정!" 입력 검증, 메뉴, 게임 루프에 딱!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "do-while!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    do {\n        cout << \"Hello\";\n        x++;\n    } while (x < 5);\n    return 0;\n}",
          options: ["아무것도 안 나옴", "Hello", "Hello 5번", "무한 반복"],
          answer: 1,
          explanation: "do-while은 최소 1번 실행! x=10이고 x < 5는 false지만, do가 먼저 실행되어 'Hello'가 1번 출력돼요."
        },
        {
          id: "ch2-fb-dowhile",
          type: "fillblank" as const,
          title: "do-while로 바꿔보기",
          content: `아래 while 루프를 do-while로 바꾸세요.

\`\`\`cpp
int n;
while (true) {
    cout << "양수를 입력: ";
    cin >> n;
    if (n > 0) break;
}
\`\`\``,
          code: "int n;\n___ {\n    cout << \"양수를 입력: \";\n    cin >> n;\n} ___(n <= 0);",
          fillBlanks: [
            { id: 0, answer: "do", options: ["do", "while", "for", "repeat"] },
            { id: 1, answer: "while", options: ["while", "until", "do", "if"] }
          ],
          explanation: "do-while은 최소 1번은 실행하고 조건을 검사해요. 입력 검증에 딱 맞는 패턴이에요!"
        },
        {
          id: "ch2-dowhile-practice",
          type: "practice" as const,
          title: "✋ do-while로 전투 메뉴 만들기!",
          content: `RPG 게임처럼 전투 메뉴가 계속 반복되도록 만들어봐요!

**3번(도망)을 누를 때까지 메뉴가 계속 나와요.**

각 선택 시 출력:
- **1번** → \`25 데미지를 입혔다!\`
- **2번** → \`현재 HP: 100\`
- **3번** → 반복 종료 후 \`도망쳤다...\`

do-while 골격은 이미 있어요 — 선택에 따른 출력을 채워보세요!`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int choice;

    do {
        cout << "=== 전투 메뉴 ===" << endl;
        cout << "1. 공격" << endl;
        cout << "2. 체력 확인" << endl;
        cout << "3. 도망" << endl;
        cout << "선택: ";
        cin >> choice;
        cout << choice << "\n";

        // 여기에 if/else로 choice에 따른 출력을 작성하세요

    } while (choice != 3);

    cout << "도망쳤다..." << endl;
    return 0;
}`,
          stdin: `1\n3`,
          expectedOutput: `=== 전투 메뉴 ===
1. 공격
2. 체력 확인
3. 도망
선택: 1
25 데미지를 입혔다!
=== 전투 메뉴 ===
1. 공격
2. 체력 확인
3. 도망
선택: 3
도망쳤다...`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "x를 3씩 줄이는 while문을 완성해봐요!",
          code: "int x = 10;\n___ (x ___ 0) {\n    cout << x << \" \";\n    x ___ 3;\n}",
          fillBlanks: [
            { id: 0, answer: "while", options: ["while", "for", "if", "do"] },
            { id: 1, answer: ">", options: [">", "<", ">=", "=="] },
            { id: 2, answer: "-=", options: ["-=", "+=", "--", "++"] }
          ],
          explanation: "while (x > 0)으로 x가 양수인 동안 반복하고, x -= 3으로 매번 3씩 줄여요. 출력: 10 7 4 1"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ while문으로 카운트다운!",
          content: `while문을 사용해서 10부터 1까지 카운트다운하는 프로그램을 만들어봐요!

0이 되면 "발사!"를 출력해요 🚀`,
          code: `#include <iostream>
using namespace std;

int main() {
    int count = 10;

    while (count > 0) {
        cout << count << "..." << endl;
        count--;
    }

    cout << "발사!" << endl;

    return 0;
}`,
          expectedOutput: `10...
9...
8...
7...
6...
5...
4...
3...
2...
1...
발사!`
        },
        {
          id: "ch2-breakcon-why",
          type: "explain",
          title: "🤔 반복 중에 멈추거나 건너뛰고 싶으면?",
          content: `반복문이 끝까지 도는 게 항상 좋은 건 아니에요!

{!pink} 🔍 **검색**: 찾고 싶은 값을 발견하면 → 더 이상 찾을 필요 없잖아!
{!blue} 🚫 **필터**: 짝수만 건너뛰고 홀수만 처리하고 싶으면?

이럴 때 \`break\`와 \`continue\`가 필요해요. 다행히 **파이썬과 완전히 같아요!** 😎`
        },
        {
          id: "ch2-breakcon",
          type: "explain",
          title: "🛑 break와 continue",
          content: `반복문 안에서 **흐름을 제어**하는 두 가지 키워드가 있어요!

\`\`\`cpp
// break: 반복문을 즉시 종료!
for (int i = 0; i < 10; i++) {
    if (i == 5) break;  // i가 5이면 반복 종료!
    cout << i << " ";
}
// 출력: 0 1 2 3 4
\`\`\`

\`\`\`cpp
// continue: 이번 회차를 건너뛰고 다음으로!
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;  // i가 2이면 건너뜀!
    cout << i << " ";
}
// 출력: 0 1 3 4  (2가 빠짐!)
\`\`\`

| 키워드 | 효과 | 파이썬과 차이 |
|--------|------|-------------|
| \`break\` | 반복문 즉시 종료 | 똑같아요! ✅ |
| \`continue\` | 이번 회차 건너뛰기 | 똑같아요! ✅ |

💡 break와 continue는 파이썬과 **완전히 같은 동작**이에요! while문에서도 for문에서도 쓸 수 있어요.`
        },
        {
          id: "ch2-fb-continue",
          type: "fillblank" as const,
          title: "continue로 건너뛰기",
          content: "1~10 중 짝수만 건너뛰고 홀수만 출력하는 코드를 완성하세요.",
          code: "for (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) ___;\n    cout << i << \" \";\n}",
          fillBlanks: [
            { id: 0, answer: "continue", options: ["continue", "break", "return", "skip"] }
          ],
          explanation: "continue는 남은 코드를 건너뛰고 다음 반복으로 갑니다. 짝수일 때 continue하면 cout이 실행되지 않아요!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "break vs continue!",
          content: `다음 코드의 출력은?

\`\`\`cpp
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
\`\`\``,
          options: ["0 1 2 3 4 ", "0 1 2 ", "0 1 2 4 ", "3 "],
          answer: 2,
          explanation: "continue는 이번 회차만 건너뛰어요! i=3일 때 건너뛰니까 0, 1, 2, 4가 출력돼요."
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
          title: "1부터 5까지 합",
          content: `출력은?

\`\`\`cpp
int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
cout << sum;
\`\`\``,
          options: ["10", "15", "20", "5"],
          answer: 1,
          explanation: "sum = 1 + 2 + 3 + 4 + 5 = 15!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "do-while vs while",
          content: "do-while문과 while문의 가장 큰 차이는?",
          options: [
            "do-while이 더 빠르다",
            "do-while은 최소 1번은 실행된다",
            "do-while은 무한 반복이다",
            "while은 C++에서 사용할 수 없다"
          ],
          answer: 1,
          explanation: "do-while은 먼저 실행하고 조건을 확인해요! 조건이 false여도 최소 1번은 실행돼요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "range() 변환",
          content: "`for i in range(0, 10, 3):`을 C++로 바꾸면?",
          options: [
            "for (int i = 0; i < 10; i++)",
            "for (int i = 0; i < 10; i += 3)",
            "for (int i = 0; i <= 10; i += 3)",
            "for (int i = 3; i < 10; i++)"
          ],
          answer: 1,
          explanation: "range(0, 10, 3)은 0부터 10 미만까지 3씩 증가! i = 0; i < 10; i += 3. 결과: 0, 3, 6, 9"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "몇 번 출력?",
          content: `"Hi"는 몇 번 출력될까?

\`\`\`cpp
for (int i = 5; i > 0; i--) {
    cout << "Hi ";
}
\`\`\``,
          options: ["4번", "5번", "6번", "무한 반복"],
          answer: 1,
          explanation: "i=5,4,3,2,1일 때 실행! i=0이면 0 > 0이 false라서 종료. 총 5번!"
        },
        {
          id: "ch3-q5",
          type: "quiz",
          title: "break의 효과!",
          content: `출력은?

\`\`\`cpp
for (int i = 0; i < 10; i++) {
    if (i == 3) break;
    cout << i << " ";
}
\`\`\``,
          options: ["0 1 2 ", "0 1 2 3 ", "3 ", "0 1 2 3 4 5 6 7 8 9 "],
          answer: 0,
          explanation: "break는 반복문을 즉시 종료해요! i=3이면 break → 반복 끝! i=0,1,2만 출력돼요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **for문** — for (초기식; 조건식; 증감식) { }
- ✅ **range() 변환** — range(n) → i = 0; i < n; i++
- ✅ **다양한 패턴** — 시작값, 끝값, 간격 모두 조절 가능
- ✅ **while문** — 파이썬과 거의 같음! () + {} 추가
- ✅ **do-while** — 최소 1번 실행! (파이썬에 없음)

🚀 **다음 시간: 함수** — 반환 타입을 직접 지정하는 C++ 함수!`
        }
      ]
    }
  ]
}
