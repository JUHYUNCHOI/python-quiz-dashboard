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
          content: `In games, when your HP hits 0 you see a Game Over screen, right?

"If HP is 0 → Game Over" is an **"if ~ then ~"** — that's a **fork in your code**.

The thing that builds this fork is what we'll learn today: the **conditional (if statement)**.`
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

> 💡 No indent? Python tells you "the indentation is wrong" (\`IndentationError\`).`
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
          content: `If you want to do something when the condition is false, use **else**!

\`\`\`python
age = 15

if age >= 18:
    print('You are an adult')
else:
    print('You are a minor')
\`\`\`

→ 15 is less than 18, so 'You are a minor' is printed!`
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
          content: `With just if / else, you have 2 forks. For **3 or more**, you need **elif**.

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
\`\`\``
        },
        {
          id: "elif-flow",
          type: "explain",
          title: "📐 How elif Runs",
          content: `Python checks **top to bottom** and runs **only the first True branch**, then skips the rest.

Example: \`score = 85\`
- \`score >= 90\` ? → no, skip
- \`score >= 80\` ? → yes! → **print 'B' and stop**
- The remaining elif / else are never even checked`
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
