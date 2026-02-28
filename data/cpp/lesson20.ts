// ============================================
// C++ Lesson 20: CP 실전 팁
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson20Data: LessonData = {
  id: "cpp-20",
  title: "CP 실전 팁",
  emoji: "🏆",
  description: "USACO 실전에서 바로 쓸 수 있는 C++ 팁!",
  chapters: [
    // ============================================
    // Chapter 1: 편의 기능
    // ============================================
    {
      id: "ch1",
      title: "편의 기능",
      emoji: "🛠️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🛠️ bits/stdc++.h — 모든 헤더를 한번에!",
          content: `보통 C++에서는 필요한 헤더를 하나씩 include 해요:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <map>
// 계속 추가해야 해요... 😩
\`\`\`

CP(경쟁 프로그래밍)에서는 **한 줄로 모든 STL 헤더**를 포함할 수 있어요!

\`\`\`cpp
#include <bits/stdc++.h>  // 모든 STL 헤더가 다 들어있어요!
using namespace std;
\`\`\`

이 두 줄이면 \`vector\`, \`map\`, \`algorithm\`, \`string\` 등 **전부** 사용 가능해요!

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
# 파이썬은 필요할 때 import
import sys
from collections import defaultdict
# 하지만 기본 자료형은 그냥 쓸 수 있어요
\`\`\`

**C++ (CP 스타일) ⚡:**
\`\`\`cpp
#include <bits/stdc++.h>  // 이 한 줄이면 끝!
using namespace std;       // std:: 안 써도 됨!
\`\`\`

| 파이썬 🐍 | C++ CP 스타일 ⚡ |
|---|---|
| \`import\`로 하나씩 | \`bits/stdc++.h\`로 전부! |
| 기본 타입 바로 사용 | \`using namespace std;\`가 편리 |
| 필요한 것만 import | 모든 STL 한번에 포함 |

⚠️ **주의!** \`bits/stdc++.h\`는 CP에서만 써요! 실무/프로덕션 코드에서는 필요한 헤더만 include 하는 게 좋아요. 컴파일 시간이 느려질 수 있거든요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "모든 STL 헤더를 포함해봐요!",
          code: "#include <___>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 2};\n    sort(v.begin(), v.end());\n    cout << v[0];\n    return 0;\n}",
          fillBlanks: [
            { id: 0, answer: "bits/stdc++.h", options: ["bits/stdc++.h", "iostream", "vector", "algorithm"] }
          ],
          explanation: "bits/stdc++.h 하나만 include하면 vector, algorithm, iostream 등 모든 STL 헤더가 포함돼요! CP에서 가장 편리한 방법이에요."
        },
        {
          id: "ch1-typedef",
          type: "explain",
          title: "🛠️ typedef & using — 타입 별명 만들기!",
          content: `CP에서는 \`long long\`, \`vector<int>\`, \`pair<int,int>\` 같은 긴 타입을 자주 써요. 매번 다 타이핑하면 불편해요!

**typedef로 타입 별명 만들기:**
\`\`\`cpp
typedef long long ll;
typedef vector<int> vi;
typedef pair<int, int> pii;
typedef vector<pair<int, int>> vpii;
\`\`\`

**using으로도 똑같이 할 수 있어요 (C++11):**
\`\`\`cpp
using ll = long long;
using vi = vector<int>;
using pii = pair<int, int>;
\`\`\`

**사용 예시:**
\`\`\`cpp
// 별명 없이 😩
long long answer = 0;
vector<int> numbers;
pair<int, int> coord;

// 별명 쓰면! 😊
ll answer = 0;
vi numbers;
pii coord;
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
# 파이썬은 타입이 동적이라 별명이 필요 없어요
answer = 0          # 그냥 쓰면 됨
numbers = []        # 리스트
coord = (1, 2)      # 튜플
\`\`\`

파이썬은 타입을 안 쓰니까 별명이 필요 없지만, C++에서는 **typedef/using**이 타이핑을 많이 줄여줘요!

💡 **typedef**와 **using**은 같은 역할을 해요. 최신 C++에서는 \`using\`이 더 권장돼요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "typedef 사용하기!",
          code: "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\ntypedef pair<int, int> pii;\n\nint main() {\n    ll big = 1000000000000LL;\n    pii p = {10, 20};\n    cout << p.first + p.second;\n    return 0;\n}",
          options: ["1000000000000", "30", "10 20", "에러"],
          answer: 1,
          explanation: "pii는 pair<int, int>의 별명이에요! p.first는 10, p.second는 20이에요. 10 + 20 = 30이 출력돼요. big은 선언만 했고 출력은 안 했어요!"
        },
        {
          id: "ch1-macros",
          type: "explain",
          title: "🛠️ 매크로 & 상수 — 자주 쓰는 패턴 정리!",
          content: `CP에서 자주 쓰는 매크로와 상수를 정리해봐요!

**매크로 (#define):**
\`\`\`cpp
#define pb push_back
#define mp make_pair
#define all(v) v.begin(), v.end()
#define rep(i, n) for(int i = 0; i < n; i++)
#define F first
#define S second
\`\`\`

**자주 쓰는 상수:**
\`\`\`cpp
const int INF = 1e9;        // 10억 (int 범위 최대급)
const ll LINF = 1e18;       // long long 범위 최대급
const int MOD = 1e9 + 7;    // 나머지 연산용 소수
const double PI = acos(-1); // 원주율
\`\`\`

**매크로 사용 예시:**
\`\`\`cpp
vi v;
v.pb(10);           // v.push_back(10)
v.pb(20);           // v.push_back(20)
sort(all(v));        // sort(v.begin(), v.end())

rep(i, 5) {          // for(int i = 0; i < 5; i++)
    cout << i << " ";
}
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
INF = float('inf')
MOD = 10**9 + 7

v = []
v.append(10)        # C++의 push_back
v.sort()            # 간단!
\`\`\`

| 파이썬 🐍 | C++ CP 매크로 ⚡ |
|---|---|
| \`v.append(x)\` | \`v.pb(x)\` |
| \`v.sort()\` | \`sort(all(v))\` |
| \`float('inf')\` | \`INF = 1e9\` |
| \`for i in range(n)\` | \`rep(i, n)\` |

💡 매크로를 너무 많이 쓰면 코드가 읽기 어려워질 수 있어요. **자주 쓰는 것만** 정의하는 게 좋아요!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 편의 매크로로 코드 간결하게!",
          content: `typedef, 매크로, 상수를 사용해서 간결한 CP 스타일 코드를 작성해봐요!

벡터에 숫자를 넣고, 정렬한 후, 가장 작은 값을 출력해봐요.`,
          code: `#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
#define pb push_back
#define all(v) v.begin(), v.end()

const int INF = 1e9;
const int MOD = 1e9 + 7;

int main() {
    vi v;
    v.pb(30);
    v.pb(10);
    v.pb(50);
    v.pb(20);
    v.pb(40);

    sort(all(v));

    cout << "Min: " << v[0] << endl;
    cout << "Max: " << v[v.size()-1] << endl;
    cout << "Size: " << v.size() << endl;

    return 0;
}`,
          expectedOutput: `Min: 10
Max: 50
Size: 5`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "bits/stdc++.h 이해!",
          content: "`#include <bits/stdc++.h>`에 대한 설명으로 **틀린** 것은?",
          options: [
            "모든 STL 헤더를 한번에 포함한다",
            "CP에서 자주 사용한다",
            "실무 프로덕션 코드에서도 권장된다",
            "컴파일 시간이 길어질 수 있다"
          ],
          answer: 2,
          explanation: "bits/stdc++.h는 CP에서는 편리하지만, 실무에서는 사용하지 않아요! 불필요한 헤더까지 포함해서 컴파일이 느려지고, 비표준이라 일부 컴파일러에서 지원하지 않을 수 있어요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 비트 연산 & 실전 패턴
    // ============================================
    {
      id: "ch2",
      title: "비트 연산 & 실전 패턴",
      emoji: "💡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "💡 비트 연산 — 0과 1로 계산하기!",
          content: `컴퓨터는 모든 것을 **비트(0과 1)**로 처리해요. 비트 연산은 이 비트를 직접 조작하는 연산이에요!

**비트 연산자:**
\`\`\`cpp
&   // AND — 둘 다 1이면 1
|   // OR  — 하나라도 1이면 1
^   // XOR — 다르면 1
~   // NOT — 비트 뒤집기
<<  // Left Shift  — 비트를 왼쪽으로
>>  // Right Shift — 비트를 오른쪽으로
\`\`\`

**예시 (8비트 기준):**
\`\`\`
  5 = 00000101
  3 = 00000011

5 & 3 = 00000001 = 1  (AND)
5 | 3 = 00000111 = 7  (OR)
5 ^ 3 = 00000110 = 6  (XOR)
\`\`\`

**자주 쓰는 비트 트릭:**
\`\`\`cpp
n & 1       // 홀수이면 1, 짝수이면 0
1 << k      // 2의 k제곱 (2^k)
n >> 1      // n을 2로 나누기 (정수 나눗셈)
n << 1      // n에 2를 곱하기
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
# 파이썬도 같은 비트 연산자!
print(5 & 3)   # 1
print(5 | 3)   # 7
print(5 ^ 3)   # 6
print(1 << 10) # 1024 (2^10)
print(n & 1)   # 홀짝 체크
\`\`\`

| 연산 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 홀짝 체크 | \`n % 2\` 또는 \`n & 1\` | \`n & 1\` (더 빠름!) |
| 2의 거듭제곱 | \`2 ** k\` 또는 \`1 << k\` | \`1 << k\` |
| 2로 나누기 | \`n // 2\` | \`n >> 1\` |

💡 비트 연산자는 파이썬과 C++ 모두 같아요! 하지만 C++에서는 **성능**이 중요할 때 자주 활용해요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "비트 연산으로 홀짝을 체크해봐요!",
          code: "int n = 7;\n// n이 홀수인지 체크\nif (n ___ 1) {\n    cout << \"홀수\";\n}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "|", "^", ">>"] }
          ],
          explanation: "n & 1은 n의 마지막 비트를 확인해요! 홀수면 마지막 비트가 1이라서 결과가 1(true)이 돼요. 짝수면 0(false)이에요."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "비트 연산 결과!",
          code: "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int a = 1 << 3;\n    int b = 12 >> 2;\n    int c = 5 ^ 5;\n    cout << a << \" \" << b << \" \" << c;\n    return 0;\n}",
          options: ["3 6 10", "8 3 0", "8 6 0", "3 3 0"],
          answer: 1,
          explanation: "1 << 3은 1을 왼쪽으로 3칸 = 8 (2^3)이에요. 12 >> 2는 12를 오른쪽으로 2칸 = 3 (12/4)이에요. 5 ^ 5는 같은 수의 XOR이라 항상 0이에요!"
        },
        {
          id: "ch2-patterns",
          type: "explain",
          title: "💡 자주 쓰는 CP 패턴!",
          content: `USACO와 CP에서 자주 등장하는 패턴들을 정리해봐요!

**1. 빠른 입출력:**
\`\`\`cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
// 이 두 줄만으로 입출력이 훨씬 빨라져요!
\`\`\`

**2. 반복 입력 패턴:**
\`\`\`cpp
int n;
cin >> n;
vi v(n);
for(int i = 0; i < n; i++) {
    cin >> v[i];
}
\`\`\`

**3. Prefix Sum (누적합):**
\`\`\`cpp
// 구간 합을 빠르게 구하는 방법!
vi prefix(n + 1, 0);
for(int i = 0; i < n; i++) {
    prefix[i+1] = prefix[i] + v[i];
}
// 구간 [l, r]의 합 = prefix[r+1] - prefix[l]
\`\`\`

**4. 좌표 압축:**
\`\`\`cpp
// 큰 범위의 값을 작은 인덱스로 변환!
vi sorted_v = v;
sort(all(sorted_v));
sorted_v.erase(unique(all(sorted_v)), sorted_v.end());
// 이제 lower_bound로 인덱스를 찾을 수 있어요
\`\`\`

**5. 유용한 상수:**
\`\`\`cpp
INT_MAX    // int 최댓값 (~2.1 * 10^9)
INT_MIN    // int 최솟값
LLONG_MAX  // long long 최댓값 (~9.2 * 10^18)
\`\`\`

파이썬과 비교해봐요:

| 패턴 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 입력 | \`input()\` | \`cin >>\` + fast I/O |
| 누적합 | \`itertools.accumulate\` | 직접 구현 |
| 정수 최대 | \`float('inf')\` | \`INT_MAX\` / \`1e9\` |
| 좌표 압축 | \`sorted(set(v))\` | \`sort + unique + erase\` |

💡 이 패턴들은 USACO Bronze~Silver에서 정말 자주 나와요!`
        },
        {
          id: "ch2-template",
          type: "explain",
          title: "💡 USACO 최종 템플릿!",
          content: `USACO Bronze~Silver에서 바로 쓸 수 있는 **완전한 CP 템플릿**이에요!

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
typedef pair<int, int> pii;
#define pb push_back
#define all(v) v.begin(), v.end()
#define F first
#define S second

const int INF = 1e9;
const int MOD = 1e9 + 7;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // USACO 파일 입출력 (필요할 때)
    // freopen("problem.in", "r", stdin);
    // freopen("problem.out", "w", stdout);

    int n;
    cin >> n;

    // 여기서 풀이 작성!

    return 0;
}
\`\`\`

**USACO 파일 입출력이 필요할 때:**
\`\`\`cpp
freopen("problem.in", "r", stdin);   // 파일에서 입력
freopen("problem.out", "w", stdout); // 파일로 출력
// 이후 cin/cout은 자동으로 파일을 사용!
\`\`\`

파이썬과 비교해봐요:

**파이썬 USACO 템플릿 🐍:**
\`\`\`python
import sys
sys.stdin = open("problem.in", "r")
sys.stdout = open("problem.out", "w")

n = int(input())
# 풀이 작성
\`\`\`

| 요소 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 전체 import | 각각 \`import\` | \`bits/stdc++.h\` |
| 타입 축약 | 필요 없음 | \`typedef ll, vi, pii\` |
| Fast I/O | 자동 | \`sync_with_stdio + tie\` |
| 파일 I/O | \`sys.stdin = open()\` | \`freopen()\` |

💡 이 템플릿을 외워두면 대회에서 바로 코딩을 시작할 수 있어요! 시간 절약이 핵심이에요!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ USACO 스타일 풀이!",
          content: `USACO 스타일로 완전한 풀이를 작성해봐요!

문제: N개의 수를 입력받아 정렬하고, 가장 작은 수와 가장 큰 수의 차이를 출력하세요.

CP 템플릿의 typedef, 매크로, fast I/O를 모두 활용해봐요!`,
          code: `#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
#define all(v) v.begin(), v.end()

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    vi v = {42, 17, 93, 8, 56};

    sort(all(v));

    int minVal = v[0];
    int maxVal = v[n-1];

    cout << "Min: " << minVal << endl;
    cout << "Max: " << maxVal << endl;
    cout << "Diff: " << maxVal - minVal << endl;

    return 0;
}`,
          expectedOutput: `Min: 8
Max: 93
Diff: 85`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "비트 연산!",
          content: "`1 << 10`의 값은?",
          options: [
            "10",
            "20",
            "512",
            "1024"
          ],
          answer: 3,
          explanation: "1 << 10은 1을 왼쪽으로 10칸 이동한 거예요. 이건 2^10 = 1024예요! 1 << k는 항상 2의 k제곱이에요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 최종 정리
    // ============================================
    {
      id: "ch3",
      title: "최종 정리",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "typedef 사용!",
          content: "`typedef long long ll;` 이후 올바른 사용법은?",
          options: [
            "long a = 1000000000000;",
            "ll a = 1000000000000LL;",
            "int a = 1000000000000;",
            "typedef a = 1000000000000;"
          ],
          answer: 1,
          explanation: "typedef로 ll을 long long의 별명으로 만들었어요! ll a = 1000000000000LL;로 사용할 수 있어요. LL 접미사는 리터럴이 long long임을 명시해요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "비트 연산 활용!",
          content: "숫자 `n`이 짝수인지 확인하는 비트 연산 표현은?",
          options: [
            "(n & 1) == 1",
            "(n | 1) == 0",
            "(n & 1) == 0",
            "(n ^ 1) == 0"
          ],
          answer: 2,
          explanation: "n & 1은 n의 마지막 비트를 확인해요. 짝수면 마지막 비트가 0이라서 (n & 1) == 0이 true예요! 홀수면 (n & 1) == 1이에요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "CP 템플릿!",
          content: "C++ CP에서 빠른 입출력을 위해 사용하는 코드는?",
          options: [
            "cin.speed(true);",
            "ios_base::sync_with_stdio(false); cin.tie(NULL);",
            "fast_io::enable();",
            "#define FAST_IO"
          ],
          answer: 1,
          explanation: "ios_base::sync_with_stdio(false)는 C와 C++ 입출력의 동기화를 끊고, cin.tie(NULL)은 cin과 cout의 연결을 끊어서 입출력 속도를 크게 높여줘요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Part 3 통합 문제!",
          content: `이 코드의 출력은?

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef vector<int> vi;
#define all(v) v.begin(), v.end()
#define pb push_back

int main() {
    vi v;
    v.pb(5); v.pb(2); v.pb(8); v.pb(1);
    sort(all(v));
    cout << v.front() << " " << v.back();
    return 0;
}
\`\`\``,
          options: [
            "5 1",
            "1 8",
            "2 5",
            "8 1"
          ],
          answer: 1,
          explanation: "pb는 push_back, all(v)는 v.begin(), v.end()예요. 벡터에 5,2,8,1을 넣고 정렬하면 {1,2,5,8}이 돼요. front()는 첫 번째(1), back()은 마지막(8)이에요!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Part 3 완료! C++ 마스터!",
          content: `## 🏆 Part 3 완료! 정말 대단해요!

C++ for USACO 전체 과정을 모두 마쳤어요! 축하해요! 🎊

### 📚 전체 커리큘럼 정리

**Part 1: C++ 기초 (레슨 1~8)**
- Hello World, 변수, 조건문, 반복문, 함수 등
- 파이썬에서 C++로의 기초 전환

**Part 2: C++ 심화 (레슨 9~14)**
- 배열/벡터, 문자열, 참조, 구조체/클래스 등
- 데이터 구조와 OOP 기초

**Part 3: USACO 준비 (레슨 15~20)**
- STL 컨테이너, 알고리즘, 포인터, 파일 I/O
- 재귀, 시간 복잡도, 그리고 오늘 배운 CP 실전 팁!

---

## ✅ 오늘 배운 핵심!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 전체 include | \`bits/stdc++.h\` | 모든 STL 한번에! |
| 타입 별명 | \`typedef ll\`, \`vi\`, \`pii\` | 타이핑 줄이기 |
| 매크로 | \`#define pb, all\` | 코드 간결화 |
| 비트 연산 | \`& | ^ << >>\` | 빠른 연산 |
| Fast I/O | \`sync_with_stdio\` | 입출력 가속 |
| 파일 I/O | \`freopen\` | USACO 입출력 |

---

## 🚀 다음 단계!

이제 실전 문제를 풀어볼 차례예요!

1. **USACO** (usaco.org) — 공식 대회 사이트, 과거 문제 풀기
2. **Codeforces** (codeforces.com) — 매주 대회, 다양한 난이도
3. **AtCoder** (atcoder.jp) — 깔끔한 문제, 초보자 친화적
4. **BOJ** (acmicpc.net) — 한국어 문제, 방대한 문제 수

**팁:** Bronze 문제부터 시작해서 하나씩 풀어나가봐요. 한 문제에 30분 이상 고민했다면 에디토리얼을 보는 것도 좋아요!

🎊 **C++ 배움의 여정을 함께해서 즐거웠어요! 화이팅!** 💪`
        }
      ]
    }
  ]
}
