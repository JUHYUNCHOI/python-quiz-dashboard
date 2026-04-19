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
          id: "ch2-array-intro",
          type: "explain",
          title: "struct는 혼자보다 여럿이 더 강력해요!",
          content: `지금까지 학생 **한 명**의 정보를 struct에 담았어요. 그런데 실제 문제에서는...

| 상황 | 필요한 것 |
|---|---|
| 학생 N명의 성적 관리 | Student N개 |
| 좌표 M개 처리 | Point M개 |
| 간선 K개 저장 | Edge K개 |

실전에서는 **struct 변수 하나**보다 **struct 배열/vector**가 훨씬 자주 나와요!

\`\`\`cpp
// 이렇게 쓰는 경우는 드물어요
Student s;

// USACO/알고리즘에선 이게 기본!
Student students[100];       // 고정 크기
vector<Student> students(n); // 입력받은 크기
\`\`\`

이제 struct를 배열과 vector에 넣는 방법을 배워봐요!`,
        },
        {
          id: "ch2-array-builder",
          type: "interactive",
          title: "🔨 struct 배열 선언 문법 익히기",
          description: "Student 배열을 한 단계씩 직접 조립해봐요.",
          component: "cppStructArrayBuilder",
        },
        {
          id: "ch2-array",
          type: "explain",
          title: "배열 완성! 이제 for문으로 접근해봐요",
          component: "cppStructArrayLoop",
          content: `배열이 만들어졌어요. 이제 **for문**으로 한 명씩 순서대로 접근해봐요!

\`\`\`cpp
for (int i = 0; i < 3; i++) {
    cout << students[i].name << ": " << students[i].score << endl;
}
\`\`\`

- \`students[i]\` → i번째 Student 객체
- \`students[i].name\` → 그 학생의 이름 멤버
- \`students[i].score\` → 그 학생의 점수 멤버

출력:
\`\`\`
김철수: 95
이영희: 87
박민준: 72
\`\`\`

USACO에서 좌표, 간선 정보 등을 struct 배열 + for문으로 많이 다뤄요!`,
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

    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += students[i].score;
    }
    cout << total << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
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
          hint: "int total = 0을 선언하고, for(int i = 0; i < 3; i++) 안에서 total += students[i].score를 반복해요",
          expectedOutput: `254`
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

    int maxScore = students[0].score;
    for (int i = 1; i < 3; i++) {
        if (students[i].score > maxScore) {
            maxScore = students[i].score;
        }
    }
    cout << maxScore << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
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
          hint: "int maxScore = students[0].score로 초기값을 잡고, i는 1부터 반복해요. students[i].score > maxScore이면 maxScore = students[i].score로 교체해요",
          expectedOutput: `95`
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

    int count = 0;
    for (int i = 0; i < 3; i++) {
        if (students[i].score >= 80) count++;
    }
    cout << count << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
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
          hint: "int count = 0을 선언하고, for문에서 students[i].score >= 80이면 count++해요. 주의: > 80은 81 이상이라 틀려요!",
          expectedOutput: `2`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 1등 학생 이름 찾기!",
          content: `이제 점수만이 아니라 **누가** 1등인지도 알아봐요!

3명의 학생 중 가장 높은 점수를 받은 학생의 이름과 점수를 출력하는 코드를 작성해봐요.`,
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

    int maxIdx = 0;
    for (int i = 1; i < 3; i++) {
        if (students[i].score > students[maxIdx].score) {
            maxIdx = i;
        }
    }
    cout << students[maxIdx].name << " (" << students[maxIdx].score << ")" << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
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
          hint: "int maxIdx = 0으로 시작하고, i = 1부터 반복해요. students[i].score > students[maxIdx].score이면 maxIdx = i로 갱신해요. 마지막에 students[maxIdx].name과 score를 출력해요",
          expectedOutput: `김철수 (95)`
        },
        {
          id: "ch2-cin-explain",
          type: "explain",
          title: "실전 패턴: cin으로 struct 배열 채우기",
          content: `배열 선언을 배웠으니, 이제 **값을 직접 쓰는 대신 cin으로 입력받는** 패턴을 알아봐요.

입력 형식 (예시):
\`\`\`
3
김철수 95
이영희 87
박민준 72
\`\`\`

코드:
\`\`\`cpp
int n;
cin >> n;                   // ① 몇 명인지 입력받기

Student students[100];      // ② 충분히 큰 배열 (최대 100명)

for (int i = 0; i < n; i++) {
    cin >> students[i].name >> students[i].score;  // ③ 한 명씩 채우기
}
\`\`\`

| 단계 | 역할 |
|---|---|
| \`cin >> n\` | 몇 명인지 먼저 받음 |
| \`Student students[100]\` | 최대 100명 공간 확보 |
| \`cin >> students[i].name\` | i번째 학생 이름 채우기 |
| \`cin >> students[i].score\` | i번째 학생 점수 채우기 |

⚠️ **배열의 한계**: 크기를 **미리** 정해야 해요. n이 100을 넘으면 공간이 부족해져요!
이럴 때 **vector**를 쓰면 n에 딱 맞게 늘어나요 →`,
        },
        {
          id: "ch2-cin-fill",
          type: "fillblank" as const,
          title: "cin으로 struct 배열 채우기",
          content: "n명의 학생 이름과 점수를 cin으로 입력받아 배열을 채워요.",
          code: `int n;
cin >> n;
Student students[100];
for (int i = 0; ___ < n; i++) {
    cin >> students[___].name >> students[___].score;
}`,
          fillBlanks: [
            { id: 0, answer: "i", options: ["i", "0", "n", "100"] },
            { id: 1, answer: "i", options: ["i", "0", "n", "name"] },
            { id: 2, answer: "i", options: ["i", "0", "n", "score"] },
          ],
          explanation: "for 조건에 `i < n`, 배열 접근에 `students[i]`를 쓰면 i가 0→1→...→n-1로 증가하면서 n명을 순서대로 채워요.",
        },
        {
          id: "ch2-vec-explain",
          type: "explain",
          title: "vector<Student> — N명을 동적으로 관리!",
          content: `배열 \`Student arr[100]\`은 크기를 **미리** 정해야 해요.
N명을 입력받아야 한다면? **vector<Student>**와 함께 써요!

\`\`\`cpp
#include <vector>

vector<Student> students(n);  // n칸짜리 Student 벡터 — 크기가 딱 맞아요!
\`\`\`

| | \`Student arr[100]\` | \`vector<Student> students(n)\` |
|---|---|---|
| 크기 | 고정 (100명까지) | n에 딱 맞게 |
| 접근 | \`arr[i].name\` | \`students[i].name\` (동일!) |
| 실전 | 최댓값 알 때 | 입력받을 때 (더 자주 씀) |

> 💡 **USACO 패턴:** 대부분 N을 입력받으니까 **vector<구조체>** 가 훨씬 자주 나와요!`,
        },
        {
          id: "ch2-vec-cin-explain",
          type: "explain",
          title: "cin으로 vector<Student> 채우기",
          content: `vector도 배열과 **똑같은 패턴**으로 cin을 쓸 수 있어요!

\`\`\`cpp
int n;
cin >> n;
vector<Student> students(n);      // n명짜리 vector

for (int i = 0; i < n; i++) {
    cin >> students[i].name >> students[i].score;
}
\`\`\`

배열 버전과 나란히 비교해봐요:

\`\`\`cpp
// ▶ 배열 버전 (고정 크기)
Student arr[100];
for (int i = 0; i < n; i++) {
    cin >> arr[i].name >> arr[i].score;        // ← 이 줄이
}

// ▶ vector 버전 (딱 맞는 크기)
vector<Student> students(n);
for (int i = 0; i < n; i++) {
    cin >> students[i].name >> students[i].score;  // ← 완전히 같아요!
}
\`\`\`

**핵심:** cin으로 채우는 for문 코드는 배열이든 vector든 **완전히 동일**해요.
선언 방법만 달라요!`,
        },
        {
          id: "ch2-vec-cin-fill",
          type: "fillblank" as const,
          title: "cin으로 vector<Student> 채우기",
          content: "n명의 학생 데이터를 cin으로 입력받아 vector를 채워요.",
          code: `int n;
cin >> n;
vector<___> students(n);
for (int i = 0; i < n; i++) {
    cin >> students[___].name >> students[___].score;
}`,
          fillBlanks: [
            { id: 0, answer: "Student", options: ["Student", "int", "string", "n"] },
            { id: 1, answer: "i", options: ["i", "0", "n", "name"] },
            { id: 2, answer: "i", options: ["i", "0", "n", "score"] },
          ],
          explanation: "`vector<Student> students(n)`으로 n칸짜리 vector를 만들어요. 이후 for문에서 `students[i].name`, `students[i].score`로 접근하는 건 배열과 완전히 동일해요!",
        },
        {
          id: "ch2-vec-pred",
          type: "predict" as const,
          title: "vector<Student> 출력 결과 예측!",
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students = {
        {"Alice", 90},
        {"Bob", 80},
    };
    for (auto& s : students) {
        cout << s.name << " " << s.score << "\\n";
    }
    return 0;
}`,
          options: ["Alice 90\nBob 80", "Alice\nBob", "90\n80", "에러"],
          answer: 0,
          explanation: "`auto& s`로 vector 안의 각 Student를 참조해요. `s.name`과 `s.score`로 멤버에 접근해서 출력해요!"
        },
        {
          id: "ch2-vec-fill",
          type: "fillblank" as const,
          title: "vector<Student> 선언 빈칸 채우기",
          content: `N명의 학생을 입력받을 때 vector 선언은 어떻게 할까요?`,
          code: `int n;
