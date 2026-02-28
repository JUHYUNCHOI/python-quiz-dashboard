// ============================================
// C++ Project Lesson P3: USACO Practice Round
// C++ for students who already know Python
// Part 3 Review Project
// ============================================
import { LessonData } from '../types'

export const cppLessonP3EnData: LessonData = {
  id: "cpp-p3",
  title: "USACO Practice Round",
  emoji: "🏆",
  description: "Part 3 Review Project! Solve USACO Bronze-style problems.",
  chapters: [
    // ============================================
    // Chapter 1: Problem 1 — Cow Sorting
    // ============================================
    {
      id: "ch1",
      title: "Problem 1 — Cow Sorting",
      emoji: "🥉",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "🏆 USACO Practice Round — Let's Go!",
          content: `Today we're solving **3 USACO Bronze-style problems**!

This is hands-on practice using everything you learned in Part 3.

### The Typical USACO Problem Structure

\`\`\`
1. Read input from file   (freopen)
2. Process the data        (STL magic!)
3. Write output to file    (freopen)
\`\`\`

### The Setup We'll Use for Every Problem

\`\`\`cpp
#include <bits/stdc++.h>  // All STL headers
using namespace std;

int main() {
    freopen("problem.in", "r", stdin);   // File input
    freopen("problem.out", "w", stdout); // File output

    // Write your solution!

    return 0;
}
\`\`\`

Remember these 3 things:
- **\`bits/stdc++.h\`** — No more worrying about headers!
- **\`freopen\`** — Be careful with file names!
- **STL** — pair, map, set, stack, sort... use them all!

Ready? Let's tackle the first problem! 💪`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 Problem 1: Cow Sorting",
          content: `### Problem Description

Farmer John has N cows. Each cow has a **name** and a **milk production** amount.

Sort the cows by milk production in **descending order**, and print the names of the **top K** cows.
If two cows have the same milk production, sort by **name in ascending order** (alphabetical).

---

### Input Format (sort.in)
- Line 1: N K (number of cows, number to print)
- Next N lines: name milk_production

### Output Format (sort.out)
- Names of the top K cows (one per line)

---

### Example

**Input (sort.in):**
\`\`\`
5 3
Bessie 12
Elsie 20
Daisy 15
Gertie 20
Buttercup 8
\`\`\`

**Output (sort.out):**
\`\`\`
Elsie
Gertie
Daisy
\`\`\`

**Explanation:** By milk production: Elsie(20), Gertie(20), Daisy(15), Bessie(12), Buttercup(8). Elsie and Gertie both produce 20, but Elsie comes first alphabetically!`
        },
        {
          id: "ch1-exp3",
          type: "explain",
          title: "💡 Strategy — pair + custom sort",
          content: `### Which data structure should we use?

Each cow has **(milk_production, name)** — two values to bundle together → **\`pair<int, string>\`**!

### Why put milk production in first?

When you sort pairs, they sort by **first element first**. Putting milk production in first makes sorting easier.

### The sorting condition is special!

1. Milk production in **descending** order (highest first)
2. If tied, name in **ascending** order (alphabetical)

The default \`sort\` is ascending, so we need a **custom comparator (lambda)**!

\`\`\`cpp
sort(cows.begin(), cows.end(), [](const auto& a, const auto& b) {
    if (a.first != b.first) return a.first > b.first;  // milk descending
    return a.second < b.second;  // name ascending
});
\`\`\`

### Overall Flow

\`\`\`
1. Open files with freopen
2. Read N and K
3. Store cow info in vector<pair<int, string>>
4. Sort with custom comparator
5. Print top K cow names
\`\`\``
        },
        {
          id: "ch1-prac1",
          type: "practice" as const,
          title: "✋ Cow Sorting — Full Solution",
          content: `Here's the complete solution using custom sorting to rank cows by milk production (descending) and name (ascending).

Notice how we put milk production in first and name in second of the pair!`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("sort.in", "r", stdin);
    freopen("sort.out", "w", stdout);

    int n, k;
    cin >> n >> k;

    vector<pair<int, string>> cows(n);
    for (int i = 0; i < n; i++) {
        cin >> cows[i].second >> cows[i].first;
    }

    sort(cows.begin(), cows.end(), [](const auto& a, const auto& b) {
        if (a.first != b.first) return a.first > b.first;  // milk descending
        return a.second < b.second;  // name ascending
    });

    for (int i = 0; i < k; i++) {
        cout << cows[i].second << endl;
    }
    return 0;
}`,
          expectedOutput: `Elsie
Gertie
Daisy`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "Understanding the pair structure!",
          content: `In the cow sorting code, we read input with \`cin >> cows[i].second >> cows[i].first;\`. Why do we read second before first?

\`\`\`
Input: Bessie 12
\`\`\``,
          options: [
            "second is always read first by default",
            "The input order is name(string) then milk(int), and our pair is (int, string)",
            "first and second can be swapped freely",
            "The compiler auto-matches types regardless of order"
          ],
          answer: 1,
          explanation: "In pair<int, string>, first is int (milk production) and second is string (name). Since the input file has the name first, we read into second (name) first, then first (milk production)!"
        }
      ]
    },
    // ============================================
    // Chapter 2: Problem 2 — Distinct Numbers
    // ============================================
    {
      id: "ch2",
      title: "Problem 2 — Distinct Numbers",
      emoji: "🥉",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "📋 Problem 2: Distinct Numbers",
          content: `### Problem Description

Given N integers, determine how many **distinct numbers** there are, and print how many times **each number appears**.

Output the numbers in **ascending order**.

---

### Input Format (distinct.in)
- Line 1: N
- Line 2: N integers

### Output Format (distinct.out)
- Line 1: Number of distinct integers
- Following lines: number count (in ascending order)

---

### Example

**Input (distinct.in):**
\`\`\`
8
3 1 4 1 5 9 2 6
\`\`\`

**Output (distinct.out):**
\`\`\`
7
1 2
2 1
3 1
4 1
5 1
6 1
9 1
\`\`\`

**Explanation:** 1 appears twice, everything else appears once. There are 7 distinct numbers total.`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "💡 Strategy — map is perfect!",
          content: `### Which STL container fits this problem?

**\`map<int, int>\`** solves this in one shot!

\`\`\`cpp
map<int, int> count;
count[x]++;  // If x is new, starts at 0 then becomes 1!
\`\`\`

### Key Features of map

| Feature | Description |
|---|---|
| **Auto-sorted** | Keys are automatically sorted in ascending order! |
| **Default value 0** | Accessing a new key initializes int to 0 |
| **size()** | Number of distinct keys = number of distinct numbers! |

Let's compare with Python:

\`\`\`python
# Python 🐍
from collections import Counter
count = Counter([3, 1, 4, 1, 5, 9, 2, 6])
# or
count = {}
for x in nums:
    count[x] = count.get(x, 0) + 1
\`\`\`

\`\`\`cpp
// C++ ⚡ — map auto-sorts too!
map<int, int> count;
for (int i = 0; i < n; i++) {
    int x; cin >> x;
    count[x]++;
}
\`\`\`

It's similar to Python's \`Counter\`, but C++'s \`map\` **automatically sorts keys**! No extra sort needed.`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Distinct Numbers — Full Solution",
          content: `Here's the solution using map to count occurrences and output them in sorted order.

\`auto& [num, cnt]\` is C++17 structured binding — it unpacks the pair's first/second at once!`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("distinct.in", "r", stdin);
    freopen("distinct.out", "w", stdout);

    int n;
    cin >> n;

    map<int, int> count;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        count[x]++;
    }

    cout << count.size() << endl;
    for (auto& [num, cnt] : count) {
        cout << num << " " << cnt << endl;
    }
    return 0;
}`,
          expectedOutput: `7
