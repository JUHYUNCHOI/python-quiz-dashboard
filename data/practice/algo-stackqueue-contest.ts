import type { PracticeCluster } from "./types"

export const stackQueueContestCluster: PracticeCluster = {
  id: "algo-stackqueue-contest",
  title: "스택/큐 문제 풀이",
  emoji: "🏆",
  description: "monotonic stack, 괄호 매칭, 슬라이딩 윈도우 최대값 — 도구로 쓰는 패턴",
  unlockAfter: "algo-stackqueue",
  en: {
    title: "Stack/Queue Practice",
    description: "Monotonic stack, bracket matching, sliding window max — using as a tool",
  },
  problems: [
    // ═════════════════════════════════════════════════════════════════
    // 쉬움 입문 (on-ramp): 스택 뒤집기 → 괄호 깊이(스택) → 카드 버리기(큐)
    // ═════════════════════════════════════════════════════════════════
    {
      id: "asq-e01",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "쉬움",
      kl: true,
      title: "스택으로 뒤집기",
      description: `N개의 정수를 입력 순서의 **반대로** 출력하라.

스택은 **나중에 넣은 게 먼저 나오는(LIFO)** 자료구조다. 전부 넣었다가 하나씩 꺼내면 자연히 역순이 된다 — 스택의 가장 기본 감각.`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    // TODO: 역순으로 공백 구분 출력 (스택에 넣었다 꺼내는 것과 같음)

    return 0;
}`,
      pyInitialCode: `n = int(input())
a = list(map(int, input().split()))
# TODO: 역순으로 공백 구분 출력`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "3\n10 20 30", expectedOutput: "30 20 10", label: "3개" },
      ],
      hints: ["전부 스택(또는 배열)에 넣고, 뒤에서부터 꺼내면 역순.", "Python: a[::-1] 로 뒤집기."],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int i = n - 1; i >= 0; i--) {
        cout << a[i];
        if (i > 0) cout << ' ';
    }
    cout << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
a = list(map(int, input().split()))
print(*a[::-1])`,
      solutionExplanation: "스택은 LIFO라 다 넣었다 꺼내면 역순입니다. 배열을 뒤에서부터 출력하는 것과 같아요.",
      en: {
        title: "Reverse with a Stack",
        description: `Print N integers in **reverse** of input order. A stack is **last-in-first-out**: push everything, pop one by one, and you get the reverse — the most basic stack feel.`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: ["Push all, pop from the end → reversed.", "Python: a[::-1]."],
        solutionExplanation: "A stack is LIFO, so pushing all then popping reverses the order.",
      },
    },
    {
      id: "asq-e02",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "쉬움",
      kl: true,
      title: "괄호의 최대 깊이",
      description: `올바른 괄호 문자열 \`(\`, \`)\` 만으로 이루어진 문자열이 주어진다. **가장 깊이 중첩된 정도**(최대 깊이)를 출력하라.

\`(\` 를 만나면 깊이 +1, \`)\` 를 만나면 -1. 그동안의 최댓값이 답이다 — 스택의 '크기'를 추적하는 감각.`,
      constraints: "1 ≤ 길이 ≤ 100,000, 항상 올바른 괄호 문자열",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    // TODO: '(' 면 깊이+1(최댓값 갱신), ')' 면 깊이-1

    return 0;
}`,
      pyInitialCode: `s = input().strip()
# TODO: 최대 중첩 깊이 출력`,
      testCases: [
        { stdin: "(()())", expectedOutput: "2", label: "최대 2" },
        { stdin: "((()))", expectedOutput: "3", label: "최대 3" },
        { stdin: "()()", expectedOutput: "1", label: "평평" },
        { stdin: "()", expectedOutput: "1", label: "한 쌍" },
      ],
      hints: ["변수 d(현재 깊이)와 mx(최댓값).", "'(' → d++ 후 mx=max(mx,d). ')' → d--."],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int d = 0, mx = 0;
    for (char c : s) {
        if (c == '(') { d++; mx = max(mx, d); }
        else d--;
    }
    cout << mx << '\\n';
    return 0;
}`,
      pySolutionCode: `s = input().strip()
d = 0
mx = 0
for c in s:
    if c == '(':
        d += 1
        mx = max(mx, d)
    else:
        d -= 1
print(mx)`,
      solutionExplanation: "여는 괄호에서 깊이를 올리고 닫는 괄호에서 내리며, 그동안의 최대 깊이를 기록합니다. 스택에 쌓인 높이를 세는 것과 같아요.",
      en: {
        title: "Max Bracket Depth",
        description: `Given a valid string of \`(\` and \`)\`, print the **maximum nesting depth**. \`(\` adds 1, \`)\` subtracts 1; the running maximum is the answer — tracking a stack's size.`,
        constraints: "1 ≤ length ≤ 100,000, always a valid bracket string",
        hints: ["Keep d (current depth) and mx (max).", "'(' → d++ then mx=max(mx,d); ')' → d--."],
        solutionExplanation: "Raise depth on '(', lower on ')', record the max — equals the height of the stack.",
      },
    },
    {
      id: "asq-e03",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "쉬움",
      kl: true,
      title: "카드 버리기 (큐)",
      description: `1부터 N까지 번호가 적힌 카드가 차례로 쌓여 있다 (맨 위 1, 그 아래 2, …). 다음을 카드가 한 장 남을 때까지 반복한다:

1. 맨 위 카드를 **버린다**.
2. 그 다음 맨 위 카드를 맨 **아래로** 옮긴다.

마지막에 남는 카드의 번호를 출력하라. **큐(먼저 넣은 게 먼저 나오는, FIFO)** 로 그대로 흉내 내면 된다.

출처: BOJ 2164 paraphrased`,
      constraints: "1 ≤ N ≤ 500,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);
    // TODO: 한 장 남을 때까지 (버리기 + 맨 아래로 옮기기) 반복

    return 0;
}`,
      pyInitialCode: `from collections import deque
n = int(input())
q = deque(range(1, n + 1))
# TODO: 한 장 남을 때까지 popleft 2번(버리고 옮기기) 반복`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1장" },
        { stdin: "2", expectedOutput: "2", label: "2장" },
        { stdin: "4", expectedOutput: "4", label: "4장" },
        { stdin: "6", expectedOutput: "4", label: "6장" },
        { stdin: "7", expectedOutput: "6", label: "7장" },
      ],
      hints: [
        "큐에 1..N 을 넣는다.",
        "크기가 1보다 큰 동안: front 버리고(pop), 다음 front 를 빼서 뒤에 다시 push.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);
    while (q.size() > 1) {
        q.pop();                 // 맨 위 버리기
        q.push(q.front());       // 다음 카드를 맨 아래로
        q.pop();
    }
    cout << q.front() << '\\n';
    return 0;
}`,
      pySolutionCode: `from collections import deque
n = int(input())
q = deque(range(1, n + 1))
while len(q) > 1:
    q.popleft()            # 맨 위 버리기
    q.append(q.popleft())  # 다음 카드를 맨 아래로
