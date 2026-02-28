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
          content: `You've used Python's \`dict\` before, right? In C++, \`map\` does the same job!

\`\`\`cpp
#include <map>
#include <string>
using namespace std;

map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
scores["Charlie"] = 92;
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
scores = {}
scores["Alice"] = 95
scores["Bob"] = 87
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
scores["Alice"] = 95;
scores["Bob"] = 87;
// Stored order: Alice → Bob → Charlie (alphabetical!)
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
          id: "ch1-methods",
          type: "explain",
          title: "📖 Iterating and Searching a map!",
          content: `Let's learn how to traverse and search through a map!

**Iterating — using range-for**
\`\`\`cpp
map<string, int> scores = {
    {"Alice", 95}, {"Bob", 87}
};

for (auto& [key, val] : scores) {
    cout << key << ": " << val << endl;
}
// Alice: 95
// Bob: 87  (sorted by key!)
\`\`\`

Compare with Python:

**Python 🐍:**
\`\`\`python
for key, val in scores.items():
    print(f"{key}: {val}")
\`\`\`

C++'s \`auto& [key, val]\` works just like Python's \`key, val\`!

**Search Methods**
\`\`\`cpp
// Check if a key exists
if (scores.count("Alice") > 0) {
    cout << "Alice exists!" << endl;
}

// Search with find (returns end() if not found)
auto it = scores.find("Bob");
if (it != scores.end()) {
    cout << it->second << endl;  // 87
}

// Delete a key-value pair
scores.erase("Bob");

// Check the size
cout << scores.size() << endl;  // 1
\`\`\`

| Python 🐍 | C++ map ⚡ |
|---|---|
| \`"key" in d\` | \`m.count("key") > 0\` |
| \`d.get("key")\` | \`m.find("key")\` |
| \`del d["key"]\` | \`m.erase("key")\` |
| \`len(d)\` | \`m.size()\` |

💡 \`count()\` returns 1 if the key exists, 0 if not! Great for quick existence checks.`
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
          id: "ch1-unordered",
          type: "explain",
          title: "📖 unordered_map — Faster Without Sorting!",
          content: `\`map\` sorts keys, so insert/search is **O(log n)**.
Don't need sorting? Use \`unordered_map\` for **O(1) average** — much faster!

\`\`\`cpp
#include <unordered_map>
using namespace std;

unordered_map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
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
          content: `You've used Python's \`set\` before, right? C++ has \`set\` too!

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
          id: "ch3-q2",
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
          id: "ch3-q3",
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
          id: "ch3-q4",
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
          id: "ch3-summary",
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
