// ============================================
// Pseudocode Lesson 19: Trace Table (English)
// CIE Style Pseudocode - Track variable values line by line!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson19EnData: LessonData = {
  id: "pseudo-19",
  title: "Trace Table",
  emoji: "📋",
  description: "Track variable values line by line!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Trace Table?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What is a Trace Table?",
          content: `A **trace table** is a technique used to **track the values of variables** as a program executes, line by line.

It is like being a detective - you follow the code step by step and write down what each variable holds at each point!

**Why use trace tables?**
- To **understand** how an algorithm works
- To **find bugs** (errors) in code
- To **predict the output** of a program
- They appear frequently on the **IGCSE exam**!

A trace table has:
- **Columns** for each variable (and sometimes OUTPUT)
- **Rows** for each step of execution

| Step | x | y | OUTPUT |
|---|---|---|---|
| 1 | 5 | - | - |
| 2 | 5 | 3 | - |
| 3 | 8 | 3 | - |
| 4 | 8 | 3 | 8 |

Each row shows what changed at that step.`
        },
        {
          id: "ch1-simple",
          type: "explain",
          title: "📝 Simple Trace Table Example",
          content: `Let's trace this simple program:

\`\`\`
DECLARE a : INTEGER
DECLARE b : INTEGER
a ← 10
b ← 3
a ← a + b
b ← a - b
OUTPUT a
OUTPUT b
\`\`\`

| Step | Line | a | b | OUTPUT |
|---|---|---|---|---|
| 1 | a ← 10 | 10 | - | |
| 2 | b ← 3 | 10 | 3 | |
| 3 | a ← a + b | 13 | 3 | |
| 4 | b ← a - b | 13 | 10 | |
| 5 | OUTPUT a | 13 | 10 | 13 |
| 6 | OUTPUT b | 13 | 10 | 10 |

**Key rules for trace tables:**
- Only write a value when it **changes**
- Use **-** for variables that have not been assigned yet
- Show the OUTPUT column when something is printed
- Work through the code **in order**, one line at a time`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: "What is the main purpose of a trace table?",
          options: [
            'To make code run faster',
            'To track variable values as code executes line by line',
            'To write pseudocode more efficiently',
            'To convert pseudocode to a programming language'
          ],
          answer: 1,
          explanation: 'A trace table **tracks the values of variables** step by step as the code runs. It helps you understand, debug, and predict what a program will do. This is a key skill for the IGCSE Computer Science exam!'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Use a trace table to find the output:

\`\`\`
DECLARE x : INTEGER
DECLARE y : INTEGER
x ← 8
y ← 2
x ← x - y
y ← x * y
OUTPUT y
\`\`\``,
          options: [
            '2',
            '6',
            '12',
            '16'
          ],
          answer: 2,
          explanation: 'Trace: x=8, y=2. Then x = 8-2 = 6. Then y = 6*2 = 12. OUTPUT y = **12**. The trace table: x goes 8 → 6, y goes 2 → 12.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the trace table for: a ← 5, b ← 3, a ← a * b, b ← a + b.',
          codeTemplate: '// a ← 5     → a = 5, b = -\n// b ← 3     → a = 5, b = 3\n// a ← a * b → a = ___, b = 3\n// b ← a + b → a = 15, b = ___\n// OUTPUT a + b → ___',
          fillBlanks: [
            { id: 1, answer: "15", options: ["15", "8", "5", "3"] },
            { id: 2, answer: "18", options: ["18", "15", "8", "20"] },
            { id: 3, answer: "33", options: ["33", "18", "15", "30"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Trace Tables for Loops",
      emoji: "🔁",
      steps: [
        {
          id: "ch2-forloop",
          type: "explain",
          title: "🔁 Tracing a FOR Loop",
          content: `Trace tables become really useful with **loops**! Let's trace:

\`\`\`
DECLARE total : INTEGER
total ← 0

FOR i ← 1 TO 4
    total ← total + i
NEXT i

OUTPUT total
\`\`\`

| Step | i | total | OUTPUT |
|---|---|---|---|
| 1 | - | 0 | |
| 2 | 1 | 1 | |
| 3 | 2 | 3 | |
| 4 | 3 | 6 | |
| 5 | 4 | 10 | |
| 6 | - | 10 | 10 |

How we calculated:
- i=1: total = 0 + 1 = **1**
- i=2: total = 1 + 2 = **3**
- i=3: total = 3 + 3 = **6**
- i=4: total = 6 + 4 = **10**

This algorithm calculates 1 + 2 + 3 + 4 = **10**.`
        },
        {
          id: "ch2-whileloop",
          type: "explain",
          title: "🔄 Tracing a WHILE Loop",
          content: `Now let's trace a WHILE loop:

\`\`\`
DECLARE n : INTEGER
DECLARE count : INTEGER
n ← 64
count ← 0

WHILE n > 1
    n ← n DIV 2
    count ← count + 1
ENDWHILE

OUTPUT count
\`\`\`

| Step | n | count | n > 1? | OUTPUT |
|---|---|---|---|---|
| 1 | 64 | 0 | - | |
| 2 | 32 | 1 | Yes | |
| 3 | 16 | 2 | Yes | |
| 4 | 8 | 3 | Yes | |
| 5 | 4 | 4 | Yes | |
| 6 | 2 | 5 | Yes | |
| 7 | 1 | 6 | No → exit | |
| 8 | 1 | 6 | - | 6 |

The loop halves n each time until it reaches 1. The count tells us **how many times we halved** 64 to get to 1, which is **6** (since 2^6 = 64).`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Trace this WHILE loop and predict the output:

\`\`\`
DECLARE x : INTEGER
x ← 100
DECLARE count : INTEGER
count ← 0

WHILE x >= 10
    x ← x - 15
    count ← count + 1
ENDWHILE

OUTPUT count
OUTPUT x
\`\`\``,
          options: [
            'count=6, x=10',
            'count=7, x=-5',
            'count=6, x=-5',
            'count=7, x=10'
          ],
          answer: 0,
          explanation: 'Trace: x=100→85→70→55→40→25→10(count=6, x>=10 still true)→x=10-15=-5(count=7, x<10 exit). Wait, let us retrace carefully: x=100,count=0. Loop: x=85,c=1. x=70,c=2. x=55,c=3. x=40,c=4. x=25,c=5. x=10,c=6. Check 10>=10? Yes! x=-5,c=7. Check -5>=10? No. Output: count=**7**, x=**-5**.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'When tracing a FOR loop `FOR i ← 1 TO 5`, how many rows does the loop body add to the trace table?',
          options: [
            '4 rows',
            '5 rows',
            '6 rows',
            'It depends on the code inside the loop'
          ],
          answer: 1,
          explanation: 'The loop runs for i = 1, 2, 3, 4, 5 - that is **5 iterations**. Each iteration adds at least one row to the trace table. The loop variable i takes values 1 through 5 inclusive, so 5 rows for the loop body.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the trace table for this FOR loop.',
          codeTemplate: '// FOR i ← 1 TO 3\n//     result ← result * i\n// NEXT i\n// result starts at 1\n\n// i=1: result = 1 * 1 = ___\n// i=2: result = 1 * 2 = ___\n// i=3: result = 2 * 3 = ___',
          fillBlanks: [
            { id: 1, answer: "1", options: ["1", "0", "2", "3"] },
            { id: 2, answer: "2", options: ["2", "3", "4", "1"] },
            { id: 3, answer: "6", options: ["6", "9", "5", "3"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Trace Tables for Algorithms",
      emoji: "🔬",
      steps: [
        {
          id: "ch3-search",
          type: "explain",
          title: "🔬 Tracing a Search Algorithm",
          content: `Let's trace a **linear search** for value 8 in array [3, 8, 5, 1]:

\`\`\`
DECLARE found : INTEGER
found ← -1
FOR i ← 1 TO 4
    IF data[i] = 8 THEN
        found ← i
    ENDIF
NEXT i
OUTPUT found
\`\`\`

| Step | i | data[i] | data[i] = 8? | found | OUTPUT |
|---|---|---|---|---|---|
| 1 | - | - | - | -1 | |
| 2 | 1 | 3 | No | -1 | |
| 3 | 2 | 8 | Yes | 2 | |
| 4 | 3 | 5 | No | 2 | |
| 5 | 4 | 1 | No | 2 | |
| 6 | - | - | - | 2 | 2 |

The trace table shows clearly that the target (8) was found at **position 2**. Adding a condition column (data[i] = 8?) makes the trace table easier to follow!`
        },
        {
          id: "ch3-sort",
          type: "explain",
          title: "📊 Tracing a Sort (Bubble Sort Pass)",
          content: `Let's trace one pass of **bubble sort** on [4, 2, 7, 1]:

\`\`\`
FOR j ← 1 TO 3
    IF arr[j] > arr[j + 1] THEN
        temp ← arr[j]
        arr[j] ← arr[j + 1]
        arr[j + 1] ← temp
    ENDIF
NEXT j
\`\`\`

| j | arr[j] | arr[j+1] | Swap? | Array state |
|---|---|---|---|---|
| 1 | 4 | 2 | Yes (4>2) | [2, 4, 7, 1] |
| 2 | 4 | 7 | No (4<7) | [2, 4, 7, 1] |
| 3 | 7 | 1 | Yes (7>1) | [2, 4, 1, 7] |

For sorting algorithms, the trace table often shows:
- The **comparison** being made
- Whether a **swap** happened
- The **array state** after each step

This format is very common in IGCSE exam questions!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Trace this code and find the output:

\`\`\`
DECLARE arr : ARRAY[1:5] OF INTEGER
arr[1] ← 10
arr[2] ← 25
arr[3] ← 5
arr[4] ← 30
arr[5] ← 15

DECLARE max : INTEGER
DECLARE maxPos : INTEGER
max ← arr[1]
maxPos ← 1

FOR i ← 2 TO 5
    IF arr[i] > max THEN
        max ← arr[i]
        maxPos ← i
    ENDIF
NEXT i

OUTPUT maxPos
\`\`\``,
          options: [
            '1',
            '2',
            '3',
            '4'
          ],
          answer: 3,
          explanation: 'Trace: max=10, maxPos=1. i=2: 25>10, max=25, maxPos=2. i=3: 5>25? No. i=4: 30>25, max=30, maxPos=4. i=5: 15>30? No. Output maxPos = **4**. The maximum value (30) is at position 4.'
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Exam Tip!",
          content: 'On the IGCSE exam, you are asked to complete a trace table. What is the MOST important thing to remember?',
          options: [
            'Write values in every cell, even if they have not changed',
            'Only record a variable value when it actually changes',
            'Always start from the last line of code',
            'You only need to trace loops, not IF statements'
          ],
          answer: 1,
          explanation: 'In a trace table, you should only write a new value for a variable **when it changes**. If a variable stays the same, you can leave that cell empty or repeat the value. The key is to accurately show **when and how** values change!'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the trace table values for binary search. Array: [2, 5, 8, 12, 16], target = 5.',
          codeTemplate: '// Step 1: low=1, high=5, mid=(1+5) DIV 2 = ___\n//   arr[3]=8, 8 > 5, so high = mid - 1 = ___\n// Step 2: low=1, high=2, mid=(1+2) DIV 2 = ___\n//   arr[1]=2, 2 < 5, so low = mid + 1 = 2\n// Step 3: low=2, high=2, mid=2, arr[2]=5, FOUND!',
          fillBlanks: [
            { id: 1, answer: "3", options: ["3", "2", "4", "5"] },
            { id: 2, answer: "2", options: ["2", "3", "4", "1"] },
            { id: 3, answer: "1", options: ["1", "2", "3", "0"] }
          ]
        },
      ]
    },
  ]
}
