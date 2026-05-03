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
          id: "ch1-pair-unpack",
          type: "explain",
          title: "🎁 Reading the two values — \`.first/.second\`",
          content: `Pull a pair's two values out with **\`.first\`** and **\`.second\`**. That's the basic form, and what we'll use throughout this lesson.

\`\`\`cpp
pair<string, int> p = {"Kim", 95};
cout << p.first;    // "Kim"
cout << p.second;   // 95
\`\`\`

> 📌 **Side note — modern C++ (C++17) one-liner**
>
> If you want even cleaner code, \`auto [name, score] = p;\` declares both variables in one line. This is called *structured bindings*. You don't need it now — \`.first/.second\` is enough. We'll naturally meet this syntax again later, no need to memorize it today.`
        },
        {
          id: "ch1-pair-mini",
          type: "practice" as const,
          title: "✋ Quick — find the most expensive cafe drink",
          content: `**Scenario**: A cafe menu has 5 drinks stored as \`(name, price)\` pairs.

\`\`\`
Latte 5500 / Americano 4500 / Cappuccino 6000 / Espresso 4000 / Mocha 6500
\`\`\`

Print **the name and price of the most expensive drink** in \`Mocha: 6500\` format.

> 💡 Pattern: take the first drink as the current best, range-for through the rest, update best whenever \`.second\` is larger. Print at the end.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> menu = {
        {"Latte", 5500},
        {"Americano", 4500},
        {"Cappuccino", 6000},
        {"Espresso", 4000},
        {"Mocha", 6500}
    };

    // 👇 Find the most expensive drink — print as "Name: Price"


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> menu = {
        {"Latte", 5500},
        {"Americano", 4500},
        {"Cappuccino", 6000},
        {"Espresso", 4000},
        {"Mocha", 6500}
    };

    pair<string, int> best = menu[0];
    for (auto& d : menu) {
        if (d.second > best.second) best = d;
    }
    cout << best.first << ": " << best.second;

    return 0;
}`,
          hint: "pair<string, int> best = menu[0]; to seed. for (auto& d : menu) loop, if (d.second > best.second) best = d; to update. Then cout << best.first << \": \" << best.second;",
          expectedOutput: `Mocha: 6500`
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

### Reading values out — \`get<index>(t)\`

With 3+ values, \`.first/.second\` no longer works. Use **\`get<N>(t)\`**:

\`\`\`cpp
cout << get<0>(t);   // "Kim"
cout << get<1>(t);   // 15
cout << get<2>(t);   // 3.8
\`\`\`

The **index goes inside \`<>\`**, the **tuple inside \`()\`**. Looks weird at first, but it just means \`t[0]\`, \`t[1]\`, etc.

> ⚠️ The number inside \`<>\` must be a **compile-time constant**. You can't write \`get<i>(t)\` with a variable \`i\`.

> 📌 **Side note — one-liner unpack (C++17)**
>
> Modern C++ also supports \`auto [name, age, gpa] = t;\` to declare all three variables in one line — same idea as Python's \`name, age, gpa = t\`. This is called *structured bindings*. You don't need it now — \`get<N>(t)\` is enough. We'll meet it naturally later.

Next page — where tuple actually shows up, and how to choose between struct/pair/tuple 👇`,
        },
        {
          id: "ch1-tuple-usage",
          type: "explain",
          title: "🤔 How often is tuple used in practice?",
          content: `Less often than pair. But **not negligibly.** Three patterns you'll see:

### 1. Returning multiple values from a function (common)

\`\`\`cpp
tuple<int, int, string> getStudent() { ... }

auto t = getStudent();
int age   = get<0>(t);
int score = get<1>(t);
string name = get<2>(t);
\`\`\`

When a function needs to return several values and you don't want to define a whole struct, tuple is the quick path. Use \`get<N>\` to read each one out.

> 📌 Modern C++ also lets you write \`auto [a, b, c] = getStudent();\` in one line — *structured bindings*. Don't worry about it now.

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
| Just returning multiple values | **tuple** |
| Comparing struct members | **tuple + tie** |

> 💡 One line: pair shows up most, struct is best for data you keep handling, and tuple covers quick bundles in between. They overlap a bit, but with practice the right choice becomes second nature.`,
        },
        {
          id: "ch1-tuple-mini",
          type: "practice" as const,
          title: "✋ Quick — scholarship eligibility check",
          content: `**Scenario**: \`getStudent()\` returns **(name, age, gpa)** in one go.

Eligibility = **age ≥ 16 AND gpa ≥ 3.5**.

If eligible, print \`Kim: eligible\`. Otherwise \`Kim: not eligible\`.

\`\`\`
getStudent() → ("Kim", 15, 3.8)   →  Kim: not eligible (age too low)
\`\`\`

> 💡 Receive with \`auto t = getStudent();\`, then read each value with \`get<0>(t)\`, \`get<1>(t)\`, \`get<2>(t)\` and check the condition.`,
          starterCode: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

tuple<string, int, double> getStudent() {
    return {"Kim", 15, 3.8};
}

int main() {
    // 👇 auto t = getStudent(); then pull out values with get<0>/get<1>/get<2>
    //    If age >= 16 && gpa >= 3.5 → "name: eligible", else "name: not eligible"


    return 0;
}`,
          code: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

tuple<string, int, double> getStudent() {
    return {"Kim", 15, 3.8};
}

int main() {
    auto t = getStudent();
    string name = get<0>(t);
    int age = get<1>(t);
    double gpa = get<2>(t);
    if (age >= 16 && gpa >= 3.5) cout << name << ": eligible";
    else cout << name << ": not eligible";

    return 0;
}`,
          hint: "auto t = getStudent(); then string name = get<0>(t); int age = get<1>(t); double gpa = get<2>(t); — then if/else.",
          expectedOutput: `Kim: not eligible`
        },
        {
          id: "ch1-tuple-mini2",
          type: "practice" as const,
          title: "✋ Quick — pick the student with the higher GPA",
          content: `Two students' (name, gpa) are bundled as tuples. Print **the name of the student with the higher GPA**.

\`\`\`cpp
tuple<string, double> a = {"Kim", 3.8};
tuple<string, double> b = {"Lee", 3.5};
\`\`\`

> 💡 \`get<0>(a)\` = name, \`get<1>(a)\` = gpa. Compare and print the right name.`,
          starterCode: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

int main() {
    tuple<string, double> a = {"Kim", 3.8};
    tuple<string, double> b = {"Lee", 3.5};

    // 👇 Print the name (get<0>) of whichever has the higher gpa (get<1>)


    return 0;
}`,
          code: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

int main() {
    tuple<string, double> a = {"Kim", 3.8};
    tuple<string, double> b = {"Lee", 3.5};

    if (get<1>(a) > get<1>(b)) cout << get<0>(a);
    else cout << get<0>(b);

    return 0;
}`,
          hint: "if (get<1>(a) > get<1>(b)) cout << get<0>(a); else cout << get<0>(b);",
          expectedOutput: `Kim`
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

The next lesson (*Sort & Binary Search*) goes deep on \`sort\`. There you'll learn how to handle "score **descending**, name ascending" and other custom orderings using **lambda**. Today's pair + auto-sort is the launching pad.`
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
          title: "🎯 When pair is **truly necessary** — sorting a score sheet",
          content: `You just saw it in the simulator — **two separate vectors break when sorted.** Now confirm it in code.

**Problem**: You have 5 students with names and scores. **Sort by score (ascending) and print as** \`Name Score\` **lines.**

Input: Kim 95 / Lee 72 / Park 88 / Choi 60 / Han 81

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
          content: "**If the score is 90 or higher, print \"Pass\"**. Which member of the pair holds the score?",
          code: "pair<string, int> p = {\"Kim\", 95};\nif (p.___ >= 90) {\n    cout << \"Pass\";\n}",
          fillBlanks: [
            { id: 0, answer: "second", options: ["first", "second", "score", "1"] }
          ],
          explanation: "The second value (score) is accessed with .second. p[1] or p.score would be errors. The first is .first, the second is .second — pair doesn't give meaningful names to its two values."
        },
        {
          id: "ch1-pair-filter",
          type: "practice" as const,
          title: "✋ Real practice — print only students scoring 80+",
          content: `**Scenario**: 5 students with \`(name, score)\` pairs. Print **only those scoring 80 or above**, one per line, as \`Name Score\`.

Input: Kim 72 / Lee 88 / Park 55 / Choi 95 / Han 81

> 💡 Pattern: range-for through students, check \`s.second >= 80\`, print \`s.first << " " << s.second\` if it passes. This is the **filter** pattern — fundamental data-handling skill.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 72},
        {"Lee", 88},
        {"Park", 55},
        {"Choi", 95},
        {"Han", 81}
    };

    // 👇 Print only students with score >= 80, one "Name Score" per line


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 72},
        {"Lee", 88},
        {"Park", 55},
        {"Choi", 95},
        {"Han", 81}
    };

    for (auto& s : students) {
        if (s.second >= 80) {
            cout << s.first << " " << s.second << endl;
        }
    }

    return 0;
}`,
          hint: "for (auto& s : students) { if (s.second >= 80) cout << s.first << \" \" << s.second << endl; } — range-for + condition + print on match.",
          expectedOutput: `Lee 88
Choi 95
Han 81`
        },
        {
          id: "ch1-pair-count",
          type: "practice" as const,
          title: "✋ Real practice — average score",
          content: `**Scenario**: Same 5 students with \`(name, score)\` pairs. Print the **average score**. (Integer division is fine.)

Input: Kim 72 / Lee 88 / Park 55 / Choi 95 / Han 81

> 💡 Pattern: keep a running total, range-for to accumulate \`s.second\`, then divide by the student count. **Accumulate / sum pattern** — second fundamental skill.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 72},
        {"Lee", 88},
        {"Park", 55},
        {"Choi", 95},
        {"Han", 81}
    };

    // 👇 Print the average (sum / count)


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 72},
        {"Lee", 88},
        {"Park", 55},
        {"Choi", 95},
        {"Han", 81}
    };

    int total = 0;
    for (auto& s : students) total += s.second;
    cout << total / (int)students.size();

    return 0;
}`,
          hint: "int total = 0; for (auto& s : students) total += s.second; — accumulate. Then cout << total / (int)students.size(); — divide by count.",
          expectedOutput: `78`
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

> 💡 Use whatever style feels best — brace \`{a, b}\` or \`make_pair\`, \`.first/.second\` or \`auto [name, score]\`. They all work.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> students;

    // 👇 push_back (Kim, 95), (Lee, 88), (Park, 92)

    // 👇 range-for to print one "name: score" per line

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
    students.push_back({"Park", 92});

    for (auto& [name, score] : students) {
        cout << name << ": " << score << endl;
    }

    return 0;
}`,
          hint: "Add: students.push_back({\"Kim\", 95}); — brace init handles all three. Print: for (auto& [name, score] : students) cout << name << \": \" << score << endl; — structured bindings reads cleaner.",
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
    // (sort is covered in the next lesson)
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
          id: "ch2-cheatsheet",
          type: "explain",
          title: "📋 pair / tuple commands at a glance",
          content: `Keep this open while solving problems.

### 🧰 Most-used pair / tuple commands

| Command | What it does |
|---|---|
| \`p.first\` / \`p.second\` | Two values of pair |
| \`get<0>(t)\`, \`get<1>(t)\` | i-th value of tuple |
| \`auto [a, b] = p;\` | Structured binding (C++17) |
| \`auto& [a, b] = p;\` | Bind by reference — mutable |
| \`p1 < p2\` | Lexicographic compare (first then second) |
| \`tie(a, b) = p;\` | Unpack tuple (C++11) |
| \`make_pair(a, b)\` | Build pair (type inference) |

### 📦 Declaration

\`\`\`cpp
pair<int, string> p = {1, "Alice"};
pair<int, int> coord(3, 5);
tuple<int, string, double> t = {1, "Bob", 95.5};
auto p = make_pair(1, "Alice");
\`\`\`

### 🔁 Iterating vector<pair>

\`\`\`cpp
vector<pair<int, string>> people;
for (auto& [age, name] : people) {
    cout << name << " is " << age << "\\n";
}
\`\`\`

> 💡 pair sorts by first then second automatically — handy with \`sort()\`.

---

> 📌 **Full STL cheatsheet (downloadable as PDF):**
> 👉 [**Open \`/reference/cpp-stl#pair\`**](/reference/cpp-stl#pair)`
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

🚀 **Next lesson (*Sort & Binary Search*)** covers **sort in depth** — custom sorting, lambdas, lower_bound, and more!`
        }
      ]
    }
  ]
}
