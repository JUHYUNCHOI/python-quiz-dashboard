// ============================================
// C++ Lesson 21: 2D Arrays & 2D Vectors (English)
// ============================================
import { LessonData } from '../types'

export const cppLesson21EnData: LessonData = {
  id: "cpp-21",
  title: "2D Arrays & 2D Vectors",
  emoji: "🗺️",
  description: "Grids and matrices in C++! Essential for USACO",
  chapters: [
    {
      id: "ch1",
      title: "2D Arrays",
      emoji: "📐",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📐 What is a 2D Array?",
          content: `You've used **2D lists (lists of lists)** in Python, right?

\`\`\`python
grid = [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]]

print(grid[1][2])  # 6
\`\`\`

In C++, use a **2D array** to express the same thing:

\`\`\`cpp
int grid[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

cout << grid[1][2];  // 6
\`\`\`

Declaration syntax:
\`\`\`cpp
type name[rows][cols];

int map[3][4];     // 3 rows, 4 cols
double mat[2][2];  // 2 rows, 2 cols
\`\`\`

**rows = horizontal lines**, **cols = vertical lines**.

| | col 0 | col 1 | col 2 |
|---|---|---|---|
| **row 0** | grid[0][0] | grid[0][1] | grid[0][2] |
| **row 1** | grid[1][0] | grid[1][1] | grid[1][2] |
| **row 2** | grid[2][0] | grid[2][1] | grid[2][2] |

💡 In **USACO and algorithm problems**, maps, chessboards, and mazes are represented as 2D arrays!`,
        },
        {
          id: "ch1-init",
          type: "explain",
          title: "🔢 Declaration and Initialization",
          content: `Several ways to declare a 2D array:

\`\`\`cpp
// Method 1: Declare with values
int a[2][3] = {{1, 2, 3}, {4, 5, 6}};

// Method 2: Initialize all to 0 (common pattern!)
int b[100][100] = {};

// Method 3: Partial init — rest is 0
int c[2][3] = {{1, 2}, {4}};
// c = {{1, 2, 0}, {4, 0, 0}}
\`\`\`

⚠️ **Without initialization — garbage values!**
\`\`\`cpp
int d[3][3];        // ❌ garbage values
int d[3][3] = {};   // ✅ all zeros
\`\`\`

**Common USACO pattern:**
\`\`\`cpp
const int N = 100;
int grid[N][N] = {};  // 100×100 grid, all zeros
\`\`\`

@Key: Use \`int arr[rows][cols] = {};\` to initialize everything to 0!`,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "2D Array Access!",
          code: `#include <iostream>
using namespace std;
int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    cout << grid[1][2];
    return 0;
}`,
          options: ["6", "5", "3", "Error"],
          answer: 0,
          explanation: "grid[1][2] is row 1 (second row), column 2 (third value) → 6. Remember: both row and column indices start at 0!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the Blanks",
          content: "Declare a 3-row, 4-column integer array initialized to zero!",
          code: "int map[___][___] = {};",
          reviewHint: `2D array declaration: \`type name[**rows**][**cols**] = {};\`

- rows = number of horizontal lines
- cols = number of vertical lines`,
          fillBlanks: [
            { id: 0, answer: "3", options: ["3", "4", "2", "0"] },
            { id: 1, answer: "4", options: ["4", "3", "2", "0"] }
          ],
          explanation: "int map[3][4] — 3 rows, 4 columns. Rows come first, then columns!"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "2D Array Index!",
          content: "For `int arr[3][4]`, which of the following causes an **out-of-bounds** error?",
          options: [
            "arr[2][3]",
            "arr[0][0]",
            "arr[3][0]",
            "arr[1][3]"
          ],
          answer: 2,
          explanation: "`int arr[3][4]` has rows 0–2 and columns 0–3. `arr[3][0]` uses row index 3, which doesn't exist — that's out of bounds! The valid row range is 0 to 2 (3 rows total)."
        },
      ]
    },
    {
      id: "ch2",
      title: "Nested Loop Traversal",
      emoji: "🔁",
      steps: [
        {
          id: "ch2-visual",
          type: "explain",
          title: "👀 See How i and j Move",
          component: "gridLoopVisualizer",
          content: `Watch how i and j move step by step in a nested for loop.

- **Outer loop** \`i\` → row changes (top to bottom)
- **Inner loop** \`j\` → column changes within the same row (left to right)
- While i is 0, j goes 0→1→2 all the way, then i moves to 1`,
        },
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔁 How to Traverse a 2D Array",
          content: `Use **nested for loops** to traverse a 2D array. The structure is nearly identical to Python!

\`\`\`python
# Python
grid = [[1,2,3],[4,5,6],[7,8,9]]
for row in grid:
    for val in row:
        print(val, end=" ")
\`\`\`

\`\`\`cpp
// C++
int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
for (int i = 0; i < 3; i++) {       // rows
    for (int j = 0; j < 3; j++) {   // cols
        cout << grid[i][j] << " ";
    }
}
// Output: 1 2 3 4 5 6 7 8 9
\`\`\`

**Pattern:**
- Outer loop \`i\` → **rows** (top to bottom)
- Inner loop \`j\` → **cols** (left to right)
- \`grid[i][j]\` → value at row i, col j

**With line breaks:**
\`\`\`cpp
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << grid[i][j] << " ";
    }
    cout << "\\n";  // newline after each row
}
\`\`\``,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Sum of All Elements!",
          code: `#include <iostream>
using namespace std;
int main() {
    int grid[2][3] = {{1,2,3},{4,5,6}};
    int sum = 0;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            sum += grid[i][j];
    cout << sum;
    return 0;
}`,
          options: ["21", "15", "6", "12"],
          answer: 0,
          explanation: "The nested loop visits every element: 1+2+3+4+5+6 = 21."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Diagonal Sum!",
          content: `Print the sum of **main diagonal** elements in a 3×3 array (where row index = column index).`,
          starterCode: `#include <iostream>
using namespace std;
int main() {
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int sum = 0;
    // Loop and accumulate the diagonal elements

    cout << sum;
    return 0;
}`,
          code: `#include <iostream>
using namespace std;
int main() {
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += arr[i][i];
    }
    cout << sum;
    return 0;
}`,
          hint: "for (int i = 0; i < 3; i++) { sum += arr[i][i]; } — when row index equals column index, that's the diagonal!",
          expectedOutput: "15",
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Nested Loop Count!",
          content: "How many times does `grid[i][j]` execute when traversing a 3-row, 4-column array?",
          options: ["7 times", "12 times", "9 times", "16 times"],
          answer: 1,
          explanation: "Rows (3) × Cols (4) = 12. The outer loop runs 3 times, the inner loop runs 4 times each → 3 × 4 = 12 total."
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "Diagonal Access!",
          content: "In a 3×3 array, what does `arr[i][i]` represent?",
          options: [
            "Elements in the first row",
            "All elements",
            "Main diagonal elements (arr[0][0], arr[1][1], arr[2][2])",
            "Elements in the last column"
          ],
          answer: 2,
          explanation: "When row index equals column index → main diagonal! arr[0][0], arr[1][1], arr[2][2] in order."
        },
      ]
    },
    {
      id: "ch3",
      title: "2D Vectors",
      emoji: "📦",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "📦 2D Vector — Dynamic 2D Array",
          content: `C-style 2D arrays have a fixed size. When the size changes with input, use a **2D vector**!

\`\`\`cpp
#include <vector>

// vector<vector<type>> name(rows, vector<type>(cols, initial));
vector<vector<int>> grid(3, vector<int>(4, 0));
// → 3 rows, 4 cols, all zeros
\`\`\`

Access works the same as a 2D array:
\`\`\`cpp
grid[1][2] = 5;
cout << grid[1][2];  // 5

cout << grid.size();     // row count: 3
cout << grid[0].size();  // col count: 4
\`\`\`

**Creating after reading input size:**
\`\`\`cpp
int rows, cols;
cin >> rows >> cols;
vector<vector<int>> grid(rows, vector<int>(cols, 0));
\`\`\`

| | C-style 2D Array | 2D Vector |
|---|---|---|
| Size | **Fixed at compile time** | **Set at runtime** |
| Declaration | \`int arr[3][4];\` | \`vector<vector<int>> v(3, vector<int>(4));\` |
| Access | \`arr[i][j]\` | \`v[i][j]\` |
| Row count | manage yourself | \`v.size()\` |
| Col count | manage yourself | \`v[0].size()\` |

💡 In **USACO**, grid sizes vary per problem, so 2D vectors are commonly used!`,
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "2D Vector Output!",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> grid(3, vector<int>(4, 0));
    grid[1][2] = 5;
    cout << grid.size() << " " << grid[0].size() << " " << grid[1][2];
    return 0;
}`,
          options: ["3 4 5", "3 4 0", "4 3 5", "3 3 5"],
          answer: 0,
          explanation: "`grid(3, vector<int>(4, 0))` creates 3 rows and 4 cols filled with 0. `grid[1][2] = 5` sets one cell. `grid.size()` = 3 (rows), `grid[0].size()` = 4 (cols), `grid[1][2]` = 5."
        },
        {
          id: "ch3-cin",
          type: "explain",
          title: "⌨️ Reading a 2D Array with cin",
          content: `So far we've hardcoded values into arrays. In real USACO problems, **values come from input**.

