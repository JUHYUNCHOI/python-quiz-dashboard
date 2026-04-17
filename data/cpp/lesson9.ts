// ============================================
// C++ Lesson 9: 배열 & 벡터
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson9Data: LessonData = {
  id: "cpp-9",
  title: "배열 & 벡터",
  emoji: "📚",
  description: "파이썬 list → C++ 배열과 vector!",
  chapters: [
    // ============================================
    // Chapter 1: C-style 배열
    // ============================================
    {
      id: "ch1",
      title: "C-style 배열",
      emoji: "🗃️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📚 파이썬 list vs C++ 배열",
          content: `파이썬에서 여러 값을 저장할 때 **list**를 썼죠?

\`\`\`python
scores = [90, 85, 78, 92, 88]
print(scores[0])  # 90
\`\`\`

왜 배열이 필요할까요? 학생 30명의 점수를 저장한다고 생각해보세요. 변수 30개를 만들 건가요? \`score1, score2, score3...\` 😱

배열은 같은 종류의 데이터를 **한 줄에 보관하는 서랍장**이에요.

C++에서는 **배열(array)**을 써요!

\`\`\`cpp
int scores[5] = {90, 85, 78, 92, 88};
cout << scores[0];  // 90
\`\`\`

💡 배열은 **처음부터 크기를 정하는 좌석 예약**과 같아요. 좌석을 나중에 늘릴 수 없듯이, 배열도 크기를 나중에 바꿀 수 없어요.

큰 차이점이 있어요:

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`scores = [90, 85]\` | \`int scores[2] = {90, 85};\` |
| 크기 자유롭게 변경 | **크기 고정!** |
| 타입 섞을 수 있음 | **같은 타입만!** |
| \`scores.append(100)\` | ❌ 추가 불가! |

💡 C++ 배열 = **크기가 정해진, 같은 타입의 상자들**이에요!`,
          component: "cppArrayBuilder",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "정수 3개를 담는 배열을 선언해봐요!",
          code: "___ nums[___] = {10, 20, 30};",
          reviewHint: `배열 선언 구조:

**데이터타입** 변수명[**크기**] = {초기값, ...};

- 데이터타입: 저장할 값의 종류 (정수 → \`int\`, 실수 → \`float\`)
- 크기: 배열에 들어가는 원소 개수`,
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "list", "array", "var"] },
            { id: 1, answer: "3", options: ["3", "2", "4", "[]"] }
          ],
          explanation: "int 타입 배열 3개짜리를 선언했어요! 타입과 크기를 모두 지정해야 해요."
        },
        {
          id: "ch1-access",
          type: "explain",
          title: "🔢 배열 접근하기",
          content: `배열 원소에 접근하는 방법은 파이썬과 같아요! **인덱스 0부터** 시작해요.

\`\`\`cpp
int arr[4] = {10, 20, 30, 40};

cout << arr[0];  // 10 (첫 번째)
cout << arr[3];  // 40 (마지막)

arr[1] = 99;     // 값 변경도 가능!
cout << arr[1];  // 99
\`\`\`

⚠️ **주의!** 범위를 벗어나면 위험해요:
\`\`\`cpp
int arr[3] = {1, 2, 3};
cout << arr[5];  // ❌ 에러가 아니라 쓰레기 값! (파이썬은 IndexError)
\`\`\`

파이썬은 범위를 벗어나면 IndexError가 나지만, C++은 에러 없이 **쓰레기 값**을 읽어요. 매우 위험해요! arr[100]을 읽어도 프로그램이 그냥 돌아가요.

예를 들어 \`int arr[3] = {10, 20, 30};\`에서 \`arr[100]\`을 읽으면? 에러 없이 \`-827361\` 같은 엉뚱한 숫자가 나와요! 이게 바로 **쓰레기 값(garbage value)**이에요.

💡 C++ 배열은 범위 체크를 안 해요 → 직접 조심해야 해요!

⚠️ **초기화하지 않은 배열도 위험해요:**
\`\`\`cpp
int arr[5];                   // ❌ 초기화 안 함 → 쓰레기값!
int arr[5] = {};              // ✅ 전부 0으로 초기화
int arr[5] = {10, 20, 30};   // ✅ 나머지(4,5번째)는 자동으로 0
\`\`\`
파이썬은 자동으로 0/None으로 초기화되지만, C++은 직접 초기화해야 해요!

@핵심: \`int arr[5] = {};\` — 중괄호를 비워두면 **전부 0으로 초기화**돼요. 나중에 "배열을 전부 0으로 만들고 싶을 때" 바로 쓸 수 있어요!`
        },
        {
          id: "ch1-default-values",
          type: "interactive",
          title: "🎨 타입별 배열 기본값 확인하기",
          content: "부분 초기화할 때 빈 칸에는 무엇이 들어갈까요? 타입마다 달라요!",
          component: "arrayInitVisualizer",
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "배열 접근!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[4] = {5, 10, 15, 20};\n    arr[2] = 100;\n    cout << arr[0] + arr[2];\n    return 0;\n}",
          reviewHint: `배열 원소 접근: \`arr[인덱스]\` (인덱스는 **0부터** 시작)

- \`arr[0]\` → 첫 번째 값
- \`arr[2]\` → 세 번째 값
- \`arr[2] = 100\` → 세 번째 값을 100으로 **변경**

값을 바꾸면 그 이후부터 바뀐 값이 사용돼요.`,
          options: ["20", "105", "115", "에러"],
          answer: 1,
          explanation: "arr[2]를 100으로 바꿨어요! arr[0]=5, arr[2]=100 → 5 + 100 = 105!"
        },
        {
          id: "ch1-loop",
          type: "explain",
          title: "🔁 for 루프로 배열 순회",
          content: `배열과 for 루프는 **찰떡궁합**이에요!

**파이썬 🐍:**
\`\`\`python
scores = [90, 85, 78]
for s in scores:
    print(s)
\`\`\`

**C++ ⚡ (인덱스 방식):**
\`\`\`cpp
int scores[3] = {90, 85, 78};
for (int i = 0; i < 3; i++) {
    cout << scores[i] << " ";
}
// 출력: 90 85 78
\`\`\`

배열 크기를 변수로 관리하면 더 좋아요:
\`\`\`cpp
int size = 3;
for (int i = 0; i < size; i++) {
    cout << scores[i] << endl;
}
\`\`\`

💡 파이썬의 \`for s in scores\`보다 복잡하지만, 나중에 **range-based for**를 배우면 비슷해져요!`
        },
        {
          id: "ch1-loop-sim",
          type: "explain",
          title: "🔍 실행 추적: 배열 순회가 어떻게 동작할까?",
          content: `i가 0부터 2까지 변하며 arr[i]로 배열의 각 칸에 접근하는 과정을 추적합니다.

**i가 바뀔 때마다** arr[i]가 가리키는 칸이 달라져요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTraceCppArrayLoop",
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "배열 + 루프!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[5] = {2, 4, 6, 8, 10};\n    int sum = 0;\n    for (int i = 0; i < 5; i++) {\n        sum += arr[i];\n    }\n    cout << sum;\n    return 0;\n}",
          reviewHint: `for 루프로 배열 순회: \`i\`가 0부터 (크기-1)까지 증가하며 \`arr[i]\`로 접근해요.

\`sum += arr[i]\` → sum에 arr[i] 값을 계속 **누적**해요.

배열의 각 값을 순서대로 더하면 총합이 나와요.`,
          options: ["20", "24", "30", "에러"],
          answer: 2,
          explanation: "2 + 4 + 6 + 8 + 10 = 30! for 루프로 배열의 모든 원소를 더했어요."
        },
        {
          id: "ch1-cin",
          type: "explain",
          title: "⌨️ 배열에 cin으로 값 입력받기",
          content: `배열에 값을 직접 쓰는 대신, 사용자가 **키보드로 입력**하게 할 수도 있어요!

**for 루프 + cin 조합:**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5];

    cout << "점수 5개를 입력하세요:" << endl;
    for (int i = 0; i < 5; i++) {
        cin >> scores[i];  // 각 칸에 차례로 입력받기
    }

    cout << "첫 번째 점수: " << scores[0] << endl;
    return 0;
}
\`\`\`

파이썬과 비교:

\`\`\`python
scores = []
for i in range(5):
    scores.append(int(input()))
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`int(input())\` | \`cin >> scores[i]\` |
| 리스트에 append | 배열 칸에 직접 저장 |
| 크기 자동 증가 | 배열 크기 미리 선언 필요 |

@핵심: C++ 배열은 크기를 먼저 선언하고, for 루프 + cin으로 각 칸을 채워요!`
        },
        {
          id: "ch1-fb-cin",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "3개의 값을 배열에 cin으로 입력받아요!",
          code: "int arr[3];\nfor (int i = 0; i < ___; i++) {\n    ___ >> arr[i];\n}",
          reviewHint: `for 루프로 배열에 cin 입력받기:

- 반복 횟수 = 배열 크기 (3개 배열이면 3번 반복)
- \`cin >> 변수\` 형태로 값을 입력받아요
- \`arr[i]\`는 i번째 칸에 저장하는 것`,
          fillBlanks: [
            { id: 0, answer: "3", options: ["3", "5", "i", "0"] },
            { id: 1, answer: "cin", options: ["cin", "cout", "input", "scanf"] }
          ],
          explanation: "배열 크기(3)만큼 반복하고, cin으로 각 칸에 값을 입력받아요!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 배열로 평균 구하기!",
          content: `점수 5개를 입력받아 합계와 평균을 출력하세요.

입력: 정수 5개 (한 줄에 하나씩)
출력: 합계, 평균 (소수점 포함)`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5];
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        cin >> scores[i];
    }

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }

    cout << sum << endl;
    cout << (double)sum / 5 << endl;

    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int scores[5];
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        cin >> ___;
    }

    for (int i = 0; i < 5; i++) {
        sum += ___;
    }

    cout << sum << endl;
    cout << ___ << endl;

    return 0;
}`,
          stdin: `90\n85\n78\n92\n88`,
          expectedOutput: `433
