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
          content: `lesson 5 에서 \`"3" + "5"\` 가 \`"35"\` 가 나왔던 거 기억나요? 같은 \`+\` 인데 결과가 완전 달랐죠.

\`\`\`python
"3" + "5"     # "35"  ← 글자를 이어붙임
3 + 5         # 8     ← 진짜 덧셈
\`\`\`

따옴표가 있으면 **문자열(str)**, 없으면 **숫자(int)**. 눈엔 똑같이 \`3\` 으로 보여도, 파이썬에겐 **글자 \`"3"\`** 과 **숫자 \`3\`** 은 완전히 다른 종류예요. (사람으로 치면 — 사진 속 사과 🍎 와 진짜 사과의 차이.)

문제는 — 세상엔 **숫자처럼 생긴 글자** 가 정말 많다는 거예요.

\`\`\`python
score = "85"          # 어디선가 받아온 점수 (문자열!)
print(score + 10)     # ❌ TypeError!
\`\`\`

파이썬: *"이 \`"85"\` 는 글자(str)인데 숫자 \`10\` 이랑 어떻게 더해? 종류가 안 맞아서 못 해!"*

특히 다음 레슨에서 배울 \`input()\` — 사용자한테 받은 값은 **무조건 문자열** 이라, 계산하려면 *반드시* 숫자로 바꿔줘야 해요. 그래서 오늘 배우는 **타입 변환** 은 앞으로 거의 매일 쓰게 돼요.`
        },
        {
          id: "intro-clothes",
          type: "explain",
          title: "👕 옷 갈아입기 비유",
          content: `타입 변환을 한 문장으로 하면 — 값이 **옷을 갈아입는 것**.

\`85\` 라는 *내용물* 은 그대로인데, 어떤 **옷(타입)** 을 입느냐에 따라 파이썬이 다르게 대해요.
- 숫자 옷(\`int\`)을 입으면 → 더하기·빼기 같은 **계산**을 할 수 있고
- 글자 옷(\`str\`)을 입으면 → 다른 글자와 **이어붙이기**를 할 수 있어요.

옷을 갈아입혀 주는 도우미가 4 명 있어요:

| 도우미 | 무슨 옷으로? | 예 |
|------|-------------|-----|
| \`int()\` | 정수 옷 (소수점 없는 수) | \`int("85")\` → \`85\` |
| \`float()\` | 실수 옷 (소수점 가능) | \`float("3.14")\` → \`3.14\` |
| \`str()\` | 글자 옷 (따옴표 둘러줌) | \`str(42)\` → \`"42"\` |
| \`bool()\` | 참/거짓 옷 | \`bool(0)\` → \`False\` |

> 💡 **int** = 정수(소수점 ❌) · **float** = 실수(소수점 ⭕) · **str** = 문자열(글자) · **bool** = 참/거짓
>
> 함수 이름이 곧 *"무슨 옷"* 이에요. \`int(...)\` → "정수 옷 입혀줘", \`str(...)\` → "글자 옷 입혀줘".

값 자체("팔십오" 라는 뜻)는 그대로, **겉모습(다루는 방식)만** 바뀌는 거예요. 아래에서 직접 옷을 갈아입혀 보면 확 와닿을 거예요. 👇`
        },
        {
          id: "intro-viz",
          type: "interactive",
          title: "🎬 변환 시각화 — 값이 옷을 갈아입어요",
          description: "위 예시를 누르거나, 아래에 직접 값을 넣고 int/float/str/bool 을 골라 ▶ 변환! 을 눌러봐요. 따옴표가 벗겨지고 소수점이 잘려나가는 걸 눈으로 직접 보세요.",
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
          content: `\`int()\` 한테 값을 건네면, 그 값을 **정수(소수점 없는 수)로 다시 만들어** 줘요. 받을 수 있는 손님은 두 종류예요.

**손님 ①  숫자처럼 생긴 글자** — \`"123"\` 처럼 *따옴표만 둘렀을 뿐* 속은 숫자.

\`\`\`python
int("123")    # 123  ← 따옴표를 벗겨 진짜 숫자로
int("0")      # 0
int("-7")     # -7
\`\`\`

게임 점수, 입력칸에서 받은 나이처럼 **"숫자인데 글자 옷을 입고 온"** 값에 자주 써요.

**손님 ②  소수점 있는 수(실수)**

\`\`\`python
int(3.7)      # 3   ← !! 4 가 아니에요
int(3.9)      # 3   ← 3.9 인데도 3!
int(-2.8)     # -2  ← 0 쪽으로 잘라냄
\`\`\`

여기서 다들 한 번 놀라요. \`int()\` 는 소수점 아래를 **반올림하지 않고 그냥 싹둑 잘라**버려요.

**왜 자를까?** \`int()\` 의 일은 *"정수로 만드는 것"* 이지 *"가장 가까운 정수 찾기"* 가 아니거든요. 가까운 값으로 반올림하려면 \`round()\` 라는 **다른 함수**를 써야 해요. (round 는 나중에 따로!)

> 🔪 \`int()\` = 소수점 아래를 **가위로 자름**  ·  🎯 \`round()\` = **가장 가까운 칸으로 옮김**`
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
          content: `\`float()\` 는 값을 **실수(소수점 있는 수) 옷** 으로 갈아입혀요.

\`\`\`python
# 글자 → 실수
float("3.14")     # 3.14
float("100")      # 100.0   ← 정수 모양이어도 .0 이 붙어요!

# 정수 → 실수
float(10)         # 10.0
\`\`\`

**왜 \`.0\` 이 붙죠?** float 은 "소수점을 가진 수" 라서, 소수점 아래가 없어도 **\`.0\` 을 달아 "나는 실수야" 라고 표시**해요. \`10\` (정수)과 \`10.0\` (실수)은 값은 같아도 *타입이 달라요*.

**언제 써요?**
- 가격, 키, 점수 평균처럼 **소수점이 필요한** 값을 계산할 때
- 다음 레슨 \`input()\` 으로 받은 \`"3.5"\` 같은 값을 진짜 숫자로 바꿀 때

> 💡 \`int()\` 와 결정적 차이: \`int("3.14")\` 는 ❌ 거부하지만, \`float("3.14")\` 는 ✅ 잘 받아요! 점(\`.\`)이 있는 글자는 float 담당.`
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
          content: `\`str()\` 는 숫자(나 다른 값)에게 **글자 옷(따옴표)** 을 입혀요.

\`\`\`python
str(123)          # "123"
str(3.14)         # "3.14"
str(True)         # "True"
\`\`\`

**언제 써요?** — 숫자를 다른 **글자와 \`+\` 로 이어붙일 때**.

\`\`\`python
score = 95
print("점수: " + str(score) + "점")
\`\`\`

{output}
점수: 95점
{/output}

**왜 꼭 \`str()\` 로 바꿔야 하죠?** \`+\` 는 *같은 종류끼리만* 돼요. 글자+글자는 "이어붙이기", 숫자+숫자는 "덧셈". 그런데 **글자 + 숫자** 는 파이썬이 "이걸 붙이라는 거야 더하라는 거야?" 하고 헷갈려서 거부해요.

\`\`\`python
print("점수: " + 95)   # ❌ TypeError!  (글자 + 숫자)
\`\`\`

그래서 숫자 \`95\` 를 먼저 글자 \`"95"\` 로 바꿔주면 → 글자 + 글자 → 깔끔하게 이어붙여져요.

> 💡 사실 lesson 8 의 **f-string** 을 쓰면 \`str()\` 없이도 돼요: \`f"점수: {score}점"\` — 중괄호 안 값을 자동으로 글자로 바꿔주거든요. (\`str()\` 은 그 자동 변환을 *손으로* 하는 셈)`
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
          content: `\`bool()\` 는 값을 **참(\`True\`) 또는 거짓(\`False\`)** 으로 갈아입혀요. 파이썬은 이걸 "이 값은 *비어있나, 채워져 있나?*" 로 판단해요.

**거짓(False) 이 되는 값 — "비어있는 것들" (외워두기!):**
\`\`\`python
bool(0)       # False   ← 숫자 0
bool(0.0)     # False
bool("")      # False   ← 빈 문자열 (따옴표 안에 아무것도 없음)
\`\`\`

**나머지는 전부 참(True) — "뭔가 들어있는 것들":**
\`\`\`python
bool(1)       # True
bool(-1)      # True    ← 음수도 "0 이 아니니까" True!
bool("hi")    # True
bool("0")     # True    ← !! 따옴표 안의 "0" 은 글자 1 개라 "채워져 있음"
\`\`\`

**기억할 핵심:** *"비어 있으면 거짓, 뭐라도 있으면 참."*
- \`0\` 과 \`""\` 은 "텅 빈 상태" → False
- \`"0"\` 은 *글자 0 이 한 개 들어있는* 상태 → 안 비었으니 True!

> 💡 \`bool("0")\` 가 \`True\` 인 건 정말 자주 걸리는 함정이에요. 따옴표 안에 글자가 *하나라도* 있으면 "안 빈 문자열" → True.
>
> (참고: 빈 리스트 \`[]\` 도 False — 리스트는 lesson 16 에서.)

이 "비었나 / 찼나" 판단은 lesson 11 의 **if 문** 에서 다시 만나요.`
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
          content: `잘못된 옷으로 갈아입히려 하면 파이썬이 **에러**를 내요. 무서워 보이지만, **에러 이름만 알면** 어디가 틀렸는지 바로 보여요.

\`\`\`python
int("abc")        # ❌ ValueError — 숫자가 아닌 글자라서
int("3.14")       # ❌ ValueError — 글자 안에 점(.)이 있어서
float("hello")    # ❌ ValueError — 숫자 모양이 아니라서
\`\`\`

> 💡 **ValueError** = *"값(value)이 변환 규칙에 안 맞아요"* 라는 뜻.

**\`int("3.14")\` 가 왜 에러죠?** — 헷갈리기 쉬운데 이렇게 정리돼요:
- \`int(3.14)\` → ✅ \`3\`  (숫자 실수는 소수점만 자르면 되니까 OK)
- \`int("3.14")\` → ❌  (글자 안의 점을 \`int()\` 가 어떻게 다룰지 몰라서 거부)

**안전한 우회로 — 점 있는 글자는 \`float\` 을 먼저 거쳐요:**

\`\`\`python
text = "3.14"
num = int(float(text))    # ① float("3.14") → 3.14   ② int(3.14) → 3
print(num)
\`\`\`

{output}
3
{/output}

안쪽 \`float()\` 이 먼저 글자를 실수 \`3.14\` 로 바꾸고, 바깥쪽 \`int()\` 가 소수점을 잘라 \`3\`. **안 → 밖 순서** 가 핵심! (위 시각화의 "안전한 길 보기" 버튼으로 눈으로 확인해봐요.)

> ⚠️ 실제 프로그램에선 사용자가 엉뚱한 값을 넣어 ValueError 가 날 수 있어요. 그걸 안전하게 처리하는 \`try-except\` 는 lesson 37 에서 배워요.`
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