print(q[0])`,
      solutionExplanation: "큐로 카드 더미를 그대로 흉내 냅니다. 앞에서 한 장 버리고(pop), 그 다음 한 장을 빼서 뒤에 다시 넣기(push)를 한 장 남을 때까지 반복해요.",
      en: {
        title: "Discard Cards (Queue)",
        description: `Cards 1..N are stacked (1 on top). Repeat until one card remains: (1) discard the top card, (2) move the next top card to the bottom. Print the last remaining card. Simulate directly with a **queue (FIFO)**.`,
        constraints: "1 ≤ N ≤ 500,000",
        hints: ["Push 1..N into a queue.", "While size>1: pop the front (discard), then move the next front to the back."],
        solutionExplanation: "Simulate the pile with a queue: discard the front, then push the next front to the back, until one remains.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 1. 괄호 짝 맞추기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-001",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "보통",
      kl: true,
      title: "괄호 짝 맞추기",
      description: `T개의 문자열이 주어진다. 각 문자열은 \`(\` 와 \`)\` 만으로 이루어져 있다. 각 문자열에 대해 모든 괄호가 올바르게 짝지어졌는지 판정하라.

올바른 괄호 문자열 (VPS, Valid Parenthesis String) 의 정의:
- 빈 문자열은 VPS
- VPS \`X\` 에 대해 \`(X)\` 도 VPS
- 두 VPS \`X\`, \`Y\` 에 대해 \`XY\` 도 VPS

각 문자열에 대해 YES 또는 NO 를 한 줄에 출력.

출처: BOJ 9012 (괄호) paraphrased`,
      constraints: "1 ≤ T ≤ 50, 각 문자열 길이 1 ≤ L ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6\n(())())\n(((()())()\n(()())((()))\n((()()(()))(((())))()\n()()()()(()()())()\n(()((())()(",
          expectedOutput: "NO\nNO\nYES\nNO\nYES\nNO",
          label: "BOJ 9012 원본 예제",
        },
        { stdin: "1\n()", expectedOutput: "YES", label: "최소 VPS" },
        { stdin: "1\n)(", expectedOutput: "NO", label: "닫는 괄호가 먼저" },
        { stdin: "1\n(", expectedOutput: "NO", label: "열기만 — 짝 없음" },
        {
          stdin: "3\n()\n((()))\n(()(()))",
          expectedOutput: "YES\nYES\nYES",
          label: "모두 유효",
        },
        {
          stdin: "2\n(()\n())",
          expectedOutput: "NO\nNO",
          label: "한 쪽 부족",
        },
      ],
      hints: [
        "스택 대신 **카운터** 만으로도 풀린다 — `(` 만나면 +1, `)` 만나면 -1. 음수가 되면 즉시 NO, 끝까지 가서 0 이면 YES.",
        "**중요**: 중간에 카운터가 음수가 되는 순간 끊는 게 핵심. 예: `)(`. 합으로 0 이지만 NO.",
        "한 글자가 한 종류뿐일 때는 스택 안 쓰고 카운터로 충분 — 스택은 여러 종류 괄호일 때 빛난다 (다음 문제).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int cnt = 0;
        bool ok = true;
        for (char c : s) {
            if (c == '(') cnt++;
            else cnt--;
            if (cnt < 0) { ok = false; break; }
        }
        if (cnt != 0) ok = false;
        cout << (ok ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

t = int(input())
for _ in range(t):
    s = input().strip()
    # TODO: 카운터로 짝 검사
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

t = int(input())
out = []
for _ in range(t):
    s = input().strip()
    cnt = 0
    ok = True
    for c in s:
        if c == '(':
            cnt += 1
        else:
            cnt -= 1
        if cnt < 0:
            ok = False
            break
    if cnt != 0:
        ok = False
    out.append("YES" if ok else "NO")
print('\\n'.join(out))
`,
      solutionExplanation:
        "괄호 종류가 하나면 스택 대신 카운터 정수 하나로 시뮬레이션 가능 — 사실상 '스택의 크기' 만 추적하는 셈. 핵심은 중간에 음수가 되면 즉시 실패 처리. 그렇지 않으면 `)(` 같이 합은 0 인데 잘못된 케이스를 놓친다.",
      en: {
        title: "Balanced Parentheses",
        description: `Given T strings of only \`(\` and \`)\`, decide whether each one is a valid parenthesis string (VPS).

VPS rules:
- Empty string is a VPS
- If \`X\` is a VPS, so is \`(X)\`
- If \`X\` and \`Y\` are VPS, so is \`XY\`

Print YES or NO for each.

Source: BOJ 9012 paraphrased`,
        constraints: "1 ≤ T ≤ 50, each string length 1 ≤ L ≤ 100",
        hints: [
          "A counter is enough: +1 on `(`, -1 on `)`. If it ever goes negative → NO. End at 0 → YES.",
          "**Key**: failing the moment the count goes negative — without this you'd accept `)(`.",
          "When there's only one bracket type, a counter is enough. Real stacks shine with multiple types (next problem).",
        ],
        solutionExplanation:
          "With only one bracket type, a counter (the stack's current size) suffices. The trick is failing the instant it goes negative — otherwise `)(` slips through with net 0.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 중첩 괄호 검사 (소,중,대) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-002",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "세 종류 괄호 짝 맞추기",
      description: `한 줄의 문자열이 주어진다. 세 종류의 괄호 \`(\`/\`)\`, \`[\`/\`]\`, \`{\`/\`}\` 가 섞여 있다. 모두 올바르게 짝지어졌는지 (열린 종류와 닫는 종류가 일치하고, 가장 마지막에 열린 게 가장 먼저 닫혀야 함) 판정해 YES 또는 NO 를 출력하라.

예:
- \`({[]})\` → YES
- \`([)]\` → NO (중첩 순서가 어긋남)
- \`{[}]\` → NO

출처: LeetCode 20 (Valid Parentheses) paraphrased`,
      constraints: "1 ≤ 문자열 길이 ≤ 100,000, 문자는 \`()[]{}\` 중 하나",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "({[]})", expectedOutput: "YES", label: "기본 중첩" },
        { stdin: "()[]{}", expectedOutput: "YES", label: "병렬" },
        { stdin: "([)]", expectedOutput: "NO", label: "중첩 순서 어긋남" },
        { stdin: "{[}]", expectedOutput: "NO", label: "중첩 순서 어긋남 2" },
        { stdin: "(", expectedOutput: "NO", label: "열기만" },
        { stdin: ")", expectedOutput: "NO", label: "닫기부터" },
        {
          stdin: "{[()]({})[{}]}",
          expectedOutput: "YES",
          label: "깊은 중첩",
        },
        { stdin: "(((", expectedOutput: "NO", label: "왼쪽만" },
      ],
      hints: [
        "여는 괄호는 스택에 push, 닫는 괄호는 스택 top 과 짝인지 확인 후 pop.",
        "닫는 괄호인데 스택이 비어 있다 → 즉시 NO.",
        "마지막에 스택이 비어 있어야 YES — 짝 못 찾은 여는 괄호가 남아 있으면 NO.",
        "짝 매칭은 `(/)`, `[/]`, `{/}` 3 쌍을 if-else 또는 map 으로 처리.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) { ok = false; break; }
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                ok = false; break;
            }
            st.pop();
        }
    }
    if (!st.empty()) ok = false;
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

s = sys.stdin.readline().strip()
# TODO: 여는 괄호 push, 닫는 괄호는 top 과 짝 확인 후 pop
`,
      pySolutionCode: `import sys

s = sys.stdin.readline().strip()
st = []
pair = {')': '(', ']': '[', '}': '{'}
ok = True
for c in s:
    if c in '([{':
        st.append(c)
    else:
        if not st or st[-1] != pair[c]:
            ok = False
            break
        st.pop()
if st:
    ok = False
