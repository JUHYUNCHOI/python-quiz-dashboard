// ============================================
// C++ Lesson 20: Competitive Programming Tips
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson20EnData: LessonData = {
  id: "cpp-20",
  title: "Competitive Programming Tips",
  emoji: "🏆",
  description: "C++ tips you can use right away in USACO!",
  chapters: [
    // ============================================
    // Chapter 1: Convenience Features
    // ============================================
    {
      id: "ch1",
      title: "Convenience Features",
      emoji: "🛠️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🛠️ bits/stdc++.h — one line, all headers",
          content: `Every contest problem started the same way:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <map>
// Did I forget any...? 😩
\`\`\`

In a 3-hour contest, writing 10 header lines per problem is wasted time. So contest folks use a *cheat-code* header:

\`\`\`cpp
#include <bits/stdc++.h>   // pulls in basically all of STL
using namespace std;
\`\`\`

Those two lines get you \`vector\`, \`map\`, \`set\`, \`algorithm\`, \`string\` — the lot. This is the standard contest opener.

| Python 🐍 | C++ contest style ⚡ |
|---|---|
| \`import\` one at a time | \`bits/stdc++.h\` for everything |
| No namespace fuss | \`using namespace std;\` once |

### ⚠️ Contests only — never in real code

\`bits/stdc++.h\` is **not standard C++.** It only exists in GCC, not in Clang or MSVC. So:

| Downside | Consequence |
|---|---|
| Non-standard | Won't compile on Clang/MSVC → can't use in workplace code |
| Includes everything | Compile becomes **2-3x slower** |
| You stop learning header dependencies | Hard to debug header issues later |

> 💡 **Bottom line**: contests (speed first) → fine. Production / real projects (portability, maintainability) → never. Treat it as a contest / learning / quick-experiment tool.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Include all STL headers at once!",
          code: "#include <___>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 2};\n    sort(v.begin(), v.end());\n    cout << v[0];\n    return 0;\n}",
          fillBlanks: [
            { id: 0, answer: "bits/stdc++.h", options: ["bits/stdc++.h", "iostream", "vector", "algorithm"] }
          ],
          explanation: "Including bits/stdc++.h gives you vector, algorithm, iostream, and all other STL headers at once! It's the most convenient approach for CP."
        },
        {
          id: "ch1-typedef",
          type: "explain",
          title: "🛠️ typedef & using — Create Type Aliases!",
          content: `In CP, you frequently use long types like \`long long\`, \`vector<int>\`, \`pair<int,int>\`. Typing them out every time is tedious!

**Create aliases with typedef:**
\`\`\`cpp
typedef long long ll;
typedef vector<int> vi;
typedef pair<int, int> pii;
typedef vector<pair<int, int>> vpii;
\`\`\`

**You can also use the using keyword (C++11):**
\`\`\`cpp
using ll = long long;
using vi = vector<int>;
using pii = pair<int, int>;
\`\`\`

**Usage example:**
\`\`\`cpp
// Without aliases 😩
long long answer = 0;
vector<int> numbers;
pair<int, int> coord;

// With aliases! 😊
ll answer = 0;
vi numbers;
pii coord;
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
# Python has dynamic types, no aliases needed
answer = 0          # Just use it
numbers = []        # List
coord = (1, 2)      # Tuple
\`\`\`

Python doesn't need type aliases since you don't write types, but in C++, **typedef/using** saves a lot of typing!

💡 **typedef** and **using** do the same thing. Modern C++ recommends \`using\`!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Using typedef!",
          code: "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\ntypedef pair<int, int> pii;\n\nint main() {\n    ll big = 1000000000000LL;\n    pii p = {10, 20};\n    cout << p.first + p.second;\n    return 0;\n}",
          options: ["1000000000000", "30", "10 20", "Error"],
          answer: 1,
          explanation: "pii is an alias for pair<int, int>! p.first is 10 and p.second is 20. 10 + 20 = 30 is printed. big was declared but never printed!"
        },
        {
          id: "ch1-macros",
          type: "explain",
          title: "🛠️ Macros & Constants — Common Patterns!",
          content: `Let's organize the most commonly used macros and constants in CP!

**Macros (#define):**
\`\`\`cpp
#define pb push_back
#define mp make_pair
#define all(v) v.begin(), v.end()
#define rep(i, n) for(int i = 0; i < n; i++)
#define F first
#define S second
\`\`\`

**Common constants:**
\`\`\`cpp
const int INF = 1e9;        // 1 billion (near int max)
const ll LINF = 1e18;       // Near long long max
const int MOD = 1e9 + 7;    // Prime for modular arithmetic
const double PI = acos(-1); // Pi
\`\`\`

**Usage example:**
\`\`\`cpp
vi v;
v.pb(10);           // v.push_back(10)
v.pb(20);           // v.push_back(20)
sort(all(v));        // sort(v.begin(), v.end())

rep(i, 5) {          // for(int i = 0; i < 5; i++)
    cout << i << " ";
}
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
INF = float('inf')
MOD = 10**9 + 7

v = []
v.append(10)        # C++'s push_back
v.sort()            # Simple!
\`\`\`

| Python 🐍 | C++ CP macros ⚡ |
|---|---|
| \`v.append(x)\` | \`v.pb(x)\` |
| \`v.sort()\` | \`sort(all(v))\` |
| \`float('inf')\` | \`INF = 1e9\` |
| \`for i in range(n)\` | \`rep(i, n)\` |

⚠️ **Macro traps:**
\`\`\`cpp
#define square(x) x*x
cout << square(3+1);  // Expected: 16, Actual: 7!
// Why? It becomes 3+1*3+1 = 7 through text substitution!
// Safe version: #define square(x) ((x)*(x))
\`\`\`
Macros are simple text replacement, so they have traps like this. Only use them for simple things!

💡 Too many macros can make code hard to read. Only define the ones you use **frequently**!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Clean Code with Macros!",
          content: `Write concise CP-style code using typedef, macros, and constants!

Add numbers to a vector, sort them, and print the smallest and largest values.`,
          code: `#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
#define pb push_back
#define all(v) v.begin(), v.end()

const int INF = 1e9;
const int MOD = 1e9 + 7;

int main() {
    vi v;
    v.pb(30);
    v.pb(10);
    v.pb(50);
    v.pb(20);
    v.pb(40);

    sort(all(v));

    cout << v[0] << endl;
    cout << v[v.size()-1] << endl;
    cout << v.size() << endl;

    return 0;
}`,
          hint: "typedef vector<int> vi; creates a type alias, #define pb push_back creates a macro. v.pb(x) is v.push_back(x), sort(all(v)) is sort(v.begin(), v.end())!",
          expectedOutput: `10
50
5`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Understanding bits/stdc++.h!",
          content: "Which statement about `#include <bits/stdc++.h>` is **incorrect**?",
          options: [
            "It includes all STL headers at once",
            "It is commonly used in CP",
            "It is recommended for production code",
            "It can increase compilation time"
          ],
          answer: 2,
          explanation: "bits/stdc++.h is convenient for CP, but it should NOT be used in production! It includes unnecessary headers that slow down compilation, and it's non-standard so some compilers may not support it."
        }
      ]
    },
    // ============================================
    // Chapter 2: Bit Operations & Patterns
    // ============================================
    {
      id: "ch2",
      title: "Bit Operations & Patterns",
      emoji: "💡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "💡 Bit Operations — Computing with 0s and 1s!",
          content: `The real power of bitmasks: you can represent **all subsets** of a set with 3 elements {A, B, C}!
- 000 (binary) = {} empty set
- 001 = {C}
- 010 = {B}
- 011 = {B,C}
- ...
- 111 = {A,B,C}

8 subsets represented by numbers 0-7! This comes up constantly in USACO.

Computers process everything in **bits (0s and 1s)**. Bit operations let you manipulate these bits directly!

**Bit operators:**
\`\`\`cpp
&   // AND — 1 only if both are 1
|   // OR  — 1 if either is 1
^   // XOR — 1 if different
~   // NOT — flip all bits
<<  // Left Shift  — shift bits left
>>  // Right Shift — shift bits right
\`\`\`

**Examples (8-bit):**
\`\`\`
  5 = 00000101
  3 = 00000011

5 & 3 = 00000001 = 1  (AND)
5 | 3 = 00000111 = 7  (OR)
5 ^ 3 = 00000110 = 6  (XOR)
\`\`\`

**Frequently used bit tricks:**
\`\`\`cpp
n & 1       // 1 if odd, 0 if even
1 << k      // 2 to the power of k (2^k)
n >> 1      // divide n by 2 (integer division)
n << 1      // multiply n by 2
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
# Python has the same bit operators!
print(5 & 3)   # 1
print(5 | 3)   # 7
print(5 ^ 3)   # 6
print(1 << 10) # 1024 (2^10)
print(n & 1)   # odd/even check
\`\`\`

| Operation | Python 🐍 | C++ ⚡ |
|---|---|---|
| Odd/even check | \`n % 2\` or \`n & 1\` | \`n & 1\` (faster!) |
| Power of 2 | \`2 ** k\` or \`1 << k\` | \`1 << k\` |
| Divide by 2 | \`n // 2\` | \`n >> 1\` |

**When are bit operations useful?**
• **Check if a number is a power of 2:** \`(n & (n-1)) == 0\` → true means it's a power of 2!
• **Odd/even check:** \`(n & 1)\` → 1 means odd, 0 means even
• **Bitmask:** Manage multiple states with a single number (essential in contests!)

💡 Bit operators are the same in Python and C++! But in C++, they're often used when **performance** matters.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Check if the number is odd!",
          code: "int n = 7;\n// Check if n is odd\nif (n ___ 1) {\n    cout << \"odd\";\n}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "|", "^", ">>"] }
          ],
          explanation: "n & 1 checks the last bit of n! If n is odd, the last bit is 1, so the result is 1 (true). If n is even, the result is 0 (false)."
        },
        {
          id: "ch2-bit-mini",
          type: "practice" as const,
          title: "✋ Quick — print even numbers from 1 to 10",
          content: `**Scenario**: Print only the even numbers from 1 to 10. Use \`& 1\` to test parity.

\`\`\`
Expected: 2 4 6 8 10
\`\`\`

> 💡 \`(i & 1) == 0\` means even (last bit is 0).`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // 👇 Print i in 1..10 if (i & 1) == 0 (space-separated)


    return 0;
}`,
          code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        if ((i & 1) == 0) cout << i << " ";
    }

    return 0;
}`,
          hint: "for (int i = 1; i <= 10; i++) if ((i & 1) == 0) cout << i << \" \"; — when i & 1 is 0, i is even.",
          expectedOutput: `2 4 6 8 10 `
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Bit operation results!",
          code: "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int a = 1 << 3;\n    int b = 12 >> 2;\n    int c = 5 ^ 5;\n    cout << a << \" \" << b << \" \" << c;\n    return 0;\n}",
          options: ["3 6 10", "8 3 0", "8 6 0", "3 3 0"],
          answer: 1,
          explanation: "1 << 3 shifts 1 left by 3 = 8 (2^3). 12 >> 2 shifts 12 right by 2 = 3 (12/4). 5 ^ 5 is XOR of a number with itself, which is always 0!"
        },
        {
          id: "ch2-must-bitmask",
          type: "practice" as const,
          title: "🎯 Where bitmasks *truly shine* — enumerate all subsets",
          content: `One pattern where bit operations show their real power: **subset enumeration**.

**Problem**: For \`n = 3\` (three elements \`A, B, C\`), print all **8 subsets**. Include the empty set.

\`\`\`
Expected output (one subset per line):
{ }
{ A }
{ B }
{ A B }
{ C }
{ A C }
{ B C }
{ A B C }
\`\`\`

> 💡 With recursion you'd need backtracking ("include / don't include"). With a **bitmask**, it's a single loop: \`for (int mask = 0; mask < (1 << n); mask++)\`.
>
> **Trick**: if bit \`i\` of \`mask\` is 1, include element \`i\`. Check with \`mask & (1 << i)\`.
>
> For n = 3, \`1 << 3 = 8\`, so \`mask\` runs 0..7 and you get every subset for free.`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 3;
    char names[] = {'A', 'B', 'C'};

    // 👇 Loop mask from 0 to (1 << n) - 1:
    //    For each mask, print elements whose bit is set.
    //    Format: "{ A B }" (space-separated, with spaces inside braces)


    return 0;
}`,
          code: `#include <iostream>
