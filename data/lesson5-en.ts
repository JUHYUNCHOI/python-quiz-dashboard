// ============================================
// Lesson 5: String Operations (English)
// ============================================
import { LessonData } from './types'

export const lesson5EnData: LessonData = {
  id: "5",
  title: "String Operations",
  emoji: "🔗",
  description: "Let's add and multiply strings!",
  chapters: [
    {
      id: "ch1",
      title: "Adding Strings",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 You Can Add Strings Too!",
          content: `Think only numbers can be added? Strings can be added too!

\`\`\`python
first = "Hello"
second = " there"
print(first + second)  # Hello there
\`\`\`

String + String = **Concatenation!**

### Where do you use this?

- **Greetings** — \`"Hi, " + name + "!"\`
- **File path joining** — \`folder + "/" + filename\`
- **Message composition** — score + name + status
- **Decoration** — separators, boxes, tables (\`*\` repeat)

The first tool for string handling. Master this and the next chapters get easier.`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 String Concatenation",
          content: `Use the **+** operator to glue strings together!

### Why does this work?

For numbers, \`+\` means "add". For strings, it means "**join end to end**" — same symbol, different meaning depending on the type.

\`\`\`python
name = "Tom"
greeting = "Hey, " + name + "!"
print(greeting)
\`\`\`

You can join as many as you want — Python reads them left to right:

\`\`\`python
a = "Py"
b = "th"
c = "on"
print(a + b + c)   # Python
\`\`\`

### Common uses

- **Greetings** — \`"Hi, " + name\`
- **File paths** — \`folder + "/" + filename\`
- **Sentences from variables** — title + " by " + author

### ⚠️ Watch out — no automatic spaces!

\`\`\`python
print("Hello" + "World")    # HelloWorld  ← stuck together!
print("Hello" + " " + "World")   # Hello World
\`\`\`

If you want a space, you have to add \`" "\` yourself. Python won't guess.

### ❌ What doesn't work

\`\`\`python
print("Hi" + 5)   # TypeError — can't add string and number directly
\`\`\`

We'll see how to handle this in Chapter 3!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Fill the blank with a variable NAME (not the value) so it prints \"Hey, Mike!\"",
          initialCode: "name = \"Mike\"\n# Put the variable name in the blank (NOT the value)\ngreeting = \"Hey, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "Hey, Mike!",
          hint: "What's the name of the variable that holds \"Mike\"?",
          hint2: "name"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"Hello\" + \"World\"?",
          options: ["Hello World", "HelloWorld", "Hello + World", "Error"],
          answer: 1,
          explanation: "String + joins them directly without spaces! If you need a space, you have to add \" \" explicitly."
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() — String length",
          content: `\`len()\` tells you **how many characters** a string has.

> 💡 \`len\` is short for **\`length\`** — easy to remember once you know!

### How does it work?

You hand the string to \`len()\` like passing it to a counter. It counts every character — letters, digits, spaces, symbols, all of them — and gives you back the number.

\`\`\`python
text = "hello"
print(len(text))   # 5

print(len("hi!"))  # 3 — the ! counts too
print(len("a b"))  # 3 — the space counts too
\`\`\`

### Common uses

- **Password length check** — is it at least 8?
- **Show message length** — character count display
- **Detect empty input** — is \`len(name) == 0\`?
- **Last index** — \`len(s) - 1\` is the last position

### Edge case — empty string

\`\`\`python
print(len(""))    # 0 — nothing inside, length 0
print(len(" "))   # 1 — one space, still counts!
\`\`\`

### ❌ What doesn't work

\`\`\`python
print(len(123))    # TypeError — numbers don't have a "length"
\`\`\`

\`len\` is for things you can count items in — strings now, lists/dicts/sets later. Numbers are single values, so they have no length.

### Use case — show password length

\`\`\`python
pwd = "secret12"
print("length:", len(pwd))
\`\`\``
        },
        {
          id: "indexing",
          type: "explain",
          title: "🔢 Indexing — grab a single character",
          content: `Strings support \`[index]\` like lists do, one character at a time.

### From the front — 0, 1, 2, ...

\`\`\`python
text = "Python"
#       P  y  t  h  o  n
#      [0][1][2][3][4][5]

print(text[0])    # P (first)
print(text[3])    # h
\`\`\`

> The first character is \`[0]\`, not \`[1]\` — computers count from 0!

### From the back — -1, -2, ...

We often need the **last** character. But \`text[5]\` requires knowing the length — annoying.

**Negative indices** let you count **from the back**!

\`\`\`python
text = "Python"
#        P  y  t  h  o  n
#      [-6][-5][-4][-3][-2][-1]   ← from the back

print(text[-1])   # n (last)
print(text[-2])   # o (second from end)
\`\`\`

\`text[-1]\` is **always the last character** — no need to know the length! Used everywhere.

### Quick first / last extraction

\`\`\`python
name = "Alice"
initial = name[0]      # 'A' — initial
last = name[-1]        # 'e' — last character
print(name, "initial:", initial)
# Alice initial: A
\`\`\`

### ⚠️ Index out of range = error!

\`\`\`python
text = "hi"
print(text[5])   # IndexError
\`\`\`

Safe range: \`0 ~ len(text)-1\` (from front), \`-len(text) ~ -1\` (from back).`
        },
        {
          id: "predict-neg-index",
          type: "predict",
          title: "💭 What character will appear?",
          content: `What does this code print?

\`\`\`python
word = "MONKEY"
print(word[-2])
\`\`\``,
          options: ["M", "K", "E", "Y"],
          answer: 2,
          explanation: "MONKEY's last letter is Y (index -1). Just before it is E (index -2). So word[-2] = E.\n\nM(0/-6) O(1/-5) N(2/-4) K(3/-3) E(4/-2) Y(5/-1) — positive and negative indices point to the same character."
        },
        {
          id: "try-len-index",
          type: "tryit",
          title: "🖥️ Try It — Length and Index",
          task: "Print the first character, last character, and length of a name!",
          initialCode: "name = \"Python\"\n\n# First character\nfirst = name[___]\n# Last character (negative index)\nlast = name[___]\n# Length\nlength = ___(name)\n\nprint(\"first:\", first)\nprint(\"last:\", last)\nprint(\"length:\", length)",
          expectedOutput: "first: P\nlast: n\nlength: 6",
          hint: "First character is index 0. Use a negative index for the last one. There's a built-in for length too.",
          hint2: "0 / -1 / len"
        }
      ]
    },
    {
      id: "ch2",
      title: "Multiplying Strings",
      emoji: "✖️",
      steps: [
        {
          id: "multiply-explain",
          type: "explain",
          title: "✖️ String × Number",
          content: `When you multiply a string by a number, **the same string repeats that many times**!

\`"Ha" * 3\` is exactly the same as \`"Ha" + "Ha" + "Ha"\` — just a **shorter way to write it**.

\`\`\`python
print("Ha" * 3)       # HaHaHa
print("=" * 5)        # =====
print("Hi! " * 2)     # Hi! Hi!
\`\`\`

> 💡 You can write it as \`5 * "="\` too — **order doesn't matter**!

### Common uses

- **Separators / borders** — \`"=" * 50\`
- **Indentation / spacing** — \`" " * 4\`
- **Visual scoring** — \`"⭐" * 5\`
- **Repeating patterns** — \`"-=" * 10\`

### Usage example — menu border

\`\`\`python
print("=" * 8)
print(" Menu ")
print("=" * 8)
\`\`\`

Result:
\`\`\`
========
 Menu
========
\`\`\`

### ⚠️ What about 0 or negative?

\`\`\`python
print("Ha" * 0)    # (empty string — nothing prints)
print("Ha" * -3)   # (also empty, no error)
\`\`\`

Surprising! Try it yourself.

### ❌ What doesn't work

\`\`\`python
print("3" * "Ha")    # TypeError — string × string not allowed
print("Ha" * 2.5)    # TypeError — no floats, integers only!
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 5 asterisks (*)! Fill the blank with a NUMBER (repeat count).",
          initialCode: "# Put the repeat count (a number) in the blank\nprint(\"*\" * ___)",
          expectedOutput: "*****",
          hint: "How many stars should there be? That's your number.",
          hint2: "5"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Make a Divider Line!",
          task: "Print 8 equal signs (=) to make a divider! Blank is a NUMBER.",
          initialCode: "# Put the repeat count (number) in the blank\nprint(\"=\" * ___)",
          expectedOutput: "========",
          hint: "How many = signs do you need? That's the number.",
          hint2: "8"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"AB\" * 3?",
          options: ["AB3", "ABABAB", "AB AB AB", "Error"],
          answer: 1,
          explanation: "The entire string repeats 3 times! AB + AB + AB = ABABAB"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 in — Is it contained?",
          content: `Use \`in\` to ask "**does this string contain that piece?**" The answer is \`True\` or \`False\`.

### Why is this useful?

Without \`in\`, checking "does this sentence contain the word 'love'?" would mean walking through every character yourself. \`in\` does that for you — one short line, clear answer.

\`\`\`python
text = "I love Python"

print("love" in text)
print("Java" in text)
\`\`\`

> Try to predict: which line prints True, which prints False?

### ⚠️ Case-sensitive!

\`\`\`python
print("Python" in "I love Python")   # True
print("python" in "I love Python")   # False — capital P matters!
\`\`\`

\`P\` and \`p\` are different characters to Python.

### Common uses

- **Search** — does this comment contain a keyword?
- **Filter** — show only messages with "urgent" in them
- **Validation** — does the email contain \`"@"\`?
- **Tag check** — is "python" in the post tags?

### Use case — show whether a word appears

\`\`\`python
text = "I love Python"
print("contains 'love'?:", "love" in text)
print("contains 'Java'?:", "Java" in text)
\`\`\`

Notice the **comma** in \`print\` — that's how we print a label and a True/False result side by side. \`+\` won't work here (string + bool = error).

### not in — the opposite

\`\`\`python
print("foo" not in "hello")    # True — "foo" really isn't there
print("ell" not in "hello")    # False — "ell" IS there
\`\`\`

> 💡 Want to ignore case? You'll learn \`text.lower()\` in lesson 6.`
        },
        {
          id: "compare-explain",
          type: "explain",
          title: "📊 String comparison — ==, <, >",
          content: `Strings can be **compared** just like numbers — equal, not equal, smaller, bigger.

### == and != — exact match check

\`==\` asks "are these two strings *exactly* the same?" Every character has to match.

\`\`\`python
a = "hello"
b = "hello"
c = "Hello"

print(a == b)
print(a == c)
print(a != c)
\`\`\`

> Predict: which print True, which False? (Hint: H and h are different.)

### Common uses

- **Password check** — \`entered == real\`
- **Yes/no answers** — \`answer == "y"\`
- **Menu choices** — \`choice == "1"\`
- **State check** — \`status == "done"\`

### Alphabetical / dictionary order — < and >

\`\`\`python
print("apple" < "banana")   # True — 'a' comes before 'b'
print("a" < "b")            # True
print("kiwi" < "apple")     # False — 'k' comes after 'a'
\`\`\`

→ Words that come **earlier in the dictionary** are "smaller". Useful for sorting names later!

### ⚠️ Uppercase vs lowercase — surprise

\`\`\`python
print("apple" < "Apple")    # False — uppercase is "smaller"!
\`\`\`

Python uses character codes (ASCII) where every uppercase letter is smaller than every lowercase letter. \`"Z" < "a"\` is \`True\` — weird but true. Mix cases carefully when sorting.

### Use case — show answer comparison

\`\`\`python
answer = "y"
print("is y?:", answer == "y")
print("is n?:", answer == "n")
\`\`\`

Comma-print again — handy for showing a label next to a True/False result.`
        },
        {
          id: "try-in-compare",
          type: "tryit",
          title: "🖥️ Try It — in and ==",
          task: "Blank 1: the keyword between \"good\" and comment. Blank 2: the string to compare with status (include quotes!).",
          initialCode: "comment = \"This is good!\"\nstatus = \"OK\"\n\n# Blank: containment keyword\nhas_good = \"good\" ___ comment\n\n# Blank: the string to compare (with quotes)\nis_ok = status == ___\n\nprint(\"has 'good':\", has_good)\nprint(\"OK:\", is_ok)",
          expectedOutput: "has 'good': True\nOK: True",
          hint: "Blank 1: containment keyword (2 letters). Blank 2: the full \"OK\" string with quotes.",
          hint2: "in / \"OK\""
        }
      ]
    },
    {
      id: "ch3",
      title: "Strings and Numbers",
      emoji: "🔢",
      steps: [
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ String + Number = Error!",
          content: `Try this — what do you think happens?

\`\`\`python
age = 15
print("Age: " + age)
\`\`\`

You might expect \`Age: 15\`. But Python throws a **TypeError**!

### Why?

\`+\` means different things for different types:
- string + string → join end to end
- number + number → add

But **string + number**? Python doesn't guess. Some languages would auto-convert; Python refuses on purpose — being strict prevents bugs later.

\`\`\`text
TypeError: can only concatenate str (not "int") to str
\`\`\`

### ✅ The easy way — use print()'s comma

\`print()\` is smart. Give it a **comma** between things, and it handles any type — string, number, True/False — automatically.

\`\`\`python
age = 15
print("Age:", age)
\`\`\`

Output:
\`\`\`text
Age: 15
\`\`\`

\`print()\` even adds a space between items for you.

### Common uses for comma-print

- **Show variable values** — \`print("score:", score)\`
- **Mix labels and numbers** — \`print("count:", n, "items")\`
- **Print True/False results** — \`print("found:", "love" in text)\`

### What about combining into one string?

Sometimes you really need **one combined string** (not just printing). For that, you'll learn:
- **lesson 8** — f-strings: \`f"Age: {age}"\` (the cleanest way!)
- **lesson 9** — \`str()\` to convert numbers into strings on purpose

For now, **comma-print** is all you need. 🎯`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Fill the blank with a VARIABLE NAME (not the value 100) to print \"Score: 100\".",
          initialCode: "score = 100\n# Variable NAME in the blank (NOT the value 100)\nprint(\"Score:\", ___)",
          expectedOutput: "Score: 100",
          hint: "What's the name of the variable holding 100?",
          hint2: "score"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Fill both blanks with VARIABLE NAMES (not values \"Tom\" or 15) to print \"Tom is 15\".",
          initialCode: "name = \"Tom\"\nage = 15\n# Both blanks are variable NAMES (NOT \"Tom\" or 15 directly)\nprint(___, \"is\", ___)",
          expectedOutput: "Tom is 15",
          hint: "Blank 1: variable holding \"Tom\". Blank 2: variable holding 15.",
          hint2: "name / age"
        },
        {
          id: "escape-explain",
          type: "explain",
          title: "🔧 Escape characters — special chars",
          content: `What if you want a **newline** inside a string? Or a **quote** inside a string that's already wrapped in quotes? You need a trick.

### The problem — quote conflict

\`\`\`python
text = "He said "hi""    # ❌ SyntaxError
\`\`\`

Python sees the second \`"\` as the end of the string, then gets confused by \`hi""\` after it. We need a way to say "this quote is **part of the string**, not the end."

### The solution — backslash \\

A backslash tells Python "**treat the next character specially**":

\`\`\`python
text = "He said \\"hi\\""
print(text)
\`\`\`

The \`\\"\` is "an actual quote character, not the end of the string."

### Common escapes

| Notation | Meaning | Example |
|---|---|---|
| \`\\n\` | newline | \`"a\\nb"\` → \`a\` then \`b\` on next line |
| \`\\t\` | tab | \`"a\\tb"\` → \`a    b\` |
| \`\\"\` | double quote | inside \`"..."\` |
| \`\\'\` | single quote | inside \`'...'\` |
| \`\\\\\` | backslash itself | \`"C:\\\\folder"\` → \`C:\\folder\` |

### Common uses

- **Multi-line output** — one \`print\` with \`\\n\` between sections
- **Tab-aligned columns** — \`"name\\tscore"\`
- **Quoted text inside strings** — \`"\\"hello\\""\`
- **Windows file paths** — \`"C:\\\\Users\\\\..."\`

### Easier trick — mix quote types

If your text contains \`"\`, wrap it in \`'\` (and vice versa). No backslash needed!

\`\`\`python
print("It's fine")         # outer "..." → inner ' is fine
print('She said "hello"')  # outer '...' → inner " is fine
\`\`\`

### Multi-line — triple quotes

For long multi-line text, \`"""..."""\` keeps newlines as you type them:

\`\`\`python
text = """First line
Second line
Third line"""
print(text)
\`\`\`

> 💡 Memorize **\`\\n\`** and **\`\\t\`** — those are the ones you'll really use.`
        },
        {
          id: "try-escape",
          type: "tryit",
          title: "🖥️ Try It — Escape and newline",
          task: "No blanks — just run it to see how \\n and \\t render!",
          initialCode: "# No blanks — just press Run\nprint(\"Title\\n\\titem 1\\n\\titem 2\")",
          expectedOutput: "Title\n\titem 1\n\titem 2",
          hint: "Press Run — \\n becomes a newline, \\t becomes a tab.",
          hint2: ""
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
          content: `## String Operations Summary

**Addition (+)** — Concatenation
\`\`\`python
"Hello" + "World"   # HelloWorld
\`\`\`

**Multiplication (*)** — Repetition
\`\`\`python
"Ha" * 3            # HaHaHa
\`\`\`

**Printing with numbers** — use \`print()\` comma (today's lesson!)
\`\`\`python
score = 100
print("Score:", score)   # Score: 100
\`\`\`

> 💡 Combining a number into one string (like \`"Score: 100"\` as one value)? That comes later — **f-strings in lesson 8**, **str() in lesson 9**.`
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 1 — Menu board",
          task: "Fill 4 blanks: top 2 = divider repeat count (8 each), bottom 2 = prices (18000, 19000).",
          initialCode: "# Blanks 1,2: = repeat count (number)\nprint(\"=\" * ___)\nprint(\"  🍗 Chicken Shop  \")\nprint(\"=\" * ___)\n# Blanks 3,4: prices (numbers)\nprint(\"Fried:\", ___)\nprint(\"Spicy:\", ___)",
          expectedOutput: "========\n  🍗 Chicken Shop  \n========\nFried: 18000\nSpicy: 19000",
          hint: "Divider needs 8 of =. Fried 18000, Spicy 19000.",
          hint2: "8 / 8 / 18000 / 19000"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 2 — Password info card",
          task: "Print the password and its length on two lines!\nExample output:\npassword: abc12\nlength: 5",
          initialCode: "pwd = \"abc12\"\n\n# Line 1: print the password\nprint(\"password:\", ___)\n\n# Line 2: print the length (use len() with print() comma)\nprint(\"length:\", ___(pwd))",
          expectedOutput: "password: abc12\nlength: 5",
          hint: "Blank 1: the pwd variable. Blank 2: the function that returns string length.",
          hint2: "pwd / len"
        },
        {
          id: "mission4",
          type: "mission",
          title: "🏆 Mission 3 — Initial card",
          task: "Both blanks are INDEX NUMBERS — the index pointing to the first character.",
          initialCode: "first = \"Alice\"\nlast = \"Choi\"\n\n# Blanks: index (number) pointing to the first character\ninitials = (first[___] + last[___]).upper()\n\nprint(\"=\" * 8)\nprint(\"  \" + initials)\nprint(first + \" \" + last)\nprint(\"=\" * 8)",
          expectedOutput: "========\n  AC\nAlice Choi\n========",
          hint: "What's the index of the first character? (counting from 0)",
          hint2: "0 / 0"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **+** for string concatenation
✅ **\\*** for string repetition (separators)
✅ **len()** for string length
✅ **Indexing \`s[0]\`, \`s[-1]\`** — single character
✅ **in / not in** — substring check
✅ **==, <, >** — equality / dictionary order
✅ **print() comma** — print labels with numbers without errors
✅ **Escapes** — \`\\n\` newline, \`\\t\` tab, \`\\"\` quote
✅ **Triple quotes** — multi-line at once

Next time, we'll learn about **string methods** — case change, whitespace stripping, search/replace, and more! 🚀`
        }
      ]
    }
  ]
}