Here's the pattern for reading a grid with nested loops + cin:

\`\`\`cpp
int rows = 2, cols = 3;
vector<vector<int>> grid(rows, vector<int>(cols, 0));

for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        cin >> grid[i][j];  // fill one cell at a time
    }
}
\`\`\`

**If the input looks like this:**
\`\`\`
1 2 3
4 5 6
\`\`\`

cin automatically skips spaces and newlines, filling slots in order: \`grid[0][0]=1, grid[0][1]=2, ..., grid[1][2]=6\`.

**Printing follows the same structure:**
\`\`\`cpp
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        cout << grid[i][j];
        if (j < cols - 1) cout << " ";  // no space after last column
    }
    cout << "\\n";  // newline after each row
}
\`\`\`

> 💡 Over 70% of USACO problems give N, M (rows, cols) on the first line, then the grid. Memorize this pattern and you're already ahead!`,
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ Read and Print a Grid!",
          content: `Read a 2×3 grid and print it back row by row.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> grid(2, vector<int>(3, 0));
    // Read input with nested for loops

    // Print output (add "\\n" after each row)

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> grid(2, vector<int>(3, 0));
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            cin >> grid[i][j];
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << grid[i][j];
            if (j < 2) cout << " ";
        }
        cout << "\n";
    }
    return 0;
}`,
          hint: "for (int i = 0; i < 2; i++) for (int j = 0; j < 3; j++) cin >> grid[i][j]; — same structure for output. Add cout << \"\\n\" after the inner loop ends!",
          expectedOutput: "1 2 3\n4 5 6",
          stdin: "1 2 3\n4 5 6",
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "2D Vector Size!",
          content: "For `vector<vector<int>> v(5, vector<int>(3, 0));`, what is `v[2].size()`?",
          options: ["2", "3", "5", "15"],
          answer: 1,
          explanation: "v has 5 rows and 3 cols. v[2] is the 3rd row (vector<int>(3, 0)), so its size is 3."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Rows vs Cols!",
          content: "For `vector<vector<int>> grid(rows, vector<int>(cols, 0));`, which code gives the **number of columns**?",
          options: [
            "grid.size()",
            "grid[0].size()",
            "grid.cols()",
            "cols(grid)"
          ],
          answer: 1,
          explanation: "grid.size() gives row count, grid[0].size() gives the size of the first row = column count."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ 2D Arrays & 2D Vectors Summary!

