// ============================================
// IGCSE SQL 기출문제 2 (심화)
// COUNT, SUM, AVG, GROUP BY, LIKE
// ============================================

import { LessonData } from '../types'

export const igcseLessonSql2Data: LessonData = {
  id: "igcse-sql2",
  title: "SQL 기출문제 2",
  emoji: "🗃️",
  description: "IGCSE Paper 2 SQL 심화 연습!",
  chapters: [
    // ============================================
    // Chapter 1: 집계 함수
    // ============================================
    {
      id: "ch1",
      title: "집계 함수",
      emoji: "📊",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "Students 테이블과 집계 함수",
          content: `## 📊 집계 함수 (Aggregate Functions)

이번 레슨에서 사용할 **Students** 테이블이에요:

| StudentID | FirstName | LastName | Grade | House | Score | Attendance |
|-----------|-----------|----------|-------|-------|-------|------------|
| S001 | Alice | Brown | 10 | Red | 85 | 95 |
| S002 | Bob | Smith | 11 | Blue | 72 | 88 |
| S003 | Charlie | Davis | 10 | Red | 91 | 97 |
| S004 | Diana | Wilson | 11 | Green | 68 | 82 |
| S005 | Edward | Brown | 10 | Blue | 78 | 90 |
| S006 | Fiona | Smith | 11 | Red | 95 | 99 |
| S007 | George | Taylor | 10 | Green | 63 | 75 |
| S008 | Hannah | Davis | 11 | Blue | 88 | 93 |

**집계 함수**는 여러 행의 데이터를 하나의 값으로 요약해요:

- \`COUNT(*)\` - 행의 **개수**를 세요
- \`SUM(열이름)\` - 값의 **합계**를 구해요
- \`AVG(열이름)\` - 값의 **평균**을 구해요
- \`MAX(열이름)\` - **최대값**을 찾아요
- \`MIN(열이름)\` - **최소값**을 찾아요`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "COUNT(*) 이해하기",
          content: `Students 테이블에 대해 다음 쿼리를 실행하면 어떤 값이 반환될까요?

\`\`\`sql
SELECT COUNT(*) FROM Students
\`\`\``,
          options: [
            "8",
            "7",
            "6",
            "5"
          ],
          answer: 0,
          explanation: `\`COUNT(*)\`는 테이블의 **전체 행 수**를 세요.

Students 테이블에는 S001부터 S008까지 **8명**의 학생이 있으므로 결과는 **8**이에요.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "COUNT + WHERE 예측",
          content: `다음 SQL의 실행 결과는?

\`\`\`sql
SELECT COUNT(*)
FROM Students
WHERE Grade = 10;
\`\`\`

💡 Grade가 10인 학생: Alice, Charlie, Edward, George`,
          options: [
            "4",
            "3",
            "5",
            "2"
          ],
          answer: 0,
          explanation: `Grade = 10인 학생을 찾아볼게요:

- Alice (S001) - Grade 10 ✅
- Charlie (S003) - Grade 10 ✅
- Edward (S005) - Grade 10 ✅
- George (S007) - Grade 10 ✅

총 **4명**이에요!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "SUM() 함수의 역할",
          content: `\`SUM(Score)\`는 어떤 값을 계산할까요?`,
          options: [
            "모든 Score 값의 합계",
            "Score 값의 평균",
            "Score 값의 개수",
            "Score의 최대값"
          ],
          answer: 0,
          explanation: `\`SUM()\`은 지정된 열의 **모든 값을 더한 합계**를 반환해요.

\`SUM(Score)\` = 85 + 72 + 91 + 68 + 78 + 95 + 63 + 88 = **640**

💡 평균은 \`AVG()\`, 개수는 \`COUNT()\`, 최대값은 \`MAX()\`를 사용해요!`
        },
        {
          id: "ch1-predict2",
          type: "predict",
          title: "AVG + WHERE 예측",
          content: `다음 SQL의 실행 결과는?

\`\`\`sql
SELECT AVG(Score)
FROM Students
WHERE House = 'Red';
\`\`\`

💡 Red House 학생: Alice(85), Charlie(91), Fiona(95)`,
          options: [
            "90.33",
            "85",
            "91",
            "95"
          ],
          answer: 0,
          explanation: `Red House 학생들의 Score를 평균내요:

- Alice: 85
- Charlie: 91
- Fiona: 95

AVG = (85 + 91 + 95) / 3 = 271 / 3 = **90.33...**

💡 \`AVG()\`는 합계를 개수로 나눈 **평균값**을 반환해요!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "Blue House 합계 구하기",
          content: `Blue House 학생들의 총 점수를 구하는 SQL을 완성하세요.

💡 Blue House: Bob(72), Edward(78), Hannah(88) → 합계 = 238`,
          code: "SELECT ___(Score)\nFROM Students\nWHERE ___ = 'Blue';",
          fillBlanks: [
            { id: 1, answer: "SUM", options: ["SUM", "COUNT", "AVG", "MAX"] },
            { id: 2, answer: "House", options: ["House", "Grade", "LastName", "StudentID"] }
          ]
        }
      ]
    },
    // ============================================
    // Chapter 2: GROUP BY & LIKE
    // ============================================
    {
      id: "ch2",
      title: "GROUP BY & LIKE",
      emoji: "🔤",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "GROUP BY와 LIKE 패턴 매칭",
          content: `## 🔤 GROUP BY

\`GROUP BY\`는 **같은 값을 가진 행들을 그룹으로 묶어요**.
집계 함수(COUNT, SUM, AVG 등)와 함께 사용해요!

\`\`\`sql
SELECT House, COUNT(*)
FROM Students
GROUP BY House;
\`\`\`
→ 각 House별 학생 수를 구해요.

## 🔍 LIKE 와일드카드

\`LIKE\`는 **패턴 매칭**으로 문자열을 검색해요:

- \`%\` - **아무 문자 0개 이상** (어떤 문자든, 몇 글자든)
- \`_\` - **아무 문자 정확히 1개**

| 패턴 | 의미 | 예시 |
|------|------|------|
| \`'S%'\` | S로 시작하는 | Smith, Scott |
| \`'%n'\` | n으로 끝나는 | Wilson, Brown |
| \`'%av%'\` | av를 포함하는 | Davis, Dave |
| \`'_o%'\` | 두 번째 글자가 o인 | Bob, Johnson |`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "LIKE 패턴 이해",
          content: `\`LIKE 'S%'\`는 어떤 문자열과 매칭될까요?`,
          options: [
            "S로 시작하는 문자열",
            "S로 끝나는 문자열",
            "S를 포함하는 문자열",
            "정확히 문자 S 하나"
          ],
          answer: 0,
          explanation: `\`'S%'\`에서:
- **S** = 반드시 S로 시작
- **%** = 그 뒤에 아무 문자가 와도 OK (0개 이상)

예시: **S**mith ✅, **S**cott ✅, Brown ❌

💡 \`%\`는 "아무거나 와도 돼!" 라는 뜻이에요.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "GROUP BY 결과 예측",
          content: `다음 SQL의 실행 결과는?

\`\`\`sql
SELECT House, COUNT(*)
FROM Students
GROUP BY House;
\`\`\`

💡 Students 테이블의 House 값을 확인해보세요!`,
          options: [
            "Blue  3\nGreen 2\nRed   3",
            "Blue  2\nGreen 2\nRed   4",
            "Blue  3\nGreen 3\nRed   2",
            "Blue  2\nGreen 3\nRed   3"
          ],
          answer: 0,
          explanation: `각 House별로 학생을 세볼게요:

**Blue**: Bob, Edward, Hannah = **3명**
**Green**: Diana, George = **2명**
**Red**: Alice, Charlie, Fiona = **3명**

\`GROUP BY House\`는 House 값이 같은 행끼리 묶어서 각 그룹의 COUNT를 구해요!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "LIKE로 이름 검색",
          content: `성(LastName)이 'B'로 시작하는 학생을 검색하는 SQL을 완성하세요.

💡 결과: Alice Brown, Edward Brown`,
          code: "SELECT FirstName, LastName\nFROM Students\nWHERE LastName ___ '___';",
          fillBlanks: [
            { id: 1, answer: "LIKE", options: ["LIKE", "=", "IS", "CONTAINS"] },
            { id: 2, answer: "B%", options: ["B%", "%B", "B*", "*B*"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "GROUP BY + AVG 이해",
          content: `다음 SQL은 어떤 결과를 반환할까요?

\`\`\`sql
SELECT Grade, AVG(Score)
FROM Students
GROUP BY Grade;
\`\`\``,
          options: [
            "각 학년(Grade)별 평균 점수",
            "학년별로 그룹화된 모든 학생",
            "각 학년별 총 점수",
            "각 학년별 학생 수"
          ],
          answer: 0,
          explanation: `이 쿼리는 두 가지를 해요:

1. \`GROUP BY Grade\` → Grade별로 행을 그룹화
2. \`AVG(Score)\` → 각 그룹의 평균 Score 계산

결과:
- Grade 10: (85+91+78+63)/4 = **79.25**
- Grade 11: (72+68+95+88)/4 = **80.75**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "LIKE '%s' 결과 예측",
          content: `다음 SQL의 실행 결과는?

\`\`\`sql
SELECT LastName
FROM Students
WHERE LastName LIKE '%s';
\`\`\`

💡 '%s' = s로 **끝나는** 문자열`,
          options: [
            "Davis\nDavis",
            "Smith\nSmith",
            "Davis\nSmith",
            "Davis"
          ],
          answer: 0,
          explanation: `\`'%s'\`는 **s로 끝나는** 문자열을 찾아요:

- Brown → n으로 끝남 ❌
- Smith → h로 끝남 ❌
- Davi**s** → s로 끝남 ✅ (Charlie)
- Wilson → n으로 끝남 ❌
- Taylor → r로 끝남 ❌
- Davi**s** → s로 끝남 ✅ (Hannah)

Davis가 **2번** 나와요! (Charlie Davis와 Hannah Davis)`
        }
      ]
    },
    // ============================================
    // Chapter 3: 종합 SQL
    // ============================================
    {
      id: "ch3",
      title: "종합 SQL",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "시험 대비 종합 SQL 팁",
          content: `## 🏆 복합 SQL 문제 공략법

시험에서 SQL 문제를 풀 때 이 순서로 생각하세요:

### 1단계: 무엇을 보여줄까? → SELECT
- 어떤 열을 출력해야 하는지 확인
- 집계 함수(COUNT, SUM, AVG, MAX, MIN)가 필요한지 확인

### 2단계: 어디서? → FROM
- 어떤 테이블에서 데이터를 가져오는지 확인

### 3단계: 조건은? → WHERE
- 특정 행만 필터링해야 하는지 확인
- LIKE, 비교 연산자(>, <, =) 사용

### 4단계: 그룹화? → GROUP BY
- 집계 함수를 특정 열 기준으로 나눠야 하면 사용

### 5단계: 정렬? → ORDER BY
- ASC (오름차순) 또는 DESC (내림차순)

\`\`\`sql
SELECT 열이름
FROM 테이블
WHERE 조건
GROUP BY 열이름
ORDER BY 열이름 ASC/DESC;
\`\`\``
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "조건 + 집계 함수",
          content: `Grade 10 학생 중 Score가 75보다 큰 학생의 수를 구하는 SQL을 완성하세요.

💡 해당 학생: Alice(85), Charlie(91), Edward(78) → 3명`,
          code: "SELECT ___(___)\nFROM Students\nWHERE Grade = 10 AND Score ___ 75;",
          fillBlanks: [
            { id: 1, answer: "COUNT", options: ["COUNT", "SUM", "AVG", "MAX"] },
            { id: 2, answer: "*", options: ["*", "StudentID", "Score", "FirstName"] },
            { id: 3, answer: ">", options: [">", "<", ">=", "="] }
          ]
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "ORDER BY DESC 예측",
          content: `다음 SQL의 실행 결과는?

\`\`\`sql
SELECT FirstName, Score
FROM Students
WHERE Grade = 11
ORDER BY Score DESC;
\`\`\`

💡 Grade 11: Bob(72), Diana(68), Fiona(95), Hannah(88)
💡 DESC = 내림차순 (큰 값부터)`,
          options: [
            "Fiona   95\nHannah  88\nBob     72\nDiana   68",
            "Diana   68\nBob     72\nHannah  88\nFiona   95",
            "Bob     72\nDiana   68\nFiona   95\nHannah  88",
            "Fiona   95\nHannah  88\nDiana   68\nBob     72"
          ],
          answer: 0,
          explanation: `단계별로 풀어볼게요:

1. \`WHERE Grade = 11\` → Bob(72), Diana(68), Fiona(95), Hannah(88)
2. \`ORDER BY Score DESC\` → 점수 높은 순서로 정렬

결과:
- Fiona: **95** (1등)
- Hannah: **88** (2등)
- Bob: **72** (3등)
- Diana: **68** (4등)

💡 \`DESC\`는 **내림차순**(Descending)이에요!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "최대값 구하기",
          content: `테이블에서 **가장 높은 Score**를 구하는 올바른 SQL은?`,
          options: [
            "SELECT MAX(Score) FROM Students",
            "SELECT TOP(Score) FROM Students",
            "SELECT HIGHEST(Score) FROM Students",
            "SELECT Score FROM Students ORDER BY Score"
          ],
          answer: 0,
          explanation: `\`MAX()\`는 지정된 열에서 **가장 큰 값**을 반환하는 집계 함수예요.

\`SELECT MAX(Score) FROM Students\` → **95** (Fiona의 점수)

💡 \`TOP\`이나 \`HIGHEST\`는 SQL 표준 함수가 아니에요!
💡 마지막 보기는 정렬만 하고 최대값 하나만 반환하지 않아요.`
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "학년별 평균 출석률",
          content: `각 학년(Grade)별 평균 출석률(Attendance)을 구하는 SQL을 완성하세요.`,
          code: "SELECT Grade, ___(Attendance)\nFROM ___\nGROUP BY ___;",
          fillBlanks: [
            { id: 1, answer: "AVG", options: ["AVG", "SUM", "COUNT", "TOTAL"] },
            { id: 2, answer: "Students", options: ["Students", "Student", "School", "Grades"] },
            { id: 3, answer: "Grade", options: ["Grade", "House", "StudentID", "Attendance"] }
          ]
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "GROUP BY를 쓰는 이유",
          content: `COUNT나 AVG 같은 집계 함수와 함께 \`GROUP BY\`를 사용하는 이유는?`,
          options: [
            "결과를 어떤 열 기준으로 그룹화하기 위해",
            "결과를 정렬하기 위해",
            "결과를 필터링하기 위해",
            "두 테이블을 합치기 위해"
          ],
          answer: 0,
          explanation: `\`GROUP BY\`는 **같은 값을 가진 행들을 그룹으로 묶어요**.

예시:
\`\`\`sql
SELECT House, AVG(Score)
FROM Students
GROUP BY House;
\`\`\`
→ House가 같은 학생들끼리 묶어서 각 그룹의 평균을 구해요.

💡 정렬은 \`ORDER BY\`, 필터링은 \`WHERE\`, 테이블 합치기는 \`JOIN\`이에요!`
        }
      ]
    }
  ]
}
