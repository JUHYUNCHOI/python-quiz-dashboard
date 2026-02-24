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
          title: "⏱️ Why Does Choosing a Data Structure Matter?",
          content: `**Same problem, different performance!**

Searching through 100,000 items:
- List: up to 100,000 comparisons 😰
- Set: done in just 1! 😎

**Your choice of data structure determines performance!**

In coding interviews:
- Time limit exceeded = wrong data structure
- Passed = right data structure`
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
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the time complexity of the 'in' operator on a list?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          answer: 2,
          explanation: "A list checks each element one by one from start to end, so it's O(n)!"
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
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the best data structure for checking duplicate user IDs?",
          options: ["List", "Tuple", "Set", "Deque"],
          answer: 2,
          explanation: "Duplicate checking requires lots of 'in' lookups → a set does it in O(1), the fastest!"
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
          title: "🖥️ Find Common Elements!",
          task: "Compare the two approaches!",
          initialCode: "# Method 1: Nested for loops - O(n²)\ndef common_slow(a, b):\n    result = []\n    for x in a:\n        if x in b:  # O(n)\n            result.append(x)\n    return result\n\n# Method 2: Set - O(n)\ndef common_fast(a, b):\n    return list(set(a) & set(b))\n\na = [1, 2, 3, 4, 5]\nb = [4, 5, 6, 7, 8]\n\nprint(\"Slow method:\", common_slow(a, b))\nprint(\"Fast method:\", sorted(common_fast(a, b)))",
          expectedOutput: "Slow method: [4, 5]\nFast method: [4, 5]",
          hint: "The & operator on sets runs in O(n)!",
          hint2: "The difference is huge with large data"
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
          id: "problem3",
          type: "explain",
          title: "🧩 Problem 3: Data Structure Selection Practice",
          content: `**Which data structure for each scenario?**

1. **Student attendance check** (present or not by name)
   → Set or dictionary

2. **Browser history** (back button)
   → Stack (implemented with deque)

3. **Printer queue**
   → Queue (implemented with deque)

4. **Last 5 viewed products**
   → Deque (maxlen=5)

5. **Vocabulary book** (English → Spanish)
   → Dictionary`
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
          initialCode: "from collections import deque, Counter\n\n# Problem 1: Remove duplicates\nnumbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = list(___(numbers))  # Which data structure?\nprint(\"1. Remove duplicates:\", sorted(unique))\n\n# Problem 2: Top 3 word frequency\nwords = \"apple banana apple cherry banana apple\".split()\nword_count = ___(words)  # Which tool?\nprint(\"2. Top 3:\", word_count.most_common(3))\n\n# Problem 3: Difference of two sets\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\nonly_a = set_a ___ set_b  # Which operator?\nprint(\"3. Only in A:\", sorted(only_a))\n\n# Problem 4: Keep only the 3 most recent searches\nrecent = deque(___=3)  # Which option?\nfor query in [\"Python\", \"Java\", \"C++\", \"JavaScript\", \"Go\"]:\n    recent.append(query)\nprint(\"4. Recent searches:\", list(recent))",
          expectedOutput: "1. Remove duplicates: [1, 2, 3, 4]\n2. Top 3: [('apple', 3), ('banana', 2), ('cherry', 1)]\n3. Only in A: [1, 2, 3]\n4. Recent searches: ['C++', 'JavaScript', 'Go']",
          hint: "Duplicates → set, counting → Counter, set difference → -, last N → deque's maxlen!",
          hint2: "Fill in: set, Counter, -, maxlen!"
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
