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
\`\`\`

{output}
Name: Alice here!
{/output}

Quotes opening and closing, multiple \`+\` — the longer it gets, the messier it looks. 😩

And glue \`+\` doesn't even work with numbers:

\`\`\`python
age = 15
print("Age: " + age)   # 💥 Error!
\`\`\`

**Today's tool, the f-string**, handles it all in one clean line:

\`\`\`python
print(f"Name: {name}, Age: {age}")
\`\`\`

{output}
Name: Alice, Age: 15
{/output}`
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
\`\`\`

What do you think this prints? Think first, then reveal.

{output}
Hi Alice, age 15!
{/output}

Two rules:

1. **\`f\` before the quotes** → \`f"..."\`
2. **Variables go inside \`{ }\` windows** — Python drops the value in at that spot

\`{name}\` is a little window. When Python runs the line, it peeks behind the window, grabs the value from the \`name\` box, and slides it in.

**Numbers work too** — no error like \`+\` gives:

\`\`\`python
price = 19000
print(f"Price: {price}")
\`\`\`

{output}
Price: 19000
{/output}`
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
          title: "🖥️ Try It — Drop One Name In",
          task: "Use an f-string to print a name!",
          initialCode: "name = \"Bob\"\n# Put the name variable inside the f-string\nprint(f\"Hello, {___}!\")",
          expectedOutput: "Hello, Bob!",
          hint: "Use the f\"...{variable}...\" pattern!",
          hint2: "f\"Hello, {name}!\""
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It — Name + Age",
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
          options: [
            "Hello, Bob! (the window opens and the name slides in)",
            "Hello, {name}! (the curly braces print literally)",
            "An error stops execution",
            "Hello, !  (the {name} part disappears)"
          ],
          answer: 1,
          explanation: "Without `f`, Python treats \`{name}\` as plain characters. The window doesn't open, so the curly braces print exactly as-is. To pull in a variable, the \`f\` in front is required."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — What Lands in the {x} Slot?",
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
\`\`\`

{output}
10 + 3 = 13
{/output}

When Python hits a \`{ }\`, it:
1. **Computes** the expression inside first
2. Drops the result into that spot

\`{a + b}\` → compute \`10 + 3 = 13\` first → \`13\` slides into place.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It — Multiply Inside { }",
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

text = "  hello  "
print(f"Stripped: '{text.strip()}'")
\`\`\`

{output}
Uppercase: PYTHON
Stripped: 'hello'
{/output}

Same rule: Python runs \`name.upper()\` inside \`{ }\` first → the result \`"PYTHON"\` lands in the slot.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It — .upper() Inside { }",
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
          content: `When a number prints with too many digits, you can pick **how many decimal places** to show.

> 🪟 **New rule: the colon \`:\`**
> Inside the \`{variable}\` window — put a **\`:\`** right after the variable. Anything after the colon is "how to display it" options.
>
> \`{pi:.2f}\` = "pi — show me 2 decimal places"

\`\`\`python
pi = 3.141592653589793

print(f"Pi: {pi:.2f}")   # 3.14 (2 decimal places)
print(f"Pi: {pi:.4f}")   # 3.1416 (4 decimal places)
\`\`\`

**{variable:.Nf}** = up to N decimal places!

The \`f\` stands for "float" (a number with a decimal point). So \`.2f\` = "float, 2 places".`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It — 1 Decimal Place",
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

salary = 3500000
print(f"Salary: {salary:,}")
\`\`\`

{output}
Price: 1,000,000
Salary: 3,500,000
{/output}

**{variable:,}** = thousands separator comma!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Try It — Thousands Comma",
          task: "Print with thousands separator commas!",
          initialCode: "money = 50000000\n# Use :, for thousands commas\nprint(f\"Balance: {money:___}\")",
          expectedOutput: "Balance: 50,000,000",
          hint: "{money:,}",
          hint2: "f\"Balance: {money:,}\""
        },
        {
          id: "width1",
          type: "explain",
          title: "🎯 Width — Fit Inside a Fixed Slot (Left-aligned)",
          content: `You can drop text or numbers into a **fixed-width slot**. The empty space gets filled with spaces.

