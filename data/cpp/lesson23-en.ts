// ============================================
// C++ Lesson 23 (EN): sort Master
// sort basics → lambda → binary search (lower_bound) → advanced
// ============================================
import { LessonData } from '../types'

export const cppLesson23EnData: LessonData = {
  id: "cpp-23",
  title: "sort & Binary Search",
  emoji: "📊",
  description: "sort basics + lambda + lower_bound — Master sorting and binary search together!",
  chapters: [
    // ============================================
    // Chapter 0: sort basics
    // ============================================
    {
      id: "s23-ch0",
      title: "sort Basics",
      emoji: "📊",
      steps: [
        {
          id: "s23-ch0-toolbox",
          type: "explain",
          title: "🗂️ Data-bundling tools — at a glance",
          content: `By now you've met **4 tools**: \`vector\`, \`pair\`, \`tuple\`, \`struct\`. They start to blur together. **Lock them down once with this table** — it'll serve you for years.

### The 4 tools side by side

| Tool | When to use | Example | Access |
|---|---|---|---|
| **vector** | **Same type**, many items (count varies) | scores of 30 students | \`v[i]\` |
| **pair** | **Two values of different types**, paired | coordinate (x, y) / name+score | \`.first\` / \`.second\` |
| **tuple** | **3+ values of different types**, brief use | (name, age, gpa) within one function | \`get<0>(t)\` or \`auto [...]\` |
| **struct** | **Different types**, frequently used, names matter | game character (name, hp, mp) | \`.name\`, \`.hp\` |

### 1-second decision tree

\`\`\`
Bundling multiple data into one variable?
│
├─ Same type, many items → vector
│
└─ Different types
    ├─ Exactly 2 → pair
    └─ 3 or more
        ├─ Brief (within a function) → tuple
        └─ Used often + names matter → struct
\`\`\`

### Combinations are common

| Combo | Meaning | Example |
|---|---|---|
| \`vector<pair<...>>\` | **Many** paired bundles | N students' (name, score) — a sort staple |
| \`vector<struct ...>\` | Roster of records | N game characters |
| \`pair<int, string>\` | One paired bundle | (score, name) — sort key on score |

### One-second rule

> **Many people / items?** → start with **vector**.
> **Just 2?** → **pair**.
> **3+ and brief?** → **tuple**.
> **Used often, names matter?** → **struct**.

### What about this sort chapter?

Almost everything uses \`vector<pair>\` — N students (vector) of (name, score) (pair). Glance at the table and the right answer surfaces: "ah, vector<pair>".

Next page — how sort does it in one line 👇`,
        },
        {
          id: "s23-ch0-intro",
          type: "explain",
          title: "📊 sort() — sort it in one line",
          content: `In the previous lesson we saw how pair's auto-comparison made "**a score sheet sorts itself with one line of** \`sort\`". This lesson is all about that \`sort\`.

\`sort\` collapses the work of writing your own quicksort/mergesort into **one line**. It's one of the most-used STL functions in C++.

\`\`\`cpp
#include <algorithm>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}
\`\`\`

\`sort(begin, end)\` — STL's familiar \`(begin, end)\` pattern: "sort within this range."

> 💡 Looks like Python's \`v.sort()\` but with one important difference.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — returns new list | (none) C++ always **modifies the original** |

In C++, sort always **modifies in place**. Need a sorted copy? Copy the vector first, then sort the copy.

> 🎯 **How USACO uses it:**
> Appears in **almost every problem**. Sorting student scores, coordinates, prices, names. "Read data → sort first → then solve" is the most common opening of a USACO Bronze solution.

### Same thing for arrays

\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // sort arr[0] ~ arr[4]
\`\`\`

{collapse:🤔 Why does \`arr + 5\` work?}
\`\`\`
arr is actually the memory address of the first element (a pointer).
arr     → address of arr[0]
arr + 5 → address of arr[5] (= one past last, marks "the end")

Same role as v.begin() / v.end() for vectors.
\`\`\`

---

### 💭 Keep in mind — sort needs to be able to **compare**

The reason \`sort\` finishes the job in one line: it knows **which of two values comes first**.

| Type | Auto-comparison? | sort one-liner? |
|---|---|---|
| \`int\`, \`string\` | ✅ obviously | ✅ |
| \`pair\`, \`tuple\` | ✅ standard library defines it | ✅ |
| \`struct\` (yours) | ❌ "which comes first?" — compiler has no idea | ❌ not directly |

You **can** sort a \`struct\`, but it takes one extra step. Chapter 1 shows that solution (lambda).

---

Next page — try sorting one yourself 👇`
        },
        {
          id: "s23-ch0-fb1",
          type: "fillblank" as const,
          title: "sort Fill-in-the-Blank",
          content: "Complete the code to sort the vector!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort() takes a start and end position! For vectors, use v.begin() and v.end()."
        },
        {
          id: "s23-ch0-practice1",
          type: "practice" as const,
          title: "✋ From scratch — sort and print integers",
          content: `**Problem**: Given N integers, sort them in ascending order and print them on one line, space-separated.

> 💡 Write everything from #include to main. Read input → store in vector → sort → print. Input / target output in the boxes below.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 Read N ints into a vector, sort, then print space-separated

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << v[i];
    }
    return 0;
}`,
          hint: "vector<int> v(n); for input, sort(v.begin(), v.end()), then for-loop print with space prefix (skip for first element).",
          expectedOutput: `1 2 4 5 7`,
          stdin: `5
4 2 7 1 5`,
        },
        {
          id: "s23-ch0-pred1",
          type: "predict" as const,
          title: "Predict the sort Output!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "After sort(), v = {1, 2, 4, 5, 7}. v[0] is the smallest (1), v[4] is the largest (7). Output: 1 7!"
        },
        {
          id: "s23-ch0-desc",
          type: "explain",
          title: "📊 Descending Sort!",
          content: `Default sort() is ascending. How do you sort in descending order?

**Method 1: Use greater<int>() (for simple int/string)**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}
\`\`\`

sort() accepts a **third argument** for the comparison rule.
\`greater<int>()\` is a pre-built tool meaning "bigger goes first."

| | Code | Result |
|---|---|---|
| Ascending | \`sort(v.begin(), v.end())\` | 1 2 5 8 9 |
| Descending | \`sort(v.begin(), v.end(), greater<int>())\` | 9 8 5 2 1 |

💡 No third argument = ascending by default!

> 🎯 **When do you need descending in USACO?**
> • "Print top 3 students" → sort scores descending, take first 3
> • "List most expensive first" → price descending
> • Greedy problems like "apply largest first" — the sort direction decides the answer`
        },
        {
          id: "s23-ch0-fb2",
          type: "fillblank" as const,
          title: "Descending Sort Fill-in-the-Blank",
          content: "Sort the vector in descending order!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), ___<int>());",
          fillBlanks: [
            { id: 0, answer: "greater", options: ["greater", "bigger", "larger", "reverse"] }
          ],
          explanation: "Use greater<type>() for descending order! Match the type: greater<int>(), greater<string>(), etc."
        },
        {
          id: "s23-ch0-pred2",
          type: "predict" as const,
          title: "Predict the descending sort output!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), greater<int>());
    cout << v[0] << " " << v[1] << " " << v[4];
    return 0;
}`,
          options: ["1 1 5", "5 4 1", "5 1 1", "3 1 4"],
          answer: 1,
          explanation: "greater<int>() sorts descending → v = {5, 4, 3, 1, 1}. v[0]=5, v[1]=4, v[4]=1 → '5 4 1'."
        },
        {
          id: "s23-ch0-practice2",
          type: "practice" as const,
          title: "✋ From scratch — descending sort + top 3",
          content: `**Problem**: Given N integers, sort in **descending order and print the top 3** on one line, space-separated.
If N < 3, print everything in descending order.

\`\`\`
Input:  5
        4 2 7 1 5
Output: 7 5 4

Input:  2
        9 3
Output: 9 3
\`\`\`

> 💡 Sort with \`greater<int>()\`, then print up to index \`min(3, N)\`.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 Read N ints, sort descending, print top 3 (or all if N<3)

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), greater<int>());
    int k = min(n, 3);
    for (int i = 0; i < k; i++) {
        if (i > 0) cout << " ";
        cout << v[i];
    }
    return 0;
}`,
          hint: "sort with greater<int>(), then loop up to min(n, 3) — handles N<3 automatically.",
          expectedOutput: `7 5 4`,
          stdin: `5
4 2 7 1 5`,
        },
        {
          id: "s23-ch0-q1",
          type: "quiz",
          title: "sort Header!",
          content: "Which header do you need to include to use `sort()`? Pick the **official answer**.",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "**Official answer: `<algorithm>`**. `sort()` lives exactly in this header.\n\n💡 You may be thinking back to the pair note (\"`<vector>` etc. pull pair in for free\") — that's a different case:\n• **pair is a type**: STL containers like map / set use pair internally, so it gets pulled in transitively.\n• **sort is a function**: other STL headers don't use sort internally, so it doesn't get pulled in. Including only `<vector>` and calling `sort()` gives `'sort' was not declared`.\n\n**Rule: for functions, explicitly include the official header.** Types just sometimes happen to come along for free."
        },
        {
          id: "s23-ch0-practice3",
          type: "practice" as const,
          title: "✋ From scratch — sort strings alphabetically",
          content: `**Problem**: Given N strings, sort them in **alphabetical order** and print one per line.

> 💡 \`sort\` works on **string vectors too**, not just ints — strings auto-compare lexicographically. Input / target output are in the boxes below.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 Read N strings, sort alphabetically, print one per line

    return 0;
}`,
          code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    for (auto& s : v) cout << s << "\\n";
    return 0;
}`,
          hint: "vector<string> works the same with sort. Print one per line (\\n).",
          expectedOutput: `apple
banana
cherry
date`,
          stdin: `4
banana apple cherry date`,
        }
      ]
    },

    // ============================================
    // Chapter 1: Custom Sorting with Lambda
    // ============================================
    {
      id: "s23-ch1",
      title: "Custom Sorting with Lambda",
      emoji: "🔧",
      steps: [
        {
          id: "s23-ch1-why",
          type: "explain",
          title: "🤔 A situation where \`greater<int>()\` falls short",
          content: `On the previous page we used \`greater<int>()\` for descending sort. That works great with **plain numbers/strings**. But — what if the data is a student score list?

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Kim", 85}, {"Lee", 92}, {"Park", 78}
};
\`\`\`

We want to sort this **by score (second) descending**.

\`sort(students.begin(), students.end())\` alone? Pair's auto-comparison sorts by \`first\` (name). Not what we want.

\`greater<pair<string,int>>()\`? Compares the whole pair (name + score). Also not it.

> 🎯 What we actually need: **a way to spell out the comparison ourselves.**
> Something like, "for these two students, **I'll** tell sort which one comes first."

The tool for this is a **lambda**. Next page covers the syntax 👇`
        },
        {
          id: "s23-ch1-syntax",
          type: "explain",
          title: "🔧 Lambda Syntax — broken into 4 parts",
          content: `A lambda is a **disposable, anonymous function** — no name, written right where you need it. Looks alien at first, but breaking it into **4 parts** makes it simple.

\`\`\`cpp
[](int a, int b) { return a > b; }
↑↑   ↑              ↑
1 2   3              4
\`\`\`

| # | Part | Name | Role |
|---|---|---|---|
| 1 | \`[]\` | **capture list** | grabs outer variables (empty for now) |
| 2 | \`(int a, int b)\` | **parameters** | same as a regular function's parameters |
| 3 | \`{ ... }\` | **body** | function body — code like any other function |
| 4 | \`return a > b\` | **return value** | result (true/false, etc.) |

> 💡 Only \`[]\` is unfamiliar at first. The rest is essentially a regular function.

### Side-by-side with a regular function

\`\`\`cpp
// Regular function — has a name
bool compare(int a, int b) {
    return a > b;
}

// Lambda — no name, defined right where used
[](int a, int b) { return a > b; }
//   ↑              ↑
//   same params    same body
\`\`\`

**Only difference**: regular functions are declared up top; lambdas are **defined inline** at the call site.

### Compared to Python

\`\`\`python
# Python
lambda x: x * 2

# C++
[](int x) { return x * 2; }
\`\`\`

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Start marker | \`lambda\` keyword | \`[]\` brackets |
| Parameter types | none (dynamic) | required (\`int\`, \`auto\`, etc.) |
| Body marker | \`:\` then expression | \`{}\` braces + \`return\` |

### Next page — the key rule for sort lambdas: **two parameters** 👇`
        },
        {
          id: "s23-ch1-sort-lambda",
          type: "explain",
          title: "🔧 sort's lambda — **comparing two values** is the core",
          content: `Python sort's \`key=\` transformed **one** value. **C++ sort's lambda compares two values directly.**

\`\`\`cpp
[](int a, int b) { return a > b; }
       ↑     ↑              ↑
   two values to compare    if true, **a goes first**
\`\`\`

### Just memorize one rule

> 🎯 **return true → a goes first / return false → b goes first**

This one line unlocks every comparison lambda.

**Example — descending (bigger first):**
\`\`\`
a=9, b=5 → 9 > 5 = true   → 9 goes first ✅
a=2, b=8 → 2 > 8 = false  → 8 goes first ✅
Result: bigger numbers first → descending!
\`\`\`

### Plug it into sort

\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});
// v = {9, 8, 5, 2, 1}  (descending)
\`\`\`

---

### ⚠️ Common mistake — returning a value ❌

The lambda must return **only bool (true/false)**. **Returning a value (an int like \`a\` or \`b\`) causes a compile error.**

\`\`\`cpp
// ❌ Wrong — returns an int (error: inconsistent types 'bool' and 'int')
sort(v.begin(), v.end(), [](int a, int b) {
    if (a < b) return a;     // ← returning the value itself ❌
    else return b;
});

// ✅ Right — return a bool comparison only
sort(v.begin(), v.end(), [](int a, int b) {
    return a < b;             // ← "should a come before b?" true/false
});
\`\`\`

**Why**: sort asks "**should a come before b?**" and expects **YES/NO** only. If you return the value itself, sort can't interpret it.

### Tiebreaks follow the same rule

Sort by absolute value, with smaller value first on ties:

\`\`\`cpp
// ✅ Tiebreak also returns bool only
sort(v.begin(), v.end(), [](int a, int b) {
    if (abs(a) != abs(b)) return abs(a) < abs(b);   // primary: abs comparison
    return a < b;                                    // tiebreak: smaller value first
});
\`\`\``
        },
        {
          id: "s23-ch1-cheatsheet",
          type: "explain",
          title: "📋 Common lambda forms — cheatsheet",
          content: `Sort lambdas boil down to a few patterns. Memorize these and you're set:

| Lambda | Sort result | USACO scenario |
|---|---|---|
| \`[](int a, int b){ return a < b; }\` | ascending (default) | basic sort for scores, coordinates, prices |
| \`[](int a, int b){ return a > b; }\` | descending | "print rank 1 first" / "top K students" |
| \`[](int a, int b){ return abs(a) < abs(b); }\` | absolute value ascending | "nearest to origin" / "smallest change first" |
| \`[](auto a, auto b){ return a.second < b.second; }\` | by pair's second | (name, score) → by score / (time, id) → by time |
| \`[](auto a, auto b){ return a.score > b.score; }\` | struct's \`score\` descending | character (name, hp, score) sorted by score |

### 💡 \`auto\` parameters — handy for pair/struct sorting

When sorting \`pair<string, int>\`, \`tuple<...>\`, or \`struct Student\`, the type can get long. \`auto\` lets the compiler infer it for you:

\`\`\`cpp
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second < b.second;   // no need to spell out the type
});
\`\`\`

> Next page — practice the rule by hand.`
        },
        {
          id: "s23-ch1-rule-pred",
          type: "predict" as const,
          title: "Quick check — apply the lambda return rule",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a < b;
    });
    cout << v[0] << " " << v[4];
    return 0;
}`,
          options: ["1 5", "5 1", "3 5", "1 1"],
          answer: 0,
          explanation: "return a < b → a first when a is smaller → **ascending**. Sorted: {1, 1, 3, 4, 5}. v[0] = 1, v[4] = 5 → '1 5'."
        },
        {
          id: "s23-ch1-fb1",
          type: "fillblank" as const,
          title: "Lambda Descending Sort Fill-in-the-Blank",
          content: "Complete the descending sort code using a lambda!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a ___ b;  // bigger goes first\n});",
          fillBlanks: [
            { id: 0, answer: ">", options: [">", "<", ">=", "!="] }
          ],
          explanation: "If a > b returns true, a goes first. Bigger numbers first = descending order!"
        },
        {
          id: "s23-ch1-abs-mini",
          type: "practice" as const,
          title: "✋ Quick — sort by absolute value",
          content: `**Scenario**: Sort score deltas by closeness to 0.

