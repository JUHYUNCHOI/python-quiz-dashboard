// ============================================
// C++ Lesson 15: pair & Sorting
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson15EnData: LessonData = {
  id: "cpp-15",
  title: "pair & Sorting",
  emoji: "🔗",
  description: "pair, tuple, and mastering sort!",
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

💡 A pair can hold exactly **2 values**! For 3 or more, you need a tuple.`
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
          type: "explain",
          title: "🙋 Question: Can't I just use two vector<int>s?",
          content: `**"Can't I just use two vector<int>s?"**

You can! But problems arise when sorting: if you sort the scores, the names don't move along with them.

\`\`\`cpp
// What if you store them separately?
vector<string> names = {"Kim", "Lee", "Park"};
vector<int> scores = {78, 95, 88};

sort(scores.begin(), scores.end());
// scores = {78, 88, 95}
// names stays as {"Kim", "Lee", "Park"} 😱
// You can't tell whose score 78 belongs to!
\`\`\`

With pair, they always move together!

\`\`\`cpp
vector<pair<int, string>> students = {
    {78, "Kim"}, {95, "Lee"}, {88, "Park"}
};
sort(students.begin(), students.end());
// {78, "Kim"}, {88, "Park"}, {95, "Lee"} ✅
// Scores and names always stay together!
\`\`\`

💡 Related data should be **bundled together** — it's safer and more convenient!`
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
    // Chapter 2: Mastering sort
    // ============================================
    {
      id: "ch2",
      title: "Mastering sort",
      emoji: "📊",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📊 sort() — The Basics of Sorting!",
          content: `Say you want to sort a list of students by score. If you make \`pair<score, name>\`, sorting happens automatically by score! That's the real power of pair.

C++'s **sort()** function lets you sort data!

\`\`\`cpp
#include <algorithm>  // Header that contains sort()!
#include <vector>

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}  (ascending order)
\`\`\`

**You can sort arrays too:**
\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // Sort arr[0] through arr[4]
// arr = {1, 2, 5, 8, 9}
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
v = [5, 2, 8, 1, 9]
v.sort()             # Modifies in-place (like C++ sort!)
# or
v2 = sorted(v)       # Returns a new list

arr = [5, 2, 8, 1, 9]
arr.sort()           # List method
\`\`\`

| Python 🐍 | C++ sort ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — returns new list | No equivalent in C++ (always in-place) |
| \`arr.sort()\` | \`sort(arr, arr+n)\` |
| Automatically sorts everything | Must **specify the range** yourself |

💡 sort() requires \`#include <algorithm>\`! And you must specify the range with **begin() and end()**.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Sort the vector in order!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort() takes a start and end position! For vectors, use v.begin() and v.end()."
        },
        {
          id: "ch2-reverse",
          type: "explain",
          title: "📊 Reverse Sorting — Descending Order!",
          content: `The default sort() is ascending. To sort in **descending order (largest first)**:

**Method 1: Use greater<>**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}  (descending!)
\`\`\`

**Method 2: Use rbegin(), rend() (reverse iterators)**
\`\`\`cpp
sort(v.rbegin(), v.rend());
// Sorting with reverse iterators gives descending order!
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
v = [5, 2, 8, 1, 9]
v.sort(reverse=True)  # Simply pass reverse=True!
# v = [9, 8, 5, 2, 1]
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sort(reverse=True)\` | \`sort(v.begin(), v.end(), greater<int>())\` |
| Just one parameter! | Pass a comparator as the third argument |

💡 Don't forget both sets of **parentheses ()** in \`greater<int>()\`! \`greater<int>\` is the type, and the trailing \`()\` creates an object from it.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Output after sort!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "After sort(), v = {1, 2, 4, 5, 7}. v[0] is the smallest: 1, v[4] is the largest: 7. So the output is 1 7!"
        },
        {
          id: "ch2-custom",
          type: "explain",
          title: "📊 Custom Comparators — Sort Your Way!",
          content: `You can pass **your own comparison function** as the third argument to sort()!

**Comparator rules:**
- Takes two arguments
- Returns **true** if the first argument should come **before** the second
- Returns **false** otherwise

**Method 1: Regular function**
\`\`\`cpp
bool cmp(int a, int b) {
    return a > b;  // If a > b, put a first → descending!
}

sort(v.begin(), v.end(), cmp);
\`\`\`

**Method 2: Lambda**

Here's a new syntax! \`[](int a, int b) { return a > b; }\` — this is called a **lambda**, an 'anonymous function.' It starts with \`[]\` and is a disposable function you create right on the spot. No need to define a separate function above — super convenient!

\`\`\`cpp
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // Descending
});
\`\`\`

**Real example: Sort by absolute value**
\`\`\`cpp
vector<int> v = {-5, 3, -1, 4, -2};
sort(v.begin(), v.end(), [](int a, int b) {
    return abs(a) < abs(b);  // Smallest absolute value first!
});
// v = {-1, -2, 3, 4, -5}
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
v = [-5, 3, -1, 4, -2]
v.sort(key=lambda x: abs(x))  # Specify criterion with key
# or
v.sort(key=abs)
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`key=func\` — transform value then compare | Comparator **directly compares two values** |
| \`lambda x: abs(x)\` | \`[](int a, int b){ return abs(a)<abs(b); }\` |
| 1 argument (transform function) | 2 arguments (comparison function) |

💡 Python says "sort by this value" (key), while C++ says "which of these two comes first?" (comparator) — that's the key difference!`
        },
        {
          id: "ch2-struct-sort",
          type: "explain",
          title: "📦 Sorting a struct Array!",
          content: `Now that you know lambdas, you can sort struct arrays too! Just compare **member fields** in the lambda.

\`\`\`cpp
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

Student students[3] = {
    {"Kim", 95},
    {"Lee", 87},
    {"Park", 72},
};

// Sort by score ascending
sort(students, students + 3, [](Student a, Student b) {
    return a.score < b.score;
});
// Result: Park(72) → Lee(87) → Kim(95)
\`\`\`

**For descending, just flip the operator to >:**
\`\`\`cpp
sort(students, students + 3, [](Student a, Student b) {
    return a.score > b.score;
});
// Result: Kim(95) → Lee(87) → Park(72)
\`\`\`

**Works the same with vector<Student>:**
\`\`\`cpp
vector<Student> v = { {"Kim", 95}, {"Lee", 87} };
sort(v.begin(), v.end(), [](Student a, Student b) {
    return a.score < b.score;
});
\`\`\`

**pair vs struct — when to use which?**

| | pair | struct |
|---|---|---|
| Auto sort | ✅ No lambda needed | ❌ Lambda required |
| Member names | \`.first\`, \`.second\` (unclear) | \`.score\`, \`.name\` (clear!) |
| Field count | Exactly 2 | As many as you need |
| USACO use | Quick bundling | Complex data |

💡 \`pair<int,string>\`'s \`.first\` tells you nothing. But struct's \`.score\` and \`.name\` make code **much easier to read**!`,
        },
        {
          id: "ch2-struct-pred",
          type: "predict" as const,
          title: "struct sort result!",
          code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student s[3] = {
        {"Kim", 85},
        {"Lee", 92},
        {"Park", 78},
    };
    sort(s, s + 3, [](Student a, Student b) {
        return a.score > b.score;
    });
    cout << s[0].name << " " << s[2].name;
    return 0;
}`,
          options: ["Lee Park", "Kim Park", "Park Lee", "Kim Lee"],
          answer: 0,
          explanation: "Sorting by score descending: Lee(92) → Kim(85) → Park(78). s[0].name is Lee, s[2].name is Park."
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "Custom sort result!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nbool cmp(int a, int b) {\n    return a % 10 < b % 10;\n}\nint main() {\n    vector<int> v = {23, 11, 45, 32};\n    sort(v.begin(), v.end(), cmp);\n    cout << v[0] << \" \" << v[3];\n    return 0;\n}",
          options: ["11 45", "23 32", "11 23", "32 23"],
          answer: 0,
          explanation: "cmp compares by the ones digit (% 10)! 23->3, 11->1, 45->5, 32->2. Sorted by ones digit: 11(1), 32(2), 23(3), 45(5). So v[0]=11, v[3]=45. Output is 11 45!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Sort Scores in Descending Order!",
          content: `Store scores and names in a vector<pair<int,string>>, then sort by score in descending order!

