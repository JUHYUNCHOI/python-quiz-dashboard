import type { PracticeCluster } from "./types"

/**
 * "직접 선언하기" 클러스터
 * vector<vector<int>>, pair, vector<pair<int,int>> 등 STL 컨테이너를
 * 손으로 직접 써서 선언·초기화·입출력하는 단계별 연습.
 * unlockAfter: cpp-15 (pair & tuple 레슨)
 */
export const constructsCluster: PracticeCluster = {
  id: "constructs",
  title: "STL 직접 선언",
  emoji: "🧱",
  description: "vector, pair, 2D vector를 손으로 직접 선언·초기화·입출력",
  unlockAfter: "cpp-15",
  en: {
    title: "STL Construction",
    description: "Declare and initialize vector, pair, and 2D vector by hand",
  },
  problems: [

    // ── Lv.1 ─────────────────────────────────────────────────────────────────

    {
      id: "con-001",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "vector<int> 선언 + 입출력",
      description: `N개의 정수를 **vector<int>** 에 저장한 뒤, 공백으로 구분해 한 줄에 출력하세요.

vector 선언 방법: \`vector<int> v(n);\``,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // vector<int> 선언 (크기 n)

    // n개 입력

    // 공백 구분 출력

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "3 1 4 1 5", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "3\n-1 0 1", expectedOutput: "-1 0 1", label: "음수 포함" },
      ],
      hints: [
        "`vector<int> v(n);` 으로 크기 n인 벡터를 선언하세요.",
        "for (int i = 0; i < n; i++) cin >> v[i]; 로 입력받으세요.",
        "출력 시 마지막 원소 뒤에 공백이 없도록 주의: `if (i) cout << ' '; cout << v[i];`",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << v[i];
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "`vector<int> v(n)`은 크기가 n인 int 벡터를 0으로 초기화합니다. 인덱스 접근은 배열과 동일합니다.",
      en: {
        title: "vector<int>: Declare + I/O",
        description: `Store N integers in a **vector<int>**, then print them space-separated on one line.

Declaration: \`vector<int> v(n);\``,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // declare vector<int> of size n

    // read n values

    // print space-separated

    return 0;
}`,
        hints: [
          "Declare with `vector<int> v(n);` to get a zero-initialized vector of size n.",
          "Read with: for (int i = 0; i < n; i++) cin >> v[i];",
          "Print without trailing space: `if (i) cout << ' '; cout << v[i];`",
        ],
        solutionExplanation: "`vector<int> v(n)` creates a zero-initialized int vector of size n. Index access works just like an array.",
      },
    },

    {
      id: "con-002",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "vector<int>(n, val) — 초기값 지정",
      description: `N개짜리 **0으로 초기화된** 벡터를 만들고, 주어진 M개의 인덱스 위치에 1을 대입한 뒤 벡터를 출력하세요.

초기화 방법: \`vector<int> v(n, 0);\``,
      constraints: "1 ≤ N ≤ 50, 0 ≤ M ≤ N, 모든 인덱스는 0-based이고 유효함",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 크기 n, 초기값 0으로 벡터 선언

    // m개의 인덱스를 읽어서 해당 위치를 1로 변경

    // 출력 (공백 구분)

    return 0;
}`,
      testCases: [
        { stdin: "6 3\n0 2 4", expectedOutput: "1 0 1 0 1 0", label: "기본" },
        { stdin: "3 0", expectedOutput: "0 0 0", label: "변경 없음" },
        { stdin: "4 4\n0 1 2 3", expectedOutput: "1 1 1 1", label: "전부 1" },
      ],
      hints: [
        "`vector<int> v(n, 0);` 으로 0으로 채워진 벡터를 만드세요.",
        "for m번 반복: int idx; cin >> idx; v[idx] = 1;",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> v(n, 0);
    for (int i = 0; i < m; i++) {
        int idx; cin >> idx;
        v[idx] = 1;
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << v[i];
    }
    cout << '\n';
    return 0;
}`,
      solutionExplanation: "`vector<int> v(n, 0)`의 두 번째 인자가 초기값입니다. `vector<int> v(n, -1)`이면 전부 -1로 채웁니다.",
      en: {
        title: "vector<int>(n, val) — Initialization value",
        description: `Create a vector of size N **initialized to 0**, then set positions given by M indices to 1 and print the result.

Syntax: \`vector<int> v(n, 0);\``,
        constraints: "1 ≤ N ≤ 50, 0 ≤ M ≤ N, all indices are 0-based and valid",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // declare vector of size n, all zeros

    // read m indices and set each to 1

    // print space-separated

    return 0;
}`,
        hints: [
          "`vector<int> v(n, 0);` creates a vector filled with 0.",
          "Loop m times: int idx; cin >> idx; v[idx] = 1;",
        ],
        solutionExplanation: "The second argument to `vector<int> v(n, 0)` is the fill value. Use `vector<int> v(n, -1)` to fill with -1.",
      },
    },

    {
      id: "con-003",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "pair<int,int> 선언 + .first/.second",
      description: `두 정수 a, b를 입력받아 **pair<int,int>** 에 저장하고, \`first * second\` 결과를 출력하세요.

pair 선언: \`pair<int,int> p = {a, b};\`  또는  \`make_pair(a, b)\``,
      constraints: "1 ≤ a, b ≤ 1000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // pair<int,int> 선언

    // first * second 출력

    return 0;
}`,
      testCases: [
        { stdin: "3 4", expectedOutput: "12", label: "기본" },
        { stdin: "1 1", expectedOutput: "1", label: "최솟값" },
        { stdin: "100 100", expectedOutput: "10000", label: "최댓값" },
      ],
      hints: [
        "`pair<int,int> p = {a, b};` 또는 `pair<int,int> p = make_pair(a, b);`",
        "`p.first`와 `p.second`로 각 값에 접근합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    pair<int,int> p = {a, b};
    cout << p.first * p.second << '\n';
    return 0;
}`,
      solutionExplanation: "`pair<int,int> p = {a, b}`는 p.first = a, p.second = b로 초기화합니다. C++11부터는 중괄호 초기화가 가능합니다.",
      en: {
        title: "pair<int,int>: Declare + .first/.second",
        description: `Read two integers a and b into a **pair<int,int>**, then output \`first * second\`.

Declare: \`pair<int,int> p = {a, b};\`  or  \`make_pair(a, b)\``,
        constraints: "1 ≤ a, b ≤ 1000",
        initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // declare pair<int,int>

    // output first * second

    return 0;
}`,
        hints: [
          "`pair<int,int> p = {a, b};` or `pair<int,int> p = make_pair(a, b);`",
          "Access values with `p.first` and `p.second`.",
        ],
        solutionExplanation: "`pair<int,int> p = {a, b}` sets p.first = a and p.second = b. Brace initialization is available since C++11.",
      },
    },

    {
      id: "con-004",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "vector<pair<int,int>> — push_back + 출력",
      description: `N개의 (x, y) 좌표를 **vector<pair<int,int>>** 에 저장하고, 각 쌍을 \`x y\` 형식으로 한 줄씩 출력하세요.

선언: \`vector<pair<int,int>> pts;\`
추가: \`pts.push_back({x, y});\``,
      constraints: "1 ≤ N ≤ 100, 0 ≤ x, y ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // vector<pair<int,int>> 선언

    // n개 (x, y) 입력 후 push_back

    // 한 줄씩 출력

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 2\n3 4\n5 6", expectedOutput: "1 2\n3 4\n5 6", label: "기본" },
        { stdin: "1\n0 0", expectedOutput: "0 0", label: "원소 1개" },
      ],
      hints: [
        "`vector<pair<int,int>> pts;` 선언 후 `int x, y; cin >> x >> y; pts.push_back({x, y});`",
        "출력: `for (auto& p : pts) cout << p.first << ' ' << p.second << '\\n';`",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> pts;
    for (int i = 0; i < n; i++) {
        int x, y; cin >> x >> y;
        pts.push_back({x, y});
    }
    for (auto& p : pts)
        cout << p.first << ' ' << p.second << '\n';
    return 0;
}`,
      solutionExplanation: "`push_back({x, y})`로 pair를 직접 생성해 추가합니다. range-for에서 `auto&`를 쓰면 복사 없이 접근합니다.",
      en: {
        title: "vector<pair<int,int>>: push_back + print",
        description: `Store N (x, y) coordinates in a **vector<pair<int,int>>** and print each pair as \`x y\` on its own line.

Declare: \`vector<pair<int,int>> pts;\`
Add: \`pts.push_back({x, y});\``,
        constraints: "1 ≤ N ≤ 100, 0 ≤ x, y ≤ 1000",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // declare vector<pair<int,int>>

    // read n (x, y) pairs and push_back

    // print each pair on its own line

    return 0;
}`,
        hints: [
          "Declare `vector<pair<int,int>> pts;` then `int x, y; cin >> x >> y; pts.push_back({x, y});`",
          "Print: `for (auto& p : pts) cout << p.first << ' ' << p.second << '\\n';`",
        ],
        solutionExplanation: "`push_back({x, y})` constructs the pair in-place. Using `auto&` in range-for avoids copying.",
      },
    },

    // ── Lv.2 ─────────────────────────────────────────────────────────────────

    {
      id: "con-005",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "vector<vector<int>> — 2D 선언 + 입출력",
      description: `N행 M열 정수 격자를 **vector<vector<int>>** 로 선언하고, 입력 후 그대로 출력하세요.