\`\`\`
Input:  -3, 7, -1, 4, -5
Expected (sorted by |x|): -1 -3 4 -5 7
\`\`\`

\`abs(x)\` gives absolute value. Inside the lambda, just compare \`abs(a) < abs(b)\`.

> 💡 Only the comparison expression changes. Values themselves don't change.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>  // abs
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    // 👇 sort by abs(x) ascending using a lambda


    for (int x : v) cout << x << " ";
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    sort(v.begin(), v.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });

    for (int x : v) cout << x << " ";
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), [](int a, int b) { return abs(a) < abs(b); }); — only the comparison swaps to abs.",
          expectedOutput: `-1 -3 4 -5 7 `
        },
        {
          id: "s23-ch1-pair",
          type: "explain",
          title: "🔧 Sort Pairs by Any Criterion!",
          content: `Now let's sort pairs by score!

\`\`\`cpp
vector<pair<string, int>> v = {{"Kim", 85}, {"Lee", 92}, {"Park", 78}};

// Sort by score (second) in descending order
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;  // higher score goes first
});
// Result: Lee(92) → Kim(85) → Park(78)
\`\`\`

💡 Use \`auto\` to avoid writing out the full type!

**Two-criteria sort (1st: score descending, ties: name ascending):**
\`\`\`cpp
sort(v.begin(), v.end(), [](auto a, auto b) {
    if (a.second != b.second)
        return a.second > b.second;  // higher score first
    return a.first < b.first;        // tied score: alphabetical
});
\`\`\`

> 🎯 **How USACO uses it:**
> • **Coordinate sorting** — \`pair<int, int>\` as (x, y) points. Sort by y, ties by x.
> • **Event sorting** — (start time, event id). Process in chronological order.
> • **Leaderboards** — (name, score). Descending by score, ties alphabetical.
> • **Distance + index** — (distance, original index). Sort by distance, recover original index.
> Almost every Bronze problem that pairs two values uses this.`
        },
        {
          id: "s23-ch1-pred1",
          type: "predict" as const,
          title: "Predict the pair Sort Result!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<pair<string,int>> v = {{"Kim",85},{"Lee",92},{"Park",78}};
    sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    cout << v[0].first;
    return 0;
}`,
          options: ["Kim", "Lee", "Park", "Compile Error"],
          answer: 1,
          explanation: "After descending score sort: Lee(92) → Kim(85) → Park(78). v[0].first is Lee!"
        },
        {
          id: "s23-ch1-fb2",
          type: "fillblank" as const,
          title: "pair Score Sort Fill-in-the-Blank",
          content: "Complete the lambda to sort pairs by score (second) in ascending order!",
          code: "sort(v.begin(), v.end(), [](auto a, auto b) {\n    return a.___ < b.___;\n});",
          fillBlanks: [
            { id: 0, answer: "second", options: ["second", "first", "score", "value"] },
            { id: 1, answer: "second", options: ["second", "first", "score", "value"] }
          ],
          explanation: "The second value in a pair is accessed with .second. a.second < b.second means a goes first → ascending order!"
        },
        {
          id: "s23-ch1-pair-practice",
          type: "practice" as const,
          title: "✋ From scratch — pair vector sorted by score descending",
          content: `**Problem**: Given N students (name, score), sort by **score descending** and print one per line as \`name score\`.

> 💡 In the lambda: \`a.second > b.second\` — bigger score goes first. Use structured bindings (\`auto& [name, score] : v\`) for clean output. Input / target output in the boxes below.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 👇 Sort by .second descending using a lambda

    // 👇 Print one per line as "name score"

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    for (auto& [name, score] : v) {
        cout << name << " " << score << "\\n";
    }
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), [](auto a, auto b) { return a.second > b.second; }); — auto parameters take a pair. Print with range-for + structured bindings.",
          expectedOutput: `Bob 95
