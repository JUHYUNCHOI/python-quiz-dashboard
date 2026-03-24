// ============================================
// C++ 레슨 4: cin 입력
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================

import { LessonData } from '../types'

export const cppLesson4Data: LessonData = {
  id: "cpp-4",
  title: "cin 입력",
  emoji: "⌨️",
  description: "cin >>으로 사용자 입력을 받아요!",
  chapters: [
    // ============================================
    // Chapter 1: cin >> 기본
    // ============================================
    {
      id: "ch1",
      title: "cin으로 입력받기",
      emoji: "⌨️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "⌨️ 키보드로 입력받기!",
          component: "cppCinBuilder",
          content: `파이썬에서는 \`input()\` 하나로 끝이었죠?
C++은 3단계가 필요해요!

파이썬은 input() 한 줄이면 끝이지만, C++은 3단계가 필요해요: ① 변수 선언 ② 안내 메시지 출력 ③ cin으로 입력. 왜? C++은 변수 타입을 미리 정해야 하니까요!

\`\`\`cpp
string name;                    // 1. 변수 먼저 선언
cout << "이름을 입력하세요: ";   // 2. 안내 메시지 출력
cin >> name;                     // 3. 입력 받기!
\`\`\`

\`>>\` 기호는 **"받아오다"** 라는 뜻이에요!
cin(키보드)에서 데이터를 **받아와서** 변수에 넣는 거예요.

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`name = input("이름: ")\` | \`cin >> name;\` |
| 한 줄로 끝! | 선언 → 안내 → 입력 3단계 |

💡 cin = **c**haracter **in**put의 약자! 키보드에서 글자를 받아온다는 뜻이에요.`
        },
        {
          id: "ch1-pred0",
          type: "predict" as const,
          title: "이 코드는 뭘 할까?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int age;\n    cout << \"나이: \";\n    cin >> age;\n    cout << age << \"살!\";\n    return 0;\n}\n// 입력: 14",
          options: ["14", "나이: 14살!", "14살!", "에러"],
          answer: 2,
          explanation: "cin >> age로 14를 받고, cout으로 '14살!'을 출력해요. '나이: '는 입력 전에 이미 출력됐어요!"
        },
        {
          id: "ch1-arrows",
          type: "explain",
          title: "⬅️ << vs >> 구분하기!",
          content: `cout과 cin에서 화살표 방향이 다른 거, 눈치챘나요?

\`\`\`cpp
cout << "Hello!";   // 출력: 화면으로 보내기 →
cin >> name;         // 입력: 키보드에서 받기 ←
\`\`\`

| 기호 | 사용처 | 데이터 흐름 |
|------|--------|-------------|
| \`<<\` | cout (출력) | 프로그램 → 화면으로 **보내기** |
| \`>>\` | cin (입력) | 키보드 → 변수로 **받기** |

화살표 방향으로 생각하면 헷갈리지 않아요!
→ \`<<\` 화면 쪽으로 보내기 (출력)
→ \`>>\` 변수 안으로 받기 (입력)

💡 **데이터가 흘러가는 방향**이에요! cout << 은 밖으로, cin >> 은 안으로!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "나이를 입력받는 코드를 완성해요!",
          code: "int age;\ncout << \"나이: \";\n___ ___ age;",
          fillBlanks: [
            { id: 0, answer: "cin", options: ["cin", "cout", "input", "scan"] },
            { id: 1, answer: ">>", options: [">>", "<<", "==", "->"] }
          ],
          explanation: "입력은 cin >>를 사용해요! cout <<(출력)과 방향이 반대예요."
        },
        {
          id: "ch1-auto",
          type: "explain",
          title: "🎯 숫자 입력이 편해요!",
          content: `파이썬에서는 숫자를 입력받으려면 \`int(input())\` 이렇게 형변환을 했어야 했죠?

**파이썬 🐍** — 형변환 필수
\`\`\`python
age = int(input("나이: "))   # int()로 감싸야 함!
\`\`\`

**C++ ⚡** — 타입에 맞게 자동!
\`\`\`cpp
int age;
cin >> age;       // int 변수니까 자동으로 정수 입력!

double score;
cin >> score;     // double 변수니까 자동으로 실수 입력!
\`\`\`

C++은 변수 타입에 맞게 **알아서 읽어주니까** 형변환이 필요 없어요!

💡 이게 바로 **타입을 미리 정하는 장점**이에요. 컴퓨터가 뭘 받아야 할지 이미 알고 있으니까요!

만약 int 변수에 '안녕'을 입력하면? cin이 **실패 상태**에 빠져요. 변수에는 0이 들어가고, 이후 모든 cin이 작동을 멈춰요! 프로그램이 멈춘 것처럼 보여요 😱 (에러 처리는 나중에 배워요!)`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 입력받아서 출력해보세요!",
          content: `이름과 나이를 입력받아서 인사하는 프로그램을 만들어봐요!

에디터에서 아래 코드를 **직접 입력**하고, 컴파일해서 실행해보세요.
실행하면 이름과 나이를 입력할 수 있어요!`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;

    cout << "이름을 입력하세요: ";
    cin >> name;

    cout << "나이를 입력하세요: ";
    cin >> age;

    cout << "안녕하세요, " << name << "! ";
    cout << age << "살이군요!" << endl;

    return 0;
}`,
          expectedOutput: `이름을 입력하세요: 주현
나이를 입력하세요: 14
안녕하세요, 주현! 14살이군요!`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "<< vs >> 구분!",
          content: `cout은 ___ 를 사용하고, cin은 ___ 를 사용해요.`,
          options: [
            "<< / >>",
            ">> / <<",
            "<< / <<",
            ">> / >>"
          ],
          answer: 0,
          explanation: "cout << (출력)는 데이터를 화면으로 보내고, cin >> (입력)는 데이터를 변수로 받아와요!"
        }
      ]
    },
    // ============================================
    // Chapter 2: 여러 값 입력, getline
    // ============================================
    {
      id: "ch2",
      title: "다양한 입력 방법",
      emoji: "📥",
      steps: [
        {
          id: "ch2-multi",
          type: "explain",
          title: "🔗 여러 값 한 번에 입력받기!",
          content: `cin >>를 이어붙이면 여러 값을 한 번에 받을 수 있어요!

\`\`\`cpp
string name;
int age;
cin >> name >> age;
// 입력: 주현 14 (공백으로 구분!)
\`\`\`

공백이나 엔터로 구분해서 입력하면 name에 "주현", age에 14가 들어가요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`name, age = input().split()\` | \`cin >> name >> age;\` |
| split()으로 나눠야 함 | 자동으로 공백에서 나뉨! |

💡 cin >>는 공백을 기준으로 자동으로 나눠줘요. split() 같은 건 필요 없어요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "이 코드의 출력은?",
          content: "힌트: a와 b는 int(정수)예요. + 는 수학 덧셈!",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}\n// 입력: 3 5",
          options: ["35", "8", "3 5", "에러"],
          answer: 1,
          explanation: "cin >> a >> b로 3과 5를 각각 받고, int끼리의 + 는 수학 덧셈이라서 3 + 5 = 8이 출력돼요! 파이썬처럼 문자열 합침(\"3\"+\"5\"=\"35\")이 아니에요."
        },
        {
          id: "ch2-trap",
          type: "explain",
          title: "⚠️ cin의 함정: 공백!",
          content: `cin >>에는 큰 함정이 하나 있어요!

\`\`\`cpp
string name;
cin >> name;
// 입력: 홍 길동
// name에는 "홍"만 들어감! 😱
\`\`\`

cin >>는 **공백을 만나면 거기서 멈춰요**!

공백을 포함해서 한 줄 전체를 읽으려면? → **getline()** 사용!
\`\`\`cpp
string fullName;
getline(cin, fullName);
// 입력: 홍 길동
// fullName = "홍 길동" (전체가 들어감! ✅)
\`\`\`

| 함수 | 공백 | 용도 |
|------|------|------|
| \`cin >>\` | 공백에서 멈춤 ❌ | 단어 하나, 숫자 |
| \`getline(cin, 변수)\` | 공백 포함 ✅ | 한 줄 전체 |

💡 이름처럼 공백이 있을 수 있는 입력은 getline()을 쓰세요!

cin >>는 빠르게 한 단어씩 읽도록 설계됐어요. 하지만 '홍 길동' 같은 전체 이름이 필요하면? getline()을 써야 해요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "한 줄 전체를 입력받는 코드를 만들어요!",
          code: "string sentence;\n___(cin, ___);",
          fillBlanks: [
            { id: 0, answer: "getline", options: ["getline", "readline", "input", "cin"] },
            { id: 1, answer: "sentence", options: ["sentence", "\"sentence\"", "cin", "endl"] }
          ],
          explanation: "공백을 포함한 한 줄 전체를 읽으려면 getline(cin, 변수명)을 사용해요!"
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "이 코드의 출력은?",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    int age;\n    cin >> name >> age;\n    cout << name << \"은 \" << age << \"살\" << endl;\n    return 0;\n}\n// 입력: 주현 14",
          options: ["에러", "주현 14은 0살", "주현은 14살", "주현 은 14살"],
          answer: 2,
          explanation: "공백을 기준으로 '주현'은 name에, '14'는 age에 들어가요. 결과: '주현은 14살'"
        },
        {
          id: "ch2-ignore",
          type: "explain",
          title: "⚠️ cin >> 다음에 getline 쓸 때 주의!",
          component: "cinBufferVisualizer",
          content: `숫자를 입력받은 뒤 바로 문장을 입력받으면 이상하게 동작해요.

\`\`\`cpp
int age;
string name;
cin >> age;       // 나이 입력: "14↵" → 14만 읽고 ↵는 그대로 남음
getline(cin, name); // ↵를 발견하고 바로 끝 → name이 빈 문자열!
\`\`\`

**원인:** \`cin >>\` 는 입력받고 나서 엔터를 지우지 않아요. 뒤에 오는 \`getline()\` 이 그 엔터를 읽고 끝나버려요.

**해결:** 사이에 \`cin.ignore();\` 한 줄만 넣으면 돼요!

\`\`\`cpp
cin >> age;
cin.ignore();       // 남은 엔터 제거
getline(cin, name); // 이제 정상 동작 ✅
\`\`\`

아래 애니메이션에서 직접 확인해보세요! 👇`
        },
        {
          id: "ch2-decision",
          type: "explain",
          title: "cin >> vs getline() 선택 가이드",
          content: `| 상황 | 사용할 것 |
|---|---|
| 숫자 하나 | \`cin >>\` |
| 단어 하나 | \`cin >>\` |
| 공백 포함 문장 | \`getline()\` |
| 숫자 → 문장 순서 | \`cin >>\` → \`cin.ignore()\` → \`getline()\` |

💡 기본 규칙: 공백이 필요하면 getline(), 아니면 cin >>!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ getline과 cin.ignore를 직접 써보세요!",
          content: `나이(숫자)와 좋아하는 음식(공백 포함)을 입력받는 프로그램이에요!

**먼저 cin.ignore()를 지우고** 실행해보세요. 음식 입력이 건너뛰어지는 걸 직접 볼 수 있어요!
그다음 cin.ignore()를 다시 넣고 실행하면 정상 작동해요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string food;

    cout << "나이: ";
    cin >> age;

    cin.ignore();  // ← 이걸 지우고 실행해보세요!

    cout << "좋아하는 음식: ";
    getline(cin, food);

    cout << age << "살, 좋아하는 음식: " << food << endl;

    return 0;
}`,
          expectedOutput: `나이: 14
좋아하는 음식: 치킨 버거
14살, 좋아하는 음식: 치킨 버거`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "cin.ignore() 필요한 경우!",
          content: `cin.ignore()를 반드시 써야 하는 상황은?`,
          options: [
            "cin >> 만 쓸 때",
            "getline()만 쓸 때",
            "cin >> 다음에 getline()을 쓸 때",
            "cout << 다음에 cin >> 을 쓸 때"
          ],
          answer: 2,
          explanation: "cin >>는 엔터(\\n)를 남기고, getline()은 그 엔터를 읽어버려요! cin.ignore()로 남은 엔터를 버려야 해요."
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
          title: "cin 기본 문법",
          content: `C++에서 정수를 입력받는 올바른 코드는?`,
          options: [
            `int x = input();`,
            `cin << x;`,
            `int x; cin >> x;`,
            `cin(x);`
          ],
          answer: 2,
          explanation: "먼저 int x;로 변수를 선언하고, cin >> x;로 입력을 받아요. >>는 입력 연산자예요!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "공백 포함 입력",
          content: `"홍 길동"처럼 공백이 포함된 이름을 입력받으려면?`,
          options: [
            `cin >> name;`,
            `getline(cin, name);`,
            `cin.read(name);`,
            `input(name);`
          ],
          answer: 1,
          explanation: "cin >>는 공백에서 멈추니까, 공백을 포함한 한 줄 전체를 읽으려면 getline(cin, name)을 써요!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "입력 함수 선택",
          content: `숫자 하나와 공백이 포함된 문장을 순서대로 입력받으려면?`,
          options: [
            "둘 다 cin >> 사용",
            "둘 다 getline() 사용",
            "숫자는 cin >>, 문장은 getline()",
            "숫자는 getline(), 문장은 cin >>"
          ],
          answer: 2,
          explanation: "숫자는 cin >>으로 간단히 받고, 공백이 포함된 문장은 getline()으로 받아야 전체를 읽을 수 있어요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "최종 점검!",
          content: `다음 중 C++ 입출력에 대해 **틀린** 설명은?`,
          options: [
            "cout은 <<를, cin은 >>를 사용한다",
            "cin >>는 공백을 만나면 입력을 멈춘다",
            "getline()은 한 줄 전체를 입력받는다",
            "cin >>에 잘못된 타입을 입력하면 바로 프로그램이 종료된다"
          ],
          answer: 3,
          explanation: "cin >>에 잘못된 타입을 입력하면 프로그램이 종료되는 게 아니라, 입력이 실패하고 변수에 이상한 값이 들어갈 수 있어요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **cin >>** — 키보드에서 입력받기 (파이썬의 input())
- ✅ **<< vs >>** — cout은 <<(보내기), cin은 >>(받기)
- ✅ **자동 타입 매칭** — int 변수면 정수, double이면 실수로 자동!
- ✅ **여러 값 입력** — cin >> a >> b; (공백으로 구분)
- ✅ **cin의 함정** — 공백을 만나면 멈춤!
- ✅ **getline()** — 공백 포함 한 줄 전체 읽기

🚀 **다음 시간: 연산자** — 정수 나눗셈, ++, &&, || 연산자를 배워요!`
        }
      ]
    }
  ]
}
