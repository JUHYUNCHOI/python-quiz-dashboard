// ============================================
// 레슨 9: 타입 변환
// ============================================
import { LessonData } from './types'

export const lesson9Data: LessonData = {
  id: "9",
  title: "타입 변환",
  emoji: "🔄",
  description: "데이터 타입을 자유자재로 바꿔요!",
  chapters: [
    {
      id: "ch1",
      title: "int() - 정수로 변환",
      emoji: "🔢",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 왜 타입을 바꿔?",
          content: `lesson 5 에서 \`"3" + "5"\` 는 \`"35"\` 가 나왔던 거 기억나요?

\`\`\`python
"3" + "5"     # "35"  ← 글자 이어붙임
3 + 5         # 8     ← 진짜 덧셈
\`\`\`

따옴표가 있으면 **문자열(str)**, 없으면 **숫자(int)**. 모양은 비슷해 보여도 파이썬에겐 완전히 다른 종류예요.

문제는 — **숫자 모양의 문자열** 도 있다는 거.

\`\`\`python
score = "85"          # 어디서 받은 점수 (문자열)
print(score + 10)     # ❌ TypeError!
\`\`\`

파이썬: "이 \`"85"\` 는 글자야 숫자야? 못 합쳐!"`
        },
        {
          id: "intro-clothes",
          type: "explain",
          title: "👕 옷 갈아입기 비유",
          content: `타입 변환 = 값이 **옷을 갈아입는 것**.

| 함수 | 무슨 옷으로? | 예 |
|------|-------------|-----|
| \`int()\` | 정수(int) 옷 | \`int("85")\` → \`85\` |
| \`float()\` | 실수(float) 옷 — 소수점 가능 | \`float("3.14")\` → \`3.14\` |
| \`str()\` | 문자열(str) 옷 — 따옴표 둘러줌 | \`str(42)\` → \`"42"\` |
| \`bool()\` | 참/거짓(bool) 옷 | \`bool(0)\` → \`False\` |

> 💡 **int = 정수** (소수점 없는 수) / **float = 실수** (소수점 있는 수) / **str = 문자열** (글자) / **bool = 참/거짓**.

값 자체는 같은데 *겉모습* 만 바뀌어요. \`"85"\` 도 \`85\` 도 "팔십오" 라는 뜻은 같아요. 하지만 파이썬이 다루는 방식이 달라지죠.`
        },
        {
          id: "intro-viz",
          type: "interactive",
          title: "🎬 변환 시각화 — 직접 눌러봐",
          description: "프리셋을 골라서 ▷ 한 단계 버튼을 눌러봐요. 값이 어떻게 옷을 갈아입는지 보여줘요.",
          component: "typeConversionVisualizer",
        },
        {
          id: "pre-try1",
          type: "quiz",
          title: "🤔 어떤 옷으로?",
          content: "**`'85'` 같은 *문자열을 더하기* 하려면 — 어떤 옷으로 갈아입혀야?**",
          options: ["int() — 정수", "float() — 소수", "str() — 문자열", "bool() — 참/거짓"],
          answer: 0,
          explanation: "더하기/빼기 같은 *수학* 계산 → `int()` (정수) 또는 `float()` (소수). 그냥 글자(`str()`) 면 계산 못 해요."
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 먼저 손으로 — 문자열을 더하기 전에 변환!",
          task: "위 시각화에서 본 int(\"85\") 를 그대로 써봐요. 점수에 10 을 더한 값을 출력하세요.",
          initialCode: "score = \"85\"\n# score 를 정수로 바꿔서 10 더하기\nprint(___(score) + 10)",
          expectedOutput: "95",
          hint: "int() 안에 score 를 넣어요.",
          hint2: "int(score)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "int-explain",
          type: "explain",
          title: "🔢 int() — 정수(integer) 로",
          content: `\`int()\` 는 두 가지 입력을 받아요:

**1) 숫자 모양 문자열 → 정수**

\`\`\`python
int("123")    # 123
int("0")      # 0
int("-7")     # -7
\`\`\`

**2) 실수 → 정수 (소수점 *잘라냄*, 반올림 X!)**

\`\`\`python
int(3.7)      # 3   ← 4 아님!
int(3.9)      # 3   ← 여전히 3!
int(-2.8)     # -2  ← 0 쪽으로 잘라냄
\`\`\`

> 💡 반올림은 \`round()\`. \`int()\` 는 그냥 **자르기**. (round 는 다음에)`
        },
        {
          id: "predict-truncate",
          type: "predict",
          title: "💭 결과 예측 — int(3.9)",
          content: `이 코드의 출력은?

\`\`\`python
print(int(3.9))
\`\`\``,
          options: ["3", "4", "3.9", "에러"],
          answer: 0,
          explanation: "int() 는 **반올림 아니라 잘라내기!** 3.9 → 3. 4 가 되려면 round(3.9) 가 필요해요."
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 실수를 정수로!",
          task: "pi 값을 정수로 변환해서 출력하세요.",
          initialCode: "pi = 3.14159\nprint(___(pi))",
          expectedOutput: "3",
          hint: "int() 는 소수점을 잘라요.",
          hint2: "int(pi)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 함정 퀴즈!",
          content: "`int(\"3.14\")` 의 결과는?",
          options: ["3", "3.14", "에러 (ValueError)", "\"3\""],
          answer: 2,
          explanation: "주의! `int(3.14)` 는 OK (3 나옴). 하지만 `int(\"3.14\")` 는 **문자열에 점이 있으면 거부**! 안전한 방법: `int(float(\"3.14\"))` — float 먼저 거쳐서."
        }
      ]
    },
    {
      id: "ch2",
      title: "float() 와 str()",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 float() — 실수로",
          content: `\`float()\` = 실수(소수점 있는 수) 로 변환.

\`\`\`python
# 문자열 → 실수
float("3.14")     # 3.14
float("100")      # 100.0   ← .0 붙어요!

# 정수 → 실수
float(10)         # 10.0
\`\`\`

**언제 써요?**
- 가격, 키, 점수 평균처럼 *소수점 가능한* 값을 계산할 때
- 다음 레슨에서 배울 \`input()\` 결과(항상 문자열) 를 진짜 숫자로 바꿀 때

> 💡 \`int\` 와 차이: \`float("3.14")\` 는 ✅ 동작! 점이 있어도 OK.`
        },
        {
          id: "pre-try3",
          type: "quiz",
          title: "🤔 어떤 옷으로?",
          content: "**`'3.14'` 처럼 *소수점이 있는* 문자열을 숫자로?**",
          options: ["int()", "float()", "str()", "bool()"],
          answer: 1,
          explanation: "소수점 있는 문자열은 `int()` 가 *거부* 해요. `float()` (소수) 만 받음."
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기 — float()",
          task: "문자열 \"3.14\" 를 실수로 바꾼 뒤 2 배 해서 출력하세요.",
          initialCode: "text = \"3.14\"\nnum = ___(text)\nprint(num * 2)",
          expectedOutput: "6.28",
          hint: "float() 로 변환!",
          hint2: "float(text)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "str-explain",
          type: "explain",
          title: "📝 str() — 문자열로",
          content: `\`str()\` = 숫자(혹은 다른 값) 를 **문자열(글자)** 로 변환. 따옴표 옷을 입혀요.

\`\`\`python
str(123)          # "123"
str(3.14)         # "3.14"
str(True)         # "True"
\`\`\`

**언제 써요?** — 글자랑 \`+\` 로 이어붙일 때.

\`\`\`python
score = 95
print("점수: " + str(score) + "점")
# 점수: 95점
\`\`\`

\`str()\` 안 쓰면? — \`"점수: " + 95\` ❌ TypeError!

> 💡 lesson 8 의 **f-string** 을 쓰면 \`str()\` 안 써도 돼요: \`f"점수: {score}점"\` — 자동으로 변환해줘요.`
        },
        {
          id: "pre-try4",
          type: "quiz",
          title: "🤔 어떤 옷으로?",
          content: "**숫자를 *글자로 합쳐서* 출력하려면?**",
          options: ["int()", "float()", "str()", "bool()"],
          answer: 2,
          explanation: "숫자 + 글자 합칠 땐 숫자를 `str()` 로 *글자화* 해야 `+` 로 이어붙일 수 있어요."
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기 — str()",
          task: "score 를 문자열로 바꿔서 \"점수: 95점\" 형태로 출력하세요.",
          initialCode: "score = 95\ntext = ___(score)\nprint(\"점수: \" + text + \"점\")",
          expectedOutput: "점수: 95점",
          hint: "str() 로 숫자에 따옴표 옷을 입혀요.",
          hint2: "str(score)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "predict-str-concat",
          type: "predict",
          title: "💭 결과 예측 — str(7) + str(3)",
          content: `이 코드의 출력은?

\`\`\`python
print(str(7) + str(3))
\`\`\``,
          options: ["10", "73", "\"7\"\"3\"", "에러"],
          answer: 1,
          explanation: "str(7) → \"7\", str(3) → \"3\". 문자열 + 문자열 = **이어붙임** → \"73\". 진짜 더하려면 따옴표 없이 7 + 3 = 10."
        }
      ]
    },
    {
      id: "ch3",
      title: "bool() 과 에러 처리",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ bool() — 참/거짓으로",
          content: `\`bool()\` = 값을 **True (참)** 또는 **False (거짓)** 로 변환.

**False 가 되는 값 (외울 것!):**
\`\`\`python
bool(0)       # False
bool(0.0)     # False
bool("")      # False   ← 빈 문자열
\`\`\`

**나머지는 모두 True:**
\`\`\`python
bool(1)       # True
bool(-1)      # True    ← 음수도 True!
bool("hi")    # True
bool("0")     # True    ← 따옴표 안의 "0" 은 빈 게 아님!
\`\`\`

> 💡 헷갈리는 것: \`bool("0")\` 는 **True**. 따옴표 안에 글자 한 개라도 있으면 "비지 않은 문자열" 이라 True.
>
> 빈 리스트 \`[]\` 도 False — 리스트는 lesson 16 에서.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 각 값의 bool",
          task: "아래 빈칸에 0, 1, \"\" (빈 문자열), \"hi\" 를 차례대로 넣어 결과를 확인하세요.",
          initialCode: "print(bool(___))\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))",
          expectedOutput: "False\nTrue\nFalse\nTrue",
          hint: "순서대로: 0 / 1 / \"\" / \"hi\". 빈 문자열은 큰따옴표 두 개.",
          hint2: "bool(0) / bool(1) / bool(\"\") / bool(\"hi\")"
        },
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ 변환 에러 두 종류",
          content: `잘못된 변환은 에러가 나요. **에러 이름** 만 알면 무서울 게 없어요.

\`\`\`python
int("abc")        # ❌ ValueError: 숫자가 아닌 글자
int("3.14")       # ❌ ValueError: 문자열에 점 있음
float("hello")    # ❌ ValueError: 숫자 아님
\`\`\`

> 💡 **ValueError** = "값이 변환 규칙에 안 맞아요" 라는 뜻.

**안전한 우회로 — 점 있는 문자열은 float 먼저!**

\`\`\`python
text = "3.14"
num = int(float(text))    # float 거쳐서 int 로
print(num)                # 3
\`\`\`

(int 와 float 의 안쪽-바깥쪽 순서 주의!)`
        },
        {
          id: "predict-error",
          type: "predict",
          title: "💭 결과 예측 — int(\"abc\")",
          content: `이 코드의 결과는?

\`\`\`python
print(int("abc"))
\`\`\``,
          options: [
            "0",
            "\"abc\"",
            "ValueError 에러",
            "None"
          ],
          answer: 2,
          explanation: "\"abc\" 안에 숫자가 한 글자도 없으니 int() 는 변환 포기 → ValueError. 사용자가 잘못 입력할 가능성이 있다면 try-except 가 필요한데, 그건 lesson 37 에서!"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`bool(\"\")` 의 결과는?",
          options: ["True", "False", "\"\"", "에러"],
          answer: 1,
          explanation: "빈 문자열 \"\" 은 False. \"비어있으면 거짓\" 으로 기억해요. (주의: \"0\" 은 빈 게 아니라 글자 1 개 → True)"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 정리",
          content: `## 타입 변환 함수 4 개

| 함수 | 한국어 | 예시 |
|------|--------|------|
| **int()** | 정수로 | int("123") → 123 |
| **float()** | 실수로 | float("3.14") → 3.14 |
| **str()** | 문자열로 | str(123) → "123" |
| **bool()** | 참/거짓으로 | bool(0) → False |

**기억할 것:**
- \`int()\` 는 실수를 **잘라요** (반올림 X)
- \`int("3.14")\` 는 ❌ → \`int(float("3.14"))\` ✅
- f-string 쓰면 \`str()\` 안 써도 됨
- \`bool\` 에서 False 는 0, 0.0, "" — 나머지는 True`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — 점수 계산기",
          task: "두 점수가 문자열로 저장돼 있어요. 합과 곱을 계산해서 정해진 형식으로 출력하세요.",
          initialCode: "a = '25'\nb = '17'\n\n# 문자열을 숫자로 변환\nnum_a = ___(a)\nnum_b = ___(b)\n\nprint(f'{num_a} + {num_b} = {num_a + num_b}')\nprint(f'{num_a} × {num_b} = {num_a * num_b}')\nprint(f'합계의 타입: {type(num_a + num_b)}')",
          expectedOutput: "25 + 17 = 42\n25 × 17 = 425\n합계의 타입: <class 'int'>",
          hint: "두 빈칸 모두 int() 로 변환.",
          hint2: "int(a) / int(b)",
          choices: ["int", "float", "str"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **int()** — 정수로 (실수는 잘림)
✅ **float()** — 실수로 (.0 붙음)
✅ **str()** — 문자열로 (따옴표 옷)
✅ **bool()** — 참/거짓으로 (0, "" 만 False)

다음 시간에는 드디어 **input()** — 사용자한테 직접 값을 받아요. input() 결과가 항상 문자열이라 오늘 배운 \`int()\` / \`float()\` 가 매번 같이 등장해요! 🚀`
        }
      ]
    }
  ]
}