cin >> n;
vector<___> students(n);  // n칸짜리 Student 벡터

for (int i = 0; i < n; i++) {
    cin >> students[i].name >> students[i].score;
}`,
          fillBlanks: [
            { id: 0, answer: "Student", options: ["Student", "int", "string", "n"] }
          ],
          explanation: "`vector<Student>(n)`으로 n칸짜리 Student 벡터를 만들어요. 이후 `students[i].name`, `students[i].score`로 각 멤버에 접근해서 입력받아요!",
        },
        {
          id: "ch2-vec-practice",
          type: "practice" as const,
          title: "✋ N명 점수 합계 구하기",
          content: `N명의 이름과 점수를 입력받아, 각 학생을 출력한 뒤 마지막 줄에 평균(정수 나눗셈)을 출력해봐요.`,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> students[i].name >> students[i].score;
        total += students[i].score;
    }
    for (auto& s : students) {
        cout << s.name << " " << s.score << "\\n";
    }
    cout << "Average: " << total / n << "\\n";
    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    // 여기에 코드를 작성하세요
    return 0;
}`,
          hint: "for문으로 students[i].name과 students[i].score를 cin으로 입력받고, total에 score를 더해요. 출력은 auto& s로 순회해요.",
          testCases: [
            {
              input: "3\nalice 90\nbob 80\ncarol 70",
              expectedOutput: "alice 90\nbob 80\ncarol 70\nAverage: 80",
            },
          ],
        },
        // ── struct 안에 vector 필드 ──────────────────────────────
        {
          id: "ch2-vec-field-explain",
          type: "explain",
          title: "struct 안에 vector 넣기",
          content: `지금까지는 멤버 변수가 \`int\`, \`string\` 같은 단순 타입이었어요.
알고리즘 문제에서는 **struct 안에 vector를 필드로 가지는 패턴**이 정말 자주 나와요.

### 예시 1 — 학생별 여러 점수

\`\`\`cpp
struct Student {
    string name;
    vector<int> scores;  // 과목 수가 달라도 OK!
};

Student s;
s.name = "김철수";
s.scores.push_back(90);  // 국어
s.scores.push_back(85);  // 영어
s.scores.push_back(92);  // 수학
\`\`\`

고정 배열 \`int scores[3]\`이면 과목 수가 바뀔 때마다 코드를 고쳐야 해요.
\`vector<int> scores\`면 \`push_back\`으로 얼마든지 추가할 수 있어요.

---

### 예시 2 — 그래프 인접 리스트 (USACO 핵심!)

\`\`\`cpp
struct Node {
    int val;
    vector<int> adj;  // 연결된 이웃 노드 번호들
};

// N개 노드
int n;
cin >> n;
vector<Node> graph(n);

// 간선 추가
int u, v;
cin >> u >> v;
graph[u].adj.push_back(v);
graph[v].adj.push_back(u);
\`\`\`

USACO Bronze 그래프 문제에서 거의 항상 이 패턴이 나와요.
노드마다 연결된 이웃 수가 다르기 때문에 vector를 써야 해요.`,
        },
        {
          id: "ch2-vec-field-pred",
          type: "predict" as const,
          title: "struct 안 vector — 출력 결과는?",
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    Student s;
    s.name = "Alice";
    s.scores.push_back(90);
    s.scores.push_back(80);
    s.scores.push_back(70);
    int sum = 0;
    for (int sc : s.scores) sum += sc;
    cout << s.name << " " << sum / (int)s.scores.size() << endl;
    return 0;
}`,
          options: ["Alice 80", "Alice 240", "Alice 3", "에러"],
          answer: 0,
          explanation: "`s.scores`에 90, 80, 70이 들어있어요. sum = 240, size = 3, 240/3 = 80. 출력: `Alice 80`!",
        },
        {
          id: "ch2-vec-field-practice",
          type: "practice" as const,
          title: "✋ 학생별 점수 목록 입력받기",
          content: `N명의 학생을 입력받아요. 각 학생은 이름과 점수 개수(K), K개의 점수를 입력받아요.
