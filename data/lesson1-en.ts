// ============================================
// Lesson 1: print() Output
// ============================================
import { LessonData } from './types'

export const lesson1EnData: LessonData = {
  id: "1",
  title: "print() Output",
  emoji: "🖨️",
  description: "Print text and numbers to the screen!",
  chapters: [
    {
      id: "ch1",
      title: "Your First Output!",
      emoji: "👋",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎉 Welcome to the World of Python!",
          content: `The very first step of programming!
Let's start by **printing text to the screen**.

Every programmer's first code:
\`\`\`python
print('Hello, World!')
\`\`\`

Run it and \`Hello, World!\` appears on the screen! ✨`
        },
        {
          id: "print-explain",
          type: "explain",
          title: "🖨️ The print() Function",
          content: `**print()** = a function that outputs to the screen

\`\`\`python
print('Hello!')
\`\`\`

- \`print\` = the command that says "display this!"
- \`( )\` = put what you want to display inside the parentheses
- \`' '\` = wrap strings in quotes

**Single quotes '** or **double quotes "** — both work!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print Hello, World!",
          initialCode: "print(___)",
          expectedOutput: "Hello, World!",
          hint: "Put a string inside print()",
          hint2: "print('Hello, World!')"
        },
        {
          id: "try2",
          type: "explain",
          title: "🌍 Any Language Works!",
          content: `Python can print **any language** — not just English!\n\n\`\`\`python\nprint('안녕하세요!')  # Korean\nprint('Bonjour!')     # French\nprint('こんにちは!')  # Japanese\n\`\`\`\n\nAs long as it's inside quotes, Python prints it!`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the output of `print('파이썬')`?",
          options: ["print('파이썬')", "'파이썬'", "파이썬", "Error"],
          answer: 2,
          explanation: "Only the content inside the quotes gets printed!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Printing Numbers",
      emoji: "🔢",
      steps: [
        {
          id: "number-explain",
          type: "explain",
          title: "🔢 Printing Numbers",
          content: `Numbers are printed **without quotes**!

\`\`\`python
print(123)      # integer
print(3.14)     # decimal
print(100 + 50) # math works too!
\`\`\`

Python automatically calculates and displays the result! 🧮`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print the number 2024!",
          initialCode: "print(___)",
          expectedOutput: "2024",
          hint: "No quotes for numbers!",
          hint2: "print(2024)"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Let's Do Some Math!",
          task: "Print the result of 100 + 200!",
          initialCode: "# Calculate and print 100 + 200\nprint(___)",
          expectedOutput: "300",
          hint: "Calculate directly inside print()!",
          hint2: "print(100 + 200)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between `print('100')` and `print(100)`?",
          options: [
            "No difference",
            "'100' is text, 100 is a number",
            "'100' causes an error",
            "100 causes an error"
          ],
          answer: 1,
          explanation: "With quotes it's a string, without quotes it's a number!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Multi-line Output",
      emoji: "📝",
      steps: [
        {
          id: "multi-explain",
          type: "explain",
          title: "📝 Printing Multiple Lines",
          content: `Use print() multiple times to output multiple lines!

\`\`\`python
print('First line')
print('Second line')
print('Third line')
\`\`\`

Result:
\`\`\`
First line
Second line
Third line
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 'Age: 15' and 'Hobby: Gaming'!",
          initialCode: "print('Name: John')\n# Print age and hobby too\nprint(___)\nprint(___)",
          expectedOutput: "Name: John\nAge: 15\nHobby: Gaming",
          hint: "Put what you want to print inside the quotes!",
          hint2: "print('Age: 15')\nprint('Hobby: Gaming')"
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "📎 Printing Multiple Values with Commas",
          content: `Use **commas (,)** to print multiple values on one line!

\`\`\`python
print('이름:', '홍길동')
# Result: 이름: 홍길동

print('나이:', 15, '살')
# Result: 나이: 15 살
\`\`\`

Commas automatically add a **space** between values!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use a comma to print '결과:' and 100!",
          initialCode: "# Use a comma to print '결과:' and 100\nprint('결과:', ___)",
          expectedOutput: "결과: 100",
          hint: "Connect text and numbers with a comma!",
          hint2: "print('결과:', 100)"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Complete the game character info!",
          initialCode: "print('=== 🎮 Character Info ===')\nprint('Name: ___')\nprint('Level: ___')\nprint('HP: ___')\nprint('Attack: 25')\nprint('=== Let the adventure begin! ===')",
          expectedOutput: "=== 🎮 Character Info ===\nName: Hero\nLevel: 5\nHP: 100\nAttack: 25\n=== Let the adventure begin! ===",
          hint: "Fill in the name, level, and HP inside print()!",
          hint2: "print('Name: Hero')\nprint('Level: 5')\nprint('HP: 100')"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **print()** — display output on the screen
✅ **Quotes** — wrap strings in them
✅ **Numbers** — no quotes needed
✅ **Commas** — multiple values on one line

Next time we'll learn about **data types**! 🚀`
        }
      ]
    }
  ]
}