86.6`
        },
        {
          id: "ch1-practice2",
          type: "practice" as const,
          title: "✋ 배열에서 최댓값 찾기!",
          content: `점수 5개를 입력받아 그 중 가장 높은 점수를 출력하세요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5];

    for (int i = 0; i < 5; i++) {
        cin >> scores[i];
    }

    int maxScore = scores[0];
    for (int i = 1; i < 5; i++) {
        if (scores[i] > maxScore) {
            maxScore = scores[i];
        }
    }

    cout << maxScore << endl;
    return 0;
}`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int scores[5];

    for (int i = 0; i < 5; i++) {
        cin >> scores[i];
    }

    // 여기에 최댓값을 구하는 코드를 써보세요

    return 0;
}`,
          hint: "int maxScore = scores[0]으로 첫 번째 값을 초기값으로 잡고, i = 1부터 반복하면서 scores[i] > maxScore이면 maxScore를 교체해요",
          stdin: `85
92
78
96
88`,
          expectedOutput: `96`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "배열 기초!",
          content: "C++ 배열에 대해 **틀린** 설명은?",
          reviewHint: `C++ 배열의 특징:
- 선언할 때 **크기를 반드시 지정** (나중에 변경 불가)
- 인덱스는 **0부터** 시작
- **같은 타입**의 값만 저장 가능

크기를 동적으로 바꾸려면 \`vector\`를 써야 해요.`,
          options: [
            "크기를 선언할 때 정해야 한다",
            "인덱스는 0부터 시작한다",
            "나중에 크기를 늘릴 수 있다",
            "같은 타입의 값만 저장할 수 있다"
          ],
          answer: 2,
          explanation: "C-style 배열은 크기가 고정이에요! 크기를 늘리려면 vector를 써야 해요."
        },
        {
          id: "ch1-q2",
          type: "fillblank" as const,
          title: "배열에 cin 입력받기!",
          code: "int arr[3];\nfor (int i = 0; i < 3; i++) {\n    ___ >> arr[i];\n}",
          fillBlanks: [
            { id: 0, answer: "cin", options: ["cout", "cin", "input", "scanf"] }
          ],
          explanation: "cin으로 값을 입력받아 arr[i]에 저장해요! cout은 출력, cin은 입력이에요."
        }
      ]
    },
    // ============================================
    // Chapter 2: vector
    // ============================================
    {
      id: "ch2",
      title: "vector — 파이썬 list처럼!",
      emoji: "📦",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📦 vector = 크기가 변하는 배열!",
          component: "cppVectorBuilder",
          content: `배열은 크기가 고정이라 불편하죠? **vector**는 파이썬 list처럼 크기가 자유로워요!

\`\`\`cpp
#include <vector>  // ← 이거 필요!

vector<int> nums = {1, 2, 3};
nums.push_back(4);  // [1, 2, 3, 4] — 끝에 추가!
\`\`\`

파이썬과 비교:

| 파이썬 🐍 | C++ vector ⚡ |
|---|---|
| \`nums = [1, 2, 3]\` | \`vector<int> nums = {1, 2, 3};\` |
| \`nums.append(4)\` | \`nums.push_back(4);\` |
| \`len(nums)\` | \`nums.size()\` |
| \`nums[0]\` | \`nums[0]\` (같아요!) |

⚠️ \`#include <vector>\`을 꼭 추가해야 해요!

헤더(header)는 C++의 추가 기능을 불러오는 거예요. vector를 쓰려면 <vector> 헤더가 필요해요.

💡 vector는 **크기가 자동으로 늘어나는 배열**이에요. 실전에서는 배열보다 vector를 훨씬 많이 써요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "문자열 벡터를 선언해봐요!",
          code: "#include <___>\n\nvector<___> names = {\"Alice\", \"Bob\"};",
          reviewHint: `vector를 사용하려면 헤더 파일이 필요해요:
\`#include <헤더이름>\`

- \`iostream\` → 입출력용
- \`vector\` → vector 사용 시 필요

C++에서 문자열 타입은 \`string\`이에요. (파이썬의 \`str\`)`,
          fillBlanks: [
            { id: 0, answer: "vector", options: ["vector", "array", "list", "iostream"] },
            { id: 1, answer: "string", options: ["string", "char", "text", "str"] }
          ],
          explanation: "vector를 쓰려면 #include <vector>이 필요하고, 문자열 벡터는 vector<string>이에요!"
        },
        {
          id: "ch2-init",
          type: "explain",
          title: "🔧 크기와 초기값으로 vector 만들기",
          content: `이미 봤던 방식 외에, **크기와 초기값을 지정해서** vector를 만들 수 있어요.

\`\`\`cpp
vector<int> v(5, 0);    // 0이 5개: {0, 0, 0, 0, 0}
vector<int> v(3, 10);   // 10이 3개: {10, 10, 10}
\`\`\`

파이썬에서 이렇게 하던 거랑 같아요:

\`\`\`python
v = [0] * 5   # 파이썬
\`\`\`
\`\`\`cpp
vector<int> v(5, 0);  // C++, 같은 의미!
\`\`\`

@핵심: 나중에 알고리즘 문제에서 "n개짜리 배열을 전부 0으로 초기화"할 때 바로 쓸 수 있어요!`,
        },
        {
          id: "ch2-fb-init",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "정수 4개를 전부 -1로 초기화한 vector를 만들어봐요!",
          code: "vector<int> v(___, ___);",
          reviewHint: `\`vector<타입> 변수명(크기, 초기값);\`

예시:
- \`vector<int> v(3, 0)\` → {0, 0, 0}
- \`vector<int> v(5, 1)\` → {1, 1, 1, 1, 1}`,
          fillBlanks: [
            { id: 0, answer: "4", options: ["4", "3", "5", "-1"] },
            { id: 1, answer: "-1", options: ["-1", "0", "1", "4"] }
          ],
          explanation: "vector<int> v(4, -1)은 -1이 4개 들어있는 벡터를 만들어요! v = {-1, -1, -1, -1}"
        },
        {
          id: "ch2-methods",
          type: "explain",
          title: "🛠️ vector 주요 기능 모음",
          content: `\`vector<int> v = {10, 20, 30};\` 기준으로 하나씩 살펴봐요!

## ① push_back(값) — 끝에 추가

\`\`\`cpp
v.push_back(40);
// 파이썬: v.append(40)
// v = {10, 20, 30, 40}
\`\`\`

## ② pop_back() — 마지막 제거

\`\`\`cpp
v.pop_back();
// 파이썬: v.pop()
// v = {10, 20, 30}
\`\`\`

## ③ size() — 원소 개수

\`\`\`cpp
cout << v.size();   // 3
// 파이썬: len(v)
\`\`\`

## ④ v[i] vs v.at(i) — 원소 접근

\`\`\`cpp
cout << v[0];      // 10  ← 빠르지만 범위 체크 없음
cout << v.at(0);   // 10  ← 범위 체크 포함 (더 안전)
\`\`\`

범위를 벗어나면 어떻게 다를까요?

\`\`\`cpp
// v = {10, 20, 30}  (크기 3)

cout << v[10];      // ❌ 에러 없이 쓰레기값 출력! (-827361 같은 값)
cout << v.at(10);   // ✅ 에러 발생 → "out_of_range" 메시지
\`\`\`

@핵심: 파이썬은 IndexError를 내지만, C++의 v[i]는 에러 없이 쓰레기값! v.at(i)를 쓰면 파이썬처럼 범위 에러를 잡을 수 있어요.

## ⑤ front() / back() — 처음 / 마지막 원소

\`\`\`cpp
cout << v.front();  // 10  (첫 번째)
cout << v.back();   // 30  (마지막)
// 파이썬: v[0] / v[-1]
\`\`\`

## ⑥ empty() — 비어있는지 확인

\`\`\`cpp
if (v.empty()) cout << "비어있어요!";
// 파이썬: if not v:
\`\`\`

## ⑦ clear() — 전부 삭제

\`\`\`cpp
v.clear();
// v = {}  (텅 빈 vector)
// 파이썬: v.clear()  ← 동일!
\`\`\`

💡 **find, sort** 같은 검색/정렬 기능은 \`#include <algorithm>\` 헤더에서 제공해요. 나중에 배울게요!`
        },
        {
          id: "ch2-sort",
          type: "explain",
          title: "📊 기본 정렬 — sort()",
          content: `**sort()** 는 vector(또는 배열)을 오름차순으로 정렬하는 함수예요. \`<algorithm>\` 헤더가 필요해요.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>  // sort 에 필요
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end());  // 오름차순 정렬
    for (int x : v) cout << x << " ";  // 1 2 3 5 8 9
}
\`\`\`

**사용법**:
- \`sort(v.begin(), v.end())\` — vector 전체를 오름차순 정렬
- \`sort(arr, arr + n)\` — 배열 (0번부터 n-1번까지) 오름차순 정렬

💡 문자열 vector도 같은 방식 (사전 순 오름차순):
\`\`\`cpp
vector<string> names = {"bob", "alice", "carol"};
sort(names.begin(), names.end());  // alice, bob, carol
\`\`\`

💡 **내림차순** 이나 **구조체 정렬** 같은 심화 기법은 cpp-23 (sort 마스터) 에서 배워요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "vector 조작!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3};\n    v.push_back(4);\n    v.push_back(5);\n    v.pop_back();\n    cout << v.size();\n    return 0;\n}",
          reviewHint: `vector 주요 메서드:
- \`push_back(값)\` → 끝에 **추가** (크기 +1)
- \`pop_back()\` → 마지막 원소 **제거** (크기 -1)
- \`size()\` → 현재 원소 **개수** 반환

코드를 순서대로 따라가며 크기가 어떻게 바뀌는지 추적해보세요.`,
          options: ["3", "4", "5", "에러"],
          answer: 1,
          explanation: "{1,2,3} → push_back(4) → {1,2,3,4} → push_back(5) → {1,2,3,4,5} → pop_back() → {1,2,3,4}. 크기는 4!"
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔁 vector 순회하기",
          content: `vector도 배열처럼 **for 루프로 순회**할 수 있어요!

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};

for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}
// 출력: 10 20 30 40
\`\`\`

배열 순회와 **거의 똑같아요!** 다른 점은:
- 배열: \`i < 크기\` (숫자 직접 입력)
- vector: \`i < v.size()\` (.size()로 자동 계산)

\`\`\`cpp
// 합계 구하기
int sum = 0;
for (int i = 0; i < v.size(); i++) {
    sum += v[i];
}
cout << sum;  // 100
\`\`\`

@핵심: 배열 순회와 구조가 같아요. v.size()가 배열의 고정 크기 대신 들어가는 것만 달라요!

💡 더 간결한 순회 방법인 **range-based for**는 다음 레슨(cpp-10)에서 배워요!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "vector 순회!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {3, 1, 4, 1, 5};\n    v.push_back(9);\n    int sum = 0;\n    for (int i = 0; i < v.size(); i++) {\n        sum += v[i];\n    }\n    cout << sum;\n    return 0;\n}",
          reviewHint: `vector 순회: \`for (int i = 0; i < v.size(); i++)\`로 각 원소에 접근해요.

push_back 후 vector의 원소들을 순서대로 더해보세요.`,
          options: ["14", "23", "24", "에러"],
          answer: 1,
          explanation: "push_back(9) 후 v = {3,1,4,1,5,9}. 합계: 3+1+4+1+5+9 = 23!"
        },
        {
          id: "ch2-pred3",
          type: "predict" as const,
          title: "front / back / empty!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30};\n    cout << v.front() << \" \" << v.back() << endl;\n    v.clear();\n    cout << v.empty();\n    return 0;\n}",
          reviewHint: `- \`front()\` → 첫 번째 원소
- \`back()\` → 마지막 원소
- \`clear()\` → 전부 삭제
- \`empty()\` → 비어있으면 1(true), 아니면 0(false)`,
          options: ["10 30\n0", "10 30\n1", "20 30\n1", "에러"],
          answer: 1,
          explanation: "front()=10, back()=30 출력 후, clear()로 비워지면 empty()=1(true)!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "📊 배열 vs vector 비교",
          content: `언제 뭘 써야 할까요?

| | 배열 (array) | 벡터 (vector) |
|---|---|---|
| 크기 | 처음에 고정 | 자유롭게 변경 |
| 선언 | \`int arr[5];\` | \`vector<int> v;\` |
| 추가 | 불가능 | \`v.push_back(x)\` |
| 삭제 | 불가능 | \`v.pop_back()\` |
| 크기 확인 | 직접 관리 | \`.size()\` |
| 안전성 | 범위 체크 없음 | \`.at()\` 사용 가능 |
| 헤더 | 없음 | \`#include <vector>\` |
| 💡 추천 | 크기가 고정일 때 | 대부분의 경우! |

**결론:**
- 크기가 정해져 있으면 → **배열** (더 빠름)
- 크기가 변할 수 있으면 → **vector** (더 편리)
- 잘 모르겠으면 → **vector** 쓰세요! 😄

💡 실무에서는 **거의 항상 vector**를 써요. 배열은 이해만 해두면 됩니다!`
        },
        {
          id: "ch2-fb2",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "벡터에 값을 추가하고 크기를 확인해봐요!",
          code: "vector<int> v = {5, 10};\nv.___(15);\ncout << v.___();",
          reviewHint: `파이썬 → C++ vector 메서드 대응:
- \`list.append(x)\` → \`v.push_back(x)\` (끝에 추가)
- \`len(list)\` → \`v.size()\` (원소 개수)`,
          fillBlanks: [
            { id: 0, answer: "push_back", options: ["push_back", "append", "add", "insert"] },
            { id: 1, answer: "size", options: ["size", "length", "len", "count"] }
          ],
          explanation: "push_back()으로 추가하고, size()로 크기를 확인해요! 파이썬의 append()와 len()에 해당해요."
        },
        {
          id: "ch2-cin",
          type: "explain",
          title: "⌨️ vector에 cin으로 값 입력받기",
          content: `vector는 크기를 미리 정하지 않아도 되어서, 입력받으면서 **push_back으로 추가**하면 돼요!

**방법 1: 개수를 먼저 입력받기**

\`\`\`cpp
int n;
cin >> n;  // 몇 개 받을지 먼저 입력

vector<int> nums;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    nums.push_back(x);
}
\`\`\`

**방법 2: 특정 값(예: 0)이 나올 때까지 입력**

\`\`\`cpp
vector<int> nums;
int x;
while (cin >> x && x != 0) {
    nums.push_back(x);
}
// 0 입력 시 종료
\`\`\`

| | 배열 (array) | vector |
|---|---|---|
| 입력 방식 | \`cin >> arr[i]\` | \`cin >> x; v.push_back(x)\` |
| 크기 사전 선언 | **필요** | 불필요 |
| 유연성 | 낮음 | 높음 |

@핵심: vector는 크기를 몰라도 push_back으로 계속 추가할 수 있어서 cin과 더 자연스럽게 쓰여요!`
        },
        {
          id: "ch2-fb-cin",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "cin으로 입력받아 vector에 추가하는 코드예요!",
          code: "vector<int> v;\nint x;\ncin >> x;\nv.___(x);",
          reviewHint: `vector에 원소를 끝에 추가하는 메서드:
- \`v.push_back(값)\` → 뒤에 밀어 넣기

cin으로 받은 값을 바로 push_back으로 넣으면 돼요!`,
          fillBlanks: [
            { id: 0, answer: "push_back", options: ["push_back", "append", "add", "insert"] }
          ],
          explanation: "cin으로 받은 값을 push_back으로 vector에 추가해요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ vector로 숫자 관리하기!",
          content: `cin으로 숫자를 입력받아 vector에 저장하고, 전체를 출력해보세요!

{!teal} 입력 방법: 숫자를 하나씩 입력하고, **0을 입력하면 종료**돼요.

{!blue} 테스트 입력값: **5 3 8 2 0** (0 입력 시 종료)`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    int input;

    while (true) {
        cin >> input;
        if (input == 0) break;
        nums.push_back(input);
    }

    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    cout << nums.size() << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    int input;

    // 0이 입력될 때까지 nums에 저장하세요

    // 숫자들을 공백으로 출력하세요
    cout << endl;
    // 개수를 출력하세요
    cout << nums.size() << endl;

    return 0;
}`,
          hint: "while(true) { cin >> input; if(input == 0) break; nums.push_back(input); }로 입력을 받고, for(int i = 0; i < nums.size(); i++) { cout << nums[i] << \" \"; }로 출력해요",
          stdin: `5
