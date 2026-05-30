// ============================================
// Lesson 12: Advanced Conditionals
// ============================================
import { LessonData } from './types'

export const lesson12EnData: LessonData = {
  id: "12",
  title: "Advanced Conditionals",
  emoji: "🔀",
  description: "Combine conditions with and / or / not!",
  chapters: [
    {
      id: "ch1",
      title: "Logical Operators",
      emoji: "🔗",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 When One Condition Isn't Enough",
          content: `Some amusement-park rides need you to be **140cm or taller AND 8 or older**. Two conditions!

Meet the three connectors:
- **and** — both must be true
- **or** — at least one is true
- **not** — flips true/false

Today we make friends with all three!`
        },
        {
          id: "and-explain",
          type: "explain",
          title: "🔗 and — Both Must Be True",
          content: `Both sides must be **True** for the whole thing to be True.

\`\`\`python
age = 15
# Teenager: 13 or older AND under 19
if age >= 13 and age < 19:
    print("You are a teenager")
\`\`\`

| Left | and | Right | Result |
|---|---|---|---|
| True | and | True | **True** ✅ |
| True | and | False | False ❌ |
| False | and | True | False ❌ |
| False | and | False | False ❌ |

➡️ **One False makes the whole thing False.**`
        },
        {
          id: "or-explain",
          type: "explain",
          title: "🔗 or — At Least One",
          content: `Only **one** side needs to be True.

\`\`\`python
day = "Saturday"
# Weekend: Saturday or Sunday
if day == "Saturday" or day == "Sunday":
    print("Weekend!")
\`\`\`

| Left | or | Right | Result |
|---|---|---|---|
| True | or | True | True ✅ |
| True | or | False | True ✅ |
| False | or | True | True ✅ |
| False | or | False | **False** ❌ |

➡️ **One True makes the whole thing True.**`
        },
        {
          id: "circuit-andor",
          type: "interactive",
          title: "🎬 Feel It with Switches — and / or",
          description: "Flip switches A and B. With AND both must be ON; with OR even one ON lights the bulb!",
          component: "pyAndOrCircuit",
          componentProps: { initialMode: "and" }
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It — and",
          task: "Pass if the score is 80 or above AND 100 or below!",
          initialCode: "score = 85\n\n# Pass only when both are true\nif score >= 80 ___ score <= 100:\n    print(\"Pass!\")\nelse:\n    print(\"Fail\")",
          expectedOutput: "Pass!",
          hint: "Both true? → and!",
          hint2: "and"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It — or",
          task: "Discount if VIP OR has a coupon!",
          initialCode: "is_vip = False\nhas_coupon = True\n\n# Either one true → discount\nif is_vip ___ has_coupon:\n    print(\"10% discount!\")\nelse:\n    print(\"Full price\")",
          expectedOutput: "10% discount!",
          hint: "Either one? → or!",
          hint2: "or"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is `True and False`?",
          options: ["True", "False", "Error", "None"],
          answer: 1,
          explanation: "With and, **both** must be True. One False → False!"
        }
      ]
    },
    {
      id: "ch2",
      title: "not and Precedence",
      emoji: "🔄",
      steps: [
        {
          id: "not-explain",
          type: "explain",
          title: "🔄 not — Flip It",
          content: `**not** flips True ↔ False.

\`\`\`python
is_raining = False

if not is_raining:
    print("Let's go for a walk!")  # Not raining → prints ✅
\`\`\`

| Original | → | not |
|---|---|---|
| True | → | False |
| False | → | True |

💡 Use **not** when you mean "**if NOT ...**".`
        },
        {
          id: "circuit-not",
          type: "interactive",
          title: "🎬 Feel It with Switches — not",
          description: "Click the NOT mode button above. ON makes the bulb OFF — that's a flip!",
          component: "pyAndOrCircuit",
          componentProps: { initialMode: "not" }
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It — not",
          task: "If NOT logged in, print a message!",
          initialCode: "is_logged_in = False\n\n# Think of the operator that flips a condition\nif ___ is_logged_in:\n    print(\"Please log in\")",
          expectedOutput: "Please log in",
          hint: "The operator that flips true/false!",
          hint2: "not is_logged_in"
        },
        {
          id: "complex-explain",
          type: "explain",
          title: "🧩 Combining All Three — Parentheses are Safe",
          content: `You can mix all three:

\`\`\`python
age = 25
has_license = True

# 18 or older AND has a license
if age >= 18 and has_license:
    print("You can drive!")
\`\`\`

**Precedence:** \`not\` → \`and\` → \`or\`

Like × runs before + in math, **and runs before or**.
If you're unsure, **wrap with parentheses \`( )\`** — always safe!

\`\`\`python
# Teen (13-19) OR student → discount
if (age >= 13 and age <= 19) or is_student:
    print("Discount!")
\`\`\``
        },
        {
          id: "predict-precedence",
          type: "predict",
          title: "💭 Precedence — Which Runs First?",
          content: "What does this print?\n\n```python\na = True\nb = False\nc = True\n\nif a or b and c:\n    print(\"yes\")\nelse:\n    print(\"no\")\n```",
          options: ["yes", "no", "Error", "None"],
          answer: 0,
          explanation: "**and runs before or!** So `b and c` first → `False and True` → `False`. Then `a or False` → `True or False` → **True** → prints 'yes'. To avoid confusion, write it as `a or (b and c)`."
        },
        {
          id: "predict-short-circuit",
          type: "predict",
          title: "💭 How Far Does or Look?",
          content: "What does this print?\n\n```python\nis_vip = True\nhas_coupon = False\n\nif is_vip or has_coupon:\n    print(\"Discount!\")\n```",
          options: ["Discount!", "Nothing prints", "Error", "True"],
          answer: 0,
          explanation: "**or stops early if the left side is already True** — the answer can't change. This is called **short-circuit evaluation**. and works the same way — if the left is False, it skips the right. Python is smart about quitting early!"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It — Use Parentheses",
          task: "If aged 13-19 OR a student, print 'Discount applied!'",
          initialCode: "age = 20\nis_student = True\n\n# (teenager) OR (student)\nif (age >= 13 ___ age <= 19) ___ is_student:\n    print(\"Discount applied!\")\nelse:\n    print(\"Full price\")",
          expectedOutput: "Discount applied!",
          hint: "Inside parentheses both must hold / outside, either side is fine.",
          hint2: "and / or"
        }
      ]
    },
    {
      id: "ch3",
      title: "Nested if and in",
      emoji: "📦",
      steps: [
        {
          id: "nested-explain",
          type: "explain",
          title: "📦 if Inside if",
          content: `You can put an if inside another if. **Match the indentation like stairs!**

\`\`\`python
has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("Adult admission")
    else:
        print("Youth admission")
else:
    print("Please buy a ticket")
\`\`\`

💡 Too deep (3, 4 levels) gets hard to read. **2 levels is comfortable.**`
        },
        {
          id: "in-explain",
          type: "explain",
          title: "📝 in — Is It Inside?",
          content: `**in** checks whether something is contained.

\`\`\`python
if "a" in "apple":
    print("'a' is in there!")  # ✅
\`\`\`

**not in** is the opposite — "not contained":

\`\`\`python
if "z" not in "hello":
    print("no 'z'!")  # ✅
\`\`\`

💡 \`in\` also works with lists — **we'll learn lists in a later lesson!**`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It — in",
          task: "Check if \"y\" is inside the word!",
          initialCode: "word = \"python\"\n\n# The operator that checks containment!\nif \"y\" ___ word:\n    print(\"y is in there!\")\nelse:\n    print(\"no y\")",
          expectedOutput: "y is in there!",
          hint: "The contains operator!",
          hint2: "in"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is `\"abc\" in \"abcdef\"`?",
          options: ["True", "False", "Error", "\"abc\""],
          answer: 0,
          explanation: "\"abcdef\" contains \"abc\", so → True!"
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
          title: "🏆 Final Mission — Login System",
          task: "Username right, password right, account active — all three must be true to log in!",
          initialCode: "username = \"admin\"\npassword = \"1234\"\nis_active = True\n\n# All three must be true!\nif username == \"admin\" ___ password == \"1234\" ___ is_active:\n    print(\"Login successful!\")\nelse:\n    print(\"Login failed\")",
          expectedOutput: "Login successful!",
          hint: "All three? → same connector twice!",
          hint2: "and / and"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 What We Learned",
          content: `✅ **and** — both must be true
✅ **or** — at least one true
✅ **not** — flip true/false
✅ **Precedence:** not → and → or. Use **parentheses** when unsure!
✅ **Short-circuit** — and / or stop early once the answer is decided
✅ **Nested if** — if inside if (2 levels feels best)
✅ **in** — is it contained?

Next time: **loops (for)** — do the same thing many times! 🚀`
        }
      ]
    }
  ]
}
