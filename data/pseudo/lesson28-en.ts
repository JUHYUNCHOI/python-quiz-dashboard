// ============================================
// Pseudocode Lesson 28: Operators & Exam Essentials (English)
// CIE Style Pseudocode - Must-know operators and patterns!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson28EnData: LessonData = {
  id: "pseudo-28",
  title: "Operators & Exam Essentials",
  emoji: "🧮",
  description: "Must-know operators and patterns for the exam!",
  chapters: [
    {
      id: "ch1",
      title: "Arithmetic Operators",
      emoji: "➕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "➕ Arithmetic Operators",
          content: `Let's learn the **arithmetic operators** used for calculations in pseudocode!

| Operator | Meaning | Example | Result |
|---|---|---|---|
| \`+\` | Addition | \`3 + 5\` | 8 |
| \`-\` | Subtraction | \`10 - 3\` | 7 |
| \`*\` | Multiplication | \`4 * 6\` | 24 |
| \`/\` | Division (real) | \`7 / 2\` | 3.5 |
| \`DIV\` | Integer division (quotient) | \`7 DIV 2\` | 3 |
| \`MOD\` | Modulus (remainder) | \`7 MOD 2\` | 1 |

Key points:
- \`/\` gives the **full result** including decimals → \`7 / 2 = 3.5\`
- \`DIV\` gives only the **quotient** → \`7 DIV 2 = 3\`
- \`MOD\` gives only the **remainder** → \`7 MOD 2 = 1\`

\`DIV\` and \`MOD\` appear **very frequently** on exams!`
        },
        {
          id: "ch1-divmod",
          type: "explain",
          title: "🔢 Mastering DIV and MOD",
          content: `**DIV** and **MOD** are the most commonly tested operators!

**DIV = Integer Division (Quotient only)**
\`\`\`
17 DIV 5 = 3     // 17 ÷ 5 = 3 remainder 2 → quotient is 3
20 DIV 3 = 6     // 20 ÷ 3 = 6 remainder 2 → quotient is 6
10 DIV 10 = 1    // 10 ÷ 10 = 1 remainder 0 → quotient is 1
7 DIV 10 = 0     // 7 ÷ 10 = 0 remainder 7 → quotient is 0
\`\`\`

**MOD = Remainder**
\`\`\`
17 MOD 5 = 2     // 17 ÷ 5 = 3 remainder 2 → remainder is 2
20 MOD 3 = 2     // 20 ÷ 3 = 6 remainder 2 → remainder is 2
10 MOD 10 = 0    // 10 ÷ 10 = 1 remainder 0 → remainder is 0
7 MOD 10 = 7     // 7 ÷ 10 = 0 remainder 7 → remainder is 7
\`\`\`

**Easy check:**
- DIV × divisor + MOD = original number
- e.g. 17 DIV 5 = **3**, 17 MOD 5 = **2** → 3 × 5 + 2 = **17** ✓`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this code output?

\`\`\`
DECLARE a : INTEGER
DECLARE b : INTEGER
a ← 23 DIV 5
b ← 23 MOD 5
OUTPUT a
OUTPUT b
\`\`\``,
          options: [
            '4\n3',
            '4.6\n3',
            '5\n3',
            '4\n23'
          ],
          answer: 0,
          explanation: '23 ÷ 5 = 4 remainder 3. `23 DIV 5 = 4` (quotient), `23 MOD 5 = 3` (remainder). Check: 4 × 5 + 3 = 23 ✓'
        },
        {
          id: "ch1-priority",
          type: "explain",
          title: "📐 Operator Precedence",
          content: `Just like in math, pseudocode has an **order of operations**!

**Precedence (highest first):**
1. \`( )\` — Parentheses (always first!)
2. \`*\`, \`/\`, \`DIV\`, \`MOD\` — Multiplication/Division
3. \`+\`, \`-\` — Addition/Subtraction

\`\`\`
// Example 1: Multiplication first!
OUTPUT 2 + 3 * 4      // = 2 + 12 = 14

// Example 2: Parentheses first!
OUTPUT (2 + 3) * 4     // = 5 * 4 = 20

// Example 3: MOD is same level as multiplication
OUTPUT 10 + 7 MOD 3    // = 10 + 1 = 11
\`\`\`

**When in doubt, use parentheses!** You won't lose marks for using them.`
        },
        {
          id: "ch1-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this code output?

\`\`\`
DECLARE x : INTEGER
x ← (10 + 2) * 3 - 4 DIV 2
OUTPUT x
\`\`\``,
          options: [
            '34',
            '36',
            '32',
            '18'
          ],
          answer: 0,
          explanation: 'Step 1: Parentheses → (10 + 2) = 12\nStep 2: Multiply → 12 * 3 = 36\nStep 3: DIV → 4 DIV 2 = 2\nStep 4: Subtract → 36 - 2 = **34**'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Find the quotient and remainder of 25 divided by 7.',
          code: 'DECLARE quotient : INTEGER\nDECLARE remainder : INTEGER\nquotient ← 25 ___ 7\nremainder ← 25 ___ 7\nOUTPUT quotient\nOUTPUT remainder',
          fillBlanks: [
            { id: 1, answer: "DIV", options: ["DIV", "MOD", "/", "*"] },
            { id: 2, answer: "MOD", options: ["MOD", "DIV", "/", "-"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Comparison & Logical Operators",
      emoji: "⚖️",
      steps: [
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ Comparison Operators",
          content: `These operators **compare** two values. The result is always **TRUE** or **FALSE**!

| Operator | Meaning | Example | Result |
|---|---|---|---|
| \`=\` | Equal to | \`5 = 5\` | TRUE |
| \`<>\` | Not equal to | \`5 <> 3\` | TRUE |
| \`>\` | Greater than | \`7 > 3\` | TRUE |
| \`<\` | Less than | \`2 < 8\` | TRUE |
| \`>=\` | Greater than or equal to | \`5 >= 5\` | TRUE |
| \`<=\` | Less than or equal to | \`3 <= 7\` | TRUE |

**Important!**
- "Equal to" is \`=\` (single!) — different from Python's \`==\`
- "Not equal to" is \`<>\` — different from Python's \`!=\`
- Assignment uses \`←\`, comparison uses \`=\` — don't mix them up!`
        },
        {
          id: "ch2-logical",
          type: "explain",
          title: "🧩 Logical Operators: AND, OR, NOT",
          content: `Use logical operators to **combine conditions**!

**AND — Both must be TRUE**
\`\`\`
IF age >= 13 AND age <= 19 THEN
    OUTPUT "Teenager"
ENDIF
\`\`\`

**OR — At least one must be TRUE**
\`\`\`
IF day = "Saturday" OR day = "Sunday" THEN
    OUTPUT "Weekend"
ENDIF
\`\`\`

**NOT — Flips TRUE ↔ FALSE**
\`\`\`
IF NOT(gameOver) THEN
    OUTPUT "Keep playing!"
ENDIF
\`\`\`

| A | B | A AND B | A OR B | NOT A |
|---|---|---|---|---|
| TRUE | TRUE | TRUE | TRUE | FALSE |
| TRUE | FALSE | FALSE | TRUE | FALSE |
| FALSE | TRUE | FALSE | TRUE | TRUE |
| FALSE | FALSE | FALSE | FALSE | TRUE |`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'If `x ← 15`, what is the result of `x > 10 AND x < 20`?',
          options: [
            'TRUE',
            'FALSE',
            '15',
            'Error'
          ],
          answer: 0,
          explanation: 'When x = 15: `15 > 10` is TRUE, `15 < 20` is also TRUE. AND requires both to be TRUE → **TRUE**!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this code output?

\`\`\`
DECLARE mark : INTEGER
mark ← 75

IF mark >= 90 THEN
    OUTPUT "A"
ELSE
    IF mark >= 70 AND mark < 90 THEN
        OUTPUT "B"
    ELSE
        OUTPUT "C"
    ENDIF
ENDIF
\`\`\``,
          options: [
            'B',
            'A',
            'C',
            'TRUE'
          ],
          answer: 0,
          explanation: 'mark = 75. First, `75 >= 90` is FALSE → goes to ELSE. Then `75 >= 70 AND 75 < 90` → TRUE AND TRUE = TRUE → outputs **"B"**!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the condition to check if score is between 0 and 100 (inclusive).',
          code: 'IF score ___ 0 ___ score ___ 100 THEN\n    OUTPUT "Valid score"\nENDIF',
          fillBlanks: [
            { id: 1, answer: ">=", options: [">=", ">", "<=", "="] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] },
            { id: 3, answer: "<=", options: ["<=", "<", ">=", "<>"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Exam Essential Patterns",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-evenodd",
          type: "explain",
          title: "🔢 Even/Odd Check",
          content: `**Classic exam question!** How to check if a number is even or odd?

**Key: Use MOD 2!**

\`\`\`
// Even check: remainder when divided by 2 is 0
IF n MOD 2 = 0 THEN
    OUTPUT "Even"
ELSE
    OUTPUT "Odd"
ENDIF
\`\`\`

**Examples:**
- \`10 MOD 2 = 0\` → Even ✓
- \`7 MOD 2 = 1\` → Odd ✓
- \`0 MOD 2 = 0\` → Even ✓

**Multiple of 3?** → \`n MOD 3 = 0\`
**Multiple of 5?** → \`n MOD 5 = 0\`
**Multiple of N?** → \`n MOD N = 0\``
        },
        {
          id: "ch3-evenodd-predict",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this code output?

\`\`\`
FOR i ← 1 TO 6
    IF i MOD 2 = 0 THEN
        OUTPUT i
    ENDIF
NEXT i
\`\`\``,
          options: [
            '2\n4\n6',
            '1\n3\n5',
            '1\n2\n3\n4\n5\n6',
            '0\n2\n4\n6'
          ],
          answer: 0,
          explanation: 'Only outputs i where `i MOD 2 = 0`. 2 MOD 2=0✓, 4 MOD 2=0✓, 6 MOD 2=0✓ → **2, 4, 6**'
        },
        {
          id: "ch3-digits",
          type: "explain",
          title: "🔢 Extracting Digits",
          content: `Extracting **individual digits** from a number is a common exam question!

**Units digit:** \`MOD 10\`
**Tens digit:** \`DIV 10 MOD 10\`
**Hundreds digit:** \`DIV 100 MOD 10\`

\`\`\`
DECLARE num : INTEGER
num ← 435

// Units digit: 5
OUTPUT num MOD 10

// Tens digit: 3
OUTPUT (num DIV 10) MOD 10

// Hundreds digit: 4
OUTPUT (num DIV 100) MOD 10
\`\`\`

**Pattern:**
- Units = \`num MOD 10\`
- Other digits = **first DIV to shift**, then \`MOD 10\``
        },
        {
          id: "ch3-digits-predict",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this code output?

\`\`\`
DECLARE n : INTEGER
n ← 1234
OUTPUT n MOD 10
OUTPUT n DIV 10 MOD 10
OUTPUT n DIV 100 MOD 10
\`\`\``,
          options: [
            '4\n3\n2',
            '1\n2\n3',
            '4\n34\n12',
            '1234\n123\n12'
          ],
          answer: 0,
          explanation: '`1234 MOD 10 = 4` (units)\n`1234 DIV 10 = 123`, `123 MOD 10 = 3` (tens)\n`1234 DIV 100 = 12`, `12 MOD 10 = 2` (hundreds)'
        },
        {
          id: "ch3-builtin",
          type: "explain",
          title: "🛠️ Built-in Functions Reference",
          content: `Here are the **built-in functions** available in CIE pseudocode!

**Number functions:**
| Function | Description | Example | Result |
|---|---|---|---|
| \`INT(x)\` | Truncate to integer | \`INT(3.7)\` | 3 |
| \`ROUND(x, n)\` | Round to n decimal places | \`ROUND(3.456, 2)\` | 3.46 |
| \`RANDOM()\` | Random real 0 ≤ x < 1 | \`RANDOM()\` | 0.7... |

**String functions:**
| Function | Description | Example | Result |
|---|---|---|---|
| \`LENGTH(s)\` | String length | \`LENGTH("Hi")\` | 2 |
| \`UCASE(s)\` | Convert to uppercase | \`UCASE("hello")\` | "HELLO" |
| \`LCASE(s)\` | Convert to lowercase | \`LCASE("HELLO")\` | "hello" |
| \`SUBSTRING(s, i, n)\` | Extract n chars from position i | \`SUBSTRING("Hello", 1, 3)\` | "Hel" |

**Type conversion:**
| Function | Description | Example | Result |
|---|---|---|---|
| \`INT(x)\` | Real → Integer (truncate) | \`INT(9.8)\` | 9 |
| \`STRING_TO_NUM(s)\` | String → Number | \`STRING_TO_NUM("42")\` | 42 |
| \`NUM_TO_STRING(n)\` | Number → String | \`NUM_TO_STRING(42)\` | "42" |
| \`CHR(n)\` | ASCII code → Character | \`CHR(65)\` | 'A' |
| \`ASC(c)\` | Character → ASCII code | \`ASC('A')\` | 65 |

The **&** operator is for **string concatenation**: \`"Hello" & " " & "World" = "Hello World"\``
        },
        {
          id: "ch3-integer-check",
          type: "explain",
          title: "🔍 Checking if a Number is an Integer",
          content: `How to check if a number is a **whole number** (integer)?

**Method: If INT(x) = x, it's an integer**

\`\`\`
DECLARE x : REAL
INPUT x

IF INT(x) = x THEN
    OUTPUT "It is an integer"
ELSE
    OUTPUT "It is not an integer"
ENDIF
\`\`\`

**Examples:**
- x = 5.0 → INT(5.0) = 5, 5 = 5.0 ✓ → integer
- x = 3.7 → INT(3.7) = 3, 3 ≠ 3.7 → not an integer

**Generating random integers** (dice roll 1-6):
\`\`\`
DECLARE dice : INTEGER
dice ← INT(RANDOM() * 6) + 1
\`\`\`
- RANDOM() gives 0 to 0.999...
- × 6 gives 0 to 5.999...
- INT() gives 0 to 5
- +1 gives **1 to 6** 🎲`
        },
        {
          id: "ch3-predict-random",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What is the possible range of \`num\`?

\`\`\`
DECLARE num : INTEGER
num ← INT(RANDOM() * 10) + 5
\`\`\``,
          options: [
            '5 to 14',
            '0 to 9',
            '5 to 15',
            '1 to 10'
          ],
          answer: 0,
          explanation: 'RANDOM() gives 0 to 0.999... → ×10 gives 0 to 9.999... → INT() gives 0 to 9 → +5 gives **5 to 14**!'
        },
        {
          id: "ch3-string-ops",
          type: "explain",
          title: "🔤 String Operation Patterns",
          content: `Common **string handling** patterns that appear on exams!

**1) String concatenation (&)**
\`\`\`
DECLARE first : STRING
DECLARE last : STRING
first ← "Kim"
last ← "Minjun"
OUTPUT first & " " & last
// Output: Kim Minjun
\`\`\`

**2) Including numbers in strings**
\`\`\`
DECLARE score : INTEGER
score ← 95
OUTPUT "Score: " & NUM_TO_STRING(score) & " points"
// Output: Score: 95 points
\`\`\`

**3) Extracting the first character**
\`\`\`
DECLARE name : STRING
name ← "Alice"
OUTPUT SUBSTRING(name, 1, 1)
// Output: A
\`\`\`

**4) Case-insensitive comparison**
\`\`\`
DECLARE answer : STRING
INPUT answer
IF UCASE(answer) = "YES" THEN
    OUTPUT "Approved!"
ENDIF
\`\`\`

SUBSTRING index starts at **1** (not 0)!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the code to check for even numbers and integers.',
          code: '// Even check\nIF num ___ 2 = 0 THEN\n    OUTPUT "Even"\nENDIF\n\n// Integer check\nIF ___(x) = x THEN\n    OUTPUT "Integer"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "MOD", options: ["MOD", "DIV", "/", "*"] },
            { id: 2, answer: "INT", options: ["INT", "ROUND", "REAL", "NUM_TO_STRING"] }
          ]
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which code correctly generates a random integer from 1 to 100?',
          options: [
            'INT(RANDOM() * 100) + 1',
            'RANDOM() * 100',
            'INT(RANDOM() * 100)',
            'RANDOM(100)'
          ],
          answer: 0,
          explanation: 'RANDOM() gives 0 to 0.999... → ×100 gives 0 to 99.999... → INT() gives 0 to 99 → +1 gives **1 to 100**! RANDOM(100) is not valid CIE pseudocode syntax.'
        },
      ]
    },
    {
      id: "ch4",
      title: "Exam Practice",
      emoji: "📝",
      steps: [
        {
          id: "ch4-combo1",
          type: "predict",
          title: "🔮 Practice Problem 1",
          content: `What does this code output?

\`\`\`
DECLARE total : INTEGER
total ← 0
FOR i ← 1 TO 10
    IF i MOD 3 = 0 THEN
        total ← total + i
    ENDIF
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '18',
            '30',
            '15',
            '9'
          ],
          answer: 0,
          explanation: 'Only adds multiples of 3: 3 + 6 + 9 = **18**. Numbers where i MOD 3 = 0: 3, 6, 9'
        },
        {
          id: "ch4-combo2",
          type: "predict",
          title: "🔮 Practice Problem 2",
          content: `What does this code output?

\`\`\`
DECLARE text : STRING
DECLARE count : INTEGER
text ← "Hello World"
count ← 0
FOR i ← 1 TO LENGTH(text)
    IF SUBSTRING(text, i, 1) = "l" THEN
        count ← count + 1
    ENDIF
NEXT i
OUTPUT count
\`\`\``,
          options: [
            '3',
            '2',
            '1',
            '11'
          ],
          answer: 0,
          explanation: 'Counts "l" in "Hello World". H-e-**l**-**l**-o- -W-o-r-**l**-d → 3 occurrences of "l"!'
        },
        {
          id: "ch4-combo3",
          type: "predict",
          title: "🔮 Practice Problem 3",
          content: `What does this code output?

\`\`\`
DECLARE n : INTEGER
n ← 4567
OUTPUT n MOD 10
OUTPUT (n DIV 10) MOD 10
OUTPUT n MOD 100
\`\`\``,
          options: [
            '7\n6\n67',
            '4\n5\n45',
            '7\n6\n7',
            '7\n67\n567'
          ],
          answer: 0,
          explanation: '`4567 MOD 10 = 7` (units digit)\n`4567 DIV 10 = 456`, `456 MOD 10 = 6` (tens digit)\n`4567 MOD 100 = 67` (last two digits!)'
        },
        {
          id: "ch4-fill-final",
          type: "fillblank",
          title: "✏️ Final Fill-in!",
          content: 'Complete the code to roll a dice (1-6) and check if it is even.',
          code: 'DECLARE dice : INTEGER\ndice ← ___(RANDOM() * 6) + 1\n\nIF dice ___ 2 = 0 THEN\n    OUTPUT ___ & " is even!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "INT", options: ["INT", "ROUND", "REAL", "RANDOM"] },
            { id: 2, answer: "MOD", options: ["MOD", "DIV", "/", "AND"] },
            { id: 3, answer: "NUM_TO_STRING(dice)", options: ["NUM_TO_STRING(dice)", "dice", "STRING(dice)", "OUTPUT dice"] }
          ]
        },
        {
          id: "ch4-quiz-final",
          type: "quiz",
          title: "🧠 Final Quiz!",
          content: 'Which CIE pseudocode operator means "not equal to"?',
          options: [
            '<>',
            '!=',
            '=/=',
            'NOT='
          ],
          answer: 0,
          explanation: 'In CIE pseudocode, "not equal to" is **<>**! `!=` is Python/Java syntax. `=/=` and `NOT=` are not valid pseudocode operators.'
        },
      ]
    }
  ]
}
