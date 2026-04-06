import type { LessonData } from "../types"

export const cppLessonCk8Data: LessonData = {
  id: "cpp-ck8",
  title: "📚 stack/queue 연습 문제",
  emoji: "📚",
  description: "stack, queue, deque, priority_queue를 활용한 실전 문제를 풀어봅니다.",
  chapters: [
    {
      id: "ck8-main",
      title: "stack/queue 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck8-intro",
          type: "explain" as const,
          title: "stack/queue 연습 문제",
          content: `stack, queue, deque, priority_queue의 핵심 활용 패턴을 연습합니다.\n\n총 6문제입니다. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck8-p1",
          type: "practice" as const,
          title: "문제 1: stack으로 문자열 뒤집기",
          content: `stack을 이용해 "Hello" 문자열을 뒤집어 출력하세요.\n\n**출력:** 뒤집힌 문자열`,
          code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    stack<char> st;
    for (int i = 0; i < s.size(); i++) {
        st.push(s[i]);
    }
    while (!st.empty()) {
        cout << st.top();
        st.pop();
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    stack<char> st;
    // 문자열의 각 문자를 st.push()로 넣으세요

    // while(!st.empty())로 st.top()을 출력하고 st.pop()하세요

    cout << endl;
    return 0;
}`,
          expectedOutput: `olleH`,
          hint: "stack에 문자를 하나씩 push한 후, st.top()으로 꺼내며 출력하세요. LIFO라서 역순이 됩니다",
        },
        {
          id: "ck8-p2",
          type: "practice" as const,
          title: "문제 2: 괄호 유효성 검사",
          content: `stack을 이용해 괄호 문자열이 올바른지 검사하세요.\n\n**출력:** 올바르면 "valid", 아니면 "invalid"`,
          code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "(()())";
    stack<char> st;
    bool valid = true;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '(') {
            st.push(s[i]);
        } else {
            if (st.empty()) {
                valid = false;
                break;
            }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "valid" : "invalid") << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "(()())";
    stack<char> st;
    bool valid = true;
    // '('이면 push, ')'이면 스택이 비어있으면 invalid, 아니면 pop
    // 반복 후 스택에 뭔가 남으면 invalid

    cout << (valid ? "valid" : "invalid") << endl;
    return 0;
}`,
          expectedOutput: `valid`,
          hint: "여는 괄호는 push, 닫는 괄호는 pop. 닫을 때 스택이 비어있거나 끝나고 스택에 뭐가 남으면 invalid",
        },
        {
          id: "ck8-p3",
          type: "practice" as const,
          title: "문제 3: queue 순서 출력",
          content: `1부터 5까지 queue에 넣고 순서대로 꺼내 출력하세요.\n\n**출력:** 공백으로 구분하여 한 줄로 출력`,
          code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    for (int i = 1; i <= 5; i++) {
        q.push(i);
    }
    bool first = true;
    while (!q.empty()) {
        if (!first) cout << " ";
        cout << q.front();
        q.pop();
        first = false;
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    for (int i = 1; i <= 5; i++) {
        q.push(i);
    }
    // while(!q.empty())로 q.front()를 출력하고 q.pop()하세요
    // 공백 구분: 첫 원소 전에는 공백 없음

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4 5`,
          hint: "queue는 FIFO. q.front()로 맨 앞 원소를 보고, q.pop()으로 제거하세요",
        },
        {
          id: "ck8-p4",
          type: "practice" as const,
          title: "문제 4: stack push/pop 합계",
          content: `5, 3, 8, 1을 stack에 push한 뒤, 모두 꺼내서 합계를 출력하세요.\n\n**출력:** 합계를 한 줄로 출력`,
          code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    st.push(5);
    st.push(3);
    st.push(8);
    st.push(1);
    int sum = 0;
    while (!st.empty()) {
        sum += st.top();
        st.pop();
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    st.push(5);
    st.push(3);
    st.push(8);
    st.push(1);
    int sum = 0;
    // while(!st.empty())으로 st.top()을 sum에 더하고 st.pop()하세요

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `17`,
          hint: "while(!st.empty())으로 st.top()을 sum에 더하고 st.pop()하세요",
        },
        {
          id: "ck8-p5",
          type: "practice" as const,
          title: "문제 5: priority_queue 상위 3개",
          content: `3, 1, 7, 4, 9를 priority_queue에 넣고 가장 큰 값부터 3개를 출력하세요.\n\n**출력:** 큰 값부터 3개를 한 줄씩 출력`,
          code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(7);
    pq.push(4);
    pq.push(9);
    for (int i = 0; i < 3; i++) {
        cout << pq.top() << endl;
        pq.pop();
    }
    return 0;
}`,
          initialCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(7);
    pq.push(4);
    pq.push(9);
    // 3번 반복: pq.top()을 출력하고 pq.pop()하세요

    return 0;
}`,
          expectedOutput: `9
7
4`,
          hint: "priority_queue는 자동으로 가장 큰 값이 top에 옵니다. pq.top()으로 꺼내고 pq.pop()하세요",
        },
        {
          id: "ck8-p6",
          type: "practice" as const,
          title: "문제 6: deque 앞뒤 삽입 후 출력",
          content: `deque에 앞뒤로 원소를 삽입한 뒤 순서대로 출력하세요.\n\n**출력:** 공백으로 구분하여 한 줄로 출력`,
          code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(3);
    dq.push_back(4);
    dq.push_front(2);
    dq.push_front(1);
    for (int i = 0; i < dq.size(); i++) {
        if (i > 0) cout << " ";
        cout << dq[i];
    }
    cout << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(3);
    dq.push_back(4);
    dq.push_front(2);
    dq.push_front(1);
    // for문으로 dq[i]를 공백 구분하여 출력하세요

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4`,
          hint: "deque는 push_front()로 앞에, push_back()으로 뒤에 넣을 수 있어요. dq[i]로 접근 가능합니다",
        },
      ],
    },
  ],
}
