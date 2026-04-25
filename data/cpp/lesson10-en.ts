// ============================================
// C++ Lesson 10: Range-for & auto
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson10EnData: LessonData = {
  id: "cpp-10",
  title: "Range-for & auto",
  emoji: "🔄",
  description: "Iterate easily with for(auto x : vec)!",
  chapters: [
    // ============================================
    // Chapter 1: Range-based for
    // ============================================
    {
      id: "ch1",
      title: "Range-based for",
      emoji: "🔁",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 Range-for: Python-style Loops in C++!",
          component: "cppRangeForBuilder",
          content: `In the last two lessons you picked up two new tools for handling variables: \`int&\` (references) and \`int*\` (pointers). This lesson takes a small breather to focus on **writing for loops more compactly** — and that \`&\` you just learned will pop right back up here too 👀

So far we've been looping over vectors with an index:
\`\`\`cpp
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}
\`\`\`

Honestly, isn't this kind of annoying? You have to keep an eye on \`i\` 's end (\`< nums.size()\`), and every time you grab an element you open and close \`[ ]\`. All we really want is "one element at a time."

In Python you accessed elements directly, no index needed:

\`\`\`python
for x in nums:
    print(x)
\`\`\`

**C++ has the same thing** — it's called **range-based for**:

\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int x : nums) {
    cout << x << " ";
}
\`\`\`

Swap \`in\` for a \`:\` colon and add the type (\`int\`) — that's the only difference. Otherwise it's basically Python.

Now let's see what pieces \`for (int x : nums)\` is actually made of, one at a time 👇`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Loop through the vector, Python style!",
          code: "vector<int> v = {10, 20, 30};\nfor (___ x ___ v) {\n    cout << x << \" \";\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "auto", "let"] },
            { id: 1, answer: ":", options: [":", "in", "of", "<<"] }
          ],
          explanation: "Range-for syntax: for (type variable : container). The colon (:) is like Python's 'in'!"
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Range-for output!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int x : v) {\n        sum += x;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["10", "15", "12", "Error"],
          answer: 1,
          explanation: "1 + 2 + 3 + 4 + 5 = 15! Range-for visits every element, just like Python's for-in."
        },
        {
          id: "ch1-ref",
          type: "explain",
          title: "🔗 Modifying Elements — & Is Back!",
          content: `So far we've only printed \`x\` and added it to sum. So — what if we try to **change** \`x\` itself? Just give it a shot:

\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    x = x * 10;
}
// then print nums…
// {1, 2, 3} 😱
\`\`\`

Wait, what? We clearly multiplied \`x\` by 10, but \`nums\` is unchanged. What went wrong?

…Hold on, **doesn't this feel familiar?** Two lessons ago, in *References & Functions*:

\`\`\`cpp
void tryChange(int x) { x = 99; }       // original unchanged
void change(int& x)   { x = 99; }       // original changes
\`\`\`

When a function parameter was \`int x\`, it was a **copy** — so changing it didn't affect the original. — Wait, so does that mean \`x\` in \`for (int x : nums)\` is also just a copy?

**Yes — exactly.** \`x\` here is a copy of each \`nums\` element, so no matter how many times we do \`x = x * 10\`, the original sits untouched.

Which means the fix is the same too — back then we wrote \`int& x\` to add \`&\`, so **here we just add \`&\` the same way**:

\`\`\`cpp
for (int& x : nums) {      // ← x is now an alias for each nums element (the original itself)
    x = x * 10;
}
// nums is now {10, 20, 30} ✅
\`\`\`

> 💡 One-liner: **\`int x\` = copy, \`int& x\` = original.** The rule is identical for functions and for range-for.

And since \`&\` skips copying, it's also **faster**. The bigger the data, the bigger the difference.

Still feels a bit fuzzy in your head? No worries — on the next page we'll run \`int x\` and \`int& x\` side by side and watch the difference happen with our own eyes 👇`,
        },
        {
          id: "ch1-ref-anim",
          type: "interactive",
          title: "🎬 Copy vs Reference (&) — See the Difference!",
          content: "Run the two snippets you just saw (\`int x\` vs \`int& x\`) for real. Watch with your own eyes whether the original changes — one \`&\` makes the difference!",
          component: "rangeForVisualizer",
        },
        {
          id: "ch1-ref-fb",
          type: "fillblank" as const,
          title: "Modify elements with a reference!",
          content: "Complete the code to add 1 to every element in the vector!",
          code: "vector<int> v = {1, 2, 3};\nfor (int___ x : v) {\n    x += 1;\n}\n// v is now {2, 3, 4}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "%", ""] }
          ],
          explanation: "You need int& x (reference) to modify the original elements! Without &, only the copy changes."
        },
        {
          id: "ch1-ref-pred",
          type: "predict" as const,
          title: "Modify with reference, then print!",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30};
    for (int& x : v) {
        x = x / 10;
    }
    for (int x : v) {
        cout << x << " ";
    }
    return 0;
}`,
          options: ["10 20 30 ", "1 2 3 ", "0 2 3 ", "Error"],
          answer: 1,
          explanation: "int& x modifies the originals: {1, 2, 3}. Second loop prints them!"
        },
        {
          id: "ch1-const-ref",
          type: "explain",
          title: "🔒 Lock the Reference — const int&",
          content: `OK, so for **modifying** elements: \`int& x\`. But what about **just reading** (printing, summing, searching)?

"Couldn't we just use \`int x\`?" — totally fair question. It works. But here's the problem:

> ⚠️ \`int x\` makes a **copy** of every element. With three ints, no big deal. But what if it's a \`vector<string>\` holding a million long strings? Every iteration copies the whole string — painfully slow.

→ So real C++ code uses \`&\` **even when only reading**, just to skip the copy. It's a performance thing.

But the moment you write \`&\`, a new problem appears: now you **can modify** the original. "I said I'd only read it — what if a stray \`x = 0\` slips in?" The compiler won't catch it.

**That's where the lock comes in — \`const\`.** Keep \`&\`'s speed, drop the modification risk.

Remember const from Lesson 3? It was for values like PI that must never change:

\`\`\`cpp
const double PI = 3.14159;
PI = 0;  // ❌ Error! Can't change it
\`\`\`

You can use the same \`const\` in range-for:

\`\`\`cpp
for (const int& x : v) {
    cout << x;  // ✅ Reading is fine
    x = 0;      // ❌ Compile error! Accidental edits prevented
}
\`\`\`

**& = fast (no copy)** + **const = no modification** — both benefits combined.

## So which pattern do you actually use?

| Pattern | When |
|---|---|
| \`for (int& x : v)\` | When you need to **modify** |
| \`for (int x : v)\` | Reading **small types** (\`int\`, \`double\`, …) — totally fine |
| \`for (const int& x : v)\` | Reading **big types** (\`string\`, \`struct\`, …) |

💡 Honest take:
- For tiny types like \`int\`, copying costs basically nothing — \`for (int x : v)\` is perfectly fine and very common in real code. You don't need \`&\` here.
- \`&\` really earns its keep with **heavy types** like \`vector<string>\` or big \`struct\`s, where copying actually slows things down. That's where \`const &\` becomes near-mandatory.
- So the rule of thumb is **type size**: small → just copy; big → \`const &\`.

(In real-world code you'll see \`for (const auto& x : v)\` most often — a safe default that works regardless of type. We'll meet \`auto\` in the next chapter.)`,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Sum with Range-for!",
          content: `Let's get the **\`const int&\` pattern** into your fingers. Sum all elements of \`nums\` into \`sum\` and print it.

> 💡 Since it's \`int\`, \`for (int x : nums)\` would actually work just as well — but we're practicing \`const int&\` here so it's automatic when you hit bigger types.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    // 👇 Use range-for to accumulate into sum


    cout << sum;
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    for (const int& x : nums) {
        sum += x;
    }

    cout << sum;
    return 0;
}`,
          hint: "for (const int& x : nums) { sum += x; } — const int& reads without copying. Take each value into x and accumulate sum += x!",
          expectedOutput: `108`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Range-for basics!",
          content: "To **modify** elements in a range-for loop, what must you add?",
          options: [
            "* before the variable",
            "& after the type",
            "mut keyword",
            "Nothing special needed"
          ],
          answer: 1,
          explanation: "Use & (reference) like for(int& x : vec) to modify the original elements! Without &, you only get a copy."
        }
      ]
    },
    // ============================================
    // Chapter 2: auto keyword
    // ============================================
    {
      id: "ch2",
      title: "auto — Let the Compiler Decide!",
      emoji: "🤖",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🤖 auto: Type Deduction",
          content: `Remember \`for (const auto& x : v)\` from the end of Chapter 1? The \`auto\` inside it is what we're learning now.

In one line: **a keyword that lets the compiler figure out the type so you don't have to write it.**

Up to now you wrote \`int x = 10;\` with the type (\`int\`) spelled out. With \`auto\`, **the compiler peeks at the right-hand value** and picks the type for you:

\`\`\`cpp
auto x = 10;          // compiler: "whole number" → x is int
auto y = 3.14;        // "has a decimal" → double
auto name = string("hello");  // string
auto flag = true;     // bool
\`\`\`

> 💡 One line to remember: \`auto x = value;\` → **x has the same type as that value**.

### ⚠️ Don't confuse it with Python — auto locks the type once

Python lets you do \`x = 10\` then later \`x = "hello"\` (dynamic typing). C++ \`auto\` is different — **once decided, the type is locked for life**:

\`\`\`cpp
auto x = 10;       // x is int (forever)
x = 3.14;          // ⚠️ Stores 3 only (int truncates)
x = "hello";       // ❌ Compile error
\`\`\`

So \`auto\` doesn't mean "**no** type" — it means "**the compiler writes the type for you**." Not as free as Python.`
        },
        {
          id: "ch2-auto-anim",
          type: "interactive",
          title: "🤖 Watching auto Infer Types",
          content: "Press ▶ to see which type the compiler picks for each value!",
          component: "autoTypeVisualizer",
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "What type does auto deduce?",
          content: "Fill in the type each variable is deduced to.",
          code: "auto price = 9.99;     // → ___\nauto count = 5;        // → ___\nauto pass  = true;     // → ___",
          fillBlanks: [
            { id: 0, answer: "double", options: ["double", "int", "float", "string"] },
            { id: 1, answer: "int", options: ["int", "double", "long", "char"] },
            { id: 2, answer: "bool", options: ["bool", "int", "string", "true"] }
          ],
          explanation: "9.99 has a decimal → double. 5 is a whole number → int. true is true/false → bool. auto looks at the right-hand value and takes its type."
        },
        {
          id: "ch2-combo",
          type: "explain",
          title: "🔥 auto + range-for combo!",
          content: `Using auto as your range-for variable means you don't have to spell out the type.

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int x : nums) ...     // explicit type
for (auto x : nums) ...    // auto — compiler infers int
\`\`\`

> 💡 The three patterns from Chapter 1 — \`int x\` (copy) / \`int& x\` (modify) / \`const int& x\` (read big data) — work the exact same way with \`auto\`. Just swap \`int\` for \`auto\`: \`auto x\` / \`auto& x\` / \`const auto& x\`. No new rules to memorize.

For a short type like \`int\`, the two look pretty similar. **But the longer the type gets, the more auto pays off.**

We'll apply this to 2D vectors on the next page — that's where the difference really lands 👇`
        },
        {
          id: "ch2-2d-rangefor",
          type: "explain",
          title: "✨ Where auto really shines — 2D vectors",
          content: `As promised, let's apply this to 2D vectors. This is where auto really earns its keep.

Same input task, three ways:

\`\`\`cpp
vector<vector<int>> grid(3, vector<int>(4, 0));

// ① Index-based (what you've been doing)
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cin >> grid[i][j];

// ② range-for + explicit type — must spell out the inner type too
for (vector<int>& row : grid)
    for (int& val : row)
        cin >> val;

// ③ range-for + auto — clean
for (auto& row : grid)
    for (auto& val : row)
        cin >> val;
\`\`\`

Compare ② and ③. \`auto&\` collapses \`vector<int>&\` (and \`int&\`) into one short keyword. **This is what we meant by "auto shines as types get longer."**

Each \`row\` in \`grid\` is a \`vector<int>\`, and each \`val\` inside is an \`int\` — auto figures it out.

Output (read-only) is the same idea:

\`\`\`cpp
for (const auto& row : grid) {
    for (const auto& val : row)
        cout << val << " ";
    cout << "\\n";
}
\`\`\`

(Read-only, so \`const auto&\` — that pattern from Chapter 1.)

So should we always use range-for + auto in 2D? Actually, no. Let's see the split on the next page 👇`,
        },
        {
          id: "ch2-2d-index-vs-rangefor",
          type: "explain",
          title: "🤔 So for 2D — range-for or indexed?",
          content: `In 2D, **both styles get used.** What decides the natural choice is one thing — **do you need the position (\`i\`, \`j\`)?**

Range-for gives you the value but not the position. So:

- "**Print only the diagonal**" → needs \`grid[i][i]\` → **indexed \`for\` is natural**
- "**Sum of all elements**" → doesn't need positions → **range-for is cleaner**

| Pattern | Position needed? | Natural choice |
|---|---|---|
| Diagonal \`grid[i][i]\` | ✅ | indexed \`for\` |
| Adjacent cell \`grid[i+1][j]\` | ✅ | indexed \`for\` |
| Border check \`i==0\` | ✅ | indexed \`for\` |
| Simple input \`cin >> val\` | ❌ | range-for |
| Total sum/count | ❌ | range-for |

> ℹ️ Even patterns needing position can technically use range-for with an external counter. It just feels awkward, so people rarely do.

### So what about contests like USACO?

Position-handling 2D problems **come up often** in contests (neighbor checks, grid traversal, …), so you'll see indexed \`for\` loops a lot in contest code. (Not every 2D problem is like that — some are just input reading or total sums, where range-for is the more natural choice.)

> 💡 Bottom line: **Need position? Indexed. Don't need it? Range-for.** Contests have lots of position-using problems, which is why indexed shows up frequently there.

Next page — a tricky pitfall when using \`auto\` to make a vector.`,
        },
        {
          id: "ch2-vector-trap",
          type: "explain",
          title: "⚠️ auto can't replace vector<int> itself",
          content: `\`auto\` works great as a loop variable. But **declaring a vector is different**:

\`\`\`cpp
vector<int> v = {1, 2, 3};   // ✅ v is vector<int>
auto v = {1, 2, 3};          // ❌ trap! v is NOT a vector — it's 'initializer_list'
                              //    push_back, size, etc. don't exist on it
\`\`\`

### Why?

\`{1, 2, 3}\` is a "brace-enclosed temporary list" — a separate type called \`initializer_list\`.

- \`vector<int> v = {1, 2, 3}\` works because the vector constructor takes those values and builds a vector.
- \`auto v = {1, 2, 3}\` deduces literally what's there, so v becomes \`initializer_list\`.

### Want auto + vector?

\`\`\`cpp
auto v = vector<int>{1, 2, 3};   // works (you wrote the type anyway)
\`\`\`
But you ended up writing \`vector<int>\` either way, so just \`vector<int> v = {1, 2, 3};\` is shorter.

> 💡 **Bottom line**: short types (\`int\`, \`double\`, \`vector<int>\`) are clearer written explicitly. \`auto\` shines for long types like \`vector<vector<int>>\`.`
        },
        {
          id: "ch2-auto-tradeoff",
          type: "explain",
          title: "⚠️ auto's Top 2 common pitfalls",
          content: `You just saw the \`auto v = {1, 2, 3}\` trap. Beyond that, there are two more spots where \`auto\` commonly trips people up.

### ⭐ 1. Big-data copy trap (most common)

\`auto\` **doesn't pick up references for you.** So receiving big data with plain \`auto\` silently copies the whole thing — slow and memory-heavy.

\`\`\`cpp
vector<int> big(10000);   // big vector

auto copy = big;          // Copies all 10000 — slow + double memory!
auto& ref = big;          // References the original — fast
const auto& cref = big;   // Fast + a promise not to modify
\`\`\`

> 🔑 Even if \`int& r = x;\`, writing \`auto a = r;\` gives you \`a\` as plain \`int\` (a copy). To get a reference you must spell out **\`auto&\`**.

This is why the Chapter 1 patterns (\`int x\` / \`int& x\` / \`const int& x\`) translate directly to \`auto\`. Plain \`auto\` doesn't auto-magically take the cheaper option.

### ⭐ 2. No initializer → compile error

\`auto\` decides the type **by looking at the right side**. If the right side is missing, there's nothing to look at.

\`\`\`cpp
auto x;          // ❌ error — nothing to deduce from
auto x = 0;      // ✅ deduced as int
\`\`\`

\`int x;\` works without an initializer; \`auto x;\` doesn't. That's the whole rule.

Next page — one more occasional pitfall + a bonus.`,
        },
        {
          id: "ch2-auto-pitfalls-more",
          type: "explain",
          title: "📓 One more — readability trap",
          content: `One last \`auto\` trap — it's about whoever has to read your code.

\`\`\`cpp
auto result = calculate();   // Is result int? double? string? Unknown!
int  result = calculate();   // Clearly int at a glance
\`\`\`

\`auto\` is convenient, but the cost is **the type isn't visible at a glance.** When the function's return type isn't obvious, writing the type explicitly is a kindness to your teammate (or future-you).

---

> 💡 Wrap-up: when you're new to C++, **practice writing types explicitly first**. Once you're comfortable, mix in \`auto\` naturally. As long as the three Chapter 1 patterns (\`int x\` / \`int& x\` / \`const int& x\`) are in your head, swapping \`int\` for \`auto\` rarely trips you up.

{collapse:📦 Bonus — number literal differences}
\`\`\`cpp
auto a = 5;       // int (typically up to ~2.1 billion)
auto b = 5L;      // long (typically 64-bit)
auto c = 5LL;     // long long (guaranteed large)
auto d = 5.0;     // double
auto e = 5.0f;    // float (single precision)
\`\`\`
For competitive programming with large numbers, \`int\` overflows past ~2.1 billion. Use \`auto x = 5LL;\` explicitly. Otherwise you don't need to worry about it.`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "auto type deduction!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30};\n    auto sum = 0;\n    for (auto& x : v) {\n        x += 5;\n    }\n    for (auto x : v) {\n        sum += x;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["60", "75", "45", "Error"],
          answer: 1,
          explanation: "First loop uses & so it modifies: {15, 25, 35}. Second loop sums: 15 + 25 + 35 = 75!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ auto + Range-for Power Combo!",
          content: `Double every element of \`nums\`, then print the result with " " between values.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    // 👇 Use auto& to double every element


    // 👇 Use auto to print results (each value followed by " ")


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    for (auto& x : nums) {
        x = x * 2;
    }

    for (auto x : nums) {
        cout << x << " ";
    }

    return 0;
}`,
          hint: "When modifying: for (auto& x : nums) { x *= 2; } — without &, x is a copy so the original won't change. For printing: for (auto x : nums) cout << x << \" \";",
          expectedOutput: `6 14 4 18 10 `
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "auto understanding!",
          content: "What does `auto x = 3.14;` make x?",
          options: [
            "A dynamic type that can change",
            "double, fixed at compile time",
            "string",
            "int (always defaults to int)"
          ],
          answer: 1,
          explanation: "auto deduces double from 3.14 at compile time. The type is fixed — it can't change later!"
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
          title: "Range-for syntax!",
          content: "Which correctly iterates over a `vector<int> v`?",
          options: [
            "for (x in v) { }",
            "for (int x : v) { }",
            "for (int x of v) { }",
            "foreach (int x : v) { }"
          ],
          answer: 1,
          explanation: "C++ range-for uses a colon (:) — for (int x : v). Not 'in' (Python) or 'of' (JavaScript)!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Reference in range-for!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {1, 2, 3};
for (int x : v) {
    x = 0;
}
cout << v[0] << v[1] << v[2];
\`\`\``,
          options: ["000", "123", "100", "Error"],
          answer: 1,
          explanation: "Without &, x is a copy! Changing x doesn't affect v. So v is still {1, 2, 3} and the output is 123."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "auto keyword!",
          content: "Which statement about `auto` is **TRUE**?",
          options: [
            "auto makes variables dynamically typed like Python",
            "auto can only be used with integers",
            "auto deduces the type at compile time and it stays fixed",
            "auto is the same as void"
          ],
          answer: 2,
          explanation: "auto deduces the type at compile time and it's fixed forever. It's NOT dynamic typing — it's type inference!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Best practice!",
          content: "For reading large objects in a range-for loop without copying, which is best?",
          options: [
            "for (auto x : vec)",
            "for (auto& x : vec)",
            "for (const auto& x : vec)",
            "for (int x : vec)"
          ],
          answer: 2,
          explanation: "const auto& avoids copying (fast!) and prevents accidental modification (safe!). It's the go-to for reading."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **Range-based for** — \`for (int x : v)\` skips the index, just like Python.
- ✅ **The three patterns** — \`int x\` (copy) / \`int& x\` (modify) / \`const int& x\` (read big data). Same rule as function parameters.
- ✅ **auto** — the compiler infers the type. But once decided, it's locked (unlike Python).
- ✅ **auto drops in directly** — swap \`int\` for \`auto\` and the three patterns above all still work.
- ✅ **Type size is the deciding factor** — small types (int, double, …) are fine to copy; big types (string, struct, …) almost always want \`const &\`.

| Pattern | Copy? | Modify? | When |
|---|---|---|---|
| \`for (auto x : v)\` | Yes | ❌ | Reading small types |
| \`for (auto& x : v)\` | No | ✅ | Modifying elements |
| \`for (const auto& x : v)\` | No | ❌ | Reading big types |

🚀 **Next lesson (cpp-11): Strings in depth** — \`substr\`, \`find\`, \`replace\` and the rest of \`string\`'s real toolkit. The \`const string&\` pattern shows up everywhere there!`
        }
      ]
    }
  ]
}
