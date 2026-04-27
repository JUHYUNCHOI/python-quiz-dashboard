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
          title: "📦 stack — last in, first out",
          content: `Have you seen this kind of problem?

> "Check if the brackets are properly matched." \`(())\` ✅, \`(()\` ❌

How would you solve it? When an opening \`(\` appears, you remember it; when a closing \`)\` appears, you pair it with the **most recently remembered** \`(\`. "Most recent" is the key.

Or — \`Ctrl+Z\` (Undo) in a text editor. You undo the most recent action first. Again, "most recent."

Or — your browser's Back button. You return to the most recently visited page.

The pattern in all of these: **last thing in comes out first.** That's the **stack** data structure.

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [1, 2]      ← 3 comes out (the most recent)
top    → 2           ← peek at the top
\`\`\`

Think of stacking plates — new ones go on top (push), and you remove from the top (pop). This rule has a name: **LIFO (Last In First Out)**.

### How to use it in C++

\`\`\`cpp
#include <stack>
using namespace std;

stack<int> s;
s.push(10);
s.push(20);
s.push(30);

cout << s.top();  // 30 (top)
s.pop();          // removes 30 (returns nothing!)
cout << s.top();  // 20
\`\`\`

| Function | Meaning |
|---|---|
| \`s.push(x)\` | Add on top |
| \`s.top()\` | Peek at the top (doesn't remove) |
| \`s.pop()\` | Remove the top (**no return value!** ⚠️) |
| \`s.size()\` | Number of elements |
| \`s.empty()\` | True if empty |

> ⚠️ \`pop()\` not returning a value is the difference from Python. To use the value, peek with \`top()\` first, then \`pop()\`.

### Python uses lists as stacks

| Python 🐍 | C++ stack ⚡ |
|---|---|
| \`s.append(x)\` | \`s.push(x)\` |
| \`s.pop()\` → returns value | \`s.pop()\` → no return value |
| \`s[-1]\` | \`s.top()\` |

### "vector's push_back/pop_back already does this — why stack?"

Fair question. vector can do it. But \`stack\` makes the **intent obvious**. Anyone reading the code instantly knows "this is LIFO only," and you can't accidentally do \`v[3]\` on a mid-element. **It's a promise about how this container will be used.**`
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
          id: "ch1-stack-mini",
          type: "practice" as const,
          title: "✋ Quick — print numbers in reverse with a stack",
          content: `**Scenario**: You receive 5 numbers and want to print them in **reverse order** (last first).

\`\`\`
Input:  1 2 3 4 5
Output: 5 4 3 2 1
\`\`\`

stack's LIFO does this in one shot — push them all, then loop \`top\` + \`pop\` until empty.

> 💡 \`while (!s.empty()) { cout << s.top() << " "; s.pop(); }\` — this skeleton is the core.`,
          starterCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    stack<int> s;

    // 👇 push all of nums, then top + pop until empty (space-separated)


    return 0;
}`,
          code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    stack<int> s;

    for (int n : nums) s.push(n);
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }

    return 0;
}`,
          hint: "for (int n : nums) s.push(n); pushes all. while (!s.empty()) { cout << s.top() << \" \"; s.pop(); } pops them out in reverse.",
          expectedOutput: `5 4 3 2 1 `
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

**Queue function reference**

| Function | Syntax | Description |
|---|---|---|
| push | \`q.push(x)\` | Add to back |
| pop | \`q.pop()\` | Remove from front (no return value!) |
| front | \`q.front()\` | Check front value |
| back | \`q.back()\` | Check back value |
| size | \`q.size()\` | Number of elements |
| empty | \`q.empty()\` | Returns true if empty |

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
          id: "ch1-must-queue",
          type: "practice" as const,
          title: "🎯 When queue is **truly necessary** — line at the cafe",
          content: `queue's most natural use: "**process whoever arrived first**" — basically a real-world line. The same pattern is the heart of BFS and many bigger algorithms.

**Problem**: 5 customers arrive at a cafe in order (Alice, Bob, Carol, David, Eve). The barista processes them one at a time, printing "Now serving: name". Service must be **in arrival order**.