선언: \`vector<vector<int>> grid(n, vector<int>(m));\``,
      constraints: "1 ≤ N, M ≤ 10, 0 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // vector<vector<int>> 선언 (n행 m열)

    // 입력

    // 출력 (각 행을 공백 구분, 행 사이 줄바꿈)

    return 0;
}`,
      testCases: [
        { stdin: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 2 3\n4 5 6", label: "2×3" },
        { stdin: "1 1\n7", expectedOutput: "7", label: "1×1" },
        { stdin: "3 2\n1 2\n3 4\n5 6", expectedOutput: "1 2\n3 4\n5 6", label: "3×2" },
      ],
      hints: [
        "`vector<vector<int>> grid(n, vector<int>(m));` — n개의 행, 각 행은 m개짜리 vector<int>",
        "입력: `for (int i=0;i<n;i++) for (int j=0;j<m;j++) cin >> grid[i][j];`",
        "출력: 이중 for문, 각 행 끝에 `'\\n'`",
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
        for (int j = 0; j < m; j++) {
            if (j) cout << ' ';
            cout << grid[i][j];
        }
        cout << '\n';
    }
    return 0;
}`,
      solutionExplanation: "`vector<vector<int>> grid(n, vector<int>(m))`은 '크기 n짜리 vector'인데, 각 원소가 '크기 m짜리 vector<int>'입니다. 즉 n×m 2D 배열과 동일한 구조입니다.",
      en: {
        title: "vector<vector<int>>: 2D declare + I/O",
        description: `Declare an N×M grid as **vector<vector<int>>**, read it in, then print it back.

Declaration: \`vector<vector<int>> grid(n, vector<int>(m));\``,
        constraints: "1 ≤ N, M ≤ 10, 0 ≤ each element ≤ 100",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // declare vector<vector<int>> with n rows and m columns

    // read input

    // print (space-separated within rows, newline between rows)

    return 0;
}`,
        hints: [
          "`vector<vector<int>> grid(n, vector<int>(m));` — n rows, each row is a vector<int> of size m",
          "Input: `for (int i=0;i<n;i++) for (int j=0;j<m;j++) cin >> grid[i][j];`",
          "Print each row then `'\\n'`",
        ],
        solutionExplanation: "`vector<vector<int>> grid(n, vector<int>(m))` is a vector of n rows, where each row is a vector<int> of size m — equivalent to an n×m 2D array.",
      },
    },

    {
      id: "con-006",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "vector<vector<int>> — 초기값 지정",
      description: `N×M 격자를 **-1로 초기화**해서 선언하고, K개의 (행, 열, 값) 명령으로 격자를 업데이트한 뒤 출력하세요.

