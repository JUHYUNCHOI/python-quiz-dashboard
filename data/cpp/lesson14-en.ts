// ============================================
// C++ Lesson 14: Structs (struct)
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson14EnData: LessonData = {
  id: "cpp-14",
  title: "Structs (struct)",
  emoji: "📦",
  description: "Bundle related data into your own custom type!",
  chapters: [
    // ============================================
    // Chapter 1: Struct Basics
    // ============================================
    {
      id: "ch1",
      title: "Struct Basics",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 struct — Bundle Multiple Fields Into One!",
          component: "cppStructBuilder",
          content: `To store 4 students' names, ages, and scores:

\`\`\`cpp
string name1 = "Emma";  int age1 = 17;  double score1 = 95.5;
string name2 = "Jake";    int age2 = 16;  double score2 = 87.0;
string name3 = "Mia";  int age3 = 17;  double score3 = 72.3;
string name4 = "Dave";   int age4 = 16;  double score4 = 91.8;
// 100 students = 300 variables... 😱
\`\`\`

With **struct**, you bundle everything under one name — 100 students = 100 variables 👇`,
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "struct Syntax",
          content: `**Step 1: Define the struct**

\`struct\` keyword → name → \`{\` fields \`};\`

\`\`\`cpp
struct Student {
    string name;
    int age;
    double score;
};  // ← semicolon required!
\`\`\`

> ⚠️ Why the semicolon after \`}\`? A struct definition is a **declaration statement**, just like \`int x;\` ends with \`;\`.

---

**Step 2: Create a variable**

Fill values in the order the fields were declared:

\`\`\`cpp
//               name     age   score
//                ↓         ↓      ↓
Student s1 = {"Emma",    17,   95.5};
Student s2 = {"Jake",      16,   87.0};
\`\`\`

---

**Step 3: Access members — dot (.) operator**

Fields inside a struct are called **members**. Use dot notation to access them:

\`\`\`cpp
cout << s1.name;   // Emma
cout << s1.age;    // 17
s1.score = 100.0;  // you can also modify!
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Modifying a member with dot operator!",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double score;
};

int main() {
    Student s1;
    s1.name = "Emma";
    s1.age = 17;
    s1.age = 20;
    cout << s1.name << " " << s1.age;
    return 0;
}`,
          options: ["Emma 17", "Emma 20", "Error", "Emma 0"],
          answer: 1,
          explanation: "s1.age was set to 17 then overwritten with 20. The last assigned value wins — output is 'Emma 20'."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Dot operator!",
          content: "After `Student s1;`, how do you access the age field of `s1`?",
          options: [
            "s1→age",
            "s1[age]",
            "s1.age",
            "age.s1"
          ],
          answer: 2,
          explanation: "Use the dot operator to access struct members! `s1.age` — variable name first, then member name."
        },
      ],
    },
    // ============================================
    // Chapter 2: Struct in Practice
    // ============================================
    {
      id: "ch2",
      title: "Struct in Practice",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-array-intro",
          type: "explain",
          title: "Structs get even stronger in groups!",
          content: `So far we put **one student's** info in a struct. But in real problems...

| Situation | What you need |
|---|---|
| Manage grades for N students | N Students |
| Process M coordinates | M Points |
| Store K edges | K Edges |

In practice, a **struct array/vector** shows up far more than a single struct variable!

\`\`\`cpp
// This is rare:
Student s;

// This is the norm in USACO/algorithms:
Student students[100];       // fixed size
vector<Student> students(n); // size from input
\`\`\`

Next, let's learn how to put structs into arrays and vectors!`,
        },
        {
          id: "ch2-array-builder",
          type: "interactive",
          title: "🔨 Build a struct array declaration",
          description: "Assemble a Student array step by step.",
          component: "cppStructArrayBuilder",
        },
        {
          id: "ch2-array",
          type: "explain",
          title: "Struct Arrays for Managing Multiple Records",
          component: "cppStructArrayLoop",
          content: `The real power of struct shows with **arrays**!

\`\`\`cpp
struct Student {
    string name;
    int score;
};

Student students[3] = {
    {"Emma", 95},
    {"Jake",   87},
    {"Mia", 72},
};

for (int i = 0; i < 3; i++) {
    cout << students[i].name << ": " << students[i].score << endl;
}
\`\`\`

Output:
\`\`\`
Emma: 95
Jake: 87
Mia: 72
\`\`\`

In USACO, coordinate pairs, edge data, and more are commonly managed as struct arrays!`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Struct array + for loop output!",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };
    for (int i = 0; i < 3; i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          options: ["Emma\nJake\nMia", "95\n87\n72", "Emma 95\nJake 87\nMia 72", "Error"],
          answer: 0,
          explanation: "`students[i].name` accesses the name member of each student. As i goes 0→1→2, Emma, Jake, Mia are printed in order."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Print scores with a for loop!",
          content: "Print every student's score with a for loop.",
          code: `for (int i = 0; i < 3; i++) {
    cout << students[___].score << endl;
}`,
          fillBlanks: [
            { id: 0, answer: "i", options: ["i", "0", "name", "score"] }
          ],
          explanation: "`students[i].score` — use index i to access each student, then dot notation for the score field. As i goes 0, 1, 2, each student's score prints in order."
        },
        {
          id: "ch2-loop-patterns",
          type: "fillblank" as const,
          title: "Pattern 1: Sum",
          content: `Accumulate all scores in the struct array. Add each student's score to \`total\` one by one.`,
          code: `Student students[3] = {
    {"Emma", 95},
    {"Jake",   87},
    {"Mia", 72},
};
int total = 0;
for (int i = 0; i < 3; i++) {
    total ___ students[i].score;
}
cout << "Total: " << total;  // Total: 254`,
          fillBlanks: [
            { id: 0, answer: "+=", options: ["+=", "=", "-=", "=="] }
          ],
          explanation: "`total += students[i].score` adds 95, 87, 72 as i goes 0, 1, 2. 95+87+72=254!"
        },
        {
          id: "ch2-mini-practice1",
          type: "practice" as const,
          title: "✋ Write the sum loop yourself!",
          content: `Use the Student struct array to calculate the total score of Emma(95), Jake(87), Mia(72) with a for loop and print it.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += students[i].score;
    }
    cout << total << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    // Write your code to find and print the total score here

    return 0;
}`,
          hint: "Declare int total = 0, then in a for loop add total += students[i].score for each student",
          expectedOutput: `254`
        },
        {
          id: "ch2-loop-patterns2",
          type: "fillblank" as const,
          title: "Pattern 2: Find minimum",
          content: `Finding a minimum requires 3 decisions (3 blanks!):

① **Initial value** — why can't we start with 0?
② **Comparison direction** — \`<\` or \`>\`?
③ **Update value** — what do we replace minScore with?`,
          code: `int minScore = students[___].score;  // start with first value!
for (int i = 1; i < 3; i++) {
    if (students[i].score ___ minScore)
        minScore = students[___].score;
}
cout << "Min: " << minScore;  // Min: 72`,
          fillBlanks: [
            { id: 0, answer: "0", options: ["0", "1", "2", "-1"] },
            { id: 1, answer: "<", options: ["<", ">", "<=", ">="] },
            { id: 2, answer: "i", options: ["i", "0", "1", "minScore"] }
          ],
          explanation: "① Initialize with `students[0].score` — using 0 would fail since all scores are positive! ② Use `<` to check for smaller value ③ Update with `students[i].score` — the current element!"
        },
        {
          id: "ch2-mini-practice2",
          type: "practice" as const,
          title: "✋ Write the maximum finder yourself!",
          content: `Use the Student struct array to find the highest score among Emma(95), Jake(87), Mia(72) and print it. The initialization trick is the same as finding the minimum!`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    int maxScore = students[0].score;
    for (int i = 1; i < 3; i++) {
        if (students[i].score > maxScore) {
            maxScore = students[i].score;
        }
    }
    cout << maxScore << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    // Write your code to find and print the highest score here

    return 0;
}`,
          hint: "int maxScore = students[0].score as the initial value, then loop from i = 1. If students[i].score > maxScore, replace maxScore",
          expectedOutput: `95`
        },
        {
          id: "ch2-loop-patterns3",
          type: "fillblank" as const,
          title: "Pattern 3: Count matching condition",
          content: `Count how many students scored 90 or above using \`count++\`.`,
          code: `int count = 0;
for (int i = 0; i < 3; i++) {
    if (students[i].score ___ 90) count___;
}
cout << count << " students";  // 1 students`,
          fillBlanks: [
            { id: 0, answer: ">=", options: [">=", ">", "==", "<="] },
            { id: 1, answer: "++", options: ["++", "--", "+=1", "= 1"] }
          ],
          explanation: "① `>= 90` means 90 and above — using `> 90` would mean strictly above 90, giving 0! ② `count++` increments by 1 — `count--` would subtract, which is wrong!"
        },
        {
          id: "ch2-mini-practice3",
          type: "practice" as const,
          title: "✋ Write the counter yourself!",
          content: `Use the Student struct array to count how many of Emma(95), Jake(87), Mia(72) scored 80 or above and print the result.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    int count = 0;
    for (int i = 0; i < 3; i++) {
        if (students[i].score >= 80) count++;
    }
    cout << count << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    // Write your code to count and print students with score >= 80 here

    return 0;
}`,
          hint: "Declare int count = 0, then in a for loop: if students[i].score >= 80, do count++. Note: > 80 means 81+, not 80!",
          expectedOutput: `2`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Find the #1 student!",
          content: `Now find not just the score, but **who** is #1!

**Steps:**
1. Initialize \`maxIdx = 0\` (start with the first student)
2. Loop through the array with for (i = 1 to 2)
3. If \`students[i].score > students[maxIdx].score\`, update \`maxIdx = i\`
4. Print \`students[maxIdx].name\` and \`students[maxIdx].score\``,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    int maxIdx = 0;
    for (int i = 1; i < 3; i++) {
        if (students[i].score > students[maxIdx].score) {
            maxIdx = i;
        }
    }
    cout << students[maxIdx].name << " (" << students[maxIdx].score << ")" << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Emma", 95},
        {"Jake",   87},
        {"Mia", 72},
    };

    // Write your code to find and print the top student's name and score here

    return 0;
}`,
          hint: "Start with int maxIdx = 0, loop from i = 1. If students[i].score > students[maxIdx].score, set maxIdx = i. Then print students[maxIdx].name and students[maxIdx].score",
          expectedOutput: `Emma (95)`
        },
        {
          id: "ch2-vec-explain",
          type: "explain",
          title: "vector<Student> — Manage N entries dynamically!",
          content: `Arrays like \`Student arr[100]\` fix their size **at compile time**.
Whether you have 1 student or 1000, you reserve 100 slots → wasted memory!

But USACO/competitive problems usually give \`N\` as **input**.
"Read N students and process them" → you don't know N upfront, so plain arrays struggle.

## 💡 Solution: vector<Student>

\`\`\`cpp
#include <vector>

int n;
cin >> n;                       // ① read N first
vector<Student> students(n);    // ② create a vector of that size!
\`\`\`

You decide the size **at runtime**. If n is 5, you get 5 slots; if 100000, you get 100000 — exactly what you need, nothing wasted.

## 🔍 Array vs vector

| | \`Student arr[100]\` | \`vector<Student> students(n)\` |
|---|---|---|
| Size decided | When writing code (fixed) | At runtime (dynamic) |
| Memory | Always 100 slots | Only what's needed |
| Access | \`arr[i].name\` | \`students[i].name\` **(same!)** |
| When used | Size known upfront | Size from input (far more common) |

## ✨ Key takeaway

**Access works exactly like an array!** Everything you used with a struct array — \`students[i].name\`, \`students[i].score\`, for-loops — works unchanged. The only thing that differs is **the declaration line**.

\`\`\`cpp
// Works the same whether students is an array or a vector:
for (int i = 0; i < n; i++) {
    cout << students[i].name << " " << students[i].score << endl;
}
\`\`\`

> 💡 **USACO pattern:** N almost always comes from input → **vector<struct>** dominates.
>
> ⚠️ **Watch out:** \`vector<int> students(n)\` has no \`.name\` or \`.score\` — must be **vector<Student>** for member access!`,
        },
        {
          id: "ch2-vec-cin-anim",
          type: "interactive",
          title: "🎬 How cin fills a vector<Student>",
          description: "Review the input format and code, then hit Start to watch cin consume tokens one by one.",
          component: "cinFillVisualizer",
        },
        {
          id: "ch2-vec-cin-fill",
          type: "fillblank" as const,
          title: "Fill vector<Student> with cin",
          content: "Read n students' data with cin and fill the vector.",
          code: `int n;
cin >> n;
vector<___> students(n);
for (int i = 0; i < n; i++) {
    cin >> students[___].name >> students[___].score;
}`,
          fillBlanks: [
            { id: 0, answer: "Student", options: ["Student", "int", "string", "n"] },
            { id: 1, answer: "i", options: ["i", "0", "n", "name"] },
            { id: 2, answer: "i", options: ["i", "0", "n", "score"] },
          ],
          explanation: "`vector<Student> students(n)` creates an n-slot vector. Inside the loop, `students[i].name` and `students[i].score` work exactly like with a plain array!",
        },
        {
          id: "ch2-vec-pred",
          type: "predict" as const,
          title: "Predict the vector<Student> output!",
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {
        {"Alice", 90},
        {"Bob", 80},
    };
    for (auto& s : students) {
        cout << s.name << " " << s.score << "\\n";
    }
    return 0;
}`,
          options: ["Alice 90\nBob 80", "Alice\nBob", "90\n80", "Error"],
          answer: 0,
          explanation: "`auto& s` references each Student in the vector. We print `s.name` and `s.score` for each one!"
        },
        {
          id: "ch2-vec-fill",
          type: "fillblank" as const,
          title: "Fill in the vector<Student> declaration",
          content: `When reading N students, how do you declare the vector?`,
          code: `int n;
