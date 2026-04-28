// ============================================
// C++ Lesson 16: map & set
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson16EnData: LessonData = {
  id: "cpp-16",
  title: "map & set",
  emoji: "🗺️",
  description: "Python dict & set → C++ map & set!",
  chapters: [
    // ============================================
    // Chapter 1: map
    // ============================================
    {
      id: "ch1",
      title: "map — Like Python dict!",
      emoji: "📖",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📖 map — Look up by name, instantly",
          content: `Say you're storing scores for 1000 students. Using the \`vector<pair<string,int>>\` from the last lesson:

\`\`\`cpp
vector<pair<string, int>> scores = {
    {"Alice", 95}, {"Bob", 87}, ...  // 1000 entries
};

// Find Bob's score?
for (auto& p : scores) {
    if (p.first == "Bob") { ... }   // compare one by one
}
\`\`\`

If Bob is at the end, that's 1000 comparisons. A million students? A million comparisons. Way too slow.

What we actually want is a **"name → score" lookup table**. In Python, that was \`dict\`:

\`\`\`python
scores = {"Alice": 95, "Bob": 87, "Charlie": 92}
print(scores["Bob"])   # 87 — instant!
\`\`\`

In C++, that role goes to **\`map\`**.

\`\`\`cpp
#include <map>
map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
scores["Charlie"] = 92;

cout << scores["Bob"];   // 87 — instant!
\`\`\`

Syntax: \`map<key_type, value_type>\`. Usage with \`scores[key]\` is almost identical to Python's dict.

> 💡 One line: **map = "a fast lookup table that finds values by key."** Next page covers the *one* decisive difference from Python dict.`
        },
        {
          id: "ch1-intro-sorted",
          type: "explain",
          title: "📌 Decisive difference from Python dict — auto-sort",
          content: `Usage is nearly identical, but **storage order** is different.

| Python dict 🐍 | C++ map ⚡ |
|---|---|
| \`scores = {}\` | \`map<string, int> scores;\` |
| \`scores["key"] = val\` | \`scores["key"] = val;\` (same!) |
| Preserves **insertion order** | **Auto-sorts by key** |

### Example

\`\`\`cpp
map<string, int> scores;
scores["Charlie"] = 92;
scores["Alice"] = 95;
scores["Bob"] = 87;

// Iterate — what order?
for (auto& [k, v] : scores) {
    cout << k << " ";
}
// Output: Alice Bob Charlie  (alphabetical!)
\`\`\`

Inserted as Charlie → Alice → Bob, but iteration is **alphabetical**. C++ \`map\` **always keeps keys sorted**.

> 💡 This has a tradeoff. If you don't need sorting and want it faster? \`unordered_map\` — we'll compare shortly.`
        },
        {
          id: "ch1-vs-vec-pair",
          type: "explain",
          title: "🤔 Then why \`vector<pair>\` at all? Map exists",
          content: `Great question. If map is fast and convenient, why did we bother learning \`vector<pair<...>>\`? **They're good at different things.**

### Side by side

| Situation | \`map\` | \`vector<pair>\` |
|---|---|---|
| **Fast lookup** by name → score | ✅ O(log n) | ❌ scans linearly |
| Sort by **value** (score) | ❌ key sort only | ✅ sort with any rule |
| Allow duplicate keys (same name) | ❌ last write wins | ✅ all preserved |
| Preserve insertion order | ❌ auto-alphabetical | ✅ as-is |
| Index access \`v[0]\`, \`v[1]\` | ❌ no | ✅ yes |

### Most common case where vector<pair> wins — sort by score

Want to sort student records by **score, descending**?

\`\`\`cpp
// vector<pair> ✅ — one sort call
vector<pair<string, int>> v = {{"Alice", 85}, {"Bob", 92}, {"Carol", 78}};
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;   // score descending
});
// v = {{Bob,92}, {Alice,85}, {Carol,78}}

// map ❌ — only sorts by key (name), can't sort by value
map<string, int> m = {{"Alice", 85}, {"Bob", 92}, {"Carol", 78}};
// Always alphabetical: Alice → Bob → Carol  (can't reorder by score!)
\`\`\`

To sort a map by score you'd end up copying it into a \`vector<pair>\` and sorting there. So if the goal is sorting, just start with \`vector<pair>\`.

### One-line rule

> **"Look up by name fast"**? → **map**
> **"Sort by score"** or **"deal with order"**? → **vector<pair>**

> 💡 Often you need both. Use map for fast lookup, then copy to vector<pair> at the end to sort — totally common.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Create a map to store ages!",
          code: "#include <map>\nusing namespace std;\n\n___<string, int> ages;\nages[\"Kim\"] = 15;\nages[\"Lee\"] = 16;",
          fillBlanks: [
            { id: 0, answer: "map", options: ["map", "dict", "vector", "set"] }
          ],
          explanation: "To store key-value pairs in C++, use map! It's the equivalent of Python's dict. Declare it as map<key_type, value_type>."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Predict the map output!",
          code: "#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nint main() {\n    map<string, int> m;\n    m[\"banana\"] = 2;\n    m[\"apple\"] = 5;\n    m[\"cherry\"] = 3;\n    for (auto& [k, v] : m) {\n        cout << k << \" \";\n    }\n    return 0;\n}",
          options: ["banana apple cherry ", "apple banana cherry ", "cherry banana apple ", "apple cherry banana "],
          answer: 1,
          explanation: "map automatically sorts by key! In alphabetical order: apple → banana → cherry. The insertion order doesn't matter!"
        },
        {
          id: "ch1-missing-key",
          type: "explain",
          title: "⚠️ Accessing a missing key with [] — dangerous behavior",
          content: `C++ map behaves very differently from Python when you access a missing key with \`[]\`. This is the trickiest part.

### Python — missing key → immediate error

\`\`\`python
d = {}
print(d["missing"])  # KeyError — crashes right away
\`\`\`

### C++ map — missing key → silently creates it with 0

\`\`\`cpp
map<string, int> m;
cout << m["missing"];  // Prints 0 (no error!)
cout << m.size();      // 1 — a key was just created!
\`\`\`

### Why dangerous? — silent typo bugs

\`\`\`cpp
scores["Aliec"] = 95;    // Typo! ("Aliec" instead of "Alice")
cout << scores["Alice"]; // Prints 0 — silently wrong
// Now the map has BOTH "Aliec": 95 AND "Alice": 0
\`\`\`

@Key: Using \`[]\` on a missing key **auto-creates** it with default value 0. No error — which makes this a sneaky bug that's hard to track down.

> Next page — how to *read* safely + when this behavior is actually *useful*.`
        },
        {
          id: "ch1-missing-key-safe",
          type: "explain",
          title: "✅ Safe reading + a useful application",
          content: `### Safe reading — check with \`count\` first

\`count(key)\` returns **1** if the key exists, **0** if not. Check before accessing to avoid the auto-create trap.

\`\`\`cpp
map<string, int> scores;
scores["Alice"] = 95;

// ❌ Dangerous — "Bob" doesn't exist, gets silently added as 0
cout << scores["Bob"];  // Prints 0, adds "Bob":0 to map

// ✅ Check with count first
if (scores.count("Bob") > 0) {
    cout << scores["Bob"];  // Only access if it exists
} else {
    cout << "missing";
}
\`\`\`

> 💡 There's also a \`find\` function — faster and more powerful, but it needs the *iterator* concept which is properly covered in the **next lesson (STL search functions)**. For now, \`count\` is enough.

---

### 💡 But this behavior is actually useful sometimes!

**Counting word occurrences:**

\`\`\`cpp
map<string, int> freq;
vector<string> words = {"apple", "banana", "apple", "cherry", "apple"};

for (string w : words) {
    freq[w]++;  // First time: created as 0, then +1
}               // After that: just adds +1 each time

// Result: apple=3, banana=1, cherry=1
\`\`\`

The auto-zero behavior means you don't need to **initialize before incrementing**. This is the heart of the **frequency map** pattern.

> 💡 Summary: regular *reads* → use \`count\` safely. *Counting/accumulating* → exploit the auto-create behavior with \`[]\`.`
        },
        {
          id: "ch1-pred-missing",
          type: "predict" as const,
          title: "Accessing a missing key?",
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    map<string, int> m;
    m["a"] = 1;
    cout << m["b"] << endl;
    cout << m.size() << endl;
    return 0;
}`,
          options: ["Error", "0\n1", "0\n2", "1\n1"],
          answer: 2,
          explanation: "m[\"b\"] doesn't exist, so it prints 0 and simultaneously adds \"b\":0 to the map! That's why size() is 2. This is one of C++ map's most common traps."
        },
        {
          id: "ch1-unordered",
          type: "explain",
          title: "📖 unordered_map — Faster Without Sorting!",
          content: `\`map\` sorts keys, so insert/search is **O(log n)**.
Don't need sorting? Use \`unordered_map\` for **O(1) average** — much faster!

O(1) means finding it **in one step** whether there are 1,000 or 1,000,000 students. O(log n) means about 20 comparisons for 1,000,000 students. Both are fast, but if you don't need sorting, unordered is faster!

\`\`\`cpp
#include <unordered_map>
using namespace std;

unordered_map<string, int> scores;
scores["Emma"] = 95;
scores["Jake"] = 87;
// Not sorted! But search is very fast
\`\`\`

Python's \`dict\` is actually more similar to C++'s \`unordered_map\`!
(Python dict also uses a hash table internally)

| | map | unordered_map |
|---|---|---|
| Sorted | Yes (by key) | No (no order) |
| Insert/Search | O(log n) | **O(1) average** |
| Internal Structure | Binary Search Tree | Hash Table |
| Header | \`<map>\` | \`<unordered_map>\` |
| Python Equivalent | — | **dict** |

💡 In most cases, \`unordered_map\` is faster! Only use \`map\` when you need sorted keys.`
        },
        {
          id: "ch1-question",
          type: "explain",
          title: "🙋 Question: Can't I just use a vector of pairs?",
          content: `**"Can't I just use a vector of pairs?"**

It looks similar, but there's a big difference!

With a vector, you have to search from beginning to end to find a key (slow). With a map, you find it instantly by key (fast)!

\`\`\`cpp
// vector<pair> — searching is slow O(n)
vector<pair<string, int>> v = {{"Emma", 95}, {"Jake", 87}};
// To find "Jake", you have to check one by one
for (auto& p : v) {
    if (p.first == "Jake") { /* found it! */ }
}

// map — searching is fast O(log n)
map<string, int> m = {{"Emma", 95}, {"Jake", 87}};
cout << m["Jake"];  // Direct access! 87
\`\`\`

💡 The more data you have, the bigger map's advantage! With 1 million entries, a vector needs up to 1 million comparisons, but a map only needs about 20.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Count Word Frequencies!",
          content: `Use a map to count how many times each word appears in the array, and print the results!`,
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    string words[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};

    map<string, int> freq;
    for (auto& w : words) {
        freq[w]++;
    }

    for (auto& [word, count] : freq) {
        cout << word << ": " << count << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    string words[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    map<string, int> freq;

    // Step 1: Loop through words and count each word in freq

    // Step 2: Iterate over freq and print "word: count"

    return 0;
}`,
          hint: "Use for(auto& w : words) { freq[w]++; } to count. Then for(auto& [word, count] : freq) { ... } to print. map auto-sorts, so no extra sort needed!",
          expectedOutput: `apple: 3
banana: 2
cherry: 1`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "map basics!",
          content: "Which statement about C++ `map` is **correct**?",
          options: [
            "map maintains insertion order like Python dict",
            "map automatically sorts by key",
            "map can be used without #include",
            "map allows duplicate keys"
          ],
          answer: 1,
          explanation: "C++ map automatically sorts by key! It does NOT maintain insertion order. You need #include <map>, and keys must be unique."
        }
      ]
    },
    // ============================================
    // Chapter 2: set
    // ============================================
    {
      id: "ch2",
      title: "set — No Duplicates!",
      emoji: "🎯",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎯 set — no duplicates + auto-sorted!",
          content: `You want only the unique scores from a list of exam results. With a vector you'd have to check for duplicates manually. **With set, just insert and it auto-removes duplicates + sorts!**

You've used Python's \`set\` before, right? C++ has \`set\` too:

\`\`\`cpp
#include <set>
using namespace std;

set<int> nums;
nums.insert(3);
nums.insert(1);
nums.insert(4);
nums.insert(1);  // Duplicate! Ignored
nums.insert(5);
// nums = {1, 3, 4, 5} — duplicates removed + auto-sorted!
\`\`\`

### Compared to Python

\`\`\`python
nums = set()
nums.add(3); nums.add(1); nums.add(4); nums.add(1); nums.add(5)
# nums = {1, 3, 4, 5} — duplicates removed! (order NOT guaranteed)
\`\`\`

| Python set 🐍 | C++ set ⚡ |
|---|---|
| \`s = set()\` | \`set<int> s;\` |
| \`s.add(x)\` | \`s.insert(x);\` |
| No duplicates, no guaranteed order | **No duplicates + auto-sorted!** |

C++ \`set\` is **auto-sorted ascending**, unlike Python's. (Same principle as map's auto-sorted keys.)

> Next page — common set operations (insert / erase / search).`
        },
        {
          id: "ch2-intro-methods",
          type: "explain",
          title: "🔧 set — key methods",
          content: `Common set functions. Almost identical to map's pattern, so nothing new.

\`\`\`cpp
set<int> s;

s.insert(10);      // Insert (ignored if already present)
s.erase(10);       // Delete
s.count(10);       // 1 if exists, 0 if not
s.find(10);        // Returns iterator (end() if not found)
s.size();          // Number of elements
s.empty();         // true if empty
\`\`\`

### Python comparison

| Python 🐍 | C++ set ⚡ |
|---|---|
| \`s.add(x)\` | \`s.insert(x);\` |
| \`s.remove(x)\` | \`s.erase(x);\` |
| \`x in s\` | \`s.count(x) > 0\` |
| \`len(s)\` | \`s.size();\` |
| \`not s\` | \`s.empty();\` |

> 💡 Functions look almost identical to \`map\`'s. **The one difference** — set has only keys (no values), so set's find/count just tell you whether the value exists.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Add elements to the set!",
          code: "#include <set>\nusing namespace std;\n\nset<int> s;\ns.___(10);\ns.___(20);\ns.___(10);  // Duplicate ignored!",
          fillBlanks: [
            { id: 0, answer: "insert", options: ["insert", "add", "push", "append"] }
          ],
          explanation: "To add elements to a C++ set, use insert()! It's like Python's add(). push_back and append don't work with set."
        },
        {
          id: "ch2-set-mini",
          type: "practice" as const,
          title: "✋ Quick — distinct students attended",
          content: `**Scenario**: A name was called 8 times in class today (with duplicates). How many **distinct students** showed up?

\`\`\`
Calls: Alice, Bob, Alice, Carol, Bob, Alice, David, Carol
Distinct: 4
\`\`\`

Insert them all into a set and print \`size()\`.

> 💡 \`set\` deduplicates automatically. Just \`insert\` everything and done.`,
          starterCode: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    string names[] = {"Alice", "Bob", "Alice", "Carol", "Bob", "Alice", "David", "Carol"};

    // 👇 Insert all into a set and print set.size()


    return 0;
}`,
          code: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    string names[] = {"Alice", "Bob", "Alice", "Carol", "Bob", "Alice", "David", "Carol"};

    set<string> attended;
    for (auto& n : names) attended.insert(n);
    cout << attended.size();

    return 0;
}`,
          hint: "set<string> attended; for (auto& n : names) attended.insert(n); cout << attended.size(); — set deduplicates by itself.",
          expectedOutput: `4`
        },
        {
          id: "ch2-unordered",
          type: "explain",
          title: "🎯 unordered_set — Fast Without Sorting!",
          content: `If \`set\` is too slow from sorting? Use \`unordered_set\`!

\`\`\`cpp
#include <unordered_set>
using namespace std;

unordered_set<int> s;
s.insert(3);
s.insert(1);
s.insert(4);
// Not sorted! But search is O(1) fast
\`\`\`

Python's \`set\` is actually more similar to C++'s \`unordered_set\`!
(Python set also uses a hash table internally)

| | set | unordered_set |
|---|---|---|
| Sorted | Yes (auto-sorted) | No (no order) |
| Insert/Search | O(log n) | **O(1) average** |
| Internal Structure | Binary Search Tree | Hash Table |
| Header | \`<set>\` | \`<unordered_set>\` |
| Python Equivalent | — | **set** |

💡 Need sorted order? Use \`set\`. Only need fast lookup? Use \`unordered_set\`!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Predict the set output!",
          code: "#include <iostream>\n#include <set>\nusing namespace std;\nint main() {\n    set<int> s;\n    s.insert(5);\n    s.insert(2);\n    s.insert(8);\n    s.insert(2);\n    s.insert(5);\n    cout << s.size() << \": \";\n    for (auto x : s) {\n        cout << x << \" \";\n    }\n    return 0;\n}",
          options: ["5: 5 2 8 2 5 ", "3: 5 2 8 ", "3: 2 5 8 ", "5: 2 2 5 5 8 "],
          answer: 2,
          explanation: "set removes duplicates and auto-sorts! From {5, 2, 8, 2, 5}, removing duplicates gives {2, 5, 8} with size 3. Printed in sorted order: 2 5 8!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "🎯 map vs set vs unordered — Full Comparison!",
          content: `Let's compare all four containers at a glance!

| Container | Purpose | Sorted | Time Complexity | Python Equivalent |
|---|---|---|---|---|
| \`map\` | Key-value pairs | Yes (by key) | O(log n) | — |
| \`unordered_map\` | Key-value pairs | No | **O(1)** | **dict** |
| \`set\` | Values only (no dups) | Yes (auto-sorted) | O(log n) | — |
| \`unordered_set\` | Values only (no dups) | No | **O(1)** | **set** |

**When to use which?**

1. **Key-value storage + need sorted order** → \`map\`
2. **Key-value storage + need fast lookup** → \`unordered_map\`
3. **Remove duplicates + need sorted order** → \`set\`
4. **Remove duplicates + need fast lookup** → \`unordered_set\`

\`\`\`cpp
// Each requires its own #include
#include <map>             // map
#include <unordered_map>   // unordered_map
#include <set>             // set
#include <unordered_set>   // unordered_set
\`\`\`

💡 \`O(log n)\` vs \`O(1)\` — the more elements you have, the bigger the difference!
But if you need sorted order, you must use the sorted version.`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Remove Duplicates & Sort!",
          content: `Use a set to remove duplicates from the number array and print them in sorted order!`,
          code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int arr[] = {4, 2, 7, 2, 9, 4, 1, 7, 3};

    set<int> s;
    for (auto x : arr) {
        s.insert(x);
    }

    cout << "Count: " << s.size() << endl;
    for (auto x : s) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int arr[] = {4, 2, 7, 2, 9, 4, 1, 7, 3};
    set<int> s;

    // Insert all elements of arr into s

    // Print s.size() then print all elements

    return 0;
}`,
          hint: "Use for(auto x : arr) { s.insert(x); } to insert. set auto-removes duplicates and auto-sorts! Use s.size() for count and range-for to print",
          expectedOutput: `Count: 6
