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
string name1 = "Alice";  int age1 = 17;  double score1 = 95.5;
string name2 = "Bob";    int age2 = 16;  double score2 = 87.0;
string name3 = "Carol";  int age3 = 17;  double score3 = 72.3;
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
Student s1 = {"Alice",    17,   95.5};
Student s2 = {"Bob",      16,   87.0};
\`\`\`

---

**Step 3: Access members — dot (.) operator**

Fields inside a struct are called **members**. Use dot notation to access them:

\`\`\`cpp
cout << s1.name;   // Alice
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
    s1.name = "Alice";
    s1.age = 17;
    s1.age = 20;
    cout << s1.name << " " << s1.age;
    return 0;
}`,
          options: ["Alice 17", "Alice 20", "Error", "Alice 0"],
          answer: 1,
          explanation: "s1.age was set to 17 then overwritten with 20. The last assigned value wins — output is 'Alice 20'."
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
    {"Alice", 95},
    {"Bob",   87},
    {"Carol", 72},
};

for (int i = 0; i < 3; i++) {
    cout << students[i].name << ": " << students[i].score << endl;
}
\`\`\`

Output:
\`\`\`
Alice: 95
Bob: 87
Carol: 72
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
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 72},
    };
    for (int i = 0; i < 3; i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          options: ["Alice\nBob\nCarol", "95\n87\n72", "Alice 95\nBob 87\nCarol 72", "Error"],
          answer: 0,
          explanation: "`students[i].name` accesses the name member of each student. As i goes 0→1→2, Alice, Bob, Carol are printed in order."
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
    {"Alice", 95},
    {"Bob",   87},
    {"Carol", 72},
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
          content: `Use the Student struct array to calculate the total score of Alice(95), Bob(87), Carol(72) with a for loop and print it.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 72},
    };

    // Write your code to find and print the total score here

    return 0;
}`,
          expectedOutput: `Total: 254`
        },
        {
          id: "ch2-loop-patterns2",
          type: "fillblank" as const,
          title: "Pattern 2: Find minimum",
          content: `The key to finding a minimum: **initialize with the first element**, not 0!`,
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
          content: `Use the Student struct array to find the highest score among Alice(95), Bob(87), Carol(72) and print it. The initialization trick is the same as finding the minimum!`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 72},
    };

    // Write your code to find and print the highest score here

    return 0;
}`,
          expectedOutput: `Top: 95`
        },
        {
          id: "ch2-loop-patterns3",
          type: "fillblank" as const,
          title: "Pattern 3: Count matching condition",
          content: `Count how many students scored 90 or above using \`count++\`.`,
          code: `int count = 0;
for (int i = 0; i < 3; i++) {
    if (students[i].score ___ 90) count++;
}
cout << count << " students";  // 1 students`,
          fillBlanks: [
            { id: 0, answer: ">=", options: [">=", ">", "==", "<="] }
          ],
          explanation: "`>= 90` counts scores of 90 and above — only Alice (95) qualifies, so the answer is 1. Using `> 90` would mean strictly above 90, giving 0!"
        },
        {
          id: "ch2-mini-practice3",
          type: "practice" as const,
          title: "✋ Write the counter yourself!",
          content: `Use the Student struct array to count how many of Alice(95), Bob(87), Carol(72) scored 80 or above and print the result.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 72},
    };

    // Write your code to count and print students with score >= 80 here

    return 0;
}`,
          expectedOutput: `80+: 2 students`
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
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 72},
    };

    // Write your code to find and print the top student's name and score here

    return 0;
}`,
          expectedOutput: `#1: Alice (95)`
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

Student s = {"Alice", 85};
boost(s);
cout << s.score;  // 95 (original changed!)
\`\`\`

Passing a large struct by value copies all its data — expensive. Pass by reference for speed and memory efficiency.`,
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
| Create | \`Student s = {"Alice", 95};\` |
| Access | \`s.name\`, \`s.score\` |
| Array | \`Student arr[3] = {...};\` |
| Function | Pass by reference \`Student& s\` for efficiency |

🚀 **Next lesson:** class — add access control and constructors to struct!`
        }
      ]
    }
  ]
}
