// ============================================
// 수도코드 레슨 12: 문자열 처리
// CIE 스타일 수도코드 - LENGTH, UCASE, LCASE, SUBSTRING, 문자열 연결
// ============================================

import { LessonData } from '../types'

export const pseudoLesson12Data: LessonData = {
  id: "pseudo-12",
  title: "문자열 처리",
  emoji: "🔤",
  description: "문자열을 다루는 함수들!",
  chapters: [
    {
      id: "ch1",
      title: "LENGTH, UCASE, LCASE",
      emoji: "📏",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📏 문자열 함수란?",
          content: `프로그래밍에서 문자열(String)을 다루는 일은 매우 많아요!

예를 들어:
- 사용자 이름의 **길이**를 확인하고 싶을 때
- 이메일 주소를 **소문자**로 바꾸고 싶을 때
- 이름의 **일부분**만 꺼내고 싶을 때

CIE 수도코드에는 이런 작업을 위한 **내장 함수**들이 있어요!

오늘 배울 함수들:
- \`LENGTH()\` - 문자열 길이
- \`UCASE()\` - 대문자 변환
- \`LCASE()\` - 소문자 변환
- \`SUBSTRING()\` - 부분 문자열 추출`
        },
        {
          id: "ch1-length",
          type: "explain",
          title: "📐 LENGTH() - 문자열 길이",
          content: `**LENGTH()** 함수는 문자열의 **글자 수**를 알려줘요.

\`\`\`
LENGTH("Hello")     → 5
LENGTH("Hi")        → 2
LENGTH("")          → 0
LENGTH("A B C")     → 5
\`\`\`

공백(스페이스)도 **한 글자**로 세요!

변수와 함께 사용할 수도 있어요:

\`\`\`
DECLARE name : STRING
name ← "Alice"
OUTPUT LENGTH(name)
\`\`\`

결과: **5**`
        },
        {
          id: "ch1-ucase-lcase",
          type: "explain",
          title: "🔠 UCASE()와 LCASE()",
          content: `**UCASE()** - 모든 글자를 **대문자(Uppercase)**로 바꿔요.
**LCASE()** - 모든 글자를 **소문자(Lowercase)**로 바꿔요.

\`\`\`
UCASE("hello")      → "HELLO"
UCASE("Hello World") → "HELLO WORLD"
LCASE("HELLO")      → "hello"
LCASE("Hello World") → "hello world"
\`\`\`

실제 활용 예시:

\`\`\`
DECLARE answer : STRING
INPUT answer
IF UCASE(answer) = "YES" THEN
    OUTPUT "확인되었습니다!"
ENDIF
\`\`\`

사용자가 "yes", "Yes", "YES" 중 뭘 입력하든 모두 인식할 수 있어요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE word : STRING
word ← "Python"
OUTPUT UCASE(word)
OUTPUT LCASE(word)
OUTPUT LENGTH(word)
\`\`\``,
          options: [
            'PYTHON\npython\n6',
            'Python\npython\n6',
            'PYTHON\nPYTHON\n6',
            'python\nPYTHON\n6'
          ],
          answer: 0,
          explanation: 'UCASE("Python")은 "PYTHON", LCASE("Python")은 "python", LENGTH("Python")은 6이에요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '사용자 입력을 대문자로 바꿔서 비교하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE reply : STRING\nINPUT reply\nIF ___(reply) = "YES" THEN\n    OUTPUT "확인!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "UCASE", options: ["UCASE", "LCASE", "LENGTH", "SUBSTRING"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "SUBSTRING과 문자열 연결",
      emoji: "✂️",
      steps: [
        {
          id: "ch2-substring",
          type: "explain",
          title: "✂️ SUBSTRING() - 문자열 자르기",
          content: `**SUBSTRING()** 함수는 문자열의 **일부분**을 꺼내요.

문법:
\`\`\`
SUBSTRING(문자열, 시작위치, 길이)
\`\`\`

**중요: CIE 수도코드에서 위치는 1부터 시작해요!**

예시:
\`\`\`
SUBSTRING("Hello", 1, 3)   → "Hel"
SUBSTRING("Hello", 2, 3)   → "ell"
SUBSTRING("Hello", 4, 2)   → "lo"
\`\`\`

"Hello"의 각 글자 위치:
| 위치 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 글자 | H | e | l | l | o |

\`SUBSTRING("Hello", 2, 3)\`은 **2번째 위치부터 3글자** → "ell"`
        },
        {
          id: "ch2-concat",
          type: "explain",
          title: "🔗 문자열 연결 (&)",
          content: `CIE 수도코드에서 문자열을 **이어붙이려면** \`&\` 기호를 써요.

\`\`\`
"Hello" & " " & "World"  → "Hello World"
\`\`\`

변수와 함께 사용하기:

\`\`\`
DECLARE first : STRING
DECLARE last : STRING
DECLARE full : STRING

first ← "Kim"
last ← "Minjun"
full ← first & " " & last
OUTPUT full
\`\`\`

결과: **Kim Minjun**

숫자를 문자열과 연결할 때도 유용해요:

\`\`\`
DECLARE score : INTEGER
score ← 95
OUTPUT "점수: " & score & "점"
\`\`\`

결과: **점수: 95점**`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE email : STRING
email ← "student@school.com"
DECLARE username : STRING
username ← SUBSTRING(email, 1, 7)
OUTPUT UCASE(username)
\`\`\``,
          options: [
            'STUDENT',
            'student',
            'STUDENT@',
            'Student'
          ],
          answer: 0,
          explanation: 'SUBSTRING("student@school.com", 1, 7)은 1번째부터 7글자 → "student"이고, UCASE("student")은 "STUDENT"예요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '"Programming"에서 "gram"을 추출하는 코드를 완성하세요. (P=1, r=2, o=3, g=4, r=5, a=6, m=7, m=8, i=9, n=10, g=11)',
          codeTemplate: 'DECLARE word : STRING\nword ← "Programming"\nOUTPUT SUBSTRING(word, ___, 4)',
          fillBlanks: [
            { id: 1, answer: "4", options: ["4", "3", "5", "6"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 종합 예측!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE text : STRING
text ← "Hello World"
DECLARE part1 : STRING
DECLARE part2 : STRING
part1 ← SUBSTRING(text, 1, 5)
part2 ← SUBSTRING(text, 7, 5)
OUTPUT part1 & " + " & part2
OUTPUT LENGTH(text)
\`\`\``,
          options: [
            'Hello + World\n11',
            'Hello + World\n10',
            'Hello +World\n11',
            'Hello+World\n11'
          ],
          answer: 0,
          explanation: 'SUBSTRING(text, 1, 5)는 "Hello", SUBSTRING(text, 7, 5)는 "World"(7번째 위치가 W). 연결하면 "Hello + World". LENGTH("Hello World")는 공백 포함 **11**이에요!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 문자열 연결!",
          content: '이름과 성을 합쳐서 전체 이름을 만드는 코드를 완성하세요.',
          codeTemplate: 'DECLARE firstName : STRING\nDECLARE lastName : STRING\nfirstName ← "Minjun"\nlastName ← "Kim"\nOUTPUT lastName ___ " " ___ firstName',
          fillBlanks: [
            { id: 1, answer: "&", options: ["&", "+", ",", "."] },
            { id: 2, answer: "&", options: ["&", "+", ",", "."] }
          ]
        }
      ]
    }
  ]
}
