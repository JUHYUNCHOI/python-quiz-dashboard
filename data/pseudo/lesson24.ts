// ============================================
// 수도코드 레슨 24: SQL 기초 (SQL Basics)
// CIE 스타일 수도코드 - 데이터베이스 조회
// ============================================

import { LessonData } from '../types'

export const pseudoLesson24Data: LessonData = {
  id: "pseudo-24",
  title: "SQL 기초",
  emoji: "🗃️",
  description: "데이터베이스를 조회해요!",
  chapters: [
    {
      id: "ch1",
      title: "데이터베이스 기초",
      emoji: "📁",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📁 데이터베이스 테이블이란?",
          content: `**데이터베이스(Database)**는 데이터를 체계적으로 저장하는 곳이에요.

데이터베이스 안에는 **테이블(Table)**이 있어요. 테이블은 **표**와 비슷해요!

\`\`\`
Student 테이블:

| StudentID | Name   | Age | Year | Grade |
|-----------|--------|-----|------|-------|
| 1001      | 김코딩 | 15  | 10   | A     |
| 1002      | 이수도 | 16  | 11   | B     |
| 1003      | 박알고 | 15  | 10   | A     |
| 1004      | 최데이 | 17  | 12   | C     |
\`\`\`

테이블의 구조:
- **행(Row)** = 하나의 **레코드(Record)** (학생 한 명의 정보)
- **열(Column)** = 하나의 **필드(Field)** (이름, 나이 등 항목)

위 테이블에는 **4개의 레코드**와 **5개의 필드**가 있어요!`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 데이터베이스의 자료형",
          content: `데이터베이스의 각 필드에는 **자료형(Data Type)**이 지정돼요.

CIE 시험에서 알아야 할 자료형:

| 자료형 | 설명 | 예시 |
|--------|------|------|
| TEXT | 문자열 (글자) | "김코딩", "서울" |
| INTEGER | 정수 (소수점 없는 숫자) | 15, 1001, -3 |
| REAL | 실수 (소수점 있는 숫자) | 3.14, 99.9 |
| BOOLEAN | 참/거짓 | TRUE, FALSE |
| DATE | 날짜 | 2024-03-15 |

**Student 테이블의 자료형:**
\`\`\`
StudentID : INTEGER
Name      : TEXT
Age       : INTEGER
Year      : INTEGER
Grade     : TEXT
\`\`\`

시험에서는 각 필드에 **적절한 자료형을 선택**하는 문제가 자주 나와요!`
        },
        {
          id: "ch1-pk",
          type: "explain",
          title: "🔑 기본 키 (Primary Key)",
          content: `**기본 키(Primary Key)**는 각 레코드를 **유일하게 구분**하는 필드예요.

Student 테이블에서 기본 키는 뭘까요?

\`\`\`
| StudentID | Name   | Age | Year |
|-----------|--------|-----|------|
| 1001      | 김코딩 | 15  | 10   |
| 1002      | 이수도 | 16  | 11   |
| 1003      | 김코딩 | 14  | 9    |
\`\`\`

- **Name**은 기본 키가 될 수 없어요 → "김코딩"이 **두 명** 있으니까!
- **Age**도 기본 키가 될 수 없어요 → 같은 나이인 학생이 있을 수 있으니까!
- **StudentID**가 기본 키예요! → 모든 학생마다 **고유한 번호**니까!

기본 키의 조건:
- 모든 레코드에서 **값이 다 달라야** 해요 (고유함)
- **비어 있으면(NULL) 안 돼요**
- 값이 **바뀌지 않아야** 해요`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: `다음 Library 테이블에서 기본 키로 가장 적절한 필드는?

\`\`\`
| BookID | Title           | Author     | Year |
|--------|-----------------|------------|------|
| B001   | Harry Potter    | Rowling    | 1997 |
| B002   | The Hobbit      | Tolkien    | 1937 |
| B003   | Harry Potter 2  | Rowling    | 1998 |
\`\`\``,
          options: [
            'BookID - 각 책마다 고유한 코드',
            'Title - 책 제목은 모두 다름',
            'Author - 저자가 누군지 알 수 있음',
            'Year - 출판 연도가 모두 다름'
          ],
          answer: 0,
          explanation: '**BookID**가 기본 키로 가장 적절해요! 같은 저자(Author)가 여러 책을 쓸 수 있고, 같은 해(Year)에 여러 책이 나올 수 있어요. Title도 동명의 책이 있을 수 있죠. BookID는 각 책에 **고유하게** 부여된 코드예요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '각 필드에 알맞은 자료형을 선택하세요. 학생의 키(Height)를 소수점으로 저장하려면?',
          codeTemplate: 'StudentID : INTEGER\nName : TEXT\nHeight : ___\nEnrolled : BOOLEAN',
          fillBlanks: [
            { id: 1, answer: "REAL", options: ["REAL", "INTEGER", "TEXT", "BOOLEAN"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "SELECT 문",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-basic",
          type: "explain",
          title: "🔍 SELECT 기본 문법",
          content: `**SQL(Structured Query Language)**은 데이터베이스에서 데이터를 **조회(검색)**하는 언어예요.

가장 기본적인 SQL 문법:

\`\`\`
SELECT field1, field2
FROM tableName
\`\`\`

- \`SELECT\` : 어떤 필드를 가져올지 지정
- \`FROM\` : 어떤 테이블에서 가져올지 지정

예시:
\`\`\`
SELECT Name, Age
FROM Student
\`\`\`

이 쿼리의 결과:
\`\`\`
| Name   | Age |
|--------|-----|
| 김코딩 | 15  |
| 이수도 | 16  |
| 박알고 | 15  |
| 최데이 | 17  |
\`\`\`

**SELECT**와 **FROM**은 항상 대문자로 써요! (CIE 규칙)`
        },
        {
          id: "ch2-star",
          type: "explain",
          title: "⭐ SELECT * 와 특정 필드",
          content: `**모든 필드**를 가져오고 싶으면 \`*\` (별표)를 써요!

\`\`\`
SELECT *
FROM Student
\`\`\`

결과: 모든 필드(StudentID, Name, Age, Year, Grade)가 전부 나와요.

**특정 필드만** 가져오고 싶으면 필드 이름을 나열해요:

\`\`\`
SELECT Name
FROM Student
\`\`\`

결과:
\`\`\`
| Name   |
|--------|
| 김코딩 |
| 이수도 |
| 박알고 |
| 최데이 |
\`\`\`

여러 필드를 가져오려면 **쉼표(,)**로 구분해요:

\`\`\`
SELECT Name, Grade
FROM Student
\`\`\`

시험 팁: 문제에서 "모든 정보를 조회하라"고 하면 \`SELECT *\`, 특정 항목만 요구하면 필드 이름을 써요!`
        },
        {
          id: "ch2-where",
          type: "explain",
          title: "🎯 WHERE로 조건 걸기",
          content: `특정 조건에 맞는 레코드만 가져오려면 **WHERE**를 써요!

\`\`\`
SELECT Name, Grade
FROM Student
WHERE Age > 15
\`\`\`

Student 테이블:
\`\`\`
| StudentID | Name   | Age | Year | Grade |
|-----------|--------|-----|------|-------|
| 1001      | 김코딩 | 15  | 10   | A     |
| 1002      | 이수도 | 16  | 11   | B     |
| 1003      | 박알고 | 15  | 10   | A     |
| 1004      | 최데이 | 17  | 12   | C     |
\`\`\`

결과 (Age > 15인 학생만):
\`\`\`
| Name   | Grade |
|--------|-------|
| 이수도 | B     |
| 최데이 | C     |
\`\`\`

김코딩(15)과 박알고(15)는 Age가 15로, 15보다 크지 않으므로 제외돼요!

SQL 문장의 순서: **SELECT → FROM → WHERE**`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 테이블과 쿼리가 주어졌을 때, 출력되는 행(row)의 개수는?

\`\`\`
Student 테이블:
| StudentID | Name   | Age | Year | Grade |
|-----------|--------|-----|------|-------|
| 1001      | 김코딩 | 15  | 10   | A     |
| 1002      | 이수도 | 16  | 11   | B     |
| 1003      | 박알고 | 15  | 10   | A     |
| 1004      | 최데이 | 17  | 12   | C     |

SELECT Name
FROM Student
WHERE Year = 10
\`\`\``,
          options: [
            '2행 (김코딩, 박알고)',
            '1행 (김코딩)',
            '3행 (김코딩, 박알고, 최데이)',
            '4행 (모든 학생)'
          ],
          answer: 0,
          explanation: 'Year = 10인 학생은 김코딩(Year=10)과 박알고(Year=10) **2명**이에요. 이수도(Year=11)와 최데이(Year=12)는 조건에 맞지 않아서 제외돼요!'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'Year 10에 재학 중인 모든 학생의 이름과 학년(Grade)을 조회하는 올바른 SQL은?',
          options: [
            'SELECT Name, Grade FROM Student WHERE Year = 10',
            'SELECT Name AND Grade FROM Student WHERE Year = 10',
            'SELECT Name, Grade WHERE Year = 10 FROM Student',
            'GET Name, Grade FROM Student IF Year = 10'
          ],
          answer: 0,
          explanation: 'SQL의 올바른 순서는 **SELECT 필드 FROM 테이블 WHERE 조건**이에요. 필드는 쉼표(,)로 구분하고, AND가 아니에요. WHERE는 FROM 뒤에 와야 해요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '학년(Grade)이 "A"인 학생의 이름을 조회하는 SQL을 완성하세요.',
          codeTemplate: 'SELECT Name\n___ Student\nWHERE Grade = \'A\'',
          fillBlanks: [
            { id: 1, answer: "FROM", options: ["FROM", "IN", "OF", "TABLE"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "WHERE 조건",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-operators",
          type: "explain",
          title: "🎯 비교 연산자",
          content: `WHERE 절에서 사용할 수 있는 **비교 연산자**를 알아볼게요!

| 연산자 | 의미 | 예시 |
|--------|------|------|
| = | 같다 | WHERE Age = 15 |
| <> | 같지 않다 | WHERE Grade <> 'F' |
| < | 작다 | WHERE Age < 16 |
| > | 크다 | WHERE Age > 14 |
| <= | 작거나 같다 | WHERE Age <= 15 |
| >= | 크거나 같다 | WHERE Age >= 16 |

주의할 점:
- SQL에서 "같지 않다"는 **<>** 를 써요 (!=가 아니에요!)
- 문자열 값은 **작은따옴표 ' '**로 감싸요
- 숫자는 따옴표 없이 써요

\`\`\`
WHERE Grade = 'A'    ← 문자열은 따옴표!
WHERE Age = 15       ← 숫자는 따옴표 없이!
\`\`\``
        },
        {
          id: "ch3-andor",
          type: "explain",
          title: "🔗 AND, OR 조건",
          content: `**여러 조건**을 함께 쓰고 싶으면 **AND**와 **OR**을 사용해요!

**AND**: 두 조건이 **모두** 참이어야 해요
\`\`\`
SELECT Name
FROM Student
WHERE Age >= 15 AND Grade = 'A'
\`\`\`
→ 나이가 15 이상**이면서** 학년이 A인 학생

**OR**: 두 조건 중 **하나만** 참이면 돼요
\`\`\`
SELECT Name
FROM Student
WHERE Year = 10 OR Year = 11
\`\`\`
→ Year 10 **이거나** Year 11인 학생

Student 테이블로 확인해 볼게요:
\`\`\`
| Name   | Age | Year | Grade |
|--------|-----|------|-------|
| 김코딩 | 15  | 10   | A     |  ← AND: Age>=15 ✓, Grade='A' ✓ → 선택!
| 이수도 | 16  | 11   | B     |  ← AND: Age>=15 ✓, Grade='A' ✗ → 제외
| 박알고 | 15  | 10   | A     |  ← AND: Age>=15 ✓, Grade='A' ✓ → 선택!
| 최데이 | 17  | 12   | C     |  ← AND: Age>=15 ✓, Grade='A' ✗ → 제외
\`\`\``
        },
        {
          id: "ch3-like",
          type: "explain",
          title: "🔤 LIKE와 와일드카드",
          content: `문자열을 **부분 검색**하고 싶을 때는 **LIKE**를 써요!

**%** (퍼센트) 와일드카드: **아무 문자나 0개 이상**

\`\`\`
SELECT Name
FROM Student
WHERE Name LIKE '김%'
\`\`\`
→ 이름이 "김"으로 **시작하는** 학생 (김코딩, 김민수, ...)

\`\`\`
SELECT Name
FROM Student
WHERE Name LIKE '%코%'
\`\`\`
→ 이름에 "코"가 **포함된** 학생 (김코딩, 코드맨, ...)

더 많은 예시:
| 패턴 | 의미 | 매칭되는 예 |
|------|------|-------------|
| 'A%' | A로 시작 | Alice, Alex |
| '%son' | son으로 끝 | Johnson, Wilson |
| '%an%' | an이 포함 | Daniel, Mango |

시험 팁: LIKE와 **%** 와일드카드는 IGCSE Paper 2에서 자주 나와요!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 몇 행이 나올까?",
          content: `다음 쿼리의 결과는 몇 행일까요?

\`\`\`
Student 테이블:
| StudentID | Name   | Age | Year | Grade |
|-----------|--------|-----|------|-------|
| 1001      | 김코딩 | 15  | 10   | A     |
| 1002      | 이수도 | 16  | 11   | B     |
| 1003      | 박알고 | 15  | 10   | A     |
| 1004      | 최데이 | 17  | 12   | C     |
| 1005      | 정파이 | 16  | 11   | A     |

SELECT Name
FROM Student
WHERE Grade = 'A' AND Age >= 15
\`\`\``,
          options: [
            '3행 (김코딩, 박알고, 정파이)',
            '2행 (김코딩, 박알고)',
            '4행 (모두 A이거나 15이상)',
            '1행 (김코딩만)'
          ],
          answer: 0,
          explanation: 'Grade=\'A\' **AND** Age>=15를 **동시에** 만족하는 학생:\n- 김코딩: Grade=A ✓, Age=15 ✓ → 선택!\n- 박알고: Grade=A ✓, Age=15 ✓ → 선택!\n- 정파이: Grade=A ✓, Age=16 ✓ → 선택!\n\n이수도(Grade=B)와 최데이(Grade=C)는 제외돼요. 총 **3행**!'
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '나이가 14세 이상 16세 이하인 학생을 조회하는 올바른 WHERE 절은?',
          options: [
            'WHERE Age >= 14 AND Age <= 16',
            'WHERE Age >= 14 OR Age <= 16',
            'WHERE Age > 14 AND Age < 16',
            'WHERE Age = 14 AND Age = 16'
          ],
          answer: 0,
          explanation: '14세 **이상**(>=14) **그리고(AND)** 16세 **이하**(<=16)여야 해요. OR을 쓰면 모든 값이 통과돼요(모든 숫자는 14 이상이거나 16 이하). >와 <를 쓰면 14와 16이 제외돼요!'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: 'Year 11이면서 Grade가 "A"가 아닌 학생의 이름을 조회하는 SQL을 완성하세요.',
          codeTemplate: 'SELECT Name\nFROM Student\nWHERE Year = 11 ___ Grade <> \'A\'',
          fillBlanks: [
            { id: 1, answer: "AND", options: ["AND", "OR", "NOT", "BUT"] }
          ]
        }
      ]
    }
  ]
}
