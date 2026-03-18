// ============================================
// Pseudocode Lesson 9: CASE Statement (English)
// CIE Style Pseudocode - Choose one from many values!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson9EnData: LessonData = {
  id: "pseudo-9",
  title: "CASE Statement",
  emoji: "🔀",
  description: "Choose one from many values!",
  chapters: [
    {
      id: "ch1",
      title: "CASE Basics",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What is a CASE Statement?",
          content: `When you use IF statements to handle many different cases, the code gets messy:

\`\`\`
IF day = 1 THEN
    OUTPUT "Monday"
ELSE
    IF day = 2 THEN
        OUTPUT "Tuesday"
    ELSE
        IF day = 3 THEN
            OUTPUT "Wednesday"
        ENDIF
    ENDIF
ENDIF
\`\`\`

All those nested IFs are hard to read!

The **CASE statement** makes it much cleaner:

\`\`\`
CASE OF day
    1 : OUTPUT "Monday"
    2 : OUTPUT "Tuesday"
    3 : OUTPUT "Wednesday"
ENDCASE
\`\`\`

Use CASE when **one variable** could match **one of several specific values**!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📐 CASE Statement Syntax",
          content: `Here is the basic structure of a CASE statement in CIE pseudocode:

\`\`\`
CASE OF variable
    value1 : statement1
    value2 : statement2
    value3 : statement3
    OTHERWISE : default statement
ENDCASE
\`\`\`

Important rules:
- \`CASE OF\` is followed by the **variable** to check
- Each value is followed by a **colon (:)**
- \`OTHERWISE\` runs when **no values match** (like a default)
- Always end with \`ENDCASE\`

\`OTHERWISE\` is optional, but it is good practice to include it so unexpected values are handled!`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "🎯 CASE Example: Traffic Light",
          content: `Let's output a message based on a traffic light color:

\`\`\`
DECLARE light : STRING
INPUT light

CASE OF light
    "red"    : OUTPUT "Stop!"
    "yellow" : OUTPUT "Get ready!"
    "green"  : OUTPUT "Go!"
    OTHERWISE : OUTPUT "Invalid signal"
ENDCASE
\`\`\`

If \`light\` is \`"green"\`, the output is: **Go!**

If \`light\` is \`"blue"\`, the output is: **Invalid signal** (OTHERWISE runs!)`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What is the output when \`grade\` is \`"B"\`?

\`\`\`
CASE OF grade
    "A" : OUTPUT "Excellent!"
    "B" : OUTPUT "Well done!"
    "C" : OUTPUT "Not bad!"
    OTHERWISE : OUTPUT "Keep trying!"
ENDCASE
\`\`\``,
          options: [
            'Well done!',
            'Excellent!',
            'Not bad!',
            'Keep trying!'
          ],
          answer: 0,
          explanation: 'Since grade is "B", the second case matches. The output is **"Well done!"**.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the basic CASE statement structure.',
          code: '___ OF season\n    "spring" : OUTPUT "Flowers bloom"\n    "summer" : OUTPUT "Time for the beach"\n    "autumn" : OUTPUT "Leaves are falling"\n    "winter" : OUTPUT "It is snowing"\n    OTHERWISE : OUTPUT "Unknown season"\n___',
          fillBlanks: [
            { id: 1, answer: "CASE", options: ["CASE", "SWITCH", "SELECT", "CHECK"] },
            { id: 2, answer: "ENDCASE", options: ["ENDCASE", "END CASE", "ENDIF", "END"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Using CASE in Practice",
      emoji: "🚀",
      steps: [
        {
          id: "ch2-menu",
          type: "explain",
          title: "🍽️ Menu Selection Program",
          content: `CASE statements are perfect for menu-driven programs!

\`\`\`
DECLARE choice : INTEGER
OUTPUT "=== MENU ==="
OUTPUT "1. Start Game"
OUTPUT "2. Settings"
OUTPUT "3. Quit"
OUTPUT "Enter your choice: "
INPUT choice

CASE OF choice
    1 : OUTPUT "Starting the game!"
    2 : OUTPUT "Opening settings..."
    3 : OUTPUT "Goodbye!"
    OTHERWISE : OUTPUT "Invalid choice"
ENDCASE
\`\`\`

You can use CASE with integer values too, not just strings!
Each number maps cleanly to an action.`
        },
        {
          id: "ch2-div-reminder",
          type: "explain",
          title: "🔢 Quick Reminder: DIV",
          content: `This example uses the **DIV** operator. Quick review!

{!blue} **DIV** = the **quotient** of division (integer part only, discard remainder!)

| Operation | Calculation | Result |
|-----------|-----------|--------|
| \`85 DIV 10\` | 85 ÷ 10 = 8.5 → integer only! | **8** |
| \`73 DIV 10\` | 73 ÷ 10 = 7.3 → integer only! | **7** |
| \`100 DIV 10\` | 100 ÷ 10 = 10 | **10** |

💡 DIV by 10 gives you the **tens digit**! → Perfect for grade calculation with CASE!`
        },
        {
          id: "ch2-grade",
          type: "explain",
          title: "📊 Grade Calculation Program",
          content: `Here is a program that assigns a grade based on a score:

\`\`\`
DECLARE score : INTEGER
DECLARE grade : STRING
INPUT score

DECLARE tens : INTEGER
tens ← score DIV 10

CASE OF tens
    10 : grade ← "A+"
    9  : grade ← "A"
    8  : grade ← "B"
    7  : grade ← "C"
    6  : grade ← "D"
    OTHERWISE : grade ← "F"
ENDCASE

OUTPUT "Grade: " & grade
\`\`\`

If score is 85:
- \`tens ← 85 DIV 10\` gives tens = **8**
- CASE matches 8, so grade = **"B"**
- Output: **Grade: B**

The trick is using \`DIV 10\` to turn a range into a single value that CASE can check!`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this output when \`day\` is \`4\`?

\`\`\`
DECLARE day : INTEGER
day ← 4
DECLARE result : STRING

CASE OF day
    1 : result ← "Mon"
    2 : result ← "Tue"
    3 : result ← "Wed"
    4 : result ← "Thu"
    5 : result ← "Fri"
    OTHERWISE : result ← "Weekend"
ENDCASE

OUTPUT result & "day"
\`\`\``,
          options: [
            'Thursday',
            'Friday',
            'Wednesday',
            'Weekendday'
          ],
          answer: 0,
          explanation: 'day is 4, so result becomes "Thu". Then "Thu" & "day" is concatenated to produce **"Thursday"**!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the CASE statement for a direction-based movement system.',
          code: 'CASE OF direction\n    "up"    : y ← y - 1\n    "down"  : y ← y + 1\n    "left"  : x ← x - 1\n    "right" : x ← x + 1\n    ___ : OUTPUT "Invalid direction"\n___',
          fillBlanks: [
            { id: 1, answer: "OTHERWISE", options: ["OTHERWISE", "DEFAULT", "ELSE", "OTHER"] },
            { id: 2, answer: "ENDCASE", options: ["ENDCASE", "ENDIF", "END", "ENDSWITCH"] }
          ]
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ IF vs CASE: When to Use Which?",
          content: `**Use IF when:**
- Checking **ranges** (e.g., \`score >= 90\`)
- Comparing **different variables**
- Using **complex conditions** with AND/OR

\`\`\`
IF score >= 90 THEN
    OUTPUT "A"
ELSE
    IF score >= 80 THEN
        OUTPUT "B"
    ENDIF
ENDIF
\`\`\`

**Use CASE when:**
- One variable is compared against **specific values**
- There are **many choices** (like a menu)
- Examples: days of the week, menu options, grades

\`\`\`
CASE OF menu
    1 : OUTPUT "Start"
    2 : OUTPUT "Settings"
    3 : OUTPUT "Quit"
ENDCASE
\`\`\`

Summary:
- **Range comparison** --> IF statement
- **Specific value matching** --> CASE statement`
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which situation is BEST suited for a CASE statement?',
          options: [
            'Running different actions based on a menu choice (1 to 5)',
            'Checking if a student score is above 60',
            'Finding the larger of two numbers',
            'Checking if a number is positive or negative'
          ],
          answer: 0,
          explanation: 'CASE is ideal when one variable matches **specific values** like menu choices (1, 2, 3, 4, 5). The other situations involve comparisons or ranges, which are better handled by IF statements.'
        }
      ]
    }
  ]
}