If you put the score in pair's first, it automatically sorts by score. Use greater<> to make it descending!`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> scores = {
        {85, "Kim"},
        {92, "Lee"},
        {78, "Park"},
        {95, "Choi"}
    };

    sort(scores.begin(), scores.end(), greater<pair<int,string>>());

    for (auto& s : scores) {
        cout << s.second << ": " << s.first << endl;
    }

    return 0;
}`,
          expectedOutput: `Choi: 95
Lee: 92
Kim: 85
Park: 78`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "sort basics!",
          content: "Which header must you include to use sort()?",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "sort() is in the <algorithm> header! <vector> is for vector, and <utility> is for pair."
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
          id: "ch3-q2",
          type: "quiz",
          title: "sort basics!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {3, 1, 4};
sort(v.begin(), v.end());
cout << v[0] << v[1] << v[2];
\`\`\``,
          options: [
            "314",
            "134",
            "431",
            "143"
          ],
          answer: 1,
          explanation: "After sort(), v is sorted in ascending order: {1, 3, 4}. v[0]=1, v[1]=3, v[2]=4, so the output is 134!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Custom sorting!",
          content: `Which statement about sort's comparator function is correct?`,
          options: [
            "Returning true puts the second argument first",
            "Returning true puts the first argument first",
            "It must always return an int",
            "It takes only 1 argument"
          ],
          answer: 1,
          explanation: "When the comparator returns true, the first argument goes before the second! In bool cmp(a, b), returning true means a comes before b."
        },
        {
          id: "ch3-q4",
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
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Lesson Summary!",
          content: `## 🏆 Lesson 15 Complete! Great work!

### 🔗 pair & tuple
- **pair<T1, T2>**: Bundle two values together
- Access with \`.first\` and \`.second\`
- **tuple**: Bundle 3 or more values, access with \`get<N>(t)\`
- pair supports **automatic comparison**! (first first, then second)

### 📊 Mastering sort
- \`sort(v.begin(), v.end())\` — ascending order
- \`sort(v.begin(), v.end(), greater<int>())\` — descending
- Custom comparator functions or **lambdas** for any sorting criteria
- Sorting vector<pair> automatically sorts by first!

### 🐍 Key Differences from Python!

| Concept | Python 🐍 | C++ ⚡ |
|---|---|---|
| Bundle 2 values | \`(a, b)\` tuple | \`pair<T1,T2>{a,b}\` |
| Access | \`t[0]\`, \`t[1]\` | \`.first\`, \`.second\` |
| Sort | \`list.sort()\` | \`sort(begin, end)\` |
| Descending | \`reverse=True\` | \`greater<T>()\` |
| Custom sort | \`key=func\` | Comparator (2 args) |

🚀 **Next lesson** covers **map & set** — key-value stores and duplicate-free collections! Exciting stuff ahead!`
        }
      ]
    }
  ]
}
