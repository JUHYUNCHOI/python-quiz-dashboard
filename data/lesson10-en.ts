// ============================================
// Lesson 10: input() - User Input
// ============================================
import { LessonData } from './types'

export const lesson10EnData: LessonData = {
  id: "10",
  title: "input() - User Input",
  emoji: "⌨️",
  description: "Learn how to get input from the user!",
  chapters: [
    {
      id: "ch1",
      title: "input() Basics",
      emoji: "⌨️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 Interactive Programs!",
          content: `So far, we've only been printing output one way.

Now we're going to **receive input from the user**!

\`\`\`python
name = input('What is your name? ')
print(f'Hello, {name}!')
\`\`\`

When you run it:
\`\`\`
What is your name? Alice
Hello, Alice!
\`\`\`

### Why is this important?

Programs we've built so far used **fixed values** — \`name = "Alice"\` was hardcoded, so anyone else needed to edit the code to use it.

**With \`input()\`**, the same code works for everyone. It starts feeling like a real "program".`
        },
        {
          id: "concept",
          type: "explain",
          title: "📥 The input() Function",
          content: `\`input()\` waits until the user types something!

\`\`\`python
answer = input('Your question here')
\`\`\`

1. 'Your question here' appears on screen
2. The user types something and presses Enter
3. The typed value is stored in the answer variable!

⚠️ **Note:** input() doesn't work in web environments!
So in our exercises, we'll practice by assigning values directly to variables, or use the stdin (input) panel.

### Prompt options

\`\`\`python
# Option 1) no prompt
data = input()           # user types

# Option 2) with prompt
data = input('Name: ')   # shows "Name: " inline

# Option 3) prompt + newline (readability)
data = input('Enter your name:\\n')
\`\`\`

> 💡 The most common style is ending with \`': '\` (colon + space).`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Simulating input()!",
          task: "Store 'Alice' in name and greet them!",
          initialCode: "# Instead of input(), we assign the value directly\nname = ___\nprint(f'Hello, {name}!')",
          expectedOutput: "Hello, Alice!",
          hint: "Store a name with name = 'name'!",
          hint2: "name = 'Alice'"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What type does `input()` always return?",
          options: ["int (integer)", "float (decimal)", "str (string)", "It depends on the input"],
          answer: 2,
          explanation: "input() always returns a string (str)!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Receiving Number Input",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ Houston, We Have a Problem!",
          content: `Let's try getting an age and doing math with it:

\`\`\`python
age = input('Age: ')
print(age + 1)  # Error!!! 😱
\`\`\`

Why does it throw an error?
→ input() **always returns a string**!
→ '15' + 1 can't be calculated!`
        },
        {
          id: "solution-explain",
          type: "explain",
          title: "✅ Solution: Convert with int()!",
          content: `We need to convert the string to a number!

\`\`\`python
age = input('Age: ')        # '15' (string)
age = int(age)              # 15 (converted to integer!)
print(age + 1)              # 16 ✅
\`\`\`

Shorter version:
\`\`\`python
age = int(input('Age: '))
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ String to Number Conversion!",
          task: "Convert a string number to an integer and do math!",
          initialCode: "# Assume we received this from input()\nage_str = '15'\n\n# Convert to integer\nage = ___(age_str)\n\n# Age next year\nprint(f'Age next year: {age + 1}')",
          expectedOutput: "Age next year: 16",
          hint: "Use int() to convert a string to a number!",
          hint2: "age = int(age_str)"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Adding Two Numbers!",
          task: "Add two numbers and print the result!",
          initialCode: "# Assume we received these from input()\na_str = '25'\nb_str = '17'\n\n# Convert to integers\na = ___(a_str)\nb = ___(b_str)\n\nprint(f'{a} + {b} = {a + b}')",
          expectedOutput: "25 + 17 = 42",
          hint: "Use int() to convert strings to integers!",
          hint2: "a = int(a_str)"
        },
        {
          id: "multi-input",
          type: "explain",
          title: "🎯 Multiple values on one line — input().split()",
          content: `For input like \`3 5 7\` on one line:

\`\`\`python
# Input: 3 5 7
data = input().split()
print(data)        # ['3', '5', '7']  ← list of strings
\`\`\`

\`split()\` separates by whitespace (covered in lesson 18).

### Read as integers — map(int, ...)

\`\`\`python
# Input: 3 5 7
nums = list(map(int, input().split()))
print(nums)        # [3, 5, 7]  ← list of ints!
print(sum(nums))   # 15
\`\`\`

### Receive into known variables

\`\`\`python
# Input: 25 17
a, b = map(int, input().split())
print(a + b)       # 42 — sum directly
\`\`\`

> 🎯 Almost all coding-test inputs use this. Memorize the pattern — it's a lifelong tool.`
        },
        {
          id: "try-multi-input",
          type: "tryit",
          title: "🖥️ Try It — Two ints, multiplied",
          task: "Read two ints on one line and print their product. (input: 7 8)",
          initialCode: "# Two ints on one line\na, b = map(int, input().___())\n\nprint(f\"{a} x {b} = {a * b}\")",
          expectedOutput: "7 x 8 = 56",
          stdin: "7 8",
          hint: "input().split() then map(int, ...).",
          hint2: "a, b = map(int, input().split())"
        },
        {
          id: "input-strip",
          type: "explain",
          title: "🧹 Hidden whitespace in user input",
          content: `Users may accidentally add spaces around their input.

\`\`\`python
# User types "  Alice  " (extra spaces)
name = input()
print(f"[{name}]")   # [  Alice  ]   ← spaces kept
\`\`\`

\`.strip()\` removes leading/trailing whitespace — safer.

\`\`\`python
name = input().strip()
print(f"[{name}]")   # [Alice]   ← clean
\`\`\`

### Common input cleanup patterns

\`\`\`python
name  = input("Name: ").strip()       # string + cleanup
age   = int(input("Age: "))            # int
score = float(input("Score: "))        # float
nums  = list(map(int, input().split()))  # multiple ints
\`\`\`

> 💡 \`strip()\` was covered in lesson 6 (string methods). Pairs well with \`.lower()\` / \`.upper()\` for input normalization.`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `int('123')`?",
          options: ["'123' (string)", "123 (integer)", "Error", "123.0 (float)"],
          answer: 1,
          explanation: "int() converts the string '123' to the integer 123!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Receiving Float Input",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 Receiving Float Input",
          content: `For numbers with decimal points, use \`float()\`!

\`\`\`python
height = float(input('Height (cm): '))
print(f'Height: {height}cm')
\`\`\`

**Type conversion summary:**
- \`int()\`: convert to integer
- \`float()\`: convert to float
- \`str()\`: convert to string`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Float Conversion Practice!",
          task: "Convert height from cm to m and print it!",
          initialCode: "# Assume we received this from input()\nheight_str = '175.5'\n\n# Convert to float\ncm = ___(height_str)\n\n# Convert to meters (divide by 100)\nm = cm / 100\n\nprint(f'{cm}cm = {m}m')",
          expectedOutput: "175.5cm = 1.755m",
          hint: "Use float() to convert, then divide by 100",
          hint2: "cm / 100"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `int('3.14')`?",
          options: ["3", "3.14", "Error", "'3'"],
          answer: 2,
          explanation: "int() can't directly convert a decimal string! You need to use float() first."
        },
        {
          id: "float-trap",
          type: "explain",
          title: "⚠️ float ↔ int conversion traps",
          content: `\`int(input())\` errors on \`"3.14"\`. Two-step:

\`\`\`python
# ❌ Direct int doesn't work
int("3.14")        # ValueError

# ✅ Through float to int
int(float("3.14"))  # 3 — decimal truncated (NOT rounded!)

# To round properly
round(float("3.14"))   # 3
round(float("3.78"))   # 4
\`\`\`

### int truncation vs round

| Value | int(float(x)) | round(float(x)) |
|---|---|---|
| "3.14" | 3 | 3 |
| "3.78" | **3** (truncate) | **4** (round) |
| "-2.5" | -2 (toward 0) | -2 (banker's) |
| "2.5"  | 2 (truncate) | 2 (banker's) |

> 🎯 **int truncates toward zero**, round does proper rounding. Pick based on intent.

### Safe int conversion function

\`\`\`python
def safe_int(s, default=0):
    try:
        return int(float(s))
    except ValueError:
        return default

print(safe_int("42"))        # 42
print(safe_int("3.14"))      # 3
print(safe_int("hello"))     # 0 (fallback)
\`\`\`

(try/except is covered in detail in lesson 37)`
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Mission 1 — Total price",
          task: "Calculate the total price from item price and quantity!",
          initialCode: "# Assume we received these from input()\nprice_str = '12'\ncount_str = '3'\n\n# Convert to integers\nprice = ___(price_str)\ncount = ___(count_str)\n\n# Calculate total price\ntotal = ___\n\nprint(f'{count} pizzas')\nprint(f'Total price: ${total}')",
          expectedOutput: "3 pizzas\nTotal price: $36",
          hint: "Convert with int() then multiply!",
          hint2: "int(price_str) / price * count"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Self-introduction card",
          task: "Read name, age, height with input() and print a card. (input is 3 stdin lines)",
          initialCode: "name = input(\"Name: \").___()       # cleanup spaces\nage = ___(input(\"Age: \"))           # int\nheight = ___(input(\"Height(cm): \"))  # float\n\n# Print card\nprint(\"=\" * 20)\nprint(f\"Name: {name}\")\nprint(f\"Age: {age} (next year: {age + 1})\")\nprint(f\"Height: {height}cm ({height/100:.2f}m)\")\nprint(\"=\" * 20)",
          expectedOutput: "====================\nName: Alice\nAge: 15 (next year: 16)\nHeight: 175.5cm (1.76m)\n====================",
          stdin: "Alice\n15\n175.5",
          hint: "name uses strip(), age int(), height float().",
          hint2: "name = input().strip()\nage = int(input())\nheight = float(input())"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Score average",
          task: "Read 5 space-separated scores and print **average, max, min**.",
          initialCode: "# map + split pattern\nscores = list(map(___, input().split()))\n\nprint(f\"input: {scores}\")\nprint(f\"avg: {sum(scores) / len(scores):.1f}\")\nprint(f\"max: {max(scores)}\")\nprint(f\"min: {min(scores)}\")",
          expectedOutput: "input: [85, 92, 78, 95, 67]\navg: 83.4\nmax: 95\nmin: 67",
          stdin: "85 92 78 95 67",
          hint: "list(map(int, input().split())) pattern.",
          hint2: "scores = list(map(int, input().split()))"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ Getting user input with \`input()\`
✅ input() **always returns a string**
✅ Converting to numbers with \`int()\` / \`float()\`
✅ **input().split()** for multiple values on one line
✅ **map(int, input().split())** — coding-test classic
✅ \`a, b = map(int, input().split())\` — direct unpacking
✅ \`.strip()\` for input cleanup
✅ float ↔ int conversion traps (use \`int(float(s))\` for decimal strings)
✅ \`int\` truncate vs \`round\` proper rounding

💡 **Tip:** Try running real input() code in a terminal or IDE!

🎉 **Part 1 Complete!**
In the next Part, we'll learn about **conditionals**! 🧠`
        }
      ]
    }
  ]
}
