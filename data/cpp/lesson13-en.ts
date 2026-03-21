// ============================================
// C++ Lesson 13: Recursion
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson13EnData: LessonData = {
  id: "cpp-13",
  title: "Recursion",
  emoji: "🔄",
  description: "Functions that call themselves — recursion and memoization!",
  chapters: [
    // ============================================
    // Chapter 1: Recursion Basics
    // ============================================
    {
      id: "ch1",
      title: "Recursion Basics",
      emoji: "🌀",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🌀 Recursion — A Function That Calls Itself!",
          content: `Imagine a Russian nesting doll — open it, and there's a smaller identical doll inside. Open that one, and there's an even smaller one... **Recursion** is exactly this idea!

**Recursion** is when a function **calls itself**.

Every recursive function needs two things:
1. **Base Case** — the stopping condition (no more calls)
2. **Recursive Call** — calling itself with a smaller problem

\`\`\`cpp
// 5! = 5 × 4 × 3 × 2 × 1 = 120
int factorial(int n) {
    if (n <= 1) return 1;        // Base case!
    return n * factorial(n - 1); // Recursive call!
}

cout << factorial(5);  // 120
\`\`\`

Let's trace through the calls:
\`\`\`
factorial(5)
  = 5 × factorial(4)
        = 4 × factorial(3)
              = 3 × factorial(2)
                    = 2 × factorial(1)
                          = 1  ← Base case!
                    = 2 × 1 = 2
              = 3 × 2 = 6
        = 4 × 6 = 24
  = 5 × 24 = 120
\`\`\`

Compare with Python:

**Python 🐍:**
\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
\`\`\`

Almost identical! C++ just requires explicit type annotations.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`def factorial(n):\` | \`int factorial(int n) {\` |
| Indent for scope | Curly braces for scope |
| No return type | Explicit \`int\` return type |
| Recursion logic is identical! | Recursion logic is identical! |

💡 Without a base case, you'll get infinite recursion — a **Stack Overflow** error! Always write the stopping condition first!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Complete the base case for this recursive function!",
          code: "int factorial(int n) {\n    if (n ___ 1) return 1;  // base case\n    return n * factorial(n - 1);\n}",
          fillBlanks: [
            { id: 0, answer: "<=", options: ["<=", ">=", "==", ">"] }
          ],
          explanation: "n <= 1 is the base case! When n is 0 or 1, return 1 and stop recursing. Using n == 1 alone would fail to handle n=0 correctly."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Trace the recursive calls!",
          code: "#include <iostream>\nusing namespace std;\nvoid count(int n) {\n    if (n <= 0) return;\n    cout << n << \" \";\n    count(n - 1);\n}\nint main() {\n    count(4);\n    return 0;\n}",
          options: ["1 2 3 4 ", "4 3 2 1 ", "4 4 4 4 ", "infinite loop"],
          answer: 1,
          explanation: "count(4) → prints 4 → count(3) → prints 3 → count(2) → prints 2 → count(1) → prints 1 → count(0) → return. Output is 4 3 2 1!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Sum 1 to N with recursion!",
          content: `Use recursion to find the sum from 1 to n!

Use the relationship: sum(n) = n + sum(n-1)
Base case: sum(0) = 0`,
          code: `#include <iostream>
using namespace std;

int sum(int n) {
    if (n <= 0) return 0;  // base case
    return n + sum(n - 1); // recursive call
}

int main() {
    cout << sum(5) << endl;   // 1+2+3+4+5
    cout << sum(10) << endl;  // sum 1 to 10
    return 0;
}`,
          expectedOutput: `15
55`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "The key to recursion!",
          content: "What is **required** in every recursive function?",
          options: [
            "A loop (for/while)",
            "A base case",
            "A global variable",
            "A void return type"
          ],
          answer: 1,
          explanation: "Without a base case, the function calls itself forever and causes a stack overflow! Every recursive function must have a stopping condition (base case)."
        }
      ]
    },
    // ============================================
    // Chapter 2: Fibonacci & Memoization
    // ============================================
    {
      id: "ch2",
      title: "Fibonacci & Memoization",
      emoji: "💾",
      steps: [
        {
          id: "ch2-fib",
          type: "explain",
          title: "💾 Fibonacci and the Repeated Work Problem!",
          content: `Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...
Each number = sum of the previous two! (fib(n) = fib(n-1) + fib(n-2))

\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;  // base case: fib(0)=0, fib(1)=1
    return fib(n-1) + fib(n-2);
}
\`\`\`

But... computing fib(5) looks like this:
\`\`\`
fib(5)
├── fib(4)
│   ├── fib(3) ← already computed this!
│   │   ├── fib(2)
│   │   └── fib(1)
│   └── fib(2)
└── fib(3) ← computing again! (wasted!)
    ├── fib(2)
    └── fib(1)
\`\`\`

Computing fib(40) requires **billions** of repeated calculations! 🐢

**The fix: Memoization**
Store results once computed, and reuse them!

\`\`\`cpp
int memo[100];  // initialized to -1

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // already computed, return immediately!
    memo[n] = fib(n-1) + fib(n-2);     // compute and store
    return memo[n];
}
\`\`\`

fib(40) goes from ~1 billion calls → **79 calls**! 🚀

Compare with Python:

**Python 🐍:**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)  # Python handles it with a decorator!
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

Python uses @lru_cache; C++ uses an explicit array.

| | Plain Recursion | Memoization |
|---|---|---|
| Time complexity | O(2^n) — exponential! | **O(n)** — linear! |
| fib(40) | ~1 billion calls | 79 calls |
| Implementation | Simple | Needs an array |

💡 Memoization is the core technique of **Dynamic Programming (DP)**! It comes up constantly in USACO problems!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Fibonacci result!",
          code: "#include <iostream>\nusing namespace std;\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\nint main() {\n    cout << fib(7);\n    return 0;\n}",
          options: ["11", "13", "21", "8"],
          answer: 1,
          explanation: "Fibonacci: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8, fib(7)=13!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Fibonacci with memoization!",
          content: `Use memoization to compute Fibonacci numbers efficiently!

Initialize the memo array to -1, then store computed results.`,
          code: `#include <iostream>
using namespace std;

int memo[50];

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib(n-1) + fib(n-2);
    return memo[n];
}

int main() {
    fill(memo, memo + 50, -1);

    cout << fib(10) << endl;
    cout << fib(20) << endl;
    return 0;
}`,
          expectedOutput: `55
6765`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Understanding memoization!",
          content: "Which statement about memoization is **correct**?",
          options: [
            "It always uses less memory",
            "It stores computed results to avoid redundant calculations",
            "It can only be used without recursion",
            "Code becomes complex but speed stays the same"
          ],
          answer: 1,
          explanation: "Memoization stores (memos) computed results so that when the same calculation is needed again, it returns the stored value instead of recomputing! fib(40) shrinks from billions of calls to just 79."
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
          title: "Read the recursive code!",
          content: `What does this function output?

\`\`\`cpp
int mystery(int n) {
    if (n == 0) return 0;
    return 1 + mystery(n - 1);
}
cout << mystery(5);
\`\`\``,
          options: ["0", "1", "5", "infinite loop"],
          answer: 2,
          explanation: "mystery(5) = 1 + mystery(4) = 1 + 1 + mystery(3) = ... = 1+1+1+1+1+mystery(0) = 5+0 = 5! This function essentially just returns n."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Stack overflow!",
          content: `What's **wrong** with this recursive function?

\`\`\`cpp
int bad(int n) {
    return n + bad(n - 1);
}
\`\`\``,
          options: [
            "The return type is wrong",
            "There's no base case",
            "There's no recursive call",
            "The parameter type is wrong"
          ],
          answer: 1,
          explanation: "There's no base case! This function calls itself forever until a stack overflow occurs. It needs something like: if (n <= 0) return 0;"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Memoization vs plain recursion!",
          content: "What is the time complexity of plain recursive Fibonacci?",
          options: [
            "O(n)",
            "O(n log n)",
            "O(n²)",
            "O(2^n)"
          ],
          answer: 3,
          explanation: "Plain recursive Fibonacci is O(2^n) — exponential! fib(40) requires ~2^40 operations. With memoization it drops to O(n)!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Recursion in action!",
          content: `What does this code output?

\`\`\`cpp
void printStars(int n) {
    if (n == 0) return;
    cout << "*";
    printStars(n - 1);
}
printStars(3);
\`\`\``,
          options: ["***", "* * *", "3", "Error"],
          answer: 0,
          explanation: "printStars(3) → print '*' → printStars(2) → print '*' → printStars(1) → print '*' → printStars(0) → return. No spaces, so output is '***'!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Recursion complete!",
          content: `## 🏆 Lesson 13 Done!

Let's review what you learned today!

### 🌀 Basic Recursion Structure
\`\`\`cpp
type function(params) {
    if (base_condition) return value;  // ← required!
    return recursive_call_with_smaller_problem;
}
\`\`\`

### Recursion vs Loops
- Recursion: **Intuitive** code, great for trees/graphs
- Loops: **Faster**, more memory-efficient

### 💾 Memoization
\`\`\`cpp
int memo[N];  // initialized to -1

int func(int n) {
    if (base_condition) return ...;
    if (memo[n] != -1) return memo[n];  // reuse stored result!
    memo[n] = func(n-1) + ...;
    return memo[n];
}
\`\`\`

### Time Complexity Comparison
| Approach | fib(40) | Time Complexity |
|---|---|---|
| Plain recursion | ~1 billion calls | O(2^n) |
| Memoization | ~80 calls | **O(n)** |

💡 **Recursion + Memoization = the core of Dynamic Programming (DP)**! This pattern appears constantly in USACO problems!

🚀 **Next lesson:** Classes — Python's class concept taken to the next level with C++'s powerful access control!`
        }
      ]
    }
  ]
}