print("YES" if ok else "NO")
`,
      solutionExplanation:
        "여러 종류 괄호 매칭은 정수 카운터로는 불가능 — 가장 마지막에 연 종류가 무엇이었는지 기억해야 한다. 그래서 스택. 닫을 때마다 top 과 짝 비교 후 pop. 마지막 스택이 비어 있어야 모두 짝 맞춰진 것.",
      en: {
        title: "Three Bracket Types — Balanced?",
        description: `Given a single string with \`()\`, \`[]\`, \`{}\` mixed, decide whether all brackets are correctly matched (types match and nesting order is preserved). Print YES or NO.

- \`({[]})\` → YES
- \`([)]\` → NO (crossed nesting)
- \`{[}]\` → NO

Source: LeetCode 20 paraphrased`,
        constraints: "1 ≤ length ≤ 100,000, characters are one of `()[]{}`",
        hints: [
          "Push opens; on a close, peek the stack top and confirm the pair, then pop.",
          "Close with empty stack → immediate NO.",
          "Stack must end empty — leftover opens mean NO.",
          "Match `(/)`, `[/]`, `{/}` with if-else or a map.",
        ],
        solutionExplanation:
          "Multi-type matching can't be done with a counter — you need to remember which type was most recently opened. That's exactly what a stack tracks. End-of-input: empty stack ⇔ valid.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 회문 검사 — 큐와 스택 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-003",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "보통",
      kl: true,
      title: "회문 검사 (스택 + 큐)",
      description: `한 줄의 영문 소문자 문자열이 주어진다. 회문(palindrome — 앞으로 읽으나 뒤로 읽으나 같은 문자열)이면 YES, 아니면 NO 를 출력하라.

이 문제는 **스택과 큐를 동시에 쓰는 고전 패턴** 으로 풀어라.
- 모든 글자를 **스택과 큐 둘 다에 push**.
- 둘에서 한 글자씩 꺼낸다 — 스택은 뒤에서, 큐는 앞에서.
- 모든 단계에서 꺼낸 글자가 일치하면 회문.

(물론 \`s == reverse(s)\` 한 줄로도 풀리지만, 자료구조 비교 학습이 목적.)

출처: 원본 (스택 vs 큐 동작 차이 학습)`,
      constraints: "1 ≤ 문자열 길이 ≤ 100,000, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "level", expectedOutput: "YES", label: "기본 회문" },
        { stdin: "hello", expectedOutput: "NO", label: "회문 아님" },
        { stdin: "a", expectedOutput: "YES", label: "한 글자" },
        { stdin: "aa", expectedOutput: "YES", label: "두 글자 같음" },
        { stdin: "ab", expectedOutput: "NO", label: "두 글자 다름" },
        { stdin: "racecar", expectedOutput: "YES", label: "홀수 길이 회문" },
        { stdin: "abccba", expectedOutput: "YES", label: "짝수 길이 회문" },
        { stdin: "abcba", expectedOutput: "YES", label: "홀수 가운데 글자" },
        { stdin: "abcde", expectedOutput: "NO", label: "회문 아님 — 모두 다름" },
      ],
      hints: [
        "`stack<char>` 와 `queue<char>` 에 같은 글자들을 push.",
        "스택 top = 뒤에서 첫 글자, 큐 front = 앞에서 첫 글자. 둘이 같으면 양쪽 pop 하고 계속.",
        "한 번이라도 다르면 즉시 NO.",
        "C++ 의 `stack::top()` 은 마지막에 push 된 원소, `queue::front()` 는 가장 먼저 push 된 원소.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    stack<char> st;
    queue<char> q;
    for (char c : s) {
        st.push(c);
        q.push(c);
    }
    bool ok = true;
    while (!st.empty()) {
        if (st.top() != q.front()) { ok = false; break; }
        st.pop();
        q.pop();
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque

s = sys.stdin.readline().strip()
# TODO: 스택 (list) 과 큐 (deque) 양쪽에 push, 동시에 pop 하며 비교
`,
      pySolutionCode: `import sys
from collections import deque

s = sys.stdin.readline().strip()
st = []          # 스택: 뒤에서 꺼냄 (list.pop)
q = deque()      # 큐: 앞에서 꺼냄 (popleft)
for c in s:
    st.append(c)
    q.append(c)
ok = True
while st:
    if st[-1] != q[0]:
        ok = False
        break
    st.pop()
    q.popleft()
print("YES" if ok else "NO")
`,
      solutionExplanation:
        "스택과 큐는 같은 데이터를 넣어도 꺼내는 방향이 정반대. 둘에서 동시에 꺼내며 비교하면 자연스럽게 '앞 vs 뒤' 비교가 된다. 회문 = 앞에서 읽으나 뒤에서 읽으나 같다 = 큐 front vs 스택 top 이 끝까지 일치.",
      en: {
        title: "Palindrome (Stack + Queue)",
        description: `Given a single lowercase string, decide whether it is a palindrome. Print YES or NO.

Solve it using **both a stack and a queue** as a teaching exercise:
- Push every character onto **both** a stack and a queue.
- Pop one at a time — stack pops from the back, queue pops from the front.
- All pops match → palindrome.

(Yes, \`s == reverse(s)\` works in one line. The goal is comparing the two structures.)

Source: original (stack-vs-queue contrast)`,
        constraints: "1 ≤ length ≤ 100,000, lowercase English",
        hints: [
          "Push the same chars into `stack<char>` and `queue<char>`.",
          "Stack top = last char, queue front = first char. Match → pop both and continue.",
          "Any mismatch → immediate NO.",
          "C++: `stack::top()` is the most recently pushed, `queue::front()` is the earliest pushed.",
        ],
        solutionExplanation:
          "Same data in, opposite directions out. Comparing stack top vs queue front pairs the first char with the last, second with the second-last, and so on — exactly the palindrome check.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 막대 그래프의 가장 큰 직사각형 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-004",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "히스토그램에서 가장 큰 직사각형",
      description: `너비 1, 높이 \`h[i]\` 의 막대 N개가 나란히 서 있다 (히스토그램). 이 안에 들어가는 **축 정렬된 직사각형 중 넓이가 가장 큰 것** 의 넓이를 출력하라.

직사각형은 인접한 막대들 위에 놓이는데, **가장 낮은 막대 높이로 잘린다**.

핵심 통찰: 각 막대 \`h[i]\` 가 직사각형의 높이가 된다고 가정했을 때, 좌우로 \`h[i]\` 이상 막대가 연속한 만큼이 그 직사각형의 너비. 모든 \`i\` 에 대해 (높이 × 너비) 의 최댓값.

**Monotonic stack** 으로 O(N) — 각 막대마다 '왼쪽으로 자기보다 낮은 첫 막대'와 '오른쪽으로 자기보다 낮은 첫 막대'를 한 번에 찾는다.

출처: LeetCode 84 (Largest Rectangle in Histogram) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ h[i] ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6\n2 1 5 6 2 3",
          expectedOutput: "10",
          label: "기본 — 높이 5와 6 두 개로 5×2=10",
        },
        { stdin: "1\n5", expectedOutput: "5", label: "막대 1개" },
        { stdin: "2\n2 4", expectedOutput: "4", label: "막대 2개" },
        { stdin: "4\n5 5 5 5", expectedOutput: "20", label: "전부 같은 높이 — 5×4" },
        {
          stdin: "5\n1 2 3 4 5",
          expectedOutput: "9",
          label: "오름차순 — 3×3 (3,4,5 사용) 또는 2×4 등. 최댓값 9",
        },
        {
          stdin: "5\n5 4 3 2 1",
          expectedOutput: "9",
          label: "내림차순 — 대칭",
        },
        { stdin: "3\n0 0 0", expectedOutput: "0", label: "전부 0" },
        {
          stdin: "7\n6 7 5 2 4 5 6",
          expectedOutput: "15",
          label: "혼합 — 높이 5×너비 3 (앞 3개) = 15",
        },
      ],
      hints: [
        "각 막대 i 가 '자기 높이로 만들 수 있는 가장 넓은 직사각형'을 책임진다고 보자.",
        "왼쪽으로 자기보다 **작은** 첫 막대 위치 L, 오른쪽으로 자기보다 **작은** 첫 막대 위치 R 을 찾으면 너비 = R - L - 1.",
        "단조 증가 스택으로 한 번 훑으면 모든 i 에 대해 L 과 R 을 O(N) 에 찾을 수 있다 — 스택 top 이 자기보다 크거나 같으면 pop 하면서 그 막대의 R 을 현재 i 로 결정.",
        "넓이가 \`10^9 × 10^5\` 까지 가므로 long long 필수.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    // 단조 증가 스택. 스택에는 인덱스를 저장.
    stack<int> st;
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        long long cur = (i == n ? -1 : h[i]);
        // 현재 막대보다 키 큰 스택 원소는 여기까지가 끝 → 직사각형 면적 계산
        while (!st.empty() && h[st.top()] > cur) {
            long long height = h[st.top()];
            st.pop();
            // 새 왼쪽 경계: 스택이 비면 -1, 아니면 새 top
            long long left = st.empty() ? -1 : st.top();
            long long width = i - left - 1;
            best = max(best, height * width);
        }
        if (i < n) st.push(i);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
h = [int(x) for x in data[1:1+n]]
# TODO: 단조 증가 스택으로 각 막대의 좌우 경계 찾기
`,
      pySolutionCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
h = [int(x) for x in data[1:1+n]]

st = []  # 인덱스 저장, h[st] 가 단조 증가
best = 0
for i in range(n + 1):
    cur = -1 if i == n else h[i]
    while st and h[st[-1]] > cur:
        height = h[st.pop()]
        left = st[-1] if st else -1
        width = i - left - 1
        if height * width > best:
            best = height * width
    if i < n:
        st.append(i)
print(best)
`,
      solutionExplanation:
        "**Monotonic increasing stack 의 표준 패턴**. 스택은 '아직 오른쪽 경계가 안 정해진 막대들의 인덱스' 를 키 오름차순으로 보관. 새 막대가 들어올 때 스택 top 이 그보다 크면 → top 의 오른쪽 경계가 결정됨 → 면적 계산 후 pop. 끝까지 가면 가상의 높이 -1 막대를 둬서 남은 스택을 비운다. 각 인덱스가 정확히 한 번 push, 한 번 pop → O(N). 파이썬은 임의 정수 → overflow 걱정 없음.",
      en: {
        title: "Largest Rectangle in Histogram",
        description: `N bars of width 1 and height \`h[i]\` stand side by side. Find the **largest axis-aligned rectangle** that fits inside the histogram.

A rectangle sits on consecutive bars and is **capped by the shortest bar in its range**.

Insight: if bar \`h[i]\` is the rectangle's height, the width is how far you can extend left/right while staying at least \`h[i]\`. The answer is max over all i of (height × width).

Solve in O(N) with a **monotonic stack** — for each bar, find the nearest shorter bar on each side in one pass.

Source: LeetCode 84 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ h[i] ≤ 1,000,000,000",
        hints: [
          "Each bar i 'owns' the widest rectangle of its own height.",
          "If L = nearest shorter on the left, R = nearest shorter on the right, then width = R - L - 1.",
          "A monotonic-increasing stack finds both in one O(N) sweep — when the top is taller than the current bar, that top's R is now fixed.",
          "Area can hit 10^9 × 10^5 — use long long.",
        ],
        solutionExplanation:
          "Standard monotonic-increasing-stack pattern. The stack holds indices of bars whose right boundary isn't fixed yet, in increasing height. When a smaller bar arrives, taller stack entries get their right boundary, pop, compute area. A sentinel -1 at the end flushes the stack. Each index is pushed/popped at most once → O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 다음 큰 수 (Next Greater Element) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-005",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "오큰수 (Next Greater Element)",
      description: `N개의 정수 수열 \`A\` 가 주어진다. 각 \`A[i]\` 에 대해 **자기 오른쪽에 있는 수들 중 자기보다 큰 첫 번째 수** 를 출력하라. 없으면 \`-1\`.

출력은 한 줄에 N개의 결과를 공백으로 구분.

예: \`A = [3, 5, 2, 7]\` → \`[5, 7, 7, -1]\`

N 이 100,000 까지이므로 O(N²) 이중 루프는 시간 초과. **Monotonic stack 으로 O(N)** 이 필수.

출처: BOJ 17298 (오큰수) / LeetCode 496 paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ A[i] ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4\n3 5 2 7",
          expectedOutput: "5 7 7 -1",
          label: "기본",
        },
        { stdin: "1\n10", expectedOutput: "-1", label: "원소 1개" },
        {
          stdin: "4\n9 5 4 8",
          expectedOutput: "-1 8 8 -1",
          label: "내림차순 시작",
        },
        {
          stdin: "5\n1 2 3 4 5",
          expectedOutput: "2 3 4 5 -1",
          label: "오름차순 — 모두 자기 바로 오른쪽",
        },
        {
          stdin: "5\n5 4 3 2 1",
          expectedOutput: "-1 -1 -1 -1 -1",
          label: "내림차순 — 모두 없음",
        },
        {
          stdin: "5\n3 3 3 3 3",
          expectedOutput: "-1 -1 -1 -1 -1",
          label: "전부 같음 — 자기보다 '큰' 수만 OK",
        },
        {
          stdin: "6\n2 7 3 4 6 1",
          expectedOutput: "7 -1 4 6 -1 -1",
          label: "복합",
        },
      ],
      hints: [
        "스택에 **아직 답을 못 찾은 인덱스들** 을 보관. 새 원소 A[i] 가 스택 top 의 값보다 크면 → top 의 답이 A[i] 로 결정 → pop. 더 이상 클 게 없을 때까지 반복.",
        "마지막에 스택에 남은 인덱스들의 답은 -1.",
        "각 인덱스가 정확히 한 번 push 되고 한 번 pop 되므로 O(N).",
        "스택에는 **값이 아니라 인덱스** 를 저장하는 게 결과 배열을 채우기 편하다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n), ans(n, -1);
    for (int i = 0; i < n; i++) cin >> a[i];

    stack<int> st; // 아직 답을 못 찾은 인덱스들 (값 내림차순)
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << ans[i];
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
a = [int(x) for x in data[1:1+n]]
# TODO: 단조 감소 스택으로 각 인덱스의 오큰수 채우기
`,
      pySolutionCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
a = [int(x) for x in data[1:1+n]]

ans = [-1] * n
st = []  # 아직 답을 못 찾은 인덱스들 (값 내림차순)
for i in range(n):
    while st and a[st[-1]] < a[i]:
        ans[st.pop()] = a[i]
    st.append(i)
print(' '.join(str(x) for x in ans))
`,
      solutionExplanation:
        "오큰수의 표준 monotonic stack 풀이. '스택에는 답 아직 못 찾은 인덱스만 보관' 이라고 생각하면 명확. 새 원소가 들어올 때 그보다 작은 스택 원소들의 답이 한꺼번에 결정되고 pop. 각 원소 1번씩 push/pop → O(N).",
      en: {
        title: "Next Greater Element",
        description: `Given a sequence \`A\` of N integers, for each \`A[i]\` print the **first value to its right that is strictly greater**, or \`-1\` if none.

Output: N answers on one line, space-separated.

Example: \`A = [3, 5, 2, 7]\` → \`[5, 7, 7, -1]\`

N up to 100,000 — O(N²) is too slow. **Monotonic stack in O(N)** is required.

Source: BOJ 17298 / LeetCode 496 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ A[i] ≤ 1,000,000",
        hints: [
          "Stack holds indices whose answer is not yet known. When the new value exceeds the stack top's value → that index's answer is the new value → pop.",
          "Indices left on the stack at the end get -1.",
          "Each index is pushed and popped once → O(N).",
          "Store indices (not values) so writing into the answer array is easy.",
        ],
        solutionExplanation:
          "Canonical monotonic-stack template. The stack holds 'still waiting' indices in descending value. A new larger value resolves all smaller-stack entries at once. O(N) amortized.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 주식 가격 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-006",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "주식 가격 (가격이 떨어지지 않은 기간)",
      description: `\`N\` 개의 일별 주식 가격 \`P[0..N-1]\` 가 입력 순으로 주어진다. 각 날짜 \`i\` 에 대해 다음을 출력하라:

> "그 날의 가격이 **떨어지지 않은** 채로 며칠 동안 이어졌는가?" — \`i\` 자신을 포함해서 카운트한다.

다른 표현: \`P[i]\` 보다 **큰** \`P[j]\` 가 처음 나오는 가장 작은 \`j > i\` 를 \`R\` 이라 하면 답은 \`R - i\`. 만약 그런 \`j\` 가 없으면 \`N - i\`.

예: \`P = [100, 80, 60, 70, 60, 75, 85]\` → 답 \`[1, 1, 1, 2, 1, 4, 6]\`
- 날짜 5 (가격 75): 6 (85) 에서 떨어지지 않음이 깨짐, 6-5 = ... 아니 더 큰 가격 85 가 6 일에 나옴. 그래서 가격 75 가 유지된 기간은 6-5 = 1 일. 답이 그대로 1 이 아니라 4 인 이유는: 5일 자신 + 미래 1일은 거짓이고 사실 5일부터 끝까지(N-i = 7-5 = 2) ... 다시 보자.

**정확한 정의**: \`i\` 일의 답 = \`P[j] > P[i]\` 인 가장 작은 \`j > i\` 를 \`R\` 이라 할 때 \`R - i\`. 그런 \`j\` 가 없으면 \`N - i\`.

예 재검증: \`P = [100, 80, 60, 70, 60, 75, 85]\`
- i=0 (100): 더 큰 가격 없음 → N-i = 7
- i=1 (80): 더 큰 가격 첫 등장 = i=0 ?  아니, \`j > i\`. j=0 은 안 됨. 100 은 과거. 미래에 80 보다 큰 건 없음 → N-i = 6
- ...

복잡하니 출처 정의를 그대로 쓰자: BOJ 17298 정의는 위와 다르다. 본 문제는 **N - (다음 더 큰 가격의 인덱스) 또는 0** 이 아니라 LC 901-style: "현재 가격까지 며칠 연속으로 더 작거나 같았는가" (i 포함).

다시 명확하게: 답[i] = "최대 k 개의 연속된 날 \`i, i-1, i-2, ...\` 동안 \`P[해당날] ≤ P[i]\` 가 성립하는 k" (즉 i 자신과 그 직전 며칠).

예: \`P = [100, 80, 60, 70, 60, 75, 85]\`
- i=0: 자기만 → 1
- i=1 (80): 100 ≤ 80 거짓 → 1
- i=2 (60): 80 ≤ 60 거짓 → 1
- i=3 (70): 60 ≤ 70 참, 80 ≤ 70 거짓 → 2
- i=4 (60): 70 ≤ 60 거짓 → 1
- i=5 (75): 60 ≤ 75, 70 ≤ 75, 80 ≤ 75 거짓 → 4
- i=6 (85): 75 ≤, 60 ≤, 70 ≤, 80 ≤, 100 ≤ 거짓 → 6

답: \`1 1 1 2 1 4 6\` ✓

출처: LeetCode 901 (Online Stock Span) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ P[i] ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "7\n100 80 60 70 60 75 85",
          expectedOutput: "1 1 1 2 1 4 6",
          label: "기본",
        },
        { stdin: "1\n50", expectedOutput: "1", label: "1일" },
        {
          stdin: "5\n1 2 3 4 5",
          expectedOutput: "1 2 3 4 5",
          label: "오름차순 — 각자 자기까지 다 포함",
        },
        {
          stdin: "5\n5 4 3 2 1",
          expectedOutput: "1 1 1 1 1",
          label: "내림차순 — 각자 자기만",
        },
        {
          stdin: "4\n7 7 7 7",
          expectedOutput: "1 2 3 4",
          label: "같은 값 — ≤ 이므로 누적",
        },
        {
          stdin: "6\n3 1 4 1 5 9",
          expectedOutput: "1 1 3 1 5 6",
          label: "혼합",
        },
      ],
      hints: [
        "스택에 (가격, 그 가격까지의 span) 쌍을 저장. 새 가격 p 가 들어오면 스택 top 의 가격이 p 이하인 동안 pop 하면서 그 span 을 누적 흡수.",
        "흡수 끝나면 새 span = 1 + 흡수한 span 들의 합 → push (p, 새 span).",
        "총 push/pop 횟수가 O(N) 이므로 전체 O(N).",
        "왜 '흡수' 가 정당한가: top 의 가격 q ≤ p 이면, **미래에 p 가 살아 있는 한 q 도 항상 함께 살아 있다** (왜냐하면 q ≤ p). 그래서 q 를 따로 추적할 필요가 없음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    stack<pair<long long,int>> st; // (가격, span)
    for (int i = 0; i < n; i++) {
        long long p;
        cin >> p;
        int span = 1;
        while (!st.empty() && st.top().first <= p) {
            span += st.top().second;
            st.pop();
        }
        st.push({p, span});
        if (i > 0) cout << ' ';
        cout << span;
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
prices = [int(x) for x in data[1:1+n]]
# TODO: (가격, span) 스택으로 작은 값들 흡수
`,
      pySolutionCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
prices = [int(x) for x in data[1:1+n]]

st = []  # (price, span) 단조 감소
out = []
for p in prices:
    span = 1
    while st and st[-1][0] <= p:
        span += st[-1][1]
        st.pop()
    st.append((p, span))
    out.append(str(span))
print(' '.join(out))
`,
      solutionExplanation:
        "Monotonic 감소 스택. 스택 top 이 현재 가격 이하면 'top 은 미래에도 항상 현재 이하' 라는 사실이 영원히 유지되므로 그 span 을 흡수하고 pop. 흡수가 끝난 시점의 누적이 답. 각 원소 push/pop 1 회씩 → O(N).",
      en: {
        title: "Stock Span",
        description: `Given daily prices \`P[0..N-1]\`, for each day \`i\` print the longest run of consecutive days ending at \`i\` (including \`i\`) where every price is **≤ P[i]**.

Example: \`P = [100, 80, 60, 70, 60, 75, 85]\` → \`[1, 1, 1, 2, 1, 4, 6]\`

Source: LeetCode 901 (Online Stock Span) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ P[i] ≤ 1,000,000,000",
        hints: [
          "Stack holds (price, span) pairs. While top's price ≤ current, pop and add its span into the current span.",
          "After absorbing, push (current price, new span).",
          "Amortized O(N) since each element is pushed/popped once.",
          "Absorption is justified because once top ≤ current, the top will always remain ≤ as long as the current is alive.",
        ],
        solutionExplanation:
          "Monotonic-decreasing stack of (price, span). Smaller-or-equal entries can be merged into the current one — they'll never break out from under it. Each push/pop once → O(N) amortized.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 후위 표기식 계산기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-007",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "보통",
      kl: true,
      title: "후위 표기식 (RPN) 계산기",
      description: `**후위 표기식** (postfix / RPN: Reverse Polish Notation) 의 토큰들이 공백으로 구분되어 한 줄에 주어진다. 결과를 정수로 출력하라.

토큰은 정수 또는 연산자 \`+\`, \`-\`, \`*\`, \`/\` 중 하나. 나눗셈은 **정수 나눗셈** (\`a/b\` 의 부호: 0 쪽으로 자르기, 즉 C++ \`int /\` 와 동일 — \`-7/2 = -3\`).

예: \`3 4 +\` → 7, \`5 1 2 + 4 * + 3 -\` → 14

후위 표기식이 잘 알려진 이유: **스택 하나** 로 깔끔하게 평가 가능. 숫자는 push, 연산자가 나오면 top 2 개 pop 후 계산해서 push.

출처: LeetCode 150 (Evaluate Reverse Polish Notation) paraphrased`,
      constraints: "토큰 수 1 ≤ T ≤ 10,000, 중간/최종 결과는 [-10^9, 10^9] 범위 내",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 4 +", expectedOutput: "7", label: "기본 덧셈" },
        { stdin: "5 1 2 + 4 * + 3 -", expectedOutput: "14", label: "복합" },
        { stdin: "42", expectedOutput: "42", label: "숫자 하나" },
        { stdin: "10 6 -", expectedOutput: "4", label: "뺄셈 순서" },
        { stdin: "6 10 -", expectedOutput: "-4", label: "음수 결과" },
        { stdin: "20 4 /", expectedOutput: "5", label: "정수 나눗셈" },
        { stdin: "7 2 /", expectedOutput: "3", label: "양수 나눗셈 — 내림 같음" },
        {
          stdin: "2 3 4 * +",
          expectedOutput: "14",
          label: "2 + (3*4) = 14",
        },
        {
          stdin: "10 2 / 3 +",
          expectedOutput: "8",
          label: "(10/2) + 3 = 8",
        },
      ],
      hints: [
        "토큰을 차례로 본다. 숫자면 스택에 push.",
        "연산자면 스택에서 b = pop(), a = pop() (순서 주의!), 결과 = a op b, 스택에 push.",
        "마지막에 스택에 남은 단 하나의 값이 답.",
        "토큰 분할은 `stringstream` + `string` 토큰 추출 또는 그냥 `cin >> token` 반복.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string tok;
    stack<long long> st;
    while (cin >> tok) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            long long r = 0;
            if (tok == "+") r = a + b;
            else if (tok == "-") r = a - b;
            else if (tok == "*") r = a * b;
            else r = a / b; // C++ integer division truncates toward 0
            st.push(r);
        } else {
            // 숫자 토큰 — 음수도 가능
            st.push(stoll(tok));
        }
    }
    cout << st.top() << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

tokens = sys.stdin.read().split()
# TODO: 숫자는 push, 연산자는 두 개 pop 해서 계산 후 push
# 주의: 파이썬 // 는 floor division. C++ 처럼 0 쪽으로 자르려면 부호 처리 필요.
`,
      pySolutionCode: `import sys

tokens = sys.stdin.read().split()
st = []
for tok in tokens:
    if tok in ('+', '-', '*', '/'):
        b = st.pop()
        a = st.pop()
        if tok == '+':
            r = a + b
        elif tok == '-':
            r = a - b
        elif tok == '*':
            r = a * b
        else:
            # C++ 정수 나눗셈은 0 쪽으로 자르기. 파이썬 // 는 floor 라 음수에서 차이 남.
            q = abs(a) // abs(b)
            if (a < 0) ^ (b < 0):
                q = -q
            r = q
        st.append(r)
    else:
        st.append(int(tok))
print(st[-1])
`,
      solutionExplanation:
        "RPN 평가는 스택의 교과서 사용 사례. 숫자는 push, 연산자는 두 개 pop 해서 계산 후 push. **순서 주의** — 먼저 pop 된 게 b (오른쪽 피연산자), 나중에 pop 된 게 a (왼쪽). 마지막 스택의 유일한 원소가 결과. 파이썬은 `//` 가 floor 라 음수 나눗셈이 C++ 와 달라서 부호 분리 처리.",
      en: {
        title: "Evaluate Postfix Expression (RPN)",
        description: `One line of space-separated tokens in postfix (Reverse Polish) notation. Tokens are integers or operators \`+\`, \`-\`, \`*\`, \`/\` (integer division, truncates toward 0 like C++ int division).

Example: \`3 4 +\` → 7, \`5 1 2 + 4 * + 3 -\` → 14.

RPN is famous because a single stack evaluates it cleanly: push numbers, on an operator pop two and push the result.

Source: LeetCode 150 paraphrased`,
        constraints: "1 ≤ tokens ≤ 10,000; intermediate/final values fit in [-10^9, 10^9]",
        hints: [
          "Scan tokens. Number → push.",
          "Operator → b = pop, a = pop (order!), push a op b.",
          "At the end the only stack element is the answer.",
          "Use `cin >> token` to split.",
        ],
        solutionExplanation:
          "Textbook stack usage. Push numbers, pop two on operators (be careful with order: first pop is the right operand), push result. The final stack holds exactly one value.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 요세푸스 문제 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-008",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "보통",
      kl: true,
      title: "요세푸스 문제 (큐로)",
      description: `N 명의 사람이 \`1, 2, ..., N\` 번호 순서대로 원을 그리며 앉아 있다. 1 번부터 시작해 시계 방향으로 \`K\` 번째 사람을 제거한다. 제거된 사람의 다음 사람부터 다시 시작해 또 \`K\` 번째를 제거. 이를 모두 빠질 때까지 반복.

제거된 순서대로 번호를 출력하라. 형식:
\`<1, 2, 3, ..., N>\` 처럼 꺽쇠 \`<>\` 사이에 \`, \` (콤마+공백) 으로 구분.

예: N=7, K=3 → \`<3, 6, 2, 7, 5, 1, 4>\`

**큐로 매우 자연스럽게 풀린다**: 큐에 1..N 을 넣고, K-1 번 "front 를 빼서 뒤에 다시 넣기" 를 반복한 다음 K 번째 사람을 그냥 제거.

출처: BOJ 1158 (요세푸스) paraphrased`,
      constraints: "1 ≤ K ≤ N ≤ 5000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "7 3",
          expectedOutput: "<3, 6, 2, 7, 5, 1, 4>",
          label: "BOJ 1158 원본 예제",
        },
        { stdin: "1 1", expectedOutput: "<1>", label: "1명" },
        { stdin: "2 1", expectedOutput: "<1, 2>", label: "K=1: 차례대로" },
        { stdin: "5 1", expectedOutput: "<1, 2, 3, 4, 5>", label: "K=1: 그대로 출력" },
        { stdin: "4 2", expectedOutput: "<2, 4, 3, 1>", label: "N=4, K=2" },
        {
          stdin: "5 5",
          expectedOutput: "<5, 1, 3, 4, 2>",
          label: "N=K=5",
        },
        {
          stdin: "10 4",
          expectedOutput: "<4, 8, 2, 7, 3, 10, 9, 1, 6, 5>",
          label: "더 큰 예제",
        },
      ],
      hints: [
        "queue 에 1, 2, ..., N 을 push.",
        "K-1 번 'front 를 pop 해서 뒤에 push' 반복하면 K 번째 사람이 front 에 옴 — 그 사람을 결과에 기록하고 pop (다시 안 넣음).",
        "큐가 비어질 때까지 반복.",
        "출력 포맷은 첫 원소 앞에 콤마+공백 없이, 그 다음부터 \`, \` 추가.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);

    cout << '<';
    bool first = true;
    while (!q.empty()) {
        for (int i = 0; i < k - 1; i++) {
            q.push(q.front());
            q.pop();
        }
        if (!first) cout << ", ";
        cout << q.front();
        q.pop();
        first = false;
    }
    cout << '>' << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque

n, k = map(int, sys.stdin.read().split())
q = deque(range(1, n + 1))
# TODO: K-1 명을 뒤로 보내고 K 번째 제거, 결과를 <...> 형식으로 출력
`,
      pySolutionCode: `import sys
from collections import deque

n, k = map(int, sys.stdin.read().split())
q = deque(range(1, n + 1))
out = []
while q:
    for _ in range(k - 1):
        q.append(q.popleft())
    out.append(str(q.popleft()))
print('<' + ', '.join(out) + '>')
`,
      solutionExplanation:
        "원형 시뮬레이션을 큐로 직선화. K-1 명을 뒤로 보내고 K 번째를 제거하는 게 한 라운드. 큐가 자연스럽게 '회전' 을 표현한다 — 앞에서 빼서 뒤에 넣으면 원이 한 칸 도는 것과 동치. 파이썬은 `collections.deque` 가 양 끝 O(1).",
      en: {
        title: "Josephus Problem (with a Queue)",
        description: `N people numbered 1..N sit in a circle. Starting at person 1, count \`K\` clockwise and remove that person. Continue from the next position. Repeat until everyone is removed.

Print the removal order as \`<a, b, c, ...>\` — angle brackets with \`, \` separators.

Example: N=7, K=3 → \`<3, 6, 2, 7, 5, 1, 4>\`

A queue makes this very natural: push 1..N, then repeatedly move the front to the back K-1 times and pop the K-th.

Source: BOJ 1158 paraphrased`,
        constraints: "1 ≤ K ≤ N ≤ 5000",
        hints: [
          "Push 1..N into a queue.",
          "K-1 times: pop the front and push it back. Then the K-th is at the front — record and pop (don't push back).",
          "Repeat until empty.",
          "Output: no leading separator before the first, then `, ` between values.",
        ],
        solutionExplanation:
          "Linearize a circular walk with a queue. Moving K-1 people to the back simulates a one-step rotation; the K-th in line is the one to remove.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 슬라이딩 윈도우 최대값 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-009",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "슬라이딩 윈도우 최대값",
      description: `길이 \`N\` 의 정수 배열 \`A\` 와 윈도우 크기 \`K\` 가 주어진다. 윈도우 \`[i, i+K-1]\` 를 \`i = 0, 1, ..., N-K\` 까지 옮기며 각 윈도우의 **최댓값** 을 한 줄에 공백으로 구분해 출력하라.

예: \`A = [1, 3, -1, -3, 5, 3, 6, 7]\`, K = 3
- 윈도우 \`[1,3,-1]\` → 3
- \`[3,-1,-3]\` → 3
- \`[-1,-3,5]\` → 5
- \`[-3,5,3]\` → 5
- \`[5,3,6]\` → 6
- \`[3,6,7]\` → 7

답: \`3 3 5 5 6 7\`

N 이 100,000 까지이므로 윈도우마다 따로 max 를 구하는 O(NK) 는 시간 초과. **monotonic deque (인덱스 기준 단조 감소 deque)** 로 O(N).

출처: LeetCode 239 (Sliding Window Maximum) paraphrased`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -1,000,000,000 ≤ A[i] ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "8 3\n1 3 -1 -3 5 3 6 7",
          expectedOutput: "3 3 5 5 6 7",
          label: "기본 (LC 239)",
        },
        { stdin: "1 1\n42", expectedOutput: "42", label: "N=K=1" },
        { stdin: "5 5\n3 1 4 1 5", expectedOutput: "5", label: "윈도우=배열 전체" },
        { stdin: "5 1\n3 1 4 1 5", expectedOutput: "3 1 4 1 5", label: "K=1: 각 원소" },
        {
          stdin: "5 3\n5 5 5 5 5",
          expectedOutput: "5 5 5",
          label: "전부 같은 값",
        },
        {
          stdin: "5 2\n5 4 3 2 1",
          expectedOutput: "5 4 3 2",
          label: "내림차순",
        },
        {
          stdin: "5 2\n1 2 3 4 5",
          expectedOutput: "2 3 4 5",
          label: "오름차순",
        },
        {
          stdin: "6 3\n9 -1 -3 5 3 6",
          expectedOutput: "9 5 5 6",
          label: "음수 + 큰 시작값",
        },
      ],
      hints: [
        "deque 에 **인덱스** 만 저장. 항상 deque 안의 값들이 단조 감소가 되도록 유지.",
        "새 인덱스 i 가 들어올 때: deque 뒤에서 A[deque.back()] ≤ A[i] 인 동안 pop_back. 그 다음 i 를 push_back.",
        "윈도우 밖으로 나간 인덱스는 front 에서 제거 (deque.front() < i - K + 1 면 pop_front).",
        "윈도우가 완성된 시점 (i ≥ K - 1) 부터 deque.front() 가 가리키는 값이 그 윈도우의 최댓값.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    deque<int> dq; // 인덱스 저장, a[dq] 가 단조 감소
    bool firstOut = true;
    for (int i = 0; i < n; i++) {
        // 뒤에서 자기 이하인 것들 제거
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        // 윈도우 밖 인덱스 제거
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        // 윈도우 완성 시 출력
        if (i >= k - 1) {
            if (!firstOut) cout << ' ';
            cout << a[dq.front()];
            firstOut = false;
        }
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque

data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
a = [int(x) for x in data[2:2+n]]
# TODO: 인덱스를 담는 단조 감소 deque 로 각 윈도우 최댓값 출력
`,
      pySolutionCode: `import sys
from collections import deque

data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
a = [int(x) for x in data[2:2+n]]

dq = deque()  # 인덱스 저장, a[dq] 가 단조 감소
out = []
for i in range(n):
    # 뒤에서 자기 이하인 것들 제거
    while dq and a[dq[-1]] <= a[i]:
        dq.pop()
    dq.append(i)
    # 윈도우 밖 인덱스 제거
    while dq and dq[0] < i - k + 1:
        dq.popleft()
    # 윈도우 완성 시 출력
    if i >= k - 1:
        out.append(str(a[dq[0]]))
print(' '.join(out))
`,
      solutionExplanation:
        "Monotonic decreasing deque 패턴. deque 안의 인덱스들이 가리키는 값이 항상 감소하도록 유지하면 front 가 자동으로 현재 윈도우의 최댓값. 뒤에서 자기 이하 제거 (작은 값은 더 이상 답 후보 아님) + 앞에서 윈도우 벗어난 인덱스 제거. 각 인덱스 1회 push + 최대 1회 pop → O(N).",
      en: {
        title: "Sliding Window Maximum",
        description: `Given an array \`A\` of length N and window size K, slide a window of size K from index 0 to N-K and print the maximum within each window.

Example: \`A = [1, 3, -1, -3, 5, 3, 6, 7]\`, K = 3 → \`3 3 5 5 6 7\`.

N up to 100,000 — O(NK) recomputation is too slow. Use a **monotonic deque** (indices, values strictly decreasing) for O(N).

Source: LeetCode 239 paraphrased`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -1,000,000,000 ≤ A[i] ≤ 1,000,000,000",
        hints: [
          "Deque stores indices; values at those indices stay monotonically decreasing.",
          "On new i: pop_back while A[back] ≤ A[i], then push_back(i).",
          "Pop_front while front index has slid out of window (< i - K + 1).",
          "Once window is full (i ≥ K - 1), A[deque.front()] is its maximum.",
        ],
        solutionExplanation:
          "Standard monotonic-decreasing deque: smaller-or-equal entries at the back can never become the max while the new bigger one is alive. Front always holds the current window's max. Each index is pushed/popped at most once → O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 프린터 큐 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-010",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "보통",
      kl: true,
      title: "프린터 큐 (우선순위 큐 없이!)",
      description: `프린터에 \`N\` 개의 문서가 대기열에 차례로 들어 있다. 각 문서에는 1-9 의 **중요도** 가 있다. 프린터는 다음 규칙으로 동작:

1. 큐의 맨 앞 문서 \`X\` 를 꺼낸다.
2. 큐에 \`X\` 보다 중요도가 **높은** 문서가 하나라도 남아 있으면 \`X\` 를 큐의 맨 뒤로 보낸다.
3. 그렇지 않으면 \`X\` 를 인쇄 (제거).
4. 큐가 빌 때까지 반복.

목표: 우리가 관심 있는 \`M\` 번째 (0-based) 자리에 있던 문서가 **몇 번째로 인쇄되는지** 출력. 인쇄 순서는 1-based.

T 개의 테스트 케이스를 처리.

**제약**: \`priority_queue\` 사용 금지. 큐 + 카운팅으로 풀어라. 큐에는 (중요도, '관심대상인가?') 쌍을 넣자.

출처: BOJ 1966 paraphrased`,
      constraints: "1 ≤ T ≤ 100, 1 ≤ N ≤ 100, 0 ≤ M < N, 1 ≤ 중요도 ≤ 9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n1 0\n5\n4 2\n1 2 3 4\n6 0\n1 1 9 1 1 1",
          expectedOutput: "1\n2\n5",
          label: "BOJ 1966 원본 예제 3개",
        },
        {
          stdin: "1\n3 2\n1 2 3",
          expectedOutput: "1",
          label: "관심 문서가 가장 중요 — 1번째",
        },
        {
          stdin: "1\n5 4\n5 4 3 2 1",
          expectedOutput: "5",
          label: "관심 문서가 가장 안 중요 — 마지막",
        },
        {
          stdin: "1\n4 0\n2 2 2 2",
          expectedOutput: "1",
          label: "전부 같은 중요도 — 0번 자리는 1번째",
        },
        {
          stdin: "1\n4 3\n2 2 2 2",
          expectedOutput: "4",
          label: "전부 같은 중요도 — 3번 자리는 4번째",
        },
      ],
      hints: [
        "큐에 (중요도, 원래 인덱스) 또는 (중요도, M 인지 표시 bool) 쌍을 넣어 시뮬레이션.",
        "큐 안에서 자기보다 큰 중요도가 있는지는 별도 배열 (중요도 9개 카운트) 또는 매번 큐 순회로 확인 가능 — N ≤ 100 이므로 O(N) 순회도 충분.",
        "인쇄될 때마다 카운터 +1. 인쇄한 게 우리가 추적하던 문서면 그 카운터 출력 후 종료.",
        "우선순위 큐를 안 쓰는 이유: 문제가 '원래 큐 순서' 를 유지하면서 단지 우선권만 따지므로 일반 큐 + 카운팅이 자연스럽다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        queue<pair<int,int>> q; // (중요도, 원래 인덱스)
        vector<int> cnt(10, 0);
        for (int i = 0; i < n; i++) {
            int p; cin >> p;
            q.push({p, i});
            cnt[p]++;
        }
        // 현재 큐 안에서 가장 큰 중요도 추적
        int hi = 9;
        int order = 0;
        while (!q.empty()) {
            // 현재 가장 큰 중요도 찾기
            while (hi > 0 && cnt[hi] == 0) hi--;
            auto [p, idx] = q.front();
            q.pop();
            if (p < hi) {
                q.push({p, idx});
            } else {
                order++;
                cnt[p]--;
                if (idx == m) {
                    cout << order << "\\n";
                    break;
                }
            }
        }
    }
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque

