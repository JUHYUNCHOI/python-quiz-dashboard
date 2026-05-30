// ============================================
// Lesson 16: List Basics
// ============================================
import { LessonData } from './types'

export const lesson16EnData: LessonData = {
  id: "16",
  title: "List Basics",
  emoji: "📋",
  description: "Lists let you store multiple data items at once!",
  chapters: [
    {
      id: "ch1",
      title: "Creating Lists",
      emoji: "📝",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📋 What is a list? — A row of boxes",
          content: `**list** = several values stored in **a row, in order**.

🎒 Picture: school lockers numbered 1, 2, 3... each holding one thing.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
numbers = [1, 2, 3, 4, 5]
\`\`\`

- **Square brackets \`[ ]\`** mark the start and end
- **Commas \`,\`** separate the boxes
- Numbers, words, mixed — all OK

### Where you'll see lists

- Class rosters, score logs — ordered
- Shopping carts, game inventory — add / remove
- \`input().split()\` results

> 🎯 The **most-used** data structure. Learn it once — use it forever.`
        },
        {
          id: "viz-builder",
          type: "interactive",
          title: "🎬 Watch: how a list is built",
          component: "pyListBuilder",
          description: "Watch a list get built step by step. Click each button to advance!"
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 3 ways to create a list",
          content: `\`\`\`python
# 1) Square brackets — most common
fruits = ["apple", "banana"]
empty = []

# 2) [0] * n — filled with the same value
zeros = [0] * 5              # [0, 0, 0, 0, 0]

# 3) list(range(...)) — number lineup
nums = list(range(1, 6))     # [1, 2, 3, 4, 5]
\`\`\`

> 💡 \`[0] * n\` initializes a score board (5 zeros for 5 students). \`list(range(...))\` builds number rosters like 1~100.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Create a fruit list and print it!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'strawberry']",
          hint: "Put the values inside square brackets!",
          hint2: "[\"apple\", \"banana\", \"strawberry\"]"
        },
        {
          id: "index-explain",
          type: "explain",
          title: "🔢 Accessing by Index",
          content: `You can access each element by its **index (position)**!

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]

print(fruits[0])  # apple (first)
print(fruits[1])  # banana (second)
print(fruits[2])  # strawberry (third)
\`\`\`

⚠️ Indexes start from **0**!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Access by Index!",
          task: "Print the second fruit!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nprint(fruits[1])",
          expectedOutput: "banana",
          hint: "The second item is index 1!",
          hint2: "fruits[1]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [10, 20, 30][2]?",
          options: ["10", "20", "30", "Error"],
          answer: 2,
          explanation: "Index 2 is the third element! It's 30."
        }
      ]
    },
    {
      id: "ch2",
      title: "Modifying Lists",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ Changing Values",
          content: `You can change values by accessing them with an index:

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
fruits[1] = "grape"  # banana → grape
print(fruits)  # ['apple', 'grape', 'strawberry']
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Change a Value!",
          task: "Change the first value to 'orange'!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nfruits[0] = \"orange\"\nprint(fruits)",
          expectedOutput: "['orange', 'banana', 'strawberry']",
          hint: "Index 0 is the first item!",
          hint2: "fruits[0] = \"orange\""
        },
        {
          id: "add-explain",
          type: "explain",
          title: "➕ Adding/Removing Elements",
          content: `**append()** - add to the end
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("strawberry")
print(fruits)  # ['apple', 'banana', 'strawberry']
\`\`\`

**remove()** - delete by value
\`\`\`python
fruits.remove("banana")
print(fruits)  # ['apple', 'strawberry']
\`\`\`

**pop()** - delete by index (default: last)
\`\`\`python
fruits.pop()   # remove last
fruits.pop(0)  # remove first
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Add an Element!",
          task: "Add 'grape' to the list!",
          initialCode: "fruits = [\"apple\", \"banana\"]\nfruits.append(\"grape\")\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'grape']",
          hint: "Use append() to add!",
          hint2: "fruits.append(\"grape\")"
        },
        {
          id: "insert-explain",
          type: "explain",
          title: "📍 insert — slot into the middle of the row",
          content: `\`append\` only adds **at the end**. To slot into the middle, use **\`insert(position, value)\`**.

\`\`\`python
fruits = ["apple", "strawberry", "grape"]

# Slot 'banana' at position 1 (later boxes shift right)
fruits.insert(1, "banana")
print(fruits)
# ['apple', 'banana', 'strawberry', 'grape']
\`\`\`

### pop (take out) vs remove (erase)

\`\`\`python
nums = [10, 20, 30]

last = nums.pop()        # take the last → last = 30
nums.remove(10)          # erase the value 10
print(nums)              # [20]
\`\`\`

> 🎯 **append=back, insert=anywhere, pop=take out, remove=erase by value.**`
        },
        {
          id: "try-insert",
          type: "tryit",
          title: "🖥️ Try It — insert / pop",
          task: "Insert 'orange' at the front and pop the last element!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\n\n# Insert 'orange' at front\nfruits.___(0, \"orange\")\n\n# Pop the last (capture the value)\nlast = fruits.___()\n\nprint(f\"list: {fruits}\")\nprint(f\"popped: {last}\")",
          expectedOutput: "list: ['orange', 'apple', 'banana']\npopped: strawberry",
          hint: "fruits.insert(0, \"orange\") / last = fruits.pop()",
          hint2: "fruits.insert(0, \"orange\")\nlast = fruits.pop()"
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "🔗 Combining lists — + and extend",
          content: `Two ways to combine lists.

\`\`\`python
a = [1, 2, 3]
b = [4, 5, 6]

# Way 1) + — creates a new list
merged = a + b
print(merged)  # [1, 2, 3, 4, 5, 6]
print(a)       # [1, 2, 3] — original unchanged!

# Way 2) extend — modifies a in place
a.extend(b)
print(a)       # [1, 2, 3, 4, 5, 6] — a itself changes
\`\`\`

### append vs extend trap

\`\`\`python
a = [1, 2, 3]
b = [4, 5, 6]

a.append(b)    # whole b as one element
print(a)       # [1, 2, 3, [4, 5, 6]]   ← nested!

a = [1, 2, 3]
a.extend(b)    # b's elements unwrapped
print(a)       # [1, 2, 3, 4, 5, 6]     ← flat
\`\`\`

> 🎯 One-liner: **append = whole as one, extend = unwrap into many.**`
        },
        {
          id: "try-concat",
          type: "tryit",
          title: "🖥️ Try It — Combine lists",
          task: "Combine two class rosters with + into a full roster!",
          initialCode: "class_a = [\"Alice\", \"Bob\", \"Charlie\"]\nclass_b = [\"Dora\", \"Eve\"]\n\n# + makes a new list (originals unchanged)\nall_students = ___\n\nprint(f\"all: {all_students}\")\nprint(f\"count: {len(all_students)}\")\nprint(f\"class_a unchanged: {class_a}\")",
          expectedOutput: "all: ['Alice', 'Bob', 'Charlie', 'Dora', 'Eve']\ncount: 5\nclass_a unchanged: ['Alice', 'Bob', 'Charlie']",
          hint: "all_students = class_a + class_b",
          hint2: "all_students = class_a + class_b"
        }
      ]
    },
    {
      id: "ch3",
      title: "List Features",
      emoji: "🔧",
      steps: [
        {
          id: "len-explain",
          type: "explain",
          title: "📏 Length and Searching",
          content: `**len()** - get the length
\`\`\`python
fruits = ["apple", "banana", "strawberry"]
print(len(fruits))  # 3
\`\`\`

**in** - check membership
\`\`\`python
print("apple" in fruits)  # True
print("grape" in fruits)  # False
\`\`\`

**index()** - find position
\`\`\`python
print(fruits.index("banana"))  # 1
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Get the Length!",
          task: "Print the length of the list!",
          initialCode: "numbers = [10, 20, 30, 40, 50]\nprint(f\"Count: {len(numbers)} items\")",
          expectedOutput: "Count: 5 items",
          hint: "Use len() for the length!",
          hint2: "len(numbers)"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ Negative Indexing",
          content: `You can also count from the end!

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]
#          [-3]      [-2]       [-1]

print(fruits[-1])  # strawberry (last)
print(fruits[-2])  # banana (second from last)
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [1, 2, 3, 4, 5][-1]?",
          options: ["1", "5", "-1", "Error"],
          answer: 1,
          explanation: "[-1] is the last element! It's 5."
        },
        {
          id: "sort-explain",
          type: "explain",
          title: "🔢 sort — line them up in order",
          content: `**sort()** — sorts the list **itself** (original changes!)
**sorted()** — returns a **new sorted list** (original unchanged)

\`\`\`python
nums = [3, 1, 4, 1, 5]

nums.sort()
print(nums)         # [1, 1, 3, 4, 5]

# Descending (biggest first)
nums.sort(reverse=True)
print(nums)         # [5, 4, 3, 1, 1]

# sorted() — doesn't touch original
original = [3, 1, 4]
new_list = sorted(original)
print(new_list)     # [1, 3, 4]
print(original)     # [3, 1, 4] — unchanged!
\`\`\`

> 🎯 **sort = in-place, sorted = new list.** The biggest distinction.`
        },
        {
          id: "try-sort",
          type: "tryit",
          title: "🖥️ Try It — sort and sorted",
          task: "Print original and descending-sorted scores in two lines.",
          initialCode: "scores = [85, 92, 78, 95, 67, 88]\n\n# 1) sorted() makes a new sorted list\ntop_scores = ___(scores, reverse=True)\n\nprint(f\"original: {scores}\")\nprint(f\"descending: {top_scores}\")",
          expectedOutput: "original: [85, 92, 78, 95, 67, 88]\ndescending: [95, 92, 88, 85, 78, 67]",
          hint: "sorted(scores, reverse=True) — original untouched.",
          hint2: "top_scores = sorted(scores, reverse=True)"
        },
        {
          id: "count-method",
          type: "explain",
          title: "🔢 count — How many of this value?",
          content: `**count(value)** — how many times this value appears.

\`\`\`python
votes = ["A", "B", "A", "C", "A", "B"]

print(votes.count("A"))   # 3
print(votes.count("B"))   # 2
print(votes.count("D"))   # 0 — 0 if absent
\`\`\`

### Find the most-voted

\`\`\`python
votes = ["A", "B", "A", "C", "A", "B"]
unique = set(votes)   # candidates

# For each candidate, count and pick max
winner = max(unique, key=votes.count)
print(winner)   # 'A'
\`\`\`

> 💡 For larger data, use \`collections.Counter\` (covered in dict lesson).`
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ List comprehension — one-line magic",
          content: `Build a list in **one line** instead of a for loop.

\`\`\`python
# 4-line version
squares = []
for n in range(1, 6):
    squares.append(n * n)
# [1, 4, 9, 16, 25]

# One-line version (same result!)
squares = [n * n for n in range(1, 6)]
\`\`\`

### Filter with if

\`\`\`python
nums = [1, 2, 3, 4, 5, 6]

# Evens only
even = [n for n in nums if n % 2 == 0]
# [2, 4, 6]
\`\`\`

> 🎯 If hard at first, plain for loops are fine. It comes up again in L17.`
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ Try It — Comprehension",
          task: "From 1-10, take only evens and square them!",
          initialCode: "# Evens in 1-10, squared\n# (10 included, range(1, 11))\nresult = ___\n\nprint(result)",
          expectedOutput: "[4, 16, 36, 64, 100]",
          hint: "[n * n for n in range(1, 11) if n % 2 == 0]",
          hint2: "result = [n * n for n in range(1, 11) if n % 2 == 0]"
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
          title: "🏆 Mission 1 — Shopping cart system",
          task: "Build a shopping cart system!",
          initialCode: "cart = []\n\n# Add items\ncart.___(\"apple\")\ncart.___(\"milk\")\ncart.___(\"bread\")\n\nprint(\"Cart:\", cart)\nprint(f\"Total: {___(cart)} items\")\n\n# Remove milk\ncart.___(\"milk\")\nprint(\"After removing milk:\", cart)",
          expectedOutput: "Cart: ['apple', 'milk', 'bread']\nTotal: 3 items\nAfter removing milk: ['apple', 'bread']",
          hint: "Use append() to add, remove() to delete!",
          hint2: "Use len() to count the items!"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Score statistics in one shot",
          task: "From a score list, print **max/min/average/top 3 sorted descending** all at once.",
          initialCode: "scores = [85, 92, 78, 95, 67, 88, 73, 90, 81, 76]\n\nprint(f\"count: {len(scores)}\")\nprint(f\"max: {___(scores)}\")\nprint(f\"min: {___(scores)}\")\nprint(f\"avg: {___(scores) / len(scores):.1f}\")\n\n# Top 3 (sort desc, take first 3)\ntop3 = sorted(scores, reverse=True)[:___]\nprint(f\"top 3: {top3}\")",
          expectedOutput: "count: 10\nmax: 95\nmin: 67\navg: 82.5\ntop 3: [95, 92, 90]",
          hint: "max, min, sum builtins. [:3] for first 3.",
          hint2: "max(scores), min(scores), sum(scores), [:3]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Even numbers only from input",
          task: "Read space-separated integers and print **only the evens, sorted**!",
          initialCode: "nums = list(map(int, input().split()))\n\n# Comprehension to filter evens, then sort\nevens = sorted([n for n in nums if n % ___ == 0])\n\nprint(evens)",
          expectedOutput: "[2, 4, 6, 8]",
          stdin: "5 2 8 3 6 1 4 7",
          hint: "n % 2 == 0 means even.",
          hint2: "evens = sorted([n for n in nums if n % 2 == 0])"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **Lists \`[ ]\`** — ordered storage, the most-used data structure
✅ **Creation forms** — \`[...]\`, \`list()\`, \`[0]*n\`, \`list(range(...))\`
✅ **Indexing** — starts at \`[0]\`, negatives \`[-1]\` work too
✅ **Modify** — \`a[i] = v\`
✅ **Add** — \`append\` (back), \`insert(i, v)\` (anywhere)
✅ **Remove** — \`remove(value)\`, \`pop(index)\`, \`pop()\` (last)
✅ **Combine** — \`+\` (new list), \`extend\` (in-place)
✅ **append vs extend trap** — whole as one vs unwrapped
✅ **Sort** — \`sort()\` (in-place) / \`sorted()\` (new), \`reverse=True\` for descending
✅ **Inspect** — \`len\`, \`in\`, \`index\`, \`count\`
✅ **Comprehension** — \`[n*n for n in range(1, 6) if ...]\`

Next time we'll learn about **lists and loops — for loops over lists**! 🚀`
        }
      ]
    }
  ]
}
