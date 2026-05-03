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
          title: "🚶‍♂️ Think About Standing in Line!",
          content: `What happens when you stand in line at a bank?

\`\`\`
Entrance → [#1] [#2] [#3] → Exit
           First    Last
           arrival  arrival
\`\`\`

**The first person, #1, gets served first!**

This is exactly what a **Queue** is!
- **FIFO**: First In, First Out
- The first item added is the first one removed`
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
          title: "🏗️ Queue Class",
          content: `Building a clean class:

\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()

    def front(self):
        if not self.is_empty():
            return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Using the Queue Class!",
          task: "Test the Queue class!",
          initialCode: "from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, item):\n        self.items.append(item)\n    def dequeue(self):\n        return self.items.popleft() if self.items else None\n    def front(self):\n        return self.items[0] if self.items else None\n    def is_empty(self):\n        return len(self.items) == 0\n\n# Printer queue simulation\nprinter = Queue()\nprinter.enqueue(\"document1.pdf\")\nprinter.enqueue(\"photo.jpg\")\nprinter.enqueue(\"report.docx\")\n\nprint(\"Jobs waiting:\", printer.size())\nwhile not printer.is_empty():\n    print(\"Printing:\", printer.dequeue())",
          expectedOutput: "Jobs waiting: 3\nPrinting: document1.pdf\nPrinting: photo.jpg\nPrinting: report.docx",
          hint: "The first added file, document1.pdf, gets printed first!",
          hint2: "Loop with is_empty() until the queue is empty"
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
          id: "try3",
          type: "tryit",
          title: "🖥️ Solve the Josephus Problem!",
          task: "Solve the Josephus Problem using a queue!",
          initialCode: "from collections import deque\n\ndef josephus(n, k):\n    queue = deque(range(1, n + 1))\n    result = []\n    \n    while queue:\n        # Send k-1 people to the back\n        for _ in range(k - 1):\n            queue.append(queue.popleft())\n        # Eliminate the k-th person\n        result.append(queue.popleft())\n    \n    return result\n\nprint(\"Elimination order:\", josephus(7, 3))",
          expectedOutput: "Elimination order: [3, 6, 2, 7, 5, 1, 4]",
          hint: "Send k-1 people to the back, then eliminate the k-th!",
          hint2: "Simulate the circular structure with a queue"
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
          title: "🖥️ Card Shuffle!",
          task: "Find the last remaining card!",
          initialCode: "from collections import deque\n\ndef last_card(n):\n    cards = deque(range(1, n + 1))\n    \n    while len(cards) > 1:\n        # Discard the top card\n        discarded = cards.popleft()\n        print(f\"Discarded: {discarded}\")\n        # Move the next card to the bottom\n        cards.append(cards.popleft())\n    \n    return cards[0]\n\nprint(f\"Last card: {last_card(6)}\")",
          expectedOutput: "Discarded: 1\nDiscarded: 3\nDiscarded: 5\nDiscarded: 2\nDiscarded: 6\nLast card: 4",
          hint: "Use popleft() to discard, then popleft() + append() to move to the bottom!",
          hint2: "Loop while len(cards) > 1"
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
          title: "🏆 Final Mission: Call Center Simulation!",
          task: "Simulate a call center queue!",
          initialCode: "from collections import deque\n\nclass CallCenter:\n    def __init__(self):\n        self.queue = ___()\n        self.call_id = 0\n    \n    def receive_call(self, caller):\n        self.call_id += 1\n        self.queue.___(( self.call_id, caller))\n        print(f\"📞 Call received from {caller} (Ticket #{self.call_id})\")\n    \n    def handle_call(self):\n        if self.queue:\n            call_id, caller = self.queue.___()\n            print(f\"✅ Now assisting {caller} (Ticket #{call_id})\")\n        else:\n            print(\"No calls waiting\")\n    \n    def waiting_count(self):\n        return len(self.queue)\n\n# Simulation\ncall_center = CallCenter()\ncall_center.receive_call(\"Alice\")\ncall_center.receive_call(\"Bob\")\ncall_center.receive_call(\"Charlie\")\nprint(f\"\\nCallers waiting: {call_center.waiting_count()}\\n\")\ncall_center.handle_call()\ncall_center.handle_call()\nprint(f\"\\nCallers waiting: {call_center.waiting_count()}\")",
          expectedOutput: "📞 Call received from Alice (Ticket #1)\n📞 Call received from Bob (Ticket #2)\n📞 Call received from Charlie (Ticket #3)\n\nCallers waiting: 3\n\n✅ Now assisting Alice (Ticket #1)\n✅ Now assisting Bob (Ticket #2)\n\nCallers waiting: 1",
          hint: "Create the queue with deque(), add to the back and remove from the front!",
          hint2: "Fill in the blanks with: deque, append, popleft!"
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