1 2 3 4 7 9 `
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "set quiz!",
          content: "Which statement about C++ `set` is **incorrect**?",
          options: [
            "It does not allow duplicate elements",
            "Elements are automatically sorted",
            "Use insert() to add elements",
            "Use push_back() to add elements"
          ],
          answer: 3,
          explanation: "set doesn't have push_back()! Use insert() to add elements. set doesn't allow duplicates and elements are auto-sorted."
        }
      ]
    },
    // ============================================
    // Chapter 3: map Iteration
    // ============================================
    {
      id: "ch3",
      title: "map Iteration",
      emoji: "🔄",
      steps: [
        {
          id: "ch3-iter",
          type: "explain",
          title: "📖 map iteration — the most common way",
          content: `**First: map is a collection of pairs**

map stores each element internally as a **pair**:

\`\`\`cpp
map<string, int> scores = {{"Emma", 95}, {"Jake", 87}};
// Internally:
// pair<string, int>{"Emma", 95}
// pair<string, int>{"Jake", 87}
\`\`\`

So when you iterate, each element is a **pair**. That's why \`.first\` (key) and \`.second\` (value) work.

---

### ⭐ Most common: structured bindings (C++17)

Unpack the pair directly into \`[key, val]\`:

\`\`\`cpp
for (auto& [key, val] : scores) {
    cout << key << ": " << val << endl;
}
// Emma: 95
// Jake: 87
\`\`\`

@Key: \`map\` **always sorts keys automatically**! Regardless of insertion order, output is in alphabetical/numerical order. Python dict preserves insertion order, but C++ map does not.

### Compared to Python

\`\`\`python
for key, val in scores.items():
    print(f"{key}: {val}")
\`\`\`

C++'s \`auto& [key, val]\` ≈ Python's \`key, val\`. Practically identical.

> 💡 In practice **this method alone is enough**. The next page covers the other two methods, but they're rarely used.`,
        },
        {
          id: "ch3-iter-other",
          type: "explain",
          title: "📖 (Reference) Two other iteration methods",
          content: `Besides structured bindings, two more methods exist. **Rarely used** but you'll recognize them in others' code:

### Method 2: range-for + pair as-is

Range-for, but keep the pair intact and access via \`.first\`, \`.second\`:

\`\`\`cpp
for (auto& p : scores) {
    cout << p.first << ": " << p.second << endl;
}
// p.first = key,  p.second = value
\`\`\`

Methods 1 and 2 are **both range-for** — the difference is whether you unpack the pair (1) or use it directly (2).

### Method 3: direct iterator

Manually handle \`begin()\`~\`end()\` iterators. \`it\` acts like a pointer to each pair:

\`\`\`cpp
for (auto it = scores.begin(); it != scores.end(); it++) {
    cout << it->first << ": " << it->second << endl;
}
// it->first = key,  it->second = value (arrow -> to access)
\`\`\`

### Frequency comparison

| Method | Frequency | When |
|---|---|---|
| 1 (structured bindings) | ⭐⭐⭐ Almost always | Modern code, competitive programming |
| 2 (pair) | ⭐ Occasionally | Pre-C++17, pair itself needed |
| 3 (iterator) | ⭐ Rarely | **Delete during iteration** etc. — next page |

> 💡 Memorize Method 1 and start. Methods 2, 3 are "good to know they exist."`,
        },
        {
          id: "ch3-iter-erase",
          type: "explain",
          title: "⚠️ (Advanced) Deleting while iterating — iterator trap",
          content: `The rare case where Method 3 (iterator) is *truly needed* — **erasing during iteration**.

### ❌ This crashes!

\`\`\`cpp
for (auto it = m.begin(); it != m.end(); it++) {  // it++ in loop header
    if (it->second < 0) {
        m.erase(it);  // it becomes invalid...
    }
    // loop header runs it++ on invalid iterator → crash!
}
\`\`\`

When you call \`erase(it)\`, that iterator becomes **invalid (dangling)**. Like crossing out a row and trying to find "the next row" using the old row number — positions have shifted.

### ✅ The correct way

\`\`\`cpp
for (auto it = m.begin(); it != m.end(); ) {  // no it++ in header!
    if (it->second < 0) {
        it = m.erase(it);  // erase returns the next valid iterator
    } else {
        it++;              // only advance manually when NOT erasing
    }
}
\`\`\`

**Key:** \`m.erase(it)\` deletes the element AND **returns the next valid iterator**. So \`it = m.erase(it)\` already moves to the next element. That's why we skip \`it++\` when erasing — only the \`else\` branch advances.

> 💡 This pattern is only needed when **erasing during iteration**. Otherwise Method 1 (structured bindings) is enough.`,
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Iterate over a map using structured bindings!",
          code: "map<string, int> scores = {{\"Emma\", 95}, {\"Jake\", 87}};\nfor (auto& ___ : scores) {\n    cout << key << \": \" << val << endl;\n}",
          fillBlanks: [
            { id: 0, answer: "[key, val]", options: ["[key, val]", "(key, val)", "key, val", "p.first, p.second"] }
          ],
          explanation: "Structured bindings from C++17! auto& [key, val] unpacks the pair directly. This is the most commonly used method."
        }
      ]
    },
    // ============================================
    // Chapter 4: map Functions
    // ============================================
    {
      id: "ch4",
      title: "map Functions",
      emoji: "🔧",
      steps: [
        {
          id: "ch4-func",
          type: "explain",
          title: "🔧 Key map functions — search · check · delete",
          content: `The functions you'll use most often with map.

\`\`\`cpp
map<string, int> scores;
scores["Emma"] = 95;
scores["Jake"] = 87;

// Check if a key exists
if (scores.count("Emma") > 0) {
    cout << "Emma exists!" << endl;
}

// Search with find (returns end() if not found)
auto it = scores.find("Jake");
if (it != scores.end()) {
    cout << it->second << endl;  // 87
}

// Check the size
cout << scores.size() << endl;   // 2
cout << scores.empty() << endl;  // 0 (false, not empty)

// Delete a key-value pair
scores.erase("Jake");
cout << scores.size() << endl;   // 1
\`\`\`

### Compared to Python

| Python 🐍 | C++ map ⚡ |
|---|---|
| \`"key" in d\` | \`m.count("key") > 0\` |
| \`d.get("key")\` | \`m.find("key")\` |
| \`del d["key"]\` | \`m.erase("key")\` |
| \`len(d)\` | \`m.size()\` |
| \`not d\` | \`m.empty()\` |

> Next page — both \`count\` and \`find\` look like "search" — *which one to use when* for cleanest code.`,
        },
        {
          id: "ch4-func-cf",
          type: "explain",
          title: "🆚 count vs find — which one when?",
          content: `Both "search" but they return different things, so usage differs.

| | \`m.count(key)\` | \`m.find(key)\` |
|---|---|---|
| Returns | 1 (found) / 0 (not) | iterator / \`m.end()\` (not) |
| Use when | "is it there?" only | "if there, also use the value" |

\`\`\`cpp
// count — just check existence
if (m.count("Emma") > 0) {
    cout << "Emma exists!";
}

// find — get the value too
auto it = m.find("Emma");
if (it != m.end()) {
    cout << it->second;  // access value
}
\`\`\`

---

### 💡 Deleting while iterating — the easiest pattern

The iterator approach (\`it = m.erase(it)\`) you saw earlier is correct but tricky. **Easier alternative**:

\`\`\`cpp
// 1) Collect the keys to delete
vector<string> toDelete;
for (auto& [k, v] : m) {
    if (v < 0) toDelete.push_back(k);
}

// 2) Delete after the loop finishes
for (auto& k : toDelete) {
    m.erase(k);
}
\`\`\`

Iteration and deletion are **separated** — no iterator-invalidation worries, and the code reads cleanly. This is the recommended approach for general cases.`,
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "count vs size!",
          code: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    map<string, int> m;
    m["a"] = 1;
    m["b"] = 2;
    cout << m.count("a") << endl;
    cout << m.count("c") << endl;
    cout << m.size() << endl;
    return 0;
}`,
          options: ["1\n0\n2", "1\n1\n2", "2\n0\n2", "1\n0\n3"],
          answer: 0,
          explanation: "count() returns 1 if the key exists, 0 if not! 'a' exists → 1, 'c' doesn't → 0. size() is the number of elements in the map = 2."
        }
      ]
    },
    // ============================================
    // Chapter 5: map Quiz
    // ============================================
    {
      id: "ch5",
      title: "map Quiz",
      emoji: "📖",
      steps: [
        {
          id: "ch5-q1",
          type: "quiz",
          title: "map declaration!",
          content: `Which is the correct way to declare a map that stores student names (string) as keys and scores (int) as values?`,
          options: [
            "map<int, string> scores;",
            "map<string, int> scores;",
            "map scores<string, int>;",
            "dict<string, int> scores;"
          ],
          answer: 1,
          explanation: "Declare with map<key_type, value_type>! Name (string) is the key and score (int) is the value, so map<string, int> is correct. dict is Python!"
        },
        {
          id: "ch5-q3",
          type: "quiz",
          title: "map vs unordered_map!",
          content: "Which statement about `map` vs `unordered_map` is **correct**?",
          options: [
            "map is always faster than unordered_map",
            "unordered_map sorts keys, map doesn't",
            "map is O(log n), unordered_map is O(1) average",
            "Both use #include <map>"
          ],
          answer: 2,
          explanation: "map sorts keys with O(log n) operations, while unordered_map doesn't sort and has O(1) average! unordered_map needs #include <unordered_map>."
        },
        {
          id: "ch5-q5",
          type: "quiz",
          title: "Accessing a missing key!",
          content: `What is the output of this code?

\`\`\`cpp
map<string, int> m;
m["apple"] = 3;
cout << m["banana"] << endl;
cout << m.size() << endl;
\`\`\``,
          options: [
            "Error\n1",
            "0\n1",
            "0\n2",
            "Error\n2"
          ],
          answer: 2,
          explanation: "Accessing a missing key with [] auto-creates it with default value 0! \"banana\" is created as 0, so size becomes 2. This is a classic C++ map trap."
        },
      ]
    },
    // ============================================
    // Chapter 6: set Quiz & Summary
    // ============================================
    {
      id: "ch6",
      title: "set Quiz & Summary",
      emoji: "🏆",
      steps: [
        {
          id: "ch6-q2",
          type: "quiz",
          title: "set properties!",
          content: `What is s.size() after this code runs?

\`\`\`cpp
set<int> s = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
\`\`\``,
          options: [
            "10",
            "7",
            "8",
            "6"
          ],
          answer: 1,
          explanation: "set removes duplicates! From {3, 1, 4, 1, 5, 9, 2, 6, 5, 3}, removing duplicates gives {1, 2, 3, 4, 5, 6, 9} — that's 7 elements."
        },
        {
          id: "ch6-q4",
          type: "quiz",
          title: "set output order!",
          content: `What's the output of this code?

\`\`\`cpp
set<string> s;
s.insert("cherry");
s.insert("apple");
s.insert("banana");
for (auto& x : s) {
    cout << x << " ";
}
\`\`\``,
          options: [
            "cherry apple banana ",
            "apple banana cherry ",
            "banana apple cherry ",
            "apple cherry banana "
          ],
          answer: 1,
          explanation: "set auto-sorts its elements! Strings are sorted alphabetically: apple → banana → cherry."
        },
        {
          id: "ch6-summary",
          type: "explain",
          title: "🎉 map & set Mastered!",
          content: `## 🏆 Lesson 16 Complete!

Let's review what you learned today!

### 📖 map
- \`map<K, V>\` — stores key-value pairs, **auto-sorted by key**
- \`m["key"] = value\` — insert/update
- \`m.count("key")\`, \`m.find("key")\` — search
- \`m.erase("key")\` — delete

### 🎯 set
- \`set<T>\` — **no duplicates + auto-sorted**
- \`s.insert(x)\` — insert
- \`s.count(x)\`, \`s.find(x)\` — search
- \`s.erase(x)\` — delete

### ⚡ Unordered Versions
- \`unordered_map\`, \`unordered_set\` — no sorting, **O(1) fast!**
- Most similar to Python's \`dict\` and \`set\`

### Python → C++ Summary

| Python 🐍 | C++ ⚡ |
|---|---|
| \`dict\` | \`map\` / \`unordered_map\` |
| \`set\` | \`set\` / \`unordered_set\` |
| \`d[key] = val\` | \`m[key] = val;\` |
| \`s.add(x)\` | \`s.insert(x)\` |
| \`x in d\` | \`m.count(x) > 0\` |

🚀 **Next lesson preview:** STL Algorithms — \`sort\`, \`find\`, \`count\` and more powerful tools!`
        }
      ]
    }
  ]
}
