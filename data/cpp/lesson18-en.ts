// ============================================
// C++ Lesson 18: stack, queue & deque
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson18EnData: LessonData = {
  id: "cpp-18",
  title: "stack, queue & deque",
  emoji: "📚",
  description: "STL container adapters and priority_queue!",
  chapters: [
    // ============================================
    // Chapter 1: stack & queue
    // ============================================
    {
      id: "ch1",
      title: "stack & queue",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 stack — Last In, First Out (LIFO)!",
          content: `A **stack** is like stacking plates — the **last one you put in comes out first**!

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [1, 2]      ← 3 comes out (the last one pushed!)
top    → 2           ← check the top value
\`\`\`

In C++, use \`#include <stack>\`:

\`\`\`cpp
#include <stack>
using namespace std;

stack<int> s;
s.push(10);      // add to top
s.push(20);
s.push(30);

cout << s.top();  // 30 (top value)
s.pop();          // removes 30 (no return value!)
cout << s.top();  // 20

cout << s.size();  // 2
cout << s.empty(); // 0 (false)
\`\`\`

Let's compare with Python:

**Python 🐍** — using a list as a stack:
\`\`\`python
s = []
s.append(10)    # push
s.append(20)
s.pop()         # returns 20 + removes it
s[-1]           # top (check last element)
\`\`\`

| Python 🐍 | C++ stack ⚡ |
|---|---|
| \`s.append(x)\` | \`s.push(x)\` |
| \`s.pop()\` → returns value | \`s.pop()\` → no return value! |
| \`s[-1]\` | \`s.top()\` |
| \`len(s)\` | \`s.size()\` |
| \`len(s) == 0\` | \`s.empty()\` |

💡 C++'s \`pop()\` does **NOT return** a value! First check the value with \`top()\`, then remove it with \`pop()\`.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Peek at the top of the stack!",
          code: "stack<int> s;\ns.push(5);\ns.push(10);\ncout << s.___();  // top value: 10",
          fillBlanks: [
            { id: 0, answer: "top", options: ["top", "front", "back", "peek"] }
          ],
          explanation: "Use top() to check the top value of a stack! front() is for queue, back() is for deque."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "stack push/pop result!",
          code: "#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    stack<int> s;\n    s.push(1);\n    s.push(2);\n    s.push(3);\n    s.pop();\n    s.pop();\n    cout << s.top();\n    return 0;\n}",
          options: ["1", "2", "3", "Error"],
          answer: 0,
          explanation: "push(1), push(2), push(3) gives [1,2,3]. pop() removes 3 → [1,2], pop() again removes 2 → [1]. top() returns 1!"
        },
        {
          id: "ch1-queue",
          type: "explain",
          title: "📦 queue — First In, First Out (FIFO)!",
          content: `A **queue** is like a line at a store — the **first one in comes out first**!

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [2, 3]      ← 1 comes out (the first one pushed!)
front  → 2           ← check the front value
\`\`\`

In C++, use \`#include <queue>\`:

\`\`\`cpp
#include <queue>
using namespace std;

queue<int> q;
q.push(10);       // add to back
q.push(20);
q.push(30);

cout << q.front(); // 10 (front element)
cout << q.back();  // 30 (back element)
q.pop();           // removes 10 (front removed!)
cout << q.front(); // 20
\`\`\`

Let's compare with Python:

**Python 🐍** — using \`collections.deque\` as a queue:
\`\`\`python
from collections import deque
q = deque()
q.append(10)      # push (add to back)
q.append(20)
q.popleft()       # returns 10 + removes (from front)
q[0]              # front
\`\`\`

| Python 🐍 | C++ queue ⚡ |
|---|---|
| \`q.append(x)\` | \`q.push(x)\` |
| \`q.popleft()\` → returns value | \`q.pop()\` → no return value! |
| \`q[0]\` | \`q.front()\` |
| \`q[-1]\` | \`q.back()\` |

💡 Queue is **essential for BFS (Breadth-First Search)**! You'll always need it for graph traversal.`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Check the front of the queue!",
          code: "queue<int> q;\nq.push(100);\nq.push(200);\ncout << q.___();  // front value: 100",
          fillBlanks: [
            { id: 0, answer: "front", options: ["front", "top", "back", "first"] }
          ],
          explanation: "Use front() to check the front value of a queue! top() is for stack, not queue."
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "queue push/pop result!",
          code: "#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    queue<int> q;\n    q.push(10);\n    q.push(20);\n    q.push(30);\n    q.pop();\n    cout << q.front();\n    return 0;\n}",
          options: ["10", "20", "30", "Error"],
          answer: 1,
          explanation: "push(10), push(20), push(30) gives [10,20,30]. pop() removes the front element 10 → [20,30]. front() returns 20!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Bracket matching with a stack!",
          content: `Check if the parentheses in "(())" are valid using a stack!

Push '(' when you see it, pop when you see ')'. If the stack is empty at the end, the brackets are valid!`,
          code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string str = "(())";
    stack<char> s;
    bool valid = true;

    for (char c : str) {
        if (c == '(') {
            s.push(c);
        } else if (c == ')') {
            if (s.empty()) {
                valid = false;
                break;
            }
            s.pop();
        }
    }

    if (valid && s.empty()) {
        cout << "Valid" << endl;
    } else {
        cout << "Invalid" << endl;
    }

    return 0;
}`,
          expectedOutput: "Valid"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "stack vs queue!",
          content: "Which statement about stack and queue is **correct**?",
          options: [
            "stack is FIFO, queue is LIFO",
            "stack is LIFO, queue is FIFO",
            "Both are FIFO",
            "Both are LIFO"
          ],
          answer: 1,
          explanation: "Stack is LIFO (Last In, First Out) — the last element pushed comes out first. Queue is FIFO (First In, First Out) — the first element pushed comes out first!"
        }
      ]
    },
    // ============================================
    // Chapter 2: deque & priority_queue
    // ============================================
    {
      id: "ch2",
      title: "deque & priority_queue",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ deque — Push & Pop from Both Ends!",
          content: `A **deque** (Double-Ended Queue) lets you push and pop from **both the front and back**!

\`\`\`cpp
#include <deque>
using namespace std;

deque<int> dq;

// Push/pop from back
dq.push_back(10);    // [10]
dq.push_back(20);    // [10, 20]

// Push/pop from front
dq.push_front(5);    // [5, 10, 20]

cout << dq.front();   // 5
cout << dq.back();    // 20

// Index access works too!
cout << dq[1];        // 10

dq.pop_front();       // [10, 20]
dq.pop_back();        // [10]
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
from collections import deque
dq = deque()
dq.append(10)       # push_back
dq.appendleft(5)    # push_front
dq.pop()            # pop_back
dq.popleft()        # pop_front
dq[1]               # index access
\`\`\`

| Python 🐍 | C++ deque ⚡ |
|---|---|
| \`dq.append(x)\` | \`dq.push_back(x)\` |
| \`dq.appendleft(x)\` | \`dq.push_front(x)\` |
| \`dq.pop()\` | \`dq.pop_back()\` |
| \`dq.popleft()\` | \`dq.pop_front()\` |
| \`dq[i]\` | \`dq[i]\` ← same! |

💡 deque has **all the features** of stack + queue! You can push/pop from both ends in O(1) and access by index.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Add a number to the front!",
          code: "deque<int> dq;\ndq.push_back(10);\ndq.push_back(20);\ndq.___(5);  // add 5 to front → [5, 10, 20]",
          fillBlanks: [
            { id: 0, answer: "push_front", options: ["push_front", "push_back", "insert", "add_front"] }
          ],
          explanation: "Use push_front() to add an element to the front of a deque! push_back() adds to the back."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "deque operation result!",
          code: "#include <iostream>\n#include <deque>\nusing namespace std;\nint main() {\n    deque<int> dq;\n    dq.push_back(1);\n    dq.push_back(2);\n    dq.push_front(3);\n    dq.pop_back();\n    cout << dq.front() << dq.back();\n    return 0;\n}",
          options: ["31", "12", "32", "21"],
          answer: 0,
          explanation: "push_back(1) → [1], push_back(2) → [1,2], push_front(3) → [3,1,2], pop_back() → [3,1]. front()=3, back()=1, so output is 31!"
        },
        {
          id: "ch2-pq",
          type: "explain",
          title: "⚡ priority_queue — Auto-Sorted!",
          content: `A **priority_queue** automatically keeps the **largest value on top**! (max-heap)

\`\`\`cpp
#include <queue>  // same header as queue!
using namespace std;

priority_queue<int> pq;
pq.push(30);
pq.push(10);
pq.push(50);
pq.push(20);

cout << pq.top();  // 50 (largest value!)
pq.pop();          // removes 50
cout << pq.top();  // 30
\`\`\`

Let's compare with Python:

**Python 🐍** — \`heapq\` (min-heap!):
\`\`\`python
import heapq
pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 50)
heapq.heappop(pq)  # 10 (smallest value!)
\`\`\`

| Python heapq 🐍 | C++ priority_queue ⚡ |
|---|---|
| **min-heap** (smallest first) | **max-heap** (largest first) |
| \`heappush(pq, x)\` | \`pq.push(x)\` |
| \`heappop(pq)\` → returns value | \`pq.pop()\` → no return value! |
| \`pq[0]\` | \`pq.top()\` |

**Want a min-heap instead?**
\`\`\`cpp
// Use greater<int> for min-heap!
priority_queue<int, vector<int>, greater<int>> minPQ;
minPQ.push(30);
minPQ.push(10);
minPQ.push(50);
cout << minPQ.top();  // 10 (smallest value!)
\`\`\`

💡 C++ defaults to **max-heap**, Python defaults to **min-heap**! Don't mix them up!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "priority_queue result!",
          code: "#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    priority_queue<int> pq;\n    pq.push(5);\n    pq.push(15);\n    pq.push(10);\n    pq.pop();\n    cout << pq.top();\n    return 0;\n}",
          options: ["5", "10", "15", "Error"],
          answer: 1,
          explanation: "push(5), push(15), push(10) → max-heap, so top is 15. pop() removes 15. The next largest value is 10! top() returns 10."
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚡ Container Comparison Chart!",
          content: `## When to use what? Quick comparison!

| Container | Structure | Push/Pop | Access | When to use? |
|---|---|---|---|---|
| **vector** | Dynamic array | Back O(1) | Index O(1) | Most situations |
| **stack** | LIFO | Top only | top() only | Undo, bracket matching |
| **queue** | FIFO | Back push, front pop | front()/back() | BFS, waiting lines |
| **deque** | Double-ended | Both ends O(1) | Index O(1) | Need both ends |
| **priority_queue** | Heap | push O(log n) | top() only | Quick max/min |

**Key takeaways:**
- **Process in order** → queue (BFS!)
- **Undo/reverse** → stack (bracket matching, undo)
- **Both ends** → deque (sliding window)
- **Quick max/min** → priority_queue (Dijkstra, scheduling)

\`\`\`
stack:          [1, 2, 3] → pop → 3 (LIFO)
queue:          [1, 2, 3] → pop → 1 (FIFO)
priority_queue: [3, 1, 2] → pop → 3 (max value!)
deque:          [1, 2, 3] → both ends available!
\`\`\`

💡 This comes up in interviews too! When asked "What data structure would you use for this problem?" — think of this chart!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Print top 3 values with priority_queue!",
          content: `Push 5 numbers into a priority_queue and print the 3 largest in order!

Since priority_queue automatically puts the largest on top, just repeat top() and pop().`,
          code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(40);
    pq.push(10);
    pq.push(50);
    pq.push(30);
    pq.push(20);

    // Print top 3 values
    for (int i = 0; i < 3; i++) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;

    return 0;
}`,
          expectedOutput: "50 40 30 "
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "priority_queue behavior!",
          content: "What is the **default** behavior of C++ `priority_queue<int>`?",
          options: [
            "The smallest value is at top()",
            "Elements come out in insertion order",
            "The largest value is at top()",
            "Elements come out in random order"
          ],
          answer: 2,
          explanation: "C++ priority_queue is a max-heap by default! The largest value is at top(). To make it a min-heap, pass greater<int> as the third template argument."
        }
      ]
    },
    // ============================================
    // Chapter 3: Review Quiz
    // ============================================
    {
      id: "ch3",
      title: "Review Quiz",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "stack LIFO!",
          content: `What's the output?

\`\`\`cpp
stack<int> s;
s.push(10);
s.push(20);
s.push(30);
s.pop();
s.push(40);
cout << s.top();
\`\`\``,
          options: [
            "10",
            "20",
            "30",
            "40"
          ],
          answer: 3,
          explanation: "push(10,20,30) → [10,20,30]. pop() → removes 30 → [10,20]. push(40) → [10,20,40]. top() is 40!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "queue FIFO!",
          content: `What's the output?

\`\`\`cpp
queue<int> q;
q.push(1);
q.push(2);
q.push(3);
q.pop();
q.pop();
cout << q.front();
\`\`\``,
          options: [
            "1",
            "2",
            "3",
            "Error"
          ],
          answer: 2,
          explanation: "push(1,2,3) → [1,2,3]. pop() removes 1 → [2,3]. pop() removes 2 → [3]. front() is 3! FIFO removes from the front."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "deque features!",
          content: "Which statement about deque is **incorrect**?",
          options: [
            "You can push/pop from both front and back",
            "You can access elements by index",
            "It has push_front() and push_back()",
            "You use top() to check the top value"
          ],
          answer: 3,
          explanation: "top() is for stack and priority_queue! deque uses front() and back() to check values at both ends. It also supports index access and push/pop from both sides."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "priority_queue default order!",
          content: `What's the output?

\`\`\`cpp
priority_queue<int> pq;
pq.push(3);
pq.push(1);
pq.push(4);
pq.push(1);
pq.push(5);
cout << pq.top();
\`\`\``,
          options: [
            "1",
            "3",
            "4",
            "5"
          ],
          answer: 3,
          explanation: "priority_queue is a max-heap by default! Among 3,1,4,1,5 the largest value 5 goes to top()."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Lesson 18 Complete!",
          content: `## 🏆 What we learned today!

### 📦 stack (LIFO)
- \`#include <stack>\`
- \`push()\`, \`pop()\`, \`top()\`, \`empty()\`, \`size()\`
- Use cases: bracket matching, undo, DFS

### 📦 queue (FIFO)
- \`#include <queue>\`
- \`push()\`, \`pop()\`, \`front()\`, \`back()\`
- Use cases: BFS, waiting lines

### ⚡ deque (Double-Ended Queue)
- \`#include <deque>\`
- \`push_front()\`, \`push_back()\`, \`pop_front()\`, \`pop_back()\`
- Index access works! \`dq[i]\`
- Use cases: sliding window, when you need both ends

### ⚡ priority_queue (Heap)
- \`#include <queue>\`
- Default: **max-heap** (largest at top)
- Min-heap: \`priority_queue<int, vector<int>, greater<int>>\`
- Use cases: quick max/min lookup, Dijkstra

| Data Structure | Access Function | Pop Location |
|---|---|---|
| stack | \`top()\` | Top (last in) |
| queue | \`front()\`/\`back()\` | Front (first in) |
| deque | \`front()\`/\`back()\`/\`[i]\` | Front or back |
| priority_queue | \`top()\` | Max value |

🚀 **Next lesson preview:** File I/O & Fast I/O! We'll learn \`ifstream\`, \`ofstream\`, and the fast I/O tricks used in competitive programming!`
        }
      ]
    }
  ]
}
