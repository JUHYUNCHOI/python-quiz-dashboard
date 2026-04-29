// ============================================
// C++ Lesson 22: Class
// C++ for students who know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson22EnData: LessonData = {
  id: "cpp-22",
  title: "Class",
  emoji: "🎓",
  description: "Data + functions together! Create your own types",
  chapters: [
    // ============================================
    // Chapter 1: Class basics — struct + functions
    // ============================================
    {
      id: "ch1",
      title: "Class Basics",
      emoji: "🐕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🚗 What is a class?",
          content: `\`int\` for integers, \`string\` for text.
But a **car**? C++ has no car type. **You have to build it yourself.**

But think about what goes into a car — tires, engine, fuel, color, speed, doors... it never ends.
Like a friend asked to list sushi roll ingredients who named rice, cucumber, salmon, avocado — but forgot the **seaweed**. When you try to think of everything, you miss what matters most.

So just ask two things:

**🧠 What does it need to remember?**
→ In C++: **member variables**

**⚙️ What should it be able to do?**
→ In C++: **member functions**

Bundling these two together into a definition — that's exactly what a **class** is.`,
        },
        {
          id: "ch1-build-skeleton",
          type: "explain",
          title: "🧱 What does a class look like?",
          content: `A class looks like this:

\`\`\`
class Name {
    things to remember...  // member variables

    things to do...        // member functions
};
\`\`\`

Start with the \`class\` keyword, write the name, then wrap everything in curly braces.
**Member variables** go at the top, **member functions** go below.`,
        },
        {
          id: "ch1-build-design",
          type: "explain",
          title: "🚗 Let's design a Car class",
          content: `Before writing code, let's decide what a Car needs.

For **things to remember** — to move it needs a **speed**, and let's add a **color** so we can tell cars apart.

For **things to do** — a function to go forward, and one to check the current state sounds like a good start.

This is just one way to think about it. As you build, you might find you need more — or that some things aren't necessary after all.`,
        },
        {
          id: "ch1-build-code",
          type: "explain",
          title: "✍️ Write the Car class",
          layout: {
            left: `Top — **member variables** (things to remember):
- \`double speed;\` — decimals allowed
- \`string color;\` — text

Below — **member functions** (things to do):
- \`forward()\` — increase speed
- \`info()\` — print current state

> 🔑 The \`public:\` at the top means "these members below can be used from outside." Just leave it there for now — you'll learn exactly why it's needed in **Ch2**.

> 🐍 **Coming from Python?**
> Python needs \`self.speed\`;
> C++ just uses \`speed\` directly.

No car exists yet — we've only written the blueprint.`,
            right: `\`\`\`cpp
class Car {
public:
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " car, speed: "
             << speed << endl;
    }
};
\`\`\``
          },
        },
        {
          id: "ch1-build-practice",
          type: "practice" as const,
          title: "✋ Write a class yourself",
          hideStarterButton: true,
          content: `Now try writing a \`Dog\` class yourself!

**Steps:**

1. Declare \`class Dog\` (don't forget the semicolon)
2. Under \`public:\`, add member variables \`name\` (string), \`age\` (int)
3. Under \`public:\`, add a member function \`bark()\` — print \`"Woof!"\``,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Declare class Dog
// 2. public: name (string), age (int)
// 3. public: bark() — print "Woof!"


int main() {
    Dog d;
    d.name = "Choco";
    d.age = 3;
    d.bark();
    cout << d.name << ", " << d.age << " years old";
    return 0;
}`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Dog {
public:
    string name;
    int age;

    void bark() {
        cout << "Woof!" << endl;
    }
};

int main() {
    Dog d;
    d.name = "Choco";
    d.age = 3;
    d.bark();
    cout << d.name << ", " << d.age << " years old";
    return 0;
}`,
          hint: `class Dog { public: string name; int age; void bark() { cout << "Woof!" << endl; } };  — semicolon at the end of class!`,
          expectedOutput: `Woof!
Choco, 3 years old`
        },
        {
          id: "ch1-object-concept",
          type: "explain",
          title: "🎮 class is the blueprint, object is the real thing!",
          content: `We just wrote a Car class — so does a car exist now?

No. A class is a **blueprint**. One more step is needed to actually create a car.

![class = blueprint, object = real thing](/images/cpp/class-blueprint.svg)

Think of an RPG game — seeing the "Flame Sword" description in a shop doesn't make it yours. You have to **actually buy it or pick it up** for it to appear in your inventory.

| | Game | Programming |
|---|---|---|
| Item **description** | Flame Sword info | **class** |
| The item you actually **own** | Sword in your inventory | **object** |

What you create from a class is called an **object** or **instance**.`,
        },
        {
          id: "ch1-object-make",
          type: "explain",
          title: "🛠️ Let's create an object",
          component: "cppObjectCreateBuilder",
          content: `So how do we actually make an **object**? It's not hard — remember \`int x;\`? **Type name** then **variable name**. Same for objects:`,
          contentAfter: `**One blueprint can make many cars:**

\`\`\`cpp
Car car1;    // object 1
Car car2;    // object 2
Car car3;    // object 3
\`\`\`

![One blueprint, many objects|width=480](/images/cpp/class-multi.svg)`,
        },
        {
          id: "ch1-object-code",
          type: "explain",
          title: "🔗 Use members with the dot (.)",
          content: `Now that you have an object, it's time to use it. To change \`myCar\`'s \`color\` or call \`forward()\`?

**All you need is the dot** \`.\`

{collapse:📐 Reference — here's what class Car looks like}
\`\`\`cpp
class Car {
public:
    string color;
    double speed;

    void forward();
    void info();
};
\`\`\`

\`\`\`cpp
Car myCar;

myCar.color = "red";    // set a member variable
cout << myCar.speed;    // read a member variable
myCar.forward();        // call a member function (don't forget the parens)
\`\`\`

This style of programming — **drawing a blueprint and stamping out living copies** — is called **Object-Oriented Programming (OOP)**.

Think of an RPG — once you design a Warrior **blueprint**, you can stamp out Arthur, Jade, Ian... as many as you want, each fighting on their own. \`class Car\` is exactly the same.`,
        },
        {
          id: "ch1-object-practice",
          type: "practice" as const,
          title: "✋ Create and drive a Car",
          content: `Create a \`Car\` object and make it move!

**Steps:**

1. Create a \`myCar\` object
2. Set \`color\` to "blue", \`speed\` to 0
3. Call \`forward()\` twice
4. Call \`info()\``,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " car, speed: " << speed << endl;
    }
};

