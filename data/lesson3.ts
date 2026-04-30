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
          content: `**변수**는 데이터를 담는 상자예요!

\`\`\`python
name = '용사'
hp = 100
gold = 5000
\`\`\`

- \`name\`이라는 상자에 '용사'를 넣고
- \`hp\`라는 상자에 100을 넣고
- \`gold\`라는 상자에 5000을 넣었어요!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "변수 age에 15를 저장하고 출력해보세요!",
          initialCode: "age = ___\nprint(age)",
          expectedOutput: "15",
          hint: "변수이름 = 값 으로 저장해요",
          hint2: "age = 15\nprint(age)"
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
          title: "📝 변수 값 사용하기",
          content: `변수에 저장한 값은 변수 이름으로 꺼내 쓸 수 있어요!

\`\`\`python
price = 19000
print(price)        # 19000
print(price + 2000) # 21000
\`\`\`

변수 이름을 쓰면 그 안의 값이 나와요!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "chicken에 19000을 저장하고, chicken + 2000을 출력하세요!",
          initialCode: "chicken = ___\nprint(chicken + 2000)",
          expectedOutput: "21000",
          hint: "변수에 저장 후 계산해요",
          hint2: "chicken = 19000\nprint(chicken + 2000)"
        },
        {
          id: "label-explain",
          type: "explain",
          title: "🏷️ 텍스트와 변수 함께 출력하기",
          content: `변수 값만 출력하면 뭔지 모를 수 있어요.
**쉼표(,)** 를 쓰면 텍스트와 변수를 함께 출력할 수 있어요!

