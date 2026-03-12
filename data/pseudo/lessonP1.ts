// ============================================
// 수도코드 종합 프로젝트: Part 1 복습
// OUTPUT, 변수, INPUT, 자료형, 조건문, 반복문, 배열
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP1Data: LessonData = {
  id: "pseudo-p1",
  title: "종합 프로젝트",
  emoji: "🏆",
  description: "Part 1 복습 프로젝트!",
  chapters: [
    {
      id: "ch1",
      title: "평균 계산기",
      emoji: "🧮",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🧮 문제: 평균 계산기",
          content: `**문제:** 사용자에게 5개의 숫자를 입력받아 **평균**을 계산하는 프로그램을 만드세요.

필요한 개념:
- 📊 **배열**: 5개의 숫자를 저장
- 🔄 **반복문**: 입력받기 & 합계 구하기
- 📥 **INPUT**: 사용자에게 숫자 입력받기
- 📤 **OUTPUT**: 결과 출력
- 📝 **변수**: 합계(total)와 평균(average) 저장

어떻게 만들면 좋을까 생각해 봐요! 🤔`
        },
        {
          id: "ch1-solution",
          type: "explain",
          title: "📋 풀이 코드",
          content: `자, 평균 계산기의 전체 수도코드를 볼까요?

\`\`\`
DECLARE numbers : ARRAY[1:5] OF REAL
DECLARE total : REAL
DECLARE average : REAL

total ← 0

FOR i ← 1 TO 5
    OUTPUT "숫자를 입력하세요: "
    INPUT numbers[i]
    total ← total + numbers[i]
NEXT i

average ← total / 5

OUTPUT "합계: ", total
OUTPUT "평균: ", average
\`\`\`

한 줄씩 살펴볼게요:
1. 📊 배열과 변수를 **DECLARE**로 선언
2. 🔢 total을 **0으로 초기화**
3. 🔄 FOR 반복문으로 5번 반복하면서:
   - INPUT으로 숫자를 배열에 저장
   - total에 계속 더하기
4. ➗ 합계를 5로 나누어 평균 계산
5. 📤 결과 출력`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '평균 계산기에서 `total ← 0`을 빼먹으면 어떻게 될까요?',
          options: [
            'total에 쓰레기 값이 들어있어서 평균이 틀릴 수 있다',
            '아무 문제없다',
            '프로그램이 실행되지 않는다',
            'total이 자동으로 0이 된다'
          ],
          answer: 0,
          explanation: '변수를 선언만 하고 초기화하지 않으면 **알 수 없는 값(쓰레기 값)**이 들어있을 수 있어요. 그래서 합계를 구하기 전에 반드시 **total ← 0**으로 초기화해야 해요!'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `사용자가 10, 20, 30, 40, 50을 입력했다면, 다음 코드의 결과는?

\`\`\`
DECLARE numbers : ARRAY[1:5] OF REAL
DECLARE total : REAL
DECLARE average : REAL

total ← 0

FOR i ← 1 TO 5
    INPUT numbers[i]
    total ← total + numbers[i]
NEXT i

average ← total / 5
OUTPUT average
\`\`\``,
          options: [
            '30',
            '150',
            '50',
            '10'
          ],
          answer: 0,
          explanation: '합계는 10 + 20 + 30 + 40 + 50 = **150**이고, 평균은 150 / 5 = **30**이에요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '평균을 계산하는 핵심 코드를 완성하세요.',
          code: 'total ← 0\n\nFOR i ← 1 TO 5\n    INPUT numbers[i]\n    total ← total + numbers[i]\nNEXT i\n\naverage ← total ___ 5',
          fillBlanks: [
            { id: 1, answer: "/", options: ["/", "*", "+", "-"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "최대값 찾기",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔍 문제: 최대값 찾기",
          content: `**문제:** 배열에 저장된 숫자들 중에서 **가장 큰 값**을 찾는 프로그램을 만드세요.

예를 들어:
- 배열: [35, 72, 18, 91, 46]
- 최대값: **91**

필요한 개념:
- 📊 **배열**: 숫자들 저장
- 🔄 **반복문**: 배열 순회
- 🔀 **조건문**: 현재 값이 최대값보다 큰지 비교
- 📝 **변수**: 최대값(max) 저장

핵심 아이디어: 첫 번째 값을 최대값으로 시작하고, 나머지와 비교하면서 더 큰 값을 발견하면 업데이트해요! 💡`
        },
        {
          id: "ch2-solution",
          type: "explain",
          title: "📋 풀이 코드",
          content: `최대값 찾기의 전체 수도코드를 볼까요?

\`\`\`
DECLARE scores : ARRAY[1:5] OF INTEGER
scores[1] ← 35
scores[2] ← 72
scores[3] ← 18
scores[4] ← 91
scores[5] ← 46

DECLARE max : INTEGER
max ← scores[1]

FOR i ← 2 TO 5
    IF scores[i] > max THEN
        max ← scores[i]
    ENDIF
NEXT i

OUTPUT "최대값: ", max
\`\`\`

알고리즘 흐름:
1. 📌 max를 **첫 번째 값(35)**으로 설정
2. 🔄 2번부터 5번까지 하나씩 비교:
   - 72 > 35? ✅ → max ← 72
   - 18 > 72? ❌ → 변화 없음
   - 91 > 72? ✅ → max ← 91
   - 46 > 91? ❌ → 변화 없음
3. 📤 결과: **91**`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '최대값 찾기에서 FOR 반복문이 `i ← 2`부터 시작하는 이유는?',
          options: [
            'max에 이미 scores[1]을 넣었으므로 2번부터 비교하면 된다',
            'CIE 수도코드에서 반복문은 항상 2부터 시작한다',
            '1번 인덱스는 배열에서 사용할 수 없다',
            '특별한 이유 없이 관례적으로 그렇게 한다'
          ],
          answer: 0,
          explanation: '**max ← scores[1]**로 첫 번째 값을 이미 넣었어요. 자기 자신과 비교할 필요가 없으니, **2번부터 비교**하면 돼요!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE vals : ARRAY[1:4] OF INTEGER
vals[1] ← 50
vals[2] ← 20
vals[3] ← 80
vals[4] ← 40

max ← vals[1]

FOR i ← 2 TO 4
    IF vals[i] > max THEN
        max ← vals[i]
    ENDIF
NEXT i

OUTPUT max
\`\`\``,
          options: [
            '80',
            '50',
            '40',
            '20'
          ],
          answer: 0,
          explanation: 'max는 50으로 시작 → 20은 50보다 작으니 변화 없음 → 80은 50보다 크니 max ← 80 → 40은 80보다 작으니 변화 없음. 최종 max는 **80**이에요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '최대값 찾기의 핵심 조건문을 완성하세요.',
          code: 'max ← scores[1]\n\nFOR i ← 2 TO 5\n    IF scores[i] ___ max THEN\n        max ← scores[i]\n    ENDIF\nNEXT i',
          fillBlanks: [
            { id: 1, answer: ">", options: [">", "<", "=", ">="] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "숫자 맞추기 게임",
      emoji: "🎮",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🎮 문제: 숫자 맞추기 게임",
          content: `**문제:** 컴퓨터가 정한 비밀 숫자를 맞추는 게임을 만드세요!

게임 규칙:
- 🔒 비밀 숫자는 1부터 100 사이
- 🔄 사용자가 숫자를 입력하면 "너무 커요" 또는 "너무 작아요" 힌트를 줘요
- 🎯 맞출 때까지 계속 반복해요
- 🏆 맞추면 "정답!" 출력

필요한 개념:
- 📝 **변수**: 비밀 숫자, 사용자 입력
- 🔄 **REPEAT...UNTIL 반복문**: 맞출 때까지 반복
- 🔀 **IF...THEN...ELSE 조건문**: 힌트 주기
- 📥 **INPUT** / 📤 **OUTPUT`
        },
        {
          id: "ch3-solution",
          type: "explain",
          title: "📋 풀이 코드",
          content: `숫자 맞추기 게임의 전체 수도코드를 볼까요?

\`\`\`
DECLARE secret : INTEGER
DECLARE guess : INTEGER
DECLARE attempts : INTEGER

secret ← 42
attempts ← 0

OUTPUT "1~100 사이의 숫자를 맞춰보세요!"

REPEAT
    OUTPUT "숫자를 입력하세요: "
    INPUT guess
    attempts ← attempts + 1

    IF guess > secret THEN
        OUTPUT "너무 커요! ⬇️"
    ELSE
        IF guess < secret THEN
            OUTPUT "너무 작아요! ⬆️"
        ELSE
            OUTPUT "정답입니다! 🎉"
        ENDIF
    ENDIF
UNTIL guess = secret

OUTPUT "시도 횟수: ", attempts
\`\`\`

구조 분석:
1. 📝 변수 선언 & 비밀 숫자 설정
2. 🔄 **REPEAT...UNTIL**: guess가 secret과 같을 때까지 반복
3. 🔀 **중첩 IF문**으로 3가지 경우 처리:
   - guess > secret → "너무 커요"
   - guess < secret → "너무 작아요"
   - guess = secret → "정답!"
4. 📊 시도 횟수 출력`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '이 게임에서 FOR 대신 REPEAT...UNTIL을 사용하는 이유는?',
          options: [
            '몇 번 반복할지 미리 알 수 없기 때문에',
            'FOR 반복문으로는 만들 수 없어서',
            'REPEAT가 더 빠르기 때문에',
            'CIE 시험에서 FOR을 쓰면 안 되기 때문에'
          ],
          answer: 0,
          explanation: 'FOR 반복문은 **횟수가 정해진** 경우에 써요. 숫자 맞추기 게임은 사용자가 **언제 맞출지 모르기 때문에** REPEAT...UNTIL이 적합해요!'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `비밀 숫자가 42일 때, 사용자가 순서대로 60, 30, 42를 입력하면 출력되는 메시지 순서는?

\`\`\`
secret ← 42

REPEAT
    INPUT guess
    IF guess > secret THEN
        OUTPUT "너무 커요!"
    ELSE
        IF guess < secret THEN
            OUTPUT "너무 작아요!"
        ELSE
            OUTPUT "정답!"
        ENDIF
    ENDIF
UNTIL guess = secret
\`\`\``,
          options: [
            '너무 커요! → 너무 작아요! → 정답!',
            '너무 작아요! → 너무 커요! → 정답!',
            '너무 커요! → 너무 커요! → 정답!',
            '정답!'
          ],
          answer: 0,
          explanation: '60 > 42 → "너무 커요!", 30 < 42 → "너무 작아요!", 42 = 42 → "정답!" 순서로 출력돼요!'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '숫자 맞추기 게임의 반복 조건을 완성하세요.',
          code: 'REPEAT\n    INPUT guess\n    IF guess > secret THEN\n        OUTPUT "너무 커요!"\n    ELSE\n        IF guess < secret THEN\n            OUTPUT "너무 작아요!"\n        ELSE\n            OUTPUT "정답!"\n        ENDIF\n    ENDIF\n___ guess = secret',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "WHEN", "FOR"] }
          ]
        }
      ]
    }
  ]
}
