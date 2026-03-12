// ============================================
// 수도코드 레슨 11: 매개변수 (BYVAL, BYREF)
// CIE 스타일 수도코드 - 값에 의한 전달, 참조에 의한 전달
// ============================================

import { LessonData } from '../types'

export const pseudoLesson11Data: LessonData = {
  id: "pseudo-11",
  title: "매개변수 전달 방식",
  emoji: "🔄",
  description: "BYVAL과 BYREF의 차이를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "BYVAL (값에 의한 전달)",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 매개변수 전달이란?",
          content: `프로시저나 함수에 값을 넘겨줄 때, 두 가지 방법이 있어요:

1. **BYVAL** (BY VALue) - 값을 **복사**해서 전달
2. **BYREF** (BY REFerence) - 원본 변수를 **직접** 전달

쉽게 비유하면:
- **BYVAL** = 숙제를 **복사**해서 친구에게 줌 → 친구가 수정해도 내 숙제는 그대로!
- **BYREF** = 숙제 **원본**을 친구에게 줌 → 친구가 수정하면 내 숙제도 바뀜!

이 차이를 이해하는 것이 매우 중요해요!`
        },
        {
          id: "ch1-byval",
          type: "explain",
          title: "📝 BYVAL 사용법",
          content: `**BYVAL**은 값을 **복사**해서 전달해요. 원본은 절대 바뀌지 않아요!

\`\`\`
PROCEDURE AddTen(BYVAL n : INTEGER)
    n ← n + 10
    OUTPUT "프로시저 안: " & n
ENDPROCEDURE

DECLARE x : INTEGER
x ← 5
CALL AddTen(x)
OUTPUT "프로시저 밖: " & x
\`\`\`

실행 흐름을 따라가 볼까요?

| 단계 | 설명 | n (복사본) | x (원본) |
|---|---|---|---|
| 1 | x ← 5 | - | 5 |
| 2 | CALL AddTen(x) → n에 5 복사 | 5 | 5 |
| 3 | n ← n + 10 | 15 | 5 |
| 4 | OUTPUT n → "프로시저 안: 15" | 15 | 5 |
| 5 | OUTPUT x → "프로시저 밖: 5" | - | 5 |

결과:
\`\`\`
프로시저 안: 15
프로시저 밖: 5
\`\`\`

n은 x의 **복사본**이라서, n을 바꿔도 x는 그대로 **5**예요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드에서 마지막 OUTPUT의 결과는?

\`\`\`
PROCEDURE DoubleIt(BYVAL num : INTEGER)
    num ← num * 2
    OUTPUT num
ENDPROCEDURE

DECLARE myNum : INTEGER
myNum ← 7
CALL DoubleIt(myNum)
OUTPUT myNum
\`\`\`

마지막 줄 \`OUTPUT myNum\`의 결과는?`,
          options: [
            '7',
            '14',
            '0',
            '에러'
          ],
          answer: 0,
          explanation: 'BYVAL로 전달했으므로 num은 myNum의 복사본이에요. 프로시저 안에서 num이 14로 바뀌지만, 원본 myNum은 여전히 **7**이에요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '값을 복사해서 전달하는 프로시저를 완성하세요.',
          code: 'PROCEDURE Show(___ n : INTEGER)\n    OUTPUT n\nENDPROCEDURE',
          fillBlanks: [
            { id: 1, answer: "BYVAL", options: ["BYVAL", "BYREF", "VALUE", "COPY"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "BYREF (참조에 의한 전달)",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-byref",
          type: "explain",
          title: "🔗 BYREF란?",
          content: `**BYREF**는 변수의 **원본을 직접** 전달해요. 프로시저 안에서 바꾸면 원본도 바뀌어요!

\`\`\`
PROCEDURE AddTen(BYREF n : INTEGER)
    n ← n + 10
    OUTPUT "프로시저 안: " & n
ENDPROCEDURE

DECLARE x : INTEGER
x ← 5
CALL AddTen(x)
OUTPUT "프로시저 밖: " & x
\`\`\`

BYVAL 때와 비교해 볼까요?

| 단계 | 설명 | n (= x 원본!) | x |
|---|---|---|---|
| 1 | x ← 5 | - | 5 |
| 2 | CALL AddTen(x) → n은 x의 별명 | 5 | 5 |
| 3 | n ← n + 10 (원본도 변경!) | 15 | 15 |
| 4 | OUTPUT n → "프로시저 안: 15" | 15 | 15 |
| 5 | OUTPUT x → "프로시저 밖: 15" | - | 15 |

결과:
\`\`\`
프로시저 안: 15
프로시저 밖: 15
\`\`\`

BYREF에서는 n이 x의 **별명(참조)**이기 때문에, n을 바꾸면 x도 **같이 바뀌어요**!`
        },
        {
          id: "ch2-swap",
          type: "explain",
          title: "🔄 BYREF 활용: 두 값 바꾸기",
          content: `BYREF가 꼭 필요한 대표적인 예: **두 변수의 값 교환(Swap)!**

\`\`\`
PROCEDURE Swap(BYREF x : INTEGER, BYREF y : INTEGER)
    DECLARE temp : INTEGER
    temp ← x
    x ← y
    y ← temp
ENDPROCEDURE

DECLARE a : INTEGER
DECLARE b : INTEGER
a ← 10
b ← 20

OUTPUT "교환 전: a=" & a & ", b=" & b
CALL Swap(a, b)
OUTPUT "교환 후: a=" & a & ", b=" & b
\`\`\`

실행 흐름:

| 단계 | temp | x (= a) | y (= b) |
|---|---|---|---|
| 시작 | - | 10 | 20 |
| temp ← x | 10 | 10 | 20 |
| x ← y | 10 | 20 | 20 |
| y ← temp | 10 | 20 | 10 |

결과:
\`\`\`
교환 전: a=10, b=20
교환 후: a=20, b=10
\`\`\`

BYREF 덕분에 a와 b의 값이 진짜로 바뀌었어요!
만약 BYVAL이었다면 원본 a, b는 그대로였을 거예요.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 최종 출력 결과는?

\`\`\`
PROCEDURE Increment(BYREF value : INTEGER)
    value ← value + 1
ENDPROCEDURE

DECLARE count : INTEGER
count ← 0
CALL Increment(count)
CALL Increment(count)
CALL Increment(count)
OUTPUT count
\`\`\`

추적표를 그려보세요!

| 호출 | 실행 전 count | 실행 후 count |
|---|---|---|
| 1번째 CALL | 0 | ? |
| 2번째 CALL | ? | ? |
| 3번째 CALL | ? | ? |`,
          options: [
            '3',
            '1',
            '0',
            '에러'
          ],
          answer: 0,
          explanation: 'BYREF이므로 매번 원본 count가 바뀌어요! 0 → 1 → 2 → 3. 최종 count는 **3**이에요!'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 BYVAL vs BYREF 비교!",
          content: `두 프로시저의 차이를 비교해 봐요.

\`\`\`
PROCEDURE ProcA(BYVAL n : INTEGER)
    n ← n + 100
ENDPROCEDURE

PROCEDURE ProcB(BYREF n : INTEGER)
    n ← n + 100
ENDPROCEDURE

DECLARE x : INTEGER
DECLARE y : INTEGER
x ← 5
y ← 5
CALL ProcA(x)
CALL ProcB(y)
OUTPUT x
OUTPUT y
\`\`\`

\`OUTPUT x\`와 \`OUTPUT y\`의 결과는?`,
          options: [
            '5 그리고 105',
            '105 그리고 105',
            '5 그리고 5',
            '105 그리고 5'
          ],
          answer: 0,
          explanation: 'ProcA는 BYVAL이라 x의 복사본만 바뀌어요 → x는 그대로 **5**. ProcB는 BYREF라 y 원본이 바뀌어요 → y는 **105**!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '원본 값을 직접 수정하는 프로시저를 완성하세요.',
          code: 'PROCEDURE ResetToZero(___ n : INTEGER)\n    n ← 0\nENDPROCEDURE\n\nDECLARE score : INTEGER\nscore ← 85\nCALL ResetToZero(score)\nOUTPUT score',
          fillBlanks: [
            { id: 1, answer: "BYREF", options: ["BYREF", "BYVAL", "REF", "VAL"] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 마무리 퀴즈!",
          content: '다음 중 BYREF를 반드시 사용해야 하는 경우는?',
          options: [
            '프로시저 안에서 원본 변수의 값을 변경해야 할 때',
            '매개변수의 값을 출력만 할 때',
            '매개변수로 상수를 전달할 때',
            '함수에서 값을 반환할 때'
          ],
          answer: 0,
          explanation: '원본 변수를 변경해야 하는 경우(예: Swap, Reset, Increment)에는 반드시 **BYREF**를 사용해요. 값을 읽기만 하면 BYVAL이면 충분해요!'
        },
        {
          id: "ch2-summary",
          type: "explain",
          title: "📝 핵심 정리",
          content: `BYVAL과 BYREF를 정리해 볼까요?

| | BYVAL | BYREF |
|---|---|---|
| **전달 방식** | 값을 복사 | 원본을 직접 전달 |
| **원본 변경** | 안 됨 | 됨 |
| **키워드** | BYVAL | BYREF |
| **사용 시기** | 값을 읽기만 할 때 | 원본을 수정해야 할 때 |

\`\`\`
// BYVAL: 복사본 → 원본 안전!
PROCEDURE Show(BYVAL n : INTEGER)
    OUTPUT n
ENDPROCEDURE

// BYREF: 원본 직접 → 원본 변경!
PROCEDURE Swap(BYREF x : INTEGER, BYREF y : INTEGER)
    DECLARE temp : INTEGER
    temp ← x
    x ← y
    y ← temp
ENDPROCEDURE
\`\`\`

시험에서 자주 나오는 포인트:
- 📌 **BYVAL** → "원본은 바뀌지 않는다"
- 📌 **BYREF** → "원본이 바뀐다"
- 📌 추적표(Trace Table) 문제에서 꼭 확인하세요!`
        }
      ]
    }
  ]
}
