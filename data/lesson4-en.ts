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
          title: "🖥️ Try It — Multiply",
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
          title: "🖥️ Try It — Remainder",
          task: "Print the remainder when 17 is divided by 5!",
          initialCode: "# 17 divided by 5: quotient 3, remainder is?\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "Use the operator for remainder",
          hint2: "print(17 % 5)"
        },
        {
          id: "try-quotient",
          type: "tryit",
          title: "🖥️ Try It — Quotient",
          task: "23 candies for 4 people. How many does each get? (print the quotient)",
          initialCode: "candy = 23\npeople = 4\nprint(candy ___ people)",
          expectedOutput: "5",
          hint: "Each person's share = quotient. The double-slash operator!",
          hint2: "print(candy // people)"
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
          id: "power-explain",
          type: "explain",
          title: "🔢 Exponent — two stars",
          content: `You'll often need to multiply the same number **many times**. Example:

> Fold a piece of paper in half, again, again... **after 10 folds, how many layers**?

Answer: 2 multiplied 10 times = **1024 layers**!

That's an **exponent** — written with two stars.

\`\`\`python
print(2 ** 1)   # 2     ← 2 once
print(2 ** 2)   # 4     ← 2 × 2 (twice)
print(2 ** 3)   # 8     ← 2 × 2 × 2 (three times)
print(2 ** 10)  # 1024  ← 2 multiplied 10 times!
\`\`\`

### Other numbers

\`\`\`python
print(5 ** 2)    # 25    ← 5 × 5
print(3 ** 4)    # 81    ← 3 × 3 × 3 × 3
print(10 ** 3)   # 1000  ← 10 × 10 × 10 (10 cubed)
\`\`\`

How to read: \`a ** b\` is "a multiplied by itself b times". Same as math's \`a^b\`.

### ⚠️ One star vs two stars

\`\`\`python
print(2 * 4)    # 8   ← multiply (once)
print(2 ** 4)   # 16  ← exponent (4 times)
\`\`\`

One star = multiply. Two stars = exponent. Totally different meanings!`
        },
        {
          id: "try-power",
          type: "tryit",
          title: "🖥️ Try It — Exponent",
          task: "What's the area of a square with side 6cm? (6 squared)",
          initialCode: "side = 6\n# Area of a square = side × side (= side squared)\narea = side __ 2\nprint(area)",
          expectedOutput: "36",
          hint: "Two stars for exponent.",
          hint2: "area = side ** 2"
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
          title: "🖥️ Try It — Greater than",
          task: "Print the result of 100 > 50!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "> compares if something is greater",
          hint2: "print(100 > 50)"
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 Equal and Not Equal",
          content: `Often we check whether two values are **equal** / **not equal**:

> 🔑 "Is the password equal to 1234?"
> 🎲 "Is the dice result a 6?"
> 🚪 "Is the answer equal to 'apple'?"

\`\`\`python
print(10 == 10)   # True   ← equal
print(10 == 5)    # False  ← not equal
print(10 != 5)    # True   ← different
print(10 != 10)   # False  ← not different (equal)
\`\`\`

### ⚠️ Most confusing trap — \\= one vs \\=\\= two

| Symbol | Meaning |
|---|---|
| \`=\` | **Assignment** — store a value (\`x = 10\`) |
| \`==\` | **Comparison** — ask if equal (\`x == 10\`) |

\`\`\`python
x = 10            # assign — put 10 in x
print(x == 10)    # compare — is x equal to 10? → True
\`\`\`

**Rule: one equals = "put", two equals = "ask".** Easy mnemonic!

### String comparison too

\`\`\`python
print("apple" == "apple")  # True
print("apple" == "Apple")  # False — case differs
print("hi" != "bye")       # True — different
\`\`\``
        },
        {
          id: "try-equal",
          type: "tryit",
          title: "🖥️ Try It — Equal?",
          task: "Check if input password equals '1234' and print True/False!",
          initialCode: "input_pw = '1234'\nresult = input_pw __ '1234'\nprint(result)",
          expectedOutput: "True",
          hint: "'Equal' uses two equals signs.",
          hint2: "result = input_pw == '1234'"
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
          initialCode: "score = 75\npass_check = score __ 60\nperfect = score __ 100\nprint('passing?', pass_check)\nprint('perfect?', perfect)",
          expectedOutput: "passing? True\nperfect? False",
          hint: "First line is 'or higher', second is 'equals' — two comparison operators.",
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
          title: "🔗 Combining conditions — and, or, not",
          content: `Listen carefully to instructions. Two names can sound similar but **mean different things**:

### 🔴 and — "Both must do it"

> 👫 "Alice **and** Bob, go wash your hands!"

If only Alice washes, that's not enough. Both must wash.

\`\`\`python
alice_washed = True
bob_washed = False

print(alice_washed and bob_washed)   # False ← Bob didn't wash
\`\`\`

### 🔵 or — "Either one is enough"

> 👬 "Alice **or** Bob, please close the door!"

Either can do it. Just one is enough.

\`\`\`python
alice_closed = False
bob_closed = True

print(alice_closed or bob_closed)    # True ← Bob did it, OK
\`\`\`

### 🟢 not — Flip the value

> 🌙 "If it's **not** dark, let's go for a walk!"

\`\`\`python
print(not True)    # False  ← opposite of True
print(not False)   # True   ← opposite of False

is_dark = False
print(not is_dark)   # True ← opposite of "is dark"
\`\`\`

---

### 🎯 The easy way to remember — don't memorize 4 cases

**and** (both): result is True ONLY when **True and True**. Everything else is False.

| Case | Result |
|---|---|
| ✅ True **and** True | **True** ← only this one |
| True and False | False |
| False and True | False |
| False and False | False |

**or** (either): result is False ONLY when **False or False**. Everything else is True.

| Case | Result |
|---|---|
| True or True | True |
| True or False | True |
| False or True | True |
| ❌ False **or** False | **False** ← only this one |

> 🎯 One-line memory hooks:
> - **and** is strict — needs **both True** to be True
> - **or** is generous — only False if **both False**

### More everyday examples

\`\`\`python
age = 15
height = 140

# Ride: 13 or older AND 130cm or taller (both)
print(age >= 13 and height >= 130)   # True

# Holiday: Saturday OR Sunday (either one)
day = "Sat"
print(day == "Sat" or day == "Sun")  # True
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It — and connector",
          task: "Print the result of (10 > 5) and (3 < 7)!",
          initialCode: "print((10 > 5) ___ (3 < 7))",
          expectedOutput: "True",
          hint: "Connect them with the operator that needs both True!",
          hint2: "and",
          choices: ["and", "or", "not", "xor"]
        },
        {
          id: "is-not-explain",
          type: "explain",
          title: "🔎 is, is not, not — More comparisons",
          content: `### is / is not — "is it the same one?"

While \`==\` checks if **values are equal**, \`is\` checks if it's **the very same object**.

The most common use: **checking for \`None\`**.

\`\`\`python
x = None

print(x is None)        # True   ← "x is None" check — recommended
print(x is not None)    # False  ← opposite — "x is not None"

print(x == None)        # True too — but 'is' is more precise
\`\`\`

> 💡 \`x is None\` is the Pythonic style. \`== None\` works but \`is None\` is clearer.

### not — flip in front

Put \`not\` **in front** of a value to flip True/False.

\`\`\`python
print(not True)         # False
print(not False)        # True
print(not (5 > 3))      # False  ← opposite of (5 > 3) which is True
\`\`\`

### not in — preview (covered more in lesson 5+)

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
          initialCode: "name = None\ncheck = name __ None\nopposite = __ check\nprint('None?', check)\nprint('not?', opposite)",
          expectedOutput: "None? True\nnot? False",
          hint: "First line: None check — 2-letter operator preferred over ==. Second: flip with one word.",
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
          title: "🎯 Combining comparisons with and / or",
          content: `The pattern you'll really use — wrap **comparison results** (\`>=\` etc) with \`and\` / \`or\`.

\`\`\`python
age = 16
height = 140

# Ride: 13 or older AND 130cm+ (both)
print(age >= 13 and height >= 130)   # True

# Holiday: Saturday OR Sunday (either)
day = "Sat"
print(day == "Sat" or day == "Sun")  # True
\`\`\`

Each comparison gives True/False, then \`and\` / \`or\` combines them into a single check.

(Conditionals are in lesson 11 — that's where you branch on these results with \`if\`.)`
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
          title: "🖥️ Try It — Compound assignment",
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
