// ============================================
// Lesson 24: Queue - Advanced
// ============================================
import { LessonData } from './types'

export const lesson24EnData: LessonData = {
  id: "24",
  title: "Queue",
  emoji: "🚶‍♂️",
  description: "FIFO! The data structure where the first one in is the first one out",
  chapters: [
    {
      id: "ch1",
      title: "What Is a Queue?",
      emoji: "🚶‍♂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🚶‍♂️ A Queue Is a Line!",
          content: `Picture the line at a checkout:

\`\`\`
Entrance → [#1] [#2] [#3] → Exit
           First           Last
\`\`\`

**Person #1 (the earliest) is served first.** No cutting!

This is a **Queue**!
- **FIFO** = First In, First Out
- The first item in is the first one out`
        },
        {
          id: "compare",
          type: "explain",
          title: "📊 Stack vs Queue",
          content: `**Stack (LIFO)** - Last one first
\`\`\`
Insert: 1→2→3
Remove: 3→2→1  (reversed!)
\`\`\`

**Queue (FIFO)** - First one first
\`\`\`
Insert: 1→2→3
Remove: 1→2→3  (in order!)
\`\`\`

**Analogy:**
- Stack = Pringles can (only from the top)
- Queue = Tunnel (open on both ends)`
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 Queues in Real Life",
          content: `**Examples of queues:**

🚶 **Waiting in line** - First come, first served
🖨️ **Printer queue** - First request printed first
🎮 **Game matchmaking** - First to sign up, first to play
📦 **Package processing** - First received, first shipped
🎵 **Music playlist** - Plays in order

**Common theme**: Fair, sequential processing!`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "If you enqueue A→B→C into a queue, what is the dequeue order?",
          options: ["C→B→A", "A→B→C", "B→A→C", "Random"],
          answer: 1,
          explanation: "FIFO! The first item added, A, comes out first. A→B→C"
        },
        {
          id: "pred-fifo",
          type: "predict",
          title: "💭 Standing in line — who's first out?",
          code: "from collections import deque\nq = deque()\nq.append('🐶')   # enqueue\nq.append('🐱')\nq.append('🐰')\nprint(q.popleft())   # dequeue: ?",
          options: ["🐶", "🐱", "🐰", "Error"],
          answer: 0,
          explanation: "FIFO! 🐶 lined up first, so 🐶 leaves first. No cutting."
        },
        {
          id: "try-fifo",
          type: "tryit",
          title: "✋ Try it — handle customers via a queue",
          task: "Line up 3 customers (Alice, Bob, Carol) in a deque, then serve them in order — print the first two.",
          initialCode: "from collections import deque\nq = deque()\n\n# Add 3 customers to the back of the queue\nq.___('Alice')\nq.___('Bob')\nq.___('Carol')\n\n# Serve from the front — print twice\nprint(q.___())\nprint(q.___())",
          expectedOutput: "Alice\nBob",
          hint: "Add with .append, take from the front with .popleft (FIFO).",
          hint2: "append / append / append / popleft / popleft"
        }
      ]
    },
    {
      id: "ch2",
      title: "Implementing in Python",
      emoji: "🐍",
      steps: [
        {
          id: "operations",
          type: "explain",
          title: "⚙️ Queue Operations",
          content: `**Two core operations:**

**enqueue** - Add to the back
\`\`\`
enqueue(3): [1,2] → [1,2,3]
\`\`\`

**dequeue** - Remove from the front
\`\`\`
dequeue(): [1,2,3] → [2,3] (returns 1)
\`\`\`

**Helper operations:**
- **front**: Peek at the front item (without removing)
- **isEmpty**: Check if the queue is empty
- **size**: Get the number of items`
        },
        {
          id: "pred-list-slow",
          type: "predict",
          title: "💭 What if we used a list as a queue?",
          content: "Using a list as a queue:\n```python\nqueue = []\nqueue.append(item)   # add\nqueue.pop(0)         # remove from the front\n```\nWith 10,000 elements, how long does **one** \\`pop(0)\\` call take?",
          options: [
            "O(1) — instant",
            "O(log n) — fast",
            "O(n) — every other element shifts forward by one slot",
            "Lists can't do this"
          ],
          answer: 2,
          explanation: "pop(0) removes the front item, then **every other element shifts left by one** — that's O(n). Slow for queues! That's why deque exists (next page)."
        },
        {
          id: "deque-explain",
          type: "explain",
          title: "📦 Using collections.deque",
          content: `Using a list for a queue is **slow!**
\`\`\`python
# List - pop(0) is O(n), which is slow!
queue = []
queue.append(1)     # enqueue
queue.pop(0)        # dequeue - slow!
\`\`\`

**Using deque makes it fast!**
\`\`\`python
from collections import deque

queue = deque()
queue.append(1)     # enqueue - O(1)
queue.popleft()     # dequeue - O(1) fast!
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Build a Queue with deque!",
          task: "Implement a queue using deque!",
          initialCode: "from collections import deque\n\nqueue = deque()\n\n# enqueue\nqueue.append(\"Customer #1\")\nqueue.append(\"Customer #2\")\nqueue.append(\"Customer #3\")\nprint(\"Waiting list:\", list(queue))\n\n# dequeue\nprint(\"Serving:\", queue.popleft())\nprint(\"Serving:\", queue.popleft())\nprint(\"Remaining:\", list(queue))",
          expectedOutput: "Waiting list: ['Customer #1', 'Customer #2', 'Customer #3']\nServing: Customer #1\nServing: Customer #2\nRemaining: ['Customer #3']",
          hint: "Use append() to add to the back, popleft() to remove from the front!",
          hint2: "FIFO: Customer #1 comes out first"
        },
        {
          id: "class-queue",
          type: "explain",
          title: "🖨️ Printer Queue Simulation",
          content: `A printer queue is a classic queue!
Files print in the **order they were requested**.

\`\`\`python
from collections import deque

printer = deque()

# Request print jobs (enqueue at the back)
printer.append("document1.pdf")
printer.append("photo.jpg")
printer.append("report.docx")

print("Jobs waiting:", len(printer))

# Print one at a time until empty (dequeue from the front)
while printer:
    print("Printing:", printer.popleft())
\`\`\`

**document1.pdf came in first, so it prints first.**`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try it — process a printer queue",
          task: "Build the print queue with deque and print every job until the queue is empty!",
          initialCode: "from collections import deque\n\nprinter = deque()\n\n# Submit 3 jobs (add to the back)\nprinter.___(\"document1.pdf\")\nprinter.___(\"photo.jpg\")\nprinter.___(\"report.docx\")\n\nprint(\"Jobs waiting:\", len(printer))\n\n# Print one at a time until empty (remove from the front)\nwhile printer:\n    print(\"Printing:\", printer.___())",
          expectedOutput: "Jobs waiting: 3\nPrinting: document1.pdf\nPrinting: photo.jpg\nPrinting: report.docx",
          hint: "Add to the back with .append, take from the front with .popleft.",
          hint2: "append / append / append / popleft"
        }
      ]
    },
    {
      id: "ch3",
      title: "Queue Practice Problems",
      emoji: "🧩",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "🧩 Problem 1: Josephus Problem",
          content: `**Problem**: N people sit in a circle, and every K-th person is eliminated!

\`\`\`
N=7, K=3:
1 2 3 4 5 6 7 → remove 3
1 2 4 5 6 7 → remove 6
1 2 4 5 7 → remove 2
...
\`\`\`

**Solving with a queue:**
1. Dequeue K-1 people and re-enqueue them (send to back)
2. Dequeue the K-th person (eliminated)
3. Repeat`
        },
        {
          id: "pre-queue-vs-stack",
          type: "quiz",
          title: "❓ Decide — queue vs stack",
          content: "**Printer waiting line — 'whatever was sent first prints first'. Which structure?**",
          options: ["Stack (last in = first out = LIFO)", "Queue (first in = first out = FIFO)", "Either works"],
          answer: 1,
          explanation: "*First in = first out* = FIFO = *queue*. A stack (LIFO) would print the latest job first → unfair!"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try it — Josephus with N=7, K=3",
          task: "Simulate 7 people in a circle, eliminating every 3rd person using a queue!",
          initialCode: "from collections import deque\n\nn, k = 7, 3\nqueue = deque(range(1, n + 1))\nresult = []\n\nwhile queue:\n    # 1) Take k-1 people from the front and send them to the back (which method pair?)\n    for _ in range(k - 1):\n        queue.___(queue.___())\n    # 2) Eliminate the k-th person (which method?)\n    result.append(queue.___())\n\nprint(\"Elimination order:\", result)",
          expectedOutput: "Elimination order: [3, 6, 2, 7, 5, 1, 4]",
          hint: "The pair that takes from the *front* and adds to the *back*",
          hint2: "popleft + append"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "🧩 Problem 2: Card Shuffle",
          content: `**Problem**: Discard the top card, then move the next card to the bottom!

\`\`\`
[1,2,3,4] start
Discard: 1, move 2 to bottom → [3,4,2]
Discard: 3, move 4 to bottom → [2,4]
Discard: 2, move 4 to bottom → [4]
Last card: 4
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try it — find the last card from 6",
          task: "Start with cards [1, 2, 3, 4, 5, 6]. Discard the top, then move the next to the bottom. Which card is left?",
          initialCode: "from collections import deque\n\ncards = deque(range(1, 7))   # [1, 2, 3, 4, 5, 6]\n\nwhile len(cards) > 1:\n    # Discard the top card (front)\n    discarded = cards.___()\n    print(\"Discarded:\", discarded)\n    # Move the next card to the bottom (popleft, then append)\n    cards.___(cards.___())\n\nprint(\"Last card:\", cards[0])",
          expectedOutput: "Discarded: 1\nDiscarded: 3\nDiscarded: 5\nDiscarded: 2\nDiscarded: 6\nLast card: 4",
          hint: "Discard = popleft. Move to bottom = popleft value, then append.",
          hint2: "popleft / append / popleft"
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
          title: "🏆 Final Mission: Call Center Queue Sim",
          task: "Simulate a call center where 3 calls come in and the first 2 are handled, using deque!",
          initialCode: "from collections import deque\n\nqueue = ___()       # call queue\ncall_id = 0\n\n# Alice calls\ncall_id += 1\nqueue.___((call_id, \"Alice\"))\nprint(f\"📞 Call received from Alice (Ticket #{call_id})\")\n\n# Bob calls\ncall_id += 1\nqueue.___((call_id, \"Bob\"))\nprint(f\"📞 Call received from Bob (Ticket #{call_id})\")\n\n# Charlie calls\ncall_id += 1\nqueue.___((call_id, \"Charlie\"))\nprint(f\"📞 Call received from Charlie (Ticket #{call_id})\")\n\nprint(f\"\\nCallers waiting: {len(queue)}\\n\")\n\n# Handle the first two callers (front of queue)\nfor _ in range(2):\n    cid, caller = queue.___()\n    print(f\"✅ Now assisting {caller} (Ticket #{cid})\")\n\nprint(f\"\\nCallers waiting: {len(queue)}\")",
          expectedOutput: "📞 Call received from Alice (Ticket #1)\n📞 Call received from Bob (Ticket #2)\n📞 Call received from Charlie (Ticket #3)\n\nCallers waiting: 3\n\n✅ Now assisting Alice (Ticket #1)\n✅ Now assisting Bob (Ticket #2)\n\nCallers waiting: 1",
          hint: "Queue = deque(). Receive call = .append, handle call = .popleft (first-come, first-served).",
          hint2: "deque / append / append / append / popleft"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Queue** = FIFO (First In, First Out)
✅ **enqueue** = Add to the back (append)
✅ **dequeue** = Remove from the front (popleft)
✅ **deque** gives us O(1) performance!

**Stack vs Queue:**
| | Stack | Queue |
|------|------|------|
| Principle | LIFO | FIFO |
| Analogy | Pringles can | Waiting in line |
| Add | push (top) | enqueue (back) |
| Remove | pop (top) | dequeue (front) |

Next time we'll learn about **Deque (Double-Ended Queue)**! 🚀`
        }
      ]
    }
  ]
}
