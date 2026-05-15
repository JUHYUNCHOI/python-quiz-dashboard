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

> 🎯 **USACO 에서 이렇게 써요:**
> 거의 **매 문제** 에 등장. 학생 점수 정렬, 좌표 정렬, 가격 정렬, 이름 알파벳 순 등. "데이터 받으면 일단 sort 해두고 시작" 패턴이 USACO Bronze 의 가장 흔한 첫 줄.

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

💡 세 번째 인자 없으면 기본이 오름차순이에요!

> 🎯 **USACO 에서 언제 내림차순이 필요해?**
> • "상위 3 등 학생" 출력 → 점수 내림차순 후 앞 3 개
> • "비싼 상품부터" 나열 → 가격 내림차순
> • "가장 큰 수부터 적용" 같은 그리디 문제 — 정렬 방향이 답을 결정`
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

\`struct\` 는 \`pair\` 와 달리 자동 비교 연산자가 없어요. 같은 데이터를 struct 로 만들면:

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

| 람다 | 정렬 결과 | USACO 상황 |
|---|---|---|
| \`[](int a, int b){ return a < b; }\` | 오름차순 (기본) | 점수, 좌표, 가격 정렬의 기본 |
| \`[](int a, int b){ return a > b; }\` | 내림차순 | "1 등부터 출력" / "상위 K 명" |
| \`[](int a, int b){ return abs(a) < abs(b); }\` | 절댓값 오름차순 | "원점에서 가까운 순" / "변화량 작은 순" |
| \`[](auto a, auto b){ return a.second < b.second; }\` | pair 의 second 기준 | (이름, 점수) → 점수순 / (시각, ID) → 시각순 |
| \`[](auto a, auto b){ return a.score > b.score; }\` | struct 의 \`score\` 멤버 내림차순 | 캐릭터 (이름, HP, 점수) 를 점수 내림차순 |

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
\`\`\`

> 🎯 **USACO 에서 이렇게 써요:**
> • **좌표 정렬** — \`pair<int, int>\` 가 (x, y) 점들. y 좌표 기준 정렬, 동점이면 x 기준.
> • **이벤트 정렬** — (시작 시각, 이벤트 ID) 쌍. 시각 순서대로 처리.
> • **순위표** — (이름, 점수) 쌍. 점수 내림차순, 동점이면 이름 알파벳 순.
> • **거리 + 인덱스** — (거리, 원래 인덱스) 쌍. 거리 정렬 후 원래 인덱스 복원.
> "두 값을 묶어서 정렬" 이 필요한 거의 모든 Bronze 문제에서 등장.`
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
    // Chapter 2: 마무리 — 정렬 기본 끝!
    // ============================================
    {
      id: "s23-wrap",
      title: "마무리",
      emoji: "🎉",
      steps: [
        {
          id: "s23-wrap-done",
          type: "explain",
          title: "🎉 정렬 기본 끝! 다음은?",
          content: `여기까지 **sort 기본** 마스터:

- **sort(v.begin(), v.end())** — 한 줄로 정렬
- 람다로 **커스텀 기준** 정렬 (내림차순, 절댓값, 다중 기준)
- **pair 정렬** — 두 값을 묶어서 한 기준 또는 두 기준으로

이만큼이면 USACO Bronze 문제의 "정렬" 부분은 거의 다 풀려요.

---

### 🎯 다음 레슨 — 정렬된 데이터에서 빠른 검색 (cpp-25)

정렬 한 번 했더니 갑자기 가능해지는 일들. "x 가 있나?", "x 이상 첫 거는?", "x 가 몇 개?" 같은 검색 질문을 **O(log n)** 으로 한 줄에 풀어요. 도구는 **binary_search**, **lower_bound**, **upper_bound** 셋.

### 📌 그 다음 (선택, 심화) — sort 응용 패턴 (cpp-26)

중복 제거 (sort + unique + erase), 동점 순서 보존 (stable_sort), 람다 + STL 일반 알고리즘 (count_if, find_if, accumulate). **Bronze 합격에 필수 아님** — 시간 여유 있을 때 봐도 OK.

---

💡 한 lesson 에 너무 많이 담지 않으려고 옛 "sort 마스터" 를 셋으로 나눴어요. 사실은 **같은 흐름** — "정렬한다 → 정렬된 걸로 빠르게 검색한다 → 정렬 응용한다." 차근차근 가도 충분해요.`
        }
      ]
    }

  ]
}
