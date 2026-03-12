// ============================================
// 수도코드 레슨 20: 검증과 확인 (Validation & Verification)
// CIE 스타일 수도코드 - 데이터 검증과 확인
// ============================================

import { LessonData } from '../types'

export const pseudoLesson20Data: LessonData = {
  id: "pseudo-20",
  title: "검증과 확인",
  emoji: "✅",
  description: "데이터가 올바른지 확인하자!",
  chapters: [
    {
      id: "ch1",
      title: "Validation (데이터 검증)",
      emoji: "🛡️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🛡️ Validation이 뭐예요?",
          content: `사용자가 데이터를 입력할 때, **엉뚱한 값**을 넣을 수 있어요!

예를 들어:
- 나이에 **-5**를 입력한다면?
- 이메일 주소에 **"안녕하세요"**를 입력한다면?
- 비밀번호를 **빈칸**으로 두고 제출한다면?

**Validation(검증)**은 입력된 데이터가 **합리적이고 올바른 형식인지** 자동으로 확인하는 것이에요!

중요한 포인트:
- Validation은 데이터가 **합리적(reasonable)**인지 확인해요
- 하지만 데이터가 **정확(correct)**한지는 확인할 수 없어요!

예: 나이에 25를 입력하면 검증은 통과하지만, 실제 나이가 25인지는 확인할 수 없어요!`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 Validation의 5가지 종류",
          content: `CIE 시험에서 나오는 **5가지 검증 방법**을 알아볼까요?

**1) Range Check (범위 검사)**
- 값이 허용된 범위 안에 있는지 확인
- 예: 나이는 1~120 사이여야 해요

**2) Length Check (길이 검사)**
- 데이터의 길이가 올바른지 확인
- 예: 비밀번호는 8자 이상이어야 해요

**3) Type Check (자료형 검사)**
- 데이터가 올바른 자료형인지 확인
- 예: 나이는 숫자(INTEGER)여야 해요, 문자는 안 돼요

**4) Presence Check (존재 검사)**
- 필수 항목이 비어있지 않은지 확인
- 예: 이름 필드는 반드시 입력해야 해요

**5) Format Check (형식 검사)**
- 데이터가 정해진 형식을 따르는지 확인
- 예: 이메일은 "xxx@xxx.xxx" 형식이어야 해요
- 예: 날짜는 "DD/MM/YYYY" 형식이어야 해요`
        },
        {
          id: "ch1-range",
          type: "explain",
          title: "🔢 Range Check 수도코드",
          content: `가장 많이 나오는 **Range Check**를 수도코드로 만들어 볼게요!

**나이를 1~120 사이로 입력받기:**

\`\`\`
REPEAT
    OUTPUT "Enter age (1-120): "
    INPUT age
UNTIL age >= 1 AND age <= 120
\`\`\`

이 코드는:
1. 나이를 입력받아요
2. 1 이상 120 이하인지 확인해요
3. 조건을 만족할 때까지 **계속 다시 입력**받아요!

잘못된 입력에 메시지를 주려면:

\`\`\`
REPEAT
    OUTPUT "Enter age (1-120): "
    INPUT age
    IF age < 1 OR age > 120 THEN
        OUTPUT "Error: Age must be between 1 and 120"
    ENDIF
UNTIL age >= 1 AND age <= 120
\`\`\`

이렇게 하면 사용자에게 **왜 다시 입력해야 하는지** 알려줄 수 있어요!`
        },
        {
          id: "ch1-quiz2",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '시험 점수를 0~100 사이로 입력받으려고 합니다. 올바른 REPEAT...UNTIL 조건은?',
          options: [
            'UNTIL score >= 0 AND score <= 100',
            'UNTIL score > 0 AND score < 100',
            'UNTIL score >= 0 OR score <= 100',
            'UNTIL score = 0 AND score = 100'
          ],
          answer: 0,
          explanation: 'score가 0 **이상이고(AND)** 100 **이하**일 때 반복을 멈춰야 해요. OR을 쓰면 모든 값이 통과돼요! AND를 써서 두 조건을 **모두** 만족해야 해요.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Range Check 빈칸 채우기!",
          content: '온도를 -50에서 50 사이로 입력받는 코드를 완성하세요.',
          code: 'REPEAT\n    OUTPUT "Enter temperature (-50 to 50): "\n    INPUT temp\nUNTIL temp >= -50 ___ temp <= 50',
          fillBlanks: [
            { id: 1, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Verification (데이터 확인)",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔍 Verification이 뭐예요?",
          content: `**Validation**은 데이터가 합리적인지 확인하는 거였죠?

**Verification(확인)**은 완전히 다른 개념이에요!

**Verification = 사용자가 입력한 것이 의도한 것과 같은지 확인하는 것**

예를 들어:
- 이메일을 등록할 때 **"이메일을 한 번 더 입력하세요"** ← 이것이 Verification!
- 비밀번호를 설정할 때 **"비밀번호를 다시 입력하세요"** ← 이것도 Verification!

두 가지의 차이를 기억하세요:

| | Validation (검증) | Verification (확인) |
|---|---|---|
| 뜻 | 데이터가 **합리적**인지 | 데이터가 **의도한 것과 같은지** |
| 방법 | 컴퓨터가 자동으로 확인 | 사용자가 직접 확인 |
| 예시 | 나이가 1~120 사이인지 | 이메일을 두 번 입력해서 같은지 |`
        },
        {
          id: "ch2-methods",
          type: "explain",
          title: "📋 Verification의 2가지 방법",
          content: `CIE 시험에서 나오는 Verification 방법은 **2가지**예요!

**1) Double Entry (이중 입력)**
- 같은 데이터를 **두 번 입력**하게 해서 비교해요
- 두 입력이 같으면 올바른 데이터로 인정해요

\`\`\`
OUTPUT "이메일을 입력하세요: "
INPUT email1
OUTPUT "이메일을 다시 입력하세요: "
INPUT email2

IF email1 = email2 THEN
    OUTPUT "확인 완료!"
ELSE
    OUTPUT "이메일이 일치하지 않습니다!"
ENDIF
\`\`\`

**2) Screen/Visual Check (화면 확인)**
- 입력한 데이터를 화면에 보여주고 사용자가 **직접 눈으로 확인**해요
- "이 정보가 맞습니까? (Y/N)" 같은 질문을 해요

\`\`\`
OUTPUT "이름: ", name
OUTPUT "나이: ", age
OUTPUT "이 정보가 맞습니까? (Y/N): "
INPUT confirm
\`\`\``
        },
        {
          id: "ch2-double",
          type: "explain",
          title: "💻 Double Entry 수도코드",
          content: `비밀번호를 설정할 때 Double Entry로 확인하는 전체 코드를 볼까요?

\`\`\`
DECLARE password1 : STRING
DECLARE password2 : STRING

REPEAT
    OUTPUT "새 비밀번호를 입력하세요: "
    INPUT password1
    OUTPUT "비밀번호를 다시 입력하세요: "
    INPUT password2

    IF password1 <> password2 THEN
        OUTPUT "비밀번호가 일치하지 않습니다. 다시 시도하세요."
    ENDIF
UNTIL password1 = password2

OUTPUT "비밀번호가 설정되었습니다!"
\`\`\`

핵심 포인트:
- **두 번** 입력받아서 비교해요
- 같을 때까지 **반복**해요
- \`<>\`는 "같지 않다"는 뜻이에요 (CIE 수도코드)

이렇게 하면 오타로 잘못된 비밀번호가 설정되는 것을 막을 수 있어요!`
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 Verification의 예시는?',
          options: [
            '비밀번호를 두 번 입력하게 해서 같은지 비교하는 것',
            '나이가 0보다 큰지 확인하는 것',
            '이메일에 @ 기호가 있는지 확인하는 것',
            '입력 필드가 비어있지 않은지 확인하는 것'
          ],
          answer: 0,
          explanation: '비밀번호를 **두 번 입력**해서 비교하는 것은 **Double Entry** 방식의 Verification이에요! 나머지는 모두 Validation의 예시예요 (Range Check, Format Check, Presence Check).'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Double Entry 빈칸 채우기!",
          content: 'Double Entry로 이메일을 확인하는 코드를 완성하세요.',
          code: 'INPUT email1\nINPUT email2\n\nIF email1 ___ email2 THEN\n    OUTPUT "이메일이 일치하지 않습니다!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "<>", options: ["<>", "=", ">", "<"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "수도코드로 검증 구현",
      emoji: "💻",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "💻 여러 검증을 함께 사용하기",
          content: `실제 프로그램에서는 여러 가지 검증을 **함께** 사용해요!

예를 들어, 학생 등록 시스템을 만든다면:

\`\`\`
// 1. Presence Check + Length Check - 이름
REPEAT
    OUTPUT "이름을 입력하세요: "
    INPUT name
    IF LENGTH(name) < 1 THEN
        OUTPUT "이름은 비워둘 수 없습니다!"
    ENDIF
UNTIL LENGTH(name) >= 1

// 2. Range Check - 나이
REPEAT
    OUTPUT "나이를 입력하세요 (5-19): "
    INPUT age
    IF age < 5 OR age > 19 THEN
        OUTPUT "나이는 5에서 19 사이여야 합니다!"
    ENDIF
UNTIL age >= 5 AND age <= 19

// 3. Verification - 화면 확인
OUTPUT "이름: ", name
OUTPUT "나이: ", age
OUTPUT "이 정보가 맞습니까? (Y/N): "
INPUT confirm
\`\`\`

이렇게 **Validation + Verification**을 함께 쓰면 더 안전해요!`
        },
        {
          id: "ch3-length",
          type: "explain",
          title: "📏 Length Check 수도코드",
          content: `비밀번호가 8자 이상인지 확인하는 Length Check를 만들어 볼게요!

\`\`\`
REPEAT
    OUTPUT "비밀번호를 입력하세요 (8자 이상): "
    INPUT password
    IF LENGTH(password) < 8 THEN
        OUTPUT "비밀번호가 너무 짧습니다!"
    ENDIF
UNTIL LENGTH(password) >= 8
\`\`\`

**LENGTH()** 함수는 문자열의 길이를 반환해요:
- LENGTH("hello") = 5
- LENGTH("abc") = 3
- LENGTH("") = 0

Length Check와 Range Check를 결합할 수도 있어요:

\`\`\`
REPEAT
    OUTPUT "비밀번호 (8~20자): "
    INPUT password
UNTIL LENGTH(password) >= 8 AND LENGTH(password) <= 20
\`\`\`

이렇게 하면 너무 짧거나 너무 긴 비밀번호를 막을 수 있어요!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `사용자가 순서대로 150, -3, 25를 입력하면, 몇 번째 입력에서 반복문을 빠져나올까요?

\`\`\`
REPEAT
    OUTPUT "Enter age (1-120): "
    INPUT age
    IF age < 1 OR age > 120 THEN
        OUTPUT "Invalid age!"
    ENDIF
UNTIL age >= 1 AND age <= 120
\`\`\``,
          options: [
            '3번째 입력 (25)',
            '1번째 입력 (150)',
            '2번째 입력 (-3)',
            '반복문을 빠져나올 수 없다'
          ],
          answer: 0,
          explanation: '1번째: 150 → 150 > 120이므로 "Invalid age!" 출력, 반복. 2번째: -3 → -3 < 1이므로 "Invalid age!" 출력, 반복. 3번째: 25 → 1 <= 25 <= 120이므로 조건 만족! **3번째 입력에서 빠져나와요.**'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Length Check 빈칸 채우기!",
          content: '사용자명이 3자 이상인지 확인하는 코드를 완성하세요.',
          code: 'REPEAT\n    OUTPUT "사용자명 (3자 이상): "\n    INPUT username\nUNTIL ___(username) >= 3',
          fillBlanks: [
            { id: 1, answer: "LENGTH", options: ["LENGTH", "SIZE", "COUNT", "LEN"] }
          ]
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 종합 빈칸 채우기!",
          content: 'Double Entry 비밀번호 확인 코드를 완성하세요.',
          code: 'REPEAT\n    INPUT password1\n    INPUT password2\n    IF password1 <> password2 THEN\n        OUTPUT "비밀번호 불일치!"\n    ENDIF\n___ password1 = password2',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "ENDWHILE", "NEXT"] }
          ]
        }
      ]
    }
  ]
}
