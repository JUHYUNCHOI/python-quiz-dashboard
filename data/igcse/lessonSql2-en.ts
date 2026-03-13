// ============================================
// IGCSE SQL Past Papers 2 (Advanced)
// COUNT, SUM, AVG, GROUP BY, LIKE (English)
// ============================================

import { LessonData } from '../types'

export const igcseLessonSql2EnData: LessonData = {
  id: "igcse-sql2",
  title: "SQL Past Papers 2",
  emoji: "🗃️",
  description: "IGCSE Paper 2 Advanced SQL Practice!",
  chapters: [
    // ============================================
    // Chapter 1: Aggregate Functions
    // ============================================
    {
      id: "ch1",
      title: "Aggregate Functions",
      emoji: "📊",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "Students Table & Aggregate Functions",
          content: `## 📊 Aggregate Functions

Here is the **Students** table we'll use throughout this lesson:

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

**Aggregate functions** summarise multiple rows into a single value:

- \`COUNT(*)\` - Counts the **number** of rows
- \`SUM(column)\` - Calculates the **total** of values
- \`AVG(column)\` - Calculates the **average** of values
- \`MAX(column)\` - Finds the **maximum** value
- \`MIN(column)\` - Finds the **minimum** value`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Understanding COUNT(*)",
          content: `What value is returned when you run this query on the Students table?

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
          explanation: `\`COUNT(*)\` counts the **total number of rows** in the table.

The Students table has 8 students (S001 to S008), so the result is **8**.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "Predict COUNT + WHERE",
          content: `What is the result of this SQL query?

\`\`\`sql
SELECT COUNT(*)
FROM Students
WHERE Grade = 10;
\`\`\`

Hint: Grade 10 students are Alice, Charlie, Edward, George`,
          options: [
            "4",
            "3",
            "5",
            "2"
          ],
          answer: 0,
          explanation: `Let's find students where Grade = 10:

- Alice (S001) - Grade 10 ✅
- Charlie (S003) - Grade 10 ✅
- Edward (S005) - Grade 10 ✅
- George (S007) - Grade 10 ✅

Total: **4 students**!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "What Does SUM() Do?",
          content: `What does \`SUM(Score)\` calculate?`,
          options: [
            "The total of all Score values",
            "The average of Score values",
            "The number of Score values",
            "The maximum Score value"
          ],
          answer: 0,
          explanation: `\`SUM()\` returns the **total of all values** in the specified column.

\`SUM(Score)\` = 85 + 72 + 91 + 68 + 78 + 95 + 63 + 88 = **640**

Remember: AVG() is for average, COUNT() is for counting, MAX() is for maximum!`
        },
        {
          id: "ch1-predict2",
          type: "predict",
          title: "Predict AVG + WHERE",
          content: `What is the result of this SQL query?

\`\`\`sql
SELECT AVG(Score)
FROM Students
WHERE House = 'Red';
\`\`\`

Hint: Red House students are Alice(85), Charlie(91), Fiona(95)`,
          options: [
            "90.33",
            "85",
            "91",
            "95"
          ],
          answer: 0,
          explanation: `Let's calculate the average Score for Red House:

- Alice: 85
- Charlie: 91
- Fiona: 95

AVG = (85 + 91 + 95) / 3 = 271 / 3 = **90.33...**

\`AVG()\` returns the **mean** (sum divided by count)!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "Blue House Total Score",
          content: `Complete the SQL to find the total score of Blue House students.

Hint: Blue House has Bob(72), Edward(78), Hannah(88) — total = 238`,
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
          title: "GROUP BY and LIKE Pattern Matching",
          content: `## 🔤 GROUP BY

\`GROUP BY\` **groups rows with the same values together**.
It is used with aggregate functions (COUNT, SUM, AVG, etc.)!

\`\`\`sql
SELECT House, COUNT(*)
FROM Students
GROUP BY House;
\`\`\`
This gives the number of students in each House.

## 🔍 LIKE Wildcards

\`LIKE\` performs **pattern matching** to search for strings:

- \`%\` - Matches **any sequence of characters** (zero or more)
- \`_\` - Matches **exactly one character**

| Pattern | Meaning | Example |
|---------|---------|---------|
| \`'S%'\` | Starts with S | Smith, Scott |
| \`'%n'\` | Ends with n | Wilson, Brown |
| \`'%av%'\` | Contains av | Davis, Dave |
| \`'_o%'\` | Second letter is o | Bob, Johnson |`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Understanding LIKE Patterns",
          content: `What does \`LIKE 'S%'\` match?`,
          options: [
            "Strings starting with S",
            "Strings ending with S",
            "Strings containing S",
            "Exactly the letter S"
          ],
          answer: 0,
          explanation: `In the pattern \`'S%'\`:
- **S** = must start with the letter S
- **%** = followed by any characters (zero or more)

Examples: **S**mith ✅, **S**cott ✅, Brown ❌

The \`%\` wildcard means "anything can follow"!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "Predict GROUP BY Result",
          content: `What is the result of this SQL query?

\`\`\`sql
SELECT House, COUNT(*)
FROM Students
GROUP BY House;
\`\`\`

Hint: Check the House column in the Students table!`,
          options: [
            "Blue  3\nGreen 2\nRed   3",
            "Blue  2\nGreen 2\nRed   4",
            "Blue  3\nGreen 3\nRed   2",
            "Blue  2\nGreen 3\nRed   3"
          ],
          answer: 0,
          explanation: `Let's count students in each House:

**Blue**: Bob, Edward, Hannah = **3**
**Green**: Diana, George = **2**
**Red**: Alice, Charlie, Fiona = **3**

\`GROUP BY House\` groups rows with the same House value and calculates COUNT for each group!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "Search Names with LIKE",
          content: `Complete the SQL to find students whose last name starts with 'B'.

Hint: Result should be Alice Brown and Edward Brown`,
          code: "SELECT FirstName, LastName\nFROM Students\nWHERE LastName ___ '___';",
          fillBlanks: [
            { id: 1, answer: "LIKE", options: ["LIKE", "=", "IS", "CONTAINS"] },
            { id: 2, answer: "B%", options: ["B%", "%B", "B*", "*B*"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "GROUP BY + AVG Understanding",
          content: `What does this SQL query return?

\`\`\`sql
SELECT Grade, AVG(Score)
FROM Students
GROUP BY Grade;
\`\`\``,
          options: [
            "Average score for each grade level",
            "All students grouped by grade",
            "Total score for each grade",
            "Number of students in each grade"
          ],
          answer: 0,
          explanation: `This query does two things:

1. \`GROUP BY Grade\` groups rows by Grade
2. \`AVG(Score)\` calculates the average Score for each group

Result:
- Grade 10: (85+91+78+63)/4 = **79.25**
- Grade 11: (72+68+95+88)/4 = **80.75**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "Predict LIKE '%s' Result",
          content: `What is the result of this SQL query?

\`\`\`sql
SELECT LastName
FROM Students
WHERE LastName LIKE '%s';
\`\`\`

Hint: '%s' matches strings that **end with** the letter s`,
          options: [
            "Davis\nDavis",
            "Smith\nSmith",
            "Davis\nSmith",
            "Davis"
          ],
          answer: 0,
          explanation: `\`'%s'\` matches strings that **end with s**:

- Brown ends with n ❌
- Smith ends with h ❌
- Davi**s** ends with s ✅ (Charlie)
- Wilson ends with n ❌
- Taylor ends with r ❌
- Davi**s** ends with s ✅ (Hannah)

Davis appears **twice**! (Charlie Davis and Hannah Davis)`
        }
      ]
    },
    // ============================================
    // Chapter 3: Combined SQL
    // ============================================
    {
      id: "ch3",
      title: "Combined SQL",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "Exam Tips for Complex SQL Queries",
          content: `## 🏆 How to Approach Multi-Part SQL Questions

When solving SQL questions in the exam, think in this order:

### Step 1: What to display? → SELECT
- Identify which columns to output
- Check if aggregate functions (COUNT, SUM, AVG, MAX, MIN) are needed

### Step 2: From where? → FROM
- Identify which table the data comes from

### Step 3: Any conditions? → WHERE
- Check if specific rows need to be filtered
- Use LIKE, comparison operators (>, <, =)

### Step 4: Grouping? → GROUP BY
- Use when you need aggregate results split by a column

### Step 5: Sorting? → ORDER BY
- ASC (ascending) or DESC (descending)

\`\`\`sql
SELECT column_name
FROM table_name
WHERE condition
GROUP BY column_name
ORDER BY column_name ASC/DESC;
\`\`\``
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "Condition + Aggregate Function",
          content: `Complete the SQL to find the number of Grade 10 students with a Score greater than 75.

Hint: Those students are Alice(85), Charlie(91), Edward(78) — 3 students`,
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
          title: "Predict ORDER BY DESC",
          content: `What is the result of this SQL query?

\`\`\`sql
SELECT FirstName, Score
FROM Students
WHERE Grade = 11
ORDER BY Score DESC;
\`\`\`

Hint: Grade 11 students are Bob(72), Diana(68), Fiona(95), Hannah(88)
DESC = descending order (highest first)`,
          options: [
            "Fiona   95\nHannah  88\nBob     72\nDiana   68",
            "Diana   68\nBob     72\nHannah  88\nFiona   95",
            "Bob     72\nDiana   68\nFiona   95\nHannah  88",
            "Fiona   95\nHannah  88\nDiana   68\nBob     72"
          ],
          answer: 0,
          explanation: `Let's solve step by step:

1. \`WHERE Grade = 11\` selects Bob(72), Diana(68), Fiona(95), Hannah(88)
2. \`ORDER BY Score DESC\` sorts by Score in descending order

Result:
- Fiona: **95** (1st)
- Hannah: **88** (2nd)
- Bob: **72** (3rd)
- Diana: **68** (4th)

\`DESC\` means **descending** order (highest to lowest)!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "Finding the Maximum Value",
          content: `Which SQL correctly finds the **highest Score** in the table?`,
          options: [
            "SELECT MAX(Score) FROM Students",
            "SELECT TOP(Score) FROM Students",
            "SELECT HIGHEST(Score) FROM Students",
            "SELECT Score FROM Students ORDER BY Score"
          ],
          answer: 0,
          explanation: `\`MAX()\` is the aggregate function that returns the **largest value** in a column.

\`SELECT MAX(Score) FROM Students\` returns **95** (Fiona's score).

\`TOP\` and \`HIGHEST\` are not standard SQL functions!
The last option only sorts but does not return a single maximum value.`
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "Average Attendance by Grade",
          content: `Complete the SQL to find the average Attendance for each Grade.`,
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
          title: "Why Use GROUP BY?",
          content: `Why must \`GROUP BY\` be used with aggregate functions like COUNT or AVG?`,
          options: [
            "To specify which column to group the results by",
            "To sort the results",
            "To filter the results",
            "To join two tables"
          ],
          answer: 0,
          explanation: `\`GROUP BY\` **groups rows with the same values together**.

For example:
\`\`\`sql
SELECT House, AVG(Score)
FROM Students
GROUP BY House;
\`\`\`
This groups students by House and calculates the average Score for each group.

Sorting uses \`ORDER BY\`, filtering uses \`WHERE\`, and joining tables uses \`JOIN\`!`
        }
      ]
    }
  ]
}
