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
          id: "ch1-build",
          type: "explain",
          title: "🚗 Let's build a Car class",
          content: `A class looks like this:

\`\`\`
class Name {
    things to remember...  // member variables

    things to do...        // member functions
};
\`\`\`

Start with the \`class\` keyword, write the name, then wrap everything in curly braces.
**Member variables** go at the top, **member functions** go below.

---

Now let's think about a car.

For **things to remember** — to move it needs a **speed**, and let's add a **color** so we can tell cars apart.

For **things to do** — a function to go forward, and one to check the current state sounds like a good start.

This is just one way to think about it. As you build, you might find you need more — or that some things aren't necessary after all.

Let's write it out.

First, the **member variables** — things to remember:

\`\`\`cpp
class Car {
    double speed;   // speed → double so decimals work too
    string color;   // color → string for text
\`\`\`

Then below, the **member functions** — things to do:

\`\`\`cpp
    void forward() {
        speed += 10;   // going forward means speed increases, right?
    }
    void info() {      // I'll set this up to print the car's info
        cout << color << " car, speed: " << speed << endl;
    }
};
\`\`\`

> 🐍 **Coming from Python?** In Python you'd write \`self.speed\`, but in C++ you just write \`speed\` directly.

{collapse:View full code}
\`\`\`cpp
class Car {
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " car, speed: " << speed << endl;
    }
};
\`\`\`

No car exists yet.`,
        },
        {
          id: "ch1-object",
          type: "explain",
          title: "🎮 So how do you actually create a car?",
          content: `We just wrote a Car class — so does a car exist now?

No. A class is a **blueprint**. One more step is needed to actually create a car.

Think of an RPG game — seeing the "Flame Sword" description in a shop doesn't make it yours. You have to **actually buy it or pick it up** for it to appear in your inventory.

| | Game | Programming |
|---|---|---|
| Item **description** | Flame Sword info | **class** |
| The item you actually **own** | Sword in your inventory | **object** |

What you create from a class is called an **object** or **instance**.

\`\`\`cpp
int main() {
    Car myCar;            // ← an actual car (object) is created here!
    myCar.color = "red";
    myCar.speed = 0;
    myCar.forward();
    myCar.forward();
    myCar.info();         // red car, speed: 20
}
\`\`\`

One blueprint, multiple cars:

\`\`\`cpp
int main() {
    Car car1;  car1.color = "red";    // object 1
    Car car2;  car2.color = "blue";   // object 2
}
\`\`\`

> 🍪 **Cookie cutter = class, cookie = object**
> One cutter makes many cookies — one class creates many objects.

**Designing classes and creating objects from them** — this way of programming is called **Object-Oriented Programming (OOP)**.

{collapse:📦 Bonus — what if there were no classes?}
\`\`\`cpp
// Without a class, two cars would look like this...
int main() {
    double car1Speed = 0;
    string car1Color = "red";
    double car2Speed = 0;
    string car2Color = "blue";

    car1Speed += 10;
    car2Speed += 10;

    // As code grows... wait, which car was car2Color for again?
    cout << car1Color << " car, speed: " << car1Speed << endl;
    cout << car2Color << " car, speed: " << car2Speed << endl;
}
// With 10 cars? 20 variables — and you'd lose track of which belongs to which
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Read the Car class!",
          code: `#include <iostream>
#include <string>
using namespace std;

class Car {
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
          title: "So how do we get or change values inside the class?",
          content: `We said member variables should be private — but what if we need to read or change \`speed\`?

You access them **through a public member function**.

\`\`\`cpp {6-8,10-15}
class Car {
private:
    double speed;
    string color;

public:
    double getSpeed() { return speed; }   // read speed
    string getColor() { return color; }   // read color

    void setSpeed(double s) {
        if (s >= 0) speed = s;   // reject negative speed
    }
    void setColor(string c) {
        if (c != "") color = c;  // reject empty color
    }
};
\`\`\`

\`\`\`cpp
int main() {
    Car myCar;
    myCar.setColor("red");
    myCar.setSpeed(-999);    // negative → ignored
    cout << myCar.getSpeed(); // 0 (unchanged)
}
\`\`\`

Functions that **read** a value are called **getters**, and functions that **set** a value are called **setters**.
The key point: a setter can **reject invalid values**.

@Key: Block with private, then create a controlled gateway with getters/setters — that's **encapsulation**.

But there's still one question — do we have to call a setter every single time we create an object just to set initial values? Is there a better way?`,
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
          id: "ch3-constructor",
          type: "explain",
          title: "🔧 Constructor — Called automatically when an object is created!",
          content: `You've followed along great so far — but wait, something's a bit off, right?

When we create a Car object, there's no speed and no color at first. We have to call setters one by one to fill them in.

Think about it — when a person is born, they already have a name and a gender. Shouldn't an object also be set up from the very moment it comes into existence?

And there is a way. A function that's **called automatically the moment an object is created** — that's called a **constructor**.

Without a constructor, member variables start with **garbage values**:

\`\`\`cpp
BankAccount acc;
// acc.balance might be -398475.23 or some random value! 😱
\`\`\`

A **constructor** safely sets initial values the moment an object is created:

\`\`\`cpp
class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {  // Constructor!
        owner = name;
        if (initial >= 0) balance = initial;
        else              balance = 0;   // Block negative deposits
    }
};

BankAccount acc("Emma", 1000);  // Constructor called automatically!
\`\`\`

**Compared to Python:**

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Constructor name | \`__init__\` | **Same as class name** |
| First parameter | \`self\` required | None |
| Return type | None | **None (not even void!)** |

💡 **Remember:**
- Constructor name = class name (exact match including case!)
- No return type — writing void is actually an error!
- Called automatically once when the object is created`,
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
          id: "ch4-getter-setter",
          type: "explain",
          title: "💡 Reading and writing private values — getter & setter",
          content: `Private members can't be accessed directly from outside! So how do we read and change them?

- **getter** — a function that reads a value (read-only)
- **setter / action function** — validates and changes a value

\`\`\`cpp
class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {
        owner   = name;
        balance = initial;
    }

    // getters: read only
    double getBalance() { return balance; }
    string getOwner()   { return owner; }

    // deposit: only when amount > 0
    void deposit(double amount) {
        if (amount > 0)
            balance += amount;
    }

    // withdraw: only when amount <= balance
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance)
            balance -= amount;
    }
};

BankAccount acc("Emma", 1000);
acc.deposit(500);
cout << acc.getBalance();  // 1500
acc.withdraw(2000);        // Not enough balance — ignored
cout << acc.getBalance();  // 1500
\`\`\`

This way, balance can never go negative!`,
        },
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
          code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    // 1. Declare owner(string), balance(double)

public:
    // 2. Constructor: BankAccount(string name, double initial)

    // 3. getBalance()

    // 4. deposit(double amount)

    // 5. withdraw(double amount)
};

