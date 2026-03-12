// ============================================
// Pseudocode Lesson 7: Loops 2 (English)
// CIE-style REPEAT...UNTIL and nested loops
// ============================================

import { LessonData } from '../types'

export const pseudoLesson7EnData: LessonData = {
  id: "pseudo-7",
  title: "Loops 2",
  emoji: "🔄",
  description: "REPEAT...UNTIL, nested loops!",
  chapters: [
    {
      id: "ch1",
      title: "REPEAT...UNTIL",
      emoji: "🔂",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔂 REPEAT...UNTIL Loop!",
          content: `There's a third type of loop: **REPEAT...UNTIL**!

\`\`\`
REPEAT
    INPUT password
UNTIL password = "1234"
\`\`\`

This keeps asking for a password until the correct one is entered.

Key difference from WHILE:
- **WHILE** checks the condition **before** running (may run 0 times)
- **REPEAT...UNTIL** checks the condition **after** running (always runs **at least once**)

The loop stops when the condition becomes **TRUE**.`
        },
        {
          id: "ch1-detail",
          type: "explain",
          title: "📋 How REPEAT...UNTIL Works",
          content: `Let's trace through an example:

\`\`\`
num ← 1
REPEAT
    OUTPUT num
    num ← num + 1
UNTIL num > 3
\`\`\`

| Round | num (start) | OUTPUT | num (end) | num > 3? |
|---|---|---|---|---|
| 1st | 1 | 1 | 2 | FALSE -- keep going |
| 2nd | 2 | 2 | 3 | FALSE -- keep going |
| 3rd | 3 | 3 | 4 | TRUE -- stop! |

Output:
\`\`\`
1
2
3
\`\`\`

Notice: the condition is checked **after** the loop body runs, and the loop stops when the condition becomes **TRUE** (opposite of WHILE!).`
        },
        {
          id: "ch1-compare",
          type: "explain",
          title: "⚖️ WHILE vs REPEAT...UNTIL",
          content: `These two loops look similar but behave differently:

**WHILE** -- condition checked FIRST:
\`\`\`
x ← 10
WHILE x < 5
    OUTPUT x
ENDWHILE
\`\`\`
Output: **(nothing!)** -- condition is FALSE, loop never runs.

**REPEAT...UNTIL** -- condition checked LAST:
\`\`\`
x ← 10
REPEAT
    OUTPUT x
UNTIL x < 5
\`\`\`
Output: **10** -- runs once, then checks, and condition is already TRUE, so it stops.

| | WHILE | REPEAT...UNTIL |
|---|---|---|
| Checks condition | Before loop body | After loop body |
| Minimum runs | 0 times | 1 time |
| Loop ends when | Condition is FALSE | Condition is TRUE |`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
count ← 5
REPEAT
    OUTPUT count
    count ← count - 2
UNTIL count <= 0
\`\`\``,
          options: [
            '5 3 1',
            '5 3',
            '5 3 1 -1',
            '5'
          ],
          answer: 0,
          explanation: 'Round 1: output 5, count=3 (3<=0? FALSE). Round 2: output 3, count=1 (1<=0? FALSE). Round 3: output 1, count=-1 (-1<=0? TRUE -- stop!). Output: **5 3 1**.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the Blank!",
          content: 'Complete the loop so it keeps asking for input until the user types "yes".',
          code: '___\n    OUTPUT "Continue? (yes/no)"\n    INPUT response\n___ response = "yes"',
          fillBlanks: [
            { id: 1, answer: "REPEAT", options: ["REPEAT", "WHILE", "FOR", "LOOP"] },
            { id: 2, answer: "UNTIL", options: ["UNTIL", "ENDWHILE", "ENDREPEAT", "WHILE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Nested Loops & Choosing",
      emoji: "🪆",
      steps: [
        {
          id: "ch2-nested",
          type: "explain",
          title: "🪆 Nested Loops!",
          content: `You can put a loop **inside** another loop. This is called **nesting**.

\`\`\`
FOR row ← 1 TO 3
    FOR col ← 1 TO 4
        OUTPUT "* "
    NEXT col
    OUTPUT ""
NEXT row
\`\`\`

Output:
\`\`\`
* * * *
* * * *
* * * *
\`\`\`

How it works:
- The **outer loop** (row) runs 3 times
- For **each** outer loop, the **inner loop** (col) runs 4 times
- Total outputs: 3 x 4 = **12** stars!`
        },
        {
          id: "ch2-nested-example",
          type: "explain",
          title: "📋 Multiplication Table",
          content: `Nested loops are perfect for tables:

\`\`\`
FOR i ← 1 TO 3
    FOR j ← 1 TO 3
        OUTPUT i, " x ", j, " = ", i * j
    NEXT j
NEXT i
\`\`\`

Output:
\`\`\`
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
\`\`\`

The outer loop controls the **row** (i), and the inner loop controls the **column** (j). Every combination runs!`
        },
        {
          id: "ch2-choosing",
          type: "explain",
          title: "🎯 Choosing the Right Loop",
          content: `How do you pick the right loop? Use this guide:

**FOR** loop:
- You know **exactly** how many times to repeat
- Example: "Print numbers 1 to 100"

**WHILE** loop:
- You do NOT know how many times to repeat
- The loop might need to run **0 times**
- Example: "Keep reading until end of file"

**REPEAT...UNTIL** loop:
- You do NOT know how many times to repeat
- The loop must run **at least 1 time**
- Example: "Ask for a password until correct"

Quick decision:
1. Know the count? -- Use **FOR**
2. Might skip entirely? -- Use **WHILE**
3. Must run at least once? -- Use **REPEAT...UNTIL**`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
FOR i ← 1 TO 3
    FOR j ← 1 TO i
        OUTPUT "* "
    NEXT j
    OUTPUT ""
NEXT i
\`\`\``,
          options: [
            '*\n* *\n* * *',
            '* * *\n* * *\n* * *',
            '* * *\n* *\n*',
            '*\n*\n*'
          ],
          answer: 0,
          explanation: 'When i=1, inner loop runs 1 time (one star). When i=2, inner loop runs 2 times (two stars). When i=3, inner loop runs 3 times (three stars). This creates a **triangle pattern**!'
        },
      ]
    }
  ]
}