선언: \`vector<vector<int>> grid(n, vector<int>(m, -1));\``,
      constraints: "1 ≤ N, M ≤ 10, 1 ≤ K ≤ 20, 0 ≤ 값 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    // n×m 격자를 -1로 초기화

    // k개 명령 처리: r c val → grid[r][c] = val

    // 출력

    return 0;
}`,
      testCases: [
        { stdin: "3 3 3\n0 0 5\n1 2 9\n2 1 3", expectedOutput: "5 -1 -1\n-1 -1 9\n-1 3 -1", label: "기본" },
        { stdin: "2 2 0", expectedOutput: "-1 -1\n-1 -1", label: "명령 없음" },
      ],
      hints: [
        "`vector<vector<int>> grid(n, vector<int>(m, -1));` — 두 번째 인자가 각 행의 초기값",
        "for k번: `int r, c, val; cin >> r >> c >> val; grid[r][c] = val;`",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<int>> grid(n, vector<int>(m, -1));
    for (int i = 0; i < k; i++) {
        int r, c, val; cin >> r >> c >> val;
        grid[r][c] = val;
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j) cout << ' ';
            cout << grid[i][j];
        }
        cout << '\n';
    }
    return 0;
}`,
      solutionExplanation: "`vector<int>(m, -1)`은 크기 m, 전부 -1인 벡터입니다. `vector<vector<int>> grid(n, vector<int>(m, -1))`은 그런 행이 n개 있는 2D 구조입니다.",
      en: {
        title: "vector<vector<int>>: Initialize with a fill value",
        description: `Declare an N×M grid **initialized to -1**, then apply K updates (row, col, value) and print the result.

Declaration: \`vector<vector<int>> grid(n, vector<int>(m, -1));\``,
        constraints: "1 ≤ N, M ≤ 10, 1 ≤ K ≤ 20, 0 ≤ value ≤ 100",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    // declare n×m grid initialized to -1

    // process k updates: r c val → grid[r][c] = val

    // print

    return 0;
}`,
        hints: [
          "`vector<vector<int>> grid(n, vector<int>(m, -1));` — second arg is the fill value for each row",
          "Loop k times: `int r, c, val; cin >> r >> c >> val; grid[r][c] = val;`",
        ],
        solutionExplanation: "`vector<int>(m, -1)` is a size-m vector filled with -1. Wrapping it in `vector<vector<int>> grid(n, ...)` gives you n such rows.",
      },
    },

    {
      id: "con-007",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "vector<pair<int,int>> — 조건부 push_back",
      description: `N개의 정수를 입력받아, **양수인 것만** (값, 인덱스) 쌍으로 vector에 push_back하고, 저장된 쌍의 개수와 내용을 출력하세요.`,
      constraints: "1 ≤ N ≤ 50, -100 ≤ 각 원소 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> result;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        // x가 양수면 {x, i} push_back

    }
    cout << result.size() << '\n';
    for (auto& p : result)
        cout << p.first << ' ' << p.second << '\n';
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 -1 0 7 -2", expectedOutput: "2\n3 0\n7 3", label: "기본" },
        { stdin: "3\n-1 -2 -3", expectedOutput: "0", label: "양수 없음" },
        { stdin: "2\n5 8", expectedOutput: "2\n5 0\n8 1", label: "전부 양수" },
      ],
      hints: [
        "`if (x > 0) result.push_back({x, i});`",
        "size()의 반환형은 `size_t`(unsigned)이므로 `(int)result.size()` 또는 그냥 `result.size()`로 출력 가능합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> result;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x > 0) result.push_back({x, i});
    }
    cout << result.size() << '\n';
    for (auto& p : result)
        cout << p.first << ' ' << p.second << '\n';
    return 0;
}`,
      solutionExplanation: "조건이 참일 때만 push_back하면 필터링된 컨테이너를 만들 수 있습니다. (값, 인덱스) 쌍을 저장하면 정렬 후에도 원래 위치를 알 수 있어서 유용합니다.",
      en: {
        title: "vector<pair<int,int>>: Conditional push_back",
        description: `Read N integers. For each **positive** number, push_back the pair (value, index) into a vector, then print the count and the stored pairs.`,
        constraints: "1 ≤ N ≤ 50, -100 ≤ each element ≤ 100",
        hints: [
          "`if (x > 0) result.push_back({x, i});`",
          "The return type of `size()` is `size_t` (unsigned) — print it directly or cast with `(int)`.",
        ],
        solutionExplanation: "Pushing only when a condition is met builds a filtered container. Storing (value, index) pairs lets you recover the original position after sorting.",
      },
    },

    {
      id: "con-008",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "pair를 반환하는 함수",
      description: `배열에서 최솟값과 최댓값을 동시에 찾아 **pair<int,int>** 로 반환하는 함수 \`minmax_pair\`를 작성하세요.

함수 원형: \`pair<int,int> minmax_pair(vector<int>& v)\``,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

// pair<int,int> minmax_pair 함수를 작성하세요
// first = 최솟값, second = 최댓값


int main() {
    int n; cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    auto result = minmax_pair(v);
    cout << result.first << ' ' << result.second << '\n';
    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 7 4 9", expectedOutput: "1 9", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42 42", label: "원소 1개" },
        { stdin: "3\n-5 0 3", expectedOutput: "-5 3", label: "음수 포함" },
      ],
      hints: [
        "`pair<int,int> minmax_pair(vector<int>& v) { ... }`",
        "mn = v[0], mx = v[0]으로 초기화하고 반복문으로 갱신하세요.",
        "`return {mn, mx};`",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

pair<int,int> minmax_pair(vector<int>& v) {
    int mn = v[0], mx = v[0];
    for (int i = 1; i < (int)v.size(); i++) {
        if (v[i] < mn) mn = v[i];
        if (v[i] > mx) mx = v[i];
    }
    return {mn, mx};
}

int main() {
    int n; cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    auto result = minmax_pair(v);
    cout << result.first << ' ' << result.second << '\n';
    return 0;
}`,
      solutionExplanation: "함수가 `pair<int,int>`를 반환하면 `{mn, mx}` 중괄호 초기화로 편하게 반환할 수 있습니다. 호출 측에서 `auto`로 받으면 타입을 명시하지 않아도 됩니다.",
      en: {
        title: "Function returning pair<int,int>",
        description: `Write a function \`minmax_pair\` that finds the minimum and maximum of a vector and returns them as a **pair<int,int>**.

Signature: \`pair<int,int> minmax_pair(vector<int>& v)\``,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

// Write the minmax_pair function here
// first = minimum, second = maximum


int main() {
    int n; cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    auto result = minmax_pair(v);
    cout << result.first << ' ' << result.second << '\n';
    return 0;
}`,
        hints: [
          "`pair<int,int> minmax_pair(vector<int>& v) { ... }`",
          "Initialize mn = v[0], mx = v[0], then update in a loop.",
          "`return {mn, mx};`",
        ],
        solutionExplanation: "A function returning `pair<int,int>` can use brace initialization `{mn, mx}` for a clean return. The caller can use `auto` to avoid spelling out the type.",
      },
    },

    // ── Lv.3 ─────────────────────────────────────────────────────────────────

    {
      id: "con-009",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "어려움",
      title: "vector<pair<int,int>> — 최고 점수 찾기",
      description: `N개의 (번호, 점수) 쌍과 기준 점수 T를 입력받아 다음 두 가지를 출력하세요.

1행: **최고 점수를 받은 사람의 번호와 점수** (동점이 있으면 번호가 가장 작은 사람)
2행: **점수가 T 이상인 사람의 수**

선형 탐색으로 해결하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ 번호 ≤ 1000, 0 ≤ 점수, T ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++)
        cin >> v[i].first >> v[i].second;

    // 최고 점수를 받은 사람 찾기 (동점이면 번호가 작은 사람)

    // T 이상 점수 받은 사람 수 세기


    return 0;
}`,
      testCases: [
        { stdin: "4 80\n1 80\n2 95\n3 80\n4 70", expectedOutput: "2 95\n3", label: "기본" },
        { stdin: "1 50\n5 50", expectedOutput: "5 50\n1", label: "원소 1개" },
        { stdin: "3 100\n3 100\n1 100\n2 100", expectedOutput: "1 100\n3", label: "전부 동점" },
      ],
      hints: [
        "최고 점수와 해당 번호를 담을 `pair<int,int> best = v[0];` 로 초기화.",
        "루프에서 `v[i].second > best.second` 이거나, 같으면 `v[i].first < best.first` 일 때 갱신.",
        "카운트용 변수 `cnt = 0;` 을 두고 `v[i].second >= t` 면 `cnt++`.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++)
        cin >> v[i].first >> v[i].second;

    pair<int,int> best = v[0];
    int cnt = 0;
    if (v[0].second >= t) cnt = 1;
    for (int i = 1; i < n; i++) {
        if (v[i].second > best.second ||
            (v[i].second == best.second && v[i].first < best.first)) {
            best = v[i];
        }
        if (v[i].second >= t) cnt++;
    }
    cout << best.first << ' ' << best.second << '\n';
    cout << cnt << '\n';
    return 0;
}`,
      solutionExplanation: "선형 탐색 한 번으로 최댓값 갱신과 카운트를 동시에 처리합니다. 동점 처리는 `(같은 점수일 때 번호가 더 작으면 갱신)` 조건을 or로 묶어 넣습니다.",
      en: {
        title: "vector<pair<int,int>>: Find top scorer",
        description: `Read N (id, score) pairs and a threshold T. Print:

Line 1: **id and score of the top scorer** (on tie, smallest id wins)
Line 2: **number of people scoring at least T**

Solve with a linear scan.`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ id ≤ 1000, 0 ≤ score, T ≤ 100",
        hints: [
          "Initialize `pair<int,int> best = v[0];` to hold the best so far.",
          "Update when `v[i].second > best.second` OR tie with smaller id.",
          "Keep a counter `cnt` and increment when `v[i].second >= t`.",
        ],
        solutionExplanation: "One linear pass handles both the max tracking and the count. The tie-break is written as a compound OR condition — update when the score is strictly higher, or equal score with a smaller id.",
      },
    },

    {
      id: "con-010",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "어려움",
      title: "2D vector — 테두리만 1로 채우기",
      description: `N×M 격자를 0으로 초기화한 뒤, **테두리(첫 행·마지막 행·첫 열·마지막 열)** 만 1로 바꿔 출력하세요.`,
      constraints: "3 ≤ N, M ≤ 10",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // n×m 격자 0으로 초기화

    // 테두리를 1로 설정

    // 출력

    return 0;
}`,
      testCases: [
        { stdin: "3 4", expectedOutput: "1 1 1 1\n1 0 0 1\n1 1 1 1", label: "3×4" },
        { stdin: "4 4", expectedOutput: "1 1 1 1\n1 0 0 1\n1 0 0 1\n1 1 1 1", label: "4×4" },
        { stdin: "3 3", expectedOutput: "1 1 1\n1 0 1\n1 1 1", label: "3×3" },
      ],
      hints: [
        "`vector<vector<int>> grid(n, vector<int>(m, 0));` 으로 0 초기화",
        "첫 행: `for (int j=0;j<m;j++) grid[0][j]=1;`  마지막 행: `grid[n-1][j]`",
        "첫 열: `for (int i=0;i<n;i++) grid[i][0]=1;`  마지막 열: `grid[i][m-1]`",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m, 0));
    for (int j = 0; j < m; j++) { grid[0][j] = 1; grid[n-1][j] = 1; }
    for (int i = 0; i < n; i++) { grid[i][0] = 1; grid[i][m-1] = 1; }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j) cout << ' ';
            cout << grid[i][j];
        }
        cout << '\n';
    }
    return 0;
}`,
      solutionExplanation: "테두리 채우기는 4가지 케이스(상/하/좌/우)를 별도 루프로 처리합니다. 모서리는 두 번 설정되지만 동일한 값이라 무관합니다.",
      en: {
        title: "2D vector: Fill border cells",
        description: `Initialize an N×M grid to 0, then set only the **border cells** (first/last row and first/last column) to 1 and print.`,
        constraints: "3 ≤ N, M ≤ 10",
        initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // initialize n×m grid to 0

    // set border cells to 1

    // print

    return 0;
}`,
        hints: [
          "`vector<vector<int>> grid(n, vector<int>(m, 0));` to zero-initialize",
          "Top/bottom rows: `for (int j=0;j<m;j++) grid[0][j]=grid[n-1][j]=1;`",
          "Left/right cols: `for (int i=0;i<n;i++) grid[i][0]=grid[i][m-1]=1;`",
        ],
        solutionExplanation: "Handle the four border sides with separate loops. Corner cells are set twice, but to the same value — no problem.",
      },
    },

    {
      id: "con-011",
      cluster: "constructs",
      unlockAfter: "cpp-15",
      difficulty: "어려움",
      title: "vector<tuple<int,int,int>> — 최우수 학생과 평균",
      description: `N명의 학생 정보 (학번, 수학점수, 영어점수) 를 입력받아 다음을 구하세요.

