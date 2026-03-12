// ============================================
// Pseudocode Lesson 2: Variables (English)
// ============================================

import { LessonData } from '../types'

export const pseudoLesson2EnData: LessonData = {
  id: "pseudo-2",
  title: "Variables",
  emoji: "📦",
  description: "A box that stores data!",
  chapters: [
    {
      id: "ch1",
      title: "What are Variables?",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 What is a Variable?",
          content: `A **variable** is like a labeled box that stores data.

You can put a value in the box, look at it later, or replace it with something new!

| Real Life | Pseudocode |
|---|---|
| A jar labeled "cookies" holding 5 cookies | A variable named \`cookies\` storing the value \`5\` |

In CIE pseudocode, we **declare** (create) a variable before using it.`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 Declaring Variables with DECLARE",
          content: `To create a variable, use **DECLARE**:

\`\`\`
DECLARE age : INTEGER
\`\`\`

This means: "Create a box called \`age\` that holds whole numbers."

The format is:
\`\`\`
DECLARE <name> : <type>
\`\`\`

Examples:
\`\`\`
DECLARE score : INTEGER
DECLARE name : STRING
DECLARE price : REAL
\`\`\`

You must always tell the computer what **type** of data the variable will hold!`
        },
        {
          id: "ch1-assign",
          type: "explain",
          title: "🔄 Assigning Values with the Arrow",
          content: `To put a value into a variable, we use the **assignment arrow** \`←\`:

\`\`\`
DECLARE age : INTEGER
age ← 15
\`\`\`

This means: "Put the value 15 into the box called \`age\`."

For text (strings), use double quotes:
\`\`\`
DECLARE name : STRING
name ← "Alice"
\`\`\`

Now \`name\` holds the text **"Alice"** and \`age\` holds the number **15**.

| Step | What happens |
|---|---|
| \`DECLARE age : INTEGER\` | An empty box labeled \`age\` is created |
| \`age ← 15\` | The value 15 is placed in the box |`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blank!",
          content: "Complete the code to declare a variable called `score` that holds whole numbers.",
          codeTemplate: "___ score : INTEGER",
          fillBlanks: [
            { id: 1, answer: "DECLARE", options: ["DECLARE", "CREATE", "SET", "INPUT"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Using Variables",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-output",
          type: "explain",
          title: "📢 Displaying Variables with OUTPUT",
          content: `You can display a variable's value using **OUTPUT**:

\`\`\`
DECLARE name : STRING
name ← "Coderin"
OUTPUT name
\`\`\`

This displays: **Coderin**

Notice: no quotes around \`name\`! Quotes would print the word "name" literally.

You can also combine text and variables using **&** (concatenation):
\`\`\`
DECLARE age : INTEGER
age ← 10
OUTPUT "I am " & age & " years old"
\`\`\`

This displays: **I am 10 years old**`
        },
        {
          id: "ch2-reassign",
          type: "explain",
          title: "🔄 Changing a Variable's Value",
          content: `Variables can **change** their value at any time!

\`\`\`
DECLARE score : INTEGER
score ← 0
OUTPUT score
score ← 100
OUTPUT score
\`\`\`

Output:
\`\`\`
0
100
\`\`\`

The old value is **replaced** by the new one. Think of it as emptying the box and putting something new inside.

You can even use the variable's own value to update it:
\`\`\`
DECLARE count : INTEGER
count ← 5
count ← count + 1
OUTPUT count
\`\`\`

Output: **6** (because 5 + 1 = 6)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE x : INTEGER
x ← 3
x ← x + 7
OUTPUT x
\`\`\``,
          options: [
            "10",
            "3",
            "7",
            "Error"
          ],
          answer: 0,
          explanation: "First, `x` is set to 3. Then `x ← x + 7` means `x ← 3 + 7`, so `x` becomes **10**. OUTPUT displays **10**."
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: "Complete the code to store \"Hello\" in a variable and display it.",
          codeTemplate: "DECLARE greeting : STRING\ngreeting ___ \"Hello\"\n___ greeting",
          fillBlanks: [
            { id: 1, answer: "←", options: ["←", "=", "==", ":"] },
            { id: 2, answer: "OUTPUT", options: ["OUTPUT", "PRINT", "DISPLAY", "SHOW"] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 Final Quiz!",
          content: "What is the output of this code?\n\n```\nDECLARE a : INTEGER\nDECLARE b : INTEGER\na ← 5\nb ← a\na ← 10\nOUTPUT b\n```",
          options: [
            "5",
            "10",
            "15",
            "Error"
          ],
          answer: 0,
          explanation: "When `b ← a` runs, `a` is 5, so `b` gets the value **5**. Later, `a` changes to 10, but `b` still holds **5**. Variables store copies of values, not links!"
        },
      ]
    },
  ]
}
