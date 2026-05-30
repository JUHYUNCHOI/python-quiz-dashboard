// ============================================
// Lesson 34: Function Usage
// Part 5: Functions - Basics (English)
// ============================================

import { LessonData } from './types'

export const lesson34EnData: LessonData = {
  id: "34",
  title: "Function Usage",
  emoji: "⚡",
  description: "Learn local/global variables and lambda functions!",
  chapters: [
    // ============================================
    // Chapter 1: Local vs Global Variables
    // ============================================
    {
      id: "ch1",
      title: "Local vs Global Variables",
      emoji: "🏠",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 Can I use a function's variable outside?",
          content: `💭 If you write \`x = 10\` inside a function, can you use that \`x\` **outside** too? Or only inside?

**Think of it as:**
- **Global variable** = Item in the living room (everyone can use) 🏠
- **Local variable** = Item in my room (only I can use) 🚪

@key: Where a variable can be used = its **scope**! It works differently inside vs outside a function.`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "🚪 Local Variables — only inside!",
          content: `💭 A variable made inside a function is like a **room item** — only usable inside that function. What if we try to use it outside?

\`\`\`python
def func():
    x = 10    # Local variable (inside-the-room item)
    print(x)  # 10 - OK inside ✅

func()
print(x)      # ❌ Error! Outside doesn't know x
\`\`\`

When the function ends, local variables **disappear!** Next call, they're made fresh.

@key: Variables made **inside** a function = **local** = only usable inside! Outside = error.`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "🌍 Global Variables — readable anywhere!",
          content: `💭 What about the opposite — variables made **outside** the function? Can functions read those?

\`\`\`python
x = 10        # Global variable (living-room item)

def func():
    print(x)  # 10 - readable inside ✅

func()
print(x)      # 10 - OK outside too ✅
\`\`\`

Global variables can be **read anywhere** in the program!

@key: Variables made **outside** = **global** = every function can read them!`
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Local vs Global",
          content: `What is the output?
\`\`\`python
x = 5

def func():
    x = 10
    print(x)

func()
print(x)
\`\`\``,
          options: [
            "10\\n10",
            "5\\n5",
            "10\\n5",
            "5\\n10"
          ],
          answer: 2,
          explanation: "x inside function is local(10), x outside is global(5)! They're different variables."
        },
        {
          id: "ch1-5",
          type: "tryit",
          title: "See It Yourself",
          task: "Check the difference between local and global",
          initialCode: `x = 5        # Global

def func():
    x = 10   # Local (new variable!)
    print(f'Inside: {x}')

func()
print(f'Outside: {x}')`,
          expectedOutput: "Inside: 10\nOutside: 5",
          hint: "x = 10 inside is a new local variable"
        },
        {
          id: "ch1-6",
          type: "explain",
          title: "💭 Can I change a global from inside a function?",
          content: `💭 What if you want to **change** a global variable inside a function? Just writing \`x = 20\` doesn't work — what does?

\`\`\`python
x = 10

def func():
    global x    # 👈 "I'll use the global x!"
    x = 20

func()
print(x)    # 20 (changed!)
\`\`\`

Use the \`global\` keyword to say "this is the global one!"

🚨 **Warning!** Avoid \`global\` when possible! It makes code complex. Use \`return\` to get values back instead.

@key: To **modify** a global inside a function, declare \`global x\`. But \`return\` is cleaner!`
        }
      ]
    },
    // ============================================
    // Chapter 2: Lambda Functions
    // ============================================
    {
      id: "ch2",
      title: "Lambda Functions",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "💭 Writing def for 3 lines feels long... any shortcut?",
          content: `💭 The function is simple, but \`def\` plus \`return\` makes it 3 lines. **Can I write a one-line function?**

**Lambda = one-line function!** ⚡

\`\`\`python
# Regular function (3 lines)
def add(a, b):
    return a + b

# Lambda function (1 line!)
add2 = lambda a, b: a + b

# Both give same result!
print(add(3, 5))     # 8
print(add2(3, 5))    # 8
\`\`\`

@key: Lambda is a **named one-line function!** No def, no return — handy for short cases.`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "📝 Lambda shape — memorize this!",
          content: `💭 What does a lambda look like? Just memorize this shape!

\`\`\`python
lambda parameters: return_value
\`\`\`

- \`lambda\` = "one-line function starts here!"
- After the colon (\`:\`) is the **value returned** (no \`return\` keyword needed!)

**Examples:**
\`\`\`python
square = lambda x: x ** 2
print(square(5))    # 25

is_odd = lambda x: x % 2 == 1
print(is_odd(7))    # True
\`\`\`

@key: \`lambda params: value\` — the part after \`:\` is the result! No \`return\` needed, it returns automatically.`
        },
        {
          id: "ch2-3",
          type: "tryit",
          title: "Creating Lambda Functions",
          task: "Run lambda functions",
          initialCode: `# Square function
square = lambda x: x ** 2
print(square(5))

# Check if odd
is_odd = lambda x: x % 2 == 1
print(is_odd(7))
print(is_odd(4))`,
          expectedOutput: "25\nTrue\nFalse",
          hint: "5² = 25, 7 is odd(True), 4 is even(False)"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Understanding Lambda",
          content: `What is the output?
\`\`\`python
double = lambda x: x * 2
print(double(7))
\`\`\``,
          options: [
            "7",
            "14",
            "72",
            "Error occurs"
          ],
          answer: 1,
          explanation: "lambda x: x * 2 doubles x. 7 × 2 = 14"
        },
        {
          id: "ch2-5",
          type: "mission",
          title: "Triple Function with Lambda",
          task: "Complete the lambda function that triples a number",
          initialCode: `triple = lambda x: # Write code here

print(triple(5))
print(triple(10))`,
          expectedOutput: "15\n30",
          hint: "To triple x, use x * 3",
          hint2: "lambda x: x * 3"
        }
      ]
    },
    // ============================================
    // Chapter 3: sorted() with Lambda
    // ============================================
    {
      id: "ch3",
      title: "sorted() with Lambda",
      emoji: "📊",
      steps: [
        {
          id: "ch3-1",
          type: "explain",
          title: "💭 How do I sort students by score?",
          content: `💭 Students = \`[('Tom', 85), ('Jane', 92), ('Mike', 78)]\`. Plain \`sorted()\` sorts by name. How do I sort by **score**?

\`\`\`python
students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score (the second value)
sorted_list = sorted(students, key=lambda x: x[1])
print(sorted_list)
# [('Mike', 78), ('Tom', 85), ('Jane', 92)]
\`\`\`

**\`key=lambda x: x[1]\`** = "compare by each tuple's second value (score)!"

@key: \`sorted(... key=lambda)\` lets you sort by **any rule**! Common exam combo.`
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "Sort by Score",
          task: "Sort students by their scores",
          initialCode: `students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score (x[1])
sorted_list = sorted(students, key=lambda x: x[1])
print(sorted_list)`,
          expectedOutput: "[('Mike', 78), ('Tom', 85), ('Jane', 92)]",
          hint: "x[1] is each tuple's second element (score)"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "sorted with Lambda",
          content: `What is the output?
\`\`\`python
data = [(3, 'a'), (1, 'c'), (2, 'b')]
result = sorted(data, key=lambda x: x[0])
print(result)
\`\`\``,
          options: [
            "[(3, 'a'), (1, 'c'), (2, 'b')]",
            "[(1, 'c'), (2, 'b'), (3, 'a')]",
            "[('a', 3), ('b', 2), ('c', 1)]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "Sorted by x[0] (first number)! 1, 2, 3 order."
        },
        {
          id: "ch3-4",
          type: "mission",
          title: "Sort Descending",
          task: "Sort data by second element in descending order",
          initialCode: `data = [('a', 3), ('b', 1), ('c', 2)]

# Sort by x[1], descending
result = sorted(data, key=lambda x: x[1], reverse=True)
print(result)`,
          expectedOutput: "[('a', 3), ('c', 2), ('b', 1)]",
          hint: "reverse=True makes it descending"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "🏆 Sort by String Length",
          task: "Sort words by their length",
          initialCode: `words = ['apple', 'hi', 'banana', 'cat']

# Sort by length (len(x))
result = # Write code here

print(result)`,
          expectedOutput: "['hi', 'cat', 'apple', 'banana']",
          hint: "key=lambda x: len(x) sorts by length",
          hint2: "sorted(words, key=lambda x: len(x))"
        }
      ]
    },
    // ============================================
    // Chapter 4: Functions Calling Functions
    // ============================================
    {
      id: "ch4",
      title: "Functions Calling Functions",
      emoji: "🔗",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 Can a function call other functions?",
          content: `💭 You made add and multiply functions. What if a new function **calls both of them** inside?

\`\`\`python
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def calculate(a, b):
    total = add(a, b)       # Call add function
    product = multiply(a, b) # Call multiply function
    return total, product

total, product = calculate(3, 5)
print(f'Sum: {total}, Product: {product}')
# Sum: 8, Product: 15
\`\`\`

@key: A function can **call other functions!** Break big problems into smaller function pieces.`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "Combining Functions",
          task: "Call other functions inside a function",
          initialCode: `def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def calculate(a, b):
    total = add(a, b)
    product = multiply(a, b)
    return total, product

total, product = calculate(3, 5)
print(f'Sum: {total}, Product: {product}')`,
          expectedOutput: "Sum: 8, Product: 15",
          hint: "3+5=8, 3×5=15"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Nested Functions",
          content: `What is the output?
\`\`\`python
def outer():
    x = 10
    def inner():
        return x * 2
    return inner()

print(outer())
\`\`\``,
          options: [
            "10",
            "20",
            "Error occurs",
            "None"
          ],
          answer: 1,
          explanation: "inner can use outer's x! 10 × 2 = 20"
        },
        {
          id: "ch4-4",
          type: "mission",
          title: "Temperature Converter",
          task: "Complete a function that converts Celsius and back",
          initialCode: `def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

def convert_temp(celsius):
    fahrenheit = celsius_to_fahrenheit(celsius)
    back_to_celsius = fahrenheit_to_celsius(fahrenheit)
    # Return both fahrenheit and back_to_celsius


f, c = convert_temp(100)
print(f'100°C = {f}°F')
print(f'{f}°F = {c}°C')`,
          expectedOutput: "100°C = 212.0°F\n212.0°F = 100.0°C",
          hint: "return fahrenheit, back_to_celsius",
          hint2: "return fahrenheit, back_to_celsius"
        }
      ]
    }
  ]
}
