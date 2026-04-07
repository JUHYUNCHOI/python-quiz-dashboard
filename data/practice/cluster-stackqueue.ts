import type { PracticeCluster } from "./types"

export const stackQueueCluster: PracticeCluster = {
  id: "stackqueue",
  title: "STL 스택/큐",
  emoji: "📚",
  description: "stack, queue, deque, priority_queue STL 컨테이너 활용",
  unlockAfter: "cpp-18",
  problems: [
    {
      id: "sq-001",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "쉬움",
      title: "스택으로 역순 출력",
      description: `N개의 정수를 스택에 넣고, 스택에서 꺼내 역순으로 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int n;
    cin >> n;
    stack<int> st;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5\n4\n3\n2\n1", label: "기본" },
        { stdin: "3\n10 20 30", expectedOutput: "30\n20\n10", label: "3개" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
      ],
      hints: [
        "#include <stack>. stack<int> st;",
        "st.push(x)로 넣고, while (!st.empty()) { cout << st.top(); st.pop(); } 로 꺼냅니다.",
      ],
      solutionCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int n;
    cin >> n;
    stack<int> st;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        st.push(x);
    }
    while (!st.empty()) {
        cout << st.top() << "\\n";
        st.pop();
    }
    return 0;
}`,
      solutionExplanation: "스택은 LIFO(Last In First Out): 마지막에 넣은 것이 먼저 나옵니다. push로 넣고 top/pop으로 꺼냅니다.",
    },
    {
      id: "sq-002",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "쉬움",
      title: "큐로 순서 처리",
      description: `N명이 줄 서 있습니다. 각 사람은 이름과 처리 시간이 주어집니다. 앞에서부터 순서대로 처리할 때, 각 사람의 처리 완료 시각을 출력하세요. (처음 시각은 0)`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ 처리 시간 ≤ 100, 이름은 영문 최대 20자",
      initialCode: `#include <iostream>
#include <string>
#include <queue>
using namespace std;

int main() {
    int n;
    cin >> n;
    queue<pair<string,int>> q;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "3\nalice 5\nbob 3\ncarol 7", expectedOutput: "alice 5\nbob 8\ncarol 15", label: "기본" },
        { stdin: "2\nzara 10\nalex 5", expectedOutput: "zara 10\nalex 15", label: "2명" },
      ],
      hints: [
        "#include <queue>. queue<pair<string,int>> q;",
        "현재 시각을 누적하며 완료 시각을 계산합니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <queue>
using namespace std;

int main() {
    int n;
    cin >> n;
    queue<pair<string,int>> q;
    for (int i = 0; i < n; i++) {
        string name;
        int t;
        cin >> name >> t;
        q.push({name, t});
    }
    int cur = 0;
    while (!q.empty()) {
        auto [name, t] = q.front();
        q.pop();
        cur += t;
        cout << name << " " << cur << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "큐는 FIFO(First In First Out): 먼저 넣은 것이 먼저 나옵니다. front()로 앞 원소를 확인하고 pop()으로 제거합니다.",
    },
    {
      id: "sq-003",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "보통",
      title: "괄호 매칭",
      description: `문자열에서 '('와 ')'의 괄호가 올바르게 매칭되는지 확인하세요.
올바르면 "YES", 그렇지 않으면 "NO"를 출력하세요.
T개의 테스트케이스가 주어집니다.`,
      constraints: "1 ≤ T ≤ 20, 1 ≤ 문자열 길이 ≤ 100, '(' ')' 및 다른 문자 포함 가능 (다른 문자는 무시)",
      initialCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "4\n(())\n(()\n()()\n)(", expectedOutput: "YES\nNO\nYES\nNO", label: "기본" },
        { stdin: "2\nhello(world)\n(((", expectedOutput: "YES\nNO", label: "일반 문자 포함" },
      ],
      hints: [
        "'('를 만나면 스택에 push, ')'를 만나면 스택이 비어있으면 NO, 아니면 pop합니다.",
        "순회 후 스택이 비어있으면 YES입니다.",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(c);
        else if (c == ')') {
            if (st.empty()) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        cout << (isValid(s) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "스택으로 여는 괄호를 추적합니다. 닫는 괄호를 만날 때 스택이 비어있으면 대응 쌍이 없으므로 실패. 마지막에 스택이 비어있어야 모든 괄호가 매칭된 것입니다.",
    },
    {
      id: "sq-004",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "보통",
      title: "프린터 대기열",
      description: `N개의 문서가 대기열에 있고 각 문서의 우선순위(1~9)가 주어집니다.
프린터는 다음 규칙으로 동작합니다:
1. 대기열 맨 앞 문서를 꺼냅니다.
2. 대기열에 자신보다 높은 우선순위의 문서가 있으면 맨 뒤로 넣습니다.
3. 없으면 인쇄합니다.
M번째로 인쇄되는 문서의 원래 위치(0-based)를 출력하세요.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ N, 1 ≤ 우선순위 ≤ 9",
      initialCode: `#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    queue<pair<int,int>> q;  // {priority, original_index}
    for (int i = 0; i < n; i++) {
        int p;
        cin >> p;
        q.push({p, i});
    }
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4 2\n1 2 3 4", expectedOutput: "3", label: "기본" },
        { stdin: "6 4\n1 1 9 1 1 1", expectedOutput: "2", label: "높은 우선순위 존재" },
        { stdin: "3 1\n3 3 3", expectedOutput: "0", label: "동일 우선순위" },
      ],
      hints: [
        "queue<pair<int,int>> 사용: {우선순위, 원래인덱스}",
        "현재 문서보다 높은 우선순위가 있는지: 대기열의 모든 원소를 확인하거나, priority_queue로 최대 우선순위를 추적",
      ],
      solutionCode: `#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    queue<pair<int,int>> q;  // {priority, original_index}
    for (int i = 0; i < n; i++) {
        int p;
        cin >> p;
        q.push({p, i});
    }
    int printCount = 0;
    while (!q.empty()) {
        auto [prio, idx] = q.front();
        q.pop();
        bool hasHigher = false;
        queue<pair<int,int>> tmp = q;
        while (!tmp.empty()) {
            if (tmp.front().first > prio) { hasHigher = true; break; }
            tmp.pop();
        }
        if (hasHigher) {
            q.push({prio, idx});
        } else {
            printCount++;
            if (printCount == m) {
                cout << idx << "\\n";
                return 0;
            }
        }
    }
    return 0;
}`,
      solutionExplanation: "큐 시뮬레이션: 꺼낸 문서보다 높은 우선순위가 남아있으면 뒤로 보냅니다. 큐를 복사해서 남은 원소를 확인하는 방법을 씁니다.",
    },
    {
      id: "sq-005",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "보통",
      title: "최근 K개 평균",
      description: `N개의 정수가 순서대로 들어옵니다. 매번 가장 최근 K개 정수의 평균을 소수점 둘째 자리까지 출력하세요. (K개 미만이면 지금까지 들어온 수의 평균)`,
      constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <deque>
#include <iomanip>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    deque<int> dq;
    long long sum = 0;
    cout << fixed << setprecision(2);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "5 3\n1 2 3 4 5", expectedOutput: "1.00\n1.50\n2.00\n3.00\n4.00", label: "기본" },
        { stdin: "4 2\n10 20 30 40", expectedOutput: "10.00\n15.00\n25.00\n35.00", label: "K=2" },
      ],
      hints: [
        "deque<int>를 사용해 앞에서 제거, 뒤에서 추가합니다.",
        "deque 크기가 K를 초과하면 앞 원소를 pop_front()합니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
#include <iomanip>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    deque<int> dq;
    long long sum = 0;
    cout << fixed << setprecision(2);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        dq.push_back(x);
        sum += x;
        if ((int)dq.size() > k) {
            sum -= dq.front();
            dq.pop_front();
        }
        cout << (double)sum / dq.size() << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "deque는 앞뒤 모두 삽입/삭제가 O(1)입니다. 윈도우 크기가 K를 초과하면 앞에서 제거합니다. sum을 유지하면 매번 재계산 없이 O(1)에 평균을 구할 수 있습니다.",
    },
    {
      id: "sq-006",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "어려움",
      title: "K번째 큰 수 스트림",
      description: `N개의 정수가 하나씩 들어올 때, 매번 지금까지 들어온 수 중 K번째로 큰 수를 출력하세요. K개 미만이면 -1을 출력하세요.`,
      constraints: "1 ≤ K ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    priority_queue<int, vector<int>, greater<int>> pq;  // min-heap
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        { stdin: "5 2\n3 1 4 1 5", expectedOutput: "-1\n1\n3\n3\n4", label: "기본" },
        { stdin: "4 3\n5 3 8 1", expectedOutput: "-1\n-1\n3\n3", label: "K=3" },
      ],
      hints: [
        "priority_queue<int, vector<int>, greater<int>> 최솟값 우선 큐를 사용합니다.",
        "크기를 K로 유지하면 top()이 K번째로 큰 수가 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    priority_queue<int, vector<int>, greater<int>> pq;  // min-heap
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pq.push(x);
        if ((int)pq.size() > k) pq.pop();
        if ((int)pq.size() < k) cout << -1 << "\\n";
        else cout << pq.top() << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "min-heap을 크기 K로 유지하면 top()이 힙 내 가장 작은 수 = K번째로 큰 수입니다. 새 수가 들어오면 push 후 K 초과 시 가장 작은 수(top)를 제거합니다.",
    },
    {
      id: "sq-007",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "어려움",
      title: "탑 스파이 (스택 응용)",
      description: `N개의 탑이 일렬로 서 있고 높이가 주어집니다. 각 탑은 왼쪽 방향으로 레이저를 쏩니다. 레이저는 자신보다 높거나 같은 탑을 처음 만나면 수신됩니다. 각 탑에 대해 레이저를 수신하는 탑의 번호(1-based)를 출력하세요. 없으면 0을 출력합니다.`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ 높이 ≤ 10000",
      initialCode: `#include <iostream>
#include <stack>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    vector<int> ans(n, 0);
    stack<int> st;  // 인덱스를 저장
    // 여기에 코드를 작성하세요
    for (int i = 0; i < n; i++) cout << ans[i] << "\\n";
    return 0;
}`,
      testCases: [
        { stdin: "5\n6 9 5 7 4", expectedOutput: "0\n0\n2\n2\n4", label: "기본" },
        { stdin: "3\n1 5 3", expectedOutput: "0\n0\n2", label: "3개" },
        { stdin: "4\n3 3 3 3", expectedOutput: "0\n1\n2\n3", label: "동일 높이" },
      ],
      hints: [
        "스택에 탑 번호를 저장합니다. 현재 탑보다 낮은 탑은 스택에서 pop합니다.",
        "스택이 비어있지 않으면 top()이 현재 탑의 레이저 수신자입니다.",
      ],
      solutionCode: `#include <iostream>
#include <stack>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    vector<int> ans(n, 0);
    stack<int> st;  // 인덱스를 저장
    for (int i = 0; i < n; i++) {
        while (!st.empty() && h[st.top()] < h[i]) st.pop();
        if (!st.empty()) ans[i] = st.top() + 1;  // 1-based
        st.push(i);
    }
    for (int i = 0; i < n; i++) cout << ans[i] << "\\n";
    return 0;
}`,
      solutionExplanation: "단조 스택(monotone stack) 패턴: 현재 원소보다 작은 것들을 pop하면, 스택 top이 현재 원소 왼쪽에서 처음으로 크거나 같은 원소입니다. O(N) 풀이입니다.",
    },
    {
      id: "sq-008",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "어려움",
      title: "작업 스케줄링",
      description: `N개의 작업이 있고 각각 소요 시간과 마감 기한이 주어집니다. 한 번에 하나의 작업만 처리할 수 있을 때, 마감 기한을 지킨 작업의 최대 수를 출력하세요.
