// ============================================
// Lesson 20: Dictionaries
// ============================================
import { LessonData } from './types'

export const lesson20EnData: LessonData = {
  id: "20",
  title: "Dictionaries",
  emoji: "📖",
  description: "Store data using key-value pairs!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Dictionary?",
      emoji: "📖",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📖 Look It Up Like a Dictionary!",
          content: `Just like looking up a word in a real dictionary!

**Dictionary** = a data structure that finds values by keys

\`\`\`python
person = {
    "name": "Alice",
    "age": 15,
    "school": "Python Middle School"
}

print(person["name"])  # Alice
print(person["age"])   # 15
\`\`\`

Uses the format **{key: value, key: value, ...}**!

### Where do you meet this?

- **Name → info**: student name → score, user ID → profile
- **Frequency counts**: word → count, score → student count
- **JSON data**: the default shape of web data
- **Configs**: option name → value ("volume": 50, "darkMode": True)
- **Grouping**: class → roster, category → product list

If a list is "lining up in order", a dict is "labeling and organizing".`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ Ways to create + key rules",
          content: `\`\`\`python
# 1) Curly braces — most common
person = {"name": "Alice", "age": 15}

# 2) dict() function — keyword args
person = dict(name="Alice", age=15)
# Only works when keys are valid identifiers

# 3) Empty dict
empty = {}        # ✅ empty dict
empty = dict()    # ✅ same

# 4) From a list of pairs
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)   # {"a": 1, "b": 2, "c": 3}

# 5) fromkeys — initialize with same value
d = dict.fromkeys(["A", "B", "C"], 0)
# {"A": 0, "B": 0, "C": 0} — useful for counters
\`\`\`

### ⚠️ Keys must be immutable!

\`\`\`python
{"a": 1}        # ✅ string OK
{1: "one"}      # ✅ int OK
{(1, 2): "pt"}  # ✅ tuple OK (immutable)
{[1, 2]: "x"}   # ❌ list NOT allowed — TypeError!
{{1, 2}: "x"}   # ❌ set NOT allowed
\`\`\`

Keys must be unchangeable. Values can be anything — list, set, even another dict.

> 🎯 **Empty \`{}\` is a dict** (not a set). Empty set is \`set()\`.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Look up values in a dictionary!",
          initialCode: "student = {\n    \"name\": \"Bob\",\n    \"score\": 95,\n    \"class\": \"A\"\n}\n\nprint(student[\"name\"])\nprint(student[\"score\"])",
          expectedOutput: "Bob\n95",
          hint: "Use dict[key] to find a value!",
          hint2: "student[\"name\"]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "How do you look up a value in a dictionary?",
          options: ["dict[0]", "dict[key]", "dict(key)", "dict.key"],
          answer: 1,
          explanation: "Use dict[key] to find the value for that key!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Modifying Dictionaries",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ Adding and Modifying",
          content: `**Adding/Modifying values:**
\`\`\`python
person = {"name": "Alice"}

# Add
person["age"] = 15

# Modify
person["name"] = "Bob"

print(person)
# {'name': 'Bob', 'age': 15}
\`\`\`

If the key doesn't exist, it **adds** it. If it does, it **updates** it!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Adding Values!",
          task: "Add 'hobby' to the dictionary!",
          initialCode: "person = {\"name\": \"Alice\", \"age\": 15}\nperson[\"hobby\"] = \"gaming\"\nprint(person)",
          expectedOutput: "{'name': 'Alice', 'age': 15, 'hobby': 'gaming'}",
          hint: "Assigning to a new key adds it!",
          hint2: "person[\"hobby\"] = \"gaming\""
        },
        {
          id: "del-explain",
          type: "explain",
          title: "🗑️ Deleting Entries",
          content: `Delete with **del** or **pop()**:

\`\`\`python
person = {"name": "Alice", "age": 15}

# Delete with del
del person["age"]

# Delete with pop() (returns the value)
name = person.pop("name")
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Deleting Values!",
          task: "Delete the 'age' key!",
          initialCode: "person = {\"name\": \"Alice\", \"age\": 15, \"school\": \"Middle School\"}\ndel person[\"age\"]\nprint(person)",
          expectedOutput: "{'name': 'Alice', 'school': 'Middle School'}",
          hint: "Use the format del dict[key] to delete!",
          hint2: "del person[\"age\"]"
        },
        {
          id: "pop-safe",
          type: "explain",
          title: "🛡️ Safe deletion — pop with default",
          content: `\`del\` and \`pop()\` error if the key doesn't exist. **pop with a default** is safe.

\`\`\`python
person = {"name": "Alice"}

# ❌ Errors — key missing
del person["age"]            # KeyError
person.pop("age")            # KeyError

# ✅ Safe pop — second arg is default
result = person.pop("age", None)
print(result)   # None — no error
\`\`\`

### popitem() — pop the last pair

\`\`\`python
person = {"name": "Alice", "age": 15, "school": "middle"}

key, val = person.popitem()
print(key, val)   # school middle — last pair
print(person)     # {"name": "Alice", "age": 15}
\`\`\`

### clear() — empty all

\`\`\`python
person.clear()
print(person)   # {}
\`\`\``
        },
        {
          id: "update-method",
          type: "explain",
          title: "🔀 update — Merge dictionaries",
          content: `**update()** merges another dict's key-value pairs in.

\`\`\`python
person = {"name": "Alice", "age": 15}
extra  = {"school": "middle", "hobby": "soccer"}

person.update(extra)
print(person)
# {'name': 'Alice', 'age': 15, 'school': 'middle', 'hobby': 'soccer'}
\`\`\`

### Same key gets overwritten

\`\`\`python
person = {"name": "Alice", "age": 15}
update = {"age": 16, "school": "middle"}

person.update(update)
print(person)
# {'name': 'Alice', 'age': 16, 'school': 'middle'}  ← age becomes 16
\`\`\`

### Keyword args also work

\`\`\`python
person = {"name": "Alice"}
person.update(age=15, school="middle")
\`\`\`

> 💡 **Dict merge \`|\`** (Python 3.9+):
> \`\`\`python
> merged = person | extra   # new dict
> person |= extra            # same as update
> \`\`\``
        },
        {
          id: "try-update",
          type: "tryit",
          title: "🖥️ Try It — merge with update",
          task: "Add extra info to a student dict using update!",
          initialCode: "student = {\"name\": \"Bob\", \"age\": 14}\nextra = {\"school\": \"middle\", \"grade\": 2, \"age\": 15}   # age overrides\n\n# Merge with update\nstudent.___(extra)\nprint(student)",
          expectedOutput: "{'name': 'Bob', 'age': 15, 'school': 'middle', 'grade': 2}",
          hint: "student.update(extra) — same key overwrites.",
          hint2: "student.update(extra)"
        }
      ]
    },
    {
      id: "ch3",
      title: "Dictionary Methods",
      emoji: "🔧",
      steps: [
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 Useful Methods",
          content: `**keys()** - all keys
**values()** - all values
**items()** - key-value pairs

\`\`\`python
person = {"name": "Alice", "age": 15}

print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 15])
print(person.items())   # dict_items([('name', 'Alice'), ...])
\`\`\`

**get()** - safely retrieve a value
\`\`\`python
print(person.get("name"))  # Alice
print(person.get("job"))   # None (no error!)
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Iterating a Dictionary!",
          task: "Print all key-value pairs!",
          initialCode: "scores = {\"Korean\": 90, \"English\": 85, \"Math\": 95}\n\nfor subject, score in scores.items():\n    print(f\"{subject}: {score} pts\")",
          expectedOutput: "Korean: 90 pts\nEnglish: 85 pts\nMath: 95 pts",
          hint: "Use items() to iterate over key-value pairs!",
          hint2: "for key, value in dict.items():"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ keys, values, get!",
          task: "Try using various dictionary methods!",
          initialCode: "menu = {'Chicken': 18000, 'Pizza': 20000, 'Burger': 7000, 'Tteokbokki': 4000}\n\n# Menu names only (keys)\nprint('=== Menu List ===')\nfor name in menu.keys():\n    print(f'  {name}')\n\n# Prices only (values)\nprices = list(menu.values())\nprint(f'\\nAverage price: {sum(prices)//len(prices)} won')\n\n# Safe lookup (get)\nprint(f'\\nChicken: {menu.get(\"Chicken\")} won')\nprint(f'Sushi: {menu.get(\"Sushi\", \"not on menu\")}')",
          expectedOutput: "=== Menu List ===\n  Chicken\n  Pizza\n  Burger\n  Tteokbokki\n\nAverage price: 12250 won\n\nChicken: 18000 won\nSushi: not on menu",
          hint: "keys() for keys, values() for values, get() returns no error even if missing!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "mission-method",
          type: "mission",
          title: "🎯 Mission: Dictionary Methods!",
          task: "Fill in the 3 blanks to complete the grade analysis!",
          initialCode: "grades = {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'Diana': 96}\n\n# Print all student names\nfor name in grades.___():\n    print(f'Student: {name}')\n\n# Calculate average from all scores\nscores = list(grades.___())\navg = sum(scores) // len(scores)\nprint(f'\\nAverage: {avg} pts')\n\n# Safely look up a missing student\nresult = grades.___(\"Eve\", \"not found\")\nprint(f'Eve: {result}')",
          expectedOutput: "Student: Alice\nStudent: Bob\nStudent: Charlie\nStudent: Diana\n\nAverage: 87 pts\n\nEve: not found",
          hint: "keys() for names, values() for scores, get() for safe access!",
          hint2: "keys / values / get"
        },
        {
          id: "in-check",
          type: "explain",
          title: "🔍 in — Check key existence",
          content: `\`in\` checks **keys**, not values.

\`\`\`python
person = {"name": "Alice", "age": 15}

print("name" in person)      # True — key check
print("Alice" in person)     # False — values not checked

# To check values, go through values()
print("Alice" in person.values())   # True
\`\`\`

### Safe access patterns

\`\`\`python
# Pattern 1) check first with in
if "name" in person:
    print(person["name"])

# Pattern 2) one-shot with get()
print(person.get("name", "no name"))
\`\`\`

Same result, but \`get\` is one line.

> 🎯 One-liner: **For existence only use \`in\`; to also fetch the value use \`get\`.**`
        },
        {
          id: "counter-pattern",
          type: "explain",
          title: "📊 Frequency counter — dict's classic pattern",
          content: `"How many times did this word appear?" Frequency counting is the most common dict use case.

\`\`\`python
words = ["apple", "pear", "apple", "kiwi", "pear", "apple"]

# Pattern 1) safe +1 with get
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1
print(count)  # {'apple': 3, 'pear': 2, 'kiwi': 1}
\`\`\`

\`get(w, 0)\` = "if there, return value; else 0". Then +1.

### Shorter — collections.Counter

\`\`\`python
from collections import Counter
count = Counter(words)
print(count)
# Counter({'apple': 3, 'pear': 2, 'kiwi': 1})

# Top 2
print(count.most_common(2))
# [('apple', 3), ('pear', 2)]
\`\`\`

\`Counter\` is a special dict, optimized for counting.

### setdefault — another pattern

\`\`\`python
count = {}
for w in words:
    count.setdefault(w, 0)
    count[w] += 1
\`\`\`

\`setdefault(key, default)\` = "if missing, set it to default and return that". Useful especially for empty list starts.`
        },
        {
          id: "try-counter",
          type: "tryit",
          title: "🖥️ Try It — Letter frequency",
          task: "Count letter frequency in a string and find the most-frequent letter!",
          initialCode: "text = \"banana\"\n\n# Count\ncount = {}\nfor ch in text:\n    count[ch] = count.___(ch, ___) + 1\n\nprint(count)\n\n# Most-frequent (max value's key)\ntop = max(count, key=count.get)\nprint(f\"top: {top} ({count[top]} times)\")",
          expectedOutput: "{'b': 1, 'a': 3, 'n': 2}\ntop: a (3 times)",
          hint: "count.get(ch, 0) + 1 — start at 0 if missing.",
          hint2: "count[ch] = count.get(ch, 0) + 1"
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ Dict comprehension — one-liner builds",
          content: `\`{key: value for ... in ...}\` builds a dict in one line.

\`\`\`python
# 1) Square table 1..5
squares = {n: n*n for n in range(1, 6)}
print(squares)
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 2) Score → grade
scores = {"Alice": 85, "Bob": 92, "Charlie": 73}
grades = {name: ("A" if s >= 90 else "B" if s >= 80 else "C")
          for name, s in scores.items()}
print(grades)
# {'Alice': 'B', 'Bob': 'A', 'Charlie': 'C'}

# 3) Flip key-value
d = {"a": 1, "b": 2, "c": 3}
flipped = {v: k for k, v in d.items()}
print(flipped)
# {1: 'a', 2: 'b', 3: 'c'}
\`\`\`

The dict version of list comprehension. Powerful once you're used to it.`
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ Try It — dict comprehension",
          task: "Zip a names list and a scores list into a student-score dict!",
          initialCode: "names = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = [85, 92, 78]\n\n# zip + dict comp\nresult = {___ for name, score in zip(names, scores)}\n\nprint(result)",
          expectedOutput: "{'Alice': 85, 'Bob': 92, 'Charlie': 78}",
          hint: "{name: score for name, score in zip(names, scores)}",
          hint2: "result = {name: score for name, score in zip(names, scores)}"
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
          title: "🏆 Mission 1 — Vocabulary lookup",
          task: "Look up a word in the vocabulary dictionary!",
          initialCode: "dictionary = {\n    \"apple\": \"a round fruit\",\n    \"banana\": \"a yellow fruit\",\n    \"cherry\": \"a small red fruit\"\n}\n\nword = \"apple\"\nif word ___ dictionary:\n    print(f\"{word} = {dictionary[___]}\")\nelse:\n    print(\"Word not found\")",
          expectedOutput: "apple = a round fruit",
          hint: "Use 'in' to check if a key exists!",
          hint2: "word in dictionary"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Student grades analysis",
          task: "From a name→score dict, output **average, top student, list of passing students (≥60)**.",
          initialCode: "grades = {\"Alice\": 85, \"Bob\": 92, \"Charlie\": 55, \"Dora\": 78, \"Eve\": 60}\n\n# Average (1 decimal)\nscores = list(grades.values())\navg = sum(scores) / len(scores)\nprint(f\"avg: {avg:.1f}\")\n\n# Top student — max + key=...\ntop = max(grades, key=___)\nprint(f\"top: {top} ({grades[top]})\")\n\n# Passing students (≥60)\npassed = [name for name, s in grades.items() if s >= ___]\nprint(f\"passed: {sorted(passed)}\")",
          expectedOutput: "avg: 74.0\ntop: Bob (92)\npassed: ['Alice', 'Bob', 'Dora', 'Eve']",
          hint: "max(grades, key=grades.get) for top by score. Pass line is 60.",
          hint2: "top = max(grades, key=grades.get)\npassed = [name for name, s in grades.items() if s >= 60]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Word frequency from input",
          task: "Read space-separated words from input and print **count per word** + **most frequent**.",
          initialCode: "words = input().split()\n\n# Count frequency\ncount = {}\nfor w in words:\n    count[w] = count.___(w, 0) + 1\n\nprint(\"=== freq ===\")\nfor w in sorted(count):   # alphabetic order\n    print(f\"{w}: {count[w]}\")\n\n# Most frequent\ntop = max(count, key=count.get)\nprint(f\"\\ntop: {top} ({count[top]}x)\")",
          expectedOutput: "=== freq ===\napple: 3\nkiwi: 1\npear: 2\n\ntop: apple (3x)",
          stdin: "apple pear apple kiwi pear apple",
          hint: "Use the count.get(w, 0) + 1 pattern.",
          hint2: "count[w] = count.get(w, 0) + 1"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Dictionary \`{ }\`** — key:value pairs, fast lookup by name
✅ **Creation forms** — \`{...}\`, \`dict()\`, \`fromkeys()\`
✅ **Key rules** — immutable only (str, int, tuple OK / list NO)
✅ **dict[key]** vs **get(key, default)** — safe access
✅ **Add / modify / delete** — \`dict[key] = value\`, \`del\`, \`pop(key, default)\`, \`clear()\`
✅ **update / popitem** — merge / pop last
✅ **keys / values / items** — iteration methods
✅ **in check** — key existence (values via \`values()\`)
✅ **Counter pattern** — \`count[w] = count.get(w, 0) + 1\`
✅ **dict comprehension** — \`{k: v for ... in ...}\`
✅ **Real use** — grade analysis, word frequency, vocabulary

Next time, we'll learn about **sets**! 🚀 — keys-only version of a dictionary.`
        }
      ]
    }
  ]
}
