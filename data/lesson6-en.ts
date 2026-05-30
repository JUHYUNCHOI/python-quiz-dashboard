// ============================================
// Lesson 6: String Methods
// ============================================
import { LessonData } from './types'

export const lesson6EnData: LessonData = {
  id: "6",
  title: "String Methods",
  emoji: "🔧",
  description: "Learn various ways to work with strings!",
  chapters: [
    {
      id: "ch1",
      title: "Case Conversion",
      emoji: "🔤",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔧 What is a Method?",
          content: `**A method is a feature "attached" to a string.** You put a dot \`.\` after a string and then a name — the string does that job for you.

\`\`\`python
text = "hello"
print(text.upper())  # HELLO
\`\`\`

What this says: "Hey text, turn yourself into uppercase (upper)."

### Remember the shape

\`\`\`
string . methodname ( )
  ↑          ↑       ↑
 who?      do what?  parens required!
\`\`\`

- **dot \`.\`** — "I'm telling this string to..."
- **name** — \`upper\`, \`lower\`, \`strip\`, etc.
- **parens \`()\`** — without them, the method doesn't run. Always required!

### How is this different from a function?

- \`len(text)\` — **function**. The string goes inside the parens.
- \`text.upper()\` — **method**. Attached to the string with a dot.

> 💡 Methods are jobs only that string can do. Functions take data from outside.

### ❌ Common mistakes

\`\`\`python
text.upper      # ❌ Missing parens — doesn't run!
text.Upper()    # ❌ Capital U — Python names must match exactly
text.uper()     # ❌ Typo — AttributeError
\`\`\``
        },
        {
          id: "upper-lower",
          type: "explain",
          title: "🔤 upper() and lower()",
          content: `Two methods that change letter case in one shot.

- **upper()** — turn every letter to **uppercase**
- **lower()** — turn every letter to **lowercase**

\`\`\`python
text = "Hello World"

print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
\`\`\`

### Why bother?

- **Searching** — a user types "PYTHON" but the article has "python". Convert both to lowercase before comparing.
- **Usernames / emails** — usually stored in lowercase for consistency.
- **Emphasis** — make important words all caps.

### ⚠️ The original doesn't change! (really important)

\`\`\`python
text = "Hello"
text.upper()         # gives back HELLO — but where to?
print(text)          # Hello (unchanged!)
\`\`\`

upper() returns a **new string**, but we didn't catch it anywhere. So it just disappears.

**To keep it, save it to a variable:**

\`\`\`python
text = "Hello"
big = text.upper()   # save the new string into big
print(text)          # Hello
print(big)           # HELLO
\`\`\`

> 💡 Strings can't be changed once made (**immutable**). Methods always return a **new string**.

### What about non-letters?

\`\`\`python
print("123 abc".upper())   # 123 ABC  (digits unchanged)
print("héllo".upper())     # HÉLLO    (accents handled)
\`\`\`

Only letters change. Digits, symbols, spaces — all stay the same.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert the string to uppercase!",
          initialCode: "text = \"python\"\n# Use the method that converts to uppercase\nprint(text.___())",
          expectedOutput: "PYTHON",
          hint: "Use the .upper() method!",
          hint2: "text.upper()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Convert to Lowercase!",
          task: "Convert the string to lowercase!",
          initialCode: "text = \"HELLO\"\nprint(text.___())",
          expectedOutput: "hello",
          hint: "Use the .lower() method!",
          hint2: "text.lower()"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"PyThOn\".lower()?",
          options: ["PYTHON", "python", "PyThOn", "Error"],
          answer: 1,
          explanation: "lower() converts all characters to lowercase!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Stripping Whitespace & Replacing",
      emoji: "✂️",
      steps: [
        {
          id: "strip-explain",
          type: "explain",
          title: "✂️ strip() - Remove Whitespace",
          content: `**strip()** trims whitespace from **both ends** of a string. Middle spaces stay!

\`\`\`python
text = "   Hello   "
print(text.strip())  # "Hello"
\`\`\`

### Why bother?

People's input often comes with accidental spaces.

- Search box has \`" python "\` → must trim before matching
- Username \`"  julia  "\` is the same person as \`"julia"\`
- A line that ends in an invisible \`\\n\` (newline) — strip cleans it

### Middle spaces stay

\`\`\`python
text = "   Hello friend   "
print(text.strip())  # "Hello friend"  (middle space kept!)
\`\`\`

### Trimming only one side

- **lstrip()** — left only
- **rstrip()** — right only

\`\`\`python
text = "   Hello   "
print(text.lstrip())  # "Hello   "
print(text.rstrip())  # "   Hello"
\`\`\`

### It removes more than spaces

strip() also clears **tabs \\t, newlines \\n,** and other invisible whitespace.

\`\`\`python
text = "\\n\\t  Hello  \\n"
print(text.strip())  # "Hello"
\`\`\`

> 💡 The original stays the same. You always get a new string back.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Remove the leading and trailing whitespace!",
          initialCode: "text = \"   Python   \"\n# Use the method that removes whitespace\nprint(text.___())",
          expectedOutput: "Python",
          hint: "Use the .strip() method!",
          hint2: "text.strip()"
        },
        {
          id: "replace-explain",
          type: "explain",
          title: "🔄 replace() - Swap text",
          content: `**replace(old, new)** — find one piece of text and swap it for another. Think of it as **"Find & Replace."**

\`\`\`python
text = "Hello World"
print(text.replace("World", "Python"))
# Hello Python
\`\`\`

### **All** matches get swapped

\`\`\`python
text = "banana banana banana"
print(text.replace("banana", "apple"))
# apple apple apple
\`\`\`

It doesn't stop at the first one — every match is replaced.

### Single characters work too

\`\`\`python
text = "ABCABC"
print(text.replace("A", "Z"))
# ZBCZBC
\`\`\`

### Use it as an eraser

Pass \`""\` (empty string) as the new value to **delete** the matches.

\`\`\`python
text = "H e l l o"
print(text.replace(" ", ""))  # Hello  (all spaces removed)
\`\`\`

### Chain it (very useful!)

The result is still a string, so you can call another method right on it.

\`\`\`python
text = "cat and cow"
print(text.replace("cat", "dog").replace("cow", "rabbit"))
# dog and rabbit
\`\`\`

> 💡 Stringing methods together with dots is called **chaining**. You'll use it a lot!

### ⚠️ Case-sensitive

\`\`\`python
print("Hello".replace("hello", "Hi"))  # Hello  (no change!)
\`\`\`

\`"Hello"\` and \`"hello"\` are different strings. The match must be exact.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Replace 'apple' with 'grape'!",
          initialCode: "text = \"Apples are delicious\"\nprint(text.replace(___, ___))",
          expectedOutput: "Grapes are delicious",
          hint: ".replace(\"Apples\", \"Grapes\")",
          hint2: "text.replace(\"Apples\", \"Grapes\")"
        },
        {
          id: "try-replace-scratch",
          type: "tryit",
          title: "✋ Type it yourself — replace from scratch",
          task: "Replace 'Hi' with 'Hello' and print the result. Write the whole print line yourself!",
          initialCode: "text = \"Hi friend! Hi everyone!\"\n# Write the print line here yourself\n",
          expectedOutput: "Hello friend! Hello everyone!",
          hint: "Inside print( ... ), use text.replace(\"Hi\", \"Hello\")",
          hint2: "print(text.replace(\"Hi\", \"Hello\"))"
        },
        {
          id: "try-replace-chain",
          type: "tryit",
          title: "✋ Replace two things at once",
          task: "Chain two replace() calls — turn 'cat'→'dog' and 'cow'→'rabbit'.",
          initialCode: "text = \"cat and cow\"\n# You can chain replace like .replace(...).replace(...)\n",
          expectedOutput: "dog and rabbit",
          hint: "Chain replace twice: text.replace(...).replace(...)",
          hint2: "print(text.replace(\"cat\", \"dog\").replace(\"cow\", \"rabbit\"))"
        }
      ]
    },
    {
      id: "ch3",
      title: "Searching & Length",
      emoji: "🔍",
      steps: [
        {
          id: "find-explain",
          type: "explain",
          title: "🔍 find() and count()",
          content: `Two methods that peek into a string.

### find() — "where is it?"

Tells you the **position** (index) of a character or word. Positions start at **0** (same as lesson 5 indexing).

\`\`\`python
text = "Hello World"
print(text.find("World"))   # 6
print(text.find("H"))       # 0  (very first)
print(text.find("o"))       # 4  (the first 'o')
\`\`\`

Position map of \`"Hello World"\`:
\`\`\`
H e l l o   W o r l d
0 1 2 3 4 5 6 7 8 9 10
\`\`\`

\`"World"\` starts at index 6 → returns 6.

### Returns -1 if missing

\`\`\`python
text = "Hello"
print(text.find("Python"))  # -1
\`\`\`

\`-1\` is the agreed-upon "not found" signal. (Once you learn if-statements, this is great for "exists?" checks.)

### count() — "how many?"

Returns **how many times** something shows up.

\`\`\`python
text = "banana"
print(text.count("a"))   # 3
print(text.count("an"))  # 2  (words work too!)
print(text.count("z"))   # 0
\`\`\`

### Don't mix them up

- \`find\` → **position** (0, 1, 2, ...)
- \`count\` → **how many** (0, 1, 2, ...)

Both return numbers, but they mean very different things!

### Case-sensitive — same as replace

\`\`\`python
print("Hello".find("h"))   # -1  (no lowercase h here)
print("Hello".find("H"))   # 0
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Count how many 'a's there are!",
          initialCode: "text = \"abracadabra\"\nprint(text.___(\"a\"))",
          expectedOutput: "5",
          hint: "Use the .count(\"a\") method!",
          hint2: "text.count(\"a\")"
        },
        {
          id: "try-count-scratch",
          type: "tryit",
          title: "✋ Type it yourself — count from scratch",
          task: "Count how many times 'is' appears in the sentence. Write the whole print line yourself!",
          initialCode: "text = \"This is fun and this is hard but this is mine\"\n# Write a print line here yourself\n",
          expectedOutput: "3",
          hint: "Write print( text.count(\"is\") )",
          hint2: "print(text.count(\"is\"))"
        },
        {
          id: "try-count-word",
          type: "tryit",
          title: "✋ Counting words too",
          task: "count() works with full words too — count 'banana' in the sentence.",
          initialCode: "text = \"banana smoothie with banana chips and banana bread\"\n# Print how many times 'banana' appears\n",
          expectedOutput: "3",
          hint: "Pass the full word: text.count(\"banana\")",
          hint2: "print(text.count(\"banana\"))"
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() - Get the Length",
          content: `**len()** counts how many characters are in a string. You saw it briefly in lesson 5 — here it is again with more detail.

\`\`\`python
text = "Hello"
print(len(text))  # 5

name = "Python"
print(len(name))  # 6
\`\`\`

### Spaces count too

\`\`\`python
print(len("Hello World"))  # 11  (includes the space)
print(len("    "))         # 4   (four spaces)
print(len(""))             # 0   (empty string)
\`\`\`

### Every character is 1

\`\`\`python
print(len("hi"))    # 2
print(len("12"))    # 2
print(len("👋!"))   # 2 (in most setups)
\`\`\`

> 💡 "One character = 1." Easy.

### len() is a **function**, not a method!

Other names (\`text.upper()\`, \`text.strip()\`) attach to the string with a dot. But len() goes the **outside-in** way.

\`\`\`python
len(text)    # ✅ function — string goes inside parens
text.len()   # ❌ AttributeError — strings don't have .len()
\`\`\`

Why the difference? — \`len()\` is an all-purpose function that works on **strings, lists, dictionaries**, and more. You'll meet it again when you learn those.`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Get the length of the string!",
          initialCode: "text = \"Python\"\n# Use the function that gets the length\nprint(___(text))",
          expectedOutput: "6",
          hint: "Use the len(text) function!",
          hint2: "len(text)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `len(\"Hello\")`?",
          options: ["5", "10", "15", "Error"],
          answer: 0,
          explanation: "Each character counts as 1! 5 characters = 5"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "more-methods",
          type: "explain",
          title: "📝 Handy methods to know",
          content: `A few more useful ones. Notice some return **True / False** — they'll shine once you learn if-statements.

### startswith() / endswith() — "does it start/end with this?"

\`\`\`python
text = "Hello World"
print(text.startswith("Hello"))  # True
print(text.startswith("World"))  # False
print(text.endswith("World"))    # True
print(text.endswith("!"))        # False
\`\`\`

When to use:
- File name check — \`name.endswith(".png")\` to detect images
- URL check — \`url.startswith("https")\` for secure links

### isdigit() — "is it all digits?"

\`\`\`python
print("123".isdigit())   # True
print("12a".isdigit())   # False
print("".isdigit())      # False
print("3.14".isdigit())  # False (a dot is not a digit)
\`\`\`

Handy for checking whether input is really numeric. (You'll use it more with lesson 9's type conversions.)

### capitalize() — "uppercase the first letter"

\`\`\`python
print("hello world".capitalize())  # Hello world
print("PYTHON".capitalize())       # Python
\`\`\`

### title() — "uppercase the first letter of every word"

\`\`\`python
print("hello world".title())  # Hello World
\`\`\`

### Summary — by what they return

- **Transformers** — \`upper, lower, capitalize, title, strip, replace\` → new string
- **Searchers** — \`find, count\` → number
- **Checkers** — \`startswith, endswith, isdigit\` → True/False`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Complete the ID validator!",
          initialCode: "user_id = \"  PyThOn_User  \"\n\n# 1. Remove whitespace\nclean_id = user_id.___()\n# 2. Convert to lowercase\nlower_id = clean_id.___()\n# 3. Check length\nlength = ___(lower_id)\n\nprint(\"Original:\", user_id)\nprint(\"Cleaned:\", lower_id)\nprint(\"Length:\", length)",
          expectedOutput: "Original:   PyThOn_User  \nCleaned: python_user\nLength: 11",
          hint: "Use strip() → lower() → len() in order!",
          hint2: "strip(), lower(), len()"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **upper(), lower()** - Case conversion
✅ **strip()** - Remove whitespace
✅ **replace()** - Replace characters
✅ **find(), count()** - Searching
✅ **len()** - Get length

Next time, we'll learn about **print() options** to make our output look even better! 🚀`
        }
      ]
    }
  ]
}
