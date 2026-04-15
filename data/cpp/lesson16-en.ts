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
          title: "📖 map — Store Key-Value Pairs!",
          content: `Imagine you're building a school grade management system. You want to look up 'Emma's' score instantly. With a vector, you'd have to search one by one from the beginning. With 1000 students? Way too slow! You need a tool that lets you **look up by name directly**.

You've used Python's \`dict\` before, right? In C++, \`map\` does the same job!

\`\`\`cpp
#include <map>
#include <string>
using namespace std;

map<string, int> scores;
scores["Emma"] = 95;
scores["Jake"] = 87;
scores["Charlie"] = 92;
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
scores = {}
scores["Emma"] = 95
scores["Jake"] = 87
scores["Charlie"] = 92
\`\`\`

Almost identical, right? But there's an important difference!

| Python dict 🐍 | C++ map ⚡ |
|---|---|
| \`scores = {}\` | \`map<string, int> scores;\` |
| \`scores["key"] = val\` | \`scores["key"] = val;\` (same!) |
| Maintains insertion order | **Auto-sorts by key!** |
| No \`#include\` needed | \`#include <map>\` required |

💡 C++ \`map\` **automatically sorts** by key! Stored in alphabetical order.

\`\`\`cpp
map<string, int> scores;
scores["Charlie"] = 92;
scores["Emma"] = 95;
scores["Jake"] = 87;
// Stored order: Emma → Jake → Charlie (alphabetical!)
\`\`\``
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
          title: "⚠️ What happens when you access a missing key with []?",
          content: `C++ map behaves very differently from Python when you access a **missing key with \`[]\`**!

**Python — missing key → immediate error**
\`\`\`python
d = {}
print(d["missing"])  # KeyError: 'missing' — crashes right away
\`\`\`

**C++ map — missing key → silently creates it with 0**
\`\`\`cpp
map<string, int> m;
cout << m["missing"];  // Prints 0 (no error!)
cout << m.size();      // 1 — a key was just created!
\`\`\`

Why is this dangerous? Typos won't cause any errors:
\`\`\`cpp
scores["Aliec"] = 95;    // Typo! ("Aliec" instead of "Alice")
cout << scores["Alice"]; // Prints 0 — silently wrong
// Now the map has BOTH "Aliec": 95 AND "Alice": 0
\`\`\`

@Key: The moment you use \`[]\` on a missing key, it gets **auto-created with default value 0**. No error — which makes this a sneaky bug that's hard to track down!

---

**Always check before reading:**

\`\`\`cpp
map<string, int> scores;
scores["Alice"] = 95;

// ❌ Dangerous — "Bob" doesn't exist, gets silently added as 0
cout << scores["Bob"];  // Prints 0, adds "Bob":0 to map

// ✅ Safe — check with count first
if (scores.count("Bob") > 0) {
    cout << scores["Bob"];  // Only access if it exists
}

// ✅ Safe — use find
auto it = scores.find("Bob");
if (it != scores.end()) {
    cout << it->second;  // it->second is the value
}
\`\`\`

---

💡 **But this behavior is actually useful for frequency counting!**

\`\`\`cpp
map<string, int> freq;
vector<string> words = {"apple", "banana", "apple", "cherry", "apple"};

for (string w : words) {
    freq[w]++;  // First time: created as 0, then +1
}               // After that: just adds +1 each time

// Result: apple=3, banana=1, cherry=1
\`\`\`

The auto-zero behavior means you don't need to initialize before incrementing!`
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
          content: `Count how many times each word appears in the given word array!

Use a map to count each word, then iterate and print.
Since map auto-sorts, the output will be in alphabetical order!`,
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
    for (auto& w : words) {
        freq[w]++;
    }

    for (auto& [word, count] : freq) {
        cout << word << ": " << count << endl;
    }

    return 0;
}`,
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
          title: "🎯 set — No Duplicates + Auto-Sorted!",
          content: `You want to find only the unique scores from a list of exam results. With a vector? You'd have to manually check for duplicates. With set, just insert and it automatically removes duplicates + sorts!