int main() {
    // 1. Create Car object myCar


    // 2. Set color to "blue", speed to 0


    // 3. Call forward() twice


    // 4. Call info()


    return 0;
}`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " car, speed: " << speed << endl;
    }
};

int main() {
    Car myCar;
    myCar.color = "blue";
    myCar.speed = 0;
    myCar.forward();
    myCar.forward();
    myCar.info();
    return 0;
}`,
          hint: `Create object: Car myCar; — Set members: myCar.color = "blue"; myCar.speed = 0; — Call functions: myCar.forward(); twice, then myCar.info();`,
          expectedOutput: `blue car, speed: 20`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Read the Car class!",
          code: `#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    string color;
    double speed;
    void forward() { speed += 10; }
    void info() {
        cout << color << " " << speed;
    }
};

int main() {
    Car c;
    c.color = "blue";
    c.speed = 0;
    c.forward();
    c.forward();
    c.info();
    return 0;
}`,
          options: ["blue 20", "blue 0", "blue 10", "Error"],
          answer: 0,
          explanation: "forward() is called twice, so speed goes 0→10→20. info() prints color and speed. Inside the method, color and speed are accessed directly — no self needed!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Complete the member function!",
          content: "Inside a method, access member variables directly — no `self`!",
          code: `class Car {
    double speed;
    void forward() {
        ___ += 10;   // increase speed by 10
    }
};`,
          fillBlanks: [
            { id: 0, answer: "speed", options: ["speed", "self.speed", "Car.speed", "this.speed"] }
          ],
          explanation: "In C++, unlike Python's self.speed, you just write speed! Inside a method, you can directly access the class's own member variables."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "What is a class?",
          content: "Which statement about class is **correct**?",
          options: [
            "A class can only hold variables (data), not functions",
            "Methods inside a class cannot access the class's own members",
            "A class bundles data and functions together to create a custom type",
            "Variables created from a class cannot use dot (.) notation"
          ],
          answer: 2,
          explanation: "A class bundles data (variables) and functions (methods) to create your own type! You access them with dot notation like Dog d; d.bark();"
        },
      ]
    },
    // ============================================
    // Chapter 2: private — Why hide data?
    // ============================================
    {
      id: "ch2",
      title: "private — Protecting Data",
      emoji: "🔒",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "🔒 Why do we need to hide data?",
          content: `Our Car class actually has a problem.

\`\`\`cpp
int main() {
    Car myCar;
    myCar.speed = -999;   // negative speed?
    myCar.color = "";     // empty color?
}
\`\`\`

Anyone can set any value from outside. There's nothing stopping them.

Now imagine this is a bank account class. Anyone can change your balance? That's way too dangerous.

So classes have keywords that control access:

| Keyword | Who can access |
|---|---|
| **public** | Anyone — this is what we've been using so far |
| **protected** | Inside the class + classes that inherit from it |
| **private** | Inside the class only |

Typically, **member variables are kept private** so nothing can change them directly from outside, and **member functions are public** so they can be called.

Let's see how it works.`,
        },
        {
          id: "ch2-how",
          type: "explain",
          title: "🔒 Using private / public",
          content: `Anything under \`private:\` **cannot be accessed from outside the class.**
Anything under \`public:\` **can be called from anywhere.**

\`\`\`cpp
class Car {
private:              // ← nothing below here is accessible from outside
    double speed;
    string color;

public:               // ← everything below here can be called from outside
    void forward() {
        speed += 10;  // inside the class, private variables are fine to use
    }
    void info() {
        cout << color << " car, speed: " << speed << endl;
    }
};
\`\`\`

@Key: Private variables can only be touched by functions inside the class. Direct access from outside causes a compile error!

\`\`\`cpp
int main() {
    Car myCar;
    myCar.speed = -999;   // ❌ Compile error
    myCar.forward();      // ✅ public — no problem
}
\`\`\``,
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Separate private from public!",
          content: "The password should be hidden, but the check function should be public.",
          code: `class Account {
___:
    string password;    // password must be hidden!

___:
    bool check(string input) {   // check function needs to be accessible!
        return password == input;
    }
};`,
          fillBlanks: [
            { id: 0, answer: "private", options: ["private", "public", "protected", "hidden"] },
            { id: 1, answer: "public", options: ["public", "private", "open", "extern"] }
          ],
          explanation: "password is private (hidden), check() is public (accessible). Hiding data and exposing only functions is the core of encapsulation!"
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "What happens when you access private directly?",
          code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    void deposit(double a) { balance += a; }
};

