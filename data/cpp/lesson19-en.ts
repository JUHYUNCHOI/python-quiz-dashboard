// ============================================
// C++ Lesson 19: File I/O & Fast I/O
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson19EnData: LessonData = {
  id: "cpp-19",
  title: "File I/O & Fast I/O",
  emoji: "📁",
  description: "Essential for USACO! File I/O and fast I/O",
  chapters: [
    // ============================================
    // Chapter 1: File I/O
    // ============================================
    {
      id: "ch1",
      title: "File I/O",
      emoji: "📄",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📄 ifstream & ofstream — Reading and Writing Files!",
          content: `Sometimes your program needs to read from or write to files. In competitions like USACO, file I/O is essential!

In C++, you use the \`<fstream>\` header:

\`\`\`cpp
#include <fstream>

ifstream fin("input.txt");   // Read from a file
ofstream fout("output.txt"); // Write to a file

int x;
fin >> x;          // Read a number from the file
fout << x * 2;     // Write the result to the file

fin.close();       // Close the files
fout.close();
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
fin = open("input.txt", "r")
fout = open("output.txt", "w")

x = int(fin.readline())
fout.write(str(x * 2))

fin.close()
fout.close()
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`open("file", "r")\` | \`ifstream fin("file")\` |
| \`open("file", "w")\` | \`ofstream fout("file")\` |
| \`fin.readline()\` | \`fin >> x\` |
| \`fout.write()\` | \`fout << x\` |
| \`fin.close()\` | \`fin.close()\` |

💡 \`ifstream\` = **i**nput **f**ile **stream**, \`ofstream\` = **o**utput **f**ile **stream**! They use the same >> and << operators as cin/cout.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Open a file for reading!",
          code: "#include <fstream>\n\n___  fin(\"data.txt\");\nint n;\nfin >> n;",
          fillBlanks: [
            { id: 0, answer: "ifstream", options: ["ifstream", "ofstream", "fstream", "iostream"] }
          ],
          explanation: "To read from a file, use ifstream! ifstream = input file stream. To write to a file, you'd use ofstream."
        },
        {
          id: "ch1-freopen",
          type: "explain",
          title: "📄 freopen — The Easiest File I/O!",
          content: `There's an even simpler approach than \`ifstream\`/\`ofstream\`! With **freopen**, you can keep using cin/cout **exactly as before**!

\`\`\`cpp
#include <cstdio>  // or just <iostream> works too

int main() {
    freopen("input.txt", "r", stdin);   // cin now reads from the file!
    freopen("output.txt", "w", stdout); // cout now writes to the file!

    int a, b;
    cin >> a >> b;        // Reads from file! (same old cin!)
    cout << a + b << endl; // Writes to file! (same old cout!)

    return 0;
}
\`\`\`

**Why freopen is great:**
- You don't need to change **any** existing cin/cout code!
- Just add 2 lines of file I/O and you're done!
- **The most common approach in USACO!**

Comparing with Python:

**Python 🐍:**
\`\`\`python
import sys
sys.stdin = open("input.txt", "r")
sys.stdout = open("output.txt", "w")
# Then use input() and print() as usual!
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sys.stdin = open(...)\` | \`freopen("...", "r", stdin)\` |
| \`sys.stdout = open(...)\` | \`freopen("...", "w", stdout)\` |
| input()/print() as usual | cin/cout as usual |

💡 freopen uses "**r**"ead and "**w**"rite modes — same as Python's open()!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Using freopen!",
          code: `#include <iostream>
using namespace std;
int main() {
    // input.txt contains: 10 20
    freopen("input.txt", "r", stdin);
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
          options: ["10 20", "30", "Error", "No output"],
          answer: 1,
          explanation: "freopen redirects stdin to input.txt! cin >> a >> b reads 10 and 20 from the file, and cout << a + b outputs 30."
        },
        {
          id: "ch1-getline",
          type: "explain",
          title: "📄 getline — Read an Entire Line Including Spaces!",
          content: `\`cin >>\` stops at whitespace. To read an entire line, use **getline**!

\`\`\`cpp
string line;
getline(cin, line);  // Reads the entire line!
cout << line;
\`\`\`

**Watch out when using getline after cin >>!**
\`\`\`cpp
int n;
cin >> n;             // Read a number
cin.ignore();         // ← This is essential!
string name;
getline(cin, name);   // Read a full line
\`\`\`

Why do you need \`cin.ignore()\`?
- After \`cin >> n\`, a newline (\\n) is left in the buffer
- \`getline\` reads that leftover newline and returns an empty string
- \`cin.ignore()\` removes that leftover newline!

It works the same with files:
\`\`\`cpp
ifstream fin("data.txt");
string line;
getline(fin, line);  // Read a full line from the file!
\`\`\`

Comparing with Python:

| Python 🐍 | C++ ⚡ |
|---|---|
| \`input()\` (reads full line) | \`getline(cin, str)\` |
| Handles spaces automatically | Reads including spaces |
| Type conversion needed | Reads as string |

💡 When using getline after cin >>, always add **cin.ignore()**! Forgetting it causes subtle bugs.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Read Numbers from File and Print Sum!",
          content: `This program reads N numbers and prints their sum.

Use freopen for file I/O and calculate the sum of all numbers!

Input example (input.txt):
3
10 20 30

Output: 60`,
          code: `#include <iostream>
using namespace std;

int main() {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;
    cin >> n;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
    }

    cout << sum << endl;

    return 0;
}`,
          expectedOutput: "60"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "File I/O basics!",
          content: "What is the biggest advantage of using `freopen`?",
          options: [
            "It's faster than ifstream",
            "You don't need to change existing cin/cout code",
            "It can open multiple files at once",
            "It automatically creates files"
          ],
          answer: 1,
          explanation: "The biggest advantage of freopen is that you don't need to modify any existing cin/cout code at all! Just add two lines of freopen and you have file I/O."
        }
      ]
    },
    // ============================================
    // Chapter 2: Fast I/O & Practice
    // ============================================
    {
      id: "ch2",
      title: "Fast I/O",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ Fast I/O — Speed Up cin/cout!",
          content: `C++'s cin/cout are **slow** by default! That's because they're **synchronized** with C's scanf/printf.

Turning off this synchronization makes them **2-5x faster**!

\`\`\`cpp
int main() {
    ios_base::sync_with_stdio(false);  // Turn off C sync!
    cin.tie(NULL);                      // Untie cin from cout!

    // Now cin/cout are much faster!
    int n;
    cin >> n;
    cout << n;

    return 0;
}
\`\`\`

**Why do you need this?**
- Makes a big difference with 100,000+ data items
- Prevents Time Limit Exceeded (TLE) in contests
- **Usually placed as the first lines of main()!**

**Important warning:**
- After \`sync_with_stdio(false)\`, **don't mix scanf/printf with cin/cout!**
- Use **only one** of the two: cin/cout OR scanf/printf

In Python, you didn't have to worry about this:

**Python 🐍:**
\`\`\`python
import sys
input = sys.stdin.readline  # Python's Fast I/O!
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sys.stdin.readline\` | \`sync_with_stdio(false)\` |
| One line fix | Two lines needed |

💡 In contests, almost always put these two lines at the very top of main()!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Finish the fast I/O setup!",
          code: "int main() {\n    ios_base::sync_with_stdio(false);\n    cin.___  (NULL);\n    // Fast I/O setup complete!\n}",
          fillBlanks: [
            { id: 0, answer: "tie", options: ["tie", "sync", "bind", "link"] }
          ],
          explanation: "cin.tie(NULL) unties cin from cout to boost speed! It's used together with ios_base::sync_with_stdio(false)."
        },
        {
          id: "ch2-endl",
          type: "explain",
          title: "⚡ '\\n' vs endl — endl is Slow!",
          content: `You've probably been using \`endl\` for newlines, right? But **endl is slow**!

**Why is it slow?**
- \`endl\` does a newline + **buffer flush**
- Buffer flush = forces all buffered output to be written immediately
- Flushing every time **seriously hurts performance!**

\`\`\`cpp
// ❌ Slow approach
for (int i = 0; i < 100000; i++) {
    cout << i << endl;    // Flushes every time! Slow!
}

// ✅ Fast approach
for (int i = 0; i < 100000; i++) {
    cout << i << '\\n';    // Just a newline! Fast!
}
\`\`\`

**Performance difference:**
| Method | Time for 100K lines |
|---|---|
| \`endl\` | ~0.5 seconds |
| \`'\\n'\` | ~0.05 seconds |

That's up to a **10x difference**!

In Python, \`print()\` handles newlines automatically:

\`\`\`python
print(i)  # Auto newline, no extra setup needed
\`\`\`

💡 In contests, **always use \`'\\n'\`**! Only use \`endl\` occasionally for debugging.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Fast I/O code output!",
          code: `#include <iostream>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    for (int i = 1; i <= 3; i++) {
        cout << i << '\\n';
    }
    return 0;
}`,
          options: ["1 2 3", "123", "1\n2\n3", "Error"],
          answer: 2,
          explanation: "'\\n' creates a newline! 1, 2, and 3 are each printed on their own line. Same result as endl, but much faster!"
        },
        {
          id: "ch2-template",
          type: "explain",
          title: "⚡ USACO Template — Ready for Competition!",
          content: `Here's the **standard template** used for USACO problems! It combines freopen + Fast I/O.

\`\`\`cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // File I/O (USACO)
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);

    // Write your solution here!
    int n;
    cin >> n;
    // ...
    cout << answer << '\\n';

    return 0;
}
\`\`\`

**USACO file naming convention:**
- Input: \`problemname.in\` (e.g., \`ride.in\`, \`gift1.in\`)
- Output: \`problemname.out\` (e.g., \`ride.out\`, \`gift1.out\`)

**Checklist:**
1. \`ios_base::sync_with_stdio(false)\` + \`cin.tie(NULL)\`
2. \`freopen("problem.in", "r", stdin)\`
3. \`freopen("problem.out", "w", stdout)\`
4. Use \`'\\n'\` (not \`endl\`!)

Memorize this template and you'll save valuable time in USACO contests!

💡 Remember these 4 things and you've mastered **File I/O + Fast I/O**!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ USACO-Style Problem!",
          content: `Let's solve a problem USACO-style!

Read N numbers from a file, double each one, and output the results.

Input (solve.in):
4
3 7 1 5

Output (solve.out):
6
14
2
10

Use both Fast I/O and freopen!`,
          code: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen("solve.in", "r", stdin);
    freopen("solve.out", "w", stdout);

    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cout << x * 2 << '\\n';
    }

    return 0;
}`,
          expectedOutput: `6
14
2
10`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Fast I/O knowledge!",
          content: "Why should you use `'\\n'` instead of `endl`?",
          options: [
            "endl causes a compile error",
            "endl doesn't create a newline",
            "endl flushes the buffer which is slow",
            "endl can't be used with files"
          ],
          answer: 2,
          explanation: "endl does a newline + buffer flush. Flushing every time seriously hurts performance. '\\n' only does a newline, making it much faster!"
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
          title: "ifstream usage!",
          content: `Which code correctly reads data from a file?

\`\`\`cpp
#include <fstream>
// How to open a file and read data?
\`\`\``,
          options: [
            "ofstream fin(\"data.txt\"); fin >> x;",
            "ifstream fin(\"data.txt\"); fin >> x;",
            "fstream fin(\"data.txt\"); fin << x;",
            "iostream fin(\"data.txt\"); fin >> x;"
          ],
          answer: 1,
          explanation: "To read from a file, use ifstream with the >> operator! ofstream is for writing to files."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "freopen advantage!",
          content: "What is the **most appropriate** reason why freopen is widely used in USACO?",
          options: [
            "It's faster than ifstream",
            "It can open multiple files simultaneously",
            "Existing cin/cout code doesn't need to be modified",
            "It automatically closes files"
          ],
          answer: 2,
          explanation: "The biggest advantage of freopen is that you don't have to change any existing cin/cout code! Just add 2 lines and you have file I/O."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "sync_with_stdio!",
          content: "What should you be careful about after using `ios_base::sync_with_stdio(false)`?",
          options: [
            "You can no longer use cout",
            "You must not mix cin and scanf",
            "You can no longer use file I/O",
            "You can only do integer I/O"
          ],
          answer: 1,
          explanation: "sync_with_stdio(false) turns off synchronization between C++ cin/cout and C scanf/printf. Mixing the two after this can cause I/O order issues!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "endl vs '\\n'!",
          content: "When outputting 100,000 numbers, which is the fastest approach?",
          options: [
            "cout << i << endl;",
            "cout << i << '\\n';",
            "printf(\"%d\\n\", i);  // with sync_with_stdio(false)",
            "cout << i << \"\\n\" << flush;"
          ],
          answer: 1,
          explanation: "'\\n' is the fastest because it only adds a newline! endl and flush both flush the buffer which is slow, and using printf after sync_with_stdio(false) can cause problems."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 File I/O & Fast I/O Complete!",
          content: `## 🏆 Lesson 19 Complete! Great job!

Let's review today's key takeaways!

### 📄 File I/O
- **ifstream**: Read from files (\`ifstream fin("file.txt")\`)
- **ofstream**: Write to files (\`ofstream fout("file.txt")\`)
- **freopen**: Redirect cin/cout to files! (Most convenient!)
- **getline**: Read full lines including spaces (watch out for cin.ignore()!)

### ⚡ Fast I/O
- \`ios_base::sync_with_stdio(false)\` — Turn off C sync
- \`cin.tie(NULL)\` — Untie cin from cout
- Use \`'\\n'\` — endl is slow!

### 🏆 USACO Template

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);
    // Solution code...
    return 0;
}
\`\`\`

| Concept | Keyword | Key Point |
|---|---|---|
| File read | \`ifstream\` | Read with >> |
| File write | \`ofstream\` | Write with << |
| Redirect | \`freopen\` | cin/cout unchanged! |
| Fast I/O | \`sync_with_stdio\` | 2-5x faster |
| Newline | \`'\\n'\` | Use instead of endl! |

🚀 **Next lesson** covers CP practical tips! Techniques you can use right away in competitions!`
        }
      ]
    }
  ]
}
