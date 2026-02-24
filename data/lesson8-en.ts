// ============================================
// Lesson 8: f-string (English)
// ============================================
import { LessonData } from './types'

export const lesson8EnData: LessonData = {
  id: "8en",
  title: "f-string",
  emoji: "✨",
  description: "The easiest way to format strings!",
  chapters: [
    {
      id: "ch1",
      title: "f-string Basics",
      emoji: "📝",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "✨ Strings + Variables, So Annoying!",
          content: `So far, we've been doing this:

\`\`\`python
name = "Alice"
age = 15
print("Name: " + name + ", Age: " + str(age))
\`\`\`

Way too complicated, right? 😩

With **f-strings**, it's much easier!`
        },
        {
          id: "fstring-explain",
          type: "explain",
          title: "✨ How to Use f-strings",
          content: `Put **f** before the string, and variables inside **{ }**!

\`\`\`python
name = "Alice"
age = 15
print(f"Name: {name}, Age: {age}")
# Name: Alice, Age: 15
\`\`\`

**No need for str() conversion!**
\`\`\`python
price = 19000
print(f"Price: {price} won")  # Price: 19000 won
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use an f-string to print a name!",
          initialCode: "name = \"Bob\"\n# Put the name variable inside the f-string\nprint(f\"Hello, {___}!\")",
          expectedOutput: "Hello, Bob!",
          hint: "Use the f\"...{variable}...\" pattern!",
          hint2: "f\"Hello, {name}!\""
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Using Multiple Variables!",
          task: "Print name and age using an f-string!",
          initialCode: "name = \"Alice\"\nage = 14\nprint(f\"{___} is {___} years old\")",
          expectedOutput: "Alice is 14 years old",
          hint: "Put both {name} and {age} inside!",
          hint2: "f\"{name} is {age} years old\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When `x = 10`, what is the result of `f\"x = {x}\"`?",
          options: ["x = {x}", "x = 10", "{x} = 10", "Error"],
          answer: 1,
          explanation: "{x} gets replaced with the variable value 10!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Calculations Inside f-strings",
      emoji: "🧮",
      steps: [
        {
          id: "calc-explain",
          type: "explain",
          title: "🧮 You Can Calculate Inside { }!",
          content: `You can do calculations inside the { } of an f-string:

\`\`\`python
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
# 10 + 3 = 13

print(f"{a} × {b} = {a * b}")
# 10 × 3 = 30
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Calculate inside an f-string!",
          initialCode: "price = 5\ncount = 3\n# You can calculate inside {}\nprint(f\"Total: {___} dollars\")",
          expectedOutput: "Total: 15 dollars",
          hint: "Use {price * count} to calculate!",
          hint2: "f\"Total: {price * count} dollars\""
        },
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 Methods Inside { } Too!",
          content: `You can also call methods:

\`\`\`python
name = "python"
print(f"Uppercase: {name.upper()}")
# Uppercase: PYTHON

text = "  hello  "
print(f"Stripped: '{text.strip()}'")
# Stripped: 'hello'
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use upper() inside an f-string!",
          initialCode: "lang = \"python\"\n# You can use methods inside {}\nprint(f\"I am learning {___}!\")",
          expectedOutput: "I am learning PYTHON!",
          hint: "{lang.upper()}",
          hint2: "f\"I am learning {lang.upper()}!\""
        }
      ]
    },
    {
      id: "ch3",
      title: "Format Specifiers",
      emoji: "🎯",
      steps: [
        {
          id: "format-explain",
          type: "explain",
          title: "🎯 Decimal Place Formatting",
          content: `You can specify the number of decimal places:

\`\`\`python
pi = 3.141592653589793

print(f"Pi: {pi:.2f}")   # 3.14 (2 decimal places)
print(f"Pi: {pi:.4f}")   # 3.1416 (4 decimal places)
\`\`\`

**{variable:.Nf}** = up to N decimal places!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print with 1 decimal place!",
          initialCode: "score = 85.7777\n# Use :.1f for 1 decimal place\nprint(f\"Average: {score:___}\")",
          expectedOutput: "Average: 85.8",
          hint: "{score:.1f}",
          hint2: "f\"Average: {score:.1f}\""
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "💰 Thousands Separator Comma",
          content: `You can add commas to large numbers:

\`\`\`python
price = 1000000
print(f"Price: {price:,}")
# Price: 1,000,000

salary = 3500000
print(f"Salary: {salary:,}")
# Salary: 3,500,000
\`\`\`

**{variable:,}** = thousands separator comma!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print with thousands separator commas!",
          initialCode: "money = 50000000\n# Use :, for thousands commas\nprint(f\"Balance: {money:___}\")",
          expectedOutput: "Balance: 50,000,000",
          hint: "{money:,}",
          hint2: "f\"Balance: {money:,}\""
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When `x = 3.14159`, what is the result of `f\"{x:.2f}\"`?",
          options: ["3.14159", "3.14", "3.1", "3"],
          answer: 1,
          explanation: ".2f means up to 2 decimal places! Rounded to 3.14"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 Summary",
          content: `## f-string Summary

**Basic usage**
\`\`\`python
f"text {variable} text"
\`\`\`

**Calculations and methods**
\`\`\`python
f"{a + b}"           # calculation
f"{name.upper()}"    # method
\`\`\`

**Format specifiers**
\`\`\`python
f"{pi:.2f}"      # 2 decimal places
f"{price:,}"     # thousands comma
\`\`\``
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Create a cafe menu using f-strings!",
          initialCode: "items = ['Americano', 'Cafe Latte', 'Choco Cake']\nprices = [4500, 5000, 6500]\ncount = len(items)\n\nprint('=' * 25)\nprint(f'{\"☕ Cafe Menu\":^25}')\nprint('=' * 25)\n\nfor i in range(count):\n    print(f'{items[i]:<12} {prices[i]:>___,}')\n\nprint('-' * 25)\ntotal = sum(prices)\nprint(f'{\"Total\":<12} {total:>___,}')\nprint('=' * 25)",
          expectedOutput: "=========================\n       ☕ Cafe Menu       \n=========================\nAmericano       4,500\nCafe Latte      5,000\nChoco Cake      6,500\n-------------------------\nTotal          16,000\n=========================",
          hint: "Specify the number alignment width!",
          hint2: "8"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **f"...{variable}..."** - basic usage
✅ **Calculations/methods inside { }**
✅ **:.2f** - decimal place formatting
✅ **:,** - thousands separator comma

Next time, we'll learn about **type conversion**! 🚀`
        }
      ]
    }
  ]
}
