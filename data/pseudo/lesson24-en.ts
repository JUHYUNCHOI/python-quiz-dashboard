// ============================================
// Pseudocode Lesson 24: SQL Basics (English)
// CIE Style - Query databases with SQL!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson24EnData: LessonData = {
  id: "pseudo-24",
  title: "SQL Basics",
  emoji: "🗃️",
  description: "Query databases with SQL!",
  chapters: [
    {
      id: "ch1",
      title: "Database Fundamentals",
      emoji: "📁",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📁 What is a Database Table?",
          content: `A **database** stores data in **tables**. A table looks like a spreadsheet:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

Key vocabulary:
- **Table** = the entire structure (like a spreadsheet)
- **Record (Row)** = one complete entry (e.g., all data about Alice)
- **Field (Column)** = one category of data (e.g., all the names)
- **Field name** = the column heading (e.g., StudentID, Name)

Each **record** contains data about one entity (one student). Each **field** stores one type of data about every entity.

We use **SQL** (Structured Query Language) to retrieve and manipulate data in databases.`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 Data Types in Databases",
          content: `Every field in a database table has a **data type**, just like variables in pseudocode:

| SQL Data Type | Description | Example |
|---|---|---|
| **TEXT** (or VARCHAR) | Text / strings | "Alice", "London" |
| **INTEGER** (or INT) | Whole numbers | 15, 1001, -3 |
| **REAL** (or FLOAT) | Decimal numbers | 3.14, 99.99 |
| **BOOLEAN** | TRUE / FALSE | TRUE, FALSE |
| **DATE** | A calendar date | 2024-03-15 |

When designing a table, you choose the **most appropriate** type for each field:

| Field | Best Type | Why? |
|---|---|---|
| StudentID | INTEGER | Whole number, used for counting |
| Name | TEXT | Contains letters |
| DateOfBirth | DATE | A calendar date |
| Fee | REAL | Money has decimal places |
| HasPaid | BOOLEAN | Only two states: yes or no |

Choosing the correct data type is a common exam question!`
        },
        {
          id: "ch1-pk",
          type: "explain",
          title: "🔑 Primary Key",
          content: `A **primary key** is a field that **uniquely identifies** each record in a table. No two records can have the same primary key value.

| StudentID (PK) | Name | Age | Year |
|---|---|---|---|
| 1001 | Alice | 15 | 10 |
| 1002 | Bob | 16 | 11 |
| 1003 | Alice | 15 | 10 |

Why is **StudentID** the primary key and not **Name**?
- Two students could have the **same name** (see Alice above!)
- StudentID is **guaranteed unique** for every student
- Names can **change** (e.g., marriage), but IDs stay the same

Properties of a good primary key:
- **Unique** - no two records share the same value
- **Not null** - every record must have a primary key value
- **Does not change** - remains constant over time
- Usually an **ID number** created specifically for this purpose

In the IGCSE exam, you may be asked to **identify** which field should be the primary key, or **explain why** a particular field is chosen.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: `A school stores data about its books in a Library table:

| BookID | Title | Author | YearPublished | Available |
|---|---|---|---|---|
| B001 | Database Design | Smith | 2020 | TRUE |
| B002 | Python Basics | Jones | 2019 | FALSE |
| B003 | Database Design | Brown | 2021 | TRUE |

Which field is the most suitable **primary key**, and why?`,
          options: [
            'Title - because it describes the book',
            'BookID - because it uniquely identifies each record',
            'Author - because each author is a different person',
            'YearPublished - because dates are always unique'
          ],
          answer: 1,
          explanation: '**BookID** is the best primary key because it is unique for every record. Title is not suitable because two books can have the same title ("Database Design" appears twice). Author names could be duplicated too. YearPublished can repeat for books published in the same year.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Identify the correct data types for each field in a Product table.',
          codeTemplate: '// ProductID (e.g., 101, 102, 103) → ___\n// ProductName (e.g., "Laptop", "Mouse") → ___\n// Price (e.g., 299.99, 14.50) → ___\n// InStock (e.g., TRUE, FALSE) → ___',
          fillBlanks: [
            { id: 1, answer: "INTEGER", options: ["INTEGER", "TEXT", "REAL", "BOOLEAN"] },
            { id: 2, answer: "TEXT", options: ["TEXT", "INTEGER", "CHAR", "BOOLEAN"] },
            { id: 3, answer: "REAL", options: ["REAL", "INTEGER", "TEXT", "DATE"] },
            { id: 4, answer: "BOOLEAN", options: ["BOOLEAN", "TEXT", "INTEGER", "CHAR"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "SELECT Statement",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-basic",
          type: "explain",
          title: "🔍 Basic SELECT Syntax",
          content: `The **SELECT** statement retrieves data from a database table.

Basic syntax:
\`\`\`
SELECT field1, field2 FROM tableName
\`\`\`

Examples using this Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |

**Select specific fields:**
\`\`\`
SELECT Name, Grade FROM Student
\`\`\`
Result:

| Name | Grade |
|---|---|
| Alice | A |
| Bob | B |
| Carol | A |

**Select all fields** using \`*\`:
\`\`\`
SELECT * FROM Student
\`\`\`
This returns **every column** for every record.

SQL keywords like SELECT and FROM are usually written in **UPPERCASE** by convention.`
        },
        {
          id: "ch2-where",
          type: "explain",
          title: "🎯 Filtering with WHERE",
          content: `The **WHERE** clause filters which records are returned:

\`\`\`
SELECT field1, field2 FROM tableName WHERE condition
\`\`\`

Using the Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

**Example 1:** Find names of students older than 15:
\`\`\`
SELECT Name FROM Student WHERE Age > 15
\`\`\`
Result: Bob, Dave, Eve

**Example 2:** Find all fields for Year 10 students:
\`\`\`
SELECT * FROM Student WHERE Year = 10
\`\`\`
Result: Alice, Carol, Eve (with all their fields)

**Example 3:** Find names and grades where Grade is 'A':
\`\`\`
SELECT Name, Grade FROM Student WHERE Grade = 'A'
\`\`\`
Result: Alice (A), Carol (A)

Note: Text values in WHERE use **single quotes**: \`WHERE Grade = 'A'\``
        },
        {
          id: "ch2-combine",
          type: "explain",
          title: "📝 Putting It All Together",
          content: `Here is the full pattern for a SELECT query:

\`\`\`
SELECT columns FROM table WHERE condition
\`\`\`

**Three key decisions:**
1. **What fields** do you want? (SELECT part)
2. **Which table** is the data in? (FROM part)
3. **Which records** do you want? (WHERE part - optional)

| I want to... | SQL |
|---|---|
| See all data | \`SELECT * FROM Student\` |
| See only names | \`SELECT Name FROM Student\` |
| See names and ages | \`SELECT Name, Age FROM Student\` |
| See Year 11 students | \`SELECT * FROM Student WHERE Year = 11\` |
| See names of students aged 16 | \`SELECT Name FROM Student WHERE Age = 16\` |

Common exam mistakes to avoid:
- Forgetting \`FROM tableName\`
- Using double quotes instead of single quotes for text values
- Writing \`==\` instead of \`=\` (SQL uses single \`=\` for comparison)
- Forgetting that WHERE is **optional** (not every query needs it)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the result!",
          content: `Given this table called **Product**:

| ProductID | Name | Category | Price |
|---|---|---|---|
| 1 | Laptop | Electronics | 899.99 |
| 2 | Mouse | Electronics | 24.99 |
| 3 | Desk | Furniture | 149.99 |
| 4 | Keyboard | Electronics | 59.99 |
| 5 | Chair | Furniture | 199.99 |

What does this query return?
\`\`\`
SELECT Name, Price FROM Product WHERE Category = 'Electronics'
\`\`\``,
          options: [
            'Laptop (899.99), Mouse (24.99), Keyboard (59.99)',
            'Laptop (899.99), Mouse (24.99), Desk (149.99), Keyboard (59.99), Chair (199.99)',
            'Electronics, Electronics, Electronics',
            'Laptop, Mouse, Desk, Keyboard, Chair'
          ],
          answer: 0,
          explanation: 'The query selects Name and Price (not all fields) where Category equals \'Electronics\'. Three products match: Laptop (899.99), Mouse (24.99), and Keyboard (59.99). Desk and Chair are Furniture, so they are excluded by the WHERE clause.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: `Using the Student table, which SQL correctly retrieves the **names** of all students in **Year 10**?

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |`,
          options: [
            'SELECT * FROM Student WHERE Year = 10',
            'SELECT Name FROM Student WHERE Year = 10',
            'SELECT Name WHERE Year = 10 FROM Student',
            'SELECT Year FROM Student WHERE Name = 10'
          ],
          answer: 1,
          explanation: 'We want only **names** (not all fields), so \`SELECT Name\` is correct, not \`SELECT *\`. The FROM clause must come before WHERE. Option C has them in the wrong order. Option D selects the wrong field and has an incorrect condition.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the SQL query to find the names and prices of all products that cost more than 50.',
          codeTemplate: '___ Name, Price ___ Product ___ Price > 50',
          fillBlanks: [
            { id: 1, answer: "SELECT", options: ["SELECT", "GET", "FIND", "SHOW"] },
            { id: 2, answer: "FROM", options: ["FROM", "IN", "OF", "TABLE"] },
            { id: 3, answer: "WHERE", options: ["WHERE", "WHEN", "IF", "HAVING"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "WHERE Conditions",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-operators",
          type: "explain",
          title: "🎯 Comparison Operators",
          content: `SQL uses these comparison operators in WHERE clauses:

| Operator | Meaning | Example |
|---|---|---|
| \`=\` | Equal to | \`WHERE Age = 16\` |
| \`<>\` | Not equal to | \`WHERE Grade <> 'F'\` |
| \`<\` | Less than | \`WHERE Price < 10\` |
| \`>\` | Greater than | \`WHERE Age > 15\` |
| \`<=\` | Less than or equal | \`WHERE Mark <= 50\` |
| \`>=\` | Greater than or equal | \`WHERE Year >= 10\` |

Examples with the Student table:

\`\`\`
// Students who are NOT in Year 10
SELECT Name FROM Student WHERE Year <> 10

// Students aged 16 or older
SELECT Name FROM Student WHERE Age >= 16

// Students with grades before 'C' (alphabetically)
SELECT Name FROM Student WHERE Grade < 'C'
\`\`\`

Note: In SQL, \`<>\` means "not equal to" (some databases also accept \`!=\`, but CIE uses \`<>\`).`
        },
        {
          id: "ch3-andor",
          type: "explain",
          title: "🔗 Combining Conditions: AND & OR",
          content: `You can combine multiple conditions with **AND** and **OR**:

**AND** - Both conditions must be true:
\`\`\`
SELECT Name FROM Student WHERE Age >= 15 AND Grade = 'A'
\`\`\`
Returns students who are 15+ **and** have grade A.

**OR** - At least one condition must be true:
\`\`\`
SELECT Name FROM Student WHERE Year = 10 OR Year = 11
\`\`\`
Returns students in Year 10 **or** Year 11.

Using the Student table:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

\`\`\`
SELECT Name FROM Student WHERE Age >= 16 AND Grade = 'B'
\`\`\`
Result: **Bob, Eve** (both are 16+ AND have grade B)

\`\`\`
SELECT Name FROM Student WHERE Grade = 'A' OR Grade = 'C'
\`\`\`
Result: **Alice, Carol, Dave** (grade is A or C)`
        },
        {
          id: "ch3-like",
          type: "explain",
          title: "🔎 Pattern Matching with LIKE",
          content: `The **LIKE** keyword searches for patterns in text fields. It uses **wildcards**:

| Wildcard | Meaning | Example |
|---|---|---|
| \`%\` | Any number of characters (including zero) | \`'A%'\` matches "Alice", "Amy", "A" |
| \`_\` | Exactly one character | \`'_ob'\` matches "Bob", "Rob" |

Examples:
\`\`\`
// Names starting with 'A'
SELECT Name FROM Student WHERE Name LIKE 'A%'

// Names ending with 'e'
SELECT Name FROM Student WHERE Name LIKE '%e'

// Names containing 'ar'
SELECT Name FROM Student WHERE Name LIKE '%ar%'

// Names that are exactly 3 characters long
SELECT Name FROM Student WHERE Name LIKE '___'
\`\`\`

Using the Student table:
- \`WHERE Name LIKE 'A%'\` returns: **Alice**
- \`WHERE Name LIKE '%e'\` returns: **Alice, Dave, Eve**
- \`WHERE Name LIKE '___'\` returns: **Bob, Eve** (exactly 3 characters)

LIKE is **case-sensitive** in many database systems, so \`'a%'\` and \`'A%'\` may give different results.`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 How many rows?",
          content: `Given this table called **Student**:

| StudentID | Name | Age | Year | Grade |
|---|---|---|---|---|
| 1001 | Alice | 15 | 10 | A |
| 1002 | Bob | 16 | 11 | B |
| 1003 | Carol | 15 | 10 | A |
| 1004 | Dave | 17 | 11 | C |
| 1005 | Eve | 16 | 10 | B |

How many rows does this query return?
\`\`\`
SELECT Name FROM Student WHERE Age >= 16 AND Year = 11
\`\`\``,
          options: [
            '1 row (Bob only)',
            '2 rows (Bob, Dave)',
            '3 rows (Bob, Dave, Eve)',
            '4 rows (Bob, Carol, Dave, Eve)'
          ],
          answer: 1,
          explanation: 'We need Age >= 16 **AND** Year = 11. Checking each record: Alice (15, Yr10 - no), Bob (16, Yr11 - yes!), Carol (15, Yr10 - no), Dave (17, Yr11 - yes!), Eve (16, Yr10 - no, Year is 10 not 11). Only **Bob and Dave** satisfy both conditions, so **2 rows** are returned.'
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which SQL query correctly finds all students aged **between 14 and 16** (inclusive)?',
          options: [
            'SELECT * FROM Student WHERE Age > 14 AND Age < 16',
            'SELECT * FROM Student WHERE Age >= 14 OR Age <= 16',
            'SELECT * FROM Student WHERE Age >= 14 AND Age <= 16',
            'SELECT * FROM Student WHERE Age BETWEEN 14 AND 16'
          ],
          answer: 2,
          explanation: 'To find ages between 14 and 16 **inclusive**, we need \`Age >= 14 AND Age <= 16\`. Option A uses > and < which excludes 14 and 16 themselves. Option B uses OR, which would match almost every student (anyone 14+ or anyone 16-, which is everyone). Option D uses BETWEEN which some databases support, but the standard CIE answer uses AND with >= and <=.'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the WHERE clause to find students who are in Year 10 AND have a grade of A or B.',
          codeTemplate: 'SELECT Name FROM Student WHERE Year = 10 ___ (Grade = \'A\' ___ Grade = \'B\')',
          fillBlanks: [
            { id: 1, answer: "AND", options: ["AND", "OR", "NOT", "WHERE"] },
            { id: 2, answer: "OR", options: ["OR", "AND", "NOT", "LIKE"] }
          ]
        },
      ]
    },
  ]
}