using namespace std;

int main() {
    int n = 3;
    char names[] = {'A', 'B', 'C'};

    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                cout << names[i] << " ";
            }
        }
        cout << "}" << endl;
    }

    return 0;
}`,
          hint: "Outer loop: for (int mask = 0; mask < (1 << n); mask++) — every subset. Inner: for (int i = 0; i < n; i++), check with if (mask & (1 << i)) to include element i. Watch output format: '{ ' + elements + '}', each element followed by one space.",
          expectedOutput: `{ }
{ A }
{ B }
{ A B }
{ C }
{ A C }
{ B C }
{ A B C }`
        },
        {
          id: "ch2-patterns",
          type: "explain",
          title: "💡 Common CP Patterns!",
          content: `Let's organize patterns that appear frequently in USACO and CP!

**1. Fast I/O:**
\`\`\`cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
// Just these two lines make I/O much faster!
\`\`\`

**2. Input reading pattern:**
\`\`\`cpp
int n;
cin >> n;
vi v(n);
for(int i = 0; i < n; i++) {
    cin >> v[i];
}
\`\`\`

**3. Prefix Sum:**
\`\`\`cpp
// Quickly compute range sums!
vi prefix(n + 1, 0);
for(int i = 0; i < n; i++) {
    prefix[i+1] = prefix[i] + v[i];
}
// Sum of range [l, r] = prefix[r+1] - prefix[l]
\`\`\`

**4. Coordinate Compression:**
\`\`\`cpp
// Convert large value ranges to small indices!
vi sorted_v = v;
sort(all(sorted_v));
sorted_v.erase(unique(all(sorted_v)), sorted_v.end());
// Now use lower_bound to find indices
\`\`\`

**5. Useful constants:**
\`\`\`cpp
INT_MAX    // Max int value (~2.1 * 10^9)
INT_MIN    // Min int value
LLONG_MAX  // Max long long value (~9.2 * 10^18)
\`\`\`

Let's compare with Python:

| Pattern | Python 🐍 | C++ ⚡ |
|---|---|---|
| Input | \`input()\` | \`cin >>\` + fast I/O |
| Prefix sum | \`itertools.accumulate\` | Implement manually |
| Max integer | \`float('inf')\` | \`INT_MAX\` / \`1e9\` |
| Coord compress | \`sorted(set(v))\` | \`sort + unique + erase\` |

💡 These patterns come up very frequently in USACO Bronze~Silver!`
        },
        {
          id: "ch2-template",
          type: "explain",
          title: "💡 The Ultimate USACO Template!",
          content: `Here's a **complete CP template** you can use right away in USACO Bronze~Silver!

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
typedef pair<int, int> pii;
#define pb push_back
#define all(v) v.begin(), v.end()
#define F first
#define S second

const int INF = 1e9;
const int MOD = 1e9 + 7;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // USACO file I/O (when needed)
    // freopen("problem.in", "r", stdin);
    // freopen("problem.out", "w", stdout);

    int n;
    cin >> n;

    // Write your solution here!

    return 0;
}
\`\`\`

**When USACO requires file I/O:**
\`\`\`cpp
freopen("problem.in", "r", stdin);   // Read from file
freopen("problem.out", "w", stdout); // Write to file
// After this, cin/cout automatically use the files!
\`\`\`

Let's compare with Python:

**Python USACO template 🐍:**
\`\`\`python
import sys
sys.stdin = open("problem.in", "r")
sys.stdout = open("problem.out", "w")

n = int(input())
# Write solution
\`\`\`

| Element | Python 🐍 | C++ ⚡ |
|---|---|---|
| Include all | Individual \`import\` | \`bits/stdc++.h\` |
| Type shortcuts | Not needed | \`typedef ll, vi, pii\` |
| Fast I/O | Automatic | \`sync_with_stdio + tie\` |
| File I/O | \`sys.stdin = open()\` | \`freopen()\` |

Applying this template to an actual USACO Bronze problem:
1. freopen() for file I/O
2. Fast I/O to save time
3. bits/stdc++.h so you don't worry about headers
→ You can focus entirely on solving the problem!

💡 Memorize this template and you can start coding immediately in a contest! Saving time is key!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ USACO-Style Solution!",
          content: `Write a complete USACO-style solution!

Problem: Given N numbers, sort them and output the difference between the smallest and largest values.

Use the CP template with typedef, macros, and fast I/O!`,
          code: `#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
#define all(v) v.begin(), v.end()

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    vi v = {42, 17, 93, 8, 56};

    sort(all(v));

    int minVal = v[0];
    int maxVal = v[n-1];

    cout << minVal << endl;
    cout << maxVal << endl;
    cout << maxVal - minVal << endl;

    return 0;
}`,
          hint: "#include <bits/stdc++.h> includes all headers. typedef vector<int> vi, #define all(v) v.begin(), v.end(). After sort(all(v)), v[0] is the min and v[n-1] is the max!",
          expectedOutput: `8