1 2
2 1
3 1
4 1
5 1
6 1
9 1`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "map vs unordered_map!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    unordered_map<int, int> m;
    m[3]++;
    m[1]++;
    m[4]++;
    m[1]++;

    for (auto& [k, v] : m) {
        cout << k << " ";
    }
    return 0;
}`,
          options: [
            "1 3 4 (always ascending)",
            "3 1 4 (insertion order)",
            "Order is not guaranteed (random)",
            "4 3 1 (always descending)"
          ],
          answer: 2,
          explanation: "unordered_map uses a hash table, so the iteration order is NOT guaranteed! It could be different every time you run it. If you need sorted order, you must use map. map uses a tree structure internally, so keys are always in ascending order!"
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Removing duplicates with set!",
          content: "Count the unique numbers!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    ___<int> s(arr, arr + 8);
    cout << s.___() << endl;
    return 0;
}`,
          fillBlanks: [
            { id: 0, answer: "set", options: ["set", "map", "vector", "stack"] },
            { id: 1, answer: "size", options: ["size", "count", "length", "len"] }
          ],
          explanation: "set<int> automatically removes duplicates! Inserting the array into a set gives {1, 2, 3, 4, 5, 6, 9}, and size() returns 7. If you need occurrence counts too, use map. But if you just need the count of distinct values, set is enough!"
        }
      ]
    },
    // ============================================
    // Chapter 3: Problem 3 — Bracket Match + Wrap-up
    // ============================================
    {
      id: "ch3",
      title: "Problem 3 — Bracket Match + Wrap-up",
      emoji: "🥉",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "📋 Problem 3: Bracket Match",
          content: `### Problem Description

Given a string of parentheses, check if all brackets are properly matched.

