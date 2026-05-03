// ============================================
// C++ Lesson 23: sort 마스터
// sort 기초 → 람다 → 이진탐색(lower_bound) → 심화
// ============================================
import { LessonData } from '../types'

export const cppLesson23Data: LessonData = {
  id: "cpp-23",
  title: "sort & 이진탐색",
  emoji: "📊",
  description: "sort 기초 + 람다 + lower_bound — 정렬과 이진탐색을 한 번에!",
  chapters: [
    // ============================================
    // Chapter 0: sort 기초
    // ============================================
    {
      id: "s23-ch0",
      title: "sort 기초",
      emoji: "📊",
      steps: [
        {
          id: "s23-ch0-toolbox",
          type: "explain",
          title: "🗂️ 데이터 묶는 도구 — 한눈에 정리",
          content: `여기까지 배운 도구가 **4 개**: \`vector\`, \`pair\`, \`tuple\`, \`struct\`. 슬슬 헷갈리기 시작할 시점이에요. **한 번 정리하고 가요** — 이 표가 평생 갑니다.

### 4 개 도구 비교

| 도구 | 언제 쓰나 | 예시 | 꺼내기 |
|---|---|---|---|
| **vector** | **같은 타입** 여러 개 (개수 변동 OK) | 학생 30 명 점수 | \`v[i]\` |
| **pair** | **다른 타입 2 개** 짝꿍 | 좌표 (x, y) / 이름·점수 | \`.first\` / \`.second\` |
| **tuple** | **다른 타입 3+ 개**, 잠깐 | (이름, 나이, 학점) 한 함수에서 | \`get<0>(t)\` 또는 \`auto [...]\` |
| **struct** | **다른 타입**, 자주 쓰는 의미 있는 데이터 | 게임 캐릭터 (이름·HP·MP) | \`.name\`, \`.hp\` |

### 1 초 결정 트리

\`\`\`
한 변수에 여러 데이터 묶기?
│
├─ 같은 타입, 여러 개 → vector
│
└─ 다른 타입 묶음
    ├─ 딱 2 개 → pair
    └─ 3 개 이상
        ├─ 잠깐만 (한 함수 안) → tuple
        └─ 자주 다룸 + 이름 중요 → struct
\`\`\`

### 조합도 자주 보여요

| 조합 | 의미 | 예시 |
|---|---|---|
| \`vector<pair<...>>\` | 짝꿍 **여러 개** | 학생 N 명의 (이름, 점수) — sort 단골 |
| \`vector<struct ...>\` | 명단 데이터 | 게임 캐릭터 N 명 |
| \`pair<int, string>\` | 한 짝꿍 | (점수, 이름) — sort 키로 점수 |

### 1 초 룰 정리

> **여러 명/개?** → **vector** 부터.
> **2 개?** → **pair**.
> **3+ 개 + 잠깐?** → **tuple**.
> **자주 쓰고 이름 중요?** → **struct**.

### 이번 sort 챕터에선?

거의 다 \`vector<pair>\` 쓸 거예요 — N 명 학생 데이터 (vector) + 이름·점수 짝꿍 (pair). 위 표 보면서 "맞다, vector<pair>" 라고 자연스럽게 떠올리게 돼요.

다음 페이지부터 — sort 가 어떻게 한 줄로 정렬하는지 봐요 👇`,
        },
        {
          id: "s23-ch0-intro",
          type: "explain",
          title: "📊 sort() — 한 줄로 정렬",
          content: `직전 레슨에서 pair 의 자동 비교 덕분에 "\`sort\` **한 줄로 점수표가 정렬된다**" 는 걸 봤죠. 이번 레슨은 그 \`sort\` 가 주인공이에요.

\`sort\` 는 정렬 알고리즘 (퀵정렬/머지정렬 등) 을 직접 짜야 했던 작업을 **한 줄** 로 끝내줘요. C++ 에서 가장 많이 쓰이는 STL 함수 중 하나.

\`\`\`cpp
#include <algorithm>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}
\`\`\`

\`sort(begin, end)\` — STL 의 그 익숙한 \`(begin, end)\` 패턴이에요. "이 범위 안에서 정렬해줘" 라는 뜻.

> 💡 파이썬의 \`v.sort()\` 와 비슷한데, 한 가지 차이가 있어요.

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — 새 리스트 반환 | (없음) C++ 은 항상 **원본 자체를 수정** |

C++ 에서 정렬은 항상 **원본을 직접 바꿔요.** "정렬된 새 벡터" 가 필요하면 미리 복사해두고 거기서 sort 해야 해요.

### 배열에도 똑같이

\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // arr[0] ~ arr[4] 정렬
\`\`\`

{collapse:🤔 \`arr + 5\` 가 왜 되는 거지?}
\`\`\`
arr 은 사실 배열 첫 번째 요소의 메모리 주소예요 (포인터).
arr     → arr[0] 주소
arr + 5 → arr[5] 주소 (= 마지막 다음, 끝 표시)

vector 의 v.begin()/v.end() 랑 같은 역할이에요.
\`\`\`

---

### 💭 한 가지 떠올려두기 — sort 는 **비교** 가 돼야 동작해요

\`sort\` 가 한 줄로 끝낼 수 있는 이유는 **두 값 중 누가 앞인지 비교할 수 있기 때문**이에요.

| 타입 | 자동 비교? | sort 한 줄? |
|---|---|---|
| \`int\`, \`string\` | ✅ 당연 | ✅ |
| \`pair\`, \`tuple\` | ✅ 표준 라이브러리가 미리 정의 | ✅ |
| \`struct\` (우리가 만든 거) | ❌ "이 둘 중 누가 앞?" 컴파일러 모름 | ❌ 그냥은 안 됨 |

\`struct\` 도 정렬할 수는 있는데 한 단계가 더 필요해요. 챕터 1 에서 그 해결책 (lambda) 을 봐요.

---

다음 페이지 — 직접 정렬해봐요 👇`
        },
        {
          id: "s23-ch0-fb1",
          type: "fillblank" as const,
          title: "sort 빈칸 채우기",
          content: "벡터를 정렬하는 코드를 완성해요!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort()에는 시작 위치와 끝 위치를 넣어요! vector는 v.begin()과 v.end()를 사용해요."
        },
        {
          id: "s23-ch0-practice1",
          type: "practice" as const,
          title: "✋ 처음부터 — 정수 정렬 후 출력",
          content: `**문제**: N 개의 정수가 주어질 때, 오름차순으로 정렬해서 한 줄에 공백 구분으로 출력하세요.

> 💡 #include 부터 main 까지 직접 작성. 입력 → vector 에 담기 → sort → 출력. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 N 개 정수를 vector 에 담고, sort 한 후, 공백 구분으로 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << v[i];
    }
    return 0;
}`,
          hint: "vector<int> v(n); 으로 크기 n 벡터, for 로 입력, sort(v.begin(), v.end()), for 로 출력 (첫 원소 제외하고 공백 prefix).",
          expectedOutput: `1 2 4 5 7`,
          stdin: `5
4 2 7 1 5`,
        },
        {
          id: "s23-ch0-pred1",
          type: "predict" as const,
          title: "sort 후 출력!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "sort() 후 v = {1, 2, 4, 5, 7}이에요. v[0]은 가장 작은 1, v[4]는 가장 큰 7이에요. 그래서 1 7이 출력돼요!"
        },
        {
          id: "s23-ch0-desc",
          type: "explain",
          title: "📊 내림차순 정렬!",
          content: `기본 sort()는 오름차순이에요. 내림차순으로 정렬하려면?

**방법 1: greater<int>() 사용 (단순 int/string)**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}
\`\`\`

sort()의 **세 번째 인자**로 "비교 기준"을 넣을 수 있어요.
\`greater<int>()\`는 "큰 게 앞으로"라는 뜻의 미리 만들어진 도구예요.

| | 코드 | 결과 |
|---|---|---|
| 오름차순 | \`sort(v.begin(), v.end())\` | 1 2 5 8 9 |
| 내림차순 | \`sort(v.begin(), v.end(), greater<int>())\` | 9 8 5 2 1 |

💡 세 번째 인자 없으면 기본이 오름차순이에요!`
        },
        {
          id: "s23-ch0-fb2",
          type: "fillblank" as const,
          title: "내림차순 빈칸 채우기",
          content: "벡터를 내림차순으로 정렬해봐요!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), ___<int>());",
          fillBlanks: [
            { id: 0, answer: "greater", options: ["greater", "bigger", "larger", "reverse"] }
          ],
          explanation: "내림차순은 greater<타입>()을 써요! 타입에 맞게 greater<int>(), greater<string>() 등으로 사용해요."
        },
        {
          id: "s23-ch0-pred2",
          type: "predict" as const,
          title: "내림차순 결과 예측!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), greater<int>());
    cout << v[0] << " " << v[1] << " " << v[4];
    return 0;
}`,
          options: ["1 1 5", "5 4 1", "5 1 1", "3 1 4"],
          answer: 1,
          explanation: "greater<int>() 는 내림차순 → v = {5, 4, 3, 1, 1}. v[0]=5, v[1]=4, v[4]=1 → '5 4 1'."
        },
        {
          id: "s23-ch0-practice2",
          type: "practice" as const,
          title: "✋ 처음부터 — 내림차순 + 상위 3 개 출력",
          content: `**문제**: N 개의 정수가 주어질 때, **내림차순으로 정렬해서 가장 큰 3 개** 를 한 줄에 공백 구분으로 출력하세요.
N < 3 이면 전체를 내림차순으로 출력.

\`\`\`
입력: 5
      4 2 7 1 5
출력: 7 5 4

입력: 2
      9 3
출력: 9 3
\`\`\`

> 💡 \`greater<int>()\` 로 내림차순 정렬 후, 인덱스 \`min(3, N)\` 까지 출력.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 N 개 입력, 내림차순 정렬, 가장 큰 3 개 (또는 전체) 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), greater<int>());
    int k = min(n, 3);
    for (int i = 0; i < k; i++) {
        if (i > 0) cout << " ";
        cout << v[i];
    }
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), greater<int>()) 로 내림차순. min(n, 3) 까지 출력 — N<3 인 경우 자동 처리.",
          expectedOutput: `7 5 4`,
          stdin: `5
4 2 7 1 5`,
        },
        {
          id: "s23-ch0-q1",
          type: "quiz",
          title: "sort 헤더!",
          content: "`sort()` 를 사용하려면 어떤 헤더를 include 해야 하나요? **공식 답 기준으로** 골라요.",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "**공식 답: `<algorithm>`**. `sort()` 는 정확히 이 헤더에 정의돼 있어요.\n\n💡 pair 때 \"`<vector>` 등에 자동으로 따라온다\" 고 한 거랑 헷갈렸을 수 있는데, 둘은 달라요:\n• **pair 는 타입**: map, set 같은 STL 컨테이너가 내부적으로 pair 를 쓰니까 헤더에 자동으로 끌려와요.\n• **sort 는 함수**: 다른 STL 헤더가 sort 를 안 쓰니까, 따라오지 않아요. `<vector>` 만 적고 `sort()` 호출하면 `'sort' was not declared` 에러 나요.\n\n**규칙: 함수는 그 함수가 있는 공식 헤더를 명시적으로 include.** 타입은 운 좋게 따라오는 경우가 있는 정도."
        },
        {
          id: "s23-ch0-practice3",
          type: "practice" as const,
          title: "✋ 처음부터 — 문자열 알파벳순 정렬",
          content: `**문제**: N 개의 문자열이 주어질 때, **알파벳 오름차순** 으로 정렬해서 한 줄에 한 단어씩 출력하세요.

> 💡 \`sort\` 는 int 뿐 아니라 **string vector 에도 그대로** 통해요 — 문자열은 사전순으로 자동 비교됨. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 👇 N 개 문자열 입력, 알파벳순 정렬, 한 줄에 한 개씩 출력

    return 0;
}`,
          code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    for (auto& s : v) cout << s << "\\n";
    return 0;
}`,
          hint: "vector<string> 도 sort 그대로 통함. 출력은 한 줄에 한 개씩 (\\n).",
          expectedOutput: `apple
banana
cherry
date`,
          stdin: `4
banana apple cherry date`,
        }
      ]
    },

    // ============================================
    // Chapter 1: 람다로 커스텀 정렬
    // ============================================
    {
      id: "s23-ch1",
      title: "람다로 커스텀 정렬",
      emoji: "🔧",
      steps: [
        {
          id: "s23-ch1-why",
          type: "explain",
          title: "🤔 \`greater<int>()\` 로 안 되는 상황이 와요",
          content: `직전 페이지에서 \`greater<int>()\` 로 내림차순 정렬을 했죠. 이건 **단순 숫자/문자열** 일 때 편해요. 그런데 — 학생 점수표 같은 거라면?

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Kim", 85}, {"Lee", 92}, {"Park", 78}
};
\`\`\`

이걸 **점수 (second) 기준 내림차순** 으로 정렬하고 싶어요.

\`sort(students.begin(), students.end())\` 만 쓰면? pair 의 자동 비교 규칙대로 \`first\` (이름) 기준 정렬돼요. 우린 점수로 정렬하고 싶은데 말이죠.

\`greater<pair<string,int>>()\` 를 쓰면? \`pair\` 전체 (이름 + 점수) 가 비교돼요. 역시 우리가 원하는 게 아님.

### 그리고 \`struct\` 라면 더 막막해요

챕터 0 마지막에서 "struct 는 자동 비교가 없다" 고 짚었었죠. 같은 데이터를 struct 로 만들면:

\`\`\`cpp
struct Student { string name; int score; };
vector<Student> v = {{"Kim", 85}, {"Lee", 92}, {"Park", 78}};

sort(v.begin(), v.end());  // ❌ 컴파일 에러! Student 끼리 어떻게 비교?
\`\`\`

> 🎯 두 경우 모두 우리한테 필요한 건: **"비교 기준을 직접 알려주는" 방법.**
> "이 두 학생 중에 누가 앞에 와야 하는지, 내가 직접 정할게요" 라고 sort 한테 말할 수 있어야 해요.

이럴 때 등장하는 게 **람다 (lambda)** — pair 의 second 기준 정렬도, struct 의 score 기준 정렬도, 같은 한 가지 도구로 해결해요. 다음 페이지에서 문법부터 봐요 👇`
        },
        {
          id: "s23-ch1-syntax",
          type: "explain",
          title: "🔧 람다(lambda) 문법 — 4 부분으로 분해",
          content: `람다는 이름 없이 그 자리에서 바로 쓰는 **일회용 함수**예요. 처음 보면 외계어 같지만 **4 부분으로 쪼개면** 단순해요.

\`\`\`cpp
[](int a, int b) { return a > b; }
↑↑   ↑              ↑
1 2   3              4
\`\`\`

| 번호 | 부분 | 이름 | 역할 |
|---|---|---|---|
| 1 | \`[]\` | **capture 목록** | 바깥 변수 가져올 때 (지금은 빈 칸) |
| 2 | \`(int a, int b)\` | **매개변수** | 일반 함수의 매개변수와 똑같음 |
| 3 | \`{ ... }\` | **본문** | 함수 본문 — 일반 함수처럼 코드 |
| 4 | \`return a > b\` | **반환값** | true/false 등 결과 |

> 💡 처음엔 \`[]\` 부분만 낯설어요. 나머지는 일반 함수랑 거의 똑같아요.

### 일반 함수와 비교해보기

\`\`\`cpp
// 일반 함수 — 이름 있음
bool compare(int a, int b) {
    return a > b;
}

// 람다 — 이름 없음, 그 자리에서 정의
[](int a, int b) { return a > b; }
//   ↑              ↑
//   매개변수 같음    본문도 같음
\`\`\`

**유일한 차이**: 일반 함수는 위쪽에 따로 선언, 람다는 **쓰는 그 자리에서** 즉석으로 만듦.

### 파이썬과 비교

\`\`\`python
# 파이썬
lambda x: x * 2

# C++
[](int x) { return x * 2; }
\`\`\`

| | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 시작 표시 | \`lambda\` 키워드 | \`[]\` 대괄호 |
| 매개변수 타입 | 없음 (동적) | 있음 (\`int\`, \`auto\` 등) |
| 본문 표시 | \`:\` 콜론 뒤 식 | \`{}\` 중괄호 + \`return\` |

### 다음 페이지 — sort 의 람다는 인자가 **2 개** 라는 핵심 규칙 👇`
        },
        {
          id: "s23-ch1-sort-lambda",
          type: "explain",
          title: "🔧 sort 의 람다 — **두 값을 비교** 하는 게 핵심",
          content: `파이썬 sort 의 \`key=\` 는 값 **하나** 를 변환했죠. **C++ sort 의 람다는 두 값을 직접 비교** 해요.

\`\`\`cpp
[](int a, int b) { return a > b; }
       ↑     ↑              ↑
   비교할 두 값      이 조건이 true 면 **a 가 앞으로**
\`\`\`

### 한 가지 규칙만 외우자

> 🎯 **return true → a 가 앞으로 / return false → b 가 앞으로**

이 한 줄이면 모든 비교 람다가 풀려요.

**예시 — 내림차순 (큰 게 앞):**
\`\`\`
a=9, b=5 → 9 > 5 = true   → 9 가 앞으로 ✅
a=2, b=8 → 2 > 8 = false  → 8 이 앞으로 ✅
결과: 큰 수가 앞 → 내림차순!
\`\`\`

### 실제로 sort 에 넣으면

\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});
// v = {9, 8, 5, 2, 1}  (내림차순)
\`\`\``
        },
        {
          id: "s23-ch1-cheatsheet",
          type: "explain",
          title: "📋 자주 보는 람다 형태들 — 치트시트",
          content: `정렬 람다는 결국 몇 가지 패턴의 변주예요. 외워두면 평생 써먹어요:

| 람다 | 정렬 결과 |
|---|---|
| \`[](int a, int b){ return a < b; }\` | 오름차순 (sort 기본값) |
| \`[](int a, int b){ return a > b; }\` | 내림차순 |
| \`[](int a, int b){ return abs(a) < abs(b); }\` | 절댓값 오름차순 |
| \`[](auto a, auto b){ return a.second < b.second; }\` | pair 의 second 기준 |
| \`[](auto a, auto b){ return a.score > b.score; }\` | struct 의 \`score\` 멤버 내림차순 |

### 💡 \`auto\` 매개변수 — pair/struct 정렬에 편함

\`pair<string, int>\`, \`tuple<...>\`, \`struct Student\` 처럼 타입이 길어지면 매개변수에 \`auto\` 를 쓰면 편해요. 컴파일러가 알아서 추론:

\`\`\`cpp
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second < b.second;   // 타입 안 적어도 OK
});
\`\`\`

> 💡 **struct 도 똑같아요** — \`a.score\`, \`b.score\` 처럼 멤버 이름으로 비교. 자동 비교가 안 되는 struct 가 lambda 한 번이면 깔끔하게 정렬돼요.

> 다음 페이지에서 위 규칙을 손으로 연습해 봐요.`
        },
        {
          id: "s23-ch1-rule-pred",
          type: "predict" as const,
          title: "람다 return 규칙 빠른 적용",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a < b;
    });
    cout << v[0] << " " << v[4];
    return 0;
}`,
          options: ["1 5", "5 1", "3 5", "1 1"],
          answer: 0,
          explanation: "return a < b → a 가 작을 때 a 가 앞 → **오름차순**. 정렬 결과: {1, 1, 3, 4, 5}. v[0] = 1, v[4] = 5 → '1 5'."
        },
        {
          id: "s23-ch1-fb1",
          type: "fillblank" as const,
          title: "람다 내림차순 빈칸 채우기",
          content: "람다를 사용해서 내림차순 정렬 코드를 완성해요!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a ___ b;  // 큰 게 앞으로\n});",
          fillBlanks: [
            { id: 0, answer: ">", options: [">", "<", ">=", "!="] }
          ],
          explanation: "a > b가 true면 a가 앞으로 와요. 큰 수가 앞으로 오니까 내림차순이에요!"
        },
        {
          id: "s23-ch1-abs-mini",
          type: "practice" as const,
          title: "✋ 잠깐 — 절댓값 기준 정렬",
          content: `**상황**: 0 으로부터 가까운 순서로 점수 차이를 정렬하고 싶어요.