Carol 88
Alice 78
Dave 60`,
          stdin: `4
Alice 78
Bob 95
Carol 88
Dave 60`,
        },
        {
          id: "s23-ch1-must-lambda",
          type: "practice" as const,
          title: "🎯 When lambda is **truly necessary** — multi-key sorting",
          content: `This problem genuinely cannot be solved without a lambda.

**Problem**: 5 students with (name, score).
**Sort by score descending, breaking ties by name ascending (alphabetical)**, then print.

\`\`\`
Input:
  Kim    88
  Lee    95
  Park   88
  Choi   72
  Han    95

Expected output (score↓, then name↑):
  Han 95
  Lee 95
  Kim 88
  Park 88
  Choi 72
\`\`\`

> 💡 Plain \`sort()\` sorts both fields ascending (pair auto-compare).
> \`greater<>()\` sorts both descending.
> **"score descending, but name ascending"** — mixed directions like this can only be done with a **lambda**.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    // 👇 Pass a lambda as sort's 3rd argument:
    //    Primary: score (second) descending
    //    Tiebreaker: name (first) ascending


    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    sort(students.begin(), students.end(), [](auto a, auto b) {
        if (a.second != b.second) return a.second > b.second;  // score descending
        return a.first < b.first;                                // name ascending
    });

    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          hint: "Inside the lambda, if-else pattern: if (a.second != b.second) return a.second > b.second; (score descending) / when scores tie: return a.first < b.first; (name ascending)",
          expectedOutput: `Han 95
