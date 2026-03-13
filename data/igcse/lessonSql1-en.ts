// ============================================
// SQL Past Paper Practice 1
// SELECT, FROM, WHERE, ORDER BY
// IGCSE 0478 Paper 2 Style
// ============================================

import { LessonData } from '../types'

export const igcseLessonSql1EnData: LessonData = {
  id: "igcse-sql1",
  title: "SQL Past Papers 1",
  emoji: "🗃️",
  description: "IGCSE Paper 2 SQL Practice!",
  chapters: [
    {
      id: "ch1",
      title: "SELECT & WHERE Basics",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 The Products Table & SQL Basics",
          content: `**SQL** questions appear in almost every IGCSE Paper 2 exam!

In this lesson, we will use the **Products** table below:

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

Basic SQL structure:
- **SELECT** – specifies which fields (columns) to retrieve
- **FROM** – specifies the table name
- **WHERE** – filters records based on a condition

Ready to begin? 💪`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🧠 Counting Records",
          content: `How many **records** are in the Products table?

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
          explanation: `Each **row** in the table represents one record.

There are **8** records from P001 to P008.

💡 Exam tip: The header row (field names) is NOT counted as a record!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "🧠 Primary Key",
          content: `Which field is most suitable as the **Primary Key** for the Products table?

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
          explanation: `**ProductID** is the most suitable primary key!

A Primary Key must be:
- **Unique**: Every value is different ✅
- **Not Null**: Always has a value ✅

ProductName could potentially have duplicates, and Category and Price definitely have duplicate values, so they are not suitable as primary keys.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict SELECT + WHERE Output",
          content: `What is the output of this SQL query?

\`\`\`
SELECT ProductName, Price
FROM Products
WHERE Category = 'Furniture';
\`\`\`

Products where Category is 'Furniture':
- Desk (150.00), Chair (89.99), Lamp (35.00)`,
          options: [
            'Desk 150.00\nChair 89.99\nLamp 35.00',
            'Desk 150.00\nChair 89.99',
            'Laptop 899.99\nMonitor 349.99\nKeyboard 45.00',
            'Desk\nChair\nLamp'
          ],
          answer: 0,
          explanation: `WHERE Category = 'Furniture' filters only records where the Category field is 'Furniture'.

Matching records:
- **Desk** – 150.00
- **Chair** – 89.99
- **Lamp** – 35.00

Since SELECT specifies ProductName and Price, only those two fields are displayed! 🎯`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "🧠 Purpose of WHERE",
          content: `What does the **WHERE** clause do in an SQL statement?`,
          options: [
            'Filters records based on a condition',
            'Sorts records',
            'Groups records',
            'Creates a new table'
          ],
          answer: 0,
          explanation: `**WHERE** specifies a condition to select only records that meet that condition.

For example:
\`\`\`
WHERE Price > 100
\`\`\`
→ Only retrieves records where Price is greater than 100.

- Sorting uses **ORDER BY**
- Grouping uses **GROUP BY**
- Creating tables uses **CREATE TABLE**`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Complete SELECT + WHERE",
          content: `Complete the SQL to display the **ProductName** and **Price** of all **Electronics** products.`,
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
      title: "ORDER BY & Conditions",
      emoji: "📊",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📊 ORDER BY & Multiple Conditions",
          content: `**ORDER BY** and **multiple conditions (AND/OR)** are frequently tested!

**ORDER BY** – sorting results:
\`\`\`
SELECT ProductName, Price
FROM Products
ORDER BY Price ASC;   -- Ascending (lowest → highest)

SELECT ProductName, Price
FROM Products
ORDER BY Price DESC;  -- Descending (highest → lowest)
\`\`\`

**AND / OR** – combining conditions:
\`\`\`
-- AND: Both conditions must be true
WHERE Category = 'Electronics' AND Price > 50

-- OR: At least one condition must be true
WHERE Category = 'Electronics' OR Category = 'Furniture'
\`\`\`

💡 Exam tips:
- ASC can be omitted (ascending is the default)
- Text sorts **alphabetically**, numbers sort by **value**!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "🧠 ORDER BY DESC",
          content: `What does \`ORDER BY Price DESC\` do in the following SQL?

\`\`\`
SELECT ProductName, Price
FROM Products
ORDER BY Price DESC;
\`\`\``,
          options: [
            'Sorts by Price from highest to lowest',
            'Sorts by Price from lowest to highest',
            'Filters by Price',
            'Groups by Price'
          ],
          answer: 0,
          explanation: `**DESC** = Descending = **highest to lowest**

\`ORDER BY Price DESC\` result:
- 899.99 (Laptop)
- 349.99 (Monitor)
- 150.00 (Desk)
- ...

The opposite is **ASC** = Ascending = **lowest to highest**.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict WHERE + ORDER BY Output",
          content: `What is the output of this SQL query?

\`\`\`
SELECT ProductName
FROM Products
WHERE Price > 100
ORDER BY ProductName;
\`\`\`

Products with Price > 100: Laptop (899.99), Desk (150.00), Monitor (349.99)
→ Sorted alphabetically by ProductName!`,
          options: [
            'Desk\nLaptop\nMonitor',
            'Laptop\nMonitor\nDesk',
            'Laptop\nDesk\nMonitor',
            'Monitor\nLaptop\nDesk'
          ],
          answer: 0,
          explanation: `Let's work through it step by step:

1. **WHERE Price > 100** → 3 records selected:
   - Laptop (899.99)
   - Desk (150.00)
   - Monitor (349.99)

2. **ORDER BY ProductName** → sorted alphabetically:
   - **Desk** (D)
   - **Laptop** (L)
   - **Monitor** (M)

💡 When ORDER BY has no ASC/DESC, the default is **ASC (ascending)**!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Complete In-Stock + Sort SQL",
          content: `Complete the SQL to display all products that are **in stock**, sorted by **price ascending**.`,
          code: 'SELECT ProductName, Price\nFROM Products\nWHERE InStock = \'___\'\nORDER BY Price ___;',
          fillBlanks: [
            { id: 1, answer: "Yes", options: ["Yes", "No", "True", "1"] },
            { id: 2, answer: "ASC", options: ["ASC", "DESC", "UP", "ASCENDING"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🧠 AND Condition SQL",
          content: `Which SQL correctly shows **Electronics** products with **Price greater than 50**?`,
          options: [
            'SELECT * FROM Products WHERE Category = \'Electronics\' AND Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\' OR Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\', Price > 50;',
            'SELECT * FROM Products WHERE Category = \'Electronics\' THEN Price > 50;'
          ],
          answer: 0,
          explanation: `Both conditions must be met, so we use **AND**!

\`WHERE Category = 'Electronics' AND Price > 50\`

Result:
- Laptop (899.99) ✅
- Monitor (349.99) ✅
- Headphones (79.99) ✅
- Mouse (25.50) ❌ (not > 50)
- Keyboard (45.00) ❌ (not > 50)

Using OR would select records matching either condition, giving different results!`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict AND Condition Output",
          content: `What is the output of this SQL query?

\`\`\`
SELECT ProductName
FROM Products
WHERE Category = 'Electronics'
AND InStock = 'No';
\`\`\`

Find products that are Electronics AND out of stock!`,
          options: [
            'Keyboard',
            'Keyboard\nMouse',
            'Desk\nKeyboard',
            'Mouse\nKeyboard\nHeadphones'
          ],
          answer: 0,
          explanation: `Let's check both conditions:

Electronics products:
- Laptop – InStock: Yes ❌
- Mouse – InStock: Yes ❌
- Monitor – InStock: Yes ❌
- Keyboard – InStock: **No** ✅
- Headphones – InStock: Yes ❌

Only **Keyboard** satisfies both Category = 'Electronics' AND InStock = 'No'! 🎯`
        }
      ]
    },
    {
      id: "ch3",
      title: "Writing SQL Queries",
      emoji: "✍️",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "✍️ Writing SQL Queries in the Exam",
          content: `In IGCSE Paper 2, you may need to **write SQL queries** from scratch!

Top 5 common mistakes:
1. ❌ Forgetting **quotes** around string values
   → \`WHERE Category = Electronics\` (error!)
   → \`WHERE Category = 'Electronics'\` (correct!)

2. ❌ Missing the **FROM** clause
   → You must always specify the table name!

3. ❌ **Misspelling field names**
   → ProductName ≠ Product_Name ≠ productname

4. ❌ Forgetting the **semicolon (;)**
   → Add \`;\` at the end of your SQL statement!

5. ❌ Wrong **ORDER BY** position
   → ORDER BY must always come **after WHERE**!

Correct order:
\`\`\`
SELECT fields
FROM table
WHERE condition
ORDER BY field ASC/DESC;
\`\`\`

Let's practice! 💪`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Out of Stock Query",
          content: `Complete the SQL to display the **names** of all products that are **out of stock**.`,
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
          title: "🧠 Alternative WHERE Syntax",
          content: `Which of the following produces the **same result** as \`WHERE InStock = 'No'\`?`,
          options: [
            'WHERE NOT InStock = \'Yes\'',
            'WHERE InStock > \'No\'',
            'WHERE InStock <> \'No\'',
            'WHERE InStock AND \'No\''
          ],
          answer: 0,
          explanation: `**NOT** reverses the condition!

\`WHERE NOT InStock = 'Yes'\`
= All records where InStock is **not** 'Yes'
= Records where InStock is 'No'

💡 Other alternatives:
- \`WHERE InStock <> 'Yes'\` (not equal to)
- \`WHERE InStock != 'Yes'\` (not equal to)

Note: \`<> 'No'\` means not 'No' → which is 'Yes', the **opposite** result!`
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ Supplier Sort SQL",
          content: `Complete the SQL to display the name and price of products from supplier **'SUP1'**, sorted by **price descending**.`,
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
          title: "🔮 Predict SELECT * Output",
          content: `What is the output of this SQL query?

\`\`\`
SELECT *
FROM Products
WHERE SupplierCode = 'SUP2'
AND Price < 50;
\`\`\`

Products with SupplierCode = 'SUP2': Mouse (25.50), Keyboard (45.00), Headphones (79.99)
→ Which ones have Price < 50?`,
          options: [
            'P002 Mouse Electronics 25.50 Yes SUP2\nP006 Keyboard Electronics 45.00 No SUP2',
            'P002 Mouse Electronics 25.50 Yes SUP2',
            'P006 Keyboard Electronics 45.00 No SUP2',
            'P002 Mouse Electronics 25.50 Yes SUP2\nP006 Keyboard Electronics 45.00 No SUP2\nP008 Headphones Electronics 79.99 Yes SUP2'
          ],
          answer: 0,
          explanation: `Let's work through it step by step:

1. **SupplierCode = 'SUP2'** filter:
   - Mouse (25.50) ✅
   - Keyboard (45.00) ✅
   - Headphones (79.99) ✅

2. **AND Price < 50** additional filter:
   - Mouse (25.50) ✅ (less than 50)
   - Keyboard (45.00) ✅ (less than 50)
   - Headphones (79.99) ❌ (not less than 50)

**SELECT *** displays all fields, so the full details of both products are shown! 🎯`
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "🧠 Meaning of SELECT *",
          content: `What does **SELECT *** mean in SQL?

\`\`\`
SELECT * FROM Products;
\`\`\``,
          options: [
            'Selects all fields',
            'Selects all tables',
            'Multiplies all values',
            'Creates a new field'
          ],
          answer: 0,
          explanation: `In **SELECT ***, the \`*\` is a **wildcard**.

It means "select all fields".

\`SELECT * FROM Products\`
= SELECT ProductID, ProductName, Category, Price, InStock, SupplierCode FROM Products

💡 Exam tip:
- \`*\` is convenient but it's better to specify field names when you only need certain fields
- If the question says "display all fields" or "show all details", use \`SELECT *\`!`
        }
      ]
    }
  ]
}
