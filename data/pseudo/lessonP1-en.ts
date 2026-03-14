// ============================================
// Pseudocode Past Paper Practice: Part 1 (English)
// Data Types, Operators, Validation, Variables, Conditionals, Loops, Arrays
// IGCSE 0478 Paper 2 Style
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP1EnData: LessonData = {
  id: "pseudo-p1",
  title: "Past Paper Practice",
  emoji: "\u{1F4DD}",
  description: "Part 1 Past Paper Practice!",
  chapters: [
    {
      id: "ch1",
      title: "Fundamental Concept Questions",
      emoji: "\u{1F4CB}",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "\u{1F4DD} Introduction to Past Paper Question Types",
          content: `Let's practice **fundamental concept questions** that frequently appear in IGCSE Computer Science Paper 2!

These are the types of questions you'll encounter:
- \u{1F50D} **Validation** type identification
- \u{1F4CA} **Data Type** matching
- \u{2795} **Operator** classification
- \u{1F4DD} **Code reading** & output prediction

Each question follows a format similar to the actual exam. Are you ready? \u{1F4AA}`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "\u{1F50D} Validation Check",
          content: `What type of validation check verifies whether an email address contains the '@' symbol?

e.g. Checking if '@' exists in \`user@email.com\``,
          options: [
            'format check',
            'range check',
            'length check',
            'presence check'
          ],
          answer: 0,
          explanation: `A **format check** verifies whether data follows a **specified format (pattern)**.

Checking if an email contains '@' is a **format check**.

Other validation types:
- **Range check**: whether a value is within a range (e.g. 1 to 100)
- **Length check**: whether a string's length is correct (e.g. password at least 8 characters)
- **Presence check**: whether a field is not empty`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "\u{1F4CA} Data Type Matching",
          content: `Which data type is appropriate for storing a "number with a decimal point" (e.g. 3.14, 9.8)?`,
          options: [
            'REAL',
            'INTEGER',
            'STRING',
            'BOOLEAN'
          ],
          answer: 0,
          explanation: `**REAL** stores numbers with decimal points.

Data type summary:
- **INTEGER**: whole numbers (42, -7)
- **REAL**: decimal numbers (3.14, -0.5)
- **STRING**: text ("Hello")
- **BOOLEAN**: true/false (TRUE, FALSE)
- **CHAR**: a single character ('A', '3')`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "\u{1F4CA} Data Type Matching 2",
          content: `What is the most appropriate data type for storing "a single character"?

e.g. 'A', 'Z', '5'`,
          options: [
            'CHAR',
            'STRING',
            'INTEGER',
            'BOOLEAN'
          ],
          answer: 0,
          explanation: `**CHAR** stores exactly one character.

STRING can also store a single character, but when you need **exactly one character**, CHAR is more appropriate.

Common exam matchings:
- whole number \u2192 INTEGER
- single letter \u2192 CHAR
- word or phrase \u2192 STRING
- number with decimal \u2192 REAL`
        },
        {
          id: "ch1-q4",
          type: "quiz",
          title: "\u{2795} Operator Classification",
          content: `Classify the following operator.

What type of operator is \`DIV\`?

(Note: DIV performs integer division, e.g. 7 DIV 2 = 3)`,
          options: [
            'Arithmetic operator',
            'Comparison operator',
            'Logical operator',
            'Assignment operator'
          ],
          answer: 0,
          explanation: `**DIV** is an **arithmetic operator**. It performs integer division.

Operator classification:
- **Arithmetic**: +, -, *, /, DIV, MOD
- **Comparison**: =, <>, <, >, <=, >=
- **Logical**: AND, OR, NOT
- **Assignment**: \u2190`
        },
        {
          id: "ch1-q5",
          type: "quiz",
          title: "\u{2795} Operator Classification 2",
          content: `Which of the following is a **logical operator**?`,
          options: [
            'AND',
            '>=',
            'MOD',
            'DIV'
          ],
          answer: 0,
          explanation: `**AND** is a logical operator. It returns TRUE when both conditions are true.

- **>=** is a comparison operator (greater than or equal to)
- **MOD** is an arithmetic operator (remainder)
- **DIV** is an arithmetic operator (integer division)`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "\u{1F52E} Predict the Output",
          content: `What is the output of the following pseudocode?

\`\`\`
DECLARE x : INTEGER
DECLARE y : INTEGER

x \u2190 17
y \u2190 x MOD 5
x \u2190 x DIV 5

OUTPUT y
OUTPUT x
\`\`\``,
          options: [
            '2\n3',
            '3\n2',
            '5\n3',
            '2\n5'
          ],
          answer: 0,
          explanation: `Let's trace through line by line:

1. x \u2190 17
2. y \u2190 17 MOD 5 = **2** (remainder)
3. x \u2190 17 DIV 5 = **3** (integer division)
4. OUTPUT y \u2192 **2**
5. OUTPUT x \u2192 **3**

\u{1F4A1} MOD gives the remainder, DIV gives the quotient!`
        }
      ]
    },
    {
      id: "ch2",
      title: "Reading Pseudocode & Finding Errors",
      emoji: "\u{1F50D}",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "\u{1F50D} Pseudocode with Errors",
          content: `The following pseudocode is intended to input a random number of values (between 1 and 10), then calculate the total and average.
However, it contains **4 errors**!

\`\`\`
01 DECLARE Count : STRING
02 DECLARE Limit : INTEGER
03 DECLARE Value : REAL
04 DECLARE Total : REAL
05 Total \u2190 0
06 Limit \u2190 ROUND(RANDOM() * 9, 0) + 1
07 IF Count \u2190 1 TO Limit
08     OUTPUT "Enter a number"
09     INPUT Count
10     Total \u2190 Total * Value
11 NEXT Count
12 OUTPUT "Total is ", Total
13 OUTPUT "Average is ", Total / Limit
\`\`\`

Can you spot the errors? \u{1F914}`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "\u{1F41B} Find Error 1",
          code: `01 DECLARE Count : STRING\n02 DECLARE Limit : INTEGER\n03 DECLARE Value : REAL\n04 DECLARE Total : REAL\n05 Total \u2190 0\n06 Limit \u2190 ROUND(RANDOM() * 9, 0) + 1\n07 IF Count \u2190 1 TO Limit\n08     OUTPUT "Enter a number"\n09     INPUT Count\n10     Total \u2190 Total * Value\n11 NEXT Count\n12 OUTPUT "Total is ", Total\n13 OUTPUT "Average is ", Total / Limit`,
          content: `What is wrong with line 01: \`DECLARE Count : STRING\`?`,
          options: [
            'Count is used as a loop counter, so it should be INTEGER',
            'Count should be replaced with Loop',
            'STRING should be REAL instead',
            'No error'
          ],
          answer: 0,
          explanation: `Count is used as a **counter variable** in a FOR loop.

Counter variables must always be **INTEGER**!

Fix: \`DECLARE Count : INTEGER\``
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "\u{1F41B} Find Error 2",
          code: `01 DECLARE Count : STRING\n02 DECLARE Limit : INTEGER\n03 DECLARE Value : REAL\n04 DECLARE Total : REAL\n05 Total \u2190 0\n06 Limit \u2190 ROUND(RANDOM() * 9, 0) + 1\n07 IF Count \u2190 1 TO Limit\n08     OUTPUT "Enter a number"\n09     INPUT Count\n10     Total \u2190 Total * Value\n11 NEXT Count\n12 OUTPUT "Total is ", Total\n13 OUTPUT "Average is ", Total / Limit`,
          content: `What is wrong with line 07: \`IF Count \u2190 1 TO Limit\`?`,
          options: [
            'IF should be replaced with FOR',
            '\u2190 should be replaced with =',
            'TO should be replaced with UNTIL',
            'No error'
          ],
          answer: 0,
          explanation: `To repeat a set number of times, you need a **FOR** loop!

IF is a conditional statement, not a loop.

Fix: \`FOR Count \u2190 1 TO Limit\``
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "\u{1F41B} Find Error 3",
          code: `01 DECLARE Count : STRING\n02 DECLARE Limit : INTEGER\n03 DECLARE Value : REAL\n04 DECLARE Total : REAL\n05 Total \u2190 0\n06 Limit \u2190 ROUND(RANDOM() * 9, 0) + 1\n07 IF Count \u2190 1 TO Limit\n08     OUTPUT "Enter a number"\n09     INPUT Count\n10     Total \u2190 Total * Value\n11 NEXT Count\n12 OUTPUT "Total is ", Total\n13 OUTPUT "Average is ", Total / Limit`,
          content: `What is wrong with line 09: \`INPUT Count\`?`,
          options: [
            'Count should be replaced with Value',
            'INPUT should be replaced with OUTPUT',
            'Count should have 1 added to it',
            'No error'
          ],
          answer: 0,
          explanation: `Count is the **loop counter**. The value entered by the user should be stored in **Value**!

If you input into Count, the loop will break.

Fix: \`INPUT Value\``
        },
        {
          id: "ch2-q4",
          type: "quiz",
          title: "\u{1F41B} Find Error 4",
          code: `01 DECLARE Count : STRING\n02 DECLARE Limit : INTEGER\n03 DECLARE Value : REAL\n04 DECLARE Total : REAL\n05 Total \u2190 0\n06 Limit \u2190 ROUND(RANDOM() * 9, 0) + 1\n07 IF Count \u2190 1 TO Limit\n08     OUTPUT "Enter a number"\n09     INPUT Count\n10     Total \u2190 Total * Value\n11 NEXT Count\n12 OUTPUT "Total is ", Total\n13 OUTPUT "Average is ", Total / Limit`,
          content: `What is wrong with line 10: \`Total \u2190 Total * Value\`?`,
          options: [
            '* should be replaced with + (since we are calculating a total)',
            'Total should be replaced with Value',
            'Value should be replaced with Count',
            'No error'
          ],
          answer: 0,
          explanation: `To calculate a total, you need **addition (+)**!

Using multiplication (*) would give a product, not a total.

Fix: \`Total \u2190 Total + Value\``
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Complete the Corrected Code",
          content: 'Complete the code with all errors fixed.',
          code: 'DECLARE Count : INTEGER\nDECLARE Limit : INTEGER\nDECLARE Value : REAL\nDECLARE Total : REAL\nTotal \u2190 0\nLimit \u2190 ROUND(RANDOM() * 9, 0) + 1\n___ Count \u2190 1 TO Limit\n    OUTPUT "Enter a number"\n    INPUT ___\n    Total \u2190 Total ___ Value\nNEXT Count',
          fillBlanks: [
            { id: 1, answer: "FOR", options: ["FOR", "IF", "WHILE", "REPEAT"] },
            { id: 2, answer: "Value", options: ["Value", "Count", "Total", "Limit"] },
            { id: 3, answer: "+", options: ["+", "*", "-", "/"] }
          ]
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "\u{1F52E} Predict the Corrected Code Output",
          content: `In the corrected code, if Limit = 3 and
the user enters 10, 20, 30, what is the output?

\`\`\`
Total \u2190 0
FOR Count \u2190 1 TO 3
    INPUT Value
    Total \u2190 Total + Value
NEXT Count
OUTPUT "Total is ", Total
OUTPUT "Average is ", Total / Limit
\`\`\``,
          options: [
            'Total is 60\nAverage is 20',
            'Total is 60\nAverage is 30',
            'Total is 30\nAverage is 10',
            'Total is 20\nAverage is 60'
          ],
          answer: 0,
          explanation: `Calculation steps:
- Iteration 1: Total = 0 + 10 = 10
- Iteration 2: Total = 10 + 20 = 30
- Iteration 3: Total = 30 + 30 = **60**
- Average = 60 / 3 = **20**`
        }
      ]
    },
    {
      id: "ch3",
      title: "Writing Pseudocode",
      emoji: "\u{270D}\u{FE0F}",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "\u{270D}\u{FE0F} Writing Pseudocode Questions",
          content: `Now let's practice **writing** pseudocode!

Common writing question types in the exam:
- Using **CASE statements**
- **Input validation**
- **Processing data with loops**
- Suggesting **meaningful identifiers**

Are you ready? \u{270D}\u{FE0F}`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Writing a CASE Statement",
          content: `Complete the code that takes an integer between 1 and 4 as input and processes it with a CASE statement.
- 1 to 4: output the corresponding word
- Otherwise: output "ERROR"`,
          code: 'INPUT Number\n___ OF Number\n    1: OUTPUT "One"\n    2: OUTPUT "Two"\n    3: OUTPUT "Three"\n    4: OUTPUT "Four"\n    ___: OUTPUT "ERROR"\n___',
          fillBlanks: [
            { id: 1, answer: "CASE", options: ["CASE", "IF", "SELECT", "SWITCH"] },
            { id: 2, answer: "OTHERWISE", options: ["OTHERWISE", "ELSE", "DEFAULT", "OTHER"] },
            { id: 3, answer: "ENDCASE", options: ["ENDCASE", "ENDIF", "END", "NEXT"] }
          ]
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Writing Input Validation",
          content: `Complete the validation code that only accepts numbers between 1 and 500.
If the input is out of range, it should prompt for input again.`,
          code: 'REPEAT\n    OUTPUT "Enter a number (1-500): "\n    INPUT Number\n___ Number < 1 ___ Number > 500',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "IF", "FOR"] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "XOR"] }
          ]
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "\u{1F9E0} Validation Loop Condition",
          content: `In the validation code above, why is the UNTIL condition \`Number >= 1 AND Number <= 500\`?

REPEAT...UNTIL stops when the condition becomes **TRUE**.`,
          options: [
            'To stop the loop when a valid value between 1 and 500 is entered',
            'To stop the loop when the value is less than 1 or greater than 500',
            'Because REPEAT always requires AND',
            'No particular reason, just convention'
          ],
          answer: 0,
          explanation: `REPEAT...UNTIL **stops** when the condition becomes **TRUE**.

Since the loop should stop when a valid input (1 to 500) is entered:
\`UNTIL Number >= 1 AND Number <= 500\`

\u{26A0}\u{FE0F} Conversely, if using a WHILE loop:
\`WHILE Number < 1 OR Number > 500\`
(keep looping while the input is invalid)`
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Array Total Calculation",
          content: `Complete the code that calculates the total of 5 scores in an array and counts how many values are 0.`,
          code: 'DECLARE Scores : ARRAY[1:5] OF INTEGER\nDECLARE Total : INTEGER\nDECLARE ZeroCount : INTEGER\n\nTotal \u2190 0\nZeroCount \u2190 0\n\nFOR i \u2190 1 ___ 5\n    IF Scores[i] = 0 THEN\n        ZeroCount \u2190 ZeroCount ___ 1\n    ENDIF\n    Total \u2190 ___ + Scores[i]\nNEXT i\n\nOUTPUT "Total: ", Total\nOUTPUT "Zeros: ", ZeroCount',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "WHILE", "BY"] },
            { id: 2, answer: "+", options: ["+", "-", "*", "/"] },
            { id: 3, answer: "Total", options: ["Total", "Scores[i]", "ZeroCount", "i"] }
          ]
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "\u{1F3F7}\u{FE0F} Meaningful Identifiers",
          content: `In the following pseudocode, variable names are not meaningful.

\`\`\`
DECLARE A : ARRAY[1:10] OF STRING
DECLARE T : STRING
DECLARE C : INTEGER
DECLARE L : INTEGER
L \u2190 10
\`\`\`

If this code is a **bubble sort algorithm for 10 names**,
what would be a suitable meaningful identifier for the array \`A\`?`,
          options: [
            'Names',
            'Data',
            'List',
            'Array1'
          ],
          answer: 0,
          explanation: `**Names** is the most appropriate!

Since the array stores names, "Names" is the clearest choice.

The other variables could also be renamed:
- T (temporary storage) \u2192 **Temp** or **TempName**
- C (counter) \u2192 **Counter** or **OuterLoop**
- L (array length) \u2192 **NumberOfNames** or **ListLength**

\u{1F4A1} Questions asking for **meaningful identifiers** appear frequently in exams!`
        }
      ]
    }
  ]
}
