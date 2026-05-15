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

💡 No third argument = ascending by default!`
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
\`\`\``
        },
        {
          id: "s23-ch1-cheatsheet",
          type: "explain",
          title: "📋 Common lambda forms — cheatsheet",
          content: `Sort lambdas boil down to a few patterns. Memorize these and you're set:

| Lambda | Sort result |
|---|---|
| \`[](int a, int b){ return a < b; }\` | ascending (sort default) |
| \`[](int a, int b){ return a > b; }\` | descending |
| \`[](int a, int b){ return abs(a) < abs(b); }\` | absolute value ascending |
| \`[](auto a, auto b){ return a.second < b.second; }\` | by pair's second |

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
    // Chapter 2: Searching in Sorted Arrays
    // ============================================
    {
      id: "s23-ch2",
      title: "Searching in Sorted Arrays",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch2-linear",
          type: "animation" as const,
          title: "🔎 Linear Search — Checking One by One",
          component: "linearSearch",
          content: `You've now mastered sort. There's another big reason sorted data matters — **search becomes much faster.** Let's get into that.

First, see what happens when data is **not** sorted. Imagine finding **"Kim"** in a phone book.

The simplest approach: flip through **one page at a time** from page 1.

Page 1... nope. Page 2... nope. Page 3...

A 500-page book could take **500 checks** in the worst case. Arrays are the same — **1 million elements = up to 1 million checks.**

Press the button to follow along!`,
        },
        {
          id: "s23-ch2-binary",
          type: "animation" as const,
          title: "⚡ Binary Search — Open the Middle First",
          component: "binarySearch",
          content: `When looking for "Kim" in a phone book, do you start at page 1?

**No.** K is around the middle of the alphabet, so naturally you **open to the middle.**

This only works for one reason — **the phone book is alphabetically sorted.**
Without sorting, you'd have no idea where to look, so you'd have to start at page 1.

**Binary search turns this intuition into an algorithm:**

Open the middle (page 250): "Park" → Kim is before! **Skip the last 250 pages.**
Open the new middle (page 125): "Lee" → Kim is before! **Cut in half again.**
Keep halving — **500 pages found in just 9 checks.**

**Sort → enables binary search → much faster!**
This is why we learn sort before binary search.

Press the button to follow along!`,
        },
        {
          id: "s23-ch2-sorted-toolbox",
          type: "explain",
          title: "🗝️ Sorting is the launchpad — a toolbox that opens up after one sort",
          content: `## 🚀 The big picture for this chapter

> 🎯 **"Things that suddenly become possible once you sort."**

This chapter throws a bunch of functions at you (\`binary_search\`, \`lower_bound\`, \`upper_bound\`, \`unique\`...). **Memorizing them one at a time will fry your brain.** They're really **all variations on one idea (the magic that sorting unlocks)**.

---

### 📊 Unsorted vs Sorted — same question, different tools

| What you want | Unsorted (before) | After sorting (this chapter) |
|---|---|---|
| "is x there?" | \`find\` — O(N) scan | **\`binary_search\`** — O(log N) |
| "how many of x?" | \`std::count\` — O(N) | **\`upper - lower\`** — O(log N) |
| **"first ≥ x?"** | \`find_if\` works but O(N) | **\`lower_bound(x)\`** — O(log N) |
| **"insert while staying sorted"** | painful | **\`insert(lower_bound(x), x)\`** |
| **"dedupe (keeping a vector)"** | write it by hand | **\`sort + unique + erase\`** one line |

On a million elements: 1,000,000 comparisons vs ~20 comparisons. **One sort buys you that much.**

---

### ❓ Common questions

**Q1. Can't \`find\` already get "first student ≥ 70"?**

\`find(v, 70)\` looks for elements **equal to 70**. It can't take a **condition** like "≥". \`find_if(v, [](int x){ return x >= 70; })\` *does* take a condition, but it **scans from the beginning** in O(N). Only \`lower_bound\` halves the range each step → **O(log N)** for the same answer.

**Q2. Why not just use \`set\` for dedupe?**

\`set\` does dedupe automatically — but the result is a **set**, not a vector. \`set\` is a tree internally, so it **uses more memory and can't do \`v[i]\` index access.** When you want **a vector that stays a vector** while being deduped fast, \`sort + unique + erase\` is the standard pattern. (For simple cases, \`set\` is fine too.)

---

### 🔑 Why is sorting so powerful?

When data is sorted, **"look at the middle: if it's X, the answer is only on one side"** becomes possible. Each comparison throws away half the data. That's binary search — and every tool below sits on top of that idea.

> 💡 **Student takeaway:** "Sorting isn't the end — it's the **start**. One sort = all these tools unlocked at once."

The next pages introduce them one by one. Whenever "wait, why bother?" hits, come back to this table.`
        },
        {
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 Iterators — a 1-minute primer before the next page",
          content: `The next page brings \`lower_bound\`, and instead of returning a number it returns an **iterator**. It looks scary the first time, so a quick 1-minute primer:

---

### Iterator = "a finger pointing to a position"

The \`v.begin()\` / \`v.end()\` you've been writing with sort — those are iterators. **A finger pointing at a spot inside the vector.**

\`\`\`
   10    20    30    40    50
    ↑                          ↑
 begin()                      end() (one **past** the last spot)
\`\`\`

---

### You've seen pointers? Almost the same thing

For a vector, you can treat an iterator like a pointer. The values are laid out next to each other in memory, so \`++it\` just goes to the next slot. The syntax matches too:

| | Pointer | Iterator |
|---|---|---|
| Read the value | \`*p\` | \`*it\` |
| Next position | \`p++\` | \`it++\` |
| Get the index | \`p - array\` | \`it - v.begin()\` |

> ⚠️ The real difference shows up later — in containers like \`map\` / \`set\` / \`list\` whose memory isn't contiguous, pointers can't move through them but iterators can. We'll come back to that. For now, **"basically a pointer, for vectors"** is enough.

---

### 🎯 The two formulas to memorize

When functions like \`lower_bound\` return an iterator, you'll be doing one of two things with it:

\`\`\`
   10    20    30    40    50
    ↑                ↑
 begin()             it  (points to 40)
\`\`\`

\`\`\`cpp
cout << *it;             // 40   ← *it is the value
cout << it - v.begin();  // 3    ← convert to index
\`\`\`

> 💡 \`*it\` = value, \`it - v.begin()\` = index. **Memorize these two lines** and the next page flows easily.`
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 binary_search / lower_bound / upper_bound — the binary search trio",
          content: `Instead of writing binary search by hand every time, C++ provides **three functions** — same family:

\`\`\`cpp
binary_search(v.begin(), v.end(), x);  // is x in there? → true / false
lower_bound (v.begin(), v.end(), x);   // where x starts
upper_bound (v.begin(), v.end(), x);   // one past where x ends
\`\`\`

⚠️ **Sorted arrays only!** (it's binary search inside)

---

**Picture it — finding value 3**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (val=3)     (val=3)
"3 starts"   "after 3 ends"
\`\`\`

- **binary_search(x)** → is \`x\` in the array? **true / false**
- **lower_bound(x)** → first position where value **≥ x** = "where x starts"
- **upper_bound(x)** → first position where value **> x** = "one past where x ends"

> 💡 Don't dig deeper — the **picture + three-line description** is enough. Which one to use in which situation comes on the next page.`
        },
        {
          id: "s23-ch2-trio-quiz",
          type: "quiz" as const,
          title: "Which of the trio do you reach for?",
          content: "You have a sorted \`vector<int> v\`. If you only need to know **whether 7 is in the array (yes / no)**, which one is the cleanest pick?",
          options: [
            "`binary_search(v.begin(), v.end(), 7)`",
            "`lower_bound(v.begin(), v.end(), 7)`",
            "`upper_bound(v.begin(), v.end(), 7)`"
          ],
          answer: 0,
          explanation: "**`binary_search`** is the one that asks exactly \"is it there?\" — it returns true/false, the most direct answer. lower_bound and upper_bound return **positions**, so checking existence with them takes one extra step (e.g. `lower_bound != upper_bound`)."
        },
        {
          id: "s23-ch2-lb-missing",
          type: "explain",
          title: "🔍 What if the value isn't there? — the insertion slot",
          content: `Even when the value **isn't in the array**, \`lower_bound\` doesn't error out — it returns a number. That number is **"the slot this value would go into if you wanted to keep the array sorted."**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4 isn't here — "where would 4 go?"
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← right before 5 (where 4 belongs)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← same spot (when value's missing, start = end)

// 10 is bigger than everything — "put it at the very end"
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  ← v.end() position (= v.size())
\`\`\`

This is what makes lower_bound **stronger than just "return a position":** it gives you a **meaningful** position whether the value exists or not — "where it is, or where it would go."

---

**Putting it to use — "insert while staying sorted":**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
int x = 4;
v.insert(lower_bound(v.begin(), v.end(), x), x);
// v = {1, 3, 4, 5, 7, 9}  ← still sorted!
\`\`\`

---

> ⚠️ **Don't use the \`lower == upper\` trick just to check existence.** The intent is unclear. → **\`binary_search(v.begin(), v.end(), x)\`** is the right answer (from the earlier page). Those two iterators landing on the same spot is a **side effect** of lower_bound's design, not its purpose.`
        },
        {
          id: "s23-ch2-lb-patterns",
          type: "explain",
          title: "🎯 3 usage patterns",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};

// ① How many 3s are there?
int count = upper_bound(v.begin(), v.end(), 3)
          - lower_bound(v.begin(), v.end(), 3);
// 3 - 1 = 2!

// ② Does a value exist? — binary_search() is simpler!
if (binary_search(v.begin(), v.end(), 3)) cout << "found";
else cout << "not found";

// ③ When you need the position — use lower_bound
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();
cout << idx;  // 1
\`\`\`

> 💡 The trio is one family but they **return different things**, so they're used differently. Next page covers a common trap.

> 🎯 **USACO usage you'll see often with lower_bound:**
> • **"First ≥ threshold"** — sorted prices → "cheapest item costing ≥ $50K" / sorted times → "first meeting after now."
> • **"Largest ≤ threshold"** — <code>lower_bound(x+1) - 1</code> for "most expensive item within budget."
> • **"How many in this range?"** — <code>upper_bound(b) - lower_bound(a)</code> = points in [a, b].
> • **Coordinate compression** (Silver+) — relabel values as 0, 1, 2... using <code>lower_bound</code>.
> Sorted data + boundary query = lower_bound. The default tool in USACO.`
        },
        {
          id: "s23-ch2-patterns-fb",
          type: "fillblank" as const,
          title: "✋ Try it — how many 5s?",
          content: "In the sorted \`vector<int> v = {1, 2, 5, 5, 5, 7}\`, find **how many 5s** there are in one line. (upper-lower pattern)",
          code: "vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = ___(v.begin(), v.end(), 5)\n        - ___(v.begin(), v.end(), 5);\ncout << cnt;  // 3",
          fillBlanks: [
            { id: 0, answer: "upper_bound", options: ["upper_bound", "lower_bound", "binary_search", "count"] },
            { id: 1, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "count"] }
          ],
          explanation: "**\"one past end - start\" = count.** upper_bound points one past the last occurrence, lower_bound points to the first. Subtracting gives the number of times the value appears. 5 sits at indices 2, 3, 4 → 3 occurrences."
        },
        {
          id: "s23-ch2-lb-vs-count",
          type: "explain",
          title: "🤔 Wait — doesn't \`count()\` also count occurrences?",
          content: `Yes! \`std::count\` (the standard algorithm) also counts:

\`\`\`cpp
int cnt = count(v.begin(), v.end(), 3);   // works even on unsorted data
\`\`\`

**So what's the difference?**

| | \`count()\` | \`upper - lower\` |
|---|---|---|
| Sorted required? | ❌ No | ✅ Must be sorted |
| Speed | **O(n)** — scans everything | **O(log n)** — binary search |
| Counting in 1M elements | 1,000,000 comparisons | ~20 comparisons |

**Trap:** "So I'll just sort once and use upper-lower!" → ❌. \`sort\` itself is O(n log n) — for a **single** count, plain \`count()\` is faster.

✅ **When upper-lower really shines:**
- Data is **already** sorted
- You need to count **many times** on the same data (sort once → each query is O(log n))

Common in competitive programming; in everyday code \`count()\` is more typical.

---

### ⚠️ Heads up — \`count\` appears in **two places**

In the next lesson (map) you'll see \`m.count(key)\`. Same name, **completely different function.**

| | \`std::count(v.begin, v.end, x)\` | \`m.count(key)\` |
|---|---|---|
| Whose function? | algorithm (external) | **member** of map / set |
| Used on | vector, plain ranges | map, set |
| Speed | O(n) — scans the range | **O(log n)** — walks the tree directly |
| Answer | how many equal to \`x\` | does the key exist (0/1 for map, real count for multiset) |

> 💡 Same name, **different functions.** vector's \`std::count\` is slow, but map's \`m.count\` is fast because map keeps a tree inside — no sort needed. We'll revisit this in the next lesson.`
        },
        {
          id: "s23-ch2-lb-vs-bs",
          type: "explain",
          title: "🆚 binary_search() vs lower_bound — when to use which?",
          content: `| | binary_search() | lower_bound() |
|---|---|---|
| Returns | true / false | position (iterator) |
| Use when | just checking existence | need position or count |
| Code | short, intuitive | longer but more powerful |

\`\`\`cpp
// Just "is 5 there?" → binary_search
binary_search(v.begin(), v.end(), 5)  // true

// "What index is 5 at?" → lower_bound
lower_bound(v.begin(), v.end(), 5) - v.begin()  // 3
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x in v\` | \`binary_search(v.begin(), v.end(), x)\` |
| \`bisect.bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect.bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |`
        },
        {
          id: "s23-ch2-quiz1",
          type: "quiz",
          title: "Binary search prerequisite!",
          content: "Given an **unsorted** vector \`v = {3, 1, 4, 1, 5}\`, what does \`binary_search(v.begin(), v.end(), 4)\` return?",
          options: [
            "true (since 4 is in the vector)",
            "false (auto-detects unsorted)",
            "**Unpredictable** — binary search only works on sorted arrays. Result is implementation-defined / undefined behavior.",
            "Compile error"
          ],
          answer: 2,
          explanation: "**`binary_search`, `lower_bound`, and `upper_bound` only work correctly on sorted arrays.** Calling them on unsorted data compiles, but the result is **undefined behavior** — could be true, false, or anything. Always `sort()` first!"
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "⚠️ Watch out — what if the value is bigger than everything?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

lower_bound(v.begin(), v.end(), 10) - v.begin();
// → 5 (out of range, v[5] doesn't exist!)
\`\`\`

If nothing in the array is ≥ x, lower_bound returns the **\`v.end()\` position (= index \`v.size()\`)**. Reading \`v[5]\` here is reading invalid memory → crash territory.

---

**Safe usage pattern**

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

if (it != v.end() && *it == x) {
    int idx = it - v.begin();
    cout << idx;       // only when x truly exists
}
\`\`\`

> 💡 \`it != v.end()\` confirms **in range**, \`*it == x\` confirms **the exact value**. Both must hold before you access it.`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "lower_bound Fill-in-the-Blank",
          content: "Find the first index where 4 or greater appears in the sorted vector!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound returns an iterator to the first position ≥ the target value. Subtract v.begin() to get the index. 4 first appears at index 2!"
        },
        {
          id: "s23-ch2-practice1",
          type: "practice" as const,
          title: "✋ From scratch — check existence with binary_search",
          content: `**Problem**: An **already-sorted** vector of N ints is given, then a target value \`x\` on the next line. Print \`Yes\` if \`x\` is present, otherwise \`No\`.

\`\`\`
Input:  5
        1 3 5 7 9
        5
Output: Yes

Input:  5
        1 3 5 7 9
        4
Output: No
\`\`\`

> 💡 \`binary_search(v.begin(), v.end(), x)\` returns **true / false**. The simplest function for "does it exist?" questions.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 Use binary_search to check if x exists → print "Yes" or "No"

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
    int x;
    cin >> x;
    if (binary_search(v.begin(), v.end(), x)) cout << "Yes";
    else cout << "No";
    return 0;
}`,
          hint: "if (binary_search(v.begin(), v.end(), x)) cout << \"Yes\"; else cout << \"No\"; — for existence-only checks, binary_search is the cleanest.",
          expectedOutput: `Yes`,
          stdin: `5
1 3 5 7 9
5`,
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "Predict lower_bound & upper_bound Output!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {2, 4, 4, 6, 8};
    auto lo = lower_bound(v.begin(), v.end(), 4);
    auto hi = upper_bound(v.begin(), v.end(), 4);
    cout << (lo - v.begin()) << " " << (hi - lo);
    return 0;
}`,
          options: ["1 2", "2 2", "1 1", "2 1"],
          answer: 0,
          explanation: "lower_bound(4) → index 1 (first 4). upper_bound(4) → index 3 (position of 6). hi - lo = 3 - 1 = 2 (4 appears twice). Output: 1 2"
        },
        {
          id: "s23-ch2-practice2",
          type: "practice" as const,
          title: "✋ From scratch — count occurrences (upper - lower pattern)",
          content: `**Problem**: An **already-sorted** vector of N ints is given, then a target value \`x\` on the next line. Print **how many times** \`x\` appears in the array.

\`\`\`
Input:  6
        1 3 3 3 5 7
        3
Output: 3

Input:  5
        1 2 4 6 8
        4
Output: 1

Input:  5
        1 3 5 7 9
        4
Output: 0
\`\`\`

> 💡 \`upper_bound(...) - lower_bound(...)\` — the chapter's core application pattern. The difference between the two iterators **is** the count.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 Print the count using upper_bound - lower_bound

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
    int x;
    cin >> x;
    auto lo = lower_bound(v.begin(), v.end(), x);
    auto hi = upper_bound(v.begin(), v.end(), x);
    cout << (hi - lo);
    return 0;
}`,
          hint: "auto lo = lower_bound(v.begin(), v.end(), x); auto hi = upper_bound(v.begin(), v.end(), x); cout << (hi - lo); — the iterator difference is the count. Missing → hi == lo → 0.",
          expectedOutput: `3`,
          stdin: `6
1 3 3 3 5 7
3`,
        }
      ]
    },

    // ============================================
    // Chapter 3: Advanced Patterns
    // ============================================
    {
      id: "s23-ch3",
      title: "Advanced Patterns",
      emoji: "🧹",
      steps: [
        {
          id: "s23-ch3-unique",
          type: "explain",
          title: "🧹 sort + unique — Removing Duplicates",
          content: `> 📌 **Advanced pattern — rarely needed in USACO Bronze, common from Silver onwards**

### When do you actually use this?

Two situations where \`sort + unique\` show up in USACO:

1. **"How many distinct values?"** — input has duplicates and you want the *count of unique values*
   > Example: "How many *distinct* cow names entered the farm?"

2. **Coordinate compression (Silver+)** — when coordinates can be up to 10⁹ but N is only 10⁵, you **renumber the values as 0, 1, 2, ...** so you can index arrays by them. The standard \`sort + unique + lower_bound\` combo.

Outside those, \`set\` is usually cleaner. \`sort + unique + erase\` is for **keeping a vector** while deduping.

---

### The code itself is simple

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// Step 1: sort (unique only removes "adjacent duplicates" → sort first)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// Step 2: unique + erase in one line
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

⚠️ **Sort first!** \`unique\` only looks at adjacent duplicates. Calling unique on unsorted \`{1, 3, 1}\` keeps all 3.

---

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase(unique(...))\` |

💡 **Memorize**: \`sort\` → \`v.erase(unique(v.begin(), v.end()), v.end())\` — these two lines as **a set**. Then you can drop them into any coordinate compression / dedupe scenario. Next page — **why** we need erase.`
        },
        {
          id: "s23-ch3-unique-detail",
          type: "explain",
          title: "🤔 Wait — why do we need \`erase\`? What if we only call \`unique\`?",
          content: `Once you see what \`unique\` **actually** does, why \`erase\` is its partner becomes obvious.

### What unique really does

\`unique\` **doesn't shrink the vector.** It just moves unique values to the front and returns an iterator marking "this is where the real end is."

\`\`\`
v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}   right after sort (size = 10)

↓ auto it = unique(v.begin(), v.end());  ← no erase

v = {1, 2, 3, 4, 5, 6, 9, ?, ?, ?}   size is still 10!
                          ↑
                          it points here
                          past this is leftover garbage (meaningless)
\`\`\`

\`v.size()\` would still print 10. The first 7 are real; the last 3 are **traces** left in memory.

---

### Quick erase syntax refresher

To **trim a range** from a vector, use \`erase(begin, end)\` — it cuts out everything between two iterators.

\`\`\`cpp
vector<int> v = {10, 20, 30, 40, 50};

v.erase(v.begin() + 1, v.begin() + 4);
//     ↑                ↑
//   from here        up to (not including) here

// Result: v = {10, 50}   (20, 30, 40 removed)
\`\`\`

| Form | Meaning |
|---|---|
| \`v.erase(it)\` | remove **the single element** at iterator \`it\` |
| \`v.erase(start, end)\` | remove the **\`[start, end)\` range** entirely |

---

### Putting unique + erase together

\`\`\`cpp
v.erase( unique(v.begin(), v.end()),  v.end() );
//        ↑                            ↑
//   "real end" position (it)     vector's real end
//          ───────  trim the garbage between  ───────
\`\`\`

erase from the **real end** (returned by unique) up to \`v.end()\` — that's the famous pattern.

> 💡 Remember: \`unique\` only **moves things**, size stays. To truly shrink it, pair with \`erase\`.`
        },
        {
          id: "s23-ch3-unique-practice",
          type: "practice" as const,
          title: "✋ From scratch — print count after dedup",
          content: `**Problem**: Given N integers, print **how many distinct values** remain after deduplication.

\`\`\`
Input:  8
        3 1 4 1 5 9 2 6
Output: 7

Input:  5
        2 2 2 2 2
Output: 1
\`\`\`

> 💡 \`sort\` → \`erase(unique(...), end())\` pattern, then print \`v.size()\`. One-liner after the setup.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 👇 sort + unique + erase, then print v.size()

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
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}`,
          hint: "sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end()); cout << v.size(); — sort first (unique only removes adjacent duplicates).",
          expectedOutput: `7`,
          stdin: `8
3 1 4 1 5 9 2 6`,
        },
        {
          id: "s23-ch3-stable",
          type: "explain",
          title: "📊 stable_sort — preserves original order on ties",
          content: `> 📌 **Advanced — rare in USACO Bronze. Just knowing "this exists" is enough**

### What problem does stable_sort solve?

\`sort()\` is fast but has **one downside**: when several elements have the same value, **their order among themselves is not guaranteed.**

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Alice", 90}, {"Bob", 80}, {"Carol", 90}, {"Dave", 80}
};

sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;   // score descending
});
\`\`\`

Will Alice and Carol (both 90) stay in **input order (Alice first)**? **\`sort\` doesn't guarantee it.** Different compilers/implementations may give different results.

---

### \`stable_sort\` — keeps input order on ties

\`\`\`cpp
stable_sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;
});
// → ties always keep input order (Alice → Carol, Bob → Dave)
\`\`\`

Same arguments, just swap the function name.

---

### Comparison

| | \`sort\` | \`stable_sort\` |
|---|---|---|
| Speed | faster — O(N log N) | slightly slower — O(N log² N) |
| Tie order | random (not guaranteed) | keeps input order ✅ |
| When | 99% of cases | when tie order matters |

---

### When is it actually needed?

Usually **not.** The real cases:

1. **Ranking output** where tied students should appear in input order
2. **Re-sorting already-sorted data** by a second key — keeping the first ordering for ties
   > Example: sort students by name first, then sort by score. Same-score students stay in alphabetical order.

USACO Bronze problems usually have a fixed expected output, so \`sort\` is enough. **Come back to \`stable_sort\` only when a problem says "tie order matters."**

> 💡 **One-line takeaway**: \`sort\` 99% of the time. When a problem explicitly cares about tie order, change one word to \`stable_sort\`.`
        },
        {
          id: "s23-ch3-stable-practice",
          type: "practice" as const,
          title: "✋ From scratch — try stable_sort yourself",
          content: `**Problem**: 4 students (name, score). Sort by score descending, **preserving input order on ties**.

> 💡 Use \`stable_sort\` + lambda for descending score. Ties auto-preserve input order. Input / target output in the boxes below.`,
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
    // 👇 stable_sort with descending score (ties keep input order)

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
    stable_sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    for (auto& [name, score] : v) {
        cout << name << " " << score << "\\n";
    }
    return 0;
}`,
          hint: "stable_sort(v.begin(), v.end(), [](auto a, auto b) { return a.second > b.second; }); — just swap sort for stable_sort.",
          expectedOutput: `Alice 90
Carol 90
Bob 80
Dave 80`,
          stdin: `4
Alice 90
Bob 80
Carol 90
Dave 80`,
        },
      ]
    },

    // ============================================
    // Chapter 4: Lambda + general STL algorithms
    // ============================================
    {
      id: "s23-ch4",
      title: "Lambda + General STL Algorithms",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch4-intro",
          type: "explain",
          title: "🤔 Does sort's lambda work elsewhere?",
          content: `> 📌 **Advanced — a plain <code>for</code> loop is usually clearer for Bronze. This chapter shows "cleaner expressions"**

Remember the lambda comparator you passed to \`sort\`?

\`\`\`cpp
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
\`\`\`

That \`(begin, end, lambda)\` pattern works in almost every function in \`<algorithm>\`:

- "**count matching a condition**" → \`count_if\`
- "**first match of a condition**" → \`find_if\`
- "**sum of everything**" → \`accumulate\` (\`<numeric>\` header)

---

### Honest take for Bronze students

These functions **shorten a \`for\` loop you could already write.** That doesn't mean for loops are bad — for Bronze, this is often clearer:

\`\`\`cpp
int cnt = 0;
for (int x : scores) if (x >= 80) cnt++;
\`\`\`

You *can* compress that into one \`count_if\` line, but **you don't have to**. Going from 5 lines to 1 line matters for **experienced readers scanning code fast**. For students, the for loop is more intuitive.

> 💡 **Goal of this chapter**: "be aware these exist" so when you read someone else's \`count_if\` code you can decode it. **You don't need to use these yourself.** for loops are fine.`
        },
        {
          id: "s23-ch4-count-if",
          type: "explain",
          title: "🔢 count_if — count matches",
          content: `> 📌 Advanced — for loop is more intuitive. Knowing this "exists" is enough

**Problem:** How many students scored 80 or higher?

### Method A — for loop (clearer for Bronze)

\`\`\`cpp
int cnt = 0;
for (int x : scores) {
    if (x >= 80) cnt++;
}
\`\`\`

### Method B — \`count_if\` one-liner

\`\`\`cpp
int cnt = count_if(scores.begin(), scores.end(),
                   [](int x){ return x >= 80; });
\`\`\`

---

### Argument structure (same as sort)

| Position | Meaning |
|---|---|
| 1st | Start iterator (\`v.begin()\`) |
| 2nd | End iterator (\`v.end()\`) |
| 3rd | **Predicate (lambda returning bool)** — true → counted |

---

### \`count\` vs \`count_if\` — don't mix up

- \`count(b, e, x)\` — count elements **equal to x**
- \`count_if(b, e, pred)\` — count elements **matching a lambda condition** (much more flexible)

---

### When is it actually worth using?

- When you want the **reader** to immediately see your intent — \`count_if(scores, x >= 80)\` reads as "count high scorers"
- When the **condition is complex** (multiple captured variables, AND/OR combinations)
- In **contests** when you want to shorten code

> 💡 Bottom line: **for Bronze, a \`for\` loop is more readable.** \`count_if\` is just nice to recognize. Reading other people's code is the main use.`
        },
        {
          id: "s23-ch4-count-if-predict",
          type: "predict" as const,
          title: "Predict the output",
          content: `\`\`\`cpp
vector<int> v = {10, 25, 30, 45, 50, 65};
int cnt = count_if(v.begin(), v.end(),
                   [](int x){ return x % 5 == 0 && x > 30; });
cout << cnt;
\`\`\`

What is cnt?`,
          options: ["4", "3", "2", "5"],
          answer: 1,
          explanation: "Multiples of 5 strictly greater than 30: 45, 50, 65 → 3. (10, 25, 30 fail the > 30 part.)"
        },
        {
          id: "s23-ch4-find-if",
          type: "explain",
          title: "🎯 find_if — first match",
          content: `> 📌 Advanced — for loop + <code>break</code> is usually more intuitive

**Problem:** Find the first even number in a vector.

### Method A — for loop (most common in Bronze)

\`\`\`cpp
int answer = -1;   // -1 if not found
for (int x : v) {
    if (x % 2 == 0) {
        answer = x;
        break;
    }
}
\`\`\`

### Method B — \`find_if\` one-liner

\`\`\`cpp
vector<int> v = {3, 7, 4, 9, 6};
auto it = find_if(v.begin(), v.end(),
                  [](int x){ return x % 2 == 0; });

if (it != v.end()) {
    cout << *it;        // 4
} else {
    cout << "not found";
}
\`\`\`

---

### Key pattern (for Method B)

- \`find_if\` returns an **iterator** (not a value)
- If not found, returns \`v.end()\` → check with \`!= v.end()\`
- To use the value, dereference: \`*it\`
- For an index: \`it - v.begin()\`

---

### \`find\` vs \`find_if\` — don't mix up

- \`find(b, e, x)\` — find the **value x** itself (e.g. "first position equal to 5")
- \`find_if(b, e, pred)\` — find the **first element matching a lambda** (e.g. "first even number")

---

### If the vector is sorted, \`lower_bound\` is faster

⚠️ For a question like "first student ≥ 70":
- Unsorted vector → \`find_if\` is O(N)
- Sorted vector → \`lower_bound\` is O(log N) ← **faster**

> 💡 Bottom line: in Bronze, **for loop + break** is usually clearest. \`find_if\` is for shortening complex-lambda conditions. Sorted big data → use \`lower_bound\` instead.`
        },
        {
          id: "s23-ch4-accumulate",
          type: "explain",
          title: "➕ accumulate — sum (or product, or anything)",
          content: `> 📌 Advanced — for loop sum is more intuitive in Bronze. accumulate is good to recognize

**Problem:** Score sum and average.

### Method A — for loop (most common in Bronze)

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};

int sum = 0;
for (int x : v) sum += x;
cout << sum;        // 100
\`\`\`

### Method B — \`accumulate\` one-liner

\`\`\`cpp
#include <numeric>     // ⚠️ Not <algorithm> — <numeric>!

int sum = accumulate(v.begin(), v.end(), 0);
//                                       ↑ initial value (sum starts at 0)
cout << sum;     // 100
\`\`\`

---

### \`accumulate\`'s real strength — initial value + custom op

For plain sums, for loop and accumulate are equivalent. But for **products or custom accumulation**, accumulate shines:

\`\`\`cpp
// Product: start at 1, pass multiplies as the 4th arg
#include <functional>
accumulate(v.begin(), v.end(), 1, multiplies<int>());   // 10*20*30*40 = 240000

// Custom via lambda: sum of squares
accumulate(v.begin(), v.end(), 0,
           [](int acc, int x){ return acc + x * x; });   // 100+400+900+1600 = 3000
\`\`\`

### Average in one line

\`\`\`cpp
double avg = (double)accumulate(v.begin(), v.end(), 0) / v.size();
\`\`\`

---

### Common pitfalls ⚠️

- Don't forget \`#include <numeric>\`. Easy to miss → compile error.
- If the initial value is \`int\`, the result is \`int\` — for large sums use \`0LL\` (long long):
  \`\`\`cpp
  long long bigSum = accumulate(v.begin(), v.end(), 0LL);   // ← 0LL matters
  \`\`\`

---

> 💡 **When it really helps**: USACO problems where the sum can exceed 10⁹ — use \`accumulate(..., 0LL)\` to avoid overflow in one line. Otherwise, a for loop is fine.`
        },
        {
          id: "s23-ch4-practice",
          type: "practice" as const,
          title: "✋ From scratch — count high scorers + total (advanced practice)",
          content: `> 📌 Advanced practice — a for loop solution is equally correct. The point is to try \`count_if\` / \`accumulate\` once.

**Problem:** Read 5 student scores, then print:
1. How many scored 80 or higher
2. The total sum

on one line, separated by a single space.

> 💡 \`count_if\` for #1, \`accumulate\` for #2 — each one line.
> ⚠️ \`accumulate\` needs \`<numeric>\`!`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    // 👇 count of scores >= 80, total sum, print on one line

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    int high = count_if(scores.begin(), scores.end(),
                        [](int x){ return x >= 80; });
    int total = accumulate(scores.begin(), scores.end(), 0);
    cout << high << " " << total << endl;
    return 0;
}`,
          hint: "count_if(scores.begin(), scores.end(), [](int x){ return x >= 80; }); + accumulate(scores.begin(), scores.end(), 0); — two lines, done.",
          expectedOutput: `3 380`,
          stdin: `90 65 80 75 70`,
        },
        {
          id: "s23-ch4-summary",
          type: "explain",
          title: "🎉 Lesson 23 Complete! sort + STL algorithms!",
          content: `## 🏆 Lesson 23 Done! Amazing work!

### 📊 sort Basics
- **sort(v.begin(), v.end())** → ascending (default)
- **sort(v.begin(), v.end(), greater<int>())** → descending
- Requires \`#include <algorithm>\`!

### 🔧 Lambda
- **Syntax:** \`[](type a, type b) { return a > b; }\`
- **Rule:** return true → first argument (a) goes first
- Essential for custom sort criteria (pair, struct, etc.)
- \`greater<int>()\` is a pre-built descending lambda

### 🔍 lower_bound & upper_bound
- **Must use on sorted arrays only!** (binary search under the hood)
- **lower_bound(begin, end, x)**: first position where value **≥ x**
- **upper_bound(begin, end, x)**: first position where value **> x**
- Convert to index: \`- v.begin()\`

### 🧹 Advanced Pattern
- **sort + erase(unique(...), end())**: remove duplicates (memorize as a set!)
- **stable_sort**: preserve original order on ties

### 🔍 Lambda + general STL algorithms ⭐ NEW
- **count_if(b, e, pred)** — count elements matching a predicate
- **find_if(b, e, pred)** — first iterator matching a predicate
- **accumulate(b, e, init)** — sum / product / custom fold (\`<numeric>\` required)
- Same shape as sort: \`(begin, end, lambda)\`

### 🐍 Key Differences from Python!
| Feature | Python 🐍 | C++ ⚡ |
|---|---|---|
| Lambda syntax | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| Sort criterion | \`key=\` (transform 1 value) | comparison function (compare 2) |
| Binary search | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| Remove dups | \`sorted(set(v))\` | \`sort + erase(unique)\` |
| Conditional count | \`sum(1 for x in v if x>=80)\` | \`count_if(b, e, pred)\` |
| Sum | \`sum(v)\` | \`accumulate(b, e, 0)\` |

🚀 Next up: **map & set** — containers that stay sorted like magic!
   Then straight to **🏆 USACO Mock Contest (cpp-p3)** — the real deal!`
        }
      ]
    }
  ]
}
