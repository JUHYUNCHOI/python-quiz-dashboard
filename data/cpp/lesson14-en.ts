// ============================================
// C++ Lesson 14: Structs & Classes
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson14EnData: LessonData = {
  id: "cpp-14",
  title: "Structs & Classes",
  emoji: "🏗️",
  description: "Create your own types with struct and class!",
  chapters: [
    // ============================================
    // Chapter 1: struct
    // ============================================
    {
      id: "ch1",
      title: "Structs",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 struct — Group Variables Together!",
          content: `What if you want to store a student's name, age, and grade? Making individual variables is messy:

\`\`\`cpp
string name1 = "Kim";
int age1 = 15;
double gpa1 = 3.8;
// What if there are 100 students...? 😱
\`\`\`

With **struct**, you can bundle multiple variables into **one custom type**!

\`\`\`cpp
struct Student {
    string name;
    int age;
    double gpa;
};  // ← Don't forget the semicolon!

Student s;
s.name = "Kim";
s.age = 15;
s.gpa = 3.8;
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
class Student:
    def __init__(self):
        self.name = ""
        self.age = 0
        self.gpa = 0.0

s = Student()
s.name = "Kim"
s.age = 15
\`\`\`

| Python 🐍 | C++ struct ⚡ |
|---|---|
| \`class Student:\` | \`struct Student { };\` |
| \`self.name\` | \`s.name\` |
| Initialize in \`__init__\` | Access with \`.\` after declaration |
| No semicolon | **Semicolon after closing brace!** |

💡 You MUST put a **semicolon (;)** after the struct definition! Forgetting it causes an error.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Define a Point with x and y!",
          code: "___  Point {\n    double x;\n    double y;\n};",
          fillBlanks: [
            { id: 0, answer: "struct", options: ["struct", "class", "type", "object"] }
          ],
          explanation: "The struct keyword declares a struct! It follows the pattern struct Point { ... };"
        },
        {
          id: "ch1-init",
          type: "explain",
          title: "📋 How to Initialize a struct!",
          content: `There are several ways to initialize a struct!

**Method 1: Assign one by one**
\`\`\`cpp
Student s;
s.name = "Kim";
s.age = 15;
s.gpa = 3.8;
\`\`\`

**Method 2: Brace Initialization**
\`\`\`cpp
Student s = {"Kim", 15, 3.8};
\`\`\`

Order matters! Values must match the order they're declared in the struct.

**Accessing members: the dot (.) operator**
\`\`\`cpp
cout << s.name << endl;   // Kim
cout << s.age << endl;    // 15
cout << s.gpa << endl;    // 3.8
\`\`\`

**You can even put functions inside a struct!**
\`\`\`cpp
struct Student {
    string name;
    int age;
    double gpa;

    void print() {
        cout << name << " (" << age << ") GPA: " << gpa << endl;
    }
};

Student s = {"Kim", 15, 3.8};
s.print();  // Kim (15) GPA: 3.8
\`\`\`

Just like Python methods, you can add functions inside a C++ struct! But you don't need \`self\`.

💡 Use brace initialization for simplicity, or assign one by one when you want clarity!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Using a struct!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nstruct Point {\n    double x;\n    double y;\n};\nint main() {\n    Point p = {3.0, 4.0};\n    cout << p.x + p.y;\n    return 0;\n}",
          options: ["3.0", "4.0", "7", "Error"],
          answer: 2,
          explanation: "p.x is 3.0 and p.y is 4.0. So 3.0 + 4.0 = 7 is printed! Use the dot (.) operator to access members."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Create a Student struct!",
          content: `Create a Student struct, store name/age/score, and print them out!

Define the struct, initialize it with brace initialization, and access the members to print.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double score;
};

int main() {
    Student s = {"Kim", 15, 95.5};

    cout << "Name: " << s.name << endl;
    cout << "Age: " << s.age << endl;
    cout << "Score: " << s.score << endl;

    return 0;
}`,
          expectedOutput: `Name: Kim
Age: 15
Score: 95.5`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "struct basics!",
          content: "What's the most commonly forgotten part of a C++ struct definition that causes errors?",
          options: [
            "The struct keyword",
            "The curly braces {}",
            "The semicolon ; after the closing brace",
            "The member variable names"
          ],
          answer: 2,
          explanation: "You must put a semicolon (;) at the end of a struct definition! struct Student { ... }; Forgetting it causes a compile error."
        }
      ]
    },
    // ============================================
    // Chapter 2: Intro to Classes
    // ============================================
    {
      id: "ch2",
      title: "Intro to Classes",
      emoji: "🎓",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎓 class = struct + Access Control!",
          content: `A **class** is basically a struct with **access control (public/private)** added!

Key difference:
- **struct**: Members are **public** by default (anyone can access)
- **class**: Members are **private** by default (no outside access)

\`\`\`cpp
class Rectangle {
private:          // Cannot access from outside!
    double width, height;

public:           // Can access from outside!
    void setSize(double w, double h) {
        width = w;
        height = h;
    }
    double area() {
        return width * height;
    }
};
\`\`\`

\`\`\`cpp
Rectangle r;
// r.width = 5;      // ❌ Error! private — can't access
r.setSize(5, 3);     // ✅ public function — OK!
cout << r.area();     // ✅ 15
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
class Rectangle:
    def __init__(self):
        self._width = 0   # _ is just a convention, not enforced
        self._height = 0

    def set_size(self, w, h):
        self._width = w
        self._height = h
\`\`\`

| Python 🐍 | C++ class ⚡ |
|---|---|
| \`_var\` is convention-only private | \`private:\` truly blocks access! |
| Everything is accessible | private is truly inaccessible |
| \`self\` required | No \`self\` needed |

💡 Hiding data with private and exposing it through public functions is called **encapsulation**!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Hide the radius inside the class!",
          code: "class Circle {\n___:\n    double radius;\npublic:\n    double area() {\n        return 3.14 * radius * radius;\n    }\n};",
          fillBlanks: [
            { id: 0, answer: "private", options: ["private", "public", "protected", "static"] }
          ],
          explanation: "Declaring radius as private means it can't be accessed directly from outside! Only public functions can interact with it — that's encapsulation."
        },
        {
          id: "ch2-constructor",
          type: "explain",
          title: "🎓 Constructors!",
          content: `A **constructor** is a special function that's **automatically called** when an object is created!

Rules:
- Has the **same name** as the class
- Has **no return type** (not even void!)
- Called automatically when an object is created

\`\`\`cpp
class Dog {
public:
    string name;
    int age;

    Dog(string n, int a) {  // Constructor!
        name = n;
        age = a;
    }
};

Dog d("Buddy", 3);  // Constructor called automatically!
cout << d.name;      // Buddy
cout << d.age;       // 3
\`\`\`

Compare with Python's \`__init__\`:

**Python 🐍:**
\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

d = Dog("Buddy", 3)
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`__init__(self, ...)\` | \`ClassName(...)\` |
| self required | No self needed |
| \`Dog("Buddy", 3)\` | \`Dog d("Buddy", 3);\` |

💡 Constructors let you set values right when you create an object! They serve the same role as Python's \`__init__\`.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Constructor in action!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nclass Cat {\npublic:\n    string name;\n    int lives;\n    Cat(string n, int l) {\n        name = n;\n        lives = l;\n    }\n};\nint main() {\n    Cat c(\"Nabi\", 9);\n    cout << c.name << \" \" << c.lives;\n    return 0;\n}",
          options: ["Error", "Nabi 9", "Nabi 0", " 9"],
          answer: 1,
          explanation: "The constructor is called with Cat c(\"Nabi\", 9). name becomes \"Nabi\" and lives becomes 9. So the output is Nabi 9."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Build a Rectangle class!",
          content: `Build a Rectangle class!

- The constructor takes width and height
- area() returns the area, perimeter() returns the perimeter

Practice using constructors and methods in a class!`,
          code: `#include <iostream>
using namespace std;

class Rectangle {
private:
    double width, height;

public:
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }

    double area() {
        return width * height;
    }

    double perimeter() {
        return 2 * (width + height);
    }
};

int main() {
    Rectangle r(5.0, 3.0);
    cout << "Area: " << r.area() << endl;
    cout << "Perimeter: " << r.perimeter() << endl;

    return 0;
}`,
          expectedOutput: `Area: 15
Perimeter: 16`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "struct vs class!",
          content: "What is the **biggest difference** between `struct` and `class` in C++?",
          options: [
            "struct can't have functions",
            "class can't have variables",
            "struct defaults to public, class defaults to private",
            "struct is slower than class"
          ],
          answer: 2,
          explanation: "struct members are public by default, while class members are private by default! Other than that, they're almost identical. Both can have functions and variables."
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
          title: "struct syntax!",
          content: `What's the output?

\`\`\`cpp
struct Vec2 {
    int x, y;
};
int main() {
    Vec2 v = {10, 20};
    cout << v.x + v.y;
}
\`\`\``,
          options: [
            "10",
            "20",
            "30",
            "Error"
          ],
          answer: 2,
          explanation: "Brace initialization sets v.x=10 and v.y=20. So v.x + v.y = 30 is printed!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "private access!",
          content: `Which line causes an error?

\`\`\`cpp
class Box {
private:
    int size;
public:
    void setSize(int s) { size = s; }
};
int main() {
    Box b;
    b.size = 10;       // Line A
    b.setSize(10);     // Line B
}
\`\`\``,
          options: [
            "Line A",
            "Line B",
            "Both lines",
            "No error"
          ],
          answer: 0,
          explanation: "size is private, so accessing it directly from outside causes an error! b.size = 10 is not allowed, but b.setSize(10) works because it's a public function."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Constructors!",
          content: "Which statement about C++ constructors is **incorrect**?",
          options: [
            "It has the same name as the class",
            "Its return type is void",
            "It's called automatically when an object is created",
            "It can take parameters"
          ],
          answer: 1,
          explanation: "Constructors have NO return type at all — not even void! They share the class name, are called automatically on object creation, and can accept parameters."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Comprehensive challenge!",
          content: `What's the output?

\`\`\`cpp
class Counter {
private:
    int count;
public:
    Counter(int c) { count = c; }
    void add() { count++; }
    int get() { return count; }
};
int main() {
    Counter c(10);
    c.add();
    c.add();
    c.add();
    cout << c.get();
}
\`\`\``,
          options: [
            "10",
            "11",
            "13",
            "Error"
          ],
          answer: 2,
          explanation: "Counter c(10) sets count to 10. Calling add() three times: 10 -> 11 -> 12 -> 13. get() returns 13!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Part 2 Complete!",
          content: `## 🏆 Part 2 Complete! Amazing work!

Let's review everything you learned in Part 2 (Lessons 9-14)!

### 📚 Lesson 9: Arrays & Vectors
- Store multiple values with C-style arrays and \`vector\`

### 🔄 Lesson 10: Range-for & auto
- Loop easily with \`for(auto x : vec)\`, auto type deduction

### 🔤 Lesson 11: String Operations
- Various \`string\` methods and techniques

### 🔗 Lesson 12: References & Functions
- Call by Value vs Reference, modify originals with \`&\`

### 🧩 Lesson 13: Enums & Constants
- \`enum\`, \`enum class\`, \`const\` for clearer, safer code

### 🏗️ Lesson 14: Structs & Classes
- Bundle data with \`struct\`, encapsulate with \`class\`, constructors

---

## ✅ Part 2 Key Summary!

| Concept | Keywords | Core Idea |
|---|---|---|
| Arrays/Vectors | \`int arr[]\`, \`vector<int>\` | Store multiple values |
| Range-for | \`for(auto x : v)\` | Easy iteration |
| References | \`int& ref\` | Alias for a variable |
| struct | \`struct { };\` | Bundle data together |
| class | \`class { private/public };\` | Encapsulation |
| Constructor | \`ClassName(...)\` | Initialize objects |

🎊 **Congratulations!** You've completed Part 2! You've mastered important C++ concepts!

🚀 **Up next — Part 3!** Pointers, dynamic memory, and deeper OOP await!`
        }
      ]
    }
  ]
}
