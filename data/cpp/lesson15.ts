// ============================================
// C++ Lesson 15: pair & tuple
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson15Data: LessonData = {
  id: "cpp-15",
  title: "pair & tuple",
  emoji: "🔗",
  description: "두 값을 하나로! pair와 tuple로 데이터를 묶어봐요.",
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
          title: "🔗 pair — 두 값을 하나로 묶기",
          content: `학생들 점수표를 만든다고 해봐요. 이름이랑 점수, 둘이 **항상 같이** 다녀야 해요. 따로 변수에 두면?

\`\`\`cpp
string name1; int score1;
string name2; int score2;
string name3; int score3;
// ... 30 명이면? 60 개 변수 😱
\`\`\`

벡터로 분리하면 좀 낫지만 또 다른 문제가 있어요:

\`\`\`cpp
vector<string> names = {"Kim", "Lee", "Park"};
vector<int> scores = {95, 88, 92};
// 점수로 정렬하고 싶으면? names 와 scores 가 따로 정렬돼서
// "Kim → 88", "Lee → 95" 같은 엇갈림 발생!
\`\`\`

이름과 점수를 **하나의 단위**로 묶을 도구가 필요해요. 직전 레슨에서 배운 \`struct\` 도 답이지만, "두 값만 묶으면 끝" 이라면 struct 선언하는 것도 살짝 과해요. 이럴 때 등장하는 게 **pair**.

> 🎯 한 줄: **pair = "이름 안 짓고 두 값 묶는 미니 struct".**

\`\`\`cpp
#include <utility>   // pair 가 들어있는 헤더

pair<string, int> p = {"Kim", 95};
//   └────────────┘
//   첫 번째 타입, 두 번째 타입

cout << p.first;   // "Kim"
cout << p.second;  // 95
\`\`\`

> 💡 \`<utility>\` 가 공식 헤더예요. 다만 \`<vector>\`, \`<algorithm>\`, \`<map>\` 같은 STL 헤더를 이미 쓰고 있다면 \`pair\` 가 자동으로 따라와서 굳이 안 적어도 동작해요.
>
> **실전 워크플로우는 두 가지 중 골라요:**
> - **안전 모드**: pair 쓸 때마다 \`#include <utility>\` 적어두기. 어느 헤더 환경이든 무조건 동작.
> - **간결 모드**: 일단 안 적고 다른 STL 헤더 (\`<vector>\` 등) 가 끌어오기를 기대. 컴파일러가 \`'pair' was not declared\` 같은 에러 내면 그때 \`<utility>\` 추가.
>
> 둘 다 정답이에요. 어느 헤더가 무엇을 끌어오는지 외울 필요 없어요 — 컴파일러가 알려주니까요.

\`.first\`, \`.second\` 라는 이름이 좀 어색하죠? **두 값 중 어느 게 의미상 뭔지 안 알려주는** 게 pair 의 한계이자 특징이에요. 의미가 중요하면 struct 를 쓰고, 잠깐 묶기만 하면 pair 를 써요.

### 만드는 방법 세 가지 (다 같은 결과)

\`\`\`cpp
pair<string, int> p1 = {"Kim", 95};        // 중괄호 — 가장 흔함
pair<string, int> p2 = make_pair("Lee", 88); // make_pair 함수
auto p3 = make_pair("Park", 77);            // auto 로 타입 생략
\`\`\`

### 파이썬 튜플과 거의 같음

| 파이썬 🐍 | C++ pair ⚡ |
|---|---|
| \`p = ("Kim", 95)\` | \`pair<string,int> p = {"Kim", 95};\` |
| \`p[0]\`, \`p[1]\` | \`p.first\`, \`p.second\` |
| 몇 개든 OK | **딱 2개만!** |

> 💡 셋 이상 묶고 싶으면 다음 페이지의 \`tuple\`. 근데 실제로 가장 많이 쓰는 건 압도적으로 pair 예요 — 좌표 (x,y), 이름-점수, 인덱스-거리 같은 "딱 두 개" 짝이 흔하니까요.`
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
          title: "🔗 tuple — 3개 이상 묶을 때",
          content: `pair 는 딱 2 개. 그럼 3 개를 묶고 싶으면? **tuple**.

\`\`\`cpp
#include <tuple>

tuple<string, int, double> t = {"Kim", 15, 3.8};
//                              이름   나이  학점
\`\`\`

값 꺼낼 땐 \`.first/.second\` 같은 이름이 더 이상 안 통해요 (셋 이상이니까). 대신 **인덱스로** 꺼내요:

\`\`\`cpp
cout << get<0>(t);  // "Kim"
cout << get<1>(t);  // 15
cout << get<2>(t);  // 3.8
\`\`\`

\`get<0>(t)\` 는 **\`<>\` 안에 인덱스, \`()\` 안에 tuple** — 처음 보면 이상한 문법이지만 의미는 \`t[0]\` 이랑 같아요. 한 가지 차이: 그 안의 숫자는 **컴파일 시점에 정해진 상수만** 가능. 변수 \`i\` 를 넣어서 \`get<i>(t)\` 는 안 돼요.

### 한 번에 꺼내기 — tie

\`\`\`cpp
string name; int age; double gpa;
tie(name, age, gpa) = t;
// 파이썬의 name, age, gpa = t 랑 같은 효과
\`\`\`

| 파이썬 🐍 | C++ tuple ⚡ |
|---|---|
| \`t = ("Kim", 15, 3.8)\` | \`tuple<string,int,double> t = {...};\` |
| \`t[0]\` | \`get<0>(t)\` |
| \`name, age, gpa = t\` | \`tie(name, age, gpa) = t;\` |

### pair vs tuple — 언제 어떤 걸?

- **2 개 묶기** → pair (압도적으로 흔함, 좌표/이름점수/인덱스거리)
- **3 개 이상** → tuple 도 OK 지만, 의미 있는 이름이 필요하면 \`struct\` 가 가독성 ↑

쉽게 말해: **잠깐 묶기만 할 거면 pair/tuple, 자주 다룰 데이터면 struct.**`
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
          title: "🔗 pair 의 진짜 매력 — 자동 비교, 자동 정렬",
          content: `pair 가 그냥 "두 값 묶는 도구" 였으면 별 거 없어요. 진짜 매력은 다음 페이지의 이 한 가지: **pair 끼리 비교가 자동으로 된다**.

\`\`\`cpp
pair<int,int> a = {1, 5};
pair<int,int> b = {1, 3};

a < b ?    // 컴파일러: "first 먼저 볼게. 1 == 1, 같네. → second 비교: 5 > 3"
           // 결과: a > b
\`\`\`

규칙은 사전(辭典) 정렬이랑 같아요:
1. **first 먼저** 비교
2. first 가 같으면 → **second 비교**

### 그래서 진짜 좋은 점 — \`sort\` 가 그냥 통해요

학생 점수 정렬하는 시나리오:

\`\`\`cpp
vector<pair<int, string>> scores = {
    {88, "Lee"}, {95, "Kim"}, {88, "Park"}, {72, "Choi"}
};

sort(scores.begin(), scores.end());
// → {72, "Choi"}, {88, "Lee"}, {88, "Park"}, {95, "Kim"}
//    점수 오름차순. 같은 점수면 이름 오름차순.
\`\`\`

**\`sort\` 한 줄로 끝.** 따로 비교 함수 안 짜도 돼요. 이게 \`vector<int>\` 두 개로 했을 때와 결정적으로 달라요 — 두 벡터로 점수 정렬 시 이름과 짝이 깨지죠.

> 💡 파이썬 튜플도 똑같은 방식이에요. \`(점수, 이름)\` 튜플 리스트를 \`.sort()\` 하면 점수 먼저, 같으면 이름.

### 이게 다음 레슨의 도입이에요

다음 레슨 (cpp-23) 에서 \`sort\` 를 본격적으로 다뤄요. 거기서 "근데 점수는 **내림차순**, 이름은 오름차순으로 동시에 하려면?" 같은 좀 더 복잡한 정렬을 lambda 와 함께 배워요. 오늘 본 pair + sort 자동 정렬이 그 출발점이에요.`
        },
        {
          id: "ch1-question",
          type: "animation" as const,
          title: "🙋 질문: vector<int> 2개로 하면 안 돼?",
          component: "pairVsTwoVectors",
          content: "정렬 버튼을 눌러서 두 방식의 차이를 확인해봐요!",
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "pair 멤버에 접근해봐요!",
          content: "p.first와 p.second로 pair의 값을 꺼내봐요!",
          code: "pair<string, int> p = {\"Kim\", 95};\ncout << p.___ << \": \" << p.___ << endl;\n// 출력: Kim: 95",
          fillBlanks: [
            { id: 0, answer: "first", options: ["first", "second", "name", "0"] },
            { id: 1, answer: "second", options: ["first", "second", "score", "1"] }
          ],
          explanation: "pair의 첫 번째 값은 .first, 두 번째 값은 .second로 접근해요! p[0]이나 p[1]은 에러예요."
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "출력 결과 맞추기!",
          code: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<pair<string, int>> v;\n    v.push_back({\"Kim\", 95});\n    v.push_back(make_pair(\"Lee\", 88));\n    cout << v[0].first << \" \" << v[1].second;\n}",
          options: ["Kim 88", "Kim 95", "Lee 88", "95 88"],
          answer: 0,
          explanation: "v[0].first는 첫 번째 pair의 첫 번째 값 → \"Kim\". v[1].second는 두 번째 pair의 두 번째 값 → 88. 출력: Kim 88"
        },
        {
          id: "ch1-vec-iter",
          type: "explain",
          title: "🔄 vector<pair>를 반복문으로 순회하기",
          content: `pair를 여러 개 다룰 때는 **vector<pair>**에 넣어서 관리해요.

\`\`\`cpp
vector<pair<string, int>> students;
students.push_back({"Kim", 95});
students.push_back({"Lee", 88});
students.push_back({"Park", 92});
\`\`\`

range-for로 순회할 때는 \`auto&\`를 쓰면 타입을 직접 안 써도 돼요:

\`\`\`cpp
for (auto& s : students) {
    cout << s.first << ": " << s.second << endl;
}
// Kim: 95
// Lee: 88
// Park: 92
\`\`\`

\`auto&\`에서 \`s\`의 실제 타입은 \`pair<string, int>\`예요. 그래서:
- \`s.first\` → string (이름)
- \`s.second\` → int (점수)

타입을 직접 쓰면 이렇게 돼요 (auto 없이):

\`\`\`cpp
for (pair<string, int>& s : students) {  // auto& 대신 직접 타입 명시
    cout << s.first << ": " << s.second << endl;
}
\`\`\`

💡 \`auto&\`가 훨씬 편하죠? 타입이 길어질수록 auto의 가치가 커져요!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 이름+점수 pair 벡터 만들기!",
          content: `이름과 점수를 pair로 묶어서 vector에 저장하고 출력해봐요!

make_pair()나 중괄호 초기화를 사용해서 pair를 만들고, .first와 .second로 접근해봐요.`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, int>> students;

    // push_back으로 {"Kim", 95}, {"Lee", 88}, make_pair("Park", 92) 추가

    // range-for로 s.first와 s.second 출력

    return 0;
}`,
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
          hint: "students.push_back({\"Kim\", 95}); 또는 make_pair(\"Kim\", 95)로 추가해요. 출력은 for (auto& s : students) { cout << s.first << \": \" << s.second << endl; }",
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
    // Chapter 2: 정리 퀴즈
    // ============================================
    {
      id: "ch2",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch2-q1",
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
          id: "ch2-q2",
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
          id: "ch2-summary",
          type: "explain",
          title: "🎉 오늘 배운 것 정리!",
          content: `## 🏆 레슨 15 완료! 잘했어요!

### 🔗 pair
- **pair<T1, T2>**: 두 값을 하나로 묶기
- \`pair<string,int> p = {"Kim", 95};\` — 선언과 초기화
- \`p.first\` — 첫 번째 값, \`p.second\` — 두 번째 값
- \`make_pair(a, b)\` 또는 \`{a, b}\` 로 만들기
- **자동 비교 지원!** (first 먼저, 같으면 second 순서)
- **vector<pair> sort 시 자동으로 first 기준 정렬!**

### 📦 tuple — 참고만!
- **tuple<T1, T2, T3>**: 3개 이상 묶기
- \`get<N>(t)\` 로 N번째 값 접근
- \`tie(a, b, c) = t;\` 로 한 번에 꺼내기
- 실전에서는 struct 선호!

### 🐍 파이썬과의 핵심 차이!

| 개념 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 두 값 묶기 | \`(a, b)\` | \`pair<T1,T2>{a, b}\` |
| 접근 | \`t[0]\`, \`t[1]\` | \`.first\`, \`.second\` |
| 3개 이상 묶기 | tuple (개수 자유) | \`tuple<T1,T2,T3>\` |

🚀 **다음 레슨(cpp-23)**에서는 **sort 마스터**를 배울 거예요! 커스텀 정렬, 람다, 구조체 정렬까지!`
        }
      ]
    }
  ]
}