int main() {
    BankAccount acc;
    acc.balance = 1000;
    cout << acc.balance;
    return 0;
}`,
          options: ["1000", "0", "Compile error", "Garbage value"],
          answer: 2,
          explanation: "balance is private, so accessing acc.balance directly from outside the class causes a compile error! Only methods inside the class (like deposit) can access it."
        },
        {
          id: "ch2-getter-setter",
          type: "explain",
          title: "So how do we get or change blocked values?",
          content: `We just blocked the bank balance with \`private\`. But that doesn't mean nobody can ever see it — you use a **teller window**.

Here's another way to think about it. Imagine your stuff is in your room. You don't want people just walking in and grabbing things, right? So you **lock the door** (\`private\`).

But if a friend needs something? They **knock and ask** — you hand it to them → that's a **getter**.
Want to put something in? They **ask you** — you take it from them → that's a **setter**.

A class works the same way. Member variables stay private — and to read or change \`speed\`, you go **through a public member function**.

\`\`\`cpp {6-8}
class Car {
private:
    double speed;
    string color;

public:
    double getSpeed() { return speed; }        // read
    void   setSpeed(double s) { speed = s; }   // write
};
\`\`\`

Functions that **read** a value are called **getters**, and functions that **set** a value are called **setters**. Prefixing names with \`get\` / \`set\` is just a convention.`,
        },
        {
          id: "ch2-encapsulation",
          type: "explain",
          title: "But why go through functions at all?",
          content: `Wouldn't it be easier to just make things public? Well — going through a setter lets you **block invalid values.**

\`\`\`cpp {7,10}
class Car {
private:
    double speed;
    string color;

public:
    void setSpeed(double s) {
        if (s >= 0) speed = s;   // reject negative speed
    }
    void setColor(string c) {
        if (c != "") color = c;  // reject empty color
    }
    double getSpeed() { return speed; }
};
\`\`\`

\`\`\`cpp
int main() {
    Car myCar;
    myCar.setSpeed(-999);       // negative → ignored
    cout << myCar.getSpeed();   // 0 (unchanged)
}
\`\`\`

**Block** with \`private\`, then build a **controlled gateway** with getters/setters — that's exactly what **encapsulation** is.

@Key: Hide internal data; only let the outside talk through functions. That way, even if the internal implementation changes later, the outside code can stay the same.

But one question remains — do we really need to call a setter **every single time** we create an object, just to set initial values? There's got to be a better way...`,
        },
        {
          id: "ch2-gs-pred",
          type: "predict" as const,
          title: "🔍 What if the setter blocks bad values?",
          code: `#include <iostream>
using namespace std;

class Car {
private:
    double speed = 0;
public:
    double getSpeed() { return speed; }
    void setSpeed(double s) {
        if (s >= 0) speed = s;
    }
};

int main() {
    Car c;
    c.setSpeed(-999);
    c.setSpeed(60);
    c.setSpeed(-5);
    cout << c.getSpeed();
    return 0;
}`,
          options: ["-5", "60", "0", "Compile error"],
          answer: 1,
          explanation: "setSpeed(-999) and setSpeed(-5) fail the \`s >= 0\` check and are ignored. Only 60 passes → speed becomes 60. getSpeed() prints 60."
        },
        {
          id: "ch2-gs-fb",
          type: "fillblank" as const,
          title: "Complete the getter / setter!",
          content: "A getter **returns** a value; a setter checks a condition then **sets** it.",
          code: `class Student {
private:
    int score;
public:
    int getScore() { ___ score; }                       // return the value

    void setScore(int s) {
        if (s >= 0 && s <= 100) ___ = s;                // only set if 0~100
    }
};`,
          fillBlanks: [
            { id: 0, answer: "return", options: ["return", "score", "get", "="] },
            { id: 1, answer: "score", options: ["score", "s", "this", "setScore"] }
          ],
          explanation: "A getter uses `return` to hand back the member's value. A setter assigns `member = parameter` when the condition passes. Here `score` is the member, `s` is the parameter."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Write your own getter/setter",
          hideStarterButton: true,
          content: `Add a getter and setter to the \`Person\` class yourself!

**Steps:**

1. \`getAge()\` — return \`age\`
2. \`setAge(int a)\` — only set if \`a >= 0\` (reject negatives)`,
          starterCode: `#include <iostream>
using namespace std;

class Person {
private:
    int age = 0;

public:
    // 1. getAge() — return age


    // 2. setAge(int a) — only set if a >= 0

};

int main() {
    Person p;
    p.setAge(-5);    // negative → ignored
    p.setAge(15);
    cout << p.getAge();  // 15
    return 0;
}`,
          code: `#include <iostream>
using namespace std;

class Person {
private:
    int age = 0;

public:
    int getAge() { return age; }

    void setAge(int a) {
        if (a >= 0) age = a;
    }
};

int main() {
    Person p;
    p.setAge(-5);
    p.setAge(15);
    cout << p.getAge();
    return 0;
}`,
          hint: `int getAge() { return age; } — void setAge(int a) { if (a >= 0) age = a; }`,
          expectedOutput: `15`
        },
      ]
    },
    // ============================================
    // Chapter 3: Constructor
    // ============================================
    {
      id: "ch3",
      title: "Constructor",
      emoji: "🔧",
      steps: [
        {
          id: "ch3-motivation-intro",
          type: "explain",
          title: "🤔 What if we don't call any setter?",
          content: `A moment ago, you used \`setAge()\` to set initial values. But **what if you forget and don't call any setter?** What value does that member hold?

0? Or something else? Try the next couple of questions to get a feel.`,
        },
        {
          id: "ch3-garbage-p4",
          type: "predict" as const,
          title: "🔍 What's an uninitialized class-member int?",
          code: `class Box {
public:
    int count;   // not initialized
};

int main() {
    Box b;
    cout << b.count;
    return 0;
}`,
          options: ["Prints 0", "Garbage", "Compile error", "Prints \"\""],
          answer: 1,
          explanation: "Without a constructor, **fundamental-type members** (int, double, char, bool) behave like locals — garbage. This is exactly why we need constructors!"
        },
        {
          id: "ch3-garbage-p5",
          type: "predict" as const,
          title: "🔍 What about string and vector members?",
          code: `class Box {
public:
    string label;        // not initialized
    vector<int> items;   // not initialized
};

int main() {
    Box b;
    cout << b.label.length() << " "
         << b.items.size();
    return 0;
}`,
          options: ["Two garbage values", "0 0", "Error", "\"\" 0"],
          answer: 1,
          explanation: "**Class types** (string, vector, map, etc.) have their own default constructor, so they auto-initialize. string becomes empty (\`\"\"\`, length 0), vector becomes empty (size 0). No garbage!"
        },
        {
          id: "ch3-garbage-summary",
          type: "explain",
          title: "📋 Class member initial values — summary",
          layout: {
            left: `**Class member initial values**

| Member type | If not initialized |
|---|---|
| \`int\`, \`double\`, \`char\`, \`bool\` | 🎲 garbage |
| Fundamental-type array \`int arr[5]\` | 🎲 garbage per element |
| \`string\`, \`vector\`, \`map\`, ... | ✅ empty ("", [], {}) |
| \`string\` array \`string arr[5]\` | ✅ "" per element |

Types like \`string\` / \`vector\` **start empty on their own** (no worries). But **fundamental types** like \`int\`, \`double\` hold **random garbage** if you don't initialize them.

**So** — we need a device that takes care of members automatically. Next page: **the constructor** enters!`,
            right: `\`\`\`cpp
class Box {
    int count;          // 🎲 garbage
    int scores[5];      // 🎲 all 5 garbage
    string name;        // ✅ ""
    string tags[3];     // ✅ all 3 ""
    vector<int> v;      // ✅ []
};

Box b;
// b.count     → garbage!
// b.scores[0] → garbage!
// b.name      → ""
// b.tags[0]   → ""
\`\`\``
          },
        },
        {
          id: "ch3-constructor",
          type: "explain",
          title: "🔧 Constructor — Called automatically when an object is created!",
          component: "cppConstructorBuilder",
          content: `A person already has a name and gender the moment they're born. Shouldn't an object also be set up from the moment it comes into existence?

That's what a **constructor** is — a function that's **called automatically the moment an object is created**. Initialize members inside the constructor, and no more garbage value worries.

Let's build a constructor step by step:`,
        },
        {
          id: "ch3-constructor-usage",
          type: "explain",
          title: "The full class with a constructor",
          content: `Now let's **slot** the constructor you just built into the class. A constructor always goes under \`public:\` — it has to be callable from outside when creating an object.

\`\`\`cpp {6-11,14}
class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {  // ← constructor goes here
        owner = name;
        if (initial >= 0) balance = initial;
        else              balance = 0;   // block negative deposits
    }
};

BankAccount acc("Emma", 1000);  // constructor called automatically!
\`\`\`

That last line \`BankAccount acc("Emma", 1000);\` is all it takes — the moment \`acc\` is created, the constructor above fires and sets \`owner = "Emma"\`, \`balance = 1000\`. No more calling a setter every time.

**Compared to Python:**

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Constructor name | \`__init__\` | **Same as class name** |
| First parameter | \`self\` required | None |
| Return type | None | **None (not even void!)** |`,
        },
        {
          id: "ch3-object-create-ctor",
          type: "explain",
          title: "🛠️ Creating an object with a constructor — in detail",
          component: "cppObjectCreateCtorBuilder",
          content: `Earlier we made objects like \`Car myCar;\`. But when there's a constructor, you need to **pass in values.**

No \`=\` — just write the arguments inside **parentheses** \`( )\` — those values go straight to the constructor.`,
          contentAfter: `**🐍 Compared to Python:**

| | Python | C++ |
|---|---|---|
| Create object | \`acc = BankAccount("Emma", 1000)\` (with \`=\`) | \`BankAccount acc("Emma", 1000);\` (no \`=\`) |

In C++, passing arguments through **parentheses** \`( )\` is the most common style — it feels like calling the constructor directly.`,
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "Constructor in action!",
          code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
    void info() {
        cout << owner << ": $" << balance;
    }
};

int main() {
    BankAccount acc("Emma", 5000);
    acc.info();
    return 0;
}`,
          options: ["Emma: $5000", "Error", "$0", "Emma"],
          answer: 0,
          explanation: "BankAccount acc(\"Emma\", 5000) automatically calls the constructor! owner = \"Emma\", balance = 5000 are initialized, and info() prints them."
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "Complete the constructor!",
          content: "Inside the constructor, store the parameter value (right) into the member variable (left).",
          code: `class Timer {
private:
    int seconds;
public:
    Timer(int s) {
        ___ = ___;
    }
    int get() { return seconds; }
};`,
          fillBlanks: [
            { id: 0, answer: "seconds", options: ["seconds", "s", "Timer", "int"] },
            { id: 1, answer: "s", options: ["s", "seconds", "0", "get()"] }
          ],
          explanation: "`seconds = s` — left side is the member variable (seconds), right side is the parameter (s). Think of it as 'store the received value into the member'!"
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ Student class — initialize via constructor",
          content: `Complete the \`Student\` class. In main, calling \`Student s("Alice", 17); s.info();\` should print \`Alice, 17\`.

**Requirements:**
1. Member variables: \`name\` (string), \`age\` (int) — public
2. **Constructor**: \`Student(string n, int a)\` — initialize name, age from parameters
3. \`info()\` function: prints \`"name, age"\` (comma + space)

> 💡 Inside the constructor, \`name = n; age = a;\` stores values into members.`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;

    // 👇 Write the constructor: Student(string n, int a)


    // 👇 info() — print "name, age"

};

int main() {
    Student s("Alice", 17);
    s.info();
    return 0;
}`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;

    Student(string n, int a) {
        name = n;
        age = a;
    }

    void info() {
        cout << name << ", " << age;
    }
};

int main() {
    Student s("Alice", 17);
    s.info();
    return 0;
}`,
          hint: "Student(string n, int a) { name = n; age = a; } / void info() { cout << name << \", \" << age; }",
          expectedOutput: "Alice, 17"
        },
      ]
    },
    // ============================================
    // Chapter 4: getter/setter + Practice
    // ============================================
    {
      id: "ch4",
      title: "getter/setter + Practice",
      emoji: "💡",
      steps: [
        {
          id: "ch4-fb1",
          type: "fillblank" as const,
          title: "Complete the getter!",
          content: "A getter reads a private member and **returns** it.",
          code: `class Player {
private:
    int hp;
public:
    Player(int h) { hp = h; }

    int getHp() { return ___; }   // return hp

    void takeDamage(int dmg) {
        if (hp - dmg ___ 0)       // don't go below 0
            hp -= dmg;
    }
};`,
          fillBlanks: [
            { id: 0, answer: "hp", options: ["hp", "dmg", "0", "getHp"] },
            { id: 1, answer: ">=", options: [">=", ">", "<=", "=="] }
          ],
          explanation: "① `return hp` — the getter simply returns the member variable ② `hp - dmg >= 0` — only apply damage when hp won't go below 0!"
        },
        {
          id: "ch4-practice",
          type: "practice" as const,
          title: "✋ Build a BankAccount class!",
          content: `Complete the bank account class yourself!

**Steps:**
1. Declare \`owner\`(string) and \`balance\`(double) in \`private\`
2. Constructor: \`BankAccount(string name, double initial)\` — initialize
3. \`getBalance()\` — return balance
4. \`deposit(double amount)\` — add to balance only when amount > 0
5. \`withdraw(double amount)\` — subtract only when amount > 0 and <= balance`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    // 1. Declare owner(string), balance(double)

public:
    // 2. Constructor: BankAccount(string name, double initial)

    // 3. getBalance()

    // 4. deposit(double amount) — only when amount > 0

    // 5. withdraw(double amount) — only when amount > 0 and <= balance
};

int main() {
    BankAccount acc("Emma", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    acc.withdraw(9999);  // Not enough — ignored
    cout << acc.getBalance();
    return 0;
}`,
          code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }

    double getBalance() {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
};

int main() {
    BankAccount acc("Emma", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    acc.withdraw(9999);  // Not enough — ignored
    cout << acc.getBalance();
    return 0;
}`,
          hint: `Declare private: string owner; double balance; Constructor: BankAccount(string name, double initial) { owner = name; balance = initial; }. deposit: if(amount > 0) balance += amount; withdraw: if(amount > 0 && amount <= balance) balance -= amount;`,
          expectedOutput: `1300`
        },
        {
          id: "ch4-struct-vs-class",
          type: "explain",
          title: "🤝 So what's actually different between struct and class?",
          content: `You've done a lot with \`class\` by now — member variables, member functions, constructors, getters/setters, encapsulation. But remember **struct** from earlier? What actually separates these two?

**Surprise** — \`struct\` can also have **member functions**. The syntax is nearly identical.

\`\`\`cpp
struct Point {
    int x, y;
    void print() { cout << x << "," << y; }   // functions work in struct too!
};
\`\`\`

**Only one real difference** — the default access level:

| | \`struct\` | \`class\` |
|---|---|---|
| Default access | **public** (accessible anywhere) | **private** (locked from outside) |

\`\`\`cpp
struct A { int x; };         // x is public by default
class  B { int x; };         // x is private by default

A a; a.x = 10;   // ✅ OK
B b; b.x = 10;   // ❌ compile error — private!
\`\`\`

**Convention (when to use which?)**

- **\`struct\`** — when you just want to **bundle data** (coordinates, student info, config values...). Free external access is the natural expectation.
- **\`class\`** — when you want to **protect data** and expose it through functions (bank accounts, characters, cars...). For cases that need encapsulation.

@Key: Technically the two keywords are almost twins. The only differences are **what their defaults are** and **what intent you're expressing**.`,
        },
      ]
    },
    // ============================================
    // Chapter 5: Review Quiz
    // ============================================
    {
      id: "ch5",
      title: "Review Quiz",
      emoji: "🏆",
      steps: [
        {
          id: "ch5-q1",
          type: "quiz",
          title: "Read the class!",
          content: `What is the output?

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
          options: ["Error", "d", "Buddy", "name"],
          answer: 2,
          explanation: "Dog d(\"Buddy\") calls the constructor, setting name = \"Buddy\". Since name is public, d.name is accessible!"
        },
        {
          id: "ch5-q2",
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
          options: ["Line A", "Line B", "Both lines", "No error"],
          answer: 0,
          explanation: "size is private, so b.size = 10 directly from outside the class is a compile error! setSize() is a public function, so Line B is fine."
        },
        {
          id: "ch5-q3",
          type: "quiz",
          title: "Constructor!",
          content: "Which statement about C++ constructors is **wrong**?",
          options: [
            "It has the same name as the class",
            "Its return type is void",
            "It is called automatically when an object is created",
            "It can take parameters"
          ],
          answer: 1,
          explanation: "Constructors have NO return type at all — not even void! They share the class name, are called automatically on object creation, and can take parameters."
        },
        {
          id: "ch5-q4",
          type: "quiz",
          title: "Comprehensive question!",
          content: `What is the output?

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
          options: ["10", "11", "13", "Error"],
          answer: 2,
          explanation: "Counter c(10) sets count = 10. Calling add() three times: 10→11→12→13. get() returns 13!"
        },
        {
          id: "ch5-summary",
          type: "explain",
          title: "🎉 Part 2 Complete!",
          content: `## 🏆 Part 2 Complete! Amazing work!

Let's review everything from Part 2 (Lessons 9, 21, 10–14, 22)!

### 📚 Lesson 9: Arrays & Vectors
- Storing multiple values with C-style arrays and \`vector\`

### 🗺️ Lesson 21: 2D Arrays & 2D Vectors
- \`int grid[rows][cols] = {};\` — zero-initialize always
- \`vector<vector<int>> v(n, vector<int>(m, 0));\` — when size is dynamic
- Nested loop traversal, reading grids from \`cin\` (core USACO pattern)
- Main diagonal: \`grid[i][i]\`, total sum: nested for + accumulate

### 🔄 Lesson 10: Range-for & auto
- Easy iteration with \`for(auto x : vec)\`, type inference with \`auto\`

### 🔤 Lesson 11: Strings
- String methods and usage patterns

### 🔗 Lesson 12: References & Functions
- Call by Value vs Reference, modifying originals with \`int& ref\`

### 🎯 Lesson 13: Pointers
- Pointer syntax \`int* ptr\`, dereference \`*ptr\`, nullptr

### 📦 Lesson 14: Struct
- User-defined types that bundle related data (\`struct Student { string name; int score; };\`)
- Access members with \`.\` operator, manage multiple records with struct arrays
- Loop patterns: **sum / min & max / count with condition**
- Pass by reference (\`Student&\`) for efficiency in functions

### 🎓 Lesson 22: Class
- Bundle member variables + member functions into **your own type** (class = blueprint, object = instance)
- \`private\` / \`public\` — hide data members, expose member functions
- **getter** / **setter** — public interface to read/write private members with validation
- **Constructor** — called automatically on object creation, same name as class, no return type
- **Encapsulation** — keep data private, access only through public functions (OOP principle)
- **Type safety bonus:** misspelled member names cause a compile error — bugs caught at build time, not at runtime (unlike Python dicts)

---

## ✅ Part 2 Key Summary!

| Concept | Keyword | Core idea |
|---|---|---|
| Array/Vector | \`int arr[]\`, \`vector<int>\` | Store multiple values |
| 2D Array | \`int grid[N][N] = {};\` | Grid/matrix, nested loop traversal |
| Range-for | \`for(auto x : v)\` | Easy iteration |
| Reference | \`int& ref\` | Direct access to original |
| Pointer | \`int* ptr\` | Variable that stores an address |
| struct | \`struct Name { };\` | Data bundle, array + pattern use |
| class | \`class { private/public };\` | Blueprint → object (OOP) |
| getter/setter | \`getX()\` / \`setX(v)\` | Public interface to private members |
| Constructor | \`ClassName(...)\` | Auto-called at object creation |

🎊 **Congratulations!** You've completed Part 2!

🚀 **Next: Part 3!** pair & sorting, map & set, STL algorithms!`
        }
      ]
    }
  ]
}
