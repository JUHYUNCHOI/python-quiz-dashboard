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
          title: "📋 What is a List?",
          content: `**List** = a data structure that stores multiple values in order

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

- Use **square brackets [ ]**
- Separate items with **commas (,)**
- You can mix **different types** together!

### Where do you use lists?

- Student rosters, score logs — **ordered** lineup
- Shopping carts, comments — **frequent add/remove**
- Game inventory — items in / out
- Multi-value input — \`input().split()\` results
- The most basic unit of data processing

> 🎯 Among the 4 data structures, **list is the most-used**. Learn it well — you'll use it forever.`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ Many ways to create a list",
          content: `\`\`\`python
# 1) Square brackets — most common
fruits = ["apple", "banana"]
empty = []

# 2) list() function — convert from another iterable
chars = list("hello")        # ['h', 'e', 'l', 'l', 'o']
nums  = list(range(5))       # [0, 1, 2, 3, 4]
empty = list()               # []

# 3) Same value repeated — *
zeros = [0] * 5              # [0, 0, 0, 0, 0]
hello = ["hi"] * 3           # ['hi', 'hi', 'hi']

# 4) List comprehension (covered later)
squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]
\`\`\`

### With range — common patterns

\`\`\`python
# 0 to 9
list(range(10))         # [0, 1, ..., 9]

# 1 to 10
list(range(1, 11))      # [1, 2, ..., 10]

# Even numbers (2-20)
list(range(2, 21, 2))   # [2, 4, 6, ..., 20]
\`\`\`

> 💡 **\`[0] * n\`** is great for initializing score boards / counters. **\`list(range(...))\`** is common in coding tests.`
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
          title: "📍 insert — Slot in at a specific position",
          content: `\`append\` adds at the end. **insert(index, value)** lets you slot in anywhere.

\`\`\`python
fruits = ["apple", "strawberry", "grape"]

# Insert 'banana' at index 1 (everything else shifts right)
fruits.insert(1, "banana")
print(fruits)
# ['apple', 'banana', 'strawberry', 'grape']

# Add to the front (index 0)
fruits.insert(0, "orange")
print(fruits)
# ['orange', 'apple', 'banana', 'strawberry', 'grape']
\`\`\`

### remove vs pop revisited

\`\`\`python
nums = [10, 20, 30, 20, 40]

# remove(value) — deletes first occurrence by value
nums.remove(20)
print(nums)   # [10, 30, 20, 40] ← only first 20

# pop(index) — deletes by position + returns value
val = nums.pop(0)
print(val, nums)   # 10 [30, 20, 40]

# pop() — last item (no index)
last = nums.pop()
print(last, nums)  # 40 [30, 20]
\`\`\`

> 🎯 One-liner: **append=back, insert=anywhere, remove=by value, pop=by position + take it.**`
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
          title: "🔢 Sort and reverse — sort / sorted / reverse",
          content: `**sort()** — sorts the list itself (in-place)
**sorted()** — returns a **new sorted list** (original unchanged)
**reverse()** — reverses the order

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# sort() — in place
nums.sort()
print(nums)    # [1, 1, 2, 3, 4, 5, 6, 9]

# Descending
nums.sort(reverse=True)
print(nums)    # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() — original preserved
original = [3, 1, 4]
new_list = sorted(original)
print(new_list)   # [1, 3, 4]
print(original)   # [3, 1, 4] — unchanged!

# reverse() — just flips order, no sort
fruits = ["apple", "pear", "kiwi"]
fruits.reverse()
print(fruits)  # ['kiwi', 'pear', 'apple']
\`\`\`

### key function — sort by length / custom

\`\`\`python
words = ["apple", "kiwi", "banana"]

words.sort(key=len)        # by length
print(words)               # ['kiwi', 'apple', 'banana']
\`\`\`

> 🎯 **In-place vs new list** — biggest sort vs sorted distinction.`
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
          title: "✨ List comprehension — one-liner",
          content: `Build lists in **one line** instead of for loops.

\`\`\`python
# Old way — 4 lines
squares = []
for n in range(1, 6):
    squares.append(n * n)
# [1, 4, 9, 16, 25]

# Comprehension — 1 line
squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]
\`\`\`

### With condition (if filter)

\`\`\`python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Only evens
even = [n for n in nums if n % 2 == 0]
# [2, 4, 6, 8, 10]

# Squares of evens
even_sq = [n*n for n in nums if n % 2 == 0]
# [4, 16, 36, 64, 100]
\`\`\`

### Student scores → passing list

\`\`\`python
scores = [("Alice", 85), ("Bob", 55), ("Charlie", 70)]
passed = [name for name, s in scores if s >= 60]
# ['Alice', 'Charlie']
\`\`\`

> 🎯 Powerful once you're used to it. If hard at first, regular for loops are fine — comprehension comes naturally over time.`
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
