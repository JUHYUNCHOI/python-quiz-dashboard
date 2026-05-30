// ============================================
// Lesson 19: Tuples
// ============================================
import { LessonData } from './types'

export const lesson19EnData: LessonData = {
  id: "19",
  title: "Tuples",
  emoji: "📦",
  description: "Learn about tuples -- lists that can't be modified!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Tuples?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 Tuple — A Bundle That Doesn't Change",
          content: `**Tuple** = a list that **doesn't change** once you make it.

🎒 Think: your birthday \`(2014, 3, 15)\`. The date never changes after you're born — that's a tuple.

\`\`\`python
# List — can be modified
fruits = ["apple", "banana"]
fruits[0] = "grape"  # OK!

# Tuple — cannot be modified
colors = ("red", "blue")
colors[0] = "green"  # ❌ Error!
\`\`\`

Use **parentheses \`( )\`** or just commas to create them.

### Why force "no modification"?

Coordinate \`(x, y)\`, RGB \`(255, 128, 0)\`, student \`(name, score)\` — these are **one bundle**. Changing one piece breaks the meaning. (What's "a student with only their score replaced"?)

→ "This bundle shouldn't be touched" → tuple makes that explicit.`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 4 Ways to Create a Tuple",
          content: `Several ways to make tuples — same result, pick what fits.

\`\`\`python
# 1) Parentheses () — most basic
t1 = (1, 2, 3)

# 2) Just commas, no parens — common short form
t2 = 1, 2, 3
print(t2)  # (1, 2, 3) — same tuple!

# 3) tuple() function for conversion
t3 = tuple([1, 2, 3])  # list → tuple
t4 = tuple("abc")       # string → ('a', 'b', 'c')

# 4) Empty tuple
empty = ()
empty2 = tuple()
\`\`\`

> 💡 **Form #2** shows up a lot when functions return multiple values — \`return x, y\` is actually \`return (x, y)\`. (Detail in next chapter.)

⚠️ Next page: a single trap — **single-element tuples** — to look at 👇`
        },
        {
          id: "single-tuple-trap",
          type: "explain",
          title: "⚠️ Trap — (1) vs (1,)",
          content: `Single-element tuples are confusing.

\`\`\`python
a = (1)     # just the number 1! NOT a tuple
b = (1,)    # tuple with 1 element

print(type(a))  # <class 'int'>
print(type(b))  # <class 'tuple'>
\`\`\`

🤔 Why? Python uses parentheses as a **grouping operator** too — like \`(2 + 3) * 4\`. So \`(1)\` is just "the number 1 in parens".

**The real tuple marker is the comma** — so for one-element tuples, you must add a trailing comma.

\`\`\`python
# Pass a one-element tuple
print((1,))      # (1,)
print((1))       # 1 — not a tuple!
\`\`\`

> 🎯 One-liner: **A tuple's body is the comma; parens are optional.**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Coordinate Tuple — Build & Read x, y",
          task: "Create a coordinate as a tuple and access it by index!",
          initialCode: "point = (100, 200)\nprint(point)\nprint(f\"x: {point[0]}, y: {point[1]}\")",
          expectedOutput: "(100, 200)\nx: 100, y: 200",
          hint: "Indexing works the same as lists!",
          hint2: "point[0], point[1]"
        },
        {
          id: "try-creation",
          type: "tryit",
          title: "🖥️ Different Ways — tuple() / (x,) / commas only",
          task: "Convert a string to a tuple with tuple(), and create a single-element tuple!",
          initialCode: "# 1) String → tuple\nt1 = tuple(\"hello\")\nprint(t1)\n\n# 2) Single-element tuple (don't forget the comma!)\nsingle = (42,)\nprint(single, type(single).__name__)\n\n# 3) Just commas, no parens\nt2 = 10, 20, 30\nprint(t2)",
          expectedOutput: "('h', 'e', 'l', 'l', 'o')\n(42,) tuple\n(10, 20, 30)",
          hint: "tuple(\"abc\") splits each character into an element.",
          hint2: "Run as-is — confirm 3 creation forms at once."
        },
        {
          id: "try1b",
          type: "tryit",
          title: "🖥️ List vs Tuple — Direct Comparison",
          task: "See the difference between lists and tuples for yourself!",
          initialCode: "# List - can be modified!\nfruits = ['apple', 'banana', 'grape']\nfruits[0] = 'strawberry'\nfruits.append('mango')\nprint(f'List: {fruits}')\n\n# Tuple - cannot be modified! (but safe!)\ncolors = ('red', 'blue', 'green')\nprint(f'Tuple: {colors}')\nprint(f'Length: {len(colors)}')\nprint(f'Contains? {\"blue\" in colors}')\n\n# Multiple types are OK!\nmixed = ('Alice', 15, True, 3.14)\nfor item in mixed:\n    print(f'  {item} ({type(item).__name__})')",
          expectedOutput: "List: ['strawberry', 'banana', 'grape', 'mango']\nTuple: ('red', 'blue', 'green')\nLength: 3\nContains? True\n  Alice (str)\n  15 (int)\n  True (bool)\n  3.14 (float)",
          hint: "Tuples can't be modified, but reading, iterating, and 'in' operations work!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "vs-list-deep",
          type: "explain",
          title: "🤔 So When to Use List vs Tuple?",
          content: `Rule: **Will you modify it later or not?**

| Situation | Tool | Why |
|---|---|---|
| Student names (frequent add/remove) | List | Changes often |
| RGB color (255, 128, 0) | Tuple | Set once, done |
| Coordinate (x, y) | Tuple | Single bundle |
| Days of the week ("Mon", "Tue", ...) | Tuple | Never changes |
| Shopping cart | List | Add/remove |
| Function returning multiple values | Tuple | Bundle at once |

### Bonus — tuples are slightly faster

\`\`\`python
import sys
print(sys.getsizeof([1, 2, 3]))   # ~88 bytes (varies)
print(sys.getsizeof((1, 2, 3)))   # ~64 bytes — smaller!
\`\`\`

A list keeps spare room "in case it grows". A tuple is "this is final" → packed tightly. Less memory + small speed gain.

> 🎯 First-language one-liner: **"List if it'll change, tuple if it won't."**`
        },
        {
          id: "methods",
          type: "explain",
          title: "🔧 Tuple Methods — count, index",
          content: `Tuples can't be modified, so they have very few methods. Just **two read-only ones** to remember.

\`\`\`python
nums = (3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)

# count() — how many times this value appears
print(nums.count(5))   # 3
print(nums.count(7))   # 0 — returns 0 if absent

# index() — first position of this value
print(nums.index(4))   # 2 — at index 2
print(nums.index(5))   # 4 — first 5 is at index 4
\`\`\`

⚠️ \`index()\` **errors if the value is missing** — check with \`in\` first to be safe.

\`\`\`python
if 7 in nums:
    print(nums.index(7))
else:
    print("not found")
\`\`\``
        },
        {
          id: "try-methods",
          type: "tryit",
          title: "🖥️ count / index — How many 90s? Where's 80?",
          task: "From a tuple of scores, print how many times 90 appears and the position of the first 80!",
          initialCode: "scores = (75, 80, 90, 85, 90, 80, 95, 90, 70)\n\n# 1) Count of 90 → print 'count: ___'\n\n\n# 2) Position of first 80 → print 'index: ___'\n",
          expectedOutput: "count: 3\nindex: 1",
          hint: "scores.count(90) and scores.index(80) inside print f-strings!",
          hint2: "print(f\"count: {scores.count(90)}\")\nprint(f\"index: {scores.index(80)}\")"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between (1) and (1,)?",
          options: ["Both are tuples", "(1) is a number, (1,) is a tuple", "Both are numbers", "Error"],
          answer: 1,
          explanation: "(1) is just the number 1, while (1,) is a tuple with one element!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Unpacking",
      emoji: "📤",
      steps: [
        {
          id: "unpack-explain",
          type: "explain",
          title: "📤 Unpacking — open the bundle",
          content: `**Unpacking = opening the bundle**. Distribute a tuple's values into multiple variables **at once**.

🎒 Think: opening a lunchbox (tuple) and placing rice, side dish, and kimchi onto separate plates.

\`\`\`python
point = (10, 20)
x, y = point  # Unpacking!
print(x)  # 10
print(y)  # 20
\`\`\`

Variables on the left = elements on the right. Mismatch → error.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try Unpacking — RGB into r, g, b",
          task: "Unpack the RGB tuple into r, g, b!",
          initialCode: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(f\"R: {r}, G: {g}, B: {b}\")",
          expectedOutput: "R: 255, G: 128, B: 0",
          hint: "The number of variables must match the number of elements",
          hint2: "r, g, b = rgb does it all at once!"
        },
        {
          id: "swap-explain",
          type: "explain",
          title: "🔄 Swap — one-line value trade",
          content: `Thanks to tuples, **swapping two variables** fits in one line.

🎒 Think: items in two hands switching at once — no need to put one down first.

\`\`\`python
a = 10
b = 20
a, b = b, a  # Swap in one line!
print(a)  # 20
print(b)  # 10
\`\`\`

> 💡 Python builds the tuple \`(b, a)\` on the right first, then unpacks into the left side. That's why it doesn't tangle.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Swap — x ↔ y in one line",
          task: "Swap x and y in a single line!",
          initialCode: "x = 100\ny = 200\nprint(f\"Before swap: x={x}, y={y}\")\nx, y = y, x\nprint(f\"After swap: x={x}, y={y}\")",
          expectedOutput: "Before swap: x=100, y=200\nAfter swap: x=200, y=100",
          hint: "Swap without a temporary variable!",
          hint2: "x, y = y, x in one line!"
        },
        {
          id: "star-unpack-explain",
          type: "explain",
          title: "✨ Star Unpacking — *rest",
          content: `What if the count doesn't match? Patterns like **first one + all the rest** use \`*\` (star).

\`\`\`python
nums = (1, 2, 3, 4, 5)

# First + the rest
first, *rest = nums
print(first)   # 1
print(rest)    # [2, 3, 4, 5] — collected as a list!

# First + last + everything in the middle
first, *middle, last = nums
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Everything but the last
*head, last = nums
print(head)    # [1, 2, 3, 4]
print(last)    # 5
\`\`\`

> 💡 What \`*var\` collects is always a **list** (not a tuple). It's the "bundle" container.

⚠️ You can use \`*\` only **once**. \`*a, *b = nums\` is ambiguous (where to split?) → error.`
        },
        {
          id: "try-star",
          type: "tryit",
          title: "🖥️ Star Unpacking — top/mid/bot split",
          task: "From 5 scores, separate the top + middle + bottom. Print 'top: ___, mid: ___, bot: ___'!",
          initialCode: "scores = (98, 85, 76, 90, 62)\n\n# Unpack as top, *mid, bot\n\n\n# Print 'top: 98, mid: [85, 76, 90], bot: 62'\n",
          expectedOutput: "top: 98, mid: [85, 76, 90], bot: 62",
          hint: "top, *mid, bot = scores in one line!",
          hint2: "top, *mid, bot = scores\nprint(f\"top: {top}, mid: {mid}, bot: {bot}\")"
        },
        {
          id: "iter-unpack-explain",
          type: "explain",
          title: "🔁 Unpacking inside for loops",
          content: `Tuple's real charm: **unpacking right inside for loops**.

\`\`\`python
students = [
    ("Alice", 85),
    ("Bob", 92),
    ("Charlie", 78),
]

# Without unpacking? Index access — ugly
for s in students:
    print(s[0], s[1])

# With unpacking? Meaningful variable names!
for name, score in students:
    print(name, score)
\`\`\`

→ The second form reads way better. \`name\` is clearer than \`s[0]\`.

### With enumerate()

\`\`\`python
fruits = ["apple", "pear", "kiwi"]
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 pear
# 2 kiwi
\`\`\`

\`enumerate\` actually produces \`(index, value)\` tuples. Students often use it without knowing why — but knowing this tells you "ahh, that's why two variables".`
        },
        {
          id: "try-iter-unpack",
          type: "tryit",
          title: "🖥️ For-loop Unpacking — city name + pop",
          task: "Iterate (city, population) tuples while unpacking inline!",
          initialCode: "cities = [\n    (\"Seoul\", 950),\n    (\"Busan\", 340),\n    (\"Incheon\", 295),\n]\n\n# Unpack (name, pop) inside the for\nfor ___, ___ in cities:\n    print(f\"{name}: {pop}M\")",
          expectedOutput: "Seoul: 950M\nBusan: 340M\nIncheon: 295M",
          hint: "for name, pop in cities: form!",
          hint2: "for name, pop in cities:"
        }
      ]
    },
    {
      id: "ch3",
      title: "Tuple in Action + Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "two-values-explain",
          type: "explain",
          title: "🎁 Use case 1 — Bundle two values together",
          content: `When you want to handle **multiple related values** as one unit — bundle them with a tuple, then unpack as needed.

\`\`\`python
# A student's info = (name, score)
student = ("Bob", 92)

# Print the whole thing
print(student)            # ('Bob', 92)

# Unpack it (most common pattern)
name, score = student
print(name, score)        # Bob 92
\`\`\`

### Why bundle instead of separate variables?

\`\`\`python
# Without bundling — you have to carry both around
name1 = "Alice"
score1 = 85
# Two variables you must keep in sync (easy to mistake)

# With bundling — one chunk
s1 = ("Alice", 85)
# Move just one variable
\`\`\`

> 🎯 One-liner: **A tuple ties related values together as one unit.**

(Later in lesson 32 you'll learn functions — \`return x, y\` returns the same kind of tuple bundle so a function can hand back two results at once.)`
        },
        {
          id: "try-two-values",
          type: "tryit",
          title: "🖥️ Bundle Two Values — circle perimeter + area",
          task: "For a circle of radius 5, bundle the circumference and area into one tuple and print both. (use π = 3.14)",
          initialCode: "r = 5\n# circumference = 2 * π * r\n# area = π * r * r\n# Bundle them into a tuple\ncircle = (___, ___)\n\nperi, area = circle\nprint(f\"circumference: {peri}, area: {area}\")",
          expectedOutput: "circumference: 31.400000000000002, area: 78.5",
          hint: "circle = (2 * 3.14 * r, 3.14 * r * r) — parens + comma.",
          hint2: "return 2 * 3.14 * r, 3.14 * r * r"
        },
        {
          id: "coord-explain",
          type: "explain",
          title: "🗺️ Use case 2 — Coordinates and bundled data",
          content: `**Coordinates like \`(x, y)\`** are the classic tuple use case.

\`\`\`python
# Character position
player = (3, 5)
goal   = (8, 2)

# Distance (Manhattan: sum of absolute differences)
dx = abs(player[0] - goal[0])
dy = abs(player[1] - goal[1])
print(f"distance: {dx + dy}")   # distance: 8
\`\`\`

### Why tuple, not list?

\`\`\`python
# List as coordinate
p = [3, 5]
p[0] = 999  # could break the coordinate by accident!

# Tuple as coordinate
p = (3, 5)
p[0] = 999  # ❌ Error! → mistake blocked
\`\`\`

When you set a coordinate once and don't want it changed → **tuple = "mistake guardrail"**.

### Also works as dict keys

A list can't be a dict key (deep dive next lesson). A tuple can.

\`\`\`python
# (row, col) → cell value
board = {
    (0, 0): "X",
    (0, 1): "O",
    (1, 1): "X",
}
print(board[(0, 0)])  # "X"
\`\`\``
        },
        {
          id: "try-coord",
          type: "tryit",
          title: "🖥️ Coordinate Distance — Manhattan between 2 points",
          task: "Compute the Manhattan distance |x1-x2| + |y1-y2| between two points!",
          initialCode: "p1 = (1, 2)\np2 = (4, 6)\n\n# Unpack and calculate\nx1, y1 = p1\nx2, y2 = p2\n\ndist = ___\nprint(f\"distance: {dist}\")",
          expectedOutput: "distance: 7",
          hint: "abs(x1 - x2) + abs(y1 - y2)",
          hint2: "dist = abs(x1 - x2) + abs(y1 - y2)"
        },
        {
          id: "enumerate-explain",
          type: "explain",
          title: "🔢 Use case 3 — enumerate() returns tuples",
          content: `Now you can finally see why \`for i, x in enumerate(...)\` works.

\`\`\`python
fruits = ["apple", "pear", "kiwi"]

# What enumerate produces = (index, value) tuples
for pair in enumerate(fruits):
    print(pair)
# (0, 'apple')
# (1, 'pear')
# (2, 'kiwi')

# Unpacking on receive — same tuple unpacking principle!
for i, fruit in enumerate(fruits):
    print(i, fruit)
\`\`\`

### zip() too

\`\`\`python
names = ["Alice", "Bob"]
ages  = [15, 14]

for pair in zip(names, ages):
    print(pair)
# ('Alice', 15)
# ('Bob', 14)

# Unpack
for name, age in zip(names, ages):
    print(name, age)
\`\`\`

→ The "two-variable receive" pattern across Python is fundamentally **tuple unpacking**.`
        },
        {
          id: "try-enumerate",
          type: "tryit",
          title: "🖥️ enumerate Unpacking — number menu from 1",
          task: "Number a menu list starting from 1. (use enumerate's start argument)",
          initialCode: "menu = [\"Latte\", \"Americano\", \"Cappuccino\"]\n\nfor i, name in enumerate(menu, start=1):\n    print(f\"{i}. {name}\")",
          expectedOutput: "1. Latte\n2. Americano\n3. Cappuccino",
          hint: "Run as-is — enumerate(menu, start=1) makes index begin at 1.",
          hint2: "Just run → 1. Latte / 2. Americano / 3. Cappuccino"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Student Info — for-loop with unpacking",
          task: "Iterate a roster of (name, score) tuples using for-loop unpacking!",
          initialCode: "students = [\n    (\"Alice\", 85),\n    (\"Bob\", 92),\n    (\"Charlie\", 78)\n]\n\nfor ___, ___ in students:\n    print(f\"{name}: {score} points\")",
          expectedOutput: "Alice: 85 points\nBob: 92 points\nCharlie: 78 points",
          hint: "Unpack directly in the for loop!",
          hint2: "for name, score in students:"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission — Average + top student name",
          task: "From 4 students of (name, score) tuples, find the **average score** and **top student's name**. Use only for-unpacking.",
          initialCode: "students = [\n    (\"Alice\", 75),\n    (\"Bob\", 92),\n    (\"Charlie\", 80),\n    (\"Dora\", 88),\n]\n\n# 1) Average score — sum of scores / number of people\ntotal = 0\nfor name, score in students:\n    total += ___\navg = total / len(students)\n\n# 2) Top name — name of the student with the highest score\ntop_name = \"\"\ntop_score = -1\nfor name, score in students:\n    if score > ___:\n        top_score = score\n        top_name = name\n\nprint(f\"avg: {avg}\")\nprint(f\"top: {top_name}\")",
          expectedOutput: "avg: 83.75\ntop: Bob",
          hint: "Average: total += score. Top: if score > top_score, update.",
          hint2: "total += score   # add the score only\nif score > top_score:   # if higher than current best, update"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **Creating tuples** — \`( )\`, just commas, \`tuple()\` conversion, single-element \`(x,)\`
✅ **Tuple vs list** — list if it'll change, tuple if it won't
✅ **Methods** — \`count()\`, \`index()\` (the two read-only ones)
✅ **Unpacking** — multiple variables at once, \`*rest\` star unpacking
✅ **Swap** — \`a, b = b, a\` in one line
✅ **For-loop unpacking** — \`for name, score in students:\`
✅ **Bundling two values** — group related info in one variable (name+score, perimeter+area, …)
✅ **Coordinates / dict keys** — bundle data + mistake guardrail
✅ **enumerate / zip** — the tuple-unpacking pattern is everywhere

Next time we'll learn about **dictionaries**! 🚀 — extending tuple's (x, y) bundle into (key, value).`
        }
      ]
    }
  ]
}
