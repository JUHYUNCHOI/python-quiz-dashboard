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
          title: "🎉 Your First Code — Showing Text on Screen",
          content: `Programming starts with **"showing text on the screen."**

\`\`\`python
print('Hello, World!')
\`\`\`

When you run it, the screen shows:
\`\`\`
Hello, World!
\`\`\`

Press ▶ to run it yourself, then we'll break this single line down piece by piece on the next page. ✨`
        },
        {
          id: "print-explain",
          type: "explain",
          title: "🖨️ print() — The Display Command",
          content: `\`\`\`python
print('Hello!')
\`\`\`

- **\`print\`** — the command name ("print it out")
- **\`( )\`** — put the **content to display** inside the parentheses
- **\`' '\`** — wrap text in quotes

> 💡 \`'\` and \`"\` both work. Pick whichever you like!`
        },
        {
          id: "print-builder-interactive",
          type: "interactive",
          title: "🎬 Build print() Piece by Piece",
          component: "pyPrintBuilder"
        },
        {
          id: "try-print-builder",
          type: "tryit",
          title: "🖥️ Type What You Just Saw",
          task: "Type out `print('Hi')` exactly as you saw it in the visualization!",
          initialCode: "print(___)",
          expectedOutput: "Hi",
          hint: "The blank takes 'Hi' wrapped in quotes.",
          hint2: "'Hi'"
        },
        {
          id: "print-explain-uses",
          type: "explain",
          title: "🖨️ More Examples",
          content: `\`\`\`python
print('hi')
print("Python is fun")
print('🍕🍕🍕')         # emojis work too!
\`\`\`

What prints when you run all three lines? Take a guess first.

{output}
hi
Python is fun
🍕🍕🍕
{/output}

Anything inside the quotes shows up exactly on screen.`
        },
        {
          id: "print-explain-pitfalls",
          type: "explain",
          title: "🤔 What happens if you forget?",
          content: `\`\`\`python
print(Hello)         # 🚨 NameError
Print('Hello')       # 🚨 NameError
\`\`\`

Python: *"I don't know that name!"* 😵

- \`Hello\` — without quotes, Python thinks it's a "name" and can't find it
- \`Print\` — capital P doesn't work. **All lowercase!**

✅ Two things to remember: **lowercase \`print\`** + **text inside quotes**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Print Hello, World!",
          task: "Print Hello, World!",
          initialCode: "print(___)",
          expectedOutput: "Hello, World!",
          hint: "The blank takes a string wrapped in quotes.",
          hint2: "'Hello, World!'"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Print 'Bonjour!' — French for hello!",
          task: "Print 'Bonjour!' (French for hello!).",
          initialCode: "print(___)",
          expectedOutput: "Bonjour!",
          hint: "Any language works inside quotes!",
          hint2: "'Bonjour!'"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ What does `print('Python')` show?",
          content: "What is the output of `print('Python')`?",
          options: ["print('Python')", "'Python'", "Python", "Error"],
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
          content: `Text needed quotes. But **numbers don't need quotes!**

\`\`\`python
print(123)
print(3.14)
\`\`\`

Result:
\`\`\`
123
3.14
\`\`\`

Why do strings need quotes but numbers don't?
→ The computer **recognizes numbers directly.** When it sees \`123\`, it instantly knows "that's one hundred twenty-three."
→ But \`Hello\` without quotes? The computer can't tell if you mean **text** or **some name** you defined.

> 💡 What "some name" means — you'll learn that **later** (variables). For now, just remember: "text needs quotes, numbers don't."`
        },
        {
          id: "number-explain-math",
          type: "explain",
          title: "💡 Cool thing — Python calculates for you",
          content: `If you put math inside \`print()\`, Python **does the calculation** and shows the result!

\`\`\`python
print(100 + 50)
print(10 * 5)
print(20 - 7)
print(8 / 2)
\`\`\`

Like a calculator! Inside \`print()\` you can use \`+ - * /\`.

### Where it's useful

- Check a value — "what's the score right now?"
- Show a result — "the discounted price is …"
- Count things — 1, 2, 3, 4, 5 …`
        },
        {
          id: "predict-number-math",
          type: "predict",
          title: "💭 Predict the output",
          content: "What happens with math inside print()?",
          code: "print(100 + 50)",
          options: ["150", "100 + 50", "100, 50", "Error"],
          answer: 0,
          explanation: "The expression inside print() is calculated first, then only the result (150) shows on screen."
        },
        {
          id: "number-explain-types",
          type: "explain",
          title: "⚠️ Quotes matter — text vs number",
          content: `\`\`\`python
print(100)       # a real number → math works
print('100')     # text — looks the same on screen, but math won't work
\`\`\`

Both lines print — what do you think you'll see? Guess first.

{output}
100
100
{/output}

On screen they look identical, but inside the computer they're different kinds.

- **\`100\`** is a real number → \`100 + 50\` works fine.
- **\`'100'\`** is three characters \`1\`, \`0\`, \`0\` → trying to do math on it causes problems.

For now, just notice this difference. Next lesson covers it in detail!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Print the number 2024!",
          task: "Print the number 2024!",
          initialCode: "print(___)",
          expectedOutput: "2024",
          hint: "No quotes — numbers go in as-is.",
          hint2: "2024"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Calculate 100 + 200!",
          task: "Print the result of 100 + 200!",
          initialCode: "# Calculate and print 100 + 200\nprint(___)",
          expectedOutput: "300",
          hint: "Do the math directly inside print(). No quotes — numbers!",
          hint2: "100 + 200"
        },
        {
          id: "comment-explain",
          type: "explain",
          title: "💬 # is a note for humans",
          content: `Did you notice the \`#\` symbol in the code? That's a **comment**.

\`\`\`python
# Start of a line — the whole line is a comment
print(10)
print(20)   # Mid-line — from # to end of line is a comment
\`\`\`

**Anything after \`#\` is completely ignored by Python.** It doesn't run and doesn't show on screen.

📝 It's just a note for you (and other readers) — "what was this code for?"`
        },
        {
          id: "comment-explain-where",
          type: "explain",
          title: "💬 # placement — start vs middle of line",
          content: `\`\`\`python
# Start of a line → whole line is a comment. Describes the next line.
print(10)

print(20)   # Middle of a line → short note attached to that line.
\`\`\`

> 💡 You'll see \`#\` a lot. Just read it as **"ah, this is a note"** and move on.`
        },
        {
          id: "predict-comment-output",
          type: "predict",
          title: "💭 Predict — Code with Comments",
          content: "We said anything after `#` is ignored by the computer. So what does this code print?",
          code: "# Hello there\nprint(10)   # print the number 10",
          options: ["10", "Hello there\n10", "10\nprint the number 10", "Error"],
          answer: 0,
          explanation: "Everything from `#` to the end of the line is ignored. The first line disappears entirely; on the second line, `# print the number 10` is ignored. Only `print(10)` actually runs, so the screen shows just `10`."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ `print('100')` vs `print(100)` — difference?",
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
          content: `What if you want to show several pieces of information at once?
→ **Just use \`print()\` multiple times.** Each \`print()\` gets its own line.

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
\`\`\`

### The key promise

**\`print()\` automatically adds a line break after each output.** So the next \`print()\` starts on a fresh line.
You don't need to press Enter or do anything special — it handles the line break for you.`
        },
        {
          id: "predict-multi-lines",
          type: "predict",
          title: "💭 Predict the output",
          content: "Three print() calls in a row — how does the screen look?",
          code: "print('A')\nprint('B')\nprint('C')",
          options: ["A\nB\nC  (three lines)", "A B C  (one line with spaces)", "ABC  (one line stuck together)", "Error"],
          answer: 0,
          explanation: "print() adds a line break at the end. Three calls → three lines."
        },
        {
          id: "multi-explain-card",
          type: "explain",
          title: "📝 Where It's Useful & Name Card Example",
          content: `### Where it's useful

- **Multi-line messages** — welcome greeting, menus, help text
- **Report-style output** — name, age, score on separate lines
- **ASCII art** — stars, character drawings

### Example — a simple name card

\`\`\`python
print('===== Name Card =====')
print('Name: Alex')
print('Job: Coder')
print('=====================')
\`\`\`

Result:
\`\`\`
===== Name Card =====
Name: Alex
Job: Coder
=====================
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Print 'Age: 15' and 'Hobby: Gaming'!",
          task: "Print 'Age: 15' and 'Hobby: Gaming'!",
          initialCode: "print('Name: John')\n# Print age and hobby too\nprint(___)\nprint(___)",
          expectedOutput: "Name: John\nAge: 15\nHobby: Gaming",
          hint: "Each blank takes a quoted string. First blank is age, second is hobby.",
          hint2: "'Age: 15' / 'Hobby: Gaming'"
        },
        {
          id: "empty-print-explain",
          type: "explain",
          title: "✨ Making a Blank Line — print() with Nothing Inside",
          content: `When you print several lines, you sometimes want **a blank line between them** for breathing room. Text that's too crammed is hard to read.

The trick is simple. **\`print()\` with nothing inside the parentheses prints a blank line.**

\`\`\`python
print('First line')
print()        # one blank line
print('Third line')
\`\`\`

Result:
\`\`\`
First line

Third line
\`\`\`

> 💡 **\`print()\` with no arguments doesn't cause an error.** It just prints a single newline.`
        },
        {
          id: "empty-print-explain-why",
          type: "explain",
          title: "✨ Why It Works & Where to Use It",
          content: `### Why does it make a blank line?

\`print()\` always adds a line break at the end. With nothing inside → **just the line break gets printed** → on screen it looks like a blank line.

### Where it's useful

- **Separating paragraphs** — greeting, blank line, main message
- **Cleaning up output** — space between groups of results
- **Visual polish** — give the reader room to breathe`
        },
        {
          id: "try-empty-print",
          type: "tryit",
          title: "🖥️ Make a blank line yourself",
          task: "Print 'Hi', then a blank line, then 'Bye'.",
          initialCode: "print('Hi')\n# Put an empty print() here for the blank line\nprint('Bye')",
          expectedOutput: "Hi\n\nBye",
          hint: "An empty print() (no arguments) gives you a blank line",
          hint2: "print('Hi')\nprint()\nprint('Bye')"
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "📎 Commas — multiple values on one line",
          content: `Put **commas (\`,\`)** between values inside one \`print()\` and they all appear on the same line.

\`\`\`python
print('Name:', 'Alice')
print('Score:', 100)
\`\`\`

Next page: **how does the spacing look?** 🤔`
        },
        {
          id: "predict-comma-space",
          type: "predict",
          title: "💭 Predict the output",
          content: "When you separate values with commas, what does the spacing look like?",
          code: "print('a', 'b', 'c')",
          options: ["a b c  (one space between each)", "abc  (stuck together)", "a,b,c  (commas show up)", "a\nb\nc  (three lines)"],
          answer: 0,
          explanation: "Commas tell Python to **add a single space between values automatically.** So it shows as 'a b c'."
        },
        {
          id: "comma-explain-space",
          type: "explain",
          title: "💡 The comma's magic — mix text + numbers",
          content: `Commas add a **space between values automatically**. Plus you can mix **text + numbers** on one line!

\`\`\`python
print('Age:', 15)
print('Total:', 100 + 50)
\`\`\`

That's the really handy part — clean label-and-value pairs in one line.`
        },
        {
          id: "predict-comma-mix",
          type: "predict",
          title: "💭 Predict — text + math",
          content: "What happens when you mix text and a calculation with a comma?",
          code: "print('Total:', 100 + 50)",
          options: ["Total: 150", "Total: 100 + 50", "Total:, 150", "Error"],
          answer: 0,
          explanation: "The expression 100 + 50 is calculated to 150 first, then printed with the label 'Total:' separated by one auto-space."
        },
        {
          id: "comma-explain-vs",
          type: "explain",
          title: "❓ Commas vs multiple print() — what's the difference?",
          content: `\`\`\`python
print('a', 'b')    # a b       ← one line, space between
print('a')         # a
print('b')         # b         ← split into two lines
\`\`\`

**Same line → use commas. Split lines → use multiple \`print()\`.**`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Use a comma to print 'Result:' and 100!",
          task: "Use a comma to print 'Result:' and 100!",
          initialCode: "# Use a comma to print 'Result:' and 100\nprint('Result:', ___)",
          expectedOutput: "Result: 100",
          hint: "The blank takes a single number. No quotes.",
          hint2: "100"
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
          title: "🏆 Final Mission — Build Your Character!",
          task: "Fill in your character info — name, level, HP are up to you! 🎮",
          initialCode: "print('=== 🎮 Character Info ===')\nprint('Name:', 'Your name here!')\nprint('Level:', 1)\nprint('HP:', 100)\nprint('Attack:', 25)\nprint('=== Let the adventure begin! ===')",
          hint: "Commas connect labels and values. Change just the text in quotes and the numbers — anything you want!",
          hint2: "Example: print('Name:', 'FireMage')   /   print('Level:', 7)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **\`print()\`** — the command for showing output on screen
✅ **Quotes** — wrap text (strings) with \`'\` or \`"\`
✅ **Numbers** — no quotes needed (math works too!)
✅ **\`#\` comments** — notes for humans, ignored by the computer
✅ **Multi-line output** — call \`print()\` several times
✅ **Blank line** — empty \`print()\`
✅ **Commas** — multiple values on one line + automatic spaces

### You really did button up the first step 🎯

Now you can tell the computer **"show this on the screen."** Every program eventually has to show its results — and this is how. It all starts here.

Next time we'll learn about **data types** — the different **kinds of values** the computer handles, like text, numbers, and true/false. 🚀`
        }
      ]
    }
  ]
}
