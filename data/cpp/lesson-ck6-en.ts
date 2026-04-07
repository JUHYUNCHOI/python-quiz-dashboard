import type { LessonData } from "../types"

export const cppLessonCk6EnData: LessonData = {
  id: "cpp-ck6",
  title: "🔲 2D Array Practice Problems",
  emoji: "🔲",
  description: "Solve real problems using 2D arrays.",
  chapters: [
    {
      id: "ck6-main",
      title: "2D Array Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck6-intro",
          type: "explain" as const,
          title: "2D Array Practice Problems",
          content: `Practice the core patterns for working with 2D arrays.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck6-p1",
          type: "practice" as const,
          title: "Problem 1: Sum of All Elements",
          content: `Add up every element in a 3×3 grid and print the total.\n\n**Output:** Print the sum as a single number`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            sum += grid[i][j];
        }
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    // Use a nested for loop to add each grid[i][j] to sum

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `45`,
          hint: "Use nested for loops to add grid[i][j] to sum. i: 0~2, j: 0~2",
        },
        {
          id: "ck6-p2",
          type: "practice" as const,
          title: "Problem 2: Sum of Each Row",
          content: `Print the sum of each row in a 3×4 grid, one per line.\n\n**Output:** Print each row's sum on its own line`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    for (int i = 0; i < 3; i++) {
        int sum = 0;
        for (int j = 0; j < 4; j++) {
            sum += grid[i][j];
        }
        cout << sum << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    for (int i = 0; i < 3; i++) {
        int sum = 0;
        // Inner for loop: iterate over columns j and add to sum

        cout << sum << endl;
    }
    return 0;
}`,
          expectedOutput: `10
26
42`,
          hint: "Outer for is rows (i), inner for is columns (j). Reset sum to 0 at the start of each row",
        },
        {
          id: "ck6-p3",
          type: "practice" as const,
          title: "Problem 3: Maximum Value and Its Position",
          content: `Find the largest value in a 3×3 grid and print it along with its row and column.\n\n**Output:** Print "value row column" on one line`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{3,7,2},{9,1,5},{4,8,6}};
    int max_val = grid[0][0];
    int max_r = 0, max_c = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i][j] > max_val) {
                max_val = grid[i][j];
                max_r = i;
                max_c = j;
            }
        }
    }
    cout << max_val << " " << max_r << " " << max_c << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{3,7,2},{9,1,5},{4,8,6}};
    int max_val = grid[0][0];
    int max_r = 0, max_c = 0;
    // Use nested loops: if grid[i][j] > max_val, update max_val, max_r, max_c

    cout << max_val << " " << max_r << " " << max_c << endl;
    return 0;
}`,
          expectedOutput: `9 1 0`,
          hint: "If grid[i][j] > max_val, update max_val, max_r, and max_c all at once",
        },
        {
          id: "ck6-p4",
          type: "practice" as const,
          title: "Problem 4: Main Diagonal Sum",
          content: `Print the sum of the main diagonal (top-left to bottom-right) in a 4×4 grid.\n\n**Output:** The diagonal sum`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += grid[i][i];
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    int sum = 0;
    // Use a single for loop to sum grid[i][i]

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `34`,
          hint: "The main diagonal is grid[i][i]. Use a single for loop to sum grid[i][i]",
        },
        {
          id: "ck6-p5",
          type: "practice" as const,
          title: "Problem 5: Transpose a Matrix",
          content: `Print the transpose of a 3×3 matrix (swap rows and columns).\n\n**Output:** Print the transposed matrix with spaces and newlines`,
          code: `#include <iostream>
using namespace std;

int main() {
    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j > 0) cout << " ";
            cout << a[j][i];
        }
        cout << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    // Outer for i (column index), inner for j (row index)
    // Print a[j][i] to get the transpose

    return 0;
}`,
          expectedOutput: `1 4 7
2 5 8
3 6 9`,
          hint: "The transpose prints a[j][i]. Make the outer loop j and the inner loop i",
        },
        {
          id: "ck6-p6",
          type: "practice" as const,
          title: "Problem 6: Count Elements Greater Than 5",
          content: `Count how many elements in a 3×3 grid are greater than 5.\n\n**Output:** The count as a single number`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,8,3},{6,2,9},{4,7,5}};
    int count = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i][j] > 5) {
                count++;
            }
        }
    }
    cout << count << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,8,3},{6,2,9},{4,7,5}};
    int count = 0;
    // Use nested loops: count++ whenever grid[i][j] > 5

    cout << count << endl;
    return 0;
}`,
          expectedOutput: `4`,
          hint: "Use nested for loops and count++ whenever grid[i][j] > 5",
        },
      ],
    },
  ],
}