\`\`\`
입력: -3, 7, -1, 4, -5
기대 출력 (절댓값 오름차순): -1 -3 4 -5 7
\`\`\`

\`abs(x)\` 가 절댓값. lambda 안에서 \`abs(a) < abs(b)\` 로 비교하면 끝.

> 💡 lambda 의 비교식만 \`abs(a) < abs(b)\` 로 바꾸면 절댓값 정렬이에요. 입력 자체는 안 바꿔요.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>  // abs
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    // 👇 lambda 로 abs 기준 오름차순 정렬


    for (int x : v) cout << x << " ";
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    sort(v.begin(), v.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });

    for (int x : v) cout << x << " ";
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), [](int a, int b) { return abs(a) < abs(b); }); — 비교 기준만 abs 로 바꾸면 끝.",
          expectedOutput: `-1 -3 4 -5 7 `
        },
        {
          id: "s23-ch1-pair",
          type: "explain",
          title: "🔧 pair를 원하는 기준으로 정렬!",
          content: `이제 pair를 점수 기준으로 정렬해봐요!

\`\`\`cpp
vector<pair<string, int>> v = {{"Kim", 85}, {"Lee", 92}, {"Park", 78}};

// 점수(second) 내림차순 정렬
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;  // 점수 큰 게 앞으로
});
// 결과: Lee(92) → Kim(85) → Park(78)
\`\`\`

💡 \`auto\`를 쓰면 타입을 직접 안 써도 돼요!

**두 기준 정렬 (1순위: 점수 내림차순, 동점이면 이름 오름차순):**
\`\`\`cpp
sort(v.begin(), v.end(), [](auto a, auto b) {
    if (a.second != b.second)
        return a.second > b.second;  // 점수 큰 게 앞
    return a.first < b.first;        // 동점이면 이름 사전순
});
\`\`\``
        },
        {
          id: "s23-ch1-pred1",
          type: "predict" as const,
          title: "pair 정렬 결과 예측!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<pair<string,int>> v = {{"Kim",85},{"Lee",92},{"Park",78}};
    sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    cout << v[0].first;
    return 0;
}`,
          options: ["Kim", "Lee", "Park", "컴파일 에러"],
          answer: 1,
          explanation: "점수 내림차순 정렬 후 Lee(92) → Kim(85) → Park(78). v[0].first는 Lee예요!"
        },
        {
          id: "s23-ch1-fb2",
          type: "fillblank" as const,
          title: "pair 점수 기준 정렬 빈칸",
          content: "pair를 점수(second) 오름차순으로 정렬하는 람다를 완성해요!",
          code: "sort(v.begin(), v.end(), [](auto a, auto b) {\n    return a.___ < b.___;\n});",
          fillBlanks: [
            { id: 0, answer: "second", options: ["second", "first", "score", "value"] },
            { id: 1, answer: "second", options: ["second", "first", "score", "value"] }
          ],
          explanation: "pair에서 두 번째 값은 .second예요. a.second < b.second면 a가 앞 → 오름차순이에요!"
        },
        {
          id: "s23-ch1-pair-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — pair 벡터 점수 내림차순 정렬",
          content: `**문제**: N 명의 학생 (이름, 점수) 가 주어질 때, **점수 내림차순** 으로 정렬해서 한 줄에 한 명씩 \`이름 점수\` 형식으로 출력하세요.

> 💡 lambda 안에서 \`a.second > b.second\` — 점수 큰 학생이 앞으로. structured bindings (\`auto& [name, score] : v\`) 로 출력하면 깔끔. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 👇 lambda 로 점수 (.second) 내림차순 정렬

    // 👇 한 줄에 한 명씩 "이름 점수" 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    for (auto& [name, score] : v) {
        cout << name << " " << score << "\\n";
    }
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), [](auto a, auto b) { return a.second > b.second; }); — auto 매개변수로 pair 받기. 출력은 range-for + structured bindings.",
          expectedOutput: `Bob 95
