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
          content: `Seen these in games?

- If HP is 0 → Game Over!
- If score ≥ 100 → Level Up!
- If you have an item → You can use it!

All of them follow the **"if ~ then ~"** shape. They're **forks in your code**.

\`\`\`
       ┌── (condition true)  → run this code
─ if ──┤
       └── (condition false) → skip
\`\`\`

The thing that builds this fork is the **conditional (if statement)**.`
        },
        {
          id: "syntax-explain",
          type: "explain",
          title: "📝 if Syntax — Two Rules",
          content: `\`\`\`python
if condition:
    code to run
\`\`\`

Python's \`if\` only needs **two rules**:

1. A **colon \`:\`** after the condition (miss it → SyntaxError)
2. The next line must be **indented 4 spaces**

\`\`\`python
score = 100
if score >= 100:
    print('Level up!')   ← indented 4 spaces
\`\`\`

> 💡 No indent? **\`IndentationError\`**! Other languages group blocks with \`{}\`, but in Python the indent itself IS the group.`
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
          title: "🖥️ Try It Yourself!",
          task: "If hp is 0, print 'Game Over!'!",
          initialCode: "hp = 0\n# If hp is 0, print 'Game Over!'\nif ___:\n    print('Game Over!')",
          expectedOutput: "Game Over!",
          hint: "Write a condition that checks if hp is 0!",
          hint2: "if hp == 0:"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
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
          title: "🖥️ Try It Yourself!",
          task: "If score is 60 or above, print 'Pass'; otherwise print 'Fail'!",
          initialCode: "score = 75\n# Write the condition that decides Pass vs Fail\nif ___:\n    print('Pass')\nelse:\n    print('Fail')",
          expectedOutput: "Pass",
          hint: "Write a condition that checks if score is 60 or above!",
          hint2: "if score >= 60:"
        },
        {
          id: "nested-sim",
          type: "explain",
          title: "🔍 Trace: Nested if (True path)",
          content: `See how nested if statements execute when **both conditions are True**!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyNestedIf",
        },
        {
          id: "nested-sim-false",
          type: "explain",
          title: "🔍 Trace: Nested if (False path)",
          content: `Now has_id is **False**! The outer if is True but the inner if is False — where does it go?

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyNestedIfFalse",
        },
        {
          id: "try-nested",
          type: "tryit",
          title: "🖥️ Try It Yourself — Nested if",
          task: "Print 'Admin Menu' only when both logged_in and is_admin are True!",
          initialCode: "logged_in = True\nis_admin = True\n# Both conditions must be True\nif ___:\n    if ___:\n        print('Admin Menu')",
          expectedOutput: "Admin Menu",
          hint: "Outer if checks first, then inner if checks!",
          hint2: "if logged_in:\n    if is_admin:"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
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
          title: "🔢 elif: Multiple Forks",
          content: `Got 3+ forks? Use **elif**!

> 💡 \`elif\` is short for \`else if\` — "if not that, then maybe this"

\`\`\`python
score = 85
if score >= 90:
    print('A')
elif score >= 80:   ← not 90? then 80?
    print('B')
elif score >= 70:
    print('C')
else:
    print('F')
\`\`\`

**Rule: top to bottom** check → run **only the first True branch** → skip the rest.

→ 85 isn't ≥ 90 but IS ≥ 80, so **'B'** prints and we're done!`
        },
        {
          id: "elif-sim",
          type: "explain",
          title: "🔍 Trace: score=85 → B (elif path)",
          content: `Follow the code line by line to see which branch gets executed when score=85!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTracePyIfElse",
        },
        {
          id: "elif-sim-false",
          type: "explain",
          title: "🔍 Trace: score=65 → C (else path)",
          content: `Now score=65! When ALL conditions are False, watch how the code falls through to else!

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
          title: "🖥️ Try It Yourself!",
          task: "Print the grade based on the score! (95 → A)",
          initialCode: "score = 95\nif score >= 90:\n    print('A')\n___:\n    print('B')\nelse:\n    print('C')",
          expectedOutput: "A",
          hint: "Write the condition for 80 or above using elif!",
          hint2: "elif score >= 80:"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
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
          task: "Print a status message based on the hero's HP! (hp=30 should show '⚠️ Danger!')\n\n• 0 or below → '💀 Game Over!'\n• 1~30 → '⚠️ Danger! Heal up!'\n• 31~70 → '🟢 OK'\n• Otherwise → '💪 Full health!'",
          initialCode: "hp = 30\nif hp <= 0:\n    print('💀 Game Over!')\nelif ___:\n    print('⚠️ Danger! Heal up!')\nelif ___:\n    print('🟢 OK')\nelse:\n    print('💪 Full health!')",
          expectedOutput: "⚠️ Danger! Heal up!",
          hint: "elif checks top-down — after hp <= 0, where does 'Danger' end?",
          hint2: "hp <= 30 / hp <= 70"
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
