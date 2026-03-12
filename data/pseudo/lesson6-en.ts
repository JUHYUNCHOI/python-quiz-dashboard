// ============================================
// Pseudocode Lesson 6: Loops 1 (English)
// CIE-style FOR and WHILE loops
// ============================================

import { LessonData } from '../types'

export const pseudoLesson6EnData: LessonData = {
  id: "pseudo-6",
  title: "Loops 1",
  emoji: "🔁",
  description: "FOR and WHILE loops!",
  chapters: [
    {
      id: "ch1",
      title: "FOR Loops",
      emoji: "🔢",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔢 Repeating with FOR!",
          content: `Sometimes you need to repeat something a **specific number of times**.

That's what **FOR loops** are for!

\`\`\`
FOR i ← 1 TO 5
    OUTPUT i
NEXT i
\`\`\`

Output:
\`\`\`
1
2
3
4
5
\`\`\`

The loop runs from 1 to 5, and \`i\` changes each time.
- **FOR** starts the loop
- **NEXT i** goes back to the top with the next value`
        },
        {
          id: "ch1-detail",
          type: "explain",
          title: "📋 How FOR Loops Work",
          content: `Let's break it down step by step:

\`\`\`
FOR counter ← 1 TO 3
    OUTPUT "Hello!"
NEXT counter
\`\`\`

| Step | counter | Action |
|---|---|---|
| 1st | 1 | OUTPUT "Hello!" |
| 2nd | 2 | OUTPUT "Hello!" |
| 3rd | 3 | OUTPUT "Hello!" |

Output:
\`\`\`
Hello!
Hello!
Hello!
\`\`\`

Key rules:
- The counter **starts** at the first number (1)
- It **increases by 1** each time
- It **stops** after reaching the last number (3)
- Always close with **NEXT** followed by the counter name!`
        },
        {
          id: "ch1-step",
          type: "explain",
          title: "⏩ Using STEP",
          content: `You can change how much the counter increases using **STEP**:

\`\`\`
FOR i ← 0 TO 10 STEP 2
    OUTPUT i
NEXT i
\`\`\`

Output:
\`\`\`
0
2
4
6
8
10
\`\`\`

The counter goes up by **2** each time instead of 1!

You can also count backwards:
\`\`\`
FOR i ← 5 TO 1 STEP -1
    OUTPUT i
NEXT i
\`\`\`

Output: 5, 4, 3, 2, 1 -- a countdown!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
total ← 0
FOR i ← 1 TO 4
    total ← total + i
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '4',
            '10',
            '1 2 3 4',
            '0'
          ],
          answer: 1,
          explanation: 'The loop adds each value of i to total: 0+1=1, 1+2=3, 3+3=6, 6+4=**10**. Then it outputs 10.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the Blank!",
          content: 'Complete the FOR loop to print numbers 1 through 10.',
          code: 'FOR i ← 1 ___ 10\n    OUTPUT i\n___ i',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "UPTO", "THROUGH"] },
            { id: 2, answer: "NEXT", options: ["NEXT", "END", "LOOP", "CONTINUE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "WHILE Loops",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔄 Repeating with WHILE!",
          content: `What if you don't know **how many times** to repeat?

Use a **WHILE loop**! It repeats **as long as** a condition is TRUE.

\`\`\`
count ← 1
WHILE count <= 5
    OUTPUT count
    count ← count + 1
ENDWHILE
\`\`\`

Output:
\`\`\`
1
2
3
4
5
\`\`\`

- **WHILE** checks the condition **before** each loop
- If the condition is FALSE from the start, the loop **never runs**
- Always close with **ENDWHILE**`
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📋 A Practical WHILE Loop",
          content: `WHILE loops are great for user input validation:

\`\`\`
OUTPUT "Enter a positive number:"
INPUT num
WHILE num <= 0
    OUTPUT "Invalid! Try again:"
    INPUT num
ENDWHILE
OUTPUT "You entered: ", num
\`\`\`

This keeps asking until the user enters a positive number!

**Important:** The condition is checked **before** the loop body runs.
If \`num\` is already positive, the loop is skipped entirely.`
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ FOR vs WHILE",
          content: `When should you use each?

**FOR loop** -- when you know the exact number of repeats:
\`\`\`
FOR i ← 1 TO 100
    OUTPUT "Line ", i
NEXT i
\`\`\`
Use when: printing 100 lines, processing 50 items, etc.

**WHILE loop** -- when the number of repeats is unknown:
\`\`\`
WHILE answer <> "quit"
    INPUT answer
ENDWHILE
\`\`\`
Use when: waiting for user input, searching for something, etc.

| | FOR | WHILE |
|---|---|---|
| Repeats known? | Yes | No |
| Counter built-in? | Yes | No (manual) |
| Condition check | N/A | Before each loop |`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
x ← 10
WHILE x > 0
    OUTPUT x
    x ← x - 3
ENDWHILE
\`\`\``,
          options: [
            '10 7 4 1',
            '10 7 4',
            '10 7 4 1 -2',
            '10 9 8 7 6 5 4 3 2 1'
          ],
          answer: 0,
          explanation: 'x starts at 10 and decreases by 3 each time: 10, 7, 4, 1. When x becomes -2, the condition (x > 0) is FALSE, so the loop stops. Output: **10 7 4 1**.'
        },
      ]
    }
  ]
}
