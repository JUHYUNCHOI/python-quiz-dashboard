import type { PracticeCluster } from "./types"

export const bankGridCluster: PracticeCluster = {
  id: "bank-grid",
  title: "그리드 / 2D",
  emoji: "🗺️",
  description: "격자 위에서 탐색하고, 변환하고, 패턴을 찾는 문제들",
  en: {
    title: "Grid / 2D",
    description: "Search, transform, and find patterns on a 2D grid",
  },
  unlockAfter: "cpp-p3",
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // EASY (bank-grid-001 ~ 006)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-grid-001",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "격자 합계",
      description:
        "N×M 격자의 모든 원소 합을 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "21" },
        { stdin: "1 1\n7", expectedOutput: "7" },
        { stdin: "3 3\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "9" },
      ],
      hints: [
        "이중 for 루프로 모든 칸을 순회하며 누적합을 구해보자.",
        "변수 sum을 0으로 초기화하고 cin으로 읽으면서 바로 더해도 된다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int x;
            cin >> x;
            sum += x;
        }
    }
    cout << sum << endl;
    return 0;
}`,
      solutionExplanation:
        "이중 for 루프로 N×M개의 원소를 입력받으면서 누적합을 구한다. 원소 개수가 최대 10,000개, 각 값이 최대 1,000이므로 int 범위 내에 들어오지만 안전을 위해 long long을 사용한다.",
      en: {
        title: "Grid Sum",
        description: "Output the sum of all elements in an N×M grid.",
        hints: [
          "Use a nested for loop to visit every cell and accumulate the sum.",
          "You can initialize sum to 0 and add each value as you read it with cin.",
        ],
        solutionExplanation:
          "A nested for loop reads all N×M elements while accumulating the total. With up to 10,000 elements each up to 1,000 in magnitude, int would suffice, but long long is used for safety.",
      },
    },

    {
      id: "bank-grid-002",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "각 행의 최댓값",
      description:
        "N×M 격자에서 각 행의 최댓값을 한 줄씩 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, -10000 ≤ 각 원소 ≤ 10000",
      initialCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", expectedOutput: "4\n8\n12" },
        { stdin: "2 2\n5 3\n1 8", expectedOutput: "5\n8" },
        { stdin: "1 3\n3 1 2", expectedOutput: "3" },
      ],
      hints: [
        "행마다 별도의 최댓값 변수를 INT_MIN으로 초기화하고, 그 행의 원소들과 비교해보자.",
        "각 행 처리가 끝난 직후 최댓값을 출력하면 된다.",
      ],
      solutionCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        int maxVal = INT_MIN;
        for (int j = 0; j < m; j++) {
            int x;
            cin >> x;
            if (x > maxVal) maxVal = x;
        }
        cout << maxVal << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "행마다 최댓값 변수를 INT_MIN으로 초기화하고 그 행의 원소를 읽으면서 갱신한다. 행이 끝날 때마다 최댓값을 출력한다.",
      en: {
        title: "Row Maximums",
        description: "For each row in an N×M grid, output the maximum value, one per line.",
        hints: [
          "Initialize a max variable to INT_MIN at the start of each row, then compare with each element.",
          "Print the maximum right after finishing each row.",
        ],
        solutionExplanation:
          "For each row, initialize a max variable to INT_MIN and update it while reading each element. Print the maximum after each row completes.",
      },
    },

    {
      id: "bank-grid-003",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "격자 대칭 확인",
      description:
        "N×N 격자가 주어진다. 이 격자가 주대각선에 대해 대칭(전치행렬과 동일)이면 \"YES\", 아니면 \"NO\"를 출력하라.",
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n2 5 6\n3 6 9", expectedOutput: "YES" },
        { stdin: "2\n1 2\n3 4", expectedOutput: "NO" },
        { stdin: "2\n1 2\n2 1", expectedOutput: "YES" },
      ],
      hints: [
        "대칭 조건은 grid[i][j] == grid[j][i]가 모든 i, j에 대해 성립하는 것이다.",
        "한 쌍이라도 조건을 만족하지 않으면 즉시 NO를 출력하고 종료해도 된다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];

    bool symmetric = true;
    for (int i = 0; i < n && symmetric; i++)
        for (int j = 0; j < n && symmetric; j++)
            if (grid[i][j] != grid[j][i])
                symmetric = false;

    cout << (symmetric ? "YES" : "NO") << endl;
    return 0;
}`,
      solutionExplanation:
        "모든 (i, j) 쌍에 대해 grid[i][j] == grid[j][i]를 확인한다. 하나라도 다르면 NO, 모두 같으면 YES이다.",
      en: {
        title: "Symmetric Grid Check",
        description:
          "Given an N×N grid, output \"YES\" if it is symmetric about the main diagonal (equal to its transpose), otherwise \"NO\".",
        hints: [
          "The symmetry condition is grid[i][j] == grid[j][i] for all i and j.",
          "If any single pair fails, you can immediately output NO and exit.",
        ],
        solutionExplanation:
          "Check grid[i][j] == grid[j][i] for every (i, j) pair. Output NO as soon as any pair differs; output YES if all pairs match.",
      },
    },

    {
      id: "bank-grid-004",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "테두리 합",
      description:
        "N×M 격자에서 테두리(1행, N행, 1열, M열)에 있는 원소들의 합을 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "40" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "10" },
        { stdin: "1 1\n5", expectedOutput: "5" },
      ],
      hints: [
        "테두리는 첫 행(i==0), 마지막 행(i==N-1), 첫 열(j==0), 마지막 열(j==M-1)에 해당하는 칸이다.",
        "이중 루프를 돌면서 해당 조건을 만족하는 칸만 합산하면 된다.",
        "3×3 예시: 5(중앙)를 제외한 8개 원소의 합 = 1+2+3+4+6+7+8+9 = 40",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    long long sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (i == 0 || i == n - 1 || j == 0 || j == m - 1)
                sum += grid[i][j];

    cout << sum << endl;
    return 0;
}`,
      solutionExplanation:
        "이중 루프를 돌면서 테두리 조건(첫/마지막 행 또는 첫/마지막 열)을 만족하는 칸의 값만 누적한다. 2×2 이하에서는 모든 칸이 테두리이다.",
      en: {
        title: "Border Sum",
        description:
          "Output the sum of all elements on the border (row 1, row N, column 1, column M) of an N×M grid.",
        hints: [
          "A border cell satisfies i==0, i==N-1, j==0, or j==M-1.",
          "Use a nested loop and add only cells that meet the border condition.",
          "3×3 example: all 8 border cells sum to 1+2+3+4+6+7+8+9 = 40 (center 5 excluded).",
        ],
        solutionExplanation:
          "Iterate through all cells and accumulate only those that satisfy the border condition (first/last row or first/last column). For grids with N or M equal to 1 or 2, every cell is a border cell.",
      },
    },

    {
      id: "bank-grid-005",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "대각선 합",
      description:
        "N×N 격자의 두 대각선(주대각선과 반대각선)에 속하는 원소의 합을 출력하라. 겹치는 원소(N이 홀수일 때 중앙)는 한 번만 카운트한다.",
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "25" },
        { stdin: "2\n1 2\n3 4", expectedOutput: "10" },
        { stdin: "4\n1 0 0 1\n0 1 1 0\n0 1 1 0\n1 0 0 1", expectedOutput: "8" },
      ],
      hints: [
        "주대각선은 grid[i][i], 반대각선은 grid[i][N-1-i]이다.",
        "N이 홀수이면 중앙 원소 grid[N/2][N/2]는 두 대각선 모두에 속하므로 한 번 빼줘야 한다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int grid[105][105];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];

    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += grid[i][i];
        sum += grid[i][n - 1 - i];
    }
    if (n % 2 == 1)
        sum -= grid[n / 2][n / 2];

    cout << sum << endl;
    return 0;
}`,
      solutionExplanation:
        "주대각선과 반대각선을 각각 순회하며 합산한다. N이 홀수이면 중앙 원소가 두 대각선에 모두 포함되어 중복 합산되므로 한 번 뺀다. 3×3 예: 주대각선 1+5+9=15, 반대각선 3+5+7=15, 중앙 5 중복이므로 15+15-5=25.",
      en: {
        title: "Diagonal Sum",
        description:
          "Output the sum of all elements on both diagonals (main and anti-diagonal) of an N×N grid. Count overlapping elements (center when N is odd) only once.",
        hints: [
          "Main diagonal: grid[i][i], anti-diagonal: grid[i][N-1-i].",
          "When N is odd, the center element grid[N/2][N/2] belongs to both diagonals — subtract it once to avoid double-counting.",
        ],
        solutionExplanation:
          "Sum both diagonals individually. If N is odd, the center element appears in both, so subtract it once. For 3×3: main 1+5+9=15, anti 3+5+7=15, subtract center 5 → 25.",
      },
    },

    {
      id: "bank-grid-006",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "격자에서 특정 값 개수",
      description:
        "N×M 격자에서 값 K가 등장하는 횟수를 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, -1000 ≤ K, 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3 5\n1 2 3\n4 5 6\n5 8 5", expectedOutput: "3" },
        { stdin: "2 2 1\n1 1\n1 1", expectedOutput: "4" },
        { stdin: "2 3 0\n1 2 3\n4 5 6", expectedOutput: "0" },
      ],
      hints: [
        "이중 루프로 모든 원소를 읽으면서 K와 같은지 비교하자.",
        "카운터 변수를 0으로 초기화하고 K와 같을 때마다 1씩 증가시킨다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    int count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int x;
            cin >> x;
            if (x == k) count++;
        }
    }
    cout << count << endl;
    return 0;
}`,
      solutionExplanation:
        "이중 루프로 N×M개의 원소를 읽으면서 K와 같은 경우를 카운트한다. 시간복잡도 O(N×M).",
      en: {
        title: "Count Value in Grid",
        description: "Output how many times value K appears in an N×M grid.",
        hints: [
          "Use a nested loop to read all elements and compare each to K.",
          "Initialize a counter to 0 and increment it whenever you see K.",
        ],
        solutionExplanation:
          "Read all N×M elements in a nested loop and count those equal to K. Time complexity O(N×M).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // MEDIUM (bank-grid-007 ~ 015)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-grid-007",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "격자 90도 회전",
      description:
        "N×M 격자를 시계 방향으로 90도 회전한 결과를 출력하라. 회전 후 격자의 크기는 M×N이 된다.",
      constraints: "1 ≤ N, M ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int grid[105][105];
int rotated[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "4 1\n5 2\n6 3" },
        { stdin: "1 2\n1 2", expectedOutput: "1\n2" },
        { stdin: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3" },
      ],
      hints: [
        "시계 방향 90도 회전: 새 격자의 [j][N-1-i] = 원래 격자의 [i][j]",
        "회전 후 격자 크기는 M행 N열이다. 출력 시 각 행의 원소를 공백으로 구분하라.",
        "새로운 2D 배열 rotated에 값을 채운 뒤 M×N 크기로 출력한다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int grid[105][105];
int rotated[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            rotated[j][n - 1 - i] = grid[i][j];

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << " ";
            cout << rotated[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "시계 방향 90도 회전의 좌표 변환은 rotated[j][N-1-i] = grid[i][j]이다. 2×3 → 3×2: 원래 (0,0)=1은 rotated[0][1]=1, 원래 (1,0)=4는 rotated[0][0]=4가 되어 첫 행이 \"4 1\"이 된다.",
      en: {
        title: "Grid 90° Rotation",
        description:
          "Output the result of rotating an N×M grid 90 degrees clockwise. The rotated grid has dimensions M×N.",
        hints: [
          "Clockwise 90° rotation: new[j][N-1-i] = old[i][j].",
          "The result has M rows and N columns. Separate elements within a row by spaces.",
          "Fill a new 2D array rotated with the transformed values, then print it with M rows and N columns.",
        ],
        solutionExplanation:
          "The coordinate transform for a clockwise 90° rotation is rotated[j][N-1-i] = grid[i][j]. For a 2×3 grid: original (0,0)=1 maps to rotated[0][1], original (1,0)=4 maps to rotated[0][0], so the first row becomes \"4 1\".",
      },
    },

    {
      id: "bank-grid-008",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "지뢰찾기 힌트",
      description:
        "N×M 격자에 지뢰('*')와 빈 칸('.')이 있다. 각 빈 칸을 인접한 지뢰 수(8방향)로 바꿔 출력하라. 지뢰 칸은 '*'를 그대로 유지한다.",
      constraints: "1 ≤ N, M ≤ 100",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n...\n.*.\n...", expectedOutput: "111\n1*1\n111" },
        { stdin: "2 2\n**\n**", expectedOutput: "**\n**" },
        { stdin: "3 3\n*.*\n...\n*.*", expectedOutput: "*2*\n242\n*2*" },
      ],
      hints: [
        "각 빈 칸에 대해 8방향(상하좌우 대각선)을 모두 확인하고, 범위 안에 있는 '*'의 수를 센다.",
        "8방향 오프셋: dx[] = {-1,-1,-1,0,0,1,1,1}, dy[] = {-1,0,1,-1,1,-1,0,1}",
        "지뢰 칸은 결과를 변경하지 않고 그대로 '*'를 출력한다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];

    int dx[] = {-1,-1,-1,0,0,1,1,1};
    int dy[] = {-1,0,1,-1,1,-1,0,1};

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == '*') {
                cout << '*';
            } else {
                int cnt = 0;
                for (int d = 0; d < 8; d++) {
                    int ni = i + dx[d], nj = j + dy[d];
                    if (ni >= 0 && ni < n && nj >= 0 && nj < m && grid[ni][nj] == '*')
                        cnt++;
                }
                cout << cnt;
            }
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "각 빈 칸에서 8방향을 탐색해 인접한 지뢰 수를 카운트한다. 8방향 오프셋 배열을 사용하면 코드가 간결해진다. 범위 체크를 잊지 말 것. 3×3 중앙 예: 8방향 이웃 중 4개가 '*' → 출력 4.",
      en: {
        title: "Minesweeper Hints",
        description:
          "Given an N×M grid containing mines ('*') and empty cells ('.'), replace each empty cell with the count of adjacent mines (8 directions). Keep mine cells as '*'.",
        hints: [
          "For each empty cell, check all 8 neighbors (including diagonals) and count how many are '*'.",
          "8-direction offsets: dx[] = {-1,-1,-1,0,0,1,1,1}, dy[] = {-1,0,1,-1,1,-1,0,1}.",
          "Leave mine cells unchanged — output '*' for them.",
        ],
        solutionExplanation:
          "For each empty cell, scan all 8 directions and count adjacent mines. Using offset arrays keeps the code concise. Always check bounds before accessing a neighbor. Center of 3×3 example: 4 of 8 neighbors are '*' → output 4.",
      },
    },

    {
      id: "bank-grid-009",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "격자 경로 수",
      description:
        "N×M 격자의 (1,1)에서 (N,M)까지 아래 또는 오른쪽으로만 이동할 수 있을 때 가능한 경로의 수를 출력하라. 답이 매우 클 수 있으므로 1,000,000,007로 나눈 나머지를 출력한다.",
      constraints: "1 ≤ N, M ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

const int MOD = 1000000007;
long long dp[1005][1005];

int main() {
    int n, m;
    cin >> n >> m;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "2 2", expectedOutput: "2" },
        { stdin: "3 3", expectedOutput: "6" },
        { stdin: "4 5", expectedOutput: "35" },
      ],
      hints: [
        "(i,j)에 도달하는 방법은 위쪽 (i-1,j)에서 오거나 왼쪽 (i,j-1)에서 오는 것뿐이다.",
        "dp[i][j] = dp[i-1][j] + dp[i][j-1], 경계 조건: 첫 행과 첫 열은 모두 1.",
        "오버플로를 막기 위해 각 덧셈 후 MOD로 나눈 나머지를 저장한다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

const int MOD = 1000000007;
long long dp[1005][1005];

int main() {
    int n, m;
    cin >> n >> m;

    for (int j = 0; j < m; j++) dp[0][j] = 1;
    for (int i = 0; i < n; i++) dp[i][0] = 1;

    for (int i = 1; i < n; i++)
        for (int j = 1; j < m; j++)
            dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % MOD;

    cout << dp[n-1][m-1] << endl;
    return 0;
}`,
      solutionExplanation:
        "dp[i][j]는 (0,0)에서 (i,j)까지의 경로 수이다. 위 또는 왼쪽에서만 올 수 있으므로 dp[i][j] = dp[i-1][j] + dp[i][j-1]. 첫 행/열은 경로가 1개뿐. 2×2: dp[1][1]=dp[0][1]+dp[1][0]=1+1=2. 3×3: dp[2][2]=C(4,2)=6.",
      en: {
        title: "Grid Path Count",
        description:
          "Starting from (1,1), count the number of paths to (N,M) moving only right or down. Output the answer modulo 1,000,000,007.",
        hints: [
          "The only ways to reach (i,j) are from (i-1,j) above or (i,j-1) to the left.",
          "dp[i][j] = dp[i-1][j] + dp[i][j-1]; base case: first row and first column are all 1.",
          "Take mod after each addition to prevent overflow.",
        ],
        solutionExplanation:
          "dp[i][j] = number of paths from (0,0) to (i,j), only moving right or down. First row/column each have exactly 1 path. dp[i][j] = dp[i-1][j] + dp[i][j-1]. For 2×2: 2, for 3×3: C(4,2)=6.",
      },
    },

    {
      id: "bank-grid-010",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "소용돌이 행렬",
      description:
        "N×N 행렬에 1부터 N²까지의 수를 시계 방향 소용돌이 순서로 채워 출력하라.",
      constraints: "1 ≤ N ≤ 20",
      initialCode: `#include <iostream>
using namespace std;

int grid[25][25];

int main() {
    int n;
    cin >> n;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3", expectedOutput: "1 2 3\n8 9 4\n7 6 5" },
        { stdin: "2", expectedOutput: "1 2\n4 3" },
        { stdin: "4", expectedOutput: "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7" },
      ],
      hints: [
        "방향 배열(우/하/좌/상)을 사용해 이동하고, 범위를 벗어나거나 이미 채운 칸에 부딪히면 방향을 바꾼다.",
        "이미 채워진 칸을 기록하기 위해 grid 값이 0이면 아직 안 채운 것으로 판단해도 된다.",
        "1부터 N²까지 순서대로 채워나가면서 현재 방향으로 이동, 막히면 다음 방향(총 4방향 순환)으로 전환한다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int grid[25][25];

int main() {
    int n;
    cin >> n;

    // 우, 하, 좌, 상
    int dr[] = {0, 1, 0, -1};
    int dc[] = {1, 0, -1, 0};

    int r = 0, c = 0, dir = 0;
    for (int num = 1; num <= n * n; num++) {
        grid[r][c] = num;
        int nr = r + dr[dir], nc = c + dc[dir];
        if (nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] != 0) {
            dir = (dir + 1) % 4;
            nr = r + dr[dir];
            nc = c + dc[dir];
        }
        r = nr;
        c = nc;
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << " ";
            cout << grid[i][j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "방향 배열(우/하/좌/상)을 사용해 시계 방향으로 이동한다. 다음 칸이 범위를 벗어나거나 이미 채워진 칸이면 방향을 90도 시계 방향으로 전환한다. 1부터 N²까지 순서대로 채운다.",
      en: {
        title: "Spiral Matrix",
        description: "Fill an N×N matrix with numbers 1 to N² in clockwise spiral order and output it.",
        hints: [
          "Use direction arrays (right/down/left/up) and rotate direction when you hit a boundary or already-filled cell.",
          "Track filled cells by checking if grid[r][c] != 0.",
          "Fill values 1 through N² in order; move forward and rotate direction (4 directions cycling) when blocked.",
        ],
        solutionExplanation:
          "Use direction arrays cycling through right/down/left/up. When the next cell is out of bounds or already filled, rotate direction clockwise (dir = (dir+1) % 4). Fill 1 through N² sequentially.",
      },
    },

    {
      id: "bank-grid-011",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "부분 격자 합",
      description:
        "N×M 격자가 주어지고 Q개의 쿼리 (r1, c1, r2, c2)에 대해 해당 부분 격자의 합을 출력하라. (1-indexed, r1≤r2, c1≤c2)",
      constraints: "1 ≤ N, M ≤ 500, 1 ≤ Q ≤ 10000, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

long long prefix[505][505];

int main() {
    int n, m;
    cin >> n >> m;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n1 2 3\n4 5 6\n7 8 9\n2\n1 1 2 2\n2 2 3 3",
          expectedOutput: "12\n28",
        },
        { stdin: "2 3\n1 2 3\n4 5 6\n1\n1 1 2 3", expectedOutput: "21" },
        { stdin: "3 3\n1 1 1\n1 1 1\n1 1 1\n1\n2 2 2 2", expectedOutput: "1" },
      ],
      hints: [
        "2D 누적합 prefix[i][j]를 구성하면 부분 합 쿼리를 O(1)에 처리할 수 있다.",
        "prefix[i][j] = grid[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]",
        "쿼리 (r1,c1,r2,c2)의 합 = prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]",
      ],
      solutionCode: `#include <iostream>
using namespace std;

long long prefix[505][505];

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            int x; cin >> x;
            prefix[i][j] = x + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }

    int q;
    cin >> q;
    while (q--) {
        int r1, c1, r2, c2;
        cin >> r1 >> c1 >> r2 >> c2;
        long long ans = prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1];
        cout << ans << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "2D 누적합(prefix sum) 기법을 사용한다. prefix[i][j]는 (1,1)부터 (i,j)까지의 합이다. 포함-배제 원리로 O(1) 쿼리가 가능하다. Q가 최대 10,000이므로 O(Q×N×M) 브루트포스는 너무 느리다.",
      en: {
        title: "Subgrid Sum Queries",
        description:
          "Given an N×M grid and Q queries (r1, c1, r2, c2), output the sum of elements in the specified subgrid for each query. (1-indexed)",
        hints: [
          "Build a 2D prefix sum array so each query can be answered in O(1).",
          "prefix[i][j] = grid[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]",
          "Query (r1,c1,r2,c2) = prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]",
        ],
        solutionExplanation:
          "Use 2D prefix sums. prefix[i][j] stores the sum from (1,1) to (i,j). The inclusion-exclusion formula answers each query in O(1). With up to 10,000 queries, a brute-force O(Q×N×M) approach would be too slow.",
      },
    },

    {
      id: "bank-grid-012",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "격자 경로 최댓값",
      description:
        "N×M 격자를 (1,1)에서 (N,M)으로 이동하되 오른쪽 또는 아래로만 이동 가능하다. 경로상 숫자 합의 최댓값을 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <algorithm>
using namespace std;

int grid[105][105];
int dp[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 3 1\n1 5 1\n4 2 1", expectedOutput: "12" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "8" },
        { stdin: "1 4\n1 5 3 2", expectedOutput: "11" },
      ],
      hints: [
        "dp[i][j]를 (0,0)에서 (i,j)까지 올 수 있는 경로 중 숫자 합의 최댓값으로 정의하자.",
        "dp[i][j] = grid[i][j] + max(dp[i-1][j], dp[i][j-1]) (위 또는 왼쪽 중 더 큰 값)",
        "첫 행은 왼쪽에서만, 첫 열은 위에서만 올 수 있으므로 누적합으로 초기화한다.",
      ],
      solutionCode: `#include <iostream>
#include <algorithm>
using namespace std;

int grid[105][105];
int dp[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    dp[0][0] = grid[0][0];
    for (int j = 1; j < m; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    for (int i = 1; i < n; i++) dp[i][0] = dp[i-1][0] + grid[i][0];

    for (int i = 1; i < n; i++)
        for (int j = 1; j < m; j++)
            dp[i][j] = grid[i][j] + max(dp[i-1][j], dp[i][j-1]);

    cout << dp[n-1][m-1] << endl;
    return 0;
}`,
      solutionExplanation:
        "dp[i][j]는 (0,0)에서 (i,j)까지의 최대 경로 합이다. 위 또는 왼쪽 중 더 큰 값에 현재 칸의 값을 더한다. 3×3 예: (0,0)→(0,1)→(1,1)→(1,2)→(2,2): 1→3→5→1→1=11이 아니라 정답은 1+3+5+2+1=12(경로 1,3,5,2,1).",
      en: {
        title: "Maximum Path Sum in Grid",
        description:
          "Moving only right or down from (1,1) to (N,M) in an N×M grid, find the path that maximizes the sum of values. Output that maximum sum.",
        hints: [
          "Define dp[i][j] as the maximum sum achievable on any path from (0,0) to (i,j).",
          "dp[i][j] = grid[i][j] + max(dp[i-1][j], dp[i][j-1]) — take the better of the two possible previous cells.",
          "Initialize first row by accumulating left, first column by accumulating up.",
        ],
        solutionExplanation:
          "dp[i][j] = max path sum to reach (i,j). At each cell, take the better incoming direction (up or left) and add the current cell's value. Answer is dp[N-1][M-1].",
      },
    },

    {
      id: "bank-grid-013",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "각 열의 합과 최댓값",
      description:
        "N×M 격자에서 각 열의 합과 최댓값을 구해 M줄에 출력하라. 각 줄은 \"합 최댓값\" 형식이다.",
      constraints: "1 ≤ N, M ≤ 100, -10000 ≤ 각 원소 ≤ 10000",
      initialCode: `#include <iostream>
#include <climits>
using namespace std;

int grid[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n1 2 3\n4 5 6\n7 8 9",
          expectedOutput: "12 7\n15 8\n18 9",
        },
        {
          stdin: "2 4\n1 3 2 4\n2 1 3 2",
          expectedOutput: "3 2\n4 3\n5 3\n6 4",
        },
        { stdin: "1 3\n5 3 8", expectedOutput: "5 5\n3 3\n8 8" },
      ],
      hints: [
        "j번째 열의 합은 모든 행에서 grid[i][j]를 더한 것이고, 최댓값은 그 열에서 가장 큰 값이다.",
        "외부 루프를 열(j)로, 내부 루프를 행(i)로 설정하면 자연스럽게 각 열을 처리할 수 있다.",
      ],
      solutionCode: `#include <iostream>
#include <climits>
using namespace std;

int grid[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    for (int j = 0; j < m; j++) {
        long long sum = 0;
        int maxVal = INT_MIN;
        for (int i = 0; i < n; i++) {
            sum += grid[i][j];
            if (grid[i][j] > maxVal) maxVal = grid[i][j];
        }
        cout << sum << " " << maxVal << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "외부 루프를 열 인덱스(j)로 설정하고 각 열을 순회하면서 합과 최댓값을 계산한다. 입력 배열을 먼저 전부 읽어두어야 열 단위 접근이 가능하다.",
      en: {
        title: "Column Sums and Maximums",
        description:
          "For each column of an N×M grid, output its sum and maximum value on one line, separated by a space. Output M lines total.",
        hints: [
          "Column j's sum is the total of grid[i][j] for all rows i; its max is the largest value in that column.",
          "Set the outer loop over columns (j) and inner loop over rows (i) to naturally process each column.",
        ],
        solutionExplanation:
          "Iterate columns in the outer loop. For each column j, accumulate sum and track max across all rows i. The entire grid must be read into memory first to allow column-wise access.",
      },
    },

    {
      id: "bank-grid-014",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "최대 정사각형",
      description:
        "0과 1로 이루어진 N×M 격자에서 1로만 채워진 가장 큰 정사각형의 한 변 길이를 출력하라.",
      constraints: "1 ≤ N, M ≤ 100",
      initialCode: `#include <iostream>
#include <algorithm>
using namespace std;

int grid[105][105];
int dp[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "4 5\n1 0 1 1 1\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0",
          expectedOutput: "3",
        },
        { stdin: "3 3\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "3" },
        { stdin: "2 2\n0 1\n1 0", expectedOutput: "1" },
      ],
      hints: [
        "dp[i][j]를 (i,j)를 오른쪽 아래 모서리로 하는 1-정사각형의 최대 변의 길이로 정의하자.",
        "grid[i][j]가 1이면: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1",
        "grid[i][j]가 0이면: dp[i][j] = 0. 전체 dp 중 최댓값이 답이다.",
      ],
      solutionCode: `#include <iostream>
#include <algorithm>
using namespace std;

int grid[105][105];
int dp[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    int ans = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 0) {
                dp[i][j] = 0;
            } else if (i == 0 || j == 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
            }
            ans = max(ans, dp[i][j]);
        }
    }
    cout << ans << endl;
    return 0;
}`,
      solutionExplanation:
        "dp[i][j]는 (i,j)를 우하단 모서리로 하는 순수 1-정사각형의 최대 변 길이이다. 세 방향(위, 왼쪽, 왼쪽 위 대각선)의 dp 최솟값에 1을 더하면 현재 칸을 포함하는 최대 정사각형을 구할 수 있다.",
      en: {
        title: "Largest All-Ones Square",
        description:
          "Given an N×M binary grid (0s and 1s), find the side length of the largest square filled entirely with 1s.",
        hints: [
          "Define dp[i][j] as the side length of the largest all-1 square with its bottom-right corner at (i,j).",
          "If grid[i][j] == 1: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1.",
          "If grid[i][j] == 0: dp[i][j] = 0. The answer is the maximum value in the dp table.",
        ],
        solutionExplanation:
          "dp[i][j] = side length of largest all-1 square with bottom-right corner at (i,j). Taking the minimum of three neighbors (up, left, diagonal) and adding 1 correctly extends the square. The overall maximum is the answer.",
      },
    },

    {
      id: "bank-grid-015",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "행 정렬 격자",
      description:
        "N×M 격자의 각 행을 정렬하라. 홀수 번째 행(1-indexed)은 오름차순, 짝수 번째 행은 내림차순으로 정렬해 출력한다.",
      constraints: "1 ≤ N, M ≤ 100, -10000 ≤ 각 원소 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "3 4\n3 1 4 2\n9 5 8 6\n7 3 2 5",
          expectedOutput: "1 2 3 4\n9 8 6 5\n2 3 5 7",
        },
        { stdin: "2 3\n3 1 2\n6 4 5", expectedOutput: "1 2 3\n6 5 4" },
        { stdin: "1 3\n3 1 2", expectedOutput: "1 2 3" },
      ],
      hints: [
        "각 행을 vector에 읽고, 행 번호(1-indexed)가 홀수인지 짝수인지에 따라 정렬 방향을 결정한다.",
        "내림차순 정렬은 sort(v.begin(), v.end(), greater<int>()) 또는 sort 후 reverse를 사용한다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < n; i++) {
        vector<int> row(m);
        for (int j = 0; j < m; j++) cin >> row[j];

        if ((i + 1) % 2 == 1)
            sort(row.begin(), row.end());
        else
            sort(row.begin(), row.end(), greater<int>());

        for (int j = 0; j < m; j++) {
            if (j > 0) cout << " ";
            cout << row[j];
        }
        cout << "\n";
    }
    return 0;
}`,
      solutionExplanation:
        "행을 vector에 읽은 뒤, 1-indexed 행 번호의 홀/짝에 따라 오름차순 또는 내림차순으로 정렬해 출력한다. 내림차순은 greater<int>() 비교자를 사용한다.",
      en: {
        title: "Row-Sorted Grid",
        description:
          "Sort each row of an N×M grid: odd-numbered rows (1-indexed) in ascending order, even-numbered rows in descending order.",
        hints: [
          "Read each row into a vector, then decide sort direction based on whether the 1-indexed row number is odd or even.",
          "For descending sort use sort(v.begin(), v.end(), greater<int>()).",
        ],
        solutionExplanation:
          "Read each row into a vector, sort it ascending or descending based on the 1-indexed row parity, then print. Use greater<int>() as the comparator for descending order.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // HARD (bank-grid-016 ~ 020)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-grid-016",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "빗물 담기",
      description:
        "N개의 기둥 높이가 주어진다. 비가 내릴 때 기둥들 사이에 고이는 빗물의 총 양을 출력하라.",
      constraints: "1 ≤ N ≤ 10000, 0 ≤ 각 기둥 높이 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "6\n3 0 2 0 4 0", expectedOutput: "7" },
        { stdin: "6\n4 2 0 3 2 5", expectedOutput: "9" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "0" },
      ],
      hints: [
        "각 위치 i에 고이는 물의 높이는 min(왼쪽 최고 기둥, 오른쪽 최고 기둥) - h[i] (음수면 0)이다.",
        "왼쪽 최댓값 배열 left_max[i]와 오른쪽 최댓값 배열 right_max[i]를 미리 계산해두자. (자기 자신 포함)",
        "단조 감소/증가 구간에서는 물이 고이지 않는다. 물이 고이려면 양쪽이 막혀야 한다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    vector<int> left_max(n), right_max(n);
    left_max[0] = h[0];
    for (int i = 1; i < n; i++)
        left_max[i] = max(left_max[i-1], h[i]);
    right_max[n-1] = h[n-1];
    for (int i = n - 2; i >= 0; i--)
        right_max[i] = max(right_max[i+1], h[i]);

    long long total = 0;
    for (int i = 0; i < n; i++)
        total += max(0, min(left_max[i], right_max[i]) - h[i]);

    cout << total << endl;
    return 0;
}`,
      solutionExplanation:
        "각 위치 i에서 고이는 물의 양은 min(i까지 최고 높이, i부터 최고 높이) - h[i]이다. left_max와 right_max 배열을 O(N)으로 미리 구성하고, 각 위치에서 물의 양을 계산해 합산한다. 검증: [3,0,2,0,4,0] → 위치별 물: 0+3+1+3+0+0=7.",
      en: {
        title: "Rainwater Trapping",
        description:
          "Given the heights of N pillars, compute the total amount of rainwater trapped between them.",
        hints: [
          "Water at position i = min(highest pillar to the left, highest to the right) - h[i], clamped to 0.",
          "Precompute left_max[i] (max height from 0 to i) and right_max[i] (max height from i to N-1).",
          "A monotone increasing or decreasing sequence traps no water — both sides must be higher.",
        ],
        solutionExplanation:
          "Water at position i = max(0, min(left_max[i], right_max[i]) - h[i]). Build left_max and right_max in O(N), then sum water at each position. Verification: [3,0,2,0,4,0] → per-position water: 0+3+1+3+0+0 = 7.",
      },
    },

    {
      id: "bank-grid-017",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "격자 섬 탐색",
      description:
        "0과 1로 이루어진 N×M 격자에서 1이 4방향으로 연결된 덩어리(섬)의 수를 출력하라.",
      constraints: "1 ≤ N, M ≤ 100",
      initialCode: `#include <iostream>