\`\`\`
Arrival: Alice → Bob → Carol → David → Eve

Expected output:
Now serving: Alice
Now serving: Bob
Now serving: Carol
Now serving: David
Now serving: Eve
\`\`\`

> 💡 With a stack, you'd serve Eve (the last to arrive) first — line-cutting! queue is the right tool. The pattern: \`while (!q.empty())\` + \`q.front()\` + \`q.pop()\`.`,
          starterCode: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> line;

    // Push in arrival order
    line.push("Alice");
    line.push("Bob");
    line.push("Carol");
    line.push("David");
    line.push("Eve");

    // 👇 While the queue is not empty: print front + pop
    //    Output format: "Now serving: Alice"


    return 0;
}`,
          code: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> line;

    line.push("Alice");
    line.push("Bob");
    line.push("Carol");
    line.push("David");
    line.push("Eve");

    while (!line.empty()) {
        cout << "Now serving: " << line.front() << endl;
        line.pop();
    }

    return 0;
}`,
          hint: "Pattern: while (!line.empty()) { cout << \"Now serving: \" << line.front() << endl; line.pop(); } — front() peeks, pop() removes. This skeleton powers BFS and every queue-based algorithm.",
          expectedOutput: `Now serving: Alice
Now serving: Bob
Now serving: Carol
Now serving: David
Now serving: Eve`
        },
        {
          id: "ch1-pred-parens",
          type: "predict" as const,
          title: "Unbalanced brackets prediction!",
          code: "// Example 1: \"(()\" → what's left in the stack?\n// Example 2: \"())\" → what's left in the stack?\n\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str = \"(()\";\n    stack<char> s;\n    bool valid = true;\n    for (char c : str) {\n        if (c == '(') s.push(c);\n        else if (c == ')') {\n            if (s.empty()) { valid = false; break; }\n            s.pop();\n        }\n    }\n    if (valid && s.empty()) cout << \"Valid\";\n    else cout << \"Invalid\";\n    return 0;\n}",
          options: ["Valid", "Invalid", "Error", "Nothing is printed"],
          answer: 1,
          explanation: "\"(()\" → Push 2 opening brackets, pop once for 1 closing bracket → '(' remains in the stack! It's unbalanced, so Invalid.\n\nFor \"())\" → Push '(', pop for ')' → stack is empty, then another ')' appears → stack is empty but trying to pop, so Invalid!\n\n• \"(()\" → Unbalanced! An opening bracket is left over\n• \"())\" → Unbalanced! A closing bracket is left over"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Bracket matching with a stack!",
          content: `Use a stack to write code that checks if the brackets in "(())" are valid!`,
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
          starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string str = "(())";
    stack<char> s;
    bool valid = true;

    // Loop through str one character at a time
    // - If '(': push to s
    // - If ')': if s is empty, set valid = false and break; otherwise pop

    if (valid && s.empty()) {
        cout << "Valid" << endl;
    } else {
        cout << "Invalid" << endl;
    }

    return 0;
}`,
          hint: "Use for(char c : str) to iterate. If c == '(', do s.push(c). If c == ')', check s.empty() first — if empty it's invalid, otherwise s.pop()",
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
          content: `Think about a hospital emergency room. It's not the patient who arrived first who gets treated first — it's the **most critical** patient! That's exactly what a priority_queue does!

A **priority_queue** automatically keeps the **largest value on top**! (max-heap)

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

**Why is C++ a max-heap by default?**
C++'s priority_queue has the **largest value come out first** (max-heap). Python's heapq has the smallest value come out first (min-heap).

Why the difference? C++ assumes 'higher priority = bigger number'. Want smallest first? Use \`priority_queue<int, vector<int>, greater<int>>\`!

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
          content: `Write code to extract and print the 3 largest values from a priority_queue!`,
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
          starterCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(40);
    pq.push(10);
    pq.push(50);
    pq.push(30);
    pq.push(20);

    // Loop 3 times: print pq.top() then pq.pop()

    cout << endl;

    return 0;
}`,
          hint: "Use for(int i = 0; i < 3; i++) — inside, cout << pq.top() << \" \" to print, then pq.pop() to remove it. top() alone doesn't remove the element!",
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
          id: "ch3-simulation",
          type: "explain",
          title: "🎮 LIFO vs FIFO — See the Difference!",
          content: `Let's push the same data into both a stack and a queue, then see how differently they come out!

**Push data in order: 1 → 2 → 3**

\`\`\`cpp
// push into stack
stack<int> s;
s.push(1); s.push(2); s.push(3);

// push into queue
queue<int> q;
q.push(1); q.push(2); q.push(3);
\`\`\`

**Stack internal state** (top is at the right):
\`\`\`
push 1 → [1]           top = 1
push 2 → [1, 2]        top = 2
push 3 → [1, 2, 3]     top = 3
\`\`\`

**Queue internal state** (flows left → right):
\`\`\`
push 1 → front [1] back
push 2 → front [1, 2] back
push 3 → front [1, 2, 3] back
\`\`\`

---

**Now pop everything out — what order do they come out in?**

\`\`\`cpp
// pop from stack
while (!s.empty()) {
    cout << s.top() << " ";
    s.pop();
}
// Output: 3 2 1  ← reversed! (LIFO)

// pop from queue
while (!q.empty()) {
    cout << q.front() << " ";
    q.pop();
}
// Output: 1 2 3  ← same order as inserted! (FIFO)
\`\`\`

**stack**: 3 → 2 → 1 (last in comes out first)
**queue**: 1 → 2 → 3 (first in comes out first)

---

**Real-world analogies**

| Data structure | Principle | Real-world example |
|---|---|---|
| stack (LIFO) | Last in → first out | Stacking plates, browser back button, undo |
| queue (FIFO) | First in → first out | Waiting in line, printer queue, message processing |
| deque | Insert/remove from both ends | Two-way line, card deck |
| priority_queue | Highest priority first | ER triage order, task scheduling |

💡 How these data structures are used in actual algorithms (graph traversal, shortest path, etc.) is covered in the **Algorithm Lab**!`
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Lesson 18 Complete!",
          content: `## 🏆 What we learned today!

### 📦 stack (LIFO — last in, first out)
- \`#include <stack>\`
- \`push(x)\` add, \`top()\` peek, \`pop()\` remove, \`empty()\`, \`size()\`

### 📦 queue (FIFO — first in, first out)
- \`#include <queue>\`
- \`push(x)\` add, \`front()\` peek front, \`back()\` peek back, \`pop()\` remove

### ⚡ deque (Double-Ended Queue)
- \`#include <deque>\`
- \`push_front()\`, \`push_back()\`, \`pop_front()\`, \`pop_back()\`
- Index access works! \`dq[i]\`

### ⚡ priority_queue (Heap)
- \`#include <queue>\`
- Default: **max-heap** (largest at top)
- Min-heap: \`priority_queue<int, vector<int>, greater<int>>\`

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
