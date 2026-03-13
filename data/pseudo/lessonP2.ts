// ============================================
// 수도코드 기출문제 연습: Part 2
// CASE, PROCEDURE/FUNCTION, 매개변수(BYVAL/BYREF),
// 문자열 함수, 파일 처리, 2D 배열
// IGCSE 0478 Paper 2 스타일
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP2Data: LessonData = {
  id: "pseudo-p2",
  title: "기출문제 연습 2",
  emoji: "📝",
  description: "Part 2 기출문제 스타일 연습!",
  chapters: [
    {
      id: "ch1",
      title: "프로시저 & 함수",
      emoji: "🔧",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔧 PROCEDURE & FUNCTION 기출 유형",
          content: `IGCSE Paper 2에서 **PROCEDURE/FUNCTION** 관련 문제가 자주 나와요!

자주 나오는 유형:
- 🔍 **PROCEDURE와 FUNCTION** 구분하기
- 📥 **BYVAL vs BYREF** 매개변수 전달 방식
- 📝 PROCEDURE/FUNCTION **호출(CALL)** 코드 작성
- 🔮 FUNCTION의 **RETURN 값** 예측

핵심 정리:
- **PROCEDURE**: 작업만 수행, 값을 RETURN하지 않음
- **FUNCTION**: 반드시 값을 RETURN함
- **BYVAL**: 값의 복사본 전달 (원본 변경 ❌)
- **BYREF**: 원본 변수의 참조 전달 (원본 변경 ⭕)

준비됐나요? 💪`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🧠 PROCEDURE 정의",
          content: `다음 중 **값을 RETURN하지 않을 수도 있는** 서브루틴(subroutine)은?`,
          options: [
            'PROCEDURE',
            'FUNCTION',
            'VARIABLE',
            'ARRAY'
          ],
          answer: 0,
          explanation: `**PROCEDURE**는 값을 RETURN하지 않아요.

작업(task)만 수행하고 끝나요.

\`\`\`
PROCEDURE PrintMessage()
    OUTPUT "Hello!"
ENDPROCEDURE
\`\`\`

반면 FUNCTION은 **반드시** 값을 RETURN해요!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "🧠 FUNCTION 정의",
          content: `다음 중 **반드시 값을 RETURN하는** 서브루틴(subroutine)은?`,
          options: [
            'FUNCTION',
            'PROCEDURE',
            'LOOP',
            'MODULE'
          ],
          answer: 0,
          explanation: `**FUNCTION**은 항상 값을 RETURN해요.

\`\`\`
FUNCTION Double(n : INTEGER) RETURNS INTEGER
    RETURN n * 2
ENDFUNCTION
\`\`\`

FUNCTION은:
- **RETURNS** 키워드로 반환 자료형을 지정
- **RETURN** 키워드로 값을 돌려줌
- 호출 시 변수에 저장하거나 OUTPUT에 사용 가능`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "🧠 BYVAL vs BYREF",
          content: `매개변수 전달 방식 중, **원본 변수의 값을 변경**할 수 있는 것은?

\`\`\`
PROCEDURE Swap(BYREF x : INTEGER, BYREF y : INTEGER)
    DECLARE temp : INTEGER
    temp ← x
    x ← y
    y ← temp
ENDPROCEDURE
\`\`\``,
          options: [
            'BYREF',
            'BYVAL',
            'BYNAME',
            'BYTYPE'
          ],
          answer: 0,
          explanation: `**BYREF** (By Reference)는 원본 변수의 **참조**를 전달해요.

서브루틴 안에서 값을 바꾸면 **원본 변수도 바뀌어요!**

비교:
- **BYVAL**: 값의 복사본 전달 → 원본 변경 ❌
- **BYREF**: 원본의 참조 전달 → 원본 변경 ⭕

💡 시험 팁: "값이 바뀌어야 한다" → BYREF!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ PROCEDURE 호출",
          content: `프로시저 \`Average\`에 값 25와 50을 전달하여 호출하는 코드를 완성하세요.`,
          code: '___ Average(25, 50)',
          fillBlanks: [
            { id: 1, answer: "CALL", options: ["CALL", "RUN", "EXECUTE", "START"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 FUNCTION 결과 예측",
          content: `다음 FUNCTION의 호출 결과는?

\`\`\`
FUNCTION CalcArea(length : INTEGER,
                  width : INTEGER)
                  RETURNS INTEGER
    RETURN length * width
ENDFUNCTION

OUTPUT CalcArea(5, 3) + CalcArea(2, 4)
\`\`\``,
          options: [
            '23',
            '15',
            '8',
            '30'
          ],
          answer: 0,
          explanation: `한 단계씩 계산해 볼게요:

1. CalcArea(5, 3) = 5 * 3 = **15**
2. CalcArea(2, 4) = 2 * 4 = **8**
3. 15 + 8 = **23**

FUNCTION은 값을 RETURN하므로 수식에서 바로 사용할 수 있어요! 🎯`
        }
      ]
    },
    {
      id: "ch2",
      title: "문자열 & 파일 처리",
      emoji: "📁",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📁 문자열 & 파일 처리 기출 유형",
          content: `IGCSE Paper 2에서 **문자열 함수**와 **파일 처리** 문제가 자주 나와요!

자주 나오는 문자열 함수:
- 📏 **LENGTH("Hello")** → 5 (글자 수)
- ✂️ **SUBSTRING("Computer", 1, 4)** → "Comp" (부분 문자열)
- 🔠 **UCASE("hello")** → "HELLO" (대문자 변환)
- 🔡 **LCASE("HELLO")** → "hello" (소문자 변환)

파일 처리 키워드:
- 📂 **OPENFILE** "파일명" FOR READ/WRITE/APPEND
- 📖 **READFILE** "파일명", 변수
- ✍️ **WRITEFILE** "파일명", 데이터
- 🔒 **CLOSEFILE** "파일명"

특히 **SUBSTRING**의 인덱스와 **파일 모드**(READ/WRITE/APPEND) 구분이 중요해요! 💡`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "📏 LENGTH 함수",
          content: `다음 코드의 결과는?

\`\`\`
OUTPUT LENGTH("Hello World")
\`\`\``,
          options: [
            '11',
            '10',
            '12',
            '5'
          ],
          answer: 0,
          explanation: `**LENGTH("Hello World")** = **11**

"Hello World"의 글자를 세어 볼게요:
H-e-l-l-o-( )-W-o-r-l-d
1-2-3-4-5-6-7-8-9-10-11

💡 공백(space)도 한 글자로 세요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 SUBSTRING 결과 예측",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE Word : STRING
Word ← "Computer"
OUTPUT SUBSTRING(Word, 1, 4)
\`\`\`

💡 SUBSTRING(문자열, 시작위치, 길이)`,
          options: [
            'Comp',
            'Compu',
            'ompu',
            'pute'
          ],
          answer: 0,
          explanation: `**SUBSTRING("Computer", 1, 4)** = **"Comp"**

1번째 위치에서 시작해서 4글자를 추출해요:
\`C-o-m-p\`-u-t-e-r
 1-2-3-4

SUBSTRING(문자열, **시작위치**, **길이**)
- 시작위치: 1 (첫 번째 글자부터)
- 길이: 4 (4글자 추출)`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 파일 읽기 + 문자열 처리",
          content: `"Quotation.txt" 파일에서 문자열을 읽어 대문자로 출력하고, 길이도 출력하는 코드를 완성하세요.`,
          code: 'DECLARE MyString : STRING\nOPENFILE "Quotation.txt" FOR ___\nREADFILE "Quotation.txt", ___\n___ "Quotation.txt"\nOUTPUT UCASE(MyString)\nOUTPUT LENGTH(MyString)',
          fillBlanks: [
            { id: 1, answer: "READ", options: ["READ", "WRITE", "APPEND", "INPUT"] },
            { id: 2, answer: "MyString", options: ["MyString", "Quotation", "File", "Line"] },
            { id: 3, answer: "CLOSEFILE", options: ["CLOSEFILE", "ENDFILE", "CLOSE", "STOPFILE"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🧠 파일 저장의 장점",
          content: `데이터를 **변수** 대신 **파일**에 저장하는 것이 유용한 이유는?`,
          options: [
            '프로그램이 종료된 후에도 데이터가 유지되기 때문에',
            '변수보다 파일이 더 빠르기 때문에',
            '파일은 메모리를 사용하지 않기 때문에',
            '파일에 저장하면 오류가 발생하지 않기 때문에'
          ],
          answer: 0,
          explanation: `파일에 데이터를 저장하면 **프로그램이 종료된 후에도** 데이터가 남아 있어요!

변수는 프로그램이 끝나면 사라지지만, 파일은 **영구적(persistent)**이에요.

파일 저장의 장점:
- 📌 프로그램 종료 후에도 데이터 유지
- 💾 다음에 프로그램을 실행할 때 다시 읽을 수 있음
- 📤 다른 프로그램과 데이터 공유 가능

💡 시험에서 자주 나오는 키워드: **"data persists after the program ends"**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 문자열 함수 종합",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE Text : STRING
Text ← "Cambridge"
OUTPUT UCASE(SUBSTRING(Text, 4, 3))
OUTPUT LENGTH(Text)
\`\`\`

💡 SUBSTRING(문자열, 시작위치, 길이)`,
          options: [
            'BRI\n9',
            'bri\n9',
            'CAM\n9',
            'BRI\n6'
          ],
          answer: 0,
          explanation: `한 단계씩 풀어 볼게요:

1. Text = "Cambridge"
2. SUBSTRING("Cambridge", 4, 3)
   - 4번째부터 3글자: "bri"
   C-a-m-**b-r-i**-d-g-e
   1-2-3-**4-5-6**-7-8-9
3. UCASE("bri") = **"BRI"**
4. LENGTH("Cambridge") = **9**

출력: **BRI** 그리고 **9**`
        }
      ]
    },
    {
      id: "ch3",
      title: "오류 찾기 & 수정",
      emoji: "🐛",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🐛 오류가 있는 수도코드",
          content: `다음 수도코드는 **양수(positive number)**를 계속 입력받아 합계를 구하다가, **0을 입력하면 멈추는** 프로그램이에요.

하지만 **4개의 오류**가 있어요! 🔍

\`\`\`
01 Exit ← 1
02 WHILE Exit <> 0 DO
03     INPUT Number
04     IF Number < 0
05         THEN
06             Total ← Total + Number
07         ELSE
08             IF Number = 0
09                 THEN
10                     Exit ← 1
11             ENDIF
12     ENDIF
13 ENDWHILE
14 OUTPUT "The total of your numbers is ", Number
\`\`\`

프로그램의 의도:
- 양수를 입력하면 Total에 더하기
- 0을 입력하면 반복 중단
- 마지막에 합계 출력

어떤 오류들이 있을까요? 🤔`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "🐛 오류 1: 04번 줄",
          content: `04번 줄 \`IF Number < 0\`에서 오류는?

프로그램의 의도: **양수(positive)**를 입력하면 Total에 더해야 해요.`,
          options: [
            '< 를 > 로 바꿔야 한다 (양수 확인이므로)',
            '< 를 = 로 바꿔야 한다',
            '0 대신 1이어야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `**양수**를 확인하려면 \`Number > 0\`이어야 해요!

현재 \`Number < 0\`은 **음수**를 확인하고 있어요.

수정: \`IF Number > 0\`

💡 조건의 부등호 방향을 주의하세요!`
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "🐛 오류 2: 10번 줄",
          content: `10번 줄 \`Exit ← 1\`에서 오류는?

프로그램의 의도: 0을 입력하면 **반복을 중단**해야 해요.
02번 줄: \`WHILE Exit <> 0 DO\` (Exit이 0이 아닌 동안 반복)`,
          options: [
            'Exit ← 1 을 Exit ← 0 으로 바꿔야 한다',
            'Exit 대신 Number를 써야 한다',
            '1 대신 -1이어야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `WHILE 조건이 \`Exit <> 0\`이므로, 반복을 멈추려면 Exit을 **0**으로 바꿔야 해요!

현재 Exit ← 1은 Exit이 이미 1이므로 **반복이 절대 멈추지 않아요!**

수정: \`Exit ← 0\`

💡 WHILE 조건을 잘 보고 어떤 값이 반복을 멈추는지 확인하세요!`
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "🐛 오류 3: 14번 줄",
          content: `14번 줄 \`OUTPUT "The total of your numbers is ", Number\`에서 오류는?

프로그램의 의도: 마지막에 **합계**를 출력해야 해요.`,
          options: [
            'Number 대신 Total을 출력해야 한다',
            'OUTPUT 대신 PRINT를 써야 한다',
            '쉼표 대신 & 를 써야 한다',
            '오류 없음'
          ],
          answer: 0,
          explanation: `합계를 출력해야 하므로 **Total**을 출력해야 해요!

Number는 마지막으로 입력받은 값(0)이고,
**Total**이 누적 합계를 저장하고 있어요.

수정: \`OUTPUT "The total of your numbers is ", Total\`

💡 변수 이름이 비슷할 때 헷갈리지 않도록 주의하세요!`
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "🐛 오류 4: 빠진 코드",
          content: `위 코드에서 **빠진 중요한 코드**가 있어요.

Total을 사용하기 전에 해야 하는 것은?`,
          options: [
            'Total ← 0 으로 초기화해야 한다',
            'Total을 DECLARE 하지 않아도 된다',
            'Total을 PRINT 해야 한다',
            'Total에 1을 대입해야 한다'
          ],
          answer: 0,
          explanation: `**Total ← 0** 초기화가 빠져 있어요!

Total에 값을 더하기 전에 반드시 **0으로 초기화**해야 해요.
초기화하지 않으면 Total에 쓰레기 값(garbage value)이 들어있을 수 있어요.

추가해야 할 코드:
\`\`\`
DECLARE Total : INTEGER
Total ← 0
\`\`\`

💡 합계(Total)나 카운터(Count)를 사용하기 전에는 항상 **0으로 초기화**하세요!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 수정된 코드 완성",
          content: `4개의 오류를 모두 수정한 코드를 완성하세요.`,
          code: 'DECLARE Total : INTEGER\nDECLARE Number : INTEGER\nDECLARE Exit : INTEGER\nTotal ← ___\nExit ← 1\nWHILE Exit <> 0 DO\n    INPUT Number\n    IF Number ___ 0\n        THEN\n            Total ← Total + Number\n        ELSE\n            IF Number = 0\n                THEN\n                    Exit ← ___\n            ENDIF\n    ENDIF\nENDWHILE\nOUTPUT "The total of your numbers is ", ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "10", "-1"] },
            { id: 2, answer: ">", options: [">", "<", "=", ">="] },
            { id: 3, answer: "0", options: ["0", "1", "-1", "2"] },
            { id: 4, answer: "Total", options: ["Total", "Number", "Exit", "0"] }
          ]
        }
      ]
    }
  ]
}
