import type { PracticeCluster } from "./types"

export const gridCluster: PracticeCluster = {
  id: "grid",
  title: "2D 그리드",
  emoji: "🔲",
  description: "격자 탐색, 행/열 처리, 대각선, 인접 셀 순회",
  en: { title: "2D Grid", description: "Grid traversal, row/column processing, 2D array patterns" },
  unlockAfter: "cpp-21",
  problems: [
    {
      id: "grid-001",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "쉬움",
      title: "격자 합계",
      description: `N×M 격자가 주어질 때, 모든 원소의 합을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 2D 벡터 선언하고 입력받기

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "45", label: "기본 3×3" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "1×1" },
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "21", label: "2×3" },
      ],
      hints: [
        "vector<vector<int>> grid(n, vector<int>(m)); 로 2D 벡터를 선언하세요.",
        "이중 for 루프로 cin >> grid[i][j] 입력을 받으세요.",
        "sum 변수를 0으로 초기화하고, 모든 grid[i][j]를 더하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    int sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            sum += grid[i][j];
    cout << sum << "\n";
    return 0;
}`,
      solutionExplanation: "이중 for 루프로 격자의 모든 원소를 순회하며 합계를 구합니다. 격자 크기가 N×M이므로 총 N*M번의 덧셈이 수행됩니다.",
      en: {
        title: "Grid Sum",
        description: `Given an N×M grid, output the sum of all elements.`,
        constraints: "1 ≤ N, M ≤ 100, 0 ≤ each element ≤ 100",
        hints: [
          "Use a nested for loop to add all grid[i][j] values.",
          "Initialize a sum variable to 0 and accumulate each cell value.",
        ],
        solutionExplanation: "A nested for loop traverses every element in the grid and accumulates the total. Since the grid is N×M, exactly N*M additions are performed.",
      },
    },
    {
      id: "grid-002",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "쉬움",
      title: "각 행의 합",
      description: `N×M 격자가 주어질 때, 각 행의 합을 한 줄에 하나씩 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 2D 벡터 선언하고 입력받기

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "6\n15\n24", label: "기본" },
        { stdin: "2 2\n1 1\n2 2", expectedOutput: "2\n4", label: "2×2" },
        { stdin: "1 4\n5 10 15 20", expectedOutput: "50", label: "1행" },
      ],
      hints: [
        "i번째 행에 대해 j=0~m-1까지의 합을 구하세요.",
        "바깥 루프: 행 i, 안쪽 루프: 열 j를 순회합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    for (int i = 0; i < n; i++) {
        int rowSum = 0;
        for (int j = 0; j < m; j++) rowSum += grid[i][j];
        cout << rowSum << "\n";
    }
    return 0;
}`,
      solutionExplanation: "각 행 i에 대해 rowSum을 0으로 초기화하고 해당 행의 모든 원소를 더합니다. 행마다 rowSum을 출력합니다.",
      en: {
        title: "Row Sums",
        description: `Given an N×M grid, output the sum of each row on a separate line.`,
        constraints: "1 ≤ N, M ≤ 100, 0 ≤ each element ≤ 100",
        hints: [
          "For each row i, sum elements from j=0 to m-1.",
          "Outer loop: row i, inner loop: column j.",
        ],
        solutionExplanation: "For each row i, initialize rowSum to 0 and add all elements in that row. Print rowSum after each row.",
      },
    },
    {
      id: "grid-003",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "쉬움",
      title: "주대각선 합",
      description: `N×N 정방 격자가 주어질 때, 주대각선(좌상 → 우하) 원소의 합을 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 2D 벡터 선언하고 입력받기

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "15", label: "기본 (1+5+9)" },
        { stdin: "1\n7", expectedOutput: "7", label: "1×1" },
        { stdin: "2\n1 2\n3 4", expectedOutput: "5", label: "2×2 (1+4)" },
      ],
      hints: [
        "주대각선 원소는 행 인덱스와 열 인덱스가 같은 원소입니다: grid[i][i]",
        "i=0~n-1까지 grid[i][i]를 더하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    int sum = 0;
    for (int i = 0; i < n; i++) sum += grid[i][i];
    cout << sum << "\n";
    return 0;
}`,
      solutionExplanation: "주대각선 원소는 grid[0][0], grid[1][1], ..., grid[n-1][n-1]입니다. 행과 열 인덱스가 같으므로 단일 루프로 처리합니다.",
      en: {
        title: "Main Diagonal Sum",
        description: `Given an N×N square grid, output the sum of the main diagonal (top-left to bottom-right).`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ each element ≤ 100",
        hints: [
          "Main diagonal elements are those where row index equals column index: grid[i][i].",
          "Sum grid[i][i] for i = 0 to n-1.",
        ],
        solutionExplanation: "The main diagonal consists of grid[0][0], grid[1][1], ..., grid[n-1][n-1]. Since row and column indices are equal, a single loop handles it.",
      },
    },
    {
      id: "grid-004",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "보통",
      title: "두 대각선 합",
      description: `N×N 정방 격자가 주어질 때, 주대각선과 반대각선의 합에서 중복 원소를 한 번만 세어 출력하세요.
(N이 홀수일 때 중심 원소 grid[N/2][N/2]는 한 번만 셉니다)`,
      constraints: "1 ≤ N ≤ 100 (홀수), -100 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "25", label: "기본 (1+5+9+3+7=25)" },
        { stdin: "1\n5", expectedOutput: "5", label: "1×1" },
        { stdin: "3\n11 2 4\n4 5 6\n10 8 -12", expectedOutput: "18", label: "음수 포함" },
      ],
      hints: [
        "주대각선: grid[i][i], 반대각선: grid[i][n-1-i]",
        "두 대각선을 더한 뒤, 중심 원소 grid[n/2][n/2]는 두 번 더해졌으므로 한 번 뺍니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += grid[i][i];
        sum += grid[i][n - 1 - i];
    }
    sum -= grid[n / 2][n / 2]; // 중심 원소 중복 제거
    cout << sum << "\n";
    return 0;
}`,
      solutionExplanation: "두 대각선을 각각 더하면 중심 원소가 두 번 포함됩니다. N이 홀수일 때 중심 인덱스는 n/2이므로 한 번 빼서 보정합니다.",
      en: {
        title: "Both Diagonals Sum",
        description: `Given an N×N square grid, output the sum of both diagonals, counting overlapping elements only once.
(When N is odd, the center element grid[N/2][N/2] is counted only once.)`,
        constraints: "1 ≤ N ≤ 100 (odd), -100 ≤ each element ≤ 100",
        hints: [
          "Main diagonal: grid[i][i], anti-diagonal: grid[i][n-1-i].",
          "After adding both diagonals, subtract grid[n/2][n/2] once since it was counted twice.",
        ],
        solutionExplanation: "Adding both diagonals causes the center element to be included twice. When N is odd, the center index is n/2, so subtract it once to correct the count.",
      },
    },
    {
      id: "grid-005",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "보통",
      title: "각 열의 최댓값",
      description: `N×M 격자가 주어질 때, 각 열의 최댓값을 공백으로 구분하여 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 8 9", label: "기본" },
        { stdin: "2 3\n3 1 4\n1 5 9", expectedOutput: "3 5 9", label: "혼합" },
        { stdin: "3 2\n-1 -2\n-3 -4\n-5 -6", expectedOutput: "-1 -2", label: "모두 음수" },
      ],
      hints: [
        "j번째 열의 최댓값은 grid[0][j]~grid[n-1][j] 중 최댓값입니다.",
        "INT_MIN으로 초기화하고 i를 순회하면 음수도 안전하게 처리됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    for (int j = 0; j < m; j++) {
        int maxVal = INT_MIN;
        for (int i = 0; i < n; i++)
            if (grid[i][j] > maxVal) maxVal = grid[i][j];
        if (j > 0) cout << ' ';
        cout << maxVal;
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "열 기준 순회: 바깥 루프를 열(j), 안쪽 루프를 행(i)으로 설정합니다. INT_MIN으로 초기화하면 음수 원소도 올바르게 처리됩니다.",
      en: {
        title: "Column Maximums",
        description: `Given an N×M grid, output the maximum value of each column, separated by spaces.`,
        constraints: "1 ≤ N, M ≤ 100, -1000 ≤ each element ≤ 1000",
        hints: [
          "The maximum of column j is the largest among grid[0][j] through grid[n-1][j].",
          "Initialize with INT_MIN and iterate over rows — this handles negative values correctly.",
        ],
        solutionExplanation: "Column-first traversal: set the outer loop to column (j) and the inner loop to row (i). Initializing with INT_MIN ensures negative elements are handled correctly.",
      },
    },
    {
      id: "grid-006",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "보통",
      title: "격자 테두리 합",
      description: `N×M 격자가 주어질 때, 테두리(가장자리)에 있는 원소들의 합을 출력하세요.`,
      constraints: "2 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "40", label: "기본 (5 제외)" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "10", label: "전부 테두리" },
        { stdin: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", expectedOutput: "65", label: "3×4" },
      ],
      hints: [
        "테두리 조건: i==0 또는 i==n-1 또는 j==0 또는 j==m-1",
        "이중 루프에서 테두리 조건을 만족하는 셀만 더하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    int sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (i == 0 || i == n - 1 || j == 0 || j == m - 1)
                sum += grid[i][j];
    cout << sum << "\n";
    return 0;
}`,
      solutionExplanation: "테두리는 첫 행, 마지막 행, 첫 열, 마지막 열입니다. 네 조건 중 하나라도 만족하면 테두리 원소입니다.",
      en: {
        title: "Border Sum",
        description: `Given an N×M grid, output the sum of the border (edge) elements.`,
        constraints: "2 ≤ N, M ≤ 100, 0 ≤ each element ≤ 100",
        hints: [
          "Border condition: i==0, or i==n-1, or j==0, or j==m-1.",
          "In the nested loop, only add cells that satisfy the border condition.",
        ],
        solutionExplanation: "The border consists of the first row, last row, first column, and last column. Any cell satisfying at least one of the four conditions is a border element.",
      },
    },
    {
      id: "grid-007",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "보통",
      title: "격자 회전 (90도)",
      description: `N×N 격자가 주어질 때, 시계 방향으로 90도 회전한 결과를 출력하세요.`,
      constraints: "1 ≤ N ≤ 50, 0 ≤ 각 원소 ≤ 9",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3", label: "기본" },
        { stdin: "2\n1 2\n3 4", expectedOutput: "3 1\n4 2", label: "2×2" },
        { stdin: "1\n5", expectedOutput: "5", label: "1×1" },
      ],
      hints: [
        "시계 방향 90도: result[j][n-1-i] = grid[i][j]",
        "또는: result[i][j] = grid[n-1-j][i]",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> grid(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    vector<vector<int>> result(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            result[j][n - 1 - i] = grid[i][j];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << ' ';
            cout << result[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "시계 방향 90도 회전 공식: 원본 [i][j] → 결과 [j][n-1-i]. 직사각형이면 결과 크기가 M×N으로 바뀌지만, 정방 행렬은 크기가 유지됩니다.",
      en: {
        title: "Grid Rotation (90°)",
        description: `Given an N×N grid, output the result of rotating it 90 degrees clockwise.`,
        constraints: "1 ≤ N ≤ 50, 0 ≤ each element ≤ 9",
        hints: [
          "Clockwise 90°: result[j][n-1-i] = grid[i][j].",
          "Alternatively: result[i][j] = grid[n-1-j][i].",
        ],
        solutionExplanation: "Clockwise 90° rotation formula: original [i][j] → result [j][n-1-i]. For a square matrix the size stays the same; for rectangles the result would be M×N.",
      },
    },
    {
      id: "grid-008",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "보통",
      title: "특정 값 위치 찾기",
      description: `N×M 격자와 찾을 값 K가 주어질 때, K가 있는 모든 위치를 (행, 열) 형식으로 출력하세요.
행과 열은 1-based입니다. 행 오름차순, 같은 행이면 열 오름차순으로 출력하세요.
K가 없으면 \`NOT FOUND\`를 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100, 0 ≤ K ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    // 2D 벡터를 선언하고 입력받아보세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3 5\n1 5 3\n4 5 6\n5 8 9", expectedOutput: "(1, 2)\n(2, 2)\n(3, 1)", label: "기본" },
        { stdin: "2 2 7\n1 2\n3 4", expectedOutput: "NOT FOUND", label: "없는 경우" },
        { stdin: "1 3 0\n0 1 0", expectedOutput: "(1, 1)\n(1, 3)", label: "0 찾기" },
      ],
      hints: [
        "vector<vector<int>> grid(n, vector<int>(m)); 로 2D 벡터를 선언하세요.",
        "이중 for 루프로 cin >> grid[i][j] 입력을 받으세요.",
        "grid[i][j] == k인 위치를 찾아 (i+1, j+1)로 출력하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    bool found = false;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (grid[i][j] == k) {
                cout << "(" << i + 1 << ", " << j + 1 << ")\n";
                found = true;
            }
    if (!found) cout << "NOT FOUND\n";
    return 0;
}`,
      solutionExplanation: "이중 루프를 행 우선으로 순회하면 자동으로 행 오름차순, 열 오름차순이 됩니다. 0-based 인덱스에 1을 더해 1-based로 변환합니다.",
      en: {
        title: "Find Value Positions",
        description: `Given an N×M grid and a search value K, output all positions where K appears in (row, col) format.
Rows and columns are 1-based. Output in ascending row order; for the same row, ascending column order.
If K is not found, output \`NOT FOUND\`.`,
        constraints: "1 ≤ N, M ≤ 100, 0 ≤ each element ≤ 100, 0 ≤ K ≤ 100",
        hints: [
          "Use a nested for loop to find positions where grid[i][j] == k.",
          "Add 1 to the 0-based index to convert to 1-based output.",
        ],
        solutionExplanation: "Row-first traversal of the nested loop naturally produces results in ascending row then column order. Add 1 to each 0-based index for 1-based output.",
      },
    },
    {
      id: "grid-009",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "인접 셀 합",
      description: `N×M 격자가 주어질 때, 각 셀에 대해 상하좌우 인접 셀 값들의 합을 구하여 출력하세요.
격자 밖은 0으로 처리합니다.`,
      constraints: "1 ≤ N, M ≤ 50, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "6 9 8\n13 20 17\n12 21 14", label: "기본" },
        { stdin: "1 1\n5", expectedOutput: "0", label: "1×1" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "5 5\n5 5", label: "2×2" },
      ],
      hints: [
        "방향 배열 int dx[] = {-1,1,0,0}; int dy[] = {0,0,-1,1};를 활용하세요.",
        "범위 체크: 0 <= ni < n && 0 <= nj < m 조건을 만족하는 경우만 더합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int sum = 0;
            for (int d = 0; d < 4; d++) {
                int ni = i + dx[d], nj = j + dy[d];
                if (ni >= 0 && ni < n && nj >= 0 && nj < m)
                    sum += grid[ni][nj];
            }
            if (j > 0) cout << ' ';
            cout << sum;
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "방향 배열 패턴: dx, dy 배열에 4방향 오프셋을 저장하고 반복합니다. 범위 체크로 격자 밖 접근을 방지합니다. 이 패턴은 BFS/DFS에서도 자주 사용됩니다.",
      en: {
        title: "Adjacent Cell Sum",
        description: `Given an N×M grid, for each cell output the sum of its four adjacent neighbors (up, down, left, right).
Cells outside the grid are treated as 0.`,
        constraints: "1 ≤ N, M ≤ 50, 0 ≤ each element ≤ 100",
        hints: [
          "Use direction arrays: int dx[] = {-1,1,0,0}; int dy[] = {0,0,-1,1};",
          "Bounds check: only add neighbors where 0 <= ni < n && 0 <= nj < m.",
        ],
        solutionExplanation: "Direction array pattern: store 4-directional offsets in dx/dy and iterate. Bounds checking prevents out-of-grid access. This pattern is also commonly used in BFS/DFS.",
      },
    },
    {
      id: "grid-010",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "격자 로컬 최댓값 개수",
      description: `N×M 격자가 주어질 때, 상하좌우 4방향 이웃보다 모두 엄격하게 큰 셀의 수를 출력하세요.
격자 가장자리 셀은 격자 밖을 이웃으로 갖지 않으므로, 존재하는 이웃보다만 크면 됩니다.`,
      constraints: "2 ≤ N, M ≤ 50, 1 ≤ 각 원소 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 1\n2 5 2\n1 2 1", expectedOutput: "1", label: "중앙 최댓값" },
        { stdin: "3 3\n5 1 5\n1 1 1\n5 1 5", expectedOutput: "4", label: "모서리 4개" },
        { stdin: "2 2\n4 3\n2 1", expectedOutput: "1", label: "2×2" },
        { stdin: "3 4\n9 2 3 8\n1 7 6 4\n5 3 10 2", expectedOutput: "5", label: "3×4" },
      ],
      hints: [
        "각 셀에서 4방향 이웃을 확인합니다. 이웃이 격자 밖이면 무시합니다.",
        "dx[] = {-1,1,0,0}, dy[] = {0,0,-1,1} 방향 배열로 4방향을 순회하세요.",
        "isLocal 플래그를 true로 시작하고, 존재하는 이웃보다 크지 않으면 false로 설정하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    int count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            bool isLocal = true;
            for (int d = 0; d < 4; d++) {
                int ni = i + dx[d], nj = j + dy[d];
                if (ni >= 0 && ni < n && nj >= 0 && nj < m)
                    if (g[i][j] <= g[ni][nj]) { isLocal = false; break; }
            }
            if (isLocal) count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation: "각 셀에서 4방향 이웃을 확인합니다. 범위 내 이웃이 현재 셀보다 크거나 같으면 로컬 최댓값이 아닙니다. 방향 배열 패턴으로 경계 처리를 단순화합니다.",
      en: {
        title: "Local Maximum Count",
        description: `Given an N×M grid, count cells that are strictly greater than all four adjacent neighbors (up, down, left, right).
Edge cells have no out-of-grid neighbors, so they only need to be greater than their existing neighbors.`,
        constraints: "2 ≤ N, M ≤ 50, 1 ≤ each element ≤ 10000",
        hints: [
          "For each cell, check its 4-directional neighbors. Ignore neighbors outside the grid.",
          "Use direction arrays dx[] = {-1,1,0,0}, dy[] = {0,0,-1,1} to iterate all 4 directions.",
          "Start isLocal as true; set it to false if any existing neighbor is greater than or equal to the cell.",
        ],
        solutionExplanation: "For each cell, check all in-bounds neighbors. If any neighbor is >= the current cell, it is not a local maximum. The direction array pattern simplifies boundary handling.",
      },
    },
    {
      id: "grid-011",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "격자 행/열 0 만들기",
      description: `N×M 격자에서 0이 있는 셀의 같은 행과 열을 모두 0으로 만든 결과를 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 50, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 0 6\n7 8 9", expectedOutput: "1 0 3\n0 0 0\n7 0 9", label: "기본" },
        { stdin: "2 3\n0 2 3\n4 5 0", expectedOutput: "0 0 0\n0 0 0", label: "두 개의 0" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "1 2\n3 4", label: "0 없음" },
      ],
      hints: [
        "먼저 0이 있는 행/열 번호를 모두 수집한 뒤, 해당 행/열 전체를 0으로 설정하세요.",
        "순회 중 바로 0으로 채우면 원래 0과 새로 채운 0을 구분할 수 없습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    vector<bool> zeroRow(n, false), zeroCol(m, false);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (grid[i][j] == 0) { zeroRow[i] = true; zeroCol[j] = true; }
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (zeroRow[i] || zeroCol[j]) grid[i][j] = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j > 0) cout << ' ';
            cout << grid[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "2패스 방법: 1패스에서 0의 위치를 기록, 2패스에서 해당 행/열을 0으로 채웁니다. 한 번에 처리하면 새로 0이 된 셀이 다른 셀에 영향을 주는 문제가 생깁니다.",
      en: {
        title: "Zero Out Rows and Columns",
        description: `Given an N×M grid, set the entire row and column of any cell containing 0 to all zeros, then output the result.`,
        constraints: "1 ≤ N, M ≤ 50, 0 ≤ each element ≤ 100",
        hints: [
          "First collect all row/column indices that contain a 0, then set those rows/columns to 0.",
          "If you zero them out during traversal, you cannot distinguish original zeros from newly added ones.",
        ],
        solutionExplanation: "Two-pass approach: first pass records which rows/columns contain a zero; second pass sets those rows/columns to 0. Doing it in one pass causes newly zeroed cells to incorrectly affect other cells.",
      },
    },
    {
      id: "grid-012",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "나선형 순서 출력",
      description: `N×M 격자가 주어질 때, 외곽에서 안쪽으로 나선형(시계 방향)으로 원소를 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 20, 1 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5", label: "3×3" },
        { stdin: "1 4\n1 2 3 4", expectedOutput: "1 2 3 4", label: "1행" },
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 2 3 6 5 4", label: "2×3" },
      ],
      hints: [
        "top, bottom, left, right 경계를 관리하며 시계 방향으로 순회합니다.",
        "→ 한 행 / ↓ 한 열 / ← 한 행 / ↑ 한 열 순서로 출력 후 경계를 한 칸씩 좁힙니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    int top = 0, bottom = n - 1, left = 0, right = m - 1;
    bool first = true;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) { if (!first) cout << ' '; cout << grid[top][j]; first = false; }
        top++;
        for (int i = top; i <= bottom; i++) { cout << ' ' << grid[i][right]; }
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) { cout << ' ' << grid[bottom][j]; }
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) { cout << ' ' << grid[i][left]; }
            left++;
        }
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "경계값(top/bottom/left/right) 4개를 관리하며 한 레이어씩 나선형으로 탐색합니다. 각 방향 순회 후 해당 경계를 한 칸 좁힙니다.",
      en: {
        title: "Spiral Order",
        description: `Given an N×M grid, print its elements in clockwise spiral order from the outside in.`,
        constraints: "1 ≤ N, M ≤ 20, 1 ≤ each element ≤ 100",
        hints: [
          "Maintain four boundary variables: top, bottom, left, right; traverse clockwise.",
          "Print one row right → one column down → one row left → one column up, then shrink each boundary by one.",
        ],
        solutionExplanation: "Manage four boundaries (top/bottom/left/right) and traverse one layer at a time in spiral order. After traversing each direction, shrink the corresponding boundary by one.",
      },
    },
    {
      id: "grid-013",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "격자 90도 회전",
      description: `N×N 격자와 회전 횟수 K가 주어질 때, 격자를 시계 방향으로 90도 K번 회전한 결과를 출력하세요.`,
      constraints: "1 ≤ N ≤ 50, 0 ≤ K ≤ 3",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<int>> g(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> g[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 1\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3", label: "90도 1회" },
        { stdin: "3 2\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "9 8 7\n6 5 4\n3 2 1", label: "180도" },
        { stdin: "2 0\n1 2\n3 4", expectedOutput: "1 2\n3 4", label: "K=0" },
        { stdin: "2 3\n1 2\n3 4", expectedOutput: "2 4\n1 3", label: "270도" },
      ],
      hints: [
        "시계 방향 90도 1회 회전: result[j][n-1-i] = g[i][j]",
        "K번 회전은 1번 회전을 K번 반복하거나, K%4를 구해 필요한 만큼만 회전하세요.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> rotate90(const vector<vector<int>>& g) {
    int n = g.size();
    vector<vector<int>> r(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            r[j][n-1-i] = g[i][j];
    return r;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<int>> g(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> g[i][j];
    k %= 4;
    for (int t = 0; t < k; t++) g = rotate90(g);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << ' ';
            cout << g[i][j];
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "시계 방향 90도 회전: (i,j) → (j, n-1-i). 회전을 함수로 분리해 K번 적용합니다. K%4로 실제 필요한 회전 수를 구합니다 (4번 = 원래 상태).",
      en: {
        title: "Grid K Rotations",
        description: `Given an N×N grid and a rotation count K, output the grid after rotating it clockwise by 90 degrees K times.`,
        constraints: "1 ≤ N ≤ 50, 0 ≤ K ≤ 3",
        hints: [
          "One clockwise 90° rotation: result[j][n-1-i] = g[i][j].",
          "Repeat the single rotation K times, or use K%4 to find the minimal equivalent rotation.",
        ],
        solutionExplanation: "Clockwise 90°: (i,j) → (j, n-1-i). Isolate the rotation into a function and apply it K times. K%4 gives the effective number of rotations (4 rotations = original).",
      },
    },
    {
      id: "grid-014",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "격자 전치",
      description: `N×M 격자가 주어질 때, 전치 행렬(행과 열을 바꾼 M×N 격자)을 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 4\n2 5\n3 6", label: "2×3 → 3×2" },
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 4 7\n2 5 8\n3 6 9", label: "3×3" },
        { stdin: "1 3\n10 20 30", expectedOutput: "10\n20\n30", label: "1행 → 1열" },
      ],
      hints: [
        "전치 행렬: result[j][i] = grid[i][j]",
        "새 격자의 크기는 M×N입니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    for (int j = 0; j < m; j++) {
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << ' ';
            cout << grid[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "전치: 원본의 j번째 열이 결과의 j번째 행이 됩니다. 바깥 루프를 j(원본 열), 안쪽 루프를 i(원본 행)로 설정하면 별도 배열 없이 출력할 수 있습니다.",
      en: {
        title: "Grid Transpose",
        description: `Given an N×M grid, output its transpose (an M×N grid with rows and columns swapped).`,
        constraints: "1 ≤ N, M ≤ 100, 0 ≤ each element ≤ 100",
        hints: [
          "Transpose formula: result[j][i] = grid[i][j].",
          "The new grid has size M×N.",
        ],
        solutionExplanation: "Transpose: the j-th column of the original becomes the j-th row of the result. Setting the outer loop to j (original column) and inner to i (original row) allows direct output without an extra array.",
      },
    },
    {
      id: "grid-015",
      cluster: "grid",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "격자 테두리 회전",
      description: `N×M 격자가 주어질 때, 가장 바깥 테두리를 시계 방향으로 한 칸 회전한 결과를 출력하세요.`,
      constraints: "2 ≤ N, M ≤ 20, 0 ≤ 각 원소 ≤ 9",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "4 1 2\n7 5 3\n8 9 6", label: "기본" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "3 1\n4 2", label: "2×2" },
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "4 1 2\n5 6 3", label: "2×3" },
      ],
      hints: [
        "테두리 원소를 순서대로 1D 벡터로 추출하고, 시계 방향 회전(마지막을 앞으로)한 뒤 다시 채우세요.",
        "추출 순서: 상단 좌→우, 우측 상→하, 하단 우→좌, 좌측 하→상",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];
    vector<int> border;
    // 추출: 상 / 우 / 하 / 좌
    for (int j = 0; j < m; j++) border.push_back(grid[0][j]);
    for (int i = 1; i < n; i++) border.push_back(grid[i][m-1]);
    for (int j = m-2; j >= 0; j--) border.push_back(grid[n-1][j]);
    for (int i = n-2; i >= 1; i--) border.push_back(grid[i][0]);
    // 시계 방향 한 칸 회전: 마지막 원소를 앞으로
    int last = border.back();
    border.pop_back();
    border.insert(border.begin(), last);
    // 다시 채우기
    int idx = 0;
    for (int j = 0; j < m; j++) grid[0][j] = border[idx++];
    for (int i = 1; i < n; i++) grid[i][m-1] = border[idx++];
    for (int j = m-2; j >= 0; j--) grid[n-1][j] = border[idx++];
    for (int i = n-2; i >= 1; i--) grid[i][0] = border[idx++];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j > 0) cout << ' ';
            cout << grid[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation: "테두리를 1D 벡터로 추출 → 회전 → 다시 채우기 3단계로 처리합니다. 시계 방향 한 칸 회전은 마지막 원소를 맨 앞으로 이동하는 것과 같습니다.",
      en: {
        title: "Border Rotation",
        description: `Given an N×M grid, rotate the outermost border one step clockwise and output the result.`,
        constraints: "2 ≤ N, M ≤ 20, 0 ≤ each element ≤ 9",
        hints: [
          "Extract the border elements in order into a 1D vector, rotate clockwise (move last to front), then place them back.",
          "Extraction order: top row left→right, right column top→bottom, bottom row right→left, left column bottom→top.",
        ],
        solutionExplanation: "Three steps: extract border → rotate → fill back. A clockwise one-step rotation is equivalent to moving the last element to the front of the vector.",
      },
    },
  ],
}
