// ============================================
// C++ Lesson 17: STL Algorithms
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson17EnData: LessonData = {
  id: "cpp-17",
  title: "STL Algorithms",
  emoji: "⚙️",
  description: "sort, find, binary search and more! Powerful STL tools",
  chapters: [
    // ============================================
    // Chapter 1: Search & Numeric Algorithms
    // ============================================
    {
      id: "ch1",
      title: "Search & Numeric",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 Hand-rolled vs STL — get it in one line",
          content: `Say you have a vector of scores. How do you find the maximum?

\`\`\`cpp
vector<int> scores = {72, 95, 68, 88, 100, 55};
\`\`\`

With what we've learned so far, you'd write something like:

\`\`\`cpp
int maxVal = scores[0];
for (int i = 1; i < scores.size(); i++) {
    if (scores[i] > maxVal) maxVal = scores[i];
}
\`\`\`

Five lines. Not hard, but writing this every time gets tedious. And summing values, finding values, computing averages — all follow the same pattern. You'd be writing nearly the same code over and over.

The C++ designers thought the same thing. **Common operations like these should already be built in.** That's what **STL (Standard Template Library)** is.

Same task, in one line with STL:

\`\`\`cpp
int maxVal = *max_element(scores.begin(), scores.end());
\`\`\`

That 5-line for loop becomes one line. Other operations look similar:

| What you want | Hand-rolled | STL |
|---|---|---|
| Maximum | for + if compare | \`*max_element(...)\` |
| Sum | for + accumulate | \`accumulate(...)\` |
| Find a value | for + search | \`find(...)\` |
| Count occurrences | for + counter | \`count(...)\` |

Remember Python's built-ins like \`min()\`, \`max()\`, \`sum()\`? C++ STL is the same idea — "common stuff is already done for you."

\`\`\`cpp
#include <algorithm>  // find, min, max, sort, etc.
#include <numeric>    // accumulate, etc. (separate header — careful!)
\`\`\`

> 💡 In this chapter we'll pick up 5–6 common STL tools, then in Chapter 2 we'll see a **faster search method** (binary search).

But STL has one slightly unfamiliar thing — that \`v.begin()\`, \`v.end()\` notation. Next page, we'll explain what those actually are 👇`
        },
        {
          id: "ch1-iterator",
          type: "explain",
          title: "📍 iterator — a cursor into the vector",
          component: "iteratorVisualizer",
          content: `Look back at the line we just saw:

\`\`\`cpp
*max_element(scores.begin(), scores.end());
\`\`\`

\`scores.begin()\` and \`scores.end()\` — these are **iterators**.

> 🎯 One line: **iterator = a cursor pointing at one position inside a vector.**

Think of the blinking text cursor ` + '`|`' + ` when you're typing. An iterator works the same way — it points at one spot, and you can move it one step at a time.

\`\`\`
v = [10, 20, 30, 40, 50]
     ↑                    ↑
  v.begin()            v.end()  ← past the last cell!
\`\`\`

- \`v.begin()\` → points at the **first element**
- \`v.end()\` → points **past** the last element. (NOT at the last element ⚠️)

Why past, not at? It's a **"this is where the range ends" marker**. The convention is \`[begin, end)\` — start included, end excluded. Same as Python's \`range(0, 5)\` not including 5.

### What can you do with an iterator?

\`\`\`cpp
auto it = v.begin();   // cursor at the first cell
cout << *it;            // 10  ← * to read the value
it++;                   // move one step right
cout << *it;            // 20
\`\`\`

| Expression | Meaning |
|---|---|
| \`v.begin()\` | First cell |
| \`v.end()\` | Past-the-last-cell marker |
| \`*it\` | The value at the cursor |
| \`it++\` | Move one step right |
| \`it - v.begin()\` | Index (which position?) |

> 💡 Same feel as the pointer lesson — \`*\` to read the value, \`++\` to move. Iterators are basically pointers' close cousin.

Most STL functions take a \`(begin, end)\` pair and operate on that range. **Master this one pattern** and STL functions will all start to look familiar.

Try moving the cursor below to see how \`*it\`, \`begin()\`, and \`end()\` change 👇`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Find the smallest value in the vector!",
          code: "vector<int> v = {4, 1, 7, 2};\nauto it = ___(v.begin(), v.end());\ncout << *it;  // prints 1",
          fillBlanks: [
            { id: 0, answer: "min_element", options: ["min_element", "max_element", "find", "sort"] }
          ],
          explanation: "min_element(v.begin(), v.end()) returns an iterator to the minimum value in the vector! Dereferencing with *it gives us 1."
        },
        {
          id: "ch1-find",
          type: "explain",
          title: "🔍 find() — Search for a Value!",
          content: `Time for the iterator we just learned to do real work. \`find()\` searches a vector for a specific value, and **returns its position as an iterator**.

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {10, 20, 30, 40, 50};

// find(begin, end, target) → returns iterator
auto it = find(v.begin(), v.end(), 30);

if (it != v.end()) {
    cout << "Found! " << *it << endl;         // Found! 30
    cout << "Index: " << it - v.begin();      // Index: 2
} else {
    cout << "Not found!" << endl;
}
\`\`\`

**Key points:**
- If found → returns an **iterator** pointing to that element
- If not found → returns \`v.end()\`
- Compare with \`v.end()\` to check if the value exists!

Let's compare with Python:

**Python 🐍:**
\`\`\`python
lst = [10, 20, 30, 40, 50]
if 30 in lst:          # check existence
    idx = lst.index(30) # get index
\`\`\`

**C++ ⚡:**
\`\`\`cpp
auto it = find(v.begin(), v.end(), 30);
if (it != v.end()) {         // check existence
    int idx = it - v.begin(); // get index
}
\`\`\`

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`30 in lst\` | \`find(...) != v.end()\` |
| \`lst.index(30)\` | \`it - v.begin()\` |
| Raises ValueError if missing | Returns \`v.end()\` if missing |

⚠️ **What if find() can't find the value?** It returns end(). Always check:
\`\`\`cpp
auto it = find(v.begin(), v.end(), 42);
if (it != v.end()) { /* found */ }
\`\`\`

💡 \`find()\` searches linearly from front to back. Time complexity is **O(n)**!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Predict the find() result!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5, 10, 15, 20, 25};\n    auto it = find(v.begin(), v.end(), 15);\n    if (it != v.end()) {\n        cout << it - v.begin();\n    } else {\n        cout << -1;\n    }\n    return 0;\n}",
          options: ["15", "2", "3", "-1"],
          answer: 1,
          explanation: "find() locates 15, returning an iterator to index 2. it - v.begin() equals 2! (counting from 0: 5→0, 10→1, 15→2)"
        },
        {
          id: "ch1-find-mini",
          type: "practice" as const,
          title: "✋ Quick — is this book in the library?",
          content: `**Scenario**: You want to check if "1984" is in the library's book list.

Use \`find\` and print **\`Found\` if it exists, \`Not found\` otherwise**.

> 💡 \`it != v.end()\` is the "found it" signal. A one-line if is enough.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<string> books = {"Harry Potter", "Hobbit", "1984", "Dune"};
    string target = "1984";

    // 👇 Use find to check whether target is in books, print result


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<string> books = {"Harry Potter", "Hobbit", "1984", "Dune"};
    string target = "1984";

    auto it = find(books.begin(), books.end(), target);
    if (it != books.end()) cout << "Found";
    else cout << "Not found";

    return 0;
}`,
          hint: "auto it = find(books.begin(), books.end(), target); then if (it != books.end()) cout << \"Found\"; else cout << \"Not found\";",
          expectedOutput: `Found`
        },
        {
          id: "ch1-accum",
          type: "explain",
          title: "🔍 accumulate() & Utilities!",
          content: `\`accumulate()\` **sums up** all values in a vector! It's like Python's \`sum()\`.

\`\`\`cpp
#include <numeric>    // accumulate lives here!
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 2, 3, 4, 5};

// accumulate(begin, end, initial_value)
int total = accumulate(v.begin(), v.end(), 0);
cout << total;  // 15
\`\`\`

⚠️ \`accumulate()\` is in \`<numeric>\`, NOT \`<algorithm>\`! Watch your headers.

**Other useful functions:**

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// reverse — flip the order
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}

// swap — exchange two variables
int a = 10, b = 20;
swap(a, b);
// a=20, b=10
\`\`\`

Let's compare with Python:

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`sum(lst)\` | \`accumulate(v.begin(), v.end(), 0)\` |
| \`lst.reverse()\` | \`reverse(v.begin(), v.end())\` |
| \`a, b = b, a\` | \`swap(a, b)\` |

💡 The third argument (initial value): use \`0\` for integer sum, \`0.0\` for floating-point sum!`
        },
        {
          id: "ch1-accum-mini",
          type: "practice" as const,
          title: "✋ Quick — weekly cafe revenue",
          content: `**Scenario**: A cafe's revenue for 5 days:

\`\`\`
Mon 120 / Tue 95 / Wed 180 / Thu 210 / Fri 150
\`\`\`

Print this **week's total revenue**. \`accumulate\` does it in one line.

> ⚠️ \`accumulate\` lives in \`<numeric>\`!`,
          starterCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> sales = {120, 95, 180, 210, 150};

    // 👇 Use accumulate to print the total


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> sales = {120, 95, 180, 210, 150};

    cout << accumulate(sales.begin(), sales.end(), 0);

    return 0;
}`,
          hint: "cout << accumulate(sales.begin(), sales.end(), 0); — done. The third argument 0 is the starting value.",
          expectedOutput: `755`
        },
        {
          id: "ch1-lambda",
          type: "explain",
          title: "🤔 What about searching by *condition* instead of an exact value?",
          content: `So far we've used \`find(...)\` for **exact matches**. But what if, in a list of student scores, you want to find:

> "the **first score 70 or above**"
> "**how many even** scores are there?"

\`find()\` won't help — it only finds exact values. For **conditional** searches we use \`find_if()\` and \`count_if()\`. The \`_if\` suffix means "with a condition attached."

But there's a snag — how do you pass a **condition** like "70 or above" to a function? A single number is easy, but a condition is a chunk of code.

→ Enter **lambda**: an **unnamed function written on the spot.**

\`\`\`cpp
[](int x) { return x >= 70; }
//└┘ └────┘ └──────────────┘
//  capture  parameter   body
\`\`\`

\`[]\` is the signal "this is a lambda." \`(int x)\` is just like a normal parameter list, and \`{ return ... }\` is the body. **It's a normal function — it just doesn't have a name.**

> 💡 Same idea as Python's \`lambda x: x >= 70\`. The syntax is just a bit different.

Now plug a lambda into find_if / count_if:

\`\`\`cpp
vector<int> scores = {55, 72, 68, 88, 41, 95};

// First score 70 or above
auto it = find_if(scores.begin(), scores.end(), [](int x) {
    return x >= 70;
});
if (it != scores.end()) cout << *it;  // 72

// How many evens?
int evenCnt = count_if(scores.begin(), scores.end(), [](int x) {
    return x % 2 == 0;
});
cout << evenCnt;  // 3 (72, 68, 88)
\`\`\`

| Function | Condition | Returns |
|---|---|---|
| \`find(begin, end, value)\` | "is this value here?" (exact) | iterator to first |
| \`find_if(begin, end, lambda)\` | where lambda is true | iterator to first |
| \`count(begin, end, value)\` | "how many of this value?" (exact) | count |
| \`count_if(begin, end, lambda)\` | how many where lambda is true? | count |

> 💡 Rule of thumb: \`_if\` means **the third argument is a condition (lambda) instead of a value.** That's it.

Lambdas show up the same way in sort and other STL algorithms — you'll see them again next chapter.`,
        },
        {
          id: "ch1-lambda-mini",
          type: "practice" as const,
          title: "✋ Quick — how many students passed (60+)?",
          content: `**Scenario**: 6 students with scores:

\`\`\`
Scores: 72, 55, 88, 41, 90, 67
Passing threshold: 60+
\`\`\`

Print **how many students passed**. \`count_if\` + lambda, one line.

> 💡 \`count_if(begin, end, [](int x) { return ...; })\` returns the number of elements where the condition is true.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {72, 55, 88, 41, 90, 67};

    // 👇 Use count_if + lambda to print number of students with score >= 60


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {72, 55, 88, 41, 90, 67};

    int passed = count_if(scores.begin(), scores.end(), [](int x) {
        return x >= 60;
    });
    cout << passed;

    return 0;
}`,
          hint: "count_if(scores.begin(), scores.end(), [](int x) { return x >= 60; }) — inside the lambda, just write the condition 'x >= 60'. Store the result or print directly.",
          expectedOutput: `4`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Complete Vector Analysis!",
          content: `Use STL functions to analyze a vector — find min, max, sum, and locate a specific value!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    int minVal = *min_element(v.begin(), v.end());
    int maxVal = *max_element(v.begin(), v.end());
    int total = accumulate(v.begin(), v.end(), 0);

    cout << minVal << endl;
    cout << maxVal << endl;
    cout << total << endl;

    auto it = find(v.begin(), v.end(), 9);
    if (it != v.end()) {
        cout << it - v.begin() << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    // Use min_element, max_element, accumulate to find min, max, sum and print them
    // Print: 1, 9, 30

    // Use find() to locate 9 and print its index
    // Print: 3

    return 0;
}`,
          hint: "Use *min_element(v.begin(), v.end()) — the * dereferences the iterator. accumulate is in <numeric>. find() returns an iterator, and it - v.begin() gives the index",
          expectedOutput: `1
9
30
3`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "STL basics!",
          content: "Which header file contains the `accumulate()` function?",
          options: [
            "<algorithm>",
            "<numeric>",
            "<vector>",
            "<cmath>"
          ],
          answer: 1,
          explanation: "accumulate() is in the <numeric> header! Functions like sort, find, and min_element are in <algorithm>, but sum-related functions are in <numeric>."
        }
      ]
    },
    // ============================================
    // Chapter 2: Binary Search
    // ============================================
    {
      id: "ch2",
      title: "Binary Search",
      emoji: "🎯",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎯 When you need faster search — binary_search()",
          content: `Imagine searching for one student ID in a list of 1,000,000 students. With \`find()\`, what happens?

\`find()\` checks **one by one from the front**. Worst case: 1 million comparisons. Heavy work even for a computer.

But what if the IDs are **already sorted**? Think how you look up a word in a dictionary — you don't flip from "A" page by page. You open near the middle, decide "is my word before or after?", and only check that half. Then half again, and again. Fast.

That's **binary search**. Cut the range **in half** each time.

| Method | How | On 1M items |
|---|---|---|
| \`find()\` | One step at a time from the front | up to 1M comparisons |
| \`binary_search()\` | Cuts in half each round | only ~20 comparisons |

Massive difference, right? Catch: data must be **sorted**. Without sorting, you can't say "is my target before or after the middle" in the first place.

> 💡 Sorting itself costs time. So if you only search once, the sort cost may not be worth it. But if you'll search **many times**, the win adds up fast.

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 3, 5, 7, 9, 11};
// ⚠️ Must be sorted first!

bool found = binary_search(v.begin(), v.end(), 7);
// found = true

bool notFound = binary_search(v.begin(), v.end(), 6);
// notFound = false
\`\`\`

**Important rule:** Data **MUST be sorted** before using \`binary_search()\`!

\`\`\`cpp
vector<int> unsorted = {5, 3, 1, 9, 7};
// Sort first!
sort(unsorted.begin(), unsorted.end());
// Now {1, 3, 5, 7, 9}
bool ok = binary_search(unsorted.begin(), unsorted.end(), 5);
// ok = true
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
import bisect
lst = [1, 3, 5, 7, 9, 11]
# Python has no built-in binary_search, so use bisect
idx = bisect.bisect_left(lst, 7)
found = (idx < len(lst) and lst[idx] == 7)  # True
\`\`\`

**C++ ⚡:**
\`\`\`cpp
bool found = binary_search(v.begin(), v.end(), 7);  // True
\`\`\`

C++ is much simpler, right?

| Search Method | Time Complexity | Sorting Required? |
|---|---|---|
| \`find()\` | O(n) | No |
| \`binary_search()\` | O(log n) | **Yes!** |

💡 If the data is sorted, always use \`binary_search()\` for efficiency!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Prepare the vector for fast search!",
          code: "vector<int> v = {4, 2, 7, 1, 9};\n___(v.begin(), v.end());  // Sort first!\nbool found = binary_search(v.begin(), v.end(), 7);",
          fillBlanks: [
            { id: 0, answer: "sort", options: ["sort", "find", "reverse", "binary_search"] }
          ],
          explanation: "You must sort with sort() before using binary_search()! Without sorting, the result can be incorrect."
        },
        {
          id: "ch2-bounds",
          type: "explain",
          title: "🎯 lower_bound / upper_bound — they tell you the position",
          component: "lowerUpperBoundVisualizer",
          content: `\`binary_search()\` only tells you "is it here or not." But the questions you actually want to answer usually need positions:

> "How many students scored **70 or above**?"
> "How **many copies** of this value exist?"
> "Where should I **insert this value** to keep the array sorted?"

That's where \`lower_bound\` and \`upper_bound\` come in. Both use binary search (so **fast**), and both require **sorted data**.

### The difference is *≥* vs *>*

\`\`\`cpp
vector<int> v = {1, 3, 5, 5, 5, 7, 9};
\`\`\`

- \`lower_bound(v.begin(), v.end(), 5)\` → first position **at or above** 5 (≥ 5)
- \`upper_bound(v.begin(), v.end(), 5)\` → first position **strictly above** 5 (> 5)

Words alone are easy to mix up. Try the simulator below — change the target value and watch the two arrows move 👇

### In code

\`\`\`cpp
auto lb = lower_bound(v.begin(), v.end(), 5);
auto ub = upper_bound(v.begin(), v.end(), 5);

cout << lb - v.begin();   // 2  ← same index pattern as find()
cout << ub - v.begin();   // 5
cout << ub - lb;          // 3  ← how many 5s
\`\`\`

(Both return iterators, so the \`it - v.begin()\` trick from \`find()\` works the same way here.)

### Common uses

- "**how many of value X**" → \`upper_bound - lower_bound\`
- "**how many ≥ X**" → \`v.end() - lower_bound\`
- "**how many < X**" → \`lower_bound - v.begin()\`
- "**is X actually there**" → \`lb != v.end() && *lb == X\`

> 💡 These map 1:1 to Python's \`bisect.bisect_left\` and \`bisect.bisect_right\`. Same tools, different names.`
        },
        {
          id: "ch2-practice-bounds",
          type: "predict" as const,
          title: "Count students scoring 70+",
          content: "In a sorted array of scores, figure out how many students scored 70 or above.",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {45, 55, 67, 72, 78, 85, 91, 98};\n    auto it = lower_bound(scores.begin(), scores.end(), 70);\n    cout << scores.end() - it << \" students\";\n}",
          options: ["3 students", "4 students", "5 students", "6 students"],
          answer: 2,
          explanation: "lower_bound finds the first position >= 70. That's 72! Counting from there to end(): 72, 78, 85, 91, 98 = 5 students."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Predict the lower_bound() result!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30, 40, 50};\n    auto it = lower_bound(v.begin(), v.end(), 25);\n    cout << it - v.begin();\n    return 0;\n}",
          options: ["1", "2", "3", "5"],
          answer: 1,
          explanation: "lower_bound finds the first position >= 25. In v = {10, 20, 30, 40, 50}, the first value >= 25 is 30 at index 2. So it - v.begin() outputs 2!"
        },
        {
          id: "ch2-bounds-mini",
          type: "practice" as const,
          title: "✋ Quick — how many students scored 70~80?",
          content: `**Scenario**: From a sorted score list, how many students scored **at least 70 and below 80**?

\`\`\`
Scores: 45, 55, 67, 72, 75, 78, 85, 91, 98
Range: [70, 80)  ← 70 included, 80 excluded
\`\`\`

The \`upper_bound - lower_bound\` pattern counts ranges in one line.

> 💡 \`lower_bound(v, 70)\` = first position ≥ 70, \`lower_bound(v, 80)\` = first position ≥ 80 (= just past the < 80 range).
> Subtract the two iterators to get the count.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {45, 55, 67, 72, 75, 78, 85, 91, 98};

    // 👇 Use lower_bound twice to print the count of [70, 80) range


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {45, 55, 67, 72, 75, 78, 85, 91, 98};

    auto lo = lower_bound(scores.begin(), scores.end(), 70);
    auto hi = lower_bound(scores.begin(), scores.end(), 80);
    cout << hi - lo;

    return 0;
}`,
          hint: "auto lo = lower_bound(scores.begin(), scores.end(), 70); auto hi = lower_bound(scores.begin(), scores.end(), 80); cout << hi - lo; — the difference between the two iterators is the count.",
          expectedOutput: `3`
        },
        {
          id: "ch2-unique",
          type: "explain",
          title: "🎯 unique() & erase() — Remove Duplicates!",
          content: `When you need to remove duplicates: say you read values from a data file and there are duplicates. You could use a set, but when you want to remove only the duplicates while keeping the original order, you need the erase-unique pattern!

\`unique()\` removes **consecutive duplicates**. Pair it with \`erase()\` for complete deduplication!

\`\`\`cpp
vector<int> v = {3, 1, 4, 1, 5, 3, 3};

// Step 1: Sort (unique only removes consecutive duplicates!)
sort(v.begin(), v.end());
// v = {1, 1, 3, 3, 3, 4, 5}

// Step 2: unique + erase combo!
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 3, 4, 5}
\`\`\`

**Step-by-step breakdown:**

\`\`\`
After sort:  {1, 1, 3, 3, 3, 4, 5}
unique():    {1, 3, 4, 5, ?, ?, ?}
                         ^-- position returned by unique
erase():    {1, 3, 4, 5}  // the ?s are removed!
\`\`\`

Compare with Python:

**Python 🐍:**
\`\`\`python
lst = [3, 1, 4, 1, 5, 3, 3]
result = sorted(set(lst))  # [1, 3, 4, 5]
\`\`\`

**C++ ⚡:**
\`\`\`cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
\`\`\`

Python is simpler, but the C++ approach is extremely useful for **coordinate compression**!

\`\`\`cpp
// Coordinate compression pattern
vector<int> coords = {100, 500, 100, 200, 500};
sort(coords.begin(), coords.end());
coords.erase(unique(coords.begin(), coords.end()), coords.end());
// coords = {100, 200, 500}
// Use lower_bound to find compressed indices!
\`\`\`

💡 The \`sort → unique → erase\` pattern appears constantly in competitive programming! Memorize it!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Sort + lower_bound to Find a Value!",
          content: `Use sort() and lower_bound() to sort a vector and find the position of 30!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    sort(v.begin(), v.end());

    for (int x : v) cout << x << " ";
    cout << endl;

    int target = 30;
    auto it = lower_bound(v.begin(), v.end(), target);

    if (it != v.end() && *it == target) {
        cout << target << " found at index " << it - v.begin() << endl;
    } else {
        cout << target << " not found" << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    // Sort v and print it
    // Print: "10 20 30 40 50 "

    int target = 30;
    // Use lower_bound() to find target's position and print it
    // Print: "30 found at index 2"

    return 0;
}`,
          hint: "sort(v.begin(), v.end()) sorts in place. lower_bound(v.begin(), v.end(), target) returns an iterator — check *it == target to confirm the value exists, then it - v.begin() is the index",
          expectedOutput: `10 20 30 40 50 
30 found at index 2`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "binary_search rules!",
          content: "What MUST you do before using `binary_search()`?",
          options: [
            "Check the vector's size",
            "Sort the vector",
            "Reverse the vector",
            "Add #include <numeric>"
          ],
          answer: 1,
          explanation: "binary_search() only works correctly on sorted data! You must sort with sort() before using it."
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
          title: "find() behavior!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};
auto it = find(v.begin(), v.end(), 50);
if (it == v.end()) {
    cout << "X";
} else {
    cout << *it;
}
\`\`\``,
          options: [
            "50",
            "40",
            "X",
            "Error"
          ],
          answer: 2,
          explanation: "50 is not in the vector, so find() returns v.end()! Since it == v.end() is true, X is printed."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "binary_search prerequisite!",
          content: `What happens here?

\`\`\`cpp
vector<int> v = {5, 3, 1, 4, 2};  // Not sorted!
bool result = binary_search(v.begin(), v.end(), 3);
\`\`\``,
          options: [
            "Always true",
            "Always false",
            "The result is unreliable",
            "Compile error"
          ],
          answer: 2,
          explanation: "binary_search() assumes sorted data! On an unsorted vector, the result might be correct or incorrect — you simply can't trust it."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "lower_bound vs upper_bound!",
          content: `If v = {1, 3, 5, 5, 5, 7}, what is the difference between the indices of lower_bound(5) and upper_bound(5)?`,
          options: [
            "1",
            "2",
            "3",
            "5"
          ],
          answer: 2,
          explanation: "lower_bound(5) points to index 2 (first 5), upper_bound(5) points to index 5 (where 7 is). The difference is 5-2=3, which equals the count of 5s!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "accumulate usage!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
cout << accumulate(v.begin(), v.end(), 10);
\`\`\``,
          options: [
            "15",
            "25",
            "10",
            "Error"
          ],
          answer: 1,
          explanation: "The third argument to accumulate is the initial value! 10 + 1 + 2 + 3 + 4 + 5 = 25 is printed."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Lesson 17 Complete!",
          content: `## 🏆 What We Learned Today!

### 🔍 Search & Numeric Algorithms
- \`min()\`, \`max()\` — compare two values
- \`min_element()\`, \`max_element()\` — find min/max in a range
- \`find()\` — search for a value (O(n))
- \`accumulate()\` — sum values (\`<numeric>\` header!)
- \`reverse()\`, \`swap()\` — utility functions

### 🎯 Binary Search
- \`binary_search()\` — returns true/false only
- \`lower_bound()\` — first position **>= target**
- \`upper_bound()\` — first position **> target**
- **Must sort first!**

### Deduplication Pattern
- \`sort → unique → erase\` — the core of coordinate compression!

## ✅ Key Summary Table

| Function | Header | Returns | Sort Required? |
|---|---|---|---|
| \`find()\` | \`<algorithm>\` | iterator | No |
| \`binary_search()\` | \`<algorithm>\` | bool | **Yes** |
| \`lower_bound()\` | \`<algorithm>\` | iterator | **Yes** |
| \`upper_bound()\` | \`<algorithm>\` | iterator | **Yes** |
| \`accumulate()\` | \`<numeric>\` | value | No |

🚀 **Next lesson (cpp-18): stack & queue** — two ways of stacking and pulling out data. Bracket matching, BFS — these structures shine there. STL container adventure continues!`
        }
      ]
    }
  ]
}
