// ============================================
// C++ 레슨 2: cout 심화 & namespace
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================

import { LessonData } from '../types'

export const cppLesson2Data: LessonData = {
  id: "cpp-2",
  title: "cout 심화 & namespace",
  emoji: "🖨️",
  description: "cout으로 이것저것 출력하고, std의 정체를 파헤쳐요!",
  chapters: [
    // ============================================
    // Chapter 1: cout로 이것저것 출력해요!
    // ============================================
    {
      id: "ch1",
      title: "cout로 이것저것 출력해요!",
      emoji: "🖨️",
      steps: [
        {
          id: "ch1-numbers",
          type: "explain",
          title: "🔢 숫자도 출력할 수 있어요!",
          content: `지난 시간에 \`std::cout << "Hello"\` 로 문자열을 출력했죠?

프로그램은 결과를 **보여줘야 존재 가치가 있거든요!** 계산만 하고 결과를 안 보여주면... 아무도 모르잖아요? 😅 그래서 cout을 제대로 마스터하는 게 중요해요!

사실 cout은 문자열뿐만 아니라 **숫자도 출력**할 수 있어요!

\`\`\`cpp
std::cout << 42 << std::endl;       // 정수
std::cout << 3.14 << std::endl;     // 소수
std::cout << 10 + 20 << std::endl;  // 수식 → 계산 결과!
\`\`\`

출력:
\`\`\`
42
3.14
30
\`\`\`

💡 **따옴표가 없으면** 숫자나 수식이에요! 따옴표가 있으면 문자열이고요.
→ \`"42"\`는 문자열 "42", \`42\`는 숫자 42 — 완전히 달라요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "어떻게 될까?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << 10 + 20 << std::endl;\n    std::cout << "10 + 20" << std::endl;\n    return 0;\n}',
          options: ["30\n30", "10 + 20\n10 + 20", "30\n10 + 20"],
          answer: 2,
          explanation: "따옴표 없는 10+20은 계산되어 30이 출력돼요. 따옴표 안의 \"10 + 20\"은 문자열이라 그대로 출력!"
        },
        {
          id: "ch1-mix",
          type: "explain",
          title: "🔗 숫자와 문자열 섞어쓰기!",
          content: `\`<<\`를 쓰면 **문자열과 숫자를 자유롭게 섞어서** 출력할 수 있어요!

\`\`\`cpp
std::cout << "점수: " << 100 << std::endl;
// 출력: 점수: 100
\`\`\`

여러 개를 이어붙이는 것도 가능해요:
\`\`\`cpp
std::cout << "나이: " << 14 << " 이름: " << "주현" << std::endl;
// 출력: 나이: 14 이름: 주현
\`\`\`

파이썬에서는 이렇게 했었죠?
| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`print("점수:", 100)\` | \`std::cout << "점수: " << 100 << std::endl;\` |
| 자동 공백 있음 ✅ | 자동 공백 없음 ❌ |

💡 \`<<\`로 아무 타입이나 이어붙일 수 있어요! 공백은 직접 넣어야 하는 거 잊지 마세요!`
        },
        {
          id: "ch1-escape",
          type: "explain",
          title: "✨ 특수 문자 (이스케이프)",
          component: "cppEscapeBuilder",
          content: `문자열 안에서 특별한 의미를 가진 문자들이 있어요!
\`\\\`(백슬래시) 뒤에 특정 글자를 쓰면 **특수 문자**가 돼요.

\`\`\`cpp
std::cout << "첫째 줄\\n둘째 줄" << std::endl;
// 출력:
// 첫째 줄
// 둘째 줄

std::cout << "이름\\t나이" << std::endl;
std::cout << "주현\\t14" << std::endl;
// 출력:
// 이름    나이
// 주현    14
\`\`\`

자주 쓰는 이스케이프 문자:

| 코드 | 의미 | 예시 |
|------|------|------|
| \`\\n\` | 줄바꿈 | endl 대신 쓸 수 있어요 |
| \`\\t\` | 탭 (넓은 공백) | 표 만들 때 좋아요! |
| \`\\\\\` | 백슬래시(\\) 자체 | \`"C:\\\\Users"\` → C:\\Users |
| \`\\"\` | 따옴표(") 자체 | \`"He said \\"Hi\\""\` → He said "Hi" |

💡 \`\\n\`은 레슨1에서 배운 endl과 같은 역할이에요! 코딩 대회에서는 \\n을 더 많이 써요.

🤔 **왜 이스케이프가 필요할까요?** 파이썬은 문자열 안에서 줄바꿈이 자연스럽지만, C++은 한 줄 코드 안에서 특수 동작을 표현하려면 백슬래시(\\\\)를 써야 해요. 백슬래시가 "다음 글자는 특별한 의미야!"라고 알려주는 신호 역할을 하는 거예요.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 이스케이프 문자를 직접 써보세요!",
          content: `\\n, \\t, \\"를 활용해서 표 형태로 출력하는 프로그램을 만들어봐요!

탭(\\t)으로 깔끔하게 정렬되는 걸 확인해봐요!`,
          code: `#include <iostream>

int main() {
    std::cout << "이름\\t나이\\t점수" << std::endl;
    std::cout << "주현\\t14\\t100" << std::endl;
    std::cout << "민지\\t15\\t95" << std::endl;
    std::cout << "\\n수학에서 \\"A+\\"를 받았어요!" << std::endl;
    return 0;
}`,
          expectedOutput: `이름\t나이\t점수
주현\t14\t100
민지\t15\t95

수학에서 "A+"를 받았어요!`
        },
      ]
    },
    // ============================================
    // Chapter 2: std가 뭐야?
    // ============================================
    {
      id: "ch2",
      title: "std가 뭐야?",
      emoji: "📦",
      steps: [
        {
          id: "ch2-std",
          type: "explain",
          title: "🤔 std::가 뭔지 궁금했죠?",
          content: `레슨1에서 계속 \`std::cout\`, \`std::endl\` 이렇게 썼는데... 이 **std::** 가 뭘까요?

**namespace(네임스페이스)** = 이름이 충돌하지 않는 공간. **폴더**처럼 생각하면 돼요! 📁

\`\`\`
문서/사진.jpg
바탕화면/사진.jpg
\`\`\`

같은 "사진.jpg"지만 **다른 파일**이에요 — 폴더가 다르니까요!

C++도 같은 원리예요:
\`\`\`
std::cout    → std 폴더 안의 cout
std::endl    → std 폴더 안의 endl
std::string  → std 폴더 안의 string
\`\`\`

\`std\` = **standard(표준)** — C++이 기본으로 제공하는 모든 도구가 여기 들어있어요.

@핵심: 규칙: **그룹이름** + **::** + **도구이름** → \`std::cout\`, \`std::endl\``
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "이 코드는 될까?",
          code: '#include <iostream>\n\nint main() {\n    cout << "Hi!" << endl;\n    return 0;\n}',
          options: ["Hi!", "에러! (cout을 못 찾음)", "Hi!endl"],
          answer: 1,
          explanation: "std:: 없이 cout만 쓰면 컴파일러가 cout이 뭔지 몰라요! std::cout이라고 써야 찾을 수 있어요."
        },
      ]
    },
    // ============================================
    // Chapter 3: using namespace std
    // ============================================
    {
      id: "ch3",
      title: "using namespace std",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-using",
          type: "explain",
          title: "⚡ 매번 std:: 쓰기 귀찮다면?",
          content: `솔직히 매번 \`std::cout\`, \`std::endl\` 쓰는 거... 좀 귀찮죠? 😅

해결책이 있어요!

\`\`\`cpp
using namespace std;
\`\`\`

이 한 줄을 맨 위에 써주면 **std:: 를 전부 생략**할 수 있어요!

**Before** 😮‍💨:
\`\`\`cpp
std::cout << "Hello" << std::endl;
std::cout << "World" << std::endl;
\`\`\`

**After** 😎:
\`\`\`cpp
cout << "Hello" << endl;
cout << "World" << endl;
\`\`\`

훨씬 깔끔하죠?

💡 \`using namespace std;\` = "std 그룹의 이름을 **전부 가져와**!" 라는 뜻이에요.
→ \`#include <iostream>\` 바로 밑에 써주면 돼요!`
        },
        {
          id: "ch3-full",
          type: "explain",
          title: "📝 전체 코드 비교!",
          content: `두 코드를 나란히 비교해 볼게요:

**std:: 쓰는 버전:**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello!" << std::endl;
    std::cout << "점수: " << 100 << std::endl;
    return 0;
}
\`\`\`

**using namespace std; 쓰는 버전:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello!" << endl;
    cout << "점수: " << 100 << endl;
    return 0;
}
\`\`\`

둘 다 **결과는 완전히 똑같아요!** 단지 타이핑이 줄어드는 거예요.

⚠️ **앞으로 우리는 \`using namespace std;\`를 써서 코드를 깔끔하게 할게요!**
→ \`std::cout\` 대신 \`cout\`, \`std::endl\` 대신 \`endl\`!`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "이 코드의 출력은?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello" << endl;\n    return 0;\n}',
          options: ["Hello", "에러! (std::가 없어서)", "std::Hello"],
          answer: 0,
          explanation: "using namespace std; 덕분에 cout과 endl을 std:: 없이 쓸 수 있어요! 정상적으로 Hello가 출력돼요."
        },
        {
          id: "ch3-pred2",
          type: "predict" as const,
          title: "이건 어떨까?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "A" << "\\t" << "B" << endl;\n    return 0;\n}',
          options: ["A\\tB", "AB", "A\tB (탭으로 벌어짐)"],
          answer: 2,
          explanation: "\\t는 탭 문자예요! A와 B 사이에 넓은 공백(탭)이 들어가서 A    B 처럼 출력돼요."
        },
      ]
    },
    // ============================================
    // Chapter 4: 정리 퀴즈
    // ============================================
    {
      id: "ch4",
      title: "정리 퀴즈",
      emoji: "🧪",
      steps: [
        {
          id: "ch4-q1",
          type: "quiz",
          title: "수식 출력",
          content: `\`cout << 5 * 3 << endl;\`의 출력은?`,
          options: [
            "5 * 3",
            "15",
            "53",
            "에러"
          ],
          answer: 1,
          explanation: "따옴표 없는 5 * 3은 수식이라 계산돼요! 5 × 3 = 15가 출력돼요."
        },
        {
          id: "ch4-q2",
          type: "quiz",
          title: "using namespace std",
          content: `\`using namespace std;\`의 역할은?`,
          options: [
            "iostream을 불러온다",
            "std:: 를 생략할 수 있게 해준다",
            "프로그램을 더 빠르게 만든다",
            "main() 함수를 자동으로 만든다"
          ],
          answer: 1,
          explanation: "using namespace std; 를 쓰면 std:: 를 생략하고 cout, endl 등을 바로 쓸 수 있어요!"
        },
        {
          id: "ch4-q3",
          type: "quiz",
          title: "탭 문자",
          content: `문자열 안에서 탭(넓은 공백)을 넣으려면?`,
          options: [
            "\\s",
            "\\t",
            "\\tab",
            "\\b"
          ],
          answer: 1,
          explanation: "\\t는 탭 문자예요! \\n은 줄바꿈, \\t는 탭 — 이 두 개가 가장 많이 쓰여요."
        },
        {
          id: "ch4-q4",
          type: "quiz",
          title: "문자열 안에 따옴표 넣기",
          content: `\`He said "Hi"\`를 출력하려면 어떻게 써야 할까요?`,
          options: [
            'cout << "He said "Hi"" << endl;',
            'cout << "He said \\"Hi\\"" << endl;',
            'cout << "He said \'Hi\'" << endl;',
            "cout << 'He said \"Hi\"' << endl;"
          ],
          answer: 1,
          explanation: '문자열 안에 따옴표를 넣으려면 \\"를 써야 해요! 그냥 "를 쓰면 문자열이 끝나버려요.'
        },
        {
          id: "ch4-practice",
          type: "practice" as const,
          title: "✋ 이스케이프 + namespace 종합 연습!",
          content: `오늘 배운 이스케이프 문자와 \`using namespace std;\`를 합쳐서 연습해봐요!

\\n, \\t, \\"를 활용하고, using namespace std; 덕분에 std:: 없이 깔끔하게 쓸 수 있어요!`,
          code: `#include <iostream>
using namespace std;

int main() {
    cout << "=== 성적표 ===" << endl;
    cout << "이름\\t국어\\t수학" << endl;
    cout << "주현\\t95\\t100" << endl;
    cout << "민지\\t88\\t92" << endl;
    cout << "\\n선생님이 \\"잘했어!\\"라고 했어요." << endl;
    return 0;
}`,
          expectedOutput: `=== 성적표 ===
이름\t국어\t수학
주현\t95\t100
민지\t88\t92

선생님이 "잘했어!"라고 했어요.`
        },
        {
          id: "ch4-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘 배운 것 정리!

- ✅ **숫자 출력** — 따옴표 없으면 숫자, 있으면 문자열
- ✅ **수식 출력** — \`10 + 20\` → 계산되어 \`30\` 출력
- ✅ **타입 섞어쓰기** — \`"점수: " << 100\` 처럼 문자열 + 숫자 OK
- ✅ **이스케이프 문자** — \\n(줄바꿈), \\t(탭), \\\\(백슬래시), \\"(따옴표)
- ✅ **std** — C++ 표준 라이브러리 namespace (이름 공간)
- ✅ **namespace** — 이름 충돌 방지용 "폴더" 같은 것
- ✅ **using namespace std;** — std:: 생략 가능!

🚀 **다음 시간: 변수와 타입** — int, double, string으로 데이터를 저장해요!`
        }
      ]
    }
  ]
}
