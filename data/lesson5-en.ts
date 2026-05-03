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
- Connecting user input with prompts

The first tool for string handling. Master this and the next chapters get easier.`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 String Concatenation",
          content: `Use the **+** operator to join strings together!

\`\`\`python
name = "Tom"
greeting = "Hey, " + name + "!"
print(greeting)  # Hey, Tom!
\`\`\`

You can join multiple strings:
\`\`\`python
a = "Py"
b = "th"
c = "on"
print(a + b + c)  # Python
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the name and greeting, then print the result!",
          initialCode: "name = \"Mike\"\n# Use + to connect strings\ngreeting = \"Hey, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "Hey, Mike!",
          hint: "Use the + operator to connect strings",
          hint2: "\"Hey, \" + name + \"!\""
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
          content: `\`len()\` gives the number of characters in a string.

> 💡 \`len\` is short for **\`length\`**. Easy to remember once you know!

\`\`\`python
text = "hello"
print(len(text))   # 5

print(len("hi!"))  # 3

print(len(""))     # 0 — empty string
\`\`\`

### Use case — password length check

\`\`\`python
pwd = input("password: ")
if len(pwd) < 8:
    print("Must be 8+ characters!")
else:
    print("OK")
\`\`\`

> 💡 \`len\` works on strings, lists, tuples, dicts, sets — useful everywhere.`
        },
        {
          id: "indexing",
          type: "explain",
          title: "🔢 Indexing — grab a single character",
          content: `Strings support \`[index]\` like lists do, one character at a time.

\`\`\`python
text = "Python"
#       P y t h o n
#      [0][1][2][3][4][5]

print(text[0])    # P (first)
print(text[3])    # h
print(text[-1])   # n (last)
print(text[-2])   # o (second from end)
\`\`\`

### Quick first / last extraction

\`\`\`python
name = "Alice"
initial = name[0]      # 'A' — initial
print(f"{name}'s initial: {initial}")
\`\`\`

> ⚠️ **Index out of range = error!**
> \`\`\`python
> text = "hi"
> print(text[5])   # IndexError
> \`\`\`
> Stick to indices smaller than \`len(text)\`.`
        },
        {
          id: "try-len-index",
          type: "tryit",
          title: "🖥️ Try It — Length and Index",
          task: "Print the first character, last character, and length of a name!",
          initialCode: "name = \"Python\"\n\n# First character\nfirst = name[___]\n# Last character (negative index)\nlast = name[___]\n# Length\nlength = ___(name)\n\nprint(f\"first: {first}, last: {last}, length: {length}\")",
          expectedOutput: "first: P, last: n, length: 6",
          hint: "name[0], name[-1], len(name)",
          hint2: "first = name[0]\nlast = name[-1]\nlength = len(name)"
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
          content: `When you multiply a string by a number, it **repeats**!

\`\`\`python
print("Ha" * 3)      # HaHaHa
print("=" * 10)      # ==========
print("Hi! " * 2)    # Hi! Hi!
\`\`\`

**Usage example:**
\`\`\`python
print("=" * 20)
print("  Menu  ")
print("=" * 20)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 10 asterisks (*)!",
          initialCode: "# Repeat a string with *!\nprint(\"*\" * ___)",
          expectedOutput: "**********",
          hint: "String * number = repeat!",
          hint2: "\"*\" * 10"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Make a Divider Line!",
          task: "Print 20 equal signs (=) to make a divider line!",
          initialCode: "print(\"=\" * ___)",
          expectedOutput: "====================",
          hint: "\"=\" * 20",
          hint2: "print(\"=\" * 20)"
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
          content: `Use \`in\` to check whether a string contains a character / word.

\`\`\`python
text = "I love Python"

print("Python" in text)   # True
print("Java" in text)     # False
print("love" in text)     # True
print("LOVE" in text)     # False — case-sensitive!
\`\`\`

### Use case — banned-words filter, topic check

\`\`\`python
comment = input("comment: ")

bad_words = ["dumb", "idiot"]
for w in bad_words:
    if w in comment:
        print("Inappropriate!")
        break
\`\`\`

### not in — opposite

\`\`\`python
print("foo" not in "hello")   # True
\`\`\`

> 💡 To ignore case, lowercase first with \`text.lower()\` (lesson 6 methods).`
        },
        {
          id: "compare-explain",
          type: "explain",
          title: "📊 String comparison — ==, <, >",
          content: `Strings support \`==\` for equality.

\`\`\`python
a = "hello"
b = "hello"
c = "Hello"

print(a == b)   # True
print(a == c)   # False — different case
print(a != c)   # True
\`\`\`

### Alphabetical / dictionary order — < >

\`\`\`python
print("apple" < "banana")   # True (a before b)
print("apple" < "Apple")    # False — uppercase < lowercase (ASCII)
print("a" < "b")            # True
print("kiwi" < "apple")     # False
\`\`\`

→ Words earlier in the dictionary are "smaller". Uppercase < lowercase (ASCII codes).

### Use case — yes/no answer check

\`\`\`python
answer = input("y/n: ").lower()
if answer == "y":
    print("proceeding")
elif answer == "n":
    print("cancelled")
\`\`\``
        },
        {
          id: "try-in-compare",
          type: "tryit",
          title: "🖥️ Try It — in and ==",
          task: "Check if 'good' is in the comment + status equals exactly 'OK'!",
          initialCode: "comment = \"This is good!\"\nstatus = \"OK\"\n\n# 'good' contained?\nhas_good = \"good\" ___ comment\n\n# status exactly 'OK'?\nis_ok = status == ___\n\nprint(f\"has 'good': {has_good}\")\nprint(f\"OK: {is_ok}\")",
          expectedOutput: "has 'good': True\nOK: True",
          hint: "in for substring, == for full equality.",
          hint2: "has_good = \"good\" in comment\nis_ok = status == \"OK\""
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
          content: `You can't directly add a string and a number!

\`\`\`python
age = 15
print("Age: " + age)  # ❌ Error!
\`\`\`

**Solution: Convert with str()!**
\`\`\`python
age = 15
print("Age: " + str(age))  # ✅ Age: 15
\`\`\`

💡 Using f-strings avoids this problem! But it's still good to know **how to concatenate with +**.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the score with a string and print it!",
          initialCode: "score = 100\n# You need a function that converts a number to a string\nprint(\"Score: \" + ___(score) + \" pts\")",
          expectedOutput: "Score: 100 pts",
          hint: "Use str() to convert numbers to strings!",
          hint2: "str(score)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Connect the name and age to print 'Tom is 15 years old'!",
          initialCode: "name = \"Tom\"\nage = 15\n# Convert the number first, then use + to connect\nprint(name + \" is \" + ___(age) + \" years old\")",
          expectedOutput: "Tom is 15 years old",
          hint: "Use str() to convert numbers to strings!",
          hint2: "str(age)"
        },
        {
          id: "escape-explain",
          type: "explain",
          title: "🔧 Escape characters — special chars",
          content: `Need quotes inside quotes, or a newline?

\`\`\`python
# ❌ Quote conflict
text = "He said "hi""    # SyntaxError

# ✅ Backslash \\ to escape
text = "He said \\"hi\\""
print(text)   # He said "hi"
\`\`\`

### Common escapes

| Notation | Meaning | Example |
|---|---|---|
| \`\\n\` | newline | \`"a\\nb"\` → two lines |
| \`\\t\` | tab | \`"a\\tb"\` → a    b |
| \`\\"\` | double quote | \`"\\"hi\\""\` → "hi" |
| \`\\'\` | single quote | \`'\\'hi\\''\` → 'hi' |
| \`\\\\\` | backslash | \`"path\\\\file"\` → path\\file |

### Mix quote types — cleaner

\`\`\`python
# Outer double → inner single OK
print("It's fine")        # It's fine

# Outer single → inner double OK
print('She said "hello"')  # She said "hello"
\`\`\`

### Multi-line — triple quotes

\`\`\`python
text = """First line
Second line
Third line"""
print(text)
\`\`\`

> 💡 Memorize \`\\n\` and \`\\t\`. The rest can usually be avoided by switching quote types.`
        },
        {
          id: "try-escape",
          type: "tryit",
          title: "🖥️ Try It — Escape and newline",
          task: "Build output with \\n for newline and \\t for tab indent in one print!",
          initialCode: "# One print, two lines, tab-indented items\nprint(\"Title\\n\\titem 1\\n\\titem 2\")",
          expectedOutput: "Title\n\titem 1\n\titem 2",
          hint: "Run as-is — \\n newline, \\t tab.",
          hint2: "Just run it."
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

**Addition (+)** - Concatenation
\`\`\`python
"Hello" + "World"  # HelloWorld
\`\`\`

**Multiplication (*)** - Repetition
\`\`\`python
"Ha" * 3  # HaHaHa
\`\`\`

**Joining with numbers** - str() needed
\`\`\`python
"Score: " + str(100)  # Score: 100
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 1 — Menu board",
          task: "Create a nice-looking menu board!",
          initialCode: "print(\"=\" * ___)\nprint(\"    🍗 Chicken Shop    \")\nprint(\"=\" * ___)\nprint(\"Fried: \" + str(___) + \" won\")\nprint(\"Spicy: \" + str(___) + \" won\")",
          expectedOutput: "====================\n    🍗 Chicken Shop    \n====================\nFried: 18000 won\nSpicy: 19000 won",
          hint: "Use * for 20 divider characters, str() to convert prices!",
          hint2: "20 / 18000 / 19000"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 2 — Password length check",
          task: "If password length is 8+ print 'OK', else print 'short (current N chars)'. (input via stdin)",
          initialCode: "pwd = input()\n\n# Use len()\nif ___(pwd) >= 8:\n    print(\"OK\")\nelse:\n    print(\"short (current \" + ___(len(pwd)) + \" chars)\")",
          expectedOutput: "short (current 5 chars)",
          stdin: "abc12",
          hint: "len(pwd) and str(len(pwd))",
          hint2: "len(pwd) >= 8 / str(len(pwd))"
        },
        {
          id: "mission4",
          type: "mission",
          title: "🏆 Mission 3 — Initial card",
          task: "Read first and last name, build initials (first letters), output uppercase!",
          initialCode: "first = input(\"first: \").strip()\nlast = input(\"last: \").strip()\n\n# First char + first char, uppercase (lesson 6 .upper() preview)\ninitials = (first[___] + last[___]).upper()\n\nprint(\"=\" * 10)\nprint(\"  \" + initials)\nprint(first + \" \" + last)\nprint(\"=\" * 10)",
          expectedOutput: "==========\n  AC\nAlice Choi\n==========",
          stdin: "Alice\nChoi",
          hint: "first[0] and last[0] joined, then .upper()",
          hint2: "initials = (first[0] + last[0]).upper()"
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
✅ **str()** — number to string
✅ **Escapes** — \`\\n\` newline, \`\\t\` tab, \`\\"\` quote
✅ **Triple quotes** — multi-line at once

Next time, we'll learn about **string methods** — case change, whitespace stripping, search/replace, and more! 🚀`
        }
      ]
    }
  ]
}
