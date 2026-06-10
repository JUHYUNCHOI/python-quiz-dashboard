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
          content: `When you want just **one box** instead of the whole list, you point to it by its **index (which box number it is)**.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]

print(fruits[0])  # apple (first)
print(fruits[1])  # banana (second)
print(fruits[2])  # strawberry (third)
\`\`\`

🎒 Like school lockers, **each box has a number tag**. But Python's tags start at **0, not 1**. The first box is \`[0]\`, the next is \`[1]\` — that's why the "second" item is \`[1]\`. (Everyone is off by one at first. You'll get used to it!)

> ⚠️ **Asking for a number that doesn't exist is an error!** With 3 boxes, the numbers go \`0, 1, 2\`. There is no \`[3]\`.
> \`\`\`python
> fruits = ["apple", "banana", "strawberry"]   # 3 boxes → [0], [1], [2]
> print(fruits[3])   # ❌ IndexError: list index out of range
> \`\`\`
> With 3 boxes the last one is \`[2]\` — remember the last number is *"count - 1"*.`
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
          content: `Point to a box with its index, then use \`=\` to **swap out just that box's contents**.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
fruits[1] = "grape"  # box 1's banana → grape
print(fruits)  # ['apple', 'grape', 'strawberry']
\`\`\`

🎒 Picture a locker. The locker itself (the list) stays put — you just **took the item out of slot 1 and put a different one in**. The slot number is the same, only the contents changed.

> 💡 **Lists can be changed (that's what makes them handy).** Remember how the **string from lesson 5 could NOT be changed**?
> \`\`\`python
> name = "Min"
> name[0] = "J"   # ❌ TypeError! you can't change even one letter of a string
>
> fruits = ["apple", "banana"]
> fruits[0] = "grape"   # ⭕ a list is fine!
> \`\`\`
> A string is the "set once, can't edit" kind — to change it you had to build a new one. A list lets you **swap out the contents of a box anytime**, which is perfect for *constantly changing* data like rosters and scores.`
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
          content: `The real power of a list — **you can add or drop boxes even after you've made it**. Like a roster gaining a new friend, or pulling an item out of your cart.

**append() — stick a new box on the very end**
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("strawberry")
print(fruits)  # ['apple', 'banana', 'strawberry']
\`\`\`
👉 *When?* Whenever a new item shows up — piling up chat messages, logging scores. "Keep adding to the back" is by far the most common.

**remove(value) — find "this thing" and pull it out**
\`\`\`python
fruits.remove("banana")
print(fruits)  # ['apple', 'strawberry']
\`\`\`
👉 *When?* You **know what it is but not which position** it's in. ("Remove the banana" — no need to know its slot number.)

**pop(index) — take out the one "at this spot" (and hand the value back)**
\`\`\`python
fruits.pop()   # no number → removes the very last box
fruits.pop(0)  # removes box 0
\`\`\`
👉 *When?* You want to remove **by position (number) and then use the value you took out.** \`last = fruits.pop()\` captures it for later use.

> 💡 One-liner: **remove = erase by value (returns nothing)**, **pop = take out by position (returns the value)**. It splits into "erase" vs "take out and use."`
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
          content: `Three things you'll often want to know about a list — **how many? / is it in there? / where is it?** Each has its own tool.

**len() — how many?**
\`\`\`python
fruits = ["apple", "banana", "strawberry"]
print(len(fruits))  # 3
\`\`\`
👉 No need to count by hand. Use it anywhere you need a count — "how many people?", "how many cart items?" (Also handy for setting loop counts.)

**in — is it in there? (True/False)**
\`\`\`python
print("apple" in fruits)  # True
print("grape" in fruits)  # False
\`\`\`
👉 When you don't care about the position, just **whether it exists**. It pairs naturally with conditions: \`if "grape" in cart:\`.

**index(value) — at which spot?**
\`\`\`python
print(fruits.index("banana"))  # 1
\`\`\`
👉 Tells you **which box number** that value is in. Useful when you want to modify or \`pop\` that exact spot.

> 💡 Don't mix them up: **in is exists-or-not (True/False)**, **index is where (a number)**. And \`index\` errors out if the value isn't there, so when unsure, check with \`in\` first.`
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
          content: `To grab the last box, do you have to count up like \`fruits[2]\`? That's a pain for long lists. So Python also gives you **numbers that count from the back**.

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]
#          [-3]      [-2]       [-1]

print(fruits[-1])  # strawberry (last)
print(fruits[-2])  # banana (second from last)
\`\`\`

🎒 Picture: the front of a line is "first," the back is the **"last"**. Negative indexes are just *numbering from the last one backward*.

**Why is -1 the last?** Because front numbers start at \`0\`, back numbers skip \`0\` and start at **\`-1\`**. (\`-0\` is just \`0\`, which would clash with the first box.) So \`-1\` = the very end, \`-2\` = second from the end.

> 💡 **You can grab the last item without knowing the count.** Whether there are 3 boxes or 1000, \`mylist[-1]\` is always the last. No length math needed.`
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
