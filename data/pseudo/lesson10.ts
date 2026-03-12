// ============================================
// 수도코드 레슨 10: 프로시저 & 함수
// CIE 스타일 수도코드 - PROCEDURE, FUNCTION
// ============================================

import { LessonData } from '../types'

export const pseudoLesson10Data: LessonData = {
  id: "pseudo-10",
  title: "프로시저 & 함수",
  emoji: "🧩",
  description: "코드를 묶어서 재사용해요!",
  chapters: [
    {
      id: "ch1",
      title: "PROCEDURE 기본",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 프로시저란?",
          content: `같은 코드를 여러 번 쓰는 건 비효율적이에요.

예를 들어, 인사말을 여러 번 출력한다면:

\`\`\`
OUTPUT "안녕하세요!"
OUTPUT "환영합니다!"
OUTPUT "좋은 하루 되세요!"

// ... 나중에 또 같은 코드가 필요하면?

OUTPUT "안녕하세요!"
OUTPUT "환영합니다!"
OUTPUT "좋은 하루 되세요!"
\`\`\`

이런 코드를 **프로시저(PROCEDURE)**로 묶을 수 있어요!

\`\`\`
PROCEDURE Greet()
    OUTPUT "안녕하세요!"
    OUTPUT "환영합니다!"
    OUTPUT "좋은 하루 되세요!"
ENDPROCEDURE
\`\`\`

이제 \`CALL Greet()\`만 쓰면 3줄이 한 번에 실행돼요!

프로시저는 **이름이 붙은 코드 묶음**이에요. 한 번 만들면 몇 번이든 다시 쓸 수 있어요!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📐 프로시저 문법",
          content: `CIE 수도코드에서 프로시저를 만드는 문법이에요:

**매개변수가 없는 프로시저:**
\`\`\`
PROCEDURE 이름()
    실행할 코드
ENDPROCEDURE
\`\`\`

**매개변수가 있는 프로시저:**
\`\`\`
PROCEDURE 이름(매개변수 : 자료형)
    실행할 코드
ENDPROCEDURE
\`\`\`

**프로시저 호출하기:**
\`\`\`
CALL 이름()
CALL 이름(값)
\`\`\`

중요한 규칙:
- 📌 \`PROCEDURE\`로 시작, \`ENDPROCEDURE\`로 끝나요
- 📌 호출할 때는 반드시 \`CALL\` 키워드를 써요
- 📌 매개변수는 \`이름 : 자료형\` 형태로 써요`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "🎯 매개변수가 있는 프로시저",
          content: `이름을 받아서 인사하는 프로시저를 만들어 볼까요?

\`\`\`
PROCEDURE Greet(name : STRING)
    OUTPUT "안녕하세요, " & name & "님!"
    OUTPUT "반갑습니다!"
ENDPROCEDURE

CALL Greet("민수")
CALL Greet("지영")
\`\`\`

결과:
\`\`\`
안녕하세요, 민수님!
반갑습니다!
안녕하세요, 지영님!
반갑습니다!
\`\`\`

매개변수가 여러 개일 수도 있어요:

\`\`\`
PROCEDURE ShowInfo(name : STRING, age : INTEGER)
    OUTPUT name & "님은 " & age & "살입니다"
ENDPROCEDURE

CALL ShowInfo("철수", 15)
\`\`\`

결과: **철수님은 15살입니다**`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 출력 결과는?

\`\`\`
PROCEDURE PrintStars(n : INTEGER)
    DECLARE i : INTEGER
    FOR i ← 1 TO n
        OUTPUT "*"
    NEXT i
ENDPROCEDURE

CALL PrintStars(3)
\`\`\``,
          options: [
            '* 가 3번 출력 (각 줄에 하나씩)',
            '***',
            '* 가 1번 출력',
            '에러 발생'
          ],
          answer: 0,
          explanation: 'PrintStars(3)을 호출하면 n이 3이 돼요. FOR문이 1부터 3까지 반복하면서 OUTPUT "*"를 3번 실행해요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '프로시저를 정의하고 호출하는 코드를 완성하세요.',
          code: 'PROCEDURE SayHello(name : STRING)\n    OUTPUT "Hello, " & name\nENDPROCEDURE\n\n___ SayHello("Alice")',
          fillBlanks: [
            { id: 1, answer: "CALL", options: ["CALL", "RUN", "DO", "EXEC"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "FUNCTION 기본",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📋 함수란?",
          content: `**프로시저**는 코드를 실행만 해요.
**함수(FUNCTION)**는 코드를 실행하고 **값을 돌려줘요!**

예를 들어, 두 수의 합을 구하는 함수:

\`\`\`
FUNCTION Add(a : INTEGER, b : INTEGER) RETURNS INTEGER
    RETURN a + b
ENDFUNCTION
\`\`\`

이 함수를 사용하면:

\`\`\`
DECLARE result : INTEGER
result ← Add(3, 5)
OUTPUT result
\`\`\`

결과: **8**

함수는 **값을 계산해서 돌려주는** 코드 묶음이에요!
돌려주는 값을 **반환값(return value)**이라고 해요.`
        },
        {
          id: "ch2-syntax",
          type: "explain",
          title: "📐 함수 문법",
          content: `CIE 수도코드에서 함수를 만드는 문법이에요:

\`\`\`
FUNCTION 이름(매개변수 : 자료형) RETURNS 반환자료형
    실행할 코드
    RETURN 반환값
ENDFUNCTION
\`\`\`

프로시저와 다른 점:
- 📌 \`FUNCTION\`으로 시작, \`ENDFUNCTION\`으로 끝나요
- 📌 \`RETURNS 자료형\`으로 돌려줄 값의 타입을 알려줘요
- 📌 \`RETURN 값\`으로 실제 값을 돌려줘요
- 📌 호출할 때 \`CALL\`을 쓰지 않아요!

\`\`\`
// 프로시저 호출 → CALL 사용
CALL Greet("민수")

// 함수 호출 → CALL 없이 값을 받아요
result ← Add(3, 5)
OUTPUT Double(7)
\`\`\``
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "🎯 함수 예제들",
          content: `다양한 함수 예제를 볼까요?

**1. 최대값 구하기:**
\`\`\`
FUNCTION Max(a : INTEGER, b : INTEGER) RETURNS INTEGER
    IF a > b THEN
        RETURN a
    ELSE
        RETURN b
    ENDIF
ENDFUNCTION

OUTPUT Max(10, 7)
\`\`\`
결과: **10**

**2. 짝수인지 확인하기:**
\`\`\`
FUNCTION IsEven(n : INTEGER) RETURNS BOOLEAN
    IF n MOD 2 = 0 THEN
        RETURN TRUE
    ELSE
        RETURN FALSE
    ENDIF
ENDFUNCTION

OUTPUT IsEven(4)
OUTPUT IsEven(7)
\`\`\`
결과:
\`\`\`
TRUE
FALSE
\`\`\`

함수는 INTEGER, STRING, BOOLEAN, REAL 등 어떤 자료형이든 반환할 수 있어요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 출력 결과는?

\`\`\`
FUNCTION Double(n : INTEGER) RETURNS INTEGER
    RETURN n * 2
ENDFUNCTION

DECLARE x : INTEGER
x ← Double(5)
OUTPUT x + Double(3)
\`\`\``,
          options: [
            '16',
            '13',
            '10',
            '8'
          ],
          answer: 0,
          explanation: 'Double(5)는 5 * 2 = 10이에요. x에 10이 저장돼요. Double(3)은 3 * 2 = 6이에요. 따라서 x + Double(3) = 10 + 6 = **16**!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '두 정수의 합을 반환하는 함수를 완성하세요.',
          code: 'FUNCTION Add(a : INTEGER, b : INTEGER) ___ INTEGER\n    RETURN a + b\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "RETURNS", options: ["RETURNS", "RETURN", "OUTPUT", "GIVES"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "프로시저 vs 함수",
      emoji: "⚖️",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚖️ 프로시저 vs 함수 비교",
          content: `프로시저와 함수, 뭐가 다를까요?

| | 프로시저 (PROCEDURE) | 함수 (FUNCTION) |
|---|---|---|
| **값 반환** | 반환 안 해요 | 반환해요 (RETURN) |
| **반환 타입** | 없어요 | RETURNS로 지정 |
| **호출 방법** | CALL 사용 | CALL 없이 직접 사용 |
| **끝 키워드** | ENDPROCEDURE | ENDFUNCTION |
| **사용 예** | 출력, 화면 변경 등 | 계산, 판단 등 |

**프로시저** = "이것 좀 해줘!" (동작만 수행)
**함수** = "이것 계산해서 결과 알려줘!" (값을 돌려줌)

\`\`\`
// 프로시저: 인사만 출력 (반환값 없음)
PROCEDURE SayHi(name : STRING)
    OUTPUT "Hi, " & name
ENDPROCEDURE
CALL SayHi("민수")

// 함수: 면적 계산 후 값 반환
FUNCTION Area(w : INTEGER, h : INTEGER) RETURNS INTEGER
    RETURN w * h
ENDFUNCTION
DECLARE a : INTEGER
a ← Area(4, 5)
\`\`\``
        },
        {
          id: "ch3-exam",
          type: "explain",
          title: "📝 시험에 자주 나오는 포인트!",
          content: `IGCSE Paper 2에서 PROCEDURE와 FUNCTION 관련 **자주 출제되는 포인트**를 정리해 볼게요!

**1) FUNCTION은 반드시 값을 반환해야 해요**
- \`RETURNS 자료형\` 선언 필수
- 내부에 \`RETURN 값\` 문장 필수
- 반환된 값은 변수에 저장하거나 바로 사용 가능

\`\`\`
// 올바른 사용법
result ← CalcArea(5, 3)
OUTPUT CalcArea(5, 3)
IF CalcArea(5, 3) > 10 THEN
\`\`\`

**2) PROCEDURE는 CALL로 호출해요**
- \`CALL 프로시저이름(인자)\`
- FUNCTION은 CALL 없이 호출!

\`\`\`
CALL PrintReport(scores)     // 프로시저
average ← GetAverage(scores) // 함수
\`\`\`

**3) 언제 PROCEDURE? 언제 FUNCTION?**

시험에서 "PROCEDURE와 FUNCTION 중 어떤 것을 써야 하나요?" 라는 질문이 나와요!

- **PROCEDURE**: 화면에 출력, 파일에 저장, 배열 수정 등 **동작**을 수행할 때
- **FUNCTION**: 계산 결과, 검색 결과, 참/거짓 판별 등 **값이 필요**할 때

**4) 시험에서 자주 틀리는 실수**
- FUNCTION인데 RETURN을 빠뜨림
- PROCEDURE인데 RETURNS를 씀
- FUNCTION 호출할 때 CALL을 붙임
- 들여쓰기를 안 해서 감점!

💡 **들여쓰기가 중요한 이유**: 시험에서 코드를 작성할 때 들여쓰기를 안 하면 **감점**될 수 있어요! PROCEDURE/FUNCTION 안의 모든 코드는 **반드시 들여쓰기**해야 해요.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 프로시저와 함수의 차이로 올바른 것은?',
          options: [
            '함수는 값을 반환하고, 프로시저는 반환하지 않는다',
            '프로시저는 값을 반환하고, 함수는 반환하지 않는다',
            '프로시저와 함수는 완전히 같다',
            '함수는 CALL로 호출하고, 프로시저는 CALL 없이 호출한다'
          ],
          answer: 0,
          explanation: '**함수(FUNCTION)**는 RETURN으로 값을 돌려주고, **프로시저(PROCEDURE)**는 동작만 수행하고 값을 돌려주지 않아요!'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 출력 결과는?

\`\`\`
FUNCTION Square(n : INTEGER) RETURNS INTEGER
    RETURN n * n
ENDFUNCTION

PROCEDURE ShowResult(value : INTEGER)
    OUTPUT "결과: " & value
ENDPROCEDURE

DECLARE answer : INTEGER
answer ← Square(4)
CALL ShowResult(answer)
\`\`\``,
          options: [
            '결과: 16',
            '결과: 8',
            '결과: 4',
            '에러 발생'
          ],
          answer: 0,
          explanation: 'Square(4)는 4 * 4 = 16을 반환해요. answer에 16이 저장되고, ShowResult(16)이 호출되어 **"결과: 16"**이 출력돼요!'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '함수의 결과를 프로시저로 출력하는 코드를 완성하세요.',
          code: 'FUNCTION Triple(n : INTEGER) RETURNS INTEGER\n    ___ n * 3\nENDFUNCTION\n\nOUTPUT Triple(7)',
          fillBlanks: [
            { id: 1, answer: "RETURN", options: ["RETURN", "RETURNS", "OUTPUT", "GIVE"] }
          ]
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 마무리 퀴즈!",
          content: '문자열의 길이를 반환하고 싶을 때, 올바른 함수 선언은?',
          options: [
            'FUNCTION GetLength(text : STRING) RETURNS INTEGER',
            'PROCEDURE GetLength(text : STRING) RETURNS INTEGER',
            'FUNCTION GetLength(text : STRING)',
            'CALL GetLength(text : STRING) RETURNS INTEGER'
          ],
          answer: 0,
          explanation: '값을 반환하려면 **FUNCTION**을 사용하고, **RETURNS**로 반환 자료형을 지정해요. PROCEDURE는 값을 반환할 수 없어요!'
        }
      ]
    }
  ]
}