93
85`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Bit operations!",
          content: "What is the value of `1 << 10`?",
          options: [
            "10",
            "20",
            "512",
            "1024"
          ],
          answer: 3,
          explanation: "1 << 10 shifts 1 to the left by 10 positions. This equals 2^10 = 1024! 1 << k always equals 2 to the power of k."
        }
      ]
    },
    // ============================================
    // Chapter 3: Final Review
    // ============================================
    {
      id: "ch3",
      title: "Final Review",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "Using typedef!",
          content: "After `typedef long long ll;`, which usage is correct?",
          options: [
            "long a = 1000000000000;",
            "ll a = 1000000000000LL;",
            "int a = 1000000000000;",
            "typedef a = 1000000000000;"
          ],
          answer: 1,
          explanation: "typedef made ll an alias for long long! You can use ll a = 1000000000000LL; to declare it. The LL suffix explicitly marks the literal as a long long."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Bit operation application!",
          content: "Which bit operation expression checks if `n` is **even**?",
          options: [
            "(n & 1) == 1",
            "(n | 1) == 0",
            "(n & 1) == 0",
            "(n ^ 1) == 0"
          ],
          answer: 2,
          explanation: "n & 1 checks the last bit of n. If n is even, the last bit is 0, so (n & 1) == 0 is true! If n is odd, (n & 1) == 1."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "CP template!",
          content: "Which code is used for fast I/O in C++ CP?",
          options: [
            "cin.speed(true);",
            "ios_base::sync_with_stdio(false); cin.tie(NULL);",
            "fast_io::enable();",
            "#define FAST_IO"
          ],
          answer: 1,
          explanation: "ios_base::sync_with_stdio(false) disconnects C and C++ I/O synchronization, and cin.tie(NULL) unties cin from cout. Together, they significantly speed up I/O!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Part 3 comprehensive challenge!",
          content: `What's the output?

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef vector<int> vi;
#define all(v) v.begin(), v.end()
#define pb push_back