data = sys.stdin.read().split()
idx = 0
t = int(data[idx]); idx += 1
for _ in range(t):
    n = int(data[idx]); idx += 1
    m = int(data[idx]); idx += 1
    pris = [int(data[idx + i]) for i in range(n)]
    idx += n
    # TODO: 큐에 (중요도, 원래 인덱스) 넣고 시뮬레이션
`,
      pySolutionCode: `import sys
from collections import deque

data = sys.stdin.read().split()
idx = 0
t = int(data[idx]); idx += 1
out = []
for _ in range(t):
    n = int(data[idx]); idx += 1
    m = int(data[idx]); idx += 1
    pris = [int(data[idx + i]) for i in range(n)]
    idx += n
    q = deque()
    cnt = [0] * 10  # 중요도 1-9 카운트
    for i, p in enumerate(pris):
        q.append((p, i))
        cnt[p] += 1
    hi = 9
    order = 0
    while q:
        while hi > 0 and cnt[hi] == 0:
            hi -= 1
        p, i = q.popleft()
        if p < hi:
            q.append((p, i))
        else:
            order += 1
            cnt[p] -= 1
            if i == m:
                out.append(str(order))
                break
print('\\n'.join(out))
`,
      solutionExplanation:
        "큐 + 카운팅 풀이. 중요도별 카운트로 '큐 안에 자기보다 큰 게 있는지' 를 O(1) 에 판정 (가장 큰 중요도 hi 만 추적). 추적 대상은 원래 인덱스로 식별. 각 문서가 큐를 돌 수 있지만 한 번 인쇄되면 끝이라 총 작업이 충분히 빠르다 (N ≤ 100).",
      en: {
        title: "Printer Queue (No Priority Queue!)",
        description: `A printer has N documents in a queue, each with priority 1-9:
