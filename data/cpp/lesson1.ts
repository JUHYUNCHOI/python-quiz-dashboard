// ============================================
// C++ 레슨 1: 파이썬 vs C++
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================

import { LessonData } from '../types'

export const cppLesson1Data: LessonData = {
  id: "cpp-1",
  title: "파이썬 vs C++",
  emoji: "⚔️",
  description: "인터프리터 vs 컴파일러, 핵심 차이를 알아봐요!",
  chapters: [
    // ============================================
    // Chapter 1: C++을 만나자!
    // ============================================
    {
      id: "ch1",
      title: "C++을 만나자!",
      emoji: "🌍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎉 C++을 만나봐요!",
          content: `C++도 파이썬처럼 **프로그래밍 언어 중 하나**예요. 문법이 다를 뿐이에요!

파이썬을 배운 우리에게 크게 다른 점이 딱 **두 가지**:

**1. 컴파일을 해야 해요** — 파이썬에서는 안 했죠?
**2. 문법이 더 엄격해요** — 세미콜론, 중괄호 같은 게 필요해요

먼저 컴파일이 뭔지부터 알아볼게요! 🚀`
        },
        {
          id: "ch1-compile",
          type: "explain",
          title: "🔧 컴파일이 뭐예요?",
          content: `파이썬은 그냥 실행하면 바로 결과가 보였죠?

C++은 달라요! 우리가 쓴 코드를 **컴퓨터가 알아듣는 말**(0과 1)로 **바꿔야** 해요.
이걸 **컴파일**이라고 해요!

컴퓨터가 알아듣는 말로 바꾸는 건 귀찮기도 하고 때론 시간이 걸리지만...
컴퓨터가 자기 말로 된 코드를 실행하니까 **엄청 빠르게** 돌아가요! ⚡

💡 생각해 보세요. 우리도 우리말로 된 글을 읽는 게 훨씬 빠르잖아요!

아래에서 코드가 이진수로 바뀌는 걸 직접 체험해 봐요! 👇`
        },
        {
          id: "ch1-compile-viz",
          type: "interactive" as const,
          title: "코드가 이진수로 바뀌는 걸 봐봐!",
          description: "우리가 쓴 코드를 컴파일하면 컴퓨터가 알아듣는 0과 1로 바뀌어요. 직접 눌러보세요!",
          component: "compileVisualizer",
        },
      ]
    },
    // ============================================
    // Chapter 2: 첫 프로그램 만들기!
    // ============================================
    {
      id: "ch2",
      title: "첫 프로그램 만들기!",
      emoji: "📝",
      steps: [
        {
          id: "ch2-file",
          type: "explain",
          title: "📁 C++ 파일 만들기!",
          content: `이제 문법을 배워볼 건데, 먼저 C++ 파일부터 만들어 봐요!

파이썬은 파일명 뒤에 \`.py\`가 붙었죠?
C++은 파일명 뒤에 \`.cpp\`가 붙어요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| main**.py** | main**.cpp** |

우리 모두 **main.cpp** 파일을 만들어 봐요!

준비 되었나요? 그럼 이제 간단한 프로그램을 작성해 볼게요! ✨`
        },
        {
          id: "ch2-main",
          type: "explain",
          title: "🏁 int main()에서 시작!",
          content: `C++은 아무 데나 코드를 적으면 안 돼요. **int main()** 안에서 시작해야 해요!

\`\`\`cpp
int main() {

}
\`\`\`

왜냐하면 C++ 프로그램은 \`main\` 함수를 찾아서 거기부터 실행하거든요.
→ "여기가 출발점이야!"라고 알려주는 거예요.

그리고! 파이썬에서 \`:\`와 **들여쓰기**로 코드 블록을 만들었다면,
C++에서는 **{ }**를 사용해요.

\`{\`부터 \`}\`까지가 "내가 실행할 코드 블록"이에요. 괄호를 빼먹지 않도록 조심!

💡 \`int\`가 뭔지는 나중에 설명할게요! 지금은 **"이렇게 시작한다"**만 기억하세요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "C++ 프로그램의 시작 구조를 완성해봐요!",
          code: "#include <iostream>\n\n___ main() ___\n\n___",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++ 프로그램은 int main() { } 안에서 시작해요! 중괄호로 코드 블록을 감싸요."
        },
        {
          id: "ch2-include",
          type: "explain",
          title: "📦 #include <iostream>",
          content: `화면에 뭔가 출력하고 싶다면, 맨 위에 이걸 써줘야 해요:

\`\`\`cpp
#include <iostream>
\`\`\`

C++은 출력 기능이 기본으로 켜져 있지 않아요!
→ **"출력 도구를 가져와!"**라고 직접 알려줘야 해요.

파이썬에서 \`import\`를 썼던 것과 같은 개념이에요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`import math\` | \`#include <cmath>\` |
| *(출력은 그냥 됨)* | \`#include <iostream>\` |

⚠️ C++에서 출력하려면 반드시 **#include <iostream>**이 필요해요!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "include 퀴즈!",
          content: `C++에서 화면에 출력하려면 맨 위에 뭘 써야 할까요?`,
          options: [
            "import iostream",
            "#include <iostream>",
            "using iostream",
            "require iostream"
          ],
          answer: 1,
          explanation: "#include <iostream>으로 출력 도구를 가져와야 해요! 파이썬의 import와 비슷한 거예요."
        },
        {
          id: "ch2-cout",
          type: "explain",
          title: "🖨️ 첫 출력! std::cout",
          content: `출력 도구를 가져왔으니, 이제 출력을 해봐요!

\`int main()\` 블록 안에 이렇게 써보세요:

\`\`\`cpp
std::cout << "Hello" << std::endl;
\`\`\`

좀 복잡해 보이죠? 하나씩 알아봐요!

- \`std::cout\` → 화면에 출력! (파이썬의 \`print\`)
- \`<<\` → "이걸 보내!"라는 뜻
- \`std::endl\` → 줄바꿈 (파이썬 print는 자동이지만 C++은 직접!)

⚠️ C++에서는 모든 명령어 끝에 **;**를 꼭 써야 해요!
안 쓰면 컴파일할 때 바로 에러가 나요! 😱

전체 코드를 보면 이렇게 돼요:

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\`

💡 \`return 0;\`은 "프로그램 끝! 문제없이 잘 됐어요!"라는 신호예요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "어떻게 될까?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hi!" << std::endl;\n    return 0;\n}',
          options: ["Hi!", "Hi! endl", "std::cout Hi!", "에러"],
          answer: 0,
          explanation: "std::cout은 화면에 출력하고, std::endl은 줄바꿈만 해요! 화면에는 Hi!만 보여요."
        },
      ]
    },
    // ============================================
    // Chapter 3: 컴파일하고 실행!
    // ============================================
    {
      id: "ch3",
      title: "컴파일하고 실행!",
      emoji: "🚀",
      steps: [
        {
          id: "ch3-how",
          type: "explain",
          title: "⚡ 컴파일하고 실행하는 법!",
          content: `코드를 작성했으면 이제 컴파일해서 실행해 봐요!
터미널을 열고 따라해 보세요:

**1단계: 컴파일하기** 🔧
\`\`\`
g++ main.cpp
\`\`\`
\`g++\`는 C++을 컴파일하는 명령어예요!

**2단계: 실행 파일 확인** 💾
컴파일하면 **a.out**이라는 파일이 생겨요.
→ 우리가 작성한 코드가 이진수로 바뀌어서 a.out이 만들어진 거예요!

**3단계: 실행하기** ▶️
\`\`\`
./a.out
\`\`\`

화면에 **Hello**가 출력돼요! 🎉

💡 실행 파일 이름을 직접 정하고 싶다면?
\`g++ -o hello main.cpp\` → \`hello\`라는 이름의 실행 파일이 생겨요!`
        },
        {
          id: "ch3-flow",
          type: "interactive" as const,
          title: "지금까지 배운 걸 복습해보자!",
          description: "우리 프로그램이 실행되기까지의 과정을 한눈에 봐보자! 단계별로 눌러봐!",
          component: "buildRunFlow",
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ 직접 컴파일하고 실행해보세요!",
          content: `지금 배운 걸 직접 해봐요!

1. 아래 코드를 에디터에 입력하세요
2. 터미널에서 \`g++ main.cpp\` 으로 컴파일하세요
3. \`./a.out\` 으로 실행하세요

제대로 되면 "Hello, World!"가 보여요! 🎉`,
          code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
          expectedOutput: `Hello, World!`
        },
      ]
    },
    // ============================================
    // Chapter 4: cout 더 써보기
    // ============================================
    {
      id: "ch4",
      title: "cout 더 써보기",
      emoji: "📢",
      steps: [
        {
          id: "ch4-chain",
          type: "explain",
          title: "🔗 << 로 여러 개 출력!",
          content: `\`<<\`를 한 번만 쓸 수 있냐고요? 아니에요!
\`<<\`를 여러 번 써서 여러 값을 **이어붙여** 출력할 수 있어요!

\`\`\`cpp
std::cout << "이름: " << "기린" << std::endl;
// 출력: 이름: 기린
\`\`\`

💡 \`<<\`를 쓸 때마다 값이 하나씩 화면에 보내져요! 공백도 직접 넣어야 해요!`
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "어떻게 될까?",
          code: 'std::cout << "A" << "B" << "C" << std::endl;',
          options: ["A B C", "ABC", "A, B, C"],
          answer: 1,
          explanation: "C++ cout은 자동 공백이 없어요! 문자열이 그대로 이어붙여져서 ABC가 출력돼요."
        },
        {
          id: "ch4-endl",
          type: "explain",
          title: "↩️ 줄바꿈 방법 두 가지!",
          content: `\`std::endl\` 말고 \`\\n\`을 쓸 수도 있어요!

\`\`\`cpp
std::cout << "첫 번째 줄" << std::endl;
std::cout << "두 번째 줄" << std::endl;
\`\`\`

이렇게도 같은 결과가 나와요:
\`\`\`cpp
std::cout << "첫 번째 줄\\n";
std::cout << "두 번째 줄\\n";
\`\`\`

💡 둘 다 결과는 같아요! 코딩 대회에서는 \\n이 더 빨라서 \\n을 많이 써요!`
        },
        {
          id: "ch4-pred2",
          type: "predict" as const,
          title: "endl 없으면?",
          code: 'std::cout << "Hello";\nstd::cout << "World";',
          options: ["Hello와 World가 두 줄로 출력", "HelloWorld가 한 줄로 출력", "Hello World (공백 포함)"],
          answer: 1,
          explanation: "endl이 없으면 줄바꿈이 안 돼서 HelloWorld가 한 줄에 이어서 출력돼요!"
        },
      ]
    },
    // ============================================
    // Chapter 5: 정리 퀴즈
    // ============================================
    {
      id: "ch5",
      title: "정리 퀴즈",
      emoji: "🧪",
      steps: [
        {
          id: "ch5-q1",
          type: "quiz",
          title: "#include 이해하기",
          content: `C++에서 std::cout을 사용하려면 어떤 헤더를 include 해야 할까요?`,
          options: [
            "#include <stdio>",
            "#include <iostream>",
            "#include <output>",
            "#include <print>"
          ],
          answer: 1,
          explanation: "iostream은 input/output stream의 줄임말로, std::cout을 사용하려면 반드시 필요해요!"
        },
        {
          id: "ch5-q2",
          type: "quiz",
          title: "세미콜론!",
          content: `C++에서 이 코드가 에러나는 이유는?
\`\`\`cpp
std::cout << "Hi" << std::endl
\`\`\``,
          options: [
            "endl이 틀렸다",
            "<<가 틀렸다",
            "끝에 세미콜론(;)이 없다",
            "#include가 없다"
          ],
          answer: 2,
          explanation: "C++에서는 모든 명령어 끝에 반드시 ;를 써야 해요! 안 쓰면 컴파일 에러가 나요."
        },
        {
          id: "ch5-q3",
          type: "quiz",
          title: "컴파일 명령어",
          content: `main.cpp 파일을 컴파일하려면 터미널에 뭐라고 쳐야 할까요?`,
          options: [
            "python main.cpp",
            "run main.cpp",
            "g++ main.cpp",
            "compile main.cpp"
          ],
          answer: 2,
          explanation: "g++는 C++ 컴파일러예요! g++ main.cpp를 치면 a.out 실행 파일이 생겨요."
        },
        {
          id: "ch5-q4",
          type: "quiz",
          title: "실행 파일 이름 짓기",
          content: `컴파일할 때 실행 파일 이름을 "hello"로 하고 싶다면?`,
          options: [
            "g++ main.cpp hello",
            "g++ -o hello main.cpp",
            "g++ main.cpp --name hello",
            "compile -o hello main.cpp"
          ],
          answer: 1,
          explanation: "-o 옵션 뒤에 원하는 이름을 쓰면 돼요! g++ -o hello main.cpp → ./hello로 실행!"
        },
        {
          id: "ch5-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **컴파일** — C++은 코드를 이진수로 번역(컴파일)한 후 실행해요
- ✅ **.cpp** — C++ 파일 확장자 (파이썬은 .py)
- ✅ **int main() { }** — 프로그램 시작점, { }로 블록
- ✅ **#include <iostream>** — 출력 도구 가져오기
- ✅ **std::cout <<** — 화면에 출력 (= 파이썬 print)
- ✅ **std::endl** — 줄바꿈
- ✅ **;** — 모든 명령어 끝에 필수!
- ✅ **g++ 파일명.cpp** — 컴파일 → a.out 생성
- ✅ **./a.out** — 실행!
- ✅ **g++ -o 이름 파일명.cpp** — 실행 파일 이름 짓기

🚀 **다음 시간: 변수와 타입** — int, string, double로 데이터를 저장해요!`
        }
      ]
    }
  ]
}
