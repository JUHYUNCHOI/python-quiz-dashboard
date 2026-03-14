// ============================================
// Pseudocode Past Paper Practice: Part 2 (English)
// CASE, PROCEDURE/FUNCTION, Parameters (BYVAL/BYREF),
// String Functions, File Handling, 2D Arrays
// IGCSE 0478 Paper 2 Style
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP2EnData: LessonData = {
  id: "pseudo-p2",
  title: "Past Paper Practice 2",
  emoji: "\u{1F4DD}",
  description: "Part 2 Past Paper Practice!",
  chapters: [
    {
      id: "ch1",
      title: "Procedures & Functions",
      emoji: "\u{1F527}",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "\u{1F527} PROCEDURE & FUNCTION Exam Question Types",
          content: `**PROCEDURE/FUNCTION** questions frequently appear in IGCSE Paper 2!

Common question types:
- \u{1F50D} Distinguishing between **PROCEDURE and FUNCTION**
- \u{1F4E5} **BYVAL vs BYREF** parameter passing methods
- \u{1F4DD} Writing **CALL** code for PROCEDURE/FUNCTION
- \u{1F52E} Predicting **RETURN values** of FUNCTIONS

Key summary:
- **PROCEDURE**: Only performs a task, does NOT return a value
- **FUNCTION**: Always RETURNS a value
- **BYVAL**: Passes a copy of the value (original NOT changed \u274C)
- **BYREF**: Passes a reference to the original variable (original IS changed \u2B55)

Are you ready? \u{1F4AA}`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "\u{1F9E0} PROCEDURE Definition",
          content: `Which of the following is a subroutine that **may not RETURN a value**?`,
          options: [
            'PROCEDURE',
            'FUNCTION',
            'VARIABLE',
            'ARRAY'
          ],
          answer: 0,
          explanation: `A **PROCEDURE** does not return a value.

It only performs a task and then finishes.

\`\`\`
PROCEDURE PrintMessage()
    OUTPUT "Hello!"
ENDPROCEDURE
\`\`\`

In contrast, a FUNCTION **always** returns a value!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "\u{1F9E0} FUNCTION Definition",
          content: `Which of the following is a subroutine that **always RETURNS a value**?`,
          options: [
            'FUNCTION',
            'PROCEDURE',
            'LOOP',
            'MODULE'
          ],
          answer: 0,
          explanation: `A **FUNCTION** always returns a value.

\`\`\`
FUNCTION Double(n : INTEGER) RETURNS INTEGER
    RETURN n * 2
ENDFUNCTION
\`\`\`

A FUNCTION:
- Specifies the return data type with the **RETURNS** keyword
- Returns a value with the **RETURN** keyword
- Can be stored in a variable or used in an OUTPUT when called`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "\u{1F9E0} BYVAL vs BYREF",
          content: `Which parameter passing method can **change the value of the original variable**?

\`\`\`
PROCEDURE Swap(BYREF x : INTEGER, BYREF y : INTEGER)
    DECLARE temp : INTEGER
    temp \u2190 x
    x \u2190 y
    y \u2190 temp
ENDPROCEDURE
\`\`\``,
          options: [
            'BYREF',
            'BYVAL',
            'BYNAME',
            'BYTYPE'
          ],
          answer: 0,
          explanation: `**BYREF** (By Reference) passes a **reference** to the original variable.

If you change the value inside the subroutine, **the original variable also changes!**

Comparison:
- **BYVAL**: Passes a copy of the value \u2192 original NOT changed \u274C
- **BYREF**: Passes a reference to the original \u2192 original IS changed \u2B55

\u{1F4A1} Exam tip: "The value needs to change" \u2192 BYREF!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Calling a PROCEDURE",
          content: `Complete the code to call the procedure \`Average\` with the values 25 and 50.`,
          code: '___ Average(25, 50)',
          fillBlanks: [
            { id: 1, answer: "CALL", options: ["CALL", "RUN", "EXECUTE", "START"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "\u{1F52E} Predict the FUNCTION Result",
          content: `What is the result of the following FUNCTION call?

\`\`\`
FUNCTION CalcArea(length : INTEGER,
                  width : INTEGER)
                  RETURNS INTEGER
    RETURN length * width
ENDFUNCTION

OUTPUT CalcArea(5, 3) + CalcArea(2, 4)
\`\`\``,
          options: [
            '23',
            '15',
            '8',
            '30'
          ],
          answer: 0,
          explanation: `Let's calculate step by step:

1. CalcArea(5, 3) = 5 * 3 = **15**
2. CalcArea(2, 4) = 2 * 4 = **8**
3. 15 + 8 = **23**

Since FUNCTIONS return a value, they can be used directly in expressions! \u{1F3AF}`
        }
      ]
    },
    {
      id: "ch2",
      title: "Strings & File Handling",
      emoji: "\u{1F4C1}",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "\u{1F4C1} String & File Handling Exam Question Types",
          content: `**String functions** and **file handling** questions frequently appear in IGCSE Paper 2!

Common string functions:
- \u{1F4CF} **LENGTH("Hello")** \u2192 5 (number of characters)
- \u2702\u{FE0F} **SUBSTRING("Computer", 1, 4)** \u2192 "Comp" (substring extraction)
- \u{1F520} **UCASE("hello")** \u2192 "HELLO" (convert to uppercase)
- \u{1F521} **LCASE("HELLO")** \u2192 "hello" (convert to lowercase)

File handling keywords:
- \u{1F4C2} **OPENFILE** "filename" FOR READ/WRITE/APPEND
- \u{1F4D6} **READFILE** "filename", variable
- \u{270D}\u{FE0F} **WRITEFILE** "filename", data
- \u{1F512} **CLOSEFILE** "filename"

Especially important: **SUBSTRING** indexing and distinguishing **file modes** (READ/WRITE/APPEND)! \u{1F4A1}`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "\u{1F4CF} LENGTH Function",
          content: `What is the result of the following code?

\`\`\`
OUTPUT LENGTH("Hello World")
\`\`\``,
          options: [
            '11',
            '10',
            '12',
            '5'
          ],
          answer: 0,
          explanation: `**LENGTH("Hello World")** = **11**

Let's count the characters in "Hello World":
H-e-l-l-o-( )-W-o-r-l-d
1-2-3-4-5-6-7-8-9-10-11

\u{1F4A1} Spaces count as a character too!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "\u{1F52E} Predict the SUBSTRING Result",
          content: `What is the output of the following code?

\`\`\`
DECLARE Word : STRING
Word \u2190 "Computer"
OUTPUT SUBSTRING(Word, 1, 4)
\`\`\`

\u{1F4A1} SUBSTRING(string, start position, length)`,
          options: [
            'Comp',
            'Compu',
            'ompu',
            'pute'
          ],
          answer: 0,
          explanation: `**SUBSTRING("Computer", 1, 4)** = **"Comp"**

Starting from position 1, extract 4 characters:
\`C-o-m-p\`-u-t-e-r
 1-2-3-4

SUBSTRING(string, **start position**, **length**)
- Start position: 1 (from the first character)
- Length: 4 (extract 4 characters)`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} File Reading + String Processing",
          content: `Complete the code that reads a string from "Quotation.txt", outputs it in uppercase, and also outputs its length.`,
          code: 'DECLARE MyString : STRING\nOPENFILE "Quotation.txt" FOR ___\nREADFILE "Quotation.txt", ___\n___ "Quotation.txt"\nOUTPUT UCASE(MyString)\nOUTPUT LENGTH(MyString)',
          fillBlanks: [
            { id: 1, answer: "READ", options: ["READ", "WRITE", "APPEND", "INPUT"] },
            { id: 2, answer: "MyString", options: ["MyString", "Quotation", "File", "Line"] },
            { id: 3, answer: "CLOSEFILE", options: ["CLOSEFILE", "ENDFILE", "CLOSE", "STOPFILE"] }
          ]
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "\u{1F9E0} Advantages of File Storage",
          content: `Why is it useful to store data in a **file** instead of a **variable**?`,
          options: [
            'Because data persists even after the program ends',
            'Because files are faster than variables',
            'Because files do not use memory',
            'Because storing in files prevents errors'
          ],
          answer: 0,
          explanation: `Storing data in a file means it **remains even after the program ends**!

Variables disappear when the program finishes, but files are **persistent**.

Advantages of file storage:
- \u{1F4CC} Data persists after the program terminates
- \u{1F4BE} Can be read again the next time the program runs
- \u{1F4E4} Data can be shared with other programs

\u{1F4A1} Common exam keyword: **"data persists after the program ends"**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "\u{1F52E} Combined String Functions",
          content: `What is the output of the following code?

\`\`\`
DECLARE Text : STRING
Text \u2190 "Cambridge"
OUTPUT UCASE(SUBSTRING(Text, 4, 3))
OUTPUT LENGTH(Text)
\`\`\`

\u{1F4A1} SUBSTRING(string, start position, length)`,
          options: [
            'BRI\n9',
            'bri\n9',
            'CAM\n9',
            'BRI\n6'
          ],
          answer: 0,
          explanation: `Let's solve it step by step:

1. Text = "Cambridge"
2. SUBSTRING("Cambridge", 4, 3)
   - 3 characters starting from position 4: "bri"
   C-a-m-**b-r-i**-d-g-e
   1-2-3-**4-5-6**-7-8-9
3. UCASE("bri") = **"BRI"**
4. LENGTH("Cambridge") = **9**

Output: **BRI** and **9**`
        }
      ]
    },
    {
      id: "ch3",
      title: "Finding & Fixing Errors",
      emoji: "\u{1F41B}",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "\u{1F41B} Pseudocode with Errors",
          content: `The following pseudocode is a program that keeps accepting **positive numbers** and adds them to a total, then **stops when 0 is entered**.

However, it contains **4 errors**! \u{1F50D}

\`\`\`
01 Exit \u2190 1
02 WHILE Exit <> 0 DO
03     INPUT Number
04     IF Number < 0
05         THEN
06             Total \u2190 Total + Number
07         ELSE
08             IF Number = 0
09                 THEN
10                     Exit \u2190 1
11             ENDIF
12     ENDIF
13 ENDWHILE
14 OUTPUT "The total of your numbers is ", Number
\`\`\`

The intended behavior:
- If a positive number is entered, add it to Total
- If 0 is entered, stop the loop
- At the end, output the total

Can you spot the errors? \u{1F914}`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "\u{1F41B} Error 1: Line 04",
          code: `01 Exit \u2190 1\n02 WHILE Exit <> 0 DO\n03     INPUT Number\n04     IF Number < 0\n05         THEN\n06             Total \u2190 Total + Number\n07         ELSE\n08             IF Number = 0\n09                 THEN\n10                     Exit \u2190 1\n11             ENDIF\n12     ENDIF\n13 ENDWHILE\n14 OUTPUT "The total of your numbers is ", Number`,
          content: `What is the error on line 04: \`IF Number < 0\`?

The intended behavior: If the number is **positive**, it should be added to Total.`,
          options: [
            '< should be changed to > (since we are checking for positive numbers)',
            '< should be changed to =',
            '0 should be 1 instead',
            'No error'
          ],
          answer: 0,
          explanation: `To check for **positive** numbers, it should be \`Number > 0\`!

Currently \`Number < 0\` checks for **negative** numbers.

Fix: \`IF Number > 0\`

\u{1F4A1} Pay close attention to the direction of inequality signs!`
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "\u{1F41B} Error 2: Line 10",
          code: `01 Exit \u2190 1\n02 WHILE Exit <> 0 DO\n03     INPUT Number\n04     IF Number < 0\n05         THEN\n06             Total \u2190 Total + Number\n07         ELSE\n08             IF Number = 0\n09                 THEN\n10                     Exit \u2190 1\n11             ENDIF\n12     ENDIF\n13 ENDWHILE\n14 OUTPUT "The total of your numbers is ", Number`,
          content: `What is the error on line 10: \`Exit \u2190 1\`?

The intended behavior: When 0 is entered, the **loop should stop**.
Line 02: \`WHILE Exit <> 0 DO\` (loop while Exit is not 0)`,
          options: [
            'Exit \u2190 1 should be changed to Exit \u2190 0',
            'Exit should be replaced with Number',
            '1 should be -1 instead',
            'No error'
          ],
          answer: 0,
          explanation: `Since the WHILE condition is \`Exit <> 0\`, Exit must be set to **0** to stop the loop!

Currently Exit \u2190 1 keeps Exit at 1, so **the loop never stops!**

Fix: \`Exit \u2190 0\`

\u{1F4A1} Look carefully at the WHILE condition to determine which value stops the loop!`
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "\u{1F41B} Error 3: Line 14",
          code: `01 Exit \u2190 1\n02 WHILE Exit <> 0 DO\n03     INPUT Number\n04     IF Number < 0\n05         THEN\n06             Total \u2190 Total + Number\n07         ELSE\n08             IF Number = 0\n09                 THEN\n10                     Exit \u2190 1\n11             ENDIF\n12     ENDIF\n13 ENDWHILE\n14 OUTPUT "The total of your numbers is ", Number`,
          content: `What is the error on line 14: \`OUTPUT "The total of your numbers is ", Number\`?

The intended behavior: Output the **total** at the end.`,
          options: [
            'Number should be replaced with Total',
            'OUTPUT should be replaced with PRINT',
            'The comma should be replaced with &',
            'No error'
          ],
          answer: 0,
          explanation: `Since we need to output the total, we should output **Total**!

Number holds the last value entered (0),
while **Total** stores the accumulated sum.

Fix: \`OUTPUT "The total of your numbers is ", Total\`

\u{1F4A1} Be careful not to confuse similarly named variables!`
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "\u{1F41B} Error 4: Missing Code",
          code: `01 Exit \u2190 1\n02 WHILE Exit <> 0 DO\n03     INPUT Number\n04     IF Number < 0\n05         THEN\n06             Total \u2190 Total + Number\n07         ELSE\n08             IF Number = 0\n09                 THEN\n10                     Exit \u2190 1\n11             ENDIF\n12     ENDIF\n13 ENDWHILE\n14 OUTPUT "The total of your numbers is ", Number`,
          content: `The code above is **missing an important piece of code**.

What needs to be done before using Total?`,
          options: [
            'Total must be initialized with Total \u2190 0',
            'Total does not need to be DECLAREd',
            'Total needs to be PRINTed',
            'Total should be assigned the value 1'
          ],
          answer: 0,
          explanation: `The initialization **Total \u2190 0** is missing!

Before adding values to Total, it must be **initialized to 0**.
Without initialization, Total may contain a garbage value.

Code to add:
\`\`\`
DECLARE Total : INTEGER
Total \u2190 0
\`\`\`

\u{1F4A1} Always **initialize to 0** before using a total (Total) or counter (Count)!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "\u{270F}\u{FE0F} Complete the Corrected Code",
          content: `Complete the code with all 4 errors fixed.`,
          code: 'DECLARE Total : INTEGER\nDECLARE Number : INTEGER\nDECLARE Exit : INTEGER\nTotal \u2190 ___\nExit \u2190 1\nWHILE Exit <> 0 DO\n    INPUT Number\n    IF Number ___ 0\n        THEN\n            Total \u2190 Total + Number\n        ELSE\n            IF Number = 0\n                THEN\n                    Exit \u2190 ___\n            ENDIF\n    ENDIF\nENDWHILE\nOUTPUT "The total of your numbers is ", ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "10", "-1"] },
            { id: 2, answer: ">", options: [">", "<", "=", ">="] },
            { id: 3, answer: "0", options: ["0", "1", "-1", "2"] },
            { id: 4, answer: "Total", options: ["Total", "Number", "Exit", "0"] }
          ]
        }
      ]
    }
  ]
}
