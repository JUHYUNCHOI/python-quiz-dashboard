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
          title: "🔄 We Need Repetition!",
          content: `What if you want to print "Hello" 5 times?

\`\`\`python
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")
\`\`\`

What about 100 times? 😱 **Loops** to the rescue!`
        },
        {
          id: "for-explain",
          type: "explain",
          title: "🔁 for Loop Basics",
          content: `\`\`\`python
for i in range(5):
    print("Hello")
\`\`\`

This code prints "Hello" **5 times**!

- \`for\`: repeat!
- \`i\`: a variable that changes with each iteration
- \`range(5)\`: 0, 1, 2, 3, 4 (5 times)
- \`:\`: colon is required!
- Indentation: the code to repeat`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 'Hello!' 3 times!",
          initialCode: "for i in range(___):\n    print(\"Hello!\")",
          expectedOutput: "Hello!\nHello!\nHello!",
          hint: "range(3) repeats 3 times!",
          hint2: "for i in range(3):"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "How many times does `for i in range(4):` repeat?",
          options: ["3 times", "4 times", "5 times", "Error"],
          answer: 1,
          explanation: "range(4) gives 0, 1, 2, 3 — so it repeats 4 times!"
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
          title: "🔢 range() in Detail",
          content: `**range(end)** — from 0 to end-1
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
\`\`\`

**range(start, end)** — from start to end-1
\`\`\`python
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5
\`\`\`

**range(start, end, step)**
\`\`\`python
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Print 1 to 5!",
          task: "Print 1, 2, 3, 4, 5!",
          initialCode: "# Print 1 through 5\nfor i in range(___, ___):\n    print(i)",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "range(1, 6) goes from 1 to 5!",
          hint2: "for i in range(1, 6):"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Print Only Even Numbers!",
          task: "Print 2, 4, 6, 8, 10!",
          initialCode: "# From 2 to 10, increment by 2\nfor i in range(___, ___, ___):\n    print(i)",
          expectedOutput: "2\n4\n6\n8\n10",
          hint: "Use range(start, end, step)!",
          hint2: "range(2, 11, 2)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What numbers does `range(1, 10, 3)` generate?",
          options: ["1, 2, 3", "1, 4, 7", "1, 4, 7, 10", "3, 6, 9"],
          answer: 1,
          explanation: "Starting from 1, increment by 3! 1, 4, 7 (10 is not included)"
        }
      ]
    },
    {
      id: "ch3",
      title: "Iterating Over Lists",
      emoji: "📋",
      steps: [
        {
          id: "list-explain",
          type: "explain",
          title: "📋 Iterating Over a List",
          content: `A **list** \`[]\` is a container that holds multiple values!
\`\`\`python
fruits = ["apple", "banana", "strawberry"]
\`\`\`

💡 We'll learn lists **in detail in Part 3**! For now, let's just see how to use them with for loops.

You can use a for loop to go through each item in a list one by one:

\`\`\`python
for fruit in fruits:
    print(fruit)
# apple
# banana
# strawberry
\`\`\`

The pattern is **for variable in list:**!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Greet each name one by one!",
          initialCode: "names = [\"Alice\", \"Bob\", \"Charlie\"]\n\nfor ___ in names:\n    print(f\"Hello, {___}!\")",
          expectedOutput: "Hello, Alice!\nHello, Bob!\nHello, Charlie!",
          hint: "Each item in the list goes into the variable!",
          hint2: "for name in names: / {name}"
        },
        {
          id: "sum-explain",
          type: "explain",
          title: "🧮 Calculating a Sum",
          content: `You can calculate a sum with a for loop:

\`\`\`python
numbers = [10, 20, 30, 40, 50]
total = 0

for num in numbers:
    total = total + num

print(f"Sum: {total}")  # Sum: 150
\`\`\`

Or even shorter:
\`\`\`python
total = sum(numbers)  # 150
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Calculate the Sum!",
          task: "Find the total of the scores!",
          initialCode: "scores = [85, 90, 78, 92, 88]\ntotal = 0\n\nfor score in scores:\n    # Add score to total\n    total = ___\n\nprint(f\"Total: {total}\")",
          expectedOutput: "Total: 433",
          hint: "Add score to the current total and store it back in total!",
          hint2: "Or use total += score"
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
          task: "Print the 5 times table!",
          initialCode: "num = 5\n\nfor i in range(___, ___):\n    result = ___\n    print(f\"{num} x {i} = {result}\")",
          expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45",
          hint: "range(1, 10) for 1~9, result = num * i",
          hint2: "range(1, 10) / num * i"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **for i in range(n):** — repeat n times
✅ **range(start, end, step)** — specify a range
✅ **for item in list:** — iterate over a list
✅ **Calculating a sum** — total += num

Next time, we'll learn about **while loops**! 🚀`
        }
      ]
    }
  ]
}
