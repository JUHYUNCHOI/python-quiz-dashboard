// ============================================
// Lesson 26: Data Structure Comparison & Selection - Advanced
// ============================================
import { LessonData } from './types'

export const lesson26EnData: LessonData = {
  id: "26",
  title: "Data Structure Comparison & Selection",
  emoji: "⚖️",
  description: "Learn how to choose the right data structure for the job!",
  chapters: [
    {
      id: "ch1",
      title: "Time Complexity Comparison",
      emoji: "⏱️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "⏱️ Why Picking the Right Structure Matters",
          content: `**Same task, very different speed!**

Looking up 'is X in here?' across 100,000 items:
- List: up to 100,000 comparisons 😰
- Set: 1 lookup 😎

**The wrong structure can make your code 100,000× slower.**

In coding contests:
- Time limit exceeded = wrong structure
- Passed = right structure`
        },
        {
          id: "bigO",
          type: "explain",
          title: "📊 Time Complexity Summary",
          content: `| Operation | List | Dict | Set | Deque |
|-----------|------|------|-----|-------|
| Index access | O(1) | - | - | O(n) |
| Search (in) | O(n) | O(1) | O(1) | O(n) |
| Append (end) | O(1) | O(1) | O(1) | O(1) |
| Insert (front) | O(n) | - | - | O(1) |
| Remove (end) | O(1) | O(1) | O(1) | O(1) |
| Remove (front) | O(n) | - | - | O(1) |
| Insert (middle) | O(n) | - | - | O(n) |

**Key takeaways:**
- Lots of lookups → dict / set
- Lots of front/back operations → deque`
        },
        {
          id: "pred-bigO-lookup",
          type: "predict",
          title: "💭 Finding 'Charlie' in 1000 students — who wins?",
          content: "Don't just read the table — *guess* first.\n\n```python\nstudents_list = [\"Mia\", \"Jun\", ..., \"Charlie\"]  # 1000 names\nstudents_set  = {\"Mia\", \"Jun\", ..., \"Charlie\"}\n\n\"Charlie\" in students_list  # ?\n\"Charlie\" in students_set   # ?\n```\n\n**Which one is faster?**",
          options: ["list is way faster", "set is way faster", "About the same"],
          answer: 1,
          explanation: "List's `in` *compares one by one* (O(n)) — up to 1000 checks. Set uses a *hash, one shot* (O(1)) — 1 check. The gap grows with size."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the time complexity of the 'in' operator on a list?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          answer: 2,
          explanation: "A list checks each element one by one from start to end, so it's O(n)!"
        },
        {
          id: "quiz-pick",
          type: "quiz",
          title: "🎯 Which structure?",
          content: "You have a dictionary of 100,000 words and need to quickly check **whether a word is in it**. Best structure?",
          options: [
            "list",
            "tuple",
            "set",
            "stack"
          ],
          answer: 2,
          explanation: "set! O(1) average. list / tuple are O(n) — too slow at scale. set is hash-based, near-instant lookup."
        },
        {
          id: "quiz-pick-dict",
          type: "quiz",
          title: "🎯 Different scenario — which structure?",
          content: "**Pair up *student name → score* and look them up fast — which structure?**",
          options: ["list", "dict", "set", "tuple"],
          answer: 1,
          explanation: "*Key-value pairs* + *fast lookup* = `dict`. Doing this with a list means scanning from the front every time (O(n))."
        },
        {
          id: "try-pick-ds",
          type: "tryit",
          title: "✋ Try it — pick the right structure",
          task: "Check whether 'Bob' is in a list of 5 names — but pick a structure that makes the lookup fast.",
          initialCode: "names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve']\n\n# Convert to a structure that gives fast membership check\nlookup = ___(names)\n\n# Check membership with 'in'\nprint('Bob' ___ lookup)",
          expectedOutput: "True",
          hint: "Converting to a set makes 'in' average O(1). Use the 'in' keyword.",
          hint2: "set / in"
        }
      ]
    },
    {
      id: "ch2",
      title: "Selection Guide by Scenario",
      emoji: "🎯",
      steps: [
        {
          id: "guide",
          type: "explain",
          title: "🎯 When to Use Which Data Structure!",
          content: `**📋 List** — use when:
- Order matters
- You need index-based access
- Duplicates are allowed

**📖 Dictionary** — use when:
- You need fast key-based lookup
- Storing associated data
- Counting occurrences

**🎯 Set** — use when:
- Removing duplicates
- Only checking membership
- Set operations (union / intersection / difference)

**↔️ Deque** — use when:
- Adding/removing from both ends
- Sliding window problems
- You need both stack and queue behavior`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Search Performance Explained!",
          task: "Understand how list vs set search works!",
          initialCode: "# List: checks one by one from the start (O(n))\nmy_list = [10, 20, 30, 40, 50]\ntarget = 40\n\n# List search process\nprint(\"List search:\")\nfor i, val in enumerate(my_list):\n    print(f\"  index {i}: checking {val}\", end=\"\")\n    if val == target:\n        print(\" -> Found it!\")\n        break\n    print()\n\n# Set: direct hash lookup (O(1))\nmy_set = {10, 20, 30, 40, 50}\nprint(f\"\\nSet search:\")\nprint(f\"  {target} in set? {target in my_set} (instant lookup!)\")",
          expectedOutput: "List search:\n  index 0: checking 10\n  index 1: checking 20\n  index 2: checking 30\n  index 3: checking 40 -> Found it!\n\nSet search:\n  40 in set? True (instant lookup!)",
          hint: "Lists use sequential search, sets use hash-based search!",
          hint2: "The difference grows larger with more data"
        },
        {
          id: "problem-solving",
          type: "explain",
          title: "🧩 Data Structures by Problem Type",
          content: `**1. "Check if ~ exists" → set / dict**
\`\`\`python
# ❌ Slow
if item in my_list:
# ✅ Fast
if item in my_set:
\`\`\`

**2. "Count occurrences" → dict / Counter**
\`\`\`python
from collections import Counter
counts = Counter(items)
\`\`\`

**3. "Remove from front" → deque**
\`\`\`python
from collections import deque
q = deque()
q.popleft()  # O(1)
\`\`\`

**4. "Keep the last N items" → deque(maxlen)**
\`\`\`python
recent = deque(maxlen=N)
\`\`\``
        },
        {
          id: "quiz-pick-stack",
          type: "quiz",
          title: "🎯 Which structure?",
          content: "**Like a *back button* (browser / Ctrl+Z) — undo *the most recent* thing first. Which structure?**",
          options: ["Stack (LIFO)", "Queue (FIFO)", "Dictionary", "Set"],
          answer: 0,
          explanation: "*Most recent first* = *Last In First Out* = `stack`. Think of a stack of books — you take from the top."
        },
        {
          id: "quiz-pick-deque",
          type: "quiz",
          title: "🎯 Both ends fast — which structure?",
          content: "**Push and pop *fast* from *both ends* — which structure?**",
          options: ["list", "stack", "queue", "deque"],
          answer: 3,
          explanation: "*Both ends O(1)* is `deque`. List's `pop(0)` / `insert(0, x)` are O(n) — too slow."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the best data structure for checking duplicate user IDs?",
          options: ["List", "Tuple", "Set", "Deque"],
          answer: 2,
          explanation: "Duplicate checking requires lots of 'in' lookups → a set does it in O(1), the fastest!"
        },
        {
          id: "quiz-pick-tuple",
          type: "quiz",
          title: "🎯 Values that shouldn't change — which structure?",
          content: "**Coordinates like (x, y) — *fixed values that must not change*. Which structure?**",
          options: ["list", "tuple", "dict", "set"],
          answer: 1,
          explanation: "*Immutable* = `tuple`. Great for fixed bundles like coordinates, dates, RGB triples."
        }
      ]
    },
    {
      id: "ch3",
      title: "Practice Problems",
      emoji: "🧩",
      steps: [
        {
          id: "problem1",
          type: "explain",
          title: "🧩 Problem 1: Common Elements of Two Lists",
          content: `**Problem**: Find common elements between two lists

\`\`\`python
a = [1, 2, 3, 4, 5]
b = [4, 5, 6, 7, 8]
# Common: [4, 5]
\`\`\`

**Method 1: Nested for loops** — O(n²) slow!
**Method 2: Set intersection** — O(n) fast!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try it — common elements of two lists",
          task: "Find the common elements of two lists in two ways: (1) nested for loop, (2) set intersection!",
          initialCode: "a = [1, 2, 3, 4, 5]\nb = [4, 5, 6, 7, 8]\n\n# Method 1: Nested for loop — O(n²), slow\nslow = []\nfor x in a:\n    if x in b:\n        slow.append(x)\nprint(\"Slow method:\", slow)\n\n# Method 2: Set intersection — O(n), fast\nfast = list(set(a) ___ set(b))    # intersection operator\nprint(\"Fast method:\", sorted(fast))",
          expectedOutput: "Slow method: [4, 5]\nFast method: [4, 5]",
          hint: "Set intersection operator is `&`. With large data, set wins by a lot.",
          hint2: "&"
        },
        {
          id: "problem2",
          type: "explain",
          title: "🧩 Problem 2: Character Frequency Count",
          content: `**Problem**: Count each character in a string

**Method 1: Manual dictionary**
\`\`\`python
counts = {}
for char in text:
    counts[char] = counts.get(char, 0) + 1
\`\`\`

**Method 2: Using Counter**
\`\`\`python
from collections import Counter
counts = Counter(text)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Count Frequencies!",
          task: "Count character frequencies using both methods!",
          initialCode: "from collections import Counter\n\ntext = \"hello\"\n\n# Method 1: Manual dictionary\ncounts1 = {}\nfor char in text:\n    counts1[char] = counts1.get(char, 0) + 1\nprint(\"Dictionary:\", counts1)\n\n# Method 2: Counter\ncounts2 = Counter(text)\nprint(\"Counter:\", dict(counts2))\n\n# Most frequent character\nprint(\"Most frequent:\", counts2.most_common(1))",
          expectedOutput: "Dictionary: {'h': 1, 'e': 1, 'l': 2, 'o': 1}\nCounter: {'h': 1, 'e': 1, 'l': 2, 'o': 1}\nMost frequent: [('l', 2)]",
          hint: "Counter is a subclass of dict!",
          hint2: "Use most_common() to get rankings"
        },
        {
          id: "problem3-intro",
          type: "explain",
          title: "🧩 Problem 3: Data Structure Selection Practice",
          content: `**This time — *no answers up front*. Guess each of five scenarios yourself.**

For each one, decide on a structure *before* checking the answer, then move to the next. Five in a row!`
        },
        {
          id: "problem3-pick1",
          type: "predict",
          title: "💭 Scenario 1 — student attendance check",
          content: "**Student attendance** — just need to check *present or not* by name (in or out).\n\nWhich structure?",
          options: ["list", "dict / set", "stack", "tuple"],
          answer: 1,
          explanation: "*In or out* = membership check → `set` is cleanest (O(1)). If you also want to store the check-in time, use a `dict`."
        },
        {
          id: "problem3-pick2",
          type: "predict",
          title: "💭 Scenario 2 — browser back button",
          content: "**Browser history** — go back to *the most recently* visited page (back button).\n\nWhich structure?",
          options: ["Queue (FIFO)", "Stack (LIFO)", "Set", "Dict"],
          answer: 1,
          explanation: "*Most recent first* = LIFO = `stack`. In Python: a list with `append`/`pop`, or a `deque`."
        },
        {
          id: "problem3-pick3",
          type: "predict",
          title: "💭 Scenario 3 — printer queue",
          content: "**Printer queue** — *first job submitted* prints first.\n\nWhich structure?",
          options: ["Stack (LIFO)", "Queue (FIFO)", "Dict", "List"],
          answer: 1,
          explanation: "*First in, first out* = `queue`. `deque`'s `append` + `popleft` are O(1) — perfect fit."
        },
        {
          id: "problem3-pick4",
          type: "predict",
          title: "💭 Scenario 4 — last 5 viewed products",
          content: "**Keep only the last 5 viewed products** — when a 6th one comes in, the oldest *drops out automatically*.\n\nWhich structure?",
          options: ["list + pop(0)", "deque(maxlen=5)", "set", "dict"],
          answer: 1,
          explanation: "`deque(maxlen=5)` does it in one line — overflow drops the front automatically. Doing it with a list means calling `pop(0)` (O(n)) every time. Why bother?"
        },
        {
          id: "problem3-pick5",
          type: "predict",
          title: "💭 Scenario 5 — English → Spanish vocabulary",
          content: "**Vocabulary book** — look up an English word, get the Spanish meaning.\n\nWhich structure?",
          options: ["list", "dict", "set", "tuple"],
          answer: 1,
          explanation: "*Key* (English) → *value* (Spanish) pair → `dict`. Lookup is O(1)."
        },
        {
          id: "try-recent",
          type: "tryit",
          title: "✋ Try it — keep only the most recent 3",
          task: "Track items as the user views them, but keep **only the most recent 3** automatically. (Use deque's maxlen option.)",
          initialCode: "from collections import deque\n\n# Create a deque limited to length 3\nrecent = deque(___=3)\n\nrecent.append('A')\nrecent.append('B')\nrecent.append('C')\nrecent.append('D')   # Adding past capacity auto-pops the oldest\nrecent.append('E')\n\nprint(list(recent))",
          expectedOutput: "['C', 'D', 'E']",
          hint: "Pass maxlen=N when constructing a deque — older items drop out automatically when you exceed N.",
          hint2: "deque(maxlen=3)"
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
          title: "🏆 Final Mission: Comprehensive Challenge!",
          task: "Choose the right data structure to solve each problem!",
          initialCode: "from collections import deque, Counter\n\n# Problem 1: Remove duplicates — which structure to wrap with?\nnumbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = list(___(numbers))\nprint(\"1. Remove duplicates:\", sorted(unique))\n\n# Problem 2: Top 3 word frequency — which tool?\nwords = \"apple banana apple cherry banana apple\".split()\nword_count = ___(words)\nprint(\"2. Top 3:\", word_count.most_common(3))\n\n# Problem 3: Items only in A — what to wrap each *group* with? Then which operator?\ngroup_a = ___({1, 2, 3, 4, 5})    # Which structure?\ngroup_b = ___({4, 5, 6, 7, 8})    # Same structure!\nonly_a = group_a ___ group_b      # Difference operator\nprint(\"3. Only in A:\", sorted(only_a))\n\n# Problem 4: Keep only the 3 most recent searches — which structure + which option?\nrecent = ___(___=3)\nfor query in [\"Python\", \"Java\", \"C++\", \"JavaScript\", \"Go\"]:\n    recent.append(query)\nprint(\"4. Recent searches:\", list(recent))",
          expectedOutput: "1. Remove duplicates: [1, 2, 3, 4]\n2. Top 3: [('apple', 3), ('banana', 2), ('cherry', 1)]\n3. Only in A: [1, 2, 3]\n4. Recent searches: ['C++', 'JavaScript', 'Go']",
          hint: "1: set / 2: Counter / 3: set, set, - / 4: deque, maxlen — *write the structure names yourself*!",
          hint2: "set, Counter, set, set, -, deque, maxlen"
        },
        {
          id: "cheatsheet",
          type: "explain",
          title: "📋 Cheat Sheet",
          content: `## Data Structure Selection Cheat Sheet

**"Does ~ exist?"** → **Set / Dict** (O(1) lookup)
**"How many are there?"** → **Counter**
**"Store in order"** → **List**
**"Must not change"** → **Tuple**
**"Find by key"** → **Dictionary**
**"No duplicates"** → **Set**
**"Add/remove from both ends"** → **Deque**
**"Last one only"** → **Stack (list)**
**"First come, first served"** → **Queue (deque)**
**"Only the last N"** → **Deque (maxlen)**`
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Part 3 Advanced Complete!",
          content: `## What You Learned in the Advanced Course

✅ **Stack** — LIFO, bracket matching, back button
✅ **Queue** — FIFO, waiting lines, ordered processing
✅ **Deque** — bidirectional, palindromes, sliding window
✅ **Data structure selection** — pick the right one!

**Key takeaways:**
- Lots of lookups → hash-based (dict, set)
- Order matters → list, deque
- Front/back operations → deque

🎉 **Congratulations!**
You've become a data structure master! 🏆`
        }
      ]
    }
  ]
}
