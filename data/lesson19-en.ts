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
          title: "📦 Tuple = Immutable List",
          content: `**Tuple** = A list that cannot be modified once created

\`\`\`python
# List - can be modified
fruits = ["apple", "banana"]
fruits[0] = "grape"  # OK!

# Tuple - cannot be modified
colors = ("red", "blue")
colors[0] = "green"  # ❌ Error!
\`\`\`

Use **parentheses ( )** or just commas to create them!

### Why force "no modification"?

Think about it — coordinate \`(x, y)\`, RGB \`(255, 128, 0)\`, student \`(name, score)\`. These are **bundles**. Changing one part breaks the meaning. (What's "a student with only their score replaced"?)

→ "This is a bundle that shouldn't be modified" → tuple makes that explicit.`
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
          title: "🖥️ Try It Yourself — Coordinate Tuple",
          task: "Create a coordinate as a tuple and access it by index!",
          initialCode: "point = (100, 200)\nprint(point)\nprint(f\"x: {point[0]}, y: {point[1]}\")",
          expectedOutput: "(100, 200)\nx: 100, y: 200",
          hint: "Indexing works the same as lists!",
          hint2: "point[0], point[1]"
        },
        {
          id: "try-creation",
          type: "tryit",
          title: "🖥️ Try It — Different Ways to Create",
          task: "Convert a string to a tuple with tuple(), and create a single-element tuple!",
          initialCode: "# 1) String → tuple\nt1 = tuple(\"hello\")\nprint(t1)\n\n# 2) Single-element tuple (don't forget the comma!)\nsingle = (42,)\nprint(single, type(single).__name__)\n\n# 3) Just commas, no parens\nt2 = 10, 20, 30\nprint(t2)",
          expectedOutput: "('h', 'e', 'l', 'l', 'o')\n(42,) tuple\n(10, 20, 30)",
          hint: "tuple(\"abc\") splits each character into an element.",
          hint2: "Run as-is — confirm 3 creation forms at once."
        },
        {
          id: "try1b",
          type: "tryit",
          title: "🖥️ List vs Tuple!",
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
          title: "🖥️ Try It — count / index",
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
          title: "📤 Unpacking",
          content: `Assign tuple values to multiple variables at once!

\`\`\`python
point = (10, 20)
x, y = point  # Unpacking!
print(x)  # 10
print(y)  # 20
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try Unpacking!",
          task: "Unpack the RGB values!",
          initialCode: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(f\"R: {r}, G: {g}, B: {b}\")",
          expectedOutput: "R: 255, G: 128, B: 0",
          hint: "The number of variables must match the number of elements",
          hint2: "r, g, b = rgb does it all at once!"
        },
        {
          id: "swap-explain",
          type: "explain",
          title: "🔄 Value Swapping",
          content: `Swapping values is easy with tuples!

\`\`\`python
a = 10
b = 20
a, b = b, a  # Swap in one line!
print(a)  # 20
print(b)  # 10
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Swap Values!",
          task: "Swap the values of x and y!",
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
          title: "🖥️ Try It — Star Unpacking",
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
          title: "🖥️ Try It — Unpacking in for loop",
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
          id: "multi-return-explain",
          type: "explain",
          title: "🎁 Use case 1 — Functions returning multiple values",
          content: `When a function wants to return **two or more results** — bundle into a tuple and return at once.

\`\`\`python
def min_max(numbers):
    return min(numbers), max(numbers)
    #      ↑ this is actually (min(...), max(...)) — a tuple

result = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(result)  # (1, 9) — received as a tuple

# Unpack right away (most common pattern)
lo, hi = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(lo, hi)  # 1 9
\`\`\`

### Different from other languages

C++ / Java functions return one value at most. To send multiple, you need a class / struct.
Python? Just \`return a, b, c\` — thanks to tuples.

> 🎯 One-liner: **\`return x, y\` IS \`return (x, y)\` — returning a single tuple.**`
        },
        {
          id: "try-multi-return",
          type: "tryit",
          title: "🖥️ Try It — Multiple return values",
          task: "Write a function that takes a circle's radius and returns BOTH circumference and area. (use π = 3.14)",
          initialCode: "def circle(r):\n    # circumference = 2 * π * r\n    # area = π * r * r\n    # Return both (auto-bundled into tuple)\n    return ___, ___\n\nperi, area = circle(5)\nprint(f\"circumference: {peri}, area: {area}\")",
          expectedOutput: "circumference: 31.400000000000002, area: 78.5",
          hint: "return 2 * 3.14 * r, 3.14 * r * r — separated by comma.",
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
          title: "🖥️ Try It — Coordinate distance",
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
          title: "🖥️ Try It — enumerate unpacking",
          task: "Number a menu list starting from 1. (enumerate has a start argument!)",
          initialCode: "menu = [\"Latte\", \"Americano\", \"Cappuccino\"]\n\nfor i, name in enumerate(menu, start=1):\n    print(f\"{i}. {name}\")",
          expectedOutput: "1. Latte\n2. Americano\n3. Cappuccino",
          hint: "Run as-is — enumerate(menu, start=1) makes index begin at 1.",
          hint2: "Just run → 1. Latte / 2. Americano / 3. Cappuccino"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Manage student info using tuples!",
          initialCode: "students = [\n    (\"Alice\", 85),\n    (\"Bob\", 92),\n    (\"Charlie\", 78)\n]\n\nfor ___, ___ in students:\n    print(f\"{name}: {score} points\")",
          expectedOutput: "Alice: 85 points\nBob: 92 points\nCharlie: 78 points",
          hint: "Unpack directly in the for loop!",
          hint2: "for name, score in students:"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Average and top from a roster",
          task: "From 4 students of (name, score), use ONE function to return both **average score** and **top student's name**.",
          initialCode: "students = [\n    (\"Alice\", 75),\n    (\"Bob\", 92),\n    (\"Charlie\", 80),\n    (\"Dora\", 88),\n]\n\ndef stats(students):\n    # Return both average and top name (as a tuple!)\n    # Hint: max(students, key=lambda s: s[1]) is the top student tuple\n    pass\n\navg, top = stats(students)\nprint(f\"avg: {avg}\")\nprint(f\"top: {top}\")",
          expectedOutput: "avg: 83.75\ntop: Bob",
          hint: "avg = sum(scores) / len(students). top = max(students, key=...)[0] (the name).",
          hint2: "def stats(students):\n    avg = sum(s[1] for s in students) / len(students)\n    top = max(students, key=lambda s: s[1])[0]\n    return avg, top"
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
✅ **Multiple return** — \`return x, y\` = returning a single tuple
✅ **Coordinates / dict keys** — bundle data + mistake guardrail
✅ **enumerate / zip** — the tuple-unpacking pattern is everywhere

Next time we'll learn about **dictionaries**! 🚀 — extending tuple's (x, y) bundle into (key, value).`
        }
      ]
    }
  ]
}
