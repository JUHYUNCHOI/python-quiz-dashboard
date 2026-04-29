// ============================================
// Lesson 4: Operators (English)
// ============================================
import { LessonData } from './types'

export const lesson4EnData: LessonData = {
  id: "4",
  title: "Operators",
  emoji: "🧮",
  description: "Learn operators for calculating and comparing!",
  chapters: [
    {
      id: "ch1",
      title: "Arithmetic Operators",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "Arithmetic Operators",
          content: `**Operators** are symbols used to perform calculations on numbers.

| Operator | Meaning | Example |
|----------|---------|---------|
| \`+\` | Addition | \`10 + 3\` → 13 |
| \`-\` | Subtraction | \`10 - 3\` → 7 |
| \`*\` | Multiplication | \`10 * 3\` → 30 |
| \`/\` | Division | \`10 / 3\` → 3.333... |

\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333333333333335
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Calculate and print 19000 * 3!",
          initialCode: "# Calculate 19000 * 3\nprint(___)",
          expectedOutput: "57000",
          hint: "Use the * symbol for multiplication",
          hint2: "print(19000 * 3)"
        },
        {
          id: "special-explain",
          type: "explain",
          title: "🔢 Special Operators",
          content: `### Division-Related Operators

\`\`\`python
print(10 / 3)   # Division → 3.333...
print(10 // 3)  # Quotient only → 3
print(10 % 3)   # Remainder only → 1
print(2 ** 3)   # Exponent → 8
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the remainder of 17 divided by 5!",
          initialCode: "# Recall the operator that returns the remainder of a division\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "Use the % symbol for remainder",
          hint2: "print(17 % 5)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of 2 ** 4?",
          options: ["6", "8", "16", "24"],
          answer: 2,
          explanation: "2 ** 4 = 2 to the power of 4 = 2×2×2×2 = 16"
        },
        {
          id: "modulo-uses",
          type: "explain",
          title: "🎯 The real charm of % — odd/even check",
          content: `\`%\` (modulo) shines beyond simple division — it's the classic **odd/even check** tool.

\`\`\`python
n = 7
print(n % 2)    # 1 — 1 if odd
print(8 % 2)    # 0 — 0 if even
\`\`\`

### Many uses

\`\`\`python
# Odd/even
n = 13
if n % 2 == 0:
    print("even")
else:
    print("odd")
# → odd

# Multiple of 3?
if n % 3 == 0:
    print("multiple of 3")

# Clock (24-hour wrap → 0-23)
hour = 25 % 24    # 1 — next day, 1 AM

# Last digit
n = 1234
last_digit = n % 10   # 4
\`\`\`

> 🎯 One-liner: **\`% 2\` for parity, \`% N\` for multiples of N or wrapping (clocks, indices).**`
        },
        {
          id: "try-modulo",
          type: "tryit",
          title: "🖥️ Try It — Count evens",
          task: "From 1 to 10, count how many numbers are even!",
          initialCode: "count = 0\nfor n in range(1, 11):\n    if n ___ 2 == 0:\n        count += 1\n\nprint(f\"even count: {count}\")",
          expectedOutput: "even count: 5",
          hint: "n % 2 == 0 means even.",
          hint2: "if n % 2 == 0:"
        },
        {
          id: "operator-priority",
          type: "explain",
          title: "📐 Operator precedence — don't forget parentheses",
          content: `Just like math. Multiplication / division before addition / subtraction.

\`\`\`python
print(2 + 3 * 4)      # 14 (multiplication first)
print((2 + 3) * 4)    # 20 (parentheses first)
print(10 - 6 / 2)     # 7.0  (division first)
print((10 - 6) / 2)   # 2.0
\`\`\`

### Precedence (high → low)

1. \`( )\` — parentheses (highest)
2. \`**\` — exponent
3. \`*\`, \`/\`, \`//\`, \`%\` — multiplication/division
4. \`+\`, \`-\` — addition/subtraction
5. \`<\`, \`>\`, \`==\` etc. — comparison
6. \`not\`
7. \`and\`
8. \`or\` — lowest

> 💡 **When unsure, use parentheses generously.** Clearer for both computer and humans.

\`\`\`python
# Confusing ❌
x = a + b * c < 100

# Clear ✅
x = (a + (b * c)) < 100
\`\`\``
        }
      ]
    },
    {
      id: "ch2",
      title: "Comparison Operators",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ Comparing Values",
          content: `When you compare two values, you get **True** or **False**!

\`\`\`python
print(10 > 5)    # Greater than → True
print(10 < 5)    # Less than → False
print(10 >= 10)  # Greater or equal → True
print(10 <= 5)   # Less or equal → False
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the result of 100 > 50!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "> compares if something is greater",
          hint2: "print(100 > 50)"
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 Equal / Not Equal",
          content: `**Equal** is \`==\` (two equal signs!)
**Not equal** is \`!=\`

\`\`\`python
print(10 == 10)  # Equal → True
print(10 == 5)   # Equal → False
print(10 != 5)   # Not equal → True
\`\`\`

⚠️ \`=\` is for assignment, \`==\` is for comparison!`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between `x = 10` and `x == 10`?",
          options: [
            "They are the same",
            "= is assignment, == is comparison",
            "= is comparison, == is assignment",
            "Both cause errors"
          ],
          answer: 1,
          explanation: "= stores a value, == compares if two values are equal!"
        },
        {
          id: "chained-compare",
          type: "explain",
          title: "🔗 Chained comparisons — 1 < x < 10 (math style!)",
          content: `Other languages need \`x > 0 && x < 10\` (two writes), but **Python lets you chain like math**.

\`\`\`python
x = 5

# Long form
print(0 < x and x < 10)   # True

# Python way — same as math
print(0 < x < 10)         # True

# Mixed comparisons OK
print(0 <= x < 10)        # True
print(1 < x < 10 < 100)   # True (3 in a row)
\`\`\`

### Use case — score grading

\`\`\`python
score = 85

if 90 <= score <= 100:
    grade = "A"
elif 80 <= score < 90:
    grade = "B"
elif 70 <= score < 80:
    grade = "C"
else:
    grade = "F"

print(grade)   # B
\`\`\`

Reads naturally and code is shorter. One of Python's nicer features.`
        },
        {
          id: "try-chained",
          type: "tryit",
          title: "🖥️ Try It — Chained comparison",
          task: "Check if age is in range 13~19 (teen) in one line!",
          initialCode: "age = 16\n\n# 13 to 19 inclusive (chained!)\nis_teen = ___ <= age <= ___\n\nprint(f\"teen? {is_teen}\")",
          expectedOutput: "teen? True",
          hint: "13 <= age <= 19",
          hint2: "is_teen = 13 <= age <= 19"
        }
      ]
    },
    {
      id: "ch3",
      title: "Logical Operators",
      emoji: "🔗",
      steps: [
        {
          id: "logic-explain",
          type: "explain",
          title: "🔗 and, or, not",
          content: `You can combine multiple conditions!

\`\`\`python
# and: Both must be True for True
print(True and True)   # True
print(True and False)  # False

# or: Only one needs to be True for True
print(True or False)   # True

# not: Reverses the value
print(not True)        # False
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the result of (10 > 5) and (3 < 7)!",
          initialCode: "print((10 > 5) ___ (3 < 7))",
          expectedOutput: "True",
          hint: "If both are True, the and result is also True!",
          hint2: "print((10 > 5) and (3 < 7))"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of True or False?",
          options: ["True", "False", "Error", "TrueFalse"],
          answer: 0,
          explanation: "or returns True if even just one is True!"
        },
        {
          id: "logic-real",
          type: "explain",
          title: "🎯 and / or in practice — combining conditions",
          content: `\`and\` / \`or\` shine when **combining conditions**, not just single \`True/False\`.

\`\`\`python
age = 16
has_id = True

# Both must hold
if age >= 18 and has_id:
    print("entry allowed")
else:
    print("entry denied")

# At least one
day = "Sat"
if day == "Sat" or day == "Sun":
    print("weekend!")
\`\`\`

### not to flip

\`\`\`python
is_open = False
if not is_open:
    print("closed")
\`\`\`

### Truth table

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

> 💡 **and** = "both", **or** = "any", **not** = "opposite".`
        },
        {
          id: "try-logic-real",
          type: "tryit",
          title: "🖥️ Try It — Two pass conditions",
          task: "If score ≥ 60 **AND** attendance ≥ 80% print 'pass', else 'fail'!",
          initialCode: "score = 75\nattendance = 85   # %\n\n# Both must hold\nif score >= 60 ___ attendance >= 80:\n    print(\"pass\")\nelse:\n    print(\"fail\")",
          expectedOutput: "pass",
          hint: "Both = and",
          hint2: "if score >= 60 and attendance >= 80:"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "compound-explain",
          type: "explain",
          title: "📝 Compound Assignment Operators",
          content: `You can use a shorthand when updating variable values!

\`\`\`python
score = 100
score = score + 10  # Long way
score += 10         # Short way (same meaning!)
\`\`\`

\`+=\`, \`-=\`, \`*=\`, \`/=\` and more are available!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Start with hp = 100, apply hp -= 30, then print it!",
          initialCode: "hp = 100\nhp ___ 30\nprint(hp)",
          expectedOutput: "70",
          hint: "-= subtracts and saves the result",
          hint2: "hp = 100\nhp -= 30\nprint(hp)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Mission 1 — Price calculator",
          task: "Complete the price calculator! (unit price 15000 won, 3 items, 10% discount)",
          initialCode: "price = 15000\ncount = 3\n# Calculate the total\ntotal = ___\n# 10% discount\ndiscount = ___\n# Final price\nfinal = ___\n\nprint(f'Unit price: {price}')\nprint(f'Quantity: {count}')\nprint(f'Subtotal: {total}')\nprint(f'Discount: {discount}')\nprint(f'Final: {final}')",
          expectedOutput: "Unit price: 15000\nQuantity: 3\nSubtotal: 45000\nDiscount: 4500.0\nFinal: 40500.0",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — BMI calc + grade",
          task: "BMI = weight(kg) / (height(m))². Use ** and chained compare for grade. (input via stdin)",
          initialCode: "weight = float(input(\"weight(kg): \"))\nheight = float(input(\"height(m): \"))\n\n# BMI (use ** exponent)\nbmi = weight / (height ___ 2)\n\n# Chained comparison for grade\nif bmi < 18.5:\n    grade = \"underweight\"\nelif ___ <= bmi < 25:\n    grade = \"normal\"\nelif 25 <= bmi < 30:\n    grade = \"overweight\"\nelse:\n    grade = \"obese\"\n\nprint(f\"BMI: {bmi:.1f}\")\nprint(f\"grade: {grade}\")",
          expectedOutput: "BMI: 22.0\ngrade: normal",
          stdin: "60\n1.65",
          hint: "height ** 2 for square. 18.5 <= bmi < 25 chained.",
          hint2: "bmi = weight / (height ** 2)\nelif 18.5 <= bmi < 25:"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Seconds → HH:MM:SS",
          task: "Convert seconds to 'HH:MM:SS' using // and %",
          initialCode: "total_sec = int(input())\n\n# // and %\nhours = total_sec ___ 3600\nminutes = (total_sec % 3600) ___ 60\nseconds = total_sec ___ 60\n\nprint(f\"{hours:02d}:{minutes:02d}:{seconds:02d}\")",
          expectedOutput: "01:30:25",
          stdin: "5425",
          hint: "1 hour = 3600 sec. // for quotient, % for remainder.",
          hint2: "hours = total_sec // 3600\nminutes = (total_sec % 3600) // 60\nseconds = total_sec % 60"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`//\` (quotient), \`%\` (remainder), \`**\` (exponent)
✅ \`%\` real charm — odd/even / multiples / clock wrap / last digit
✅ **Operator precedence** — when unsure, use parens
✅ **Comparison**: \`>\`, \`<\`, \`>=\`, \`<=\`, \`==\`, \`!=\`
✅ **\`=\` vs \`==\`** — store vs compare
✅ **Chained comparisons** — \`0 < x < 10\` math style
✅ **Logical**: \`and\` (both), \`or\` (any), \`not\` (flip)
✅ **Compound assignment**: \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`//=\`, \`%=\`, \`**=\`

Next time, we'll learn **string operations** to add and multiply text! 🚀`
        }
      ]
    }
  ]
}
