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
      title: "C++로 Hello를 찍어보자!",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎉 C++을 만나봐요!",
          content: `마인크래프트를 해본 적 있나요? 마인크래프트는 C++로 만들어졌어요! 리그오브레전드, 포트나이트도요. 여러분이 매일 쓰는 프로그램 대부분이 C++로 만들어져 있어요.

C++도 파이썬처럼 **프로그래밍 언어 중 하나**예요. 문법이 다를 뿐이에요!

그런데 **왜 C++을 배울까요?** 🤔

우리가 매일 하는 **게임** (언리얼 엔진, LOL, 마인크래프트), **운영체제** (Windows, macOS), **임베디드 시스템** (로봇, 자동차, IoT 기기)... 이런 것들이 전부 C++로 만들어져요!

C++은 **속도가 빠르고 하드웨어를 직접 제어**할 수 있어서, 성능이 중요한 곳에서는 거의 필수예요. 코딩 대회(USACO, IOI)에서도 C++이 가장 인기 있어요! 🏆

파이썬을 배운 우리에게 크게 다른 점이 딱 **두 가지**:

**1. 컴파일을 해야 해요** — 파이썬에서는 안 했죠?
**2. 문법이 더 엄격해요** — 세미콜론, 중괄호 같은 게 필요해요`
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

💡 생각해 보세요. 우리도 우리말로 된 글을 읽는 게 훨씬 빠르잖아요!`,
          component: "compileVisualizer",
        },
        // ── 컴파일 이해 확인 ──
        {
          id: "ch1-quiz-compile",
          type: "quiz",
          title: "컴파일을 이해했나 확인!",
          content: `파이썬은 코드를 바로 실행하지만, C++은 실행 전에 한 단계가 더 필요해요.

그 단계는 뭘까요?`,
          options: ["컴파일", "디버깅", "포맷팅", "업로드"],
          answer: 0,
          explanation: "C++은 코드를 컴퓨터가 알아듣는 0과 1(기계어)로 변환하는 '컴파일' 과정이 필요해요! 디버깅은 버그를 찾는 거고, 포맷팅은 코드를 예쁘게 정리하는 거예요."
        },
        // ── 자연스러운 전환: 이제 직접 찍어보자! ──
        {
          id: "ch1-file",
          type: "practice" as const,
          title: "📁 직접 .cpp 파일을 만들어보자!",
          content: `컴파일이 뭔지 알았으니, 이제 직접 코드를 써볼 거예요!

먼저 C++ 파일을 만들어야 해요.

