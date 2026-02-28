// ============================================
// C++ Lesson 15: pair & 정렬
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson15Data: LessonData = {
  id: "cpp-15",
  title: "pair & 정렬",
  emoji: "🔗",
  description: "pair, tuple, 그리고 sort의 모든 것!",
  chapters: [
    // ============================================
    // Chapter 1: pair & tuple
    // ============================================
    {
      id: "ch1",
      title: "pair & tuple",
      emoji: "🔗",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔗 pair — 두 값을 하나로 묶기!",
          content: `이름과 점수, x좌표와 y좌표처럼 **두 개의 값**을 항상 같이 다뤄야 할 때가 있어요.

\`\`\`cpp
#include <utility>  // pair이 들어있는 헤더
// 또는 <algorithm>이나 <vector>를 include하면 자동으로 들어와요!

pair<string, int> p;     // string과 int를 묶은 pair
p.first = "Kim";         // 첫 번째 값
p.second = 95;           // 두 번째 값
\`\`\`

**pair를 만드는 방법은 여러 가지예요:**

\`\`\`cpp
// 방법 1: 중괄호 초기화
pair<string, int> p1 = {"Kim", 95};

// 방법 2: make_pair()
pair<string, int> p2 = make_pair("Lee", 88);

// 방법 3: auto 사용 (타입 자동 추론!)
auto p3 = make_pair("Park", 77);
\`\`\`

**접근은 .first와 .second로 해요:**
\`\`\`cpp
cout << p1.first << endl;   // Kim
cout << p1.second << endl;  // 95
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
p = ("Kim", 95)     # tuple로 두 값 묶기
print(p[0])          # Kim (인덱스로 접근)
print(p[1])          # 95
\`\`\`

| 파이썬 🐍 | C++ pair ⚡ |
|---|---|
| \`p = ("Kim", 95)\` | \`pair<string,int> p = {"Kim", 95};\` |
| \`p[0]\`, \`p[1]\` | \`p.first\`, \`p.second\` |
| 타입 안 써도 됨 | 타입 명시 (또는 auto) |
| 몇 개든 OK | **딱 2개만!** |

💡 pair는 딱 **2개의 값**만 묶을 수 있어요! 3개 이상은 tuple을 써야 해요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "두 정수를 pair로 묶어봐요!",
          code: "pair<___, ___> p = {3, 7};",
          fillBlanks: [
            { id: 0, answer: "int", options: ["string", "int", "double", "char"] },
            { id: 1, answer: "int", options: ["string", "int", "double", "char"] }
          ],
          explanation: "3과 7은 둘 다 정수이므로 pair<int, int>가 돼요! pair의 타입은 저장할 값에 맞춰서 써야 해요."
        },
        {
          id: "ch1-tuple",
          type: "explain",
          title: "🔗 tuple — 3개 이상 묶기!",
          content: `pair는 2개까지만 묶을 수 있어요. **3개 이상**을 묶으려면 **tuple**을 써요!

\`\`\`cpp
#include <tuple>  // tuple 헤더

// tuple 만들기
tuple<string, int, double> t = {"Kim", 15, 3.8};

// 값 꺼내기: get<인덱스>(tuple)
cout << get<0>(t) << endl;  // Kim
cout << get<1>(t) << endl;  // 15
cout << get<2>(t) << endl;  // 3.8
\`\`\`

**make_tuple()로도 만들 수 있어요:**
\`\`\`cpp
auto t2 = make_tuple("Lee", 16, 4.0);
\`\`\`

**tie()로 한 번에 꺼내기:**
\`\`\`cpp
string name;
int age;
double gpa;
tie(name, age, gpa) = t;  // 한 번에 변수 3개에 대입!
cout << name << " " << age << " " << gpa << endl;
// Kim 15 3.8
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
t = ("Kim", 15, 3.8)
print(t[0], t[1], t[2])

# 언패킹
name, age, gpa = t
\`\`\`

| 파이썬 🐍 | C++ tuple ⚡ |
|---|---|
| \`t = ("Kim", 15, 3.8)\` | \`tuple<string,int,double> t = {...};\` |
| \`t[0]\` | \`get<0>(t)\` |
| \`name, age, gpa = t\` | \`tie(name, age, gpa) = t;\` |
| 인덱스가 변수 가능 | 인덱스는 **컴파일 타임 상수**만! |

💡 실전에서는 pair를 훨씬 많이 써요! tuple은 3개 이상 묶어야 할 때 가끔 쓰고, 보통은 struct를 더 선호해요.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "pair & tuple 출력 예측!",
          code: "#include <iostream>\n#include <string>\n#include <tuple>\nusing namespace std;\nint main() {\n    pair<string, int> p = {\"Hello\", 5};\n    auto t = make_tuple(10, 20, 30);\n    cout << p.first.size() << \" \" << get<2>(t);\n    return 0;\n}",
          options: ["Hello 30", "5 30", "5 20", "에러"],
          answer: 1,
          explanation: "p.first는 \"Hello\"이고, .size()를 하면 문자열 길이 5가 나와요. get<2>(t)는 tuple의 3번째 값인 30이에요. 그래서 5 30이 출력돼요!"
        },
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔗 pair의 비교 — 자동으로 정렬 가능!",
          content: `pair의 놀라운 기능! **비교 연산자**(<, >, ==)가 자동으로 작동해요!

**비교 규칙:**
1. **first를 먼저 비교**
2. first가 같으면 **second로 비교**

\`\`\`cpp
pair<int,int> a = {1, 5};
pair<int,int> b = {1, 3};
pair<int,int> c = {2, 1};

// a vs b: first가 같으니(1==1) second 비교 → 5 > 3 → a > b
// a vs c: first 비교 → 1 < 2 → a < c
\`\`\`

이 덕분에 **vector<pair>을 sort하면 자동으로 first 기준 정렬**이 돼요!

\`\`\`cpp
vector<pair<int,string>> v = {
    {3, "C"}, {1, "A"}, {2, "B"}, {1, "D"}
};
sort(v.begin(), v.end());
// 결과: {1,"A"}, {1,"D"}, {2,"B"}, {3,"C"}
// first로 정렬, first가 같으면 second로 정렬!
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
v = [(3,"C"), (1,"A"), (2,"B"), (1,"D")]
v.sort()  # 파이썬 tuple도 첫 번째 요소 기준 정렬!
# [(1,'A'), (1,'D'), (2,'B'), (3,'C')]
\`\`\`

💡 파이썬 tuple과 같은 방식으로 비교돼요! first 먼저, 그 다음 second 순서예요.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 이름+점수 pair 벡터 만들기!",
          content: `이름과 점수를 pair로 묶어서 vector에 저장하고 출력해봐요!

make_pair()나 중괄호 초기화를 사용해서 pair를 만들고, .first와 .second로 접근해봐요.`,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> students;

    students.push_back({"Kim", 95});
    students.push_back({"Lee", 88});
    students.push_back(make_pair("Park", 92));

    for (auto& s : students) {
        cout << s.first << ": " << s.second << endl;
    }

    return 0;
}`,
          expectedOutput: `Kim: 95
Lee: 88
Park: 92`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "pair 기초!",
          content: "pair에서 두 번째 값에 접근하려면?",
          options: [
            "p[1]",
            "p.second",
            "get<1>(p)",
            "p.two"
          ],
          answer: 1,
          explanation: "pair의 두 번째 값은 .second로 접근해요! p[1]은 에러, get<1>(p)는 tuple에서 쓰는 방법이에요 (pair에도 작동하지만 .second가 더 자연스러워요)."
        }
      ]
    },
    // ============================================
    // Chapter 2: sort 마스터
    // ============================================
    {
      id: "ch2",
      title: "sort 마스터",
      emoji: "📊",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📊 sort() — 정렬의 기본!",
          content: `C++의 **sort()** 함수로 데이터를 정렬할 수 있어요!

\`\`\`cpp
#include <algorithm>  // sort()가 들어있는 헤더!
#include <vector>

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}  (오름차순)
\`\`\`

**배열도 정렬할 수 있어요:**
\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // arr[0]~arr[4] 정렬
// arr = {1, 2, 5, 8, 9}
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
v = [5, 2, 8, 1, 9]
v.sort()             # 원본 수정 (C++ sort처럼!)
# 또는
v2 = sorted(v)       # 새 리스트 반환

arr = [5, 2, 8, 1, 9]
arr.sort()           # 리스트의 메서드
\`\`\`

| 파이썬 🐍 | C++ sort ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — 새 리스트 반환 | C++에는 이런 함수 없음 (항상 원본 수정) |
| \`arr.sort()\` | \`sort(arr, arr+n)\` |
| 자동으로 전체 정렬 | 범위를 **직접 지정**해야 함 |

💡 sort()는 \`#include <algorithm>\`이 필요해요! 그리고 **begin()과 end()**로 범위를 지정해야 해요.`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "벡터를 정렬하는 코드를 완성해요!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort()에는 시작 위치와 끝 위치를 넣어요! vector는 v.begin()과 v.end()를 사용해요."
        },
        {
          id: "ch2-reverse",
          type: "explain",
          title: "📊 역순 정렬 — 내림차순!",
          content: `기본 sort()는 오름차순이에요. **내림차순(큰 수부터)**으로 하려면?

**방법 1: greater<> 사용**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}  (내림차순!)
\`\`\`

**방법 2: rbegin(), rend() 사용 (역순 반복자)**
\`\`\`cpp
sort(v.rbegin(), v.rend());
// 역순 반복자로 정렬하면 내림차순!
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
v = [5, 2, 8, 1, 9]
v.sort(reverse=True)  # 간단하게 reverse=True!
# v = [9, 8, 5, 2, 1]
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sort(reverse=True)\` | \`sort(v.begin(), v.end(), greater<int>())\` |
| 매개변수 하나로 끝! | 세 번째 인자에 비교 함수 전달 |

💡 \`greater<int>()\`에서 **괄호 ()** 두 쌍을 잊지 마세요! \`greater<int>\`는 타입이고, 뒤의 \`()\`로 객체를 만드는 거예요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "sort 후 출력!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "sort() 후 v = {1, 2, 4, 5, 7}이에요. v[0]은 가장 작은 1, v[4]는 가장 큰 7이에요. 그래서 1 7이 출력돼요!"
        },
        {
          id: "ch2-custom",
          type: "explain",
          title: "📊 커스텀 비교 함수 — 내 맘대로 정렬!",
          content: `sort()의 세 번째 인자로 **나만의 비교 함수**를 전달할 수 있어요!

**비교 함수 규칙:**
- 두 개의 인자를 받아요
- **true**를 리턴하면 첫 번째 인자가 **앞에** 와요
- **false**를 리턴하면 두 번째 인자가 앞에 와요

**방법 1: 일반 함수**
\`\`\`cpp
bool cmp(int a, int b) {
    return a > b;  // a가 b보다 크면 a를 앞에 → 내림차순!
}

sort(v.begin(), v.end(), cmp);
\`\`\`

**방법 2: 람다 (lambda)**
\`\`\`cpp
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // 내림차순
});
\`\`\`

**실전 예시: 절댓값 기준 정렬**
\`\`\`cpp
vector<int> v = {-5, 3, -1, 4, -2};
sort(v.begin(), v.end(), [](int a, int b) {
    return abs(a) < abs(b);  // 절댓값이 작은 것부터!
});
// v = {-1, -2, 3, 4, -5}
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
v = [-5, 3, -1, 4, -2]
v.sort(key=lambda x: abs(x))  # key로 기준 지정
# 또는
v.sort(key=abs)
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`key=함수\` — 값을 변환해서 비교 | 비교 함수로 **두 값을 직접 비교** |
| \`lambda x: abs(x)\` | \`[](int a, int b){ return abs(a)<abs(b); }\` |
| 인자 1개 (변환 함수) | 인자 2개 (비교 함수) |

💡 파이썬은 "이 값을 기준으로 정렬해" (key), C++는 "이 둘 중 누가 앞이야?" (비교 함수)라는 차이가 있어요!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "커스텀 정렬 결과!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nbool cmp(int a, int b) {\n    return a % 10 < b % 10;\n}\nint main() {\n    vector<int> v = {23, 11, 45, 32};\n    sort(v.begin(), v.end(), cmp);\n    cout << v[0] << \" \" << v[3];\n    return 0;\n}",
          options: ["11 45", "23 32", "11 23", "32 23"],
          answer: 0,
          explanation: "cmp는 일의 자리(% 10)로 비교해요! 23→3, 11→1, 45→5, 32→2. 일의 자리로 정렬하면: 11(1), 32(2), 23(3), 45(5). 그래서 v[0]=11, v[3]=45. 출력은 11 45!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 점수 내림차순 정렬!",
          content: `vector<pair<int,string>>에 점수와 이름을 저장하고, 점수 내림차순으로 정렬해봐요!

pair의 first에 점수를 넣으면 자동으로 점수 기준으로 정렬할 수 있어요. greater<>를 사용해서 내림차순으로 만들어봐요!`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> scores = {
        {85, "Kim"},
        {92, "Lee"},
        {78, "Park"},
        {95, "Choi"}
    };

    sort(scores.begin(), scores.end(), greater<pair<int,string>>());

    for (auto& s : scores) {
        cout << s.second << ": " << s.first << endl;
    }

    return 0;
}`,
          expectedOutput: `Choi: 95
Lee: 92
Kim: 85
Park: 78`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "sort 관련!",
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
          title: "pair 선언!",
          content: `다음 중 올바른 pair 선언은?`,
          options: [
            "pair p<int, int> = {1, 2};",
            "pair<int, int> p = {1, 2};",
            "pair(int, int) p = {1, 2};",
            "pair[int, int] p = {1, 2};"
          ],
          answer: 1,
          explanation: "pair<타입1, 타입2> 변수명 = {값1, 값2}; 형태로 선언해요! 꺾쇠 괄호 < >를 사용해요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "sort 기본!",
          content: `이 코드의 출력은?

\`\`\`cpp
vector<int> v = {3, 1, 4};
sort(v.begin(), v.end());
cout << v[0] << v[1] << v[2];
\`\`\``,
          options: [
            "314",
            "134",
            "431",
            "143"
          ],
          answer: 1,
          explanation: "sort() 후 오름차순 정렬되어 v = {1, 3, 4}가 돼요. v[0]=1, v[1]=3, v[2]=4이므로 134가 출력돼요!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "커스텀 정렬!",
          content: `sort의 세 번째 인자로 전달하는 비교 함수의 규칙으로 올바른 것은?`,
          options: [
            "true를 리턴하면 두 번째 인자가 앞에 온다",
            "true를 리턴하면 첫 번째 인자가 앞에 온다",
            "항상 int를 리턴해야 한다",
            "인자를 1개만 받아야 한다"
          ],
          answer: 1,
          explanation: "비교 함수가 true를 리턴하면 첫 번째 인자가 앞에 와요! bool cmp(a, b)에서 true면 a가 b 앞에 오는 거예요."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "pair 비교!",
          content: `이 코드의 출력은?

\`\`\`cpp
pair<int,int> a = {1, 10};
pair<int,int> b = {1, 5};
if (a > b) cout << "A";
else cout << "B";
\`\`\``,
          options: [
            "A",
            "B",
            "에러",
            "아무것도 출력 안 됨"
          ],
          answer: 0,
          explanation: "pair 비교는 first를 먼저 비교해요. 둘 다 first가 1로 같으니 second를 비교해요. 10 > 5이므로 a > b는 true! A가 출력돼요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 오늘 배운 것 정리!",
          content: `## 🏆 레슨 15 완료! 잘했어요!

### 🔗 pair & tuple
- **pair<T1, T2>**: 두 값을 하나로 묶기
- \`.first\`, \`.second\`로 접근
- **tuple**: 3개 이상 묶기, \`get<N>(t)\`로 접근
- pair는 **자동 비교** 가능! (first 먼저, 그 다음 second)

### 📊 sort 마스터
- \`sort(v.begin(), v.end())\` — 오름차순 정렬
- \`sort(v.begin(), v.end(), greater<int>())\` — 내림차순
- 커스텀 비교 함수 또는 **람다**로 원하는 기준 정렬
- vector<pair>을 sort하면 first 기준으로 자동 정렬!

### 🐍 파이썬과의 핵심 차이!

| 개념 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 두 값 묶기 | \`(a, b)\` tuple | \`pair<T1,T2>{a,b}\` |
| 접근 | \`t[0]\`, \`t[1]\` | \`.first\`, \`.second\` |
| 정렬 | \`list.sort()\` | \`sort(begin, end)\` |
| 내림차순 | \`reverse=True\` | \`greater<T>()\` |
| 커스텀 정렬 | \`key=함수\` | 비교 함수 (인자 2개) |

🚀 **다음 레슨**에서는 **map & set**을 배울 거예요! 키-값 저장소와 중복 없는 집합, 기대되죠?`
        }
      ]
    }
  ]
}