각 학생의 이름과 평균(정수 나눗셈)을 출력해봐요.

입력 형식:
\`\`\`
3
Alice 3 90 80 70
Bob 2 100 60
Carol 4 50 60 70 80
\`\`\`
출력:
\`\`\`
Alice 80
Bob 80
Carol 65
\`\`\``,
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (int i = 0; i < n; i++) {
        int k;
        cin >> students[i].name >> k;
        students[i].scores.resize(k);
        for (int j = 0; j < k; j++) {
            cin >> students[i].scores[j];
        }
    }
    for (auto& s : students) {
        int sum = 0;
        for (int sc : s.scores) sum += sc;
        cout << s.name << " " << sum / (int)s.scores.size() << "\\n";
    }
    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    vector<int> scores;  // struct 안의 vector!
};

int main() {
    int n;
    cin >> n;
    vector<Student> students(n);
    for (int i = 0; i < n; i++) {
        int k;
        cin >> students[i].name >> k;
        // k개의 점수를 scores에 push_back으로 넣어봐요
        // 여기에 코드를 작성하세요
    }
    // 각 학생의 이름과 평균을 출력해봐요
    // 여기에 코드를 작성하세요
    return 0;
}`,
          hint: "scores가 비어있으니 push_back으로 k번 추가해요. 평균은 sum을 scores.size()로 나눠요. size()는 unsigned라 (int)로 캐스팅!",
          testCases: [
            {
              input: "3\nAlice 3 90 80 70\nBob 2 100 60\nCarol 4 50 60 70 80",
              expectedOutput: "Alice 80\nBob 80\nCarol 65",
            },
          ],
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
| 고정 배열 | \`Student arr[3] = {...};\` |
| 동적 벡터 | \`vector<Student> v(n);\` — N 입력받을 때 |
| vector 필드 | \`struct { vector<int> scores; };\` — 가변 개수 데이터 |
| 그래프 패턴 | \`struct { vector<int> adj; };\` — 인접 리스트 |
| 함수 전달 | 참조(\`Student& s\`)로 넘기면 효율적 |

🚀 **다음 레슨:** class — 멤버변수·멤버함수 묶기, private/public 접근 제어, 생성자, 캡슐화(OOP)!`
        }
      ]
    }
  ]
}
