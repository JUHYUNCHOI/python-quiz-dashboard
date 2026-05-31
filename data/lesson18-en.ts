// ============================================
// Lesson 18: split() and join()
// ============================================
import { LessonData } from './types'

export const lesson18EnData: LessonData = {
  id: "18",
  title: "split() and join()",
  emoji: "✂️",
  description: "Split and combine strings!",
  chapters: [
    {
      id: "ch1",
      title: "split() - Splitting Strings",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "✂️ split (cut apart) — string into a list",
          content: `**split = cut apart**. Turn a single string into smaller pieces, packaged as a list.

🍫 Picture: snapping a chocolate bar into squares and lining them up on a plate.

\`\`\`python
text = "apple banana strawberry"
fruits = text.split()
print(fruits)  # ['apple', 'banana', 'strawberry']
\`\`\`

### Where you'll meet it

- One \`input()\` line carrying multiple values
- Dates like \`"2024-01-15"\` split by \`-\`
- Coding-test inputs like \`"3 5 7"\`

Splitting is the **first step** of almost every input pipeline.`
        },
        {
          id: "split-explain",
          type: "explain",
          title: "✂️ How to Use split()",
          content: `**Split by spaces** (default)
\`\`\`python
"a b c".split()      # ['a', 'b', 'c']
\`\`\`

**Split by a specific character**
\`\`\`python
"2024-01-15".split("-")  # ['2024', '01', '15']
"a,b,c".split(",")       # ['a', 'b', 'c']
\`\`\`

### Magic of bare split()

\`\`\`python
"  hello   world  python  ".split()
# ['hello', 'world', 'python']  ← multiple spaces handled!
\`\`\`

Bare \`split()\` (no argument) splits by **any whitespace** (spaces, tabs, newlines) and **collapses consecutive whitespace** into one separator. Robust against messy user input.

### split(",") behaves differently

\`\`\`python
"a,,b".split(",")    # ['a', '', 'b']  ← empty string appears!
\`\`\`

Explicit delimiters keep **consecutive separators** as-is — empty strings can appear. Be aware depending on data source.`
        },
        {
          id: "split-maxsplit",
          type: "explain",
          title: "🎯 split(sep, count) — Split a few times only",
          content: `Second argument = **max number of splits**.

\`\`\`python
text = "name=john,age=15,city=seoul"

# All splits
text.split(",")
# ['name=john', 'age=15', 'city=seoul']

# Only the first
text.split(",", 1)
# ['name=john', 'age=15,city=seoul']
\`\`\`

### Real use — split "key=value" once

\`\`\`python
line = "name=Hello, World!"
key, value = line.split("=", 1)
print(key)    # 'name'
print(value)  # 'Hello, World!' — keeps everything after first =
\`\`\`

If you used plain \`split("=")\`, the value's "=" would have been split too. **maxsplit=1** cuts only the first.`
        },
        {
          id: "try-maxsplit",
          type: "tryit",
          title: "🖥️ Try It — maxsplit",
          task: "Split 'user.name@gmail.com' at the FIRST @ to separate ID from domain!",
          initialCode: "email = \"user.name@gmail.com\"\n\n# Split only at the first @\nuser, domain = email.___(\"@\", ___)\nprint(f\"ID: {user}\")\nprint(f\"Domain: {domain}\")",
          expectedOutput: "ID: user.name\nDomain: gmail.com",
          hint: "split(\"@\", 1) — cut only at the first @.",
          hint2: "user, domain = email.split(\"@\", 1)"
        },
        {
          id: "splitlines-explain",
          type: "explain",
          title: "📄 splitlines() — Split by lines",
          content: `For multi-line text, \`splitlines()\` is cleaner than \`split(\"\\n\")\`.

\`\`\`python
text = """First line
Second line
Third line"""

lines = text.splitlines()
print(lines)
# ['First line', 'Second line', 'Third line']
\`\`\`

### Difference from split("\\n")

\`\`\`python
text = "a\\nb\\n"

text.split("\\n")        # ['a', 'b', '']  ← trailing empty string
text.splitlines()        # ['a', 'b']       ← clean
\`\`\`

\`splitlines()\` ignores the trailing newline automatically. Common when reading files.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Split a string into a list!",
          initialCode: "text = \"Alice Bob Charlie\"\nnames = text.split()\nprint(names)",
          expectedOutput: "['Alice', 'Bob', 'Charlie']",
          hint: "split() splits by spaces!",
          hint2: "text.split()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Split by Comma!",
          task: "Split the comma-separated fruits!",
          initialCode: "text = \"apple,banana,strawberry\"\nfruits = text.split(\",\")\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'strawberry']",
          hint: "Use split(\",\") to split by comma!",
          hint2: "text.split(\",\")"
        }
      ]
    },
    {
      id: "ch2",
      title: "Converting with map()",
      emoji: "🔢",
      steps: [
        {
          id: "map-explain",
          type: "explain",
          title: "🔢 Convert All at Once with map()",
          content: `The result of split() is a **list of strings**!

\`\`\`python
text = "10 20 30"
nums = text.split()
print(nums)  # ['10', '20', '30'] (strings!)
\`\`\`

**map(function, list)** = apply a function to every element

\`\`\`python
nums = list(map(int, text.split()))
print(nums)  # [10, 20, 30] (integers!)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert string numbers into a list of integers!",
          initialCode: "text = \"10 20 30 40 50\"\nnums = list(map(int, text.split()))\nprint(nums)\nprint(f\"Total: {sum(nums)}\")",
          expectedOutput: "[10, 20, 30, 40, 50]\nTotal: 150",
          hint: "Wrapping with list() turns it into a list!",
          hint2: "list(map(int, text.split()))"
        },
        {
          id: "input-pattern",
          type: "explain",
          title: "⌨️ Coding-test classic — input().split()",
          content: `Coding test inputs often pack **multiple numbers** into one line. Example: \`3 5 7\`.

\`\`\`python
# All numbers into a list of ints
nums = list(map(int, input().split()))

# When you know how many — unpack directly
a, b, c = map(int, input().split())
print(a + b + c)
\`\`\`

### Common patterns

\`\`\`python
# Two ints
a, b = map(int, input().split())

# Keep as strings (no int convert)
words = input().split()
\`\`\`

> 💡 Always wrap \`map\` with \`list()\` to get an actual list.`
        },
        {
          id: "try-input-pattern",
          type: "tryit",
          title: "🖥️ Try It — Average of input numbers",
          task: "Read space-separated integers on one line and print their average. (input is in stdin below)",
          initialCode: "nums = list(map(int, input().split()))\n\n# Compute average and print 'avg: ___'\navg = ___\nprint(f\"avg: {avg}\")",
          expectedOutput: "avg: 6.0",
          stdin: "3 5 7 8 9 4",
          hint: "sum(nums) / len(nums)",
          hint2: "avg = sum(nums) / len(nums)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `\"1 2 3\".split()`?",
          options: ["[1, 2, 3]", "['1', '2', '3']", "'1 2 3'", "Error"],
          answer: 1,
          explanation: "split() always returns a list of strings!"
        }
      ]
    },
    {
      id: "ch3",
      title: "join() - Combining Lists",
      emoji: "🔗",
      steps: [
        {
          id: "join-explain",
          type: "explain",
          title: "🔗 join (stitch back) — list into a string",
          content: `**join = stitch together**. The exact opposite of \`split\`! Glue the box values into one string.

🪡 Picture: threading beads (list items) onto a string (separator), one by one.

\`\`\`python
fruits = ['apple', 'banana', 'strawberry']

# Join with a space
result = ' '.join(fruits)
print(result)  # "apple banana strawberry"

# Join with a comma
result = ','.join(fruits)
print(result)  # "apple,banana,strawberry"
\`\`\`

Format: **\`'separator'.join(list)\`** — separator in front, list as the argument!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Join the list with - as the separator!",
          initialCode: "words = ['2024', '01', '15']\ndate = '-'.join(words)\nprint(date)",
          expectedOutput: "2024-01-15",
          hint: "Use the format separator.join(list)!",
          hint2: "'-'.join(words)"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Combine and Print!",
          task: "Join the letters to form a word!",
          initialCode: "letters = ['P', 'y', 't', 'h', 'o', 'n']\nword = ''.join(letters)\nprint(word)",
          expectedOutput: "Python",
          hint: "''.join() combines with no separator!",
          hint2: "Join with an empty string ''"
        },
        {
          id: "join-numbers-trap",
          type: "explain",
          title: "⚠️ Number lists can't be joined directly!",
          content: `\`join()\` only works on **strings**. A list of numbers throws an error.

\`\`\`python
nums = [1, 2, 3]
",".join(nums)
# ❌ TypeError: sequence item 0: expected str instance, int found
\`\`\`

### Fix — convert each to str first

\`\`\`python
nums = [1, 2, 3]

# Way 1) map(str, ...)
result = ",".join(map(str, nums))
print(result)  # "1,2,3"

# Way 2) list comprehension
result = ",".join([str(n) for n in nums])
print(result)  # "1,2,3"
\`\`\`

> 🎯 split returns a **list of strings**; join expects a **list of strings** — perfectly symmetric.`
        },
        {
          id: "try-join-numbers",
          type: "tryit",
          title: "🖥️ Try It — Print scores on one line",
          task: "Make a single string from a score list separated by \" / \"!",
          initialCode: "scores = [85, 92, 78, 90, 88]\n\n# Like 'Hi / Bye' — separated by ' / '\nresult = ___\nprint(result)",
          expectedOutput: "85 / 92 / 78 / 90 / 88",
          hint: "join needs strings → use map(str, ...) or [str(n) for n in scores].",
          hint2: "result = \" / \".join(map(str, scores))"
        },
        {
          id: "join-newline",
          type: "explain",
          title: "📋 Join with newline — one item per line",
          content: `\`\\n\` (newline) can be the separator too — clean way to print one item per line.

\`\`\`python
items = ["apple", "banana", "strawberry"]

# Way 1) for loop — clear but multiple prints
for item in items:
    print(item)

# Way 2) "\\n".join — one print after merging
print("\\n".join(items))
\`\`\`

Both give:
\`\`\`
apple
banana
strawberry
\`\`\`

> 💡 Any string works as separator — \`", "\`, \`" - "\`, \`"\\n"\`, \`"|"\`, even \`""\` (empty).`
        },
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "pre-mission1-strjoin",
          type: "quiz",
          title: "❓ Pre-mission check — split vs join",
          content: "**To *split* a sentence into words: which method? And to *join* them back: which method?**",
          options: ["split to break apart, join to combine", "join to break apart, split to combine", "split for both", "join for both"],
          answer: 0,
          explanation: "*Split* → `text.split(\" \")` — call `.split()` on the *string*. *Join* → `\" \".join(list)` — call `.join(list)` on the *separator* (easy to mix up!)."
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Mission 1 — Reverse word order",
          task: "Reverse the order of the words and print the result!",
          initialCode: "text = \"Hello World Python\"\nwords = text.___()\nwords.___()\nresult = ' '.___(words)\nprint(result)",
          expectedOutput: "Python World Hello",
          hint: "Break apart → reverse order → join back. 3 steps!",
          hint2: "Use words.reverse() to reverse the order!"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — CSV one-liner: total + average",
          task: "Read a comma-separated score line, convert to ints, then print BOTH total and average!",
          initialCode: "line = \"75,90,82,88,95\"\n\n# 1) line.split(\",\") makes ['75', '90', ...]\n# 2) convert each element to int (map or comprehension)\n# 3) wrap the result in list\nnums = ___\n\ntotal = sum(nums)\navg = total / len(nums)\nprint(f\"Total: {total}\")\nprint(f\"Average: {avg}\")",
          expectedOutput: "Total: 430\nAverage: 86.0",
          hint: "Split → convert each piece to number → wrap in list.",
          hint2: "nums = list(map(int, line.split(\",\")))"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Build greeting from input",
          task: "Read multiple names (space-separated) on one line and print 'Hi A, B, C!' format. (! at end)",
          initialCode: "# 1) read one line with input()\n# 2) use .split() to make a list, splitting on whitespace\nnames = input().___()\n\n# 3) join with ', ' inside the f-string\ngreeting = f\"Hi {___}!\"\nprint(greeting)",
          expectedOutput: "Hi Alice, Bob, Charlie!",
          stdin: "Alice Bob Charlie",
          hint: "Split input into a list, then join with a separator.",
          hint2: "names = input().split()\ngreeting = f\"Hi {', '.join(names)}!\""
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **split()** — split a string into a list (bare vs explicit)
✅ **maxsplit** — control how many splits (email first @, key=value first =, etc.)
✅ **splitlines()** — clean line-wise split
✅ **map()** — apply type conversion to every element
✅ **input().split()** — coding-test classic pattern
✅ **join()** — join a list into a string (the reverse direction)
✅ **Number-join trap** — must \`map(str, nums)\` first
✅ **Different separators** — \`", "\`, \`"\\n"\`, \`""\`, etc.

Next time, we'll learn about **tuples**! 🚀 — bundles you'll often meet as split/join results.`
        }
      ]
    }
  ]
}