cin >> n;
vector<___> students(n);  // n-slot Student vector

for (int i = 0; i < n; i++) {
    cin >> students[i].name >> students[i].score;
}`,
          fillBlanks: [
            { id: 0, answer: "Student", options: ["Student", "int", "string", "n"] }
          ],
          explanation: "`vector<Student>(n)` creates a vector of n Students. Then `students[i].name` / `students[i].score` read each member from cin.",
        },
        {
          id: "ch2-vec-practice",
          type: "practice" as const,
          title: "✋ Sum of N scores",
          content: `Read N students' names and scores, print each student, then the average (integer division) on the last line.

**Sample input**
\`\`\`
3
alice 90
bob 80
carol 70
\`\`\`

**Sample output**
\`\`\`
alice 90
bob 80
carol 70
Average: 80
\`\`\``,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> students[i].name >> students[i].score;
        total += students[i].score;
    }
    for (auto& s : students) {
        cout << s.name << " " << s.score << "\\n";
    }
    cout << "Average: " << total / n << "\\n";
    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    // Write your code here
    return 0;
}`,
          hint: "In a for loop, read students[i].name and students[i].score with cin and add the score to total. For printing, iterate with auto& s.",
          testCases: [
            {
              input: "3\nalice 90\nbob 80\ncarol 70",
              expectedOutput: "alice 90\nbob 80\ncarol 70\nAverage: 80",
            },
          ],
        },
        // ── vector as a field inside a struct ─────────────────────
        {
          id: "ch2-vec-field-explain",
          type: "explain",
          title: "Putting a vector inside a struct",
          content: `So far the struct members were simple types like \`int\` or \`string\`.
In algorithm problems, **a struct with a vector field** is an extremely common pattern.

### Example 1 — Multiple scores per student

\`\`\`cpp
struct Student {
    string name;
    vector<int> scores;  // subject count can vary, no problem!
};

Student s;
s.name = "Alice";
s.scores.push_back(90);  // Korean
s.scores.push_back(85);  // English
s.scores.push_back(92);  // Math
\`\`\`

A fixed array \`int scores[3]\` forces you to change code whenever the subject count changes.
With \`vector<int> scores\`, you can \`push_back\` as many as you want.

---

### Example 2 — Graph adjacency list (USACO core!)

\`\`\`cpp
struct Node {
    int val;
    vector<int> adj;  // indexes of connected neighbors
};

// N nodes
int n;
cin >> n;
vector<Node> graph(n);

// Add an edge
int u, v;
cin >> u >> v;
graph[u].adj.push_back(v);
graph[v].adj.push_back(u);
\`\`\`

This pattern shows up in almost every USACO Bronze graph problem.
Because each node has a different number of neighbors, a vector is the natural fit.`,
        },
        {
          id: "ch2-vec-field-pred",
          type: "predict" as const,
          title: "vector inside a struct — what's the output?",
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    Student s;
    s.name = "Alice";
    s.scores.push_back(90);
    s.scores.push_back(80);
    s.scores.push_back(70);
    int sum = 0;
    for (int sc : s.scores) sum += sc;
    cout << s.name << " " << sum / (int)s.scores.size() << endl;
    return 0;
}`,
          options: ["Alice 80", "Alice 240", "Alice 3", "Error"],
          answer: 0,
          explanation: "`s.scores` holds 90, 80, 70. sum = 240, size = 3, 240/3 = 80. Output: `Alice 80`!",
        },
        {
          id: "ch2-vec-field-practice",
          type: "practice" as const,
          title: "✋ Read a list of scores per student",
          content: `Read N students. Each student has a name, a count K, and K scores.
