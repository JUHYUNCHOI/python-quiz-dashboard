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

> 🐍 **Coming from Python?**
> Python needs \`self.speed\`;
> C++ just uses \`speed\` directly.

No car exists yet — we've only written the blueprint.`,
            right: `\`\`\`cpp
class Car {
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
          id: "ch1-object-concept",
          type: "explain",
          title: "🎮 class is the blueprint, object is the real thing!",
          content: `We just wrote a Car class — so does a car exist now?

No. A class is a **blueprint**. One more step is needed to actually create a car.

Think of an RPG game — seeing the "Flame Sword" description in a shop doesn't make it yours. You have to **actually buy it or pick it up** for it to appear in your inventory.

| | Game | Programming |
|---|---|---|
| Item **description** | Flame Sword info | **class** |
| The item you actually **own** | Sword in your inventory | **object** |

What you create from a class is called an **object** or **instance**.`,
        },
        {
          id: "ch1-object-code",
          type: "explain",
          title: "🚗 Create and use an object",
          content: `\`\`\`cpp
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
          title: "So how do we get or change values inside the class?",
          content: `We just blocked the bank balance with \`private\`. But that doesn't mean nobody can ever see it — you use a **teller window**.

Here's another way to think about it. Imagine your stuff is in your room. You don't want people just walking in and grabbing things, right? So you **lock the door** (\`private\`).

But if a friend needs something? They **knock and ask** — you hand it to them → that's a **getter**.
Want to put something in? They **ask you** — you check if it's okay, then let it in → that's a **setter**.

A class works the same way. We said member variables should be private — but what if we need to read or change \`speed\`?

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
          id: "ch3-constructor-anim",
          type: "interactive",
          title: "🎬 With vs without a constructor",
          description: "Click through the tabs to see what a constructor does.",
          component: "constructorVisualizer",
        },
        {
          id: "ch3-garbage-p1",
          type: "predict" as const,
          title: "🔍 What happens with a local int?",
          code: `int main() {
    int a;        // not initialized
    cout << a;
    return 0;
}`,
          options: ["Prints 0", "Prints 5", "Unpredictable value (garbage)", "Compile error"],
          answer: 2,
          explanation: "A **local variable** inside a function gets whatever random bytes were already in memory — a garbage value. Different every run. C++ skips auto-initialization for speed."
        },
        {
          id: "ch3-garbage-p2",
          type: "predict" as const,
          title: "🔍 What about a global int?",
          code: `int a;   // global variable (outside main)

int main() {
    cout << a;
    return 0;
}`,
          options: ["Prints 0", "Garbage", "Compile error", "Runtime error"],
          answer: 0,
          explanation: "**Global** and **static** variables are automatically zero-initialized. Only locals carry garbage. \`static int a;\` is also 0!"
        },
        {
          id: "ch3-garbage-p3",
          type: "predict" as const,
          title: "🔍 `int a{};` — what do curly braces do?",
          code: `int main() {
    int a{};      // brace initialization!
    cout << a;
    return 0;
}`,
          options: ["Prints 0", "Garbage", "Error (no initial value given)", "Prints 1"],
          answer: 0,
          explanation: "Empty braces `{}` trigger **value-initialization** — int is guaranteed to be 0. People usually write `int a = 0;` but `int a{};` also guarantees 0."
        },
        {
          id: "ch3-garbage-p4",
          type: "predict" as const,
          title: "🔍 What about an int member inside a class?",
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
          title: "📋 Garbage values — cheat sheet",
          layout: {
            left: `**Fundamental types** (int, double, char, bool, pointers)

