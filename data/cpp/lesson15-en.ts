// ============================================
// C++ Lesson 15: pair & tuple
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson15EnData: LessonData = {
  id: "cpp-15",
  title: "pair & tuple",
  emoji: "🔗",
  description: "Bundle two values together! Learn pair and tuple.",
  chapters: [
    // ============================================
    // Chapter 1: pair & tuple
    // ============================================
    {
      id: "ch1",
      title: "pair & tuple",
      emoji: "🔗",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔗 pair — Why we need it",
          content: `Say you're building a class score sheet. Each student has a name and a score that **always travel together**. With separate variables?

\`\`\`cpp
string name1; int score1;
string name2; int score2;
string name3; int score3;
// ... 30 students = 60 variables 😱
\`\`\`

Two vectors are better, but introduce another bug:

\`\`\`cpp
vector<string> names  = {"Kim", "Lee", "Park"};
vector<int>    scores = {95, 88, 92};
// Sort scores? names and scores get sorted independently —
// "Kim → 88", "Lee → 95" mismatch nightmare!
\`\`\`

You need name and score **as one unit**. The \`struct\` from the previous lesson works, but defining a whole struct for "just two values" is overkill. That's where **pair** comes in.

> 🎯 One line: **pair = "a tiny anonymous struct for two values".**

\`\`\`cpp
#include <utility>   // pair lives here

pair<string, int> p = {"Kim", 95};
//   └────────────┘
//   first type, second type

cout << p.first;   // "Kim"
cout << p.second;  // 95
\`\`\`

The names \`.first\`, \`.second\` are a bit awkward, right? That's pair's tradeoff — it **doesn't tell you what each value semantically means**. If meaning matters, use a struct. If you're just bundling temporarily, use a pair.

Next page — header info, ways to create a pair, and the Python comparison 👇`,
        },
        {
          id: "ch1-creation",
          type: "explain",
          title: "🔗 Ways to create a pair + header notes",
          content: `### Header — where does pair live?

The official header is \`<utility>\`. That said, if you're already including \`<vector>\`, \`<algorithm>\`, or \`<map>\`, those usually pull \`pair\` in for you, so it works without adding \`<utility>\`.

**In practice you pick one of two workflows:**
- **Safe mode**: write \`#include <utility>\` whenever you use pair. Works in any header setup, no surprises.
- **Lean mode**: skip it and rely on whichever STL header you're already including. If the compiler complains with \`'pair' was not declared\`, just add \`<utility>\` then.

Both are fine. You don't have to memorize which header pulls in what — the compiler will tell you.

### Three ways to create one (same result)

\`\`\`cpp
pair<string, int> p1 = {"Kim", 95};          // braces — most common
pair<string, int> p2 = make_pair("Lee", 88); // make_pair function
auto p3 = make_pair("Park", 77);             // auto skips the type
\`\`\`

All three give the same result, so pick whichever you like. The first form (\`{a, b}\`) is the most common in modern code.

### Same idea as Python tuples

| Python 🐍 | C++ pair ⚡ |
|---|---|
| \`p = ("Kim", 95)\` | \`pair<string,int> p = {"Kim", 95};\` |
| \`p[0]\`, \`p[1]\` | \`p.first\`, \`p.second\` |
| Any number of items | **Exactly 2 only!** |

> 💡 For 3+ values you'll meet \`tuple\` soon. But by far the most common case is "exactly two paired things" — coordinates (x,y), name-score, index-distance — which is why pair shows up far more in real code.`,
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Pick the right types for the pair!",
          code: "pair<___, ___> p = {3, 7};",
          fillBlanks: [
            { id: 0, answer: "int", options: ["string", "int", "double", "char"] },
            { id: 1, answer: "int", options: ["string", "int", "double", "char"] }
          ],
          explanation: "Both 3 and 7 are integers, so it's pair<int, int>! The types in a pair must match the values you're storing."
        },
        {
          id: "ch1-tuple",
          type: "explain",
          title: "🔗 tuple — bundling 3 or more",
          content: `pair holds exactly 2. For 3 or more, use **tuple**.

\`\`\`cpp
#include <tuple>

tuple<string, int, double> t = {"Kim", 15, 3.8};
//                              name   age   gpa
\`\`\`

### Two ways to read values out

\`.first/.second\` no longer cuts it (3+ values). Pick one of these:

**① Read one at a time — \`get<index>(t)\`**

\`\`\`cpp
cout << get<0>(t);   // "Kim"
cout << get<1>(t);   // 15
cout << get<2>(t);   // 3.8
\`\`\`

\`get<0>(t)\` — the **index goes inside \`<>\`, the tuple inside \`()\`**. Looks weird at first, but it just means \`t[0]\`. One catch: the number inside \`<>\` must be a **compile-time constant** — you can't put a variable \`i\` and write \`get<i>(t)\`.

**② ⭐ Unpack all at once — structured bindings (C++17+)**

\`\`\`cpp
auto [name, age, gpa] = t;
\`\`\`

The name sounds fancy, but the idea is simple: **structured bindings** = "syntax that **binds** a structured bundle (tuple / pair / struct) to multiple **named** variables." In plain English:

- The single line \`auto [name, age, gpa] = t;\`
- **declares three new variables** \`name\`, \`age\`, \`gpa\`
- and **assigns** the tuple's 0 / 1 / 2 values to them respectively

Same idea as Python's \`name, age, gpa = t\`. Difference: C++ wraps the names in \`auto [ ]\`.

> 💡 Where it's used:
> - **pair / tuple**: \`auto [a, b] = p;\`
> - **struct**: \`auto [x, y] = point;\` (public members work)
> - **map iteration**: \`for (auto& [key, value] : myMap)\` ← extremely common (next lesson)
> - **multi-value return**: \`auto [a, b] = getValues();\`

**This single feature fixed most of tuple's readability problems.** It's the default in modern code.

> 💡 You may run into the older \`tie(name, age, gpa) = t;\` in legacy code or older books — it does the same thing as ②. Recognize it and move on; you don't need to write it. **But the \`tie\` keyword itself shows up again next page in a different (and still current) role: comparison.**

Next page — where tuple actually shows up, and how to choose between struct/pair/tuple 👇`,
        },
        {
          id: "ch1-tuple-usage",
          type: "explain",
          title: "🤔 How often is tuple used in practice?",
          content: `Less often than pair. But **not negligibly.** Three patterns you'll see:

### 1. Returning multiple values + structured bindings (common)

\`\`\`cpp
tuple<int, int, string> getStudent() { ... }

auto [age, score, name] = getStudent();   // standard modern-C++ pattern
\`\`\`

When a function needs to return several values and you don't want to define a whole struct just for that, tuple-with-structured-bindings is the go-to.

### 2. \`tie()\` for lexicographic comparison (idiomatic)

\`\`\`cpp
struct Point { int x, y; };
bool operator<(const Point& a, const Point& b) {
    return tie(a.x, a.y) < tie(b.x, b.y);   // ⭐ standard way to compare struct members
}
\`\`\`

Compare x first, then y if tied — writing this with \`if\` gets long. \`tie\` packs them into a tuple and uses pair/tuple's auto-comparison rule from Chapter 1. Slick one-liner.

### 3. State tuples in BFS/DFS contest code

\`\`\`cpp
queue<tuple<int, int, int>> q;   // (x, y, distance)
\`\`\`

For grid traversal, "current position + extra info" gets tossed into a queue as a tuple.

### So when struct vs tuple vs pair?

| Situation | Use |
|---|---|
| 2 values | **pair** |
| **Data you'll work with often**, named fields matter | **struct** (\`.name\` beats \`get<0>\`) |
| Just returning multiple values | **tuple** (especially with structured bindings) |
| Comparing struct members | **tuple + tie** |

> 💡 One line: pair shows up most, struct is best for data you keep handling, and tuple covers quick bundles in between. They overlap a bit, but with practice the right choice becomes second nature.`,
        },
        {
          id: "ch1-tuple-mini",
          type: "practice" as const,
          title: "✋ Quick — student profile in one bundle",
          content: `**Scenario**: A function returns three pieces of student info (name, age, gpa) at once.

Take the given \`tuple<string, int, double>\` and **unpack it with structured bindings, then print on one line**.

> 💡 \`auto [name, age, gpa] = t;\` → declare variables and unpack in one go.`,
          starterCode: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

int main() {
    tuple<string, int, double> student = {"Kim", 15, 3.8};

    // 👇 Unpack with structured bindings and print "Kim 15 3.8"


    return 0;
}`,
          code: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

int main() {
    tuple<string, int, double> student = {"Kim", 15, 3.8};

    auto [name, age, gpa] = student;
    cout << name << " " << age << " " << gpa;

    return 0;
}`,
          hint: "auto [name, age, gpa] = student; on one line, then cout << name << \" \" << age << \" \" << gpa;",
          expectedOutput: `Kim 15 3.8`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Predict the pair & tuple output!",
          code: "#include <iostream>\n#include <string>\n#include <tuple>\nusing namespace std;\nint main() {\n    pair<string, int> p = {\"Hello\", 5};\n    auto t = make_tuple(10, 20, 30);\n    cout << p.first.size() << \" \" << get<2>(t);\n    return 0;\n}",
          options: ["Hello 30", "5 30", "5 20", "Error"],
          answer: 1,
          explanation: "p.first is \"Hello\", and .size() gives the string length: 5. get<2>(t) is the 3rd value in the tuple: 30. So the output is 5 30!"
        },
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔗 pair's real charm — auto-compare, auto-sort",
          content: `If pair were just "a tool to bundle two values," it'd be no big deal. The real charm is this one thing: **pairs can be compared automatically.**

\`\`\`cpp
pair<int,int> a = {1, 5};
pair<int,int> b = {1, 3};

a < b ?    // compiler: "first first. 1 == 1, equal. → check second: 5 > 3"
           // result: a > b
\`\`\`

The rule is dictionary order:
1. Compare **first** first
2. If equal → compare **second**

### So the real win — \`sort\` just works

Sorting student scores:

\`\`\`cpp
vector<pair<int, string>> scores = {
    {88, "Lee"}, {95, "Kim"}, {88, "Park"}, {72, "Choi"}
};

sort(scores.begin(), scores.end());
// → {72, "Choi"}, {88, "Lee"}, {88, "Park"}, {95, "Kim"}
//    Score ascending. Same score → name ascending.
\`\`\`

**One line of \`sort\`. No comparator needed.** This is the decisive difference from "two separate vectors" — there, sorting one vector breaks the pairing with the other.

> 💡 Same way Python tuples behave. \`(score, name)\` tuples in a list, then \`.sort()\` — score first, name as tiebreaker.

### This sets up the next lesson

Next lesson (cpp-23) goes deep on \`sort\`. There you'll learn how to handle "score **descending**, name ascending" and other custom orderings using **lambda**. Today's pair + auto-sort is the launching pad.`
        },
        {
          id: "ch1-question",
          type: "animation" as const,
          title: "🙋 Question: Can't I just use two vectors?",
          component: "pairVsTwoVectors",
          content: "Press the sort button to see the difference between the two approaches!",
        },
        {
          id: "ch1-must-pair",
          type: "practice" as const,
          title: "🎯 When pair is *truly necessary* — sorting a score sheet",
          content: `You just saw it in the simulator — **two separate vectors break when sorted.** Now confirm it in code.

**Problem**: You have 5 students with names and scores. **Sort by score (ascending) and print.**

\`\`\`
Input data:
  Kim    95
  Lee    72
  Park   88
  Choi   60
  Han    81

Expected output (sorted by score):
  Choi 60
  Lee 72
  Han 81
  Park 88
  Kim 95
\`\`\`

> 💡 With two separate vectors (\`names\`, \`scores\`), sorting one breaks the pairing. **\`vector<pair<string, int>>\`** keeps them as one unit, and \`sort\` just works in one line.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> students;
    // (score, name) — putting score in .first so sort orders by score
    students.push_back({95, "Kim"});
    students.push_back({72, "Lee"});
    students.push_back({88, "Park"});
    students.push_back({60, "Choi"});
    students.push_back({81, "Han"});

    // 👇 sort one line (pair's first = score, auto-sorted)


    // 👇 range-for to print as "name score"


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> students;
    students.push_back({95, "Kim"});
    students.push_back({72, "Lee"});
    students.push_back({88, "Park"});
    students.push_back({60, "Choi"});
    students.push_back({81, "Han"});

    sort(students.begin(), students.end());

    for (auto& s : students) {
        cout << s.second << " " << s.first << endl;
    }

    return 0;
}`,
          hint: "pair's first = score, second = name. sort(students.begin(), students.end()) sorts by first (score). Print: for (auto& s : students) cout << s.second << \" \" << s.first;",
          expectedOutput: `Choi 60
Lee 72
Han 81
Park 88
Kim 95`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "Access pair members!",
          content: "Use .first and .second to get values from a pair!",
          code: "pair<string, int> p = {\"Kim\", 95};\ncout << p.___ << \": \" << p.___ << endl;\n// Output: Kim: 95",
          fillBlanks: [
            { id: 0, answer: "first", options: ["first", "second", "name", "0"] },
            { id: 1, answer: "second", options: ["first", "second", "score", "1"] }
          ],
          explanation: "The first value of a pair is accessed with .first, and the second with .second! Using p[0] or p[1] would be an error — pairs use .first/.second, not indexes."
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "Predict the push_back output!",
          code: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<pair<string, int>> v;\n    v.push_back({\"Kim\", 95});\n    v.push_back(make_pair(\"Lee\", 88));\n    cout << v[0].first << \" \" << v[1].second;\n}",
          options: ["Kim 88", "Kim 95", "Lee 88", "95 88"],
          answer: 0,
          explanation: "v[0].first is the first value of the first pair → \"Kim\". v[1].second is the second value of the second pair → 88. Output: Kim 88"
        },
        {
          id: "ch1-vec-iter",
          type: "explain",
          title: "🔄 Iterating over vector<pair>",
          content: `When you have multiple pairs, store them in a **vector<pair>**:

\`\`\`cpp
vector<pair<string, int>> students;
students.push_back({"Kim", 95});
students.push_back({"Lee", 88});
students.push_back({"Park", 92});
\`\`\`

Use range-for with \`auto&\` to loop through them — no need to write out the full type:

\`\`\`cpp
for (auto& s : students) {
    cout << s.first << ": " << s.second << endl;
}
// Kim: 95
// Lee: 88
// Park: 92
\`\`\`

The actual type of \`s\` is \`pair<string, int>\`, so:
- \`s.first\` → string (name)
- \`s.second\` → int (score)

Without \`auto\`, you'd have to write the full type:

\`\`\`cpp
for (pair<string, int>& s : students) {  // verbose!
    cout << s.first << ": " << s.second << endl;
}
\`\`\`

💡 \`auto&\` is much more convenient! The longer the type, the more valuable auto becomes.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Build a Name+Score pair Vector!",
          content: `Store names and scores as pairs in a vector, then print them out!

Use make_pair() or brace initialization to create pairs, and access them with .first and .second.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> students;

    // Add {"Kim", 95}, {"Lee", 88}, make_pair("Park", 92) using push_back

    // Use range-for to print s.first and s.second

    return 0;
}`,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> students;

    students.push_back({"Kim", 95});
    students.push_back({"Lee", 88});
    students.push_back(make_pair("Park", 92));

    for (auto& s : students) {
        cout << s.first << ": " << s.second << endl;
    }

    return 0;
}`,
          hint: "Use students.push_back({\"Kim\", 95}); or make_pair(\"Kim\", 95) to add pairs. To print: for (auto& s : students) { cout << s.first << \": \" << s.second << endl; }",
          expectedOutput: `Kim: 95
Lee: 88
Park: 92`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "pair basics!",
          content: "How do you access the second value in a pair?",
          options: [
            "p[1]",
            "p.second",
            "get<1>(p)",
            "p.two"
          ],
          answer: 1,
          explanation: "Access the second value of a pair with .second! p[1] causes an error, get<1>(p) is the tuple-style way (it works for pair too, but .second is more natural)."
        }
      ]
    },
    // ============================================
    // Chapter 2: Review Quiz
    // (sort is covered in cpp-23!)
    // ============================================
    {
      id: "ch2",
      title: "Review Quiz",
      emoji: "🏆",
      steps: [
        {
          id: "ch2-q1",
          type: "quiz",
          title: "pair declaration!",
          content: `Which of the following is a valid pair declaration?`,
          options: [
            "pair p<int, int> = {1, 2};",
            "pair<int, int> p = {1, 2};",
            "pair(int, int) p = {1, 2};",
            "pair[int, int] p = {1, 2};"
          ],
          answer: 1,
          explanation: "The syntax is pair<Type1, Type2> varName = {val1, val2}; — using angle brackets < >!"
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "pair comparison!",
          content: `What's the output?

\`\`\`cpp
pair<int,int> a = {1, 10};
pair<int,int> b = {1, 5};
if (a > b) cout << "A";
else cout << "B";
\`\`\``,
          options: [
            "A",
            "B",
            "Error",
            "Nothing is printed"
          ],
          answer: 0,
          explanation: "pair comparison checks first values first. Both have first = 1, so it compares second values. 10 > 5, so a > b is true! A is printed."
        },
        {
          id: "ch2-summary",
          type: "explain",
          title: "🎉 Lesson Summary!",
          content: `## 🏆 Lesson 15 Complete! Great work!

### 🔗 pair
- **pair<T1, T2>**: Bundle two values together
- \`pair<string,int> p = {"Kim", 95};\` — declare and initialize
- Access with \`.first\` and \`.second\`
- Supports **automatic comparison**! (first → second)
- **Sorting a vector<pair> automatically sorts by first value!**

### 🔗 tuple
- **tuple<T1, T2, T3>**: Bundle 3 or more values
- \`get<N>(t)\` to access the Nth value
- \`tie(a, b, c) = t;\` to unpack all at once

### 🐍 Key Differences from Python!

| Concept | Python 🐍 | C++ ⚡ |
|---|---|---|
| Bundle 2 values | \`(a, b)\` tuple | \`pair<T1,T2>{a,b}\` |
| Access | \`t[0]\`, \`t[1]\` | \`.first\`, \`.second\` |
| Bundle 3+ values | tuple (any size) | \`tuple<T1,T2,T3>\` |

🚀 **Next lesson (cpp-23)** covers **sort mastery** — custom sorting, lambdas, lower_bound, and more!`
        }
      ]
    }
  ]
}
