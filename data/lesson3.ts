// ============================================
// 레슨 3: 변수
// ============================================
import { LessonData } from './types'

export const lesson3Data: LessonData = {
  id: "3",
  title: "변수",
  emoji: "📦",
  description: "데이터를 저장하는 상자, 변수를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "변수란?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 게임에서 변수가 필요한 이유",
          content: `게임을 만든다고 생각해봐요!

\`\`\`
플레이어 이름: 용사
체력: 100
공격력: 25
골드: 5000
\`\`\`

이 정보들을 어디에 저장할까요?
바로 **변수**에 저장해요! 📦`
        },
        {
          id: "concept",
          type: "explain",
          title: "📦 변수 = 이름표 붙은 상자",
          content: `**변수**는 데이터를 담는 **이름표 붙은 상자**예요.

\`\`\`python
name = '용사'
hp = 100
gold = 5000
\`\`\`

위 코드를 그림으로 그리면:

\`\`\`
┌──────────┐  ┌──────┐  ┌──────┐
│  '용사'  │  │ 100  │  │ 5000 │
└──────────┘  └──────┘  └──────┘
   name         hp        gold
\`\`\`

- \`name\` 이라는 이름표가 붙은 상자에 \`'용사'\` 를 넣었어요
- \`hp\` 라는 이름표가 붙은 상자에 \`100\` 을 넣었어요
- \`gold\` 라는 이름표가 붙은 상자에 \`5000\` 을 넣었어요`
        },
        {
          id: "concept-builder",
          type: "interactive",
          title: "🎬 변수 만들기 — 문법 조립",
          description: "변수 = 값 문법이 어떻게 조립되는지 직접 눌러봐요.",
          component: "pyVariableBuilder",
        },
        {
          id: "concept-why",
          type: "explain",
          title: "🤔 왜 변수가 필요한가?",
          content: `만약 변수가 없다면:

\`\`\`python
print('용사')
print('용사 의 체력은 100')
print('용사 가 5000 골드를 가지고 있다')
\`\`\`

플레이어 이름이 \`'마법사'\` 로 바뀌면 \`'용사'\` 를 **세 줄 다** 고쳐야 해요 😩

변수를 쓰면:

\`\`\`python
name = '용사'   # 여기 한 줄만 바꾸면
print(name)
print(name, '의 체력은 100')
print(name, '가 5000 골드를 가지고 있다')
\`\`\`

→ \`name = '용사'\` 한 줄만 \`name = '마법사'\` 로 바꾸면 끝!`
        },
        {
          id: "concept-equals",
          type: "explain",
          title: "🧮 \`=\` 기호의 의미",
          content: `수학 시간에 \`=\` 는 "같다" 였지만 — 파이썬에서는 다른 뜻이에요.

| 수학 | 파이썬 |
|---|---|
| \`x = 10\` → "x 와 10 은 같다" | \`x = 10\` → "10 을 x 에 **저장해라**" |

> 🎯 화살표로 읽으면 쉬워요: \`x = 10\` → \`10 → x\` ("10 을 x 라는 상자에 넣어!")`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "변수 age에 15를 저장하고 출력해보세요!",
          initialCode: "age = ___\nprint(age)",
          expectedOutput: "15",
          hint: "변수이름 = 값 으로 저장해요. 빈칸엔 숫자만!",
          hint2: "15"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`x = 10` 에서 `=` 의 의미는?",
          options: [
            "x와 10이 같다",
            "10을 x에 저장한다",
            "x를 10으로 나눈다",
            "에러가 난다"
          ],
          answer: 1,
          explanation: "프로그래밍에서 = 는 '저장한다'는 뜻이에요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "변수 사용하기",
      emoji: "🔧",
      steps: [
        {
          id: "use-explain",
          type: "explain",
          title: "📝 변수 값 꺼내 쓰기",
          content: `상자에 넣었으면, 이제 꺼내 써야겠죠?

**변수 이름을 적기만 하면** 그 안의 값이 나와요.

\`\`\`python
price = 19000
print(price)
print(price + 2000)
\`\`\`

다음 스텝에서 이 코드 결과를 직접 예측해봐요 👇

> 💡 \`print(price + 2000)\` 을 해도 **price 상자 안 값은 그대로**. 꺼내서 계산만 한 거지, 상자 안을 바꾼 게 아니에요.`
        },
        {
          id: "predict-use-price",
          type: "predict",
          title: "💭 결과 예측 — price + 2000",
          content: `위 코드 두 번째 줄, \`print(price + 2000)\` 의 출력은?

\`\`\`python
price = 19000
print(price)
print(price + 2000)
\`\`\``,
          options: ["19000", "20002000", "21000", "에러"],
          answer: 2,
          explanation: "price 상자 안 값(19000) 을 꺼내서 + 2000 → 21000. 상자 안 값은 바뀌지 않고, 꺼내서 계산만 한 거예요."
        },
        {
          id: "use-explain-mistake",
          type: "explain",
          title: "⚠️ 자주 하는 실수 — 따옴표",
          content: `\`\`\`python
print('price')   # → price (글자 그대로!)
print(price)     # → 19000 (상자 안의 값!)
\`\`\`

따옴표 \`'\` 가 있으면 그냥 **글자 그대로**. 따옴표 없이 변수 이름만 쓰면 **상자 안의 값**.

> 🎯 한 줄 요약: **따옴표 있으면 글자, 없으면 상자 속 값.**`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "chicken에 19000을 저장하고, chicken + 2000을 출력하세요!",
          initialCode: "chicken = ___\nprint(chicken + 2000)",
          expectedOutput: "21000",
          hint: "21000 - 2000 = chicken 에 들어갈 값",
          hint2: "19000"
        },
        {
          id: "label-explain",
          type: "explain",
          title: "🏷️ 텍스트와 변수 함께 출력하기",
          content: `변수 값만 출력하면 뭔지 모를 수 있어요.

> 💡 **레슨 1** 에서 \`print('결과:', 100)\` 처럼 **쉼표(,)** 로 값 여러 개 출력한 거 기억나죠? 같은 방식이 변수에도 그대로 통해요.

\`\`\`python
name = '홍길동'
age = 15
score = 95

print("이름:", name)         # 이름: 홍길동
print("나이:", age)          # 나이: 15
print("점수:", score, "점")  # 점수: 95 점
\`\`\`

쉼표로 구분하면 **공백 한 칸이 자동**으로 들어가요 (이건 레슨 1 에서도 본 거).`
        },
        {
          id: "try_label1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "쉼표를 이용해 '이름: 홍길동'을 출력해보세요!",
          initialCode: "name = '홍길동'\nprint(___, name)",
          expectedOutput: "이름: 홍길동",
          hint: "쉼표 앞에 텍스트 레이블을 넣어요",
          hint2: '"이름:"',
          choices: ['"이름:"', '"나이:"', '"점수:"', '"안녕:"']
        },
        {
          id: "try_label2",
          type: "tryit",
          title: "🖥️ 두 변수 같이 출력해보기!",
          task: "name과 age를 각각 레이블과 함께 출력하세요!",
          initialCode: "name = '홍길동'\nage = 15\nprint(\"이름:\", name)\nprint(___, age)",
          expectedOutput: "이름: 홍길동\n나이: 15",
          hint: "두 번째 줄에 '나이:' 레이블을 넣어요",
          hint2: '"나이:"',
          choices: ['"나이:"', '"이름:"', '"점수:"', '"나이"']
        },
        {
          id: "change-explain",
          type: "explain",
          title: "🔄 변수 값 바꾸기 (재할당)",
          content: `상자 안의 값은 **언제든 바꿀 수 있어요**. 같은 변수에 새 값을 넣으면 **이전 값은 사라지고** 새 값으로 덮어써져요.

\`\`\`python
hp = 100
print(hp)  # 100

hp = 80    # 몬스터한테 20 데미지!
print(hp)  # 80
\`\`\`

### 상자 안에서 무슨 일이?

\`\`\`
hp = 100        →   [ 100 ]
                       hp

hp = 80         →   [ 80 ]      ← 100 은 덮어써져서 사라짐
                       hp
\`\`\`

> 💡 \`hp\` 라는 **이름표는 그대로**. 안에 든 값만 새 걸로 바뀐 거예요.`
        },
        {
          id: "change-explain-self",
          type: "explain",
          title: "♻️ 자기 자신을 써서 갱신하기",
          content: `\`x = x + 3\` 같은 코드도 가능해요. 수학에서는 이상하지만 (\`x = x + 3\` → \`0 = 3\`?), 파이썬에서는 자연스러워요.

\`\`\`python
score = 5
score = score + 3
print(score)
\`\`\`

**오른쪽 먼저 계산** → **왼쪽에 저장** 순서를 기억해요.

\`\`\`
1단계 (오른쪽 계산):  score + 3  →  5 + 3  →  ?
2단계 (저장):          score = ?
\`\`\`

다음 스텝에서 결과를 예측해봐요. 🎯 그 다음 시뮬에서 두 단계를 직접 눌러볼 거예요.`
        },
        {
          id: "predict-self-update",
          type: "predict",
          title: "💭 결과 예측 — score = score + 3",
          content: `\`score\` 의 시작 값은 5. 이 코드 결과는?

\`\`\`python
score = 5
score = score + 3
print(score)
\`\`\``,
          options: ["5", "3", "8", "에러"],
          answer: 2,
          explanation: "오른쪽 먼저 계산: score + 3 = 5 + 3 = 8. 그 다음 왼쪽 score 상자에 8 을 저장. print(score) 는 8."
        },
        {
          id: "predict-no-var",
          type: "predict",
          title: "💭 결과 예측 — 만든 적 없는 변수",
          content: `\`money\` 라는 변수는 **한 번도 만들지 않았어요**. 그런데 바로 출력하면?

\`\`\`python
print(money)
\`\`\``,
          options: [
            "0 출력",
            "money 글자 출력",
            "NameError (에러)",
            "아무것도 안 나옴"
          ],
          answer: 2,
          explanation: "파이썬은 'money 라는 이름의 상자' 를 찾는데, 만든 적이 없으니 NameError. 변수는 **먼저 저장 → 그 다음 꺼내기** 순서."
        },
        {
          id: "change-explain-error",
          type: "explain",
          title: "⚠️ 안 되는 것 — 만든 적 없는 변수",
          content: `예상대로 \`NameError\` 가 나요.

\`\`\`python
print(money)   # ❌ NameError — money 라는 상자 만든 적 없음
\`\`\`

먼저 \`money = 1000\` 처럼 **만들고** 써야 해요.

> 💡 변수는 **먼저 저장 → 그 다음 꺼내기.** 순서를 어기면 NameError.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "score를 0으로 시작해서 100으로 바꾸고 출력하세요!",
          initialCode: "score = 0\nscore = ___\nprint(score)",
          expectedOutput: "100",
          hint: "같은 변수에 새 값을 넣어 덮어쓰기. 빈칸엔 새 값 (숫자) 만.",
          hint2: "100"
        },
        {
          id: "x-update-visual",
          type: "interactive",
          title: "🎬 x = x + 2 애니메이션으로 이해하기",
          description: "탭을 눌러서 x 값이 어떻게 바뀌는지(혹은 안 바뀌는지!) 확인해봐요.",
          component: "variableUpdateVisualizer",
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`x = 5`, `x = x + 3` 후 x의 값은?",
          options: ["5", "3", "8", "에러"],
          answer: 2,
          explanation: "x = x + 3은 현재 x값(5)에 3을 더해서 다시 x에 저장해요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "변수 이름 규칙",
      emoji: "📋",
      steps: [
        {
          id: "rules-explain",
          type: "explain",
          title: "📋 변수 이름 규칙 — 한눈에",
          content: `### 규칙 4 줄 요약 (이것만 외우면 끝!)

| | 규칙 | OK 예시 | NG 예시 |
|---|---|---|---|
| 1 | **영문, 숫자, \`_\`** 만 사용 | \`player_hp\`, \`name1\` | \`my-name\` (하이픈) / \`my name\` (공백) |
| 2 | **첫 글자는 영문 또는 \`_\`** | \`_temp\`, \`score\` | \`2score\` (숫자로 시작) |
| 3 | **예약어는 안 됨** | \`my_if\` | \`if\`, \`for\`, \`print\` |
| 4 | **대소문자 구분** | \`age\` ≠ \`Age\` | (실수로 다른 변수 됨) |

> 🎯 한 줄: **영문/숫자/_, 첫 글자는 영문 아니면 _, 키워드 X.**`
        },
        {
          id: "rules-explain-chars",
          type: "explain",
          title: "🔤 자세히 — 규칙 1·2: 글자와 첫 글자",
          content: `### 규칙 1: 쓸 수 있는 글자

\`\`\`python
# ✅ OK — 영문, 숫자, _ 만 들어가면 됨
name = '홍길동'
player_hp = 100
score2 = 50

# ❌ NG
my-name = '홍'   # 하이픈은 빼기 연산자랑 헷갈려요
my name = '홍'   # 띄어쓰기는 두 단어로 인식됨
my@name = '홍'   # @ 같은 특수문자 X
\`\`\`

### 규칙 2: 첫 글자

숫자가 맨 앞에 오면 안 돼요. 컴파일러가 "이게 변수야 숫자야?" 헷갈려요.

\`\`\`python
2score = 50    # ❌
score2 = 50    # ✅ 숫자가 뒤에 있는 건 OK
_temp = 0      # ✅ _ 로 시작해도 OK
\`\`\``
        },
        {
          id: "rules-explain-keywords",
          type: "explain",
          title: "🚫 자세히 — 규칙 3·4: 예약어 + 대소문자",
          content: `### 규칙 3: 예약어 금지

파이썬이 이미 의미를 갖고 쓰는 단어들. 변수 이름으로 못 써요.

\`\`\`python
if = 10        # ❌ if 는 조건문 키워드
for = 5        # ❌ for 는 반복문 키워드
print = 3      # ❌ 내장 함수 — 가능은 하지만 절대 X
\`\`\`

**대표 예약어**: \`if\`, \`else\`, \`for\`, \`while\`, \`and\`, \`or\`, \`not\`, \`True\`, \`False\`, \`None\`, \`return\`, \`def\`, \`class\`, \`import\`

### 규칙 4: 대소문자 구분

\`\`\`python
age = 15
print(Age)   # ❌ NameError — Age 는 만든 적 없음 (대문자!)
\`\`\`

→ \`age\` 와 \`Age\` 는 **완전 다른 변수**. 실수로 대소문자 바꿔 쓰면 다른 변수가 돼요.`
        },
        {
          id: "rules-explain-style",
          type: "explain",
          title: "🐍 관례 — snake_case + 의미 있는 이름",
          content: `규칙은 다 지켰지만 **읽기 좋게** 쓰는 약속이에요.

\`\`\`python
player_name = '홍길동'   # ✅ snake_case — 파이썬 권장 스타일
playerName = '홍길동'    # △ camelCase — 동작은 하지만 비파이썬 스타일
PLAYERNAME = '홍길동'    # △ 모두 대문자는 "절대 안 변하는 값" 표시
\`\`\`

여러 단어를 합칠 땐 **소문자 + \`_\`** 로 연결.

### 💡 이름은 의미 있게

\`\`\`python
x = 100          # 😕 뭔지 모름
player_hp = 100  # ✅ 플레이어 체력이구나!

a = 5500
latte_price = 5500   # ✅ 한 달 후에 봐도 알 수 있음
\`\`\`

> 🎯 컴퓨터는 \`x\` 든 \`player_hp\` 든 똑같이 동작해요. **사람 (한 달 후의 나) 이 읽기 위한** 약속이에요.`
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "올바른 변수 이름은?",
          options: ["1st_place", "my-score", "player_name", "my name"],
          answer: 2,
          explanation: "player_name이 정답! 언더스코어(_)는 OK!"
        },
        {
          id: "quiz_naming",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "다음 중 가장 좋은 변수 이름은?",
          options: ["a", "n1", "student_score", "XVALUE"],
          answer: 2,
          explanation: "의미 있는 이름을 쓰면 나중에 코드를 봐도 이해하기 쉬워요! student_score가 가장 명확해요."
        },
        {
          id: "try_label3",
          type: "tryit",
          title: "🖥️ 세 가지 정보 출력해보기!",
          task: "name, score, level을 레이블과 함께 각각 출력하세요!",
          initialCode: "name = '홍길동'\nscore = 95\nlevel = 3\nprint(\"이름:\", ___)\nprint(\"점수:\", ___)\nprint(\"레벨:\", ___)",
          expectedOutput: "이름: 홍길동\n점수: 95\n레벨: 3",
          hint: "각 줄의 빈칸에 맞는 변수 이름을 넣어요",
          hint2: "name",
          choices: ["name", "score", "level", "age"]
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "🔗 변수와 텍스트를 자연스럽게 — 쉼표 정리",
          content: `이번 레슨에서 변수를 **출력할 때 가장 안전한 방법은 쉼표 (,)** 예요. 한 번 더 정리해볼게요.

\`\`\`python
name = '홍길동'
age = 15

print('안녕,', name)                 # 안녕, 홍길동
print('이름:', name, '나이:', age)   # 이름: 홍길동 나이: 15
\`\`\`

### 쉼표가 좋은 점

| | 쉼표 \`,\` 로 출력 |
|---|---|
| 공백 | **자동** 으로 한 칸 들어감 |
| 숫자 변수 | 그대로 OK (변환 필요 X) |
| 글자 / 숫자 섞기 | 자유롭게 가능 |`
        },
        {
          id: "predict-concat-mix",
          type: "predict",
          title: "💭 결과 예측 — 글자와 변수 섞어 출력",
          content: `이 코드의 출력은? (쉼표는 자동으로 공백 한 칸을 넣어요)

\`\`\`python
name = '홍길동'
hp = 100
print(name, '의 체력:', hp)
\`\`\``,
          options: [
            "홍길동의 체력:100",
            "홍길동 의 체력: 100",
            "name 의 체력: hp",
            "홍길동, 의 체력:, 100"
          ],
          answer: 1,
          explanation: "쉼표(,) 로 구분된 값 사이에 **공백 한 칸씩 자동**으로 들어가요. name 값 → 공백 → '의 체력:' → 공백 → hp 값."
        },
        {
          id: "concat-explain-future",
          type: "explain",
          title: "💭 공백 없이 딱 붙이고 싶다면?",
          content: `\`\`\`
이름: 홍길동       ← 쉼표 (콜론 뒤 공백 한 칸)
이름:홍길동        ← 공백 없이 붙이고 싶다면?
\`\`\`

지금은 쉼표만 알면 충분해요. **공백 없이 글자와 변수를 정확히 붙이는 방법**은:

- **lesson 5** — 문자열 \`+\` 로 이어붙이기
- **lesson 8** — f-string (제일 깔끔함!)

곧 나오니 조금만 기다려요 🙂

> 🎯 지금은 **쉼표 (,) 로 변수 출력** 하는 것만 익숙해지면 충분해요.`
        },
        {
          id: "try_concat",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 인사 출력!",
          task: "name 변수를 사용해서 '안녕, 홍길동' 을 출력하세요! (쉼표 사용)",
          initialCode: "name = '홍길동'\nprint('안녕,', ___)",
          expectedOutput: "안녕, 홍길동",
          hint: "빈칸에 변수 이름을 넣어요. 따옴표는 안 써요.",
          hint2: "name",
          choices: ["name", "'홍길동'", "greeting", "age"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 — 변수 두 개 이어 출력하기",
          task: "name 과 age 변수를 사용해서 \"홍길동 15\" 형식으로 출력하세요!",
          initialCode: "name = '홍길동'\nage = 15\n# 쉼표(,) 로 두 변수를 이어서 출력해보세요\nprint(___, ___)",
          expectedOutput: "홍길동 15",
          hint: "두 빈칸 모두 변수 이름. 따옴표는 안 써요.",
          hint2: "name / age"
        }
      ]
    },
    {
      id: "ch_comments",
      title: "주석 (Comment)",
      emoji: "💬",
      steps: [
        {
          id: "comment-explain",
          type: "explain",
          title: "💬 주석이란? — 파이썬이 무시하는 메모",
          content: `**주석 (comment)** 은 **파이썬이 읽지 않는 메모**예요. 사람만 읽으라고 코드 사이에 적어두는 글.

\`#\` 기호로 시작하면 그 줄의 \`#\` 뒤는 전부 무시돼요.

\`\`\`python
# 이 줄은 통째로 주석 — 파이썬이 건너뜀
print('안녕!')  # 줄 끝에도 쓸 수 있어요 (# 뒤만 무시)

# 보통 변수 옆에 의미를 메모해둬요
hp = 100       # 시작 체력
score = 0      # 시작 점수
\`\`\`

### 두 가지 위치

| 위치 | 예시 |
|---|---|
| **줄 통째로** | \`# 다음 줄에서 인사할게\` |
| **줄 끝** | \`hp = 100  # 시작 체력\` |`
        },
        {
          id: "comment-explain-why",
          type: "explain",
          title: "🤔 주석이 필요한 이유 + 주의점",
          content: `### 주석이 필요한 이유

1. **한 달 후의 나** — "이 코드가 뭘 하는 거지?" 주석이 있으면 바로 기억
2. **친구한테 공유** — 다른 사람도 쉽게 읽음
3. **잠깐 끄기 (디버깅)** — 문제 있는 줄 앞에 \`#\` 만 붙이면 실행 안 됨

\`\`\`python
print('A')
# print('B')   ← 이 줄은 잠깐 안 돌게 막아둠
print('C')
\`\`\`

출력: \`A\` 와 \`C\` 만 (B 는 주석이라 건너뜀)

### ⚠️ 주의

\`\`\`python
print('#안녕')   # → #안녕 (따옴표 안의 # 은 주석 아님!)
\`\`\`

따옴표 안의 \`#\` 은 **그냥 글자**. 코드 바깥의 \`#\` 만 주석으로 동작해요.`
        },
        {
          id: "comment-quiz",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "파이썬에서 주석을 만들 때 쓰는 기호는?",
          options: ["//", "#", "/* */", "--"],
          answer: 1,
          explanation: "파이썬은 # 기호로 주석을 만들어요! //는 자바스크립트·C++에서 쓰는 방식이에요."
        },
        {
          id: "comment-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "빈칸에 주석 기호를 넣어보세요!\n주석은 실행에 영향을 주지 않아요.",
          initialCode: "___ 이름과 나이를 출력하는 코드\nname = '홍길동'\nage = 15\nprint(name)\nprint(age)",
          expectedOutput: "홍길동\n15",
          hint: "주석은 # 기호로 시작해요",
          hint2: "#",
          choices: ["#", "//", "--", "/*"]
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "변수 3 개로 자기소개 카드를 완성하세요! (이름: 홍길동, 나이: 15, 취미: 게임)",
          initialCode: "name = '홍길동'\nage = ___\nhobby = '게임'\n\n# 쉼표로 변수와 글자를 이어서 출력해 보세요\nprint('=== 자기소개 ===')\nprint('이름:', name)\nprint('나이:', ___, '살')\nprint('취미:', hobby)",
          expectedOutput: "=== 자기소개 ===\n이름: 홍길동\n나이: 15 살\n취미: 게임",
          hint: "첫 빈칸엔 나이 값 (숫자), 두 번째 빈칸엔 age 변수 (따옴표 X).",
          hint2: "15 / age"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **변수** = 데이터를 담는 **이름표 붙은 상자**
✅ \`변수 = 값\` 으로 저장 (\`=\` 는 "넣어라" 라는 뜻)
✅ 변수 이름으로 값을 꺼내 사용 (따옴표 X)
✅ **재할당** — 같은 변수에 새 값 넣으면 덮어써짐 (\`x = x + 3\` 도 가능)
✅ **변수 이름 규칙** — 영문/숫자/_, 첫 글자 영문 또는 _, 예약어 금지, snake_case, 의미 있게
✅ **주석 (\`#\`)** — 파이썬이 무시하는 메모, 디버깅에도 활용
✅ \`print\` 에 변수를 \`,\` 로 이어 출력 (공백 자동)

다음 시간에는 **연산자** (\`+ - * / %\` 등) 를 배워서 계산하고 비교해봐요! 🚀
(글자와 변수를 공백 없이 딱 붙이는 방법은 lesson 5 와 8 에서 자세히.)`
        }
      ]
    }
  ]
}