파이썬은 파일명 뒤에 \`.py\`가 붙었죠?
C++은 파일명 뒤에 \`.cpp\`가 붙어요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| main**.py** | main**.cpp** |

🎯 **지금 해보세요!** 여러분이 사용하는 에디터(VS Code, CLion 등)를 열고 **main.cpp** 파일을 새로 만들어보세요!

아직 안에 뭘 쓸지는 모르니까, 일단 빈 파일만 만들면 돼요. 다음 단계에서 같이 채울 거예요! ✨`,
          code: `// main.cpp 파일을 만들었나요?\n// 아직 비어있어도 괜찮아요!\n// 지금부터 같이 채워볼 거예요 😊`,
          expectedOutput: ``
        },
        // ── Step 1: 먼저 "뭔가 찍고 싶다!" → cout 소개 ──
        {
          id: "ch2-cout-intro",
          type: "explain",
          title: "🖨️ 화면에 뭔가 찍어보자!",
          content: `파이썬에서는 이렇게 했었죠?

\`\`\`python
print("Hello")
\`\`\`

C++에서는 이렇게 써요:

\`\`\`cpp
std::cout << "Hello" << std::endl;
\`\`\`

좀 길죠? 하나씩 알아볼게요:

- \`std::cout\` → 화면에 출력! (파이썬의 \`print\`)
- \`<<\` → "이걸 보내!"라는 뜻 (화살표 방향을 봐요! 왼쪽으로 보내는 거예요)
- \`std::endl\` → 줄바꿈 (파이썬은 자동이지만 C++은 직접!)
- \`;\` → 문장 끝! C++은 **모든 명령어 끝에 세미콜론**이 필요해요

(std::는 나중에 자세히 배워요! 지금은 **'표준 도구를 쓴다'**는 의미로만 알아두세요 📌)`
        },
        // ── cout 바로 확인! ──
        {
          id: "ch2-quiz-cout",
          type: "quiz",
          title: "파이썬 → C++ 변환!",
          content: `파이썬에서 \`print("Hello")\`는 화면에 Hello를 출력하죠?

C++에서 같은 일을 하려면 어떻게 써야 할까요?`,
          options: [
            'std::cout << "Hello" << std::endl;',
            'print("Hello");',
            'echo "Hello";',
            'System.out.println("Hello");'
          ],
          answer: 0,
          explanation: "파이썬의 print() = C++의 std::cout << ! 그리고 끝에 세미콜론(;)을 붙여야 해요!"
        },
        // ── Step 2: "근데 그냥 못 써요!" → #include 필요성 ──
        {
          id: "ch2-include",
          type: "explain",
          title: "📦 근데 잠깐! 그냥은 못 써요",
          content: `cout을 쓰고 싶다고 바로 쓸 수 있는 게 아니에요!

C++은 출력 기능이 **기본으로 켜져 있지 않거든요.**
→ 먼저 **"출력 도구를 가져와!"**라고 알려줘야 해요.

그게 바로 이거예요:
\`\`\`cpp
#include <iostream>
\`\`\`

파이썬에서 \`import\`를 썼던 것과 같은 개념이에요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`import math\` | \`#include <cmath>\` |
| *(출력은 그냥 됨)* | \`#include <iostream>\` |

💡 비유하면, **#include는 공구함에서 필요한 공구를 꺼내는 것**이에요. 출력이 필요하면 iostream 공구를, 수학이 필요하면 cmath 공구를 꺼내요! 🧰

⚠️ 이걸 빼면? 컴파일러가 **"cout이 뭔데?"**라고 에러를 내요!`
        },
        // ── include 바로 확인 ──
        {
          id: "ch2-q1a",
          type: "quiz",
          title: "#include를 빼면?",
          content: `#include <iostream>을 빼고 cout을 쓰면 어떻게 될까요?`,
          options: [
            "프로그램이 느려진다",
            "cout을 사용할 수 없다 (컴파일 에러)",
            "프로그램이 실행되지만 출력이 안 된다",
            "아무 문제 없다"
          ],
          answer: 1,
          explanation: "#include <iostream>은 cout과 cin을 사용하기 위해 필요한 선언이에요. 빼면 컴파일러가 cout을 모르겠다고 에러를 내요!"
        },
        // ── Step 3: "코드는 어디에?" → main() ──
        {
          id: "ch2-main",
          type: "explain",
          title: "🏁 코드는 어디에 쓸까? int main()!",
          content: `도구도 가져왔고, 출력도 배웠어요. 그런데 코드를 **아무 데나 쓸 수는 없어요!**

C++ 프로그램은 **int main()** 안에서 시작해요:

\`\`\`cpp
int main() {
    // 여기에 코드를 써요!
}
\`\`\`

왜냐하면 C++ 프로그램은 \`main\`이라는 함수를 찾아서 **거기부터 실행**하거든요.
→ "여기가 출발점이야!"라고 알려주는 거예요.

파이썬에서 \`:\`와 **들여쓰기**로 코드 블록을 만들었다면,
C++에서는 **{ }**를 사용해요. 괄호를 빼먹지 않도록 조심!

💡 \`int\`가 뭔지는 나중에 설명할게요! 지금은 **"이렇게 시작한다"**만 기억하세요.`
        },
        // ── main 바로 확인 ──
        {
          id: "ch2-fb-main",
          type: "fillblank" as const,
          title: "C++ 프로그램의 시작점!",
          content: "빈칸을 채워서 C++ 프로그램 시작점을 만들어봐요!",
          code: "___ main() ___\n    // 코드는 여기에!\n___",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++은 int main() { } 안에서 시작해요! 파이썬의 : 대신 { }를 써요."
        },
        // ── Step 4: 전체 조립! ──
        {
          id: "ch2-assemble",
          type: "explain",
          title: "🧩 전체 코드 조립!",
          component: "helloWorldBuilder",
          content: `자, 이제 배운 것들을 합쳐볼까요?

**① 도구 가져오기** → \`#include <iostream>\`
**② 시작점 만들기** → \`int main() { }\`
**③ 출력하기** → \`std::cout << "Hello" << std::endl;\`
**④ 끝 신호** → \`return 0;\`

합치면 이렇게 돼요:

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\`

\`return 0;\`은 **"문제 없이 끝났어요!"**라는 신호예요. 시험 끝나고 "다 풀었습니다!" 하고 손 드는 것과 같아요! ✋

🎉 축하해요! 이게 여러분의 **첫 번째 C++ 프로그램**이에요!`
        },
        // ── Step 5: 예측 → 이해 확인 ──
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "이 코드는 뭘 출력할까?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hi!" << std::endl;\n    return 0;\n}',
          options: ["Hi!", "Hi! endl", "std::cout Hi!", "에러"],
          answer: 0,
          explanation: "std::cout은 화면에 출력하고, std::endl은 줄바꿈만 해요! 화면에는 Hi!만 보여요."
        },
        // ── Step 6: 빈칸 채우기 ──
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "전체 프로그램 완성!",
          content: "배운 것 전부 합쳐서 완성해봐요!",
          code: "___ <iostream>\n\nint main() {\n    std::cout ___ \"Hello\" ___ std::endl;\n    return 0;\n}",
          fillBlanks: [
            { id: 0, answer: "#include", options: ["#include", "import", "using", "require"] },
            { id: 1, answer: "<<", options: ["<<", ">>", "->", "=="] },
            { id: 2, answer: "<<", options: ["<<", ">>", "+", "&&"] }
          ],
          explanation: "#include로 도구를 가져오고, << 로 값을 cout에 보내요! <<는 '이걸 보내!'라는 뜻이에요."
        },
        // ── Step 7: 퀴즈로 마무리 ──
        {
          id: "ch2-q1",
          type: "quiz",
          title: "#include 퀴즈!",
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
\`g++ -o hello main.cpp\` → \`hello\`라는 이름의 실행 파일이 생겨요!`,
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
