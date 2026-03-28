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
          title: "🐕 class — What if we add functions to a struct?",
          content: `**struct** only bundles data. **class** bundles data + functions (methods) together!

\`\`\`cpp
// struct: data only
struct Dog {
    string name;
    int age;
};

// class: data + functions!
class Dog {
public:
    string name;
    int age;

    void bark() {
        cout << name << ": Woof!" << endl;
    }
};

Dog d;
d.name = "Buddy";
d.age = 3;
d.bark();  // Buddy: Woof!
\`\`\`

**Compared to Python:**

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Method | \`def bark(self):\` | \`void bark() {}\` |
| Member access | \`self.name\` | \`name\` (no self!) |
| Class end | indentation | \`};\` semicolon required! |

💡 **Remember:**
- Inside a method, access members directly — no \`self\` needed
- \`};\` semicolon required at the end of the class!
- \`public:\` is needed so that outside code can access members`,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Read a class!",
          code: `#include <iostream>
#include <string>
using namespace std;

class Dog {
public:
    string name;
    int age;
    void info() {
        cout << name << " " << age << " years old";
    }
};

int main() {
    Dog d;
    d.name = "Buddy";
    d.age = 3;
    d.info();
    return 0;
}`,
          options: ["Buddy 3 years old", "Buddy", "3 years old", "Error"],
          answer: 0,
          explanation: "After setting d.name = \"Buddy\" and d.age = 3, info() is called. Inside the method, name and age are accessed directly — no self needed!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Accessing members inside a method!",
          content: "Inside a method, access member variables directly — no `self`!",
          code: `class Dog {
public:
    string name;
    void bark() {
        cout << ___ << ": Woof!";
    }
};`,
          fillBlanks: [
            { id: 0, answer: "name", options: ["name", "self.name", "Dog.name", "this.name"] }
          ],
          explanation: "In C++, unlike Python's self.name, you just write name! Inside a method, you can directly access the class's own members."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "class vs struct!",
          content: "What is the most important practical difference between class and struct in C++?",
          options: [
            "class cannot have variables",
            "class defaults to private access, struct defaults to public access",
            "struct cannot have functions",
            "There is no difference"
          ],
          answer: 1,
          explanation: "class defaults to private (no outside access), struct defaults to public (anyone can access)! That's why we use class when we need to protect data."
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
          content: `Think about a bank account balance. What if anyone could change it directly?

\`\`\`cpp
// ❌ If everything is public...
class BankAccount {
public:
    double balance;
};

BankAccount acc;
acc.balance = 1000000;  // Anyone can change the balance! 😱
acc.balance = -500;     // Negative balance is possible?!
\`\`\`

To prevent this, we need to **block direct access** and only allow changes through **specific methods**.

That's exactly what **private** does:

\`\`\`cpp
// ✅ Protected with private!
class BankAccount {
private:
    double balance;          // No direct access from outside!

public:
    void deposit(double amount) {   // Only this function can change balance
        if (amount > 0)
            balance += amount;      // OK from inside the class
    }
    double getBalance() {
        return balance;
    }
};

BankAccount acc;
// acc.balance = 1000000;   // ❌ Compile error!
acc.deposit(500);            // ✅ Only through the approved method
\`\`\`

| | private | public |
|---|---|---|
| Accessible from | **Inside class only** | **Anywhere** |
| Typically used for | Data (variables) | Functionality (functions) |

💡 Hiding data and exposing only functions → **Encapsulation**`,
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
          content: `Without a constructor, member variables start with **garbage values**:

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
