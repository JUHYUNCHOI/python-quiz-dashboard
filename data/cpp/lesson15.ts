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
          title: "🔗 pair — 두 값을 하나로 묶기!",
          content: `시험 결과를 발표한다고 생각해보세요. '홍길동 95점, 김민수 87점, 이영희 92점...' 이름과 점수를 **항상 같이** 다뤄야 하잖아요? 변수를 따로 만들면 정렬할 때 이름과 점수가 따로 놀아요!

변수를 2개 따로 만들면? \`string name1; int score1; string name2; int score2;\` 😰 너무 복잡하죠!

**pair는 두 값을 하나로 묶는 간단한 도구**예요.

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

💡 pair는 딱 **2개의 값**만 묶을 수 있어요! 3개 이상은 tuple을 쓸 수 있지만, 실전에서는 struct를 더 많이 써요.`
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

pair의 자동 비교가 유용한 이유: \`vector<pair<int,string>>\`을 sort()하면 자동으로 첫 번째 값(점수) 기준으로 정렬돼요!

💡 파이썬 tuple과 같은 방식이에요! first 먼저, 그 다음 second 순서로 비교해요.`
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
