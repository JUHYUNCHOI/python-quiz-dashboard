// ============================================
// Lesson 3: Variables (English)
// ============================================
import { LessonData } from './types'

export const lesson3EnData: LessonData = {
  id: "3",
  title: "Variables",
  emoji: "📦",
  description: "Learn about variables — the boxes that store data!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Variable?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 Why Do We Need Variables in Games?",
          content: `Imagine you're making a game!

\`\`\`
Player name: Hero
Health: 100
Attack: 25
Gold: 5000
\`\`\`

Where do we store all this information?
We store it in **variables**! 📦`
        },
        {
          id: "concept",
          type: "explain",
          title: "📦 Variable = A Labeled Box",
          content: `A **variable** is a box that holds data!

\`\`\`python
name = 'Hero'
hp = 100
gold = 5000
\`\`\`

- Put 'Hero' into the box called \`name\`
- Put 100 into the box called \`hp\`
- Put 5000 into the box called \`gold\`!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Store 15 in the variable age and print it!",
          initialCode: "age = ___\nprint(age)",
          expectedOutput: "15",
          hint: "Store it using: variable_name = value",
          hint2: "age = 15\nprint(age)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What does `=` mean in `x = 10`?",
          options: [
            "x and 10 are equal",
            "Store 10 in x",
            "Divide x by 10",
            "It causes an error"
          ],
          answer: 1,
          explanation: "In programming, = means 'store' (assign a value)!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Using Variables",
      emoji: "🔧",
      steps: [
        {
          id: "use-explain",
          type: "explain",
          title: "📝 Using Variable Values",
          content: `You can retrieve a stored value by using the variable name!

\`\`\`python
price = 19000
print(price)        # 19000
print(price + 2000) # 21000
\`\`\`

When you use the variable name, the value inside comes out!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Store 19000 in chicken, then print chicken + 2000!",
          initialCode: "chicken = ___\nprint(chicken + 2000)",
          expectedOutput: "21000",
          hint: "Store the value in the variable, then calculate",
          hint2: "chicken = 19000\nprint(chicken + 2000)"
        },
        {
          id: "label-explain",
          type: "explain",
          title: "🏷️ Printing Text and Variables Together",
          content: `Just printing a variable value can be confusing — what does it mean?
Use a **comma (,)** to print a label and a variable together!

\`\`\`python
name = 'Alice'
age = 15
score = 95

print("Name:", name)          # Name: Alice
print("Age:", age)            # Age: 15
print("Score:", score, "pts") # Score: 95 pts
\`\`\`

Values separated by commas automatically get a **space** between them!`
        },
        {
          id: "try_label1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use a comma to print 'Name: Alice'!",
          initialCode: "name = 'Alice'\nprint(___, name)",
          expectedOutput: "Name: Alice",
          hint: "Put a text label before the comma",
          hint2: '"Name:"',
          choices: ['"Name:"', '"Age:"', '"Score:"', '"Hello:"']
        },
        {
          id: "try_label2",
          type: "tryit",
          title: "🖥️ Print Two Variables!",
          task: "Print name and age each with their label!",
          initialCode: "name = 'Alice'\nage = 15\nprint(\"Name:\", name)\nprint(___, age)",
          expectedOutput: "Name: Alice\nAge: 15",
          hint: "Add the 'Age:' label to the second line",
          hint2: '"Age:"',
          choices: ['"Age:"', '"Name:"', '"Score:"', '"age:"']
        },
        {
          id: "change-explain",
          type: "explain",
          title: "🔄 Changing Variable Values",
          content: `You can change a variable's value anytime!

\`\`\`python
hp = 100
print(hp)  # 100

hp = 80    # took damage!
print(hp)  # 80
\`\`\`

When you assign a new value to the same variable, it gets overwritten!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Start score at 0, change it to 100, and print it!",
          initialCode: "score = 0\nscore = ___\nprint(score)",
          expectedOutput: "100",
          hint: "Just assign a new value to the same variable",
          hint2: "score = 0\nscore = 100\nprint(score)"
        },
        {
          id: "x-update-visual",
          type: "interactive",
          title: "🎬 See x = x + 2 in Action",
          description: "Click through the tabs to see exactly how x changes — or doesn't!",
          component: "variableUpdateVisualizer",
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the value of x after `x = 5`, `x = x + 3`?",
          options: ["5", "3", "8", "Error"],
          answer: 2,
          explanation: "x = x + 3 takes the current value of x (5), adds 3, and stores it back in x!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Variable Naming Rules",
      emoji: "📋",
      steps: [
        {
          id: "rules-explain",
          type: "explain",
          title: "📋 Variable Naming Rules",
          content: `### ✅ Valid Names
\`\`\`python
name = 'Alice'
player_hp = 100
score2 = 50
\`\`\`

### ❌ Invalid Names
\`\`\`python
2score = 50    # Starts with a number ❌
my-name = 'Lee'  # Hyphen (-) ❌
my name = 'Lee'  # Space ❌
\`\`\`

### 🐍 snake_case — Python Convention
When using multiple words, connect them with **underscores (_)**!
\`\`\`python
player_name = 'Alice'  # ✅ Recommended (snake_case)
playerName = 'Alice'   # △ camelCase — not recommended in Python
\`\`\`

### 🚫 Reserved Keywords Can't Be Variable Names
\`\`\`python
if = 10    # ❌ — if is a Python keyword
for = 5    # ❌ — for is too
print = 3  # ❌ — avoid built-in names too!
\`\`\`

Python keywords: \`if\`, \`for\`, \`while\`, \`and\`, \`or\`, \`not\`, \`True\`, \`False\`, \`None\`

### 💡 Use Meaningful Names!
\`\`\`python
x = 100          # 😕 What is this?
player_hp = 100  # ✅ Oh, it's the player's health!
\`\`\``
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which is a valid variable name?",
          options: ["1st_place", "my-score", "player_name", "my name"],
          answer: 2,
          explanation: "player_name is correct! Underscores (_) are OK!"
        },
        {
          id: "quiz_naming",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which is the best variable name?",
          options: ["a", "n1", "student_score", "XVALUE"],
          answer: 2,
          explanation: "Meaningful names make code easier to read later! student_score is the clearest."
        },
        {
          id: "try_label3",
          type: "tryit",
          title: "🖥️ Print Three Things!",
          task: "Print name, score, and level each with their label!",
          initialCode: "name = 'Alice'\nscore = 95\nlevel = 3\nprint(\"Name:\", ___)\nprint(\"Score:\", ___)\nprint(\"Level:\", ___)",
          expectedOutput: "Name: Alice\nScore: 95\nLevel: 3",
          hint: "Fill each blank with the matching variable name",
          hint2: "name",
          choices: ["name", "score", "level", "age"]
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "🔗 Ways to Print Variables",
          content: `There are a few ways to print variables in Python!

### Method 1: Using commas (,)
\`\`\`python
name = 'Alice'
hp = 100
print("Name:", name)        # Name: Alice
print("HP:", hp, "HP")      # HP: 100 HP
\`\`\`
Commas automatically add a **space** between values.

---

### Method 2: String concatenation with +
\`\`\`python
name = 'Alice'
print("Hello, " + name + "!")  # Hello, Alice!
\`\`\`

⚠️ + only works between **strings**!
\`\`\`python
hp = 100
print("HP: " + hp)  # ❌ Error! Can't add a number directly
\`\`\``
        },
        {
          id: "try_concat",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use the name variable to print 'Hello, Alice!'",
          initialCode: "name = 'Alice'\nprint(\"Hello, \" + ___ + \"!\")",
          expectedOutput: "Hello, Alice!",
          hint: "Put the variable name in the blank",
          hint2: "name",
          choices: ["name", "'Alice'", "greeting", "age"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It — Print two variables together",
          task: "Use the name and age variables to print \"Alice 15\" on one line.",
          initialCode: "name = 'Alice'\nage = 15\n# Use a comma to print two values with a space between them\nprint(___, ___)",
          expectedOutput: "Alice 15",
          hint: "Separating values with a comma in print adds a space automatically.",
          hint2: "print(name, age)"
        }
      ]
    },
    {
      id: "ch_comments",
      title: "Comments",
      emoji: "💬",
      steps: [
        {
          id: "comment-explain",
          type: "explain",
          title: "💬 What Are Comments?",
          content: `**Comments** are notes that Python ignores!

Anything after the \`#\` symbol doesn't affect the program.

\`\`\`python
# This is a comment — Python skips it
print('Hello!')  # You can put comments at the end of a line too

# Use comments to explain your code:
hp = 100       # starting health
score = 0      # starting score
\`\`\`

### Why Use Comments?
- **Memory aid**: Come back later and instantly understand the code
- **Teamwork**: Help others understand your code
- **Debugging**: Temporarily disable a line by commenting it out`
        },
        {
          id: "comment-quiz",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which symbol is used for comments in Python?",
          options: ["//", "#", "/* */", "--"],
          answer: 1,
          explanation: "Python uses # for comments! // is used in JavaScript and C++."
        },
        {
          id: "comment-tryit",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Fill in the blank with the comment symbol!\nComments don't affect how the code runs.",
          initialCode: "___ code to print name and age\nname = 'Alice'\nage = 15\nprint(name)\nprint(age)",
          expectedOutput: "Alice\n15",
          hint: "Comments start with the # symbol",
          hint2: "#",
          choices: ["#", "//", "--", "/*"]
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
          title: "🏆 Final Mission!",
          task: "Use 3 variables to build an introduction card! (Name: Alice, Age: 15, Hobby: gaming)",
          initialCode: "name = 'Alice'\nage = ___\nhobby = 'gaming'\n\n# Use a comma to chain text and variables in print\nprint('=== About Me ===')\nprint('Name:', name)\nprint('Age:', ___)\nprint('Hobby:', hobby)",
          expectedOutput: "=== About Me ===\nName: Alice\nAge: 15\nHobby: gaming",
          hint: "Store 15 in age, then drop the age variable into the second print blank.",
          hint2: "age = 15 / age"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Variable** = A labeled box that holds data
✅ Store with \`variable = value\`
✅ Use the variable name to retrieve its value
✅ **Naming rules** — snake_case, no reserved words, use meaningful names
✅ **Comments** — add notes to code with \`#\`
✅ Print variables by chaining with \`,\`

Next up: **operators** for calculation and comparison! 🚀
(A neater way to print, \`f-string\`, is coming in lesson 8.)`
        }
      ]
    }
  ]
}
