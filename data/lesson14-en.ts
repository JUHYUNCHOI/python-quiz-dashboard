// ============================================
// Lesson 14: Loops (while)
// ============================================
import { LessonData } from './types'

export const lesson14EnData: LessonData = {
  id: "14",
  title: "Loops (while)",
  emoji: "🔁",
  description: "Learn how to repeat while a condition is true!",
  chapters: [
    {
      id: "ch1",
      title: "while Loop Basics",
      emoji: "🔄",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔁 Repeating \"while ...\" instead of \"N times\"",
          content: `**for loop** → use when the **count is known** (\"5 times\")
**while loop** → use when you **don't know when it ends** (\"until the password is right\")

\`\`\`python
# Keep asking until the password matches
while password != "1234":
    password = input("Password: ")
\`\`\`

**while = \"as long as\".** It keeps repeating *while* the condition is true.

💡 **for vs while?**
- Known count → for
- Stop based on a *condition* → while`
        },
        {
          id: "while-explain",
          type: "explain",
          title: "📝 while loop = \"true? do it once more!\"",
          content: `\`\`\`python
count = 0
while count < 5:
    print(count)
    count = count + 1
# 0, 1, 2, 3, 4
\`\`\`

What while does (over and over):
1. **Check the condition**: is \`count < 5\` true?
2. If yes → run the indented block (print, count += 1)
3. **Go back and check again**
4. The moment \`count\` becomes 5 → condition false → exit

> 💡 Forget \`count = count + 1\` and count never changes → loops forever (infinite loop). More in the next chapter!`
        },
        {
          id: "syntax-builder",
          type: "interactive",
          title: "🧱 Build the while loop piece by piece",
          content: `Watch what parts make up a while loop. Hit **▶ Play**!`,
          component: "pyWhileBuilder",
        },
        {
          id: "while-sim",
          type: "explain",
          title: "🔍 Trace — while countdown (3 → 0)",
          content: `See how while goes \"check → run → change → check again\" step by step!

\`count\` shrinks from 3 to 0.

Press **▶ Run** or **▷ Step**.`,
          component: "codeTracePyWhile",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Fill the blank — print 1 to 5",
          task: "Print numbers from 1 to 5, one per line!",
          initialCode: "num = 1\n# Write the condition that says when to keep going\nwhile ___:\n    print(num)\n    num = num + 1",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "We want to *include* 5. So keep going while num is \"less than or equal to\" 5.",
          hint2: "num <= 5"
        },
        {
          id: "predict1",
          type: "predict",
          title: "💭 What if while never stops?",
          content: "What happens if you run this?\n\n```python\nnum = 1\nwhile num <= 5:\n    print(num)\n    # num = num + 1  ← forgot this!\n```",
          options: ["Prints 1 once", "Prints 1 to 5", "Error", "Prints 1 forever (infinite loop)"],
          answer: 3,
          explanation: "If num never changes, \`num <= 5\` stays true forever → prints 1 endlessly! This is called an **infinite loop**.\n\nWe'll cover it in the next chapter!"
        },
        {
          id: "try1-scratch",
          type: "tryit",
          title: "✋ Type it from scratch — count down 10 to 1",
          task: "Print 10, 9, 8, ... 2, 1, one per line. Type it yourself ✍️",
          initialCode: "# 1) Make a variable num set to 10\n# 2) While num is at least 1 (while num >= 1:)\n# 3) Inside the loop, print num and subtract 1\n# Stuck? Tap 'hint' below!\n\n",
          expectedOutput: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
          hint: "Start with num = 10. Inside \`while num >= 1:\` print then \`num = num - 1\`.",
          hint2: "num = 10\nwhile num >= 1:\n    print(num)\n    num = num - 1"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — when does while stop?",
          content: "A while loop exits when...",
          options: ["After 5 loops automatically", "The condition becomes False", "You press Enter", "There's an error"],
          answer: 1,
          explanation: "while stops the moment the condition becomes **False**!\nThat's why you need a variable change that eventually makes it false."
        }
      ]
    },
    {
      id: "ch2",
      title: "Infinite Loops and break",
      emoji: "🛑",
      steps: [
        {
          id: "infinite-explain",
          type: "explain",
          title: "⚠️ Infinite loop — the trap that won't let you out",
          content: `If the condition is true forever → the loop runs **forever**. You'd have to kill the program 😱

\`\`\`python
# ❌ Infinite loop! num never changes
num = 1
while num <= 5:
    print(num)
    # num = num + 1 ← forgot!
\`\`\`

while checklist:
- [ ] Will the condition ever become false?
- [ ] Is there a variable change (like \`num = num + 1\`) that makes it false?

Sometimes we **want** an infinite loop on purpose → use \`break\` to exit (next page)!`
        },
        {
          id: "break-explain",
          type: "explain",
          title: "🛑 break = \"stop right now!\" — exit the loop",
          content: `**break** makes a while (or for) loop **stop immediately**!

\`\`\`python
while True:  # intentional infinite loop
    answer = input("Quit? (y/n): ")
    if answer == "y":
        print("Bye!")
        break  # ← exits the while loop
\`\`\`

**\`while True\` + \`break\`** = common pattern!
- Keep looping forever
- Use break to exit on a specific condition`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Fill the blank — stop at the first multiple of 3!",
          task: "Check 1 to 20 and stop the moment you find the **first multiple of 3**!",
          initialCode: "num = 1\n\nwhile num <= 20:\n    if num % 3 == 0:\n        print(f\"{num} is a multiple of 3! Stop!\")\n        ___  # exit the loop!\n    num = num + 1",
          expectedOutput: "3 is a multiple of 3! Stop!",
          hint: "What keyword exits the loop immediately?",
          hint2: "break"
        },
        {
          id: "continue-explain",
          type: "explain",
          title: "⏭️ continue = \"skip this one, go next\"",
          content: `**continue** skips the rest of the body and jumps to the **next iteration**!

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue  # skip just when i is 3
    print(i)
# Output: 1, 2, 4, 5 (no 3!)
\`\`\`

**break vs continue**:
- **break**: ends the loop (exits)
- **continue**: skips this round, loop keeps going

> 💡 Analogy: break = leave the theater / continue = skip this scene`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Fill the blank — skip 3, print 1, 2, 4, 5",
          task: "Print 1, 2, 4, 5 (skip 3)!",
          initialCode: "num = 0\nwhile num < 5:\n    num = num + 1\n    if num == 3:\n        ___  # skip 3\n    print(num)",
          expectedOutput: "1\n2\n4\n5",
          hint: "What keyword skips just this round (next iteration)?",
          hint2: "continue"
        },
        {
          id: "try-break-continue",
          type: "tryit",
          title: "✋ Type from scratch — break + continue combo",
          task: "Loop from 1 to 10:\n- 8 → break\n- odd → continue (skip)\n- even → print\n\nResult: 2, 4, 6 (the evens before 8)!",
          initialCode: "num = 0\nwhile num < 10:\n    num = num + 1\n    # if 8 → break\n    # if odd → continue\n    # if even → print\n",
          expectedOutput: "2\n4\n6",
          hint: "if num == 8: break / if num % 2 == 1: continue / print(num) in that order!",
          hint2: "num = 0\nwhile num < 10:\n    num = num + 1\n    if num == 8:\n        break\n    if num % 2 == 1:\n        continue\n    print(num)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz — break vs continue",
          content: "Which is correct?",
          options: [
            "They do the same thing",
            "break = exit loop, continue = skip just this round",
            "break = skip just this round, continue = exit",
            "Both cause errors"
          ],
          answer: 1,
          explanation: "**break** = exits the loop completely.\n**continue** = skips the rest of this round and moves to the next iteration!"
        }
      ]
    },
    {
      id: "ch3",
      title: "for vs while",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ for vs while — which one when?",
          content: `**for loop — when the count is clear**
- N repetitions
- Walk through a list / string

\`\`\`python
for i in range(10):  # exactly 10 times
for name in names:   # through the whole list
\`\`\`

**while loop — when the condition matters**
- Don't know how many rounds
- "until X" / "while X"

\`\`\`python
while not found:     # until found
while money > 0:     # while money lasts
\`\`\`

> 💡 Confused? Ask: "How many times?" If you can answer → for. If not → while.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Fill the blank — rocket countdown (5 → 1 → Liftoff!)",
          task: "Print 5 down to 1, then \"Liftoff!\"",
          initialCode: "count = 5\nwhile count > 0:\n    print(count)\n    count = ___\nprint(\"Liftoff!\")",
          expectedOutput: "5\n4\n3\n2\n1\nLiftoff!",
          hint: "We need count to shrink by 1 each round. How?",
          hint2: "count - 1"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Fill the blank — add 1, 2, 3, ... until total passes 100",
          task: "Add 1, 2, 3, ... one by one. Stop the **moment** total goes over 100!",
          initialCode: "total = 0\nnum = 1\n\n# Keep looping only while total stays under or at 100\nwhile ___:\n    total = total + num\n    num = num + 1\n\nprint(f\"Total: {total}\")\nprint(f\"Last number: {num - 1}\")",
          expectedOutput: "Total: 105\nLast number: 14",
          hint: "Keep going while total is \"100 or less\" — what's the condition?",
          hint2: "total <= 100"
        },
        {
          id: "try-while-scratch",
          type: "tryit",
          title: "✋ Type from scratch — double until 1000 or more",
          task: "Start at 1, double it. Print the value the moment it hits 1000+ ✍️",
          initialCode: "# 1) Make a variable num set to 1\n# 2) While num is less than 1000 (while num < 1000:)\n# 3) Inside, double num (num = num * 2)\n# 4) After the loop, print num\n\n",
          expectedOutput: "1024",
          hint: "while num < 1000: num = num * 2. After the loop, print(num).",
          hint2: "num = 1\nwhile num < 1000:\n    num = num * 2\nprint(num)"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission-explain",
          type: "explain",
          title: "🎮 Mission preview — number guessing game logic",
          content: `Number guessing game (Up & Down) works like this:

\`\`\`python
secret = 7  # the computer's answer

while guess != secret:
    guess = get_input
    if guess < secret:
        print("Go higher!")
    elif guess > secret:
        print("Go lower!")

print("Correct!")
\`\`\`

We'll use a **predefined list of guesses** (since \`input()\` is tricky in our sandbox)!`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission — Up & Down guessing game",
          task: "Secret is **7**. Your friend tries 3 → 5 → 9 → 7.\n\nFor each guess:\n- guess < secret → \"→ Go higher!\"\n- guess > secret → \"→ Go lower!\"\n- guess == secret → \"→ Correct! Got it in N attempts!\" then **break**!\n\nFill 3 blanks:",
          initialCode: "secret = 7\nguesses = [3, 5, 9, 7]\n\nattempts = 0\n\nfor guess in guesses:\n    attempts = attempts + 1\n    print(f\"Attempt {attempts}: {guess}\")\n    \n    if ___:\n        print(\"→ Go higher!\")\n    elif ___:\n        print(\"→ Go lower!\")\n    else:\n        print(f\"→ Correct! Got it in {attempts} attempts!\")\n        ___",
          expectedOutput: "Attempt 1: 3\n→ Go higher!\nAttempt 2: 5\n→ Go higher!\nAttempt 3: 9\n→ Go lower!\nAttempt 4: 7\n→ Correct! Got it in 4 attempts!",
          hint: "Compare guess vs secret. End the loop once correct!",
          hint2: "guess < secret / guess > secret / break"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 What You Learned",
          content: `## What You Learned Today

✅ \`while condition:\` — repeat while the condition is true
✅ ⚠️ **Avoid infinite loops** — make sure the condition can become false!
✅ \`break\` — exit a loop immediately
✅ \`continue\` — skip just this iteration
✅ **for vs while** — known count → for, condition → while

🎉 **Part 2 Complete!**
Next part: **data structures** — boxes for holding data like lists and dictionaries! 📦`
        }
      ]
    }
  ]
}