Carol 88
Alice 78
Dave 60`,
          stdin: `4
Alice 78
Bob 95
Carol 88
Dave 60`,
        },
        {
          id: "s23-ch1-must-lambda",
          type: "practice" as const,
          title: "🎯 lambda 가 **진짜 필요한** 순간 — 다중 기준 정렬",
          content: `이번 문제는 lambda 없이는 진짜 답이 없어요.

**문제**: 학생 5 명의 (이름, 점수) 가 있어요.
**점수 내림차순으로 정렬, 동점이면 이름 사전순(오름차순)으로 정렬**해서 출력하세요.

\`\`\`
입력:
  Kim    88
  Lee    95
  Park   88
  Choi   72
  Han    95

기대 출력 (점수↓, 같으면 이름↑):
  Han 95
  Lee 95
  Kim 88
  Park 88
  Choi 72
\`\`\`

> 💡 \`sort()\` 만 쓰면 점수랑 이름 둘 다 오름차순으로 정렬돼요 (pair 자동 비교).
> \`greater<>()\` 만 쓰면 둘 다 내림차순.
> **"점수는 내림차순, 이름은 오름차순"** 같이 다른 방향이 섞이면 → **lambda 만이 답.**`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    // 👇 sort 의 세 번째 인자에 lambda 를 넘겨서:
    //    1순위: 점수 (second) 내림차순
    //    2순위: 점수 같으면 이름 (first) 오름차순


    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    sort(students.begin(), students.end(), [](auto a, auto b) {
        if (a.second != b.second) return a.second > b.second;  // 점수 내림차순
        return a.first < b.first;                                // 이름 오름차순
    });

    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          hint: "lambda 안에 if-else 패턴: if (a.second != b.second) return a.second > b.second; (점수 내림차순) / 점수 같으면 return a.first < b.first; (이름 오름차순)",
          expectedOutput: `Han 95
Lee 95
Kim 88
Park 88
Choi 72`
        },
        {
          id: "s23-ch1-string-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — 문자열 길이 기준 정렬 (lambda 는 string 에도 통함)",
          content: `**문제**: N 개의 문자열이 주어질 때, **길이 오름차순** 으로 정렬하세요. 길이가 같으면 사전순으로.

> 💡 lambda 는 int, pair 뿐 아니라 **string 에도 똑같이 통해요.** \`s.length()\` 또는 \`s.size()\` 로 길이 비교. 같을 때는 string 의 \`<\` 가 사전순 비교. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 👇 lambda 로 길이 오름차순 정렬, 같으면 사전순

    // 👇 한 줄에 한 단어씩 출력

    return 0;
}`,
          code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        if (a.length() != b.length()) return a.length() < b.length();
        return a < b;
    });
    for (auto& s : v) cout << s << "\\n";
    return 0;
}`,
          hint: "lambda: if (a.length() != b.length()) return a.length() < b.length(); return a < b; — 길이 다르면 길이 비교, 같으면 사전순. const string& 로 받으면 복사 안 됨.",
          expectedOutput: `hi