int main() {
    BankAccount acc("Emma", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    acc.withdraw(9999);  // Not enough — ignored
    cout << acc.getBalance();
    return 0;
}`,
          expectedOutput: `1300`
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

Let's review everything from Part 2 (Lessons 9–14, 22)!

### 📚 Lesson 9: Arrays & Vectors
- Storing multiple values with C-style arrays and \`vector\`

### 🔄 Lesson 10: Range-for & auto
- Easy iteration with \`for(auto x : vec)\`, type inference with \`auto\`

### 🔤 Lesson 11: Strings
- String methods and usage patterns

### 🔗 Lesson 12: References & Functions
- Call by Value vs Reference, modifying originals with \`int& ref\`

### 🎯 Lesson 13: Pointers
- Pointer syntax \`int* ptr\`, dereference \`*ptr\`, nullptr

### 📦 Lesson 14: Struct
- User-defined types that bundle related data

### 🎓 Lesson 22: Class
- \`private\`/\`public\` access control, constructors, encapsulation

---

## ✅ Part 2 Key Summary!

| Concept | Keyword | Core idea |
|---|---|---|
| Array/Vector | \`int arr[]\`, \`vector<int>\` | Store multiple values |
| Range-for | \`for(auto x : v)\` | Easy iteration |
| Reference | \`int& ref\` | Direct access to original |
| Pointer | \`int* ptr\` | Variable that stores an address |
| struct | \`struct Name { };\` | Data bundle |
| class | \`class { private/public };\` | Encapsulation (default private) |
| Constructor | \`ClassName(...)\` | Object initialization |

🎊 **Congratulations!** You've completed Part 2!

🚀 **Next: Part 3!** 2D arrays, pair & sorting, map & set, STL algorithms!`
        }
      ]
    }
  ]
}
