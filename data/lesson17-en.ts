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
      title: "Zipping Lists",
      emoji: "🤝",
      steps: [
        {
          id: "zip-explain",
          type: "explain",
          title: "🤝 zip() — Pair Two Lists Together!",
          content: `When you want to combine two lists into pairs:

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score} pts")
# Alice: 85 pts
# Bob: 92 pts
# Charlie: 78 pts
\`\`\`

| Method | Code | Feel |
|--------|------|------|
| range(len()) | \`for i in range(len(names)): names[i], scores[i]\` | Messy 😵 |
| **zip()** | \`for name, score in zip(names, scores)\` | Clean! ✨ |

💡 zip = like a zipper that "zips" two lists together!`
        },
        {
          id: "zip-pred1",
          type: "predict",
          title: "What's the output?",
          content: "Think about how zip pairs two lists!",
          code: "fruits = ['apple', 'banana']\nprices = [1000, 2000]\n\nfor fruit, price in zip(fruits, prices):\n    print(f'{fruit}=${price}')",
          options: ["apple=$1000\nbanana=$2000", "apple banana\n1000 2000", "Error", "(apple, 1000)\n(banana, 2000)"],
          answer: 0,
          explanation: "zip() pairs (apple,1000) and (banana,2000), then f-string formats them!"
        },
        {
          id: "zip-pred2",
          type: "predict",
          title: "Different lengths?",
          content: "What happens when the two lists have different lengths?",
          code: "a = [1, 2, 3]\nb = ['x', 'y']\n\nfor num, letter in zip(a, b):\n    print(num, letter)",
          options: ["1 x\n2 y", "1 x\n2 y\n3 None", "Error", "1 x\n2 y\n3"],
          answer: 0,
          explanation: "zip() stops at the shorter list! 3 has no pair so it's skipped. Safe!"
        },
        {
          id: "zip-quiz",
          type: "quiz",
          title: "Understanding zip!",
          content: "What happens when you iterate over `zip(['a','b'], [1,2])` with a for loop?",
          options: [
            "('a',1), ('b',2) in order",
            "('a','b'), (1,2) in order",
            "Returns a list [('a',1), ('b',2)]",
            "Error occurs"
          ],
          answer: 0,
          explanation: "zip pairs elements at the same position! First pair ('a',1), second pair ('b',2)!"
        }
      ]
    },
    {
      id: "ch5",
      title: "List Comprehension",
      emoji: "⚡",
      steps: [
        {
          id: "comp-explain",
          type: "explain",
          title: "⚡ List Comprehension — One-Line Magic!",
          content: `You've been making new lists with for loops like this:

\`\`\`python
# Old way: 4 lines 😐
numbers = [1, 2, 3, 4, 5]
doubled = []
for num in numbers:
    doubled.append(num * 2)
# [2, 4, 6, 8, 10]
\`\`\`

**List comprehension does it in one line!** 🚀
\`\`\`python
# Comprehension: 1 line! ⚡
doubled = [num * 2 for num in numbers]
# [2, 4, 6, 8, 10]
\`\`\`

**Formula:** \`[expression for variable in list]\`

| Old Way | Comprehension |
|---------|--------------|
| 4 lines of code | 1 line of code |
| Slower | Faster |
| Explicit | Pythonic! ✨ |`
        },
        {
          id: "comp-pred1",
          type: "predict",
          title: "What's the result?",
          content: "Think about what list the comprehension creates!",
          code: "names = ['alice', 'bob', 'charlie']\nresult = [name.upper() for name in names]\nprint(result)",
          options: ["['ALICE', 'BOB', 'CHARLIE']", "['alice', 'bob', 'charlie']", "ALICE BOB CHARLIE", "Error"],
          answer: 0,
          explanation: "Each name gets .upper() applied, creating an uppercase list!"
        },
        {
          id: "comp-fillblank",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Create a list of squares from 1 to 5 using comprehension!",
          code: "squares = [___ for ___ in range(1, ___)]",
          fillBlanks: [
            { id: 0, answer: "x**2", options: ["x**2", "x*2", "x+2", "x^2"] },
            { id: 1, answer: "x", options: ["x", "i", "num", "n"] },
            { id: 2, answer: "6", options: ["6", "5", "4", "10"] }
          ],
          explanation: "[x**2 for x in range(1, 6)] creates [1, 4, 9, 16, 25]! range(1,6) goes 1 to 5!"
        },
        {
          id: "comp-if-explain",
          type: "explain",
          title: "🔍 Conditional Comprehension!",
          content: `Add if for filtering in one line!

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get squares of even numbers only!
even_squares = [n**2 for n in numbers if n % 2 == 0]
# [4, 16, 36, 64, 100]
\`\`\`

**Formula:** \`[expression for variable in list if condition]\`

\`\`\`python
# Same as:
even_squares = []
for n in numbers:
    if n % 2 == 0:
        even_squares.append(n**2)
\`\`\`

💡 **Order**: for → if → expression (read left to right!)`
        },
        {
          id: "comp-pred2",
          type: "predict",
          title: "What words remain?",
          content: "Which words will pass the filter?",
          code: "words = ['hi', 'hello', 'hey', 'python', 'ha']\nresult = [w for w in words if len(w) > 2]\nprint(result)",
          options: ["['hello', 'hey', 'python']", "['hi', 'hello', 'hey', 'python', 'ha']", "['hi', 'ha']", "Error"],
          answer: 0,
          explanation: "Only len(w) > 2! hi(2) and ha(2) are out. hello(5), hey(3), python(6) stay!"
        },
        {
          id: "comp-quiz",
          type: "quiz",
          title: "Comprehension Master!",
          content: "What's the result of `[x for x in range(10) if x % 3 == 0]`?",
          options: [
            "[0, 3, 6, 9]",
            "[3, 6, 9]",
            "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "[1, 2, 3]"
          ],
          answer: 0,
          explanation: "Multiples of 3 from range(10)! 0%3=0✅, 3%3=0✅, 6%3=0✅, 9%3=0✅ → [0, 3, 6, 9]"
        }
      ]
    },
    {
      id: "ch6",
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
✅ **zip()** - Pairing two lists
✅ **List comprehension** - One-line list creation

Next time we'll learn about **split() and join()**! 🚀`
        }
      ]
    }
  ]
}
