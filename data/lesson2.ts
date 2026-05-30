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
          content: `현실 세계에서도 데이터는 종류가 달라요.

- **숫자**: 100, 3.14, -5 → 계산 가능
- **글자**: "안녕", "파이썬" → 출력하거나 이어 붙이기
- **예/아니오**: 참, 거짓 → 조건 판단

> 💡 **왜 타입을 구분할까?**
> 같은 \`5\` 라도 **숫자 5** 와 **문자 "5"** 는 다르게 동작해요.
> - \`5 + 3\` → 8 (덧셈)
> - \`"5" + "3"\` → "53" (글자 이어 붙이기!)
>
> 파이썬은 데이터의 **타입** 을 보고 "어떻게 다룰까?" 를 결정해요.

### 일상 비유

- **int (정수)** — 사과 개수, 학생 수처럼 **셀 수 있는 것**
- **float (실수)** — 키 1.75m, 온도 36.5°C 처럼 **재는 값**
- **str (문자열)** — 이름, 메시지처럼 **글자로 된 정보**
- **bool (불리언)** — 전등 켜짐/꺼짐, 합격/불합격처럼 **둘 중 하나**

이제 하나씩 살펴봐요!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 4가지 기본 타입",
          content: `### 1️⃣ 정수 (int) — 소수점 없는 숫자

\`\`\`python
10, -5, 0, 1000
\`\`\`

**자주 쓰는 곳:** 나이, 점수, 사람 수, 개수 — **셀 수 있는 모든 것**

---

### 2️⃣ 실수 (float) — 소수점 있는 숫자

\`\`\`python
3.14, -0.5, 2.0
\`\`\`

> 💡 \`2.0\` 도 float 이에요! **.0 만 붙여도** float 으로 바뀜.

**자주 쓰는 곳:** 키, 무게, 가격(원 단위가 아닐 때), 평균 점수, 확률

⚠️ **float 의 함정** — 컴퓨터는 소수를 **완벽히 정확하게** 저장 못 해요.
\`\`\`python
print(0.1 + 0.2)   # 0.30000000000000004 😱
\`\`\`
> 0.3 이 안 나오는 게 정상이에요! 정확한 계산이 필요하면 따로 처리해야 해요. 지금은 "그런 게 있다" 정도만 기억.

---

### 3️⃣ 문자열 (str) — 글자

\`\`\`python
"안녕", '파이썬', "123"
\`\`\`

⚠️ **따옴표가 있으면 무조건 문자열!** \`123\` 은 숫자지만, \`"123"\` 은 글자 "123" 이에요.
- \`"큰따옴표"\` ✅
- \`'작은따옴표'\` ✅ — 둘 다 OK, 한 쌍으로만 잘 맞추면 됨

**자주 쓰는 곳:** 이름, 메시지, 주소, 전화번호, 비밀번호 — **글자로 된 모든 것**

---

### 4️⃣ 불리언 (bool) — 참 또는 거짓

\`\`\`python
True, False
\`\`\`

⚠️ **반드시 대문자로 시작!** \`true\` ❌, \`True\` ✅

**자주 쓰는 곳:** 로그인 여부, 합격/불합격, 비교 결과 — **둘 중 하나만** 가능한 모든 것

> 💡 **재미있는 사실:** 파이썬 안에서 \`True\` 는 사실 숫자 **1**, \`False\` 는 **0** 처럼 동작해요.
> \`print(True + True)\` 해 보면 **2** 가 나옴! (지금은 신기한 사실로만 기억하고, 나중에 조건문에서 더 자세히.)`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
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
print(type(10))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type('안녕'))   # <class 'str'>
print(type(True))     # <class 'bool'>
\`\`\`

### 출력 해석법

\`<class 'int'>\` 이 길게 나오는데, 핵심은 **따옴표 안의 단어** 만 보면 돼요.

- \`<class 'int'>\` → int 야!
- \`<class 'str'>\` → str 야!
- \`<class 'float'>\` → float 야!
- \`<class 'bool'>\` → bool 야!

> 💡 \`class\` 라는 단어는 나중 (lesson 41) 에 배워요. 지금은 그냥 "타입 알려주는 표시" 정도로 생각.

### 자주 쓰는 곳

- 친구가 짠 코드에서 변수가 무슨 타입인지 헷갈릴 때
- 입력 받은 값이 숫자인지 글자인지 확인할 때
- 에러가 났을 때 "혹시 타입이 잘못됐나?" 점검할 때`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
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
          title: "🖥️ 문자열 타입 확인!",
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
          title: "❓ 퀴즈!",
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
          title: "✅ True와 False",
          content: `**불리언(bool)** 은 두 가지 값만 가질 수 있어요 — \`True\` 또는 \`False\`.

\`\`\`python
print(True)   # True
print(False)  # False
\`\`\`

### 일상 비유

- 전등이 켜졌어? → True / False
- 시험 합격? → True / False
- 로그인 되어 있어? → True / False

**둘 중 하나로 딱 정해지는 모든 것** 이 bool 의 영역이에요.

### ⚠️ 반드시 대문자로 시작!

- ✅ \`True\`, \`False\`
- ❌ \`true\`, \`false\` → NameError!
- ❌ \`TRUE\`, \`FALSE\` → NameError!

### 비교하면 자동으로 bool 이 튀어나와요

\`\`\`python
print(10 > 5)    # True   (10이 5보다 크니까)
print(10 < 5)    # False  (10이 5보다 작지 않으니까)
print(7 == 7)    # True   (같으니까)
print(3 != 3)    # False  (다르지 않으니까)
\`\`\`

> 💡 \`==\` 는 "같아?", \`!=\` 는 "달라?" 라고 묻는 거예요. 결과는 항상 \`True\` 또는 \`False\`.

### ❌ 안 되는 것

\`\`\`python
print(true)         # NameError — 소문자 안 됨
print("True")       # 출력은 True 지만, 이건 str 이지 bool 아님!
\`\`\`

> ⚠️ \`"True"\` 처럼 **따옴표로 감싸면 문자열** 이에요. 진짜 bool 은 따옴표 없는 \`True\`!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
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
010-1234-5678   # ❌ SyntaxError! (0 빼기 1234 빼기 5678)
\`\`\`

따옴표로 감싸야 문자열로 저장돼요:

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
          content: `**다른 타입끼리 더하면 TypeError가 나요!**

\`\`\`python
'나이: ' + 15      # ❌ TypeError!
'3.2' + 1.0        # ❌ TypeError!
\`\`\`

같은 타입끼리만 가능해요:
\`\`\`python
'나이: ' + '15'    # ✅ '나이: 15'
3.2 + 1.0          # ✅ 4.2
\`\`\`

숫자를 문자열과 합치고 싶으면 나중에 배울 **f-string**을 쓰면 돼요!`
        },
        {
          id: "quiz-error1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "전화번호 010-1234-5678을 저장하려면?",
          options: [
            "phone = 010-1234-5678",
            "phone = '010-1234-5678'",
            "phone = 010.1234.5678",
            "phone = [010, 1234, 5678]"
          ],
          answer: 1,
          explanation: "하이픈(-)은 파이썬에서 빼기예요! 따옴표로 감싸야 문자열로 저장돼요."
        },
        {
          id: "quiz-error2",
          type: "quiz",
          title: "❓ 퀴즈!",
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
- 불리언은 **대문자**로 시작`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "각 줄에서 type() 안에 바로 앞의 값을 그대로 넣으세요!\n예) print(42, type( 42 )) → 42 <class 'int'>",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "첫 번째 빈칸에는 42, 두 번째에는 3.14 ...",
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
        }
      ]
    }
  ]
}
