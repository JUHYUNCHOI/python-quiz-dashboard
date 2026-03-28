// ============================================
// C++ Lesson 14: 구조체 (struct)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson14Data: LessonData = {
  id: "cpp-14",
  title: "구조체 (struct)",
  emoji: "📦",
  description: "관련 데이터를 하나로 묶는 나만의 타입!",
  chapters: [
    // ============================================
    // Chapter 1: 구조체 (struct)
    // ============================================
    {
      id: "ch1",
      title: "struct 기초",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 struct — 여러 데이터를 하나로 묶기!",
          component: "cppStructBuilder",
          content: `학생 4명의 이름, 나이, 점수를 저장하려면:

\`\`\`cpp
string name1 = "김철수";  int age1 = 17;  double score1 = 95.5;
string name2 = "이영희";  int age2 = 16;  double score2 = 87.0;
string name3 = "박민준";  int age3 = 17;  double score3 = 72.3;
string name4 = "최수아";  int age4 = 16;  double score4 = 91.8;
// 학생이 100명이면? 변수가 300개... 😱
\`\`\`

**struct**를 쓰면 이름 하나로 묶어서, 학생 100명도 변수 100개면 돼요 👇`,
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "struct 문법 정리",
          content: `**1단계: struct 정의**

\`struct\` 키워드 → 이름 → \`{\`안에 변수들\`};\`

\`\`\`cpp
struct Student {
    string name;
    int age;
    double score;
};  // ← 세미콜론 필수!
\`\`\`

> ⚠️ 왜 \`};\` 뒤에 세미콜론? struct 정의는 **선언문**이기 때문이에요. \`int x;\`처럼 선언이 끝나면 \`;\`으로 마쳐요.

---

**2단계: 변수 만들기**

struct를 정의할 때 쓴 순서대로 값을 채워요:

\`\`\`cpp
//               name      age   score
//                ↓         ↓      ↓
Student s1 = {"김철수",    17,   95.5};
Student s2 = {"이영희",    16,   87.0};
\`\`\`

---

**3단계: 멤버 접근 — 점(.) 연산자**

struct 안의 변수들을 **멤버(member)**라고 해요. 멤버에 접근할 때는 점(\`.\`)을 써요:

\`\`\`cpp
cout << s1.name;   // 김철수
cout << s1.age;    // 17
s1.score = 100.0;  // 수정도 가능!
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "점(.) 연산자로 멤버 수정!",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double score;
};

int main() {
    Student s1;
    s1.name = "김철수";
    s1.age = 17;
    s1.age = 20;
    cout << s1.name << " " << s1.age;
    return 0;
}`,
          options: ["김철수 17", "김철수 20", "에러", "김철수 0"],
          answer: 1,
          explanation: "s1.age를 17로 설정한 뒤 20으로 덮어썼어요. 마지막으로 대입한 값이 남으니까 '김철수 20'이 출력돼요."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "점(.) 연산자!",
          content: "`Student s1;` 이후 `s1`의 나이(age)에 접근하는 올바른 코드는?",
          options: [
            "s1→age",
            "s1[age]",
            "s1.age",
            "age.s1"
          ],
          answer: 2,
          explanation: "struct 멤버에 접근할 때는 점(.) 연산자를 써요! s1.age처럼 변수이름.멤버이름 순서로 쓰면 돼요."
        },
      ],
    },
    // ============================================
    // Chapter 2: struct 활용
    // ============================================
    {
      id: "ch2",
      title: "struct 활용",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-array",
          type: "explain",
          title: "struct 배열로 여러 데이터 관리",
          component: "cppStructArrayLoop",
          content: `struct의 진짜 힘은 **배열과 함께** 쓸 때예요!

\`\`\`cpp
struct Student {
    string name;
    int score;
};

Student students[3] = {
    {"김철수", 95},
    {"이영희", 87},
    {"박민준", 72},
};

for (int i = 0; i < 3; i++) {
    cout << students[i].name << ": " << students[i].score << endl;
}
\`\`\`

출력:
\`\`\`
김철수: 95
이영희: 87
박민준: 72
\`\`\`

USACO에서 좌표, 간선 정보 등을 struct 배열로 많이 관리해요!`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "struct 배열 + for문 출력!",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"김철수", 95},
        {"이영희", 87},
        {"박민준", 72},
    };
    for (int i = 0; i < 3; i++) {
        cout << students[i].name << endl;
    }
    return 0;
}`,
          options: ["김철수\n이영희\n박민준", "95\n87\n72", "김철수 95\n이영희 87\n박민준 72", "에러"],
          answer: 0,
          explanation: "students[i].name으로 각 학생의 이름 멤버에 접근해요. i가 0→1→2 순으로 증가하면서 김철수, 이영희, 박민준이 차례로 출력돼요."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "for문으로 점수 출력!",
          content: "모든 학생의 점수를 for문으로 출력해봐요.",
          code: `for (int i = 0; i < 3; i++) {
    cout << students[___].score << endl;
}`,
          fillBlanks: [
            { id: 0, answer: "i", options: ["i", "0", "name", "score"] }
          ],
          explanation: "students[i].score — 배열 인덱스 i로 각 학생에 접근하고, 점(.)으로 score 멤버를 가져와요. i가 0, 1, 2로 바뀌면서 세 학생의 점수가 순서대로 출력돼요."
        },
        {
          id: "ch2-loop-patterns",
          type: "fillblank" as const,
          title: "패턴 1: 합계 구하기",
          content: `struct 배열의 모든 점수를 더하는 패턴이에요. \`total\`에 각 학생의 점수를 누적해요.`,
          code: `Student students[3] = {
    {"김철수", 95},
    {"이영희", 87},
    {"박민준", 72},
};
int total = 0;
for (int i = 0; i < 3; i++) {
    total ___ students[i].score;
}
cout << "합계: " << total;  // 합계: 254`,
          fillBlanks: [
            { id: 0, answer: "+=", options: ["+=", "=", "-=", "=="] }
          ],
          explanation: "`total += students[i].score`로 i가 0, 1, 2일 때 95, 87, 72를 순서대로 더해요. 95+87+72=254!"
        },
        {
          id: "ch2-mini-practice1",
          type: "practice" as const,
          title: "✋ 합계 직접 써보기",
          content: `Student struct 배열을 for문으로 순회해서 김철수(95), 이영희(87), 박민준(72) 3명의 점수 합계를 구해서 출력해봐요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"김철수", 95},
        {"이영희", 87},
        {"박민준", 72},
    };

    // 여기에 합계를 구하는 코드를 써보세요

    return 0;
}`,
          expectedOutput: `합계: 254`
        },
        {
          id: "ch2-loop-patterns2",
          type: "fillblank" as const,
          title: "패턴 2: 최솟값 찾기",
          content: `최솟값 찾기는 세 가지를 결정해야 해요 (빈칸 3개!):

① **초기값**을 뭘로 시작할지 — 0이면 안 되는 이유가 있어요
② **비교 방향**을 어떻게 할지 — \`<\` 인지 \`>\` 인지
③ **갱신**할 때 무슨 값으로 바꿀지`,
          code: `int minScore = students[___].score;  // 첫 번째 값으로 시작!
for (int i = 1; i < 3; i++) {
    if (students[i].score ___ minScore)
        minScore = students[___].score;
}
cout << "최저: " << minScore;  // 최저: 72`,
          fillBlanks: [
            { id: 0, answer: "0", options: ["0", "1", "2", "-1"] },
            { id: 1, answer: "<", options: ["<", ">", "<=", ">="] },
            { id: 2, answer: "i", options: ["i", "0", "1", "minScore"] }
          ],
          explanation: "① 초기값은 `students[0].score` — 0으로 하면 모든 점수가 크니까 최솟값을 못 찾아요! ② `<`로 비교 — 더 작으면 갱신 ③ `students[i].score`로 현재 값으로 업데이트!"
        },
        {
          id: "ch2-mini-practice2",
          type: "practice" as const,
          title: "✋ 최댓값 직접 써보기",
          content: `Student struct 배열에서 김철수(95), 이영희(87), 박민준(72) 중 가장 높은 점수를 찾아 출력해봐요. 초기값 설정 방법은 최솟값과 같아요!`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"김철수", 95},
        {"이영희", 87},
        {"박민준", 72},
    };

    // 여기에 최댓값을 구하는 코드를 써보세요

    return 0;
}`,
          expectedOutput: `최고: 95`
        },
        {
          id: "ch2-loop-patterns3",
          type: "fillblank" as const,
          title: "패턴 3: 조건 만족 개수 세기",
          content: `조건에 맞는 학생 수를 셀 때는 \`count++\`를 써요. 90점 이상인 학생이 몇 명인지 세어봐요.`,
          code: `int count = 0;
for (int i = 0; i < 3; i++) {
    if (students[i].score ___ 90) count___;
}
cout << count << "명";  // 1명`,
          fillBlanks: [
            { id: 0, answer: ">=", options: [">=", ">", "==", "<="] },
            { id: 1, answer: "++", options: ["++", "--", "+=1", "= 1"] }
          ],
          explanation: "① `>= 90`으로 90점 이상인 학생만 걸러요 — `> 90`이면 91점 초과라 0명! ② `count++`로 1씩 증가 — `count--`는 빼는 거라 틀려요!"
        },
        {
          id: "ch2-mini-practice3",
          type: "practice" as const,
          title: "✋ 조건 카운트 직접 써보기",
          content: `Student struct 배열에서 김철수(95), 이영희(87), 박민준(72) 중 80점 이상인 학생이 몇 명인지 세어서 출력해봐요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"김철수", 95},
        {"이영희", 87},
        {"박민준", 72},
    };

    // 여기에 80점 이상인 학생 수를 세는 코드를 써보세요

    return 0;
}`,
          expectedOutput: `80점 이상: 2명`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 1등 학생 이름 찾기!",
          content: `이제 점수만이 아니라 **누가** 1등인지도 알아봐요!

**순서:**
1. \`maxIdx = 0\` 으로 초기화 (첫 번째 학생부터 시작)
2. for문으로 배열 순회 (i = 1부터)
3. \`students[i].score > students[maxIdx].score\` 이면 \`maxIdx = i\`
4. \`students[maxIdx].name\` 과 \`students[maxIdx].score\` 출력`,
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    Student students[3] = {
        {"김철수", 95},
        {"이영희", 87},
        {"박민준", 72},
    };

    // 여기에 1등 학생 이름과 점수를 출력하는 코드를 써보세요

    return 0;
}`,
          expectedOutput: `1등: 김철수 (95점)`
        },
        {
          id: "ch2-ref",
          type: "explain",
          title: "함수에 struct 넘기기",
          content: `함수에 struct를 넘길 때는 **참조(&)**를 쓰면 효율적이에요!

