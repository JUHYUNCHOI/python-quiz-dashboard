// ============================================
// Pseudocode Past Paper Practice: Part 3 (English)
// Trace Table, Sorting, Extended Programming
// IGCSE 0478 Paper 2 Style
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP3EnData: LessonData = {
  id: "pseudo-p3",
  title: "Past Paper Practice 3",
  emoji: "📝",
  description: "Part 3 Past Paper Practice!",
  chapters: [
    {
      id: "ch1",
      title: "Trace Table",
      emoji: "📊",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📊 What is a Trace Table?",
          content: `This is a question type that frequently appears in **Q6a / Q7a** of IGCSE Paper 2!

A **Trace Table** is a table that tracks how variable values **change** line by line as a program executes.

Let's look at a simple example:

\`\`\`
Count ← 0
FOR i ← 1 TO 3
    Count ← Count + 2
NEXT i
OUTPUT Count
\`\`\`

| i | Count |
|---|-------|
|   | 0     |
| 1 | 2     |
| 2 | 4     |
| 3 | 6     |

➡️ OUTPUT: **6**

Tips for creating a Trace Table:
- 📌 Create a **column** for every variable
- 📌 Write a new **row** every time a value changes
- 📌 Add a **new row for each iteration** of a loop
- 📌 It's also helpful to track condition results!`
        },
        {
          id: "ch1-code",
          type: "explain",
          title: "📋 Trace Table Problem",
          content: `Let's analyze the following pseudocode. In the exam, you'll be given code like this and asked to create a Trace Table!

\`\`\`
DECLARE X : INTEGER
DECLARE Y : INTEGER
DECLARE Z : INTEGER
X ← 5
Y ← 3
Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z
\`\`\`

Trace Table:

| Iteration | X | Y | Z | X > 0? |
|-----------|---|---|---|--------|
| Initial   | 5 | 3 | 0 |        |
| 1st       | 4 | 3 | 3 | TRUE   |
| 2nd       | 3 | 3 | 6 | TRUE   |
| 3rd       | 2 | 3 | 9 | TRUE   |
| 4th       | 1 | 3 | 12| TRUE   |
| 5th       | 0 | 3 | 15| TRUE   |
| End       |   |   |   | FALSE  |

Follow along one line at a time! 🔍`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🧠 Value of Z After 1st Iteration",
          content: `In the pseudocode above, what is the value of Z **after the 1st iteration**?

\`\`\`
X ← 5, Y ← 3, Z ← 0

WHILE X > 0
    Z ← Z + Y    ← Z = 0 + 3 = ?
    X ← X - 1
ENDWHILE
\`\`\``,
          options: [
            '3',
            '0',
            '5',
            '8'
          ],
          answer: 0,
          explanation: `1st iteration:
- Z ← Z + Y = 0 + 3 = **3**
- X ← X - 1 = 5 - 1 = 4

Z increases by Y (= 3) with each iteration!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "🧠 Value of X After 3rd Iteration",
          content: `What is the value of X **after the 3rd iteration**?

Hint: X decreases by 1 with each iteration.

\`\`\`
Initial: X = 5
After 1st: X = 4
After 2nd: X = 3
After 3rd: X = ?
\`\`\``,
          options: [
            '2',
            '3',
            '1',
            '0'
          ],
          answer: 0,
          explanation: `X decreases by 1 with each iteration:
- Initial: X = 5
- After 1st: X = 4
- After 2nd: X = 3
- After 3rd: X = **2**

When X reaches 0, the condition WHILE X > 0 becomes FALSE and the loop stops!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the Final Output",
          content: `What is the **final OUTPUT** of the following code?

\`\`\`
X ← 5
Y ← 3
Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z
\`\`\`

Complete the Trace Table:

| Iteration | X | Z |
|-----------|---|---|
| Initial   | 5 | 0 |
| 1st       | 4 | 3 |
| 2nd       | 3 | 6 |
| 3rd       | 2 | 9 |
| 4th       | 1 | 12 |
| 5th       | 0 | ? |`,
          options: [
            '15',
            '12',
            '18',
            '5'
          ],
          answer: 0,
          explanation: `After 5 iterations:
- Z = 0 + 3 + 3 + 3 + 3 + 3 = **15**

Z adds Y (= 3) a total of X (= 5) times.
In other words, 3 × 5 = **15**!`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "🧠 Purpose of the Algorithm",
          content: `What **operation** does this algorithm ultimately perform?

\`\`\`
X ← 5, Y ← 3, Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z    // Result: 15
\`\`\`

💡 If you repeatedly add Y a total of X times...?`,
          options: [
            'X * Y (multiplication by repeated addition)',
            'X + Y (sum of two numbers)',
            'X ^ Y (exponentiation)',
            'X MOD Y (remainder)'
          ],
          answer: 0,
          explanation: `Repeatedly adding Y a total of X times is **multiplication**!

Z = Y + Y + Y + ... (X times)
Z = Y × X = 3 × 5 = **15**

This is called **multiplication by repeated addition**.

⚠️ The question "Describe the purpose of this algorithm" appears frequently in exams!`
        }
      ]
    },
    {
      id: "ch2",
      title: "Sorting Algorithm",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔄 Sorting Algorithm Analysis (IGCSE Q6 Style)",
          content: `In the IGCSE exam, you'll be given code with **non-meaningful identifiers** and asked to analyze it!

Analyze the following pseudocode:

\`\`\`
01 DECLARE A[1:10] : STRING
02 DECLARE T : STRING
03 DECLARE C, L : INTEGER
04 L ← 10
05 FOR C ← 1 TO L
06     FOR J ← 1 TO L - 1
07         IF A[J] > A[J + 1]
08             THEN
09                 T ← A[J]
10                 A[J] ← A[J + 1]
11                 A[J + 1] ← T
12             ENDIF
13     NEXT J
14 NEXT C
15 FOR C ← 1 TO L
16     OUTPUT A[C]
17 NEXT C
\`\`\`

Let's analyze step by step what this code does! 🔍

Key points:
- 📌 \`A[J] > A[J + 1]\` → **Compares adjacent elements**
- 📌 Lines 09-11 → **Swap** operation
- 📌 Nested FOR loops → Repeats multiple times`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "🧠 Purpose of the Algorithm",
          content: `What is the **purpose** of the pseudocode above (lines 01-17)?

Hints:
- \`A[J] > A[J + 1]\` compares adjacent elements
- If the condition is met, a **swap** is performed
- This is repeated multiple times`,
          options: [
            'Sort strings in ascending (alphabetical) order',
            'Search for a specific value in the strings',
            'Calculate the total of the array',
            'Remove duplicate values from the array'
          ],
          answer: 0,
          explanation: `This is a **Bubble Sort** algorithm!

A is a STRING array, and in \`A[J] > A[J + 1]\`, the ">" performs an **alphabetical comparison**.

It pushes larger values to the back, sorting in **ascending (alphabetical) order**.

Lines 15-17 **output** the sorted result.`
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🧠 Four Processes",
          content: `This algorithm performs 4 key processes.

\`\`\`
01 DECLARE A[1:10] : STRING    ← Store data
05-14 Nested FOR loops          ← Sorting process
07 IF A[J] > A[J + 1]          ← ???
09-11 T ← A[J] ...             ← ???
15-17 FOR ... OUTPUT A[C]      ← Output
\`\`\`

What is the process at line 07?`,
          options: [
            'Compare adjacent elements',
            'Check the length of the array',
            'Store a value in variable T',
            'Terminate the loop'
          ],
          answer: 0,
          explanation: `Line 07 \`IF A[J] > A[J + 1]\` is the process of **comparing two adjacent elements**!

The 4 processes:
1. 📥 **Input/Store** - Store names in the array
2. 🔍 **Compare** - Compare adjacent elements (line 07)
3. 🔄 **Swap** - Swap if in wrong order (lines 09-11)
4. 📤 **Output** - Output the sorted result (lines 15-17)`
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "🏷️ Meaningful Identifier - Array A",
          content: `Array \`A\` stores and sorts 10 **STRING** values.

What is a suitable **meaningful identifier** for \`A\`?`,
          options: [
            'Names',
            'Data',
            'Array1',
            'X'
          ],
          answer: 0,
          explanation: `**Names** is the most suitable!

Since it's a STRING array that's being sorted, "Names" is the clearest choice.

💡 When suggesting meaningful identifiers in the exam:
- ❌ Single letter (A, T, C) → Not meaningful
- ❌ Too generic (Data, Array1) → Not specific enough
- ✅ Specific and descriptive (Names, StudentNames) → Good!`
        },
        {
          id: "ch2-q4",
          type: "quiz",
          title: "🏷️ Meaningful Identifier - Variable T",
          content: `Variable \`T\` is used to **temporarily store** a value during the swap process.

\`\`\`
09  T ← A[J]           // Temporarily store A[J]
10  A[J] ← A[J + 1]    // Move A[J+1] to A[J]
11  A[J + 1] ← T       // Move temp value to A[J+1]
\`\`\`

What is a suitable **meaningful identifier** for \`T\`?`,
          options: [
            'Temp',
            'Store',
            'Hold',
            'Buffer'
          ],
          answer: 0,
          explanation: `**Temp** (or TempName) is the most suitable!

Because it's a variable that **temporarily** holds a value during a swap.

Improved variable names for the full code:
- A → **Names**
- T → **Temp** (or TempName)
- C → **Counter** (or Pass)
- L → **ListLength** (or NumberOfNames)
- J → **Index** (or Position)`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Complete the Swap Code",
          content: `Complete the **swap** operation in the bubble sort!

A temporary variable T is needed to swap A[J] and A[J+1].`,
          code: 'T ← A[J]\nA[J] ← A[___]\nA[J + 1] ← ___',
          fillBlanks: [
            { id: 1, answer: "J + 1", options: ["J + 1", "J - 1", "J", "L"] },
            { id: 2, answer: "T", options: ["T", "A[J]", "A[J + 1]", "C"] }
          ]
        },
        {
          id: "ch2-q5",
          type: "quiz",
          title: "🧠 How to Improve Code Understanding",
          content: `What are **two ways** to make this algorithm **easier to understand**?

\`\`\`
DECLARE A[1:10] : STRING
DECLARE T : STRING
DECLARE C, L : INTEGER
\`\`\``,
          options: [
            'Use meaningful identifiers + add comments',
            'Declare more variables + add line numbers',
            'Make all variables uppercase + remove whitespace',
            'Change FOR to WHILE + remove indentation'
          ],
          answer: 0,
          explanation: `Two methods:

1. ✅ Use **Meaningful Identifiers**
   - A → Names, T → Temp, C → Counter

2. ✅ Add **Comments**
   - \`// Compare adjacent names and swap\`
   - \`// Output the sorted list of names\`

⚠️ The question "State two ways to make this algorithm easier to understand" appears frequently in exams!`
        }
      ]
    },
    {
      id: "ch3",
      title: "Extended Programming",
      emoji: "🚀",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🚀 Extended Programming Problems (Q10/Q11 Style)",
          content: `In **Q10/Q11** of IGCSE Paper 2, you'll be given a scenario and asked to **write or complete** pseudocode!

📋 **Scenario:**
A school wants to manage exam scores for 5 students.
The scores are stored in a 1D array \`Scores[1:5]\`.

The program should:
1. 📥 **Input** scores with **validation** (range 0-100)
2. 📊 Calculate the **Average**
3. 🏆 Find the **Maximum score (Max)**
4. 📤 **Output** the results

Let's implement each step one at a time!

💡 Exam tip: Questions about **input validation**, **total/average calculation**, and **finding the maximum** appear frequently in these problems!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Complete the Input Validation Code",
          content: `Complete the code that inputs scores for 5 students, accepting only values **between 0 and 100 inclusive**.

This uses a REPEAT...UNTIL structure!`,
          code: 'FOR i ← 1 TO 5\n    REPEAT\n        OUTPUT "Enter score for student ", i\n        INPUT Scores[i]\n    ___ Scores[i] >= 0 ___ Scores[i] <= 100\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "IF", "ENDWHILE"] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] }
          ]
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ Complete the Average & Max Score Code",
          content: `Complete the code to find the Total, Max, and Average.

💡 Key points:
- Max is initialized to Scores[1]
- Each score is compared against Max
- Average = Total / Count`,
          code: 'Total ← 0\nMax ← Scores[1]\nFOR i ← 1 TO 5\n    Total ← Total + Scores[i]\n    IF Scores[i] ___ Max THEN\n        Max ← ___\n    ENDIF\nNEXT i\nAverage ← Total ___ 5',
          fillBlanks: [
            { id: 1, answer: ">", options: [">", "<", ">=", "="] },
            { id: 2, answer: "Scores[i]", options: ["Scores[i]", "Total", "Max", "i"] },
            { id: 3, answer: "/", options: ["/", "*", "DIV", "MOD"] }
          ]
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the Average Calculation Result",
          content: `Given the following scores, what is the value of **Average**?

\`\`\`
Scores[1] = 80
Scores[2] = 65
Scores[3] = 92
Scores[4] = 45
Scores[5] = 78
\`\`\`

Calculation:
\`\`\`
Total = 0
Total = 0 + 80 = 80
Total = 80 + 65 = 145
Total = 145 + 92 = 237
Total = 237 + 45 = 282
Total = 282 + 78 = 360
Average = 360 / 5 = ?
\`\`\``,
          options: [
            '72',
            '360',
            '92',
            '65'
          ],
          answer: 0,
          explanation: `Total = 80 + 65 + 92 + 45 + 78 = **360**
Average = 360 / 5 = **72**

💡 The exam may ask you to show the working out.
Make sure to always **calculate the Total first** and then divide!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "🧠 Why Initialize Max This Way",
          content: `Why do we initialize with \`Max ← Scores[1]\`?

Would \`Max ← 0\` also work?

\`\`\`
Max ← Scores[1]    // Why this way?
FOR i ← 1 TO 5
    IF Scores[i] > Max THEN
        Max ← Scores[i]
    ENDIF
NEXT i
\`\`\``,
          options: [
            'So Max always starts with an actual value from the array (more robust)',
            'Because Scores[1] is always the largest value',
            'Because initializing to 0 would cause an error',
            'No particular reason, just convention'
          ],
          answer: 0,
          explanation: `Initializing with \`Max ← Scores[1]\` ensures Max always starts with an **actual value from the array**.

Using \`Max ← 0\` could cause problems:
- What if all scores were **negative**? (theoretically)
- Max = 0 could be larger than all actual scores!

Initializing with the first element of the array:
- ✅ Always starts with **real data**
- ✅ Works correctly regardless of what values are entered
- ✅ A more **robust** approach!

💡 The exam may ask "Why is Max set to the first element?"!`
        }
      ]
    }
  ]
}
