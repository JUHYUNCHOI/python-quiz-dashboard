// ============================================
// Lesson 33: Parameters & Return Values
// Part 5: Functions - Basics (English)
// Mirrors KR data/lessons/lesson33/ (7 chapters)
// ============================================

import { LessonData } from './types'

export const lesson33EnData: LessonData = {
  id: "33",
  title: "Parameters & Return Values",
  emoji: "📦",
  description: "Give values to functions and get results back!",
  chapters: [
    // ============================================
    // Chapter 1: Today's Goal!
    // ============================================
    {
      id: "ch1",
      title: "Today's Goal!",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 Can we make functions smarter?",
          content: `💭 Last time you built add and subtract functions. But every call needs the same values, and you only get **one** result back… isn't there an **easier way**?

\`\`\`
=== Calculator ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

Today we upgrade functions to be **smarter**:

- Use default values for **convenience**
- Get **multiple results** back at once
- Use name tags to be **crystal clear**

@key: Adding **default values, multiple returns, and keyword arguments** makes functions way more convenient!`
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quick review!",
          content: `From last time! What goes in the blank?

\`\`\`python
def add(a, b):
    _____ a + b

result = add(3, 5)
\`\`\``,
          options: ["print", "return", "def", "result"],
          answer: 1,
          explanation: "`return` sends the value back. The variable `result` stores 8."
        },
        {
          id: "ch1-3",
          type: "interactive",
          title: "Type along: review",
          description: "Review parameters and return!",
          component: "typeAlong",
          targetCode: `def square(n):
    return n * n

print(square(5))`,
          expectedOutput: "25"
        }
      ]
    },
    // ============================================
    // Chapter 2: Default Values
    // ============================================
    {
      id: "ch2",
      title: "Default Values",
      emoji: "⚙️",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "💭 What if I keep passing the same value?",
          content: `💭 You have a greet function for 5 friends. But every time you have to pass **'Hello'**… isn't there a way to shrink that?

\`\`\`python
def greet(name, message):
    print(f'{message}, {name}!')

greet('Tom', 'Hello')
greet('Jane', 'Hello')
greet('Mike', 'Hello')
greet('Anna', 'Hello')
greet('Liz', 'Hello')
\`\`\`

**'Hello' five times!** 😩

Most of the time it's "Hello"…
typing it every single time is annoying!

@key: We need a way to **auto-fill** values we use most of the time without typing them every call.`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "💡 Solved with default values!",
          content: `💭 What if we **pre-fill** the parameter with a value so it's used automatically when nothing is passed? How do we write it?

\`\`\`python
def greet(name, message='Hello'):  # 👈 Default!
    print(f'{message}, {name}!')
\`\`\`

Just put the default value after **=**!

\`\`\`python
greet('Tom')              # No message → "Hello, Tom!"
greet('Jane', 'Welcome')  # Message given → "Welcome, Jane!"
\`\`\`

- **Skip the value** → default is used! ✅
- **Pass a value** → your value wins! ✅

@key: Write **=value** on a parameter and Python auto-uses it when nothing is passed.`
        },
        {
          id: "ch2-3",
          type: "interactive",
          title: "🎬 See default values in action!",
          description: "Click through and watch how default values behave!",
          component: "defaultValueVisualizer"
        },
        {
          id: "ch2-4",
          type: "interactive",
          title: "Type along: default value",
          description: "Type a function with a default value!",
          component: "typeAlong",
          targetCode: `def greet(name, message='Hello'):
    print(f'{message}, {name}!')

greet('Tom')
greet('Jane', 'Welcome')`,
          expectedOutput: "Hello, Tom!\nWelcome, Jane!"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "🛑 Stop and predict!",
          content: `What is the output?

\`\`\`python
def power(n, exp=2):
    return n ** exp

print(power(3))
\`\`\``,
          options: ["3", "6", "9", "Error occurs"],
          answer: 2,
          explanation: "`exp` wasn't passed, so the default `2` is used. 3² = 3 × 3 = 9."
        },
        {
          id: "ch2-6",
          type: "interactive",
          title: "Fill in the blank: default value",
          description: "Set a default value!",
          component: "fillInBlank",
          codeTemplate: "def greet(name, message___1___):\n    print(f'{message}, {name}!')\n\ngreet('Tom')",
          blanks: [{ id: "1", answer: "='Hello'", hint: "Default goes after =" }],
          choices: ["='Hello'", ":'Hello'", "=='Hello'", "->Hello"],
          expectedOutput: "Hello, Tom!"
        },
        {
          id: "ch2-7",
          type: "explain",
          title: "🚨 Default value order rule!",
          content: `💭 When mixing parameters **with and without** defaults — does the order matter?

\`\`\`python
# ❌ Error!
def func(a=1, b):
    return a + b

# ✅ OK!
def func(a, b=1):
    return a + b
\`\`\`

**Rule:**
- Parameters **without** defaults → **first**
- Parameters **with** defaults → **last**

Why? Otherwise Python can't tell which value goes where!

@key: Parameters with defaults must come **after** parameters without defaults.`
        },
        {
          id: "ch2-8",
          type: "quiz",
          title: "Order quiz!",
          content: "Which function definition is correct?",
          options: ["def f(a=1, b): ...", "def f(a, b=1): ...", "def f(=1, b): ...", "def f(a, =1): ..."],
          answer: 1,
          explanation: "The default parameter `b=1` has to come last!"
        },
        {
          id: "ch2-9",
          type: "mission",
          title: "💰 Discount function",
          task: "Complete the function that applies a 10% default discount!",
          initialCode: `def discount(price, rate=10):
    # discounted = price * (100 - rate) / 100
    # Write the return statement here!


print(discount(10000))       # 10% off → 9000
print(discount(10000, 20))   # 20% off → 8000`,
          expectedOutput: "9000.0\n8000.0",
          hint: "discounted = price * (100 - rate) / 100",
          hint2: "return price * (100 - rate) / 100"
        }
      ]
    },
    // ============================================
    // Chapter 3: Multiple Return Values
    // ============================================
    {
      id: "ch3",
      title: "Multiple Return Values",
      emoji: "📤",
      steps: [
        {
          id: "ch3-1",
          type: "explain",
          title: "💭 What if I need 2 results at once?",
          content: `💭 You want **both** the quotient and the remainder of 17 ÷ 5. But a function returns one value… can't I get two at once?

\`\`\`python
# Do I have to compute twice? 😩
quotient = 17 // 5      # 3
remainder = 17 % 5      # 2
\`\`\`

Can one function give us **both**?

@key: We need a way to **return multiple values at once** from a function!`
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "📦 What if return has a comma?",
          content: `💭 What if we **separate values with commas** after \`return\`? And how do we receive them?

\`\`\`python
def divide(num, divisor):
    quotient = num // divisor
    remainder = num % divisor
    return quotient, remainder    # 👈 2 values separated by comma!
\`\`\`

How to receive:
\`\`\`python
# Way 1: receive as one (tuple)
result = divide(17, 5)
print(result)      # (3, 2)

# Way 2: receive separately ✅ recommended!
q, r = divide(17, 5)
print(q)           # 3
print(r)           # 2
\`\`\`

**return val1, val2** → **var1, var2 = func()**

@key: List multiple values after **return** with commas, and unpack them with **matching commas**!`
        },
        {
          id: "ch3-3",
          type: "interactive",
          title: "🎬 See multiple returns in action!",
          description: "Click through and watch how two values are returned!",
          component: "multipleReturnVisualizer"
        },
        {
          id: "ch3-4",
          type: "interactive",
          title: "Type along: multiple returns",
          description: "Get quotient and remainder at once!",
          component: "typeAlong",
          targetCode: `def divide(a, b):
    return a // b, a % b

q, r = divide(17, 5)
print(f'Quotient: {q}, Remainder: {r}')`,
          expectedOutput: "Quotient: 3, Remainder: 2"
        },
        {
          id: "ch3-5",
          type: "interactive",
          title: "Fill in the blank: multiple returns",
          description: "Return the sum and the product at once!",
          component: "fillInBlank",
          codeTemplate: "def calc(a, b):\n    return ___1___\n\ntotal, product = calc(3, 5)\nprint(f'Sum: {total}, Product: {product}')",
          blanks: [{ id: "1", answer: "a + b, a * b", hint: "List both values with a comma!" }],
          choices: ["a + b, a * b", "a + b", "a * b", "a + b & a * b"],
          expectedOutput: "Sum: 8, Product: 15"
        },
        {
          id: "ch3-6",
          type: "mission",
          title: "📊 Max / Min function",
          task: "Return the maximum and minimum of a list at once!",
          initialCode: `def max_min(numbers):
    # max() = largest, min() = smallest
    # Return both at once


maximum, minimum = max_min([3, 7, 1, 9, 4])
print(f'Max: {maximum}, Min: {minimum}')`,
          expectedOutput: "Max: 9, Min: 1",
          hint: "return max(numbers), min(numbers)",
          hint2: "Just separate the two values with a comma!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "📈 Stats function",
          task: "Return the total and the average at once!",
          initialCode: `def stats(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    # Return total and average at once!


total, average = stats([10, 20, 30])
print(f'Total: {total}, Average: {average}')`,
          expectedOutput: "Total: 60, Average: 20.0",
          hint: "return total, average separated by a comma!",
          hint2: "return total, average"
        }
      ]
    },
    // ============================================
    // Chapter 4: Keyword Arguments
    // ============================================
    {
      id: "ch4",
      title: "Keyword Arguments",
      emoji: "🏷️",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 With many parameters, which value is which?",
          content: `💭 A function has 5 parameters. When you call it with just numbers, **how do you remember** which one is which?

\`\`\`python
def profile(name, age, school, grade, number):
    print(f'{name}, {age} yrs, {school} grade {grade} #{number}')

profile('Tom', 15, 'Python High', 3, 12)
# Which is which? 🤔
# Is 15 the age? Grade? Number?
\`\`\`

@key: When parameters pile up, you need **name tags** to pass values clearly!`
        },
        {
          id: "ch4-2",
          type: "explain",
          title: "🏷️ Add name tags with keyword arguments!",
          content: `💭 What if we write **parameter_name=value** when calling? Does the order still matter?

\`\`\`python
def introduce(name, age, school):
    print(f'{name}, {age} yrs, {school}')
\`\`\`

Positional arguments (in order):
\`\`\`python
introduce('Tom', 15, 'Python High')
\`\`\`

Keyword arguments (with name tags!):
\`\`\`python
introduce(school='Python High', name='Tom', age=15)
#         👆 Order doesn't matter!
\`\`\`

Write **name=value** and pass arguments in any order!

@key: Use **name=value** (keyword arguments) and Python matches by **name** — order stops mattering.`
        },
        {
          id: "ch4-2-5",
          type: "interactive",
          title: "🎬 See keyword arguments",
          description: "Watch the animation to see how name tags work!",
          component: "keywordArgVisualizer"
        },
        {
          id: "ch4-3",
          type: "interactive",
          title: "Type along: keyword arguments",
          description: "Call with name tags!",
          component: "typeAlong",
          targetCode: `def profile(name, age, job):
    print(f'{name}({age}) - {job}')

profile(job='developer', age=25, name='Jane')`,
          expectedOutput: "Jane(25) - developer"
        },
        {
          id: "ch4-4",
          type: "quiz",
          title: "🛑 Stop and predict!",
          content: `What is the output?

\`\`\`python
def greet(name, msg='Hello'):
    print(f'{msg}, {name}!')

greet(msg='Welcome', name='Mike')
\`\`\``,
          options: ["Hello, Mike!", "Welcome, Mike!", "Mike, Welcome!", "Error occurs"],
          answer: 1,
          explanation: "Keyword arguments pass `msg='Welcome'` and `name='Mike'`. The default 'Hello' is ignored."
        },
        {
          id: "ch4-5",
          type: "interactive",
          title: "Fill in the blank: keyword arguments",
          description: "Call with keyword arguments!",
          component: "fillInBlank",
          codeTemplate: "def order(menu, qty):\n    print(f'{menu} x{qty} ordered!')\n\norder(___1___)",
          blanks: [{ id: "1", answer: "qty=3, menu='pizza'", hint: "Use name tags!" }],
          choices: ["qty=3, menu='pizza'", "3, 'pizza'", "'pizza', 3", "menu:'pizza', qty:3"],
          expectedOutput: "pizza x3 ordered!"
        }
      ]
    },
    // ============================================
    // Chapter 5: Project — Calculator
    // ============================================
    {
      id: "ch5",
      title: "Project: Calculator",
      emoji: "🧮",
      steps: [
        {
          id: "ch5-1",
          type: "explain",
          title: "💭 What if each operation becomes a function?",
          content: `💭 Could we build a calculator by making **each operation** — add, subtract, multiply, divide — its own function?

\`\`\`
=== Calculator ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

Let's use what we learned to build 4 functions!

@key: **Splitting each operation into a function** gives you a clean, reusable calculator!`
        },
        {
          id: "ch5-2",
          type: "interactive",
          title: "Type along: add & subtract",
          description: "Make the add and subtract functions!",
          component: "typeAlong",
          targetCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(f'3 + 5 = {add(3, 5)}')
print(f'10 - 4 = {subtract(10, 4)}')`,
          expectedOutput: "3 + 5 = 8\n10 - 4 = 6"
        },
        {
          id: "ch5-3",
          type: "interactive",
          title: "Fill in the blank: multiply",
          description: "Complete the multiply function!",
          component: "fillInBlank",
          codeTemplate: "def multiply(a, b):\n    return ___1___\n\nprint(f'6 * 7 = {multiply(6, 7)}')",
          blanks: [{ id: "1", answer: "a * b", hint: "Multiply two numbers!" }],
          choices: ["a * b", "a + b", "a - b", "a / b"],
          expectedOutput: "6 * 7 = 42"
        },
        {
          id: "ch5-4",
          type: "mission",
          title: "Divide function",
          task: "Complete the divide function!",
          initialCode: `def divide(a, b):
    # Write the return statement here!


print(f'20 / 4 = {divide(20, 4)}')`,
          expectedOutput: "20 / 4 = 5.0",
          hint: "The divide operator is /",
          hint2: "return a / b"
        },
        {
          id: "ch5-5",
          type: "mission",
          title: "🧮 Calculator complete!",
          task: "Finish all 4 operation functions!",
          initialCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    # Code here!

def divide(a, b):
    # Code here!

print('=== Calculator ===')
print(f'3 + 5 = {add(3, 5)}')
print(f'10 - 4 = {subtract(10, 4)}')
print(f'6 * 7 = {multiply(6, 7)}')
print(f'20 / 4 = {divide(20, 4)}')`,
          expectedOutput: "=== Calculator ===\n3 + 5 = 8\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5.0",
          hint: "multiply uses *, divide uses /",
          hint2: "return a * b / return a / b"
        },
        {
          id: "ch5-6",
          type: "mission",
          title: "🏆 Challenge: safe divide",
          task: "Return 'Cannot divide!' when dividing by 0!",
          initialCode: `def safe_divide(a, b):
    # If b is 0, return 'Cannot divide!'
    # Otherwise return a / b


print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
          expectedOutput: "5.0\nCannot divide!",
          hint: "Check with if b == 0:",
          hint2: "if b == 0:\n    return 'Cannot divide!'\nreturn a / b"
        }
      ]
    },
    // ============================================
    // Chapter 6: Practice Problems
    // ============================================
    {
      id: "ch6",
      title: "Practice Problems",
      emoji: "📝",
      steps: [
        {
          id: "ch6-1",
          type: "quiz",
          title: "⭐ Problem 1",
          content: `What is the output?

\`\`\`python
def greet(name, message='Hello'):
    print(f'{message}, {name}!')

greet('Tom')
\`\`\``,
          options: ["Tom, Hello!", "Hello, Tom!", "Error occurs", "Nothing is printed"],
          answer: 1,
          explanation: "`message` wasn't passed, so the default 'Hello' is used!"
        },
        {
          id: "ch6-2",
          type: "quiz",
          title: "⭐ Problem 2",
          content: `What is the output?

\`\`\`python
def power(n, exp=2):
    return n ** exp

print(power(5, 3))
\`\`\``,
          options: ["10", "25", "125", "Error"],
          answer: 2,
          explanation: "`exp=3` was passed, so 5³ = 5 × 5 × 5 = 125."
        },
        {
          id: "ch6-3",
          type: "quiz",
          title: "⭐⭐ Problem 3",
          content: `Why does this code error?

\`\`\`python
def func(a=1, b):
    return a + b
\`\`\``,
          options: [
            "return syntax error",
            "Parameter with default comes before one without",
            "Variable name is invalid",
            "It doesn't error"
          ],
          answer: 1,
          explanation: "`a=1` (with default) comes before `b` (no default) — error! Fix: `def func(b, a=1):`"
        },
        {
          id: "ch6-4",
          type: "mission",
          title: "⭐⭐⭐ Average of three numbers",
          task: "Take 3 numbers and return their average!",
          initialCode: `def average(a, b, c):
    # Write the return statement here!


print(average(80, 90, 70))   # should print 80.0`,
          expectedOutput: "80.0",
          hint: "average = (a + b + c) / 3",
          hint2: "return (a + b + c) / 3"
        }
      ]
    },
    // ============================================
    // Chapter 7: Summary
    // ============================================
    {
      id: "ch7",
      title: "Summary",
      emoji: "🎯",
      steps: [
        {
          id: "ch7-1",
          type: "explain",
          title: "🎯 Today's 3 things — full recap!",
          content: `💭 Default values, multiple returns, keyword arguments… remember **how to use each**?

1️⃣ Default values
\`\`\`python
def func(a, b=10):   # b defaults to 10 if not given
    return a + b
\`\`\`
Parameters with defaults go **last**!

2️⃣ Multiple return values
\`\`\`python
def calc(a, b):
    return a + b, a - b   # return 2 values

total, diff = calc(10, 3)  # unpack each
\`\`\`

3️⃣ Keyword arguments
\`\`\`python
func(name='Tom', age=15)   # order doesn't matter!
\`\`\`

@key: **Defaults = convenience**, **multiple return = comma**, **keyword args = name tags** — master these three and you've mastered functions!`
        }
      ]
    }
  ]
}
