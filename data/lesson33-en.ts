// ============================================
// Lesson 33: Parameters and Return Values
// Part 5: Functions - Basics (English)
// ============================================

import { LessonData } from './types'

export const lesson33EnData: LessonData = {
  id: "33en",
  title: "Parameters & Return Values",
  emoji: "📦",
  description: "Give values to functions and get results back!",
  chapters: [
    // ============================================
    // Chapter 1: Parameter Review
    // ============================================
    {
      id: "ch1",
      title: "Parameter Review",
      emoji: "📦",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "What We'll Make!",
          content: `## 🧮 Let's make Calculator Functions!

\`\`\`
=== Calculator ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
\`\`\``
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "One Parameter",
          task: "Run the square function",
          initialCode: `def square(n):
    return n * n

print(square(5))`,
          expectedOutput: "25",
          hint: "5 squared = 5 × 5 = 25"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "Two Parameters",
          task: "Run the add function",
          initialCode: `def add(a, b):
    return a + b

print(add(3, 5))`,
          expectedOutput: "8",
          hint: "3 + 5 = 8"
        },
        {
          id: "ch1-4",
          type: "mission",
          title: "Create Subtract Function",
          task: "Complete the subtract function that returns the difference",
          initialCode: `def subtract(a, b):
    # Write code here


print(subtract(10, 3))
print(subtract(20, 8))`,
          expectedOutput: "7\n12",
          hint: "Use return a - b",
          hint2: "return a - b"
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
          title: "What are Default Values?",
          content: `## 🤔 Think About It

You made a greeting function.
Usually you say "Hello", but sometimes you want "Hi".
Typing "Hello" every time is annoying...

**Default Value = Value that's automatically used!**

\`\`\`python
def greet(name, message='Hello'):  # ← Default value
    print(f'{message}, {name}!')

greet('Tom')             # "Hello, Tom!" (uses default)
greet('Jane', 'Hi')      # "Hi, Jane!" (custom value)
\`\`\``
        },
        {
          id: "ch2-2",
          type: "tryit",
          title: "Using Default Values",
          task: "See how default values work",
          initialCode: `def greet(name, message='Hello'):
    print(f'{message}, {name}!')

greet('Tom')              # No message given
greet('Jane', 'Hi')       # Message given`,
          expectedOutput: "Hello, Tom!\nHi, Jane!",
          hint: "First one uses default 'Hello'"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "Understanding Default Values",
          content: `What is the output?
\`\`\`python
def power(n, exp=2):
    return n ** exp

print(power(3))
\`\`\``,
          options: [
            "3",
            "6",
            "9",
            "Error occurs"
          ],
          answer: 2,
          explanation: "No exp given, so default 2 is used. 3² = 9"
        },
        {
          id: "ch2-4",
          type: "tryit",
          title: "Power Function",
          task: "Compare default vs custom values",
          initialCode: `def power(n, exp=2):
    return n ** exp

print(power(3))       # Uses default
print(power(3, 3))    # exp=3
print(power(2, 10))   # exp=10`,
          expectedOutput: "9\n27\n1024",
          hint: "3² = 9, 3³ = 27, 2¹⁰ = 1024"
        },
        {
          id: "ch2-5",
          type: "explain",
          title: "⚠️ Default Value Order",
          content: `## 🚨 Parameters with defaults come LAST!

\`\`\`python
# ❌ Error!
def func(a=1, b):
    return a + b

# ✅ OK!
def func(a, b=1):
    return a + b
\`\`\`

Parameters **without** defaults first, **with** defaults last!`
        },
        {
          id: "ch2-6",
          type: "mission",
          title: "Discount Function",
          task: "Create a function with price and rate (default 10) that returns discounted price",
          initialCode: `def discount(price, rate=10):
    # discounted = price * (100 - rate) / 100
    # Write code here


print(discount(10000))       # 10% off = 9000
print(discount(10000, 20))   # 20% off = 8000`,
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
          title: "Returning Multiple Values",
          content: `## 📤 Functions can return multiple values at once!

\`\`\`python
def divide(num, divisor):
    quotient = num // divisor
    remainder = num % divisor
    return quotient, remainder    # Returns 2 values!

q, r = divide(17, 5)  # Receive each!
\`\`\`

**Think of it as:**
- Receive as one → becomes **tuple**
- Receive separately → stored in each variable!`
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "Quotient and Remainder",
          task: "Try both ways of receiving",
          initialCode: `def divide(num, divisor):
    quotient = num // divisor
    remainder = num % divisor
    return quotient, remainder

result = divide(17, 5)
print(result)

q, r = divide(17, 5)
print(f'Quotient: {q}, Remainder: {r}')`,
          expectedOutput: "(3, 2)\nQuotient: 3, Remainder: 2",
          hint: "17 ÷ 5 = 3 remainder 2"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Multiple Return Values",
          content: `What is the output?
\`\`\`python
def calc(a, b):
    return a + b, a - b

x, y = calc(10, 3)
print(x, y)
\`\`\``,
          options: [
            "13, 7",
            "13 7",
            "(13, 7)",
            "Error occurs"
          ],
          answer: 1,
          explanation: "10+3=13, 10-3=7 stored in x, y respectively!"
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "Max and Min",
          task: "Run a function that returns both max and min",
          initialCode: `def max_min(numbers):
    return max(numbers), min(numbers)

maximum, minimum = max_min([3, 7, 1, 9, 4])
print(f'Max: {maximum}, Min: {minimum}')`,
          expectedOutput: "Max: 9, Min: 1",
          hint: "max() finds largest, min() finds smallest"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Sum and Average",
          task: "Complete the function that returns both sum and average",
          initialCode: `def stats(numbers):
    total = sum(numbers)
    # Calculate average and return both


total, avg = stats([10, 20, 30])
print(f'Sum: {total}, Average: {avg}')`,
          expectedOutput: "Sum: 60, Average: 20.0",
          hint: "average = total / len(numbers), return total, average",
          hint2: "avg = total / len(numbers)\\n    return total, avg"
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
          title: "What are Keyword Arguments?",
          content: `## 🏷️ Pass by name, order doesn't matter!

\`\`\`python
def introduce(name, age, school):
    print(f'{name}, {age} years old, {school}')

# By position (positional arguments)
introduce('Tom', 15, 'Python High')

# By name (keyword arguments) - order doesn't matter!
introduce(school='Python High', name='Tom', age=15)
\`\`\`

Both give same result: \`Tom, 15 years old, Python High\`

**Benefit:** Clear which value is which parameter!`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "Using Keyword Arguments",
          task: "Try both ways of calling",
          initialCode: `def profile(name, age, job):
    print(f'{name}({age}) - {job}')

# Positional
profile('Tom', 15, 'student')

# Keyword (different order OK!)
profile(job='developer', age=25, name='Jane')`,
          expectedOutput: "Tom(15) - student\nJane(25) - developer",
          hint: "Keyword arguments match by name, not position"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Understanding Keyword Arguments",
          content: `What is the output?
\`\`\`python
def greet(name, msg='Hello'):
    print(f'{msg}, {name}!')

greet(msg='Hi', name='Mike')
\`\`\``,
          options: [
            "Hello, Mike!",
            "Hi, Mike!",
            "Mike, Hi!",
            "Error occurs"
          ],
          answer: 1,
          explanation: "Keyword arguments pass msg='Hi', name='Mike'!"
        }
      ]
    },
    // ============================================
    // Chapter 5: Project
    // ============================================
    {
      id: "ch5",
      title: "Project: Calculator Functions",
      emoji: "🧮",
      steps: [
        {
          id: "ch5-1",
          type: "explain",
          title: "Making a Calculator",
          content: `## 🧮 Let's make Calculator Functions!

\`\`\`
=== Calculator ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

Four operation functions: add, subtract, multiply, divide!`
        },
        {
          id: "ch5-2",
          type: "mission",
          title: "Complete the Calculator",
          task: "Complete all four operation functions",
          initialCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    # Write code here

def divide(a, b):
    # Write code here

print('=== Calculator ===')
print(f'3 + 5 = {add(3, 5)}')
print(f'10 - 4 = {subtract(10, 4)}')
print(f'6 * 7 = {multiply(6, 7)}')
print(f'20 / 4 = {divide(20, 4)}')`,
          expectedOutput: "=== Calculator ===\n3 + 5 = 8\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5.0",
          hint: "multiply: return a * b, divide: return a / b",
          hint2: "return a * b\\n\\ndef divide(a, b):\\n    return a / b"
        },
        {
          id: "ch5-3",
          type: "mission",
          title: "🏆 Challenge: Safe Divide",
          task: "Return 'Cannot divide!' if trying to divide by 0",
          initialCode: `def safe_divide(a, b):
    # If b is 0, return 'Cannot divide!'
    # Otherwise return a / b


print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
          expectedOutput: "5.0\nCannot divide!",
          hint: "Check if b == 0 first",
          hint2: "if b == 0:\\n        return 'Cannot divide!'\\n    return a / b"
        }
      ]
    }
  ]
}
