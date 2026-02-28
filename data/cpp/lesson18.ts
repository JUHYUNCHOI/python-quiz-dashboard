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
          title: "📦 stack — 후입선출(LIFO)!",
          content: `**stack**은 접시 쌓기처럼 **마지막에 넣은 것이 먼저 나오는** 자료구조예요!

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [1, 2]      ← 3이 나옴 (마지막에 넣은 것!)
top    → 2           ← 맨 위 값 확인
\`\`\`

C++에서는 \`#include <stack>\`으로 사용해요:

\`\`\`cpp
#include <stack>
using namespace std;

stack<int> s;
s.push(10);      // 넣기
s.push(20);
s.push(30);

cout << s.top();  // 30 (맨 위 값)
s.pop();          // 30 제거 (리턴값 없음!)
cout << s.top();  // 20

cout << s.size();  // 2
cout << s.empty(); // 0 (false)
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍** — 리스트를 stack처럼 사용:
\`\`\`python
s = []
s.append(10)    # push
s.append(20)
s.pop()         # 20 리턴 + 제거
s[-1]           # top (마지막 원소 확인)
\`\`\`

| 파이썬 🐍 | C++ stack ⚡ |
|---|---|
| \`s.append(x)\` | \`s.push(x)\` |
| \`s.pop()\` → 값 리턴 | \`s.pop()\` → 리턴값 없음! |
| \`s[-1]\` | \`s.top()\` |
| \`len(s)\` | \`s.size()\` |
| \`len(s) == 0\` | \`s.empty()\` |

💡 C++의 \`pop()\`은 값을 **리턴하지 않아요**! 값을 먼저 \`top()\`으로 확인한 후 \`pop()\`으로 제거해요.`
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
          id: "ch1-queue",
          type: "explain",
          title: "📦 queue — 선입선출(FIFO)!",
          content: `**queue**는 줄 서기처럼 **먼저 넣은 것이 먼저 나오는** 자료구조예요!

\`\`\`
push 1 → [1]
push 2 → [1, 2]
push 3 → [1, 2, 3]
pop    → [2, 3]      ← 1이 나옴 (먼저 넣은 것!)
front  → 2           ← 맨 앞 값 확인
\`\`\`

C++에서는 \`#include <queue>\`로 사용해요:

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

파이썬과 비교해봐요:

**파이썬 🐍** — \`collections.deque\`를 queue처럼 사용:
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
| \`q.popleft()\` → 값 리턴 | \`q.pop()\` → 리턴값 없음! |
| \`q[0]\` | \`q.front()\` |
| \`q[-1]\` | \`q.back()\` |

💡 queue는 **BFS(너비 우선 탐색)**에 필수적인 자료구조예요! 그래프 탐색할 때 꼭 쓰여요.`
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
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ stack으로 괄호 매칭 체크!",
          content: `문자열 "(())"의 괄호가 올바른지 stack으로 확인해봐요!

'('를 만나면 push, ')'를 만나면 pop. 끝났을 때 stack이 비어있으면 올바른 괄호예요!`,
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
          content: `**priority_queue**는 넣으면 **자동으로 가장 큰 값이 맨 위**에 오는 자료구조예요! (최대 힙)

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
          content: `5개의 숫자를 priority_queue에 넣고, 가장 큰 3개를 순서대로 출력해봐요!

priority_queue는 자동으로 큰 값이 위에 오니까, top()과 pop()을 반복하면 돼요.`,
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
          id: "ch3-summary",
          type: "explain",
          title: "🎉 레슨 18 완료!",
          content: `## 🏆 오늘 배운 것 정리!

### 📦 stack (LIFO)
- \`#include <stack>\`
- \`push()\`, \`pop()\`, \`top()\`, \`empty()\`, \`size()\`
- 용도: 괄호 매칭, undo, DFS

### 📦 queue (FIFO)
- \`#include <queue>\`
- \`push()\`, \`pop()\`, \`front()\`, \`back()\`
- 용도: BFS, 대기열

### ⚡ deque (양쪽 큐)
- \`#include <deque>\`
- \`push_front()\`, \`push_back()\`, \`pop_front()\`, \`pop_back()\`
- 인덱스 접근 가능! \`dq[i]\`
- 용도: 슬라이딩 윈도우, 앞뒤 모두 필요할 때

### ⚡ priority_queue (힙)
- \`#include <queue>\`
- 기본: **최대 힙** (큰 값이 top)
- 최소 힙: \`priority_queue<int, vector<int>, greater<int>>\`
- 용도: 최대/최소 빠르게 찾기, 다익스트라

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