int main() {
    vi v;
    v.pb(5); v.pb(2); v.pb(8); v.pb(1);
    sort(all(v));
    cout << v.front() << " " << v.back();
    return 0;
}
\`\`\``,
          options: [
            "5 1",
            "1 8",
            "2 5",
            "8 1"
          ],
          answer: 1,
          explanation: "pb is push_back, all(v) is v.begin(), v.end(). The vector holds {5,2,8,1}. After sorting: {1,2,5,8}. front() gives the first element (1), back() gives the last (8)!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Part 3 Complete! C++ Master!",
          content: `## 🏆 Part 3 Complete! Amazing work!

You've finished the entire C++ for USACO curriculum! Congratulations! 🎊

### 📚 Full Curriculum Summary

**Part 1: C++ Basics (Lessons 1~8)**
- Hello World, variables, conditionals, loops, functions, etc.
- Foundation for transitioning from Python to C++

**Part 2: Intermediate C++ (Lessons 9~14)**
- Arrays/vectors, strings, references, structs/classes, etc.
- Data structures and OOP fundamentals

**Part 3: USACO Preparation (Lessons 15~20)**
- STL containers, algorithms, pointers, file I/O
- Recursion, time complexity, and today's CP practical tips!

---

## ✅ Key Takeaways from Today!

| Concept | Keywords | Core Idea |
|---|---|---|
| Include all | \`bits/stdc++.h\` | All STL at once! |
| Type aliases | \`typedef ll\`, \`vi\`, \`pii\` | Less typing |
| Macros | \`#define pb, all\` | Concise code |
| Bit ops | \`& | ^ << >>\` | Fast operations |
| Fast I/O | \`sync_with_stdio\` | Speed up I/O |
| File I/O | \`freopen\` | USACO I/O |

---

## 🚀 What's Next?

Time to solve real problems!

1. **USACO** (usaco.org) — Official contest site, solve past problems
2. **Codeforces** (codeforces.com) — Weekly contests, various difficulties
3. **AtCoder** (atcoder.jp) — Clean problems, beginner-friendly
4. **BOJ** (acmicpc.net) — Korean problems, massive problem set

**Tip:** Start with Bronze problems and work your way up. If you've been stuck on a problem for 30+ minutes, checking the editorial is totally fine!

🎊 **It was great learning C++ together! You've got this!** 💪`
        }
      ]
    }
  ]
}
