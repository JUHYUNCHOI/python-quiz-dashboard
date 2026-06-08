// ============================================
// Lesson 25: Deque - Advanced
// ============================================
import { LessonData } from './types'

export const lesson25EnData: LessonData = {
  id: "25",
  title: "Deque",
  emoji: "\u21d4\ufe0f",
  description: "A data structure that supports insertion and removal from both ends",
  chapters: [
    {
      id: "ch1",
      title: "What is a Deque?",
      emoji: "\u21d4\ufe0f",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "\u21d4\ufe0f A Deque Works on Both Ends!",
          content: `Last time, a **queue** only let you add at one end and remove at the other (like a theme-park line — you join at the back and leave from the front). But real life has plenty of situations where you can *cut in at the front AND leave from the back*. That's exactly what a deque is for.

**Deque** = Double-Ended Queue ("a queue with **both ends** open").
You can add and remove from **both** ends!

\`\`\`
      <-  [A] [B] [C]  ->
    Front             Back
    add/remove       add/remove
\`\`\`

**Analogy: a tunnel open at both ends.** A queue is a one-way tunnel — one entrance, one exit. A deque has **both ends serving as entrance and exit**.
- Use only one end -> it acts like a **stack**
- Add at one end, remove at the other -> it acts like a **queue**
- Touch either end and it's **O(1)** fast!`
        },
        {
          id: "compare",
          type: "explain",
          title: "\ud83d\udcca Stack vs Queue vs Deque",
          content: `Stacks and queues are really structures with **one entrance deliberately blocked off**. A stack opens only one end so *the last item in comes out first*; a queue takes items in one end and out the other so *first in, first out*. Each one closes off a side on purpose to keep its rule simple.

| Data Structure | Front | Back |
|----------------|-------|------|
| **Stack** | \u274c | Add/Remove |
| **Queue** | Remove only | Add only |
| **Deque** | Add/Remove | Add/Remove |

Notice only the deque has all four cells **open**? A deque is the structure where *"the blocked entrances are all re-opened."* So you can add and remove freely at **both the front and the back**.

**Deque = The most flexible data structure!** Use one end and it's a stack; add at one end and remove at the other and it's a queue \u2014 so a single deque can **imitate both** a stack and a queue.

\`\`\`
Stack: Back only  ->  [   ]
Queue: Front<-Back -> [   ]
Deque: <- Both ->     [   ]
\`\`\`

> \ud83d\udca1 So why not just always use a deque? When both ends are open it's easy to lose track of *"which end did I add to again?"* If you **only need one end**, use a stack/queue with its clear rule, and reach for a deque **only when you truly need both ends**.`
        },
        {
          id: "realworld",
          type: "explain",
          title: "\ud83c\udf0d Real-World Deques",
          content: `Everything that suits a deque has one thing in common \u2014 you need to touch **both ends**. If you only touch one end, a stack or queue is enough; but the examples below need *both the front and the back*.

\ud83d\ude82 **Bidirectional train/subway** - People board and exit at car 1 (front) AND the last car (back). Doors open on both ends, so it's a deque.
\ud83c\udfae **Undo / Redo** - Pile the latest action on the back (append) and drop overly-old history from the front (popleft). You use both ends together.
\ud83d\udcc4 **Recent documents list** - A newly opened doc goes on the front (appendleft); when the list is full, the oldest one drops off the back (pop).
\ud83c\udfb5 **Music Player** - You move to the previous track (front) and the next track (back), so you need access from both sides.

**The same reasoning makes it show up in algorithms:**
- **Palindrome check** - To see if "level" reads the same both ways, you compare *the very first and very last character at the same time* -> remove from both ends.
- **Sliding window maximum** - Push new values onto the back (append) and drop stale values that left the window from the front (popleft) -> both ends.
- **BFS optimization** (0-1 BFS, etc.) - Put nearer nodes at the front, farther ones at the back to control priority.

> \ud83d\udca1 One-line test: *"Do I need to remove from the front AND add at the back?"* -> If yes, it's a deque.`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "\u2753 Quiz!",
          content: "What does Deque stand for?",
          options: [
            "Double Queue",
            "Double-Ended Queue",
            "Delete Queue",
            "Dynamic Queue"
          ],
          answer: 1,
          explanation: "Deque = Double-Ended Queue! A queue that is open on both ends."
        },
        {
          id: "pred-both-ends",
          type: "predict",
          title: "\ud83d\udcad Add to both ends \u2014 what's the order?",
          code: "from collections import deque\nd = deque([2, 3])\nd.appendleft(1)    # add to the left end\nd.append(4)        # add to the right end\nprint(list(d))",
          options: ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 3, 1, 4]", "[1, 4, 2, 3]"],
          answer: 0,
          explanation: "appendleft puts 1 on the left, append puts 4 on the right \u2192 [1, 2, 3, 4]. Deque supports O(1) add/remove on both ends."
        },
        {
          id: "try-rotate",
          type: "tryit",
          title: "\u270b Try it \u2014 handle both ends",
          task: "From a deque of [1, 2, 3, 4, 5], pop one from the left and one from the right, then print them.",
          initialCode: "from collections import deque\nd = deque([1, 2, 3, 4, 5])\n\n# Take one from the left end\nleft = d.___()\n# Take one from the right end\nright = d.___()\n\nprint(left, right)",
          expectedOutput: "1 5",
          hint: "Different methods for left vs right.",
          hint2: "popleft() / pop()"
        }
      ]
    },
    {
      id: "ch2",
      title: "Deque Operations",
      emoji: "\u2699\ufe0f",
      steps: [
        {
          id: "operations",
          type: "explain",
          title: "\u2699\ufe0f 4 Core Deque Operations",
          content: `The names are built to be easy to remember. The plain version handles the **back (right)**, and adding \`left\` to the name switches it to the **front (left)**. \`append\` adds, \`pop\` removes — just tack on \`left\` to flip the direction.

\`\`\`python
from collections import deque
d = deque()

# Add/remove from the back
d.append(x)      # Add to back
d.pop()          # Remove from back

# Add/remove from the front
d.appendleft(x)  # Add to front
d.popleft()      # Remove from front
\`\`\`

**Analogy: a straw (tunnel) open at both ends.** Imagine beads inside the straw. Both openings are open, so whether it's the left bead or the right bead, you can add or remove it **the instant you reach for it**.

**Why are all 4 O(1) (instant)?** A deque is built to *always remember where the very front and very back are*. So no matter which end you touch, it jumps straight "to that spot" — it never counts from the start of the line.

> 💡 The key difference from a list: touching the front of a list (\`insert(0, x)\`, \`pop(0)\`) forces *every element behind it to shift over one slot*, so it gets slower the longer the list (O(n)). A deque does no shifting when you touch the front, so it's **always O(1)** — when front operations are frequent, a deque is far faster.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "\ud83d\udda5\ufe0f Basic Deque Operations!",
          task: "Try all 4 deque operations!",
          initialCode: "from collections import deque\n\nd = deque([2, 3, 4])\nprint(\"Initial:\", list(d))\n\n# Add to back\nd.append(5)\nprint(\"append(5):\", list(d))\n\n# Add to front\nd.appendleft(1)\nprint(\"appendleft(1):\", list(d))\n\n# Remove from back\nd.pop()\nprint(\"pop():\", list(d))\n\n# Remove from front\nd.popleft()\nprint(\"popleft():\", list(d))",
          expectedOutput: "Initial: [2, 3, 4]\nappend(5): [2, 3, 4, 5]\nappendleft(1): [1, 2, 3, 4, 5]\npop(): [1, 2, 3, 4]\npopleft(): [2, 3, 4]",
          hint: "append/pop work on the back, appendleft/popleft work on the front!",
          hint2: "All operations run in O(1) time"
        },
        {
          id: "more-operations",
          type: "explain",
          title: "\ud83d\udd27 Additional Features",
          content: `A deque has two more handy features that use both ends. Both do *something tedious to do by hand* in a single line.

\`\`\`python
from collections import deque

d = deque([1, 2, 3, 4, 5])

# Rotate
d.rotate(2)   # Rotate right by 2
print(d)      # [4, 5, 1, 2, 3]

d.rotate(-2)  # Rotate left by 2
print(d)      # [1, 2, 3, 4, 5]

# Extend
d.extend([6, 7])       # Add multiple to back
d.extendleft([0, -1])  # Add multiple to front (reversed!)

# Maximum length limit
d = deque(maxlen=3)
d.extend([1, 2, 3, 4, 5])
print(d)  # [3, 4, 5] Only the most recent 3!
\`\`\`

**🔄 rotate — shift the whole thing around.** It takes items off one end and slips them onto the other, all at once. **When do you use it?** When you want to *move only the starting point* while keeping the order. For example, when a turn comes around in a game (\`rotate(-1)\` -> the next player moves to the front), or when rotating a circular arrangement (a round table). Doing it by hand means repeating "pop the back -> push the front" for every step; \`rotate(n)\` does it in one line.

**📏 maxlen — automatically keep only the most recent N.** Make it with \`deque(maxlen=3)\` and *the moment the length exceeds 3, the opposite end drops off on its own*. **When do you use it?** Whenever you only need to "remember the recent ones" — the last 10 chat messages, the last 5 game scores, a sensor's last 100 readings. You *don't* have to write \`if len > N: pop()\` yourself — the deque discards the old ones for you.

> 💡 The key to \`maxlen\`: on a full deque, \`append\` (add to back) drops the **front**, and \`appendleft\` (add to front) drops the **back**. In other words, *the side opposite to where you added* gets pushed out.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "\ud83d\udda5\ufe0f Rotate and maxlen!",
          task: "Test deque rotation and maximum length!",
          initialCode: "from collections import deque\n\n# Rotation test\nd = deque([1, 2, 3, 4, 5])\nprint(\"Original:\", list(d))\nd.rotate(2)\nprint(\"rotate(2):\", list(d))\nd.rotate(-2)\nprint(\"rotate(-2):\", list(d))\n\n# maxlen test - keep only the most recent 3\nrecent = deque(maxlen=3)\nfor i in range(1, 6):\n    recent.append(i)\n    print(f\"Add {i}: {list(recent)}\")",
          expectedOutput: "Original: [1, 2, 3, 4, 5]\nrotate(2): [4, 5, 1, 2, 3]\nrotate(-2): [1, 2, 3, 4, 5]\nAdd 1: [1]\nAdd 2: [1, 2]\nAdd 3: [1, 2, 3]\nAdd 4: [2, 3, 4]\nAdd 5: [3, 4, 5]",
          hint: "rotate(positive) goes right, rotate(negative) goes left!",
          hint2: "With maxlen=3, the oldest items are automatically removed"
        }
      ]
    },
    {
      id: "ch3",
      title: "Deque Practice Problems",
      emoji: "\ud83e\udde9",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "\ud83e\udde9 Problem 1: Palindrome Check",
          content: `**Palindrome**: A word that reads the same forwards and backwards (e.g. "level", "racecar")

**Why is a deque a perfect fit?** A palindrome check *pairs up the very first and very last character*, and if they match, narrows inward one layer at a time. That's exactly handling **both ends at once**. A deque pops the front character (\`popleft()\`) and the back character (\`pop()\`) both in O(1), so it expresses "squeeze inward from both ends" directly.

**Checking with a deque:**
1. Put the characters into a deque
2. Pop one from each end and compare (\`popleft()\` <-> \`pop()\`)
3. The moment a pair differs -> "not a palindrome"; if all match to the end, it's a palindrome!

\`\`\`
"level"
Front: l <-> Back: l \u2713   <- popleft()=l, pop()=l
Front: e <-> Back: e \u2713   <- popleft()=e, pop()=e
Middle: v (remains if odd length)
-> Palindrome!
\`\`\`

> \ud83d\udca1 Since you squeeze toward the middle, you stop once length drops to 1 or less (\`len(d) <= 1\`). For odd lengths a single middle character is left over, but it has nothing to compare against itself, so it just passes.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "\ud83d\udda5\ufe0f Try it \u2014 palindrome check for 'level'",
          task: "Put 'level' into a deque, pop one from each end and compare. True if it's a palindrome!",
          initialCode: "from collections import deque\n\nword = \"level\"\nd = deque(word)\nresult = True\n\nwhile len(d) > 1:\n    front = d.___()   # take from the front\n    back  = d.___()   # take from the back\n    if front != back:\n        result = False\n        break\n\nprint(result)",
          expectedOutput: "True",
          hint: "Front = popleft, back = pop. If the pair doesn't match, it's not a palindrome.",
          hint2: "popleft / pop"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "\ud83e\udde9 Problem 2: Sliding Window Maximum",
          content: `**Problem**: Move a window of size K and find the maximum at each position!

\`\`\`
Array: [1, 3, -1, -3, 5, 3, 6, 7], K=3

Window [1, 3, -1]  -> Max: 3
Window [3, -1, -3] -> Max: 3
Window [-1, -3, 5] -> Max: 5
...
\`\`\`

**Why is a deque a perfect fit?** Each time the window slides one step right, *a new value comes in at the right end and the stale value leaves from the left end*. Incoming goes on the back (append), outgoing leaves from the front (popleft) — exactly the deque's two-ended behavior.

There's one more clever twist. **When a new value larger than ones already inside arrives**, the smaller older values *can never be the maximum again*, so we drop them from the back (pop). This leaves the deque holding only candidates that get "bigger toward the front, smaller toward the back," so **the front is always the current window's maximum**.

**Optimized with a deque:**
- Keep only indices that could be the maximum in the deque (front = largest value)
- Front index that left the window: \`popleft\`; back index smaller than the new value: \`pop\`
- Each element enters and leaves the deque once, so the whole thing is **O(n)** — far faster than re-scanning for the max every time (O(nK))!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "\ud83d\udda5\ufe0f Try it \u2014 sliding window max (K=3)",
          task: "For [1, 3, -1, -3, 5, 3, 6, 7], print the max of every length-3 window!",
          initialCode: "from collections import deque\n\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nk = 3\nresult = []\nd = deque()   # store candidate indices\n\nfor i in range(len(nums)):\n    # Drop indices that fell out of the window (front)\n    if d and d[0] < i - k + 1:\n        d.___()\n    \n    # Drop smaller values from the back\n    while d and nums[d[-1]] < nums[i]:\n        d.___()\n    \n    d.append(i)\n    \n    # Once window is full, front = max\n    if i >= k - 1:\n        result.append(nums[d[0]])\n\nprint(\"Array:\", nums)\nprint(\"K=3 Max:\", result)",
          expectedOutput: "Array: [1, 3, -1, -3, 5, 3, 6, 7]\nK=3 Max: [3, 3, 5, 5, 6, 7]",
          hint: "Stale front index = popleft, smaller back index = pop.",
          hint2: "popleft / pop"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "\ud83c\udfc6",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "\ud83c\udfc6 Final Mission: Recent Searches (max 5)",
          task: "Use deque maxlen to keep only the 5 most recent searches. New search = add to the front. Duplicate = remove first, then re-add to the front.",
          initialCode: "from collections import deque\n\n# A deque that only keeps the 5 most recent\nsearches = deque(___=5)\n\n# 5 fresh searches \u2014 newest goes to the front\nfor q in [\"python\", \"data structures\", \"algorithms\", \"deque\", \"stack\"]:\n    if q in searches:\n        searches.remove(q)\n    searches.___(q)             # add to the front\n    print(f\"Search: '{q}'\")\nprint(\"Recent searches:\", list(searches))\n\n# New search 'queue' \u2014 oldest 'python' falls out automatically\nq = \"queue\"\nif q in searches:\n    searches.remove(q)\nsearches.appendleft(q)\nprint(f\"Search: '{q}'\")\nprint(\"Recent searches:\", list(searches))\n\n# Duplicate \u2014 'data structures' moves to the front\nq = \"data structures\"\nif q in searches:\n    searches.remove(q)\nsearches.appendleft(q)\nprint(f\"Search: '{q}'\")\nprint(\"Recent searches:\", list(searches))",
          expectedOutput: "Search: 'python'\nSearch: 'data structures'\nSearch: 'algorithms'\nSearch: 'deque'\nSearch: 'stack'\nRecent searches: ['stack', 'deque', 'algorithms', 'data structures', 'python']\nSearch: 'queue'\nRecent searches: ['queue', 'stack', 'deque', 'algorithms', 'data structures']\nSearch: 'data structures'\nRecent searches: ['data structures', 'queue', 'stack', 'deque', 'algorithms']",
          hint: "Max length = maxlen. Add to the front = appendleft.",
          hint2: "maxlen / appendleft"
        },
        {
          id: "complete",
          type: "explain",
          title: "\ud83c\udf89 Complete!",
          content: `## What We Learned Today

\u2705 **Deque** = Add/Remove from both ends
\u2705 **append/pop** = From the back
\u2705 **appendleft/popleft** = From the front
\u2705 **rotate** = Rotation
\u2705 **maxlen** = Maximum length limit

**Performance comparison:**
| Operation | List | Deque |
|-----------|------|-------|
| Back add/remove | O(1) | O(1) |
| Front add/remove | O(n) | O(1) |

Next time we'll learn about **comparing data structures**!`
        }
      ]
    }
  ]
}