\`\`\`cpp
// 값 전달 — 복사본, 원본 변경 불가
void print(Student s) {
    cout << s.name << " " << s.score << endl;
}

// 참조 전달 — 원본에 직접 접근, 수정 가능
void boost(Student& s) {
    s.score += 10;
}

Student s = {"김철수", 85};
boost(s);
cout << s.score;  // 95 (원본이 바뀜!)
\`\`\`

큰 struct를 함수에 넘길 때 값 전달은 복사 비용이 커요. 참조 전달이 빠르고 메모리도 아껴요.`,
        },
        {
          id: "ch2-ref-pred1",
          type: "predict" as const,
          title: "값 전달 — 원본이 바뀔까요?",
          code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

void add10(Student s) {
    s.score += 10;
}

int main() {
    Student s = {"김철수", 85};
    add10(s);
    cout << s.score;
    return 0;
}`,
          options: ["85", "95", "에러", "0"],
          answer: 0,
          explanation: "값 전달은 **복사본**을 넘기기 때문에 함수 안에서 바꿔도 원본은 그대로예요. 85가 출력돼요. 원본을 바꾸려면 `Student& s`로 참조 전달해야 해요!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "struct 배열 접근!",
          content: `\`students[1].score\`가 출력하는 값은?

\`\`\`cpp
struct Student {
    string name;
    int score;
};
Student students[3] = {
    {"A", 90},
    {"B", 80},
    {"C", 70},
};
\`\`\``,
          options: ["90", "80", "70", "에러"],
          answer: 1,
          explanation: "students[1]은 두 번째 원소 {\"B\", 80}이에요. students[1].score는 80이에요!"
        },
        {
          id: "ch2-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ struct 정리!

\`\`\`cpp
struct 이름 {
    타입 멤버1;
    타입 멤버2;
};  // 세미콜론 필수!

이름 변수 = {값1, 값2};  // 초기화
변수.멤버                 // 접근
\`\`\`

| 개념 | 내용 |
|---|---|
| 정의 | \`struct 이름 { 멤버들 };\` |
| 생성 | \`Student s = {"김철수", 95};\` |
| 접근 | \`s.name\`, \`s.score\` |
| 배열 | \`Student arr[3] = {...};\` |
| 함수 전달 | 참조(\`Student& s\`)로 넘기면 효율적 |

🚀 **다음 레슨:** class — 멤버변수·멤버함수 묶기, private/public 접근 제어, 생성자, 캡슐화(OOP)!`
        }
      ]
    }
  ]
}
