// ============================================
// Project 1: Mini Calculator
// ============================================
import { LessonData } from './types'

export const lessonP1EnData: LessonData = {
  id: "p1en",
  title: "Mini Calculator",
  emoji: "🧮",
  description: "Part 1 Review Project! Build a basic arithmetic calculator.",
  chapters: [
    {
      id: "ch1",
      title: "Project Introduction",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🧮 Today: Mini Calculator!",
          content: `Use everything from Part 1
to build **your own calculator**!

Since we can't use input() in the web,
we put numbers in variables ahead of time!

\`\`\`
=== 🧮 Mini Calculator ===
Result: 10 + 3 = 13
\`\`\`

**Concepts we'll use:**
- print() output
- Storing values in variables
- +, -, *, / operators
- f-string to format the result`
        },
        {
          id: "review",
          type: "explain",
          title: "📚 30-Second Review!",
          content: `**1. Storing values in variables**
\`\`\`python
num1 = 10
num2 = 3
\`\`\`

**2. Converting string to number with int()**
\`\`\`python
num = int('15')  # 15
\`\`\`

**3. Performing calculations**
\`\`\`python
result = 10 + 3
\`\`\`

**4. Output with f-string**
\`\`\`python
print(f'Result: {result}')
\`\`\``
        }
      ]
    },
    {
      id: "ch2",
      title: "Step-by-Step Building",
      emoji: "🔧",
      steps: [
        {
          id: "step1",
          type: "tryit",
          title: "1️⃣ Show Two Numbers",
          task: "Put two numbers in variables and print them!",
          initialCode: "# Instead of input(), we assign values directly\nnum1 = 10\nnum2 = 3\n# Print both numbers using f-string\nprint(f'Input: {___}, {___}')",
          expectedOutput: "Input: 10, 3",
          hint: "Put the variable names inside the f-string!",
          hint2: "print(f'Input: {num1}, {num2}')"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ Addition First!",
          task: "Add the two numbers and store in result!",
          initialCode: "# Instead of input(), we assign values directly\nnum1 = 10\nnum2 = 3\n# Add the two numbers\nresult = ___\nprint(f'{num1} + {num2} = {result}')",
          expectedOutput: "10 + 3 = 13",
          hint: "Add the two variables and store in result!",
          hint2: "result = num1 + num2"
        },
        {
          id: "step2-5",
          type: "explain",
          title: "💡 Quick Taste of if-elif!",
          content: `A calculator needs to **pick which one** to do: +, -, *, or /.
That's where \`if\` and \`elif\` come in!

\`\`\`python
op = '+'

if op == '+':
    print('Addition!')
elif op == '-':
    print('Subtraction!')
\`\`\`

- \`if condition:\` → Runs if the condition is true!
- \`elif condition:\` → If the \`if\` above is false, check this condition!
- \`else:\` → Runs if none of the conditions above are true!

We'll learn \`if-elif-else\` **in detail in Part 2**!
For now, just understand that "different code runs based on conditions" and you're good!`
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ Add Multiply and Divide!",
          task: "Fill in * and / handlers!",
          initialCode: "# Instead of input(), we assign values directly\nnum1 = 10\nnum2 = 3\nop = '+'\n\nif op == '+':\n    result = num1 + num2\nelif op == '-':\n    result = num1 - num2\n# Add the remaining operators\nelif op == '*':\n    result = ___\nelif op == '/':\n    result = ___\n\nprint(f'{num1} {op} {num2} = {result}')",
          expectedOutput: "10 + 3 = 13",
          hint: "Multiply is num1 * num2, divide is num1 / num2!",
          hint2: "num1 * num2 / num1 / num2"
        }
      ]
    },
    {
      id: "ch3",
      title: "Final Project",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 Build the Complete Calculator!",
          task: "Fill in title, all operators, and result output!",
          initialCode: "print('=== 🧮 Mini Calculator ===')\n\n# Instead of input(), we assign values directly\nnum1 = 10\nnum2 = 3\nop = '+'\n\nif op == '+':\n    result = ___\nelif op == '-':\n    result = ___\nelif op == '*':\n    result = ___\nelif op == '/':\n    result = ___\nelse:\n    result = 'Error'\n\nprint(f'Result: {num1} {op} {num2} = {result}')",
          expectedOutput: "=== 🧮 Mini Calculator ===\nResult: 10 + 3 = 13",
          hint: "Fill in the correct calculation for each operator!",
          hint2: "result = num1 + num2"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Project Complete!",
          content: `## Congratulations! 🎉

You completed the **Mini Calculator**!

### Concepts You Used:
✅ print() - Output
✅ Variables - Storing values
✅ +, -, *, / - Operators
✅ if-elif-else - Conditionals (a taste!)
✅ f-string - Formatting the result

### Challenge Tasks 💪 (After Part 2!)
- Prevent division by zero
- Get numbers with real input()
- Repeat calculations many times (while)
- Try your own favorite numbers in num1, num2!

Learn conditionals and loops in detail in **Part 2**! 🚀`
        }
      ]
    }
  ]
}