(작업은 시작 시각 0부터 처리, 마감 기한 내에 완료되어야 함 — 완료 시각 ≤ 마감 기한)`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ 소요시간 ≤ 100, 1 ≤ 마감기한 ≤ 1000",
      initialCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> tasks(n);  // {deadline, duration}
    for (int i = 0; i < n; i++) cin >> tasks[i].second >> tasks[i].first;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        { stdin: "4\n2 5\n1 3\n3 8\n2 4", expectedOutput: "3", label: "기본" },
        { stdin: "3\n5 5\n3 3\n2 2", expectedOutput: "1", label: "타이트한 마감" },
        { stdin: "3\n1 10\n2 10\n3 10", expectedOutput: "3", label: "여유 있는 마감" },
      ],
      hints: [
        "마감 기한이 빠른 순으로 정렬 후 처리합니다 (그리디: 마감이 빠른 것 우선).",
        "priority_queue를 쓰거나 단순 정렬 후 순서대로 처리해도 됩니다.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> tasks(n);  // {deadline, duration}
    for (int i = 0; i < n; i++) cin >> tasks[i].second >> tasks[i].first;
    sort(tasks.begin(), tasks.end());  // 마감 기한 오름차순
    int count = 0, curTime = 0;
    for (auto [deadline, dur] : tasks) {
        if (curTime + dur <= deadline) {
            curTime += dur;
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation: "마감이 빠른 작업 우선 처리(EDF: Earliest Deadline First)가 최적입니다. 마감 기한 순으로 정렬 후 순서대로 시도하며, 마감 내에 완료 가능한 작업만 선택합니다.",
    },
    {
      id: "sq-009",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "쉬움",
      title: "덱으로 앞뒤 추가/삭제",
      description: `명령어를 처리하여 덱(deque)을 조작하세요.
