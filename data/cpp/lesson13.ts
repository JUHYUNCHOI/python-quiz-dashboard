// ============================================
// C++ Lesson 13: 포인터 기초
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson13Data: LessonData = {
  id: "cpp-13",
  title: "포인터 기초",
  emoji: "📍",
  description: "메모리 주소를 직접 다루는 포인터!",
  chapters: [
    // ============================================
    // Chapter 1: 포인터란?
    // ============================================
    {
      id: "ch1",
      title: "포인터란?",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎯 포인터란 무엇일까요?",
          content: `C++은 메모리를 직접 다룰 수 있는 언어예요. 파이썬에서는 불가능했죠! 포인터는 **메모리 주소를 저장하는 변수**예요. 이걸 알면 프로그램이 어떻게 동작하는지 깊이 이해할 수 있어요.

컴퓨터 메모리를 **아파트 건물**이라고 상상해 봐요! 🏢

변수를 만들면, 그 변수는 아파트의 한 **호실**에 들어가요. 각 호실에는 **주소(번호)**가 있죠!

\`\`\`cpp
int x = 42;
cout << &x;   // x의 메모리 주소 출력!
// 출력 예: 0x7ffd5e8a3b2c
\`\`\`

\`&x\`는 "x가 살고 있는 호실 번호(주소)를 알려줘!"라는 뜻이에요.

**포인터(pointer)**는 이 **주소를 저장하는 변수**예요!

| 비유 🏢 | C++ |
|---|---|
| 아파트 건물 | 컴퓨터 메모리 |
| 호실 번호 | 메모리 주소 (\`&x\`) |
| 호실 번호를 적어둔 메모지 | 포인터 변수 (\`int* ptr\`) |
| 호실에 가서 내용 확인 | 역참조 (\`*ptr\`) |

파이썬에서는 이런 걸 전혀 신경 안 써도 됐어요! 파이썬이 알아서 메모리를 관리해 줬거든요. 하지만 C++에서는 **직접 주소를 다룰 수 있어요**.

언제 포인터를 쓸까요? ① 큰 데이터를 복사하지 않고 전달할 때 ② 함수에서 여러 값을 수정할 때 ③ 동적 메모리 할당(나중에 배울 new/delete)할 때. 지금은 '메모리를 직접 다루는 도구'라고 이해하세요!

💡 \`&\`는 **주소 연산자** — "이 변수의 주소가 뭐야?"라고 물어보는 거예요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "포인터로 값 읽기!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int* ptr = &x;\n    cout << *ptr;\n    return 0;\n}",
          options: ["10", "0x7ffd...", "ptr", "에러"],
          answer: 0,
          explanation: "ptr은 x의 주소를 저장하고 있어요. *ptr은 '그 주소에 가서 값을 읽어와!'라는 뜻이에요. x의 값인 10이 출력돼요!"
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 포인터 선언과 역참조",
          content: `포인터를 만들고 사용하는 방법을 자세히 배워봐요!

**포인터 선언:** \`int* ptr = &x;\`
- \`int*\` — "int 값의 주소를 저장하는 포인터"라는 타입이에요
- \`&x\` — x의 주소를 가져와요

**역참조(dereference):** \`*ptr\`
- 포인터가 가리키는 주소에 가서 **값을 읽거나 수정**할 수 있어요!

\`\`\`cpp
int x = 42;
int* ptr = &x;    // ptr에 x의 주소 저장
cout << *ptr;     // 42 — 역참조로 값 읽기

*ptr = 100;       // 포인터를 통해 값 수정!
cout << x;        // 100 — x도 바뀜!
\`\`\`

포인터로 값을 바꾸면 원래 변수도 바뀌어요! 참조(\`&\`)와 비슷하지만, 포인터는 **더 유연**해요.

| 기호 | 의미 | 예시 |
|---|---|---|
| \`&x\` | x의 주소를 가져와 | \`int* ptr = &x;\` |
| \`*ptr\` | ptr이 가리키는 값 | \`cout << *ptr;\` |
| \`int*\` | 포인터 타입 선언 | \`int* ptr;\` |

💡 \`&\`는 "주소 알려줘!", \`*\`는 "그 주소에 가서 값 봐!"예요!

⚠️ 주의! &는 **두 가지 의미**가 있어요:
• \`int& ref = x;\` → **참조** (별명 만들기)
• \`&x\` → **주소 연산자** (x의 메모리 주소 가져오기)
문맥에서 구분하세요!

> 💡 **이 레슨을 배우는 이유:** 포인터는 "메모리가 어떻게 동작하는지" 이해하고 기존 코드를 읽기 위한 개념이에요. 현대 C++ 실무와 대회 코딩에서는 대부분 참조(\`int&\`)로 해결해요!`,
          component: "cppPointerBuilder",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "포인터를 선언하고 값을 읽어봐요!",
          code: "int x = 42;\nint___ ptr = &x;\ncout << ___ptr;   // 42 출력",
          fillBlanks: [
            { id: 0, answer: "*", options: ["*", "&", "=", "@"] },
            { id: 1, answer: "*", options: ["*", "&", "!", "->"] }
          ],
          explanation: "int* ptr = &x;로 포인터를 선언하고, *ptr로 역참조해서 값을 읽어요!"
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "포인터로 값 수정!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 50;\n    int* ptr = &x;\n    *ptr = 99;\n    cout << x;\n    return 0;\n}",
          options: ["50", "99", "0x7ffd...", "에러"],
          answer: 1,
          explanation: "*ptr = 99는 ptr이 가리키는 주소(=x의 주소)에 가서 99를 넣으라는 뜻이에요. 그래서 x가 99로 바뀌어요!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 포인터로 변수 값 변경하기!",
          content: `포인터를 만들어서 원래 변수의 값을 바꿔보는 실험이에요!

포인터로 역참조(*ptr)해서 값을 바꾸면, 원래 변수도 함께 바뀌는 걸 확인해 봐요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x;

    cout << "x = " << x << endl;
    cout << "*ptr = " << *ptr << endl;

    *ptr = 777;

    cout << "After *ptr = 777:" << endl;
    cout << "x = " << x << endl;
    cout << "*ptr = " << *ptr << endl;

    return 0;
}`,
          expectedOutput: `x = 10
*ptr = 10
After *ptr = 777:
x = 777
*ptr = 777`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "포인터 기초!",
          content: "`int x = 5; int* ptr = &x;`에서 `*ptr`의 값은?",
          options: [
            "x의 메모리 주소",
            "5",
            "ptr의 메모리 주소",
            "에러"
          ],
          answer: 1,
          explanation: "*ptr은 ptr이 가리키는 주소에 가서 값을 읽어오는 역참조(dereference)예요! ptr은 x를 가리키니까 *ptr은 x의 값인 5예요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 포인터 활용
    // ============================================
    {
      id: "ch2",
      title: "포인터 활용",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔧 nullptr — 아무것도 안 가리키는 포인터",
          content: `포인터를 만들었는데 아직 가리킬 곳이 없다면? **nullptr**을 써요!

\`\`\`cpp
int* ptr = nullptr;   // 아무것도 안 가리킴!
\`\`\`

파이썬의 \`None\`과 비슷해요! 포인터 버전의 "아직 없어요"예요.

\`\`\`cpp
int* ptr = nullptr;

if (ptr != nullptr) {
    cout << *ptr;     // ptr이 뭔가를 가리킬 때만 접근!
} else {
    cout << "포인터가 비어있어요!";
}
\`\`\`

⚠️ **주의!** 초기화 안 한 포인터를 역참조하면 **프로그램이 터져요!**

\`\`\`cpp
int* ptr;         // ❌ 위험! 어디를 가리키는지 모름!
cout << *ptr;     // 💥 크래시! 쓰레기 주소 접근!

int* ptr = nullptr;   // ✅ 안전! 명확하게 "없음" 표시
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x = None\` | \`int* ptr = nullptr;\` |
| \`if x is not None:\` | \`if (ptr != nullptr) {\` |
| 안전 (에러 메시지) | ⚠️ 위험 (크래시 가능!) |

💡 **규칙:** 포인터는 항상 초기화하세요! \`nullptr\`이라도 넣어두는 게 안전해요!

nullptr을 역참조(*ptr)하면? 프로그램이 **즉시 죽어요** (세그멘테이션 폴트)! 파이썬의 NoneType 에러와 비슷하지만, C++은 에러 메시지도 불친절해요. nullptr 체크는 필수!

⚠️ **위험한 상황**: 포인터가 가리키는 대상이 사라지면? '댕글링 포인터(dangling pointer)'가 돼요. 이미 이사 간 아파트 주소로 찾아가는 것과 같아요. 세그멘테이션 폴트의 주요 원인이에요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "nullptr 체크!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int* ptr = nullptr;\n    if (ptr == nullptr) {\n        cout << \"null\";\n    } else {\n        cout << *ptr;\n    }\n    return 0;\n}",
          options: ["null", "0", "에러", "0x0"],
          answer: 0,
          explanation: "ptr이 nullptr이니까 if 조건이 참이에요! 그래서 'null'이 출력돼요. nullptr을 역참조하지 않아서 안전해요."
        },
        {
          id: "ch2-arrays",
          type: "explain",
          title: "📌 참고: 배열과 포인터의 관계",
          content: `**알아두면 좋아요!** 배열 이름은 내부적으로 첫 번째 원소의 포인터예요.

그래서 \`arr[i]\`와 \`*(arr + i)\`는 C++ 내부에서 완전히 같은 표현이에요.

| 방식 | 예시 | 권장? |
|---|---|---|
| 인덱스 | \`arr[1]\` | ✅ 항상 이렇게 써요! |
| 포인터 산술 | \`*(arr + 1)\` | ⚠️ 읽기 어려워요 |

> 💡 **결론:** 실제 코드에서는 \`arr[i]\`를 쓰세요. \`*(arr + i)\`는 옛날 코드나 시험에서 볼 수 있으니 "이런 게 있다"는 것만 알고 넘어가요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "널 포인터를 안전하게 체크해봐요!",
          code: "int* ptr = ___;\n\nif (ptr ___ nullptr) {\n    cout << \"safe!\";\n}",
          fillBlanks: [
            { id: 0, answer: "nullptr", options: ["nullptr", "NULL", "0", "none"] },
            { id: 1, answer: "!=", options: ["!=", "==", ">=", "<="] }
          ],
          explanation: "포인터를 nullptr로 초기화하고, != nullptr로 체크해서 안전하게 사용해요!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚔️ 참조 vs 포인터 비교!",
          content: `지난 시간에 배운 참조(&)와 포인터(*)를 비교해 봐요!

| | 참조 (Reference) \`&\` | 포인터 (Pointer) \`*\` |
|---|---|---|
| **선언** | \`int& ref = x;\` | \`int* ptr = &x;\` |
| **값 접근** | \`ref\` (그냥 사용) | \`*ptr\` (역참조 필요) |
| **초기화 필수?** | ✅ 반드시! | ❌ 안 해도 됨 (하지만 해야 함!) |
| **재할당 가능?** | ❌ 불가능 | ✅ 가능 |
| **null 가능?** | ❌ 불가능 | ✅ nullptr 가능 |
| **용도** | 간단한 별명 | 더 유연한 제어 |

\`\`\`cpp
int a = 10, b = 20;

// 참조: 한번 정하면 못 바꿈!
int& ref = a;
// ref = &b;   // ❌ 이건 a = b가 됨, 재할당 아님!

// 포인터: 얼마든지 바꿀 수 있음!
int* ptr = &a;
ptr = &b;       // ✅ 이제 b를 가리킴!
cout << *ptr;   // 20
\`\`\`

**언제 뭘 쓸까요?**
- 🏷️ **참조**: 간단하게 별명만 필요할 때 (함수 매개변수 등)
- 📍 **포인터**: null이 필요하거나, 가리키는 대상을 바꿔야 할 때

💡 가능하면 참조를 쓰고, 꼭 필요할 때만 포인터를 쓰는 게 좋아요!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "포인터 vs 참조!",
          content: "참조(reference)와 포인터(pointer)의 차이로 **맞는** 것은?",
          options: [
            "참조는 null이 될 수 있지만, 포인터는 안 된다",
            "포인터는 재할당 가능하지만, 참조는 불가능하다",
            "참조가 포인터보다 항상 빠르다",
            "포인터와 참조는 완전히 같다"
          ],
          answer: 1,
          explanation: "포인터는 다른 변수를 가리키도록 바꿀 수 있지만(재할당), 참조는 한 번 설정하면 다른 변수로 바꿀 수 없어요!"
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
          title: "주소 연산자!",
          content: "`int x = 10;`에서 `&x`는 무엇을 나타내나요?",
          options: [
            "x의 값 (10)",
            "x의 메모리 주소",
            "x의 참조(reference)",
            "x의 포인터 타입"
          ],
          answer: 1,
          explanation: "&x는 '주소 연산자(address-of operator)'로, 변수 x가 저장된 메모리 주소를 나타내요! 0x7ffd... 같은 값이에요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "역참조!",
          content: `이 코드의 출력은?

\`\`\`cpp
int a = 5;
int* p = &a;
*p = *p + 10;
cout << a;
\`\`\``,
          options: [
            "5",
            "10",
            "15",
            "에러"
          ],
          answer: 2,
          explanation: "*p는 a의 값(5)이에요. *p + 10 = 15를 다시 *p에 넣으면, a가 15로 바뀌어요! 포인터를 통해 원본을 수정한 거예요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "참조 vs 포인터 선택!",
          content: "함수에서 큰 구조체(struct)를 수정하려고 해요. 가장 좋은 방법은?",
          options: [
            "값으로 전달 (복사본 수정)",
            "포인터로 전달해서 역참조(*ptr)로 수정",
            "참조로 전달해서 직접 수정",
            "전역 변수로 선언하기"
          ],
          answer: 2,
          explanation: "참조(reference)로 전달하면 복사 없이 원본을 수정할 수 있고, 포인터보다 문법이 훨씬 간단해요! 현대 C++에서 가장 많이 쓰는 방법이에요. 포인터는 null 체크나 가리키는 대상을 바꿔야 할 특수한 경우에 써요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "nullptr 안전!",
          content: "포인터를 선언할 때 `int* ptr = nullptr;`로 초기화하는 이유는?",
          options: [
            "문법 규칙이라 안 하면 에러가 난다",
            "포인터를 0으로 만들기 위해서",
            "초기화 안 하면 쓰레기 주소를 가리켜서 위험하니까",
            "nullptr이 더 빠르기 때문에"
          ],
          answer: 2,
          explanation: "초기화 안 한 포인터는 쓰레기 주소를 가리켜요. 역참조하면 크래시! nullptr로 초기화하면 '아직 가리키는 곳 없음'을 명확히 표시해서 안전해요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

- ✅ **포인터** — \`int* ptr = &x;\`로 변수의 메모리 주소를 저장해요
- ✅ **주소 연산자 &** — \`&x\`로 변수의 주소를 가져와요
- ✅ **역참조 \*** — \`*ptr\`로 포인터가 가리키는 값을 읽거나 수정해요
- ✅ **nullptr** — 아무것도 안 가리키는 포인터 (파이썬의 None과 비슷!)
- ✅ **참조 vs 포인터** — 일반적으로는 참조(\`&\`)를 쓰고, 포인터는 꼭 필요할 때만!

| 개념 | 문법 | 의미 |
|---|---|---|
| 주소 가져오기 | \`&x\` | x의 메모리 주소 |
| 포인터 선언 | \`int* ptr = &x;\` | x의 주소를 저장 |
| 역참조 | \`*ptr\` | 포인터가 가리키는 값 |
| 널 포인터 | \`nullptr\` | 아무것도 안 가리킴 |

## 🎯 참조 vs 포인터 — 언제 뭘 쓸까?

| | 참조 \`int&\` | 포인터 \`int*\` |
|---|---|---|
| **보통 상황** | ✅ 기본 선택! | |
| **null이 필요할 때** | | ✅ 포인터 사용 |
| **가리키는 대상을 바꿔야 할 때** | | ✅ 포인터 사용 |

💡 **규칙:** 대부분의 경우 참조(\`&\`)를 써요. null 체크가 필요하거나 가리키는 대상을 바꿔야 할 때만 포인터를 써요!

🚀 **다음 레슨:** struct와 class로 나만의 타입을 만들어봐요!`
        }
      ]
    }
  ]
}
