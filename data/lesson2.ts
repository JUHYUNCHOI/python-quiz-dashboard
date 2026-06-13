// ============================================
// 레슨 2: 데이터 타입
// ============================================
import { LessonData } from './types'

export const lesson2Data: LessonData = {
  id: "2",
  title: "데이터 타입",
  emoji: "📊",
  description: "숫자, 문자열, 불리언의 차이를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "데이터 타입이란?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📊 데이터에도 종류가 있다!",
          content: `같은 \`5\` 라도 **숫자 5** 와 **글자 "5"** 는 다르게 동작해요.

- \`5 + 3\` → **8** (덧셈)
- \`"5" + "3"\` → **"53"** (글자 이어 붙이기!)

> 💡 파이썬은 데이터의 **타입(종류)** 을 보고 "어떻게 다룰까?" 를 결정해요.

이번 레슨에서 배울 4 가지 타입을 미리 한 줄로:

- **정수** (10, -5) · **실수** (3.14) · **글자** ("안녕") · **참/거짓** (True/False)

이제 하나씩 봐요!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 숫자 종류 — 정수와 실수",
          content: `숫자에는 **두 종류** 가 있어요. 소수점이 있느냐 없느냐로 갈려요.

### 1️⃣ **정수** (영어: int) — 소수점 없는 숫자

\`\`\`python
10, -5, 0, 1000
\`\`\`

**자주 쓰는 곳:** 나이, 점수, 사람 수, 개수 — **셀 수 있는 모든 것**

---

### 2️⃣ **실수** (영어: float) — 소수점 있는 숫자

\`\`\`python
3.14, -0.5, 2.0
\`\`\`

> 💡 \`2.0\` 도 실수(float) 예요! **.0 만 붙여도** 실수로 바뀜.

**자주 쓰는 곳:** 키, 무게, 평균 점수, 확률

---

> 💡 **영어 약자가 부담스럽다면** 일단 **한국어 이름** (정수/실수) 만 외워도 충분해요!`
        },
        {
          id: "predict-num-type",
          type: "quiz",
          title: "💭 7.0 은 어떤 타입?",
          content: "7.0 은 어떤 타입일까요? (소수점이 있냐 없냐만 보면 돼요!)",
          options: ["int (정수)", "float (실수)", "str (문자열)", "bool (불리언)"],
          answer: 1,
          explanation: "`.0` 이 붙어 있으니까 실수(float)! 정수처럼 보여도 소수점이 있으면 float 예요."
        },
        {
          id: "types-explain-text",
          type: "explain",
          title: "📋 글자와 참/거짓 — 문자열과 불리언",
          content: `이제 숫자가 아닌 두 종류를 봐요.

### 3️⃣ **문자열** (영어: str) — 글자

\`\`\`python
"안녕", '파이썬', "123"
\`\`\`

⚠️ **따옴표가 있으면 무조건 문자열!** \`123\` 은 숫자지만, \`"123"\` 은 글자 "123" 이에요.
- \`"큰따옴표"\` ✅
- \`'작은따옴표'\` ✅ — 둘 다 OK, 한 쌍으로만 잘 맞추면 됨

**자주 쓰는 곳:** 이름, 메시지, 주소, 전화번호 — **글자로 된 모든 것**

---

### 4️⃣ **불리언** (영어: bool) — 참 또는 거짓

\`\`\`python
True, False
\`\`\`

⚠️ **반드시 대문자로 시작!** \`true\` ❌, \`True\` ✅

**자주 쓰는 곳:** 로그인 여부, 합격/불합격 — **둘 중 하나만** 가능한 모든 것`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 3.14 는 어떤 타입?",
          content: "3.14는 어떤 타입일까요?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "bool (불리언)"],
          answer: 1,
          explanation: "소수점이 있으니까 float(실수)예요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "타입 확인하기",
      emoji: "🔍",
      steps: [
        {
          id: "type-explain",
          type: "explain",
          title: "🔍 type() 함수",
          content: `값이 **어떤 타입인지 모를 때**, \`type()\` 안에 넣어서 확인할 수 있어요!

\`\`\`python
print(type(10))       # <class 'int'>   ← 정수(int) 종류
print(type(3.14))     # <class 'float'> ← 실수(float) 종류
print(type('안녕'))   # <class 'str'>   ← 문자열(str) 종류
print(type(True))     # <class 'bool'>  ← 불리언(bool) 종류
\`\`\`

### 📌 출력 해석법 — 길어 보여도 겁먹지 마요!

\`<class 'int'>\` 이 길어 보이지만, 학생은 **따옴표 안의 단어 한 개** 만 보면 끝!

> **공식: \`<class 'X'>\` 의 X 만 보면 종류**

- \`<class 'int'>\` → **int** (정수)
- \`<class 'str'>\` → **str** (문자열)
- \`<class 'float'>\` → **float** (실수)
- \`<class 'bool'>\` → **bool** (불리언)

나머지 \`<class '...'>\` 는 파이썬이 자동으로 붙여주는 포장지일 뿐이에요.

> 💡 \`class\` 라는 단어는 나중 (lesson 41) 에 배워요. 지금은 그냥 "타입 알려주는 표시" 정도로 생각.

### 자주 쓰는 곳

- 친구가 짠 코드에서 변수가 무슨 타입인지 헷갈릴 때
- 입력 받은 값이 숫자인지 글자인지 확인할 때
- 에러가 났을 때 "혹시 타입이 잘못됐나?" 점검할 때`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 100 의 타입은?",
          task: "100의 타입을 확인해보세요!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'int'>",
          hint: "type() 안에 값을 넣어요",
          hint2: "100",
          choices: ["100", "3.14", "'파이썬'", "True"]
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ '파이썬' 의 타입은?",
          task: "'파이썬'의 타입을 확인해보세요!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'str'>",
          hint: "문자열은 str!",
          hint2: "'파이썬'",
          choices: ["100", "3.14", "'파이썬'", "True"]
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ type('123') 의 결과는?",
          content: "type('123')의 결과는?",
          options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "123"],
          answer: 2,
          explanation: "따옴표 안에 있으면 문자열(str)이에요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "불리언 타입",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ True 와 False",
          content: `**불리언(bool)** 은 두 가지 값만 가질 수 있어요 — \`True\` 또는 \`False\`.

\`\`\`python
print(True)
print(False)
\`\`\`

출력하면 뭐가 나올까요?

{output}
True
False
{/output}

### 일상 비유

- 전등이 켜졌어? → True / False
- 시험 합격? → True / False

**둘 중 하나로 딱 정해지는 모든 것** 이 bool 의 영역이에요.

### ⚠️ 반드시 대문자로 시작!

- ✅ \`True\`, \`False\`
- ❌ \`true\`, \`false\` (소문자는 안 돼요)

### 비교하면 자동으로 bool 이 튀어나와요

\`\`\`python
print(10 > 5)
\`\`\`

10이 5보다 크면 어떤 bool 값이 나올까요?

{output}
True
{/output}

> 💡 \`>\` 같은 비교 연산자는 **lesson 4** 에서 자세히 배워요. 지금은 "비교 결과 = bool" 만 기억!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 10 > 5 → True 확인!",
          task: "10 > 5 → 10이 5보다 크니까 True!\n빈칸에 5를 넣어보세요.",
          initialCode: "print(10 > ___)",
          expectedOutput: "True",
          hint: "비교 결과는 True 또는 False!",
          hint2: "5",
          choices: ["5", "10", "20", "15"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ False도 해봐요!",
          task: "3 > 7 → 3이 7보다 작으니까 False!\n빈칸에 7을 넣어보세요.",
          initialCode: "print(3 > ___)",
          expectedOutput: "False",
          hint: "3은 7보다 작죠?",
          hint2: "7",
          choices: ["7", "2", "1", "0"]
        }
      ]
    },
    {
      id: "ch_errors",
      title: "이건 에러야!",
      emoji: "⚠️",
      steps: [
        {
          id: "phone-explain",
          type: "explain",
          title: "⚠️ 전화번호를 그냥 쓰면?",
          content: `전화번호를 따옴표 없이 쓰면 파이썬은 **빼기**로 읽어요!

\`\`\`python
010-1234-5678   # ❌ 문법 에러! (SyntaxError) — 0 빼기 1234 빼기 5678 로 읽힘
\`\`\`

> 💡 **SyntaxError** = "문법 에러". 파이썬이 코드를 읽는데 말이 안 되는 부분이 있을 때 나오는 비명이에요.

따옴표로 감싸야 문자열(str)이 돼요:

\`\`\`python
'010-1234-5678'  # ✅ str
\`\`\`

⚠️ **하이픈(-)이 들어간 건 모두 따옴표 필수!**
전화번호, 날짜(2024-01-01), 코드 등은 항상 따옴표로 감싸야 해요.`
        },
        {
          id: "str-num-explain",
          type: "explain",
          title: "⚠️ '3.2'는 float이 아니에요!",
          content: `따옴표가 있으면 숫자처럼 보여도 **문자열(str)**이에요!

\`\`\`python
3.2     # float ✅ (실수)
'3.2'   # str  ❌ (float 아님!)

100     # int  ✅ (정수)
'100'   # str  ❌ (int 아님!)
\`\`\`

따옴표 유무가 타입을 결정해요!`
        },
        {
          id: "str-int-explain",
          type: "explain",
          title: "⚠️ 문자열 + 숫자는 에러!",
          content: `**다른 타입끼리 더하면 타입 안 맞음 에러 (TypeError) 가 나요!**

\`\`\`python
'나이: ' + 15      # ❌ 타입 안 맞음 에러 (TypeError)
'3.2' + 1.0        # ❌ 타입 안 맞음 에러 (TypeError)
\`\`\`

> 💡 **TypeError** = "타입 안 맞음 에러". str (글자) + int (숫자) 처럼 종류가 다른 데이터를 섞을 때 나와요.

같은 타입끼리만 가능해요:
\`\`\`python
'나이: ' + '15'    # ✅ '나이: 15'
3.2 + 1.0          # ✅ 4.2
\`\`\`

숫자를 문자열과 합치는 방법은 **나중 레슨** 에서 따로 배워요. 지금은 "다른 타입끼리 + 는 에러" 만 기억!`
        },
        {
          id: "predict-type-error",
          type: "predict",
          title: "💭 결과 예측!",
          content: "아래 코드를 실행하면 어떻게 될까요? 머리로 먼저 예측하고 골라봐요.",
          code: "print(\"점수: \" + 95)",
          options: [
            "점수: 95 가 출력됨",
            "점수: 가 출력되고 95 는 사라짐",
            "TypeError 에러가 남",
            "95점 이 출력됨"
          ],
          answer: 2,
          explanation: "문자열 \"점수: \" 와 정수 95 는 타입이 달라서 + 로 못 합쳐요. 빨간 에러 메시지: `TypeError: can only concatenate str (not \"int\") to str`. 이 메시지 한 번 봐 두면 나중에 비슷한 에러 만났을 때 바로 알아챌 수 있어요."
        },
        {
          id: "quiz-error1",
          type: "quiz",
          title: "❓ 전화번호는 어떻게 써요?",
          content: "전화번호 010-1234-5678 을 파이썬에서 올바르게 쓰려면?",
          options: [
            "010-1234-5678",
            "'010-1234-5678'",
            "010.1234.5678",
            "010 1234 5678"
          ],
          answer: 1,
          explanation: "하이픈(-)은 파이썬에서 빼기예요! 따옴표로 감싸야 문자열(str)이 돼요."
        },
        {
          id: "quiz-error2",
          type: "quiz",
          title: "❓ '점수: ' + 95 결과는?",
          content: "print('점수: ' + 95) 의 결과는?",
          options: [
            "점수: 95",
            "'점수: 95'",
            "TypeError (에러!)",
            "점수95"
          ],
          answer: 2,
          explanation: "str + int는 TypeError! 나중에 배울 f-string을 쓰면 f'점수: {95}' 이렇게 쓸 수 있어요."
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
          content: `## 데이터 타입 정리

| 타입 | 예시 | 설명 |
|------|------|------|
| int | 10, -5 | 정수 |
| float | 3.14, 2.0 | 실수 |
| str | "안녕", '123' | 문자열 |
| bool | True, False | 참/거짓 |

**기억하세요!**
- 문자열은 **따옴표** 필수
- 불리언은 **대문자**로 시작

이제 최종 미션 한 판으로 마무리해요! 🏆`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "💡 빈칸 4 개 — 각 줄 `print` 의 **맨 앞 값** 을 `type(___)` 안에 똑같이 넣으면 돼요.\n예) `print(42, type( 42 ))` → `42 <class 'int'>`\n\n4 줄 모두 같은 패턴! (42 / 3.14 / 'Hello' / True)",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "첫 번째 빈칸 → 42, 두 번째 → 3.14, 세 번째 → 'Hello', 네 번째 → True",
          hint2: "42",
          choices: ["42", "3.14", "'Hello'", "True"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **int** - 정수 (10, -5)
✅ **float** - 실수 (3.14)
✅ **str** - 문자열 ("안녕")
✅ **bool** - 불리언 (True, False)
✅ **type()** - 타입 확인

다음 시간에는 **변수**를 배워요! 📦`
        },
        {
          id: "bonus-facts",
          type: "explain",
          title: "📌 더 알아보기 (선택, 안 봐도 OK)",
          content: `여기까지가 **레슨 핵심** 이에요. 아래는 **꼭 외울 필요 없는** 보너스 — "와 신기하다" 하고 넘어가도 충분!

---

### 🤔 신기한 사실 1: float 의 작은 함정

컴퓨터는 소수를 완벽히 정확하게 저장 못 해요.

\`\`\`python
print(0.1 + 0.2)
\`\`\`

0.3 이 나올 것 같지만, 실제로는?

{output}
0.30000000000000004
{/output}

0.3 이 정확히 안 나오는 게 **정상**! 지금은 "그런 게 있다" 만 기억.

---

### 🤔 신기한 사실 2: True / False 는 사실 숫자처럼 동작

\`True\` 는 1, \`False\` 는 0 으로 쓸 수 있어요.

\`\`\`python
print(True + True)
\`\`\`

{output}
2
{/output}

나중에 조건문 (lesson 11) 에서 다시 만나요.

---

> 💡 외우지 말기! 그냥 "이런 게 있구나" 하고 다음 레슨 가도 충분해요.`
        }
      ]
    }
  ]
}
