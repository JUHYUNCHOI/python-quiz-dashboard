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
          title: "🔄 List + for = open one box at a time",
          content: `Take out each box from the list **one by one** — like opening lockers in order.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for fruit in fruits:        # for (each) var in (list) :
    print(fruit)
# apple
# banana
# strawberry
\`\`\`

Pattern: **for var in list:** — each box's value flows into \`fruit\` in turn.`
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
          content: `More useful than just looking at each box is taking them out one by one while **stacking up numbers**. It's like dropping items into a shopping cart and watching the receipt total grow *as you go*. 🧾

The key: **put a bucket (\`total\`) outside the loop**, and every time the for loop goes around, add into that bucket.

\`\`\`python
prices = [1000, 2000, 3000]
total = 0                      # ① make an empty bucket first

for price in prices:
    total = total + price      # ② add to the bucket each time you pull one out

print("Total:", total)  # 6000
\`\`\`

> 💡 Trace the bucket one round at a time:
> - start: \`total = 0\`
> - \`price = 1000\` → \`total = 0 + 1000 = 1000\`
> - \`price = 2000\` → \`total = 1000 + 2000 = 3000\`
> - \`price = 3000\` → \`total = 3000 + 3000 = 6000\`
>
> \`total\` is **not created fresh inside the for loop** — it's the bucket made *outside* that keeps carrying over. That's why \`total = 0\` must go before the loop. (Put it inside and it resets to 0 every round, leaving only the last value!)

**If you just need the sum, even shorter:**
\`\`\`python
total = sum(prices)  # 6000
\`\`\`

\`sum()\` is a *sum-only* shortcut. But for things like *counting only items that match a condition* or *tracking a maximum*, you have to roll your own bucket like above — so make this "stack into a bucket" pattern second nature.`
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
          title: "🔢 enumerate (with numbers) — when position matters",
          content: `A plain for gives only the value — *"Alice, Bob, Charlie"*. But sometimes you also need to know **which position** it is. Like printing *"Student #3: Alice"* with a number attached, or assigning ranks.

**You could count the number yourself:**
\`\`\`python
i = 0                    # keep a separate counter bucket
for fruit in fruits:
    print(f"#{i}: {fruit}")
    i = i + 1            # you must bump it by 1 every time — easy to forget!
\`\`\`

When you hand-manage \`i = i + 1\`, *missing even one line* leaves the number stuck or scrambled. **enumerate** is the helper that *does this numbering for you*. (True to its name — enumerate = "to number".)

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for i, fruit in enumerate(fruits):    # i = number, fruit = value (both automatic!)
    print(f"#{i}: {fruit}")
# #0: apple
# #1: banana
# #2: strawberry
\`\`\`

Each round, \`enumerate(list)\` hands you **(index, value)** as one pair. That's why you catch it with two variables, \`i, fruit\`, at once.

> 💡 The number starts at \`0\` (same as list indexes!). To show human-style "1, 2, …" just print \`i + 1\` — a common touch-up when assigning 1st/2nd place.`
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
          content: `Besides \`enumerate\`, there's another way to loop by **position number (index)** — \`range(len(list))\`.

If \`len(fruits)\` is \`3\`, then \`range(3)\` → \`0, 1, 2\`. So you **make the slot numbers yourself**, then grab that slot's box with \`fruits[i]\`.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")   # pick the box at slot i directly
\`\`\`

But if you *just want to read the values*, \`for fruit in fruits:\` is way cleaner. **So when is this style worth it?** — when you need to **change the list's contents in place**.

\`\`\`python
numbers = [1, 2, 3]
for i in range(len(numbers)):
    numbers[i] = numbers[i] * 2    # *overwrite* the value at slot i
print(numbers)  # [2, 4, 6]
\`\`\`

> ⚠️ In \`for num in numbers:\`, \`num\` is a **copy** of the box's value, so \`num = num * 2\` won't change the original list. To fix the original you need \`i\` — *which slot* — so you can overwrite that cell with \`numbers[i] = ...\`. That's why **modifying values needs index access**.`
        },
        {
          id: "pre-for-pattern",
          type: "quiz",
          title: "❓ Decide — How to modify list values?",
          content: "**If you need to *modify* the list's values, which pattern?**",
          options: ["for x in lst (value only)", "for i, x in enumerate(lst)", "for i in range(len(lst))"],
          answer: 2,
          explanation: "Receiving just the value gives you a *copy* — can't modify the list. You need the *position (index)*, so `range(len(lst))` or `enumerate` (both work)."
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
        },
        {
          id: "ch2-sorted",
          type: "explain",
          title: "📊 Sorting — sorted()",
          content: `Use \`sorted()\` to sort a list.

\`\`\`python
nums = [5, 2, 8, 1, 9, 3]
print(sorted(nums))  # [1, 2, 3, 5, 8, 9]  ← ascending

print(sorted(nums, reverse=True))  # [9, 8, 5, 3, 2, 1]  ← descending
\`\`\`

💡 \`sorted()\` **returns a new list**. The original is unchanged.

\`\`\`python
words = ["banana", "apple", "cherry"]
print(sorted(words))  # ['apple', 'banana', 'cherry']  ← alphabetical
print(words)          # ['banana', 'apple', 'cherry']  ← unchanged
\`\`\`

💡 **Advanced sorting** (sorting by a specific key — e.g., sorting a dict by value) is covered in lesson 35 (Built-in Functions).`
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
          content: `You still loop over the whole list, but this time you **don't handle every item** — you *pick out only the ones you want*. Like pulling only the white clothes from a laundry basket. 🧺

The trick is surprisingly simple — **take each one out with for**, then inside, **ask "does this match?" with if**. If yes, handle it (here, print); if no, just skip past.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:        # ① pull out one at a time
    if num % 2 == 0:       # ② ask "is it even?"
        print(num)         # ③ print only when it matches (odd numbers just pass by)
# 2, 4, 6, 8, 10
\`\`\`

> 💡 \`num % 2\` is the **remainder** when dividing by 2. Even numbers have remainder \`0\`, odd ones have \`1\`. So \`num % 2 == 0\` is asking "is it even?"
>
> Just change the if condition and you can **pick out anything** — \`if score >= 80\` keeps only 80-and-up, \`if "Kim" in name\` keeps only the Kims. The for (go through all) + if (check a condition) combo is the most basic tool for "keep only what matches."`
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
          title: "🤝 zip (like a zipper) — pair two lists",
          content: `**zip = zip them together**. Two lists get paired by position so you can take both at once.

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score} pts")
# Alice: 85 pts
# Bob: 92 pts
# Charlie: 78 pts
\`\`\`

🎒 Picture: a name list and a score list closed together by a **zipper**.

> 💡 \`range(len())\` works too, but \`zip\` is much cleaner.`
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
          title: "⚡ List comprehension — build a list in one line",
          content: `You saw a peek of this in L16. Let's go deeper.

\`\`\`python
# Old way: 4 lines
numbers = [1, 2, 3, 4, 5]
doubled = []
for num in numbers:
    doubled.append(num * 2)
# [2, 4, 6, 8, 10]

# Comprehension: 1 line!
doubled = [num * 2 for num in numbers]
\`\`\`

**Formula:** \`[expression for variable in list]\`

> 💡 Read it as "for each num in numbers, collect num * 2" — it flows naturally.`
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
          id: "pre-mission2-loop",
          type: "quiz",
          title: "❓ Decide — How to loop the student list?",
          content: "**You're *looping through* a student list and printing a grade for each — which pattern?**",
          options: ["for-each (value only)", "enumerate (value + index)", "range(len) (index directly)"],
          answer: 0,
          explanation: "If you only need the value, `for name in names:` is cleanest! Use enumerate when you also need the position number."
        },
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