#include <stack>
using namespace std;

int grid[105][105];
bool visited[105][105];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        {
          stdin: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
          expectedOutput: "3",
        },
        { stdin: "3 3\n1 0 1\n0 1 0\n1 0 1", expectedOutput: "5" },
        { stdin: "2 2\n0 0\n0 0", expectedOutput: "0" },
      ],
      hints: [
        "방문하지 않은 1-칸을 발견하면 섬 개수를 1 늘리고, 그 섬 전체를 visited 표시한다.",
        "스택을 이용한 flood fill: 시작 칸을 스택에 넣고, 꺼낸 칸의 4방향 이웃 중 미방문 1-칸을 스택에 추가한다.",
        "4방향 오프셋: dr[] = {-1,1,0,0}, dc[] = {0,0,-1,1}",
      ],
      solutionCode: `#include <iostream>
#include <stack>
using namespace std;

int grid[105][105];
bool visited[105][105];

int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    int islands = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) {
                islands++;
                stack<pair<int,int>> stk;
                stk.push({i, j});
                visited[i][j] = true;
                while (!stk.empty()) {
                    auto [r, c] = stk.top(); stk.pop();
                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < m
                            && grid[nr][nc] == 1 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stk.push({nr, nc});
                        }
                    }
                }
            }
        }
    }
    cout << islands << endl;
    return 0;
}`,
      solutionExplanation:
        "방문하지 않은 1-칸을 만날 때마다 섬 카운터를 늘리고 스택 기반 flood fill로 연결된 모든 칸을 visited 처리한다. 스택에서 칸을 꺼낼 때 4방향 미방문 1-칸을 스택에 추가한다. 4×5 예: 세 덩어리(왼쪽 상단 2×2, 중앙 단독, 오른쪽 하단 1×2) = 3.",
      en: {
        title: "Count Islands",
        description:
          "Given an N×M binary grid, count the number of islands — groups of 1s connected in 4 directions.",
        hints: [
          "When you find an unvisited 1-cell, increment the island count and mark the whole island as visited.",
          "Stack-based flood fill: push the starting cell, then repeatedly pop and push unvisited 1-neighbors.",
          "4-direction offsets: dr[] = {-1,1,0,0}, dc[] = {0,0,-1,1}.",
        ],
        solutionExplanation:
          "For every unvisited 1-cell, increment the island count and flood-fill the island using an explicit stack. Pop a cell, check its 4 neighbors, and push any unvisited 1-cells. 4×5 example: three islands (top-left 2×2 block, single center cell, bottom-right pair) = 3.",
      },
    },

    {
      id: "bank-grid-018",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "격자 로봇 시뮬레이션",
      description:
        "N×M 격자에 로봇이 있고 벽('#')과 빈 칸('.')이 있다. 로봇은 (sr, sc)에서 시작해 명령 문자열(U/D/L/R)을 순서대로 따라 이동한다. 벽이나 격자 경계에 부딪히면 그 이동은 무시한다. 최종 위치를 1-indexed로 출력하라.",
      constraints: "1 ≤ N, M ≤ 100, 1 ≤ 명령 수 ≤ 10000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];
    int sr, sc;
    cin >> sr >> sc;
    string cmds;
    cin >> cmds;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n...\n...\n...\n1 1\nRD", expectedOutput: "2 2" },
        { stdin: "3 3\n...\n...\n...\n2 2\nUUUU", expectedOutput: "1 2" },
        { stdin: "3 3\n.#.\n...\n...\n1 1\nR", expectedOutput: "1 1" },
      ],
      hints: [
        "0-indexed로 처리하다가 출력만 1-indexed로 변환하면 편하다 (입력 시 sr--, sc--).",
        "각 명령에 대해 다음 위치를 계산하고, 범위 안이고 벽이 아닐 때만 이동한다.",
        "U: r-1, D: r+1, L: c-1, R: c+1",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];
    int sr, sc;
    cin >> sr >> sc;
    sr--; sc--;  // 0-indexed
    string cmds;
    cin >> cmds;

    int r = sr, c = sc;
    for (char cmd : cmds) {
        int nr = r, nc = c;
        if (cmd == 'U') nr--;
        else if (cmd == 'D') nr++;
        else if (cmd == 'L') nc--;
        else if (cmd == 'R') nc++;

        if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] != '#') {
            r = nr;
            c = nc;
        }
    }
    cout << r + 1 << " " << c + 1 << endl;
    return 0;
}`,
      solutionExplanation:
        "입력을 0-indexed로 변환한 뒤 각 명령에 따라 다음 위치를 계산한다. 다음 위치가 격자 범위 내이고 벽('#')이 아닐 때만 이동한다. 최종 위치를 1-indexed로 변환해 출력한다.",
      en: {
        title: "Robot Grid Simulation",
        description:
          "A robot starts at (sr, sc) on an N×M grid containing walls ('#') and open cells ('.'). Execute commands (U/D/L/R); ignore any move that would go out of bounds or into a wall. Output the final position (1-indexed).",
        hints: [
          "Convert to 0-indexed on input (sr--, sc--) and back to 1-indexed on output.",
          "For each command, compute the next position and move only if it is in-bounds and not a wall.",
          "U: r-1, D: r+1, L: c-1, R: c+1.",
        ],
        solutionExplanation:
          "Convert position to 0-indexed. For each command compute next (nr, nc). Move only if 0 ≤ nr < N, 0 ≤ nc < M, and grid[nr][nc] != '#'. Output final position incremented back to 1-indexed.",
      },
    },

    {
      id: "bank-grid-019",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "격자 보물 찾기",
      description:
        "N×M 격자에 보물('T')과 빈 칸('.')이 있다. (r, c)에서 출발해 맨해튼 거리로 가장 가까운 보물까지의 거리와 그 위치를 출력하라. 보물이 없으면 -1을 출력한다. 가장 가까운 보물이 여럿이면 행 번호가 작은 것, 같으면 열 번호가 작은 것을 출력한다.",
      constraints: "1 ≤ N, M ≤ 100, 시작 위치는 항상 '.'",
      initialCode: `#include <iostream>
