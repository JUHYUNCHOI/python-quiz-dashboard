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

💡 C++ 배열은 범위 체크를 안 해요 → 직접 조심해야 해요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "배열 접근!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[4] = {5, 10, 15, 20};\n    arr[2] = 100;\n    cout << arr[0] + arr[2];\n    return 0;\n}",
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
          options: ["20", "24", "30", "에러"],
          answer: 2,
          explanation: "2 + 4 + 6 + 8 + 10 = 30! for 루프로 배열의 모든 원소를 더했어요."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 배열로 평균 구하기!",
          content: `5개의 점수를 배열에 저장하고, for 루프로 합계와 평균을 구해보세요!

힌트: 평균은 \`합계 / 개수\`예요. 소수점을 보려면 \`(double)sum / 5\`로 캐스팅하세요!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5] = {90, 85, 78, 92, 88};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }

    cout << "합계: " << sum << endl;
    cout << "평균: " << (double)sum / 5 << endl;

    return 0;
}`,
          expectedOutput: `합계: 433
평균: 86.6`
        },
        {
          id: "ch1-practice2",
          type: "practice" as const,
          title: "✋ 배열에서 최댓값 찾기!",
          content: `5개의 점수가 저장된 배열에서 최댓값을 찾아 출력하세요.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5] = {85, 92, 78, 96, 88};
    int maxScore = scores[0];

    for (int i = 1; i < 5; i++) {
        if (scores[i] > maxScore) {
            maxScore = scores[i];
        }
    }

    cout << "최고 점수: " << maxScore << endl;
    return 0;
}`,
          expectedOutput: `최고 점수: 96`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "배열 기초!",
          content: "C++ 배열에 대해 **틀린** 설명은?",
          options: [
            "크기를 선언할 때 정해야 한다",
            "인덱스는 0부터 시작한다",
            "나중에 크기를 늘릴 수 있다",
            "같은 타입의 값만 저장할 수 있다"
          ],
          answer: 2,
          explanation: "C-style 배열은 크기가 고정이에요! 크기를 늘리려면 vector를 써야 해요."
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
          fillBlanks: [
            { id: 0, answer: "vector", options: ["vector", "array", "list", "iostream"] },
            { id: 1, answer: "string", options: ["string", "char", "text", "str"] }
          ],
          explanation: "vector를 쓰려면 #include <vector>이 필요하고, 문자열 벡터는 vector<string>이에요!"
        },
        {
          id: "ch2-methods",
          type: "explain",
          title: "🛠️ vector 주요 기능",
          content: `vector에서 자주 쓰는 기능들이에요!

\`\`\`cpp
vector<int> v = {10, 20, 30};

v.push_back(40);     // 끝에 추가 → {10, 20, 30, 40}
v.pop_back();        // 마지막 제거 → {10, 20, 30}
cout << v.size();    // 크기: 3
cout << v[0];        // 첫 번째: 10
cout << v.at(1);     // 두 번째: 20 (범위 체크!)
v.clear();           // 전부 삭제 → {}
\`\`\`

| 파이썬 🐍 | C++ vector ⚡ |
|---|---|
| \`v.append(x)\` | \`v.push_back(x)\` |
| \`v.pop()\` | \`v.pop_back()\` |
| \`len(v)\` | \`v.size()\` |
| \`v[i]\` | \`v[i]\` 또는 \`v.at(i)\` |
| \`v.clear()\` | \`v.clear()\` |

💡 \`v.at(i)\`는 \`v[i]\`와 같지만, 범위를 벗어나면 에러를 알려줘요! 더 안전해요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "vector 조작!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3};\n    v.push_back(4);\n    v.push_back(5);\n    v.pop_back();\n    cout << v.size();\n    return 0;\n}",
          options: ["3", "4", "5", "에러"],
          answer: 1,
          explanation: "{1,2,3} → push_back(4) → {1,2,3,4} → push_back(5) → {1,2,3,4,5} → pop_back() → {1,2,3,4}. 크기는 4!"
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
          fillBlanks: [
            { id: 0, answer: "push_back", options: ["push_back", "append", "add", "insert"] },
            { id: 1, answer: "size", options: ["size", "length", "len", "count"] }
          ],
          explanation: "push_back()으로 추가하고, size()로 크기를 확인해요! 파이썬의 append()와 len()에 해당해요."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ vector로 숫자 관리하기!",
          content: `사용자에게 숫자를 입력받아 vector에 저장하고, 전체를 출력해보세요!

0을 입력하면 입력을 멈추고 결과를 출력해요.`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    int input;

    cout << "숫자를 입력하세요 (0이면 종료): " << endl;

    while (true) {
        cin >> input;
        if (input == 0) break;
        nums.push_back(input);
    }

    cout << "입력한 숫자: ";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    cout << "총 " << nums.size() << "개" << endl;

    return 0;
}`,
          expectedOutput: `숫자를 입력하세요 (0이면 종료):
5 3 8 2 0
입력한 숫자: 5 3 8 2
총 4개`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "vector 메서드!",
          content: "파이썬의 `nums.append(10)`에 해당하는 C++ 코드는?",
          options: [
            "nums.add(10)",
            "nums.push_back(10)",
            "nums.insert(10)",
            "nums.append(10)"
          ],
          answer: 1,
          explanation: "C++ vector에서 끝에 추가하는 메서드는 push_back()이에요!"
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
          options: ["3 3", "3 4", "4 4", "2 4"],
          answer: 1,
          explanation: "push_back(4) 후 v = {1,2,3,4}. v[2]=3, size()=4 → \"3 4\"!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "안전한 접근!",
          content: "배열이나 vector에서 범위를 벗어난 접근을 **안전하게 체크**하려면?",
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
