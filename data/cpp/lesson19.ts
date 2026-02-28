// ============================================
// C++ Lesson 19: 파일 I/O & Fast I/O
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson19Data: LessonData = {
  id: "cpp-19",
  title: "파일 I/O & Fast I/O",
  emoji: "📁",
  description: "USACO 필수! 파일 입출력과 빠른 I/O",
  chapters: [
    // ============================================
    // Chapter 1: 파일 I/O
    // ============================================
    {
      id: "ch1",
      title: "파일 입출력",
      emoji: "📄",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📄 ifstream & ofstream — 파일 읽고 쓰기!",
          content: `프로그램에서 파일을 읽거나 쓰고 싶을 때가 있어요. USACO 같은 대회에서는 파일 입출력이 필수예요!

C++에서는 \`<fstream>\` 헤더를 사용해요:

\`\`\`cpp
#include <fstream>

ifstream fin("input.txt");   // 파일에서 읽기
ofstream fout("output.txt"); // 파일에 쓰기

int x;
fin >> x;          // 파일에서 숫자 읽기
fout << x * 2;     // 파일에 결과 쓰기

fin.close();       // 파일 닫기
fout.close();
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
fin = open("input.txt", "r")
fout = open("output.txt", "w")

x = int(fin.readline())
fout.write(str(x * 2))

fin.close()
fout.close()
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`open("file", "r")\` | \`ifstream fin("file")\` |
| \`open("file", "w")\` | \`ofstream fout("file")\` |
| \`fin.readline()\` | \`fin >> x\` |
| \`fout.write()\` | \`fout << x\` |
| \`fin.close()\` | \`fin.close()\` |

💡 \`ifstream\` = **i**nput **f**ile **stream**, \`ofstream\` = **o**utput **f**ile **stream**이에요! cin/cout처럼 >> 와 << 연산자를 그대로 사용해요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "파일에서 데이터를 읽어봐요!",
          code: "#include <fstream>\n\n___  fin(\"data.txt\");\nint n;\nfin >> n;",
          fillBlanks: [
            { id: 0, answer: "ifstream", options: ["ifstream", "ofstream", "fstream", "iostream"] }
          ],
          explanation: "파일에서 읽을 때는 ifstream을 사용해요! ifstream = input file stream이에요. 파일에 쓸 때는 ofstream을 써요."
        },
        {
          id: "ch1-freopen",
          type: "explain",
          title: "📄 freopen — 가장 쉬운 파일 I/O!",
          content: `\`ifstream\`/\`ofstream\`보다 더 간단한 방법이 있어요! **freopen**을 쓰면 cin/cout을 **그대로** 사용할 수 있어요!

\`\`\`cpp
#include <cstdio>  // 또는 <iostream>만으로도 OK

int main() {
    freopen("input.txt", "r", stdin);   // cin이 파일에서 읽음!
    freopen("output.txt", "w", stdout); // cout이 파일에 쓰음!

    int a, b;
    cin >> a >> b;        // 파일에서 읽기! (cin 그대로!)
    cout << a + b << endl; // 파일에 쓰기! (cout 그대로!)

    return 0;
}
\`\`\`

**freopen의 장점:**
- 기존 cin/cout 코드를 **하나도 안 바꿔도** 돼요!
- 파일 I/O 줄 2개만 추가하면 끝!
- **USACO에서 가장 많이 쓰는 방법**이에요!

파이썬과 비교하면:

**파이썬 🐍:**
\`\`\`python
import sys
sys.stdin = open("input.txt", "r")
sys.stdout = open("output.txt", "w")
# 이후 input(), print() 그대로 사용!
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sys.stdin = open(...)\` | \`freopen("...", "r", stdin)\` |
| \`sys.stdout = open(...)\` | \`freopen("...", "w", stdout)\` |
| input()/print() 그대로 | cin/cout 그대로 |

💡 freopen은 "**r**"ead와 "**w**"rite를 사용해요. 파이썬의 open()과 같은 모드예요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "freopen 사용하기!",
          code: `#include <iostream>
using namespace std;
int main() {
    // input.txt 내용: 10 20
    freopen("input.txt", "r", stdin);
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
          options: ["10 20", "30", "에러", "아무것도 출력 안 됨"],
          answer: 1,
          explanation: "freopen으로 stdin을 input.txt로 바꿨어요! cin >> a >> b가 파일에서 10과 20을 읽고, cout << a + b는 30을 출력해요."
        },
        {
          id: "ch1-getline",
          type: "explain",
          title: "📄 getline — 공백 포함 한 줄 읽기!",
          content: `\`cin >>\`은 공백에서 끊겨요. 한 줄 전체를 읽으려면 **getline**을 사용해요!

\`\`\`cpp
string line;
getline(cin, line);  // 한 줄 전체를 읽어요!
cout << line;
\`\`\`

**cin >> 후에 getline을 쓸 때 주의!**
\`\`\`cpp
int n;
cin >> n;             // 숫자를 읽음
cin.ignore();         // ← 이거 꼭 필요!
string name;
getline(cin, name);   // 한 줄 읽기
\`\`\`

왜 \`cin.ignore()\`가 필요할까요?
- \`cin >> n\` 후에 줄바꿈(\\n)이 버퍼에 남아있어요
- \`getline\`이 그 줄바꿈을 읽어서 빈 문자열을 반환해요
- \`cin.ignore()\`로 남은 줄바꿈을 제거해줘요!

파일에서도 같아요:
\`\`\`cpp
ifstream fin("data.txt");
string line;
getline(fin, line);  // 파일에서 한 줄 읽기!
\`\`\`

파이썬과 비교:

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`input()\` (자동으로 한 줄) | \`getline(cin, str)\` |
| 공백 포함 자동 처리 | 공백 포함해서 읽음 |
| 타입 변환 필요 | 문자열로 읽음 |

💡 cin >> 다음에 getline을 쓸 때는 **cin.ignore()**를 꼭 넣어요! 이걸 빼먹으면 버그가 생겨요.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 파일에서 숫자 읽고 합계 출력!",
          content: `숫자 N개를 입력받아 합계를 출력하는 프로그램이에요.

freopen을 사용해서 파일 입출력을 하고, 숫자들의 합을 구해봐요!

입력 예시 (input.txt):
3
10 20 30

출력: 60`,
          code: `#include <iostream>
using namespace std;

int main() {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;
    cin >> n;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
    }

    cout << sum << endl;

    return 0;
}`,
          expectedOutput: "60"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "파일 I/O 기초!",
          content: "`freopen`을 사용하는 가장 큰 장점은?",
          options: [
            "ifstream보다 빠르다",
            "기존 cin/cout 코드를 바꾸지 않아도 된다",
            "여러 파일을 동시에 열 수 있다",
            "자동으로 파일을 생성한다"
          ],
          answer: 1,
          explanation: "freopen의 가장 큰 장점은 기존의 cin/cout 코드를 전혀 수정하지 않아도 된다는 거예요! freopen 두 줄만 추가하면 파일 I/O가 돼요."
        }
      ]
    },
    // ============================================
    // Chapter 2: Fast I/O & 실전
    // ============================================
    {
      id: "ch2",
      title: "Fast I/O",
      emoji: "⚡",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "⚡ Fast I/O — cin/cout 속도 높이기!",
          content: `C++의 cin/cout은 기본적으로 **느려요**! 왜냐하면 C의 scanf/printf와 **동기화**되어 있거든요.

이 동기화를 끄면 **2~5배** 빨라져요!

\`\`\`cpp
int main() {
    ios_base::sync_with_stdio(false);  // C와의 동기화 끄기!
    cin.tie(NULL);                      // cin과 cout의 묶임 풀기!

    // 이제 cin/cout이 훨씬 빨라요!
    int n;
    cin >> n;
    cout << n;

    return 0;
}
\`\`\`

**왜 필요할까요?**
- 데이터가 10만 개 이상일 때 차이가 커요
- 대회에서 시간 초과(TLE)를 방지해요
- **보통 main() 첫 줄에 넣어요!**

**주의사항:**
- \`sync_with_stdio(false)\` 후에는 **scanf/printf를 쓰면 안 돼요!**
- cin/cout 또는 scanf/printf 중 **하나만** 사용해야 해요

파이썬에서는 이런 걱정이 없었죠?

**파이썬 🐍:**
\`\`\`python
import sys
input = sys.stdin.readline  # 파이썬의 Fast I/O!
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sys.stdin.readline\` | \`sync_with_stdio(false)\` |
| 한 줄로 해결 | 두 줄 필요 |

💡 대회에서는 거의 항상 이 두 줄을 main() 맨 처음에 넣어요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "빠른 입출력을 설정해봐요!",
          code: "int main() {\n    ios_base::sync_with_stdio(false);\n    cin.___  (NULL);\n    // Fast I/O 설정 완료!\n}",
          fillBlanks: [
            { id: 0, answer: "tie", options: ["tie", "sync", "bind", "link"] }
          ],
          explanation: "cin.tie(NULL)은 cin과 cout의 묶임을 풀어서 속도를 높여요! ios_base::sync_with_stdio(false)와 함께 사용해요."
        },
        {
          id: "ch2-endl",
          type: "explain",
          title: "⚡ '\\n' vs endl — endl은 느려요!",
          content: `줄바꿈을 할 때 \`endl\`을 많이 쓰죠? 하지만 **endl은 느려요!**

**왜 느릴까요?**
- \`endl\`은 줄바꿈 + **버퍼 플러시(flush)**를 해요
- 버퍼 플러시 = 버퍼의 내용을 강제로 출력하는 작업
- 매번 플러시하면 **성능이 크게 떨어져요!**

\`\`\`cpp
// ❌ 느린 방법
for (int i = 0; i < 100000; i++) {
    cout << i << endl;    // 매번 플러시! 느림!
}

// ✅ 빠른 방법
for (int i = 0; i < 100000; i++) {
    cout << i << '\\n';    // 줄바꿈만! 빠름!
}
\`\`\`

**성능 차이:**
| 방법 | 10만 줄 출력 시간 |
|---|---|
| \`endl\` | ~0.5초 |
| \`'\\n'\` | ~0.05초 |

**10배 차이**가 날 수 있어요!

파이썬에서는 \`print()\`가 자동으로 줄바꿈을 해주죠:

\`\`\`python
print(i)  # 자동 줄바꿈, 별도 설정 불필요
\`\`\`

💡 대회에서는 **항상 \`'\\n'\`을 사용**해요! \`endl\`은 디버깅할 때만 가끔 써요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Fast I/O 코드 출력!",
          code: `#include <iostream>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    for (int i = 1; i <= 3; i++) {
        cout << i << '\\n';
    }
    return 0;
}`,
          options: ["1 2 3", "123", "1\n2\n3", "에러"],
          answer: 2,
          explanation: "'\\n'은 줄바꿈을 해요! 1, 2, 3이 각각 한 줄에 출력돼요. endl과 같은 결과지만 훨씬 빨라요!"
        },
        {
          id: "ch2-template",
          type: "explain",
          title: "⚡ USACO 템플릿 — 실전 코드!",
          content: `USACO 문제를 풀 때 쓰는 **표준 템플릿**이에요! freopen + Fast I/O를 조합한 거예요.

\`\`\`cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 파일 I/O (USACO)
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);

    // 여기에 풀이 코드 작성!
    int n;
    cin >> n;
    // ...
    cout << answer << '\\n';

    return 0;
}
\`\`\`

**USACO 파일 이름 규칙:**
- 입력: \`문제이름.in\` (예: \`ride.in\`, \`gift1.in\`)
- 출력: \`문제이름.out\` (예: \`ride.out\`, \`gift1.out\`)

**체크리스트:**
1. \`ios_base::sync_with_stdio(false)\` + \`cin.tie(NULL)\`
2. \`freopen("problem.in", "r", stdin)\`
3. \`freopen("problem.out", "w", stdout)\`
4. \`'\\n'\` 사용 (\`endl\` 대신!)

이 템플릿을 외워두면 USACO 문제를 풀 때 시간을 아낄 수 있어요!

💡 이 4가지를 기억하면 **파일 I/O + Fast I/O** 완벽해요!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ USACO 스타일 문제!",
          content: `USACO 스타일로 문제를 풀어봐요!

파일에서 N개의 숫자를 읽고, 각 숫자를 2배로 만들어서 출력해요.

입력 (solve.in):
4
3 7 1 5

출력 (solve.out):
6
14
2
10

Fast I/O + freopen을 모두 사용해봐요!`,
          code: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen("solve.in", "r", stdin);
    freopen("solve.out", "w", stdout);

    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cout << x * 2 << '\\n';
    }

    return 0;
}`,
          expectedOutput: `6
14
2
10`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Fast I/O 관련!",
          content: "`endl` 대신 `'\\n'`을 써야 하는 이유는?",
          options: [
            "endl은 컴파일 에러가 나서",
            "endl은 줄바꿈을 안 해서",
            "endl은 버퍼를 플러시해서 느려서",
            "endl은 파일에 쓸 수 없어서"
          ],
          answer: 2,
          explanation: "endl은 줄바꿈 + 버퍼 플러시를 해요. 매번 플러시하면 성능이 크게 떨어져요. '\\n'은 줄바꿈만 해서 훨씬 빨라요!"
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
          title: "ifstream 사용법!",
          content: `파일에서 데이터를 읽기 위해 올바르게 작성한 코드는?

\`\`\`cpp
#include <fstream>
// ??? 로 파일을 열고 데이터를 읽으려면?
\`\`\``,
          options: [
            "ofstream fin(\"data.txt\"); fin >> x;",
            "ifstream fin(\"data.txt\"); fin >> x;",
            "fstream fin(\"data.txt\"); fin << x;",
            "iostream fin(\"data.txt\"); fin >> x;"
          ],
          answer: 1,
          explanation: "파일에서 읽을 때는 ifstream을 사용하고, >> 연산자로 데이터를 읽어요! ofstream은 파일에 쓸 때 사용해요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "freopen의 장점!",
          content: "USACO에서 freopen을 많이 사용하는 이유로 **가장 적절한** 것은?",
          options: [
            "ifstream보다 속도가 빠르다",
            "여러 파일을 동시에 열 수 있다",
            "기존 cin/cout 코드를 수정하지 않아도 된다",
            "파일을 자동으로 닫아준다"
          ],
          answer: 2,
          explanation: "freopen의 가장 큰 장점은 기존의 cin/cout 코드를 전혀 바꾸지 않아도 된다는 거예요! 줄 2개만 추가하면 파일 I/O가 돼요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "sync_with_stdio!",
          content: "`ios_base::sync_with_stdio(false)`를 사용한 후 주의할 점은?",
          options: [
            "cout을 사용할 수 없다",
            "cin과 scanf를 섞어 쓰면 안 된다",
            "파일 I/O를 사용할 수 없다",
            "정수만 입출력할 수 있다"
          ],
          answer: 1,
          explanation: "sync_with_stdio(false)는 C++의 cin/cout과 C의 scanf/printf의 동기화를 끄는 거예요. 그래서 두 가지를 섞어 쓰면 입출력 순서가 꼬일 수 있어요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "endl vs '\\n'!",
          content: `10만 개의 숫자를 출력할 때, 가장 빠른 방법은?`,
          options: [
            "cout << i << endl;",
            "cout << i << '\\n';",
            "printf(\"%d\\n\", i);  // sync_with_stdio(false) 상태",
            "cout << i << \"\\n\" << flush;"
          ],
          answer: 1,
          explanation: "'\\n'은 줄바꿈만 해서 가장 빨라요! endl과 flush는 버퍼를 플러시해서 느리고, sync_with_stdio(false) 상태에서 printf를 쓰면 문제가 생길 수 있어요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 파일 I/O & Fast I/O 완료!",
          content: `## 🏆 레슨 19 완료! 잘했어요!

오늘 배운 핵심을 정리해봐요!

### 📄 파일 I/O
- **ifstream**: 파일에서 읽기 (\`ifstream fin("file.txt")\`)
- **ofstream**: 파일에 쓰기 (\`ofstream fout("file.txt")\`)
- **freopen**: cin/cout을 파일에 연결! (가장 편리!)
- **getline**: 공백 포함 한 줄 읽기 (cin.ignore() 주의!)

### ⚡ Fast I/O
- \`ios_base::sync_with_stdio(false)\` — C 동기화 끄기
- \`cin.tie(NULL)\` — cin/cout 묶임 풀기
- \`'\\n'\` 사용 — endl은 느려요!

### 🏆 USACO 템플릿

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    freopen("problem.in", "r", stdin);
    freopen("problem.out", "w", stdout);
    // 풀이 코드...
    return 0;
}
\`\`\`

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 파일 읽기 | \`ifstream\` | >> 로 읽기 |
| 파일 쓰기 | \`ofstream\` | << 로 쓰기 |
| 리다이렉트 | \`freopen\` | cin/cout 그대로! |
| Fast I/O | \`sync_with_stdio\` | 2~5배 빨라짐 |
| 줄바꿈 | \`'\\n'\` | endl 대신! |

🚀 **다음 레슨**에서는 CP 실전 팁을 배울 거예요! 대회에서 바로 써먹을 수 있는 기법들이에요!`
        }
      ]
    }
  ]
}
