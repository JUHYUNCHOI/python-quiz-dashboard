// ============================================
// Pseudocode Lesson 11: Parameters (English)
// CIE Style Pseudocode - BYVAL vs BYREF!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson11EnData: LessonData = {
  id: "pseudo-11",
  title: "Parameters",
  emoji: "📦",
  description: "BYVAL vs BYREF parameter passing!",
  chapters: [
    {
      id: "ch1",
      title: "Pass by Value (BYVAL)",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What are Parameters?",
          content: `When you call a procedure or function, you can pass **data** into it using **parameters**.

There are two ways to pass parameters:
1. **BYVAL** (By Value) - sends a **copy** of the data
2. **BYREF** (By Reference) - sends the **original** data itself

This matters because it determines whether the original variable **changes** or **stays the same** after the procedure runs!

Let's start with BYVAL.`
        },
        {
          id: "ch1-byval",
          type: "explain",
          title: "📦 BYVAL: Passing a Copy",
          content: `**BYVAL** sends a **copy** of the variable to the procedure. The original variable is **not changed**.

\`\`\`
PROCEDURE AddTen(BYVAL num : INTEGER)
    num ← num + 10
    OUTPUT "Inside: " & num
ENDPROCEDURE

DECLARE x : INTEGER
x ← 5
CALL AddTen(x)
OUTPUT "Outside: " & x
\`\`\`

Output:
\`\`\`
Inside: 15
Outside: 5
\`\`\`

What happened:
- \`x\` is 5
- A **copy** of x (value 5) is sent to the procedure as \`num\`
- Inside the procedure, \`num\` becomes 15
- But the **original** \`x\` is still 5!

Think of it like **photocopying** a document - writing on the photocopy does not change the original!`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'When a parameter is passed BYVAL, what happens to the original variable?',
          options: [
            'It stays the same (unchanged)',
            'It is changed by the procedure',
            'It is deleted',
            'It becomes zero'
          ],
          answer: 0,
          explanation: 'BYVAL sends a **copy** of the value. The procedure works with the copy, so the **original variable stays the same**. This is the safe, default way to pass data.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What is the output of the last line?

\`\`\`
PROCEDURE DoubleIt(BYVAL n : INTEGER)
    n ← n * 2
ENDPROCEDURE

DECLARE score : INTEGER
score ← 25
CALL DoubleIt(score)
OUTPUT score
\`\`\``,
          options: [
            '25',
            '50',
            '0',
            'Error'
          ],
          answer: 0,
          explanation: 'Since `n` is passed BYVAL, only a copy of `score` is doubled inside the procedure. The original `score` remains **25**.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the procedure that receives a value by copy.',
          codeTemplate: 'PROCEDURE ShowDouble(___ num : INTEGER)\n    num ← num * 2\n    OUTPUT num\nENDPROCEDURE\n\nDECLARE x : INTEGER\nx ← 10\n___ ShowDouble(x)\nOUTPUT x',
          fillBlanks: [
            { id: 1, answer: "BYVAL", options: ["BYVAL", "BYREF", "COPY", "VALUE"] },
            { id: 2, answer: "CALL", options: ["CALL", "RUN", "EXEC", "DO"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Pass by Reference (BYREF)",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔗 BYREF: Passing the Original",
          content: `**BYREF** sends the **actual variable** (not a copy) to the procedure. Changes inside the procedure **do affect** the original!

\`\`\`
PROCEDURE AddTen(BYREF num : INTEGER)
    num ← num + 10
    OUTPUT "Inside: " & num
ENDPROCEDURE

DECLARE x : INTEGER
x ← 5
CALL AddTen(x)
OUTPUT "Outside: " & x
\`\`\`

Output:
\`\`\`
Inside: 15
Outside: 15
\`\`\`

This time, \`x\` changed to 15!

The procedure received a **reference** (link) to the original variable. When it changed \`num\`, it was actually changing \`x\` directly.

Think of it like giving someone the **key to your house** - they can rearrange the furniture, and you will see the changes!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'When a parameter is passed BYREF, what happens to the original variable?',
          options: [
            'It can be changed by the procedure',
            'It stays the same (unchanged)',
            'It is deleted after the procedure ends',
            'A copy is made automatically'
          ],
          answer: 0,
          explanation: 'BYREF passes a **reference** to the original variable. Any changes made inside the procedure **directly affect** the original variable!'
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "🎯 Practical Example: Swap Two Values",
          content: `BYREF is essential when a procedure needs to **modify** the caller's variables. Here is a classic example - swapping two values:

\`\`\`
PROCEDURE Swap(BYREF a : INTEGER, BYREF b : INTEGER)
    DECLARE temp : INTEGER
    temp ← a
    a ← b
    b ← temp
ENDPROCEDURE

DECLARE x : INTEGER
DECLARE y : INTEGER
x ← 10
y ← 20
CALL Swap(x, y)
OUTPUT "x = " & x
OUTPUT "y = " & y
\`\`\`

Output:
\`\`\`
x = 20
y = 10
\`\`\`

Both \`x\` and \`y\` were changed by the procedure because they were passed **BYREF**. If we had used BYVAL, x and y would still be 10 and 20!`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
PROCEDURE Increment(BYREF count : INTEGER)
    count ← count + 1
ENDPROCEDURE

DECLARE total : INTEGER
total ← 0
CALL Increment(total)
CALL Increment(total)
CALL Increment(total)
OUTPUT total
\`\`\``,
          options: [
            '3',
            '0',
            '1',
            'Error'
          ],
          answer: 0,
          explanation: 'Since `count` is BYREF, each call to `Increment` changes the original `total`. Starting at 0: after first call total = 1, after second = 2, after third = **3**.'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the procedure that resets a variable to zero using BYREF.',
          codeTemplate: 'PROCEDURE ResetToZero(___ value : INTEGER)\n    value ← ___\nENDPROCEDURE\n\nDECLARE score : INTEGER\nscore ← 100\nCALL ResetToZero(score)\nOUTPUT score',
          fillBlanks: [
            { id: 1, answer: "BYREF", options: ["BYREF", "BYVAL", "REF", "VAL"] },
            { id: 2, answer: "0", options: ["0", "100", "score", "NULL"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "BYVAL vs BYREF Comparison",
      emoji: "⚖️",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚖️ BYVAL vs BYREF Summary",
          content: `Here is a clear comparison:

| Feature | BYVAL | BYREF |
|---|---|---|
| What is passed? | A **copy** | The **original** |
| Original changed? | **No** | **Yes** |
| Analogy | Photocopy | House key |
| Use when... | You want to protect the original | You need to modify the original |

**When to use BYVAL:**
- You just need to **read** the value
- You want to **protect** the original from changes
- The procedure does calculation or display only

**When to use BYREF:**
- You need the procedure to **change** the original variable
- Swapping values, counters, resetting values
- Returning multiple results from a procedure`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'A procedure needs to swap two variables. Which parameter passing method should be used?',
          options: [
            'BYREF for both parameters',
            'BYVAL for both parameters',
            'BYVAL for the first, BYREF for the second',
            'It does not matter'
          ],
          answer: 0,
          explanation: 'To swap two variables, the procedure must **modify both originals**. This requires **BYREF for both** parameters. BYVAL would only change copies, leaving the originals unchanged.'
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
PROCEDURE Mystery(BYVAL a : INTEGER, BYREF b : INTEGER)
    a ← a + 10
    b ← b + 10
ENDPROCEDURE

DECLARE x : INTEGER
DECLARE y : INTEGER
x ← 5
y ← 5
CALL Mystery(x, y)
OUTPUT x
OUTPUT y
\`\`\``,
          options: [
            '5  then  15',
            '15  then  15',
            '5  then  5',
            '15  then  5'
          ],
          answer: 0,
          explanation: '`a` is BYVAL, so x stays at **5** (the copy was changed, not the original). `b` is BYREF, so y becomes **15** (the original was changed). Output: 5 then 15.'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Choose the correct parameter passing method for each parameter.',
          codeTemplate: 'PROCEDURE ProcessScore(___ score : INTEGER, ___ result : STRING)\n    IF score >= 50 THEN\n        result ← "Pass"\n    ELSE\n        result ← "Fail"\n    ENDIF\nENDPROCEDURE',
          fillBlanks: [
            { id: 1, answer: "BYVAL", options: ["BYVAL", "BYREF", "VALUE", "REF"] },
            { id: 2, answer: "BYREF", options: ["BYREF", "BYVAL", "VALUE", "REF"] }
          ]
        }
      ]
    }
  ]
}
