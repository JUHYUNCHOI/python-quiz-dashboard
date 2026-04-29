// ============================================
// Lesson 21: Sets (set)
// ============================================
import { LessonData } from './types'

export const lesson21EnData: LessonData = {
  id: "21",
  title: "Sets (set)",
  emoji: "🎯",
  description: "Learn about collections with no duplicates!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Set?",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 Want to Remove Duplicates?",
          content: `**Set** = a data structure with no duplicates and no order

\`\`\`python
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3} - duplicates removed!

names = {"Alice", "Bob", "Alice"}
print(names)  # {'Alice', 'Bob'}
\`\`\`

**Features:**
- ❌ No duplicates — same value can't appear twice
- ❌ No order — no \`s[0]\` indexing
- ⭕ Fast lookup — \`in\` is much faster than on lists

### Where do you meet this?

- **Deduplication**: from a user-ID log, who connected at least once
- **Tags**: tags on a post (no repeats)
- **Quick membership check**: "did this user sign up?" — instant answer
- **Comparing two groups**: common friends, students only in class A, etc. (next chapter)`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ Ways to create a set + empty-set trap",
          content: `\`\`\`python
# 1) Curly braces — most common
s1 = {1, 2, 3}

# 2) set() function — convert from another collection
s2 = set([1, 2, 2, 3])     # list → {1, 2, 3}
s3 = set("hello")           # string → {'h', 'e', 'l', 'o'}
s4 = set((1, 2, 3))         # tuple → {1, 2, 3}
\`\`\`

### ⚠️ Empty set trap

\`\`\`python
empty1 = {}        # ❌ this is an empty DICT!
empty2 = set()     # ✅ actual empty set
\`\`\`

\`{}\` was already taken by **dict** in Python. For an empty set, you must use \`set()\`.

### What can go inside a set

\`\`\`python
# OK — immutable (hashable) values
{1, "hi", (1, 2), 3.14}

# ❌ List not allowed (mutable → not hashable)
{[1, 2], 3}   # TypeError
\`\`\`

> 🎯 One-liner: **set elements must be immutable** (numbers, strings, tuples OK / lists, dicts NO).`
        },
        {
          id: "vs-list-detail",
          type: "explain",
          title: "🤔 list vs set vs tuple — when to use which?",
          content: `Three at a glance.

| | List \`[]\` | Set \`{}\` | Tuple \`()\` |
|---|---|---|---|
| Duplicates | OK | ❌ auto-removed | OK |
| Order | OK (indexable) | ❌ none | OK (indexable) |
| Modify | OK | OK (elements only) | ❌ |
| \`in\` lookup | slow (linear) | **fast** (hashed) | slow |
| Main use | ordered collection | uniques | bundle (coords etc.) |

### Decision tree

1. **Need order / index?** → list or tuple
2. **Allow duplicates?**
   - Yes → list
   - No → set
3. **Modify often?**
   - Yes → list
   - No → tuple

### Real examples

| Data | Tool | Why |
|---|---|---|
| Student roster (entry order) | List | order matters |
| Seat coordinate (5, 7) | Tuple | bundle, fixed |
| Registered user IDs | Set | no dupes, fast check |
| Tag set | Set | no dupes |
| Shopping cart | List | order + dupes possible |
| Days of the week | Tuple | never changes |`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Remove duplicates and count the unique elements!",
          initialCode: "numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = set(numbers)\nprint(f\"Count after removing duplicates: {len(unique)}\")",
          expectedOutput: "Count after removing duplicates: 4",
          hint: "Use set() to convert a list to a set!",
          hint2: "Use len() to check the count"
        },
        {
          id: "try-dedupe-list",
          type: "tryit",
          title: "🖥️ Try It — Dedupe and back to a sorted list",
          task: "From a visitor log, build a sorted list with duplicates removed!",
          initialCode: "visitors = [\"Alice\", \"Bob\", \"Alice\", \"Charlie\", \"Bob\", \"Dora\", \"Alice\"]\n\n# 1) set → drop duplicates\n# 2) sorted() → sorted list\nunique_sorted = ___\n\nprint(unique_sorted)",
          expectedOutput: "['Alice', 'Bob', 'Charlie', 'Dora']",
          hint: "sorted(set(visitors)) — set drops dupes, sorted returns a list.",
          hint2: "unique_sorted = sorted(set(visitors))"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of set([1, 1, 2, 2, 3])?",
          options: ["{1, 1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "Error"],
          answer: 1,
          explanation: "Sets automatically remove duplicates!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Set Operations",
      emoji: "🔧",
      steps: [
        {
          id: "add-remove",
          type: "explain",
          title: "➕➖ Add and Remove",
          content: `**add()** - add an element
**remove()** - remove (error if not found)
**discard()** - remove (OK if not found)

\`\`\`python
fruits = {"apple", "banana"}

fruits.add("strawberry")
print(fruits)  # {'apple', 'banana', 'strawberry'}

fruits.remove("banana")
print(fruits)  # {'apple', 'strawberry'}
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Add an Element!",
          task: "Add 'orange' to the set and check the count!",
          initialCode: "fruits = {\"apple\", \"banana\"}\nfruits.add(\"orange\")\nprint(f\"Number of fruits: {len(fruits)}\")",
          expectedOutput: "Number of fruits: 3",
          hint: "Use add() to add!",
          hint2: "fruits.add(\"orange\")"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 Checking Membership",
          content: `Use the **in** operator for fast lookup!

\`\`\`python
fruits = {"apple", "banana", "strawberry"}

print("apple" in fruits)   # True
print("grape" in fruits)   # False
\`\`\`

💡 Sets search **much faster** than lists!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Check Membership!",
          task: "Check if 'banana' is in the set!",
          initialCode: "fruits = {\"apple\", \"banana\", \"strawberry\"}\nprint(\"banana\" in fruits)",
          expectedOutput: "True",
          hint: "Use the in operator!",
          hint2: "\"banana\" in fruits"
        },
        {
          id: "more-methods",
          type: "explain",
          title: "🔧 More methods — update / pop / clear",
          content: `**update()** — add many elements at once
**pop()** — remove and return some element (which one is unpredictable — no order!)
**clear()** — empty the set

\`\`\`python
fruits = {"apple", "banana"}

# Add many at once (any iterable: list, tuple, another set)
fruits.update(["strawberry", "grape"])
fruits.update({"kiwi", "mango"})
print(fruits)  # 6 items, in random-looking order

# Pop one
item = fruits.pop()
print(f"popped: {item}")
print(f"left: {fruits}")  # 5

# Clear all
fruits.clear()
print(fruits)  # set()
\`\`\`

### discard vs remove revisited

\`\`\`python
s = {1, 2, 3}
s.remove(99)    # ❌ KeyError — errors if absent
s.discard(99)   # ✅ silently skips
\`\`\`

> 💡 **remove if you're sure it's there, discard if it might not be.**`
        },
        {
          id: "try-update",
          type: "tryit",
          title: "🖥️ Try It — update with many",
          task: "Merge a list of new students into the existing set with update!",
          initialCode: "current = {\"Alice\", \"Bob\", \"Charlie\"}\nnew_students = [\"Dora\", \"Eve\", \"Bob\"]   # Bob already there\n\n# Merge with update\ncurrent.___(new_students)\nprint(f\"total: {len(current)}\")",
          expectedOutput: "total: 5",
          hint: "current.update(new_students) — Bob auto-deduped.",
          hint2: "current.update(new_students)"
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ Set comprehension — one-liner sets",
          content: `If you know list comprehension \`[x for x in ...]\`, sets work the same — just curly braces.

\`\`\`python
# Squares of 1..10 (no dupes)
squares = {x * x for x in range(1, 11)}
print(squares)  # {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# Vowels in a string
vowels = {ch for ch in "hello world" if ch in "aeiou"}
print(vowels)  # {'e', 'o'}

# Score list → grade set
scores = [85, 92, 73, 88, 95, 67]
grades = {"A" if s >= 90 else "B" if s >= 80 else "C" for s in scores}
print(grades)  # {'A', 'B', 'C'} — grades that appeared
\`\`\`

> 🎯 **List comp vs set comp?**
> - Keep order + duplicates → list \`[...]\`
> - Drop duplicates + fast lookup → set \`{...}\``
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ Try It — Set comprehension",
          task: "From a word list, build a set of words with **3+ characters**!",
          initialCode: "words = [\"cat\", \"banana\", \"on\", \"pineapple\", \"a\", \"orange\"]\n\n# Set comp filtering by len >= 3\nlong_words = ___\n\nprint(sorted(long_words))  # sorted for reproducibility",
          expectedOutput: "['banana', 'orange', 'pineapple']",
          hint: "{w for w in words if len(w) >= 3}",
          hint2: "long_words = {w for w in words if len(w) >= 3}"
        }
      ]
    },
    {
      id: "ch3",
      title: "Set Operations",
      emoji: "🧮",
      steps: [
        {
          id: "set-ops",
          type: "explain",
          title: "🧮 Mathematical Set Operations!",
          content: `\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union (A or B)
print(A | B)  # {1, 2, 3, 4, 5, 6}

# Intersection (A and B)
print(A & B)  # {3, 4}

# Difference (only in A)
print(A - B)  # {1, 2}
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Find the Intersection!",
          task: "Find the number of common elements between two sets!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\ncommon = A & B\nprint(f\"Number of common elements: {len(common)}\")",
          expectedOutput: "Number of common elements: 2",
          hint: "Use the & operator for intersection!",
          hint2: "Use len() for the count"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Find the Difference!",
          task: "Find the number of elements only in A!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\nonly_A = A - B\nprint(f\"Elements only in A: {len(only_A)}\")",
          expectedOutput: "Elements only in A: 3",
          hint: "Use the - operator for difference!",
          hint2: "A - B"
        },
        {
          id: "mission-ops",
          type: "mission",
          title: "🎯 Mission: Master Set Operations!",
          task: "Fill in the 3 blanks to complete the set operations!",
          initialCode: "fruits_a = {'apple', 'banana', 'grape', 'strawberry'}\nfruits_b = {'banana', 'strawberry', 'mango', 'kiwi'}\n\n# Fruits sold by both stores (intersection)\nboth = fruits_a ___ fruits_b\nprint(f'Both: {both}')\n\n# Fruits sold only by store A (difference)\nonly_a = fruits_a ___ fruits_b\nprint(f'Only A: {only_a}')\n\n# All fruits (union)\nall_fruits = fruits_a ___ fruits_b\nprint(f'Total: {len(all_fruits)} kinds')",
          expectedOutput: "Both: {'banana', 'strawberry'}\nOnly A: {'apple', 'grape'}\nTotal: 6 kinds",
          hint: "Intersection &, Difference -, Union |",
          hint2: "& / - / |"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of {1, 2, 3} | {3, 4, 5}?",
          options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "Error"],
          answer: 1,
          explanation: "| is the union operator! It combines all elements."
        },
        {
          id: "symmetric-diff",
          type: "explain",
          title: "⚡ ^ operator — Symmetric difference",
          content: `Beyond union/intersection/difference there's one more — \`^\` (caret).

\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A ^ B)   # {1, 2, 5, 6}
\`\`\`

→ "**in exactly one of them**" — both-sides items (3, 4) excluded.

### Real use — comparing two rosters

\`\`\`python
yesterday = {"Alice", "Bob", "Charlie"}
today     = {"Bob", "Charlie", "Dora"}

different = yesterday ^ today
print(different)
# {"Alice", "Dora"} — connected only on one of the two days
\`\`\`

| Operator | Meaning | Method form |
|---|---|---|
| \`A \\| B\` | union | \`A.union(B)\` |
| \`A & B\` | intersection | \`A.intersection(B)\` |
| \`A - B\` | difference (A only) | \`A.difference(B)\` |
| \`A ^ B\` | symmetric diff (one only) | \`A.symmetric_difference(B)\` |

> 💡 The method form accepts **list arguments** too, sometimes handy. Operator form requires both sides to be sets.`
        },
        {
          id: "try-symmetric",
          type: "tryit",
          title: "🖥️ Try It — Symmetric difference",
          task: "From two club rosters, find students in **only one** club using ^!",
          initialCode: "soccer = {\"Alice\", \"Bob\", \"Charlie\", \"Dora\"}\nbasketball = {\"Charlie\", \"Dora\", \"Eve\", \"Frank\"}\n\n# Students in only one club\nonly_one = ___\n\nprint(sorted(only_one))",
          expectedOutput: "['Alice', 'Bob', 'Eve', 'Frank']",
          hint: "soccer ^ basketball",
          hint2: "only_one = soccer ^ basketball"
        },
        {
          id: "subset-explain",
          type: "explain",
          title: "📐 Subset checks — <=, <, >=, >",
          content: `**Is A entirely contained in B?** Subset checks.

\`\`\`python
students = {"Alice", "Bob", "Charlie", "Dora"}
book_club = {"Bob", "Dora"}

# Is book_club ⊆ students?
print(book_club <= students)   # True
print(book_club < students)    # True (proper subset)
print(book_club == students)   # False (not equal)
\`\`\`

| Operator | Meaning |
|---|---|
| \`A <= B\` | A is a **subset** of B (equal OK) |
| \`A < B\` | A is a **proper subset** (A ≠ B) |
| \`A >= B\` | A is a **superset** of B (equal OK) |
| \`A > B\` | A is a **proper superset** |
| \`A.isdisjoint(B)\` | empty intersection? (no overlap) |

### Real use — permission check

\`\`\`python
required = {"read", "write"}
user_perms = {"read", "write", "admin"}

if required <= user_perms:
    print("access granted")
else:
    print("missing permission")
\`\`\``
        },
        {
          id: "try-subset",
          type: "tryit",
          title: "🖥️ Try It — Subset",
          task: "Check if you have all ingredients to make a recipe! (recipe ⊆ pantry)",
          initialCode: "pantry = {\"flour\", \"sugar\", \"butter\", \"egg\", \"milk\", \"vanilla\"}\npancake = {\"flour\", \"egg\", \"milk\"}\n\n# Can we make it?\ncan_make = ___\n\nif can_make:\n    print(\"You can make pancakes!\")\nelse:\n    print(\"Missing ingredients\")",
          expectedOutput: "You can make pancakes!",
          hint: "pancake <= pantry",
          hint2: "can_make = pancake <= pantry"
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
          title: "🏆 Mission 1 — Common / total across two classes",
          task: "Find the number of common students and total students between two classes!",
          initialCode: "class_a = {\"Alice\", \"Bob\", \"Charlie\", \"Diana\"}\nclass_b = {\"Bob\", \"Charlie\", \"Eve\", \"Frank\"}\n\n# Common students (intersection)\ncommon = class_a ___ class_b\n\n# All students (union)\nall_students = class_a ___ class_b\n\nprint(f\"Class A students: {len(class_a)}\")\nprint(f\"Class B students: {len(class_b)}\")\nprint(f\"Common students: {len(common)}\")\nprint(f\"Total students: {len(all_students)}\")",
          expectedOutput: "Class A students: 4\nClass B students: 4\nCommon students: 2\nTotal students: 6",
          hint: "& is intersection, | is union!",
          hint2: "Use len() to check the count"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Friend recommendations (mutual friends)",
          task: "From your friend's friends, who are people **you don't know yet**? Recommend candidates.",
          initialCode: "my_friends = {\"Alice\", \"Bob\", \"Charlie\"}\nbobs_friends = {\"Alice\", \"Charlie\", \"Dora\", \"Eve\", \"Frank\"}\n\n# People Bob knows that I don't = recommendations\nrecs = ___\n\nprint(sorted(recs))",
          expectedOutput: "['Dora', 'Eve', 'Frank']",
          hint: "bobs_friends - my_friends (Bob knows but I don't).",
          hint2: "recs = bobs_friends - my_friends"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Duplicate count from input",
          task: "Read space-separated words and print the **unique count** and **duplicate count**.",
          initialCode: "words = input().split()\n\n# 1) unique count = len(set(words))\n# 2) duplicates = total - unique\n\nunique = ___\nduplicates = ___\n\nprint(f\"total: {len(words)}\")\nprint(f\"unique: {unique}\")\nprint(f\"duplicates: {duplicates}\")",
          expectedOutput: "total: 8\nunique: 5\nduplicates: 3",
          stdin: "apple pear apple kiwi pear banana apple kiwi",
          hint: "len(set(words)) is unique count. duplicates = total - unique.",
          hint2: "unique = len(set(words))\nduplicates = len(words) - unique"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Sets \`{}\`** — no duplicates, no order, fast \`in\` lookup
✅ **Empty-set trap** — \`{}\` is a dict! Empty set is \`set()\`
✅ **list/set/tuple comparison** — when to pick which
✅ **add / remove / discard / pop / clear / update** — set methods
✅ **Set comprehension** — \`{x for x in ...}\`
✅ **Union \`|\`, intersection \`&\`, difference \`-\`, symmetric diff \`^\`**
✅ **Subset \`<=\`, \`>=\`, \`<\`, \`>\`, \`isdisjoint\`** — permission / recipe checks
✅ **Real use** — dedupe, recommendations (common/diff), roster comparison

Next time we'll learn about **slicing**! 🚀`
        }
      ]
    }
  ]
}
