// ============================================
// Pseudocode Lesson 10: Procedures & Functions (English)
// CIE Style Pseudocode - Reusable code blocks!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson10EnData: LessonData = {
  id: "pseudo-10",
  title: "Procedures & Functions",
  emoji: "🔧",
  description: "Create reusable code blocks!",
  chapters: [
    {
      id: "ch1",
      title: "Procedures",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What is a Procedure?",
          content: `A **procedure** is a named block of code that performs a task. Instead of writing the same code over and over, you write it once and **call** it whenever you need it!

Think of a procedure like a recipe:
- You write the recipe once
- You follow it every time you want to make that dish

In CIE pseudocode, the syntax is:

\`\`\`
PROCEDURE SayHello()
    OUTPUT "Hello, World!"
ENDPROCEDURE
\`\`\`

To **use** (call) the procedure:
\`\`\`
CALL SayHello()
\`\`\`

Output: **Hello, World!**

Key points:
- \`PROCEDURE\` starts the definition
- \`ENDPROCEDURE\` ends it
- \`CALL\` is used to run the procedure`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "🎯 Procedure with Parameters",
          content: `Procedures can accept **parameters** (input values) to make them more flexible:

\`\`\`
PROCEDURE Greet(name : STRING)
    OUTPUT "Hello, " & name & "!"
ENDPROCEDURE

CALL Greet("Alice")
CALL Greet("Bob")
\`\`\`

Output:
\`\`\`
Hello, Alice!
Hello, Bob!
\`\`\`

The parameter \`name\` acts like a variable inside the procedure. Each time you call it, you can pass a different value!

You can also have **multiple parameters**:

\`\`\`
PROCEDURE PrintSum(a : INTEGER, b : INTEGER)
    OUTPUT a + b
ENDPROCEDURE

CALL PrintSum(3, 7)
\`\`\`

Output: **10**`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the procedure definition and its call.',
          code: '___ PrintMessage(msg : STRING)\n    OUTPUT msg\n___\n\n___ PrintMessage("Welcome!")',
          fillBlanks: [
            { id: 1, answer: "PROCEDURE", options: ["PROCEDURE", "FUNCTION", "DEF", "SUB"] },
            { id: 2, answer: "ENDPROCEDURE", options: ["ENDPROCEDURE", "ENDFUNCTION", "END", "RETURN"] },
            { id: 3, answer: "CALL", options: ["CALL", "RUN", "EXEC", "DO"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
PROCEDURE Stars(n : INTEGER)
    DECLARE line : STRING
    line ← ""
    FOR i ← 1 TO n
        line ← line & "*"
    NEXT i
    OUTPUT line
ENDPROCEDURE

CALL Stars(3)
CALL Stars(5)
\`\`\``,
          options: [
            '***  then  *****',
            '35',
            '*** *****',
            '8'
          ],
          answer: 0,
          explanation: 'The first call `Stars(3)` outputs "***" (3 stars). The second call `Stars(5)` outputs "*****" (5 stars). Each call runs the procedure with a different value of `n`.'
        }
      ]
    },
    {
      id: "ch2",
      title: "Functions",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📋 What is a Function?",
          content: `A **function** is like a procedure, but it **returns a value**!

Think of the difference:
- **Procedure**: Does something (like printing)
- **Function**: Calculates something and **gives back** a result

In CIE pseudocode:

\`\`\`
FUNCTION Double(n : INTEGER) RETURNS INTEGER
    RETURN n * 2
ENDFUNCTION
\`\`\`

Key differences from a procedure:
- Uses \`FUNCTION\` instead of \`PROCEDURE\`
- Has \`RETURNS\` to declare the return type
- Uses \`RETURN\` to send back a value
- Ends with \`ENDFUNCTION\`

To use a function, you store or use its result:
\`\`\`
DECLARE result : INTEGER
result ← Double(5)
OUTPUT result
\`\`\`

Output: **10**`
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "🎯 Function Examples",
          content: `Here are some useful function examples:

**Example 1: Find the maximum of two numbers**
\`\`\`
FUNCTION Max(a : INTEGER, b : INTEGER) RETURNS INTEGER
    IF a > b THEN
        RETURN a
    ELSE
        RETURN b
    ENDIF
ENDFUNCTION

OUTPUT Max(7, 12)
\`\`\`
Output: **12**

**Example 2: Check if a number is even**
\`\`\`
FUNCTION IsEven(n : INTEGER) RETURNS BOOLEAN
    IF n MOD 2 = 0 THEN
        RETURN TRUE
    ELSE
        RETURN FALSE
    ENDIF
ENDFUNCTION

IF IsEven(4) THEN
    OUTPUT "4 is even!"
ENDIF
\`\`\`
Output: **4 is even!**

Functions can return any type: INTEGER, REAL, STRING, BOOLEAN, etc.`
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the function that calculates the square of a number.',
          code: '___ Square(n : INTEGER) ___ INTEGER\n    ___ n * n\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "FUNCTION", options: ["FUNCTION", "PROCEDURE", "DEF", "SUB"] },
            { id: 2, answer: "RETURNS", options: ["RETURNS", "RETURN", "GIVES", "OUTPUT"] },
            { id: 3, answer: "RETURN", options: ["RETURN", "RETURNS", "OUTPUT", "GIVE"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
FUNCTION Add(a : INTEGER, b : INTEGER) RETURNS INTEGER
    RETURN a + b
ENDFUNCTION

FUNCTION Multiply(a : INTEGER, b : INTEGER) RETURNS INTEGER
    RETURN a * b
ENDFUNCTION

DECLARE x : INTEGER
x ← Add(3, 4)
DECLARE y : INTEGER
y ← Multiply(x, 2)
OUTPUT y
\`\`\``,
          options: [
            '14',
            '10',
            '7',
            '24'
          ],
          answer: 0,
          explanation: 'First, `Add(3, 4)` returns 7, so x = 7. Then `Multiply(7, 2)` returns 14, so y = 14. The output is **14**.'
        }
      ]
    },
    {
      id: "ch3",
      title: "Procedures vs Functions",
      emoji: "⚖️",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚖️ Side-by-Side Comparison",
          content: `Let's compare procedures and functions clearly:

| Feature | Procedure | Function |
|---|---|---|
| Keyword | PROCEDURE | FUNCTION |
| End keyword | ENDPROCEDURE | ENDFUNCTION |
| Returns a value? | No | Yes (RETURN) |
| Return type? | N/A | RETURNS type |
| How to call | CALL name() | result ← name() |

**Procedure example:**
\`\`\`
PROCEDURE ShowScore(score : INTEGER)
    OUTPUT "Your score: " & score
ENDPROCEDURE

CALL ShowScore(95)
\`\`\`

**Function example:**
\`\`\`
FUNCTION CalcGrade(score : INTEGER) RETURNS STRING
    IF score >= 90 THEN
        RETURN "A"
    ELSE
        RETURN "B"
    ENDIF
ENDFUNCTION

DECLARE g : STRING
g ← CalcGrade(95)
OUTPUT g
\`\`\``
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which line correctly calls a function and stores its result?',
          options: [
            'result ← CalcArea(5, 3)',
            'CALL CalcArea(5, 3)',
            'RETURN CalcArea(5, 3)',
            'OUTPUT CalcArea(5, 3) TO result'
          ],
          answer: 0,
          explanation: 'Functions return values, so you assign the result using `result ← CalcArea(5, 3)`. `CALL` is used for procedures, not functions. You can also use a function directly in OUTPUT like `OUTPUT CalcArea(5, 3)`.'
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
FUNCTION Triple(n : INTEGER) RETURNS INTEGER
    RETURN n * 3
ENDFUNCTION

PROCEDURE ShowResult(label : STRING, value : INTEGER)
    OUTPUT label & ": " & value
ENDPROCEDURE

DECLARE answer : INTEGER
answer ← Triple(4)
CALL ShowResult("Result", answer)
\`\`\``,
          options: [
            'Result: 12',
            'Result: 4',
            '12',
            'Triple: 12'
          ],
          answer: 0,
          explanation: '`Triple(4)` returns 4 * 3 = 12, so answer = 12. Then `ShowResult("Result", 12)` outputs "Result: " & 12, which gives **Result: 12**.'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the function and procedure working together.',
          code: 'FUNCTION CalcArea(w : INTEGER, h : INTEGER) RETURNS INTEGER\n    ___ w * h\nENDFUNCTION\n\nPROCEDURE DisplayArea(w : INTEGER, h : INTEGER)\n    DECLARE area : INTEGER\n    area ← ___(w, h)\n    OUTPUT "Area = " & area\n___\n\nCALL DisplayArea(5, 3)',
          fillBlanks: [
            { id: 1, answer: "RETURN", options: ["RETURN", "OUTPUT", "GIVE", "SEND"] },
            { id: 2, answer: "CalcArea", options: ["CalcArea", "CALL CalcArea", "Area", "FUNCTION"] },
            { id: 3, answer: "ENDPROCEDURE", options: ["ENDPROCEDURE", "ENDFUNCTION", "END", "ENDIF"] }
          ]
        }
      ]
    }
  ]
}
