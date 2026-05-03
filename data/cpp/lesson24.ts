// ============================================
// C++ Lesson 24: 🚀 알고리즘 시작 전 필수 셋업 (5분)
// 메인 트랙 마지막 — bits/stdc++.h + Fast I/O 두 줄.
// 알고리즘 (BFS/DFS, DP 등) 으로 가기 직전에 외워야 할 3 줄짜리 템플릿.
// ============================================
import { LessonData } from '../types'

export const cppLesson24Data: LessonData = {
  id: "cpp-24",
  title: "🚀 알고리즘 시작 전 필수 셋업",
  emoji: "🚀",
  description: "5분 만에 외우는 3 줄 — bits/stdc++.h + Fast I/O. 알고리즘 가기 전 마지막 관문.",
  chapters: [
    // ============================================
    // Chapter 0: 왜 이 레슨?
    // ============================================
    {
      id: "ch0",
      title: "왜 이 3 줄?",
      emoji: "🎯",
      steps: [
        {
          id: "ch0-intro",
          type: "explain",
          title: "🎯 알고리즘 풀려면 이 3 줄이 거의 매번 나와요",
          content: `Map & Set 까지 배우고 알고리즘 (BFS/DFS, DP, 이분탐색...) 으로 가기 전에, **거의 모든 풀이 코드의 첫 부분에 붙는 3 줄** 이 있어요. 5 분만에 외우고 가요.

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // ... 풀이 ...
}
\`\`\`

### 이 3 줄이 하는 일

| 줄 | 역할 |
|---|---|
| \`#include <bits/stdc++.h>\` | C++ 모든 표준 라이브러리 한 줄로 import |
| \`ios::sync_with_stdio(false);\` | cin/cout 을 ~3~5배 빠르게 |
| \`cin.tie(nullptr);\` | cin 이 매번 cout 비우는 비용 제거 |

> 💡 학교에서는 안 가르치지만 — **백준, Codeforces, USACO** 다 거의 매번 이 3 줄로 시작해요. 알고리즘 시작하면 자연스럽게 손에 익게 돼요.

다음 페이지부터 한 줄씩 자세히 봐요. 끝에는 통째로 외우는 미니 퀴즈도 있어요.`
        }
      ]
    },

    // ============================================
    // Chapter 1: bits/stdc++.h
    // ============================================
    {
      id: "ch1",
      title: "bits/stdc++.h",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 헤더 한 줄로 모든 표준 라이브러리",
          content: `평소엔 필요한 헤더를 하나씩 import 했어요:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
// ... 매번 빼먹어서 컴파일 에러
\`\`\`

대회 / PS 에서는 시간 아끼려고 **모든 표준 라이브러리** 를 한 줄로 가져와요:

\`\`\`cpp
#include <bits/stdc++.h>
\`\`\`

이 한 줄로 \`<iostream>\`, \`<vector>\`, \`<string>\`, \`<algorithm>\`, \`<map>\`, \`<set>\`, \`<queue>\`, \`<stack>\`, \`<unordered_map>\`, ... 전부 포함.

### 단점은?
- 컴파일이 살짝 느려져요 (대회용이라 OK)
- GCC 컴파일러에서만 동작 (백준/USACO/Codeforces 다 GCC 써서 OK)
- 실무 프로덕션 코드에선 **안 씀** — 필요한 헤더만 명시적으로 import 하는 게 정석

### 그래서?
- ✅ 알고리즘 / PS / 대회 → \`bits/stdc++.h\` 한 줄
- ❌ 회사 프로덕션 코드 → 헤더 하나씩 명시`
        },
        {
          id: "ch1-fb",
          type: "fillblank" as const,
          title: "빈칸 채우기",
          content: "표준 라이브러리 전부를 한 줄로 가져오는 헤더는?",
          code: "#include <___>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    sort(v.begin(), v.end());\n    cout << v[0];\n}",
          fillBlanks: [
            { id: 0, answer: "bits/stdc++.h", options: ["bits/stdc++.h", "stdlib.h", "all.h", "iostream"] }
          ],
          explanation: "`bits/stdc++.h` 한 줄로 vector, sort, cout 등 표준 라이브러리 전부 포함. 알고리즘 / PS 에서는 이 한 줄로 시작."
        }
      ]
    },

    // ============================================
    // Chapter 2: Fast I/O 두 줄
    // ============================================
    {
      id: "ch2",
      title: "Fast I/O",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ cin/cout 을 ~3~5배 빠르게",
          content: `C++ 의 \`cin\` / \`cout\` 은 안전 위주로 설계돼서 기본적으로 **느려요**. 평소엔 문제 없는데, 알고리즘 문제는 입력이 **수십만 ~ 수백만 줄** 이라서 이 느림이 누적돼서 **시간 초과 (TLE)** 가 나요.

해결: main 의 첫 줄에 두 줄 추가.

\`\`\`cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // ... 평소처럼 cin/cout 쓰면 됨 ...
}
\`\`\`

### 두 줄이 하는 일

| 코드 | 의미 | 효과 |
|---|---|---|
| \`ios::sync_with_stdio(false);\` | C 의 \`scanf/printf\` 와 sync 끔 | cin/cout 자체가 ~3~5배 빠름 |
| \`cin.tie(nullptr);\` | cin 이 매번 cout 비우는(flush) 동작 끔 | 입력 받기 전 출력 비우는 비용 제거 |

> 🐍 파이썬의 \`input = sys.stdin.readline\` 과 정확히 같은 역할이에요 — "기본 입출력은 안전 위주라 느리니, 직접 빠른 모드로 전환".

### 주의 한 가지

\`endl\` 은 매번 flush 해서 또 느려져요. 빠른 출력이 필요하면 \`endl\` 대신 \`"\\n"\`:

\`\`\`cpp
cout << answer << endl;   // ❌ 느림
cout << answer << "\\n";   // ✅ 빠름
\`\`\``
        },
        {
          id: "ch2-pred",
          type: "predict" as const,
          title: "어느 게 Fast I/O 셋업?",
          code: `// 옵션을 보고 골라봐요
// (코드는 옵션마다 main 내부 첫 두 줄)`,
          options: [
            "ios::sync(false);  cin.untie();",
            "ios::sync_with_stdio(false);  cin.tie(nullptr);",
            "stdin::fast = true;  stdout::fast = true;",
            "fast_io();  no_flush();"
          ],
          answer: 1,
          explanation: "`ios::sync_with_stdio(false);` + `cin.tie(nullptr);` 두 줄. 다른 옵션들은 모두 가짜 함수예요. 이 두 줄을 정확히 외워야 해요 — 거의 모든 알고리즘 풀이의 첫 줄."
        }
      ]
    },

    // ============================================
    // Chapter 3: 통합 템플릿
    // ============================================
    {
      id: "ch3",
      title: "통합 템플릿",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-template",
          type: "explain",
          title: "🎯 외우고 가는 템플릿",
          content: `위 두 챕터를 합치면 — **알고리즘 풀이 시작 템플릿**:

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // 여기부터 풀이 작성
    int n;
    cin >> n;
    // ...

    return 0;
}
\`\`\`

### 이 5 줄을 통째로 외우면

- 알고리즘 / 대회 풀이 시작이 항상 똑같음 → 시간 절약
- 시간 초과 디버깅 안 해도 됨
- "왜 이거 쓰지?" 고민 안 해도 됨 — **그냥 첫 줄에 붙임**

> 💡 백준 솔브 페이지 / Codeforces 풀이 페이지 / USACO Open 풀이 — 거의 다 이 템플릿으로 시작해요. 한 번 보면 보일 거예요.

다음 페이지에서 직접 쳐보고 마무리해요.`
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ 템플릿 직접 작성",
          content: `**미션**: 위 템플릿 그대로 써서, **N 입력받고 N+1 출력**.

> 💡 헤더 + namespace + Fast I/O 두 줄 + cin/cout. 입력/정답은 아래 박스 참고.`,
          starterCode: `// 템플릿을 직접 써봐요
// 1. #include <bits/stdc++.h>
// 2. using namespace std;
// 3. int main() {
// 4.     Fast I/O 두 줄
// 5.     N 입력 → N+1 출력
// 6.     return 0;
// 7. }
`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    cout << n + 1 << "\\n";

    return 0;
}`,
          hint: "ios::sync_with_stdio(false); / cin.tie(nullptr);",
          expectedOutput: `6`,
          stdin: "5"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 끝! 알고리즘 출발 준비 완료",
          content: `이제 알고리즘 (BFS/DFS, DP 등) 으로 갈 모든 준비가 됐어요.

### 마지막으로 외울 3 줄

\`\`\`cpp
#include <bits/stdc++.h>
ios::sync_with_stdio(false);
cin.tie(nullptr);
\`\`\`

### 어디서 다시 보나?
- 시간 초과 (TLE) 만나면 → 첫 줄에 추가됐는지 확인
- 새 풀이 시작할 때 → 항상 이 템플릿부터

### 다음은?
- 🏆 **USACO 모의전 (cpp-p3)** — 여기서 배운 거 종합 적용
- 💪 **코딩 뱅크** — 알고리즘 없이 STL 만으로 풀어보는 문제 100 개
- 🧠 **Algorithm Lab** — 본격 알고리즘 시작 (BFS/DFS, DP, ...)

> 참고용 레슨 (cpp-19, cpp-20) 은 필요할 때 돌아와서 보면 돼요. 파일 I/O 만나면 cpp-19, 비트마스크 / typedef 더 알고 싶으면 cpp-20.`
        }
      ]
    }
  ]
}