- "PF x": 덱 앞에 x를 추가 (push_front)
- "PB x": 덱 뒤에 x를 추가 (push_back)
- "DF": 덱 앞에서 제거 (pop_front)
- "DB": 덱 뒤에서 제거 (pop_back)
- "END": 종료
모든 명령 처리 후 덱 내용을 앞에서부터 공백으로 구분하여 출력하세요.`,
      constraints: "1 ≤ 명령 수 ≤ 30, -1000 ≤ x ≤ 1000, 제거 시 덱이 비어있지 않음을 보장",
      initialCode: `#include <iostream>
#include <deque>
#include <string>
using namespace std;

int main() {
    deque<int> dq;
    string cmd;
    while (cin >> cmd && cmd != "END") {
        // 여기에 코드를 작성하세요
    }
    // 덱 내용 출력
    return 0;
}`,
      testCases: [
        {
          stdin: "PF 1\nPB 2\nPF 3\nEND",
          expectedOutput: "3 1 2",
        },
        {
          stdin: "PB 10\nPB 20\nPB 30\nDF\nEND",
          expectedOutput: "20 30",
        },
        {
          stdin: "PF 5\nPF 4\nPF 3\nDB\nEND",
          expectedOutput: "3 4",
        },
        {
          stdin: "PB 1\nPB 2\nPB 3\nDF\nDB\nEND",
          expectedOutput: "2",
        },
      ],
      hints: [
        "#include <deque>. push_front(), push_back(), pop_front(), pop_back() 를 사용합니다.",
        "명령어 'PF'와 'PB'는 숫자 인수 유무로 구분합니다. 'DF'와 'DB'는 인수가 없습니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
#include <string>
using namespace std;

int main() {
    deque<int> dq;
    string cmd;
    while (cin >> cmd && cmd != "END") {
        if (cmd == "PF") {
            int x; cin >> x;
            dq.push_front(x);
        } else if (cmd == "PB") {
            int x; cin >> x;
            dq.push_back(x);
        } else if (cmd == "DF") {
            dq.pop_front();
        } else if (cmd == "DB") {
            dq.pop_back();
        }
    }
    for (int i = 0; i < (int)dq.size(); i++) {
        if (i > 0) cout << " ";
        cout << dq[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "deque는 앞뒤 모두 O(1) 삽입/삭제가 가능합니다. push_front/push_back으로 추가하고 pop_front/pop_back으로 제거합니다. 인덱스로도 접근 가능합니다.",
    },
    {
      id: "sq-010",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "쉬움",
      title: "스택으로 문자열 뒤집기",
      description: `문자열을 입력받아 스택을 이용해 역순으로 출력하세요.`,
      constraints: "1 ≤ 문자열 길이 ≤ 1000, 영문자와 숫자로만 구성",
      initialCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "hello",
          expectedOutput: "olleh",
        },
        {
          stdin: "12345",
          expectedOutput: "54321",
        },
        {
          stdin: "a",
          expectedOutput: "a",
        },
        {
          stdin: "abcde",
          expectedOutput: "edcba",
        },
      ],
      hints: [
        "문자열의 각 문자를 스택에 push합니다.",
        "스택에서 하나씩 pop하면 역순으로 나옵니다 (LIFO).",
      ],
      solutionCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    for (char c : s) st.push(c);
    while (!st.empty()) {
        cout << st.top();
        st.pop();
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "스택 LIFO 특성을 활용합니다. 문자를 순서대로 push하면 pop 시 역순으로 나옵니다. 문자열을 직접 뒤집는 것보다 스택 사용 원리를 익히는 것이 목적입니다.",
    },
    {
      id: "sq-011",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "보통",
      title: "카드 뒤집기",
      description: `1부터 N까지 번호가 붙은 N장의 카드를 덱에 순서대로 넣습니다 (1이 앞).