1. Pop front \`X\`.
2. If any document in the queue has **higher** priority, move \`X\` to the back.
3. Otherwise, print \`X\` (remove).
4. Repeat.

For the document at position \`M\` (0-based, in the original queue), print the order in which it gets printed (1-based).

Process T test cases.

**Constraint**: do not use \`priority_queue\` — use a queue plus counting.

Source: BOJ 1966 paraphrased`,
        constraints: "1 ≤ T ≤ 100, 1 ≤ N ≤ 100, 0 ≤ M < N, 1 ≤ priority ≤ 9",
        hints: [
          "Store (priority, original-index) pairs in the queue.",
          "Track the current max priority in the queue (or scan each time — N ≤ 100).",
          "Increment a print counter for each print; stop when the tracked document is printed.",
          "We avoid priority_queue because order *within* the queue still matters — a plain queue + counts is the right fit.",
        ],
        solutionExplanation:
          "Plain queue + a count[priority] array tells you whether anything bigger is still pending in O(1). Track the target document by its original index. Each test case runs in well under N² steps.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 균형 잡힌 문자열 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-011",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "최소 삽입으로 균형 잡기",
      description: `\`(\` 와 \`)\` 로만 이루어진 문자열 \`S\` 가 주어진다. 어떤 위치에 \`(\` 또는 \`)\` 를 **추가** 해서 올바른 괄호 문자열(VPS) 로 만들고자 한다. 필요한 최소 추가 횟수를 출력하라.

(삭제는 안 된다. **추가만** 가능. 문자 자체를 바꾸지도 못한다.)

예:
- \`())\` → 1 (\`(())\` 또는 \`()()\` 로 만듦)
- \`(((\` → 3 (오른쪽에 \`)))\`)
- \`()\` → 0
- \`)(\` → 2 (앞에 \`(\` 와 뒤에 \`)\`)
- \`(()))(\` → 2 (예: \`(())()(\`...아니, 다시: \`(()))(\` → 가운데 0번째까지 \`(())\` 균형, 그 뒤 \`)(\` → 2 추가 필요)

핵심: 스택 (또는 카운터) 으로 한 번 훑으며 짝 못 찾은 \`(\` 개수와 짝 못 찾은 \`)\` 개수를 세면 답은 둘의 합.

출처: LeetCode 921 (Minimum Add to Make Parentheses Valid) paraphrased`,
      constraints: "1 ≤ |S| ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "())", expectedOutput: "1", label: "오른쪽 1개 초과" },
        { stdin: "(((", expectedOutput: "3", label: "왼쪽만" },
        { stdin: "()", expectedOutput: "0", label: "이미 균형" },
        { stdin: ")(", expectedOutput: "2", label: "양쪽 모두 부족" },
        { stdin: "(()))(", expectedOutput: "2", label: "복합" },
        { stdin: "()()()", expectedOutput: "0", label: "긴 균형" },
        { stdin: ")))(((", expectedOutput: "6", label: "최악 — 모두 짝 없음" },
        { stdin: "(", expectedOutput: "1", label: "한 글자" },
        { stdin: ")", expectedOutput: "1", label: "닫기만" },
      ],
      hints: [
        "왼쪽에서 오른쪽으로 훑으며 짝 못 찾은 \`)\` 개수를 센다 (= 닫기 카운터). \`(\` 만나면 +1, \`)\` 만나면 -1 — 그러나 0 에서 -1 되는 순간 '짝 없는 \`)\`' 1 개 카운트하고 카운터는 0 유지.",
        "끝까지 가면 남은 양수 카운터는 '짝 못 찾은 \`(\` 개수'.",
        "답 = 짝 없는 \`)\` + 짝 없는 \`(\`.",
        "스택 명시적으로 안 써도 정수 두 개로 충분하지만 스택 시뮬레이션이 더 직관적이라 그것도 OK.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int open = 0;       // 짝 없는 ( 개수 (앞으로 ) 가 필요)
    int unmatchedClose = 0; // 짝 없는 ) 개수 (앞에 ( 가 부족했음)
    for (char c : s) {
        if (c == '(') {
            open++;
        } else { // ')'
            if (open > 0) open--;
            else unmatchedClose++;
        }
    }
    cout << (open + unmatchedClose) << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

s = sys.stdin.readline().strip()
# TODO: open / unmatched_close 두 카운터로 한 번 훑기
`,
      pySolutionCode: `import sys

s = sys.stdin.readline().strip()
open_cnt = 0          # 짝 없는 ( 개수 (앞으로 ) 가 필요)
unmatched_close = 0   # 짝 없는 ) 개수 (앞에 ( 가 부족했음)
for c in s:
    if c == '(':
        open_cnt += 1
    else:  # ')'
        if open_cnt > 0:
            open_cnt -= 1
        else:
            unmatched_close += 1
print(open_cnt + unmatched_close)
`,
      solutionExplanation:
        "한 번 훑기로 '짝 못 찾은 \`(\` 카운트' 와 '짝 못 찾은 \`)\` 카운트' 를 분리해서 센다. 정답은 단순히 두 값의 합 — 각 짝 없는 괄호마다 반대 종류 1 개를 적당한 위치에 추가하면 되기 때문. 정수 카운터 두 개로 스택을 압축한 형태.",
      en: {
        title: "Minimum Insertions to Balance",
        description: `Given a string \`S\` of only \`(\` and \`)\`, find the minimum number of insertions (you may add either character anywhere; no deletes or swaps) to make it a valid parenthesis string.

Examples: \`())\` → 1, \`(((\` → 3, \`()\` → 0, \`)(\` → 2.

Key idea: in one left-to-right pass, count unmatched \`(\` and unmatched \`)\`. The answer is the sum.

Source: LeetCode 921 paraphrased`,
        constraints: "1 ≤ |S| ≤ 100,000",
        hints: [
          "Walk left to right. On `(` increment open. On `)` decrement open — but if open is already 0, increment 'unmatched close' instead.",
          "After the pass, open holds unmatched `(`'s count.",
          "Answer = unmatched close + remaining open.",
          "Two integer counters compress what would otherwise be a stack of `(` markers.",
        ],
        solutionExplanation:
          "One pass with two counters: open (unmatched `(` so far) and unmatched_close (extra `)`s). Their sum is the answer — each unmatched bracket needs exactly one insertion of the opposite kind.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 스택 push/pop 시퀀스 검증 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asq-012",
      cluster: "algo-stackqueue-contest",
      unlockAfter: "algo-stackqueue",
      difficulty: "어려움",
      title: "스택으로 가능한 출력 순서인가?",
      description: `\`1, 2, ..., N\` 을 이 순서대로 빈 스택에 push 한다. 중간중간 원하는 시점에 pop 할 수 있다 (스택이 비어 있지 않을 때만).

목표 출력 수열 \`B = [b_0, b_1, ..., b_{N-1}]\` 가 주어진다. push/pop 을 잘 배치해서 **pop 되는 순서** 가 정확히 \`B\` 가 될 수 있는가? 가능하면 YES, 아니면 NO 출력.

예 (N=5):
- B = \`4 5 3 2 1\` → YES (1,2,3,4 push, 4 pop, 5 push, 5,3,2,1 pop)
- B = \`4 3 5 1 2\` → NO

핵심: 시뮬레이션 — \`B\` 의 각 값을 순서대로 보면서, '아직 push 안 한 \`1..N\`' 을 그 값까지 push 하고 스택 top 이 \`B[i]\` 면 pop. 어긋나면 즉시 NO.

출처: LeetCode 946 (Validate Stack Sequences) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, B 는 1..N 의 순열",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n4 5 3 2 1",
          expectedOutput: "YES",
          label: "기본 — 가능",
        },
        {
          stdin: "5\n4 3 5 1 2",
          expectedOutput: "NO",
          label: "기본 — 불가능 (LC 946 두 번째 예시)",
        },
        { stdin: "1\n1", expectedOutput: "YES", label: "N=1" },
        {
          stdin: "5\n1 2 3 4 5",
          expectedOutput: "YES",
          label: "각 push 직후 pop",
        },
        {
          stdin: "5\n5 4 3 2 1",
          expectedOutput: "YES",
          label: "모두 push 후 한꺼번에 pop",
        },
        {
          stdin: "3\n3 1 2",
          expectedOutput: "NO",
          label: "3 pop 후 2가 top — 1은 못 나옴",
        },
        {
          stdin: "4\n2 1 4 3",
          expectedOutput: "YES",
          label: "(1,2)push, 2pop,1pop, (3,4)push, 4pop,3pop",
        },
        {
          stdin: "4\n3 2 4 1",
          expectedOutput: "YES",
          label: "1,2,3 push, 3,2 pop, 4 push, 4,1 pop",
        },
      ],
      hints: [
        "스택을 직접 시뮬레이션. 변수 `next` 가 '다음에 push 해야 할 값' (시작 1).",
        "B 의 각 값 b 를 보면서: 스택 top 이 b 가 될 때까지 `next` 를 push (next ≤ N 인 동안). 그 후 top 이 b 면 pop, 아니면 NO.",
        "모든 b 를 다 처리하고 끝까지 가면 YES.",
        "복잡도 O(N) — 각 값은 최대 1 회 push 되고 1 회 pop 된다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];

    stack<int> st;
    int next = 1; // 다음에 push 할 수
    bool ok = true;
    for (int i = 0; i < n; i++) {
        // 스택 top 이 b[i] 가 되도록 필요한 만큼 push
        while ((st.empty() || st.top() != b[i]) && next <= n) {
            st.push(next++);
        }
        if (st.empty() || st.top() != b[i]) {
            ok = false; break;
        }
        st.pop();
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
b = [int(x) for x in data[1:1+n]]
# TODO: 스택 시뮬레이션 — top 이 목표 값이 될 때까지 1..N 을 push
`,
      pySolutionCode: `import sys

data = sys.stdin.read().split()
n = int(data[0])
b = [int(x) for x in data[1:1+n]]

st = []
nxt = 1  # 다음에 push 할 수
ok = True
for target in b:
    while (not st or st[-1] != target) and nxt <= n:
        st.append(nxt)
        nxt += 1
    if not st or st[-1] != target:
        ok = False
        break
    st.pop()
print("YES" if ok else "NO")
`,
      solutionExplanation:
        "스택 시뮬레이션의 표준 패턴. 각 단계에서 다음 출력 목표 b[i] 가 스택 top 에 오도록 1..N 을 차례로 push. 만약 push 를 다 했는데도 top 이 b[i] 가 아니면 그 순서는 불가능. 각 값은 한 번 push, 한 번 pop → O(N).",
      en: {
        title: "Validate Stack Push/Pop Sequence",
        description: `Values \`1..N\` are pushed in order onto an empty stack. You may pop at any time when the stack is nonempty. Given target output sequence \`B\`, decide whether some interleaving of pushes and pops produces exactly \`B\`. Print YES or NO.

Examples (N=5):
- \`4 5 3 2 1\` → YES
- \`4 3 5 1 2\` → NO

Approach: simulate. Keep a "next to push" counter, push until the stack's top equals the current B[i], then pop. If you can't make top equal B[i], answer is NO.

Source: LeetCode 946 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, B is a permutation of 1..N",
        hints: [
          "Variable `next` = next value to push (starts at 1).",
          "For each b in B: push while stack.top() != b and next ≤ N; then pop b. Mismatch → NO.",
          "If you finish all of B → YES.",
          "O(N) — each value is pushed once and popped once.",
        ],
        solutionExplanation:
          "Greedy simulation: push 1..N as needed so the stack top matches the next target. Each value pushed/popped at most once → O(N).",
      },
    },
  ],
}