ok
cat
apple
banana`,
          stdin: `5
banana hi apple ok cat`,
        }
      ]
    },

    // ============================================
    // Chapter 2: 정렬된 배열에서 탐색하기
    // ============================================
    {
      id: "s23-ch2",
      title: "정렬된 배열에서 탐색하기",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch2-linear",
          type: "animation" as const,
          title: "🔎 선형 탐색 — 한 장씩 넘기기",
          component: "linearSearch",
          content: `여기까지 sort 로 정렬을 마스터했어요. 정렬해두면 좋은 또 하나의 큰 이유 — **탐색이 훨씬 빨라져요.** 그 이야기를 시작해요.

먼저 정렬돼 있지 **않은** 경우부터 봐요. 전화번호부에서 **"Kim"** 을 찾는다고 해봐요.

가장 단순한 방법: **1페이지부터 한 장씩** 넘기며 확인해요.

1페이지... 아니네. 2페이지... 아니네. 3페이지...

500페이지짜리 책이면 최악의 경우 **500번**을 봐야 해요. 배열도 똑같아요 — **100만 개면 최악 100만 번** 확인해야 해요.

버튼을 눌러서 직접 따라가 봐요!`,
        },
        {
          id: "s23-ch2-binary",
          type: "animation" as const,
          title: "⚡ 이진 탐색 — 가운데를 먼저 펼치기",
          component: "binarySearch",
          content: `전화번호부에서 "Kim"을 찾을 때, 1페이지부터 보나요?

**아니죠.** K는 알파벳 중간쯤이니까 자연스럽게 **중간을 펼쳐요.**

이게 가능한 이유가 딱 하나예요 — **전화번호부가 알파벳 순서로 정렬되어 있기 때문이에요.**
정렬이 안 되어 있으면 어디에 있을지 감이 없으니까 1페이지부터 볼 수밖에 없어요.

**이진 탐색은 이 직관을 알고리즘으로 만든 거예요:**

가운데(250p)를 펼쳤더니 "Park" → Kim은 앞쪽! **뒤 250페이지는 볼 필요 없어요.**
앞쪽 가운데(125p)를 펼쳤더니 "Lee" → Kim은 앞쪽! **또 절반을 버려요.**
이렇게 계속 절반씩 줄이면 **500페이지도 9번이면 찾아요.**