다음 동작을 덱이 빌 때까지 반복합니다:
1. 덱 앞 카드를 버립니다.
2. 덱이 비어있지 않으면, 덱 앞 카드를 덱 뒤로 이동합니다.
남은 카드들을 버려진 순서대로 출력하세요.`,
      constraints: "1 ≤ N ≤ 100",
      initialCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    int n;
    cin >> n;
    deque<int> dq;
    for (int i = 1; i <= n; i++) dq.push_back(i);
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "4",
          expectedOutput: "1 3 2 4",
        },
        {
          stdin: "6",
          expectedOutput: "1 3 5 2 6 4",
        },
        {
          stdin: "1",
          expectedOutput: "1",
        },
        {
          stdin: "5",
          expectedOutput: "1 3 5 4 2",
        },
      ],
      hints: [
        "덱 앞에서 pop_front()로 카드를 꺼냅니다. 버린 카드는 출력합니다.",
        "다음 카드는 pop_front() 후 push_back()으로 덱 뒤로 이동합니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    int n;
    cin >> n;
    deque<int> dq;
    for (int i = 1; i <= n; i++) dq.push_back(i);
    bool first = true;
    while (!dq.empty()) {
        if (!first) cout << " ";
        cout << dq.front();
        dq.pop_front();
        first = false;
        if (!dq.empty()) {
            dq.push_back(dq.front());
            dq.pop_front();
        }
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "덱 시뮬레이션: 앞 카드를 버리고(pop_front + 출력), 다음 앞 카드를 뒤로 보냅니다(pop_front + push_back). deque의 앞뒤 O(1) 연산이 핵심입니다.",
    },
    {
      id: "sq-012",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "보통",
      title: "최솟값 스택",
      description: `push, pop, min 연산을 지원하는 스택을 구현하세요.
