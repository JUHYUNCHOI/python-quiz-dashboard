// ============================================
// Lesson 32: What is a Function?
// Part 5: Functions - Basics (English)
// Mirrors KR data/lessons/lesson32/ (5 chapters)
// ============================================

import { LessonData } from './types'

export const lesson32EnData: LessonData = {
  id: "32",
  title: "What is a Function?",
  emoji: "🎁",
  description: "Learn the magic of reusing code with functions!",
  chapters: [
    // ============================================
    // Chapter 1: What is a Function?
    // ============================================
    {
      id: "ch1",
      title: "What is a Function?",
      emoji: "🤔",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "🎂 Saying the same thing 10 times?",
          content: `💭 You need to send a **birthday message** to 10 friends. Copy-pasting the same line 10 times…? Isn't there a better way?

> "Happy birthday! Have a great day!"

Sending this to **10 people**… 🤯

@key: We want to **box up repeating code** and just swap the parts that change!`
        },
        {
          id: "ch1-2",
          type: "interactive",
          title: "Let's try writing it out…",
          description: "Watch the typing happen…",
          component: "repetitiveTyping"
        },
        {
          id: "ch1-3",
          type: "interactive",
          title: "There is a better way!",
          description: "Find the parts that repeat!",
          component: "patternDiscovery"
        },
        {
          id: "ch1-4",
          type: "explain",
          title: "💭 What if we put the repeating code in a box?",
          component: "pyFunctionBuilder",
          content: `💭 What if we put the repeating code **in a box and give it a name**? And poke a **hole** for the part that changes?

\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}! Have a great day!")
\`\`\`

- **def** = "I'm going to define a box!"
- **celebrate** = the name of the box
- **name** = the ingredient that goes into the box (the changing part!)

@key: This box is called a **function**! Build it with \`def name(ingredient):\``
        },
        {
          id: "ch1-5",
          type: "interactive",
          title: "Learn the function shape",
          description: "Click around to see what a function looks like!",
          component: "functionBuilder"
        },
        {
          id: "ch1-6",
          type: "quiz",
          title: "Concept check!",
          content: "Which keyword starts a function definition?",
          options: ["print", "def", "return", "function"],
          answer: 1,
          explanation: "`def` is short for 'define' — you use it to define a function."
        }
      ]
    },
    // ============================================
    // Chapter 2: Calling Functions
    // ============================================
    {
      id: "ch2",
      title: "Calling Functions",
      emoji: "📞",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "💭 I defined it but nothing happens?",
          content: `💭 You wrote a function… but running the file prints **nothing**! Why?

\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}!")

# Up to here — nothing is printed yet! 😮
\`\`\`

You have to **call** the function to run it:

\`\`\`python
celebrate("Tom")  # 👈 This is what actually runs it!
\`\`\`

@key: Defining isn't enough — you have to **call** it as \`function_name(value)\` to actually run the code.`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "💭 What happens when you call it?",
          content: `💭 When you write \`celebrate("Tom")\`… does \`"Tom"\` slot into the **name** spot?

\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}!")

celebrate("Tom")    # → "Happy birthday, Tom!"
celebrate("Jane")   # → "Happy birthday, Jane!"
celebrate("Mike")   # → "Happy birthday, Mike!"
\`\`\`

@key: Each call runs the function's code again. Swap the name and call it as **many times** as you want!`
        },
        {
          id: "ch2-3",
          type: "explain",
          title: "💭 What if I want to change the message?",
          content: `💭 Want to change "Happy birthday!" to "Happy Bday!"? How different is **with vs without** a function?

**Without a function:** edit all 10 lines 😵
\`\`\`python
print("Happy birthday, Tom!")
print("Happy birthday, Jane!")
print("Happy birthday, Mike!")
\`\`\`

**With a function:** edit just the body! 😎
\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}!")

celebrate("Tom")
celebrate("Jane")
celebrate("Mike")
\`\`\`

@key: With functions you **fix one spot** and everything updates. Maintenance becomes easy!`
        },
        {
          id: "ch2-4",
          type: "interactive",
          title: "Type along: a simple function",
          description: "Type the code above exactly as you see it!",
          component: "typeAlong",
          targetCode: `def hello():
    print("Hello!")

hello()`,
          expectedOutput: "Hello!"
        },
        {
          id: "ch2-5",
          type: "interactive",
          title: "Type along: call it many times",
          description: "Call the function 3 times to print 3 lines!",
          component: "typeAlong",
          targetCode: `def hello():
    print("Hello!")

hello()
hello()
hello()`,
          expectedOutput: "Hello!\nHello!\nHello!"
        },
        {
          id: "ch2-6",
          type: "interactive",
          title: "Fill in the blank: call the function",
          description: "Click the blank and pick the right choice!",
          component: "fillInBlank",
          codeTemplate: `def hello():
    print("Hello!")

___1___`,
          blanks: [{ id: "1", answer: "hello()", hint: "To call a function, write function_name()" }],
          choices: ["hello()", "hello", "print()", "def"],
          expectedOutput: "Hello!"
        },
        {
          id: "ch2-7",
          type: "interactive",
          title: "Fill in the blank: complete the function",
          description: "Finish the function and call it!",
          component: "fillInBlank",
          codeTemplate: "___1___ fun():\n    ___2___(\"Python is fun!\")\n\n___3___",
          blanks: [
            { id: "1", answer: "def", hint: "The keyword that defines a function" },
            { id: "2", answer: "print", hint: "Function that prints to the screen" },
            { id: "3", answer: "fun()", hint: "Call the function!" }
          ],
          choices: ["def", "print", "fun()", "return", "fun", "()"],
          expectedOutput: "Python is fun!"
        },
        {
          id: "ch2-8",
          type: "quiz",
          title: "Check quiz",
          content: `What is the output of this code?
\`\`\`python
def hi():
    print("Hi!")

hi()
hi()
\`\`\``,
          options: ["Hi!", "Hi! is printed twice", "Nothing is printed", "Error occurs"],
          answer: 1,
          explanation: "`hi()` is called twice, so 'Hi!' is printed twice."
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
          type: "explain",
          title: "💭 What about the parts that change?",
          content: `💭 "Tom", "Jane", "Mike"… **only the name changes** — how do we hand it to the function?

\`\`\`python
def celebrate(name):    # 👈 name = a parameter!
    print(f"Happy birthday, {name}!")

celebrate("Tom")   # "Tom" goes into name
celebrate("Jane")  # "Jane" goes into name
\`\`\`

@key: A **parameter** is the ingredient you pass to a function! Put it in the parentheses and the function uses it.`
        },
        {
          id: "ch3-2",
          type: "interactive",
          title: "Parameter shape",
          description: "See how a parameter is passed in!",
          component: "parameterStructure"
        },
        {
          id: "ch3-3",
          type: "mission",
          title: "Function that takes a name",
          task: "Add a call for 'Mike' so all 3 friends are greeted!",
          initialCode: `def greet(name):
    print(f"Hi, {name}!")

greet("Tom")
greet("Jane")
# Add a line that greets Mike here!`,
          expectedOutput: "Hi, Tom!\nHi, Jane!\nHi, Mike!",
          hint: "Just add greet(\"Mike\")",
          hint2: "Write greet(\"Mike\") on the last line"
        },
        {
          id: "ch3-4",
          type: "explain",
          title: "💭 What if I want to pass the age too?",
          content: `💭 Not just a name — what if I want **name and age** both? Can a function take more than one parameter?

\`\`\`python
def introduce(name, age):
    print(f"I'm {name}, {age} years old.")

introduce("Tom", 15)   # name=Tom, age=15
introduce("Jane", 14)  # name=Jane, age=14
\`\`\`

@key: Separate parameters with **commas (,)** to take more than one!`
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Use multiple parameters",
          task: "Add Mike (age 16) so all 3 are introduced!",
          initialCode: `def introduce(name, age):
    print(f"I'm {name}, {age} years old.")

introduce("Tom", 15)
introduce("Jane", 14)
# Add Mike (16 years old) here!`,
          expectedOutput: "I'm Tom, 15 years old.\nI'm Jane, 14 years old.\nI'm Mike, 16 years old.",
          hint: "Add introduce(\"Mike\", 16)",
          hint2: "Last line: introduce(\"Mike\", 16)"
        },
        {
          id: "ch3-6",
          type: "interactive",
          title: "Fill in the blank: use the parameter",
          description: "Use the parameter inside the f-string!",
          component: "fillInBlank",
          codeTemplate: "def greet(name):\n    print(f\"Hi, ___1___!\")\n\ngreet(\"Tom\")",
          blanks: [{ id: "1", answer: "{name}", hint: "Wrap the parameter in curly braces" }],
          choices: ["{name}", "name", "\"{name}\"", "Name"],
          expectedOutput: "Hi, Tom!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "Food order function",
          task: "Make order print '<food> please!' for each order",
          initialCode: `def order(food):
    print(f"_____ please!")  # put food in here!

order("pizza")
order("chicken")`,
          expectedOutput: "pizza please!\nchicken please!",
          hint: "Replace _____ with {food}!",
          hint2: "Wrap the variable in curly braces inside the f-string!"
        },
        {
          id: "ch3-8",
          type: "quiz",
          title: "Parameter quiz",
          content: `What is the output of this code?
\`\`\`python
def greet(name):
    print(f"Hey {name}!")

greet("Mike")
\`\`\``,
          options: ["Hey name!", "Hey Mike!", "Hey!", "Error occurs"],
          answer: 1,
          explanation: "'Mike' is passed into the `name` parameter, so it prints 'Hey Mike!'."
        }
      ]
    },
    // ============================================
    // Chapter 4: Return Values
    // ============================================
    {
      id: "ch4",
      title: "Return Values (return)",
      emoji: "🎁",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 What if I want to store the result?",
          content: `💭 You want to **save** what the function calculated into a variable! \`print\` just shows it on the screen… how do we get the value **back**?

\`\`\`python
def add(a, b):
    return a + b  # send the result back!

result = add(3, 5)   # 8 is stored in result
print(result)        # 8
\`\`\`

@key: **return** = send a value back! You can store it in a variable or use it in calculations.`
        },
        {
          id: "ch4-2",
          type: "interactive",
          title: "return shape",
          description: "See how return works step by step!",
          component: "returnStructure"
        },
        {
          id: "ch4-3",
          type: "mission",
          title: "Use the add function",
          task: "Change the numbers so it prints 10 + 7!",
          initialCode: `def add(a, b):
    return a + b

result = add(3, 5)  # change 3 and 5 to 10 and 7!
print(result)`,
          expectedOutput: "17",
          hint: "Change to add(10, 7)",
          hint2: "result = add(10, 7)"
        },
        {
          id: "ch4-4",
          type: "interactive",
          title: "Fill in the blank: using return",
          description: "Send the result back with return!",
          component: "fillInBlank",
          codeTemplate: "def subtract(a, b):\n    ___1___ a - b\n\nresult = subtract(10, 3)\nprint(result)",
          blanks: [{ id: "1", answer: "return", hint: "The keyword that sends a value back" }],
          choices: ["return", "print", "def", "result"],
          expectedOutput: "7"
        },
        {
          id: "ch4-5",
          type: "explain",
          title: "💭 What's the difference between print and return?",
          content: `💭 Don't they both show the result? Isn't **print** enough? What's the difference?

**print** = just shows it on the screen (does NOT save)
\`\`\`python
def hi():
    print("Hi!")

x = hi()      # "Hi!" gets printed
print(x)      # None (empty 😱)
\`\`\`

**return** = sends the value back (CAN save)
\`\`\`python
def add(a, b):
    return a + b

x = add(3, 5)
print(x)      # 8
print(x * 2)  # 16 — you can use it in calculations!
\`\`\`

@key: **print** just shows; **return** sends it back so you can store and calculate with it.`
        },
        {
          id: "ch4-6",
          type: "interactive",
          title: "Fill in the blank: multiply result",
          description: "Return the multiplied result!",
          component: "fillInBlank",
          codeTemplate: "def multiply(a, b):\n    return ___1___\n\nprint(multiply(3, 4))",
          blanks: [{ id: "1", answer: "a * b", hint: "Expression that multiplies two numbers" }],
          choices: ["a * b", "a + b", "a - b", "a / b"],
          expectedOutput: "12"
        },
        {
          id: "ch4-7",
          type: "mission",
          title: "Make a square function",
          task: "Fill in the blank so square returns the square of a number (square of 3 = 3 * 3 = 9)",
          initialCode: `def square(n):
    return _____  # put n * n here

print(square(3))   # should print 9
print(square(5))   # should print 25`,
          expectedOutput: "9\n25",
          hint: "Squaring means multiplying a number by itself!",
          hint2: "To multiply n by itself: n * n"
        },
        {
          id: "ch4-8",
          type: "quiz",
          title: "return quiz",
          content: `What is the output of this code?
\`\`\`python
def calc(a, b):
    return a * b

result = calc(4, 5)
print(result)
\`\`\``,
          options: ["9", "20", "45", "Error occurs"],
          answer: 1,
          explanation: "4 × 5 = 20 is returned and stored in result!"
        }
      ]
    },
    // ============================================
    // Chapter 5: Wrap-up & Project
    // ============================================
    {
      id: "ch5",
      title: "Wrap-up & Project",
      emoji: "🎉",
      steps: [
        {
          id: "ch5-1",
          type: "explain",
          title: "📚 Functions — full recap!",
          content: `@key: A **function** is a box for repeating code!

**How to make one:**
\`\`\`python
def function_name(parameter):
    code to run
    return result  # only when you need it
\`\`\`

**How to use it:**
\`\`\`python
function_name(value_to_pass)
\`\`\`

- \`def\` = start of the function definition
- \`( )\` holds the parameters
- Don't forget the \`:\`! Indentation is required!
- You have to **call** it to run it!`
        },
        {
          id: "ch5-2",
          type: "explain",
          title: "💭 Can I build a calculator with this?",
          content: `💭 Now that you know functions and return… could you build **your own calculator**?

\`\`\`python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(10, 5))       # 15
print(subtract(10, 5))  # 5
\`\`\`

@key: Give each function **one job** and you get a clean calculator!`
        },
        {
          id: "ch5-3",
          type: "interactive",
          title: "Fill in the blank: add function",
          description: "Complete the add function!",
          component: "fillInBlank",
          codeTemplate: "def add(a, b):\n    ___1___ a + b\n\nresult = ___2___\nprint(result)",
          blanks: [
            { id: "1", answer: "return", hint: "The keyword that sends a value back" },
            { id: "2", answer: "add(3, 5)", hint: "Call the function" }
          ],
          choices: ["return", "print", "add(3, 5)", "add"],
          expectedOutput: "8"
        },
        {
          id: "ch5-4",
          type: "mission",
          title: "Make a subtract function",
          task: "Fill in the blank so subtract returns the difference!",
          initialCode: `def subtract(a, b):
    return _____  # put a - b here

print(subtract(10, 3))  # should print 7
print(subtract(20, 8))  # should print 12`,
          expectedOutput: "7\n12",
          hint: "Write the expression that subtracts two numbers!",
          hint2: "The minus operator is -"
        },
        {
          id: "ch5-5",
          type: "interactive",
          title: "Fill in the blank: divide function",
          description: "Complete the divide function!",
          component: "fillInBlank",
          codeTemplate: "def divide(a, b):\n    ___1___ a / b\n\nresult = ___2___\nprint(result)",
          blanks: [
            { id: "1", answer: "return", hint: "The keyword that sends a value back" },
            { id: "2", answer: "divide(10, 2)", hint: "Call the function" }
          ],
          choices: ["return", "print", "divide(10, 2)", "divide"],
          expectedOutput: "5.0"
        },
        {
          id: "ch5-6",
          type: "mission",
          title: "🏆 Challenge: multiply calculator",
          task: "Complete the multiply function to finish the calculator!",
          initialCode: `# Finish the calculator!
def add(a, b):
    return a + b

def multiply(a, b):
    return _____  # put a * b here

print("3 + 5 =", add(3, 5))
print("3 * 5 =", multiply(3, 5))`,
          expectedOutput: "3 + 5 = 8\n3 * 5 = 15",
          hint: "Write the expression that multiplies two numbers!",
          hint2: "The multiply operator is *"
        },
        {
          id: "ch5-7",
          type: "quiz",
          title: "Final quiz!",
          content: "What is the biggest reason to use functions?",
          options: [
            "To make programs slower",
            "To reuse code and cut down on repetition",
            "To make file sizes bigger",
            "To cause more errors"
          ],
          answer: 1,
          explanation: "Functions let you reuse code and cut down on repetition — they make editing easier too!"
        }
      ]
    }
  ]
}
