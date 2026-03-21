// ============================================
// C++ Lesson 14: Classes (class)
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson14EnData: LessonData = {
  id: "cpp-14",
  title: "Classes (class)",
  emoji: "🏗️",
  description: "Create your own types with class!",
  chapters: [
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
          title: "🎓 class — Create Your Own Types!",
          component: "cppPublicPrivateBuilder",
          content: `## C++ class — Similar to Python's class, but More Powerful!

You've used class in Python before, right? C++'s class works similarly. The difference is that C++ can **truly enforce** access restrictions.

**class** defaults all members to \`private\`. Why?

To prevent accidentally modifying internal data! For example: a rectangle's width = -10 would be a problem!

- \`public:\` — Accessible from outside the class (anyone can use it)
- \`private:\` — Only accessible inside the class (can't be touched externally)

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

Encapsulation means **hiding data to prevent mistakes**. Like a medicine capsule that protects its contents inside, you protect data and only allow access through designated methods.

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

What happens if there's no constructor in C++? Member variables start with **garbage values**! width could be -8273561. That's why you should always set initial values in the constructor.

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
          id: "ch2-pred-private",
          type: "predict" as const,
          title: "Accessing private members",
          code: "class Rectangle {\nprivate:\n    int width;\npublic:\n    Rectangle(int w) : width(w) {}\n};\n\nint main() {\n    Rectangle r(5);\n    r.width = 10;  // ???\n}",
          options: ["10", "5", "0", "Compile error"],
          answer: 3,
          explanation: "Compile error! width is private, so it can't be accessed from outside the class. Private members can only be accessed from inside the class. To modify it from outside, you'd need to create a public method (setter). This is the core of encapsulation!"
        },
        {
          id: "ch2-getter-setter",
          type: "explain",
          title: "💡 So How Do You Change Private Values?",
          content: `The safe way to access private members: **getter (read)** and **setter (write)** methods!

\`\`\`cpp
class Rectangle {
private:
    int width;
public:
    Rectangle(int w) : width(w) {}
    int getWidth() { return width; }     // getter
    void setWidth(int w) {
        if (w > 0) width = w;  // validate before setting!
    }
};
\`\`\`

Why do it this way? Notice that setWidth checks \`w > 0\`! It prevents width from becoming -10. If you allowed direct access, this kind of protection would be impossible.

💡 A getter is a function that reads a value, and a setter is a function that validates and sets a value!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "class default access!",
          content: "In C++, what is the **default access** for members of a `class` when nothing is specified?",
          options: [
            "public — anyone can access",
            "protected — only child classes can access",
            "private — only accessible inside the class",
            "no access — causes an error"
          ],
          answer: 2,
          explanation: "class members are private by default! That means outside code can't accidentally touch them. To allow outside access, you must explicitly write public:."
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
          title: "Reading class code!",
          content: `What's the output?

\`\`\`cpp
class Dog {
public:
    string name;
    Dog(string n) { name = n; }
};
int main() {
    Dog d("Buddy");
    cout << d.name;
}
\`\`\``,
          options: [
            "Error",
            "d",
            "Buddy",
            "name"
          ],
          answer: 2,
          explanation: "Dog d(\"Buddy\") calls the constructor so name becomes \"Buddy\". Since name is public, d.name is accessible!"
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

### 🔄 Lesson 13: Recursion
- Functions calling themselves, base case required
- Memoization to eliminate repeated work → foundation of Dynamic Programming (DP)

### 🏗️ Lesson 14: Classes (class)
- Encapsulate with \`class\`, private/public access control, constructors

---

## ✅ Part 2 Key Summary!

| Concept | Keywords | Core Idea |
|---|---|---|
| Arrays/Vectors | \`int arr[]\`, \`vector<int>\` | Store multiple values |
| Range-for | \`for(auto x : v)\` | Easy iteration |
| References | \`int& ref\` | Alias for a variable |
| Recursion | \`func(n-1)\` | Base case + recursive call |
| Memoization | \`memo[n]\` | Eliminate repeated work (DP) |
| class | \`class { private/public };\` | Encapsulation |
| Constructor | \`ClassName(...)\` | Initialize objects |

🎊 **Congratulations!** You've completed Part 2! You've mastered important C++ concepts!

🚀 **Up next: Part 3!** pairs & sorting, map & set, STL algorithms for even more powerful C++!`
        }
      ]
    }
  ]
}