- "PUSH x": x를 스택에 push
- "POP": 스택 top을 제거
- "MIN": 현재 스택의 최솟값을 출력
- "END": 종료
각 MIN 호출 결과를 출력하세요.`,
      constraints: "1 ≤ 연산 수 ≤ 1000, -10000 ≤ x ≤ 10000, POP/MIN 시 스택이 비어있지 않음을 보장",
      initialCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    stack<int> st;
    stack<int> minSt;  // 보조 스택: 최솟값 추적
    string cmd;
    while (cin >> cmd && cmd != "END") {
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        {
          stdin: "PUSH 3\nPUSH 1\nMIN\nPUSH 2\nMIN\nPOP\nMIN\nEND",
          expectedOutput: "1\n1\n1",
        },
        {
          stdin: "PUSH 5\nPUSH 3\nPUSH 7\nMIN\nPOP\nMIN\nPOP\nMIN\nEND",
          expectedOutput: "3\n3\n5",
        },
        {
          stdin: "PUSH 1\nMIN\nPUSH 2\nMIN\nEND",
          expectedOutput: "1\n1",
        },
      ],
      hints: [
        "보조 스택(minSt)을 사용합니다. push 시 현재 최솟값을 minSt에도 push합니다.",
        "pop 시 minSt도 함께 pop합니다. minSt.top()이 항상 현재 스택의 최솟값입니다.",
      ],
      solutionCode: `#include <iostream>
