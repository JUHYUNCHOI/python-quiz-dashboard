// ============================================
// Lesson 32: What is a Function?
// Part 5: Functions - Basics (English)
// ============================================

import { LessonData } from './types'

export const lesson32EnData: LessonData = {
  id: "32en",
  title: "What is a Function?",
  emoji: "🎁",
  description: "Learn the magic of reusing code with functions!",
  chapters: [
    // ============================================
    // Chapter 1: Why Functions?
    // ============================================
    {
      id: "ch1",
      title: "Why Functions?",
      emoji: "🤔",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "Why Do We Need Functions?",
          content: `## 🤔 Think About It

You need to send birthday messages to 10 friends.

Copying **"Happy birthday! Have a great day!"** and changing just the name each time... so tedious!

**Function = Automatic Message Machine!**
Just put in a name and it creates the message for you.`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "Coding Without Functions...",
          content: `### 😱 Repetition Hell

\`\`\`python
print('=' * 20)
print('Hello, Tom!')
print('=' * 20)

print('=' * 20)
print('Hello, Jane!')
print('=' * 20)

print('=' * 20)
print('Hello, Mike!')
print('=' * 20)
\`\`\`

Same code repeated over and over! **9 lines!**`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "With Functions!",
          content: `### ✨ Clean with Functions!

\`\`\`python
def greet(name):
    print('=' * 20)
    print(f'Hello, {name}!')
    print('=' * 20)

greet('Tom')
greet('Jane')
greet('Mike')
\`\`\`

Down to **7 lines!** And changes only need to be made in one place!

**Function** = Code bundled together with a name!
Call it by name whenever you need it.`
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Benefits of Functions",
          content: "What is the main reason for using functions?",
          options: [
            "Programs run slower",
            "Reuse code and reduce repetition",
            "File size increases",
            "More errors occur"
          ],
          answer: 1,
          explanation: "Functions let you reuse code and reduce repetition of the same code!"
        }
      ]
    },
    // ============================================
    // Chapter 2: Creating Functions (def)
    // ============================================
    {
      id: "ch2",
      title: "Creating Functions (def)",
      emoji: "🔨",
      steps: [
        {
          id: "ch2-1",
          type: "interactive",
          title: "Function Structure",
          description: "See how a function is structured!",
          component: "functionStructure"
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "Basic Format",
          content: `## Creating with def

\`\`\`python
def function_name():
    code to run
\`\`\`

**Rules:**
- \`def\` = short for "define"
- \`()\` after function name is required!
- **Indentation** after \`:\` is required!`
        },
        {
          id: "ch2-3",
          type: "interactive",
          title: "Experience Function Execution",
          description: "Press the button to see how a function runs!",
          component: "functionVisualizer",
          componentProps: {
            funcName: "greet",
            params: ["name"],
            body: 'print(f"Hello, {name}!")',
            callArgs: ["Tom"],
            output: "Hello, Tom!"
          }
        },
        {
          id: "ch2-4",
          type: "tryit",
          title: "Simplest Function",
          task: "Define and call a function",
          initialCode: `def say_hello():
    print('Hello!')

# Call the function
say_hello()`,
          expectedOutput: "Hello!",
          hint: "Just run the code!"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Understanding Function Calls",
          content: `What is the output of this code?
\`\`\`python
def say_hello():
    print('Hello!')

say_hello()
say_hello()
\`\`\``,
          options: [
            "Hello!",
            "Hello!\\nHello!",
            "Nothing is printed",
            "Error occurs"
          ],
          answer: 1,
          explanation: "say_hello() is called twice, so 'Hello!' is printed twice!"
        },
        {
          id: "ch2-6",
          type: "mission",
          title: "My First Function",
          task: "Create a function fun() that prints 'Python is fun!' and call it",
          initialCode: `# Define the fun function
def fun():
    # Write your code here


# Call the function
fun()`,
          expectedOutput: "Python is fun!",
          hint: "Write print('Python is fun!') inside the function",
          hint2: "def fun():\\n    print('Python is fun!')"
        }
      ]
    },
    // ============================================
    // Chapter 3: Parameters
    // ============================================
    {
      id: "ch3",
      title: "Parameters",
      emoji: "📦",
      steps: [
        {
          id: "ch3-1",
          type: "interactive",
          title: "What are Parameters?",
          description: "See how to pass values to a function!",
          component: "parameterStructure"
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "Function with Name",
          task: "Pass a name to the function",
          initialCode: `def greet(name):
    print(f'Hello, {name}!')

greet('Tom')
greet('Jane')`,
          expectedOutput: "Hello, Tom!\nHello, Jane!",
          hint: "'Tom' and 'Jane' are passed to the name parameter"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Understanding Parameters",
          content: `What is the output of this code?
\`\`\`python
def greet(name):
    print(f'Hi {name}!')

greet('Mike')
\`\`\``,
          options: [
            "Hi name!",
            "Hi Mike!",
            "Hi!",
            "Error occurs"
          ],
          answer: 1,
          explanation: "'Mike' is passed to the name parameter, so 'Hi Mike!' is printed!"
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "Multiple Parameters",
          task: "Run a function that takes name and age",
          initialCode: `def introduce(name, age):
    print(f"I'm {name}, {age} years old.")

introduce('Tom', 15)
introduce('Jane', 14)`,
          expectedOutput: "I'm Tom, 15 years old.\nI'm Jane, 14 years old.",
          hint: "Name and age are passed to each parameter"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Food Order Function",
          task: "Create an order function that prints '[food] please!'",
          initialCode: `def order(food):
    # Write your code here


order('pizza')
order('chicken')`,
          expectedOutput: "pizza please!\nchicken please!",
          hint: "Use f-string: f'{food} please!'",
          hint2: "print(f'{food} please!')"
        }
      ]
    },
    // ============================================
    // Chapter 4: Return Values
    // ============================================
    {
      id: "ch4",
      title: "Return Values",
      emoji: "🎁",
      steps: [
        {
          id: "ch4-1",
          type: "interactive",
          title: "What is return?",
          description: "See how functions return results!",
          component: "returnStructure"
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "Addition Function",
          task: "Receive a result using return",
          initialCode: `def add(a, b):
    return a + b

result = add(3, 5)
print(result)`,
          expectedOutput: "8",
          hint: "3 + 5 = 8 is returned and stored in result!"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Understanding return",
          content: `What is the output of this code?
\`\`\`python
def calc(a, b):
    return a * b

result = calc(4, 5)
print(result)
\`\`\``,
          options: [
            "9",
            "20",
            "45",
            "Error occurs"
          ],
          answer: 1,
          explanation: "4 × 5 = 20 is returned and stored in result!"
        },
        {
          id: "ch4-4",
          type: "explain",
          title: "return vs print Difference",
          content: `## ⚠️ Don't Confuse Them!

\`\`\`python
# Function with only print
def greet():
    print('Hello!')

result1 = greet()    # 'Hello!' printed
print(result1)       # None (nothing)

# Function with return
def add(a, b):
    return a + b

result2 = add(3, 5)
print(result2)       # 8
print(result2 * 2)   # 16 - can use in calculations!
\`\`\`

**Key Point:**
- \`print()\`: Just shows on screen → Can't use elsewhere
- \`return\`: Returns the value → Can store in variable, use in calculations`
        },
        {
          id: "ch4-5",
          type: "quiz",
          title: "Code After return",
          content: `What is the output of this code?
\`\`\`python
def test():
    print('A')
    return 'B'
    print('C')

result = test()
print(result)
\`\`\``,
          options: [
            "A\\nB\\nC",
            "A\\nB",
            "B",
            "Error occurs"
          ],
          answer: 1,
          explanation: "Code after return (print('C')) never runs! A is printed, then 'B' is returned."
        },
        {
          id: "ch4-6",
          type: "mission",
          title: "Multiply Function",
          task: "Complete the multiply function that returns the product of two numbers",
          initialCode: `def multiply(a, b):
    # Write your code here


print(multiply(3, 4))
print(multiply(5, 6))`,
          expectedOutput: "12\n30",
          hint: "Use return a * b",
          hint2: "return a * b"
        }
      ]
    },
    // ============================================
    // Chapter 5: Project
    // ============================================
    {
      id: "ch5",
      title: "Project: Greeting Machine",
      emoji: "🎉",
      steps: [
        {
          id: "ch5-1",
          type: "explain",
          title: "What We'll Make!",
          content: `## 🎉 Let's Make a Greeting Machine!

\`\`\`
=== Greeting Machine ===
====================
Hello, Tom!
====================
====================
Hello, Jane!
====================
====================
Hello, Mike!
====================
\`\`\`

Let's make it clean using functions!`
        },
        {
          id: "ch5-2",
          type: "mission",
          title: "Complete the Greeting Machine",
          task: "Complete the greet function and greet 3 people",
          initialCode: `# Define greet function
def greet(name):
    print('=' * 20)
    print(f'Hello, {name}!')
    print('=' * 20)

# Run greeting machine
print('=== Greeting Machine ===')
greet('Tom')
greet('Jane')
greet('Mike')`,
          expectedOutput: "=== Greeting Machine ===\n====================\nHello, Tom!\n====================\n====================\nHello, Jane!\n====================\n====================\nHello, Mike!\n====================",
          hint: "Just run the code as is!"
        },
        {
          id: "ch5-3",
          type: "mission",
          title: "🏆 Challenge: Add Message",
          task: "Create a function that takes name and message and prints them",
          initialCode: `# Function that takes name and message
def greet(name, message):
    # Write your code here


greet('Tom', 'Nice to meet you')
greet('Jane', 'Good morning')`,
          expectedOutput: "Nice to meet you, Tom!\nGood morning, Jane!",
          hint: "Print f'{message}, {name}!'",
          hint2: "print(f'{message}, {name}!')"
        }
      ]
    }
  ]
}
