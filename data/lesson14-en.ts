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
          title: "🔁 How Long Do We Repeat?",
          content: `**for loop**: Repeats a fixed number of times
**while loop**: Repeats while a condition is true

\`\`\`python
# Repeat until the password is correct
while password != "1234":
    password = input("Password: ")
\`\`\`

Use **while** when you **don't know how many times** to repeat!`
        },
        {
          id: "while-explain",
          type: "explain",
          title: "📝 while Loop Basics",
          content: `\`\`\`python
count = 0
while count < 5:
    print(count)
    count = count + 1
# 0, 1, 2, 3, 4
\`\`\`

1. **Check condition**: Is count < 5 true?
2. **Execute**: print and increment count
3. **Check condition again** → repeat!
4. When count becomes 5, the condition is false → stop`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print numbers from 1 to 5!",
          initialCode: "num = 1\n# Repeat while num is 5 or less\nwhile ___:\n    print(num)\n    num = num + 1",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "Write a condition where num is 5 or less!",
          hint2: "while num <= 5:"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When does a while loop stop?",
          options: ["It loops forever", "When the condition becomes False", "After 5 iterations", "When an error occurs"],
          answer: 1,
          explanation: "A while loop stops when the condition becomes False!"
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
          title: "⚠️ Watch Out for Infinite Loops!",
          content: `If the condition stays True, it repeats **forever**!

\`\`\`python
# ❌ Infinite loop! (num never changes)
num = 1
while num <= 5:
    print(num)
    # Forgot num = num + 1!
\`\`\`

**Make sure the condition eventually becomes False!**`
        },
        {
          id: "break-explain",
          type: "explain",
          title: "🛑 break - Escape!",
          content: `Use **break** to force-exit a loop!

\`\`\`python
while True:  # Intentional infinite loop
    answer = input("Quit? (y/n): ")
    if answer == "y":
        print("Exiting!")
        break  # Escape!
\`\`\`

**while True + break** = a commonly used pattern!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Stop when you find a multiple of 3!",
          initialCode: "num = 1\n\nwhile num <= 20:\n    if num % 3 == 0:\n        print(f\"{num} is a multiple of 3! Stop!\")\n        ___  # Exit the loop!\n    num = num + 1",
          expectedOutput: "3 is a multiple of 3! Stop!",
          hint: "Check the condition with if, then break!",
          hint2: "break"
        },
        {
          id: "continue-explain",
          type: "explain",
          title: "⏭️ continue - Skip Ahead",
          content: `Use **continue** to skip the rest and go to the next iteration!

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue  # Skip 3
    print(i)
# 1, 2, 4, 5 (no 3!)
\`\`\`

**break**: Exit completely
**continue**: Skip just this iteration`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Practice continue!",
          task: "Skip 3 and print 1 through 5!",
          initialCode: "num = 0\nwhile num < 5:\n    num = num + 1\n    if num == 3:\n        ___  # Skip 3\n    print(num)",
          expectedOutput: "1\n2\n4\n5",
          hint: "continue skips only the current iteration!",
          hint2: "Use continue when num == 3"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between break and continue?",
          options: [
            "They do the same thing",
            "break exits the loop, continue skips to the next iteration",
            "break skips, continue exits",
            "Both cause errors"
          ],
          answer: 1,
          explanation: "break exits the loop entirely, continue skips only the current iteration!"
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
          title: "⚖️ When to Use Which?",
          content: `Use **for loop**:
- When the number of iterations is **fixed**
- When **iterating** over a list/string

\`\`\`python
for i in range(10):  # Repeat 10 times
for name in names:   # Iterate over a list
\`\`\`

Use **while loop**:
- When you **don't know** the number of iterations
- When the **condition** matters most

\`\`\`python
while not found:     # Until found
while money > 0:     # While there's money
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Countdown!",
          task: "Count down from 5 to 1, then print 'Liftoff!'",
          initialCode: "count = 5\nwhile count > 0:\n    print(count)\n    count = ___\nprint(\"Liftoff!\")",
          expectedOutput: "5\n4\n3\n2\n1\nLiftoff!",
          hint: "Repeat while count > 0!",
          hint2: "count = count - 1 to decrease!"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Keep Adding Until Over 100!",
          task: "Add numbers from 1 and stop when the sum exceeds 100!",
          initialCode: "total = 0\nnum = 1\n\n# Repeat while total is 100 or less\nwhile ___:\n    total = total + num\n    num = num + 1\n\nprint(f\"Total: {total}\")\nprint(f\"Last number: {num - 1}\")",
          expectedOutput: "Total: 105\nLast number: 14",
          hint: "Write a condition where total is 100 or less!",
          hint2: "while total <= 100:"
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
          title: "🎮 Number Guessing Game Logic",
          content: `Here's how a number guessing game works:

\`\`\`python
secret = 7  # The answer

while guess != secret:
    guess = get_input
    if guess < secret:
        print("Go higher!")
    elif guess > secret:
        print("Go lower!")

print("Correct!")
\`\`\`

In practice, we'll use a **predefined list of guesses** instead of input()!`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Number guessing simulation!",
          initialCode: "secret = 7\nguesses = [3, 5, 9, 7]\n\nattempts = 0\n\nfor guess in guesses:\n    attempts = attempts + 1\n    print(f\"Attempt {attempts}: {guess}\")\n    \n    if ___:\n        print(\"→ Go higher!\")\n    elif ___:\n        print(\"→ Go lower!\")\n    else:\n        print(f\"→ Correct! Got it in {attempts} attempts!\")\n        ___",
          expectedOutput: "Attempt 1: 3\n→ Go higher!\nAttempt 2: 5\n→ Go higher!\nAttempt 3: 9\n→ Go lower!\nAttempt 4: 7\n→ Correct! Got it in 4 attempts!",
          hint: "Write conditions comparing guess and secret!",
          hint2: "guess < secret / guess > secret / break"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **while condition:** - Repeat while a condition is true
✅ **Watch out for infinite loops!** - The condition must change
✅ **break** - Exit the loop
✅ **continue** - Skip just this iteration
✅ **for vs while** - Choose based on the situation

🎉 **Part 2 Complete!**
Next Part, we'll learn about **data structures**! 📦`
        }
      ]
    }
  ]
}