### C-style 2D Array
\`\`\`cpp
int grid[rows][cols] = {};   // ← = {} to zero-initialize! Always do this
grid[i][j]                   // access
\`\`\`

### 2D Vector (when size depends on input)
\`\`\`cpp
vector<vector<int>> v(rows, vector<int>(cols, 0));
v[i][j]          // access
v.size()         // row count
v[0].size()      // col count
\`\`\`

### Nested Loop Traversal
\`\`\`cpp
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        // process grid[i][j]
    }
    cout << "\\n";  // newline after each row
}
\`\`\`

### USACO Input Pattern (comes up constantly!)
\`\`\`cpp
int n, m;
cin >> n >> m;
vector<vector<int>> grid(n, vector<int>(m, 0));
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        cin >> grid[i][j];
\`\`\`

### Key Loop Patterns
\`\`\`cpp
// Sum of all elements
int sum = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        sum += grid[i][j];

// Main diagonal (row index == col index)
for (int i = 0; i < n; i++)
    cout << grid[i][i];   // grid[i][i] = diagonal!
\`\`\`

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| 2D declaration | \`grid = [[0]*4 for _ in range(3)]\` | \`int grid[3][4] = {};\` |
| Dynamic declaration | \`grid = [[0]*m for _ in range(n)]\` | \`vector<vector<int>> v(n, vector<int>(m, 0));\` |
| Access | \`grid[i][j]\` | \`grid[i][j]\` |
| Row count | \`len(grid)\` | \`v.size()\` |
| Col count | \`len(grid[0])\` | \`v[0].size()\` |

🚀 **Next:** pair & Sorting for USACO!`
        }
      ]
    }
  ]
}
