// ============================================
// C++ 프로젝트 1: 숫자 맞추기 게임
// Part 1 복습 프로젝트
// 파이썬을 아는 중학생을 위한 C++ 입문
// ============================================
import { LessonData } from '../types'

export const cppLessonP1Data: LessonData = {
  id: "cpp-p1",
  title: "숫자 맞추기 게임",
  emoji: "🎮",
  description: "Part 1 복습 프로젝트! 랜덤 숫자를 맞추는 게임을 만들어요.",
  chapters: [
    // ============================================
    // Chapter 1: 게임 설계
    // ============================================
    {
      id: "ch1",
      title: "게임 설계",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "🎮 프로젝트 소개",
          content: `**숫자 맞추기 게임**을 C++로 만들어봐요!

컴퓨터가 1~100 사이의 숫자를 하나 정하면, 우리가 맞추는 게임이에요.

**완성된 게임 실행 예시:**
\`\`\`
=== 숫자 맞추기 게임 ===
1~100 사이의 숫자를 맞춰보세요!

입력: 50
⬆️ 더 큰 숫자예요!

입력: 75
⬇️ 더 작은 숫자예요!

입력: 63
🎉 정답! 3번 만에 맞췄어요!
\`\`\`

파이썬으로 이미 만들어본 적 있다면, C++로 다시 만들어보는 거예요!

**사용할 것들:**
- \`while\` — 반복해서 입력받기
- \`if/else\` — 크고 작은지 비교
- \`cin/cout\` — 입력과 출력
- \`rand()\` — 랜덤 숫자 만들기
- 함수 — 코드를 깔끔하게 정리

💡 Part 1에서 배운 모든 것을 한 프로그램에 모아볼 거예요!`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "🎲 rand() — 랜덤 숫자 만들기",
          content: `C++에서 랜덤 숫자를 만드려면 \`rand()\`를 써요!

**파이썬 🐍:**
\`\`\`python
import random
number = random.randint(1, 100)  # 1~100 랜덤
\`\`\`

**C++ ⚡:**
\`\`\`cpp
#include <cstdlib>  // rand(), srand()
#include <ctime>    // time()

srand(time(0));          // 랜덤 시드 설정 (프로그램 시작할 때 1번만!)
int number = rand() % 100 + 1;  // 1~100 랜덤
\`\`\`

**하나씩 뜯어볼게요:**
| 코드 | 의미 |
|---|---|
| \`#include <cstdlib>\` | rand, srand 함수를 쓰기 위한 헤더 |
| \`#include <ctime>\` | time 함수를 쓰기 위한 헤더 |
| \`srand(time(0))\` | 매번 다른 랜덤 숫자가 나오도록 시드 설정 |
| \`rand() % 100\` | 0~99 사이의 숫자 |
| \`rand() % 100 + 1\` | 1~100 사이의 숫자 |

💡 \`srand(time(0))\`을 안 쓰면 프로그램을 실행할 때마다 같은 숫자가 나와요! 파이썬은 자동으로 해주지만, C++은 직접 해줘야 해요.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "rand()의 범위는?",
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int x = rand() % 10 + 1;
    cout << x << endl;
    return 0;
}`,
          options: ["0~9 사이의 숫자", "1~10 사이의 숫자", "1~100 사이의 숫자", "항상 10"],
          answer: 1,
          explanation: "rand() % 10은 0~9를 만들고, +1을 하면 1~10이 돼요! rand() % N + 1 = 1~N 범위의 랜덤 숫자예요."
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "게임에 필요한 것들",
          content: `숫자 맞추기 게임에 **필요하지 않은** 것은?`,
          options: [
            "while 루프 (반복해서 입력받기)",
            "if/else (크고 작은지 비교)",
            "배열 (숫자 여러 개 저장)",
            "rand() (랜덤 숫자 생성)"
          ],
          answer: 2,
          explanation: "배열은 필요 없어요! 숫자 맞추기 게임은 while 루프, if/else 비교, rand() 랜덤 숫자만 있으면 충분해요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 단계별 만들기
    // ============================================
    {
      id: "ch2",
      title: "단계별 만들기",
      emoji: "🔨",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "📦 Step 1: 랜덤 숫자 생성",
          content: `먼저 컴퓨터가 맞출 숫자를 정하는 코드를 만들어요!

**필요한 것:**
1. \`#include <cstdlib>\` — rand() 쓰려면 필요
2. \`#include <ctime>\` — time() 쓰려면 필요
3. \`srand(time(0))\` — 랜덤 시드 설정
4. \`rand() % 100 + 1\` — 1~100 랜덤 숫자

**파이썬이었다면:**
\`\`\`python
import random
answer = random.randint(1, 100)
print(f"정답: {answer}")  # 테스트용
\`\`\`

**C++로는:**
\`\`\`cpp
srand(time(0));
int answer = rand() % 100 + 1;
cout << "정답: " << answer << endl;  // 테스트용
\`\`\`

💡 처음에는 정답을 출력해서 제대로 동작하는지 확인해요. 나중에 지울 거예요!`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1: 랜덤 숫자 생성하기",
          content: `랜덤 숫자를 만들고 출력하는 코드예요. 실행할 때마다 다른 숫자가 나와요!

이 코드가 제대로 동작하면 다음 단계로 넘어가요.`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int answer = rand() % 100 + 1;
    cout << "정답: " << answer << endl;  // 테스트용
    return 0;
}`,
          expectedOutput: `정답: 42`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔄 Step 2: 반복 입력 + 비교",
          content: `이제 핵심 로직을 만들어요!

**while 루프**로 사용자가 맞출 때까지 계속 입력받아요.

\`\`\`
while (true) → 무한 반복!
  ├── 입력 받기 (cin >> guess)
  ├── 시도 횟수 +1
  ├── if (guess < answer) → "더 큰 숫자예요!"
  ├── else if (guess > answer) → "더 작은 숫자예요!"
  └── else → "정답!" → break로 탈출!
\`\`\`

**파이썬이었다면:**
\`\`\`python
while True:
    guess = int(input("입력: "))
    tries += 1
    if guess < answer:
        print("더 큰 숫자예요!")
    elif guess > answer:
        print("더 작은 숫자예요!")
    else:
        print(f"정답! {tries}번 만에 맞췄어요!")
        break
\`\`\`

C++도 거의 같은 구조예요! \`while(True)\` 대신 \`while(true)\`, \`elif\` 대신 \`else if\`!

💡 \`break\`는 파이썬과 C++ 모두 같아요. 루프를 즉시 탈출해요!`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2: 입력받고 비교하기",
          content: `while 루프로 사용자 입력을 반복 받고, 정답과 비교하는 코드예요.

맞출 때까지 계속 힌트를 주고, 맞추면 시도 횟수를 알려줘요!`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int answer = rand() % 100 + 1;
    int guess;
    int tries = 0;

    cout << "=== 숫자 맞추기 게임 ===" << endl;
    cout << "1~100 사이의 숫자를 맞춰보세요!" << endl;

    while (true) {
        cout << "입력: ";
        cin >> guess;
        tries++;

        if (guess < answer) {
            cout << "⬆️ 더 큰 숫자예요!" << endl;
        } else if (guess > answer) {
            cout << "⬇️ 더 작은 숫자예요!" << endl;
        } else {
            cout << "🎉 정답! " << tries << "번 만에 맞췄어요!" << endl;
            break;
        }
    }
    return 0;
}`,
          expectedOutput: `=== 숫자 맞추기 게임 ===
1~100 사이의 숫자를 맞춰보세요!
입력: 50
⬆️ 더 큰 숫자예요!
입력: 75
⬇️ 더 작은 숫자예요!
입력: 63
🎉 정답! 3번 만에 맞췄어요!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "실행 흐름 예측!",
          code: `// answer = 42 라고 가정!
// 사용자가 50, 30, 42를 차례로 입력하면?

while (true) {
    cout << "입력: ";
    cin >> guess;
    tries++;

    if (guess < answer) {
        cout << "UP" << endl;
    } else if (guess > answer) {
        cout << "DOWN" << endl;
    } else {
        cout << "CORRECT " << tries << endl;
        break;
    }
}`,
          options: [
            "UP → DOWN → CORRECT 3",
            "DOWN → UP → CORRECT 3",
            "DOWN → UP → CORRECT 2",
            "UP → UP → CORRECT 3"
          ],
          answer: 1,
          explanation: "50 > 42 → DOWN, 30 < 42 → UP, 42 == 42 → CORRECT! 시도 횟수는 3번이에요. 순서를 잘 따라가면 돼요!"
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🧩 Step 3: 함수로 정리하기",
          content: `코드가 잘 동작하니까, 이제 **함수로 깔끔하게 정리**해요!

**두 개의 함수를 만들 거예요:**

1. \`getRandomNumber(min, max)\` — 랜덤 숫자를 만드는 함수
2. \`playGame()\` — 게임 한 판을 실행하는 함수

**파이썬이었다면:**
\`\`\`python
def get_random_number(min_val, max_val):
    return random.randint(min_val, max_val)

def play_game():
    answer = get_random_number(1, 100)
    # ... 게임 로직 ...
\`\`\`

**C++로는:**
\`\`\`cpp
int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}

void playGame() {
    int answer = getRandomNumber(1, 100);
    // ... 게임 로직 ...
}
\`\`\`

그리고 \`do-while\` 루프로 "다시 하시겠어요?"를 물어볼 거예요!

**do-while은 파이썬에 없는 C++만의 루프예요:**
\`\`\`cpp
do {
    // 최소 1번은 실행!
    playGame();
    cout << "다시? (y/n): ";
    cin >> playAgain;
} while (playAgain == 'y');
\`\`\`

💡 \`do-while\`은 "먼저 실행하고 나서 조건을 확인"해요. 게임은 무조건 1판은 해야 하니까 딱이죠!`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ Step 3: 최종 완성 코드!",
          content: `함수로 정리하고, do-while로 재시작 기능까지 넣은 최종 코드예요!

이게 완성된 숫자 맞추기 게임이에요. 코드를 읽어보고 각 함수가 어떤 역할을 하는지 파악해보세요!`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}

void playGame() {
    int answer = getRandomNumber(1, 100);
    int guess;
    int tries = 0;

    cout << "\\n=== 숫자 맞추기 게임 ===" << endl;
    cout << "1~100 사이의 숫자를 맞춰보세요!" << endl;

    while (true) {
        cout << "\\n입력: ";
        cin >> guess;
        tries++;

        if (guess < answer) {
            cout << "⬆️ 더 큰 숫자예요!" << endl;
        } else if (guess > answer) {
            cout << "⬇️ 더 작은 숫자예요!" << endl;
        } else {
            cout << "🎉 정답! " << tries << "번 만에 맞췄어요!" << endl;
            break;
        }
    }
}

int main() {
    srand(time(0));

    char playAgain;
    do {
        playGame();
        cout << "\\n다시 하시겠어요? (y/n): ";
        cin >> playAgain;
    } while (playAgain == 'y' || playAgain == 'Y');

    cout << "게임을 종료합니다! 👋" << endl;
    return 0;
}`,
          expectedOutput: `=== 숫자 맞추기 게임 ===
1~100 사이의 숫자를 맞춰보세요!

입력: 50
⬆️ 더 큰 숫자예요!

입력: 75
⬇️ 더 작은 숫자예요!

입력: 63
🎉 정답! 3번 만에 맞췄어요!

다시 하시겠어요? (y/n): n
게임을 종료합니다! 👋`
        }
      ]
    },
    // ============================================
    // Chapter 3: 완성 & 도전
    // ============================================
    {
      id: "ch3",
      title: "완성 & 도전",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "🐍⚡ 파이썬 vs C++ 비교",
          content: `같은 게임을 파이썬과 C++로 비교해봐요!

**파이썬 🐍:**
\`\`\`python
import random

def play_game():
    answer = random.randint(1, 100)
    tries = 0

    while True:
        guess = int(input("입력: "))
        tries += 1

        if guess < answer:
            print("더 큰 숫자예요!")
        elif guess > answer:
            print("더 작은 숫자예요!")
        else:
            print(f"정답! {tries}번 만에!")
            break

play_game()
\`\`\`

**C++ ⚡:**
\`\`\`cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

void playGame() {
    int answer = rand() % 100 + 1;
    int guess, tries = 0;

    while (true) {
        cout << "입력: ";
        cin >> guess;
        tries++;

        if (guess < answer)
            cout << "더 큰 숫자예요!" << endl;
        else if (guess > answer)
            cout << "더 작은 숫자예요!" << endl;
        else {
            cout << "정답! " << tries << "번 만에!" << endl;
            break;
        }
    }
}

int main() {
    srand(time(0));
    playGame();
    return 0;
}
\`\`\`

| 비교 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 랜덤 | \`random.randint(1,100)\` | \`rand() % 100 + 1\` |
| 입력 | \`input()\` | \`cin >>\` |
| 출력 | \`print()\` | \`cout <<\` |
| 함수 | \`def play_game():\` | \`void playGame() {\` |
| 반복 | \`while True:\` | \`while (true) {\` |
| 분기 | \`elif\` | \`else if\` |

💡 구조는 거의 같아요! 문법만 다를 뿐이에요.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "코드 이해 확인!",
          content: `\`rand() % 50 + 1\`이 만드는 숫자의 범위는?`,
          options: [
            "0~50",
            "1~50",
            "1~51",
            "0~49"
          ],
          answer: 1,
          explanation: "rand() % 50은 0~49를 만들고, +1을 하면 1~50이 돼요! rand() % N + 1 = 1~N 범위예요."
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "do-while 특징!",
          content: `\`do-while\` 루프의 특징으로 맞는 것은?`,
          options: [
            "조건이 거짓이면 한 번도 실행 안 된다",
            "무조건 최소 1번은 실행된다",
            "파이썬의 for문과 같다",
            "break를 쓸 수 없다"
          ],
          answer: 1,
          explanation: "do-while은 '먼저 실행하고 나서 조건 확인'이라서 무조건 최소 1번은 실행돼요! 파이썬에는 없는 C++만의 루프예요."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "🚀 도전 과제!",
          content: `게임이 완성됐으니, 더 재미있게 만들어보는 건 어때요?

**도전 과제 1: 난이도 선택** 🎚️
\`\`\`cpp
// switch로 난이도 선택!
cout << "난이도: 1.쉬움 2.보통 3.어려움" << endl;
int level;
cin >> level;

int maxNum;
switch (level) {
    case 1: maxNum = 10; break;   // 1~10
    case 2: maxNum = 100; break;  // 1~100
    case 3: maxNum = 1000; break; // 1~1000
    default: maxNum = 100;
}
int answer = rand() % maxNum + 1;
\`\`\`

**도전 과제 2: 최고 기록 저장** 🏅
\`\`\`cpp
int bestScore = 999;  // 최고 기록 (적을수록 좋아요)

// 게임 끝난 후:
if (tries < bestScore) {
    bestScore = tries;
    cout << "새 기록! 🏆" << endl;
}
cout << "최고 기록: " << bestScore << "번" << endl;
\`\`\`

**도전 과제 3: 힌트 기능** 💡
\`\`\`cpp
if (tries == 5) {
    cout << "힌트: 정답은 " << (answer / 10) * 10
         << "~" << (answer / 10) * 10 + 9
         << " 사이예요!" << endl;
}
\`\`\`

💡 이 도전 과제들을 직접 추가해보면 Part 1에서 배운 모든 것을 완벽하게 복습할 수 있어요!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 프로젝트 완성!",
          content: `## 🎉 Part 1 프로젝트를 완성했어요!

**이 프로젝트에서 사용한 것들:**
- ✅ **cin/cout** — 사용자 입력과 출력
- ✅ **if/else if/else** — 크고 작은지 비교
- ✅ **while (true) + break** — 맞출 때까지 반복
- ✅ **rand(), srand()** — 랜덤 숫자 생성
- ✅ **함수** — getRandomNumber(), playGame()
- ✅ **do-while** — 다시 하기 기능

이건 Part 1 (레슨 1~8)에서 배운 거의 모든 개념이에요!

**하나의 프로그램 안에서 모든 것이 자연스럽게 연결되는 걸 느꼈나요?**

이제 Part 2에서 더 멋진 C++ 기능들을 배울 준비가 됐어요! 💪`
        }
      ]
    }
  ]
}
