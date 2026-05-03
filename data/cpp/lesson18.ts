// ============================================
// C++ Lesson 18: stack, queue & deque
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson18Data: LessonData = {
  id: "cpp-18",
  title: "stack, queue & deque",
  emoji: "📚",
  description: "STL 컨테이너 어댑터와 priority_queue!",
  chapters: [
    // ============================================
    // Chapter 1: stack & queue
    // ============================================
    {
      id: "ch1",
      title: "stack & queue",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 stack — 마지막에 넣은 게 먼저 나옴",
          content: `이런 문제 본 적 있죠:

> "괄호가 올바르게 짝지어졌는지 확인하라" \`(())\` ✅, \`(()\` ❌

이걸 어떻게 풀면 좋을까요? 여는 괄호 \`(\` 가 나오면 어딘가 기억해두고, 닫는 \`)\` 가 나오면 **가장 최근에 기억해둔** \`(\` 와 짝지어요. "가장 최근" 이 핵심이에요.

또는 — 메모장에서 \`Ctrl+Z\` (실행 취소). 마지막에 한 행동부터 되돌리죠. 또 "가장 최근".

또는 — 웹 브라우저 뒤로가기. 마지막 방문 페이지부터.

이 모든 패턴에서 공통점: **마지막에 넣은 게 먼저 나옴.** 이걸 자료구조로 만든 게 **stack** 이에요.

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [1, 2]      ← 3 이 나옴 (마지막에 넣은 것)
top    → 2           ← 맨 위 값 확인
\`\`\`

접시 쌓기 떠올려요. 새 접시는 위에 올리고 (push), 꺼낼 때도 맨 위부터 (pop). 이 규칙을 **LIFO (Last In First Out)** 라고 불러요.

> 다음 페이지 — C++ 에서 어떻게 쓰는지 + 파이썬과 어떻게 다른지.`
        },
        {
          id: "ch1-intro-usage",
          type: "explain",
          title: "🔧 C++ stack 사용법 + 파이썬 비교",
          content: `\`\`\`cpp
#include <stack>
using namespace std;

stack<int> s;
s.push(10);
s.push(20);
s.push(30);

cout << s.top();  // 30 (맨 위)
s.pop();          // 30 제거 (값 안 돌려줌!)
cout << s.top();  // 20
\`\`\`

| 함수 | 의미 |
|---|---|
| \`s.push(x)\` | 맨 위에 추가 |
| \`s.top()\` | 맨 위 값 확인 (제거 안 함) |
| \`s.pop()\` | 맨 위 제거 (**리턴값 없음** ⚠️) |
| \`s.size()\` | 원소 개수 |
| \`s.empty()\` | 비어있으면 true |

> ⚠️ \`pop()\` 이 값을 안 돌려준다는 게 파이썬과 다른 점. 값이 필요하면 \`top()\` 으로 먼저 보고, 그 다음 \`pop()\`.

### 파이썬은 list 로 stack 흉내

| 파이썬 🐍 | C++ stack ⚡ |
|---|---|
| \`s.append(x)\` | \`s.push(x)\` |
| \`s.pop()\` → 값 리턴 | \`s.pop()\` → 리턴값 없음 |
| \`s[-1]\` | \`s.top()\` |

### "vector 의 push_back/pop_back 으로 다 되는데 왜 stack?"

좋은 질문이에요. 사실 vector 로도 다 돼요. 그런데 **stack 을 쓰면 의도가 분명**해져요. 코드를 읽는 사람이 "아, 이건 LIFO 로만 쓰는구나" 즉시 알 수 있고, 실수로 \`v[3]\` 같은 중간 접근도 막혀요. **"이렇게만 쓸 거다" 라는 약속**이에요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "스택의 맨 위 값을 확인해봐요!",
          code: "stack<int> s;\ns.push(5);\ns.push(10);\ncout << s.___();  // 맨 위 값: 10",
          fillBlanks: [
            { id: 0, answer: "top", options: ["top", "front", "back", "peek"] }
          ],
          explanation: "stack에서 맨 위 값을 확인하려면 top()을 사용해요! front()는 queue에서, back()은 deque에서 사용해요."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "stack push/pop 결과!",
          code: "#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    stack<int> s;\n    s.push(1);\n    s.push(2);\n    s.push(3);\n    s.pop();\n    s.pop();\n    cout << s.top();\n    return 0;\n}",
          options: ["1", "2", "3", "에러"],
          answer: 0,
          explanation: "push(1), push(2), push(3)으로 [1,2,3]이 돼요. pop()으로 3 제거 → [1,2], 다시 pop()으로 2 제거 → [1]. top()은 1을 리턴해요!"
        },
        {
          id: "ch1-stack-mini",
          type: "practice" as const,
          title: "✋ 잠깐 — stack 으로 거꾸로 출력",
          content: `**상황**: 숫자 5 개를 받았는데 (starter 코드의 \`nums\` 배열), 나중에 입력된 것부터 거꾸로 출력하고 싶어요.

stack 의 LIFO 특성으로 한 번에 끝. 다 \`push\` 하고 빌 때까지 \`top\` + \`pop\`.

> 💡 \`while (!s.empty()) { cout << s.top() << " "; s.pop(); }\` — 이 패턴이 핵심. 정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    stack<int> s;

    // 👇 nums 를 다 push 하고, 빌 때까지 top + pop 으로 출력 (공백 구분)


    return 0;
}`,
          code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    stack<int> s;

    for (int n : nums) s.push(n);
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }

    return 0;
}`,
          hint: "for (int n : nums) s.push(n); 으로 다 넣고, while (!s.empty()) { cout << s.top() << \" \"; s.pop(); } 로 거꾸로 빼내요.",
          expectedOutput: `5 4 3 2 1 `
        },
        {
          id: "ch1-queue",
          type: "explain",
          title: "📦 queue — 선입선출 (FIFO)",
          content: `**queue** 는 줄 서기처럼 **먼저 넣은 것이 먼저 나오는** 자료구조예요. stack 의 정반대 — 뒤에 들어가서 앞으로 나옴.

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [2, 3]      ← 1 이 나옴 (먼저 넣은 것!)
front  → 2           ← 맨 앞 값 확인
\`\`\`

은행 대기열, 프린터 작업 큐 같은 곳에서 흔히 보이는 패턴. 이걸 **FIFO (First In First Out)** 라고 불러요.

C++ 에서는 \`#include <queue>\`:

\`\`\`cpp
#include <queue>
using namespace std;

queue<int> q;
q.push(10);       // 뒤에 넣기
q.push(20);
q.push(30);

cout << q.front(); // 10 (맨 앞)
cout << q.back();  // 30 (맨 뒤)
q.pop();           // 10 제거 (맨 앞 제거!)
cout << q.front(); // 20
\`\`\`

> 다음 페이지 — 함수 정리 + 파이썬 비교 + queue 가 진짜 빛나는 곳.`
        },
        {
          id: "ch1-queue-detail",
          type: "explain",
          title: "🔧 queue 함수 정리 + 파이썬 비교",
          content: `### queue 함수 표

| 함수 | 문법 | 설명 |
|---|---|---|
| push | \`q.push(x)\` | 뒤에 추가 |
| pop | \`q.pop()\` | 앞에서 제거 (**리턴값 없음!**) |
| front | \`q.front()\` | 맨 앞 값 확인 |
| back | \`q.back()\` | 맨 뒤 값 확인 |
| size | \`q.size()\` | 원소 개수 |
| empty | \`q.empty()\` | 비어있으면 true |

### 파이썬과 비교

파이썬은 \`collections.deque\` 를 queue 처럼 사용해요:

\`\`\`python
from collections import deque
q = deque()
q.append(10)      # push (뒤에 넣기)
q.append(20)
q.popleft()       # 10 리턴 + 제거 (앞에서 빼기)
q[0]              # front
\`\`\`

| 파이썬 🐍 | C++ queue ⚡ |
|---|---|
| \`q.append(x)\` | \`q.push(x)\` |
| \`q.popleft()\` → 값 리턴 | \`q.pop()\` → 리턴값 없음 |
| \`q[0]\` | \`q.front()\` |
| \`q[-1]\` | \`q.back()\` |

### 💡 queue 가 진짜 빛나는 곳 — BFS

queue 는 **BFS (너비 우선 탐색)** 의 필수 자료구조예요. 그래프/격자 탐색할 때 "한 칸씩 퍼져나가는" 동작이 정확히 FIFO. 알고리즘 랩에서 다시 만나요.`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "큐의 맨 앞 값을 확인해봐요!",
          code: "queue<int> q;\nq.push(100);\nq.push(200);\ncout << q.___();  // 맨 앞 값: 100",
          fillBlanks: [
            { id: 0, answer: "front", options: ["front", "top", "back", "first"] }
          ],
          explanation: "queue에서 맨 앞 값을 확인하려면 front()를 사용해요! top()은 stack에서 사용하는 거예요."
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "queue push/pop 결과!",
          code: "#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    queue<int> q;\n    q.push(10);\n    q.push(20);\n    q.push(30);\n    q.pop();\n    cout << q.front();\n    return 0;\n}",
          options: ["10", "20", "30", "에러"],
          answer: 1,
          explanation: "push(10), push(20), push(30)으로 [10,20,30]이 돼요. pop()은 맨 앞의 10을 제거해요 → [20,30]. front()는 20이에요!"
        },
        {
          id: "ch1-must-queue",
          type: "practice" as const,
          title: "🎯 queue 가 **진짜 필요한** 순간 — 줄 서기 시뮬",
          content: `queue 의 가장 자연스러운 용도는 "**먼저 도착한 사람부터 처리**" — 줄 서기 그 자체예요. BFS 같은 큰 알고리즘의 핵심도 이거.

**문제**: 카페에 손님 5 명이 차례로 도착해요 (Alice, Bob, Carol, David, Eve). 바리스타가 한 명씩 처리하면서 "Now serving: 이름" 을 출력하세요. **도착 순서대로** 처리되어야 해요.

\`\`\`
도착 순서: Alice → Bob → Carol → David → Eve

기대 출력:
Now serving: Alice
Now serving: Bob
Now serving: Carol
Now serving: David
Now serving: Eve
\`\`\`

> 💡 stack 으로 하면 **마지막에 도착한** Eve 부터 처리됨 — 새치기! queue 가 정답이에요. 코드는 \`while (!q.empty())\` + \`q.front()\` + \`q.pop()\` 패턴.`,
          starterCode: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> line;

    // 도착 순서대로 줄에 push
    line.push("Alice");
    line.push("Bob");
    line.push("Carol");
    line.push("David");
    line.push("Eve");

    // 👇 queue 가 빌 때까지: 맨 앞 손님 출력 + pop
    //    출력 형식: "Now serving: Alice"


    return 0;
}`,
          code: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> line;

    line.push("Alice");
    line.push("Bob");
    line.push("Carol");
    line.push("David");
    line.push("Eve");

    while (!line.empty()) {
        cout << "Now serving: " << line.front() << endl;
        line.pop();
    }

    return 0;
}`,
          hint: "패턴: while (!line.empty()) { cout << \"Now serving: \" << line.front() << endl; line.pop(); } — front() 로 맨 앞 보고 pop() 으로 제거. 이 패턴은 BFS 등 모든 queue 알고리즘의 기본 골격이에요.",
          expectedOutput: `Now serving: Alice
Now serving: Bob
Now serving: Carol
Now serving: David
Now serving: Eve`
        },
        {
          id: "ch1-pred-parens",
          type: "predict" as const,
          title: "불균형 괄호 예측!",
          code: "// 예시 1: \"(()\" → 스택에 남는 것?\n// 예시 2: \"())\" → 스택에 남는 것?\n\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str = \"(()\";\n    stack<char> s;\n    bool valid = true;\n    for (char c : str) {\n        if (c == '(') s.push(c);\n        else if (c == ')') {\n            if (s.empty()) { valid = false; break; }\n            s.pop();\n        }\n    }\n    if (valid && s.empty()) cout << \"Valid\";\n    else cout << \"Invalid\";\n    return 0;\n}",
          options: ["Valid", "Invalid", "에러", "아무것도 출력 안 됨"],
          answer: 1,
          explanation: "\"(()\" → 여는 괄호 2개를 push하고, 닫는 괄호 1개로 pop 1번 → 스택에 '('가 남아있어요! 불균형이라 Invalid예요.\n\n\"())\"의 경우 → '(' push, ')' pop → 스택 비어있음, 또 ')' 등장 → 스택이 비어있는데 pop하려 하니까 Invalid!\n\n• \"(()\" → 불균형! 여는 괄호가 남아요\n• \"())\" → 불균형! 닫는 괄호가 남아요"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ stack으로 괄호 매칭 체크!",
          content: `stack을 활용해서 "(())" 문자열의 괄호가 올바르게 짝지어졌는지 확인하는 코드를 작성해봐요!`,
          code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string str = "(())";
    stack<char> s;
    bool valid = true;

    for (char c : str) {
        if (c == '(') {
            s.push(c);
        } else if (c == ')') {
            if (s.empty()) {
                valid = false;
                break;
            }
            s.pop();
        }
    }

    if (valid && s.empty()) {
        cout << "Valid" << endl;
    } else {
        cout << "Invalid" << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string str = "(())";
    stack<char> s;
    bool valid = true;

    // str을 한 글자씩 순회하세요
    // - '(' 이면 s에 push
    // - ')' 이면 s가 비어있으면 valid = false + break, 아니면 pop

    if (valid && s.empty()) {
        cout << "Valid" << endl;
    } else {
        cout << "Invalid" << endl;
    }

    return 0;
}`,
          hint: "for(char c : str)로 순회해요. '('이면 s.push(c), ')'이면 s.empty()를 먼저 체크하고 비어있으면 invalid, 아니면 s.pop()해요",
          expectedOutput: "Valid"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "stack vs queue!",
          content: "stack과 queue의 차이점으로 **올바른** 것은?",
          options: [
            "stack은 FIFO, queue는 LIFO이다",
            "stack은 LIFO, queue는 FIFO이다",
            "둘 다 FIFO이다",
            "둘 다 LIFO이다"
          ],
          answer: 1,
          explanation: "stack은 LIFO(Last In, First Out) — 마지막에 넣은 것이 먼저 나와요. queue는 FIFO(First In, First Out) — 먼저 넣은 것이 먼저 나와요!"
        }
      ]
    },
    // ============================================
    // Chapter 2: deque & priority_queue
    // ============================================
    {
      id: "ch2",
      title: "deque & priority_queue",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ deque — 양쪽에서 넣고 빼기!",
          content: `**deque**(덱, Double-Ended Queue)는 **앞과 뒤 양쪽**에서 넣고 뺄 수 있어요!

\`\`\`cpp
#include <deque>
using namespace std;

deque<int> dq;

// 뒤에 넣기/빼기
dq.push_back(10);    // [10]
dq.push_back(20);    // [10, 20]

// 앞에 넣기/빼기
dq.push_front(5);    // [5, 10, 20]

cout << dq.front();   // 5
cout << dq.back();    // 20

// 인덱스 접근도 가능!
cout << dq[1];        // 10

dq.pop_front();       // [10, 20]
dq.pop_back();        // [10]
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
from collections import deque
dq = deque()
dq.append(10)       # push_back
dq.appendleft(5)    # push_front
dq.pop()            # pop_back
dq.popleft()        # pop_front
dq[1]               # 인덱스 접근
\`\`\`

| 파이썬 🐍 | C++ deque ⚡ |
|---|---|
| \`dq.append(x)\` | \`dq.push_back(x)\` |
| \`dq.appendleft(x)\` | \`dq.push_front(x)\` |
| \`dq.pop()\` | \`dq.pop_back()\` |
| \`dq.popleft()\` | \`dq.pop_front()\` |
| \`dq[i]\` | \`dq[i]\` ← 같아요! |

💡 deque는 stack + queue의 기능을 **모두** 가지고 있어요! 앞뒤 양쪽에서 O(1)으로 넣고 뺄 수 있고, 인덱스 접근도 돼요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "덱의 앞에 값을 추가해봐요!",
          code: "deque<int> dq;\ndq.push_back(10);\ndq.push_back(20);\ndq.___(5);  // 앞에 5 추가 → [5, 10, 20]",
          fillBlanks: [
            { id: 0, answer: "push_front", options: ["push_front", "push_back", "insert", "add_front"] }
          ],
          explanation: "deque에서 앞에 원소를 추가하려면 push_front()를 사용해요! push_back()은 뒤에 추가하는 거예요."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "deque 조작 결과!",
          code: "#include <iostream>\n#include <deque>\nusing namespace std;\nint main() {\n    deque<int> dq;\n    dq.push_back(1);\n    dq.push_back(2);\n    dq.push_front(3);\n    dq.pop_back();\n    cout << dq.front() << dq.back();\n    return 0;\n}",
          options: ["31", "12", "32", "21"],
          answer: 0,
          explanation: "push_back(1) → [1], push_back(2) → [1,2], push_front(3) → [3,1,2], pop_back() → [3,1]. front()=3, back()=1이라서 31이 출력돼요!"
        },
        {
          id: "ch2-pq",
          type: "explain",
          title: "⚡ priority_queue — 자동 정렬!",
          content: `병원 응급실을 생각해보세요. 먼저 온 환자가 아니라 **가장 위급한** 환자를 먼저 치료하잖아요? priority_queue가 바로 이거예요!

**priority_queue**는 넣으면 **자동으로 가장 큰 값이 맨 위**에 오는 자료구조예요! (최대 힙)

\`\`\`cpp
#include <queue>  // queue와 같은 헤더!
using namespace std;

priority_queue<int> pq;
pq.push(30);
pq.push(10);
pq.push(50);
pq.push(20);

cout << pq.top();  // 50 (가장 큰 값!)
pq.pop();          // 50 제거
cout << pq.top();  // 30
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍** — \`heapq\` (최소 힙!):
\`\`\`python
import heapq
pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 50)
heapq.heappop(pq)  # 10 (가장 작은 값!)
\`\`\`

| 파이썬 heapq 🐍 | C++ priority_queue ⚡ |
|---|---|
| **최소 힙** (작은 게 먼저) | **최대 힙** (큰 게 먼저) |
| \`heappush(pq, x)\` | \`pq.push(x)\` |
| \`heappop(pq)\` → 값 리턴 | \`pq.pop()\` → 리턴값 없음! |
| \`pq[0]\` | \`pq.top()\` |

**최소 힙**으로 바꾸고 싶다면?
\`\`\`cpp
// greater<int>를 사용하면 최소 힙!
priority_queue<int, vector<int>, greater<int>> minPQ;
minPQ.push(30);
minPQ.push(10);
minPQ.push(50);
cout << minPQ.top();  // 10 (가장 작은 값!)
\`\`\`

**왜 C++은 max-heap이 기본일까요?**
C++의 priority_queue는 **가장 큰 값이 먼저** 나와요 (max-heap). 파이썬의 heapq는 가장 작은 값이 먼저 나오죠 (min-heap).

왜 다를까? C++은 '우선순위가 높은 것 = 큰 숫자'라고 가정해요. 작은 값부터 꺼내고 싶으면? \`priority_queue<int, vector<int>, greater<int>>\`를 사용하세요!

💡 C++은 기본이 **최대 힙**, 파이썬은 기본이 **최소 힙**이에요! 헷갈리지 않게 주의해요!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "priority_queue 결과!",
          code: "#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    priority_queue<int> pq;\n    pq.push(5);\n    pq.push(15);\n    pq.push(10);\n    pq.pop();\n    cout << pq.top();\n    return 0;\n}",
          options: ["5", "10", "15", "에러"],
          answer: 1,
          explanation: "push(5), push(15), push(10) → 최대 힙이라 맨 위는 15예요. pop()으로 15 제거. 그 다음 가장 큰 값은 10이에요! top()은 10을 리턴해요."
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚡ 컨테이너 비교표!",
          content: `## 언제 뭘 쓸까? 한눈에 비교!

| 컨테이너 | 구조 | 넣기/빼기 | 접근 | 언제 쓸까? |
|---|---|---|---|---|
| **vector** | 동적 배열 | 뒤에서 O(1) | 인덱스 O(1) | 대부분의 상황 |
| **stack** | LIFO | top에서만 | top()만 | 되돌리기, 괄호 매칭 |
| **queue** | FIFO | 뒤 push, 앞 pop | front()/back() | BFS, 대기열 |
| **deque** | 양쪽 큐 | 앞뒤 모두 O(1) | 인덱스 O(1) | 앞뒤 모두 필요할 때 |
| **priority_queue** | 힙 | push O(log n) | top()만 | 최대/최소값 빠르게 |

**핵심 정리:**
- **순서대로 처리** → queue (BFS!)
- **되돌리기/역순** → stack (괄호 매칭, undo)
- **앞뒤 모두** → deque (슬라이딩 윈도우)
- **최대/최소 빠르게** → priority_queue (다익스트라, 스케줄링)

\`\`\`
stack:          [1, 2, 3] → pop → 3 (LIFO)
queue:          [1, 2, 3] → pop → 1 (FIFO)
priority_queue: [3, 1, 2] → pop → 3 (최대값!)
deque:          [1, 2, 3] → 앞/뒤 모두 가능!
\`\`\`

💡 면접에서도 자주 나와요! "이 문제에 어떤 자료구조를 쓸 건가요?" 라고 물어보면 이 표를 떠올려봐요!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ priority_queue로 가장 큰 3개 값 출력!",
          content: `priority_queue에서 가장 큰 3개 값을 순서대로 꺼내서 출력하는 코드를 작성해봐요!`,
          code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(40);
    pq.push(10);
    pq.push(50);
    pq.push(30);
    pq.push(20);

    // 가장 큰 3개 출력
    for (int i = 0; i < 3; i++) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(40);
    pq.push(10);
    pq.push(50);
    pq.push(30);
    pq.push(20);

    // for문으로 3번 반복해서 pq.top()을 출력하고 pq.pop()으로 제거하세요

    cout << endl;

    return 0;
}`,
          hint: "for(int i = 0; i < 3; i++) 안에서 pq.top()으로 최댓값을 읽고, pq.pop()으로 제거해요. top()만 하면 안 줄고, pop()이 있어야 다음 값이 나와요",
          expectedOutput: "50 40 30 "
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "priority_queue 관련!",
          content: "C++ `priority_queue<int>`의 기본 동작으로 **올바른** 것은?",
          options: [
            "가장 작은 값이 top()에 온다",
            "넣은 순서대로 나온다",
            "가장 큰 값이 top()에 온다",
            "랜덤 순서로 나온다"
          ],
          answer: 2,
          explanation: "C++ priority_queue는 기본적으로 최대 힙(max-heap)이에요! 가장 큰 값이 top()에 와요. 최소 힙으로 바꾸려면 greater<int>를 세 번째 인자로 넣어야 해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "stack LIFO!",
          content: `이 코드의 출력은?

\`\`\`cpp
stack<int> s;
s.push(10);
s.push(20);
s.push(30);
s.pop();
s.push(40);
cout << s.top();
\`\`\``,
          options: [
            "10",
            "20",
            "30",
            "40"
          ],
          answer: 3,
          explanation: "push(10,20,30) → [10,20,30]. pop() → 30 제거 → [10,20]. push(40) → [10,20,40]. top()은 40이에요!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "queue FIFO!",
          content: `이 코드의 출력은?

\`\`\`cpp
queue<int> q;
q.push(1);
q.push(2);
q.push(3);
q.pop();
q.pop();
cout << q.front();
\`\`\``,
          options: [
            "1",
            "2",
            "3",
            "에러"
          ],
          answer: 2,
          explanation: "push(1,2,3) → [1,2,3]. pop() → 1 제거 → [2,3]. pop() → 2 제거 → [3]. front()는 3이에요! FIFO라서 앞에서부터 제거돼요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "deque 특성!",
          content: "deque에 대한 설명으로 **틀린** 것은?",
          options: [
            "앞과 뒤에서 push/pop이 가능하다",
            "인덱스로 접근할 수 있다",
            "push_front()와 push_back()이 있다",
            "top()으로 맨 위 값을 확인한다"
          ],
          answer: 3,
          explanation: "top()은 stack과 priority_queue에서 쓰는 거예요! deque는 front()와 back()으로 앞뒤 값을 확인해요. 인덱스 접근도 가능하고, 앞뒤 모두 push/pop할 수 있어요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "priority_queue 기본 순서!",
          content: `이 코드의 출력은?

\`\`\`cpp
priority_queue<int> pq;
pq.push(3);
pq.push(1);
pq.push(4);
pq.push(1);
pq.push(5);
cout << pq.top();
\`\`\``,
          options: [
            "1",
            "3",
            "4",
            "5"
          ],
          answer: 3,
          explanation: "priority_queue는 기본이 최대 힙이에요! 3,1,4,1,5 중 가장 큰 값인 5가 top()에 와요."
        },
        {
          id: "ch3-simulation",
          type: "explain",
          title: "🎮 LIFO vs FIFO — 눈으로 비교",
          content: `stack 과 queue 에 같은 데이터를 순서대로 넣고 빼면 어떻게 다른지 직접 비교해봐요.

### 같은 데이터를 push: 1 → 2 → 3 순서로 넣기

\`\`\`cpp
// stack 에 push
stack<int> s;
s.push(1); s.push(2); s.push(3);

// queue 에 push
queue<int> q;
q.push(1); q.push(2); q.push(3);
\`\`\`

**stack 의 내부 상태** (위가 top):
\`\`\`
push 1 → [1]           top = 1
push 2 → [1, 2]        top = 2
push 3 → [1, 2, 3]     top = 3
\`\`\`

**queue 의 내부 상태** (→ 방향으로 이동):
\`\`\`
push 1 → front [1] back
push 2 → front [1, 2] back
push 3 → front [1, 2, 3] back
\`\`\`

### 이제 꺼내면 (pop)?

\`\`\`cpp
// stack 에서 꺼내기
while (!s.empty()) {
    cout << s.top() << " ";
    s.pop();
}
// 출력: 3 2 1  ← 역순! (LIFO)

// queue 에서 꺼내기
while (!q.empty()) {
    cout << q.front() << " ";
    q.pop();
}
// 출력: 1 2 3  ← 넣은 순서대로! (FIFO)
\`\`\`

- **stack**: 3 → 2 → 1 (마지막에 넣은 것이 먼저)
- **queue**: 1 → 2 → 3 (처음에 넣은 것이 먼저)

> 다음 페이지 — 실생활 비유로 4 가지 자료구조 한 번에 정리.`
        },
        {
          id: "ch3-real-world",
          type: "explain",
          title: "🌍 실생활 비유로 자료구조 4 가지 정리",
          content: `이 챕터에서 본 4 가지 자료구조 — 실생활 예시로 묶어 보면 평생 안 잊혀요.

| 자료구조 | 원리 | 실생활 예시 |
|---|---|---|
| **stack** (LIFO) | 마지막 입력 → 먼저 출력 | 접시 쌓기, 뒤로가기 버튼, 실행 취소 (undo) |
| **queue** (FIFO) | 첫 입력 → 먼저 출력 | 줄서기, 프린터 대기열, 메시지 처리 |
| **deque** | 앞뒤 모두 삽입/삭제 | 양방향 줄서기, 덱 카드 |
| **priority_queue** | 우선순위 높은 것이 먼저 | 응급실 진료 순서, 작업 스케줄링 |

### 어디서 쓰이나?

이 자료구조들은 *알고리즘의 도구* 예요:
- **stack** → DFS (깊이 우선 탐색), 괄호 짝짓기, 역순 처리
- **queue** → BFS (너비 우선 탐색), 시뮬레이션
- **priority_queue** → 다익스트라 (최단 경로), 우선순위 작업

> 💡 실제 알고리즘 (그래프 탐색, 최단 경로 등) 에서 어떻게 쓰는지는 **알고리즘 랩** 에서 자세히 다뤄요. 여기서는 *도구를 손에 익히는* 게 목적.`
        },
        {
          id: "ch3-cheatsheet",
          type: "explain",
          title: "📋 stack / queue / priority_queue 명령어 한눈에",
          content: `시험이나 문제 풀 때 옆에 띄워놓고 보세요.

### 📚 stack (LIFO)

| 명령 | 하는 일 |
|---|---|
| \`st.push(x)\` | x 위에 쌓기 |
| \`st.top()\` | 맨 위 값 (제거 X) |
| \`st.pop()\` | 맨 위 제거 (값 안 줌!) |
| \`st.size()\` / \`st.empty()\` | 개수 / 비었나? |

> ⚠️ 값을 쓰려면 항상 \`top()\` → \`pop()\` 두 줄.

### 🚶 queue (FIFO)

| 명령 | 하는 일 |
|---|---|
| \`q.push(x)\` | 뒤에 추가 |
| \`q.front()\` / \`q.back()\` | 앞/뒤 값 (제거 X) |
| \`q.pop()\` | 앞에서 제거 |
| \`q.size()\` / \`q.empty()\` | 개수 / 비었나? |

### ⛰️ priority_queue (힙)

| 명령 | 하는 일 |
|---|---|
| \`pq.push(x)\` | 추가 |
| \`pq.top()\` | 최댓값 (또는 최솟값) 보기 |
| \`pq.pop()\` | 최댓값 (또는 최솟값) 제거 |
| \`pq.size()\` / \`pq.empty()\` | 개수 / 비었나? |

### 📦 선언

\`\`\`cpp
stack<int> st;
queue<int> q;
priority_queue<int> pq;                              // max-heap
priority_queue<int, vector<int>, greater<int>> pq;   // min-heap
\`\`\`

### 🔁 비울 때까지 처리하기

\`\`\`cpp
while (!st.empty()) {
    int x = st.top(); st.pop();
    // 처리...
}
\`\`\`

---

> 📌 **전체 STL 치트시트 (PDF 다운로드 가능):**
> 👉 [**\`/reference/cpp-stl#stack\` 에서 보기**](/reference/cpp-stl#stack)`
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 레슨 18 완료!",
          content: `## 🏆 오늘 배운 것 정리!

### 📦 stack (LIFO — 마지막 입력이 먼저 나와요)
- \`#include <stack>\`
- \`push(x)\` 추가, \`top()\` 확인, \`pop()\` 제거, \`empty()\`, \`size()\`

### 📦 queue (FIFO — 처음 입력이 먼저 나와요)
- \`#include <queue>\`
- \`push(x)\` 추가, \`front()\` 앞 확인, \`back()\` 뒤 확인, \`pop()\` 제거

### ⚡ deque (양쪽 큐)
- \`#include <deque>\`
- \`push_front()\`, \`push_back()\`, \`pop_front()\`, \`pop_back()\`
- 인덱스 접근 가능! \`dq[i]\`

### ⚡ priority_queue (힙)
- \`#include <queue>\`
- 기본: **최대 힙** (큰 값이 top)
- 최소 힙: \`priority_queue<int, vector<int>, greater<int>>\`

| 자료구조 | 접근 함수 | pop 위치 |
|---|---|---|
| stack | \`top()\` | 맨 위(마지막) |
| queue | \`front()\`/\`back()\` | 맨 앞(처음) |
| deque | \`front()\`/\`back()\`/\`[i]\` | 앞 또는 뒤 |
| priority_queue | \`top()\` | 최대값 |

🚀 **다음 레슨 예고:** 파일 I/O & Fast I/O! \`ifstream\`, \`ofstream\`, 그리고 경쟁 프로그래밍에서 쓰는 빠른 입출력을 배워봐요!`
        }
      ]
    }
  ]
}
