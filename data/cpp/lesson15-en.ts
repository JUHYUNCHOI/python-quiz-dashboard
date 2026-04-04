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
          title: "🔗 pair — Bundle Two Values Together!",
          content: `Imagine you're announcing test results. 'Alice 95, Bob 87, Carol 92...' You need to keep names and scores **together** at all times. If you use separate variables, the names and scores get mixed up when you sort!

If you use separate variables? \`string name1; int score1; string name2; int score2;\` 😰 Too messy!

**pair is a simple tool that bundles two values together.**

When you have **two values** that always go together — like a name and score, or x and y coordinates:

\`\`\`cpp
#include <utility>  // Header that contains pair
// Or just include <algorithm> or <vector> — pair comes along automatically!

pair<string, int> p;     // A pair bundling string and int
p.first = "Kim";         // First value
p.second = 95;           // Second value
\`\`\`

**There are several ways to create a pair:**

\`\`\`cpp
// Method 1: Brace initialization
pair<string, int> p1 = {"Kim", 95};

// Method 2: make_pair()
pair<string, int> p2 = make_pair("Lee", 88);

// Method 3: Use auto (type deduction!)
auto p3 = make_pair("Park", 77);
\`\`\`

**Access values with .first and .second:**
\`\`\`cpp
cout << p1.first << endl;   // Kim
cout << p1.second << endl;  // 95
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
p = ("Kim", 95)     # Bundle two values with a tuple
print(p[0])          # Kim (access by index)
print(p[1])          # 95
\`\`\`

| Python 🐍 | C++ pair ⚡ |
|---|---|
| \`p = ("Kim", 95)\` | \`pair<string,int> p = {"Kim", 95};\` |
| \`p[0]\`, \`p[1]\` | \`p.first\`, \`p.second\` |
| No types needed | Types required (or use auto) |
| Any number of items | **Exactly 2 only!** |

💡 A pair can hold exactly **2 values**! For 3 or more, you could use tuple — but **in practice, struct is used far more often.** tuple's syntax is tricky. pair shines when you need to bundle two values together for sorting!`
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
          title: "🔗 tuple — Bundle 3 or More!",
          content: `A pair can only hold 2 values. For **3 or more**, use a **tuple**!

\`\`\`cpp
#include <tuple>  // tuple header

// Create a tuple
tuple<string, int, double> t = {"Kim", 15, 3.8};

// Access values: get<index>(tuple)
cout << get<0>(t) << endl;  // Kim
cout << get<1>(t) << endl;  // 15
cout << get<2>(t) << endl;  // 3.8
\`\`\`

**You can also use make_tuple():**
\`\`\`cpp
auto t2 = make_tuple("Lee", 16, 4.0);
\`\`\`

**Use tie() to unpack all at once:**
\`\`\`cpp
string name;
int age;
double gpa;
tie(name, age, gpa) = t;  // Assign to 3 variables at once!
cout << name << " " << age << " " << gpa << endl;
// Kim 15 3.8
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
t = ("Kim", 15, 3.8)
print(t[0], t[1], t[2])

# Unpacking
name, age, gpa = t
\`\`\`

| Python 🐍 | C++ tuple ⚡ |
|---|---|
| \`t = ("Kim", 15, 3.8)\` | \`tuple<string,int,double> t = {...};\` |
| \`t[0]\` | \`get<0>(t)\` |
| \`name, age, gpa = t\` | \`tie(name, age, gpa) = t;\` |
| Index can be a variable | Index must be a **compile-time constant**! |

💡 In practice, pair is used much more often! tuple is occasionally used for 3+ values, but most people prefer struct for that.`
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
          title: "🔗 pair Comparison — Auto-Sortable!",
          content: `Here's an amazing feature of pair — **comparison operators** (<, >, ==) work automatically!

**Comparison rules:**
1. **Compare first values first**
2. If first values are equal, **compare second values**

\`\`\`cpp
pair<int,int> a = {1, 5};
pair<int,int> b = {1, 3};
pair<int,int> c = {2, 1};

// a vs b: first is same (1==1), compare second → 5 > 3 → a > b
// a vs c: compare first → 1 < 2 → a < c
\`\`\`

Thanks to this, **sorting a vector<pair> automatically sorts by first**!

\`\`\`cpp
vector<pair<int,string>> v = {
    {3, "C"}, {1, "A"}, {2, "B"}, {1, "D"}
};
sort(v.begin(), v.end());
// Result: {1,"A"}, {1,"D"}, {2,"B"}, {3,"C"}
// Sorted by first; if first is equal, sorted by second!
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
v = [(3,"C"), (1,"A"), (2,"B"), (1,"D")]
v.sort()  # Python tuples also sort by first element!
# [(1,'A'), (1,'D'), (2,'B'), (3,'C')]
\`\`\`

Why pair's auto-comparison is useful: when you sort a \`vector<pair<int,string>>\`, it automatically sorts by the first value (score)!

💡 It works the same way as Python tuples! First value first, then second value as tiebreaker.`
        },
        {
          id: "ch1-question",
          type: "animation" as const,
          title: "🙋 Question: Can't I just use two vectors?",
          component: "pairVsTwoVectors",
          content: "Press the sort button to see the difference between the two approaches!",
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