#include <string>
#include <climits>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];
    int sr, sc;
    cin >> sr >> sc;

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n...\n.T.\n...\n1 1", expectedOutput: "2 2 2" },
        { stdin: "3 3\n...\n...\n..T\n2 2", expectedOutput: "2 3 3" },
        { stdin: "3 3\n...\n...\n...\n1 1", expectedOutput: "-1" },
      ],
      hints: [
        "모든 칸을 순회하면서 'T'인 칸의 맨해튼 거리 |i-sr| + |j-sc|를 계산하자.",
        "최솟값을 갱신할 때 거리가 같으면 행이 작은 것, 행도 같으면 열이 작은 것을 선택한다.",
        "보물을 하나도 못 찾으면 -1을 출력한다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <climits>
#include <cstdlib>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    string grid[105];
    for (int i = 0; i < n; i++) cin >> grid[i];
    int sr, sc;
    cin >> sr >> sc;
    sr--; sc--;  // 0-indexed

    int bestDist = INT_MAX, bestR = -1, bestC = -1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 'T') {
                int dist = abs(i - sr) + abs(j - sc);
                if (dist < bestDist || (dist == bestDist && (i < bestR || (i == bestR && j < bestC)))) {
                    bestDist = dist;
                    bestR = i;
                    bestC = j;
                }
            }
        }
    }

    if (bestR == -1) {
        cout << -1 << endl;
    } else {
        cout << bestDist << " " << bestR + 1 << " " << bestC + 1 << endl;
    }
    return 0;
}`,
      solutionExplanation:
        "모든 칸을 순회하면서 'T'를 찾고 맨해튼 거리를 계산한다. 더 짧은 거리(또는 같은 거리에서 행/열 우선순위)를 만날 때마다 최적해를 갱신한다. 보물이 없으면 -1을 출력한다.",
      en: {
        title: "Treasure Hunt",
        description:
          "An N×M grid contains treasures ('T') and empty cells ('.'). Starting at (r, c), find the nearest treasure by Manhattan distance and output the distance and its position. If there are ties, prefer the smaller row then smaller column. Output -1 if no treasure exists.",
        hints: [
          "Scan all cells and compute the Manhattan distance |i-sr| + |j-sc| for every 'T' cell.",
          "When updating the best, break ties by preferring smaller row, then smaller column.",
          "Output -1 if no treasure was found.",
        ],
        solutionExplanation:
          "Iterate all cells, compute Manhattan distance to each 'T', and track the minimum with row/column tiebreaking. Output -1 if no treasure found, otherwise distance and 1-indexed position.",
      },
    },

    {
      id: "bank-grid-020",
      cluster: "bank-grid",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "격자 곱 경로",
      description:
        "N×M 격자를 (1,1)에서 (N,M)으로 아래 또는 오른쪽으로만 이동한다. 경로상 숫자의 곱이 가장 큰 경우와 가장 작은 경우를 각각 한 줄씩 출력하라.",
      constraints: "1 ≤ N, M ≤ 15, -10 ≤ 각 원소 ≤ 10",
      initialCode: `#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

