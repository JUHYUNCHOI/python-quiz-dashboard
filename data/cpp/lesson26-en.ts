// ============================================
// C++ Lesson 26: Sort Application Patterns (Advanced)
// (이전 cpp-23 에서 분리: ch3 + ch4 advanced + lambda STL)
// ============================================
import { LessonData } from '../types'

export const cppLesson26EnData: LessonData = {
  id: "cpp-26",
  title: "Sort Application Patterns (Advanced)",
  emoji: "🧹",
  description: "sort+unique+erase, stable_sort, count_if, find_if, accumulate — good to know after Bronze",
  chapters: [
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

1. **"How many distinct values?"** — input has duplicates and you want the **count of unique values**
   > Example: "How many **distinct** cow names entered the farm?"

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

    {
      id: "s23-ch4",
      title: "Lambda + General STL Algorithms",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch4-intro",
          type: "explain",
          title: "🤔 Does sort's lambda work elsewhere?",
          content: `> 📌 **Advanced — a plain \`for\` loop is usually clearer for Bronze. This chapter shows "cleaner expressions"**

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
          content: `> 📌 Advanced — \`for\` loop + \`break\` is usually more intuitive

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
- **\`sort(v.begin(), v.end(), greater<int>())\`** → descending
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
