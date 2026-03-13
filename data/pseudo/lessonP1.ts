// ============================================
// 수도코드 기출문제 연습: Part 1
// 자료형, 연산자, 검증, 변수, 조건문, 반복문, 배열
// IGCSE 0478 Paper 2 스타일
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP1Data: LessonData = {
  id: "pseudo-p1",
  title: "기출문제 연습",
  emoji: "📝",
  description: "Part 1 기출문제 스타일 연습!",
  chapters: [
    {
      id: "ch1",
      title: "기초 개념 문제",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📝 기출문제 유형 소개",
          content: `IGCSE Computer Science Paper 2에서 자주 나오는 **기초 개념 문제**를 연습해 봐요!

이런 유형의 문제가 나와요:
- 🔍 **검증(Validation)** 종류 구분
- 📊 **자료형(Data Type)** 매칭
- ➕ **연산자(Operator)** 분류
- 📝 **코드 읽기** & 출력 예측

각 문제는 실제 시험과 비슷한 형식이에요. 준비됐나요? 💪`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🔍 검증 종류 (Validation Check)",
          content: `이메일 주소에 '@' 기호가 포함되어 있는지 확인하는 검증(validation check)의 종류는?

예: \`user@email.com\`에서 '@'가 있는지 확인`,
          options: [
            'format check',
            'range check',
            'length check',
            'presence check'
          ],
          answer: 0,
          explanation: `**Format check**는 데이터가 **정해진 형식(패턴)**을 따르는지 확인해요.

이메일에 '@'가 포함되어 있는지 확인하는 것은 **형식 검사**예요.

다른 검증 종류:
- **Range check**: 값이 범위 안에 있는지 (예: 1~100)
- **Length check**: 문자열 길이가 맞는지 (예: 비밀번호 8자 이상)
- **Presence check**: 빈칸이 아닌지 확인`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "📊 자료형 매칭",
          content: `다음 중 "소수점이 있는 숫자" (예: 3.14, 9.8)를 저장하는 데 적합한 자료형은?`,
          options: [
            'REAL',
            'INTEGER',
            'STRING',
            'BOOLEAN'
          ],
          answer: 0,
          explanation: `**REAL**은 소수점이 있는 숫자를 저장해요.

자료형 정리:
- **INTEGER**: 정수 (42, -7)
- **REAL**: 실수 (3.14, -0.5)
- **STRING**: 문자열 ("Hello")
- **BOOLEAN**: 참/거짓 (TRUE, FALSE)
- **CHAR**: 단일 문자 ('A', '3')`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "📊 자료형 매칭 2",
          content: `"한 글자"를 저장하기에 가장 적합한 자료형은?

예: 'A', 'Z', '5'`,
          options: [
            'CHAR',
            'STRING',
            'INTEGER',
            'BOOLEAN'
          ],
          answer: 0,
          explanation: `**CHAR**는 단일 문자 하나만 저장해요.

STRING도 한 글자를 저장할 수 있지만, **정확히 한 글자**만 필요할 때는 CHAR가 더 적합해요.

시험에서 자주 나오는 매칭:
- 정수(whole number) → INTEGER
- 단일 문자(single letter) → CHAR
- 단어/문장(word or phrase) → STRING
- 소수(number with decimal) → REAL`
        },
        {
          id: "ch1-q4",
          type: "quiz",
          title: "➕ 연산자 분류",
          content: `다음 연산자들을 분류하세요.

\`DIV\`는 어떤 종류의 연산자인가요?

(참고: DIV는 정수 나눗셈, 예: 7 DIV 2 = 3)`,
          options: [
            '산술 연산자 (Arithmetic)',
            '비교 연산자 (Comparison)',
            '논리 연산자 (Logical)',
            '대입 연산자 (Assignment)'
          ],
          answer: 0,
          explanation: `**DIV**는 **산술 연산자**예요. 정수 나눗셈을 수행해요.

연산자 분류:
- **산술**: +, -, *, /, DIV, MOD
- **비교**: =, <>, <, >, <=, >=
- **논리**: AND, OR, NOT
- **대입**: ←`
        },
        {
          id: "ch1-q5",
          type: "quiz",
          title: "➕ 연산자 분류 2",
          content: `다음 중 **논리 연산자(Logical Operator)**는?`,
          options: [
            'AND',
            '>=',
            'MOD',
            'DIV'
          ],
          answer: 0,
          explanation: `**AND**는 논리 연산자예요. 두 조건이 모두 참일 때 TRUE를 반환해요.

- **>=** 는 비교 연산자 (크거나 같다)
- **MOD** 는 산술 연산자 (나머지)
- **DIV** 는 산술 연산자 (정수 나눗셈)`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 코드 출력 예측",
          content: `다음 수도코드의 출력 결과는?

\`\`\`
DECLARE x : INTEGER
DECLARE y : INTEGER

x ← 17
y ← x MOD 5
x ← x DIV 5

OUTPUT y
OUTPUT x
\`\`\``,
          options: [
            '2\n3',
            '3\n2',
            '5\n3',
            '2\n5'
          ],
          answer: 0,
          explanation: `한 줄씩 따라가 볼게요:

1. x ← 17
2. y ← 17 MOD 5 = **2** (나머지)
3. x ← 17 DIV 5 = **3** (정수 나눗셈)
4. OUTPUT y → **2**
5. OUTPUT x → **3**

💡 MOD는 나머지, DIV는 몫을 구해요!`
        }
      ]
    },
    {
      id: "ch2",
      title: "수도코드 읽기 & 오류 찾기",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔍 오류가 있는 수도코드",
          content: `다음 수도코드는 1부터 10 사이의 랜덤 개수만큼 숫자를 입력받아 합계와 평균을 구하려고 해요.
하지만 **4개의 오류**가 있어요!

\`\`\`
01 DECLARE Count : STRING
02 DECLARE Limit : INTEGER
03 DECLARE Value : REAL
04 DECLARE Total : REAL
05 Total ← 0
06 Limit ← ROUND(RANDOM() * 9, 0) + 1
07 IF Count ← 1 TO Limit
08     OUTPUT "Enter a number"
09     INPUT Count
10     Total ← Total * Value
11 NEXT Count
12 OUTPUT "Total is ", Total
13 OUTPUT "Average is ", Total / Limit
\`\`\`

어떤 오류들이 있을까요? 🤔`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "🐛 오류 1 찾기",
          content: `01번 줄 \`DECLARE Count : STRING\`에서 오류는?`,
          options: [
            'Count는 반복문 카운터이므로 INTEGER여야 한다',
            'Count 대신 Loop를 써야 한다',
            'STRING 대신 REAL이어야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `Count는 FOR 반복문의 **카운터 변수**로 사용돼요.

카운터 변수는 항상 **INTEGER**여야 해요!

수정: \`DECLARE Count : INTEGER\``
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🐛 오류 2 찾기",
          content: `07번 줄 \`IF Count ← 1 TO Limit\`에서 오류는?`,
          options: [
            'IF 대신 FOR을 써야 한다',
            '← 대신 = 을 써야 한다',
            'TO 대신 UNTIL을 써야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `정해진 횟수만큼 반복하려면 **FOR** 반복문을 써야 해요!

IF는 조건문이지 반복문이 아니에요.

수정: \`FOR Count ← 1 TO Limit\``
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "🐛 오류 3 찾기",
          content: `09번 줄 \`INPUT Count\`에서 오류는?`,
          options: [
            'Count 대신 Value를 입력받아야 한다',
            'INPUT 대신 OUTPUT을 써야 한다',
            'Count에 1을 더해야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `Count는 **반복문 카운터**예요. 사용자가 입력하는 값은 **Value**에 저장해야 해요!

Count에 입력을 받으면 반복문이 망가져요.

수정: \`INPUT Value\``
        },
        {
          id: "ch2-q4",
          type: "quiz",
          title: "🐛 오류 4 찾기",
          content: `10번 줄 \`Total ← Total * Value\`에서 오류는?`,
          options: [
            '* 대신 + 를 써야 한다 (합계를 구하므로)',
            'Total 대신 Value를 써야 한다',
            'Value 대신 Count를 써야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `합계를 구하려면 **더하기(+)**를 써야 해요!

곱하기(*)를 쓰면 합계가 아니라 곱이 돼요.

수정: \`Total ← Total + Value\``
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 수정된 코드 완성",
          content: '오류를 수정한 코드를 완성하세요.',
          code: 'DECLARE Count : INTEGER\nDECLARE Limit : INTEGER\nDECLARE Value : REAL\nDECLARE Total : REAL\nTotal ← 0\nLimit ← ROUND(RANDOM() * 9, 0) + 1\n___ Count ← 1 TO Limit\n    OUTPUT "Enter a number"\n    INPUT ___\n    Total ← Total ___ Value\nNEXT Count',
          fillBlanks: [
            { id: 1, answer: "FOR", options: ["FOR", "IF", "WHILE", "REPEAT"] },
            { id: 2, answer: "Value", options: ["Value", "Count", "Total", "Limit"] },
            { id: 3, answer: "+", options: ["+", "*", "-", "/"] }
          ]
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 수정된 코드 결과 예측",
          content: `수정된 코드에서 Limit = 3이고,
사용자가 10, 20, 30을 입력했다면 출력은?

\`\`\`
Total ← 0
FOR Count ← 1 TO 3
    INPUT Value
    Total ← Total + Value
NEXT Count
OUTPUT "Total is ", Total
OUTPUT "Average is ", Total / Limit
\`\`\``,
          options: [
            'Total is 60\nAverage is 20',
            'Total is 60\nAverage is 30',
            'Total is 30\nAverage is 10',
            'Total is 20\nAverage is 60'
          ],
          answer: 0,
          explanation: `계산 과정:
- 1회차: Total = 0 + 10 = 10
- 2회차: Total = 10 + 20 = 30
- 3회차: Total = 30 + 30 = **60**
- Average = 60 / 3 = **20**`
        }
      ]
    },
    {
      id: "ch3",
      title: "수도코드 작성",
      emoji: "✍️",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "✍️ 수도코드 작성 문제",
          content: `이번에는 직접 수도코드를 **작성**하는 연습을 해 봐요!

시험에서 자주 나오는 작성 유형:
- **CASE 문** 사용
- **입력 검증** (Validation)
- **반복문으로 데이터 처리**
- **의미 있는 식별자** 제안

준비됐나요? ✍️`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ CASE 문 작성",
          content: `1부터 4 사이의 정수를 입력받아 CASE 문으로 처리하는 코드를 완성하세요.
- 1~4: 해당 숫자 출력
- 그 외: "ERROR" 출력`,
          code: 'INPUT Number\n___ OF Number\n    1: OUTPUT "One"\n    2: OUTPUT "Two"\n    3: OUTPUT "Three"\n    4: OUTPUT "Four"\n    ___: OUTPUT "ERROR"\n___',
          fillBlanks: [
            { id: 1, answer: "CASE", options: ["CASE", "IF", "SELECT", "SWITCH"] },
            { id: 2, answer: "OTHERWISE", options: ["OTHERWISE", "ELSE", "DEFAULT", "OTHER"] },
            { id: 3, answer: "ENDCASE", options: ["ENDCASE", "ENDIF", "END", "NEXT"] }
          ]
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 입력 검증 작성",
          content: `1부터 500 사이의 숫자만 입력받는 검증 코드를 완성하세요.
범위를 벗어나면 다시 입력받아요.`,
          code: 'REPEAT\n    OUTPUT "Enter a number (1-500): "\n    INPUT Number\n___ Number < 1 ___ Number > 500',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "IF", "FOR"] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "XOR"] }
          ]
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "🧠 검증 반복문 조건",
          content: `위의 검증 코드에서 UNTIL 조건이 \`Number >= 1 AND Number <= 500\`인 이유는?

REPEAT...UNTIL은 조건이 **참**이 되면 멈춰요.`,
          options: [
            '1~500 사이의 유효한 값이 들어오면 반복을 멈추기 위해',
            '1 미만이거나 500 초과면 반복을 멈추기 위해',
            'REPEAT는 항상 AND를 사용하기 때문에',
            '특별한 이유 없이 관례적으로'
          ],
          answer: 0,
          explanation: `REPEAT...UNTIL은 조건이 **TRUE**가 되면 **멈춰요**.

유효한 입력(1~500)이 들어오면 멈춰야 하므로:
\`UNTIL Number >= 1 AND Number <= 500\`

⚠️ 반대로 WHILE 반복문을 쓴다면:
\`WHILE Number < 1 OR Number > 500\`
(유효하지 않은 동안 계속 반복)`
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ 배열 합계 구하기",
          content: `5개의 점수가 담긴 배열에서 합계를 구하고 0인 값의 개수를 세는 코드를 완성하세요.`,
          code: 'DECLARE Scores : ARRAY[1:5] OF INTEGER\nDECLARE Total : INTEGER\nDECLARE ZeroCount : INTEGER\n\nTotal ← 0\nZeroCount ← 0\n\nFOR i ← 1 ___ 5\n    IF Scores[i] = 0 THEN\n        ZeroCount ← ZeroCount ___ 1\n    ENDIF\n    Total ← ___ + Scores[i]\nNEXT i\n\nOUTPUT "Total: ", Total\nOUTPUT "Zeros: ", ZeroCount',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "WHILE", "BY"] },
            { id: 2, answer: "+", options: ["+", "-", "*", "/"] },
            { id: 3, answer: "Total", options: ["Total", "Scores[i]", "ZeroCount", "i"] }
          ]
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "🏷️ 의미 있는 식별자",
          content: `다음 수도코드에서 변수 이름이 의미 없이 사용되었어요.

\`\`\`
DECLARE A : ARRAY[1:10] OF STRING
DECLARE T : STRING
DECLARE C : INTEGER
DECLARE L : INTEGER
L ← 10
\`\`\`

이 코드가 **10명의 이름을 입력받아 버블 정렬**하는 알고리즘이라면,
배열 \`A\`에 적합한 의미 있는 식별자(meaningful identifier)는?`,
          options: [
            'Names',
            'Data',
            'List',
            'Array1'
          ],
          answer: 0,
          explanation: `**Names**가 가장 적합해요!

이름을 저장하는 배열이므로 "Names"가 가장 명확해요.

다른 변수들도:
- T (임시 저장) → **Temp** 또는 **TempName**
- C (카운터) → **Counter** 또는 **OuterLoop**
- L (배열 길이) → **NumberOfNames** 또는 **ListLength**

💡 시험에서 **meaningful identifier**를 묻는 문제가 자주 나와요!`
        }
      ]
    }
  ]
}
