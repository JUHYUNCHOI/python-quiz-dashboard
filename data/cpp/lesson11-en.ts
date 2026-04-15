// ============================================
// C++ Lesson 11: String Deep Dive
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson11EnData: LessonData = {
  id: "cpp-11",
  title: "String Deep Dive",
  emoji: "🔤",
  description: "C++ string methods and operations!",
  chapters: [
    // ============================================
    // Chapter 1: String Methods
    // ============================================
    {
      id: "ch1",
      title: "String Methods",
      emoji: "📏",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📏 String Length and Access!",
          component: "cppStringBuilder",
          content: `Imagine you're building a chat app. You need to find '@username' to send notifications, replace profanity with '***', and check if a message exceeds 100 characters. All of this is **string manipulation**!

In Python, strings were easy, right? \`.upper()\`, \`.split()\`, slicing... C++ strings are similar but have **more things to watch out for**!

In Python, you used \`len()\` to get a string's length. In C++, you use **methods** on the string object!

**Python 🐍:**
\`\`\`python
name = "Hello"
print(len(name))    # 5
print(name[0])      # H
print(name[1])      # e
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string name = "Hello";
cout << name.length() << endl;  // 5
cout << name.size() << endl;    // 5 (same result!)
cout << name[0] << endl;        // H
cout << name.at(1) << endl;     // e
\`\`\`

| Python 🐍 | C++ ⚡ | Purpose |
|---|---|---|
| \`len(s)\` | \`s.length()\` or \`s.size()\` | Length |
| \`s[0]\` | \`s[0]\` or \`s.at(0)\` | Indexing |

What's the difference between \`[]\` and \`.at()\`?
\`\`\`cpp
string s = "Hi";
// s[100]    — goes out of bounds silently! Garbage value.
// s.at(100) — throws an error! Much safer.
\`\`\`

💡 \`.at()\` is safer, but \`[]\` is faster — both are commonly used!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "String length output!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string msg = \"C++ is fun!\";\n    cout << msg.length() << endl;\n    cout << msg[0] << msg[4] << endl;\n    return 0;\n}",
          options: ["11\nCi", "10\nC+", "11\nC ", "10\nCi"],
          answer: 0,
          explanation: "\"C++ is fun!\" has 11 characters (including spaces and !). msg[0]='C', msg[4]='i' (counting from 0: C,+,+, ,i), so \"Ci\" is printed."
        },
        {
          id: "ch1-methods",
          type: "explain",
          title: "🔍 substr, find, replace!",
          content: `Python has slicing, find, and replace. C++ has equivalent methods!

**Python 🐍:**
\`\`\`python
s = "Hello World"
print(s[0:5])         # "Hello" (slicing)
print(s.find("World")) # 6
print(s.replace("World", "C++"))  # "Hello C++"
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string s = "Hello World";
cout << s.substr(0, 5) << endl;    // "Hello"
cout << s.find("World") << endl;   // 6
s.replace(6, 5, "C++");            // s becomes "Hello C++"!
cout << s << endl;                  // "Hello C++"
\`\`\`

| Python 🐍 | C++ ⚡ | Notes |
|---|---|---|
| \`s[a:b]\` | \`s.substr(pos, len)\` | Substring (position, **length**!) |
| \`s.find("x")\` | \`s.find("x")\` | Search (same!) |
| \`s.replace("a","b")\` | \`s.replace(pos, len, "b")\` | Replace (position-based!) |

⚠️ Key difference: C++ \`substr\` and \`replace\` use **position and length**! Not string-based search like Python.

What if \`find()\` doesn't find anything?
\`\`\`cpp
string s = "Hello";
size_t pos = s.find("xyz");
if (pos == string::npos) {
    cout << "Not found!" << endl;
}
\`\`\`
Python returns \`-1\`, but C++ returns \`string::npos\` — a special constant!

🔍 What is \`string::npos\`? It stands for 'no position.' When find() can't locate the character, it returns this special value. Why not -1? Because string positions use the \`size_t\` type, which can't be negative!

Here's the standard pattern for searching in strings:
\`\`\`cpp
size_t pos = str.find("abc");
if (pos != string::npos) {
    // found it
} else {
    // not found
}
\`\`\`

💡 Combine find and substr to replicate Python's slicing!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Get the length and extract a piece!",
          code: "string s = \"Programming\";\ncout << s.___() << endl;\ncout << s.___(0, 7) << endl;",
          fillBlanks: [
            { id: 0, answer: "length", options: ["length", "len", "count", "sizeof"] },
            { id: 1, answer: "substr", options: ["substr", "slice", "sub", "cut"] }
          ],
          explanation: "s.length() gets the length, and s.substr(0, 7) extracts 7 characters starting at position 0 — giving us \"Program\"!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Server Log Analyzer",
          content: `You're building a program to analyze server logs.

Start with:
\`string log = "2024-01-15 ERROR server connection failed";\`

1. Check if "ERROR" exists — print its position and the message after it
2. Check if "CRITICAL" exists — it's not there, so print "CRITICAL not found: within normal range"
3. Extract and print the date (first 10 characters)`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string log = "2024-01-15 ERROR server connection failed";

    // Search for "ERROR"
    size_t pos = log.find("ERROR");
    if (pos != string::npos) {
        cout << "Error found! Position: " << pos << endl;
        cout << "Error message: " << log.substr(pos + 6) << endl;
    }

    // Search for "CRITICAL"
    size_t pos2 = log.find("CRITICAL");
    if (pos2 == string::npos) {
        cout << "CRITICAL not found: within normal range" << endl;
    }

    // Extract date
    cout << "Date: " << log.substr(0, 10) << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string log = "2024-01-15 ERROR server connection failed";

    // 1. Use find("ERROR") to find its position, then substr(pos + 6) for the message after it
    //    Print: "Error found! Position: XX" and "Error message: ..."

    // 2. Use find("CRITICAL") and check against string::npos
    //    Print: "CRITICAL not found: within normal range"

    // 3. Use substr(0, 10) to get the date
    //    Print: "Date: YYYY-MM-DD"

    return 0;
}`,
          hint: "size_t pos = log.find(\"ERROR\") — compare pos != string::npos to check if found. substr(pos + 6) skips \"ERROR \" (5 chars + space). For date: substr(0, 10)",
          expectedOutput: `Error found! Position: 11
Error message: server connection failed
CRITICAL not found: within normal range
Date: 2024-01-15`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "String methods!",
          content: "Given `string s = \"abcdef\";`, what does `s.substr(2, 3)` return?",
          options: [
            "\"ab\"",
            "\"abc\"",
            "\"cde\"",
            "\"cdef\""
          ],
          answer: 2,
          explanation: "substr(2, 3) starts at position 2 ('c') and takes 3 characters — giving \"cde\". It's like Python's s[2:5]."
        }
      ]
    },
    // ============================================
    // Chapter 2: String Operations
    // ============================================
    {
      id: "ch2",
      title: "String Operations",
      emoji: "✂️",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "✂️ Concatenation and Comparison!",
          content: `In Python, you use \`+\` to join strings. C++ is exactly the same!

**Python 🐍:**
\`\`\`python
first = "Hello"
last = " World"
msg = first + last    # "Hello World"
msg += "!"            # "Hello World!"
print(msg)
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string first = "Hello";
string last = " World";
string msg = first + last;    // "Hello World"
msg += "!";                   // "Hello World!"
cout << msg << endl;
\`\`\`

Exactly the same! Comparisons work the same way too:

\`\`\`cpp
string a = "apple";
string b = "banana";

if (a == b) cout << "Equal!" << endl;
if (a < b)  cout << "a comes first!" << endl;  // Lexicographic!
if (a > b)  cout << "b comes first!" << endl;
if (a != b) cout << "Different!" << endl;
\`\`\`

| Operation | Python 🐍 | C++ ⚡ |
|---|---|---|
| Concatenate | \`s1 + s2\` | \`s1 + s2\` (same!) |
| Append | \`s += "x"\` | \`s += "x"\` (same!) |
| Equal | \`s1 == s2\` | \`s1 == s2\` (same!) |
| Lexicographic | \`s1 < s2\` | \`s1 < s2\` (same!) |

💡 String operations in Python and C++ are nearly identical! This is the easiest part.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "String comparison result!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string a = \"apple\";\n    string b = \"banana\";\n    if (a < b) {\n        cout << a << \" comes first\" << endl;\n    } else {\n        cout << b << \" comes first\" << endl;\n    }\n    cout << a + \" and \" + b << endl;\n    return 0;\n}",
          options: [
            "apple comes first\napple and banana",
            "banana comes first\napple and banana",
            "apple comes first\napplebanana",
            "Error"
          ],
          answer: 0,
          explanation: "Lexicographically \"apple\" < \"banana\" (a comes before b), so \"apple comes first\" prints. The + operator concatenates with spaces included."
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "🔄 String ↔ Number Conversion!",
          content: `In Python, you used \`str()\`, \`int()\`, and \`float()\` to convert types. C++ has similar functions!

**Python 🐍:**
\`\`\`python
num = 42
s = str(num)        # "42"
back = int("123")   # 123
pi = float("3.14")  # 3.14
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int num = 42;
string s = to_string(num);     // "42"
int back = stoi("123");        // 123  (string to int)
double pi = stod("3.14");      // 3.14 (string to double)
\`\`\`

| Python 🐍 | C++ ⚡ | Meaning |
|---|---|---|
| \`str(42)\` | \`to_string(42)\` | Number → string |
| \`int("123")\` | \`stoi("123")\` | String → integer |
| \`float("3.14")\` | \`stod("3.14")\` | String → double |

There are also single-character case functions:

\`\`\`cpp
char c = 'a';
cout << (char)toupper(c) << endl;  // 'A'
cout << (char)tolower('Z') << endl; // 'z'
\`\`\`

⚠️ toupper() and tolower() only work on **single characters (char)**! You can't use them on entire strings like Python's \`.upper()\`.

To uppercase an entire string, you need a for loop:
\`\`\`cpp
string s = "hello";
for (char& c : s) {
    c = toupper(c);
}
cout << s;  // HELLO
\`\`\`

💡 Memory trick: stoi = **s**tring **to** **i**nt, stod = **s**tring **to** **d**ouble!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Convert between numbers and strings!",
          code: "int score = 95;\nstring msg = \"Score: \" + ___(score);\nint num = ___(\"200\");",
          fillBlanks: [
            { id: 0, answer: "to_string", options: ["to_string", "str", "string", "toString"] },
            { id: 1, answer: "stoi", options: ["stoi", "int", "toInt", "atoi"] }
          ],
          explanation: "to_string(score) converts 95 to \"95\" for concatenation, and stoi(\"200\") converts the string \"200\" to integer 200!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Name Analysis Program!",
          content: `Declare \`string name = "Alice"\` and \`int age = 15\`, then print the following in order:

1. Print \`name\` → \`Name: Alice\`
2. Use \`name.length()\` to print the length → \`Length: 5\`
3. Use \`name[0]\` to print the first letter → \`First letter: A\`
4. Use \`to_string(age)\` and concatenation (+) to build a sentence → \`Alice is 15 years old\``,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 15;

    cout << "Name: " << name << endl;
    cout << "Length: " << name.length() << endl;
    cout << "First letter: " << name[0] << endl;

    string info = name + " is " + to_string(age) + " years old";
    cout << info << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 15;

    // Print the full name: "Name: Alice"

    // Print the character count: "Length: 5"

    // Print the first letter: "First letter: A"

    // Print: "Alice is 15 years old"

    return 0;
}`,
          hint: "name.length() for character count, name[0] for first letter. For the last line: name + \" is \" + to_string(age) + \" years old\" — to_string() converts int to string for concatenation",
          expectedOutput: `Name: Alice