You've used Python's \`set\` before, right? C++ has \`set\` too!

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

Let's compare with Python:

**Python 🐍:**
\`\`\`python
nums = set()
nums.add(3)
nums.add(1)
nums.add(4)
nums.add(1)  # Duplicate! Ignored
nums.add(5)
# nums = {1, 3, 4, 5} — duplicates removed! (order NOT guaranteed)
\`\`\`

| Python set 🐍 | C++ set ⚡ |
|---|---|
| \`s = set()\` | \`set<int> s;\` |
| \`s.add(x)\` | \`s.insert(x);\` |
| \`s.remove(x)\` | \`s.erase(x);\` |
| \`x in s\` | \`s.count(x) > 0\` |
| No duplicates, NO guaranteed order | **No duplicates + auto-sorted!** |
| \`len(s)\` | \`s.size()\` |

**Key Methods**
\`\`\`cpp
s.insert(10);      // Insert
s.erase(10);       // Delete
s.count(10);       // 1 if exists, 0 if not
s.find(10);        // Returns iterator (end() if not found)
s.size();          // Number of elements
s.empty();         // true if empty
\`\`\`

💡 Unlike Python's set, C++ \`set\` is **auto-sorted**! Always stored in ascending order.`
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
          content: `Remove duplicates from the given number array and print them in sorted order!

Using a set, you can remove duplicates and sort in one step!`,
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
          expectedOutput: `Count: 6
1 2 3 4 7 9`
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
          title: "📖 map Iteration — 3 Ways",
          content: `**How map stores its data**

First, you need to know this — map stores each element internally as a **pair**!

\`\`\`cpp
map<string, int> scores = {{"Emma", 95}, {"Jake", 87}};
// Internally stored as:
// pair<string, int>{"Emma", 95}
// pair<string, int>{"Jake", 87}
\`\`\`

So when you iterate over a map, each element comes out as a **pair**. That's why you can access \`.first\` (key) and \`.second\` (value).

---

**Iterating — 3 ways**

**Method 1: Structured bindings — range-for (most common, C++17)**

Unpacks the pair directly into \`[key, val]\`.
\`\`\`cpp
for (auto& [key, val] : scores) {
    cout << key << ": " << val << endl;
}
// Emma: 95
// Jake: 87
\`\`\`

**Method 2: range-for + pair access**

Still a range-for, but receives the pair as-is and accesses via \`.first\`, \`.second\`.
\`\`\`cpp
for (auto& p : scores) {
    cout << p.first << ": " << p.second << endl;
}
// p.first = key,  p.second = value
\`\`\`

Methods 1 and 2 are **both range-for**! The difference is whether you unpack the pair (Method 1) or use it directly (Method 2).

**Method 3: Direct iterator (traditional approach)**

Manually handles begin()~end() iterators. \`it\` acts like a pointer to each pair.
\`\`\`cpp
for (auto it = scores.begin(); it != scores.end(); it++) {
    cout << it->first << ": " << it->second << endl;
}
// it->first = key,  it->second = value (arrow -> to access)
\`\`\`

@Key: \`map\` **always sorts keys automatically**! Regardless of insertion order, output is in alphabetical/numerical order. Python dict preserves insertion order, but C++ map does not.

**How often is each method actually used?**

| Method | Frequency | When to use |
|---|---|---|
| Method 1 (structured bindings) | ⭐⭐⭐ Almost always | Modern C++17 code, competitive programming |
| Method 2 (pair) | ⭐ Occasionally | Pre-C++17 code, when you need to pass the pair itself |
| Method 3 (iterator) | ⭐ Rarely | When you need to delete during iteration or manipulate positions |

The rare case where Method 3 is needed — **deleting elements while iterating**:

❌ **This causes a crash!**
\`\`\`cpp
for (auto it = m.begin(); it != m.end(); it++) {  // it++ in loop header
    if (it->second < 0) {
        m.erase(it);  // it becomes invalid (dangling)...
    }
    // loop header runs it++ on invalid iterator → crash!
}
\`\`\`

When you call \`erase(it)\`, that iterator becomes **invalid (dangling)**. It's like crossing out a row from a list and then trying to find "the next row" using the old row number — everything has shifted.

✅ **The correct way:**
\`\`\`cpp
for (auto it = m.begin(); it != m.end(); ) {  // no it++ in header!
    if (it->second < 0) {
        it = m.erase(it);  // erase() RETURNS the next valid iterator!
    } else {
        it++;              // only advance manually when NOT erasing
    }
}
\`\`\`

**Key insight**: \`m.erase(it)\` deletes the element AND **returns the next valid iterator**!
So \`it = m.erase(it)\` already moves you to the next element.
That's why we skip \`it++\` after erasing — only the \`else\` branch advances the iterator.

Compare with Python:

**Python 🐍:**
\`\`\`python
for key, val in scores.items():
    print(f"{key}: {val}")
\`\`\`

C++'s \`auto& [key, val]\` works just like Python's \`key, val\`!

For competitive programming and everyday code, **knowing Method 1 is enough**. Think of Methods 2 and 3 as "good to know they exist."`,
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
          title: "🔧 Key map Functions",
          content: `Let's look at the most commonly used map functions!

**Search & Check Functions**
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

| Python 🐍 | C++ map ⚡ |
|---|---|
| \`"key" in d\` | \`m.count("key") > 0\` |
| \`d.get("key")\` | \`m.find("key")\` |
| \`del d["key"]\` | \`m.erase("key")\` |
| \`len(d)\` | \`m.size()\` |
| \`not d\` | \`m.empty()\` |

**count vs find — When to use which?**

• \`m.count(key)\` — returns 1 if found, 0 if not (for simple existence checks)
• \`m.find(key)\` — returns an iterator if found, end() if not (when you also need the value)

\`\`\`cpp
// count — just checking if it exists
if (m.count("Emma") > 0) {
    cout << "Emma exists!";
}

// find — checking AND using the value
auto it = m.find("Emma");
if (it != m.end()) {
    cout << it->second;  // access the value too
}
\`\`\`

---

**💡 Deleting while iterating — the easier way**

Deleting with an iterator while iterating is complex. Here's an easier alternative:

\`\`\`cpp
// ⚙️ Iterator method (complex)
for (auto it = m.begin(); it != m.end(); ) {
    if (it->second < 0) it = m.erase(it);
    else it++;
}

// ✅ Collect then delete (easier!)
vector<string> toDelete;
for (auto& [k, v] : m) {         // iterate conveniently with range-for
    if (v < 0) toDelete.push_back(k);
}
for (auto& k : toDelete) {        // delete after the loop finishes
    m.erase(k);
}
\`\`\`

Separating iteration and deletion keeps it safe and easy to read!`,
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
