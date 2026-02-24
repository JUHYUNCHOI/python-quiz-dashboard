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
          title: "📚 Let's Stack Some Books!",
          content: `What happens when you stack books?

\`\`\`
    [Book3] ← Last book placed
    [Book2]
    [Book1] ← First book placed
   ======
\`\`\`

**You have to remove Book3 (the last one placed) first!**

This is exactly what a **Stack** is!
- **LIFO**: Last In, First Out
- The last item added comes out first`
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
          title: "🏗️ Building a Stack with a Class",
          content: `You can also make it cleaner using a class:

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def peek(self):
        if not self.is_empty():
            return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Using the Stack Class!",
          task: "Try using the Stack class!",
          initialCode: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        return self.items.pop() if self.items else None\n    def peek(self):\n        return self.items[-1] if self.items else None\n    def is_empty(self):\n        return len(self.items) == 0\n\n# Usage\ns = Stack()\ns.push(\"A\")\ns.push(\"B\")\ns.push(\"C\")\nprint(\"peek:\", s.peek())\nprint(\"pop:\", s.pop())\nprint(\"pop:\", s.pop())",
          expectedOutput: "peek: C\npop: C\npop: B",
          hint: "peek() only looks, pop() also removes!",
          hint2: "C was added last, so it comes out first"
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
          title: "🖥️ Implement Parentheses Checker!",
          task: "Check whether parentheses are valid!",
          initialCode: "def check_parentheses(s):\n    stack = []\n    for char in s:\n        if char == '(':\n            stack.append(char)\n        elif char == ')':\n            if not stack:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\n# Test\nprint(check_parentheses(\"(())\"))   # True\nprint(check_parentheses(\"(()\"))    # False\nprint(check_parentheses(\"())\"))    # False\nprint(check_parentheses(\"()()\"))   # True",
          expectedOutput: "True\nFalse\nFalse\nTrue",
          hint: "Push when you see '(', pop when you see ')'",
          hint2: "If the stack is empty when you try to pop, return False"
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
          title: "🖥️ Reverse a String!",
          task: "Reverse a string using a stack!",
          initialCode: "def reverse_string(s):\n    stack = []\n    # Push all characters\n    for char in s:\n        stack.append(char)\n    \n    # Pop all to build result\n    result = \"\"\n    while stack:\n        result += stack.pop()\n    \n    return result\n\nprint(reverse_string(\"hello\"))\nprint(reverse_string(\"Python\"))\nprint(reverse_string(\"12345\"))",
          expectedOutput: "olleh\nnohtyP\n54321",
          hint: "Items pop in reverse order of how they were pushed!",
          hint2: "Of course s[::-1] is simpler, but this is to understand the stack concept!"
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
          title: "🏆 Final Mission: Browser Back Button!",
          task: "Implement browser history using a stack!",
          initialCode: "class Browser:\n    def __init__(self):\n        self.history = []\n        self.current = \"Home\"\n    \n    def visit(self, page):\n        self.history.___(self.current)\n        self.current = page\n        print(f\"Visit: {page}\")\n    \n    def back(self):\n        if self.history:\n            self.current = self.history.___()\n            print(f\"Back: {self.current}\")\n        else:\n            print(\"Cannot go back any further\")\n    \n    def show(self):\n        print(f\"Current page: {self.current}\")\n\n# Test\nbrowser = Browser()\nbrowser.visit(\"Google\")\nbrowser.visit(\"GitHub\")\nbrowser.visit(\"YouTube\")\nbrowser.show()\nbrowser.back()\nbrowser.back()\nbrowser.show()",
          expectedOutput: "Visit: Google\nVisit: GitHub\nVisit: YouTube\nCurrent page: YouTube\nBack: GitHub\nBack: Google\nCurrent page: Google",
          hint: "A stack uses append() to push and pop() to remove!",
          hint2: "Use append in visit and pop in back!"
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
