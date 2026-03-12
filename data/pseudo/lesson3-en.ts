// ============================================
// Pseudocode Lesson 3: INPUT (English)
// ============================================

import { LessonData } from '../types'

export const pseudoLesson3EnData: LessonData = {
  id: "pseudo-3",
  title: "INPUT",
  emoji: "⌨️",
  description: "Getting input from the user!",
  chapters: [
    {
      id: "ch1",
      title: "What is INPUT?",
      emoji: "⌨️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "⌨️ What is INPUT?",
          content: `So far, we've been putting values into variables ourselves using \`←\`.

But what if we want the **user** to type in a value? That's where **INPUT** comes in!

\`\`\`
DECLARE name : STRING
INPUT name
\`\`\`

When this runs, the program **pauses** and waits for the user to type something. Whatever they type gets stored in the variable \`name\`.

Think of it like a question box that waits for an answer!`
        },
        {
          id: "ch1-prompt",
          type: "explain",
          title: "💬 Prompting the User",
          content: `It's good practice to tell the user **what to type** before asking for input. Use OUTPUT first!

\`\`\`
DECLARE age : INTEGER
OUTPUT "How old are you?"
INPUT age
\`\`\`

What happens step by step:
1. The screen shows: **How old are you?**
2. The program waits for the user to type
3. User types: **12**
4. The value 12 is stored in \`age\`

Without the OUTPUT message, the user would see a blank screen and not know what to do!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blank!",
          content: "Complete the code so the user can type their name into the variable.",
          code: "DECLARE name : STRING\nOUTPUT \"What is your name?\"\n___ name",
          fillBlanks: [
            { id: 1, answer: "INPUT", options: ["INPUT", "OUTPUT", "DECLARE", "GET"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Combining Input and Output",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-combine",
          type: "explain",
          title: "🔗 Using INPUT with OUTPUT",
          content: `The real power comes from **combining** INPUT and OUTPUT!

\`\`\`
DECLARE name : STRING
OUTPUT "Enter your name:"
INPUT name
OUTPUT "Hello, " & name & "!"
\`\`\`

If the user types **Alice**, the output is:
\`\`\`
Enter your name:
Hello, Alice!
\`\`\`

The **&** symbol joins (concatenates) text and variables together!

| Symbol | Meaning | Example |
|---|---|---|
| & | Join text together | \`"Hi " & name\` |`
        },
        {
          id: "ch2-multiple",
          type: "explain",
          title: "📋 Multiple Inputs",
          content: `You can ask the user for multiple values:

\`\`\`
DECLARE firstName : STRING
DECLARE lastName : STRING
DECLARE age : INTEGER

OUTPUT "Enter your first name:"
INPUT firstName
OUTPUT "Enter your last name:"
INPUT lastName
OUTPUT "Enter your age:"
INPUT age

OUTPUT firstName & " " & lastName & " is " & age & " years old"
\`\`\`

If the user types **John**, then **Smith**, then **14**, the final output is:
**John Smith is 14 years old**

Each INPUT stores a value in a different variable!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `The user types **7** when asked. What is **all the output** shown on screen?

\`\`\`
DECLARE num : INTEGER
OUTPUT "Enter a number:"
INPUT num
num ← num * 2
OUTPUT "Double is: " & num
\`\`\``,
          options: [
            "Enter a number:\nDouble is: 14",
            "Double is: 14",
            "Enter a number:\nDouble is: 7",
            "Enter a number:\nDouble is: num * 2"
          ],
          answer: 0,
          explanation: "First OUTPUT shows **Enter a number:**. The user inputs **7**, so `num` is 7. Then `num ← num * 2` makes `num` equal to **14**. The second OUTPUT shows **Double is: 14**. Two OUTPUTs = two lines!"
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: "Complete the code to ask for a city name and display a greeting.",
          code: "DECLARE city : STRING\n___ \"Where do you live?\"\nINPUT city\nOUTPUT \"Welcome to \" ___ city",
          fillBlanks: [
            { id: 1, answer: "OUTPUT", options: ["OUTPUT", "INPUT", "DECLARE", "PRINT"] },
            { id: 2, answer: "&", options: ["&", "+", ",", "."] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 Final Quiz!",
          content: "The user types **Cat**. What does this code display?\n\n```\nDECLARE pet : STRING\nOUTPUT \"What is your pet?\"\nINPUT pet\nOUTPUT \"I love my \" & pet & \"!\"\n```",
          options: [
            "I love my Cat!",
            "I love my pet!",
            "What is your pet? Cat",
            "Error"
          ],
          answer: 0,
          explanation: "The user types **Cat**, which is stored in `pet`. Then `\"I love my \" & pet & \"!\"` joins the text with the variable value, producing **I love my Cat!**."
        },
      ]
    },
  ]
}