3
8
2
0`,
          expectedOutput: `5 3 8 2
4`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "vector 메서드!",
          content: "파이썬의 `nums.append(10)`에 해당하는 C++ 코드는?",
          reviewHint: `C++ vector에서 끝에 원소를 추가하는 메서드는 파이썬의 \`append\`와 이름이 달라요.

"push" = 밀어 넣다, "back" = 뒤에 → 뒤에 밀어 넣는다!`,
          options: [
            "nums.add(10)",
            "nums.push_back(10)",
            "nums.insert(10)",
            "nums.append(10)"
          ],
          answer: 1,
          explanation: "C++ vector에서 끝에 추가하는 메서드는 push_back()이에요!"
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "vector + cin!",
          content: `cin으로 입력받아 vector에 저장하는 올바른 코드는?`,
          reviewHint: `vector에 cin 입력값을 추가하는 방법:

1. cin으로 변수에 입력받기
2. push_back으로 vector에 추가

배열과 달리 vector는 크기를 먼저 정하지 않아도 돼요!`,
          options: [
            "vector<int> v;\ncin >> v;",
            "vector<int> v;\nint x;\ncin >> x;\nv.push_back(x);",
            "vector<int> v[5];\ncin >> v[0];",
            "vector<int> v;\nv.cin(x);"
          ],
          answer: 1,
          explanation: "cin으로 변수에 받고, push_back으로 vector에 추가하는 게 맞아요!"
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
          title: "배열 선언!",
          content: "정수 5개를 저장하는 배열을 올바르게 선언한 것은?",
          reviewHint: `C++ 배열 선언 구조:

**타입** 배열명**[크기]**;

- 타입이 앞에 오고, 크기는 변수명 **뒤** 대괄호 안에 들어가요.
- Java의 \`int[] arr\`나 Python의 \`arr = []\`와 위치가 달라요!`,
          options: [
            "int arr = [5];",
            "int arr[5];",
            "array<int> arr(5);",
            "int[] arr = new int[5];"
          ],
          answer: 1,
          explanation: "C-style 배열은 int arr[5];로 선언해요!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "vector vs 배열!",
          content: "배열 대신 vector를 써야 하는 상황은?",
          reviewHint: `배열 vs vector 핵심 차이:

| | 배열 | vector |
|---|---|---|
| 크기 | **고정** (변경 불가) | **유동** (추가/삭제 가능) |
| 사용 | 크기가 정해진 경우 | 크기가 변하는 경우 |`,
          options: [
            "크기가 정확히 정해져 있을 때",
            "데이터를 계속 추가/삭제해야 할 때",
            "#include를 쓰고 싶지 않을 때",
            "속도가 가장 중요할 때"
          ],
          answer: 1,
          explanation: "크기가 변해야 하는 상황에서는 vector를 쓰는 게 좋아요! 추가/삭제가 자유로워요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "코드 결과!",
          content: `이 코드의 출력은?

\`\`\`cpp
vector<int> v = {1, 2, 3};
v.push_back(4);
cout << v[2] << " " << v.size();
\`\`\``,
          reviewHint: `- \`v[2]\`: 인덱스는 **0부터** 시작 → v[0]=1, v[1]=2, v[2]=3
- \`push_back(4)\` 후 vector에 원소가 하나 추가됨
- \`size()\`: 현재 **원소 개수** 반환`,
          options: ["3 3", "3 4", "4 4", "2 4"],
          answer: 1,
          explanation: "push_back(4) 후 v = {1,2,3,4}. v[2]=3, size()=4 → \"3 4\"!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "안전한 접근!",
          content: "배열이나 vector에서 범위를 벗어난 접근을 **안전하게 체크**하려면?",
          reviewHint: `\`v[i]\` vs 안전한 접근 방법:
- \`v[i]\`: 빠르지만 범위 초과 시 **쓰레기 값** (에러 없음)
- 범위를 벗어나면 에러를 알려주는 메서드는?

"at" = "~에서 가져오다" — 범위 체크 포함!`,
          options: [
            "arr[i]를 사용한다",
            "v.at(i)를 사용한다",
            "v.get(i)를 사용한다",
            "v.safe(i)를 사용한다"
          ],
          answer: 1,
          explanation: "v.at(i)는 범위를 벗어나면 에러(exception)를 던져요! v[i]보다 안전해요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

- ✅ **C-style 배열** — \`int arr[5]\`, 크기 고정, 같은 타입만
- ✅ **배열 접근** — \`arr[0]\`, 인덱스 0부터, 범위 체크 없음
- ✅ **for 루프 순회** — \`for (int i = 0; i < size; i++)\`
- ✅ **vector** — \`vector<int> v\`, 크기 자유, \`#include <vector>\` 필요
- ✅ **vector 메서드** — push_back, pop_back, size, at, clear

🚀 **다음 시간: Range-for & auto** — \`for(auto x : vec)\`로 더 편하게 순회하기!`
        }
      ]
    }
  ]
}
