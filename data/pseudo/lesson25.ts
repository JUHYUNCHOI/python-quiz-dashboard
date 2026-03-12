// ============================================
// 수도코드 레슨 25: SQL 심화 (SQL Advanced)
// CIE 스타일 수도코드 - 정렬과 집계 함수
// ============================================

import { LessonData } from '../types'

export const pseudoLesson25Data: LessonData = {
  id: "pseudo-25",
  title: "SQL 심화",
  emoji: "📊",
  description: "정렬과 집계 함수를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "ORDER BY 정렬",
      emoji: "🔢",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔢 ORDER BY란?",
          content: `SQL 쿼리의 결과를 **정렬**하고 싶으면 **ORDER BY**를 써요!

\`\`\`
SELECT Name, Age
FROM Student
ORDER BY Age
\`\`\`

기본적으로 **오름차순(ASC, Ascending)**으로 정렬돼요 (작은 것 → 큰 것).

Student 테이블:
\`\`\`
| Name   | Age |
|--------|-----|
| 김코딩 | 15  |
| 이수도 | 16  |
| 박알고 | 15  |
| 최데이 | 17  |
\`\`\`

ORDER BY Age 결과:
\`\`\`
| Name   | Age |
|--------|-----|
| 김코딩 | 15  |
| 박알고 | 15  |
| 이수도 | 16  |
| 최데이 | 17  |
\`\`\`

나이가 작은 순서대로 정렬됐어요!

**내림차순(DESC, Descending)**으로 하려면:
\`\`\`
SELECT Name, Age
FROM Student
ORDER BY Age DESC
\`\`\`
→ 17, 16, 15, 15 순서로 나와요!`
        },
        {
          id: "ch1-multi",
          type: "explain",
          title: "📋 여러 필드로 정렬하기",
          content: `**두 개 이상의 필드**로 정렬할 수도 있어요!

\`\`\`
SELECT Name, Grade, Age
FROM Student
ORDER BY Grade ASC, Age DESC
\`\`\`

이 쿼리의 의미:
1. 먼저 Grade를 **오름차순**(A→B→C)으로 정렬
2. 같은 Grade 안에서 Age를 **내림차순**(큰→작은)으로 정렬

결과:
\`\`\`
| Name   | Grade | Age |
|--------|-------|-----|
| 정파이 | A     | 16  |  ← Grade A, 나이 큰 순
| 김코딩 | A     | 15  |  ← Grade A, 나이 작은 순
| 박알고 | A     | 15  |  ← Grade A, 나이 작은 순
| 이수도 | B     | 16  |  ← Grade B
| 최데이 | C     | 17  |  ← Grade C
\`\`\`

WHERE와 함께 쓸 수도 있어요:
\`\`\`
SELECT Name, Age
FROM Student
WHERE Year = 10
ORDER BY Name ASC
\`\`\`
→ Year 10인 학생만 이름순으로 정렬!

순서: **SELECT → FROM → WHERE → ORDER BY**`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 어떤 순서로 나올까?",
          content: `다음 쿼리의 결과에서 이름이 나오는 순서는?

\`\`\`
Student 테이블:
| Name   | Age | Grade |
|--------|-----|-------|
| 김코딩 | 15  | A     |
| 이수도 | 16  | B     |
| 박알고 | 17  | A     |
| 최데이 | 14  | C     |

SELECT Name
FROM Student
ORDER BY Age DESC
\`\`\``,
          options: [
            '박알고, 이수도, 김코딩, 최데이',
            '최데이, 김코딩, 이수도, 박알고',
            '김코딩, 이수도, 박알고, 최데이',
            '박알고, 김코딩, 이수도, 최데이'
          ],
          answer: 0,
          explanation: 'ORDER BY Age **DESC**는 나이가 **큰 순서**(내림차순)로 정렬해요.\n박알고(17) → 이수도(16) → 김코딩(15) → 최데이(14) 순서예요!'
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '학생을 Grade 내림차순으로, 같은 Grade 안에서는 Name 오름차순으로 정렬하는 SQL은?',
          options: [
            'SELECT * FROM Student ORDER BY Grade DESC, Name ASC',
            'SELECT * FROM Student ORDER BY Grade DESC AND Name ASC',
            'SELECT * FROM Student ORDER BY Grade, Name DESC',
            'SELECT * FROM Student SORT BY Grade DESC, Name ASC'
          ],
          answer: 0,
          explanation: '여러 필드로 정렬할 때는 **쉼표(,)**로 구분해요. AND가 아니에요! 또한 SQL에서 정렬 키워드는 **ORDER BY**이지 SORT BY가 아니에요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '학생을 나이가 많은 순서대로 정렬하는 SQL을 완성하세요.',
          code: 'SELECT Name, Age\nFROM Student\nORDER BY Age ___',
          fillBlanks: [
            { id: 1, answer: "DESC", options: ["DESC", "ASC", "DOWN", "REVERSE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "집계 함수",
      emoji: "📈",
      steps: [
        {
          id: "ch2-count",
          type: "explain",
          title: "📈 COUNT - 개수 세기",
          content: `**집계 함수(Aggregate Function)**는 여러 행의 데이터를 **하나의 값으로 요약**해 줘요.

**COUNT(*)** : 행(레코드)의 **개수**를 세요

\`\`\`
SELECT COUNT(*)
FROM Student
\`\`\`

Student 테이블에 4명이 있다면 → 결과: **4**

WHERE와 함께 쓰면 **조건에 맞는 행만** 세요:

\`\`\`
SELECT COUNT(*)
FROM Student
WHERE Grade = 'A'
\`\`\`

Grade가 A인 학생이 3명이면 → 결과: **3**

**COUNT(필드이름)**은 해당 필드가 **NULL이 아닌** 행만 세요:
\`\`\`
SELECT COUNT(Email)
FROM Student
\`\`\`
→ Email 값이 비어있지 않은 학생만 세요!

시험 팁: \`COUNT(*)\`는 **모든 행**, \`COUNT(필드)\`는 **NULL이 아닌 행**만 세요!`
        },
        {
          id: "ch2-sumavg",
          type: "explain",
          title: "🔢 SUM과 AVG",
          content: `**SUM()** : 숫자 필드의 **합계**를 구해요
**AVG()** : 숫자 필드의 **평균**을 구해요

\`\`\`
Student 테이블:
| Name   | Age | Score |
|--------|-----|-------|
| 김코딩 | 15  | 85    |
| 이수도 | 16  | 92    |
| 박알고 | 15  | 78    |
| 최데이 | 17  | 88    |
\`\`\`

**합계 구하기:**
\`\`\`
SELECT SUM(Score)
FROM Student
\`\`\`
→ 85 + 92 + 78 + 88 = **343**

**평균 구하기:**
\`\`\`
SELECT AVG(Score)
FROM Student
\`\`\`
→ 343 / 4 = **85.75**

WHERE와 함께 쓰기:
\`\`\`
SELECT AVG(Score)
FROM Student
WHERE Age = 15
\`\`\`
→ 15세 학생만: (85 + 78) / 2 = **81.5**`
        },
        {
          id: "ch2-combine",
          type: "explain",
          title: "💡 집계 함수 활용하기",
          content: `집계 함수를 **WHERE**와 함께 사용하면 강력한 쿼리를 만들 수 있어요!

\`\`\`
Student 테이블:
| Name   | Year | Score |
|--------|------|-------|
| 김코딩 | 10   | 85    |
| 이수도 | 11   | 92    |
| 박알고 | 10   | 78    |
| 최데이 | 12   | 88    |
| 정파이 | 11   | 95    |
\`\`\`

**Year 11 학생 수:**
\`\`\`
SELECT COUNT(*)
FROM Student
WHERE Year = 11
\`\`\`
→ **2** (이수도, 정파이)

**Year 10 학생의 평균 점수:**
\`\`\`
SELECT AVG(Score)
FROM Student
WHERE Year = 10
\`\`\`
→ (85 + 78) / 2 = **81.5**

**점수가 80 이상인 학생의 총 점수:**
\`\`\`
SELECT SUM(Score)
FROM Student
WHERE Score >= 80
\`\`\`
→ 85 + 92 + 88 + 95 = **360**

CIE 시험에서 자주 나오는 패턴이에요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 쿼리의 결과는?

\`\`\`
Product 테이블:
| ProductID | Name     | Price | Category |
|-----------|----------|-------|----------|
| P001      | 연필     | 0.50  | 문구     |
| P002      | 노트     | 3.00  | 문구     |
| P003      | 가방     | 25.00 | 가방     |
| P004      | 지우개   | 0.75  | 문구     |
| P005      | 필통     | 5.00  | 문구     |

SELECT COUNT(*)
FROM Product
WHERE Category = '문구'
\`\`\``,
          options: [
            '4',
            '5',
            '3',
            '1'
          ],
          answer: 0,
          explanation: 'Category가 \'문구\'인 상품은 연필, 노트, 지우개, 필통으로 **4개**예요! 가방(Category=\'가방\')은 조건에 맞지 않으므로 제외돼요.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'Year 11 학생의 평균 나이를 구하는 올바른 SQL은?',
          options: [
            'SELECT AVG(Age) FROM Student WHERE Year = 11',
            'SELECT AVERAGE(Age) FROM Student WHERE Year = 11',
            'SELECT AVG(Age) WHERE Year = 11 FROM Student',
            'SELECT SUM(Age) FROM Student WHERE Year = 11'
          ],
          answer: 0,
          explanation: '평균을 구하는 집계 함수는 **AVG()**이에요 (AVERAGE가 아니에요!). SQL 순서는 SELECT → FROM → WHERE이므로, WHERE는 FROM 뒤에 와야 해요. SUM은 합계이지 평균이 아니에요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '문구(Category가 "문구") 상품의 총 가격을 구하는 SQL을 완성하세요.',
          code: 'SELECT ___(Price)\nFROM Product\nWHERE Category = \'문구\'',
          fillBlanks: [
            { id: 1, answer: "SUM", options: ["SUM", "AVG", "COUNT", "TOTAL"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "시험 대비 SQL",
      emoji: "📝",
      steps: [
        {
          id: "ch3-patterns",
          type: "explain",
          title: "📝 IGCSE SQL 출제 패턴",
          content: `IGCSE Paper 2에서 SQL은 이런 패턴으로 나와요!

**패턴 1: 테이블을 보고 쿼리 작성하기**
\`\`\`
"Student 테이블에서 Year 10인 학생의 이름을 조회하세요."
→ SELECT Name FROM Student WHERE Year = 10
\`\`\`

**패턴 2: 쿼리를 보고 결과 예측하기**
\`\`\`
주어진 쿼리와 테이블 데이터를 보고
출력되는 행의 개수나 내용을 답해요.
\`\`\`

**패턴 3: 집계 함수 활용**
\`\`\`
"전체 학생의 수를 구하세요."
→ SELECT COUNT(*) FROM Student
\`\`\`

시험에서 주의할 점:
- SQL 키워드는 **대문자**로 써요 (SELECT, FROM, WHERE 등)
- 문자열 값은 **작은따옴표**로 감싸요 ('A', '김코딩')
- 순서를 지켜요: SELECT → FROM → WHERE → ORDER BY`
        },
        {
          id: "ch3-schema",
          type: "explain",
          title: "📖 테이블 스키마 읽기",
          content: `시험에서는 **테이블 스키마(구조)**가 주어지고 쿼리를 작성하라는 문제가 나와요.

\`\`\`
Product 테이블 스키마:
- ProductID : INTEGER (Primary Key)
- Name : TEXT
- Price : REAL
- Category : TEXT
- InStock : BOOLEAN
\`\`\`

이 스키마를 보고 다양한 쿼리를 만들 수 있어요:

**1) 재고가 있는 상품의 이름과 가격:**
\`\`\`
SELECT Name, Price
FROM Product
WHERE InStock = TRUE
\`\`\`

**2) 가격이 10 이상인 상품을 가격순으로:**
\`\`\`
SELECT Name, Price
FROM Product
WHERE Price >= 10
ORDER BY Price ASC
\`\`\`

**3) 카테고리별 상품 개수 (심화):**
\`\`\`
SELECT COUNT(*)
FROM Product
WHERE Category = '전자기기'
\`\`\`

스키마를 잘 읽고, 어떤 필드가 있는지, 자료형이 무엇인지 파악하는 것이 중요해요!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 시험 스타일 퀴즈!",
          content: `다음 Product 테이블에서 가격이 10.00보다 높은 상품의 이름과 가격을 가격이 높은 순서대로 조회하는 SQL은?

\`\`\`
Product(ProductID, Name, Price, Category)
\`\`\``,
          options: [
            'SELECT Name, Price FROM Product WHERE Price > 10.00 ORDER BY Price DESC',
            'SELECT Name, Price FROM Product WHERE Price >= 10.00 ORDER BY Price ASC',
            'SELECT * FROM Product WHERE Price > 10.00 ORDER BY Name DESC',
            'SELECT Name AND Price FROM Product WHERE Price > 10.00 ORDER BY Price DESC'
          ],
          answer: 0,
          explanation: '가격이 10.00보다 **높은**(>) 상품이므로 \`WHERE Price > 10.00\`이에요 (>=가 아님). "가격이 높은 순서"는 **내림차순(DESC)**이에요. 필드는 쉼표로 구분하고 AND가 아니에요!'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 복합 쿼리 예측!",
          content: `다음 쿼리의 결과는?

\`\`\`
Order 테이블:
| OrderID | Customer  | Total  | Date       |
|---------|-----------|--------|------------|
| 101     | 김코딩   | 15000  | 2024-01-10 |
| 102     | 이수도   | 8000   | 2024-01-15 |
| 103     | 김코딩   | 22000  | 2024-02-01 |
| 104     | 박알고   | 5000   | 2024-02-10 |
| 105     | 김코딩   | 12000  | 2024-03-01 |

SELECT SUM(Total)
FROM Order
WHERE Customer = '김코딩'
\`\`\``,
          options: [
            '49000',
            '62000',
            '15000',
            '3'
          ],
          answer: 0,
          explanation: 'Customer가 \'김코딩\'인 주문의 Total을 합산해요:\n- OrderID 101: 15000\n- OrderID 103: 22000\n- OrderID 105: 12000\n\n15000 + 22000 + 12000 = **49000**!'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🏆 종합 퀴즈!",
          content: `위의 Order 테이블에서, 주문 총액(Total)이 10000 이상인 주문의 **개수**를 구하는 SQL은?`,
          options: [
            'SELECT COUNT(*) FROM Order WHERE Total >= 10000',
            'SELECT SUM(*) FROM Order WHERE Total >= 10000',
            'SELECT COUNT(Total) FROM Order WHERE Total > 10000',
            'SELECT COUNT(*) FROM Order WHERE Total > 10000'
          ],
          answer: 0,
          explanation: '개수를 세는 함수는 **COUNT(*)**예요 (SUM이 아니에요!). "10000 이상"이므로 \`>= 10000\`이에요 (>가 아님). 10000 이상인 주문은 15000, 22000, 12000으로 **3개**예요!'
        }
      ]
    }
  ]
}