**정렬 → 이진 탐색 가능 → 훨씬 빠름!**
이게 sort를 배운 다음 이진 탐색을 배우는 이유예요.

버튼을 눌러서 직접 따라가 봐요!`,
        },
        {
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 잠깐 — 다음 페이지에서 쓸 공식 하나",
          content: `이진 탐색을 C++ 코드로 옮기기 전에, 공식 하나만 챙기고 가요.

sort 에서 \`v.begin()\`, \`v.end()\` 를 계속 써왔죠? 그건 그냥 **벡터 안의 위치를 가리키는 표시** 예요. (전 레슨 **STL 탐색 함수** 에서 \`find\`, \`count\` 와 함께 봤던 그 패턴.)

\`\`\`
   10    20    30    40    50
    ↑                          ↑
 begin()                      end() (마지막 **다음** 자리)
\`\`\`

---

### 🎯 외울 공식: \`it - v.begin()\` = 인덱스

다음 페이지의 \`lower_bound\` 는 위치(\`it\`)를 돌려줘요 — 인덱스 숫자가 아니라. 인덱스로 바꾸는 방법은 **딱 한 줄**:

\`\`\`
   10    20    30    40    50
    ↑                ↑
 begin()             it  (40 을 가리킴)

it - v.begin() = 3   → 인덱스 3!
\`\`\`

\`\`\`cpp
cout << *it;             // 40   ← *it 는 가리키는 값
cout << it - v.begin();  // 3    ← 인덱스로 변환!
\`\`\`

> 💡 깊이 이해하려 하지 말고 **공식처럼 외우세요.** \`*it\` = 값, \`it - v.begin()\` = 인덱스. 이 두 줄이면 lower_bound 끝.`
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 binary_search / lower_bound / upper_bound — 이진탐색 3 형제",
          content: `방금 본 이진 탐색을 매번 직접 짜진 않아요. C++ 이 **세 함수** 를 미리 만들어뒀어요 — 같은 가족이에요:

\`\`\`cpp
binary_search(v.begin(), v.end(), x);  // x 가 있나? → true / false
lower_bound (v.begin(), v.end(), x);   // x 가 시작되는 위치
upper_bound (v.begin(), v.end(), x);   // x 가 끝난 다음 위치
\`\`\`

⚠️ **반드시 정렬된 배열에서만!** (이진 탐색이라서)

---

**그림으로 보기 — 값 3 찾기**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (값=3)      (값=3)
"3 시작"    "3 끝 다음"
\`\`\`

- **binary_search(x)** → \`x\` 가 배열 안에 있나? **true / false**
- **lower_bound(x)** → \`x\` **이상(≥)** 의 첫 위치 = "x 가 시작되는 곳"
- **upper_bound(x)** → \`x\` **초과(>)** 의 첫 위치 = "x 가 끝난 다음"

> 💡 깊이 파지 말고 **그림 + 세 줄 설명** 만 기억해도 충분해요. 어떤 상황에 어느 걸 쓰는지는 다음 페이지에서.`
        },
        {
          id: "s23-ch2-trio-quiz",
          type: "quiz" as const,
          title: "3 형제 중 누구를 쓰지?",
          content: "정렬된 \`vector<int> v\` 가 있어요. \"숫자 7 이 배열에 있는지 **있다 / 없다** 만 알면 돼\" 라면 셋 중 어느 걸 쓰는 게 가장 깔끔할까요?",
          options: [
            "`binary_search(v.begin(), v.end(), 7)`",
            "`lower_bound(v.begin(), v.end(), 7)`",
            "`upper_bound(v.begin(), v.end(), 7)`"
          ],
          answer: 0,
          explanation: "**`binary_search`** 는 정확히 \"있나 / 없나\" 만 묻는 함수 — true / false 반환이라 가장 직관적이에요. lower_bound / upper_bound 는 **위치** 를 돌려주니까 \"있는지만\" 확인하기엔 한 단계 더 필요해요 (`lower_bound != upper_bound` 같은 식)."
        },
        {
          id: "s23-ch2-lb-missing",
          type: "explain",
          title: "🔍 없는 값을 찾으면?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4는 없음
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2  (4 이상의 첫 값 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2  (4 초과의 첫 값 = 5)
// 없는 값이면 lower_bound == upper_bound !

// 10은 없음 (모든 값보다 큼)
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  (끝을 넘어감)
\`\`\`

**→ lower == upper 면 그 값은 배열에 없는 거예요!**`
        },
        {
          id: "s23-ch2-lb-patterns",
          type: "explain",
          title: "🎯 활용 패턴 3 가지",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};

// ① 3 이 몇 개인가?
int count = upper_bound(v.begin(), v.end(), 3)
          - lower_bound(v.begin(), v.end(), 3);
// 3 - 1 = 2 개!

// ② 값이 있는지 확인 — binary_search() 사용 (더 간단!)
if (binary_search(v.begin(), v.end(), 3)) cout << "있음";
else cout << "없음";

// ③ 값의 위치가 필요할 때 — lower_bound 사용
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();
cout << idx;  // 1
\`\`\`

> 💡 셋이 한 가족이지만 **돌려주는 게 달라서** 쓰임도 달라요. 다음 페이지에서 흔한 함정 하나 짚고 가요.`
        },
        {
          id: "s23-ch2-patterns-fb",
          type: "fillblank" as const,
          title: "✋ 직접 — 5 가 몇 개?",
          content: "정렬된 \`vector<int> v = {1, 2, 5, 5, 5, 7}\` 에서 **5 가 몇 개** 있는지 한 줄로 구해봐요. (upper-lower 패턴)",
          code: "vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = ___(v.begin(), v.end(), 5)\n        - ___(v.begin(), v.end(), 5);\ncout << cnt;  // 3",
          fillBlanks: [
            { id: 0, answer: "upper_bound", options: ["upper_bound", "lower_bound", "binary_search", "count"] },
            { id: 1, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "count"] }
          ],
          explanation: "**\"끝 다음 - 시작\" = 개수.** upper_bound 가 끝 다음을 가리키고 lower_bound 가 시작을 가리켜요. 둘을 빼면 그 값의 개수. 5 는 인덱스 2,3,4 에 3 개 있으니 결과 3."
        },
        {
          id: "s23-ch2-lb-vs-count",
          type: "explain",
          title: "🤔 잠깐 — 개수 세기는 \`count()\` 도 있지 않아?",
          content: `맞아요. **STL 탐색 함수** 레슨에서 배운 \`count()\` 도 개수를 세요:

\`\`\`cpp
int cnt = count(v.begin(), v.end(), 3);   // 정렬 안 되어 있어도 OK
\`\`\`

**그럼 둘이 뭐가 달라요?**

| | \`count()\` | \`upper - lower\` |
|---|---|---|
| 정렬 필요? | ❌ 아니요 | ✅ 정렬돼 있어야 함 |
| 속도 | **O(n)** — 처음부터 끝까지 훑음 | **O(log n)** — 이진 탐색 |
| 100 만 개 중 세기 | 100 만 번 비교 | 약 20 번 비교 |

**함정:** "그럼 sort 한 번 하고 upper-lower 쓰면 되겠네!" → ❌. sort 자체가 O(n log n) 이라 **한 번만** 셀 거면 그냥 \`count()\` 가 더 빠름.

✅ **upper-lower 가 빛나는 순간:**
- 데이터가 **이미** 정렬돼 있을 때
- 같은 데이터에서 **여러 번** 세야 할 때 (한 번 sort → 매 질의마다 O(log n))

알고리즘 대회에선 자주 쓰는 패턴, 일반 코딩에선 \`count()\` 가 더 흔해요.`
        },
        {
          id: "s23-ch2-lb-vs-bs",
          type: "explain",
          title: "🆚 binary_search() vs lower_bound — 언제 뭘 써?",
          content: `| | binary_search() | lower_bound() |
|---|---|---|
| 반환값 | true / false | 위치(반복자) |
| 용도 | 있는지만 확인 | 위치·개수 필요할 때 |
| 코드 | 짧고 직관적 | 조금 길지만 강력 |

\`\`\`cpp
// 단순히 "5가 있나?" → binary_search
binary_search(v.begin(), v.end(), 5)  // true

// "5가 몇 번째야?" → lower_bound
lower_bound(v.begin(), v.end(), 5) - v.begin()  // 3
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x in v\` | \`binary_search(v.begin(), v.end(), x)\` |
| \`bisect.bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect.bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |`
        },
        {
          id: "s23-ch2-quiz1",
          type: "quiz",
          title: "이진탐색의 전제 조건!",
          content: "정렬되지 않은 벡터 \`v = {3, 1, 4, 1, 5}\` 에 대해 \`binary_search(v.begin(), v.end(), 4)\` 를 호출하면?",
          options: [
            "true 반환 (4 가 있으니까)",
            "false 반환 (정렬 안 된 걸 자동 감지해서)",
            "**예측 불가** — 이진탐색은 정렬된 배열에서만 동작 보장. 결과는 컴파일러/구현마다 다름",
            "컴파일 에러"
          ],
          answer: 2,
          explanation: "**`binary_search`, `lower_bound`, `upper_bound` 는 모두 정렬된 배열에서만 정확히 동작해요.** 정렬 안 된 배열에서 호출하면 컴파일은 되지만 결과는 **undefined behavior** — true / false / 엉뚱한 인덱스 등 어떤 결과든 나올 수 있음. 그래서 사용 전 반드시 `sort()` 먼저!"
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "⚠️ 주의 — 모든 값보다 큰 값을 찾으면?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

lower_bound(v.begin(), v.end(), 10) - v.begin();
// → 5 (범위 **밖**, v[5] 는 존재 안 함!)
\`\`\`

찾는 값보다 큰 게 배열에 없으면 lower_bound 는 **\`v.end()\` 위치 (= 인덱스 \`v.size()\`)** 를 돌려줘요. 여길 그냥 \`v[5]\` 로 접근하면 잘못된 메모리 읽기 → 프로그램 폭발.

---

**안전하게 쓰는 패턴**

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

if (it != v.end() && *it == x) {
    int idx = it - v.begin();
    cout << idx;       // 진짜로 x 가 있을 때만
}
\`\`\`

> 💡 \`it != v.end()\` 로 **범위 안인지 확인** + \`*it == x\` 로 **정확히 그 값인지 확인**. 두 조건 모두 OK 일 때만 접근.`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "lower_bound 빈칸 채우기",
          content: "정렬된 벡터에서 4 이상의 첫 번째 인덱스를 구해봐요!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound는 찾는 값 이상의 첫 위치를 반복자로 반환해요. - v.begin()으로 인덱스로 변환해요. 4는 인덱스 2에 처음 등장하므로 결과는 2!"
        },
        {
          id: "s23-ch2-practice1",
          type: "practice" as const,
          title: "✋ 처음부터 — binary_search 로 존재 확인",
          content: `**문제**: **이미 정렬된** N 개의 정수가 주어지고, 그 다음 줄에 찾을 값 \`x\` 가 주어져요. \`x\` 가 배열에 있으면 \`Yes\`, 없으면 \`No\` 출력.

\`\`\`
입력: 5
      1 3 5 7 9
      5
출력: Yes

입력: 5
      1 3 5 7 9
      4
출력: No
\`\`\`

> 💡 \`binary_search(v.begin(), v.end(), x)\` 는 **true / false** 반환. "있는지만" 알면 될 때 가장 간단한 함수.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 binary_search 로 x 존재 여부 확인 → "Yes" 또는 "No" 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    if (binary_search(v.begin(), v.end(), x)) cout << "Yes";
    else cout << "No";
    return 0;
}`,
          hint: "if (binary_search(v.begin(), v.end(), x)) cout << \"Yes\"; else cout << \"No\"; — 존재 여부만 필요할 땐 binary_search 가 가장 간단.",
          expectedOutput: `Yes`,
          stdin: `5
1 3 5 7 9
5`,
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "lower_bound & upper_bound 출력 예측!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {2, 4, 4, 6, 8};
    auto lo = lower_bound(v.begin(), v.end(), 4);
    auto hi = upper_bound(v.begin(), v.end(), 4);
    cout << (lo - v.begin()) << " " << (hi - lo);
    return 0;
}`,
          options: ["1 2", "2 2", "1 1", "2 1"],
          answer: 0,
          explanation: "lower_bound(4) → index 1 (첫 번째 4). upper_bound(4) → index 3 (6의 위치). hi - lo = 3 - 1 = 2 (4가 2개). 출력: 1 2"
        },
        {
          id: "s23-ch2-practice2",
          type: "practice" as const,
          title: "✋ 처음부터 — X 가 몇 개인지 (upper - lower 패턴)",
          content: `**문제**: **이미 정렬된** N 개의 정수가 주어지고, 그 다음 줄에 찾을 값 \`x\` 가 주어져요. \`x\` 가 배열에 **몇 개** 등장하는지 출력하세요.

\`\`\`
입력: 6
      1 3 3 3 5 7
      3
출력: 3

입력: 5
      1 2 4 6 8
      4
출력: 1

입력: 5
      1 3 5 7 9
      4
출력: 0
\`\`\`

> 💡 \`upper_bound(...) - lower_bound(...)\` — chapter 의 핵심 응용 패턴. 두 반복자의 차이가 곧 개수.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 upper_bound - lower_bound 로 x 의 개수 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    auto lo = lower_bound(v.begin(), v.end(), x);
    auto hi = upper_bound(v.begin(), v.end(), x);
    cout << (hi - lo);
    return 0;
}`,
          hint: "auto lo = lower_bound(v.begin(), v.end(), x); auto hi = upper_bound(v.begin(), v.end(), x); cout << (hi - lo); — 두 반복자의 차이가 개수. 없으면 hi == lo → 0.",
          expectedOutput: `3`,
          stdin: `6
1 3 3 3 5 7
3`,
        }
      ]
    },

    // ============================================
    // Chapter 3: 심화 패턴
    // ============================================
    {
      id: "s23-ch3",
      title: "심화 패턴",
      emoji: "🧹",
      steps: [
        {
          id: "s23-ch3-unique",
          type: "explain",
          title: "🧹 sort + unique — 중복 제거 패턴!",
          content: `정렬과 탐색을 봤어요. 마지막으로 sort 와 짝꿍처럼 자주 쓰는 패턴 하나 — 배열에서 **중복된 값을 제거**하는 C++ 의 표준 패턴이에요.

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// 1단계: 정렬 (unique는 인접 중복만 제거!)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// 2단계: unique + erase로 중복 제거
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

⚠️ **sort 먼저!** unique는 인접한 중복만 제거해요.
정렬하지 않으면 {1, 3, 1}에서 3개 그대로예요.

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase(unique(...))\` |

💡 **sort → erase(unique(...), end())** 패턴을 세트로 외워두세요! 다음 페이지에서 **왜 erase 까지 필요한지** 한 번 짚고 가요.`
        },
        {
          id: "s23-ch3-unique-detail",
          type: "explain",
          title: "🤔 잠깐 — 왜 \`erase\` 까지 필요해? \`unique\` 만 쓰면?",
          content: `\`unique\` 의 **진짜** 동작을 알면 왜 \`erase\` 가 짝꿍인지 자연스럽게 이해돼요.

### unique 의 진짜 동작

\`unique\` 는 사실 **벡터 크기를 줄이지 않아요.** 앞쪽으로 중복 없는 값들을 모으고, "여기까지가 진짜 끝" 이라는 위치 (iterator) 만 돌려줘요.

\`\`\`
v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}   sort 직후 (size = 10)

↓ auto it = unique(v.begin(), v.end());  ← erase 안 함

v = {1, 2, 3, 4, 5, 6, 9, ?, ?, ?}   size 는 여전히 10!
                          ↑
                          it 가 가리키는 위치
                          여기부터 뒤는 쓰레기 값 (의미 없음)
\`\`\`

\`v.size()\` 를 출력해보면 여전히 10. 앞 7 개만 진짜고 나머지 3 개는 메모리에 남은 **흔적**.

---

### erase 문법 빠른 리마인더

벡터에서 **구간 잘라내기** 는 \`erase(시작, 끝)\` 형태예요. 두 iterator 사이를 통째로 들어내는 거.

\`\`\`cpp
vector<int> v = {10, 20, 30, 40, 50};

v.erase(v.begin() + 1, v.begin() + 4);
//     ↑                ↑
//   여기부터        여기 직전까지 (4 는 미포함)

// 결과: v = {10, 50}   (20, 30, 40 제거)
\`\`\`

| 형태 | 의미 |
|---|---|
| \`v.erase(it)\` | iterator \`it\` 가 가리키는 **한 개** 제거 |
| \`v.erase(시작, 끝)\` | \`[시작, 끝)\` **구간 통째로** 제거 |

---

### 그래서 erase + unique 합치면

\`\`\`cpp
v.erase( unique(v.begin(), v.end()),  v.end() );
//        ↑                            ↑
//   "진짜 끝" 위치 (it)           벡터의 진짜 끝
//          ───────  이 사이의 쓰레기를 잘라냄  ───────
\`\`\`

unique 가 알려준 **진짜 끝** 부터 \`v.end()\` 까지 erase — 이게 그 유명한 패턴.

> 💡 외울 거: \`unique\` 는 **모으기만** 함, 크기는 그대로. 진짜 줄이려면 \`erase\` 한 세트.`
        },
        {
          id: "s23-ch3-unique-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — 중복 제거 후 개수 출력",
          content: `**문제**: N 개의 정수가 주어질 때, **중복 제거 후 서로 다른 정수의 개수** 를 출력하세요.

\`\`\`
입력: 8
      3 1 4 1 5 9 2 6
출력: 7

입력: 5
      2 2 2 2 2
출력: 1
\`\`\`

> 💡 \`sort\` → \`erase(unique(...), end())\` 패턴 후 \`v.size()\` 출력. 한 줄로 끝.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 👇 sort + unique + erase 후 v.size() 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}`,
          hint: "sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end()); cout << v.size(); — sort 먼저 (unique 는 인접 중복만 제거).",
          expectedOutput: `7`,
          stdin: `8
3 1 4 1 5 9 2 6`,
        },
        {
          id: "s23-ch3-stable",
          type: "explain",
          title: "📊 stable_sort — 동점 시 원래 순서 보존",
          content: `\`sort()\` 는 **빠른** 정렬이지만 한 가지 단점 있어요: **같은 값일 때 원래 순서가 보장 안 돼요.** 학생 데이터에선 이게 문제될 수 있어요.

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Alice", 90}, {"Bob", 80}, {"Carol", 90}, {"Dave", 80}
};

sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;   // 점수 내림차순
});
\`\`\`

여기서 Alice (90), Carol (90) 의 순서가 **입력 순서대로 (Alice 먼저)** 보장될까? **sort 는 보장 안 함.** 컴파일러/구현마다 다르게 나올 수 있어요.

### \`stable_sort\` — 같은 값이면 원래 순서 유지

\`\`\`cpp
stable_sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;
});
// → 동점 시 항상 입력 순서 유지 (Alice → Carol, Bob → Dave)
\`\`\`

| | sort | stable_sort |
|---|---|---|
| 속도 | 더 빠름 (O(N log N)) | 약간 느림 (O(N log² N)) |
| 동점 시 | 순서 보장 X | 입력 순서 유지 ✅ |
| 언제 | 동점 신경 안 쓸 때 | 동점 순서가 의미 있을 때 |

> 💡 **순위표 / 안정성 필요한 데이터** 는 stable_sort. 일반 정렬은 sort. 99% 는 sort 면 충분.`
        },
        {
          id: "s23-ch3-stable-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — stable_sort 직접 써보기",
          content: `**문제**: 학생 4 명 (이름, 점수). 점수 내림차순 정렬, **동점이면 입력 순서 유지**.

> 💡 \`stable_sort\` + lambda 로 점수 내림차순. 동점은 자동으로 입력 순서 유지됨. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 👇 stable_sort 로 점수 내림차순 (동점은 입력 순서)

    // 👇 한 줄에 한 명씩 "이름 점수" 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    stable_sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    for (auto& [name, score] : v) {
        cout << name << " " << score << "\\n";
    }
    return 0;
}`,
          hint: "stable_sort(v.begin(), v.end(), [](auto a, auto b) { return a.second > b.second; }); — sort 자리에 stable_sort 만 바꾸면 됨.",
          expectedOutput: `Alice 90
Carol 90
Bob 80
Dave 80`,
          stdin: `4
Alice 90
Bob 80
Carol 90
Dave 80`,
        },
      ]
    },

    // ============================================
    // Chapter 4: 람다와 STL 일반 알고리즘
    //   sort 에서 익힌 람다를 다른 algorithm 함수에도 적용.
    //   count_if / find_if / accumulate — STL 의 단골들.
    // ============================================
    {
      id: "s23-ch4",
      title: "람다 + STL 일반 알고리즘",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch4-intro",
          type: "explain",
          title: "🤔 sort 의 람다, 다른 데서도 통할까?",
          content: `\`sort\` 에 람다 비교 함수 넣었던 거 기억나죠?

\`\`\`cpp
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
\`\`\`

이 패턴 — \`(begin, end, 람다)\` — 사실 \`<algorithm>\` 의 거의 모든 함수에 통해요. 정렬 외에도:

- "**조건을 만족하는 원소가 몇 개?**" → \`count_if\`
- "**조건을 만족하는 첫 원소는?**" → \`find_if\`
- "**모든 원소를 다 더하면?**" → \`accumulate\` (\`<numeric>\`)

> 💡 **왜 알아둘 가치가 있나요?**
> for 루프로 직접 짜도 되긴 하는데, 위 함수들은 **의도가 한 줄에 드러남**. \`count_if(..., 조건)\` 보면 "아, 조건 맞는 거 세는구나" 가 즉시 보임. 코드 리뷰/대회에서 가독성 큼.`
        },
        {
          id: "s23-ch4-count-if",
          type: "explain",
          title: "🔢 count_if — 조건 맞는 원소 개수",
          content: `**문제:** 점수 벡터에서 80 점 이상이 몇 명?

### 옛날 방식 (for 루프)
\`\`\`cpp
int cnt = 0;
for (int x : scores) {
    if (x >= 80) cnt++;
}
\`\`\`

### \`count_if\` 한 줄
\`\`\`cpp
int cnt = count_if(scores.begin(), scores.end(),
                   [](int x){ return x >= 80; });
\`\`\`

### 인자 구조 (sort 와 똑같음)
| 자리 | 의미 |
|---|---|
| 1 번째 | 시작 iterator (\`v.begin()\`) |
| 2 번째 | 끝 iterator (\`v.end()\`) |
| 3 번째 | **bool 리턴 람다** — true 면 카운트 |

> 💡 **\`count\` 와 차이?**
> - \`count(b, e, x)\` — **값 x 와 같은 것** 만 셈
> - \`count_if(b, e, pred)\` — **조건 (람다)** 을 만족하는 것 셈 (훨씬 유연)`
        },
        {
          id: "s23-ch4-count-if-predict",
          type: "predict" as const,
          title: "출력 예측",
          content: `\`\`\`cpp
vector<int> v = {10, 25, 30, 45, 50, 65};
int cnt = count_if(v.begin(), v.end(),
                   [](int x){ return x % 5 == 0 && x > 30; });
cout << cnt;
\`\`\`

cnt 값은?`,
          options: ["4", "3", "2", "5"],
          answer: 1,
          explanation: "5 의 배수이면서 30 보다 큰 것: 45, 50, 65 → 3 개. (10, 25, 30 은 30 초과 조건 X.)"
        },
        {
          id: "s23-ch4-find-if",
          type: "explain",
          title: "🎯 find_if — 조건 맞는 첫 원소",
          content: `**문제:** 벡터에서 첫 번째 짝수 찾기.

\`\`\`cpp
vector<int> v = {3, 7, 4, 9, 6};
auto it = find_if(v.begin(), v.end(),
                  [](int x){ return x % 2 == 0; });

if (it != v.end()) {
    cout << *it;        // 4
} else {
    cout << "없음";
}
\`\`\`

### 핵심 패턴
- \`find_if\` 는 **iterator** 를 돌려줘요 (값 X)
- 못 찾으면 \`v.end()\` 반환 → \`!= v.end()\` 로 체크
- 값을 쓰려면 \`*it\` (역참조)
- 인덱스가 필요하면 \`it - v.begin()\`

> 💡 **\`find\` 와 차이?**
> - \`find(b, e, x)\` — **값 x 자체** 찾기
> - \`find_if(b, e, pred)\` — **조건 (람다)** 만족 첫 원소 찾기`
        },
        {
          id: "s23-ch4-accumulate",
          type: "explain",
          title: "➕ accumulate — 다 더하기 (또는 다 곱하기)",
          content: `**문제:** 점수 합계, 평균 구하기.

\`\`\`cpp
#include <numeric>     // ⚠️ <algorithm> 아니라 <numeric>!

vector<int> v = {10, 20, 30, 40};

int sum = accumulate(v.begin(), v.end(), 0);
//                                       ↑ 시작값 (sum 의 초깃값 0)
cout << sum;     // 100
\`\`\`

### 시작값을 잘 설정하면 응용 가능
\`\`\`cpp
// 합계: 시작 0
accumulate(v.begin(), v.end(), 0);          // 100

// 곱: 시작 1, 4 번째 인자에 곱셈 함수
#include <functional>
accumulate(v.begin(), v.end(), 1, multiplies<int>());   // 10*20*30*40 = 240000

// 람다로 커스텀: 제곱의 합
accumulate(v.begin(), v.end(), 0,
           [](int acc, int x){ return acc + x * x; });   // 100+400+900+1600 = 3000
\`\`\`

### 평균 한 줄
\`\`\`cpp
double avg = (double)accumulate(v.begin(), v.end(), 0) / v.size();
\`\`\`

> ⚠️ **\`<numeric>\` 헤더** 따로 \`#include\` 필요. 자주 까먹어서 컴파일 에러 일 위!`
        },
        {
          id: "s23-ch4-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — 80 점 이상 학생 수 + 합계",
          content: `**문제:** 학생 5 명 점수를 입력받아:
1. 80 점 이상인 학생 수
2. 전체 합계

를 한 줄에 공백으로 구분해 출력.

> 💡 \`count_if\` 로 1 번, \`accumulate\` 로 2 번. 둘 다 한 줄로 해결 가능.
> ⚠️ \`accumulate\` 는 \`<numeric>\` 필요!`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    // 👇 80 점 이상 개수, 합계 구해서 한 줄에 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    int high = count_if(scores.begin(), scores.end(),
                        [](int x){ return x >= 80; });
    int total = accumulate(scores.begin(), scores.end(), 0);
    cout << high << " " << total << endl;
    return 0;
}`,
          hint: "count_if(scores.begin(), scores.end(), [](int x){ return x >= 80; }); + accumulate(scores.begin(), scores.end(), 0); — 두 줄로 끝.",
          expectedOutput: `3 380`,
          stdin: `90 65 80 75 70`,
        },
        {
          id: "s23-ch4-summary",
          type: "explain",
          title: "🎉 레슨 23 완료! sort + STL 알고리즘 마스터!",
          content: `## 🏆 레슨 23 완료! 대단해요!