\`\`\`python
name = '홍길동'
age = 15
score = 95

print("이름:", name)         # 이름: 홍길동
print("나이:", age)          # 나이: 15
print("점수:", score, "점")  # 점수: 95 점
\`\`\`

쉼표로 구분된 값들은 자동으로 **공백**이 들어가요!`
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
          title: "🔄 변수 값 바꾸기",
          content: `변수의 값은 언제든 바꿀 수 있어요!

\`\`\`python
hp = 100
print(hp)  # 100

hp = 80    # 데미지를 받았다!
print(hp)  # 80
\`\`\`

같은 변수에 새 값을 넣으면 덮어씌워져요!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "score를 0으로 시작해서 100으로 바꾸고 출력하세요!",
          initialCode: "score = 0\nscore = ___\nprint(score)",
          expectedOutput: "100",
          hint: "같은 변수에 새 값을 넣으면 됩니다",
          hint2: "score = 0\nscore = 100\nprint(score)"
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

> 🎯 한 줄: **영문/숫자/_, 첫 글자는 영문 아니면 _, 키워드 X.**

---

### 자세히 — 규칙 1: 쓸 수 있는 글자

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

### 자세히 — 규칙 2: 첫 글자

숫자가 맨 앞에 오면 안 돼요. 컴파일러가 "이게 변수야 숫자야?" 헷갈려요.

\`\`\`python
2score = 50    # ❌
score2 = 50    # ✅ 숫자가 뒤에 있는 건 OK
_temp = 0      # ✅ _ 로 시작해도 OK
\`\`\`

### 자세히 — 규칙 3: 예약어 금지

파이썬이 이미 의미를 갖고 쓰는 단어들. 변수 이름으로 못 써요.

\`\`\`python
if = 10        # ❌ if 는 조건문 키워드
for = 5        # ❌ for 는 반복문 키워드
print = 3      # ❌ 내장 함수 — 가능은 하지만 절대 X
\`\`\`

**대표 예약어**: \`if\`, \`else\`, \`for\`, \`while\`, \`and\`, \`or\`, \`not\`, \`True\`, \`False\`, \`None\`, \`return\`, \`def\`, \`class\`, \`import\`

### 자세히 — 규칙 4: 대소문자 구분

\`\`\`python
age = 15
print(Age)   # ❌ NameError — Age 는 만든 적 없음 (대문자!)
\`\`\`

→ \`age\` 와 \`Age\` 는 **완전 다른 변수**. 실수로 대소문자 바꿔 쓰면 다른 변수가 돼요.

---

### 🐍 관례 (필수는 아니지만 권장) — snake_case

규칙은 다 지켰지만 **읽기 좋게** 쓰는 약속.

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
          title: "🔗 또 다른 출력 방법 — \\+ 로 이어붙이기",
          content: `앞 챕터에서 **쉼표(,)** 로 텍스트 + 변수 출력하는 거 봤죠 (\`print("이름:", name)\`).

여기선 **또 다른 한 가지 방법** — \`+\` 로 이어붙이기. 둘 다 알면 상황에 맞게 골라 쓸 수 있어요.

\`\`\`python
name = '홍길동'
print("안녕, " + name + "!")   # 안녕, 홍길동!
\`\`\`

### 쉼표(,) 와 \\+ 의 차이

| | 쉼표 \`,\` | 더하기 \`+\` |
|---|---|---|
| 공백 | **자동** 으로 한 칸 | 직접 \`" "\` 넣어야 |
| 숫자 변수 | OK | ❌ 에러 (str() 필요) |
| 자주 쓰는 곳 | 디버그 출력, 빠르게 | 정확한 메시지 조립 |

\`\`\`python
name = '홍길동'; hp = 100

# 쉼표 — 공백 자동
print("이름:", name)        # 이름: 홍길동 (사이 공백)

# + 이어붙이기 — 공백 직접
print("이름: " + name)      # 이름: 홍길동 (": " 안에 공백)
\`\`\`

### ⚠️ \\+ 의 함정 — 문자열끼리만!

\`\`\`python
hp = 100
print("체력: " + hp)        # ❌ TypeError! 숫자는 바로 못 붙임
print("체력: " + str(hp))   # ✅ str() 로 변환 후 OK
print("체력:", hp)          # ✅ 쉼표는 숫자도 그냥 OK
\`\`\`

> 🎯 한 줄: **빠르게 출력 → 쉼표, 메시지 정확히 조립 → \\+ (str() 잊지 말기).**

(나중에 lesson 8 의 **f-string** 을 배우면 둘보다 더 깔끔하게 쓸 수 있어요.)`
        },
        {
          id: "try_concat",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "name 변수를 사용해서 '안녕, 홍길동!'을 출력해보세요!",
          initialCode: "name = '홍길동'\nprint(\"안녕, \" + ___ + \"!\")",
          expectedOutput: "안녕, 홍길동!",
          hint: "빈칸에 변수 이름을 넣어요",
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
          hint: "쉼표로 구분해 print 하면 자동으로 공백 한 칸이 들어가요.",
          hint2: "print(name, age)"
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
          title: "💬 주석이란?",
          content: `**주석(comment)**은 파이썬이 무시하는 메모예요!

\`#\` 기호 뒤에 오는 내용은 실행에 영향을 주지 않아요.

\`\`\`python
# 이건 주석이에요 — 파이썬이 읽지 않아요
print('안녕!')  # 이렇게 줄 끝에도 쓸 수 있어요

# 주석은 코드 설명에 써요:
hp = 100       # 초기 체력
score = 0      # 초기 점수
\`\`\`

### 주석이 필요한 이유
- **기억 보조**: "이 코드가 뭘 하는 거지?" — 나중에 봐도 바로 이해
- **팀 작업**: 다른 사람이 내 코드를 쉽게 이해
- **디버깅**: 특정 줄을 잠깐 끄고 싶을 때 \`#\`으로 주석 처리`
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
          hint: "age 에 15 를 넣고, print 의 두 번째 빈칸에는 age 변수를 그대로 넣어요.",
          hint2: "age = 15 / age"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **변수** = 데이터를 담는 이름표 붙은 상자
✅ \`변수 = 값\`으로 저장
✅ 변수 이름으로 값을 꺼내 사용
✅ **변수 이름 규칙** — snake_case, 예약어 금지, 의미 있게
✅ **주석** — \`#\`으로 코드에 메모 달기
✅ \`print\` 에 변수를 \`,\` 로 이어 출력

다음 시간에는 **연산자**를 배워서 계산하고 비교해봐요! 🚀
(더 깔끔하게 출력하는 \`f-string\` 은 곧 lesson 8 에서 배워요.)`
        }
      ]
    }
  ]
}
