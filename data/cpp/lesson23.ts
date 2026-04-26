// ============================================
// C++ Lesson 23: sort 마스터
// sort 기초 → 람다 → 이진탐색(lower_bound) → 심화
// ============================================
import { LessonData } from '../types'

export const cppLesson23Data: LessonData = {
  id: "cpp-23",
  title: "sort 마스터",
  emoji: "📊",
  description: "sort 기초 + 람다 + lower_bound — 정렬 완전정복!",
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
          id: "s23-ch0-intro",
          type: "explain",
          title: "📊 sort() — 한 줄로 정렬",
          content: `직전 레슨에서 pair 의 자동 비교 덕분에 "**\`sort\` 한 줄로 점수표가 정렬된다**" 는 걸 봤죠. 이번 레슨은 그 \`sort\` 가 주인공이에요.

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
          id: "s23-ch0-q1",
          type: "quiz",
          title: "sort 헤더!",
          content: "sort()를 사용하려면 어떤 헤더를 include해야 하나요?",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요! <vector>는 vector용, <utility>는 pair용이에요."
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

> 🎯 우리한테 필요한 건: **"비교 기준을 직접 알려주는" 방법.**
> "이 두 학생 중에 누가 앞에 와야 하는지, 내가 직접 정할게요" 라고 sort 한테 말할 수 있어야 해요.

이럴 때 등장하는 게 **람다 (lambda)**. 다음 페이지에서 문법부터 봐요 👇`
        },
        {
          id: "s23-ch1-syntax",
          type: "explain",
          title: "🔧 람다(lambda) 문법",
          content: `람다는 이름 없이 그 자리에서 바로 쓰는 **일회용 함수**예요.

**파이썬 람다는 이미 알죠?**
\`\`\`python
# 파이썬: 콜론(:) 뒤에 바로 반환값
lambda x: x * 2

# sort에서: key= 뒤에 써요
sorted(v, key=lambda x: -x)  # 내림차순
\`\`\`

**C++ 람다는 모양이 조금 달라요:**
\`\`\`
파이썬:  lambda x      : x * 2
C++:     [](int x)     { return x * 2; }
           ↑               ↑
       항상 []로 시작    중괄호 안에 return
\`\`\`

---

**sort에서 람다는 특별해요 — 인자가 2개예요!**

파이썬 sort의 \`key=\`는 값 하나를 변환하지만,
C++ sort의 람다는 **두 값을 직접 비교**해요.

\`\`\`cpp
[](int a, int b) { return a > b; }
       ↑     ↑              ↑
   비교할 두 값       이 조건이 true면 a가 앞으로!
\`\`\`

**규칙 예시:**
\`\`\`
a=9, b=5 → 9 > 5 = true  → 9가 앞으로 ✅
a=2, b=8 → 2 > 8 = false → 8이 앞으로 ✅
결과: 큰 수가 앞 → 내림차순!
\`\`\`

**실제로 적용하면:**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // a가 크면 a가 앞으로
});
// v = {9, 8, 5, 2, 1}  (내림차순)
\`\`\`

| | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 람다 모양 | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| sort에서 | 값 1개 변환 (\`key=\`) | 두 값 비교 (a, b) |

💡 \`[]\`는 지금은 그냥 "람다 시작 표시"로 외우면 돼요. 항상 빈 대괄호예요!`
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
          id: "s23-ch1-must-lambda",
          type: "practice" as const,
          title: "🎯 lambda 가 *진짜 필요한* 순간 — 다중 기준 정렬",
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
          content: `전화번호부에서 **"Kim"**을 찾는다고 해봐요.

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
          title: "📌 begin()과 end()가 뭐야?",
          content: `sort()에서 계속 \`v.begin()\`, \`v.end()\`를 썼는데, 이게 정확히 뭔지 알아야 해요.

**begin()과 end()는 메모리 주소(위치를 가리키는 화살표)예요.**

\`\`\`
vector<int> v = {10, 20, 30, 40, 50};

메모리:  1000  1004  1008  1012  1016  1020
값:       10    20    30    40    50    ???

v.begin() = 1000  (10이 있는 주소)
v.end()   = 1020  (50 다음 주소, 값 없음 — 절대 읽으면 안 됨!)
\`\`\`

\`\`\`
   10    20    30    40    50   [빈칸]
    ↑                             ↑
 begin()                        end()
(1000)                         (1020)
\`\`\`

---

**왜 인덱스 대신 begin/end를 쓰냐고요?**

C++의 함수들(sort 등)이 "어디서 어디까지"를 **주소(화살표)** 로 받아요.

\`\`\`cpp
sort(v.begin(), v.end());
//    ↑ 여기 주소부터  ↑ 여기 주소 직전까지 정렬
\`\`\`

---

**화살표끼리 빼면 거리(인덱스)가 나와요**

\`\`\`
   10    20    30    40    50
 1000  1004  1008  1012  1016
    ↑                ↑
 begin()             it  (40을 가리킴, 주소 1012)

it - v.begin() = (1012 - 1000) / 4 = 3  → 인덱스 3!
\`\`\`

\`\`\`cpp
// begin()에서 3칸 앞으로 간 화살표 만들기
auto it = v.begin() + 3;
cout << *it;           // 40  (*it = 화살표가 가리키는 값)
cout << it - v.begin(); // 3  (인덱스로 변환)
\`\`\`

💡 **"두 화살표를 빼면 거리(인덱스)가 나온다" — 이 개념이 lower_bound에서 바로 쓰여요!**

---

**왜 주소(화살표)로 넘기는 거야? 인덱스로 하면 안 돼?**

주소로 넘기면 두 가지 장점이 있어요:

**① 복사를 안 해요 — 크기 상관없이 빠름**
\`\`\`cpp
// 만약 벡터 전체를 복사해서 넘기면?
sort(v);  // 100만 개면 복사만 해도 엄청난 시간 낭비!

// 시작/끝 주소 2개만 넘기면?
sort(v.begin(), v.end());  // 크기 상관없이 항상 빠름 ✅
\`\`\`

**② 어떤 컨테이너에도 같은 함수를 쓸 수 있어요**
\`\`\`cpp
sort(v.begin(), v.end());     // vector
sort(arr, arr + n);           // 배열
sort(lst.begin(), lst.end()); // list
// 같은 sort() 함수로 다 됨!
\`\`\``
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 lower_bound — 이진 탐색을 한 줄로!",
          content: `방금 본 이진 탐색, C++이 미리 만들어둔 함수가 있어요.
바로 \`lower_bound\`와 \`upper_bound\`예요.

⚠️ **정렬된 배열에서만 써요!** — 이진 탐색 원리로 만들어졌기 때문이에요.

---

**lower_bound / upper_bound 개념**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (값=3)       (값=3)
"3 시작"      "3 끝 다음"
\`\`\`

- **lower_bound** → 값 **이상(≥)** 의 첫 위치 = "이 값이 시작되는 곳"
- **upper_bound** → 값 **초과(>)** 의 첫 위치 = "이 값이 끝난 다음"

---

**왜** \`- v.begin()\` **을 하는 거야?**

\`lower_bound\`가 반환하는 \`it\`는 인덱스 번호가 아니라
**메모리 주소 (위치를 가리키는 화살표)** 예요.
그냥 출력하면 \`0x7ff3a2b...\` 같은 이상한 숫자가 나와요.

\`it - v.begin()\`은 "시작점에서 몇 칸 떨어져 있나"를 계산해요.

\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};
//               0  1  2  3  4  5

auto it = lower_bound(v.begin(), v.end(), 3);
int idx = it - v.begin();  // 공식! 항상 이렇게 인덱스로 변환
cout << idx;  // 1
\`\`\`

💡 \`- v.begin()\`은 공식으로 외우세요!

---

**없는 값을 찾으면?**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4는 없음
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2  (4 이상의 첫 값 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2  (4 초과의 첫 값 = 5)
// 없는 값이면 lower_bound == upper_bound !

// 10은 없음 (모든 값보다 큼)
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  (끝을 넘어감)
\`\`\`

**→ lower == upper면 그 값은 배열에 없는 거예요!**

---

**활용 패턴**

\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};

// ① 3이 몇 개인가?
int count = upper_bound(v.begin(), v.end(), 3)
          - lower_bound(v.begin(), v.end(), 3);
// 3 - 1 = 2개!

// ② 값이 있는지 확인 — binary_search() 사용 (더 간단!)
if (binary_search(v.begin(), v.end(), 3)) cout << "있음";
else cout << "없음";

// ③ 값의 위치가 필요할 때 — lower_bound 사용
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();
cout << idx;  // 1
\`\`\`

---

**binary_search() vs lower_bound — 언제 뭘 써?**

| | binary_search() | lower_bound() |
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
          id: "s23-ch2-lb2",
          type: "explain",
          title: "🔍 케이스별로 완전 정리!",
          content: `같은 배열 \`{1, 3, 3, 5, 7, 9}\`로 3가지 케이스를 비교해볼게요.

---

**케이스 1: 값이 딱 하나 있을 때 (5 찾기)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑   ↑
       lower_bound upper_bound
          (5)         (5)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 5) - v.begin()  →  3  (5가 있는 위치)
upper_bound(v.begin(), v.end(), 5) - v.begin()  →  4  (5 다음 위치)
4 - 3 = 1  →  5가 1개
\`\`\`

---

**케이스 2: 값이 여러 개 있을 때 (3 찾기)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
   (3)          (3)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 3) - v.begin()  →  1  (첫 번째 3)
upper_bound(v.begin(), v.end(), 3) - v.begin()  →  3  (3이 끝난 다음)
3 - 1 = 2  →  3이 2개
\`\`\`

---

**케이스 3: 값이 없을 때 (4 찾기)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑
    lower_bound(4) = upper_bound(4)  ← 둘이 같아요!
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (4 이상의 첫 값 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (4 초과의 첫 값 = 5)
3 - 3 = 0  →  4가 0개 = 없음!
\`\`\`

**→ lower_bound == upper_bound이면 그 값은 배열에 없어요.**

---

**📌 핵심 공식 정리**

| 목적 | 코드 |
|---|---|
| 값의 첫 위치 | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| 값이 몇 개? | \`upper_bound(...) - lower_bound(...)\` |
| 값이 있는지? | \`lower_bound(...) != upper_bound(...)\` → 있음 |`
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "🔍 끝을 넘어가는 경우",
          content: `모든 값보다 크거나 작은 값을 찾으면 어떻게 될까요?

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
//               0  1  2  3  4
\`\`\`

---

**모든 값보다 큰 수 (10 찾기)**

\`\`\`
{1,  3,  5,  7,  9,  [끝]}
 0   1   2   3   4    5
                      ↑
    lower_bound(10) = upper_bound(10) = 5 (끝!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 10) - v.begin()  →  5  (범위를 벗어남!)
upper_bound(v.begin(), v.end(), 10) - v.begin()  →  5
\`\`\`

⚠️ 인덱스 5는 \`v[5]\`가 없어요! **v.end()** 위치예요.
반드시 \`idx < v.size()\` 확인 후 접근해요.

---

**모든 값보다 작은 수 (0 찾기)**

\`\`\`
{1,  3,  5,  7,  9}
 0   1   2   3   4
 ↑
lower_bound(0) = upper_bound(0) = 0 (맨 앞!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 0) - v.begin()  →  0  (맨 앞)
upper_bound(v.begin(), v.end(), 0) - v.begin()  →  0
\`\`\`

---

**안전하게 쓰는 패턴:**
\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

// 찾기 전에 항상 확인!
if (it != v.end() && *it == x) {
    // 값이 있을 때만
    int idx = it - v.begin();
    cout << idx;
}
\`\`\`

💡 \`*it\`는 it가 가리키는 값이에요. (it = 화살표, *it = 화살표가 가리키는 것)`
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
          content: `배열에서 **중복된 값을 제거**하는 가장 흔한 C++ 패턴이에요!

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

💡 **sort → erase(unique(...), end())** 패턴을 세트로 외워두세요!`
        },
        {
          id: "s23-ch3-summary",
          type: "explain",
          title: "🎉 레슨 23 완료! sort 마스터!",
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

### 🐍 파이썬과의 핵심 차이!
| 기능 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 람다 문법 | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| 정렬 기준 | \`key=\` (값 1개 변환) | 비교 함수 (두 값 직접 비교) |
| 이진 탐색 | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| 중복 제거 | \`sorted(set(v))\` | \`sort + erase(unique)\` |

🚀 다음은 **map & set** — 자동으로 정렬되는 마법의 컨테이너!`
        }
      ]
    }
  ]
}
