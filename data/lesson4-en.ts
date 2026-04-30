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
          title: "🔢 Special Operators — //, %, **",
          content: `Beyond \`+ - * /\`, there are **3 more** common operators.

### Division partners — quotient and remainder

While \`/\` gives the full division result, two separate operators split it into **quotient** and **remainder**.

\`\`\`python
print(10 / 3)   # 3.333...   ← regular division (decimal)
print(10 // 3)  # 3           ← quotient only (double slash //)
print(10 % 3)   # 1           ← remainder only (%)
\`\`\`

10 ÷ 3 = 3 remainder 1.
- Double slash \`//\` is that "3" (quotient)
- Percent \`%\` is that "1" (remainder)

### Exponent (two stars)

Math's **power**. Stick two stars together.

\`\`\`python
print(2 ** 3)   # 8     ← 2 × 2 × 2
print(2 ** 4)   # 16    ← 2 × 2 × 2 × 2
print(5 ** 2)   # 25    ← 5 × 5
print(10 ** 3)  # 1000  ← 10 × 10 × 10
\`\`\`

How to read: \`2 ** 3\` means "multiply 2 by itself 3 times" — i.e. \`2 × 2 × 2 = 8\`.

> 🎯 One-liner: **Two stars** together = exponent. Multiply the left number by itself N times (N = right number).

⚠️ **One** star = multiply, **two** stars = exponent. Easy to mix up!

\`\`\`python
2 * 4    # 8   ← multiply (once)
2 ** 4   # 16  ← exponent (four times)
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
          title: "🎯 The real charm of % — parity signal",
          content: `\`%\` (modulo) shines beyond simple division — it's the classic **parity signal**.

\`\`\`python
print(7 % 2)    # 1 — 1 if odd
print(8 % 2)    # 0 — 0 if even
\`\`\`

→ Any number's \`% 2\` is **0 (even) or 1 (odd)**. Once you learn conditionals (lesson 11), you'll use this to branch.

### Another use — last digit

\`\`\`python
print(1234 % 10)   # 4 — ones-digit of 1234
print(567 % 10)    # 7 — ones-digit of 567
\`\`\`

\`% 10\` = "remainder when divided by 10" = "the ones digit".

### Multiple-of-N signal

\`\`\`python
print(15 % 3)   # 0 — 15 is a multiple of 3
print(15 % 4)   # 3 — 15 is NOT a multiple of 4
print(20 % 5)   # 0 — 20 is a multiple of 5
\`\`\`

\`% N == 0\` means "multiple of N"; non-zero means "not a multiple".

> 🎯 One-liner: **% 2 = parity signal, % N = multiple-of-N signal (0 = yes).**`
        },
        {
          id: "try-modulo",
          type: "tryit",
          title: "🖥️ Try It — Ones digit",
          task: "Print the remainder when 5678 is divided by 10. (That's the ones-digit!)",
          initialCode: "# Get the ones-digit and print it\nprint(5678 ___ 10)",
          expectedOutput: "8",
          hint: "There's an operator that gives the remainder of a division.",
          hint2: "print(5678 % 10)"
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
          title: "📌 Note — Chained comparison",
          content: `Like math inequalities (\`0 < x < 10\`), **Python lets you chain comparisons** on one line.

\`\`\`python
x = 5
print(0 < x < 10)   # True — math inequality directly
\`\`\`

> 🎯 Typical use: **range checks** like "is the score between 70 and 90?".

⚠️ For now, just **know it exists**. You'll see it in action in **lesson 11 (conditionals)** with \`if\`.`
        },
        {
          id: "try-chained",
          type: "tryit",
          title: "🖥️ Try It — Score comparison",
          task: "Check if score is 60 or higher, and if it's exactly 100. Print True/False for each!",
          initialCode: "score = 75\n\n# 60 or higher?\npass_check = score __ 60\n\n# Exactly 100?\nperfect = score __ 100\n\nprint('passing?', pass_check)\nprint('perfect?', perfect)",
          expectedOutput: "passing? True\nperfect? False",
          hint: "Two comparison operators — one for 'or higher', one for 'equals'.",
          hint2: "pass_check = score >= 60\nperfect = score == 100"
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
          id: "is-not-explain",
          type: "explain",
          title: "🔎 \`is\`, \`is not\`, \`not\` — More comparisons",
          content: `### \`is\` / \`is not\` — "is it the same one?"

While \`==\` checks if **values are equal**, \`is\` checks if it's **the very same object**.

The most common use: **checking for \`None\`**.

\`\`\`python
x = None

print(x is None)        # True   ← "x is None" check — recommended
print(x is not None)    # False  ← opposite — "x is not None"

print(x == None)        # True too — but 'is' is more precise
\`\`\`

> 💡 **\`x is None\`** is the Pythonic style. \`== None\` works but \`is None\` is clearer.

### \`not\` — flip in front

Put \`not\` **in front** of a value to flip True/False.

\`\`\`python
print(not True)         # False
print(not False)        # True
print(not (5 > 3))      # False  ← opposite of (5 > 3) which is True
\`\`\`

### \`not in\` — preview (covered more in lesson 5+)

Check if something is **not in** a string or list. (opposite of in)

\`\`\`python
print('a' not in 'hello')   # True   ← no 'a'
print(7 not in [1, 2, 3])   # True   ← no 7
\`\`\`

> 🎯 Summary: **is = "the very same?", not = "opposite", not in = "opposite of in".**`
        },
        {
          id: "try-is-not",
          type: "tryit",
          title: "🖥️ Try It — None check + flip",
          task: "Check whether name is None, then flip that result. Print both!",
          initialCode: "name = None\n\n# Is name None?\ncheck = name __ None\n\n# Opposite of check\nopposite = __ check\n\nprint('None?', check)\nprint('not None?', opposite)",
          expectedOutput: "None? True\nnot None? False",
          hint: "Recommended None check uses a 2-letter operator (not ==). Flip uses one word.",
          hint2: "check = name is None\nopposite = not check"
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

### Both conditions? — and

\`\`\`python
age = 16
has_id = True

# age >= 18 (False) AND has_id (True) = False
print(age >= 18 and has_id)   # False
\`\`\`

### Either one? — or

\`\`\`python
day = "Sat"

# Saturday OR Sunday — true if either matches
print(day == "Sat" or day == "Sun")   # True
\`\`\`

### Flip with not

\`\`\`python
is_open = False
print(not is_open)   # True — opposite of False
\`\`\`

### Truth table

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

> 💡 **and** = "both", **or** = "any", **not** = "opposite".

(In lesson 11 — conditionals — you'll combine these results with \`if\`.)`
        },
        {
          id: "try-logic-real",
          type: "tryit",
          title: "🖥️ Try It — Two conditions at once",
          task: "Check if score ≥ 60 AND attendance ≥ 80% in one line, then print True/False!",
          initialCode: "score = 75\nattendance = 85   # %\n\n# Are both conditions met?\nresult = score >= 60 ___ attendance >= 80\n\nprint(result)",
          expectedOutput: "True",
          hint: "Both = and",
          hint2: "result = score >= 60 and attendance >= 80"
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
          task: "Complete the price calculator! (unit price 15000, 3 items, 10% discount)",
          initialCode: "price = 15000\ncount = 3\n# Calculate the total\ntotal = ___\n# 10% discount\ndiscount = ___\n# Final price\nfinal = ___\n\nprint('Unit price:', price)\nprint('Quantity:', count)\nprint('Subtotal:', total)\nprint('Discount:', discount)\nprint('Final:', final)",
          expectedOutput: "Unit price: 15000\nQuantity: 3\nSubtotal: 45000\nDiscount: 4500.0\nFinal: 40500.0",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — BMI calculation",
          task: "Compute BMI for weight 60kg, height 1.65m using exponent. (BMI = weight / height²)",
          initialCode: "weight = 60      # kg\nheight = 1.65    # m\n\n# Use exponent (two stars) for height squared\nbmi = weight / (height ___ 2)\n\nprint(\"BMI:\", round(bmi, 1))",
          expectedOutput: "BMI: 22.0",
          hint: "height ** 2 for the square.",
          hint2: "bmi = weight / (height ** 2)"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Break seconds into h/m/s",
          task: "Break 5425 seconds into hours, minutes, seconds and print each. (use // and %)",
          initialCode: "total_sec = 5425\n\n# // and %\nhours = total_sec ___ 3600        # hours (quotient)\nminutes = (total_sec % 3600) ___ 60   # remaining seconds → minutes (quotient)\nseconds = total_sec ___ 60        # final seconds (remainder)\n\nprint(\"hours:\", hours)\nprint(\"minutes:\", minutes)\nprint(\"seconds:\", seconds)",
          expectedOutput: "hours: 1\nminutes: 30\nseconds: 25",
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