Lee 95
Kim 88
Park 88
Choi 72`
        },
        {
          id: "s23-ch1-string-practice",
          type: "practice" as const,
          title: "✋ From scratch — sort strings by length (lambda works on string too)",
          content: `**Problem**: Given N strings, sort by **length ascending**, breaking ties alphabetically.

> 💡 Lambdas work the same on int, pair, **and string**. Use \`s.length()\` (or \`s.size()\`) to compare lengths; \`<\` on strings is lexicographic. Input / target output in the boxes below.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 👇 Sort by length ascending, then alphabetically on ties

    // 👇 Print one per line

    return 0;
}`,
          code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        if (a.length() != b.length()) return a.length() < b.length();
        return a < b;
    });
    for (auto& s : v) cout << s << "\\n";
    return 0;
}`,
          hint: "lambda: if (a.length() != b.length()) return a.length() < b.length(); return a < b; — different lengths use length, same length falls back to alphabetical. const string& avoids copies.",
          expectedOutput: `hi
ok
cat
apple
banana`,
          stdin: `5
banana hi apple ok cat`,
        }
      ]
    },

    // ============================================
    // Chapter 2: Wrap-up — sort basics done!
    // ============================================
    {
      id: "s23-wrap",
      title: "Wrap-up",
      emoji: "🎉",
      steps: [
        {
          id: "s23-wrap-done",
          type: "explain",
          title: "🎉 sort basics done! What's next?",
          content: `You've mastered **sort basics**:

- **sort(v.begin(), v.end())** — sort in one line
- **Custom criteria** with lambda (descending, by absolute value, multi-key)
- **Pair sorting** — bundle two values, sort by one or both

That's enough for almost any "sorting" part of a USACO Bronze problem.

---

### 🎯 Next lesson — Fast Search on Sorted Data (cpp-25)

What sorting unlocks. Questions like "is x in there?", "first ≥ x?", "how many of x?" all answered in **O(log n)**. Tools: **binary_search**, **lower_bound**, **upper_bound**.

### 📌 After that (optional, advanced) — Sort Application Patterns (cpp-26)

Dedup (sort + unique + erase), preserving tie order (stable_sort), lambda + general STL (count_if, find_if, accumulate). **Not required for Bronze** — come back when you have time.

---

💡 We split the original "sort master" into three so each lesson stays focused. **Same flow underneath**: "sort it → search it fast → use the sort." Take them one at a time.`
        }
      ]
    }

  ]
}
