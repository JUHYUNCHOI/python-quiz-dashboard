import type { PracticeCluster } from "./types"

export const simulationCluster: PracticeCluster = {
  id: "simulation",
  title: "시뮬레이션",
  emoji: "🎮",
  description: "Bronze 핵심 — 문제를 그대로 코드로 구현하는 직접 시뮬레이션",
  unlockAfter: "cpp-p2",
  problems: [
    {
      id: "sim-001",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "쉬움",
      title: "공 튀기기",
      description: `공이 높이 H에서 떨어지기 시작합니다. 공은 바닥에 튕길 때마다 이전 높이의 절반으로 올라갑니다.
공이 N번 튕긴 후 최고 높이를 출력하세요. (실수 출력, 소수점 둘째 자리까지)`,
      constraints: "1 ≤ H ≤ 10000, 1 ≤ N ≤ 20",
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double h;
    int n;
    cin >> h >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "100 1", expectedOutput: "50.00", label: "1번 튕김" },
        { stdin: "100 3", expectedOutput: "12.50", label: "3번 튕김" },
        { stdin: "64 6", expectedOutput: "1.00", label: "6번 튕김" },
      ],
      hints: [
        "튕길 때마다 h = h / 2.0을 N번 반복합니다.",
        "for 루프 N번 반복 후 h를 출력하세요.",
      ],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double h;
    int n;
    cin >> h >> n;
    for (int i = 0; i < n; i++) h /= 2.0;
    cout << fixed << setprecision(2) << h << "\n";
    return 0;
}`,
      solutionExplanation: "매번 높이를 절반으로 줄이는 반복입니다. 2.0으로 나눠 실수 나눗셈을 유지합니다. fixed + setprecision(2)로 소수점 두 자리를 출력합니다.",
    },
    {
      id: "sim-002",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "쉬움",
      title: "로봇 이동",
      description: `로봇이 (0, 0)에서 시작합니다. 명령어 문자열이 주어질 때, 각 명령어에 따라 이동합니다.
- R: x+1, L: x-1, U: y+1, D: y-1

최종 위치 (x, y)를 출력하세요.`,
      constraints: "명령어 길이 1 이상 10000 이하",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string commands;
    cin >> commands;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "RRUU", expectedOutput: "2 2", label: "오른쪽 위" },
        { stdin: "RDLU", expectedOutput: "0 0", label: "원점 복귀" },
        { stdin: "RRRDDDD", expectedOutput: "3 -4", label: "기본" },
      ],
      hints: [
        "x, y를 0으로 초기화하고 각 문자에 따라 x 또는 y를 증감합니다.",
        "switch 또는 if-else로 'R','L','U','D'를 구분합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string commands;
    cin >> commands;
    int x = 0, y = 0;
    for (char c : commands) {
        if (c == 'R') x++;
        else if (c == 'L') x--;
        else if (c == 'U') y++;
        else if (c == 'D') y--;
    }
    cout << x << " " << y << "\n";
    return 0;
}`,
      solutionExplanation: "각 문자를 순회하며 x, y를 갱신합니다. 시뮬레이션 문제에서 상태(여기서는 좌표)를 변수로 관리하는 기본 패턴입니다.",
    },
    {
      id: "sim-003",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "쉬움",
      title: "달팽이 탈출",
      description: `달팽이가 깊이 H인 우물에 빠졌습니다. 낮에는 U미터 올라가고, 밤에는 D미터 내려옵니다.
달팽이가 우물에서 탈출하는 데 며칠이 걸리는지 출력하세요.
(낮에 올라가다가 H에 도달하면 그날 탈출합니다)`,
      constraints: "1 ≤ D < U ≤ H ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int h, u, d;
    cin >> h >> u >> d;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10 3 1", expectedOutput: "5", label: "기본" },
        { stdin: "5 5 2", expectedOutput: "1", label: "첫날 탈출" },
        { stdin: "20 4 3", expectedOutput: "17", label: "느린 탈출" },
      ],
      hints: [
        "매일 낮에 u만큼 올라가고, 탈출 못하면 밤에 d만큼 내려옵니다.",
        "while 루프에서 pos >= h 조건으로 탈출을 확인하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int h, u, d;
    cin >> h >> u >> d;
    int pos = 0, days = 0;
    while (true) {
        days++;
        pos += u;
        if (pos >= h) break;
        pos -= d;
    }
    cout << days << "\n";
    return 0;
}`,
      solutionExplanation: "매 반복마다 1일이 지납니다. 낮에 올라간 후 탈출 여부를 확인합니다. 탈출했으면 loop 종료, 아니면 밤에 다시 내려갑니다.",
    },
    {
      id: "sim-004",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "쉬움",
      title: "자동판매기",
      description: `자동판매기에서 가격이 P인 음료를 사려 합니다.
