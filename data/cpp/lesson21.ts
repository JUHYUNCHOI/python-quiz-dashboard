// ============================================
// C++ Lesson 21: 2차원 배열 & 2D vector
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson21Data: LessonData = {
  id: "cpp-21",
  title: "2차원 배열 & 2D vector",
  emoji: "🗺️",
  description: "격자(grid)와 행렬을 C++로! USACO의 핵심 자료구조",
  chapters: [
    // ============================================
    // Chapter 1: 2차원 배열 기초
    // ============================================
    {
      id: "ch1",
      title: "2차원 배열",
      emoji: "📐",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📐 2차원 배열이 뭐야?",
          content: `파이썬에서 **2D 리스트(리스트 안의 리스트)**를 써봤죠?

\`\`\`python
grid = [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]]

print(grid[1][2])  # 6
\`\`\`

C++에서는 **2차원 배열**로 같은 걸 표현해요:

\`\`\`cpp
int grid[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

cout << grid[1][2];  // 6
\`\`\`

선언 방법:
\`\`\`cpp
타입 이름[행 수][열 수];

int map[3][4];     // 3행 4열
double mat[2][2];  // 2행 2열
\`\`\`

**행(row) = 가로줄**, **열(col) = 세로줄**이에요.

| | 열0 | 열1 | 열2 |
|---|---|---|---|
| **행0** | grid[0][0] | grid[0][1] | grid[0][2] |
| **행1** | grid[1][0] | grid[1][1] | grid[1][2] |
| **행2** | grid[2][0] | grid[2][1] | grid[2][2] |

💡 **USACO, 알고리즘 문제**에서 지도(map), 체스판, 미로 등을 2D 배열로 표현해요!`,
        },
        {
          id: "ch1-init",
          type: "explain",
          title: "🔢 선언과 초기화",
          content: `2차원 배열을 선언하는 여러 방법이에요:

\`\`\`cpp
// 방법 1: 선언과 동시에 값 지정
int a[2][3] = {{1, 2, 3}, {4, 5, 6}};

// 방법 2: 전부 0으로 초기화 (중요! 자주 씀)
int b[100][100] = {};

// 방법 3: 부분 초기화 — 나머지는 0
int c[2][3] = {{1, 2}, {4}};
// c = {{1, 2, 0}, {4, 0, 0}}
\`\`\`

⚠️ **초기화 안 하면 쓰레기 값!**
\`\`\`cpp
int d[3][3];        // ❌ 쓰레기 값
int d[3][3] = {};   // ✅ 전부 0
\`\`\`

**USACO에서 자주 쓰는 패턴:**
\`\`\`cpp
// 크기를 상수로 정의해서 쓰기
const int N = 100;
int grid[N][N] = {};  // 100x100 격자, 전부 0으로 초기화
\`\`\`

@핵심: \`int arr[행][열] = {};\` 로 전부 0으로 초기화하는 습관을 들이세요!`,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "2D 배열 접근!",
          code: `#include <iostream>
using namespace std;
int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    cout << grid[1][2];
    return 0;
}`,
          options: ["6", "5", "3", "에러"],
          answer: 0,
          explanation: "grid[1][2]는 1번 행(두 번째 줄)의 2번 열(세 번째 값) → 6이에요. 행과 열 인덱스 모두 0부터 시작하는 것 잊지 마세요!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "3행 4열짜리 정수 배열을 0으로 초기화해봐요!",
          code: "int map[___][___] = {};",
          reviewHint: `2D 배열 선언: \`타입 이름[**행**][**열**] = {};\`

- 행 = 가로 줄 수
- 열 = 세로 줄 수`,
          fillBlanks: [
            { id: 0, answer: "3", options: ["3", "4", "2", "0"] },
            { id: 1, answer: "4", options: ["4", "3", "2", "0"] }
          ],
          explanation: "int map[3][4] — 3행 4열짜리 배열이에요. 행이 먼저, 열이 나중이에요!"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "2D 배열 인덱스!",
          content: "`int arr[3][4]` 에서 접근 가능한 마지막 원소는?",
          options: [
            "arr[3][4]",
            "arr[2][3]",
            "arr[3][3]",
            "arr[2][4]"
          ],
          answer: 1,
          explanation: "배열 인덱스는 0부터 시작해요! 3행 4열이면 행은 0~2, 열은 0~3이에요. 마지막 원소는 arr[2][3]이에요."
        },
      ]
    },
    // ============================================
    // Chapter 2: 이중 for문으로 순회
    // ============================================
    {
      id: "ch2",
      title: "이중 for문 순회",
      emoji: "🔁",
      steps: [
        {
          id: "ch2-visual",
          type: "explain",
          title: "👀 i, j가 어떻게 움직이는지 직접 보기",
          component: "gridLoopVisualizer",
          content: `이중 for문에서 i와 j가 어떤 순서로 바뀌는지 한 단계씩 확인해봐요.

- **바깥 루프 \`i\`** → 행이 바뀔 때 (위→아래)
- **안쪽 루프 \`j\`** → 같은 행에서 열이 바뀔 때 (왼→오른)
- i가 0인 동안 j가 0→1→2 끝까지 가고, 그 다음 i가 1로 넘어가요`,
        },
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔁 2D 배열을 순회하는 법",
          content: `2D 배열은 **이중 for문**으로 순회해요. 파이썬과 구조가 거의 같아요!

\`\`\`python
# 파이썬
grid = [[1,2,3],[4,5,6],[7,8,9]]
for row in grid:
    for val in row:
        print(val, end=" ")
\`\`\`

\`\`\`cpp
// C++
int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
for (int i = 0; i < 3; i++) {       // 행 순회
    for (int j = 0; j < 3; j++) {   // 열 순회
        cout << grid[i][j] << " ";
    }
}
// 출력: 1 2 3 4 5 6 7 8 9
\`\`\`

**패턴 이해:**
- 바깥 루프 \`i\` → **행** (위→아래)
- 안쪽 루프 \`j\` → **열** (왼→오른)
- \`grid[i][j]\` → i행 j열의 값

**줄바꿈 출력:**
\`\`\`cpp
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << grid[i][j] << " ";
    }
    cout << "\\n";  // 행이 끝날 때 줄바꿈
}
// 출력:
// 1 2 3
// 4 5 6
// 7 8 9
\`\`\``,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "합계 구하기!",
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
          explanation: "이중 for문으로 모든 원소를 더해요: 1+2+3+4+5+6 = 21이에요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 대각선 합 구하기!",
          content: `3×3 배열에서 왼쪽 위에서 오른쪽 아래로 이어지는 **주 대각선** 원소들의 합을 구하세요.

**주어진 배열:**
\`\`\`
int arr[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\``,
          starterCode: `#include <iostream>
using namespace std;
int main() {
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int sum = 0;
    // for문으로 대각선 원소를 sum에 누적하세요

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
          hint: "for (int i = 0; i < 3; i++) { sum += arr[i][i]; } — 행 번호와 열 번호가 같으면 대각선이에요!",
          expectedOutput: "15",
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "이중 for문!",
          content: "3행 4열 배열을 전체 순회할 때 `grid[i][j]`가 실행되는 횟수는?",
          options: ["7번", "12번", "9번", "16번"],
          answer: 1,
          explanation: "행(3) × 열(4) = 12번이에요. 바깥 루프가 3번, 안쪽 루프가 매번 4번 → 3 × 4 = 12번 실행해요."
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "대각선 접근!",
          content: "3×3 배열에서 `arr[i][i]`는 무엇을 의미하나요?",
          options: [
            "첫 번째 행의 원소들",
            "모든 원소",
            "주 대각선 원소들 (arr[0][0], arr[1][1], arr[2][2])",
            "마지막 열의 원소들"
          ],
          answer: 2,
          explanation: "i가 같으면 행 번호 = 열 번호 → 주 대각선! arr[0][0], arr[1][1], arr[2][2]가 순서대로 나와요."
        },
      ]
    },
    // ============================================
    // Chapter 3: 2D vector
    // ============================================
    {
      id: "ch3",
      title: "2D vector",
      emoji: "📦",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "📦 2D vector — 크기가 자유로운 2D 배열",
          content: `C-style 2D 배열은 크기가 고정돼요. 입력에 따라 크기가 달라지면? **2D vector**를 써요!

\`\`\`cpp
#include <vector>

// 선언: vector<vector<타입>> 이름(행수, vector<타입>(열수, 초기값));
vector<vector<int>> grid(3, vector<int>(4, 0));
// → 3행 4열, 전부 0으로 초기화
\`\`\`

접근 방법은 2D 배열과 동일해요:
\`\`\`cpp
grid[1][2] = 5;
cout << grid[1][2];  // 5

cout << grid.size();     // 행 수: 3
cout << grid[0].size();  // 열 수: 4
\`\`\`

**입력 크기가 정해질 때까지 기다렸다가 만들기:**
\`\`\`cpp
int rows, cols;
cin >> rows >> cols;
vector<vector<int>> grid(rows, vector<int>(cols, 0));
\`\`\`

| | C-style 2D 배열 | 2D vector |
|---|---|---|
| 크기 | **컴파일 시 고정** | **런타임에 결정** |
| 선언 | \`int arr[3][4];\` | \`vector<vector<int>> v(3, vector<int>(4));\` |
| 접근 | \`arr[i][j]\` | \`v[i][j]\` |
| 행 수 | 직접 관리 | \`v.size()\` |
| 열 수 | 직접 관리 | \`v[0].size()\` |

💡 **USACO**에서는 문제마다 격자 크기가 다르기 때문에 2D vector를 많이 써요!`,
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "2D vector 출력!",
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
          explanation: "grid(3, vector<int>(4, 0))으로 3행 4열 생성. grid.size()=3(행), grid[0].size()=4(열), grid[1][2]=5이에요."
        },
        {
          id: "ch3-cin",
          type: "explain",
          title: "⌨️ 2D 배열을 cin으로 입력받기",
          content: `지금까지 배열에 값을 직접 넣었는데, 실제 USACO 문제는 **입력으로** 값이 들어와요.

이중 for문 + cin으로 격자를 입력받는 패턴이에요:

\`\`\`cpp
int rows = 2, cols = 3;
vector<vector<int>> grid(rows, vector<int>(cols, 0));

for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        cin >> grid[i][j];  // 한 칸씩 입력
    }
}
\`\`\`

**입력이 이렇게 들어오면:**
\`\`\`
1 2 3
4 5 6
\`\`\`

cin은 공백/줄바꿈을 자동으로 건너뛰어서 순서대로 \`grid[0][0]=1, grid[0][1]=2, ..., grid[1][2]=6\`이 채워져요.

**출력도 같은 구조:**
\`\`\`cpp
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        cout << grid[i][j];
        if (j < cols - 1) cout << " ";  // 마지막 열 제외 공백
    }
    cout << "\\n";  // 행 끝마다 줄바꿈
}
\`\`\`

> 💡 USACO 문제의 70% 이상이 첫 줄에 N, M (행, 열 크기)을 주고 다음 줄부터 격자를 입력해요. 이 패턴을 외워두면 문제 절반은 시작부터 우위예요!`,
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ 격자 입력받기!",
          content: `2×3 격자를 입력받아 그대로 출력하세요.

**입력:**
\`\`\`
1 2 3
4 5 6
\`\`\`

**출력:**
\`\`\`
1 2 3
4 5 6
\`\`\``,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> grid(2, vector<int>(3, 0));
    // 이중 for문으로 입력받기

    // 이중 for문으로 출력하기 (각 행 끝에 \\n 추가)

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
          hint: "for (int i = 0; i < 2; i++) for (int j = 0; j < 3; j++) cin >> grid[i][j]; — 출력도 같은 구조예요. 안쪽 for문 끝나고 cout << \"\\n\" 한 번 더!",
          expectedOutput: "1 2 3\n4 5 6",
          stdin: "1 2 3\n4 5 6",
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "2D vector 크기!",
          content: "`vector<vector<int>> v(5, vector<int>(3, 0));` 에서 `v[2].size()`는?",
          options: ["2", "3", "5", "15"],
          answer: 1,
          explanation: "v는 5행 3열이에요. v[2]는 2번째 행(vector<int>(3, 0))이고, 그 size는 3이에요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "행 vs 열!",
          content: "`vector<vector<int>> grid(rows, vector<int>(cols, 0));` 에서 **열의 개수**를 구하는 코드는?",
          options: [
            "grid.size()",
            "grid[0].size()",
            "grid.cols()",
            "cols(grid)"
          ],
          answer: 1,
          explanation: "grid.size()는 행 수, grid[0].size()는 첫 번째 행의 크기 = 열 수예요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 2차원 배열 & 2D vector 정리!

### C-style 2D 배열
\`\`\`cpp
int grid[행][열] = {};        // ← = {} 로 전부 0 초기화! 꼭 쓰세요
grid[i][j]                   // 접근
\`\`\`

### 2D vector (크기가 입력에 따라 달라질 때)
\`\`\`cpp
vector<vector<int>> v(행, vector<int>(열, 0));
v[i][j]          // 접근
v.size()         // 행 수
v[0].size()      // 열 수
\`\`\`

### 이중 for문 순회
\`\`\`cpp
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        // grid[i][j] 처리
    }
    cout << "\\n";  // 행 끝 줄바꿈
}
\`\`\`

### USACO 입력 패턴 (자주 나와요!)
\`\`\`cpp
int n, m;
cin >> n >> m;
vector<vector<int>> grid(n, vector<int>(m, 0));
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        cin >> grid[i][j];
\`\`\`

### 주요 루프 패턴
\`\`\`cpp
// 전체 합계
int sum = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        sum += grid[i][j];

// 주 대각선 (행 번호 = 열 번호)
for (int i = 0; i < n; i++)
    cout << grid[i][i];   // arr[i][i] = 대각선!
\`\`\`

| | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 2D 선언 | \`grid = [[0]*4 for _ in range(3)]\` | \`int grid[3][4] = {};\` |
| 동적 선언 | \`grid = [[0]*m for _ in range(n)]\` | \`vector<vector<int>> v(n, vector<int>(m, 0));\` |
| 접근 | \`grid[i][j]\` | \`grid[i][j]\` |
| 행 수 | \`len(grid)\` | \`v.size()\` |
| 열 수 | \`len(grid[0])\` | \`v[0].size()\` |

🚀 **다음 시간:** USACO를 위한 pair & 정렬!`
        }
      ]
    }
  ]
}
