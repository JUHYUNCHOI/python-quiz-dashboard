// ============================================
// C++ Lesson 13: 재귀 (Recursion)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson13Data: LessonData = {
  id: "cpp-13",
  title: "재귀 (Recursion)",
  emoji: "🔄",
  description: "함수가 자신을 호출하는 재귀와 메모이제이션!",
  chapters: [
    // ============================================
    // Chapter 1: 재귀 기초
    // ============================================
    {
      id: "ch1",
      title: "재귀 기초",
      emoji: "🌀",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🌀 재귀 — 자기 자신을 호출하는 함수!",
          content: `러시아 인형(마트료시카)을 열면 안에 똑같은 더 작은 인형이 있어요. 그 인형을 열면 또 더 작은 인형... **재귀**가 바로 이런 개념이에요!

**재귀(Recursion)**는 함수가 **자기 자신을 호출**하는 기법이에요.

재귀에는 반드시 두 가지가 필요해요:
1. **기저 조건(Base Case)** — 더 이상 호출하지 않는 종료 조건
2. **재귀 호출(Recursive Call)** — 자기 자신을 (더 작은 문제로) 호출

\`\`\`cpp
// 5! = 5 × 4 × 3 × 2 × 1 = 120
int factorial(int n) {
    if (n <= 1) return 1;   // 기저 조건!
    return n * factorial(n - 1);  // 재귀 호출!
}

cout << factorial(5);  // 120
\`\`\`

호출 과정을 따라가봐요:
\`\`\`
factorial(5)
  = 5 × factorial(4)
        = 4 × factorial(3)
              = 3 × factorial(2)
                    = 2 × factorial(1)
                          = 1  ← 기저 조건!
                    = 2 × 1 = 2
              = 3 × 2 = 6
        = 4 × 6 = 24
  = 5 × 24 = 120
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
\`\`\`

거의 똑같죠! C++에서는 타입만 명시하면 돼요.

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`def factorial(n):\` | \`int factorial(int n) {\` |
| 들여쓰기로 범위 | 중괄호로 범위 |
| 반환 타입 없음 | \`int\` 반환 타입 명시 |
| 재귀 방식은 완전히 동일! | 재귀 방식은 완전히 동일! |

💡 기저 조건이 없으면 무한 재귀! **스택 오버플로우(Stack Overflow)** 오류가 발생해요. 항상 종료 조건을 먼저 써요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "재귀 함수의 기저 조건을 완성해봐요!",
          code: "int factorial(int n) {\n    if (n ___ 1) return 1;  // 기저 조건\n    return n * factorial(n - 1);\n}",
          fillBlanks: [
            { id: 0, answer: "<=", options: ["<=", ">=", "==", ">"] }
          ],
          explanation: "n <= 1이 기저 조건이에요! n이 0이나 1일 때 1을 반환하고 재귀를 멈춰요. n == 1만 쓰면 n=0일 때 처리가 안 될 수 있어요."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "재귀 호출 추적!",
          code: "#include <iostream>\nusing namespace std;\nvoid count(int n) {\n    if (n <= 0) return;\n    cout << n << \" \";\n    count(n - 1);\n}\nint main() {\n    count(4);\n    return 0;\n}",
          options: ["1 2 3 4 ", "4 3 2 1 ", "4 4 4 4 ", "무한 반복"],
          answer: 1,
          explanation: "count(4) → 4 출력 → count(3) → 3 출력 → count(2) → 2 출력 → count(1) → 1 출력 → count(0) → return. 4 3 2 1 순서로 출력돼요!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 재귀로 합계 구하기!",
          content: `1부터 n까지의 합을 재귀로 구해봐요!

sum(n) = n + sum(n-1) 관계를 이용해요.
기저 조건: sum(0) = 0`,
          code: `#include <iostream>
using namespace std;

int sum(int n) {
    if (n <= 0) return 0;  // 기저 조건
    return n + sum(n - 1); // 재귀 호출
}

int main() {
    cout << sum(5) << endl;   // 1+2+3+4+5
    cout << sum(10) << endl;  // 1~10 합
    return 0;
}`,
          expectedOutput: `15
55`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "재귀의 핵심!",
          content: "재귀 함수에서 **반드시** 있어야 하는 것은?",
          options: [
            "반복문(for/while)",
            "기저 조건(Base Case)",
            "전역 변수",
            "return 없는 void 타입"
          ],
          answer: 1,
          explanation: "기저 조건이 없으면 함수가 무한히 자기 자신을 호출해서 스택 오버플로우가 발생해요! 재귀 함수에는 반드시 멈추는 조건(기저 조건)이 있어야 해요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 피보나치와 메모이제이션
    // ============================================
    {
      id: "ch2",
      title: "피보나치 & 메모이제이션",
      emoji: "💾",
      steps: [
        {
          id: "ch2-fib",
          type: "explain",
          title: "💾 피보나치와 중복 계산 문제!",
          content: `피보나치 수열: 0, 1, 1, 2, 3, 5, 8, 13, 21...
각 수 = 앞의 두 수의 합! (fib(n) = fib(n-1) + fib(n-2))

\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;  // 기저 조건: fib(0)=0, fib(1)=1
    return fib(n-1) + fib(n-2);
}
\`\`\`

그런데... fib(5)를 계산하면 이런 일이 생겨요:
\`\`\`
fib(5)
├── fib(4)
│   ├── fib(3) ← 이미 계산했어요!
│   │   ├── fib(2)
│   │   └── fib(1)
│   └── fib(2)
└── fib(3) ← 또 계산해요! (낭비!)
    ├── fib(2)
    └── fib(1)
\`\`\`

fib(40)을 계산하면 **수억 번**의 중복 계산이 발생해요! 🐢

**해결책: 메모이제이션(Memoization)**
한 번 계산한 값을 **저장**해두고 재사용해요!

\`\`\`cpp
int memo[100];  // -1로 초기화

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // 이미 계산했으면 바로 반환!
    memo[n] = fib(n-1) + fib(n-2);     // 처음 계산할 때만 저장
    return memo[n];
}
\`\`\`

fib(40)이 약 30억 번 → **79번**으로 줄어요! 🚀

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)  # 파이썬은 데코레이터로 간단하게!
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

파이썬은 @lru_cache로 간단하게, C++은 배열로 직접 구현해요.

| | 일반 재귀 | 메모이제이션 |
|---|---|---|
| 시간복잡도 | O(2^n) — 지수! | **O(n)** — 선형! |
| fib(40) | 수억 번 호출 | 79번 호출 |
| 구현 | 간단 | 배열 필요 |

💡 메모이제이션은 **동적 프로그래밍(DP)**의 핵심 기법이에요! USACO에서 자주 쓰여요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "피보나치 재귀 결과!",
          code: "#include <iostream>\nusing namespace std;\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\nint main() {\n    cout << fib(7);\n    return 0;\n}",
          options: ["11", "13", "21", "8"],
          answer: 1,
          explanation: "피보나치 수열: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8, fib(7)=13이에요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 메모이제이션으로 피보나치!",
          content: `메모이제이션을 사용해서 피보나치 수열을 빠르게 계산해봐요!

memo 배열을 -1로 초기화하고, 계산 결과를 저장해요.`,
          code: `#include <iostream>
using namespace std;

int memo[50];

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib(n-1) + fib(n-2);
    return memo[n];
}

