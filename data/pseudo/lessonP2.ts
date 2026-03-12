// ============================================
// 수도코드 종합 프로젝트: Part 2 복습
// CASE, FUNCTION/PROCEDURE, 문자열 처리, 파일 처리, 2D 배열
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP2Data: LessonData = {
  id: "pseudo-p2",
  title: "Part 2 종합 프로젝트",
  emoji: "🏆",
  description: "Part 2 복습 프로젝트!",
  chapters: [
    {
      id: "ch1",
      title: "학생 성적 관리 시스템",
      emoji: "🎓",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎓 프로젝트: 학생 성적 관리 시스템",
          content: `이 프로젝트에서는 Part 2에서 배운 모든 개념을 **종합**해요!

**학생 성적 관리 시스템**의 기능:
- 3명의 학생, 4과목의 점수를 **2D 배열**에 저장
- 학생별 평균을 구하고 **등급 판정** (CASE문)
- 결과를 **파일에 저장** (파일 처리)
- **FUNCTION**으로 등급을 계산
- **문자열 처리**로 보고서 작성

사용하는 개념들:
- 📊 2D 배열 - 성적 데이터 저장
- 🔀 CASE문 - 등급 판정
- 📁 파일 처리 - 결과 저장
- 🔧 FUNCTION/PROCEDURE - 코드 모듈화
- 🔤 문자열 함수 - 이름/보고서 처리

하나씩 만들어 볼까요?`
        },
        {
          id: "ch1-data",
          type: "explain",
          title: "📊 데이터 구조 설계",
          content: `먼저 데이터를 어떻게 저장할지 설계해요:

\`\`\`
// 학생 이름 배열
DECLARE names : ARRAY[1:3] OF STRING
names[1] ← "Kim Minjun"
names[2] ← "Lee Soyeon"
names[3] ← "Park Jihoon"

// 성적 2D 배열 (3명 x 4과목)
DECLARE scores : ARRAY[1:3, 1:4] OF INTEGER
scores[1, 1] ← 85   // 학생1, 과목1
scores[1, 2] ← 92   // 학생1, 과목2
scores[1, 3] ← 78   // 학생1, 과목3
scores[1, 4] ← 90   // 학생1, 과목4
scores[2, 1] ← 70
scores[2, 2] ← 65
scores[2, 3] ← 80
scores[2, 4] ← 75
scores[3, 1] ← 95
scores[3, 2] ← 98
scores[3, 3] ← 92
scores[3, 4] ← 96
\`\`\`

| | 국어 | 영어 | 수학 | 과학 |
|---|---|---|---|---|
| Kim Minjun | 85 | 92 | 78 | 90 |
| Lee Soyeon | 70 | 65 | 80 | 75 |
| Park Jihoon | 95 | 98 | 92 | 96 |`
        },
        {
          id: "ch1-function",
          type: "explain",
          title: "🔧 등급 계산 FUNCTION",
          content: `평균 점수를 받아서 **등급**을 돌려주는 FUNCTION을 만들어요:

\`\`\`
FUNCTION GetGrade(average : REAL) RETURNS STRING
    DECLARE grade : STRING
    CASE OF average
        >= 90 : grade ← "A"
        >= 80 : grade ← "B"
        >= 70 : grade ← "C"
        >= 60 : grade ← "D"
        OTHERWISE grade ← "F"
    ENDCASE
    RETURN grade
ENDFUNCTION
\`\`\`

이 함수에는 **CASE문**과 **FUNCTION**이 함께 쓰였어요!

사용 예시:
\`\`\`
OUTPUT GetGrade(85.5)   // "B"
OUTPUT GetGrade(92.0)   // "A"
OUTPUT GetGrade(55.0)   // "F"
\`\`\``
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '평균이 75.5일 때 GetGrade 함수가 돌려주는 등급은?',
          options: [
            'C',
            'B',
            'D',
            'F'
          ],
          answer: 0,
          explanation: '75.5는 70 이상이므로 CASE문에서 >= 70 조건에 해당해요. 따라서 등급은 **"C"**예요!'
        },
        {
          id: "ch1-process",
          type: "explain",
          title: "🔄 성적 처리 + 파일 저장",
          content: `이제 전체 시스템을 만들어 볼까요?

\`\`\`
// 결과 파일 열기
OPENFILE "report.txt" FOR WRITE

FOR student ← 1 TO 3
    // 평균 계산
    DECLARE total : INTEGER
    total ← 0
    FOR subject ← 1 TO 4
        total ← total + scores[student, subject]
    NEXT subject

    DECLARE avg : REAL
    avg ← total / 4

    // 등급 판정
    DECLARE grade : STRING
    grade ← GetGrade(avg)

    // 이름을 대문자로 변환
    DECLARE upperName : STRING
    upperName ← UCASE(names[student])

    // 보고서 출력
    DECLARE report : STRING
    report ← upperName & " - 평균: " & avg & " 등급: " & grade
    OUTPUT report

    // 파일에 저장
    WRITEFILE "report.txt", report
NEXT student

CLOSEFILE "report.txt"
OUTPUT "보고서가 저장되었습니다!"
\`\`\`

이 코드에는 **2D 배열**, **반복문**, **FUNCTION**, **문자열 연결(&)**, **UCASE()**, **파일 처리**가 모두 들어 있어요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `학생 3(Park Jihoon)의 점수가 95, 98, 92, 96일 때, 다음 코드의 결과는?

\`\`\`
total ← 0
FOR subject ← 1 TO 4
    total ← total + scores[3, subject]
NEXT subject
avg ← total / 4
grade ← GetGrade(avg)
OUTPUT UCASE("Park Jihoon") & " : " & grade
\`\`\``,
          options: [
            'PARK JIHOON : A',
            'Park Jihoon : A',
            'PARK JIHOON : B',
            'park jihoon : A'
          ],
          answer: 0,
          explanation: '총합 = 95+98+92+96 = 381, 평균 = 381/4 = 95.25, 등급 = A (90 이상). UCASE("Park Jihoon") = "PARK JIHOON". 결과: **PARK JIHOON : A**!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '학생의 이름에서 성(첫 3글자)만 추출하고 대문자로 바꾸는 코드를 완성하세요. (이름: "Kim Minjun")',
          code: 'DECLARE name : STRING\nname ← "Kim Minjun"\nDECLARE lastName : STRING\nlastName ← SUBSTRING(name, 1, 3)\nOUTPUT ___(lastName)',
          fillBlanks: [
            { id: 1, answer: "UCASE", options: ["UCASE", "LCASE", "LENGTH", "SUBSTRING"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "종합 퀴즈",
      emoji: "📝",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📝 Part 2 종합 복습!",
          content: `Part 2에서 배운 모든 내용을 복습해 봐요!

배운 내용 정리:
- 🔀 **CASE문** - 여러 조건을 깔끔하게 처리
- 🔧 **PROCEDURE** - 명령을 묶어서 재사용
- 🔧 **FUNCTION** - 값을 계산해서 돌려주기
- 🔤 **문자열 함수** - LENGTH, UCASE, LCASE, SUBSTRING
- 🔗 **문자열 연결** - & 기호
- 📁 **파일 처리** - OPENFILE, READFILE, WRITEFILE, CLOSEFILE
- 📊 **2D 배열** - 행과 열로 이루어진 표

자, 얼마나 잘 이해했는지 확인해 볼까요?`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 CASE문 복습!",
          content: '다음 CASE문에서 grade가 "B"일 때 출력되는 메시지는?\n\n```\nCASE OF grade\n    "A" : OUTPUT "우수"\n    "B" : OUTPUT "양호"\n    "C" : OUTPUT "보통"\n    OTHERWISE OUTPUT "노력 필요"\nENDCASE\n```',
          options: [
            '양호',
            '우수',
            '보통',
            '노력 필요'
          ],
          answer: 0,
          explanation: 'grade가 "B"이므로 CASE문에서 **"B" : OUTPUT "양호"**가 실행돼요!'
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 FUNCTION vs PROCEDURE!",
          content: 'FUNCTION과 PROCEDURE의 가장 큰 차이점은?',
          options: [
            'FUNCTION은 값을 RETURN하고, PROCEDURE는 RETURN하지 않는다',
            'FUNCTION은 매개변수를 받을 수 없다',
            'PROCEDURE가 FUNCTION보다 빠르다',
            'PROCEDURE는 반복문 안에서 쓸 수 없다'
          ],
          answer: 0,
          explanation: '**FUNCTION**은 RETURNS 키워드로 반환 자료형을 지정하고 RETURN으로 값을 돌려줘요. **PROCEDURE**는 작업만 수행하고 값을 돌려주지 않아요!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 문자열 함수 종합!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE text : STRING
text ← "Hello World"
DECLARE result : STRING
result ← UCASE(SUBSTRING(text, 7, 5))
OUTPUT result
OUTPUT LENGTH(result)
\`\`\``,
          options: [
            'WORLD\n5',
            'World\n5',
            'HELLO\n5',
            'world\n5'
          ],
          answer: 0,
          explanation: 'SUBSTRING("Hello World", 7, 5)는 7번째부터 5글자 → "World". UCASE("World") → "WORLD". LENGTH("WORLD") → 5!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 파일 처리 복습!",
          content: '점수를 파일에서 읽어서 출력하는 코드를 완성하세요.',
          code: 'DECLARE line : STRING\n___ "scores.txt" FOR READ\nWHILE NOT ___("scores.txt")\n    READFILE "scores.txt", line\n    OUTPUT line\nENDWHILE\nCLOSEFILE "scores.txt"',
          fillBlanks: [
            { id: 1, answer: "OPENFILE", options: ["OPENFILE", "READFILE", "WRITEFILE", "LOADFILE"] },
            { id: 2, answer: "EOF", options: ["EOF", "END", "DONE", "EMPTY"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 2D 배열 종합!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE grid : ARRAY[1:2, 1:3] OF INTEGER
grid[1, 1] ← 10
grid[1, 2] ← 20
grid[1, 3] ← 30
grid[2, 1] ← 40
grid[2, 2] ← 50
grid[2, 3] ← 60

DECLARE rowSum : INTEGER

FOR row ← 1 TO 2
    rowSum ← 0
    FOR col ← 1 TO 3
        rowSum ← rowSum + grid[row, col]
    NEXT col
    OUTPUT "행 " & row & " 합계: " & rowSum
NEXT row
\`\`\``,
          options: [
            '행 1 합계: 60\n행 2 합계: 150',
            '행 1 합계: 150\n행 2 합계: 60',
            '행 1 합계: 60\n행 2 합계: 60',
            '행 1 합계: 210\n행 2 합계: 210'
          ],
          answer: 0,
          explanation: '행1: 10+20+30 = **60**, 행2: 40+50+60 = **150**. 각 행의 합계를 중첩 FOR 반복문으로 계산해요!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 종합 실력 테스트!",
          content: '등급을 RETURN하는 FUNCTION의 빈칸을 완성하세요.',
          code: '___ CalcGrade(score : INTEGER) RETURNS STRING\n    IF score >= 90 THEN\n        ___ "A"\n    ELSE\n        RETURN "B"\n    ENDIF\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "FUNCTION", options: ["FUNCTION", "PROCEDURE", "DECLARE", "DEFINE"] },
            { id: 2, answer: "RETURN", options: ["RETURN", "OUTPUT", "GIVE", "SEND"] }
          ]
        }
      ]
    }
  ]
}
