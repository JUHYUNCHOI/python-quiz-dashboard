// ============================================
// Lesson 11: Conditionals (if)
// ============================================
import { LessonData } from './types'

export const lesson11EnData: LessonData = {
  id: "11",
  title: "Conditionals (if)",
  emoji: "🔀",
  description: "Learn how to run different code depending on conditions!",
  chapters: [
    {
      id: "ch1",
      title: "if Statement Basics",
      emoji: "❓",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 Building a Fork in the Road",
          content: `So far, every line of code we've written has run **top to bottom, no skipping** — a single straight path.

But real programs need to behave **differently** depending on the situation. In a game, when your HP hits 0 you see a Game Over screen; if you're still alive, you keep playing, right?

That's a **fork in the road**. When you're walking and hit a fork, you split off left or right depending on *some condition*.

\`\`\`
Is HP 0?
   ├─ yes → Game Over screen
   └─ no  → Keep playing
\`\`\`

"If HP is 0 → Game Over" — an **"if ~ then ~"** — is exactly that fork in your code. Building these forks is what we'll learn today: the **conditional (if statement)** — your program's first step toward *thinking and making decisions*.`
        },
        {
          id: "syntax-explain",
          type: "explain",
          title: "📝 if Syntax",
          content: `\`\`\`python
if condition:
    code to run
\`\`\`

Only two things to remember!

1. A **colon \`:\`** after the condition — miss it and you get a red squiggle!
2. Next line **indented 4 spaces**

\`\`\`python
score = 100
if score >= 100:
    print('Level up!')   ← indented 4 spaces
\`\`\`

**But why do we need the colon and the indentation?** They tell Python *"the code from here to here belongs inside the if."*

- The **colon \`:\`** is a start signal — *"okay, the stuff that belongs to this if begins now!"*
- The **indentation (4 spaces)** bundles those lines together: *"these lines are the if's *children*."* Just like indenting the text under a heading in an essay.

\`\`\`python
if score >= 100:
    print('Level up!')   ← indented → runs only when the if is true
print('Game continues')  ← not indented → always runs, condition or not
\`\`\`

Only the indented line is affected by the if; a line back at the left edge is *outside* the if and runs *every time*. Languages like C++ use \`{ }\` braces to group code, but Python groups it with **indentation itself**, which keeps code looking clean.

> 💡 No indent? Python tells you "the indentation is wrong" (\`IndentationError\`). Forgetting the colon is just as common — so make it a habit to type the \`:\` first at the end of an if line!`
        },
        {
          id: "syntax-builder",
          type: "explain",
          title: "🧱 Build an if Statement",
          content: `Watch an if statement get assembled piece by piece. Press **▶ Play** and follow along!`,
          component: "pyIfBuilder",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Fill the if Statement — Game Over if hp is 0",
          task: "If hp is 0, print 'Game Over!'!",
          initialCode: "hp = 0\n# If hp is 0, print 'Game Over!'\nif ___:\n    print('Game Over!')",
          expectedOutput: "Game Over!",
          hint: "Write a condition that checks if hp is 0!",
          hint2: "if hp == 0:"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz — 2 Things an if Needs",
          content: "What are the 2 essential things in an if statement?",
          options: ["Parentheses and semicolons", "Colon (:) and indentation", "Curly braces and colon", "Parentheses and indentation"],
          answer: 1,
          explanation: "Python if statements require a colon (:) and indentation!"
        }
      ]
    },
    {
      id: "ch2",
      title: "if-else",
      emoji: "↔️",
      steps: [
        {
          id: "else-explain",
          type: "explain",
          title: "↔️ if-else: One or the Other",
          content: `The \`if\` we saw earlier means *"if the condition is true, do this; otherwise do nothing."* But a fork in the road usually has **both paths**, doesn't it?

At a door, *"if you're an adult, let them in; otherwise turn them away"* — often you must do exactly **one of two** things. That's what **else** ("if not that") is for.

\`\`\`python
age = 15

if age >= 18:
    print('You are an adult')
else:
    print('You are a minor')
\`\`\`

→ 15 is less than 18, so 'You are a minor' is printed!

\`if\` and \`else\` are the **two branches of the fork**. If the condition is true, the \`if\` side runs; if false, the \`else\` side runs — **exactly one of them**, always. They never both run, and they're never both skipped.

> 💡 You don't write a condition on \`else\`. Just \`else:\` and you're done! It automatically handles *every remaining case* where the if condition was false.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Fill the if-else — Pass / Fail",
          task: "If score is 60 or above, print 'Pass'; otherwise print 'Fail'!",
          initialCode: "score = 75\n# Write the condition that decides Pass vs Fail\nif ___:\n    print('Pass')\nelse:\n    print('Fail')",
          expectedOutput: "Pass",
          hint: "Write a condition that checks if score is 60 or above!",
          hint2: "if score >= 60:"
        },
        {
          id: "nested-sim",
          type: "explain",
          title: "🔍 Trace — When Both Are True",
          content: `See how nested if statements execute when **both conditions are True**!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyNestedIf",
        },
        {
          id: "nested-sim-false",
          type: "explain",
          title: "🔍 Trace — When the Inner Condition Fails",
          content: `Now has_id is **False**! The outer if passed but the inner if doesn't — where does it go?

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyNestedIfFalse",
        },
        {
          id: "try-nested-outer",
          type: "tryit",
          title: "🖥️ Nested if Ladder 1 — Fill the Outer if Only",
          task: "The inner if is already filled in. Complete the outer if so we only reach the inner if when logged_in is True!",
          initialCode: "logged_in = True\nis_admin = True\n# Only fill the outer if\nif ___:\n    if is_admin:\n        print('Admin Menu')",
          expectedOutput: "Admin Menu",
          hint: "Just check if logged_in is True!",
          hint2: "if logged_in:"
        },
        {
          id: "pre-try-nested",
          type: "quiz",
          title: "❓ Decide — Checking two conditions at once",
          content: "**Like 'student AND has license → discount' — checking *both conditions* together. Which structure?**",
          options: ["if inside if (nested)", "Two separate if statements", "elif"],
          answer: 0,
          explanation: "Nested if checks the *outer condition* first, then the *inner one*. Similar to `and`, but easier to debug."
        },
        {
          id: "try-nested",
          type: "tryit",
          title: "🖥️ Nested if Ladder 2 — Fill Both",
          task: "Print 'Admin Menu' only when both logged_in and is_admin are True!",
          initialCode: "logged_in = True\nis_admin = True\n# Both conditions must be True\nif ___:\n    if ___:\n        print('Admin Menu')",
          expectedOutput: "Admin Menu",
          hint: "Outer if checks first, then inner if checks!",
          hint2: "if logged_in:\n    if is_admin:"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz — Predict the if-else Output",
          content: "What is the output?\n\n```python\nx = 5\nif x > 10:\n    print('A')\nelse:\n    print('B')\n```",
          options: ["A", "B", "AB", "Nothing is printed"],
          answer: 1,
          explanation: "5 > 10 is False, so 'B' from the else branch is printed!"
        }
      ]
    },
    {
      id: "ch3",
      title: "elif: Multiple Conditions",
      emoji: "🔢",
      steps: [
        {
          id: "elif-explain",
          type: "explain",
          title: "🔢 elif — When You Have 3+ Forks",
          content: `With just if / else, you have 2 forks. But grades split into A·B·C·F — **3 or more** branches, right? That's when you need **elif**.

\`elif\` is short for \`else if\` — "if not that, then maybe this".

\`\`\`python
if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('F')
\`\`\`

**Can't I just use several separate ifs?** — This is the key insight. If you write \`if\` statements separately, Python checks **every single one**. So with a score of 95:

\`\`\`python
if score >= 90:    # 95 >= 90 → true! prints 'A'
    print('A')
if score >= 80:    # 95 >= 80 → also true! prints 'B' too 😱
    print('B')
if score >= 70:    # 95 >= 70 → true again! prints 'C' too 😱😱
    print('C')
\`\`\`

→ You get \`A B C\` **all of them**! But we only wanted 'A'.

\`elif\` prevents exactly this. **Once an earlier condition is true, the elif branches below aren't even checked.** So only the first matching branch runs and it stops — exactly what we wanted.`
        },
        {
          id: "elif-flow",
          type: "explain",
          title: "📐 How elif Runs",
          content: `An if / elif / else group works like a **vending machine**. You insert a coin, it checks the buttons from the top, and at the *first matching slot* a drink comes out and it **stops right there** — it never even tries the buttons below.

Or think of a **checkpoint**: it inspects line by line from the top, runs **only the first branch that passes (is true)**, and skips all the rest.

Example: \`score = 85\`
- \`score >= 90\` ? → no, skip
- \`score >= 80\` ? → yes! → **print 'B' and stop**
- The remaining elif / else are never even checked

> 💡 That's why **order really matters**. If you put \`score >= 70\` at the very top, both 85 and 95 would get caught there first and print 'C'. The trick is to put the *narrowest (strictest) condition* on top and the *broadest one* at the bottom.`
        },
        {
          id: "elif-sim",
          type: "explain",
          title: "🔍 Trace — When score is 85",
          content: `Follow the code line by line to see which branch gets executed when score=85!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyIfElse",
        },
        {
          id: "elif-sim-false",
          type: "explain",
          title: "🔍 Trace — When score is 65",
          content: `Now score=65! When all earlier conditions are false, watch how the code falls through to else!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyIfElseLow",
        },
        {
          id: "predict-elif",
          type: "predict",
          title: "💭 If score=75, which branch?",
          content: "What does this code print?\n\n```python\nscore = 75\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('D')\n```",
          options: ["A", "B", "C", "D"],
          answer: 2,
          explanation: "75 is below 90 and below 80, but 70 or above! So the third elif is the first to be true → prints 'C'. elif checks each branch top-down and stops at the first True one."
        },
        {
          id: "pre-try3-elif",
          type: "quiz",
          title: "❓ Decide — How does the 'B' condition start?",
          content: "**Score >= 90 → 'A', >= 80 → 'B', otherwise 'C'. How does the *second line* (the 'B' condition) start?**",
          options: ["if (first condition)", "elif (another condition)", "else (the rest)", "for (a loop)"],
          answer: 1,
          explanation: "*Another condition* after the *first one* is `elif`. `else` is only for *everything that didn't match any condition*!"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Fill in elif — Print the Grade",
          task: "Print the grade based on the score! (95 → A)",
          initialCode: "score = 95\nif score >= 90:\n    print('A')\n___:\n    print('B')\nelse:\n    print('C')",
          expectedOutput: "A",
          hint: "Write the condition for 80 or above using elif!",
          hint2: "elif score >= 80:"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz — How Many elif Can You Use?",
          content: "How many elif statements can you use?",
          options: ["Only 1", "Up to 2", "Up to 5", "Unlimited"],
          answer: 3,
          explanation: "You can use as many elif statements as you need — unlimited!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "pre-mission1-elif",
          type: "quiz",
          title: "❓ Decide — How to write the 'hp <= 30' check?",
          content: "**hp <= 0 (dead), hp <= 30 (danger), hp <= 70 (ok), otherwise (healthy). How do you write the *second 'hp <= 30'* check?**",
          options: ["A fresh new if again", "elif — only what's left after the earlier check", "else (no condition)"],
          answer: 1,
          explanation: "elif only looks at *what's left after the earlier check filtered things out*. After 'hp <= 0' passes (so hp > 0), only then we ask hp <= 30 — so it automatically means *0 < hp <= 30*."
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission — RPG Health System!",
          task: "Print a status message based on hp. When hp=30, it should show '⚠️ Danger!'.\n\n| HP range | Output |\n|---|---|\n| 0 or below | 💀 Game Over! |\n| 1~30 | ⚠️ Danger! |\n| 31~70 | 🟢 OK |\n| 71 or more | 💪 Full health! |\n\nFill in the two elif blanks!",
          initialCode: "hp = 30\nif hp <= 0:\n    print('💀 Game Over!')\nelif ___:\n    print('⚠️ Danger! Heal up!')\nelif ___:\n    print('🟢 OK')\nelse:\n    print('💪 Full health!')",
          expectedOutput: "⚠️ Danger! Heal up!",
          hint: "Remember it checks top-down. hp <= 0 already got filtered, so the next elif only needs to cover up to 30.",
          hint2: "First blank: hp <= 30\nSecond blank: hp <= 70"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ \`if condition:\` - runs if the condition is true
✅ \`else:\` - runs if the condition is false
✅ \`elif condition:\` - checks multiple conditions
✅ **Indentation** is required!

Next time we'll learn **advanced conditionals**! 🔄`
        }
      ]
    }
  ]
}
