// ============================================
// Lesson 2: Data Types (English)
// ============================================
import { LessonData } from './types'

export const lesson2EnData: LessonData = {
  id: "2",
  title: "Data Types",
  emoji: "📊",
  description: "Learn the differences between numbers, strings, and booleans!",
  chapters: [
    {
      id: "ch1",
      title: "What are Data Types?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📊 Data comes in different types!",
          content: `The same \`5\` behaves differently as a **number 5** vs. text **"5"**.

- \`5 + 3\` → **8** (addition)
- \`"5" + "3"\` → **"53"** (joining text!)

> 💡 Python looks at the **type** of a value to decide "how should I handle this?"

The 4 types we'll learn today, in one line:

- **integer** (10, -5) · **float** (3.14) · **text** ("hello") · **True/False**

Let's look at each one!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 Number types — integer and float",
          content: `Numbers split into **two kinds**, based on one thing: does it have a decimal point?

### 1️⃣ **Integer** <span style="font-size:0.85em; opacity:0.7">(short name: int)</span> — whole numbers, no decimal

\`\`\`python
10, -5, 0, 1000
\`\`\`

**Often used for:** age, score, number of people, item counts — **anything you can count**

---

### 2️⃣ **Float** <span style="font-size:0.85em; opacity:0.7">(short name: float)</span> — numbers with a decimal point

\`\`\`python
3.14, -0.5, 2.0
\`\`\`

> 💡 \`2.0\` is also a float! Just adding **.0** turns it into a float.

**Often used for:** height, weight, average scores, probability

---

> 💡 **If the short names feel scary,** just remember the **plain names** (integer / float) for now!`
        },
        {
          id: "predict-num-type",
          type: "predict",
          title: "💭 What type is 7.0?",
          content: "Just one thing to check — is there a decimal point?",
          code: "print(type(7.0))",
          options: [
            "<class 'int'>",
            "<class 'float'>",
            "<class 'str'>",
            "<class 'bool'>"
          ],
          answer: 1,
          explanation: "It has `.0`, so it's a float! Even if it looks like a whole number, the decimal point makes it a float."
        },
        {
          id: "types-explain-text",
          type: "explain",
          title: "📋 Text and True/False — string and boolean",
          content: `Now the two non-number types.

### 3️⃣ **String** <span style="font-size:0.85em; opacity:0.7">(short name: str)</span> — letters

\`\`\`python
"hello", 'python', "123"
\`\`\`

⚠️ **If it has quotes, it's a string — always!** \`123\` is a number, but \`"123"\` is the text "123".
- \`"double quotes"\` ✅
- \`'single quotes'\` ✅ — both fine, just match the pair

**Often used for:** names, messages, addresses, phone numbers — **anything made of letters**

---

### 4️⃣ **Boolean** <span style="font-size:0.85em; opacity:0.7">(short name: bool)</span> — True or False

\`\`\`python
True, False
\`\`\`

⚠️ **Must start with a capital letter!** \`true\` ❌, \`True\` ✅

**Often used for:** logged in or not, pass/fail — anything that's **one of exactly two options**`
        },
        {
          id: "try-type-print",
          type: "tryit",
          title: "🖥️ Type `print(type(10))` yourself!",
          task: "Run the code below as-is.\n\n💡 The output will look a bit busy — something like `<class 'int'>`. **Just look at the word inside the quotes (`int`)!** The rest is automatic packaging Python adds for you.",
          initialCode: "print(type(10))",
          expectedOutput: "<class 'int'>",
          hint: "Just hit ▶ Run.",
          hint2: "print(type(10))"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ What type is 3.14?",
          content: "What type is 3.14?",
          options: ["int (integer)", "float (floating-point)", "str (string)", "bool (boolean)"],
          answer: 1,
          explanation: "It has a decimal point, so it's a float!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Checking Types",
      emoji: "🔍",
      steps: [
        {
          id: "type-explain",
          type: "explain",
          title: "🔍 The type() Function",
          content: `When you're **not sure what type a value is**, drop it inside \`type()\` to find out!

\`\`\`python
print(type(10))       # <class 'int'>   ← integer (int) type
print(type(3.14))     # <class 'float'> ← float type
print(type('hello'))  # <class 'str'>   ← string (str) type
print(type(True))     # <class 'bool'>  ← boolean (bool) type
\`\`\`

### 📌 How to read the output — don't be scared by the length!

\`<class 'int'>\` looks long, but you only need to look at **one word — the one inside the quotes**!

> **Rule: in \`<class 'X'>\`, only X matters.**

- \`<class 'int'>\` → **int** (integer)
- \`<class 'str'>\` → **str** (string)
- \`<class 'float'>\` → **float**
- \`<class 'bool'>\` → **bool** (boolean)

The rest of \`<class '...'>\` is just packaging Python adds automatically.

> 💡 The word \`class\` shows up later (lesson 41). For now just treat it as "the label that tells me the type."

### When you'll actually use this

- A friend's code has a value and you can't tell its type
- Checking whether some input is a number or text
- Debugging an error — "wait, maybe the type is wrong?"`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ What's the type of 100?",
          task: "Check the type of 100!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'int'>",
          hint: "Put a value inside type()",
          hint2: "100",
          choices: ["100", "3.14", "'Python'", "True"]
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ What's the type of 'Python'?",
          task: "Check the type of 'Python'!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'str'>",
          hint: "Strings are str!",
          hint2: "'Python'",
          choices: ["100", "3.14", "'Python'", "True"]
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ What does type('123') give?",
          content: "What is the result of type('123')?",
          options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "123"],
          answer: 2,
          explanation: "If it's inside quotes, it's a string (str)!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Boolean Type",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ True and False",
          content: `**Boolean (bool)** can hold only two values — \`True\` or \`False\`.

\`\`\`python
print(True)
print(False)
\`\`\`

What do you think this prints?

{output}
True
False
{/output}

### Everyday analogies

- Is the light on? → True / False
- Did you pass the test? → True / False

**Anything with exactly one of two answers** belongs to bool.

### ⚠️ Must start with a capital letter!

- ✅ \`True\`, \`False\`
- ❌ \`true\`, \`false\` (lowercase doesn't work)

### Compare two values and a bool pops out

\`\`\`python
print(10 > 5)
\`\`\`

10 is greater than 5 — what bool value comes out?

{output}
True
{/output}

> 💡 You'll learn comparison operators like \`>\` in detail in **lesson 4**. For now, just remember "comparison result = bool".`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Check: 10 > 5 → True!",
          task: "10 > 5 → 10 is greater than 5, so the result is True!\nFill in the blank with 5.",
          initialCode: "print(10 > ___)",
          expectedOutput: "True",
          hint: "The result of a comparison is True or False!",
          hint2: "5",
          choices: ["5", "10", "20", "15"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try False too!",
          task: "3 > 7 → 3 is less than 7, so the result is False!\nFill in the blank with 7.",
          initialCode: "print(3 > ___)",
          expectedOutput: "False",
          hint: "3 is less than 7, right?",
          hint2: "7",
          choices: ["7", "2", "1", "0"]
        }
      ]
    },
    {
      id: "ch_errors",
      title: "Watch Out for Errors!",
      emoji: "⚠️",
      steps: [
        {
          id: "phone-explain",
          type: "explain",
          title: "⚠️ What happens with phone numbers?",
          content: `If you write a phone number without quotes, Python reads the hyphens as **subtraction**!

\`\`\`python
555-867-5309   # ❌ SyntaxError! (read as 555 minus 867 minus 5309)
\`\`\`

> 💡 **SyntaxError** = "grammar error". Python yells this when it reads your code and something doesn't make grammatical sense.

Wrap it in quotes to store it as a string:

\`\`\`python
'555-867-5309'  # ✅ str
\`\`\`

⚠️ **Anything with hyphens (-) needs quotes!**
Phone numbers, dates (2024-01-01), codes — always wrap them in quotes.`
        },
        {
          id: "str-num-explain",
          type: "explain",
          title: "⚠️ '3.2' is NOT a float!",
          content: `If it has quotes, it's a **string (str)** — even if it looks like a number!

\`\`\`python
3.2     # float ✅ (actual number)
'3.2'   # str  ❌ (NOT a float!)

100     # int  ✅ (actual number)
'100'   # str  ❌ (NOT an int!)
\`\`\`

Quotes always determine the type!`
        },
        {
          id: "str-int-explain",
          type: "explain",
          title: "⚠️ String + Number = Error!",
          content: `**Mixing different types causes a TypeError ("type mismatch")!**

\`\`\`python
'Score: ' + 95     # ❌ TypeError (type mismatch)
'3.2' + 1.0        # ❌ TypeError (type mismatch)
\`\`\`

> 💡 **TypeError** = "type mismatch". Happens when you mix data of different types — like str (text) + int (number).

Only the same types can be combined:
\`\`\`python
'Score: ' + '95'   # ✅ 'Score: 95'
3.2 + 1.0          # ✅ 4.2
\`\`\`

You'll learn how to combine strings with numbers in a **later lesson**. For now, just remember "different types + each other → error".`
        },
        {
          id: "predict-type-error",
          type: "predict",
          title: "💭 Predict the result!",
          content: "What happens when this code runs? Guess first, then pick.",
          code: "print(\"Score: \" + 95)",
          options: [
            "Prints: Score: 95",
            "Prints Score: and drops the 95",
            "Throws a TypeError",
            "Prints 95 Score"
          ],
          answer: 2,
          explanation: "The string \"Score: \" and the integer 95 are different types, so + can't combine them. Red error message: `TypeError: can only concatenate str (not \"int\") to str`. Once you've seen this message, you'll recognize it instantly the next time it happens."
        },
        {
          id: "quiz-error1",
          type: "quiz",
          title: "❓ How to store a phone number?",
          content: "How do you store the phone number 555-867-5309?",
          options: [
            "phone = 555-867-5309",
            "phone = '555-867-5309'",
            "phone = 555.867.5309",
            "phone = 555 867 5309"
          ],
          answer: 1,
          explanation: "Hyphens (-) mean subtraction in Python! Wrap it in quotes to store it as a string."
        },
        {
          id: "quiz-error2",
          type: "quiz",
          title: "❓ What does 'Score: ' + 95 give?",
          content: "What is the result of print('Score: ' + 95)?",
          options: [
            "Score: 95",
            "'Score: 95'",
            "TypeError (Error!)",
            "Score95"
          ],
          answer: 2,
          explanation: "str + int causes a TypeError! You'll soon learn f-strings: f'Score: {95}'."
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 Summary",
          content: `## Data Types Summary

| Type | Example | Description |
|------|---------|-------------|
| int | 10, -5 | Integer |
| float | 3.14, 2.0 | Floating-point |
| str | "hello", '123' | String |
| bool | True, False | Boolean |

**Remember!**
- Strings **require quotes**
- Booleans **start with a capital letter**

Now let's wrap up with the final mission! 🏆`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "💡 4 blanks — each line, put the **first value** of `print` inside `type(___)` exactly the same.\nEx) `print(42, type( 42 ))` → `42 <class 'int'>`\n\nAll 4 lines follow the same pattern! (42 / 3.14 / 'Hello' / True)",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "Blank 1 → 42, Blank 2 → 3.14, Blank 3 → 'Hello', Blank 4 → True",
          hint2: "42",
          choices: ["42", "3.14", "'Hello'", "True"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **int** - Integer (10, -5)
✅ **float** - Float (3.14)
✅ **str** - String ("hello")
✅ **bool** - Boolean (True, False)
✅ **type()** - Check the type

Next time, we'll learn about **variables**! 📦`
        },
        {
          id: "bonus-facts",
          type: "explain",
          title: "📌 Optional reading (skip if you want)",
          content: `That's the **core lesson** done. Below are **optional** fun facts — just go "huh, neat" and move on. No need to memorize.

---

### 🤔 Fun fact 1: the float gotcha

Computers can't store decimals with perfect accuracy.

\`\`\`python
print(0.1 + 0.2)
\`\`\`

You might expect 0.3, but the actual output is:

{output}
0.30000000000000004
{/output}

Not getting exactly 0.3 is **normal**! Just "this can happen" for now.

---

### 🤔 Fun fact 2: True / False behave like numbers

\`True\` is 1, \`False\` is 0.

\`\`\`python
print(True + True)
\`\`\`

{output}
2
{/output}

You'll meet this again in the conditionals lesson (lesson 11).

---

> 💡 Don't memorize! Just "huh, that exists" — totally fine to move on to the next lesson.`
        }
      ]
    }
  ]
}