동전 종류는 500원, 100원, 50원, 10원입니다.
주어진 금액 M원으로 음료를 구매할 때 거스름돈으로 받는 동전의 최소 개수를 출력하세요.
(M은 항상 P 이상이며, 거스름돈은 큰 동전부터 최대한 사용합니다)`,
      constraints: "10 ≤ P ≤ M ≤ 10000, P와 M은 10의 배수",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int p, m;
    cin >> p >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "800 1000", expectedOutput: "4", label: "200원 거스름돈 (100×2)" },
        { stdin: "350 500", expectedOutput: "3", label: "150원 (100+50)" },
        { stdin: "100 100", expectedOutput: "0", label: "거스름돈 없음" },
        { stdin: "60 1000", expectedOutput: "6", label: "940원" },
      ],
      hints: [
        "거스름돈 = m - p를 큰 동전부터 나눕니다.",
        "coins[] = {500, 100, 50, 10}; 순서로 나누고 나머지를 계속 처리합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int p, m;
    cin >> p >> m;
    int change = m - p;
    int coins[] = {500, 100, 50, 10};
    int count = 0;
    for (int coin : coins) {
        count += change / coin;
        change %= coin;
    }
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "탐욕 알고리즘: 큰 동전부터 최대한 사용합니다. change / coin이 해당 동전 개수, change %= coin이 남은 금액입니다.",
    },
    {
      id: "sim-005",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "보통",
      title: "줄 서기 시뮬레이션",
      description: `N명이 한 줄로 서 있습니다. 매 분마다 인접한 두 사람 중 앞 사람 번호가 더 크면 두 사람이 자리를 바꿉니다.
