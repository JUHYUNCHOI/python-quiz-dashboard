// ============================================
// Pseudocode Lesson 25: SQL Advanced (English)
// CIE Style - Sort and aggregate data with SQL!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson25EnData: LessonData = {
  id: "pseudo-25",
  title: "SQL Advanced",
  emoji: "📊",
  description: "Sort and aggregate data with SQL!",
  chapters: [
    {
      id: "ch1",
      title: "ORDER BY",
      emoji: "🔢",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔢 Sorting Results with ORDER BY",
          content: `By default, SQL returns records in no guaranteed order. Use **ORDER BY** to sort the results:

\`\`\`
SELECT fields FROM table ORDER BY field ASC
SELECT fields FROM table ORDER BY field DESC
\`\`\`

- **ASC** = ascending (A-Z, 0-9, earliest-latest) - this is the **default**
- **DESC** = descending (Z-A, 9-0, latest-earliest)

Using this Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

\`\`\`
SELECT Name, Age FROM Student ORDER BY Age ASC
\`\`\`
Result: Alice (15), Carol (15), Bob (16), Eve (16), Dave (17)

\`\`\`
SELECT Name, Age FROM Student ORDER BY Age DESC
\`\`\`
Result: Dave (17), Bob (16), Eve (16), Alice (15), Carol (15)

If you omit ASC/DESC, the default is **ASC** (ascending).`
        },
        {
          id: "ch1-multi",
          type: "explain",
          title: "📋 Multiple Sort Fields & WHERE",
          content: `You can sort by **multiple fields** and combine ORDER BY with **WHERE**:

**Multiple sort fields** - the second field breaks ties from the first:
\`\`\`
SELECT Name, Grade, Age FROM Student ORDER BY Grade ASC, Age DESC
\`\`\`

Result (sorted by Grade first, then by Age descending within each grade):

| Name | Grade | Age |
|---|---|---|
| Alice | A | 15 |
| Carol | A | 15 |
| Bob | B | 16 |
| Eve | B | 16 |
| Dave | C | 17 |

**Combining WHERE and ORDER BY** (WHERE always comes before ORDER BY):
\`\`\`
SELECT Name, Age FROM Student
WHERE Year = 10
ORDER BY Name ASC
\`\`\`

Result: Alice, Carol, Eve (only Year 10, sorted alphabetically)

The clause order is always: **SELECT ... FROM ... WHERE ... ORDER BY ...**`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the order!",
          content: `Given this table called **Student**:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

In what order will the names appear?
\`\`\`
SELECT Name FROM Student ORDER BY Age DESC, Name ASC
\`\`\``,
          options: [
            'Dave, Bob, Eve, Alice, Carol',
            'Alice, Bob, Carol, Dave, Eve',
            'Eve, Dave, Carol, Bob, Alice',
            'Dave, Eve, Bob, Alice, Carol'
          ],
          answer: 0,
          explanation: 'First sort by Age DESC: Dave (17), then Bob and Eve (both 16), then Alice and Carol (both 15). When ages are equal, sort by Name ASC (alphabetical): Bob before Eve, Alice before Carol. Final order: **Dave, Bob, Eve, Alice, Carol**.'
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which SQL query sorts students by **Grade descending**, then by **Name ascending** within each grade?',
          options: [
            'SELECT * FROM Student ORDER BY Name ASC, Grade DESC',
            'SELECT * FROM Student ORDER BY Grade DESC, Name ASC',
            'SELECT * FROM Student ORDER BY Grade ASC AND Name DESC',
            'SELECT * FROM Student WHERE Grade DESC ORDER BY Name ASC'
          ],
          answer: 1,
          explanation: 'The primary sort field comes first: \`Grade DESC\`, then the secondary sort: \`Name ASC\`. Option A has them in the wrong order (Name first). Option C incorrectly uses AND instead of a comma. Option D confuses WHERE with ORDER BY.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the query to show names and ages of Year 11 students, sorted from oldest to youngest.',
          codeTemplate: 'SELECT Name, Age FROM Student ___ Year = 11 ORDER BY Age ___',
          fillBlanks: [
            { id: 1, answer: "WHERE", options: ["WHERE", "WHEN", "IF", "HAVING"] },
            { id: 2, answer: "DESC", options: ["DESC", "ASC", "DOWN", "REVERSE"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Aggregate Functions",
      emoji: "📈",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📈 What are Aggregate Functions?",
          content: `**Aggregate functions** perform calculations on a set of records and return a **single value**:

| Function | What it does | Example |
|---|---|---|
| \`COUNT(*)\` | Counts all records | How many students? |
| \`COUNT(field)\` | Counts non-null values in a field | How many have a grade? |
| \`SUM(field)\` | Adds up all values | Total of all marks |
| \`AVG(field)\` | Calculates the average | Average age |
| \`MAX(field)\` | Finds the largest value | Highest mark |
| \`MIN(field)\` | Finds the smallest value | Youngest student |

Using the Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

\`\`\`
SELECT COUNT(*) FROM Student
\`\`\`
Result: **5** (there are 5 records)

\`\`\`
SELECT AVG(Age) FROM Student
\`\`\`
Result: **15.8** (= (15+16+15+17+16) / 5)

\`\`\`
SELECT MAX(Age) FROM Student
\`\`\`
Result: **17**`
        },
        {
          id: "ch2-where",
          type: "explain",
          title: "🔗 Aggregates with WHERE",
          content: `You can combine aggregate functions with **WHERE** to calculate on a filtered subset:

Using the Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

**Count students in Year 10:**
\`\`\`
SELECT COUNT(*) FROM Student WHERE Year = 10
\`\`\`
Result: **3** (Alice, Carol, Eve)

**Average age of Year 11 students:**
\`\`\`
SELECT AVG(Age) FROM Student WHERE Year = 11
\`\`\`
Result: **16.5** (= (16+17) / 2 - only Bob and Dave)

**Oldest Year 10 student:**
\`\`\`
SELECT MAX(Age) FROM Student WHERE Year = 10
\`\`\`
Result: **16** (Eve is the oldest Year 10 student)

**Sum of ages for students with Grade A:**
\`\`\`
SELECT SUM(Age) FROM Student WHERE Grade = 'A'
\`\`\`
Result: **30** (= 15 + 15, Alice and Carol)

Important: WHERE filters **first**, then the aggregate is applied to the remaining records.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the result!",
          content: `Given this **Exam** table:

| ExamID | Subject | StudentID | Mark |
|---|---|---|---|
| 1 | Maths | 1001 | 85 |
| 2 | Maths | 1002 | 72 |
| 3 | Science | 1001 | 91 |
| 4 | Maths | 1003 | 68 |
| 5 | Science | 1002 | 77 |
| 6 | Science | 1003 | 83 |

What does this query return?
\`\`\`
SELECT AVG(Mark) FROM Exam WHERE Subject = 'Maths'
\`\`\``,
          options: [
            '85',
            '75',
            '79.33',
            '72'
          ],
          answer: 1,
          explanation: 'The WHERE clause filters for Maths only: marks are 85, 72, and 68. The AVG function calculates the average: (85 + 72 + 68) / 3 = 225 / 3 = **75**.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which SQL finds the **average age** of students in **Year 11**?',
          options: [
            'SELECT AVG(Age) FROM Student WHERE Year = 11',
            'SELECT AVERAGE(Age) FROM Student WHERE Year = 11',
            'SELECT AVG(Year) FROM Student WHERE Age = 11',
            'SELECT SUM(Age) FROM Student WHERE Year = 11'
          ],
          answer: 0,
          explanation: 'The correct function name is **AVG** (not AVERAGE). We want AVG of the **Age** field, not the Year field. SUM would give the total age, not the average. Option A correctly uses \`AVG(Age)\` with the filter \`WHERE Year = 11\`.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the query to find the total number of students and the highest mark in Science exams.',
          codeTemplate: 'SELECT ___(*)  , ___(Mark) FROM Exam WHERE Subject = ___',
          fillBlanks: [
            { id: 1, answer: "COUNT", options: ["COUNT", "SUM", "TOTAL", "NUM"] },
            { id: 2, answer: "MAX", options: ["MAX", "MIN", "TOP", "HIGHEST"] },
            { id: 3, answer: "'Science'", options: ["'Science'", "Science", "\"Science\"", "SCIENCE"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Exam SQL Practice",
      emoji: "📝",
      steps: [
        {
          id: "ch3-patterns",
          type: "explain",
          title: "📝 Common IGCSE SQL Question Patterns",
          content: `In the IGCSE Paper 2 exam, SQL questions typically follow these patterns:

**Pattern 1: Write a query from a description**
"Write an SQL query to display the names of all students aged 16 or over."
Answer: \`SELECT Name FROM Student WHERE Age >= 16\`

**Pattern 2: State what a query returns**
"State the output of: \`SELECT COUNT(*) FROM Student WHERE Year = 10\`"
Answer: 3 (you must trace through the table data)

**Pattern 3: Fix errors in a query**
"Identify and correct the error: \`SELCT Name FROM Student WERE Age > 15\`"
Answer: SELCT should be SELECT, WERE should be WHERE

**Exam tips:**
- Always check the **field names** from the table - use the exact names given!
- Text values need **single quotes**: \`WHERE Name = 'Alice'\`
- Numbers do NOT need quotes: \`WHERE Age = 16\`
- The order is always: SELECT ... FROM ... WHERE ... ORDER BY ...
- READ the question carefully: "names" means SELECT Name, not SELECT *`
        },
        {
          id: "ch3-schema",
          type: "explain",
          title: "📊 Reading a Table Schema",
          content: `In exams, you are often given a **table schema** (structure) rather than actual data:

**Product Table:**

| Field | Data Type | Description |
|---|---|---|
| ProductID | INTEGER | Primary key |
| ProductName | TEXT | Name of the product |
| Category | TEXT | Product category |
| Price | REAL | Price in pounds |
| StockLevel | INTEGER | Number in stock |

From this schema, you must write queries using the **exact field names** provided.

Example questions and answers:

"Display all products in the 'Electronics' category"
\`\`\`
SELECT * FROM Product WHERE Category = 'Electronics'
\`\`\`

"Show product names and prices, cheapest first"
\`\`\`
SELECT ProductName, Price FROM Product ORDER BY Price ASC
\`\`\`

"Find how many products cost more than 50 pounds"
\`\`\`
SELECT COUNT(*) FROM Product WHERE Price > 50
\`\`\`

"Display the name of the most expensive product"
\`\`\`
SELECT ProductName FROM Product ORDER BY Price DESC
\`\`\`
(This returns all products sorted by price descending - the first row is the most expensive.)`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Exam-Style Question!",
          content: `A shop database has a **Product** table:

| Field | Data Type |
|---|---|
| ProductID | INTEGER |
| ProductName | TEXT |
| Category | TEXT |
| Price | REAL |
| StockLevel | INTEGER |

Which SQL displays the names and prices of products with a stock level of **less than 10**, sorted by price from **highest to lowest**?`,
          options: [
            'SELECT ProductName, Price FROM Product WHERE StockLevel < 10 ORDER BY Price DESC',
            'SELECT * FROM Product WHERE StockLevel < 10 ORDER BY Price ASC',
            'SELECT ProductName, Price FROM Product ORDER BY Price DESC WHERE StockLevel < 10',
            'SELECT ProductName, Price FROM Product WHERE StockLevel <= 10 ORDER BY Price DESC'
          ],
          answer: 0,
          explanation: 'We need ProductName and Price (not *), WHERE StockLevel < 10 (not <=, because "less than 10" means strictly below 10), ORDER BY Price DESC (highest to lowest). Option C has WHERE and ORDER BY in the wrong order. Option B selects all fields and sorts ascending. Option D uses <= instead of <.'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the result!",
          content: `Given this **Employee** table:

| EmpID | Name | Department | Salary |
|---|---|---|---|
| 101 | Anna | Sales | 32000 |
| 102 | Ben | IT | 45000 |
| 103 | Cara | Sales | 35000 |
| 104 | Dan | IT | 48000 |
| 105 | Ella | HR | 30000 |
| 106 | Finn | Sales | 38000 |

What does this query return?
\`\`\`
SELECT Department, COUNT(*), AVG(Salary)
FROM Employee
WHERE Salary > 33000
ORDER BY Department ASC
\`\`\`

Note: Assume the database groups by Department automatically when aggregate functions are mixed with non-aggregate fields.`,
          options: [
            'IT: 2, 46500 / Sales: 2, 36500',
            'HR: 1, 30000 / IT: 2, 46500 / Sales: 3, 35000',
            'IT: 2, 46500 / Sales: 1, 35000',
            'Sales: 2, 36500 / IT: 2, 46500'
          ],
          answer: 0,
          explanation: 'First, WHERE Salary > 33000 filters out Anna (32000) and Ella (30000). Remaining: Ben (IT, 45000), Cara (Sales, 35000), Dan (IT, 48000), Finn (Sales, 38000). Grouped by Department: IT has 2 employees with AVG = (45000+48000)/2 = 46500. Sales has 2 employees with AVG = (35000+38000)/2 = 36500. Sorted by Department ASC: IT first, then Sales.'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🏆 Final Challenge!",
          content: `Using the Employee table:

| EmpID | Name | Department | Salary |
|---|---|---|---|
| 101 | Anna | Sales | 32000 |
| 102 | Ben | IT | 45000 |
| 103 | Cara | Sales | 35000 |
| 104 | Dan | IT | 48000 |
| 105 | Ella | HR | 30000 |
| 106 | Finn | Sales | 38000 |

Which query correctly counts the number of employees in the **Sales** department who earn **more than 34000**?`,
          options: [
            'SELECT COUNT(Name) FROM Employee WHERE Department = \'Sales\' AND Salary > 34000',
            'SELECT SUM(*) FROM Employee WHERE Department = \'Sales\' OR Salary > 34000',
            'SELECT COUNT(*) FROM Employee WHERE Department = \'Sales\' OR Salary > 34000',
            'SELECT COUNT(Salary > 34000) FROM Employee WHERE Department = \'Sales\''
          ],
          answer: 0,
          explanation: 'We need COUNT to count records, WHERE Department = \'Sales\' **AND** Salary > 34000 (both conditions must be true). Option B uses SUM(*) which is not valid. Option C uses OR which would include non-Sales employees earning over 34000. Option D has invalid syntax. The answer is **2** (Cara at 35000 and Finn at 38000).'
        },
      ]
    },
  ]
}