| Location | Initial value |
|---|---|
| Inside a function (local) | 🎲 garbage |
| Outside a function (global / static) | ✅ 0 |
| Class member (no constructor) | 🎲 garbage |
| \`int a{};\` (braces) | ✅ 0 |

**Class types** (string, vector, map, ...)
→ have their own default constructor, always start **empty** (no garbage worries)

**Takeaway:** A class with fundamental-type members **must have a constructor**. That's exactly the next step.`,
            right: `\`\`\`cpp
// Initial-value cheat sheet at a glance

int a;              // 🎲 garbage
int b{};            // ✅ 0
int c = 0;          // ✅ 0
static int d;       // ✅ 0 (static)

string s;           // ✅ ""
vector<int> v;      // ✅ []

class Box {
    int count;      // 🎲 garbage
    string name;    // ✅ ""
};

Box b;
// b.count  → garbage
// b.name   → ""
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
          content: `\`\`\`cpp {6-11,14}
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
| Return type | None | **None (not even void!)** |`,
        },
        {
          id: "ch3-initlist",
          type: "explain",
          title: "💡 Constructor — Two Ways to Write It",
          content: `There are **two ways** to put values into members via a constructor.

**Method 1: Fill after creating** (what we've been doing)
\`\`\`cpp
BankAccount(string name, double initial) {
    owner = name;      // put values in with = inside { }
    balance = initial;
}
\`\`\`
👉 The object is **made first**, then values are put in with \`=\` inside \`{ }\`.

**Method 2: Fill while creating** (new way)
\`\`\`cpp
BankAccount(string name, double initial)
    : owner(name), balance(initial) {}
\`\`\`
👉 After the colon \`:\`, write \`member(value)\` pairs separated by \`,\`. Values are **put in at the same time the object is made**. Leave \`{ }\` empty.

> 📖 Formally, Method 1 is called **"body assignment"** and Method 2 is called the **"initializer list"**. When you see these terms in books or online, just remember "ah, those two ways".

---

**The result looks identical** — both end up with \`owner\` and \`balance\` holding the values.

🤔 **But C++ recommends "fill while creating".** Why? It's not just a style preference — the **internal behavior is different**. The next page shows it in a simulator.`
        },
        {
          id: "ch3-initlist-lifecycle",
          type: "explain",
          title: "🔬 Under the Hood — When Do Members Get Their Values?",
          component: "constructorLifecycle",
          content: `Use the **top tabs** (No constructor / With constructor) and the **1 → 2 → 3** step buttons in the simulator below to compare.

- **No constructor**: members are born as garbage and stay that way **forever** (dangerous!)
- **Fill after creating** (body assignment): members are born **empty / with garbage** (step 1), then the body **overwrites** them (step 2) → **2 things** happen.
- **Fill while creating** (initializer list): members are born **directly with the final values** → **1 thing** happens.

For simple types (\`int\`, \`double\`) the speed difference is tiny. The **real difference** is that some members **cannot be "overwritten later" at all** — we meet those (\`const\`, \`reference\`) on the next page.`
        },
        {
          id: "ch3-initlist-const-ref",
          type: "explain",
          title: "⚠️ const and reference — Only \"Fill While Creating\" Works",
          content: `**const members** and **reference members** can only use **"Fill while creating"** (the initializer list). **"Fill after creating"** (body assignment) produces a compile error.

The reason is simple: **const and reference can't be changed once they're made**. So "make first, fill later" is impossible — the value must be set at the moment of creation.

---

**① const members**

\`const int id;\` means "once this value is set, it can never change."

\`\`\`cpp
class Player {
    const int id;   // fixed once it's set
public:
    Player(int i) {
        id = i;     // ❌ ERROR! can't assign to const
    }
};
\`\`\`

By the time we enter the body, \`id\` has **already been default-constructed**. After that, \`id = i\` would be a "value change" — which const forbids → **compile error**.

The list works because it sets the value **at birth** — not a change, an initialization:

\`\`\`cpp
Player(int i) : id(i) {}   // ✅ born with i
\`\`\`

---

**② reference members**

\`int& ref;\` is a **nickname** for another variable. A reference **must** be bound to something **at the moment it's declared**.

\`\`\`cpp
class Observer {
    int& target;    // pointing at what?
public:
    Observer(int& t) {
        target = t;   // ❌ ERROR! target has no binding yet
    }
};
\`\`\`

References can't even "exist" without a target, so the compiler stops you before you reach the body.

Also: for a reference, \`target = t\` means "assign t's value into the variable target already points to" — not "make target point to a different variable". A reference's target **can never be rebound** once set.

The list fixes it:

\`\`\`cpp
Observer(int& t) : target(t) {}   // ✅ born pointing at t
\`\`\`

---

**Summary**

| Member kind | Fill after creating (body) | Fill while creating (list) |
|---|---|---|
| Regular (int, string, etc.) | ✅ works | ✅ works |
| \`const\` | ❌ **error** | ✅ **required** |
| \`reference (&)\` | ❌ **error** | ✅ **required** |
| Other class object (no default constructor) | ❌ error | ✅ required |

→ If your class has const, reference, or a "no-default-constructor" object member, **"fill while creating" is your only option**.`
        },
        {
          id: "ch3-initlist-realworld",
          type: "explain",
          title: "🌍 Which One Is Used More in Real Code?",
          content: `**Answer: "fill while creating"** (the initializer list). Real-world C++ projects and open-source libraries overwhelmingly use it.

---

**Why?**

1. **Consistency** — handles regular members, const, references, object members with **one syntax**
2. **Correctness** — values are set "at birth", no "default-first, overwrite-later" pitfalls
3. **Recommended by authoritative style guides**:
   - Google C++ Style Guide
   - C++ Core Guidelines (co-authored by Bjarne Stroustrup — the creator of C++)
4. **Small efficiency gain** — for heavy types like \`string\`, you avoid "create empty → overwrite" (2 operations) in favor of "create with the value" (1 operation)

---

**So why did this lesson teach "fill after creating" first?**

It's easier to read and visually similar to Python's \`__init__\`, so it's **intuitive when you're first learning**. Nail the concept first, then switch the syntax.

Now that you've got the concept, **make "fill while creating" your default going forward**. Real-world code and open source become much easier to read.

---

**Side-by-side**

\`\`\`cpp
// The style we learned first (fill after creating)
BankAccount(string name, double initial) {
    owner = name;
    balance = initial;
}

// The style you'll see more often in practice (fill while creating)
BankAccount(string name, double initial)
    : owner(name), balance(initial) {}
\`\`\`

Both are correct. Same result. But the second is the standard in team code reviews and open-source contributions.

---

**💡 Summary**

| | Fill after creating (body) | Fill while creating (list) |
|---|---|---|
| Readability (for beginners) | Easy | Compact once familiar |
| const & reference support | ❌ impossible | ✅ supported |
| Efficiency | Slightly slower | One-shot |
| Real-world preference | △ occasional | ⭐ most code |
| Recommended after this lesson | — | ✅ default |

Next time you see \`Player(string n, int h) : name(n), health(h) {}\`, you'll immediately recognize it as **"ah, filling while creating — the initializer list"**.`
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
