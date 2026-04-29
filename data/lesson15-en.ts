// ============================================
// Lesson 15: Data Structures Overview
// ============================================
import { LessonData } from './types'

export const lesson15EnData: LessonData = {
  id: "15",
  title: "Data Structures Overview",
  emoji: "📦",
  description: "An introduction to Python's data structures!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Data Structures?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 Ways to Organize Data",
          content: `You want to store student names!

\`\`\`python
name1 = "Alice"
name2 = "Bob"
name3 = "Charlie"
\`\`\`

What if there are 100 students? **100 variables?** 😱

With **data structures**, you can manage them all at once!`
        },
        {
          id: "solution",
          type: "explain",
          title: "✅ One List Is All You Need!",
          content: `\`\`\`python
students = ["Alice", "Bob", "Charlie"]
\`\`\`

You can store multiple items in **a single variable** like this!

Python has **4 data structures**:
- **List [ ]** - the most commonly used!
- **Tuple ( )** - cannot be modified
- **Dictionary { }** - look up by name
- **Set { }** - no duplicates

Next up: a one-table comparison 👇`
        },
        {
          id: "compare-table",
          type: "explain",
          title: "📋 4 Data Structures — At a Glance",
          content: `Key properties in one table:

| | List \`[ ]\` | Tuple \`( )\` | Dict \`{ }\` | Set \`{ }\` |
|---|---|---|---|---|
| **Order** | ✅ yes | ✅ yes | ✅ yes (3.7+) | ❌ no |
| **Duplicates** | ✅ OK | ✅ OK | keys ❌ | ❌ auto-removed |
| **Modify** | ✅ OK | ❌ no | ✅ OK | ✅ OK |
| **Index** | \`a[0]\` | \`a[0]\` | \`d["key"]\` | ❌ |
| **Create** | \`[1, 2, 3]\` | \`(1, 2, 3)\` | \`{"a": 1}\` | \`{1, 2, 3}\` |
| **Fast lookup** | ❌ slow | ❌ slow | ✅ fast | ✅ fast |

### One-line summary

- 🧊 **List**: anything ordered (cart, roster, score log)
- 🔒 **Tuple**: bundles that don't change (coords, RGB, weekdays)
- 🏷️ **Dict**: name → value (name→score, ID→info)
- ✋ **Set**: unique-only collection (signed-up IDs, tags)

> ⚠️ Dict and set both use \`{ }\` — don't mix them up!
> - \`{}\` = empty dict (NOT a set)
> - \`set()\` = empty set
> - \`{1, 2}\` = set (just values)
> - \`{"a": 1}\` = dict (key:value)`
        },
        {
          id: "creation-syntax",
          type: "explain",
          title: "🛠️ All creation syntaxes side by side",
          content: `Side-by-side creation forms.

\`\`\`python
# === List ===
fruits = ["apple", "banana"]   # most common
fruits = list()                # empty list
fruits = []                    # empty list (shortcut)
fruits = list("abc")           # ['a', 'b', 'c']

# === Tuple ===
point = (3, 5)                 # most common
point = 3, 5                   # parens optional
single = (7,)                  # single element needs comma!
empty = ()                     # empty tuple

# === Dict ===
ages = {"Alice": 15, "Bob": 14}   # most common
ages = dict()                       # empty dict
ages = {}                          # empty dict (shortcut)

# === Set ===
nums = {1, 2, 3}               # most common
nums = set([1, 2, 2, 3])       # list → set (auto-dedup)
empty = set()                  # empty set (⚠️ NOT {})
\`\`\`

> 🎯 **Memorize:**
> - Empty list \`[]\`, empty tuple \`()\`, empty dict \`{}\`, empty set \`set()\`.
> - Empty \`{}\` was claimed by dict.`
        },
        {
          id: "tryit-list-basic",
          type: "tryit",
          title: "💻 Compare the 4 Data Structures!",
          task: "Run the code to compare Python's 4 data structures!",
          initialCode: `# 1. List - ordered and modifiable!
fruits = ['apple', 'banana', 'grape']
print(f'List: {fruits}')
print(f'First: {fruits[0]}')

# 2. Tuple - ordered but NOT modifiable!
colors = (255, 0, 128)
print(f'\\nTuple: {colors}')
print(f'Red: {colors[0]}')

# 3. Dictionary - look up by name!
scores = {'Alice': 90, 'Bob': 95}
print(f'\\nDictionary: {scores}')
print(f'Bob\\'s score: {scores["Bob"]}')

# 4. Set - duplicates automatically removed!
numbers = {1, 2, 2, 3, 3, 3}
print(f'\\nSet: {numbers}')`,
          expectedOutput: `List: ['apple', 'banana', 'grape']\nFirst: apple\n\nTuple: (255, 0, 128)\nRed: 255\n\nDictionary: {'Alice': 90, 'Bob': 95}\nBob's score: 95\n\nSet: {1, 2, 3}`,
          hint: "[ ] List, ( ) Tuple, {'key': value} Dictionary, {value} Set!",
          hint2: "Just run the code as-is!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Hands-On Experience!",
      emoji: "🎮",
      steps: [
        {
          id: "interactive-intro",
          type: "explain",
          title: "🎮 Learn by Clicking Around!",
          content: `Let's experience **why each data structure is needed**!

- 🧊 **List** - Fridge (store multiple items)
- 🔒 **Tuple** - RGB Color (must not change)
- 🏷️ **Dict** - Locker (find by name)
- ✋ **Set** - Attendance (no duplicates)

On the next screen, **click each tab** to feel the difference!`
        },
        {
          id: "interactive",
          type: "interactive",
          title: "🎮 Try It Yourself!",
          component: "dataStructures",
          description: "Click each tab to experience the differences between List, Tuple, Dict, and Set!"
        },
        {
          id: "coding-dict",
          type: "coding",
          title: "📝 Build a Dictionary Yourself",
          description: "Create a dictionary that works like a locker where you look up items by name!",
          starterCode: `# Create a locker dictionary!\n# Alice: soccer ball, Bob: backpack\n\nlocker = {\n    # Write your code here\n}\n\nprint(locker["Alice"])`,
          testCases: [
            {
              expectedOutput: "soccer ball",
              description: "Alice's locker has a soccer ball!"
            }
          ],
          hints: [
            "In a dictionary, write 'name': 'value' inside { }",
            "Write it like this: 'Alice': 'soccer ball', 'Bob': 'backpack'",
            "Answer: locker = { 'Alice': 'soccer ball', 'Bob': 'backpack' }"
          ]
        },
        {
          id: "tryit-list-make",
          type: "tryit",
          title: "🖥️ Build a List — Score record",
          task: "Make a 5-element score list and print first and last!",
          initialCode: "# Make 'scores' as a list of 5 scores: 75, 88, 92, 67, 95\nscores = ___\n\nprint(f\"First: {scores[0]}\")\nprint(f\"Last: {scores[-1]}\")\nprint(f\"Count: {len(scores)}\")",
          expectedOutput: "First: 75\nLast: 95\nCount: 5",
          hint: "[ ] with comma-separated values.",
          hint2: "scores = [75, 88, 92, 67, 95]"
        },
        {
          id: "tryit-tuple-make",
          type: "tryit",
          title: "🖥️ Build a Tuple — Coordinate",
          task: "Make a coordinate (x, y) tuple and unpack it!",
          initialCode: "# Character position (3, 7) as a tuple\nposition = ___\n\nx = position[___]\ny = position[___]\nprint(f\"x: {x}, y: {y}\")",
          expectedOutput: "x: 3, y: 7",
          hint: "(3, 7) — index 0 is x, 1 is y.",
          hint2: "position = (3, 7)\nx = position[0]\ny = position[1]"
        },
        {
          id: "tryit-set-make",
          type: "tryit",
          title: "🖥️ Build a Set — Deduplication",
          task: "Use set on a visitor log to count unique visitors automatically!",
          initialCode: "visitors = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob', 'Dora', 'Alice']\n\n# set drops duplicates\nunique = ___\nprint(f\"Unique visitors: {len(unique)}\")",
          expectedOutput: "Unique visitors: 4",
          hint: "set(visitors) — auto-deduplicate.",
          hint2: "unique = set(visitors)"
        }
      ]
    },
    {
      id: "ch3",
      title: "Summary",
      emoji: "📊",
      steps: [
        {
          id: "decision-flow",
          type: "explain",
          title: "🌳 Decision flow — which one to use?",
          content: `Step-by-step decision based on situation.

\`\`\`
Q1: Need to look up by name (key)?
  ├─ Yes → Dictionary { "key": value }
  └─ No → Q2

Q2: Allow duplicates?
  ├─ No (auto-dedup wanted) → Set {1, 2, 3}
  └─ Yes → Q3

Q3: Will you modify often?
  ├─ Yes (add/remove/change) → List [1, 2, 3]
  └─ No (set once and done) → Tuple (1, 2, 3)
\`\`\`

### Real situations applied

| Situation | Step 1 | Step 2 | Step 3 | Conclusion |
|---|---|---|---|---|
| Student → score | Key-value ✅ | — | — | Dict |
| Registered IDs | Key-value X | No dups ✅ | — | Set |
| Shopping cart | Key-value X | dups OK | modify often | List |
| GPS coordinate | Key-value X | dups OK | unchanged | Tuple |
| Comment list | Key-value X | dups OK | add/remove | List |
| Days of week | Key-value X | No dups | unchanged | Tuple |

> 💡 **Unsure? Start with a list.** Switching later isn't hard.`
        },
        {
          id: "common-confusion",
          type: "explain",
          title: "🤔 Common confusion — the { } trap",
          content: `\`{ }\` is shared between **dict and set**. Easy to mix up.

### What does empty \`{ }\` mean?

\`\`\`python
empty = {}
print(type(empty))   # <class 'dict'>  ← dict!
\`\`\`

Empty \`{}\` was claimed by **dict**. For empty set, write \`set()\`.

### How to tell them apart?

\`\`\`python
{1, 2, 3}              # set — just values
{"a": 1, "b": 2}       # dict — key:value pairs
\`\`\`

→ \`:\` inside means dict, no \`:\` means set.

### Other common confusions

| Confusion | Explanation | Fix |
|---|---|---|
| List vs tuple | Both have order | Modifying? List. Else? Tuple |
| Dict key vs value | Which is which? | \`{"name": "Alice"}\` — left of \`:\` is key |
| Set vs list | They look similar | Need dedup or fast \`in\`? Set |
| Empty set | \`{}\` doesn't work | Use \`set()\` |

> 🎯 If you forget, look at the **creation form** — it tells you fast.`
        },
        {
          id: "tryit-when",
          type: "tryit",
          title: "💻 When to Use What?",
          task: "Run the examples to see which data structure fits each situation!",
          initialCode: `# Situation 1: Shopping list → List! (ordered, modifiable)
shopping = ['milk', 'bread', 'eggs']
shopping.append('cheese')
print(f'Shopping: {shopping}')

# Situation 2: Coordinates → Tuple! (must not change)
position = (37, 127)
print(f'Position: {position}')

# Situation 3: Student scores → Dictionary! (find by name)
scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78}
print(f'Bob\\'s score: {scores["Bob"]} points')

# Situation 4: Attendance check → Set! (no duplicates)
attendance = {'Alice', 'Bob', 'Alice', 'Charlie'}
print(f'Attendance: {attendance} ({len(attendance)} people)')`,
          expectedOutput: `Shopping: ['milk', 'bread', 'eggs', 'cheese']\nPosition: (37, 127)\nBob's score: 92 points\nAttendance: {'Alice', 'Bob', 'Charlie'} (3 people)`,
          hint: "Each data structure has a situation that fits it best!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which data structure is ordered AND modifiable?",
          options: ["Tuple ()", "List []", "Set {}", "Dictionary {}"],
          answer: 1,
          explanation: "Lists are ordered, allow duplicates, and are modifiable! They're the most commonly used."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which one should you use for values that must NEVER change, like RGB colors?",
          options: ["List []", "Tuple ()", "Set {}", "Dictionary {}"],
          answer: 1,
          explanation: "Tuples cannot be modified, so you can't accidentally change them!"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When you want to look up something by name, like 'What's Alice's score?'",
          options: ["List []", "Tuple ()", "Set {}", "Dictionary {}"],
          answer: 3,
          explanation: "Dictionaries let you find values instantly by their key (name)!"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission 1: Pick the Right Data Structure!",
          task: "Fill in the 3 blanks to complete the data structures!",
          initialCode: `# 1. Fruit list → List!
fruits = ___'strawberry', 'grape', 'mango']
print(f'Fruits: {fruits}')
print(f'Count: {len(fruits)} items')

# 2. Student info → Dictionary!
student = {'name': 'Alice', 'age': 15, 'hobby': 'soccer'}
print(f'Name: {student[___]}')

# 3. Remove duplicates → Set!
colors = {'red', 'blue', 'red', 'green', 'blue'}
print(f'Color types: {___(colors)} types')`,
          expectedOutput: `Fruits: ['strawberry', 'grape', 'mango']\nCount: 3 items\nName: Alice\nColor types: 3 types`,
          hint: "Lists use [, dictionaries access by key, len() counts items!",
          hint2: "[ / 'name' / len"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🎯 Mission 2: Use all 4 data structures",
          task: "Organize one student's info using all 4 data structures. Pick the right type for each slot!",
          initialCode: `# Organize student info
# 1) Student names (ordered, modifiable) → ?
students = ___["Alice", "Bob", "Charlie"]___

# 2) Coordinate (immutable bundle) → ?
school_pos = ___(37.5, 127.0)___

# 3) Student → score map → ?
scores = ___{"Alice": 85, "Bob": 92}___

# 4) Joined clubs (no duplicates) → ?
clubs = ___{"Soccer", "Reading", "Soccer"}___

print(f"Number of students: {len(students)}")
print(f"Position: {school_pos}")
print(f"Bob's score: {scores['Bob']}")
print(f"Number of clubs: {len(clubs)}")
`,
          expectedOutput: "Number of students: 3\nPosition: (37.5, 127.0)\nBob's score: 92\nNumber of clubs: 2",
          hint: "Each line already shows the right form. Just remove the ___ wrappers and check.",
          hint2: "students = [\"Alice\", \"Bob\", \"Charlie\"]\nschool_pos = (37.5, 127.0)\nscores = {\"Alice\": 85, \"Bob\": 92}\nclubs = {\"Soccer\", \"Reading\", \"Soccer\"}"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **List 🧊 \`[ ]\`** — Fridge (ordered, duplicates OK, modifiable)
✅ **Tuple 🔒 \`( )\`** — Coordinate / RGB (cannot modify!)
✅ **Dict 🏷️ \`{"key": value}\`** — Locker (find by name)
✅ **Set ✋ \`{1, 2, 3}\`** — Attendance (no duplicates, fast lookup)
✅ **Decision flow** — key? → duplicates? → modify? in order
✅ **\`{ }\` trap** — empty \`{}\` is dict; empty set is \`set()\`

Coming up over the next 4 lessons:
- Lesson 16: **List** in depth
- Lesson 19: **Tuple** in depth
- Lesson 20: **Dictionary** in depth
- Lesson 21: **Set** in depth

🚀 Next up — Lists!`
        }
      ]
    }
  ]
}
