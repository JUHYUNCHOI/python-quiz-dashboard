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
- **parens \`()\`** — without them, the method doesn't run. Always required!`
        },
        {
          id: "intro-vs-function",
          type: "explain",
          title: "🆚 Method vs. Function",
          content: `Methods attach with a dot. Functions take input in parens.

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

### What about non-letters?

\`\`\`python
print("123 abc".upper())   # 123 ABC  (digits unchanged)
print("héllo".upper())     # HÉLLO    (accents handled)
\`\`\`

Only letters change. Digits, symbols, spaces — all stay the same.`
        },
        {
          id: "predict-upper-result",
          type: "predict",
          title: "💭 Predict — upper()",
          content: `What does this code print?

\`\`\`python
name = "Hello"
print(name.upper())
\`\`\``,
          options: ["Hello", "HELLO", "hello", "Error"],
          answer: 1,
          explanation: "upper() turns every letter uppercase. H→H, e→E, l→L, l→L, o→O → HELLO."
        },
        {
          id: "upper-lower-immutable",
          type: "explain",
          title: "⚠️ The original doesn't change",
          content: `Calling a method gives you a **new string** — the original is untouched!

\`\`\`python
text = "Hello"
text.upper()         # gives back HELLO — but where to?
print(text)          # Hello (unchanged!)
\`\`\`

upper() returns a new string, but we didn't catch it anywhere. So it just disappears.

**To keep it, save it to a variable:**

\`\`\`python
text = "Hello"
big = text.upper()   # save the new string into big
print(text)          # Hello
print(big)           # HELLO
\`\`\`

> 💡 Strings can't be changed once made (**immutable**). Methods always return a **new string**.`
        },
        {
          id: "try-immutable-trap",
          type: "tryit",
          title: "✋ See the trap yourself — does the original really stay?",
          task: "Test the immutability you just learned. If you call `text.upper()` but then just print `text`, what do you get? Run it and see.",
          initialCode: "text = \"Hello\"\ntext.upper()\nprint(text)   # what do you expect?",
          expectedOutput: "Hello",
          hint: "If you don't catch the result in a variable, it just disappears!",
          hint2: "upper() made a new string but nothing caught it. So text is still the same."
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
\`\`\``
        },
        {
          id: "predict-strip-middle",
          type: "predict",
          title: "💭 Predict — strip() and middle space",
          content: `What does this code print?

\`\`\`python
text = "   Hello friend   "
print(text.strip())
\`\`\`

Hint: strip() only trims **both ends.**`,
          options: ["Hellofriend", "Hello friend", "   Hello friend   ", "Hello"],
          answer: 1,
          explanation: "Only end whitespace is trimmed. The middle space stays! → \"Hello friend\""
        },
        {
          id: "strip-variants",
          type: "explain",
          title: "↔️ lstrip / rstrip + invisible chars",
          content: `### Trimming only one side

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

### Use it as an eraser

Pass \`""\` (empty string) as the new value to **delete** the matches.

\`\`\`python
text = "H e l l o"
print(text.replace(" ", ""))  # Hello  (all spaces removed)
\`\`\``
        },
        {
          id: "predict-replace-all",
          type: "predict",
          title: "💭 Predict — how many replacements?",
          content: `What does this code print?

\`\`\`python
text = "banana banana banana"
print(text.replace("banana", "apple"))
\`\`\`

Hint: does replace() change just **one** match, or **all** of them?`,
          options: ["apple banana banana", "banana banana apple", "apple apple apple", "banana banana banana"],
          answer: 2,
          explanation: "replace() doesn't stop at the first match — it finds and replaces **all** matches. All three become \"apple\"."
        },
        {
          id: "replace-chain",
          type: "explain",
          title: "⛓️ Chaining replace + case-sensitivity",
          content: `### Chain it (very useful!)

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
          title: "🔍 find() — \"where is it?\"",
          content: `Tells you the **position** (index) of a character or word. Positions start at **0** (same as lesson 5 indexing).

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

\`-1\` is the agreed-upon "not found" signal. Why -1? — positions start at 0, so 0 is a real position. Negative positions don't exist, which makes -1 a safe "not found" signal. (Once you learn if-statements, this is great for "exists?" checks.)`
        },
        {
          id: "predict-find-position",
          type: "predict",
          title: "💭 Predict — find() position",
          content: `What does this code print?

\`\`\`python
text = "Python is fun"
print(text.find("is"))
\`\`\`

Position map:
\`\`\`
P y t h o n   i s   f u n
0 1 2 3 4 5 6 7 8 9 ...
\`\`\``,
          options: ["6", "7", "8", "-1"],
          answer: 1,
          explanation: "\"is\" starts at index 7 (i=7, s=8). find() returns the starting position → 7."
        },
        {
          id: "find-count",
          type: "explain",
          title: "🔢 count() — \"how many?\"",
          content: `Returns **how many times** something shows up.

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
          id: "predict-count-banana",
          type: "predict",
          title: "💭 Predict — count() how many?",
          content: `What does this code print?

\`\`\`python
text = "banana"
print(text.count("an"))
\`\`\`

Hint: \`b-a-n-a-n-a\` — trace through and find where \"an\" appears.`,
          options: ["1", "2", "3", "0"],
          answer: 1,
          explanation: "Inside banana, \"an\" appears in b**an**ana once and ban**an**a once → 2 total."
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

> 💡 "One character = 1." Easy.`
        },
        {
          id: "len-is-function",
          type: "explain",
          title: "⚠️ len() is a function, not a method!",
          content: `Other names (\`text.upper()\`, \`text.strip()\`) attach to the string with a dot. But len() goes the **outside-in** way.

\`\`\`python
len(text)    # ✅ function — string goes inside parens
text.len()   # ❌ AttributeError — strings don't have .len()
\`\`\`

Why the difference? — \`len()\` is an all-purpose tool that works on several kinds of values, so it doesn't attach with a dot. You'll meet it again later with other kinds of values.`
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
          title: "📝 startswith / endswith / isdigit",
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

Handy for checking whether input is really numeric. (You'll use it more with lesson 9's type conversions.)`
        },
        {
          id: "predict-endswith-png",
          type: "predict",
          title: "💭 Predict — endswith() file check",
          content: `What does this print?

\`\`\`python
print("hello.png".endswith(".png"))
\`\`\`

Hint: it asks "does it end with this?" Answer is True or False.`,
          options: ["True", "False", ".png", "Error"],
          answer: 0,
          explanation: "\"hello.png\" really does end with \".png\". → True."
        },
        {
          id: "predict-isdigit-mixed",
          type: "predict",
          title: "💭 Predict — isdigit() check",
          content: `What does this print (two lines)?

\`\`\`python
print("123".isdigit())
print("12a".isdigit())
\`\`\`

Hint: needs to be **only digits** to be True.`,
          options: ["True / True", "True / False", "False / True", "False / False"],
          answer: 1,
          explanation: "\"123\" is all digits → True. \"12a\" has an 'a' mixed in → False."
        },
        {
          id: "more-methods-case",
          type: "explain",
          title: "🅰️ capitalize / title + summary",
          content: `### capitalize() — "uppercase the first letter"

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
          task: "Complete the ID validator! Take `user_id` and ① trim both-end whitespace, ② convert to lowercase, ③ get the length of that result. Print as shown below. Figure out which method/function goes where on your own.",
          initialCode: "user_id = \"  PyThOn_User  \"\n\n# 1.\nclean_id = user_id.___\n# 2.\nlower_id = clean_id.___\n# 3.\nlength = ___\n\nprint(\"Original:\", user_id)\nprint(\"Cleaned:\", lower_id)\nprint(\"Length:\", length)",
          expectedOutput: "Original:   PyThOn_User  \nCleaned: python_user\nLength: 11",
          hint: "1 trims whitespace, 2 changes case, 3 gets length — which ones attach with a dot, and which one is a function?",
          hint2: "user_id.strip(), clean_id.lower(), len(lower_id)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

### Transformers (return a new string)
✅ **upper(), lower()** — case conversion
✅ **capitalize(), title()** — first letter / each word's first letter uppercase
✅ **strip()** — trim whitespace
✅ **replace()** — swap text

### Searchers (return a number)
✅ **find()** — position (or -1 if missing)
✅ **count()** — how many times

### Checkers (return True/False)
✅ **startswith(), endswith(), isdigit()** — starts/ends with / all digits

### Function (no dot)
✅ **len()** — get length

Next time, we'll learn about **print() options** to make our output look even better! 🚀`
        }
      ]
    }
  ]
}
