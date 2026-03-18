// ============================================
// Pseudocode Lesson 8: Arrays (English)
// CIE Style Pseudocode - Store collections of data!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson8EnData: LessonData = {
  id: "pseudo-8",
  title: "Arrays",
  emoji: "📊",
  description: "DECLARE arrays, indexing!",
  chapters: [
    {
      id: "ch1",
      title: "What are Arrays?",
      emoji: "📊",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📊 What is an Array?",
          content: `An **array** is a variable that stores **multiple values** under one name!

Think of it like a row of numbered boxes:

| Box 1 | Box 2 | Box 3 | Box 4 | Box 5 |
|---|---|---|---|---|
| 10 | 25 | 30 | 15 | 40 |

Instead of creating 5 separate variables like \`num1\`, \`num2\`, \`num3\`... you use **one array** called \`numbers\` and access each value by its **index** (position number).

Arrays are super useful when you need to store a **list** of related data!`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 Declaring an Array",
          content: `In CIE pseudocode, you declare an array using **DECLARE** with the **ARRAY** keyword:

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
\`\`\`

Let's break it down:

| Part | Meaning |
|---|---|
| DECLARE | "I'm creating something!" |
| numbers | The name of the array |
| ARRAY[1:5] | An array with positions **1 to 5** |
| OF INTEGER | Each element stores an **integer** |

**Important:** CIE arrays start at index **1**, not 0!

You can also make arrays of other types:
\`\`\`
DECLARE names : ARRAY[1:3] OF STRING
DECLARE prices : ARRAY[1:10] OF REAL
\`\`\``
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Declare an array called `scores` that holds 6 integers (index 1 to 6).',
          code: '___ scores : ___[1:6] OF ___',
          fillBlanks: [
            { id: 1, answer: "DECLARE", options: ["DECLARE", "CREATE", "ARRAY", "SET"] },
            { id: 2, answer: "ARRAY", options: ["ARRAY", "LIST", "SET", "GROUP"] },
            { id: 3, answer: "INTEGER", options: ["INTEGER", "NUMBER", "INT", "WHOLE"] }
          ]
        },
        {
          id: "ch1-quiz2",
          type: "quiz",
          title: "🧠 Quick Check!",
          content: 'In CIE pseudocode, what is the **first** index of `DECLARE items : ARRAY[1:10] OF STRING`?',
          options: [
            '0',
            '1',
            '10',
            'It depends on the programmer'
          ],
          answer: 1,
          explanation: 'CIE arrays are **1-indexed**! The first element is at index **1**, as specified in `ARRAY[1:10]`. This is different from Python or Java where arrays start at 0.'
        },
      ]
    },
    {
      id: "ch2",
      title: "Using Arrays",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-access",
          type: "explain",
          title: "🔢 Accessing Array Elements",
          content: `You access each element using its **index** in square brackets:

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
numbers[1] ← 10
numbers[2] ← 25
numbers[3] ← 30
OUTPUT numbers[1]
OUTPUT numbers[3]
\`\`\`

Result:
\`\`\`
10
30
\`\`\`

The index tells the computer **which box** to look at:
- \`numbers[1]\` is the **1st** element (value: 10)
- \`numbers[3]\` is the **3rd** element (value: 30)

You can also change a value after setting it:
\`\`\`
numbers[2] ← 99
\`\`\`
Now \`numbers[2]\` is 99 instead of 25!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE letters : ARRAY[1:3] OF STRING
letters[1] ← "A"
letters[2] ← "B"
letters[3] ← "C"
letters[2] ← "Z"
OUTPUT letters[2]
\`\`\``,
          options: [
            '"B"',
            '"Z"',
            '"A"',
            'Error'
          ],
          answer: 1,
          explanation: 'First, `letters[2]` is set to "B". Then it is **overwritten** with "Z". Just like a regular variable, the new value replaces the old one. So the output is **Z**.'
        },
        {
          id: "ch2-loops",
          type: "explain",
          title: "🔁 Looping Through Arrays",
          content: `Arrays and loops are best friends! Use a **FOR** loop to go through every element:

\`\`\`
DECLARE scores : ARRAY[1:5] OF INTEGER
scores[1] ← 85
scores[2] ← 92
scores[3] ← 78
scores[4] ← 95
scores[5] ← 88

FOR i ← 1 TO 5
    OUTPUT scores[i]
NEXT i
\`\`\`

Result:
\`\`\`
85
92
78
95
88
\`\`\`

The variable \`i\` changes from 1 to 5, so \`scores[i]\` accesses each element in order.

This is much better than writing 5 separate OUTPUT statements!`
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the loop to output all 4 elements of the array.',
          code: 'DECLARE names : ARRAY[1:4] OF STRING\nnames[1] ← "Alice"\nnames[2] ← "Bob"\nnames[3] ← "Carol"\nnames[4] ← "Dave"\n\n___ i ← 1 ___ 4\n    OUTPUT names[___]\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "FOR", options: ["FOR", "WHILE", "REPEAT", "LOOP"] },
            { id: 2, answer: "TO", options: ["TO", "UNTIL", "UPTO", "THROUGH"] },
            { id: 3, answer: "i", options: ["i", "1", "names", "4"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE vals : ARRAY[1:4] OF INTEGER
vals[1] ← 2
vals[2] ← 4
vals[3] ← 6
vals[4] ← 8

DECLARE total : INTEGER
total ← 0
FOR i ← 1 TO 4
    total ← total + vals[i]
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '8',
            '20',
            '10',
            '4'
          ],
          answer: 1,
          explanation: 'The loop adds each element to `total`: 0 + 2 = 2, then 2 + 4 = 6, then 6 + 6 = 12, then 12 + 8 = **20**. This is a common pattern for calculating the **sum** of an array!'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "❓ Array index!",
          content: 'In `DECLARE scores : ARRAY[1:5] OF INTEGER`, what is the valid index range?',
          options: ['0 to 4', '1 to 5', '0 to 5', '1 to 4'],
          answer: 1,
          explanation: 'CIE pseudocode arrays **start from 1**! [1:5] means indices 1, 2, 3, 4, 5 are valid.'
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "❓ Array + loop!",
          content: `What is the output?

\`\`\`
DECLARE nums : ARRAY[1:4] OF INTEGER
nums[1] ← 10
nums[2] ← 20
nums[3] ← 30
nums[4] ← 40
total ← 0
FOR i ← 1 TO 4
    total ← total + nums[i]
NEXT i
OUTPUT total
\`\`\``,
          options: ['10', '40', '100', 'Error'],
          answer: 2,
          explanation: '10 + 20 + 30 + 40 = **100**! The FOR loop traverses all array elements and sums them.'
        },
      ]
    },
  ]
}