\`\`\`python
print(f"|{'cat':<10}|")
\`\`\`

{output}
|cat       |
{/output}

- \`:<10\` = "in 10 chars — fill from the **left**". The 7 empty chars go on the right.
- The \`|\` bars are just literal pipe characters to show the slot edges (no special meaning).

Think of it as a tool for **lining up columns** in a table.`
        },
        {
          id: "width-left-tryit",
          type: "tryit",
          title: "🖥️ Try It — Left-align, Width 10",
          task: "Left-align name in a 10-char slot!",
          initialCode: "name = \"cat\"\n# Use :<10 for left-align, width 10\nprint(f\"|{name:___}|\")",
          expectedOutput: "|cat       |",
          hint: "{name:<10}",
          hint2: "f\"|{name:<10}|\""
        },
        {
          id: "width-right-explain",
          type: "explain",
          title: "🎯 Right-aligned — `>`",
          content: `Now the opposite — empty space goes on the **front**, the text sticks to the right end.

\`\`\`python
print(f"|{'cat':>10}|")
\`\`\`

{output}
|       cat|
{/output}

\`:>10\` = "in 10 chars — stick to the **right** end". Great for prices and other things where digits need to line up.`
        },
        {
          id: "width-tryit",
          type: "tryit",
          title: "🖥️ Try It — Right-align, Width 10",
          task: "Right-align the name in a 10-character slot!",
          initialCode: "name = \"Alice\"\n# Use :>10 for right-align, width 10\nprint(f\"|{name:___}|\")",
          expectedOutput: "|     Alice|",
          hint: "{name:>10}",
          hint2: "f\"|{name:>10}|\""
        },
        {
          id: "width-center-explain",
          type: "explain",
          title: "🎯 Center-aligned — `^`",
          content: `\`^\` is an upward arrow — remember it as "**center**".

\`\`\`python
print(f"|{'cat':^10}|")
\`\`\`

{output}
|   cat    |
{/output}

Empty space gets split on both sides. Perfect for titles/headers.

**Alignment summary**
- \`:<N\` = left
- \`:>N\` = right
- \`:^N\` = center`
        },
        {
          id: "width-center-tryit",
          type: "tryit",
          title: "🖥️ Try It — Center, Width 10",
          task: "Center-align title in a 10-char slot!",
          initialCode: "title = \"MENU\"\n# Use :^10 for center, width 10\nprint(f\"|{title:___}|\")",
          expectedOutput: "|   MENU   |",
          hint: "{title:^10}",
          hint2: "f\"|{title:^10}|\""
        },
        {
          id: "padding1",
          type: "explain",
          title: "🎯 Fill Empty Space with 0",
          content: `Pad numbers with **leading zeros** — think of student IDs. The number is \`42\`, but you show it as \`00042\` so every ID has the same 5-digit shape.

\`\`\`python
n = 7
print(f"{n:03d}")   # 007
print(f"{n:05d}")   # 00007
\`\`\`

- \`:05d\` = "for an integer, in 5 digits — fill empty space with 0"
- For integers, add a \`d\` at the end to zero-pad.`
        },
        {
          id: "padding-tryit",
          type: "tryit",
          title: "🖥️ Try It — Make a 5-digit ID",
          task: "Print num as a 5-digit integer (00042)!",
          initialCode: "num = 42\n# Use :05d for 5 digits, padded with 0\nprint(f\"{num:___}\")",
          expectedOutput: "00042",
          hint: "{num:05d}",
          hint2: "f\"{num:05d}\""
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz — Right-align, Width 5?",
          content: "What does `f\"|{'hi':>5}|\"` print?",
          options: ["|hi   |", "|   hi|", "| hi  |", "|hi|"],
          answer: 1,
          explanation: ":>5 means right-align, width 5. 'hi' gets 3 spaces in front → |   hi|"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz — How Does 2-Decimal Look?",
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
          id: "mission1a",
          type: "mission",
          title: "🏆 Mission Step 1 — Right-align the Price",
          task: "Print one menu line. Right-align the **price in width 8**. (Name stays as-is.)",
          initialCode: "name = 'Americano'\nprice = 4500\n\n# Right-align price in width 8!\nprint(f'{name} {price:___}')",
          expectedOutput: "Americano     4500",
          hint: "Right-align is `:>`, width 8 means `:>8`.",
          hint2: "f'{name} {price:>8}'"
        },
        {
          id: "mission1b",
          type: "mission",
          title: "🏆 Mission Step 2 — Add the Thousands Comma",
          task: "Just add **one comma** to the previous code. Putting `,` after `:>8` turns 4500 into 4,500.",
          initialCode: "name = 'Americano'\nprice = 4500\n\n# Just add , after :>8 !\nprint(f'{name} {price:___}')",
          expectedOutput: "Americano    4,500",
          hint: "Append `,` after `:>8` → `:>8,`",
          hint2: "f'{name} {price:>8,}'"
        },
        {
          id: "mission1c",
          type: "mission",
          title: "🏆 Mission Step 3 — Many Items + Total",
          task: "Now print **multiple items** and add a total line at the end. Name left-aligned width 12, price right-aligned width 8 with comma.",
          initialCode: "# Print each menu line. Name left width 12, price right width 8 with comma\nprint(f'{\"Americano\":<12} {4500:___}')\nprint(f'{\"Cafe Latte\":<12} {5000:___}')\nprint(f'{\"Choco Cake\":<12} {6500:___}')\n\ntotal = 4500 + 5000 + 6500\nprint(f'{\"Total\":<12} {total:>8,}')",
          expectedOutput: "Americano       4,500\nCafe Latte      5,000\nChoco Cake      6,500\nTotal          16,000",
          hint: "The price slot is right-aligned width 8 + comma = `:>8,`.",
          hint2: "f'{\"Americano\":<12} {4500:>8,}'"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission — Cafe Menu",
          task: "It's a cafe menu. Right-align prices in a width of 8 with a thousands comma — all in one slot! Fill both blanks with the same number 8.",
          initialCode: "print('=' * 25)\nprint(f'{\"☕ Cafe Menu\":^25}')\nprint('=' * 25)\n\nprint(f'{\"Americano\":<12} {4500:>___,}')\nprint(f'{\"Cafe Latte\":<12} {5000:>8,}')\nprint(f'{\"Choco Cake\":<12} {6500:>8,}')\n\nprint('-' * 25)\ntotal = 4500 + 5000 + 6500\nprint(f'{\"Total\":<12} {total:>___,}')\nprint('=' * 25)",
          expectedOutput: "=========================\n       ☕ Cafe Menu       \n=========================\nAmericano       4,500\nCafe Latte      5,000\nChoco Cake      6,500\n-------------------------\nTotal          16,000\n=========================",
          hint: "Both blanks get the same number. Prices have 4-5 digits, so the width needs to be bigger to line up.",
          hint2: "Both blanks are `8` (e.g. `{4500:>8,}`)."
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
