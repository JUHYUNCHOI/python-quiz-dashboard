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
          content: `Stacks aren't some far-off idea. The features you use **every single day** are stacks. They all share one thing — *"you undo the most recent thing first"* (LIFO).

↩️ **Ctrl+Z undo** — While typing, hitting Ctrl+Z undoes your *most recent* action first — not something from 10 minutes ago, the *latest* one. The computer piles up your actions one by one, and when you undo, it takes the top (most recent) one off. That's exactly a stack!

⬅️ **Browser back button** — Say you went Google → Bing → YouTube. Hit back, and where do you land? On *Bing*, the page right before YouTube — not the first page (Google). The browser stacks up the pages you visited and pops the top one.

📚 **Stacking books · 🍽️ Stacking plates** — Pile books up and you take the top book off first. Same with a stack of restaurant plates — you grab the top one. Try to yank one from the bottom and the whole pile topples.

> 💡 Why is it always "most recent first"? Undo wants to reverse the *mistake you just made*, and back wants to return to the *page you just left*. The thing a person "wants to reverse" is almost always the *most recent* thing they did. That's why a stack's "last in, first out" shows up so often.`
        },
        {
          id: "operations",
          type: "explain",
          title: "⚙️ Stack Operations",
          content: `There are only two things you can do with a stack — and both happen **only at the top**. Picture a stack of plates: you add a plate at the top, and you grab one from the top.

**push — set one on top**
\`\`\`
push(3):  [1,2] → [1,2,3]
\`\`\`
Like *placing* a new plate on top of the pile.

**pop — take the top one off**
\`\`\`
pop():    [1,2,3] → [1,2] (hands back 3)
\`\`\`
Like *lifting off* the top plate. The plate you grabbed (3) gets handed back to you (returned).

**Why only the top?** Yank a plate from the *middle* and everything above comes crashing down, right? A stack is built the same way on purpose — you can *only* touch the top. Because of this "top only" rule, push and pop are super fast (O(1)) and the LIFO order keeps itself automatically.

**Helper Operations (nice to have):**
- **peek/top**: just *look* at what's on top — don't take it off
- **isEmpty**: check if the pile is empty
- **size**: count how many are stacked`
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
          content: `Good news — you don't need to learn a new tool for stacks. The **list** you already learned in lessons 16-17 *is* a stack!

The trick is to treat the *end (right side) of the list as "the top."* Two list methods you already know turn out to be exactly the stack operations.

\`\`\`python
stack = []

# push - append to the end = append()
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]   ← the end (3) is "the top"

# pop - remove from the end = pop()
top = stack.pop()
print(top)    # 3   ← the one at the end comes out
print(stack)  # [1, 2]

# peek - look at the end = [-1]
print(stack[-1])  # 2 (just looking, not removed)
\`\`\`

**Why treat the end as "the top"?** \`append()\` adds to the *end* of the list, and a plain \`pop()\` removes from the *end* too. Both touch the same side (the end), so whatever you \`append\` last is the first thing you \`pop\` → that's LIFO! If you made the *front* (index 0) the top instead, you'd have to shift every other element over by one each time — slow. That's why the end is the top.

> 💡 Recap: \`append()\` = push, \`pop()\` = pop, \`[-1]\` = peek. The *end* of the list is the *top* of the stack.`
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
          content: `**peek** = look at the top value, but don't take it off.

\`\`\`python
stack = []
stack.append("A")
stack.append("B")
stack.append("C")

# peek — use [-1] to see the top
print(stack[-1])    # C (still on the stack)
print(stack[-1])    # C (looking again — still there)
print(stack)        # ['A', 'B', 'C']  ← unchanged!
\`\`\`

**Why does peek deserve its own thing?** It's a situation we run into a lot — *"I want to check what's on top before deciding whether to take it."*

For example, in the parentheses checker (next chapter), when you hit a closing \`)\` you want to *confirm* "is the top really a matching opening \`(\`?" *before* removing it. If you \`pop()\` it off and it turns out to be wrong, putting it back is awkward. It's like reading a price tag *without* putting the item in your cart — looking and grabbing are two different actions.

**Rules:**
- Look only (peek): \`stack[-1]\` → the pile stays as-is
- Take off (pop): \`stack.pop()\` → the top disappears`
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

**Why a stack, of all things?** When you hit a closing \`)\`, the partner it needs to match is the *most recent still-unclosed opening parenthesis*. In \`"(())"\`, the second \`)\` matches the \`(\` right before it. "Close the most recently opened one first" — that's exactly LIFO! So if you stack up the opening parentheses, then each time you hit a closing one you just pop the top (most recent) and pair them off.

**Algorithm:**
1. Opening \`(\` → push (stack it up)
2. Closing \`)\` → pop (pair it with the most recent opening and clear it)
3. If the stack is empty at the end → everything matched ✅

> 💡 What if you hit a closing parenthesis but the stack is *empty*? That means there's no opening parenthesis to pair with → invalid (that's the last \`)\` in \`"())"\`). And if you reach the end but \`(\` is *still left* on the stack, something never got closed (\`"(()"\`).`
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

1. Push in order: h→e→l→l→o   (h at the bottom, o on top)
2. Pop in order:  o→l→l→e→h   (o comes off the top first)
\`\`\`

**Why does it come out reversed?** Push \`h, e, l, l, o\` in order, and the *first one pushed (h) ends up at the bottom*, while the *last one pushed (o) sits on top*. But you take them off top-first (LIFO), so \`o\` comes out first and \`h\` comes out last. The order in is the exact opposite of the order out → reversed for free!

It's just like stacking books up one at a time, then taking them off one at a time — the pile's order flips. You never gave a "reverse it" command; the stack's nature does the reversing for you. 🎁`
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
