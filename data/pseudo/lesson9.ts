// ============================================
// 수도코드 레슨 9: CASE 선택문
// CIE 스타일 수도코드 - CASE...OF...OTHERWISE...ENDCASE
// ============================================

import { LessonData } from '../types'

export const pseudoLesson9Data: LessonData = {
  id: "pseudo-9",
  title: "CASE 선택문",
  emoji: "🔀",
  description: "여러 값 중 하나를 선택해요!",
  chapters: [
    {
      id: "ch1",
      title: "CASE 기본 문법",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 CASE문이란?",
          content: `IF문으로 여러 경우를 처리하면 코드가 길어지죠?

\`\`\`
IF day = 1 THEN
    OUTPUT "월요일"
ELSE
    IF day = 2 THEN
        OUTPUT "화요일"
    ELSE
        IF day = 3 THEN
            OUTPUT "수요일"
        ENDIF
    ENDIF
ENDIF
\`\`\`

이렇게 IF를 중첩하면 읽기 어려워요! 😵

**CASE문**을 쓰면 훨씬 깔끔해져요:

\`\`\`
CASE OF day
    1 : OUTPUT "월요일"
    2 : OUTPUT "화요일"
    3 : OUTPUT "수요일"
ENDCASE
\`\`\`

하나의 변수가 **여러 값 중 하나**일 때 CASE문을 사용해요!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📐 CASE문 문법",
          content: `CIE 수도코드에서 CASE문의 기본 구조예요:

\`\`\`
CASE OF 변수
    값1 : 실행할 문장1
    값2 : 실행할 문장2
    값3 : 실행할 문장3
    OTHERWISE : 기본 문장
ENDCASE
\`\`\`

중요한 규칙들:
- 📌 \`CASE OF\` 뒤에 검사할 **변수**를 써요
- 📌 각 값 뒤에 **콜론(:)**을 써요
- 📌 \`OTHERWISE\`는 어떤 값에도 해당되지 않을 때 실행돼요
- 📌 반드시 \`ENDCASE\`로 끝내요

\`OTHERWISE\`는 생략할 수도 있지만, 예상치 못한 값을 처리하기 위해 넣는 것이 좋아요!`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'CASE문을 끝낼 때 사용하는 키워드는?',
          options: [
            'ENDCASE',
            'END CASE',
            'ENDIF',
            'ENDSWITCH'
          ],
          answer: 0,
          explanation: 'CIE 수도코드에서 CASE문은 반드시 **ENDCASE**로 끝내요. 한 단어로 붙여 쓰는 것이 중요해요!'
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "🎯 CASE문 예제",
          content: `신호등 색에 따라 다른 메시지를 출력해 볼까요?

\`\`\`
DECLARE light : STRING
INPUT light

CASE OF light
    "빨강" : OUTPUT "멈추세요!"
    "노랑" : OUTPUT "준비하세요!"
    "초록" : OUTPUT "출발하세요!"
    OTHERWISE : OUTPUT "잘못된 신호입니다"
ENDCASE
\`\`\`

만약 \`light\`에 \`"초록"\`을 입력하면?
결과: **출발하세요!**

만약 \`light\`에 \`"파랑"\`을 입력하면?
결과: **잘못된 신호입니다** (OTHERWISE 실행!)`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드에서 \`grade\`가 \`"B"\`일 때 출력 결과는?

\`\`\`
CASE OF grade
    "A" : OUTPUT "최고예요!"
    "B" : OUTPUT "잘했어요!"
    "C" : OUTPUT "괜찮아요!"
    OTHERWISE : OUTPUT "더 노력해요!"
ENDCASE
\`\`\``,
          options: [
            '잘했어요!',
            '최고예요!',
            '괜찮아요!',
            '더 노력해요!'
          ],
          answer: 0,
          explanation: 'grade가 "B"이므로 두 번째 경우에 해당해요. 따라서 **"잘했어요!"**가 출력돼요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: 'CASE문의 기본 구조를 완성하세요.',
          codeTemplate: '___ OF season\n    "봄" : OUTPUT "꽃이 피어요"\n    "여름" : OUTPUT "바다에 가요"\n    "가을" : OUTPUT "단풍이 예뻐요"\n    "겨울" : OUTPUT "눈이 와요"\n    OTHERWISE : OUTPUT "알 수 없는 계절"\nENDCASE',
          fillBlanks: [
            { id: 1, answer: "CASE", options: ["CASE", "SWITCH", "SELECT", "CHECK"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "CASE 활용하기",
      emoji: "🚀",
      steps: [
        {
          id: "ch2-menu",
          type: "explain",
          title: "🍽️ 메뉴 선택 프로그램",
          content: `CASE문은 메뉴 선택에 딱 맞아요!

\`\`\`
DECLARE choice : INTEGER
OUTPUT "=== 메뉴 ==="
OUTPUT "1. 게임 시작"
OUTPUT "2. 설정"
OUTPUT "3. 종료"
OUTPUT "번호를 선택하세요: "
INPUT choice

CASE OF choice
    1 : OUTPUT "게임을 시작합니다!"
    2 : OUTPUT "설정 화면으로 이동합니다"
    3 : OUTPUT "프로그램을 종료합니다"
    OTHERWISE : OUTPUT "잘못된 선택입니다"
ENDCASE
\`\`\`

정수 값으로도 CASE문을 사용할 수 있어요!
각 숫자에 맞는 동작을 깔끔하게 정리할 수 있답니다.`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'CASE문에서 어떤 값에도 해당하지 않을 때 실행되는 부분은?',
          options: [
            'OTHERWISE',
            'DEFAULT',
            'ELSE',
            'NONE'
          ],
          answer: 0,
          explanation: 'CIE 수도코드에서는 **OTHERWISE**를 사용해요. 프로그래밍 언어의 default나 else와 비슷한 역할이에요!'
        },
        {
          id: "ch2-grade",
          type: "explain",
          title: "📊 등급 계산 프로그램",
          content: `시험 점수에 따라 등급을 매기는 프로그램이에요:

\`\`\`
DECLARE score : INTEGER
DECLARE grade : STRING
INPUT score

// 먼저 10으로 나눈 몫으로 등급 결정
DECLARE tens : INTEGER
tens ← score DIV 10

CASE OF tens
    10 : grade ← "A+"
    9  : grade ← "A"
    8  : grade ← "B"
    7  : grade ← "C"
    6  : grade ← "D"
    OTHERWISE : grade ← "F"
ENDCASE

OUTPUT "등급: " & grade
\`\`\`

점수가 85점이면?
- \`tens ← 85 DIV 10\` → tens = **8**
- CASE에서 8에 해당 → grade = **"B"**
- 출력: **등급: B**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드에서 \`day\`가 \`4\`일 때 출력 결과는?

\`\`\`
DECLARE day : INTEGER
day ← 4
DECLARE result : STRING

CASE OF day
    1 : result ← "월"
    2 : result ← "화"
    3 : result ← "수"
    4 : result ← "목"
    5 : result ← "금"
    OTHERWISE : result ← "주말"
ENDCASE

OUTPUT result & "요일입니다"
\`\`\``,
          options: [
            '목요일입니다',
            '금요일입니다',
            '수요일입니다',
            '주말요일입니다'
          ],
          answer: 0,
          explanation: 'day가 4이므로 result에 "목"이 저장돼요. 그리고 "목" & "요일입니다"가 연결되어 **"목요일입니다"**가 출력돼요!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '방향키에 따라 캐릭터를 이동시키는 CASE문을 완성하세요.',
          codeTemplate: 'CASE OF direction\n    "up"    : y ← y - 1\n    "down"  : y ← y + 1\n    "left"  : x ← x - 1\n    "right" : x ← x + 1\n    ___ : OUTPUT "잘못된 방향"\nENDCASE',
          fillBlanks: [
            { id: 1, answer: "OTHERWISE", options: ["OTHERWISE", "DEFAULT", "ELSE", "OTHER"] }
          ]
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ IF vs CASE 비교",
          content: `언제 IF를 쓰고, 언제 CASE를 쓸까요?

**IF문을 쓸 때:**
- 조건이 범위일 때 (예: \`score >= 90\`)
- 서로 다른 변수를 비교할 때
- 복잡한 조건일 때

\`\`\`
IF score >= 90 THEN
    OUTPUT "A"
ELSE
    IF score >= 80 THEN
        OUTPUT "B"
    ENDIF
ENDIF
\`\`\`

**CASE문을 쓸 때:**
- 하나의 변수가 **특정 값**인지 확인할 때
- 선택지가 여러 개일 때
- 메뉴, 요일, 등급 등

\`\`\`
CASE OF menu
    1 : OUTPUT "시작"
    2 : OUTPUT "설정"
    3 : OUTPUT "종료"
ENDCASE
\`\`\`

정리하면:
- 📌 **범위 비교** → IF문
- 📌 **특정 값 비교** → CASE문`
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 CASE문 사용이 가장 적절한 상황은?',
          options: [
            '사용자가 입력한 메뉴 번호(1~5)에 따라 다른 기능 실행',
            '학생 점수가 60점 이상인지 확인',
            '두 숫자 중 더 큰 값 찾기',
            '입력한 숫자가 양수인지 음수인지 판별'
          ],
          answer: 0,
          explanation: 'CASE문은 하나의 변수가 **특정 값(1, 2, 3, 4, 5)**인지 비교할 때 적합해요. 범위 비교나 크기 비교에는 IF문이 더 좋아요!'
        }
      ]
    }
  ]
}
