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
          content: `A **variable** is a **labeled box** that holds data.

\`\`\`python
name = 'Hero'
hp = 100
gold = 5000
\`\`\`

Pictured:

\`\`\`
┌──────────┐  ┌──────┐  ┌──────┐
│  'Hero'  │  │ 100  │  │ 5000 │
└──────────┘  └──────┘  └──────┘
   name         hp        gold
\`\`\`

- The box labeled \`name\` holds \`'Hero'\`
- The box labeled \`hp\` holds \`100\`
- The box labeled \`gold\` holds \`5000\`

> 💡 \`=\` is **NOT math's "equals"!** It means **put** the right-side value into the left-side box. We'll dig into this next in \`What Does = Actually Mean?\`.`
        },
        {
          id: "concept-builder",
          type: "interactive",
          title: "🎬 Build a Variable — Click Through!",
          description: "Click through to see how \`variable = value\` comes together, one piece at a time.",
          component: "pyVariableBuilder",
        },
        {
          id: "try-builder-followup",
          type: "tryit",
          title: "🖥️ Try It — Build the age Box",
          task: "Follow the syntax you just assembled — store 15 in age and print it!",
          initialCode: "age = 15\nprint(___)",
          expectedOutput: "15",
          hint: "To get the value out, just write the variable name (no quotes).",
          hint2: "age"
        },
        {
          id: "concept-why",
          type: "explain",
          title: "🤔 Why Do We Need Variables?",
          content: `Without variables:

\`\`\`python
print('Hero')
print("Hero's HP is 100")
print('Hero has 5000 gold')
\`\`\`

If the player's name becomes \`'Mage'\`, you'd have to edit \`'Hero'\` in **all three lines** 😩

With variables:

\`\`\`python
name = 'Hero'   # change just this one line
print(name)
print(name, "'s HP is 100")
print(name, 'has 5000 gold')
\`\`\`

→ Just swap \`name = 'Hero'\` for \`name = 'Mage'\` and you're done!`
        },
        {
          id: "concept-equals",
          type: "explain",
          title: "🧮 What Does \`=\` Actually Mean?",
          content: `> 📌 **Remember just one line!**
> \`=\` doesn't mean "equals" — it means **"put into the box on the left!"**

\`\`\`
x = 10
   ↑
   "put 10 into the box named x!"
\`\`\`

- Math: \`x = 10\` → "x equals 10"
- Python: \`x = 10\` → **"put 10 into x"**

Picture it as an arrow: \`10 → x\` 📥`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It — Store 15 in age and print",
          task: "Store 15 in the variable age and print it!",
          initialCode: "age = ___\nprint(age)",
          expectedOutput: "15",
          hint: "Use: variable_name = value. The blank takes a number.",
          hint2: "15"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — What does `=` mean in `x = 10`?",
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
          title: "📝 Taking Values Back Out",
          content: `You stored something in the box — now let's use it.

**Just write the variable name** and the value inside comes out.

\`\`\`python
price = 19000
print(price)
print(price + 2000)
\`\`\`

Predict what this prints in the next step 👇

> 💡 Even after \`print(price + 2000)\`, the **price box still holds the same value**. We pulled the value out and did math with it — we didn't change what's in the box.`
        },
        {
          id: "predict-use-price",
          type: "predict",
          title: "💭 Predict — price + 2000",
          content: `What does the second line, \`print(price + 2000)\`, output?

\`\`\`python
price = 19000
print(price)
print(price + 2000)
\`\`\``,
          options: ["19000", "20002000", "21000", "Error"],
          answer: 2,
          explanation: "Python pulls the value from the price box (19000) and adds 2000 → 21000. The box itself doesn't change — we just used the value."
        },
        {
          id: "use-explain-mistake",
          type: "explain",
          title: "🤔 What's the Difference — With or Without Quotes?",
          content: `\`\`\`python
print('price')
print(price)
\`\`\`

(\`price\` holds 19000 from the previous step.) How do the two outputs differ?

{output}
price
19000
{/output}

With quotes \`'\` → literal text. Variable name only (no quotes) → value in the box.

> 🎯 One line: **with quotes = letters, without quotes = value in the box.**`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It — Print chicken + 2000",
          task: "Store 19000 in chicken, then print chicken + 2000!",
          initialCode: "chicken = ___\nprint(chicken + 2000)",
          expectedOutput: "21000",
          hint: "21000 - 2000 = the value to put in chicken.",
          hint2: "19000"
        },
        {
          id: "label-explain",
          type: "explain",
          title: "🏷️ Printing Words and Variables Together",
          content: `Just printing a variable value can be confusing — what does it mean?

> 💡 Remember **lesson 1** where \`print('Result:', 100)\` printed multiple values with **commas (,)**? The same trick works for variables.

\`\`\`python
name = 'Alice'
age = 15
score = 95

print("Name:", name)          # Name: Alice
print("Age:", age)            # Age: 15
print("Score:", score, "pts") # Score: 95 pts
\`\`\`

Comma-separated values automatically get a **space** between them (same as in lesson 1).`
        },
        {
          id: "try_label1",
          type: "tryit",
          title: "🖥️ Try It — Print 'Name: Alice'",
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
          title: "🔄 Putting a New Value in the Same Box",
          content: `The value in the box can **change anytime**. Assign a new value to the same variable → the old value **disappears** and is overwritten.

> 💡 Grown-up books call this **"reassignment"**. Just remembering it as **"putting in a new value"** is plenty.

\`\`\`python
hp = 100
print(hp)

hp = 80    # took 20 damage from a monster!
print(hp)
\`\`\`

The first print gives 100 — what does the second one give?

{output}
100
80
{/output}

### Inside the box

\`\`\`
hp = 100        →   [ 100 ]
                       hp

hp = 80         →   [ 80 ]      ← 100 is overwritten and gone
                       hp
\`\`\`

> 💡 The **label \`hp\` stays the same**. Only the value inside changed.`
        },
        {
          id: "change-explain-self",
          type: "explain",
          title: "♻️ Adding to Yourself — `x = x + 3`",
          content: `\`x = x + 3\` looks weird (in math, \`x = x + 3\` → \`0 = 3\`?), but in Python it's natural.

\`\`\`python
score = 5
score = score + 3
print(score)
\`\`\`

Remember the order: **right side first** → **then store on the left**.

\`\`\`
Step 1 (compute right):  score + 3  →  5 + 3  →  ?
Step 2 (store):          score = ?
\`\`\`

Predict the result in the next step. 🎯 Then click through the two stages in the sim that follows.`
        },
        {
          id: "predict-self-update",
          type: "predict",
          title: "💭 Predict — score = score + 3",
          content: `\`score\` starts at 5. What does this code print?

\`\`\`python
score = 5
score = score + 3
print(score)
\`\`\``,
          options: ["5", "3", "8", "Error"],
          answer: 2,
          explanation: "Right side first: score + 3 = 5 + 3 = 8. Then store 8 back into score. print(score) → 8."
        },
        {
          id: "predict-no-var",
          type: "predict",
          title: "💭 Predict — A Variable You Never Made",
          content: `The variable \`money\` was **never created**. What happens when you try to print it?

\`\`\`python
print(money)
\`\`\``,
          options: [
            "Prints 0",
            "Prints the word money",
            "NameError (crash)",
            "Prints nothing"
          ],
          answer: 2,
          explanation: "Python looks for a box named 'money', but you never made one → NameError. Variables: **store first → then read.**"
        },
        {
          id: "change-explain-error",
          type: "explain",
          title: "💬 What Does Python Actually Say?",
          content: `As expected, you get an error.

\`\`\`python
print(money)   # ❌ no box named money was ever created
\`\`\`

### 💁 What Python is really saying (in plain English)

> "Wait — I can't find a box called \`money\`! You haven't made one yet?" 😵

The actual red text on screen:

\`\`\`
NameError: name 'money' is not defined
\`\`\`

→ \`NameError\` literally means "name error" = "no box with that name!"

> 🚨 See this red text? → **you used a variable you never created.** Make it first with \`money = 1000\`, then use it.

> 💡 Variables: **store first → then read.**`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It — Change score from 0 to 100",
          task: "Start score at 0, change it to 100, and print it!",
          initialCode: "score = 0\nscore = ___\nprint(score)",
          expectedOutput: "100",
          hint: "Assign a new value to overwrite. The blank takes a number.",
          hint2: "100"
        },
        {
          id: "x-update-visual",
          type: "interactive",
          title: "🎬 See x = x + 2 in Action",
          description: "Click through the tabs to see exactly how x changes — or doesn't!",
          component: "variableUpdateVisualizer",
        },
        {
          id: "try-self-update",
          type: "tryit",
          title: "🖥️ Try It — Add 3 to x and store back",
          task: "Same pattern you just saw! Start x at 5, add 3, store back into x, then print.",
          initialCode: "x = 5\nx = ___ + 3\nprint(x)",
          expectedOutput: "8",
          hint: "Right side first: 5 + 3 = 8. The blank takes a variable name (no quotes).",
          hint2: "x"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz — What is x after `x = x + 3`?",
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
          title: "📋 Variable Naming Rules — Just 4!",
          content: `### 1️⃣ **Letters, digits, \`_\` only**

- ✅ \`age\`, \`score_1\`, \`my_hp\`
- ❌ \`이름\` (non-English) / \`my hp\` (space) / \`my-hp\` (hyphen)

### 2️⃣ **First char must be a letter or \`_\`**

- ✅ \`name\`, \`_temp\`
- ❌ \`1name\` (starts with a digit)

### 3️⃣ **Python's special words are off-limits**

- ✅ \`my_if\`
- ❌ \`if\`, \`for\`, \`print\` (more on this next step)

### 4️⃣ **UPPER and lower are different letters**

- \`age\` and \`Age\` are **completely different boxes**
- Mix up the case by accident → different variable!

> 🎯 One-liner: **letters/digits/\`_\`, first char a letter or \`_\`.**`
        },
        {
          id: "rules-explain-chars",
          type: "explain",
          title: "🔤 Detail — Rules 1·2: Characters and First Char",
          content: `### Rule 1: allowed characters

\`\`\`python
# ✅ OK — only letters, digits, _
name = 'Alice'
player_hp = 100
score2 = 50

# ❌ NG
my-name = 'Lee'   # hyphen looks like the minus (-) sign you'll learn later
my name = 'Lee'   # space splits into two words
my@name = 'Lee'   # special chars like @ not allowed
\`\`\`

### Rule 2: first character

A digit can't lead. Python would be confused: "is this a variable or a number?"

\`\`\`python
2score = 50    # ❌
score2 = 50    # ✅ digit AFTER a letter is fine
_temp = 0      # ✅ leading _ is fine
\`\`\``
        },
        {
          id: "predict-bad-name",
          type: "predict",
          title: "💭 Which One is NOT a Valid Variable Name?",
          content: `They look similar, but Python will refuse one of them. Which?

\`\`\`python
score2 = 100     # A
2score = 100     # B
\`\`\``,
          options: [
            "Only A is bad",
            "Only B is bad",
            "Both are fine",
            "Both are bad"
          ],
          answer: 1,
          explanation: "B is bad! Variable names **can't start with a digit**. \`score2\` (digit at the end) is totally fine."
        },
        {
          id: "rules-explain-keywords",
          type: "explain",
          title: "🚫 Words Python Already Took + Case Matters",
          content: `### Words Python already grabbed for itself

A few words **Python keeps for its own jobs**. You can't use them as variable names.

\`\`\`python
if = 10        # ❌ if is one of Python's own words
for = 5        # ❌ so is for
\`\`\`

> 💡 There are only a few of these. **Don't memorize them** — you'll meet \`if\`, \`for\`, etc. naturally in later lessons by actually using them.

**For now:**
- Plain English words like \`print\` → OK as variable names
- Python's own words like \`if\` → ❌
- If you hit an error, that's when you'll learn "ah, can't use that one"

### UPPER / lower case

\`\`\`python
age = 15
print(Age)   # ❌ Error! Age was never created (capital A!)
\`\`\`

\`age\`, \`Age\`, \`AGE\` → to Python they're **all different boxes**. One capital letter changes the variable.`
        },
        {
          id: "rules-explain-style",
          type: "explain",
          title: "🐍 Joining Two Words Together",
          content: `Want to combine \`player\` and \`hp\` into one variable name? There are two shapes.

### 🐍 Underscore — \`player_hp\`

Connect words with \`_\`. **Python recommends this one!**
(Grown-ups call it *snake_case* — letters stretched out by \`_\` look like a snake.)

### 🐪 Middle Capital — \`playerHp\`

Capitalize the first letter of later words. **Common in other languages.**
(Grown-ups call it *camelCase* — the middle capital sticks up like a camel's hump.)

\`\`\`python
player_hp = 100   # ✅ underscore — Python style
playerHp = 100    # △ camel — works, but not common in Python
\`\`\`

### 💡 Use Meaningful Names

\`\`\`python
x = 100          # 😕 What is this?
player_hp = 100  # ✅ Player's health!

a = 5500
latte_price = 5500   # ✅ Still understandable a month later
\`\`\`

> 🎯 The computer treats \`x\` and \`player_hp\` the same. The convention is **for the human (you, a month from now)**.`
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz — Which is a valid variable name?",
          content: "Which is a valid variable name?",
          options: ["1st_place", "my-score", "player_name", "my name"],
          answer: 2,
          explanation: "player_name is correct! Underscores (_) are OK!"
        },
        {
          id: "quiz_naming",
          type: "quiz",
          title: "❓ Quiz — Which is the best variable name?",
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
          title: "🔗 Variables + Text — Comma Recap",
          content: `In this lesson, **the safest way to print variables is the comma (,)**. Let's lock it in.

\`\`\`python
name = 'Alice'
age = 15

print('Hello,', name)                # Hello, Alice
print('Name:', name, 'Age:', age)    # Name: Alice Age: 15
\`\`\`

### Why commas are great

| | Comma \`,\` |
|---|---|
| Space | **automatic** between values |
| Number var | works directly (no conversion!) |
| Mix text + numbers | totally free |`
        },
        {
          id: "predict-concat-mix",
          type: "predict",
          title: "💭 Predict — Mixing Text and Variables",
          content: `What does this code print? (Remember: commas auto-add one space.)

\`\`\`python
name = 'Alice'
hp = 100
print(name, "'s HP:", hp)
\`\`\``,
          options: [
            "Alice'sHP:100",
            "Alice 's HP: 100",
            "name 's HP: hp",
            "Alice, 's HP:, 100"
          ],
          answer: 1,
          explanation: "Comma-separated values get **one space between each**. name value → space → 's HP:' → space → hp value."
        },
        {
          id: "concat-explain-future",
          type: "explain",
          title: "💭 What If I Want No Space Between Them?",
          content: `\`\`\`
Name: Alice        ← comma (one space after colon)
Name:Alice         ← no space — possible?
\`\`\`

For now, commas are enough. **Gluing text and variable with no space** comes:

- **lesson 5** — string \`+\` concatenation
- **lesson 8** — f-string (the cleanest!)

Coming soon — hang tight 🙂

> 🎯 For now, just get comfortable **printing variables with a comma (,)**.`
        },
        {
          id: "try_concat",
          type: "tryit",
          title: "🖥️ Try It — Greeting!",
          task: "Use the name variable to print 'Hello, Alice' (use comma)",
          initialCode: "name = 'Alice'\nprint('Hello,', ___)",
          expectedOutput: "Hello, Alice",
          hint: "Put the variable name in the blank. No quotes.",
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
          hint: "Both blanks take variable names. No quotes.",
          hint2: "name / age"
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
          title: "💬 Comments — Notes Python Ignores",
          content: `A **comment** is a **note Python doesn't read**. It's there for humans only.

Anything after the \`#\` symbol on a line is skipped.

\`\`\`python
# This whole line is a comment — Python skips it
print('Hello!')  # End-of-line comments work too (only after the #)

# Often used to label variables
hp = 100       # starting health
score = 0      # starting score
\`\`\`

### Two positions

| Position | Example |
|---|---|
| **Whole line** | \`# Greet the user next\` |
| **End of line** | \`hp = 100  # starting health\` |`
        },
        {
          id: "comment-explain-why",
          type: "explain",
          title: "🤔 Why Comments + Watch-Out",
          content: `### Why bother with comments?

1. **Future-you** — "What does this do?" Comments answer it instantly
2. **Sharing with friends** — easier for others to read
3. **Temporarily disabling code (debugging)** — add \`#\` in front and it stops running

\`\`\`python
print('A')
# print('B')   ← skipped, won't run
print('C')
\`\`\`

Output: \`A\` and \`C\` (B is commented out)

### ⚠️ Watch out

\`\`\`python
print('#hello')   # → #hello (# inside quotes is NOT a comment!)
\`\`\`

A \`#\` inside quotes is **just a character**. Only \`#\` outside string quotes acts as a comment.`
        },
        {
          id: "comment-quiz",
          type: "quiz",
          title: "❓ Quiz — What's the comment symbol?",
          content: "Which symbol is used for comments in Python?",
          options: ["//", "#", "/* */", "--"],
          answer: 1,
          explanation: "Python uses # for comments! // is used in JavaScript and C++."
        },
        {
          id: "comment-tryit",
          type: "tryit",
          title: "🖥️ Try It — Add the comment symbol",
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
          title: "🏆 Final Mission — Build an About-Me Card",
          task: "Use 3 variables to build an introduction card! (Name: Alice, Age: 15, Hobby: gaming)",
          initialCode: "name = 'Alice'\nage = ___\nhobby = 'gaming'\n\n# Use a comma to chain text and variables in print\nprint('=== About Me ===')\nprint('Name:', name)\nprint('Age:', ___)\nprint('Hobby:', hobby)",
          expectedOutput: "=== About Me ===\nName: Alice\nAge: 15\nHobby: gaming",
          hint: "First blank takes the age value (a number), second takes the age variable (no quotes).",
          hint2: "15 / age"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Variable** = a **labeled box** that holds data
✅ Store with \`variable = value\` (\`=\` means "put into")
✅ Retrieve by using the variable name (no quotes!)
✅ **Putting a new value in** (reassignment) — assigning a new value overwrites the old (\`x = x + 3\` works)
✅ **Naming rules** — letters/digits/_, first char letter or _, no Python special words, underscore style (snake_case), meaningful names
✅ **Comments (\`#\`)** — notes Python ignores, also handy for debugging
✅ Print variables chained with \`,\` (auto space)

Next up: **operators** (\`+ - * / %\` etc.) for calculation and comparison! 🚀
(Gluing text and variable without space comes in lessons 5 and 8.)`
        }
      ]
    }
  ]
}
