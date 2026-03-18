// ============================================
// Pseudocode Lesson 1: OUTPUT (English)
// ============================================

import { LessonData } from '../types'

export const pseudoLesson1EnData: LessonData = {
  id: "pseudo-1",
  title: "OUTPUT",
  emoji: "📢",
  description: "Display text on screen!",
  chapters: [
    {
      id: "ch1",
      title: "What is Pseudocode?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What is Pseudocode?",
          content: `**Pseudocode** is NOT a programming language!

It's a way to write algorithms (problem-solving steps) in **plain, human-readable words**.

Why learn it?
- 🧠 Build **logical thinking** skills
- 📝 Design a **blueprint** before coding in any language
- 🏫 Used in exams (CIE, AP, etc.)

Pseudocode uses English words — very simple ones!`
        },
        {
          id: "ch1-output",
          type: "explain",
          title: "📢 Displaying with OUTPUT!",
          content: `To show something on screen, use **OUTPUT**!

\`\`\`
OUTPUT "Hello, World!"
\`\`\`

This displays **Hello, World!** on the screen.

Compare with other languages:

| Pseudocode 📋 | Python 🐍 | C++ ⚡ |
|---|---|---|
| OUTPUT "Hello" | print("Hello") | cout << "Hello" |

Pseudocode is the easiest to read! 😊`
        },
      ]
    },
    {
      id: "ch2",
      title: "Different Outputs",
      emoji: "🔤",
      steps: [
        {
          id: "ch2-strings",
          type: "explain",
          title: "🔤 Text and Numbers",
          content: `Text (strings) goes inside double quotes **" "**:

\`\`\`
OUTPUT "Name: Coderin"
\`\`\`

Numbers go without quotes:

\`\`\`
OUTPUT 42
OUTPUT 3 + 7
\`\`\`

Math works too! \`3 + 7\` outputs **10**.`
        },
        {
          id: "ch2-multi",
          type: "explain",
          title: "📝 Multiple Lines",
          content: `Multiple OUTPUT statements print on separate lines:

\`\`\`
OUTPUT "First line"
OUTPUT "Second line"
OUTPUT "Third line"
\`\`\`

Result:
\`\`\`
First line
Second line
Third line
\`\`\`

Each OUTPUT prints on a new line! 📄`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
OUTPUT 10 + 5
OUTPUT "10 + 5"
\`\`\``,
          options: [
            '15\n10 + 5',
            '10 + 5\n10 + 5',
            '15\n15',
            'Error'
          ],
          answer: 0,
          explanation: 'Without quotes, `10 + 5` is calculated as **15**. With quotes, `"10 + 5"` is printed literally as **10 + 5**!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blank!",
          content: 'Complete the code to display "Pseudocode is fun!" on screen.',
          code: '___ "Pseudocode is fun!"',
          fillBlanks: [
            { id: 1, answer: "OUTPUT", options: ["OUTPUT", "PRINT", "INPUT", "DISPLAY"] }
          ]
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Numbers vs text!",
          content: 'Complete the code to output 100 as a calculation result, then "100" as text.',
          code: 'OUTPUT 50 + ___\nOUTPUT ___ 100 ___',
          fillBlanks: [
            { id: 0, answer: "50", options: ["50", "100", "\"50\"", "OUTPUT"] },
            { id: 1, answer: '"', options: ['"', "'", "(", ""] },
            { id: 2, answer: '"', options: ['"', "'", ")", ""] }
          ],
          explanation: 'Without quotes, 50 + 50 calculates to 100. With quotes, "100" outputs the text 100!'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 How many lines?",
          content: `What is the output?

\`\`\`
OUTPUT "A"
OUTPUT "B"
OUTPUT "C"
OUTPUT 1 + 2 + 3
\`\`\``,
          options: [
            'A\nB\nC\n6',
            'ABC\n6',
            'A\nB\nC\n1 + 2 + 3',
            'ABC123'
          ],
          answer: 0,
          explanation: 'Each OUTPUT goes on a new line! A, B, C each on one line, and 1+2+3 calculates to 6.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "❓ OUTPUT syntax!",
          content: 'What is the purpose of double quotes in `OUTPUT "Hello"`?',
          options: [
            'Optional decoration',
            'Indicates Hello is text (a string)',
            'Makes Hello print larger',
            'Adds a line break'
          ],
          answer: 1,
          explanation: 'Double quotes " " mark the content as **text (string)**. Without quotes, it would be treated as a variable or calculation!'
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 Final Quiz!",
          content: 'Which statement about pseudocode is **FALSE**?',
          options: [
            'Pseudocode is not a specific programming language',
            'OUTPUT displays things on screen',
            'Pseudocode can be directly executed by a computer',
            'It\'s a way to express algorithms in human-readable form'
          ],
          answer: 2,
          explanation: 'Pseudocode **cannot be directly executed** by a computer! It\'s a tool for designing and explaining algorithms. To run it, you need to convert it to a real programming language like Python or C++.'
        },
      ]
    },
  ]
}