1행: **두 과목 합계가 가장 높은 학생의 (학번 수학 영어)**. 합계가 같으면 수학 점수가 더 높은 학생, 그래도 같으면 학번이 작은 학생.
2행: **수학 평균** (소수점 없이 버림, 즉 \`합 / N\`)
3행: **수학과 영어 모두 80점 이상인 학생 수**

tuple 선언: \`vector<tuple<int,int,int>> students;\`
값 접근: \`get<0>(t)\`, \`get<1>(t)\`, \`get<2>(t)\``,
      constraints: "1 ≤ N ≤ 100, 1 ≤ 학번 ≤ 1000, 0 ≤ 각 점수 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

int main() {
    int n; cin >> n;
    vector<tuple<int,int,int>> students; // (학번, 수학, 영어)
    for (int i = 0; i < n; i++) {
        int id, math, eng;
        cin >> id >> math >> eng;
        students.push_back({id, math, eng});
    }
    // 1) 합계 최고 학생 찾기 (타이브레이크: 수학 높은 사람, 그래도 같으면 학번 작은 사람)

    // 2) 수학 평균 (정수 나눗셈)

    // 3) 수학·영어 모두 80 이상인 학생 수


    return 0;
}`,
      testCases: [
        {
          stdin: "4\n1 80 90\n2 80 95\n3 95 80\n4 80 90",
          expectedOutput: "3 95 80\n83\n4",
          label: "기본 (동점 다수)"
        },
        { stdin: "1\n5 70 80", expectedOutput: "5 70 80\n70\n0", label: "1명" },
        { stdin: "3\n10 100 100\n20 90 90\n30 85 85", expectedOutput: "10 100 100\n91\n3", label: "전원 80+" },
      ],
      hints: [
        "합계를 계산해 비교하세요: `int sumA = get<1>(a) + get<2>(a);`",
        "최고 학생은 `best` tuple을 두고 루프에서 조건 갱신: 합계가 크거나, 같으면 수학이 높거나, 그래도 같으면 학번이 작을 때.",
        "수학 평균은 `mathSum / n` (int 나눗셈). 80+ 카운트는 `get<1>(s) >= 80 && get<2>(s) >= 80` 일 때 증가.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

int main() {
    int n; cin >> n;
    vector<tuple<int,int,int>> students;
    for (int i = 0; i < n; i++) {
        int id, math, eng;
        cin >> id >> math >> eng;
        students.push_back({id, math, eng});
    }

    auto best = students[0];
    int mathSum = get<1>(students[0]);
    int both80 = (get<1>(students[0]) >= 80 && get<2>(students[0]) >= 80) ? 1 : 0;

    for (int i = 1; i < n; i++) {
        int sumA = get<1>(best) + get<2>(best);
        int sumB = get<1>(students[i]) + get<2>(students[i]);
        if (sumB > sumA) {
            best = students[i];
        } else if (sumB == sumA) {
            if (get<1>(students[i]) > get<1>(best)) {
                best = students[i];
            } else if (get<1>(students[i]) == get<1>(best) &&
                       get<0>(students[i]) < get<0>(best)) {
                best = students[i];
            }
        }
        mathSum += get<1>(students[i]);
        if (get<1>(students[i]) >= 80 && get<2>(students[i]) >= 80) both80++;
    }

    cout << get<0>(best) << ' ' << get<1>(best) << ' ' << get<2>(best) << '\n';
    cout << mathSum / n << '\n';
    cout << both80 << '\n';
    return 0;
}`,
      solutionExplanation: "tuple은 `get<N>(t)`로 N번째 원소에 접근합니다 (0-based). 한 번의 선형 탐색으로 최고 학생, 평균, 조건 카운트를 동시에 계산합니다. 타이브레이크가 여러 단계라면 if/else if 체인으로 읽히기 쉽게 작성합니다.",
      en: {
        title: "vector<tuple<int,int,int>>: Top student & stats",
        description: `Read N student records (id, math, english). Compute:

Line 1: **id math english of the student with the highest total**. On tie, the student with the higher math; if still tied, the smaller id.
Line 2: **math average**, integer division (\`sum / N\`)
Line 3: **count of students with both math ≥ 80 and english ≥ 80**

Declare: \`vector<tuple<int,int,int>> students;\`
Access: \`get<0>(t)\`, \`get<1>(t)\`, \`get<2>(t)\``,
        constraints: "1 ≤ N ≤ 100, 1 ≤ id ≤ 1000, 0 ≤ each score ≤ 100",
        hints: [
          "Compute a sum `int sumA = get<1>(a) + get<2>(a);` before comparing.",
          "Keep a running `best` and update when sum is higher, or equal with higher math, or all equal with smaller id.",
          "Math average: `mathSum / n` (integer division). For the 80+ count, test both subject scores.",
        ],
        solutionExplanation: "Tuple elements are accessed with `get<N>(t)` (0-based). A single linear pass handles the best tracking, the math sum, and the count. When tie-breaking has several levels, an if/else if chain reads more clearly than a compound condition.",
      },
    },

  ],
}
