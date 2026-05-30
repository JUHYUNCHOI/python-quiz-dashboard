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
          title: "🎮 Let the user answer your code!",
          content: `So far, **we** wrote the values into the code ourselves.

\`\`\`python
name = "Alice"
print(f"Hello, {name}!")
\`\`\`

Now let's make code that picks up **whoever runs it**.

\`\`\`python
name = input("What is your name? ")
print(f"Hello, {name}!")
\`\`\`

Without editing the code, if Alice runs it she sees "Hello, Alice!", if Bob runs it he sees "Hello, Bob!" — feels like a real program!`
        },
        {
          id: "concept",
          type: "interactive",
          title: "🎬 Watch input() catch a value",
          component: "inputVisualizer",
          componentProps: { lang: "en", presetIds: ["basic", "int-trap"] },
          description: `\`input()\` puts whatever the user types into a variable.

⚠️ **Important:** The value is **always a string (str)** — even if they type digits!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Follow along — greet the user",
          task: "Use input() to read a name, then greet them!",
          initialCode: "name = input(\"What is your name? \")\nprint(f'Hello, {___}!')",
          expectedOutput: "Hello, Walnut!",
          stdin: "Walnut",
          hint: "The typed name is in the `name` variable.",
          hint2: "name"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — input()'s return type",
          content: "What type does `input()` always return?",
          options: ["int (integer)", "float (decimal)", "str (string)", "Depends on input"],
          answer: 2,
          explanation: "input() always returns a string (str), no matter what the user types. Convert with int() if you need a number."
        }
      ]
    },
    {
      id: "ch2",
      title: "Reading numbers",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ string + 1 = error!",
          content: `Let's try reading an age and computing next year:

\`\`\`python
age = input("Age: ")   # "15" — a STRING!
print(age + 1)         # ❌ TypeError
\`\`\`

\`age\` is \`"15"\` (string). You can't add a number to a string.`
        },
        {
          id: "solution-explain",
          type: "interactive",
          title: "✅ Wrap with int() for a real number!",
          component: "inputVisualizer",
          componentProps: { lang: "en", presetIds: ["int-input", "float-input"] },
          description: `\`int(input(...))\` — wrap the input result with \`int()\` to get a real integer. Now math works!

For decimals, use \`float()\`.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Follow along — next year's age",
          task: "Read an age and print next year's age.",
          initialCode: "age = ___(input(\"Age: \"))\nprint(f\"Next year: {age + 1}\")",
          expectedOutput: "Next year: 16",
          stdin: "15",
          hint: "Wrap input() with int().",
          hint2: "int"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try — double your favorite number",
          task: "Read one number and print double it. (input: 7)",
          initialCode: "n = ___(input(\"Number: \"))\nprint(f\"Double: {___}\")",
          expectedOutput: "Double: 14",
          stdin: "7",
          hint: "int() to convert, then n * 2.",
          hint2: "int / n * 2"
        },
        {
          id: "multi-input",
          type: "explain",
          title: "🎯 Two values on one line — input().split()",
          content: `For input like \`3 5\` on one line (two values, space between):

\`\`\`python
# Input: 3 5
a, b = input().split()
print(a)   # "3"  ← string!
print(b)   # "5"  ← string!
\`\`\`

\`.split()\` cuts the input by spaces. **Each piece is still a string.**

> 📦 **\`a, b = ...\` quick box — assigning two variables at once**
>
> If the right side has two items, the two variables on the left each grab one.
> \`a, b = input().split()\` → \`a\` gets the first, \`b\` gets the second.
> (Formal name: "tuple unpacking" — no need to memorize the term now.)`
        },
        {
          id: "try-multi-input",
          type: "tryit",
          title: "🖥️ Follow along — read two values & print",
          task: "Read two values on one line and print each. (input: 7 8) — no conversion yet",
          initialCode: "a, b = input().___()\nprint(f\"a = {a}, b = {b}\")",
          expectedOutput: "a = 7, b = 8",
          stdin: "7 8",
          hint: ".split() cuts by whitespace.",
          hint2: "split"
        },
        {
          id: "multi-input-int",
          type: "tryit",
          title: "🖥️ Try — multiply two numbers (int conversion)",
          task: "The pieces are strings! Wrap with `int()` to multiply. (input: 7 8)",
          initialCode: "a, b = input().split()\nprint(f\"{a} x {b} = {___(a) * ___(b)}\")",
          expectedOutput: "7 x 8 = 56",
          stdin: "7 8",
          hint: "Wrap each with int().",
          hint2: "int"
        },
        {
          id: "input-strip",
          type: "explain",
          title: "🧹 Clean hidden whitespace — .strip()",
          content: `Users may accidentally add extra spaces around their input.

\`\`\`python
# User types "  Walnut  " (extra spaces)
name = input()
print(f"[{name}]")     # [  Walnut  ]   ← spaces stay!
\`\`\`

\`.strip()\` removes leading/trailing whitespace.

\`\`\`python
name = input().strip()
print(f"[{name}]")     # [Walnut]   ← clean
\`\`\`

> 💡 \`.strip()\` was in lesson 6 (string methods). Classic move for name/ID inputs.`
        },
        {
          id: "try-strip",
          type: "tryit",
          title: "🖥️ Try — see .strip() in action",
          task: "Wrap input in [ ] when printed. Without .strip() spaces stay. (input: `  Walnut  `)",
          initialCode: "name = input().___()\nprint(f\"[{name}]\")",
          expectedOutput: "[Walnut]",
          stdin: "  Walnut  ",
          hint: "Add .strip() after input().",
          hint2: "strip"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz — result of int('123')",
          content: "What is the result of `int('123')`?",
          options: ["'123' (string)", "123 (integer)", "Error", "123.0 (float)"],
          answer: 1,
          explanation: "int() converts the string '123' to the integer 123!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Floats & traps",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 Decimals use float()",
          content: `For height, score, price — anything with a decimal — use \`float()\`.

\`\`\`python
height = float(input("Height (cm): "))
print(f"Height: {height}cm")
\`\`\`

**Quick summary:**
- \`int()\` — integer
- \`float()\` — decimal
- \`str()\` — string`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try — height cm → m",
          task: "Read height in cm and convert to meters. (input: 175.5)",
          initialCode: "cm = ___(input(\"Height(cm): \"))\nm = cm / 100\nprint(f\"{cm}cm = {m}m\")",
          expectedOutput: "175.5cm = 1.755m",
          stdin: "175.5",
          hint: "Decimal value → float().",
          hint2: "float"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz — result of int('3.14')",
          content: "What is the result of `int('3.14')`?",
          options: ["3", "3.14", "Error (ValueError)", "'3'"],
          answer: 2,
          explanation: "int() can't directly handle a decimal string! Convert via float() first: `int(float('3.14'))` → 3."
        },
        {
          id: "float-trap",
          type: "explain",
          title: "⚠️ Decimal string → int — two steps",
          content: `\`int("3.14")\` **doesn't work directly**. You need to go through \`float()\` first.

\`\`\`python
int("3.14")          # ❌ error
int(float("3.14"))   # ✅ 3 — decimal is simply chopped off!
\`\`\`

### Truncate vs round

| Value | \`int(float(x))\` | \`round(float(x))\` |
|---|---|---|
| "3.14" | 3 | 3 |
| "3.78" | **3** (truncate) | **4** (round) |

> 🎯 \`int\` chops the decimal off. Use \`round()\` when you actually want rounding.`
        },
        {
          id: "try-int-float",
          type: "tryit",
          title: "🖥️ Try — predict int(float('3.78'))",
          task: "Predict the output, then run to check. Is it 3 or 4?",
          initialCode: "x = \"3.78\"\nprint(int(float(x)))",
          expectedOutput: "3",
          hint: "int just chops off the decimal — no rounding!",
          hint2: "3"
        },
        {
          id: "float-trap-letters",
          type: "explain",
          title: "⚠️ What if it's not a number?",
          content: `If real letters reach \`int()\` / \`float()\`, the program stops.

\`\`\`python
int("hello")   # ❌ error — "I can't turn letters into a number!"
\`\`\`

> 💡 For now, just trust the user types numbers. You'll learn how to catch these errors later.`
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
          type: "tryit",
          title: "🏆 Mission 1 — Greeting card (.strip() first use)",
          task: "Read a name, clean it with `.strip()`, then greet. (input: `  Walnut  `)",
          initialCode: "name = input(\"Name: \").___()    # blank = strip\nprint(f\"Hello, {name}!\")",
          expectedOutput: "Hello, Walnut!",
          stdin: "  Walnut  ",
          hint: "Add .strip() after input() to remove surrounding spaces.",
          hint2: "strip"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Self-intro card (name + age)",
          task: "Read name and age, print a card. Two blanks: name uses .strip(), age uses int().",
          initialCode: "name = input(\"Name: \").___()      # blank 1: clean whitespace\nage = ___(input(\"Age: \"))         # blank 2: convert to int\n\nprint(f\"Name: {name}\")\nprint(f\"Age: {age} (next year: {age + 1})\")",
          expectedOutput: "Name: Alice\nAge: 15 (next year: 16)",
          stdin: "Alice\n15",
          hint: "blank 1 = strip, blank 2 = int",
          hint2: "strip / int"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Three-subject average",
          task: "Read three subject scores (one per line) and print the average.",
          initialCode: "kor = ___(input(\"Korean: \"))\nmath = ___(input(\"Math: \"))\neng = ___(input(\"English: \"))\n\navg = (kor + math + eng) / 3\nprint(f\"Average: {avg:.1f}\")",
          expectedOutput: "Average: 83.3",
          stdin: "85\n90\n75",
          hint: "Wrap each input() with int().",
          hint2: "int"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What we learned today

✅ \`input()\` — read what the user types into a variable
✅ The value is **always a string** (str)
✅ \`int()\`, \`float()\` to convert to numbers
✅ \`input().split()\` — two values on one line (a, b = ...)
✅ \`.strip()\` — clean leading/trailing whitespace
✅ \`int(float("3.14"))\` — decimal string → integer (truncates)

💡 Run real \`input()\` in a terminal or IDE. In the Coderin web, use the stdin panel!

🎉 **Part 1 Complete!** Next up — **conditionals (if/else)** — telling code "do this when… otherwise that"! 🧠`
        }
      ]
    }
  ]
}