Print each student's name and average (integer division).

Input format:
\`\`\`
3
Alice 3 90 80 70
Bob 2 100 60
Carol 4 50 60 70 80
\`\`\`
Output:
\`\`\`
Alice 80
Bob 80
Carol 65
\`\`\``,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (int i = 0; i < n; i++) {
        int k;
        cin >> students[i].name >> k;
        students[i].scores.resize(k);
        for (int j = 0; j < k; j++) {
            cin >> students[i].scores[j];
        }
    }
    for (auto& s : students) {
        int sum = 0;
        for (int sc : s.scores) sum += sc;
        cout << s.name << " " << sum / (int)s.scores.size() << "\\n";
    }
    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;  // a vector inside the struct!
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (int i = 0; i < n; i++) {
        int k;
        cin >> students[i].name >> k;
        // Add k scores to scores via push_back
        // Write your code here
    }
    // Print each student's name and average
    // Write your code here
    return 0;
}`,
          hint: "scores is empty, so push_back k times. Average is sum divided by scores.size(). Note: size() is unsigned — cast to (int)!",
          testCases: [
            {
              input: "3\nAlice 3 90 80 70\nBob 2 100 60\nCarol 4 50 60 70 80",
              expectedOutput: "Alice 80\nBob 80\nCarol 65",
            },
          ],
        },
        {
          id: "ch2-ref",
          type: "explain",
          title: "Passing a struct to a function",
          content: `Passing a struct to a function with a **reference (&)** is more efficient!

