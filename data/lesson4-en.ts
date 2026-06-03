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
          content: `**Operators** are symbols used to do math on numbers. The same symbols you've seen in math class — almost.

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`+\` | Addition | \`10 + 3\` | 13 |
| \`-\` | Subtraction | \`10 - 3\` | 7 |
| \`*\` | Multiplication (one star) | \`10 * 3\` | 30 |
| \`/\` | Division (slash) | \`10 / 3\` | 3.333... |

\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333333333333335
\`\`\`

Multiplication is the **asterisk \`*\`** — not \`×\` and not the letter \`x\`.

> 💡 Notice that weird \`...5\` at the end of \`10 / 3\`? That's how computers store decimals — tiny rounding errors. **We'll cover this in detail in Ch2 (the float gotcha)** — for now, just know "decimals look slightly off sometimes".`
        },
        {
          id: "intro-warnings",
          type: "explain",
          title: "💡 Two heads-ups about division",
          content: `**1. \`/\` always returns a float (decimal)**

\`\`\`python
print(10 / 2)
print(10 / 3)
\`\`\`

{output}
5.0
3.3333333333333335
{/output}

→ Think "division turns the answer into a decimal on the spot".

**2. Dividing by 0 is an error**

\`\`\`python
print(10 / 0)    # ❌ ZeroDivisionError
\`\`\`

Just like in math — you can't divide by zero. Python raises an error.

### ❌ Other things that don't work

\`\`\`python
print(10 + "3")   # ❌ TypeError — number + string is not allowed
print(10 × 3)     # ❌ SyntaxError — × is not a Python symbol (use \`*\`)
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
          hint2: "19000 * 3"
        },
        {
          id: "special-explain",
          type: "explain",
          title: "🔢 Quotient and remainder — // and %",
          content: `Remember learning long division in elementary school?

> 🍪 **10 cookies, 3 friends sharing.** How many each? How many left over?

\`\`\`
Each: 3   ← quotient
Left: 1   ← remainder
\`\`\`

Python has separate operators for **quotient** and **remainder**.

What do you think each line prints?

\`\`\`python
print(10 / 3)
print(10 // 3)
print(10 % 3)
\`\`\`

{output}
3.3333333333333335
3
1
{/output}

| Operator | Name | Example | Meaning |
|---|---|---|---|
| \`/\` | division | \`10 / 3\` → 3.33... | full decimal |
| \`//\` | quotient | \`10 // 3\` → 3 | how many each |
| \`%\` | remainder | \`10 % 3\` → 1 | how many left |

> 💡 **Why have both \`/\` and \`//\`?** Cake can be sliced into fractions, so \`/\` (decimal OK). People or items can't be split, so \`//\` (whole numbers only). Pick the right one for the situation.`
        },
        {
          id: "predict-slash-vs-doubleslash",
          type: "predict",
          title: "💭 Predict — / vs //",
          content: "What's the difference between these two outputs?",
          code: "print(5 / 2)\nprint(5 // 2)",
          options: ["2.5\n2", "2\n2.5", "2.5\n2.5", "2\n2"],
          answer: 0,
          explanation: "/ goes to decimal → 2.5. // is quotient only → 2. Same 5÷2 but different shape."
        },
        {
          id: "special-explain-examples",
          type: "explain",
          title: "🍬 More // and % examples",
          content: `\`\`\`python
# Minutes → hours:minutes
print(75 // 60)  # 1 — 1 hour
print(75 % 60)   # 15 — 15 minutes

# 100 pages over 7 days
print(100 // 7)  # 14 — 14 pages/day
print(100 % 7)   # 2 — 2 pages left
\`\`\`

> 🎯 \`//\` = "how many each?", \`%\` = "how many left?"`
        },
        {
          id: "predict-candy-modulo",
          type: "predict",
          title: "💭 Predict — Sharing candies",
          content: "7 candies for 2 people. What's the output?",
          code: "print(7 // 2)\nprint(7 % 2)",
          options: ["3\n1", "1\n3", "3.5\n0", "2\n3"],
          answer: 0,
          explanation: "3 each (quotient) + 1 left (remainder). // and % often appear as a pair."
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It — Remainder",
          task: "Print the remainder when 17 is divided by 5!",
          initialCode: "# 17 divided by 5: quotient 3, remainder is?\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "The operator that gives what's left over!",
          hint2: "%",
          choices: ["%", "/", "//", "*", "**"]
        },
        {
          id: "try-quotient",
          type: "tryit",
          title: "🖥️ Try It — Quotient",
          task: "23 candies for 4 people. How many does each get? (print the quotient)",
          initialCode: "candy = 23\npeople = 4\nprint(candy ___ people)",
          expectedOutput: "5",
          hint: "Each person's share = quotient. The double-slash operator!",
          hint2: "//",
          choices: ["//", "/", "%", "**", "*"]
        },
        {
          id: "modulo-uses",
          type: "explain",
          title: "🎯 Real charm of % — parity + last digit",
          content: `\`%\` (modulo) shines beyond simple division — it's the classic **parity signal**.

\`\`\`python
print(7 % 2)
print(8 % 2)
\`\`\`

{output}
1
0
{/output}

> 👀 **See it — pairing up in 2s:**
> - Even (8): \`■■  ■■  ■■  ■■\` → all paired, 0 left over
> - Odd (7): \`■■  ■■  ■■  ■\` → one loner, 1 left over

→ Any number's \`% 2\` is **0 (even) or 1 (odd)**. Once you learn conditionals (lesson 11), you'll use this to branch.

### Another use — last digit

\`\`\`python
print(1234 % 10)
print(567 % 10)
\`\`\`

{output}
4
7
{/output}

\`% 10\` = "remainder when divided by 10" = "the ones digit".`
        },
        {
          id: "modulo-uses-more",
          type: "explain",
          title: "🕒 More % charm — multiples + wraparound",
          content: `### Multiple-of-N signal

\`\`\`python
print(15 % 3)
print(15 % 4)
print(20 % 5)
\`\`\`

{output}
0
3
0
{/output}

\`% N == 0\` means "multiple of N"; non-zero means "not a multiple".

### 🕒 Clock-style wraparound

3 o'clock + 5 hours = 8. But 22 o'clock + 5 hours = **3 (24-hour clock wraps around)**.

> 👀 **See it — round 24-hour clock:**
> \`\`\`
>          0
>    23         1
>  22             2
>  ...     →   ...
>  19             5
>    18         6
>          ...
> \`\`\`
> Move the hand 5 ticks from 22 → past 24 → back to 0 → 1 → 2 → **3 o'clock!**

\`\`\`python
print((3 + 5) % 24)
print((22 + 5) % 24)
\`\`\`

{output}
8
3
{/output}

\`% N\` says "when a number goes past N, start back at 0" — clocks, days-of-week, circular seating all use this.

> 🎯 One-liner: **% 2 = parity, % N = multiple-of-N (0 = yes), or wraps around every N.**`
        },
        {
          id: "predict-clock-wrap",
          type: "predict",
          title: "💭 Predict — Clock wraparound",
          content: "What time is it 5 hours after 23:00? (24-hour clock)",
          code: "print((23 + 5) % 24)",
          options: ["4", "28", "0", "5"],
          answer: 0,
          explanation: "23 + 5 = 28. 28 % 24 = 4. So 4 AM. % N wraps back to 0 once you pass N."
        },
        {
          id: "try-modulo",
          type: "tryit",
          title: "🖥️ Try It — Ones digit",
          task: "Print the remainder when 5678 is divided by 10. (That's the ones-digit!)",
          initialCode: "# Get the ones-digit and print it\nprint(5678 ___ 10)",
          expectedOutput: "8",
          hint: "There's an operator that gives the remainder of a division.",
          hint2: "%",
          choices: ["%", "/", "//", "**"]
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
print(2 ** 1)
print(2 ** 2)
print(2 ** 3)
print(2 ** 10)
\`\`\`

{output}
2
4
8
1024
{/output}

How to read: \`a ** b\` is "a multiplied by itself b times". Same as math's \`a^b\`.`
        },
        {
          id: "power-explain-warning",
          type: "explain",
          title: "⚠️ One star vs two stars",
          content: `### Other numbers

\`\`\`python
print(5 ** 2)
print(3 ** 4)
print(10 ** 3)
\`\`\`

{output}
25
81
1000
{/output}

### One star vs two stars — totally different

\`\`\`python
print(2 * 4)
print(2 ** 4)
\`\`\`

One star vs two — see how different the results are!

{output}
8
16
{/output}

One star = multiply. Two stars = exponent.`
        },
        {
          id: "try-power",
          type: "tryit",
          title: "🖥️ Try It — Exponent",
          task: "What's the area of a square with side 6cm? (6 squared)",
          initialCode: "side = 6\narea = side ___ 2\nprint(area)",
          expectedOutput: "36",
          hint: "Exponent uses two stars together.",
          hint2: "**",
          choices: ["**", "*", "+", "//"]
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
print(2 + 3 * 4)
print((2 + 3) * 4)
print(10 - 6 / 2)
print((10 - 6) / 2)
\`\`\`

See how one pair of parentheses changes everything!

{output}
14
20
7.0
2.0
{/output}

### Precedence (high → low)

> 💡 **For now, just memorize these 4!**

1. \`( )\` — parentheses (highest)
2. \`**\` — exponent
3. \`*\`, \`/\`, \`//\`, \`%\` — multiplication/division
4. \`+\`, \`-\` — addition/subtraction

> 📌 **Coming soon (just note the spots)** — comparison \`<\`, \`>\`, \`==\` (Ch2) → \`not\` → \`and\` → \`or\` (Ch3). They run *after* arithmetic.

> 💡 **When unsure, use parentheses generously.** Clearer for both computer and humans.

\`\`\`python
# Confusing ❌
x = a + b * c < 100

# Clear ✅
x = (a + (b * c)) < 100
\`\`\``
        },
        {
          id: "predict-priority",
          type: "predict",
          title: "💭 Predict — Precedence in action",
          content: "Without parentheses, who runs first?",
          code: "print(2 + 3 ** 2)",
          options: ["11", "25", "13", "Error"],
          answer: 0,
          explanation: "Exponent ** runs before addition +. 3 ** 2 = 9 → 2 + 9 = 11. Rank 2 (**) beats rank 4 (+)."
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
          title: "⚖️ Comparing two values",
          content: `Programs constantly need to **decide**:

> 🎮 "Is HP greater than 0? → still alive"
> 🛒 "Is price ≤ 5000? → can buy it"
> 📝 "Is score ≥ 80? → grade A"

Every comparison gives one of **two answers — True (yes) or False (no).**

### Four comparison operators

| Symbol | Meaning | Example |
|---|---|---|
| \`>\` | greater than | \`10 > 5\` → True |
| \`<\` | less than | \`10 < 5\` → False |
| \`>=\` | greater or equal | \`10 >= 10\` → True |
| \`<=\` | less or equal | \`10 <= 5\` → False |`
        },
        {
          id: "compare-explain-diff",
          type: "explain",
          title: "💡 Try them + > vs >= difference",
          content: `\`\`\`python
print(10 > 5)
print(3 > 7)
\`\`\`

{output}
True
False
{/output}

### \`>=\` vs \`>\` — the subtle difference

- \`>=\` (greater or equal): "**equal OR** larger" — equal is OK
- \`>\` (greater than): "**strictly larger**" — equal is NOT OK

They look similar but flip the answer when the two values are equal.`
        },
        {
          id: "predict-gte-vs-gt",
          type: "predict",
          title: "💭 Predict — >= vs > when equal",
          content: "Two values are **exactly equal**. What do these print?",
          code: "print(10 >= 10)\nprint(10 > 10)",
          options: ["True\nFalse", "True\nTrue", "False\nTrue", "False\nFalse"],
          answer: 0,
          explanation: ">= accepts 'equal' → True. > rejects 'equal' → False. The difference shows up only when the values match."
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It — Greater than",
          task: "Print the result of 100 > 50!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "The symbol that checks 'is greater than'!",
          hint2: ">",
          choices: [">", "<", ">=", "<=", "==", "!="]
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 Equal and Not Equal — == and !=",
          content: `Often we check whether two values are **equal** / **not equal**:

> 🔑 "Is the password equal to 1234?"
> 🎲 "Is the dice result a 6?"
> 🚪 "Is the answer equal to 'apple'?"

\`\`\`python
print(10 == 10)
print(10 == 5)
print(10 != 5)
print(10 != 10)
\`\`\`

{output}
True
False
True
False
{/output}`
        },
        {
          id: "equal-explain-trap",
          type: "explain",
          title: "⚠️ The biggest trap — = one vs == two",
          content: `| Symbol | Meaning |
|---|---|
| \`=\` | **Assignment** — store a value (\`x = 10\`) |
| \`==\` | **Comparison** — ask if equal (\`x == 10\`) |

\`\`\`python
x = 10
print(x == 10)
\`\`\`

{output}
True
{/output}

**Rule: one equals = "put", two equals = "ask".** Easy mnemonic!`
        },
        {
          id: "equal-explain-string-float",
          type: "explain",
          title: "🔤 String comparison + float gotcha",
          content: `### String comparison too

\`\`\`python
print("apple" == "apple")
print("apple" == "Apple")
print("hi" != "bye")
\`\`\`

{output}
True
False
True
{/output}

### ⚠️ Float comparison gotcha — looks weird!

Computers store decimals with tiny rounding errors. **Integer \`==\` is safe; float \`==\` needs care.** For now, just know this trap exists.`
        },
        {
          id: "predict-float-trap",
          type: "predict",
          title: "💭 Predict — 0.1 + 0.2 == 0.3 ?",
          content: "Math says yes... but what does Python say?",
          code: "print(0.1 + 0.2 == 0.3)",
          options: ["False", "True", "Error", "0.3"],
          answer: 0,
          explanation: "Python stores 0.1 + 0.2 with a tiny rounding error: 0.30000000000000004. So it's NOT exactly 0.3 → False. Float == needs care! (Remember? The trailing 5 in Ch1's first step \`10 / 3 = 3.3333333333333335\` is the same reason.)"
        },
        {
          id: "pre-try-equal",
          type: "quiz",
          title: "🤔 Which symbol?",
          content: "**To *compare whether a password matches*, which one?**",
          options: ["= to assign", "== to compare", "!= to check different"],
          answer: 1,
          explanation: "*Comparison* uses `==` (two!). `=` (one) is *assignment*, not comparison."
        },
        {
          id: "try-equal",
          type: "tryit",
          title: "🖥️ Try It — Equal?",
          task: "Check if input password equals '1234' and print True/False!",
          initialCode: "input_pw = '1234'\nresult = input_pw ___ '1234'\nprint(result)",
          expectedOutput: "True",
          hint: "'Equal' uses two equals signs.",
          hint2: "==",
          choices: ["==", "=", "!=", ">=", "<="]
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
print(0 < x < 10)
\`\`\`

{output}
True
{/output}

> 🎯 Typical use: **range checks** like "is the score between 70 and 90?".

⚠️ For now, just **know it exists**. You'll see it in action in **lesson 11 (conditionals)** with \`if\`.`
        },
        {
          id: "pre-try-chained",
          type: "quiz",
          title: "🤔 Which symbol?",
          content: "**When you say '60 *or higher*', which symbol?**",
          options: ["> (greater than)", ">= (greater or equal)", "== (equal)", "= (assign)"],
          answer: 1,
          explanation: "'or higher' includes the same value too → `>=`. Don't confuse with '*greater than*' (>)!"
        },
        {
          id: "pre-try-chained-eq",
          type: "quiz",
          title: "🤔 Which symbol?",
          content: "**When you say '*exactly* 100', which symbol?**",
          options: ["= (assign)", "== (equal)", ">= (greater or equal)", "!= (not equal)"],
          answer: 1,
          explanation: "'exactly equal' = `==`. `=` is *assignment*, not comparison!"
        },
        {
          id: "try-chained",
          type: "tryit",
          title: "🖥️ Try It — Score comparison",
          task: "Check if score is 60 or higher, and if it's exactly 100. Print True/False for each!",
          initialCode: "score = 75\npass_check = score ___ 60\nperfect = score ___ 100\nprint('passing?', pass_check)\nprint('perfect?', perfect)",
          expectedOutput: "passing? True\nperfect? False",
          hint: "First blank is 'or higher', second is 'equals'.",
          hint2: ">= / ==",
          choices: [">=", "==", "<=", "!=", ">", "<"]
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
          title: "🔴 and — Both must be True",
          content: `Listen to everyday instructions. Two names together can **mean very different things** depending on the connector.

> 👫 "Alice **and** Bob, go wash your hands!"

If only Alice washes, that's not enough. Both must wash.

\`\`\`python
alice_washed = True
bob_washed = False

print(alice_washed and bob_washed)
\`\`\`

{output}
False
{/output}

> 💡 **and is strict** — needs **both True** to be True.`
        },
        {
          id: "logic-explain-or-not",
          type: "explain",
          title: "🔵 or and 🟢 not",
          content: `### 🔵 or — "Either one is enough"

> 👬 "Alice **or** Bob, please close the door!"

Either can do it. Just one is enough.

\`\`\`python
alice_closed = False
bob_closed = True

print(alice_closed or bob_closed)
\`\`\`

{output}
True
{/output}

> 💡 **or is generous** — only False if **both False**.

### 🟢 not — Flip the value

> 🌙 "If it's **not** dark, let's go for a walk!"

\`\`\`python
print(not True)
print(not False)
\`\`\`

{output}
False
True
{/output}`
        },
        {
          id: "logic-explain-table",
          type: "explain",
          title: "🎯 Memorize one cell, not four",
          content: `**and** is True ONLY when both are True. Everything else is False.

| and | True | False |
|---|---|---|
| **True** | ✅ True | False |
| **False** | False | False |

**or** is False ONLY when both are False. Everything else is True.

| or | True | False |
|---|---|---|
| **True** | True | True |
| **False** | True | ❌ False |

> 🎯 Just remember the highlighted cell in each table.`
        },
        {
          id: "predict-and-or-mix",
          type: "predict",
          title: "💭 Predict — and vs or",
          content: "What do these two lines print?",
          code: "print(True and False)\nprint(True or False)",
          options: ["False\nTrue", "True\nFalse", "True\nTrue", "False\nFalse"],
          answer: 0,
          explanation: "and is strict — one False breaks it → False. or is generous — one True is enough → True."
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
          title: "📌 For reference (skip OK) — is / is not / None check",
          content: `> 💡 This part comes back naturally in lesson 11 (conditionals). **It's OK to just skim it for now!**

While \`==\` checks if **values are equal**, \`is\` checks if it's **the very same object**.

The most common use: **checking for \`None\`**.

\`\`\`python
x = None

print(x is None)
print(x is not None)
\`\`\`

{output}
True
False
{/output}

> 💡 \`x is None\` is the Pythonic style. \`== None\` works but \`is None\` is clearer.`
        },
        {
          id: "predict-is-none",
          type: "predict",
          title: "📌 For reference (skip OK) — Predict: is None",
          content: "💡 This comes back naturally in lesson 11 (conditionals). OK to just skim for now!\n\nWhen x is None, what do these two checks return?",
          code: "x = None\nprint(x is None)\nprint(x is not None)",
          options: ["True\nFalse", "False\nTrue", "True\nTrue", "False\nFalse"],
          answer: 0,
          explanation: "x really IS None → 'is None' returns True; 'is not None' returns False. They're exact opposites."
        },
        {
          id: "is-not-explain-rest",
          type: "explain",
          title: "🔁 not alone (+ 📌 for-reference (skip OK) not in)",
          content: `### not — flip in front

Put \`not\` **in front** of a value to flip True/False.

\`\`\`python
print(not True)
print(not False)
print(not (5 > 3))
\`\`\`

{output}
False
True
False
{/output}

### 📌 For reference — not in (lesson 5 covers this properly)

> 💡 This comes back naturally in lesson 5 (string operations). OK to just skim for now!

Check if a character is **not in** a string. (opposite of \`in\` — \`in\` is introduced next lesson.)

\`\`\`python
print('a' not in 'hello')
print('e' not in 'hello')
\`\`\`

{output}
True
False
{/output}

> 🎯 Summary: **is = "the very same?", not = "opposite", not in = "opposite of in".**`
        },
        {
          id: "try-is-not",
          type: "tryit",
          title: "📌 For reference (skip OK) — Try It: None check + flip",
          task: "💡 This comes back naturally in lesson 11 (conditionals). OK to just skim for now!\n\nCheck whether name is None, then flip that result. Print both!",
          initialCode: "name = None\ncheck = name ___ None\nopposite = ___ check\nprint('None?', check)\nprint('not?', opposite)",
          expectedOutput: "None? True\nnot? False",
          hint: "First blank: 2-letter None check. Second: one word to flip.",
          hint2: "is / not",
          choices: ["is", "not", "==", "!=", "is not"]
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
print(age >= 13 and height >= 130)

# Holiday: Saturday OR Sunday (either)
day = "Sat"
print(day == "Sat" or day == "Sun")
\`\`\`

{output}
True
True
{/output}

Each comparison gives True/False, then \`and\` / \`or\` combines them into a single check.

(Conditionals are in lesson 11 — that's where you branch on these results with \`if\`.)`
        },
        {
          id: "try-logic-real",
          type: "tryit",
          title: "🖥️ Try It — Two conditions at once",
          task: "Check if score ≥ 60 AND attendance ≥ 80% in one line, then print True/False!",
          initialCode: "score = 75\nattendance = 85\nresult = score >= 60 ___ attendance >= 80\nprint(result)",
          expectedOutput: "True",
          hint: "The operator that needs both conditions to be True!",
          hint2: "and",
          choices: ["and", "or", "not", "xor"]
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
          title: "📝 Compound assignment — meet +=",
          content: `When you re-use the same variable, there's a shorthand. It's such a common pattern that Python gave it a shorter name.

\`\`\`python
score = 100
score = score + 10   # Long way — "set score to score+10"
score += 10          # Short way — same meaning!
\`\`\`

Read \`+=\` as: "**add 10 to the current value and store it back**".`
        },
        {
          id: "compound-update-visual",
          type: "interactive",
          title: "🎬 See how += actually works",
          description: "Step through a variable update like x = x + 2 visually. += is doing the same thing under the hood.",
          component: "variableUpdateVisualizer",
        },
        {
          id: "try-compound-after-visual",
          type: "tryit",
          title: "🖥️ Try It — Type out the += you just saw",
          task: "Same thing you just watched — start with x = 5, add 3, store back, then print!",
          initialCode: "x = 5\nx ___ 3\nprint(x)",
          expectedOutput: "8",
          hint: "Short form for 'add and store back'!",
          hint2: "+=",
          choices: ["+=", "-=", "*=", "=", "=="]
        },
        {
          id: "compound-explain-table",
          type: "explain",
          title: "📋 All compound variants",
          content: `Any arithmetic operator + \`=\` works the same way.

| Short | Long | Meaning |
|---|---|---|
| \`x += 1\` | \`x = x + 1\` | add 1 |
| \`x -= 1\` | \`x = x - 1\` | subtract 1 |
| \`x *= 2\` | \`x = x * 2\` | double |
| \`x /= 2\` | \`x = x / 2\` | halve |
| \`x //= 2\` | \`x = x // 2\` | halve (quotient) |
| \`x %= 10\` | \`x = x % 10\` | remainder by 10 |
| \`x **= 2\` | \`x = x ** 2\` | square |`
        },
        {
          id: "compound-explain-game",
          type: "explain",
          title: "🎮 Common in games — += / -=",
          content: `\`\`\`python
hp = 100
hp -= 20      # took 20 damage → hp goes down
score = 0
score += 10   # earned points → score goes up
\`\`\`

> 💡 \`+=\` shows up most often in **counters (score, count)** and **HP/resource updates**. You'll see it a lot in upcoming lessons.`
        },
        {
          id: "predict-hp-compound",
          type: "predict",
          title: "💭 Predict — HP after two hits",
          content: "What's hp after taking damage twice?",
          code: "hp = 100\nhp -= 30\nhp -= 15\nprint(hp)",
          options: ["55", "85", "70", "45"],
          answer: 0,
          explanation: "100 → (-30) → 70 → (-15) → 55. -= subtracts from the current value and stores it back, so the effect stacks."
        },
        {
          id: "pre-try5",
          type: "quiz",
          title: "🤔 Which compound assignment?",
          content: "**'Took damage = subtract and store' — which compound assignment?**",
          options: ["+= (add and store)", "-= (subtract and store)", "*= (multiply and store)", "= (just assign)"],
          answer: 1,
          explanation: "*Subtract and store* = `-=`. Same pattern: `*=`, `+=`, `/=` work identically."
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It — Compound assignment",
          task: "Start with hp = 100, subtract 30 and store back to hp, then print!",
          initialCode: "hp = 100\nhp ___ 30\nprint(hp)",
          expectedOutput: "70",
          hint: "Compound operator that subtracts and stores!",
          hint2: "-=",
          choices: ["-=", "+=", "*=", "/=", "="]
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
          task: "Compute BMI for weight 60kg, height 1.65m using exponent. (BMI = weight / height²)\n\n💡 `round(value, 1)` rounds to 1 decimal place (22.038... → 22.0). New function — just copy it.",
          initialCode: "weight = 60      # kg\nheight = 1.65    # m\n\n# Use exponent (two stars) for height squared\nbmi = weight / (height ___ 2)\n\nprint(\"BMI:\", round(bmi, 1))   # round(value, 1) = 1 decimal place",
          expectedOutput: "BMI: 22.0",
          hint: "height ** 2 for the square.",
          hint2: "bmi = weight / (height ** 2)"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Break seconds into h/m/s",
          task: "Break 5425 seconds into hours, minutes, seconds and print each. (use // and %)",
          initialCode: "total_sec = 5425\n\n# One operator per line — slow and steady!\nhours = total_sec // 3600         # hours = quotient (filled in for you)\nremaining = total_sec ___ 3600    # leftover seconds = remainder\nminutes = remaining // 60         # minutes = quotient (filled in for you)\nseconds = remaining ___ 60        # seconds = remainder\n\nprint(\"hours:\", hours)\nprint(\"minutes:\", minutes)\nprint(\"seconds:\", seconds)",
          expectedOutput: "hours: 1\nminutes: 30\nseconds: 25",
          hint: "Both blanks use the 'remainder' operator.",
          hint2: "remaining = total_sec % 3600\nseconds = remaining % 60"
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
