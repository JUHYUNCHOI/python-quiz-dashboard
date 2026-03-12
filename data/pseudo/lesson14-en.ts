// ============================================
// Pseudocode Lesson 14: 2D Arrays (English)
// CIE Style Pseudocode - Rows and columns of data!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson14EnData: LessonData = {
  id: "pseudo-14",
  title: "2D Arrays",
  emoji: "📊",
  description: "Grids, tables, and nested loops!",
  chapters: [
    {
      id: "ch1",
      title: "What are 2D Arrays?",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 From 1D to 2D",
          content: `You already know 1D arrays - a single row of boxes:

| [1] | [2] | [3] | [4] |
|---|---|---|---|
| 10 | 20 | 30 | 40 |

A **2D array** is like a **table** with **rows** and **columns**:

|  | Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|---|
| Row 1 | 10 | 20 | 30 | 40 |
| Row 2 | 50 | 60 | 70 | 80 |
| Row 3 | 90 | 15 | 25 | 35 |

Think of it like a **spreadsheet** or a **seating chart**.

To access an element, you need **two** indices:
- The **row** number
- The **column** number

For example, row 2, column 3 = **70**`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📐 Declaring a 2D Array",
          content: `In CIE pseudocode, you declare a 2D array like this:

\`\`\`
DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER
\`\`\`

This creates a grid with:
- **3 rows** (1 to 3)
- **4 columns** (1 to 4)
- Each element is an INTEGER

To **assign** a value:
\`\`\`
grid[1, 1] ← 10
grid[2, 3] ← 70
grid[3, 4] ← 35
\`\`\`

To **read** a value:
\`\`\`
OUTPUT grid[2, 3]
\`\`\`
Output: **70**

The format is always: \`arrayName[row, column]\``
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE grid : ARRAY[1:2, 1:3] OF INTEGER
grid[1, 1] ← 5
grid[1, 2] ← 10
grid[1, 3] ← 15
grid[2, 1] ← 20
grid[2, 2] ← 25
grid[2, 3] ← 30

OUTPUT grid[2, 2]
\`\`\``,
          options: [
            '25',
            '10',
            '20',
            '30'
          ],
          answer: 0,
          explanation: '`grid[2, 2]` accesses row 2, column 2. Looking at the assignments, `grid[2, 2] ← 25`, so the output is **25**.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Declare a 2D array and assign a value to row 3, column 2.',
          codeTemplate: 'DECLARE board : ___[1:3, 1:3] OF INTEGER\nboard[___, ___] ← 99',
          fillBlanks: [
            { id: 1, answer: "ARRAY", options: ["ARRAY", "TABLE", "GRID", "MATRIX"] },
            { id: 2, answer: "3", options: ["3", "1", "2", "0"] },
            { id: 3, answer: "2", options: ["2", "3", "1", "99"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Nested Loops for 2D Arrays",
      emoji: "🔁",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔁 Traversing a 2D Array",
          content: `To go through every element in a 2D array, you need **nested FOR loops** - one loop for rows, one for columns.

\`\`\`
DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER

// Fill the grid
FOR row ← 1 TO 3
    FOR col ← 1 TO 4
        grid[row, col] ← row * col
    NEXT col
NEXT row
\`\`\`

This fills the grid like this:
|  | Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|---|
| Row 1 | 1 | 2 | 3 | 4 |
| Row 2 | 2 | 4 | 6 | 8 |
| Row 3 | 3 | 6 | 9 | 12 |

The **outer loop** controls the **row**, and the **inner loop** controls the **column**. For each row, the inner loop visits every column.`
        },
        {
          id: "ch2-output",
          type: "explain",
          title: "🖨️ Printing a 2D Array",
          content: `Here is how to output all elements of a 2D array:

\`\`\`
DECLARE marks : ARRAY[1:2, 1:3] OF INTEGER
marks[1, 1] ← 85
marks[1, 2] ← 90
marks[1, 3] ← 78
marks[2, 1] ← 92
marks[2, 2] ← 88
marks[2, 3] ← 95

FOR row ← 1 TO 2
    FOR col ← 1 TO 3
        OUTPUT "Row " & row & ", Col " & col & " = " & marks[row, col]
    NEXT col
NEXT row
\`\`\`

Output:
\`\`\`
Row 1, Col 1 = 85
Row 1, Col 2 = 90
Row 1, Col 3 = 78
Row 2, Col 1 = 92
Row 2, Col 2 = 88
Row 2, Col 3 = 95
\`\`\`

The nested loop visits elements in order: all columns of row 1, then all columns of row 2.`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE grid : ARRAY[1:2, 1:2] OF INTEGER
grid[1, 1] ← 1
grid[1, 2] ← 2
grid[2, 1] ← 3
grid[2, 2] ← 4

DECLARE total : INTEGER
total ← 0
FOR row ← 1 TO 2
    FOR col ← 1 TO 2
        total ← total + grid[row, col]
    NEXT col
NEXT row
OUTPUT total
\`\`\``,
          options: [
            '10',
            '4',
            '7',
            '6'
          ],
          answer: 0,
          explanation: 'The nested loop adds all elements: 1 + 2 + 3 + 4 = **10**. This pattern is used to calculate the sum of all values in a 2D array.'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the nested loop to print all elements of a 3x3 grid.',
          codeTemplate: 'FOR row ← 1 ___ 3\n    ___ col ← 1 TO 3\n        OUTPUT grid[___, col]\n    NEXT col\nNEXT row',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "BY", "THROUGH"] },
            { id: 2, answer: "FOR", options: ["FOR", "WHILE", "REPEAT", "LOOP"] },
            { id: 3, answer: "row", options: ["row", "col", "1", "grid"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "2D Array Applications",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-app",
          type: "explain",
          title: "🎯 Real-World 2D Array Examples",
          content: `**Example 1: Student Scores Table**
3 students, each with 4 test scores:

\`\`\`
DECLARE scores : ARRAY[1:3, 1:4] OF INTEGER

// Student 1 scores
scores[1, 1] ← 85
scores[1, 2] ← 90
scores[1, 3] ← 78
scores[1, 4] ← 92

// Calculate average for student 1
DECLARE total : INTEGER
total ← 0
FOR col ← 1 TO 4
    total ← total + scores[1, col]
NEXT col
OUTPUT "Student 1 average: " & total / 4
\`\`\`

Output: **Student 1 average: 86.25**

Notice: to get one student's data, we fix the **row** and loop through **columns**.

**Example 2: Tic-Tac-Toe Board**
\`\`\`
DECLARE board : ARRAY[1:3, 1:3] OF STRING
board[1, 1] ← "X"
board[1, 2] ← "O"
board[1, 3] ← "X"
board[2, 1] ← " "
board[2, 2] ← "X"
board[2, 3] ← "O"
\`\`\`

2D arrays are perfect for grids, boards, and tables!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In a 2D array `scores[1:5, 1:3]` where rows are students and columns are tests, which accesses student 3\'s test 2 score?',
          options: [
            'scores[3, 2]',
            'scores[2, 3]',
            'scores[3][2]',
            'scores[5, 3]'
          ],
          answer: 0,
          explanation: 'The format is `array[row, column]`. Student 3 is row 3, test 2 is column 2. So the answer is `scores[3, 2]`. Remember: row first, column second!'
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE grid : ARRAY[1:3, 1:3] OF INTEGER
FOR row ← 1 TO 3
    FOR col ← 1 TO 3
        grid[row, col] ← row + col
    NEXT col
NEXT row

OUTPUT grid[2, 3]
OUTPUT grid[3, 1]
\`\`\``,
          options: [
            '5  then  4',
            '6  then  3',
            '5  then  3',
            '6  then  4'
          ],
          answer: 0,
          explanation: '`grid[2, 3] = 2 + 3 = 5`. `grid[3, 1] = 3 + 1 = 4`. The output is **5** then **4**.'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the code to find the largest value in a 2D array.',
          codeTemplate: 'DECLARE grid : ARRAY[1:3, 1:3] OF INTEGER\nDECLARE maxVal : INTEGER\nmaxVal ← grid[1, 1]\n\nFOR row ← 1 TO 3\n    FOR col ← 1 TO 3\n        ___ grid[row, col] > maxVal ___\n            maxVal ← grid[___, col]\n        ENDIF\n    NEXT col\nNEXT row\nOUTPUT maxVal',
          fillBlanks: [
            { id: 1, answer: "IF", options: ["IF", "WHILE", "WHEN", "CHECK"] },
            { id: 2, answer: "THEN", options: ["THEN", "DO", "BEGIN", "RUN"] },
            { id: 3, answer: "row", options: ["row", "col", "maxVal", "1"] }
          ]
        }
      ]
    }
  ]
}
