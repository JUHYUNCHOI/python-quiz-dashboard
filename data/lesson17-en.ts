// ============================================
// Lesson 17: Lists and Loops
// ============================================
import { LessonData } from './types'

export const lesson17EnData: LessonData = {
  id: "17",
  title: "Lists and Loops",
  emoji: "🔁",
  description: "Handle lists with loops!",
  chapters: [
    {
      id: "ch1",
      title: "Iterating with for",
      emoji: "🔄",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 List + for = Ultimate Combo!",
          content: `You can take out each element of a list one by one:

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# strawberry
\`\`\`

Use the **for variable in list:** pattern!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print every element of the list!",
          initialCode: "numbers = [10, 20, 30, 40, 50]\n\nfor num in numbers:\n    print(num)",
          expectedOutput: "10\n20\n30\n40\n50",
          hint: "Each element of numbers goes into num!",
          hint2: "for num in numbers:"
        },
        {
          id: "calc-explain",
          type: "explain",
          title: "🧮 Calculating While Iterating",
          content: `You can do something with each element:

\`\`\`python
prices = [1000, 2000, 3000]
total = 0

for price in prices:
    total = total + price

print("Total:", total)  # 6000
\`\`\`

**Shorter way:**
\`\`\`python
total = sum(prices)  # 6000
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Calculate the Sum!",
          task: "Find the sum of the scores!",
          initialCode: "scores = [85, 90, 78, 92, 88]\ntotal = 0\n\nfor score in scores:\n    total = total + score\n\nprint(\"Total:\", total)",
          expectedOutput: "Total: 433",
          hint: "total = total + score",
          hint2: "Or total += score"
        }
      ]
    },
    {
      id: "ch2",
      title: "With Indexes",
      emoji: "🔢",
      steps: [
        {
          id: "enumerate-explain",
          type: "explain",
          title: "🔢 enumerate() - When You Need Indexes Too",
          content: `What if you also need the index number?

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for i, fruit in enumerate(fruits):
    print(f"#{i}: {fruit}")
# #0: apple
# #1: banana
# #2: strawberry
\`\`\`

**enumerate(list)** = (index, value) pairs!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Print Rankings!",
          task: "Print the ranking and name together!",
          initialCode: "winners = [\"Alice\", \"Bob\", \"Charlie\"]\n\nfor i, name in enumerate(winners):\n    print(f\"#{i+1}: {name}\")",
          expectedOutput: "#1: Alice\n#2: Bob\n#3: Charlie",
          hint: "Use i+1 to start from 1!",
          hint2: "enumerate() starts from 0"
        },
        {
          id: "range-explain",
          type: "explain",
          title: "🔢 range() and Index Access",
          content: `You can also iterate with range(len(list)):

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
\`\`\`

**Useful when modifying values:**
\`\`\`python
numbers = [1, 2, 3]
for i in range(len(numbers)):
    numbers[i] = numbers[i] * 2
print(numbers)  # [2, 4, 6]
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Modify Values!",
          task: "Add 10 points to every score!",
          initialCode: "scores = [70, 80, 90]\n\nfor i in range(len(scores)):\n    scores[i] = scores[i] + 10\n\nprint(scores)",
          expectedOutput: "[80, 90, 100]",
          hint: "Access by index and add 10!",
          hint2: "scores[i] = scores[i] + 10"
        }
      ]
    },
    {
      id: "ch3",
      title: "Combining with Conditions",
      emoji: "🔍",
      steps: [
        {
          id: "filter-explain",
          type: "explain",
          title: "🔍 Finding Only What Matches",
          content: `Filter with if inside a for loop:

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:
    if num % 2 == 0:  # even only
        print(num)
# 2, 4, 6, 8, 10
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Only 80 and Above!",
          task: "Print only scores that are 80 or above!",
          initialCode: "scores = [65, 80, 72, 95, 88, 55, 90]\n\nfor score in scores:\n    if score >= 80:\n        print(score)",
          expectedOutput: "80\n95\n88\n90",
          hint: "Put an if inside the for loop!",
          hint2: "if score >= 80:"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Count the number of students who passed (60 or above)!",
          initialCode: "scores = [45, 80, 55, 90, 70, 30, 85]\npass_count = 0\n\nfor score in scores:\n    if score >= ___:\n        pass_count += ___\n\nprint(f\"Passed: {pass_count} students\")",
          expectedOutput: "Passed: 4 students",
          hint: "Increase count if score is 60 or above!",
          hint2: "if score >= 60: pass_count += 1"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Print a report card!",
          initialCode: "names = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = [85, 92, 78]\n\nprint(\"=== Report Card ===\")\nfor i in range(len(___)):\n    if scores[i] >= 90:\n        grade = ___\n    elif scores[i] >= 80:\n        grade = ___\n    else:\n        grade = ___\n    print(f\"{names[i]}: {scores[i]} pts ({grade})\")",
          expectedOutput: "=== Report Card ===\nAlice: 85 pts (B)\nBob: 92 pts (A)\nCharlie: 78 pts (C)",
          hint: "Iterate indexes with range(len(names))!",
          hint2: "Use names[i] and scores[i] together!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **for item in list** - Basic iteration
✅ **enumerate()** - With indexes
✅ **range(len())** - Access by index
✅ **for + if** - Conditional filtering

Next time we'll learn about **split() and join()**! 🚀`
        }
      ]
    }
  ]
}