int main() {
    fill(memo, memo + 50, -1);

    cout << fib(10) << endl;
    cout << fib(20) << endl;
    return 0;
}`,
          expectedOutput: `55
6765`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "메모이제이션 이해!",
          content: "메모이제이션(Memoization)에 대한 설명으로 **맞는** 것은?",
          options: [
            "항상 메모리를 덜 쓴다",
            "한 번 계산한 결과를 저장해서 중복 계산을 방지한다",
            "재귀 없이는 사용할 수 없다",
            "코드는 복잡해지지만 속도는 같다"
          ],
          answer: 1,
          explanation: "메모이제이션은 한 번 계산한 결과를 저장(메모)해두고, 같은 계산이 필요할 때 다시 계산하지 않고 저장된 값을 반환해요! fib(40)을 수억 번 계산에서 79번으로 줄일 수 있어요."
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
          title: "재귀 코드 읽기!",
          content: `이 함수의 출력은?

\`\`\`cpp
int mystery(int n) {
    if (n == 0) return 0;
    return 1 + mystery(n - 1);
}
cout << mystery(5);
\`\`\``,
          options: ["0", "1", "5", "무한 루프"],
          answer: 2,
          explanation: "mystery(5) = 1 + mystery(4) = 1 + 1 + mystery(3) = ... = 1+1+1+1+1+mystery(0) = 5+0 = 5예요! 이 함수는 사실 n을 그대로 반환해요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "스택 오버플로우!",
          content: `다음 재귀 함수에서 **문제**가 있는 것은?

\`\`\`cpp
int bad(int n) {
    return n + bad(n - 1);
}
\`\`\``,
          options: [
            "반환 타입이 잘못됐다",
            "기저 조건(Base Case)이 없다",
            "재귀 호출이 없다",
            "매개변수 타입이 잘못됐다"
          ],
          answer: 1,
          explanation: "기저 조건이 없어요! 이 함수는 영원히 자기 자신을 호출해서 스택 오버플로우가 발생해요. if (n <= 0) return 0; 같은 기저 조건이 반드시 필요해요!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "메모이제이션 vs 일반 재귀!",
          content: "피보나치를 일반 재귀로 계산할 때의 시간복잡도는?",
          options: [
            "O(n)",
            "O(n log n)",
            "O(n²)",
            "O(2^n)"
          ],
          answer: 3,
          explanation: "일반 재귀 피보나치는 O(2^n)으로 지수적으로 느려요! fib(40)은 약 2^40번의 연산이 필요해요. 메모이제이션을 쓰면 O(n)으로 줄어들어요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "재귀 실전!",
          content: `이 코드의 출력은?

\`\`\`cpp
void printStars(int n) {
    if (n == 0) return;
    cout << "*";
    printStars(n - 1);
}
printStars(3);
\`\`\``,
          options: ["***", "* * *", "3", "에러"],
          answer: 0,
          explanation: "printStars(3) → '*' 출력 → printStars(2) → '*' 출력 → printStars(1) → '*' 출력 → printStars(0) → return. 공백 없이 '***'가 출력돼요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 재귀 마스터!",
          content: `## 🏆 레슨 13 완료!

오늘 배운 핵심을 정리해봐요!

### 🌀 재귀(Recursion) 기본 구조
\`\`\`cpp
타입 함수(매개변수) {
    if (기저_조건) return 값;  // ← 반드시!
    return 더_작은_문제_재귀_호출;
}
\`\`\`

### 재귀 vs 반복문
- 재귀: 코드가 **직관적**, 트리/그래프 탐색에 강함
- 반복문: **빠르고** 메모리 효율적

### 💾 메모이제이션
\`\`\`cpp
int memo[N];  // -1로 초기화

int func(int n) {
    if (기저_조건) return ...;
    if (memo[n] != -1) return memo[n];  // 저장된 값 재활용!
    memo[n] = func(n-1) + ...;
    return memo[n];
}
\`\`\`

### 시간복잡도 비교
| 방식 | fib(40) | 시간복잡도 |
|---|---|---|
| 일반 재귀 | ~10억 번 | O(2^n) |
| 메모이제이션 | ~80번 | **O(n)** |

💡 **재귀 + 메모이제이션 = 동적 프로그래밍(DP)**의 핵심이에요! USACO에서 정말 자주 나와요!

🚀 **다음 레슨:** 클래스(class) — 파이썬 class와 비슷하지만 더 강력한 C++ 클래스를 배워봐요!`
        }
      ]
    }
  ]
}