\`\`\`cpp
// Pass by value — copy, can't change original
void print(Student s) {
    cout << s.name << " " << s.score << endl;
}

// Pass by reference — direct access, can modify
void boost(Student& s) {
    s.score += 10;
}

Student s = {"Emma", 85};
boost(s);
cout << s.score;  // 95 (original changed!)
\`\`\`

Passing a large struct by value copies all its data — expensive. Pass by reference for speed and memory efficiency.`,
        },
        {
          id: "ch2-ref-pred1",
          type: "predict" as const,
          title: "Pass by value — does the original change?",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void add10(Student s) {
    s.score += 10;
}

int main() {
    Student s = {"Emma", 85};
    add10(s);
    cout << s.score;
    return 0;
}`,
          options: ["85", "95", "Error", "0"],
          answer: 0,
          explanation: "Pass by value sends a **copy** — changes inside the function don't affect the original. Output is 85. To modify the original, use `Student& s` (pass by reference)!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Struct array access!",
          content: `What does \`students[1].score\` print?

\`\`\`cpp
struct Student {
    string name;
    int score;
};
Student students[3] = {
    {"A", 90},
    {"B", 80},
    {"C", 70},
};
\`\`\``,
          options: ["90", "80", "70", "Error"],
          answer: 1,
          explanation: "`students[1]` is the second element `{\"B\", 80}`. `students[1].score` is 80!"
        },
        {
          id: "ch2-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Struct Summary!

\`\`\`cpp
struct Name {
    type member1;
    type member2;
};  // semicolon required!

Name var = {val1, val2};  // initialize
var.member                 // access
\`\`\`

| Concept | Example |
|---|---|
| Define | \`struct Student { string name; int score; };\` |
| Create | \`Student s = {"Emma", 95};\` |
| Access | \`s.name\`, \`s.score\` |
| Array | \`Student arr[3] = {...};\` |
| Function | Pass by reference \`Student& s\` for efficiency |

🚀 **Next lesson:** class — member variables & functions, private/public access, constructors, encapsulation (OOP)!`
        }
      ]
    }
  ]
}