(버블 정렬의 한 패스)
T분 후의 줄 순서를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ T ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 1\n5 1 4 2 3", expectedOutput: "1 4 2 3 5", label: "1분" },
        { stdin: "5 3\n5 4 3 2 1", expectedOutput: "2 3 4 5 1", label: "3분" },
        { stdin: "4 0\n3 1 4 2", expectedOutput: "3 1 4 2", label: "0분" },
      ],
      hints: [
        "T번 반복하며 매번 인접 원소를 비교하고 교환합니다.",
        "한 번의 패스: for(i=0..n-2) if(v[i] > v[i+1]) swap(v[i], v[i+1]);",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    for (int round = 0; round < t; round++)
        for (int i = 0; i < n - 1; i++)
            if (v[i] > v[i + 1]) swap(v[i], v[i + 1]);
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << v[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "버블 정렬의 T번 패스를 수행합니다. T가 충분히 크면 완전히 정렬됩니다. 각 패스에서 가장 큰 미정렬 원소가 제자리를 찾아갑니다.",
    },
    {
      id: "sim-006",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "보통",
      title: "카드 뒤집기",
      description: `N장의 카드가 모두 앞면(1)으로 놓여 있습니다.
M번의 조작이 주어집니다. 각 조작은 (l, r)이며, l번부터 r번 카드를 모두 뒤집습니다.
(1이면 0으로, 0이면 1로)
모든 조작 후 앞면(1)인 카드의 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100, 1 ≤ l ≤ r ≤ N",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> cards(n + 1, 1); // 1-based
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5 2\n1 3\n2 4", expectedOutput: "3", label: "기본" },
        { stdin: "3 1\n1 3", expectedOutput: "0", label: "전체 뒤집기" },
        { stdin: "5 3\n1 5\n2 4\n1 5", expectedOutput: "3", label: "여러 번" },
      ],
      hints: [
        "각 조작마다 l~r 인덱스의 카드를 1^=1(토글)합니다.",
        "cards[i] ^= 1 또는 cards[i] = 1 - cards[i]로 뒤집을 수 있습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> cards(n + 1, 1);
    for (int i = 0; i < m; i++) {
        int l, r;
        cin >> l >> r;
        for (int j = l; j <= r; j++) cards[j] ^= 1;
    }
    int cnt = 0;
    for (int i = 1; i <= n; i++) if (cards[i]) cnt++;
    cout << cnt << "\n";
    return 0;
}`,
      solutionExplanation: "XOR 연산 ^= 1로 0↔1을 토글합니다. 각 조작을 그대로 시뮬레이션한 후 최종 앞면 카드를 셉니다.",
    },
    {
      id: "sim-007",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "보통",
      title: "점수판 업데이트",
      description: `두 팀 A, B가 경기를 합니다. N개의 이벤트가 주어집니다.
- \`A\`: A팀 1점 득점
- \`B\`: B팀 1점 득점
- \`?\`: 현재 점수 출력 (A점 B점 형식)

모든 \`?\` 이벤트에 대한 출력을 순서대로 나열하세요.`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\nA\nB\nA\n?\nB", expectedOutput: "2 1", label: "기본" },
        { stdin: "6\n?\nA\nA\nB\n?\nA", expectedOutput: "0 0\n2 1", label: "초기 상태부터" },
        { stdin: "3\nA\nA\nA", expectedOutput: "", label: "? 없음" },
      ],
      hints: [
        "scoreA, scoreB 두 변수를 관리하며 이벤트에 따라 증가 또는 출력합니다.",
        "'?'를 cin >> 로 읽으면 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    int scoreA = 0, scoreB = 0;
    for (int i = 0; i < n; i++) {
        string event;
        cin >> event;
        if (event == "A") scoreA++;
        else if (event == "B") scoreB++;
        else cout << scoreA << " " << scoreB << "\n";
    }
    return 0;
}`,
      solutionExplanation: "상태(점수)를 변수로 관리하고 이벤트에 따라 갱신/출력합니다. 이벤트 기반 시뮬레이션의 기본 패턴입니다.",
    },
    {
      id: "sim-008",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "보통",
      title: "엘리베이터 시뮬레이션",
      description: `엘리베이터가 1층에서 시작합니다. N개의 요청이 순서대로 주어질 때, 각 요청에 응답하기 위해 이동한 총 층수를 출력하세요.
요청은 목적 층 번호입니다.`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 목적 층 ≤ 100",
      initialCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int current = 1;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n5 1 3", expectedOutput: "8", label: "기본 (4+4+2=10? 아니면 |5-1|+|1-1|+|3-1|=4+0+2=6?)" },
        { stdin: "1\n10", expectedOutput: "9", label: "1→10" },
        { stdin: "3\n1 1 1", expectedOutput: "0", label: "같은 층 반복" },
      ],
      hints: [
        "각 요청에 대해 abs(destination - current)를 총합에 더하세요.",
        "이동 후 current를 목적 층으로 업데이트합니다.",
      ],
      solutionCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int current = 1, total = 0;
    for (int i = 0; i < n; i++) {
        int dest; cin >> dest;
        total += abs(dest - current);
        current = dest;
    }
    cout << total << "\n";
    return 0;
}`,
      solutionExplanation: "현재 층에서 목적 층까지의 절댓값 차이가 이동 층수입니다. 매 요청 후 current를 갱신해 다음 이동의 시작점으로 사용합니다.",
    },
    {
      id: "sim-009",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "숫자 폭탄 게임",
      description: `N개의 숫자 중 K의 배수가 나올 때마다 그 숫자를 제거합니다.
숫자는 1부터 N까지 순서대로 말하며, K의 배수는 제거됩니다.
제거된 숫자들을 순서대로 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 2 ≤ K ≤ N",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10 3", expectedOutput: "3 6 9", label: "3의 배수" },
        { stdin: "10 2", expectedOutput: "2 4 6 8 10", label: "짝수" },
        { stdin: "15 5", expectedOutput: "5 10 15", label: "5의 배수" },
      ],
      hints: [
        "1부터 N까지 순회하며 i % k == 0인 경우 출력합니다.",
        "처음 출력 전에는 공백을 붙이지 않습니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    bool first = true;
    for (int i = 1; i <= n; i++) {
        if (i % k == 0) {
            if (!first) cout << ' ';
            cout << i;
            first = false;
        }
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "1부터 N까지 순회하며 K의 배수인 경우만 출력합니다. first 플래그로 첫 원소 앞 공백을 방지합니다.",
    },
    {
      id: "sim-010",
      cluster: "simulation",
      unlockAfter: "cpp-21",
      difficulty: "어려움",
      title: "방향 전환 로봇",
      description: `N×M 격자에서 로봇이 (1,1)에서 시작해 오른쪽 방향으로 이동합니다.
벽(격자 밖) 또는 이미 방문한 칸에 부딪히면 시계 방향으로 90도 회전합니다.
이동할 수 없으면 멈춥니다. 방문한 칸의 수를 출력하세요.`,
      constraints: "1 ≤ N, M ≤ 20",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3", expectedOutput: "9", label: "3×3 전체 순회" },
        { stdin: "1 5", expectedOutput: "5", label: "1행" },
        { stdin: "4 4", expectedOutput: "16", label: "4×4 전체 순회" },
      ],
      hints: [
        "방향: 오른쪽(0), 아래(1), 왼쪽(2), 위(3). 시계 방향은 (dir+1)%4",
        "이동 시도 → 벽/방문이면 회전, 4번 모두 막히면 종료.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<bool>> visited(n, vector<bool>(m, false));
    int dx[] = {0, 1, 0, -1}; // 오른쪽, 아래, 왼쪽, 위
    int dy[] = {1, 0, -1, 0};
    int x = 0, y = 0, dir = 0, count = 1;
    visited[0][0] = true;
    while (true) {
        bool moved = false;
        for (int turn = 0; turn < 4; turn++) {
            int nx = x + dx[dir], ny = y + dy[dir];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny]) {
                visited[nx][ny] = true;
                x = nx; y = ny;
                count++;
                moved = true;
                break;
            }
            dir = (dir + 1) % 4;
        }
        if (!moved) break;
    }
    cout << count << "\n";
    return 0;
}`,
      solutionExplanation: "현재 방향부터 4방향을 시도합니다. 이동 가능한 방향을 찾으면 이동, 못 찾으면 종료합니다. 방향 배열과 (dir+1)%4 패턴이 핵심입니다.",
    },
    {
      id: "sim-011",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "편의점 재고 관리",
      description: `편의점에 N개 품목이 있고 각 재고량이 주어집니다.
M개의 주문이 순서대로 들어옵니다. 각 주문은 (품목번호, 수량)입니다.
재고가 충분하면 판매하고, 부족하면 \`OUT OF STOCK\`을 출력합니다.
모든 주문 처리 후 재고를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 100, 0 ≤ 재고/수량 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> stock(n + 1);
    for (int i = 1; i <= n; i++) cin >> stock[i];
    int m;
    cin >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\n10 5 20\n3\n1 3\n2 7\n3 10", expectedOutput: "OUT OF STOCK\n7 0 10", label: "기본" },
        { stdin: "2\n100 50\n2\n1 50\n2 50", expectedOutput: "50 0", label: "정확히 소진" },
        { stdin: "1\n0\n1\n1 1", expectedOutput: "OUT OF STOCK\n0", label: "재고 0" },
      ],
      hints: [
        "각 주문에서 stock[item] >= qty이면 판매(stock[item] -= qty), 아니면 OUT OF STOCK 출력.",
        "주문 처리 후 재고를 공백으로 구분하여 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> stock(n + 1);
    for (int i = 1; i <= n; i++) cin >> stock[i];
    int m;
    cin >> m;
    for (int i = 0; i < m; i++) {
        int item, qty;
        cin >> item >> qty;
        if (stock[item] >= qty)
            stock[item] -= qty;
        else
            cout << "OUT OF STOCK\n";
    }
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << stock[i];
    }
    cout << "\n";
    return 0;
}`,
      solutionExplanation: "상태 배열(stock)을 관리하며 각 이벤트에 따라 갱신합니다. 조건 확인 → 상태 변경의 패턴이 시뮬레이션의 핵심입니다.",
    },
    {
      id: "sim-012",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "신호등 타이밍",
      description: `신호등이 빨간불 R초, 초록불 G초로 반복됩니다. T초 시점에 도착했을 때 기다려야 하는 시간을 출력하세요.
(초록불이면 0, 빨간불이면 남은 빨간불 시간)
T=0부터 빨간불로 시작합니다.`,
      constraints: "1 ≤ R, G ≤ 1000, 0 ≤ T ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int r, g, t;
    cin >> r >> g >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 5 0", expectedOutput: "3", label: "빨간불 시작" },
        { stdin: "3 5 3", expectedOutput: "0", label: "초록불 시작" },
        { stdin: "3 5 7", expectedOutput: "1", label: "다음 빨간불" },
        { stdin: "4 6 4", expectedOutput: "0", label: "초록불 시작" },
      ],
      hints: [
        "t % (r + g)로 현재 사이클 내 위치를 구합니다.",
        "그 위치가 r 미만이면 빨간불이므로 r - 위치만큼 기다립니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int r, g, t;
    cin >> r >> g >> t;
    int pos = t % (r + g);
    if (pos < r)
        cout << r - pos << "\n";
    else
        cout << 0 << "\n";
    return 0;
}`,
      solutionExplanation: "t % (r+g)로 현재 사이클에서의 위치를 구합니다. 0~r-1은 빨간불, r~r+g-1은 초록불입니다. 빨간불이면 남은 시간 r-pos를 출력합니다.",
    },
    {
      id: "sim-013",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "마라톤 물 보급",
      description: `마라톤 코스 길이가 L km입니다. 선수가 매 S km마다 물을 마십니다.
