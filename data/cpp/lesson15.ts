// ============================================
// C++ Lesson 15: pair & tuple
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson15Data: LessonData = {
  id: "cpp-15",
  title: "pair & tuple",
  emoji: "🔗",
  description: "두 값을 하나로! pair로 데이터를 묶어봐요.",
  chapters: [
    // ============================================
    // Chapter 1: pair 기초
    // ============================================
    {
      id: "ch1",
      title: "pair 기초",
      emoji: "🔗",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔗 pair — 두 값을 하나로 묶기!",
          content: `이름과 점수, x좌표와 y좌표처럼 **두 개의 값**을 항상 같이 다뤄야 할 때가 있어요.

변수를 따로 만들면? \`string name1; int score1; string name2; int score2;\` 😰 너무 복잡하죠!

**pair는 두 값을 하나로 묶는 간단한 도구**예요.

\`\`\`cpp
pair<string, int> p = {"Kim", 95};  // string과 int를 묶기

cout << p.first << endl;   // Kim  (첫 번째 값)
cout << p.second << endl;  // 95   (두 번째 값)
\`\`\`

**pair를 만드는 방법:**

\`\`\`cpp
// 방법 1: 중괄호 초기화
pair<string, int> p1 = {"Kim", 95};

// 방법 2: make_pair()
pair<string, int> p2 = make_pair("Lee", 88);

// 방법 3: auto 사용
auto p3 = make_pair("Park", 77);
\`\`\`

파이썬과 비교해봐요:

| 파이썬 🐍 | C++ pair ⚡ |
|---|---|
| \`p = ("Kim", 95)\` | \`pair<string,int> p = {"Kim", 95};\` |
| \`p[0]\`, \`p[1]\` | \`p.first\`, \`p.second\` |
| 타입 안 써도 됨 | 타입 명시 (또는 auto) |
| 몇 개든 OK | **딱 2개만!** |

💡 pair는 딱 **2개의 값**만 묶을 수 있어요! 3개 이상을 묶으려면 struct를 쓰는 게 더 좋아요.`
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
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 이름+점수 pair 벡터 만들기!",
          content: `학생 이름과 점수를 pair로 묶어서 vector에 저장하고, 각 학생의 정보를 출력해봐요!`,
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
          explanation: "pair의 두 번째 값은 .second로 접근해요! p[1]은 에러예요."
        }
      ]
    },
    // ============================================
    // Chapter 2: tuple — 이런 것도 있어요
    // ============================================
    {
      id: "ch2",
      title: "tuple — 이런 것도 있어요",
      emoji: "📦",
      steps: [
        {
          id: "ch2-tuple",
          type: "explain",
          title: "📦 tuple — 3개 이상 묶기 (참고용)",
          content: `pair는 2개까지만 묶을 수 있어요. **3개 이상**을 묶으려면 **tuple**이 있어요.

\`\`\`cpp
#include <tuple>

tuple<string, int, double> t = {"Kim", 15, 3.8};

cout << get<0>(t) << endl;  // Kim
cout << get<1>(t) << endl;  // 15
cout << get<2>(t) << endl;  // 3.8
\`\`\`

파이썬 tuple과 비슷하지만, **인덱스 대신 get<N>()** 을 써요.

\`\`\`python
# 파이썬
t = ("Kim", 15, 3.8)
print(t[0])  # Kim
\`\`\`

⚠️ **실전에서는 tuple보다 struct를 훨씬 더 많이 써요!** tuple은 get<0>, get<1>처럼 숫자로만 접근하니까 코드를 나중에 읽을 때 뭔지 알기 어렵거든요. "이런 것도 있다" 정도만 알아두세요.`
        },
        {
          id: "ch2-summary",
          type: "explain",
          title: "🎉 오늘 배운 것 정리!",
          content: `## 🏆 레슨 15 완료! 잘했어요!

### 🔗 pair — 핵심 정리
- **pair<T1, T2>**: 두 값을 하나로 묶기
- \`pair<string,int> p = {"Kim", 95};\` — 선언과 초기화
- \`p.first\` — 첫 번째 값
- \`p.second\` — 두 번째 값
- \`make_pair(a, b)\` 또는 \`{a, b}\` 로 만들기

### 📦 tuple — 참고만!
- 3개 이상 묶을 때 사용
- \`get<N>(t)\` 로 N번째 값 접근
- 실전에서는 struct 선호!

### 🐍 파이썬과의 핵심 차이!

| 개념 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 두 값 묶기 | \`(a, b)\` | \`pair<T1,T2>{a, b}\` |
| 접근 | \`t[0]\`, \`t[1]\` | \`.first\`, \`.second\` |

🚀 **다음 레슨(cpp-23)**에서는 **sort**를 배울 거예요! 그때 pair를 활용해서 여러 값을 같이 정렬하는 법도 배워요!`
        }
      ]
    }
  ]
}
