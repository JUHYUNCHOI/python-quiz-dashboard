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
          title: "📖 Dictionary (dict) — Find by Name Tag",
          content: `**Dictionary (dict)** = find a **value** using a **key (name tag)**.

🎒 Think: an English dictionary. Look up "apple" (key) → get the meaning "a round fruit" (value).

\`\`\`python
person = {
    "name": "Alice",
    "age": 15,
    "school": "Python Middle School"
}

print(person["name"])  # Alice
print(person["age"])   # 15
\`\`\`

Format: **\`{key: value, key: value, ...}\`**

### Where do you meet this?

- **Name → info**: student name → score, user ID → profile
- **Frequency counting**: word → count
- **JSON data**: default shape of web data
- **Configs**: \`"volume": 50, "darkMode": True\`
- **Grouping**: class → roster

If a list is "lining up in order", a dict is "**labeling and organizing**".`
        },
        {
          id: "viz-builder",
          type: "interactive",
          title: "🎬 Sim: Watch a Dictionary Get Built",
          component: "pyDictBuilder",
          description: "See a dict get built step by step. Press each button to advance!"
        },
        {
          id: "viz-tryit",
          type: "tryit",
          title: "🖥️ After the Sim — Build a Student Dict",
          task: "Build a student info dict, then print the name and score!",
          initialCode: "student = {\n    \"name\": \"Mia\",\n    \"score\": 88\n}\n\nprint(student[\"name\"])\nprint(student[\"score\"])",
          expectedOutput: "Mia\n88",
          hint: "student[\"name\"] / student[\"score\"] pulls each value out!",
          hint2: "Run the code as-is → 'Mia' / 88."
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ Ways to Create + Key (name tag) Rules",
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
          title: "🖥️ Look Up Values — name / score",
          task: "Pull the name and score from the dictionary!",
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
          title: "✏️ Slot In + Overwrite",
          content: `**\`dict[key] = value\`** is one line for both adding and modifying.

\`\`\`python
person = {"name": "Alice"}

# New tag → adds
person["age"] = 15

# Existing tag → overwrites
person["name"] = "Bob"

print(person)
# {'name': 'Bob', 'age': 15}
\`\`\`

🎒 Think: writing a new word in your dictionary (adding) vs editing an existing word's meaning (modifying). Same syntax \`dict[key] = value\`.

> 🎯 One-liner: **missing key → add, existing key → overwrite.**`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Add a Value — slot in 'hobby'",
          task: "Add a new tag 'hobby' to the dictionary!",
          initialCode: "person = {\"name\": \"Alice\", \"age\": 15}\nperson[\"hobby\"] = \"gaming\"\nprint(person)",
          expectedOutput: "{'name': 'Alice', 'age': 15, 'hobby': 'gaming'}",
          hint: "Assigning to a new key adds it!",
          hint2: "person[\"hobby\"] = \"gaming\""
        },
        {
          id: "del-explain",
          type: "explain",
          title: "🗑️ Remove — del / pop",
          content: `Use \`del\` or \`pop()\` to remove a tag + its value.

\`\`\`python
person = {"name": "Alice", "age": 15}

# del — just remove
del person["age"]

# pop() — remove AND get the value
name = person.pop("name")
print(name)   # Alice
\`\`\`

> 💡 \`pop\` = "remove and grab the value as you go". For plain remove, \`del\` is enough.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Remove a Value — drop 'age'",
          task: "Remove the 'age' tag from the dictionary!",
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
          title: "🖥️ update — Merge Two Dicts",
          task: "Merge extra info into a student dict using update — combine into one!",
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
          title: "🔧 keys / values / items / get — The Big Four",
          content: `Memorize these four and you've covered 90% of dict usage.

\`\`\`python
person = {"name": "Alice", "age": 15}

print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 15])
print(person.items())   # dict_items([('name', 'Alice'), ('age', 15)])
\`\`\`

- **keys()** — all **name tags**
- **values()** — all **values**
- **items()** — **(tag, value) bundles** — most used inside for loops

### get() — safe lookup

\`\`\`python
print(person.get("name"))           # Alice
print(person.get("job"))            # None — no error
print(person.get("job", "none"))    # "none" — default value
\`\`\`

\`dict["missing key"]\` errors out, but \`dict.get(...)\` **quietly returns None or a default**.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Iterate a Dict — items for subject/score",
          task: "Use items() to print all (subject, score) pairs!",
          initialCode: "scores = {\"Korean\": 90, \"English\": 85, \"Math\": 95}\n\nfor subject, score in scores.items():\n    print(f\"{subject}: {score} pts\")",
          expectedOutput: "Korean: 90 pts\nEnglish: 85 pts\nMath: 95 pts",
          hint: "Use items() to iterate over key-value pairs!",
          hint2: "for key, value in dict.items():"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ keys / values / get — Menu Analysis",
          task: "Use keys/values/get together on a menu dict!",
          initialCode: "menu = {'Chicken': 18000, 'Pizza': 20000, 'Burger': 7000, 'Tteokbokki': 4000}\n\n# Menu names only (keys)\nprint('=== Menu List ===')\nfor name in menu.keys():\n    print(f'  {name}')\n\n# Prices only (values)\nprices = list(menu.values())\nprint(f'\\nAverage price: {sum(prices)//len(prices)} won')\n\n# Safe lookup (get)\nprint(f'\\nChicken: {menu.get(\"Chicken\")} won')\nprint(f'Sushi: {menu.get(\"Sushi\", \"not on menu\")}')",
          expectedOutput: "=== Menu List ===\n  Chicken\n  Pizza\n  Burger\n  Tteokbokki\n\nAverage price: 12250 won\n\nChicken: 18000 won\nSushi: not on menu",
          hint: "keys() for keys, values() for values, get() returns no error even if missing!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "pre-mission-method",
          type: "quiz",
          title: "❓ Decide — which method?",
          content: "**Situation: I just want to see my friends' names (not scores) — which method?**",
          options: [".keys() — keys only", ".values() — values only", ".items() — both pairs", ".get(key) — safe single value"],
          answer: 0,
          explanation: "Names only = *keys only* → `.keys()`. Scores only → `.values()`. Both paired → `.items()`. Safely fetching *one value by key* → `.get(key)`."
        },
        {
          id: "pre-mission-method-2",
          type: "quiz",
          title: "❓ Decide — safe access",
          content: "**'Look up a missing key and get None instead of an error' — which method?**",
          options: [".keys()", ".values()", ".items()", ".get(key)"],
          answer: 3,
          explanation: "`dict[missing_key]` raises a *KeyError*. `.get(missing_key)` *silently returns None*. The *safe access* pattern!"
        },
        {
          id: "mission-method",
          type: "mission",
          title: "🎯 Grade Analysis — fill keys/values/get",
          task: "Fill in the 3 blanks to complete the grade analysis!",
          initialCode: "grades = {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'Diana': 96}\n\n# Print all student names\nfor name in grades.___():\n    print(f'Student: {name}')\n\n# Calculate average from all scores\nscores = list(grades.___())\navg = sum(scores) // len(scores)\nprint(f'\\nAverage: {avg} pts')\n\n# Safely look up a missing student\nresult = grades.___(\"Eve\", \"not found\")\nprint(f'Eve: {result}')",
          expectedOutput: "Student: Alice\nStudent: Bob\nStudent: Charlie\nStudent: Diana\n\nAverage: 87 pts\n\nEve: not found",
          hint: "keys() for names, values() for scores, get() for safe access!",
          hint2: "keys / values / get"
        },
        {
          id: "in-check",
          type: "explain",
          title: "🔍 in — Is the name tag there?",
          content: `\`in\` only checks **keys (name tags)**, not values.

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
          title: "📊 Frequency Counting — dict's classic pattern",
          content: `"How many times did this word appear?" **Frequency counting** is where dictionaries truly shine.

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
          title: "🖥️ Frequency Counting — letter counts in a word",
          task: "Count each letter's frequency and find the most-frequent letter!",
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
          title: "🖥️ dict comprehension — zip names and scores",
          task: "Zip a names list and a scores list into a student-score dict in one line!",
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
          id: "pre-mission1-in-get",
          type: "quiz",
          title: "❓ Decide — in vs get",
          content: "**'Is apple in the cart?' — which tool?**",
          options: ["apple in cart (True/False)", "cart.get(apple) (value or None)", "cart[apple] (value or error)"],
          answer: 0,
          explanation: "If you only want to know *whether it's there*, `in` is cleanest. Use `.get()` when you also want the *value*."
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Mission 1 — Vocabulary Lookup (in + fetch)",
          task: "Check if a word exists, then fetch its meaning!",
          initialCode: "dictionary = {\n    \"apple\": \"a round fruit\",\n    \"banana\": \"a yellow fruit\",\n    \"cherry\": \"a small red fruit\"\n}\n\nword = \"apple\"\nif word ___ dictionary:\n    print(f\"{word} = {dictionary[___]}\")\nelse:\n    print(\"Word not found\")",
          expectedOutput: "apple = a round fruit",
          hint: "Use 'in' to check if a key exists!",
          hint2: "word in dictionary"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Average / Top / Passing Analysis",
          task: "From a name→score dict, output **average, top student, list of passing students (≥60)**.",
          initialCode: "grades = {\"Alice\": 85, \"Bob\": 92, \"Charlie\": 55, \"Dora\": 78, \"Eve\": 60}\n\n# Average (1 decimal)\nscores = list(grades.values())\navg = sum(scores) / len(scores)\nprint(f\"avg: {avg:.1f}\")\n\n# Top student — max + key=...\ntop = max(grades, key=___)\nprint(f\"top: {top} ({grades[top]})\")\n\n# Passing students (≥60)\npassed = [name for name, s in grades.items() if s >= ___]\nprint(f\"passed: {sorted(passed)}\")",
          expectedOutput: "avg: 74.0\ntop: Bob (92)\npassed: ['Alice', 'Bob', 'Dora', 'Eve']",
          hint: "max(grades, key=grades.get) for top by score. Pass line is 60.",
          hint2: "top = max(grades, key=grades.get)\npassed = [name for name, s in grades.items() if s >= 60]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Word Frequency + Top from Input",
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
