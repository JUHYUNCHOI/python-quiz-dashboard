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

\`\`\`
Input:  5
        4 2 7 1 5
Output: 1 2 4 5 7
\`\`\`

> 💡 Write everything from #include to main. Read input → store in vector → sort → print.`,
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
          explanation: "**Official answer: `<algorithm>`**. `sort()` lives exactly in this header.\n\n💡 You may be thinking back to the pair note (\"`<vector>` etc. pull pair in for free\") — that's a different case:\n• **pair is a *type***: STL containers like map / set use pair *internally*, so it gets pulled in transitively.\n• **sort is a *function***: other STL headers don't use sort internally, so it doesn't get pulled in. Including only `<vector>` and calling `sort()` gives `'sort' was not declared`.\n\n**Rule: for functions, explicitly include the official header.** Types just sometimes happen to come along for free."
        },
        {
          id: "s23-ch0-practice3",
          type: "practice" as const,
          title: "✋ From scratch — sort strings alphabetically",
          content: `**Problem**: Given N strings, sort them in **alphabetical order** and print one per line.

\`\`\`
Input:  4
        banana apple cherry date
Output: apple
        banana
        cherry
        date
\`\`\`

> 💡 \`sort\` works on **string vectors too**, not just ints — strings auto-compare lexicographically.`,
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
> Something like, "for these two students, *I'll* tell sort which one comes first."

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

### Next page — the key rule for sort lambdas: *two parameters* 👇`
        },
        {
          id: "s23-ch1-sort-lambda",
          type: "explain",
          title: "🔧 sort's lambda — *comparing two values* is the core",
          content: `Python sort's \`key=\` transformed *one* value. **C++ sort's lambda compares two values directly.**

\`\`\`cpp
[](int a, int b) { return a > b; }
       ↑     ↑              ↑
   two values to compare    if true, *a goes first*
\`\`\`

### What the lambda's return means

> 🎯 **return true → a goes first / return false → b goes first**

Memorize this one rule and every comparison lambda makes sense.

**Example — descending (bigger first):**
\`\`\`
a=9, b=5 → 9 > 5 = true   → 9 goes first ✅
a=2, b=8 → 2 > 8 = false  → 8 goes first ✅
Result: bigger numbers first → descending!
\`\`\`

**Example — ascending (smaller first):**
\`\`\`cpp
[](int a, int b) { return a < b; }   // just flip the comparison
\`\`\`

### Plug it into sort

\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});
// v = {9, 8, 5, 2, 1}  (descending)
\`\`\`

### Common forms you'll see

| Lambda | Sort result |
|---|---|
| \`[](int a, int b){ return a < b; }\` | ascending (sort default) |
| \`[](int a, int b){ return a > b; }\` | descending |
| \`[](int a, int b){ return abs(a) < abs(b); }\` | absolute value ascending |
| \`[](auto a, auto b){ return a.second < b.second; }\` | by pair's second |

> 💡 \`auto\` parameters: when the type is long (pair / struct), \`auto\` is convenient — the compiler figures it out.`
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
\`\`\``
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

\`\`\`
Input:  4
        Alice 78
        Bob 95
        Carol 88
        Dave 60
Output: Bob 95
        Carol 88
        Alice 78
        Dave 60
\`\`\`

> 💡 In the lambda: \`a.second > b.second\` — bigger score goes first. Use structured bindings (\`auto& [name, score] : v\`) for clean output.`,
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
          title: "🎯 When lambda is *truly necessary* — multi-key sorting",
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

\`\`\`
Input:  5
        banana hi apple ok cat
Output: hi
        ok
        cat
        apple
        banana
\`\`\`

> 💡 Lambdas work the same on int, pair, **and string**. Use \`s.length()\` (or \`s.size()\`) to compare lengths; \`<\` on strings is lexicographic.`,
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
          content: `Imagine finding **"Kim"** in a phone book.

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
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 What Are begin() and end()?",
          content: `We've been using \`v.begin()\` and \`v.end()\` with sort() — let's understand what they actually are.

**begin() and end() are memory addresses (arrows pointing to positions).**

\`\`\`
vector<int> v = {10, 20, 30, 40, 50};

Memory:  1000  1004  1008  1012  1016  1020
Values:   10    20    30    40    50    ???

v.begin() = 1000  (address where 10 lives)
v.end()   = 1020  (address *after* 50, no value — never read this!)
\`\`\`

\`\`\`
   10    20    30    40    50   [empty]
    ↑                             ↑
 begin()                        end()
(1000)                         (1020)
\`\`\`

### Why does sort take begin/end instead of indices?

C++ functions like sort() take **addresses (arrows)** for "from where to where."

\`\`\`cpp
sort(v.begin(), v.end());
//    ↑ from this address  ↑ up to (not including) this address
\`\`\`

But why addresses specifically? There are two reasons — see the next page 👇`
        },
        {
          id: "s23-ch2-iter-benefits",
          type: "explain",
          title: "📌 Why addresses? — two benefits (especially *unification*)",
          content: `**① The same sort works on every container — iterator unification** ⭐

This is the real key. Once sort takes begin/end, it works **regardless of container type**:

\`\`\`cpp
sort(v.begin(), v.end());     // vector
sort(arr, arr + n);           // raw array
sort(lst.begin(), lst.end()); // list, deque, etc.
// All handled by ONE sort function!
\`\`\`

If sort were "a function that takes a vector," you'd need separate \`sortVector\`, \`sortArray\`, \`sortList\`. Instead, by **unifying through the iterator interface**, one sort handles them all.

This design runs through the entire STL. find / count / accumulate — every algorithm uses the \`(begin, end)\` pattern for the same reason: **one function, every container**.

**② No copy — fast regardless of size**

If you passed the vector itself, it'd be copied wholesale. A million elements = enormous copy cost. Passing just two addresses sidesteps that entirely.

\`\`\`cpp
sort(v);                   // (hypothetical) full vector copy — slow
sort(v.begin(), v.end());  // just 2 addresses — always fast ✅
\`\`\`

### Bonus: subtracting two arrows gives the *distance (index)*

\`\`\`
   10    20    30    40    50
 1000  1004  1008  1012  1016
    ↑                ↑
 begin()             it  (points to 40, address 1012)

it - v.begin()  = (1012 - 1000) / 4 = 3  → index 3
\`\`\`

\`\`\`cpp
auto it = v.begin() + 3;
cout << *it;             // 40  (*it = value the arrow points to)
cout << it - v.begin();  // 3   (convert to index)
\`\`\`

> 💡 **"Subtract two arrows = distance"** — this exact trick becomes idiomatic with \`lower_bound\` next.`
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 lower_bound — Binary Search in One Line!",
          content: `The binary search we just saw — C++ has a built-in function for it.
That's \`lower_bound\` and \`upper_bound\`.

⚠️ **Only works on sorted arrays!** — built on binary search principles.

---

**lower_bound / upper_bound concept**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (val=3)      (val=3)
"3 starts"   "after 3 ends"
\`\`\`

- **lower_bound** → first position where value **≥ x** = "where this value starts"
- **upper_bound** → first position where value **> x** = "one past where value ends"`
        },
        {
          id: "s23-ch2-lb-index",
          type: "explain",
          title: "📌 Why \`- v.begin()\`?",
          content: `\`lower_bound\` returns \`it\` — not an index number, but a
**memory address (an arrow pointing to a position).**
Printing it directly gives something like \`0x7ff3a2b...\`

\`it - v.begin()\` calculates "how many spots from the start."

\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};
//               0  1  2  3  4  5

auto it = lower_bound(v.begin(), v.end(), 3);
int idx = it - v.begin();  // formula! always convert to index this way
cout << idx;  // 1
\`\`\`

💡 Memorize \`- v.begin()\` as a formula!`
        },
        {
          id: "s23-ch2-lb-missing",
          type: "explain",
          title: "🔍 What if the value isn't found?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4 doesn't exist
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2  (first value ≥ 4 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2  (first value > 4 = 5)
// When value is missing: lower_bound == upper_bound !

// 10 doesn't exist (bigger than everything)
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  (past the end)
\`\`\`

**→ lower_bound == upper_bound means the value isn't in the array!**

---

**3 Usage Patterns**

\`\`\`cpp
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
\`\`\``
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
          content: "Given an *unsorted* vector \`v = {3, 1, 4, 1, 5}\`, what does \`binary_search(v.begin(), v.end(), 4)\` return?",
          options: [
            "true (since 4 is in the vector)",
            "false (auto-detects unsorted)",
            "**Unpredictable** — binary search only works on *sorted* arrays. Result is implementation-defined / undefined behavior.",
            "Compile error"
          ],
          answer: 2,
          explanation: "**`binary_search`, `lower_bound`, and `upper_bound` only work correctly on *sorted* arrays.** Calling them on unsorted data compiles, but the result is *undefined behavior* — could be true, false, or anything. Always `sort()` first!"
        },
        {
          id: "s23-ch2-lb2",
          type: "explain",
          title: "🔍 All Three Cases Explained!",
          content: `Let's compare all 3 cases using \`{1, 3, 3, 5, 7, 9}\`.

---

**Case 1: Value appears exactly once (finding 5)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑   ↑
       lower_bound upper_bound
          (5)         (5)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 5) - v.begin()  →  3  (position of 5)
upper_bound(v.begin(), v.end(), 5) - v.begin()  →  4  (position after 5)
4 - 3 = 1  →  5 appears 1 time
\`\`\`

---

**Case 2: Value appears multiple times (finding 3)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
   (3)          (3)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 3) - v.begin()  →  1  (first 3)
upper_bound(v.begin(), v.end(), 3) - v.begin()  →  3  (one past last 3)
3 - 1 = 2  →  3 appears 2 times
\`\`\`

---

**Case 3: Value doesn't exist (finding 4)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑
    lower_bound(4) = upper_bound(4)  ← they're the same!
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (first value ≥ 4 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (first value > 4 = 5)
3 - 3 = 0  →  4 appears 0 times = not found!
\`\`\`

**→ lower_bound == upper_bound means the value isn't in the array.**

---

**📌 Key Formula Summary**

| Goal | Code |
|---|---|
| First position of value | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| How many of value? | \`upper_bound(...) - lower_bound(...)\` |
| Does value exist? | \`lower_bound(...) != upper_bound(...)\` → exists |`
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "🔍 When the Search Goes Out of Bounds",
          content: `What happens when you search for a value bigger or smaller than everything?

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
//               0  1  2  3  4
\`\`\`

---

**Value bigger than all (finding 10)**

\`\`\`
{1,  3,  5,  7,  9,  [end]}
 0   1   2   3   4    5
                      ↑
    lower_bound(10) = upper_bound(10) = 5 (past the end!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 10) - v.begin()  →  5  (out of range!)
upper_bound(v.begin(), v.end(), 10) - v.begin()  →  5
\`\`\`

⚠️ Index 5 means \`v[5]\` doesn't exist! It's the **v.end()** position.
Always check \`idx < v.size()\` before accessing.

---

**Value smaller than all (finding 0)**

\`\`\`
{1,  3,  5,  7,  9}
 0   1   2   3   4
 ↑
lower_bound(0) = upper_bound(0) = 0 (at the front!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 0) - v.begin()  →  0  (at start)
upper_bound(v.begin(), v.end(), 0) - v.begin()  →  0
\`\`\`

---

**Safe usage pattern:**
\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

// Always check before using!
if (it != v.end() && *it == x) {
    // only when value is found
    int idx = it - v.begin();
    cout << idx;
}
\`\`\`

💡 \`*it\` is the value that \`it\` points to. (it = arrow, *it = what the arrow points at)`
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

> 💡 \`upper_bound(...) - lower_bound(...)\` — the chapter's core application pattern. The difference between the two iterators *is* the count.`,
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
          title: "🧹 sort + unique — Removing Duplicates!",
          content: `The most common C++ pattern for **removing duplicate values** from an array!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// Step 1: sort (unique only removes adjacent duplicates!)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// Step 2: remove duplicates with unique + erase
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

⚠️ **Sort first!** unique only removes adjacent duplicates.
Without sorting, {1, 3, 1} stays as 3 elements.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase(unique(...))\` |

💡 Memorize **sort → erase(unique(...), end())** as a pair!`
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
          content: `\`sort()\` is **fast** but has one catch: **when values tie, the original order is not guaranteed.** For student-style data, that can be a problem.

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Alice", 90}, {"Bob", 80}, {"Carol", 90}, {"Dave", 80}
};

sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;   // score descending
});
\`\`\`

Will Alice (90) and Carol (90) keep their **input order (Alice first)**? **sort doesn't guarantee it** — could vary by implementation.

### \`stable_sort\` — keeps original order for equal elements

\`\`\`cpp
stable_sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;
});
// → ties always keep input order (Alice → Carol, Bob → Dave)
\`\`\`

| | sort | stable_sort |
|---|---|---|
| Speed | faster (O(N log N)) | slightly slower (O(N log² N)) |
| On ties | order not guaranteed | input order preserved ✅ |
| When | ties don't matter | tie order is meaningful |

> 💡 Use stable_sort for **rankings or any data where stability matters**. Plain sort is enough 99% of the time.`
        },
        {
          id: "s23-ch3-stable-practice",
          type: "practice" as const,
          title: "✋ From scratch — try stable_sort yourself",
          content: `**Problem**: 4 students (name, score). Sort by score descending, **preserving input order on ties**.

\`\`\`
Input:  4
        Alice 90
        Bob 80
        Carol 90
        Dave 80
Output: Alice 90
        Carol 90
        Bob 80
        Dave 80
\`\`\`

> 💡 Use \`stable_sort\` + lambda for descending score. Ties auto-preserve input order.`,
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
        {
          id: "s23-ch3-summary",
          type: "explain",
          title: "🎉 Lesson 23 Complete! sort Master!",
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

### 🐍 Key Differences from Python!
| Feature | Python 🐍 | C++ ⚡ |
|---|---|---|
| Lambda syntax | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| Sort criterion | \`key=\` (transform 1 value) | comparison function (compare 2) |
| Binary search | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| Remove dups | \`sorted(set(v))\` | \`sort + erase(unique)\` |

🚀 Next up: **map & set** — containers that stay sorted like magic!`
        }
      ]
    }
  ]
}