### 📊 sort 기초
- **sort(v.begin(), v.end())** → 오름차순 (기본)
- **sort(v.begin(), v.end(), greater<int>())** → 내림차순
- \`#include <algorithm>\` 필요!

### 🔧 람다 (lambda)
- **문법:** \`[](타입 a, 타입 b) { return a > b; }\`
- **규칙:** true 리턴 → 첫 번째 인자(a)가 앞으로
- pair, struct 등 커스텀 기준 정렬에 필수!
- \`greater<int>()\`는 내림차순 람다를 미리 만든 것

### 🔍 lower_bound & upper_bound
- **반드시 정렬된 배열에서만 사용!** (이진 탐색 원리)
- **lower_bound(begin, end, x)**: x **이상**의 첫 번째 위치
- **upper_bound(begin, end, x)**: x **초과**의 첫 번째 위치
- 인덱스로 변환: \`- v.begin()\`

### 🧹 심화 패턴
- **sort + erase(unique(...), end())**: 중복 제거 (세트로 외울 것!)
- **stable_sort**: 동점 원래 순서 유지

### 🔍 람다 + STL 일반 알고리즘 ⭐ 신규
- **count_if(b, e, pred)** — 조건 맞는 원소 개수
- **find_if(b, e, pred)** — 조건 맞는 첫 원소 (iterator)
- **accumulate(b, e, init)** — 합계/곱/커스텀 누적 (\`<numeric>\` 필요)
- 패턴이 sort 와 똑같음: \`(begin, end, 람다)\`

### 🐍 파이썬과의 핵심 차이!
| 기능 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 람다 문법 | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| 정렬 기준 | \`key=\` (값 1개 변환) | 비교 함수 (두 값 직접 비교) |
| 이진 탐색 | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| 중복 제거 | \`sorted(set(v))\` | \`sort + erase(unique)\` |
| 조건 카운트 | \`sum(1 for x in v if x>=80)\` | \`count_if(b, e, pred)\` |
| 합계 | \`sum(v)\` | \`accumulate(b, e, 0)\` |

🚀 다음은 **map & set** — 자동으로 정렬되는 마법의 컨테이너!
   그 다음 바로 **🏆 USACO 모의전 (cpp-p3)** — 이제 진짜 실전!`
        }
      ]
    }
  ]
}
