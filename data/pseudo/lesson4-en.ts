// ============================================
// Pseudocode Lesson 4: Data Types (English)
// ============================================

import { LessonData } from '../types'

export const pseudoLesson4EnData: LessonData = {
  id: "pseudo-4",
  title: "Data Types",
  emoji: "🏷️",
  description: "INTEGER, REAL, STRING, BOOLEAN!",
  chapters: [
    {
      id: "ch1",
      title: "What are Data Types?",
      emoji: "🏷️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🏷️ Why Do We Need Data Types?",
          content: `When you DECLARE a variable, you must say what **type** of data it will hold.

Why? Because the computer needs to know:
- How much **memory** to set aside
- What **operations** are allowed (you can add numbers, but not divide text!)

\`\`\`
DECLARE age : INTEGER
DECLARE name : STRING
\`\`\`

The word after the colon \`:\` is the **data type**.

Think of it like choosing the right container:
| Container | Data Type | What it holds |
|---|---|---|
| Number box | INTEGER | Whole numbers |
| Text box | STRING | Words and sentences |
| Switch | BOOLEAN | TRUE or FALSE |`
        },
        {
          id: "ch1-overview",
          type: "explain",
          title: "📋 The Five CIE Data Types",
          content: `CIE pseudocode has **5 main data types**:

| Type | Description | Example Values |
|---|---|---|
| **INTEGER** | Whole numbers (no decimals) | \`5\`, \`-3\`, \`0\`, \`1000\` |
| **REAL** | Decimal numbers | \`3.14\`, \`-0.5\`, \`9.99\` |
| **STRING** | Text (letters, words, sentences) | \`"Hello"\`, \`"A1B2"\` |
| **CHAR** | A single character | \`'A'\`, \`'7'\`, \`'!'\` |
| **BOOLEAN** | Only TRUE or FALSE | \`TRUE\`, \`FALSE\` |

Each type has its own rules. Let's explore them one by one!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blank!",
          content: "Complete the declaration to store a decimal number like 3.14.",
          code: "DECLARE pi : ___",
          fillBlanks: [
            { id: 1, answer: "REAL", options: ["REAL", "INTEGER", "STRING", "BOOLEAN"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Each Type in Detail",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-numbers",
          type: "explain",
          title: "🔢 INTEGER vs REAL",
          content: `**INTEGER** = whole numbers (no decimal point):
\`\`\`
DECLARE lives : INTEGER
lives ← 3

DECLARE temperature : INTEGER
temperature ← -10
\`\`\`

**REAL** = numbers with decimals:
\`\`\`
DECLARE price : REAL
price ← 9.99

DECLARE height : REAL
height ← 1.75
\`\`\`

Important rule:
- \`5\` is an INTEGER
- \`5.0\` is a REAL

Even though they have the same value, they are **different types**!

When to use which:
| Use INTEGER for | Use REAL for |
|---|---|
| Age, score, count | Price, weight, temperature |
| Number of students | Average, percentage |`
        },
        {
          id: "ch2-text",
          type: "explain",
          title: "🔤 STRING vs CHAR",
          content: `**STRING** = text of any length (use double quotes **" "**):
\`\`\`
DECLARE message : STRING
message ← "Hello, World!"

DECLARE empty : STRING
empty ← ""
\`\`\`

**CHAR** = exactly ONE character (use single quotes **' '**):
\`\`\`
DECLARE grade : CHAR
grade ← 'A'

DECLARE symbol : CHAR
symbol ← '!'
\`\`\`

Key differences:
| STRING | CHAR |
|---|---|
| Double quotes \`"..."\` | Single quotes \`'...'\` |
| Any length | Exactly 1 character |
| \`"Hello"\`, \`"A"\`, \`""\` | \`'H'\`, \`'A'\`, \`'!'\` |

Note: \`"A"\` (STRING) and \`'A'\` (CHAR) are different types even though they look similar!`
        },
        {
          id: "ch2-boolean",
          type: "explain",
          title: "✅ BOOLEAN",
          content: `**BOOLEAN** can only be **TRUE** or **FALSE** -- nothing else!

\`\`\`
DECLARE isRaining : BOOLEAN
isRaining ← TRUE

DECLARE gameOver : BOOLEAN
gameOver ← FALSE
\`\`\`

BOOLEANs are perfect for yes/no situations:
| Variable | Meaning |
|---|---|
| \`isLoggedIn ← TRUE\` | The user is logged in |
| \`hasWon ← FALSE\` | The player has not won yet |
| \`isEven ← TRUE\` | The number is even |

TRUE and FALSE are written **without quotes** -- they are not strings!
- \`isRaining ← TRUE\` is correct (BOOLEAN)
- \`isRaining ← "TRUE"\` is wrong (that's a STRING!)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict: What's wrong?",
          content: `Which line has an **error**?

\`\`\`
DECLARE count : INTEGER
DECLARE name : STRING
DECLARE initial : CHAR
count ← 3.5
name ← "Bob"
initial ← 'B'
\`\`\``,
          options: [
            "Line 4: count is INTEGER but 3.5 is a decimal",
            "Line 5: name should use single quotes",
            "Line 6: initial should use double quotes",
            "There is no error"
          ],
          answer: 0,
          explanation: "`count` is declared as **INTEGER** (whole numbers only), but `3.5` has a decimal point. It should be `DECLARE count : REAL` or use a whole number like `count ← 3`."
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: "Declare a variable for a student's name and whether they passed the exam.",
          code: "DECLARE studentName : ___\nDECLARE passed : ___",
          fillBlanks: [
            { id: 1, answer: "STRING", options: ["STRING", "CHAR", "INTEGER", "BOOLEAN"] },
            { id: 2, answer: "BOOLEAN", options: ["BOOLEAN", "STRING", "INTEGER", "REAL"] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 Final Quiz!",
          content: "Which declaration is **correct** for storing the value `'M'` (a single letter)?",
          options: [
            "DECLARE grade : CHAR",
            "DECLARE grade : STRING",
            "DECLARE grade : INTEGER",
            "DECLARE grade : BOOLEAN"
          ],
          answer: 0,
          explanation: "A single character in single quotes like `'M'` is a **CHAR**. STRING would work for `\"M\"` (double quotes), but CHAR is the most precise type for a single character."
        },
      ]
    },
  ]
}