#include <stack>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    stack<int> st;
    stack<int> minSt;
    string cmd;
    while (cin >> cmd && cmd != "END") {
        if (cmd == "PUSH") {
            int x; cin >> x;
            st.push(x);
            if (minSt.empty()) minSt.push(x);
            else minSt.push(min(x, minSt.top()));
        } else if (cmd == "POP") {
            st.pop();
            minSt.pop();
        } else if (cmd == "MIN") {
            cout << minSt.top() << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation: "보조 스택(minSt)에 push 시점의 최솟값을 함께 저장합니다. minSt[i]는 메인 스택 i번째까지의 최솟값입니다. pop 시 두 스택 모두 pop하면 항상 O(1)에 최솟값을 조회할 수 있습니다.",
    },
    {
      id: "sq-013",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "어려움",
      title: "중앙값 스트림",
      description: `N개의 숫자가 하나씩 들어올 때, 각 숫자를 추가한 후 현재까지의 중앙값을 출력하세요.
중앙값: 정렬 시 가운데 값. 원소가 짝수 개이면 두 중간값 중 작은 값을 출력합니다.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 최대힙: 중앙값 이하의 수들
    priority_queue<int> lower;
    // 최소힙: 중앙값 초과의 수들
    priority_queue<int, vector<int>, greater<int>> upper;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // 여기에 코드를 작성하세요
    }
    return 0;
}`,
      testCases: [
        {
          stdin: "5\n1 3 5 2 4",
          expectedOutput: "1\n1\n3\n2\n3",
        },
        {
          stdin: "4\n5 1 3 2",
          expectedOutput: "5\n1\n3\n2",
        },
        {
          stdin: "3\n10 5 8",
          expectedOutput: "10\n5\n8",
        },
      ],
      hints: [
        "두 힙을 유지합니다: lower(최대힙)에는 중앙값 이하, upper(최소힙)에는 중앙값 초과 수를 저장합니다.",
        "두 힙의 크기를 |lower.size() - upper.size()| ≤ 1 로 유지하면, lower.top()이 중앙값입니다.",
      ],
      solutionCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int n;
    cin >> n;
    priority_queue<int> lower;
    priority_queue<int, vector<int>, greater<int>> upper;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // lower에 넣거나 upper에 넣기
        if (lower.empty() || x <= lower.top()) lower.push(x);
        else upper.push(x);
        // 균형 맞추기: lower가 upper보다 최대 1 더 크게
        if (lower.size() > upper.size() + 1) {
            upper.push(lower.top());
            lower.pop();
        } else if (upper.size() > lower.size()) {
            lower.push(upper.top());
            upper.pop();
        }
        cout << lower.top() << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "두 힙으로 스트리밍 중앙값을 O(log N)에 유지합니다. lower(최대힙)는 중앙값 포함 작은 절반, upper(최소힙)는 큰 절반입니다. lower.size() = upper.size()+1 또는 동일하게 유지하면 lower.top()이 중앙값입니다.",
    },
    {
      id: "sq-014",
      cluster: "stackqueue",
      unlockAfter: "cpp-18",
      difficulty: "어려움",
      title: "슬라이딩 윈도우 최대값",
      description: `N개의 정수와 윈도우 크기 K가 주어질 때, 크기 K인 윈도우가 슬라이딩하면서 각 위치에서의 최대값을 출력하세요.
윈도우는 [0..K-1], [1..K], [2..K+1], ... 순으로 이동합니다.`,
      constraints: "1 ≤ K ≤ N ≤ 100000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
#include <deque>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    deque<int> dq;  // 인덱스를 저장 (단조 감소 덱)
    // 여기에 코드를 작성하세요
    return 0;
}`,
      testCases: [
        {
          stdin: "8 3\n1 3 -1 -3 5 3 6 7",
          expectedOutput: "3 3 5 5 6 7",
        },
        {
          stdin: "5 2\n4 3 2 1 5",
          expectedOutput: "4 3 2 5",
        },
        {
          stdin: "4 1\n2 1 4 3",
          expectedOutput: "2 1 4 3",
        },
        {
          stdin: "3 3\n1 2 3",
          expectedOutput: "3",
        },
      ],
      hints: [
        "단조 감소 덱(monotone deque)을 사용합니다: 덱 앞이 현재 윈도우의 최대값 인덱스.",
        "새 원소 추가 시 덱 뒤에서 새 원소보다 작거나 같은 인덱스를 pop_back합니다. 윈도우를 벗어난 인덱스는 앞에서 pop_front합니다.",
      ],
      solutionCode: `#include <iostream>
#include <deque>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    deque<int> dq;  // 인덱스 저장
    bool first = true;
    for (int i = 0; i < n; i++) {
        // 윈도우를 벗어난 인덱스 제거
        while (!dq.empty() && dq.front() < i - k + 1)
            dq.pop_front();
        // 새 원소보다 작은 뒤쪽 인덱스 제거
        while (!dq.empty() && a[dq.back()] <= a[i])
            dq.pop_back();
        dq.push_back(i);
        // 윈도우가 완성된 시점부터 출력
        if (i >= k - 1) {
            if (!first) cout << " ";
            cout << a[dq.front()];
            first = false;
        }
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation: "단조 감소 덱 패턴: 덱은 항상 현재 윈도우 내에서 감소하는 순서의 인덱스를 유지합니다. 덱 front가 윈도우 최대값 인덱스이므로 O(N) 전체 풀이입니다.",
    },
  ],
}
