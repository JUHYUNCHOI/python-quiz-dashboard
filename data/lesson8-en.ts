// ============================================
// Lesson 8: f-string (English)
// ============================================
import { LessonData } from './types'

export const lesson8EnData: LessonData = {
  id: "8",
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
          content: `When you want to print a name along with text, you'd glue them with \`+\`:

\`\`\`python
name = "Alice"
print("Name: " + name + " here!")
# Name: Alice here!
\`\`\`

Quotes opening and closing, multiple \`+\` — the longer it gets, the messier it looks. 😩

And glue \`+\` doesn't even work with numbers:

\`\`\`python
age = 15
print("Age: " + age)   # 💥 Error!
\`\`\`

**Today's tool, the f-string**, handles it all in one clean line:

\`\`\`python
print(f"Name: {name}, Age: {age}")
# Name: Alice, Age: 15
\`\`\``
        },
        {
          id: "fstring-explain",
          type: "explain",
          title: "✨ f-string — Pull Variables Inside Quotes",
          content: `The **f** stands for "format" — formatting a string. Just put **f** in front of the quotes.

\`\`\`python
name = "Alice"
age = 15
print(f"Hi {name}, age {age}!")
# Hi Alice, age 15!
\`\`\`

Two rules:

1. **\`f\` before the quotes** → \`f"..."\`
2. **Variables go inside \`{ }\` windows** — Python drops the value in at that spot

\`{name}\` is a little window. When Python runs the line, it peeks behind the window, grabs the value from the \`name\` box, and slides it in.

**Numbers work too** — no error like \`+\` gives:

\`\`\`python
price = 19000
print(f"Price: {price}")   # Price: 19000
\`\`\``
        },
        {
          id: "fstring-viz",
          type: "interactive",
          title: "🎬 Watch Each Slot Get Filled",
          description: "Step through how each {var} window gets replaced by the real value. A peek at format specs too!",
          component: "pyFstringVisualizer",
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
          id: "predict-no-f",
          type: "predict",
          title: "💭 Predict — What If You Forget the f?",
          content: `Someone forgot the \`f\` and just used regular quotes. What prints?

\`\`\`python
name = "Bob"
print("Hello, {name}!")
\`\`\``,
          options: ["Hello, Bob!", "Hello, {name}!", "Error", "Hello, !"],
          answer: 1,
          explanation: "Without `f`, Python treats \`{name}\` as plain characters. The window doesn't open. To pull in a variable, the \`f\` in front is required."
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
          title: "🧮 You Can Put Expressions in the { } Window",
          content: `\`{ }\` isn't limited to variable names. You can drop in a **whole expression**.

\`\`\`python
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
# 10 + 3 = 13
\`\`\`

When Python hits a \`{ }\`, it:
1. **Computes** the expression inside first
2. Drops the result into that spot

\`{a + b}\` → compute \`10 + 3 = 13\` first → \`13\` slides into place.`
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
          title: "🔧 Methods Inside { } Too",
          content: `The methods you learned last time — \`.upper()\`, \`.strip()\`, etc. — work right inside \`{ }\`.

\`\`\`python
name = "python"
print(f"Uppercase: {name.upper()}")
# Uppercase: PYTHON

text = "  hello  "
print(f"Stripped: '{text.strip()}'")
# Stripped: 'hello'
\`\`\`

Same rule: Python runs \`name.upper()\` inside \`{ }\` first → the result \`"PYTHON"\` lands in the slot.`
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
          id: "width1",
          type: "explain",
          title: "🎯 Width & Alignment",
          content: `You can place text or numbers inside a fixed-width slot, aligned **left / right / center**!

\`\`\`python
print(f"|{'cat':<10}|")   # |cat       |  (left, width 10)
print(f"|{'cat':>10}|")   # |       cat|  (right, width 10)
print(f"|{'cat':^10}|")   # |   cat    |  (center, width 10)
\`\`\`

- **:<N** = left-aligned, width N
- **:>N** = right-aligned, width N
- **:^N** = centered, width N

Super handy when you want **columns to line up** in tables or menus!`
        },
        {
          id: "width-tryit",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Right-align the name in a 10-character slot!",
          initialCode: "name = \"Alice\"\n# Use :>10 for right-align, width 10\nprint(f\"|{name:___}|\")",
          expectedOutput: "|     Alice|",
          hint: "{name:>10}",
          hint2: "f\"|{name:>10}|\""
        },
        {
          id: "padding1",
          type: "explain",
          title: "🎯 Zero-padding",
          content: `Pad numbers with **leading zeros**. Great for clocks, IDs, ticket numbers, etc.

\`\`\`python
n = 7
print(f"{n:03d}")   # 007   (3 digits, pad with 0)
print(f"{n:05d}")   # 00007 (5 digits, pad with 0)
\`\`\`

- **:0Nd** = integer in N digits, padded with **0**
- d stands for decimal (integer)
- Use it for clock display (\`09:05\`), student IDs (\`00042\`), and more!`
        },
        {
          id: "padding-tryit",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print num as a 5-digit integer (00042)!",
          initialCode: "num = 42\n# Use :05d for 5 digits, padded with 0\nprint(f\"{num:___}\")",
          expectedOutput: "00042",
          hint: "{num:05d}",
          hint2: "f\"{num:05d}\""
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What does `f\"|{'hi':>5}|\"` print?",
          options: ["|hi   |", "|   hi|", "| hi  |", "|hi|"],
          answer: 1,
          explanation: ":>5 means right-align, width 5. 'hi' gets 3 spaces in front → |   hi|"
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
f"{name:>10}"    # right-aligned, width 10 (also :<, :^)
f"{n:05d}"       # 5 digits, zero-padded
\`\`\``
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission — Cafe Menu",
          task: "It's a cafe menu. Right-align prices in a width of 8 with a thousands comma — all in one slot! Fill both blanks with the same number 8.",
          initialCode: "items = ['Americano', 'Cafe Latte', 'Choco Cake']\nprices = [4500, 5000, 6500]\ncount = len(items)\n\nprint('=' * 25)\nprint(f'{\"☕ Cafe Menu\":^25}')\nprint('=' * 25)\n\nfor i in range(count):\n    print(f'{items[i]:<12} {prices[i]:>___,}')\n\nprint('-' * 25)\ntotal = sum(prices)\nprint(f'{\"Total\":<12} {total:>___,}')\nprint('=' * 25)",
          expectedOutput: "=========================\n       ☕ Cafe Menu       \n=========================\nAmericano       4,500\nCafe Latte      5,000\nChoco Cake      6,500\n-------------------------\nTotal          16,000\n=========================",
          hint: "Both blanks get the same number. Prices have 4-5 digits, so the width needs to be bigger to line up.",
          hint2: "Both blanks are `8` (e.g. `{prices[i]:>8,}`)."
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
✅ **:<N :>N :^N** - width and alignment
✅ **:0Nd** - zero-padding

Next time, we'll learn about **type conversion**! 🚀`
        }
      ]
    }
  ]
}
