// ============================================
// SQL 기출문제 연습 1
// SELECT, FROM, WHERE, ORDER BY
// IGCSE 0478 Paper 2 스타일
// ============================================

import { LessonData } from '../types'

export const igcseLessonSql1Data: LessonData = {
  id: "igcse-sql1",
  title: "SQL 기출문제 1",
  emoji: "🗃️",
  description: "IGCSE Paper 2 SQL 기출 연습!",
  chapters: [
    {
      id: "ch1",
      title: "SELECT & WHERE 기초",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 Products 테이블과 SQL 기초",
          content: `IGCSE Paper 2에서 **SQL** 문제는 거의 매번 나와요!

이 레슨에서는 아래 **Products** 테이블을 사용합니다:

\`\`\`
| ProductID | ProductName | Category    | Price  | InStock | SupplierCode |
|-----------|-------------|-------------|--------|---------|--------------|
| P001      | Laptop      | Electronics | 899.99 | Yes     | SUP1         |
| P002      | Mouse       | Electronics | 25.50  | Yes     | SUP2         |
| P003      | Desk        | Furniture   | 150.00 | No      | SUP1         |
| P004      | Chair       | Furniture   | 89.99  | Yes     | SUP3         |
| P005      | Monitor     | Electronics | 349.99 | Yes     | SUP1         |
| P006      | Keyboard    | Electronics | 45.00  | No      | SUP2         |
| P007      | Lamp        | Furniture   | 35.00  | Yes     | SUP3         |
| P008      | Headphones  | Electronics | 79.99  | Yes     | SUP2         |
\`\`\`

SQL 기본 구조:
- **SELECT** – 가져올 필드(열) 지정
- **FROM** – 테이블 이름 지정
- **WHERE** – 조건에 맞는 레코드만 필터링

준비됐나요? 💪`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🧠 레코드 수 세기",
          content: `Products 테이블에 있는 **레코드(record)** 수는 몇 개인가요?

\`\`\`
| ProductID | ProductName | Category    | Price  | InStock | SupplierCode |
|-----------|-------------|-------------|--------|---------|--------------|
| P001      | Laptop      | Electronics | 899.99 | Yes     | SUP1         |
| P002      | Mouse       | Electronics | 25.50  | Yes     | SUP2         |
| P003      | Desk        | Furniture   | 150.00 | No      | SUP1         |
| P004      | Chair       | Furniture   | 89.99  | Yes     | SUP3         |
| P005      | Monitor     | Electronics | 349.99 | Yes     | SUP1         |
| P006      | Keyboard    | Electronics | 45.00  | No      | SUP2         |
| P007      | Lamp        | Furniture   | 35.00  | Yes     | SUP3         |
| P008      | Headphones  | Electronics | 79.99  | Yes     | SUP2         |
\`\`\``,
          options: [
            '8',
            '7',
            '6',
            '5'
          ],
          answer: 0,
          explanation: `테이블의 각 **행(row)**이 하나의 레코드에요.

P001부터 P008까지 총 **8개**의 레코드가 있어요.

💡 시험 팁: 헤더 행(필드 이름)은 레코드에 포함하지 않아요!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "🧠 기본 키 (Primary Key)",
          content: `Products 테이블에서 **기본 키(Primary Key)**로 가장 적합한 필드는?

\`\`\`
| ProductID | ProductName | Category    | Price  | InStock | SupplierCode |
|-----------|-------------|-------------|--------|---------|--------------|
| P001      | Laptop      | Electronics | 899.99 | Yes     | SUP1         |
| P002      | Mouse       | Electronics | 25.50  | Yes     | SUP2         |
| ...       | ...         | ...         | ...    | ...     | ...          |
\`\`\``,
          options: [
            'ProductID',
            'ProductName',
            'Category',
            'Price'
          ],
          answer: 0,
          explanation: `**ProductID**가 기본 키로 가장 적합해요!

기본 키(Primary Key)의 조건:
- **고유(Unique)**: 모든 값이 다름 ✅
- **비어있지 않음(Not Null)**: 항상 값이 있음 ✅

ProductName은 이름이 같을 수 있고, Category나 Price는 중복값이 있어서 기본 키로 적합하지 않아요.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 SELECT + WHERE 결과 예측",
          content: `다음 SQL 쿼리의 출력 결과는?

\`\`\`
SELECT ProductName, Price
FROM Products
WHERE Category = 'Furniture';
\`\`\`

Products 테이블에서 Category가 'Furniture'인 제품:
- Desk (150.00), Chair (89.99), Lamp (35.00)`,
          options: [
            'Desk 150.00\nChair 89.99\nLamp 35.00',
            'Desk 150.00\nChair 89.99',
            'Laptop 899.99\nMonitor 349.99\nKeyboard 45.00',
            'Desk\nChair\nLamp'
          ],
          answer: 0,
          explanation: `WHERE Category = 'Furniture'는 Category 필드가 'Furniture'인 레코드만 필터링해요.

해당하는 레코드:
- **Desk** – 150.00
- **Chair** – 89.99
- **Lamp** – 35.00

SELECT에서 ProductName과 Price만 선택했으므로 이 두 필드만 출력돼요! 🎯`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "🧠 WHERE 절의 역할",
          content: `SQL 문에서 **WHERE** 절의 역할은 무엇인가요?`,
          options: [
            '조건에 맞는 레코드만 필터링한다',
            '레코드를 정렬한다',
            '레코드를 그룹화한다',
            '새로운 테이블을 만든다'
          ],
          answer: 0,
          explanation: `**WHERE**는 조건을 지정하여 해당 조건을 만족하는 레코드만 선택해요.

예시:
\`\`\`
WHERE Price > 100
\`\`\`
→ Price가 100보다 큰 레코드만 가져와요.

- 정렬은 **ORDER BY**
- 그룹화는 **GROUP BY**
- 테이블 생성은 **CREATE TABLE**`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ SELECT + WHERE 완성",
          content: `모든 **Electronics** 카테고리 제품의 **ProductName**과 **Price**를 표시하는 SQL을 완성하세요.`,
          code: 'SELECT ___, Price\nFROM Products\nWHERE ___ = \'Electronics\';',
          fillBlanks: [
            { id: 1, answer: "ProductName", options: ["ProductName", "ProductID", "Category", "*"] },
            { id: 2, answer: "Category", options: ["Category", "ProductName", "InStock", "SupplierCode"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "ORDER BY & 조건",
      emoji: "📊",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📊 ORDER BY와 복합 조건",
          content: `**ORDER BY**와 **복합 조건(AND/OR)**은 시험에서 자주 나와요!

**ORDER BY** – 결과 정렬:
\`\`\`
SELECT ProductName, Price
FROM Products
ORDER BY Price ASC;   -- 오름차순 (낮은 → 높은)

SELECT ProductName, Price
FROM Products
ORDER BY Price DESC;  -- 내림차순 (높은 → 낮은)
\`\`\`

**AND / OR** – 여러 조건 결합:
\`\`\`
-- AND: 두 조건 모두 만족
WHERE Category = 'Electronics' AND Price > 50

-- OR: 하나라도 만족
WHERE Category = 'Electronics' OR Category = 'Furniture'
\`\`\`

💡 시험 팁:
- ASC는 생략 가능 (기본값이 오름차순)
- 문자열은 **알파벳순**, 숫자는 **크기순**으로 정렬돼요!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "🧠 ORDER BY DESC",
          content: `다음 SQL에서 \`ORDER BY Price DESC\`는 무엇을 의미하나요?

\`\`\`
SELECT ProductName, Price
FROM Products
ORDER BY Price DESC;
\`\`\``,
          options: [
            'Price를 높은 값에서 낮은 값 순으로 정렬한다',
            'Price를 낮은 값에서 높은 값 순으로 정렬한다',
            'Price 조건으로 필터링한다',
            'Price별로 그룹화한다'
          ],
          answer: 0,
          explanation: `**DESC** = Descending = **내림차순** (높은 → 낮은)

\`ORDER BY Price DESC\` 결과:
- 899.99 (Laptop)
- 349.99 (Monitor)
- 150.00 (Desk)
- ...

반대로 **ASC** = Ascending = **오름차순** (낮은 → 높은)이에요.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 WHERE + ORDER BY 결과 예측",
          content: `다음 SQL 쿼리의 출력 결과는?

\`\`\`
SELECT ProductName
FROM Products
WHERE Price > 100
ORDER BY ProductName;
\`\`\`

Price > 100인 제품: Laptop(899.99), Desk(150.00), Monitor(349.99)
→ ProductName 알파벳순으로 정렬!`,
          options: [
            'Desk\nLaptop\nMonitor',
            'Laptop\nMonitor\nDesk',
            'Laptop\nDesk\nMonitor',
            'Monitor\nLaptop\nDesk'
          ],
          answer: 0,
          explanation: `단계별로 풀어 볼게요:

1. **WHERE Price > 100** → 3개 레코드 선택:
   - Laptop (899.99)
   - Desk (150.00)
   - Monitor (349.99)

2. **ORDER BY ProductName** → 알파벳순 정렬:
   - **Desk** (D)
   - **Laptop** (L)
   - **Monitor** (M)

💡 ORDER BY 뒤에 ASC/DESC가 없으면 기본값은 **ASC (오름차순)**이에요!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 재고 + 정렬 SQL 완성",
          content: `재고가 있는(**InStock = 'Yes'**) 모든 제품을 **가격 오름차순**으로 정렬하여 표시하는 SQL을 완성하세요.`,
          code: 'SELECT ProductName, Price\nFROM Products\nWHERE InStock = \'___\'\nORDER BY Price ___;',
          fillBlanks: [
            { id: 1, answer: "Yes", options: ["Yes", "No", "True", "1"] },
            { id: 2, answer: "ASC", options: ["ASC", "DESC", "UP", "ASCENDING"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🧠 AND 조건 SQL",
          content: `**Electronics** 카테고리에서 **Price가 50 초과**인 제품을 표시하는 올바른 SQL은?`,
          options: [
            'SELECT * FROM Products WHERE Category = \'Electronics\' AND Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\' OR Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\', Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\' THEN Price > 50;'
          ],
          answer: 0,
          explanation: `두 조건을 **모두** 만족해야 하므로 **AND**를 사용해요!

\`WHERE Category = 'Electronics' AND Price > 50\`

결과:
- Laptop (899.99) ✅
- Monitor (349.99) ✅
- Headphones (79.99) ✅
- Mouse (25.50) ❌ (50 이하)
- Keyboard (45.00) ❌ (50 이하)

OR를 사용하면 둘 중 하나만 만족해도 선택되어 결과가 달라져요!`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 AND 조건 결과 예측",
          content: `다음 SQL 쿼리의 출력 결과는?

\`\`\`
SELECT ProductName
FROM Products
WHERE Category = 'Electronics'
AND InStock = 'No';
\`\`\`

Electronics이면서 InStock = 'No'인 제품을 찾아보세요!`,
          options: [
            'Keyboard',
            'Keyboard\nMouse',
            'Desk\nKeyboard',
            'Mouse\nKeyboard\nHeadphones'
          ],
          answer: 0,
          explanation: `두 조건을 **모두** 확인해 볼게요:

Electronics 제품들:
- Laptop – InStock: Yes ❌
- Mouse – InStock: Yes ❌
- Monitor – InStock: Yes ❌
- Keyboard – InStock: **No** ✅
- Headphones – InStock: Yes ❌

Category = 'Electronics' **AND** InStock = 'No'를 모두 만족하는 제품은 **Keyboard** 하나뿐이에요! 🎯`
        }
      ]
    },
    {
      id: "ch3",
      title: "SQL 쿼리 작성",
      emoji: "✍️",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "✍️ 시험에서 SQL 쿼리 작성하기",
          content: `IGCSE Paper 2에서 SQL 쿼리를 **직접 작성**하는 문제가 나와요!

자주 하는 실수 TOP 5:
1. ❌ 문자열 값에 **따옴표** 빠뜨리기
   → \`WHERE Category = Electronics\` (오류!)
   → \`WHERE Category = 'Electronics'\` (정답!)

2. ❌ **FROM** 절 빠뜨리기
   → 항상 테이블 이름을 지정해야 해요!

3. ❌ **필드 이름 오타**
   → ProductName ≠ Product_Name ≠ productname

4. ❌ **세미콜론(;)** 빠뜨리기
   → SQL 문 끝에 \`;\` 추가하기!

5. ❌ **ORDER BY** 위치 오류
   → ORDER BY는 항상 **WHERE 뒤에** 와야 해요!

올바른 순서:
\`\`\`
SELECT 필드
FROM 테이블
WHERE 조건
ORDER BY 필드 ASC/DESC;
\`\`\`

연습해 봅시다! 💪`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 재고 없는 제품 조회",
          content: `재고가 없는(**InStock = 'No'**) 모든 제품의 **이름**을 표시하는 SQL을 완성하세요.`,
          code: 'SELECT ___\nFROM ___\nWHERE InStock = ___;',
          fillBlanks: [
            { id: 1, answer: "ProductName", options: ["ProductName", "*", "ProductID", "Price"] },
            { id: 2, answer: "Products", options: ["Products", "Product", "ProductTable", "Stock"] },
            { id: 3, answer: "'No'", options: ["'No'", "No", "0", "False"] }
          ]
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "🧠 대안적 WHERE 구문",
          content: `\`WHERE InStock = 'No'\`와 **같은 결과**를 내는 다른 표현은?`,
          options: [
            'WHERE NOT InStock = \'Yes\'',
            'WHERE InStock > \'No\'',
            'WHERE InStock <> \'No\'',
            'WHERE InStock AND \'No\''
          ],
          answer: 0,
          explanation: `**NOT**은 조건을 반대로 만들어요!

\`WHERE NOT InStock = 'Yes'\`
= InStock이 'Yes'가 **아닌** 모든 레코드
= InStock이 'No'인 레코드

💡 다른 대안:
- \`WHERE InStock <> 'Yes'\` (같지 않다)
- \`WHERE InStock != 'Yes'\` (같지 않다)

주의: \`<> 'No'\`는 'No'가 아닌 것 → 'Yes'인 것이므로 **반대** 결과예요!`
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 공급업체별 정렬 SQL",
          content: `공급업체 코드가 **'SUP1'**인 제품의 이름과 가격을 **가격 내림차순**으로 표시하는 SQL을 완성하세요.`,
          code: 'SELECT ProductName, ___\nFROM Products\nWHERE SupplierCode = ___\nORDER BY Price ___;',
          fillBlanks: [
            { id: 1, answer: "Price", options: ["Price", "Category", "InStock", "SupplierCode"] },
            { id: 2, answer: "'SUP1'", options: ["'SUP1'", "SUP1", "=SUP1", "'Sup1'"] },
            { id: 3, answer: "DESC", options: ["DESC", "ASC", "DOWN", "DESCENDING"] }
          ]
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 SELECT * 결과 예측",
          content: `다음 SQL 쿼리의 출력 결과는?

\`\`\`
SELECT *
FROM Products
WHERE SupplierCode = 'SUP2'
AND Price < 50;
\`\`\`

SupplierCode = 'SUP2'인 제품: Mouse(25.50), Keyboard(45.00), Headphones(79.99)
→ 그 중 Price < 50인 것은?`,
          options: [
            'P002 Mouse Electronics 25.50 Yes SUP2\nP006 Keyboard Electronics 45.00 No SUP2',
            'P002 Mouse Electronics 25.50 Yes SUP2',
            'P006 Keyboard Electronics 45.00 No SUP2',
            'P002 Mouse Electronics 25.50 Yes SUP2\nP006 Keyboard Electronics 45.00 No SUP2\nP008 Headphones Electronics 79.99 Yes SUP2'
          ],
          answer: 0,
          explanation: `단계별로 풀어 볼게요:

1. **SupplierCode = 'SUP2'** 필터:
   - Mouse (25.50) ✅
   - Keyboard (45.00) ✅
   - Headphones (79.99) ✅

2. **AND Price < 50** 추가 필터:
   - Mouse (25.50) ✅ (50 미만)
   - Keyboard (45.00) ✅ (50 미만)
   - Headphones (79.99) ❌ (50 이상)

**SELECT ***는 모든 필드를 표시하므로 두 제품의 전체 정보가 출력돼요! 🎯`
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "🧠 SELECT *의 의미",
          content: `SQL에서 **SELECT ***는 무엇을 의미하나요?

\`\`\`
SELECT * FROM Products;
\`\`\``,
          options: [
            '모든 필드(열)를 선택한다',
            '모든 테이블을 선택한다',
            '모든 값을 곱한다',
            '새로운 필드를 만든다'
          ],
          answer: 0,
          explanation: `**SELECT ***에서 \`*\`는 **와일드카드(wildcard)**예요.

"모든 필드를 선택하라"는 뜻이에요.

\`SELECT * FROM Products\`
= SELECT ProductID, ProductName, Category, Price, InStock, SupplierCode FROM Products

💡 시험 팁:
- \`*\`는 편리하지만 특정 필드만 필요할 때는 필드명을 직접 쓰는 것이 좋아요
- 문제에서 "display all fields" 또는 "show all details"라고 하면 \`SELECT *\` 사용!`
        }
      ]
    }
  ]
}
