import type { PracticeCluster } from "./types"

export const bankSimulationCluster: PracticeCluster = {
  id: "bank-sim",
  title: "시뮬레이션",
  emoji: "🎮",
  description: "문제 상황을 그대로 코드로 옮기기 — 상태를 추적하고 규칙대로 진행",
  en: {
    title: "Simulation",
    description:
      "Translate the problem scenario directly into code — track state and follow the rules",
  },
  unlockAfter: "cpp-p3",
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // EASY (bank-sim-001 ~ 006)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-sim-001",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "ATM 출금",
      description:
        "잔액 B원인 ATM에서 N번의 출금 요청이 순서대로 들어옵니다. 각 요청 금액이 현재 잔액 이하이면 출금하고 \"OK\"를 출력하고, 아니면 출금하지 않고 \"REJECTED\"를 출력하세요. 모든 처리 후 최종 잔액을 마지막 줄에 출력하세요.",
      constraints: "1 ≤ B ≤ 1000000, 1 ≤ N ≤ 100, 1 ≤ 각 요청 금액 ≤ 1000000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int b, n;
    cin >> b >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "100 3\n30\n80\n20",
          expectedOutput: "OK\nREJECTED\nOK\n50",
          label: "기본 케이스",
        },
        {
          stdin: "500 4\n100\n200\n300\n50",
          expectedOutput: "OK\nOK\nREJECTED\nOK\n150",
          label: "중간 케이스",
        },
        {
          stdin: "50 2\n50\n1",
          expectedOutput: "OK\nREJECTED\n0",
          label: "잔액 소진",
        },
      ],
      hints: [
        "잔액 변수를 만들고 각 요청을 순서대로 처리해보세요.",
        "요청 금액이 현재 잔액보다 크면 REJECTED, 이하이면 OK를 출력하고 잔액을 줄이세요.",
        "모든 요청을 처리한 후 최종 잔액을 출력합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int b, n;
    cin >> b >> n;
    for (int i = 0; i < n; i++) {
        int req;
        cin >> req;
        if (req <= b) {
            b -= req;
            cout << "OK\\n";
        } else {
            cout << "REJECTED\\n";
        }
    }
    cout << b << "\\n";
    return 0;
}`,
      solutionExplanation:
        "잔액 변수를 유지하면서 각 요청을 처리합니다. 요청 금액이 잔액 이하이면 잔액에서 차감하고 OK, 아니면 REJECTED를 출력합니다. 모든 처리 후 최종 잔액을 출력합니다.",
      en: {
        title: "ATM Withdrawal",
        description:
          'An ATM starts with balance B. Process N withdrawal requests in order. If the requested amount is at most the current balance, withdraw it and print "OK"; otherwise print "REJECTED" and do nothing. After all requests, print the final balance.',
        hints: [
          "Maintain a balance variable and process each request one by one.",
          'If the request amount exceeds the current balance, print "REJECTED". Otherwise print "OK" and subtract from the balance.',
          "After all requests are processed, print the final balance.",
        ],
        solutionExplanation:
          'Maintain the balance variable while processing each request. If the request is at most the balance, subtract and print "OK"; otherwise print "REJECTED". Print the final balance at the end.',
      },
    },
    {
      id: "bank-sim-002",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "신호등 시뮬레이션",
      description:
        "신호등이 초록 G초, 빨강 R초를 반복합니다. 초록이 먼저 켜집니다. T초 시점(1-indexed)에 신호가 \"GREEN\"인지 \"RED\"인지 출력하세요.",
      constraints: "1 ≤ G, R ≤ 100, 1 ≤ T ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int g, r, t;
    cin >> g >> r >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3 2 1", expectedOutput: "GREEN", label: "초록 구간 시작" },
        { stdin: "3 2 4", expectedOutput: "RED", label: "빨강 구간" },
        { stdin: "3 2 6", expectedOutput: "GREEN", label: "두 번째 사이클" },
      ],
      hints: [
        "신호등은 G+R 초 주기로 반복됩니다.",
        "T초가 사이클의 몇 번째 초인지 구하면 됩니다.",
        "(T-1) % (G+R) 값이 G 미만이면 GREEN, 아니면 RED입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int g, r, t;
    cin >> g >> r >> t;
    int pos = (t - 1) % (g + r);
    if (pos < g) cout << "GREEN\\n";
    else cout << "RED\\n";
    return 0;
}`,
      solutionExplanation:
        "한 사이클의 길이는 G+R초입니다. (T-1) % (G+R)로 현재 사이클 내 위치(0-indexed)를 구합니다. 이 값이 G 미만이면 초록 구간, G 이상이면 빨강 구간입니다.",
      en: {
        title: "Traffic Light Simulation",
        description:
          'A traffic light cycles through GREEN for G seconds then RED for R seconds, starting with GREEN. Given T (1-indexed), print "GREEN" or "RED".',
        hints: [
          "The cycle length is G+R seconds.",
          "Find which second within the cycle T falls on.",
          "If (T-1) % (G+R) < G, it is GREEN; otherwise RED.",
        ],
        solutionExplanation:
          "The cycle length is G+R. Compute (T-1) % (G+R) to get the 0-indexed position within the current cycle. If that position is less than G, the light is GREEN; otherwise RED.",
      },
    },
    {
      id: "bank-sim-003",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "박테리아 성장",
      description:
        "박테리아 N마리가 있습니다. 매 시간마다 각 박테리아는 2마리로 분열합니다. T시간 후 박테리아 수를 출력하세요.",
      constraints: "1 ≤ N ≤ 1000, 1 ≤ T ≤ 60",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    int t;
    cin >> n >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "1 3", expectedOutput: "8", label: "기본 케이스" },
        { stdin: "2 4", expectedOutput: "32", label: "초기 수 2" },
        { stdin: "5 1", expectedOutput: "10", label: "1시간 후" },
      ],
      hints: [
        "매 시간마다 박테리아 수가 2배가 됩니다.",
        "T시간 후 박테리아 수는 N × 2^T입니다.",
        "T가 최대 60이므로 long long을 사용하세요.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    int t;
    cin >> n >> t;
    long long result = n;
    for (int i = 0; i < t; i++) result *= 2;
    cout << result << "\\n";
    return 0;
}`,
      solutionExplanation:
        "매 시간마다 박테리아 수가 2배가 되므로 T시간 후에는 N × 2^T마리가 됩니다. T가 최대 60이고 N이 최대 1000이므로 결과는 long long 범위(약 9.2 × 10^18)를 초과하지 않습니다.",
      en: {
        title: "Bacteria Growth",
        description:
          "There are N bacteria. Each hour, every bacterium splits into 2. Print the number of bacteria after T hours.",
        hints: [
          "The bacteria count doubles every hour.",
          "After T hours the count is N × 2^T.",
          "Use long long because T can be up to 60.",
        ],
        solutionExplanation:
          "Each hour the count doubles, so after T hours there are N × 2^T bacteria. Since T ≤ 60 and N ≤ 1000, the result fits in a long long.",
      },
    },
    {
      id: "bank-sim-004",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "행진 시뮬레이션",
      description:
        "N명이 일렬로 서서 행진합니다. 맨 앞 사람은 초당 1미터씩 앞으로 이동하며, D미터 지점에 도달하면 멈춥니다. 초기 위치는 0입니다. T초 후 맨 앞 사람의 위치를 출력하세요.",
      constraints: "1 ≤ D ≤ 10000, 1 ≤ T ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int d, t;
    cin >> d >> t;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10 5", expectedOutput: "5", label: "목적지 전" },
        { stdin: "10 15", expectedOutput: "10", label: "목적지 초과" },
        { stdin: "100 100", expectedOutput: "100", label: "정확히 도착" },
      ],
      hints: [
        "T초 동안 T미터를 이동하지만, D미터를 넘을 수 없습니다.",
        "T와 D 중 작은 값이 최종 위치입니다.",
      ],
      solutionCode: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int d, t;
    cin >> d >> t;
    cout << min(t, d) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "T초 후 위치는 T이지만, 목적지 D를 초과할 수 없으므로 min(T, D)가 정답입니다.",
      en: {
        title: "March Simulation",
        description:
          "A marcher starts at position 0 and moves 1 meter per second, stopping once they reach D meters. Print their position after T seconds.",
        hints: [
          "The marcher moves T meters in T seconds but cannot exceed D.",
          "The answer is simply min(T, D).",
        ],
        solutionExplanation:
          "After T seconds the position would be T, but it cannot exceed D, so the answer is min(T, D).",
      },
    },
    {
      id: "bank-sim-005",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "자판기",
      description:
        "자판기가 잔액 0원으로 시작합니다. N번의 명령을 처리하세요.\n- INSERT X: 동전 X원 투입 (출력 없음)\n- BUY X: 가격 X원 음료 구매. 잔액이 충분하면 잔액에서 차감하고 \"OK\", 부족하면 \"NO\" 출력\n- RETURN: 현재 잔액을 출력하고 잔액을 0으로 초기화",
      constraints: "1 ≤ N ≤ 100, 1 ≤ X ≤ 10000",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    int balance = 0;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5\nINSERT 500\nBUY 300\nBUY 300\nINSERT 200\nRETURN",
          expectedOutput: "OK\nNO\n400",
          label: "기본 케이스",
        },
        {
          stdin: "3\nBUY 100\nINSERT 100\nBUY 100",
          expectedOutput: "NO\nOK",
          label: "잔액 부족 후 충전",
        },
        {
          stdin: "2\nINSERT 50\nRETURN",
          expectedOutput: "50",
          label: "환불만",
        },
      ],
      hints: [
        "잔액 변수를 하나 유지하면서 각 명령에 따라 업데이트합니다.",
        "명령어 문자열을 읽고 INSERT, BUY, RETURN을 구분하세요.",
        "BUY는 잔액 비교, INSERT는 잔액 증가, RETURN은 잔액 출력 후 0으로 초기화합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    int balance = 0;
    for (int i = 0; i < n; i++) {
        string cmd;
        cin >> cmd;
        if (cmd == "INSERT") {
            int x; cin >> x;
            balance += x;
        } else if (cmd == "BUY") {
            int x; cin >> x;
            if (balance >= x) {
                balance -= x;
                cout << "OK\\n";
            } else {
                cout << "NO\\n";
            }
        } else { // RETURN
            cout << balance << "\\n";
            balance = 0;
        }
    }
    return 0;
}`,
      solutionExplanation:
        "잔액 변수 하나를 유지합니다. INSERT는 잔액에 더하고, BUY는 잔액 비교 후 차감 또는 NO 출력, RETURN은 잔액을 출력하고 0으로 초기화합니다.",
      en: {
        title: "Vending Machine",
        description:
          'A vending machine starts with balance 0. Process N commands:\n- INSERT X: add X to the balance (no output)\n- BUY X: if balance >= X subtract and print "OK"; else print "NO"\n- RETURN: print the current balance and reset it to 0',
        hints: [
          "Maintain a single balance variable and update it per command.",
          "Read the command string and branch on INSERT, BUY, or RETURN.",
          "BUY compares, INSERT adds, RETURN prints then resets.",
        ],
        solutionExplanation:
          'Maintain a balance variable. INSERT adds to it, BUY checks and subtracts (printing "OK") or prints "NO", and RETURN prints the balance then resets to 0.',
      },
    },
    {
      id: "bank-sim-006",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "쉬움",
      title: "달리기 기록",
      description:
        "N명의 선수가 달리기를 합니다. 각 선수의 이름과 기록(초)이 주어질 때, 빠른 순서대로 순위, 이름, 기록을 출력하세요. 동률은 없습니다.",
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 기록 ≤ 10000, 이름은 알파벳 최대 20자",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\nAlice 52\nBob 45\nCarol 58\nDave 47",
          expectedOutput: "1 Bob 45\n2 Dave 47\n3 Alice 52\n4 Carol 58",
          label: "기본 케이스",
        },
        {
          stdin: "2\nX 100\nY 50",
          expectedOutput: "1 Y 50\n2 X 100",
          label: "2명",
        },
        {
          stdin: "3\nA 10\nB 20\nC 15",
          expectedOutput: "1 A 10\n2 C 15\n3 B 20",
          label: "3명",
        },
      ],
      hints: [
        "이름과 기록을 함께 저장할 방법이 필요합니다.",
        "pair<int, string>으로 (기록, 이름)을 저장하면 기록 기준으로 정렬할 수 있습니다.",
        "정렬 후 1-indexed 순위와 함께 출력합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, string>> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i].second >> v[i].first;
    }
    sort(v.begin(), v.end());
    for (int i = 0; i < n; i++) {
        cout << (i + 1) << " " << v[i].second << " " << v[i].first << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "pair<int, string>에 (기록, 이름)을 저장합니다. pair는 첫 번째 요소 기준으로 정렬되므로 기록이 자동으로 오름차순 정렬됩니다. 순위는 1-indexed로 출력합니다.",
      en: {
        title: "Race Results",
        description:
          "N runners each have a name and finish time (seconds). Print the rankings in order from fastest to slowest: rank, name, time. No ties.",
        hints: [
          "You need to store name and time together.",
          "Use pair<int, string> with (time, name) so sorting by time is automatic.",
          "After sorting, print each entry with a 1-indexed rank.",
        ],
        solutionExplanation:
          "Store (time, name) in pair<int, string>. Pairs sort by the first element by default, so sorting gives ascending order by time. Print each entry with its 1-indexed rank.",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // MEDIUM (bank-sim-007 ~ 015)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-sim-007",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "도서관 대출 관리",
      description:
        "도서관에 책이 N권 있고 각 책은 코드와 초기 대출 가능 여부(1=가능, 0=대출중)로 시작합니다. M개의 명령을 처리하세요.\n- BORROW code: 해당 코드의 책 대출. 가능하면 \"OK\", 이미 대출중이면 \"ALREADY_OUT\" 출력\n- RETURN code: 반납. 대출중이었으면 \"OK\", 대출중이 아니었으면 \"NOT_OUT\" 출력\n- STATUS code: 현재 상태 \"AVAILABLE\" 또는 \"BORROWED\" 출력",
      constraints: "1 ≤ N, M ≤ 1000, 책 코드는 1~10000 사이 정수",
      initialCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    map<int, bool> available; // true = 대출 가능
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin:
            "3 5\n101 1\n202 0\n303 1\nBORROW 101\nBORROW 202\nSTATUS 101\nRETURN 101\nSTATUS 101",
          expectedOutput: "OK\nALREADY_OUT\nBORROWED\nOK\nAVAILABLE",
          label: "기본 케이스",
        },
        {
          stdin: "2 3\n1 1\n2 1\nBORROW 1\nBORROW 1\nRETURN 1",
          expectedOutput: "OK\nALREADY_OUT\nOK",
          label: "같은 책 중복 대출",
        },
        {
          stdin: "2 2\n10 0\n20 1\nRETURN 10\nSTATUS 10",
          expectedOutput: "NOT_OUT\nAVAILABLE",
          label: "반납 오류",
        },
      ],
      hints: [
        "책 코드를 키로, 대출 가능 여부를 값으로 저장하는 map을 사용하세요.",
        "BORROW: available[code]가 true이면 false로 바꾸고 OK, 아니면 ALREADY_OUT.",
        "RETURN: available[code]가 false이면 true로 바꾸고 OK, 아니면 NOT_OUT.",
      ],
      solutionCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    map<int, bool> available;
    for (int i = 0; i < n; i++) {
        int code, status;
        cin >> code >> status;
        available[code] = (status == 1);
    }
    for (int i = 0; i < m; i++) {
        string cmd;
        cin >> cmd;
        if (cmd == "BORROW") {
            int code; cin >> code;
            if (available[code]) {
                available[code] = false;
                cout << "OK\\n";
            } else {
                cout << "ALREADY_OUT\\n";
            }
        } else if (cmd == "RETURN") {
            int code; cin >> code;
            if (!available[code]) {
                available[code] = true;
                cout << "OK\\n";
            } else {
                cout << "NOT_OUT\\n";
            }
        } else { // STATUS
            int code; cin >> code;
            cout << (available[code] ? "AVAILABLE" : "BORROWED") << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation:
        "map<int, bool>으로 책 코드별 대출 가능 여부를 추적합니다. BORROW는 available이 true일 때만 false로 전환, RETURN은 false일 때만 true로 전환합니다. STATUS는 현재 상태를 조회합니다.",
      en: {
        title: "Library Loan Management",
        description:
          'A library has N books, each with a code and initial status (1=available, 0=borrowed). Process M commands:\n- BORROW code: borrow if available ("OK") else "ALREADY_OUT"\n- RETURN code: return if borrowed ("OK") else "NOT_OUT"\n- STATUS code: print "AVAILABLE" or "BORROWED"',
        hints: [
          "Use a map with book code as key and availability as the boolean value.",
          'BORROW: if available[code] is true, set to false and print "OK"; else print "ALREADY_OUT".',
          'RETURN: if available[code] is false, set to true and print "OK"; else print "NOT_OUT".',
        ],
        solutionExplanation:
          "A map<int, bool> tracks each book's availability. BORROW flips true→false (or rejects), RETURN flips false→true (or rejects), STATUS just reads the value.",
      },
    },
    {
      id: "bank-sim-008",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "버스 승하차",
      description:
        "버스가 N개 정류장을 순서대로 방문합니다. 각 정류장에서 먼저 하차가 이루어진 후 승차가 이루어집니다. 각 정류장에서 하차 인원과 승차 인원이 주어질 때, 각 정류장 출발 시 버스 탑승 인원을 출력하세요. 처음 버스에 탑승한 승객은 없습니다.",
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 하차/승차 인원 ≤ 100, 탑승 인원이 음수가 되는 입력은 없음",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int passengers = 0;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\n0 3\n1 2\n2 1\n1 0",
          expectedOutput: "3\n4\n3\n2",
          label: "기본 케이스",
        },
        {
          stdin: "3\n0 10\n5 5\n10 0",
          expectedOutput: "10\n10\n0",
          label: "정류장 종점",
        },
        {
          stdin: "2\n0 1\n1 1",
          expectedOutput: "1\n1",
          label: "소규모",
        },
      ],
      hints: [
        "현재 탑승 인원을 변수에 유지하면서 각 정류장마다 업데이트합니다.",
        "각 정류장에서 먼저 하차 인원을 빼고, 그 다음 승차 인원을 더합니다.",
        "승하차 후 탑승 인원을 출력합니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int passengers = 0;
    for (int i = 0; i < n; i++) {
        int off, on;
        cin >> off >> on;
        passengers -= off;
        passengers += on;
        cout << passengers << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "탑승 인원 변수를 유지하면서 각 정류장마다 하차 인원을 빼고 승차 인원을 더합니다. 순서(먼저 하차 후 승차)가 중요합니다. 처리 후 출발 시 인원을 출력합니다.",
      en: {
        title: "Bus Passengers",
        description:
          "A bus visits N stops in order. At each stop, passengers alight first, then board. Given the number of alighting and boarding passengers at each stop, print the number of passengers on the bus when it departs from each stop. The bus starts empty.",
        hints: [
          "Maintain a passenger count variable and update it at each stop.",
          "At each stop, subtract the alighting passengers first, then add the boarding passengers.",
          "Print the count after each stop.",
        ],
        solutionExplanation:
          "Maintain the passenger count. At each stop subtract departing passengers first, then add boarding passengers. The order matters. Print the count after processing each stop.",
      },
    },
    {
      id: "bank-sim-009",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "카드 전쟁",
      description:
        "두 플레이어 A, B가 각각 N장의 카드를 가집니다. 카드는 앞에서부터 꺼냅니다. 매 라운드 양쪽 맨 앞 카드를 비교해 큰 쪽이 두 장 모두 자기 패 맨 뒤에 넣습니다. 같으면 둘 다 버립니다. 카드가 없는 쪽이 지면 이긴 쪽(\"A\" 또는 \"B\")을 출력하세요. 동시에 없어지거나 1000라운드 후에도 끝나지 않으면 \"DRAW\"를 출력합니다.",
      constraints: "1 ≤ N ≤ 10, 1 ≤ 카드 숫자 ≤ 100",
      initialCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    int n;
    cin >> n;
    deque<int> a, b;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3\n9 9 9\n1 1 1",
          expectedOutput: "A",
          label: "A가 항상 이김",
        },
        {
          stdin: "2\n2 2\n2 2",
          expectedOutput: "DRAW",
          label: "동점으로 모두 소멸",
        },
        {
          stdin: "3\n1 1 1\n9 9 9",
          expectedOutput: "B",
          label: "B가 항상 이김",
        },
      ],
      hints: [
        "deque를 사용하면 앞에서 꺼내고 뒤에 넣는 것이 쉽습니다.",
        "매 라운드 양쪽 front()를 비교하고 pop_front()로 꺼낸 뒤, 이긴 쪽의 push_back()을 호출하세요.",
        "라운드 수가 1000을 초과하거나 둘 다 비면 DRAW입니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    int n;
    cin >> n;
    deque<int> a, b;
    for (int i = 0; i < n; i++) { int x; cin >> x; a.push_back(x); }
    for (int i = 0; i < n; i++) { int x; cin >> x; b.push_back(x); }
    int rounds = 0;
    while (!a.empty() && !b.empty() && rounds < 1000) {
        int ca = a.front(); a.pop_front();
        int cb = b.front(); b.pop_front();
        if (ca > cb) {
            a.push_back(ca);
            a.push_back(cb);
        } else if (cb > ca) {
            b.push_back(cb);
            b.push_back(ca);
        }
        // 동점: 둘 다 버림
        rounds++;
    }
    if (a.empty() && b.empty()) cout << "DRAW\\n";
    else if (a.empty()) cout << "B\\n";
    else if (b.empty()) cout << "A\\n";
    else cout << "DRAW\\n";
    return 0;
}`,
      solutionExplanation:
        "deque로 두 패를 관리합니다. 매 라운드 front() 비교 후 pop_front()로 꺼내고, 이긴 쪽의 패 맨 뒤에 두 장을 push_back()합니다. 동점이면 둘 다 버립니다. 1000라운드 후 종료되지 않으면 DRAW입니다.",
      en: {
        title: "Card War",
        description:
          "Players A and B each hold N cards, drawn from the front. Each round, both draw their front card. The player with the higher card wins both (adds them to their back). Equal cards are discarded. The player who runs out of cards loses. Print the winner (\"A\" or \"B\"), or \"DRAW\" if both empty simultaneously or 1000 rounds pass.",
        hints: [
          "Use a deque so drawing from the front and adding to the back is straightforward.",
          "Each round, compare front() of both, pop_front(), and push_back() the cards to the winner.",
          "If the round count exceeds 1000 or both are empty, print DRAW.",
        ],
        solutionExplanation:
          "Manage two deques. Each round compare and pop the front cards; the winner pushes both to the back. Equal cards are discarded. If 1000 rounds pass without a winner, or both empty simultaneously, output DRAW.",
      },
    },
    {
      id: "bank-sim-010",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "계좌 이체",
      description:
        "N개의 계좌(1번~N번)가 있고 M번의 이체가 일어납니다. 각 계좌는 초기 잔액이 주어집니다. 이체 시 출금 계좌의 잔액이 이체 금액 이상이면 이체 성공 \"OK\", 부족하면 \"FAIL\"을 출력합니다. 모든 이체 처리 후 계좌 1번부터 N번까지 잔액을 한 줄에 하나씩 출력하세요.",
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 1000, 0 ≤ 초기 잔액 ≤ 10^6, 1 ≤ 이체 금액 ≤ 10^6",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> acc(n + 1);
    for (int i = 1; i <= n; i++) cin >> acc[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n100 200 300\n1 2 50\n2 3 300\n3 1 100",
          expectedOutput: "OK\nFAIL\nOK\n150\n150\n200",
          label: "기본 케이스",
        },
        {
          stdin: "2 2\n1000 0\n1 2 500\n2 1 200",
          expectedOutput: "OK\nOK\n700\n300",
          label: "연속 이체",
        },
        {
          stdin: "2 1\n100 100\n1 2 101",
          expectedOutput: "FAIL\n100\n100",
          label: "이체 실패",
        },
      ],
      hints: [
        "계좌 잔액을 배열에 저장합니다. 1-indexed가 편합니다.",
        "이체 시 출금 계좌 잔액이 이체 금액 이상인지 확인합니다.",
        "FAIL이면 잔액을 바꾸지 않습니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> acc(n + 1);
    for (int i = 1; i <= n; i++) cin >> acc[i];
    for (int i = 0; i < m; i++) {
        int from, to;
        long long amount;
        cin >> from >> to >> amount;
        if (acc[from] >= amount) {
            acc[from] -= amount;
            acc[to] += amount;
            cout << "OK\\n";
        } else {
            cout << "FAIL\\n";
        }
    }
    for (int i = 1; i <= n; i++) cout << acc[i] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "1-indexed 배열로 잔액을 관리합니다. 각 이체마다 출금 계좌 잔액이 충분하면 이체를 수행하고 OK, 아니면 잔액을 건드리지 않고 FAIL을 출력합니다. 마지막에 모든 계좌 잔액을 출력합니다.",
      en: {
        title: "Bank Transfer",
        description:
          "There are N accounts (1 to N) with given initial balances and M transfers. Each transfer: if the sender has enough balance print \"OK\" and execute; otherwise print \"FAIL\". After all transfers, print each account's balance from 1 to N.",
        hints: [
          "Store balances in a 1-indexed array.",
          "For each transfer, check if the sender's balance is at least the amount.",
          "On FAIL, do not change any balances.",
        ],
        solutionExplanation:
          "Maintain balances in a 1-indexed array. For each transfer check if sender has enough; if yes execute and print OK, otherwise print FAIL without changing balances. Finally print all balances.",
      },
    },
    {
      id: "bank-sim-011",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "롤러코스터",
      description:
        "놀이공원 롤러코스터 대기줄에 N명이 기다립니다. 롤러코스터는 한 번에 최대 C명을 태울 수 있고, 앞에서부터 C명씩 탑승시킵니다. 총 몇 번 운행해야 모든 사람이 탑승하는지와 마지막 운행의 탑승 인원을 출력하세요.",
      constraints: "1 ≤ N ≤ 10000, 1 ≤ C ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n, c;
    cin >> n >> c;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "10 3", expectedOutput: "4\n1", label: "나머지 있음" },
        { stdin: "9 3", expectedOutput: "3\n3", label: "딱 나눠떨어짐" },
        { stdin: "1 100", expectedOutput: "1\n1", label: "한 명" },
      ],
      hints: [
        "N명을 C명씩 나누면 몇 번 운행해야 할지 계산할 수 있습니다.",
        "총 운행 횟수는 올림 나눗셈인 (N + C - 1) / C입니다.",
        "마지막 탑승 인원은 N % C가 0이면 C, 아니면 N % C입니다.",
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n, c;
    cin >> n >> c;
    int runs = (n + c - 1) / c;
    int last = (n % c == 0) ? c : n % c;
    cout << runs << "\\n" << last << "\\n";
    return 0;
}`,
      solutionExplanation:
        "총 운행 횟수는 (N + C - 1) / C로 올림 나눗셈을 구합니다. 마지막 운행 탑승 인원은 N이 C로 나누어 떨어지면 C, 아니면 N % C입니다.",
      en: {
        title: "Roller Coaster",
        description:
          "N people are waiting for a roller coaster that can carry up to C people per ride. People board from the front, C at a time. Print the total number of rides needed and the number of passengers on the last ride.",
        hints: [
          "Dividing N people into groups of C tells you the number of rides.",
          "Total rides = ceiling division = (N + C - 1) / C.",
          "The last ride carries N % C people, or C if N is divisible by C.",
        ],
        solutionExplanation:
          "Total rides = (N + C - 1) / C (ceiling division). The last ride carries N % C passengers, or C if the remainder is zero.",
      },
    },
    {
      id: "bank-sim-012",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "숫자 야구",
      description:
        "4자리 숫자(각 자리 0~9, 중복 없음)로 숫자 야구 게임을 합니다. 정답 secret과 추측 guess가 주어질 때, 자리와 숫자가 모두 같으면 스트라이크, 숫자는 있지만 자리가 다르면 볼입니다. 스트라이크와 볼 수를 \"X스트라이크 Y볼\" 형식으로 출력하세요.",
      constraints: "secret과 guess는 각각 4자리 정수. 각 자리 숫자는 중복 없음 (0 포함 가능)",
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string secret, guess;
    cin >> secret >> guess;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "1234 1234",
          expectedOutput: "4스트라이크 0볼",
          label: "완전 일치",
        },
        {
          stdin: "1234 4321",
          expectedOutput: "0스트라이크 4볼",
          label: "모두 볼",
        },
        {
          stdin: "1234 1325",
          expectedOutput: "1스트라이크 2볼",
          label: "혼합",
        },
      ],
      hints: [
        "같은 위치에서 같은 숫자이면 스트라이크입니다.",
        "다른 위치에 있지만 secret에 존재하는 숫자이면 볼입니다.",
        "문자열로 받아 한 자리씩 비교하면 편합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string secret, guess;
    cin >> secret >> guess;
    int strikes = 0, balls = 0;
    for (int i = 0; i < 4; i++) {
        if (secret[i] == guess[i]) {
            strikes++;
        } else {
            for (int j = 0; j < 4; j++) {
                if (i != j && secret[j] == guess[i]) {
                    balls++;
                    break;
                }
            }
        }
    }
    cout << strikes << "스트라이크 " << balls << "볼\\n";
    return 0;
}`,
      solutionExplanation:
        "각 자리를 순회하며 같은 위치에 같은 숫자이면 스트라이크로 카운트합니다. 스트라이크가 아닌 자리에 대해 guess[i]가 secret의 다른 위치에 있으면 볼로 카운트합니다. 각 자리 숫자에 중복이 없으므로 break로 중복 카운트를 방지합니다.",
      en: {
        title: "Number Baseball",
        description:
          "Play a 4-digit number baseball game. Given secret and guess (each has 4 digits, no repeats). Same digit at same position = strike. Digit exists but at wrong position = ball. Print in format \"Xstrike Yball\".",
        hints: [
          "A strike is when the digit and position both match.",
          "A ball is when the digit exists in secret but at a different position.",
          "Read as strings and compare character by character.",
        ],
        solutionExplanation:
          "Iterate over each digit position. If secret[i] == guess[i], it is a strike. Otherwise check if guess[i] appears elsewhere in secret (any j where i != j); if so, count a ball. Break after finding one match to avoid double-counting.",
      },
    },
    {
      id: "bank-sim-013",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "주차장 관리",
      description:
        "주차장에 N개의 자리(1번~N번)가 있습니다. M개의 이벤트를 처리하세요.\n- PARK id: 차량 id 입차. 빈 자리 중 번호가 가장 작은 자리에 배정. 자리 있으면 자리 번호 출력, 없으면 \"FULL\"\n- EXIT id: 차량 id 출차. 해당 자리를 비우고 \"OK\" 출력\n- STATUS: 현재 주차된 차량 수 출력",
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 1000, id는 1~10000 사이 정수",
      initialCode: `#include <iostream>
