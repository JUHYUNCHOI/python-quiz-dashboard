// ============================================
// C++ Lesson 24: 🚀 Pre-Algorithm Setup (5 min)
// Last lesson before algorithms — bits/stdc++.h + Fast I/O.
// ============================================
import { LessonData } from '../types'

export const cppLesson24EnData: LessonData = {
  id: "cpp-24",
  title: "🚀 Pre-Algorithm Setup",
  emoji: "🚀",
  description: "5-minute mini-lesson — 3 lines that start every algorithm solution.",
  chapters: [
    {
      id: "ch0",
      title: "Why these 3 lines?",
      emoji: "🎯",
      steps: [
        {
          id: "ch0-intro",
          type: "explain",
          title: "🎯 These 3 lines start almost every algorithm solution",
          content: `After Map & Set, before BFS/DFS/DP, there are **3 lines that appear at the top of nearly every solution code**. 5 minutes to memorize them.

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // ... your solution ...
}
\`\`\`

### What each line does

| Line | Role |
|---|---|
| \`#include <bits/stdc++.h>\` | Imports all standard libraries in one line |
| \`ios::sync_with_stdio(false);\` | Makes cin/cout ~3-5× faster |
| \`cin.tie(nullptr);\` | Removes cin's auto-flush of cout |

> 💡 Schools don't usually teach these — but **Baekjoon, Codeforces, USACO** all start with these 3 lines.

Next pages explain each, then a memorization mini-quiz at the end.`
        }
      ]
    },

    {
      id: "ch1",
      title: "bits/stdc++.h",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 One header line for all standard libraries",
          content: `Normally we import each header:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
// ... easy to forget some
\`\`\`

In contests / PS we save time:

\`\`\`cpp
#include <bits/stdc++.h>
\`\`\`

This one line includes \`<iostream>\`, \`<vector>\`, \`<string>\`, \`<algorithm>\`, \`<map>\`, \`<set>\`, \`<queue>\`, \`<stack>\`, \`<unordered_map>\`, ... everything.

### Downsides?
- Slightly slower compile (fine for contests)
- GCC compiler only (Baekjoon/USACO/Codeforces all use GCC, so OK)
- Not used in production code — explicit headers are the rule there

### Bottom line
- ✅ Algorithms / PS / contests → \`bits/stdc++.h\` one-liner
- ❌ Production code → explicit headers`
        },
        {
          id: "ch1-fb",
          type: "fillblank" as const,
          title: "Fill the blank",
          content: "What header pulls in all standard libraries in one line?",
          code: "#include <___>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    sort(v.begin(), v.end());\n    cout << v[0];\n}",
          fillBlanks: [
            { id: 0, answer: "bits/stdc++.h", options: ["bits/stdc++.h", "stdlib.h", "all.h", "iostream"] }
          ],
          explanation: "`bits/stdc++.h` includes vector, sort, cout — everything. The standard PS / contest opener."
        }
      ]
    },

    {
      id: "ch2",
      title: "Fast I/O",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ Make cin/cout ~3-5× faster",
          content: `C++'s \`cin\` / \`cout\` are safety-first by default → **slow**. Fine usually, but algorithm problems have **hundreds of thousands** of input lines, where this slowness piles up into **TLE (Time Limit Exceeded)**.

Fix: two lines at the top of main.

\`\`\`cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // ... use cin/cout normally ...
}
\`\`\`

### What each line does

| Code | Meaning | Effect |
|---|---|---|
| \`ios::sync_with_stdio(false);\` | Stop syncing with C's \`scanf/printf\` | cin/cout ~3-5× faster |
| \`cin.tie(nullptr);\` | Stop cin from auto-flushing cout | No flush cost before each input |

> 🐍 Python's \`input = sys.stdin.readline\` does the exact same thing — "default I/O is safe but slow, switch to fast mode".

### One caveat

\`endl\` flushes every time → slow. Use \`"\\n"\` instead for fast output:

\`\`\`cpp
cout << answer << endl;   // ❌ slow
cout << answer << "\\n";   // ✅ fast
\`\`\``
        },
        {
          id: "ch2-pred",
          type: "predict" as const,
          title: "Which one is the Fast I/O setup?",
          code: `// Look at the options and pick the right one`,
          options: [
            "ios::sync(false);  cin.untie();",
            "ios::sync_with_stdio(false);  cin.tie(nullptr);",
            "stdin::fast = true;  stdout::fast = true;",
            "fast_io();  no_flush();"
          ],
          answer: 1,
          explanation: "`ios::sync_with_stdio(false);` + `cin.tie(nullptr);` — the only real two lines. Memorize them exactly."
        }
      ]
    },

    {
      id: "ch3",
      title: "Combined Template",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-template",
          type: "explain",
          title: "🎯 The template to memorize",
          content: `Combine the chapters → **algorithm solution starter template**:

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Solution starts here
    int n;
    cin >> n;
    // ...

    return 0;
}
\`\`\`

### Memorize these 5 lines and

- Algorithm / contest solutions always start the same way → time saved
- No TLE debugging from missing Fast I/O
- No "why is this here?" thinking — **just paste it**

> 💡 Look at any Baekjoon / Codeforces / USACO solution — almost all start with this. You'll start seeing it everywhere.

Next page: type it yourself.`
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ Type the template yourself",
          content: `**Mission**: use the full template above. **Read N, output N+1**.

\`\`\`
Input: 5
Output: 6
\`\`\`

> 💡 Header + namespace + Fast I/O 2 lines + cin/cout`,
          starterCode: `// Type the template yourself
// 1. #include <bits/stdc++.h>
// 2. using namespace std;
// 3. int main() {
// 4.     Fast I/O two lines
// 5.     N input → N+1 output
// 6.     return 0;
// 7. }
`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    cout << n + 1 << "\\n";

    return 0;
}`,
          hint: "ios::sync_with_stdio(false); / cin.tie(nullptr);",
          expectedOutput: `6`,
          stdin: "5"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Done! Ready for algorithms",
          content: `You're ready for algorithms (BFS/DFS, DP, etc.).

### The 3 lines to remember

\`\`\`cpp
#include <bits/stdc++.h>
ios::sync_with_stdio(false);
cin.tie(nullptr);
\`\`\`

### When to revisit?
- TLE? → check this template is at the top
- New solution? → always start with this template

### What's next?
- 🏆 **USACO Mock (cpp-p3)** — apply everything
- 💪 **Coding Bank** — 100 problems with STL only, no algorithms
- 🧠 **Algorithm Lab** — start algorithms (BFS/DFS, DP, ...)

> Reference lessons (cpp-19, cpp-20) are there when needed. File I/O? cpp-19. Bitmask / typedef detail? cpp-20.`
        }
      ]
    }
  ]
}
