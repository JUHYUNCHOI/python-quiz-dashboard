// ============================================
// Lesson 35: Built-in Functions Summary
// Part 5: Functions - Built-in (English)
// ============================================

import { LessonData } from './types'

export const lesson35EnData: LessonData = {
  id: "35",
  title: "Built-in Functions",
  emoji: "📚",
  description: "Master the essential Python built-in functions!",
  chapters: [
    // ============================================
    // Chapter 1: len(), sum()
    // ============================================
    {
      id: "ch1",
      title: "len() and sum()",
      emoji: "📏",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 Python has functions ready for you to use!",
          content: `Measuring a list's length, adding everything up, sorting — these come up *so* often that writing your own \`def\` every time would be a waste. So Python ships with **the most common functions already built in**. We call these **built-in functions**.

Think of them as a ready-made **toolbox**. When you need a hammer you don't *carve* one — you grab it from the box. Same here: need a total? Grab \`sum()\`. No reinventing the wheel. (Bonus: these tools are written in C, so they run **much faster** than functions you'd write yourself.)

Let's master the **5 most useful** ones:

1. \`len()\` — **length** 📏
2. \`sum()\` — **total** ➕
3. \`max()\`, \`min()\` — **max/min** 🔝
4. \`sorted()\` — **sort** 📊
5. \`map()\` — **transform** 🔄

> 💡 No \`import\` needed either. \`len()\`, \`sum()\` just work *anywhere, anytime* — the moment you start Python, these tools are already within reach.

@key: Built-in functions = functions **Python made for you**! Just call \`len()\`, \`sum()\` etc — no def needed.`
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "len() - Length",
          task: "Check various lengths with len()",
          initialCode: `print(len([1, 2, 3]))       # List length
print(len('Hello'))         # String length
print(len({'a': 1, 'b': 2}))  # Dictionary key count`,
          expectedOutput: "3\n5\n2",
          hint: "3 items, 5 characters, 2 keys"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "sum() - Total",
          task: "Calculate sums with sum()",
          initialCode: `print(sum([1, 2, 3, 4, 5]))   # Basic
print(sum([10, 20, 30]))      # Basic

# Starting value
print(sum([1, 2, 3], 10))     # Start from 10`,
          expectedOutput: "15\n60\n16",
          hint: "Third one: 10 + 1 + 2 + 3 = 16"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Understanding sum()",
          content: `What is the output?
\`\`\`python
print(sum([1, 2, 3, 4, 5]))
\`\`\``,
          options: [
            "12345",
            "15",
            "[1, 2, 3, 4, 5]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "sum() adds all numbers in the list. 1+2+3+4+5 = 15"
        },
        {
          id: "ch1-5",
          type: "mission",
          title: "Calculate Average",
          task: "Print the average of the list! Total ÷ count.",
          initialCode: `numbers = [80, 90, 70, 85, 95]

# 1) Find the total (which built-in?)
total = ___
# 2) Find the count (which built-in?)
count = ___
# 3) Print the average
print(f'Average: {___}')`,
          expectedOutput: "Average: 84.0",
          hint: "Total → the function that adds them up. Count → the function for length.",
          hint2: "total = sum(numbers), count = len(numbers), average = total/count"
        }
      ]
    },
    // ============================================
    // Chapter 2: max(), min()
    // ============================================
    {
      id: "ch2",
      title: "max() and min()",
      emoji: "🔝",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "💭 The biggest and smallest, in one go?",
          content: `💭 To find the **highest score** among several? You *could* compare them one by one with if statements — but that's long and error-prone.

\`max()\` and \`min()\` do it for you. Among several values (or a list), \`max()\` returns the **biggest** and \`min()\` returns the **smallest**.

\`\`\`python
max(3, 9, 5)        # 9
min(3, 9, 5)        # 3
max([10, 4, 8])     # 10   ← a list works too
\`\`\`

**When?** Highest/lowest score, priciest item, longest word — whenever you need the "extreme of a bunch."

> 💡 Much shorter and safer than comparing with if statements yourself.

@key: \`max()\` = the biggest, \`min()\` = the smallest!`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "max(), min() Basics",
          task: "Find maximum and minimum values",
          initialCode: `print(max([3, 7, 1, 9]))    # Max from list
print(min([3, 7, 1, 9]))    # Min from list

# Can also use multiple arguments
print(max(3, 7, 1, 9))      # Max of values
print(min(3, 7, 1, 9))      # Min of values`,
          expectedOutput: "9\n1\n9\n1",
          hint: "9 is largest, 1 is smallest"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Understanding max()",
          content: `What is the output?
\`\`\`python
print(max([3, 7, 1, 9, 2]))
\`\`\``,
          options: [
            "1",
            "3",
            "7",
            "9"
          ],
          answer: 3,
          explanation: "max() returns the largest value. 9 is the maximum!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "Score Analysis",
          task: "Analyze the score data! Print the highest, lowest, total, count, and average.",
          initialCode: `scores = [85, 92, 78, 95, 88]

highest = ___(scores)
lowest = ___(scores)
total = ___(scores)
count = ___(scores)
average = ___ / ___

print(f'Highest: {highest}')
print(f'Lowest: {lowest}')
print(f'Average: {average}')`,
          expectedOutput: "Highest: 95\nLowest: 78\nAverage: 87.6",
          hint: "Pick the right built-in for each blank: max, min, total, count, then the average formula.",
          hint2: "max, min, sum, len. average = total / count."
        }
      ]
    },
    // ============================================
    // Chapter 3: sorted()
    // ============================================
    {
      id: "ch3",
      title: "sorted() - Sort",
      emoji: "📊",
      steps: [
        {
          id: "ch3-1",
          type: "tryit",
          title: "Basic Sorting",
          task: "Try ascending and descending sort",
          initialCode: `numbers = [3, 1, 4, 1, 5, 9]

print(sorted(numbers))                    # Ascending
print(sorted(numbers, reverse=True))     # Descending`,
          expectedOutput: "[1, 1, 3, 4, 5, 9]\n[9, 5, 4, 3, 1, 1]",
          hint: "reverse=True for descending"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "sorted() Descending",
          content: `What is the output?
\`\`\`python
print(sorted([3, 1, 4, 1, 5], reverse=True))
\`\`\``,
          options: [
            "[1, 1, 3, 4, 5]",
            "[5, 4, 3, 1, 1]",
            "[1, 1, 4, 3, 5]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "reverse=True is descending! 5, 4, 3, 1, 1 order."
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "💭 Sort by length instead of alphabet?",
          content: `💭 Plain \`sorted()\` on words = **alphabetical**. How do I sort by **length** instead?

This is where \`key=\` comes in. \`key\` tells \`sorted()\`: *"Don't compare the values directly — run each one through THIS function first, and compare by that result."* It's like secretly attaching a **tag (a score)** to each value before deciding the order.

\`\`\`python
words = ['apple', 'pie', 'banana']

# Sort by length!
print(sorted(words, key=len))
# ['pie', 'apple', 'banana']
\`\`\`

**Let's see it step by step.** With \`key=len\`, \`sorted()\` compares not the words themselves but *the result of \`len()\` on each word*.

| word | \`len(word)\` ← comparison tag |
|------|------|
| 'apple' | 5 |
| 'pie' | 3 |
| 'banana' | 6 |

Line them up by the tag numbers 3, 5, 6 → \`pie\`, \`apple\`, \`banana\`. The alphabet is ignored — only **length** matters.

> 💡 Pass just the function *name* to \`key\` — \`key=len\` (\`key=len()\` ❌, no parentheses!). You only tell it *which ruler to measure with*; \`sorted()\` does the actual measuring. In the next step you'll use \`key=lambda x: x[1]\` to build your own rule, like *"compare by the tuple's second value."*

@key: \`key=function\` lets you pick the **sort criteria**! \`key=len\` = by length.`
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "Sort Tuple List",
          task: "Sort by score",
          initialCode: `students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score (second element)
print(sorted(students, key=lambda x: x[1]))`,
          expectedOutput: "[('Mike', 78), ('Tom', 85), ('Jane', 92)]",
          hint: "x[1] is score! 78, 85, 92 order"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Find Top Student",
          task: "Print the name of the student with the highest score",
          initialCode: `students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score descending (fill in key and reverse!)
result = sorted(students, key=___, reverse=___)

# Print the top student's name
print(___)`,
          expectedOutput: "Jane",
          hint: "key = a lambda that grabs the score (second element). Top = result[0]; the name is the first item of that.",
          hint2: "key=lambda x: x[1], reverse=True. print(result[0][0])"
        }
      ]
    },
    // ============================================
    // Chapter 4: map()
    // ============================================
    {
      id: "ch4",
      title: "map() - Transform",
      emoji: "🔄",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 Can I transform every list item at once?",
          content: `💭 To change \`['1', '2', '3']\` into a list of integers, do you loop with \`for\`, call \`int()\` on each, and \`append()\` to a new list? It works — but it's tedious!

That's exactly what \`map()\` solves in one line: *"apply the same function to every value in the list."* Picture a **factory conveyor belt** 🏭 — the strings \`'1'\`, \`'2'\`, \`'3'\` ride in single file, pass through the \`int\` machine once, and come out the other side as the numbers \`1\`, \`2\`, \`3\`. You never touch them one by one; each item gets the **same processing** automatically.

\`\`\`
['1', '2', '3']  ── map(int, ...) ──→  [1, 2, 3]
   strings           transform all!     integers
\`\`\`

**Basic usage:**
\`\`\`python
# Convert string numbers to integers
strings = ['1', '2', '3']
numbers = list(map(int, strings))
print(numbers)  # [1, 2, 3]
\`\`\`

Notice the \`int\` handed to \`map\` has *no parentheses* (\`int()\` ❌). You're handing over the *machine itself* to bolt onto the belt — you're not running it once yourself.

> 💡 \`map()\` doesn't hand you a list right away — it returns a **map object** (the conveyor belt itself). To *collect the results into a list*, wrap it in \`list()\`.
> \`\`\`python
> map(int, ['1', '2'])         # <map object ...>  ← still a belt
> list(map(int, ['1', '2']))   # [1, 2]            ← collected into a list!
> \`\`\`
> Forget \`list()\` and \`print(map(...))\` shows something like \`<map object>\` — a classic gotcha. Don't forget!

@key: \`map(function, list)\` = apply the function to **every** item! Don't forget \`list()\` wrap.`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "map() Basics",
          task: "Convert strings to integers",
          initialCode: `strings = ['1', '2', '3']
numbers = list(map(int, strings))
print(numbers)`,
          expectedOutput: "[1, 2, 3]",
          hint: "map(int, ...) converts each to int"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Understanding map()",
          content: `What is the output?
\`\`\`python
nums = ['3', '1', '4']
result = list(map(int, nums))
print(sum(result))
\`\`\``,
          options: [
            "'314'",
            "8",
            "[3, 1, 4]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "['3','1','4'] → [3,1,4] → sum = 3+1+4 = 8"
        },
        {
          id: "ch4-4",
          type: "explain",
          title: "💭 How do I read multiple numbers on one line?",
          content: `💭 If a user types \`10 20 30\` on **one line**, how do you read them all as integers?

This is where \`map\` really shines. What \`input()\` gives you is one big blob of text — you can't do math on it. So you **chain three tools like a conveyor line**: split it up (\`split\`), transform them all (\`map\`), receive them in one line.

\`\`\`python
# Multiple numbers on one line (into variables)
a, b, c = map(int, input().split())

# Or as a list
numbers = list(map(int, input().split()))
\`\`\`

**Follow it step by step (input: \`10 20 30\`):**
1. \`input()\` → \`"10 20 30"\` — **one blob of text**, spaces included
2. \`.split()\` → \`['10', '20', '30']\` — a **list of strings**, split on spaces
3. \`map(int, ...)\` → runs each string through the \`int\` conveyor → \`10, 20, 30\` (real numbers!)

Now you can unpack them into \`a, b, c\`, or wrap in \`list()\` to grab them all as a list.

> 💡 This pattern appears on **almost every exam.** Memorize \`map(int, input().split())\` as one unit and input handling will rarely trip you up.

@key: \`map(int, input().split())\` — the magic one-liner for multiple-number input!`
        },
        {
          id: "ch4-5",
          type: "mission",
          title: "Convert and Sum",
          task: "Convert a list of string-scores into integers, then print the total!",
          initialCode: `string_nums = ['10', '20', '30', '40']

# 1. Convert every item to int (as a list!)
numbers = list(___(___, string_nums))

# 2. Print the total
print(___(numbers))`,
          expectedOutput: "100",
          hint: "Transformer = applies a function to every item. Totaler = adds them up.",
          hint2: "list(map(int, string_nums)), then sum(numbers)"
        }
      ]
    },
    // ============================================
    // Chapter 5: Other Useful Functions
    // ============================================
    {
      id: "ch5",
      title: "Other Useful Functions",
      emoji: "🧰",
      steps: [
        {
          id: "ch5-0",
          type: "explain",
          title: "💭 Small tools worth keeping in your kit",
          content: `💭 Besides what you've learned, a few more small built-ins are handy to keep around. This chapter zips through five of them.

- \`abs(x)\` — **absolute value** (drop the sign). \`abs(-5)\` → \`5\`. Great for measuring the *difference (distance)* between two values.
- \`round(x, n)\` — **rounding**. \`round(3.14159, 2)\` → \`3.14\`. (Unlike \`int()\`'s *chopping* from lesson 9, this goes to the **nearest** value!)
- \`filter(condition, items)\` — keeps **only the items that pass** the condition. If \`map()\` was "change them all," \`filter()\` is "pick out some."
- \`enumerate(items)\` — gives you the **index (number)** along with each value. For when you need "which position" (you met it in lesson 17).
- \`zip(listA, listB)\` — **pairs up** two lists like a zipper. For viewing names and scores side by side.

Run each one below and it'll click fast. 👇

> 💡 Don't memorize them whole — just remember "these tools exist" and look them up when needed.

@key: \`abs\`/\`round\`/\`filter\`/\`enumerate\`/\`zip\` — handy little tools you'll keep meeting!`
        },
        {
          id: "ch5-1",
          type: "tryit",
          title: "abs(), round()",
          task: "Try absolute value and rounding",
          initialCode: `# abs() - Absolute value
print(abs(-5))
print(abs(5))

# round() - Rounding
print(round(3.7))
print(round(3.14159, 2))  # 2 decimal places`,
          expectedOutput: "5\n5\n4\n3.14",
          hint: "abs() for absolute value, round() for rounding"
        },
        {
          id: "ch5-2",
          type: "tryit",
          title: "filter() - Filter",
          task: "Keep only elements that match condition",
          initialCode: `numbers = [1, -2, 3, -4, 5]

# Keep only positive numbers
positives = list(filter(lambda x: x > 0, numbers))
print(positives)`,
          expectedOutput: "[1, 3, 5]",
          hint: "Only x > 0 ones remain"
        },
        {
          id: "ch5-3",
          type: "quiz",
          title: "Understanding filter()",
          content: `What is the output?
\`\`\`python
numbers = [1, -2, 3, -4, 5]
result = list(filter(lambda x: x > 0, numbers))
print(sum(result))
\`\`\``,
          options: [
            "3",
            "9",
            "-2",
            "15"
          ],
          answer: 1,
          explanation: "Filter positives: [1, 3, 5] → 1+3+5 = 9"
        },
        {
          id: "ch5-4",
          type: "tryit",
          title: "enumerate() - Index and Value",
          task: "Print index with value",
          initialCode: `fruits = ['apple', 'banana', 'cherry']

for i, f in enumerate(fruits):
    print(f'{i}: {f}')`,
          expectedOutput: "0: apple\n1: banana\n2: cherry",
          hint: "enumerate() gives both index and value"
        },
        {
          id: "ch5-5",
          type: "tryit",
          title: "zip() - Combine",
          task: "Combine two lists into one",
          initialCode: `names = ['Tom', 'Jane']
scores = [85, 92]

result = list(zip(names, scores))
print(result)`,
          expectedOutput: "[('Tom', 85), ('Jane', 92)]",
          hint: "zip() combines lists into tuples"
        }
      ]
    }
  ]
}
