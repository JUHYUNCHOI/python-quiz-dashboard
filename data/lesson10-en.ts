// ============================================
// Lesson 10: input() - User Input
// ============================================
import { LessonData } from './types'

export const lesson10EnData: LessonData = {
  id: "10",
  title: "input() - User Input",
  emoji: "⌨️",
  description: "Learn how to get input from the user!",
  chapters: [
    {
      id: "ch1",
      title: "input() Basics",
      emoji: "⌨️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 Interactive Programs!",
          content: `So far, we've only been printing output one way.

Now we're going to **receive input from the user**!

\`\`\`python
name = input('What is your name? ')
print(f'Hello, {name}!')
\`\`\`

When you run it:
\`\`\`
What is your name? Alice
Hello, Alice!
\`\`\``
        },
        {
          id: "concept",
          type: "explain",
          title: "📥 The input() Function",
          content: `\`input()\` waits until the user types something!

\`\`\`python
answer = input('Your question here')
\`\`\`

1. 'Your question here' appears on screen
2. The user types something and presses Enter
3. The typed value is stored in the answer variable!

⚠️ **Note:** input() doesn't work in web environments!
So in our exercises, we'll practice by assigning values directly to variables.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Simulating input()!",
          task: "Store 'Alice' in name and greet them!",
          initialCode: "# Instead of input(), we assign the value directly\nname = ___\nprint(f'Hello, {name}!')",
          expectedOutput: "Hello, Alice!",
          hint: "Store a name with name = 'name'!",
          hint2: "name = 'Alice'"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What type does input() always return?",
          options: ["int (integer)", "float (decimal)", "str (string)", "It depends on the input"],
          answer: 2,
          explanation: "input() always returns a string (str)!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Receiving Number Input",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ Houston, We Have a Problem!",
          content: `Let's try getting an age and doing math with it:

\`\`\`python
age = input('Age: ')
print(age + 1)  # Error!!! 😱
\`\`\`

Why does it throw an error?
→ input() **always returns a string**!
→ '15' + 1 can't be calculated!`
        },
        {
          id: "solution-explain",
          type: "explain",
          title: "✅ Solution: Convert with int()!",
          content: `We need to convert the string to a number!

\`\`\`python
age = input('Age: ')        # '15' (string)
age = int(age)              # 15 (converted to integer!)
print(age + 1)              # 16 ✅
\`\`\`

Shorter version:
\`\`\`python
age = int(input('Age: '))
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ String to Number Conversion!",
          task: "Convert a string number to an integer and do math!",
          initialCode: "# Assume we received this from input()\nage_str = '15'\n\n# Convert to integer\nage = ___(age_str)\n\n# Age next year\nprint(f'Age next year: {age + 1}')",
          expectedOutput: "Age next year: 16",
          hint: "Use int() to convert a string to a number!",
          hint2: "age = int(age_str)"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Adding Two Numbers!",
          task: "Add two numbers and print the result!",
          initialCode: "# Assume we received these from input()\na_str = '25'\nb_str = '17'\n\n# Convert to integers\na = ___(a_str)\nb = ___(b_str)\n\nprint(f'{a} + {b} = {a + b}')",
          expectedOutput: "25 + 17 = 42",
          hint: "Use int() to convert strings to integers!",
          hint2: "a = int(a_str)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of int('123')?",
          options: ["'123' (string)", "123 (integer)", "Error", "123.0 (float)"],
          answer: 1,
          explanation: "int() converts the string '123' to the integer 123!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Receiving Float Input",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 Receiving Float Input",
          content: `For numbers with decimal points, use \`float()\`!

\`\`\`python
height = float(input('Height (cm): '))
print(f'Height: {height}cm')
\`\`\`

**Type conversion summary:**
- \`int()\`: convert to integer
- \`float()\`: convert to float
- \`str()\`: convert to string`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Float Conversion Practice!",
          task: "Convert height from cm to m and print it!",
          initialCode: "# Assume we received this from input()\nheight_str = '175.5'\n\n# Convert to float\ncm = ___(height_str)\n\n# Convert to meters (divide by 100)\nm = cm / 100\n\nprint(f'{cm}cm = {m}m')",
          expectedOutput: "175.5cm = 1.755m",
          hint: "Use float() to convert, then divide by 100",
          hint2: "cm / 100"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of int('3.14')?",
          options: ["3", "3.14", "Error", "'3'"],
          answer: 2,
          explanation: "int() can't directly convert a decimal string! You need to use float() first."
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
          task: "Calculate the total price from item price and quantity!",
          initialCode: "# Assume we received these from input()\nprice_str = '12'\ncount_str = '3'\n\n# Convert to integers\nprice = ___(price_str)\ncount = ___(count_str)\n\n# Calculate total price\ntotal = ___\n\nprint(f'{count} pizzas')\nprint(f'Total price: ${total}')",
          expectedOutput: "3 pizzas\nTotal price: $36",
          hint: "Convert with int() then multiply!",
          hint2: "int(price_str) / price * count"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ Getting user input with \`input()\`
✅ input() **always returns a string**!
✅ Converting to numbers with \`int()\` and \`float()\`
✅ Making **interactive programs**!

💡 **Tip:** Try running real input() code in a terminal or IDE!

🎉 **Part 1 Complete!**
In the next Part, we'll learn about **conditionals**! 🧠`
        }
      ]
    }
  ]
}
