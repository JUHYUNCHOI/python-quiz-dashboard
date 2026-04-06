import type { LessonData } from "../types"

export const cppLessonCk8EnData: LessonData = {
  id: "cpp-ck8",
  title: "📚 stack/queue Practice Problems",
  emoji: "📚",
  description: "Solve real problems using stack, queue, deque, and priority_queue.",
  chapters: [
    {
      id: "ck8-main",
      title: "stack/queue Coding Practice",
      emoji: "💪",
      steps: [
        {
          id: "ck8-intro",
          type: "explain" as const,
          title: "stack/queue Practice Problems",
          content: `Practice core patterns for stack, queue, deque, and priority_queue.\n\n6 problems total. Don't worry before you start — use the hints if you get stuck!`,
        },
        {
          id: "ck8-p1",
          type: "practice" as const,
          title: "Problem 1: Reverse a String with a Stack",
          content: `Use a stack to reverse the string "Hello" and print it.\n\n**Output:** The reversed string`,
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
    // Push each character of s onto the stack with st.push()

    // Use while(!st.empty()) to print st.top() then st.pop()

    cout << endl;
    return 0;
}`,
          expectedOutput: `olleH`,
          hint: "Push each character onto the stack, then pop and print. LIFO order gives you the reverse",
        },
        {
          id: "ck8-p2",
          type: "practice" as const,
          title: "Problem 2: Validate Parentheses",
          content: `Use a stack to check whether the parenthesis string is valid.\n\n**Output:** Print "valid" if correct, "invalid" otherwise`,
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
    // '(' → push; ')' → if stack is empty set invalid, else pop
    // After the loop, if the stack is not empty → invalid

    cout << (valid ? "valid" : "invalid") << endl;
    return 0;
}`,
          expectedOutput: `valid`,
          hint: "Push on '(', pop on ')'. If the stack is empty when closing or has leftovers at the end → invalid",
        },
        {
          id: "ck8-p3",
          type: "practice" as const,
          title: "Problem 3: Print Queue in Order",
          content: `Enqueue numbers 1 through 5, then dequeue and print all of them.\n\n**Output:** Print all numbers separated by spaces on one line`,
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
    // Use while(!q.empty()) to print q.front() then q.pop()
    // Separate values with spaces (no leading space)

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4 5`,
          hint: "Queue is FIFO. Use q.front() to peek at the front element, then q.pop() to remove it",
        },
        {
          id: "ck8-p4",
          type: "practice" as const,
          title: "Problem 4: Sum All Elements Popped from a Stack",
          content: `Push 5, 3, 8, 1 onto a stack, pop all of them, and print their sum.\n\n**Output:** The sum on one line`,
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
    // Use while(!st.empty()) to add st.top() to sum, then st.pop()

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `17`,
          hint: "Use while(!st.empty()) to add st.top() to sum, then call st.pop()",
        },
        {
          id: "ck8-p5",
          type: "practice" as const,
          title: "Problem 5: Top 3 from a Priority Queue",
          content: `Push 3, 1, 7, 4, 9 into a priority_queue and print the top 3 largest values.\n\n**Output:** Print the top 3 values from largest to smallest, one per line`,
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
    // Repeat 3 times: print pq.top() then pq.pop()

    return 0;
}`,
          expectedOutput: `9
7
4`,
          hint: "priority_queue automatically keeps the largest value at top. Print pq.top() then call pq.pop()",
        },
        {
          id: "ck8-p6",
          type: "practice" as const,
          title: "Problem 6: Insert at Both Ends of a Deque",
          content: `Insert elements at both ends of a deque, then print all elements in order.\n\n**Output:** Print all elements separated by spaces on one line`,
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
    // Use a for loop to print dq[i] separated by spaces

    cout << endl;
    return 0;
}`,
          expectedOutput: `1 2 3 4`,
          hint: "deque supports push_front() at the front and push_back() at the back. Access elements with dq[i]",
        },
      ],
    },
  ],
}