int grid[20][20];
long long dpMax[20][20];
long long dpMin[20][20];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    // 여기에 코드를 작성하세요

    return 0;
}`,
      testCases: [
        { stdin: "2 2\n2 3\n-1 4", expectedOutput: "24\n-8" },
        { stdin: "2 2\n1 2\n3 4", expectedOutput: "12\n8" },
        { stdin: "3 1\n2\n3\n-1", expectedOutput: "-6\n-6" },
      ],
      hints: [
        "음수가 있으므로 각 칸마다 그 칸까지의 최대 곱과 최소 곱을 모두 추적해야 한다.",
        "음수 × 음수 = 양수이므로 최솟값과 최댓값이 서로 뒤바뀔 수 있다.",
        "dp[i][j]의 최대/최소를 계산할 때 이전 칸(위, 왼쪽)의 최대·최소 값 모두와 현재 값을 곱해 네 후보 중 max/min을 선택한다.",
      ],
      solutionCode: `#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

int grid[20][20];
long long dpMax[20][20];
long long dpMin[20][20];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    dpMax[0][0] = dpMin[0][0] = grid[0][0];

    for (int j = 1; j < m; j++) {
        dpMax[0][j] = dpMin[0][j] = dpMax[0][j-1] * grid[0][j];
    }
    for (int i = 1; i < n; i++) {
        dpMax[i][0] = dpMin[i][0] = dpMax[i-1][0] * grid[i][0];
    }

    for (int i = 1; i < n; i++) {
        for (int j = 1; j < m; j++) {
            long long g = grid[i][j];
            long long c1 = dpMax[i-1][j] * g;
            long long c2 = dpMin[i-1][j] * g;
            long long c3 = dpMax[i][j-1] * g;
            long long c4 = dpMin[i][j-1] * g;
            dpMax[i][j] = max({c1, c2, c3, c4});
            dpMin[i][j] = min({c1, c2, c3, c4});
        }
    }

    cout << dpMax[n-1][m-1] << "\n" << dpMin[n-1][m-1] << endl;
    return 0;
}`,
      solutionExplanation:
        "음수가 포함되면 최솟값과 최댓값이 뒤바뀔 수 있으므로 각 칸에서 dpMax와 dpMin을 모두 유지한다. 현재 값과 이전 칸의 max/min 네 후보를 계산해 최대·최소를 선택한다. 검증: 2×2 [2,3/-1,4]: 경로 RD: 2*3*4=24, DR: 2*(-1)*4=-8 → max=24, min=-8. 3×1 [2,3,-1]: 유일 경로 2*3*(-1)=-6.",
      en: {
        title: "Maximum and Minimum Product Path",
        description:
          "Moving only right or down from (1,1) to (N,M) in an N×M grid (with possible negative values), find the path with the maximum product and the path with the minimum product. Output max on the first line and min on the second.",
        hints: [
          "Because of negatives, track both the maximum and minimum product at each cell.",
          "Negative × negative = positive, so max and min can swap.",
          "At each cell, compute all four candidates (prev max * g, prev min * g for both up and left), then take max and min.",
        ],
        solutionExplanation:
          "Maintain dpMax and dpMin at every cell to handle sign flips from multiplication. For each cell, compute four candidate products (two incoming directions × two extreme values each) and select the maximum and minimum. Verification: 2×2 [2,3/-1,4]: path RD = 24, path DR = -8 → max 24, min -8.",
      },
    },
  ],
}

export default bankGridCluster
