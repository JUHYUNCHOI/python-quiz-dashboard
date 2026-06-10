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

\`\`\`python
print("Happy birthday, Tom! Have a great day!")
print("Happy birthday, Jane! Have a great day!")
print("Happy birthday, Mike! Have a great day!")
# ... 7 more lines 😵
\`\`\`

You copied nearly identical lines 10 times. The problem isn't just that it's tedious — it's **dangerous**. Later you want to change "Happy birthday" to "Happy Bday"? You'd have to fix **all 10 lines**, and if you miss even one, that line keeps sending the old message. That's why copy-paste is a *mistake factory*.

The only thing that actually changes is **the name** — one spot. Everything else is the same every time. So wouldn't it be great to write the same part **just once**, and only swap in the name each time?

> 💡 The golden rule of programming: **don't write the same code twice.** If you're doing the same job over and over, that's a signal it's "time to box it up."

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

Think of a function as a **vending machine**. 🥤 You don't need to know *what happens inside* a vending machine. You press the **button (name)** and drop in a **coin (ingredient)** → out comes a drink. A function is the same. Build it well once, and from then on you just **call its name and drop in the ingredient**, and the code inside runs on its own.

\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}! Have a great day!")
\`\`\`

- **def** = "I'm going to define a box!" (define)
- **celebrate** = the name of the box (you'll call it by this name later)
- **name** = the ingredient that goes into the box (the changing part — the vending machine's coin slot!)
- The indented lines below are the **contents packed inside the box**

The \`name\` slot here is exactly the **"hole"** we were looking for back in ch1-1. The identical message goes inside the box just once, and only the name that changes each time gets dropped into this hole.

> 💡 \`def celebrate(name):\` only *builds* the box for now. You've placed the vending machine in the store, but you haven't pressed a button yet. To actually get a drink (the message) out, you need the **call** you'll learn in ch2.

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

\`def\` only **builds the vending machine and places it in the store.** Nobody has pressed a button yet, so of course no drink comes out. When Python sees \`def\`, it just **remembers** that this box exists — it does not run the code inside right away.

You have to **call** the function — that is, press the button — to run it:

\`\`\`python
celebrate("Tom")  # 👈 This is what actually runs it!
\`\`\`

Writing \`function_name(value)\` is the signal "use this box now!" Only then does the \`print\` inside run.

> 💡 \`def celebrate(...)\` is **writing down a recipe**; \`celebrate("Tom")\` is **actually cooking with that recipe**. No matter how well you write the recipe, if you never tell anyone to cook, no food appears.

@key: Defining isn't enough — you have to **call** it as \`function_name(value)\` to actually run the code.`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "💭 What happens when you call it?",
          content: `💭 When you write \`celebrate("Tom")\`… does \`"Tom"\` slot into the **name** spot?

Yes! The \`"Tom"\` you put in the parentheses drops into the vending machine's coin slot and **fills every \`name\` spot** inside the function with that value. That's why \`{name}\` comes out as \`Tom\`.

\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}!")

celebrate("Tom")    # → "Happy birthday, Tom!"
celebrate("Jane")   # → "Happy birthday, Jane!"
celebrate("Mike")   # → "Happy birthday, Mike!"
\`\`\`

You built the box **only once**, but every time you call it the code inside runs from the start again — just like a vending machine gives a fresh drink each time you drop a coin. This is the key to solving the "10 copy-pastes" problem from ch1-1: now there's just **one** \`print\` line, and you only **call** it 10 times!

> 💡 Same box, different ingredient → different result. \`celebrate("Tom")\` and \`celebrate("Jane")\` call the **same function**, but the ingredient differs so the result differs. That's how one function can serve hundreds of "customers."

@key: Each call runs the function's code again. Swap the name and call it as **many times** as you want!`
        },
        {
          id: "ch2-3",
          type: "explain",
          title: "💭 What if I want to change the message?",
          content: `💭 Want to change "Happy birthday!" to "Happy Bday!"? How different is **with vs without** a function?

Back in ch1-1 we called copy-paste a *mistake factory*. Now the real reason shows up. The moment you have to change the message, the gap between the two approaches blows wide open.

**Without a function:** edit all 10 lines 😵
\`\`\`python
print("Happy birthday, Tom!")
print("Happy birthday, Jane!")
print("Happy birthday, Mike!")
\`\`\`
You have to fix all 10 spots, and if you forget even one line, that one keeps the old message.

**With a function:** edit just the body! 😎
\`\`\`python
def celebrate(name):
    print(f"Happy birthday, {name}!")

celebrate("Tom")
celebrate("Jane")
celebrate("Mike")
\`\`\`
The \`print\` line lives in **just one place**, so fixing it there changes the message for all 100 people at once.

> 💡 Functions keep the "single source of truth" principle. Since the message lives in **exactly one place** (inside the function), there's one place to fix and almost nothing to get wrong. The longer your code gets, the bigger this difference becomes.

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

Picture the vending machine again. The \`name\` you write in the parentheses when building the function is the **coin slot**. It's reserving a spot in advance: *"I'll receive an ingredient right here."* And when you call \`celebrate("Tom")\`, the \`"Tom"\` is the **coin** you drop into that slot.

\`\`\`python
def celebrate(name):    # 👈 name = a parameter (the coin slot!)
    print(f"Happy birthday, {name}!")

celebrate("Tom")   # "Tom" goes into name
celebrate("Jane")  # "Jane" goes into name
\`\`\`

The moment you call it, \`"Tom"\` is *assigned* to the \`name\` slot. So when you write \`{name}\` inside the function, it becomes \`Tom\`. The next customer drops in \`"Jane"\`, and this time the same slot holds Jane.

> 💡 When you **define** a function, the \`name\` in the parentheses is "an empty spot waiting for an ingredient" (a parameter); when you **call** it, the \`"Tom"\` in the parentheses is "the actual ingredient you drop in" (the argument/value). Think of it as preparing an empty cup vs. actually pouring a drink into it.

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

Of course! Just make **several** coin slots. Reserve several spots in the parentheses, separated by commas, and you can receive that many ingredients.

\`\`\`python
def introduce(name, age):
    print(f"I'm {name}, {age} years old.")

introduce("Tom", 15)   # name=Tom, age=15
introduce("Jane", 14)  # name=Jane, age=14
\`\`\`

Here the **order really matters.** The first ingredient (\`"Tom"\`) goes into the first slot (\`name\`), the second (\`15\`) into the second slot (\`age\`) — they pair up *in the order you wrote them*. So if you flip the order with \`introduce(15, "Tom")\`, "Tom" lands in the age slot and things get weird.

> ⚠️ If a function has 2 parameters, you **must** pass exactly 2 when calling it. Passing just one, like \`introduce("Tom")\`, leaves the age slot empty → \`TypeError\`. The number of ingredients you agreed to receive and the number you actually drop in must always match.

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
    print(f"_____ please!")  # put the ordered food name in here

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

When you drop a coin into a vending machine, a **drink comes out.** You have to receive that drink in your hand before you can drink it or put it in your bag. A function is the same: once you've made it do a job, there has to be a way to **hand the result back to you.** That's exactly what \`return\` does.

\`\`\`python
def add(a, b):
    return a + b  # send the result back!

result = add(3, 5)   # 8 is stored in result
print(result)        # 8
\`\`\`

The moment it hits \`return a + b\`, the function computes \`a + b\` and **hands that value (8) back to where it was called.** So the spot where you wrote \`add(3, 5)\` turns into \`8\`, and \`result = 8\`. Now 8 lives in a variable, so you can print it, calculate with it, whatever you like.

> 💡 When a function hits \`return\`, it **ends right there.** Once the drink comes out, the vending machine's job is done. Any code below \`return\` won't run.

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

This is the **most confusing but most important** part of this lesson. Both look like they "put out a result," but *who* they put it out to is completely different.

- **print** shows the result **on the screen and that's it.** A human can see it, but the program can't reuse the value. (Like writing on a wall — you can read it, but you can't hold it.)
- **return** **hands the result back to the calling code.** It doesn't show on screen, but you can store it in a variable or use it in another calculation.

**print** = just shows it on the screen (does NOT save)
\`\`\`python
def hi():
    print("Hi!")

x = hi()      # "Hi!" gets printed
print(x)      # None (empty 😱)
\`\`\`
\`hi()\` has no \`return\`. So there's no value to hand back, and Python gives you \`None\`, meaning "empty-handed." That's what lands in \`x\`.

**return** = sends the value back (CAN save)
\`\`\`python
def add(a, b):
    return a + b

x = add(3, 5)
print(x)      # 8
print(x * 2)  # 16 — you can use it in calculations!
\`\`\`

> 💡 One line: **print shows it to a person; return hands it to the program.**
> Picture a function that calculates a score. With \`print\` only, the score *appears* on screen, but you can't rank it or average it — the value isn't kept anywhere. You have to \`return\` it to keep going with things like \`total = score1 + score2\`. That's why a *function that calculates* almost always uses \`return\`.

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
    return _____  # return n multiplied by itself

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

A calculator has a separate add button and subtract button. You build functions the same way — **one function per job.** Make an add machine and a subtract machine, then pick which one to call when you need it.

\`\`\`python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(10, 5))       # 15
print(subtract(10, 5))  # 5
\`\`\`

Since each function \`return\`s its result, you can hand that value straight to \`print\` to show it on screen. When one function does just one job — so if addition has a bug you only look at \`add\` — it becomes much easier to fix and to read.

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
    return _____  # return the difference of the two numbers

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
    return _____  # return the product of the two numbers

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