Length: 5
First letter: A
Alice is 15 years old`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "String conversion!",
          content: "What is the correct way to convert the string `\"456\"` to an integer in C++?",
          options: [
            "int(\"456\")",
            "stoi(\"456\")",
            "toInt(\"456\")",
            "(int)\"456\""
          ],
          answer: 1,
          explanation: "stoi() stands for 'string to int'. It's the C++ equivalent of Python's int()."
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
          title: "Getting the length!",
          content: "Given `string s = \"Hello\";`, which correctly gets the length?",
          options: [
            "Only s.length() works",
            "Only s.size() works",
            "Both s.length() and s.size() work",
            "Use len(s)"
          ],
          answer: 2,
          explanation: "In C++, both .length() and .size() return the same result! Unlike Python's len(s), these are member functions."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "find result!",
          content: "Given `string s = \"Hello World\";`, what does `s.find(\"xyz\")` return?",
          options: [
            "-1",
            "0",
            "string::npos",
            "Throws an error"
          ],
          answer: 2,
          explanation: "When find() can't locate the string, it returns string::npos — a special constant. Python's find() returns -1 instead."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Checking find() result!",
          content: "Which code correctly handles the case where `s.find(\"apple\")` fails?",
          options: [
            "if (s.find(\"apple\") != string::npos)",
            "if (s.find(\"apple\") != -1)",
            "if (s.find(\"apple\") == false)",
            "if (s.find(\"apple\") == 0)"
          ],
          answer: 0,
          explanation: "When find() fails, it returns string::npos — not -1 like Python! So you check success with `!= string::npos`."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Type conversion!",
          content: "What is the result of `to_string(100) + to_string(200)`?",
          options: [
            "300",
            "\"300\"",
            "\"100200\"",
            "Error"
          ],
          answer: 2,
          explanation: "to_string(100) gives \"100\" and to_string(200) gives \"200\". String + string means concatenation, so the result is \"100200\"!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **Length** — \`.length()\` / \`.size()\` (Python's \`len()\`)
- ✅ **Access** — \`s[i]\` or \`s.at(i)\` to get individual characters
- ✅ **Substring** — \`s.substr(pos, len)\` extracts part of a string (Python's slicing)
- ✅ **Find** — \`s.find("x")\` returns position, or \`string::npos\` if not found
- ✅ **Replace** — \`s.replace(pos, len, "new")\` modifies in place
- ✅ **Concatenation & Comparison** — \`+\`, \`+=\`, \`==\`, \`<\`, \`>\` all work like Python!
- ✅ **Conversion** — \`to_string()\`, \`stoi()\`, \`stod()\` for type conversion

| Task | Python 🐍 | C++ ⚡ |
|---|---|---|
| Length | \`len(s)\` | \`s.length()\` |
| Slicing | \`s[2:5]\` | \`s.substr(2, 3)\` |
| Find | \`s.find("x")\` | \`s.find("x")\` |
| Num→String | \`str(42)\` | \`to_string(42)\` |
| String→Num | \`int("42")\` | \`stoi("42")\` |

🚀 **Next up:** More C++ features to explore!`
        }
      ]
    }
  ]
}