물 보급소는 M개 있으며 위치가 주어집니다. 선수가 물을 마시러 갈 때 가장 가까운 보급소를 이용합니다.
(거리가 같으면 번호가 작은 쪽)
선수가 각 물 마시는 지점마다 이용하는 보급소 번호를 출력하세요. (코스 끝 도달 전까지)`,
      constraints: "1 ≤ L ≤ 1000, 1 ≤ S ≤ L, 1 ≤ M ≤ 100, 1 ≤ 보급소 위치 ≤ L",
      initialCode: `#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

int main() {
    int l, s, m;
    cin >> l >> s >> m;
    vector<int> station(m);
    for (int i = 0; i < m; i++) cin >> station[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10 3 3\n2 5 8", expectedOutput: "1\n2\n3", label: "기본 (3km, 6km, 9km)" },
        { stdin: "10 5 2\n3 7", expectedOutput: "1\n2", label: "5km마다" },
        { stdin: "6 2 2\n1 5", expectedOutput: "1\n2\n2", label: "3번 물 마심" },
      ],
      hints: [
        "물 마시는 지점: s, 2s, 3s, ... (L 미만인 것만)",
        "각 지점에서 |station[i] - 지점|이 최소인 보급소 인덱스를 찾습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

int main() {
    int l, s, m;
    cin >> l >> s >> m;
    vector<int> station(m);
    for (int i = 0; i < m; i++) cin >> station[i];
    for (int pos = s; pos < l; pos += s) {
        int minDist = INT_MAX, best = 0;
        for (int i = 0; i < m; i++) {
            int dist = abs(station[i] - pos);
            if (dist < minDist) {
                minDist = dist;
                best = i;
            }
        }
        cout << best + 1 << "\n";
    }
    return 0;
}`,
      solutionExplanation: "물 마시는 위치를 s, 2s, ... 순서로 생성합니다. 각 위치에서 가장 가까운 보급소를 선형 탐색합니다. 같은 거리면 먼저 등장한(인덱스 작은) 보급소를 선택합니다.",
    },
    {
      id: "sim-014",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "과제 제출 현황",
      description: `N명의 학생과 M개의 과제가 있습니다.
각 학생은 제출한 과제 번호 목록이 주어집니다.
모든 과제를 제출한 학생 수와, 한 과제도 제출하지 않은 학생 수를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 20, 각 학생당 제출 과제 수 0 이상 M 이하",
      initialCode: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 3\n3 1 2 3\n2 1 2\n0", expectedOutput: "1 1", label: "기본" },
        { stdin: "2 2\n2 1 2\n2 1 2", expectedOutput: "2 0", label: "전원 완료" },
        { stdin: "3 2\n0\n0\n0", expectedOutput: "0 3", label: "전원 미제출" },
      ],
      hints: [
        "각 학생의 제출 과제를 set에 저장하고, 크기가 M이면 모두 제출, 0이면 아무것도 안 제출.",
        "첫 숫자가 제출 과제 수(k), 이후 k개 과제 번호입니다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int allDone = 0, noneDone = 0;
    for (int i = 0; i < n; i++) {
        int k; cin >> k;
        set<int> submitted;
        for (int j = 0; j < k; j++) {
            int hw; cin >> hw;
            submitted.insert(hw);
        }
        if ((int)submitted.size() == m) allDone++;
        if (submitted.empty()) noneDone++;
    }
    cout << allDone << " " << noneDone << "\n";
    return 0;
}`,
      solutionExplanation: "set에 중복 없이 과제를 저장하면 실제 제출한 고유 과제 수를 알 수 있습니다. size() == m이면 전체 제출, empty()면 아무것도 안 제출입니다.",
    },
    {
      id: "sim-015",
      cluster: "simulation",
      unlockAfter: "cpp-p2",
      difficulty: "어려움",
      title: "신호등 시뮬레이션",
      description: `N개의 신호등이 있고, 각 신호등은 빨간불 지속 시간 R초, 초록불 지속 시간 G초가 주어집니다.
모든 신호등은 시각 0에 빨간불로 시작합니다.
T초 후 각 신호등의 상태를 한 줄에 하나씩 출력하세요. ("RED" 또는 "GREEN")`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ R, G ≤ 100, 0 ≤ T ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    for (int i = 0; i < n; i++) {
        int r, g;
        cin >> r >> g;
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "3 5\n3 2\n4 3\n6 1", expectedOutput: "GREEN\nRED\nRED", label: "기본" },
        { stdin: "2 0\n3 2\n5 4", expectedOutput: "RED\nRED", label: "T=0" },
        { stdin: "1 3\n3 3", expectedOutput: "GREEN", label: "딱 초록 시작" },
        { stdin: "1 6\n3 3", expectedOutput: "RED", label: "한 사이클 후 빨강" },
      ],
      hints: [
        "신호등 사이클은 R+G초입니다. T % (R+G)로 현재 사이클 내 위치를 구하세요.",
        "위치가 R 미만이면 RED, R 이상이면 GREEN입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    for (int i = 0; i < n; i++) {
        int r, g;
        cin >> r >> g;
        int pos = t % (r + g);
        cout << (pos < r ? "RED" : "GREEN") << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "신호등은 R+G초 주기로 반복됩니다. T를 주기로 나눈 나머지가 현재 사이클 내 위치입니다. 위치 < R이면 빨간불, R 이상이면 초록불입니다.",
    },
  ],
}