#include <set>
#include <map>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    set<int> freeSlots;
    map<int, int> carToSlot; // car id -> slot
    for (int i = 1; i <= n; i++) freeSlots.insert(i);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "3 6\nPARK 1\nPARK 2\nPARK 3\nPARK 4\nEXIT 2\nPARK 5",
          expectedOutput: "1\n2\n3\nFULL\nOK\n2",
          label: "기본 케이스",
        },
        {
          stdin: "2 4\nPARK 100\nEXIT 100\nPARK 200\nSTATUS",
          expectedOutput: "1\nOK\n1\n1",
          label: "입출차 후 상태",
        },
        {
          stdin: "1 3\nPARK 1\nPARK 2\nSTATUS",
          expectedOutput: "1\nFULL\n1",
          label: "자리 1개",
        },
      ],
      hints: [
        "빈 자리를 set에 저장하면 가장 작은 번호를 빠르게 찾을 수 있습니다.",
        "PARK: freeSlots가 비어있으면 FULL, 아니면 begin()으로 가장 작은 자리를 가져옵니다.",
        "EXIT: carToSlot[id]로 자리 번호를 찾아 freeSlots에 반환합니다.",
      ],
      solutionCode: `#include <iostream>
#include <set>
#include <map>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    set<int> freeSlots;
    map<int, int> carToSlot;
    for (int i = 1; i <= n; i++) freeSlots.insert(i);
    for (int i = 0; i < m; i++) {
        string cmd;
        cin >> cmd;
        if (cmd == "PARK") {
            int id; cin >> id;
            if (freeSlots.empty()) {
                cout << "FULL\\n";
            } else {
                int slot = *freeSlots.begin();
                freeSlots.erase(freeSlots.begin());
                carToSlot[id] = slot;
                cout << slot << "\\n";
            }
        } else if (cmd == "EXIT") {
            int id; cin >> id;
            int slot = carToSlot[id];
            carToSlot.erase(id);
            freeSlots.insert(slot);
            cout << "OK\\n";
        } else { // STATUS
            cout << (int)carToSlot.size() << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation:
        "set으로 빈 자리를 관리하면 begin()으로 가장 작은 번호를 O(log N)에 가져올 수 있습니다. map으로 차량 id와 자리 번호를 연결합니다. EXIT 시 자리를 set에 돌려주고 map에서 제거합니다.",
      en: {
        title: "Parking Lot Management",
        description:
          'A parking lot has N slots (1 to N). Process M events:\n- PARK id: assign the smallest available slot; print slot number or "FULL"\n- EXIT id: free the slot occupied by car id and print "OK"\n- STATUS: print the number of currently parked cars',
        hints: [
          "Store free slots in a set; begin() gives the smallest available slot.",
          "PARK: if the set is empty print FULL; otherwise take *begin() and erase it.",
          "EXIT: look up the car's slot in the map, return it to the set, and remove from the map.",
        ],
        solutionExplanation:
          "A set keeps free slots sorted, so begin() is always the smallest. A map links car IDs to slot numbers. EXIT returns the slot to the set and removes the entry from the map.",
      },
    },
    {
      id: "bank-sim-014",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "게임 점수판",
      description:
        "N명의 플레이어가 게임을 합니다. 모든 플레이어는 초기 점수 0점입니다. M개의 이벤트를 처리하세요.\n- SCORE name points: name 플레이어에게 points 점수 추가\n- PENALTY name: name 플레이어 점수 10점 차감 (0 미만이면 0으로 유지)\n- TOP k: 점수 내림차순으로 상위 k명의 이름과 점수 출력 (동점이면 이름 오름차순)",
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 1000, 이름은 알파벳 최대 10자, 1 ≤ points ≤ 10000",
      initialCode: `#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    map<string, int> scores;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin:
            "3 5\nAlice Bob Carol\nSCORE Alice 100\nSCORE Bob 80\nSCORE Carol 100\nPENALTY Bob\nTOP 2",
          expectedOutput: "Alice 100\nCarol 100",
          label: "기본 케이스",
        },
        {
          stdin: "2 3\nX Y\nSCORE X 50\nSCORE Y 50\nTOP 2",
          expectedOutput: "X 50\nY 50",
          label: "동점 이름순",
        },
        {
          stdin: "3 4\nA B C\nSCORE A 30\nPENALTY A\nSCORE B 25\nTOP 1",
          expectedOutput: "B 25",
          label: "페널티 후 순위",
        },
      ],
      hints: [
        "map<string, int>으로 플레이어 이름과 점수를 관리합니다.",
        "TOP k 처리 시 vector<pair<int,string>>으로 옮겨서 정렬합니다.",
        "점수 내림차순, 동점 시 이름 오름차순으로 정렬하려면 커스텀 비교 함수가 필요합니다.",
      ],
      solutionCode: `#include <iostream>
#include <map>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    map<string, int> scores;
    for (int i = 0; i < n; i++) {
        string name; cin >> name;
        scores[name] = 0;
    }
    for (int i = 0; i < m; i++) {
        string cmd; cin >> cmd;
        if (cmd == "SCORE") {
            string name; int pts;
            cin >> name >> pts;
            scores[name] += pts;
        } else if (cmd == "PENALTY") {
            string name; cin >> name;
            scores[name] = max(0, scores[name] - 10);
        } else { // TOP
            int k; cin >> k;
            vector<pair<int, string>> v;
            for (auto& p : scores) v.push_back({p.second, p.first});
            sort(v.begin(), v.end(), [](const pair<int,string>& a, const pair<int,string>& b) {
                if (a.first != b.first) return a.first > b.first;
                return a.second < b.second;
            });
            for (int j = 0; j < k; j++) {
                cout << v[j].second << " " << v[j].first << "\\n";
            }
        }
    }
    return 0;
}`,
      solutionExplanation:
        "map으로 플레이어 점수를 관리합니다. TOP k 요청 시 map의 내용을 vector<pair<int,string>>으로 옮겨서 점수 내림차순, 동점이면 이름 오름차순으로 정렬합니다. 상위 k개를 출력합니다.",
      en: {
        title: "Game Scoreboard",
        description:
          "N players each start with 0 points. Process M events:\n- SCORE name points: add points to player\n- PENALTY name: subtract 10 (minimum 0)\n- TOP k: print the top k players by score descending; ties broken by name ascending",
        hints: [
          "Use map<string, int> for player scores.",
          "For TOP k, copy the map to a vector<pair<int,string>> and sort it.",
          "Sort descending by score, then ascending by name on ties using a custom comparator.",
        ],
        solutionExplanation:
          "A map manages scores. For TOP k, copy to a vector of (score, name) pairs, sort with a custom comparator (descending score, ascending name on tie), and print the first k entries.",
      },
    },
    {
      id: "bank-sim-015",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "보통",
      title: "버블 정렬 교환 횟수",
      description:
        "N개의 정수를 버블 정렬로 오름차순 정렬할 때 총 몇 번의 교환이 발생하는지 출력하세요. 버블 정렬은 인접한 두 원소가 역순일 때마다 교환합니다.",
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 각 수 ≤ 10000",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n5 4 3 2 1", expectedOutput: "10", label: "역순 정렬" },
        { stdin: "4\n1 2 3 4", expectedOutput: "0", label: "이미 정렬됨" },
        { stdin: "4\n2 1 4 3", expectedOutput: "2", label: "부분 역순" },
      ],
      hints: [
        "버블 정렬 그대로 구현하면서 교환할 때마다 카운터를 증가시키세요.",
        "이중 반복문을 사용합니다. 바깥 반복문은 0부터 n-1까지, 안쪽은 0부터 n-i-2까지입니다.",
        "a[j] > a[j+1]이면 swap하고 카운트를 늘립니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int count = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                count++;
            }
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "버블 정렬을 직접 구현하면서 교환이 발생할 때마다 카운터를 늘립니다. 버블 정렬의 교환 횟수는 배열의 역전 쌍(inversion) 개수와 동일합니다. [5,4,3,2,1]은 역전 쌍이 4+3+2+1=10개입니다.",
      en: {
        title: "Bubble Sort Swap Count",
        description:
          "Given N integers, count the total number of swaps performed when sorting them with bubble sort (ascending order). Bubble sort swaps adjacent elements whenever they are out of order.",
        hints: [
          "Implement bubble sort directly and increment a counter each time you swap.",
          "Use a double loop: outer from 0 to n-1, inner from 0 to n-i-2.",
          "If a[j] > a[j+1], swap and increment the count.",
        ],
        solutionExplanation:
          "Implement bubble sort literally, counting each swap. The number of swaps equals the number of inversions in the array. [5,4,3,2,1] has 4+3+2+1=10 inversions.",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // HARD (bank-sim-016 ~ 020)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "bank-sim-016",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "엘리베이터 이동 거리",
      description:
        "엘리베이터가 0층에서 시작합니다. N개의 요청이 순서대로 들어오며, 각 요청 층으로 이동합니다. 이전 위치에서 요청 층까지의 이동 거리의 합을 출력하세요.",
      constraints: "1 ≤ N ≤ 1000, 0 ≤ 요청 층 ≤ 100",
      initialCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n3 5 1 4", expectedOutput: "12", label: "기본 케이스" },
        { stdin: "3\n2 5 1", expectedOutput: "9", label: "위아래 반복" },
        { stdin: "5\n0 0 0 0 0", expectedOutput: "0", label: "제자리" },
      ],
      hints: [
        "현재 층 변수를 0으로 시작합니다.",
        "각 요청마다 abs(요청층 - 현재층)을 총 이동 거리에 더합니다.",
        "이동 후 현재 층을 요청 층으로 업데이트합니다.",
      ],
      solutionCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int cur = 0, total = 0;
    for (int i = 0; i < n; i++) {
        int req; cin >> req;
        total += abs(req - cur);
        cur = req;
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "현재 층을 추적하면서 각 요청마다 현재 층과 요청 층의 절댓값 차이를 누적합니다. 각 이동 후 현재 층을 갱신합니다.",
      en: {
        title: "Elevator Travel Distance",
        description:
          "An elevator starts at floor 0. Process N requests in order, moving to each requested floor. Print the total distance traveled (sum of absolute differences between consecutive positions).",
        hints: [
          "Track the current floor, starting at 0.",
          "For each request, add abs(requested - current) to the total.",
          "Update the current floor to the requested floor after each move.",
        ],
        solutionExplanation:
          "Track the current floor and accumulate the absolute difference between the current and requested floor for each request. Update the current floor after each move.",
      },
    },
    {
      id: "bank-sim-017",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "소행성 충돌",
      description:
        "1차원 공간에 N개의 소행성이 있습니다. 각 소행성은 크기(양수)와 방향(R=오른쪽, L=왼쪽)을 가지며 모두 같은 속도로 이동합니다. 서로 다른 방향으로 마주치면 충돌합니다. 충돌 시 큰 것이 살아남고, 크기가 같으면 둘 다 소멸합니다. 같은 방향 소행성은 충돌하지 않습니다. 최종적으로 남은 소행성들의 크기와 방향을 왼쪽부터 공백으로 구분하여 출력하세요. 남은 소행성이 없으면 빈 줄을 출력하세요.",
      constraints: "1 ≤ N ≤ 500, 1 ≤ 크기 ≤ 1000. 입력 형식: 크기방향 (예: 5R, 10L)",
      initialCode: `#include <iostream>
#include <stack>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5\n5R 10R 5L 15R 20L",
          expectedOutput: "20L",
          label: "연쇄 충돌",
        },
        {
          stdin: "4\n5R 3L 10R 10L",
          expectedOutput: "5R",
          label: "동점 소멸 포함",
        },
        {
          stdin: "3\n1R 2R 3L",
          expectedOutput: "3L",
          label: "연속 소멸",
        },
      ],
      hints: [
        "스택을 이용해 왼쪽부터 차례로 소행성을 처리합니다.",
        "현재 소행성이 L 방향이고 스택 top이 R 방향이면 충돌입니다.",
        "충돌 시 크기를 비교해 처리하고, 현재 소행성이 살아남으면 계속 스택 top과 비교합니다.",
      ],
      solutionCode: `#include <iostream>
#include <stack>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,char>> asteroids(n);
    for (int i = 0; i < n; i++) {
        string s; cin >> s;
        asteroids[i].second = s.back();
        asteroids[i].first = stoi(s.substr(0, s.size() - 1));
    }
    stack<pair<int,char>> st;
    for (auto& ast : asteroids) {
        bool alive = true;
        while (alive && !st.empty() && st.top().second == 'R' && ast.second == 'L') {
            if (st.top().first < ast.first) {
                st.pop();
            } else if (st.top().first == ast.first) {
                st.pop();
                alive = false;
            } else {
                alive = false;
            }
        }
        if (alive) st.push(ast);
    }
    vector<pair<int,char>> result;
    while (!st.empty()) { result.push_back(st.top()); st.pop(); }
    if (result.empty()) {
        cout << "\\n";
    } else {
        for (int i = (int)result.size() - 1; i >= 0; i--) {
            if (i < (int)result.size() - 1) cout << " ";
            cout << result[i].first << result[i].second;
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "스택 기반으로 처리합니다. 각 소행성에 대해 L방향이고 스택 top이 R방향이면 충돌을 시뮬레이션합니다. 크기 비교로 누가 살아남는지 결정하고, 현재 소행성이 살아있는 동안 스택 top과 계속 비교합니다. 스택에 남은 결과를 역순으로 출력합니다.",
      en: {
        title: "Asteroid Collision",
        description:
          "N asteroids travel in 1D space, each with a size and direction (R=right, L=left) at the same speed. When a right-moving and left-moving asteroid meet, the larger one survives; equal sizes both explode. Same-direction asteroids never collide. Print the remaining asteroids left to right. Print an empty line if none remain.",
        hints: [
          "Use a stack and process asteroids left to right.",
          "A collision occurs when the current asteroid is L and the stack top is R.",
          "Compare sizes to determine the survivor; if the current asteroid survives, keep checking against the new stack top.",
        ],
        solutionExplanation:
          "Process with a stack. When a new L-asteroid arrives and the top is R, simulate the collision by comparing sizes. Keep colliding while the current asteroid survives. Push survivors onto the stack. Output the remaining stack contents in order.",
      },
    },
    {
      id: "bank-sim-018",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "프린터 우선순위",
      description:
        "N개의 문서가 대기열에 있고 각 문서는 우선순위(1~9, 높을수록 먼저)를 가집니다. 프린터는 맨 앞 문서를 꺼내고, 대기열에 더 높은 우선순위의 문서가 있으면 맨 뒤로 보냅니다. 없으면 출력합니다. M번째로 출력되는 문서가 원래 몇 번째(1-indexed) 위치에 있었는지 출력하세요.",
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ N, 1 ≤ 우선순위 ≤ 9",
      initialCode: `#include <iostream>
#include <deque>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4 1\n1 2 3 4",
          expectedOutput: "4",
          label: "첫 번째 출력",
        },
        {
          stdin: "4 2\n1 2 3 4",
          expectedOutput: "3",
          label: "두 번째 출력",
        },
        {
          stdin: "5 2\n3 1 2 3 2",
          expectedOutput: "4",
          label: "동점 처리",
        },
      ],
      hints: [
        "(우선순위, 원래 위치) 쌍을 deque에 넣어 관리합니다.",
        "맨 앞 문서를 꺼낸 후, deque에 더 높은 우선순위 문서가 있으면 맨 뒤로 다시 넣습니다.",
        "출력될 때마다 카운터를 증가시켜 M번째를 찾습니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    deque<pair<int,int>> dq; // (priority, original 1-indexed position)
    for (int i = 1; i <= n; i++) {
        int p; cin >> p;
        dq.push_back({p, i});
    }
    int printed = 0;
    while (true) {
        auto front = dq.front();
        dq.pop_front();
        bool hasHigher = false;
        for (auto& x : dq) {
            if (x.first > front.first) { hasHigher = true; break; }
        }
        if (hasHigher) {
            dq.push_back(front);
        } else {
            printed++;
            if (printed == m) {
                cout << front.second << "\\n";
                break;
            }
        }
    }
    return 0;
}`,
      solutionExplanation:
        "deque에 (우선순위, 원래 위치) 쌍을 저장합니다. 맨 앞을 꺼낸 후 나머지 중 더 높은 우선순위가 있으면 맨 뒤에 돌려보내고, 없으면 출력 카운터를 증가시킵니다. M번째 출력 시 해당 문서의 원래 위치를 출력합니다.",
      en: {
        title: "Printer Priority Queue",
        description:
          "N documents are in a print queue, each with a priority (1-9, higher = more important). The printer takes the front document; if any remaining document has a higher priority, it goes to the back of the queue instead of printing. Otherwise it prints. Find which original position (1-indexed) the M-th printed document was at.",
        hints: [
          "Store (priority, original_position) pairs in a deque.",
          "Pop the front; if any remaining item has higher priority, push the front back.",
          "Increment a print counter each time something prints; stop when the counter reaches M.",
        ],
        solutionExplanation:
          "A deque of (priority, original_1indexed_position) pairs is maintained. Each iteration: pop the front, scan for a higher-priority item remaining, push back if found, otherwise increment the print counter. When the counter equals M, output the original position.",
      },
    },
    {
      id: "bank-sim-019",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "탑 스파이",
      description:
        "N개의 탑이 왼쪽에서 오른쪽으로 서 있고 각 탑의 높이가 주어집니다. 각 탑은 레이저를 왼쪽으로 쏩니다. 레이저는 자신보다 높이가 같거나 큰 첫 번째 탑에 수신됩니다. 각 탑(왼쪽부터)에 대해 레이저를 수신하는 탑 번호를 출력하세요. 없으면 0을 출력합니다. (탑 번호는 1-indexed)",
      constraints: "1 ≤ N ≤ 500, 1 ≤ 높이 ≤ 100",
      initialCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n + 1);
    for (int i = 1; i <= n; i++) cin >> h[i];
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "5\n6 9 5 7 4",
          expectedOutput: "0 0 2 2 4",
          label: "기본 케이스",
        },
        {
          stdin: "4\n3 3 3 3",
          expectedOutput: "0 1 2 3",
          label: "동일 높이",
        },
        {
          stdin: "3\n1 2 3",
          expectedOutput: "0 0 0",
          label: "점점 높아짐",
        },
      ],
      hints: [
        "각 탑에 대해 왼쪽으로 스캔하며 높이가 같거나 큰 첫 번째 탑을 찾으세요.",
        "오른쪽에서 왼쪽으로 스캔하면서 h[j] >= h[i]인 첫 번째 j를 찾습니다.",
        "N이 최대 500이므로 O(N²) 이중 반복문으로 충분합니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n + 1);
    for (int i = 1; i <= n; i++) cin >> h[i];
    for (int i = 1; i <= n; i++) {
        int receiver = 0;
        for (int j = i - 1; j >= 1; j--) {
            if (h[j] >= h[i]) {
                receiver = j;
                break;
            }
        }
        if (i > 1) cout << " ";
        cout << receiver;
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "각 탑 i에 대해 바로 왼쪽(i-1)부터 1번까지 스캔하며 높이가 같거나 큰 첫 번째 탑을 찾습니다. 찾으면 그 번호를, 없으면 0을 출력합니다. N≤500이므로 O(N²)이 허용됩니다.",
      en: {
        title: "Tower Spy",
        description:
          "N towers stand left to right, each with a height. Each tower fires a laser to the left. The laser is received by the first tower to its left whose height is greater than or equal to the firing tower's height. For each tower (left to right), print the number of the receiving tower, or 0 if none. (1-indexed)",
        hints: [
          "For each tower, scan leftward to find the first taller-or-equal tower.",
          "Scan from position i-1 down to 1, looking for h[j] >= h[i].",
          "N ≤ 500 so an O(N²) double loop is fast enough.",
        ],
        solutionExplanation:
          "For each tower i, scan from i-1 down to 1 and stop at the first j where h[j] >= h[i]. Output j, or 0 if no such tower exists. O(N²) is sufficient for N ≤ 500.",
      },
    },
    {
      id: "bank-sim-020",
      cluster: "bank-sim",
      unlockAfter: "cpp-p3",
      difficulty: "어려움",
      title: "뱀 게임",
      description:
        "N×N 격자에서 뱀이 (1행, 1열)에서 시작하며 처음에는 오른쪽을 향합니다. 뱀은 매초 앞으로 한 칸 이동합니다. 이동한 칸에 사과가 있으면 몸이 늘어나고(꼬리를 제거하지 않음), 없으면 꼬리를 제거합니다. 방향 전환 명령은 \"T초 후 D방향으로 90도 전환(L=왼쪽, R=오른쪽)\"입니다. 벽 또는 자기 몸에 충돌하면 종료됩니다. 종료 시각(초)을 출력하세요. (행열 1-indexed)",
      constraints: "2 ≤ N ≤ 10, 0 ≤ 사과 수 K ≤ 5, 0 ≤ 방향 전환 수 L ≤ 10",
      initialCode: `#include <iostream>
#include <deque>
#include <set>
#include <map>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4\n0\n0",
          expectedOutput: "4",
          label: "사과/전환 없음",
        },
        {
          stdin: "4\n0\n1\n3 L",
          expectedOutput: "7",
          label: "방향 전환",
        },
        {
          stdin: "6\n0\n0",
          expectedOutput: "6",
          label: "더 큰 격자",
        },
      ],
      hints: [
        "뱀의 몸을 deque<pair<int,int>>로 관리합니다. 앞에 머리를 추가하고 뒤에서 꼬리를 제거합니다.",
        "사과 위치는 set에 저장합니다. 머리가 이동한 칸에 사과가 있으면 꼬리를 제거하지 않습니다.",
        "방향 전환은 map에 저장합니다. L은 현재 방향을 왼쪽 90도, R은 오른쪽 90도 전환입니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
#include <set>
#include <map>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    int k;
    cin >> k;
    set<pair<int,int>> apples;
    for (int i = 0; i < k; i++) {
        int r, c; cin >> r >> c;
        apples.insert({r, c});
    }
    int l;
    cin >> l;
    map<int, char> turns; // time -> L or R
    for (int i = 0; i < l; i++) {
        int t; char d;
        cin >> t >> d;
        turns[t] = d;
    }
    // directions: 0=right, 1=down, 2=left, 3=up
    int dr[] = {0, 1, 0, -1};
    int dc[] = {1, 0, -1, 0};
    int dir = 0; // start facing right
    deque<pair<int,int>> snake;
    snake.push_back({1, 1});
    set<pair<int,int>> body;
    body.insert({1, 1});
    int t = 0;
    while (true) {
        t++;
        // apply turn if any
        if (turns.count(t)) {
            char d = turns[t];
            if (d == 'L') dir = (dir + 3) % 4;
            else dir = (dir + 1) % 4;
        }
        // move head
        int nr = snake.front().first + dr[dir];
        int nc = snake.front().second + dc[dir];
        // check wall
        if (nr < 1 || nr > n || nc < 1 || nc > n) break;
        // check body collision (before adding head)
        if (body.count({nr, nc})) break;
        // add new head
        snake.push_front({nr, nc});
        body.insert({nr, nc});
        // eat apple or remove tail
        if (apples.count({nr, nc})) {
            apples.erase({nr, nc});
        } else {
            body.erase(snake.back());
            snake.pop_back();
        }
    }
    cout << t << "\\n";
    return 0;
}`,
      solutionExplanation:
        "뱀의 몸을 deque로 관리합니다. 매초 머리 이동 전에 방향 전환을 적용합니다. 새 머리 위치가 벽이나 자기 몸이면 종료합니다. 사과가 있으면 꼬리를 제거하지 않고, 없으면 deque 뒤에서 pop하여 꼬리를 제거합니다. 몸 위치를 set으로 추적해 충돌을 O(log N)에 확인합니다.",
      en: {
        title: "Snake Game",
        description:
          "A snake starts at (row 1, col 1) in an N×N grid, facing right. Each second it moves one cell forward. If it moves onto an apple, it grows (tail is not removed); otherwise the tail is removed. Direction commands turn it 90 degrees left (L) or right (R) at specified times. The game ends when the snake hits a wall or its own body. Print the time of collision. (1-indexed rows and columns)",
        hints: [
          "Manage the snake's body as a deque<pair<int,int>>. Add the new head to the front and pop the tail from the back.",
          "Store apple positions in a set. If the new head lands on an apple, skip the tail removal.",
          "Store direction-change commands in a map keyed by time. Apply the turn at the start of each second before moving.",
        ],
        solutionExplanation:
          "The snake body is a deque; each second apply any scheduled turn, compute the new head, check for wall/self collision, then push the new head and either eat an apple (no tail removal) or pop the tail. A set of body positions enables O(log N) collision checks.",
      },
    },
  ],
}

export default bankSimulationCluster
