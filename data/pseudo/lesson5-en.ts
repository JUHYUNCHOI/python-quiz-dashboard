// ============================================
// Pseudocode Lesson 5: Conditionals (English)
// CIE-style IF...THEN...ELSE...ENDIF
// ============================================

import { LessonData } from '../types'

export const pseudoLesson5EnData: LessonData = {
  id: "pseudo-5",
  title: "Conditionals",
  emoji: "🔀",
  description: "IF...THEN...ELSE...ENDIF!",
  chapters: [
    {
      id: "ch1",
      title: "IF...THEN...ENDIF",
      emoji: "🚦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🚦 Making Decisions!",
          content: `Programs often need to **make decisions**.

For example:
- If it's raining, take an umbrella
- If the score is high enough, pass the exam

In pseudocode, we use **IF...THEN...ENDIF** to make decisions!

\`\`\`
IF condition THEN
    do something
ENDIF
\`\`\`

The code inside only runs **if the condition is TRUE**.`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "📋 IF...THEN...ENDIF Example",
          content: `Let's look at a real example:

\`\`\`
score ← 85
IF score >= 60 THEN
    OUTPUT "Pass!"
ENDIF
\`\`\`

Since \`score\` is **85**, and 85 >= 60 is **TRUE**, it outputs:
\`\`\`
Pass!
\`\`\`

What if \`score\` was **40**?
- 40 >= 60 is **FALSE**
- Nothing is output! The code inside the IF is **skipped**.

Always remember to close with **ENDIF**!`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quick Quiz!",
          content: `What keyword ends an IF statement in CIE pseudocode?`,
          options: [
            "END",
            "ENDIF",
            "FI",
            "STOP"
          ],
          answer: 1,
          explanation: "In CIE pseudocode, every **IF** must be closed with **ENDIF**!"
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
temperature ← 35
IF temperature > 30 THEN
    OUTPUT "It's hot today!"
ENDIF
OUTPUT "Have a nice day!"
\`\`\``,
          options: [
            'It\'s hot today!\nHave a nice day!',
            'Have a nice day!',
            'It\'s hot today!',
            'Nothing'
          ],
          answer: 0,
          explanation: '35 > 30 is **TRUE**, so "It\'s hot today!" is output. Then "Have a nice day!" always runs because it is **outside** the IF block!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the Blank!",
          content: 'Complete the code so it outputs "Welcome!" when age is 18 or above.',
          codeTemplate: 'IF age >= 18 ___\n    OUTPUT "Welcome!"\n___',
          fillBlanks: [
            { id: 1, answer: "THEN", options: ["THEN", "DO", "BEGIN", "RUN"] },
            { id: 2, answer: "ENDIF", options: ["ENDIF", "END", "STOP", "DONE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "IF...THEN...ELSE",
      emoji: "🔀",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔀 Two Paths: ELSE!",
          content: `What if you want to do **something different** when the condition is FALSE?

Use **IF...THEN...ELSE...ENDIF**!

\`\`\`
IF age >= 18 THEN
    OUTPUT "Adult"
ELSE
    OUTPUT "Minor"
ENDIF
\`\`\`

- If the condition is **TRUE** -- run the THEN block
- If the condition is **FALSE** -- run the ELSE block

One of the two **always** runs!`
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📋 Checking Even or Odd",
          content: `Here's a useful example using MOD (remainder):

\`\`\`
INPUT number
IF number MOD 2 = 0 THEN
    OUTPUT "Even"
ELSE
    OUTPUT "Odd"
ENDIF
\`\`\`

The \`MOD\` operator gives the remainder of division.
- 10 MOD 2 = **0** (even)
- 7 MOD 2 = **1** (odd)

Notice: in CIE pseudocode, **=** is used for comparison (not ==)!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
x ← 3
IF x > 5 THEN
    OUTPUT "Big"
ELSE
    OUTPUT "Small"
ENDIF
\`\`\``,
          options: [
            'Big',
            'Small',
            'Big\nSmall',
            'Nothing'
          ],
          answer: 1,
          explanation: '3 > 5 is **FALSE**, so the ELSE block runs and outputs **Small**.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the Blank!",
          content: 'Complete the code to output "Pass" if score >= 50, otherwise output "Fail".',
          codeTemplate: 'IF score >= 50 THEN\n    OUTPUT "Pass"\n___\n    OUTPUT "Fail"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "ELSE", options: ["ELSE", "OTHERWISE", "ELIF", "OR"] }
          ]
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz Time!",
          content: 'In CIE pseudocode, which symbol means "not equal to"?',
          options: [
            '!=',
            '<>',
            '=/=',
            '!=='
          ],
          answer: 1,
          explanation: 'In CIE pseudocode, **<>** means "not equal to". For example: `IF x <> 0 THEN ...`'
        }
      ]
    },
    {
      id: "ch3",
      title: "Operators & Nested IF",
      emoji: "🧩",
      steps: [
        {
          id: "ch3-operators",
          type: "explain",
          title: "🧩 Comparison Operators",
          content: `CIE pseudocode uses these comparison operators:

| Operator | Meaning |
|---|---|
| = | Equal to |
| <> | Not equal to |
| < | Less than |
| > | Greater than |
| <= | Less than or equal to |
| >= | Greater than or equal to |

Examples:
\`\`\`
IF score = 100 THEN
    OUTPUT "Perfect!"
ENDIF

IF name <> "" THEN
    OUTPUT "Name is not empty"
ENDIF
\`\`\``
        },
        {
          id: "ch3-logical",
          type: "explain",
          title: "🔗 AND, OR, NOT",
          content: `You can combine conditions with **AND**, **OR**, and **NOT**!

**AND** -- both must be TRUE:
\`\`\`
IF age >= 13 AND age <= 19 THEN
    OUTPUT "Teenager"
ENDIF
\`\`\`

**OR** -- at least one must be TRUE:
\`\`\`
IF day = "Saturday" OR day = "Sunday" THEN
    OUTPUT "Weekend!"
ENDIF
\`\`\`

**NOT** -- flips TRUE to FALSE:
\`\`\`
IF NOT gameOver THEN
    OUTPUT "Keep playing!"
ENDIF
\`\`\``
        },
        {
          id: "ch3-nested",
          type: "explain",
          title: "🪆 Nested IF Statements",
          content: `You can put an IF **inside** another IF. This is called **nesting**.

\`\`\`
IF score >= 60 THEN
    IF score >= 90 THEN
        OUTPUT "Excellent!"
    ELSE
        OUTPUT "Good job!"
    ENDIF
ELSE
    OUTPUT "Try again."
ENDIF
\`\`\`

How it works:
- score = 95 -- "Excellent!"
- score = 75 -- "Good job!"
- score = 40 -- "Try again."

Each IF needs its own **ENDIF**!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the Output!",
          content: `What does this code output?

\`\`\`
age ← 15
hasTiclet ← TRUE
IF age >= 12 AND hasTicket = TRUE THEN
    OUTPUT "Enjoy the movie!"
ELSE
    OUTPUT "Sorry, no entry."
ENDIF
\`\`\``,
          options: [
            'Enjoy the movie!',
            'Sorry, no entry.',
            'Enjoy the movie!\nSorry, no entry.',
            'Error'
          ],
          answer: 0,
          explanation: 'age >= 12 is **TRUE** and hasTicket = TRUE is **TRUE**. Since both are TRUE, the AND condition is TRUE, so it outputs "Enjoy the movie!"'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the Blank!",
          content: 'Complete the code to check if a number is between 1 and 100 (inclusive).',
          codeTemplate: 'IF num >= 1 ___ num <= 100 THEN\n    OUTPUT "Valid range!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] }
          ]
        }
      ]
    }
  ]
}
