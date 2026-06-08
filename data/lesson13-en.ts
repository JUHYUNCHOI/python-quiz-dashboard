// ============================================
// Lesson 13: for Loops
// ============================================
import { LessonData } from './types'

export const lesson13EnData: LessonData = {
  id: "13",
  title: "for Loops",
  emoji: "🔄",
  description: "Learn how to repeat things a set number of times!",
  chapters: [
    {
      id: "ch1",
      title: "for Loop Basics",
      emoji: "🔁",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 Print the same thing 5 times? 100 times? Copy-paste hurts.",
          content: `You need to print "Hello" 5 times.

\`\`\`python
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")
\`\`\`

5 times is OK... but **100 times**? 😱

Your fingers hurt! That's why we have **loops** = the "for loop".`
        },
        {
          id: "for-explain",
          type: "explain",
          title: "🔁 for loop = \"repeat this many times!\"",
          content: `\`\`\`python
for i in range(5):
    print("Hello")
\`\`\`

These 4 lines print "Hello" **5 times**!

What each piece means:
- \`for\` = "repeat"
- \`i\` = a variable that becomes 0, 1, 2, 3, 4 each round
- \`range(5)\` = 0 up to (but not including) 5 → 0, 1, 2, 3, 4 → 5 numbers
- \`:\` colon + indentation → same rule as \`if\`!

> 💡 \`i\` is just a variable name. Use \`x\` or \`count\` if you want — most coders use \`i\` (short for **index**).`
        },
        {
          id: "syntax-builder",
          type: "interactive",
          title: "🧱 Build the for loop piece by piece",
          content: `Watch the for loop get assembled one piece at a time. Hit **▶ Play**!`,
          component: "pyForBuilder",
        },
        {
          id: "for-sim",
          type: "explain",
          title: "🔍 Trace — watch the for loop run line by line",
          content: `See how a for loop actually runs, one step at a time!

Watch \`total\` grow as 1, 2, 3 get added — see how \`i\` and \`total\` change each round.

Press **▶ Run** or **▷ Step**.`,
          component: "codeTracePyForSum",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Fill the blank — print \"Hello!\" exactly 3 times",
          task: "Make \"Hello!\" appear 3 times!",
          initialCode: "for i in range(___):\n    print(\"Hello!\")",
          expectedOutput: "Hello!\nHello!\nHello!",
          hint: "To repeat 3 times, what number goes inside range()?",
          hint2: "3"
        },
        {
          id: "predict1",
          type: "predict",
          title: "💭 range(4) — how many loops?",
          content: "What happens when you run this?\n\n```python\nfor i in range(4):\n    print(\"hi\")\n```",
          options: ["3 times", "4 times", "5 times", "Error"],
          answer: 1,
          explanation: "range(4) = 0, 1, 2, 3 → that's 4 numbers → 4 repeats!\n\nKey: range(n) goes from **0 up to (but not including) n** = **n numbers** total."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — what's required in a for loop?",
          content: "If you forget to **indent** the line after `for ...:` what happens?",
          options: ["Runs fine", "Error: IndentationError", "Loops only once", "Infinite loop"],
          answer: 1,
          explanation: "Same as `if`! Colon (:) + indentation = the body to repeat.\nWithout it, Python yells \"IndentationError\"."
        }
      ]
    },
    {
      id: "ch2",
      title: "Using range()",
      emoji: "🔢",
      steps: [
        {
          id: "range-explain",
          type: "explain",
          title: "🔢 range() = pick \"from where to where\"",
          content: `Think of \`range\` as a **vending machine that hands you numbers in order**. Depending on which buttons you press (how many numbers you give it), you get different numbers out. You can pass **1, 2, or 3 numbers**, and each has a different meaning.

**① range(end)** — from 0 up to (but not including) end
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
\`\`\`
You didn't press a "start" button, so Python starts at **0** for you. (Why 0 and not 1? Python counts the first item as item 0 — like an elevator with a "G (ground)" floor instead of floor 1.)

**② range(start, end)** — from start up to (but not including) end
\`\`\`python
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5
\`\`\`
For when you want to start at **your own number**, not 0. To count from 1, use \`range(1, ...)\`.

**③ range(start, end, step)** — jump by step
\`\`\`python
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\`
Instead of one at a time, **skip in jumps**. Step 2 gives even numbers, step 3 jumps three at a time.

**Why is the end never included?** \`range(start, end)\` is defined to go *"up to just before end."* That way \`range(0, 5)\` lands on exactly **5 numbers** (0,1,2,3,4), so the tidy rule "end − start = how many" always works out.

> ⚠️ The \`end\` is **always excluded**! For example \`range(1, 5)\` gives \`1, 2, 3, 4\` — **5 is left out**. So to print \`1 ~ 5\` all the way, make the end one bigger: \`range(1, 6)\`.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Fill the blank — print 1 to 5",
          task: "Print 1, 2, 3, 4, 5 — one per line!",
          initialCode: "# Print 1 through 5\nfor i in range(___, ___):\n    print(i)",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "End is not included. To reach 5, what should end be?",
          hint2: "1 / 6"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Fill the blank — even numbers only (2, 4, 6, 8, 10)",
          task: "Print 2, 4, 6, 8, 10 — jump by 2!",
          initialCode: "# From 2 to 10, step by 2\nfor i in range(___, ___, ___):\n    print(i)",
          expectedOutput: "2\n4\n6\n8\n10",
          hint: "range(start, end, step) — to include 10, end must be 11!",
          hint2: "2 / 11 / 2"
        },
        {
          id: "predict2",
          type: "predict",
          title: "💭 range(1, 10, 3) — what does it make?",
          content: "What's the result?\n\n```python\nfor i in range(1, 10, 3):\n    print(i)\n```",
          options: ["1, 2, 3", "1, 4, 7", "1, 4, 7, 10", "3, 6, 9"],
          answer: 1,
          explanation: "Start at 1 → add 3 each time. 1 → 4 → 7 → (next would be 10 but end is 10, **not included**) → stop!\n\nResult: 1, 4, 7"
        }
      ]
    },
    {
      id: "ch3",
      title: "Looping Over a String + Sums",
      emoji: "🔤",
      steps: [
        {
          id: "list-explain",
          type: "explain",
          title: "🔤 Pull a string apart, one letter at a time",
          content: `Besides \`range\`, you can put a **string** after \`in\` — each letter comes out one at a time!

\`\`\`python
word = "cat"
for ch in word:
    print(ch)
# c
# a
# t
\`\`\`

**Why can a string go into a for loop?** A string is really just *letters lined up in a row*. \`"cat"\` is the letters \`c\`, \`a\`, \`t\` stuck together in order (like train cars). A for loop is the tool for "take a lined-up thing and pull items off the front one by one," so just as \`range\` hands you numbers one at a time, a string hands you **letters one at a time**.

Pattern: **for variable in string:**
The variable \`ch\` becomes **c → a → t**, in order. (Any name works — \`ch\` for "character" is common.)

> 💡 Since you can handle one letter at a time, you can print a name down the page or count its letters in a single for line.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Fill the blank — print a name down the page",
          task: "Print a name one letter per line!",
          initialCode: "name = \"Mia\"\n\nfor ___ in name:\n    print(___)",
          expectedOutput: "M\ni\na",
          hint: "Both blanks must be the **same variable name** (\"ch\" works for a character).",
          hint2: "ch / ch"
        },
        {
          id: "sum-explain",
          type: "explain",
          title: "🧮 Sum it up — the \"add to a variable\" pattern",
          content: `for loop + a counter variable = **sum it up**!

\`\`\`python
total = 0   # start at 0

for num in range(1, 6):   # 1, 2, 3, 4, 5
    total = total + num   # add num to total, store back

print(f"Sum: {total}")  # Sum: 15
\`\`\`

Flow:
- Round 1: total = 0 + 1 = 1
- Round 2: total = 1 + 2 = 3
- ... keep adding → final: 15

**Why put \`total = 0\` *outside* the for loop?** \`total\` is an **empty piggy bank** that collects the numbers. You only empty a piggy bank *once, before* you start dropping coins in. If you put \`total = 0\` *inside* the loop, you'd empty the piggy bank every round — so whatever you added keeps vanishing and the sum never builds up!

> 💡 \`total = total + num\` can be shortened to \`total += num\`.`
        },
        {
          id: "forif-sim",
          type: "explain",
          title: "🔍 Trace — for + if to pick even / odd",
          content: `Use **if** inside a loop to filter just the even numbers. Step through each round!

Press **▶ Run** or **▷ Step**.`,
          component: "codeTracePyForIf",
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Fill the blank — add up 1 to 10",
          task: "Add every number from 1 to 10 to get the total!",
          initialCode: "total = 0\n\nfor i in range(1, 11):\n    # Add i to total and store it back\n    total = ___\n\nprint(f\"Total: {total}\")",
          expectedOutput: "Total: 55",
          hint: "Take the current total, add this i, store it back in total.",
          hint2: "total + i"
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
          title: "🏆 Final Mission — 5 times table printer",
          task: "Print the **5 times table**!\n\n```\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n...\n5 x 9 = 45\n```\n\n3 blanks to fill:\n- range start and end — from 1 to 9 (remember: end is not included!)\n- result — how do you combine 5 and i to get the answer?",
          initialCode: "num = 5\n\nfor i in range(___, ___):\n    result = ___\n    print(f\"{num} x {i} = {result}\")",
          expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45",
          hint: "1 to 9 = range(1, 10). Multiplication uses * !",
          hint2: "1 / 10 / num * i"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 What You Learned",
          content: `## What You Learned Today

✅ \`for i in range(n):\` — repeat n times
✅ \`range(start, end, step)\` — pick a range (end is NOT included!)
✅ \`for ch in string:\` — go through each letter
✅ **Sum pattern** — \`total = total + num\` (or \`total += num\`)

Next time: **while loops** — "repeat while a condition is true"! 🚀`
        }
      ]
    }
  ]
}
