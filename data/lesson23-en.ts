// ============================================
// Lesson 23: Stack - Advanced
// ============================================
import { LessonData } from './types'

export const lesson23EnData: LessonData = {
  id: "23",
  title: "Stack",
  emoji: "📚",
  description: "LIFO! The last item in is the first one out",
  chapters: [
    {
      id: "ch1",
      title: "What is a Stack?",
      emoji: "📚",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📚 A Stack Is Books Piled Up!",
          content: `Stack books one on top of another:

\`\`\`
    [Book3] ← Last book placed
    [Book2]
    [Book1] ← First book placed
   ======
\`\`\`

**You take Book3 off first.** You can't pull Book1 from the bottom (the pile falls!).

This is a **Stack**!
- **LIFO** = Last In, First Out
- The last item in comes out first`
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 Real-World Stacks",
          content: `**Examples of stacks:**

📚 **Stacking books** - Take from the top
🍽️ **Stacking plates** - Use the top plate first
⬅️ **Browser back button** - Goes to most recent page
↩️ **Ctrl+Z undo** - Undoes the most recent action
📱 **App back button** - Returns to previous screen

**Common theme**: The most recent item is processed first!`
        },
        {
          id: "operations",
          type: "explain",
          title: "⚙️ Stack Operations",
          content: `**2 Core Operations:**

**push** - Add to the top
\`\`\`
push(3):  [1,2] → [1,2,3]
\`\`\`

**pop** - Remove from the top
\`\`\`
pop():    [1,2,3] → [1,2] (returns 3)
\`\`\`

**Helper Operations:**
- **peek/top**: Check the top item (without removing)
- **isEmpty**: Check if the stack is empty
- **size**: Get the number of items`
        },
        {
          id: "try-ops",
          type: "tryit",
          title: "✋ Try the basic stack ops — push, pop, peek",
          task: "Push 1, 2, 3 onto a stack, then pop once, then print the new top!",
          initialCode: "stack = []\n# Add 1, 2, 3 to the top in order\nstack.___(1)\nstack.___(2)\nstack.___(3)\n\n# Remove the top one\nstack.___()\n\n# Print the value now sitting on top (use the last-element index)\nprint(stack[___])",
          expectedOutput: "2",
          hint: "Add with .append, remove with .pop. The last element is at index -1.",
          hint2: "append / append / append / pop / -1"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What does LIFO stand for?",
          options: [
            "First In, First Out",
            "Last In, First Out",
            "Last In, Last Out",
            "First In, Last Out"
          ],
          answer: 1,
          explanation: "LIFO = Last In, First Out! The last item added comes out first."
        },
        {
          id: "pred-lifo",
          type: "predict",
          title: "💭 Which one comes out first?",
          code: "stack = []\nstack.append('🍎')   # push\nstack.append('🍌')\nstack.append('🍇')\nprint(stack.pop())     # ?",
          options: ["🍎", "🍌", "🍇", "Error"],
          answer: 2,
          explanation: "LIFO! The last pushed (🍇) pops first. Apple is at the bottom — it comes out last."
        }
      ]
    },
    {
      id: "ch2",
      title: "Implementing in Python",
      emoji: "🐍",
      steps: [
        {
          id: "list-stack",
          type: "explain",
          title: "📋 Building a Stack with a List",
          content: `You can easily implement a stack using a Python list!

\`\`\`python
stack = []

# push - append()
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]

# pop - pop()
top = stack.pop()
print(top)    # 3
print(stack)  # [1, 2]

# peek - [-1]
print(stack[-1])  # 2 (not removed)
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Basic Stack Operations!",
          task: "Push 1, 2, 3 onto the stack and pop them one by one!",
          initialCode: "stack = []\n\n# push\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(\"After push:\", stack)\n\n# pop 3 times\nprint(\"pop:\", stack.pop())\nprint(\"pop:\", stack.pop())\nprint(\"pop:\", stack.pop())\nprint(\"Final:\", stack)",
          expectedOutput: "After push: [1, 2, 3]\npop: 3\npop: 2\npop: 1\nFinal: []",
          hint: "pop() removes and returns the last element!",
          hint2: "LIFO: Items come out in order 3 → 2 → 1"
        },
        {
          id: "class-stack",
          type: "explain",
          title: "🔎 peek — Look Without Removing",
          content: `**peek** = look at the top, but don't take it off.

\`\`\`python
stack = []
stack.append("A")
stack.append("B")
stack.append("C")

# peek — use [-1] to see the top
print(stack[-1])    # C (still on the stack)
print(stack[-1])    # C (looking again — still there)
print(stack)        # ['A', 'B', 'C']
\`\`\`

**Rules:**
- Look only: \`stack[-1]\`
- Take off: \`stack.pop()\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try it — peek vs pop",
          task: "Push A, B, C in order, then peek once and pop twice.",
          initialCode: "stack = []\n\nstack.append(\"A\")\nstack.append(\"B\")\nstack.append(\"C\")\n\n# peek — look at the top (use index ___)\nprint(\"peek:\", stack[___])\n\n# pop twice\nprint(\"pop:\", stack.___())\nprint(\"pop:\", stack.___())",
          expectedOutput: "peek: C\npop: C\npop: B",
          hint: "Peek with index -1, remove with .pop().",
          hint2: "-1 / pop / pop"
        }
      ]
    },
    {
      id: "ch3",
      title: "Stack Practice Problems",
      emoji: "🧩",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "🧩 Problem 1: Parentheses Checker",
          content: `**Problem**: Check if parentheses are properly matched!

\`\`\`
"(())"  → ✅ Valid
"(()"   → ❌ Missing closing parenthesis
"())"   → ❌ Missing opening parenthesis
\`\`\`

**Algorithm:**
1. Opening parenthesis '(' → push
2. Closing parenthesis ')' → pop
3. If stack is empty at the end → ✅`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try it — check one string of parentheses",
          task: "Use a stack to check if the parentheses in '(())' match up!",
          initialCode: "s = \"(())\"\nstack = []\nok = True\n\nfor char in s:\n    if char == '(':\n        stack.___(char)        # open → push\n    elif char == ')':\n        if not stack:\n            ok = False\n            break\n        stack.___()             # close → pop\n\n# Valid if stack is empty at the end\nif ok and len(stack) == 0:\n    print(\"True\")\nelse:\n    print(\"False\")",
          expectedOutput: "True",
          hint: "Push on '(', pop on ')'. Stack must be empty at the end to be valid.",
          hint2: "append / pop"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "🧩 Problem 2: Reverse a String",
          content: `**Reverse a string using a stack!**

\`\`\`python
# "hello" → "olleh"

1. Push in order: h→e→l→l→o
2. Pop in order:  o→l→l→e→h
\`\`\`

Reversing by leveraging the LIFO property!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try it — reverse 'hello' with a stack",
          task: "Push each letter of 'hello' onto a stack, then pop them all to build the reversed string!",
          initialCode: "s = \"hello\"\nstack = []\n\n# Push every character\nfor char in s:\n    stack.___(char)\n\n# Pop all and append into result\nresult = \"\"\nwhile stack:\n    result += stack.___()\n\nprint(result)",
          expectedOutput: "olleh",
          hint: "Add with .append, remove with .pop. LIFO reverses the order for free!",
          hint2: "append / pop"
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
          title: "🏆 Final Mission: Browser Back-Button Sim",
          task: "Simulate browser history using a stack (a list)! Fill in the blanks.",
          initialCode: "history = []           # the back stack\ncurrent = \"Home\"\n\n# Visit 1: Google\nhistory.___(current)   # push current page onto history\ncurrent = \"Google\"\nprint(\"Visit:\", current)\n\n# Visit 2: GitHub\nhistory.___(current)\ncurrent = \"GitHub\"\nprint(\"Visit:\", current)\n\n# Visit 3: YouTube\nhistory.___(current)\ncurrent = \"YouTube\"\nprint(\"Visit:\", current)\n\nprint(\"Current page:\", current)\n\n# Back twice — pop returns the most recent page\ncurrent = history.___()\nprint(\"Back:\", current)\ncurrent = history.___()\nprint(\"Back:\", current)\n\nprint(\"Current page:\", current)",
          expectedOutput: "Visit: Google\nVisit: GitHub\nVisit: YouTube\nCurrent page: YouTube\nBack: GitHub\nBack: Google\nCurrent page: Google",
          hint: "Visit = .append the current page. Back = .pop the most recent.",
          hint2: "append / append / append / pop / pop"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Stack** = LIFO (Last In, First Out)
✅ **push** = Add to the top
✅ **pop** = Remove from the top
✅ **Applications** = Parentheses checking, back button, undo

**Time Complexity:**
- push: O(1)
- pop: O(1)
- peek: O(1)

Next time we'll learn about **Queues**! 🚀`
        }
      ]
    }
  ]
}