If they are, print \`YES\`. Otherwise, print \`NO\` and the **number of unmatched brackets**.

---

### Input Format (bracket.in)
- One line: a string of parentheses (only \`(\` and \`)\`)

### Output Format (bracket.out)
- If valid: \`YES\`
- If invalid: \`NO\` (line 1) + number of unmatched brackets (line 2)

---

### Example 1

**Input:** \`((())\`
**Output:**
\`\`\`
NO
1
\`\`\`
One \`(\` has no matching \`)\`!

### Example 2

**Input:** \`(())()\`
**Output:**
\`\`\`
YES
\`\`\`
All brackets are properly matched!

---

### Hint: stack is the key!

- See \`(\` → push onto stack
- See \`)\` → pop from stack (match found!)
- Stack is empty when you see \`)\`? → unmatched \`)\`!
- Finished scanning but stack isn't empty? → unmatched \`(\`s remain!`
        },
        {
          id: "ch3-prac1",
          type: "practice" as const,
          title: "✋ Bracket Match — Full Solution",
          content: `Here's the solution using a stack to match parentheses.

Key idea:
- See \`(\` → push onto stack
- See \`)\` → pop from stack (if empty, increment unmatched)
- At the end, remaining items in stack are also unmatched`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("bracket.in", "r", stdin);
    freopen("bracket.out", "w", stdout);

    string s;
    cin >> s;

    stack<int> st;
    int unmatched = 0;

    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            if (st.empty()) {
                unmatched++;
            } else {
                st.pop();
            }
        }
    }
    unmatched += st.size();

    if (unmatched == 0) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
        cout << unmatched << endl;
    }
    return 0;
}`,
          expectedOutput: `NO
1`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "Bracket analysis!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "(()(("  ;
    stack<int> st;
    int unmatched = 0;

    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            if (st.empty()) unmatched++;
            else st.pop();
        }
    }
    unmatched += st.size();

    if (unmatched == 0) cout << "YES";
    else cout << "NO " << unmatched;

    return 0;
}`,
          options: [
            "YES",
            "NO 2",
            "NO 3",
            "NO 5"
          ],
          answer: 2,
          explanation: "The string is \"(()((\":  ( push, ( push, ) pop, ( push, ( push. Stack has 3 items left, unmatched = 0 + 3 = 3! Out of 5 characters, only one ) exists, so 3 open parens have no match."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "📝 USACO Submission Checklist",
          content: `We've solved all 3 problems! Let's make a checklist to avoid mistakes in real contests.

### Pre-Submission Checklist

| # | Item | Why? |
|---|---|---|
| ✅ | \`#include <bits/stdc++.h>\` | Missing header = compile error! |
| ✅ | Double-check \`freopen\` file names | Wrong file name = 0 points! |
| ✅ | Check variable types (int vs long long) | Large N = overflow! |
| ✅ | Array/vector size is large enough | Out-of-bounds = runtime error! |
| ✅ | Edge cases (N=0, N=1) | Easy to get wrong on edge cases! |
| ✅ | Calculate time complexity | N ≤ 10^5 → O(N log N) is OK |

### Top 3 Common Mistakes

**1. File name typos**
\`\`\`cpp
// ❌ Wrong!
freopen("Sort.in", "r", stdin);   // Capital S!
freopen("sort.out", "w", stdout);

// ✅ Correct!
freopen("sort.in", "r", stdin);   // lowercase!
freopen("sort.out", "w", stdout);
\`\`\`

**2. Integer overflow**
\`\`\`cpp
// ❌ Dangerous!
int total = 1000000 * 1000000;  // Overflow!

// ✅ Safe!
long long total = 1000000LL * 1000000LL;
\`\`\`

**3. Use "\\n" instead of endl (speed)**
\`\`\`cpp
// Slow 😩
cout << x << endl;

// Fast ⚡
cout << x << "\\n";
\`\`\``
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🏆 USACO Practice Round Complete!",
          content: `## 🎉 You've completed the USACO Practice Round!

You solved 3 USACO Bronze-style problems and reviewed all the key concepts from Part 3!

### 📊 Techniques Used Today

| Problem | Key Technique | STL Used |
|---|---|---|
| 🥉 Cow Sorting | Custom sorting | \`pair\`, \`sort\` + lambda |
| 🥉 Distinct Numbers | Counting & auto-sorting | \`map\`, \`set\` |
| 🥉 Bracket Match | LIFO structure | \`stack\` |

### 🔑 Common Elements Across All Problems

- **\`#include <bits/stdc++.h>\`** — All STL headers at once!
- **\`freopen\`** — USACO file I/O
- **\`vector\`** — Dynamic arrays
- **range-for + structured binding** — Clean iteration

---

### 🚀 What's Next?

Time to tackle real USACO Bronze problems!

1. **usaco.org** — Solve past problems from the archive
2. If you're stuck for **30+ minutes**, checking the editorial is totally fine
3. **pair + sort**, **map**, **stack** — These 3 alone can solve many Bronze problems!

🏆 **USACO Practice Round cleared! Good luck in the real contest!** 💪`
        }
      ]
    }
  ]
}
